// Output của các lệnh `show` — dựng TỪ SƠ ĐỒ, không lưu sẵn ở đâu cả.
//
// Đây là chỗ fidelity phải giữ: bảng đúng cột, đúng tiêu đề, đúng giọng
// máy tiếng Anh. Người học nhìn quen bảng ở đây thì mở thiết bị thật ra
// đọc được ngay — đó là toàn bộ lý do dạy CLI thay vì bấm nút.
//
// MỘT ĐƠN GIẢN HÓA VỀ CÁCH GHI, khai rõ để không ai "sửa" tới lui:
// địa chỉ MAC in theo dạng CHUẨN CỦA APP (AA:BB:CC:00:00:01), không phải
// dạng chấm-ba-cụm của IOS (aabb.cc00.0001). Thiết bị thật mỗi họ ghi
// một kiểu (IOS chấm, Windows gạch, Linux hai chấm) — app đã chọn một
// dạng duy nhất từ Module 4 và terminal Phòng khám cũng theo dạng đó.
// Bắt người học đối chiếu ba cách ghi giữa hai màn hình là thêm ma sát
// không dạy được gì. HÀNH VI thì không đơn giản hóa dòng nào.

import {
  isPortShutdown,
  livePeerOfPort,
  nativeVlanOf,
  portModeOf,
  trunkAllows,
  type Device,
  type SwitchDevice,
  type RouterDevice,
  type Topology,
  type VlanId,
} from '../lab/topology'
import { computeStp, isPortBlocked, isRootPort, stpEnabled, bridgePriorityOf } from '../lab/stp'
import { aclRuleText } from '../lab/acl'
import { ospfNeighborsOf, ospfRouterId, ospfRoutesOf } from '../lab/ospf'
import type { NetState } from '../lab/simulate'

/** Đệm phải cho thẳng cột — bảng IOS đều là cột cố định. */
function pad(text: string, width: number): string {
  return text.length >= width ? text : text + ' '.repeat(width - text.length)
}

/** Tên VLAN theo nếp IOS: VLAN 1 là "default", còn lại là VLAN00xx. */
function vlanName(vlan: VlanId): string {
  return vlan === 1 ? 'default' : `VLAN${String(vlan).padStart(4, '0')}`
}

/**
 * Cổng nào đang THẬT SỰ sống — cột Status của mọi bảng đều suy từ đây.
 * Có dây mà một đầu `shutdown` thì vẫn là chết.
 */
function linkUp(topo: Topology, deviceId: string, portId: string): boolean {
  return livePeerOfPort(topo, { deviceId, portId }) !== null
}

/** Cổng này có đang bị tắt bằng lệnh không (để in "administratively down"). */
function shutdownHere(topo: Topology, deviceId: string, portId: string): boolean {
  return isPortShutdown(topo, { deviceId, portId })
}

// ---------------------------------------------------------------
// show vlan brief
// ---------------------------------------------------------------

export function showVlanBrief(topo: Topology, device: Device): string[] {
  if (device.kind !== 'switch') return ['% Invalid input detected at \'^\' marker.']
  const byVlan = new Map<VlanId, string[]>()
  for (const port of device.ports) {
    // Cổng trunk KHÔNG thuộc VLAN nào trong bảng này — đúng như thiết bị
    // thật: nó chở nhiều VLAN nên không đứng tên xóm nào cả.
    if (portModeOf(port) === 'trunk') continue
    byVlan.set(port.vlan, [...(byVlan.get(port.vlan) ?? []), port.id])
  }
  // VLAN vừa khai bằng `vlan <n>` mà chưa cổng nào đứng tên: vẫn phải có
  // mặt, nếu không thì gõ xong lệnh nhìn bảng chẳng thấy gì và tưởng lệnh
  // trượt. Bảng này CHÍNH là cách kiểm chứng lệnh vừa gõ có ăn không.
  for (const vlan of device.declaredVlans ?? []) if (!byVlan.has(vlan)) byVlan.set(vlan, [])
  if (!byVlan.has(1)) byVlan.set(1, [])

  const lines = [
    '',
    `${pad('VLAN', 5)}${pad('Name', 33)}${pad('Status', 10)}Ports`,
    `${'-'.repeat(4)} ${'-'.repeat(32)} ${'-'.repeat(9)} ${'-'.repeat(31)}`,
  ]
  for (const vlan of [...byVlan.keys()].sort((a, b) => a - b)) {
    const ports = byVlan.get(vlan) ?? []
    lines.push(`${pad(String(vlan), 5)}${pad(vlanName(vlan), 33)}${pad('active', 10)}${ports.join(', ')}`)
  }
  return lines
}

// ---------------------------------------------------------------
// show interfaces trunk
// ---------------------------------------------------------------

export function showInterfacesTrunk(topo: Topology, device: Device): string[] {
  if (device.kind !== 'switch') return ['% Invalid input detected at \'^\' marker.']
  const trunks = device.ports.filter((p) => portModeOf(p) === 'trunk')
  // Không có trunk nào thì IOS in bảng RỖNG chứ không báo lỗi — và chính
  // cái bảng rỗng đó là câu trả lời cho "sao VLAN không qua được?".
  const vlansOnSwitch = [...new Set(device.ports.map((p) => p.vlan))].sort((a, b) => a - b)
  const lines: string[] = ['', `${pad('Port', 12)}${pad('Mode', 13)}${pad('Encapsulation', 15)}${pad('Status', 12)}Native vlan`]
  for (const port of trunks) {
    lines.push(
      `${pad(port.id, 12)}${pad('on', 13)}${pad('802.1q', 15)}${pad(linkUp(topo, device.id, port.id) ? 'trunking' : 'not-trunking', 12)}${nativeVlanOf(port)}`,
    )
  }
  lines.push('', `${pad('Port', 12)}Vlans allowed on trunk`)
  for (const port of trunks) {
    const allowed = port.allowedVlans
    lines.push(`${pad(port.id, 12)}${allowed === undefined ? '1-4094' : allowed.join(',')}`)
  }
  lines.push('', `${pad('Port', 12)}Vlans in spanning tree forwarding state and not pruned`)
  const stp = computeStp(topo)
  for (const port of trunks) {
    const blocked = isPortBlocked(stp, { deviceId: device.id, portId: port.id })
    const carried = vlansOnSwitch.filter((v) => trunkAllows(port, v))
    lines.push(`${pad(port.id, 12)}${blocked ? 'none' : carried.join(',')}`)
  }
  return lines
}

// ---------------------------------------------------------------
// show mac address-table
// ---------------------------------------------------------------

export function showMacTable(net: NetState, device: Device): string[] {
  if (device.kind !== 'switch') return ['% Invalid input detected at \'^\' marker.']
  const entries = net.macTables[device.id] ?? []
  const lines = [
    '          Mac Address Table',
    '-------------------------------------------',
    '',
    `${pad('Vlan', 8)}${pad('Mac Address', 18)}${pad('Type', 12)}Ports`,
    `${pad('----', 8)}${pad('-----------', 18)}${pad('--------', 12)}-----`,
  ]
  for (const entry of [...entries].sort((a, b) => a.vlan - b.vlan || a.mac.localeCompare(b.mac))) {
    lines.push(`${pad(String(entry.vlan), 8)}${pad(entry.mac, 18)}${pad('DYNAMIC', 12)}${entry.portId}`)
  }
  lines.push(`Total Mac Addresses for this criterion: ${entries.length}`)
  return lines
}

// ---------------------------------------------------------------
// show ip interface brief
// ---------------------------------------------------------------

export function showIpInterfaceBrief(topo: Topology, device: Device): string[] {
  const header = `${pad('Interface', 23)}${pad('IP-Address', 16)}${pad('OK?', 4)}${pad('Method', 7)}${pad('Status', 22)}Protocol`
  const lines = [header]
  /**
   * Cột Status của IOS phân biệt BA trạng thái, và người học phải đọc ra
   * được sự khác nhau: `administratively down` là mình tự tắt (gõ
   * `no shutdown` là xong), còn `down` là không có tín hiệu ở đầu kia
   * (đi tìm sợi dây). Gộp hai thứ thành một là xóa mất đúng cái manh mối
   * đắt giá nhất của bảng này.
   */
  const row = (name: string, ip: string | null, up: boolean, shut: boolean) =>
    `${pad(name, 23)}${pad(ip ?? 'unassigned', 16)}${pad('YES', 4)}${pad(ip === null ? 'unset' : 'manual', 7)}${pad(shut ? 'administratively down' : up ? 'up' : 'down', 22)}${up ? 'up' : 'down'}`

  if (device.kind === 'router') {
    for (const port of device.ports) {
      lines.push(
        row(port.id, port.ipConfig?.ip ?? null, linkUp(topo, device.id, port.id), shutdownHere(topo, device.id, port.id)),
      )
    }
    return lines
  }
  if (device.kind === 'switch') {
    // Switch trong mô hình này không có IP quản trị (đơn giản hóa số 2
    // của topology.ts) — bảng vẫn in ra để người học thấy trạng thái dây.
    for (const port of device.ports) {
      lines.push(row(port.id, null, linkUp(topo, device.id, port.id), shutdownHere(topo, device.id, port.id)))
    }
    return lines
  }
  return ['% Invalid input detected at \'^\' marker.']
}

// ---------------------------------------------------------------
// show ip route
// ---------------------------------------------------------------

export function showIpRoute(topo: Topology, device: Device): string[] {
  if (device.kind !== 'router') return ['% Invalid input detected at \'^\' marker.']
  const lines = [
    'Codes: C - connected, S - static, O - OSPF',
    '',
  ]
  for (const port of device.ports) {
    if (port.ipConfig === null) continue
    const { ip, prefix } = port.ipConfig
    lines.push(`C    ${networkOf(ip, prefix)}/${prefix} is directly connected, ${port.id}`)
  }
  for (const route of device.staticRoutes) {
    lines.push(`S    ${route.destination}/${route.prefix} [1/0] via ${route.nextHop}`)
  }
  // Cặp số trong ngoặc là [khoảng cách quản trị / cost] — đúng cách IOS
  // ghi, và chính nó cho người học thấy vì sao tuyến tĩnh thắng OSPF.
  for (const route of ospfRoutesOf(topo, device.id)) {
    lines.push(`O    ${route.destination}/${route.prefix} [110/${route.cost}] via ${route.nextHopIp}, ${route.egressPortId}`)
  }
  if (lines.length === 2) lines.push('% Network not in table')
  return lines
}

// ---------------------------------------------------------------
// show ip ospf neighbor
// ---------------------------------------------------------------

/**
 * Bảng láng giềng OSPF.
 *
 * Bảng RỖNG là câu trả lời quan trọng nhất của lệnh này: chưa ai lên
 * láng giềng thì chẳng có tuyến nào được học. Dòng chưa lên vẫn được in
 * kèm LÝ DO ở cột cuối — thiết bị thật không in dòng đó, nhưng ở đây nó
 * là toàn bộ giá trị chẩn đoán, và app khai rõ chỗ mình nói nhiều hơn
 * thiết bị thay vì để người học mò trong bảng trống.
 */
export function showIpOspfNeighbor(topo: Topology, device: Device): string[] {
  if (device.kind !== 'router') return ['% Invalid input detected at \'^\' marker.']
  const neighbors = ospfNeighborsOf(topo, device.id)
  const lines = [
    `Router ID ${ospfRouterId(device)}`,
    '',
    `${pad('Neighbor ID', 17)}${pad('State', 12)}${pad('Address', 17)}Interface`,
  ]
  for (const neighbor of neighbors) {
    const state = neighbor.state === 'full' ? 'FULL' : `DOWN (${neighbor.reason})`
    lines.push(
      `${pad(neighbor.remoteRouterId, 17)}${pad(state, 12)}${pad(neighbor.remoteIp ?? '-', 17)}${neighbor.localPortId}`,
    )
  }
  return lines
}

/** Địa chỉ mạng của một IP theo prefix — chỉ để in bảng tuyến. */
function networkOf(ip: string, prefix: number): string {
  const octets = ip.split('.').map(Number)
  const value = ((octets[0]! << 24) | (octets[1]! << 16) | (octets[2]! << 8) | octets[3]!) >>> 0
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  const net = (value & mask) >>> 0
  return [net >>> 24, (net >>> 16) & 255, (net >>> 8) & 255, net & 255].join('.')
}

// ---------------------------------------------------------------
// show spanning-tree
// ---------------------------------------------------------------

export function showSpanningTree(topo: Topology, device: Device): string[] {
  if (device.kind !== 'switch') return ['% Invalid input detected at \'^\' marker.']
  if (!stpEnabled(topo)) {
    // Thiết bị thật luôn bật STP sẵn; ở đây tắt được vì TẮT chính là đề
    // bài của Module 15. Nói thẳng ra thay vì in bảng rỗng khó hiểu.
    return ['Spanning tree instance(s) not running.']
  }
  const stp = computeStp(topo)
  const isRoot = stp.rootId === device.id
  const rootName = topo.devices.find((d) => d.id === stp.rootId)?.hostname ?? stp.rootId ?? '?'
  const lines = [
    'VLAN0001',
    '  Spanning tree enabled protocol ieee',
    `  Root ID    Priority    ${bridgePriorityOf(rootAsSwitch(topo, stp.rootId) ?? (device as SwitchDevice))}`,
    isRoot ? '             This bridge is the root' : `             Root bridge: ${rootName}`,
    '',
    `  Bridge ID  Priority    ${bridgePriorityOf(device)}`,
    '',
    `${pad('Interface', 19)}${pad('Role', 11)}${pad('Sts', 5)}${pad('Cost', 7)}Type`,
    `${'-'.repeat(17)} ${'-'.repeat(10)} ${'-'.repeat(4)} ${'-'.repeat(6)} ${'-'.repeat(9)}`,
  ]
  for (const port of device.ports) {
    if (!linkUp(topo, device.id, port.id)) continue
    const ref = { deviceId: device.id, portId: port.id }
    const blocked = isPortBlocked(stp, ref)
    // Vai đúng như IOS thật: cổng hướng về gốc là Root (switch không phải
    // root có đúng một cổng như thế — bài 3 Module 15 dạy vậy, bảng phải
    // nói cùng một chuyện), cổng bị chặn là Altn, còn lại Desg.
    const role = blocked ? 'Altn' : isRootPort(stp, ref) ? 'Root' : 'Desg'
    lines.push(`${pad(port.id, 19)}${pad(role, 11)}${pad(blocked ? 'BLK' : 'FWD', 5)}${pad('19', 7)}P2p`)
  }
  return lines
}

function rootAsSwitch(topo: Topology, rootId: string | null): SwitchDevice | null {
  if (rootId === null) return null
  const device = topo.devices.find((d) => d.id === rootId)
  return device !== undefined && device.kind === 'switch' ? device : null
}

// ---------------------------------------------------------------
// show access-lists
// ---------------------------------------------------------------

/**
 * Bảng danh sách lọc, kèm SỐ ĐẾM của từng dòng.
 *
 * Cột đếm là thứ đáng giá nhất khi chẩn đoán: luật có số nghĩa là gói
 * tin CÓ đi tới đó và CÓ khớp dòng ấy. Dòng cấm vô hình cuối danh sách
 * không được in ra — đúng như thiết bị thật, và chính vì nó vô hình mà
 * người học phải nhớ rằng nó vẫn ở đó.
 */
export function showAccessLists(net: NetState, device: Device): string[] {
  if (device.kind !== 'router') return ['% Invalid input detected at \'^\' marker.']
  const lists = device.accessLists ?? []
  const lines: string[] = []
  for (const list of [...lists].sort((a, b) => a.number - b.number)) {
    // Mô hình chỉ có ACL extended (schema + CLI đều siết 100-199) — nhãn
    // Standard cho số nhỏ từng in ra một khuôn không tồn tại trên IOS.
    lines.push(`Extended IP access list ${list.number}`)
    for (const rule of [...list.rules].sort((a, b) => a.seq - b.seq)) {
      const hits = net.aclHits[device.id]?.[list.number]?.[rule.seq] ?? 0
      const matches = hits === 0 ? '' : ` (${hits} match${hits === 1 ? '' : 'es'})`
      lines.push(`    ${rule.seq} ${aclRuleText(rule)}${matches}`)
    }
  }
  return lines
}

// ---------------------------------------------------------------
// show running-config
// ---------------------------------------------------------------

export function showRunningConfig(topo: Topology, device: Device): string[] {
  const lines = ['Building configuration...', '', 'Current configuration:', '!', `hostname ${device.hostname}`, '!']
  if (device.kind === 'switch') {
    for (const vlan of [...(device.declaredVlans ?? [])].sort((a, b) => a - b)) {
      lines.push(`vlan ${vlan}`, '!')
    }
    for (const port of device.ports) {
      lines.push(`interface ${port.id}`)
      if (portModeOf(port) === 'trunk') {
        lines.push(' switchport mode trunk')
        if (port.allowedVlans !== undefined) {
          lines.push(` switchport trunk allowed vlan ${port.allowedVlans.join(',')}`)
        }
        if (port.nativeVlan !== undefined) lines.push(` switchport trunk native vlan ${port.nativeVlan}`)
      } else {
        lines.push(' switchport mode access')
        lines.push(` switchport access vlan ${port.vlan}`)
      }
      if (port.shutdown === true) lines.push(' shutdown')
      lines.push('!')
    }
    if (device.bridgePriority !== undefined) {
      lines.push(`spanning-tree vlan 1 priority ${device.bridgePriority}`, '!')
    }
  }
  if (device.kind === 'router') {
    for (const port of device.ports) {
      lines.push(`interface ${port.id}`)
      lines.push(
        port.ipConfig === null
          ? ' no ip address'
          : ` ip address ${port.ipConfig.ip} ${maskOf(port.ipConfig.prefix)}`,
      )
      if (port.aclIn !== undefined) lines.push(` ip access-group ${port.aclIn} in`)
      if (port.aclOut !== undefined) lines.push(` ip access-group ${port.aclOut} out`)
      if (port.shutdown === true) lines.push(' shutdown')
      lines.push('!')
    }
    if (device.ospf !== undefined) {
      lines.push(`router ospf ${device.ospf.processId}`)
      for (const network of device.ospf.networks) {
        lines.push(` network ${network.ip} ${network.wildcard} area ${network.area}`)
      }
      lines.push('!')
    }
    for (const list of [...(device.accessLists ?? [])].sort((a, b) => a.number - b.number)) {
      for (const rule of [...list.rules].sort((a, b) => a.seq - b.seq)) {
        lines.push(`access-list ${list.number} ${aclRuleText(rule)}`)
      }
      lines.push('!')
    }
    for (const route of (device as RouterDevice).staticRoutes) {
      lines.push(`ip route ${route.destination} ${maskOf(route.prefix)} ${route.nextHop}`)
    }
    if (device.staticRoutes.length > 0) lines.push('!')
  }
  lines.push('end')
  return lines
}

/** Prefix → subnet mask dạng x.x.x.x, vì IOS ghi mask chứ không ghi /n. */
export function maskOf(prefix: number): string {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  return [mask >>> 24, (mask >>> 16) & 255, (mask >>> 8) & 255, mask & 255].join('.')
}
