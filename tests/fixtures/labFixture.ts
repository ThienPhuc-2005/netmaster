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

// ---------------------------------------------------------------
// TRUNK 802.1Q — nguyên liệu của Module 14 (spec v2 Phần D)
// ---------------------------------------------------------------

/** Chỉ được đổi vai cổng và cấu hình trunk — quyền của bài Module 14. */
export const ONLY_TRUNK_ALLOWANCE: LabAllowance = {
  addDevices: [],
  removeDevices: false,
  addLinks: false,
  removeLinks: false,
  setVlan: false,
  setTrunk: true,
  setIp: false,
  setRoutes: false,
  maxDevices: 8,
}

/**
 * Hai tòa nhà, hai xóm, MỘT sợi dây nối giữa.
 *
 * Kế toán (A ở switch 1, B ở switch 2) cùng VLAN 10; kỹ thuật (C, D)
 * cùng VLAN 20. Cả hai xóm phải đi chung sợi dây giữa hai switch — đó
 * chính là lý do trunk tồn tại, và là cảnh mà cổng access không giải
 * quyết nổi (một sợi chỉ chở được một VLAN).
 *
 * `trunkPair` quyết định hai cổng nối giữa được khai thế nào — mỗi ca
 * bệnh của bài là một cách khai khác nhau.
 */
function twoSiteVlans(trunkPair: {
  left: Partial<SwitchDevice['ports'][number]>
  right: Partial<SwitchDevice['ports'][number]>
}): Topology {
  const uplink = (side: 'left' | 'right') => ({
    id: 'p4',
    vlan: 1,
    ...(side === 'left' ? trunkPair.left : trunkPair.right),
  })
  return {
    devices: [
      pc('pc-a', 'PC-A (kế toán)', MAC.pcA, '192.168.1.10', null),
      pc('pc-c', 'PC-C (kỹ thuật)', MAC.pcC, '192.168.1.30', null),
      pc('pc-b', 'PC-B (kế toán)', MAC.pcB, '192.168.1.20', null),
      {
        kind: 'switch',
        id: 'sw-1',
        hostname: 'Switch-1',
        ports: [{ id: 'p1', vlan: 10 }, { id: 'p2', vlan: 20 }, { id: 'p3', vlan: 10 }, uplink('left')],
      },
      {
        kind: 'switch',
        id: 'sw-2',
        hostname: 'Switch-2',
        ports: [{ id: 'p1', vlan: 10 }, { id: 'p2', vlan: 20 }, { id: 'p3', vlan: 10 }, uplink('right')],
      },
    ],
    links: [
      { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'l2', a: { deviceId: 'pc-c', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p2' } },
      { id: 'l3', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-2', portId: 'p1' } },
      { id: 'uplink', a: { deviceId: 'sw-1', portId: 'p4' }, b: { deviceId: 'sw-2', portId: 'p4' } },
    ],
  }
}

/** Trunk khai đúng hai đầu: cả hai VLAN qua được, native khớp. */
export function trunkHealthy(): Topology {
  const trunk = { mode: 'trunk' as const, allowedVlans: [10, 20], nativeVlan: 1 }
  return twoSiteVlans({ left: trunk, right: trunk })
}

/** ĐỀ BÀI: dây giữa hai switch vẫn là cổng access VLAN 1 — chưa ai làm trunk. */
export function trunkMissing(): Topology {
  return twoSiteVlans({ left: {}, right: {} })
}

/** BỆNH 1: trunk quên thêm VLAN 10 vào allowed list ở đầu Switch-2. */
export function trunkAllowedMissingVlan(): Topology {
  return twoSiteVlans({
    left: { mode: 'trunk', allowedVlans: [10, 20], nativeVlan: 1 },
    right: { mode: 'trunk', allowedVlans: [20], nativeVlan: 1 },
  })
}

/**
 * BỆNH 2: hai đầu trunk khai native khác nhau (1 và 99).
 *
 * Chỉ khung ĐI TRẦN mới dính bệnh này — tức đúng những máy nằm trong
 * native VLAN. Khung mang nhãn không hề hấn gì, và chính chỗ đó làm bệnh
 * khó thấy: nửa văn phòng chạy ngon, nửa kia đứt mà không ai báo lỗi.
 * Nên hai máy kế toán ở đây được dời về VLAN 1 (native của đầu trái).
 */
export function trunkNativeMismatch(): Topology {
  const topo = twoSiteVlans({
    left: { mode: 'trunk', allowedVlans: [1, 10, 20], nativeVlan: 1 },
    right: { mode: 'trunk', allowedVlans: [1, 10, 20, 99], nativeVlan: 99 },
  })
  for (const device of topo.devices) {
    if (device.kind !== 'switch') continue
    const accessPort = device.ports.find((p) => p.id === 'p1')
    if (accessPort !== undefined) accessPort.vlan = 1
  }
  return topo
}

/**
 * Đề lab Module 14: "một sợi dây, hai xóm".
 *
 * Cặp mục tiêu thông + chặn giữ nguyên luật của Module 4: gộp tất cả vào
 * một VLAN thì A gọi được B nhưng cũng gọi được C — hỏng bức tường phòng ban.
 */
export function trunkLab(): LabSpec {
  return {
    initial: trunkMissing(),
    goals: [
      { kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' },
      { kind: 'ping', from: 'pc-a', to: 'pc-c', expect: 'blocked' },
    ],
    allow: ONLY_TRUNK_ALLOWANCE,
    solution: trunkHealthy(),
  }
}

// ---------------------------------------------------------------
// STP — nguyên liệu của Module 15 (spec v2 Phần D)
// ---------------------------------------------------------------

/** Chỉ được gỡ dây và bật STP — quyền của bài Module 15. */
export const ONLY_STP_ALLOWANCE: LabAllowance = {
  addDevices: [],
  removeDevices: false,
  addLinks: false,
  removeLinks: true,
  setStp: true,
  setVlan: false,
  setIp: false,
  setRoutes: false,
  maxDevices: 8,
}

/**
 * BA SWITCH NỐI VÒNG TAM GIÁC — cảnh mở màn của Module 15.
 *
 * Nối vòng để có đường dự phòng là việc ĐÚNG của người làm mạng; cái sai
 * là nối vòng mà quên bật STP. Chưa bật: câu hỏi quảng bá quay vòng mãi
 * và nhấn chìm mạng. Bật rồi: đúng một cổng nằm im, mạng sống, và rút
 * dây chính thì cổng đó tự mở.
 *
 * Priority khai tường minh để luật bầu root nhìn thấy được: sw-2 thấp
 * nhất (4096) nên nó làm root, dù tên nó không phải nhỏ nhất.
 */
export function ringOfSwitches(stpOn: boolean): Topology {
  const ringSwitch = (id: string, hostname: string, priority: number): SwitchDevice => ({
    kind: 'switch',
    id,
    hostname,
    bridgePriority: priority,
    ports: [
      { id: 'p1', vlan: 1 },
      { id: 'p2', vlan: 1 },
      { id: 'p3', vlan: 1 },
    ],
  })
  return {
    stpEnabled: stpOn,
    devices: [
      pc('pc-a', 'PC-A', MAC.pcA, '192.168.1.10', null),
      pc('pc-b', 'PC-B', MAC.pcB, '192.168.1.20', null),
      ringSwitch('sw-1', 'Switch-1', 32768),
      ringSwitch('sw-2', 'Switch-2', 4096),
      ringSwitch('sw-3', 'Switch-3', 32768),
    ],
    links: [
      { id: 'la', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'lb', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-3', portId: 'p1' } },
      { id: 'ring-12', a: { deviceId: 'sw-1', portId: 'p2' }, b: { deviceId: 'sw-2', portId: 'p2' } },
      { id: 'ring-23', a: { deviceId: 'sw-2', portId: 'p3' }, b: { deviceId: 'sw-3', portId: 'p2' } },
      { id: 'ring-31', a: { deviceId: 'sw-3', portId: 'p3' }, b: { deviceId: 'sw-1', portId: 'p3' } },
    ],
  }
}

/** Đề lab Module 15: mạng vòng đang bão, bật STP cho nó sống lại. */
export function stpLab(): LabSpec {
  return {
    initial: ringOfSwitches(false),
    goals: [{ kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' }],
    allow: ONLY_STP_ALLOWANCE,
    solution: ringOfSwitches(true),
  }
}

// ---------------------------------------------------------------
// ACL — nguyên liệu của Module 17 (spec v2 mục 4.3)
// ---------------------------------------------------------------

export const ONLY_ACL_ALLOWANCE: LabAllowance = {
  addDevices: [],
  removeDevices: false,
  addLinks: false,
  removeLinks: false,
  setVlan: false,
  setIp: false,
  setRoutes: false,
  maxDevices: 8,
}

/**
 * Mạng hai nhánh qua router, kèm một danh sách lọc trên router.
 *
 * `apply` quyết định danh sách đã được ÁP lên cổng hay mới chỉ khai —
 * đúng cặp trạng thái làm nên bài học "khai suông chưa lọc gì".
 * `onlyPermitOther` bỏ vế cấm tường minh đi, để chỉ còn DÒNG CẤM VÔ HÌNH
 * ra tay: cùng một kết quả chặn nhưng vì lý do khác hẳn.
 */
export function routedWithAcl(opts: { apply: boolean; onlyPermitOther?: boolean }): Topology {
  const topo = routedNetwork()
  const router = topo.devices.find((d) => d.id === 'r-1') as RouterDevice
  router.accessLists = [
    {
      number: 101,
      rules:
        opts.onlyPermitOther === true
          ? [
              {
                seq: 10,
                action: 'permit',
                protocol: 'icmp',
                src: { ip: '172.16.0.0', wildcard: '0.0.255.255' },
                dst: { ip: '0.0.0.0', wildcard: '255.255.255.255' },
              },
            ]
          : [
              {
                seq: 10,
                action: 'permit',
                protocol: 'icmp',
                src: { ip: '192.168.9.0', wildcard: '0.0.0.255' },
                dst: { ip: '0.0.0.0', wildcard: '255.255.255.255' },
              },
              {
                seq: 20,
                action: 'deny',
                protocol: 'icmp',
                src: { ip: '192.168.1.10', wildcard: '0.0.0.0' },
                dst: { ip: '0.0.0.0', wildcard: '255.255.255.255' },
              },
            ],
    },
  ]
  if (opts.apply) {
    const port = router.ports.find((p) => p.id === 'g0')
    if (port !== undefined) port.aclIn = 101
  }
  return topo
}

/**
 * Đề lab Module 17: bộ lọc đang chặn nhầm PC-A.
 *
 * Cặp mục tiêu thông + chặn giữ đúng nếp Module 4: mở toang cho tất cả
 * thì PC-A gọi được PC-B, nhưng máy khách 192.168.1.66 cũng lọt.
 */
export function aclLab(): LabSpec {
  const fixed = routedWithAcl({ apply: true })
  const router = fixed.devices.find((d) => d.id === 'r-1') as RouterDevice
  router.accessLists = [
    {
      number: 101,
      rules: [
        {
          seq: 10,
          action: 'permit',
          protocol: 'icmp',
          src: { ip: '192.168.1.10', wildcard: '0.0.0.0' },
          dst: { ip: '0.0.0.0', wildcard: '255.255.255.255' },
        },
      ],
    },
  ]
  return {
    initial: routedWithAcl({ apply: true }),
    goals: [{ kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' }],
    allow: ONLY_ACL_ALLOWANCE,
    solution: fixed,
  }
}

// ---------------------------------------------------------------
// OSPF — nguyên liệu của Module 16 (spec v2 mục 4.3)
// ---------------------------------------------------------------

const OSPF_MAC = {
  r1Lan: 'AA:BB:CC:00:00:21',
  r1Wan: 'AA:BB:CC:00:00:22',
  r1Wan2: 'AA:BB:CC:00:00:23',
  r2Lan: 'AA:BB:CC:00:00:31',
  r2Wan: 'AA:BB:CC:00:00:32',
  r2Wan2: 'AA:BB:CC:00:00:33',
  r3Lan: 'AA:BB:CC:00:00:41',
  r3Wan: 'AA:BB:CC:00:00:42',
  r3Wan2: 'AA:BB:CC:00:00:43',
} as const

/**
 * Hai router nối nhau, mỗi bên một LAN, KHÔNG có tuyến tĩnh nào.
 *
 * Ping xuyên hai LAN chỉ chạy được khi OSPF lên láng giềng và học được
 * đường — nên đây là bằng chứng thuần khiết cho "bảng định tuyến tự học".
 * Các cờ tắt lần lượt từng điều kiện lên láng giềng, mỗi cờ một ca bệnh.
 */
export function twoRouterOspf(opts: {
  ospfOnR2?: boolean
  declareOnR2?: boolean
  mismatchSubnet?: boolean
}): Topology {
  const ospfOnR2 = opts.ospfOnR2 !== false
  const declareOnR2 = opts.declareOnR2 !== false
  const wanIpR2 = opts.mismatchSubnet === true ? '10.0.99.2' : '10.0.12.2'

  const r1: RouterDevice = {
    kind: 'router',
    id: 'r-1',
    hostname: 'Router-1',
    ports: [
      { id: 'g0', mac: OSPF_MAC.r1Lan, ipConfig: { ip: '192.168.1.1', prefix: 24 } },
      { id: 'g1', mac: OSPF_MAC.r1Wan, ipConfig: { ip: '10.0.12.1', prefix: 24 } },
    ],
    staticRoutes: [],
    ospf: {
      processId: 1,
      networks: [
        { ip: '192.168.1.0', wildcard: '0.0.0.255', area: 0 },
        { ip: '10.0.12.0', wildcard: '0.0.0.255', area: 0 },
      ],
    },
  }
  const r2: RouterDevice = {
    kind: 'router',
    id: 'r-2',
    hostname: 'Router-2',
    ports: [
      { id: 'g0', mac: OSPF_MAC.r2Lan, ipConfig: { ip: '192.168.2.1', prefix: 24 } },
      { id: 'g1', mac: OSPF_MAC.r2Wan, ipConfig: { ip: wanIpR2, prefix: 24 } },
    ],
    staticRoutes: [],
    ospf: ospfOnR2
      ? {
          processId: 1,
          networks: declareOnR2
            ? [
                { ip: '192.168.2.0', wildcard: '0.0.0.255', area: 0 },
                { ip: '10.0.12.0', wildcard: '0.0.0.255', area: 0 },
              ]
            : [{ ip: '192.168.2.0', wildcard: '0.0.0.255', area: 0 }],
        }
      : undefined,
  }

  return {
    devices: [
      pc('pc-a', 'PC-A (chi nhánh 1)', MAC.pcA, '192.168.1.10', '192.168.1.1'),
      pc('pc-b', 'PC-B (chi nhánh 2)', MAC.pcB, '192.168.2.10', '192.168.2.1'),
      sw('sw-1', 'Switch-1', [1, 1]),
      sw('sw-2', 'Switch-2', [1, 1]),
      r1,
      r2,
    ],
    links: [
      { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'l2', a: { deviceId: 'sw-1', portId: 'p2' }, b: { deviceId: 'r-1', portId: 'g0' } },
      { id: 'l3', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-2', portId: 'p1' } },
      { id: 'l4', a: { deviceId: 'sw-2', portId: 'p2' }, b: { deviceId: 'r-2', portId: 'g0' } },
      { id: 'wan-12', a: { deviceId: 'r-1', portId: 'g1' }, b: { deviceId: 'r-2', portId: 'g1' } },
    ],
  }
}

/**
 * Ba router nối vòng, mỗi router một LAN — sơ đồ để thấy cost và đường
 * vòng. `cutLink13` rút sợi nối thẳng r-1 với r-3 (đóng vai máy xúc);
 * `staticShortcut` cắm thêm một tuyến tĩnh cùng đích để soi luật AD.
 */
export function threeRouterRing(opts: { cutLink13?: boolean; staticShortcut?: boolean }): Topology {
  const mkRouter = (
    id: string,
    hostname: string,
    lanIp: string,
    lanMac: string,
    wan: { id: string; ip: string; mac: string }[],
    staticRoutes: RouterDevice['staticRoutes'] = [],
  ): RouterDevice => ({
    kind: 'router',
    id,
    hostname,
    ports: [
      { id: 'g0', mac: lanMac, ipConfig: { ip: lanIp, prefix: 24 } },
      ...wan.map((w) => ({ id: w.id, mac: w.mac, ipConfig: { ip: w.ip, prefix: 24 } })),
    ],
    staticRoutes,
    ospf: {
      processId: 1,
      networks: [
        { ip: `${lanIp.split('.').slice(0, 3).join('.')}.0`, wildcard: '0.0.0.255', area: 0 },
        ...wan.map((w) => ({
          ip: `${w.ip.split('.').slice(0, 3).join('.')}.0`,
          wildcard: '0.0.0.255',
          area: 0,
        })),
      ],
    },
  })

  const r1 = mkRouter(
    'r-1',
    'Router-1',
    '192.168.1.1',
    OSPF_MAC.r1Lan,
    [
      { id: 'g1', ip: '10.0.12.1', mac: OSPF_MAC.r1Wan },
      { id: 'g2', ip: '10.0.13.1', mac: OSPF_MAC.r1Wan2 },
    ],
    opts.staticShortcut === true
      ? [{ destination: '192.168.3.0', prefix: 24, nextHop: '10.0.12.2' }]
      : [],
  )
  const r2 = mkRouter('r-2', 'Router-2', '192.168.2.1', OSPF_MAC.r2Lan, [
    { id: 'g1', ip: '10.0.12.2', mac: OSPF_MAC.r2Wan },
    { id: 'g2', ip: '10.0.23.2', mac: OSPF_MAC.r2Wan2 },
  ])
  const r3 = mkRouter('r-3', 'Router-3', '192.168.3.1', OSPF_MAC.r3Lan, [
    { id: 'g1', ip: '10.0.23.3', mac: OSPF_MAC.r3Wan },
    { id: 'g2', ip: '10.0.13.3', mac: OSPF_MAC.r3Wan2 },
  ])

  const links = [
    { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
    { id: 'l2', a: { deviceId: 'sw-1', portId: 'p2' }, b: { deviceId: 'r-1', portId: 'g0' } },
    { id: 'l3', a: { deviceId: 'pc-c', portId: 'eth0' }, b: { deviceId: 'sw-3', portId: 'p1' } },
    { id: 'l4', a: { deviceId: 'sw-3', portId: 'p2' }, b: { deviceId: 'r-3', portId: 'g0' } },
    { id: 'wan-12', a: { deviceId: 'r-1', portId: 'g1' }, b: { deviceId: 'r-2', portId: 'g1' } },
    { id: 'wan-23', a: { deviceId: 'r-2', portId: 'g2' }, b: { deviceId: 'r-3', portId: 'g1' } },
  ]
  if (opts.cutLink13 !== true) {
    links.push({ id: 'wan-13', a: { deviceId: 'r-1', portId: 'g2' }, b: { deviceId: 'r-3', portId: 'g2' } })
  }

  return {
    devices: [
      pc('pc-a', 'PC-A (chi nhánh 1)', MAC.pcA, '192.168.1.10', '192.168.1.1'),
      pc('pc-c', 'PC-C (chi nhánh 3)', MAC.pcC, '192.168.3.10', '192.168.3.1'),
      sw('sw-1', 'Switch-1', [1, 1]),
      sw('sw-3', 'Switch-3', [1, 1]),
      r1,
      r2,
      r3,
    ],
    links,
  }
}
