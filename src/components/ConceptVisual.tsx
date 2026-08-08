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
// labelX đặt ngay sau ô cuối của từng hàng (ô rộng 18, cách nhau 26,
// hàng bắt đầu ở x=28). Hàng C dài nhất nên nhãn của nó là chỗ dễ tràn
// khung nhất — đã từng tràn thật, chữ "C · 8-12" bị cắt mất đuôi.
const COURSE_PARTS = [
  { part: 'A', color: 'var(--part-a)', orders: [1, 2, 3], y: 30, labelX: 106, labelY: 43 },
  { part: 'B', color: 'var(--part-b)', orders: [4, 5, 6, 7], y: 58, labelX: 132, labelY: 71 },
  { part: 'C', color: 'var(--part-c)', orders: [8, 9, 10, 11, 12], y: 86, labelX: 158, labelY: 99 },
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
