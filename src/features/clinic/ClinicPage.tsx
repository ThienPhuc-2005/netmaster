// Tab Phòng khám (Phase 3 hạng mục 9 — khối 9.4).
//
// Hai trạng thái:
//   - KHÓA (module chứa ca bệnh chưa mở theo mastery gate): giữ nguyên
//     màn úp mở gợi tò mò (Zeigarnik) như Phase 1.
//   - MỞ: danh sách ca nhóm theo bài học — phòng luyện SONG SONG với
//     Module 11: làm lại tự do, thang phản hồi 3 tầng như trong bài,
//     nhưng XP chỉ cộng lần CHỮA KHỎI đầu tiên của mỗi ca (nguyên tắc 5).
//
// Ca của bài thi mastery cố ý không có mặt (xem clinicCases.ts).

import { useState } from 'react'
import { lt, maybeLt } from '../../engine/ltext'
import { ChevronLeft, CircleCheck, Stethoscope } from 'lucide-react'
import { useT } from '../../i18n'
import { useProgress } from '../../store/progress'
import { playEarcon } from '../../audio/earcons'
import { EmptyState } from '../../components/EmptyState'
import { FeedbackBanner, FeedbackRegion, type FeedbackState } from '../../components/FeedbackBanner'
import { XP_AMOUNTS } from '../../engine/xp'
import { ClinicRoom } from './ClinicRoom'
import { clinicCaseEntries, clinicTabUnlocked, type ClinicCaseEntry } from './clinicCases'

/** Trích lời than làm nhãn ca — đủ gợi bệnh, không lộ chẩn đoán. */
function excerpt(text: string): string {
  return text.length <= 110 ? text : `${text.slice(0, 110).trimEnd()}…`
}

function CaseView({ entry, onBack }: { entry: ClinicCaseEntry; onBack: () => void }) {
  const t = useT()
  const submitClinicCase = useProgress((s) => s.submitClinicCase)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const [fails, setFails] = useState(0)
  const [firstSolve, setFirstSolve] = useState(false)

  const handleSubmit = (response: Parameters<typeof submitClinicCase>[1]) => {
    const result = submitClinicCase(entry.question, response)
    if (result.correct) {
      playEarcon('correct')
      setFirstSolve(result.firstSolve)
      setFeedback({ kind: 'correct' })
      return
    }
    playEarcon('incorrect')
    const tier = (Math.min(fails + 1, 3)) as 1 | 2 | 3
    setFails((f) => f + 1)
    setFeedback({
      kind: 'incorrect',
      tier,
      topic: maybeLt(entry.question.hintTopic),
      hint: entry.hint,
      solution: entry.solution,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <button onClick={onBack} className="flex items-center gap-1 self-start text-xs font-medium text-ink-muted hover:text-ink">
        <ChevronLeft size={14} aria-hidden />
        {t('clinic.backToList')}
      </button>
      <p className="font-medium text-ink">{lt(entry.question.prompt)}</p>
      <ClinicRoom key={entry.question.id} question={entry.question} onSubmit={handleSubmit} />
      <FeedbackRegion state={feedback} />
      {feedback !== null && (
        <div className="flex flex-col gap-2">
          {feedback.kind === 'correct' && (
            <p className="text-sm text-ink-muted">
              {firstSolve
                ? t('clinic.firstSolveXp', { xp: XP_AMOUNTS.clinicCaseSolved })
                : t('clinic.resolveNoXp')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function ClinicPage() {
  const t = useT()
  const passedModules = useProgress((s) => s.passedModules)
  const clinicSolved = useProgress((s) => s.clinicSolved)
  const [openCaseId, setOpenCaseId] = useState<string | null>(null)

  if (!clinicTabUnlocked(passedModules)) {
    return (
      <>
        <h1 className="mb-6 text-xl font-bold">{t('clinic.title')}</h1>
        <EmptyState icon={Stethoscope} title={t('clinic.lockedTitle')} body={t('clinic.lockedBody')} />
      </>
    )
  }

  const entries = clinicCaseEntries()
  const open = openCaseId !== null ? entries.find((e) => e.question.id === openCaseId) : undefined

  if (open !== undefined) {
    return (
      <>
        <h1 className="mb-6 text-xl font-bold">{t('clinic.title')}</h1>
        <CaseView key={open.question.id} entry={open} onBack={() => setOpenCaseId(null)} />
      </>
    )
  }

  // Nhóm ca theo bài học, giữ đúng thứ tự nội dung (thang dễ → khó).
  const byLesson = new Map<string, ClinicCaseEntry[]>()
  for (const entry of entries) {
    const list = byLesson.get(entry.lesson.id) ?? []
    list.push(entry)
    byLesson.set(entry.lesson.id, list)
  }
  const solvedCount = entries.filter((e) => clinicSolved[e.question.id] !== undefined).length
  let caseNo = 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">{t('clinic.title')}</h1>
        <p className="text-sm text-ink-muted">{t('clinic.listIntro')}</p>
        <p className="text-xs text-ink-muted">
          {t('clinic.listProgress', { solved: solvedCount, total: entries.length })} · {t('clinic.listXpNote')}
        </p>
      </div>

      {[...byLesson.entries()].map(([lessonId, list]) => (
        <section key={lessonId} className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            {lt(list[0]!.lesson.missionTitle)}
          </h2>
          <div className="flex flex-col gap-2">
            {list.map((entry) => {
              caseNo += 1
              const solved = clinicSolved[entry.question.id] !== undefined
              return (
                <button
                  key={entry.question.id}
                  onClick={() => setOpenCaseId(entry.question.id)}
                  className="flex items-start gap-3 rounded-md border border-edge bg-panel px-4 py-3 text-left text-sm text-ink transition-colors duration-(--dur) hover:border-accent hover:bg-panel-hover"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-accent">
                    {t('clinic.caseLabel', { index: caseNo })}
                  </span>
                  <span className="flex-1 text-ink-muted">{excerpt(lt(entry.question.prompt))}</span>
                  {solved && (
                    <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-ok">
                      <CircleCheck size={14} aria-hidden />
                      {t('clinic.caseSolvedBadge')}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
