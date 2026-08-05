import { describe, expect, it } from 'vitest'
import type { ReviewCard } from './types'
import { INTERVALS_DAYS, createCard, reviewCard } from './sm2'

// Helper: build a card at an arbitrary state without walking the whole
// review chain first.
function cardAt(over: Partial<ReviewCard>): ReviewCard {
  return {
    conceptId: 'ip-address',
    moduleId: 'module-1',
    intervalIndex: 0,
    dueDate: '2026-08-05',
    lapses: 0,
    createdOn: '2026-08-04',
    lastReviewedOn: null,
    ...over,
  }
}

describe('INTERVALS_DAYS', () => {
  it('đúng thang 1 → 3 → 7 → 14 → 30 của spec 2.2', () => {
    expect(INTERVALS_DAYS).toEqual([1, 3, 7, 14, 30])
  })
})

describe('createCard', () => {
  it('tạo thẻ đúng mọi trường; lần ôn đầu sau đúng 1 ngày', () => {
    expect(createCard('subnet-mask', 'module-3', '2026-08-04')).toEqual({
      conceptId: 'subnet-mask',
      moduleId: 'module-3',
      intervalIndex: 0,
      dueDate: '2026-08-05',
      lapses: 0,
      createdOn: '2026-08-04',
      lastReviewedOn: null,
    })
  })
})

describe('reviewCard — chuỗi toàn đúng', () => {
  it('leo thang 1 → 3 → 7 → 14 → 30 ngày, dueDate tính từ ngày ôn', () => {
    let card = createCard('c', 'm', '2026-01-01')

    card = reviewCard(card, true, '2026-01-02')
    expect(card.intervalIndex).toBe(1)
    expect(card.dueDate).toBe('2026-01-05') // +3

    card = reviewCard(card, true, '2026-01-05')
    expect(card.intervalIndex).toBe(2)
    expect(card.dueDate).toBe('2026-01-12') // +7

    card = reviewCard(card, true, '2026-01-12')
    expect(card.intervalIndex).toBe(3)
    expect(card.dueDate).toBe('2026-01-26') // +14

    card = reviewCard(card, true, '2026-01-26')
    expect(card.intervalIndex).toBe(4)
    expect(card.dueDate).toBe('2026-02-25') // +30, vượt biên tháng

    expect(card.lapses).toBe(0)
    expect(card.lastReviewedOn).toBe('2026-01-26')
  })

  it('đang ở mức 30 mà đúng tiếp → vẫn giữ mức 30', () => {
    const maxed = cardAt({ intervalIndex: 4, dueDate: '2026-03-01', lastReviewedOn: '2026-01-30' })
    const next = reviewCard(maxed, true, '2026-03-01')
    expect(next.intervalIndex).toBe(4)
    expect(next.dueDate).toBe('2026-03-31') // +30, không leo thêm
  })

  it('dueDate vượt biên NĂM tính đúng', () => {
    const card = cardAt({ intervalIndex: 4, dueDate: '2026-12-15' })
    const next = reviewCard(card, true, '2026-12-15')
    expect(next.dueDate).toBe('2027-01-14') // +30 sang năm mới
  })
})

describe('reviewCard — trả lời sai', () => {
  it('sai ở MỌI mức → về 1 ngày, lapses + 1, lastReviewedOn cập nhật', () => {
    for (const idx of [0, 1, 2, 3, 4] as const) {
      const card = cardAt({ intervalIndex: idx, dueDate: '2026-05-10', lapses: 2 })
      const next = reviewCard(card, false, '2026-05-10')
      expect(next.intervalIndex).toBe(0)
      expect(next.dueDate).toBe('2026-05-11')
      expect(next.lapses).toBe(3)
      expect(next.lastReviewedOn).toBe('2026-05-10')
    }
  })

  it('sau khi sai, đúng lại → leo lại từ đầu thang (bậc kế tiếp là 3 ngày)', () => {
    const card = cardAt({ intervalIndex: 3, dueDate: '2026-05-10', lastReviewedOn: '2026-04-26' })
    const lapsed = reviewCard(card, false, '2026-05-10')
    expect(lapsed.intervalIndex).toBe(0)

    const recovered = reviewCard(lapsed, true, '2026-05-11')
    expect(recovered.intervalIndex).toBe(1)
    expect(recovered.dueDate).toBe('2026-05-14') // +3, không nhảy về mức cũ
    expect(recovered.lapses).toBe(1) // đúng không xóa lịch sử lapse
  })

  it('trả lời đúng không làm tăng lapses', () => {
    const card = cardAt({ lapses: 5 })
    expect(reviewCard(card, true, '2026-08-05').lapses).toBe(5)
  })
})

describe('reviewCard — tính thuần', () => {
  it('không mutate thẻ đầu vào, trả về object mới', () => {
    const card = createCard('c', 'm', '2026-08-04')
    // ReviewCard is flat, so a shallow snapshot is a full snapshot.
    const frozen = { ...card }

    const next = reviewCard(card, true, '2026-08-05')
    reviewCard(card, false, '2026-08-05')

    expect(card).toEqual(frozen)
    expect(next).not.toBe(card)
    expect(next.conceptId).toBe('c') // identity fields carried over
    expect(next.moduleId).toBe('m')
    expect(next.createdOn).toBe('2026-08-04')
  })
})
