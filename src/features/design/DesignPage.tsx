// Trang trưng bày design system — công cụ nội bộ để duyệt token, âm
// hiệu và component bằng mắt/tai ở cả hai theme (vào thẳng /design,
// không nằm trong menu 4 tab). Dữ liệu minh họa mô phỏng nội dung bài
// học nên để tiếng Việt như nội dung thật.
//
// NGOẠI LỆ i18n ĐƯỢC TUYÊN BỐ (08-08): trang này hardcode tiếng Việt và
// KHÔNG đi qua t(). Lý do: nó không phải màn hình của người học mà là
// bàn làm việc của người dựng app; dịch nó sang EN là thêm ~80 key vào
// hai dictionary để phục vụ đúng một người. Luật "cấm hardcode text
// trong component" vẫn nguyên giá trị cho mọi màn hình khác.

import { useState } from 'react'
import { lt } from '../../engine/ltext'
import { useT } from '../../i18n'
import { Button } from '../../components/Button'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { ProgressBar } from '../../components/ProgressBar'
import { StageMap } from '../../components/StageMap'
import { playEarcon, type EarconKind } from '../../audio/earcons'
import { XP_AMOUNTS } from '../../engine/xp'
import { NetworkLab } from '../lab/NetworkLab'
import { isLabSolved, type Topology } from '../../engine/lab'
import { parseLabSpec } from '../../engine/lab/labSchema'
import { ClinicRoom } from '../clinic/ClinicRoom'
import { PsConsole } from '../ps/PsConsole'
import { CliConsole } from '../cli/CliConsole'
import { QuestionSchema, type CliQuestion, type ClinicQuestion, type PsQuestion } from '../../engine/contentSchema'
import { gradeQuestion } from '../../engine/grading/gradeQuestion'
import { CASE_SAI_GATEWAY } from '../../../tests/fixtures/clinicFixture'
import { specTaoHangLoat } from '../../../tests/fixtures/psFixture'
import { trunkByCli } from '../../../tests/fixtures/cliFixture'
import { PalaceTour } from '../palace/PalaceTour'
import { PalaceWalk } from '../palace/PalaceWalk'
import { walkOutcomesPassed } from '../../engine/palace'
import { parsePalace } from '../../engine/palace/palaceSchema'
import { PORT_PALACE } from '../../../tests/fixtures/palaceFixture'
import { loadModules } from '../../content'
import { ConceptVisual, visualIds } from '../../components/ConceptVisual'

const SWATCHES = [
  'surface',
  'panel',
  'panel-hover',
  'edge',
  'ink',
  'ink-muted',
  'accent',
  'ok',
  'warn',
  'danger',
  'part-a',
  'part-b',
  'part-c',
] as const

// Một module 4 bài: tổng XP bài học = 4 × (retrieval + practice).
const SAMPLE_MODULE_XP = 4 * (XP_AMOUNTS.retrieval + XP_AMOUNTS.practice)

const SAMPLE_STAGES = [
  { id: 's1', title: 'Lá thư đầu tiên', state: 'done' as const },
  { id: 's2', title: 'Phong bì & địa chỉ', state: 'done' as const },
  { id: 's3', title: 'Bưu tá lên đường', state: 'active' as const },
  { id: 's4', title: 'Thư trả lời', state: 'locked' as const },
  { id: 's5', title: 'Tổng ôn', state: 'locked' as const },
]

const EARCON_KEYS: { kind: EarconKind; labelKey: string }[] = [
  { kind: 'correct', labelKey: 'design.earconCorrect' },
  { kind: 'incorrect', labelKey: 'design.earconIncorrect' },
  { kind: 'lessonComplete', labelKey: 'design.earconLessonComplete' },
  { kind: 'stageUp', labelKey: 'design.earconStageUp' },
  { kind: 'moduleComplete', labelKey: 'design.earconModuleComplete' },
  { kind: 'graduation', labelKey: 'design.earconGraduation' },
  { kind: 'wireClick', labelKey: 'design.earconWireClick' },
  { kind: 'packetFly', labelKey: 'design.earconPacketFly' },
]

// Đề lab trưng bày: chính là ca của spec Module 4 — hai máy cùng dải địa
// chỉ mà không gọi được nhau vì bị xếp nhầm VLAN. Viết thẳng ở đây như
// mọi dữ liệu minh họa khác của trang này, nhưng vẫn đi qua parseLabSpec
// nên nó phải hợp lệ y hệt một đề bài thật (lời giải giải được, đề chưa
// giải sẵn, lời giải nằm trong quyền cho phép).
const mac = (n: number) => `AA:BB:CC:00:00:${String(n).padStart(2, '0')}`

function demoPc(id: string, hostname: string, macIndex: number, ip: string) {
  return {
    kind: 'pc' as const,
    id,
    hostname,
    port: { id: 'eth0', mac: mac(macIndex) },
    ipConfig: { ip, prefix: 24 },
    gateway: null,
  }
}

function demoTopology(vlanOfPortTwo: number): Topology {
  return {
    devices: [
      demoPc('pc-a', 'PC-A (kế toán)', 1, '192.168.1.10'),
      demoPc('pc-b', 'PC-B (kế toán)', 2, '192.168.1.20'),
      demoPc('pc-c', 'PC-C (kỹ thuật)', 3, '192.168.1.30'),
      {
        kind: 'switch' as const,
        id: 'sw-1',
        hostname: 'Switch-1',
        ports: [
          { id: 'p1', vlan: 10 },
          { id: 'p2', vlan: vlanOfPortTwo },
          { id: 'p3', vlan: 20 },
          { id: 'p4', vlan: 20 },
        ],
      },
    ],
    links: [
      { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'l2', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p2' } },
      { id: 'l3', a: { deviceId: 'pc-c', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p3' } },
    ],
  }
}

const DEMO_LAB = parseLabSpec({
  initial: demoTopology(20),
  goals: [
    { kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' },
    { kind: 'ping', from: 'pc-a', to: 'pc-c', expect: 'blocked' },
  ],
  allow: {
    addDevices: [],
    removeDevices: false,
    addLinks: false,
    removeLinks: false,
    setVlan: true,
    setIp: false,
    setRoutes: false,
    maxDevices: 6,
  },
  solution: demoTopology(10),
})

/**
 * Đề TRUNK + STP của Phần D — dựng ngay tại đây thay vì mượn fixture test
 * (fixture nằm ngoài src, trang này phải tự đứng được). Vẫn đi qua
 * `parseLabSpec` nên nó hợp lệ y hệt một đề bài thật.
 *
 * Ba switch nối vòng, hai VLAN đi chung một trunk: một sơ đồ soi được cả
 * hai thứ mới của Module 14-15 — nhãn 802.1Q trên nhật ký chặng, và cổng
 * nằm im do STP.
 */
function demoRing(stpOn: boolean, trunk: boolean): unknown {
  const uplink = (id: string) =>
    trunk
      ? { id, vlan: 1, mode: 'trunk', allowedVlans: [10, 20], nativeVlan: 1 }
      : { id, vlan: 1 }
  const sw = (id: string, hostname: string, priority: number) => ({
    kind: 'switch',
    id,
    hostname,
    bridgePriority: priority,
    ports: [{ id: 'p1', vlan: 10 }, { id: 'p2', vlan: 20 }, uplink('p3'), uplink('p4')],
  })
  return {
    stpEnabled: stpOn,
    devices: [
      {
        kind: 'pc',
        id: 'pc-a',
        hostname: 'PC-A (kế toán)',
        port: { id: 'eth0', mac: 'AA:BB:CC:00:00:01' },
        ipConfig: { ip: '192.168.1.10', prefix: 24 },
        gateway: null,
      },
      {
        kind: 'pc',
        id: 'pc-b',
        hostname: 'PC-B (kế toán)',
        port: { id: 'eth0', mac: 'AA:BB:CC:00:00:02' },
        ipConfig: { ip: '192.168.1.20', prefix: 24 },
        gateway: null,
      },
      sw('sw-1', 'Switch-1', 32768),
      sw('sw-2', 'Switch-2', 4096),
      sw('sw-3', 'Switch-3', 32768),
    ],
    links: [
      { id: 'la', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p1' } },
      { id: 'lb', a: { deviceId: 'pc-b', portId: 'eth0' }, b: { deviceId: 'sw-3', portId: 'p1' } },
      { id: 'r12', a: { deviceId: 'sw-1', portId: 'p3' }, b: { deviceId: 'sw-2', portId: 'p3' } },
      { id: 'r23', a: { deviceId: 'sw-2', portId: 'p4' }, b: { deviceId: 'sw-3', portId: 'p3' } },
      { id: 'r31', a: { deviceId: 'sw-3', portId: 'p4' }, b: { deviceId: 'sw-1', portId: 'p4' } },
    ],
  }
}

const DEMO_TRUNK_STP_LAB = parseLabSpec({
  initial: demoRing(false, false),
  goals: [{ kind: 'ping', from: 'pc-a', to: 'pc-b', expect: 'reach' }],
  allow: {
    addDevices: [],
    removeDevices: false,
    addLinks: false,
    removeLinks: true,
    setVlan: false,
    setTrunk: true,
    setStp: true,
    setIp: false,
    setRoutes: false,
    maxDevices: 8,
  },
  solution: demoRing(true, true),
})

function TrunkStpShowcase() {
  const [verdict, setVerdict] = useState<'chưa nộp' | 'đạt' | 'chưa đạt'>('chưa nộp')
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Ba switch nối vòng, hai VLAN chung một dây. Bật STP cho hết bão, khai trunk hai đầu cho VLAN
        đi được — kết quả lần nộp gần nhất: <strong className="text-ink">{verdict}</strong>
      </p>
      <NetworkLab
        spec={DEMO_TRUNK_STP_LAB}
        onSubmit={(topology) =>
          setVerdict(isLabSolved(DEMO_TRUNK_STP_LAB, topology) ? 'đạt' : 'chưa đạt')
        }
      />
    </div>
  )
}

function LabShowcase() {
  const [verdict, setVerdict] = useState<'chưa nộp' | 'đạt' | 'chưa đạt'>('chưa nộp')
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Kết quả lần nộp gần nhất: <strong className="text-ink">{verdict}</strong>
      </p>
      <NetworkLab
        spec={DEMO_LAB}
        onSubmit={(topology) => setVerdict(isLabSolved(DEMO_LAB, topology) ? 'đạt' : 'chưa đạt')}
      />
    </div>
  )
}

// Ca bệnh trưng bày: đúng ca "sai gateway" của thang spec Module 11, lấy
// từ fixture engine (cùng nguồn với test) rồi bọc thành một câu hỏi
// kind 'clinic' đi qua QuestionSchema — nó phải hợp lệ y hệt câu thật
// (bệnh nhân ốm thật, lời giải chữa được, trạng thái đầu chưa đạt).
const DEMO_CLINIC = QuestionSchema.parse({
  kind: 'clinic',
  id: 'design-clinic-1',
  prompt: {
    vi: 'Chị kế toán gọi lên phòng IT: "Máy chị sáng giờ không mở được web công ty — hôm qua vẫn bình thường mà!"',
  },
  spec: CASE_SAI_GATEWAY,
  diagnosis: {
    choices: [
      { vi: 'Dây mạng bị rút hoặc đứt' },
      { vi: 'Gateway của máy trỏ nhầm địa chỉ' },
      { vi: 'DNS nội bộ ngừng chạy' },
    ],
    answerIndex: 1,
  },
  hintTopic: { vi: 'cánh cửa ra khỏi dải mạng của máy' },
}) as ClinicQuestion

function ClinicShowcase() {
  const [verdict, setVerdict] = useState<'chưa nộp' | 'đạt' | 'chưa đạt'>('chưa nộp')
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Kết quả lần nộp gần nhất: <strong className="text-ink">{verdict}</strong>
      </p>
      <ClinicRoom
        question={DEMO_CLINIC}
        onSubmit={(resp) => setVerdict(gradeQuestion(DEMO_CLINIC, resp) ? 'đạt' : 'chưa đạt')}
      />
    </div>
  )
}

// Bài terminal PowerShell trưng bày: đúng bài "hàng loạt" của spec
// Module 12, lấy từ fixture engine rồi bọc thành câu hỏi kind 'ps' đi
// qua QuestionSchema — hợp lệ y hệt câu thật (lời giải chạy được, đề
// chưa đạt sẵn).
const DEMO_PS = QuestionSchema.parse({
  kind: 'ps',
  id: 'design-ps-1',
  prompt: {
    vi: 'Phòng nhân sự vừa gửi file nhan-vien-moi.csv — ba người mới vào làm hôm nay. Tạo tài khoản cho CẢ danh sách bằng một dòng lệnh, rồi tự kiểm chứng bằng Get-ADUser.',
  },
  spec: specTaoHangLoat(),
  hintTopic: { vi: 'bơm các bản ghi CSV vào ống' },
}) as PsQuestion

function PsShowcase() {
  const [verdict, setVerdict] = useState<'chưa nộp' | 'đạt' | 'chưa đạt'>('chưa nộp')
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Kết quả lần nộp gần nhất: <strong className="text-ink">{verdict}</strong>
      </p>
      <PsConsole
        question={DEMO_PS}
        onSubmit={(resp) => setVerdict(gradeQuestion(DEMO_PS, resp) ? 'đạt' : 'chưa đạt')}
      />
    </div>
  )
}

// Bài CLI thiết bị trưng bày: đúng đề "một sợi dây, hai xóm" của Module
// 14, lấy từ fixture engine rồi bọc thành câu hỏi kind 'cli' đi qua
// QuestionSchema — hợp lệ y hệt câu thật (lời giải chạy sạch, đề chưa
// đạt sẵn). Đây cũng là chỗ soi mắt xem console có nói đúng giọng máy.
const DEMO_CLI = QuestionSchema.parse({
  kind: 'cli',
  id: 'design-cli-1',
  prompt: {
    vi: 'Kế toán và kỹ thuật ngồi ở hai tòa nhà, giữa hai switch chỉ có MỘT sợi dây. Vào console dựng trunk cho cả hai VLAN cùng đi chung sợi dây đó — nhớ làm đủ hai đầu.',
  },
  spec: trunkByCli(),
  hintTopic: { vi: 'vai của cổng nối giữa hai switch' },
}) as CliQuestion

function CliShowcase() {
  const [verdict, setVerdict] = useState<'chưa nộp' | 'đạt' | 'chưa đạt'>('chưa nộp')
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Kết quả lần nộp gần nhất: <strong className="text-ink">{verdict}</strong>
      </p>
      <CliConsole
        question={DEMO_CLI}
        onSubmit={(resp) => setVerdict(gradeQuestion(DEMO_CLI, resp) ? 'đạt' : 'chưa đạt')}
      />
    </div>
  )
}

/**
 * Cung điện ký ức: trưng cả hai chuyến đi cạnh nhau để duyệt bằng mắt
 * xem chuyến "đi lại từ trí nhớ" có lỡ lộ đáp án không.
 *
 * Ưu tiên tòa nhà THẬT trong nội dung; chưa module nào khai cung điện
 * thì dựng tạm tòa nhà mẫu (vẫn phải qua `parsePalace` nên nó hợp lệ y
 * hệt cung điện thật). Nhờ vậy trang này không bao giờ trống, và tự
 * chuyển sang nội dung thật ngay khi Module 5 có mặt.
 */
const DEMO_PALACE = loadModules().find((m) => m.palace !== undefined)?.palace ?? parsePalace(PORT_PALACE)
const DEMO_FLOOR = DEMO_PALACE.rooms.filter((r) => r.floor === 1).map((r) => r.id)

function PalaceShowcase() {
  const [verdict, setVerdict] = useState<'chưa đi' | string>('chưa đi')
  return (
    <div className="space-y-4">
      <PalaceTour palace={DEMO_PALACE} roomIds={DEMO_FLOOR} />
      <p className="text-sm text-ink-muted">
        Chuyến đi lại từ trí nhớ — kết quả: <strong className="text-ink">{verdict}</strong>
      </p>
      <PalaceWalk
        palace={DEMO_PALACE}
        roomIds={DEMO_FLOOR}
        onComplete={(outcomes) =>
          setVerdict(
            walkOutcomesPassed(outcomes, DEMO_FLOOR)
              ? 'đạt — nhớ được cả đoạn'
              : 'chưa đạt — có phòng phải mở đáp án',
          )
        }
      />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b border-edge pb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function DesignPage() {
  const t = useT()
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl font-bold">{t('design.title')}</h1>

      <Section title={t('design.palette')}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SWATCHES.map((name) => (
            <div key={name} className="flex items-center gap-3 rounded-md border border-edge bg-panel p-3">
              <span className="size-8 shrink-0 rounded border border-edge" style={{ background: `var(--${name})` }} />
              <span className="font-mono text-xs text-ink-muted">--{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t('design.buttons')}>
        <div className="flex items-center gap-3">
          <Button>Bắt đầu học</Button>
          <Button variant="ghost">Đào sâu hơn</Button>
          <Button disabled>Bắt đầu học</Button>
        </div>
      </Section>

      <Section title={t('design.feedback')}>
        <div className="flex flex-col gap-3">
          <FeedbackBanner state={{ kind: 'correct' }} />
          <FeedbackBanner state={{ kind: 'incorrect', tier: 1, topic: 'địa chỉ IP' }} />
          <FeedbackBanner
            state={{
              kind: 'incorrect',
              tier: 2,
              topic: 'địa chỉ IP',
              hint: 'Địa chỉ nhà nằm NGOÀI phong bì để bưu tá đọc được — trường nào của gói tin cũng lộ ra ngoài như vậy?',
            }}
          />
          <FeedbackBanner
            state={{
              kind: 'incorrect',
              tier: 3,
              topic: 'địa chỉ IP',
              hint: 'Địa chỉ nhà nằm NGOÀI phong bì để bưu tá đọc được — trường nào của gói tin cũng lộ ra ngoài như vậy?',
              solution:
                'Đáp án là địa chỉ IP đích: router chỉ đọc phần "ngoài phong bì" (header) để biết chuyển tiếp đi đâu, không mở nội dung bên trong.',
            }}
          />
        </div>
      </Section>

      <Section title={t('design.progressBar')}>
        <div className="flex flex-col gap-4">
          <ProgressBar earnedXp={0} totalXp={SAMPLE_MODULE_XP} />
          <ProgressBar earnedXp={SAMPLE_MODULE_XP / 2} totalXp={SAMPLE_MODULE_XP} />
          <ProgressBar earnedXp={SAMPLE_MODULE_XP} totalXp={SAMPLE_MODULE_XP} />
        </div>
      </Section>

      <Section title={t('design.stageMap')}>
        <div className="rounded-md border border-edge bg-panel p-5">
          <StageMap stages={SAMPLE_STAGES} />
        </div>
      </Section>

      <Section title={t('lab.title')}>
        <LabShowcase />
      </Section>

      <Section title="Phòng lab — trunk 802.1Q và STP (Phần D)">
        <TrunkStpShowcase />
      </Section>

      <Section title={t('clinic.title')}>
        <ClinicShowcase />
      </Section>

      <Section title="Terminal PowerShell">
        <PsShowcase />
      </Section>

      <Section title="Console thiết bị — CLI kiểu IOS (Phần D)">
        <CliShowcase />
      </Section>

      <Section title={lt(DEMO_PALACE.title)}>
        <PalaceShowcase />
      </Section>

      {/* Bày HẾT hình khái niệm ra một chỗ: hình vẽ tay chỉ lộ lỗi khi
          nhìn (chữ đè lên nét, nét tràn khung), mà đi từng bài để soi thì
          không ai làm nổi. */}
      <Section title={`Hình khái niệm (${visualIds().length})`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visualIds().map((id) => (
            <div key={id} className="flex flex-col gap-1">
              <ConceptVisual visualId={id} title={id} />
              <p className="font-mono text-[11px] text-ink-muted">{id}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t('design.earcons')}>
        <div className="flex items-center gap-3">
          {EARCON_KEYS.map(({ kind, labelKey }) => (
            <Button key={kind} variant="ghost" onClick={() => playEarcon(kind)}>
              {t(labelKey)}
            </Button>
          ))}
        </div>
      </Section>
    </div>
  )
}
