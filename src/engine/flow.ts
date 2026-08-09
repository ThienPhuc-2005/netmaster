// Flow engine — độ khó thích ứng (spec 2.3).
//
// Bốn dòng spec, dịch thành cơ chế:
//   - Nhìn cửa sổ 10 câu gần nhất (answerHistory, có từ Phase 1).
//   - Đúng > 90% → TĂNG độ khó: câu trắc nghiệm đổi thành câu hỏi mở.
//   - Đúng < 60% → CHÈN bài ôn nền tảng liên quan trước khi học mới.
//   - 60-90% là vùng flow: không đụng vào gì cả. Hai ngưỡng kia là bộ
//     truyền động; vùng 70-85 của spec là ĐÍCH, không phải một ngưỡng.
//
// Hai quyết định đã chốt với người dùng:
//   - Tăng độ khó bằng PHÉP SUY CƠ HỌC, không cần viết thêm nội dung:
//     bản gõ tay của câu trắc nghiệm giữ nguyên đề, đáp án chấp nhận là
//     chữ của lựa chọn đúng. "Tình huống lạ hơn" (ví dụ thứ hai của
//     spec) cần nội dung viết tay — để mở, chưa làm ở hạng mục này.
//   - Cửa sổ 10 câu trộn MỌI nguồn retrieval (bài tập, thẻ ôn, drill,
//     thi) — spec không phân biệt, và mọi lần nhớ lại đều là tín hiệu.
//
// Bất biến của src/engine: thuần TS, không React, không localStorage,
// không tự lấy giờ — store bơm dữ liệu vào.

import type { AnswerRecord } from './types'
import { HISTORY_CAP, accuracyPct } from './answerHistory'
import { conceptIdsInLesson, orderedLessonIds } from './contentPure'
import type { Lesson, McqQuestion, Module, TypedQuestion } from './contentSchema'
import { normalizeAnswer } from './grading/normalize'

/** Đúng > 90% trên cửa sổ đầy → tăng độ khó (spec 2.3, nghĩa đen dấu ">"). */
export const HARDER_ABOVE_PCT = 90

/** Đúng < 60% trên cửa sổ đầy → chèn ôn nền tảng (nghĩa đen dấu "<"). */
export const SUPPORT_BELOW_PCT = 60

/**
 * Sau một phiên củng cố, phải có thêm ít nhất chừng này câu trả lời mới
 * trước khi được chèn phiên nữa — không thì người đang yếu sẽ bị nhốt
 * trong vòng ôn vô hạn, không bao giờ tới được bài để gỡ điểm.
 */
export const SUPPORT_COOLDOWN_ANSWERS = 5

export type FlowMode = 'harder' | 'steady' | 'support'

/**
 * Chế độ hiện tại theo cửa sổ 10 câu gần nhất. CHỈ kích hoạt khi cửa sổ
 * ĐẦY — "10 câu gần nhất" của spec là đúng 10 câu, và phán 3 câu đầu
 * phiên là 66% rồi đè điều chỉnh lên người mới học thì vừa sai chữ vừa
 * sai tinh thần.
 */
export function flowMode(history: readonly AnswerRecord[]): FlowMode {
  if (history.length < HISTORY_CAP) return 'steady'
  const pct = accuracyPct([...history])
  if (pct === null) return 'steady'
  if (pct > HARDER_ABOVE_PCT) return 'harder'
  if (pct < SUPPORT_BELOW_PCT) return 'support'
  return 'steady'
}

// ---------------------------------------------------------------
// Tăng độ khó: trắc nghiệm → câu hỏi mở (suy cơ học)
// ---------------------------------------------------------------

/**
 * Trần độ dài của lựa chọn đúng để câu còn "gõ được". Lựa chọn là cả
 * một mệnh đề ("Đưa bạn tới một trang web: tra tên miền rồi mở trang")
 * thì bắt gõ nguyên văn là đánh đố trí gõ phím chứ không phải trí nhớ —
 * câu như vậy giữ nguyên trắc nghiệm.
 */
const MAX_OPEN_ANSWER_LENGTH = 24

/** Các câu trả lời gõ tay được chấp nhận cho một câu trắc nghiệm. */
export function openAcceptsOf(q: McqQuestion): string[] {
  const choice = q.choices[q.answerIndex]
  if (choice === undefined) return []
  const accepts = [choice.vi]
  if (choice.en !== undefined) accepts.push(choice.en)
  return accepts
}

/** Câu trắc nghiệm này có bản gõ tay hợp lý không. */
export function canDeriveOpen(q: McqQuestion): boolean {
  const accepts = openAcceptsOf(q)
  if (accepts.length === 0) return false
  const vi = normalizeAnswer(accepts[0]!)
  return vi.length > 0 && vi.length <= MAX_OPEN_ANSWER_LENGTH
}

/**
 * Bản gõ tay của một câu trắc nghiệm: cùng id (trạng thái chấm trong
 * runtime không đổi), cùng đề, đáp án là chữ của lựa chọn đúng. Đề đã
 * viết cho trắc nghiệm nên vẫn đọc tự nhiên khi thành câu hỏi mở.
 */
export function deriveOpenQuestion(q: McqQuestion): TypedQuestion {
  if (!canDeriveOpen(q)) {
    throw new Error(`deriveOpenQuestion: câu "${q.id}" không có bản gõ tay hợp lý — hỏi canDeriveOpen trước`)
  }
  return {
    kind: 'typed',
    id: q.id,
    prompt: q.prompt,
    accept: openAcceptsOf(q),
    ...(q.hintTopic !== undefined ? { hintTopic: q.hintTopic } : {}),
    ...(q.explain !== undefined ? { explain: q.explain } : {}),
  }
}

// ---------------------------------------------------------------
// Chèn ôn nền tảng: chọn khái niệm nền của bài sắp học
// ---------------------------------------------------------------

/**
 * Khái niệm NỀN của một bài = khái niệm đã dạy ở các bài TRƯỚC nó trong
 * cùng module; bài đứng đầu module thì nền là toàn bộ khái niệm của
 * module liền trước. Trả theo thứ tự GẦN NHẤT TRƯỚC (bài liền kề dạy gì
 * thì ôn cái đó trước) — tầng UI cắt lấy vài thẻ đầu.
 */
export function foundationConceptIds(
  module: Module,
  lesson: Lesson,
  previousModule: Module | null,
): string[] {
  const order = orderedLessonIds(module)
  const position = order.indexOf(lesson.id)
  const byId = new Map(module.lessons.map((l) => [l.id, l]))

  const seen = new Set<string>()
  const out: string[] = []
  const add = (conceptId: string) => {
    if (!seen.has(conceptId)) {
      seen.add(conceptId)
      out.push(conceptId)
    }
  }

  // Đi lùi từ bài liền trước về đầu module.
  for (let i = position - 1; i >= 0; i -= 1) {
    const earlier = byId.get(order[i]!)
    if (earlier !== undefined) for (const cid of conceptIdsInLesson(earlier)) add(cid)
  }

  // Đầu module → mượn nền của module trước, cũng theo lối gần nhất trước.
  if (out.length === 0 && previousModule !== null) {
    const prevOrder = orderedLessonIds(previousModule)
    const prevById = new Map(previousModule.lessons.map((l) => [l.id, l]))
    for (let i = prevOrder.length - 1; i >= 0; i -= 1) {
      const earlier = prevById.get(prevOrder[i]!)
      if (earlier !== undefined) for (const cid of conceptIdsInLesson(earlier)) add(cid)
    }
  }

  return out
}

/**
 * Có nên chèn phiên củng cố NGAY BÂY GIỜ không: đang ở chế độ support,
 * và đã qua thời gian nguội kể từ phiên củng cố trước (đếm bằng số câu
 * trả lời mới, không đếm bằng đồng hồ — người học nghỉ một tuần không
 * có nghĩa là đã vững lên).
 */
export function needsSupport(
  history: readonly AnswerRecord[],
  answerTotal: number,
  supportShownAtTotal: number | null,
): boolean {
  if (flowMode(history) !== 'support') return false
  if (supportShownAtTotal === null) return true
  return answerTotal - supportShownAtTotal >= SUPPORT_COOLDOWN_ANSWERS
}
