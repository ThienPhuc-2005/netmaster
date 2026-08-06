// Phát lại hành trình gói tin qua N chặng động.
//
// Khác onboarding (2 chặng cố định, 2 path dựng sẵn), phòng lab có số
// chặng thay đổi theo sơ đồ người học lắp. Nên chỉ dùng MỘT "đường ray"
// vô hình, đổi thuộc tính `d` theo chặng đang bay, cộng một pha `arming`
// để đo hình học SAU KHI ray đã render — giải bài toán con-gà-quả-trứng:
// phải render mới đo được, mà phải đo xong mới biết bay đi đâu.
//
// idle → arming(0) → flying(0) → atNode(0) → arming(1) → … → done
//
// Ba lối thoát gộp về MỘT nhánh (samplePath trả null): người dùng tắt
// chuyển động, jsdom trong test, và phần tử chưa layout. Ở cả ba, gói tin
// đứng ở đích và nhật ký chặng vẫn kể trọn câu chuyện.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { samplePath, type HopFrames } from '../../components/packetFlight'

/** Mỗi chặng bay 280ms ease-out (spec 4.2: chuyển động 200-300ms). */
export const HOP_MS = 280

/**
 * Nhịp dừng ở mỗi trạm ("bưu tá đang đọc địa chỉ"). Hành trình dài thì
 * rút ngắn nhịp dừng để cả chuyến không lê thê — người học chạy mô phỏng
 * rất nhiều lần.
 */
export function dwellMs(hopCount: number): number {
  return hopCount > 5 ? 120 : 220
}

export type FlightPhase =
  | { kind: 'idle' }
  | { kind: 'arming'; hop: number }
  | { kind: 'flying'; hop: number }
  | { kind: 'atNode'; hop: number }
  | { kind: 'done' }

export interface PacketFlight {
  phase: FlightPhase
  frames: HopFrames | null
  railRef: React.RefObject<SVGPathElement | null>
  /** `d` của đường ray chặng hiện tại; chuỗi rỗng = không có gì đang bay. */
  railD: string
  /** Số chặng đã kể xong trong nhật ký (UI hiện dần theo gói tin). */
  visibleHops: number
  start: () => void
  skip: () => void
  onHopComplete: () => void
}

export function usePacketFlight(hopCount: number, railOf: (hop: number) => string): PacketFlight {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<FlightPhase>({ kind: 'idle' })
  const [frames, setFrames] = useState<HopFrames | null>(null)
  const railRef = useRef<SVGPathElement>(null)

  const active = phase.kind === 'arming' || phase.kind === 'flying' || phase.kind === 'atNode'
  const railD = active ? railOf(phase.hop) : ''

  // Đo trong layout effect (trước khi trình duyệt vẽ) nên người học không
  // bao giờ thấy gói tin nhấp nháy ở vị trí của chặng trước.
  useLayoutEffect(() => {
    if (phase.kind !== 'arming') return
    const measured = reducedMotion === true ? null : samplePath(railRef.current)
    if (measured === null) {
      setPhase({ kind: 'done' })
      return
    }
    setFrames(measured)
    setPhase({ kind: 'flying', hop: phase.hop })
  }, [phase, reducedMotion])

  // Ghé trạm rồi bay tiếp, hoặc kết thúc chuyến.
  useEffect(() => {
    if (phase.kind !== 'atNode') return
    const next = phase.hop + 1
    const timer = setTimeout(
      () => setPhase(next < hopCount ? { kind: 'arming', hop: next } : { kind: 'done' }),
      dwellMs(hopCount),
    )
    return () => clearTimeout(timer)
  }, [phase, hopCount])

  const start = useCallback(() => {
    setFrames(null)
    setPhase(hopCount === 0 ? { kind: 'done' } : { kind: 'arming', hop: 0 })
  }, [hopCount])

  /** Bỏ hiệu ứng — người học chạy lại rất nhiều lần, phải cho tua. */
  const skip = useCallback(() => setPhase({ kind: 'done' }), [])

  const onHopComplete = useCallback(
    () => setPhase((current) => (current.kind === 'flying' ? { kind: 'atNode', hop: current.hop } : current)),
    [],
  )

  const visibleHops = phase.kind === 'done' ? hopCount : active ? phase.hop + 1 : 0

  return { phase, frames, railRef, railD, visibleHops, start, skip, onHopComplete }
}
