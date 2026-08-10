import { describe, expect, it } from 'vitest'
import { calibrationSummary, calibrationVerdict, type CalibrationRecord } from './calibration'

describe('calibrationVerdict', () => {
  it('thấy chắc mà không nhớ ra = ảo giác quen mặt', () => {
    expect(calibrationVerdict('sure', false)).toBe('overconfident')
  })

  it('thấy chắc và nhớ ra = khớp', () => {
    expect(calibrationVerdict('sure', true)).toBe('aligned')
  })

  it('nói chịu mà vẫn nhớ ra = tự đánh giá thấp mình', () => {
    expect(calibrationVerdict('blank', true)).toBe('underconfident')
  })

  it('nói chịu và quả thật không nhớ = khớp, không phải lỗi', () => {
    expect(calibrationVerdict('blank', false)).toBe('aligned')
  })

  it('"lơ mơ" luôn khớp — phạt người thành thật là dạy người ta bớt thành thật', () => {
    expect(calibrationVerdict('unsure', true)).toBe('aligned')
    expect(calibrationVerdict('unsure', false)).toBe('aligned')
  })
})

describe('calibrationSummary', () => {
  const records: CalibrationRecord[] = [
    { cardId: 'a', confidence: 'sure', remembered: true },
    { cardId: 'b', confidence: 'sure', remembered: false },
    { cardId: 'c', confidence: 'blank', remembered: true },
    { cardId: 'd', confidence: 'unsure', remembered: false },
  ]

  it('đếm đủ ba nhóm và cộng lại đúng tổng', () => {
    const s = calibrationSummary(records)
    expect(s).toMatchObject({ total: 4, aligned: 2, overconfident: 1, underconfident: 1 })
    expect(s.aligned + s.overconfident + s.underconfident).toBe(s.total)
    expect(s.accuracy).toBe(0.5)
  })

  it('chưa có lượt nào thì KHÔNG có tỉ lệ (không phải 0% — 0% là "sai hết")', () => {
    expect(calibrationSummary([]).accuracy).toBeNull()
  })
})
