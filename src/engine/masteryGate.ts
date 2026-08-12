// Mastery gate — nguyên tắc 2 (spec mục 1): chưa đạt >= 85% bài kiểm tra
// module thì module sau vẫn khóa. CỐ TÌNH không tồn tại nhánh "skip" ở
// bất kỳ hàm nào trong file này — đó là bất biến sư phạm, không phải
// thiếu sót. Việc CHẤM từng câu thuộc về grading/ — gate chỉ nhận
// boolean[] kết quả, không import grading.

import type { ModuleProgress, ModuleStatus } from './types'

/** Ngưỡng đạt bài kiểm tra module (%) — nguyên tắc 2, spec 2.1/mục 1. */
export const MASTERY_THRESHOLD_PCT = 85

/**
 * Hụt trong khoảng này thì coi là GẦN NGƯỠNG (điểm %).
 *
 * 15 điểm là bề rộng của một hai câu trên đề 8 câu (mỗi câu 12.5%): hụt
 * một hai câu là gần thật, từ ba câu trở lên là chuyện khác hẳn.
 */
export const KHOANG_GAN_NGUONG_PCT = 15

/**
 * Lượt thi trượt này là "gần lắm rồi" hay "còn một quãng nữa"?
 *
 * Vì sao cần phân biệt (phát hiện L3, lượt rà soát màn hiếm gặp 08-12):
 * màn trượt trước đây nói ĐÚNG MỘT CÂU cho mọi điểm số — "Được {pct}% —
 * gần lắm rồi". Người được 0% cũng đọc đúng câu ấy. Đo thật trên browser:
 * trượt 0/8 câu và app vẫn khen "gần lắm rồi". An ủi bằng một câu không
 * đúng sự thật thì lần sau người học không tin câu nào nữa — cùng họ với
 * J5/J6 (thanh tiến độ nói dối ở hai đầu).
 *
 * Hàm này KHÔNG quyết định đậu/trượt (việc đó của `evaluateModuleTest`),
 * nó chỉ chọn giọng cho màn kết quả.
 */
export function ganNguong(pct: number): boolean {
  return pct >= MASTERY_THRESHOLD_PCT - KHOANG_GAN_NGUONG_PCT
}

export interface ModuleTestEvaluation {
  correctCount: number
  total: number
  /** % đúng, KHÔNG làm tròn — so ngưỡng dùng đúng giá trị này. */
  pct: number
  passed: boolean
}

/**
 * Chấm một lượt thi bài kiểm tra module từ danh sách đúng/sai từng câu.
 * results rỗng là lỗi lập trình (schema đã ép masteryTest >= 5 câu).
 */
export function evaluateModuleTest(results: boolean[]): ModuleTestEvaluation {
  if (results.length === 0) {
    throw new Error('evaluateModuleTest: results must not be empty')
  }
  let correctCount = 0
  for (const r of results) if (r) correctCount += 1
  // Multiply before dividing: exact-threshold scores (e.g. 17/20) must
  // yield pct === 85 with no floating-point drift below the gate.
  const pct = (correctCount * 100) / results.length
  return {
    correctCount,
    total: results.length,
    pct,
    passed: pct >= MASTERY_THRESHOLD_PCT,
  }
}

/**
 * Ghi nhận kết quả một lượt thi vào tiến độ module.
 * - bestScorePct chỉ đi lên (giữ điểm cao nhất từng đạt).
 * - status chuyển 'passed' khi pct đạt ngưỡng; ĐÃ 'passed' thì giữ nguyên
 *   vĩnh viễn — thi lại điểm thấp không bị tụt hạng (thi lại là để ôn,
 *   không phải để bị phạt).
 * Pure: returns a new object, never mutates `progress`.
 */
export function applyTestResult(progress: ModuleProgress, pct: number): ModuleProgress {
  // Guard against NaN/out-of-range percentages — always a programming
  // error upstream (pct should come from evaluateModuleTest).
  if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
    throw new Error(`applyTestResult: pct out of range [0, 100]: ${pct}`)
  }
  // Module đang khóa thì không tồn tại lượt thi hợp lệ nào để ghi nhận —
  // nhận pct cho module 'locked' đồng nghĩa có đường vượt gate (nguyên
  // tắc 2), nên chặn thẳng thay vì lặng lẽ mở khóa.
  if (progress.status === 'locked') {
    throw new Error(`applyTestResult: module "${progress.moduleId}" is locked — no test attempt can exist for it`)
  }
  const bestScorePct = progress.bestScorePct === null ? pct : Math.max(progress.bestScorePct, pct)
  const status: ModuleStatus =
    progress.status === 'passed' || pct >= MASTERY_THRESHOLD_PCT ? 'passed' : progress.status
  return { ...progress, bestScorePct, status }
}

/**
 * Tính trạng thái mọi module từ thứ tự chuẩn + tập module đã đạt.
 * Luật (nguyên tắc 2): module đầu tiên luôn mở; module thứ N chỉ mở khi
 * module N-1 đã 'passed', ngược lại khóa. Không có tham số hay nhánh nào
 * bỏ qua chuỗi này.
 */
export function computeModuleStatuses(
  moduleIdsInOrder: string[],
  passedIds: ReadonlySet<string>,
): Record<string, ModuleStatus> {
  const statuses: Record<string, ModuleStatus> = {}
  // Sentinel: "trước module đầu tiên" coi như đã qua → module đầu luôn mở.
  let prevPassed = true
  for (const id of moduleIdsInOrder) {
    const passed = passedIds.has(id)
    statuses[id] = passed ? 'passed' : prevPassed ? 'open' : 'locked'
    prevPassed = passed
  }
  return statuses
}
