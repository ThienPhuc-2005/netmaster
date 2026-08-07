// Môi trường giả cho terminal PowerShell (spec Module 12).
//
// PHẠM VI ĐÃ ĐÓNG BĂNG (chốt với người dùng trước khi code, cùng nếp
// đóng băng phạm vi lab ở Module 4):
//   - 8 cmdlet: Get-Help, Get-NetIPAddress, Test-NetConnection,
//     Get-ADUser, New-ADUser, Import-Csv, Get-Content, Select-String.
//   - Pipeline đúng MỘT tầng (Import-Csv | New-ADUser;
//     Get-Content | Select-String). KHÔNG scriptblock, KHÔNG biến,
//     KHÔNG vòng lặp — "tạo hàng loạt" là một dòng pipeline, đúng thần
//     PowerShell; script đa dòng chỉ xuất hiện ở màn dạy dạng đọc-hiểu.
//   - Select-String khớp CHUỖI CON không phân biệt hoa thường (không
//     regex) — đơn giản hóa cố ý, đủ cho bài đọc log.
//
// Thế giới mô phỏng gồm 4 mảnh: máy đang ngồi (cho Get-NetIPAddress),
// các đích mạng (cho Test-NetConnection), miền AD nhỏ (cho *-ADUser),
// và vài file phẳng (CSV danh sách nhân sự, file log).
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

export interface PsWorld {
  hostname: string
  interfaces: PsInterface[]
  targets: PsTarget[]
  /** Miền AD — null với bài chưa chạm tới AD. */
  ad: { domain: string; ous: string[]; users: AdUser[] } | null
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
  }
  return problems
}

/** Tra user theo samAccountName (không phân biệt hoa thường). */
export function findAdUser(world: PsWorld, sam: string): AdUser | null {
  return world.ad?.users.find((u) => u.sam.toLowerCase() === sam.toLowerCase()) ?? null
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
