// Mặt bàn của phòng lab: ba tầng chồng nhau trong một khung tỉ lệ cố định.
//
//   z-0  dây nối        <svg>      — đường cong là việc của SVG
//   z-10 thiết bị/cổng  <button>   — focus, aria, hit-test miễn phí; và
//                                     Testing Library "nhìn thấy" được
//   z-20 gói tin        <svg>      — bay trên mọi thứ, không chắn chuột
//
// Vì sao thiết bị KHÔNG nằm trong SVG: để chúng là <button> thật. Nhờ đó
// bàn phím, trình đọc màn hình và test đều dùng được đúng một đường mã
// với chuột — thay vì phải dựng ba hệ thống song song.

import {
  useMemo,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { m } from 'motion/react'
import { PacketShape } from '../../components/PacketShape'
import { DeviceGlyph } from '../../components/DeviceGlyph'
import { useT } from '../../i18n'
import {
  DESIGN_H,
  DESIGN_W,
  DEVICE_H,
  DEVICE_W,
  GRID,
  pointerToModel,
  portPoint,
  snapToGrid,
  wirePath,
  type Point,
} from './geometry'
import { HOP_MS, type PacketFlight } from './usePacketFlight'
import {
  computeStp,
  findDevice,
  isPortBlocked,
  linkOfPort,
  peerOfPort,
  portIdsOf,
  portModeOf,
  samePort,
  switchPortOf,
  type Device,
  type PortRef,
  type StpState,
  type Topology,
} from '../../engine/lab'

/** Vị trí một cổng trên mặt bàn — dùng chung cho vẽ dây và cho đường ray gói tin. */
export function pointOfPort(topo: Topology, layout: Record<string, Point>, ref: PortRef): Point | null {
  const device = findDevice(topo, ref.deviceId)
  const pos = layout[ref.deviceId]
  if (device === null || pos === undefined) return null
  const ports = portIdsOf(device)
  const index = ports.indexOf(ref.portId)
  if (index < 0) return null
  return portPoint(pos, index, ports.length)
}

const percentX = (x: number) => `${(x / DESIGN_W) * 100}%`
const percentY = (y: number) => `${(y / DESIGN_H) * 100}%`

interface PortDotProps {
  topo: Topology
  device: Device
  portId: string
  at: Point
  armed: PortRef | null
  stp: StpState
  onPick: (ref: PortRef) => void
}

function PortDot({ topo, device, portId, at, armed, stp, onPick }: PortDotProps) {
  const t = useT()
  const ref: PortRef = { deviceId: device.id, portId }
  const connected = linkOfPort(topo, ref) !== null
  const isArmed = samePort(armed, ref)
  // Đang cầm một đầu dây thì mọi cổng CÒN TRỐNG sáng nhẹ lên: người học
  // thấy ngay mình được thả vào đâu.
  const isCandidate = armed !== null && !isArmed && !connected

  const peer = peerOfPort(topo, ref)
  const peerName = peer === null ? null : (findDevice(topo, peer.deviceId)?.hostname ?? peer.deviceId)
  // Hai vai của cổng (Module 14) và trạng thái STP (Module 15) đi THẲNG
  // vào tên đọc được của nút: người dùng bàn phím và trình đọc màn hình
  // phải biết cổng này là trunk hay đang bị chặn, không chỉ nhìn màu.
  const switchPort = switchPortOf(topo, ref)
  const isTrunk = switchPort !== null && portModeOf(switchPort) === 'trunk'
  const blocked = isPortBlocked(stp, ref)
  const badges = [isTrunk ? t('lab.portTrunkBadge') : '', blocked ? t('lab.portBlockedBadge') : '']
    .filter((x) => x !== '')
    .join(', ')
  const label = `${device.hostname} · ${portId} — ${
    peerName === null ? t('lab.portFree') : t('lab.portTo', { target: peerName })
  }${badges === '' ? '' : ` (${badges})`}`

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isArmed}
      onClick={() => onPick(ref)}
      style={{ left: percentX(at.x), top: percentY(at.y) }}
      className="absolute z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span
        aria-hidden
        className={[
          'block rounded-full border-2 transition-all duration-(--dur)',
          isArmed ? 'h-3.5 w-3.5 border-accent bg-accent' : '',
          isCandidate ? 'h-3.5 w-3.5 border-accent bg-panel' : '',
          // Cổng STP chặn: RỖNG RUỘT viền hổ phách — bóng dáng khác hẳn
          // cổng thường (Von Restorff). Nó không hỏng, nó đang nằm im.
          !isArmed && !isCandidate && blocked ? 'h-3.5 w-3.5 border-warn bg-transparent' : '',
          !isArmed && !isCandidate && !blocked && isTrunk ? 'h-3 w-3 border-accent bg-panel' : '',
          !isArmed && !isCandidate && !blocked && !isTrunk && connected
            ? 'h-2.5 w-2.5 border-ink-muted bg-ink-muted'
            : '',
          !isArmed && !isCandidate && !blocked && !isTrunk && !connected
            ? 'h-2.5 w-2.5 border-edge bg-panel'
            : '',
        ].join(' ')}
      />
    </button>
  )
}

interface DeviceNodeProps {
  device: Device
  pos: Point
  selected: boolean
  active: boolean
  dimmed: boolean
  wireCount: number
  onSelect: () => void
  onDragTo: (point: Point) => void
  canvasRef: React.RefObject<HTMLDivElement | null>
}

function DeviceNode({
  device,
  pos,
  selected,
  active,
  dimmed,
  wireCount,
  onSelect,
  onDragTo,
  canvasRef,
}: DeviceNodeProps) {
  const t = useT()
  const grab = useRef<{ dx: number; dy: number } | null>(null)

  const kindLabel = t(
    device.kind === 'pc' ? 'lab.kindPc' : device.kind === 'switch' ? 'lab.kindSwitch' : 'lab.kindRouter',
  )
  const wires = wireCount === 0 ? t('lab.wiresNone') : t('lab.wiresCount', { count: String(wireCount) })

  // Kéo bằng Pointer Events: gộp chuột/cảm ứng/bút trong một bộ handler.
  // Đây là đường PHỤ — mọi thao tác đều làm được bằng bấm chọn, nên môi
  // trường không hỗ trợ pointer capture cũng không mất chức năng nào.
  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect === undefined) return
    const at = pointerToModel(rect, event.clientX, event.clientY)
    grab.current = { dx: pos.x - at.x, dy: pos.y - at.y }
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
  }
  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const held = grab.current
    const rect = canvasRef.current?.getBoundingClientRect()
    if (held === null || rect === undefined) return
    const at = pointerToModel(rect, event.clientX, event.clientY)
    onDragTo(snapToGrid({ x: at.x + held.dx, y: at.y + held.dy }))
  }
  const endDrag = () => {
    grab.current = null
  }

  // Dời thiết bị bằng BÀN PHÍM — trước đây sắp xếp mặt bàn là thao tác
  // DUY NHẤT chỉ có đường kéo-thả, tức là người dùng bàn phím và trình
  // đọc màn hình không sắp lại được sơ đồ rối (hội đồng 07-08, ghế a11y).
  // Mỗi lần nhấn đi đúng MỘT ô lưới, cùng hàm snapToGrid với chuột, nên
  // hai đường vào cho ra cùng một tọa độ hợp lệ.
  const onKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const step: Record<string, Point> = {
      ArrowLeft: { x: -GRID, y: 0 },
      ArrowRight: { x: GRID, y: 0 },
      ArrowUp: { x: 0, y: -GRID },
      ArrowDown: { x: 0, y: GRID },
    }
    const delta = step[event.key]
    if (delta === undefined) return
    // Chặn cuộn trang: mũi tên lúc này thuộc về mặt bàn.
    event.preventDefault()
    onDragTo(snapToGrid({ x: pos.x + delta.x, y: pos.y + delta.y }))
  }

  return (
    <button
      type="button"
      aria-label={t('lab.deviceAria', { name: device.hostname, kind: kindLabel, wires })}
      aria-pressed={selected}
      onClick={onSelect}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      style={{
        left: percentX(pos.x),
        top: percentY(pos.y),
        width: `${(DEVICE_W / DESIGN_W) * 100}%`,
        aspectRatio: `${DEVICE_W} / ${DEVICE_H}`,
        // touch-action: kéo bằng ngón tay phải di thiết bị, không cuộn trang.
        touchAction: 'none',
      }}
      className={[
        'absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-md transition-opacity duration-(--dur)',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        selected ? 'bg-panel/80 ring-1 ring-accent' : '',
        dimmed ? 'opacity-40' : 'opacity-100',
      ].join(' ')}
    >
      {/* Nhãn nằm TRÊN thiết bị: hàng cổng chạy dọc cạnh dưới, để nhãn ở
          đó sẽ chồng lên vùng chạm của cổng. Dùng absolute nên nhãn không
          làm lệch tâm nút — tâm nút phải trùng đúng toạ độ thiết bị thì
          dây và đường bay gói tin mới cắm đúng chỗ. */}
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] leading-none text-ink-muted">
        {device.hostname}
      </span>
      <svg
        viewBox={`${-DEVICE_W / 2} ${-DEVICE_H / 2} ${DEVICE_W} ${DEVICE_H}`}
        className="h-full w-full"
        aria-hidden
      >
        <DeviceGlyph kind={device.kind} active={active} />
      </svg>
    </button>
  )
}

export interface LabCanvasProps {
  topology: Topology
  layout: Record<string, Point>
  selectedId: string | null
  armedPort: PortRef | null
  /** Thiết bị đang được gói tin ghé qua (signaling — spec 4.2). */
  activeDeviceIds: readonly string[]
  /** Có đang phát animation không: lúc đó thiết bị ngoài đường đi mờ đi. */
  flightActive: boolean
  flight: PacketFlight
  onSelectDevice: (deviceId: string) => void
  onPickPort: (ref: PortRef) => void
  onMoveDevice: (deviceId: string, point: Point) => void
}

export function LabCanvas({
  topology,
  layout,
  selectedId,
  armedPort,
  activeDeviceIds,
  flightActive,
  flight,
  onSelectDevice,
  onPickPort,
  onMoveDevice,
}: LabCanvasProps) {
  const t = useT()
  const canvasRef = useRef<HTMLDivElement>(null)
  const { frames, phase, railRef, railD, onHopComplete } = flight
  // Cây STP suy TỪ SƠ ĐỒ (thuần, rẻ) — không phải state của UI, nên sửa
  // mạng xong là hình vẽ đúng ngay, không cần ai nhớ đồng bộ.
  const stp = useMemo(() => computeStp(topology), [topology])

  const wires = topology.links.flatMap((link) => {
    const a = pointOfPort(topology, layout, link.a)
    const b = pointOfPort(topology, layout, link.b)
    return a === null || b === null ? [] : [{ id: link.id, d: wirePath(a, b) }]
  })

  return (
    /* Khung cuộn ngang: mặt bàn có chiều rộng TỐI THIỂU để hai vùng chạm
       cổng liền nhau không dính vào nhau (WCAG 2.5.8). Màn hẹp hơn mức đó
       thì cuộn ngang, chứ không thu nhỏ tiếp — thu nhỏ sẽ biến các cổng
       thành một cụm chấm không bấm trúng. Mọi thao tác vẫn làm trọn được
       ở bảng cấu hình bên dưới, nên cuộn chỉ là tiện ích xem sơ đồ. */
    <div className="w-full overflow-x-auto">
      <div
        ref={canvasRef}
        role="group"
        aria-label={t('lab.canvasAria')}
        className="relative w-full min-w-[560px] overflow-hidden rounded-md border border-edge bg-bg"
        style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}` }}
      >
      {/* Tầng dây */}
      <svg viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        {wires.map((wire) => (
          <path key={wire.id} d={wire.d} fill="none" stroke="var(--edge)" strokeWidth="2" />
        ))}
      </svg>

      {/* Tầng thiết bị + cổng */}
      {topology.devices.map((device) => {
        const pos = layout[device.id]
        if (pos === undefined) return null
        const ports = portIdsOf(device)
        const wireCount = ports.filter((portId) => linkOfPort(topology, { deviceId: device.id, portId }) !== null).length
        const active = activeDeviceIds.includes(device.id)
        return (
          <div key={device.id}>
            <DeviceNode
              device={device}
              pos={pos}
              selected={selectedId === device.id}
              active={active}
              dimmed={flightActive && !active}
              wireCount={wireCount}
              onSelect={() => onSelectDevice(device.id)}
              onDragTo={(point) => onMoveDevice(device.id, point)}
              canvasRef={canvasRef}
            />
            {ports.map((portId, index) => {
              const at = portPoint(pos, index, ports.length)
              return (
                <PortDot
                  key={portId}
                  topo={topology}
                  device={device}
                  portId={portId}
                  at={at}
                  armed={armedPort}
                  stp={stp}
                  onPick={onPickPort}
                />
              )
            })}
          </div>
        )
      })}

      {topology.devices.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-ink-muted">
          {t('lab.canvasEmpty')}
        </p>
      )}

      {/* Tầng gói tin */}
      <svg
        viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        aria-hidden
      >
        {railD !== '' && <path ref={railRef} d={railD} fill="none" stroke="none" />}
        {phase.kind === 'flying' && frames !== null && (
          <m.g
            key={`hop-${phase.hop}`}
            initial={{ x: frames.xs[0], y: frames.ys[0] }}
            animate={{ x: frames.xs, y: frames.ys }}
            // Easing đã nướng vào mẫu điểm nên phát lại tuyến tính.
            transition={{ duration: HOP_MS / 1000, ease: 'linear' }}
            onAnimationComplete={onHopComplete}
          >
            <PacketShape />
          </m.g>
        )}
        </svg>
      </div>
    </div>
  )
}
