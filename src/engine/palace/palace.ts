// Cung điện ký ức — mô hình tòa nhà (method of loci, spec Module 5).
//
// VÌ SAO CÓ FILE NÀY. 15 port thông dụng là kiến thức RỜI RẠC: không suy
// ra được từ nguyên lý nào, chỉ có thể nhớ. Kiểu kiến thức này chống lại
// mọi cách dạy "hiểu bản chất" — nên spec dùng cung điện ký ức: gắn mỗi
// mẩu vào một CHỖ trong một không gian quen thuộc. Người học đi tour tòa
// nhà (mỗi phòng một port kèm hình gợi nhớ), rồi nhớ lại bằng cách đi
// lại đúng lộ trình ấy từ trí nhớ.
//
// Hai điều kiện của phương pháp được ép Ở ĐÂY, không để UI tự giữ:
//
//   1. Tòa nhà CỐ ĐỊNH — 5 tầng × 3 phòng, không phòng nào trống, không
//      phòng nào thừa. Lưới có lỗ là lộ trình đứt, mà lộ trình đứt thì
//      người học mất đúng cái móc để treo trí nhớ.
//   2. Lộ trình CỐ ĐỊNH — luôn từ tầng trệt lên nóc, trong mỗi tầng luôn
//      trái sang phải. Đi tour lần nào cũng đúng thứ tự đó: bản thân
//      THỨ TỰ là một phần của cái được nhớ.
//
// Vì sao 5×3 mà không phải 3×5 hay một hành lang 15 phòng: 15 phòng thẳng
// hàng thì người học đếm chứ không định vị được, còn tầng cho ta một mốc
// thô (tầng mấy) trước khi tới mốc tinh (phòng nào trong tầng) — đúng
// kiểu tra cứu hai bậc mà trí nhớ không gian làm tốt.
//
// Bất biến của src/engine: thuần TypeScript, không React, không đọc giờ
// hệ thống, không trả chuỗi hiển thị (trừ dữ liệu nội dung do người soạn
// bài viết ra — câu chuyện gợi nhớ của từng phòng).

import type { LText } from '../ltext'

/** Số tầng của tòa nhà. Cố định — xem ghi chú đầu file. */
export const FLOORS = 5

/** Số phòng mỗi tầng. Cố định. */
export const ROOMS_PER_FLOOR = 3

/** 15 phòng = 15 port thông dụng của spec Module 5. */
export const ROOM_COUNT = FLOORS * ROOMS_PER_FLOOR

/** Giao thức vận chuyển của dịch vụ trong phòng. */
export type Transport = 'tcp' | 'udp' | 'both'

/**
 * Một phòng = một mẩu kiến thức được đặt vào một chỗ.
 *
 * `story` và `imageId` KHÔNG phải trang trí: thiếu hình gợi nhớ thì cung
 * điện tụt xuống thành danh sách 15 dòng, tức là đúng thứ mà phương pháp
 * này sinh ra để thay thế. Vì vậy schema bắt buộc cả hai.
 */
export interface PalaceRoom {
  id: string
  /** 1..FLOORS, đếm từ tầng trệt lên. */
  floor: number
  /** 1..ROOMS_PER_FLOOR, đếm từ trái sang phải. */
  position: number
  /** Số cổng của phòng. Đa số 1 số; phòng DHCP mang cặp 67/68. */
  ports: number[]
  transport: Transport
  /** Thuật ngữ nghề, giữ nguyên tiếng Anh: 'HTTPS', 'SSH'... (spec 4.4). */
  service: string
  /**
   * Cách gọi khác được chấp nhận khi người học gõ tên dịch vụ ("web bảo
   * mật", "remote desktop"). Chấm qua grading/normalize như câu gõ tay.
   */
  serviceAliases: string[]
  /** Hình gợi nhớ cố định của phòng (1 phòng = 1 hình, không dùng lại). */
  imageId: string
  /** Câu chuyện gợi nhớ: "phòng 443 có ổ khóa vàng". */
  story: LText
}

export interface Palace {
  id: string
  /** Tên tòa nhà, hiện cho người học. */
  title: LText
  rooms: PalaceRoom[]
}

// ---------------------------------------------------------------
// Kiểm cấu trúc
// ---------------------------------------------------------------

/**
 * Mã lỗi CẤU TRÚC của tòa nhà — lỗi soạn bài, không phải thứ người học
 * gặp. Tách khỏi lỗi "người học nhớ sai" y như bên lab tách lỗi cấu trúc
 * sơ đồ khỏi lỗi cấu hình mạng.
 */
export type PalaceProblemCode =
  | 'room-count'
  | 'duplicate-room-id'
  | 'floor-out-of-range'
  | 'position-out-of-range'
  | 'duplicate-slot'
  | 'empty-slot'
  | 'duplicate-port'
  | 'port-out-of-range'
  | 'duplicate-image'
  | 'duplicate-service'
  | 'no-ports'

export interface PalaceProblem {
  code: PalaceProblemCode
  /** Chỗ sai: id phòng, hoặc "tầng-vị trí" với lỗi về ô lưới. */
  where: string
}

/** Cổng hợp lệ theo TCP/UDP: 1..65535 (0 là cổng dành riêng, không dạy). */
const MIN_PORT = 1
const MAX_PORT = 65535

/**
 * Kiểm tòa nhà có dùng làm cung điện được không. Trả về DANH SÁCH lỗi
 * (không ném) để người soạn bài thấy hết một lượt thay vì sửa từng lỗi
 * một — cùng quy ước với validateTopology bên lab.
 */
export function validatePalace(palace: Palace): PalaceProblem[] {
  const problems: PalaceProblem[] = []
  const add = (code: PalaceProblemCode, where: string) => problems.push({ code, where })

  if (palace.rooms.length !== ROOM_COUNT) {
    add('room-count', `${palace.rooms.length}/${ROOM_COUNT}`)
  }

  const seenIds = new Set<string>()
  const seenSlots = new Set<string>()
  const portOwner = new Map<number, string>()
  const imageOwner = new Map<string, string>()
  const serviceOwner = new Map<string, string>()

  for (const room of palace.rooms) {
    if (seenIds.has(room.id)) add('duplicate-room-id', room.id)
    seenIds.add(room.id)

    if (!Number.isInteger(room.floor) || room.floor < 1 || room.floor > FLOORS) {
      add('floor-out-of-range', room.id)
    }
    if (!Number.isInteger(room.position) || room.position < 1 || room.position > ROOMS_PER_FLOOR) {
      add('position-out-of-range', room.id)
    }

    const slot = slotKey(room.floor, room.position)
    if (seenSlots.has(slot)) add('duplicate-slot', slot)
    seenSlots.add(slot)

    if (room.ports.length === 0) add('no-ports', room.id)
    for (const port of room.ports) {
      if (!Number.isInteger(port) || port < MIN_PORT || port > MAX_PORT) {
        add('port-out-of-range', `${room.id}:${port}`)
        continue
      }
      // Một số cổng nằm ở hai phòng thì người học nhớ đúng vẫn bị chấm
      // nhập nhằng — và tệ hơn, hai chỗ trong cung điện đánh nhau.
      const owner = portOwner.get(port)
      if (owner !== undefined) add('duplicate-port', `${port} (${owner}, ${room.id})`)
      else portOwner.set(port, room.id)
    }

    // Hai phòng chung một hình = hai chỗ trông giống nhau trong cung điện,
    // đúng kiểu nhiễu mà phương pháp này phải tránh.
    const imgOwner = imageOwner.get(room.imageId)
    if (imgOwner !== undefined) add('duplicate-image', `${room.imageId} (${imgOwner}, ${room.id})`)
    else imageOwner.set(room.imageId, room.id)

    const serviceKey = room.service.trim().toLowerCase()
    const svcOwner = serviceOwner.get(serviceKey)
    if (svcOwner !== undefined) add('duplicate-service', `${room.service} (${svcOwner}, ${room.id})`)
    else serviceOwner.set(serviceKey, room.id)
  }

  // Lưới phải kín: mọi ô (tầng, vị trí) đều có phòng. Chỉ kiểm khi số
  // phòng đã đúng — thiếu phòng thì lỗi 'room-count' đã nói rồi, nhắc
  // thêm 15 lần 'empty-slot' chỉ làm loãng báo cáo.
  if (palace.rooms.length === ROOM_COUNT) {
    for (let floor = 1; floor <= FLOORS; floor += 1) {
      for (let position = 1; position <= ROOMS_PER_FLOOR; position += 1) {
        if (!seenSlots.has(slotKey(floor, position))) add('empty-slot', slotKey(floor, position))
      }
    }
  }

  return problems
}

function slotKey(floor: number, position: number): string {
  return `${floor}-${position}`
}

// ---------------------------------------------------------------
// Lộ trình & tra cứu
// ---------------------------------------------------------------

/**
 * Lộ trình tour: tầng trệt lên nóc, mỗi tầng trái sang phải. LUÔN trả
 * đúng thứ tự này bất kể thứ tự các phòng trong dữ liệu — người soạn bài
 * xếp JSON kiểu gì cũng không đổi được đường đi của người học.
 */
export function tourRoute(palace: Palace): PalaceRoom[] {
  return [...palace.rooms].sort((a, b) => a.floor - b.floor || a.position - b.position)
}

export function roomById(palace: Palace, roomId: string): PalaceRoom | null {
  return palace.rooms.find((r) => r.id === roomId) ?? null
}

export function roomAt(palace: Palace, floor: number, position: number): PalaceRoom | null {
  return palace.rooms.find((r) => r.floor === floor && r.position === position) ?? null
}

/** Phòng chứa một số cổng (tra ngược: "3389 nằm ở phòng nào?"). */
export function roomByPort(palace: Palace, port: number): PalaceRoom | null {
  return palace.rooms.find((r) => r.ports.includes(port)) ?? null
}

/** Vị trí của phòng trong lộ trình (0-based); -1 nếu không thuộc tòa nhà. */
export function routeIndexOf(palace: Palace, roomId: string): number {
  return tourRoute(palace).findIndex((r) => r.id === roomId)
}

/**
 * Mọi cách gõ được chấp nhận cho tên dịch vụ của một phòng. Tách ra để
 * cả bộ chấm lẫn schema (kiểm trùng giữa các phòng) dùng chung một nguồn.
 */
export function serviceAnswers(room: PalaceRoom): string[] {
  return [room.service, ...room.serviceAliases]
}
