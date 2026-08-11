// Tầng đọc/ghi của ảnh chụp tiến độ (F3). Luật "khi nào chụp" đã có test
// riêng ở engine; đây chỉ đo phần đụng localStorage — nơi mọi thứ hỏng
// theo kiểu im lặng.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ANH_CHUP_KEY,
  PROGRESS_KEY,
  chupDinhKy,
  chupTruocNangCap,
  docAnhChup,
  khoiPhuc,
} from './anhChup'

function tienDo(xp: number): string {
  return JSON.stringify({ state: { xpTotal: xp }, version: 6 })
}

const HOM_NAY = new Date('2026-08-11T09:00:00')
const HOM_SAU = new Date('2026-08-12T09:00:00')

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('docAnhChup — kho hỏng thì im lặng trả rỗng', () => {
  it('chưa có key thì rỗng', () => {
    expect(docAnhChup()).toEqual([])
  })

  it('chuỗi không phải JSON thì rỗng, không ném', () => {
    localStorage.setItem(ANH_CHUP_KEY, 'chưa chắc là JSON')
    expect(() => docAnhChup()).not.toThrow()
    expect(docAnhChup()).toEqual([])
  })

  it('bản ghi thiếu trường bị loại, bản lành ở lại', () => {
    localStorage.setItem(
      ANH_CHUP_KEY,
      JSON.stringify({
        danhSach: [
          { luc: 'x', ngay: '2026-08-11', version: 6, lyDo: 'dinh-ky', duLieu: 'a' },
          { luc: 'y', ngay: '2026-08-10', lyDo: 'dinh-ky' },
          { luc: 'z', ngay: '2026-08-09', version: 6, lyDo: 'lý-do-lạ', duLieu: 'c' },
        ],
      }),
    )
    expect(docAnhChup().map((a) => a.duLieu)).toEqual(['a'])
  })
})

describe('chupDinhKy — chụp lúc mở app', () => {
  it('chưa học gì (không có key tiến độ) thì không chụp', () => {
    chupDinhKy(HOM_NAY)
    expect(docAnhChup()).toEqual([])
  })

  it('chụp nguyên văn chuỗi tiến độ đang nằm trong localStorage', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(120))
    chupDinhKy(HOM_NAY)
    const list = docAnhChup()
    expect(list).toHaveLength(1)
    expect(list[0]!.duLieu).toBe(tienDo(120))
    expect(list[0]!.version).toBe(6)
    expect(list[0]!.lyDo).toBe('dinh-ky')
    expect(list[0]!.ngay).toBe('2026-08-11')
  })

  it('mở app lần thứ hai trong ngày thì KHÔNG chụp thêm', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(120))
    chupDinhKy(HOM_NAY)
    localStorage.setItem(PROGRESS_KEY, tienDo(150))
    chupDinhKy(new Date('2026-08-11T20:00:00'))
    expect(docAnhChup()).toHaveLength(1)
  })

  it('sang ngày mới thì chụp bản mới', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(120))
    chupDinhKy(HOM_NAY)
    localStorage.setItem(PROGRESS_KEY, tienDo(150))
    chupDinhKy(HOM_SAU)
    expect(docAnhChup().map((a) => a.ngay)).toEqual(['2026-08-12', '2026-08-11'])
  })

  it('tiến độ y hệt bản vừa chụp thì bỏ qua — hai bản trùng chỉ lùi được một chỗ', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(120))
    chupDinhKy(HOM_NAY)
    chupDinhKy(HOM_SAU) // sang ngày mới nhưng chưa học thêm gì
    expect(docAnhChup()).toHaveLength(1)
  })

  it('chuỗi tiến độ hỏng thì không chụp', () => {
    localStorage.setItem(PROGRESS_KEY, '{ hỏng')
    chupDinhKy(HOM_NAY)
    expect(docAnhChup()).toEqual([])
  })
})

describe('chupTruocNangCap', () => {
  it('chụp ngay cả khi hôm nay đã có bản định kỳ — khoảnh khắc này chỉ có một', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(120))
    chupDinhKy(HOM_NAY)
    chupTruocNangCap(JSON.stringify({ state: { xpTotal: 100 }, version: 5 }), 5, HOM_NAY)
    const list = docAnhChup()
    expect(list).toHaveLength(2)
    expect(list[0]!.lyDo).toBe('truoc-nang-cap')
    expect(list[0]!.version).toBe(5)
  })

  it('KHÔNG chụp lại đúng dữ liệu mà một bản trước-nâng-cấp khác đã giữ', () => {
    // Đúng vòng đã bắt được lúc thử thật: lùi về bản trước-nâng-cấp thì
    // migrate chạy lại và định chụp thêm một bản y hệt bản vừa lùi về.
    const cu = JSON.stringify({ state: { xpTotal: 100 }, version: 5 })
    chupTruocNangCap(cu, 5, HOM_NAY)
    chupTruocNangCap(cu, 5, HOM_SAU)
    expect(docAnhChup()).toHaveLength(1)
  })

  it('nhưng trùng với một bản ĐỊNH KỲ thì vẫn chụp — nó mang thêm quyền không bị cắt', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(120))
    chupDinhKy(HOM_NAY)
    chupTruocNangCap(tienDo(120), 6, HOM_SAU)
    expect(docAnhChup().map((a) => a.lyDo)).toEqual(['truoc-nang-cap', 'dinh-ky'])
  })
})

describe('hết chỗ localStorage', () => {
  it('ghi không lọt thì bỏ bản cũ rồi thử lại, không ném lỗi lên trên', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(1))
    chupDinhKy(new Date('2026-08-09T09:00:00'))
    localStorage.setItem(PROGRESS_KEY, tienDo(2))
    chupDinhKy(new Date('2026-08-10T09:00:00'))
    expect(docAnhChup()).toHaveLength(2)

    // Từ giờ chỉ nhận được kho một bản; lần ghi nào dài hơn cũng "hết chỗ".
    const that = localStorage.setItem.bind(localStorage)
    vi.spyOn(localStorage, 'setItem').mockImplementation((k: string, v: string) => {
      if (k === ANH_CHUP_KEY && (JSON.parse(v) as { danhSach: unknown[] }).danhSach.length > 1) {
        throw new Error('QuotaExceededError')
      }
      that(k, v)
    })

    localStorage.setItem(PROGRESS_KEY, tienDo(3))
    expect(() => chupDinhKy(new Date('2026-08-11T09:00:00'))).not.toThrow()
    const list = docAnhChup()
    expect(list).toHaveLength(1)
    expect(list[0]!.duLieu).toBe(tienDo(3))
  })

  it('một bản cũng không lọt thì dọn sạch kho ảnh, tiến độ thật không hề hấn', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(1))
    chupDinhKy(new Date('2026-08-10T09:00:00'))
    const that = localStorage.setItem.bind(localStorage)
    vi.spyOn(localStorage, 'setItem').mockImplementation((k: string, v: string) => {
      if (k === ANH_CHUP_KEY) throw new Error('QuotaExceededError')
      that(k, v)
    })
    localStorage.setItem(PROGRESS_KEY, tienDo(2))
    expect(() => chupDinhKy(new Date('2026-08-11T09:00:00'))).not.toThrow()
    expect(docAnhChup()).toEqual([])
    expect(localStorage.getItem(PROGRESS_KEY)).toBe(tienDo(2))
  })
})

describe('khoiPhuc — lùi về một bản chụp', () => {
  it('ghi đè tiến độ bằng dữ liệu của bản chụp', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(10))
    chupDinhKy(new Date('2026-08-10T09:00:00'))
    const cu = docAnhChup()[0]!
    localStorage.setItem(PROGRESS_KEY, tienDo(999))
    khoiPhuc(cu, HOM_NAY)
    expect(localStorage.getItem(PROGRESS_KEY)).toBe(tienDo(10))
  })

  it('chụp lại bản ĐANG CÓ trước khi ghi đè — bấm nhầm vẫn quay lại được', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(10))
    chupDinhKy(new Date('2026-08-10T09:00:00'))
    const cu = docAnhChup()[0]!
    localStorage.setItem(PROGRESS_KEY, tienDo(999))
    khoiPhuc(cu, HOM_NAY)
    const list = docAnhChup()
    expect(list[0]!.lyDo).toBe('truoc-khoi-phuc')
    expect(list[0]!.duLieu).toBe(tienDo(999))
  })
})
