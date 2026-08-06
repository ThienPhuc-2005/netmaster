// Cung điện → Hộp ôn tập (spec Module 5: "Port cũng vào Spaced Repetition").
//
// QUYẾT ĐỊNH: mỗi phòng một thẻ riêng, tức 15 thẻ, KHÔNG phải một thẻ
// "cả tòa nhà". Lý do là cơ chế SM-2: mỗi thẻ có lịch riêng, nên port
// nào hay quên sẽ tự được hỏi dày lên, port đã thuộc thì giãn ra. Gộp 15
// port vào một thẻ thì port dễ kéo port khó đi theo, và một lần vấp ở
// một port sẽ reset lịch của cả 14 port kia — vừa oan vừa tốn thời gian
// của người học.
//
// Cách nối vào hệ có sẵn: thẻ cung điện dùng ĐÚNG kiểu ReviewCard đang
// có, chỉ khác ở khóa nhận diện — `palace:<roomId>` thay vì conceptId.
// Nhờ tiền tố này, hàng đợi ôn tập, SM-2, luật "mở app là ôn trước" và
// dữ liệu đã lưu của người học chạy nguyên không phải sửa gì; tầng nội
// dung chỉ cần biết tra thẻ có tiền tố thì hỏi cung điện thay vì hỏi
// danh sách khái niệm.

import { createCard } from '../sm2'
import type { ISODate, ReviewCard } from '../types'
import { roomById, tourRoute, type Palace, type PalaceRoom } from './palace'

/** Tiền tố phân biệt thẻ-phòng với thẻ-khái niệm trong cùng một hộp. */
export const PALACE_CARD_PREFIX = 'palace:'

export function palaceCardId(roomId: string): string {
  return `${PALACE_CARD_PREFIX}${roomId}`
}

export function isPalaceCardId(cardId: string): boolean {
  return cardId.startsWith(PALACE_CARD_PREFIX)
}

/** Lấy lại roomId từ khóa thẻ; null nếu thẻ này không phải thẻ cung điện. */
export function roomIdFromCardId(cardId: string): string | null {
  return isPalaceCardId(cardId) ? cardId.slice(PALACE_CARD_PREFIX.length) : null
}

/** Phòng tương ứng với một thẻ — null nếu thẻ không thuộc cung điện này. */
export function roomForCard(palace: Palace, cardId: string): PalaceRoom | null {
  const roomId = roomIdFromCardId(cardId)
  return roomId === null ? null : roomById(palace, roomId)
}

/**
 * Sinh thẻ ôn cho cả tòa nhà, theo THỨ TỰ LỘ TRÌNH (thẻ đầu tiên là
 * phòng đầu tiên) — hàng đợi ôn tập sẽ trộn xen kẽ sau, nhưng dữ liệu
 * sinh ra vẫn giữ trật tự của cung điện cho dễ đọc lúc gỡ lỗi.
 *
 * `existingCardIds` là các thẻ người học đã có: phòng đã có thẻ giữ
 * nguyên lịch ôn, không bị đặt lại về 1 ngày khi đi tour lần nữa —
 * cùng luật với thẻ khái niệm khi một khái niệm được dạy lại.
 *
 * Mọi phòng vào hộp với cùng một lịch khởi điểm (1 ngày) như thẻ mới
 * bình thường: nhớ được ngay lần đầu là chuyện của MỘT lần đi, chưa đủ
 * để kết luận đã thuộc — SM-2 sẽ tự giãn ra sau vài lần ôn đúng.
 */
export function palaceReviewCards(
  palace: Palace,
  moduleId: string,
  learnedOn: ISODate,
  existingCardIds: Iterable<string> = [],
): ReviewCard[] {
  const existing = new Set(existingCardIds)
  return tourRoute(palace)
    .map((room) => palaceCardId(room.id))
    .filter((cardId) => !existing.has(cardId))
    .map((cardId) => createCard(cardId, moduleId, learnedOn))
}
