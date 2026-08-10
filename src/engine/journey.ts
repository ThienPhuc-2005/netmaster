// "Về đích sau X ngày" (kho ý tưởng H2) — độ dài CHUYẾN ĐI của người
// học, suy từ ngày hoàn thành các bài (`completedLessons`), không thêm
// một byte persist nào.
//
// Vì sao con số này đáng in ra ở màn tốt nghiệp: XP và số module nói về
// KHỐI LƯỢNG, còn "bốn mươi ba ngày" nói về ĐỜI SỐNG — nó gắn khóa học
// vào một quãng thời gian có thật của người học, thứ mà điểm số không
// làm được. Hai con số cạnh nhau còn nói thêm một điều tử tế: 43 ngày
// nhưng chỉ 19 ngày thật sự ngồi học, tức là nghỉ quãng giữa vẫn về
// tới đích — đúng tinh thần giãn cách của SM-2, không phải lỗi của ai.
//
// Technical contract: thuần TS, tất định, không đọc đồng hồ (ngày do
// store ghi lúc học). Ngày ISO so sánh bằng chuỗi được, nhưng khoảng
// cách thì đi qua `diffDays` để chuyện tháng/năm không phải tự tính.

import { diffDays } from './dates'
import type { ISODate } from './types'

export interface JourneySpan {
  /** Ngày hoàn thành bài học ĐẦU TIÊN. */
  firstDay: ISODate
  /** Ngày hoàn thành bài học GẦN NHẤT. */
  lastDay: ISODate
  /**
   * Số ngày từ bài đầu tới bài cuối, TÍNH CẢ hai đầu — học gọn trong một
   * ngày là "1 ngày", không phải "0 ngày".
   */
  days: number
  /** Số ngày KHÁC NHAU có ít nhất một bài học xong. */
  activeDays: number
}

/**
 * Chuyến đi của người học, hoặc null khi chưa xong bài nào.
 *
 * Chỉ đọc `completedLessons` (bài xong LẦN ĐẦU) — cố ý không đếm ngày
 * ôn tập hay ngày thi: câu chuyện muốn kể là "từ bài đầu tiên tới bài
 * cuối cùng", mà thẻ ôn thì còn ghé thăm mãi sau khi khóa đã khép.
 */
export function journeySpan(completedLessons: Readonly<Record<string, ISODate>>): JourneySpan | null {
  const dates = Object.values(completedLessons)
  if (dates.length === 0) return null
  const sorted = [...dates].sort()
  const firstDay = sorted[0]!
  const lastDay = sorted[sorted.length - 1]!
  return {
    firstDay,
    lastDay,
    days: diffDays(firstDay, lastDay) + 1,
    activeDays: new Set(dates).size,
  }
}
