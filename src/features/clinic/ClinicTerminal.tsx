// Terminal ảo của Phòng khám (spec Module 11) — cửa sổ DUY NHẤT nhìn vào
// mạng của bệnh nhân trong pha khám: không sơ đồ, không gợi ý máy móc,
// chỉ lệnh thật và output thật như ngoài đời đi trực.
//
// Ranh giới chuỗi giữ đúng nếp của engine/clinic/terminal.ts: `lines` là
// OUTPUT CỦA THIẾT BỊ (tiếng Anh nghề, render nguyên văn trong <pre>);
// microcopy tiếng Việt — lời mời gõ, help, lệnh không tồn tại, capture
// trống — nằm ở đây qua i18n.
//
// Gõ lệnh là MIỄN PHÍ và không giới hạn (cùng luật "Gửi thử" của phòng
// lab): khám kỹ bao nhiêu cũng được, chỉ "Nộp bài" của phòng khám mới
// tính lượt.

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { SquareTerminal } from 'lucide-react'
import { useT } from '../../i18n'
import { Button } from '../../components/Button'
import {
  CLINIC_COMMANDS,
  initialTerminalState,
  runCommand,
  type ClinicPatient,
  type CommandOutcome,
} from '../../engine/clinic'
import { findDevice } from '../../engine/lab'

interface TermEntry {
  id: number
  input: string
  lines: string[]
  outcome: CommandOutcome
}

/** Phần thân một lượt lệnh: output thiết bị, hoặc microcopy tiếng Việt. */
function EntryBody({ entry }: { entry: TermEntry }) {
  const t = useT()
  const { outcome } = entry
  if (outcome.kind === 'help') {
    return (
      <div className="text-ink-muted">
        <p>{t('clinic.termHelpTitle')}</p>
        <ul>
          {CLINIC_COMMANDS.filter((c) => c !== 'help').map((c) => (
            <li key={c}>
              <span className="text-ink">{c}</span> — {t(`clinic.cmd.${c}`)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (outcome.kind === 'unknown') {
    return <p className="text-warn">{t('clinic.termUnknown', { cmd: outcome.input })}</p>
  }
  if (outcome.kind === 'capture' && outcome.empty) {
    return <p className="text-ink-muted">{t('clinic.termCaptureEmpty')}</p>
  }
  return <pre className="overflow-x-auto whitespace-pre text-ink">{entry.lines.join('\n')}</pre>
}

/**
 * Terminal giữ trạng thái phiên (ARP cache, capture, số lượt ping) NGAY
 * TRONG component: `patient` đổi (người học sửa sơ đồ ở pha sửa) thì các
 * lệnh sau chạy trên mạng mới nhưng cache cũ VẪN CÒN — đúng đời thật, và
 * chính là thứ làm `arp -a` kể được chuyện MAC đổi chủ ở ca trùng IP.
 */
export function ClinicTerminal({ patient }: { patient: ClinicPatient }) {
  const t = useT()
  const [term, setTerm] = useState(initialTerminalState)
  const [entries, setEntries] = useState<TermEntry[]>([])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const seat = findDevice(patient.topology, patient.seatId)
  const host = seat?.kind === 'pc' ? seat.hostname : patient.seatId
  const promptLabel = `${host}>`

  // Luôn cuộn về dòng mới nhất — như terminal thật.
  useEffect(() => {
    const el = scrollRef.current
    if (el !== null) el.scrollTop = el.scrollHeight
  }, [entries])

  const run = (e: FormEvent) => {
    e.preventDefault()
    const line = input.trim()
    if (line === '') return
    const result = runCommand(patient, term, line)
    setTerm(result.state)
    setEntries((old) => [...old, { id: old.length, input: line, lines: result.lines, outcome: result.outcome }])
    setInput('')
  }

  return (
    <div className="overflow-hidden rounded-md border border-edge bg-surface">
      <div className="flex items-center gap-2 border-b border-edge bg-panel px-3 py-2">
        <SquareTerminal size={14} aria-hidden className="text-accent" />
        <span className="font-mono text-xs font-semibold text-ink">{host}</span>
      </div>
      <div
        ref={scrollRef}
        role="log"
        aria-label={t('clinic.terminalAria', { host })}
        // Firefox/Safari không tự cho vùng cuộn nhận focus — thiếu tabIndex
        // là bàn phím thuần không cuộn lại được lịch sử (biên bản trung cấp).
        tabIndex={0}
        className="max-h-64 min-h-20 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed"
      >
        {entries.length === 0 && <p className="text-ink-muted">{t('clinic.terminalIntro')}</p>}
        {entries.map((entry) => (
          <div key={entry.id} className="mb-2">
            <p className="text-accent">
              {promptLabel} {entry.input}
            </p>
            <EntryBody entry={entry} />
          </div>
        ))}
      </div>
      <form onSubmit={run} className="flex flex-wrap items-center gap-2 border-t border-edge px-3 py-1.5">
        <span aria-hidden className="font-mono text-xs text-accent">
          {promptLabel}
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('clinic.terminalPlaceholder')}
          aria-label={t('clinic.terminalInputAria')}
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 basis-[65%] bg-transparent py-1 font-mono text-xs text-ink placeholder:text-ink-muted focus:outline-none sm:basis-auto"
        />
        <Button type="submit" variant="ghost" disabled={input.trim() === ''} className="ml-auto px-3 py-1 text-xs sm:ml-0">
          {t('clinic.terminalRun')}
        </Button>
      </form>
    </div>
  )
}
