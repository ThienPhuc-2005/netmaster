// Bộ thông dịch CLI thiết bị (spec v2 mục 4.2 + 5.1).
//
// PHẠM VI ĐÓNG BĂNG: 24 lệnh khai ở spec mục 5.1, không hơn. Không
// tab-completion, không viết tắt kiểu `sh vl`, không alias, không
// scriptblock. Gõ ngoài danh sách → outcome rỗng để UI kể lời Việt
// (đúng nếp terminal Phòng khám và PowerShell đã dùng ba lần trước).
//
// KHỐI 13.1 làm phần XEM: 5 lệnh chế độ + 7 lệnh show.
// KHỐI 13.2 thêm phần CẤU HÌNH: 7 trong 9 lệnh của mục 5.1.
// KHỐI 16.1 mở tiếp `access-list`, `ip access-group` và `show access-lists`
// khi engine ACL đã có thật.
// KHỐI 16.2 khép danh sách: `router ospf <id>`, `network … area 0` và
// `show ip ospf neighbor`. ĐỦ CẢ 24 LỆNH của spec mục 5.1, không hơn.
//
// Lỗi CHẾ ĐỘ là bài học, không phải ma sát: gõ lệnh cấu hình khi đang ở
// chế độ xem thì máy từ chối bằng đúng câu tiếng Anh của thiết bị thật.
//
// HAI CHỖ CỐ Ý KHÁC IOS, khai ra để không ai "sửa" tới lui:
//   1. `vlan <n>` KHÔNG mở chế độ `(config-vlan)#`. Bộ chế độ đã đóng
//      băng ở bốn (spec mục 4.2), mà trong chế độ ấy phạm vi này chẳng
//      có lệnh nào để gõ — mở ra một dấu nhắc cụt là mời người học đi
//      vào ngõ cụt. Lệnh chạy xong vẫn đứng ở `(config)#`.
//   2. Khai `switchport trunk allowed/native` cho một cổng ĐANG LÀ ACCESS
//      bị TỪ CHỐI. IOS thật nhận rồi cất đó chờ ngày cổng thành trunk;
//      mô hình ở đây không có chỗ cất (cổng access mang trường của trunk
//      là dữ liệu tự mâu thuẫn — `validateTopology` bắt ngay), và về mặt
//      dạy học thì nói thẳng "đổi vai trước đã" tốt hơn là im lặng nhận
//      một lệnh không có tác dụng gì.

import { isValidIpv4, isValidVlan, findDevice, hasPort, portModeOf, type VlanId } from '../lab/topology'
import { maskToPrefix } from '../subnet/ipv4'
import { applyTopologyChange } from '../lab/session'
import { addAclRule, addOspfNetwork, applyAclToPort, declareVlan, setPortShutdown, startOspf } from './config'
import { ACL_ANY, type AclAddress, type AclRule } from '../lab/acl'
import { canShow, cliPrompt, type CliState } from './state'
import { ospfNeighborsOf } from '../lab/ospf'
import {
  showAccessLists,
  showIpOspfNeighbor,
  showIpInterfaceBrief,
  showIpRoute,
  showInterfacesTrunk,
  showMacTable,
  showRunningConfig,
  showSpanningTree,
  showVlanBrief,
} from './show'

/** Câu từ chối kinh điển của IOS khi gõ đúng lệnh nhưng sai chỗ. */
export const INVALID_INPUT = "% Invalid input detected at '^' marker."

export type CliOutcome =
  /** Lệnh chạy được (kể cả khi output rỗng). */
  | { kind: 'ok'; command: string }
  /** Lệnh có thật nhưng sai chế độ / sai loại thiết bị — máy in lỗi tiếng Anh. */
  | { kind: 'error'; command: string }
  /** Ngoài danh sách 24 lệnh: UI kể bằng tiếng Việt, engine không đoán bừa. */
  | { kind: 'unknown'; input: string }
  /** Người học gõ `?` — UI liệt kê đồ nghề bằng tiếng Việt. */
  | { kind: 'help' }

export interface CliResult {
  state: CliState
  /** Output máy, tiếng Anh, render nguyên văn trong <pre>. */
  lines: string[]
  outcome: CliOutcome
}

/** Danh sách lệnh cho UI dựng bảng trợ giúp tiếng Việt (khối 13.1 + 13.2). */
export const CLI_COMMANDS = [
  'enable',
  'configure terminal',
  'interface',
  'exit',
  'end',
  'show vlan brief',
  'show mac address-table',
  'show interfaces trunk',
  'show ip interface brief',
  'show ip route',
  'show spanning-tree',
  'show access-lists',
  'show ip ospf neighbor',
  'show running-config',
  'vlan',
  'switchport mode',
  'switchport access vlan',
  'switchport trunk allowed vlan',
  'switchport trunk native vlan',
  'ip address',
  'ip route',
  'router ospf',
  'network',
  'access-list',
  'ip access-group',
  'shutdown',
  'no shutdown',
] as const

/** Câu từ chối khi lệnh đúng nhưng cổng đang sai vai (xem chú thích số 2 đầu file). */
export const ACCESS_MODE_REJECT = '% Command rejected: the interface is in access mode.'

function tokens(input: string): string[] {
  return input.trim().split(/\s+/).filter((t) => t !== '')
}

/** Khớp một câu lệnh nhiều từ; so KHÔNG phân biệt hoa thường như IOS. */
function matches(words: string[], phrase: string): boolean {
  const target = phrase.split(' ')
  if (words.length !== target.length) return false
  return words.every((w, i) => w.toLowerCase() === target[i])
}

function startsWith(words: string[], phrase: string): boolean {
  const target = phrase.split(' ')
  if (words.length < target.length) return false
  return target.every((t, i) => words[i]?.toLowerCase() === t)
}

/** Số VLAN từ một từ trên dòng lệnh; null khi không phải số hợp lệ 1..4094. */
function vlanArg(word: string | undefined): VlanId | null {
  if (word === undefined || !/^\d+$/.test(word)) return null
  const vlan = Number(word)
  return isValidVlan(vlan) ? vlan : null
}

/**
 * Danh sách VLAN của allowed list: `10,20`, `10-12,30`, hoặc `all`.
 * `vlans: null` nghĩa là cho MỌI VLAN qua (đúng quy ước của LabAction).
 */
function vlanListArg(word: string | undefined): { vlans: VlanId[] | null } | null {
  if (word === undefined) return null
  if (word.toLowerCase() === 'all') return { vlans: null }
  const vlans: VlanId[] = []
  for (const part of word.split(',')) {
    const range = /^(\d+)-(\d+)$/.exec(part)
    if (range !== null) {
      const from = vlanArg(range[1])
      const to = vlanArg(range[2])
      if (from === null || to === null || from > to) return null
      for (let v = from; v <= to; v++) vlans.push(v)
      continue
    }
    const single = vlanArg(part)
    if (single === null) return null
    vlans.push(single)
  }
  return vlans.length === 0 ? null : { vlans: [...new Set(vlans)].sort((a, b) => a - b) }
}

/** Subnet mask dạng x.x.x.x → prefix; null khi mask không hợp lệ (bit không liền). */
function maskArg(word: string | undefined): number | null {
  if (word === undefined || !isValidIpv4(word)) return null
  try {
    return maskToPrefix(word)
  } catch {
    return null
  }
}

/**
 * Đọc một vế địa chỉ của luật ACL từ dòng lệnh, trả về cả số từ đã ăn.
 * Ba dạng đúng giọng IOS: `any`, `host <ip>`, `<ip> <wildcard>`.
 */
function parseAclAddress(words: string[], at: number): { address: AclAddress; next: number } | null {
  const head = words[at]?.toLowerCase()
  if (head === undefined) return null
  if (head === 'any') return { address: ACL_ANY, next: at + 1 }
  if (head === 'host') {
    const ip = words[at + 1]
    if (ip === undefined || !isValidIpv4(ip)) return null
    return { address: { ip, wildcard: '0.0.0.0' }, next: at + 2 }
  }
  const ip = words[at]
  const wildcard = words[at + 1]
  if (ip === undefined || wildcard === undefined || !isValidIpv4(ip) || !isValidIpv4(wildcard)) return null
  return { address: { ip, wildcard }, next: at + 2 }
}

/**
 * Đọc trọn một dòng `access-list <n> permit|deny <proto> <src> <dst> [eq <port>]`.
 * Trả null khi cú pháp sai — máy từ chối y như thiết bị thật.
 */
function parseAclRule(words: string[]): { number: number; rule: Omit<AclRule, 'seq'> } | null {
  const number = Number(words[1])
  // CHỈ dải extended 100-199: mô hình này chỉ có MỘT cú pháp (protocol +
  // nguồn + đích). ACL chuẩn 1-99 trên IOS thật mang cú pháp khác hẳn
  // (chỉ nguồn) — nhận số 1-99 với cú pháp extended là dạy một cấu hình
  // không tồn tại trên thiết bị thật, và show sẽ in một khuôn "Standard"
  // kèm luật extended không máy nào in (biên bản hội đồng trung cấp).
  if (!Number.isInteger(number) || number < 100 || number > 199) return null

  const action = words[2]?.toLowerCase()
  if (action !== 'permit' && action !== 'deny') return null

  const protocol = words[3]?.toLowerCase()
  if (protocol !== 'ip' && protocol !== 'icmp' && protocol !== 'tcp' && protocol !== 'udp') return null

  const src = parseAclAddress(words, 4)
  if (src === null) return null
  const dst = parseAclAddress(words, src.next)
  if (dst === null) return null

  let dstPort: number | undefined
  let at = dst.next
  if (words[at]?.toLowerCase() === 'eq') {
    const port = Number(words[at + 1])
    if (protocol !== 'tcp' && protocol !== 'udp') return null
    if (!Number.isInteger(port) || port < 1 || port > 65535) return null
    dstPort = port
    at += 2
  }
  if (at !== words.length) return null

  return {
    number,
    rule: dstPort === undefined
      ? { action, protocol, src: src.address, dst: dst.address }
      : { action, protocol, src: src.address, dst: dst.address, dstPort },
  }
}

const ok = (state: CliState, command: string, lines: string[] = []): CliResult => ({
  state,
  lines,
  outcome: { kind: 'ok', command },
})

const failed = (state: CliState, command: string, lines: string[] = [INVALID_INPUT]): CliResult => ({
  state,
  lines,
  outcome: { kind: 'error', command },
})

/**
 * Chạy nhiều dòng lệnh liên tiếp trên cùng một phiên.
 *
 * Trả về CẢ chuỗi kết quả chứ không chỉ state cuối: chốt chặn nội dung
 * cần biết có dòng nào bị máy từ chối không — lời giải mẫu mà gõ trượt
 * một lệnh thì đề bài đó hỏng, dù kết quả cuối tình cờ vẫn đạt.
 */
export function runCliScript(state: CliState, lines: readonly string[]): { state: CliState; results: CliResult[] } {
  let current = state
  const results: CliResult[] = []
  for (const line of lines) {
    const result = runCliLine(current, line)
    results.push(result)
    current = result.state
  }
  return { state: current, results }
}

/**
 * Chạy MỘT dòng lệnh. Thuần: trả state mới, không sửa state cũ.
 */
export function runCliLine(state: CliState, input: string): CliResult {
  const words = tokens(input)
  if (words.length === 0) return ok(state, '')
  if (words.length === 1 && words[0] === '?') return { state, lines: [], outcome: { kind: 'help' } }

  const device = findDevice(state.topology, state.deviceId)
  if (device === null) return failed(state, 'device', ['% Device not found.'])

  /**
   * Từ chối bằng câu Invalid input kèm DÒNG DẤU ^ căn đúng cột dưới token
   * hỏng. Transcript in "<dấu nhắc> <lệnh>" trên một dòng nên cột của ^
   * phải cộng cả dấu nhắc. IOS thật in đúng khuôn hai dòng này — trích
   * "at '^' marker" mà không có dấu ^ nào là câu đố chứ không phải
   * fidelity (biên bản trung cấp). Nhánh không rõ token nào hỏng thì đặt
   * ^ ở token đầu, như IOS vẫn làm khi mù mờ.
   */
  const invalid = (command: string, tokenIndex = 0): CliResult => {
    const trimmed = input.trim()
    const starts: number[] = []
    const re = /\S+/g
    for (let m = re.exec(trimmed); m !== null; m = re.exec(trimmed)) starts.push(m.index)
    const at = starts[Math.min(tokenIndex, starts.length - 1)] ?? 0
    return failed(state, command, [`${' '.repeat(cliPrompt(state).length + 1 + at)}^`, INVALID_INPUT])
  }

  /** Thiếu từ là Incomplete, THỪA từ là Invalid — IOS phân biệt hai loại. */
  const incomplete = (command: string): CliResult => failed(state, command, ['% Incomplete command.'])

  // --- Chế độ: đi vào, đi ra ---

  if (matches(words, 'enable')) {
    if (state.mode === 'user') return ok({ ...state, mode: 'privileged' }, 'enable')
    // Đang privileged mà gõ thừa `enable`: IOS nhận IM LẶNG (no-op) —
    // người mới gõ thừa suốt, mắng oan là dạy sai phản xạ đọc lỗi.
    if (state.mode === 'privileged') return ok(state, 'enable')
    return invalid('enable')
  }

  if (matches(words, 'configure terminal')) {
    if (state.mode !== 'privileged') return invalid('configure terminal')
    return ok({ ...state, mode: 'config' }, 'configure terminal', ['Enter configuration commands, one per line.  End with CNTL/Z.'])
  }

  if (startsWith(words, 'interface')) {
    if (state.mode !== 'config') return invalid('interface')
    const portId = words[1]
    if (portId === undefined) return incomplete('interface')
    if (words.length > 2) return invalid('interface', 2)
    // Cổng ma: nói thẳng bằng giọng máy, không im lặng cho qua rồi để
    // người học cấu hình vào hư không.
    if (!hasPort(device, portId)) return failed(state, 'interface', ['% Invalid interface.'])
    return ok({ ...state, mode: 'config-if', portId }, 'interface')
  }

  if (matches(words, 'exit')) {
    // exit lùi ĐÚNG MỘT bậc — khác `end` nhảy thẳng về privileged.
    if (state.mode === 'config-if') return ok({ ...state, mode: 'config', portId: null }, 'exit')
    if (state.mode === 'config-router') return ok({ ...state, mode: 'config', ospfProcessId: null }, 'exit')
    if (state.mode === 'config') return ok({ ...state, mode: 'privileged' }, 'exit')
    if (state.mode === 'privileged') return ok({ ...state, mode: 'user' }, 'exit')
    return ok(state, 'exit')
  }

  if (matches(words, 'end')) {
    if (state.mode === 'config' || state.mode === 'config-if' || state.mode === 'config-router') {
      return ok({ ...state, mode: 'privileged', portId: null, ospfProcessId: null }, 'end')
    }
    return invalid('end')
  }

  // --- Xem ---

  if (startsWith(words, 'show')) {
    if (!canShow(state.mode)) {
      // Trong config mode, IOS thật đòi `do show ...`. Phạm vi đóng băng
      // không có `do`, nên máy từ chối và người học học được luật chế độ.
      return invalid('show')
    }
    /** Tra bảng xong thì GHI DẤU: đó là nguyên liệu chấm của đề "chẩn đoán". */
    const seen = (command: string, lines: string[], extra?: { ospfFull: boolean }) =>
      ok(
        {
          ...state,
          flags: { ...state.flags, viewed: [...state.flags.viewed, { command, deviceId: device.id, ...extra }] },
        },
        command,
        lines,
      )
    /**
     * `show` sai LOẠI thiết bị phải đi đường lỗi như mọi lỗi khác — outcome
     * 'ok' + ghi dấu `viewed` cho một lệnh máy vừa từ chối là nhiễm cờ chấm
     * và tô sai màu (biên bản trung cấp). Caret chỉ vào từ sau `show`.
     */
    const showOn = (kinds: readonly string[], command: string, lines: () => string[]) =>
      kinds.includes(device.kind) ? seen(command, lines()) : invalid(command, 1)

    if (matches(words, 'show vlan brief')) return showOn(['switch'], 'show vlan brief', () => showVlanBrief(state.topology, device))
    if (matches(words, 'show mac address-table')) {
      return showOn(['switch'], 'show mac address-table', () => showMacTable(state.net, device))
    }
    if (matches(words, 'show interfaces trunk')) {
      return showOn(['switch'], 'show interfaces trunk', () => showInterfacesTrunk(state.topology, device))
    }
    if (matches(words, 'show ip interface brief')) {
      return showOn(['switch', 'router'], 'show ip interface brief', () => showIpInterfaceBrief(state.topology, device))
    }
    if (matches(words, 'show ip ospf neighbor')) {
      if (device.kind !== 'router') return invalid('show ip ospf neighbor', 1)
      // Dấu vết ghi kèm chuyện bảng CÓ láng giềng Full hay chưa: đề "kiểm
      // chứng ra Full trước khi nộp" chấm bằng goal viewed có điều kiện —
      // chạy lệnh lúc bảng còn rỗng thì bằng chứng rỗng, không được tính
      // (biên bản trung cấp, ghế Capstone).
      const ospfFull = ospfNeighborsOf(state.topology, device.id).some((n) => n.state === 'full')
      return seen('show ip ospf neighbor', showIpOspfNeighbor(state.topology, device), { ospfFull })
    }
    if (matches(words, 'show ip route')) return showOn(['router'], 'show ip route', () => showIpRoute(state.topology, device))
    if (matches(words, 'show spanning-tree')) {
      return showOn(['switch'], 'show spanning-tree', () => showSpanningTree(state.topology, device))
    }
    if (matches(words, 'show access-lists')) {
      return showOn(['router'], 'show access-lists', () => showAccessLists(state.net, device))
    }
    if (matches(words, 'show running-config')) {
      // Xem cấu hình đang chạy cần quyền — đúng như thiết bị thật.
      if (state.mode !== 'privileged') return invalid('show running-config', 1)
      return seen('show running-config', showRunningConfig(state.topology, device))
    }
    return invalid('show', 1)
  }

  // --- Cấu hình: chế độ (config) và chế độ (config-if) ---

  /** Cổng đang chọn; chỉ có ở chế độ config-if. */
  const portId = state.mode === 'config-if' ? state.portId : null


  if (startsWith(words, 'router ospf')) {
    if (state.mode !== 'config' || device.kind !== 'router') return invalid('router ospf')
    if (words.length < 3) return incomplete('router ospf')
    if (words.length > 3) return invalid('router ospf', 3)
    const processId = Number(words[2])
    if (!Number.isInteger(processId) || processId < 1 || processId > 65535) {
      return invalid('router ospf', 2)
    }
    return ok(
      {
        ...state,
        mode: 'config-router',
        ospfProcessId: processId,
        topology: startOspf(state.topology, device.id, processId),
      },
      'router ospf',
    )
  }

  if (startsWith(words, 'network')) {
    // Câu `network` chỉ có nghĩa BÊN TRONG một tiến trình định tuyến —
    // gõ nó ở (config)# là máy từ chối, đúng luật chế độ.
    if (state.mode !== 'config-router' || device.kind !== 'router') return invalid('network')
    if (words.length < 5) return incomplete('network')
    if (words.length > 5) return invalid('network', 5)
    const ip = words[1]
    const wildcard = words[2]
    const area = Number(words[4])
    if (words[3]?.toLowerCase() !== 'area') return invalid('network', 3)
    if (ip === undefined || !isValidIpv4(ip)) return invalid('network', 1)
    if (wildcard === undefined || !isValidIpv4(wildcard)) return invalid('network', 2)
    // Phạm vi đóng băng: chỉ area 0 (spec v2 mục 5.1).
    if (area !== 0) return invalid('network', 4)
    return ok({ ...state, topology: addOspfNetwork(state.topology, device.id, { ip, wildcard, area }) }, 'network')
  }

  if (startsWith(words, 'vlan')) {
    if (state.mode !== 'config' || device.kind !== 'switch') return invalid('vlan')
    if (words.length < 2) return incomplete('vlan')
    if (words.length > 2) return invalid('vlan', 2)
    const vlan = vlanArg(words[1])
    if (vlan === null) return invalid('vlan', 1)
    return ok({ ...state, topology: declareVlan(state.topology, device.id, vlan) }, 'vlan')
  }

  if (startsWith(words, 'access-list')) {
    if (state.mode !== 'config' || device.kind !== 'router') return invalid('access-list')
    if (words.length < 5) return incomplete('access-list')
    const rule = parseAclRule(words)
    if (rule === null) return invalid('access-list', 1)
    return ok({ ...state, topology: addAclRule(state.topology, device.id, rule.number, rule.rule) }, 'access-list')
  }

  if (startsWith(words, 'ip access-group')) {
    if (portId === null || device.kind !== 'router') return invalid('ip access-group')
    if (words.length < 4) return incomplete('ip access-group')
    if (words.length > 4) return invalid('ip access-group', 4)
    const number = Number(words[2])
    const direction = words[3]?.toLowerCase()
    if (!Number.isInteger(number) || number < 1 || number > 199) return invalid('ip access-group', 2)
    if (direction !== 'in' && direction !== 'out') return invalid('ip access-group', 3)
    return ok(
      { ...state, topology: applyAclToPort(state.topology, device.id, portId, direction, number) },
      'ip access-group',
    )
  }

  if (startsWith(words, 'ip route')) {
    if (state.mode !== 'config' || device.kind !== 'router') return invalid('ip route')
    if (words.length < 5) return incomplete('ip route')
    if (words.length > 5) return invalid('ip route', 5)
    const destination = words[2]
    const prefix = maskArg(words[3])
    const nextHop = words[4]
    if (destination === undefined || !isValidIpv4(destination)) return invalid('ip route', 2)
    if (prefix === null) return invalid('ip route', 3)
    if (nextHop === undefined || !isValidIpv4(nextHop)) return invalid('ip route', 4)
    // Cùng một đích thì lệnh sau ĐÈ lệnh trước, đúng như thiết bị thật —
    // không đẻ ra hai dòng tuyến cãi nhau trong cùng một bảng.
    const routes = [
      ...device.staticRoutes.filter((r) => !(r.destination === destination && r.prefix === prefix)),
      { destination, prefix, nextHop },
    ]
    return ok(
      {
        ...state,
        topology: applyTopologyChange(state.topology, { kind: 'set-static-routes', deviceId: device.id, routes }),
      },
      'ip route',
    )
  }

  if (startsWith(words, 'switchport')) {
    if (portId === null || device.kind !== 'switch') return invalid('switchport')
    const port = device.ports.find((p) => p.id === portId)
    if (port === undefined) return invalid('switchport')
    const change = (action: Parameters<typeof applyTopologyChange>[1], command: string) =>
      ok({ ...state, topology: applyTopologyChange(state.topology, action) }, command)

    if (matches(words, 'switchport mode access') || matches(words, 'switchport mode trunk')) {
      const mode = words[2]?.toLowerCase() === 'trunk' ? 'trunk' : 'access'
      return change({ kind: 'set-switch-port-mode', deviceId: device.id, portId, mode }, 'switchport mode')
    }

    if (startsWith(words, 'switchport access vlan')) {
      if (words.length < 4) return incomplete('switchport access vlan')
      if (words.length > 4) return invalid('switchport access vlan', 4)
      const vlan = vlanArg(words[3])
      if (vlan === null) return invalid('switchport access vlan', 3)
      return change({ kind: 'set-switch-port-vlan', deviceId: device.id, portId, vlan }, 'switchport access vlan')
    }

    if (startsWith(words, 'switchport trunk allowed vlan')) {
      if (words.length < 5) return incomplete('switchport trunk allowed vlan')
      if (words.length > 5) return invalid('switchport trunk allowed vlan', 5)
      const list = vlanListArg(words[4])
      if (list === null) return invalid('switchport trunk allowed vlan', 4)
      if (portModeOf(port) !== 'trunk') return failed(state, 'switchport trunk allowed vlan', [ACCESS_MODE_REJECT])
      return change(
        { kind: 'set-trunk-allowed', deviceId: device.id, portId, vlans: list.vlans },
        'switchport trunk allowed vlan',
      )
    }

    if (startsWith(words, 'switchport trunk native vlan')) {
      if (words.length < 5) return incomplete('switchport trunk native vlan')
      if (words.length > 5) return invalid('switchport trunk native vlan', 5)
      const vlan = vlanArg(words[4])
      if (vlan === null) return invalid('switchport trunk native vlan', 4)
      if (portModeOf(port) !== 'trunk') return failed(state, 'switchport trunk native vlan', [ACCESS_MODE_REJECT])
      return change({ kind: 'set-trunk-native', deviceId: device.id, portId, vlan }, 'switchport trunk native vlan')
    }

    return invalid('switchport', 1)
  }

  if (startsWith(words, 'ip address')) {
    if (portId === null || device.kind !== 'router') return invalid('ip address')
    if (words.length < 4) return incomplete('ip address')
    if (words.length > 4) return invalid('ip address', 4)
    const ip = words[2]
    const prefix = maskArg(words[3])
    if (ip === undefined || !isValidIpv4(ip)) return invalid('ip address', 2)
    if (prefix === null) return invalid('ip address', 3)
    return ok(
      {
        ...state,
        topology: applyTopologyChange(state.topology, {
          kind: 'set-router-port-ip',
          deviceId: device.id,
          portId,
          ipConfig: { ip, prefix },
        }),
      },
      'ip address',
    )
  }

  if (matches(words, 'shutdown') || matches(words, 'no shutdown')) {
    if (portId === null || device.kind === 'pc') return invalid('shutdown')
    const down = words.length === 1
    return ok(
      { ...state, topology: setPortShutdown(state.topology, device.id, portId, down) },
      down ? 'shutdown' : 'no shutdown',
    )
  }

  return { state, lines: [], outcome: { kind: 'unknown', input: input.trim() } }
}
