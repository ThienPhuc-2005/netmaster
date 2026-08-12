// Phòng lab mô phỏng mạng (spec Module 4).
//
// Vỏ ngoài giữ toàn bộ trạng thái và nối ba mảnh lại: phiên soạn thảo
// của engine (topology + undo), bố cục trên mặt bàn, và một lượt chạy
// mô phỏng.
//
// HAI NÚT TÁCH BẠCH (đã chốt với người dùng): "Gửi thử" bắn gói tin xem
// chơi bao nhiêu lần cũng được và KHÔNG tính; chỉ "Nộp bài" mới tính một
// lượt trong thang phản hồi 3 tầng. Nhờ vậy spec 4.5 ("mọi thao tác undo
// được — khuyến khích thử nghiệm") và nguyên tắc 4 (lời giải sau 3 lần
// sai) không giẫm lên nhau.
//
// Bố cục KHÔNG nằm trong lịch sử undo: kéo thiết bị sang chỗ khác không
// đổi gì về mạng, và undo nên dành cho những thao tác người học sợ làm
// hỏng. Xóa thiết bị vẫn giữ lại vị trí cũ, nên undo trả nó về đúng chỗ.

import { useEffect, useMemo, useRef, useState } from 'react'
import { playEarcon } from '../../audio/earcons'
import { AlertCircle } from 'lucide-react'
import { Button } from '../../components/Button'
import { useT } from '../../i18n'
import {
  ALLOW_EVERYTHING,
  applyLabAction,
  canApplyLabAction,
  canRedo,
  canUndo,
  findDevice,
  gradeLab,
  portIdsOf,
  redoLab,
  resetLab,
  restoreLab,
  samePort,
  simulatePing,
  startLab,
  undoLab,
  type Device,
  type LabAction,
  type LabRejection,
  type LabSpec,
  type PingResult,
  type PortRef,
  type Topology,
} from '../../engine/lab'
import { LabCanvas, pointOfPort } from './LabCanvas'
import {
  ConfigPanel,
  DeviceTray,
  DiagnosisList,
  GoalList,
  HopLog,
  LabToolbar,
  SendPanel,
  StpPanel,
  flattenHops,
} from './LabPanels'
import { autoLayout, wirePath, type Point } from './geometry'
import { usePacketFlight } from './usePacketFlight'

/** VLAN nào được chọn trong bảng cấu hình: những VLAN đề bài đang dùng. */
function vlanChoicesOf(spec: LabSpec): number[] {
  const found = new Set<number>()
  for (const topo of [spec.initial, spec.solution]) {
    for (const device of topo.devices) {
      if (device.kind !== 'switch') continue
      for (const port of device.ports) {
        found.add(port.vlan)
        // VLAN chỉ xuất hiện trong allowed list / native của trunk cũng
        // phải có mặt trong bảng chọn — nếu không, đề "thêm VLAN 30 vào
        // trunk" thành đề không bấm được (Module 14).
        for (const vlan of port.allowedVlans ?? []) found.add(vlan)
        if (port.nativeVlan !== undefined) found.add(port.nativeVlan)
      }
    }
  }
  if (found.size === 0) found.add(1)
  return [...found].sort((a, b) => a - b)
}

/** Cặp máy mặc định cho ô "Gửi thử": lấy từ mục tiêu đầu tiên có ping. */
function defaultPair(spec: LabSpec): { from: string; to: string } {
  for (const goal of spec.goals) {
    if (goal.kind === 'ping' || goal.kind === 'pathThrough') return { from: goal.from, to: goal.to }
  }
  const hosts = spec.initial.devices.filter((d) => d.kind !== 'switch')
  return { from: hosts[0]?.id ?? '', to: hosts[1]?.id ?? hosts[0]?.id ?? '' }
}

function newDeviceOf(kind: Device['kind'], index: number): Device {
  const suffix = index + 1
  if (kind === 'pc') {
    return {
      kind: 'pc',
      id: `pc-new-${suffix}`,
      hostname: `PC-${suffix}`,
      // MAC sinh theo số thứ tự nên tất định, không trùng dải AA:BB:CC:00:00:xx của đề.
      port: { id: 'eth0', mac: `AA:BB:CC:10:00:${String(suffix).padStart(2, '0')}` },
      ipConfig: null,
      gateway: null,
    }
  }
  if (kind === 'switch') {
    return {
      kind: 'switch',
      id: `sw-new-${suffix}`,
      hostname: `Switch-${suffix}`,
      ports: [1, 2, 3, 4].map((n) => ({ id: `p${n}`, vlan: 1 })),
    }
  }
  return {
    kind: 'router',
    id: `r-new-${suffix}`,
    hostname: `Router-${suffix}`,
    ports: [0, 1].map((n) => ({
      id: `g${n}`,
      mac: `AA:BB:CC:20:0${n}:${String(suffix).padStart(2, '0')}`,
      ipConfig: null,
    })),
    staticRoutes: [],
  }
}

/** Ảnh chụp mặt bàn để mở lại bài đang lắp dở (persist bài dở — #20). */
export interface LabDraftSnapshot {
  topology: Topology
  layout: Record<string, Point>
}

export interface NetworkLabProps {
  spec: LabSpec
  /**
   * Bài lắp dở của lần trước — có thì mở thẳng vào sơ đồ đó thay vì đề
   * bài. `spec.initial` vẫn là chỗ "Làm lại từ đầu" quay về.
   */
  initialDraft?: LabDraftSnapshot | null
  /**
   * Mặt bàn vừa đổi — tầng gọi tự quyết lưu vào đâu. Chỉ bắn khi người
   * học ĐÃ làm gì đó: mở bài ra xem rồi đi chỗ khác không tạo bài dở.
   * `null` khi bấm "Về sơ đồ ban đầu" — bài dở phải BIẾN MẤT, không phải
   * bị thay bằng một ảnh chụp sơ đồ nguyên sơ (cùng hợp đồng với CLI/PS).
   */
  onDraftChange?: (draft: LabDraftSnapshot | null) => void
  /**
   * Nộp bài. Có truyền thì hiện nút "Nộp bài" — tầng gọi tự quyết việc
   * chấm và đếm lượt sai; phòng lab chỉ trao lại sơ đồ hiện tại.
   */
  onSubmit?: (topology: Topology) => void
  /**
   * Ẩn danh sách "Chỗ đáng nhìn lại". Phòng khám (Module 11) dùng cờ này:
   * ở đó việc TÌM RA bệnh là của người học — máy nói hộ là lộ đề.
   */
  hideDiagnosis?: boolean
  /**
   * Báo sơ đồ hiện tại mỗi khi nó đổi — cho tầng gọi muốn soi sơ đồ sống
   * (phòng khám chạy terminal/triệu chứng trên đúng sơ đồ đang sửa).
   */
  onTopologyChange?: (topology: Topology) => void
  /**
   * Bài THI: mục tiêu là đề bài tĩnh (không ✓/○ sống) và không có "Chỗ
   * đáng nhìn lại" — màn intro hứa "không có gợi ý giữa chừng" thì phòng
   * lab phải giữ lời. "Gửi thử" vẫn miễn phí: tự kiểm là kỹ năng được đo.
   */
  examMode?: boolean
}

export function NetworkLab({
  spec,
  onSubmit,
  hideDiagnosis,
  onTopologyChange,
  initialDraft,
  onDraftChange,
  examMode,
}: NetworkLabProps) {
  const t = useT()
  // Lưới đỡ nội-dung-đã-đổi (biên bản hội đồng trung cấp, ghế dữ liệu):
  // question id còn nhưng sơ đồ đề đã đổi — thiết bị mới của spec không
  // có trong bài dở thì restore là mở một mặt bàn THIẾU ĐỒ, goal trỏ vào
  // thiết bị tàng hình và người học kẹt câm lặng. Lệch tập thiết bị bắt
  // buộc → bỏ bài dở, mở bài sạch (mất một bài dở còn hơn kẹt — đúng
  // triết lý lưới lessonRuntimes của store).
  const draft = useMemo(() => {
    if (initialDraft == null) return null
    const have = new Set(initialDraft.topology.devices.map((d) => d.id))
    const required = [
      ...spec.initial.devices.map((d) => d.id),
      ...spec.goals.flatMap((g) =>
        g.kind === 'macLearned' ? [g.switchId] : g.kind === 'arpResolved' ? [g.deviceId] : [g.from, g.to],
      ),
    ]
    return required.every((id) => have.has(id)) ? initialDraft : null
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ tính một lần lúc mount, như chính initialDraft
  }, [])
  const [session, setSession] = useState(() =>
    draft == null ? startLab(spec.initial, spec.allow) : restoreLab(spec.initial, spec.allow, draft.topology),
  )
  // Trộn autoLayout làm nền: thiết bị nào bài dở chưa lưu chỗ đứng vẫn có
  // tọa độ — không bao giờ có thiết bị tàng hình vì thiếu layout.
  const [layout, setLayout] = useState<Record<string, Point>>(() =>
    draft == null
      ? autoLayout(spec.initial.devices)
      : { ...autoLayout(draft.topology.devices), ...draft.layout },
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [armedPort, setArmedPort] = useState<PortRef | null>(null)
  const [refusal, setRefusal] = useState<LabRejection | null>(null)
  const [run, setRun] = useState<PingResult | null>(null)
  const [pair, setPair] = useState(() => defaultPair(spec))

  const topology = session.present
  const vlanChoices = useMemo(() => vlanChoicesOf(spec), [spec])
  const evaluation = useMemo(() => gradeLab(spec, topology), [spec, topology])

  useEffect(() => {
    onTopologyChange?.(topology)
  }, [topology, onTopologyChange])

  // Lưu bài dở: bỏ qua lượt render ĐẦU (chưa có gì để lưu), sau đó mỗi
  // lần sơ đồ hoặc chỗ đứng thiết bị đổi là ghi lại một ảnh chụp.
  //
  // Hàm callback đi qua REF chứ không nằm trong deps: nơi gọi thường
  // truyền một hàm mũi tên mới mỗi lần render, mà lưu bài dở lại làm
  // store đổi → render lại → hàm mới → lưu tiếp… tức là một vòng lặp vô
  // tận. Deps chỉ gồm thứ thật sự là NỘI DUNG của ảnh chụp.
  const draftSaved = useRef(false)
  const draftCallback = useRef(onDraftChange)
  draftCallback.current = onDraftChange
  useEffect(() => {
    if (!draftSaved.current) {
      draftSaved.current = true
      return
    }
    draftCallback.current?.({ topology, layout })
  }, [topology, layout])

  const hops = useMemo(() => flattenHops(run), [run])
  const flight = usePacketFlight(hops.length, (index) => {
    const entry = hops[index]
    if (entry === undefined) return ''
    const from = pointOfPort(topology, layout, entry.hop.from)
    const to = pointOfPort(topology, layout, entry.hop.to)
    return from === null || to === null ? '' : wirePath(from, to)
  })

  const phase = flight.phase
  const flightActive = phase.kind === 'arming' || phase.kind === 'flying' || phase.kind === 'atNode'
  // Hai thiết bị hai đầu chặng đang bay sáng lên; phần còn lại mờ đi
  // (signaling — spec 4.2 "phần đang giảng sáng, phần khác mờ 40%").
  const activeDeviceIds = useMemo(() => {
    if (phase.kind !== 'arming' && phase.kind !== 'flying' && phase.kind !== 'atNode') return []
    const entry = hops[phase.hop]
    return entry === undefined ? [] : [entry.hop.from.deviceId, entry.hop.to.deviceId]
  }, [phase, hops])

  /** Mọi thay đổi mạng đi qua đây: hỏi engine trước, từ chối thì nói tử tế. */
  // Trả về CÓ ÁP ĐƯỢC KHÔNG: tiếng "tách" chỉ được vang khi sợi dây thật
  // sự cắm vào. Kêu lên rồi mới hiện lời từ chối là nói dối bằng âm thanh.
  const dispatch = (action: LabAction): boolean => {
    const rejection = canApplyLabAction(session, action)
    if (rejection !== null) {
      setRefusal(rejection)
      return false
    }
    setRefusal(null)
    setSession(applyLabAction(session, action))
    return true
  }

  const selected = selectedId === null ? null : findDevice(topology, selectedId)

  const handlePickPort = (ref: PortRef) => {
    setRefusal(null)
    if (armedPort === null) {
      setArmedPort(ref)
      setSelectedId(ref.deviceId)
      return
    }
    // Bấm lại chính cổng đang cầm = buông ra. Luôn có đường thoát.
    if (samePort(armedPort, ref)) {
      setArmedPort(null)
      return
    }
    const noiDuoc = dispatch({
      kind: 'add-link',
      link: { id: `w-${armedPort.deviceId}-${armedPort.portId}-${ref.deviceId}-${ref.portId}`, a: armedPort, b: ref },
    })
    if (noiDuoc) playEarcon('wireClick')
    setArmedPort(null)
  }

  const handleAddDevice = (kind: Device['kind']) => {
    const device = newDeviceOf(kind, topology.devices.length)
    const taken = Object.values(layout)
    const spot = taken.length === 0 ? { x: 200, y: 200 } : { x: 200 + (taken.length % 4) * 160, y: 200 }
    dispatch({ kind: 'add-device', device })
    setLayout((current) => ({ ...current, [device.id]: spot }))
  }

  const handleSend = () => {
    const result = simulatePing(topology, { from: pair.from, to: pair.to })
    setRun(result)
    setRefusal(null)
    playEarcon('packetFly')
    flight.start()
  }

  const wireCanBeChanged = spec.allow.addLinks || spec.allow.removeLinks

  return (
    <div className="space-y-4">
      {/* 3fr/1fr chứ không phải 2fr/1fr, và cột phải sàn 256px chứ không
          phải 280px — hai con số này cốt để MẶT BÀN ĐỦ RỘNG ở đúng bề
          ngang thật của app.
          Khung nội dung là max-w-4xl, trừ padding còn 832px; trừ tiếp
          khe 16px là 816px chia cho hai cột. Với 2fr/1fr + sàn 280px thì
          cột trái được 536px — HỤT 24px so với bề rộng tối thiểu 560px
          của mặt bàn (LabCanvas, min ấy có lý do WCAG 2.5.8: hẹp hơn thì
          hai vùng chạm cổng dính vào nhau). Hụt 24px nghĩa là sơ đồ lúc
          nào cũng phải cuộn ngang trên desktop — mà cuộn ngang vốn chỉ
          định dành cho màn dưới 768px. Với 3fr/1fr + sàn 256px: cột phải
          256px, cột trái đúng 560px, vừa khít. */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(256px,1fr)]">
        <div className="space-y-3">
          <LabCanvas
            topology={topology}
            layout={layout}
            selectedId={selectedId}
            armedPort={armedPort}
            activeDeviceIds={activeDeviceIds}
            flightActive={flightActive}
            flight={flight}
            onSelectDevice={(id) => {
              setSelectedId(id)
              setRefusal(null)
            }}
            onPickPort={handlePickPort}
            onMoveDevice={(id, point) => setLayout((current) => ({ ...current, [id]: point }))}
          />
          <LabToolbar
            canUndo={canUndo(session)}
            canRedo={canRedo(session)}
            onUndo={() => {
              setSession(undoLab(session))
              setArmedPort(null)
              setRefusal(null)
            }}
            onRedo={() => {
              setSession(redoLab(session))
              setArmedPort(null)
              setRefusal(null)
            }}
            onReset={() => {
              setSession(resetLab(session))
              // Về sơ đồ ban đầu là về CẢ chỗ đứng thiết bị của đề — không
              // thì thiết bị mà bài dở chưa từng đặt vẫn không có tọa độ.
              setLayout(autoLayout(resetLab(session).present.devices))
              setArmedPort(null)
              setRefusal(null)
              // Bài dở phải BIẾN MẤT (nếp CLI/PS): không xóa thì effect lưu
              // ngay một ảnh chụp sơ đồ nguyên sơ — chiếm một suất trần và
              // lần sau mở lại đi qua đường restore vô nghĩa (biên bản).
              draftSaved.current = false
              draftCallback.current?.(null)
            }}
          />
          {/* Lời từ chối: hổ phách + giọng tử tế, không bao giờ chữ "SAI" (spec 4.4). */}
          {refusal !== null && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-md border border-warn/40 bg-warn/10 px-4 py-3 text-sm text-ink"
            >
              <AlertCircle size={16} aria-hidden className="mt-0.5 shrink-0 text-warn" />
              <span>{t(`lab.refusal.${refusal}`)}</span>
            </div>
          )}
          <p className="text-xs text-ink-muted lg:hidden">{t('lab.narrowBody')}</p>
        </div>

        <div className="space-y-4">
          <GoalList topology={topology} outcomes={evaluation.goals} hideStatus={examMode === true} />
          <DeviceTray kinds={spec.allow.addDevices} onAdd={handleAddDevice} />
          <ConfigPanel
            topology={topology}
            device={selected}
            onPickDevice={(id) => setSelectedId(id)}
            armedPort={armedPort}
            canSetVlan={spec.allow.setVlan}
            canSetTrunk={spec.allow.setTrunk === true}
            onSetPortMode={(portId, mode) =>
              selected !== null &&
              dispatch({ kind: 'set-switch-port-mode', deviceId: selected.id, portId, mode })
            }
            onSetTrunkAllowed={(portId, vlans) =>
              selected !== null && dispatch({ kind: 'set-trunk-allowed', deviceId: selected.id, portId, vlans })
            }
            onSetTrunkNative={(portId, vlan) =>
              selected !== null && dispatch({ kind: 'set-trunk-native', deviceId: selected.id, portId, vlan })
            }
            canSetIp={spec.allow.setIp}
            canRemoveDevice={spec.allow.removeDevices}
            canWire={wireCanBeChanged}
            vlanChoices={vlanChoices}
            onPickPort={handlePickPort}
            onRemoveWire={(linkId) => dispatch({ kind: 'remove-link', linkId })}
            onSetVlan={(portId, vlan) =>
              selected !== null && dispatch({ kind: 'set-switch-port-vlan', deviceId: selected.id, portId, vlan })
            }
            onSetPcIp={(ip, prefix, gateway) =>
              selected !== null &&
              dispatch({
                kind: 'set-pc-ip',
                deviceId: selected.id,
                ipConfig: ip === '' ? null : { ip, prefix },
                gateway: gateway === '' ? null : gateway,
              })
            }
            onSetRouterIp={(portId, ip, prefix) =>
              selected !== null &&
              dispatch({
                kind: 'set-router-port-ip',
                deviceId: selected.id,
                portId,
                ipConfig: ip === '' ? null : { ip, prefix },
              })
            }
            onRemoveDevice={() => {
              if (selected === null) return
              dispatch({ kind: 'remove-device', deviceId: selected.id })
              setSelectedId(null)
            }}
          />
        </div>
      </div>

      {spec.allow.setStp === true && (
        <StpPanel
          topology={topology}
          onSetStp={(enabled) => dispatch({ kind: 'set-stp', enabled })}
          onSetPriority={(deviceId, priority) => dispatch({ kind: 'set-bridge-priority', deviceId, priority })}
        />
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <SendPanel
          topology={topology}
          from={pair.from}
          to={pair.to}
          running={flightActive}
          hasRun={run !== null}
          onChangeFrom={(id) => setPair((p) => ({ ...p, from: id }))}
          onChangeTo={(id) => setPair((p) => ({ ...p, to: id }))}
          onSend={handleSend}
          onSkip={flight.skip}
        />
        <HopLog topology={topology} result={run} visibleCount={flight.visibleHops} />
      </div>

      {/* Bài thi cũng ẩn "Chỗ đáng nhìn lại" — máy gọi tên bệnh giữa bài thi
          là gợi ý giữa chừng, còn lộ hơn cả bảng ✓/○. */}
      {hideDiagnosis !== true && examMode !== true && <DiagnosisList codes={evaluation.diagnosis} />}

      {onSubmit !== undefined && (
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-edge bg-panel px-4 py-3">
          <Button onClick={() => onSubmit(topology)}>{t('lab.submit')}</Button>
          <span className="text-xs text-ink-muted">{t('lab.submitHint')}</span>
        </div>
      )}
    </div>
  )
}

/** Danh sách cổng của một thiết bị — tiện cho nơi gọi muốn dựng menu riêng. */
export function portsOfDevice(topology: Topology, deviceId: string): string[] {
  const device = findDevice(topology, deviceId)
  return device === null ? [] : portIdsOf(device)
}

/** Quyền rộng nhất, dùng cho trang trưng bày design system. */
export { ALLOW_EVERYTHING }
