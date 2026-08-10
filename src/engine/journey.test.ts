import { describe, expect, it } from 'vitest'
import { journeySpan } from './journey'

describe('journeySpan — độ dài chuyến đi', () => {
  it('chưa xong bài nào thì không có chuyện gì để kể', () => {
    expect(journeySpan({})).toBeNull()
  })

  it('tính cả hai đầu: học gọn trong một ngày là 1 ngày, không phải 0', () => {
    const span = journeySpan({ a: '2026-03-01', b: '2026-03-01' })
    expect(span).toEqual({ firstDay: '2026-03-01', lastDay: '2026-03-01', days: 1, activeDays: 1 })
  })

  it('bắc qua tháng và qua năm vẫn đúng số ngày', () => {
    expect(journeySpan({ a: '2026-01-28', b: '2026-02-03' })?.days).toBe(7)
    expect(journeySpan({ a: '2025-12-30', b: '2026-01-02' })?.days).toBe(4)
  })

  it('đếm riêng số ngày THẬT SỰ ngồi học — nghỉ quãng giữa không phải lỗi của ai', () => {
    const span = journeySpan({
      a: '2026-03-01',
      b: '2026-03-01',
      c: '2026-03-02',
      d: '2026-04-10',
    })
    expect(span?.days).toBe(41)
    expect(span?.activeDays).toBe(3)
  })

  it('thứ tự khai trong store không đổi kết quả — dữ liệu thật không sắp sẵn', () => {
    const a = journeySpan({ x: '2026-05-09', y: '2026-04-01', z: '2026-04-20' })
    expect(a?.firstDay).toBe('2026-04-01')
    expect(a?.lastDay).toBe('2026-05-09')
  })

  it('ngày hỏng trong store là lỗi dữ liệu, ném ngay chứ không in số vô nghĩa', () => {
    expect(() => journeySpan({ a: '2026-13-45', b: '2026-01-01' })).toThrow()
  })
})
