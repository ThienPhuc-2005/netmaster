// Drill VLSM (spec v2 Module 13) — bài THIẾT KẾ hằng ngày.
//
// Khác drill subnet ở đúng một chỗ, nhưng chỗ đó đổi cả hình dạng màn
// hình: bài này không có MỘT ô đáp án. Người học nhận một dải và một
// danh sách phòng ban, rồi tự quyết cắt thế nào — nên mặt bàn là một
// BẢNG THIẾT KẾ, mỗi phòng một dòng.
//
// Thang 3 tầng (nguyên tắc 4) bám đúng ba tiêu chí của engine:
//   tầng 1 — nói tiêu chí nào chưa đạt (đúng / đủ / không phí đất);
//   tầng 2 — chỉ ra TỪNG DÒNG hỏng ở đâu, vẫn không đọc hộ đáp án;
//   tầng 3 — mới bày một cách cắt đạt yêu cầu.
//
// Đề sinh DETERMINISTIC theo ngày (+ số phiên trong ngày), y như drill
// subnet: mở lại giữa chừng vẫn gặp đúng bộ đề đó, không reroll né bài.

import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Timer } from 'lucide-react'
import {
  gradeVlsm,
  generateVlsmSession,
  solveVlsm,
  describeBlock,
  type VlsmAssignment,
  type VlsmEvaluation,
  type VlsmProblem,
} from '../../engine/subnet/vlsm'
import { mulberry32 } from '../../engine/subnet/drill'
import { feedbackTier } from '../../engine/lessonMachine'
import { todayIso, useProgress } from '../../store/progress'
import { useT, type TFunc } from '../../i18n'
import { playEarcon } from '../../audio/earcons'
import { Button } from '../../components/Button'
import { FeedbackRegion, type FeedbackState } from '../../components/FeedbackBanner'
import { ProgressChart } from './ProgressChart'

/** Số đề một phiên — nặng hơn bài subnet nhiều nên 5 là đủ dài. */
const SESSION_SIZE = 5

type Phase = 'idle' | 'running' | 'done'

/** Ô nhập của một phòng ban: địa chỉ mạng + prefix, giữ nguyên dạng chữ. */
interface Row {
  ip: string
  prefix: string
}

function emptyRows(problem: VlsmProblem): Record<string, Row> {
  return Object.fromEntries(problem.needs.map((n) => [n.id, { ip: '', prefix: '' }]))
}

/** Chữ → khối để đưa vào bộ chấm. Ô trống thì KHÔNG nộp dòng đó (thành "bỏ sót"). */
function toAssignments(problem: VlsmProblem, rows: Record<string, Row>): VlsmAssignment[] {
  return problem.needs.flatMap((need) => {
    const row = rows[need.id]
    if (row === undefined || row.ip.trim() === '' || row.prefix.trim() === '') return []
    return [{ needId: need.id, ip: row.ip.trim(), prefix: Number(row.prefix.trim().replace('/', '')) }]
  })
}

/** Tên phòng ban là chuyện HIỂN THỊ — engine chỉ giữ khóa ngữ nghĩa. */
function deptName(t: TFunc, index: number): string {
  return t('vlsm.deptName', { n: index + 1 })
}

export function VlsmDrill() {
  const t = useT()
  const drillHistory = useProgress((s) => s.drillHistory)
  const recordDrillSession = useProgress((s) => s.recordDrillSession)
  const vlsmDrillDraft = useProgress((s) => s.vlsmDrillDraft)
  const saveVlsmDrillDraft = useProgress((s) => s.saveVlsmDrillDraft)
  const clearVlsmDrillDraft = useProgress((s) => s.clearVlsmDrillDraft)

  // Biểu đồ chỉ đọc phiên CÙNG LOẠI: trộn hai loại drill vào một đường
  // thì "giây/bài" nhảy dựng lên và người học tưởng mình đang tệ đi.
  const history = useMemo(() => drillHistory.filter((d) => d.mode === 'vlsm'), [drillHistory])
  const today = todayIso()
  const sessionsToday = history.filter((d) => d.date === today).length

  const [phase, setPhase] = useState<Phase>('idle')
  const [problems, setProblems] = useState<VlsmProblem[]>([])
  const [index, setIndex] = useState(0)
  const [rows, setRows] = useState<Record<string, Row>>({})
  const [failCount, setFailCount] = useState(0)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const [evaluation, setEvaluation] = useState<VlsmEvaluation | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const outcomes = useRef<{ correct: boolean; seconds: number }[]>([])
  const problemStart = useRef(0)
  const seedRef = useRef(0)
  const doneHeadingRef = useRef<HTMLHeadingElement>(null)

  /** Phiên dở CÒN GIÁ TRỊ: cùng ngày — seed lưu kèm nên dựng lại đúng bộ đề. */
  const resumable = vlsmDrillDraft !== null && vlsmDrillDraft.date === today

  useEffect(() => {
    if (phase !== 'running') return
    const tick = setInterval(() => setElapsed(Math.floor((Date.now() - problemStart.current) / 1000)), 500)
    return () => clearInterval(tick)
  }, [phase, index])

  // Form vừa unmount lúc phiên kết thúc — dồn focus vào tiêu đề tổng kết.
  useEffect(() => {
    if (phase === 'done') doneHeadingRef.current?.focus()
  }, [phase])

  const start = () => {
    // Phiên dở của HÔM NAY thì làm tiếp từ đúng chỗ đứng dậy: 5 đề thiết
    // kế là bề mặt drill nặng nhất, back nhầm ở đề 4/5 mà mất trắng bảng
    // đã điền là kiểu mất mát khiến người ta bỏ hẳn bài (biên bản trung
    // cấp). Đồng hồ của ĐỀ hiện tại chạy lại từ 0 — công điền bảng thì giữ.
    const draft = resumable ? vlsmDrillDraft : null
    const seed = draft?.seed ?? Number(today.replaceAll('-', '')) + sessionsToday * 7_919 + 13
    seedRef.current = seed
    const session = generateVlsmSession(mulberry32(seed), SESSION_SIZE)
    const index0 = Math.min(draft?.index ?? 0, session.length - 1)
    setProblems(session)
    setRows(draft?.rows ?? emptyRows(session[index0]!))
    outcomes.current = draft === null ? [] : [...draft.outcomes]
    problemStart.current = Date.now()
    setIndex(index0)
    setFailCount(draft?.failCount ?? 0)
    setFeedback(null)
    setEvaluation(null)
    setElapsed(0)
    setPhase('running')
  }

  // Lưu bài dở mỗi khi công sức đổi (ô điền, sang đề, thêm lần sai) —
  // cùng luật practiceDrafts: KHÔNG XP, xóa khi phiên xong.
  useEffect(() => {
    if (phase !== 'running') return
    saveVlsmDrillDraft({
      seed: seedRef.current,
      date: today,
      index,
      rows,
      failCount,
      outcomes: [...outcomes.current],
    })
  }, [phase, index, rows, failCount, saveVlsmDrillDraft, today])

  const problem = problems[index]

  /**
   * Enter giữa chừng KHÔNG nộp bài: bảng có tới 8 ô chung một form, phản
   * xạ gõ Enter khi điền dở dòng 2 mà thành một lượt chấm với hàng loạt
   * lỗi "bỏ trống" là đốt oan một bậc của thang gợi ý (biên bản trung
   * cấp). Nút "Kiểm tra" vẫn nộp được bất cứ lúc nào — chỉ chặn phím.
   */
  const hasEmptyCell =
    problem !== undefined &&
    problem.needs.some((need) => {
      const row = rows[need.id]
      return row === undefined || row.ip.trim() === '' || row.prefix.trim() === ''
    })
  const blockEnterWhenIncomplete = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hasEmptyCell) e.preventDefault()
  }

  /**
   * Sửa MỘT ô của bảng. Cập nhật theo HÀM (`prev => …`) chứ không vá lên
   * biến `rows` của lượt render hiện tại — bảng này có tới 8 ô cùng chung
   * một state, nên đây là chỗ đúng để không phải tin vào thứ tự flush.
   */
  const setCell = (needId: string, field: keyof Row, value: string) => {
    setRows((prev) => ({ ...prev, [needId]: { ...(prev[needId] ?? { ip: '', prefix: '' }), [field]: value } }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (problem === undefined) return
    const result = gradeVlsm(problem, toAssignments(problem, rows))
    setEvaluation(result)

    if (result.passed) {
      playEarcon('correct')
      // "Đúng" của phiên = tự thiết kế được TRƯỚC khi lời giải hiện ra.
      outcomes.current.push({
        correct: failCount < 3,
        seconds: Math.max((Date.now() - problemStart.current) / 1000, 0.1),
      })
      const next = problems[index + 1]
      if (next === undefined) {
        recordDrillSession('vlsm', outcomes.current, outcomes.current.filter((o) => o.correct).length)
        clearVlsmDrillDraft()
        playEarcon('lessonComplete')
        setPhase('done')
        return
      }
      problemStart.current = Date.now()
      setIndex(index + 1)
      setRows(emptyRows(next))
      setFailCount(0)
      setFeedback(null)
      setEvaluation(null)
      setElapsed(0)
      return
    }

    playEarcon('incorrect')
    const fails = failCount + 1
    setFailCount(fails)
    setFeedback({ kind: 'incorrect', tier: feedbackTier(fails) as 1 | 2 | 3 })
  }

  const heading = (
    <h1 className="mb-6 flex items-center gap-2 text-xl font-bold">
      <Timer size={20} aria-hidden className="text-accent" />
      {t('vlsm.title')}
    </h1>
  )

  if (phase === 'idle') {
    return (
      <>
        {heading}
        <div className="flex flex-col gap-6">
          <p className="max-w-lg text-sm leading-relaxed text-ink-muted">{t('vlsm.intro')}</p>
          {sessionsToday > 0 && <p className="text-sm font-medium text-ink">{t('drill.alreadyDoneToday')}</p>}
          <div>
            <Button onClick={start}>
              {resumable ? t('vlsm.resume') : sessionsToday > 0 ? t('drill.oneMoreRound') : t('drill.start')}
            </Button>
          </div>
          <ProgressChart history={history} />
        </div>
      </>
    )
  }

  if (phase === 'done') {
    const last = history[history.length - 1]
    return (
      <>
        {heading}
        <div className="flex flex-col gap-6">
          <div className="rounded-md border border-ok/40 bg-panel px-5 py-4">
            {/* tabIndex -1 + focus qua ref: form vừa unmount thì focus rơi
                về body — dồn vào tiêu đề tổng kết để người dùng bàn phím /
                screen reader đứng đúng chỗ cần đọc (WCAG 2.4.3). */}
            <h2 ref={doneHeadingRef} tabIndex={-1} className="text-base font-bold text-ink focus:outline-none">
              {t('drill.doneTitle')}
            </h2>
            {last !== undefined && (
              <p className="mt-1 text-sm text-ink-muted">
                {t('drill.doneBody', { correct: last.correct, total: last.total, avg: last.avgSeconds })}
              </p>
            )}
            <p className="mt-2 text-sm text-ink-muted">{t('drill.backTomorrow')}</p>
          </div>
          <ProgressChart history={history} />
        </div>
      </>
    )
  }

  if (problem === undefined) return null
  const tier = feedbackTier(failCount)
  const solution = tier >= 3 ? solveVlsm(problem) : null

  return (
    <>
      {heading}
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <div className="flex items-center justify-between text-xs font-medium text-ink-muted">
          <span>{t('drill.questionOf', { current: index + 1, total: problems.length })}</span>
          <span className="flex items-center gap-1 font-mono text-ink">
            <Timer size={13} aria-hidden />
            {elapsed} {t('drill.seconds')}
          </span>
        </div>

        <p className="text-base leading-relaxed text-ink">
          {t('vlsm.brief', { base: `${problem.base.ip}/${problem.base.prefix}`, count: problem.needs.length })}
        </p>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th scope="col" className="py-1 pr-3 font-semibold">
                    {t('vlsm.colDept')}
                  </th>
                  <th scope="col" className="py-1 pr-3 font-semibold">
                    {t('vlsm.colHosts')}
                  </th>
                  <th scope="col" className="py-1 pr-3 font-semibold">
                    {t('vlsm.colNetwork')}
                  </th>
                  <th scope="col" className="py-1 font-semibold">
                    {t('vlsm.colPrefix')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {problem.needs.map((need, i) => {
                  const row = rows[need.id] ?? { ip: '', prefix: '' }
                  const name = deptName(t, i)
                  return (
                    <tr key={need.id} className="border-t border-edge">
                      <td className="py-2 pr-3 text-ink">{name}</td>
                      <td className="py-2 pr-3 font-mono text-ink">{need.hosts}</td>
                      <td className="py-2 pr-3">
                        <input
                          value={row.ip}
                          onChange={(e) => setCell(need.id, 'ip', e.target.value)}
                          onKeyDown={blockEnterWhenIncomplete}
                          aria-label={t('vlsm.networkAria', { dept: name })}
                          placeholder="192.168.10.0"
                          // Nút "Bắt đầu" unmount khi phiên mở — không autoFocus
                          // thì focus rơi về body, người dùng bàn phím phải Tab
                          // lại từ đầu trang (drill subnet cũ đã làm đúng).
                          autoFocus={i === 0}
                          autoComplete="off"
                          className="w-40 rounded-md border border-edge bg-panel px-2 py-1.5 font-mono text-sm text-ink placeholder:text-ink-muted"
                        />
                      </td>
                      <td className="py-2">
                        <input
                          value={row.prefix}
                          onChange={(e) => setCell(need.id, 'prefix', e.target.value)}
                          onKeyDown={blockEnterWhenIncomplete}
                          aria-label={t('vlsm.prefixAria', { dept: name })}
                          placeholder="26"
                          inputMode="numeric"
                          autoComplete="off"
                          className="w-20 rounded-md border border-edge bg-panel px-2 py-1.5 font-mono text-sm text-ink placeholder:text-ink-muted"
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div>
            <Button type="submit">{t('lesson.check')}</Button>
          </div>
        </form>

        <FeedbackRegion state={feedback} />

        {evaluation !== null && tier >= 1 && (
          <div className="rounded-md border border-edge bg-panel px-4 py-3">
            <h2 className="mb-2 text-sm font-semibold text-ink">{t('vlsm.criteriaTitle')}</h2>
            <ul className="flex flex-col gap-1 text-sm">
              {(
                [
                  ['correct', evaluation.criteria.correct],
                  ['complete', evaluation.criteria.complete],
                  ['noWaste', evaluation.criteria.noWaste],
                ] as const
              ).map(([key, met]) => (
                <li key={key} className="flex items-start gap-2">
                  <span className={met ? 'text-ok' : 'text-ink-muted'}>{met ? '✓' : '○'}</span>
                  {/* Trạng thái phải thành CHỮ, không chỉ ký hiệu + màu —
                      trình đọc màn hình đọc ✓/○ không ổn định (nếp bảng
                      mục tiêu CLI/lab, biên bản trung cấp). */}
                  <span className="text-ink">
                    {t(`vlsm.criteria.${key}`)}{' '}
                    <span className={met ? 'text-ok' : 'text-ink-muted'}>
                      ({met ? t('lab.goalMet') : t('lab.goalUnmet')})
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Tầng 2 mới chỉ ra TỪNG DÒNG — tầng 1 chỉ nói tiêu chí, để
                người học tự soi lại bảng của mình trước đã. */}
            {tier >= 2 && (
              <ul className="mt-3 flex flex-col gap-1 border-t border-edge pt-3 text-sm">
                {evaluation.lines.map((line, i) =>
                  line.ok ? null : (
                    <li key={line.need.id} className="text-ink">
                      <span className="font-semibold">{deptName(t, i)}:</span>{' '}
                      {line.issues.map((issue) => t(`vlsm.issue.${issue}`)).join(' · ')}
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
        )}

        {solution !== null && (
          <div className="rounded-md border border-edge bg-panel px-4 py-3">
            <h2 className="mb-2 text-sm font-semibold text-ink">{t('vlsm.solutionTitle')}</h2>
            <ul className="flex flex-col gap-1 font-mono text-sm text-ink">
              {solution.map((assignment, i) => {
                const block = describeBlock(assignment)
                return (
                  <li key={assignment.needId}>
                    {deptName(t, i)}: {block.network}/{assignment.prefix} ({block.mask}) — {block.usableHosts}{' '}
                    {t('vlsm.hostsUnit')}
                  </li>
                )
              })}
            </ul>
            <p className="mt-2 text-xs text-ink-muted">{t('vlsm.solutionNote')}</p>
          </div>
        )}
      </div>
    </>
  )
}
