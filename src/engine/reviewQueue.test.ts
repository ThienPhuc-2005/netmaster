import { describe, expect, it } from 'vitest'
import type { ReviewCard } from './types'
import {
  OVERDUE_BLOCK_THRESHOLD,
  SESSION_CAP,
  buildReviewSession,
  canStartNewLesson,
  dueCards,
  flashcardAskIndex,
  flashcardTurn,
  interleaveByModule,
  overdueCount,
  cardIdsHopLe,
  locTheConNoiDung,
  theLanh,
  theMoCoi,
} from './reviewQueue'
import { loadModules } from '../content'

const TODAY = '2026-08-04'

function card(over: Partial<ReviewCard> & { conceptId: string }): ReviewCard {
  return {
    moduleId: 'm1',
    intervalIndex: 0,
    dueDate: '2026-08-01',
    lapses: 0,
    createdOn: '2026-07-01',
    lastReviewedOn: null,
    ...over,
  }
}

/** n thẻ quá hạn (due hôm qua), id đánh số để không trùng. */
function overdueCards(n: number): ReviewCard[] {
  return Array.from({ length: n }, (_, i) => card({ conceptId: `od-${i}`, dueDate: '2026-08-03' }))
}

function ids(cards: ReviewCard[]): string[] {
  return cards.map((c) => c.conceptId)
}

function hasAdjacentSameModule(cards: ReviewCard[]): boolean {
  for (let i = 1; i < cards.length; i++) {
    if (cards[i]?.moduleId === cards[i - 1]?.moduleId) return true
  }
  return false
}

describe('dueCards / overdueCount', () => {
  const cards = [
    card({ conceptId: 'past', dueDate: '2026-08-01' }),
    card({ conceptId: 'today', dueDate: '2026-08-04' }),
    card({ conceptId: 'future', dueDate: '2026-08-05' }),
  ]

  it('dueCards lấy thẻ quá khứ VÀ thẻ đến hạn đúng hôm nay, bỏ thẻ tương lai', () => {
    expect(ids(dueCards(cards, TODAY))).toEqual(['past', 'today'])
  })

  it('overdueCount chỉ đếm dueDate < hôm nay — thẻ đến hạn hôm nay KHÔNG tính', () => {
    expect(overdueCount(cards, TODAY)).toBe(1)
  })

  it('mảng rỗng: không thẻ đến hạn, không nợ', () => {
    expect(dueCards([], TODAY)).toEqual([])
    expect(overdueCount([], TODAY)).toBe(0)
  })

  it('dueCards không mutate mảng đầu vào', () => {
    const before = ids(cards)
    dueCards(cards, TODAY)
    expect(ids(cards)).toEqual(before)
  })
})

describe('canStartNewLesson — biên 30/31', () => {
  it('ngưỡng khớp spec', () => {
    expect(OVERDUE_BLOCK_THRESHOLD).toBe(30)
  })

  it('đúng 30 thẻ quá hạn → vẫn được học mới', () => {
    expect(canStartNewLesson(overdueCards(30), TODAY)).toBe(true)
  })

  it('31 thẻ quá hạn → khóa học mới', () => {
    expect(canStartNewLesson(overdueCards(31), TODAY)).toBe(false)
  })

  it('31 thẻ đến hạn HÔM NAY (chưa quá hạn) → không khóa', () => {
    const todayDue = Array.from({ length: 31 }, (_, i) =>
      card({ conceptId: `td-${i}`, dueDate: TODAY }),
    )
    expect(canStartNewLesson(todayDue, TODAY)).toBe(true)
  })
})

describe('buildReviewSession', () => {
  it('cap mặc định 15: 20 thẻ đến hạn → phiên đúng 15 thẻ', () => {
    expect(SESSION_CAP).toBe(15)
    const cards = Array.from({ length: 20 }, (_, i) =>
      card({ conceptId: `c-${String(i).padStart(2, '0')}`, dueDate: '2026-08-01' }),
    )
    expect(buildReviewSession(cards, TODAY)).toHaveLength(15)
  })

  it('nợ lâu nhất được chọn trước khi cắt cap', () => {
    // 20 thẻ, dueDate tăng dần từ 2026-07-01 → 15 thẻ due sớm nhất phải
    // nằm trọn trong phiên, 5 thẻ due muộn nhất bị loại.
    const cards = Array.from({ length: 20 }, (_, i) =>
      card({
        conceptId: `c-${String(i).padStart(2, '0')}`,
        dueDate: `2026-07-${String(i + 1).padStart(2, '0')}`,
      }),
    )
    const session = buildReviewSession(cards, TODAY)
    expect(new Set(ids(session))).toEqual(
      new Set(Array.from({ length: 15 }, (_, i) => `c-${String(i).padStart(2, '0')}`)),
    )
  })

  it('cùng module: phiên xếp đúng thứ tự dueDate tăng dần (không bị interleave xáo)', () => {
    const cards = [
      card({ conceptId: 'b', dueDate: '2026-08-03' }),
      card({ conceptId: 'a', dueDate: '2026-08-01' }),
      card({ conceptId: 'c', dueDate: '2026-08-02' }),
    ]
    expect(ids(buildReviewSession(cards, TODAY))).toEqual(['a', 'c', 'b'])
  })

  it('tie-break: cùng dueDate thì createdOn sớm hơn thắng, rồi tới conceptId', () => {
    const byCreated = [
      card({ conceptId: 'new', dueDate: '2026-08-01', createdOn: '2026-07-20' }),
      card({ conceptId: 'old', dueDate: '2026-08-01', createdOn: '2026-07-05' }),
    ]
    expect(ids(buildReviewSession(byCreated, TODAY, 1))).toEqual(['old'])

    const byConcept = [
      card({ conceptId: 'zeta', dueDate: '2026-08-01', createdOn: '2026-07-05' }),
      card({ conceptId: 'alpha', dueDate: '2026-08-01', createdOn: '2026-07-05' }),
    ]
    expect(ids(buildReviewSession(byConcept, TODAY, 1))).toEqual(['alpha'])
  })

  it('deterministic tuyệt đối: đảo thứ tự input vẫn ra đúng một kết quả', () => {
    const cards = Array.from({ length: 12 }, (_, i) =>
      card({
        conceptId: `c-${String(i).padStart(2, '0')}`,
        moduleId: `m${i % 3}`,
        dueDate: `2026-07-${String((i % 4) + 1).padStart(2, '0')}`,
        createdOn: '2026-06-01',
      }),
    )
    const straight = buildReviewSession(cards, TODAY)
    const reversed = buildReviewSession([...cards].reverse(), TODAY)
    expect(ids(reversed)).toEqual(ids(straight))
  })

  it('chỉ lấy thẻ đến hạn: thẻ tương lai không lọt vào phiên', () => {
    const cards = [
      card({ conceptId: 'due', dueDate: '2026-08-04' }),
      card({ conceptId: 'not-yet', dueDate: '2026-08-06' }),
    ]
    expect(ids(buildReviewSession(cards, TODAY))).toEqual(['due'])
  })

  it('phiên nhiều module được trộn xen kẽ', () => {
    // 4 thẻ mA + 4 thẻ mB cùng dueDate → sau interleave không có 2 thẻ
    // cùng module liền nhau.
    const cards = [
      ...Array.from({ length: 4 }, (_, i) => card({ conceptId: `a${i}`, moduleId: 'mA' })),
      ...Array.from({ length: 4 }, (_, i) => card({ conceptId: `b${i}`, moduleId: 'mB' })),
    ]
    const session = buildReviewSession(cards, TODAY)
    expect(session).toHaveLength(8)
    expect(hasAdjacentSameModule(session)).toBe(false)
  })

  it('không mutate mảng đầu vào', () => {
    const cards = [
      card({ conceptId: 'b', dueDate: '2026-08-03' }),
      card({ conceptId: 'a', dueDate: '2026-08-01' }),
    ]
    const before = ids(cards)
    buildReviewSession(cards, TODAY)
    expect(ids(cards)).toEqual(before)
  })
})

describe('interleaveByModule', () => {
  it('3 module đều nhau → xen kẽ tròn trịa A B C A B C A B C', () => {
    const cards = [
      ...['a1', 'a2', 'a3'].map((id) => card({ conceptId: id, moduleId: 'mA' })),
      ...['b1', 'b2', 'b3'].map((id) => card({ conceptId: id, moduleId: 'mB' })),
      ...['c1', 'c2', 'c3'].map((id) => card({ conceptId: id, moduleId: 'mC' })),
    ]
    expect(ids(interleaveByModule(cards))).toEqual([
      'a1', 'b1', 'c1',
      'a2', 'b2', 'c2',
      'a3', 'b3', 'c3',
    ])
  })

  it('phân bố lệch nhưng tránh được (4/2/2) → không có 2 thẻ cùng module liền nhau', () => {
    const cards = [
      ...['a1', 'a2', 'a3', 'a4'].map((id) => card({ conceptId: id, moduleId: 'mA' })),
      ...['b1', 'b2'].map((id) => card({ conceptId: id, moduleId: 'mB' })),
      ...['c1', 'c2'].map((id) => card({ conceptId: id, moduleId: 'mC' })),
    ]
    const mixed = interleaveByModule(cards)
    expect(mixed).toHaveLength(8)
    expect(hasAdjacentSameModule(mixed)).toBe(false)
  })

  it('bảo toàn thứ tự tương đối trong từng module', () => {
    const cards = [
      ...['a1', 'a2', 'a3', 'a4'].map((id) => card({ conceptId: id, moduleId: 'mA' })),
      ...['b1', 'b2'].map((id) => card({ conceptId: id, moduleId: 'mB' })),
      ...['c1', 'c2'].map((id) => card({ conceptId: id, moduleId: 'mC' })),
    ]
    const mixed = interleaveByModule(cards)
    for (const mod of ['mA', 'mB', 'mC']) {
      const inOrder = ids(cards.filter((c) => c.moduleId === mod))
      const outOrder = ids(mixed.filter((c) => c.moduleId === mod))
      expect(outOrder).toEqual(inOrder)
    }
  })

  it('bắt đầu từ nhóm nhiều thẻ nhất', () => {
    const cards = [
      card({ conceptId: 'a1', moduleId: 'mA' }),
      ...['b1', 'b2', 'b3'].map((id) => card({ conceptId: id, moduleId: 'mB' })),
    ]
    expect(interleaveByModule(cards)[0]?.moduleId).toBe('mB')
  })

  it('một module áp đảo → vẫn trả đủ thẻ, phần không tránh được dồn hợp lý', () => {
    const cards = [
      ...['a1', 'a2', 'a3', 'a4', 'a5'].map((id) => card({ conceptId: id, moduleId: 'mA' })),
      card({ conceptId: 'b1', moduleId: 'mB' }),
    ]
    const mixed = interleaveByModule(cards)
    expect(mixed).toHaveLength(6)
    expect(new Set(ids(mixed))).toEqual(new Set(ids(cards)))
    // Thứ tự trong nhóm mA vẫn nguyên vẹn dù bị ép đứng cạnh nhau
    expect(ids(mixed.filter((c) => c.moduleId === 'mA'))).toEqual(['a1', 'a2', 'a3', 'a4', 'a5'])
  })

  it('mảng rỗng và 1 thẻ: trả nguyên trạng', () => {
    expect(interleaveByModule([])).toEqual([])
    const single = [card({ conceptId: 'only' })]
    expect(ids(interleaveByModule(single))).toEqual(['only'])
  })

  it('deterministic: hai lần gọi cùng input ra cùng kết quả, không mutate input', () => {
    const cards = [
      ...['a1', 'a2'].map((id) => card({ conceptId: id, moduleId: 'mA' })),
      ...['b1', 'b2', 'b3'].map((id) => card({ conceptId: id, moduleId: 'mB' })),
    ]
    const before = ids(cards)
    const first = interleaveByModule(cards)
    const second = interleaveByModule(cards)
    expect(ids(first)).toEqual(ids(second))
    expect(ids(cards)).toEqual(before)
  })
})

describe('xoay cách hỏi của thẻ (kho ý tưởng H5)', () => {
  it('thẻ MỚI gặp cách hỏi xuôi trước — hỏi chỗ khuyết khi chưa biết nguyên câu là đánh đố', () => {
    expect(flashcardAskIndex(flashcardTurn(card({ conceptId: 'x' })), 3)).toBe(0)
  })

  it('mỗi lượt ôn đẩy sang cách hỏi kế tiếp, hết vòng thì quay lại đầu', () => {
    const turns = [0, 1, 2, 3, 4].map((intervalIndex) =>
      flashcardTurn(card({ conceptId: 'x', intervalIndex: intervalIndex as ReviewCard['intervalIndex'] })),
    )
    expect(turns.map((t) => flashcardAskIndex(t, 3))).toEqual([0, 1, 2, 0, 1])
  })

  it('quên thẻ cũng đổi cách hỏi — nhớ lại đúng CÙNG một câu hỏi vừa trượt là nhớ mặt chữ', () => {
    const forgotten = card({ conceptId: 'x', intervalIndex: 0, lapses: 1 })
    expect(flashcardAskIndex(flashcardTurn(forgotten), 3)).toBe(1)
  })

  it('thẻ chỉ có một cách hỏi (đại đa số) thì luôn là cách đó', () => {
    for (const intervalIndex of [0, 1, 2, 3, 4] as const) {
      expect(flashcardAskIndex(flashcardTurn(card({ conceptId: 'x', intervalIndex })), 1)).toBe(0)
    }
  })

  it('không tìm thấy thẻ trong hộp thì rơi về cách hỏi xuôi, không vỡ màn', () => {
    expect(flashcardAskIndex(flashcardTurn(null), 3)).toBe(0)
  })
})

// ---------------------------------------------------------------
// Thẻ HỎNG không được làm sập cửa vào app (phát hiện J1, khối 21.43)
// ---------------------------------------------------------------
//
// Hộp ôn tập là thứ app đọc ĐẦU TIÊN mỗi lần mở (luật "ôn trước học
// sau"). Trước khối này, một thẻ méo làm cả app sập ngay ở cửa và người
// học rơi vào vòng lặp mở-sập-tải lại, không tới nổi trang Hồ sơ để lùi
// về bản tự lưu. Bất biến từ nay: **bỏ qua thẻ hỏng, không bao giờ ném.**

describe('theLanh — thẻ nào đọc được', () => {
  const lanh = card({ conceptId: 'goi-tin' })

  it('thẻ đủ trường thì lành', () => {
    expect(theLanh(lanh)).toBe(true)
  })

  it('thiếu createdOn — đúng ca đã làm sập app thật', () => {
    const { createdOn: _bo, ...thieu } = lanh
    expect(theLanh(thieu)).toBe(false)
  })

  it('ngày sai khuôn thì không lành (isBefore sẽ ném nếu lọt)', () => {
    expect(theLanh({ ...lanh, dueDate: '12/08/2026' })).toBe(false)
    expect(theLanh({ ...lanh, createdOn: 'hôm qua' })).toBe(false)
    expect(theLanh({ ...lanh, lastReviewedOn: 'x' })).toBe(false)
  })

  it('lastReviewedOn null vẫn lành — thẻ chưa ôn lần nào là chuyện thường', () => {
    expect(theLanh({ ...lanh, lastReviewedOn: null })).toBe(true)
  })

  it('thiếu id, sai kiểu số, hoặc không phải object đều không lành', () => {
    expect(theLanh({ ...lanh, conceptId: '' })).toBe(false)
    expect(theLanh({ ...lanh, intervalIndex: '2' })).toBe(false)
    expect(theLanh({ ...lanh, lapses: null })).toBe(false)
    expect(theLanh(null)).toBe(false)
    expect(theLanh('thẻ')).toBe(false)
  })
})

describe('thẻ hỏng nằm lẫn trong hộp', () => {
  const hong = { conceptId: 'hong', moduleId: 'm1', intervalIndex: 0, dueDate: '2026-08-01', lapses: 0 }
  const hopLan = [card({ conceptId: 'a' }), hong, card({ conceptId: 'b' })] as ReviewCard[]

  it('dueCards bỏ qua thẻ hỏng thay vì ném', () => {
    expect(() => dueCards(hopLan, TODAY)).not.toThrow()
    expect(dueCards(hopLan, TODAY).map((c) => c.conceptId)).toEqual(['a', 'b'])
  })

  it('overdueCount và cổng khóa bài mới cũng không ném', () => {
    expect(() => overdueCount(hopLan, TODAY)).not.toThrow()
    expect(overdueCount(hopLan, TODAY)).toBe(2)
    expect(canStartNewLesson(hopLan, TODAY)).toBe(true)
  })

  it('phiên ôn vẫn dựng được, chỉ thiếu đúng thẻ hỏng', () => {
    expect(() => buildReviewSession(hopLan, TODAY)).not.toThrow()
    expect(buildReviewSession(hopLan, TODAY).map((c) => c.conceptId).sort()).toEqual(['a', 'b'])
  })

  it('cả hộp toàn thẻ hỏng: phiên rỗng, app vẫn đứng', () => {
    expect(buildReviewSession([hong, hong] as ReviewCard[], TODAY)).toEqual([])
    expect(dueCards([hong] as ReviewCard[], TODAY)).toEqual([])
  })
})

// ---------------------------------------------------------------
// Thẻ MỒ CÔI: hộp ôn sống lâu hơn nội dung (phát hiện K1, khối 21.46)
// ---------------------------------------------------------------
//
// Một lần cập nhật nội dung đổi id khái niệm là thẻ cũ trong hộp không
// còn tra ra mặt thẻ. Trước khối này, thẻ như thế vẫn tính vào nợ, vẫn
// được xếp vào phiên ôn — và phiên ôn thì đứng chết ở đó.

describe('thẻ mồ côi — nội dung đổi dưới chân người học', () => {
  const hopLe = new Set(['a', 'b'])
  const hop = [card({ conceptId: 'a' }), card({ conceptId: 'mo-coi' }), card({ conceptId: 'b' })]

  it('chỉ ra ĐÚNG thẻ không còn nội dung', () => {
    expect(theMoCoi(hop, hopLe).map((c) => c.conceptId)).toEqual(['mo-coi'])
  })

  it('lọc giữ lại thẻ còn dựng được mặt', () => {
    expect(locTheConNoiDung(hop, hopLe).map((c) => c.conceptId)).toEqual(['a', 'b'])
  })

  it('hộp toàn thẻ lành thì không bỏ gì', () => {
    expect(theMoCoi([card({ conceptId: 'a' })], hopLe)).toEqual([])
  })

  it('cardIdsHopLe gom khái niệm có flashcard + phòng cung điện, bỏ khái niệm không thẻ', () => {
    const ids = cardIdsHopLe(loadModules())
    const mods = loadModules()
    const coFlashcard = mods.flatMap((m) => m.concepts.filter((c) => c.flashcard !== undefined))
    const khongFlashcard = mods.flatMap((m) => m.concepts.filter((c) => c.flashcard === undefined))
    expect(coFlashcard.length).toBeGreaterThan(0)
    for (const c of coFlashcard.slice(0, 20)) expect(ids.has(c.id), c.id).toBe(true)
    for (const c of khongFlashcard.slice(0, 5)) expect(ids.has(c.id), c.id).toBe(false)
    // Thẻ phòng cung điện mang tiền tố riêng — phải nằm trong danh sách.
    expect([...ids].some((id) => id.startsWith('palace:'))).toBe(true)
  })
})
