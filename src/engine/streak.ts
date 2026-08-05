// Streak — gamification có đạo đức (spec 2.4).
//
// "Đóng băng" (freeze) hoạt động TỰ ĐỘNG: người học lỡ ngày thì hệ thống
// tự tiêu lượt để bảo toàn chuỗi, không phải bấm gì, không mua bán —
// streak khích lệ sự đều đặn chứ không tạo áp lực độc hại.

import type { ISODate, StreakState } from './types'
import type { XpSource } from './xp'
import { diffDays, isBefore, monthOf } from './dates'

export const FREEZES_PER_MONTH = 2

/**
 * Nguồn hoạt động hợp lệ cho streak — trùng tập nguồn XP (nguyên tắc 5:
 * XP/streak chỉ từ retrieval và lab). Union này tồn tại để ÉP Ở TẦNG KIỂU:
 * một lời gọi từ chỗ "đọc/xem" không có giá trị nào hợp lệ để truyền vào,
 * giống hàng rào XpSource của xpFor.
 */
export type QualifyingSource = XpSource

export function initialStreak(today: ISODate): StreakState {
  return {
    current: 0,
    lastActiveDate: null,
    freezesLeft: FREEZES_PER_MONTH,
    freezeMonth: monthOf(today),
  }
}

/**
 * Ghi nhận MỘT hoạt động hợp lệ trong ngày.
 *
 * Nguyên tắc 5: store CHỈ được gọi hàm này khi người học hoàn thành
 * retrieval hoặc lab trong ngày — mở app, đọc bài, xem animation
 * KHÔNG bao giờ đi qua đây, nên streak không thể cộng từ việc đọc.
 *
 * Trả kèm freezesUsed/reset để UI kể chuyện tử tế ("mình đã giữ chuỗi
 * giúp bạn 1 ngày") thay vì chỉ đổi con số trong im lặng.
 */
export function recordQualifyingActivity(
  state: StreakState,
  today: ISODate,
  // Type-fence only (see QualifyingSource) — the value itself is not used:
  // ngày nào có ÍT NHẤT một hoạt động hợp lệ là ngày đó tính, bất kể nguồn.
  _source: QualifyingSource,
): { state: StreakState; freezesUsed: number; reset: boolean } {
  const last = state.lastActiveDate

  // Clock rolled backwards (system date was changed): treat as same-day,
  // change nothing — freezes stay untouched even if the month differs.
  if (last !== null && isBefore(today, last)) {
    return { state: { ...state }, freezesUsed: 0, reset: false }
  }

  // Cùng ngày: idempotent — bao nhiêu retrieval/lab trong ngày cũng chỉ
  // đếm 1 cho chuỗi. (Sau mỗi lần ghi nhận, freezeMonth luôn bằng tháng
  // của lastActiveDate, nên "cùng ngày" không bao giờ kèm đổi tháng —
  // trả về sớm ở đây không bỏ sót lượt hồi đóng băng nào.)
  if (last !== null && diffDays(last, today) === 0) {
    return { state: { ...state }, freezesUsed: 0, reset: false }
  }

  // 1) Sang tháng dương lịch mới → hồi đủ 2 lượt đóng băng miễn phí.
  const month = monthOf(today)
  let freezesLeft = month === state.freezeMonth ? state.freezesLeft : FREEZES_PER_MONTH

  let current: number
  let freezesUsed = 0
  let reset = false

  if (last === null) {
    // Hoạt động hợp lệ đầu tiên — chuỗi bắt đầu từ 1.
    current = 1
  } else {
    const gap = diffDays(last, today)
    if (gap === 1) {
      // Hôm sau liền kề — chuỗi nối dài bình thường.
      current = state.current + 1
    } else {
      // Lỡ N = gap - 1 ngày. Đủ lượt đóng băng → tự tiêu N lượt, chuỗi
      // được bảo toàn. Không đủ → reset về 1 và KHÔNG tiêu lượt nào
      // (giữ lượt lại cho lần lỡ ngắn hơn về sau).
      const missed = gap - 1
      if (missed <= freezesLeft) {
        freezesUsed = missed
        freezesLeft -= missed
        current = state.current + 1
      } else {
        reset = true
        current = 1
      }
    }
  }

  return {
    state: { current, lastActiveDate: today, freezesLeft, freezeMonth: month },
    freezesUsed,
    reset,
  }
}
