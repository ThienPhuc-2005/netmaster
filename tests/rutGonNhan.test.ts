// Luật rút gọn nhãn của bản vẽ isometric (scripts/rut-gon-nhan.mjs).
//
// Bất biến file này canh: **không bao giờ được đẻ ra hai khối mang cùng
// một tên**. Nhãn dài chỉ làm hình chật, nhãn trùng làm hình NÓI DỐI —
// người học nhìn sơ đồ thấy hai máy tên giống hệt nhau thì mọi câu trong
// đề bài trỏ vào cái nào cũng không rõ. Mọi lần nới luật rút gọn đều phải
// đi qua đây.

import { describe, expect, it } from 'vitest'
import { NHAN_DAI, rutGonNhan } from '../scripts/rut-gon-nhan.mjs'

describe('rutGonNhan — bốn bước', () => {
  it('bỏ đuôi trong ngoặc, giữ phần gọi tên', () => {
    expect(rutGonNhan(['Máy trạm A (phòng kế toán)'])).toEqual(['Máy trạm A'])
  })

  it('bỏ tiền tố loại thiết bị khi nó đứng trước dấu gạch', () => {
    // Bỏ tiền tố xong đã đủ ngắn thì DỪNG — không rút tiếp thành "TH",
    // vì mỗi bước chỉ chạy khi nhãn vẫn còn dài.
    expect(rutGonNhan(['SWITCH-TangHai'])).toEqual(['TangHai'])
  })

  it('KHÔNG bỏ tiền tố khi nó chỉ là nửa đầu của một chữ', () => {
    // "Máy chủ trên Internet": bỏ "Máy" ra "chủ trên Internet" — vô nghĩa.
    expect(rutGonNhan(['Máy chủ trên Internet'])).toEqual(['Máy chủ'])
  })

  it('cụm chữ dính liền thành chữ cái đầu', () => {
    expect(rutGonNhan(['MayChuKeToan'])).toEqual(['MCKT'])
  })

  it('một tiếng thì KHÔNG rút — "Internet" thành "I" là hết nghĩa', () => {
    expect(rutGonNhan(['Internet-toan-cau-lon'])).toEqual(['Internet'])
  })

  it('cụm IN HOA HẾT không bị rút, chỉ bị cắt ở dấu phân cách', () => {
    expect(rutGonNhan(['MAY-TRUONG-PHONG'])).toEqual(['TRUONG'])
  })

  it('mỗi bước xét độ dài HIỆN TẠI, không xét độ dài gốc', () => {
    // Bỏ ngoặc xong đã đủ ngắn thì dừng; chạy tiếp là còn mỗi chữ "A".
    expect(rutGonNhan(['PC-A (tầng 1)'])).toEqual(['PC-A'])
  })

  it('nhãn vốn đã ngắn thì không ai đụng vào', () => {
    expect(rutGonNhan(['R-Bien', 'sw KD'])).toEqual(['R-Bien', 'sw KD'])
  })
})

describe('rutGonNhan — chống trùng tên (lý do tồn tại của test này)', () => {
  it('cặp PC-/SW- cùng phòng: rút RUỘT chứ không rút tiền tố', () => {
    // Bỏ tiền tố thì cả hai ra "KinhDoanh" — bước đó phải lùi cho cả bản
    // vẽ, rồi bước rút ruột mới cứu: "PC-KD" với "SW-KD".
    const goc = ['PC-KinhDoanh', 'SW-KinhDoanh', 'PC-PhongKhach', 'SW-PhongKhach']
    expect(rutGonNhan(goc)).toEqual(['PC-KD', 'SW-KD', 'PC-PK', 'SW-PK'])
  })

  it('cắt mà trùng thì thà để nguyên tên dài', () => {
    // "Máy nội bộ A" và "Máy nội bộ B" cắt ở khoảng trắng là ra hai
    // "Máy nội bộ" giống hệt nhau — script để nguyên và in "sửa tay".
    const goc = ['Máy nội bộ A', 'Máy nội bộ B']
    expect(rutGonNhan(goc)).toEqual(goc)
    expect(goc.every((s) => s.length > NHAN_DAI)).toBe(true)
  })

  it('rút mà mất sạch chữ thì lùi, và cắt giữa chữ thì thà để nguyên', () => {
    // Cả nhãn nằm trong ngoặc: bỏ ngoặc là còn chuỗi rỗng nên bước đó
    // lùi; không có dấu phân cách nào để cắt nên nhãn ở nguyên, chờ người.
    expect(rutGonNhan(['(motcaitenratdai)'])).toEqual(['(motcaitenratdai)'])
  })

  it('giữ nguyên thứ tự đầu vào', () => {
    const goc = ['SW-KinhDoanh', 'R-Bien', 'PC-KinhDoanh']
    expect(rutGonNhan(goc)).toEqual(['SW-KD', 'R-Bien', 'PC-KD'])
  })
})
