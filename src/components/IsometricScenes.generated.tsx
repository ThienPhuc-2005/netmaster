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

function HaiLoiBaMienM16() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M45 39 L149 91" {...isoStroke} />
              <path d="M45 39 L175 26" {...isoStroke} />
              <path d="M175 26 L149 91" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M165.6 26 L165.6 31 L175 35.7 L175 30.7 Z" {...isoFace} />
        <path d="M184.4 26 L184.4 31 L175 35.7 L175 30.7 Z" {...isoFace} />
        <path d="M175 21.3 L184.4 26 L175 30.7 L165.6 26 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M35.6 39 L35.6 44 L45 48.7 L45 43.7 Z" {...isoFace} />
        <path d="M54.4 39 L54.4 44 L45 48.7 L45 43.7 Z" {...isoFace} />
        <path d="M45 34.3 L54.4 39 L45 43.7 L35.6 39 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M139.6 91 L139.6 96 L149 100.7 L149 95.7 Z" {...isoFace} />
        <path d="M158.4 91 L158.4 96 L149 100.7 L149 95.7 Z" {...isoFace} />
        <path d="M149 86.3 L158.4 91 L149 95.7 L139.6 91 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <rect x="75.7" y="58.4" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="97" y="64" textAnchor="middle" {...isoLabel}>cáp thẳng</text>
        <rect x="138.5" y="51.9" width="47" height="7.4" rx="1.5" {...isoPlate} />
        <text x="162" y="57.5" textAnchor="middle" {...isoLabel}>đường vòng</text>
        <rect x="158" y="37.1" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="175" y="42.7" textAnchor="middle" {...isoLabel}>Đà Nẵng</text>
        <rect x="30.1" y="50.1" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="45" y="55.7" textAnchor="middle" {...isoLabel}>Hà Nội</text>
        <rect x="132" y="102.1" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="149" y="107.7" textAnchor="middle" {...isoLabel}>Sài Gòn</text>
      </g>
    </>
  )
}

function LabDuongDuPhongM15() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 70 L32 44" {...isoStroke} />
              <path d="M188 70 L188 44" {...isoStroke} />
              <path d="M32 44 L110 44" {...isoStroke} />
              <path d="M110 44 L188 44" {...isoStroke} />
              <path d="M188 44 L32 44" {...isoStroke} />
              <path d="M110 70 L188 70" {...isoStroke} strokeDasharray="1 3" />
      </g>
      <g className="text-ink">
        <path d="M22.6 44 L22.6 49 L32 53.7 L32 48.7 Z" {...isoFace} />
        <path d="M41.4 44 L41.4 49 L32 53.7 L32 48.7 Z" {...isoFace} />
        <path d="M32 39.3 L41.4 44 L32 48.7 L22.6 44 Z" {...isoTop} />
        <path d="M35.7 47.8 l0 3" {...isoDetail} />
        <path d="M32 49.7 l0 3" {...isoDetail} />
        <path d="M28.3 51.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 44 L100.6 49 L110 53.7 L110 48.7 Z" {...isoFace} />
        <path d="M119.4 44 L119.4 49 L110 53.7 L110 48.7 Z" {...isoFace} />
        <path d="M110 39.3 L119.4 44 L110 48.7 L100.6 44 Z" {...isoTop} />
        <path d="M113.7 47.8 l0 3" {...isoDetail} />
        <path d="M110 49.7 l0 3" {...isoDetail} />
        <path d="M106.3 51.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 44 L178.6 49 L188 53.7 L188 48.7 Z" {...isoFace} />
        <path d="M197.4 44 L197.4 49 L188 53.7 L188 48.7 Z" {...isoFace} />
        <path d="M188 39.3 L197.4 44 L188 48.7 L178.6 44 Z" {...isoTop} />
        <path d="M191.7 47.8 l0 3" {...isoDetail} />
        <path d="M188 49.7 l0 3" {...isoDetail} />
        <path d="M184.3 51.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 70 L100.6 78 L110 82.7 L110 74.7 Z" {...isoFace} />
        <path d="M119.4 70 L119.4 78 L110 82.7 L110 74.7 Z" {...isoFace} />
        <path d="M110 65.3 L119.4 70 L110 74.7 L100.6 70 Z" {...isoTop} />
        <path d="M105 58.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 70 L178.6 78 L188 82.7 L188 74.7 Z" {...isoFace} />
        <path d="M197.4 70 L197.4 78 L188 82.7 L188 74.7 Z" {...isoFace} />
        <path d="M188 65.3 L197.4 70 L188 74.7 L178.6 70 Z" {...isoTop} />
        <path d="M183 58.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="129.8" y="63.4" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="149" y="69" textAnchor="middle" {...isoLabel}>phải tới</text>
        <rect x="12.8" y="55.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="60.7" textAnchor="middle" {...isoLabel}>switch 1</text>
        <rect x="90.8" y="55.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="60.7" textAnchor="middle" {...isoLabel}>switch 2</text>
        <rect x="168.8" y="55.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="60.7" textAnchor="middle" {...isoLabel}>switch 3</text>
        <rect x="88.7" y="84.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="89.7" textAnchor="middle" {...isoLabel}>PC tầng 1</text>
        <rect x="166.7" y="84.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="89.7" textAnchor="middle" {...isoLabel}>PC tầng 3</text>
      </g>
    </>
  )
}

function LabDuongDuPhongM15LoiGiai() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 70 L32 44" {...isoStroke} />
              <path d="M188 70 L188 44" {...isoStroke} />
              <path d="M110 44 L188 44" {...isoStroke} />
              <path d="M188 44 L32 44" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M22.6 44 L22.6 49 L32 53.7 L32 48.7 Z" {...isoFace} />
        <path d="M41.4 44 L41.4 49 L32 53.7 L32 48.7 Z" {...isoFace} />
        <path d="M32 39.3 L41.4 44 L32 48.7 L22.6 44 Z" {...isoTop} />
        <path d="M35.7 47.8 l0 3" {...isoDetail} />
        <path d="M32 49.7 l0 3" {...isoDetail} />
        <path d="M28.3 51.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 44 L100.6 49 L110 53.7 L110 48.7 Z" {...isoFace} />
        <path d="M119.4 44 L119.4 49 L110 53.7 L110 48.7 Z" {...isoFace} />
        <path d="M110 39.3 L119.4 44 L110 48.7 L100.6 44 Z" {...isoTop} />
        <path d="M113.7 47.8 l0 3" {...isoDetail} />
        <path d="M110 49.7 l0 3" {...isoDetail} />
        <path d="M106.3 51.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 44 L178.6 49 L188 53.7 L188 48.7 Z" {...isoFace} />
        <path d="M197.4 44 L197.4 49 L188 53.7 L188 48.7 Z" {...isoFace} />
        <path d="M188 39.3 L197.4 44 L188 48.7 L178.6 44 Z" {...isoTop} />
        <path d="M191.7 47.8 l0 3" {...isoDetail} />
        <path d="M188 49.7 l0 3" {...isoDetail} />
        <path d="M184.3 51.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 70 L100.6 78 L110 82.7 L110 74.7 Z" {...isoFace} />
        <path d="M119.4 70 L119.4 78 L110 82.7 L110 74.7 Z" {...isoFace} />
        <path d="M110 65.3 L119.4 70 L110 74.7 L100.6 70 Z" {...isoTop} />
        <path d="M105 58.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 70 L178.6 78 L188 82.7 L188 74.7 Z" {...isoFace} />
        <path d="M197.4 70 L197.4 78 L188 82.7 L188 74.7 Z" {...isoFace} />
        <path d="M188 65.3 L197.4 70 L188 74.7 L178.6 70 Z" {...isoTop} />
        <path d="M183 58.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="12.8" y="55.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="60.7" textAnchor="middle" {...isoLabel}>switch 1</text>
        <rect x="90.8" y="55.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="60.7" textAnchor="middle" {...isoLabel}>switch 2</text>
        <rect x="168.8" y="55.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="60.7" textAnchor="middle" {...isoLabel}>switch 3</text>
        <rect x="88.7" y="84.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="89.7" textAnchor="middle" {...isoLabel}>PC tầng 1</text>
        <rect x="166.7" y="84.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="89.7" textAnchor="middle" {...isoLabel}>PC tầng 3</text>
      </g>
    </>
  )
}

function LabNoiDayM4() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M71 70 L149 70" {...isoStroke} strokeDasharray="1 3" />
      </g>
      <g className="text-ink">
        <path d="M61.6 44 L61.6 49 L71 53.7 L71 48.7 Z" {...isoFace} />
        <path d="M80.4 44 L80.4 49 L71 53.7 L71 48.7 Z" {...isoFace} />
        <path d="M71 39.3 L80.4 44 L71 48.7 L61.6 44 Z" {...isoTop} />
        <path d="M74.7 47.8 l0 3" {...isoDetail} />
        <path d="M71 49.7 l0 3" {...isoDetail} />
        <path d="M67.3 51.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M61.6 70 L61.6 78 L71 82.7 L71 74.7 Z" {...isoFace} />
        <path d="M80.4 70 L80.4 78 L71 82.7 L71 74.7 Z" {...isoFace} />
        <path d="M71 65.3 L80.4 70 L71 74.7 L61.6 70 Z" {...isoTop} />
        <path d="M66 58.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M139.6 70 L139.6 78 L149 82.7 L149 74.7 Z" {...isoFace} />
        <path d="M158.4 70 L158.4 78 L149 82.7 L149 74.7 Z" {...isoFace} />
        <path d="M149 65.3 L158.4 70 L149 74.7 L139.6 70 Z" {...isoTop} />
        <path d="M144 58.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="90.8" y="63.4" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="69" textAnchor="middle" {...isoLabel}>phải tới</text>
        <rect x="51.8" y="55.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="71" y="60.7" textAnchor="middle" {...isoLabel}>Switch-1</text>
        <rect x="58.3" y="84.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="71" y="89.7" textAnchor="middle" {...isoLabel}>Máy A</text>
        <rect x="136.3" y="84.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="149" y="89.7" textAnchor="middle" {...isoLabel}>Máy B</text>
      </g>
    </>
  )
}

function LabNoiDayM4LoiGiai() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M71 70 L71 44" {...isoStroke} />
              <path d="M149 70 L71 44" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M61.6 44 L61.6 49 L71 53.7 L71 48.7 Z" {...isoFace} />
        <path d="M80.4 44 L80.4 49 L71 53.7 L71 48.7 Z" {...isoFace} />
        <path d="M71 39.3 L80.4 44 L71 48.7 L61.6 44 Z" {...isoTop} />
        <path d="M74.7 47.8 l0 3" {...isoDetail} />
        <path d="M71 49.7 l0 3" {...isoDetail} />
        <path d="M67.3 51.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M61.6 70 L61.6 78 L71 82.7 L71 74.7 Z" {...isoFace} />
        <path d="M80.4 70 L80.4 78 L71 82.7 L71 74.7 Z" {...isoFace} />
        <path d="M71 65.3 L80.4 70 L71 74.7 L61.6 70 Z" {...isoTop} />
        <path d="M66 58.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M139.6 70 L139.6 78 L149 82.7 L149 74.7 Z" {...isoFace} />
        <path d="M158.4 70 L158.4 78 L149 82.7 L149 74.7 Z" {...isoFace} />
        <path d="M149 65.3 L158.4 70 L149 74.7 L139.6 70 Z" {...isoTop} />
        <path d="M144 58.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="51.8" y="55.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="71" y="60.7" textAnchor="middle" {...isoLabel}>Switch-1</text>
        <rect x="58.3" y="84.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="71" y="89.7" textAnchor="middle" {...isoLabel}>Máy A</text>
        <rect x="136.3" y="84.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="149" y="89.7" textAnchor="middle" {...isoLabel}>Máy B</text>
      </g>
    </>
  )
}

function LabOspfDoiLoM16() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 83 L110 57" {...isoStroke} />
              <path d="M110 57 L32 31" {...isoStroke} />
              <path d="M188 83 L188 57" {...isoStroke} />
              <path d="M188 57 L188 31" {...isoStroke} />
              <path d="M32 31 L110 31" {...isoStroke} />
              <path d="M110 31 L188 31" {...isoStroke} />
              <path d="M32 31 L188 31" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M22.6 31 L22.6 36 L32 40.7 L32 35.7 Z" {...isoFace} />
        <path d="M41.4 31 L41.4 36 L32 40.7 L32 35.7 Z" {...isoFace} />
        <path d="M32 26.3 L41.4 31 L32 35.7 L22.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M100.6 31 L100.6 36 L110 40.7 L110 35.7 Z" {...isoFace} />
        <path d="M119.4 31 L119.4 36 L110 40.7 L110 35.7 Z" {...isoFace} />
        <path d="M110 26.3 L119.4 31 L110 35.7 L100.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M178.6 31 L178.6 36 L188 40.7 L188 35.7 Z" {...isoFace} />
        <path d="M197.4 31 L197.4 36 L188 40.7 L188 35.7 Z" {...isoFace} />
        <path d="M188 26.3 L197.4 31 L188 35.7 L178.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M100.6 57 L100.6 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M119.4 57 L119.4 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M110 52.3 L119.4 57 L110 61.7 L100.6 57 Z" {...isoTop} />
        <path d="M113.7 60.8 l0 3" {...isoDetail} />
        <path d="M110 62.7 l0 3" {...isoDetail} />
        <path d="M106.3 64.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 57 L178.6 62 L188 66.7 L188 61.7 Z" {...isoFace} />
        <path d="M197.4 57 L197.4 62 L188 66.7 L188 61.7 Z" {...isoFace} />
        <path d="M188 52.3 L197.4 57 L188 61.7 L178.6 57 Z" {...isoTop} />
        <path d="M191.7 60.8 l0 3" {...isoDetail} />
        <path d="M188 62.7 l0 3" {...isoDetail} />
        <path d="M184.3 64.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 83 L100.6 91 L110 95.7 L110 87.7 Z" {...isoFace} />
        <path d="M119.4 83 L119.4 91 L110 95.7 L110 87.7 Z" {...isoFace} />
        <path d="M110 78.3 L119.4 83 L110 87.7 L100.6 83 Z" {...isoTop} />
        <path d="M105 71.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 83 L178.6 91 L188 95.7 L188 87.7 Z" {...isoFace} />
        <path d="M197.4 83 L197.4 91 L188 95.7 L188 87.7 Z" {...isoFace} />
        <path d="M188 78.3 L197.4 83 L188 87.7 L178.6 83 Z" {...isoTop} />
        <path d="M183 71.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="12.8" y="42.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="47.7" textAnchor="middle" {...isoLabel}>R Hà Nội</text>
        <rect x="88.7" y="42.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="47.7" textAnchor="middle" {...isoLabel}>R Đà Nẵng</text>
        <rect x="166.7" y="42.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="47.7" textAnchor="middle" {...isoLabel}>R Sài Gòn</text>
        <rect x="97.3" y="68.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="73.7" textAnchor="middle" {...isoLabel}>sw HN</text>
        <rect x="175.3" y="68.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="73.7" textAnchor="middle" {...isoLabel}>sw SG</text>
        <rect x="88.7" y="97.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="102.7" textAnchor="middle" {...isoLabel}>PC Hà Nội</text>
        <rect x="164.5" y="97.1" width="47" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="102.7" textAnchor="middle" {...isoLabel}>PC Sài Gòn</text>
      </g>
    </>
  )
}

function LabOspfDoiLoM16LoiGiai() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 83 L110 57" {...isoStroke} />
              <path d="M110 57 L32 31" {...isoStroke} />
              <path d="M188 83 L188 57" {...isoStroke} />
              <path d="M188 57 L188 31" {...isoStroke} />
              <path d="M32 31 L110 31" {...isoStroke} />
              <path d="M110 31 L188 31" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M22.6 31 L22.6 36 L32 40.7 L32 35.7 Z" {...isoFace} />
        <path d="M41.4 31 L41.4 36 L32 40.7 L32 35.7 Z" {...isoFace} />
        <path d="M32 26.3 L41.4 31 L32 35.7 L22.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M100.6 31 L100.6 36 L110 40.7 L110 35.7 Z" {...isoFace} />
        <path d="M119.4 31 L119.4 36 L110 40.7 L110 35.7 Z" {...isoFace} />
        <path d="M110 26.3 L119.4 31 L110 35.7 L100.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M178.6 31 L178.6 36 L188 40.7 L188 35.7 Z" {...isoFace} />
        <path d="M197.4 31 L197.4 36 L188 40.7 L188 35.7 Z" {...isoFace} />
        <path d="M188 26.3 L197.4 31 L188 35.7 L178.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M100.6 57 L100.6 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M119.4 57 L119.4 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M110 52.3 L119.4 57 L110 61.7 L100.6 57 Z" {...isoTop} />
        <path d="M113.7 60.8 l0 3" {...isoDetail} />
        <path d="M110 62.7 l0 3" {...isoDetail} />
        <path d="M106.3 64.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 57 L178.6 62 L188 66.7 L188 61.7 Z" {...isoFace} />
        <path d="M197.4 57 L197.4 62 L188 66.7 L188 61.7 Z" {...isoFace} />
        <path d="M188 52.3 L197.4 57 L188 61.7 L178.6 57 Z" {...isoTop} />
        <path d="M191.7 60.8 l0 3" {...isoDetail} />
        <path d="M188 62.7 l0 3" {...isoDetail} />
        <path d="M184.3 64.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 83 L100.6 91 L110 95.7 L110 87.7 Z" {...isoFace} />
        <path d="M119.4 83 L119.4 91 L110 95.7 L110 87.7 Z" {...isoFace} />
        <path d="M110 78.3 L119.4 83 L110 87.7 L100.6 83 Z" {...isoTop} />
        <path d="M105 71.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 83 L178.6 91 L188 95.7 L188 87.7 Z" {...isoFace} />
        <path d="M197.4 83 L197.4 91 L188 95.7 L188 87.7 Z" {...isoFace} />
        <path d="M188 78.3 L197.4 83 L188 87.7 L178.6 83 Z" {...isoTop} />
        <path d="M183 71.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="12.8" y="42.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="47.7" textAnchor="middle" {...isoLabel}>R Hà Nội</text>
        <rect x="88.7" y="42.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="47.7" textAnchor="middle" {...isoLabel}>R Đà Nẵng</text>
        <rect x="166.7" y="42.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="47.7" textAnchor="middle" {...isoLabel}>R Sài Gòn</text>
        <rect x="97.3" y="68.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="73.7" textAnchor="middle" {...isoLabel}>sw HN</text>
        <rect x="175.3" y="68.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="73.7" textAnchor="middle" {...isoLabel}>sw SG</text>
        <rect x="88.7" y="97.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="102.7" textAnchor="middle" {...isoLabel}>PC Hà Nội</text>
        <rect x="164.5" y="97.1" width="47" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="102.7" textAnchor="middle" {...isoLabel}>PC Sài Gòn</text>
      </g>
    </>
  )
}

function LabOspfDoiLoM16Dut() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 83 L110 57" {...isoStroke} />
              <path d="M110 57 L32 31" {...isoStroke} />
              <path d="M188 83 L188 57" {...isoStroke} />
              <path d="M188 57 L188 31" {...isoStroke} />
              <path d="M32 31 L110 31" {...isoStroke} />
              <path d="M110 31 L188 31" {...isoStroke} />
              <path d="M32 31 L188 31" {...isoStroke} strokeDasharray="4 3" />
      </g>
      <g className="text-ink">
        <path d="M22.6 31 L22.6 36 L32 40.7 L32 35.7 Z" {...isoFace} />
        <path d="M41.4 31 L41.4 36 L32 40.7 L32 35.7 Z" {...isoFace} />
        <path d="M32 26.3 L41.4 31 L32 35.7 L22.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M100.6 31 L100.6 36 L110 40.7 L110 35.7 Z" {...isoFace} />
        <path d="M119.4 31 L119.4 36 L110 40.7 L110 35.7 Z" {...isoFace} />
        <path d="M110 26.3 L119.4 31 L110 35.7 L100.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M178.6 31 L178.6 36 L188 40.7 L188 35.7 Z" {...isoFace} />
        <path d="M197.4 31 L197.4 36 L188 40.7 L188 35.7 Z" {...isoFace} />
        <path d="M188 26.3 L197.4 31 L188 35.7 L178.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M100.6 57 L100.6 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M119.4 57 L119.4 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M110 52.3 L119.4 57 L110 61.7 L100.6 57 Z" {...isoTop} />
        <path d="M113.7 60.8 l0 3" {...isoDetail} />
        <path d="M110 62.7 l0 3" {...isoDetail} />
        <path d="M106.3 64.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 57 L178.6 62 L188 66.7 L188 61.7 Z" {...isoFace} />
        <path d="M197.4 57 L197.4 62 L188 66.7 L188 61.7 Z" {...isoFace} />
        <path d="M188 52.3 L197.4 57 L188 61.7 L178.6 57 Z" {...isoTop} />
        <path d="M191.7 60.8 l0 3" {...isoDetail} />
        <path d="M188 62.7 l0 3" {...isoDetail} />
        <path d="M184.3 64.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 83 L100.6 91 L110 95.7 L110 87.7 Z" {...isoFace} />
        <path d="M119.4 83 L119.4 91 L110 95.7 L110 87.7 Z" {...isoFace} />
        <path d="M110 78.3 L119.4 83 L110 87.7 L100.6 83 Z" {...isoTop} />
        <path d="M105 71.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 83 L178.6 91 L188 95.7 L188 87.7 Z" {...isoFace} />
        <path d="M197.4 83 L197.4 91 L188 95.7 L188 87.7 Z" {...isoFace} />
        <path d="M188 78.3 L197.4 83 L188 87.7 L178.6 83 Z" {...isoTop} />
        <path d="M183 71.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="93" y="24.4" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="30" textAnchor="middle" {...isoLabel}>cáp đứt</text>
        <rect x="12.8" y="42.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="47.7" textAnchor="middle" {...isoLabel}>R Hà Nội</text>
        <rect x="88.7" y="42.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="47.7" textAnchor="middle" {...isoLabel}>R Đà Nẵng</text>
        <rect x="166.7" y="42.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="47.7" textAnchor="middle" {...isoLabel}>R Sài Gòn</text>
        <rect x="97.3" y="68.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="73.7" textAnchor="middle" {...isoLabel}>sw HN</text>
        <rect x="175.3" y="68.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="73.7" textAnchor="middle" {...isoLabel}>sw SG</text>
        <rect x="88.7" y="97.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="102.7" textAnchor="middle" {...isoLabel}>PC Hà Nội</text>
        <rect x="164.5" y="97.1" width="47" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="102.7" textAnchor="middle" {...isoLabel}>PC Sài Gòn</text>
      </g>
    </>
  )
}

function LabOspfDoiLoM16DuongVong() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 83 L110 57" {...isoStroke} />
              <path d="M110 57 L32 31" {...isoStroke} />
              <path d="M188 83 L188 57" {...isoStroke} />
              <path d="M188 57 L188 31" {...isoStroke} />
        <g className="text-accent">
        <path d="M32 31 L110 31" {...isoStroke} strokeWidth={2.2} />
        </g>
        <g className="text-accent">
        <path d="M110 31 L188 31" {...isoStroke} strokeWidth={2.2} />
        </g>
      </g>
      <g className="text-ink">
        <path d="M22.6 31 L22.6 36 L32 40.7 L32 35.7 Z" {...isoFace} />
        <path d="M41.4 31 L41.4 36 L32 40.7 L32 35.7 Z" {...isoFace} />
        <path d="M32 26.3 L41.4 31 L32 35.7 L22.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M100.6 31 L100.6 36 L110 40.7 L110 35.7 Z" {...isoFace} />
        <path d="M119.4 31 L119.4 36 L110 40.7 L110 35.7 Z" {...isoFace} />
        <path d="M110 26.3 L119.4 31 L110 35.7 L100.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M178.6 31 L178.6 36 L188 40.7 L188 35.7 Z" {...isoFace} />
        <path d="M197.4 31 L197.4 36 L188 40.7 L188 35.7 Z" {...isoFace} />
        <path d="M188 26.3 L197.4 31 L188 35.7 L178.6 31 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M100.6 57 L100.6 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M119.4 57 L119.4 62 L110 66.7 L110 61.7 Z" {...isoFace} />
        <path d="M110 52.3 L119.4 57 L110 61.7 L100.6 57 Z" {...isoTop} />
        <path d="M113.7 60.8 l0 3" {...isoDetail} />
        <path d="M110 62.7 l0 3" {...isoDetail} />
        <path d="M106.3 64.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 57 L178.6 62 L188 66.7 L188 61.7 Z" {...isoFace} />
        <path d="M197.4 57 L197.4 62 L188 66.7 L188 61.7 Z" {...isoFace} />
        <path d="M188 52.3 L197.4 57 L188 61.7 L178.6 57 Z" {...isoTop} />
        <path d="M191.7 60.8 l0 3" {...isoDetail} />
        <path d="M188 62.7 l0 3" {...isoDetail} />
        <path d="M184.3 64.6 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 83 L100.6 91 L110 95.7 L110 87.7 Z" {...isoFace} />
        <path d="M119.4 83 L119.4 91 L110 95.7 L110 87.7 Z" {...isoFace} />
        <path d="M110 78.3 L119.4 83 L110 87.7 L100.6 83 Z" {...isoTop} />
        <path d="M105 71.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 83 L178.6 91 L188 95.7 L188 87.7 Z" {...isoFace} />
        <path d="M197.4 83 L197.4 91 L188 95.7 L188 87.7 Z" {...isoFace} />
        <path d="M188 78.3 L197.4 83 L188 87.7 L178.6 83 Z" {...isoTop} />
        <path d="M183 71.3 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="51.8" y="24.4" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <g className="text-accent">
          <text x="71" y="30" textAnchor="middle" {...isoLabel}>lối vòng</text>
        </g>
        <rect x="12.8" y="42.1" width="38.4" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="47.7" textAnchor="middle" {...isoLabel}>R Hà Nội</text>
        <rect x="88.7" y="42.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="47.7" textAnchor="middle" {...isoLabel}>R Đà Nẵng</text>
        <rect x="166.7" y="42.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="47.7" textAnchor="middle" {...isoLabel}>R Sài Gòn</text>
        <rect x="97.3" y="68.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="73.7" textAnchor="middle" {...isoLabel}>sw HN</text>
        <rect x="175.3" y="68.1" width="25.5" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="73.7" textAnchor="middle" {...isoLabel}>sw SG</text>
        <rect x="88.7" y="97.1" width="42.7" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="102.7" textAnchor="middle" {...isoLabel}>PC Hà Nội</text>
        <rect x="164.5" y="97.1" width="47" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="102.7" textAnchor="middle" {...isoLabel}>PC Sài Gòn</text>
      </g>
    </>
  )
}

function RouterMotChanM14() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 36.5 L110 54.8" {...isoStroke} />
              <path d="M110 54.8 L18.6 73.1" {...isoStroke} />
              <path d="M110 54.8 L73.4 82.2" {...isoStroke} />
              <path d="M110 54.8 L146.6 82.2" {...isoStroke} />
              <path d="M110 54.8 L201.4 73.1" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M103.4 36.5 L103.4 40 L110 43.3 L110 39.8 Z" {...isoFace} />
        <path d="M116.6 36.5 L116.6 40 L110 43.3 L110 39.8 Z" {...isoFace} />
        <path d="M110 33.2 L116.6 36.5 L110 39.8 L103.4 36.5 Z" {...isoTop} />
      </g>
      <g className="text-ink">
        <path d="M103.4 54.8 L103.4 58.3 L110 61.6 L110 58.1 Z" {...isoFace} />
        <path d="M116.6 54.8 L116.6 58.3 L110 61.6 L110 58.1 Z" {...isoFace} />
        <path d="M110 51.5 L116.6 54.8 L110 58.1 L103.4 54.8 Z" {...isoTop} />
        <path d="M112.6 57.8 l0 1.5" {...isoDetail} />
        <path d="M110 59.1 l0 1.5" {...isoDetail} />
        <path d="M107.4 60.4 l0 1.5" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M12 73.1 L12 78.7 L18.6 82 L18.6 76.4 Z" {...isoFace} />
        <path d="M25.2 73.1 L25.2 78.7 L18.6 82 L18.6 76.4 Z" {...isoFace} />
        <path d="M18.6 69.8 L25.2 73.1 L18.6 76.4 L12 73.1 Z" {...isoTop} />
        <path d="M13.6 62.8 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M194.8 73.1 L194.8 78.7 L201.4 82 L201.4 76.4 Z" {...isoFace} />
        <path d="M208 73.1 L208 78.7 L201.4 82 L201.4 76.4 Z" {...isoFace} />
        <path d="M201.4 69.8 L208 73.1 L201.4 76.4 L194.8 73.1 Z" {...isoTop} />
        <path d="M196.4 62.8 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M66.8 82.2 L66.8 87.8 L73.4 91.1 L73.4 85.5 Z" {...isoFace} />
        <path d="M80 82.2 L80 87.8 L73.4 91.1 L73.4 85.5 Z" {...isoFace} />
        <path d="M73.4 78.9 L80 82.2 L73.4 85.5 L66.8 82.2 Z" {...isoTop} />
        <path d="M68.4 71.9 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M140 82.2 L140 87.8 L146.6 91.1 L146.6 85.5 Z" {...isoFace} />
        <path d="M153.2 82.2 L153.2 87.8 L146.6 91.1 L146.6 85.5 Z" {...isoFace} />
        <path d="M146.6 78.9 L153.2 82.2 L146.6 85.5 L140 82.2 Z" {...isoTop} />
        <path d="M141.6 71.9 l10 0 l0 7 l-10 0 Z" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="95.1" y="44.7" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="50.3" textAnchor="middle" {...isoLabel}>router</text>
        <rect x="95.1" y="63" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="68.6" textAnchor="middle" {...isoLabel}>switch</text>
        <rect x="1.6" y="83.4" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="18.6" y="89" textAnchor="middle" {...isoLabel}>VLAN 10</text>
        <rect x="184.4" y="83.4" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="201.4" y="89" textAnchor="middle" {...isoLabel}>VLAN 40</text>
        <rect x="56.4" y="92.5" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="73.4" y="98.1" textAnchor="middle" {...isoLabel}>VLAN 20</text>
        <rect x="129.5" y="92.5" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="146.6" y="98.1" textAnchor="middle" {...isoLabel}>VLAN 30</text>
      </g>
    </>
  )
}

function VongLapStpChanM15() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 84.5 L188 32.5" {...isoStroke} />
              <path d="M188 32.5 L32 32.5" {...isoStroke} />
              <path d="M32 32.5 L110 84.5" {...isoStroke} strokeDasharray="4 3" />
      </g>
      <g className="text-ink">
        <path d="M22.6 32.5 L22.6 37.5 L32 42.2 L32 37.2 Z" {...isoFace} />
        <path d="M41.4 32.5 L41.4 37.5 L32 42.2 L32 37.2 Z" {...isoFace} />
        <path d="M32 27.8 L41.4 32.5 L32 37.2 L22.6 32.5 Z" {...isoTop} />
        <path d="M35.7 36.3 l0 3" {...isoDetail} />
        <path d="M32 38.2 l0 3" {...isoDetail} />
        <path d="M28.3 40.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 32.5 L178.6 37.5 L188 42.2 L188 37.2 Z" {...isoFace} />
        <path d="M197.4 32.5 L197.4 37.5 L188 42.2 L188 37.2 Z" {...isoFace} />
        <path d="M188 27.8 L197.4 32.5 L188 37.2 L178.6 32.5 Z" {...isoTop} />
        <path d="M191.7 36.3 l0 3" {...isoDetail} />
        <path d="M188 38.2 l0 3" {...isoDetail} />
        <path d="M184.3 40.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 84.5 L100.6 89.5 L110 94.2 L110 89.2 Z" {...isoFace} />
        <path d="M119.4 84.5 L119.4 89.5 L110 94.2 L110 89.2 Z" {...isoFace} />
        <path d="M110 79.8 L119.4 84.5 L110 89.2 L100.6 84.5 Z" {...isoTop} />
        <path d="M113.7 88.3 l0 3" {...isoDetail} />
        <path d="M110 90.2 l0 3" {...isoDetail} />
        <path d="M106.3 92.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="56.1" y="51.9" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="71" y="57.5" textAnchor="middle" {...isoLabel}>nằm im</text>
        <rect x="17.1" y="43.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="49.2" textAnchor="middle" {...isoLabel}>tầng 3</text>
        <rect x="173.1" y="43.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="49.2" textAnchor="middle" {...isoLabel}>tầng 2</text>
        <rect x="95.1" y="95.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="101.2" textAnchor="middle" {...isoLabel}>tầng 1</text>
      </g>
    </>
  )
}

function VongLapStpDutM15() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 84.5 L188 32.5" {...isoStroke} strokeDasharray="4 3" />
              <path d="M188 32.5 L32 32.5" {...isoStroke} />
              <path d="M32 32.5 L110 84.5" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M22.6 32.5 L22.6 37.5 L32 42.2 L32 37.2 Z" {...isoFace} />
        <path d="M41.4 32.5 L41.4 37.5 L32 42.2 L32 37.2 Z" {...isoFace} />
        <path d="M32 27.8 L41.4 32.5 L32 37.2 L22.6 32.5 Z" {...isoTop} />
        <path d="M35.7 36.3 l0 3" {...isoDetail} />
        <path d="M32 38.2 l0 3" {...isoDetail} />
        <path d="M28.3 40.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 32.5 L178.6 37.5 L188 42.2 L188 37.2 Z" {...isoFace} />
        <path d="M197.4 32.5 L197.4 37.5 L188 42.2 L188 37.2 Z" {...isoFace} />
        <path d="M188 27.8 L197.4 32.5 L188 37.2 L178.6 32.5 Z" {...isoTop} />
        <path d="M191.7 36.3 l0 3" {...isoDetail} />
        <path d="M188 38.2 l0 3" {...isoDetail} />
        <path d="M184.3 40.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 84.5 L100.6 89.5 L110 94.2 L110 89.2 Z" {...isoFace} />
        <path d="M119.4 84.5 L119.4 89.5 L110 94.2 L110 89.2 Z" {...isoFace} />
        <path d="M110 79.8 L119.4 84.5 L110 89.2 L100.6 84.5 Z" {...isoTop} />
        <path d="M113.7 88.3 l0 3" {...isoDetail} />
        <path d="M110 90.2 l0 3" {...isoDetail} />
        <path d="M106.3 92.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="132" y="51.9" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="149" y="57.5" textAnchor="middle" {...isoLabel}>cáp đứt</text>
        <rect x="17.1" y="43.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="49.2" textAnchor="middle" {...isoLabel}>tầng 3</text>
        <rect x="173.1" y="43.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="49.2" textAnchor="middle" {...isoLabel}>tầng 2</text>
        <rect x="95.1" y="95.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="101.2" textAnchor="middle" {...isoLabel}>tầng 1</text>
      </g>
    </>
  )
}

function VongLapStpDutM15HoiTu() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 84.5 L188 32.5" {...isoStroke} strokeDasharray="4 3" />
        <g className="text-accent">
        <path d="M188 32.5 L32 32.5" {...isoStroke} strokeWidth={2.2} />
        </g>
        <g className="text-accent">
        <path d="M32 32.5 L110 84.5" {...isoStroke} strokeWidth={2.2} />
        </g>
      </g>
      <g className="text-ink">
        <path d="M22.6 32.5 L22.6 37.5 L32 42.2 L32 37.2 Z" {...isoFace} />
        <path d="M41.4 32.5 L41.4 37.5 L32 42.2 L32 37.2 Z" {...isoFace} />
        <path d="M32 27.8 L41.4 32.5 L32 37.2 L22.6 32.5 Z" {...isoTop} />
        <path d="M35.7 36.3 l0 3" {...isoDetail} />
        <path d="M32 38.2 l0 3" {...isoDetail} />
        <path d="M28.3 40.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 32.5 L178.6 37.5 L188 42.2 L188 37.2 Z" {...isoFace} />
        <path d="M197.4 32.5 L197.4 37.5 L188 42.2 L188 37.2 Z" {...isoFace} />
        <path d="M188 27.8 L197.4 32.5 L188 37.2 L178.6 32.5 Z" {...isoTop} />
        <path d="M191.7 36.3 l0 3" {...isoDetail} />
        <path d="M188 38.2 l0 3" {...isoDetail} />
        <path d="M184.3 40.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 84.5 L100.6 89.5 L110 94.2 L110 89.2 Z" {...isoFace} />
        <path d="M119.4 84.5 L119.4 89.5 L110 94.2 L110 89.2 Z" {...isoFace} />
        <path d="M110 79.8 L119.4 84.5 L110 89.2 L100.6 84.5 Z" {...isoTop} />
        <path d="M113.7 88.3 l0 3" {...isoDetail} />
        <path d="M110 90.2 l0 3" {...isoDetail} />
        <path d="M106.3 92.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="132" y="51.9" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="149" y="57.5" textAnchor="middle" {...isoLabel}>cáp đứt</text>
        <rect x="54" y="51.9" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <g className="text-accent">
          <text x="71" y="57.5" textAnchor="middle" {...isoLabel}>lối mới</text>
        </g>
        <rect x="17.1" y="43.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="49.2" textAnchor="middle" {...isoLabel}>tầng 3</text>
        <rect x="173.1" y="43.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="49.2" textAnchor="middle" {...isoLabel}>tầng 2</text>
        <rect x="95.1" y="95.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="101.2" textAnchor="middle" {...isoLabel}>tầng 1</text>
      </g>
    </>
  )
}

function VongLapStpM15() {
  return (
    <>
      <g className="text-ink-muted">
              <path d="M110 84.5 L188 32.5" {...isoStroke} />
              <path d="M188 32.5 L32 32.5" {...isoStroke} />
              <path d="M32 32.5 L110 84.5" {...isoStroke} />
      </g>
      <g className="text-ink">
        <path d="M22.6 32.5 L22.6 37.5 L32 42.2 L32 37.2 Z" {...isoFace} />
        <path d="M41.4 32.5 L41.4 37.5 L32 42.2 L32 37.2 Z" {...isoFace} />
        <path d="M32 27.8 L41.4 32.5 L32 37.2 L22.6 32.5 Z" {...isoTop} />
        <path d="M35.7 36.3 l0 3" {...isoDetail} />
        <path d="M32 38.2 l0 3" {...isoDetail} />
        <path d="M28.3 40.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M178.6 32.5 L178.6 37.5 L188 42.2 L188 37.2 Z" {...isoFace} />
        <path d="M197.4 32.5 L197.4 37.5 L188 42.2 L188 37.2 Z" {...isoFace} />
        <path d="M188 27.8 L197.4 32.5 L188 37.2 L178.6 32.5 Z" {...isoTop} />
        <path d="M191.7 36.3 l0 3" {...isoDetail} />
        <path d="M188 38.2 l0 3" {...isoDetail} />
        <path d="M184.3 40.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <path d="M100.6 84.5 L100.6 89.5 L110 94.2 L110 89.2 Z" {...isoFace} />
        <path d="M119.4 84.5 L119.4 89.5 L110 94.2 L110 89.2 Z" {...isoFace} />
        <path d="M110 79.8 L119.4 84.5 L110 89.2 L100.6 84.5 Z" {...isoTop} />
        <path d="M113.7 88.3 l0 3" {...isoDetail} />
        <path d="M110 90.2 l0 3" {...isoDetail} />
        <path d="M106.3 92.1 l0 3" {...isoDetail} />
      </g>
      <g className="text-ink">
        <rect x="54" y="51.9" width="34.1" height="7.4" rx="1.5" {...isoPlate} />
        <text x="71" y="57.5" textAnchor="middle" {...isoLabel}>sợi mới</text>
        <rect x="17.1" y="43.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="32" y="49.2" textAnchor="middle" {...isoLabel}>tầng 3</text>
        <rect x="173.1" y="43.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="188" y="49.2" textAnchor="middle" {...isoLabel}>tầng 2</text>
        <rect x="95.1" y="95.6" width="29.8" height="7.4" rx="1.5" {...isoPlate} />
        <text x="110" y="101.2" textAnchor="middle" {...isoLabel}>tầng 1</text>
      </g>
    </>
  )
}

/** visualId -> hình isometric sinh từ bản vẽ. ConceptVisual gộp map này vào REGISTRY. */
export const ISOMETRIC_SCENES: Record<string, () => React.ReactNode> = {
  'vis-iso-chi-nhanh-m21': ChiNhanhM21,
  'vis-iso-hai-loi-ba-mien-m16': HaiLoiBaMienM16,
  'vis-iso-lab-duong-du-phong-m15': LabDuongDuPhongM15,
  'vis-iso-lab-duong-du-phong-m15-loi-giai': LabDuongDuPhongM15LoiGiai,
  'vis-iso-lab-noi-day-m4': LabNoiDayM4,
  'vis-iso-lab-noi-day-m4-loi-giai': LabNoiDayM4LoiGiai,
  'vis-iso-lab-ospf-doi-lo-m16': LabOspfDoiLoM16,
  'vis-iso-lab-ospf-doi-lo-m16-loi-giai': LabOspfDoiLoM16LoiGiai,
  'vis-iso-lab-ospf-doi-lo-m16-dut': LabOspfDoiLoM16Dut,
  'vis-iso-lab-ospf-doi-lo-m16-duong-vong': LabOspfDoiLoM16DuongVong,
  'vis-iso-router-mot-chan-m14': RouterMotChanM14,
  'vis-iso-vong-lap-stp-chan-m15': VongLapStpChanM15,
  'vis-iso-vong-lap-stp-dut-m15': VongLapStpDutM15,
  'vis-iso-vong-lap-stp-dut-m15-hoi-tu': VongLapStpDutM15HoiTu,
  'vis-iso-vong-lap-stp-m15': VongLapStpM15,
}
