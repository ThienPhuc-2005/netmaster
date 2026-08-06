// Hình THIẾT BỊ MẠNG dùng chung: máy tính, switch, router.
//
// Mỗi loại thiết bị có đúng một hình trong toàn app (spec 4.2). Vẽ quanh
// gốc toạ độ (0,0), rộng ~76 × cao ~52 đơn vị để khớp DEVICE_W/DEVICE_H
// của phòng lab; onboarding tịnh tiến chúng tới chỗ mình cần.
//
// `active` = thiết bị đang được gói tin ghé qua: sáng lên bằng màu nhấn
// (signaling — spec 4.2 "phần đang giảng sáng, phần khác mờ").

export type GlyphKind = 'pc' | 'switch' | 'router'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinejoin: 'round',
} as const

function PcGlyph() {
  return (
    <>
      <rect x="-30" y="-24" width="60" height="38" rx="4" {...stroke} />
      <path d="M-38 22 H38 M-14 14 v6 M14 14 v6" {...stroke} />
    </>
  )
}

function SwitchGlyph() {
  return (
    <>
      <rect x="-34" y="-16" width="68" height="32" rx="4" {...stroke} />
      {/* Bốn khe cổng — dấu hiệu nhận dạng "thiết bị nhiều cổng" */}
      <path d="M-22 6 v6 M-8 6 v6 M6 6 v6 M20 6 v6" {...stroke} strokeWidth={1.5} />
      <path d="M-22 -8 h44" {...stroke} strokeWidth={1.5} strokeDasharray="3 3" />
    </>
  )
}

function RouterGlyph() {
  return (
    <>
      <circle cx="0" cy="0" r="22" {...stroke} />
      {/* Ngã tư: router là chỗ các hướng gặp nhau rồi rẽ đi tiếp */}
      <path d="M-10 0 h20 M0 -10 v20" {...stroke} strokeWidth={1.5} />
    </>
  )
}

export function DeviceGlyph({ kind, active = false }: { kind: GlyphKind; active?: boolean }) {
  return (
    <g className={active ? 'text-accent' : 'text-ink-muted'}>
      {kind === 'pc' && <PcGlyph />}
      {kind === 'switch' && <SwitchGlyph />}
      {kind === 'router' && <RouterGlyph />}
    </g>
  )
}
