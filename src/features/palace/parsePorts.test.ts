import { describe, expect, it } from 'vitest'
import { formatPorts, parseKeys, parsePorts } from './parsePorts'
import { PORT_PALACE } from '../../../tests/fixtures/palaceFixture'
import { hasRoomGlyph, roomGlyphIds } from './RoomGlyph'

describe('đọc số cổng người học gõ', () => {
  it('một số', () => {
    expect(parsePorts('443')).toEqual([443])
  })

  it('người thật gõ cả câu — vẫn lấy đúng số', () => {
    expect(parsePorts('cổng 443')).toEqual([443])
    expect(parsePorts('67, 68')).toEqual([67, 68])
    expect(parsePorts('67 và 68')).toEqual([67, 68])
  })

  it('gõ trùng một số hai lần chỉ tính một', () => {
    expect(parsePorts('80 80')).toEqual([80])
  })

  it('chưa gõ gì hoặc gõ toàn chữ thì là chưa trả lời, không phải lỗi', () => {
    expect(parsePorts('')).toEqual([])
    expect(parsePorts('mình quên mất rồi')).toEqual([])
  })

  it('số ngoài khoảng cổng bị bỏ qua, phần còn lại vẫn chấm được', () => {
    expect(parsePorts('999999 và 443')).toEqual([443])
    expect(parsePorts('0')).toEqual([])
  })

  it('viết lại cho người đọc', () => {
    expect(formatPorts([67, 68])).toBe('67, 68')
  })
})

describe('hình gợi nhớ: mỗi phòng một hình, không phòng nào thiếu', () => {
  it('15 phòng của cung điện Module 5 đều có hình', () => {
    const missing = PORT_PALACE.rooms.filter((r) => !hasRoomGlyph(r.imageId)).map((r) => r.id)
    expect(missing).toEqual([])
  })

  it('không hai phòng nào dùng chung một hình', () => {
    const used = PORT_PALACE.rooms.map((r) => r.imageId)
    expect(new Set(used).size).toBe(used.length)
  })

  it('registry không chứa hình thừa — hình nào cũng thuộc về một phòng', () => {
    const used = new Set(PORT_PALACE.rooms.map((r) => r.imageId))
    expect(roomGlyphIds().filter((id) => !used.has(id))).toEqual([])
  })
})

describe('parseKeys — đọc vế chính theo kiểu tòa nhà', () => {
  it('tòa số: tách các cụm chữ số thành từng key', () => {
    expect(parseKeys('67 và 68', 'number')).toEqual(['67', '68'])
    expect(parseKeys('cổng 443', 'number')).toEqual(['443'])
    expect(parseKeys('không nhớ', 'number')).toEqual([])
  })

  it('tòa chữ: cả ô nhập là MỘT key, chỉ cắt khoảng trắng thừa', () => {
    expect(parseKeys('  Domain ', 'text')).toEqual(['Domain'])
    expect(parseKeys('organizational unit', 'text')).toEqual(['organizational unit'])
    expect(parseKeys('   ', 'text')).toEqual([])
  })
})
