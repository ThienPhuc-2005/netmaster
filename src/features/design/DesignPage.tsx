// Trang trưng bày design system — công cụ nội bộ để duyệt token, âm
// hiệu và component bằng mắt/tai ở cả hai theme (vào thẳng /design,
// không nằm trong menu 4 tab). Dữ liệu minh họa mô phỏng nội dung bài
// học nên để tiếng Việt như nội dung thật.

import { useT } from '../../i18n'
import { Button } from '../../components/Button'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { ProgressBar } from '../../components/ProgressBar'
import { StageMap } from '../../components/StageMap'
import { playEarcon, type EarconKind } from '../../audio/earcons'
import { XP_AMOUNTS } from '../../engine/xp'

const SWATCHES = [
  'surface',
  'panel',
  'panel-hover',
  'edge',
  'ink',
  'ink-muted',
  'accent',
  'ok',
  'warn',
  'danger',
  'part-a',
  'part-b',
  'part-c',
] as const

// Một module 4 bài: tổng XP bài học = 4 × (retrieval + practice).
const SAMPLE_MODULE_XP = 4 * (XP_AMOUNTS.retrieval + XP_AMOUNTS.practice)

const SAMPLE_STAGES = [
  { id: 's1', title: 'Lá thư đầu tiên', state: 'done' as const },
  { id: 's2', title: 'Phong bì & địa chỉ', state: 'done' as const },
  { id: 's3', title: 'Bưu tá lên đường', state: 'active' as const },
  { id: 's4', title: 'Thư trả lời', state: 'locked' as const },
  { id: 's5', title: 'Tổng ôn', state: 'locked' as const },
]

const EARCON_KEYS: { kind: EarconKind; labelKey: string }[] = [
  { kind: 'correct', labelKey: 'design.earconCorrect' },
  { kind: 'incorrect', labelKey: 'design.earconIncorrect' },
  { kind: 'lessonComplete', labelKey: 'design.earconLessonComplete' },
  { kind: 'stageUp', labelKey: 'design.earconStageUp' },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b border-edge pb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function DesignPage() {
  const t = useT()
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl font-bold">{t('design.title')}</h1>

      <Section title={t('design.palette')}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SWATCHES.map((name) => (
            <div key={name} className="flex items-center gap-3 rounded-md border border-edge bg-panel p-3">
              <span className="size-8 shrink-0 rounded border border-edge" style={{ background: `var(--${name})` }} />
              <span className="font-mono text-xs text-ink-muted">--{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t('design.buttons')}>
        <div className="flex items-center gap-3">
          <Button>Bắt đầu học</Button>
          <Button variant="ghost">Đào sâu hơn</Button>
          <Button disabled>Bắt đầu học</Button>
        </div>
      </Section>

      <Section title={t('design.feedback')}>
        <div className="flex flex-col gap-3">
          <FeedbackBanner state={{ kind: 'correct' }} />
          <FeedbackBanner state={{ kind: 'incorrect', tier: 1, topic: 'địa chỉ IP' }} />
          <FeedbackBanner
            state={{
              kind: 'incorrect',
              tier: 2,
              topic: 'địa chỉ IP',
              hint: 'Địa chỉ nhà nằm NGOÀI phong bì để bưu tá đọc được — trường nào của gói tin cũng lộ ra ngoài như vậy?',
            }}
          />
          <FeedbackBanner
            state={{
              kind: 'incorrect',
              tier: 3,
              topic: 'địa chỉ IP',
              hint: 'Địa chỉ nhà nằm NGOÀI phong bì để bưu tá đọc được — trường nào của gói tin cũng lộ ra ngoài như vậy?',
              solution:
                'Đáp án là địa chỉ IP đích: router chỉ đọc phần "ngoài phong bì" (header) để biết chuyển tiếp đi đâu, không mở nội dung bên trong.',
            }}
          />
        </div>
      </Section>

      <Section title={t('design.progressBar')}>
        <div className="flex flex-col gap-4">
          <ProgressBar earnedXp={0} totalXp={SAMPLE_MODULE_XP} />
          <ProgressBar earnedXp={SAMPLE_MODULE_XP / 2} totalXp={SAMPLE_MODULE_XP} />
          <ProgressBar earnedXp={SAMPLE_MODULE_XP} totalXp={SAMPLE_MODULE_XP} />
        </div>
      </Section>

      <Section title={t('design.stageMap')}>
        <div className="rounded-md border border-edge bg-panel p-5">
          <StageMap stages={SAMPLE_STAGES} />
        </div>
      </Section>

      <Section title={t('design.earcons')}>
        <div className="flex items-center gap-3">
          {EARCON_KEYS.map(({ kind, labelKey }) => (
            <Button key={kind} variant="ghost" onClick={() => playEarcon(kind)}>
              {t(labelKey)}
            </Button>
          ))}
        </div>
      </Section>
    </div>
  )
}
