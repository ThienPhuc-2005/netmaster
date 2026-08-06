import { describe, expect, it } from 'vitest'
import { parsePalace } from './palaceSchema'
import { PORT_PALACE, clonePalace } from '../../../tests/fixtures/palaceFixture'

describe('cung điện hợp lệ thì parse được', () => {
  it('tòa nhà 15 phòng của Module 5', () => {
    const parsed = parsePalace(PORT_PALACE)
    expect(parsed.rooms).toHaveLength(15)
    expect(parsed.id).toBe('palace-port')
  })
})

describe('chặn lỗi cấu trúc tòa nhà', () => {
  it('thiếu phòng', () => {
    const p = clonePalace()
    p.rooms.pop()
    expect(() => parsePalace(p)).toThrow()
  })

  it('hai phòng chung một ô', () => {
    const p = clonePalace()
    p.rooms[1]!.floor = p.rooms[0]!.floor
    p.rooms[1]!.position = p.rooms[0]!.position
    expect(() => parsePalace(p)).toThrow(/duplicate-slot|empty-slot/)
  })

  it('trùng số cổng giữa hai phòng', () => {
    const p = clonePalace()
    p.rooms[1]!.ports = [80]
    expect(() => parsePalace(p)).toThrow(/duplicate-port/)
  })
})

describe('chặn lỗi làm hỏng chính phương pháp', () => {
  it('câu chuyện không nhắc số cổng — hình ảnh không móc vào con số', () => {
    const p = clonePalace()
    p.rooms[1]!.story = { vi: 'Phòng này treo một ổ khóa vàng rất đẹp và sáng bóng.' }
    expect(() => parsePalace(p)).toThrow(/không nhắc số cổng 443/)
  })

  it('phòng hai cổng phải nhắc CẢ HAI số', () => {
    const p = clonePalace()
    const dhcp = p.rooms.find((r) => r.id === 'r-dhcp')!
    dhcp.story = { vi: 'Phòng 67 phát chìa khóa cho người mới đến nhận nhà.' }
    expect(() => parsePalace(p)).toThrow(/không nhắc số cổng 68/)
  })

  it('bản dịch tiếng Anh cũng phải giữ con số', () => {
    const p = clonePalace()
    p.rooms[1]!.story = { vi: p.rooms[1]!.story.vi, en: 'The room with a golden lock.' }
    expect(() => parsePalace(p)).toThrow(/không nhắc số cổng 443/)
  })

  it('câu chuyện quá ngắn — đó là nhãn dán, không phải hình ảnh', () => {
    const p = clonePalace()
    p.rooms[0]!.story = { vi: 'Cổng 80.' }
    expect(() => parsePalace(p)).toThrow(/quá ngắn/)
  })

  it('hai phòng dùng chung một hình gợi nhớ', () => {
    const p = clonePalace()
    p.rooms[1]!.imageId = p.rooms[0]!.imageId
    expect(() => parsePalace(p)).toThrow(/duplicate-image/)
  })

  it('một cách gọi khớp được hai phòng — chấm điểm nhập nhằng', () => {
    const p = clonePalace()
    // "SMTP Submission" chứa nguyên cụm "SMTP" nên bộ chấm sẽ tính đúng
    // cho cả phòng 25 — đây chính là ca thật đã gặp lúc soạn tòa nhà.
    p.rooms.find((r) => r.id === 'r-submission')!.service = 'SMTP Submission'
    expect(() => parsePalace(p)).toThrow(/nhập nhằng/)
  })

  it('cách gọi khác cũng bị soi, không chỉ tên chuẩn', () => {
    const p = clonePalace()
    p.rooms.find((r) => r.id === 'r-ldaps')!.serviceAliases = ['LDAP']
    expect(() => parsePalace(p)).toThrow(/nhập nhằng/)
  })
})

describe('lỗi dành cho người soạn bài', () => {
  it('gộp mọi vấn đề vào một thông báo trỏ đúng chỗ', () => {
    const p = clonePalace()
    p.rooms[0]!.story = { vi: 'Ngắn.' }
    p.rooms[1]!.imageId = p.rooms[0]!.imageId
    try {
      parsePalace(p)
      expect.unreachable('parsePalace phải ném lỗi')
    } catch (error) {
      const message = (error as Error).message
      expect(message).toMatch(/Cung điện ký ức không hợp lệ/)
      expect(message).toMatch(/quá ngắn/)
      expect(message).toMatch(/duplicate-image/)
    }
  })
})
