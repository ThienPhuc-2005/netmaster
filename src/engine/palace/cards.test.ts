import { describe, expect, it } from 'vitest'
import { roomCountOf, tourRoute } from './palace'
import {
  PALACE_CARD_PREFIX,
  isPalaceCardId,
  palaceCardId,
  palaceReviewCards,
  roomForCard,
  roomIdFromCardId,
} from './cards'
import { buildReviewSession, dueCards } from '../reviewQueue'
import { reviewCard } from '../sm2'
import { PORT_PALACE } from '../../../tests/fixtures/palaceFixture'

const ROOM_COUNT = roomCountOf(PORT_PALACE)

const TODAY = '2026-08-06'

describe('khóa thẻ cung điện', () => {
  it('mang tiền tố nên phân biệt được với thẻ khái niệm', () => {
    const id = palaceCardId('r-https')
    expect(id).toBe(`${PALACE_CARD_PREFIX}r-https`)
    expect(isPalaceCardId(id)).toBe(true)
    expect(isPalaceCardId('m1-goi-tin')).toBe(false)
  })

  it('lấy ngược ra được phòng', () => {
    expect(roomIdFromCardId(palaceCardId('r-dns'))).toBe('r-dns')
    expect(roomIdFromCardId('m1-goi-tin')).toBeNull()
    expect(roomForCard(PORT_PALACE, palaceCardId('r-dns'))?.keys).toEqual(['53'])
    expect(roomForCard(PORT_PALACE, 'm1-goi-tin')).toBeNull()
  })
})

describe('sinh thẻ ôn cho cả tòa nhà', () => {
  it('15 phòng thành 15 thẻ riêng, theo thứ tự lộ trình', () => {
    const cards = palaceReviewCards(PORT_PALACE, 'm5', TODAY)
    expect(cards).toHaveLength(ROOM_COUNT)
    expect(cards.map((c) => c.conceptId)).toEqual(tourRoute(PORT_PALACE).map((r) => palaceCardId(r.id)))
  })

  it('thẻ mới đúng lịch SM-2 khởi điểm: ôn lại sau 1 ngày', () => {
    const [first] = palaceReviewCards(PORT_PALACE, 'm5', TODAY)
    expect(first).toMatchObject({
      moduleId: 'm5',
      intervalIndex: 0,
      dueDate: '2026-08-07',
      lapses: 0,
      createdOn: TODAY,
      lastReviewedOn: null,
    })
  })

  it('phòng đã có thẻ thì giữ nguyên lịch, không bị đặt lại về 1 ngày', () => {
    const already = [palaceCardId('r-http'), palaceCardId('r-https')]
    const cards = palaceReviewCards(PORT_PALACE, 'm5', TODAY, already)
    expect(cards).toHaveLength(ROOM_COUNT - 2)
    expect(cards.map((c) => c.conceptId)).not.toContain(already[0])
  })
})

describe('thẻ cung điện sống chung với hộp ôn tập có sẵn', () => {
  it('vào đúng hàng đợi đến hạn như mọi thẻ khác', () => {
    const cards = palaceReviewCards(PORT_PALACE, 'm5', TODAY)
    expect(dueCards(cards, TODAY)).toHaveLength(0)
    expect(dueCards(cards, '2026-08-07')).toHaveLength(ROOM_COUNT)
  })

  it('phiên ôn vẫn cắt còn 15 thẻ và trộn xen kẽ được với module khác', () => {
    const palaceCards = palaceReviewCards(PORT_PALACE, 'm5', TODAY)
    const conceptCard = {
      conceptId: 'm1-goi-tin',
      moduleId: 'm1',
      intervalIndex: 0 as const,
      dueDate: '2026-08-07',
      lapses: 0,
      createdOn: TODAY,
      lastReviewedOn: null,
    }
    const session = buildReviewSession([...palaceCards, conceptCard], '2026-08-07')
    expect(session).toHaveLength(15)
    // Thẻ của module khác không bị dồn xuống cuối: trộn xen kẽ đưa nó lên sớm.
    expect(session.findIndex((c) => c.conceptId === 'm1-goi-tin')).toBeLessThan(3)
  })

  it('SM-2 chạy nguyên trên thẻ phòng: nhớ được thì giãn, quên thì về 1 ngày', () => {
    const [card] = palaceReviewCards(PORT_PALACE, 'm5', TODAY)
    const remembered = reviewCard(card!, true, '2026-08-07')
    expect(remembered.intervalIndex).toBe(1)
    const forgotten = reviewCard(remembered, false, '2026-08-10')
    expect(forgotten.intervalIndex).toBe(0)
    expect(forgotten.lapses).toBe(1)
  })
})
