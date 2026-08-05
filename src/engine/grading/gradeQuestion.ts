// Chấm một câu hỏi theo kind (spec 2.1 bước 4-5). Engine chỉ trả
// đúng/sai — phản hồi 3 tầng khi sai (spec 4.4) do tầng UI dựng từ kết
// quả này cộng với hintTopic/hint/solution có sẵn trong nội dung bài.

import type { LText, Question } from '../contentSchema'
import { typedAnswerMatches } from './normalize'

/** Câu trả lời người học nộp lên — kind phải trùng kind của Question. */
export type QuestionResponse =
  | { kind: 'typed'; text: string }
  | { kind: 'mcq'; choiceIndex: number }
  /**
   * `order` = mảng CHỈ SỐ ITEM GỐC theo thứ tự người học xếp.
   * `items` trong nội dung liệt kê theo thứ tự đúng; UI xáo trộn khi
   * hiển thị rồi quy đổi về chỉ số gốc khi nộp — nên đáp án đúng luôn
   * là [0, 1, 2, ...] bất kể xáo trộn thế nào.
   */
  | { kind: 'order'; order: number[] }

/** Kind lệch nhau là bug ở tầng UI (nộp nhầm loại), không phải người học sai. */
function kindMismatch(q: Question, r: QuestionResponse): Error {
  return new Error(
    `gradeQuestion: response kind "${r.kind}" khác question kind "${q.kind}" (câu "${q.id}") — lỗi lập trình ở tầng UI`,
  )
}

/**
 * Câu trả lời SAI nhưng CẬN-ĐÚNG (khớp một nhóm nearMisses của câu gõ
 * tay) → trả về feedback may đo của nhóm đó để UI thay cho lời tầng-1
 * chung chung. Vẫn là câu sai — thang 3 tầng không đổi. Trả null khi
 * không cận-đúng hoặc câu không khai nearMisses.
 */
export function findNearMiss(q: Question, r: QuestionResponse): LText | null {
  if (q.kind !== 'typed' || r.kind !== 'typed' || q.nearMisses === undefined) return null
  for (const nm of q.nearMisses) {
    if (typedAnswerMatches(r.text, nm.accept)) return nm.feedback
  }
  return null
}

export function gradeQuestion(q: Question, r: QuestionResponse): boolean {
  // Switch on the response kind so TypeScript narrows both sides;
  // the guard inside each branch narrows `q` to the matching variant.
  switch (r.kind) {
    case 'typed':
      if (q.kind !== 'typed') throw kindMismatch(q, r)
      return typedAnswerMatches(r.text, q.accept)
    case 'mcq':
      if (q.kind !== 'mcq') throw kindMismatch(q, r)
      return r.choiceIndex === q.answerIndex
    case 'order':
      if (q.kind !== 'order') throw kindMismatch(q, r)
      // Đúng khi xếp lại đủ và đúng thứ tự gốc: order[i] === i với mọi i.
      return r.order.length === q.items.length && r.order.every((itemIndex, pos) => itemIndex === pos)
  }
}
