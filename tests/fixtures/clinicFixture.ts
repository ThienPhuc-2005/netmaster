// Ca bệnh mẫu cho Phòng khám (spec Module 11) — đúng thang dễ → khó mà
// spec liệt kê: rút dây, sai gateway, DNS chết, trùng IP, GPO chặn nhầm.
// Đây là hình dạng dữ liệu mà module-11.json sẽ khai thật; dựng ở đây
// trước để test engine bám vào ca THẬT chứ không ca bịa dễ dãi.

import type { Topology } from '../../src/engine/lab/topology'
import type { ClinicCaseSpec } from '../../src/engine/clinic/gradeClinic'

// ---------------------------------------------------------------
// Ca 1 — RÚT DÂY (dễ nhất): máy kế toán không nối vào switch.
// ---------------------------------------------------------------

const RUT_DAY_INITIAL: Topology = {
  devices: [
    {
      kind: 'pc',
      id: 'cl1-may-ke-toan',
      hostname: 'MAY-KE-TOAN',
      port: { id: 'eth0', mac: 'AA:BB:CC:C1:00:01' },
      ipConfig: { ip: '192.168.10.10', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'pc',
      id: 'cl1-may-in',
      hostname: 'MAY-IN',
      port: { id: 'eth0', mac: 'AA:BB:CC:C1:00:02' },
      ipConfig: { ip: '192.168.10.20', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'switch',
      id: 'cl1-switch',
      hostname: 'SW-TANG-3',
      ports: [
        { id: 'p1', vlan: 1 },
        { id: 'p2', vlan: 1 },
      ],
    },
  ],
  links: [
    {
      id: 'cl1-w-in',
      a: { deviceId: 'cl1-may-in', portId: 'eth0' },
      b: { deviceId: 'cl1-switch', portId: 'p2' },
    },
  ],
}

export const CASE_RUT_DAY: ClinicCaseSpec = {
  patient: { topology: RUT_DAY_INITIAL, overlay: {}, seatId: 'cl1-may-ke-toan' },
  symptom: { kind: 'ping-fails', from: 'cl1-may-ke-toan', target: '192.168.10.20' },
  fix: {
    kind: 'edit-network',
    allow: {
      addDevices: [],
      removeDevices: false,
      addLinks: true,
      removeLinks: true,
      setVlan: false,
      setIp: false,
      setRoutes: false,
      maxDevices: 4,
    },
    goals: [{ kind: 'ping', from: 'cl1-may-ke-toan', to: 'cl1-may-in', expect: 'reach' }],
    solution: {
      ...RUT_DAY_INITIAL,
      links: [
        ...RUT_DAY_INITIAL.links,
        {
          id: 'cl1-w-seat',
          a: { deviceId: 'cl1-may-ke-toan', portId: 'eth0' },
          b: { deviceId: 'cl1-switch', portId: 'p1' },
        },
      ],
    },
  },
}

// ---------------------------------------------------------------
// Ca 2 — SAI GATEWAY: máy trỏ cửa ra về một địa chỉ không ai giữ.
// ---------------------------------------------------------------

const SAI_GATEWAY_INITIAL: Topology = {
  devices: [
    {
      kind: 'pc',
      id: 'cl2-may-ke-toan',
      hostname: 'MAY-KE-TOAN',
      port: { id: 'eth0', mac: 'AA:BB:CC:C2:00:01' },
      ipConfig: { ip: '192.168.10.10', prefix: 24 },
      gateway: '192.168.10.99',
    },
    {
      kind: 'switch',
      id: 'cl2-switch',
      hostname: 'SW-TANG-3',
      ports: [
        { id: 'p1', vlan: 1 },
        { id: 'p2', vlan: 1 },
      ],
    },
    {
      kind: 'router',
      id: 'cl2-router',
      hostname: 'RT-VAN-PHONG',
      ports: [
        { id: 'lan', mac: 'AA:BB:CC:C2:01:01', ipConfig: { ip: '192.168.10.1', prefix: 24 } },
        { id: 'wan', mac: 'AA:BB:CC:C2:01:02', ipConfig: { ip: '203.0.113.2', prefix: 30 } },
      ],
      staticRoutes: [{ destination: '0.0.0.0', prefix: 0, nextHop: '203.0.113.1' }],
    },
    {
      kind: 'pc',
      id: 'cl2-may-chu-web',
      hostname: 'WEB-CONG-TY',
      port: { id: 'eth0', mac: 'AA:BB:CC:C2:00:09' },
      ipConfig: { ip: '203.0.113.1', prefix: 30 },
      gateway: '203.0.113.2',
    },
  ],
  links: [
    { id: 'cl2-w-seat', a: { deviceId: 'cl2-may-ke-toan', portId: 'eth0' }, b: { deviceId: 'cl2-switch', portId: 'p1' } },
    { id: 'cl2-w-rt', a: { deviceId: 'cl2-switch', portId: 'p2' }, b: { deviceId: 'cl2-router', portId: 'lan' } },
    { id: 'cl2-w-web', a: { deviceId: 'cl2-router', portId: 'wan' }, b: { deviceId: 'cl2-may-chu-web', portId: 'eth0' } },
  ],
}

function withSeatGateway(topology: Topology, gateway: string): Topology {
  return {
    ...topology,
    devices: topology.devices.map((d) =>
      d.kind === 'pc' && d.id === 'cl2-may-ke-toan' ? { ...d, gateway } : d,
    ),
  }
}

export const CASE_SAI_GATEWAY: ClinicCaseSpec = {
  patient: { topology: SAI_GATEWAY_INITIAL, overlay: {}, seatId: 'cl2-may-ke-toan' },
  symptom: { kind: 'ping-fails', from: 'cl2-may-ke-toan', target: '203.0.113.1' },
  fix: {
    kind: 'edit-network',
    allow: {
      addDevices: [],
      removeDevices: false,
      addLinks: false,
      removeLinks: false,
      setVlan: false,
      setIp: true,
      setRoutes: false,
      maxDevices: 6,
    },
    goals: [{ kind: 'ping', from: 'cl2-may-ke-toan', to: 'cl2-may-chu-web', expect: 'reach' }],
    solution: withSeatGateway(SAI_GATEWAY_INITIAL, '192.168.10.1'),
  },
}

// ---------------------------------------------------------------
// Ca 3 — DNS CHẾT: mạng khỏe, tên không phân giải được.
// ---------------------------------------------------------------

const DNS_CHET_TOPOLOGY: Topology = {
  devices: [
    {
      kind: 'pc',
      id: 'cl3-may-ke-toan',
      hostname: 'MAY-KE-TOAN',
      port: { id: 'eth0', mac: 'AA:BB:CC:C3:00:01' },
      ipConfig: { ip: '192.168.10.10', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'pc',
      id: 'cl3-may-chu-dns',
      hostname: 'DNS-NOI-BO',
      port: { id: 'eth0', mac: 'AA:BB:CC:C3:00:53' },
      ipConfig: { ip: '192.168.10.53', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'pc',
      id: 'cl3-may-chu-web',
      hostname: 'WEB-NOI-BO',
      port: { id: 'eth0', mac: 'AA:BB:CC:C3:00:80' },
      ipConfig: { ip: '192.168.10.80', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'switch',
      id: 'cl3-switch',
      hostname: 'SW-TANG-3',
      ports: [
        { id: 'p1', vlan: 1 },
        { id: 'p2', vlan: 1 },
        { id: 'p3', vlan: 1 },
      ],
    },
  ],
  links: [
    { id: 'cl3-w-seat', a: { deviceId: 'cl3-may-ke-toan', portId: 'eth0' }, b: { deviceId: 'cl3-switch', portId: 'p1' } },
    { id: 'cl3-w-dns', a: { deviceId: 'cl3-may-chu-dns', portId: 'eth0' }, b: { deviceId: 'cl3-switch', portId: 'p2' } },
    { id: 'cl3-w-web', a: { deviceId: 'cl3-may-chu-web', portId: 'eth0' }, b: { deviceId: 'cl3-switch', portId: 'p3' } },
  ],
}

export const CASE_DNS_CHET: ClinicCaseSpec = {
  patient: {
    topology: DNS_CHET_TOPOLOGY,
    overlay: {
      dns: {
        serverIp: '192.168.10.53',
        records: [{ name: 'web.noibo.vn', ip: '192.168.10.80' }],
        down: true,
      },
    },
    seatId: 'cl3-may-ke-toan',
  },
  symptom: { kind: 'resolve-fails', from: 'cl3-may-ke-toan', name: 'web.noibo.vn' },
  fix: { kind: 'choose-action' },
}

// ---------------------------------------------------------------
// Ca 4 — TRÙNG IP: máy in mới cắm nhầm đúng IP tĩnh của máy in cũ.
// ---------------------------------------------------------------

const TRUNG_IP_INITIAL: Topology = {
  devices: [
    {
      kind: 'pc',
      id: 'cl4-may-ke-toan',
      hostname: 'MAY-KE-TOAN',
      port: { id: 'eth0', mac: 'AA:BB:CC:C4:00:01' },
      ipConfig: { ip: '192.168.10.10', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'pc',
      id: 'cl4-may-in-cu',
      hostname: 'MAY-IN-KE-TOAN',
      port: { id: 'eth0', mac: 'AA:BB:CC:C4:00:20' },
      ipConfig: { ip: '192.168.10.20', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'pc',
      id: 'cl4-may-in-moi',
      hostname: 'MAY-IN-MOI',
      port: { id: 'eth0', mac: 'AA:BB:CC:C4:00:21' },
      ipConfig: { ip: '192.168.10.20', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'switch',
      id: 'cl4-switch',
      hostname: 'SW-TANG-3',
      ports: [
        { id: 'p1', vlan: 1 },
        { id: 'p2', vlan: 1 },
        { id: 'p3', vlan: 1 },
      ],
    },
  ],
  links: [
    { id: 'cl4-w-seat', a: { deviceId: 'cl4-may-ke-toan', portId: 'eth0' }, b: { deviceId: 'cl4-switch', portId: 'p1' } },
    { id: 'cl4-w-cu', a: { deviceId: 'cl4-may-in-cu', portId: 'eth0' }, b: { deviceId: 'cl4-switch', portId: 'p2' } },
    { id: 'cl4-w-moi', a: { deviceId: 'cl4-may-in-moi', portId: 'eth0' }, b: { deviceId: 'cl4-switch', portId: 'p3' } },
  ],
}

export const CASE_TRUNG_IP: ClinicCaseSpec = {
  patient: { topology: TRUNG_IP_INITIAL, overlay: {}, seatId: 'cl4-may-ke-toan' },
  symptom: { kind: 'ping-flaps', from: 'cl4-may-ke-toan', target: '192.168.10.20' },
  fix: {
    kind: 'edit-network',
    allow: {
      addDevices: [],
      removeDevices: false,
      addLinks: false,
      removeLinks: false,
      setVlan: false,
      setIp: true,
      setRoutes: false,
      maxDevices: 6,
    },
    goals: [{ kind: 'ping', from: 'cl4-may-ke-toan', to: 'cl4-may-in-cu', expect: 'reach' }],
    mustClearDiagnoses: ['duplicate-ip'],
    solution: {
      ...TRUNG_IP_INITIAL,
      devices: TRUNG_IP_INITIAL.devices.map((d) =>
        d.kind === 'pc' && d.id === 'cl4-may-in-moi'
          ? { ...d, ipConfig: { ip: '192.168.10.21', prefix: 24 } }
          : d,
      ),
    },
  },
}

// ---------------------------------------------------------------
// Ca 5 — GPO CHẶN NHẦM (khó): mạng khỏe, web vẫn chạy, ping chết
// ngay tại máy — thủ phạm nằm trong gpresult.
// ---------------------------------------------------------------

const GPO_CHAN_TOPOLOGY: Topology = {
  devices: [
    {
      kind: 'pc',
      id: 'cl5-may-ke-toan',
      hostname: 'MAY-KE-TOAN',
      port: { id: 'eth0', mac: 'AA:BB:CC:C5:00:01' },
      ipConfig: { ip: '192.168.10.10', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'pc',
      id: 'cl5-may-chu-web',
      hostname: 'WEB-NOI-BO',
      port: { id: 'eth0', mac: 'AA:BB:CC:C5:00:80' },
      ipConfig: { ip: '192.168.10.80', prefix: 24 },
      gateway: null,
    },
    {
      kind: 'switch',
      id: 'cl5-switch',
      hostname: 'SW-TANG-3',
      ports: [
        { id: 'p1', vlan: 1 },
        { id: 'p2', vlan: 1 },
      ],
    },
  ],
  links: [
    { id: 'cl5-w-seat', a: { deviceId: 'cl5-may-ke-toan', portId: 'eth0' }, b: { deviceId: 'cl5-switch', portId: 'p1' } },
    { id: 'cl5-w-web', a: { deviceId: 'cl5-may-chu-web', portId: 'eth0' }, b: { deviceId: 'cl5-switch', portId: 'p2' } },
  ],
}

export const CASE_GPO_CHAN: ClinicCaseSpec = {
  patient: {
    topology: GPO_CHAN_TOPOLOGY,
    overlay: {
      hostBlocks: [
        { deviceId: 'cl5-may-ke-toan', direction: 'outbound', source: 'gpo', ruleName: 'GPO-Chan-ICMP-Ra' },
      ],
      gpos: {
        'cl5-may-ke-toan': [
          { name: 'HinhNen-CongTy' },
          { name: 'GPO-Chan-ICMP-Ra', blocking: true },
          { name: 'LuatMatKhau-Mien' },
        ],
      },
      connections: {
        'cl5-may-ke-toan': [
          { proto: 'TCP', local: '192.168.10.10:51344', remote: '192.168.10.80:443', state: 'ESTABLISHED' },
          { proto: 'TCP', local: '0.0.0.0:445', remote: '*:*', state: 'LISTENING' },
        ],
      },
    },
    seatId: 'cl5-may-ke-toan',
  },
  symptom: { kind: 'ping-fails', from: 'cl5-may-ke-toan', target: '192.168.10.80' },
  fix: { kind: 'choose-action' },
}

// ---------------------------------------------------------------
// Ca 6 — DÂY ỐM: mạng vẫn thông, nhưng chậm và rơi gói ("chậm chứ không
// chết"). Bệnh nằm ở CON SỐ, không ở chỗ thông/không thông — nên nó là
// ca duy nhất mà bốn lệnh cũ đọc lướt sẽ báo "mọi thứ bình thường".
// ---------------------------------------------------------------

const DAY_OM_INITIAL: Topology = {
  devices: [
    {
      kind: 'pc',
      id: 'cl6-may-phong-hop',
      hostname: 'MAY-PHONG-HOP',
      port: { id: 'eth0', mac: 'AA:BB:CC:C6:00:01' },
      ipConfig: { ip: '192.168.30.10', prefix: 24 },
      gateway: '192.168.30.1',
    },
    {
      kind: 'switch',
      id: 'cl6-switch',
      hostname: 'SW-TANG-1',
      ports: [
        { id: 'p1', vlan: 1 },
        { id: 'p2', vlan: 1 },
      ],
    },
    {
      kind: 'router',
      id: 'cl6-router',
      hostname: 'RT-VAN-PHONG',
      ports: [
        { id: 'lan', mac: 'AA:BB:CC:C6:01:01', ipConfig: { ip: '192.168.30.1', prefix: 24 } },
        { id: 'wan', mac: 'AA:BB:CC:C6:01:02', ipConfig: { ip: '10.0.0.1', prefix: 30 } },
      ],
      staticRoutes: [],
    },
    {
      kind: 'pc',
      id: 'cl6-may-chu-hop',
      hostname: 'MAY-CHU-HOP',
      port: { id: 'eth0', mac: 'AA:BB:CC:C6:00:09' },
      ipConfig: { ip: '10.0.0.2', prefix: 30 },
      gateway: '10.0.0.1',
    },
  ],
  links: [
    { id: 'cl6-w-seat-cu', a: { deviceId: 'cl6-may-phong-hop', portId: 'eth0' }, b: { deviceId: 'cl6-switch', portId: 'p1' } },
    { id: 'cl6-w-rt', a: { deviceId: 'cl6-switch', portId: 'p2' }, b: { deviceId: 'cl6-router', portId: 'lan' } },
    { id: 'cl6-w-server', a: { deviceId: 'cl6-router', portId: 'wan' }, b: { deviceId: 'cl6-may-chu-hop', portId: 'eth0' } },
  ],
}

export const CASE_DAY_OM: ClinicCaseSpec = {
  patient: {
    topology: DAY_OM_INITIAL,
    // Sợi dây từ máy xuống switch đã dập: vẫn dẫn, nhưng cộng 90ms mỗi
    // chiều và đánh rơi 1/5 số gói đi qua.
    overlay: { impairments: [{ linkId: 'cl6-w-seat-cu', latencyMs: 90, lossPercent: 20 }] },
    seatId: 'cl6-may-phong-hop',
  },
  symptom: {
    kind: 'ping-degraded',
    from: 'cl6-may-phong-hop',
    target: '10.0.0.2',
    maxLatencyMs: 50,
    maxLossPercent: 0,
  },
  fix: {
    kind: 'edit-network',
    allow: {
      addDevices: [],
      removeDevices: false,
      addLinks: true,
      removeLinks: true,
      setVlan: false,
      setIp: false,
      setRoutes: false,
      maxDevices: 4,
    },
    goals: [{ kind: 'ping', from: 'cl6-may-phong-hop', to: 'cl6-may-chu-hop', expect: 'reach' }],
    // Chữa = THAY sợi dây: gỡ dây cũ ra, cắm dây mới vào đúng hai đầu ấy.
    // Dây mới mang id mới nên hồ sơ bệnh không còn dính vào nó.
    solution: {
      ...DAY_OM_INITIAL,
      links: [
        { id: 'cl6-w-seat-moi', a: { deviceId: 'cl6-may-phong-hop', portId: 'eth0' }, b: { deviceId: 'cl6-switch', portId: 'p1' } },
        ...DAY_OM_INITIAL.links.filter((l) => l.id !== 'cl6-w-seat-cu'),
      ],
    },
  },
}

/**
 * Bản sao sâu của một ca — cho fixture khác (moduleFixture) nhét ca vào
 * nội dung mẫu mà không chia sẻ object graph với các test engine.
 */
export function cloneClinicCase(spec: ClinicCaseSpec): ClinicCaseSpec {
  return JSON.parse(JSON.stringify(spec)) as ClinicCaseSpec
}

export const ALL_CLINIC_CASES: ClinicCaseSpec[] = [
  CASE_RUT_DAY,
  CASE_SAI_GATEWAY,
  CASE_DNS_CHET,
  CASE_TRUNG_IP,
  CASE_GPO_CHAN,
  CASE_DAY_OM,
]
