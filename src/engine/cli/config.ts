// Hai phép biến đổi sơ đồ mà CHỈ CLI làm được (spec v2 mục 5.1: `vlan
// <n>`, `shutdown` / `no shutdown`).
//
// Vì sao chúng nằm ở đây chứ không thành `LabAction` như mọi thao tác
// khác: phòng lab không có đường bấm chọn cho hai việc này, mà luật của
// phòng lab là MỌI thao tác phải bấm chọn được. Thêm hai nút không ai
// dùng vào mặt bàn chỉ để "cho đủ bộ" là làm rối một màn hình đang gọn.
// Đổi lại, `classifyDiff` vẫn nhận ra chúng dưới tên `port-state` nên đề
// lab nào lỡ cần tới chúng sẽ bị chốt chặn của schema chặn ngay.
//
// Mọi thao tác CÒN LẠI của CLI (VLAN cổng, vai trunk, allowed list,
// native, IP cổng router, tuyến tĩnh) đi qua `applyTopologyChange` của
// `session.ts` — dùng chung đúng một phép biến đổi với phòng lab.
//
// Technical contract: thuần, không mutate đầu vào.

import type { DeviceId, PortId, Topology, VlanId } from '../lab/topology'
import type { AclDirection, AclRule } from '../lab/acl'

function mapDevice(topo: Topology, deviceId: DeviceId, fn: (device: Topology['devices'][number]) => Topology['devices'][number]): Topology {
  return { ...topo, devices: topo.devices.map((d) => (d.id === deviceId ? fn(d) : d)) }
}

/** Bật/tắt một cổng bằng lệnh. Bật lại thì XÓA hẳn trường, không để `false` lởm chởm. */
export function setPortShutdown(
  topo: Topology,
  deviceId: DeviceId,
  portId: PortId,
  shutdown: boolean,
): Topology {
  return mapDevice(topo, deviceId, (device) => {
    if (device.kind === 'pc') return device
    return {
      ...device,
      ports: device.ports.map((port) => {
        if (port.id !== portId) return port
        if (shutdown) return { ...port, shutdown: true }
        const { shutdown: _up, ...rest } = port
        return rest
      }),
    } as typeof device
  })
}

/**
 * Khai một VLAN vào VLAN database của switch.
 *
 * VLAN nào đã có cổng đứng tên thì vốn đã có mặt trong `show vlan brief`;
 * khai lại không sinh thêm dòng nào — giống hệt thiết bị thật, gõ `vlan
 * 10` lần thứ hai không tạo ra VLAN 10 thứ hai.
 */
export function declareVlan(topo: Topology, deviceId: DeviceId, vlan: VlanId): Topology {
  return mapDevice(topo, deviceId, (device) => {
    if (device.kind !== 'switch') return device
    const current = device.declaredVlans ?? []
    if (current.includes(vlan)) return device
    return { ...device, declaredVlans: [...current, vlan].sort((a, b) => a - b) }
  })
}

/**
 * Thêm một dòng vào cuối một danh sách lọc, tạo danh sách nếu chưa có.
 *
 * Số thứ tự dòng tự sinh theo bước 10 như thiết bị thật (10, 20, 30…) —
 * người học không phải tự đánh số, mà vẫn thấy được thứ tự là thứ quyết
 * định. Thêm vào CUỐI, vì đó đúng là hành vi của `access-list` đánh số:
 * không chèn giữa được, và chính điều đó dạy vì sao phải viết luật hẹp
 * trước luật rộng.
 */
export function addAclRule(
  topo: Topology,
  deviceId: DeviceId,
  listNumber: number,
  rule: Omit<AclRule, 'seq'>,
): Topology {
  return mapDevice(topo, deviceId, (device) => {
    if (device.kind !== 'router') return device
    const lists = device.accessLists ?? []
    const existing = lists.find((l) => l.number === listNumber)
    const seq = ((existing?.rules.at(-1)?.seq ?? 0) + 10)
    const nextRule = { seq, ...rule }
    const nextLists =
      existing === undefined
        ? [...lists, { number: listNumber, rules: [nextRule] }]
        : lists.map((l) => (l.number === listNumber ? { ...l, rules: [...l.rules, nextRule] } : l))
    return { ...device, accessLists: nextLists }
  })
}

/** Áp một danh sách lên cổng router theo chiều đã cho. */
export function applyAclToPort(
  topo: Topology,
  deviceId: DeviceId,
  portId: PortId,
  direction: AclDirection,
  listNumber: number,
): Topology {
  return mapDevice(topo, deviceId, (device) => {
    if (device.kind !== 'router') return device
    return {
      ...device,
      ports: device.ports.map((port) =>
        port.id === portId ? { ...port, [direction === 'in' ? 'aclIn' : 'aclOut']: listNumber } : port,
      ),
    }
  })
}

/** Bật tiến trình OSPF trên router (khai lại cùng số thì không đổi gì). */
export function startOspf(topo: Topology, deviceId: DeviceId, processId: number): Topology {
  return mapDevice(topo, deviceId, (device) => {
    if (device.kind !== 'router') return device
    if (device.ospf?.processId === processId) return device
    return { ...device, ospf: { processId, networks: device.ospf?.networks ?? [] } }
  })
}

/**
 * Thêm một câu `network … area 0`. Khai trùng thì bỏ qua — thiết bị thật
 * cũng không đẻ ra hai dòng giống hệt nhau.
 */
export function addOspfNetwork(
  topo: Topology,
  deviceId: DeviceId,
  network: { ip: string; wildcard: string; area: number },
): Topology {
  return mapDevice(topo, deviceId, (device) => {
    if (device.kind !== 'router' || device.ospf === undefined) return device
    const exists = device.ospf.networks.some(
      (n) => n.ip === network.ip && n.wildcard === network.wildcard && n.area === network.area,
    )
    if (exists) return device
    return { ...device, ospf: { ...device.ospf, networks: [...device.ospf.networks, network] } }
  })
}
