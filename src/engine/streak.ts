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

/**
 * Số lượt đóng băng NGƯỜI HỌC THẬT SỰ CÓ vào hôm nay (phát hiện K2,
 * khối 21.46).
 *
 * `state.freezesLeft` là con số của THÁNG ĐÃ GHI (`freezeMonth`) —
 * `recordQualifyingActivity` chỉ hồi quỹ khi người học làm được việc gì
 * đó. Nghĩa là ai vắng mặt qua tháng sẽ mở Hồ sơ ra và thấy con số của
 * tháng cũ, thường là 0, ngay dưới dòng "mỗi tháng bạn có 2 lượt".
 * Người vừa quay lại sau kỳ nghỉ dài là đúng người cần biết mình còn
 * lưới đỡ nào nhất, mà lại là người bị nói sai.
 *
 * Hàm này THUẦN và chỉ để ĐỌC: đọc hồ sơ không được phép ghi state (một
 * lần mở Hồ sơ mà tự hồi quỹ là XP/streak đổi vì việc xem, phá nguyên
 * tắc 5). Đường ghi vẫn nằm nguyên trong `recordQualifyingActivity`.
 */
export function freezesAvailable(state: StreakState, today: ISODate): number {
  return monthOf(today) === state.freezeMonth ? state.freezesLeft : FREEZES_PER_MONTH
}

/**
 * Vắng bao nhiêu ngày rồi (phát hiện K3, khối 21.46).
 *
 * `null` khi chưa từng học buổi nào — người mới tinh không phải là người
 * "vắng mặt", và chào họ bằng câu "lâu rồi không gặp" là chào nhầm.
 */
export function soNgayVang(state: StreakState, today: ISODate): number | null {
  const last = state.lastActiveDate
  if (last === null) return null
  const gap = diffDays(last, today)
  return gap > 0 ? gap : 0
}

/**
 * Vắng bao lâu thì app nên NÓI RA một câu.
 *
 * 14 ngày: dưới mốc này thì quỹ đóng băng và nhịp ôn tự lo được, nói ra
 * chỉ thành lời trách. Trên mốc này thì lịch ôn đã lệch hẳn, hộp thẻ
 * chất đống, và im lặng giả vờ như không có gì xảy ra mới là thứ khiến
 * người ta đóng app lần nữa.
 */
export const VANG_LAU_NGAY = 14

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
