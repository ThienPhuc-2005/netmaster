// Bàn làm việc PowerShell (spec Module 12) — vỏ UI cho câu hỏi
// `kind: 'ps'`: terminal gõ lệnh thật + bảng mục tiêu sống + nộp bài.
//
// Generation effect tối đa nghĩa là: KHÔNG có nút bấm thay cho lệnh —
// mọi việc đều phải gõ. Gõ thử bao nhiêu lần cũng miễn phí (cùng luật
// "Gửi thử" của phòng lab); chỉ "Nộp bài" mới tính một lượt trong thang
// 3 tầng. Bảng mục tiêu chấm SỐNG theo từng lệnh — người học thấy ngay
// việc mình vừa làm đẩy bài tới đâu.
//
// Ranh giới chuỗi giữ đúng nếp terminal Phòng khám: `lines` là output
// máy tiếng Anh render nguyên văn trong <pre>; microcopy tiếng Việt
// (help tổng, lệnh lạ, nhãn mục tiêu) ở đây qua i18n.
//
// Không có undo: PowerShell thật cũng không có. Nút "Làm lại từ đầu"
// trả nguyên thế giới ban đầu — an toàn để thử nghiệm.

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { RotateCcw, SquareChevronRight } from 'lucide-react'
import { useT } from '../../i18n'
import { Button } from '../../components/Button'
import type { PsQuestion } from '../../engine/contentSchema'
import type { QuestionResponse } from '../../engine/grading/gradeQuestion'
import {
  PS_COMMANDS,
  gradePs,
  initialPsState,
  runPsLine,
  type PsGoal,
  type PsOutcome,
  type PsRunState,
} from '../../engine/ps'

interface TermEntry {
  id: number
  input: string
  lines: string[]
  outcome: PsOutcome
}

const PROMPT = 'PS C:\\>'

/** Diễn đạt một mục tiêu thành câu tiếng Việt (UI-chrome, tham số từ đề). */
function goalText(goal: PsGoal, t: ReturnType<typeof useT>): string {
  switch (goal.kind) {
    case 'ad-user':
      return goal.ou === undefined
        ? t('ps.goalAdUser', { sam: goal.sam })
        : t('ps.goalAdUserOu', { sam: goal.sam, ou: goal.ou })
    case 'ad-user-count':
      return t('ps.goalAdUserCount', { ou: goal.ou, atLeast: goal.atLeast })
    case 'tested-connection':
      return goal.port === undefined
        ? t('ps.goalTestPing', { ip: goal.ip })
        : t('ps.goalTestPort', { ip: goal.ip, port: goal.port })
    case 'found-line':
      return t('ps.goalFoundLine', { text: goal.mustContain })
  }
}

function EntryBody({ entry }: { entry: TermEntry }) {
  const t = useT()
  const { outcome } = entry
  if (outcome.kind === 'help') {
    return (
      <div className="text-ink-muted">
        <p>{t('ps.termHelpTitle')}</p>
        <ul>
          {PS_COMMANDS.filter((c) => c !== 'Get-Help').map((c) => (
            <li key={c}>
              <span className="text-ink">{c}</span> — {t(`ps.cmd.${c}`)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (outcome.kind === 'unknown') {
    return <p className="text-warn">{t('ps.termUnknown', { cmd: outcome.input })}</p>
  }
  // New-ADUser im lặng như thật — nói nhỏ một dòng chrome để người mới
  // không tưởng lệnh chết, nhưng vẫn đẩy họ đi Get-ADUser kiểm chứng.
  if (outcome.kind === 'ok' && outcome.createdUsers !== undefined && entry.lines.length === 0) {
    return <p className="text-ink-muted">{t('ps.termCreatedSilent', { count: outcome.createdUsers })}</p>
  }
  return (
    <pre className={`overflow-x-auto whitespace-pre ${outcome.kind === 'error' ? 'text-warn' : 'text-ink'}`}>
      {entry.lines.join('\n')}
    </pre>
  )
}

export interface PsConsoleProps {
  question: PsQuestion
  /**
   * Nộp bài — trao trạng thái phiên lên tầng gọi (chấm và đếm lượt ở
   * đó). Không truyền thì ở chế độ xem, không có nút nộp.
   */
  onSubmit?: (response: QuestionResponse) => void
}

export function PsConsole({ question, onSubmit }: PsConsoleProps) {
  const t = useT()
  const spec = question.spec
  const [state, setState] = useState<PsRunState>(() => initialPsState(spec.world))
  const [entries, setEntries] = useState<TermEntry[]>([])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const evaluation = useMemo(() => gradePs(spec, state), [spec, state])

  useEffect(() => {
    const el = scrollRef.current
    if (el !== null) el.scrollTop = el.scrollHeight
  }, [entries])

  const run = (e: FormEvent) => {
    e.preventDefault()
    const line = input.trim()
    if (line === '') return
    const result = runPsLine(state, line)
    setState(result.state)
    setEntries((old) => [...old, { id: old.length, input: line, lines: result.lines, outcome: result.outcome }])
    setInput('')
  }

  const reset = () => {
    setState(initialPsState(spec.world))
    setEntries([])
    setInput('')
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-edge bg-panel p-4">
        <h3 className="mb-2 text-sm font-semibold text-ink">{t('ps.goalsTitle')}</h3>
        <ul className="flex flex-col gap-1.5">
          {evaluation.goals.map(({ goal, met }, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className={met ? 'text-ok' : 'text-ink-muted'}>{met ? '✓' : '○'}</span>
              <span className="text-ink">
                {goalText(goal, t)}{' '}
                <span className={met ? 'text-ok' : 'text-ink-muted'}>
                  ({met ? t('lab.goalMet') : t('lab.goalUnmet')})
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-hidden rounded-md border border-edge bg-surface">
        <div className="flex items-center gap-2 border-b border-edge bg-panel px-3 py-2">
          <SquareChevronRight size={14} aria-hidden className="text-accent" />
          <span className="font-mono text-xs font-semibold text-ink">
            {t('ps.terminalTitle', { host: spec.world.hostname })}
          </span>
        </div>
        <div
          ref={scrollRef}
          role="log"
          aria-label={t('ps.terminalAria', { host: spec.world.hostname })}
          className="max-h-72 min-h-24 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed"
        >
          {entries.length === 0 && <p className="text-ink-muted">{t('ps.terminalIntro')}</p>}
          {entries.map((entry) => (
            <div key={entry.id} className="mb-2">
              <p className="text-accent">
                {PROMPT} {entry.input}
              </p>
              <EntryBody entry={entry} />
            </div>
          ))}
        </div>
        <form onSubmit={run} className="flex items-center gap-2 border-t border-edge px-3 py-1.5">
          <span aria-hidden className="font-mono text-xs text-accent">
            {PROMPT}
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('ps.terminalPlaceholder')}
            aria-label={t('ps.terminalInputAria')}
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent py-1 font-mono text-xs text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <Button type="submit" variant="ghost" disabled={input.trim() === ''} className="px-3 py-1 text-xs">
            {t('ps.terminalRun')}
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={reset}>
          <RotateCcw size={14} aria-hidden />
          {t('ps.reset')}
        </Button>
        <span className="text-xs text-ink-muted">{t('ps.freeNote')}</span>
      </div>

      {onSubmit !== undefined && (
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-edge bg-panel px-4 py-3">
          <Button onClick={() => onSubmit({ kind: 'ps', state })}>{t('lab.submit')}</Button>
          <span className="text-xs text-ink-muted">{t('lab.submitHint')}</span>
        </div>
      )}
    </div>
  )
}
