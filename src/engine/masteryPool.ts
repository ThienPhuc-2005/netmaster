// Pool đề thi mastery — mỗi module giữ một NGÂN HÀNG câu, mỗi lượt thi
// rút ra một đề con cỡ cố định.
//
// Vì sao cần (ghế Đo lường, hội đồng 07-08): đề cố định 8 câu thì lượt
// thi lại thứ ba chỉ còn đo TRÍ NHỚ VỀ ĐỀ, không đo kiến thức — người
// học rớt lần đầu, đọc ý cần ôn, thi lại đúng đề cũ và ăn điểm bằng cách
// nhớ mặt câu. Xáo thứ tự câu + xáo lựa chọn MCQ (đã có) chỉ chặn được
// mẹo "câu 3 chọn ô B"; chúng không đổi TẬP câu được hỏi. Rút ngẫu nhiên
// từ pool mới làm được điều đó.
//
// Hai luật của việc rút, cả hai đều là chuyện sư phạm chứ không phải kỹ
// thuật:
//
//  1. **Cỡ đề CỐ ĐỊNH** (MASTERY_DRAW_COUNT). Ngưỡng 85% chỉ so sánh
//     được giữa các lượt khi mẫu số không đổi: 7/8 đậu, 6/8 rớt — y hệt
//     trước khi có pool. Rút số câu thay đổi là đổi luôn ý nghĩa của con
//     số 85% (nguyên tắc 2).
//
//  2. **Câu TRỤ luôn có mặt.** Lab (M4), cung điện (M5/M9), ca bệnh
//     (M11), terminal PowerShell (M12) không phải "một câu như mọi câu":
//     chúng LÀ kỹ năng module đó dạy, và ở M5 ba câu cung điện hợp lại
//     mới phủ hết 15 phòng. Rút trúng thì hỏi, rút trượt thì thôi nghĩa
//     là cổng mastery có ngày không đo tới thứ quan trọng nhất. Nên câu
//     trụ vào đề mọi lượt; chỗ còn lại mới bốc ngẫu nhiên.
//
// Thuần TS: không React, không localStorage, không Math.random ngầm —
// rng bơm từ ngoài vào để test đi được đường tất định.

import type { Question } from './contentSchema'

/** Số câu của MỘT lượt thi — cố định để ngưỡng 85% giữ nguyên nghĩa. */
export const MASTERY_DRAW_COUNT = 8

/** Dạng câu là KỸ NĂNG của module, không phải câu hỏi thay thế được. */
const ANCHOR_KINDS: ReadonlySet<Question['kind']> = new Set(['lab', 'palace-walk', 'clinic', 'ps', 'cli'])

/** Câu trụ — luôn có mặt trong mọi lượt thi của module. Cờ `anchor: true`
 *  theo câu đi trước (M13: kỹ năng chính nằm trong câu typed tính-tay),
 *  rồi mới tới luật theo kind. */
export function isAnchorQuestion(question: Question): boolean {
  if ('anchor' in question && question.anchor === true) return true
  return ANCHOR_KINDS.has(question.kind)
}

/** Cỡ đề thật của một pool (pool nhỏ hơn cỡ chuẩn thì hỏi trọn pool). */
export function masteryDrawCount(pool: readonly Question[]): number {
  return Math.min(MASTERY_DRAW_COUNT, pool.length)
}

/** Fisher-Yates trên bản sao — rng bơm vào để test tất định. */
function shuffled<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

/**
 * Trọng lượng "kết màn" của một câu trụ: ca bệnh là màn tổng duyệt cảm
 * xúc nhất, rồi tới các bề mặt làm-thật, cung điện nhẹ nhất; câu tính-tay
 * cắm cờ `anchor: true` đứng cuối bảng — chỉ kết đề khi module không có
 * câu làm-thật nào (đúng cảnh M13).
 */
const ANCHOR_CLOSING_RANK: Partial<Record<Question['kind'], number>> = {
  clinic: 5,
  cli: 4,
  lab: 3,
  ps: 2,
  'palace-walk': 1,
}

/**
 * Rút một đề thi từ pool của module.
 *
 * Trả về câu đã XÁO THỨ TỰ luôn (thứ tự câu cũng phải đổi mỗi lượt —
 * luật cũ của màn thi, giờ gộp vào đây để nơi gọi chỉ còn một bước).
 *
 * Câu KẾT đề là câu trụ nặng nhất (peak-end): spec hứa "kết bằng ca bệnh
 * liên tầng" cho M21 và nếp "câu chốt là câu làm-thật" cho các module có
 * anchor — xáo mù để ca tổng duyệt rơi vào câu số 1 là phá nhịp lên đỉnh
 * rồi khép màn (biên bản hội đồng trung cấp). Các câu còn lại vẫn xáo.
 *
 * Số câu trụ nhiều hơn cỡ đề là lỗi soạn nội dung, không phải cảnh chạy
 * thật — content.test chặn ở tầng dữ liệu. Nếu vẫn xảy ra thì giữ TRỌN
 * câu trụ (thi dài hơn còn hơn cắt mất kỹ năng đang đo).
 */
export function drawMasteryTest(
  pool: readonly Question[],
  options: { count?: number; rng?: () => number } = {},
): Question[] {
  if (pool.length === 0) {
    throw new Error('drawMasteryTest: pool must not be empty')
  }
  const rng = options.rng ?? Math.random
  const count = Math.min(options.count ?? MASTERY_DRAW_COUNT, pool.length)

  const anchors = pool.filter(isAnchorQuestion)
  const rest = pool.filter((q) => !isAnchorQuestion(q))
  const fill = Math.max(0, count - anchors.length)

  const drawn = shuffled([...anchors, ...shuffled(rest, rng).slice(0, fill)], rng)

  // Đẩy câu trụ nặng nhất về cuối (ổn định: nhiều câu cùng hạng thì giữ
  // câu đứng sau cùng sau lượt xáo — vẫn tất định theo rng).
  let closing = -1
  let bestRank = -1
  drawn.forEach((question, index) => {
    if (!isAnchorQuestion(question)) return
    const rank = ANCHOR_CLOSING_RANK[question.kind] ?? 0
    if (rank >= bestRank) {
      bestRank = rank
      closing = index
    }
  })
  if (closing >= 0) drawn.push(...drawn.splice(closing, 1))
  return drawn
}
