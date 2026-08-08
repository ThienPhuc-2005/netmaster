// Hiển thị đáp án sau khi trả lời — feedback tức thời (đúng hay sai đều
// thấy đáp án chuẩn + vì sao). Dùng chung cho LessonPlayer (pretest,
// practice, retrieval) và màn thi mastery (phần "ý cần ôn lại").
// Toàn bộ CHỈ-ĐỌC: chấm điểm đã khóa trong runtime/kết quả thi.

import type { Question } from '../engine/contentSchema'
import { lt, maybeLt } from '../engine/ltext'
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
      return maybeLt(q.choices[q.answerIndex]) ?? ''
    case 'order':
      return q.items.map((it) => lt(it)).join(' → ')
    case 'lab':
    case 'palace-walk':
      return null
    case 'clinic': {
      // Sơ đồ đã sửa không rút gọn thành chữ được (như lab), nhưng TÊN
      // BỆNH thì có — và đó chính là thứ đáng đọc lại. Ca chọn-hành-động
      // nêu luôn hành động đúng.
      const diagnosis = maybeLt(q.diagnosis.choices[q.diagnosis.answerIndex]) ?? ''
      const action = maybeLt(q.actions?.choices[q.actions.answerIndex])
      return action === undefined ? diagnosis : `${diagnosis} → ${action}`
    }
    case 'ps':
      // Lệnh mẫu chính là "đáp án chuẩn" của bài terminal — tầng cuối
      // của thang gợi ý mờ dần. Mọi cách viết khác đạt mục tiêu vẫn được
      // chấm đúng; đây chỉ là bản tham chiếu để đọc lại.
      return q.spec.solution.join('  ·  ')
  }
}

/** Câu trả lời của người học dạng chữ; `null` khi không diễn đạt bằng chữ được. */
export function formatResponse(q: Question, r: QuestionResponse): string | null {
  switch (r.kind) {
    case 'typed':
      return r.text
    case 'mcq':
      return q.kind === 'mcq' ? (maybeLt(q.choices[r.choiceIndex]) ?? '') : ''
    case 'order':
      return q.kind === 'order' ? r.order.map((i) => maybeLt(q.items[i]) ?? '').join(' → ') : ''
    case 'lab':
      // Sơ đồ người học lắp được xem lại ngay trên phòng lab, không phải ở đây.
      return null
    case 'palace-walk':
      // Chuyến đi đã tự kể lại kết quả từng phòng trên bản đồ tòa nhà.
      return null
    case 'clinic': {
      if (q.kind !== 'clinic') return ''
      const diagnosis = maybeLt(q.diagnosis.choices[r.diagnosisIndex]) ?? ''
      if (r.fix.kind === 'choose-action') {
        const action = maybeLt(q.actions?.choices[r.fix.actionIndex])
        return action === undefined ? diagnosis : `${diagnosis} → ${action}`
      }
      // Sơ đồ đã sửa xem lại ngay trong phòng khám, không phải ở đây.
      return diagnosis
    }
    case 'ps':
      // Cả phiên gõ lệnh xem lại ngay trên terminal, không phải ở đây.
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
