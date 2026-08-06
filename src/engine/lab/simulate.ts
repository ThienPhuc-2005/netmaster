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
  linkOfPort,
  macOfPort,
  peerOfPort,
  sameSubnet,
  vlanOfPort,
  type Device,
  type DeviceId,
  type Ipv4,
  type MacAddress,
  type PortId,
  type PortRef,
  type Topology,
  type VlanId,
} from './topology'

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
}

export function emptyNetState(): NetState {
  return { macTables: {}, arpCaches: {} }
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
  /** Trạng thái học được SAU lượt chạy (bảng MAC, ARP cache). */
  state: NetState
}

// ---------------------------------------------------------------
// Bảng MAC & ARP cache
// ---------------------------------------------------------------

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
}

/** VLAN ngữ cảnh của một sợi dây: lấy từ đầu nào là cổng switch. */
function vlanOfLink(topo: Topology, from: PortRef, to: PortRef): VlanId | null {
  return vlanOfPort(topo, from) ?? vlanOfPort(topo, to)
}

/**
 * Phát một khung từ `egress` và lan theo tầng 2 cho tới khi hết đường.
 *
 * Luật VLAN ở đây là đơn giản hóa đã khai trong topology.ts: không có
 * trunk, nên khung chỉ đi tiếp khi cổng ra CÙNG VLAN với cổng vào. Hai
 * switch nối nhau bằng cổng khác VLAN thì khung chết tại đó — đúng bài
 * học "hai đầu phải khớp".
 */
function deliverFrame(
  topo: Topology,
  state: NetState,
  egress: PortRef,
  frame: Frame,
  startStep: number,
): DeliverResult {
  const hops: PacketHop[] = []
  const receivers: PortRef[] = []
  let loop = false
  let step = startStep

  // Switch đã xử lý khung này — vào lần hai nghĩa là có vòng ở tầng 2.
  const switchesSeen = new Set<DeviceId>()
  // Hàng đợi BFS: mỗi phần tử là "phát khung ra khỏi cổng này".
  const queue: { out: PortRef; reason: HopReason }[] = [{ out: egress, reason: 'host-egress' }]

  while (queue.length > 0) {
    const batch = queue.splice(0, queue.length)
    step += 1
    for (const { out, reason } of batch) {
      const link = linkOfPort(topo, out)
      const peer = peerOfPort(topo, out)
      if (link === null || peer === null) continue // cổng chưa cắm dây: khung rơi vào hư không

      hops.push({
        linkId: link.id,
        from: out,
        to: peer,
        vlan: vlanOfLink(topo, out, peer),
        srcMac: frame.srcMac,
        dstMac: frame.dstMac,
        srcIp: frame.srcIp,
        dstIp: frame.dstIp,
        reason,
        step,
      })

      const device = findDevice(topo, peer.deviceId)
      if (device === null) continue

      if (device.kind === 'switch') {
        if (switchesSeen.has(device.id)) {
          loop = true
          continue
        }
        switchesSeen.add(device.id)

        const inVlan = vlanOfPort(topo, peer)
        if (inVlan === null) continue
        learnMac(state, device.id, inVlan, frame.srcMac, peer.portId)

        const sameVlanPorts = device.ports
          .filter((p) => p.vlan === inVlan && p.id !== peer.portId)
          .map((p) => ({ deviceId: device.id, portId: p.id }))

        if (frame.dstMac === BROADCAST_MAC) {
          for (const port of sameVlanPorts) queue.push({ out: port, reason: 'broadcast-flood' })
          continue
        }
        const known = lookupMac(state, device.id, inVlan, frame.dstMac)
        if (known !== null && known !== peer.portId) {
          const port = sameVlanPorts.find((p) => p.portId === known)
          if (port !== undefined) queue.push({ out: port, reason: 'mac-table-hit' })
          continue
        }
        if (known === null) {
          for (const port of sameVlanPorts) queue.push({ out: port, reason: 'unknown-unicast-flood' })
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

  return { hops, receivers, loop }
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
 * Chặng kế của router: tuyến connected trước, rồi tuyến tĩnh, chọn theo
 * longest-prefix-match (prefix dài hơn = cụ thể hơn = thắng).
 */
function routerNextHop(device: Extract<Device, { kind: 'router' }>, dstIp: Ipv4): NextHop | PingFailure {
  let best: { prefix: number; hop: NextHop } | null = null

  for (const port of device.ports) {
    if (port.ipConfig === null) continue
    const { ip, prefix } = port.ipConfig
    if (!sameSubnet(ip, dstIp, prefix)) continue
    if (best === null || prefix > best.prefix) {
      best = { prefix, hop: { egressPortId: port.id, srcIp: ip, srcMac: port.mac, nextHopIp: dstIp } }
    }
  }

  for (const route of device.staticRoutes) {
    if (networkAddress(dstIp, route.prefix) !== networkAddress(route.destination, route.prefix)) continue
    // Cổng đi ra là cổng cùng subnet với next hop — không có cổng đó thì
    // tuyến này vô dụng (next hop không tới được).
    const via = device.ports.find(
      (p) => p.ipConfig !== null && sameSubnet(p.ipConfig.ip, route.nextHop, p.ipConfig.prefix),
    )
    if (via === undefined || via.ipConfig === null) continue
    if (best === null || route.prefix > best.prefix) {
      best = {
        prefix: route.prefix,
        hop: { egressPortId: via.id, srcIp: via.ipConfig.ip, srcMac: via.mac, nextHopIp: route.nextHop },
      }
    }
  }

  return best === null ? 'no-route' : best.hop
}

function nextHopOf(device: Device, dstIp: Ipv4): NextHop | PingFailure {
  if (device.kind === 'pc') return pcNextHop(device, dstIp)
  if (device.kind === 'router') return routerNextHop(device, dstIp)
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
): { mac: MacAddress | null; loop: boolean } {
  const cached = lookupArp(state, device.id, targetIp)
  if (cached !== null) return { mac: cached, loop: false }

  const holder = deviceOwningIp(topo, targetIp)
  const egress: PortRef = { deviceId: device.id, portId: hop.egressPortId }
  const request = deliverFrame(
    topo,
    state,
    egress,
    { srcMac: hop.srcMac, dstMac: BROADCAST_MAC, srcIp: hop.srcIp, dstIp: targetIp },
    0,
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
  if (request.loop) return { mac: null, loop: true }
  if (owner === undefined || holder === null) return { mac: null, loop: false }

  const reply = deliverFrame(
    topo,
    state,
    owner,
    { srcMac: holder.mac, dstMac: hop.srcMac, srcIp: targetIp, dstIp: hop.srcIp },
    0,
  )
  const backAtSource = reply.receivers.some((ref) => ref.deviceId === device.id)
  stages.push({ phase: 'arp-reply', hops: reply.hops, arrivedAt: backAtSource ? device.id : null })
  if (reply.loop) return { mac: null, loop: true }
  if (!backAtSource) return { mac: null, loop: false }

  rememberArp(state, device.id, targetIp, holder.mac)
  rememberArp(state, owner.deviceId, hop.srcIp, hop.srcMac)
  return { mac: holder.mac, loop: false }
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
    const hop = nextHopOf(current, dstIp)
    if (isFailure(hop)) {
      return { stages, delivered: false, failure: hop, stoppedAt: { deviceId: current.id, portId: null } }
    }
    if (originIp === null) originIp = hop.srcIp
    const egress: PortRef = { deviceId: current.id, portId: hop.egressPortId }
    if (linkOfPort(topo, egress) === null) {
      return { stages, delivered: false, failure: 'src-no-link', stoppedAt: { deviceId: current.id, portId: hop.egressPortId } }
    }

    const arp = resolveArp(topo, state, current, hop, hop.nextHopIp, stages)
    if (arp.mac === null) {
      return {
        stages,
        delivered: false,
        // Vòng ở tầng 2 và "không ai trả lời" đều làm ARP thất bại, nhưng
        // là hai bệnh khác nhau — người học cần lời chẩn đoán khác nhau.
        failure: arp.loop ? 'broadcast-storm' : 'arp-unresolved',
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
    )
    if (sent.loop) {
      stages.push({ phase, hops: sent.hops, arrivedAt: null })
      return { stages, delivered: false, failure: 'broadcast-storm', stoppedAt: { deviceId: current.id, portId: hop.egressPortId } }
    }

    const receiver = sent.receivers.find((ref) => macOfPort(topo, ref) === nextMac)
    const receivingDevice = receiver === undefined ? null : findDevice(topo, receiver.deviceId)
    if (receiver === undefined || receivingDevice === null) {
      stages.push({ phase, hops: sent.hops, arrivedAt: null })
      return { stages, delivered: false, failure: 'arp-unresolved', stoppedAt: { deviceId: current.id, portId: hop.egressPortId } }
    }

    stages.push({ phase, hops: sent.hops, arrivedAt: receivingDevice.id })

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

  const forward = runDirection(topo, state, source.id, dstIp, 'echo-request')
  if (!forward.delivered) {
    return {
      reached: false,
      replied: false,
      stages: forward.stages,
      failure: forward.failure,
      stoppedAt: forward.stoppedAt,
      state,
    }
  }

  // Chuyến VỀ đi lại toàn bộ quy trình theo hướng ngược. Mạng cấu hình
  // bất đối xứng (đi được nhưng không có đường về) lộ ra đúng ở đây —
  // và `reached: true, replied: false` chính là chữ ký của bệnh đó.
  const back = runDirection(topo, state, target.id, srcIp, 'echo-reply')
  const stages = [...forward.stages, ...back.stages]
  if (!back.delivered) {
    return { reached: true, replied: false, stages, failure: back.failure, stoppedAt: back.stoppedAt, state }
  }

  return { reached: true, replied: true, stages, failure: null, stoppedAt: null, state }
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
