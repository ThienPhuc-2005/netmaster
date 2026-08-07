import { describe, expect, it } from 'vitest'
import type { Module } from './contentSchema'
import { XP_AMOUNTS, moduleProgressPct, moduleXpTotal, xpFor } from './xp'

describe('xpFor', () => {
  it('trả đúng bảng XP cho từng nguồn hợp lệ', () => {
    expect(xpFor('retrieval')).toBe(20)
    expect(xpFor('practice')).toBe(10)
    expect(xpFor('reviewCardCorrect')).toBe(2)
    expect(xpFor('drillProblemCorrect')).toBe(3)
    expect(xpFor('clinicCaseSolved')).toBe(10)
  })

  it('chỉ tồn tại đúng 5 nguồn XP — không có đường cộng XP cho việc đọc/xem (nguyên tắc 5)', () => {
    // Cả 5 nguồn đều là retrieval hoặc lab: bước Nhớ lại, bước Làm, thẻ
    // ôn đúng, bài drill đúng, và CHỮA KHỎI một ca phòng khám (lab).
    // Đọc/xem/hook/pretest/summary vẫn không có mặt.
    expect(Object.keys(XP_AMOUNTS).sort()).toEqual([
      'clinicCaseSolved',
      'drillProblemCorrect',
      'practice',
      'retrieval',
      'reviewCardCorrect',
    ])
  })
})

describe('moduleProgressPct — endowed progress (spec 2.4)', () => {
  it('0 XP → 15 (thanh không bao giờ bắt đầu ở 0)', () => {
    expect(moduleProgressPct(0, 120)).toBe(15)
  })

  it('một nửa XP → 57.5', () => {
    expect(moduleProgressPct(60, 120)).toBe(57.5)
  })

  it('đủ XP → 100', () => {
    expect(moduleProgressPct(120, 120)).toBe(100)
  })

  it('total 0 → 15', () => {
    expect(moduleProgressPct(0, 0)).toBe(15)
  })

  it('total âm (dữ liệu hỏng) → 15', () => {
    expect(moduleProgressPct(50, -10)).toBe(15)
  })

  it('earned vượt total → kẹp ở 100, không vượt', () => {
    expect(moduleProgressPct(999, 120)).toBe(100)
  })

  it('earned âm (dữ liệu hỏng) → không tụt dưới 15', () => {
    expect(moduleProgressPct(-40, 120)).toBe(15)
  })
})

describe('moduleXpTotal', () => {
  it('module 4 bài → 4 × (20 + 10) = 120', () => {
    // Minimal shape: only lessons.length is read; local cast is allowed.
    const mod = { lessons: [{}, {}, {}, {}] } as unknown as Module
    expect(moduleXpTotal(mod)).toBe(120)
  })

  it('module 1 bài → 30', () => {
    const mod = { lessons: [{}] } as unknown as Module
    expect(moduleXpTotal(mod)).toBe(30)
  })
})
