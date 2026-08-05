// Biểu đồ tiến bộ drill (spec Module 3: "theo dõi tốc độ tiến bộ qua
// biểu đồ"). Hai thước đo khác thang (bài đúng 0-10, giây/bài) = HAI
// biểu đồ nhỏ cùng trục thời gian — không bao giờ dual-axis. Mỗi biểu
// đồ một series → không cần legend, tiêu đề tự đặt tên; màu lấy từ
// token (đã qua kiểm tra contrast AA); nhãn số chỉ ở điểm cuối, các
// điểm khác hiện khi hover.

import { useId, useState } from 'react'
import type { DrillResult } from '../../engine/types'
import { useT } from '../../i18n'

const SHOWN = 14 // phiên gần nhất — đủ thấy đà tiến bộ, không thành rừng cột

function shortDate(iso: string): string {
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)}`
}

interface MiniChartProps {
  title: string
  data: { date: string; value: number }[]
  /** Trần trục y (0..max). */
  max: number
  format: (v: number) => string
  kind: 'bar' | 'line'
}

const W = 340
const H = 96
const PAD_X = 6
const PAD_TOP = 16
const BASE = H - 18 // chừa chỗ nhãn ngày

function MiniChart({ title, data, max, format, kind }: MiniChartProps) {
  const [hover, setHover] = useState<number | null>(null)
  const titleId = useId()

  const innerW = W - PAD_X * 2
  const slot = innerW / Math.max(data.length, 1)
  const x = (i: number) => PAD_X + slot * i + slot / 2
  const y = (v: number) => BASE - (Math.min(v, max) / max) * (BASE - PAD_TOP)

  const showLabel = (i: number) => i === data.length - 1 || hover === i

  return (
    <figure className="rounded-md border border-edge bg-panel p-4">
      <figcaption id={titleId} className="mb-2 text-xs font-semibold text-ink-muted">
        {title}
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={titleId} className="w-full">
        {/* Grid lặng: chỉ baseline + mức trần */}
        <line x1={PAD_X} y1={BASE} x2={W - PAD_X} y2={BASE} stroke="var(--edge)" strokeWidth="1" />
        <line x1={PAD_X} y1={y(max)} x2={W - PAD_X} y2={y(max)} stroke="var(--edge)" strokeWidth="1" strokeDasharray="3 4" />
        <text x={PAD_X} y={y(max) - 3} fontSize="8" fill="var(--ink-muted)">
          {format(max)}
        </text>

        {kind === 'line' && data.length > 1 && (
          <polyline
            points={data.map((d, i) => `${x(i)},${y(d.value)}`).join(' ')}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {data.map((d, i) => (
          <g key={d.date + i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            {/* Vùng bắt hover rộng hơn mark */}
            <rect x={x(i) - slot / 2} y={0} width={slot} height={H} fill="transparent">
              <title>{`${shortDate(d.date)}: ${format(d.value)}`}</title>
            </rect>
            {kind === 'bar' ? (
              <rect
                x={x(i) - 5}
                y={y(d.value)}
                width={10}
                height={Math.max(BASE - y(d.value), 2)}
                rx={4}
                fill="var(--accent)"
                opacity={hover === null || hover === i ? 1 : 0.45}
              />
            ) : (
              <circle cx={x(i)} cy={y(d.value)} r={hover === i ? 5 : 4} fill="var(--accent)" stroke="var(--panel)" strokeWidth="2" />
            )}
            {showLabel(i) && (
              <text x={x(i)} y={y(d.value) - 6} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--ink)">
                {format(d.value)}
              </text>
            )}
            {(i === 0 || i === data.length - 1) && (
              <text x={x(i)} y={H - 5} textAnchor="middle" fontSize="8" fill="var(--ink-muted)">
                {shortDate(d.date)}
              </text>
            )}
          </g>
        ))}
      </svg>
    </figure>
  )
}

export function ProgressChart({ history }: { history: DrillResult[] }) {
  const t = useT()
  if (history.length === 0) return null
  const recent = history.slice(-SHOWN)
  const maxTotal = Math.max(...recent.map((d) => d.total))
  const maxSeconds = Math.max(...recent.map((d) => d.avgSeconds), 10)

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{t('drill.chartTitle')}</h2>
      <MiniChart
        title={t('drill.chartCorrect')}
        data={recent.map((d) => ({ date: d.date, value: d.correct }))}
        max={maxTotal}
        format={(v) => String(v)}
        kind="bar"
      />
      <MiniChart
        title={t('drill.chartAvgSeconds')}
        data={recent.map((d) => ({ date: d.date, value: d.avgSeconds }))}
        max={Math.ceil(maxSeconds / 10) * 10}
        format={(v) => v.toFixed(0)}
        kind="line"
      />
      {/* Bảng dữ liệu cho screen reader — biểu đồ không bao giờ là nguồn duy nhất */}
      <table className="sr-only">
        <caption>{t('drill.chartTitle')}</caption>
        <tbody>
          {recent.map((d, i) => (
            <tr key={d.date + i}>
              <td>{d.date}</td>
              <td>{`${d.correct}/${d.total}`}</td>
              <td>{`${d.avgSeconds}s`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
