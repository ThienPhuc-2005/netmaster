import { describe, expect, it } from 'vitest'
import { nenChupDinhKy, themAnh, SO_BAN_GIU, type AnhChup, type LyDoChup } from './anhChup'

function anh(ngay: string, lyDo: LyDoChup = 'dinh-ky'): AnhChup {
  return { luc: `${ngay}T08:00:00.000Z`, ngay, version: 6, lyDo, duLieu: `du-lieu-${ngay}-${lyDo}` }
}

describe('nenChupDinhKy — mỗi ngày học một bản', () => {
  it('chưa có bản nào thì chụp', () => {
    expect(nenChupDinhKy([], '2026-08-11')).toBe(true)
  })

  it('hôm nay đã có bản rồi thì thôi', () => {
    expect(nenChupDinhKy([anh('2026-08-11')], '2026-08-11')).toBe(false)
  })

  it('bản mới nhất là của hôm qua thì chụp bản mới', () => {
    expect(nenChupDinhKy([anh('2026-08-10'), anh('2026-08-09')], '2026-08-11')).toBe(true)
  })

  it('bản trước-nâng-cấp cũng tính là đã chụp hôm nay', () => {
    // Nó vừa chụp đúng tiến độ ấy vài giây trước; chụp thêm chỉ tốn chỗ.
    expect(nenChupDinhKy([anh('2026-08-11', 'truoc-nang-cap')], '2026-08-11')).toBe(false)
  })
})

describe('themAnh — trần và thứ tự', () => {
  it('mới nhất đứng đầu', () => {
    const sau = themAnh([anh('2026-08-10')], anh('2026-08-11'))
    expect(sau.map((a) => a.ngay)).toEqual(['2026-08-11', '2026-08-10'])
  })

  it('quá trần thì bỏ bản cũ nhất', () => {
    let list: AnhChup[] = []
    for (const ngay of ['2026-08-08', '2026-08-09', '2026-08-10', '2026-08-11']) {
      list = themAnh(list, anh(ngay))
    }
    expect(list).toHaveLength(SO_BAN_GIU)
    expect(list.map((a) => a.ngay)).toEqual(['2026-08-11', '2026-08-10', '2026-08-09'])
  })

  it('bản TRƯỚC-NÂNG-CẤP được giữ lại dù đã trôi khỏi trần', () => {
    // Ba ngày học liên tiếp sau một lần nâng cấp là chuyện thường — mà
    // đúng bản ấy mới là đường lùi thật nếu chính migrate làm hỏng.
    let list = themAnh([], anh('2026-08-08', 'truoc-nang-cap'))
    for (const ngay of ['2026-08-09', '2026-08-10', '2026-08-11']) list = themAnh(list, anh(ngay))
    expect(list).toHaveLength(SO_BAN_GIU)
    expect(list.map((a) => a.lyDo)).toEqual(['dinh-ky', 'dinh-ky', 'truoc-nang-cap'])
    expect(list.map((a) => a.ngay)).toEqual(['2026-08-11', '2026-08-10', '2026-08-08'])
  })

  it('chỉ giữ bản trước-nâng-cấp MỚI NHẤT, không giữ mọi bản', () => {
    let list = themAnh([], anh('2026-08-01', 'truoc-nang-cap'))
    list = themAnh(list, anh('2026-08-05', 'truoc-nang-cap'))
    for (const ngay of ['2026-08-09', '2026-08-10', '2026-08-11']) list = themAnh(list, anh(ngay))
    expect(list.map((a) => a.ngay)).toEqual(['2026-08-11', '2026-08-10', '2026-08-05'])
  })

  it('bản trước-khôi-phục KHÔNG được ưu tiên như bản trước-nâng-cấp', () => {
    // Nó chỉ là lưới an toàn cho một cú bấm nhầm vừa xảy ra, không phải
    // bản duy nhất còn giữ hình dữ liệu cũ.
    let list = themAnh([], anh('2026-08-08', 'truoc-khoi-phuc'))
    for (const ngay of ['2026-08-09', '2026-08-10', '2026-08-11']) list = themAnh(list, anh(ngay))
    expect(list.map((a) => a.ngay)).toEqual(['2026-08-11', '2026-08-10', '2026-08-09'])
  })
})
