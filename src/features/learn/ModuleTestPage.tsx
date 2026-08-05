// Bài kiểm tra module — mastery gate (nguyên tắc 2): >= 85% mở module
// sau, không có nút skip. Trong lúc thi KHÔNG có gợi ý/phản hồi từng câu
// (kiến thức phải tự đứng); kết quả hiện một thể ở cuối. Rớt → liệt kê
// đúng những ý cần ôn lại (đề + câu trả lời + đáp án + vì sao) và thi
// lại được ngay — thi lại là để ôn, không phải để bị phạt.

import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Award, ChevronLeft, GraduationCap, Lock } from 'lucide-react'
import { findModule, lessonsInOrder } from '../../content'
import { MASTERY_THRESHOLD_PCT, computeModuleStatuses } from '../../engine/masteryGate'
import { gradeQuestion, type QuestionResponse } from '../../engine/grading/gradeQuestion'
import { loadModules } from '../../content'
import { useProgress } from '../../store/progress'
import { useT } from '../../i18n'
import { playEarcon } from '../../audio/earcons'
import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'
import { QuestionInput } from '../../components/QuestionInput'
import { AnswerReveal } from '../../components/AnswerReveal'

type Phase =
  | { kind: 'idle' }
  | { kind: 'running'; index: number; responses: QuestionResponse[]; results: boolean[] }
  | { kind: 'done'; pct: number; passed: boolean; newlyPassed: boolean; responses: QuestionResponse[]; results: boolean[] }

export function ModuleTestPage() {
  const t = useT()
  const { moduleId } = useParams()
  const module = moduleId !== undefined ? findModule(moduleId) : null
  const completedLessons = useProgress((s) => s.completedLessons)
  const passedModules = useProgress((s) => s.passedModules)
  const masteryScores = useProgress((s) => s.masteryScores)
  const recordMasteryAttempt = useProgress((s) => s.recordMasteryAttempt)
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' })

  const backLink = (
    <Link to="/" className="text-sm font-medium text-accent hover:underline">
      {t('lesson.backToLearn')}
    </Link>
  )

  if (module === null) {
    return <EmptyState icon={ChevronLeft} title={t('lesson.notFound')} body="" action={backLink} />
  }

  const statuses = computeModuleStatuses(
    loadModules().map((m) => m.id),
    new Set(passedModules),
  )
  if (statuses[module.id] === 'locked') {
    return <EmptyState icon={Lock} title={t('test.lockedTitle')} body="" action={backLink} />
  }

  // Thi sau khi học hết bài trong module — bài thi lấy chất liệu từ đó.
  const allLessonsDone = lessonsInOrder(module).every((l) => completedLessons[l.id] !== undefined)
  if (!allLessonsDone) {
    return <EmptyState icon={GraduationCap} title={t('test.notReadyTitle')} body={t('test.notReadyBody')} action={backLink} />
  }

  const questions = module.masteryTest
  const best = masteryScores[module.id]

  const heading = (
    <div className="mb-6 flex flex-col gap-2">
      <Link to="/" className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink">
        <ChevronLeft size={14} aria-hidden />
        {t('lesson.backToLearn')}
      </Link>
      <h1 className="text-xl font-bold text-ink">
        {t('test.title')} — {module.title.vi}
      </h1>
    </div>
  )

  if (phase.kind === 'idle') {
    return (
      <>
        {heading}
        <div className="flex max-w-lg flex-col gap-5">
          <p className="text-sm leading-relaxed text-ink-muted">
            {t('test.intro', { count: questions.length, threshold: MASTERY_THRESHOLD_PCT })}
          </p>
          {best !== undefined && (
            <p className="font-mono text-sm font-semibold text-ink">{t('test.bestScore', { pct: Math.round(best) })}</p>
          )}
          <div>
            <Button onClick={() => setPhase({ kind: 'running', index: 0, responses: [], results: [] })}>
              {t('test.start')}
            </Button>
          </div>
        </div>
      </>
    )
  }

  if (phase.kind === 'running') {
    const question = questions[phase.index]
    if (question === undefined) return null

    const submit = (response: QuestionResponse) => {
      const correct = gradeQuestion(question, response)
      const responses = [...phase.responses, response]
      const results = [...phase.results, correct]
      if (phase.index + 1 < questions.length) {
        setPhase({ kind: 'running', index: phase.index + 1, responses, results })
        return
      }
      const outcome = recordMasteryAttempt(module, results)
      if (outcome.newlyPassed) playEarcon('stageUp')
      setPhase({ kind: 'done', pct: outcome.pct, passed: outcome.passed, newlyPassed: outcome.newlyPassed, responses, results })
    }

    return (
      <>
        {heading}
        <div className="mx-auto flex max-w-lg flex-col gap-4">
          <p className="text-xs font-medium text-ink-muted">
            {t('test.questionOf', { current: phase.index + 1, total: questions.length })}
          </p>
          <p className="font-medium text-ink" key={question.id}>
            {question.prompt.vi}
          </p>
          <QuestionInput question={question} onSubmit={submit} />
        </div>
      </>
    )
  }

  // Kết quả
  const wrong = questions
    .map((q, i) => ({ q, response: phase.responses[i], correct: phase.results[i] === true }))
    .filter((x) => !x.correct)
  const pctRounded = Math.round(phase.pct)

  return (
    <>
      {heading}
      <div className="flex max-w-xl flex-col gap-5">
        {phase.passed ? (
          <div className="flex items-start gap-3 rounded-md border border-ok/40 bg-panel px-5 py-4">
            <Award size={20} aria-hidden className="mt-0.5 shrink-0 text-ok" />
            <p className="font-semibold text-ok">
              {phase.newlyPassed ? t('test.passTitle', { pct: pctRounded }) : t('test.passTitleAgain', { pct: pctRounded })}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1 rounded-md border border-warn/40 bg-panel px-5 py-4">
            <p className="font-semibold text-warn">{t('test.failTitle', { pct: pctRounded })}</p>
            <p className="text-sm text-ink-muted">{t('test.failBody', { threshold: MASTERY_THRESHOLD_PCT })}</p>
          </div>
        )}

        {wrong.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{t('test.reviewTitle')}</h2>
            {wrong.map(({ q, response }) => (
              <div key={q.id} className="flex flex-col gap-2">
                <p className="text-sm font-medium text-ink">{q.prompt.vi}</p>
                <AnswerReveal question={q} response={response} explanation={q.explain?.vi} />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {!phase.passed && (
            <Button onClick={() => setPhase({ kind: 'running', index: 0, responses: [], results: [] })}>
              {t('test.retake')}
            </Button>
          )}
          {backLink}
        </div>
      </div>
    </>
  )
}
