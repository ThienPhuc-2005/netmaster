import { describe, expect, it } from 'vitest'
import type { ModuleProgress } from './types'
import {
  MASTERY_THRESHOLD_PCT,
  applyTestResult,
  computeModuleStatuses,
  evaluateModuleTest,
  ganNguong,
} from './masteryGate'

/** Build a results array with `correct` trues followed by `wrong` falses. */
function results(correct: number, wrong: number): boolean[] {
  return [...new Array<boolean>(correct).fill(true), ...new Array<boolean>(wrong).fill(false)]
}

function progress(overrides: Partial<ModuleProgress> = {}): ModuleProgress {
  return { moduleId: 'm1', status: 'open', bestScorePct: null, xpEarned: 0, ...overrides }
}

describe('evaluateModuleTest', () => {
  it('17/20 = đúng 85% → đạt (biên dưới của ngưỡng)', () => {
    const ev = evaluateModuleTest(results(17, 3))
    expect(ev.correctCount).toBe(17)
    expect(ev.total).toBe(20)
    expect(ev.pct).toBe(85) // exact — no float drift below the gate
    expect(ev.pct).toBe(MASTERY_THRESHOLD_PCT)
    expect(ev.passed).toBe(true)
  })

  it('5/6 ≈ 83.33% → chưa đạt', () => {
    const ev = evaluateModuleTest(results(5, 1))
    expect(ev.pct).toBeCloseTo(83.3333, 3)
    expect(ev.passed).toBe(false)
  })

  it('6/7 ≈ 85.71% → đạt (pct là số thực, không làm tròn trước khi so)', () => {
    const ev = evaluateModuleTest(results(6, 1))
    expect(ev.pct).toBeCloseTo(85.7142, 3)
    expect(ev.passed).toBe(true)
  })

  it('16/19 ≈ 84.21% → chưa đạt (không được làm tròn lên 85)', () => {
    const ev = evaluateModuleTest(results(16, 3))
    expect(ev.pct).toBeCloseTo(84.2105, 3)
    expect(ev.passed).toBe(false)
  })

  it('đúng hết → 100%, sai hết → 0%', () => {
    expect(evaluateModuleTest(results(5, 0))).toEqual({ correctCount: 5, total: 5, pct: 100, passed: true })
    expect(evaluateModuleTest(results(0, 5))).toEqual({ correctCount: 0, total: 5, pct: 0, passed: false })
  })

  it('đếm đúng khi kết quả trộn lẫn thứ tự', () => {
    const ev = evaluateModuleTest([true, false, true, true, false, true])
    expect(ev.correctCount).toBe(4)
    expect(ev.total).toBe(6)
  })

  it('results rỗng → ném lỗi (lỗi lập trình)', () => {
    expect(() => evaluateModuleTest([])).toThrow(/empty/)
  })
})

describe('applyTestResult', () => {
  it('lần thi đầu: đặt bestScorePct từ null, chưa đạt thì status giữ nguyên', () => {
    const next = applyTestResult(progress(), 80)
    expect(next.bestScorePct).toBe(80)
    expect(next.status).toBe('open')
  })

  it('đạt ngưỡng đúng 85 → chuyển passed', () => {
    const next = applyTestResult(progress({ bestScorePct: 60 }), 85)
    expect(next.status).toBe('passed')
    expect(next.bestScorePct).toBe(85)
  })

  it('giữ điểm cao nhất: thi lại thấp hơn không kéo best xuống', () => {
    const next = applyTestResult(progress({ bestScorePct: 90, status: 'passed' }), 70)
    expect(next.bestScorePct).toBe(90)
  })

  it('ĐÃ passed thì không bao giờ tụt dù thi lại điểm thấp', () => {
    const next = applyTestResult(progress({ status: 'passed', bestScorePct: 95 }), 10)
    expect(next.status).toBe('passed')
    expect(next.bestScorePct).toBe(95)
  })

  it('điểm 0 hợp lệ: best chuyển từ null sang 0', () => {
    const next = applyTestResult(progress(), 0)
    expect(next.bestScorePct).toBe(0)
    expect(next.status).toBe('open')
  })

  it('thuần: không mutate progress đầu vào, trả object mới', () => {
    const before = progress({ bestScorePct: 50 })
    const next = applyTestResult(before, 90)
    expect(next).not.toBe(before)
    expect(before.bestScorePct).toBe(50)
    expect(before.status).toBe('open')
    expect(next.xpEarned).toBe(before.xpEarned) // các trường khác giữ nguyên
  })

  it('pct không hợp lệ (NaN, âm, > 100) → ném lỗi', () => {
    expect(() => applyTestResult(progress(), Number.NaN)).toThrow(/out of range/)
    expect(() => applyTestResult(progress(), -1)).toThrow(/out of range/)
    expect(() => applyTestResult(progress(), 100.5)).toThrow(/out of range/)
  })

  it('module đang locked → ném lỗi kể cả điểm đạt (không có đường vượt gate qua ghi điểm)', () => {
    expect(() => applyTestResult(progress({ status: 'locked' }), 90)).toThrow(/locked/)
    expect(() => applyTestResult(progress({ status: 'locked' }), 10)).toThrow(/locked/)
  })
})

describe('computeModuleStatuses', () => {
  const order = ['m1', 'm2', 'm3']

  it('danh sách rỗng → object rỗng', () => {
    expect(computeModuleStatuses([], new Set())).toEqual({})
  })

  it('chưa đạt gì: module đầu open, còn lại locked hết', () => {
    expect(computeModuleStatuses(order, new Set())).toEqual({
      m1: 'open',
      m2: 'locked',
      m3: 'locked',
    })
  })

  it('m1 passed → m2 mở, m3 vẫn khóa (mở đúng MỘT bậc, không có skip)', () => {
    expect(computeModuleStatuses(order, new Set(['m1']))).toEqual({
      m1: 'passed',
      m2: 'open',
      m3: 'locked',
    })
  })

  it('m1 + m2 passed → m3 mở', () => {
    expect(computeModuleStatuses(order, new Set(['m1', 'm2']))).toEqual({
      m1: 'passed',
      m2: 'passed',
      m3: 'open',
    })
  })

  it('đạt hết → passed hết', () => {
    expect(computeModuleStatuses(order, new Set(order))).toEqual({
      m1: 'passed',
      m2: 'passed',
      m3: 'passed',
    })
  })

  it('module đầu đã passed vẫn là passed (không quay về open)', () => {
    expect(computeModuleStatuses(['m1'], new Set(['m1']))).toEqual({ m1: 'passed' })
  })

  it('tập passed lệch chuỗi (chỉ m2): áp luật theo từng cặp N-1/N', () => {
    // Trạng thái này không thể phát sinh qua gate (m2 khóa thì không thi
    // được), nhưng hàm vẫn áp đúng luật: m1 chưa đạt → open; m2 nằm trong
    // tập passed → passed; m3 mở vì m2 passed.
    expect(computeModuleStatuses(order, new Set(['m2']))).toEqual({
      m1: 'open',
      m2: 'passed',
      m3: 'open',
    })
  })
})

describe('ganNguong — chọn giọng cho màn trượt (L3)', () => {
  it('0% KHÔNG phải là "gần lắm rồi"', () => {
    // Đúng cảnh đo được trên browser trước khi sửa: sai cả 8 câu mà màn
    // trượt vẫn khen "gần lắm rồi".
    expect(ganNguong(0)).toBe(false)
  })

  it('hụt một hai câu trên đề 8 câu thì tính là gần', () => {
    expect(ganNguong(75), '6/8 câu — hụt hai câu').toBe(true)
    expect(ganNguong(62.5), '5/8 câu — hụt ba câu, chuyện khác hẳn').toBe(false)
  })

  it('đúng mép khoảng gần vẫn tính là gần', () => {
    expect(ganNguong(MASTERY_THRESHOLD_PCT - 15)).toBe(true)
    expect(ganNguong(MASTERY_THRESHOLD_PCT - 15.1)).toBe(false)
  })

  it('điểm đã đậu đương nhiên nằm trong khoảng gần (hàm không tự phán đậu/trượt)', () => {
    expect(ganNguong(MASTERY_THRESHOLD_PCT)).toBe(true)
    expect(ganNguong(100)).toBe(true)
  })
})
