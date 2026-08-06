// Hình gợi nhớ của từng phòng trong cung điện ký ức.
//
// Đây KHÔNG phải trang trí. Trong phương pháp loci, hình ảnh là cái móc:
// người học nhớ "vỏ sò" rồi mới lần ra "22 / SSH". Vì vậy mỗi phòng một
// hình RIÊNG, và bóng dáng phải khác nhau đủ xa để liếc một cái là phân
// biệt được — hình na ná nhau thì hai chỗ trong cung điện đè lên nhau.
//
// Registry cố tình KHÔNG có hình dự phòng: thiếu hình là lỗi soạn bài
// (hasRoomGlyph + test chặn), không phải thứ nên rơi âm thầm về một hình
// chung như ConceptVisual làm với bài đọc.

import type { ReactNode } from 'react'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
} as const

function Glyph({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 96 96" role="img" aria-label={label} className="h-full w-full text-accent">
      {children}
    </svg>
  )
}

type GlyphFn = (label: string) => ReactNode

const REGISTRY: Record<string, GlyphFn> = {
  // Cửa chính mở toang — HTTP 80.
  'palace-door-open': (label) => (
    <Glyph label={label}>
      <path d="M26 78 V22 h30 v56" {...stroke} />
      <path d="M56 26 76 18 v62 l-20 -8" {...stroke} />
      <circle cx="62" cy="50" r="2.5" fill="currentColor" />
      <path d="M14 78 h68" {...stroke} />
    </Glyph>
  ),
  // Ổ khóa vàng — HTTPS 443.
  'palace-golden-lock': (label) => (
    <Glyph label={label}>
      <rect x="26" y="44" width="44" height="34" rx="5" {...stroke} />
      <path d="M36 44 V33 a12 12 0 0 1 24 0 v11" {...stroke} />
      <circle cx="48" cy="58" r="4" {...stroke} />
      <path d="M48 62 v8" {...stroke} />
    </Glyph>
  ),
  // Cuốn danh bạ ở quầy lễ tân — DNS 53.
  'palace-phonebook': (label) => (
    <Glyph label={label}>
      <path d="M20 24 h50 a6 6 0 0 1 6 6 v46 a6 6 0 0 0 -6 -6 H20 z" {...stroke} />
      <path d="M20 24 v46" {...stroke} />
      <path d="M32 40 h30 M32 50 h30 M32 60 h20" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Vỏ sò — SSH 22.
  'palace-seashell': (label) => (
    <Glyph label={label}>
      <path d="M48 78 C24 66 20 44 30 30 C40 18 56 18 66 30 C76 44 72 66 48 78 z" {...stroke} />
      <path d="M48 78 V26 M48 78 C38 62 34 44 38 28 M48 78 C58 62 62 44 58 28" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Phòng bốn vách kính — Telnet 23.
  'palace-glass-wall': (label) => (
    <Glyph label={label}>
      <rect x="20" y="24" width="56" height="52" rx="3" {...stroke} />
      <path d="M28 68 52 32 M44 68 68 32" {...stroke} strokeWidth={1.5} />
      <path d="M20 50 h56" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Tấm gương chiếu màn hình máy khác — RDP 3389.
  'palace-mirror-screen': (label) => (
    <Glyph label={label}>
      <rect x="18" y="26" width="60" height="40" rx="4" {...stroke} />
      <path d="M40 66 v8 h16 v-8" {...stroke} />
      <path d="M30 74 h36" {...stroke} />
      <path d="M28 38 h20 M28 48 h12" {...stroke} strokeWidth={1.5} />
      <path d="M60 36 68 44 60 52" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Ổ đĩa dùng chung — SMB 445.
  'palace-shared-drive': (label) => (
    <Glyph label={label}>
      <rect x="18" y="30" width="60" height="20" rx="3" {...stroke} />
      <rect x="18" y="54" width="60" height="20" rx="3" {...stroke} />
      <circle cx="66" cy="40" r="2.5" fill="currentColor" />
      <circle cx="66" cy="64" r="2.5" fill="currentColor" />
      <path d="M30 40 h20 M30 64 h20" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Băng chuyền chở thùng — FTP 21.
  'palace-conveyor': (label) => (
    <Glyph label={label}>
      <path d="M16 66 h64" {...stroke} />
      <circle cx="26" cy="72" r="6" {...stroke} />
      <circle cx="70" cy="72" r="6" {...stroke} />
      <rect x="30" y="38" width="24" height="24" rx="2" {...stroke} />
      <path d="M30 50 h24" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Tủ hồ sơ nhiều ngăn — MySQL 3306.
  'palace-file-cabinet': (label) => (
    <Glyph label={label}>
      <rect x="24" y="20" width="48" height="60" rx="3" {...stroke} />
      <path d="M24 40 h48 M24 60 h48" {...stroke} />
      <path d="M42 30 h12 M42 50 h12 M42 70 h12" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Thùng thư bưu cục — SMTP 25.
  'palace-mailbox': (label) => (
    <Glyph label={label}>
      <path d="M22 46 a18 18 0 0 1 36 0 v26 H22 z" {...stroke} />
      <path d="M58 52 h16 v20 H58" {...stroke} />
      <path d="M68 52 V34 h8" {...stroke} strokeWidth={1.5} />
      <path d="M30 58 h20" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Quầy xuất trình thẻ — Mail Submission 587.
  'palace-id-check': (label) => (
    <Glyph label={label}>
      <rect x="20" y="30" width="56" height="38" rx="4" {...stroke} />
      <circle cx="38" cy="46" r="7" {...stroke} />
      <path d="M28 60 a10 10 0 0 1 20 0" {...stroke} strokeWidth={1.5} />
      <path d="M56 42 h14 M56 52 h14" {...stroke} strokeWidth={1.5} />
      <path d="M40 68 v8" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Đồng hồ lớn của tòa nhà — NTP 123.
  'palace-big-clock': (label) => (
    <Glyph label={label}>
      <circle cx="48" cy="48" r="28" {...stroke} />
      <path d="M48 30 v18 l12 8" {...stroke} />
      <path d="M48 20 v4 M76 48 h-4 M48 76 v-4 M20 48 h4" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Sổ hộ khẩu của tòa nhà — LDAP 389.
  'palace-registry-book': (label) => (
    <Glyph label={label}>
      <rect x="24" y="22" width="48" height="56" rx="3" {...stroke} />
      <path d="M34 22 v56" {...stroke} />
      <circle cx="54" cy="40" r="6" {...stroke} />
      <path d="M44 56 a10 10 0 0 1 20 0" {...stroke} strokeWidth={1.5} />
      <path d="M44 66 h20" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Cuốn sổ ấy nhưng nằm trong két sắt — LDAPS 636.
  'palace-safe-book': (label) => (
    <Glyph label={label}>
      <rect x="20" y="24" width="56" height="52" rx="4" {...stroke} />
      <rect x="30" y="34" width="36" height="32" rx="2" {...stroke} strokeWidth={1.5} />
      <circle cx="48" cy="50" r="7" {...stroke} />
      <path d="M48 50 h9 M48 50 v9" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
  // Cặp chìa khóa phát và nhận — DHCP 67/68.
  'palace-key-pair': (label) => (
    <Glyph label={label}>
      <circle cx="32" cy="36" r="9" {...stroke} />
      <path d="M38 42 56 60 v8 h8" {...stroke} />
      <circle cx="64" cy="36" r="6" {...stroke} strokeWidth={1.5} />
      <path d="M60 41 46 55" {...stroke} strokeWidth={1.5} />
    </Glyph>
  ),
}

export function hasRoomGlyph(imageId: string): boolean {
  return imageId in REGISTRY
}

/** Danh sách id hình đang có — test nội dung dùng để đối chiếu. */
export function roomGlyphIds(): string[] {
  return Object.keys(REGISTRY)
}

export function RoomGlyph({ imageId, label }: { imageId: string; label: string }) {
  const draw = REGISTRY[imageId]
  if (draw === undefined) {
    throw new Error(`RoomGlyph: chưa có hình cho phòng "${imageId}"`)
  }
  return draw(label)
}
