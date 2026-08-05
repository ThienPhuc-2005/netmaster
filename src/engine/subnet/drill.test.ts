import { describe, expect, it } from 'vitest'
import {
  generateDrillSession,
  generateProblem,
  gradeDrillAnswer,
  mulberry32,
  sessionStats,
} from './drill'
import type { DrillProblem, DrillProblemType } from './drill'
import {
  broadcastAddress,
  ipToInt,
  magicNumber,
  maskToPrefix,
  networkAddress,
  smallestPrefixForHosts,
  usableHostCount,
} from './ipv4'

const ALL_TYPES: DrillProblemType[] = [
  'network-addr',
  'broadcast',
  'host-range',
  'host-count',
  'prefix-for-hosts',
  'mask-convert',
]

/** RFC 1918 membership check for generated addresses. */
function isPrivate(ip: string): boolean {
  const n = ipToInt(ip)
  return (
    n >>> 24 === 10 ||
    n >>> 20 === ipToInt('172.16.0.0') >>> 20 ||
    n >>> 16 === ipToInt('192.168.0.0') >>> 16
  )
}

/** Effective prefix of a problem, whichever way it is stated. */
function effectivePrefix(p: DrillProblem): number {
  switch (p.given.kind) {
    case 'ipPrefix':
      return p.given.prefix
    case 'prefix':
      return p.given.prefix
    case 'mask':
      return maskToPrefix(p.given.mask)
    case 'requiredHosts':
      return smallestPrefixForHosts(p.given.requiredHosts)
  }
}

/** Minimal problem for grader-format tests (grading reads answerKind,
 *  answer, and — for the CIDR-suffix tolerance — given). */
function fakeProblem(answerKind: DrillProblem['answerKind'], answer: string): DrillProblem {
  return {
    id: 'test',
    type: 'host-count',
    given: { kind: 'prefix', prefix: 24 },
    answerKind,
    answer,
    solution: { kind: 'host-count', prefix: 24, hostBits: 8, totalAddresses: 256, usableHosts: 254 },
  }
}

/** Bài "tìm block" thật (192.168.1.130/26) cho các test hậu tố CIDR. */
function blockProblem(): DrillProblem {
  return {
    id: 'test-cidr',
    type: 'network-addr',
    given: { kind: 'ipPrefix', ip: '192.168.1.130', prefix: 26 },
    answerKind: 'ip',
    answer: '192.168.1.128',
    solution: {
      kind: 'block',
      prefix: 26,
      mask: '255.255.255.192',
      magicNumber: 64,
      interestingOctet: 4,
      ipOctetValue: 130,
      blockStart: 128,
      blockEnd: 191,
      network: '192.168.1.128',
      broadcast: '192.168.1.191',
      firstHost: '192.168.1.129',
      lastHost: '192.168.1.190',
    },
  }
}

describe('mulberry32', () => {
  it('same seed yields the same sequence', () => {
    const a = mulberry32(42)
    const b = mulberry32(42)
    for (let i = 0; i < 100; i++) expect(a()).toBe(b())
  })

  it('different seeds diverge', () => {
    const a = mulberry32(1)
    const b = mulberry32(2)
    const seqA = Array.from({ length: 5 }, () => a())
    const seqB = Array.from({ length: 5 }, () => b())
    expect(seqA).not.toEqual(seqB)
  })

  it('outputs stay in [0, 1)', () => {
    const rng = mulberry32(7)
    for (let i = 0; i < 1000; i++) {
      const v = rng()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe('generateProblem — per-type correctness', () => {
  it('network-addr: answer is the network, prompt never self-answers', () => {
    const rng = mulberry32(11)
    for (let i = 0; i < 50; i++) {
      const p = generateProblem(rng, 'network-addr')
      if (p.given.kind !== 'ipPrefix') throw new Error('expected ipPrefix given')
      expect(p.answerKind).toBe('ip')
      expect(p.answer).toBe(networkAddress(p.given.ip, p.given.prefix))
      expect(p.given.ip).not.toBe(p.answer)
      expect(p.given.prefix).toBeGreaterThanOrEqual(17)
      expect(p.given.prefix).toBeLessThanOrEqual(30)
      expect(isPrivate(p.given.ip)).toBe(true)
    }
  })

  it('broadcast: answer is the broadcast, prompt never self-answers', () => {
    const rng = mulberry32(12)
    for (let i = 0; i < 50; i++) {
      const p = generateProblem(rng, 'broadcast')
      if (p.given.kind !== 'ipPrefix') throw new Error('expected ipPrefix given')
      expect(p.answerKind).toBe('ip')
      expect(p.answer).toBe(broadcastAddress(p.given.ip, p.given.prefix))
      expect(p.given.ip).not.toBe(p.answer)
    }
  })

  it('host-range: canonical answer is "first-last"', () => {
    const rng = mulberry32(13)
    const p = generateProblem(rng, 'host-range')
    if (p.given.kind !== 'ipPrefix') throw new Error('expected ipPrefix given')
    expect(p.answerKind).toBe('ipRange')
    const net = ipToInt(networkAddress(p.given.ip, p.given.prefix))
    const bc = ipToInt(broadcastAddress(p.given.ip, p.given.prefix))
    const [first, last] = p.answer.split('-')
    expect(ipToInt(first!)).toBe(net + 1)
    expect(ipToInt(last!)).toBe(bc - 1)
  })

  it('host-count: given ip is the network address itself, answer matches', () => {
    const rng = mulberry32(14)
    for (let i = 0; i < 30; i++) {
      const p = generateProblem(rng, 'host-count')
      if (p.given.kind !== 'ipPrefix') throw new Error('expected ipPrefix given')
      expect(p.answerKind).toBe('count')
      expect(p.given.ip).toBe(networkAddress(p.given.ip, p.given.prefix))
      expect(Number(p.answer)).toBe(usableHostCount(p.given.prefix))
    }
  })

  it('prefix-for-hosts: requiredHosts in 2..1000, answer from smallestPrefixForHosts', () => {
    const rng = mulberry32(15)
    for (let i = 0; i < 50; i++) {
      const p = generateProblem(rng, 'prefix-for-hosts')
      if (p.given.kind !== 'requiredHosts') throw new Error('expected requiredHosts given')
      expect(p.answerKind).toBe('prefix')
      expect(p.given.requiredHosts).toBeGreaterThanOrEqual(2)
      expect(p.given.requiredHosts).toBeLessThanOrEqual(1000)
      expect(Number(p.answer)).toBe(smallestPrefixForHosts(p.given.requiredHosts))
    }
  })

  it('mask-convert: both directions occur, prefix 8..30, answers consistent', () => {
    const rng = mulberry32(16)
    const kinds = new Set<string>()
    for (let i = 0; i < 60; i++) {
      const p = generateProblem(rng, 'mask-convert')
      kinds.add(p.given.kind)
      if (p.given.kind === 'prefix') {
        expect(p.answerKind).toBe('mask')
        expect(maskToPrefix(p.answer)).toBe(p.given.prefix)
        expect(p.given.prefix).toBeGreaterThanOrEqual(8)
        expect(p.given.prefix).toBeLessThanOrEqual(30)
      } else if (p.given.kind === 'mask') {
        expect(p.answerKind).toBe('prefix')
        expect(Number(p.answer)).toBe(maskToPrefix(p.given.mask))
      } else {
        throw new Error('expected prefix or mask given')
      }
    }
    expect(kinds).toEqual(new Set(['prefix', 'mask']))
  })

  it('block solutions carry consistent magic-number data', () => {
    const rng = mulberry32(17)
    for (const type of ['network-addr', 'broadcast', 'host-range'] as const) {
      for (let i = 0; i < 30; i++) {
        const p = generateProblem(rng, type)
        if (p.solution.kind !== 'block' || p.given.kind !== 'ipPrefix') {
          throw new Error('expected block solution with ipPrefix given')
        }
        const s = p.solution
        expect(s.magicNumber).toBe(magicNumber(s.prefix))
        expect(s.network).toBe(networkAddress(p.given.ip, s.prefix))
        expect(s.broadcast).toBe(broadcastAddress(p.given.ip, s.prefix))
        // The block must actually contain the IP's interesting octet.
        expect(s.ipOctetValue).toBeGreaterThanOrEqual(s.blockStart)
        expect(s.ipOctetValue).toBeLessThanOrEqual(s.blockEnd)
        // Block boundaries are magic-number multiples inside one octet.
        if (s.magicNumber < 256) expect(s.blockStart % s.magicNumber).toBe(0)
        expect(s.blockEnd - s.blockStart).toBe(s.magicNumber - 1)
        // Interesting octet: 3 for /17../23, 4 for /24../30.
        expect(s.interestingOctet).toBe(s.prefix >= 24 ? 4 : 3)
      }
    }
  })
})

describe('generateDrillSession', () => {
  it('same seed → identical sessions (deterministic)', () => {
    const a = generateDrillSession(mulberry32(123))
    const b = generateDrillSession(mulberry32(123))
    expect(b).toEqual(a)
    const c = generateDrillSession(mulberry32(124))
    expect(JSON.stringify(c)).not.toBe(JSON.stringify(a))
  })

  it('has 10 problems by default, honors custom count, rejects bad counts', () => {
    expect(generateDrillSession(mulberry32(1))).toHaveLength(10)
    expect(generateDrillSession(mulberry32(1), 4)).toHaveLength(4)
    expect(generateDrillSession(mulberry32(1), 1)).toHaveLength(1)
    expect(() => generateDrillSession(mulberry32(1), 0)).toThrow()
    expect(() => generateDrillSession(mulberry32(1), 2.5)).toThrow()
  })

  it('interleaves: all 6 types appear, no two neighbors share a type, ids unique', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const session = generateDrillSession(mulberry32(seed))
      expect(new Set(session.map((p) => p.type))).toEqual(new Set(ALL_TYPES))
      for (let i = 1; i < session.length; i++) {
        expect(session[i]!.type).not.toBe(session[i - 1]!.type)
      }
      expect(new Set(session.map((p) => p.id)).size).toBe(session.length)
    }
  })

  it('difficulty ramps: first half prefixes >= 25, second half <= 24', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const session = generateDrillSession(mulberry32(seed))
      session.forEach((p, i) => {
        const prefix = effectivePrefix(p)
        if (i < 5) {
          expect(prefix).toBeGreaterThanOrEqual(25)
          expect(prefix).toBeLessThanOrEqual(30)
        } else {
          expect(prefix).toBeGreaterThanOrEqual(17)
          expect(prefix).toBeLessThanOrEqual(24)
        }
      })
    }
  })

  it('self-consistency: the generator’s own answers grade as correct (many seeds)', () => {
    for (let seed = 1; seed <= 30; seed++) {
      for (const p of generateDrillSession(mulberry32(seed))) {
        expect(gradeDrillAnswer(p, p.answer)).toBe(true)
      }
    }
  })

  it('every generated IP sits in a private range', () => {
    for (let seed = 1; seed <= 10; seed++) {
      for (const p of generateDrillSession(mulberry32(seed))) {
        if (p.given.kind === 'ipPrefix') expect(isPrivate(p.given.ip)).toBe(true)
      }
    }
  })
})

describe('gradeDrillAnswer — tolerant formats', () => {
  it('ip: exact, padded, and spaced inputs', () => {
    const p = fakeProblem('ip', '192.168.1.5')
    expect(gradeDrillAnswer(p, '192.168.1.5')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.001.005')).toBe(true)
    expect(gradeDrillAnswer(p, '  192.168.1.5  ')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.1.6')).toBe(false)
    expect(gradeDrillAnswer(p, 'not an ip')).toBe(false)
    expect(gradeDrillAnswer(p, '')).toBe(false)
  })

  it('prefix: with or without slash', () => {
    const p = fakeProblem('prefix', '23')
    expect(gradeDrillAnswer(p, '23')).toBe(true)
    expect(gradeDrillAnswer(p, '/23')).toBe(true)
    expect(gradeDrillAnswer(p, ' /23 ')).toBe(true)
    expect(gradeDrillAnswer(p, '/ 23')).toBe(true)
    expect(gradeDrillAnswer(p, '24')).toBe(false)
    expect(gradeDrillAnswer(p, '/24')).toBe(false)
    expect(gradeDrillAnswer(p, 'abc')).toBe(false)
    expect(gradeDrillAnswer(p, '//23')).toBe(false)
  })

  it('count: plain integers', () => {
    const p = fakeProblem('count', '62')
    expect(gradeDrillAnswer(p, '62')).toBe(true)
    expect(gradeDrillAnswer(p, ' 62 ')).toBe(true)
    expect(gradeDrillAnswer(p, '062')).toBe(true)
    expect(gradeDrillAnswer(p, '63')).toBe(false)
    expect(gradeDrillAnswer(p, '62 hosts')).toBe(false)
    expect(gradeDrillAnswer(p, '-62')).toBe(false)
  })

  it('count: dấu phân tách hàng nghìn là cách gõ, không phải kiến thức', () => {
    const p = fakeProblem('count', '1022')
    expect(gradeDrillAnswer(p, '1022')).toBe(true)
    expect(gradeDrillAnswer(p, '1.022')).toBe(true)
    expect(gradeDrillAnswer(p, '1,022')).toBe(true)
    expect(gradeDrillAnswer(p, '1 022')).toBe(true)
    expect(gradeDrillAnswer(p, '1.023')).toBe(false) // sai số vẫn là sai
    expect(gradeDrillAnswer(p, '10.22')).toBe(false) // không phải nhóm-3-chữ-số
    expect(gradeDrillAnswer(p, '1.0224')).toBe(false)

    const big = fakeProblem('count', '32766')
    expect(gradeDrillAnswer(big, '32.766')).toBe(true)
    expect(gradeDrillAnswer(big, '32,766')).toBe(true)
  })

  it('ip: chấp nhận hậu tố CIDR khi prefix khớp đúng đề', () => {
    const p = blockProblem()
    expect(gradeDrillAnswer(p, '192.168.1.128/26')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.001.128/26')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.1.128 /26')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.1.128/24')).toBe(false) // prefix lệch đề = sai kiến thức
    expect(gradeDrillAnswer(p, '192.168.1.128/')).toBe(false)
    expect(gradeDrillAnswer(p, '192.168.1.129/26')).toBe(false) // IP sai thì suffix đúng cũng vô nghĩa

    // Đề không có dạng ip/prefix (given khác) → không có suffix nào hợp lệ.
    const noPrefix = fakeProblem('ip', '10.0.0.1')
    expect(gradeDrillAnswer(noPrefix, '10.0.0.1/24')).toBe(false)
    expect(gradeDrillAnswer(noPrefix, '10.0.0.1')).toBe(true)
  })

  it('ipRange: dash, comma, or space separated; order matters', () => {
    const p = fakeProblem('ipRange', '192.168.1.129-192.168.1.190')
    expect(gradeDrillAnswer(p, '192.168.1.129-192.168.1.190')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.1.129 - 192.168.1.190')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.1.129, 192.168.1.190')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.1.129 192.168.1.190')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.001.129 - 192.168.001.190')).toBe(true)
    expect(gradeDrillAnswer(p, '192.168.1.190-192.168.1.129')).toBe(false)
    expect(gradeDrillAnswer(p, '192.168.1.129')).toBe(false)
    expect(gradeDrillAnswer(p, '192.168.1.129-192.168.1.190-10.0.0.1')).toBe(false)
    expect(gradeDrillAnswer(p, 'x - y')).toBe(false)
  })

  it('mask: same leniency as ip answers', () => {
    const p = fakeProblem('mask', '255.255.255.192')
    expect(gradeDrillAnswer(p, '255.255.255.192')).toBe(true)
    expect(gradeDrillAnswer(p, ' 255.255.255.192 ')).toBe(true)
    expect(gradeDrillAnswer(p, '255.255.192.0')).toBe(false)
    expect(gradeDrillAnswer(p, 'ff.ff.ff.c0')).toBe(false)
  })

  it('never throws on garbage input', () => {
    for (const kind of ['ip', 'ipRange', 'count', 'prefix', 'mask'] as const) {
      const p = fakeProblem(kind, '10.0.0.1')
      for (const garbage of ['', '   ', '!!!', '1.2', 'a-b-c', '/x', '9'.repeat(50)]) {
        expect(() => gradeDrillAnswer(p, garbage)).not.toThrow()
        expect(gradeDrillAnswer(p, garbage)).toBe(false)
      }
    }
  })
})

describe('sessionStats', () => {
  it('counts correct answers and averages seconds to 1 decimal', () => {
    const result = sessionStats(
      [
        { correct: true, seconds: 10 },
        { correct: false, seconds: 15 },
        { correct: true, seconds: 12 },
      ],
      '2026-08-04',
    )
    expect(result).toEqual({ date: '2026-08-04', correct: 2, total: 3, avgSeconds: 12.3 })
  })

  it('rounds halves and thirds correctly', () => {
    expect(
      sessionStats(
        [
          { correct: true, seconds: 1 },
          { correct: true, seconds: 2 },
        ],
        '2026-08-04',
      ).avgSeconds,
    ).toBe(1.5)
    expect(
      sessionStats(
        [
          { correct: true, seconds: 1 },
          { correct: true, seconds: 2 },
          { correct: false, seconds: 2 },
        ],
        '2026-08-04',
      ).avgSeconds,
    ).toBe(1.7)
  })

  it('all-wrong session still reports zero correct', () => {
    const result = sessionStats([{ correct: false, seconds: 30 }], '2026-01-31')
    expect(result.correct).toBe(0)
    expect(result.total).toBe(1)
  })

  it('throws on empty outcomes', () => {
    expect(() => sessionStats([], '2026-08-04')).toThrow()
  })

  it('throws on malformed date or invalid seconds', () => {
    expect(() => sessionStats([{ correct: true, seconds: 5 }], '2026-13-01')).toThrow()
    expect(() => sessionStats([{ correct: true, seconds: 5 }], 'hôm nay')).toThrow()
    expect(() => sessionStats([{ correct: true, seconds: -1 }], '2026-08-04')).toThrow()
    expect(() => sessionStats([{ correct: true, seconds: Number.NaN }], '2026-08-04')).toThrow()
  })

  it('does not mutate its input', () => {
    const outcomes = [{ correct: true, seconds: 3 }]
    const snapshot = JSON.stringify(outcomes)
    sessionStats(outcomes, '2026-08-04')
    expect(JSON.stringify(outcomes)).toBe(snapshot)
  })
})
