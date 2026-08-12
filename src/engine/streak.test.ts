import { describe, expect, it } from 'vitest'
import type { StreakState } from './types'
import {
  FREEZES_PER_MONTH,
  freezesAvailable,
  initialStreak,
  recordQualifyingActivity,
  soNgayVang,
  VANG_LAU_NGAY,
} from './streak'

describe('initialStreak', () => {
  it('khởi tạo: chuỗi 0, chưa có ngày hoạt động, đủ 2 lượt đóng băng của tháng', () => {
    expect(initialStreak('2026-07-15')).toEqual({
      current: 0,
      lastActiveDate: null,
      freezesLeft: FREEZES_PER_MONTH,
      freezeMonth: '2026-07',
    })
  })
})

describe('recordQualifyingActivity', () => {
  it('hoạt động hợp lệ đầu tiên → chuỗi = 1', () => {
    const r = recordQualifyingActivity(initialStreak('2026-07-15'), '2026-07-15', 'retrieval')
    expect(r).toEqual({
      state: { current: 1, lastActiveDate: '2026-07-15', freezesLeft: 2, freezeMonth: '2026-07' },
      freezesUsed: 0,
      reset: false,
    })
  })

  it('hai ngày liên tiếp → chuỗi = 2', () => {
    const day1 = recordQualifyingActivity(initialStreak('2026-07-15'), '2026-07-15', 'retrieval').state
    const r = recordQualifyingActivity(day1, '2026-07-16', 'retrieval')
    expect(r.state.current).toBe(2)
    expect(r.state.lastActiveDate).toBe('2026-07-16')
    expect(r.freezesUsed).toBe(0)
    expect(r.reset).toBe(false)
  })

  it('cùng ngày gọi lần 2 → không đổi gì (idempotent trong ngày)', () => {
    const day1 = recordQualifyingActivity(initialStreak('2026-07-15'), '2026-07-15', 'retrieval').state
    const again = recordQualifyingActivity(day1, '2026-07-15', 'retrieval')
    expect(again.state).toEqual(day1)
    expect(again.freezesUsed).toBe(0)
    expect(again.reset).toBe(false)
  })

  it('lỡ 1 ngày, còn 2 freeze → tự tiêu 1, chuỗi tiếp tục', () => {
    const s: StreakState = { current: 5, lastActiveDate: '2026-07-10', freezesLeft: 2, freezeMonth: '2026-07' }
    const r = recordQualifyingActivity(s, '2026-07-12', 'retrieval') // gap 2 → lỡ 1 ngày
    expect(r.state.current).toBe(6)
    expect(r.state.freezesLeft).toBe(1)
    expect(r.freezesUsed).toBe(1)
    expect(r.reset).toBe(false)
  })

  it('lỡ 2 ngày → tiêu cả 2 freeze', () => {
    const s: StreakState = { current: 5, lastActiveDate: '2026-07-10', freezesLeft: 2, freezeMonth: '2026-07' }
    const r = recordQualifyingActivity(s, '2026-07-13', 'retrieval') // gap 3 → lỡ 2 ngày
    expect(r.state.current).toBe(6)
    expect(r.state.freezesLeft).toBe(0)
    expect(r.freezesUsed).toBe(2)
    expect(r.reset).toBe(false)
  })

  it('lỡ 3 ngày với 2 freeze → reset về 1, freeze còn nguyên', () => {
    const s: StreakState = { current: 9, lastActiveDate: '2026-07-10', freezesLeft: 2, freezeMonth: '2026-07' }
    const r = recordQualifyingActivity(s, '2026-07-14', 'retrieval') // gap 4 → lỡ 3 > 2
    expect(r.state.current).toBe(1)
    expect(r.state.freezesLeft).toBe(2) // không tiêu lượt nào khi reset
    expect(r.freezesUsed).toBe(0)
    expect(r.reset).toBe(true)
  })

  it('sang tháng mới freeze hồi về 2: hết freeze tháng 7, sang 2026-08 lỡ 1 ngày vẫn cứu được', () => {
    const s: StreakState = { current: 12, lastActiveDate: '2026-07-31', freezesLeft: 0, freezeMonth: '2026-07' }
    const r = recordQualifyingActivity(s, '2026-08-02', 'retrieval') // gap 2 → lỡ 1; tháng mới hồi 2 lượt
    expect(r.state).toEqual({
      current: 13,
      lastActiveDate: '2026-08-02',
      freezesLeft: 1,
      freezeMonth: '2026-08',
    })
    expect(r.freezesUsed).toBe(1)
    expect(r.reset).toBe(false)
  })

  it('ngày liền kề vắt qua biên tháng → gap = 1, không tiêu freeze, freeze hồi theo tháng mới', () => {
    const s: StreakState = { current: 3, lastActiveDate: '2026-07-31', freezesLeft: 1, freezeMonth: '2026-07' }
    const r = recordQualifyingActivity(s, '2026-08-01', 'retrieval')
    expect(r.state).toEqual({
      current: 4,
      lastActiveDate: '2026-08-01',
      freezesLeft: 2,
      freezeMonth: '2026-08',
    })
    expect(r.freezesUsed).toBe(0)
    expect(r.reset).toBe(false)
  })

  it('gap vắt biên tháng, lỡ nhiều hơn 2 ngày → reset dù freeze vừa được hồi', () => {
    const s: StreakState = { current: 10, lastActiveDate: '2026-07-29', freezesLeft: 0, freezeMonth: '2026-07' }
    const r = recordQualifyingActivity(s, '2026-08-02', 'retrieval') // gap 4 → lỡ 3 > 2 (sau hồi)
    expect(r.state.current).toBe(1)
    expect(r.state.freezesLeft).toBe(2)
    expect(r.state.freezeMonth).toBe('2026-08')
    expect(r.freezesUsed).toBe(0)
    expect(r.reset).toBe(true)
  })

  it('đồng hồ lùi về trước lastActiveDate → coi như cùng ngày, không đổi gì', () => {
    const s: StreakState = { current: 4, lastActiveDate: '2026-08-03', freezesLeft: 1, freezeMonth: '2026-08' }
    const r = recordQualifyingActivity(s, '2026-08-01', 'retrieval')
    expect(r.state).toEqual(s)
    expect(r.freezesUsed).toBe(0)
    expect(r.reset).toBe(false)
  })

  it('đồng hồ lùi về tháng trước → freeze cũng không bị đụng tới', () => {
    const s: StreakState = { current: 4, lastActiveDate: '2026-08-01', freezesLeft: 0, freezeMonth: '2026-08' }
    const r = recordQualifyingActivity(s, '2026-07-25', 'retrieval')
    expect(r.state).toEqual(s)
    expect(r.freezesUsed).toBe(0)
    expect(r.reset).toBe(false)
  })

  it('hàm thuần: không mutate state đầu vào, trả object mới', () => {
    // Frozen input throws on any mutation attempt under strict mode.
    const s: StreakState = Object.freeze({
      current: 1,
      lastActiveDate: '2026-07-15',
      freezesLeft: 2,
      freezeMonth: '2026-07',
    })
    const r = recordQualifyingActivity(s, '2026-07-16', 'retrieval')
    expect(r.state).not.toBe(s)
    expect(s).toEqual({ current: 1, lastActiveDate: '2026-07-15', freezesLeft: 2, freezeMonth: '2026-07' })

    // Nhánh cùng-ngày cũng phải trả object mới, không trả lại tham chiếu cũ.
    const same = recordQualifyingActivity(s, '2026-07-15', 'retrieval')
    expect(same.state).not.toBe(s)
  })
})

// ---------------------------------------------------------------
// Hai câu hỏi mà người VỪA QUAY LẠI cần trả lời đúng (K2 + K3)
// ---------------------------------------------------------------

describe('freezesAvailable — số lượt CỦA HÔM NAY, không phải của tháng đã ghi', () => {
  it('cùng tháng thì lấy đúng số còn lại trong state', () => {
    const s = { current: 3, lastActiveDate: '2026-08-02', freezesLeft: 1, freezeMonth: '2026-08' }
    expect(freezesAvailable(s, '2026-08-12')).toBe(1)
  })

  it('sang tháng mới thì đủ quỹ, dù state còn ghi 0 của tháng cũ', () => {
    // Đúng ca người vắng ba tháng: mở Hồ sơ ra thấy "0 lượt" ngay dưới
    // dòng "mỗi tháng bạn có 2 lượt" — hai dòng cạnh nhau nói ngược nhau.
    const s = { current: 0, lastActiveDate: '2026-05-10', freezesLeft: 0, freezeMonth: '2026-05' }
    expect(freezesAvailable(s, '2026-08-12')).toBe(FREEZES_PER_MONTH)
  })

  it('chỉ ĐỌC — không đụng vào state (đọc hồ sơ không được ghi tiến độ)', () => {
    const s = { current: 0, lastActiveDate: '2026-05-10', freezesLeft: 0, freezeMonth: '2026-05' }
    const truoc = JSON.stringify(s)
    freezesAvailable(s, '2026-08-12')
    expect(JSON.stringify(s)).toBe(truoc)
  })
})

describe('soNgayVang — app nhận ra người vắng lâu', () => {
  it('đếm đúng số ngày từ buổi học gần nhất', () => {
    const s = { current: 0, lastActiveDate: '2026-05-10', freezesLeft: 0, freezeMonth: '2026-05' }
    expect(soNgayVang(s, '2026-08-12')).toBe(94)
  })

  it('học hôm nay rồi thì không còn là người vắng mặt', () => {
    const s = { current: 4, lastActiveDate: '2026-08-12', freezesLeft: 2, freezeMonth: '2026-08' }
    expect(soNgayVang(s, '2026-08-12')).toBe(0)
  })

  it('người MỚI TINH trả về null — chào "lâu rồi không gặp" là chào nhầm', () => {
    expect(soNgayVang(initialStreak('2026-08-12'), '2026-08-12')).toBeNull()
  })

  it('ngưỡng nói ra là 14 ngày: nghỉ một tuần thì im, nghỉ nửa tháng thì nói', () => {
    const s = (last: string) => ({ current: 1, lastActiveDate: last, freezesLeft: 2, freezeMonth: '2026-08' })
    expect(soNgayVang(s('2026-08-05'), '2026-08-12')! >= VANG_LAU_NGAY).toBe(false)
    expect(soNgayVang(s('2026-07-25'), '2026-08-12')! >= VANG_LAU_NGAY).toBe(true)
  })
})
