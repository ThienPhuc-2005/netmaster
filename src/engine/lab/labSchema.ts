// Schema zod cho ĐỀ LAB trong nội dung bài học.
//
// Đây là "hợp đồng" giữa người soạn bài và bộ mô phỏng. Ngoài kiểm cấu
// trúc, file này ép các RÀNG BUỘC SƯ PHẠM ngay lúc parse — thứ mà một
// schema thuần cấu trúc không nói được:
//
//   - Lời giải phải THẬT SỰ giải được (chạy gradeLab lên chính nó).
//   - Đề bài phải CHƯA được giải sẵn — productive failure ép ở tầng dữ
//     liệu, y như luật "bài đầu module phải có ví dụ giải sẵn" đang có.
//   - Lời giải chỉ được dùng những thao tác mà đề bài cho phép: đề không
//     được đòi người học làm thứ mà chính nó cấm.
//
// Lỗi ở đây dành cho NGƯỜI SOẠN BÀI lúc dev/build, không bao giờ hiển
// thị cho người học.

import { z } from 'zod'
import { validateTopology, type Topology } from './topology'
import { allowanceViolations, classifyDiff } from './session'
import { devicesReferencedBy, gradeLab, topologyHasDevice, type LabSpec } from './gradeLab'

const idSchema = z.string().min(1)
const macSchema = z
  .string()
  .regex(/^[0-9A-Fa-f]{2}([:-][0-9A-Fa-f]{2}){5}$/, 'MAC phải có dạng AA:BB:CC:00:00:01')
const ipSchema = z
  .string()
  .regex(/^(\d{1,3}\.){3}\d{1,3}$/, 'Địa chỉ IPv4 phải có dạng 4 nhóm số cách nhau bằng dấu chấm')
const prefixSchema = z.number().int().min(0).max(32)
const vlanSchema = z.number().int().min(1).max(4094)

const IpConfigSchema = z.object({ ip: ipSchema, prefix: prefixSchema })

const PcDeviceSchema = z.object({
  kind: z.literal('pc'),
  id: idSchema,
  hostname: z.string().min(1),
  port: z.object({ id: idSchema, mac: macSchema }),
  /** null = chưa cấu hình. Đây là trạng thái HỢP LỆ, không phải dữ liệu thiếu. */
  ipConfig: IpConfigSchema.nullable(),
  gateway: ipSchema.nullable(),
})

const SwitchPortSchema = z
  .object({
    id: idSchema,
    vlan: vlanSchema,
    /** Thiếu = 'access' (mọi đề viết trước Module 14 giữ nguyên nghĩa). */
    mode: z.enum(['access', 'trunk']).optional(),
    /** Chỉ với trunk. Thiếu = cho mọi VLAN qua. */
    allowedVlans: z.array(vlanSchema).min(1).optional(),
    /** Chỉ với trunk. Thiếu = VLAN 1. */
    nativeVlan: vlanSchema.optional(),
    /** Cổng tắt bằng lệnh (CLI, Module 14-16). Thiếu = đang bật. */
    shutdown: z.boolean().optional(),
  })
  .refine(
    (port) => port.mode === 'trunk' || (port.allowedVlans === undefined && port.nativeVlan === undefined),
    { message: 'Cổng access không được khai allowedVlans/nativeVlan — đổi mode sang trunk trước' },
  )

const SwitchDeviceSchema = z.object({
  kind: z.literal('switch'),
  id: idSchema,
  hostname: z.string().min(1),
  ports: z.array(SwitchPortSchema).min(1),
  /** VLAN đã khai bằng lệnh `vlan <n>` mà chưa cổng nào đứng tên. */
  declaredVlans: z.array(vlanSchema).optional(),
  /** STP (Module 15): bội của 4096, 0..61440 như chuẩn 802.1D. */
  bridgePriority: z.number().int().min(0).max(61440).refine((n) => n % 4096 === 0, {
    message: 'Bridge priority phải là bội của 4096',
  }).optional(),
  bridgeMac: macSchema.optional(),
})

const StaticRouteSchema = z.object({
  destination: ipSchema,
  prefix: prefixSchema,
  nextHop: ipSchema,
})

const AclAddressSchema = z.object({ ip: ipSchema, wildcard: ipSchema })

const AclRuleSchema = z.object({
  seq: z.number().int().min(1),
  action: z.enum(['permit', 'deny']),
  protocol: z.enum(['ip', 'icmp', 'tcp', 'udp']),
  src: AclAddressSchema,
  dst: AclAddressSchema,
  /** Chỉ với tcp/udp; phòng lab không sinh lưu lượng đó nên nó để ĐỌC. */
  dstPort: z.number().int().min(1).max(65535).optional(),
})

const AccessListSchema = z.object({
  /** 1-99 là ACL chuẩn, 100-199 là ACL mở rộng (spec v2 mục 5.1). */
  // Chỉ dải extended: 1-99 là ACL chuẩn với cú pháp khác hẳn mà mô hình
  // không có — xem chú thích parseAclRule (engine/cli/interpret.ts).
  number: z.number().int().min(100).max(199),
  rules: z.array(AclRuleSchema).min(1),
})

const RouterDeviceSchema = z.object({
  kind: z.literal('router'),
  id: idSchema,
  hostname: z.string().min(1),
  ports: z
    .array(
      z.object({
        id: idSchema,
        mac: macSchema,
        ipConfig: IpConfigSchema.nullable(),
        /** Cổng tắt bằng lệnh (CLI). Thiếu = đang bật. */
        shutdown: z.boolean().optional(),
        /** Số hiệu ACL áp lên cổng theo chiều vào / ra. Thiếu = không lọc. */
        aclIn: z.number().int().min(1).max(199).optional(),
        aclOut: z.number().int().min(1).max(199).optional(),
      }),
    )
    .min(1),
  staticRoutes: z.array(StaticRouteSchema),
  accessLists: z.array(AccessListSchema).optional(),
  /** Tiến trình OSPF (Module 16). Thiếu = chưa bật; area chỉ có 0. */
  ospf: z
    .object({
      processId: z.number().int().min(1).max(65535),
      networks: z
        // Phạm vi đóng băng chỉ có area 0, nhưng KIỂU vẫn là number: khai
        // literal ở đây thì kiểu suy ra từ schema hẹp hơn kiểu viết tay ở
        // topology.ts, và hai mô tả của cùng một dữ liệu lệch nhau.
        .array(z.object({ ip: ipSchema, wildcard: ipSchema, area: z.number().int().min(0).max(0) }))
        .min(1),
    })
    .optional(),
})

export const DeviceSchema = z.discriminatedUnion('kind', [PcDeviceSchema, SwitchDeviceSchema, RouterDeviceSchema])

const PortRefSchema = z.object({ deviceId: idSchema, portId: idSchema })

export const TopologySchema = z.object({
  devices: z.array(DeviceSchema).min(1),
  links: z.array(z.object({ id: idSchema, a: PortRefSchema, b: PortRefSchema })),
  /** Bật STP cho cả sơ đồ (Module 15). Thiếu = tắt. */
  stpEnabled: z.boolean().optional(),
})

export const LabGoalSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('ping'),
    from: idSchema,
    to: idSchema,
    expect: z.enum(['reach', 'blocked']),
  }),
  z.object({
    kind: z.literal('pathThrough'),
    from: idSchema,
    to: idSchema,
    via: z.array(idSchema).min(1),
  }),
  z.object({
    kind: z.literal('macLearned'),
    switchId: idSchema,
    mac: macSchema,
    portId: idSchema,
    vlan: vlanSchema,
  }),
  z.object({
    kind: z.literal('arpResolved'),
    deviceId: idSchema,
    ip: ipSchema,
    mac: macSchema,
  }),
])

export const LabAllowanceSchema = z.object({
  addDevices: z.array(z.enum(['pc', 'switch', 'router'])),
  removeDevices: z.boolean(),
  addLinks: z.boolean(),
  removeLinks: z.boolean(),
  setVlan: z.boolean(),
  /** Đổi vai access <-> trunk (Module 14). Thiếu = không cho. */
  setTrunk: z.boolean().optional(),
  /** Bật/tắt STP, chỉnh bridge priority (Module 15). Thiếu = không cho. */
  setStp: z.boolean().optional(),
  setIp: z.boolean(),
  setRoutes: z.boolean(),
  maxDevices: z.number().int().min(1).max(20),
})

const LabSpecBaseSchema = z.object({
  initial: TopologySchema,
  goals: z.array(LabGoalSchema).min(1),
  allow: LabAllowanceSchema,
  solution: TopologySchema,
})

/** Người học phải LÀM ĐƯỢC gì đó — quyền toàn "không" là bài chỉ ngồi nhìn. */
function allowsAnything(allow: LabSpec['allow']): boolean {
  return (
    allow.addDevices.length > 0 ||
    allow.removeDevices ||
    allow.addLinks ||
    allow.removeLinks ||
    allow.setVlan ||
    allow.setTrunk === true ||
    allow.setStp === true ||
    allow.setIp ||
    allow.setRoutes
  )
}

function labCrossChecks(spec: LabSpec, ctx: z.RefinementCtx): void {
  const issue = (message: string, path: (string | number)[] = []) =>
    ctx.addIssue({ code: 'custom', message, path })

  const initialProblems = validateTopology(spec.initial)
  for (const problem of initialProblems) {
    issue(`Sơ đồ đề bài có lỗi cấu trúc: ${problem.code}`, ['initial'])
  }
  const solutionProblems = validateTopology(spec.solution)
  for (const problem of solutionProblems) {
    issue(`Sơ đồ lời giải có lỗi cấu trúc: ${problem.code}`, ['solution'])
  }

  // Goal chỉ được nhắc tới thiết bị có thật trong ĐỀ BÀI: goal trỏ vào
  // thiết bị mà người học phải tự thêm thì không kiểm tĩnh được.
  for (const deviceId of devicesReferencedBy(spec.goals)) {
    if (!topologyHasDevice(spec.initial, deviceId)) {
      issue(`Mục tiêu nhắc tới thiết bị "${deviceId}" không có trong sơ đồ đề bài`, ['goals'])
    }
  }

  if (!allowsAnything(spec.allow)) {
    issue('Đề bài không cho phép người học làm gì cả — lab này không giải được', ['allow'])
  }

  // Mục tiêu toàn "phải KHÔNG thông" là bài dạy sai hướng: người học sẽ
  // đạt bằng cách rút hết dây.
  const hasPositiveGoal = spec.goals.some(
    (g) => (g.kind === 'ping' && g.expect === 'reach') || g.kind === 'pathThrough',
  )
  if (!hasPositiveGoal) {
    issue('Cần ít nhất một mục tiêu ping "reach" hoặc pathThrough — bài chỉ toàn "chặn" thì rút dây là xong', ['goals'])
  }

  // Bảng MAC và bộ nhớ ARP chỉ có nội dung SAU KHI có traffic; không có
  // goal ping nào thì hai loại mục tiêu này vĩnh viễn không đạt được.
  const needsTraffic = spec.goals.some((g) => g.kind === 'macLearned' || g.kind === 'arpResolved')
  const hasTraffic = spec.goals.some((g) => g.kind === 'ping' || g.kind === 'pathThrough')
  if (needsTraffic && !hasTraffic) {
    issue('Mục tiêu về bảng MAC / ARP cần ít nhất một mục tiêu ping để sinh ra traffic', ['goals'])
  }

  // Các phép kiểm dưới đây phải CHẠY mô phỏng nên chỉ an toàn khi hai sơ
  // đồ đã sạch lỗi cấu trúc.
  if (initialProblems.length > 0 || solutionProblems.length > 0) return

  const changes = classifyDiff(spec.initial, spec.solution)
  const violations = allowanceViolations(spec.allow, changes)
  if (violations.length > 0) {
    issue(
      `Lời giải cần những thao tác mà đề bài không cho phép: ${violations.join(', ')} — đề bài tự mâu thuẫn`,
      ['allow'],
    )
  }

  let solutionPasses = false
  try {
    solutionPasses = gradeLab(spec, spec.solution).passed
  } catch (error) {
    issue(`Không chấm được lời giải: ${(error as Error).message}`, ['solution'])
    return
  }
  if (!solutionPasses) {
    issue('Lời giải không đạt được mục tiêu của chính đề bài — bài này không giải được', ['solution'])
  }

  let initialPasses = true
  try {
    initialPasses = gradeLab(spec, spec.initial).passed
  } catch (error) {
    issue(`Không chấm được sơ đồ đề bài: ${(error as Error).message}`, ['initial'])
    return
  }
  if (initialPasses) {
    issue('Sơ đồ đề bài đã đạt sẵn mục tiêu — người học không có gì để làm (mất productive failure)', ['initial'])
  }
}

export const LabSpecSchema = LabSpecBaseSchema.superRefine((spec, ctx) => {
  labCrossChecks(spec as LabSpec, ctx)
})

/** Parse một đề lab, ném lỗi gộp dễ đọc trỏ đúng chỗ sai. */
export function parseLabSpec(data: unknown): LabSpec {
  const result = LabSpecSchema.safeParse(data)
  if (!result.success) {
    const lines = result.error.issues.map((i) => `- [${i.path.join('.')}] ${i.message}`)
    throw new Error(`Đề lab không hợp lệ:\n${lines.join('\n')}`)
  }
  return result.data as LabSpec
}

export type ParsedTopology = z.infer<typeof TopologySchema>
export type ParsedLabSpec = z.infer<typeof LabSpecSchema>

/**
 * Chốt chặn thuần-kiểu: schema zod và kiểu viết tay ở `topology.ts` /
 * `gradeLab.ts` là hai mô tả của CÙNG một hình dạng dữ liệu, và chúng
 * dễ trôi khỏi nhau lúc sửa. Hai dòng dưới không sinh code chạy — chúng
 * chỉ khiến `tsc` báo lỗi ngay khi hai bên lệch nhau.
 */
type AssertAssignable<Target, Source extends Target> = [Target, Source]
export type SchemaMatchesTopology = AssertAssignable<Topology, ParsedTopology>
export type SchemaMatchesLabSpec = AssertAssignable<LabSpec, ParsedLabSpec>
