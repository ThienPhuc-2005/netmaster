// Chấm một ca bệnh của Phòng khám (spec Module 11).
//
// Một ca chấm HAI phần, tách bạch để phản hồi nói đúng chỗ hổng:
//
//   1. CHẨN ĐOÁN — người học chọn bệnh trong danh sách khả dĩ. Phần này
//      là so chỉ số (đúng/sai một lựa chọn) nên nằm ở tầng CÂU HỎI như
//      mọi mcq; engine chỉ khai hình dạng dữ liệu.
//   2. SỬA — tùy ca:
//      - 'edit-network': bệnh nằm trong topology (rút dây, sai gateway,
//        trùng IP, sai VLAN…) → người học sửa sơ đồ, chấm bằng ĐÚNG
//        gradeLab (hành vi, không hình dạng — mọi cách sửa chạy được đều
//        được công nhận). `mustClearDiagnoses` vá chỗ gradeLab không với
//        tới: ca trùng IP có thể "goals xanh" mà bệnh vẫn còn (ping
//        thông vì tình cờ hỏi trúng máy đúng) — buộc các chẩn đoán tĩnh
//        này phải BIẾN MẤT khỏi sơ đồ đã sửa.
//      - 'choose-action': bệnh ngoài mô hình mạng (DNS chết, GPO chặn ở
//        máy chủ miền) → sửa thật nằm ngoài tầm tay sơ đồ, người học
//        chọn HÀNH ĐỘNG đúng — cũng chấm ở tầng câu hỏi.
//
// Technical contract: thuần, tất định, không mutate.

import { diagnose, gradeLab, type LabDiagnosis, type LabEvaluation, type LabGoal } from '../lab/gradeLab'
import type { LabAllowance } from '../lab/session'
import type { Topology } from '../lab/topology'
import type { PingFailure } from '../lab/simulate'
import { ipOwners, type ClinicPatient, type ClinicSymptom } from './patient'
import { initialTerminalState, runCommand } from './terminal'

/** Cách sửa của một ca. */
export type ClinicFix =
  | {
      kind: 'edit-network'
      allow: LabAllowance
      goals: LabGoal[]
      /** Chẩn đoán tĩnh phải biến mất sau khi sửa (xem ghi chú đầu file). */
      mustClearDiagnoses?: LabDiagnosis[]
      /** Lời giải tham chiếu — tầng-3 của phản hồi + chốt kiểm nội dung. */
      solution: Topology
    }
  | { kind: 'choose-action' }

/** Đề một ca bệnh — phần kỹ thuật thuần, chuỗi hiển thị ở tầng câu hỏi. */
export interface ClinicCaseSpec {
  patient: ClinicPatient
  symptom: ClinicSymptom
  fix: ClinicFix
}

// ---------------------------------------------------------------
// Triệu chứng có thật không? (chốt kiểm nội dung + nút "chạy lại triệu chứng")
// ---------------------------------------------------------------

export interface SymptomCheck {
  /** true = bệnh nhân ĐANG ốm đúng như lời than. */
  sick: boolean
  /** Lý do tầng mạng (nếu triệu chứng chạm tới ping). */
  pingFailure: PingFailure | null
}

/**
 * Chạy triệu chứng trên MỘT trạng thái topology cho trước. Đi qua đúng
 * terminal của phòng khám (resolve tên → ping) để overlay bệnh — DNS
 * chết, luật chặn trên máy — được tính, chứ không chỉ tầng lab.
 */
export function checkSymptom(spec: ClinicCaseSpec, topology: Topology): SymptomCheck {
  const patient: ClinicPatient = { ...spec.patient, topology }
  const symptom = spec.symptom

  if (symptom.kind === 'resolve-fails') {
    const result = runCommand(patient, initialTerminalState(), `nslookup ${symptom.name}`)
    const failed = result.outcome.kind === 'nslookup' && result.outcome.failure !== null
    return { sick: failed, pingFailure: null }
  }

  if (symptom.kind === 'ping-flaps') {
    // Bệnh trùng IP: "ốm" chừng nào còn từ hai máy giành một IP — chính
    // nguồn sự thật mà terminal dùng để luân phiên chủ IP giữa các lượt.
    return { sick: ipOwners(topology, symptom.target).length > 1, pingFailure: null }
  }

  const seatPatient: ClinicPatient = { ...patient, seatId: symptom.from }
  const result = runCommand(seatPatient, initialTerminalState(), `ping ${symptom.target}`)
  if (result.outcome.kind !== 'ping') return { sick: false, pingFailure: null }
  const failed = !result.outcome.replied
  return {
    sick: failed,
    pingFailure: result.outcome.failure === 'no-such-host' ? null : result.outcome.failure,
  }
}

// ---------------------------------------------------------------
// Chấm phần SỬA kiểu edit-network
// ---------------------------------------------------------------

export interface ClinicFixEvaluation {
  passed: boolean
  /** Kết quả gradeLab — UI phát lại từng goal trên sơ đồ như phòng lab. */
  lab: LabEvaluation
  /** Chẩn đoán bắt buộc phải sạch mà VẪN CÒN trên sơ đồ đã sửa. */
  remainingDiagnoses: LabDiagnosis[]
  /** Triệu chứng gốc chạy lại trên sơ đồ đã sửa — hết ốm chưa? */
  symptomCleared: boolean
}

/**
 * Chấm sơ đồ người học đã sửa. Đạt khi: mọi goal xanh, các chẩn đoán
 * bắt buộc đã sạch, VÀ triệu chứng gốc không còn tái hiện — ba lớp vì
 * mỗi lớp bắt một kiểu "sửa giả vờ" khác nhau.
 */
export function gradeClinicFix(spec: ClinicCaseSpec, edited: Topology): ClinicFixEvaluation {
  if (spec.fix.kind !== 'edit-network') {
    throw new Error('gradeClinicFix: ca này sửa bằng chọn hành động, không phải sửa sơ đồ')
  }
  const lab = gradeLab(
    { initial: spec.patient.topology, goals: spec.fix.goals, allow: spec.fix.allow, solution: spec.fix.solution },
    edited,
  )
  const must = spec.fix.mustClearDiagnoses ?? []
  const after = diagnose(edited, spec.fix.goals)
  const remainingDiagnoses = must.filter((d) => after.includes(d))
  const symptom = checkSymptom(spec, edited)
  const symptomCleared = !symptom.sick
  return {
    passed: lab.passed && remainingDiagnoses.length === 0 && symptomCleared,
    lab,
    remainingDiagnoses,
    symptomCleared,
  }
}

/** Ca sửa-sơ-đồ đã giải xong chưa — đường một-dòng cho tầng câu hỏi. */
export function isClinicFixSolved(spec: ClinicCaseSpec, edited: Topology): boolean {
  return gradeClinicFix(spec, edited).passed
}

// ---------------------------------------------------------------
// Manh mối tĩnh cho phản hồi 3 tầng (không lộ lời giải)
// ---------------------------------------------------------------

/**
 * Ca này có những "mùi bệnh" nào — nguyên liệu để tầng câu hỏi soạn
 * hintTopic/hint bám đúng ca, và để test nội dung khẳng định người soạn
 * không khai nhầm loại bệnh so với topology thật.
 */
export function smellsOf(spec: ClinicCaseSpec): string[] {
  const smells = new Set<string>()
  const topo = spec.patient.topology
  for (const d of diagnose(topo)) smells.add(d)
  if (spec.patient.overlay.dns?.down === true) smells.add('dns-down')
  for (const block of spec.patient.overlay.hostBlocks ?? []) smells.add(`host-block-${block.source}`)
  // Trùng IP nhìn từ topology (diagnose đã có 'duplicate-ip', nhưng chỉ
  // khi liên quan goal — quét thẳng cho chắc).
  const seen = new Map<string, number>()
  for (const device of topo.devices) {
    const ips =
      device.kind === 'pc'
        ? (device.ipConfig ? [device.ipConfig.ip] : [])
        : device.kind === 'router'
          ? device.ports.flatMap((p) => (p.ipConfig ? [p.ipConfig.ip] : []))
          : []
    for (const ip of ips) seen.set(ip, (seen.get(ip) ?? 0) + 1)
  }
  if ([...seen.values()].some((n) => n > 1)) smells.add('duplicate-ip')
  return [...smells]
}
