// Console thiết bị CHỈ-ĐỌC của Phòng khám (spec v2 mục 4.2) — cấp cho ca
// nào khai `deviceConsole: true`: khám bằng CẢ hai terminal trên cùng một
// mạng sống — Windows phía máy con, CLI phía switch/router.
//
// CHỈ-ĐỌC là luật của pha khám, không phải hạn chế kỹ thuật: người trực
// được soi cấu hình (show interfaces trunk, show running-config…) nhưng
// không được sửa mạng từ ghế khám — sửa là việc của pha sửa, và ca
// choose-action thì bệnh nằm ngoài tầm tay CLI. Vì thế chỉ nhận
// enable/exit/end (đi lại giữa chế độ xem) + mọi lệnh `show` + `?`;
// lệnh cấu hình bị chặn bằng microcopy tiếng Việt, không đụng engine.
//
// Sơ đồ nhận từ ClinicRoom là sơ đồ SỐNG — ở ca edit-network, sửa xong
// một mối là show thấy ngay (cùng thế giới, đúng nếp engine/cli/state.ts).

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { SquareChevronRight } from 'lucide-react'
import { useT } from '../../i18n'
import { Button } from '../../components/Button'
import {
  CLI_COMMANDS,
  cliPrompt,
  initialCliState,
  moveCliConsole,
  runCliLine,
  type CliOutcome,
  type CliState,
} from '../../engine/cli'
import { findDevice, type Topology } from '../../engine/lab/topology'

/** Đồ nghề của ghế khám: đi lại giữa chế độ xem + toàn bộ lệnh show. */
const VIEW_COMMANDS = CLI_COMMANDS.filter(
  (c) => c === 'enable' || c === 'exit' || c === 'end' || c.startsWith('show'),
)

/** Lệnh này có được phép chạy từ ghế khám không (xem chú thích đầu file). */
function isViewLine(line: string): boolean {
  if (line === '?') return true
  const first = line.split(/\s+/)[0]?.toLowerCase()
  return first === 'show' || first === 'enable' || first === 'exit' || first === 'end'
}

interface ConsoleEntry {
  id: number
  prompt: string
  input: string
  lines: string[]
  outcome: CliOutcome | { kind: 'read-only' } | { kind: 'moved'; host: string }
}

function EntryBody({ entry }: { entry: ConsoleEntry }) {
  const t = useT()
  const { outcome } = entry
  if (outcome.kind === 'read-only') {
    return <p className="text-warn">{t('clinic.deviceReadOnly')}</p>
  }
  if (outcome.kind === 'moved') {
    return <p className="text-ink-muted">{t('cli.movedTo', { device: outcome.host })}</p>
  }
  if (outcome.kind === 'help') {
    return (
      <div className="text-ink-muted">
        <p>{t('cli.termHelpTitle')}</p>
        <ul>
          {VIEW_COMMANDS.map((c) => (
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
  if (entry.lines.length === 0) return null
  return (
    <pre className={`overflow-x-auto whitespace-pre ${outcome.kind === 'error' ? 'text-warn' : 'text-ink'}`}>
      {entry.lines.join('\n')}
    </pre>
  )
}

export function ClinicDeviceConsole({ topology }: { topology: Topology }) {
  const t = useT()
  const cliDevices = topology.devices.filter((d) => d.kind === 'switch' || d.kind === 'router')
  const [cli, setCli] = useState<CliState | null>(() =>
    cliDevices.length > 0 ? initialCliState(topology, cliDevices[0]!.id) : null,
  )
  const [entries, setEntries] = useState<ConsoleEntry[]>([])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Sơ đồ sống từ pha sửa chảy vào console — cùng một thế giới.
  useEffect(() => {
    setCli((s) => (s === null ? s : { ...s, topology }))
  }, [topology])

  useEffect(() => {
    const el = scrollRef.current
    if (el !== null) el.scrollTop = el.scrollHeight
  }, [entries])

  if (cli === null) return null // schema đã chặn ca không có thiết bị CLI

  const prompt = cliPrompt(cli)

  const push = (entry: Omit<ConsoleEntry, 'id'>) =>
    setEntries((old) => [...old, { ...entry, id: old.length }])

  const run = (e: FormEvent) => {
    e.preventDefault()
    const line = input.trim()
    if (line === '') return
    setInput('')
    if (!isViewLine(line)) {
      push({ prompt, input: line, lines: [], outcome: { kind: 'read-only' } })
      return
    }
    const result = runCliLine(cli, line)
    setCli(result.state)
    push({ prompt, input: line, lines: result.lines, outcome: result.outcome })
  }

  const moveTo = (deviceId: string) => {
    if (deviceId === cli.deviceId) return
    const next = moveCliConsole(cli, deviceId)
    setCli(next)
    const host = findDevice(topology, deviceId)?.hostname ?? deviceId
    // Dấu mốc trong nhật ký — thiếu nó thì đọc lại phiên tưởng gõ nhầm máy.
    push({ prompt, input: '', lines: [], outcome: { kind: 'moved', host } })
  }

  return (
    <div className="overflow-hidden rounded-md border border-edge bg-surface">
      <div className="flex flex-wrap items-center gap-2 border-b border-edge bg-panel px-3 py-2">
        <SquareChevronRight size={14} aria-hidden className="text-accent" />
        <span className="text-xs font-semibold text-ink">{t('clinic.deviceConsoleTitle')}</span>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('clinic.deviceConsolePick')}>
          {cliDevices.map((d) => (
            <button
              key={d.id}
              onClick={() => moveTo(d.id)}
              aria-pressed={cli.deviceId === d.id}
              className={`rounded-full border px-2.5 py-0.5 font-mono text-xs transition-colors duration-(--dur) ${
                cli.deviceId === d.id
                  ? 'border-accent bg-panel-hover font-semibold text-ink'
                  : 'border-edge text-ink-muted hover:border-accent hover:text-ink'
              }`}
            >
              {d.hostname}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={scrollRef}
        role="log"
        aria-label={t('clinic.deviceConsoleAria')}
        className="max-h-64 min-h-16 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed"
      >
        {entries.length === 0 && <p className="text-ink-muted">{t('clinic.deviceConsoleIntro')}</p>}
        {entries.map((entry) => (
          <div key={entry.id} className="mb-2">
            {entry.input !== '' && (
              <p className="text-accent">
                {entry.prompt} {entry.input}
              </p>
            )}
            <EntryBody entry={entry} />
          </div>
        ))}
      </div>
      <form onSubmit={run} className="flex items-center gap-2 border-t border-edge px-3 py-1.5">
        <span aria-hidden className="font-mono text-xs text-accent">
          {prompt}
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('clinic.deviceConsolePlaceholder')}
          aria-label={t('clinic.deviceConsoleInputAria')}
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent py-1 font-mono text-xs text-ink placeholder:text-ink-muted focus:outline-none"
        />
        <Button type="submit" variant="ghost" disabled={input.trim() === ''} className="px-3 py-1 text-xs">
          {t('clinic.terminalRun')}
        </Button>
      </form>
    </div>
  )
}
