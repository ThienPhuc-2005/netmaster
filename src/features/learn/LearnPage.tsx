// Tab Học: danh sách module với bản đồ chặng + thanh tiến độ (endowed
// 15%) + bài học mở TUẦN TỰ. Mastery gate giữa các module áp qua
// computeModuleStatuses — module sau khóa tới khi module trước đạt >= 85%.

import { Link } from 'react-router'
import { lt } from '../../engine/ltext'
import { BookOpen, Check, FastForward, GraduationCap, Lock, Play, RotateCcw, Server, Snowflake, Sunrise, Timer, X } from 'lucide-react'
import { loadModules, lessonsInOrder } from '../../content'
import { computeModuleStatuses } from '../../engine/masteryGate'
import { moduleXpTotal } from '../../engine/xp'
import type { Lesson, Module } from '../../engine/contentSchema'
import { canChallengeModule, newLessonGate, shouldReviewFirst, todayIso, useProgress } from '../../store/progress'
import { useT } from '../../i18n'
import { EmptyState } from '../../components/EmptyState'
import { ProgressBar } from '../../components/ProgressBar'
import { StageMap, type StageItem } from '../../components/StageMap'

type LessonState = 'done' | 'active' | 'locked'

/**
 * Kể chuyện streak (hội đồng 2026-08-07, ghế tâm lý): engine đã soạn sẵn
 * lời kể (freezesUsed/reset) mà bản cũ vứt đi — người học không bao giờ
 * biết mình vừa được cứu chuỗi, và reset 30→1 diễn ra câm lặng. Banner
 * này kể một lần rồi tắt (dismiss); reset kể KHÔNG đổ lỗi (spec 4.4).
 */
function StreakStoryBanner() {
  const t = useT()
  const event = useProgress((s) => s.streakEvent)
  const dismiss = useProgress((s) => s.dismissStreakEvent)
  if (event === null) return null
  const Icon = event.kind === 'freeze-used' ? Snowflake : Sunrise
  return (
    <div className="mb-6 flex items-start gap-3 rounded-md border border-edge bg-panel px-4 py-3 text-sm" role="status">
      <Icon size={17} aria-hidden className="mt-0.5 shrink-0 text-accent" />
      <p className="flex-1 text-ink">
        {event.kind === 'freeze-used'
          ? t('learn.streakFrozen', { used: event.used, left: event.left })
          : t('learn.streakReset', { lost: event.lostStreak })}
      </p>
      <button
        onClick={dismiss}
        aria-label={t('learn.streakDismiss')}
        className="shrink-0 rounded-md p-1 text-ink-muted hover:bg-panel-hover hover:text-ink"
      >
        <X size={15} aria-hidden />
      </button>
    </div>
  )
}

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
        {lt(lesson.missionTitle)}
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
      {/* Nhãn khóa co lại tối đa 40% hàng — không được ép tựa đề bài
          thành mỗi từ một dòng trên màn hẹp (lỗi thấy khi kiểm 375px). */}
      {state === 'locked' && (
        <span className="max-w-[40%] shrink-0 text-right text-xs text-ink-muted">{t('learn.lessonLocked')}</span>
      )}
      {/* Link thẳng tới trang ôn — bản cũ vẽ mũi tên "↓" trong khi banner
          ôn tập nằm phía TRÊN danh sách: chỉ đường sai đúng lúc người
          dùng đang bối rối vì bị chặn (hội đồng, ghế onboarding). */}
      {state === 'active' && !startable && (
        <Link to="/on-tap" className="text-xs font-medium text-warn underline-offset-2 hover:underline">
          {t('learn.goReview')}
        </Link>
      )}
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
        <h3 className="flex-1 text-sm font-semibold text-ink">{lt(vmLab.title)}</h3>
        <span className="text-xs font-medium text-ink-muted">
          {t('learn.vmLabProgress', { done: doneCount, total: vmLab.steps.length })}
        </span>
      </div>
      {vmLab.intro !== undefined && <p className="mt-2 text-xs leading-relaxed text-ink-muted">{lt(vmLab.intro)}</p>}
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
                <span className={checked ? 'text-ink-muted line-through' : 'text-ink'}>{lt(step.text)}</span>
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
  const canChallenge = canChallengeModule({
    status,
    lessonIds: ordered.map((l) => l.id),
    completedLessons,
    moduleId: module.id,
  })

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
      title: lt(st.title),
      state: done ? 'done' : hasActive && status !== 'locked' ? 'active' : 'locked',
    }
  })

  return (
    // Trạng thái khóa KHÔNG dùng opacity phủ card: chữ mờ 60% rớt AA thật
    // (ink-muted@60% = 2.6:1 light) và lớp composite lọt ngoài lưới đo của
    // tokens.test — thể hiện khóa bằng icon Lock + border nhạt + nhãn là đủ.
    <section
      data-part={module.part}
      className={`flex flex-col gap-5 rounded-md border bg-panel p-5 ${status === 'locked' ? 'border-edge/60' : 'border-edge'}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="min-w-[12rem] flex-1 text-base font-bold text-ink">{lt(module.title)}</h2>
        {status === 'locked' && <Lock size={15} aria-hidden className="text-ink-muted" />}
        {status === 'passed' && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ok">
            <Check size={15} aria-hidden />
            {t('learn.passedScore', { pct: Math.round(masteryScores[module.id] ?? 0) })}
          </span>
        )}
        {/* Cửa HỌC VƯỢT đứng NGAY CẠNH tên chủ đề (08-08, chủ dự án ra
            lệnh sửa): bản trước nằm dưới đáy card, chữ xám — phải cuộn
            qua 5-8 hàng bài mới thấy, tức là với người mới nó không tồn
            tại. Viền accent + chữ accent để nhìn là thấy, nhưng KHÔNG tô
            đặc accent — ô đặc để dành cho "Bắt đầu" của bài, lối chính
            vẫn là học. Tên đầy đủ đi theo aria-label/title cho người
            dùng trình đọc màn hình và người rê chuột. */}
        {canChallenge && (
          <Link
            to={`/kiem-tra/${module.id}?vuot=1`}
            aria-label={t('learn.challenge')}
            title={t('learn.challenge')}
            className="flex shrink-0 items-center gap-1.5 rounded-md border border-accent bg-panel-hover px-3 py-1.5 text-xs font-semibold text-accent transition-colors duration-(--dur) hover:bg-accent hover:text-accent-contrast"
          >
            <FastForward size={14} aria-hidden />
            {t('learn.challengeShort')}
          </Link>
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

      {/* Lời mời thứ hai, đặt ở CUỐI card — cùng đích với chip trên đầu
          nhưng nói trọn câu ("Mình biết phần này rồi…"): chip ngắn lo
          phần nhìn-là-thấy, hàng này lo phần hiểu-nó-là-gì, và nó rơi
          đúng chỗ người vừa đọc hết danh sách bài mới quyết định. Không
          phải nút skip: bấm vào là đi thi thật, đề y hệt, ngưỡng 85%
          y hệt. */}
      {canChallenge && (
        <Link
          to={`/kiem-tra/${module.id}?vuot=1`}
          className="flex items-center gap-3 rounded-md border border-edge px-4 py-3 text-ink-muted transition-colors duration-(--dur) hover:border-accent hover:text-ink"
        >
          <FastForward size={16} aria-hidden />
          <span className="flex-1 text-sm font-medium">{t('learn.challenge')}</span>
          <span className="text-xs font-semibold">→</span>
        </Link>
      )}

      {module.vmLab !== undefined && status !== 'locked' && <VmLabChecklist vmLab={module.vmLab} />}

      {module.drill !== undefined && status !== 'locked' && (
        <Link
          to={module.drill === 'vlsm' ? '/luyen-vlsm' : '/luyen-subnet'}
          className="flex items-center gap-3 rounded-md border border-accent/30 bg-panel-hover px-4 py-3 transition-colors duration-(--dur) hover:border-accent"
        >
          <Timer size={17} aria-hidden className="text-accent" />
          <span className="flex-1">
            <span className="block text-sm font-semibold text-ink">
              {t(module.drill === 'vlsm' ? 'learn.vlsmCardTitle' : 'learn.drillCardTitle')}
            </span>
            <span className="block text-xs text-ink-muted">
              {t(module.drill === 'vlsm' ? 'learn.vlsmCardBody' : 'learn.drillCardBody')}
            </span>
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

      <StreakStoryBanner />

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
