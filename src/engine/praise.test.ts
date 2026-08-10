import { describe, expect, it } from 'vitest'
import { PRAISE_VARIANTS, praiseContext, praiseKey, praiseKeyFor, type PraiseContext } from './praise'

const base = { failCount: 0, usedSolution: false, step: 'practice', kind: 'mcq' } as const

describe('praiseContext — đọc ra HÀNH VI đằng sau một câu đúng', () => {
  it('đúng ngay lần đầu ở bước Thử tay là "first-try"', () => {
    expect(praiseContext({ ...base })).toBe('first-try')
  })

  it('đúng ngay lần đầu ở bước Nhớ lại là "retrieval" — nhớ khi bài đã đóng khác với làm khi bài còn mở', () => {
    expect(praiseContext({ ...base, step: 'retrieval' })).toBe('retrieval')
  })

  it('câu dạng tay chân được khen theo đúng nghề của nó', () => {
    expect(praiseContext({ ...base, kind: 'lab' })).toBe('hands-lab')
    expect(praiseContext({ ...base, kind: 'cli' })).toBe('hands-cli')
    expect(praiseContext({ ...base, kind: 'ps' })).toBe('hands-ps')
    expect(praiseContext({ ...base, kind: 'palace-walk' })).toBe('hands-palace')
    expect(praiseContext({ ...base, kind: 'clinic' })).toBe('hands-clinic')
  })

  it('sai rồi tự sửa được thắng cả lời khen tay chân — nếp khó hơn được khen trước', () => {
    expect(praiseContext({ ...base, kind: 'lab', failCount: 2 })).toBe('self-corrected')
  })

  it('phải mở lời giải rồi tự gõ lại thì khen ĐÚNG việc gõ lại, không im lặng', () => {
    // Đây là ca dễ bị khen sai nhất: người học vừa xem đáp án, khen
    // "đúng ngay" là nói dối, mà không khen gì thì mất luôn cơ hội khen
    // đúng thứ đáng khen (generation effect).
    expect(praiseContext({ ...base, failCount: 4, usedSolution: true })).toBe('after-solution')
  })

  it('failCount không hợp lệ là lỗi lập trình, ném ngay', () => {
    expect(() => praiseContext({ ...base, failCount: -1 })).toThrow()
    expect(() => praiseContext({ ...base, failCount: 1.5 })).toThrow()
  })
})

describe('praiseKey — xoay câu khen, tất định', () => {
  it('cùng ngữ cảnh nhưng khác lượt thì khác câu', () => {
    const keys = new Set([0, 1, 2, 3].map((seed) => praiseKey('first-try', seed)))
    expect(keys.size).toBe(PRAISE_VARIANTS['first-try'])
  })

  it('cùng hạt giống thì luôn ra cùng một câu', () => {
    expect(praiseKey('retrieval', 7)).toBe(praiseKey('retrieval', 7))
  })

  it('hạt giống lạ (âm, lẻ, vô hạn) vẫn ra key hợp lệ — không bao giờ để lộ key trần', () => {
    for (const seed of [-3, 2.7, Number.POSITIVE_INFINITY, Number.NaN]) {
      const key = praiseKey('self-corrected', seed)
      const index = Number(key.split('.').at(-1))
      expect(Number.isInteger(index)).toBe(true)
      expect(index).toBeGreaterThanOrEqual(0)
      expect(index).toBeLessThan(PRAISE_VARIANTS['self-corrected'])
    }
  })

  it('praiseKeyFor đi thẳng từ dấu vết ra key', () => {
    expect(praiseKeyFor({ ...base, kind: 'cli' }, 1)).toBe('praise.hands-cli.1')
  })

  it('mỗi ngữ cảnh có ít nhất 3 câu — kho khen mà chỉ một câu thì lại lặp như cũ', () => {
    for (const [context, count] of Object.entries(PRAISE_VARIANTS) as [PraiseContext, number][]) {
      expect(count, `ngữ cảnh "${context}"`).toBeGreaterThanOrEqual(3)
    }
  })
})
