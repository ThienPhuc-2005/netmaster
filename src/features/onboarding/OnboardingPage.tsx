// Onboarding 60 giây (spec 4.5): TRƯỚC mọi màn giới thiệu, người dùng
// bấm "Gửi gói tin" và XEM nó chạy qua sơ đồ A → router → B (aha moment).
//
// Animation theo path bằng thư viện motion, giữ đúng chuẩn spec 4.2:
// - Mỗi chuyển động 200-300ms ease-out: chuyến bay chia làm 2 chặng
//   (A→router 280ms, router→B 280ms), giữa hai chặng router sáng lên
//   ~380ms — "bưu tá đang đọc địa chỉ" (chuyển động chỉ để chỉ quan hệ,
//   phần đang nói sáng lên: signaling).
// - prefers-reduced-motion: bỏ chuyến bay, gói tin hiện thẳng ở đích.
// - Gói tin dùng ĐÚNG hình phong bì như mọi nơi khác trong app (spec 4.2:
//   "gói tin luôn cùng một hình dạng ở mọi module").
//
// Không XP, không streak — xem animation không phải retrieval (nguyên tắc 5).

import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { Languages, Send } from 'lucide-react'
import { useT } from '../../i18n'
import { useSettings } from '../../store/settings'
import { useProgress } from '../../store/progress'
import { playEarcon } from '../../audio/earcons'
import { Button } from '../../components/Button'
import { PacketShape } from '../../components/PacketShape'
import { DeviceGlyph } from '../../components/DeviceGlyph'
import { samplePath } from '../../components/packetFlight'

type Phase = 'idle' | 'hop1' | 'atRouter' | 'hop2' | 'delivered'

// Sơ đồ 720×240: A trái, router giữa (cao hơn một nhịp), B phải.
const A = { x: 100, y: 150 }
const R = { x: 360, y: 108 }
const B = { x: 620, y: 150 }
const HOP1_D = `M ${A.x + 34} ${A.y - 6} Q ${(A.x + R.x) / 2} ${R.y - 26} ${R.x - 26} ${R.y}`
const HOP2_D = `M ${R.x + 26} ${R.y} Q ${(R.x + B.x) / 2} ${R.y - 26} ${B.x - 34} ${B.y - 6}`

/** Máy tính trên sơ đồ: hình dùng chung toàn app + nhãn tên máy. */
function Machine({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <DeviceGlyph kind="pc" />
      <text y="44" textAnchor="middle" fontSize="12" fill="var(--ink-muted)" style={{ fontFamily: 'var(--font-mono)' }}>
        {label}
      </text>
    </g>
  )
}

export function OnboardingPage() {
  const t = useT()
  const reducedMotion = useReducedMotion()
  const toggleLang = useSettings((s) => s.toggleLang)
  const completeOnboarding = useProgress((s) => s.completeOnboarding)

  const hop1Ref = useRef<SVGPathElement>(null)
  const hop2Ref = useRef<SVGPathElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [frames, setFrames] = useState<{ xs: number[]; ys: number[] } | null>(null)

  const send = () => {
    // samplePath trả null khi không đo được: người dùng tắt chuyển động,
    // hoặc môi trường không có SVG geometry (jsdom). Cả hai đi cùng một
    // nhánh — gói tin tới thẳng đích, thông điệp vẫn trọn vẹn.
    const measured = reducedMotion === true ? null : samplePath(hop1Ref.current)
    if (measured === null) {
      setPhase('delivered')
      playEarcon('correct')
      return
    }
    setFrames(measured)
    setPhase('hop1')
  }

  // Ghé router: sáng lên ~380ms ("đọc địa chỉ") rồi bay tiếp chặng 2.
  useEffect(() => {
    if (phase !== 'atRouter') return
    const timer = setTimeout(() => {
      const measured = samplePath(hop2Ref.current)
      if (measured === null) {
        setPhase('delivered')
        playEarcon('correct')
        return
      }
      setFrames(measured)
      setPhase('hop2')
    }, 380)
    return () => clearTimeout(timer)
  }, [phase])

  const packetVisible = phase !== 'idle'
  const packetStatic =
    phase === 'atRouter' ? R : phase === 'delivered' ? { x: B.x - 34, y: B.y - 6 } : null

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
      <button
        onClick={toggleLang}
        aria-label={t('settings.langSwitch')}
        className="absolute right-4 top-4 flex items-center gap-1 text-ink-muted transition-colors duration-(--dur) hover:text-ink"
      >
        <Languages size={16} aria-hidden />
        <span className="font-mono text-[11px] font-semibold">{t('settings.langBadge')}</span>
      </button>

      <div className="text-center">
        <p className="font-mono text-xl font-bold text-accent">{t('app.name')}</p>
        <h1 className="mt-3 max-w-md text-lg font-semibold leading-relaxed text-ink">{t('onboarding.invite')}</h1>
      </div>

      <svg viewBox="0 0 720 240" role="img" aria-label={t('onboarding.diagramAria')} className="w-full max-w-2xl">
        {/* Đường truyền — cũng chính là path gói tin bay */}
        <path ref={hop1Ref} d={HOP1_D} fill="none" stroke="var(--edge)" strokeWidth="2" />
        <path ref={hop2Ref} d={HOP2_D} fill="none" stroke="var(--edge)" strokeWidth="2" />

        <Machine x={A.x} y={A.y} label={t('onboarding.nodeA')} />
        <Machine x={B.x} y={B.y} label={t('onboarding.nodeB')} />

        {/* Router — sáng lên khi gói tin ghé qua (signaling, spec 4.2) */}
        <m.g
          animate={{ scale: phase === 'atRouter' ? [1, 1.22, 1] : 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <circle
            cx={R.x}
            cy={R.y}
            r="22"
            fill="var(--panel)"
            stroke={phase === 'atRouter' ? 'var(--accent)' : 'var(--edge)'}
            strokeWidth="2"
          />
          <path
            d={`M${R.x - 9} ${R.y} h18 M${R.x} ${R.y - 9} v18`}
            stroke={phase === 'atRouter' ? 'var(--accent)' : 'var(--ink-muted)'}
            strokeWidth="1.5"
          />
          <text
            x={R.x}
            y={R.y + 44}
            textAnchor="middle"
            fontSize="12"
            fill="var(--ink-muted)"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {t('onboarding.router')}
          </text>
        </m.g>

        {packetVisible &&
          ((phase === 'hop1' || phase === 'hop2') && frames !== null ? (
            <m.g
              key={phase}
              initial={{ x: frames.xs[0], y: frames.ys[0] }}
              animate={{ x: frames.xs, y: frames.ys }}
              // Easing đã nướng vào mẫu điểm — phát lại tuyến tính đúng 280ms/chặng
              transition={{ duration: 0.28, ease: 'linear' }}
              onAnimationComplete={() => {
                if (phase === 'hop1') {
                  setPhase('atRouter')
                } else {
                  setPhase('delivered')
                  playEarcon('correct')
                }
              }}
            >
              <PacketShape />
            </m.g>
          ) : packetStatic !== null ? (
            <g transform={`translate(${packetStatic.x} ${packetStatic.y})`}>
              <PacketShape />
            </g>
          ) : null)}
      </svg>

      <div className="flex min-h-28 flex-col items-center gap-4 text-center">
        {phase === 'idle' && (
          <Button onClick={send}>
            <Send size={15} aria-hidden />
            {t('onboarding.send')}
          </Button>
        )}
        {phase === 'delivered' && (
          <>
            <div role="status">
              <p className="font-semibold text-ok">{t('onboarding.deliveredTitle')}</p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">{t('onboarding.deliveredBody')}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={completeOnboarding}>{t('onboarding.enter')}</Button>
              <Button variant="ghost" onClick={send}>
                {t('onboarding.sendAgain')}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
