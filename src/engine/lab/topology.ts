// Mô hình mạng cho phòng lab (spec v1 Module 4; spec v2 Phần D mở thêm).
//
// PHẠM VI ĐÓNG BĂNG — MỐC 3 (spec v2 mục 5.2, chốt 08-08). Có: MAC
// table, ARP, VLAN cổng access, **trunk 802.1Q + native VLAN + allowed
// list**, STP-lite, router với gateway + tuyến tĩnh, **ACL đánh số**.
// KHÔNG: VTP, EtherChannel, RSTP/per-VLAN STP, QinQ, named ACL,
// NAT/DHCP/IPv6 trong lab. Mốc 1 (nhập môn) còn cấm cả trunk; mở trunk
// là việc CÓ CHỦ ĐÍCH của Module 14, mở ACL là việc của Module 17 —
// không phải cái cớ để trượt thành trình mô phỏng mạng đầy đủ.
//
// Đơn giản hóa CỐ Ý, khác thiết bị thật — ghi ra đây để người soạn bài
// và người đọc code sau này biết mình đang đứng ở đâu:
//   1. Cổng switch mặc định là ACCESS khi không khai `mode` — nhờ vậy
//      toàn bộ nội dung Module 4 viết trước khi có trunk chạy y nguyên.
//      Cổng access nối cổng access: khung chỉ qua khi HAI ĐẦU cùng VLAN.
//   2. Switch không có IP quản trị — trong suốt hoàn toàn ở tầng 2.
//   3. Mỗi cổng router mang đúng một IP (không subinterface). Vì thế
//      "router-on-a-stick" trong lab được dựng bằng router nhiều chân,
//      còn cú pháp sub-interface thuộc phần đọc-hiểu của bài.
//   4. Trunk không đàm phán (không DTP): cổng là trunk vì người ta khai
//      nó là trunk. Ngoài đời DTP tự bắt tay — và đó cũng chính là thứ
//      mọi tài liệu bảo nên tắt đi.
//   5. Cổng thiếu `shutdown` là ĐANG BẬT. Router thật xuất xưởng với mọi
//      cổng admin-down, nhưng ở đây mặc định phải là "bật" thì toàn bộ
//      nội dung viết trước CLI mới giữ nguyên nghĩa. Bài nào muốn dạy cú
//      "quên `no shutdown`" thì khai `shutdown: true` ngay trong đề.
//
// Technical contract: mọi hàm ở đây THUẦN — không đọc đồng hồ, không
// random, không mutate tham số đầu vào.

import { ipToInt, networkAddress } from '../subnet/ipv4'
import { validateRouterAcls } from './acl'
import { validateRouterOspf } from './ospf'

export type DeviceId = string
export type PortId = string
/** Chuẩn hóa dạng HOA có dấu hai chấm: 'AA:BB:CC:00:00:01'. */
export type MacAddress = string
export type Ipv4 = string
/** VLAN hợp lệ 1..4094 (0 và 4095 dành riêng theo chuẩn 802.1Q). */
export type VlanId = number

/** Địa chỉ quảng bá tầng 2 — đích của ARP request. */
export const BROADCAST_MAC = 'FF:FF:FF:FF:FF:FF'

export interface PortRef {
  deviceId: DeviceId
  portId: PortId
}

export interface IpConfig {
  ip: Ipv4
  prefix: number
}

/**
 * Máy tính: đúng một cổng mạng. `ipConfig`/`gateway` được phép null —
 * đó là trạng thái "chưa cấu hình", một ca lỗi HỢP LỆ mà bài học cần
 * dựng ra để người học tự tìm (không phải dữ liệu hỏng).
 */
export interface PcDevice {
  kind: 'pc'
  id: DeviceId
  hostname: string
  port: { id: PortId; mac: MacAddress }
  ipConfig: IpConfig | null
  gateway: Ipv4 | null
}

export type SwitchPortMode = 'access' | 'trunk'

/**
 * Cổng switch. Hai vai, khai bằng `mode`:
 *
 * - **access** (mặc định khi thiếu `mode`): cổng thuộc đúng một VLAN —
 *   chính là `vlan`. Khung đi ra đi vào đều TRẦN, không nhãn.
 * - **trunk**: cổng chở nhiều VLAN trên một sợi dây. Khung của VLAN nào
 *   thì mang nhãn VLAN đó, TRỪ `nativeVlan` đi trần. `allowedVlans`
 *   thiếu = cho tất cả đi qua (đúng mặc định thiết bị thật).
 *
 * `vlan` vẫn ở đó khi cổng là trunk nhưng không có tác dụng — giữ trường
 * để dữ liệu cũ và trình soạn thảo không phải phân nhánh kiểu.
 */
export interface SwitchPort {
  id: PortId
  vlan: VlanId
  mode?: SwitchPortMode
  /** Chỉ có nghĩa với trunk. Thiếu = cho mọi VLAN qua. */
  allowedVlans?: VlanId[]
  /** Chỉ có nghĩa với trunk. Thiếu = VLAN 1 (mặc định của chuẩn). */
  nativeVlan?: VlanId
  /**
   * Cổng bị TẮT BẰNG LỆNH (`shutdown` trên CLI). Thiếu = đang bật.
   *
   * Đây là trạng thái QUẢN TRỊ, khác hẳn "chưa cắm dây": dây vẫn cắm,
   * đèn vẫn có thể sáng ở đầu kia, nhưng cổng không cho gì đi qua. Phân
   * biệt được hai thứ đó là một phần bài học của Module 14-16.
   */
  shutdown?: boolean
}

export interface SwitchDevice {
  kind: 'switch'
  id: DeviceId
  hostname: string
  ports: SwitchPort[]
  /**
   * VLAN đã khai bằng lệnh `vlan <n>` nhưng CHƯA có cổng nào đứng tên —
   * đúng cái "VLAN database" mà `show vlan brief` in ra. Thiếu = không
   * khai gì thêm; VLAN nào có cổng thì tự có mặt trong bảng.
   */
  declaredVlans?: VlanId[]
  /**
   * Ưu tiên bầu root của STP (Module 15). Thiếu = 32768 như chuẩn.
   * Số NHỎ HƠN thắng — đây là chỗ người học hay nhớ ngược.
   */
  bridgePriority?: number
  /**
   * MAC nền của switch, chỉ dùng làm cái phân định khi priority hòa.
   * Tùy chọn vì switch trong mô hình này vốn trong suốt ở tầng 2; đề bài
   * nào muốn dạy đúng luật "hòa thì MAC nhỏ hơn thắng" thì khai ra.
   */
  bridgeMac?: MacAddress
}

export interface RouterPort {
  id: PortId
  mac: MacAddress
  ipConfig: IpConfig | null
  /** Cổng bị tắt bằng lệnh `shutdown`. Thiếu = đang bật (xem đơn giản hóa 5). */
  shutdown?: boolean
  /**
   * Số hiệu ACL áp lên cổng theo từng chiều (spec v2 mục 4.3). Thiếu =
   * không lọc gì. `in` xét gói VỪA VÀO cổng, `out` xét gói SẮP RA khỏi
   * cổng — hai chiều là hai bộ lọc độc lập, đúng như thiết bị thật.
   */
  aclIn?: number
  aclOut?: number
}

export interface StaticRoute {
  destination: Ipv4
  prefix: number
  nextHop: Ipv4
}

export interface RouterDevice {
  kind: 'router'
  id: DeviceId
  hostname: string
  ports: RouterPort[]
  staticRoutes: StaticRoute[]
  /**
   * Các danh sách lọc gói tin đã KHAI trên router (spec v2 mục 4.3).
   * Khai không có nghĩa là đang lọc — phải áp lên cổng bằng `aclIn` /
   * `aclOut` thì nó mới có tác dụng. Kiểu đầy đủ ở `./acl`; khai ở đây
   * bằng cấu trúc tối thiểu để `topology.ts` không phải nhập ngược.
   */
  accessLists?: { number: number; rules: AclRuleShape[] }[]
  /**
   * Tiến trình OSPF của router (spec v2 mục 4.3). Thiếu = chưa bật, nên
   * mọi sơ đồ viết trước Module 16 giữ nguyên hành vi: chỉ đi bằng tuyến
   * connected và tuyến tĩnh. Ngữ nghĩa (láng giềng, cost, bảng học được)
   * nằm trọn ở `./ospf`.
   */
  ospf?: { processId: number; networks: { ip: Ipv4; wildcard: Ipv4; area: number }[] }
}

/**
 * Hình dạng một dòng luật ACL, nhìn từ phía mô hình mạng. Ngữ nghĩa (so
 * khớp, thứ tự, dòng cấm vô hình) nằm trọn ở `./acl` — ở đây chỉ là dữ
 * liệu, đúng nếp "topology chỉ mô tả mạng, không chứa luật chơi".
 */
export interface AclRuleShape {
  seq: number
  action: 'permit' | 'deny'
  protocol: 'ip' | 'icmp' | 'tcp' | 'udp'
  src: { ip: Ipv4; wildcard: Ipv4 }
  dst: { ip: Ipv4; wildcard: Ipv4 }
  dstPort?: number
}

export type Device = PcDevice | SwitchDevice | RouterDevice
export type DeviceKind = Device['kind']

export interface Link {
  id: string
  a: PortRef
  b: PortRef
}

export interface Topology {
  devices: Device[]
  links: Link[]
  /**
   * Bật STP cho cả sơ đồ (Module 15). Thiếu = TẮT, nên mọi bài viết
   * trước Module 15 giữ nguyên hành vi: có vòng là có bão quảng bá.
   */
  stpEnabled?: boolean
}

// ---------------------------------------------------------------
// Chuẩn hóa & kiểm định dạng
// ---------------------------------------------------------------

const MAC_RE = /^[0-9A-F]{2}(:[0-9A-F]{2}){5}$/

/** Đưa MAC về dạng chuẩn HOA-hai-chấm; trả null nếu không phải MAC. */
export function normalizeMac(mac: string): MacAddress | null {
  const upper = mac.trim().toUpperCase().replace(/-/g, ':')
  return MAC_RE.test(upper) ? upper : null
}

export function isValidMac(mac: string): boolean {
  return normalizeMac(mac) !== null
}

/** IPv4 hợp lệ? `ipToInt` ném lỗi khi sai nên bọc lại thành cờ. */
export function isValidIpv4(ip: string): boolean {
  try {
    ipToInt(ip)
    return true
  } catch {
    return false
  }
}

export function isValidPrefix(prefix: number): boolean {
  return Number.isInteger(prefix) && prefix >= 0 && prefix <= 32
}

export function isValidVlan(vlan: number): boolean {
  return Number.isInteger(vlan) && vlan >= 1 && vlan <= 4094
}

/** Hai IP có cùng subnet theo prefix đã cho không? */
export function sameSubnet(a: Ipv4, b: Ipv4, prefix: number): boolean {
  return networkAddress(a, prefix) === networkAddress(b, prefix)
}

// ---------------------------------------------------------------
// Truy vấn topology (thuần, không ném lỗi trừ khi được ghi rõ)
// ---------------------------------------------------------------

export function findDevice(topo: Topology, deviceId: DeviceId): Device | null {
  return topo.devices.find((d) => d.id === deviceId) ?? null
}

/** Mọi cổng của một thiết bị, theo thứ tự khai báo. */
export function portIdsOf(device: Device): PortId[] {
  switch (device.kind) {
    case 'pc':
      return [device.port.id]
    case 'switch':
      return device.ports.map((p) => p.id)
    case 'router':
      return device.ports.map((p) => p.id)
  }
}

export function hasPort(device: Device, portId: PortId): boolean {
  return portIdsOf(device).includes(portId)
}

export function samePort(a: PortRef | null, b: PortRef | null): boolean {
  if (a === null || b === null) return a === b
  return a.deviceId === b.deviceId && a.portId === b.portId
}

/** Dây cắm vào cổng này (mỗi cổng tối đa 1 dây — validateTopology ép). */
export function linkOfPort(topo: Topology, ref: PortRef): Link | null {
  return topo.links.find((l) => samePort(l.a, ref) || samePort(l.b, ref)) ?? null
}

/** Cổng ở ĐẦU KIA sợi dây; null khi cổng chưa cắm dây. */
export function peerOfPort(topo: Topology, ref: PortRef): PortRef | null {
  const link = linkOfPort(topo, ref)
  if (link === null) return null
  return samePort(link.a, ref) ? link.b : link.a
}

export function isPortUsed(topo: Topology, ref: PortRef): boolean {
  return linkOfPort(topo, ref) !== null
}

/**
 * Cổng có đang bị tắt bằng lệnh không (máy tính không có lệnh nào để tắt
 * cổng của nó, nên PC luôn trả false).
 */
export function isPortShutdown(topo: Topology, ref: PortRef): boolean {
  const device = findDevice(topo, ref.deviceId)
  if (device === null || device.kind === 'pc') return false
  return device.ports.find((p) => p.id === ref.portId)?.shutdown === true
}

/**
 * Sợi dây này có thật sự chở được gì không: phải có dây VÀ hai đầu đều
 * đang bật. Một đầu `shutdown` là cả sợi câm — tắt một chiều không tồn
 * tại ở tầng vật lý.
 */
export function linkIsUp(topo: Topology, link: Link): boolean {
  return !isPortShutdown(topo, link.a) && !isPortShutdown(topo, link.b)
}

/**
 * Cổng ở đầu kia, CHỈ KHI đường đó đang sống. Đây là hàm mà mô phỏng và
 * các bảng `show` phải dùng: `peerOfPort` chỉ nói về cấu trúc (có dây hay
 * không), còn cái quyết định khung có qua được là trạng thái quản trị.
 */
export function livePeerOfPort(topo: Topology, ref: PortRef): PortRef | null {
  const link = linkOfPort(topo, ref)
  if (link === null || !linkIsUp(topo, link)) return null
  return samePort(link.a, ref) ? link.b : link.a
}

/** MAC của một cổng; switch trong suốt nên không có MAC. */
export function macOfPort(topo: Topology, ref: PortRef): MacAddress | null {
  const device = findDevice(topo, ref.deviceId)
  if (device === null) return null
  if (device.kind === 'pc') return device.port.id === ref.portId ? device.port.mac : null
  if (device.kind === 'router') return device.ports.find((p) => p.id === ref.portId)?.mac ?? null
  return null
}

/** VLAN của một cổng switch; null nếu không phải cổng switch. */
export function vlanOfPort(topo: Topology, ref: PortRef): VlanId | null {
  const device = findDevice(topo, ref.deviceId)
  if (device === null || device.kind !== 'switch') return null
  return device.ports.find((p) => p.id === ref.portId)?.vlan ?? null
}

// ---------------------------------------------------------------
// Trunk 802.1Q — đọc cấu hình cổng switch
// ---------------------------------------------------------------

/** VLAN native mặc định của chuẩn 802.1Q khi cổng không khai gì. */
export const DEFAULT_NATIVE_VLAN: VlanId = 1

export function portModeOf(port: SwitchPort): SwitchPortMode {
  return port.mode ?? 'access'
}

export function nativeVlanOf(port: SwitchPort): VlanId {
  return port.nativeVlan ?? DEFAULT_NATIVE_VLAN
}

/** Trunk có cho VLAN này đi qua không? Thiếu allowedVlans = cho tất cả. */
export function trunkAllows(port: SwitchPort, vlan: VlanId): boolean {
  return port.allowedVlans === undefined || port.allowedVlans.includes(vlan)
}

/** Cổng switch theo tham chiếu; null nếu thiết bị không phải switch. */
export function switchPortOf(topo: Topology, ref: PortRef): SwitchPort | null {
  const device = findDevice(topo, ref.deviceId)
  if (device === null || device.kind !== 'switch') return null
  return device.ports.find((p) => p.id === ref.portId) ?? null
}

/**
 * Mọi VLAN mà một cổng switch chở được — access thì đúng một, trunk thì
 * cả danh sách cho phép (hoặc mọi VLAN đang dùng trên switch đó).
 */
export function vlansCarriedBy(port: SwitchPort, allVlansOnSwitch: readonly VlanId[]): VlanId[] {
  if (portModeOf(port) === 'access') return [port.vlan]
  const universe = port.allowedVlans ?? allVlansOnSwitch
  return [...new Set(universe)].sort((a, b) => a - b)
}

/** Mọi cổng CÓ ĐỊA CHỈ IP của một thiết bị (pc: 1, router: n, switch: 0). */
export function addressedPorts(device: Device): { portId: PortId; mac: MacAddress; ipConfig: IpConfig }[] {
  if (device.kind === 'pc') {
    if (device.ipConfig === null) return []
    return [{ portId: device.port.id, mac: device.port.mac, ipConfig: device.ipConfig }]
  }
  if (device.kind === 'router') {
    return device.ports.flatMap((p) =>
      p.ipConfig === null ? [] : [{ portId: p.id, mac: p.mac, ipConfig: p.ipConfig }],
    )
  }
  return []
}

/** Thiết bị nào đang mang địa chỉ IP này? Dùng cho ARP và cho chọn đích. */
export function deviceOwningIp(topo: Topology, ip: Ipv4): { device: Device; portId: PortId; mac: MacAddress } | null {
  for (const device of topo.devices) {
    for (const entry of addressedPorts(device)) {
      if (entry.ipConfig.ip === ip) return { device, portId: entry.portId, mac: entry.mac }
    }
  }
  return null
}

// ---------------------------------------------------------------
// Kiểm định cấu trúc
// ---------------------------------------------------------------

/**
 * Lỗi CẤU TRÚC — dữ liệu không thể tồn tại trong đời thật (dây cắm vào
 * cổng không có, một cổng hai dây, trùng MAC...). Khác hẳn lỗi CẤU HÌNH
 * MẠNG (thiếu gateway, sai VLAN): lỗi cấu hình là thứ người học phải tự
 * tìm ra, còn lỗi cấu trúc là bug của trình soạn thảo hoặc nội dung hỏng.
 */
export type TopologyProblem =
  | { code: 'duplicate-device-id'; deviceId: DeviceId }
  | { code: 'duplicate-port-id'; deviceId: DeviceId; portId: PortId }
  | { code: 'duplicate-link-id'; linkId: string }
  | { code: 'unknown-port'; linkId: string; ref: PortRef }
  | { code: 'self-link'; linkId: string }
  | { code: 'port-double-linked'; ref: PortRef }
  | { code: 'duplicate-mac'; mac: MacAddress }
  | { code: 'bad-mac'; deviceId: DeviceId; portId: PortId; mac: string }
  | { code: 'bad-ip'; deviceId: DeviceId; ip: string }
  | { code: 'bad-prefix'; deviceId: DeviceId; prefix: number }
  | { code: 'bad-vlan'; deviceId: DeviceId; portId: PortId; vlan: number }
  | { code: 'switch-without-ports'; deviceId: DeviceId }
  | { code: 'router-without-ports'; deviceId: DeviceId }
  /** Cổng access mà khai allowedVlans/nativeVlan: dữ liệu tự mâu thuẫn. */
  | { code: 'trunk-fields-on-access'; deviceId: DeviceId; portId: PortId }
  /** Trunk khai allowed rỗng: không VLAN nào qua được — chắc chắn là gõ nhầm. */
  | { code: 'trunk-allowed-empty'; deviceId: DeviceId; portId: PortId }
  /** Danh sách lọc của router hỏng cấu trúc; `detail` là mã của `./acl`. */
  | { code: 'bad-acl'; deviceId: DeviceId; detail: string }
  /** Tiến trình OSPF hỏng cấu trúc; `detail` là mã của `./ospf`. */
  | { code: 'bad-ospf'; deviceId: DeviceId; detail: string }

export function validateTopology(topo: Topology): TopologyProblem[] {
  const problems: TopologyProblem[] = []
  const seenDevices = new Set<DeviceId>()
  const seenMacs = new Set<MacAddress>()

  for (const device of topo.devices) {
    if (seenDevices.has(device.id)) problems.push({ code: 'duplicate-device-id', deviceId: device.id })
    seenDevices.add(device.id)

    const seenPorts = new Set<PortId>()
    for (const portId of portIdsOf(device)) {
      if (seenPorts.has(portId)) problems.push({ code: 'duplicate-port-id', deviceId: device.id, portId })
      seenPorts.add(portId)
    }

    if (device.kind === 'switch') {
      if (device.ports.length === 0) problems.push({ code: 'switch-without-ports', deviceId: device.id })
      for (const vlan of device.declaredVlans ?? []) {
        if (!isValidVlan(vlan)) problems.push({ code: 'bad-vlan', deviceId: device.id, portId: '', vlan })
      }
      for (const port of device.ports) {
        if (!isValidVlan(port.vlan)) {
          problems.push({ code: 'bad-vlan', deviceId: device.id, portId: port.id, vlan: port.vlan })
        }
        const isTrunk = portModeOf(port) === 'trunk'
        // Cổng access mang trường của trunk là dữ liệu tự mâu thuẫn: đọc
        // sơ đồ sẽ tưởng nó chở nhiều VLAN, mà engine thì không.
        if (!isTrunk && (port.allowedVlans !== undefined || port.nativeVlan !== undefined)) {
          problems.push({ code: 'trunk-fields-on-access', deviceId: device.id, portId: port.id })
        }
        if (isTrunk) {
          if (port.allowedVlans !== undefined && port.allowedVlans.length === 0) {
            problems.push({ code: 'trunk-allowed-empty', deviceId: device.id, portId: port.id })
          }
          for (const vlan of port.allowedVlans ?? []) {
            if (!isValidVlan(vlan)) {
              problems.push({ code: 'bad-vlan', deviceId: device.id, portId: port.id, vlan })
            }
          }
          if (port.nativeVlan !== undefined && !isValidVlan(port.nativeVlan)) {
            problems.push({ code: 'bad-vlan', deviceId: device.id, portId: port.id, vlan: port.nativeVlan })
          }
        }
      }
    }

    if (device.kind === 'router') {
      if (device.ports.length === 0) problems.push({ code: 'router-without-ports', deviceId: device.id })
      // Cổng áp một danh sách chưa hề khai KHÔNG phải lỗi cấu trúc — đó là
      // cấu hình hớ hênh có thật ngoài đời (và là một ca bệnh đáng dạy).
      // Lỗi cấu trúc của chính các danh sách thì để `validateRouterAcls`
      // ở `./acl` nói, nơi giữ ngữ nghĩa của ACL.
      for (const problem of validateRouterAcls(device)) {
        problems.push({ code: 'bad-acl', deviceId: device.id, detail: problem.code })
      }
      for (const problem of validateRouterOspf(device)) {
        problems.push({ code: 'bad-ospf', deviceId: device.id, detail: problem.code })
      }
    }

    // MAC + IP của mọi cổng có địa chỉ, cộng cả cổng router chưa đặt IP
    // (MAC vẫn phải hợp lệ vì nó thuộc phần cứng, không phải cấu hình).
    const macEntries: { portId: PortId; mac: string }[] =
      device.kind === 'pc'
        ? [{ portId: device.port.id, mac: device.port.mac }]
        : device.kind === 'router'
          ? device.ports.map((p) => ({ portId: p.id, mac: p.mac }))
          : // MAC nền của switch (nếu đề khai) cũng là một địa chỉ thật:
            // trùng nó thì luật bầu root của STP mất tính xác định.
            device.bridgeMac === undefined
            ? []
            : [{ portId: '', mac: device.bridgeMac }]
    for (const entry of macEntries) {
      const normalized = normalizeMac(entry.mac)
      if (normalized === null) {
        problems.push({ code: 'bad-mac', deviceId: device.id, portId: entry.portId, mac: entry.mac })
        continue
      }
      if (seenMacs.has(normalized)) problems.push({ code: 'duplicate-mac', mac: normalized })
      seenMacs.add(normalized)
    }

    const ipEntries: (IpConfig | null)[] =
      device.kind === 'pc'
        ? [device.ipConfig]
        : device.kind === 'router'
          ? device.ports.map((p) => p.ipConfig)
          : []
    for (const cfg of ipEntries) {
      if (cfg === null) continue
      if (!isValidIpv4(cfg.ip)) problems.push({ code: 'bad-ip', deviceId: device.id, ip: cfg.ip })
      if (!isValidPrefix(cfg.prefix)) problems.push({ code: 'bad-prefix', deviceId: device.id, prefix: cfg.prefix })
    }

    if (device.kind === 'pc' && device.gateway !== null && !isValidIpv4(device.gateway)) {
      problems.push({ code: 'bad-ip', deviceId: device.id, ip: device.gateway })
    }
    if (device.kind === 'router') {
      for (const route of device.staticRoutes) {
        if (!isValidIpv4(route.destination)) problems.push({ code: 'bad-ip', deviceId: device.id, ip: route.destination })
        if (!isValidIpv4(route.nextHop)) problems.push({ code: 'bad-ip', deviceId: device.id, ip: route.nextHop })
        if (!isValidPrefix(route.prefix)) problems.push({ code: 'bad-prefix', deviceId: device.id, prefix: route.prefix })
      }
    }
  }

  const seenLinks = new Set<string>()
  const portUse = new Map<string, number>()
  const key = (ref: PortRef) => `${ref.deviceId} ${ref.portId}`
  for (const link of topo.links) {
    if (seenLinks.has(link.id)) problems.push({ code: 'duplicate-link-id', linkId: link.id })
    seenLinks.add(link.id)

    for (const ref of [link.a, link.b]) {
      const device = findDevice(topo, ref.deviceId)
      if (device === null || !hasPort(device, ref.portId)) {
        problems.push({ code: 'unknown-port', linkId: link.id, ref })
        continue
      }
      portUse.set(key(ref), (portUse.get(key(ref)) ?? 0) + 1)
    }

    if (link.a.deviceId === link.b.deviceId) problems.push({ code: 'self-link', linkId: link.id })
  }
  for (const [k, count] of portUse) {
    if (count > 1) {
      const [deviceId = '', portId = ''] = k.split(' ')
      problems.push({ code: 'port-double-linked', ref: { deviceId, portId } })
    }
  }

  return problems
}

/** Bản sao sâu — trình soạn thảo lưu lịch sử undo bằng ảnh chụp. */
export function cloneTopology(topo: Topology): Topology {
  return structuredClone(topo)
}
