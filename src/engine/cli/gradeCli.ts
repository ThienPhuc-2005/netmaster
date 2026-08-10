// Chấm một bài CLI thiết bị (spec v2 mục 4.2).
//
// CHẤM THEO HIỆU ỨNG + DẤU VẾT, không so chuỗi lệnh — cùng triết lý với
// gradeLab / gradeClinic / gradePs:
//   - Mục tiêu HÀNH VI (`behavior`) hỏi thẳng bộ mô phỏng: cấu hình xong
//     thì mạng có làm được việc đề bài đòi không. Dùng chung `runLabGoals`
//     với phòng lab, không phải bản sao.
//   - Mục tiêu HÌNH DẠNG (vai cổng, allowed list, native, IP, tuyến) nhìn
//     sơ đồ sau cùng. Cần chúng vì có thứ ping không đo được: một trunk
//     `allowed 1-4094` cho mọi VLAN qua vẫn ping thông, nhưng bài "chỉ cho
//     VLAN 10 và 20 đi qua" thì chưa xong.
//   - Mục tiêu DẤU VẾT (`viewed`) là cách duy nhất đo được việc KHÔNG đổi
//     thế giới: đề "tìm ra bệnh bằng lệnh nào" chỉ chứng minh được bằng
//     chính hành động đã làm trong phiên (nếp `PsFlags` của Module 12).
//
// Vì chấm hiệu ứng nên MỌI đường đi tới đích đều được công nhận: gõ lệnh
// trên console hay bấm chọn trên mặt bàn phòng lab đều ra một sơ đồ, và
// bộ chấm chỉ nhìn sơ đồ đó.
//
// Technical contract: thuần, tất định, không mutate.

import {
  findDevice,
  isPortShutdown,
  portModeOf,
  trunkAllows,
  type DeviceId,
  type Ipv4,
  type PortId,
  type SwitchPortMode,
  type Topology,
  type VlanId,
} from '../lab/topology'
import { runLabGoals, type LabGoal } from '../lab/gradeLab'
import type { NetState } from '../lab/simulate'
import { runCliScript } from './interpret'
import { initialCliState, moveCliConsole, type CliState } from './state'

export type CliGoal =
  /** Mạng phải làm được việc này (ping thông / bị chặn / đi đúng đường…). */
  | { kind: 'behavior'; goal: LabGoal }
  /** Cổng switch phải mang đúng vai access hoặc trunk. */
  | { kind: 'port-mode'; deviceId: DeviceId; portId: PortId; mode: SwitchPortMode }
  /** Cổng access phải thuộc đúng VLAN này. */
  | { kind: 'access-vlan'; deviceId: DeviceId; portId: PortId; vlan: VlanId }
  /** Trunk phải CHO những VLAN này đi qua. */
  | { kind: 'trunk-carries'; deviceId: DeviceId; portId: PortId; vlans: VlanId[] }
  /**
   * Trunk phải CHẶN những VLAN này. Cặp carries/blocks giữ đúng vai trò
   * của cặp reach/blocked bên gradeLab: thiếu vế chặn thì người học "giải"
   * xong bài lọc VLAN bằng cách cho tất cả đi qua.
   */
  | { kind: 'trunk-blocks'; deviceId: DeviceId; portId: PortId; vlans: VlanId[] }
  /** Hai đầu trunk phải khai đúng native VLAN này. */
  | { kind: 'native-vlan'; deviceId: DeviceId; portId: PortId; vlan: VlanId }
  /**
   * Hai đầu MỘT sợi trunk phải khai CÙNG native VLAN — không đóng đinh
   * con số. Đề "chữa native lệch" mà dùng goal một-phía là chấm rớt cách
   * sửa hợp lệ ở đầu bên kia, trái triết lý chấm-theo-hiệu-ứng (biên bản
   * hội đồng trung cấp, ghế Đo lường).
   */
  | {
      kind: 'native-match'
      a: { deviceId: DeviceId; portId: PortId }
      b: { deviceId: DeviceId; portId: PortId }
    }
  /** Cổng phải đang BẬT (đã `no shutdown`). */
  | { kind: 'port-up'; deviceId: DeviceId; portId: PortId }
  /** Cổng router phải mang đúng địa chỉ này. */
  | { kind: 'port-ip'; deviceId: DeviceId; portId: PortId; ip: Ipv4; prefix: number }
  /** Router phải có đúng tuyến tĩnh này. */
  | { kind: 'static-route'; deviceId: DeviceId; destination: Ipv4; prefix: number; nextHop: Ipv4 }
  /** VLAN phải có mặt trong VLAN database của switch (`show vlan brief` thấy). */
  | { kind: 'vlan-exists'; deviceId: DeviceId; vlan: VlanId }
  /**
   * Đã tra bảng này trên đúng thiết bị này. `requireOspfFull` (chỉ có
   * nghĩa với `show ip ospf neighbor`): lệnh phải được chạy TẠI thời điểm
   * bảng có láng giềng Full — "kiểm chứng ra Full" mà tick xong từ lúc
   * bảng còn rỗng là bằng chứng rỗng (biên bản trung cấp, ghế Capstone).
   */
  | { kind: 'viewed'; command: string; deviceId: DeviceId; requireOspfFull?: boolean }

/**
 * Đề một bài CLI — phần kỹ thuật thuần; lời đề, gợi ý và lời giải bằng
 * chữ nằm ở tầng câu hỏi như mọi dạng bài khác.
 */
export interface CliSpec {
  initial: Topology
  /** Thiết bị mà console cắm vào lúc mở bài. */
  deviceId: DeviceId
  goals: CliGoal[]
  /**
   * Lời giải tham chiếu: từng CHẶNG là một thiết bị và những dòng gõ trên
   * nó. Chia theo thiết bị vì bài "dựng trunk hai switch" phải rút dây
   * console sang máy thứ hai — một mảng chuỗi phẳng không nói được điều
   * đó. Chạy tuần tự từ trạng thái đầu phải đạt trọn goals (chốt chặn của
   * khối sau ép). Cũng là tầng cuối của thang gợi ý mờ dần.
   */
  solution: CliSolutionStep[]
}

export interface CliSolutionStep {
  deviceId: DeviceId
  lines: string[]
}

export interface CliGoalOutcome {
  goal: CliGoal
  met: boolean
}

export interface CliEvaluation {
  goals: CliGoalOutcome[]
  passed: boolean
  /**
   * NetState sau khi bộ chấm hành vi gửi các gói thăm dò — console nối nó
   * vào phiên để `show mac address-table` và cột đếm `show access-lists`
   * kể được chuyện các gói vừa đi. `null` khi đề không có goal hành vi
   * (không có gói nào được gửi thì bảng trống là sự thật).
   */
  net: NetState | null
}

function switchPort(topo: Topology, deviceId: DeviceId, portId: PortId) {
  const device = findDevice(topo, deviceId)
  if (device === null || device.kind !== 'switch') return null
  return device.ports.find((p) => p.id === portId) ?? null
}

/** Những mục tiêu đọc thẳng từ sơ đồ (không cần chạy mô phỏng). */
function staticGoalMet(goal: Exclude<CliGoal, { kind: 'behavior' }>, state: CliState): boolean {
  const topo = state.topology
  switch (goal.kind) {
    case 'port-mode': {
      const port = switchPort(topo, goal.deviceId, goal.portId)
      return port !== null && portModeOf(port) === goal.mode
    }
    case 'access-vlan': {
      const port = switchPort(topo, goal.deviceId, goal.portId)
      return port !== null && portModeOf(port) === 'access' && port.vlan === goal.vlan
    }
    case 'trunk-carries': {
      const port = switchPort(topo, goal.deviceId, goal.portId)
      if (port === null || portModeOf(port) !== 'trunk') return false
      return goal.vlans.every((vlan) => trunkAllows(port, vlan))
    }
    case 'trunk-blocks': {
      const port = switchPort(topo, goal.deviceId, goal.portId)
      if (port === null || portModeOf(port) !== 'trunk') return false
      return goal.vlans.every((vlan) => !trunkAllows(port, vlan))
    }
    case 'native-vlan': {
      const port = switchPort(topo, goal.deviceId, goal.portId)
      if (port === null || portModeOf(port) !== 'trunk') return false
      return (port.nativeVlan ?? 1) === goal.vlan
    }
    case 'native-match': {
      const a = switchPort(topo, goal.a.deviceId, goal.a.portId)
      const b = switchPort(topo, goal.b.deviceId, goal.b.portId)
      if (a === null || b === null) return false
      if (portModeOf(a) !== 'trunk' || portModeOf(b) !== 'trunk') return false
      return (a.nativeVlan ?? 1) === (b.nativeVlan ?? 1)
    }
    case 'port-up':
      return (
        findDevice(topo, goal.deviceId) !== null && !isPortShutdown(topo, { deviceId: goal.deviceId, portId: goal.portId })
      )
    case 'port-ip': {
      const device = findDevice(topo, goal.deviceId)
      if (device === null || device.kind !== 'router') return false
      const port = device.ports.find((p) => p.id === goal.portId)
      return port?.ipConfig?.ip === goal.ip && port?.ipConfig?.prefix === goal.prefix
    }
    case 'static-route': {
      const device = findDevice(topo, goal.deviceId)
      if (device === null || device.kind !== 'router') return false
      return device.staticRoutes.some(
        (r) => r.destination === goal.destination && r.prefix === goal.prefix && r.nextHop === goal.nextHop,
      )
    }
    case 'vlan-exists': {
      const device = findDevice(topo, goal.deviceId)
      if (device === null || device.kind !== 'switch') return false
      // Có cổng đứng tên VLAN đó cũng tính: `show vlan brief` in ra là có,
      // và người học đâu cần khai lại thứ đã tồn tại.
      return (device.declaredVlans ?? []).includes(goal.vlan) || device.ports.some((p) => p.vlan === goal.vlan)
    }
    case 'viewed':
      return state.flags.viewed.some(
        (v) =>
          v.command === goal.command &&
          v.deviceId === goal.deviceId &&
          (goal.requireOspfFull !== true || v.ospfFull === true),
      )
  }
}

export function gradeCli(spec: CliSpec, state: CliState): CliEvaluation {
  // Các mục tiêu hành vi chạy CHUNG một lượt, theo đúng thứ tự khai báo:
  // mạng tích lũy bảng MAC và ARP giữa các lượt ping, y như phòng lab.
  const behaviorGoals = spec.goals.flatMap((g) => (g.kind === 'behavior' ? [g.goal] : []))
  const behaviorRun = behaviorGoals.length === 0 ? null : runLabGoals(state.topology, behaviorGoals)
  const behaviorOutcomes = behaviorRun?.outcomes ?? []
  let behaviorIndex = 0

  const goals = spec.goals.map((goal) => {
    if (goal.kind === 'behavior') {
      const outcome = behaviorOutcomes[behaviorIndex]
      behaviorIndex += 1
      return { goal, met: outcome?.met === true }
    }
    return { goal, met: staticGoalMet(goal, state) }
  })

  return { goals, passed: goals.every((g) => g.met), net: behaviorRun?.net ?? null }
}

/**
 * Chạy trọn lời giải mẫu từ trạng thái đề bài.
 *
 * `rejected` gom những dòng máy đã từ chối (sai chế độ, sai cú pháp, lệnh
 * lạ). Lời giải mẫu để lọt một dòng như thế là đề bài hỏng — nó dạy
 * người học một câu lệnh không chạy.
 */
export function runCliSolution(spec: CliSpec): { state: CliState; rejected: string[] } {
  let state = initialCliState(spec.initial, spec.deviceId)
  const rejected: string[] = []
  for (const step of spec.solution) {
    state = moveCliConsole(state, step.deviceId)
    const run = runCliScript(state, step.lines)
    state = run.state
    run.results.forEach((result, index) => {
      if (result.outcome.kind !== 'ok') rejected.push(step.lines[index] ?? '')
    })
  }
  return { state, rejected }
}

/** Chữ ký boolean mà tầng chấm câu hỏi cần (máy trạng thái chỉ nhận đúng/sai). */
export function isCliSolved(spec: CliSpec, state: CliState): boolean {
  return gradeCli(spec, state).passed
}

/** Thiết bị mà một bộ mục tiêu có nhắc tới — nguyên liệu cross-check nội dung. */
export function devicesReferencedByCli(goals: readonly CliGoal[]): DeviceId[] {
  const ids = new Set<DeviceId>()
  for (const goal of goals) {
    if (goal.kind === 'behavior') {
      ids.add(goal.goal.kind === 'macLearned' ? goal.goal.switchId : goal.goal.kind === 'arpResolved' ? goal.goal.deviceId : goal.goal.from)
      if (goal.goal.kind === 'ping' || goal.goal.kind === 'pathThrough') ids.add(goal.goal.to)
      continue
    }
    if (goal.kind === 'native-match') {
      ids.add(goal.a.deviceId)
      ids.add(goal.b.deviceId)
      continue
    }
    ids.add(goal.deviceId)
  }
  return [...ids]
}
