// Web Audio không tồn tại trong môi trường test node — playEarcon phải
// im lặng tuyệt đối (không ném lỗi) thay vì làm gãy luồng học.

import { describe, expect, it } from 'vitest'
import { playEarcon, type EarconKind } from './earcons'
import { useSettings } from '../store/settings'

const KINDS: EarconKind[] = ['correct', 'incorrect', 'lessonComplete', 'stageUp']

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
