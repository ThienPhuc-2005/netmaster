// Schema zod cho MỘT BÀI TERMINAL POWERSHELL — cùng lối labSchema/
// clinicSchema: ngoài kiểm cấu trúc, ép các ràng buộc SƯ PHẠM mà schema
// thuần không nói được. Lỗi ở đây dành cho NGƯỜI SOẠN BÀI lúc dev/build.
//
//   - Thế giới phải sạch lỗi cấu trúc (trùng sam, OU ma...).
//   - LỜI GIẢI PHẢI CHẠY ĐƯỢC: từng dòng solution chạy tuần tự không
//     được lỗi/lệnh lạ, và chạy xong phải đạt TRỌN mục tiêu.
//   - Đề bài CHƯA ĐƯỢC GIẢI SẴN: thế giới ban đầu (chưa gõ gì) không
//     được đạt mục tiêu — generation effect cần việc để làm.

import { z } from 'zod'
import { validatePsWorld } from './world'
import { runPsScript } from './interpret'
import { gradePs, type PsSpec } from './gradePs'

const idText = z.string().min(1)

const PsInterfaceSchema = z.object({
  alias: idText,
  ip: z.string().min(7),
  prefix: z.number().int().min(0).max(32),
})

const PsTargetSchema = z.object({
  ip: z.string().min(7),
  name: idText.optional(),
  pingable: z.boolean(),
  openPorts: z.array(z.number().int().min(1).max(65535)),
})

const AdUserSchema = z.object({
  name: idText,
  sam: idText,
  ou: idText,
  enabled: z.boolean(),
})

const AdGroupSchema = z.object({
  name: idText,
  scope: z.enum(['Global', 'DomainLocal']),
  members: z.array(idText),
})

export const PsWorldSchema = z.object({
  hostname: idText,
  interfaces: z.array(PsInterfaceSchema).min(1),
  targets: z.array(PsTargetSchema),
  ad: z
    .object({
      domain: idText,
      ous: z.array(idText).min(1),
      users: z.array(AdUserSchema),
      /** Thiếu = miền không có nhóm — thế giới Module 12 giữ nguyên nghĩa. */
      groups: z.array(AdGroupSchema).optional(),
    })
    .nullable(),
  files: z.record(z.string(), z.array(z.string())),
})

export const PsGoalSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('ad-user'), sam: idText, ou: idText.optional() }),
  z.object({ kind: z.literal('ad-user-count'), ou: idText, atLeast: z.number().int().min(1) }),
  z.object({ kind: z.literal('group-member'), group: idText, sam: idText }),
  z.object({ kind: z.literal('tested-connection'), ip: z.string().min(7), port: z.number().int().min(1).max(65535).optional() }),
  z.object({ kind: z.literal('found-line'), mustContain: idText, maxMatches: z.number().int().min(1).optional() }),
])

const PsSpecBaseSchema = z.object({
  world: PsWorldSchema,
  goals: z.array(PsGoalSchema).min(1),
  solution: z.array(z.string().min(1)).min(1),
})

function psCrossChecks(spec: PsSpec, ctx: z.RefinementCtx): void {
  const issue = (message: string, path: (string | number)[] = []) =>
    ctx.addIssue({ code: 'custom', message, path })

  const problems = validatePsWorld(spec.world)
  for (const p of problems) {
    issue(`Thế giới lỗi cấu trúc: ${p.code} tại ${p.where}`, ['world'])
  }
  if (problems.length > 0) return // mô phỏng bên dưới chỉ an toàn khi cấu trúc sạch

  // Đề bài chưa được giải sẵn.
  const { state: untouched } = runPsScript(spec.world, [])
  if (gradePs(spec, untouched).passed) {
    issue('Đề đã đạt mục tiêu từ trước khi gõ lệnh nào — người học không có gì để làm', ['goals'])
  }

  // Lời giải phải chạy sạch và giải được trọn bài của chính nó.
  const { state, results } = runPsScript(spec.world, spec.solution)
  for (const [i, result] of results.entries()) {
    if (result.outcome.kind === 'error' || result.outcome.kind === 'unknown') {
      const detail = result.outcome.kind === 'error' ? result.outcome.message : `lệnh lạ "${result.outcome.input}"`
      issue(`Lời giải dòng ${i + 1} không chạy được: ${detail}`, ['solution', i])
    }
  }
  const evaluation = gradePs(spec, state)
  if (!evaluation.passed) {
    const unmet = evaluation.goals.filter((g) => !g.met).map((g) => g.goal.kind)
    issue(`Lời giải chạy xong vẫn không đạt mục tiêu: ${unmet.join(', ')}`, ['solution'])
  }
}

export const PsSpecSchema = PsSpecBaseSchema.superRefine((spec, ctx) => {
  psCrossChecks(spec as PsSpec, ctx)
})

/** Parse một đề terminal, ném lỗi gộp dễ đọc trỏ đúng chỗ sai. */
export function parsePsSpec(data: unknown): PsSpec {
  const result = PsSpecSchema.safeParse(data)
  if (!result.success) {
    const lines = result.error.issues.map((i) => `- [${i.path.join('.')}] ${i.message}`)
    throw new Error(`Đề terminal PowerShell không hợp lệ:\n${lines.join('\n')}`)
  }
  return result.data as PsSpec
}

export type ParsedPsSpec = z.infer<typeof PsSpecSchema>

/** Chốt chặn thuần-kiểu (cùng lối labSchema): hai mô tả lệch nhau là tsc đỏ. */
type AssertAssignable<Target, Source extends Target> = [Target, Source]
export type SchemaMatchesPsSpec = AssertAssignable<PsSpec, ParsedPsSpec>
