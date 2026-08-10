// Bộ nhập câu trả lời cho 3 dạng câu hỏi của content schema.
// Ưu tiên GÕ đáp án (generation effect — spec 2.1 bước 4); trắc nghiệm
// và xếp thứ tự dùng đúng chỗ nội dung yêu cầu. Component chỉ thu thập
// QuestionResponse — việc chấm thuộc grading/ (gọi qua store).

import { Suspense, lazy, useMemo, useRef, useState, type FormEvent } from 'react'
import { lt, maybeLt } from '../engine/ltext'
import { CornerDownLeft, RotateCcw } from 'lucide-react'
import type { Question } from '../engine/contentSchema'
import type { QuestionResponse } from '../engine/grading/gradeQuestion'
import { useT } from '../i18n'
import { Button } from './Button'
import { PalaceWalk } from '../features/palace/PalaceWalk'
import { findPalaceRoom } from '../content'
import { todayIso, useProgress, type PracticeDraft } from '../store/progress'

// Ba bề mặt thực hành NẶNG (phòng lab + phòng khám + terminal PS kéo theo
// cả engine mô phỏng) tải lười theo dạng câu — người học Phần A chưa gặp
// câu lab nào thì không phải trả byte cho chúng (hội đồng, ghế hiệu năng:
// chunk 537KB bị preload chỉ vì import tĩnh ở đây).
const NetworkLab = lazy(() => import('../features/lab/NetworkLab').then((m) => ({ default: m.NetworkLab })))
const ClinicRoom = lazy(() => import('../features/clinic/ClinicRoom').then((m) => ({ default: m.ClinicRoom })))
const PsConsole = lazy(() => import('../features/ps/PsConsole').then((m) => ({ default: m.PsConsole })))
const CliConsole = lazy(() => import('../features/cli/CliConsole').then((m) => ({ default: m.CliConsole })))

interface QuestionInputProps {
  question: Question
  onSubmit: (response: QuestionResponse) => void
  disabled?: boolean
  /**
   * Khóa lưu BÀI DỞ cho hai bề mặt nặng (lab, terminal PS) — có khóa thì
   * sơ đồ/phiên terminal đang làm dở được giữ qua lần mở app sau
   * (`practiceDraftKey`). Bài học truyền khóa; **bài thi thì KHÔNG**:
   * rời bài thi giữa chừng là mất lượt thi, nạp lại sơ đồ lắp dở của đề
   * thi là mở đường mang bài về nhà làm dần.
   */
  draftKey?: string
  /**
   * Bài THI: các bề mặt thực hành (lab/CLI/PS) hiện mục tiêu làm ĐỀ BÀI
   * nhưng không chấm sống ✓/○ và không gọi tên bệnh — màn intro bài thi
   * hứa "không có gợi ý giữa chừng" (biên bản hội đồng trung cấp). Gửi
   * thử / lệnh show vẫn miễn phí: tự kiểm chứng là kỹ năng được đo.
   */
  examMode?: boolean
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
        // Placeholder biến mất khi gõ và không phải accessible name đáng
        // tin trên mọi screen reader (WCAG 3.3.2) — đặt tên tường minh
        // như các terminal PS/Clinic đã làm.
        aria-label={t('lesson.typedPlaceholder')}
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
  // Xáo thứ tự LỰA CHỌN khi render (như OrderInput). Không xáo là lộ hai
  // cue đo lường kinh điển mà hội đồng đã đếm được trên nội dung thật:
  // 28/38 câu thi đáp án nằm ở ô đầu — người học thuộc VỊ TRÍ thay vì
  // thuộc kiến thức. Đáp án nộp vẫn là CHỈ SỐ GỐC (hợp đồng gradeQuestion).
  const order = useMemo(() => {
    const idx = question.choices.map((_, i) => i)
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[idx[i], idx[j]] = [idx[j]!, idx[i]!]
    }
    return idx
  }, [question.id]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="flex flex-col gap-2">
      {order.map((originalIndex) => (
        <button
          key={originalIndex}
          disabled={disabled}
          onClick={() => onSubmit({ kind: 'mcq', choiceIndex: originalIndex })}
          className="rounded-md border border-edge bg-panel px-4 py-2.5 text-left text-sm text-ink transition-colors duration-(--dur) hover:border-accent hover:bg-panel-hover disabled:opacity-50"
        >
          {maybeLt(question.choices[originalIndex])}
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
  // Nút vừa bấm sẽ unmount (danh sách remaining lọc nó đi) — không tự
  // chuyển focus thì bàn phím rơi về <body>, câu 5 mục là 5 lần lạc
  // (WCAG 2.4.3). Focus dồn sang nút còn lại đầu tiên.
  const listRef = useRef<HTMLDivElement>(null)

  const remaining = shuffled.filter((i) => !picked.includes(i))

  const pick = (originalIndex: number) => {
    setPicked((p) => [...p, originalIndex])
    requestAnimationFrame(() => {
      listRef.current?.querySelector('button')?.focus()
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-ink-muted">{t('lesson.orderHelp')}</p>
      <div ref={listRef} className="flex flex-col gap-2">
        {remaining.map((originalIndex) => (
          <button
            key={originalIndex}
            disabled={disabled}
            onClick={() => pick(originalIndex)}
            className="rounded-md border border-edge bg-panel px-4 py-2.5 text-left text-sm text-ink transition-colors duration-(--dur) hover:border-accent hover:bg-panel-hover disabled:opacity-50"
          >
            {maybeLt(question.items[originalIndex])}
          </button>
        ))}
      </div>

      {picked.length > 0 && (
        <div className="rounded-md border border-edge bg-panel p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{t('lesson.orderSlot')}</p>
          <ol className="flex list-inside list-decimal flex-col gap-1 text-sm text-ink">
            {picked.map((originalIndex) => (
              <li key={originalIndex}>{maybeLt(question.items[originalIndex])}</li>
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

export function QuestionInput({ question, onSubmit, disabled, draftKey, examMode }: QuestionInputProps) {
  // Bài dở đọc/ghi ở đúng MỘT chỗ này — hai bề mặt nặng vẫn là component
  // thuần (nhận ảnh chụp qua prop), nên test và trang /design không phải
  // kéo theo store.
  //
  // ĐỌC MỘT LẦN, không đăng ký theo dõi: ảnh chụp chỉ dùng làm trạng
  // thái KHỞI ĐẦU cho mặt bàn. Theo dõi nó nghĩa là mỗi lần tự lưu lại
  // kéo theo một lượt render mới của cả phòng lab — vừa phí, vừa là
  // đường vào của vòng lặp lưu → render → lưu.
  const draftAtMount = useRef<{ key: string | undefined; draft: PracticeDraft | undefined }>({
    key: undefined,
    draft: undefined,
  })
  if (draftAtMount.current.key !== draftKey) {
    draftAtMount.current = {
      key: draftKey,
      draft: draftKey === undefined ? undefined : useProgress.getState().practiceDrafts[draftKey],
    }
  }
  const savedDraft = draftAtMount.current.draft
  const saveDraft = useProgress((s) => s.savePracticeDraft)
  const clearDraft = useProgress((s) => s.clearPracticeDraft)

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
        <Suspense fallback={null}>
          <NetworkLab
            key={question.id}
            spec={question.spec}
            initialDraft={savedDraft?.kind === 'lab' ? savedDraft : null}
            onDraftChange={
              draftKey === undefined
                ? undefined
                : (draft) =>
                    draft === null
                      ? clearDraft(draftKey)
                      : saveDraft(draftKey, { kind: 'lab', ...draft, savedAt: todayIso() })
            }
            onSubmit={disabled === true ? undefined : (topology) => onSubmit({ kind: 'lab', topology })}
            examMode={examMode}
          />
        </Suspense>
      )
    case 'palace-walk':
      return <PalaceWalkInput question={question} onSubmit={onSubmit} disabled={disabled} />
    case 'clinic':
      // Phòng khám tự lo pha khám (terminal miễn phí) và pha sửa; chỉ khi
      // người học bấm "Nộp bài" nó mới trao câu trả lời hai phần lên đây
      // thành một lượt như mọi dạng câu hỏi khác.
      return (
        <Suspense fallback={null}>
          <ClinicRoom
            key={question.id}
            question={question}
            onSubmit={disabled === true ? undefined : onSubmit}
          />
        </Suspense>
      )
    case 'ps':
      // Terminal PowerShell tự lo phần gõ thử (miễn phí, có bảng mục tiêu
      // sống); chỉ "Nộp bài" mới trao trạng thái phiên lên thành một lượt.
      return (
        <Suspense fallback={null}>
          <PsConsole
            key={question.id}
            question={question}
            initialDraft={savedDraft?.kind === 'ps' ? savedDraft : null}
            onDraftChange={
              draftKey === undefined
                ? undefined
                : (draft) =>
                    draft === null
                      ? clearDraft(draftKey)
                      : saveDraft(draftKey, { kind: 'ps', ...draft, savedAt: todayIso() })
            }
            onSubmit={disabled === true ? undefined : onSubmit}
            examMode={examMode}
          />
        </Suspense>
      )
    case 'cli':
      // Console thiết bị: gõ lệnh miễn phí, bảng mục tiêu chấm sống; chỉ
      // "Nộp bài" mới trao trạng thái phiên lên thành một lượt.
      return (
        <Suspense fallback={null}>
          <CliConsole
            key={question.id}
            question={question}
            initialDraft={savedDraft?.kind === 'cli' ? savedDraft : null}
            onDraftChange={
              draftKey === undefined
                ? undefined
                : (draft) =>
                    draft === null
                      ? clearDraft(draftKey)
                      : saveDraft(draftKey, { kind: 'cli', ...draft, savedAt: todayIso() })
            }
            onSubmit={disabled === true ? undefined : onSubmit}
            examMode={examMode}
          />
        </Suspense>
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
