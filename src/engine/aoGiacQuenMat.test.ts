// Ảo giác quen mặt (kho ý tưởng I4) — chọn ra thẻ nào đáng nói.
//
// Luật quan trọng nhất ở đây là NGƯỠNG. Một lần "chắc mà không nhớ" là
// chuyện thường của trí nhớ; đem nó ra bảo người học "bạn đang tự lừa
// mình" là kết luận vội trên một mẫu. Cùng một thẻ hụt đi hụt lại mới là
// dấu hiệu thật.

import { describe, expect, it } from 'vitest'
import { AO_GIAC_NGUONG, aoGiacHayGap } from './mistakeLog'

describe('aoGiacHayGap — thẻ hay bị thấy quen mà không thuộc', () => {
  it('hụt một lần thì CHƯA nói gì — dưới ngưỡng là im', () => {
    expect(aoGiacHayGap({ 'khai-niem-a': 1 })).toEqual([])
  })

  it(`hụt đủ ${AO_GIAC_NGUONG} lần thì mới vào danh sách`, () => {
    expect(aoGiacHayGap({ 'khai-niem-a': AO_GIAC_NGUONG })).toEqual([
      { cardId: 'khai-niem-a', lan: AO_GIAC_NGUONG },
    ])
  })

  it('hụt nhiều hơn thì đứng trước', () => {
    const rows = aoGiacHayGap({ it: 2, nhieu: 9, vua: 4 })
    expect(rows.map((r) => r.cardId)).toEqual(['nhieu', 'vua', 'it'])
  })

  it('hòa số lần thì xếp theo tên thẻ — kết quả tất định', () => {
    const rows = aoGiacHayGap({ zeta: 3, alpha: 3, mid: 3 })
    expect(rows.map((r) => r.cardId)).toEqual(['alpha', 'mid', 'zeta'])
  })

  it('cắt đúng trần, không đổ cả sổ ra màn hình', () => {
    const dem = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`k${i}`, 5]))
    expect(aoGiacHayGap(dem)).toHaveLength(5)
    expect(aoGiacHayGap(dem, AO_GIAC_NGUONG, 3)).toHaveLength(3)
  })

  it('sổ rỗng (người học chưa ôn lần nào) thì không có gì để nói', () => {
    expect(aoGiacHayGap({})).toEqual([])
  })
})
