// Hình minh họa khái niệm (dual coding — spec 2.1 bước 3: mỗi khái niệm
// 1 hình, chữ ngắn đặt NGAY CẠNH hình). Registry ánh xạ visualId trong
// nội dung → hình SVG vẽ tay theo hệ ẩn dụ bưu điện; visualId chưa có
// hình riêng dùng hình thư chung để bài vẫn dạy được, và Khối 5 bổ sung
// dần hình cho nội dung mới.

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { loadModules } from '../content'

function Frame({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <svg
      viewBox="0 0 220 130"
      role="img"
      aria-label={title}
      className="h-40 w-full rounded-md border border-edge bg-panel"
    >
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
      <defs>
        <marker id="cv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 6 3 0 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </marker>
      </defs>
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
    <motion.g
      initial={{ x: x - 16, y, opacity: 0 }}
      animate={{ x, y, opacity: 1 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="text-accent"
    >
      <rect x="-8" y="-6" width="16" height="12" rx="2" fill="var(--panel)" stroke="currentColor" strokeWidth="1.8" />
      <path d="M-8 -3.5 0 3 8 -3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </motion.g>
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
const COURSE_PARTS = [
  { part: 'A', color: 'var(--part-a)', orders: [1, 2, 3], y: 30, labelX: 140, labelY: 43 },
  { part: 'B', color: 'var(--part-b)', orders: [4, 5, 6, 7], y: 58, labelX: 166, labelY: 71 },
  { part: 'C', color: 'var(--part-c)', orders: [8, 9, 10, 11, 12], y: 86, labelX: 192, labelY: 99 },
] as const

function CourseMap({ title }: { title?: string }) {
  const published = new Set(loadModules().map((m) => m.order))
  const cell = (x: number, y: number, color: string, filled: boolean) => (
    <rect
      key={`${x}-${y}`}
      x={x}
      y={y}
      width="18"
      height="18"
      rx="3"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="2"
      opacity={filled ? 1 : 0.55}
    />
  )
  return (
    <Frame title={title}>
      {COURSE_PARTS.map(({ part, color, orders, y, labelX, labelY }) => (
        <g key={part}>
          {orders.map((order, i) => cell(28 + i * 26, y, color, published.has(order)))}
          <text x={labelX} y={labelY} fontSize="10" fill={color} style={{ fontFamily: 'var(--font-mono)' }}>
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
        <path d="M56 44 H164" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="40" textAnchor="middle" {...monoText}>
          SYN
        </text>
        <path d="M164 94 H56" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
        <text x="110" y="90" textAnchor="middle" {...monoText}>
          ACK
        </text>
      </g>
      <g className="text-accent">
        <rect x="62" y="56" width="96" height="22" rx="11" {...stroke} strokeWidth={2.5} />
        <path d="M74 67 H146" {...stroke} strokeWidth={2.5} markerEnd="url(#cv-arrow)" markerStart="url(#cv-arrow)" />
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
      <g className="text-ink-muted">
        {['1', '2', '3'].map((n, i) => (
          <g key={n} transform={`translate(${30 + i * 46} 34)`}>
            <rect width="30" height="22" rx="3" {...stroke} strokeWidth={1.5} />
            <text x="15" y="16" textAnchor="middle" {...monoText}>
              {n}
            </text>
          </g>
        ))}
        <path d="M172 45 H196" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
      </g>
      <g className="text-accent">
        <path d="M91 60 v18 h-46 v-18" {...stroke} strokeWidth={1.5} strokeDasharray="4 3" />
        <rect x="30" y="80" width="30" height="22" rx="3" {...stroke} />
        <text x="45" y="96" textAnchor="middle" fontSize="10" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
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
        {[0, 1, 3].map((i) => (
          <rect key={i} x={118 + i * 24} y="42" width="18" height="14" rx="2" {...stroke} strokeWidth={1.5} />
        ))}
        <rect x="166" y="82" width="18" height="14" rx="2" {...stroke} strokeWidth={1.5} strokeDasharray="3 3" />
        <path d="M175 60 v16" {...stroke} strokeWidth={1.5} strokeDasharray="3 3" />
        <text x="110" y="118" textAnchor="middle" {...monoText}>
          rớt gói nào thì thôi — không ai đòi lại
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
      {[
        { x: 34, label: '80' },
        { x: 96, label: '443' },
        { x: 158, label: '22' },
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

/** Cung điện ký ức: tòa nhà 5 tầng × 3 phòng, lộ trình đi từ tầng trệt lên. */
function PalaceBuilding({ title }: { title?: string }) {
  const floors = [0, 1, 2, 3, 4]
  return (
    <Frame title={title}>
      <g className="text-ink-muted">
        {floors.map((f) =>
          [0, 1, 2].map((p) => (
            <rect
              key={`${f}-${p}`}
              x={62 + p * 34}
              y={14 + f * 21}
              width="30"
              height="17"
              rx="2"
              {...stroke}
              strokeWidth={1.2}
            />
          )),
        )}
        <path d="M56 14 v104 h114" {...stroke} strokeWidth={1.5} />
      </g>
      <g className="text-accent">
        {/* Lộ trình: bắt đầu ở tầng trệt bên trái, đi lên nóc. */}
        <path d="M77 110 h68 M77 89 h68 M77 68 h68 M77 47 h68 M77 26 h68" {...stroke} strokeWidth={1.5} strokeDasharray="3 4" />
        <path d="M145 110 V26" {...stroke} strokeWidth={1.5} markerEnd="url(#cv-arrow)" strokeDasharray="3 4" />
        <circle cx="77" cy="110" r="3.5" fill="currentColor" />
      </g>
      <text x="182" y="122" textAnchor="middle" {...monoText}>
        15 phòng
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
}

/**
 * visualId này đã có hình riêng chưa? Hình chung GenericMail là lưới an
 * toàn lúc chạy (bài vẫn dạy được), nhưng nó im lặng — nội dung gõ sai
 * visualId sẽ không ai biết. Test nội dung dùng hàm này làm cổng chặn.
 */
export function hasVisual(visualId: string): boolean {
  return visualId in REGISTRY
}

export function ConceptVisual({ visualId, title }: { visualId: string; title?: string }) {
  const Visual = REGISTRY[visualId] ?? GenericMail
  return <Visual title={title} />
}
