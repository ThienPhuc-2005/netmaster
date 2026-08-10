// Rút đề từ pool — ba lời hứa của phép đo, mỗi lời một test.
//
// rng bơm vào để mọi khẳng định ở đây là tất định: bốc thăm ngẫu nhiên
// mà test đi bằng Math.random thì test cũng chỉ là bốc thăm.

import { describe, expect, it } from 'vitest'
import { MASTERY_DRAW_COUNT, drawMasteryTest, isAnchorQuestion, masteryDrawCount } from './masteryPool'
import type { Question } from './contentSchema'
import { loadModules } from '../content'

/** Câu gõ tay tối giản — đủ để đếm và nhận dạng. */
function typed(id: string): Question {
  return { kind: 'typed', id, prompt: { vi: id }, accept: [id] }
}

/** rng quay vòng một dãy cố định — không dùng Math.random. */
function seededRng(seed: number): () => number {
  let state = seed
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648
    return state / 2147483648
  }
}

describe('rút đề thi từ pool', () => {
  const pool: Question[] = Array.from({ length: 12 }, (_, i) => typed(`q-${i + 1}`))

  it('mỗi lượt đúng MASTERY_DRAW_COUNT câu, không câu nào lặp lại trong một đề', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const drawn = drawMasteryTest(pool, { rng: seededRng(seed) })
      expect(drawn).toHaveLength(MASTERY_DRAW_COUNT)
      expect(new Set(drawn.map((q) => q.id)).size, 'đề không được hỏi trùng một câu hai lần').toBe(
        MASTERY_DRAW_COUNT,
      )
      for (const q of drawn) expect(pool).toContain(q)
    }
  })

  it('hai lượt thi khác nhau ra hai đề khác nhau (thi lại không phải đề cũ)', () => {
    // Đây chính là lý do tồn tại của cả file: rớt rồi thi lại mà gặp
    // nguyên đề vừa đọc ý cần ôn thì 85% chỉ còn đo trí nhớ về đề.
    const first = drawMasteryTest(pool, { rng: seededRng(7) }).map((q) => q.id)
    const seen = new Set<string>()
    for (let seed = 1; seed <= 20; seed++) {
      seen.add(drawMasteryTest(pool, { rng: seededRng(seed) }).map((q) => q.id).join(','))
    }
    expect(seen.size, 'hai mươi lượt rút mà chỉ ra một đề duy nhất').toBeGreaterThan(1)
    expect(first).toHaveLength(MASTERY_DRAW_COUNT)
  })

  it('pool nhỏ hơn cỡ đề thì hỏi trọn pool, không bịa thêm câu', () => {
    const small = pool.slice(0, 5)
    expect(masteryDrawCount(small)).toBe(5)
    expect(drawMasteryTest(small, { rng: seededRng(3) })).toHaveLength(5)
  })

  it('pool rỗng là lỗi lập trình, ném ra chứ không trả đề rỗng', () => {
    expect(() => drawMasteryTest([], { rng: seededRng(1) })).toThrow()
  })
})

describe('câu KẾT đề là câu trụ nặng nhất (peak-end)', () => {
  // Spec hứa "kết bằng ca bệnh liên tầng" cho M21 và nếp "câu chốt là câu
  // làm-thật" cho các module có anchor — xáo mù để ca tổng duyệt rơi vào
  // câu số 1 là phá nhịp lên-đỉnh-rồi-khép-màn (biên bản trung cấp).
  it('module có câu trụ: đề nào cũng kết bằng một câu trụ', () => {
    for (const m of loadModules()) {
      if (!m.masteryTest.some(isAnchorQuestion)) continue
      for (let seed = 1; seed <= 15; seed++) {
        const closing = drawMasteryTest(m.masteryTest, { rng: seededRng(seed) }).at(-1)!
        expect(isAnchorQuestion(closing), `${m.id}: đề rút seed ${seed} không kết bằng câu trụ`).toBe(true)
      }
    }
  })

  it('M21: ca bệnh liên tầng luôn là câu khép màn', () => {
    const m21 = loadModules().find((m) => m.id === 'module-21')
    expect(m21).toBeDefined()
    for (let seed = 1; seed <= 15; seed++) {
      expect(drawMasteryTest(m21!.masteryTest, { rng: seededRng(seed) }).at(-1)?.kind).toBe('clinic')
    }
  })
})

describe('câu TRỤ luôn có mặt trong mọi lượt thi', () => {
  // Lab (M4), cung điện (M5/M9), ca bệnh (M11), terminal (M12) LÀ kỹ năng
  // module đó dạy. Có lượt thi không hỏi tới chúng nghĩa là cổng mastery
  // có ngày không đo tới thứ quan trọng nhất (nguyên tắc 2).
  it('mọi module thật: đề nào cũng chứa đủ câu trụ của module', () => {
    for (const m of loadModules()) {
      const anchors = m.masteryTest.filter(isAnchorQuestion).map((q) => q.id)
      if (anchors.length === 0) continue
      for (let seed = 1; seed <= 15; seed++) {
        const drawnIds = new Set(drawMasteryTest(m.masteryTest, { rng: seededRng(seed) }).map((q) => q.id))
        for (const id of anchors) {
          expect(drawnIds.has(id), `${m.id}: lượt thi rút trượt câu trụ "${id}"`).toBe(true)
        }
      }
    }
  })

  it('module có cung điện: đề nào cũng phủ HẾT các phòng', () => {
    // Ba câu palace-walk của M5 hợp lại mới đủ 15 phòng — rút trượt một
    // câu là bỏ lọt cả một tầng qua cổng mastery.
    for (const m of loadModules()) {
      if (m.palace === undefined) continue
      for (let seed = 1; seed <= 15; seed++) {
        const drawn = drawMasteryTest(m.masteryTest, { rng: seededRng(seed) })
        const asked = new Set(drawn.flatMap((q) => (q.kind === 'palace-walk' ? q.rooms : [])))
        const missing = m.palace.rooms.filter((r) => !asked.has(r.id)).map((r) => r.id)
        expect(missing, `${m.id}: lượt thi bỏ sót phòng`).toEqual([])
      }
    }
  })
})
