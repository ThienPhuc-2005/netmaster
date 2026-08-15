// Hình minh họa khái niệm (dual coding — spec 2.1 bước 3: mỗi khái niệm
// 1 hình, chữ ngắn đặt NGAY CẠNH hình). Registry ánh xạ visualId trong
// nội dung → hình SVG vẽ tay theo hệ ẩn dụ bưu điện; visualId chưa có
// hình riêng dùng hình thư chung để bài vẫn dạy được, và Khối 5 bổ sung
// dần hình cho nội dung mới.
//
// NHÃN TRONG HÌNH LÀ TIẾNG VIỆT, CỐ Ý (chốt 08-08 sau câu hỏi của hội
// đồng, ghế i18n). Hình đi kèm NỘI DUNG bài học, mà nội dung Phase 1
// chỉ có tiếng Việt — dịch nhãn SVG sang EN sẽ cho ra một cái hình nói
// tiếng Anh cạnh một đoạn bài nói tiếng Việt, tệ hơn hẳn hiện trạng.
// Chỉ khi nào nội dung bài học có bản EN thật thì mới bàn tiếp: lúc đó
// nhãn đi qua LText như mọi chuỗi nội dung khác, KHÔNG qua i18n (i18n
// dành cho chuỗi khung app). Khung app xung quanh hình vẫn song ngữ.

import type { ReactNode } from 'react'
import { m } from 'motion/react'
import { loadModules } from '../content'
import { ISOMETRIC_SCENES } from './IsometricScenes.generated'

function Frame({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <svg
      viewBox="0 0 220 130"
      role="img"
      aria-label={title}
      className="h-40 w-full rounded-md border border-edge bg-panel"
    >
      {/* Đầu mũi tên dùng chung: khai ở Frame nên MỌI hình đều có sẵn.
          Trước đây nó chỉ nằm trong một hình, và hình nào vẽ mũi tên mà
          quên khai lại thì nét đó cụt đầu — lỗi im lặng, chỉ nhìn mới thấy. */}
      <defs>
        {/* `context-stroke` = ăn màu của CHÍNH nét gọi mũi tên, không phải
            màu chữ của cả khung. Trước đây mọi đầu mũi tên đều xám như
            nhau, kể cả trên nét đã tô accent để chỉ "đường đang giảng" —
            tức là màu nói một đằng, đầu mũi tên nói một nẻo (hội đồng
            07-08, ghế hình khái niệm). Trình duyệt cũ không hiểu từ khóa
            này thì rơi về currentColor, đúng hành vi cũ. */}
        <marker id="cv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 6 3 0 6" fill="none" stroke="context-stroke" strokeWidth="1.5" />
        </marker>
      </defs>
      {children}
    </svg>
  )
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinejoin: 'round' } as const

/** Phong bì lớn tách thành các gói nhỏ — gói tin. */
function EnvelopePackets({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="18" y="35" width="76" height="52" rx="4" {...stroke} />
        <path d="M18 40 56 68 94 40" {...stroke} />
      </g>
      <g className="text-accent">
        <path d="M104 61 h18" {...stroke} markerEnd="url(#cv-arrow)" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${132 + i * 26} ${47 + (i % 2) * 10})`}>
            <rect width="20" height="16" rx="3" {...stroke} />
            <path d="M0 3 10 11 20 3" {...stroke} strokeWidth={1.5} />
          </g>
        ))}
      </g>
    </Frame>
  )
}

/** Ngôi nhà + biển địa chỉ — địa chỉ IP. */
function HouseAddress({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M60 62 110 28 160 62" {...stroke} />
        <path d="M72 58 v40 h76 v-40" {...stroke} />
        <rect x="100" y="72" width="20" height="26" {...stroke} />
      </g>
      <g className="text-accent">
        <rect x="66" y="104" width="88" height="16" rx="3" {...stroke} />
        <text x="110" y="116" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          192.168.1.10
        </text>
      </g>
    </Frame>
  )
}

/** Chung cư với các cửa đánh số — port. */
function ApartmentPorts({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="60" y="20" width="100" height="90" rx="4" {...stroke} />
      </g>
      {[
        { x: 72, label: '80' },
        { x: 102, label: '443' },
        { x: 132, label: '22' },
      ].map(({ x, label }) => (
        <g key={label}>
          <rect x={x} y="66" width="24" height="44" className="text-ink-muted" {...stroke} />
          <text
            x={x + 12}
            y="58"
            textAnchor="middle"
            fontSize="11"
            className="text-accent"
            fill="currentColor"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {label}
          </text>
        </g>
      ))}
    </Frame>
  )
}

/** Nút router với các mũi tên rẽ hướng — bưu tá của mạng. */
function RouterNode({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <circle cx="110" cy="65" r="20" {...stroke} />
        <path d="M102 65 h16 M110 57 v16" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-ink-muted">
        <path d="M30 65 H86" {...stroke} markerEnd="url(#cv-arrow2)" />
        <path d="M130 55 176 30" {...stroke} markerEnd="url(#cv-arrow2)" />
        <path d="M130 75 176 100" {...stroke} markerEnd="url(#cv-arrow2)" />
        <rect x="16" y="57" width="18" height="14" rx="2" {...stroke} />
        <path d="M16 59 25 66 34 59" {...stroke} strokeWidth={1.5} />
      </g>
      <defs>
        <marker id="cv-arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 6 3 0 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </marker>
      </defs>
    </Frame>
  )
}

/** Hai lá thư cùng khuôn dạng — giao thức (luật chơi chung). */
function MatchingLetters({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      {[36, 124].map((x) => (
        <g key={x} className="text-ink-muted">
          <rect x={x} y="30" width="60" height="74" rx="4" {...stroke} />
          <path d={`M${x + 10} 46 h40 M${x + 10} 58 h40 M${x + 10} 70 h28`} {...stroke} strokeWidth={1.5} />
        </g>
      ))}
      <g className="text-ok">
        <path d="M104 66 h12" {...stroke} />
        <path d="M106 90 l5 5 9 -11" {...stroke} />
      </g>
    </Frame>
  )
}

// ---------------------------------------------------------------
// Module 2 — hành trình "gõ google.com": một sơ đồ, mỗi màn dạy sáng
// đúng chặng đang giảng, các chặng khác mờ 40% (signaling, spec 4.2);
// gói tin trượt vào vị trí bằng motion (240ms ease-out).
// ---------------------------------------------------------------

type JourneyLeg = 'dns' | 'gateway' | 'routers' | 've-dich' | 'tong-quan'

function MiniPacket({ x, y }: { x: number; y: number }) {
  return (
    <m.g
      initial={{ x: x - 16, y, opacity: 0 }}
      animate={{ x, y, opacity: 1 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="text-accent"
    >
      <rect x="-8" y="-6" width="16" height="12" rx="2" fill="var(--panel)" stroke="currentColor" strokeWidth="1.8" />
      <path d="M-8 -3.5 0 3 8 -3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </m.g>
  )
}

function Journey({ leg, title }: { leg: JourneyLeg; title?: string }) {
  const dim = (active: boolean) => (leg === 'tong-quan' || active ? undefined : 0.4)
  return (
    <Frame title={title}>
      {/* Máy bạn */}
      <g className="text-ink-muted" opacity={dim(leg === 'dns' || leg === 'gateway' || leg === 've-dich')}>
        <rect x="16" y="66" width="22" height="16" rx="2" {...stroke} />
        <path d="M18 86 h18" {...stroke} strokeWidth={1.5} />
      </g>
      {/* DNS — danh bạ, hỏi đáp bằng nét đứt TRƯỚC chuyến đi */}
      <g className="text-ink-muted" opacity={dim(leg === 'dns')}>
        <rect x="34" y="18" width="16" height="20" rx="2" {...stroke} stroke={leg === 'dns' ? 'var(--accent)' : 'currentColor'} />
        <path d="M38 24 h8 M38 29 h8 M38 34 h5" {...stroke} strokeWidth={1.2} />
        <path d="M31 62 38 42" {...stroke} strokeDasharray="3 3" strokeWidth={1.5} />
      </g>
      {/* Gateway — cánh cổng */}
      <g className="text-ink-muted" opacity={dim(leg === 'gateway')}>
        <path d="M84 82 V60 q8 -10 16 0 V82" {...stroke} stroke={leg === 'gateway' ? 'var(--accent)' : 'currentColor'} />
      </g>
      {/* Router trung chuyển */}
      <g className="text-ink-muted" opacity={dim(leg === 'routers')}>
        <circle cx="130" cy="66" r="9" {...stroke} stroke={leg === 'routers' ? 'var(--accent)' : 'currentColor'} />
        <circle cx="154" cy="80" r="9" {...stroke} stroke={leg === 'routers' ? 'var(--accent)' : 'currentColor'} />
        <path d="M126 66 h8 M130 62 v8 M150 80 h8 M154 76 v8" {...stroke} strokeWidth={1.2} />
      </g>
      {/* Server — tòa nhà dịch vụ */}
      <g className="text-ink-muted" opacity={dim(leg === 'routers' || leg === 've-dich')}>
        <rect x="186" y="52" width="18" height="34" rx="2" {...stroke} />
        <path d="M189 60 h12 M189 68 h12 M189 76 h12" {...stroke} strokeWidth={1.2} />
      </g>
      {/* Tuyến đi */}
      <path d="M38 74 H84" {...stroke} opacity={dim(leg === 'gateway')} stroke={leg === 'gateway' ? 'var(--accent)' : 'var(--edge)'} />
      <path d="M100 74 121 68 M139 70 146 76 M163 80 186 76" {...stroke} opacity={dim(leg === 'routers')} stroke={leg === 'routers' ? 'var(--accent)' : 'var(--edge)'} />
      {/* Tuyến về — vòng dưới */}
      <path
        d="M195 90 Q110 122 30 86"
        {...stroke}
        opacity={dim(leg === 've-dich')}
        stroke={leg === 've-dich' ? 'var(--accent)' : 'var(--edge)'}
        strokeDasharray={leg === 've-dich' ? undefined : '3 4'}
      />
      {leg === 'dns' && <MiniPacket x={26} y={52} />}
      {leg === 'gateway' && <MiniPacket x={61} y={74} />}
      {leg === 'routers' && <MiniPacket x={142} y={62} />}
      {leg === 've-dich' && <MiniPacket x={112} y={106} />}
      {leg === 'tong-quan' && <MiniPacket x={61} y={74} />}
    </Frame>
  )
}

/**
 * Bản đồ khóa học 12 module (advance organizer, spec Module 2).
 *
 * Lưới 12 ô là LỘ TRÌNH theo spec mục 3 — cố định, luôn đúng. Nhưng ô
 * nào được TÔ ĐẶC thì suy từ nội dung thật đang có trong app: module đã
 * viết xong thì sáng, module chưa có thì để rỗng. Hình này nói với người
 * học "đây là toàn cảnh, bạn đang ở đâu" — đếm cứng 3 module Phần A sẽ
 * biến nó thành lời nói dối ngay khi module tiếp theo ra đời.
 */
// labelX đặt ngay sau ô cuối của từng hàng (ô rộng 14, cách nhau 20,
// hàng bắt đầu ở x=24). Hàng dài nhất (5 ô) là chỗ dễ tràn khung nhất —
// đã từng tràn thật, chữ "C · 8-12" bị cắt mất đuôi.
//
// Lộ trình có 5 phần từ spec v2 (nhập môn A-C, trung cấp D-E). Hàng nào
// chưa có module viết xong thì ô để RỖNG — bản đồ nói thật cả về phần
// đang còn dang dở, thay vì giấu đi để trông cho đẹp.
const COURSE_PARTS = [
  { part: 'A', color: 'var(--part-a)', orders: [1, 2, 3], y: 16 },
  { part: 'B', color: 'var(--part-b)', orders: [4, 5, 6, 7], y: 38 },
  { part: 'C', color: 'var(--part-c)', orders: [8, 9, 10, 11, 12], y: 60 },
  { part: 'D', color: 'var(--part-d)', orders: [13, 14, 15, 16, 17], y: 82 },
  { part: 'E', color: 'var(--part-e)', orders: [18, 19, 20, 21], y: 104 },
] as const

function CourseMap({ title }: { title?: string }) {
  const published = new Set(loadModules().map((m) => m.order))
  const cell = (x: number, y: number, color: string, filled: boolean) => (
    <rect
      key={`${x}-${y}`}
      x={x}
      y={y}
      width="14"
      height="14"
      rx="3"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="2"
      opacity={filled ? 1 : 0.55}
    />
  )
  return (
    <Frame title={title}>
      {COURSE_PARTS.map(({ part, color, orders, y }) => (
        <g key={part}>
          {orders.map((order, i) => cell(24 + i * 20, y, color, published.has(order)))}
          <text
            x={24 + orders.length * 20 + 4}
            y={y + 11}
            fontSize="10"
            fill={color}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {`${part} · ${orders[0]}-${orders.at(-1)}`}
          </text>
        </g>
      ))}
    </Frame>
  )
}

// ---------------------------------------------------------------
// Module 3 — địa chỉ: số khung/biển số, octet, private/public,
// subnet mask, magic number, IPv6. Chữ trong hình chỉ dùng SỐ/mã
// (mono) — mọi lời giảng nằm ở body cạnh hình.
// ---------------------------------------------------------------

const monoText = { fontSize: 10, fill: 'var(--ink-muted)', style: { fontFamily: 'var(--font-mono)' } } as const

/** MAC = số khung đóng chết vào khung xe; IP = biển số tháo lắp được. */
function ChassisPlate({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="50" y="28" width="120" height="40" rx="6" {...stroke} />
        <circle cx="78" cy="76" r="9" {...stroke} />
        <circle cx="142" cy="76" r="9" {...stroke} />
        <text x="62" y="52" {...monoText}>MAC aa:bb:cc:11:22:33</text>
        <path d="M56 34 l4 4 M164 34 l-4 4" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-accent">
        <rect x="66" y="96" width="88" height="20" rx="3" {...stroke} />
        <text x="76" y="110" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>IP 192.168.1.10</text>
        <circle cx="72" cy="106" r="1.6" fill="currentColor" />
        <circle cx="148" cy="106" r="1.6" fill="currentColor" />
      </g>
    </Frame>
  )
}

/** IPv4 = 4 ô số 0-255; ba ô đầu (phần mạng) cùng tông, ô cuối là số nhà. */
function FourOctets({ title }: { title?: string }) {
  const octets = ['192', '168', '1', '10']
  return (
    <Frame title={title}>
      {octets.map((o, i) => (
        <g key={i}>
          <rect
            x={26 + i * 46}
            y={48}
            width="38"
            height="30"
            rx="4"
            fill={i < 3 ? 'var(--panel-hover)' : 'none'}
            stroke={i < 3 ? 'var(--accent)' : 'var(--ink-muted)'}
            strokeWidth="2"
          />
          <text x={26 + i * 46 + 19} y={68} textAnchor="middle" fontSize="12" fill={i < 3 ? 'var(--accent)' : 'var(--ink)'} style={{ fontFamily: 'var(--font-mono)' }}>
            {o}
          </text>
          {i < 3 && <circle cx={26 + i * 46 + 42} cy={63} r="1.6" fill="var(--ink-muted)" />}
        </g>
      ))}
      <text x={26} y={96} {...monoText}>0-255 · 0-255 · 0-255 · 0-255</text>
    </Frame>
  )
}

/** Hai nhà khác nhau dùng CÙNG địa chỉ private — chỉ public là duy nhất. */
function PrivatePublic({ title }: { title?: string }) {
  const house = (x: number) => (
    <g key={x} className="text-ink-muted">
      <rect x={x} y={44} width="56" height="42" rx="4" {...stroke} />
      <path d={`M${x + 10} 58 L${x + 28} 48 L${x + 46} 58`} {...stroke} strokeWidth={1.5} />
      <text x={x + 28} y={78} textAnchor="middle" fontSize="8.5" fill="var(--ink-muted)" style={{ fontFamily: 'var(--font-mono)' }}>
        192.168.1.10
      </text>
    </g>
  )
  return (
    <Frame title={title}>
      {house(20)}
      {house(144)}
      <g className="text-accent">
        <circle cx="110" cy="62" r="14" {...stroke} />
        <path d="M96 62 h28 M110 48 a20 20 0 0 1 0 28 M110 48 a20 20 0 0 0 0 28" {...stroke} strokeWidth={1.2} />
        <text x="110" y="98" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          203.113.5.7
        </text>
      </g>
    </Frame>
  )
}

/** Subnet mask kẻ ranh: 255 = phần khu phố, 0 = phần số nhà. */
function MaskFence({ title }: { title?: string }) {
  const boxes = ['255', '255', '255', '0']
  return (
    <Frame title={title}>
      {boxes.map((b, i) => (
        <g key={i}>
          <rect
            x={26 + i * 46}
            y={54}
            width="38"
            height="28"
            rx="4"
            fill={i < 3 ? 'var(--panel-hover)' : 'none'}
            stroke={i < 3 ? 'var(--accent)' : 'var(--ink-muted)'}
            strokeWidth="2"
          />
          <text x={26 + i * 46 + 19} y={73} textAnchor="middle" fontSize="12" fill={i < 3 ? 'var(--accent)' : 'var(--ink)'} style={{ fontFamily: 'var(--font-mono)' }}>
            {b}
          </text>
        </g>
      ))}
      {/* Hàng rào giữa phần mạng và phần host */}
      <path d="M162 44 v52" stroke="var(--warn)" strokeWidth="2" strokeDasharray="5 4" fill="none" />
      <text x={26} y={40} {...monoText}>/24</text>
      <text x={168} y={40} {...monoText}>host</text>
    </Frame>
  )
}

/** Magic number: trục 0→256, mốc nhảy theo bước 64 (ví dụ /26). */
function MagicNumber({ title }: { title?: string }) {
  const ticks = [0, 64, 128, 192, 256]
  const x = (v: number) => 24 + (v / 256) * 172
  return (
    <Frame title={title}>
      <path d={`M${x(0)} 78 H${x(256)}`} stroke="var(--edge)" strokeWidth="2" fill="none" />
      {ticks.map((v) => (
        <g key={v}>
          <path d={`M${x(v)} 72 v12`} stroke="var(--accent)" strokeWidth="2" fill="none" />
          <text x={x(v)} y={98} textAnchor="middle" fontSize="9" fill="var(--ink-muted)" style={{ fontFamily: 'var(--font-mono)' }}>
            {v}
          </text>
        </g>
      ))}
      {/* IP .130 rơi vào block bắt đầu ở 128 */}
      <circle cx={x(130)} cy={78} r="4" fill="var(--warn)" />
      <text x={x(130) + 6} y={66} fontSize="9" fill="var(--warn)" style={{ fontFamily: 'var(--font-mono)' }}>.130</text>
      <text x={24} y={40} fontSize="11" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)' }}>256 − 192 = 64</text>
    </Frame>
  )
}

/**
 * Trọn một khối /26: mốc đầu là tên khu phố, mốc cuối là tiếng gọi cả khu,
 * phần giữa mới là số nhà cắm được. Vẽ đúng dải .64 → .127 của bài học.
 */
function BlockAnatomy({ title }: { title?: string }) {
  const x = (v: number) => 20 + ((v - 64) / 64) * 180
  return (
    <Frame title={title}>
      {/* Thân khối: phần giữa tô nhạt = chỗ cắm máy */}
      <rect x={x(65)} y="52" width={x(126) - x(65)} height="22" rx="3" fill="var(--accent)" opacity="0.18" />
      <path d={`M${x(64)} 63 H${x(127)}`} stroke="var(--edge)" strokeWidth="2" fill="none" />
      {[64, 127].map((v) => (
        <path key={v} d={`M${x(v)} 50 v26`} stroke="var(--warn)" strokeWidth="2.5" fill="none" />
      ))}
      <text x={x(64)} y={44} textAnchor="middle" fontSize="9" fill="var(--warn)" style={{ fontFamily: 'var(--font-mono)' }}>
        .64
      </text>
      <text x={x(127)} y={44} textAnchor="middle" fontSize="9" fill="var(--warn)" style={{ fontFamily: 'var(--font-mono)' }}>
        .127
      </text>
      <text x={x(64)} y={92} textAnchor="middle" fontSize="8" fill="var(--ink-muted)">
        tên khu phố
      </text>
      <text x={x(127)} y={92} textAnchor="middle" fontSize="8" fill="var(--ink-muted)">
        gọi cả khu
      </text>
      <text x={x(95)} y={68} textAnchor="middle" fontSize="9" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)' }}>
        .65 → .126
      </text>
      <text x={x(95)} y={110} textAnchor="middle" fontSize="9" fill="var(--accent)">
        62 số nhà cắm được
      </text>
      <text x={20} y={24} fontSize="10" fill="var(--ink-muted)" style={{ fontFamily: 'var(--font-mono)' }}>
        192.168.1.0/26 · khối .64
      </text>
    </Frame>
  )
}

/** Số máy dùng được = cỡ khối trừ 2 — hai đầu bị lấy mất, giữa mới là máy. */
function UsableHosts({ title }: { title?: string }) {
  const rows: [string, number, number][] = [
    ['/26', 64, 62],
    ['/27', 32, 30],
    ['/28', 16, 14],
    ['/30', 4, 2],
  ]
  return (
    <Frame title={title}>
      <text x={20} y={24} fontSize="10" fill="var(--ink-muted)">
        cỡ khối − 2 = số máy
      </text>
      {rows.map(([name, size, usable], i) => {
        const y = 42 + i * 20
        return (
          <g key={name}>
            <text x={20} y={y + 4} fontSize="10" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)' }}>
              {name}
            </text>
            <rect x="48" y={y - 7} width="12" height="12" rx="2" fill="var(--warn)" opacity="0.55" />
            <rect x="62" y={y - 7} width={Math.max(96 * (usable / 64), 14)} height="12" rx="2" fill="var(--accent)" opacity="0.32" />
            <rect x={62 + Math.max(96 * (usable / 64), 14)} y={y - 7} width="12" height="12" rx="2" fill="var(--warn)" opacity="0.55" />
            <text
              x={186}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="var(--ink)"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {size} − 2 = {usable}
            </text>
          </g>
        )
      })}
    </Frame>
  )
}

/** IPv6: biển số dài — đặt cạnh biển IPv4 cho thấy độ chênh. */
function Ipv6Plate({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="62" y="26" width="96" height="20" rx="3" {...stroke} />
        <text x="110" y="40" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          192.168.1.10
        </text>
      </g>
      <g className="text-accent">
        <rect x="18" y="66" width="184" height="24" rx="3" {...stroke} />
        <text x="110" y="82" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          2001:0db8:85a3::8a2e:1
        </text>
      </g>
      <text x="110" y="108" textAnchor="middle" {...monoText}>32 bit → 128 bit</text>
    </Frame>
  )
}

// ---------------------------------------------------------------
// Module 4 — thiết bị trong làng: switch, bảng MAC, ARP, VLAN, miền
// quảng bá, định tuyến. Nối tiếp hệ ẩn dụ bưu điện: switch là bưu cục
// trong làng, VLAN là hai xóm có tường ngăn, router là cây cầu.
// ---------------------------------------------------------------

/** Switch: một hộp nhiều cổng, mọi máy cắm vào đó thay vì nối chằng chịt. */
function SwitchHub({ title }: { title?: string }) {
  const seats = [46, 84, 136, 174]
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="70" y="58" width="80" height="24" rx="4" {...stroke} />
        <path d="M84 82 v8 M108 82 v8 M132 82 v8" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-ink-muted">
        {seats.map((x) => (
          <rect key={x} x={x - 12} y="22" width="24" height="17" rx="2" {...stroke} />
        ))}
        {seats.map((x) => (
          <path key={x} d={`M${x} 39 Q ${x} 52 110 58`} {...stroke} strokeWidth={1.5} />
        ))}
      </g>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        1 hộp · nhiều cổng
      </text>
    </Frame>
  )
}

/** Bảng MAC: cuốn sổ switch ghi "máy nào đang ở cổng nào". */
function MacTable({ title }: { title?: string }) {
  const rows = [
    ['aa:...:01', 'cổng 1'],
    ['aa:...:02', 'cổng 2'],
  ]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="42" y="28" width="136" height="74" rx="4" {...stroke} />
        <path d="M42 46 H178 M110 28 V102" {...stroke} strokeWidth={1.5} />
      </g>
      <text x="60" y="41" {...monoText}>
        MAC
      </text>
      <text x="128" y="41" {...monoText}>
        cổng
      </text>
      {rows.map(([mac, port], i) => (
        <g key={mac}>
          <text x="52" y={64 + i * 20} {...monoText}>
            {mac}
          </text>
          <text x="122" y={64 + i * 20} fontSize="10" fill="var(--accent)" style={{ fontFamily: 'var(--font-mono)' }}>
            {port}
          </text>
        </g>
      ))}
    </Frame>
  )
}

/** ARP: hỏi to giữa sân "ai đang giữ địa chỉ này?" rồi chờ một người giơ tay. */
function ArpShout({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="18" y="52" width="30" height="22" rx="3" {...stroke} />
        <path d="M52 63 h26" {...stroke} strokeDasharray="4 3" markerEnd="url(#cv-arp)" />
      </g>
      <g className="text-ink-muted">
        {[92, 134, 176].map((x, i) => (
          <rect key={x} x={x - 14} y={i === 1 ? 40 : 52} width="28" height="22" rx="3" {...stroke} />
        ))}
      </g>
      <g className="text-ok">
        <path d="M134 76 Q 90 100 48 78" {...stroke} markerEnd="url(#cv-arp-ok)" />
      </g>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        ai giữ .20? — tôi đây
      </text>
      <defs>
        <marker id="cv-arp" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 6 3 0 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </marker>
        <marker id="cv-arp-ok" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 6 3 0 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </marker>
      </defs>
    </Frame>
  )
}

/** VLAN: một switch bị vạch đôi thành hai xóm, thư không đi xuyên tường. */
function VlanSplit({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="30" y="52" width="160" height="26" rx="4" {...stroke} />
      </g>
      {/* Bức tường giữa hai VLAN */}
      <path d="M110 44 v42" fill="none" stroke="var(--warn)" strokeWidth="3" strokeDasharray="5 4" />
      <g style={{ color: 'var(--part-a)' }}>
        <rect x="42" y="20" width="26" height="18" rx="2" {...stroke} />
        <path d="M55 38 v14" {...stroke} strokeWidth={1.5} />
        <text x="55" y="102" textAnchor="middle" fontSize="10" fill="var(--part-a)" style={{ fontFamily: 'var(--font-mono)' }}>
          VLAN 10
        </text>
      </g>
      <g style={{ color: 'var(--part-c)' }}>
        <rect x="152" y="20" width="26" height="18" rx="2" {...stroke} />
        <path d="M165 38 v14" {...stroke} strokeWidth={1.5} />
        <text x="165" y="102" textAnchor="middle" fontSize="10" fill="var(--part-c)" style={{ fontFamily: 'var(--font-mono)' }}>
          VLAN 20
        </text>
      </g>
    </Frame>
  )
}

/** Miền quảng bá: tiếng gọi lan tới đâu thì miền tới đó. */
function BroadcastDomain({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <circle cx="72" cy="65" r="10" {...stroke} />
        {[22, 34, 46].map((r) => (
          <circle key={r} cx="72" cy="65" r={r} fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.5 - r / 140} />
        ))}
      </g>
      <path d="M150 24 v82" fill="none" stroke="var(--warn)" strokeWidth="3" strokeDasharray="5 4" />
      <g className="text-ink-muted">
        <rect x="166" y="54" width="26" height="20" rx="3" {...stroke} />
      </g>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        tiếng gọi dừng ở tường
      </text>
    </Frame>
  )
}

/** Định tuyến: cây cầu nối hai xóm, mỗi bên một dải địa chỉ. */
function RoutingBridge({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g style={{ color: 'var(--part-a)' }}>
        <rect x="16" y="46" width="56" height="34" rx="4" {...stroke} />
        <text x="44" y="98" textAnchor="middle" fontSize="9" fill="var(--part-a)" style={{ fontFamily: 'var(--font-mono)' }}>
          192.168.1.x
        </text>
      </g>
      <g style={{ color: 'var(--part-c)' }}>
        <rect x="148" y="46" width="56" height="34" rx="4" {...stroke} />
        <text x="176" y="98" textAnchor="middle" fontSize="9" fill="var(--part-c)" style={{ fontFamily: 'var(--font-mono)' }}>
          10.0.0.x
        </text>
      </g>
      <g className="text-accent">
        <circle cx="110" cy="63" r="18" {...stroke} />
        <path d="M102 63 h16 M110 55 v16" {...stroke} strokeWidth={1.5} />
        <path d="M72 63 H90" {...stroke} />
        <path d="M130 63 H148" {...stroke} />
      </g>
      <text x="110" y="30" textAnchor="middle" {...monoText}>
        IP giữ nguyên · MAC đổi
      </text>
    </Frame>
  )
}

/**
 * Bắt tay ba bước — Von Restorff (spec Module 5): nhịp GIỮA (SYN-ACK) là
 * nhịp hay bị nhớ nhầm thứ tự nhất, nên nó được vẽ khác hẳn hai nhịp kia:
 * màu nhấn, nét dày, mũi tên hai đầu, và có khung bao quanh. Hai nhịp
 * còn lại cố tình để mờ — cái lạ chỉ nổi khi xung quanh nó bình thường.
 */
function Handshake3Way({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="14" y="30" width="40" height="70" rx="4" {...stroke} />
        <rect x="166" y="30" width="40" height="70" rx="4" {...stroke} />
        <text x="34" y="118" textAnchor="middle" {...monoText}>
          máy bạn
        </text>
        <text x="186" y="118" textAnchor="middle" {...monoText}>
          máy chủ
        </text>
        <path d="M56 40 H164" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="34" textAnchor="middle" {...monoText}>
          SYN
        </text>
        {/* ACK do MÁY BẠN gửi (bước 3) — mũi tên phải chạy trái → phải.
            Từng vẽ ngược chiều (M164 H56): hình dạy "máy chủ gửi ACK",
            sai TCP thật — lỗi P0 hội đồng bắt được, không tái phạm. */}
        <path d="M56 94 H164" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="90" textAnchor="middle" {...monoText}>
          ACK
        </text>
      </g>
      <g className="text-accent">
        <rect x="62" y="56" width="96" height="22" rx="11" {...stroke} strokeWidth={2.5} />
        {/* SYN-ACK do máy chủ gửi VỀ — một đầu mũi tên, trỏ về máy bạn.
            Von Restorff vẫn nguyên ở khung bao + nét dày, không cần mũi
            tên hai đầu (hai đầu là mất luôn thông tin chiều đi). */}
        <path d="M146 67 H74" {...stroke} strokeWidth={2.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="52" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          SYN-ACK
        </text>
      </g>
    </Frame>
  )
}

/** TCP: gói đánh số, gói số 2 rớt được gửi lại. */
function TcpReliable({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      {/* Gói tin GIỮ nắp phong bì ở mọi module (spec 4.2: "gói tin luôn
          cùng một hình dạng") — hộp trơn làm mất dấu hiệu nhận diện đúng
          chỗ người học cần thấy "vẫn là gói tin đó, chỉ khác cách gửi". */}
      <g className="text-ink-muted">
        {['1', '2', '3'].map((n, i) => (
          <g key={n} transform={`translate(${30 + i * 46} 34)`}>
            <rect width="30" height="22" rx="3" {...stroke} strokeWidth={1.5} />
            <path d="M0 4 15 14 30 4" {...stroke} strokeWidth={1} />
            <text x="15" y="18" textAnchor="middle" {...monoText}>
              {n}
            </text>
          </g>
        ))}
        <path d="M172 45 H196" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <path d="M91 60 v18 h-46 v-18" {...stroke} strokeWidth={1.5} strokeDasharray="4 3" />
        <rect x="30" y="80" width="30" height="22" rx="3" {...stroke} />
        <path d="M30 84 45 94 60 84" {...stroke} strokeWidth={1} />
        <text x="45" y="98" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          2
        </text>
        <text x="140" y="96" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          thiếu số 2 → gửi lại
        </text>
      </g>
    </Frame>
  )
}

/** UDP: bắn liên tục một chiều, rớt gói nào thì thôi. */
function UdpFast({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <path d="M22 40 h30 l24 -14 v50 l-24 -14 H22 z" {...stroke} />
        <path d="M84 34 q10 12 0 24" {...stroke} strokeWidth={1.5} />
        <path d="M94 28 q16 18 0 36" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-ink-muted">
        {/* Nắp phong bì trên từng gói — cùng lý do TcpReliable ở trên. */}
        {[0, 1, 3].map((i) => (
          <g key={i} transform={`translate(${118 + i * 24} 42)`}>
            <rect width="18" height="14" rx="2" {...stroke} strokeWidth={1.5} />
            <path d="M0 3 9 9 18 3" {...stroke} strokeWidth={1} />
          </g>
        ))}
        <g transform="translate(166 82)">
          <rect width="18" height="14" rx="2" {...stroke} strokeWidth={1.5} strokeDasharray="3 3" />
          <path d="M0 3 9 9 18 3" {...stroke} strokeWidth={1} strokeDasharray="3 3" />
        </g>
        <path d="M175 60 v16" {...stroke} strokeWidth={1.5} strokeDasharray="3 3" />
        <text x="110" y="118" textAnchor="middle" {...monoText}>
          rớt gói nào thì thôi
        </text>
      </g>
    </Frame>
  )
}

/** Cổng nổi tiếng: dãy cửa đã có chủ trong dải 0-1023. */
function WellKnownDoors({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M18 96 H202" {...stroke} />
        <text x="110" y="118" textAnchor="middle" {...monoText}>
          0 — 1023 · đã có chủ theo quy ước
        </text>
      </g>
      {/* Cửa xếp THEO THỨ TỰ SỐ trên trục (22 < 80 < 443) — trục ghi
          "0 — 1023" là tín hiệu trục số, cửa đặt lộn xộn là dạy một bố
          cục không gian sai cho đúng module lấy trí nhớ vị trí làm vũ khí. */}
      {[
        { x: 34, label: '22' },
        { x: 96, label: '80' },
        { x: 158, label: '443' },
      ].map((d) => (
        <g key={d.label} className="text-accent">
          <rect x={d.x} y="34" width="32" height="62" rx="3" {...stroke} />
          <circle cx={d.x + 25} cy="66" r="2.5" fill="currentColor" />
          <text x={d.x + 16} y="28" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {d.label}
          </text>
        </g>
      ))}
    </Frame>
  )
}

/** Cổng tạm thời: ba tab lấy ba số khác nhau, cùng gõ một cửa 443. */
function EphemeralTicket({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {['51344', '51345', '51346'].map((n, i) => (
          <g key={n} transform={`translate(14 ${24 + i * 30})`}>
            <rect width="58" height="22" rx="3" {...stroke} strokeWidth={1.5} />
            <text x="29" y="15" textAnchor="middle" {...monoText}>
              {n}
            </text>
            <path d={`M74 11 H130`} {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
          </g>
        ))}
      </g>
      <g className="text-accent">
        <rect x="144" y="34" width="56" height="62" rx="4" {...stroke} />
        <text x="172" y="70" textAnchor="middle" fontSize="12" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          443
        </text>
      </g>
    </Frame>
  )
}

/**
 * Cung điện ký ức: tòa nhà 5 tầng × 3 phòng. Lộ trình vẽ THÀNH MỘT MŨI
 * TÊN RIÊNG bên trái chứ không kẻ đè lên các phòng — đè lên thì 15 ô
 * thành một mớ rối, mà cái cần thấy ngay là "5 tầng, mỗi tầng 3 phòng,
 * đi từ dưới lên".
 */
function PalaceBuilding({ title }: { title?: string }) {
  const floors = [0, 1, 2, 3, 4]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {floors.map((f) =>
          [0, 1, 2].map((p) => (
            <rect
              key={`${f}-${p}`}
              x={80 + p * 40}
              y={16 + f * 21}
              width="34"
              height="16"
              rx="2"
              {...stroke}
              strokeWidth={1.2}
            />
          )),
        )}
        <text x="140" y="126" textAnchor="middle" {...monoText}>
          5 tầng × 3 phòng
        </text>
      </g>
      <g className="text-accent">
        <path d="M62 108 V22" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <circle cx="62" cy="108" r="3.5" fill="currentColor" />
        <text x="30" y="66" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          đi lên
        </text>
      </g>
    </Frame>
  )
}

/** Resolver: máy bạn hỏi một câu, anh này chạy vòng hỏi hộ. */
function DnsResolver({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="14" y="52" width="40" height="30" rx="3" {...stroke} />
        <text x="34" y="98" textAnchor="middle" {...monoText}>
          máy bạn
        </text>
        <path d="M56 67 H84" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
      </g>
      {/* Resolver KHÔNG mượn glyph router (vòng tròn + chữ thập) — hai
          khái niệm khác hẳn, chung hình là gieo "resolver là một loại
          router" vào trí nhớ ảnh (spec 4.2). Móc riêng: quầy người-hỏi-hộ
          cầm cuốn danh bạ — cùng motif phonebook của phòng 53 cung điện. */}
      <g className="text-accent">
        <circle cx="100" cy="53" r="7" {...stroke} strokeWidth={1.5} />
        <path d="M89 82 c0 -10 22 -10 22 0" {...stroke} strokeWidth={1.5} />
        <rect x="108" y="62" width="18" height="22" rx="2" {...stroke} strokeWidth={1.5} />
        <path d="M117 62 v22 M111 68 h4 M111 74 h4 M120 68 h3 M120 74 h3" {...stroke} strokeWidth={1} />
        <text x="106" y="104" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          resolver
        </text>
      </g>
      <g className="text-ink-muted">
        <path d="M126 60 q30 -30 62 -20" {...stroke} strokeWidth={1.2} strokeDasharray="4 3" markerEnd="url(#cv-arrow)" />
        <path d="M128 67 H188" {...stroke} strokeWidth={1.2} strokeDasharray="4 3" markerEnd="url(#cv-arrow)" />
        <path d="M126 76 q30 28 62 18" {...stroke} strokeWidth={1.2} strokeDasharray="4 3" markerEnd="url(#cv-arrow)" />
        <text x="176" y="24" textAnchor="middle" {...monoText}>
          hỏi hộ ba nơi
        </text>
      </g>
    </Frame>
  )
}

/** Ba tầng DNS: gốc → TLD → có thẩm quyền. */
function DnsHierarchy({ title }: { title?: string }) {
  const levels = [
    { y: 22, label: 'gốc', w: 54 },
    { y: 56, label: '.com', w: 78 },
    { y: 90, label: 'example.com', w: 108 },
  ]
  return (
    <Frame title={title}>
      {levels.map((lv, i) => (
        <g key={lv.label} className={i === 2 ? 'text-accent' : 'text-ink-muted'}>
          <rect x={110 - lv.w / 2} y={lv.y} width={lv.w} height="22" rx="4" {...stroke} strokeWidth={i === 2 ? 2 : 1.5} />
          <text x="110" y={lv.y + 15} textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {lv.label}
          </text>
        </g>
      ))}
      <g className="text-ink-muted">
        <path d="M110 44 v12" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M110 78 v12" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="126" textAnchor="middle" {...monoText}>
          nơi giữ câu trả lời thật
        </text>
      </g>
    </Frame>
  )
}

/** Bản ghi A: một dòng tên → địa chỉ. */
function RecordA({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="26" width="180" height="78" rx="4" {...stroke} />
        <path d="M20 48 H200" {...stroke} strokeWidth={1.2} />
        <text x="40" y="42" {...monoText}>
          TÊN
        </text>
        <text x="128" y="42" {...monoText}>
          ĐỊA CHỈ
        </text>
      </g>
      <g className="text-accent">
        <text x="30" y="68" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          example.com
        </text>
        <text x="126" y="68" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          93.184.16.34
        </text>
        <text x="30" y="90" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          A
        </text>
        <text x="126" y="90" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          AAAA → IPv6
        </text>
      </g>
    </Frame>
  )
}

/** CNAME là biệt danh, MX là hòm thư. */
function RecordCnameMx({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="24" width="86" height="30" rx="4" {...stroke} strokeWidth={1.5} />
        <text x="59" y="43" textAnchor="middle" {...monoText}>
          blog.example
        </text>
        <path d="M102 39 H150" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" strokeDasharray="4 3" />
        <text x="126" y="32" textAnchor="middle" {...monoText}>
          CNAME
        </text>
        <rect x="150" y="24" width="54" height="30" rx="4" {...stroke} strokeWidth={1.5} />
        <text x="177" y="43" textAnchor="middle" {...monoText}>
          example
        </text>
      </g>
      <g className="text-accent">
        <path d="M22 74 h56 v28 H22 z" {...stroke} />
        <path d="M22 74 50 92 78 74" {...stroke} strokeWidth={1.5} />
        <path d="M84 88 H140" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="112" y="80" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          MX
        </text>
        <rect x="142" y="72" width="60" height="32" rx="4" {...stroke} />
        <text x="172" y="92" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          máy chủ thư
        </text>
      </g>
    </Frame>
  )
}

/** DoH: câu hỏi DNS bọc trong phong bì niêm phong đi cổng 443. */
function DohEnvelope({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <text x="52" y="30" textAnchor="middle" {...monoText}>
          hỏi: example.com
        </text>
        <rect x="24" y="38" width="56" height="26" rx="3" {...stroke} strokeWidth={1.2} strokeDasharray="3 3" />
        <text x="52" y="55" textAnchor="middle" {...monoText}>
          DNS
        </text>
        <path d="M84 51 H108" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <rect x="112" y="30" width="80" height="52" rx="4" {...stroke} strokeWidth={2} />
        <path d="M112 34 152 62 192 34" {...stroke} strokeWidth={1.5} />
        <rect x="140" y="66" width="24" height="18" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M146 66 v-6 a6 6 0 0 1 12 0 v6" {...stroke} strokeWidth={1.5} />
        <text x="152" y="104" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          HTTPS · 443
        </text>
      </g>
    </Frame>
  )
}

/** Bốn nhịp DORA — nhịp Request (thứ ba) nói TO nên vẽ nhấn. */
function DoraFourBeats({ title }: { title?: string }) {
  const beats = [
    { y: 24, label: 'Discover', dir: 1 },
    { y: 48, label: 'Offer', dir: -1 },
    { y: 72, label: 'Request', dir: 1 },
    { y: 96, label: 'Ack', dir: -1 },
  ]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="10" y="18" width="34" height="94" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="176" y="18" width="34" height="94" rx="3" {...stroke} strokeWidth={1.2} />
        {/* Nhãn hai đầu — Handshake3Way cùng bố cục đã có, đây cũng phải
            có: không bắt người học đoán bên nào là DHCP server. */}
        <text x="27" y="126" textAnchor="middle" {...monoText}>
          máy bạn
        </text>
        <text x="193" y="126" textAnchor="middle" {...monoText}>
          DHCP
        </text>
      </g>
      {beats.map((b) => {
        const accent = b.label === 'Request'
        return (
          <g key={b.label} className={accent ? 'text-accent' : 'text-ink-muted'}>
            <path
              d={b.dir === 1 ? 'M48 ' + b.y + ' H172' : 'M172 ' + b.y + ' H48'}
              {...stroke}
              strokeWidth={accent ? 2.5 : 1.2}
              markerEnd="url(#cv-arrow)"
            />
            <text
              x="110"
              y={b.y - 4}
              textAnchor="middle"
              fontSize={accent ? 10 : 8}
              fill="currentColor"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {b.label}
            </text>
          </g>
        )
      })}
    </Frame>
  )
}

/** DHCP: chìa khóa kèm tờ giấy thuê có hạn. */
function DhcpLease({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <circle cx="52" cy="52" r="14" {...stroke} />
        <path d="M62 62 88 88 v10 h10" {...stroke} />
      </g>
      <g className="text-ink-muted">
        <rect x="112" y="26" width="80" height="76" rx="4" {...stroke} />
        <path d="M124 46 h56 M124 62 h56 M124 78 h36" {...stroke} strokeWidth={1.2} />
        <text x="110" y="112" textAnchor="middle" {...monoText}>
          IP · mặt nạ
        </text>
        <text x="110" y="124" textAnchor="middle" {...monoText}>
          gateway · DNS
        </text>
      </g>
    </Frame>
  )
}

/** Gia hạn: đi được nửa vạch thời gian là đã xin gia hạn. */
function LeaseRenew({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="52" width="170" height="18" rx="9" {...stroke} strokeWidth={1.5} />
        <text x="30" y="88" {...monoText}>
          bắt đầu thuê
        </text>
        <text x="176" y="88" textAnchor="middle" {...monoText}>
          hết hạn
        </text>
      </g>
      <g className="text-accent">
        <rect x="20" y="52" width="85" height="18" rx="9" {...stroke} strokeWidth={2} />
        <path d="M105 44 v-16" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <text x="105" y="22" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          xin gia hạn
        </text>
        <circle cx="105" cy="61" r="4" fill="currentColor" />
      </g>
    </Frame>
  )
}

/** NAT: cả chung cư một số nhà — ẩn dụ Module 1 quay lại. */
function NatApartment({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="22" width="82" height="86" rx="4" {...stroke} />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <rect key={`${r}-${c}`} x={32 + c * 30} y={34 + r * 24} width="22" height="16" rx="2" {...stroke} strokeWidth={1.2} />
          )),
        )}
        <text x="61" y="122" textAnchor="middle" {...monoText}>
          192.168.1.x
        </text>
      </g>
      <g className="text-accent">
        <path d="M104 65 H140" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <rect x="144" y="50" width="64" height="30" rx="4" {...stroke} />
        <text x="176" y="69" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          203.0.113.7
        </text>
        <text x="176" y="40" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          số nhà chung
        </text>
      </g>
    </Frame>
  )
}

/** PAT: cuốn sổ ghép cặp cổng riêng ↔ cổng chung. */
function NatTable({ title }: { title?: string }) {
  const rows = [
    { inside: '1.10:51344', outside: ':40001' },
    { inside: '1.11:60122', outside: ':40002' },
  ]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="24" width="188" height="76" rx="4" {...stroke} />
        <path d="M16 46 H204 M110 24 V100" {...stroke} strokeWidth={1.2} />
        <text x="63" y="40" textAnchor="middle" {...monoText}>
          trong nhà
        </text>
        <text x="157" y="40" textAnchor="middle" {...monoText}>
          ra ngoài
        </text>
      </g>
      <g className="text-accent">
        {rows.map((r, i) => (
          <g key={r.inside}>
            <text x="63" y={64 + i * 20} textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
              {r.inside}
            </text>
            <text x="157" y={64 + i * 20} textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
              {r.outside}
            </text>
          </g>
        ))}
      </g>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        thư về tra sổ này
      </text>
    </Frame>
  )
}

/** Port forwarding: một cửa khai sẵn dẫn thẳng vào một máy. */
function PortForward({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M18 66 H62" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="40" y="52" textAnchor="middle" {...monoText}>
          từ ngoài
        </text>
        <rect x="66" y="34" width="46" height="62" rx="4" {...stroke} />
        <text x="89" y="112" textAnchor="middle" {...monoText}>
          router
        </text>
      </g>
      <g className="text-accent">
        <rect x="78" y="56" width="22" height="24" rx="2" {...stroke} strokeWidth={2} />
        <text x="89" y="28" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          cổng 8080
        </text>
        <path d="M114 66 H150" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <rect x="152" y="50" width="50" height="32" rx="4" {...stroke} />
        <text x="177" y="70" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          .1.50:80
        </text>
      </g>
    </Frame>
  )
}

/** Tường lửa stateful: bảng nhớ ai vừa gọi ra. */
function StatefulGuard({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="96" y="16" width="28" height="98" rx="3" {...stroke} />
        <path d="M28 44 H92" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="58" y="36" textAnchor="middle" {...monoText}>
          gọi ra
        </text>
      </g>
      <g className="text-accent">
        <path d="M192 62 H128" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <text x="162" y="54" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          thư về: qua
        </text>
        <rect x="16" y="76" width="72" height="26" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="52" y="93" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          bảng đang mở
        </text>
      </g>
      <g className="text-warn">
        <path d="M192 94 H136" {...stroke} strokeWidth={1.5} strokeDasharray="4 3" />
        <path d="M130 88 l-8 12 M122 88 l8 12" {...stroke} strokeWidth={1.5} />
        <text x="170" y="112" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          người lạ: chặn
        </text>
      </g>
    </Frame>
  )
}

/** Sơ đồ mạng nhà: nhà mạng → modem → router → switch/Wi-Fi → thiết bị. */
function HomeNetwork({ title }: { title?: string }) {
  const boxes = [
    { x: 14, label: 'modem' },
    { x: 76, label: 'router' },
    { x: 138, label: 'switch' },
  ]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <text x="110" y="20" textAnchor="middle" {...monoText}>
          nhà mạng → nhà bạn
        </text>
        {boxes.map((b, i) => (
          <g key={b.label}>
            <rect x={b.x} y="38" width="52" height="28" rx="4" {...stroke} strokeWidth={i === 1 ? 2 : 1.2} className={i === 1 ? 'text-accent' : undefined} />
            <text x={b.x + 26} y="56" textAnchor="middle" {...monoText}>
              {b.label}
            </text>
          </g>
        ))}
        <path d="M66 52 H74 M128 52 H136" {...stroke} strokeWidth={1.5} />
        <path d="M164 68 v14 H120 M164 68 v14 H208" {...stroke} strokeWidth={1.2} />
        <rect x="104" y="84" width="32" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="192" y="84" width="24" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="110" y="122" textAnchor="middle" {...monoText}>
          NAT + tường lửa ở router
        </text>
      </g>
    </Frame>
  )
}

/** Double NAT: hai lớp cổng lồng nhau, hai cuốn sổ. */
function DoubleNat({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="14" y="26" width="192" height="72" rx="5" {...stroke} strokeWidth={1.2} />
        <text x="44" y="20" textAnchor="middle" {...monoText}>
          hộp nhà mạng
        </text>
      </g>
      <g className="text-warn">
        <rect x="60" y="42" width="140" height="42" rx="5" {...stroke} strokeWidth={1.5} />
        <text x="130" y="36" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          router thứ hai
        </text>
      </g>
      <g className="text-accent">
        <rect x="150" y="52" width="40" height="22" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="170" y="67" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          máy bạn
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        hai lớp cổng, hai cuốn sổ
      </text>
    </Frame>
  )
}

/** Wi-Fi: một điểm phát, mọi thiết bị chung một khoảng không khí. */
function WifiWaves({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="18" y="52" width="42" height="26" rx="4" {...stroke} />
        <path d="M28 52 v-10 M50 52 v-10" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-accent">
        <path d="M70 57 q10 8 0 16" {...stroke} strokeWidth={1.5} />
        <path d="M80 50 q18 15 0 30" {...stroke} strokeWidth={1.5} />
        <path d="M90 43 q26 22 0 44" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-ink-muted">
        <rect x="148" y="34" width="16" height="28" rx="3" {...stroke} strokeWidth={1.5} />
        <rect x="172" y="72" width="34" height="20" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M110 65 H144 M110 65 168 80" {...stroke} strokeWidth={1} strokeDasharray="3 3" />
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        không khí = một dây chung
      </text>
    </Frame>
  )
}

/** Ba băng tần: trầm vang xa xuyên tường, thanh chở nhiều mà gần. */
function BandTradeoff({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <text x="14" y="36" {...monoText}>2.4</text>
        <path d="M42 32 H198" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="14" y="64" {...monoText}>5</text>
        <path d="M42 60 H138" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <text x="14" y="92" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>6</text>
        <path d="M42 88 H112" {...stroke} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-ink-muted">
        <path d="M152 20 V98" {...stroke} strokeWidth={1.2} strokeDasharray="5 3" />
        <text x="160" y="104" {...monoText}>tường</text>
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        thấp: xa mà chậm · cao: nhanh mà gần
      </text>
    </Frame>
  )
}

/** Thế hệ Wi-Fi 4→7: số càng cao càng mới, tương thích ngược. */
function WifiGenerations({ title }: { title?: string }) {
  const gens = [
    { x: 22, num: '4', sub: 'n' },
    { x: 70, num: '5', sub: 'ac' },
    { x: 118, num: '6', sub: 'ax' },
    { x: 166, num: '7', sub: 'be' },
  ]
  return (
    <Frame title={title}>
      <path d="M14 92 H206" className="text-ink-muted" {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
      {gens.map((g, i) => (
        <g key={g.num} className={i === 3 ? 'text-accent' : 'text-ink-muted'}>
          <rect x={g.x} y="34" width="34" height="36" rx="4" {...stroke} strokeWidth={i === 3 ? 2 : 1.5} />
          <text x={g.x + 17} y="52" textAnchor="middle" fontSize="12" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {g.num}
          </text>
          <text x={g.x + 17} y="64" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {g.sub}
          </text>
        </g>
      ))}
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        đời mới luôn nói được giọng cũ
      </text>
    </Frame>
  )
}

/** Băng 6 GHz: làn cao tốc mới còn vắng bên hai làn cũ chen chúc. */
function NewLane({ title }: { title?: string }) {
  const cars24 = [48, 74, 100, 126, 152, 178]
  const cars5 = [60, 116, 172]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="14" y="18" width="192" height="24" rx="3" {...stroke} strokeWidth={1.2} />
        {cars24.map((x) => (
          <rect key={x} x={x} y="25" width="16" height="10" rx="2" {...stroke} strokeWidth={1.2} />
        ))}
        <rect x="14" y="50" width="192" height="24" rx="3" {...stroke} strokeWidth={1.2} />
        {cars5.map((x) => (
          <rect key={x} x={x} y="57" width="16" height="10" rx="2" {...stroke} strokeWidth={1.2} />
        ))}
        <text x="22" y="34" {...monoText}>2.4</text>
        <text x="22" y="66" {...monoText}>5</text>
      </g>
      <g className="text-accent">
        <rect x="14" y="82" width="192" height="24" rx="3" {...stroke} />
        <text x="22" y="98" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>6</text>
        <text x="124" y="98" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          làn mới còn vắng
        </text>
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        6E = vé vào làn 6 GHz
      </text>
    </Frame>
  )
}

/** WPA: sóng bay tới tai người lạ nhưng nội dung đã khóa. */
function WpaLock({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="50" width="38" height="24" rx="4" {...stroke} />
        <path d="M62 50 q10 12 0 24" {...stroke} strokeWidth={1.5} />
        <path d="M74 42 q18 20 0 40" {...stroke} strokeWidth={1.5} />
        <circle cx="184" cy="52" r="9" {...stroke} strokeWidth={1.5} />
        <path d="M184 61 v22 M172 72 h24" {...stroke} strokeWidth={1.5} />
        <text x="184" y="104" textAnchor="middle" {...monoText}>?</text>
      </g>
      <g className="text-accent">
        <rect x="106" y="56" width="30" height="24" rx="4" {...stroke} />
        <path d="M113 56 v-8 a9 9 0 0 1 16 0 v8" {...stroke} />
        <circle cx="121" cy="67" r="2.5" fill="currentColor" stroke="none" />
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        nghe được sóng, không đọc được thư
      </text>
    </Frame>
  )
}

/** WPA3: hết dò offline — mỗi lần đoán phải gõ cửa router. */
function Wpa3Handshake({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-warn">
        <rect x="18" y="36" width="44" height="30" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M22 40 58 62 M58 40 22 62" {...stroke} strokeWidth={1.5} />
        <text x="40" y="80" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          dò offline
        </text>
      </g>
      <g className="text-accent">
        <path d="M74 51 H142" {...stroke} markerEnd="url(#cv-arrow)" />
        <text x="108" y="44" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          từng lần một
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="150" y="38" width="46" height="28" rx="4" {...stroke} />
        <path d="M160 38 v-8 M186 38 v-8" {...stroke} strokeWidth={1.5} />
        <text x="173" y="80" textAnchor="middle" {...monoText}>router</text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        mỗi lần đoán = một lần gõ cửa
      </text>
    </Frame>
  )
}

/** Link-local fe80: biệt danh chỉ có nghĩa trong một phòng. */
function LinkLocalRoom({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="24" width="126" height="80" rx="4" {...stroke} />
        <rect x="30" y="42" width="26" height="18" rx="3" {...stroke} strokeWidth={1.5} />
        <rect x="98" y="70" width="26" height="18" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M60 54 94 74" {...stroke} strokeWidth={1} strokeDasharray="3 3" />
      </g>
      <g className="text-accent">
        <text x="43" y="38" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          fe80::a
        </text>
        <text x="111" y="66" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          fe80::b
        </text>
      </g>
      <g className="text-ink-muted">
        <circle cx="180" cy="56" r="14" {...stroke} strokeWidth={1.5} />
        <path d="M174 56 h12 M180 50 v12" {...stroke} strokeWidth={1.2} />
        <path d="M142 56 H162" {...stroke} strokeWidth={1.2} strokeDasharray="3 3" />
        <path d="M148 48 158 64 M158 48 148 64" {...stroke} strokeWidth={1.5} />
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        chỉ có nghĩa trong một phòng
      </text>
    </Frame>
  )
}

/** Global unicast chia đôi ở /64: khu phố router rao + số nhà máy chọn. */
function Ipv6TwoHalves({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="18" y="50" width="120" height="26" rx="3" {...stroke} />
        <text x="78" y="67" textAnchor="middle" {...monoText}>2001:db8:1:1</text>
        <text x="78" y="36" textAnchor="middle" {...monoText}>khu phố — router rao</text>
      </g>
      <g className="text-accent">
        <rect x="138" y="50" width="64" height="26" rx="3" {...stroke} />
        <text x="170" y="67" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          ::7a9f
        </text>
        <text x="170" y="94" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          máy tự chọn
        </text>
      </g>
      <g className="text-ink-muted">
        <path d="M138 44 v38" {...stroke} strokeWidth={1.2} strokeDasharray="4 3" />
        <text x="138" y="106" textAnchor="middle" {...monoText}>/64</text>
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        mỗi thiết bị một biển số thật
      </text>
    </Frame>
  )
}

/** SLAAC: router rao tên khu phố, máy tự ghép địa chỉ. */
function SlaacAssemble({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="18" y="22" width="44" height="26" rx="4" {...stroke} />
        <path d="M28 22 v-8 M52 22 v-8" {...stroke} strokeWidth={1.5} />
        <path d="M66 27 q9 8 0 16" {...stroke} strokeWidth={1.2} />
        <path d="M74 21 q12 14 0 28" {...stroke} strokeWidth={1.2} />
      </g>
      <text x="151" y="38" textAnchor="middle" {...monoText}>
        rao: 2001:db8:1:1::/64
      </text>
      <g className="text-ink-muted">
        <rect x="30" y="74" width="92" height="24" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="76" y="90" textAnchor="middle" {...monoText}>2001:db8:1:1</text>
      </g>
      <g className="text-accent">
        <path d="M126 86 h10" {...stroke} strokeWidth={1.5} />
        <rect x="140" y="74" width="52" height="24" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="166" y="90" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          ::7a9f
        </text>
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        máy tự ghép — không ai giữ sổ
      </text>
    </Frame>
  )
}

/** Dual-stack: một máy đeo hai biển số, hai đường ra song song. */
function DualStackPlates({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="18" y="44" width="42" height="30" rx="4" {...stroke} />
        <path d="M12 80 h54" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-ink-muted">
        <rect x="76" y="28" width="92" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="122" y="42" textAnchor="middle" {...monoText}>192.168.1.10</text>
        <path d="M172 38 H198" {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <rect x="76" y="62" width="92" height="20" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="122" y="76" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          2001:db8::5
        </text>
        <path d="M172 72 H198" {...stroke} markerEnd="url(#cv-arrow)" />
        <text x="150" y="98" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          ưu tiên IPv6
        </text>
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        hai biển số trên một card mạng
      </text>
    </Frame>
  )
}

/** Domain: nhiều máy chung một lá cờ luật — làng có luật. */
function MienLangMay({ title }: { title?: string }) {
  const pcs = [34, 96, 158]
  return (
    <Frame title={title}>
      <g className="text-accent">
        <path d="M110 18 v24" {...stroke} strokeWidth={1.5} />
        <path d="M110 20 C120 16 126 24 136 20 V34 C126 38 120 30 110 34 z" {...stroke} strokeWidth={1.5} />
        <text x="110" y="56" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          lab.local
        </text>
      </g>
      <g className="text-ink-muted">
        {pcs.map((x) => (
          <g key={x}>
            <rect x={x} y="74" width="28" height="20" rx="3" {...stroke} strokeWidth={1.5} />
            <path d={`M${x + 14} 74 V62 L110 46`} {...stroke} strokeWidth={1} strokeDasharray="3 3" />
          </g>
        ))}
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        gia nhập miền = chịu luật chung
      </text>
    </Frame>
  )
}

/** Domain Controller: máy chủ giữ sổ cái, mọi lượt đăng nhập phải qua. */
function DcSoCai({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="132" y="26" width="34" height="52" rx="4" {...stroke} />
        <path d="M138 36 h22 M138 46 h22 M138 56 h14" {...stroke} strokeWidth={1.5} />
        <text x="149" y="94" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DC
        </text>
      </g>
      <g className="text-ink-muted">
        <circle cx="38" cy="40" r="8" {...stroke} strokeWidth={1.5} />
        <path d="M28 62 a10 10 0 0 1 20 0" {...stroke} strokeWidth={1.5} />
        <circle cx="72" cy="44" r="8" {...stroke} strokeWidth={1.5} />
        <path d="M62 66 a10 10 0 0 1 20 0" {...stroke} strokeWidth={1.5} />
        <path d="M92 52 H124" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="108" y="44" textAnchor="middle" {...monoText}>ai đó?</text>
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        sổ cái + gác cổng đăng nhập
      </text>
    </Frame>
  )
}

/** User/Group: người vào nhóm, quyền cấp cho nhóm một lần. */
function UserGroup({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {[26, 46, 66].map((y, i) => (
          <g key={y}>
            <circle cx={30} cy={y + 4} r="6" {...stroke} strokeWidth={1.5} />
            <path d={`M40 ${y + 4} H${i === 1 ? 74 : 66}`} {...stroke} strokeWidth={1} strokeDasharray="3 3" />
          </g>
        ))}
      </g>
      <g className="text-accent">
        <rect x="80" y="34" width="56" height="30" rx="6" {...stroke} />
        <text x="108" y="53" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          KeToan
        </text>
        <path d="M140 49 H168" {...stroke} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-ink-muted">
        <rect x="174" y="38" width="24" height="22" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M181 49 l4 4 8 -8" {...stroke} strokeWidth={1.5} />
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        quyền cấp cho nhóm một lần
      </text>
    </Frame>
  )
}

/** OU: tủ ngăn kéo phòng ban — xếp chỗ và dán luật lên ngăn. */
function OuNganKeo({ title }: { title?: string }) {
  const drawers = [
    { y: 24, label: 'KeToan', accent: true },
    { y: 52, label: 'NhanSu', accent: false },
    { y: 80, label: 'VanHanh', accent: false },
  ]
  return (
    <Frame title={title}>
      {drawers.map((d) => (
        <g key={d.label} className={d.accent ? 'text-accent' : 'text-ink-muted'}>
          <rect x="56" y={d.y} width="108" height="24" rx="3" {...stroke} strokeWidth={d.accent ? 2 : 1.2} />
          <path d={`M130 ${d.y + 12} h16`} {...stroke} strokeWidth={1.5} />
          <text x="64" y={d.y + 16} fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {d.label}
          </text>
        </g>
      ))}
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        một hồ sơ nằm đúng một ngăn
      </text>
    </Frame>
  )
}

/** GPO: tờ cáo thị viết một lần, phải TREO mới có tác dụng. */
function GpoTreoLuat({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="28" y="24" width="48" height="62" rx="3" {...stroke} />
        <path d="M36 36 h32 M36 46 h32 M36 56 h32 M36 66 h20" {...stroke} strokeWidth={1.5} />
        <text x="52" y="100" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          GPO
        </text>
      </g>
      <g className="text-ink-muted">
        <path d="M84 54 H120" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="102" y="46" textAnchor="middle" {...monoText}>treo</text>
        <rect x="128" y="30" width="72" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="128" y="58" width="72" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="136" y="44" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          OU KeToan
        </text>
        <text x="136" y="72" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          OU NhanSu
        </text>
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        treo ở đâu, chỗ đó phải theo
      </text>
    </Frame>
  )
}

/** LSDOU: tòa nhà bốn tầng, leo từ trệt lên nóc, sau đè trước. */
function ToaNhaLsdou({ title }: { title?: string }) {
  const floors = [
    { y: 88, label: 'Local' },
    { y: 66, label: 'Site' },
    { y: 44, label: 'Domain' },
    { y: 22, label: 'OU' },
  ]
  return (
    <Frame title={title}>
      {floors.map((f, i) => (
        <g key={f.label} className={i === 3 ? 'text-accent' : 'text-ink-muted'}>
          <rect x="62" y={f.y} width="96" height="20" rx="2" {...stroke} strokeWidth={i === 3 ? 2 : 1.2} />
          <text x="110" y={f.y + 14} textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {f.label}
          </text>
        </g>
      ))}
      <g className="text-ink-muted">
        <path d="M46 104 V30" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="30" y="70" textAnchor="middle" {...monoText}>áp</text>
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        leo lên nóc — nói sau thì thắng
      </text>
    </Frame>
  )
}

/** Kế thừa: thác luật chảy xuống, mái che Block, mũi khoan Enforced. */
function KeThuaChan({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="72" y="16" width="76" height="18" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="110" y="29" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          Domain
        </text>
        <path d="M88 34 V58" {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
        <rect x="58" y="64" width="52" height="18" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="84" y="77" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          OU A
        </text>
      </g>
      <g className="text-warn">
        <path d="M128 46 h32" {...stroke} strokeWidth={2.5} />
        <path d="M134 34 V42" {...stroke} strokeWidth={1.2} />
        <text x="168" y="50" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          block
        </text>
      </g>
      <g className="text-accent">
        <path d="M144 34 V58" {...stroke} markerEnd="url(#cv-arrow)" />
        <rect x="122" y="64" width="52" height="18" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="148" y="77" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          OU B
        </text>
        <text x="148" y="96" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          enforced xuyên qua
        </text>
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        mái che chắn thường, thua mũi khoan
      </text>
    </Frame>
  )
}

/** gpresult: cửa sổ lệnh kê luật đang dính — hết phải đoán. */
function GpresultSoi({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="40" y="18" width="140" height="84" rx="4" {...stroke} strokeWidth={1.5} />
        <path d="M40 32 h140" {...stroke} strokeWidth={1.2} />
        <circle cx="50" cy="25" r="2" fill="currentColor" stroke="none" />
        <circle cx="58" cy="25" r="2" fill="currentColor" stroke="none" />
      </g>
      <g className="text-accent">
        <text x="48" y="46" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          &gt; gpresult /r
        </text>
      </g>
      <g className="text-ink-muted">
        <path d="M50 56 l3 3 6 -6" {...stroke} strokeWidth={1.5} />
        <text x="64" y="60" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          HinhNen-CongTy
        </text>
        <path d="M50 70 l3 3 6 -6" {...stroke} strokeWidth={1.5} />
        <text x="64" y="74" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          CamUSB-KeToan
        </text>
      </g>
      <g className="text-warn">
        <path d="M50 84 58 92 M58 84 50 92" {...stroke} strokeWidth={1.5} />
        <text x="64" y="91" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          LuatCu (bị chặn)
        </text>
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        lần theo bảng kê, không đoán
      </text>
    </Frame>
  )
}

/** Cloud: data center của người khác, bạn thuê một góc qua Internet. */
function CloudMayChuNguoiKhac({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M66 66 a16 16 0 0 1 4 -31 a20 20 0 0 1 38 -6 a14 14 0 0 1 12 24 a12 12 0 0 1 -6 13 z" {...stroke} strokeWidth={1.5} />
        <rect x="76" y="40" width="14" height="20" rx="2" {...stroke} strokeWidth={1.2} />
        <path d="M79 46 h8 M79 52 h8" {...stroke} strokeWidth={1} />
        <rect x="96" y="40" width="14" height="20" rx="2" {...stroke} strokeWidth={1.2} />
        <path d="M99 46 h8 M99 52 h8" {...stroke} strokeWidth={1} />
      </g>
      <g className="text-accent">
        <rect x="116" y="40" width="14" height="20" rx="2" {...stroke} strokeWidth={1.5} />
        <path d="M119 46 h8 M119 52 h8" {...stroke} strokeWidth={1.2} />
        <path d="M140 34 Q136 42 132 46" {...stroke} strokeWidth={1} markerEnd="url(#cv-arrow)" />
        <text x="172" y="30" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          góc bạn thuê
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="30" y="88" width="30" height="18" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M62 92 Q86 84 92 70" {...stroke} strokeWidth={1.2} strokeDasharray="4 3" markerEnd="url(#cv-arrow)" />
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        thiết bị thành phần mềm khai báo
      </text>
    </Frame>
  )
}

/** VPC hai ô so sánh: mạng nhà có rào ↔ vùng riêng kẻ trong mây. */
function VpcGocRieng({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M110 14 V100" {...stroke} strokeWidth={1} strokeDasharray="3 4" />
        <text x="58" y="24" textAnchor="middle" {...monoText}>nhà (VLAN)</text>
        <rect x="24" y="34" width="68" height="52" rx="4" {...stroke} strokeWidth={1.2} />
        <rect x="32" y="44" width="22" height="14" rx="2" {...stroke} strokeWidth={1.2} />
        <rect x="62" y="44" width="22" height="14" rx="2" {...stroke} strokeWidth={1.2} />
        <text x="58" y="78" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          dây + switch
        </text>
      </g>
      <g className="text-accent">
        <text x="163" y="24" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          mây (VPC)
        </text>
        <rect x="128" y="34" width="70" height="52" rx="4" {...stroke} strokeDasharray="6 4" />
        <rect x="136" y="44" width="24" height="14" rx="2" {...stroke} strokeWidth={1.2} />
        <rect x="168" y="44" width="24" height="14" rx="2" {...stroke} strokeWidth={1.2} />
        <text x="163" y="78" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          10.0.0.0/16
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        cùng vùng cô lập — khác cách kẻ ranh
      </text>
    </Frame>
  )
}

/** Security group: một gác ở cổng ↔ vệ sĩ kè kè từng máy. */
function SgTungMay({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M110 14 V100" {...stroke} strokeWidth={1} strokeDasharray="3 4" />
        <text x="58" y="24" textAnchor="middle" {...monoText}>nhà: gác ở cổng</text>
        <rect x="24" y="34" width="68" height="52" rx="4" {...stroke} strokeWidth={1.2} />
        <rect x="52" y="28" width="14" height="12" rx="2" {...stroke} strokeWidth={1.5} />
        <rect x="34" y="56" width="20" height="14" rx="2" {...stroke} strokeWidth={1.2} />
        <rect x="62" y="56" width="20" height="14" rx="2" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-accent">
        <text x="163" y="24" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          mây: gác từng máy
        </text>
        <rect x="130" y="46" width="24" height="16" rx="2" {...stroke} strokeWidth={1.2} />
        <path d="M142 74 c-7 0 -9 -6 -9 -10 l9 -4 9 4 c0 4 -2 10 -9 10 z" {...stroke} strokeWidth={1.5} />
        <rect x="172" y="46" width="24" height="16" rx="2" {...stroke} strokeWidth={1.2} />
        <path d="M184 74 c-7 0 -9 -6 -9 -10 l9 -4 9 4 c0 4 -2 10 -9 10 z" {...stroke} strokeWidth={1.5} />
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        mặc định chặn — tự mở từng luật
      </text>
    </Frame>
  )
}

/** VPN site-to-site: cây cầu kín nối hai mạng xuyên Internet. */
function VpnS2sCau({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="44" width="44" height="34" rx="4" {...stroke} strokeWidth={1.2} />
        <text x="38" y="92" textAnchor="middle" {...monoText}>văn phòng</text>
        <rect x="160" y="44" width="44" height="34" rx="4" {...stroke} strokeWidth={1.2} />
        <text x="182" y="92" textAnchor="middle" {...monoText}>VPC</text>
        <path d="M66 96 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 8 0" {...stroke} strokeWidth={1} />
        <text x="110" y="110" textAnchor="middle" {...monoText}>Internet</text>
      </g>
      <g className="text-accent">
        <path d="M60 52 H160 M60 70 H160" {...stroke} strokeWidth={1.5} />
        <rect x="98" y="52" width="24" height="18" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M104 52 v-5 a6 6 0 0 1 12 0 v5" {...stroke} strokeWidth={1.2} />
      </g>
      <text x="110" y="30" textAnchor="middle" {...monoText}>
        mạng nối mạng — hầm dựng sẵn
      </text>
    </Frame>
  )
}

/** Client VPN: một người đào hầm riêng từ quán về mạng công ty. */
function VpnClientHam({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="22" y="52" width="30" height="20" rx="2" {...stroke} strokeWidth={1.5} />
        <path d="M16 76 h42" {...stroke} strokeWidth={1.5} />
        <text x="37" y="92" textAnchor="middle" {...monoText}>một người</text>
        <rect x="158" y="42" width="46" height="40" rx="4" {...stroke} strokeWidth={1.2} />
        <text x="181" y="96" textAnchor="middle" {...monoText}>mạng công ty</text>
      </g>
      <g className="text-accent">
        <path d="M58 56 C90 40 130 40 158 52" {...stroke} strokeWidth={1.5} />
        <path d="M58 70 C90 86 130 86 158 74" {...stroke} strokeWidth={1.5} />
        <circle cx="108" cy="63" r="9" {...stroke} strokeWidth={1.5} />
        <path d="M108 60 v4 M108 64 l3 3" {...stroke} strokeWidth={1.2} />
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        cài phần mềm, bật khi cần
      </text>
    </Frame>
  )
}

/** Mô hình vành đai: lâu đài một cổng, bên trong tin nhau. */
function VanhDaiLauDai({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M40 96 q14 -8 35 0 q21 8 35 0 q21 -8 35 0 q21 8 35 0" {...stroke} strokeWidth={1} />
        <path d="M56 82 V40 h12 v8 h12 v-8 h12 v8 h12 v-8 h12 v8 h12 v-8 h12 v8 h12 v-8 h12 v42 z" {...stroke} strokeWidth={1.5} />
        <circle cx="86" cy="66" r="5" {...stroke} strokeWidth={1.2} />
        <circle cx="112" cy="60" r="5" {...stroke} strokeWidth={1.2} />
        <circle cx="138" cy="68" r="5" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-warn">
        <path d="M104 82 v-16 h12 v16" {...stroke} strokeWidth={1.5} />
        <text x="110" y="30" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          kiểm đúng một lần ở cổng
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        lọt vào rồi thì đi ngang tự do
      </text>
    </Frame>
  )
}

/** Zero Trust: bỏ tường thành, trạm kiểm ở từng cánh cửa. */
function ZeroTrustMoiCua({ title }: { title?: string }) {
  const doors = [40, 96, 152]
  return (
    <Frame title={title}>
      {doors.map((x) => (
        <g key={x}>
          <g className="text-ink-muted">
            <path d={`M${x} 84 V40 a6 6 0 0 1 6 -6 h16 a6 6 0 0 1 6 6 v44`} {...stroke} strokeWidth={1.2} />
          </g>
          <g className="text-accent">
            <circle cx={x + 14} cy="58" r="7" {...stroke} strokeWidth={1.5} />
            <path d={`M${x + 11} 58 l2 2 4 -4`} {...stroke} strokeWidth={1.2} />
          </g>
        </g>
      ))}
      <path d="M24 84 h172" className="text-ink-muted" {...stroke} strokeWidth={1.2} />
      <text x="110" y="104" textAnchor="middle" {...monoText}>
        xác minh mọi truy cập, mỗi lần
      </text>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        danh tính là biên giới mới
      </text>
    </Frame>
  )
}

/** Entra ID hybrid: sổ trong nhà và sổ trên mây tự chép cho nhau. */
function EntraHaiSo({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <circle cx="110" cy="26" r="8" {...stroke} strokeWidth={1.5} />
        <path d="M98 46 a12 12 0 0 1 24 0" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-ink-muted">
        <rect x="30" y="56" width="52" height="40" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M40 56 v40" {...stroke} strokeWidth={1.2} />
        <path d="M48 68 h26 M48 78 h26 M48 88 h16" {...stroke} strokeWidth={1.2} />
        <text x="56" y="110" textAnchor="middle" {...monoText}>AD (nhà)</text>
      </g>
      <g className="text-accent">
        <rect x="138" y="56" width="52" height="40" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M148 56 v40" {...stroke} strokeWidth={1.2} />
        <path d="M156 68 h26 M156 78 h26 M156 88 h16" {...stroke} strokeWidth={1.2} />
        <text x="164" y="110" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          Entra (mây)
        </text>
      </g>
      <g className="text-ink-muted">
        <path d="M86 70 H134" {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
        <path d="M134 84 H86" {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
      </g>
      <text x="110" y="124" textAnchor="middle" {...monoText}>
        một danh tính, hai thế giới
      </text>
    </Frame>
  )
}

// --- Module 11 — Phòng khám mạng (troubleshooting) --------------------

/** Khám theo tầng (bottom-up): cầu thang 4 bậc, đi từ dây cắm lên dịch vụ. */
function KhamTheoTang({ title }: { title?: string }) {
  const steps = [
    { x: 30, y: 96, label: 'dây' },
    { x: 72, y: 78, label: 'IP' },
    { x: 114, y: 60, label: 'đường đi' },
    { x: 156, y: 42, label: 'dịch vụ' },
  ]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {steps.map((s) => (
          <path key={s.x} d={`M${s.x} ${s.y + 14} h38 v-14 h-38 z`} {...stroke} strokeWidth={1.5} />
        ))}
      </g>
      {steps.map((s) => (
        <text key={s.x} x={s.x + 19} y={s.y + 10} textAnchor="middle" {...monoText}>
          {s.label}
        </text>
      ))}
      <g className="text-accent">
        <path d="M36 118 C80 112 140 84 172 36" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
      </g>
      <text x="110" y="126" textAnchor="middle" {...monoText}>
        khám từ bậc thấp nhất lên
      </text>
    </Frame>
  )
}

/** ipconfig + ping: tờ giấy tùy thân của máy, rồi bắt mạch đường truyền. */
function IpconfigPing({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="22" y="26" width="72" height="66" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M30 40 h44 M30 54 h56 M30 68 h50" {...stroke} strokeWidth={1.2} />
      </g>
      <text x="58" y="106" textAnchor="middle" {...monoText}>ipconfig</text>
      <g className="text-ink-muted">
        <rect x="120" y="40" width="24" height="18" rx="2" {...stroke} strokeWidth={1.5} />
        <rect x="176" y="40" width="24" height="18" rx="2" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-accent">
        <path d="M148 44 h24" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M172 54 h-24" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
      </g>
      <text x="160" y="76" textAnchor="middle" {...monoText}>ping — ai trả lời?</text>
      <text x="160" y="106" textAnchor="middle" {...monoText}>bắt mạch</text>
    </Frame>
  )
}

/** tracert: gọi tên từng trạm trên đường — trạm im lặng là chỗ nghẽn. */
function TracertChang({ title }: { title?: string }) {
  const stops = [36, 88, 140, 192]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M36 58 H186" {...stroke} strokeWidth={1.2} />
        {stops.map((x, i) => (
          <circle key={x} cx={x} cy="58" r={i === 0 || i === stops.length - 1 ? 8 : 10} {...stroke} strokeWidth={1.5} />
        ))}
      </g>
      <g className="text-accent">
        <text x="88" y="36" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          1 · &lt;1ms
        </text>
      </g>
      <g className="text-warn">
        <text x="140" y="36" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          2 · * * *
        </text>
      </g>
      <text x="110" y="96" textAnchor="middle" {...monoText}>
        nghẽn nằm sau trạm cuối còn đáp
      </text>
    </Frame>
  )
}

/** Tách tên khỏi số: ping IP sống mà ping tên chết → bệnh nằm ở cuốn danh bạ. */
function TachTenSo({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <text x="58" y="34" textAnchor="middle" {...monoText}>ping 192.168.20.80</text>
        <text x="58" y="50" textAnchor="middle" fontSize="10" fill="var(--ok)" style={{ fontFamily: 'var(--font-mono)' }}>
          Reply ✓
        </text>
        <text x="58" y="76" textAnchor="middle" {...monoText}>ping web.noibo.vn</text>
        <text x="58" y="92" textAnchor="middle" fontSize="10" fill="var(--warn)" style={{ fontFamily: 'var(--font-mono)' }}>
          không thấy tên
        </text>
      </g>
      <g className="text-accent">
        <path d="M104 62 h34" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <rect x="146" y="38" width="52" height="48" rx="3" {...stroke} />
        <path d="M156 50 h32 M156 60 h32 M156 70 h22" {...stroke} strokeWidth={1.2} />
      </g>
      <text x="172" y="102" textAnchor="middle" {...monoText}>bệnh ở danh bạ</text>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        số sống + tên chết = bệnh ở DNS
      </text>
    </Frame>
  )
}

/** Trùng IP: hai máy giành một biển số — bảng ARP đổi chủ giữa hai lượt ping. */
function ArpDoiChu({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="26" y="30" width="26" height="20" rx="2" {...stroke} strokeWidth={1.5} />
        <rect x="26" y="72" width="26" height="20" rx="2" {...stroke} strokeWidth={1.5} />
        <path d="M52 40 84 56 M52 82 84 66" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-warn">
        <rect x="66" y="50" width="56" height="20" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="94" y="64" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          .20.21
        </text>
      </g>
      <g className="text-accent">
        <text x="166" y="40" textAnchor="middle" {...monoText}>arp -a</text>
        <text x="166" y="58" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          lượt 1: …:20
        </text>
        <text x="166" y="74" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          lượt 2: …:21
        </text>
      </g>
      <text x="110" y="114" textAnchor="middle" {...monoText}>
        cùng IP, MAC đổi — hai chủ một nhà
      </text>
    </Frame>
  )
}

/** Manh mối tại chỗ: mạng phía sau vẫn sống, gói bị chặn ngay tại cửa máy. */
function ManhMoiTaiCho({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="26" y="46" width="34" height="26" rx="2" {...stroke} strokeWidth={1.5} />
        <path d="M96 59 H140" {...stroke} strokeWidth={1.2} />
        <rect x="140" y="46" width="34" height="26" rx="2" {...stroke} strokeWidth={1.5} />
        <text x="157" y="88" textAnchor="middle" {...monoText}>mạng vẫn sống</text>
      </g>
      <g className="text-warn">
        <path d="M78 42 v10 c0 10 -6 16 -6 16 s-6 -6 -6 -16 v-10 l6 -4 z" {...stroke} strokeWidth={1.5} />
        <path d="M66 74 78 42" {...stroke} strokeWidth={0} />
        <text x="72" y="32" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          luật chặn tại máy
        </text>
      </g>
      <g className="text-accent">
        <text x="110" y="108" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          gpresult · netstat · capture
        </text>
      </g>
      <text x="110" y="124" textAnchor="middle" {...monoText}>
        ping chết, web chạy — soi tại máy
      </text>
    </Frame>
  )
}

// --- Module 12 — PowerShell cho người quản trị mạng -------------------

/** Tên cmdlet = hai mảnh ghép: động từ dán vào danh từ. */
function CmdletVerbNoun({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="24" y="36" width="60" height="30" rx="4" {...stroke} strokeWidth={1.5} />
        <text x="54" y="56" textAnchor="middle" fontSize="12" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          Get
        </text>
      </g>
      <g className="text-ink-muted">
        <path d="M88 51 h12" {...stroke} strokeWidth={1.5} />
        <rect x="104" y="36" width="92" height="30" rx="4" {...stroke} strokeWidth={1.5} />
        <text x="150" y="56" textAnchor="middle" fontSize="12" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          NetIPAddress
        </text>
      </g>
      <text x="54" y="84" textAnchor="middle" {...monoText}>động từ</text>
      <text x="150" y="84" textAnchor="middle" {...monoText}>danh từ</text>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        đoán được tên lệnh
      </text>
    </Frame>
  )
}

/** Hai cmdlet mạng: một làn hỏi máy còn sống, một làn gõ đúng cánh cửa. */
function NetCmdlets({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="18" y="34" width="30" height="56" rx="3" {...stroke} strokeWidth={1.5} />
        <rect x="172" y="34" width="30" height="56" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M180 48 h14 M180 58 h14" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-ink-muted">
        <path d="M52 52 H168" {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
      </g>
      <text x="110" y="46" textAnchor="middle" {...monoText}>ping</text>
      <g className="text-accent">
        <path d="M52 78 H168" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="72" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          -Port 443
        </text>
      </g>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        máy sống? · cửa mở?
      </text>
    </Frame>
  )
}

/** Tham số = cái nhãn dán vào giá trị. */
function NamedParams({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <path d="M34 40 H92 L104 56 92 72 H34 Z" {...stroke} strokeWidth={1.5} />
        <text x="63" y="60" textAnchor="middle" fontSize="11" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          -Port
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="120" y="40" width="60" height="32" rx="4" {...stroke} strokeWidth={1.5} />
        <text x="150" y="61" textAnchor="middle" fontSize="12" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          443
        </text>
      </g>
      <text x="110" y="94" textAnchor="middle" {...monoText}>nhãn + giá trị</text>
      <text x="110" y="114" textAnchor="middle" {...monoText}>
        có dấu cách thì bọc nháy
      </text>
    </Frame>
  )
}

/** Get-Help: cuốn sổ tay mở sẵn ở trang SYNTAX. */
function HelpManual({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M14 30 H92 V96 H14 Z" {...stroke} strokeWidth={1.5} />
        <path d="M22 44 h58 M22 58 h58 M22 72 h44" {...stroke} strokeWidth={1.2} />
        <path d="M92 30 H206 V96 H92" {...stroke} strokeWidth={1.5} />
        <path d="M92 26 v74" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-accent">
        <text x="100" y="48" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          SYNTAX
        </text>
      </g>
      <text x="100" y="66" {...monoText}>[-Port &lt;Int32&gt;]</text>
      <text x="100" y="84" {...monoText}>[ ] = tùy chọn</text>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        sổ tay nằm trong máy
      </text>
    </Frame>
  )
}

/** Get-ADUser: soi vào đúng một ngăn kéo của tủ hồ sơ. */
function AdDirectoryQuery({ title }: { title?: string }) {
  // Ngăn giữa vẽ riêng ở lớp nhấn — để nó ngoài danh sách này, nếu không
  // tay nắm màu mờ sẽ gạch ngang chữ OU=KeToan.
  const drawers = [30, 82]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="46" y="24" width="104" height="82" rx="4" {...stroke} strokeWidth={1.5} />
        {drawers.map((y) => (
          <g key={y}>
            <rect x="54" y={y} width="88" height="20" rx="2" {...stroke} strokeWidth={1.2} />
            <path d={`M90 ${y + 10} h16`} {...stroke} strokeWidth={1.2} />
          </g>
        ))}
      </g>
      <g className="text-accent">
        <rect x="54" y="56" width="88" height="20" rx="2" {...stroke} strokeWidth={1.5} />
        <text x="98" y="70" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          OU=KeToan
        </text>
        <circle cx="172" cy="58" r="11" {...stroke} strokeWidth={1.5} />
        <path d="M180 66 188 76" {...stroke} strokeWidth={1.5} />
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        -Identity · -Filter * · -SearchBase
      </text>
    </Frame>
  )
}

/** New-ADUser: một phiếu người mới được xếp vào đúng ngăn kéo. */
function NewUserDn({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="34" width="56" height="46" rx="4" {...stroke} strokeWidth={1.5} />
        <circle cx="38" cy="50" r="7" {...stroke} strokeWidth={1.2} />
        <path d="M28 70 c0 -8 20 -8 20 0" {...stroke} strokeWidth={1.2} />
        <path d="M56 60 h14" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-accent">
        <path d="M82 57 h22" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <rect x="110" y="34" width="94" height="46" rx="4" {...stroke} strokeWidth={1.5} />
        <text x="157" y="54" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          OU=KeToan
        </text>
        <text x="157" y="70" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DC=noibo,DC=vn
        </text>
      </g>
      <text x="110" y="104" textAnchor="middle" {...monoText}>
        -Name -SamAccountName -Path
      </text>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        thiếu -Path thì không biết cất đâu
      </text>
    </Frame>
  )
}

/** Dấu ống: danh sách đổ vào một đầu, tài khoản mọc ra đầu kia. */
function PipelineFlow({ title }: { title?: string }) {
  const rows = [34, 50, 66]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {rows.map((y) => (
          <rect key={y} x="18" y={y} width="50" height="12" rx="2" {...stroke} strokeWidth={1.2} />
        ))}
        <text x="43" y="94" textAnchor="middle" {...monoText}>CSV</text>
      </g>
      <g className="text-accent">
        <path d="M74 40 H146 M74 72 H146" {...stroke} strokeWidth={1.5} />
        <path d="M84 56 h52" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="30" textAnchor="middle" fontSize="12" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          |
        </text>
      </g>
      <g className="text-ink-muted">
        {[42, 60, 78].map((y) => (
          <g key={y}>
            <circle cx="164" cy={y} r="5" {...stroke} strokeWidth={1.2} />
            <path d={`M172 ${y} h22`} {...stroke} strokeWidth={1.2} />
          </g>
        ))}
        <text x="176" y="94" textAnchor="middle" {...monoText}>user</text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        một dòng, cả danh sách
      </text>
    </Frame>
  )
}

/** Get-Content | Select-String: đổ cả file qua phễu, giữ đúng dòng cần. */
function LogFilter({ title }: { title?: string }) {
  const lines = [30, 42, 54, 66, 78, 90]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {lines.map((y) => (
          <path key={y} d={`M20 ${y} h64`} {...stroke} strokeWidth={1.2} />
        ))}
      </g>
      <g className="text-accent">
        <path d="M96 30 H160 L134 62 V88 L122 94 V62 Z" {...stroke} strokeWidth={1.5} />
        <text x="128" y="48" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          ERROR
        </text>
        <path d="M164 68 h34" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        đọc cả file rồi lọc lấy một dòng
      </text>
    </Frame>
  )
}

/** Hình thư chung cho visualId chưa có hình riêng. */
function GenericMail({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="70" y="42" width="80" height="52" rx="4" {...stroke} />
        <path d="M70 47 110 76 150 47" {...stroke} />
      </g>
      <g className="text-ink-muted">
        <path d="M40 68 H62 M158 68 H180" {...stroke} strokeDasharray="4 4" />
      </g>
    </Frame>
  )
}

type VisualComponent = (props: { title?: string }) => ReactNode

// visualId của nội dung → hình. Hook của mỗi bài dùng lại hình của khái
// niệm chính (cùng một hình cho một khái niệm ở mọi nơi — spec 4.2).
// ---------------------------------------------------------------
// Module 13 — VLSM: cắt đất cho đúng người
// ---------------------------------------------------------------

/** Cắt đều nhau: lô to thì thiếu chỗ, lô nhỏ thì bỏ hoang. */
function EvenSplitWaste({ title }: { title?: string }) {
  const cells = [0, 1, 2, 3]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {cells.map((i) => (
          <rect key={i} x={18 + i * 48} y="34" width="44" height="34" rx="3" {...stroke} strokeWidth={1.2} />
        ))}
        <text x="88" y="55" textAnchor="middle" {...monoText}>/26</text>
        <text x="136" y="55" textAnchor="middle" {...monoText}>/26</text>
        <text x="184" y="55" textAnchor="middle" {...monoText}>/26</text>
        <text x="184" y="82" textAnchor="middle" {...monoText}>10 máy</text>
      </g>
      <g className="text-warn">
        <rect x="18" y="34" width="44" height="34" rx="3" {...stroke} strokeWidth={2} />
        <text x="40" y="55" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          /26
        </text>
        <text x="40" y="82" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          100 máy
        </text>
      </g>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        vừa thiếu chỗ, vừa bỏ hoang
      </text>
    </Frame>
  )
}

/** VLSM: mỗi phòng một cỡ lô, cắt vừa người ở. */
function VlsmBlocks({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="18" y="34" width="96" height="34" rx="3" {...stroke} strokeWidth={2} />
        <text x="66" y="55" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          /25
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="118" y="34" width="48" height="34" rx="3" {...stroke} strokeWidth={1.5} />
        <rect x="170" y="34" width="24" height="34" rx="3" {...stroke} strokeWidth={1.5} />
        <rect x="198" y="34" width="12" height="34" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="142" y="55" textAnchor="middle" {...monoText}>/26</text>
        <text x="182" y="55" textAnchor="middle" {...monoText}>/27</text>
        {/* Khối 12px quá hẹp để chứa chữ — nhãn đặt phía trên. Thiếu nó thì
            4 nhu cầu chỉ ráp được 3 cặp, hụt đúng mắt xích cuối (biên bản). */}
        <text x="204" y="28" textAnchor="middle" {...monoText}>/28</text>
      </g>
      <text x="110" y="86" textAnchor="middle" {...monoText}>
        100 · 50 · 25 · 10 máy
      </text>
      <text x="110" y="110" textAnchor="middle" {...monoText}>
        mỗi phòng một cỡ lô
      </text>
    </Frame>
  )
}

/** Cỡ khối vừa đủ: bậc thang lũy thừa 2, trừ 2 địa chỉ đầu cuối. */
function BlockSizeLadder({ title }: { title?: string }) {
  const steps = [
    { p: '/28', label: '16-2=14', w: 26 },
    { p: '/27', label: '32-2=30', w: 46 },
    { p: '/26', label: '64-2=62', w: 66 },
    { p: '/25', label: '128-2=126', w: 86 },
  ]
  return (
    <Frame title={title}>
      {steps.map((s, i) => (
        <g key={s.p} className={i === 2 ? 'text-accent' : 'text-ink-muted'}>
          <rect x="52" y={22 + i * 20} width={s.w} height="14" rx="2" {...stroke} strokeWidth={i === 2 ? 2 : 1.2} />
          <text x="46" y={33 + i * 20} textAnchor="end" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {s.p}
          </text>
          <text x={58 + s.w} y={33 + i * 20} fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {s.label}
          </text>
        </g>
      ))}
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        bậc thấp nhất còn chứa đủ
      </text>
    </Frame>
  )
}

/** Cắt lớn trước: xếp nhu cầu giảm dần rồi lấp từ đầu dải. */
function BiggestFirst({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <text x="24" y="30" {...monoText}>50</text>
        <text x="60" y="30" {...monoText}>10</text>
        <text x="96" y="30" {...monoText}>100</text>
        <text x="140" y="30" {...monoText}>25</text>
      </g>
      <g className="text-accent">
        <path d="M110 38 v12" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="24" y="70" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          100
        </text>
        <text x="68" y="70" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          50
        </text>
        <text x="104" y="70" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          25
        </text>
        <text x="140" y="70" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          10
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="18" y="80" width="88" height="16" rx="2" {...stroke} strokeWidth={1.5} />
        <rect x="108" y="80" width="44" height="16" rx="2" {...stroke} strokeWidth={1.2} />
        <rect x="154" y="80" width="22" height="16" rx="2" {...stroke} strokeWidth={1.2} />
        <rect x="178" y="80" width="12" height="16" rx="2" {...stroke} strokeWidth={1.2} />
      </g>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        to trước, nhỏ sau
      </text>
    </Frame>
  )
}

/** Căn khối: khối chỉ được bắt đầu ở vạch chia hết cho cỡ của nó. */
function BlockAlign({ title }: { title?: string }) {
  const ticks = [0, 1, 2, 3, 4]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M20 60 H200" {...stroke} strokeWidth={1.2} />
        {ticks.map((i) => (
          <g key={i}>
            <path d={`M${20 + i * 45} 54 v12`} {...stroke} strokeWidth={1.2} />
            <text x={20 + i * 45} y="80" textAnchor="middle" {...monoText}>
              {i * 64}
            </text>
          </g>
        ))}
      </g>
      <g className="text-accent">
        <rect x="110" y="38" width="45" height="14" rx="2" {...stroke} strokeWidth={2} />
        <text x="132" y="32" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          /26 đúng vạch
        </text>
      </g>
      <g className="text-warn">
        <rect x="88" y="90" width="45" height="14" rx="2" {...stroke} strokeWidth={2} />
        <text x="110" y="118" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          bắt đầu ở 96 — lệch vạch
        </text>
      </g>
    </Frame>
  )
}

/** Wildcard mask: mặt nạ lộn ngược — 0 là phải khớp, 1 là mặc kệ. */
function WildcardMask({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <text x="24" y="26" {...monoText}>subnet mask</text>
        <rect x="24" y="32" width="172" height="24" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="110" y="48" textAnchor="middle" {...monoText}>
          255.255.255.192
        </text>
      </g>
      <g className="text-accent">
        <path d="M110 58 v14" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <rect x="24" y="76" width="172" height="24" rx="3" {...stroke} strokeWidth={2} />
        <text x="110" y="92" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          0.0.0.63
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        255 trừ đi từng ô
      </text>
    </Frame>
  )
}

/** Tóm tắt tuyến: bốn dòng tuyến gộp thành một. */
function RouteSummary({ title }: { title?: string }) {
  const rows = [8, 9, 10, 11]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {rows.map((n, i) => (
          <g key={n}>
            <rect x="14" y={24 + i * 20} width="86" height="14" rx="2" {...stroke} strokeWidth={1.2} />
            <text x="57" y={35 + i * 20} textAnchor="middle" {...monoText}>
              {`192.168.${n}.0/24`}
            </text>
          </g>
        ))}
      </g>
      <g className="text-accent">
        <path d="M104 61 h14" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <rect x="124" y="50" width="90" height="22" rx="3" {...stroke} strokeWidth={2} />
        <text x="169" y="65" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          192.168.8.0/22
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        bốn dòng thành một dòng
      </text>
    </Frame>
  )
}

// ---------------------------------------------------------------
// Module 14 — Trunk 802.1Q
// ---------------------------------------------------------------

/** Bốn xóm bốn sợi dây (cũ) so với bốn xóm một sợi trunk (mới). */
function TrunkOneCable({ title }: { title?: string }) {
  const lanes = [30, 42, 54, 66]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="14" y="24" width="20" height="52" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="82" y="24" width="20" height="52" rx="3" {...stroke} strokeWidth={1.2} />
        {lanes.map((y) => (
          <path key={y} d={`M36 ${y} H80`} {...stroke} strokeWidth={1.2} />
        ))}
        <text x="58" y="92" textAnchor="middle" {...monoText}>4 dây</text>
      </g>
      <g className="text-accent">
        <rect x="130" y="24" width="20" height="52" rx="3" {...stroke} strokeWidth={1.5} />
        <rect x="192" y="24" width="20" height="52" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M152 50 H190" {...stroke} strokeWidth={2.5} />
        <text x="171" y="92" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          1 trunk
        </text>
      </g>
      <text x="110" y="114" textAnchor="middle" {...monoText}>
        cùng chở 4 xóm
      </text>
    </Frame>
  )
}

/** Khung mang nhãn trên trunk, gỡ nhãn khi xuống cổng access. */
function TaggedFrame({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="44" width="46" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="39" y="58" textAnchor="middle" {...monoText}>khung</text>
        <text x="39" y="80" textAnchor="middle" {...monoText}>access</text>
      </g>
      <g className="text-accent">
        <path d="M66 54 h12" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <rect x="84" y="44" width="20" height="20" rx="3" {...stroke} strokeWidth={2} />
        <text x="94" y="58" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          20
        </text>
        <rect x="104" y="44" width="46" height="20" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="117" y="80" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          trunk: có nhãn
        </text>
      </g>
      <g className="text-ink-muted">
        <path d="M154 54 h12" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <rect x="170" y="44" width="40" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="190" y="80" textAnchor="middle" {...monoText}>gỡ nhãn</text>
      </g>
      <text x="110" y="106" textAnchor="middle" {...monoText}>
        máy người dùng không thấy nhãn
      </text>
    </Frame>
  )
}

/** Native VLAN lệch: khung trần đi từ xóm 1 sang tới nơi hóa xóm 99. */
function NativeVlanMismatch({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="14" y="34" width="26" height="44" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="180" y="34" width="26" height="44" rx="3" {...stroke} strokeWidth={1.2} />
        <path d="M42 56 H178" {...stroke} strokeWidth={1.2} />
        <text x="27" y="94" textAnchor="middle" {...monoText}>SW-1</text>
        <text x="193" y="94" textAnchor="middle" {...monoText}>SW-2</text>
      </g>
      <text x="60" y="30" textAnchor="middle" {...monoText}>native 1</text>
      <g className="text-warn">
        <text x="160" y="30" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          native 99
        </text>
        <rect x="92" y="46" width="36" height="18" rx="3" {...stroke} strokeWidth={2} />
        <text x="110" y="59" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          trần
        </text>
      </g>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        vào xóm 1, ra thành xóm 99
      </text>
    </Frame>
  )
}

/** Allowed list: danh sách khách ở cổng, thiếu tên là bị chặn. */
function AllowedVlanList({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="26" width="70" height="72" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="51" y="40" textAnchor="middle" {...monoText}>allowed</text>
        <text x="51" y="58" textAnchor="middle" {...monoText}>10</text>
      </g>
      <g className="text-warn">
        <text x="51" y="78" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          20 ?
        </text>
      </g>
      <g className="text-accent">
        <path d="M92 46 H190" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="140" y="40" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          VLAN 10 qua
        </text>
      </g>
      <g className="text-warn">
        <path d="M92 76 H150" {...stroke} strokeWidth={1.5} />
        <path d="M154 70 l12 12 M166 70 l-12 12" {...stroke} strokeWidth={2} />
        <text x="140" y="98" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          VLAN 20 bị chặn
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        thiếu tên là đứng ngoài cổng
      </text>
    </Frame>
  )
}

/** Router-on-a-stick: một chân, nhiều cửa logic. */
function RouterOnAStick({ title }: { title?: string }) {
  const doors = [34, 52, 70]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="30" width="26" height="60" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="29" y="106" textAnchor="middle" {...monoText}>switch</text>
      </g>
      <g className="text-accent">
        <path d="M44 60 H120" {...stroke} strokeWidth={2.5} />
        <text x="82" y="52" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          trunk
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="122" y="24" width="80" height="72" rx="4" {...stroke} strokeWidth={1.5} />
        {doors.map((y, i) => (
          <g key={y}>
            <rect x="150" y={y - 6} width="44" height="14" rx="2" {...stroke} strokeWidth={1.2} />
            <text x="172" y={y + 4} textAnchor="middle" {...monoText}>
              {`vlan ${[10, 20, 30][i]}`}
            </text>
          </g>
        ))}
        <text x="162" y="106" textAnchor="middle" {...monoText}>router</text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        một chân, nhiều cửa logic
      </text>
    </Frame>
  )
}

// ---------------------------------------------------------------
// Module 15 — STP: người canh vòng lặp
// ---------------------------------------------------------------

/** Bão quảng bá: khung quay vòng và nhân lên trong tam giác switch. */
function BroadcastStorm({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="94" y="18" width="32" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="30" y="78" width="32" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="158" y="78" width="32" height="20" rx="3" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-warn">
        <path d="M96 38 L60 76" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <path d="M64 92 H154" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <path d="M172 76 L126 38" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <text x="110" y="60" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          x2 · x4 · x8
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        khung quay vòng, không TTL để chết
      </text>
    </Frame>
  )
}

/** BPDU: tiếng điểm danh đều đặn giữa các switch. */
function BpduHello({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="46" width="34" height="24" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="166" y="46" width="34" height="24" rx="3" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-accent">
        <path d="M58 54 H162" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M162 66 H58" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <rect x="88" y="24" width="44" height="16" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="110" y="36" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          BPDU
        </text>
      </g>
      <text x="110" y="92" textAnchor="middle" {...monoText}>
        tôi là ai · tôi cách gốc bao xa
      </text>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        vài giây một lần
      </text>
    </Frame>
  )
}

/** Bầu root: priority nhỏ hơn thắng, hòa thì MAC nhỏ hơn. */
function RootBridgeElection({ title }: { title?: string }) {
  const boxes = [
    { x: 16, prio: '32768', root: false },
    { x: 88, prio: '4096', root: true },
    { x: 160, prio: '32768', root: false },
  ]
  return (
    <Frame title={title}>
      {boxes.map((b) => (
        <g key={b.x} className={b.root ? 'text-accent' : 'text-ink-muted'}>
          <rect x={b.x} y="44" width="44" height="26" rx="3" {...stroke} strokeWidth={b.root ? 2 : 1.2} />
          <text x={b.x + 22} y="61" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {b.prio}
          </text>
        </g>
      ))}
      <g className="text-accent">
        <path d="M110 34 v6" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="28" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          gốc cây
        </text>
      </g>
      <text x="110" y="92" textAnchor="middle" {...monoText}>
        nhỏ hơn là thắng
      </text>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        hòa priority thì so MAC
      </text>
    </Frame>
  )
}

/** Cổng bị chặn: rỗng ruột viền hổ phách, vẫn nghe BPDU. */
function BlockedPort({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="40" width="34" height="24" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="166" y="40" width="34" height="24" rx="3" {...stroke} strokeWidth={1.2} />
        <path d="M58 52 H162" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-warn">
        <circle cx="150" cy="52" r="7" {...stroke} strokeWidth={2} />
        <text x="150" y="80" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          BLK · Altn
        </text>
      </g>
      <text x="110" y="100" textAnchor="middle" {...monoText}>
        không phát khung dữ liệu
      </text>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        nhưng vẫn nghe BPDU
      </text>
    </Frame>
  )
}


/** PortFast: cổng máy con vào việc ngay, cổng nối switch thì không. */
function PortFast({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="18" y="30" width="30" height="20" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M52 40 H104" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <text x="78" y="26" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          máy con: ngay
        </text>
      </g>
      <g className="text-warn">
        <rect x="18" y="76" width="30" height="20" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M52 86 H96" {...stroke} strokeWidth={2} />
        <path d="M100 80 l12 12 M112 80 l-12 12" {...stroke} strokeWidth={2} />
        <text x="86" y="112" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          switch: cấm bật
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="150" y="30" width="52" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="176" y="44" textAnchor="middle" {...monoText}>PortFast</text>
        <rect x="150" y="76" width="52" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="176" y="90" textAnchor="middle" {...monoText}>vòng lặp</text>
      </g>
    </Frame>
  )
}

// ---------------------------------------------------------------
// Module 16 — OSPF: các router tự hỏi đường nhau
// ---------------------------------------------------------------

/** Tuyến tĩnh: số dòng phải gõ tay phình theo số router. */
function StaticRouteLimit({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {[18, 68, 118, 168].map((x) => (
          <rect key={x} x={x} y="20" width="34" height="18" rx="3" {...stroke} strokeWidth={1.2} />
        ))}
      </g>
      <g className="text-warn">
        {[18, 68, 118, 168].map((x) => (
          <g key={x}>
            <path d={`M${x + 4} 50 h26 M${x + 4} 58 h26 M${x + 4} 66 h26`} {...stroke} strokeWidth={1.5} />
          </g>
        ))}
        <text x="110" y="88" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          4 router x 3 dòng = 12 dòng gõ tay
        </text>
      </g>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        thêm một site: mở lại từng router
      </text>
    </Frame>
  )
}

/** Định tuyến động: mỗi router chỉ khai mạng của mình, rồi tự kể cho nhau. */
function DynamicRouting({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="44" width="36" height="22" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="92" y="44" width="36" height="22" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="164" y="44" width="36" height="22" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="38" y="82" textAnchor="middle" {...monoText}>LAN 1</text>
        <text x="110" y="82" textAnchor="middle" {...monoText}>LAN 2</text>
        <text x="182" y="82" textAnchor="middle" {...monoText}>LAN 3</text>
      </g>
      <g className="text-accent">
        <path d="M58 50 H90" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M90 60 H58" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M130 50 H162" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M162 60 H130" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="28" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          tự kể đường cho nhau
        </text>
      </g>
      <text x="110" y="108" textAnchor="middle" {...monoText}>
        mỗi nơi chỉ khai mạng của chính mình
      </text>
    </Frame>
  )
}

/** Gói hello: đi tìm hàng xóm rồi ở lại làm nhịp tim. */
function HelloPacket({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="40" width="34" height="24" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="170" y="40" width="34" height="24" rx="3" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-accent">
        <path d="M54 46 H166" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M166 58 H54" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <rect x="88" y="18" width="44" height="16" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="110" y="30" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          hello
        </text>
        <path d="M20 90 h30 l8 -12 8 24 8 -12 h26 l8 -12 8 24 8 -12 h30" {...stroke} strokeWidth={1.5} />
      </g>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        vừa tìm hàng xóm, vừa làm nhịp tim
      </text>
    </Frame>
  )
}

/** Tòa nhà làm quen: 4 tầng x 2 phòng, hai tầng dưới đang được đi xem. */
function NeighborLadder({ title }: { title?: string }) {
  const floors = [
    { y: 92, left: 'Down', right: 'Attempt', lit: true },
    { y: 70, left: 'Init', right: '2-Way', lit: true },
    { y: 48, left: 'ExStart', right: 'Exchange', lit: false },
    { y: 26, left: 'Loading', right: 'Full', lit: false },
  ]
  return (
    <Frame title={title}>
      {floors.map((f) => (
        <g key={f.y} className={f.lit ? 'text-accent' : 'text-ink-muted'}>
          <rect x="26" y={f.y} width="76" height="18" rx="2" {...stroke} strokeWidth={f.lit ? 1.8 : 1.2} />
          <rect x="110" y={f.y} width="76" height="18" rx="2" {...stroke} strokeWidth={f.lit ? 1.8 : 1.2} />
          <text x="64" y={f.y + 13} textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {f.left}
          </text>
          <text x="148" y={f.y + 13} textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {f.right}
          </text>
        </g>
      ))}
      <g className="text-ink-muted">
        <path d="M14 110 h192" {...stroke} strokeWidth={1.2} />
        <path d="M18 110 V22" {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        đi từ tầng trệt lên nóc
      </text>
    </Frame>
  )
}

/** Đồng bộ bản đồ: hai tấm chồng khít nhau là trạng thái Full. */
function LsdbSync({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="26" width="66" height="52" rx="3" {...stroke} strokeWidth={1.2} />
        <path d="M28 40 h50 M28 52 h50 M28 64 h34" {...stroke} strokeWidth={1.2} />
        <rect x="134" y="26" width="66" height="52" rx="3" {...stroke} strokeWidth={1.2} />
        <path d="M142 40 h50 M142 52 h50 M142 64 h34" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-accent">
        <path d="M90 40 H130" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M130 64 H90" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M100 96 l8 8 14 -18" {...stroke} strokeWidth={2} />
        <text x="110" y="122" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          Full: giống nhau từng dòng
        </text>
      </g>
    </Frame>
  )
}

/** Câu network: dải, wildcard, area 0 — ba mảnh của một dòng lệnh. */
function NetworkAreaZero({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <text x="110" y="32" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          network 192.168.2.0 0.0.0.255 area 0
        </text>
        <path d="M22 40 h176" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-ink-muted">
        <text x="110" y="60" textAnchor="middle" {...monoText}>192.168.2.0 = dải mạng</text>
        <text x="110" y="80" textAnchor="middle" {...monoText}>0.0.0.255 = wildcard đảo</text>
        <text x="110" y="100" textAnchor="middle" {...monoText}>area 0 = vùng xương sống</text>
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        chọn CỔNG nào tham gia OSPF
      </text>
    </Frame>
  )
}

/** Cost: hai lối tới cùng đích, lối rẻ hơn được chọn. */
function OspfCost({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="14" y="52" width="34" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="93" y="14" width="34" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="172" y="52" width="34" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <path d="M50 56 L91 30" {...stroke} strokeWidth={1.2} />
        <path d="M129 30 L170 56" {...stroke} strokeWidth={1.2} />
        <text x="110" y="48" textAnchor="middle" {...monoText}>vòng: cost 2</text>
      </g>
      <g className="text-accent">
        <path d="M50 66 H170" {...stroke} strokeWidth={2.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="90" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          thẳng: cost 1 — chọn lối này
        </text>
      </g>
      <text x="110" y="114" textAnchor="middle" {...monoText}>
        cost cộng dồn — bé nhất thắng
      </text>
    </Frame>
  )
}

/** Bảng định tuyến: chữ đầu dòng nói tuyến đó ở đâu ra. */
function LearnedRouteTable({ title }: { title?: string }) {
  const rows = [
    { y: 34, code: 'C', text: '192.168.1.0/24  nối trực tiếp' },
    { y: 58, code: 'S', text: '10.9.0.0/24     gõ tay [1/0]' },
    { y: 82, code: 'O', text: '192.168.3.0/24  OSPF [110/2]' },
  ]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="20" width="188" height="80" rx="4" {...stroke} strokeWidth={1.2} />
      </g>
      {rows.map((r) => (
        <g key={r.code} className={r.code === 'O' ? 'text-accent' : 'text-ink-muted'}>
          <text x="28" y={r.y} fontSize="12" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {r.code}
          </text>
          <text x="46" y={r.y} fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {r.text}
          </text>
        </g>
      ))}
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        show ip route
      </text>
    </Frame>
  )
}


/** Khoảng cách quản trị: số nhỏ hơn thì được tin hơn. */
function AdminDistance({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="18" y="30" width="80" height="30" rx="4" {...stroke} strokeWidth={2} />
        <text x="58" y="50" textAnchor="middle" fontSize="11" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          tĩnh: 1
        </text>
        <text x="58" y="76" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          được tin hơn
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="122" y="30" width="80" height="30" rx="4" {...stroke} strokeWidth={1.2} />
        <text x="162" y="50" textAnchor="middle" fontSize="11" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          OSPF: 110
        </text>
        <text x="110" y="100" textAnchor="middle" {...monoText}>
          số nhỏ hơn thì thắng
        </text>
        <text x="110" y="118" textAnchor="middle" {...monoText}>
          nhưng tuyến tĩnh chẳng tự sửa
        </text>
      </g>
    </Frame>
  )
}

/** Danh sách lọc dán lên MỘT cánh cửa: một luồng lọt, một luồng chết. */
function AclGate({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="86" y="18" width="48" height="94" rx="4" {...stroke} strokeWidth={1.2} />
        <path d="M94 34 h32 M94 46 h32 M94 58 h22" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-ok">
        <path d="M16 40 H82" {...stroke} strokeWidth={1.8} />
        <path d="M138 40 H204" {...stroke} strokeWidth={1.8} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-warn">
        <path d="M16 84 H82" {...stroke} strokeWidth={1.8} />
        <path d="M96 76 l16 16 M112 76 l-16 16" {...stroke} strokeWidth={2} />
      </g>
      <text x="110" y="126" textAnchor="middle" {...monoText}>
        luật dán lên một cổng, một chiều
      </text>
    </Frame>
  )
}

/** Đọc từ trên xuống, dừng ở dòng khớp đầu tiên. */
function RuleOrder({ title }: { title?: string }) {
  const rows = [
    { y: 24, label: '10 deny  host .66', hit: false },
    { y: 50, label: '20 permit 192.168.1.0', hit: true },
    { y: 76, label: '30 deny  any', hit: false },
  ]
  return (
    <Frame title={title}>
      {rows.map((r) => (
        <g key={r.y} className={r.hit ? 'text-accent' : 'text-ink-muted'}>
          <rect x="34" y={r.y} width="152" height="20" rx="3" {...stroke} strokeWidth={r.hit ? 1.8 : 1.2} />
          <text x="42" y={r.y + 14} fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {r.label}
          </text>
        </g>
      ))}
      <g className="text-accent">
        <path d="M22 24 V58" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M190 60 l8 8 12 -16" {...stroke} strokeWidth={2} />
      </g>
      <text x="110" y="110" textAnchor="middle" {...monoText}>
        khớp dòng 20 là dừng ở đó
      </text>
    </Frame>
  )
}

/** Dòng cấm cuối danh sách: có thật, nhưng không ai gõ và không ai thấy. */
function ImplicitDeny({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="30" y="20" width="160" height="20" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="38" y="34" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          10 deny icmp host .66 any
        </text>
      </g>
      <g className="text-warn">
        <rect x="30" y="52" width="160" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="5 4" />
        <text x="38" y="67" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          deny any any (vô hình)
        </text>
      </g>
      <text x="110" y="96" textAnchor="middle" {...monoText}>
        không ai gõ, không ai in ra
      </text>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        mà mọi gói lạc đều chết ở đó
      </text>
    </Frame>
  )
}

/** ACL chuẩn: chỉ soi được vế nguồn. */
function StandardAcl({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <text x="110" y="24" textAnchor="middle" fontSize="10" className="text-ink-muted" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
        access-list 1..99
      </text>
      <g className="text-accent">
        <rect x="20" y="40" width="80" height="34" rx="4" {...stroke} strokeWidth={1.8} />
        <text x="60" y="61" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          nguồn
        </text>
      </g>
      <g className="text-warn">
        <rect x="120" y="40" width="80" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
        <path d="M148 46 l24 22 M172 46 l-24 22" {...stroke} strokeWidth={1.6} />
        <text x="160" y="86" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          đích: không thấy
        </text>
      </g>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        cấm một nguồn là cấm đi mọi nơi
      </text>
    </Frame>
  )
}

/** ACL mở rộng: bốn vế nhìn được. */
function ExtendedAcl({ title }: { title?: string }) {
  const cells = [
    { x: 14, label: 'giao thức' },
    { x: 64, label: 'nguồn' },
    { x: 114, label: 'đích' },
    { x: 164, label: 'port' },
  ]
  return (
    <Frame title={title}>
      <text x="110" y="26" textAnchor="middle" fontSize="10" className="text-ink-muted" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
        access-list 100..199
      </text>
      {cells.map((c) => (
        <g key={c.x} className="text-accent">
          <rect x={c.x} y="42" width="42" height="34" rx="3" {...stroke} strokeWidth={1.6} />
          <text x={c.x + 21} y="63" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {c.label}
          </text>
        </g>
      ))}
      <text x="110" y="96" textAnchor="middle" {...monoText}>
        nói được: ai, tới đâu, bằng gì
      </text>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        (port chỉ có với tcp và udp)
      </text>
    </Frame>
  )
}

/** Chiều in và out tính theo con mắt của router. */
function InOutDirection({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="72" y="40" width="76" height="46" rx="6" {...stroke} strokeWidth={1.4} />
        <text x="110" y="68" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          router
        </text>
      </g>
      <g className="text-accent">
        <path d="M14 56 H68" {...stroke} strokeWidth={1.8} markerEnd="url(#cv-arrow)" />
        <text x="40" y="46" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          in
        </text>
      </g>
      <g className="text-ink-muted">
        <path d="M152 56 H206" {...stroke} strokeWidth={1.8} markerEnd="url(#cv-arrow)" />
        <text x="180" y="46" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          out
        </text>
      </g>
      <text x="110" y="106" textAnchor="middle" {...monoText}>
        in: vừa vào cổng, chưa tra đường
      </text>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        out: đã chọn đường, sắp rời cổng
      </text>
    </Frame>
  )
}

/** Đặt luật ở đâu: mở rộng sát nguồn, chuẩn sát đích. */
function PlacementRule({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="12" y="46" width="32" height="24" rx="3" {...stroke} strokeWidth={1.2} />
        <rect x="176" y="46" width="32" height="24" rx="3" {...stroke} strokeWidth={1.2} />
        <path d="M46 58 H174" {...stroke} strokeWidth={1.2} />
        <text x="28" y="84" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          nguồn
        </text>
        <text x="192" y="84" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          đích
        </text>
      </g>
      <g className="text-accent">
        <path d="M58 40 V76" {...stroke} strokeWidth={2.2} />
        <text x="58" y="32" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          mở rộng
        </text>
      </g>
      <g className="text-warn">
        <path d="M162 40 V76" {...stroke} strokeWidth={2.2} />
        <text x="162" y="32" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          chuẩn
        </text>
      </g>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        chặn gần nhất mà vẫn chặn ĐÚNG
      </text>
    </Frame>
  )
}

/** ACL không trí nhớ, tường lửa stateful có cuốn sổ. */
function StatelessVsStateful({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <path d="M110 14 V116" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-ink-muted" />
      <g className="text-warn">
        <text x="54" y="26" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          ACL
        </text>
        <path d="M18 46 H94" {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />
        <path d="M94 68 H18" {...stroke} strokeWidth={1.6} strokeDasharray="4 3" markerEnd="url(#cv-arrow)" />
        <text x="54" y="90" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          chiều về: tự lo
        </text>
      </g>
      <g className="text-ok">
        <text x="166" y="26" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          stateful
        </text>
        <path d="M126 46 H202" {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />
        <path d="M202 68 H126" {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />
        <rect x="146" y="76" width="40" height="16" rx="2" {...stroke} strokeWidth={1.2} />
        <text x="166" y="88" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          sổ ghi
        </text>
      </g>
      <text x="110" y="114" textAnchor="middle" {...monoText}>
        có sổ thì lời đáp tự được vào
      </text>
    </Frame>
  )
}

/** Nhồi bảng MAC: bảng đầy thì switch phát tràn mọi cổng. */
function MacFlood({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-warn">
        <rect x="16" y="18" width="86" height="60" rx="3" {...stroke} strokeWidth={1.4} />
        {[28, 40, 52, 64].map((y) => (
          <path key={y} d={`M24 ${y} h70`} {...stroke} strokeWidth={1.2} />
        ))}
        <text x="59" y="92" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          bảng MAC đầy
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="130" y="34" width="30" height="28" rx="3" {...stroke} strokeWidth={1.2} />
        <path d="M106 48 H126" {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <path d="M164 40 H204" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M164 48 H204" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M164 56 H204" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="182" y="80" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          phát tràn
        </text>
      </g>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        hết chỗ nhớ thì đọc to giữa sảnh
      </text>
    </Frame>
  )
}

/** Port security: quá số MAC cho phép thì cổng tự sập. */
function PortSecurity({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="86" y="20" width="48" height="40" rx="4" {...stroke} strokeWidth={1.4} />
        <path d="M98 20 V12 a12 12 0 0 1 24 0 V20" {...stroke} strokeWidth={1.4} />
        <text x="110" y="46" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          max 1
        </text>
      </g>
      <g className="text-ok">
        <rect x="16" y="70" width="34" height="22" rx="3" {...stroke} strokeWidth={1.4} />
        <path d="M52 80 H84" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-warn">
        <rect x="170" y="70" width="34" height="22" rx="3" {...stroke} strokeWidth={1.4} />
        <path d="M166 80 H138" {...stroke} strokeWidth={1.5} strokeDasharray="4 3" />
        <path d="M144 72 l14 16 M158 72 l-14 16" {...stroke} strokeWidth={1.8} />
      </g>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        máy thứ hai: cổng bị đánh sập
      </text>
      <text x="110" y="126" textAnchor="middle" {...monoText}>
        administratively down
      </text>
    </Frame>
  )
}

/** Mạo danh ARP: hai kẻ cùng nhận là cổng ra. */
function ArpSpoof({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="24" width="52" height="28" rx="3" {...stroke} strokeWidth={1.3} />
        <text x="46" y="42" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          router
        </text>
      </g>
      <g className="text-warn">
        <rect x="20" y="76" width="52" height="28" rx="3" {...stroke} strokeWidth={1.6} />
        <text x="46" y="94" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          máy lạ
        </text>
      </g>
      {/* Hộp nhận phải CÓ TÊN và câu ".1 là tôi" phải nằm TRÊN hai mũi tên
          đến (hai lời tự xưng, một thật một giả) — để trong hộp nhận thì
          đọc thành nạn nhân tự xưng, ngược vai đúng ở hình dạy giả danh
          (biên bản trung cấp). */}
      <g className="text-accent">
        <rect x="128" y="44" width="76" height="34" rx="4" {...stroke} strokeWidth={1.8} />
        <text x="166" y="58" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          sổ ARP
        </text>
        <text x="166" y="70" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          nạn nhân
        </text>
      </g>
      <path d="M76 38 L124 54" {...stroke} strokeWidth={1.3} className="text-ink-muted" markerEnd="url(#cv-arrow)" />
      <path d="M76 90 L124 70" {...stroke} strokeWidth={1.6} className="text-warn" markerEnd="url(#cv-arrow)" />
      <text x="100" y="32" textAnchor="middle" fontSize="8" className="text-ink-muted" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
        .1 là tôi
      </text>
      <text x="100" y="102" textAnchor="middle" fontSize="8" className="text-warn" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
        .1 là tôi
      </text>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        ai đáp sau thì sổ ARP nghe theo
      </text>
    </Frame>
  )
}

/** VLAN hopping: hai lớp nhãn, switch đầu bóc lớp ngoài. */
function VlanHopping({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-warn">
        <rect x="12" y="40" width="66" height="30" rx="3" {...stroke} strokeWidth={1.5} />
        <rect x="22" y="47" width="46" height="16" rx="2" {...stroke} strokeWidth={1.2} />
        <text x="45" y="86" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          hai lớp nhãn
        </text>
      </g>
      <g className="text-ink-muted">
        <path d="M82 55 H100" {...stroke} strokeWidth={1.3} markerEnd="url(#cv-arrow)" />
        <rect x="104" y="42" width="26" height="26" rx="3" {...stroke} strokeWidth={1.2} />
        <text x="117" y="34" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          bóc lớp ngoài
        </text>
        <path d="M134 55 H152" {...stroke} strokeWidth={1.3} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <rect x="156" y="42" width="50" height="26" rx="3" {...stroke} strokeWidth={1.6} />
        <text x="181" y="59" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          xóm khác
        </text>
      </g>
      <text x="110" y="106" textAnchor="middle" {...monoText}>
        sống nhờ native VLAN đi không nhãn
      </text>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        chặn: native là VLAN không ai dùng
      </text>
    </Frame>
  )
}

/** DORA hét trong xóm, router chặn — tiếng hét không qua ranh giới. */
function DoraBoundary({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="16" y="50" width="30" height="22" rx="3" {...stroke} strokeWidth={1.4} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${52 + i * 10} ${54 - i * 2} a${8 + i * 5} ${8 + i * 5} 0 0 1 0 ${14 + i * 4}`} {...stroke} strokeWidth={1.3} />
        ))}
        <text x="60" y="40" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DISCOVER
        </text>
      </g>
      <g className="text-warn">
        <rect x="104" y="42" width="34" height="38" rx="4" {...stroke} strokeWidth={1.6} />
        <text x="121" y="65" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          router
        </text>
        <path d="M96 46 l16 30 M112 46 l-16 30" {...stroke} strokeWidth={1.6} />
      </g>
      <g className="text-ink-muted">
        <rect x="168" y="50" width="36" height="22" rx="3" {...stroke} strokeWidth={1.3} />
        <text x="186" y="86" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DHCP xóm khác
        </text>
      </g>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        tiếng hét chết ở ranh giới router
      </text>
    </Frame>
  )
}

/** Relay: nghe hét trong xóm, ghi giaddr, gửi thư đích danh vượt router. */
function DhcpRelay({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="12" y="46" width="28" height="20" rx="3" {...stroke} strokeWidth={1.3} />
        <path d="M44 50 a8 8 0 0 1 0 12" {...stroke} strokeWidth={1.2} />
      </g>
      <g className="text-accent">
        <rect x="62" y="42" width="40" height="28" rx="3" {...stroke} strokeWidth={1.8} />
        <text x="82" y="60" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          relay
        </text>
        <rect x="70" y="80" width="52" height="16" rx="2" {...stroke} strokeWidth={1.4} />
        <text x="96" y="92" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          giaddr
        </text>
        <path d="M106 56 H160" {...stroke} strokeWidth={1.8} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-ink-muted">
        <rect x="132" y="44" width="14" height="24" rx="2" {...stroke} strokeWidth={1.2} />
        <rect x="164" y="42" width="40" height="28" rx="3" {...stroke} strokeWidth={1.4} />
        <text x="184" y="60" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DHCP
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        đổi tiếng hét thành thư đích danh
      </text>
    </Frame>
  )
}

/** Scope như bãi gửi xe: gần đầy — vạch cảnh báo 90%. */
function ScopeGauge({ title }: { title?: string }) {
  const slots = [...Array(10)].map((_, i) => i < 9)
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="40" width="180" height="30" rx="4" {...stroke} strokeWidth={1.3} />
      </g>
      {slots.map((filled, i) => (
        <rect
          key={i}
          x={26 + i * 17.4}
          y="46"
          width="13"
          height="18"
          rx="2"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.2"
          className={filled ? (i < 7 ? 'text-accent' : 'text-warn') : 'text-ink-muted'}
        />
      ))}
      <g className="text-warn">
        <path d="M182 34 V76" {...stroke} strokeWidth={1.4} strokeDasharray="4 3" />
        <text x="182" y="28" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          90%
        </text>
      </g>
      <text x="110" y="98" textAnchor="middle" {...monoText}>
        9/10 suất đã cho thuê — sắp cạn
      </text>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        mở dải / rút lease TRƯỚC khi cạn
      </text>
    </Frame>
  )
}

/** APIPA: xin không ai đáp, tự viết số lên tay. */
function ApipaSelf({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="36" width="34" height="24" rx="3" {...stroke} strokeWidth={1.4} />
        <path d="M58 44 H100" {...stroke} strokeWidth={1.3} strokeDasharray="4 3" markerEnd="url(#cv-arrow)" />
        <text x="79" y="36" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DISCOVER?
        </text>
        <text x="118" y="48" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          …
        </text>
      </g>
      <g className="text-warn">
        <rect x="24" y="76" width="110" height="20" rx="3" {...stroke} strokeWidth={1.6} />
        <text x="79" y="90" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          169.254.7.23
        </text>
      </g>
      <g className="text-ink-muted">
        <text x="168" y="82" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          gateway: —
        </text>
        <text x="168" y="94" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DNS: —
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        không ai đáp thì tự bịa số
      </text>
    </Frame>
  )
}

/** Failover: HAI lựa chọn tách bạch — chia kho 80/20, HOẶC bắt cặp chung sổ. */
function DhcpFailover({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      {/* Khung chia đôi như StatelessVsStateful: bài dạy either/or thì hình
          không được vẽ gộp hai lựa chọn vào một hệ — nối cả A 80% lẫn B 20%
          vào một cuốn sổ chung là xóa đúng ranh giới mà bệnh "hai sổ rời
          cùng dải" (OverlapTrap) cần để hiểu (biên bản trung cấp). */}
      <path d="M110 24 V94" {...stroke} strokeWidth={1} strokeDasharray="4 3" className="text-ink-muted" />
      <g className="text-accent">
        <rect x="12" y="30" width="40" height="22" rx="3" {...stroke} strokeWidth={1.6} />
        <text x="32" y="44" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          A · 80%
        </text>
        <rect x="58" y="30" width="40" height="22" rx="3" {...stroke} strokeWidth={1.4} />
        <text x="78" y="44" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          B · 20%
        </text>
        <rect x="16" y="62" width="32" height="16" rx="2" {...stroke} strokeWidth={1.2} />
        <rect x="62" y="62" width="32" height="16" rx="2" {...stroke} strokeWidth={1.2} />
        <path d="M32 52 V62 M78 52 V62" {...stroke} strokeWidth={1.2} />
        <text x="55" y="92" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          hai kho rời
        </text>
      </g>
      <g className="text-ok">
        <rect x="120" y="30" width="36" height="22" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="138" y="44" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          A
        </text>
        <rect x="176" y="30" width="36" height="22" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="194" y="44" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          B
        </text>
        <rect x="140" y="62" width="48" height="18" rx="3" {...stroke} strokeWidth={1.5} />
        <path d="M146 69 h36 M146 74 h24" {...stroke} strokeWidth={1} />
        <path d="M138 52 L152 62 M194 52 L178 62" {...stroke} strokeWidth={1.3} />
        <text x="164" y="92" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          một sổ chung
        </text>
      </g>
      <text x="110" y="108" textAnchor="middle" {...monoText}>
        chia kho HOẶC bắt cặp chung sổ
      </text>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        hai người không cùng gả một cô
      </text>
    </Frame>
  )
}

/** Bẫy: hai server hai cuốn sổ rời cùng phát một dải → trùng số. */
function OverlapTrap({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="24" y="26" width="40" height="24" rx="3" {...stroke} strokeWidth={1.4} />
        <rect x="156" y="26" width="40" height="24" rx="3" {...stroke} strokeWidth={1.4} />
      </g>
      <g className="text-warn">
        <rect x="46" y="66" width="56" height="18" rx="2" {...stroke} strokeWidth={1.5} />
        <text x="74" y="79" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          .77
        </text>
        <rect x="118" y="66" width="56" height="18" rx="2" {...stroke} strokeWidth={1.5} />
        <text x="146" y="79" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          .77
        </text>
        <path d="M52 50 L66 66 M168 50 L154 66" {...stroke} strokeWidth={1.3} />
        <text x="110" y="104" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          hai sổ rời — một số cấp hai lần
        </text>
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        bệnh trùng IP do hạ tầng đẻ ra
      </text>
    </Frame>
  )
}

/** Split DNS: một tên, sổ trong và sổ ngoài trả hai địa chỉ. */
function SplitDns({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="76" y="14" width="68" height="18" rx="3" {...stroke} strokeWidth={1.4} />
        <text x="110" y="27" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          www.congty.vn
        </text>
        <path d="M96 34 L62 52" {...stroke} strokeWidth={1.3} markerEnd="url(#cv-arrow)" />
        <path d="M124 34 L158 52" {...stroke} strokeWidth={1.3} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <rect x="18" y="56" width="88" height="34" rx="3" {...stroke} strokeWidth={1.6} />
        <text x="62" y="70" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          sổ TRONG
        </text>
        <text x="62" y="84" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          10.20.0.80
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="114" y="56" width="88" height="34" rx="3" {...stroke} strokeWidth={1.4} />
        <text x="158" y="70" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          sổ NGOÀI
        </text>
        <text x="158" y="84" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          203.0.113.80
        </text>
      </g>
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        nhà đi đường tắt, khách cửa chính
      </text>
      <text x="110" y="126" textAnchor="middle" {...monoText}>
        tên nội bộ KHÔNG phơi ra sổ ngoài
      </text>
    </Frame>
  )
}

/** Forwarder: mọi câu hỏi lạ dồn về một cửa ra. */
function DnsForwarder({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {[26, 52, 78].map((y) => (
          <g key={y}>
            <rect x="16" y={y} width="26" height="16" rx="2" {...stroke} strokeWidth={1.2} />
            <path d={`M46 ${y + 8} H84`} {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
          </g>
        ))}
      </g>
      <g className="text-accent">
        <rect x="88" y="42" width="48" height="34" rx="3" {...stroke} strokeWidth={1.8} />
        <text x="112" y="56" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          forwarder
        </text>
        <text x="112" y="69" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          + bộ đệm
        </text>
        <path d="M140 59 H196" {...stroke} strokeWidth={1.8} markerEnd="url(#cv-arrow)" />
        <text x="168" y="50" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          Internet
        </text>
      </g>
      <text x="110" y="104" textAnchor="middle" {...monoText}>
        một cửa ra: đệm chung, lọc chung
      </text>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        một người hỏi, nghìn người sau hưởng
      </text>
    </Frame>
  )
}

/** Conditional forwarder: tên đối tác rẽ thẳng sang DNS đối tác. */
function CondForwarder({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="48" width="44" height="26" rx="3" {...stroke} strokeWidth={1.4} />
        <text x="38" y="65" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DNS trong
        </text>
        <path d="M64 54 L120 30" {...stroke} strokeWidth={1.3} markerEnd="url(#cv-arrow)" />
        <text x="96" y="26" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          tên khác → Internet
        </text>
      </g>
      <g className="text-accent">
        <path d="M64 68 L120 92" {...stroke} strokeWidth={1.8} markerEnd="url(#cv-arrow)" />
        <text x="86" y="94" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          doitac.vn
        </text>
        <rect x="126" y="82" width="78" height="26" rx="3" {...stroke} strokeWidth={1.6} />
        <text x="165" y="99" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DNS của đối tác
        </text>
      </g>
      <text x="110" y="124" textAnchor="middle" {...monoText}>
        hỏi đúng nhà, khỏi vòng Internet
      </text>
    </Frame>
  )
}

/** TTL: hạ hạn nhớ trước, đổi địa chỉ sau — trục thời gian ba nhịp. */
function TtlTimeline({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M16 64 H204" {...stroke} strokeWidth={1.3} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <circle cx="48" cy="64" r="5" {...stroke} strokeWidth={1.6} />
        <text x="48" y="46" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          hạ TTL
        </text>
        <text x="48" y="86" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          trước vài ngày
        </text>
      </g>
      <g className="text-warn">
        <circle cx="116" cy="64" r="5" {...stroke} strokeWidth={1.6} />
        <text x="116" y="46" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          đổi địa chỉ
        </text>
      </g>
      <g className="text-ok">
        <circle cx="178" cy="64" r="5" {...stroke} strokeWidth={1.6} />
        <text x="178" y="46" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          nâng TTL lại
        </text>
      </g>
      <text x="110" y="108" textAnchor="middle" {...monoText}>
        trí nhớ ngoài kia không xóa được
      </text>
      <text x="110" y="124" textAnchor="middle" {...monoText}>
        chỉ hẹn giờ được từ trước
      </text>
    </Frame>
  )
}

/** Hai tòa nhà, một miền: site HN và site ĐN nối bằng đường WAN chậm. */
function SiteTwoBuildings({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="20" y="34" width="62" height="48" rx="3" {...stroke} strokeWidth={1.6} />
        <path d="M30 46 h42 M30 58 h42 M30 70 h42" {...stroke} strokeWidth={1} />
        <text x="51" y="96" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          site HaNoi
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="138" y="34" width="62" height="48" rx="3" {...stroke} strokeWidth={1.6} />
        <path d="M148 46 h42 M148 58 h42 M148 70 h42" {...stroke} strokeWidth={1} />
        <text x="169" y="96" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          site DaNang
        </text>
        <path d="M84 58 H136" {...stroke} strokeWidth={1.2} strokeDasharray="5 4" />
        <text x="110" y="50" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          WAN chậm
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        chung MỘT miền, khác chỗ đứng
      </text>
    </Frame>
  )
}

/** Subnet gắn site: IP → tra site → DC gần nhà. */
function SubnetToSite({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="16" y="26" width="86" height="18" rx="2" {...stroke} strokeWidth={1.3} />
        <text x="59" y="39" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          IP: 10.30.2.15
        </text>
        <path d="M59 48 V60" {...stroke} strokeWidth={1.3} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <rect x="16" y="64" width="118" height="18" rx="2" {...stroke} strokeWidth={1.6} />
        <text x="75" y="77" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          10.30.0.0/16 → DaNang
        </text>
        <path d="M138 73 H166" {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />
        <rect x="170" y="60" width="36" height="26" rx="3" {...stroke} strokeWidth={1.6} />
        <text x="188" y="77" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          DC-DN
        </text>
      </g>
      <text x="110" y="106" textAnchor="middle" {...monoText}>
        nhìn IP → tra site → gõ cửa gần nhà
      </text>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        quên khai dải là máy mù vị trí
      </text>
    </Frame>
  )
}

/** Replication: hai cuốn sổ chép nhau — trong site nhanh, giữa site theo lịch. */
function ReplicationLedgers({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="24" y="28" width="56" height="44" rx="3" {...stroke} strokeWidth={1.4} />
        <path d="M32 40 h40 M32 50 h40 M32 60 h26" {...stroke} strokeWidth={1.1} />
        <rect x="140" y="28" width="56" height="44" rx="3" {...stroke} strokeWidth={1.4} />
        <path d="M148 40 h40 M148 50 h40 M148 60 h26" {...stroke} strokeWidth={1.1} />
      </g>
      <g className="text-accent">
        <path d="M84 42 H136" {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />
        <path d="M136 58 H84" {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />
        <text x="110" y="34" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          theo lịch, nén
        </text>
      </g>
      <text x="110" y="96" textAnchor="middle" {...monoText}>
        mỗi DC một bản sổ ĐẦY ĐỦ
      </text>
      <text x="110" y="114" textAnchor="middle" {...monoText}>
        trong site: tức thì · giữa: chuyến
      </text>
    </Frame>
  )
}

/** Khe trễ: đổi ở A lúc 9:00, B thấy lúc 9:15 — trục thời gian. */
function SiteLagTimeline({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M18 70 H202" {...stroke} strokeWidth={1.3} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <circle cx="52" cy="70" r="5" {...stroke} strokeWidth={1.6} />
        <text x="52" y="52" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          9:00 ghi ở A
        </text>
      </g>
      <g className="text-warn">
        <path d="M60 82 H136" {...stroke} strokeWidth={1.4} strokeDasharray="4 3" />
        <text x="98" y="96" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          khe trễ — không phải hỏng
        </text>
      </g>
      <g className="text-ok">
        <circle cx="144" cy="70" r="5" {...stroke} strokeWidth={1.6} />
        <text x="144" y="52" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          9:15 B thấy
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        đợi hết một chuyến rồi kết luận
      </text>
    </Frame>
  )
}

/** AGDLP: đường ống bốn khúc A → G → DL → P. */
function AgdlpPipe({ title }: { title?: string }) {
  const boxes = [
    { x: 10, label: 'A', sub: 'người' },
    { x: 62, label: 'G', sub: 'vai' },
    { x: 114, label: 'DL', sub: 'quyền' },
    { x: 166, label: 'P', sub: 'thư mục' },
  ]
  return (
    <Frame title={title}>
      {boxes.map((b, i) => (
        <g key={b.label} className={i === 3 ? 'text-ok' : i === 0 ? 'text-ink-muted' : 'text-accent'}>
          <rect x={b.x} y="42" width="42" height="30" rx="4" {...stroke} strokeWidth={1.6} />
          <text x={b.x + 21} y="60" textAnchor="middle" fontSize="11" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {b.label}
          </text>
          <text x={b.x + 21} y="86" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {b.sub}
          </text>
          {i < 3 && <path d={`M${b.x + 44} 57 h6`} {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />}
        </g>
      ))}
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        người vào vai, vai cắm vào quyền
      </text>
      <text x="110" y="126" textAnchor="middle" {...monoText}>
        không ai nối nguồn thẳng vào vòi
      </text>
    </Frame>
  )
}

/** Global vs Domain Local: thẻ đi theo người, ổ khóa đứng cạnh cửa. */
function GgVsDl({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <path d="M110 14 V104" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-ink-muted" />
      <g className="text-accent">
        <text x="58" y="28" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          Global
        </text>
        <rect x="34" y="38" width="30" height="20" rx="3" {...stroke} strokeWidth={1.5} />
        <rect x="58" y="52" width="30" height="20" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="58" y="92" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          gom NGƯỜI theo vai
        </text>
      </g>
      <g className="text-ok">
        <text x="164" y="28" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          Domain Local
        </text>
        <rect x="148" y="40" width="32" height="26" rx="4" {...stroke} strokeWidth={1.5} />
        <circle cx="164" cy="50" r="4" {...stroke} strokeWidth={1.3} />
        <path d="M164 54 v6" {...stroke} strokeWidth={1.3} />
        <text x="164" y="92" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          giữ QUYỀN cạnh cửa
        </text>
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        vai cắm vào quyền — cấm ngược
      </text>
    </Frame>
  )
}

/** Vòng đời nhân sự: mới / chuyển / nghỉ — đều chạm đúng một chỗ. */
function StaffLifecycle({ title }: { title?: string }) {
  const rows = [
    { y: 26, label: 'mới vào', action: '+ vào nhóm vai' },
    { y: 52, label: 'chuyển phòng', action: 'đổi nhóm vai' },
    { y: 78, label: 'nghỉ việc', action: 'khóa tài khoản' },
  ]
  return (
    <Frame title={title}>
      {rows.map((r) => (
        <g key={r.y} className="text-ink-muted">
          <rect x="22" y={r.y} width="78" height="18" rx="2" {...stroke} strokeWidth={1.2} />
          <text x="61" y={r.y + 13} textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {r.label}
          </text>
          <path d={`M104 ${r.y + 9} H124`} {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
        </g>
      ))}
      {rows.map((r) => (
        <g key={`a${r.y}`} className="text-accent">
          <rect x="128" y={r.y} width="72" height="18" rx="2" {...stroke} strokeWidth={1.4} />
          <text x="164" y={r.y + 13} textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {r.action}
          </text>
        </g>
      ))}
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        biến động chỉ chạm khúc người–vai
      </text>
    </Frame>
  )
}

/** Delegation: chùm chìa to trong két, một chìa hẹp trao ra đúng cửa. */
function DelegationKeys({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="22" y="30" width="52" height="52" rx="4" {...stroke} strokeWidth={1.5} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={36 + i * 13} cy="50" r="4" {...stroke} strokeWidth={1.2} />
            <path d={`M${36 + i * 13} 54 v10`} {...stroke} strokeWidth={1.2} />
          </g>
        ))}
        <text x="48" y="96" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          cả chùm: trong két
        </text>
      </g>
      <g className="text-accent">
        <path d="M80 56 H126" {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />
        <circle cx="146" cy="50" r="5" {...stroke} strokeWidth={1.7} />
        <path d="M146 55 v14 M146 63 h6" {...stroke} strokeWidth={1.7} />
        <text x="146" y="34" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          một chìa hẹp
        </text>
      </g>
      <g className="text-ok">
        <rect x="170" y="42" width="34" height="34" rx="3" {...stroke} strokeWidth={1.5} />
        <text x="187" y="92" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          OU NhanVien
        </text>
      </g>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        đúng việc · đúng nhánh · cho NHÓM
      </text>
    </Frame>
  )
}

/** Một dòng syslog tách thành bốn mảnh: khi nào, máy nào, mức nào, chuyện gì. */
function SyslogLine({ title }: { title?: string }) {
  const parts = [
    { x: 12, w: 58, label: '03:12:44', sub: 'khi nào' },
    { x: 74, w: 52, label: 'sw-core', sub: 'máy nào' },
    { x: 130, w: 40, label: 'ERROR', sub: 'mức nào' },
    { x: 174, w: 34, label: 'link…', sub: 'chuyện gì' },
  ]
  return (
    <Frame title={title}>
      {parts.map((p, i) => (
        <g key={p.x} className={i === 2 ? 'text-warn' : 'text-ink-muted'}>
          <rect x={p.x} y="42" width={p.w} height="22" rx="3" {...stroke} strokeWidth={i === 2 ? 1.8 : 1.3} />
          <text x={p.x + p.w / 2} y="57" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {p.label}
          </text>
          <text x={p.x + p.w / 2} y="80" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {p.sub}
          </text>
        </g>
      ))}
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        bốn câu hỏi, một khuôn cho mọi máy
      </text>
    </Frame>
  )
}

/** Thang severity 0-7: số nhỏ nóng, số lớn nguội. */
function SeverityLadder({ title }: { title?: string }) {
  const levels = ['0 Emerg', '1 Alert', '2 Crit', '3 Error', '4 Warn', '5 Notice', '6 Info', '7 Debug']
  return (
    <Frame title={title}>
      {levels.map((l, i) => (
        <g key={l} className={i <= 3 ? 'text-warn' : 'text-ink-muted'}>
          <rect x={14 + i * 24} y={30 + i * 6} width="22" height={64 - i * 6} rx="2" {...stroke} strokeWidth={i <= 3 ? 1.6 : 1.1} />
          <text
            x={25 + i * 24}
            y={104}
            textAnchor="middle"
            fontSize="6.5"
            fill="currentColor"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {l}
          </text>
        </g>
      ))}
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        số càng NHỎ chuyện càng lớn
      </text>
    </Frame>
  )
}

/** Log tập trung: ba thiết bị đổ sổ về một máy thu. */
function CentralLog({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {[24, 52, 80].map((y) => (
          <g key={y}>
            <rect x="16" y={y} width="34" height="18" rx="2" {...stroke} strokeWidth={1.2} />
            <path d={`M54 ${y + 9} L96 58`} {...stroke} strokeWidth={1.2} markerEnd="url(#cv-arrow)" />
          </g>
        ))}
      </g>
      <g className="text-accent">
        <rect x="100" y="40" width="56" height="40" rx="3" {...stroke} strokeWidth={1.8} />
        <path d="M108 52 h40 M108 60 h40 M108 68 h28" {...stroke} strokeWidth={1.1} />
        <text x="128" y="94" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          máy thu log
        </text>
      </g>
      <g className="text-ok">
        <path d="M176 52 l6 8 10 -14" {...stroke} strokeWidth={1.8} />
      </g>
      <text x="110" y="116" textAnchor="middle" {...monoText}>
        sổ rời tàu từng dòng một
      </text>
    </Frame>
  )
}

/** Giờ lệch: hai đồng hồ, thứ tự sự kiện đảo ngược. */
function ClockSkew({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <circle cx="60" cy="46" r="18" {...stroke} strokeWidth={1.4} />
        <path d="M60 46 V34 M60 46 L69 51" {...stroke} strokeWidth={1.4} />
        <text x="60" y="80" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          router 02:09
        </text>
      </g>
      <g className="text-warn">
        <circle cx="160" cy="46" r="18" {...stroke} strokeWidth={1.4} />
        <path d="M160 46 V34 M160 46 L151 53" {...stroke} strokeWidth={1.4} />
        <text x="160" y="80" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          switch 02:14
        </text>
        <text x="110" y="100" textAnchor="middle" fontSize="9" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          đồng hồ lệch 6 phút?
        </text>
      </g>
      <text x="110" y="120" textAnchor="middle" {...monoText}>
        thứ tự trước-sau thành chuyện bịa
      </text>
    </Frame>
  )
}

/** Lọc trước, đọc sau: chồng log qua phễu còn vài dòng. */
function FilterFirst({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="20" y="20" width="70" height="72" rx="3" {...stroke} strokeWidth={1.3} />
        {[30, 38, 46, 54, 62, 70, 78, 86].map((y) => (
          <path key={y} d={`M28 ${y} h54`} {...stroke} strokeWidth={1} />
        ))}
        <text x="55" y="106" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          160 dòng
        </text>
      </g>
      <g className="text-accent">
        <path d="M94 50 L118 50 L128 62 L118 74 L94 74" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <text x="110" y="42" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          ERROR
        </text>
        <path d="M132 62 H150" {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-warn">
        <rect x="154" y="52" width="52" height="20" rx="2" {...stroke} strokeWidth={1.7} />
        <text x="180" y="66" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          1 dòng thật
        </text>
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        lọc trước, đọc sau
      </text>
    </Frame>
  )
}

/** Polling: vòng hỏi thăm định kỳ vẽ thành đồ thị. */
function SnmpPolling({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-accent">
        <rect x="18" y="34" width="48" height="30" rx="3" {...stroke} strokeWidth={1.6} />
        <text x="42" y="53" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          giám sát
        </text>
        <path d="M70 42 H114" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <path d="M114 56 H70" {...stroke} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#cv-arrow)" />
        <text x="92" y="34" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          5 phút/lượt
        </text>
      </g>
      <g className="text-ink-muted">
        <rect x="118" y="34" width="40" height="30" rx="3" {...stroke} strokeWidth={1.3} />
        <text x="138" y="53" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          switch
        </text>
      </g>
      <g className="text-ok">
        <path d="M26 104 l24 -6 l24 -3 l24 -8 l24 -4 l24 -10 l24 -3" {...stroke} strokeWidth={1.6} />
        {/* Đường xu hướng phải có NHÃN ĐẠI LƯỢNG: "yếu dần" cạnh một đường
            leo dốc chỉ đúng khi người xem biết nó đo lỗi tăng — không nhãn
            thì đoán là "sức khỏe" và hình nói ngược lời (biên bản). */}
        <text x="194" y="64" textAnchor="end" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          lỗi/phút
        </text>
        <text x="110" y="118" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          hỏi đều → thấy được sự yếu dần
        </text>
      </g>
    </Frame>
  )
}

/** Trap: thiết bị tự hô — tia chớp bay về máy giám sát. */
function SnmpTrap({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="18" y="44" width="44" height="30" rx="3" {...stroke} strokeWidth={1.3} />
        <text x="40" y="63" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          giám sát
        </text>
      </g>
      <g className="text-warn">
        <rect x="156" y="44" width="44" height="30" rx="3" {...stroke} strokeWidth={1.6} />
        <text x="178" y="63" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          switch
        </text>
        <path d="M178 40 l-6 -12 h8 l-6 -12" {...stroke} strokeWidth={1.6} />
        <path d="M152 59 H70" {...stroke} strokeWidth={2} markerEnd="url(#cv-arrow)" />
        <text x="110" y="50" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          TRAP! nguồn hỏng
        </text>
      </g>
      <text x="110" y="100" textAnchor="middle" {...monoText}>
        có biến là tự hô — không đợi ai hỏi
      </text>
      <text x="110" y="118" textAnchor="middle" {...monoText}>
        nhưng chuông không vẽ được đồ thị
      </text>
    </Frame>
  )
}

/** Baseline: dải nếp cũ và hai kiểu bật khỏi nếp. */
function BaselineBand({ title }: { title?: string }) {
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <rect x="18" y="46" width="184" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
        <text x="110" y="42" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          nếp cũ (baseline)
        </text>
      </g>
      <g className="text-ok">
        <path d="M22 60 l20 -4 l20 5 l20 -6 l20 4" {...stroke} strokeWidth={1.6} />
      </g>
      <g className="text-warn">
        <path d="M102 59 l18 -34 l16 8" {...stroke} strokeWidth={1.6} />
        <text x="146" y="26" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          vọt lên
        </text>
        <path d="M136 33 l16 52 l28 6" {...stroke} strokeWidth={1.6} strokeDasharray="4 3" />
        <text x="176" y="102" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          im ắng khác nếp
        </text>
      </g>
      <text x="110" y="122" textAnchor="middle" {...monoText}>
        bật khỏi nếp: hai phía đều báo
      </text>
    </Frame>
  )
}

/** Quy trình 4 bước capstone: giấy → dây → lệnh → bằng chứng. */
function FourStepProcess({ title }: { title?: string }) {
  const steps = [
    { x: 10, label: '1', sub: 'địa chỉ' },
    { x: 62, label: '2', sub: 'nối dây' },
    { x: 114, label: '3', sub: 'cấu hình' },
    { x: 166, label: '4', sub: 'kiểm chứng' },
  ]
  return (
    <Frame title={title}>
      {steps.map((b, i) => (
        <g key={b.label} className={i === 3 ? 'text-ok' : 'text-accent'}>
          <rect x={b.x} y="40" width="44" height="32" rx="4" {...stroke} strokeWidth={1.6} />
          <text x={b.x + 22} y="60" textAnchor="middle" fontSize="12" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {b.label}
          </text>
          <text x={b.x + 22} y="86" textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {b.sub}
          </text>
          {i < 3 && <path d={`M${b.x + 46} 56 h6`} {...stroke} strokeWidth={1.6} markerEnd="url(#cv-arrow)" />}
        </g>
      ))}
      <text x="110" y="112" textAnchor="middle" {...monoText}>
        giấy trước, dây sau, lệnh tiếp
      </text>
      <text x="110" y="126" textAnchor="middle" {...monoText}>
        và không tin gì khi chưa kiểm
      </text>
    </Frame>
  )
}

/** Kiểm chứng leo thang ba bậc: trunk sống → Full → ping. */
function VerifyLadder({ title }: { title?: string }) {
  const rungs = [
    { y: 88, label: 'show interfaces trunk', note: 'tầng 2 sống' },
    { y: 58, label: 'show ip ospf neighbor → FULL', note: 'tầng 3 quen' },
    { y: 28, label: 'ping xuyên site', note: 'trọn đường' },
  ]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        <path d="M24 108 V20 M196 108 V20" {...stroke} strokeWidth={1.3} />
      </g>
      {rungs.map((r, i) => (
        <g key={r.y} className={i === 2 ? 'text-ok' : 'text-accent'}>
          <path d={`M24 ${r.y + 10} H196`} {...stroke} strokeWidth={1.5} />
          <text x="110" y={r.y + 4} textAnchor="middle" fontSize="8" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
            {r.label}
          </text>
        </g>
      ))}
      <text x="110" y="124" textAnchor="middle" {...monoText}>
        mỗi bậc một bằng chứng rồi mới leo
      </text>
    </Frame>
  )
}

/**
 * Hình isometric sinh từ bản vẽ FossFLOW (`content/ban-ve/*.json`, script
 * `npm run visuals:isometric`). File sinh ra chỉ trả về RUỘT hình, nên bọc
 * Frame ở đây — nhờ vậy hình máy sinh và hình vẽ tay dùng chung một cái
 * khung, một cách đặt nhãn aria, một kiểu viền.
 *
 * Bản vẽ đổi id thì đây đỏ ngay ở test, không im lặng rơi về hình chung:
 * `IsometricScenes.test` đối chiếu file sinh ra với chính bản vẽ nguồn.
 */
function IsoScene({ id, title }: { id: string; title?: string }) {
  const Scene = ISOMETRIC_SCENES[id]
  if (Scene === undefined) return <GenericMail title={title} />
  return <Frame title={title}>{Scene()}</Frame>
}

const REGISTRY: Record<string, VisualComponent> = {
  // Module 1 — bưu điện
  'vis-phong-bi-thu': EnvelopePackets,
  'vis-hook-goi-tin': EnvelopePackets,
  'vis-dia-chi-nha': HouseAddress,
  'vis-so-can-ho': ApartmentPorts,
  'vis-hook-port': ApartmentPorts,
  'vis-buu-ta': RouterNode,
  'vis-hook-router': RouterNode,
  'vis-quy-uoc-viet-thu': MatchingLetters,
  'vis-hook-giao-thuc': MatchingLetters,
  'vis-hanh-trinh-tong-quan': (p) => <Journey leg="tong-quan" {...p} />,
  // Module 2 — hành trình gõ google.com (mỗi màn sáng một chặng)
  'vis-hanh-trinh-dns': (p) => <Journey leg="dns" {...p} />,
  'vis-hanh-trinh-gateway': (p) => <Journey leg="gateway" {...p} />,
  'vis-hanh-trinh-router': (p) => <Journey leg="routers" {...p} />,
  'vis-hanh-trinh-ve-dich': (p) => <Journey leg="ve-dich" {...p} />,
  'vis-ban-do-khoa-hoc': CourseMap,
  // Module 3 — địa chỉ
  'vis-so-khung-bien-so': ChassisPlate,
  'vis-bon-o-so': FourOctets,
  'vis-nha-rieng-cong-cong': PrivatePublic,
  'vis-hang-rao-khu-pho': MaskFence,
  'vis-magic-number': MagicNumber,
  'vis-doc-khoi': BlockAnatomy,
  'icon-doc-khoi': BlockAnatomy,
  'vis-hook-doc-khoi': BlockAnatomy,
  'vis-so-may-dung-duoc': UsableHosts,
  'icon-so-may-dung-duoc': UsableHosts,
  'vis-ipv6-bien-so-dai': Ipv6Plate,
  // Module 4 — thiết bị trong làng
  'vis-switch-nhieu-cong': SwitchHub,
  'vis-hook-switch': SwitchHub,
  'vis-so-mac': MacTable,
  'vis-hook-mac-table': MacTable,
  'vis-hoi-ten-arp': ArpShout,
  'vis-hook-arp': ArpShout,
  'vis-chia-vlan': VlanSplit,
  'vis-hook-vlan': VlanSplit,
  'vis-mien-quang-ba': BroadcastDomain,
  'vis-cau-noi-router': RoutingBridge,
  'vis-hook-dinh-tuyen': RoutingBridge,
  // Module 5 — TCP, UDP và cung điện port
  'vis-bat-tay-3-buoc': Handshake3Way,
  'vis-hook-bat-tay': Handshake3Way,
  'vis-tcp-tin-cay': TcpReliable,
  'vis-udp-nhanh': UdpFast,
  'vis-hook-udp': UdpFast,
  'vis-cong-noi-tieng': WellKnownDoors,
  'vis-hook-cong-so': WellKnownDoors,
  'vis-cong-tam-thoi': EphemeralTicket,
  'vis-cung-dien-toa-nha': PalaceBuilding,
  // Module 6 — DNS và DHCP
  'vis-nguoi-hoi-ho': DnsResolver,
  'vis-dns-ba-tang': DnsHierarchy,
  'vis-hook-dns-phan-cap': DnsHierarchy,
  'vis-ban-ghi-a': RecordA,
  'vis-hook-ban-ghi': RecordA,
  'vis-ban-ghi-cname-mx': RecordCnameMx,
  'vis-doh-phong-bi': DohEnvelope,
  'vis-hook-doh': DohEnvelope,
  'vis-dora-bon-nhip': DoraFourBeats,
  'vis-hook-dora': DoraFourBeats,
  'vis-dhcp-thue-nha': DhcpLease,
  'vis-gia-han-thue': LeaseRenew,
  'vis-hook-lease': LeaseRenew,
  // Module 7 — NAT, tường lửa và mạng nhà
  'vis-nat-chung-cu': NatApartment,
  'vis-hook-nat': NatApartment,
  'vis-pat-bang-so': NatTable,
  'vis-mo-cua-vao-nha': PortForward,
  'vis-hook-port-forwarding': PortForward,
  'vis-gac-cua-nho-mat': StatefulGuard,
  'vis-hook-firewall': StatefulGuard,
  'vis-so-do-mang-nha': HomeNetwork,
  'vis-hook-mang-nha': HomeNetwork,
  'vis-hai-lop-nat': DoubleNat,
  'vis-hook-double-nat': DoubleNat,
  // Module 8 — Wi-Fi và IPv6 chuyên sâu
  'vis-song-thay-day': WifiWaves,
  'vis-hook-song-wifi': WifiWaves,
  'vis-bang-tan-ba-lan': BandTradeoff,
  'vis-the-he-wifi': WifiGenerations,
  'vis-hook-chuan-wifi': WifiGenerations,
  'vis-lan-6ghz': NewLane,
  'vis-khoa-wpa2': WpaLock,
  'vis-hook-wpa': WpaLock,
  'vis-wpa3-cham-mat': Wpa3Handshake,
  'vis-fe80-trong-phong': LinkLocalRoom,
  'vis-hook-ipv6-sau': LinkLocalRoom,
  'vis-ipv6-hai-nua': Ipv6TwoHalves,
  'vis-slaac-tu-ghep': SlaacAssemble,
  'vis-hook-slaac': SlaacAssemble,
  'vis-dual-stack-hai-bien': DualStackPlates,
  // Module 9 — Windows Server: AD DS và GPO
  'vis-mien-lang-may': MienLangMay,
  'vis-hook-mien': MienLangMay,
  'vis-dc-so-cai': DcSoCai,
  'vis-user-group': UserGroup,
  'vis-hook-user-group': UserGroup,
  'vis-ou-ngan-keo': OuNganKeo,
  'vis-gpo-treo-luat': GpoTreoLuat,
  'vis-hook-gpo': GpoTreoLuat,
  'vis-toa-nha-lsdou': ToaNhaLsdou,
  'vis-hook-lsdou': ToaNhaLsdou,
  'vis-ke-thua-chan': KeThuaChan,
  'vis-hook-ke-thua': KeThuaChan,
  'vis-gpresult-soi': GpresultSoi,
  // Module 10 — Cloud Networking và Zero Trust (hình hai-ô so sánh)
  'vis-cloud-may-chu-nguoi-khac': CloudMayChuNguoiKhac,
  'vis-hook-cloud': CloudMayChuNguoiKhac,
  'vis-vpc-goc-rieng': VpcGocRieng,
  'vis-sg-tung-may': SgTungMay,
  'vis-hook-sg': SgTungMay,
  'vis-vpn-s2s-cau': VpnS2sCau,
  'vis-hook-vpn': VpnS2sCau,
  'vis-vpn-client-ham': VpnClientHam,
  'vis-vanh-dai-lau-dai': VanhDaiLauDai,
  'vis-hook-zero-trust': VanhDaiLauDai,
  'vis-zero-trust-moi-cua': ZeroTrustMoiCua,
  'vis-entra-hai-so': EntraHaiSo,
  'vis-hook-entra': EntraHaiSo,
  // Module 11 — phòng khám mạng
  'vis-kham-theo-tang': KhamTheoTang,
  'vis-hook-ca-truc': KhamTheoTang,
  'vis-ipconfig-ping': IpconfigPing,
  'vis-tracert-chang': TracertChang,
  'vis-hook-tracert': TracertChang,
  'vis-tach-ten-so': TachTenSo,
  'vis-hook-ten-so': TachTenSo,
  'vis-arp-doi-chu': ArpDoiChu,
  'vis-hook-doi-chu': ArpDoiChu,
  'vis-manh-moi-tai-cho': ManhMoiTaiCho,
  'vis-hook-manh-moi': ManhMoiTaiCho,
  // Module 12 — PowerShell cho người quản trị mạng
  'vis-cmdlet-dong-tu-danh-tu': CmdletVerbNoun,
  'vis-hook-cmdlet': CmdletVerbNoun,
  'vis-cmdlet-mang': NetCmdlets,
  'vis-tham-so-nhan': NamedParams,
  'vis-get-help-so-tay': HelpManual,
  'vis-hook-get-help': HelpManual,
  'vis-hoi-so-ad': AdDirectoryQuery,
  'vis-hook-ad-ps': AdDirectoryQuery,
  'vis-tao-user-dn': NewUserDn,
  'vis-dau-ong': PipelineFlow,
  'vis-hook-pipeline': PipelineFlow,
  'vis-loc-dong-log': LogFilter,
  'vis-hook-doc-log': LogFilter,
  // Module 13 — VLSM
  'vis-chia-deu-phi-dat': EvenSplitWaste,
  'vis-hook-chia-deu': EvenSplitWaste,
  'vis-vlsm-lo-dat': VlsmBlocks,
  'vis-co-khoi-vua-du': BlockSizeLadder,
  'vis-hook-co-khoi': BlockSizeLadder,
  'vis-cat-lon-truoc': BiggestFirst,
  'vis-hook-thu-tu-cat': BiggestFirst,
  'vis-can-khoi': BlockAlign,
  'vis-hook-can-khoi': BlockAlign,
  'vis-wildcard-mask': WildcardMask,
  'vis-hook-wildcard': WildcardMask,
  'vis-tom-tat-tuyen': RouteSummary,
  'vis-hook-tom-tat': RouteSummary,
  // Module 14 — Trunk 802.1Q
  'vis-trunk-mot-day': TrunkOneCable,
  'vis-hook-mot-day-nhieu-xom': TrunkOneCable,
  'vis-khung-mang-nhan': TaggedFrame,
  'vis-hook-dan-nhan': TaggedFrame,
  'vis-native-vlan': NativeVlanMismatch,
  'vis-hook-native-lech': NativeVlanMismatch,
  'vis-allowed-list': AllowedVlanList,
  'vis-hook-danh-sach-khach': AllowedVlanList,
  'vis-router-mot-chan': RouterOnAStick,
  // Hook bày HIỆN TRƯỜNG (bốn xóm, một chân trống), màn Dạy giữ hình ẩn dụ
  // giải cách làm — hai màn hai việc khác nhau thì đừng chung một hình.
  'vis-hook-router-mot-chan': (p) => <IsoScene id="vis-iso-router-mot-chan-m14" {...p} />,
  // Module 15 — STP
  'vis-bao-quang-ba': BroadcastStorm,
  // BA NHỊP CỦA CÙNG MỘT PHÒNG MÁY (bài 1 → 2 → 4): cùng ba switch, cùng
  // chỗ đứng, chỉ đổi đúng sợi dây vừa thay đổi. Người học mở bài sau ra
  // nhận ngay "vẫn cái vòng hôm qua" rồi mắt tự nhảy vào chỗ khác đi.
  'vis-hook-bao-quang-ba': (p) => <IsoScene id="vis-iso-vong-lap-stp-m15" {...p} />,
  'vis-bpdu': BpduHello,
  'vis-root-bridge': RootBridgeElection,
  'vis-hook-bau-root': (p) => <IsoScene id="vis-iso-vong-lap-stp-chan-m15" {...p} />,
  'vis-cong-chan': BlockedPort,
  'vis-hook-cong-nam-im': BlockedPort,
  // Bài 4 dùng chung một mạng cho hook và màn Dạy, đúng khuôn vừa dựng cho
  // M16 bài 5: hook thấy sợi đang gánh vừa đứt (không tô sợi nào, vì nó hỏi
  // "lưu lượng đi lối nào"), màn Dạy thấy lối mới sáng lên.
  'vis-hoi-tu-lai': (p) => <IsoScene id="vis-iso-vong-lap-stp-dut-m15-hoi-tu" {...p} />,
  'vis-hook-dut-day': (p) => <IsoScene id="vis-iso-vong-lap-stp-dut-m15" {...p} />,
  'vis-portfast': PortFast,
  'vis-hook-portfast': PortFast,
  // Module 16 — OSPF
  'vis-gioi-han-tuyen-tinh': StaticRouteLimit,
  'vis-hook-so-tuyen-tay': StaticRouteLimit,
  'vis-dinh-tuyen-dong': DynamicRouting,
  'vis-goi-hello': HelloPacket,
  'vis-hook-lam-quen-router': HelloPacket,
  'vis-toa-lam-quen': NeighborLadder,
  'vis-dong-bo-ban-do': LsdbSync,
  'vis-hook-chu-full': LsdbSync,
  'vis-network-area-0': NetworkAreaZero,
  'vis-cost-duong-re': OspfCost,
  'vis-hook-hai-duong': (p) => <IsoScene id="vis-iso-hai-loi-ba-mien-m16" {...p} />,
  'vis-bang-tu-hoc': LearnedRouteTable,
  // Cả bài m16-bai-5 dùng CHUNG một mạng — chính mạng của lab trong bài,
  // bốn view của một bản vẽ: hook thấy sợi vừa đứt, màn Dạy thấy lối vòng
  // sáng lên, màn Tổng kết thấy trạng thái cuối. Trước đó hook là tam giác
  // ba router còn Tổng kết là sơ đồ lab bảy thiết bị — cùng một bài mà hai
  // bức tranh không liên quan gì nhau.
  'vis-ospf-di-loi-vong': (p) => <IsoScene id="vis-iso-lab-ospf-doi-lo-m16-duong-vong" {...p} />,
  'vis-hook-dut-duong-ospf': (p) => <IsoScene id="vis-iso-lab-ospf-doi-lo-m16-dut" {...p} />,
  'vis-ad-tinh-thang': AdminDistance,
  // Module 17 — ACL và bảo mật lớp 2
  'vis-acl-loc-tren-cong': AclGate,
  'vis-thu-tu-dong-luat': RuleOrder,
  'vis-cam-vo-hinh': ImplicitDeny,
  'vis-hook-dong-cam-vo-hinh': ImplicitDeny,
  'vis-acl-chuan': StandardAcl,
  'vis-acl-mo-rong': ExtendedAcl,
  'vis-hook-chuan-hay-mo-rong': StandardAcl,
  'vis-chieu-in-out': InOutDirection,
  'vis-dat-acl-o-dau': PlacementRule,
  'vis-hook-dat-sai-cho': PlacementRule,
  'vis-acl-vs-stateful': StatelessVsStateful,
  'vis-mac-flooding': MacFlood,
  'vis-port-security': PortSecurity,
  'vis-hook-cong-tu-sap': PortSecurity,
  'vis-arp-mao-danh': ArpSpoof,
  'vis-hook-mao-danh': ArpSpoof,
  'vis-vlan-hopping': VlanHopping,
  // Module 18 — DHCP & DNS doanh nghiệp
  'vis-ranh-gioi-dora': DoraBoundary,
  'vis-hook-chuyen-loi': DoraBoundary,
  'vis-dhcp-relay': DhcpRelay,
  'vis-scope-can': ScopeGauge,
  'vis-hook-tang-ba-cam': ApipaSelf,
  'vis-apipa': ApipaSelf,
  'vis-dhcp-failover': DhcpFailover,
  'vis-hook-hai-nguoi-moi': DhcpFailover,
  'vis-trung-dai-dhcp': OverlapTrap,
  'vis-split-dns': SplitDns,
  'vis-hook-mot-ten-hai-so-phan': SplitDns,
  'vis-dns-forwarder': DnsForwarder,
  'vis-conditional-forwarder': CondForwarder,
  'vis-ttl-han-nho': TtlTimeline,
  'vis-hook-nho-dai': TtlTimeline,
  // Module 19 — AD đa site & ủy quyền
  'vis-site-hai-toa': SiteTwoBuildings,
  'vis-hook-dang-nhap-cham': SiteTwoBuildings,
  'vis-subnet-gan-site': SubnetToSite,
  'vis-replication-hai-so': ReplicationLedgers,
  'vis-hook-doi-mat-khau-bay': ReplicationLedgers,
  'vis-do-tre-site': SiteLagTimeline,
  'vis-agdlp-ong-nuoc': AgdlpPipe,
  'vis-hook-loi-tat-do': AgdlpPipe,
  'vis-gg-vs-dl': GgVsDl,
  'vis-vong-doi-nhan-su': StaffLifecycle,
  'vis-hook-cho-quyen-3-ngay': StaffLifecycle,
  'vis-delegation-chia-hep': DelegationKeys,
  'vis-hook-chia-khoa-to': DelegationKeys,
  // Module 20 — Giám sát & nhật ký
  'vis-dong-syslog': SyslogLine,
  'vis-hook-dong-chu-2-gio-sang': SyslogLine,
  'vis-severity-thang': SeverityLadder,
  'vis-log-tap-trung': CentralLog,
  'vis-hook-ba-cuon-so': ClockSkew,
  'vis-gio-lech': ClockSkew,
  'vis-loc-truoc-doc': FilterFirst,
  'vis-hook-dong-rom': FilterFirst,
  'vis-snmp-polling': SnmpPolling,
  'vis-hook-y-ta-va-chuong': SnmpTrap,
  'vis-snmp-trap': SnmpTrap,
  'vis-baseline': BaselineBand,
  'vis-hook-60-phan-tram': BaselineBand,
  // Module 21 — capstone
  'vis-quy-trinh-4-buoc': FourStepProcess,
  'vis-hook-thung-thiet-bi': FourStepProcess,
  'vis-kiem-chung-tung-buoc': VerifyLadder,
  // Hook chặng 2 lấy hình HIỆN TRƯỜNG (sinh từ bản vẽ, xem cuối REGISTRY)
  // thay cho cái thang kiểm chứng. Lý do: bản cũ cho hook và màn Dạy của
  // CÙNG bài dùng chung một hình, tức là mở bài ra thấy đúng cái hình lát
  // nữa sẽ gặp lại — hook mất việc. Lời hook tả một hiện trường cụ thể
  // (máy chủ ở trụ sở, WAN đã sáng, hai switch nối nhau) mà trước giờ
  // người học phải tự dựng trong đầu; giờ nó nằm sẵn trước mắt.
  'vis-hook-oc-dao': (p) => <IsoScene id="vis-iso-chi-nhanh-m21" {...p} />,
  'vis-hook-yeu-cau-sep': FourStepProcess,
  'vis-hook-hai-benh-chong': VerifyLadder,
  // Mỗi bản vẽ tự có một visualId `vis-iso-<tên-file>` để duyệt được trên
  // /design mà không cần nội dung nào trỏ tới nó.
  ...Object.fromEntries(
    Object.keys(ISOMETRIC_SCENES).map((id) => [
      id,
      ({ title }: { title?: string }) => <IsoScene id={id} title={title} />,
    ]),
  ),
}

/**
 * visualId này đã có hình riêng chưa? Hình chung GenericMail là lưới an
 * toàn lúc chạy (bài vẫn dạy được), nhưng nó im lặng — nội dung gõ sai
 * visualId sẽ không ai biết. Test nội dung dùng hàm này làm cổng chặn.
 */
export function hasVisual(visualId: string): boolean {
  return visualId in REGISTRY
}

/** Mọi visualId đang có hình — trang /design bày hết ra để duyệt bằng mắt. */
export function visualIds(): string[] {
  return Object.keys(REGISTRY)
}

export function ConceptVisual({ visualId, title }: { visualId: string; title?: string }) {
  const Visual = REGISTRY[visualId] ?? GenericMail
  return <Visual title={title} />
}
