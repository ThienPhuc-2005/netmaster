// Drill VLSM — khối 14.1.
//
// Ba lời hứa được khóa ở đây:
//   1. Chấm THIẾT KẾ, không so lời giải mẫu: mọi cách cắt qua được ba
//      tiêu chí đều được công nhận, kể cả cách cắt không giống bài mẫu.
//   2. Ba tiêu chí tách bạch — hỏng cái nào nói đúng cái đó, và lời phê
//      chỉ ra CHỖ SAI chứ không đọc hộ đáp án.
//   3. Đề sinh ra luôn có lời giải vừa khít (không phí đất), tất định
//      theo seed.

import { describe, expect, it } from 'vitest'
import { mulberry32 } from './drill'
import {
  gradeVlsm,
  generateVlsmProblem,
  generateVlsmSession,
  solveVlsm,
  type VlsmAssignment,
  type VlsmProblem,
} from './vlsm'
import { smallestPrefixForHosts, usableHostCount } from './ipv4'

/** Đề tay: dải /24, ba phòng 60/25/10 máy — đúng ví dụ trong spec. */
const PROBLEM: VlsmProblem = {
  id: 'vlsm-tay',
  base: { ip: '192.168.10.0', prefix: 24 },
  needs: [
    { id: 'ke-toan', hosts: 25 },
    { id: 'kinh-doanh', hosts: 60 },
    { id: 'giam-doc', hosts: 10 },
  ],
}

/** Lời giải sách vở: to trước, xếp liền nhau. */
const TEXTBOOK: VlsmAssignment[] = [
  { needId: 'kinh-doanh', ip: '192.168.10.0', prefix: 26 },
  { needId: 'ke-toan', ip: '192.168.10.64', prefix: 27 },
  { needId: 'giam-doc', ip: '192.168.10.96', prefix: 28 },
]

describe('chấm thiết kế, không so lời giải mẫu', () => {
  it('lời giải sách vở đạt trọn ba tiêu chí', () => {
    const evaluation = gradeVlsm(PROBLEM, TEXTBOOK)
    expect(evaluation.passed).toBe(true)
    expect(evaluation.criteria).toEqual({ correct: true, complete: true, noWaste: true })
    expect(evaluation.lines.every((l) => l.ok)).toBe(true)
  })

  it('cắt theo THỨ TỰ KHÁC, chừa cả khoảng trống ở giữa — vẫn đạt', () => {
    // Chừa đất để dành là việc bình thường của người thiết kế mạng: cái
    // bị bắt là chồng lấn và cấp thừa cỡ, không phải khoảng trống.
    const khac: VlsmAssignment[] = [
      { needId: 'giam-doc', ip: '192.168.10.0', prefix: 28 },
      { needId: 'ke-toan', ip: '192.168.10.32', prefix: 27 },
      { needId: 'kinh-doanh', ip: '192.168.10.192', prefix: 26 },
    ]
    expect(gradeVlsm(PROBLEM, khac).passed).toBe(true)
  })

  it('thứ tự dòng chấm bám THỨ TỰ ĐỀ BÀI, không bám thứ tự người học nộp', () => {
    const evaluation = gradeVlsm(PROBLEM, TEXTBOOK)
    expect(evaluation.lines.map((l) => l.need.id)).toEqual(['ke-toan', 'kinh-doanh', 'giam-doc'])
  })
})

describe('ba tiêu chí tách bạch', () => {
  it('khối quá nhỏ: hỏng tiêu chí ĐÚNG, nói rõ dòng nào', () => {
    const answer = TEXTBOOK.map((a) => (a.needId === 'kinh-doanh' ? { ...a, prefix: 27 } : a))
    const evaluation = gradeVlsm(PROBLEM, answer)
    expect(evaluation.criteria.correct).toBe(false)
    expect(evaluation.lines.find((l) => l.need.id === 'kinh-doanh')!.issues).toContain('too-small')
    // Hai phòng còn lại không bị vạ lây.
    expect(evaluation.lines.find((l) => l.need.id === 'giam-doc')!.ok).toBe(true)
  })

  it('chia đều mỗi phòng một /26: ĐÚNG nhưng PHÍ ĐẤT — chính thói quen VLSM sinh ra để chữa', () => {
    const deu: VlsmAssignment[] = [
      { needId: 'kinh-doanh', ip: '192.168.10.0', prefix: 26 },
      { needId: 'ke-toan', ip: '192.168.10.64', prefix: 26 },
      { needId: 'giam-doc', ip: '192.168.10.128', prefix: 26 },
    ]
    const evaluation = gradeVlsm(PROBLEM, deu)
    expect(evaluation.criteria.correct).toBe(true)
    expect(evaluation.criteria.noWaste).toBe(false)
    expect(evaluation.passed).toBe(false)
    expect(evaluation.lines.find((l) => l.need.id === 'ke-toan')!.issues).toEqual(['wasteful'])
  })

  it('hai khối giẫm lên nhau: CẢ HAI dòng bị nêu', () => {
    const chongLan: VlsmAssignment[] = [
      { needId: 'kinh-doanh', ip: '192.168.10.0', prefix: 26 },
      { needId: 'ke-toan', ip: '192.168.10.32', prefix: 27 },
      { needId: 'giam-doc', ip: '192.168.10.96', prefix: 28 },
    ]
    const evaluation = gradeVlsm(PROBLEM, chongLan)
    expect(evaluation.criteria.correct).toBe(false)
    expect(evaluation.lines.find((l) => l.need.id === 'kinh-doanh')!.issues).toContain('overlaps')
    expect(evaluation.lines.find((l) => l.need.id === 'ke-toan')!.issues).toContain('overlaps')
  })

  it('khối ra ngoài dải mẹ, và địa chỉ lệch ranh giới — hai lỗi khác nhau', () => {
    const evaluation = gradeVlsm(PROBLEM, [
      { needId: 'kinh-doanh', ip: '192.168.11.0', prefix: 26 },
      { needId: 'ke-toan', ip: '192.168.10.70', prefix: 27 },
      { needId: 'giam-doc', ip: '192.168.10.96', prefix: 28 },
    ])
    expect(evaluation.lines.find((l) => l.need.id === 'kinh-doanh')!.issues).toContain('outside-base')
    expect(evaluation.lines.find((l) => l.need.id === 'ke-toan')!.issues).toContain('not-network-address')
    expect(evaluation.criteria.correct).toBe(false)
  })

  it('bỏ trống một phòng: hỏng tiêu chí ĐỦ, hai phòng kia vẫn được ghi nhận', () => {
    const evaluation = gradeVlsm(PROBLEM, TEXTBOOK.filter((a) => a.needId !== 'giam-doc'))
    expect(evaluation.criteria).toEqual({ correct: true, complete: false, noWaste: true })
    expect(evaluation.lines.find((l) => l.need.id === 'giam-doc')!.issues).toEqual(['missing'])
    expect(evaluation.lines.find((l) => l.need.id === 'ke-toan')!.ok).toBe(true)
  })

  it('địa chỉ gõ sai hẳn: báo "không đọc được", không ném lỗi', () => {
    const evaluation = gradeVlsm(PROBLEM, [
      { needId: 'kinh-doanh', ip: '192.168.10.999', prefix: 26 },
      { needId: 'ke-toan', ip: '192.168.10.64', prefix: 27 },
      { needId: 'giam-doc', ip: '192.168.10.96', prefix: 99 },
    ])
    expect(evaluation.lines.find((l) => l.need.id === 'kinh-doanh')!.issues).toEqual(['invalid'])
    expect(evaluation.lines.find((l) => l.need.id === 'giam-doc')!.issues).toEqual(['invalid'])
    expect(evaluation.criteria.correct).toBe(false)
  })

  it('khối cấp cho phòng không có trong đề là lỗi tầng UI, không phải người học sai', () => {
    const evaluation = gradeVlsm(PROBLEM, [...TEXTBOOK, { needId: 'phong-ma', ip: '192.168.10.128', prefix: 28 }])
    expect(evaluation.unknownNeedIds).toEqual(['phong-ma'])
    expect(evaluation.passed).toBe(false)
  })
})

describe('lời giải tham chiếu', () => {
  it('cắt to trước, xếp liền nhau, và tự nó phải đạt', () => {
    const solution = solveVlsm(PROBLEM)!
    expect(solution.map((a) => a.needId)).toEqual(['ke-toan', 'kinh-doanh', 'giam-doc'])
    expect(solution.find((a) => a.needId === 'kinh-doanh')).toEqual({
      needId: 'kinh-doanh',
      ip: '192.168.10.0',
      prefix: 26,
    })
    expect(gradeVlsm(PROBLEM, solution).passed).toBe(true)
  })

  it('dải mẹ không đủ chỗ thì trả null thay vì cắt bừa', () => {
    const chat: VlsmProblem = {
      id: 'chat',
      base: { ip: '192.168.10.0', prefix: 28 },
      needs: [
        { id: 'a', hosts: 10 },
        { id: 'b', hosts: 10 },
      ],
    }
    expect(solveVlsm(chat)).toBeNull()
  })
})

describe('sinh đề', () => {
  it('cùng seed ra cùng đề; seed khác ra đề khác', () => {
    expect(generateVlsmProblem(mulberry32(7))).toEqual(generateVlsmProblem(mulberry32(7)))
    expect(generateVlsmProblem(mulberry32(7)).id).not.toBe(generateVlsmProblem(mulberry32(8)).id)
  })

  it('mọi đề sinh ra đều giải được VỪA KHÍT — nếu không thì tiêu chí "không phí đất" vô nghĩa', () => {
    for (let seed = 1; seed <= 60; seed++) {
      const problem = generateVlsmProblem(mulberry32(seed))
      const solution = solveVlsm(problem)
      expect(solution, `seed ${seed}: đề không cắt nổi`).not.toBeNull()
      const evaluation = gradeVlsm(problem, solution!)
      expect(evaluation.passed, `seed ${seed}: lời giải tham chiếu không đạt`).toBe(true)
      // Vừa khít nghĩa là mỗi khối đúng cỡ nhỏ nhất đủ dùng.
      for (const need of problem.needs) {
        const assignment = solution!.find((a) => a.needId === need.id)!
        expect(assignment.prefix).toBe(smallestPrefixForHosts(need.hosts))
      }
    }
  })

  it('mỗi phòng một cỡ khối khác nhau — ba phòng cùng cỡ thì đây là bài chia đều của Module 3', () => {
    for (let seed = 1; seed <= 30; seed++) {
      const problem = generateVlsmProblem(mulberry32(seed))
      const prefixes = problem.needs.map((n) => smallestPrefixForHosts(n.hosts))
      expect(new Set(prefixes).size, `seed ${seed}`).toBe(prefixes.length)
      expect(problem.needs.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('đề KHÔNG sắp sẵn từ lớn tới nhỏ — tự nhận ra thứ tự cắt là bài học của module', () => {
    // Không đòi đề nào cũng đảo, chỉ đòi phần lớn đề không nằm sẵn đúng
    // thứ tự (sắp sẵn hết thì bước "sắp xếp" bị làm hộ).
    let sortedDesc = 0
    for (let seed = 1; seed <= 30; seed++) {
      const needs = generateVlsmProblem(mulberry32(seed)).needs
      const isSorted = needs.every((n, i) => i === 0 || needs[i - 1]!.hosts >= n.hosts)
      if (isSorted) sortedDesc++
    }
    expect(sortedDesc).toBeLessThan(15)
  })

  it('số máy của mỗi phòng nằm đúng trong khoảng của cỡ khối được chọn', () => {
    for (const problem of generateVlsmSession(mulberry32(3), 8)) {
      for (const need of problem.needs) {
        const prefix = smallestPrefixForHosts(need.hosts)
        expect(need.hosts).toBeLessThanOrEqual(usableHostCount(prefix))
        expect(need.hosts).toBeGreaterThan(usableHostCount(prefix + 1))
      }
    }
  })

  it('một phiên trả đúng số đề yêu cầu; cỡ phiên vô lý thì ném lỗi', () => {
    expect(generateVlsmSession(mulberry32(1)).length).toBe(5)
    expect(generateVlsmSession(mulberry32(1), 3).length).toBe(3)
    expect(() => generateVlsmSession(mulberry32(1), 0)).toThrow(/session size/)
  })
})
