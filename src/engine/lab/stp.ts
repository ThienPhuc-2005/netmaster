// STP-lite: tính xem cổng nào bị CHẶN để mạng có vòng vẫn sống được
// (spec v2 Module 15).
//
// MÔ PHỎNG KẾT QUẢ, KHÔNG MÔ PHỎNG GIAO THỨC. Ở đây không có timer,
// không có BPDU bay qua lại, không có trạng thái listening/learning và
// không có chuyện "chờ 30 giây hội tụ". Cho một sơ đồ, hàm này trả về
// đúng một đáp án: ai làm root, cổng nào chặn. Lý do:
//
//   1. Thứ người học phải nhớ là LUẬT bầu chọn (priority trước, hòa thì
//      địa chỉ nhỏ hơn thắng) và HỆ QUẢ (một cổng phải nằm im để vòng
//      lặp không thành bão) — không phải đồng hồ đếm ngược.
//   2. Tất định thì test được, và rút một sợi dây là tính lại tức thì:
//      chính cái "tự mở cổng dự phòng" đó mới là màn diễn của bài học.
//
// Đơn giản hóa CỐ Ý so với thiết bị thật, khai ra để không ai tưởng
// nhầm đây là STP đầy đủ:
//   - MỘT instance cho cả switch (không per-VLAN, không RSTP/MST).
//   - Mọi sợi dây cost bằng nhau — không mô phỏng cost theo tốc độ cổng.
//   - Switch trong mô hình này không có MAC nền (nó trong suốt ở tầng 2),
//     nên khi priority hòa thì so `bridgeMac` nếu đề bài có khai, không
//     thì so ID thiết bị. Ngoài đời luôn là so MAC.
//
// Technical contract: hàm THUẦN, không đọc đồng hồ, không random.

import {
  linkIsUp,
  peerOfPort,
  samePort,
  type DeviceId,
  type PortRef,
  type SwitchDevice,
  type Topology,
} from './topology'

/** Priority mặc định của chuẩn 802.1D khi đề bài không khai. */
export const DEFAULT_BRIDGE_PRIORITY = 32768

export interface StpState {
  /** Switch được bầu làm gốc; null khi sơ đồ không có switch nào. */
  rootId: DeviceId | null
  /** Cổng đang bị chặn — khung không đi ra cũng không đi vào. */
  blocked: PortRef[]
  /**
   * Root port của từng switch không phải root — cổng hướng về gốc cây.
   * `show spanning-tree` cần vai này: IOS thật in "Root FWD" cho nó,
   * dán "Desg" là dạy sai vai cổng (P0 biên bản hội đồng trung cấp).
   */
  rootPorts: PortRef[]
}

export function emptyStpState(): StpState {
  return { rootId: null, blocked: [], rootPorts: [] }
}

/** STP có đang bật trên sơ đồ này không (mặc định TẮT — giữ nguyên Module 4). */
export function stpEnabled(topo: Topology): boolean {
  return topo.stpEnabled === true
}

export function bridgePriorityOf(device: SwitchDevice): number {
  return device.bridgePriority ?? DEFAULT_BRIDGE_PRIORITY
}

/**
 * So hai switch xem ai "nhỏ hơn" — nhỏ hơn thì làm root.
 * Thứ tự so đúng như luật thật: priority trước, rồi tới địa chỉ.
 */
function compareBridges(a: SwitchDevice, b: SwitchDevice): number {
  const byPriority = bridgePriorityOf(a) - bridgePriorityOf(b)
  if (byPriority !== 0) return byPriority
  const macA = a.bridgeMac ?? ''
  const macB = b.bridgeMac ?? ''
  if (macA !== macB) return macA < macB ? -1 : 1
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
}

interface SwitchLink {
  linkId: string
  a: PortRef
  b: PortRef
}

/**
 * Chỉ những sợi dây nối SWITCH VỚI SWITCH mới thuộc về cây STP — và chỉ
 * những sợi ĐANG SỐNG. Cổng bị `shutdown` coi như dây rút: cây tính lại
 * và cổng dự phòng bên kia mở ra, đúng như thiết bị thật.
 */
function switchLinks(topo: Topology, switches: Map<DeviceId, SwitchDevice>): SwitchLink[] {
  return topo.links.flatMap((link) =>
    switches.has(link.a.deviceId) && switches.has(link.b.deviceId) && linkIsUp(topo, link)
      ? [{ linkId: link.id, a: link.a, b: link.b }]
      : [],
  )
}

/**
 * Tính cây STP: ai làm root, cổng nào chặn.
 *
 * STP tắt → không chặn gì (mạng có vòng thì bão, đúng bài học Module 15
 * trước khi bật STP). STP bật → mỗi switch không phải root chọn MỘT cổng
 * hướng về root (root port); trên mỗi sợi dây còn lại, đầu nào gần root
 * hơn thì phát, đầu kia nằm im.
 */
/**
 * Cache cây STP theo topology: mỗi lượt ping / mỗi bảng show đều hỏi cây,
 * mà topology bất biến giữa các lệnh nên WeakMap tự đúng và tự dọn (cùng
 * mẫu với cache bảng OSPF — biên bản trung cấp, ghế Hiệu năng).
 */
const stpCache = new WeakMap<Topology, StpState>()

export function computeStp(topo: Topology): StpState {
  const cached = stpCache.get(topo)
  if (cached !== undefined) return cached
  const state = computeStpUncached(topo)
  stpCache.set(topo, state)
  return state
}

function computeStpUncached(topo: Topology): StpState {
  if (!stpEnabled(topo)) return emptyStpState()

  const switches = new Map<DeviceId, SwitchDevice>()
  for (const device of topo.devices) {
    if (device.kind === 'switch') switches.set(device.id, device)
  }
  if (switches.size === 0) return emptyStpState()

  const root = [...switches.values()].reduce((best, s) => (compareBridges(s, best) < 0 ? s : best))
  const links = switchLinks(topo, switches)

  // Khoảng cách tới root theo SỐ CHẶNG (mọi dây cost như nhau).
  const cost = new Map<DeviceId, number>([[root.id, 0]])
  let frontier: DeviceId[] = [root.id]
  while (frontier.length > 0) {
    const next: DeviceId[] = []
    for (const id of frontier) {
      for (const link of links) {
        const ends = [link.a, link.b]
        if (!ends.some((e) => e.deviceId === id)) continue
        const other = ends.find((e) => e.deviceId !== id)
        if (other === undefined || cost.has(other.deviceId)) continue
        cost.set(other.deviceId, (cost.get(id) ?? 0) + 1)
        next.push(other.deviceId)
      }
    }
    frontier = next
  }

  /** Switch nào gần root hơn; hòa thì bridge nhỏ hơn thắng. */
  const closerToRoot = (x: DeviceId, y: DeviceId): number => {
    const cx = cost.get(x) ?? Number.POSITIVE_INFINITY
    const cy = cost.get(y) ?? Number.POSITIVE_INFINITY
    if (cx !== cy) return cx - cy
    const sx = switches.get(x)
    const sy = switches.get(y)
    if (sx === undefined || sy === undefined) return 0
    return compareBridges(sx, sy)
  }

  // Root port của mỗi switch: cổng dẫn về phía root gần nhất. Hòa thì
  // chọn cổng nối tới switch "nhỏ" hơn, rồi tới tên cổng — để kết quả
  // không phụ thuộc thứ tự khai báo trong JSON.
  const rootPorts = new Map<DeviceId, PortRef>()
  for (const [id] of switches) {
    if (id === root.id) continue
    const candidates = links
      .flatMap((link) => {
        const mine = [link.a, link.b].find((e) => e.deviceId === id)
        const peer = [link.a, link.b].find((e) => e.deviceId !== id)
        if (mine === undefined || peer === undefined) return []
        return [{ mine, peer }]
      })
      .filter(({ peer }) => cost.has(peer.deviceId))
    if (candidates.length === 0) continue
    const best = candidates.reduce((a, b) => {
      const byPeer = closerToRoot(a.peer.deviceId, b.peer.deviceId)
      if (byPeer !== 0) return byPeer < 0 ? a : b
      return a.mine.portId <= b.mine.portId ? a : b
    })
    rootPorts.set(id, best.mine)
  }

  const blocked: PortRef[] = []
  for (const link of links) {
    const aIsRootPort = samePort(rootPorts.get(link.a.deviceId) ?? null, link.a)
    const bIsRootPort = samePort(rootPorts.get(link.b.deviceId) ?? null, link.b)
    // Dây nằm trên cây (một đầu là root port) thì cả hai đầu đều phát.
    if (aIsRootPort || bIsRootPort) continue
    // Dây thừa: đầu xa root hơn phải nằm im. Đây chính là "cổng dự phòng"
    // mà người học hay tưởng là hỏng.
    blocked.push(closerToRoot(link.a.deviceId, link.b.deviceId) <= 0 ? link.b : link.a)
  }

  return { rootId: root.id, blocked, rootPorts: [...rootPorts.values()] }
}

export function isPortBlocked(state: StpState, ref: PortRef): boolean {
  return state.blocked.some((b) => samePort(b, ref))
}

export function isRootPort(state: StpState, ref: PortRef): boolean {
  return state.rootPorts.some((r) => samePort(r, ref))
}

/**
 * Cổng đầu kia sợi dây có đang bị chặn không.
 *
 * Chặn là chuyện của MỘT đầu dây, nhưng khung thì không qua được theo cả
 * hai chiều — nên nơi gọi phải hỏi cả hai đầu.
 */
export function linkBlocked(topo: Topology, state: StpState, from: PortRef): boolean {
  if (isPortBlocked(state, from)) return true
  const peer = peerOfPort(topo, from)
  return peer !== null && isPortBlocked(state, peer)
}
