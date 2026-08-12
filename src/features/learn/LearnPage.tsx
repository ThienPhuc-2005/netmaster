// Tab Học: danh sách module với bản đồ chặng + thanh tiến độ (endowed
// 15%) + bài học mở TUẦN TỰ. Mastery gate giữa các module áp qua
// computeModuleStatuses — module sau khóa tới khi module trước đạt >= 85%.

import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router'
import { lt } from '../../engine/ltext'
import { BookOpen, Check, FastForward, GraduationCap, Lock, Play, RotateCcw, Server, Snowflake, Sunrise, Timer, X } from 'lucide-react'
import { loadModules, lessonsInOrder } from '../../content'
import { computeModuleStatuses } from '../../engine/masteryGate'
import { moduleXpTotal } from '../../engine/xp'
import { LESSON_STEP_COUNT, planToday, type TodayPlan } from '../../engine/todayPlan'
import { fadingCards } from '../../engine/freshness'
import { soNgayVang, VANG_LAU_NGAY } from '../../engine/streak'
import type { Lesson, Module } from '../../engine/contentSchema'
import { canChallengeModule, newLessonGate, todayIso, useProgress } from '../../store/progress'
import { useT } from '../../i18n'
import { EmptyState } from '../../components/EmptyState'
import { ProgressBar } from '../../components/ProgressBar'
import { StageMap, type StageItem } from '../../components/StageMap'
import { CourseTrail } from '../../components/CourseTrail'

type LessonState = 'done' | 'active' | 'locked'

/**
 * Tên tham số "đưa tôi về đúng chỗ" trên đường quay lại trang Học.
 *
 * Vì sao cần: trang này giờ dài 21 module, nên MỌI cửa quay về đều đổ
 * người học xuống đầu trang rồi bắt tự cuộn đi tìm chỗ mình vừa đứng.
 * Cửa nào biết mình đến từ đâu thì mang theo địa chỉ đó (nhận cả id
 * module lẫn id bài — nơi gọi khỏi phải tra ngược nội dung).
 */
export const FOCUS_PARAM = 'tiep'

/** Id phần tử của một card module — chỗ neo để cuộn tới. */
export function moduleAnchorId(moduleId: string): string {
  return `card-${moduleId}`
}

/**
 * Dấu trên VIỆC KẾ TIẾP của một module (nút "Bắt đầu"/"Học tiếp" của bài
 * đang mở, hoặc cửa "Thi cuối module" khi đã học hết bài).
 *
 * Cần dấu này vì cuộn tới đầu card là CHƯA ĐỦ: Module 3 có 12 bài, card
 * cao hơn cả màn hình, nên đứng ở đầu card thì bài kế tiếp vẫn nằm dưới
 * mép dưới — đúng cái phiền mà việc này sinh ra để chữa (đo trên browser
 * thật). Nhắm thẳng vào việc kế tiếp thì cao bao nhiêu cũng trúng.
 */
const NEXT_ACTION_ATTR = 'data-next-action'

/** Đường về trang Học có mang địa chỉ — mọi cửa quay lại đều đi qua đây. */
export function backToLearn(moduleId: string): string {
  return `/?${FOCUS_PARAM}=${encodeURIComponent(moduleId)}`
}

/** Tham số trỏ tới module nào (nhận id module hoặc id một bài của nó). */
function resolveTargetModule(modules: readonly Module[], target: string | null): string | null {
  if (target === null || target === '') return null
  if (modules.some((m) => m.id === target)) return target
  return modules.find((m) => m.lessons.some((l) => l.id === target))?.id ?? null
}

/**
 * Đưa người học về ĐÚNG CHỖ họ vừa rời đi.
 *
 * Cuộn thôi chưa đủ: người dùng bàn phím và trình đọc màn hình không đi
 * theo con mắt, nên phải DỜI FOCUS vào card đó (WCAG 2.4.3) — cùng kỷ
 * luật đã áp cho màn tổng kết drill.
 *
 * Chỉ chạy MỘT LẦN cho mỗi địa chỉ: người học cuộn đi chỗ khác rồi mà
 * app giật họ về là tệ hơn cả việc không cuộn.
 */
function useScrollToModule(moduleId: string | null): void {
  const done = useRef<string | null>(null)
  useEffect(() => {
    if (moduleId === null || done.current === moduleId) return
    const el = document.getElementById(moduleAnchorId(moduleId))
    if (el === null) return
    done.current = moduleId

    // Nhắm vào VIỆC KẾ TIẾP nếu module còn việc; không thì lấy cả card
    // (module đã đậu — lúc đó bản thân card là câu trả lời).
    const action = el.querySelector<HTMLElement>(`[${NEXT_ACTION_ATTR}]`)
    const target = action ?? el

    // Cuộn TỨC THÌ, không `behavior: 'smooth'`. Hai lý do, cái đầu là
    // quyết định: khung cuộn của app là <main> lồng bên trong, mà
    // scrollIntoView smooth trên khung lồng nhau IM LẶNG KHÔNG LÀM GÌ
    // trong Chromium (đo trên browser thật: auto nhảy đúng 1881px, smooth
    // đứng yên ở 0). Cái thứ hai: quãng nhảy ở đây thường ~2000px, cuộn
    // mượt chừng ấy vừa lâu vừa làm người ta mất phương hướng.
    target.scrollIntoView({ block: action === null ? 'start' : 'center' })
    // Focus SAU khi đã cuộn, preventScroll để nó không kéo lại lần nữa.
    // Focus rơi đúng vào nút việc kế tiếp: người dùng bàn phím chỉ còn
    // cách một phím Enter, không phải Tab mò qua cả trang.
    target.focus({ preventScroll: true })
  }, [moduleId])
}

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

/**
 * Thẻ "Hôm nay" (kho ý tưởng E1 + E2) — MỘT việc để bấm ngay khi mở app.
 *
 * Vì sao đứng đầu trang: app có 21 module, người học quay lại ngày thứ
 * hai phải cuộn đi tìm module nào đang mở, bài nào dở, còn thẻ nào chưa
 * ôn. Mỗi lần phải quyết định là một lần có thể bỏ cuộc.
 *
 * Thẻ này THAY LUÔN banner "nợ ôn" cũ: hai hộp cùng nói "vào ôn tập" đặt
 * cạnh nhau là nhiễu. Trạng thái chặn-học-mới vẫn được kể nguyên vẹn,
 * chỉ dời vào đây.
 *
 * Nó KHÔNG mở đường tắt nào: mọi đích đến đều là chỗ người học vốn đã
 * vào được (planToday chỉ đọc, không nới luật).
 */
function TodayCard({ plan, fading, ngayVang }: { plan: TodayPlan; fading: number; ngayVang: number | null }) {
  const t = useT()

  // Việc chính: mỗi focus một đích, một nhãn nút.
  const action = ((): { to: string; label: string } | null => {
    switch (plan.focus) {
      case 'review':
        return { to: '/on-tap', label: t('today.actionReview') }
      case 'resume':
        return plan.resume === null ? null : { to: `/bai/${plan.resume.lessonId}`, label: t('today.actionResume') }
      case 'new':
        return plan.nextNew === null ? null : { to: `/bai/${plan.nextNew.lessonId}`, label: t('today.actionNew') }
      case 'test':
        return plan.nextTest === null ? null : { to: `/kiem-tra/${plan.nextTest.moduleId}`, label: t('today.actionTest') }
      case 'done':
        return null
    }
  })()

  // Các dòng kể "hôm nay có gì" — thứ tự đúng thứ tự nên làm.
  const lines: string[] = []
  if (plan.dueCount > 0) lines.push(t('today.partCards', { count: plan.dueCount }))
  if (plan.resume !== null) {
    lines.push(
      t('today.partResume', {
        lesson: lt(plan.resume.lesson.missionTitle),
        // Bước ĐANG đứng dễ hình dung hơn "còn mấy bước", và tránh luôn
        // chuyện số ít/số nhiều của bản tiếng Anh.
        step: LESSON_STEP_COUNT - plan.resume.stepsLeft + 1,
        total: LESSON_STEP_COUNT,
      }),
    )
  } else if (plan.nextTest !== null) {
    lines.push(t('today.partTest', { module: lt(plan.nextTest.module.title) }))
  } else if (plan.nextNew !== null && !plan.newLessonBlocked) {
    lines.push(t('today.partNew', { lesson: lt(plan.nextNew.lesson.missionTitle) }))
  }

  return (
    <section
      aria-labelledby="today-title"
      className="mb-6 rounded-md border border-accent/30 bg-panel px-5 py-4"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Sunrise size={18} aria-hidden className="shrink-0 text-accent" />
        <h2 id="today-title" className="flex-1 text-sm font-bold uppercase tracking-wide text-ink">
          {t('today.title')}
        </h2>
        {plan.focus !== 'done' && (
          <span className="font-mono text-xs font-medium text-ink-muted">
            {t('today.minutes', { minutes: plan.minutes })}
          </span>
        )}
      </div>

      {/* Người vắng lâu quay lại (phát hiện K3): nói ra khoảng vắng
          trước khi giao việc. Im lặng giả vờ như không có gì xảy ra là
          thứ khiến người ta đóng app lần nữa — mà giọng phải là đón,
          không phải trách: khoảng trống không bao giờ là lỗi của họ. */}
      {ngayVang !== null && ngayVang >= VANG_LAU_NGAY && (
        <p className="mt-2 text-sm text-ink">{t('today.quayLai', { ngay: ngayVang })}</p>
      )}

      {plan.focus === 'done' ? (
        <p className="mt-2 text-sm text-ink-muted">{t('today.doneBody')}</p>
      ) : (
        <ul className="mt-2 flex flex-col gap-1">
          {lines.map((line, i) => (
            <li key={i} className="text-sm text-ink">
              {line}
            </li>
          ))}
        </ul>
      )}

      {/* Thẻ ĐANG MỜ (kho ý tưởng A1): chưa tới hạn nên KHÔNG mời ôn sớm
          — ôn sớm là phá chính giãn cách đang giữ trí nhớ. Đây là câu
          nói thật về trí nhớ đang nguội dần, và là lý do quay lại mai
          tử tế hơn nỗi sợ mất chuỗi ngày. */}
      {fading > 0 && <p className="mt-2 text-xs text-ink-muted">{t('today.fading', { count: fading })}</p>}

      {/* Nợ quá trần: nói thật là bài MỚI đang khóa, ngay tại chỗ mời ôn —
          không để người học bấm vào bài mới rồi mới đâm vào cửa khóa. */}
      {plan.newLessonBlocked && (
        <p className="mt-2 text-sm text-warn">{t('learn.overdueBlockBody', { count: plan.dueCount })}</p>
      )}

      {action !== null && (
        <Link
          to={action.to}
          className="mt-3 inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition-colors duration-(--dur) hover:brightness-110"
        >
          {action.label}
        </Link>
      )}
    </section>
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
          // Đây là VIỆC KẾ TIẾP của module — đường quay lại nhắm vào nó.
          {...{ [NEXT_ACTION_ATTR]: '' }}
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
      // Neo để đường quay lại cuộn đúng card này vào tầm nhìn; tabIndex
      // -1 cho nó nhận được focus theo lối lập trình mà KHÔNG chen vào
      // thứ tự Tab thường (card không phải là thứ để tab qua).
      id={moduleAnchorId(module.id)}
      tabIndex={-1}
      data-part={module.part}
      className={`flex flex-col gap-5 rounded-md border bg-panel p-5 focus:outline-none ${status === 'locked' ? 'border-edge/60' : 'border-edge'}`}
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

      {/* Thanh tiến độ CHỈ hiện ở module đang mở (phát hiện J5+J6, khối
          21.45). Nó đo XP kiếm được, nên ở hai đầu kia nó nói dối:
          module còn KHÓA hiện "15%" (mốc khởi đầu) mà người học chưa mở
          bài nào — chín thẻ khóa liên tiếp là chín lần cùng một con số
          rỗng; còn module ĐÃ ĐẬU bằng thi vượt thì không có XP nào (thi
          không cộng XP) nên thanh gần rỗng đứng cạnh huy hiệu "Đã đạt ·
          89%", hai con số cãi nhau trên cùng một thẻ. Ở module đã đậu,
          chính huy hiệu mới là câu trả lời. */}
      {status === 'open' && <ProgressBar earnedXp={moduleXp[module.id] ?? 0} totalXp={moduleXpTotal(module)} />}
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
          // Học hết bài rồi thì THI là việc kế tiếp của module này.
          {...(status === 'passed' ? {} : { [NEXT_ACTION_ATTR]: '' })}
          className="flex items-center gap-3 rounded-md border border-accent/30 bg-panel-hover px-4 py-3 transition-colors duration-(--dur) hover:border-accent"
        >
          <GraduationCap size={17} aria-hidden className="text-accent" />
          <span className="flex-1 text-sm font-semibold text-ink">
            {status === 'passed' ? t('learn.retakeTest') : t('learn.takeTest')}
          </span>
          <span className="text-xs font-semibold text-accent">→</span>
        </Link>
      )}

      {/* CỬA VƯỢT CHỈ CÓ MỘT (phát hiện J4, khối 21.45). Trước đây card
          có hai lối vào cùng trỏ một đường: chip trên đầu và một hàng
          trọn câu ở cuối. Hai cửa giống hệt nhau trên cùng một thẻ,
          nhân với 21 thẻ, là 21 lần bắt người học đọc lại một lựa chọn
          họ vừa bỏ qua. Giữ chip trên đầu vì ý "mình biết phần này rồi"
          nảy ra lúc đọc TÊN module, không phải sau khi đọc hết danh
          sách bài; câu đầy đủ vẫn còn nguyên trong aria-label/title. */}

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
  const completedLessons = useProgress((s) => s.completedLessons)
  const lessonRuntimes = useProgress((s) => s.lessonRuntimes)
  const streak = useProgress((s) => s.streak)

  const [searchParams] = useSearchParams()

  const today = todayIso()
  const statuses = computeModuleStatuses(
    modules.map((m) => m.id),
    new Set(passedModules),
  )
  const plan = planToday({ modules, passedModules, completedLessons, lessonRuntimes, reviewCards, today })
  // Thẻ đang mờ (kho A1) — chỉ để KỂ, không phải để mời ôn sớm.
  const fading = fadingCards(reviewCards, today).length
  useScrollToModule(resolveTargetModule(modules, searchParams.get(FOCUS_PARAM)))

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

      <TodayCard plan={plan} fading={fading} ngayVang={soNgayVang(streak, today)} />

      {/* Bản đồ đường đi đứng NGAY TRÊN danh sách chủ đề, dưới thẻ Hôm
          nay (B1): thẻ Hôm nay trả lời "làm gì bây giờ", dải này trả lời
          "mình đang ở đâu trong cả khóa" — và nó là tiêu đề hình của
          đúng danh sách nằm ngay dưới. */}
      <CourseTrail
        modules={modules}
        passed={new Set(passedModules)}
        currentId={modules.find((m) => statuses[m.id] === 'open')?.id ?? null}
      />

      <div className="flex flex-col gap-6">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} status={statuses[m.id] ?? 'locked'} />
        ))}
      </div>
    </>
  )
}
