// Pure IPv4 math for the subnetting drill (spec Module 3). No I/O, no
// clock, no display strings — only numbers, addresses and flags.
//
// All 32-bit arithmetic stays unsigned via `>>> 0`: JS bitwise operators
// otherwise yield signed int32, which would turn e.g. 200.1.2.3 into a
// negative number.

const OCTET_RE = /^\d{1,3}$/

/**
 * Parse a dotted-quad IPv4 string into an unsigned 32-bit integer.
 * Throws on anything that is not exactly 4 numeric octets in 0..255.
 * Leading zeros in an octet ("001") are accepted on purpose — the drill
 * grader reuses this parser to stay lenient about learner formatting.
 */
export function ipToInt(ip: string): number {
  const parts = ip.split('.')
  if (parts.length !== 4) {
    throw new Error(`Invalid IPv4 address: "${ip}" (expected 4 octets)`)
  }
  let n = 0
  for (const part of parts) {
    if (!OCTET_RE.test(part)) {
      throw new Error(`Invalid IPv4 address: "${ip}" (octet "${part}" is not numeric)`)
    }
    const value = Number(part)
    if (value > 255) {
      throw new Error(`Invalid IPv4 address: "${ip}" (octet ${value} out of 0-255)`)
    }
    n = ((n << 8) | value) >>> 0
  }
  return n
}

/** Format an unsigned 32-bit integer as dotted-quad; throws out of range. */
export function intToIp(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 0xffffffff) {
    throw new Error(`Invalid IPv4 integer: ${n} (expected 0..2^32-1)`)
  }
  return `${(n >>> 24) & 0xff}.${(n >>> 16) & 0xff}.${(n >>> 8) & 0xff}.${n & 0xff}`
}

function assertPrefix(prefix: number, min: number, max: number): void {
  if (!Number.isInteger(prefix) || prefix < min || prefix > max) {
    throw new Error(`Invalid prefix: /${prefix} (expected integer ${min}..${max})`)
  }
}

/** Mask as unsigned int. Prefix 0 is special-cased: `x << 32 === x` in JS. */
function maskInt(prefix: number): number {
  return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
}

export function prefixToMask(prefix: number): string {
  assertPrefix(prefix, 0, 32)
  return intToIp(maskInt(prefix))
}

/**
 * Dotted-quad mask → prefix length. A valid mask is 1-bits followed by
 * 0-bits; its complement must therefore be an all-ones suffix, checked
 * with `x & (x + 1) === 0`. Non-contiguous masks throw.
 */
export function maskToPrefix(mask: string): number {
  const m = ipToInt(mask)
  const inverted = ~m >>> 0
  if ((inverted & (inverted + 1)) !== 0) {
    throw new Error(`Invalid subnet mask: "${mask}" (bits are not contiguous)`)
  }
  let prefix = 0
  for (let bit = 31; bit >= 0; bit--) {
    if (((m >>> bit) & 1) === 0) break
    prefix++
  }
  return prefix
}

export function networkAddress(ip: string, prefix: number): string {
  assertPrefix(prefix, 0, 32)
  return intToIp((ipToInt(ip) & maskInt(prefix)) >>> 0)
}

export function broadcastAddress(ip: string, prefix: number): string {
  assertPrefix(prefix, 0, 32)
  return intToIp((ipToInt(ip) | (~maskInt(prefix) >>> 0)) >>> 0)
}

/** Network + 1. Only /0../30 — /31 and /32 have no conventional host range. */
export function firstUsableHost(ip: string, prefix: number): string {
  assertPrefix(prefix, 0, 30)
  return intToIp(ipToInt(networkAddress(ip, prefix)) + 1)
}

/** Broadcast - 1. Only /0../30, same rationale as firstUsableHost. */
export function lastUsableHost(ip: string, prefix: number): string {
  assertPrefix(prefix, 0, 30)
  return intToIp(ipToInt(broadcastAddress(ip, prefix)) - 1)
}

/**
 * 2^(32-p) - 2 (network + broadcast excluded). Only /0../30: /31 and /32
 * are edge conventions (point-to-point, loopback) outside the MVP drill
 * scope, so they throw instead of returning 0/-1 and confusing learners.
 */
export function usableHostCount(prefix: number): number {
  assertPrefix(prefix, 0, 30)
  return 2 ** (32 - prefix) - 2
}

/**
 * Quy tắc "magic number" để nhẩm subnet nhanh (spec Module 3 — chunking):
 * kích thước block trong octet "đáng chú ý" = 256 trừ giá trị octet đó
 * của mask. Prefix không chia hết cho 8 → 2^(8 - prefix % 8);
 * prefix chia hết cho 8 → 256 (block phủ trọn octet kế tiếp).
 */
export function magicNumber(prefix: number): number {
  assertPrefix(prefix, 0, 32)
  const remainder = prefix % 8
  return remainder === 0 ? 256 : 2 ** (8 - remainder)
}

/**
 * Largest prefix (= smallest network) whose usable host count still fits
 * `hosts`. Result is always in 0..30; throws when hosts < 1, not an
 * integer, or too large for any IPv4 network (> 2^32 - 2).
 */
export function smallestPrefixForHosts(hosts: number): number {
  if (!Number.isInteger(hosts) || hosts < 1) {
    throw new Error(`Invalid host count: ${hosts} (expected integer >= 1)`)
  }
  for (let prefix = 30; prefix >= 0; prefix--) {
    if (usableHostCount(prefix) >= hosts) return prefix
  }
  throw new Error(`No IPv4 prefix can hold ${hosts} usable hosts`)
}
