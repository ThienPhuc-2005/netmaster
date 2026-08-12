// Bộ thông dịch dòng lệnh PowerShell tối giản (spec Module 12).
//
// Người học gõ LỆNH THẬT; output SUY TỪ MÔI TRƯỜNG GIẢ, tiếng Anh nghề
// tất định — cùng ranh giới chuỗi với terminal Phòng khám: `lines` là
// output thiết bị render nguyên văn, microcopy tiếng Việt (help tổng,
// lệnh lạ) thuộc tầng UI/i18n, KHÔNG ở đây. Riêng `Get-Help <cmdlet>`
// trả cú pháp tiếng Anh như PowerShell thật.
//
// Ngữ pháp được đóng băng cùng phạm vi (xem đầu world.ts):
//   dòng  := stage ('|' stage)?          — tối đa MỘT dấu ống
//   stage := cmdlet (arg | -Tham số giá_trị)*
//   giá trị có khoảng trắng bọc trong nháy kép hoặc nháy đơn
//
// Technical contract: thuần và tất định — không đồng hồ, không random.

import {
  adGroups,
  findAdGroup,
  findAdUser,
  findTarget,
  initialPsState,
  isIpv4,
  isMemberOfGroup,
  type AdGroup,
  type AdUser,
  type PsRunState,
  type PsWorld,
} from './world'

// ---------------------------------------------------------------
// Kết quả một dòng lệnh
// ---------------------------------------------------------------

export type PsOutcome =
  | { kind: 'help' }
  | { kind: 'unknown'; input: string }
  | { kind: 'error'; message: string }
  | { kind: 'ok'; command: string; createdUsers?: number; matches?: number; addedMembers?: number }

export interface PsResult {
  outcome: PsOutcome
  /** Output "của máy" — rỗng với help tổng/lệnh lạ (UI tự lo lời). */
  lines: string[]
  state: PsRunState
}

/** 11 cmdlet của phạm vi đóng băng (mốc 2) — UI dùng cho help và gợi ý gõ. */
export const PS_COMMANDS = [
  'Get-Help',
  'Get-NetIPAddress',
  'Test-NetConnection',
  'Get-ADUser',
  'New-ADUser',
  'Get-ADGroup',
  'Get-ADGroupMember',
  'Add-ADGroupMember',
  'Import-Csv',
  'Get-Content',
  'Select-String',
] as const

/** Cú pháp tóm tắt cho Get-Help <cmdlet> — tiếng Anh nghề như thật. */
const SYNTAX: Record<string, string[]> = {
  'get-netipaddress': ['Get-NetIPAddress'],
  'test-netconnection': ['Test-NetConnection [-ComputerName] <String> [-Port <Int32>]'],
  'get-aduser': [
    'Get-ADUser [-Identity] <String> [-Properties MemberOf]',
    'Get-ADUser -Filter * [-SearchBase <String>] [-Properties MemberOf]',
  ],
  'new-aduser': [
    'New-ADUser [-Name] <String> -SamAccountName <String> [-Path <String>] [-Enabled <Boolean>]',
    '<rows> | New-ADUser        (columns: Name, SamAccountName, Path)',
  ],
  'get-adgroup': ['Get-ADGroup [-Identity] <String>', 'Get-ADGroup -Filter *'],
  'get-adgroupmember': ['Get-ADGroupMember [-Identity] <String>'],
  'add-adgroupmember': ['Add-ADGroupMember [-Identity] <String> -Members <String[]>'],
  'import-csv': ['Import-Csv [-Path] <String>'],
  'get-content': ['Get-Content [-Path] <String>'],
  'select-string': ['Select-String [-Pattern] <String> [-Path <String>]'],
  'get-help': ['Get-Help [[-Name] <String>]'],
}

// ---------------------------------------------------------------
// Tách chữ (tokenizer) — nháy kép/nháy đơn giữ nguyên khoảng trắng
// ---------------------------------------------------------------

interface ParsedStage {
  cmdlet: string
  /** Đối số trần theo thứ tự (positional). */
  positional: string[]
  /** -ThamSo giá_trị (switch không giá trị nhận ''). */
  named: Record<string, string>
}

function tokenize(text: string): string[] | null {
  const tokens: string[] = []
  let current = ''
  let quote: '"' | "'" | null = null
  for (const ch of text) {
    if (quote !== null) {
      if (ch === quote) quote = null
      else current += ch
      continue
    }
    if (ch === '"' || ch === "'") {
      quote = ch
      continue
    }
    if (/\s/.test(ch)) {
      if (current !== '') tokens.push(current)
      current = ''
      continue
    }
    current += ch
  }
  if (quote !== null) return null // nháy chưa đóng
  if (current !== '') tokens.push(current)
  return tokens
}

function parseStage(tokens: string[]): ParsedStage {
  const [cmdlet = '', ...rest] = tokens
  const positional: string[] = []
  const named: Record<string, string> = {}
  for (let i = 0; i < rest.length; i++) {
    const token = rest[i]!
    if (token.startsWith('-') && token.length > 1 && !/^-\d/.test(token)) {
      const key = token.slice(1).toLowerCase()
      const next = rest[i + 1]
      // Giá trị là token kế tiếp trừ khi nó lại là một -ThamSo khác.
      if (next !== undefined && !(next.startsWith('-') && !/^-\d/.test(next))) {
        let value = next
        i++
        // PowerShell thật parse "-Members a, b" thành MỘT danh sách đủ hai
        // phần tử — khoảng trắng quanh dấu phẩy không cắt mảng. Nuốt tiếp
        // token khi danh sách còn dở (giá trị đang kết thúc bằng "," hoặc
        // token kế mở đầu bằng ","): lặng lẽ bỏ rơi "b" rồi để người học
        // ngồi nhìn goal đỏ không hiểu vì sao là bẫy không lời (biên bản
        // hội đồng trung cấp, ghế Hệ thống).
        for (;;) {
          const peek = rest[i + 1]
          if (peek === undefined) break
          if (peek.startsWith('-') && !/^-\d/.test(peek)) break
          if (!value.endsWith(',') && !peek.startsWith(',')) break
          value += peek
          i++
        }
        named[key] = value
      } else {
        named[key] = ''
      }
    } else {
      positional.push(token)
    }
  }
  return { cmdlet, positional, named }
}

// ---------------------------------------------------------------
// Giá trị chảy trong ống: dòng chữ (log) hoặc bản ghi (CSV row)
// ---------------------------------------------------------------

type PsValue = string | Record<string, string>

interface StageOutput {
  values: PsValue[]
  lines: string[]
  outcome: PsOutcome
  world: PsWorld
  flags: PsRunState['flags']
}

class StageError extends Error {}

const err = (message: string): never => {
  throw new StageError(message)
}

// ---------------------------------------------------------------
// Từng cmdlet
// ---------------------------------------------------------------

function runGetNetIpAddress(state: PsRunState): StageOutput {
  const lines: string[] = []
  for (const itf of state.world.interfaces) {
    lines.push(
      `IPAddress         : ${itf.ip}`,
      `InterfaceAlias    : ${itf.alias}`,
      `PrefixLength      : ${itf.prefix}`,
      '',
    )
  }
  if (lines.at(-1) === '') lines.pop()
  return { values: [], lines, outcome: { kind: 'ok', command: 'Get-NetIPAddress' }, world: state.world, flags: state.flags }
}

function runTestNetConnection(state: PsRunState, stage: ParsedStage): StageOutput {
  const targetText = stage.named['computername'] ?? stage.positional[0]
  if (targetText === undefined || targetText === '') {
    err('Test-NetConnection : Missing an argument for parameter -ComputerName.')
  }
  const portText = stage.named['port']
  const port = portText === undefined ? null : Number(portText)
  if (port !== null && (!Number.isInteger(port) || port < 1 || port > 65535)) {
    err(`Test-NetConnection : Cannot validate argument on parameter 'Port'.`)
  }

  const target = findTarget(state.world, targetText!)
  if (target === null && !isIpv4(targetText!)) {
    // Tên không phân giải được — như DNS ngoài đời nói KHÔNG.
    err(`Test-NetConnection : Name resolution of '${targetText}' failed.`)
  }
  const ip = target?.ip ?? targetText!
  const pingOk = target?.pingable ?? false
  const tcpOk = port !== null && (target?.openPorts.includes(port) ?? false)
  const succeeded = port === null ? pingOk : tcpOk

  const lines =
    port === null
      ? [
          `ComputerName           : ${targetText}`,
          `RemoteAddress          : ${ip}`,
          `PingSucceeded          : ${pingOk ? 'True' : 'False'}`,
        ]
      : [
          `ComputerName     : ${targetText}`,
          `RemoteAddress    : ${ip}`,
          `RemotePort       : ${port}`,
          `TcpTestSucceeded : ${tcpOk ? 'True' : 'False'}`,
        ]

  const flags: PsRunState['flags'] = {
    ...state.flags,
    testedConnections: [...state.flags.testedConnections, { ip, port, succeeded }],
  }
  return { values: [], lines, outcome: { kind: 'ok', command: 'Test-NetConnection' }, world: state.world, flags }
}

/**
 * In hồ sơ một user. `memberOf` bật thì thêm đúng MỘT dòng nữa — xem
 * `runGetAdUser` để biết vì sao dòng đó chỉ kể nhóm TRỰC TIẾP.
 */
function formatAdUser(world: PsWorld, user: AdUser, memberOf = false): string[] {
  const dn = domainDn(world)
  const lines = [
    `Name              : ${user.name}`,
    `SamAccountName    : ${user.sam}`,
    `DistinguishedName : CN=${user.name},OU=${user.ou},${dn}`,
    `Enabled           : ${user.enabled ? 'True' : 'False'}`,
  ]
  if (memberOf) {
    const groups = adGroups(world).filter((g) =>
      g.members.some((m) => m.toLowerCase() === user.sam.toLowerCase()),
    )
    // Định dạng {a, b} của PowerShell thật; rỗng thì in {} chứ không giấu
    // dòng — "không thuộc nhóm nào" cũng là một câu trả lời.
    lines.push(`MemberOf          : {${groups.map((g) => `CN=${g.name},CN=Users,${dn}`).join(', ')}}`)
  }
  return lines
}

/** Rút tên OU từ chuỗi DN kiểu "OU=KeToan,DC=noibo,DC=vn". */
function ouFromDn(dn: string): string | null {
  const part = dn.split(',').map((p) => p.trim()).find((p) => p.toLowerCase().startsWith('ou='))
  return part === undefined ? null : part.slice(3)
}

/**
 * `-Properties MemberOf` (kho ý tưởng H8) — chiều TRA NGƯỢC: đứng ở phía
 * NGƯỜI hỏi "anh này đang thuộc nhóm nào", thay vì đứng ở phía nhóm hỏi
 * "nhóm này có ai" (`Get-ADGroupMember`). Ngoài đời người trực dùng cả
 * hai chiều, và chiều tra ngược mới là chiều dùng khi cầm trong tay một
 * lời than của MỘT người cụ thể.
 *
 * Mốc 11 cmdlet KHÔNG bị phá: đây là một THAM SỐ của cmdlet đã có, không
 * phải cmdlet thứ 12 (chủ dự án duyệt 08-12).
 *
 * CHỈ kể nhóm TRỰC TIẾP, cố ý — `memberOf` của AD thật cũng vậy. Đây là
 * bài học chứ không phải thiếu sót: chị Lan nằm trong NhanSu-GG, mà
 * NhanSu-GG nằm trong QuyenSuaHoSo-DL, thì dòng này chỉ hiện NhanSu-GG.
 * Muốn thấy trọn đường ống quyền thì phải đi tiếp một nhịp nữa — đúng
 * cái nhịp mà nếp AGDLP dạy. In hộ cả chuỗi lồng nhau là làm hộ bài.
 */
function memberOfWanted(stage: ParsedStage): boolean {
  const properties = stage.named['properties']
  if (properties === undefined) return false
  if (properties.trim().toLowerCase() !== 'memberof') {
    err(`Get-ADUser : Only '-Properties MemberOf' is supported on this machine.`)
  }
  return true
}

function runGetAdUser(state: PsRunState, stage: ParsedStage): StageOutput {
  const world = state.world
  if (world.ad === null) err('Get-ADUser : Unable to contact the server. This computer is not joined to a domain.')

  const identity = stage.named['identity'] ?? stage.positional[0]
  const filter = stage.named['filter']
  const memberOf = memberOfWanted(stage)

  if (identity !== undefined && identity !== '') {
    const user = findAdUser(world, identity)
    if (user === null) err(`Get-ADUser : Cannot find an object with identity: '${identity}'.`)
    return {
      values: [],
      lines: formatAdUser(world, user!, memberOf),
      outcome: { kind: 'ok', command: 'Get-ADUser' },
      world,
      flags: state.flags,
    }
  }

  if (filter === undefined) {
    err(`Get-ADUser : Parameter set cannot be resolved. Use -Identity <sam> or -Filter *.`)
  }
  if (filter !== '*') {
    // Scriptblock filter nằm NGOÀI phạm vi đóng băng — nói thẳng.
    err(`Get-ADUser : Only '-Filter *' is supported on this machine.`)
  }
  let users = world.ad!.users
  const searchBase = stage.named['searchbase']
  if (searchBase !== undefined) {
    const ou = ouFromDn(searchBase)
    if (ou === null) err(`Get-ADUser : Directory object not found: '${searchBase}'.`)
    users = users.filter((u) => u.ou.toLowerCase() === ou!.toLowerCase())
  }
  const lines = users.flatMap((u, i) =>
    i === 0 ? formatAdUser(world, u, memberOf) : ['', ...formatAdUser(world, u, memberOf)],
  )
  return { values: [], lines, outcome: { kind: 'ok', command: 'Get-ADUser' }, world, flags: state.flags }
}

function createUser(world: PsWorld, name: string, sam: string, ou: string, enabled: boolean): PsWorld {
  if (world.ad === null) err('New-ADUser : Unable to contact the server. This computer is not joined to a domain.')
  if (!world.ad!.ous.some((o) => o.toLowerCase() === ou.toLowerCase())) {
    err(`New-ADUser : Directory object not found: 'OU=${ou}'.`)
  }
  if (findAdUser(world, sam) !== null) {
    err(`New-ADUser : The specified account already exists: '${sam}'.`)
  }
  const canonicalOu = world.ad!.ous.find((o) => o.toLowerCase() === ou.toLowerCase())!
  return {
    ...world,
    ad: { ...world.ad!, users: [...world.ad!.users, { name, sam, ou: canonicalOu, enabled }] },
  }
}

function runNewAdUser(state: PsRunState, stage: ParsedStage, piped: PsValue[] | null): StageOutput {
  let world = state.world
  // Mặc định TẮT — đúng như AD thật: New-ADUser không kèm mật khẩu thì
  // tài khoản sinh ra ở trạng thái Disabled (hội đồng 07-08, ghế kỹ
  // thuật). Đây là một bài học bảo mật miễn phí: người học tạo user
  // xong, Get-ADUser thấy "Enabled : False" và hiểu vì sao phải bật tay.
  const enabled = (stage.named['enabled'] ?? '$false').toLowerCase() === '$true'
  const pathOu = stage.named['path'] !== undefined ? ouFromDn(stage.named['path']) : null
  if (stage.named['path'] !== undefined && pathOu === null) {
    err(`New-ADUser : Directory object not found: '${stage.named['path']}'.`)
  }

  // Nhánh pipeline: mỗi bản ghi CSV thành một user — "hàng loạt" đúng
  // thần PowerShell nằm ở đây. Cột bind là 'Path' chứa DN đầy đủ, ĐÚNG
  // như -Path bind ByPropertyName ngoài đời (hội đồng 2026-08-07, đã
  // duyệt): quy ước cột 'OU' tự chế trước đây chạy trong app nhưng đem
  // ra AD thật là user rơi vào CN=Users im lặng — dạy một thói quen sai.
  if (piped !== null) {
    let created = 0
    for (const value of piped) {
      if (typeof value === 'string') err('New-ADUser : The input object cannot be bound. Pipe rows from Import-Csv.')
      const row = value as Record<string, string>
      const name = row['Name']
      const sam = row['SamAccountName']
      const rowPath = row['Path']
      if (name === undefined || name === '') err(`New-ADUser : Property 'Name' cannot be found on the input object.`)
      if (sam === undefined || sam === '') err(`New-ADUser : Property 'SamAccountName' cannot be found on the input object.`)
      const ou = pathOu ?? (rowPath !== undefined && rowPath !== '' ? ouFromDn(rowPath) : null)
      if (ou === null) err(`New-ADUser : Property 'Path' cannot be found on the input object (expected a DN like "OU=KeToan,DC=noibo,DC=vn", or pass -Path).`)
      world = createUser(world, name!, sam!, ou!, enabled)
      created++
    }
    // New-ADUser im lặng như thật — muốn thấy kết quả thì Get-ADUser lại:
    // chính nhịp "tự kiểm chứng" đó là một lần retrieval nữa.
    return { values: [], lines: [], outcome: { kind: 'ok', command: 'New-ADUser', createdUsers: created }, world, flags: state.flags }
  }

  const name = stage.named['name'] ?? stage.positional[0]
  const sam = stage.named['samaccountname']
  if (name === undefined || name === '') err('New-ADUser : Missing an argument for parameter -Name.')
  if (sam === undefined || sam === '') err('New-ADUser : Missing an argument for parameter -SamAccountName.')
  if (pathOu === null) err('New-ADUser : Missing an argument for parameter -Path (e.g. "OU=KeToan,DC=noibo,DC=vn").')
  world = createUser(world, name!, sam!, pathOu!, enabled)
  return { values: [], lines: [], outcome: { kind: 'ok', command: 'New-ADUser', createdUsers: 1 }, world, flags: state.flags }
}

// ---------------------------------------------------------------
// Nhóm AD — ba cmdlet của AGDLP (M19, spec v2 mục 4.5)
// ---------------------------------------------------------------

function domainDn(world: PsWorld): string {
  return world.ad!.domain.split('.').map((p) => `DC=${p}`).join(',')
}

function formatAdGroup(world: PsWorld, group: AdGroup): string[] {
  // Nhóm nằm ở CN=Users như chỗ AD thật sinh nhóm mặc định — mô hình
  // không xếp nhóm vào OU (đơn giản hóa cố ý, đủ cho bài AGDLP).
  return [
    `Name              : ${group.name}`,
    `GroupScope        : ${group.scope}`,
    `GroupCategory     : Security`,
    `DistinguishedName : CN=${group.name},CN=Users,${domainDn(world)}`,
  ]
}

function runGetAdGroup(state: PsRunState, stage: ParsedStage): StageOutput {
  const world = state.world
  if (world.ad === null) err('Get-ADGroup : Unable to contact the server. This computer is not joined to a domain.')

  const identity = stage.named['identity'] ?? stage.positional[0]
  const filter = stage.named['filter']

  if (identity !== undefined && identity !== '') {
    const group = findAdGroup(world, identity)
    if (group === null) err(`Get-ADGroup : Cannot find an object with identity: '${identity}'.`)
    return { values: [], lines: formatAdGroup(world, group!), outcome: { kind: 'ok', command: 'Get-ADGroup' }, world, flags: state.flags }
  }

  if (filter === undefined) {
    err(`Get-ADGroup : Parameter set cannot be resolved. Use -Identity <name> or -Filter *.`)
  }
  if (filter !== '*') {
    err(`Get-ADGroup : Only '-Filter *' is supported on this machine.`)
  }
  const groups = adGroups(world)
  const lines = groups.flatMap((g, i) => (i === 0 ? formatAdGroup(world, g) : ['', ...formatAdGroup(world, g)]))
  return { values: [], lines, outcome: { kind: 'ok', command: 'Get-ADGroup' }, world, flags: state.flags }
}

function runGetAdGroupMember(state: PsRunState, stage: ParsedStage): StageOutput {
  const world = state.world
  if (world.ad === null) err('Get-ADGroupMember : Unable to contact the server. This computer is not joined to a domain.')

  const identity = stage.named['identity'] ?? stage.positional[0]
  if (identity === undefined || identity === '') {
    err('Get-ADGroupMember : Missing an argument for parameter -Identity.')
  }
  const group = findAdGroup(world, identity!)
  if (group === null) err(`Get-ADGroupMember : Cannot find an object with identity: '${identity}'.`)

  // Chỉ liệt kê thành viên TRỰC TIẾP — đúng cmdlet thật (không -Recursive
  // trong phạm vi đóng băng). Cột ObjectClass là mấu chốt sư phạm: nhìn
  // vào là biết nhóm đang chứa NGƯỜI hay chứa NHÓM — chính là hình dạng
  // của chữ G→DL trong AGDLP.
  const blocks = group!.members.map((member) => {
    const memberGroup = findAdGroup(world, member)
    if (memberGroup !== null) {
      return [
        `Name           : ${memberGroup.name}`,
        `SamAccountName : ${memberGroup.name}`,
        `ObjectClass    : group`,
      ]
    }
    const user = findAdUser(world, member)!
    return [
      `Name           : ${user.name}`,
      `SamAccountName : ${user.sam}`,
      `ObjectClass    : user`,
    ]
  })
  const lines = blocks.flatMap((b, i) => (i === 0 ? b : ['', ...b]))
  return { values: [], lines, outcome: { kind: 'ok', command: 'Get-ADGroupMember' }, world, flags: state.flags }
}

function runAddAdGroupMember(state: PsRunState, stage: ParsedStage): StageOutput {
  const world = state.world
  if (world.ad === null) err('Add-ADGroupMember : Unable to contact the server. This computer is not joined to a domain.')

  const identity = stage.named['identity'] ?? stage.positional[0]
  if (identity === undefined || identity === '') {
    err('Add-ADGroupMember : Missing an argument for parameter -Identity.')
  }
  const membersText = stage.named['members']
  if (membersText === undefined || membersText === '') {
    err('Add-ADGroupMember : Missing an argument for parameter -Members.')
  }
  const group = findAdGroup(world, identity!)
  if (group === null) err(`Add-ADGroupMember : Cannot find an object with identity: '${identity}'.`)

  // -Members nhận danh sách cách nhau dấu phẩy như PowerShell thật.
  const requested = membersText!.split(',').map((m) => m.trim()).filter((m) => m !== '')
  if (requested.length === 0) err('Add-ADGroupMember : Missing an argument for parameter -Members.')

  let members = [...group!.members]
  let added = 0
  for (const member of requested) {
    const memberGroup = findAdGroup(world, member)
    const memberUser = findAdUser(world, member)
    if (memberGroup === null && memberUser === null) {
      err(`Add-ADGroupMember : Cannot find an object with identity: '${member}'.`)
    }
    if (memberGroup !== null) {
      // Hai luật thật của AD, giữ nguyên vì chúng CHÍNH LÀ bài học AGDLP:
      // Global không chứa được DomainLocal (chiều đúng là DL chứa G), và
      // không được tạo vòng thành viên.
      if (group!.scope === 'Global' && memberGroup.scope === 'DomainLocal') {
        err('Add-ADGroupMember : A global group cannot have a domain local group as a member.')
      }
      if (
        memberGroup.name.toLowerCase() === group!.name.toLowerCase() ||
        isMemberOfGroup(world, memberGroup.name, group!.name)
      ) {
        err('Add-ADGroupMember : The operation would create a circular group membership.')
      }
    }
    // Đã là thành viên thì thôi — cmdlet thật cũng lặng lẽ cho qua.
    const canonical = memberGroup?.name ?? memberUser!.sam
    if (!members.some((m) => m.toLowerCase() === canonical.toLowerCase())) {
      members = [...members, canonical]
      added++
    }
  }

  const nextWorld: PsWorld = {
    ...world,
    ad: {
      ...world.ad!,
      groups: adGroups(world).map((g) => (g.name === group!.name ? { ...g, members } : g)),
    },
  }
  // Im lặng như mọi lệnh GHI của AD — muốn thấy thì Get-ADGroupMember lại.
  return { values: [], lines: [], outcome: { kind: 'ok', command: 'Add-ADGroupMember', addedMembers: added }, world: nextWorld, flags: state.flags }
}

function readFileLines(world: PsWorld, path: string, cmdlet: string): string[] {
  const key = Object.keys(world.files).find((f) => f.toLowerCase() === path.toLowerCase())
  if (key === undefined) err(`${cmdlet} : Cannot find path '${path}' because it does not exist.`)
  return world.files[key!]!
}

function runImportCsv(state: PsRunState, stage: ParsedStage): StageOutput {
  const path = stage.named['path'] ?? stage.positional[0]
  if (path === undefined || path === '') err('Import-Csv : Missing an argument for parameter -Path.')
  const raw = readFileLines(state.world, path!, 'Import-Csv')
  if (raw.length < 2) err(`Import-Csv : The file '${path}' has no data rows.`)
  // Tách ô TÔN TRỌNG nháy kép như CSV thật: cột Path chứa DN có dấu phẩy
  // ("OU=KeToan,DC=noibo,DC=vn") bắt buộc bọc nháy — split(',') trần sẽ
  // băm nát DN. Đây cũng chính là bài học đời thật về CSV cho AD.
  const splitCsvLine = (line: string): string[] => {
    const cells: string[] = []
    let current = ''
    let inQuote = false
    for (const ch of line) {
      if (ch === '"') {
        inQuote = !inQuote
        continue
      }
      if (ch === ',' && !inQuote) {
        cells.push(current.trim())
        current = ''
        continue
      }
      current += ch
    }
    cells.push(current.trim())
    return cells
  }
  const headers = splitCsvLine(raw[0]!)
  const rows: Record<string, string>[] = raw.slice(1).map((line) => {
    const cells = splitCsvLine(line)
    return Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? '']))
  })
  // Hiển thị dạng bảng gọn để người học soi dữ liệu trước khi bơm vào ống.
  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => (r[h] ?? '').length), 2))
  const pad = (text: string, i: number) => text.padEnd(widths[i]!)
  const lines = [
    headers.map(pad).join('  '),
    headers.map((h, i) => '-'.repeat(widths[i]!)).join('  '),
    ...rows.map((r) => headers.map((h, i) => pad(r[h] ?? '', i)).join('  ')),
  ]
  return { values: rows, lines, outcome: { kind: 'ok', command: 'Import-Csv' }, world: state.world, flags: state.flags }
}

function runGetContent(state: PsRunState, stage: ParsedStage): StageOutput {
  const path = stage.named['path'] ?? stage.positional[0]
  if (path === undefined || path === '') err('Get-Content : Missing an argument for parameter -Path.')
  const lines = readFileLines(state.world, path!, 'Get-Content')
  return { values: [...lines], lines: [...lines], outcome: { kind: 'ok', command: 'Get-Content' }, world: state.world, flags: state.flags }
}

function runSelectString(state: PsRunState, stage: ParsedStage, piped: PsValue[] | null): StageOutput {
  const pattern = stage.named['pattern'] ?? stage.positional[0]
  if (pattern === undefined || pattern === '') err('Select-String : Missing an argument for parameter -Pattern.')
  const path = stage.named['path'] ?? stage.positional[1]

  let source: { line: string; no: number }[]
  let prefix = ''
  if (piped !== null) {
    source = piped.map((v, i) => ({ line: typeof v === 'string' ? v : JSON.stringify(v), no: i + 1 }))
  } else {
    if (path === undefined || path === '') {
      err('Select-String : You must provide -Path or pipe lines from Get-Content.')
    }
    source = readFileLines(state.world, path!, 'Select-String').map((line, i) => ({ line, no: i + 1 }))
    prefix = `${path}:`
  }

  // Đơn giản hóa cố ý: khớp CHUỖI CON, không phân biệt hoa thường.
  const needle = pattern!.toLowerCase()
  const matches = source.filter((s) => s.line.toLowerCase().includes(needle))
  const lines = matches.map((m) => `${prefix}${m.no}:${m.line}`)
  const flags: PsRunState['flags'] = {
    ...state.flags,
    foundLines: [...state.flags.foundLines, ...matches.map((m) => m.line)],
    foundRuns: [...(state.flags.foundRuns ?? []), { matches: matches.length, lines: matches.map((m) => m.line) }],
  }
  return { values: matches.map((m) => m.line), lines, outcome: { kind: 'ok', command: 'Select-String', matches: matches.length }, world: state.world, flags }
}

function runGetHelp(state: PsRunState, stage: ParsedStage): StageOutput {
  const topic = (stage.named['name'] ?? stage.positional[0])?.toLowerCase()
  if (topic === undefined || topic === '') {
    // Help tổng: outcome rỗng lines — UI kể danh sách lệnh bằng tiếng Việt.
    return { values: [], lines: [], outcome: { kind: 'help' }, world: state.world, flags: state.flags }
  }
  const syntax = SYNTAX[topic]
  if (syntax === undefined) err(`Get-Help : Cannot find Help for topic '${topic}'.`)
  return { values: [], lines: ['SYNTAX', ...syntax!.map((s) => `    ${s}`)], outcome: { kind: 'ok', command: 'Get-Help' }, world: state.world, flags: state.flags }
}

// ---------------------------------------------------------------
// Cửa vào duy nhất
// ---------------------------------------------------------------

function runStage(state: PsRunState, stage: ParsedStage, piped: PsValue[] | null): StageOutput {
  switch (stage.cmdlet.toLowerCase()) {
    case 'get-netipaddress':
      return runGetNetIpAddress(state)
    case 'test-netconnection':
      return runTestNetConnection(state, stage)
    case 'get-aduser':
      return runGetAdUser(state, stage)
    case 'new-aduser':
      return runNewAdUser(state, stage, piped)
    case 'get-adgroup':
      return runGetAdGroup(state, stage)
    case 'get-adgroupmember':
      return runGetAdGroupMember(state, stage)
    case 'add-adgroupmember':
      return runAddAdGroupMember(state, stage)
    case 'import-csv':
      return runImportCsv(state, stage)
    case 'get-content':
      return runGetContent(state, stage)
    case 'select-string':
      return runSelectString(state, stage, piped)
    case 'get-help':
    case 'help':
      return runGetHelp(state, stage)
    default:
      throw new StageError(
        `${stage.cmdlet} : The term '${stage.cmdlet}' is not recognized as a name of a cmdlet.`,
      )
  }
}

/**
 * Chạy một dòng người học gõ. Nhân nhượng lối gõ đời thường: hoa/thường
 * tùy ý ở tên cmdlet và tham số, nháy kép hay nháy đơn như nhau.
 */
export function runPsLine(state: PsRunState, input: string): PsResult {
  const trimmed = input.trim()
  if (trimmed === '') return { outcome: { kind: 'unknown', input: '' }, lines: [], state }

  // Tách ống ở tầng ngoài nháy.
  const stagesText: string[] = []
  let current = ''
  let quote: '"' | "'" | null = null
  for (const ch of trimmed) {
    if (quote !== null) {
      if (ch === quote) quote = null
      current += ch
      continue
    }
    if (ch === '"' || ch === "'") {
      quote = ch
      current += ch
      continue
    }
    if (ch === '|') {
      stagesText.push(current)
      current = ''
      continue
    }
    current += ch
  }
  stagesText.push(current)

  if (stagesText.length > 2) {
    return {
      outcome: { kind: 'error', message: 'Only one pipeline stage is supported on this machine.' },
      lines: ['ParserError : Only one pipeline stage is supported on this machine.'],
      state,
    }
  }

  try {
    let piped: PsValue[] | null = null
    let working = state
    let last: StageOutput | null = null
    for (const text of stagesText) {
      const tokens = tokenize(text)
      if (tokens === null) {
        return {
          outcome: { kind: 'error', message: 'The string is missing the terminator.' },
          lines: ["ParserError : The string is missing the terminator: '\"'."],
          state,
        }
      }
      if (tokens.length === 0) {
        return {
          outcome: { kind: 'error', message: 'An empty pipe element is not allowed.' },
          lines: ['ParserError : An empty pipe element is not allowed.'],
          state,
        }
      }
      const stage = parseStage(tokens)
      // Lệnh lạ ở stage ĐẦU khi không có ống: outcome 'unknown' cho UI
      // kể lời tiếng Việt (cùng nếp terminal Phòng khám).
      const known = PS_COMMANDS.some((c) => c.toLowerCase() === stage.cmdlet.toLowerCase()) || stage.cmdlet.toLowerCase() === 'help'
      if (!known && stagesText.length === 1) {
        return { outcome: { kind: 'unknown', input: stage.cmdlet }, lines: [], state }
      }
      last = runStage(working, stage, piped)
      working = { world: last.world, flags: last.flags }
      piped = last.values
    }
    return { outcome: last!.outcome, lines: last!.lines, state: working }
  } catch (error) {
    if (error instanceof StageError) {
      return { outcome: { kind: 'error', message: error.message }, lines: [error.message], state }
    }
    throw error
  }
}

/** Chạy một loạt dòng liên tiếp trên thế giới ban đầu — dùng cho chấm/schema. */
export function runPsScript(world: PsWorld, inputs: readonly string[]): { state: PsRunState; results: PsResult[] } {
  let state = initialPsState(world)
  const results: PsResult[] = []
  for (const input of inputs) {
    const result = runPsLine(state, input)
    results.push(result)
    state = result.state
  }
  return { state, results }
}
