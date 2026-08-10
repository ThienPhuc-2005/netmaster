import { describe, expect, it } from 'vitest'
import { cardFreshness, daysUntilDue, fadingCards, memoryByModule, memoryOverview } from './freshness'
import { createCard, reviewCard } from './sm2'
import type { ReviewCard } from './types'

/** Thẻ ở bậc 30 ngày, ôn lần cuối vào ngày cho trước. */
function longCard(id: string, lastReviewedOn: string, moduleId = 'module-1'): ReviewCard {
  let card = createCard(id, moduleId, '2026-01-01')
  for (let i = 0; i < 5; i += 1) card = reviewCard(card, true, lastReviewedOn)
  return card
}

describe('cardFreshness — phần quãng nghỉ còn lại', () => {
  it('vừa ôn xong là tươi nguyên', () => {
    expect(cardFreshness(longCard('a', '2026-03-01'), '2026-03-01')).toBe(1)
  })

  it('đi được nửa quãng thì tươi một nửa', () => {
    // Bậc 30 ngày, đã qua 15 ngày.
    expect(cardFreshness(longCard('a', '2026-03-01'), '2026-03-16')).toBeCloseTo(0.5, 5)
  })

  it('tới hạn là 0, và quá hạn KHÔNG có số âm', () => {
    const card = longCard('a', '2026-03-01')
    expect(cardFreshness(card, '2026-03-31')).toBe(0)
    expect(cardFreshness(card, '2026-06-30')).toBe(0)
  })

  it('thẻ mới chưa ôn lần nào lấy mốc từ ngày sinh ra', () => {
    const card = createCard('a', 'module-1', '2026-03-01') // hạn 02/03, bậc 1 ngày
    expect(cardFreshness(card, '2026-03-01')).toBe(1)
    expect(cardFreshness(card, '2026-03-02')).toBe(0)
    expect(daysUntilDue(card, '2026-03-01')).toBe(1)
  })

  it('nhìn từ QUÁ KHỨ (đồng hồ máy lùi) vẫn là tươi nguyên, không quá 1', () => {
    expect(cardFreshness(longCard('a', '2026-03-10'), '2026-03-05')).toBe(1)
  })
})

describe('fadingCards — thẻ đang mờ nhưng chưa tới lượt', () => {
  it('bắt thẻ còn dưới một phần tư quãng nghỉ', () => {
    const card = longCard('a', '2026-03-01') // hạn 31/03
    // Còn 6/30 ngày = tươi 0.2 → đang mờ.
    expect(fadingCards([card], '2026-03-25').map((c) => c.conceptId)).toEqual(['a'])
    // Còn 20/30 ngày = tươi 0.67 → vẫn tươi.
    expect(fadingCards([card], '2026-03-11')).toEqual([])
  })

  it('KHÔNG đếm thẻ đã đến hạn — thẻ đó đã có đường đi riêng', () => {
    // Đếm cả hai chỗ thì một thẻ hiện hai lần trên cùng màn hình.
    const card = longCard('a', '2026-03-01')
    expect(fadingCards([card], '2026-03-31')).toEqual([])
  })
})

describe('memoryOverview — bức tranh cả hộp', () => {
  it('chia đủ ba nhóm và không bỏ sót thẻ nào', () => {
    const cards = [
      longCard('due', '2026-02-01'), // quá hạn
      longCard('fading', '2026-03-01'), // hạn 31/03
      longCard('fresh', '2026-03-20'),
    ]
    const view = memoryOverview(cards, '2026-03-26')
    expect(view).toMatchObject({ due: 1, fading: 1, fresh: 1, total: 3 })
    expect(view.due + view.fading + view.fresh).toBe(view.total)
    expect(view.averageFreshness).toBeGreaterThan(0)
  })

  it('hộp rỗng thì không có độ tươi trung bình (không phải 0 — 0 là "quên hết")', () => {
    expect(memoryOverview([], '2026-03-01')).toMatchObject({ total: 0, averageFreshness: null })
  })
})

describe('memoryByModule — bản đồ trí nhớ theo module', () => {
  it('gom theo module và giữ THỨ TỰ LỘ TRÌNH, không xếp theo độ tươi', () => {
    const cards = [
      longCard('a', '2026-03-20', 'module-3'),
      longCard('b', '2026-03-01', 'module-1'),
      longCard('c', '2026-03-01', 'module-1'),
    ]
    const rows = memoryByModule(cards, '2026-03-26', ['module-1', 'module-2', 'module-3'])
    expect(rows.map((r) => r.moduleId)).toEqual(['module-1', 'module-3'])
    expect(rows[0]!.cards).toBe(2)
    expect(rows[0]!.freshness).toBeLessThan(rows[1]!.freshness)
  })

  it('module lạ (nội dung đổi sau khi thẻ đã sinh) vẫn có mặt, xếp cuối', () => {
    const rows = memoryByModule([longCard('a', '2026-03-01', 'module-cu')], '2026-03-02', ['module-1'])
    expect(rows.map((r) => r.moduleId)).toEqual(['module-cu'])
  })
})
