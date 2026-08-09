// Đề CLI mẫu cho bộ test khối 13.2 — đồng thời là TÀI LIỆU MẪU cho người
// soạn nội dung Module 14-17: đây chính là hình dạng một đề `CliSpec`.
//
// Ba đề phủ ba kiểu mục tiêu mà spec v2 mục 4.2 đòi: hiệu ứng trên mạng
// (ping thông sau khi dựng trunk), hình dạng cấu hình (IP + tuyến tĩnh +
// cổng phải được bật lại), và dấu vết hành động (đã tra đúng bảng).

import type { CliSpec } from '../../src/engine/cli/gradeCli'
import type { RouterDevice, Topology } from '../../src/engine/lab/topology'
import { trunkMissing } from './labFixture'

/**
 * ĐỀ 1 — "một sợi dây, hai xóm", làm bằng LỆNH.
 *
 * Cùng cái mạng của đề lab Module 14 (`trunkLab`), nhưng đường giải là gõ
 * lệnh trên hai switch. Cặp mục tiêu thông + chặn giữ nguyên: gộp tất cả
 * vào một VLAN thì A gọi được B nhưng cũng gọi được C — hỏng bức tường
 * phòng ban.
 */
export function trunkByCli(): CliSpec {
  const trunkSteps = (deviceId: string) => ({
    deviceId,
    lines: [
      'enable',
      'configure terminal',
      'interface p4',
      'switchport mode trunk',
      'switchport trunk allowed vlan 10,20',
      'switchport trunk native vlan 1',
      'end',
    ],
  })
  return {
    initial: trunkMissing(),
    deviceId: 'sw-1',
    goals: [
      { kind: 'port-mode', deviceId: 'sw-1', portId: 'p4', mode: 'trunk' },
      { kind: 'port-mode', deviceId: 'sw-2', portId: 'p4', mode: 'trunk' },
      { kind: 'trunk-carries', deviceId: 'sw-1', portId: 'p4', vlans: [10, 20] },
      { kind: 'trunk-carries', deviceId: 'sw-2', portId: 'p4', vlans: [10, 20] },
      { kind: 'behavior', goal: { kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' } },
      { kind: 'behavior', goal: { kind: 'ping', from: 'pc-a', to: 'pc-c', expect: 'blocked' } },
    ],
    solution: [trunkSteps('sw-1'), trunkSteps('sw-2')],
  }
}

/**
 * Mạng của ĐỀ 2: router có một cổng CHƯA đặt địa chỉ và ĐANG BỊ TẮT.
 *
 * Đây là cú kinh điển của người mới: cấu hình đúng địa chỉ xong vẫn không
 * thông, vì quên `no shutdown`. `show ip interface brief` nói thẳng
 * "administratively down" — bài học nằm ở chỗ đọc được cột đó.
 */
export function routerWithDownPort(): Topology {
  const router: RouterDevice = {
    kind: 'router',
    id: 'r-1',
    hostname: 'Router-1',
    ports: [
      { id: 'g0', mac: 'AA:BB:CC:00:00:11', ipConfig: { ip: '192.168.1.1', prefix: 24 } },
      { id: 'g1', mac: 'AA:BB:CC:00:00:12', ipConfig: null, shutdown: true },
    ],
    staticRoutes: [],
  }
  return {
    devices: [
      {
        kind: 'pc',
        id: 'pc-a',
        hostname: 'PC-A',
        port: { id: 'eth0', mac: 'AA:BB:CC:00:00:01' },
        ipConfig: { ip: '192.168.1.10', prefix: 24 },
        gateway: '192.168.1.1',
      },
      {
        kind: 'pc',
        id: 'pc-b',
        hostname: 'PC-B',
        port: { id: 'eth0', mac: 'AA:BB:CC:00:00:02' },
        ipConfig: { ip: '10.0.0.20', prefix: 24 },
        gateway: '10.0.0.1',
      },
      { kind: 'switch', id: 'sw-1', hostname: 'Switch-1', ports: [{ id: 'p1', vlan: 1 }, { id: 'p2', vlan: 1 }] },
      { kind: 'switch', id: 'sw-2', hostname: 'Switch-2', ports: [{ id: 'p1', vlan: 1 }, { id: 'p2', vlan: 1 }] },
      router,
    ],
    links: [
      { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'l2', a: { deviceId: 'sw-1', portId: 'p2' }, b: { deviceId: 'r-1', portId: 'g0' } },
      { id: 'l3', a: { deviceId: 'r-1', portId: 'g1' }, b: { deviceId: 'sw-2', portId: 'p1' } },
      { id: 'l4', a: { deviceId: 'sw-2', portId: 'p2' }, b: { deviceId: 'pc-b', portId: 'eth0' } },
    ],
  }
}

/** ĐỀ 2 — đặt địa chỉ cho cổng còn lại rồi BẬT nó lên. */
export function routerPortByCli(): CliSpec {
  return {
    initial: routerWithDownPort(),
    deviceId: 'r-1',
    goals: [
      { kind: 'port-ip', deviceId: 'r-1', portId: 'g1', ip: '10.0.0.1', prefix: 24 },
      { kind: 'port-up', deviceId: 'r-1', portId: 'g1' },
      { kind: 'behavior', goal: { kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' } },
    ],
    solution: [
      {
        deviceId: 'r-1',
        lines: ['enable', 'configure terminal', 'interface g1', 'ip address 10.0.0.1 255.255.255.0', 'no shutdown', 'end'],
      },
    ],
  }
}

/**
 * ĐỀ 3 — khai VLAN mới rồi TRA BẢNG để tự kiểm chứng.
 *
 * Mục tiêu `viewed` là thứ duy nhất đo được thói quen "gõ xong thì soi
 * lại": lệnh khai VLAN chạy im lặng, không tra bảng thì người học không
 * có cách nào biết mình vừa làm gì.
 */
export function vlanDatabaseByCli(): CliSpec {
  return {
    initial: trunkMissing(),
    deviceId: 'sw-1',
    goals: [
      { kind: 'vlan-exists', deviceId: 'sw-1', vlan: 30 },
      { kind: 'access-vlan', deviceId: 'sw-1', portId: 'p3', vlan: 30 },
      { kind: 'viewed', command: 'show vlan brief', deviceId: 'sw-1' },
    ],
    solution: [
      {
        deviceId: 'sw-1',
        lines: [
          'enable',
          'configure terminal',
          'vlan 30',
          'interface p3',
          'switchport access vlan 30',
          'end',
          'show vlan brief',
        ],
      },
    ],
  }
}
