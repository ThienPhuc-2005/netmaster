// Chủ đề hay vấp đẩy thẻ ôn lên sớm (kho ý tưởng I2).
//
// Hai vế phải cùng đúng, và vế thứ hai mới là vế dễ làm hỏng:
//   - thẻ của khái niệm hay cắn phải được lên trước khi CÙNG hạn;
//   - nhưng KHÔNG BAO GIỜ vượt mặt thẻ nợ lâu hơn. Thẻ trễ hạn là thẻ
//     sắp quên hẳn; cho "hay vấp" chen lên trước nó là đổi một thứ đang
//     mất lấy một thứ mới hơi lung lay.

import { describe, expect, it } from 'vitest'
import { conceptKey, conceptStumbles } from './mistakeLog'
import { buildReviewSession } from './reviewQueue'
import type { ReviewCard } from './types'

function the(conceptId: string, dueDate: string, moduleId = 'm1'): ReviewCard {
  return {
    moduleId,
    conceptId,
    dueDate,
    createdOn: '2026-01-01',
    lastReviewedOn: null,
    intervalIndex: 0,
    lapses: 0,
  }
}

const HOM_NAY = '2026-03-10'

describe('conceptStumbles — vấp quy về từng khái niệm', () => {
  it('bài không ai vấp thì không sinh khóa nào', () => {
    const modules = [
      {
        id: 'm1',
        lessons: [{ id: 'b1', steps: [{}, {}, { screens: [{ conceptId: 'k1' }] }, { exercises: [] }, { exercises: [] }] }],
      },
    ] as never
    expect(conceptStumbles(modules, {})).toEqual({})
  })
})

describe('hàng đợi ôn — vấp chỉ là tie-break', () => {
  it('cùng hạn thì khái niệm hay vấp lên trước', () => {
    const cards = [the('binh-thuong', HOM_NAY), the('hay-cắn', HOM_NAY)]
    const vap = { [conceptKey('m1', 'hay-cắn')]: 9 }
    const thuTu = buildReviewSession(cards, HOM_NAY, 15, vap).map((c) => c.conceptId)
    expect(thuTu[0]).toBe('hay-cắn')
  })

  it('KHÔNG vượt mặt thẻ nợ lâu hơn — nợ 5 ngày vẫn đi trước', () => {
    const cards = [the('hay-cắn', HOM_NAY), the('no-lau', '2026-03-05')]
    const vap = { [conceptKey('m1', 'hay-cắn')]: 99 }
    const thuTu = buildReviewSession(cards, HOM_NAY, 15, vap).map((c) => c.conceptId)
    expect(thuTu[0]).toBe('no-lau')
  })

  it('quyết được AI LỌT vào phiên khi quá trần 15 thẻ', () => {
    // 20 thẻ cùng hạn, phiên chỉ lấy 15 — thẻ hay vấp phải nằm trong số
    // lọt vào, đó mới là chỗ ý tưởng này thật sự có tác dụng.
    const cards = Array.from({ length: 20 }, (_, i) => the(`k${String(i).padStart(2, '0')}`, HOM_NAY))
    const vap = { [conceptKey('m1', 'k19')]: 7 }
    const trongPhien = buildReviewSession(cards, HOM_NAY, 15, vap).map((c) => c.conceptId)
    expect(trongPhien).toHaveLength(15)
    expect(trongPhien).toContain('k19')
    // Không truyền bảng vấp thì đúng thẻ ấy bị cắt — chứng minh chính
    // bảng vấp là thứ kéo nó vào, không phải may rủi thứ tự.
    expect(buildReviewSession(cards, HOM_NAY, 15).map((c) => c.conceptId)).not.toContain('k19')
  })

  it('không có bảng vấp thì thứ tự y hệt trước đây', () => {
    const cards = [the('b', HOM_NAY), the('a', HOM_NAY)]
    expect(buildReviewSession(cards, HOM_NAY).map((c) => c.conceptId)).toEqual(
      buildReviewSession(cards, HOM_NAY, 15, {}).map((c) => c.conceptId),
    )
  })

  it('vấp bằng nhau thì vẫn tất định theo khóa cũ', () => {
    const cards = [the('b', HOM_NAY), the('a', HOM_NAY)]
    const vap = { [conceptKey('m1', 'a')]: 3, [conceptKey('m1', 'b')]: 3 }
    expect(buildReviewSession(cards, HOM_NAY, 15, vap).map((c) => c.conceptId)).toEqual(['a', 'b'])
  })
})
