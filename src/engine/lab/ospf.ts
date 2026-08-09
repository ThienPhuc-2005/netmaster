// OSPF-lite (spec v2 mục 4.3) — các router tự hỏi đường nhau.
//
// MÔ PHỎNG KẾT QUẢ, KHÔNG MÔ PHỎNG GIAO THỨC — đúng nếp STP-lite của
// Module 15: không timer, không gói hello chạy theo thời gian, không máy
// trạng thái 8 bậc. Cho một sơ đồ, engine trả về đúng một đáp án: đôi
// router nào đã thành láng giềng, và bảng định tuyến học được ra sao.
//
// Vì sao KHÔNG mô phỏng 8 trạng thái neighbor: chúng là kiến thức THUỘC
// (cung điện ký ức của Module 16 dạy chúng), không phải hành vi mà người
// học điều khiển được trong phòng lab. Mô phỏng nửa vời một máy trạng
// thái theo thời gian chỉ tạo ra thứ nhìn có vẻ thật mà không dạy thêm gì.
//
// LUẬT LÊN LÁNG GIỀNG, đúng ba điều kiện của đời thật:
//   1. Hai đầu dây đều là router và đều đã bật tiến trình OSPF.
//   2. Hai cổng cùng một subnet.
//   3. MỖI ĐẦU đều đã khai cổng của mình trong một câu `network`.
// Thiếu điều nào thì trả về đúng LÝ DO không lên — đó mới là thứ chẩn
// đoán được, khác hẳn một chữ "down" trơ trọi.
//
// COST: mỗi chặng router-router là 1 (không mô phỏng cost theo băng
// thông — đơn giản hóa cố ý, khai ở đây). Tuyến tĩnh THẮNG tuyến OSPF khi
// cùng độ dài prefix, vì AD 1 nhỏ hơn AD 110 — đúng một khái niệm AD ở
// mức spec đòi.
//
// Technical contract: mọi hàm THUẦN, tất định, không mutate đầu vào.

import { networkAddress } from '../subnet/ipv4'
import { matchesWildcard } from './wildcard'
import {
  findDevice,
  linkIsUp,
  sameSubnet,
  type DeviceId,
  type Ipv4,
  type PortId,
  type RouterDevice,
  type Topology,
} from './topology'

/** Khoảng cách quản trị — số nhỏ hơn được tin hơn khi cùng độ dài prefix. */
export const AD_CONNECTED = 0
export const AD_STATIC = 1
export const AD_OSPF = 110

/** Cost của một chặng router-router (xem ghi chú COST ở đầu file). */
export const OSPF_HOP_COST = 1

export interface OspfNetworkStatement {
  ip: Ipv4
  wildcard: Ipv4
  /** Phạm vi đóng băng: chỉ area 0 (spec v2 mục 5.1). */
  area: number
}

export interface OspfConfig {
  processId: number
  networks: OspfNetworkStatement[]
}

/** Vì sao hai router chưa thành láng giềng — mã ngữ nghĩa, UI dịch ra lời. */
export type OspfNeighborReason =
  /** Một trong hai đầu chưa bật tiến trình OSPF. */
  | 'no-ospf-process'
  /** Cổng chưa được câu `network` nào của chính router đó phủ tới. */
  | 'network-not-declared'
  /** Hai cổng không cùng subnet — hai đầu không nói cùng một mạng. */
  | 'subnet-mismatch'
  /** Cổng chưa có địa chỉ, hoặc dây đang chết (rút / shutdown). */
  | 'link-down'

export interface OspfNeighbor {
  /** Router đang nhìn (chủ của bảng `show ip ospf neighbor`). */
  localId: DeviceId
  localPortId: PortId
  remoteId: DeviceId
  remotePortId: PortId
  /** Router ID của láng giềng — IP lớn nhất trong các cổng của nó. */
  remoteRouterId: Ipv4
  remoteIp: Ipv4 | null
  state: 'full' | 'down'
  reason: OspfNeighborReason | null
}

export interface OspfRoute {
  destination: Ipv4
  prefix: number
  nextHopIp: Ipv4
  egressPortId: PortId
  cost: number
}

// ---------------------------------------------------------------
// Đọc cấu hình
// ---------------------------------------------------------------

export function ospfConfigOf(device: RouterDevice): OspfConfig | null {
  return device.ospf ?? null
}

/**
 * Router ID: địa chỉ IP LỚN NHẤT trong các cổng của router.
 *
 * Thiết bị thật ưu tiên địa chỉ loopback; mô hình này không có loopback
 * (đơn giản hóa số 3 của topology.ts) nên luật rơi về vế thứ hai của
 * chính chuẩn OSPF — vẫn là luật thật, không phải luật tự chế.
 */
export function ospfRouterId(device: RouterDevice): Ipv4 {
  const ips = device.ports.flatMap((p) => (p.ipConfig === null ? [] : [p.ipConfig.ip]))
  if (ips.length === 0) return '0.0.0.0'
  return ips.reduce((best, ip) => (compareIp(ip, best) > 0 ? ip : best))
}

function compareIp(a: Ipv4, b: Ipv4): number {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < 4; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}

/** Câu `network` nào của router có phủ địa chỉ này không. */
export function ospfCoversIp(device: RouterDevice, ip: Ipv4): boolean {
  const config = ospfConfigOf(device)
  if (config === null) return false
  return config.networks.some((n) => matchesWildcard(n.ip, n.wildcard, ip))
}

/** Các subnet mà router này ĐANG quảng bá cho OSPF (cổng có IP + đã khai network). */
export function ospfAdvertisedSubnets(device: RouterDevice): { destination: Ipv4; prefix: number }[] {
  return device.ports.flatMap((port) => {
    if (port.ipConfig === null) return []
    if (!ospfCoversIp(device, port.ipConfig.ip)) return []
    return [{ destination: networkAddress(port.ipConfig.ip, port.ipConfig.prefix), prefix: port.ipConfig.prefix }]
  })
}

// ---------------------------------------------------------------
// Láng giềng
// ---------------------------------------------------------------

function routerOf(topo: Topology, id: DeviceId): RouterDevice | null {
  const device = findDevice(topo, id)
  return device !== null && device.kind === 'router' ? device : null
}

/**
 * Mọi cặp láng giềng nhìn TỪ PHÍA `deviceId` — mỗi sợi dây nối sang một
 * router khác là một dòng, kể cả dòng chưa lên (kèm lý do).
 */
export function ospfNeighborsOf(topo: Topology, deviceId: DeviceId): OspfNeighbor[] {
  const local = routerOf(topo, deviceId)
  if (local === null) return []

  const out: OspfNeighbor[] = []
  for (const link of topo.links) {
    const ends = [link.a, link.b]
    const mine = ends.find((e) => e.deviceId === deviceId)
    const theirs = ends.find((e) => e.deviceId !== deviceId)
    if (mine === undefined || theirs === undefined) continue
    const remote = routerOf(topo, theirs.deviceId)
    if (remote === null) continue // láng giềng OSPF chỉ có giữa hai router

    const myPort = local.ports.find((p) => p.id === mine.portId)
    const theirPort = remote.ports.find((p) => p.id === theirs.portId)
    const remoteIp = theirPort?.ipConfig?.ip ?? null

    const base = {
      localId: deviceId,
      localPortId: mine.portId,
      remoteId: remote.id,
      remotePortId: theirs.portId,
      remoteRouterId: ospfRouterId(remote),
      remoteIp,
    }

    const down = (reason: OspfNeighborReason): OspfNeighbor => ({ ...base, state: 'down', reason })

    if (myPort?.ipConfig == null || theirPort?.ipConfig == null || !linkIsUp(topo, link)) {
      out.push(down('link-down'))
      continue
    }
    if (ospfConfigOf(local) === null || ospfConfigOf(remote) === null) {
      out.push(down('no-ospf-process'))
      continue
    }
    if (!sameSubnet(myPort.ipConfig.ip, theirPort.ipConfig.ip, myPort.ipConfig.prefix)) {
      out.push(down('subnet-mismatch'))
      continue
    }
    if (!ospfCoversIp(local, myPort.ipConfig.ip) || !ospfCoversIp(remote, theirPort.ipConfig.ip)) {
      out.push(down('network-not-declared'))
      continue
    }
    out.push({ ...base, state: 'full', reason: null })
  }
  return out
}

/** Chỉ những láng giềng ĐÃ LÊN — nguyên liệu dựng bảng định tuyến. */
function fullNeighborsOf(topo: Topology, deviceId: DeviceId): OspfNeighbor[] {
  return ospfNeighborsOf(topo, deviceId).filter((n) => n.state === 'full')
}

// ---------------------------------------------------------------
// Bảng định tuyến học được
// ---------------------------------------------------------------

/**
 * Những tuyến mà router này HỌC ĐƯỢC qua OSPF.
 *
 * Đi lan theo từng lớp (BFS) trên đồ thị láng giềng đã lên: router cách
 * `c` chặng thì mọi subnet nó quảng bá có cost `c`. Chặng đầu tiên quyết
 * định next hop, đúng như bảng thật. Subnet mà chính router này đã nối
 * trực tiếp thì không vào bảng OSPF — tuyến connected luôn thắng.
 */
export function ospfRoutesOf(topo: Topology, deviceId: DeviceId): OspfRoute[] {
  const self = routerOf(topo, deviceId)
  if (self === null || ospfConfigOf(self) === null) return []

  const connected = new Set(
    self.ports.flatMap((p) =>
      p.ipConfig === null ? [] : [`${networkAddress(p.ipConfig.ip, p.ipConfig.prefix)}/${p.ipConfig.prefix}`],
    ),
  )

  /** routerId → chặng đầu tiên đi tới nó (next hop + cổng ra + cost). */
  const reach = new Map<DeviceId, { nextHopIp: Ipv4; egressPortId: PortId; cost: number }>()
  let frontier: DeviceId[] = [deviceId]
  let cost = OSPF_HOP_COST

  while (frontier.length > 0) {
    const next: DeviceId[] = []
    for (const at of frontier) {
      const viaFirst = reach.get(at)
      for (const neighbor of fullNeighborsOf(topo, at)) {
        if (neighbor.remoteId === deviceId || reach.has(neighbor.remoteId)) continue
        if (neighbor.remoteIp === null) continue
        // Chặng đầu tiên của đường đi: nếu đang đứng ở chính mình thì đây
        // LÀ chặng đầu; đi xa hơn thì giữ nguyên chặng đầu đã chọn.
        const hop =
          viaFirst === undefined
            ? { nextHopIp: neighbor.remoteIp, egressPortId: neighbor.localPortId, cost }
            : { ...viaFirst, cost }
        reach.set(neighbor.remoteId, hop)
        next.push(neighbor.remoteId)
      }
    }
    frontier = next
    cost += OSPF_HOP_COST
  }

  const routes: OspfRoute[] = []
  for (const [routerId, hop] of reach) {
    const remote = routerOf(topo, routerId)
    if (remote === null) continue
    for (const subnet of ospfAdvertisedSubnets(remote)) {
      const key = `${subnet.destination}/${subnet.prefix}`
      if (connected.has(key)) continue
      const existing = routes.find((r) => r.destination === subnet.destination && r.prefix === subnet.prefix)
      if (existing !== undefined) {
        // Hai đường tới cùng một subnet: giữ đường rẻ hơn (cost nhỏ hơn).
        if (hop.cost < existing.cost) {
          existing.cost = hop.cost
          existing.nextHopIp = hop.nextHopIp
          existing.egressPortId = hop.egressPortId
        }
        continue
      }
      routes.push({ ...subnet, nextHopIp: hop.nextHopIp, egressPortId: hop.egressPortId, cost: hop.cost })
    }
  }
  return routes.sort((a, b) => (a.destination < b.destination ? -1 : a.destination > b.destination ? 1 : 0))
}

// ---------------------------------------------------------------
// Kiểm định cấu trúc
// ---------------------------------------------------------------

export type OspfProblem =
  | { code: 'bad-ospf-process'; deviceId: DeviceId; processId: number }
  | { code: 'bad-ospf-area'; deviceId: DeviceId; area: number }

export function validateRouterOspf(device: RouterDevice): OspfProblem[] {
  const config = ospfConfigOf(device)
  if (config === null) return []
  const problems: OspfProblem[] = []

  if (!Number.isInteger(config.processId) || config.processId < 1 || config.processId > 65535) {
    problems.push({ code: 'bad-ospf-process', deviceId: device.id, processId: config.processId })
  }
  // Tiến trình bật mà CHƯA khai network nào KHÔNG phải lỗi cấu trúc: đó
  // chính là trạng thái đi-qua hợp lệ của mọi người đang gõ lệnh trên
  // console sống — `router ospf 1` vừa xong, câu `network` đầu tiên chưa
  // kịp gõ (bug thật của capstone: bộ chấm sống từng ném lỗi ở đúng khe
  // này và sập màn console). Thiết bị thật cũng cho phép: router khi đó
  // đơn giản là không quảng bá gì, không lên láng giềng với ai. Đề bài
  // soạn sẵn mà bỏ trống networks thì đã có schema nội dung (min 1) chặn
  // từ lúc parse — mỗi tầng một người gác, không gác chéo sân nhau.
  for (const network of config.networks) {
    // Phạm vi đóng băng chỉ có area 0 (spec v2 mục 5.1).
    if (network.area !== 0) problems.push({ code: 'bad-ospf-area', deviceId: device.id, area: network.area })
  }
  return problems
}
