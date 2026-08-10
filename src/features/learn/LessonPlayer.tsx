// LessonPlayer — nối máy trạng thái 6 bước (engine/lessonMachine) với UI.
// Mọi luật nằm ở engine + store; file này chỉ hiển thị đúng bước hiện tại
// và gọi action. Không có nút nào nhảy bước — nút "Tiếp tục" chỉ hiện
// khi canAdvance (nguyên tắc 1).
//
// Một màn hình = một ý (nguyên tắc 3): mỗi bước là một màn tối giản,
// bước Dạy đi từng màn khái niệm một.

import { useEffect, useRef, useState } from 'react'
import { lt, maybeLt } from '../../engine/ltext'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowRight, BookOpenCheck, ChevronLeft, Sparkles } from 'lucide-react'
import { findLesson, lessonsInOrder } from '../../content'
import { canAdvance, currentStepType, type LessonRuntime } from '../../engine/lessonMachine'
import { XP_AMOUNTS } from '../../engine/xp'
import type { Exercise, Lesson, Module } from '../../engine/contentSchema'
import { SELF_EXPLAIN_ANSWER_KEY, newLessonGate, practiceDraftKey, todayIso, useProgress } from '../../store/progress'
import { newCardIdsForLesson } from '../../engine/reviewQueue'
import { AnswerReveal } from '../../components/AnswerReveal'
import { useT } from '../../i18n'
import { playEarcon } from '../../audio/earcons'
import { Button } from '../../components/Button'
import { ConceptVisual } from '../../components/ConceptVisual'
import { EmptyState } from '../../components/EmptyState'
import { FeedbackBanner, FeedbackRegion, type FeedbackState } from '../../components/FeedbackBanner'
import { QuestionInput } from '../../components/QuestionInput'
import { PalaceTour } from '../palace/PalaceTour'
import { canDeriveOpen, deriveOpenQuestion, flowMode, needsSupport } from '../../engine/flow'
import { FoundationReview } from './FoundationReview'

const STEP_LABEL_KEYS = [
  'lesson.stepHook',
  'lesson.stepPretest',
  'lesson.stepTeach',
  'lesson.stepPractice',
  'lesson.stepRetrieval',
  'lesson.stepSummary',
] as const

// ---------------------------------------------------------------
// Khung: chỉ báo bước + nút tiếp tục dùng chung
// ---------------------------------------------------------------

function StepIndicator({ stepIndex }: { stepIndex: number }) {
  const t = useT()
  return (
    <ol className="flex flex-wrap items-center gap-1.5" aria-label={t(STEP_LABEL_KEYS[stepIndex] ?? 'lesson.stepHook')}>
      {STEP_LABEL_KEYS.map((key, i) => (
        // Chip ĐANG Ở ăn tông của Phần (spec 4.1 — cảm giác tiến trình):
        // viền + chữ var(--part-accent) trên surface — cặp part-x/surface
        // đã nằm trong tokens.test. Nền đặc màu Phần thì KHÔNG: chữ
        // accent-contrast trên màu Phần là cặp chưa đo.
        <li
          key={key}
          aria-current={i === stepIndex ? 'step' : undefined}
          className={`rounded-full px-2.5 py-0.5 text-[11px] ${
            i < stepIndex
              ? 'bg-panel-hover font-medium text-ink-muted'
              : i === stepIndex
                ? 'border-2 font-bold'
                : 'border border-edge font-medium text-ink-muted'
          }`}
          style={
            i === stepIndex
              ? { borderColor: 'var(--part-accent, var(--accent))', color: 'var(--part-accent, var(--accent))' }
              : undefined
          }
        >
          {t(key)}
        </li>
      ))}
    </ol>
  )
}

interface StepProps {
  module: Module
  lesson: Lesson
  runtime: LessonRuntime
}

function ContinueButton({ module, lesson, runtime, label }: StepProps & { label?: string }) {
  const t = useT()
  const advanceLesson = useProgress((s) => s.advanceLesson)
  if (!canAdvance(runtime, lesson)) return null
  return (
    <Button onClick={() => advanceLesson(module, lesson)}>
      {label ?? t('lesson.continue')}
      <ArrowRight size={15} aria-hidden />
    </Button>
  )
}

// ---------------------------------------------------------------
// Bước 1 — Hook (curiosity gap: chỉ một câu hỏi, không gì khác)
// ---------------------------------------------------------------

function HookView({ module, lesson, runtime }: StepProps) {
  const t = useT()
  const hook = lesson.steps[0]
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      {hook.visualId !== undefined && (
        <div className="w-full max-w-sm text-ink-muted">
          <ConceptVisual visualId={hook.visualId} />
        </div>
      )}
      <p className="max-w-md text-lg font-semibold leading-relaxed text-ink">{lt(hook.question)}</p>
      <ContinueButton module={module} lesson={lesson} runtime={runtime} label={t('lesson.begin')} />
    </div>
  )
}

// ---------------------------------------------------------------
// Bước 2 — Pretest (đoán trước, sai không trừ điểm)
// ---------------------------------------------------------------

function PretestView({ module, lesson, runtime }: StepProps) {
  const t = useT()
  const answerPretestQ = useProgress((s) => s.answerPretestQ)
  const clearDraft = useProgress((s) => s.clearPracticeDraft)
  const answers = useProgress((s) => s.lessonAnswers[lesson.id])
  const pretest = lesson.steps[1]

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-ink-muted">{t('lesson.pretestIntro')}</p>
      {pretest.questions.map((q) => {
        const answered = q.id in runtime.pretestAnswers
        const guessedRight = runtime.pretestAnswers[q.id] === true
        return (
          <div key={q.id} className="flex flex-col gap-3">
            <p className="font-medium text-ink">{lt(q.prompt)}</p>
            {!answered ? (
              <QuestionInput
                question={q}
                draftKey={practiceDraftKey(lesson.id, q.id)}
                onSubmit={(resp) => {
                  answerPretestQ(lesson, q.id, resp)
                  // Đoán thử chỉ có MỘT lượt — trả lời xong là bài dở hết
                  // việc, không giữ lại chiếm chỗ.
                  clearDraft(practiceDraftKey(lesson.id, q.id))
                }}
              />
            ) : (
              <div role="status" className="flex flex-col gap-2">
                <p className={`text-sm font-semibold ${guessedRight ? 'text-ok' : 'text-ink-muted'}`}>
                  {guessedRight ? t('lesson.pretestRight') : lt(pretest.encouragement)}
                </p>
                <AnswerReveal question={q} response={answers?.[q.id]} explanation={maybeLt(q.explain)} />
              </div>
            )}
          </div>
        )
      })}
      <ContinueButton module={module} lesson={lesson} runtime={runtime} />
    </div>
  )
}

// ---------------------------------------------------------------
// Bước 3 — Dạy (một màn = một khái niệm; deepDive giấu sau nút)
// ---------------------------------------------------------------

function TeachView({ module, lesson, runtime }: StepProps) {
  const t = useT()
  const nextTeachScreen = useProgress((s) => s.nextTeachScreen)
  const [deepDiveOpen, setDeepDiveOpen] = useState(false)
  // viewIndex là màn ĐANG XEM (được lùi tự do trong vùng đã đọc);
  // runtime.teachScreenIndex là màn XA NHẤT đã đọc — điều kiện qua bước
  // chỉ nhìn con số này, nên lùi xem lại không đổi bất kỳ state chấm nào.
  const [viewIndex, setViewIndex] = useState(runtime.teachScreenIndex)
  // Màn dạy nào là chuyến đi xem cung điện thì phải ĐI HẾT đoạn mới được
  // qua — bước Dạy của cung điện chính là phần mã hóa, đi nửa chừng thì
  // câu hỏi nhớ lại phía sau mất chỗ dựa. Lưu theo chỉ số màn nên lật
  // lại trang cũ không bắt đi lại từ đầu.
  const [toursDone, setToursDone] = useState<number[]>([])
  const screens = lesson.steps[2].screens
  const maxSeen = runtime.teachScreenIndex
  const screen = screens[viewIndex]
  if (!screen) return null
  const palace = module.palace
  const tourRooms = screen.palaceTour
  const tourPending = tourRooms !== undefined && palace !== undefined && !toursDone.includes(viewIndex)
  const concept = module.concepts.find((c) => c.id === screen.conceptId)
  const atFurthest = viewIndex >= maxSeen
  const isLast = viewIndex >= screens.length - 1

  const goBack = () => {
    setDeepDiveOpen(false)
    setViewIndex((v) => Math.max(v - 1, 0))
  }
  const goForward = () => {
    setDeepDiveOpen(false)
    // Chỉ khi đang đứng ở màn xa nhất mới "đọc thêm" (đẩy tiến độ);
    // còn lại là lật lại trang đã đọc — không đụng store.
    if (atFurthest) nextTeachScreen(lesson)
    setViewIndex((v) => Math.min(v + 1, screens.length - 1))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-ink-muted">
          {t('lesson.screenOf', { current: viewIndex + 1, total: screens.length })}
        </p>
        {viewIndex > 0 && (
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink"
          >
            <ChevronLeft size={13} aria-hidden />
            {t('lesson.teachBack')}
          </button>
        )}
      </div>
      {tourRooms !== undefined && palace !== undefined ? (
        <PalaceTour
          key={`${lesson.id}-${viewIndex}`}
          palace={palace}
          roomIds={tourRooms}
          onComplete={() => setToursDone((done) => (done.includes(viewIndex) ? done : [...done, viewIndex]))}
        />
      ) : (
        <div className="text-ink-muted">
          <ConceptVisual visualId={screen.visualId} title={concept?.term} />
        </div>
      )}
      {concept && (
        <p className="font-mono text-sm font-semibold text-accent">
          {concept.term}
          <span className="ml-2 font-sans font-normal text-ink-muted">{concept.glossVi}</span>
        </p>
      )}
      <p className="leading-relaxed text-ink">{lt(screen.body)}</p>

      {screen.deepDive !== undefined && (
        <div>
          <button
            onClick={() => setDeepDiveOpen((v) => !v)}
            className="text-sm font-medium text-accent hover:underline"
          >
            {deepDiveOpen ? t('lesson.deepDiveHide') : t('lesson.deepDive')}
          </button>
          {/* pre-wrap: phần "đào sâu" của Module 12 có đoạn script đọc-hiểu
              nhiều dòng, mất xuống dòng là mất luôn hình dạng của script.
              Nội dung Module 1-11 không chứa ký tự xuống dòng nào nên cách
              hiển thị của chúng không đổi. */}
          {deepDiveOpen && (
            <p className="mt-2 whitespace-pre-wrap rounded-md border border-edge bg-panel px-4 py-3 text-sm leading-relaxed text-ink-muted">
              {lt(screen.deepDive)}
            </p>
          )}
        </div>
      )}

      {tourPending ? (
        <p className="text-sm text-ink-muted">{t('palace.tourGate')}</p>
      ) : isLast ? (
        <ContinueButton module={module} lesson={lesson} runtime={runtime} />
      ) : (
        <Button onClick={goForward}>
          {t('lesson.continue')}
          <ArrowRight size={15} aria-hidden />
        </Button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------
// Bộ chạy bài tập dùng chung cho bước Thử tay + Nhớ lại
// (thử-sai trước, phản hồi 3 tầng — nguyên tắc 4)
// ---------------------------------------------------------------

/**
 * Danh sách XEM LẠI chỉ-đọc các câu đã làm xong: đề + câu trả lời của
 * mình + đáp án chuẩn + vì sao. Không có bất kỳ nút nộp nào — chấm điểm
 * đã khóa trong runtime, mở xem bao nhiêu lần cũng không đổi state.
 */
function SolvedReview({
  lesson,
  runtime,
  exercises,
  excludeId,
}: {
  lesson: Lesson
  runtime: LessonRuntime
  exercises: Exercise[]
  excludeId?: string | null
}) {
  const t = useT()
  const answers = useProgress((s) => s.lessonAnswers[lesson.id])
  const solved = exercises.filter(
    (e) => runtime.exercises[e.question.id]?.solved === true && e.question.id !== excludeId,
  )
  if (solved.length === 0) return null
  return (
    <div className="flex flex-col gap-2 border-t border-edge pt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t('lesson.reviewSolvedTitle')}</p>
      {solved.map((e) => (
        <details key={e.question.id} className="rounded-md border border-edge bg-panel">
          <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-ink">
            {lt(e.question.prompt)}
          </summary>
          <div className="px-4 pb-3">
            <AnswerReveal question={e.question} response={answers?.[e.question.id]} explanation={lt(e.solution)} />
          </div>
        </details>
      ))}
    </div>
  )
}

function ExerciseRunner({
  lesson,
  runtime,
  exercises,
  doneContent,
}: StepProps & { exercises: Exercise[]; doneContent: React.ReactNode }) {
  const t = useT()
  const submitAnswer = useProgress((s) => s.submitExerciseAnswer)
  const clearDraft = useProgress((s) => s.clearPracticeDraft)
  const answers = useProgress((s) => s.lessonAnswers[lesson.id])
  // Chế độ flow đọc sống theo cửa sổ 10 câu — mỗi câu trả lời có thể đổi
  // chế độ cho câu kế tiếp, đúng chữ "theo dõi" của spec.
  const mode = flowMode(useProgress((s) => s.answerHistory))
  // Gắn feedback với đúng câu đang làm — sang câu khác là banner cũ biến mất.
  const [feedback, setFeedback] = useState<{ questionId: string; state: FeedbackState } | null>(null)
  // Câu vừa giải xong đang hiện màn đáp án — bấm Tiếp tục mới sang câu sau.
  const [revealing, setRevealing] = useState<string | null>(null)

  const revealingEx = revealing !== null ? exercises.find((e) => e.question.id === revealing) : undefined
  const current = exercises.find((e) => runtime.exercises[e.question.id]?.solved !== true)

  let main: React.ReactNode
  if (revealingEx !== undefined) {
    // Vừa trả lời đúng: khen + đáp án chuẩn + vì sao (feedback tức thời)
    main = (
      <div className="flex flex-col gap-3">
        <FeedbackBanner state={{ kind: 'correct' }} />
        <AnswerReveal
          question={revealingEx.question}
          response={answers?.[revealingEx.question.id]}
          explanation={lt(revealingEx.solution)}
        />
        <div>
          <Button onClick={() => setRevealing(null)}>
            {t('lesson.continue')}
            <ArrowRight size={15} aria-hidden />
          </Button>
        </div>
      </div>
    )
  } else if (current !== undefined) {
    // Flow engine (spec 2.3): thắng thế (> 90% trên 10 câu) thì câu trắc
    // nghiệm được hỏi ở dạng MỞ. Cùng id nên trạng thái chấm, thang 3
    // tầng và XP không biết gì về chuyện đổi dạng — store chấm bản gõ
    // tay bằng chữ của lựa chọn đúng (gradeQuestion đã học đường này).
    const asOpen =
      mode === 'harder' && current.question.kind === 'mcq' && canDeriveOpen(current.question)
    const shownQuestion = asOpen && current.question.kind === 'mcq' ? deriveOpenQuestion(current.question) : current.question
    const handleSubmit = (resp: Parameters<typeof submitAnswer>[2]) => {
      const { correct, tier, nearMiss } = submitAnswer(lesson, current.question.id, resp)
      if (correct) {
        playEarcon('correct')
        setFeedback(null)
        setRevealing(current.question.id)
        // Xong câu này rồi thì bài dở không còn là bài dở — bỏ ảnh chụp
        // để ngăn bài dở không giữ những thứ đã làm xong.
        clearDraft(practiceDraftKey(lesson.id, current.question.id))
      } else {
        playEarcon('incorrect')
        setFeedback({
          questionId: current.question.id,
          state: {
            kind: 'incorrect',
            tier: tier === 0 ? 1 : tier,
            topic: maybeLt(current.question.hintTopic),
            hint: lt(current.hint),
            solution: lt(current.solution),
            nearMiss: nearMiss ?? undefined,
          },
        })
      }
    }
    main = (
      <div className="flex flex-col gap-4" key={current.question.id}>
        <p className="font-medium text-ink">{lt(current.question.prompt)}</p>
        {asOpen && <p className="text-xs text-ink-muted">{t('flow.harderNote')}</p>}
        <QuestionInput
          question={shownQuestion}
          draftKey={practiceDraftKey(lesson.id, current.question.id)}
          onSubmit={handleSubmit}
        />
        <FeedbackRegion state={feedback !== null && feedback.questionId === current.question.id ? feedback.state : null} />
      </div>
    )
  } else {
    main = doneContent
  }

  return (
    <div className="flex flex-col gap-5">
      {main}
      <SolvedReview lesson={lesson} runtime={runtime} exercises={exercises} excludeId={revealing} />
    </div>
  )
}

// ---------------------------------------------------------------
// Bước 4 — Thử tay (worked example fading)
// ---------------------------------------------------------------

function PracticeView({ module, lesson, runtime }: StepProps) {
  const t = useT()
  const practice = lesson.steps[3]

  return (
    <div className="flex flex-col gap-5">
      {practice.workedExample !== undefined && (
        <div className="flex items-start gap-3 rounded-md border border-edge bg-panel px-4 py-3 text-sm leading-relaxed text-ink-muted">
          <BookOpenCheck size={17} aria-hidden className="mt-0.5 shrink-0 text-accent" />
          <p>
            <span className="font-semibold text-accent">{t('lesson.workedExampleLabel')}: </span>
            {lt(practice.workedExample)}
          </p>
        </div>
      )}
      <ExerciseRunner
        module={module}
        lesson={lesson}
        runtime={runtime}
        exercises={practice.exercises}
        doneContent={<ContinueButton module={module} lesson={lesson} runtime={runtime} />}
      />
    </div>
  )
}

// ---------------------------------------------------------------
// Bước 5 — Nhớ lại (đóng nội dung + tự giải thích bằng lời mình)
// ---------------------------------------------------------------

function RetrievalView({ module, lesson, runtime }: StepProps) {
  const t = useT()
  const submitSelfExplainText = useProgress((s) => s.submitSelfExplainText)
  const confirmSelfExplain = useProgress((s) => s.confirmSelfExplain)
  const retrieval = lesson.steps[4]
  const [text, setText] = useState('')
  const [missing, setMissing] = useState<string[]>([])

  const se = runtime.selfExplain
  const ownExplainRaw = useProgress((s) => s.lessonAnswers[lesson.id]?.[SELF_EXPLAIN_ANSWER_KEY])
  const ownExplainText = ownExplainRaw?.kind === 'typed' ? ownExplainRaw.text : undefined

  const submitExplain = () => {
    if (text.trim() === '') return
    const { match } = submitSelfExplainText(lesson, text)
    if (match.passed) {
      playEarcon('correct')
      setMissing([])
    } else {
      playEarcon('incorrect')
      // Tầng 2: nhắc các Ý còn thiếu (biến thể đầu của từng nhóm keyword)
      setMissing(match.missedGroups.map((gi) => retrieval.selfExplain.keywords[gi]?.[0] ?? ''))
    }
  }

  // KHÔNG BAO GIỜ khen khi máy chưa xác nhận: lời khen chỉ render từ
  // se.passed của engine — kết quả chấm keyword, không phải state UI.
  const selfExplainBlock = (
    <div className="flex flex-col gap-3">
      <p className="font-medium text-ink">{lt(retrieval.selfExplain.prompt)}</p>

      {!se.done ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="rounded-md border border-edge bg-panel px-3 py-2 text-sm text-ink placeholder:text-ink-muted"
            placeholder={t('lesson.typedPlaceholder')}
          />
          <div>
            <Button onClick={submitExplain} disabled={text.trim() === ''}>
              {t('lesson.check')}
            </Button>
          </div>
          {se.attempts > 0 && se.attempts < 3 && missing.length > 0 && (
            <div role="status" className="rounded-md border border-warn/40 bg-panel px-4 py-3 text-sm text-ink">
              <span className="font-semibold text-warn">
                {t('lesson.selfExplainMissing', { topics: missing.filter(Boolean).join(', ') })}
              </span>
            </div>
          )}
          {se.attempts >= 3 && (
            <div className="flex flex-col gap-3 rounded-md border border-edge bg-panel px-4 py-3 text-sm">
              <p>
                <span className="font-semibold text-accent">{t('lesson.selfExplainExampleLabel')}: </span>
                {lt(retrieval.selfExplain.exampleAnswer)}
              </p>
              <div>
                <Button variant="ghost" onClick={() => confirmSelfExplain(lesson)}>
                  {t('lesson.selfExplainConfirm')}
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {se.passed && (
            <div role="status" className="rounded-md border border-ok/40 bg-panel px-4 py-3 text-sm font-semibold text-ok">
              {t('lesson.selfExplainPassed')}
            </div>
          )}
          {/* LUÔN đối chiếu với giải thích mẫu — kể cả khi được chấm đạt:
              đọc một bản diễn đạt chuẩn ngay sau khi tự viết là lúc học
              sâu nhất (yêu cầu chốt sau lượt test người thật). */}
          <div className="flex flex-col gap-2 rounded-md border border-edge bg-panel px-4 py-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {t('lesson.selfExplainCompare')}
            </p>
            {ownExplainText !== undefined && (
              <p className="text-ink-muted">
                <span className="font-semibold">{t('lesson.yourExplainLabel')}: </span>
                {ownExplainText}
              </p>
            )}
            <p className="leading-relaxed text-ink">{lt(retrieval.selfExplain.exampleAnswer)}</p>
          </div>
          <ContinueButton module={module} lesson={lesson} runtime={runtime} />
        </>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <ExerciseRunner
        module={module}
        lesson={lesson}
        runtime={runtime}
        exercises={retrieval.questions}
        doneContent={selfExplainBlock}
      />
    </div>
  )
}

// ---------------------------------------------------------------
// Bước 6 — Tổng kết (peak-end + Zeigarnik)
// ---------------------------------------------------------------

function SummaryView({ module, lesson, runtime }: StepProps) {
  const t = useT()
  const navigate = useNavigate()
  const advanceLesson = useProgress((s) => s.advanceLesson)
  const completedLessons = useProgress((s) => s.completedLessons)
  const reviewCards = useProgress((s) => s.reviewCards)
  const summary = lesson.steps[5]
  const firstTime = completedLessons[lesson.id] === undefined
  const celebrated = useRef(false)

  /**
   * Hai con số của "cửa đóng" (kho ý tưởng A5): tự giải được mấy bài, và
   * bài này bỏ vào Hộp ôn tập mấy thẻ mới.
   *
   * "Tự giải được" = giải xong mà KHÔNG phải mở lời giải — cùng thước đo
   * với drill (correct = chưa lộ đáp án). Đếm cả bài tập lẫn câu nhớ lại.
   *
   * Số thẻ đọc từ `newCardIdsForLesson` — đúng hàm store dùng lúc thật sự
   * tạo thẻ, nên con số hứa ở đây không bao giờ lệch con số thật.
   */
  const attempts = Object.values(runtime.exercises)
  const selfSolved = attempts.filter((a) => a.solved && !a.usedSolution).length
  const newCardCount = firstTime
    ? newCardIdsForLesson(module, lesson, new Set(reviewCards.map((c) => c.conceptId))).length
    : 0

  // Hợp âm ăn mừng khi màn tổng kết hiện ra (peak-end) — một lần duy nhất.
  useEffect(() => {
    if (!celebrated.current && firstTime) {
      celebrated.current = true
      playEarcon('lessonComplete')
    }
  }, [firstTime])

  const finish = () => {
    // Bài này có khép lại một chặng không? (fanfare "lên chặng" — spec 4.3)
    const stage = module.stages.find((st) => st.lessonIds.includes(lesson.id))
    const stageDoneAfter =
      stage !== undefined &&
      stage.lessonIds.every((id) => id === lesson.id || completedLessons[id] !== undefined)
    if (!runtime.completed) advanceLesson(module, lesson)
    if (firstTime && stageDoneAfter) playEarcon('stageUp')
    void navigate('/')
  }

  // Ăn mừng THỊ GIÁC (spec 2.1 bước 6 đòi "animation ăn mừng ngắn" —
  // sai lệch chưa khai mà hội đồng bắt được): trước đây kênh duy nhất là
  // earcon tắt được — người tắt âm/khiếm thính nhận peak-end phẳng lì.
  // Animation thuần CSS (app.css), thời lượng buộc vào --dur nên
  // prefers-reduced-motion tự tắt trọn bộ.
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex items-center gap-3 text-accent">
        <Sparkles size={22} aria-hidden className={firstTime ? 'celebrate-pop' : undefined} />
        <h2 className="text-lg font-bold text-ink">{t('lesson.summaryTitle')}</h2>
        {firstTime && (
          <span className="celebrate-pop font-mono text-sm font-bold text-ok" style={{ animationDelay: 'calc(var(--dur) * 1.5)' }}>
            {t('lesson.xpGained', { xp: XP_AMOUNTS.practice + XP_AMOUNTS.retrieval })}
          </span>
        )}
      </div>
      <ul className="flex flex-col gap-3">
        {summary.bullets.map((b, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 rounded-md border border-edge bg-panel px-4 py-3 text-sm text-ink ${firstTime ? 'celebrate-rise' : ''}`}
            style={firstTime ? { animationDelay: `calc(var(--dur) * ${2 + i * 1.5})` } : undefined}
          >
            <span className="mt-0.5 font-mono text-xs font-bold text-accent">{i + 1}</span>
            {lt(b)}
          </li>
        ))}
      </ul>
      {/* Cửa đóng của phiên (A5): hai con số nói bạn vừa làm được gì và
          mang về được gì — không có chúng thì màn tổng kết chỉ kể lại bài,
          không kể lại CÔNG của người học. */}
      {attempts.length > 0 && (
        <dl className="flex flex-wrap gap-x-8 gap-y-2 rounded-md border border-edge bg-panel px-4 py-3 text-sm">
          <div>
            <dt className="text-xs text-ink-muted">{t('lesson.summarySelfSolvedLabel')}</dt>
            <dd className="font-mono font-semibold text-ink">
              {t('lesson.summarySelfSolved', { solved: selfSolved, total: attempts.length })}
            </dd>
          </div>
          {newCardCount > 0 && (
            <div>
              <dt className="text-xs text-ink-muted">{t('lesson.summaryNewCardsLabel')}</dt>
              <dd className="font-mono font-semibold text-ink">
                {t('lesson.summaryNewCards', { count: newCardCount })}
              </dd>
            </div>
          )}
        </dl>
      )}
      <div className="rounded-md border border-accent/30 bg-panel px-4 py-3 text-sm">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">{t('lesson.summaryNextLabel')}</p>
        <p className="text-ink-muted">{lt(summary.nextTeaser)}</p>
      </div>
      <div>
        <Button onClick={finish}>{t('lesson.finishLesson')}</Button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------
// Player
// ---------------------------------------------------------------

const STEP_VIEWS = {
  hook: HookView,
  pretest: PretestView,
  teach: TeachView,
  practice: PracticeView,
  retrieval: RetrievalView,
  summary: SummaryView,
} as const

export function LessonPlayer() {
  const t = useT()
  const { lessonId } = useParams()
  const ref = lessonId !== undefined ? findLesson(lessonId) : null
  const beginLesson = useProgress((s) => s.beginLesson)
  const runtime = useProgress((s) => (lessonId !== undefined ? s.lessonRuntimes[lessonId] : undefined))
  const reviewCards = useProgress((s) => s.reviewCards)
  const completedLessons = useProgress((s) => s.completedLessons)

  // Các chốt chặn tính TRƯỚC effect khởi tạo — bài bị chặn thì không được
  // phép có runtime (effect chạy sau render sẽ hỏi lại đúng các cờ này).
  const lessonDone = ref !== null && completedLessons[ref.lesson.id] !== undefined
  // Bài học mở TUẦN TỰ trong module — gõ URL trực tiếp không vượt được
  // thứ tự (cùng bất biến với LearnPage, chặn ở cả hai nơi).
  const firstUncompleted =
    ref !== null ? lessonsInOrder(ref.module).find((l) => completedLessons[l.id] === undefined) : undefined
  const blockedByOrder = ref !== null && !lessonDone && ref.lesson.id !== firstUncompleted?.id
  // Chặn "học mới" khi nợ > 30 thẻ quá hạn (spec 2.2): bài CHƯA từng bắt
  // đầu và chưa hoàn thành mới bị chặn — bài đang học dở vẫn học tiếp được.
  const gate = newLessonGate(reviewCards, todayIso())
  const blockedByDebt = runtime === undefined && !lessonDone && !gate.allowed
  // Flow engine (spec 2.3): tỷ lệ đúng tụt < 60% thì bài MỚI phải đi qua
  // một phiên củng cố nền trước — bài đang học dở không bị cắt ngang.
  const answerHistory = useProgress((s) => s.answerHistory)
  const answerTotal = useProgress((s) => s.answerTotal)
  const supportShownAtTotal = useProgress((s) => s.supportShownAtTotal)
  const needsFoundation =
    runtime === undefined && !lessonDone && needsSupport(answerHistory, answerTotal, supportShownAtTotal)

  // Khởi tạo/tiếp tục runtime khi vào bài (effect — không set state lúc render).
  useEffect(() => {
    if (
      ref !== null &&
      !blockedByOrder &&
      !blockedByDebt &&
      !needsFoundation &&
      (runtime === undefined || runtime.completed)
    ) {
      beginLesson(ref.lesson)
    }
  }, [ref, runtime, blockedByOrder, blockedByDebt, needsFoundation, beginLesson])

  if (ref === null) {
    return <EmptyState icon={ChevronLeft} title={t('lesson.notFound')} body="" action={<Link to="/" className="text-sm font-medium text-accent hover:underline">{t('lesson.backToLearn')}</Link>} />
  }

  if (blockedByOrder) {
    return (
      <EmptyState
        icon={ChevronLeft}
        title={t('learn.lessonLocked')}
        body=""
        action={
          <Link to="/" className="text-sm font-medium text-accent hover:underline">
            {t('lesson.backToLearn')}
          </Link>
        }
      />
    )
  }

  if (blockedByDebt) {
    return (
      <EmptyState
        icon={ChevronLeft}
        title={t('learn.overdueBlockTitle')}
        body={t('learn.overdueBlockBody', { count: gate.overdue })}
        action={
          <Link to="/on-tap" className="text-sm font-medium text-accent hover:underline">
            {t('learn.goReview')}
          </Link>
        }
      />
    )
  }

  if (needsFoundation) {
    return <FoundationReview module={ref.module} lesson={ref.lesson} />
  }

  if (runtime === undefined || runtime.completed) return null // effect đang khởi tạo runtime mới

  const stepType = currentStepType(runtime, ref.lesson)
  const StepView = STEP_VIEWS[stepType]

  return (
    // data-part cấp --part-accent cho cả cây (tokens.css) — chip bước và
    // mọi chi tiết tông-theo-Phần bên trong tự ăn màu Phần đang học.
    <div data-part={ref.module.part} className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Link to="/" className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink">
          <ChevronLeft size={14} aria-hidden />
          {t('lesson.backToLearn')}
        </Link>
        <h1 className="text-xl font-bold text-ink">{lt(ref.lesson.missionTitle)}</h1>
        <StepIndicator stepIndex={runtime.stepIndex} />
      </div>
      <StepView module={ref.module} lesson={ref.lesson} runtime={runtime} />
    </div>
  )
}
