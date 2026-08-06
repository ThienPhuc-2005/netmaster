// Cung điện ký ức — mô hình tòa nhà (method of loci).
//
// VÌ SAO CÓ FILE NÀY. Kiến thức RỜI RẠC (15 port của Module 5, chuỗi
// LSDOU của Module 9) không suy ra được từ nguyên lý nào, chỉ có thể
// nhớ — nên spec dùng cung điện ký ức: gắn mỗi mẩu vào một CHỖ trong
// một không gian quen thuộc, nhớ lại bằng cách đi lại đúng con đường.
//
// TỔNG QUÁT HÓA (hạng mục 8, đã chốt): kích thước tòa nhà và ruột phòng
// khai THEO TỪNG TÒA — Module 5 là 5 tầng × 3 phòng chứa port, Module 9
// là 4 tầng × 1 phòng chứa chuỗi Local → Site → Domain → OU. Engine chỉ
// giữ phần bất biến của phương pháp:
//
//   1. Lưới KÍN — đúng floors × roomsPerFloor phòng, không lỗ, không
//      thừa. Lưới có lỗ là lộ trình đứt, mà lộ trình đứt thì người học
//      mất đúng cái móc để treo trí nhớ.
//   2. Lộ trình CỐ ĐỊNH — tầng trệt lên nóc, trái sang phải. Bản thân
//      THỨ TỰ là một phần của cái được nhớ.
//
// Ruột một phòng là HAI VẾ: `keys` (vế chính phải nhớ — "443", "Domain")
// và `name` (vế phụ gọi tên — "HTTPS", "GPO cấp miền"). Nhãn của hai vế
// do tòa nhà tự khai (keyLabel/nameLabel) vì chúng là NỘI DUNG, không
// phải chuỗi UI.
//
// Bất biến của src/engine: thuần TypeScript, không React, không đọc giờ
// hệ thống, không trả chuỗi hiển thị của khung app.

import type { LText } from '../ltext'
import { lenientEquals, normalizeAnswer } from '../grading/normalize'

/**
 * Kiểu của vế chính — quyết định cách UI đọc câu trả lời:
 * 'number' = các cụm chữ số trong câu ("67 và 68" → 67, 68);
 * 'text'   = cả ô nhập là MỘT key ("domain").
 */
export type PalaceKeyStyle = 'number' | 'text'

/**
 * Một phòng = một mẩu kiến thức được đặt vào một chỗ.
 *
 * `story` và `imageId` KHÔNG phải trang trí: thiếu hình gợi nhớ thì cung
 * điện tụt xuống thành danh sách phẳng, tức là đúng thứ mà phương pháp
 * này sinh ra để thay thế.
 */
export interface PalaceRoom {
  id: string
  /** 1..floors của tòa nhà, đếm từ tầng trệt lên. */
  floor: number
  /** 1..roomsPerFloor, đếm từ trái sang trái phải. */
  position: number
  /** Vế chính, chấm theo TẬP HỢP: đa số 1 phần tử; phòng DHCP là ["67","68"]. */
  keys: string[]
  /** Vế phụ — thuật ngữ nghề giữ nguyên tiếng gốc: 'HTTPS', 'Domain'... */
  name: string
  /** Cách gọi khác được chấp nhận cho vế phụ ("web bảo mật"). */
  nameAliases: string[]
  /** Hình gợi nhớ cố định của phòng (1 phòng = 1 hình, không dùng lại). */
  imageId: string
  /** Câu chuyện gợi nhớ: "phòng 443 có ổ khóa vàng". */
  story: LText
  /** Dòng chú thích nhỏ trong tour (M5 dùng cho "Chạy trên TCP"). */
  note?: LText
}

export interface Palace {
  id: string
  /** Tên tòa nhà, hiện cho người học. */
  title: LText
  /** Số tầng của tòa nhà này (M5: 5; tòa GPO: 4). */
  floors: number
  /** Số phòng mỗi tầng (M5: 3; tòa GPO: 1). */
  roomsPerFloor: number
  keyStyle: PalaceKeyStyle
  /** Nhãn ô nhập vế chính ("Số cổng" / "Bậc GPO"). */
  keyLabel: LText
  /** Nhãn ô nhập vế phụ ("Dịch vụ" / "Nghĩa của bậc"). */
  nameLabel: LText
  /** Placeholder hai ô nhập — tùy chọn. */
  keyPlaceholder?: LText
  namePlaceholder?: LText
  /**
   * Gợi ý tầng 1 khi hụt đúng một vế — lời may đo thay cho nhãn khô
   * ("con số ghi trên cửa" thay vì "Số cổng"). Thiếu thì UI rơi về nhãn.
   */
  keyHint?: LText
  nameHint?: LText
  rooms: PalaceRoom[]
}

/** Tổng số phòng theo kích thước tòa nhà đã khai. */
export function roomCountOf(palace: Pick<Palace, 'floors' | 'roomsPerFloor'>): number {
  return palace.floors * palace.roomsPerFloor
}

// ---------------------------------------------------------------
// Kiểm cấu trúc
// ---------------------------------------------------------------

/**
 * Mã lỗi CẤU TRÚC của tòa nhà — lỗi soạn bài, không phải thứ người học
 * gặp. Tách khỏi lỗi "người học nhớ sai" y như bên lab tách lỗi cấu
 * trúc sơ đồ khỏi lỗi cấu hình mạng.
 */
export type PalaceProblemCode =
  | 'room-count'
  | 'duplicate-room-id'
  | 'floor-out-of-range'
  | 'position-out-of-range'
  | 'duplicate-slot'
  | 'empty-slot'
  | 'duplicate-key'
  | 'empty-key'
  | 'duplicate-image'
  | 'duplicate-name'
  | 'no-keys'

export interface PalaceProblem {
  code: PalaceProblemCode
  /** Chỗ sai: id phòng, hoặc "tầng-vị trí" với lỗi về ô lưới. */
  where: string
}

/**
 * Kiểm tòa nhà có dùng làm cung điện được không. Trả về DANH SÁCH lỗi
 * (không ném) để người soạn bài thấy hết một lượt — cùng quy ước với
 * validateTopology bên lab.
 */
export function validatePalace(palace: Palace): PalaceProblem[] {
  const problems: PalaceProblem[] = []
  const add = (code: PalaceProblemCode, where: string) => problems.push({ code, where })
  const total = roomCountOf(palace)

  if (palace.rooms.length !== total) {
    add('room-count', `${palace.rooms.length}/${total}`)
  }

  const seenIds = new Set<string>()
  const seenSlots = new Set<string>()
  const keyOwner = new Map<string, string>()
  const imageOwner = new Map<string, string>()
  const nameOwner = new Map<string, string>()

  for (const room of palace.rooms) {
    if (seenIds.has(room.id)) add('duplicate-room-id', room.id)
    seenIds.add(room.id)

    if (!Number.isInteger(room.floor) || room.floor < 1 || room.floor > palace.floors) {
      add('floor-out-of-range', room.id)
    }
    if (!Number.isInteger(room.position) || room.position < 1 || room.position > palace.roomsPerFloor) {
      add('position-out-of-range', room.id)
    }

    const slot = slotKey(room.floor, room.position)
    if (seenSlots.has(slot)) add('duplicate-slot', slot)
    seenSlots.add(slot)

    if (room.keys.length === 0) add('no-keys', room.id)
    for (const key of room.keys) {
      const norm = normalizeAnswer(key)
      if (norm.length === 0) {
        add('empty-key', room.id)
        continue
      }
      // Một key nằm ở hai phòng thì người học nhớ đúng vẫn bị chấm nhập
      // nhằng — và tệ hơn, hai chỗ trong cung điện đánh nhau.
      const owner = keyOwner.get(norm)
      if (owner !== undefined) add('duplicate-key', `${key} (${owner}, ${room.id})`)
      else keyOwner.set(norm, room.id)
    }

    // Hai phòng chung một hình = hai chỗ trông giống nhau trong cung điện,
    // đúng kiểu nhiễu mà phương pháp này phải tránh.
    const imgOwner = imageOwner.get(room.imageId)
    if (imgOwner !== undefined) add('duplicate-image', `${room.imageId} (${imgOwner}, ${room.id})`)
    else imageOwner.set(room.imageId, room.id)

    const nameKey = normalizeAnswer(room.name)
    const nmOwner = nameOwner.get(nameKey)
    if (nmOwner !== undefined) add('duplicate-name', `${room.name} (${nmOwner}, ${room.id})`)
    else nameOwner.set(nameKey, room.id)
  }

  // Lưới phải kín: mọi ô (tầng, vị trí) đều có phòng. Chỉ kiểm khi số
  // phòng đã đúng — thiếu phòng thì lỗi 'room-count' đã nói rồi.
  if (palace.rooms.length === total) {
    for (let floor = 1; floor <= palace.floors; floor += 1) {
      for (let position = 1; position <= palace.roomsPerFloor; position += 1) {
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

/** Phòng chứa một key (tra ngược: "3389 nằm ở phòng nào?"). */
export function roomByKey(palace: Palace, key: string): PalaceRoom | null {
  const norm = normalizeAnswer(key)
  return palace.rooms.find((r) => r.keys.some((k) => lenientEquals(normalizeAnswer(k), norm))) ?? null
}

/** Vị trí của phòng trong lộ trình (0-based); -1 nếu không thuộc tòa nhà. */
export function routeIndexOf(palace: Palace, roomId: string): number {
  return tourRoute(palace).findIndex((r) => r.id === roomId)
}

/**
 * Mọi cách gõ được chấp nhận cho vế phụ của một phòng. Tách ra để cả bộ
 * chấm lẫn schema (kiểm nhập nhằng giữa các phòng) dùng chung một nguồn.
 */
export function nameAnswers(room: PalaceRoom): string[] {
  return [room.name, ...room.nameAliases]
}
