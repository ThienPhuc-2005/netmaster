// Bản đồ chặng của một module — goal gradient (spec 2.4): 4-6 chặng nhỏ
// NHÌN THẤY ĐƯỢC để đích lúc nào cũng ở ngay trước mặt. Chặng xong tô
// đầy màu nhấn, chặng đang học có vòng sáng, chặng chưa mở khóa mờ.

import { Check, Lock } from 'lucide-react'
import { useT } from '../i18n'

export type StageState = 'done' | 'active' | 'locked'

export interface StageItem {
  id: string
  title: string
  state: StageState
}

function StageDot({ state }: { state: StageState }) {
  if (state === 'done') {
    return (
      <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-contrast">
        <Check size={16} aria-hidden />
      </span>
    )
  }
  if (state === 'active') {
    return (
      <span className="flex size-8 items-center justify-center rounded-full border-2 border-accent bg-panel">
        <span className="size-2.5 rounded-full bg-accent" />
      </span>
    )
  }
  return (
    <span className="flex size-8 items-center justify-center rounded-full border border-edge bg-panel text-ink-muted">
      <Lock size={13} aria-hidden />
    </span>
  )
}

export function StageMap({ stages }: { stages: StageItem[] }) {
  const t = useT()
  return (
    <ol aria-label={t('stage.aria')} className="flex items-start">
      {stages.map((stage, i) => (
        <li
          key={stage.id}
          aria-current={stage.state === 'active' ? 'step' : undefined}
          className="flex flex-1 flex-col items-center gap-2"
        >
          <div className="flex w-full items-center">
            {/* Đường nối trái — tô màu khi đã đi qua */}
            <span
              aria-hidden
              className={`h-0.5 flex-1 ${i === 0 ? 'invisible' : ''} ${
                stage.state === 'locked' ? 'bg-edge' : 'bg-accent'
              }`}
            />
            <StageDot state={stage.state} />
            <span
              aria-hidden
              className={`h-0.5 flex-1 ${i === stages.length - 1 ? 'invisible' : ''} ${
                stage.state === 'done' ? 'bg-accent' : 'bg-edge'
              }`}
            />
          </div>
          <div className="flex flex-col items-center gap-0.5 px-1 text-center">
            <span
              className={`text-xs font-medium ${stage.state === 'locked' ? 'text-ink-muted' : 'text-ink'}`}
            >
              {stage.title}
            </span>
            <span className="text-[10px] uppercase tracking-wide text-ink-muted">
              {t(`stage.${stage.state}`)}
            </span>
          </div>
        </li>
      ))}
    </ol>
  )
}
