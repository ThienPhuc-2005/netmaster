// Màn tốt nghiệp (quyết định 5 của spec v2) — MỘT trang cho cả hai mốc:
// đậu hết nhập môn (Phần A-C) và đậu cả khóa (M21 capstone).
//
// Màn này là TẤM GƯƠNG, không phải phần thưởng: chỉ ĐỌC số liệu từ store
// và chiếu lại chặng đường — không cộng XP, không đụng streak, không ghi
// gì (nguyên tắc 5: thi và màn kết không phải nguồn điểm). Vì thế cả
// trang không gọi một action nào của store.
//
// Tấm hình trung tâm là chính bản đồ 21 ô người học đã thấy từ Module 1
// (vis-ban-do-khoa-hoc) — nhưng ở đây tô theo MODULE ĐÃ ĐẬU của riêng họ,
// suy từ dữ liệu thật: hàng theo Phần, tông theo token --part-*. Nhãn
// trong hình là UI-chrome nên đi qua i18n như mọi chữ của trang.

import { Link, useParams } from 'react-router'
import { BookOpenCheck, ChevronLeft, Flame, GraduationCap, Layers, Stethoscope, Zap } from 'lucide-react'
import type { ComponentType } from 'react'
import { useT } from '../../i18n'
import { EmptyState } from '../../components/EmptyState'
import { loadModules } from '../../content'
import { useProgress } from '../../store/progress'
import { milestones, type MilestoneId } from './milestones'

const PART_TOKEN: Record<string, string> = {
  A: 'var(--part-a)',
  B: 'var(--part-b)',
  C: 'var(--part-c)',
  D: 'var(--part-d)',
  E: 'var(--part-e)',
}

/** Bản đồ hành trình: mỗi hàng một Phần, ô tô đậm là module ĐÃ ĐẬU. */
function JourneyMap({ passed, label }: { passed: ReadonlySet<string>; label: string }) {
  const modules = loadModules()
  const parts = [...new Set(modules.map((m) => m.part))]
  const rows = parts.map((part) => ({
    part,
    items: modules.filter((m) => m.part === part),
  }))
  const height = 16 + rows.length * 22 + 6
  return (
    <svg
      viewBox={`0 0 220 ${height}`}
      role="img"
      aria-label={label}
      className="w-full max-w-md rounded-md border border-edge bg-panel"
    >
      {rows.map(({ part, items }, rowIndex) => {
        const y = 14 + rowIndex * 22
        const color = PART_TOKEN[part] ?? 'var(--ink-muted)'
        return (
          <g key={part}>
            {items.map((m, i) => (
              <rect
                key={m.id}
                x={24 + i * 20}
                y={y}
                width="14"
                height="14"
                rx="3"
                fill={passed.has(m.id) ? color : 'none'}
                stroke={color}
                strokeWidth="2"
                opacity={passed.has(m.id) ? 1 : 0.45}
              />
            ))}
            <text
              x={24 + items.length * 20 + 4}
              y={y + 11}
              fontSize="10"
              fill={color}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {`${part} · ${items[0]?.order}-${items.at(-1)?.order}`}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Tile({ icon: Icon, label, value, unit }: { icon: ComponentType<{ size?: number; 'aria-hidden'?: boolean; className?: string }>; label: string; value: string | number; unit?: string }) {
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

export function GraduationPage() {
  const t = useT()
  const params = useParams<{ milestoneId: string }>()
  const passedModules = useProgress((s) => s.passedModules)
  const xpTotal = useProgress((s) => s.xpTotal)
  const streak = useProgress((s) => s.streak)
  const reviewCards = useProgress((s) => s.reviewCards)
  const completedLessons = useProgress((s) => s.completedLessons)
  const clinicSolved = useProgress((s) => s.clinicSolved)

  const milestone = milestones().find((m) => m.id === params.milestoneId)
  const reached = milestone !== undefined && passedModules.includes(milestone.moduleId)

  // Gõ URL trực tiếp không vượt được cổng — cùng bất biến với bài học và
  // bài thi: màn tổng kết của một mốc chưa chạm là lời hứa suông.
  if (!reached) {
    return (
      <EmptyState
        icon={GraduationCap}
        title={t('grad.notReachedTitle')}
        body={t('grad.notReachedBody')}
        action={
          <Link to="/" className="text-sm font-medium text-accent hover:underline">
            {t('grad.backToLearn')}
          </Link>
        }
      />
    )
  }

  const id: MilestoneId = milestone.id
  const modules = loadModules()
  const passedSet = new Set(passedModules)
  const passedCount = modules.filter((m) => passedSet.has(m.id)).length

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex items-start gap-3">
        <GraduationCap size={28} aria-hidden className="mt-1 shrink-0 text-accent" />
        <div>
          <h1 className="text-xl font-bold text-ink">
            {t(id === 'nhap-mon' ? 'grad.titleNhapMon' : 'grad.titleTrungCap')}
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {t(id === 'nhap-mon' ? 'grad.subtitleNhapMon' : 'grad.subtitleTrungCap')}
          </p>
        </div>
      </div>

      <section aria-labelledby="grad-map">
        <h2 id="grad-map" className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          {t('grad.mapTitle')}
        </h2>
        <JourneyMap passed={passedSet} label={t('grad.mapAria')} />
      </section>

      <section aria-labelledby="grad-stats">
        <h2 id="grad-stats" className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          {t('grad.statsTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Tile icon={BookOpenCheck} label={t('grad.statModules')} value={`${passedCount}/${modules.length}`} />
          <Tile icon={Zap} label={t('grad.statXp')} value={xpTotal} />
          <Tile icon={Flame} label={t('grad.statStreak')} value={streak.current} unit={t('grad.statStreakUnit')} />
          <Tile icon={Layers} label={t('grad.statCards')} value={reviewCards.length} />
          <Tile icon={BookOpenCheck} label={t('grad.statLessons')} value={Object.keys(completedLessons).length} />
          <Tile icon={Stethoscope} label={t('grad.statClinic')} value={Object.keys(clinicSolved).length} />
        </div>
      </section>

      <p className="rounded-md border border-edge bg-panel px-5 py-4 text-sm leading-relaxed text-ink-muted">
        {t(id === 'nhap-mon' ? 'grad.nextRoadNhapMon' : 'grad.nextRoadTrungCap')}
      </p>
      <p className="text-xs text-ink-muted">{t('grad.noXpNote')}</p>

      <div>
        <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
          <ChevronLeft size={15} aria-hidden />
          {t('grad.backToLearn')}
        </Link>
      </div>
    </div>
  )
}
