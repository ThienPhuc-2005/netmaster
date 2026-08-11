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
        <path d="M25.4 57.7 L67.7 68.3" {...isoStroke} />
        <path d="M67.7 68.3 L110 57.7" {...isoStroke} />
        <path d="M110 57.7 L152.3 68.3" {...isoStroke} />
        <path d="M152.3 68.3 L194.6 57.7" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M17.8 57.7 L17.8 66.6 L25.4 70.4 L25.4 61.5 Z" {...isoFace} />
        <path d="M33 57.7 L33 66.6 L25.4 70.4 L25.4 61.5 Z" {...isoFace} />
        <path d="M25.4 53.9 L33 57.7 L25.4 61.5 L17.8 57.7 Z" {...isoTop} />
        <path d="M19.8 61.7 L23.4 63.5" {...isoDetail} />
        <path d="M19.8 64.6 L23.4 66.4" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M102.4 57.7 L102.4 61.8 L110 65.6 L110 61.5 Z" {...isoFace} />
        <path d="M117.6 57.7 L117.6 61.8 L110 65.6 L110 61.5 Z" {...isoFace} />
        <path d="M110 53.9 L117.6 57.7 L110 61.5 L102.4 57.7 Z" {...isoTop} />
        <path d="M113 61 l0 2.1" {...isoDetail} />
        <path d="M110 62.5 l0 2.1" {...isoDetail} />
        <path d="M107 64 l0 2.1" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M187 57.7 L187 64.2 L194.6 68 L194.6 61.5 Z" {...isoFace} />
        <path d="M202.2 57.7 L202.2 64.2 L194.6 68 L194.6 61.5 Z" {...isoFace} />
        <path d="M194.6 53.9 L202.2 57.7 L194.6 61.5 L187 57.7 Z" {...isoTop} />
        <path d="M189.6 46.9 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M60.1 68.3 L60.1 72.4 L67.7 76.2 L67.7 72.1 Z" {...isoFace} />
        <path d="M75.3 68.3 L75.3 72.4 L67.7 76.2 L67.7 72.1 Z" {...isoFace} />
        <path d="M67.7 64.5 L75.3 68.3 L67.7 72.1 L60.1 68.3 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M144.7 68.3 L144.7 72.4 L152.3 76.2 L152.3 72.1 Z" {...isoFace} />
        <path d="M159.9 68.3 L159.9 72.4 L152.3 76.2 L152.3 72.1 Z" {...isoFace} />
        <path d="M152.3 64.5 L159.9 68.3 L152.3 72.1 L144.7 68.3 Z" {...isoTop} />
        <path d="M155.3 71.6 l0 2.1" {...isoDetail} />
        <path d="M152.3 73.1 l0 2.1" {...isoDetail} />
        <path d="M149.3 74.6 l0 2.1" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="38.2" y="56.4" width="16.9" height="7.4" rx="1.5" {...isoPlate} />
        <text x="46.6" y="62" textAnchor="middle" {...isoLabel}>WAN</text>
        <rect x="8.3" y="71.8" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="25.4" y="77.4" textAnchor="middle" {...isoLabel}>máy chủ</text>
        <rect x="90.8" y="67" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="72.6" textAnchor="middle" {...isoLabel}>switch 1</text>
        <rect x="171.1" y="69.4" width="47" height="7.4" rx="1.5" {...isoPlate} />
        <text x="194.6" y="75" textAnchor="middle" {...isoLabel}>kinh doanh</text>
        <rect x="52.8" y="77.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="67.7" y="83.2" textAnchor="middle" {...isoLabel}>router</text>
        <rect x="133.1" y="77.6" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="152.3" y="83.2" textAnchor="middle" {...isoLabel}>switch 2</text>
      </g>
    </>
  )
}

/** visualId -> hình isometric sinh từ bản vẽ. ConceptVisual gộp map này vào REGISTRY. */
export const ISOMETRIC_SCENES: Record<string, () => React.ReactNode> = {
  'vis-iso-chi-nhanh-m21': ChiNhanhM21,
}
