import { describe, expect, it } from 'vitest'
import type { AnswerRecord } from './types'
import { HISTORY_CAP, accuracyPct, pushAnswer } from './answerHistory'

describe('pushAnswer', () => {
  it('push 12 bản ghi → giữ đúng 10 bản MỚI nhất, đúng thứ tự thời gian', () => {
    let h: AnswerRecord[] = []
    for (let i = 1; i <= 12; i++) {
      h = pushAnswer(h, i % 2 === 0, i * 1000)
    }
    expect(h).toHaveLength(HISTORY_CAP)
    // 2 bản cũ nhất (at 1000, 2000) bị trượt ra khỏi cửa sổ.
    expect(h.map((r) => r.at)).toEqual([3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000])
    expect(h[0]).toEqual({ correct: false, at: 3000 })
    expect(h[9]).toEqual({ correct: true, at: 12000 })
  })

  it('dưới cap thì giữ nguyên tất cả, đúng thứ tự', () => {
    let h: AnswerRecord[] = []
    h = pushAnswer(h, true, 1)
    h = pushAnswer(h, false, 2)
    expect(h).toEqual([
      { correct: true, at: 1 },
      { correct: false, at: 2 },
    ])
  })

  it('hàm thuần: không mutate mảng đầu vào', () => {
    // Frozen input throws on any mutation attempt under strict mode.
    const original = Object.freeze([{ correct: true, at: 1 }]) as AnswerRecord[]
    const next = pushAnswer(original, false, 2)
    expect(original).toHaveLength(1)
    expect(next).toHaveLength(2)
    expect(next).not.toBe(original)
  })

  it('đầu vào đã dài quá cap (dữ liệu hỏng) vẫn bị cắt về đúng cap', () => {
    const oversized: AnswerRecord[] = Array.from({ length: 15 }, (_, i) => ({ correct: true, at: i }))
    const h = pushAnswer(oversized, false, 99)
    expect(h).toHaveLength(HISTORY_CAP)
    expect(h[HISTORY_CAP - 1]).toEqual({ correct: false, at: 99 })
  })
})

describe('accuracyPct', () => {
  it('lịch sử rỗng → null ("chưa có dữ liệu" khác "0% đúng")', () => {
    expect(accuracyPct([])).toBeNull()
  })

  it('7/10 đúng → 70', () => {
    const h: AnswerRecord[] = Array.from({ length: 10 }, (_, i) => ({ correct: i < 7, at: i }))
    expect(accuracyPct(h)).toBe(70)
  })

  it('tất cả đúng → 100, tất cả sai → 0', () => {
    expect(accuracyPct([{ correct: true, at: 1 }])).toBe(100)
    expect(accuracyPct([{ correct: false, at: 1 }])).toBe(0)
  })

  it('cửa sổ chưa đầy vẫn tính trên số câu hiện có (2/3)', () => {
    const h: AnswerRecord[] = [
      { correct: true, at: 1 },
      { correct: true, at: 2 },
      { correct: false, at: 3 },
    ]
    expect(accuracyPct(h)).toBeCloseTo(66.667, 3)
  })
})
