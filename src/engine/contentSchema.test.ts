// Test cho contentSchema — chốt chặn dữ liệu của các ràng buộc SƯ PHẠM:
// mỗi ca lấy module hợp lệ từ fixture, phá đúng 1 chỗ, rồi khẳng định
// schema chặn lại và (với các ca chính) lỗi trỏ đúng vị trí.

import { describe, expect, it } from 'vitest'
import type { ZodError } from 'zod'
import {
  ModuleSchema,
  conceptIdsInLesson,
  orderedLessonIds,
  parseModule,
  validateModules,
} from './contentSchema'
import { makeLesson, makeValidModule } from '../../tests/fixtures/moduleFixture'

// ---------------------------------------------------------------
// Helpers (technical)
// ---------------------------------------------------------------

/**
 * Loosely-typed valid module for mutation-based tests. The builder
 * already returns a fresh object graph per call, so no structuredClone
 * is needed before mutating.
 */
function looseModule(): any {
  return makeValidModule()
}

/** JSON round-trip deep clone — fixture data is plain JSON; avoids
 *  structuredClone, which the pure-ES2022 tsconfig lib does not declare. */
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

/** Parse and assert failure; returns the ZodError for further assertions. */
function expectFail(data: unknown): ZodError {
  const res = ModuleSchema.safeParse(data)
  expect(res.success).toBe(false)
  if (res.success) throw new Error('Mong đợi parse thất bại nhưng lại thành công')
  return res.error
}

/** Flatten issues to "path: message" lines for regex assertions. */
function issueText(err: ZodError): string {
  return err.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('\n')
}

/** True if some issue's path starts with the given dotted prefix. */
function hasPathPrefix(err: ZodError, prefix: string): boolean {
  return err.issues.some((i) => i.path.join('.').startsWith(prefix))
}

// ---------------------------------------------------------------
// 1. Module mẫu hợp lệ
// ---------------------------------------------------------------

describe('module mẫu hợp lệ', () => {
  it('makeValidModule() parse thành công; conceptIdsInLesson/orderedLessonIds trả đúng', () => {
    const raw = makeValidModule()
    expect(ModuleSchema.safeParse(raw).success).toBe(true)

    const parsed = parseModule(makeValidModule())
    expect(parsed.id).toBe('module-1')
    expect(parsed.stages).toHaveLength(4)
    expect(parsed.lessons).toHaveLength(4)
    expect(parsed.masteryTest.length).toBeGreaterThanOrEqual(5)

    // Thứ tự bài học = duyệt chặng theo thứ tự
    expect(orderedLessonIds(parsed)).toEqual(['bai-1', 'bai-2', 'bai-3', 'bai-4'])

    // Bài 1 dạy 2 khái niệm, các bài sau mỗi bài 1
    expect(conceptIdsInLesson(parsed.lessons[0]!)).toEqual(['goi-tin', 'dia-chi-ip'])
    expect(conceptIdsInLesson(parsed.lessons[1]!)).toEqual(['port'])
    expect(conceptIdsInLesson(parsed.lessons[2]!)).toEqual(['router'])
    expect(conceptIdsInLesson(parsed.lessons[3]!)).toEqual(['giao-thuc'])
  })

  it('makeValidModule() trả object mới mỗi lần gọi — mutate bản này không lây bản kia', () => {
    const a = looseModule()
    const b = makeValidModule()
    expect(a).not.toBe(b)
    a.lessons[0].steps[2].screens[0].body.vi = 'đã bị test sửa'
    a.concepts[0].id = 'da-doi-id'
    expect(b.lessons[0]!.steps[2].screens[0]!.body.vi).not.toBe('đã bị test sửa')
    expect(b.concepts[0]!.id).toBe('goi-tin')
  })

  it('makeLesson() trả object mới mỗi lần gọi', () => {
    const l1 = makeLesson('bai-x')
    const l2 = makeLesson('bai-x')
    expect(l1).not.toBe(l2)
    expect(l1.steps[2].screens[0]).not.toBe(l2.steps[2].screens[0])
    l1.steps[1].questions[0]!.id = 'id-khac'
    expect(l2.steps[1].questions[0]!.id).toBe('bai-x-pre-1')
  })
})

// ---------------------------------------------------------------
// 2-3. Pipeline 6 bước cố định (nguyên tắc 1)
// ---------------------------------------------------------------

describe('pipeline 6 bước — tuple ép đúng thứ tự, đúng số lượng', () => {
  it('đảo thứ tự hook <-> pretest thì fail', () => {
    const mod = looseModule()
    const steps = mod.lessons[0].steps
    const hook = steps[0]
    steps[0] = steps[1]
    steps[1] = hook
    const err = expectFail(mod)
    // Lỗi phải trỏ vào bước bị sai vị trí
    expect(hasPathPrefix(err, 'lessons.0.steps.0')).toBe(true)
  })

  it('bỏ bước summary (còn 5 bước) thì fail', () => {
    const mod = looseModule()
    mod.lessons[0].steps = mod.lessons[0].steps.slice(0, 5)
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'lessons.0.steps')).toBe(true)
  })

  it('thêm bước thứ 7 thì fail', () => {
    const mod = looseModule()
    mod.lessons[0].steps.push(clone(mod.lessons[0].steps[5]))
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'lessons.0.steps')).toBe(true)
  })
})

// ---------------------------------------------------------------
// 4. Bước Kết — peak-end cần đúng 3 gạch đầu dòng
// ---------------------------------------------------------------

describe('bước Kết (peak-end)', () => {
  it('summary chỉ 2 bullets thì fail', () => {
    const mod = looseModule()
    mod.lessons[0].steps[5].bullets = mod.lessons[0].steps[5].bullets.slice(0, 2)
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'lessons.0.steps.5.bullets')).toBe(true)
  })

  it('summary 4 bullets cũng fail (đúng 3, không hơn)', () => {
    const mod = looseModule()
    mod.lessons[0].steps[5].bullets.push({ vi: 'Gạch đầu dòng thứ tư thừa ra' })
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'lessons.0.steps.5.bullets')).toBe(true)
  })
})

// ---------------------------------------------------------------
// 5. Pretest 1-2 câu (pretesting effect, spec 2.1 bước 2)
// ---------------------------------------------------------------

describe('pretest', () => {
  it('pretest 3 câu thì fail', () => {
    const mod = looseModule()
    const pretest = mod.lessons[0].steps[1]
    const base = clone(pretest.questions[0])
    pretest.questions.push({ ...clone(base), id: 'them-2' })
    pretest.questions.push({ ...clone(base), id: 'them-3' })
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'lessons.0.steps.1.questions')).toBe(true)
  })

  it('pretest 0 câu thì fail', () => {
    const mod = looseModule()
    mod.lessons[0].steps[1].questions = []
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'lessons.0.steps.1.questions')).toBe(true)
  })
})

// ---------------------------------------------------------------
// 6-8. Khái niệm & màn dạy (nguyên tắc 3 + nguồn sinh flashcard)
// ---------------------------------------------------------------

describe('khái niệm và màn dạy', () => {
  it('màn dạy tham chiếu conceptId không tồn tại thì fail, lỗi trỏ đúng màn', () => {
    const mod = looseModule()
    mod.lessons[0].steps[2].screens[0].conceptId = 'khai-niem-ma'
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/khai-niem-ma/)
    expect(hasPathPrefix(err, 'lessons.0.steps.2.screens.0')).toBe(true)
  })

  it('concept không được dạy ở màn nào thì fail (sẽ không bao giờ sinh flashcard)', () => {
    const mod = looseModule()
    mod.concepts.push({
      id: 'switch',
      term: 'Switch',
      glossVi: 'Bộ chuyển mạch — nối các máy trong cùng một mạng nội bộ',
      metaphor: {
        vi: 'Switch như bàn phân loại thư trong một bưu cục: chuyển thư giữa các nhà cùng khu phố.',
      },
      iconId: 'icon-switch',
      flashcard: {
        front: { vi: 'Switch làm gì?' },
        back: { vi: 'Chuyển gói tin giữa các máy trong cùng một mạng nội bộ.' },
      },
    })
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/không bao giờ sinh flashcard/)
    expect(hasPathPrefix(err, 'concepts')).toBe(true)
  })

  it('cùng một bài dạy lặp 1 concept ở 2 màn thì fail (1 màn = 1 khái niệm MỚI)', () => {
    const mod = looseModule()
    const screens = mod.lessons[0].steps[2].screens
    screens.push(clone(screens[0]))
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/dạy lặp/)
    expect(hasPathPrefix(err, 'lessons.0.steps.2.screens.2')).toBe(true)
  })
})

// ---------------------------------------------------------------
// 9, 14. Câu hỏi: answerIndex hợp lệ, id duy nhất toàn module
// ---------------------------------------------------------------

describe('câu hỏi', () => {
  it('MCQ answerIndex vượt số choices thì fail', () => {
    const mod = looseModule()
    const mcq = mod.lessons[0].steps[1].questions[0]
    expect(mcq.kind).toBe('mcq')
    mcq.answerIndex = mcq.choices.length // ngoài biên (chỉ số hợp lệ tối đa là length-1)
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/answerIndex/)
    expect(issueText(err)).toMatch(/vượt quá/)
  })

  it('trùng question.id giữa 2 bài thì fail', () => {
    const mod = looseModule()
    mod.lessons[1].steps[1].questions[0].id = mod.lessons[0].steps[1].questions[0].id
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/Trùng id/)
    expect(hasPathPrefix(err, 'questions')).toBe(true)
  })

  it('trùng concept.id thì fail', () => {
    const mod = looseModule()
    mod.concepts[1].id = mod.concepts[0].id
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/Trùng id "goi-tin" trong concepts/)
  })
})

// ---------------------------------------------------------------
// 10-11. Worked example fading (spec 2.1 bước 4)
// ---------------------------------------------------------------

describe('worked example fading', () => {
  it('bài đầu module fadingLevel 1 thì fail (bài đầu phải có ví dụ giải sẵn)', () => {
    const mod = looseModule()
    mod.lessons[0].steps[3].fadingLevel = 1 // workedExample vẫn còn — vẫn phải fail
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/fadingLevel 0/)
  })

  it('fadingLevel 0 mà thiếu workedExample thì fail', () => {
    const mod = looseModule()
    delete mod.lessons[0].steps[3].workedExample
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/thiếu workedExample/)
    expect(hasPathPrefix(err, 'lessons.0.steps.3')).toBe(true)
  })
})

// ---------------------------------------------------------------
// 12-13. Chặng — goal gradient 4-6, mỗi bài thuộc đúng 1 chặng
// ---------------------------------------------------------------

describe('chặng (goal gradient)', () => {
  it('3 chặng thì fail', () => {
    const mod = looseModule()
    mod.stages = mod.stages.slice(0, 3)
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'stages')).toBe(true)
  })

  it('7 chặng thì fail', () => {
    const mod = looseModule()
    for (let i = 5; i <= 7; i++) {
      mod.stages.push({ id: `chang-${i}`, title: { vi: `Chặng phụ ${i}` }, lessonIds: ['bai-1'] })
    }
    expect(mod.stages).toHaveLength(7)
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'stages')).toBe(true)
  })

  it('chặng tham chiếu lessonId không tồn tại thì fail', () => {
    const mod = looseModule()
    mod.stages[0].lessonIds = ['bai-ma']
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/tham chiếu bài học không tồn tại/)
    expect(issueText(err)).toMatch(/bai-ma/)
    expect(hasPathPrefix(err, 'stages.0.lessonIds')).toBe(true)
  })

  it('1 bài nằm trong 2 chặng thì fail', () => {
    const mod = looseModule()
    mod.stages[1].lessonIds.push('bai-1')
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/nhiều hơn 1 chặng/)
  })

  it('1 bài không thuộc chặng nào thì fail', () => {
    const mod = looseModule()
    mod.lessons.push(makeLesson('bai-5', { conceptIds: ['router'] }))
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/"bai-5" không thuộc chặng nào/)
  })
})

// ---------------------------------------------------------------
// 15. Mastery test tối thiểu 5 câu (mastery gate — nguyên tắc 2)
// ---------------------------------------------------------------

describe('mastery test', () => {
  it('masteryTest 4 câu thì fail', () => {
    const mod = looseModule()
    mod.masteryTest = mod.masteryTest.slice(0, 4)
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'masteryTest')).toBe(true)
  })
})

// ---------------------------------------------------------------
// Câu độc lập bắt buộc có explain (feedback sau trả lời);
// câu trong Exercise được miễn vì đã có solution
// ---------------------------------------------------------------

describe('explain cho câu độc lập', () => {
  it('câu pretest thiếu explain thì fail', () => {
    const mod = looseModule()
    delete mod.lessons[0].steps[1].questions[0].explain
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/phải có "explain"/)
  })

  it('câu mastery test thiếu explain thì fail', () => {
    const mod = looseModule()
    delete mod.masteryTest[2].explain
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/masteryTest\[2\]/)
  })

  it('câu trong Exercise không cần explain (solution đã là lời giải thích)', () => {
    // Fixture vốn không đặt explain cho câu practice/retrieval — vẫn pass.
    const mod = looseModule()
    expect(mod.lessons[0].steps[3].exercises[0].question.explain).toBeUndefined()
    expect(ModuleSchema.safeParse(mod).success).toBe(true)
  })
})

// ---------------------------------------------------------------
// 16. LText — VI bắt buộc, EN là chỗ chừa sẵn song ngữ
// ---------------------------------------------------------------

describe('LText song ngữ', () => {
  it('vi rỗng thì fail', () => {
    const mod = looseModule()
    mod.title.vi = ''
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'title.vi')).toBe(true)
  })

  it('thêm en hợp lệ thì vẫn pass (chỗ chừa sẵn song ngữ hoạt động)', () => {
    const mod = looseModule()
    mod.title.en = 'What is a network? — The post office story'
    mod.lessons[0].missionTitle.en = 'Seal your first envelope'
    expect(ModuleSchema.safeParse(mod).success).toBe(true)
  })

  it('en rỗng thì fail (đã khai en thì phải có nội dung)', () => {
    const mod = looseModule()
    mod.title.en = ''
    const err = expectFail(mod)
    expect(hasPathPrefix(err, 'title.en')).toBe(true)
  })
})

// ---------------------------------------------------------------
// 17. parseModule — lỗi gộp cho người soạn bài, trỏ đúng vị trí
// ---------------------------------------------------------------

describe('parseModule', () => {
  it('ném Error chứa đường dẫn vị trí lỗi trong stages', () => {
    const mod = looseModule()
    mod.stages[0].lessonIds = ['bai-ma']
    expect(() => parseModule(mod)).toThrowError(/Nội dung module không hợp lệ/)
    expect(() => parseModule(mod)).toThrowError(/stages\.0\.lessonIds/)
  })

  it('ném Error chứa đường dẫn vị trí lỗi trong lessons', () => {
    const mod = looseModule()
    mod.lessons[0].steps[2].screens[0].conceptId = 'khai-niem-ma'
    expect(() => parseModule(mod)).toThrowError(/lessons\.0\.steps\.2\.screens\.0/)
  })
})

// ---------------------------------------------------------------
// Biên phụ: cờ drill chỉ nhận 'subnet' (Module 3)
// ---------------------------------------------------------------

describe('drill', () => {
  it("drill: 'subnet' hợp lệ, giá trị khác thì fail", () => {
    const withDrill = looseModule()
    withDrill.drill = 'subnet'
    expect(ModuleSchema.safeParse(withDrill).success).toBe(true)

    const badDrill = looseModule()
    badDrill.drill = 'ports'
    const err = expectFail(badDrill)
    expect(hasPathPrefix(err, 'drill')).toBe(true)
  })
})

// ---------------------------------------------------------------
// validateModules — id duy nhất XUYÊN module (ReviewCard nhận diện thẻ
// bằng conceptId toàn app; superRefine chỉ nhìn được một module)
// ---------------------------------------------------------------

describe('noFlashcard — ngoại lệ phải khai tường minh (spec 2.2 vẫn là mặc định)', () => {
  it('concept thiếu flashcard mà không khai noFlashcard thì fail', () => {
    const mod = looseModule()
    delete mod.concepts[0].flashcard
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/thiếu flashcard/)
  })

  it('khai noFlashcard: true (và bỏ flashcard) thì pass', () => {
    const mod = looseModule()
    delete mod.concepts[0].flashcard
    mod.concepts[0].noFlashcard = true
    expect(ModuleSchema.safeParse(mod).success).toBe(true)
  })

  it('vừa có flashcard vừa khai noFlashcard thì fail (chọn một)', () => {
    const mod = looseModule()
    mod.concepts[0].noFlashcard = true
    const err = expectFail(mod)
    expect(issueText(err)).toMatch(/chọn một/)
  })
})

/**
 * Nhân bản một module thành bản độc lập hoàn toàn: thêm hậu tố vào mọi
 * định danh (`id`, `conceptId`, `lessonIds`) để hai bản không đụng nhau
 * ở BẤT KỲ khóa nào — nhờ vậy test cô lập được đúng một loại xung đột.
 */
function reidModule(mod: object, suffix: string): Record<string, unknown> {
  const walk = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(walk)
    if (node === null || typeof node !== 'object') return node
    const out: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(node)) {
      if ((key === 'id' || key === 'conceptId') && typeof value === 'string') out[key] = value + suffix
      else if (key === 'lessonIds' && Array.isArray(value)) out[key] = value.map((v) => `${String(v)}${suffix}`)
      else out[key] = walk(value)
    }
    return out
  }
  return walk(mod) as Record<string, unknown>
}

describe('validateModules', () => {
  it('một module hợp lệ đứng riêng thì qua', () => {
    expect(() => validateModules([parseModule(makeValidModule())])).not.toThrow()
  })

  it('hai module trùng id thì ném lỗi trỏ đúng module', () => {
    const a = parseModule(makeValidModule())
    const b = parseModule(makeValidModule())
    expect(() => validateModules([a, b])).toThrowError(/Trùng module id "module-1"/)
  })

  it('khác module id nhưng trùng conceptId thì vẫn ném lỗi (thẻ ôn sẽ đè nhau)', () => {
    const a = parseModule(makeValidModule())
    const b = parseModule({ ...(makeValidModule() as object), id: 'module-2' })
    expect(() => validateModules([a, b])).toThrowError(/Concept ".+" xuất hiện ở cả module "module-1" và "module-2"/)
    expect(() => validateModules([a, b])).toThrowError(/Nội dung liên-module không hợp lệ/)
  })

  // Thứ tự module CHÍNH LÀ chuỗi mở khóa của mastery gate (nguyên tắc 2).
  // Trùng `order` khiến phép sắp xếp không xác định được ai đứng trước —
  // gate có thể mở nhầm module. Hai test dưới dùng module đã đổi hết id
  // nên thứ DUY NHẤT còn xung đột là `order`.
  it('hai module độc lập nhưng trùng order thì ném lỗi', () => {
    const a = parseModule(makeValidModule())
    const b = parseModule(reidModule(makeValidModule(), '-b'))
    expect(() => validateModules([a, b])).toThrowError(/Trùng order 1 giữa module "module-1" và "module-1-b"/)
  })

  it('đổi order thì bộ đôi độc lập đó hợp lệ', () => {
    const a = parseModule(makeValidModule())
    const b = parseModule({ ...reidModule(makeValidModule(), '-b'), order: 2 })
    expect(() => validateModules([a, b])).not.toThrow()
  })
})

// ---------------------------------------------------------------
// Câu hỏi phòng khám (kind 'clinic') — hai phần phải khớp nhau
// ---------------------------------------------------------------

describe('câu clinic — cross-check hai phần chẩn đoán/sửa', () => {
  /** Module hợp lệ với ca bệnh sửa-sơ-đồ ở bước Làm của bài 2. */
  function moduleWithClinic(): any {
    const base = makeValidModule()
    base.lessons = base.lessons.map((lesson) =>
      lesson.id === 'bai-2' ? makeLesson('bai-2', { fadingLevel: 1, conceptIds: ['port'], clinicPractice: true }) : lesson,
    )
    return base
  }
  const clinicQuestionOf = (mod: any) => mod.lessons[1].steps[3].exercises[0].question

  it('module mang ca bệnh hợp lệ thì parse thành công', () => {
    expect(ModuleSchema.safeParse(moduleWithClinic()).success).toBe(true)
  })

  it('diagnosis.answerIndex vượt số lựa chọn thì fail', () => {
    const mod = moduleWithClinic()
    const q = clinicQuestionOf(mod)
    q.diagnosis.answerIndex = q.diagnosis.choices.length
    expect(issueText(expectFail(mod))).toMatch(/diagnosis\.answerIndex/)
  })

  it('ca sửa-sơ-đồ mà khai thêm actions thì fail — hai đường sửa cùng lúc', () => {
    const mod = moduleWithClinic()
    clinicQuestionOf(mod).actions = {
      choices: [{ vi: 'Làm gì đó' }, { vi: 'Làm gì khác' }],
      answerIndex: 0,
    }
    expect(issueText(expectFail(mod))).toMatch(/không dùng "actions"/)
  })

  it('ca chọn-hành-động mà thiếu actions thì fail — người học hết đường sửa', () => {
    const mod = moduleWithClinic()
    clinicQuestionOf(mod).spec.fix = { kind: 'choose-action' }
    expect(issueText(expectFail(mod))).toMatch(/phải khai "actions"/)
  })

  it('ca LIÊN TẦNG mà thiếu actions thì fail — nửa bệnh ngoài sơ đồ hết đường xử lý', () => {
    const mod = moduleWithClinic()
    clinicQuestionOf(mod).spec.fix.kind = 'edit-and-act'
    expect(issueText(expectFail(mod))).toMatch(/ca liên tầng phải khai "actions"/)
  })

  it('ca LIÊN TẦNG khai đủ hai nửa thì parse thành công', () => {
    const mod = moduleWithClinic()
    const q = clinicQuestionOf(mod)
    q.spec.fix.kind = 'edit-and-act'
    q.actions = { choices: [{ vi: 'Nhờ quản trị DNS thêm bản ghi' }, { vi: 'Khởi động lại máy' }], answerIndex: 0 }
    expect(ModuleSchema.safeParse(mod).success).toBe(true)
  })

  it('actions.answerIndex vượt số lựa chọn thì fail', () => {
    const mod = moduleWithClinic()
    const q = clinicQuestionOf(mod)
    q.spec.fix = { kind: 'choose-action' }
    q.actions = { choices: [{ vi: 'A' }, { vi: 'B' }], answerIndex: 2 }
    expect(issueText(expectFail(mod))).toMatch(/actions\.answerIndex/)
  })
})
