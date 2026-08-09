// Mô phỏng một lượt ping trên topology của phòng lab (spec Module 4:
// "bấm gửi gói tin và XEM nó chạy").
//
// Engine KHÔNG animate và KHÔNG đọc đồng hồ: nó trả về một chuỗi CHẶNG
// CÓ THỨ TỰ, tầng UI tự quyết mỗi chặng chạy bao nhiêu ms. Nhờ vậy toàn
// bộ logic mạng test được không cần DOM.
//
// Bốn khoảnh khắc dạy học được mã hóa tường minh thành `HopReason`:
//   - 'broadcast-flood'       ARP đi hỏi cả phòng "ai giữ IP này?"
//   - 'unknown-unicast-flood' switch CHƯA học MAC → phát tán mọi cổng
//   - 'mac-table-hit'         switch ĐÃ học → gửi đúng một cổng
//   - 'routed'                router bóc khung, đổi MAC, GIỮ NGUYÊN IP
// Chính bốn mã này là thứ UI dịch thành nhật ký chặng cho người học đọc.

import { networkAddress } from '../subnet/ipv4'
import {
  BROADCAST_MAC,
  addressedPorts,
  deviceOwningIp,
  findDevice,
  linkIsUp,
  linkOfPort,
  livePeerOfPort,
  macOfPort,
  nativeVlanOf,
  portModeOf,
  sameSubnet,
  switchPortOf,
  trunkAllows,
  type Device,
  type DeviceId,
  type Ipv4,
  type MacAddress,
  type PortId,
  type PortRef,
  type SwitchDevice,
  type SwitchPort,
  type Topology,
  type VlanId,
} from './topology'
import { computeStp, linkBlocked, type StpState } from './stp'
import { aclOnPort, evaluateAcl, type AclDirection, type AclPacket } from './acl'
import { AD_CONNECTED, AD_OSPF, AD_STATIC, ospfRoutesOf } from './ospf'

/** Trần số chặng L3 — chặn tuyến tĩnh trỏ vòng nhau (thay vai trò TTL). */
export const MAX_L3_HOPS = 16

export type PacketPhase = 'arp-request' | 'arp-reply' | 'echo-request' | 'echo-reply'

export type HopReason =
  | 'host-egress'
  | 'broadcast-flood'
  | 'unknown-unicast-flood'
  | 'mac-table-hit'
  | 'routed'

export interface PacketHop {
  linkId: string
  from: PortRef
  to: PortRef
  /** VLAN mà khung đang thuộc về khi đi qua dây này; null khi dây không chạm switch nào. */
  vlan: VlanId | null
  /**
   * Khung có MANG NHÃN 802.1Q trên sợi dây này không (Module 14).
   *
   * Đây là trường RIÊNG chứ không phải một `HopReason` mới: mang nhãn
   * hay không là chuyện độc lập với LÝ DO switch đẩy khung đi (phát tán
   * hay tra bảng trúng). Gộp vào reason là mất một trong hai tin, mà cả
   * hai đều là tải trọng sư phạm.
   */
  tagged: boolean
  srcMac: MacAddress
  dstMac: MacAddress
  srcIp: Ipv4
  dstIp: Ipv4
  reason: HopReason
  /** Thứ tự phát; các hop cùng `step` là một lần phát tán tỏa song song. */
  step: number
}

export interface SimStage {
  phase: PacketPhase
  hops: PacketHop[]
  /** Thiết bị tiêu thụ gói ở cuối chặng; null = gói chết giữa đường. */
  arrivedAt: DeviceId | null
}

export type PingFailure =
  | 'src-not-found'
  | 'dst-not-found'
  | 'src-no-ip'
  | 'dst-no-ip'
  | 'src-no-link'
  | 'no-gateway'
  | 'gateway-off-subnet'
  | 'arp-unresolved'
  | 'no-route'
  | 'hop-budget-exceeded'
  | 'broadcast-storm'
  /**
   * Cổng trên đường ra đang bị TẮT BẰNG LỆNH (`shutdown`) — dây vẫn cắm
   * nhưng không ai cho khung qua. Tách khỏi 'src-no-link' vì hai bệnh này
   * chữa bằng hai việc khác hẳn nhau: một bên đi cắm dây, một bên gõ
   * `no shutdown`.
   */
  | 'port-shutdown'
  /** Trunk không cho VLAN của khung đi qua (allowed list thiếu). */
  | 'trunk-vlan-not-allowed'
  /** Hai đầu trunk khai native khác nhau — khung trần lạc sang VLAN khác. */
  | 'native-vlan-mismatch'
  /** Khung mang nhãn đâm vào cổng access — cổng access không đọc nhãn. */
  | 'tagged-frame-on-access'
  /**
   * Một danh sách lọc trên cổng router đã cấm gói này (spec v2 mục 4.3).
   * Tách riêng khỏi 'no-route' vì hai bệnh này chữa bằng hai việc khác
   * hẳn: một bên thiếu đường đi, một bên có đường mà bị chặn.
   */
  | 'acl-denied'

/**
 * Chuyện BẤT THƯỜNG xảy ra với khung dọc đường, ghi lại để chẩn đoán.
 *
 * Tách khỏi `PingFailure` vì một bất thường KHÔNG nhất thiết làm ping
 * chết: native lệch chỉ đưa khung sang xóm khác, còn ping hỏng hay không
 * còn tùy xóm đó có ai. Chỉ khi lượt ping thật sự thất bại thì bất
 * thường mới được nâng lên thành mã lỗi (runDirection làm việc đó).
 */
export interface FrameAnomaly {
  kind: 'trunk-vlan-not-allowed' | 'native-vlan-mismatch' | 'tagged-frame-on-access'
  at: PortRef
  vlan: VlanId
  /** Native VLAN của đầu bên kia — chỉ có với native-vlan-mismatch. */
  otherVlan?: VlanId
}

export interface MacTableEntry {
  vlan: VlanId
  mac: MacAddress
  portId: PortId
}

export interface ArpEntry {
  ip: Ipv4
  mac: MacAddress
}

/** Thứ switch/thiết bị HỌC ĐƯỢC sau khi có traffic — dẫn xuất, không thuộc topology. */
export interface NetState {
  macTables: Record<DeviceId, MacTableEntry[]>
  arpCaches: Record<DeviceId, ArpEntry[]>
  /**
   * Số lần từng dòng ACL ăn một gói: deviceId → số danh sách → seq → đếm.
   * Đây chính là cột số mà `show access-lists` in ra, và nó là bằng chứng
   * đắt nhất khi chẩn đoán: luật có đếm nghĩa là gói CÓ đi qua đó.
   */
  aclHits: Record<DeviceId, Record<number, Record<number, number>>>
}

export function emptyNetState(): NetState {
  return { macTables: {}, arpCaches: {}, aclHits: {} }
}

export interface PingRequest {
  from: DeviceId
  to: DeviceId
  /** Cổng đích cụ thể khi đích có nhiều IP (router). Bỏ trống thì tự chọn. */
  toPortId?: PortId
}

export interface PingResult {
  /** echo-request tới được đích. */
  reached: boolean
  /** echo-reply về tới nguồn — ĐÂY mới là "ping thành công". */
  replied: boolean
  stages: SimStage[]
  failure: PingFailure | null
  /** Nơi gói chết — UI tô cảnh báo đúng chỗ. */
  stoppedAt: { deviceId: DeviceId; portId: PortId | null } | null
  /**
   * Dòng luật đã cấm gói, khi failure là 'acl-denied'. `seq: null` nghĩa
   * là không luật nào khớp và DÒNG CẤM VÔ HÌNH cuối danh sách ra tay —
   * hai ca này phải nói khác nhau thì người học mới sửa đúng chỗ.
   */
  deniedBy: { deviceId: DeviceId; portId: PortId; direction: AclDirection; listNumber: number; seq: number | null } | null
  /** Trạng thái học được SAU lượt chạy (bảng MAC, ARP cache). */
  state: NetState
}

// ---------------------------------------------------------------
// Bảng MAC & ARP cache
// ---------------------------------------------------------------

/**
 * Cho gói qua cổng router theo một chiều, có tính cả số đếm của từng
 * dòng luật. Trả null khi được phép đi tiếp.
 */
function aclCheck(
  state: NetState,
  device: Device,
  portId: PortId,
  direction: AclDirection,
  packet: AclPacket,
): { listNumber: number; seq: number | null } | null {
  if (device.kind !== 'router') return null
  const list = aclOnPort(device, portId, direction)
  if (list === null) return null

  const verdict = evaluateAcl(list, packet)
  if (verdict.seq !== null) {
    // Chỉ đếm dòng CÓ THẬT; dòng cấm vô hình không có số đếm, đúng như
    // bảng của thiết bị thật.
    const perDevice = state.aclHits[device.id] ?? {}
    const perList = perDevice[list.number] ?? {}
    perList[verdict.seq] = (perList[verdict.seq] ?? 0) + 1
    perDevice[list.number] = perList
    state.aclHits[device.id] = perDevice
  }
  if (verdict.action === 'permit') return null
  return { listNumber: list.number, seq: verdict.seq }
}

function learnMac(state: NetState, switchId: DeviceId, vlan: VlanId, mac: MacAddress, portId: PortId): void {
  const table = state.macTables[switchId] ?? []
  const existing = table.find((e) => e.vlan === vlan && e.mac === mac)
  if (existing === undefined) table.push({ vlan, mac, portId })
  else existing.portId = portId // máy chuyển sang cổng khác thì bảng cập nhật theo
  state.macTables[switchId] = table
}

function lookupMac(state: NetState, switchId: DeviceId, vlan: VlanId, mac: MacAddress): PortId | null {
  return state.macTables[switchId]?.find((e) => e.vlan === vlan && e.mac === mac)?.portId ?? null
}

function rememberArp(state: NetState, deviceId: DeviceId, ip: Ipv4, mac: MacAddress): void {
  const cache = state.arpCaches[deviceId] ?? []
  const existing = cache.find((e) => e.ip === ip)
  if (existing === undefined) cache.push({ ip, mac })
  else existing.mac = mac
  state.arpCaches[deviceId] = cache
}

function lookupArp(state: NetState, deviceId: DeviceId, ip: Ipv4): MacAddress | null {
  return state.arpCaches[deviceId]?.find((e) => e.ip === ip)?.mac ?? null
}

// ---------------------------------------------------------------
// Chuyển khung ở tầng 2 (lõi của bộ mô phỏng)
// ---------------------------------------------------------------

interface Frame {
  srcMac: MacAddress
  dstMac: MacAddress
  srcIp: Ipv4
  dstIp: Ipv4
}

interface DeliverResult {
  hops: PacketHop[]
  /** Các cổng đã NHẬN khung (dstMac khớp hoặc broadcast) trên thiết bị L3. */
  receivers: PortRef[]
  /** Phát hiện mạng vòng: một switch nhận lại đúng khung này lần thứ hai. */
  loop: boolean
  /** Chuyện bất thường dọc đường (trunk chặn, native lệch…) để chẩn đoán. */
  anomalies: FrameAnomaly[]
}

/**
 * Cổng nào của switch có thể ĐƯỢC THỬ cho VLAN này đi ra.
 *
 * Trunk luôn có tên trong danh sách dù allowed list có cho VLAN đó qua
 * hay không: việc chặn thuộc về `egressPlan` — nơi DUY NHẤT quyết định
 * khung ra hay không ra, và cũng là nơi ghi lại lý do. Lọc sớm ở đây thì
 * khung chết im lặng, người học mất luôn manh mối.
 */
function portsCarrying(device: SwitchDevice, vlan: VlanId, excludePortId: PortId): SwitchPort[] {
  return device.ports.filter((p) => {
    if (p.id === excludePortId) return false
    return portModeOf(p) === 'access' ? p.vlan === vlan : true
  })
}

/** Khung rời cổng này ra dây: có đi được không, và có mang nhãn không. */
function egressPlan(
  topo: Topology,
  out: PortRef,
  frameVlan: VlanId | null,
): { send: true; tagged: boolean; wireVlan: VlanId | null } | { send: false; anomaly: FrameAnomaly } {
  const port = switchPortOf(topo, out)
  // Cổng của PC/router: không biết gì về VLAN, khung ra trần.
  if (port === null) return { send: true, tagged: false, wireVlan: null }
  if (portModeOf(port) === 'access') return { send: true, tagged: false, wireVlan: port.vlan }

  // Trunk: VLAN không nằm trong allowed list thì khung KHÔNG rời cổng —
  // đây chính là bệnh "quên thêm VLAN vào allowed" của Module 14.
  const vlan = frameVlan ?? nativeVlanOf(port)
  if (!trunkAllows(port, vlan)) {
    return { send: false, anomaly: { kind: 'trunk-vlan-not-allowed', at: out, vlan } }
  }
  // Native đi TRẦN, các VLAN khác mang nhãn.
  return { send: true, tagged: vlan !== nativeVlanOf(port), wireVlan: vlan }
}

/** Khung từ dây đi vào cổng này: thuộc VLAN nào, có bị từ chối không. */
function ingressPlan(
  topo: Topology,
  into: PortRef,
  wire: { tagged: boolean; wireVlan: VlanId | null; fromPort: SwitchPort | null },
): { accepted: boolean; vlan: VlanId | null; anomaly?: FrameAnomaly } {
  const port = switchPortOf(topo, into)
  if (port === null) return { accepted: true, vlan: wire.wireVlan }

  if (portModeOf(port) === 'access') {
    // Cổng access không đọc nhãn: khung mang nhãn đâm vào đây là chết.
    if (wire.tagged && wire.wireVlan !== null) {
      return {
        accepted: false,
        vlan: wire.wireVlan,
        anomaly: { kind: 'tagged-frame-on-access', at: into, vlan: wire.wireVlan },
      }
    }
    return { accepted: true, vlan: port.vlan }
  }

  // Trunk nhận khung MANG NHÃN: nhãn nói khung thuộc VLAN nào.
  if (wire.tagged && wire.wireVlan !== null) {
    if (!trunkAllows(port, wire.wireVlan)) {
      return {
        accepted: false,
        vlan: wire.wireVlan,
        anomaly: { kind: 'trunk-vlan-not-allowed', at: into, vlan: wire.wireVlan },
      }
    }
    return { accepted: true, vlan: wire.wireVlan }
  }

  // Trunk nhận khung TRẦN: nó rơi vào native VLAN CỦA CHÍNH CỔNG NÀY.
  // Hai đầu khai native khác nhau thì khung lặng lẽ đổi xóm — không lỗi,
  // không cảnh báo, đúng cái bẫy kinh điển mà Module 14 dựng ra để dạy.
  const native = nativeVlanOf(port)
  if (!trunkAllows(port, native)) {
    return { accepted: false, vlan: native, anomaly: { kind: 'trunk-vlan-not-allowed', at: into, vlan: native } }
  }
  const senderNative =
    wire.fromPort !== null && portModeOf(wire.fromPort) === 'trunk' ? nativeVlanOf(wire.fromPort) : null
  if (senderNative !== null && senderNative !== native) {
    return {
      accepted: true,
      vlan: native,
      anomaly: { kind: 'native-vlan-mismatch', at: into, vlan: senderNative, otherVlan: native },
    }
  }
  return { accepted: true, vlan: native }
}

/**
 * Phát một khung từ `egress` và lan theo tầng 2 cho tới khi hết đường.
 *
 * Khung mang theo VLAN của nó suốt đường đi (`vlan` trong hàng đợi).
 * Cổng access đưa khung vào VLAN của cổng và gửi ra trần; cổng trunk
 * giữ nguyên VLAN, dán nhãn cho mọi VLAN trừ native. Nhờ mô hình "VLAN
 * đi theo khung, nhãn chỉ là cách ghi trên dây" mà cả ba bệnh trunk
 * (allowed thiếu, native lệch, nhãn đâm vào access) tự hiện ra chứ
 * không phải viết riêng từng ca.
 */
function deliverFrame(
  topo: Topology,
  state: NetState,
  egress: PortRef,
  frame: Frame,
  startStep: number,
  stp: StpState,
): DeliverResult {
  const hops: PacketHop[] = []
  const receivers: PortRef[] = []
  const anomalies: FrameAnomaly[] = []
  let loop = false
  let step = startStep

  // Switch đã xử lý khung này — vào lần hai nghĩa là có vòng ở tầng 2.
  const switchesSeen = new Set<DeviceId>()
  // Hàng đợi BFS: mỗi phần tử là "phát khung ra khỏi cổng này", kèm VLAN
  // mà khung đang thuộc về (null khi khung còn ở phía host).
  const queue: { out: PortRef; reason: HopReason; vlan: VlanId | null }[] = [
    { out: egress, reason: 'host-egress', vlan: null },
  ]

  while (queue.length > 0) {
    const batch = queue.splice(0, queue.length)
    step += 1
    for (const { out, reason, vlan } of batch) {
      const link = linkOfPort(topo, out)
      // Dùng peer SỐNG: chưa cắm dây và cổng bị tắt bằng lệnh đều làm
      // khung rơi vào hư không y như nhau ở đây.
      const peer = livePeerOfPort(topo, out)
      if (link === null || peer === null) continue

      // Cổng bị STP chặn: khung không đi ra, và đây KHÔNG phải bất thường —
      // nằm im chính là việc của nó (Module 15). Không ghi anomaly, không
      // ghi chặng: trên dây đó thật sự chẳng có gì chạy qua.
      if (linkBlocked(topo, stp, out)) continue

      const plan = egressPlan(topo, out, vlan)
      if (!plan.send) {
        anomalies.push(plan.anomaly)
        continue
      }

      const ingress = ingressPlan(topo, peer, {
        tagged: plan.tagged,
        wireVlan: plan.wireVlan,
        fromPort: switchPortOf(topo, out),
      })
      if (ingress.anomaly !== undefined) anomalies.push(ingress.anomaly)

      hops.push({
        linkId: link.id,
        from: out,
        to: peer,
        // VLAN của khung trên dây; khung phía host chưa thuộc VLAN nào
        // nên mượn VLAN mà cổng switch đầu kia xếp nó vào.
        vlan: plan.wireVlan ?? ingress.vlan,
        tagged: plan.tagged,
        srcMac: frame.srcMac,
        dstMac: frame.dstMac,
        srcIp: frame.srcIp,
        dstIp: frame.dstIp,
        reason,
        step,
      })

      if (!ingress.accepted) continue

      const device = findDevice(topo, peer.deviceId)
      if (device === null) continue

      if (device.kind === 'switch') {
        if (switchesSeen.has(device.id)) {
          loop = true
          continue
        }
        switchesSeen.add(device.id)

        const inVlan = ingress.vlan
        if (inVlan === null) continue
        learnMac(state, device.id, inVlan, frame.srcMac, peer.portId)

        const outPorts = portsCarrying(device, inVlan, peer.portId).map((p) => ({
          ref: { deviceId: device.id, portId: p.id },
        }))

        if (frame.dstMac === BROADCAST_MAC) {
          for (const port of outPorts) queue.push({ out: port.ref, reason: 'broadcast-flood', vlan: inVlan })
          continue
        }
        const known = lookupMac(state, device.id, inVlan, frame.dstMac)
        if (known !== null && known !== peer.portId) {
          const port = outPorts.find((p) => p.ref.portId === known)
          if (port !== undefined) queue.push({ out: port.ref, reason: 'mac-table-hit', vlan: inVlan })
          continue
        }
        if (known === null) {
          for (const port of outPorts) {
            queue.push({ out: port.ref, reason: 'unknown-unicast-flood', vlan: inVlan })
          }
        }
        continue
      }

      // PC / router: nhận khung nếu địa chỉ đích là mình hoặc là quảng bá.
      const portMac = macOfPort(topo, peer)
      if (portMac !== null && (frame.dstMac === BROADCAST_MAC || frame.dstMac === portMac)) {
        receivers.push(peer)
      }
    }
  }

  return { hops, receivers, loop, anomalies }
}

// ---------------------------------------------------------------
// Quyết định tầng 3: gửi đi đâu, qua cổng nào
// ---------------------------------------------------------------

interface NextHop {
  egressPortId: PortId
  srcIp: Ipv4
  srcMac: MacAddress
  nextHopIp: Ipv4
}

/** Chặng kế của một PC: cùng subnet thì gửi thẳng, khác thì qua gateway. */
function pcNextHop(device: Extract<Device, { kind: 'pc' }>, dstIp: Ipv4): NextHop | PingFailure {
  if (device.ipConfig === null) return 'src-no-ip'
  const { ip, prefix } = device.ipConfig
  const base: Omit<NextHop, 'nextHopIp'> = {
    egressPortId: device.port.id,
    srcIp: ip,
    srcMac: device.port.mac,
  }
  if (sameSubnet(ip, dstIp, prefix)) return { ...base, nextHopIp: dstIp }
  if (device.gateway === null) return 'no-gateway'
  if (!sameSubnet(ip, device.gateway, prefix)) return 'gateway-off-subnet'
  return { ...base, nextHopIp: device.gateway }
}

/**
 * Chặng kế của router. Chọn theo đúng hai bậc của bảng định tuyến thật:
 *   1. LONGEST PREFIX MATCH — tuyến cụ thể hơn luôn thắng.
 *   2. Cùng độ dài prefix thì so KHOẢNG CÁCH QUẢN TRỊ (AD): connected 0
 *      < tĩnh 1 < OSPF 110. Đây đúng là chỗ khái niệm AD có nghĩa, và là
 *      mức spec đòi dạy: tuyến tĩnh thắng tuyến OSPF cùng đích.
 */
function routerNextHop(
  topo: Topology,
  device: Extract<Device, { kind: 'router' }>,
  dstIp: Ipv4,
): NextHop | PingFailure {
  let best: { prefix: number; ad: number; hop: NextHop } | null = null
  const consider = (prefix: number, ad: number, hop: NextHop) => {
    if (best === null || prefix > best.prefix || (prefix === best.prefix && ad < best.ad)) {
      best = { prefix, ad, hop }
    }
  }

  for (const port of device.ports) {
    if (port.ipConfig === null) continue
    const { ip, prefix } = port.ipConfig
    if (!sameSubnet(ip, dstIp, prefix)) continue
    consider(prefix, AD_CONNECTED, { egressPortId: port.id, srcIp: ip, srcMac: port.mac, nextHopIp: dstIp })
  }

  for (const route of device.staticRoutes) {
    if (networkAddress(dstIp, route.prefix) !== networkAddress(route.destination, route.prefix)) continue
    // Cổng đi ra là cổng cùng subnet với next hop — không có cổng đó thì
    // tuyến này vô dụng (next hop không tới được).
    const via = device.ports.find(
      (p) => p.ipConfig !== null && sameSubnet(p.ipConfig.ip, route.nextHop, p.ipConfig.prefix),
    )
    if (via === undefined || via.ipConfig === null) continue
    consider(route.prefix, AD_STATIC, {
      egressPortId: via.id,
      srcIp: via.ipConfig.ip,
      srcMac: via.mac,
      nextHopIp: route.nextHop,
    })
  }

  for (const route of ospfRoutesOf(topo, device.id)) {
    if (networkAddress(dstIp, route.prefix) !== networkAddress(route.destination, route.prefix)) continue
    const via = device.ports.find((p) => p.id === route.egressPortId)
    if (via === undefined || via.ipConfig === null) continue
    consider(route.prefix, AD_OSPF, {
      egressPortId: via.id,
      srcIp: via.ipConfig.ip,
      srcMac: via.mac,
      nextHopIp: route.nextHopIp,
    })
  }

  return best === null ? 'no-route' : (best as { hop: NextHop }).hop
}

function nextHopOf(topo: Topology, device: Device, dstIp: Ipv4): NextHop | PingFailure {
  if (device.kind === 'pc') return pcNextHop(device, dstIp)
  if (device.kind === 'router') return routerNextHop(topo, device, dstIp)
  return 'no-route' // switch không định tuyến
}

function isFailure(value: NextHop | PingFailure): value is PingFailure {
  return typeof value === 'string'
}

// ---------------------------------------------------------------
// Một chiều đi trọn vẹn (nguồn → đích), kể cả ARP xen giữa
// ---------------------------------------------------------------

/** Union phân biệt: thất bại thì LUÔN có mã lý do, không có nhánh "không rõ". */
type DirectionResult =
  | { delivered: true; stages: SimStage[] }
  | {
      delivered: false
      stages: SimStage[]
      failure: PingFailure
      stoppedAt: { deviceId: DeviceId; portId: PortId | null } | null
      deniedBy?: PingResult['deniedBy']
    }

/**
 * Phân giải MAC của `targetIp` từ `device`, sinh 2 chặng ARP nếu cache
 * chưa có. Cache có sẵn → không chặng nào cả: đó chính là lý do lần ping
 * thứ hai "im ắng" hơn lần đầu, một bài học đáng thấy.
 */
function resolveArp(
  topo: Topology,
  state: NetState,
  device: Device,
  hop: NextHop,
  targetIp: Ipv4,
  stages: SimStage[],
  stp: StpState,
): { mac: MacAddress | null; loop: boolean; anomalies: FrameAnomaly[] } {
  const cached = lookupArp(state, device.id, targetIp)
  if (cached !== null) return { mac: cached, loop: false, anomalies: [] }

  const holder = deviceOwningIp(topo, targetIp)
  const egress: PortRef = { deviceId: device.id, portId: hop.egressPortId }
  const request = deliverFrame(
    topo,
    state,
    egress,
    { srcMac: hop.srcMac, dstMac: BROADCAST_MAC, srcIp: hop.srcIp, dstIp: targetIp },
    0,
    stp,
  )
  // Chỉ máy ĐANG GIỮ đúng địa chỉ đó mới trả lời; các máy khác nhận được
  // câu hỏi quảng bá rồi lặng lẽ bỏ qua.
  const owner =
    holder === null
      ? undefined
      : request.receivers.find((ref) => ref.deviceId === holder.device.id && ref.portId === holder.portId)
  // Mạng vòng thì câu hỏi ARP không bao giờ "tới nơi" một cách có nghĩa,
  // dù về mặt kỹ thuật có máy nhận được: bão đã nhấn chìm mạng rồi.
  stages.push({
    phase: 'arp-request',
    hops: request.hops,
    arrivedAt: request.loop ? null : (owner?.deviceId ?? null),
  })
  if (request.loop) return { mac: null, loop: true, anomalies: request.anomalies }
  if (owner === undefined || holder === null) return { mac: null, loop: false, anomalies: request.anomalies }

  const reply = deliverFrame(
    topo,
    state,
    owner,
    { srcMac: holder.mac, dstMac: hop.srcMac, srcIp: targetIp, dstIp: hop.srcIp },
    0,
    stp,
  )
  const backAtSource = reply.receivers.some((ref) => ref.deviceId === device.id)
  const anomalies = [...request.anomalies, ...reply.anomalies]
  stages.push({ phase: 'arp-reply', hops: reply.hops, arrivedAt: backAtSource ? device.id : null })
  if (reply.loop) return { mac: null, loop: true, anomalies }
  if (!backAtSource) return { mac: null, loop: false, anomalies }

  rememberArp(state, device.id, targetIp, holder.mac)
  rememberArp(state, owner.deviceId, hop.srcIp, hop.srcMac)
  return { mac: holder.mac, loop: false, anomalies }
}

/**
 * Nâng bất thường thành mã lỗi khi lượt đi thật sự chết.
 *
 * Thứ tự ưu tiên là thứ tự "khó thấy nhất trước": native lệch không để
 * lại dấu vết nào trên máy người dùng nên phải được gọi tên trước; nhãn
 * đâm vào access và allowed thiếu còn có chỗ mà soi.
 */
function failureFromAnomalies(anomalies: readonly FrameAnomaly[], fallback: PingFailure): PingFailure {
  const order: FrameAnomaly['kind'][] = ['native-vlan-mismatch', 'tagged-frame-on-access', 'trunk-vlan-not-allowed']
  for (const kind of order) {
    if (anomalies.some((a) => a.kind === kind)) return kind
  }
  return fallback
}

/**
 * Đi một chiều từ `fromId` tới địa chỉ `dstIp`, qua bao nhiêu router
 * cũng được. Mỗi lần một thiết bị L3 phải gửi tiếp, nó tự ARP chặng kế
 * rồi phát khung — đúng trình tự thật, và cũng là lý do IP giữ nguyên
 * suốt chuyến còn MAC đổi ở từng chặng.
 */
function runDirection(
  topo: Topology,
  state: NetState,
  fromId: DeviceId,
  dstIp: Ipv4,
  phase: PacketPhase,
  stp: StpState,
): DirectionResult {
  const stages: SimStage[] = []
  let current = findDevice(topo, fromId)
  if (current === null) {
    return { stages, delivered: false, failure: 'src-not-found', stoppedAt: null }
  }
  /**
   * Địa chỉ IP của MÁY GỬI ĐẦU TIÊN — giữ nguyên suốt chuyến, kể cả khi
   * gói đi qua nhiều router. Đây chính là bài học lõi của Module 4: MAC
   * thay ở từng chặng (mỗi chặng là một cuộc trao tay giữa hai thiết bị
   * cạnh nhau), còn IP là địa chỉ đầu-cuối nên không đổi. Dùng IP của
   * interface router làm nguồn sẽ dạy sai hẳn điều này.
   */
  let originIp: Ipv4 | null = null

  for (let budget = MAX_L3_HOPS; budget > 0; budget--) {
    const hop = nextHopOf(topo, current, dstIp)
    if (isFailure(hop)) {
      return { stages, delivered: false, failure: hop, stoppedAt: { deviceId: current.id, portId: null } }
    }
    if (originIp === null) originIp = hop.srcIp
    const egress: PortRef = { deviceId: current.id, portId: hop.egressPortId }
    const egressLink = linkOfPort(topo, egress)
    if (egressLink === null) {
      return { stages, delivered: false, failure: 'src-no-link', stoppedAt: { deviceId: current.id, portId: hop.egressPortId } }
    }
    // Dây có cắm, nhưng một đầu đang `shutdown`. Nói thẳng ra: đây là bệnh
    // của người quản trị, không phải của sợi dây.
    if (!linkIsUp(topo, egressLink)) {
      return { stages, delivered: false, failure: 'port-shutdown', stoppedAt: { deviceId: current.id, portId: hop.egressPortId } }
    }

    // Bộ lọc chiều RA: xét ngay trước khi router đẩy gói ra cổng. Đặt
    // trước cả ARP là đúng thứ tự thật — gói bị cấm thì router không đi
    // hỏi địa chỉ của ai làm gì.
    const outDenied = aclCheck(state, current, hop.egressPortId, 'out', {
      protocol: 'icmp',
      src: originIp,
      dst: dstIp,
    })
    if (outDenied !== null) {
      return {
        stages,
        delivered: false,
        failure: 'acl-denied',
        stoppedAt: { deviceId: current.id, portId: hop.egressPortId },
        deniedBy: { deviceId: current.id, portId: hop.egressPortId, direction: 'out', ...outDenied },
      }
    }

    const arp = resolveArp(topo, state, current, hop, hop.nextHopIp, stages, stp)
    if (arp.mac === null) {
      return {
        stages,
        delivered: false,
        // Vòng ở tầng 2 và "không ai trả lời" đều làm ARP thất bại, nhưng
        // là hai bệnh khác nhau — người học cần lời chẩn đoán khác nhau.
        // Bệnh trunk còn cụ thể hơn nữa: nói thẳng tên ra.
        failure: arp.loop ? 'broadcast-storm' : failureFromAnomalies(arp.anomalies, 'arp-unresolved'),
        stoppedAt: { deviceId: current.id, portId: hop.egressPortId },
      }
    }
    const nextMac = arp.mac

    const sent = deliverFrame(
      topo,
      state,
      egress,
      { srcMac: hop.srcMac, dstMac: nextMac, srcIp: originIp, dstIp },
      0,
      stp,
    )
    if (sent.loop) {
      stages.push({ phase, hops: sent.hops, arrivedAt: null })
      return { stages, delivered: false, failure: 'broadcast-storm', stoppedAt: { deviceId: current.id, portId: hop.egressPortId } }
    }

    const receiver = sent.receivers.find((ref) => macOfPort(topo, ref) === nextMac)
    const receivingDevice = receiver === undefined ? null : findDevice(topo, receiver.deviceId)
    if (receiver === undefined || receivingDevice === null) {
      stages.push({ phase, hops: sent.hops, arrivedAt: null })
      return {
        stages,
        delivered: false,
        // ARP đã xong (biết MAC rồi) mà khung vẫn không tới nơi: kinh
        // điển của trunk chặn nửa đường — nói tên bệnh nếu bắt được.
        failure: failureFromAnomalies(sent.anomalies, 'arp-unresolved'),
        stoppedAt: { deviceId: current.id, portId: hop.egressPortId },
      }
    }

    stages.push({ phase, hops: sent.hops, arrivedAt: receivingDevice.id })

    // Bộ lọc chiều VÀO: xét ngay khi gói vừa vào cổng router, TRƯỚC cả
    // câu hỏi "router có phải đích không" — đúng thứ tự của thiết bị
    // thật, nên một luật in cũng chặn được cả ping tới chính router.
    const inDenied = aclCheck(state, receivingDevice, receiver.portId, 'in', {
      protocol: 'icmp',
      src: originIp,
      dst: dstIp,
    })
    if (inDenied !== null) {
      return {
        stages,
        delivered: false,
        failure: 'acl-denied',
        stoppedAt: { deviceId: receivingDevice.id, portId: receiver.portId },
        deniedBy: { deviceId: receivingDevice.id, portId: receiver.portId, direction: 'in', ...inDenied },
      }
    }

    // Thiết bị nhận có đúng là chủ của IP đích không? Nếu có, tới nơi.
    const ownsDst = addressedPorts(receivingDevice).some((p) => p.ipConfig.ip === dstIp)
    if (ownsDst) return { stages, delivered: true }

    if (receivingDevice.kind !== 'router') {
      return { stages, delivered: false, failure: 'no-route', stoppedAt: { deviceId: receivingDevice.id, portId: receiver.portId } }
    }
    // Router chuyển tiếp: khung được bóc ra, đóng lại với MAC mới ở chặng
    // sau — vòng lặp tiếp tục với router làm thiết bị gửi.
    current = receivingDevice
  }

  return { stages, delivered: false, failure: 'hop-budget-exceeded', stoppedAt: null }
}

// ---------------------------------------------------------------
// API công khai
// ---------------------------------------------------------------

/** Chọn IP đích: ưu tiên cổng cùng subnet với nguồn, rồi tới cổng đầu tiên có IP. */
function pickDestinationIp(topo: Topology, target: Device, toPortId: PortId | undefined, srcIp: Ipv4 | null): Ipv4 | null {
  const ports = addressedPorts(target)
  if (ports.length === 0) return null
  if (toPortId !== undefined) return ports.find((p) => p.portId === toPortId)?.ipConfig.ip ?? null
  if (srcIp !== null) {
    const local = ports.find((p) => sameSubnet(p.ipConfig.ip, srcIp, p.ipConfig.prefix))
    if (local !== undefined) return local.ipConfig.ip
  }
  return ports[0]?.ipConfig.ip ?? null
}

/**
 * Chạy một lượt ping. Trả về mọi chặng để UI phát lại, kèm trạng thái
 * học được (bảng MAC, ARP cache) sau lượt chạy.
 *
 * `prior` là trạng thái của lượt trước: truyền vào thì switch đã nhớ MAC
 * nên lần này KHÔNG phát tán nữa. Đó là bài học "vì sao lần đầu chậm".
 * Bỏ trống thì mỗi lượt bắt đầu từ mạng chưa học gì.
 */
export function simulatePing(topo: Topology, req: PingRequest, prior?: NetState): PingResult {
  const state: NetState = prior === undefined ? emptyNetState() : structuredClone(prior)
  const fail = (failure: PingFailure, stages: SimStage[] = []): PingResult => ({
    reached: false,
    replied: false,
    stages,
    failure,
    stoppedAt: null,
    deniedBy: null,
    state,
  })

  const source = findDevice(topo, req.from)
  if (source === null) return fail('src-not-found')
  const target = findDevice(topo, req.to)
  if (target === null) return fail('dst-not-found')

  const srcIp = addressedPorts(source)[0]?.ipConfig.ip ?? null
  if (srcIp === null) return fail('src-no-ip')
  const dstIp = pickDestinationIp(topo, target, req.toPortId, srcIp)
  if (dstIp === null) return fail('dst-no-ip')

  // Cây STP tính MỘT LẦN cho cả lượt ping: nó chỉ phụ thuộc sơ đồ, và
  // giữ nguyên suốt lượt đúng như đời thật (cây không đổi giữa chừng vì
  // một gói tin đi qua).
  const stp = computeStp(topo)
  const forward = runDirection(topo, state, source.id, dstIp, 'echo-request', stp)
  if (!forward.delivered) {
    return {
      reached: false,
      replied: false,
      stages: forward.stages,
      failure: forward.failure,
      stoppedAt: forward.stoppedAt,
      deniedBy: forward.deniedBy ?? null,
      state,
    }
  }

  // Chuyến VỀ đi lại toàn bộ quy trình theo hướng ngược. Mạng cấu hình
  // bất đối xứng (đi được nhưng không có đường về) lộ ra đúng ở đây —
  // và `reached: true, replied: false` chính là chữ ký của bệnh đó.
  const back = runDirection(topo, state, target.id, srcIp, 'echo-reply', stp)
  const stages = [...forward.stages, ...back.stages]
  if (!back.delivered) {
    return {
      reached: true,
      replied: false,
      stages,
      failure: back.failure,
      stoppedAt: back.stoppedAt,
      deniedBy: back.deniedBy ?? null,
      state,
    }
  }

  return { reached: true, replied: true, stages, failure: null, stoppedAt: null, deniedBy: null, state }
}

/** Cổng nào của switch đã học được MAC nào — UI hiện bảng MAC sau khi chạy. */
export function macTableOf(state: NetState, switchId: DeviceId): MacTableEntry[] {
  return state.macTables[switchId] ?? []
}

export function arpCacheOf(state: NetState, deviceId: DeviceId): ArpEntry[] {
  return state.arpCaches[deviceId] ?? []
}

/** Ping có thành công trọn vẹn không (đi tới VÀ trả lời về). */
export function pingSucceeded(result: PingResult): boolean {
  return result.reached && result.replied
}
