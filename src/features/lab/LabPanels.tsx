// Các bảng điều khiển của phòng lab.
//
// Đây là ĐƯỜNG THAO TÁC CHÍNH, không phải phần phụ trợ: mọi việc (nối
// dây, đổi VLAN, đặt địa chỉ, gỡ thiết bị) đều làm trọn được từ đây bằng
// cách bấm chọn. Kéo-thả trên mặt bàn chỉ để sắp xếp cho dễ nhìn.
//
// Nhờ luật đó, một đường mã phục vụ cùng lúc: chuột, cảm ứng (ngón tay
// không che mất cổng 10px), bàn phím (WCAG 2.1.1), trình đọc màn hình,
// và test trong jsdom — thay vì bốn hệ thống song song.

import { useEffect, useState } from 'react'
import { Cable, RotateCcw, Redo2, Undo2, Send, Trash2 } from 'lucide-react'
import { Button } from '../../components/Button'
import { useT } from '../../i18n'
import type { TFunc } from '../../i18n'
import {
  findDevice,
  freePortsOf,
  linkOfPort,
  peerOfPort,
  portIdsOf,
  type Device,
  type LabGoal,
  type PortRef,
  type Topology,
} from '../../engine/lab'
import type { GoalOutcome } from '../../engine/lab'
import type { PacketHop, PingResult, SimStage } from '../../engine/lab'

// ---------------------------------------------------------------
// Mục tiêu của bài
// ---------------------------------------------------------------

/** Diễn đạt một mục tiêu thành câu tiếng người, dùng tên máy chứ không phải id. */
export function goalText(t: TFunc, topo: Topology, goal: LabGoal): string {
  const name = (id: string) => findDevice(topo, id)?.hostname ?? id
  switch (goal.kind) {
    case 'ping':
      return goal.expect === 'reach'
        ? t('lab.goalReach', { from: name(goal.from), to: name(goal.to) })
        : t('lab.goalBlocked', { from: name(goal.from), to: name(goal.to) })
    case 'pathThrough':
      return t('lab.goalPath', {
        from: name(goal.from),
        to: name(goal.to),
        via: goal.via.map(name).join(', '),
      })
    case 'macLearned':
      return t('lab.goalMac', { sw: name(goal.switchId), mac: goal.mac, port: goal.portId })
    case 'arpResolved':
      return t('lab.goalArp', { device: name(goal.deviceId), ip: goal.ip })
  }
}

export function GoalList({ topology, outcomes }: { topology: Topology; outcomes: readonly GoalOutcome[] }) {
  const t = useT()
  return (
    <section aria-labelledby="lab-goals" className="rounded-md border border-edge bg-panel p-4">
      <h3 id="lab-goals" className="mb-2 text-sm font-semibold text-ink">
        {t('lab.goalsTitle')}
      </h3>
      <ul className="space-y-1.5 text-sm">
        {outcomes.map((outcome, index) => (
          <li key={index} className="flex items-start gap-2">
            <span
              aria-hidden
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${outcome.met ? 'bg-ok' : 'bg-edge'}`}
            />
            <span className={outcome.met ? 'text-ink' : 'text-ink-muted'}>
              {goalText(t, topology, outcome.goal)}
              <span className="ml-1 text-xs">
                ({t(outcome.met ? 'lab.goalMet' : 'lab.goalUnmet')})
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ---------------------------------------------------------------
// Khay thiết bị
// ---------------------------------------------------------------

export function DeviceTray({
  kinds,
  onAdd,
}: {
  kinds: readonly ('pc' | 'switch' | 'router')[]
  onAdd: (kind: 'pc' | 'switch' | 'router') => void
}) {
  const t = useT()
  const labelOf = (kind: 'pc' | 'switch' | 'router') =>
    t(kind === 'pc' ? 'lab.kindPc' : kind === 'switch' ? 'lab.kindSwitch' : 'lab.kindRouter')

  return (
    <section aria-labelledby="lab-tray" className="rounded-md border border-edge bg-panel p-4">
      <h3 id="lab-tray" className="mb-2 text-sm font-semibold text-ink">
        {t('lab.trayTitle')}
      </h3>
      {kinds.length === 0 ? (
        <p className="text-sm text-ink-muted">{t('lab.trayLocked')}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {kinds.map((kind) => (
            <Button key={kind} variant="ghost" onClick={() => onAdd(kind)}>
              {t('lab.trayAdd', { kind: labelOf(kind) })}
            </Button>
          ))}
        </div>
      )}
    </section>
  )
}

// ---------------------------------------------------------------
// Bảng cấu hình thiết bị đang chọn
// ---------------------------------------------------------------

export interface ConfigPanelProps {
  topology: Topology
  device: Device | null
  armedPort: PortRef | null
  canSetVlan: boolean
  canSetIp: boolean
  canRemoveDevice: boolean
  canWire: boolean
  vlanChoices: readonly number[]
  onPickPort: (ref: PortRef) => void
  onRemoveWire: (linkId: string) => void
  onSetVlan: (portId: string, vlan: number) => void
  onSetPcIp: (ip: string, prefix: number, gateway: string) => void
  onSetRouterIp: (portId: string, ip: string, prefix: number) => void
  onRemoveDevice: () => void
}

export function ConfigPanel(props: ConfigPanelProps) {
  const t = useT()
  const { topology, device, armedPort } = props

  if (device === null) {
    return (
      <section className="rounded-md border border-edge bg-panel p-4">
        <h3 className="mb-2 text-sm font-semibold text-ink">{t('lab.panelTitle')}</h3>
        <p className="text-sm text-ink-muted">{t('lab.panelPick')}</p>
      </section>
    )
  }

  const ports = portIdsOf(device)

  return (
    <section aria-labelledby="lab-config" className="space-y-4 rounded-md border border-edge bg-panel p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 id="lab-config" className="text-sm font-semibold text-ink">
          {device.hostname}
        </h3>
        {props.canRemoveDevice && (
          <button
            type="button"
            onClick={props.onRemoveDevice}
            aria-label={t('lab.deviceRemove')}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-ink-muted transition-colors duration-(--dur) hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Trash2 size={14} aria-hidden />
          </button>
        )}
      </div>

      {/* Cổng: nơi nối dây bằng bấm chọn hai đầu */}
      <div>
        <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {t('lab.portsTitle')}
        </h4>
        <ul className="space-y-1.5">
          {ports.map((portId) => {
            const ref: PortRef = { deviceId: device.id, portId }
            const link = linkOfPort(topology, ref)
            const peer = peerOfPort(topology, ref)
            const peerName = peer === null ? null : (findDevice(topology, peer.deviceId)?.hostname ?? peer.deviceId)
            return (
              <li key={portId} className="flex items-center justify-between gap-2 text-sm">
                <span className="font-mono text-xs text-ink">{portId}</span>
                <span className="flex-1 text-xs text-ink-muted">
                  {peerName === null ? t('lab.portFree') : t('lab.portTo', { target: peerName })}
                </span>
                {link !== null && props.canWire && (
                  <button
                    type="button"
                    onClick={() => props.onRemoveWire(link.id)}
                    className="rounded px-2 py-0.5 text-xs text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {t('lab.wireRemove')}
                  </button>
                )}
                {link === null && props.canWire && (
                  <button
                    type="button"
                    onClick={() => props.onPickPort(ref)}
                    className="flex items-center gap-1 rounded px-2 py-0.5 text-xs text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <Cable size={12} aria-hidden />
                    {t('lab.portConnect')}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Đang cầm một đầu dây: liệt kê mọi cổng trống của thiết bị khác.
          Đây là đường nối dây dùng được bằng bàn phím và trên điện thoại. */}
      {armedPort !== null && (
        <div role="group" aria-label={t('lab.portPickTarget', { port: armedPort.portId })}>
          <p className="mb-1.5 text-xs text-ink-muted">
            {t('lab.portPickTarget', { port: `${armedPort.deviceId} · ${armedPort.portId}` })}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {topology.devices
              .filter((other) => other.id !== armedPort.deviceId)
              .flatMap((other) =>
                freePortsOf(topology, other.id).map((portId) => (
                  <Button
                    key={`${other.id}-${portId}`}
                    variant="ghost"
                    onClick={() => props.onPickPort({ deviceId: other.id, portId })}
                  >
                    {other.hostname} · {portId}
                  </Button>
                )),
              )}
            <Button variant="ghost" onClick={() => props.onPickPort(armedPort)}>
              {t('lab.portCancel')}
            </Button>
          </div>
        </div>
      )}

      {device.kind === 'switch' && props.canSetVlan && (
        <SwitchVlanEditor
          device={device}
          vlanChoices={props.vlanChoices}
          onSetVlan={props.onSetVlan}
        />
      )}

      {device.kind === 'pc' && props.canSetIp && <PcAddressEditor device={device} onApply={props.onSetPcIp} />}

      {device.kind === 'router' && props.canSetIp && (
        <RouterAddressEditor device={device} onApply={props.onSetRouterIp} />
      )}
    </section>
  )
}

function SwitchVlanEditor({
  device,
  vlanChoices,
  onSetVlan,
}: {
  device: Extract<Device, { kind: 'switch' }>
  vlanChoices: readonly number[]
  onSetVlan: (portId: string, vlan: number) => void
}) {
  const t = useT()
  return (
    <div className="space-y-2">
      {device.ports.map((port) => (
        <div key={port.id} role="radiogroup" aria-label={t('lab.vlanTitle', { port: port.id })}>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {t('lab.vlanTitle', { port: port.id })}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {vlanChoices.map((vlan) => (
              <button
                key={vlan}
                type="button"
                role="radio"
                aria-checked={port.vlan === vlan}
                onClick={() => onSetVlan(port.id, vlan)}
                className={[
                  'rounded-md border px-2.5 py-1 font-mono text-xs transition-colors duration-(--dur)',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  port.vlan === vlan
                    ? 'border-accent bg-accent/15 text-accent'
                    : 'border-edge text-ink-muted hover:text-ink',
                ].join(' ')}
              >
                {t('lab.vlanOption', { vlan: String(vlan) })}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const fieldClass =
  'w-full rounded-md border border-edge bg-bg px-2 py-1 font-mono text-xs text-ink placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-accent'

function PcAddressEditor({
  device,
  onApply,
}: {
  device: Extract<Device, { kind: 'pc' }>
  onApply: (ip: string, prefix: number, gateway: string) => void
}) {
  const t = useT()
  const [ip, setIp] = useState(device.ipConfig?.ip ?? '')
  const [prefix, setPrefix] = useState(String(device.ipConfig?.prefix ?? 24))
  const [gateway, setGateway] = useState(device.gateway ?? '')

  // Đổi thiết bị đang chọn thì ô nhập phải theo thiết bị mới, không giữ
  // giá trị của máy trước.
  useEffect(() => {
    setIp(device.ipConfig?.ip ?? '')
    setPrefix(String(device.ipConfig?.prefix ?? 24))
    setGateway(device.gateway ?? '')
  }, [device.id, device.ipConfig?.ip, device.ipConfig?.prefix, device.gateway])

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {t('lab.ipTitle', { name: device.hostname })}
      </h4>
      <label className="block text-xs text-ink-muted">
        {t('lab.ipAddress')}
        <input className={fieldClass} value={ip} onChange={(e) => setIp(e.target.value)} />
      </label>
      <label className="block text-xs text-ink-muted">
        {t('lab.ipPrefix')}
        <input className={fieldClass} value={prefix} onChange={(e) => setPrefix(e.target.value)} />
      </label>
      <label className="block text-xs text-ink-muted">
        {t('lab.ipGateway')}
        <input className={fieldClass} value={gateway} onChange={(e) => setGateway(e.target.value)} />
      </label>
      <Button variant="ghost" onClick={() => onApply(ip.trim(), Number(prefix), gateway.trim())}>
        {t('lab.ipApply')}
      </Button>
    </div>
  )
}

function RouterAddressEditor({
  device,
  onApply,
}: {
  device: Extract<Device, { kind: 'router' }>
  onApply: (portId: string, ip: string, prefix: number) => void
}) {
  const t = useT()
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {t('lab.ipTitle', { name: device.hostname })}
      </h4>
      {device.ports.map((port) => (
        <RouterPortEditor key={port.id} portId={port.id} config={port.ipConfig} onApply={onApply} />
      ))}
    </div>
  )
}

function RouterPortEditor({
  portId,
  config,
  onApply,
}: {
  portId: string
  config: { ip: string; prefix: number } | null
  onApply: (portId: string, ip: string, prefix: number) => void
}) {
  const t = useT()
  const [ip, setIp] = useState(config?.ip ?? '')
  const [prefix, setPrefix] = useState(String(config?.prefix ?? 24))

  useEffect(() => {
    setIp(config?.ip ?? '')
    setPrefix(String(config?.prefix ?? 24))
  }, [config?.ip, config?.prefix])

  return (
    <div className="space-y-1.5">
      <label className="block text-xs text-ink-muted">
        {portId} — {t('lab.ipAddress')}
        <input className={fieldClass} value={ip} onChange={(e) => setIp(e.target.value)} />
      </label>
      <label className="block text-xs text-ink-muted">
        {t('lab.ipPrefix')}
        <input className={fieldClass} value={prefix} onChange={(e) => setPrefix(e.target.value)} />
      </label>
      <Button variant="ghost" onClick={() => onApply(portId, ip.trim(), Number(prefix))}>
        {t('lab.ipApply')}
      </Button>
    </div>
  )
}

// ---------------------------------------------------------------
// Thanh công cụ + gửi gói tin
// ---------------------------------------------------------------

export interface LabToolbarProps {
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  onReset: () => void
}

export function LabToolbar({ canUndo, canRedo, onUndo, onRedo, onReset }: LabToolbarProps) {
  const t = useT()
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="ghost" onClick={onUndo} disabled={!canUndo}>
        <Undo2 size={14} aria-hidden />
        {t('lab.undo')}
      </Button>
      <Button variant="ghost" onClick={onRedo} disabled={!canRedo}>
        <Redo2 size={14} aria-hidden />
        {t('lab.redo')}
      </Button>
      <Button variant="ghost" onClick={onReset}>
        <RotateCcw size={14} aria-hidden />
        {t('lab.reset')}
      </Button>
    </div>
  )
}

export interface SendPanelProps {
  topology: Topology
  from: string
  to: string
  running: boolean
  hasRun: boolean
  onChangeFrom: (id: string) => void
  onChangeTo: (id: string) => void
  onSend: () => void
  onSkip: () => void
}

export function SendPanel(props: SendPanelProps) {
  const t = useT()
  const options = props.topology.devices.filter((d) => d.kind !== 'switch')

  return (
    <section aria-labelledby="lab-send" className="space-y-2 rounded-md border border-edge bg-panel p-4">
      <h3 id="lab-send" className="text-sm font-semibold text-ink">
        {t('lab.sendTitle')}
      </h3>
      <div className="flex flex-wrap items-end gap-2">
        <label className="text-xs text-ink-muted">
          {t('lab.sendFrom')}
          <select
            className={fieldClass}
            value={props.from}
            onChange={(e) => props.onChangeFrom(e.target.value)}
            aria-label={t('lab.sendFrom')}
          >
            {options.map((device) => (
              <option key={device.id} value={device.id}>
                {device.hostname}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-ink-muted">
          {t('lab.sendTo')}
          <select
            className={fieldClass}
            value={props.to}
            onChange={(e) => props.onChangeTo(e.target.value)}
            aria-label={t('lab.sendTo')}
          >
            {options.map((device) => (
              <option key={device.id} value={device.id}>
                {device.hostname}
              </option>
            ))}
          </select>
        </label>
        <Button onClick={props.onSend}>
          <Send size={14} aria-hidden />
          {t(props.hasRun ? 'lab.sendAgain' : 'lab.sendButton')}
        </Button>
        {props.running && (
          <Button variant="ghost" onClick={props.onSkip}>
            {t('lab.sendSkip')}
          </Button>
        )}
      </div>
      <p className="text-xs text-ink-muted">{t('lab.sendFree')}</p>
    </section>
  )
}

// ---------------------------------------------------------------
// Nhật ký hành trình
// ---------------------------------------------------------------

const REASON_KEY: Record<PacketHop['reason'], string> = {
  'host-egress': 'lab.reasonHostEgress',
  'broadcast-flood': 'lab.reasonBroadcastFlood',
  'unknown-unicast-flood': 'lab.reasonUnknownUnicastFlood',
  'mac-table-hit': 'lab.reasonMacTableHit',
  routed: 'lab.reasonRouted',
}

const PHASE_KEY: Record<SimStage['phase'], string> = {
  'arp-request': 'lab.phaseArpRequest',
  'arp-reply': 'lab.phaseArpReply',
  'echo-request': 'lab.phaseEchoRequest',
  'echo-reply': 'lab.phaseEchoReply',
}

export interface FlatHop {
  hop: PacketHop
  phase: SimStage['phase']
}

/** Gộp mọi chặng của mọi giai đoạn thành một danh sách phẳng theo thứ tự thời gian. */
export function flattenHops(result: PingResult | null): FlatHop[] {
  if (result === null) return []
  return result.stages.flatMap((stage) => stage.hops.map((hop) => ({ hop, phase: stage.phase })))
}

/**
 * Nhật ký chặng. LUÔN render đầy đủ ở mọi nhánh — kể cả khi người dùng
 * tắt chuyển động hoặc khi chạy trong jsdom. Tải trọng sư phạm nằm ở
 * đây; animation chỉ là lớp dual-coding đắp lên trên.
 */
export function HopLog({
  topology,
  result,
  visibleCount,
}: {
  topology: Topology
  result: PingResult | null
  visibleCount: number
}) {
  const t = useT()
  const hops = flattenHops(result)
  const name = (id: string) => findDevice(topology, id)?.hostname ?? id

  if (result === null) {
    return (
      <section className="rounded-md border border-edge bg-panel p-4">
        <h3 className="mb-2 text-sm font-semibold text-ink">{t('lab.hopTitle')}</h3>
        <p className="text-sm text-ink-muted">{t('lab.hopEmpty')}</p>
      </section>
    )
  }

  const shown = hops.slice(0, Math.max(visibleCount, 0) || hops.length)
  const resultKey = result.replied ? 'lab.resultOk' : result.reached ? 'lab.resultReachedOnly' : 'lab.resultFail'

  return (
    <section aria-labelledby="lab-hops" className="rounded-md border border-edge bg-panel p-4">
      <h3 id="lab-hops" className="mb-2 text-sm font-semibold text-ink">
        {t('lab.hopTitle')}
      </h3>
      <ol aria-live="polite" className="space-y-1 text-xs">
        {shown.map((entry, index) => (
          <li key={index} className="flex gap-2 text-ink-muted">
            <span className="shrink-0 font-mono text-[10px] uppercase text-accent">{t(PHASE_KEY[entry.phase])}</span>
            <span>
              {t('lab.hopLine', {
                from: name(entry.hop.from.deviceId),
                to: name(entry.hop.to.deviceId),
                reason: t(REASON_KEY[entry.hop.reason]),
              })}
            </span>
          </li>
        ))}
      </ol>
      <p className={`mt-3 text-sm ${result.replied ? 'text-ok' : 'text-warn'}`} role="status">
        {t(resultKey)}
      </p>
      {result.failure !== null && (
        <p className="mt-1 text-xs text-ink-muted">{t(`lab.failure.${result.failure}`)}</p>
      )}
    </section>
  )
}

export function DiagnosisList({ codes }: { codes: readonly string[] }) {
  const t = useT()
  if (codes.length === 0) return null
  return (
    <section className="rounded-md border border-edge bg-panel p-4">
      <h3 className="mb-2 text-sm font-semibold text-ink">{t('lab.diagnosisTitle')}</h3>
      <ul className="space-y-1 text-xs text-ink-muted">
        {codes.map((code) => (
          <li key={code}>{t(`lab.diagnosis.${code}`)}</li>
        ))}
      </ul>
    </section>
  )
}
