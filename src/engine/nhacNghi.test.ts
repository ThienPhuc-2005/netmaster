import { describe, expect, it } from 'vitest'
import {
  chamMot,
  daNhac,
  denLucNhac,
  HOC_LIEN_TUC_PHUT,
  NGHI_PHUT,
  soPhutDaHoc,
  TRANG_THAI_DAU,
  type TrangThaiNhacNghi,
} from './nhacNghi'

const PHUT = 60_000
const luc = (phut: number) => phut * PHUT

/** Học liên tục từ phút 0, có cử động đều đặn tới phút `den`. */
function hocLienTuc(den: number, buoc = 1): TrangThaiNhacNghi {
  let s = TRANG_THAI_DAU
  for (let p = 0; p <= den; p += buoc) s = chamMot(s, luc(p))
  return s
}

describe('nhắc nghỉ — quãng học liên tục', () => {
  it('chưa động vào gì thì không có quãng nào và không nhắc', () => {
    expect(soPhutDaHoc(TRANG_THAI_DAU, luc(100))).toBe(0)
    expect(denLucNhac(TRANG_THAI_DAU, luc(100))).toBe(false)
  })

  it('cử động đầu tiên mở một quãng mới', () => {
    const s = chamMot(TRANG_THAI_DAU, luc(7))
    expect(s.batDau).toBe(luc(7))
    expect(soPhutDaHoc(s, luc(19))).toBe(12)
  })

  it(`chưa đủ ${HOC_LIEN_TUC_PHUT} phút thì im`, () => {
    const s = hocLienTuc(HOC_LIEN_TUC_PHUT - 1)
    expect(denLucNhac(s, luc(HOC_LIEN_TUC_PHUT - 1))).toBe(false)
  })

  it(`đủ ${HOC_LIEN_TUC_PHUT} phút liên tục thì nhắc`, () => {
    const s = hocLienTuc(HOC_LIEN_TUC_PHUT)
    expect(denLucNhac(s, luc(HOC_LIEN_TUC_PHUT))).toBe(true)
  })
})

describe('nhắc nghỉ — nghỉ rồi thì không nhắc', () => {
  it(`rời máy quá ${NGHI_PHUT} phút thì quãng đếm lại từ đầu`, () => {
    // Học 24 phút, đi pha cà phê 10 phút, quay lại: 24 phút cũ KHÔNG được
    // cộng dồn, vì họ vừa nghỉ thật rồi.
    const truoc = hocLienTuc(24)
    const sau = chamMot(truoc, luc(34))
    expect(sau.batDau).toBe(luc(34))
    expect(soPhutDaHoc(sau, luc(34))).toBe(0)
    expect(denLucNhac(sau, luc(34))).toBe(false)
  })

  it(`rời máy đúng ${NGHI_PHUT} phút (chưa quá) thì quãng vẫn tính tiếp`, () => {
    const truoc = hocLienTuc(20)
    const sau = chamMot(truoc, luc(25))
    expect(sau.batDau).toBe(luc(0))
    expect(denLucNhac(sau, luc(25))).toBe(true)
  })

  it('nghỉ xong quãng mới lại được nhắc một lần nữa', () => {
    let s = hocLienTuc(HOC_LIEN_TUC_PHUT)
    s = daNhac(s, luc(HOC_LIEN_TUC_PHUT))
    // Nghỉ hẳn rồi vào học tiếp 25 phút nữa.
    s = chamMot(s, luc(60))
    expect(s.daNhacLuc).toBeNull()
    expect(denLucNhac(s, luc(60 + HOC_LIEN_TUC_PHUT))).toBe(true)
  })
})

describe('nhắc nghỉ — nhắc rồi thì im một quãng', () => {
  it('vừa nhắc xong thì không nhắc lại ngay', () => {
    const s = daNhac(hocLienTuc(HOC_LIEN_TUC_PHUT), luc(HOC_LIEN_TUC_PHUT))
    expect(denLucNhac(s, luc(HOC_LIEN_TUC_PHUT + 1))).toBe(false)
    expect(denLucNhac(s, luc(HOC_LIEN_TUC_PHUT * 2 - 1))).toBe(false)
  })

  it('cày thêm trọn một quãng nữa thì nhắc lần hai', () => {
    const s = daNhac(hocLienTuc(HOC_LIEN_TUC_PHUT), luc(HOC_LIEN_TUC_PHUT))
    expect(denLucNhac(s, luc(HOC_LIEN_TUC_PHUT * 2))).toBe(true)
  })

  it('nhắc xong quãng học VẪN chạy tiếp, không bị reset', () => {
    const s = daNhac(hocLienTuc(HOC_LIEN_TUC_PHUT), luc(HOC_LIEN_TUC_PHUT))
    expect(s.batDau).toBe(luc(0))
    expect(soPhutDaHoc(s, luc(40))).toBe(40)
  })
})

describe('nhắc nghỉ — không tự lấy giờ', () => {
  it('mọi hàm đều nhận mốc thời gian từ ngoài', () => {
    // Cùng một trạng thái, hai mốc giờ khác nhau cho hai câu trả lời khác
    // nhau — nếu có hàm nào lén gọi đồng hồ hệ thống thì test này vô nghĩa.
    const s = hocLienTuc(HOC_LIEN_TUC_PHUT)
    expect(denLucNhac(s, luc(1))).toBe(false)
    expect(denLucNhac(s, luc(HOC_LIEN_TUC_PHUT))).toBe(true)
  })

  it('mốc giờ lùi về quá khứ không làm số phút âm', () => {
    const s = hocLienTuc(10)
    expect(soPhutDaHoc(s, luc(-5))).toBe(0)
  })
})
