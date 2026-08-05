// Thanh tiến độ module — endowed progress (spec 2.4): không bao giờ
// hiển thị dưới 15%. Con số % do engine tính (moduleProgressPct) — UI
// không tự cộng trừ để hai nơi không bao giờ lệch nhau.

import { useT } from '../i18n'
import { moduleProgressPct } from '../engine/xp'

export function ProgressBar({
  earnedXp,
  totalXp,
  label,
}: {
  earnedXp: number
  totalXp: number
  /** Nhãn hiển thị cạnh %; mặc định là aria-label chung. */
  label?: string
}) {
  const t = useT()
  const pct = moduleProgressPct(earnedXp, totalXp)
  const rounded = Math.round(pct)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-ink-muted">{label ?? t('progress.aria')}</span>
        <span className="font-mono font-semibold text-ink">{rounded}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label ?? t('progress.aria')}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        className="h-2 overflow-hidden rounded-full border border-edge bg-panel"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-(--dur) ease-(--ease)"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
