import { describe, expect, it } from 'vitest'
import {
  roomAt,
  roomById,
  roomByKey,
  roomCountOf,
  routeIndexOf,
  nameAnswers,
  tourRoute,
  validatePalace,
  type PalaceProblemCode,
} from './palace'
import { GPO_PALACE, PORT_PALACE, clonePalace } from '../../../tests/fixtures/palaceFixture'

const codes = (palace = clonePalace()): PalaceProblemCode[] => validatePalace(palace).map((p) => p.code)

describe('tòa nhà hợp lệ — kích thước khai theo từng tòa', () => {
  it('cung điện 15 phòng của Module 5 (5×3) không có lỗi cấu trúc', () => {
    expect(roomCountOf(PORT_PALACE)).toBe(15)
    expect(validatePalace(PORT_PALACE)).toEqual([])
  })

  it('tòa GPO 4 tầng × 1 phòng (Module 9) cũng hợp lệ với CÙNG engine', () => {
    expect(roomCountOf(GPO_PALACE)).toBe(4)
    expect(validatePalace(GPO_PALACE)).toEqual([])
  })
})

describe('lộ trình tour cố định', () => {
  it('đi từ tầng trệt lên nóc, mỗi tầng trái sang phải', () => {
    const slots = tourRoute(PORT_PALACE).map((r) => `${r.floor}-${r.position}`)
    expect(slots).toEqual([
      '1-1', '1-2', '1-3',
      '2-1', '2-2', '2-3',
      '3-1', '3-2', '3-3',
      '4-1', '4-2', '4-3',
      '5-1', '5-2', '5-3',
    ])
  })

  it('tòa 4×1: lộ trình chính là chuỗi LSDOU từ trệt lên', () => {
    expect(tourRoute(GPO_PALACE).map((r) => r.keys[0])).toEqual(['Local', 'Site', 'Domain', 'OU'])
  })

  it('thứ tự phòng trong dữ liệu KHÔNG đổi được đường đi của người học', () => {
    const shuffled = clonePalace()
    shuffled.rooms.reverse()
    expect(tourRoute(shuffled).map((r) => r.id)).toEqual(tourRoute(PORT_PALACE).map((r) => r.id))
  })

  it('routeIndexOf trả đúng chỗ đứng trong lộ trình', () => {
    expect(routeIndexOf(PORT_PALACE, 'r-http')).toBe(0)
    expect(routeIndexOf(PORT_PALACE, 'r-dhcp')).toBe(14)
    expect(routeIndexOf(PORT_PALACE, 'khong-co-phong-nay')).toBe(-1)
  })
})

describe('tra cứu', () => {
  it('theo id, theo ô lưới, theo key', () => {
    expect(roomById(PORT_PALACE, 'r-https')?.keys).toEqual(['443'])
    expect(roomAt(PORT_PALACE, 2, 1)?.name).toBe('SSH')
    expect(roomByKey(PORT_PALACE, '3389')?.id).toBe('r-rdp')
  })

  it('key chữ tra được nhân nhượng hoa thường ("local" tìm ra tầng Local)', () => {
    expect(roomByKey(GPO_PALACE, 'local')?.id).toBe('r-local')
    expect(roomByKey(GPO_PALACE, 'OU')?.id).toBe('r-ou')
  })

  it('phòng DHCP tra được bằng cả hai key của nó', () => {
    expect(roomByKey(PORT_PALACE, '67')?.id).toBe('r-dhcp')
    expect(roomByKey(PORT_PALACE, '68')?.id).toBe('r-dhcp')
  })

  it('không có thì trả null, không ném lỗi', () => {
    expect(roomById(PORT_PALACE, 'khong-co')).toBeNull()
    expect(roomAt(PORT_PALACE, 9, 9)).toBeNull()
    expect(roomByKey(PORT_PALACE, '9999')).toBeNull()
  })

  it('nameAnswers gộp tên chuẩn và mọi cách gọi khác', () => {
    const rdp = roomById(PORT_PALACE, 'r-rdp')!
    expect(nameAnswers(rdp)).toEqual(['RDP', 'remote desktop'])
  })
})

describe('kiểm cấu trúc bắt lỗi soạn bài', () => {
  it('thiếu phòng so với kích thước đã khai', () => {
    const p = clonePalace()
    p.rooms.pop()
    expect(codes(p)).toContain('room-count')
  })

  it('lưới có lỗ: hai phòng chung một ô, một ô bỏ trống', () => {
    const p = clonePalace()
    p.rooms[1]!.floor = p.rooms[0]!.floor
    p.rooms[1]!.position = p.rooms[0]!.position
    const found = codes(p)
    expect(found).toContain('duplicate-slot')
    expect(found).toContain('empty-slot')
  })

  it('trùng id phòng', () => {
    const p = clonePalace()
    p.rooms[1]!.id = p.rooms[0]!.id
    expect(codes(p)).toContain('duplicate-room-id')
  })

  it('một key nằm ở hai phòng — kể cả khác hoa thường', () => {
    const p = clonePalace()
    p.rooms[1]!.keys = ['80']
    expect(codes(p)).toContain('duplicate-key')

    const g = clonePalace(GPO_PALACE)
    g.rooms[1]!.keys = ['local']
    expect(codes(g)).toContain('duplicate-key')
  })

  it('hai phòng dùng chung một hình gợi nhớ', () => {
    const p = clonePalace()
    p.rooms[1]!.imageId = p.rooms[0]!.imageId
    expect(codes(p)).toContain('duplicate-image')
  })

  it('hai phòng cùng tên vế phụ', () => {
    const p = clonePalace()
    p.rooms[1]!.name = p.rooms[0]!.name
    expect(codes(p)).toContain('duplicate-name')
  })

  it('tầng hoặc vị trí vượt kích thước TÒA NÀY (4×1 chặt hơn 5×3)', () => {
    const p = clonePalace()
    p.rooms[0]!.floor = 6
    p.rooms[1]!.position = 0
    const found = codes(p)
    expect(found).toContain('floor-out-of-range')
    expect(found).toContain('position-out-of-range')

    const g = clonePalace(GPO_PALACE)
    g.rooms[0]!.position = 2 // hợp lệ với tòa 5×3, nhưng tòa này mỗi tầng 1 phòng
    expect(codes(g)).toContain('position-out-of-range')
  })

  it('phòng không có key nào, hoặc key rỗng sau chuẩn hóa', () => {
    const p = clonePalace()
    p.rooms[0]!.keys = []
    p.rooms[1]!.keys = ['   ']
    const found = codes(p)
    expect(found).toContain('no-keys')
    expect(found).toContain('empty-key')
  })

  it('trả HẾT lỗi một lượt chứ không dừng ở lỗi đầu tiên', () => {
    const p = clonePalace()
    p.rooms[1]!.id = p.rooms[0]!.id
    p.rooms[2]!.imageId = p.rooms[0]!.imageId
    expect(validatePalace(p).length).toBeGreaterThanOrEqual(2)
  })
})
