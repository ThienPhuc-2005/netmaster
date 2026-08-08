// Sơ đồ tòa nhà: 5 tầng × 3 phòng, tầng cao vẽ ở trên.
//
// Bản đồ luôn hiện trong cả hai chuyến đi vì nó chính là cái khung không
// gian mà người học treo trí nhớ lên. Nó cũng là thanh tiến độ tự nhiên
// của chuyến đi — không cần thêm một thanh phần trăm nào nữa.
//
// Phòng ngoài đoạn đường của chuyến này vẫn được vẽ (tòa nhà không đổi
// hình theo bài học), nhưng mờ đi để không tranh chỗ với việc đang làm.

import { roomAt, type Palace } from '../../engine/palace'
import { useT } from '../../i18n'

export interface PalaceMapProps {
  palace: Palace
  /** Phòng đang đứng. */
  currentRoomId?: string | null
  /** Phòng thuộc chuyến đi này (bỏ trống = cả tòa nhà). */
  routeIds?: readonly string[]
  /** Phòng đã lật ngửa — hiện số cổng thay cho dấu hỏi. */
  revealedRoomIds?: readonly string[]
}

export function PalaceMap({ palace, currentRoomId = null, routeIds, revealedRoomIds = [] }: PalaceMapProps) {
  const t = useT()
  const inRoute = routeIds === undefined ? null : new Set(routeIds)
  const revealed = new Set(revealedRoomIds)
  const floors = Array.from({ length: palace.floors }, (_, i) => palace.floors - i)

  return (
    <div className="rounded-md border border-edge bg-panel p-3" aria-label={t('palace.mapAria')} role="group">
      <div className="flex flex-col gap-1.5">
        {floors.map((floor) => (
          <div key={floor} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-right text-[11px] uppercase tracking-wide text-ink-muted">
              {t('palace.floorShort', { floor: String(floor) })}
            </span>
            {/* Số cột theo tòa nhà — style inline vì Tailwind không sinh
                class động từ dữ liệu lúc chạy. */}
            <div
              className="grid flex-1 gap-1.5"
              style={{ gridTemplateColumns: `repeat(${palace.roomsPerFloor}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: palace.roomsPerFloor }, (_, i) => i + 1).map((position) => {
                const room = roomAt(palace, floor, position)
                const id = room?.id ?? ''
                const active = id !== '' && id === currentRoomId
                const included = room !== null && (inRoute === null || inRoute.has(id))
                const shown = revealed.has(id)
                return (
                  <div
                    key={position}
                    aria-current={active ? 'step' : undefined}
                    data-room={id}
                    data-state={active ? 'current' : shown ? 'revealed' : included ? 'pending' : 'outside'}
                    className={[
                      'flex h-11 items-center justify-center rounded border px-1 text-center font-mono text-xs',
                      active
                        ? 'border-accent bg-accent/15 text-ink'
                        : shown
                          ? 'border-edge bg-panel-hover text-ink'
                          : included
                            ? 'border-edge text-ink-muted'
                            : // Phòng NGOÀI đoạn đường đang đi vẫn phải đọc
                              // được: ở nền sáng, mờ 40% rơi xuống 1.82:1 —
                              // dưới cả mức "chữ trang trí" (hội đồng 07-08,
                              // ghế màu sắc). 60% giữ được cảm giác lùi lại
                              // mà chữ "·" vẫn nhìn ra.
                              'border-edge/60 text-ink-muted/60',
                    ].join(' ')}
                  >
                    {room === null ? '' : shown ? room.keys.join('/') : included ? '?' : '·'}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
