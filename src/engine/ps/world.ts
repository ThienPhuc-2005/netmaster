// Môi trường giả cho terminal PowerShell (spec Module 12).
//
// PHẠM VI ĐÃ ĐÓNG BĂNG — MỐC 2, 11 cmdlet (spec v2 mục 4.5 mở từ mốc 8
// của Module 12; cùng nếp đóng băng phạm vi lab):
//   - 8 cmdlet gốc: Get-Help, Get-NetIPAddress, Test-NetConnection,
//     Get-ADUser, New-ADUser, Import-Csv, Get-Content, Select-String.
//   - 3 cmdlet nhóm cho AGDLP của M19: Get-ADGroup, Get-ADGroupMember,
//     Add-ADGroupMember (một lệnh GHI — xếp nhóm phải thực hành được).
//   - Pipeline vẫn đúng MỘT tầng (Import-Csv | New-ADUser;
//     Get-Content | Select-String). KHÔNG scriptblock, KHÔNG biến,
//     KHÔNG vòng lặp — "tạo hàng loạt" là một dòng pipeline, đúng thần
//     PowerShell; script đa dòng chỉ xuất hiện ở màn dạy dạng đọc-hiểu.
//   - Select-String khớp CHUỖI CON không phân biệt hoa thường (không
//     regex) — đơn giản hóa cố ý, đủ cho bài đọc log.
//
// Thế giới mô phỏng gồm 4 mảnh: máy đang ngồi (cho Get-NetIPAddress),
// các đích mạng (cho Test-NetConnection), miền AD nhỏ (users + groups,
// cho *-ADUser / *-ADGroup*), và vài file phẳng (CSV nhân sự, file log).
//
// Technical contract: thuần — không đồng hồ, không random, không mutate.

/** Một card mạng của máy đang ngồi. */
export interface PsInterface {
  alias: string
  ip: string
  prefix: number
}

/** Một đích trên mạng mà Test-NetConnection với tới được (hoặc không). */
export interface PsTarget {
  ip: string
  /** Tên phân giải được (nếu có) — gõ tên thay IP vẫn chạy. */
  name?: string
  /** ICMP có được trả lời không (PingSucceeded). */
  pingable: boolean
  /** Các cổng TCP đang mở (TcpTestSucceeded khi -Port trúng). */
  openPorts: number[]
}

export interface AdUser {
  name: string
  sam: string
  ou: string
  enabled: boolean
}

/**
 * Một nhóm bảo mật trong miền — nguyên liệu của AGDLP (M19).
 *
 * `members` là sam của user HOẶC name của nhóm khác: nhóm lồng nhóm
 * chính là chữ G→DL của AGDLP (Global gom NGƯỜI theo vai, DomainLocal
 * gom NHÓM theo quyền), nên mô hình phải chứa được cả hai loại thành
 * viên ngay từ đầu.
 */
export interface AdGroup {
  name: string
  scope: 'Global' | 'DomainLocal'
  members: string[]
}

export interface PsWorld {
  hostname: string
  interfaces: PsInterface[]
  targets: PsTarget[]
  /** Miền AD — null với bài chưa chạm tới AD. `groups` thiếu = không có
   *  nhóm (mọi thế giới của Module 12 giữ nguyên nghĩa, không sửa gì). */
  ad: { domain: string; ous: string[]; users: AdUser[]; groups?: AdGroup[] } | null
  /** Tên file → các dòng nội dung (CSV, log). */
  files: Record<string, string[]>
}

/**
 * Dấu vết các việc người học ĐÃ LÀM trong phiên — nguyên liệu chấm cho
 * loại mục tiêu "đã kiểm tra kết nối" và "đã lôi được dòng log ra":
 * hai việc đó không đổi thế giới, chỉ chứng minh bằng hành động.
 */
export interface PsFlags {
  testedConnections: { ip: string; port: number | null; succeeded: boolean }[]
  foundLines: string[]
}

/** Trạng thái một phiên terminal: thế giới hiện tại + dấu vết hành động. */
export interface PsRunState {
  world: PsWorld
  flags: PsFlags
}

export function initialPsState(world: PsWorld): PsRunState {
  return { world, flags: { testedConnections: [], foundLines: [] } }
}

// ---------------------------------------------------------------
// Kiểm cấu trúc — lỗi của NGƯỜI SOẠN BÀI, không phải bài học
// ---------------------------------------------------------------

export interface PsWorldProblem {
  code:
    | 'duplicate-interface'
    | 'duplicate-target-ip'
    | 'duplicate-target-name'
    | 'duplicate-sam'
    | 'user-ou-unknown'
    | 'duplicate-ou'
    | 'duplicate-group'
    | 'group-member-unknown'
    | 'global-contains-domainlocal'
    | 'group-cycle'
  where: string
}

export function validatePsWorld(world: PsWorld): PsWorldProblem[] {
  const problems: PsWorldProblem[] = []
  const dup = (values: string[], code: PsWorldProblem['code']) => {
    const seen = new Set<string>()
    for (const v of values) {
      const key = v.toLowerCase()
      if (seen.has(key)) problems.push({ code, where: v })
      seen.add(key)
    }
  }
  dup(world.interfaces.map((i) => i.alias), 'duplicate-interface')
  dup(world.targets.map((t) => t.ip), 'duplicate-target-ip')
  dup(world.targets.flatMap((t) => (t.name === undefined ? [] : [t.name])), 'duplicate-target-name')
  if (world.ad !== null) {
    dup(world.ad.users.map((u) => u.sam), 'duplicate-sam')
    dup(world.ad.ous, 'duplicate-ou')
    const ous = new Set(world.ad.ous.map((o) => o.toLowerCase()))
    for (const user of world.ad.users) {
      if (!ous.has(user.ou.toLowerCase())) {
        problems.push({ code: 'user-ou-unknown', where: `${user.sam}/${user.ou}` })
      }
    }

    const groups = world.ad.groups ?? []
    dup(groups.map((g) => g.name), 'duplicate-group')
    const sams = new Set(world.ad.users.map((u) => u.sam.toLowerCase()))
    const groupByName = new Map(groups.map((g) => [g.name.toLowerCase(), g]))
    for (const group of groups) {
      for (const member of group.members) {
        const key = member.toLowerCase()
        const memberGroup = groupByName.get(key)
        if (!sams.has(key) && memberGroup === undefined) {
          problems.push({ code: 'group-member-unknown', where: `${group.name}/${member}` })
        }
        // Luật thật của AD: Global không chứa được DomainLocal — chiều
        // đúng của AGDLP là DL chứa G, đảo lại là dữ liệu không thể có.
        if (group.scope === 'Global' && memberGroup?.scope === 'DomainLocal') {
          problems.push({ code: 'global-contains-domainlocal', where: `${group.name}/${member}` })
        }
      }
    }
    // Nhóm chứa vòng (A ∈ B ∈ A) là dữ liệu vô nghĩa: phép "user có nằm
    // trong nhóm không" sẽ không có đáp án ổn định.
    for (const group of groups) {
      const seen = new Set<string>()
      const stack = [group.name.toLowerCase()]
      while (stack.length > 0) {
        const current = stack.pop()!
        if (seen.has(current)) continue
        seen.add(current)
        for (const member of groupByName.get(current)?.members ?? []) {
          const key = member.toLowerCase()
          if (key === group.name.toLowerCase()) {
            problems.push({ code: 'group-cycle', where: group.name })
            stack.length = 0
            break
          }
          if (groupByName.has(key)) stack.push(key)
        }
      }
    }
  }
  return problems
}

/** Tra user theo samAccountName (không phân biệt hoa thường). */
export function findAdUser(world: PsWorld, sam: string): AdUser | null {
  return world.ad?.users.find((u) => u.sam.toLowerCase() === sam.toLowerCase()) ?? null
}

/** Các nhóm của miền — thiếu trường groups thì là danh sách rỗng. */
export function adGroups(world: PsWorld): AdGroup[] {
  return world.ad?.groups ?? []
}

/** Tra nhóm theo tên (không phân biệt hoa thường). */
export function findAdGroup(world: PsWorld, name: string): AdGroup | null {
  return adGroups(world).find((g) => g.name.toLowerCase() === name.toLowerCase()) ?? null
}

/**
 * User có nằm trong nhóm không, TÍNH CẢ nhóm lồng nhóm — đây chính là
 * câu "quyền có chảy tới người này không" của AGDLP: user vào Global,
 * Global vào DomainLocal, thì user phải được coi là thành viên của
 * DomainLocal. Đi bằng visited-set nên dữ liệu lỡ có vòng cũng không treo.
 */
export function isMemberOfGroup(world: PsWorld, groupName: string, sam: string): boolean {
  const samKey = sam.toLowerCase()
  const visited = new Set<string>()
  const stack = [groupName.toLowerCase()]
  while (stack.length > 0) {
    const current = stack.pop()!
    if (visited.has(current)) continue
    visited.add(current)
    const group = findAdGroup(world, current)
    if (group === null) continue
    for (const member of group.members) {
      if (member.toLowerCase() === samKey) return true
      if (findAdGroup(world, member) !== null) stack.push(member.toLowerCase())
    }
  }
  return false
}

/** Tra đích theo IP hoặc theo tên phân giải được. */
export function findTarget(world: PsWorld, target: string): PsTarget | null {
  const lower = target.toLowerCase()
  return (
    world.targets.find((t) => t.ip === target || t.name?.toLowerCase() === lower) ?? null
  )
}

export function isIpv4(text: string): boolean {
  const parts = text.split('.')
  if (parts.length !== 4) return false
  return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255)
}
