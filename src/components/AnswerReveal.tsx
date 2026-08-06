// Hiển thị đáp án sau khi trả lời — feedback tức thời (đúng hay sai đều
// thấy đáp án chuẩn + vì sao). Dùng chung cho LessonPlayer (pretest,
// practice, retrieval) và màn thi mastery (phần "ý cần ôn lại").
// Toàn bộ CHỈ-ĐỌC: chấm điểm đã khóa trong runtime/kết quả thi.

import type { Question } from '../engine/contentSchema'
import type { QuestionResponse } from '../engine/grading/gradeQuestion'
import { useT } from '../i18n'

/**
 * Đáp án chuẩn dạng chữ để hiển thị.
 *
 * Trả `null` cho bài lab: một sơ đồ mạng không rút gọn được thành một
 * dòng chữ, và mọi lời giải chạy được đều hợp lệ (chấm theo hành vi chứ
 * không so với sơ đồ mẫu). Với lab, phần "vì sao" mới là thứ đáng đọc.
 * Cũng trả `null` cho chuyến đi cung điện: đáp án của từng phòng đã hiện
 * ngay tại phòng đó trong lúc đi, nhắc lại cả chuyến ở đây là thừa.
 */
export function canonicalAnswer(q: Question): string | null {
  switch (q.kind) {
    case 'typed':
      return q.accept[0] ?? ''
    case 'mcq':
      return q.choices[q.answerIndex]?.vi ?? ''
    case 'order':
      return q.items.map((it) => it.vi).join(' → ')
    case 'lab':
    case 'palace-walk':
      return null
  }
}

/** Câu trả lời của người học dạng chữ; `null` khi không diễn đạt bằng chữ được. */
export function formatResponse(q: Question, r: QuestionResponse): string | null {
  switch (r.kind) {
    case 'typed':
      return r.text
    case 'mcq':
      return q.kind === 'mcq' ? (q.choices[r.choiceIndex]?.vi ?? '') : ''
    case 'order':
      return q.kind === 'order' ? r.order.map((i) => q.items[i]?.vi ?? '').join(' → ') : ''
    case 'lab':
      // Sơ đồ người học lắp được xem lại ngay trên phòng lab, không phải ở đây.
      return null
    case 'palace-walk':
      // Chuyến đi đã tự kể lại kết quả từng phòng trên bản đồ tòa nhà.
      return null
  }
}

export function AnswerReveal({
  question,
  response,
  explanation,
}: {
  question: Question
  response?: QuestionResponse
  /** 1 dòng "vì sao": Exercise dùng solution, câu độc lập dùng explain. */
  explanation?: string
}) {
  const t = useT()
  const learnerAnswer = response === undefined ? null : formatResponse(question, response)
  const answer = canonicalAnswer(question)
  return (
    <div className="flex flex-col gap-1.5 rounded-md border border-edge bg-panel px-4 py-3 text-sm">
      {learnerAnswer !== null && (
        <p className="text-ink-muted">
          <span className="font-semibold">{t('lesson.yourAnswerLabel')}: </span>
          {learnerAnswer}
        </p>
      )}
      {answer !== null && (
        <p className="text-ink">
          <span className="font-semibold text-accent">{t('lesson.answerLabel')}: </span>
          {answer}
        </p>
      )}
      {explanation !== undefined && <p className="leading-relaxed text-ink-muted">{explanation}</p>}
    </div>
  )
}
