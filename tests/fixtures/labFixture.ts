// Các topology mẫu cho bộ test phòng lab — đồng thời là TÀI LIỆU MẪU
// cho người soạn bài Module 4 ở Khối 2.5: đây chính là hình dạng dữ liệu
// mà một bài lab cần khai trong JSON.
//
// Mỗi builder trả về một đồ thị đối tượng MỚI TINH mỗi lần gọi, nên test
// có thể sửa thoải mái mà không rò rỉ trạng thái sang test khác.

import type { Ipv4, PcDevice, RouterDevice, SwitchDevice, Topology } from '../../src/engine/lab/topology'
import type { LabSpec } from '../../src/engine/lab/gradeLab'
import type { LabAllowance } from '../../src/engine/lab/session'

/** MAC dễ đọc, dễ tham chiếu từ lời giảng: 4 số cuối là số thứ tự máy. */
export const MAC = {
  pcA: 'AA:BB:CC:00:00:01',
  pcB: 'AA:BB:CC:00:00:02',
  pcC: 'AA:BB:CC:00:00:03',
  routerLan: 'AA:BB:CC:00:00:11',
  routerWan: 'AA:BB:CC:00:00:12',
} as const

function pc(id: string, hostname: string, mac: string, ip: Ipv4 | null, gateway: Ipv4 | null): PcDevice {
  return {
    kind: 'pc',
    id,
    hostname,
    port: { id: 'eth0', mac },
    ipConfig: ip === null ? null : { ip, prefix: 24 },
    gateway,
  }
}

function sw(id: string, hostname: string, vlans: number[]): SwitchDevice {
  return {
    kind: 'switch',
    id,
    hostname,
    ports: vlans.map((vlan, i) => ({ id: `p${i + 1}`, vlan })),
  }
}

/** Hai máy cùng một switch, cùng VLAN, cùng subnet — mạng phẳng chạy được. */
export function flatNetwork(): Topology {
  return {
    devices: [
      pc('pc-a', 'PC-A', MAC.pcA, '192.168.1.10', null),
      pc('pc-b', 'PC-B', MAC.pcB, '192.168.1.20', null),
      sw('sw-1', 'Switch-1', [1, 1, 1, 1]),
    ],
    links: [
      { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'l2', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p2' } },
    ],
  }
}

/**
 * CA HỎNG CỦA SPEC MODULE 4: ba máy cùng subnet, cùng một switch, nhưng
 * PC-A nằm VLAN 10 còn PC-B nằm VLAN 20 → không ping được nhau dù địa
 * chỉ IP trông "đúng hết". PC-C ở VLAN 20 cùng PC-B.
 *
 * Đây là bài "sửa mạng hỏng TRƯỚC khi học lý thuyết VLAN" (productive
 * failure): người học phải tự phát hiện thủ phạm là VLAN, không phải IP.
 */
export function splitVlanNetwork(): Topology {
  return {
    devices: [
      pc('pc-a', 'PC-A', MAC.pcA, '192.168.1.10', null),
      pc('pc-b', 'PC-B', MAC.pcB, '192.168.1.20', null),
      pc('pc-c', 'PC-C', MAC.pcC, '192.168.1.30', null),
      sw('sw-1', 'Switch-1', [10, 20, 20, 10]),
    ],
    links: [
      { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'l2', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p2' } },
      { id: 'l3', a: { deviceId: 'pc-c', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p3' } },
    ],
  }
}

/** Lời giải của `splitVlanNetwork`: đưa cổng PC-A về đúng VLAN của PC-B. */
export function splitVlanFixed(): Topology {
  const topo = splitVlanNetwork()
  const target = topo.devices.find((d) => d.id === 'sw-1')
  if (target?.kind === 'switch') {
    target.ports = target.ports.map((p) => (p.id === 'p1' ? { ...p, vlan: 20 } : p))
  }
  return topo
}

/**
 * Hai subnet nối qua router hai cổng vật lý (KHÔNG router-on-a-stick —
 * ngoài phạm vi đã chốt). Mỗi bên một switch riêng.
 */
export function routedNetwork(): Topology {
  const router: RouterDevice = {
    kind: 'router',
    id: 'r-1',
    hostname: 'Router-1',
    ports: [
      { id: 'g0', mac: MAC.routerLan, ipConfig: { ip: '192.168.1.1', prefix: 24 } },
      { id: 'g1', mac: MAC.routerWan, ipConfig: { ip: '10.0.0.1', prefix: 24 } },
    ],
    staticRoutes: [],
  }
  const pcB = pc('pc-b', 'PC-B', MAC.pcB, '10.0.0.20', '10.0.0.1')
  return {
    devices: [pc('pc-a', 'PC-A', MAC.pcA, '192.168.1.10', '192.168.1.1'), pcB, sw('sw-1', 'Switch-1', [1, 1, 1]), sw('sw-2', 'Switch-2', [1, 1, 1]), router],
    links: [
      { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'l2', a: { deviceId: 'sw-1', portId: 'p2' }, b: { deviceId: 'r-1', portId: 'g0' } },
      { id: 'l3', a: { deviceId: 'r-1', portId: 'g1' }, b: { deviceId: 'sw-2', portId: 'p1' } },
      { id: 'l4', a: { deviceId: 'sw-2', portId: 'p2' }, b: { deviceId: 'pc-b', portId: 'eth0' } },
    ],
  }
}

/** Hai switch nối nhau bằng HAI sợi dây — mạng vòng, không có STP thì bão. */
export function loopedNetwork(): Topology {
  return {
    devices: [
      pc('pc-a', 'PC-A', MAC.pcA, '192.168.1.10', null),
      pc('pc-b', 'PC-B', MAC.pcB, '192.168.1.20', null),
      sw('sw-1', 'Switch-1', [1, 1, 1, 1]),
      sw('sw-2', 'Switch-2', [1, 1, 1, 1]),
    ],
    links: [
      { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'l2', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-2', portId: 'p1' } },
      { id: 'l3', a: { deviceId: 'sw-1', portId: 'p2' }, b: { deviceId: 'sw-2', portId: 'p2' } },
      { id: 'l4', a: { deviceId: 'sw-1', portId: 'p3' }, b: { deviceId: 'sw-2', portId: 'p3' } },
    ],
  }
}

/** Hai máy rời rạc, chưa có switch, chưa có dây — bài "tự lắp từ đầu". */
export function looseParts(): Topology {
  return {
    devices: [
      pc('pc-a', 'PC-A', MAC.pcA, '192.168.1.10', null),
      pc('pc-b', 'PC-B', MAC.pcB, '192.168.1.20', null),
    ],
    links: [],
  }
}

// ---------------------------------------------------------------
// Đề lab hoàn chỉnh (LabSpec) — hình dạng mà nội dung Module 4 sẽ khai
// ---------------------------------------------------------------

const MAC_PC_D = 'AA:BB:CC:00:00:04'

/** Chỉ được đổi VLAN — quyền của bài "sửa mạng hỏng". */
export const ONLY_VLAN_ALLOWANCE: LabAllowance = {
  addDevices: [],
  removeDevices: false,
  addLinks: false,
  removeLinks: false,
  setVlan: true,
  setIp: false,
  setRoutes: false,
  maxDevices: 6,
}

/** Chỉ được cắm dây — quyền của bài "lắp mạng từ thiết bị rời". */
export const ONLY_WIRING_ALLOWANCE: LabAllowance = {
  addDevices: [],
  removeDevices: false,
  addLinks: true,
  removeLinks: true,
  setVlan: false,
  setIp: false,
  setRoutes: false,
  maxDevices: 6,
}

/**
 * Bốn máy hai phòng ban, cùng một dải địa chỉ. Kế toán (A, B) phải nói
 * chuyện được với nhau; Kỹ thuật (C, D) phải TÁCH khỏi kế toán.
 *
 * Đề bài hỏng ở chỗ B bị xếp nhầm sang VLAN của Kỹ thuật, nên A không
 * gọi được B — dù nhìn địa chỉ IP thì "đáng lẽ phải được".
 */
export function teamsNetwork(): Topology {
  return {
    devices: [
      pc('pc-a', 'PC-A (kế toán)', MAC.pcA, '192.168.1.10', null),
      pc('pc-b', 'PC-B (kế toán)', MAC.pcB, '192.168.1.20', null),
      pc('pc-c', 'PC-C (kỹ thuật)', MAC.pcC, '192.168.1.30', null),
      pc('pc-d', 'PC-D (kỹ thuật)', MAC_PC_D, '192.168.1.40', null),
      sw('sw-1', 'Switch-1', [10, 20, 20, 20]),
    ],
    links: [
      { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'l2', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p2' } },
      { id: 'l3', a: { deviceId: 'pc-c', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p3' } },
      { id: 'l4', a: { deviceId: 'pc-d', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p4' } },
    ],
  }
}

/** Lời giải: kéo B về VLAN của kế toán. Kỹ thuật vẫn tách riêng. */
export function teamsFixed(): Topology {
  const topo = teamsNetwork()
  const swi = topo.devices.find((d) => d.id === 'sw-1')
  if (swi?.kind === 'switch') {
    swi.ports = swi.ports.map((p) => (p.id === 'p2' ? { ...p, vlan: 10 } : p))
  }
  return topo
}

/** Lời giải RẺ TIỀN: gộp tất cả vào một VLAN. Thông hết — và sai bài. */
export function teamsAllOneVlan(): Topology {
  const topo = teamsNetwork()
  const swi = topo.devices.find((d) => d.id === 'sw-1')
  if (swi?.kind === 'switch') swi.ports = swi.ports.map((p) => ({ ...p, vlan: 10 }))
  return topo
}

/**
 * Đề lab "sửa VLAN". Cặp mục tiêu reach + blocked chính là thứ chặn lời
 * giải gộp-hết-vào-một-VLAN: đúng một nửa yêu cầu không phải là đúng.
 */
export function vlanRepairLab(): LabSpec {
  return {
    initial: teamsNetwork(),
    goals: [
      { kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' },
      { kind: 'ping', from: 'pc-a', to: 'pc-c', expect: 'blocked' },
    ],
    allow: ONLY_VLAN_ALLOWANCE,
    solution: teamsFixed(),
  }
}

/** Hai máy và một switch nằm rời trên bàn, chưa cắm dây nào. */
export function unwiredParts(): Topology {
  return {
    devices: [
      pc('pc-a', 'PC-A', MAC.pcA, '192.168.1.10', null),
      pc('pc-b', 'PC-B', MAC.pcB, '192.168.1.20', null),
      sw('sw-1', 'Switch-1', [1, 1, 1, 1]),
    ],
    links: [],
  }
}

/** Lời giải: cắm mỗi máy vào một cổng switch. */
export function wiredUp(): Topology {
  const topo = unwiredParts()
  topo.links = [
    { id: 'w1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
    { id: 'w2', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p2' } },
  ]
  return topo
}

/**
 * Đề lab "lắp mạng từ thiết bị rời" (IKEA effect, spec Module 4).
 * `pathThrough` bắt gói tin phải ĐI QUA switch — không cho nối thẳng hai
 * máy vào nhau rồi coi như xong.
 */
export function wiringLab(): LabSpec {
  return {
    initial: unwiredParts(),
    goals: [
      { kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' },
      { kind: 'pathThrough', from: 'pc-a', to: 'pc-b', via: ['sw-1'] },
      { kind: 'macLearned', switchId: 'sw-1', mac: MAC.pcA, portId: 'p1', vlan: 1 },
    ],
    allow: ONLY_WIRING_ALLOWANCE,
    solution: wiredUp(),
  }
}
