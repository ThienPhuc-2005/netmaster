import { describe, expect, it } from 'vitest'
import {
  FLOORS,
  ROOMS_PER_FLOOR,
  ROOM_COUNT,
  roomAt,
  roomById,
  roomByPort,
  routeIndexOf,
  serviceAnswers,
  tourRoute,
  validatePalace,
  type PalaceProblemCode,
} from './palace'
import { PORT_PALACE, clonePalace } from '../../../tests/fixtures/palaceFixture'

const codes = (palace = clonePalace()): PalaceProblemCode[] => validatePalace(palace).map((p) => p.code)

describe('tòa nhà hợp lệ', () => {
  it('cung điện 15 phòng của Module 5 không có lỗi cấu trúc', () => {
    expect(validatePalace(PORT_PALACE)).toEqual([])
  })

  it('tòa nhà đúng bằng 5 tầng × 3 phòng', () => {
    expect(ROOM_COUNT).toBe(FLOORS * ROOMS_PER_FLOOR)
    expect(ROOM_COUNT).toBe(15)
  })
})

describe('lộ trình tour cố định', () => {
  it('đi từ tầng trệt lên nóc, mỗi tầng trái sang phải', () => {
    const route = tourRoute(PORT_PALACE)
    const slots = route.map((r) => `${r.floor}-${r.position}`)
    expect(slots).toEqual([
      '1-1', '1-2', '1-3',
      '2-1', '2-2', '2-3',
      '3-1', '3-2', '3-3',
      '4-1', '4-2', '4-3',
      '5-1', '5-2', '5-3',
    ])
  })

  it('thứ tự phòng trong dữ liệu KHÔNG đổi được đường đi của người học', () => {
    const shuffled = clonePalace()
    shuffled.rooms.reverse()
    expect(tourRoute(shuffled).map((r) => r.id)).toEqual(tourRoute(PORT_PALACE).map((r) => r.id))
  })

  it('routeIndexOf trả đúng chỗ đứng trong lộ trình', () => {
    expect(routeIndexOf(PORT_PALACE, 'r-http')).toBe(0)
    expect(routeIndexOf(PORT_PALACE, 'r-dhcp')).toBe(ROOM_COUNT - 1)
    expect(routeIndexOf(PORT_PALACE, 'khong-co-phong-nay')).toBe(-1)
  })
})

describe('tra cứu', () => {
  it('theo id, theo ô lưới, theo số cổng', () => {
    expect(roomById(PORT_PALACE, 'r-https')?.ports).toEqual([443])
    expect(roomAt(PORT_PALACE, 2, 1)?.service).toBe('SSH')
    expect(roomByPort(PORT_PALACE, 3389)?.id).toBe('r-rdp')
  })

  it('phòng DHCP tra được bằng cả hai số cổng của nó', () => {
    expect(roomByPort(PORT_PALACE, 67)?.id).toBe('r-dhcp')
    expect(roomByPort(PORT_PALACE, 68)?.id).toBe('r-dhcp')
  })

  it('không có thì trả null, không ném lỗi', () => {
    expect(roomById(PORT_PALACE, 'khong-co')).toBeNull()
    expect(roomAt(PORT_PALACE, 9, 9)).toBeNull()
    expect(roomByPort(PORT_PALACE, 9999)).toBeNull()
  })

  it('serviceAnswers gộp tên chuẩn và mọi cách gọi khác', () => {
    const rdp = roomById(PORT_PALACE, 'r-rdp')!
    expect(serviceAnswers(rdp)).toEqual(['RDP', 'remote desktop'])
  })
})

describe('kiểm cấu trúc bắt lỗi soạn bài', () => {
  it('thiếu phòng', () => {
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

  it('một số cổng nằm ở hai phòng', () => {
    const p = clonePalace()
    p.rooms[1]!.ports = [80]
    expect(codes(p)).toContain('duplicate-port')
  })

  it('hai phòng dùng chung một hình gợi nhớ', () => {
    const p = clonePalace()
    p.rooms[1]!.imageId = p.rooms[0]!.imageId
    expect(codes(p)).toContain('duplicate-image')
  })

  it('hai phòng cùng tên dịch vụ', () => {
    const p = clonePalace()
    p.rooms[1]!.service = p.rooms[0]!.service
    expect(codes(p)).toContain('duplicate-service')
  })

  it('tầng hoặc vị trí ngoài tòa nhà', () => {
    const p = clonePalace()
    p.rooms[0]!.floor = FLOORS + 1
    p.rooms[1]!.position = 0
    const found = codes(p)
    expect(found).toContain('floor-out-of-range')
    expect(found).toContain('position-out-of-range')
  })

  it('số cổng vô lý hoặc phòng không có cổng nào', () => {
    const p = clonePalace()
    p.rooms[0]!.ports = [70000]
    p.rooms[1]!.ports = []
    const found = codes(p)
    expect(found).toContain('port-out-of-range')
    expect(found).toContain('no-ports')
  })

  it('trả HẾT lỗi một lượt chứ không dừng ở lỗi đầu tiên', () => {
    const p = clonePalace()
    p.rooms[1]!.id = p.rooms[0]!.id
    p.rooms[2]!.imageId = p.rooms[0]!.imageId
    expect(validatePalace(p).length).toBeGreaterThanOrEqual(2)
  })
})
