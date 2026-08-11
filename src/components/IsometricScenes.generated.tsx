// SINH TỰ ĐỘNG bởi scripts/isometric-tu-ban-ve.mjs — ĐỪNG SỬA TAY.
// Nguồn: content/ban-ve/*.json (bản vẽ xuất từ FossFLOW).
// Sửa hình = mở lại bản vẽ trong xưởng vẽ, xuất JSON đè lên, chạy
// `npm run visuals:isometric`.
//
// Chỉ trả về RUỘT của hình; khung 220x130 do Frame của ConceptVisual lo,
// nên hình sinh ra ăn đúng viền, nền và nhãn aria như mọi hình vẽ tay.

const isoStroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2 } as const
const isoFace = { fill: 'var(--panel-hover)', stroke: 'currentColor', strokeWidth: 1, strokeLinejoin: 'round' } as const
const isoTop = { fill: 'var(--panel)', stroke: 'currentColor', strokeWidth: 1.2, strokeLinejoin: 'round' } as const
const isoDetail = { fill: 'none', stroke: 'currentColor', strokeWidth: 0.9, opacity: 0.75 } as const
const isoPlate = { fill: 'var(--panel)', stroke: 'none' } as const
const isoLabel = {
  fontSize: 7,
  fill: 'currentColor',
  style: { fontFamily: 'var(--font-mono)' },
} as const

function ChiNhanhM21() {
  return (
    <>
      <g className="text-ink-muted">
        <path d="M58 31 L110 57" {...isoStroke} />
        <path d="M58 31 L32 18" {...isoStroke} />
        <path d="M110 57 L136 70" {...isoStroke} />
        <path d="M136 70 L188 70" {...isoStroke} />
        <path d="M136 70 L136 96" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M22.6 18 L22.6 29 L32 33.7 L32 22.7 Z" {...isoFace} />
        <path d="M41.4 18 L41.4 29 L32 33.7 L32 22.7 Z" {...isoFace} />
        <path d="M32 13.3 L41.4 18 L32 22.7 L22.6 18 Z" {...isoTop} />
        <path d="M24.6 22.7 L30 25.3" {...isoDetail} />
        <path d="M24.6 26.3 L30 29" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M48.6 31 L48.6 46 L58 50.7 L58 35.7 Z" {...isoFace} />
        <path d="M67.4 31 L67.4 46 L58 50.7 L58 35.7 Z" {...isoFace} />
        <path d="M58 26.3 L67.4 31 L58 35.7 L48.6 31 Z" {...isoTop} />
        <path d="M50.6 35.8 L56 38.4" {...isoDetail} />
        <path d="M50.6 39.5 L56 42.2" {...isoDetail} />
        <path d="M50.6 43.3 L56 45.9" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 57 L100.6 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M119.4 57 L119.4 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M110 52.3 L119.4 57 L110 61.7 L100.6 57 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M126.6 70 L126.6 75 L136 79.7 L136 74.7 Z" {...isoFace} />
        <path d="M145.4 70 L145.4 75 L136 79.7 L136 74.7 Z" {...isoFace} />
        <path d="M136 65.3 L145.4 70 L136 74.7 L126.6 70 Z" {...isoTop} />
        <path d="M139.7 73.8 l0 3" {...isoDetail} />
        <path d="M136 75.7 l0 3" {...isoDetail} />
        <path d="M132.3 77.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 70 L178.6 78 L188 82.7 L188 74.7 Z" {...isoFace} />
        <path d="M197.4 70 L197.4 78 L188 82.7 L188 74.7 Z" {...isoFace} />
        <path d="M188 65.3 L197.4 70 L188 74.7 L178.6 70 Z" {...isoTop} />
        <path d="M183 58.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M126.6 96 L126.6 104 L136 108.7 L136 100.7 Z" {...isoFace} />
        <path d="M145.4 96 L145.4 104 L136 108.7 L136 100.7 Z" {...isoFace} />
        <path d="M136 91.3 L145.4 96 L136 100.7 L126.6 96 Z" {...isoTop} />
        <path d="M131 84.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="75.6" y="37.4" width="16.9" height="7.4" rx="1.5" {...isoPlate} />
        <text x="84" y="43" textAnchor="middle" {...isoLabel}>WAN</text>
        <rect x="110.3" y="56.9" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="123" y="62.5" textAnchor="middle" {...isoLabel}>trunk</text>
        <rect x="15" y="35.1" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="40.7" textAnchor="middle" {...isoLabel}>máy chủ</text>
        <rect x="43.1" y="52.1" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="58" y="57.7" textAnchor="middle" {...isoLabel}>trụ sở</text>
        <rect x="95.1" y="68.1" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="73.7" textAnchor="middle" {...isoLabel}>router</text>
        <rect x="121.1" y="81.1" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="136" y="86.7" textAnchor="middle" {...isoLabel}>switch</text>
        <rect x="164.5" y="84.1" width="47" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="89.7" textAnchor="middle" {...isoLabel}>kinh doanh</text>
        <rect x="119" y="110.1" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="136" y="115.7" textAnchor="middle" {...isoLabel}>kế toán</text>
      </g>
    </>
  )
}

/** visualId -> hình isometric sinh từ bản vẽ. ConceptVisual gộp map này vào REGISTRY. */
export const ISOMETRIC_SCENES: Record<string, () => React.ReactNode> = {
  'vis-iso-chi-nhanh-m21': ChiNhanhM21,
}
