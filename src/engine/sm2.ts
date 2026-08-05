// SM-2 đơn giản hóa (spec mục 2.2).
//
// Cơ chế sư phạm: khoảng cách ôn giãn dần 1 → 3 → 7 → 14 → 30 ngày.
// Mỗi lần nhớ lại thành công khi trí nhớ đã "nguội" bớt là một lần
// củng cố sâu hơn (spacing effect) — nên trả lời đúng thì leo lên bậc
// dài hơn. Trả lời sai nghĩa là dấu vết trí nhớ đã yếu, phải xây lại
// từ khoảng cách ngắn nhất: reset thẳng về 1 ngày, không nương tay
// (spec: "sai thì reset về 1 ngày").
//
// Pure module: no clock access, no mutation — callers pass "today" in
// and get a brand-new card object back.

import type { ISODate, IntervalIndex, ReviewCard } from './types'
import { addDays } from './dates'

/** Thang khoảng cách ôn (ngày); chỉ số là IntervalIndex trong types.ts. */
export const INTERVALS_DAYS = [1, 3, 7, 14, 30] as const

// Next rung on a correct answer: climb one step, stay at the 30-day cap.
// The cast is safe: idx < 4 guarantees idx + 1 is in 1..4.
function nextIndex(idx: IntervalIndex): IntervalIndex {
  return idx < 4 ? ((idx + 1) as IntervalIndex) : 4
}

/**
 * Khái niệm học xong hôm nay → sinh flashcard vào Hộp ôn tập (spec 2.2).
 * Lần ôn đầu tiên SAU 1 NGÀY, không ôn ngay trong ngày học: ôn khi
 * vừa học xong là "nhớ giả" — phải để trí nhớ nguội qua một đêm thì
 * lần lôi ra đầu tiên mới thật sự củng cố.
 */
export function createCard(conceptId: string, moduleId: string, learnedOn: ISODate): ReviewCard {
  return {
    conceptId,
    moduleId,
    intervalIndex: 0,
    dueDate: addDays(learnedOn, 1),
    lapses: 0,
    createdOn: learnedOn,
    lastReviewedOn: null,
  }
}

/**
 * Ghi kết quả một lượt ôn thẻ:
 * - Đúng → leo bậc: 1 → 3 → 7 → 14 → 30 ngày; đang ở mức 30 mà đúng
 *   thì giữ mức 30 (trần của SM-2 đơn giản hóa, spec 2.2).
 * - Sai  → reset về bậc 0 (ôn lại sau 1 ngày) và lapses + 1. Lapses là
 *   dữ liệu chẩn đoán cho flow engine sau này, không dùng để phạt.
 *
 * Lịch ôn kế tiếp tính từ NGÀY THỰC SỰ ôn (reviewedOn), không phải từ
 * dueDate — người học ôn trễ thì khoảng cách vẫn đo từ lần nhớ lại
 * gần nhất, đúng bản chất spacing.
 *
 * Returns a new card; the input card is never mutated.
 */
export function reviewCard(card: ReviewCard, correct: boolean, reviewedOn: ISODate): ReviewCard {
  const intervalIndex = correct ? nextIndex(card.intervalIndex) : 0
  return {
    ...card,
    intervalIndex,
    dueDate: addDays(reviewedOn, INTERVALS_DAYS[intervalIndex]),
    lapses: correct ? card.lapses : card.lapses + 1,
    lastReviewedOn: reviewedOn,
  }
}
