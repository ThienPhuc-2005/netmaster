// Terminal ảo của Phòng khám (spec Module 11): ping, ipconfig, tracert,
// nslookup, netstat, arp, capture (Wireshark cơ bản — bảng bắt gói),
// gpresult. Người học gõ LỆNH THẬT; output SUY TỪ MÔ PHỎNG, không phải
// văn bản soạn sẵn theo kịch bản.
//
// Ranh giới chuỗi (giữ đúng nếp "engine không chứa chuỗi hiển thị"):
//   - `lines` là OUTPUT CỦA THIẾT BỊ — dữ liệu nghề tiếng Anh chuẩn
//     (giống hostname, địa chỉ IP): tất định, test so sánh được, và
//     người học PHẢI tập đọc đúng thứ họ sẽ gặp khi đi làm (spec 4.4:
//     thuật ngữ giữ tiếng Anh). Microcopy tiếng Việt (gợi ý, chú giải,
//     help) nằm ở tầng UI/i18n, KHÔNG ở đây.
//   - Lệnh `help` và lệnh không tồn tại trả outcome RỖNG lines — UI tự
//     render lời tiếng Việt.
//
// Technical contract: thuần và tất định — không đồng hồ, không random.
// Thời gian trong output là hằng ("time<1ms"); TTL suy từ số router đã
// qua. Ca "trùng IP" cần hiện tượng hai máy GIÀNH nhau trả lời: engine
// luân phiên chủ IP theo SỐ LẦN PING đã chạy trong phiên (tất định) —
// chạy ping hai lần thấy MAC đổi trong `arp -a`, đúng bài chẩn đoán
// trùng IP kinh điển ngoài đời.

import {
  findDevice,
  isValidIpv4,
  type DeviceId,
  type Ipv4,
  type Topology,
} from '../lab/topology'
import { prefixToMask } from '../subnet/ipv4'
import {
  emptyNetState,
  simulatePing,
  type NetState,
  type PingFailure,
  type PingResult,
  type SimStage,
} from '../lab/simulate'
import { hostBlockOf, ipOwners, type ClinicPatient, type HostBlock, type NetstatRow, type AppliedGpo } from './patient'

// ---------------------------------------------------------------
// Trạng thái phiên terminal
// ---------------------------------------------------------------

export interface TerminalState {
  /** Bảng MAC/ARP học được qua các lượt ping — dùng lại giữa các lệnh. */
  net: NetState
  /** Chuỗi chặng của lượt ping/tracert gần nhất — nguồn của `capture`. */
  lastCapture: SimStage[] | null
  /** Số lượt ping đã chạy tới từng IP — quyết định máy nào "giành" được IP trùng. */
  pingCounts: Record<Ipv4, number>
}

export function initialTerminalState(): TerminalState {
  return { net: emptyNetState(), lastCapture: null, pingCounts: {} }
}

// ---------------------------------------------------------------
// Kết quả lệnh — có cấu trúc để test và để UI chú giải
// ---------------------------------------------------------------

export type ResolveFailure = 'no-dns-configured' | 'dns-timeout' | 'nxdomain'

export type CommandOutcome =
  | { kind: 'help' }
  | { kind: 'unknown'; input: string }
  | { kind: 'usage'; command: string }
  | {
      kind: 'ipconfig'
      hostname: string
      ip: Ipv4 | null
      mask: string | null
      gateway: Ipv4 | null
      dnsServer: Ipv4 | null
    }
  | {
      kind: 'ping'
      target: string
      resolvedIp: Ipv4 | null
      resolveFailure: ResolveFailure | null
      replied: boolean
      failure: PingFailure | 'no-such-host' | null
      /** Luật chặn trên máy đích đã nuốt gói (mạng thông mà ping câm). */
      blockedBy: HostBlock | null
      /** Nhiều thiết bị cùng giữ IP đích — ca trùng IP. */
      conflictOwners: DeviceId[]
    }
  | {
      kind: 'tracert'
      target: string
      resolvedIp: Ipv4 | null
      resolveFailure: ResolveFailure | null
      routerIps: Ipv4[]
      reachedDest: boolean
    }
  | {
      kind: 'nslookup'
      name: string
      serverIp: Ipv4 | null
      answer: Ipv4 | null
      failure: ResolveFailure | null
    }
  | { kind: 'netstat'; rows: NetstatRow[] }
  | { kind: 'arp'; entries: { ip: Ipv4; mac: string }[] }
  | { kind: 'capture'; rows: CaptureRow[]; empty: boolean }
  | { kind: 'gpresult'; inDomain: boolean; gpos: AppliedGpo[] }

export interface CaptureRow {
  no: number
  phase: SimStage['phase']
  srcIp: Ipv4
  dstIp: Ipv4
  srcMac: string
  dstMac: string
  /** Gói chết giữa đường (không tới được nơi nhận nào). */
  dropped: boolean
}

export interface CommandResult {
  outcome: CommandOutcome
  /** Output "của thiết bị" — rỗng với help/unknown (UI tự lo lời). */
  lines: string[]
  state: TerminalState
}

/** Lệnh phòng khám công nhận — UI dùng cho help và gợi ý gõ. */
export const CLINIC_COMMANDS = [
  'ipconfig',
  'ping',
  'tracert',
  'nslookup',
  'netstat',
  'arp',
  'capture',
  'gpresult',
  'help',
] as const

// ---------------------------------------------------------------
// Phân giải tên qua hồ sơ bệnh
// ---------------------------------------------------------------

function resolveName(
  patient: ClinicPatient,
  name: string,
): { ip: Ipv4; serverIp: Ipv4 } | { failure: ResolveFailure; serverIp: Ipv4 | null } {
  const dns = patient.overlay.dns
  if (dns === undefined) return { failure: 'no-dns-configured', serverIp: null }
  if (dns.down === true) return { failure: 'dns-timeout', serverIp: dns.serverIp }
  const record = dns.records.find((r) => r.name.toLowerCase() === name.toLowerCase())
  if (record === undefined) return { failure: 'nxdomain', serverIp: dns.serverIp }
  return { ip: record.ip, serverIp: dns.serverIp }
}

// ---------------------------------------------------------------
// Chạy một lượt ping mô phỏng (dùng chung cho ping + tracert)
// ---------------------------------------------------------------

interface SimOutcome {
  result: PingResult | null
  targetDeviceId: DeviceId | null
  conflictOwners: DeviceId[]
  net: NetState
}

/**
 * Tìm thiết bị giữ `ip` rồi ủy quyền cho simulatePing của lab engine.
 * IP có NHIỀU chủ (bệnh trùng IP): chủ được chọn luân phiên theo số lượt
 * ping — hai lượt liền nhau có thể ra hai máy khác nhau, MAC trong ARP
 * cache đổi theo. Đó chính là triệu chứng để người học bắt bệnh.
 */
function runSim(patient: ClinicPatient, state: TerminalState, ip: Ipv4, count: number): SimOutcome {
  const owners = ipOwners(patient.topology, ip)
  if (owners.length === 0) {
    return { result: null, targetDeviceId: null, conflictOwners: [], net: state.net }
  }
  const chosen = owners[count % owners.length]!
  const device = findDevice(patient.topology, chosen)!
  // Router giữ IP trên một cổng cụ thể — trỏ đúng cổng đó.
  let toPortId: string | undefined
  if (device.kind === 'router') {
    toPortId = device.ports.find((p) => p.ipConfig?.ip === ip)?.id
  }
  const result = simulatePing(patient.topology, { from: patient.seatId, to: chosen, toPortId }, state.net)
  return {
    result,
    targetDeviceId: chosen,
    conflictOwners: owners.length > 1 ? owners : [],
    net: result.state,
  }
}

/** IP của seat (null khi máy chưa cấu hình). */
function seatIp(patient: ClinicPatient): Ipv4 | null {
  const seat = findDevice(patient.topology, patient.seatId)
  return seat?.kind === 'pc' ? (seat.ipConfig?.ip ?? null) : null
}

function seatGateway(patient: ClinicPatient): Ipv4 | null {
  const seat = findDevice(patient.topology, patient.seatId)
  return seat?.kind === 'pc' ? seat.gateway : null
}

/** Các router gói ECHO-REQUEST đã ghé, theo thứ tự — hiện trong tracert. */
function routersOnPath(topology: Topology, stages: SimStage[]): { deviceId: DeviceId; ip: Ipv4 }[] {
  const chain: { deviceId: DeviceId; ip: Ipv4 }[] = []
  for (const stage of stages) {
    if (stage.phase !== 'echo-request') continue
    for (const hop of stage.hops) {
      const device = findDevice(topology, hop.to.deviceId)
      if (device?.kind !== 'router') continue
      const port = device.ports.find((p) => p.id === hop.to.portId)
      const ip = port?.ipConfig?.ip
      if (ip === undefined || ip === null) continue
      if (chain.at(-1)?.deviceId === device.id) continue
      if (chain.some((c) => c.deviceId === device.id)) continue
      chain.push({ deviceId: device.id, ip })
    }
  }
  return chain
}

// ---------------------------------------------------------------
// Từng lệnh
// ---------------------------------------------------------------

function cmdIpconfig(patient: ClinicPatient, state: TerminalState): CommandResult {
  const seat = findDevice(patient.topology, patient.seatId)
  const pc = seat?.kind === 'pc' ? seat : null
  const ip = pc?.ipConfig?.ip ?? null
  const mask = pc?.ipConfig ? prefixToMask(pc.ipConfig.prefix) : null
  const gateway = pc?.gateway ?? null
  const dnsServer = patient.overlay.dns?.serverIp ?? null
  const lines = [
    `Ethernet adapter Ethernet0 (${pc?.hostname ?? patient.seatId}):`,
    '',
    `   IPv4 Address. . . . . . . . . . . : ${ip ?? '(none)'}`,
    `   Subnet Mask . . . . . . . . . . . : ${mask ?? '(none)'}`,
    `   Default Gateway . . . . . . . . . : ${gateway ?? ''}`,
    `   DNS Server  . . . . . . . . . . . : ${dnsServer ?? ''}`,
  ]
  return {
    outcome: { kind: 'ipconfig', hostname: pc?.hostname ?? patient.seatId, ip, mask, gateway, dnsServer },
    lines,
    state,
  }
}

/** Dòng kết quả cho một lượt ping — lặp 4 lần như đời thật. */
function pingBodyLines(kind: 'reply' | 'timeout' | 'unreachable-local' | 'unreachable-via', ctx: { ip: Ipv4; ttl?: number; via?: Ipv4 }): string[] {
  const one =
    kind === 'reply'
      ? `Reply from ${ctx.ip}: bytes=32 time<1ms TTL=${ctx.ttl ?? 128}`
      : kind === 'timeout'
        ? 'Request timed out.'
        : kind === 'unreachable-local'
          ? 'Destination host unreachable.'
          : `Reply from ${ctx.via}: Destination host unreachable.`
  return [one, one, one, one]
}

function pingStats(received: number): string[] {
  const lost = 4 - received
  return ['', `    Packets: Sent = 4, Received = ${received}, Lost = ${lost} (${lost * 25}% loss)`]
}

function cmdPing(patient: ClinicPatient, state: TerminalState, target: string): CommandResult {
  if (target === '') return { outcome: { kind: 'usage', command: 'ping' }, lines: ['Usage: ping <address | name>'], state }

  let ip: Ipv4
  let resolveFailure: ResolveFailure | null = null
  if (isValidIpv4(target)) {
    ip = target
  } else {
    const resolved = resolveName(patient, target)
    if ('failure' in resolved) {
      resolveFailure = resolved.failure
      return {
        outcome: {
          kind: 'ping', target, resolvedIp: null, resolveFailure,
          replied: false, failure: null, blockedBy: null, conflictOwners: [],
        },
        lines: [`Ping request could not find host ${target}. Please check the name and try again.`],
        state,
      }
    }
    ip = resolved.ip
  }

  const count = state.pingCounts[ip] ?? 0
  const nextState: TerminalState = {
    ...state,
    pingCounts: { ...state.pingCounts, [ip]: count + 1 },
  }

  // Luật chặn OUTBOUND trên chính máy đang ngồi (GPO/tường lửa chặn
  // nhầm): gói không rời nổi máy — General failure ngay tại chỗ, capture
  // trống. Mạng ngoài kia vẫn khỏe; đó chính là cái bẫy của ca này.
  const seatBlock = hostBlockOf(patient.overlay, patient.seatId)
  if (seatBlock !== null && seatBlock.direction === 'outbound') {
    return {
      outcome: { kind: 'ping', target, resolvedIp: ip, resolveFailure, replied: false, failure: null, blockedBy: seatBlock, conflictOwners: [] },
      lines: [`Pinging ${ip} with 32 bytes of data:`, 'PING: transmit failed. General failure.', ...pingStats(0)],
      state: { ...nextState, lastCapture: [] },
    }
  }

  // Tự ping mình: trả lời tại chỗ, không cần mô phỏng.
  if (ip === seatIp(patient)) {
    return {
      outcome: { kind: 'ping', target, resolvedIp: ip, resolveFailure: null, replied: true, failure: null, blockedBy: null, conflictOwners: ipOwners(patient.topology, ip).length > 1 ? ipOwners(patient.topology, ip) : [] },
      lines: [`Pinging ${ip} with 32 bytes of data:`, ...pingBodyLines('reply', { ip, ttl: 128 }), ...pingStats(4)],
      state: nextState,
    }
  }

  const sim = runSim(patient, nextState, ip, count)
  const header = `Pinging ${ip} with 32 bytes of data:`

  if (sim.result === null) {
    // Không thiết bị nào giữ IP này — với người học, hệt như máy tắt.
    return {
      outcome: { kind: 'ping', target, resolvedIp: ip, resolveFailure, replied: false, failure: 'no-such-host', blockedBy: null, conflictOwners: [] },
      lines: [header, ...pingBodyLines('timeout', { ip }), ...pingStats(0)],
      state: nextState,
    }
  }

  const stateAfter: TerminalState = { ...nextState, net: sim.net, lastCapture: sim.result.stages }
  const targetBlock = sim.result.replied ? hostBlockOf(patient.overlay, sim.targetDeviceId!) : null
  const blockedBy = targetBlock !== null && targetBlock.direction === 'inbound' ? targetBlock : null

  if (blockedBy !== null) {
    // Mạng thông nhưng máy đích nuốt gói: với người học là timeout câm —
    // capture cho thấy echo-request TỚI mà không có echo-reply.
    const stagesWithoutReply = sim.result.stages.filter((s) => s.phase !== 'echo-reply')
    return {
      outcome: { kind: 'ping', target, resolvedIp: ip, resolveFailure, replied: false, failure: null, blockedBy, conflictOwners: sim.conflictOwners },
      lines: [header, ...pingBodyLines('timeout', { ip }), ...pingStats(0)],
      state: { ...stateAfter, lastCapture: stagesWithoutReply },
    }
  }

  if (sim.result.replied) {
    const routers = routersOnPath(patient.topology, sim.result.stages)
    return {
      outcome: { kind: 'ping', target, resolvedIp: ip, resolveFailure, replied: true, failure: null, blockedBy: null, conflictOwners: sim.conflictOwners },
      lines: [header, ...pingBodyLines('reply', { ip, ttl: 128 - routers.length }), ...pingStats(4)],
      state: stateAfter,
    }
  }

  const failure = sim.result.failure
  const body =
    failure === 'src-no-ip' || failure === 'no-gateway' || failure === 'gateway-off-subnet'
      ? ['PING: transmit failed. General failure.']
      : failure === 'arp-unresolved'
        ? pingBodyLines('unreachable-local', { ip })
        : failure === 'no-route' && seatGateway(patient) !== null
          ? pingBodyLines('unreachable-via', { ip, via: seatGateway(patient)! })
          : pingBodyLines('timeout', { ip })
  return {
    outcome: { kind: 'ping', target, resolvedIp: ip, resolveFailure, replied: false, failure, blockedBy: null, conflictOwners: sim.conflictOwners },
    lines: [header, ...body, ...pingStats(0)],
    state: stateAfter,
  }
}

function cmdTracert(patient: ClinicPatient, state: TerminalState, target: string): CommandResult {
  if (target === '') return { outcome: { kind: 'usage', command: 'tracert' }, lines: ['Usage: tracert <address | name>'], state }

  let ip: Ipv4
  if (isValidIpv4(target)) {
    ip = target
  } else {
    const resolved = resolveName(patient, target)
    if ('failure' in resolved) {
      return {
        outcome: { kind: 'tracert', target, resolvedIp: null, resolveFailure: resolved.failure, routerIps: [], reachedDest: false },
        lines: [`Unable to resolve target system name ${target}.`],
        state,
      }
    }
    ip = resolved.ip
  }

  const count = state.pingCounts[ip] ?? 0
  const header = [`Tracing route to ${ip} over a maximum of 30 hops:`, '']

  const seatBlock = hostBlockOf(patient.overlay, patient.seatId)
  if (seatBlock !== null && seatBlock.direction === 'outbound') {
    return {
      outcome: { kind: 'tracert', target, resolvedIp: ip, resolveFailure: null, routerIps: [], reachedDest: false },
      lines: [...header, 'Unable to contact IP driver. General failure.'],
      state: { ...state, lastCapture: [] },
    }
  }

  const sim = runSim(patient, state, ip, count)

  if (sim.result === null) {
    return {
      outcome: { kind: 'tracert', target, resolvedIp: ip, resolveFailure: null, routerIps: [], reachedDest: false },
      lines: [...header, '  1     *        *        *     Request timed out.'],
      state,
    }
  }

  const stateAfter: TerminalState = { ...state, net: sim.net, lastCapture: sim.result.stages }
  const routers = routersOnPath(patient.topology, sim.result.stages)
  const rows = routers.map((r, i) => `  ${i + 1}    <1 ms    <1 ms    <1 ms  ${r.ip}`)
  const targetBlock = sim.result.replied ? hostBlockOf(patient.overlay, sim.targetDeviceId!) : null
  const blocked = targetBlock !== null && targetBlock.direction === 'inbound'

  if (sim.result.replied && !blocked) {
    rows.push(`  ${routers.length + 1}    <1 ms    <1 ms    <1 ms  ${ip}`)
    return {
      outcome: { kind: 'tracert', target, resolvedIp: ip, resolveFailure: null, routerIps: routers.map((r) => r.ip), reachedDest: true },
      lines: [...header, ...rows, '', 'Trace complete.'],
      state: stateAfter,
    }
  }

  rows.push(`  ${routers.length + 1}     *        *        *     Request timed out.`)
  return {
    outcome: { kind: 'tracert', target, resolvedIp: ip, resolveFailure: null, routerIps: routers.map((r) => r.ip), reachedDest: false },
    lines: [...header, ...rows],
    state: stateAfter,
  }
}

function cmdNslookup(patient: ClinicPatient, state: TerminalState, name: string): CommandResult {
  if (name === '') return { outcome: { kind: 'usage', command: 'nslookup' }, lines: ['Usage: nslookup <name>'], state }
  const resolved = resolveName(patient, name)
  if ('failure' in resolved) {
    const serverIp = resolved.serverIp
    const lines =
      resolved.failure === 'no-dns-configured'
        ? ['*** No DNS server configured on this host.']
        : resolved.failure === 'dns-timeout'
          ? [`Server:  ${serverIp}`, `Address:  ${serverIp}`, '', 'DNS request timed out.', `*** Request to ${serverIp} timed out.`]
          : [`Server:  ${serverIp}`, `Address:  ${serverIp}`, '', `*** ${serverIp} can't find ${name}: Non-existent domain`]
    return { outcome: { kind: 'nslookup', name, serverIp, answer: null, failure: resolved.failure }, lines, state }
  }
  return {
    outcome: { kind: 'nslookup', name, serverIp: resolved.serverIp, answer: resolved.ip, failure: null },
    lines: [`Server:  ${resolved.serverIp}`, `Address:  ${resolved.serverIp}`, '', `Name:    ${name}`, `Address:  ${resolved.ip}`],
    state,
  }
}

function cmdNetstat(patient: ClinicPatient, state: TerminalState): CommandResult {
  const rows = patient.overlay.connections?.[patient.seatId] ?? []
  const lines = ['Active Connections', '', '  Proto  Local Address          Foreign Address        State']
  for (const row of rows) {
    lines.push(`  ${row.proto.padEnd(6)} ${row.local.padEnd(22)} ${row.remote.padEnd(22)} ${row.state}`)
  }
  return { outcome: { kind: 'netstat', rows }, lines, state }
}

function cmdArp(patient: ClinicPatient, state: TerminalState): CommandResult {
  const entries = (state.net.arpCaches[patient.seatId] ?? []).map((e) => ({ ip: e.ip, mac: e.mac }))
  const lines =
    entries.length === 0
      ? ['No ARP Entries Found.']
      : [
          '  Internet Address      Physical Address      Type',
          ...entries.map((e) => `  ${e.ip.padEnd(21)} ${e.mac.padEnd(21)} dynamic`),
        ]
  return { outcome: { kind: 'arp', entries }, lines, state }
}

function cmdCapture(state: TerminalState): CommandResult {
  const stages = state.lastCapture
  if (stages === null || stages.length === 0) {
    return { outcome: { kind: 'capture', rows: [], empty: true }, lines: [], state }
  }
  const rows: CaptureRow[] = stages.map((stage, i) => {
    const first = stage.hops[0]!
    return {
      no: i + 1,
      phase: stage.phase,
      srcIp: first.srcIp,
      dstIp: first.dstIp,
      srcMac: first.srcMac,
      dstMac: first.dstMac,
      dropped: stage.arrivedAt === null,
    }
  })
  const info = (row: CaptureRow): string =>
    row.phase === 'arp-request'
      ? `Who has ${row.dstIp}? Tell ${row.srcIp}`
      : row.phase === 'arp-reply'
        ? `${row.srcIp} is at ${row.srcMac}`
        : row.phase === 'echo-request'
          ? 'Echo (ping) request'
          : 'Echo (ping) reply'
  const lines = [
    ' No.  Protocol  Source            Destination       Info',
    ...rows.map(
      (r) =>
        ` ${String(r.no).padEnd(4)} ${(r.phase.startsWith('arp') ? 'ARP' : 'ICMP').padEnd(9)} ${r.srcIp.padEnd(17)} ${r.dstIp.padEnd(17)} ${info(r)}${r.dropped ? '  [dropped]' : ''}`,
    ),
  ]
  return { outcome: { kind: 'capture', rows, empty: false }, lines, state }
}

function cmdGpresult(patient: ClinicPatient, state: TerminalState): CommandResult {
  const gpos = patient.overlay.gpos?.[patient.seatId]
  if (gpos === undefined) {
    return {
      outcome: { kind: 'gpresult', inDomain: false, gpos: [] },
      lines: ['The computer is not part of a domain.'],
      state,
    }
  }
  return {
    outcome: { kind: 'gpresult', inDomain: true, gpos },
    lines: ['Applied Group Policy Objects', '----------------------------', ...gpos.map((g) => `    ${g.name}`)],
    state,
  }
}

// ---------------------------------------------------------------
// Cửa vào duy nhất
// ---------------------------------------------------------------

/**
 * Chạy một dòng lệnh người học gõ. Nhân nhượng lối gõ đời thường:
 * hoa/thường tùy ý, `tracert`/`traceroute` như nhau, `arp -a` hay `arp`
 * như nhau, `gpresult /r` hay `gpresult` như nhau.
 */
export function runCommand(patient: ClinicPatient, state: TerminalState, input: string): CommandResult {
  const tokens = input.trim().split(/\s+/).filter((t) => t !== '')
  const command = (tokens[0] ?? '').toLowerCase()
  const arg = tokens[1] ?? ''

  switch (command) {
    case '':
      return { outcome: { kind: 'unknown', input: '' }, lines: [], state }
    case 'help':
    case '?':
      return { outcome: { kind: 'help' }, lines: [], state }
    case 'ipconfig':
      return cmdIpconfig(patient, state)
    case 'ping':
      return cmdPing(patient, state, arg)
    case 'tracert':
    case 'traceroute':
      return cmdTracert(patient, state, arg)
    case 'nslookup':
      return cmdNslookup(patient, state, arg)
    case 'netstat':
      return cmdNetstat(patient, state)
    case 'arp':
      return cmdArp(patient, state)
    case 'capture':
    case 'wireshark':
      return cmdCapture(state)
    case 'gpresult':
      return cmdGpresult(patient, state)
    default:
      return { outcome: { kind: 'unknown', input: command }, lines: [], state }
  }
}
