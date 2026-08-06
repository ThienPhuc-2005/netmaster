// Tab Học: danh sách module với bản đồ chặng + thanh tiến độ (endowed
// 15%) + bài học mở TUẦN TỰ. Mastery gate giữa các module áp qua
// computeModuleStatuses — module sau khóa tới khi module trước đạt >= 85%.

import { Link } from 'react-router'
import { BookOpen, Check, GraduationCap, Lock, Play, RotateCcw, Server, Timer } from 'lucide-react'
import { loadModules, lessonsInOrder } from '../../content'
import { computeModuleStatuses } from '../../engine/masteryGate'
import { moduleXpTotal } from '../../engine/xp'
import type { Lesson, Module } from '../../engine/contentSchema'
import { newLessonGate, shouldReviewFirst, todayIso, useProgress } from '../../store/progress'
import { useT } from '../../i18n'
import { EmptyState } from '../../components/EmptyState'
import { ProgressBar } from '../../components/ProgressBar'
import { StageMap, type StageItem } from '../../components/StageMap'

type LessonState = 'done' | 'active' | 'locked'

function LessonRow({
  module,
  lesson,
  state,
  started,
  blocked,
}: {
  module: Module
  lesson: Lesson
  state: LessonState
  started: boolean
  blocked: boolean
}) {
  const t = useT()
  const startable = state === 'active' && (started || !blocked)

  return (
    <li className="flex items-center gap-3 rounded-md border border-edge bg-panel px-4 py-3">
      {state === 'done' ? (
        <Check size={16} aria-hidden className="shrink-0 text-ok" />
      ) : state === 'active' ? (
        <Play size={16} aria-hidden className="shrink-0 text-accent" />
      ) : (
        <Lock size={14} aria-hidden className="shrink-0 text-ink-muted" />
      )}
      <span className={`flex-1 text-sm font-medium ${state === 'locked' ? 'text-ink-muted' : 'text-ink'}`}>
        {lesson.missionTitle.vi}
      </span>

      {state === 'done' && (
        <Link to={`/bai/${lesson.id}`} className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink">
          <RotateCcw size={12} aria-hidden />
          {t('learn.lessonReplay')}
        </Link>
      )}
      {startable && (
        <Link
          to={`/bai/${lesson.id}`}
          className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-contrast transition-colors duration-(--dur) hover:brightness-110"
        >
          {started ? t('learn.lessonContinue') : t('learn.lessonStart')}
        </Link>
      )}
      {state === 'locked' && <span className="text-xs text-ink-muted">{t('learn.lessonLocked')}</span>}
      {state === 'active' && !startable && <span className="text-xs text-warn">{t('learn.goReview')} ↓</span>}
    </li>
  )
}

/**
 * Checklist lab VMware của module (spec Module 9: "app track tiến độ lab").
 * App chỉ THEO DÕI — việc thật xảy ra ngoài app, không kiểm chứng được,
 * nên tick xong KHÔNG cộng XP (nguyên tắc 5). Tick persist qua store.
 */
function VmLabChecklist({ vmLab }: { vmLab: NonNullable<Module['vmLab']> }) {
  const t = useT()
  const vmLabDone = useProgress((s) => s.vmLabDone)
  const toggleVmLabStep = useProgress((s) => s.toggleVmLabStep)
  const doneCount = vmLab.steps.filter((step) => vmLabDone[step.id] !== undefined).length

  return (
    <section className="rounded-md border border-edge bg-panel-hover p-4">
      <div className="flex items-center gap-3">
        <Server size={17} aria-hidden className="shrink-0 text-accent" />
        <h3 className="flex-1 text-sm font-semibold text-ink">{vmLab.title.vi}</h3>
        <span className="text-xs font-medium text-ink-muted">
          {t('learn.vmLabProgress', { done: doneCount, total: vmLab.steps.length })}
        </span>
      </div>
      {vmLab.intro !== undefined && <p className="mt-2 text-xs leading-relaxed text-ink-muted">{vmLab.intro.vi}</p>}
      <ul className="mt-3 flex flex-col gap-2">
        {vmLab.steps.map((step) => {
          const checked = vmLabDone[step.id] !== undefined
          return (
            <li key={step.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-md px-1 py-0.5 text-sm hover:bg-panel">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleVmLabStep(step.id)}
                  className="mt-1 shrink-0"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className={checked ? 'text-ink-muted line-through' : 'text-ink'}>{step.text.vi}</span>
              </label>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-xs text-ink-muted">{t('learn.vmLabNoXp')}</p>
    </section>
  )
}

function ModuleCard({ module, status }: { module: Module; status: 'locked' | 'open' | 'passed' }) {
  const t = useT()
  const completedLessons = useProgress((s) => s.completedLessons)
  const lessonRuntimes = useProgress((s) => s.lessonRuntimes)
  const moduleXp = useProgress((s) => s.moduleXp)
  const reviewCards = useProgress((s) => s.reviewCards)
  const masteryScores = useProgress((s) => s.masteryScores)

  const ordered = lessonsInOrder(module)
  const firstUncompleted = ordered.find((l) => completedLessons[l.id] === undefined)
  const gate = newLessonGate(reviewCards, todayIso())

  const lessonState = (l: Lesson): LessonState => {
    if (completedLessons[l.id] !== undefined) return 'done'
    if (l.id === firstUncompleted?.id && status !== 'locked') return 'active'
    return 'locked'
  }

  const stages: StageItem[] = module.stages.map((st) => {
    const done = st.lessonIds.every((id) => completedLessons[id] !== undefined)
    const hasActive = st.lessonIds.some((id) => id === firstUncompleted?.id)
    return {
      id: st.id,
      title: st.title.vi,
      state: done ? 'done' : hasActive && status !== 'locked' ? 'active' : 'locked',
    }
  })

  return (
    <section
      data-part={module.part}
      className={`flex flex-col gap-5 rounded-md border border-edge bg-panel p-5 ${status === 'locked' ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center gap-3">
        <h2 className="flex-1 text-base font-bold text-ink">{module.title.vi}</h2>
        {status === 'locked' && <Lock size={15} aria-hidden className="text-ink-muted" />}
        {status === 'passed' && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ok">
            <Check size={15} aria-hidden />
            {t('learn.passedScore', { pct: Math.round(masteryScores[module.id] ?? 0) })}
          </span>
        )}
      </div>

      <ProgressBar earnedXp={moduleXp[module.id] ?? 0} totalXp={moduleXpTotal(module)} />
      <StageMap stages={stages} />

      <ol className="flex flex-col gap-2">
        {ordered.map((lesson) => (
          <LessonRow
            key={lesson.id}
            module={module}
            lesson={lesson}
            state={lessonState(lesson)}
            started={lessonRuntimes[lesson.id] !== undefined && lessonRuntimes[lesson.id]?.completed !== true}
            blocked={!gate.allowed}
          />
        ))}
      </ol>

      {firstUncompleted === undefined && status !== 'locked' && (
        <Link
          to={`/kiem-tra/${module.id}`}
          className="flex items-center gap-3 rounded-md border border-accent/30 bg-panel-hover px-4 py-3 transition-colors duration-(--dur) hover:border-accent"
        >
          <GraduationCap size={17} aria-hidden className="text-accent" />
          <span className="flex-1 text-sm font-semibold text-ink">
            {status === 'passed' ? t('learn.retakeTest') : t('learn.takeTest')}
          </span>
          <span className="text-xs font-semibold text-accent">→</span>
        </Link>
      )}

      {module.vmLab !== undefined && status !== 'locked' && <VmLabChecklist vmLab={module.vmLab} />}

      {module.drill === 'subnet' && status !== 'locked' && (
        <Link
          to="/luyen-subnet"
          className="flex items-center gap-3 rounded-md border border-accent/30 bg-panel-hover px-4 py-3 transition-colors duration-(--dur) hover:border-accent"
        >
          <Timer size={17} aria-hidden className="text-accent" />
          <span className="flex-1">
            <span className="block text-sm font-semibold text-ink">{t('learn.drillCardTitle')}</span>
            <span className="block text-xs text-ink-muted">{t('learn.drillCardBody')}</span>
          </span>
          <span className="text-xs font-semibold text-accent">{t('learn.drillCardAction')} →</span>
        </Link>
      )}
    </section>
  )
}

export function LearnPage() {
  const t = useT()
  const modules = loadModules()
  const passedModules = useProgress((s) => s.passedModules)
  const reviewCards = useProgress((s) => s.reviewCards)
  const lastReviewDate = useProgress((s) => s.lastReviewDate)

  const today = todayIso()
  const statuses = computeModuleStatuses(
    modules.map((m) => m.id),
    new Set(passedModules),
  )
  const gate = newLessonGate(reviewCards, today)
  const reviewPending = shouldReviewFirst(reviewCards, lastReviewDate, today)

  if (modules.length === 0) {
    return (
      <>
        <h1 className="mb-6 text-xl font-bold">{t('learn.title')}</h1>
        <EmptyState icon={BookOpen} title={t('learn.emptyTitle')} body={t('learn.emptyBody')} />
      </>
    )
  }

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{t('learn.title')}</h1>

      {(reviewPending || !gate.allowed) && (
        <div className="mb-6 flex items-start gap-3 rounded-md border border-warn/40 bg-panel px-4 py-3 text-sm">
          <BookOpen size={17} aria-hidden className="mt-0.5 shrink-0 text-warn" />
          <div className="flex-1">
            <p className="font-semibold text-ink">{t('learn.overdueBlockTitle')}</p>
            {!gate.allowed && <p className="mt-0.5 text-ink-muted">{t('learn.overdueBlockBody', { count: gate.overdue })}</p>}
          </div>
          <Link to="/on-tap" className="shrink-0 text-sm font-semibold text-accent hover:underline">
            {t('learn.goReview')}
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} status={statuses[m.id] ?? 'locked'} />
        ))}
      </div>
    </>
  )
}
