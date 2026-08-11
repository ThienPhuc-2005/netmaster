// Web Audio không tồn tại trong môi trường test node — playEarcon phải
// im lặng tuyệt đối (không ném lỗi) thay vì làm gãy luồng học.

import { describe, expect, it } from 'vitest'
import { playEarcon, TONES_FOR_TEST, type EarconKind } from './earcons'
import { useSettings } from '../store/settings'

const KINDS: EarconKind[] = ['correct', 'incorrect', 'lessonComplete', 'stageUp', 'moduleComplete']

describe('playEarcon', () => {
  it('không có AudioContext (node) → no-op, không ném lỗi', () => {
    for (const kind of KINDS) expect(() => playEarcon(kind)).not.toThrow()
  })

  it('đã tắt âm trong Settings → no-op', () => {
    useSettings.setState({ soundOn: false })
    for (const kind of KINDS) expect(() => playEarcon(kind)).not.toThrow()
    useSettings.setState({ soundOn: true })
  })
})

// Bốn mốc phải nghe ra bốn thứ khác nhau. Trước khối 21.34 đậu module và
// lên chặng dùng chung một earcon, nên tai không học được thang bậc nào —
// test này chặn việc lặng lẽ gộp lại.
describe('mỗi mốc một tiếng riêng', () => {
  it('không hai earcon nào trùng bộ nốt', () => {
    const vanTay = KINDS.map((k) => JSON.stringify(TONES_FOR_TEST[k]))
    expect(new Set(vanTay).size).toBe(KINDS.length)
  })

  it('đậu module là tiếng DÀI NHẤT và có nốt trầm nhất — nghe ra chỗ đóng lại', () => {
    const ketThuc = (k: EarconKind) => Math.max(...TONES_FOR_TEST[k].map((t) => t.at + t.dur))
    const tramNhat = (k: EarconKind) => Math.min(...TONES_FOR_TEST[k].map((t) => t.freq))
    for (const k of KINDS.filter((x) => x !== 'moduleComplete')) {
      expect(ketThuc('moduleComplete'), `phải dài hơn ${k}`).toBeGreaterThan(ketThuc(k))
      expect(tramNhat('moduleComplete'), `phải trầm hơn ${k}`).toBeLessThan(tramNhat(k))
    }
  })
})
