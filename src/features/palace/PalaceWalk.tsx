// Chuyến đi lại từ trí nhớ — đây mới là retrieval (spec Module 5).
//
// Cửa phòng đóng: người học chỉ thấy MỘT thứ, là hình gợi nhớ của phòng
// (trong phương pháp loci, chỗ + hình chính là gợi ý; con số mới là thứ
// phải nhớ). Thang 3 tầng đúng như mọi bài tập khác của app:
//   tầng 1 — chỉ ra đang hụt vế nào (số cổng hay tên dịch vụ),
//   tầng 2 — kể lại câu chuyện của phòng,
//   tầng 3 — nói thẳng đáp án, nhưng người học VẪN phải tự gõ lại.
//
// Nộp bài không có nút riêng: chuyến đi tự khép khi đi hết đoạn đường,
// và lúc đó kết quả thô được trao lên cho tầng gọi chấm. Khác phòng lab
// (ở đó người học tự quyết lúc nào nộp một sơ đồ) — ở đây "đi hết" là
// định nghĩa của làm xong.

import { useState, type FormEvent } from 'react'
import { CornerDownLeft } from 'lucide-react'
import {
  currentWalkRoom,
  startWalk,
  submitRoomAnswer,
  walkScore,
  type Palace,
  type RoomOutcome,
} from '../../engine/palace'
import { Button } from '../../components/Button'
import { FeedbackBanner, type FeedbackState } from '../../components/FeedbackBanner'
import { useT } from '../../i18n'
import { PalaceMap } from './PalaceMap'
import { RoomGlyph } from './RoomGlyph'
import { parsePorts } from './parsePorts'

export interface PalaceWalkProps {
  palace: Palace
  /** Đoạn đường của chuyến này; bỏ trống = cả tòa nhà. */
  roomIds?: readonly string[]
  /** Trao kết quả thô khi đi hết đoạn đường; bỏ trống = chỉ luyện chơi. */
  onComplete?: (outcomes: RoomOutcome[]) => void
}

export function PalaceWalk({ palace, roomIds, onComplete }: PalaceWalkProps) {
  const t = useT()
  const [walk, setWalk] = useState(() => startWalk(palace, roomIds))
  const [portText, setPortText] = useState('')
  const [serviceText, setServiceText] = useState('')
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)

  const room = currentWalkRoom(walk, palace)
  const answered = walk.outcomes.map((o) => o.roomId)
  const score = walkScore(walk)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (room === null) return
    const ports = parsePorts(portText)
    if (ports.length === 0 || serviceText.trim() === '') return

    const step = submitRoomAnswer(walk, palace, { ports, service: serviceText })
    setWalk(step.runtime)

    if (step.advanced) {
      setFeedback({ kind: 'correct' })
      setPortText('')
      setServiceText('')
      if (step.runtime.completed) onComplete?.(step.runtime.outcomes)
      return
    }

    // Tầng 1 nói đúng vế đang hụt — người học biết mình quên NỬA nào.
    const topic = step.grade.portsCorrect
      ? t('palace.topicService')
      : step.grade.serviceCorrect
        ? t('palace.topicPorts')
        : t('palace.topicBoth')
    setFeedback({
      kind: 'incorrect',
      tier: step.tier === 0 ? 1 : step.tier,
      topic,
      hint: step.tier >= 2 ? room.story.vi : undefined,
      solution:
        step.tier >= 3
          ? t('palace.solutionLine', { ports: room.ports.join(', '), service: room.service })
          : undefined,
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(200px,260px)]">
      <div className="flex flex-col gap-3">
        {room !== null ? (
          <form onSubmit={submit} className="flex flex-col gap-3 rounded-md border border-edge bg-panel p-4">
            <p className="text-xs uppercase tracking-wide text-ink-muted">
              {t('palace.roomOf', { index: String(walk.index + 1), total: String(walk.route.length) })}
              {' · '}
              {t('palace.location', { floor: String(room.floor), position: String(room.position) })}
            </p>

            <div className="flex items-center gap-4">
              <div className="h-20 w-20 shrink-0 rounded-md border border-edge bg-bg p-1">
                <RoomGlyph imageId={room.imageId} label={t('palace.cueAria')} />
              </div>
              <p className="text-sm text-ink">{t('palace.walkPrompt')}</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs text-ink-muted">
                {t('palace.portsLabel')}
                <input
                  value={portText}
                  onChange={(e) => setPortText(e.target.value)}
                  inputMode="numeric"
                  autoFocus
                  placeholder={t('palace.portsPlaceholder')}
                  className="rounded-md border border-edge bg-panel px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-muted"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-ink-muted">
                {t('palace.serviceLabel')}
                <input
                  value={serviceText}
                  onChange={(e) => setServiceText(e.target.value)}
                  placeholder={t('palace.servicePlaceholder')}
                  className="rounded-md border border-edge bg-panel px-3 py-2 text-sm text-ink placeholder:text-ink-muted"
                />
              </label>
            </div>

            <div>
              <Button type="submit" disabled={parsePorts(portText).length === 0 || serviceText.trim() === ''}>
                <CornerDownLeft size={15} aria-hidden />
                {t('palace.walkCheck')}
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-2 rounded-md border border-edge bg-panel p-4" role="status">
            <p className="text-sm font-semibold text-ink">{t('palace.walkDone')}</p>
            <p className="text-sm text-ink-muted">
              {t('palace.walkScore', {
                recalled: String(score.recalled),
                total: String(score.total),
              })}
            </p>
          </div>
        )}

        {feedback !== null && room !== null && <FeedbackBanner state={feedback} />}
      </div>

      <PalaceMap palace={palace} currentRoomId={room?.id ?? null} routeIds={walk.route} revealedRoomIds={answered} />
    </div>
  )
}
