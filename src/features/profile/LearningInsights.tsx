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
import { AlertCircle, Brain, CalendarRange } from 'lucide-react'
import { lt } from '../../engine/ltext'
import type { WeakSpot, WeekActivity } from '../../engine/mistakeLog'
import type { ModuleMemory } from '../../engine/freshness'
import type { Module } from '../../engine/contentSchema'
import { useT } from '../../i18n'

/** Một hàng của bản đồ trí nhớ: module + độ tươi trung bình của thẻ. */
export interface MemoryRow extends ModuleMemory {
  title: Module['title']
}

/** dd/mm — cùng cách rút gọn với biểu đồ drill. */
function shortDate(iso: string): string {
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)}`
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

export function WeeklyRhythm({ weeks }: { weeks: WeekActivity[] }) {
  const t = useT()
  const titleId = useId()
  const busiest = Math.max(...weeks.map((w) => w.total), 0)
  // Chưa có tuần nào làm được việc gì thì đồ thị chỉ là tám cột 0 — chưa
  // kể được câu chuyện nào, đợi có dữ liệu đã.
  if (busiest === 0) return null

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
      <p className="text-xs leading-relaxed text-ink-muted">{t('profile.rhythmIntro')}</p>

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
