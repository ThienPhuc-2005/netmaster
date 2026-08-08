// Chuyến đi xem — mỗi lần MỘT phòng (spec Module 5).
//
// Đây là bước Dạy, nên ở đây KHÔNG có chấm điểm, không XP, không thang
// 3 tầng: xem không phải retrieval (nguyên tắc 5). Việc duy nhất của màn
// này là mã hóa cho chắc — một phòng một màn hình (nguyên tắc 3), hình
// đứng ngay cạnh chữ (Mayer), và bản đồ luôn hiện để người học biết mình
// đang ở đâu trong tòa nhà.

import { useState } from 'react'
import { lt } from '../../engine/ltext'
import { ArrowRight } from 'lucide-react'
import { currentTourRoom, seeNextRoom, startTour, type Palace } from '../../engine/palace'
import { Button } from '../../components/Button'
import { useT } from '../../i18n'
import { PalaceMap } from './PalaceMap'
import { RoomGlyph } from './RoomGlyph'

export interface PalaceTourProps {
  palace: Palace
  /** Đoạn đường của chuyến này; bỏ trống = cả tòa nhà. */
  roomIds?: readonly string[]
  /** Gọi khi người học đi hết đoạn đường (bài học dùng để mở nút đi tiếp). */
  onComplete?: () => void
}

export function PalaceTour({ palace, roomIds, onComplete }: PalaceTourProps) {
  const t = useT()
  const [tour, setTour] = useState(() => startTour(palace, roomIds))
  const room = currentTourRoom(tour, palace)
  if (room === null) return null

  const seen = tour.route.slice(0, tour.index + 1)
  const atLast = tour.index === tour.route.length - 1

  const goNext = () => {
    if (atLast) {
      setTour({ ...tour, completed: true })
      onComplete?.()
      return
    }
    setTour(seeNextRoom(tour, palace))
  }

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(200px,260px)]">
      <div className="flex flex-col gap-3 rounded-md border border-edge bg-panel p-4">
        <p className="text-xs uppercase tracking-wide text-ink-muted">
          {t('palace.roomOf', { index: String(tour.index + 1), total: String(tour.route.length) })}
          {' · '}
          {t('palace.location', { floor: String(room.floor), position: String(room.position) })}
        </p>

        <div className="flex items-start gap-4">
          <div className="h-24 w-24 shrink-0 rounded-md border border-edge bg-bg p-1">
            <RoomGlyph imageId={room.imageId} label={room.name} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-2xl font-semibold text-ink">{room.keys.join(' / ')}</p>
            <p className="text-sm font-semibold text-ink">{room.name}</p>
            {room.note !== undefined && (
              <p className="text-xs uppercase tracking-wide text-ink-muted">{lt(room.note)}</p>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-ink">{lt(room.story)}</p>

        <div className="flex items-center gap-3">
          <Button onClick={goNext}>
            {atLast ? t('palace.tourDone') : t('palace.tourNext')}
            {!atLast && <ArrowRight size={15} aria-hidden />}
          </Button>
          {tour.completed && <span className="text-xs text-ink-muted">{t('palace.tourCompleted')}</span>}
        </div>
      </div>

      <PalaceMap palace={palace} currentRoomId={room.id} routeIds={tour.route} revealedRoomIds={seen} />
    </div>
  )
}
