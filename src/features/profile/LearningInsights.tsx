// Hai mục "đọc lại chính mình" ở trang Hồ sơ (kho ý tưởng A3 + H6).
//
// Cả hai chỉ ĐỌC dữ liệu người học đã tự tạo ra khi học — không thêm
// một byte persist nào, không cộng XP, không xếp hạng ai với ai.
//
// Giọng của mục "hay vấp" phải giữ đúng luật 4.4: vấp là DỮ LIỆU, không
// phải lời chê. Không màu đỏ, không chữ "sai" — chỗ vấp tô hổ phách như
// mọi cảnh báo mềm khác của app, và câu dẫn nói rõ vì sao nó đáng xem.

import { Link } from 'react-router'
import { useId } from 'react'
import { AlertCircle, Brain, CalendarRange, ChartNoAxesColumn, MessageSquareWarning, RotateCcw, Target, TrendingUp } from 'lucide-react'
import { lt } from '../../engine/ltext'
import type { MistakeAnalysis, MistakeBucket, WeakSpot, WeekActivity } from '../../engine/mistakeLog'
import type { ModuleMemory } from '../../engine/freshness'
import type { DongSoSanh, LatCatThang } from '../../engine/soSanhThang'
import { QUANG_DAI_PHUT, type QuangTuan } from '../../engine/quangHoc'
import type { Module, Question } from '../../engine/contentSchema'
import type { DisputedAnswer } from '../../store/progress'
import { useT, type TFunc } from '../../i18n'

/** Một dòng sổ góp ý, đã ghép với đề bài để đọc được. */
export interface DisputedRow extends DisputedAnswer {
  /** null khi nội dung đã đổi và không còn câu đó — vẫn hiện id. */
  prompt: Question['prompt'] | null
}

/** Một hàng của bản đồ trí nhớ: module + độ tươi trung bình của thẻ. */
export interface MemoryRow extends ModuleMemory {
  title: Module['title']
}

/** dd/mm — cùng cách rút gọn với biểu đồ drill. */
function shortDate(iso: string): string {
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)}`
}

/** Một dòng "chắc mà không nhớ", đã tra ra tên đọc được. */
export interface AoGiacHienThi {
  cardId: string
  lan: number
  /** Mặt trước của thẻ; null khi nội dung đã đổi và không còn thẻ đó. */
  ten: string | null
}

/**
 * Ảo giác quen mặt (kho ý tưởng I4) — những thẻ người học thấy CHẮC mà
 * rồi không nhớ ra, lặp đi lặp lại.
 *
 * Đặt cạnh "chỗ hay vấp" vì cùng một việc: nói ra chỗ đáng quay lại. Chỉ
 * khác nguồn — chỗ hay vấp đọc số lần thử, còn mục này đọc khoảng lệch
 * giữa lời tự chấm và chuyện đã xảy ra, thứ mà chính người học không tự
 * thấy được nếu không ai ghi hộ.
 */
export function AoGiacList({ rows }: { rows: AoGiacHienThi[] }) {
  const t = useT()
  // Chưa đủ dữ liệu thì không dựng hộp rỗng — cùng luật với mục hay vấp.
  if (rows.length === 0) return null

  return (
    <section
      aria-labelledby="aogiac-title"
      className="mt-6 flex flex-col gap-3 rounded-md border border-edge bg-panel px-5 py-4"
    >
      <div className="flex items-center gap-2">
        <Brain size={17} aria-hidden className="shrink-0 text-warn" />
        <h2 id="aogiac-title" className="text-sm font-semibold text-ink">
          {t('profile.aoGiacTitle')}
        </h2>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">{t('profile.aoGiacIntro')}</p>
      <ol className="flex flex-col gap-2">
        {rows.map((row) => (
          <li
            key={row.cardId}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-edge bg-panel-hover px-4 py-3"
          >
            <span className="min-w-[10rem] flex-1 text-sm text-ink">{row.ten ?? row.cardId}</span>
            <span className="shrink-0 font-mono text-xs text-warn">
              {t('profile.aoGiacLan', { count: row.lan })}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function WeakSpotList({ spots }: { spots: WeakSpot[] }) {
  const t = useT()
  // Chưa vấp chỗ nào thì KHÔNG dựng mục rỗng: một cái hộp trống nhắc
  // "bạn chưa có lỗi nào" là lời khen rỗng, và với người mới nó chỉ
  // chiếm chỗ.
  if (spots.length === 0) return null

  return (
    <section aria-labelledby="weak-title" className="mt-6 flex flex-col gap-3 rounded-md border border-edge bg-panel px-5 py-4">
      <div className="flex items-center gap-2">
        <AlertCircle size={17} aria-hidden className="shrink-0 text-warn" />
        <h2 id="weak-title" className="text-sm font-semibold text-ink">
          {t('profile.weakTitle')}
        </h2>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">{t('profile.weakIntro')}</p>
      <ol className="flex flex-col gap-2">
        {spots.map((spot) => (
          <li
            key={`${spot.lessonId}:${spot.questionId}`}
            className="flex flex-wrap items-start gap-x-3 gap-y-1 rounded-md border border-edge bg-panel-hover px-4 py-3"
          >
            <span className="min-w-[12rem] flex-1 text-sm text-ink">{lt(spot.prompt)}</span>
            <span className="shrink-0 font-mono text-xs text-warn">
              {t('profile.weakSlips', { count: spot.failCount })}
              {spot.usedSolution && ` · ${t('profile.weakUsedSolution')}`}
            </span>
            <Link
              to={`/bai/${spot.lessonId}`}
              className="shrink-0 text-xs font-semibold text-accent hover:underline"
              // Tựa bài đi vào tên đọc được: "Xem lại bài" đứng một mình
              // thì trình đọc màn hình nghe năm dòng giống hệt nhau.
              aria-label={t('profile.weakGoLessonAria', { lesson: lt(spot.lessonTitle) })}
            >
              {t('profile.weakGoLesson')}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}

const W = 340
const H = 96
const PAD_X = 6
const PAD_TOP = 16
const BASE = H - 18

/**
 * Quãng ngồi liền dài nhất trong tuần — một dòng đặt trong thẻ nếp học.
 *
 * GIỌNG là phần khó nhất ở đây, và nó phải nhất quán với lời nhắc nghỉ:
 * app vừa rủ người ta nghỉ sau 25 phút thì không thể quay lại vỗ tay vì
 * họ ngồi liền 90 phút. Nên đây là DỮ LIỆU chứ không phải thành tích —
 * không "kỷ lục mới!", không huy hiệu, và quãng vượt ngưỡng thì nói
 * thẳng cái giá của nó thay vì khen.
 *
 * Đặt cạnh đồ thị 8 tuần vì cùng một câu hỏi: nếp học của mình ra sao.
 * Đồ thị đo BỀ RỘNG (tuần nào làm được mấy việc), dòng này đo BỀ SÂU của
 * một lần ngồi — hai mặt của cùng một thói quen.
 */
function QuangNgoiLien({ tuanNay, tuanTruoc }: { tuanNay: QuangTuan; tuanTruoc: QuangTuan }) {
  const t = useT()
  if (tuanNay.phut === 0) return null
  return (
    <p className="text-xs leading-relaxed text-ink-muted">
      <span className="font-medium text-ink">{t('profile.quangTitle', { phut: tuanNay.phut })}</span>{' '}
      {tuanTruoc.phut > 0 && t('profile.quangTuanTruoc', { phut: tuanTruoc.phut })}
      {tuanNay.phut >= QUANG_DAI_PHUT && <span className="text-warn"> {t('profile.quangDai')}</span>}
    </p>
  )
}

export function WeeklyRhythm({
  weeks,
  quangTuanNay,
  quangTuanTruoc,
  daTungHoc,
}: {
  weeks: WeekActivity[]
  quangTuanNay: QuangTuan
  quangTuanTruoc: QuangTuan
  /** Đã từng học buổi nào chưa — dù là từ rất lâu rồi. */
  daTungHoc: boolean
}) {
  const t = useT()
  const titleId = useId()
  const busiest = Math.max(...weeks.map((w) => w.total), 0)
  // Người MỚI TINH: tám cột 0 chưa kể được câu chuyện nào, đợi có dữ
  // liệu đã. Nhưng người ĐÃ TỪNG HỌC mà tám tuần đều trống thì tám cột
  // trống CHÍNH LÀ câu chuyện — "bạn đã nghỉ tám tuần" (phát hiện K4,
  // khối 21.47). Ẩn đúng lúc đó là giấu điều duy nhất đáng nói.
  if (busiest === 0 && !daTungHoc) return null

  const max = Math.max(busiest, 1)
  const innerW = W - PAD_X * 2
  const slot = innerW / weeks.length
  const x = (i: number) => PAD_X + slot * i + slot / 2
  const y = (v: number) => BASE - (v / max) * (BASE - PAD_TOP)

  return (
    <section aria-labelledby="rhythm-title" className="mt-6 flex flex-col gap-3 rounded-md border border-edge bg-panel px-5 py-4">
      <div className="flex items-center gap-2">
        <CalendarRange size={17} aria-hidden className="shrink-0 text-accent" />
        <h2 id="rhythm-title" className="text-sm font-semibold text-ink">
          {t('profile.rhythmTitle')}
        </h2>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">
        {busiest === 0 ? t('profile.rhythmNghiHet') : t('profile.rhythmIntro')}
      </p>
      <QuangNgoiLien tuanNay={quangTuanNay} tuanTruoc={quangTuanTruoc} />

      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={titleId} className="w-full">
        <title id={titleId}>{t('profile.rhythmTitle')}</title>
        <line x1={PAD_X} y1={BASE} x2={W - PAD_X} y2={BASE} stroke="var(--edge)" strokeWidth="1" />
        <line x1={PAD_X} y1={y(max)} x2={W - PAD_X} y2={y(max)} stroke="var(--edge)" strokeWidth="1" strokeDasharray="3 4" />
        <text x={PAD_X} y={y(max) - 3} fontSize="8" fill="var(--ink-muted)">
          {max}
        </text>
        {weeks.map((week, i) => (
          <g key={week.weekStart}>
            <rect x={x(i) - slot / 2} y={0} width={slot} height={H} fill="transparent">
              <title>{`${shortDate(week.weekStart)}: ${week.total}`}</title>
            </rect>
            {/* Tuần nghỉ vẫn có một vạch mảnh ở đáy — khoảng trống phải
                NHÌN THẤY được, đó mới là thứ baseline dạy người ta đọc. */}
            <rect
              x={x(i) - 8}
              y={week.total === 0 ? BASE - 2 : y(week.total)}
              width={16}
              height={week.total === 0 ? 2 : Math.max(BASE - y(week.total), 2)}
              rx={3}
              fill={week.total === 0 ? 'var(--edge)' : 'var(--accent)'}
            />
            {(i === 0 || i === weeks.length - 1) && (
              <text x={x(i)} y={H - 5} textAnchor="middle" fontSize="8" fill="var(--ink-muted)">
                {shortDate(week.weekStart)}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Biểu đồ không bao giờ là nguồn DUY NHẤT (nếp ProgressChart). */}
      <table className="sr-only">
        <caption>{t('profile.rhythmTitle')}</caption>
        <tbody>
          {weeks.map((week) => (
            <tr key={week.weekStart}>
              <td>{week.weekStart}</td>
              <td>{t('profile.rhythmRow', { lessons: week.lessons, drills: week.drills })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

/**
 * Bản đồ trí nhớ (kho ý tưởng A1) — mỗi module một thanh MỜ DẦN theo độ
 * tươi trung bình của các thẻ thuộc module đó.
 *
 * Vì sao ở đây mà không ở phiên ôn: con số "trí nhớ còn 12%" đọc ngay
 * trước lúc lật thẻ là lời mời bỏ cuộc, và nó bẻ gãy đúng động tác nhớ
 * lại mà hộp ôn tập sinh ra để tạo. Ở trang Hồ sơ thì nó là tấm gương,
 * không phải lời phán trước trận.
 *
 * Thanh KHÔNG bao giờ rỗng hẳn: một vạch mảnh còn lại để hàng nào cũng
 * đọc được là "có thẻ ở đây" (cùng luật với tuần nghỉ của đồ thị nếp học).
 */
export function MemoryMap({ rows }: { rows: MemoryRow[] }) {
  const t = useT()
  if (rows.length === 0) return null

  return (
    <section aria-labelledby="memory-title" className="mt-6 flex flex-col gap-3 rounded-md border border-edge bg-panel px-5 py-4">
      <div className="flex items-center gap-2">
        <Brain size={17} aria-hidden className="shrink-0 text-accent" />
        <h2 id="memory-title" className="text-sm font-semibold text-ink">
          {t('profile.memoryTitle')}
        </h2>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">{t('profile.memoryIntro')}</p>
      <ul className="flex flex-col gap-2">
        {rows.map((row) => {
          const pct = Math.round(row.freshness * 100)
          return (
            <li key={row.moduleId} className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="min-w-[9rem] flex-1 text-sm text-ink">{lt(row.title)}</span>
              <span
                className="h-2 w-32 shrink-0 rounded-full bg-panel-hover"
                role="img"
                aria-label={t('profile.memoryRowAria', { module: lt(row.title), pct, cards: row.cards })}
              >
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: `${Math.max(pct, 3)}%`, opacity: 0.35 + row.freshness * 0.65 }}
                />
              </span>
              <span className="w-24 shrink-0 text-right font-mono text-xs text-ink-muted">
                {row.due > 0 ? (
                  <span className="text-warn">{t('profile.memoryDue', { count: row.due })}</span>
                ) : (
                  t('profile.memoryCards', { count: row.cards })
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/** Ba chữ phán cho một dòng so sánh — tra bảng TĨNH, không ghép key động. */
const HUONG_KEY: Record<DongSoSanh['huong'], string> = {
  tien: 'profile.thangTien',
  ngang: 'profile.thangNgang',
  lui: 'profile.thangLui',
}

const HUONG_MAU: Record<DongSoSanh['huong'], string> = {
  tien: 'text-ok',
  ngang: 'text-ink-muted',
  lui: 'text-warn',
}

/**
 * "So với chính mình tháng trước" (kho ý tưởng I3).
 *
 * Bảng phân tích ngay dưới chỉ biết HIỆN TẠI. Mục này là chiều thứ hai:
 * cùng những dạng câu ấy, hồi đầu tháng trước bạn vấp bao nhiêu phần.
 *
 * Ba luật giữ cho nó không nói dối:
 * - **Nói rõ đây là trung bình cộng dồn từ đầu khóa** — nó nhích chậm,
 *   không biết điều đó thì người học đọc "45% → 43%" thành "tháng này
 *   mình gần như giậm chân", trong khi có thể tháng này họ làm rất tốt.
 * - **Chưa đủ mẫu thì không phán một chữ nào**, y hệt bảng phân tích.
 * - **Tin xấu vẫn hiện** (hổ phách, không phải đỏ — luật 4.4): giấu
 *   chiều đi xuống thì chiều đi lên cũng hết đáng tin.
 */
export function SoSanhThangCard({
  moc,
  rows,
  dangCho,
}: {
  /** Mốc đem ra so; null = chưa có tháng nào khác để so. */
  moc: LatCatThang | null
  rows: DongSoSanh[]
  /** Đã cất mốc tháng này rồi nhưng chưa có gì để so — nói một câu chờ. */
  dangCho: boolean
}) {
  const t = useT()
  if (moc === null || rows.length === 0) {
    if (!dangCho) return null
    return (
      <section className="mt-6 rounded-md border border-edge bg-panel px-5 py-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={17} aria-hidden className="shrink-0 text-accent" />
          <h2 className="text-sm font-semibold text-ink">{t('profile.thangTitle')}</h2>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-ink-muted">{t('profile.thangCho')}</p>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="thang-title"
      className="mt-6 flex flex-col gap-3 rounded-md border border-edge bg-panel px-5 py-4"
    >
      <div className="flex items-center gap-2">
        <TrendingUp size={17} aria-hidden className="shrink-0 text-accent" />
        <h2 id="thang-title" className="text-sm font-semibold text-ink">
          {t('profile.thangTitle')}
        </h2>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">{t('profile.thangIntro', { ngay: shortDate(moc.ngay) })}</p>
      <ul className="flex flex-col gap-1">
        {rows.map((row) => {
          const truoc = Math.round(row.rateTruoc * 100)
          const nay = Math.round(row.rateNay * 100)
          return (
            <li key={row.key} className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="min-w-[8rem] flex-1 text-sm text-ink">{t(`profile.kind.${row.key}`)}</span>
              <span
                className="shrink-0 font-mono text-xs text-ink-muted"
                role="img"
                aria-label={t('profile.thangRowAria', {
                  kind: t(`profile.kind.${row.key}`),
                  truoc,
                  nay,
                  attempted: row.attemptedNay,
                })}
              >
                {t('profile.thangDong', { truoc, nay })}
              </span>
              <span className={`w-32 shrink-0 text-right text-xs font-medium ${row.duMau ? HUONG_MAU[row.huong] : 'text-ink-muted'}`}>
                {row.duMau ? t(HUONG_KEY[row.huong]) : t('profile.thangThin')}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/**
 * PHÂN TÍCH chỗ hay sai (khối 21.8) — trả lời câu hỏi mà danh sách 5 câu
 * bên dưới không trả lời được: vấp theo KIỂU nào.
 *
 * Ba lát cắt, và một dòng kết luận đứng đầu. Giọng giữ đúng luật 4.4:
 * đây là bản đồ để quay lại, không phải bảng điểm — không màu đỏ, không
 * chữ chê, và chỗ nào chưa đủ dữ liệu thì NÓI THẲNG là chưa đủ thay vì
 * phán bừa cho có.
 */
export function MistakeAnalysisCard({
  analysis,
  moduleTitles,
  drillSize,
}: {
  analysis: MistakeAnalysis
  moduleTitles: Record<string, Module['title']>
  /** Số câu phiên luyện lại sẽ hỏi — 0 thì không mời. */
  drillSize: number
}) {
  const t = useT()
  // Chưa vấp lần nào thì không dựng mục: một bản phân tích toàn số 0 chỉ
  // chiếm chỗ, và với người mới nó là lời khen rỗng.
  if (analysis.stumbled === 0) return null

  const kinds = analysis.byKind.filter((k) => k.stumbled > 0)
  const modules = analysis.byModule.filter((m) => m.stumbled > 0).slice(0, 5)
  const topics = analysis.byTopic.slice(0, 5)

  return (
    <section aria-labelledby="analysis-title" className="mt-6 flex flex-col gap-4 rounded-md border border-edge bg-panel px-5 py-4">
      <div className="flex items-center gap-2">
        <ChartNoAxesColumn size={17} aria-hidden className="shrink-0 text-accent" />
        <h2 id="analysis-title" className="text-sm font-semibold text-ink">
          {t('profile.analysisTitle')}
        </h2>
      </div>

      {/* Dòng kết luận: chỉ nói khi có nhóm ĐỦ MẪU, không thì nói thật
          là chưa đủ dữ liệu (engine trả toughestKind = null). */}
      <p className="text-sm leading-relaxed text-ink">
        {analysis.toughestKind === null
          ? t('profile.analysisNotEnough', { stumbled: analysis.stumbled, attempted: analysis.attempted })
          : t('profile.analysisHeadline', {
              kind: t(`profile.kind.${analysis.toughestKind.key}`),
              pct: Math.round(analysis.toughestKind.rate * 100),
              attempted: analysis.toughestKind.attempted,
            })}
      </p>
      <p className="text-xs leading-relaxed text-ink-muted">
        {t('profile.analysisTotals', {
          stumbled: analysis.stumbled,
          attempted: analysis.attempted,
          fails: analysis.fails,
          solutions: analysis.usedSolution,
        })}
      </p>

      {/* Phân tích mà không có cửa đi tiếp thì mới xong nửa việc: nút này
          soạn thẳng một phiên gặp lại đúng những câu đã vấp (KHÔNG XP). */}
      {drillSize > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/luyen-lai"
            className="inline-flex items-center gap-2 rounded-md border border-accent/40 px-4 py-2 text-sm font-semibold text-accent hover:bg-panel-hover"
          >
            <Target size={15} aria-hidden />
            {t('profile.analysisDrillAction', { count: drillSize })}
          </Link>
          <span className="text-xs text-ink-muted">{t('profile.analysisDrillNote')}</span>
        </div>
      )}

      <BucketList title={t('profile.analysisByKind')} rows={kinds} label={(b) => t(`profile.kind.${b.key}`)} t={t} />
      <BucketList
        title={t('profile.analysisByModule')}
        rows={modules}
        label={(b) => lt(moduleTitles[b.key] ?? { vi: b.key })}
        t={t}
      />

      {topics.length > 0 && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {t('profile.analysisByTopic')}
          </h3>
          <ul className="flex flex-col gap-1">
            {topics.map((topic) => (
              <li key={topic.key} className="flex flex-wrap items-baseline gap-x-2 text-sm text-ink">
                <span className="flex-1">{lt(topic.topic ?? { vi: topic.key })}</span>
                <span className="font-mono text-xs text-warn">{t('profile.analysisTopicFails', { count: topic.fails })}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

/** Một lát cắt: nhãn + thanh tỉ lệ vấp + số câu. Nhóm chưa đủ mẫu nói rõ. */
function BucketList({
  title,
  rows,
  label,
  t,
}: {
  title: string
  rows: MistakeBucket[]
  label: (bucket: MistakeBucket) => string
  t: TFunc
}) {
  if (rows.length === 0) return null
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{title}</h3>
      <ul className="flex flex-col gap-1">
        {rows.map((row) => (
          <li key={row.key} className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="min-w-[8rem] flex-1 text-sm text-ink">{label(row)}</span>
            <span
              className="h-2 w-24 shrink-0 rounded-full bg-panel-hover"
              role="img"
              aria-label={t('profile.analysisRowAria', {
                label: label(row),
                stumbled: row.stumbled,
                attempted: row.attempted,
              })}
            >
              <span
                className="block h-full rounded-full bg-warn"
                style={{ width: `${Math.max(Math.round(row.rate * 100), 4)}%` }}
              />
            </span>
            <span className="w-28 shrink-0 text-right font-mono text-xs text-ink-muted">
              {row.ranked
                ? t('profile.analysisRatio', { stumbled: row.stumbled, attempted: row.attempted })
                : t('profile.analysisThin', { stumbled: row.stumbled, attempted: row.attempted })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * "Câu bạn cho là mình đúng" (khối 21.11) — đọc lại sổ góp ý đã ghi ở
 * màn phản hồi. Hai vai, cả hai đều thật:
 *
 *  - với NGƯỜI HỌC: chứng cứ rằng lời họ nói không rơi vào hư không,
 *    kèm đường quay lại chính bài đó để tự xem lại;
 *  - với NGƯỜI SOẠN BÀI: nguyên văn câu người học gõ — thứ duy nhất
 *    giúp soi ra danh sách đáp án đang hẹp hơn thực tế (lớp lỗi đã trả
 *    giá ở khối 21.10). Trong buổi test người thật, đây là chỗ mở ra
 *    xem đầu tiên.
 */
export function DisputedList({ rows, onClear }: { rows: DisputedRow[]; onClear: (questionId: string) => void }) {
  const t = useT()
  if (rows.length === 0) return null

  return (
    <section aria-labelledby="dispute-title" className="mt-6 flex flex-col gap-3 rounded-md border border-edge bg-panel px-5 py-4">
      <div className="flex items-center gap-2">
        <MessageSquareWarning size={17} aria-hidden className="shrink-0 text-accent" />
        <h2 id="dispute-title" className="text-sm font-semibold text-ink">
          {t('profile.disputeTitle')}
        </h2>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">{t('profile.disputeIntro')}</p>
      <ul className="flex flex-col gap-2">
        {rows.map((row) => (
          <li key={row.questionId} className="flex flex-col gap-1 rounded-md border border-edge bg-panel-hover px-4 py-3">
            <p className="text-sm text-ink">{row.prompt === null ? row.questionId : lt(row.prompt)}</p>
            <p className="font-mono text-xs text-ink-muted">{t('profile.disputeAnswer', { answer: row.answer })}</p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Câu của ĐỀ THI không thuộc bài học nào (lessonId trống) —
                  nói ra là câu đề thi thay vì dựng một link chết. */}
              {row.lessonId === '' ? (
                <span className="text-xs text-ink-muted">{t('profile.disputeFromTest')}</span>
              ) : (
                <Link to={`/bai/${row.lessonId}`} className="text-xs font-medium text-accent hover:underline">
                  {t('profile.disputeOpenLesson')}
                </Link>
              )}
              <button
                onClick={() => onClear(row.questionId)}
                className="text-xs font-medium text-ink-muted underline decoration-dotted underline-offset-4 hover:text-ink"
              >
                {t('profile.disputeClear')}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Một dòng "hay quên", đã tra ra tên đọc được và đường về bài dạy nó. */
export interface HayQuenHienThi {
  cardId: string
  soLanQuen: number
  /** Mặt trước của thẻ; null khi nội dung đã đổi và không còn thẻ đó. */
  ten: string | null
  /** Bài đã dạy thứ này; null thì dòng vẫn hiện, chỉ không có đường mở. */
  lessonId: string | null
  moduleTitle: Module['title'] | null
}

/**
 * "Thứ bạn hay quên" — đọc `lapses` của hộp ôn tập (chủ dự án hỏi 08-12).
 *
 * Khác "chỗ hay vấp" ngay bên trên, và khác ở chỗ quan trọng: chỗ hay vấp
 * đếm số lần thử sai LÚC ĐANG HỌC (kiến thức chưa vào), còn mục này đếm
 * số lần đã học xong, tưởng nhớ rồi, để vài ngày lại quên. Thứ hai mới là
 * thứ đáng đem đi dạy lại theo cách khác — nó nói rằng cách dạy hiện tại
 * CÓ VÀO nhưng KHÔNG BÁM.
 *
 * KHÁC MỌI MỤC CÙNG TRANG: mục này hiện CẢ KHI TRỐNG. Các mục kia tự ẩn
 * để khỏi dựng hộp rỗng, nhưng chính vì thế mà người học đi tìm "chỗ xem
 * những câu hay quên" không thấy nó ở đâu và tưởng app không có — đúng
 * chuyện đã xảy ra. Một hộp trống nói rõ "chưa có gì" vẫn trả lời được
 * câu hỏi "app có chỗ này không"; một hộp vắng mặt thì không.
 */
export function HayQuenList({ rows }: { rows: HayQuenHienThi[] }) {
  const t = useT()
  return (
    <section
      aria-labelledby="hayquen-title"
      className="mt-6 flex flex-col gap-3 rounded-md border border-edge bg-panel px-5 py-4"
    >
      <div className="flex items-center gap-2">
        <RotateCcw size={17} aria-hidden className="shrink-0 text-warn" />
        <h2 id="hayquen-title" className="text-sm font-semibold text-ink">
          {t('profile.hayQuenTitle')}
        </h2>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">{t('profile.hayQuenIntro')}</p>
      {rows.length === 0 ? (
        <p className="text-xs text-ink-muted">{t('profile.hayQuenEmpty')}</p>
      ) : (
        <ol className="flex flex-col gap-2">
          {rows.map((row) => (
            <li
              key={row.cardId}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-edge bg-panel-hover px-4 py-3"
            >
              <span className="min-w-[10rem] flex-1 text-sm text-ink">{row.ten ?? row.cardId}</span>
              {row.moduleTitle !== null && (
                <span className="shrink-0 text-xs text-ink-muted">{lt(row.moduleTitle)}</span>
              )}
              <span className="shrink-0 font-mono text-xs text-warn">
                {t('profile.hayQuenLan', { count: row.soLanQuen })}
              </span>
              {row.lessonId !== null && (
                <Link
                  to={`/bai/${row.lessonId}`}
                  className="shrink-0 text-xs font-medium text-accent hover:underline"
                >
                  {t('profile.hayQuenMoBai')}
                </Link>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
