// Nạp nội dung khi mạng CHỈ ĐƯA VỀ MỘT PHẦN (khối 21.49).
//
// App giờ mở bằng khúc đầu đã tải được thay vì đòi đủ 21 gói. Luật giữ
// cho việc đó không phá cổng mastery nằm gọn trong `khucDauLienMach`:
// chỉ giữ đoạn order 1, 2, 3… liền mạch, gói nào nằm sau chỗ đứt thì coi
// như chưa về.
//
// Vì sao bỏ đi không thiệt gì cho người học: cổng mastery vốn đã chặn
// không cho học module N+1 khi chưa đậu N (nguyên tắc 2). Có module 5
// trong tay mà thiếu module 4 thì cũng không mở được 5.
//
// Vì sao KHÔNG được giữ lại: `computeModuleStatuses` nhận một DÃY và mở
// khóa theo từng cặp liền kề. Đưa nó dãy [1,2,3,5,6] là nó đọc module 5
// như module đứng ngay sau module 3 — đậu module 3 xong module 5 mở ra.
// Tức là THỦNG CỔNG MASTERY vì một lần rớt mạng.

import { describe, expect, it } from 'vitest'
import { khucDauLienMach, loadModules, noiDungDayDu, soModuleThieu, tongSoModule } from './index'
import type { Module } from '../engine/contentSchema'

/** Chỉ `order` mới có nghĩa với hàm đang thử — không dựng module thật. */
function mods(...orders: number[]): Module[] {
  return orders.map((order) => ({ order, id: `module-${order}` }) as unknown as Module)
}

const orders = (list: readonly Module[]) => list.map((m) => m.order)

describe('khucDauLienMach — về được tới đâu học tới đó', () => {
  it('về đủ và liền mạch thì giữ nguyên tất cả', () => {
    expect(orders(khucDauLienMach(mods(1, 2, 3, 4)))).toEqual([1, 2, 3, 4])
  })

  it('thiếu ở giữa: cắt tại chỗ đứt, KHÔNG kéo module sau lên lấp chỗ', () => {
    // Đây là câu quan trọng nhất file này: giữ lại 5 và 6 là mở khóa lậu
    // hai module cho người vừa đậu module 3.
    expect(orders(khucDauLienMach(mods(1, 2, 3, 5, 6)))).toEqual([1, 2, 3])
  })

  it('thứ tự về lộn xộn vẫn ra đúng khúc đầu (mạng không hứa thứ tự)', () => {
    expect(orders(khucDauLienMach(mods(3, 1, 6, 2)))).toEqual([1, 2, 3])
  })

  it('thiếu chính module ĐẦU thì không có khúc nào — app không có gì để mở', () => {
    expect(khucDauLienMach(mods(2, 3, 4))).toEqual([])
  })

  it('không về được gì thì rỗng, không ném', () => {
    expect(khucDauLienMach([])).toEqual([])
  })

  it('chỉ về được module đầu: học được đúng một chủ đề, vẫn hơn màn trắng', () => {
    expect(orders(khucDauLienMach(mods(1)))).toEqual([1])
  })
})

describe('đếm phần còn thiếu', () => {
  // Trong test, `tests/setup.ts` prime đủ nội dung thật — nên đây là ca
  // "về đủ", và nó khoá cái mặc định: app bình thường KHÔNG bao giờ nói
  // mình đang thiếu.
  it('nội dung thật nạp đủ thì không báo thiếu', () => {
    expect(noiDungDayDu()).toBe(true)
    expect(soModuleThieu()).toBe(0)
  })

  it('tổng số module biết được kể cả trước khi tải — đọc từ danh sách file của bản build', () => {
    expect(tongSoModule()).toBe(loadModules().length)
    expect(tongSoModule()).toBeGreaterThan(1)
  })
})
