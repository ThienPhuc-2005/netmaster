import { describe, expect, it } from 'vitest'
import {
  SUPPORT_COOLDOWN_ANSWERS,
  canDeriveOpen,
  deriveOpenQuestion,
  flowMode,
  foundationConceptIds,
  needsSupport,
  openAcceptsOf,
} from './flow'
import { gradeQuestion } from './grading/gradeQuestion'
import type { AnswerRecord } from './types'
import type { McqQuestion } from './contentSchema'
import { makeValidModule } from '../../tests/fixtures/moduleFixture'

/** Cửa sổ n câu với k câu đúng — đúng dồn về đầu, thứ tự không quan trọng. */
function window(k: number, n: number): AnswerRecord[] {
  return Array.from({ length: n }, (_, i) => ({ correct: i < k, at: i }))
}

const mcq: McqQuestion = {
  kind: 'mcq',
  id: 'q1',
  prompt: { vi: 'Thiết bị nào đóng vai "bưu tá"?' },
  choices: [{ vi: 'Router' }, { vi: 'Màn hình' }, { vi: 'Ổ cứng' }],
  answerIndex: 0,
  hintTopic: { vi: 'ai đọc địa chỉ trên phong bì' },
  explain: { vi: 'Router đọc địa chỉ đích rồi chuyển tiếp.' },
}

describe('flowMode — ngưỡng của spec 2.3, nghĩa đen', () => {
  it('cửa sổ chưa đầy 10 câu thì luôn steady — kể cả 5/5 hay 0/5', () => {
    expect(flowMode([])).toBe('steady')
    expect(flowMode(window(5, 5))).toBe('steady')
    expect(flowMode(window(0, 9))).toBe('steady')
  })

  it('> 90% mới harder: 10/10 lên, 9/10 (đúng 90%) thì chưa', () => {
    expect(flowMode(window(10, 10))).toBe('harder')
    expect(flowMode(window(9, 10))).toBe('steady')
  })

  it('< 60% mới support: 5/10 xuống, 6/10 (đúng 60%) thì chưa', () => {
    expect(flowMode(window(5, 10))).toBe('support')
    expect(flowMode(window(6, 10))).toBe('steady')
  })

  it('vùng flow 70-85 nằm gọn trong steady — không đụng vào gì', () => {
    expect(flowMode(window(7, 10))).toBe('steady')
    expect(flowMode(window(8, 10))).toBe('steady')
  })
})

describe('trắc nghiệm → câu hỏi mở (suy cơ học)', () => {
  it('bản gõ tay giữ nguyên id, đề, gợi ý; đáp án là chữ lựa chọn đúng', () => {
    const open = deriveOpenQuestion(mcq)
    expect(open).toMatchObject({
      kind: 'typed',
      id: 'q1',
      prompt: mcq.prompt,
      accept: ['Router'],
      hintTopic: mcq.hintTopic,
      explain: mcq.explain,
    })
  })

  it('bản gõ tay chấm được qua đúng bộ chấm typed, nhân nhượng dấu', () => {
    const open = deriveOpenQuestion(mcq)
    expect(gradeQuestion(open, { kind: 'typed', text: 'router' })).toBe(true)
    expect(gradeQuestion(open, { kind: 'typed', text: 'là router' })).toBe(true)
    expect(gradeQuestion(open, { kind: 'typed', text: 'ổ cứng' })).toBe(false)
  })

  it('lựa chọn đúng là cả một mệnh đề dài thì KHÔNG suy — giữ trắc nghiệm', () => {
    const longMcq: McqQuestion = {
      ...mcq,
      id: 'q2',
      choices: [{ vi: 'Đưa bạn tới một trang web: tra tên miền rồi mở trang' }, { vi: 'B' }],
      answerIndex: 0,
    }
    expect(canDeriveOpen(longMcq)).toBe(false)
    expect(() => deriveOpenQuestion(longMcq)).toThrow(/canDeriveOpen/)
  })

  it('có bản dịch en thì bản gõ tay nhận cả hai thứ tiếng', () => {
    const bilingual: McqQuestion = {
      ...mcq,
      id: 'q3',
      choices: [{ vi: 'Bộ định tuyến', en: 'Router' }, { vi: 'Màn hình' }],
      answerIndex: 0,
    }
    expect(openAcceptsOf(bilingual)).toEqual(['Bộ định tuyến', 'Router'])
  })
})

describe('foundationConceptIds — nền của bài sắp học', () => {
  const mod = makeValidModule() // bài 1 dạy [goi-tin, dia-chi-ip], bài 2 [port], bài 3 [router], bài 4 [giao-thuc]

  it('bài giữa module: khái niệm các bài trước, GẦN NHẤT TRƯỚC', () => {
    const bai3 = mod.lessons.find((l) => l.id === 'bai-3')!
    expect(foundationConceptIds(mod, bai3, null)).toEqual(['port', 'goi-tin', 'dia-chi-ip'])
  })

  it('bài đầu module: mượn toàn bộ nền của module liền trước', () => {
    const prev = makeValidModule()
    const bai1 = mod.lessons.find((l) => l.id === 'bai-1')!
    expect(foundationConceptIds(mod, bai1, prev)).toEqual(['giao-thuc', 'router', 'port', 'goi-tin', 'dia-chi-ip'])
  })

  it('bài đầu module mà không có module trước (Module 1) thì nền rỗng', () => {
    const bai1 = mod.lessons.find((l) => l.id === 'bai-1')!
    expect(foundationConceptIds(mod, bai1, null)).toEqual([])
  })
})

describe('needsSupport — thời gian nguội', () => {
  const weak = window(4, 10) // 40% — support
  const strong = window(9, 10)

  it('lần đầu tụt dưới 60% thì chèn ngay', () => {
    expect(needsSupport(weak, 12, null)).toBe(true)
  })

  it('vừa củng cố xong thì KHÔNG chèn lại — dù điểm vẫn thấp', () => {
    expect(needsSupport(weak, 12, 12)).toBe(false)
    expect(needsSupport(weak, 12 + SUPPORT_COOLDOWN_ANSWERS - 1, 12)).toBe(false)
  })

  it('đủ số câu mới kể từ phiên trước thì được chèn tiếp', () => {
    expect(needsSupport(weak, 12 + SUPPORT_COOLDOWN_ANSWERS, 12)).toBe(true)
  })

  it('điểm không thấp thì không bao giờ chèn, kể cả hết thời gian nguội', () => {
    expect(needsSupport(strong, 100, 12)).toBe(false)
    expect(needsSupport(window(7, 10), 100, null)).toBe(false)
  })
})
