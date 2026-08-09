// Drill subnetting (spec Module 3): mỗi ngày 10 bài tự sinh, có đồng hồ
// đếm (desirable difficulty — đồng hồ chỉ để đua với chính mình, không
// phạt), phản hồi 3 tầng theo nguyên tắc 4, biểu đồ tiến bộ theo phiên.
//
// Đề sinh DETERMINISTIC theo ngày (+ số phiên trong ngày): cùng ngày mở
// lại giữa chừng vẫn gặp đúng bộ đề đó — không "reroll" để né bài khó.

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Timer } from 'lucide-react'
import {
  generateDrillSession,
  gradeDrillAnswer,
  mulberry32,
  type DrillProblem,
} from '../../engine/subnet/drill'
import { feedbackTier } from '../../engine/lessonMachine'
import { todayIso, useProgress } from '../../store/progress'
import { useT } from '../../i18n'
import { playEarcon } from '../../audio/earcons'
import { Button } from '../../components/Button'
import { FeedbackRegion, type FeedbackState } from '../../components/FeedbackBanner'
import { ProgressChart } from './ProgressChart'

// ---------------------------------------------------------------
// Đề bài + lời giải theo magic number (dữ liệu từ engine, chữ từ i18n)
// ---------------------------------------------------------------

function useProblemText() {
  const t = useT()
  return (p: DrillProblem): string => {
    const g = p.given
    switch (p.type) {
      case 'network-addr':
        return g.kind === 'ipPrefix' ? t('drill.qNetworkAddr', { ip: g.ip, prefix: g.prefix }) : ''
      case 'broadcast':
        return g.kind === 'ipPrefix' ? t('drill.qBroadcast', { ip: g.ip, prefix: g.prefix }) : ''
      case 'host-range':
        return g.kind === 'ipPrefix' ? t('drill.qHostRange', { ip: g.ip, prefix: g.prefix }) : ''
      case 'host-count':
        return g.kind === 'ipPrefix' ? t('drill.qHostCount', { ip: g.ip, prefix: g.prefix }) : ''
      case 'prefix-for-hosts':
        return g.kind === 'requiredHosts' ? t('drill.qPrefixForHosts', { hosts: g.requiredHosts }) : ''
      case 'mask-convert':
        if (g.kind === 'prefix') return t('drill.qMaskFromPrefix', { prefix: g.prefix })
        return g.kind === 'mask' ? t('drill.qPrefixFromMask', { mask: g.mask }) : ''
    }
  }
}

/** Dòng nhãn/giá trị của lời giải — giá trị luôn mono. */
function SolutionRows({ rows }: { rows: [label: string, value: string][] }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-ink-muted">{label}</dt>
          <dd className="font-mono font-semibold text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function solutionRows(p: DrillProblem, t: (k: string, params?: Record<string, string | number>) => string, full: boolean): [string, string][] {
  const s = p.solution
  switch (s.kind) {
    case 'block': {
      const rows: [string, string][] = [
        [t('drill.solMagicNumber'), `${s.magicNumber} (octet ${s.interestingOctet})`],
        [t('drill.solBlock'), `${s.blockStart} – ${s.blockEnd}`],
      ]
      if (full) {
        rows.push(
          [t('drill.solNetwork'), s.network],
          [t('drill.solBroadcast'), s.broadcast],
          [t('drill.solHostRange'), `${s.firstHost} – ${s.lastHost}`],
        )
      }
      return rows
    }
    case 'host-count': {
      const rows: [string, string][] = [[t('drill.solHostBits'), `32 − ${s.prefix} = ${s.hostBits}`]]
      if (full) {
        rows.push(
          [t('drill.solTotalAddresses'), `2^${s.hostBits} = ${s.totalAddresses}`],
          [t('drill.solUsableHosts'), `${s.totalAddresses} − 2 = ${s.usableHosts}`],
        )
      }
      return rows
    }
    case 'prefix-for-hosts': {
      const rows: [string, string][] = [
        [t('drill.solHostBits'), `2^${s.hostBits} = ${s.totalAddresses} ≥ ${s.requiredHosts} + 2`],
      ]
      if (full) rows.push(['Prefix', `/${s.prefix}`], [t('drill.solMask'), s.mask])
      return rows
    }
    case 'mask-convert': {
      const rows: [string, string][] = [
        [t('drill.solFullOctets'), `${s.fullOctets} × 255`],
        [t('drill.solMagicNumber'), String(s.magicNumber)],
      ]
      if (full) {
        if (s.partialOctetValue !== null) rows.push([t('drill.solPartialOctet'), `256 − ${s.magicNumber} = ${s.partialOctetValue}`])
        rows.push([t('drill.solMask'), s.mask], ['Prefix', `/${s.prefix}`])
      }
      return rows
    }
  }
}

// ---------------------------------------------------------------
// Trang drill
// ---------------------------------------------------------------

type Phase = 'idle' | 'running' | 'done'

export function DrillPage() {
  const t = useT()
  const problemText = useProblemText()
  const allHistory = useProgress((s) => s.drillHistory)
  const recordDrillSession = useProgress((s) => s.recordDrillSession)

  // Chỉ đọc phiên CÙNG LOẠI: drill VLSM của Module 13 là 5 bài thiết kế
  // vài phút mỗi bài — trộn chung một đường "giây/bài" là bóp méo cả
  // biểu đồ tiến bộ mà người học đã xây cả tháng.
  const drillHistory = useMemo(() => allHistory.filter((d) => d.mode === 'subnet'), [allHistory])
  const today = todayIso()
  const sessionsToday = drillHistory.filter((d) => d.date === today).length

  const [phase, setPhase] = useState<Phase>('idle')
  const [problems, setProblems] = useState<DrillProblem[]>([])
  const [index, setIndex] = useState(0)
  const [failCount, setFailCount] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const outcomes = useRef<{ correct: boolean; seconds: number }[]>([])
  const problemStart = useRef(0)

  // Đồng hồ đếm lên theo từng bài — hiển thị, không giới hạn thời gian.
  useEffect(() => {
    if (phase !== 'running') return
    const tick = setInterval(() => setElapsed(Math.floor((Date.now() - problemStart.current) / 1000)), 500)
    return () => clearInterval(tick)
  }, [phase, index])

  const start = () => {
    // Seed theo ngày + số phiên đã làm trong ngày → mỗi phiên một bộ đề,
    // nhưng tái lập được (không reroll trốn bài khó).
    const seed = Number(today.replaceAll('-', '')) + sessionsToday * 1_000_003
    setProblems(generateDrillSession(mulberry32(seed)))
    outcomes.current = []
    problemStart.current = Date.now()
    setIndex(0)
    setFailCount(0)
    setAnswer('')
    setFeedback(null)
    setElapsed(0)
    setPhase('running')
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const problem = problems[index]
    if (!problem || answer.trim() === '') return

    if (gradeDrillAnswer(problem, answer)) {
      playEarcon('correct')
      // "Đúng" của phiên = tự giải được TRƯỚC khi lời giải hiện ra —
      // gõ lại sau tầng 3 vẫn phải làm nhưng không tính điểm/XP.
      outcomes.current.push({
        correct: failCount < 3,
        seconds: Math.max((Date.now() - problemStart.current) / 1000, 0.1),
      })
      if (index + 1 >= problems.length) {
        recordDrillSession('subnet', outcomes.current, outcomes.current.filter((o) => o.correct).length)
        playEarcon('lessonComplete')
        setPhase('done')
      } else {
        problemStart.current = Date.now()
        setIndex(index + 1)
        setFailCount(0)
        setAnswer('')
        setFeedback(null)
        setElapsed(0)
      }
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
      {t('drill.title')}
    </h1>
  )

  if (phase === 'idle') {
    return (
      <>
        {heading}
        <div className="flex flex-col gap-6">
          <p className="max-w-lg text-sm leading-relaxed text-ink-muted">{t('drill.intro')}</p>
          {sessionsToday > 0 && <p className="text-sm font-medium text-ink">{t('drill.alreadyDoneToday')}</p>}
          <div>
            <Button onClick={start}>{sessionsToday > 0 ? t('drill.oneMoreRound') : t('drill.start')}</Button>
          </div>
          <ProgressChart history={drillHistory} />
        </div>
      </>
    )
  }

  if (phase === 'done') {
    const last = drillHistory[drillHistory.length - 1]
    return (
      <>
        {heading}
        <div className="flex flex-col gap-6">
          <div className="rounded-md border border-ok/40 bg-panel px-5 py-4">
            <h2 className="text-base font-bold text-ink">{t('drill.doneTitle')}</h2>
            {last !== undefined && (
              <p className="mt-1 text-sm text-ink-muted">
                {t('drill.doneBody', { correct: last.correct, total: last.total, avg: last.avgSeconds })}
              </p>
            )}
            <p className="mt-2 text-sm text-ink-muted">{t('drill.backTomorrow')}</p>
          </div>
          <ProgressChart history={drillHistory} />
        </div>
      </>
    )
  }

  const problem = problems[index]
  if (!problem) return null
  const tier = feedbackTier(failCount)

  return (
    <>
      {heading}
      <div className="mx-auto flex max-w-lg flex-col gap-4">
        <div className="flex items-center justify-between text-xs font-medium text-ink-muted">
          <span>{t('drill.questionOf', { current: index + 1, total: problems.length })}</span>
          <span className="flex items-center gap-1 font-mono text-ink">
            <Timer size={13} aria-hidden />
            {elapsed} {t('drill.seconds')}
          </span>
        </div>

        <p className="text-base font-medium leading-relaxed text-ink">{problemText(problem)}</p>

        <form onSubmit={submit} className="flex gap-2">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={t('drill.answerPlaceholder')}
            autoFocus
            className="flex-1 rounded-md border border-edge bg-panel px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-muted"
          />
          <Button type="submit" disabled={answer.trim() === ''}>
            {t('lesson.check')}
          </Button>
        </form>

        <FeedbackRegion state={feedback} />
        {tier >= 2 && (
          <div className="rounded-md border border-edge bg-panel px-4 py-3">
            <SolutionRows rows={solutionRows(problem, t, tier >= 3)} />
          </div>
        )}
      </div>
    </>
  )
}
