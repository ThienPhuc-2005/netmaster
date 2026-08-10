// Console thiết bị mạng (spec v2 Phần D) — vỏ UI cho câu hỏi
// `kind: 'cli'`: terminal gõ lệnh IOS thật + bảng mục tiêu sống + nộp bài.
//
// Cùng luật với ba terminal trước: gõ bao nhiêu cũng MIỄN PHÍ, chỉ "Nộp
// bài" mới tính một lượt trong thang 3 tầng. Bảng mục tiêu chấm SỐNG theo
// từng lệnh — người học thấy ngay lệnh vừa gõ đẩy bài tới đâu.
//
// Ranh giới chuỗi: `lines` là output máy tiếng Anh, render nguyên văn
// trong <pre> (lỗi tô hổ phách); microcopy tiếng Việt (help, lệnh lạ,
// nhãn mục tiêu, tên nút) ở i18n `cli.*`.
//
// RÚT DÂY CONSOLE là thao tác VẬT LÝ, không phải câu lệnh — nên nó là
// một hàng nút chọn thiết bị chứ không phải lệnh gõ. Bài "dựng trunk hai
// switch" bắt buộc phải đi qua đây, và mỗi lần cắm sang máy mới thì chế
// độ về `user`: ngồi xuống thiết bị lạ là phải `enable` lại từ đầu.
//
// Không có undo: thiết bị thật cũng không có. "Làm lại từ đầu" trả nguyên
// sơ đồ đề bài — an toàn để thử nghiệm.

import { memo, useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { RotateCcw, SquareChevronRight } from 'lucide-react'
import { useT, type TFunc } from '../../i18n'
import { Button } from '../../components/Button'
import type { CliQuestion } from '../../engine/contentSchema'
import type { QuestionResponse } from '../../engine/grading/gradeQuestion'
import {
  CLI_COMMANDS,
  cliHostname,
  cliPrompt,
  devicesReferencedByCli,
  gradeCli,
  initialCliState,
  moveCliConsole,
  runCliLine,
  type CliGoal,
  type CliState,
} from '../../engine/cli'
import { findDevice, type Topology } from '../../engine/lab/topology'
import { goalText as labGoalText } from '../lab/LabPanels'
import type { CliTranscriptEntry } from '../../store/progress'

const DEVICE_LABEL_FALLBACK = '?'

/** Tên đọc được của thiết bị; id làm dự phòng khi đề chưa đặt hostname. */
function deviceName(topo: Topology, deviceId: string): string {
  return findDevice(topo, deviceId)?.hostname ?? deviceId ?? DEVICE_LABEL_FALLBACK
}

/** Diễn đạt một mục tiêu thành câu tiếng Việt (UI-chrome, tham số từ đề). */
export function cliGoalText(t: TFunc, topo: Topology, goal: CliGoal): string {
  const device = (id: string) => deviceName(topo, id)
  switch (goal.kind) {
    case 'behavior':
      // Mục tiêu hành vi nói bằng ĐÚNG lời của phòng lab — cùng một câu
      // "A phải gọi được B" dù người học đang đứng ở mặt bàn hay ở console.
      return labGoalText(t, topo, goal.goal)
    case 'port-mode':
      return t(goal.mode === 'trunk' ? 'cli.goalPortTrunk' : 'cli.goalPortAccess', {
        device: device(goal.deviceId),
        port: goal.portId,
      })
    case 'access-vlan':
      return t('cli.goalAccessVlan', { device: device(goal.deviceId), port: goal.portId, vlan: goal.vlan })
    case 'trunk-carries':
      return t('cli.goalTrunkCarries', {
        device: device(goal.deviceId),
        port: goal.portId,
        vlans: goal.vlans.join(', '),
      })
    case 'trunk-blocks':
      return t('cli.goalTrunkBlocks', {
        device: device(goal.deviceId),
        port: goal.portId,
        vlans: goal.vlans.join(', '),
      })
    case 'native-vlan':
      return t('cli.goalNativeVlan', { device: device(goal.deviceId), port: goal.portId, vlan: goal.vlan })
    case 'native-match':
      return t('cli.goalNativeMatch', {
        deviceA: device(goal.a.deviceId),
        portA: goal.a.portId,
        deviceB: device(goal.b.deviceId),
        portB: goal.b.portId,
      })
    case 'port-up':
      return t('cli.goalPortUp', { device: device(goal.deviceId), port: goal.portId })
    case 'port-ip':
      return t('cli.goalPortIp', {
        device: device(goal.deviceId),
        port: goal.portId,
        ip: goal.ip,
        prefix: goal.prefix,
      })
    case 'static-route':
      return t('cli.goalStaticRoute', {
        device: device(goal.deviceId),
        destination: goal.destination,
        prefix: goal.prefix,
        nextHop: goal.nextHop,
      })
    case 'vlan-exists':
      return t('cli.goalVlanExists', { device: device(goal.deviceId), vlan: goal.vlan })
    case 'viewed':
      return t('cli.goalViewed', { command: goal.command, device: device(goal.deviceId) })
  }
}

function EntryBody({ entry }: { entry: CliTranscriptEntry }) {
  const t = useT()
  const { outcome } = entry
  if (outcome.kind === 'help') {
    return (
      <div className="text-ink-muted">
        <p>{t('cli.termHelpTitle')}</p>
        <ul>
          {CLI_COMMANDS.map((c) => (
            <li key={c}>
              <span className="text-ink">{c}</span> — {t(`cli.cmd.${c}`)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (outcome.kind === 'unknown') {
    return <p className="text-warn">{t('cli.termUnknown', { cmd: outcome.input })}</p>
  }
  if (entry.lines.length === 0) {
    // Lệnh cấu hình chạy trót lọt thì thiết bị thật IM LẶNG. Không nói gì
    // ở đây là đúng fidelity — dòng nhắc kiểm chứng nằm dưới bảng mục tiêu.
    return null
  }
  return (
    <pre className={`overflow-x-auto whitespace-pre ${outcome.kind === 'error' ? 'text-warn' : 'text-ink'}`}>
      {entry.lines.join('\n')}
    </pre>
  )
}

/**
 * Một dòng nhật ký, bọc memo: gõ phím chỉ đổi state input của form, nhưng
 * re-render cả cây — phiên capstone 60-80 lệnh kèm các khối <pre> nhiều
 * dòng thì mỗi phím gõ dựng lại hàng trăm node (biên bản trung cấp, ghế
 * Hiệu năng). Props bất biến theo entry nên memo cắt được đúng chỗ đó.
 * Dấu mốc rút dây nhận lời kể đã dịch qua prop — entry chỉ giữ deviceId.
 */
const EntryRow = memo(function EntryRow({ entry, movedLabel }: { entry: CliTranscriptEntry; movedLabel: string | null }) {
  if (entry.outcome.kind === 'moved') {
    return <p className="mb-2 text-ink-muted">— {movedLabel} —</p>
  }
  return (
    <div className="mb-2">
      <p className="text-accent">
        {entry.prompt} {entry.input}
      </p>
      <EntryBody entry={entry} />
    </div>
  )
})

/** Ảnh chụp phiên console để mở lại bài đang gõ dở (#20). */
export interface CliDraftSnapshot {
  state: CliState
  entries: CliTranscriptEntry[]
}

export interface CliConsoleProps {
  question: CliQuestion
  /** Nộp bài — không truyền thì ở chế độ xem, không có nút nộp. */
  onSubmit?: (response: QuestionResponse) => void
  /** Phiên gõ dở của lần trước (sơ đồ đã sửa + nguyên nhật ký lệnh). */
  initialDraft?: CliDraftSnapshot | null
  /** Phiên vừa đổi, hoặc `null` khi bấm "Làm lại từ đầu" (bài dở phải biến mất). */
  onDraftChange?: (draft: CliDraftSnapshot | null) => void
  /**
   * Bài THI: bảng mục tiêu là đề bài tĩnh, KHÔNG lật ✓/○ theo từng lệnh —
   * màn intro hứa "không có gợi ý giữa chừng" thì console phải giữ lời
   * (biên bản hội đồng trung cấp). Tự kiểm bằng lệnh show là kỹ năng đo.
   */
  examMode?: boolean
}

export function CliConsole({ question, onSubmit, initialDraft, onDraftChange, examMode }: CliConsoleProps) {
  const t = useT()
  const spec = question.spec
  // Lưới đỡ nội-dung-đã-đổi (cùng luật với phòng lab): question id còn
  // nhưng sơ đồ đề đã đổi — thiết bị của spec/goals không có trong bài dở
  // thì restore là ngồi trước sơ đồ CŨ với mục tiêu soi vào hư không.
  // Lệch tập thiết bị bắt buộc → bỏ bài dở, mở bài sạch.
  const draft = useMemo(() => {
    if (initialDraft == null) return null
    const have = new Set(initialDraft.state.topology.devices.map((d) => d.id))
    const required = [...spec.initial.devices.map((d) => d.id), ...devicesReferencedByCli(spec.goals)]
    return required.every((id) => have.has(id)) ? initialDraft : null
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ tính một lần lúc mount, như chính initialDraft
  }, [])
  const [state, setState] = useState<CliState>(() => draft?.state ?? initialCliState(spec.initial, spec.deviceId))
  const [entries, setEntries] = useState<CliTranscriptEntry[]>(() => draft?.entries ?? [])
  const [input, setInput] = useState('')
  const [histCursor, setHistCursor] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const evaluation = useMemo(() => gradeCli(spec, state), [spec, state])

  /** Thiết bị có console để cắm vào — máy tính thì không có. */
  const consoles = useMemo(
    () => state.topology.devices.filter((d) => d.kind !== 'pc').map((d) => ({ id: d.id, hostname: d.hostname })),
    [state.topology],
  )

  // Bảng mục tiêu "chấm sống" đổi ✓/○ trong im lặng với screen reader —
  // live region sr-only thường trực announce CẢ HAI CHIỀU: mục tiêu vừa
  // đạt và mục tiêu vừa TỤT về chưa đạt (gõ shutdown làm port-up rơi ✓→○
  // mà chỉ mắt thấy, tai không được kể, là bất công với người dùng trình
  // đọc màn hình — biên bản trung cấp).
  const [goalAnnounce, setGoalAnnounce] = useState('')
  const prevMet = useRef<boolean[] | null>(null)
  useEffect(() => {
    if (examMode === true) return // bài thi không chấm sống thì cũng không announce
    const met = evaluation.goals.map((g) => g.met)
    if (prevMet.current !== null) {
      const changed = evaluation.goals.filter(({ met: m }, i) => m !== prevMet.current![i])
      if (changed.length > 0) {
        setGoalAnnounce(
          changed
            .map(({ goal, met: m }) => `${cliGoalText(t, state.topology, goal)} — ${t(m ? 'lab.goalMet' : 'lab.goalUnmet')}`)
            .join('. '),
        )
      }
    }
    prevMet.current = met
  }, [evaluation, state.topology, t, examMode])

  useEffect(() => {
    const el = scrollRef.current
    if (el !== null) el.scrollTop = el.scrollHeight
  }, [entries])

  const pushEntry = (next: CliState, entry: Omit<CliTranscriptEntry, 'id'>) => {
    const nextEntries = [...entries, { id: entries.length, ...entry }]
    setState(next)
    setEntries(nextEntries)
    onDraftChange?.({ state: next, entries: nextEntries })
  }

  const run = (e: FormEvent) => {
    e.preventDefault()
    const line = input.trim()
    if (line === '') return
    // Nối NetState của bộ chấm hành vi vào phiên: `show mac address-table`
    // và cột đếm `show access-lists` kể chuyện các gói thăm dò vừa đi —
    // trước đây hai bảng này vĩnh viễn trống ở mọi bề mặt thật (biên bản
    // trung cấp). Đề không có goal hành vi thì bảng trống là sự thật.
    const seeing = evaluation.net === null ? state : { ...state, net: evaluation.net }
    const result = runCliLine(seeing, line)
    setInput('')
    setHistCursor(null)
    pushEntry(result.state, { input: line, lines: result.lines, outcome: result.outcome, prompt: cliPrompt(state) })
  }

  const moveTo = (deviceId: string) => {
    if (deviceId === state.deviceId) return
    const next = moveCliConsole(state, deviceId)
    // Việc rút dây cũng vào NHẬT KÝ: đọc lại phiên mà không thấy chỗ
    // chuyển máy thì cả loạt lệnh phía sau trông như gõ nhầm thiết bị.
    // Entry chỉ lưu deviceId (đã nằm trong outcome) — lời kể dịch lúc
    // RENDER, không persist chuỗi đã dịch vào bài dở (đổi ngôn ngữ rồi mở
    // lại là nhật ký lẫn tiếng — biên bản trung cấp).
    pushEntry(next, { input: '', lines: [], outcome: { kind: 'moved', deviceId }, prompt: '' })
  }

  const reset = () => {
    setState(initialCliState(spec.initial, spec.deviceId))
    setEntries([])
    setInput('')
    setHistCursor(null)
    onDraftChange?.(null)
  }

  const onHistoryKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
    const history = entries.map((en) => en.input).filter((line) => line !== '')
    if (history.length === 0) return
    e.preventDefault()
    if (e.key === 'ArrowUp') {
      const next = histCursor === null ? history.length - 1 : Math.max(0, histCursor - 1)
      setHistCursor(next)
      setInput(history[next]!)
    } else {
      if (histCursor === null) return
      const next = histCursor + 1
      if (next >= history.length) {
        setHistCursor(null)
        setInput('')
      } else {
        setHistCursor(next)
        setInput(history[next]!)
      }
    }
  }

  const prompt = cliPrompt(state)

  return (
    <div className="space-y-4">
      <span className="sr-only" role="status">
        {goalAnnounce}
      </span>
      <section aria-labelledby="cli-goals" className="rounded-md border border-edge bg-panel p-4">
        <h3 id="cli-goals" className="mb-2 text-sm font-semibold text-ink">
          {t('cli.goalsTitle')}
        </h3>
        <ul className="flex flex-col gap-1.5">
          {evaluation.goals.map(({ goal, met }, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {examMode === true ? (
                <>
                  <span className="text-ink-muted">○</span>
                  <span className="text-ink">{cliGoalText(t, state.topology, goal)}</span>
                </>
              ) : (
                <>
                  <span className={met ? 'text-ok' : 'text-ink-muted'}>{met ? '✓' : '○'}</span>
                  <span className="text-ink">
                    {cliGoalText(t, state.topology, goal)}{' '}
                    <span className={met ? 'text-ok' : 'text-ink-muted'}>
                      ({met ? t('lab.goalMet') : t('lab.goalUnmet')})
                    </span>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
        {examMode === true && <p className="mt-2 text-xs text-ink-muted">{t('cli.examGoalsNote')}</p>}
      </section>

      {consoles.length > 1 && (
        <section aria-labelledby="cli-console-cable" className="rounded-md border border-edge bg-panel p-4">
          <h3 id="cli-console-cable" className="mb-2 text-sm font-semibold text-ink">
            {t('cli.consoleTitle')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {consoles.map((device) => {
              const here = device.id === state.deviceId
              return (
                <button
                  key={device.id}
                  onClick={() => moveTo(device.id)}
                  aria-pressed={here}
                  className={`rounded-md border px-3 py-1.5 text-xs transition-colors duration-(--dur) ${
                    here
                      ? 'border-accent text-accent'
                      : 'border-edge text-ink hover:border-accent hover:bg-panel-hover'
                  }`}
                >
                  {device.hostname}
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-xs text-ink-muted">{t('cli.consoleHint')}</p>
        </section>
      )}

      <div className="overflow-hidden rounded-md border border-edge bg-surface">
        <div className="flex items-center gap-2 border-b border-edge bg-panel px-3 py-2">
          <SquareChevronRight size={14} aria-hidden className="text-accent" />
          <span className="font-mono text-xs font-semibold text-ink">
            {t('cli.terminalTitle', { host: cliHostname(state) })}
          </span>
        </div>
        <div
          ref={scrollRef}
          role="log"
          aria-label={t('cli.terminalAria', { host: cliHostname(state) })}
          // Vùng cuộn phải focus được bằng bàn phím: Firefox/Safari không tự
          // cho scroller nhận focus như Chromium, thiếu tabIndex là người
          // dùng bàn phím thuần không cuộn lại được output cũ (biên bản).
          tabIndex={0}
          className="max-h-72 min-h-24 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed"
        >
          {entries.length === 0 && <p className="text-ink-muted">{t('cli.terminalIntro')}</p>}
          {entries.map((entry) => (
            <EntryRow
              key={entry.id}
              entry={entry}
              movedLabel={
                entry.outcome.kind === 'moved'
                  ? t('cli.movedTo', { device: deviceName(state.topology, entry.outcome.deviceId) })
                  : null
              }
            />
          ))}
        </div>
        <form onSubmit={run} className="flex items-center gap-2 border-t border-edge px-3 py-1.5">
          <span aria-hidden className="font-mono text-xs text-accent">
            {prompt}
          </span>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setHistCursor(null)
            }}
            onKeyDown={onHistoryKey}
            placeholder={t('cli.terminalPlaceholder')}
            aria-label={t('cli.terminalInputAria', { host: cliHostname(state) })}
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent py-1 font-mono text-xs text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <Button type="submit" variant="ghost" disabled={input.trim() === ''} className="px-3 py-1 text-xs">
            {t('cli.terminalRun')}
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={reset}>
          <RotateCcw size={14} aria-hidden />
          {t('cli.reset')}
        </Button>
        <span className="text-xs text-ink-muted">{t('cli.freeNote')}</span>
      </div>

      {onSubmit !== undefined && (
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-edge bg-panel px-4 py-3">
          <Button onClick={() => onSubmit({ kind: 'cli', state })}>{t('lab.submit')}</Button>
          <span className="text-xs text-ink-muted">{t('lab.submitHint')}</span>
        </div>
      )}
    </div>
  )
}
