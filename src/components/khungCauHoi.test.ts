// Khung bọc câu hỏi — MỘT luật cho cả hai nơi câu hỏi xuất hiện (ý N4).
//
// Vì sao file này tồn tại: cùng một câu lab từng đẹp trong BÀI HỌC mà VỠ
// khi đi THI — mặt bàn bị ép còn 270px, người học chỉ nhìn thấy một trong
// bốn thiết bị. Lỗi sống được lâu vì hai trang tự quyết bề rộng riêng và
// không ai đặt chúng cạnh nhau để so; nó chỉ lộ ra khi chủ dự án tự vấp.
//
// Test này đi qua ĐỦ 8 DẠNG CÂU ở CẢ HAI KHUNG, nên thêm một dạng nặng
// mới mà quên khai là đỏ ngay tại đây.

import { describe, expect, it } from 'vitest'
import { DANG_CAN_BE_RONG, lopKhungCauHoi } from './QuestionInput'
import type { Question } from '../engine/contentSchema'

/** Đủ 8 dạng câu của schema — danh sách này phải khớp `Question['kind']`. */
const MOI_DANG = ['typed', 'mcq', 'order', 'lab', 'palace-walk', 'clinic', 'ps', 'cli'] as const

/** Dạng vẽ NGANG: sơ đồ, terminal, cung điện, phòng khám. */
const DANG_NANG = ['lab', 'palace-walk', 'clinic', 'ps', 'cli'] as const
/** Dạng chỉ có chữ. */
const DANG_CHU = ['typed', 'mcq', 'order'] as const

describe('luật bề rộng phủ đủ 8 dạng câu', () => {
  it('danh sách trong test khớp đúng kiểu của schema — không dạng nào lọt sổ', () => {
    // Nếu schema thêm dạng thứ 9, dòng gán này không biên dịch được nữa.
    const phu: Record<Question['kind'], true> = {
      typed: true,
      mcq: true,
      order: true,
      lab: true,
      'palace-walk': true,
      clinic: true,
      ps: true,
      cli: true,
    }
    expect(Object.keys(phu).sort()).toEqual([...MOI_DANG].sort())
    expect([...DANG_NANG, ...DANG_CHU].sort()).toEqual([...MOI_DANG].sort())
  })

  it('BÀI HỌC không bó bề rộng dạng nào — khung app đã giữ cột chữ rồi', () => {
    for (const dang of MOI_DANG) {
      expect(lopKhungCauHoi(dang, 'bai-hoc'), `${dang} bị bó trong bài học`).not.toContain('max-w')
    }
  })

  it('BÀI THI: dạng nặng được cả mặt bàn, KHÔNG dạng nào bị bó', () => {
    for (const dang of DANG_NANG) {
      const lop = lopKhungCauHoi(dang, 'bai-thi')
      expect(lop, `${dang} vẽ ngang mà vẫn bị bó vào cột chữ`).not.toContain('max-w')
      expect(lop).toContain('w-full')
    }
  })

  it('BÀI THI: dạng chữ giữ cột hẹp — màn thi trống trơn, mắt cần chỗ tựa', () => {
    for (const dang of DANG_CHU) {
      expect(lopKhungCauHoi(dang, 'bai-thi'), `${dang} là câu chữ mà nới rộng`).toContain('max-w-lg')
    }
  })

  it('hai khung chỉ được khác nhau ở BỀ RỘNG, không khác nhịp xếp', () => {
    // Cùng `flex flex-col gap-4`: khác nhịp xếp thì cùng một câu đọc ra
    // hai cảm giác khác nhau ở hai nơi, và đó là mầm của đúng lớp lỗi này.
    for (const dang of MOI_DANG) {
      expect(lopKhungCauHoi(dang, 'bai-hoc')).toContain('flex flex-col gap-4')
      expect(lopKhungCauHoi(dang, 'bai-thi')).toContain('flex flex-col gap-4')
    }
  })

  it('bộ dạng-cần-mặt-bàn khớp đúng danh sách dạng nặng', () => {
    expect([...DANG_CAN_BE_RONG].sort()).toEqual([...DANG_NANG].sort())
  })
})
