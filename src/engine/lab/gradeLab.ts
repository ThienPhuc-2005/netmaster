// Chấm một bài lab (spec Module 4).
//
// NGUYÊN TẮC: chấm HÀNH VI, không chấm HÌNH DẠNG. Engine chạy mô phỏng
// rồi hỏi "mạng này có làm được việc đề bài yêu cầu không", chứ không so
// sơ đồ người học với sơ đồ mẫu. Người học lắp theo cách của mình (IKEA
// effect, spec Module 4) và mọi lời giải chạy được đều được công nhận.
//
// Mục tiêu diễn đạt KHAI BÁO. Cặp `reach` + `blocked` là mấu chốt sư
// phạm của bài VLAN: thiếu goal `blocked` thì người học "giải" được bài
// bằng cách gộp tất cả vào một VLAN — đúng kết quả, sai bài học.
//
// Technical contract: thuần, tất định, không mutate đầu vào.

import {
  addressedPorts,
  findDevice,
  isPortUsed,
  linkIsUp,
  nativeVlanOf,
  peerOfPort,
  portModeOf,
  sameSubnet,
  switchPortOf,
  validateTopology,
  vlanOfPort,
  type Device,
  type DeviceId,
  type Ipv4,
  type MacAddress,
  type PortId,
  type Topology,
  type VlanId,
} from './topology'
import {
  arpCacheOf,
  emptyNetState,
  macTableOf,
  pingSucceeded,
  simulatePing,
  type NetState,
  type PingFailure,
  type PingResult,
} from './simulate'
import type { LabAllowance } from './session'
import { stpEnabled } from './stp'

/**
 * Mục tiêu của một bài lab. Cố ý chỉ có 4 loại — đủ diễn đạt mọi ca của
 * Module 4 mà vẫn ngắn để người soạn bài đọc hiểu ngay.
 */
export type LabGoal =
  /** Ping từ máy này tới máy kia PHẢI thông, hoặc PHẢI KHÔNG thông. */
  | { kind: 'ping'; from: DeviceId; to: DeviceId; expect: 'reach' | 'blocked' }
  /** Ping thông VÀ đường đi phải ghé qua các thiết bị này (chặn lời giải nối tắt). */
  | { kind: 'pathThrough'; from: DeviceId; to: DeviceId; via: DeviceId[] }
  /** Sau khi có traffic, switch phải học được địa chỉ này ở đúng cổng này. */
  | { kind: 'macLearned'; switchId: DeviceId; mac: MacAddress; portId: PortId; vlan: VlanId }
  /** Thiết bị phải phân giải được IP → MAC trong bộ nhớ ARP của nó. */
  | { kind: 'arpResolved'; deviceId: DeviceId; ip: Ipv4; mac: MacAddress }

/**
 * Đề bài lab. KHÔNG chứa chuỗi hiển thị nào: lời đề, gợi ý và lời giải
 * bằng chữ nằm ở tầng câu hỏi (prompt/hint/solution) giống hệt mọi dạng
 * câu hỏi khác, nên phần này thuần kỹ thuật.
 */
export interface LabSpec {
  /** Trạng thái ban đầu — ĐƯỢC PHÉP cố tình hỏng (productive failure). */
  initial: Topology
  goals: LabGoal[]
  allow: LabAllowance
  /** Lời giải tham chiếu: vừa là tầng-3 của phản hồi, vừa là chốt kiểm nội dung. */
  solution: Topology
}

/**
 * Chẩn đoán TĨNH — đọc ra từ chính sơ đồ, không cần chạy mô phỏng. Đây
 * là nguyên liệu cho phản hồi tầng 1-2: gợi ý người học nhìn vào đâu mà
 * KHÔNG chỉ thẳng lời giải.
 */
export type LabDiagnosis =
  | 'device-isolated'
  | 'missing-ip'
  | 'missing-gateway'
  | 'gateway-not-in-subnet'
  | 'duplicate-ip'
  | 'vlan-mismatch-on-link'
  | 'same-subnet-different-vlan'
  | 'l2-loop'
  /** Một đầu dây khai trunk, đầu kia còn là access — bệnh của Module 14. */
  | 'trunk-one-side-only'
  /** Hai đầu trunk khai native khác nhau: khung trần lặng lẽ đổi VLAN. */
  | 'native-vlan-mismatch-on-trunk'
  /**
   * Có cổng đã cắm dây nhưng đang bị tắt bằng lệnh (`shutdown`).
   *
   * Nêu bất kể đề bài muốn gì: dây cắm vào một cổng đang tắt là chuyện
   * bất thường ở mọi mạng. Ngày nào có bài dạy "tắt cổng để cách ly" thì
   * mục tiêu của bài đó phải nói ra được điều ấy, và luật này tính lại.
   */
  | 'port-shutdown'

export interface GoalOutcome {
  goal: LabGoal
  met: boolean
  /** Lý do ping hỏng (nếu goal này có chạy ping); null khi không liên quan. */
  failure: PingFailure | null
}

export interface LabEvaluation {
  passed: boolean
  goals: GoalOutcome[]
  diagnosis: LabDiagnosis[]
  /** Kết quả mô phỏng của từng goal có ping — UI phát lại ngay trên sơ đồ người học. */
  runs: PingResult[]
}

// ---------------------------------------------------------------
// Chẩn đoán tĩnh
// ---------------------------------------------------------------

/** VLAN mà một thiết bị đầu-cuối đang thuộc về = VLAN của cổng switch nó cắm vào. */
function vlanOfEndpoint(topo: Topology, deviceId: DeviceId, portId: PortId): VlanId | null {
  const peer = peerOfPort(topo, { deviceId, portId })
  return peer === null ? null : vlanOfPort(topo, peer)
}

/**
 * Có chu trình TẦNG 2 không (union-find trên các sợi dây).
 *
 * Chỉ đếm những sợi dây nằm trọn trong tầng 2: router CHẶN khung quảng
 * bá, nên mỗi cổng router là một miền quảng bá riêng và một vòng đi qua
 * router không bao giờ sinh ra bão. Bỏ luật này thì mạng nhiều router
 * nối vòng của Module 16 — thứ cả module dựng lên để khen là đường dự
 * phòng — lại bị chẩn đoán là bệnh vòng lặp.
 */
function hasCycle(topo: Topology): boolean {
  const parent = new Map<DeviceId, DeviceId>()
  const find = (id: DeviceId): DeviceId => {
    const up = parent.get(id)
    if (up === undefined || up === id) return id
    const root = find(up)
    parent.set(id, root)
    return root
  }
  const isRouter = (id: DeviceId): boolean => findDevice(topo, id)?.kind === 'router'
  for (const device of topo.devices) parent.set(device.id, device.id)
  for (const link of topo.links) {
    if (isRouter(link.a.deviceId) || isRouter(link.b.deviceId)) continue
    const rootA = find(link.a.deviceId)
    const rootB = find(link.b.deviceId)
    if (rootA === rootB) return true
    parent.set(rootA, rootB)
  }
  return false
}

/**
 * Chẩn đoán sơ đồ, ĐỐI CHIẾU VỚI MỤC TIÊU của đề bài.
 *
 * Vì sao phải nhìn cả mục tiêu: một số "triệu chứng" chỉ là bệnh khi
 * chúng cản đường yêu cầu của đề. Bài chia phòng ban CỐ Ý đặt hai VLAN
 * trong cùng một dải địa chỉ — báo "cùng dải khác VLAN" ở đó là chỉ sai
 * hướng, và tệ hơn: nó vẫn kêu cả khi người học đã làm đúng. Nên loại
 * triệu chứng ấy chỉ được nêu cho đúng những cặp máy mà đề bài đòi phải
 * thông nhau.
 */
export function diagnose(topo: Topology, goals: readonly LabGoal[] = []): LabDiagnosis[] {
  const found = new Set<LabDiagnosis>()

  // --- Nhóm 1: bệnh tuyệt đối, đúng bất kể đề bài muốn gì ---

  for (const device of topo.devices) {
    const portIds = device.kind === 'pc' ? [device.port.id] : device.kind === 'router' ? device.ports.map((p) => p.id) : []
    if (portIds.length > 0 && portIds.every((portId) => !isPortUsed(topo, { deviceId: device.id, portId }))) {
      found.add('device-isolated')
    }
  }

  for (const device of topo.devices) {
    if (device.kind !== 'pc') continue
    if (device.ipConfig === null) {
      found.add('missing-ip')
      continue
    }
    if (device.gateway !== null && !sameSubnet(device.ipConfig.ip, device.gateway, device.ipConfig.prefix)) {
      found.add('gateway-not-in-subnet')
    }
  }

  const seenIps = new Set<Ipv4>()
  for (const device of topo.devices) {
    for (const entry of addressedPorts(device)) {
      if (seenIps.has(entry.ipConfig.ip)) found.add('duplicate-ip')
      seenIps.add(entry.ipConfig.ip)
    }
  }

  for (const link of topo.links) {
    if (!linkIsUp(topo, link)) found.add('port-shutdown')
  }

  // Dây nối hai cổng switch: ba bệnh khác nhau, ba lời chẩn đoán khác nhau.
  for (const link of topo.links) {
    const portA = switchPortOf(topo, link.a)
    const portB = switchPortOf(topo, link.b)
    if (portA === null || portB === null) continue
    const modeA = portModeOf(portA)
    const modeB = portModeOf(portB)

    // Hai đầu access khác VLAN — khung chết ở đó (bài học Module 4).
    if (modeA === 'access' && modeB === 'access' && portA.vlan !== portB.vlan) {
      found.add('vlan-mismatch-on-link')
    }
    // Mới khai trunk MỘT đầu: đầu kia vẫn nhét mọi khung vào một VLAN.
    if (modeA !== modeB) found.add('trunk-one-side-only')
    // Hai đầu trunk mà native lệch: bệnh im lặng nhất của trunk.
    if (modeA === 'trunk' && modeB === 'trunk' && nativeVlanOf(portA) !== nativeVlanOf(portB)) {
      found.add('native-vlan-mismatch-on-trunk')
    }
  }

  // Vòng kín chỉ là BỆNH khi chưa có ai canh nó. Bật STP rồi thì vòng
  // là đường DỰ PHÒNG — nêu nó ra lúc đó là dạy ngược bài Module 15.
  if (hasCycle(topo) && !stpEnabled(topo)) found.add('l2-loop')

  // --- Nhóm 2: chỉ là bệnh khi cản đường một mục tiêu "phải thông" ---

  for (const goal of goals) {
    const pair =
      goal.kind === 'pathThrough'
        ? { from: goal.from, to: goal.to }
        : goal.kind === 'ping' && goal.expect === 'reach'
          ? { from: goal.from, to: goal.to }
          : null
    if (pair === null) continue

    const source = findDevice(topo, pair.from)
    const target = findDevice(topo, pair.to)
    if (source === null || target === null || source.kind !== 'pc') continue
    if (source.ipConfig === null) continue
    const targetIp = addressedPorts(target)[0]?.ipConfig.ip
    if (targetIp === undefined) continue

    const local = sameSubnet(source.ipConfig.ip, targetIp, source.ipConfig.prefix)
    if (!local && source.gateway === null) {
      // Muốn ra khỏi dải nhà mình mà chưa chỉ được lối ra.
      found.add('missing-gateway')
      continue
    }
    if (local && target.kind === 'pc') {
      // CA CHÍNH CỦA SPEC: hai máy cùng dải địa chỉ, đề bài đòi phải nói
      // chuyện được, nhưng chúng đang nằm hai VLAN khác nhau.
      const vlanFrom = vlanOfEndpoint(topo, source.id, source.port.id)
      const vlanTo = vlanOfEndpoint(topo, target.id, target.port.id)
      if (vlanFrom !== null && vlanTo !== null && vlanFrom !== vlanTo) {
        found.add('same-subnet-different-vlan')
      }
    }
  }

  return [...found]
}

// ---------------------------------------------------------------
// Chấm
// ---------------------------------------------------------------

function pathVisits(result: PingResult): Set<DeviceId> {
  const visited = new Set<DeviceId>()
  for (const stage of result.stages) {
    for (const hop of stage.hops) {
      visited.add(hop.from.deviceId)
      visited.add(hop.to.deviceId)
    }
  }
  return visited
}

/**
 * Chạy một bộ mục tiêu trên một sơ đồ và trả kết quả từng mục tiêu.
 *
 * Các goal ping chạy TUẦN TỰ trên cùng một trạng thái mạng, theo đúng
 * thứ tự khai báo trong đề: mạng thật cũng tích lũy bảng MAC và ARP như
 * vậy, và thứ tự cố định giữ cho kết quả chấm hoàn toàn tất định.
 *
 * Tách riêng khỏi `gradeLab` vì bộ chấm CLI (Module 14-17) cũng phải hỏi
 * đúng câu hỏi này: cấu hình bằng lệnh xong thì mạng có làm được việc đề
 * bài yêu cầu không. Hai bộ chấm dùng CHUNG một phép đo, không phải hai
 * bản sao dễ trôi khỏi nhau.
 */
export function runLabGoals(
  learner: Topology,
  goals: readonly LabGoal[],
): { outcomes: GoalOutcome[]; runs: PingResult[] } {
  const structural = validateTopology(learner)
  if (structural.length > 0) {
    // Sơ đồ không thể tồn tại trong đời thật → lỗi của trình soạn thảo,
    // không phải lỗi người học. Ném để lộ bug thay vì chấm bừa.
    throw new Error(`runLabGoals: sơ đồ có lỗi cấu trúc (${structural.map((p) => p.code).join(', ')})`)
  }

  const state: NetState = emptyNetState()
  const runs: PingResult[] = []
  const outcomes: GoalOutcome[] = []

  for (const goal of goals) {
    if (goal.kind === 'ping' || goal.kind === 'pathThrough') {
      const result = simulatePing(learner, { from: goal.from, to: goal.to }, state)
      // Tích lũy những gì mạng vừa học được cho các goal sau.
      state.macTables = result.state.macTables
      state.arpCaches = result.state.arpCaches
      runs.push(result)

      if (goal.kind === 'ping') {
        const succeeded = pingSucceeded(result)
        const met = goal.expect === 'reach' ? succeeded : !succeeded
        outcomes.push({ goal, met, failure: result.failure })
      } else {
        const visited = pathVisits(result)
        const met = pingSucceeded(result) && goal.via.every((id) => visited.has(id))
        outcomes.push({ goal, met, failure: result.failure })
      }
      continue
    }

    if (goal.kind === 'macLearned') {
      const met = macTableOf(state, goal.switchId).some(
        (e) => e.mac === goal.mac && e.portId === goal.portId && e.vlan === goal.vlan,
      )
      outcomes.push({ goal, met, failure: null })
      continue
    }

    const met = arpCacheOf(state, goal.deviceId).some((e) => e.ip === goal.ip && e.mac === goal.mac)
    outcomes.push({ goal, met, failure: null })
  }

  return { outcomes, runs }
}

/** Chấm bài lab. Mọi goal phải đạt (AND) thì bài mới xong. */
export function gradeLab(spec: LabSpec, learner: Topology): LabEvaluation {
  const { outcomes, runs } = runLabGoals(learner, spec.goals)
  return {
    passed: outcomes.every((o) => o.met),
    goals: outcomes,
    // Chẩn đoán chạy độc lập với kết quả ping: kể cả khi mọi mục tiêu
    // đều hỏng, người học vẫn nhận được gợi ý tử tế về chỗ đáng nhìn lại.
    diagnosis: diagnose(learner, spec.goals),
    runs,
  }
}

/** Chữ ký boolean mà tầng chấm câu hỏi cần (máy trạng thái chỉ nhận đúng/sai). */
export function isLabSolved(spec: LabSpec, learner: Topology): boolean {
  return gradeLab(spec, learner).passed
}

/** Các thiết bị mà một bộ goal có nhắc tới — dùng để kiểm nội dung lúc parse. */
export function devicesReferencedBy(goals: readonly LabGoal[]): DeviceId[] {
  const ids = new Set<DeviceId>()
  for (const goal of goals) {
    if (goal.kind === 'ping' || goal.kind === 'pathThrough') {
      ids.add(goal.from)
      ids.add(goal.to)
      if (goal.kind === 'pathThrough') for (const id of goal.via) ids.add(id)
    } else if (goal.kind === 'macLearned') {
      ids.add(goal.switchId)
    } else {
      ids.add(goal.deviceId)
    }
  }
  return [...ids]
}

/** Thiết bị này có mặt trong sơ đồ không — dùng chung cho các cross-check. */
export function topologyHasDevice(topo: Topology, deviceId: DeviceId): boolean {
  return findDevice(topo, deviceId) !== null
}
