import { describe, expect, it } from 'vitest'
import { TRAIL_STEPS, trailHeat, trailVar } from './trail'

describe('trailHeat — vệt ấm dần (B1)', () => {
  it('ô đầu là nấc nguội nhất, ô cuối là nấc nóng nhất', () => {
    expect(trailHeat(0, 21)).toBe(1)
    expect(trailHeat(20, 21)).toBe(TRAIL_STEPS)
  })

  it('không bao giờ tụt xuống khi đi tới — ấm DẦN, không nhấp nhô', () => {
    let prev = 0
    for (let i = 0; i < 21; i += 1) {
      const heat = trailHeat(i, 21)
      expect(heat).toBeGreaterThanOrEqual(prev)
      prev = heat
    }
  })

  it('nấc lấy theo VỊ TRÍ trong khóa, không theo số ô đã đậu', () => {
    // Cùng ô thứ 3 của khóa 21 chủ đề: dù người học đậu 3 chủ đề hay 18
    // chủ đề, ô đó vẫn cùng một màu — vệt kể quãng đường, không kể đếm.
    expect(trailHeat(2, 21)).toBe(trailHeat(2, 21))
    expect(trailHeat(2, 21)).toBeLessThan(trailHeat(17, 21))
  })

  it('dùng đủ cả 5 nấc trên khóa 21 chủ đề — không nấc nào chết', () => {
    const used = new Set(Array.from({ length: 21 }, (_, i) => trailHeat(i, 21)))
    expect(used.size).toBe(TRAIL_STEPS)
  })

  it('mỗi nấc ôm nhiều ô — không nấc nào chỉ có đúng một ô', () => {
    // Lỗi đã sửa: bản đầu chia theo khoảng-giữa-hai-đầu nên nấc nóng nhất
    // chỉ rơi vào ô số 21, bốn ô cuối trông y hệt nhau.
    const count = new Map<number, number>()
    for (let i = 0; i < 21; i += 1) {
      const heat = trailHeat(i, 21)
      count.set(heat, (count.get(heat) ?? 0) + 1)
    }
    for (const [heat, n] of count) expect(n, `nấc ${heat} chỉ có ${n} ô`).toBeGreaterThanOrEqual(3)
  })

  it('khóa một chủ đề hoặc rỗng thì về nấc 1, không chia cho 0', () => {
    expect(trailHeat(0, 1)).toBe(1)
    expect(trailHeat(0, 0)).toBe(1)
    expect(Number.isNaN(trailHeat(0, 1))).toBe(false)
  })

  it('trailVar trả đúng tên biến CSS đã khai trong tokens.css', () => {
    expect(trailVar(0, 21)).toBe('var(--trail-1)')
    expect(trailVar(20, 21)).toBe('var(--trail-5)')
  })
})
