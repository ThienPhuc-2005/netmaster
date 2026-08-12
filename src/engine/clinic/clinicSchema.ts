// Schema zod cho MỘT CA BỆNH của Phòng khám — cùng lối với labSchema:
// ngoài kiểm cấu trúc, ép các ràng buộc SƯ PHẠM mà schema thuần không
// nói được. Lỗi ở đây dành cho NGƯỜI SOẠN BÀI lúc dev/build, không bao
// giờ hiển thị cho người học.
//
//   - Bệnh nhân phải ỐM THẬT: chạy triệu chứng trên trạng thái đầu phải
//     ra đúng kết quả hỏng. Bệnh nhân khỏe là đề bài nói dối — phòng
//     khám 100% productive failure sụp ngay từ dữ liệu.
//   - Ca sửa-sơ-đồ phải SỬA ĐƯỢC: lời giải tham chiếu phải qua đủ ba
//     lớp chấm (goals + chẩn đoán sạch + triệu chứng hết), và chỉ dùng
//     thao tác mà đề cho phép.
//   - Trạng thái đầu KHÔNG được đạt sẵn (người học phải có việc để làm).
//   - `mustClearDiagnoses` phải là bệnh THẬT của sơ đồ đầu — khai khống
//     một chẩn đoán không tồn tại là bắt người học sửa ma.

import { z } from 'zod'
import { LabAllowanceSchema, LabGoalSchema, TopologySchema } from '../lab/labSchema'
import { diagnose, type LabDiagnosis } from '../lab/gradeLab'
import { allowanceViolations, classifyDiff } from '../lab/session'
import { findDevice } from '../lab/topology'
import { validatePatient, type ClinicPatient } from './patient'
import { checkSymptom, gradeClinicFix, phanMang, type ClinicCaseSpec } from './gradeClinic'

const idSchema = z.string().min(1)
const ipSchema = z.string().min(7)

const DnsRecordSchema = z.object({ name: z.string().min(1), ip: ipSchema })

const NetstatRowSchema = z.object({
  proto: z.enum(['TCP', 'UDP']),
  local: z.string().min(1),
  remote: z.string().min(1),
  state: z.string(),
})

const HostBlockSchema = z.object({
  deviceId: idSchema,
  direction: z.enum(['inbound', 'outbound']),
  source: z.enum(['gpo', 'firewall']),
  ruleName: z.string().min(1),
})

const AppliedGpoSchema = z.object({
  name: z.string().min(1),
  blocking: z.literal(true).optional(),
})

export const ClinicOverlaySchema = z.object({
  dns: z
    .object({
      serverIp: ipSchema,
      records: z.array(DnsRecordSchema),
      down: z.literal(true).optional(),
    })
    .optional(),
  hostBlocks: z.array(HostBlockSchema).optional(),
  connections: z.record(z.string(), z.array(NetstatRowSchema)).optional(),
  gpos: z.record(z.string(), z.array(AppliedGpoSchema)).optional(),
})

export const ClinicSymptomSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('ping-fails'), from: idSchema, target: z.string().min(1) }),
  z.object({ kind: z.literal('resolve-fails'), from: idSchema, name: z.string().min(1) }),
  z.object({ kind: z.literal('ping-flaps'), from: idSchema, target: ipSchema }),
])

/**
 * Mọi mã chẩn đoán mà `diagnose()` của phòng lab có thể trả ra.
 *
 * Khai kiểu `Record<LabDiagnosis, true>` chứ không phải mảng chuỗi rời:
 * engine lab thêm một chẩn đoán mới (Module 14 thêm hai) mà quên khai ở
 * đây là `tsc` đỏ ngay — thay vì lặng lẽ để nội dung phòng khám không
 * khai được bệnh đó trong `mustClearDiagnoses`.
 */
const DIAGNOSIS_TABLE: Record<LabDiagnosis, true> = {
  'device-isolated': true,
  'missing-ip': true,
  'missing-gateway': true,
  'gateway-not-in-subnet': true,
  'duplicate-ip': true,
  'vlan-mismatch-on-link': true,
  'same-subnet-different-vlan': true,
  'l2-loop': true,
  'trunk-one-side-only': true,
  'native-vlan-mismatch-on-trunk': true,
  'port-shutdown': true,
}

const DIAGNOSIS_VALUES = Object.keys(DIAGNOSIS_TABLE) as [LabDiagnosis, ...LabDiagnosis[]]

/** Nửa-mạng của cách sửa — khai một lần, hai kiểu ca dùng chung. */
const networkFixShape = {
  allow: LabAllowanceSchema,
  goals: z.array(LabGoalSchema).min(1),
  mustClearDiagnoses: z.array(z.enum(DIAGNOSIS_VALUES)).min(1).optional(),
  solution: TopologySchema,
}

export const ClinicFixSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('edit-network'), ...networkFixShape }),
  // Ca liên tầng: sửa sơ đồ XONG rồi vẫn phải chọn hành động cho nửa
  // bệnh nằm ngoài mô hình mạng (xem ghi chú đầu gradeClinic).
  z.object({ kind: z.literal('edit-and-act'), ...networkFixShape }),
  z.object({ kind: z.literal('choose-action') }),
])

const ClinicCaseBaseSchema = z.object({
  patient: z.object({
    topology: TopologySchema,
    overlay: ClinicOverlaySchema,
    seatId: idSchema,
  }),
  symptom: ClinicSymptomSchema,
  fix: ClinicFixSchema,
  // Console thiết bị chỉ-đọc trong pha khám (spec v2 mục 4.2) — chỉ có
  // nghĩa khi sơ đồ có switch/router; ca toàn PC khai cờ này là đề soạn ẩu.
  deviceConsole: z.literal(true).optional(),
})

function clinicCrossChecks(spec: ClinicCaseSpec, ctx: z.RefinementCtx): void {
  const issue = (message: string, path: (string | number)[] = []) =>
    ctx.addIssue({ code: 'custom', message, path })

  const patient: ClinicPatient = spec.patient
  for (const problem of validatePatient(patient)) {
    issue(`Hồ sơ bệnh nhân lỗi cấu trúc: ${problem.code} tại ${problem.where}`, ['patient'])
  }

  // deviceConsole chỉ có nghĩa khi có thiết bị mang CLI để cắm vào.
  if (spec.deviceConsole === true) {
    const hasCliDevice = patient.topology.devices.some((d) => d.kind === 'switch' || d.kind === 'router')
    if (!hasCliDevice) {
      issue('deviceConsole khai true nhưng sơ đồ không có switch/router nào để cắm console', ['deviceConsole'])
    }
  }

  // Người than phiền trong triệu chứng phải là một PC có thật — terminal
  // của phòng khám chỉ ngồi được ở PC.
  const complainer = findDevice(patient.topology, spec.symptom.from)
  if (complainer === null || complainer.kind !== 'pc') {
    issue(`Triệu chứng khai từ "${spec.symptom.from}" — không phải PC trong sơ đồ`, ['symptom'])
  }

  // Các phép kiểm dưới đây chạy mô phỏng — chỉ an toàn khi cấu trúc sạch.
  if (validatePatient(patient).length > 0 || complainer === null || complainer.kind !== 'pc') return

  // Bệnh nhân phải ốm thật ở trạng thái đầu.
  const initialSymptom = checkSymptom(spec, patient.topology)
  if (!initialSymptom.sick) {
    issue('Bệnh nhân không ốm: chạy triệu chứng trên trạng thái đầu vẫn thành công — đề bài nói dối', ['symptom'])
  }

  // Mọi ca có ĐỘNG VÀO SƠ ĐỒ đều phải qua các phép kiểm dưới đây — hỏi
  // qua `phanMang` chứ không so `kind === 'edit-network'`, không thì ca
  // liên tầng lọt lưới toàn bộ cổng chất lượng của phòng khám.
  const mang = phanMang(spec.fix)
  if (mang !== null) {
    // Lời giải chỉ được dùng thao tác mà đề cho phép.
    const violations = allowanceViolations(mang.allow, classifyDiff(patient.topology, mang.solution))
    if (violations.length > 0) {
      issue(`Lời giải cần thao tác đề không cho phép: ${violations.join(', ')}`, ['fix', 'allow'])
    }

    // mustClearDiagnoses phải là bệnh THẬT đang có trên sơ đồ đầu.
    const initialDiagnoses = diagnose(patient.topology, mang.goals)
    for (const d of mang.mustClearDiagnoses ?? []) {
      if (!initialDiagnoses.includes(d)) {
        issue(`mustClearDiagnoses khai "${d}" nhưng sơ đồ đầu không hề có bệnh đó`, ['fix'])
      }
    }

    let solutionEval
    try {
      solutionEval = gradeClinicFix(spec, mang.solution)
    } catch (error) {
      issue(`Không chấm được lời giải: ${(error as Error).message}`, ['fix', 'solution'])
      return
    }
    if (!solutionEval.passed) {
      const why = [
        !solutionEval.lab.passed ? 'goals chưa xanh' : null,
        solutionEval.remainingDiagnoses.length > 0 ? `chẩn đoán còn: ${solutionEval.remainingDiagnoses.join(', ')}` : null,
        !solutionEval.symptomCleared ? 'triệu chứng vẫn tái hiện' : null,
      ].filter((x): x is string => x !== null)
      issue(`Lời giải không chữa được ca của chính nó (${why.join('; ')})`, ['fix', 'solution'])
    }

    let initialPassed = true
    try {
      initialPassed = gradeClinicFix(spec, patient.topology).passed
    } catch (error) {
      issue(`Không chấm được trạng thái đầu: ${(error as Error).message}`, ['patient'])
      return
    }
    if (initialPassed) {
      issue('Trạng thái đầu đã đạt sẵn — người học không có gì để sửa', ['patient'])
    }
  }
}

export const ClinicCaseSpecSchema = ClinicCaseBaseSchema.superRefine((spec, ctx) => {
  clinicCrossChecks(spec as ClinicCaseSpec, ctx)
})

/** Parse một ca bệnh, ném lỗi gộp dễ đọc trỏ đúng chỗ sai. */
export function parseClinicCase(data: unknown): ClinicCaseSpec {
  const result = ClinicCaseSpecSchema.safeParse(data)
  if (!result.success) {
    const lines = result.error.issues.map((i) => `- [${i.path.join('.')}] ${i.message}`)
    throw new Error(`Ca bệnh không hợp lệ:\n${lines.join('\n')}`)
  }
  return result.data as ClinicCaseSpec
}

export type ParsedClinicCase = z.infer<typeof ClinicCaseSpecSchema>

/**
 * Chốt chặn thuần-kiểu (cùng lối labSchema): schema zod và kiểu viết tay
 * là hai mô tả của CÙNG một hình dạng — lệch nhau là `tsc` đỏ ngay.
 */
type AssertAssignable<Target, Source extends Target> = [Target, Source]
export type SchemaMatchesClinicCase = AssertAssignable<ClinicCaseSpec, ParsedClinicCase>
