// Cung điện ký ức trong NỘI DUNG bài học: schema cấp module.
//
// Luật quan trọng nhất được khóa ở đây là THỨ TỰ — phòng nào cũng phải
// được dẫn đi xem trước khi bị hỏi lại từ trí nhớ. Hỏi một phòng chưa
// từng dẫn qua không phải "đề khó", đó là bắt đoán mò và nó phá đúng cơ
// chế mà cung điện dựng lên.

import { describe, expect, it } from 'vitest'
import { palaceRoomsInLesson, parseModule, validateModules } from './contentSchema'
import { PALACE_FLOOR_1, makeModuleWithPalace, makeValidModule } from '../../tests/fixtures/moduleFixture'
import { clonePalace } from '../../tests/fixtures/palaceFixture'

/** Câu đi lại cung điện của bài 1 trong fixture (nằm ở bước Nhớ lại). */
function walkQuestionOf(mod: ReturnType<typeof makeModuleWithPalace>) {
  const lesson = mod.lessons.find((l) => l.id === 'bai-1')!
  return lesson.steps[4].questions.find((e) => e.question.kind === 'palace-walk')!
}

describe('module có cung điện thì parse được', () => {
  it('fixture Module-có-cung-điện hợp lệ', () => {
    const mod = parseModule(makeModuleWithPalace())
    expect(mod.palace?.rooms).toHaveLength(15)
  })

  it('câu đi lại cung điện là một câu hỏi bình thường trong bước Nhớ lại', () => {
    const mod = parseModule(makeModuleWithPalace())
    const exercise = walkQuestionOf(mod)
    expect(exercise.question.kind).toBe('palace-walk')
    expect(exercise.hint.vi.length).toBeGreaterThan(0)
    expect(exercise.solution.vi.length).toBeGreaterThan(0)
  })

  it('6 bước vẫn nguyên tuple, không thêm bước nào cho cung điện', () => {
    const mod = parseModule(makeModuleWithPalace())
    expect(mod.lessons[0]!.steps.map((s) => s.type)).toEqual([
      'hook',
      'pretest',
      'teach',
      'practice',
      'retrieval',
      'summary',
    ])
  })

  it('palaceRoomsInLesson kể đúng các phòng bài đó dẫn đi xem', () => {
    const mod = parseModule(makeModuleWithPalace())
    expect(palaceRoomsInLesson(mod.lessons[0]!)).toEqual(PALACE_FLOOR_1)
    expect(palaceRoomsInLesson(mod.lessons[1]!)).toEqual([])
  })
})

describe('đi xem trước, nhớ lại sau', () => {
  it('hỏi một phòng chưa từng dẫn qua thì bị chặn', () => {
    const mod = makeModuleWithPalace()
    const lesson = mod.lessons.find((l) => l.id === 'bai-1')!
    const walk = lesson.steps[4].questions.find((e) => e.question.kind === 'palace-walk')!
    if (walk.question.kind === 'palace-walk') walk.question.rooms = ['r-ssh']
    expect(() => parseModule(mod)).toThrow(/trước khi người học được dẫn qua/)
  })

  it('bài SAU được hỏi phòng mà bài TRƯỚC đã dẫn qua', () => {
    const mod = makeModuleWithPalace()
    const bai1 = mod.lessons.find((l) => l.id === 'bai-1')!
    const bai2 = mod.lessons.find((l) => l.id === 'bai-2')!
    const walk = bai1.steps[4].questions.pop()!
    bai2.steps[4].questions.push(walk)
    expect(() => parseModule(mod)).not.toThrow()
  })

  it('bài kiểm tra module được hỏi mọi phòng đã dẫn qua', () => {
    const mod = makeModuleWithPalace()
    mod.masteryTest.push({
      kind: 'palace-walk',
      id: 'mt-palace',
      prompt: { vi: 'Đi lại tầng 1 của tòa nhà từ trí nhớ.' },
      rooms: [...PALACE_FLOOR_1],
      explain: { vi: 'Tầng 1 là ba cánh cửa quen nhất: 80, 443 và 53.' },
    })
    expect(() => parseModule(mod)).not.toThrow()
  })

  it('dẫn đi xem mà không bao giờ hỏi lại thì bị chặn (nguyên tắc 1)', () => {
    const mod = makeModuleWithPalace()
    const lesson = mod.lessons.find((l) => l.id === 'bai-1')!
    lesson.steps[2].screens[0]!.palaceTour = [...PALACE_FLOOR_1, 'r-ssh']
    expect(() => parseModule(mod)).toThrow(/không câu hỏi nào bắt nhớ lại/)
  })

  it('khai cung điện mà không bài nào dẫn đi xem thì bị chặn', () => {
    const mod = makeValidModule()
    mod.palace = clonePalace()
    expect(() => parseModule(mod)).toThrow(/không bài nào dẫn người học đi xem/)
  })
})

describe('phòng phải có thật và chỉ dạy một lần', () => {
  it('màn dạy trỏ vào phòng không có trong tòa nhà', () => {
    const mod = makeModuleWithPalace()
    mod.lessons[0]!.steps[2].screens[0]!.palaceTour = ['phong-ma']
    expect(() => parseModule(mod)).toThrow(/không có trong cung điện/)
  })

  it('câu hỏi trỏ vào phòng không có trong tòa nhà', () => {
    const mod = makeModuleWithPalace()
    const walk = mod.lessons[0]!.steps[4].questions.at(-1)!
    if (walk.question.kind === 'palace-walk') walk.question.rooms = ['phong-ma']
    expect(() => parseModule(mod)).toThrow(/không có trong cung điện/)
  })

  it('một phòng bị dẫn đi xem ở hai bài khác nhau', () => {
    const mod = makeModuleWithPalace()
    mod.lessons[1]!.steps[2].screens[0]!.palaceTour = ['r-http']
    expect(() => parseModule(mod)).toThrow(/chỉ dạy một lần/)
  })

  it('câu hỏi liệt kê trùng phòng', () => {
    const mod = makeModuleWithPalace()
    const walk = mod.lessons[0]!.steps[4].questions.at(-1)!
    if (walk.question.kind === 'palace-walk') walk.question.rooms = ['r-http', 'r-http']
    expect(() => parseModule(mod)).toThrow(/trùng phòng/)
  })

  it('module không có cung điện mà bài lại đòi đi xem', () => {
    const mod = makeModuleWithPalace()
    delete mod.palace
    expect(() => parseModule(mod)).toThrow(/module không có cung điện/)
  })
})

describe('kiểm chéo giữa các module', () => {
  it('hai module không được dùng chung id phòng — thẻ ôn sẽ đè nhau', () => {
    const a = parseModule(makeModuleWithPalace())
    const b = parseModule({ ...makeModuleWithPalace(), id: 'module-2', order: 2 })
    expect(() => validateModules([a, b])).toThrow(/Phòng cung điện/)
  })
})
