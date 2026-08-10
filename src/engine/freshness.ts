// "Độ tươi" của trí nhớ (kho ý tưởng A1) — suy từ chính dữ liệu SM-2 đã
// có, không thêm một byte persist nào.
//
// Vì sao đáng có: lý do quay lại app hiện nay là streak — một sợi dây
// trói bằng cảm giác mất mát. Thứ đúng khoa học hơn nằm ngay trong hộp
// ôn tập: trí mhớ của chính người học đang nguội dần, và họ chưa bao giờ
// được NHÌN THẤY điều đó. "Ba thẻ sắp mờ" là lý do quay lại nói thật.
//
// CÁCH TÍNH, khai thẳng để không ai tưởng đây là đường quên Ebbinghaus:
// độ tươi = PHẦN QUÃNG NGHỈ CÒN LẠI tới ngày đến hạn, tính tuyến tính
// trên chính khoảng cách SM-2 đang giao cho thẻ đó. Vừa ôn xong = 1,
// đến hạn = 0, quá hạn = 0. App không đo được trí nhớ thật của ai; nó
// chỉ nói được "so với lịch mà chính app đặt ra, thẻ này đã nguội bao
// nhiêu" — và nói đúng chừng đó thôi.
//
// MỘT LUẬT SƯ PHẠM đi kèm: con số này KHÔNG được hiện lúc người học
// đang cố nhớ lại một thẻ. "Trí nhớ còn 12%" đọc trước khi lật là lời
// mời bỏ cuộc, và nó bẻ gãy đúng động tác retrieval mà cả hộp ôn tập
// sinh ra để tạo. Chỗ của nó là trang Học và trang Hồ sơ.
//
// Technical contract: thuần TS, tất định, `today` bơm từ ngoài.

import { INTERVALS_DAYS } from './sm2'
import { diffDays } from './dates'
import type { ISODate, ReviewCard } from './types'

/** Dưới ngưỡng này thì thẻ coi như ĐANG MỜ — sắp tới lượt phải nhớ lại. */
export const FADING_THRESHOLD = 0.25

/**
 * Độ tươi của một thẻ, 0..1. Vừa ôn xong là 1, tới hạn là 0, quá hạn
 * cũng là 0 (không có số âm: "quên hơn cả quên" không có nghĩa gì).
 *
 * Mốc bắt đầu là lần nhớ lại GẦN NHẤT, thẻ chưa ôn lần nào thì lấy ngày
 * sinh ra — cùng cái mốc mà `createCard`/`reviewCard` dùng để đặt hạn,
 * nên hai bên không bao giờ nói lệch nhau.
 */
export function cardFreshness(card: ReviewCard, today: ISODate): number {
  const span = INTERVALS_DAYS[card.intervalIndex]
  const from = card.lastReviewedOn ?? card.createdOn
  const elapsed = diffDays(from, today)
  if (elapsed <= 0) return 1
  if (elapsed >= span) return 0
  return 1 - elapsed / span
}

/** Số ngày còn lại tới hạn (0 nếu đã tới hoặc quá hạn). */
export function daysUntilDue(card: ReviewCard, today: ISODate): number {
  return Math.max(0, diffDays(today, card.dueDate))
}

/**
 * Thẻ ĐANG MỜ: chưa tới hạn (chưa ôn được — luật giãn cách vẫn giữ)
 * nhưng quãng nghỉ chỉ còn dưới một phần tư.
 *
 * Cố ý LOẠI thẻ đã đến hạn: thẻ đến hạn đã có đường đi riêng ("vào ôn
 * tập"), gộp chung sẽ đếm một thẻ hai lần ở hai chỗ trên cùng màn hình.
 */
export function fadingCards(cards: readonly ReviewCard[], today: ISODate): ReviewCard[] {
  return cards.filter((c) => daysUntilDue(c, today) > 0 && cardFreshness(c, today) <= FADING_THRESHOLD)
}

export interface MemoryOverview {
  /** Thẻ đến hạn hôm nay (hoặc quá hạn) — việc phải làm. */
  due: number
  /** Thẻ đang mờ nhưng chưa tới lượt. */
  fading: number
  /** Thẻ còn tươi. */
  fresh: number
  total: number
  /** Độ tươi trung bình của TOÀN hộp, 0..1 — null khi hộp rỗng. */
  averageFreshness: number | null
}

/** Bức tranh cả hộp ôn tập trong một cái liếc. */
export function memoryOverview(cards: readonly ReviewCard[], today: ISODate): MemoryOverview {
  let due = 0
  let fading = 0
  let sum = 0
  for (const card of cards) {
    const fresh = cardFreshness(card, today)
    sum += fresh
    if (daysUntilDue(card, today) === 0) due += 1
    else if (fresh <= FADING_THRESHOLD) fading += 1
  }
  return {
    due,
    fading,
    fresh: cards.length - due - fading,
    total: cards.length,
    averageFreshness: cards.length === 0 ? null : sum / cards.length,
  }
}

export interface ModuleMemory {
  moduleId: string
  cards: number
  /** Độ tươi trung bình của các thẻ thuộc module này. */
  freshness: number
  due: number
}

/**
 * Trí nhớ theo TỪNG MODULE — bản đồ "mình đang giữ được những gì".
 * Thứ tự đầu ra theo `moduleOrder` truyền vào (thứ tự lộ trình), không
 * theo độ tươi: bản đồ phải đứng yên giữa hai lần mở, nếu không người
 * học mất luôn cảm giác chỗ nào là chỗ nào.
 */
export function memoryByModule(
  cards: readonly ReviewCard[],
  today: ISODate,
  moduleOrder: readonly string[],
): ModuleMemory[] {
  const rank = new Map(moduleOrder.map((id, i) => [id, i]))
  const groups = new Map<string, ReviewCard[]>()
  for (const card of cards) {
    const list = groups.get(card.moduleId)
    if (list === undefined) groups.set(card.moduleId, [card])
    else list.push(card)
  }
  return [...groups.entries()]
    .map(([moduleId, list]) => ({
      moduleId,
      cards: list.length,
      freshness: list.reduce((sum, c) => sum + cardFreshness(c, today), 0) / list.length,
      due: list.filter((c) => daysUntilDue(c, today) === 0).length,
    }))
    .sort((a, b) => (rank.get(a.moduleId) ?? 999) - (rank.get(b.moduleId) ?? 999))
}
