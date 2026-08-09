// Schema zod cho MỘT BÀI CLI THIẾT BỊ — cùng lối labSchema/psSchema:
// ngoài kiểm cấu trúc, ép các ràng buộc SƯ PHẠM mà schema thuần không nói
// được. Lỗi ở đây dành cho NGƯỜI SOẠN BÀI lúc dev/build, không bao giờ
// hiển thị cho người học.
//
//   - Sơ đồ đề bài phải sạch lỗi CẤU TRÚC (dây cắm vào cổng ma, một cổng
//     hai dây...). Lỗi CẤU HÌNH thì được phép — đó chính là bài học.
//   - Mọi thiết bị mà mục tiêu và lời giải nhắc tới phải có thật trong sơ
//     đồ đề bài, và phải là thiết bị CÓ CLI (switch/router — máy tính
//     không có console để cắm vào).
//   - LỜI GIẢI PHẢI CHẠY ĐƯỢC: không dòng nào bị máy từ chối, và chạy
//     xong phải đạt TRỌN mục tiêu.
//   - Đề bài CHƯA ĐƯỢC GIẢI SẴN: chưa gõ gì mà đã đạt thì người học
//     không có việc để làm (mất generation effect).

import { z } from 'zod'
import { findDevice, validateTopology } from '../lab/topology'
import { LabGoalSchema, TopologySchema } from '../lab/labSchema'
import { initialCliState } from './state'
import {
  devicesReferencedByCli,
  gradeCli,
  runCliSolution,
  type CliSpec,
} from './gradeCli'

const idSchema = z.string().min(1)
const vlanSchema = z.number().int().min(1).max(4094)
const ipSchema = z
  .string()
  .regex(/^(\d{1,3}\.){3}\d{1,3}$/, 'Địa chỉ IPv4 phải có dạng 4 nhóm số cách nhau bằng dấu chấm')
const prefixSchema = z.number().int().min(0).max(32)
const portRef = { deviceId: idSchema, portId: idSchema }

export const CliGoalSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('behavior'), goal: LabGoalSchema }),
  z.object({ kind: z.literal('port-mode'), ...portRef, mode: z.enum(['access', 'trunk']) }),
  z.object({ kind: z.literal('access-vlan'), ...portRef, vlan: vlanSchema }),
  z.object({ kind: z.literal('trunk-carries'), ...portRef, vlans: z.array(vlanSchema).min(1) }),
  z.object({ kind: z.literal('trunk-blocks'), ...portRef, vlans: z.array(vlanSchema).min(1) }),
  z.object({ kind: z.literal('native-vlan'), ...portRef, vlan: vlanSchema }),
  z.object({ kind: z.literal('port-up'), ...portRef }),
  z.object({ kind: z.literal('port-ip'), ...portRef, ip: ipSchema, prefix: prefixSchema }),
  z.object({
    kind: z.literal('static-route'),
    deviceId: idSchema,
    destination: ipSchema,
    prefix: prefixSchema,
    nextHop: ipSchema,
  }),
  z.object({ kind: z.literal('vlan-exists'), deviceId: idSchema, vlan: vlanSchema }),
  z.object({ kind: z.literal('viewed'), command: idSchema, deviceId: idSchema }),
])

const CliSolutionStepSchema = z.object({
  deviceId: idSchema,
  lines: z.array(z.string().min(1)).min(1),
})

const CliSpecBaseSchema = z.object({
  initial: TopologySchema,
  deviceId: idSchema,
  goals: z.array(CliGoalSchema).min(1),
  solution: z.array(CliSolutionStepSchema).min(1),
})

/** Thiết bị này có console để cắm vào không (máy tính thì không). */
function hasConsole(spec: CliSpec, deviceId: string): boolean {
  const device = findDevice(spec.initial, deviceId)
  return device !== null && device.kind !== 'pc'
}

function cliCrossChecks(spec: CliSpec, ctx: z.RefinementCtx): void {
  const issue = (message: string, path: (string | number)[] = []) =>
    ctx.addIssue({ code: 'custom', message, path })

  const problems = validateTopology(spec.initial)
  for (const problem of problems) {
    issue(`Sơ đồ đề bài có lỗi cấu trúc: ${problem.code}`, ['initial'])
  }
  if (problems.length > 0) return // mô phỏng bên dưới chỉ an toàn khi cấu trúc sạch

  if (!hasConsole(spec, spec.deviceId)) {
    issue(`Console cắm vào "${spec.deviceId}" — thiết bị này không có trong sơ đồ hoặc không có CLI`, ['deviceId'])
    return
  }
  for (const [index, step] of spec.solution.entries()) {
    if (!hasConsole(spec, step.deviceId)) {
      issue(`Lời giải chuyển console sang "${step.deviceId}" — thiết bị này không có CLI`, ['solution', index])
      return
    }
  }
  for (const deviceId of devicesReferencedByCli(spec.goals)) {
    if (findDevice(spec.initial, deviceId) === null) {
      issue(`Mục tiêu nhắc tới thiết bị "${deviceId}" không có trong sơ đồ đề bài`, ['goals'])
    }
  }

  // Đề bài chưa được giải sẵn.
  if (gradeCli(spec, initialCliState(spec.initial, spec.deviceId)).passed) {
    issue('Đề đã đạt mục tiêu từ trước khi gõ lệnh nào — người học không có gì để làm', ['goals'])
  }

  // Lời giải phải chạy sạch và giải được trọn bài của chính nó. Một dòng
  // bị từ chối là đề bài đang dạy người học một câu lệnh không chạy.
  const run = runCliSolution(spec)
  for (const line of run.rejected) {
    issue(`Lời giải có dòng máy không nhận: "${line}"`, ['solution'])
  }
  const evaluation = gradeCli(spec, run.state)
  if (!evaluation.passed) {
    const unmet = evaluation.goals.filter((g) => !g.met).map((g) => g.goal.kind)
    issue(`Lời giải chạy xong vẫn không đạt mục tiêu: ${unmet.join(', ')}`, ['solution'])
  }
}

export const CliSpecSchema = CliSpecBaseSchema.superRefine((spec, ctx) => {
  cliCrossChecks(spec as CliSpec, ctx)
})

/** Parse một đề CLI, ném lỗi gộp dễ đọc trỏ đúng chỗ sai. */
export function parseCliSpec(data: unknown): CliSpec {
  const result = CliSpecSchema.safeParse(data)
  if (!result.success) {
    const lines = result.error.issues.map((i) => `- [${i.path.join('.')}] ${i.message}`)
    throw new Error(`Đề CLI không hợp lệ:\n${lines.join('\n')}`)
  }
  return result.data as CliSpec
}

export type ParsedCliSpec = z.infer<typeof CliSpecSchema>

/** Chốt chặn thuần-kiểu (cùng lối labSchema): hai mô tả lệch nhau là tsc đỏ. */
type AssertAssignable<Target, Source extends Target> = [Target, Source]
export type SchemaMatchesCliSpec = AssertAssignable<CliSpec, ParsedCliSpec>
