// XP — phần thưởng chỉ gắn với học sâu (spec 2.4, nguyên tắc 5).

import type { Module } from './contentSchema'

/**
 * Nguồn cộng XP hợp lệ. Union này LÀ hàng rào của nguyên tắc 5: XP chỉ
 * từ retrieval và lab. Đọc/xem/hook/pretest/summary KHÔNG có mặt trong
 * union — không tồn tại đường cộng XP cho việc đọc, ngay ở tầng kiểu.
 */
export type XpSource = 'retrieval' | 'practice' | 'reviewCardCorrect' | 'drillProblemCorrect' | 'clinicCaseSolved'

export const XP_AMOUNTS: Record<XpSource, number> = {
  retrieval: 20,          // hoàn thành bước Retrieval của một bài
  practice: 10,           // hoàn thành bước Làm (lab tương tác)
  reviewCardCorrect: 2,   // mỗi thẻ trả lời đúng trong phiên ôn (cũng là retrieval)
  drillProblemCorrect: 3, // mỗi bài đúng trong drill subnetting (lab)
  clinicCaseSolved: 10,   // chữa khỏi một ca ở tab Phòng khám — CHỈ lần đầu mỗi ca (lab)
}

export function xpFor(source: XpSource): number {
  return XP_AMOUNTS[source]
}

/**
 * Endowed progress (spec 2.4): thanh XP module bắt đầu ở 15% ("đã hoàn
 * thành đăng ký bài") — người học không bao giờ thấy thanh 0%. 85 điểm %
 * còn lại tỉ lệ thuận với XP kiếm được. Kết quả luôn trong [15, 100].
 */
export function moduleProgressPct(xpEarned: number, xpTotal: number): number {
  if (xpTotal <= 0) return 15
  if (xpEarned >= xpTotal) return 100
  // Lower clamp: negative earned (corrupt data) must not drop below 15.
  return Math.max(15, 15 + 85 * (xpEarned / xpTotal))
}

/**
 * Tổng XP tối đa của phần bài học trong module: mỗi bài đóng góp đúng
 * một lượt Làm (practice) + một lượt Retrieval. XP thẻ ôn và drill là
 * dòng chảy liên tục hằng ngày, không thuộc thanh tiến độ module.
 */
export function moduleXpTotal(mod: Module): number {
  return mod.lessons.length * (XP_AMOUNTS.retrieval + XP_AMOUNTS.practice)
}
