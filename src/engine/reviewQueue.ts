// Hàng đợi ôn tập (spec mục 2.2).
//
// Quy tắc sư phạm được mã hóa ở đây:
// - Nợ quá hạn vượt 30 thẻ thì KHÓA học bài mới (canStartNewLesson) —
//   trả nợ trước khi vay. Riêng luật "mỗi ngày mở app, việc ĐẦU TIÊN là
//   ôn thẻ đến hạn rồi mới học mới" (spec 2.2) là luật ĐIỀU HƯỚNG: tầng
//   routing (Khối 3) phải mở phiên ôn trước khi cho vào bài mới khi
//   dueCards() còn thẻ — engine cấp dữ liệu, không thay được UI flow.
// - Phiên ôn tối đa 15 thẻ: phiên ngắn, làm được mỗi ngày, tốt hơn
//   phiên dài làm người học ngợp rồi bỏ.
// - Thẻ trộn xen kẽ nhiều module (interleaving): buộc não tự phân biệt
//   "câu này thuộc mảng kiến thức nào" thay vì trượt theo quán tính
//   một chủ đề — khó hơn khi ôn, nhưng nhớ bền hơn hẳn ôn theo khối.
//
// Pure module: every function takes "today" as a parameter and never
// mutates its inputs.

import type { ISODate, ReviewCard } from './types'
import { isBefore, isOnOrBefore } from './dates'

/** Trần số thẻ mỗi phiên ôn (spec 2.2: "tối đa 15 thẻ/phiên"). */
export const SESSION_CAP = 15

/** Ngưỡng khóa học mới (spec 2.2: "không cho học mới khi còn > 30 thẻ quá hạn"). */
export const OVERDUE_BLOCK_THRESHOLD = 30

/** Thẻ ĐẾN HẠN: dueDate <= hôm nay — thẻ đến hạn đúng hôm nay cũng phải ôn. */
export function dueCards(cards: ReviewCard[], today: ISODate): ReviewCard[] {
  return cards.filter((c) => isOnOrBefore(c.dueDate, today))
}

/**
 * Thẻ QUÁ HẠN: dueDate < hôm nay — đúng nghĩa đen "quá hạn" trong spec.
 * Thẻ đến hạn HÔM NAY chưa phải nợ: người học còn nguyên hôm nay để ôn,
 * chưa có lý do gì để khóa bài mới.
 */
export function overdueCount(cards: ReviewCard[], today: ISODate): number {
  return cards.reduce((n, c) => (isBefore(c.dueDate, today) ? n + 1 : n), 0)
}

/**
 * Chốt chặn "trả nợ trước khi vay": còn > 30 thẻ quá hạn thì không cho
 * học bài mới. Biên đúng chữ ">" của spec: 30 thẻ quá hạn vẫn được học
 * mới, sang thẻ thứ 31 thì khóa.
 */
export function canStartNewLesson(cards: ReviewCard[], today: ISODate): boolean {
  return overdueCount(cards, today) <= OVERDUE_BLOCK_THRESHOLD
}

/**
 * Dựng phiên ôn hôm nay:
 * 1) chỉ lấy thẻ đến hạn;
 * 2) ưu tiên nợ lâu nhất — dueDate cũ nhất trước (thẻ càng trễ càng có
 *    nguy cơ quên hẳn, phải cứu trước); tie-break createdOn tăng dần,
 *    rồi moduleId, rồi conceptId — conceptId chỉ duy nhất TRONG một
 *    module nên cần moduleId trong chuỗi khóa để deterministic tuyệt đối;
 * 3) cắt còn `cap` thẻ (mặc định 15);
 * 4) trộn xen kẽ module — xem interleaveByModule.
 *
 * ISODate strings compare correctly with localeCompare-free `<`/`>`,
 * but localeCompare gives us the -1/0/1 shape sort() wants directly.
 */
export function buildReviewSession(cards: ReviewCard[], today: ISODate, cap = SESSION_CAP): ReviewCard[] {
  // dueCards returns a fresh array, so sorting in place is mutation-safe.
  const picked = dueCards(cards, today)
    .sort(
      (a, b) =>
        a.dueDate.localeCompare(b.dueDate) ||
        a.createdOn.localeCompare(b.createdOn) ||
        a.moduleId.localeCompare(b.moduleId) ||
        a.conceptId.localeCompare(b.conceptId),
    )
    .slice(0, cap)
  return interleaveByModule(picked)
}

/**
 * Trộn xen kẽ theo module (interleaving, spec 2.2: "phiên ôn trộn thẻ
 * từ nhiều module — không ôn theo khối").
 *
 * Cách trộn: round-robin tham lam — mỗi bước phát 1 thẻ từ nhóm còn
 * NHIỀU thẻ nhất mà khác module với thẻ vừa phát (nhóm đông đi trước
 * để không bị dồn cục về cuối phiên). Với các nhóm đều nhau, cách này
 * chính là round-robin thuần A-B-C-A-B-C. Với nhóm lệch, nó bảo đảm:
 * không bao giờ có 2 thẻ cùng module đứng cạnh nhau trừ khi toán học
 * không cho phép (một module chiếm quá nửa số thẻ còn lại).
 *
 * Thứ tự tương đối trong từng nhóm được bảo toàn; nhóm bằng nhau thì
 * nhóm xuất hiện trước trong input thắng → deterministic tuyệt đối,
 * không Math.random.
 */
export function interleaveByModule(cards: ReviewCard[]): ReviewCard[] {
  // Group by moduleId. Map preserves insertion order, so iteration order
  // equals first-appearance order in the input — our deterministic
  // tie-break for equally sized groups.
  const byModule = new Map<string, ReviewCard[]>()
  for (const card of cards) {
    const group = byModule.get(card.moduleId)
    if (group) group.push(card)
    else byModule.set(card.moduleId, [card])
  }

  // One queue per module; `cursor` advances from the front so relative
  // order inside each module is preserved.
  const queues = [...byModule.entries()].map(([moduleId, items]) => ({
    moduleId,
    items,
    cursor: 0,
  }))
  const remaining = (q: (typeof queues)[number]): number => q.items.length - q.cursor

  const out: ReviewCard[] = []
  let prevModule: string | null = null
  while (out.length < cards.length) {
    // Greedy pick: most cards remaining, never the module just emitted;
    // strict ">" keeps the earliest-appearing queue on ties.
    let pick: (typeof queues)[number] | null = null
    for (const q of queues) {
      if (remaining(q) === 0 || q.moduleId === prevModule) continue
      if (pick === null || remaining(q) > remaining(pick)) pick = q
    }
    if (pick === null) {
      // Mọi thẻ còn lại đều thuộc module vừa phát — trường hợp toán học
      // không thể tránh 2 thẻ cùng module liền nhau, đành phát tiếp.
      pick = queues.find((q) => remaining(q) > 0) ?? null
    }
    // Unreachable while out.length < cards.length (total remaining > 0);
    // kept as a typed guard instead of a non-null assertion.
    if (pick === null) break
    const card = pick.items[pick.cursor]
    // remaining(pick) > 0 guarantees the index is in bounds; the check
    // only narrows the noUncheckedIndexedAccess type.
    if (card !== undefined) out.push(card)
    pick.cursor += 1
    prevModule = pick.moduleId
  }
  return out
}
