// Phiên soạn thảo phòng lab: người học lắp mạng, và MỌI THAO TÁC ĐỀU
// UNDO ĐƯỢC (spec 4.5 — "khuyến khích thử nghiệm").
//
// Lịch sử dùng ẢNH CHỤP (snapshot) chứ không phải cặp lệnh-nghịch-đảo:
// một topology của bài lab chưa tới 10 thiết bị nên clone rất rẻ, đổi
// lại miễn nhiễm hoàn toàn với lớp bug "hàm nghịch đảo tính sai" — thứ
// khó thấy nhất và làm người học mất công lắp lại từ đầu.
//
// Technical contract: mọi hàm THUẦN, state bất biến. `applyLabAction`
// ném lỗi khi thao tác không hợp lệ — đó là LỖI LẬP TRÌNH ở tầng UI (UI
// phải hỏi `canApplyLabAction` trước), không bao giờ hiển thị cho người
// học. Lời từ chối tử tế do UI dựng từ mã `LabRejection`.

import {
  cloneTopology,
  findDevice,
  hasPort,
  isPortUsed,
  isValidIpv4,
  isValidPrefix,
  isValidVlan,
  linkOfPort,
  type Device,
  type DeviceId,
  type DeviceKind,
  type IpConfig,
  type Ipv4,
  type Link,
  type PortId,
  type StaticRoute,
  type Topology,
  type VlanId,
} from './topology'

/** Trần lịch sử undo — đủ sâu cho một bài lab, không phình bộ nhớ. */
export const MAX_HISTORY = 50

/**
 * Người học được phép làm gì trong bài này. Engine ÉP quyền này, không
 * chỉ để UI ẩn nút: đề bài "sửa VLAN cho đúng" mà người học lại đi xóa
 * router thì đã trượt khỏi ý đồ sư phạm của bài.
 */
export interface LabAllowance {
  /** Loại thiết bị được phép thêm; mảng rỗng = không được thêm gì. */
  addDevices: DeviceKind[]
  removeDevices: boolean
  addLinks: boolean
  removeLinks: boolean
  setVlan: boolean
  setIp: boolean
  setRoutes: boolean
  /** Trần số thiết bị — chặn "thêm bừa cho tới khi hên". */
  maxDevices: number
}

/** Quyền rộng nhất — dùng cho bài "lắp mạng từ đầu" và cho test. */
export const ALLOW_EVERYTHING: LabAllowance = {
  addDevices: ['pc', 'switch', 'router'],
  removeDevices: true,
  addLinks: true,
  removeLinks: true,
  setVlan: true,
  setIp: true,
  setRoutes: true,
  maxDevices: 12,
}

export type LabAction =
  | { kind: 'add-device'; device: Device }
  | { kind: 'remove-device'; deviceId: DeviceId }
  | { kind: 'add-link'; link: Link }
  | { kind: 'remove-link'; linkId: string }
  | { kind: 'set-switch-port-vlan'; deviceId: DeviceId; portId: PortId; vlan: VlanId }
  | { kind: 'set-pc-ip'; deviceId: DeviceId; ipConfig: IpConfig | null; gateway: Ipv4 | null }
  | { kind: 'set-router-port-ip'; deviceId: DeviceId; portId: PortId; ipConfig: IpConfig | null }
  | { kind: 'set-static-routes'; deviceId: DeviceId; routes: StaticRoute[] }

/** Vì sao thao tác bị từ chối — mã ngữ nghĩa, UI dịch thành lời tử tế. */
export type LabRejection =
  | 'not-allowed'
  | 'max-devices'
  | 'duplicate-device-id'
  | 'duplicate-link-id'
  | 'unknown-device'
  | 'unknown-port'
  | 'unknown-link'
  | 'wrong-device-kind'
  | 'port-occupied'
  | 'self-link'
  | 'invalid-vlan'
  | 'invalid-ip'
  | 'invalid-prefix'

export interface LabSession {
  allow: LabAllowance
  /** Trạng thái đề bài — "Làm lại từ đầu" quay về đây. */
  initial: Topology
  past: Topology[]
  present: Topology
  future: Topology[]
}

export function startLab(initial: Topology, allow: LabAllowance): LabSession {
  return {
    allow,
    initial: cloneTopology(initial),
    past: [],
    present: cloneTopology(initial),
    future: [],
  }
}

// ---------------------------------------------------------------
// Kiểm tra trước khi áp dụng
// ---------------------------------------------------------------

function checkIpConfig(cfg: IpConfig | null): LabRejection | null {
  if (cfg === null) return null
  if (!isValidIpv4(cfg.ip)) return 'invalid-ip'
  if (!isValidPrefix(cfg.prefix)) return 'invalid-prefix'
  return null
}

/** Trả mã từ chối, hoặc null nếu thao tác hợp lệ. */
export function canApplyLabAction(session: LabSession, action: LabAction): LabRejection | null {
  const { allow, present } = session

  switch (action.kind) {
    case 'add-device': {
      if (!allow.addDevices.includes(action.device.kind)) return 'not-allowed'
      if (present.devices.length >= allow.maxDevices) return 'max-devices'
      if (findDevice(present, action.device.id) !== null) return 'duplicate-device-id'
      return null
    }

    case 'remove-device': {
      if (!allow.removeDevices) return 'not-allowed'
      if (findDevice(present, action.deviceId) === null) return 'unknown-device'
      return null
    }

    case 'add-link': {
      if (!allow.addLinks) return 'not-allowed'
      if (present.links.some((l) => l.id === action.link.id)) return 'duplicate-link-id'
      if (action.link.a.deviceId === action.link.b.deviceId) return 'self-link'
      for (const ref of [action.link.a, action.link.b]) {
        const device = findDevice(present, ref.deviceId)
        if (device === null) return 'unknown-device'
        if (!hasPort(device, ref.portId)) return 'unknown-port'
        if (isPortUsed(present, ref)) return 'port-occupied'
      }
      return null
    }

    case 'remove-link': {
      if (!allow.removeLinks) return 'not-allowed'
      if (!present.links.some((l) => l.id === action.linkId)) return 'unknown-link'
      return null
    }

    case 'set-switch-port-vlan': {
      if (!allow.setVlan) return 'not-allowed'
      const device = findDevice(present, action.deviceId)
      if (device === null) return 'unknown-device'
      if (device.kind !== 'switch') return 'wrong-device-kind'
      if (!device.ports.some((p) => p.id === action.portId)) return 'unknown-port'
      if (!isValidVlan(action.vlan)) return 'invalid-vlan'
      return null
    }

    case 'set-pc-ip': {
      if (!allow.setIp) return 'not-allowed'
      const device = findDevice(present, action.deviceId)
      if (device === null) return 'unknown-device'
      if (device.kind !== 'pc') return 'wrong-device-kind'
      const bad = checkIpConfig(action.ipConfig)
      if (bad !== null) return bad
      if (action.gateway !== null && !isValidIpv4(action.gateway)) return 'invalid-ip'
      return null
    }

    case 'set-router-port-ip': {
      if (!allow.setIp) return 'not-allowed'
      const device = findDevice(present, action.deviceId)
      if (device === null) return 'unknown-device'
      if (device.kind !== 'router') return 'wrong-device-kind'
      if (!device.ports.some((p) => p.id === action.portId)) return 'unknown-port'
      return checkIpConfig(action.ipConfig)
    }

    case 'set-static-routes': {
      if (!allow.setRoutes) return 'not-allowed'
      const device = findDevice(present, action.deviceId)
      if (device === null) return 'unknown-device'
      if (device.kind !== 'router') return 'wrong-device-kind'
      for (const route of action.routes) {
        if (!isValidIpv4(route.destination) || !isValidIpv4(route.nextHop)) return 'invalid-ip'
        if (!isValidPrefix(route.prefix)) return 'invalid-prefix'
      }
      return null
    }
  }
}

// ---------------------------------------------------------------
// Áp dụng
// ---------------------------------------------------------------

function mapDevice(topo: Topology, deviceId: DeviceId, fn: (device: Device) => Device): Topology {
  return { ...topo, devices: topo.devices.map((d) => (d.id === deviceId ? fn(d) : d)) }
}

function nextTopology(topo: Topology, action: LabAction): Topology {
  switch (action.kind) {
    case 'add-device':
      return { ...topo, devices: [...topo.devices, action.device] }

    case 'remove-device':
      // Gỡ thiết bị thì gỡ luôn dây cắm vào nó — không để lại dây lơ lửng
      // trỏ vào hư không. Một lần undo khôi phục cả thiết bị lẫn dây.
      return {
        devices: topo.devices.filter((d) => d.id !== action.deviceId),
        links: topo.links.filter((l) => l.a.deviceId !== action.deviceId && l.b.deviceId !== action.deviceId),
      }

    case 'add-link':
      return { ...topo, links: [...topo.links, action.link] }

    case 'remove-link':
      return { ...topo, links: topo.links.filter((l) => l.id !== action.linkId) }

    case 'set-switch-port-vlan':
      return mapDevice(topo, action.deviceId, (device) =>
        device.kind !== 'switch'
          ? device
          : {
              ...device,
              ports: device.ports.map((p) => (p.id === action.portId ? { ...p, vlan: action.vlan } : p)),
            },
      )

    case 'set-pc-ip':
      return mapDevice(topo, action.deviceId, (device) =>
        device.kind !== 'pc' ? device : { ...device, ipConfig: action.ipConfig, gateway: action.gateway },
      )

    case 'set-router-port-ip':
      return mapDevice(topo, action.deviceId, (device) =>
        device.kind !== 'router'
          ? device
          : {
              ...device,
              ports: device.ports.map((p) => (p.id === action.portId ? { ...p, ipConfig: action.ipConfig } : p)),
            },
      )

    case 'set-static-routes':
      return mapDevice(topo, action.deviceId, (device) =>
        device.kind !== 'router' ? device : { ...device, staticRoutes: [...action.routes] },
      )
  }
}

/** Ghi một mốc lịch sử: nhánh redo bị bỏ (đã rẽ hướng khác), cắt theo trần. */
function commit(session: LabSession, next: Topology): LabSession {
  return {
    ...session,
    past: [...session.past, session.present].slice(-MAX_HISTORY),
    present: next,
    future: [],
  }
}

export function applyLabAction(session: LabSession, action: LabAction): LabSession {
  const rejection = canApplyLabAction(session, action)
  if (rejection !== null) {
    throw new Error(`applyLabAction: thao tác "${action.kind}" bị từ chối (${rejection}) — UI phải hỏi canApplyLabAction trước`)
  }
  return commit(session, nextTopology(session.present, action))
}

// ---------------------------------------------------------------
// Undo / redo / làm lại
// ---------------------------------------------------------------

export function canUndo(session: LabSession): boolean {
  return session.past.length > 0
}

export function canRedo(session: LabSession): boolean {
  return session.future.length > 0
}

export function undoLab(session: LabSession): LabSession {
  const previous = session.past.at(-1)
  if (previous === undefined) return session
  return {
    ...session,
    past: session.past.slice(0, -1),
    present: previous,
    future: [session.present, ...session.future],
  }
}

export function redoLab(session: LabSession): LabSession {
  const [next, ...rest] = session.future
  if (next === undefined) return session
  return { ...session, past: [...session.past, session.present], present: next, future: rest }
}

/**
 * Về lại đề bài. Đây CŨNG là một mốc undo được: bấm nhầm "làm lại" mà
 * mất sạch công lắp thì đúng là thứ khiến người học ngại thử nghiệm.
 */
export function resetLab(session: LabSession): LabSession {
  return commit(session, cloneTopology(session.initial))
}

// ---------------------------------------------------------------
// Phân loại thay đổi — dùng để đối chiếu với quyền được phép
// ---------------------------------------------------------------

export type ChangeClass =
  | 'add-device'
  | 'remove-device'
  | 'add-link'
  | 'remove-link'
  | 'vlan'
  | 'ip'
  | 'routes'

function ipConfigEqual(a: IpConfig | null, b: IpConfig | null): boolean {
  if (a === null || b === null) return a === b
  return a.ip === b.ip && a.prefix === b.prefix
}

function deviceChanges(before: Device, after: Device): ChangeClass[] {
  const classes: ChangeClass[] = []
  if (before.kind !== after.kind) return ['remove-device', 'add-device']

  if (before.kind === 'switch' && after.kind === 'switch') {
    const beforeVlans = new Map(before.ports.map((p) => [p.id, p.vlan]))
    if (after.ports.some((p) => beforeVlans.get(p.id) !== p.vlan)) classes.push('vlan')
  }
  if (before.kind === 'pc' && after.kind === 'pc') {
    if (!ipConfigEqual(before.ipConfig, after.ipConfig) || before.gateway !== after.gateway) classes.push('ip')
  }
  if (before.kind === 'router' && after.kind === 'router') {
    const beforePorts = new Map(before.ports.map((p) => [p.id, p.ipConfig]))
    if (after.ports.some((p) => !ipConfigEqual(beforePorts.get(p.id) ?? null, p.ipConfig))) classes.push('ip')
    if (JSON.stringify(before.staticRoutes) !== JSON.stringify(after.staticRoutes)) classes.push('routes')
  }
  return classes
}

/**
 * Những LOẠI thay đổi giữa hai topology. Dùng ở tầng nội dung để kiểm
 * chéo: lời giải mẫu của một bài lab phải nằm trong đúng những quyền mà
 * đề bài cho phép, nếu không thì đề bài tự mâu thuẫn.
 */
export function classifyDiff(from: Topology, to: Topology): ChangeClass[] {
  const classes = new Set<ChangeClass>()

  const fromDevices = new Map(from.devices.map((d) => [d.id, d]))
  const toDevices = new Map(to.devices.map((d) => [d.id, d]))
  for (const id of fromDevices.keys()) if (!toDevices.has(id)) classes.add('remove-device')
  for (const id of toDevices.keys()) if (!fromDevices.has(id)) classes.add('add-device')
  for (const [id, before] of fromDevices) {
    const after = toDevices.get(id)
    if (after === undefined) continue
    for (const c of deviceChanges(before, after)) classes.add(c)
  }

  const fromLinks = new Set(from.links.map((l) => l.id))
  const toLinks = new Set(to.links.map((l) => l.id))
  for (const id of fromLinks) if (!toLinks.has(id)) classes.add('remove-link')
  for (const id of toLinks) if (!fromLinks.has(id)) classes.add('add-link')

  return [...classes]
}

/** Những loại thay đổi KHÔNG được phép theo `allow` — rỗng nghĩa là hợp lệ. */
export function allowanceViolations(allow: LabAllowance, classes: readonly ChangeClass[]): ChangeClass[] {
  const permitted: Record<ChangeClass, boolean> = {
    'add-device': allow.addDevices.length > 0,
    'remove-device': allow.removeDevices,
    'add-link': allow.addLinks,
    'remove-link': allow.removeLinks,
    vlan: allow.setVlan,
    ip: allow.setIp,
    routes: allow.setRoutes,
  }
  return classes.filter((c) => !permitted[c])
}

/** Cổng nào của một thiết bị đang còn trống — UI gợi ý chỗ cắm dây. */
export function freePortsOf(topo: Topology, deviceId: DeviceId): PortId[] {
  const device = findDevice(topo, deviceId)
  if (device === null) return []
  const ids = device.kind === 'pc' ? [device.port.id] : device.ports.map((p) => p.id)
  return ids.filter((portId) => linkOfPort(topo, { deviceId, portId }) === null)
}
