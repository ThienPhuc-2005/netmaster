// Bộ nhập câu trả lời cho 3 dạng câu hỏi của content schema.
// Ưu tiên GÕ đáp án (generation effect — spec 2.1 bước 4); trắc nghiệm
// và xếp thứ tự dùng đúng chỗ nội dung yêu cầu. Component chỉ thu thập
// QuestionResponse — việc chấm thuộc grading/ (gọi qua store).

import { useMemo, useState, type FormEvent } from 'react'
import { CornerDownLeft, RotateCcw } from 'lucide-react'
import type { Question } from '../engine/contentSchema'
import type { QuestionResponse } from '../engine/grading/gradeQuestion'
import { useT } from '../i18n'
import { Button } from './Button'
import { NetworkLab } from '../features/lab/NetworkLab'
import { ClinicRoom } from '../features/clinic/ClinicRoom'
import { PsConsole } from '../features/ps/PsConsole'
import { PalaceWalk } from '../features/palace/PalaceWalk'
import { findPalaceRoom } from '../content'

interface QuestionInputProps {
  question: Question
  onSubmit: (response: QuestionResponse) => void
  disabled?: boolean
}

function TypedInput({ question, onSubmit, disabled }: QuestionInputProps & { question: Extract<Question, { kind: 'typed' }> }) {
  const t = useT()
  const [text, setText] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim() === '') return
    onSubmit({ kind: 'typed', text })
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('lesson.typedPlaceholder')}
        disabled={disabled}
        autoFocus
        className="flex-1 rounded-md border border-edge bg-panel px-3 py-2 text-sm text-ink placeholder:text-ink-muted disabled:opacity-50"
      />
      <Button type="submit" disabled={disabled || text.trim() === ''}>
        <CornerDownLeft size={15} aria-hidden />
        {t('lesson.check')}
      </Button>
    </form>
  )
}

function McqInput({ question, onSubmit, disabled }: QuestionInputProps & { question: Extract<Question, { kind: 'mcq' }> }) {
  return (
    <div className="flex flex-col gap-2">
      {question.choices.map((choice, i) => (
        <button
          key={i}
          disabled={disabled}
          onClick={() => onSubmit({ kind: 'mcq', choiceIndex: i })}
          className="rounded-md border border-edge bg-panel px-4 py-2.5 text-left text-sm text-ink transition-colors duration-(--dur) hover:border-accent hover:bg-panel-hover disabled:opacity-50"
        >
          {choice.vi}
        </button>
      ))}
    </div>
  )
}

function OrderInput({ question, onSubmit, disabled }: QuestionInputProps & { question: Extract<Question, { kind: 'order' }> }) {
  const t = useT()
  // Xáo trộn MỘT LẦN khi câu hỏi xuất hiện; đáp án nộp là dãy CHỈ SỐ GỐC
  // theo thứ tự người học chọn (hợp đồng của gradeQuestion).
  const shuffled = useMemo(() => {
    const idx = question.items.map((_, i) => i)
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[idx[i], idx[j]] = [idx[j]!, idx[i]!]
    }
    return idx
  }, [question.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const [picked, setPicked] = useState<number[]>([])

  const remaining = shuffled.filter((i) => !picked.includes(i))

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-ink-muted">{t('lesson.orderHelp')}</p>
      <div className="flex flex-col gap-2">
        {remaining.map((originalIndex) => (
          <button
            key={originalIndex}
            disabled={disabled}
            onClick={() => setPicked((p) => [...p, originalIndex])}
            className="rounded-md border border-edge bg-panel px-4 py-2.5 text-left text-sm text-ink transition-colors duration-(--dur) hover:border-accent hover:bg-panel-hover disabled:opacity-50"
          >
            {question.items[originalIndex]?.vi}
          </button>
        ))}
      </div>

      {picked.length > 0 && (
        <div className="rounded-md border border-edge bg-panel p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{t('lesson.orderSlot')}</p>
          <ol className="flex list-inside list-decimal flex-col gap-1 text-sm text-ink">
            {picked.map((originalIndex) => (
              <li key={originalIndex}>{question.items[originalIndex]?.vi}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          disabled={disabled || picked.length !== question.items.length}
          onClick={() => onSubmit({ kind: 'order', order: picked })}
        >
          {t('lesson.check')}
        </Button>
        <Button variant="ghost" disabled={disabled || picked.length === 0} onClick={() => setPicked([])}>
          <RotateCcw size={14} aria-hidden />
          {t('lesson.orderReset')}
        </Button>
      </div>
    </div>
  )
}

export function QuestionInput({ question, onSubmit, disabled }: QuestionInputProps) {
  switch (question.kind) {
    case 'typed':
      return <TypedInput question={question} onSubmit={onSubmit} disabled={disabled} />
    case 'mcq':
      return <McqInput question={question} onSubmit={onSubmit} disabled={disabled} />
    case 'order':
      return <OrderInput question={question} onSubmit={onSubmit} disabled={disabled} />
    case 'lab':
      // Phòng lab tự lo phần thử nghiệm ("Gửi thử" không tính); chỉ khi
      // người học bấm "Nộp bài" nó mới trao sơ đồ lên đây thành một lượt
      // trả lời như mọi dạng câu hỏi khác.
      return (
        <NetworkLab
          key={question.id}
          spec={question.spec}
          onSubmit={disabled === true ? undefined : (topology) => onSubmit({ kind: 'lab', topology })}
        />
      )
    case 'palace-walk':
      return <PalaceWalkInput question={question} onSubmit={onSubmit} disabled={disabled} />
    case 'clinic':
      // Phòng khám tự lo pha khám (terminal miễn phí) và pha sửa; chỉ khi
      // người học bấm "Nộp bài" nó mới trao câu trả lời hai phần lên đây
      // thành một lượt như mọi dạng câu hỏi khác.
      return (
        <ClinicRoom
          key={question.id}
          question={question}
          onSubmit={disabled === true ? undefined : onSubmit}
        />
      )
    case 'ps':
      // Terminal PowerShell tự lo phần gõ thử (miễn phí, có bảng mục tiêu
      // sống); chỉ "Nộp bài" mới trao trạng thái phiên lên thành một lượt.
      return (
        <PsConsole
          key={question.id}
          question={question}
          onSubmit={disabled === true ? undefined : onSubmit}
        />
      )
  }
}

/**
 * Chuyến đi cung điện: câu hỏi chỉ khai DANH SÁCH PHÒNG, còn tòa nhà
 * khai một lần ở cấp module — nên chỗ này tra ngược từ phòng ra tòa nhà.
 * Chuyến đi tự khép khi đi hết đoạn đường và trao kết quả thô lên thành
 * một lượt trả lời, y như phòng lab trao sơ đồ.
 */
function PalaceWalkInput({
  question,
  onSubmit,
  disabled,
}: QuestionInputProps & { question: Extract<Question, { kind: 'palace-walk' }> }) {
  const t = useT()
  const first = question.rooms[0]
  const ref = first === undefined ? null : findPalaceRoom(first)
  if (ref === null) return <p className="text-sm text-ink-muted">{t('palace.missingRooms')}</p>
  return (
    <PalaceWalk
      key={question.id}
      palace={ref.palace}
      roomIds={question.rooms}
      onComplete={disabled === true ? undefined : (outcomes) => onSubmit({ kind: 'palace-walk', outcomes })}
    />
  )
}
