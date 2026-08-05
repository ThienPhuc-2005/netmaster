// Bộ sinh bài drill subnetting (spec Module 3): "mỗi ngày 10 bài chia
// subnet tự sinh ngẫu nhiên, có đồng hồ đếm, theo dõi tốc độ tiến bộ;
// dạy quy tắc magic number".
//
// Engine chỉ trả DỮ LIỆU ngữ nghĩa (đề, đáp án chuẩn tắc, lời giải có
// cấu trúc) — mọi câu chữ hiển thị thuộc tầng i18n/UI. Ngẫu nhiên được
// bơm từ ngoài qua Rng để phiên drill tái lập được 100% trong test.

import type { DrillResult, ISODate } from '../types'
import { addDays } from '../dates'
import {
  broadcastAddress,
  firstUsableHost,
  intToIp,
  ipToInt,
  lastUsableHost,
  magicNumber,
  networkAddress,
  prefixToMask,
  smallestPrefixForHosts,
  usableHostCount,
} from './ipv4'

// ---------------------------------------------------------------
// PRNG
// ---------------------------------------------------------------

/** Uniform random in [0, 1). Injected from outside so drills are deterministic. */
export type Rng = () => number

/**
 * Mulberry32 — tiny 32-bit PRNG by Tommy Ettinger (public domain).
 * Ported from https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 * Same seed → same sequence on every platform.
 */
export function mulberry32(seed: number): Rng {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ---------------------------------------------------------------
// Kiểu bài drill
// ---------------------------------------------------------------

export type DrillProblemType =
  | 'network-addr'
  | 'broadcast'
  | 'host-range'
  | 'host-count'
  | 'prefix-for-hosts'
  | 'mask-convert'

/**
 * Dữ kiện đề bài — phần người học nhìn thấy. UI dựng câu hỏi từ đây:
 * - ipPrefix: bài tính toán trên 1 IP/subnet (với host-count, `ip` là
 *   chính địa chỉ mạng của subnet được hỏi).
 * - requiredHosts: bài "cần N host, chọn prefix nào".
 * - prefix / mask: bài đổi qua lại prefix ↔ mask.
 */
export type DrillGiven =
  | { kind: 'ipPrefix'; ip: string; prefix: number }
  | { kind: 'requiredHosts'; requiredHosts: number }
  | { kind: 'prefix'; prefix: number }
  | { kind: 'mask'; mask: string }

/**
 * Lời giải theo quy tắc magic number cho 3 loại bài "tìm block"
 * (network-addr, broadcast, host-range) — cả ba đi chung một mạch nhẩm:
 * tìm octet đáng chú ý → magic number → block chứa IP → đọc ra network,
 * broadcast, dải host. UI tô đậm dòng ứng với câu đang hỏi (tầng 3 của
 * phản hồi — chỉ hiện sau 3 lần sai, nguyên tắc 4).
 */
export interface BlockSolution {
  kind: 'block'
  prefix: number
  mask: string
  magicNumber: number
  /** Octet (1-4) nơi ranh giới mạng cắt ngang — chỗ áp magic number. */
  interestingOctet: number
  /** Giá trị octet đáng chú ý của IP trong đề. */
  ipOctetValue: number
  /** Block bội-của-magic-number chứa IP, tính trong octet đáng chú ý. */
  blockStart: number
  blockEnd: number
  network: string
  broadcast: string
  firstHost: string
  lastHost: string
}

/** Lời giải bài đếm host: từ số bit host suy ra tổng địa chỉ rồi trừ 2. */
export interface HostCountSolution {
  kind: 'host-count'
  prefix: number
  hostBits: number
  totalAddresses: number
  usableHosts: number
}

/** Lời giải bài chọn prefix cho N host: lũy thừa 2 nhỏ nhất đủ chứa N+2. */
export interface PrefixForHostsSolution {
  kind: 'prefix-for-hosts'
  requiredHosts: number
  hostBits: number
  totalAddresses: number
  usableHosts: number
  prefix: number
  mask: string
}

/** Lời giải đổi prefix ↔ mask: đếm octet 255 trọn + octet dở dang. */
export interface MaskConvertSolution {
  kind: 'mask-convert'
  prefix: number
  mask: string
  /** Số octet 255 trọn vẹn (prefix div 8). */
  fullOctets: number
  /** Số bit lẻ trong octet dở dang (prefix mod 8). */
  remainderBits: number
  /** Giá trị octet dở dang = 256 - magic number; null khi mask toàn octet trọn. */
  partialOctetValue: number | null
  magicNumber: number
}

export type DrillSolution =
  | BlockSolution
  | HostCountSolution
  | PrefixForHostsSolution
  | MaskConvertSolution

export interface DrillProblem {
  id: string
  type: DrillProblemType
  given: DrillGiven
  answerKind: 'ip' | 'ipRange' | 'count' | 'prefix' | 'mask'
  /** Đáp án chuẩn tắc: ipRange dạng "first-last", prefix dạng "23" (không "/"). */
  answer: string
  solution: DrillSolution
}

// ---------------------------------------------------------------
// Sinh đề
// ---------------------------------------------------------------

/** Integer in [min, max], both inclusive. Requires rng() in [0, 1). */
function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

// IP sinh trong 3 dải private RFC 1918 — người học gặp đúng loại địa chỉ
// nhìn thấy trong mạng LAN thật (spec Module 3: private/public là nội dung
// của chính module này).
function randomPrivateIpInt(rng: Rng): number {
  const range = randInt(rng, 0, 2)
  if (range === 0) {
    return ipToInt(`10.${randInt(rng, 0, 255)}.${randInt(rng, 0, 255)}.${randInt(rng, 0, 255)}`)
  }
  if (range === 1) {
    return ipToInt(`172.${randInt(rng, 16, 31)}.${randInt(rng, 0, 255)}.${randInt(rng, 0, 255)}`)
  }
  return ipToInt(`192.168.${randInt(rng, 0, 255)}.${randInt(rng, 0, 255)}`)
}

/**
 * Sinh cặp (ip, prefix) sao cho IP là host THẬT bên trong subnet — không
 * trùng network/broadcast, tức đề không bao giờ tự trả lời. Thay vì sinh
 * lại theo vòng lặp, đặt thẳng IP vào offset 1..size-2 tính từ network:
 * luôn kết thúc, vẫn deterministic theo rng. (prefix <= 30 → size >= 4.)
 */
function randomHostInSubnet(rng: Rng, prefixMin: number, prefixMax: number): { ip: string; prefix: number } {
  const prefix = randInt(rng, prefixMin, prefixMax)
  const network = networkAddress(intToIp(randomPrivateIpInt(rng)), prefix)
  const size = 2 ** (32 - prefix)
  const offset = randInt(rng, 1, size - 2)
  return { ip: intToIp(ipToInt(network) + offset), prefix }
}

/** 1-based octet accessor: octetAt('10.20.30.40', 3) === 30. */
function octetAt(ip: string, octet: number): number {
  return (ipToInt(ip) >>> ((4 - octet) * 8)) & 0xff
}

/**
 * Dựng dữ liệu lời giải magic number: octet đáng chú ý là octet đầu tiên
 * phía host (prefix chia hết cho 8 thì là octet ngay SAU phần mạng, block
 * phủ trọn octet 0..255); block = bội của magic number chứa giá trị octet
 * đó của IP → network/broadcast/dải host đọc ra ngay không cần đổi nhị phân.
 */
function buildBlockSolution(ip: string, prefix: number): BlockSolution {
  const magic = magicNumber(prefix)
  const interestingOctet = prefix % 8 === 0 ? prefix / 8 + 1 : Math.ceil(prefix / 8)
  const ipOctetValue = octetAt(ip, interestingOctet)
  const blockStart = magic === 256 ? 0 : Math.floor(ipOctetValue / magic) * magic
  return {
    kind: 'block',
    prefix,
    mask: prefixToMask(prefix),
    magicNumber: magic,
    interestingOctet,
    ipOctetValue,
    blockStart,
    blockEnd: Math.min(blockStart + magic - 1, 255),
    network: networkAddress(ip, prefix),
    broadcast: broadcastAddress(ip, prefix),
    firstHost: firstUsableHost(ip, prefix),
    lastHost: lastUsableHost(ip, prefix),
  }
}

/** Internal knobs so the session generator can steer difficulty per half. */
interface GenRanges {
  /** Prefix range for computation types (network-addr/broadcast/host-range/host-count). */
  prefixMin: number
  prefixMax: number
  /** Prefix range for mask-convert (wider by default: whole-octet masks included). */
  maskPrefixMin: number
  maskPrefixMax: number
  /** requiredHosts range for prefix-for-hosts. */
  hostsMin: number
  hostsMax: number
}

const DEFAULT_RANGES: GenRanges = {
  prefixMin: 17,
  prefixMax: 30,
  maskPrefixMin: 8,
  maskPrefixMax: 30,
  hostsMin: 2,
  hostsMax: 1000,
}

function generateWithRanges(rng: Rng, type: DrillProblemType, ranges: GenRanges): DrillProblem {
  switch (type) {
    case 'network-addr': {
      const { ip, prefix } = randomHostInSubnet(rng, ranges.prefixMin, ranges.prefixMax)
      const solution = buildBlockSolution(ip, prefix)
      return {
        id: `network-addr:${ip}/${prefix}`,
        type,
        given: { kind: 'ipPrefix', ip, prefix },
        answerKind: 'ip',
        answer: solution.network,
        solution,
      }
    }
    case 'broadcast': {
      const { ip, prefix } = randomHostInSubnet(rng, ranges.prefixMin, ranges.prefixMax)
      const solution = buildBlockSolution(ip, prefix)
      return {
        id: `broadcast:${ip}/${prefix}`,
        type,
        given: { kind: 'ipPrefix', ip, prefix },
        answerKind: 'ip',
        answer: solution.broadcast,
        solution,
      }
    }
    case 'host-range': {
      const { ip, prefix } = randomHostInSubnet(rng, ranges.prefixMin, ranges.prefixMax)
      const solution = buildBlockSolution(ip, prefix)
      return {
        id: `host-range:${ip}/${prefix}`,
        type,
        given: { kind: 'ipPrefix', ip, prefix },
        answerKind: 'ipRange',
        answer: `${solution.firstHost}-${solution.lastHost}`,
        solution,
      }
    }
    case 'host-count': {
      // Đề hỏi "mạng X/p có bao nhiêu host dùng được" — đưa thẳng địa chỉ
      // mạng làm dữ kiện cho cụ thể, thay vì hỏi suông "prefix /p".
      const prefix = randInt(rng, ranges.prefixMin, ranges.prefixMax)
      const network = networkAddress(intToIp(randomPrivateIpInt(rng)), prefix)
      const usableHosts = usableHostCount(prefix)
      return {
        id: `host-count:${network}/${prefix}`,
        type,
        given: { kind: 'ipPrefix', ip: network, prefix },
        answerKind: 'count',
        answer: String(usableHosts),
        solution: {
          kind: 'host-count',
          prefix,
          hostBits: 32 - prefix,
          totalAddresses: 2 ** (32 - prefix),
          usableHosts,
        },
      }
    }
    case 'prefix-for-hosts': {
      const requiredHosts = randInt(rng, ranges.hostsMin, ranges.hostsMax)
      const prefix = smallestPrefixForHosts(requiredHosts)
      const hostBits = 32 - prefix
      return {
        id: `prefix-for-hosts:${requiredHosts}`,
        type,
        given: { kind: 'requiredHosts', requiredHosts },
        answerKind: 'prefix',
        answer: String(prefix),
        solution: {
          kind: 'prefix-for-hosts',
          requiredHosts,
          hostBits,
          totalAddresses: 2 ** hostBits,
          usableHosts: 2 ** hostBits - 2,
          prefix,
          mask: prefixToMask(prefix),
        },
      }
    }
    case 'mask-convert': {
      const prefix = randInt(rng, ranges.maskPrefixMin, ranges.maskPrefixMax)
      const mask = prefixToMask(prefix)
      const toMask = rng() < 0.5 // random direction: prefix→mask or mask→prefix
      const remainderBits = prefix % 8
      const solution: MaskConvertSolution = {
        kind: 'mask-convert',
        prefix,
        mask,
        fullOctets: Math.floor(prefix / 8),
        remainderBits,
        partialOctetValue: remainderBits === 0 ? null : 256 - magicNumber(prefix),
        magicNumber: magicNumber(prefix),
      }
      if (toMask) {
        return {
          id: `mask-convert:p2m:${prefix}`,
          type,
          given: { kind: 'prefix', prefix },
          answerKind: 'mask',
          answer: mask,
          solution,
        }
      }
      return {
        id: `mask-convert:m2p:${mask}`,
        type,
        given: { kind: 'mask', mask },
        answerKind: 'prefix',
        answer: String(prefix),
        solution,
      }
    }
  }
}

/**
 * Sinh 1 bài lẻ. Dải mặc định theo spec Module 3: prefix 17..30 cho các
 * loại tính toán, 8..30 cho mask-convert, requiredHosts 2..1000.
 */
export function generateProblem(rng: Rng, type: DrillProblemType): DrillProblem {
  return generateWithRanges(rng, type, DEFAULT_RANGES)
}

// ---------------------------------------------------------------
// Phiên drill
// ---------------------------------------------------------------

const ALL_TYPES: readonly DrillProblemType[] = [
  'network-addr',
  'broadcast',
  'host-range',
  'host-count',
  'prefix-for-hosts',
  'mask-convert',
]

/** Fisher–Yates shuffle; pure — returns a new array. */
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
 * Interleaving (spec Module 3 + tinh thần 2.2): trộn đủ loại bài thay vì
 * luyện theo khối. Xáo cả 6 loại theo từng "vòng" để loại nào cũng xuất
 * hiện đều; nếu mép vòng làm 2 bài cùng loại đứng cạnh nhau thì hoán vị.
 */
function buildTypeSequence(rng: Rng, count: number): DrillProblemType[] {
  const seq: DrillProblemType[] = []
  while (seq.length < count) {
    const cycle = shuffled(rng, ALL_TYPES)
    const last = seq[seq.length - 1]
    if (last !== undefined && cycle[0] === last) {
      const first = cycle[0]!
      cycle[0] = cycle[1]!
      cycle[1] = first
    }
    seq.push(...cycle)
  }
  return seq.slice(0, count)
}

/**
 * Phiên drill hằng ngày (mặc định 10 bài). Độ khó tăng dần trong phiên
 * (desirable difficulty — spec Module 3):
 * - Nửa đầu: prefix 25..30 — block nằm ở octet 4, nhẩm gọn trong 1 octet.
 * - Nửa sau: prefix 17..24 — block dồn sang octet 3, khó hơn vì ranh giới
 *   mạng "nhảy" giữa octet. prefix-for-hosts đi cùng nhịp: nửa đầu số host
 *   nhỏ (2..126 → đáp án /25../30), nửa sau lớn (127..1000 → /22../24).
 * Deterministic hoàn toàn theo rng — cùng seed cho cùng phiên.
 */
export function generateDrillSession(rng: Rng, count = 10): DrillProblem[] {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error(`Invalid drill session size: ${count} (expected integer >= 1)`)
  }
  const easy: GenRanges = {
    prefixMin: 25,
    prefixMax: 30,
    maskPrefixMin: 25,
    maskPrefixMax: 30,
    hostsMin: 2,
    hostsMax: 126,
  }
  const hard: GenRanges = {
    prefixMin: 17,
    prefixMax: 24,
    maskPrefixMin: 17,
    maskPrefixMax: 24,
    hostsMin: 127,
    hostsMax: 1000,
  }
  const firstHalf = Math.ceil(count / 2)
  return buildTypeSequence(rng, count).map((type, i) => {
    const problem = generateWithRanges(rng, type, i < firstHalf ? easy : hard)
    // Prefix ids with the position so a session never carries duplicate ids
    // even if two problems happen to share the same givens.
    return { ...problem, id: `${i + 1}:${problem.id}` }
  })
}

// ---------------------------------------------------------------
// Chấm bài
// ---------------------------------------------------------------

/** Parse a learner-typed IPv4; returns null instead of throwing. */
function parseIpLoose(text: string): number | null {
  try {
    return ipToInt(text)
  } catch {
    return null
  }
}

/**
 * Chấm bao dung định dạng (tinh thần spec 4.4 — chỉ sai KIẾN THỨC mới
 * tính sai, không bắt lỗi cách gõ): trim, thường hóa chữ, chấp nhận octet
 * đệm số 0, prefix có/không dấu "/", range với "-", ",", hoặc dấu cách.
 * Không bao giờ throw với input rác — trả false để UI đếm 1 lần sai.
 */
export function gradeDrillAnswer(problem: DrillProblem, raw: string): boolean {
  const text = raw.trim().toLowerCase()
  if (text === '') return false

  switch (problem.answerKind) {
    case 'ip': {
      // "192.168.1.128/26" — thói quen ghi kèm CIDR rất phổ biến và kiến
      // thức hoàn toàn đúng, nên chấp nhận KHI phần prefix khớp đúng đề;
      // prefix lệch đề là sai kiến thức → false.
      let body = text
      const slash = text.indexOf('/')
      if (slash !== -1) {
        if (problem.given.kind !== 'ipPrefix') return false
        const suffix = text.slice(slash + 1).trim()
        if (!/^\d{1,2}$/.test(suffix) || Number(suffix) !== problem.given.prefix) return false
        body = text.slice(0, slash).trim()
      }
      const got = parseIpLoose(body)
      return got !== null && got === ipToInt(problem.answer)
    }
    case 'mask': {
      const got = parseIpLoose(text)
      return got !== null && got === ipToInt(problem.answer)
    }
    case 'prefix': {
      const body = (text.startsWith('/') ? text.slice(1) : text).trim()
      if (!/^\d{1,2}$/.test(body)) return false
      return Number(body) === Number(problem.answer)
    }
    case 'count': {
      // Dấu phân tách hàng nghìn ("1.022", "1,022", "1 022") là cách gõ,
      // không phải kiến thức — strip CHỈ khi khớp đúng mẫu nhóm-3-chữ-số
      // để không nuốt nhầm số viết kiểu khác.
      const grouped = /^\d{1,3}([.,\s]\d{3})+$/.test(text) ? text.replace(/[.,\s]/g, '') : text
      if (!/^\d+$/.test(grouped)) return false
      return Number(grouped) === Number(problem.answer)
    }
    case 'ipRange': {
      // Accept "a - b", "a-b", "a, b", "a b" (en dash included); the two
      // IPs must come in first→last order.
      const tokens = text.split(/[\s,–-]+/).filter((t) => t !== '')
      if (tokens.length !== 2) return false
      const first = parseIpLoose(tokens[0]!)
      const last = parseIpLoose(tokens[1]!)
      if (first === null || last === null) return false
      const [wantFirst, wantLast] = problem.answer.split('-')
      if (wantFirst === undefined || wantLast === undefined) return false
      return first === ipToInt(wantFirst) && last === ipToInt(wantLast)
    }
  }
}

// ---------------------------------------------------------------
// Thống kê phiên
// ---------------------------------------------------------------

/**
 * Gom kết quả một phiên thành DrillResult — dữ liệu nguồn cho biểu đồ
 * "theo dõi tốc độ tiến bộ" (spec Module 3). Thời gian từng câu do UI đo
 * (đồng hồ đếm); engine không tự đọc đồng hồ, ngày do store đưa vào.
 */
export function sessionStats(
  outcomes: { correct: boolean; seconds: number }[],
  date: ISODate,
): DrillResult {
  if (outcomes.length === 0) {
    throw new Error('sessionStats: outcomes must not be empty')
  }
  // addDays(date, 0) reuses dates.ts validation — throws on malformed dates.
  const validDate = addDays(date, 0)
  let correct = 0
  let totalSeconds = 0
  for (const o of outcomes) {
    if (!Number.isFinite(o.seconds) || o.seconds < 0) {
      throw new Error(`sessionStats: invalid seconds value: ${o.seconds}`)
    }
    if (o.correct) correct++
    totalSeconds += o.seconds
  }
  return {
    date: validDate,
    correct,
    total: outcomes.length,
    // Round to 1 decimal — enough resolution for the progress chart.
    avgSeconds: Math.round((totalSeconds / outcomes.length) * 10) / 10,
  }
}
