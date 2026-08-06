// Mô hình mạng cho phòng lab (spec Module 4: switch, router, VLAN, ARP).
//
// PHẠM VI ĐÃ ĐÓNG BĂNG (đã chốt với người dùng): MAC table, ARP, VLAN
// cổng access, router với gateway + tuyến tĩnh. KHÔNG trunk/802.1Q,
// KHÔNG router-on-a-stick, không STP/DHCP/NAT/IPv6. Đủ dạy đúng 4 ý của
// spec Module 4 mà không trượt thành một trình mô phỏng mạng đầy đủ.
//
// Ba đơn giản hóa CỐ Ý, khác thiết bị thật — ghi ra đây để người soạn
// bài và người đọc code sau này biết mình đang đứng ở đâu:
//   1. Không có trunk. Hai switch nối nhau bằng cổng access: khung chỉ
//      qua được khi HAI ĐẦU cùng VLAN. Thiết bị thật sẽ bridge theo cách
//      khác, nhưng luật "hai đầu phải khớp" mới là thứ người học cần nhớ.
//   2. Switch không có IP quản trị — trong suốt hoàn toàn ở tầng 2.
//   3. Mỗi cổng router mang đúng một IP (không subinterface).
//
// Technical contract: mọi hàm ở đây THUẦN — không đọc đồng hồ, không
// random, không mutate tham số đầu vào.

import { ipToInt, networkAddress } from '../subnet/ipv4'

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

/** Cổng switch luôn là access và luôn thuộc đúng một VLAN. */
export interface SwitchPort {
  id: PortId
  vlan: VlanId
}

export interface SwitchDevice {
  kind: 'switch'
  id: DeviceId
  hostname: string
  ports: SwitchPort[]
}

export interface RouterPort {
  id: PortId
  mac: MacAddress
  ipConfig: IpConfig | null
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
      for (const port of device.ports) {
        if (!isValidVlan(port.vlan)) {
          problems.push({ code: 'bad-vlan', deviceId: device.id, portId: port.id, vlan: port.vlan })
        }
      }
    }

    if (device.kind === 'router' && device.ports.length === 0) {
      problems.push({ code: 'router-without-ports', deviceId: device.id })
    }

    // MAC + IP của mọi cổng có địa chỉ, cộng cả cổng router chưa đặt IP
    // (MAC vẫn phải hợp lệ vì nó thuộc phần cứng, không phải cấu hình).
    const macEntries: { portId: PortId; mac: string }[] =
      device.kind === 'pc'
        ? [{ portId: device.port.id, mac: device.port.mac }]
        : device.kind === 'router'
          ? device.ports.map((p) => ({ portId: p.id, mac: p.mac }))
          : []
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
