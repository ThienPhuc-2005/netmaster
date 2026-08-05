// Hiển thị đáp án sau khi trả lời — feedback tức thời (đúng hay sai đều
// thấy đáp án chuẩn + vì sao). Dùng chung cho LessonPlayer (pretest,
// practice, retrieval) và màn thi mastery (phần "ý cần ôn lại").
// Toàn bộ CHỈ-ĐỌC: chấm điểm đã khóa trong runtime/kết quả thi.

import type { Question } from '../engine/contentSchema'
import type { QuestionResponse } from '../engine/grading/gradeQuestion'
import { useT } from '../i18n'

/** Đáp án chuẩn dạng chữ để hiển thị. */
export function canonicalAnswer(q: Question): string {
  switch (q.kind) {
    case 'typed':
      return q.accept[0] ?? ''
    case 'mcq':
      return q.choices[q.answerIndex]?.vi ?? ''
    case 'order':
      return q.items.map((it) => it.vi).join(' → ')
  }
}

/** Câu trả lời của người học dạng chữ. */
export function formatResponse(q: Question, r: QuestionResponse): string {
  switch (r.kind) {
    case 'typed':
      return r.text
    case 'mcq':
      return q.kind === 'mcq' ? (q.choices[r.choiceIndex]?.vi ?? '') : ''
    case 'order':
      return q.kind === 'order' ? r.order.map((i) => q.items[i]?.vi ?? '').join(' → ') : ''
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
  return (
    <div className="flex flex-col gap-1.5 rounded-md border border-edge bg-panel px-4 py-3 text-sm">
      {response !== undefined && (
        <p className="text-ink-muted">
          <span className="font-semibold">{t('lesson.yourAnswerLabel')}: </span>
          {formatResponse(question, response)}
        </p>
      )}
      <p className="text-ink">
        <span className="font-semibold text-accent">{t('lesson.answerLabel')}: </span>
        {canonicalAnswer(question)}
      </p>
      {explanation !== undefined && <p className="leading-relaxed text-ink-muted">{explanation}</p>}
    </div>
  )
}
