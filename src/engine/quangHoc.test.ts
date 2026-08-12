import { describe, expect, it } from 'vitest'
import { daiNhatTuan, daiNhatTuanTruoc, ghiQuang, GIU_NGAY, QUANG_DAI_PHUT, type SoQuangHoc } from './quangHoc'
import { HOC_LIEN_TUC_PHUT } from './nhacNghi'

// 2026-08-12 là thứ Tư; tuần của nó bắt đầu thứ Hai 2026-08-10.
const THU_TU: string = '2026-08-12'

describe('ghiQuang — kỷ lục của từng ngày', () => {
  it('ngày chưa có gì thì ghi thẳng', () => {
    expect(ghiQuang({}, THU_TU, 31)).toEqual({ '2026-08-12': 31 })
  })

  it('quãng NGẮN hơn kỷ lục trong ngày thì không được ghi đè', () => {
    // Quãng đang chạy báo lại mỗi phút; ghi đè vô điều kiện thì con số
    // của một ngày TỤT xuống mỗi lần người học ngồi xuống lần thứ hai.
    const so = { '2026-08-12': 47 }
    expect(ghiQuang(so, THU_TU, 12)).toBe(so)
  })

  it('dài hơn thì lên kỷ lục mới', () => {
    expect(ghiQuang({ '2026-08-12': 20 }, THU_TU, 21)['2026-08-12']).toBe(21)
  })

  it('quãng 0 phút không ghi gì — và trả về ĐÚNG object cũ để store khỏi đụng ổ đĩa', () => {
    const so = { '2026-08-11': 9 }
    expect(ghiQuang(so, THU_TU, 0)).toBe(so)
  })

  it('ngày cũ hơn trần thì bị dọn, ngày trong trần ở lại', () => {
    const so: SoQuangHoc = {
      '2026-08-11': 30, // hôm qua
      '2026-06-30': 25, // 43 ngày trước — còn trong trần
      '2026-01-05': 99, // quá cũ
    }
    const sau = ghiQuang(so, THU_TU, 40)
    expect(Object.keys(sau).sort()).toEqual(['2026-06-30', '2026-08-11', '2026-08-12'])
  })

  it('trần đo đúng GIU_NGAY ngày', () => {
    const vuaDu = '2026-06-03' // đúng 70 ngày trước 2026-08-12
    const sau = ghiQuang({ [vuaDu]: 15 }, THU_TU, 20)
    expect(sau[vuaDu]).toBe(15)
    expect(GIU_NGAY).toBe(70)
  })
})

describe('daiNhatTuan', () => {
  const so: SoQuangHoc = {
    '2026-08-09': 90, // Chủ nhật TUẦN TRƯỚC — không được lọt vào tuần này
    '2026-08-10': 22,
    '2026-08-12': 47,
    '2026-08-13': 15,
  }

  it('lấy đúng kỷ lục trong tuần chứa ngày mốc, kèm ngày lập', () => {
    expect(daiNhatTuan(so, THU_TU)).toEqual({ phut: 47, ngay: '2026-08-12' })
  })

  it('không kéo ngày của tuần trước sang tuần này', () => {
    // 90 phút hôm chủ nhật là kỷ lục của TUẦN TRƯỚC (tuần bắt đầu thứ Hai).
    expect(daiNhatTuan(so, THU_TU).phut).toBe(47)
    expect(daiNhatTuanTruoc(so, THU_TU)).toEqual({ phut: 90, ngay: '2026-08-09' })
  })

  it('tuần trắng thì trả 0 và không có ngày — UI phải nói thật là chưa có', () => {
    expect(daiNhatTuan({}, THU_TU)).toEqual({ phut: 0, ngay: null })
  })

  it('hòa thì kỷ lục thuộc về ngày SỚM hơn', () => {
    const hoa = { '2026-08-10': 30, '2026-08-12': 30 }
    expect(daiNhatTuan(hoa, THU_TU).ngay).toBe('2026-08-10')
  })
})

describe('ngưỡng "quãng dài"', () => {
  it('gấp đôi mốc nhắc nghỉ — 30 phút lỡ đà là chuyện thường, 50 phút thì không', () => {
    expect(QUANG_DAI_PHUT).toBe(HOC_LIEN_TUC_PHUT * 2)
    expect(HOC_LIEN_TUC_PHUT + 5).toBeLessThan(QUANG_DAI_PHUT)
  })
})
