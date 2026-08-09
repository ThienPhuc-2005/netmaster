// Drill VLSM (spec v2 Module 13, mục 4.4) — bài THIẾT KẾ, không phải bài
// tính lại.
//
// Khác hẳn drill subnet của Module 3: ở đó đề cho sẵn một subnet và hỏi
// một con số; ở đây đề cho MỘT DẢI và một danh sách nhu cầu, người học
// tự quyết cắt thế nào. Vì thế bài này không có "một đáp án đúng" — có
// vô số cách cắt hợp lệ, và bộ chấm phải chấm THIẾT KẾ chứ không so với
// lời giải mẫu (đúng tinh thần gradeLab/gradeCli).
//
// BA TIÊU CHÍ, đúng như spec:
//   1. ĐÚNG      — mỗi khối nằm trong dải mẹ, đứng đúng ranh giới mạng,
//                  đủ chỗ cho số máy, và không khối nào chồng lấn nhau.
//   2. ĐỦ        — không bỏ sót phòng ban nào.
//   3. KHÔNG PHÍ — mỗi khối là cỡ NHỎ NHẤT đủ dùng.
// Thiếu tiêu chí 3 thì "chia đều mỗi phòng một /26" cũng qua bài, mà đó
// đúng là thói quen VLSM sinh ra để chữa.
//
// KHOẢNG TRỐNG GIỮA HAI KHỐI KHÔNG BỊ TÍNH LÀ LỖI (quyết định có chủ ý):
// địa chỉ chừa lại để dành là việc bình thường của người thiết kế mạng.
// Cái bị bắt là chồng lấn và cấp thừa cỡ.
//
// Engine chỉ trả DỮ LIỆU ngữ nghĩa — tên phòng ban, lời đề, lời phê đều
// thuộc tầng UI/i18n. Ngẫu nhiên bơm từ ngoài qua `Rng` nên mọi phiên
// tái lập được 100% trong test.

import {
  broadcastAddress,
  intToIp,
  ipToInt,
  networkAddress,
  prefixToMask,
  smallestPrefixForHosts,
  usableHostCount,
} from './ipv4'
import type { Rng } from './drill'

/** Một phòng ban cần bao nhiêu máy. `id` là khóa ngữ nghĩa, không phải tên hiển thị. */
export interface VlsmNeed {
  id: string
  hosts: number
}

export interface VlsmProblem {
  id: string
  /** Dải mẹ được giao — luôn là địa chỉ mạng chuẩn. */
  base: { ip: string; prefix: number }
  /**
   * Nhu cầu theo THỨ TỰ ĐỀ BÀI, cố ý KHÔNG sắp sẵn từ lớn tới nhỏ: tự
   * nhận ra "phải cắt phòng to trước" chính là bài học của module.
   */
  needs: VlsmNeed[]
}

/** Một khối người học cấp cho một phòng ban. */
export interface VlsmAssignment {
  needId: string
  ip: string
  prefix: number
}

/**
 * Vì sao một dòng chưa đạt. Mã ngữ nghĩa để UI dựng lời phê CHỈ RA CHỖ
 * SAI mà không đọc hộ đáp án (spec: "feedback chỉ được chỗ sai").
 */
export type VlsmIssue =
  /** Chưa cấp khối nào cho phòng ban này. */
  | 'missing'
  /** Địa chỉ hoặc prefix không đọc được. */
  | 'invalid'
  /** Khối nằm ngoài dải mẹ được giao. */
  | 'outside-base'
  /** Địa chỉ đưa vào không phải địa chỉ mạng của khối (lệch ranh giới). */
  | 'not-network-address'
  /** Khối quá nhỏ, không đủ chỗ cho số máy của phòng. */
  | 'too-small'
  /** Khối to hơn mức cần — vẫn chạy được, nhưng phí đất. */
  | 'wasteful'
  /** Khối này giẫm lên khối của phòng khác. */
  | 'overlaps'

export interface VlsmLine {
  need: VlsmNeed
  /** Khối người học cấp; null khi bỏ trống. */
  assignment: VlsmAssignment | null
  issues: VlsmIssue[]
  /** Không lỗi nào — kể cả lỗi phí đất. */
  ok: boolean
}

export interface VlsmEvaluation {
  lines: VlsmLine[]
  /** Ba tiêu chí của spec, tách riêng để UI nói rõ hỏng ở tiêu chí nào. */
  criteria: { correct: boolean; complete: boolean; noWaste: boolean }
  /** Khối được cấp cho một phòng không có trong đề — lỗi của tầng UI. */
  unknownNeedIds: string[]
  passed: boolean
}

// ---------------------------------------------------------------
// Phép tính trên khối
// ---------------------------------------------------------------

interface Block {
  start: number
  end: number
}

function blockOf(ip: string, prefix: number): Block {
  const start = ipToInt(networkAddress(ip, prefix))
  return { start, end: ipToInt(broadcastAddress(ip, prefix)) }
}

function overlaps(a: Block, b: Block): boolean {
  return a.start <= b.end && b.start <= a.end
}

function contains(outer: Block, inner: Block): boolean {
  return inner.start >= outer.start && inner.end <= outer.end
}

function isValidPrefix(prefix: number): boolean {
  return Number.isInteger(prefix) && prefix >= 0 && prefix <= 32
}

/** Đọc một khối người học nhập; null khi địa chỉ/prefix không đọc được. */
function parseAssignment(assignment: VlsmAssignment): Block | null {
  if (!isValidPrefix(assignment.prefix)) return null
  try {
    return blockOf(assignment.ip, assignment.prefix)
  } catch {
    return null
  }
}

// ---------------------------------------------------------------
// Chấm
// ---------------------------------------------------------------

export function gradeVlsm(problem: VlsmProblem, answer: readonly VlsmAssignment[]): VlsmEvaluation {
  const byNeed = new Map<string, VlsmAssignment>()
  const unknownNeedIds: string[] = []
  const needIds = new Set(problem.needs.map((n) => n.id))
  for (const assignment of answer) {
    if (!needIds.has(assignment.needId)) {
      unknownNeedIds.push(assignment.needId)
      continue
    }
    // Cấp hai khối cho một phòng: lấy khối SAU (ô nhập cuối cùng người
    // học sửa) — UI vốn chỉ cho mỗi phòng một ô.
    byNeed.set(assignment.needId, assignment)
  }

  const baseBlock = blockOf(problem.base.ip, problem.base.prefix)
  /** Khối đọc được của từng phòng — nguyên liệu cho phép kiểm chồng lấn. */
  const blocks = new Map<string, Block>()
  for (const [needId, assignment] of byNeed) {
    const block = parseAssignment(assignment)
    if (block !== null) blocks.set(needId, block)
  }

  const lines: VlsmLine[] = problem.needs.map((need) => {
    const assignment = byNeed.get(need.id) ?? null
    if (assignment === null) {
      return { need, assignment: null, issues: ['missing'], ok: false }
    }
    const block = blocks.get(need.id)
    if (block === undefined) {
      return { need, assignment, issues: ['invalid'], ok: false }
    }

    const issues: VlsmIssue[] = []
    // Lệch ranh giới nói TRƯỚC: mọi phép kiểm sau đều đọc theo khối đã
    // chuẩn hóa, nên không nói ra thì người học không hiểu vì sao con số
    // mình nhập lại biến thành khối khác.
    if (ipToInt(assignment.ip) !== block.start) issues.push('not-network-address')
    if (!contains(baseBlock, block)) issues.push('outside-base')
    if (usableHostCount(assignment.prefix) < need.hosts) issues.push('too-small')
    else if (assignment.prefix < smallestPrefixForHosts(need.hosts)) issues.push('wasteful')

    for (const [otherId, otherBlock] of blocks) {
      if (otherId === need.id) continue
      if (overlaps(block, otherBlock)) {
        issues.push('overlaps')
        break
      }
    }

    return { need, assignment, issues, ok: issues.length === 0 }
  })

  const has = (issue: VlsmIssue) => lines.some((line) => line.issues.includes(issue))
  const criteria = {
    correct:
      !has('invalid') &&
      !has('outside-base') &&
      !has('not-network-address') &&
      !has('too-small') &&
      !has('overlaps'),
    complete: !has('missing'),
    noWaste: !has('wasteful'),
  }

  return {
    lines,
    criteria,
    unknownNeedIds,
    passed:
      criteria.correct && criteria.complete && criteria.noWaste && unknownNeedIds.length === 0,
  }
}

// ---------------------------------------------------------------
// Lời giải tham chiếu
// ---------------------------------------------------------------

/**
 * Cắt theo đúng cách sách vở dạy: **phòng to trước, khối xếp liền nhau
 * từ đầu dải**. Đây là lời giải THAM CHIẾU (tầng 3 của thang gợi ý và
 * chốt chặn đề bài), không phải khuôn để so bài người học — mọi cách cắt
 * qua được ba tiêu chí đều được công nhận.
 *
 * Trả null khi dải mẹ không đủ chỗ: đề bài như thế là đề hỏng.
 */
export function solveVlsm(problem: VlsmProblem): VlsmAssignment[] | null {
  const base = blockOf(problem.base.ip, problem.base.prefix)
  const ordered = [...problem.needs].sort((a, b) => b.hosts - a.hosts || (a.id < b.id ? -1 : 1))
  const out: VlsmAssignment[] = []
  let cursor = base.start

  for (const need of ordered) {
    const prefix = smallestPrefixForHosts(need.hosts)
    const size = 2 ** (32 - prefix)
    // Khối phải đứng đúng ranh giới của chính cỡ nó (luật căn khối).
    const aligned = Math.ceil(cursor / size) * size
    if (aligned + size - 1 > base.end) return null
    out.push({ needId: need.id, ip: intToIp(aligned), prefix })
    cursor = aligned + size
  }

  // Trả về theo THỨ TỰ ĐỀ BÀI để UI đổ thẳng vào các ô nhập.
  const byId = new Map(out.map((a) => [a.needId, a]))
  return problem.needs.map((need) => byId.get(need.id)!)
}

/** Mô tả một khối cho UI in bảng (mask dạng x.x.x.x như bảng thiết kế thật). */
export function describeBlock(assignment: VlsmAssignment): {
  network: string
  mask: string
  broadcast: string
  usableHosts: number
} {
  return {
    network: networkAddress(assignment.ip, assignment.prefix),
    mask: prefixToMask(assignment.prefix),
    broadcast: broadcastAddress(assignment.ip, assignment.prefix),
    usableHosts: usableHostCount(assignment.prefix),
  }
}

// ---------------------------------------------------------------
// Sinh đề
// ---------------------------------------------------------------

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

function shuffled<T>(rng: Rng, items: readonly T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = randInt(rng, 0, i)
    const tmp = out[i]!
    out[i] = out[j]!
    out[j] = tmp
  }
  return out
}

/**
 * Số máy sao cho cỡ khối nhỏ nhất đủ dùng ĐÚNG BẰNG `prefix`.
 *
 * Sinh ngược từ cỡ khối chứ không sinh số bừa rồi thử: nhờ vậy đề luôn
 * có lời giải vừa khít, và tiêu chí "không phí đất" mới có nghĩa.
 */
function hostsForPrefix(rng: Rng, prefix: number): number {
  const max = usableHostCount(prefix)
  const min = usableHostCount(prefix + 1) + 1
  return randInt(rng, min, max)
}

/**
 * Sinh một đề VLSM tất định.
 *
 * Cách dựng: chọn dải mẹ /23../25, rồi chọn 3-4 cỡ khối KHÁC NHAU nằm
 * vừa trong đó, mỗi cỡ sinh ra một số máy vừa khít. Cỡ khác nhau là cốt
 * lõi của VLSM — ba khối cùng cỡ thì bài này thành bài chia đều của
 * Module 3.
 */
export function generateVlsmProblem(rng: Rng): VlsmProblem {
  const basePrefix = randInt(rng, 23, 25)
  const baseIp = networkAddress(
    `192.168.${randInt(rng, 0, 255)}.${randInt(rng, 0, 255)}`,
    basePrefix,
  )
  const capacity = 2 ** (32 - basePrefix)

  // Ứng viên cỡ khối: nhỏ hơn dải mẹ ít nhất một bậc, không nhỏ hơn /29
  // (một phòng ban 6 máy là mức thấp nhất còn kể được thành chuyện).
  const candidates: number[] = []
  for (let prefix = basePrefix + 1; prefix <= 29; prefix++) candidates.push(prefix)

  const wanted = randInt(rng, 3, 4)
  const chosen: number[] = []
  let used = 0
  // Duyệt theo thứ tự NGẪU NHIÊN chứ không từ khối to xuống: duyệt theo
  // cỡ thì đề nào cũng ra đúng một bộ cỡ, và người học thuộc luôn hình
  // dạng bài. Tổng các cỡ (lũy thừa 2 đôi một khác nhau) không vượt dải
  // mẹ thì luôn xếp khít được khi cắt to-trước — nên chỉ cần cộng dồn.
  for (const prefix of shuffled(rng, candidates)) {
    if (chosen.length >= wanted) break
    const size = 2 ** (32 - prefix)
    if (used + size > capacity) continue
    chosen.push(prefix)
    used += size
  }
  // Dải hẹp (/25) có thể không nhặt đủ 3 cỡ khác nhau bằng vòng trên —
  // bù bằng những cỡ nhỏ nhất còn trống, vẫn giữ luật "không trùng cỡ".
  for (let prefix = 29; prefix >= basePrefix + 1 && chosen.length < 3; prefix--) {
    if (chosen.includes(prefix)) continue
    const size = 2 ** (32 - prefix)
    if (used + size > capacity) continue
    chosen.push(prefix)
    used += size
  }

  const needs = shuffled(
    rng,
    chosen.map((prefix, i) => ({ id: `phong-${i + 1}`, hosts: hostsForPrefix(rng, prefix) })),
  )

  return {
    id: `vlsm:${baseIp}/${basePrefix}:${needs.map((n) => n.hosts).join('-')}`,
    base: { ip: baseIp, prefix: basePrefix },
    needs,
  }
}

/** Một phiên drill VLSM (mặc định 5 đề — mỗi đề nặng hơn bài subnet nhiều). */
export function generateVlsmSession(rng: Rng, count = 5): VlsmProblem[] {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error(`Invalid VLSM session size: ${count} (expected integer >= 1)`)
  }
  return Array.from({ length: count }, () => generateVlsmProblem(rng))
}
