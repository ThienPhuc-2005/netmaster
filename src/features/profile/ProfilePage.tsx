// Tab Hồ sơ — đọc từ store tiến độ thật (persist localStorage).
// Huy hiệu là nội dung của khối sau; hiện tại nói rõ huy hiệu đầu tiên
// đến từ đâu (empty state có hướng dẫn — spec 4.5).

import { Flame, Zap, Award, Snowflake, Layers, BookOpenCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useT } from '../../i18n'
import { useProgress } from '../../store/progress'

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: LucideIcon
  label: string
  value: number
  unit?: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-edge bg-panel px-5 py-4">
      <Icon size={20} aria-hidden className="text-accent" />
      <div>
        <div className="font-mono text-2xl font-bold text-ink">
          {value}
          {unit !== undefined && <span className="ml-1 text-sm font-medium text-ink-muted">{unit}</span>}
        </div>
        <div className="text-xs text-ink-muted">{label}</div>
      </div>
    </div>
  )
}

export function ProfilePage() {
  const t = useT()
  const streak = useProgress((s) => s.streak)
  const xpTotal = useProgress((s) => s.xpTotal)
  const reviewCards = useProgress((s) => s.reviewCards)
  const completedLessons = useProgress((s) => s.completedLessons)

  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{t('profile.title')}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Flame} label={t('profile.streak')} value={streak.current} unit={t('profile.streakUnit')} />
        <StatCard icon={Zap} label={t('profile.xp')} value={xpTotal} />
        <StatCard icon={Snowflake} label={t('profile.freezes')} value={streak.freezesLeft} />
        <StatCard icon={BookOpenCheck} label={t('profile.lessonsDone')} value={Object.keys(completedLessons).length} />
        <StatCard icon={Layers} label={t('profile.cardsTotal')} value={reviewCards.length} />
      </div>
      <p className="mt-4 text-xs text-ink-muted">{t('profile.freezeNote')}</p>
      <div className="mt-6 flex items-start gap-3 rounded-md border border-edge bg-panel px-5 py-4 text-sm text-ink-muted">
        <Award size={18} aria-hidden className="mt-0.5 shrink-0" />
        <p>{t('profile.emptyBadges')}</p>
      </div>
    </>
  )
}
