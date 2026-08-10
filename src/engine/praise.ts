// Khen ĐÚNG VIỆC (kho ý tưởng D1) — chọn lời khen theo HÀNH VI vừa xảy
// ra, thay cho một chữ "Chuẩn luôn!" lặp lại suốt 21 module.
//
// Vì sao đáng làm: lời khen lặp mãi thì hết nghĩa, và tệ hơn, nó khen
// KẾT QUẢ ("đúng rồi") — thứ người học không điều khiển được. Khen HÀNH
// VI thì khen đúng thứ họ chọn làm: tự tra bảng trước khi đoán, sai rồi
// tự sửa, đọc lời giải xong quay lại tự gõ. Đó là những nếp còn dùng
// được sau khi kiến thức cụ thể đã quên.
//
// KHÔNG phá nguyên tắc 5 (XP/streak chỉ từ retrieval và lab): file này
// chỉ chọn CHỮ, không cộng một điểm nào. Nó cũng không đổi thang 3 tầng —
// thang đó lo lúc CHƯA đúng, đây lo lúc ĐÃ đúng.
//
// Technical contract: thuần TS, tất định (không random, không đồng hồ).
// Biến thiên đến từ `seed` bơm từ ngoài — store có sẵn `answerTotal` đơn
// điệu tăng, nên hai câu liền nhau không bao giờ nhận cùng một câu khen.

import type { Question } from './contentSchema'

/**
 * Ngữ cảnh khen — mỗi mã là một HÀNH VI quan sát được, không phải một
 * mức điểm. Thứ tự khai ở đây cũng là thứ tự ưu tiên khi nhiều mã cùng
 * đúng (xem `praiseContext`).
 */
export type PraiseContext =
  | 'after-solution'
  | 'self-corrected'
  | 'hands-lab'
  | 'hands-cli'
  | 'hands-ps'
  | 'hands-palace'
  | 'hands-clinic'
  | 'retrieval'
  | 'first-try'

/** Số câu khen của từng ngữ cảnh — i18n phải có đủ chừng này (test khóa). */
export const PRAISE_VARIANTS: Record<PraiseContext, number> = {
  'after-solution': 3,
  'self-corrected': 3,
  'hands-lab': 3,
  'hands-cli': 3,
  'hands-ps': 3,
  'hands-palace': 3,
  'hands-clinic': 3,
  retrieval: 3,
  'first-try': 4,
}

/** Dấu vết của một câu VỪA LÀM ĐÚNG — đủ để đọc ra hành vi đằng sau nó. */
export interface PraiseSignal {
  /** Số lần trả lời chưa đúng trước khi ra đáp án. */
  failCount: number
  /** Đã mở tới lời giải (tầng 3) rồi mới tự gõ lại. */
  usedSolution: boolean
  /** Câu nằm ở bước nào — "nhớ lại" là nhớ khi bài đã đóng. */
  step: 'practice' | 'retrieval'
  kind: Question['kind']
}

/** Câu dạng tay chân → ngữ cảnh khen riêng của nghề đó. */
const HANDS_ON: Partial<Record<Question['kind'], PraiseContext>> = {
  lab: 'hands-lab',
  cli: 'hands-cli',
  ps: 'hands-ps',
  'palace-walk': 'hands-palace',
  clinic: 'hands-clinic',
}

/**
 * Hành vi đáng khen nhất trong một lượt trả lời đúng.
 *
 * Thứ tự ưu tiên có chủ đích: hai nếp KHÓ nhất đứng trước (đọc lời giải
 * rồi tự gõ lại — generation effect; sai rồi tự sửa mà không cần lời
 * giải), rồi tới nếp tay chân của nghề, rồi mới tới "đúng ngay". Đúng
 * ngay là chuyện hay nhưng nó nói về thứ người học VỐN ĐÃ BIẾT; ba mã
 * trước nói về thứ họ vừa làm được.
 */
export function praiseContext(signal: PraiseSignal): PraiseContext {
  if (!Number.isInteger(signal.failCount) || signal.failCount < 0) {
    throw new Error(`praiseContext: failCount must be a non-negative integer, got ${signal.failCount}`)
  }
  if (signal.usedSolution) return 'after-solution'
  if (signal.failCount >= 1) return 'self-corrected'
  const hands = HANDS_ON[signal.kind]
  if (hands !== undefined) return hands
  if (signal.step === 'retrieval') return 'retrieval'
  return 'first-try'
}

/**
 * Key i18n của câu khen: `praise.<ngữ cảnh>.<số thứ tự>`.
 *
 * `seed` là một số đơn điệu tăng bất kỳ (store dùng `answerTotal`) — cùng
 * ngữ cảnh nhưng khác lượt thì khác câu, mà vẫn TẤT ĐỊNH nên test đọc
 * được. Seed âm hoặc lẻ đôi vẫn phải ra key hợp lệ: người học không bao
 * giờ được thấy một key trần vì lỗi số học.
 */
export function praiseKey(context: PraiseContext, seed: number): string {
  const total = PRAISE_VARIANTS[context]
  const index = Number.isFinite(seed) ? Math.abs(Math.trunc(seed)) % total : 0
  return `praise.${context}.${index}`
}

/** Đường tắt dùng ở UI: từ dấu vết ra thẳng key. */
export function praiseKeyFor(signal: PraiseSignal, seed: number): string {
  return praiseKey(praiseContext(signal), seed)
}
