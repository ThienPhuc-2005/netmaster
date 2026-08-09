// Test store tiến độ — logic lõi của Khối 3: XP/streak chỉ từ retrieval/
// lab và chỉ lần đầu, flashcard sinh đúng một lần, SM-2 chạy qua phiên ôn,
// luật "ôn trước học sau" và chặn nợ 30 thẻ.

import { beforeEach, describe, expect, it } from 'vitest'
import { makeValidModule } from '../../tests/fixtures/moduleFixture'
import { parseModule, type Module, type Lesson } from '../engine/contentSchema'
import { createCard } from '../engine/sm2'
import { addDays } from '../engine/dates'
import { canChallengeModule, newLessonGate, shouldReviewFirst, todayIso, useProgress } from './progress'

// localStorage in-memory do tests/setup.ts cấp trước khi store được import.

const MODULE: Module = parseModule(makeValidModule())
const LESSON_1: Lesson = MODULE.lessons[0]! // bai-1: dạy 2 concept (goi-tin, dia-chi-ip)

const INITIAL = useProgress.getInitialState()

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})

/** Đi trọn 6 bước của một bài bằng đúng các action UI sẽ gọi. */
function completeLesson(lesson: Lesson) {
  const s = () => useProgress.getState()
  s().beginLesson(lesson)
  s().advanceLesson(MODULE, lesson) // hook → pretest

  for (const q of lesson.steps[1].questions) {
    // Trả lời pretest (đoán sai cũng qua được — không phạt)
    s().answerPretestQ(lesson, q.id, q.kind === 'mcq' ? { kind: 'mcq', choiceIndex: 0 } : { kind: 'typed', text: 'đoán bừa' })
  }
  s().advanceLesson(MODULE, lesson) // pretest → teach

  for (let i = 0; i < lesson.steps[2].screens.length - 1; i++) s().nextTeachScreen(lesson)
  s().advanceLesson(MODULE, lesson) // teach → practice

  for (const ex of lesson.steps[3].exercises) {
    const accept = ex.question.kind === 'typed' ? ex.question.accept[0]! : ''
    s().submitExerciseAnswer(lesson, ex.question.id, { kind: 'typed', text: accept })
  }
  s().advanceLesson(MODULE, lesson) // practice → retrieval (+10 XP practice)

  for (const ex of lesson.steps[4].questions) {
    const accept = ex.question.kind === 'typed' ? ex.question.accept[0]! : ''
    s().submitExerciseAnswer(lesson, ex.question.id, { kind: 'typed', text: accept })
  }
  // Tự giải thích đủ ý: ghép mỗi nhóm keyword một biến thể
  const keywords = lesson.steps[4].selfExplain.keywords.map((g) => g[0]!).join(' vì ')
  s().submitSelfExplainText(lesson, keywords)
  s().advanceLesson(MODULE, lesson) // retrieval → summary (+20 XP retrieval)
  s().advanceLesson(MODULE, lesson) // summary → completed (sinh flashcard)
}

describe('vòng đời một bài học', () => {
  it('hoàn thành bài: +30 XP (10 practice + 20 retrieval), streak = 1, thẻ sinh đủ concept', () => {
    completeLesson(LESSON_1)
    const st = useProgress.getState()
    expect(st.xpTotal).toBe(30)
    expect(st.moduleXp['module-1']).toBe(30)
    expect(st.streak.current).toBe(1)
    expect(st.completedLessons['bai-1']).toBe(todayIso())
    // bai-1 dạy 2 concept → đúng 2 thẻ, hẹn ôn sau 1 ngày
    expect(st.reviewCards.map((c) => c.conceptId).sort()).toEqual(['dia-chi-ip', 'goi-tin'])
    expect(st.reviewCards[0]?.dueDate).toBe(addDays(todayIso(), 1))
  })

  it('concept khai noFlashcard: hoàn thành bài KHÔNG sinh thẻ cho concept đó', () => {
    // bai-1 của fixture dạy 2 concept; gắn cờ noFlashcard cho concept đầu
    const raw = makeValidModule() as { concepts: { id: string; flashcard?: unknown; noFlashcard?: true }[] }
    const target = raw.concepts.find((c) => c.id === 'goi-tin')!
    delete target.flashcard
    target.noFlashcard = true
    const moduleWithMeta = parseModule(raw)
    const lesson1 = moduleWithMeta.lessons[0]!

    const s = () => useProgress.getState()
    s().beginLesson(lesson1)
    s().advanceLesson(moduleWithMeta, lesson1)
    for (const q of lesson1.steps[1].questions) {
      s().answerPretestQ(lesson1, q.id, q.kind === 'mcq' ? { kind: 'mcq', choiceIndex: 0 } : { kind: 'typed', text: 'đoán' })
    }
    s().advanceLesson(moduleWithMeta, lesson1)
    for (let i = 0; i < lesson1.steps[2].screens.length - 1; i++) s().nextTeachScreen(lesson1)
    s().advanceLesson(moduleWithMeta, lesson1)
    for (const ex of lesson1.steps[3].exercises) {
      s().submitExerciseAnswer(lesson1, ex.question.id, { kind: 'typed', text: ex.question.kind === 'typed' ? ex.question.accept[0]! : '' })
    }
    s().advanceLesson(moduleWithMeta, lesson1)
    for (const ex of lesson1.steps[4].questions) {
      s().submitExerciseAnswer(lesson1, ex.question.id, { kind: 'typed', text: ex.question.kind === 'typed' ? ex.question.accept[0]! : '' })
    }
    s().submitSelfExplainText(lesson1, lesson1.steps[4].selfExplain.keywords.map((g) => g[0]!).join(' vì '))
    s().advanceLesson(moduleWithMeta, lesson1)
    s().advanceLesson(moduleWithMeta, lesson1)

    // goi-tin bị lọc, chỉ concept còn lại vào hộp ôn
    expect(s().reviewCards.map((c) => c.conceptId)).toEqual(['dia-chi-ip'])
  })

  it('học lại bài đã xong: không cộng XP lần hai, không sinh thêm thẻ (chống farm)', () => {
    completeLesson(LESSON_1)
    completeLesson(LESSON_1)
    const st = useProgress.getState()
    expect(st.xpTotal).toBe(30)
    expect(st.reviewCards).toHaveLength(2)
  })

  it('pretest không vào answerHistory; practice/retrieval thì có', () => {
    completeLesson(LESSON_1)
    // bai-1: 1 câu practice + 1 câu retrieval = 2 bản ghi (1 pretest bị loại)
    expect(useProgress.getState().answerHistory).toHaveLength(2)
  })

  it('trạng thái persist xuống localStorage', () => {
    completeLesson(LESSON_1)
    const raw = localStorage.getItem('netmaster-progress')
    expect(raw).toBeTruthy()
    expect(JSON.parse(raw!).state.xpTotal).toBe(30)
  })
})

describe('phiên ôn thẻ', () => {
  it('nhớ → thẻ leo bậc + 2 XP; chưa nhớ → thẻ về 1 ngày, không XP', () => {
    completeLesson(LESSON_1)
    const s = () => useProgress.getState()
    const xpBefore = s().xpTotal

    s().gradeReviewCard('goi-tin', true)
    s().gradeReviewCard('dia-chi-ip', false)

    const cards = Object.fromEntries(s().reviewCards.map((c) => [c.conceptId, c]))
    expect(cards['goi-tin']?.intervalIndex).toBe(1) // 1 → 3 ngày
    expect(cards['goi-tin']?.dueDate).toBe(addDays(todayIso(), 3))
    expect(cards['dia-chi-ip']?.intervalIndex).toBe(0)
    expect(cards['dia-chi-ip']?.lapses).toBe(1)
    expect(s().xpTotal).toBe(xpBefore + 2)
  })

  it('hoàn thành phiên → lastReviewDate = hôm nay (mở khóa tab Học)', () => {
    completeLesson(LESSON_1)
    useProgress.getState().completeReviewSession()
    expect(useProgress.getState().lastReviewDate).toBe(todayIso())
  })
})

describe('luật điều hướng (spec 2.2)', () => {
  it('shouldReviewFirst: có thẻ đến hạn + hôm nay chưa ôn → true; ôn xong → false', () => {
    const today = todayIso()
    const due = [createCard('goi-tin', 'module-1', addDays(today, -2))] // due từ hôm qua
    expect(shouldReviewFirst(due, null, today)).toBe(true)
    expect(shouldReviewFirst(due, today, today)).toBe(false)
    expect(shouldReviewFirst([], null, today)).toBe(false)
  })

  it('newLessonGate: 31 thẻ quá hạn → chặn học mới, kèm số nợ', () => {
    const today = todayIso()
    const overdue = Array.from({ length: 31 }, (_, i) =>
      createCard(`c-${i}`, 'module-1', addDays(today, -5)),
    )
    const gate = newLessonGate(overdue, today)
    expect(gate.allowed).toBe(false)
    expect(gate.overdue).toBe(31)
    // 30 thẻ thì vẫn được học (biên đúng chữ ">")
    expect(newLessonGate(overdue.slice(0, 30), today).allowed).toBe(true)
  })
})

describe('bài thi mastery (nguyên tắc 2)', () => {
  const pass = [true, true, true, true, true, true, false] // 6/7 ≈ 85.7%
  const fail = [true, true, true, false, false, false, false] // 3/7

  it('đạt >= 85% → ghi điểm, mở module, newlyPassed đúng một lần', () => {
    const s = () => useProgress.getState()
    const first = s().recordMasteryAttempt(MODULE, pass, [MODULE.id])
    expect(first.passed).toBe(true)
    expect(first.newlyPassed).toBe(true)
    expect(s().passedModules).toEqual(['module-1'])
    expect(s().masteryScores['module-1']).toBeCloseTo((6 / 7) * 100, 5)

    // Thi lại điểm thấp: best giữ nguyên, không "passed lần đầu" lần hai
    const again = s().recordMasteryAttempt(MODULE, fail, [MODULE.id])
    expect(again.passed).toBe(false)
    expect(again.newlyPassed).toBe(false)
    expect(s().passedModules).toEqual(['module-1'])
    expect(s().masteryScores['module-1']).toBeCloseTo((6 / 7) * 100, 5)
  })

  it('rớt < 85% → không mở module, điểm vẫn được ghi', () => {
    const s = () => useProgress.getState()
    const r = s().recordMasteryAttempt(MODULE, fail, [MODULE.id])
    expect(r.passed).toBe(false)
    expect(s().passedModules).toEqual([])
    expect(s().masteryScores['module-1']).toBeCloseTo((3 / 7) * 100, 5)
  })

  it('KHÔNG cộng XP/streak từ bài thi (chặn farm bằng thi lại)', () => {
    const s = () => useProgress.getState()
    s().recordMasteryAttempt(MODULE, pass, [MODULE.id])
    expect(s().xpTotal).toBe(0)
    expect(s().streak.current).toBe(0)
    // nhưng câu trả lời vẫn vào lịch sử 10 câu (dữ liệu flow Phase 2)
    expect(s().answerHistory).toHaveLength(7)
  })

  it('module khóa/không tồn tại → ném lỗi (không có đường vượt gate)', () => {
    const ghost = { ...MODULE, id: 'module-ma' }
    expect(() => useProgress.getState().recordMasteryAttempt(ghost, pass, [MODULE.id])).toThrow(/locked or unknown/)
  })
})

describe('thi vượt (học vượt — nguyên tắc 2 vẫn nguyên)', () => {
  const pass = [true, true, true, true, true, true, false] // 6/7 ≈ 85.7%
  const fail = [true, true, true, false, false, false, false] // 3/7

  it('đậu → mở module VÀ sinh đủ thẻ ôn cho mọi khái niệm, hạn ngày mai', () => {
    // Vượt xong mà không có thẻ nào thì cả mảng kiến thức đó không bao
    // giờ được nhắc lại — thủng cơ chế ôn của app (spec 2.2).
    const s = () => useProgress.getState()
    const r = s().recordChallengeAttempt(MODULE, pass, [MODULE.id])
    expect(r.passed).toBe(true)
    expect(r.newlyPassed).toBe(true)
    expect(s().passedModules).toEqual(['module-1'])

    const wanted = MODULE.concepts.filter((c) => c.noFlashcard !== true).map((c) => c.id)
    expect(r.cardsCreated).toBeGreaterThanOrEqual(wanted.length)
    const cardIds = new Set(s().reviewCards.map((c) => c.conceptId))
    for (const id of wanted) expect(cardIds.has(id), `thiếu thẻ khái niệm "${id}"`).toBe(true)
    const tomorrow = addDays(todayIso(), 1)
    for (const card of s().reviewCards) expect(card.dueDate).toBe(tomorrow)
  })

  it('KHÔNG cộng XP/streak — thi vượt vẫn là cổng, không phải phần thưởng', () => {
    const s = () => useProgress.getState()
    s().recordChallengeAttempt(MODULE, pass, [MODULE.id])
    expect(s().xpTotal).toBe(0)
    expect(s().streak.current).toBe(0)
    expect(s().answerHistory).toHaveLength(7)
  })

  it('rớt → không mở module, KHÔNG sinh thẻ, có ghi lại ngày vượt', () => {
    const s = () => useProgress.getState()
    const r = s().recordChallengeAttempt(MODULE, fail, [MODULE.id])
    expect(r.passed).toBe(false)
    expect(s().passedModules).toEqual([])
    expect(s().reviewCards).toEqual([])
    expect(s().challengeUsed['module-1']).toBe(todayIso())
  })

  it('vượt hụt rồi vượt LẠI được ngay — cửa vượt không bị tiêu mất', () => {
    // Chủ dự án chốt 08-08 (lượt sau): mọi chủ đề lớn phải LUÔN có cửa
    // vượt, mà cửa dùng một lần rồi mất thì bằng không có. Cổng 85% giữ
    // giá bằng ba lớp khác: xáo thứ tự câu, xáo lựa chọn MCQ, màn rớt
    // không in đáp án.
    const s = () => useProgress.getState()
    s().recordChallengeAttempt(MODULE, fail, [MODULE.id])
    const r = s().recordChallengeAttempt(MODULE, pass, [MODULE.id])
    expect(r.newlyPassed).toBe(true)
    expect(s().passedModules).toEqual(['module-1'])
    // Đậu ở lượt thứ hai vẫn phải sinh đủ thẻ ôn như lượt đầu.
    expect(s().reviewCards.length).toBeGreaterThan(0)
  })

  it('module ĐANG KHÓA vẫn vượt được (đường dành cho người học sẵn ở nơi khác)', () => {
    // Chủ dự án chốt 08-08: nút vượt có ở MỌI module, kể cả module khóa —
    // ai đã học ba module đầu ở chỗ khác thì vào thẳng module thứ tư.
    const s = () => useProgress.getState()
    const later = { ...MODULE, id: 'module-4' }
    const order = [MODULE.id, 'module-2', 'module-3', 'module-4']
    const r = s().recordChallengeAttempt(later, pass, order)
    expect(r.newlyPassed).toBe(true)
    expect(s().passedModules).toEqual(['module-4'])
  })

  it('module không tồn tại trong lộ trình → vẫn ném lỗi', () => {
    const ghost = { ...MODULE, id: 'module-ma' }
    expect(() => useProgress.getState().recordChallengeAttempt(ghost, pass, [MODULE.id])).toThrow(/locked or unknown/)
  })

  it('rớt vượt rồi học tử tế vẫn thi mastery lại được, không giới hạn', () => {
    // Lượt vượt tiêu hết KHÔNG được phép khóa luôn đường thi bình thường.
    const s = () => useProgress.getState()
    s().recordChallengeAttempt(MODULE, fail, [MODULE.id])
    const r = s().recordMasteryAttempt(MODULE, pass, [MODULE.id])
    expect(r.newlyPassed).toBe(true)
    expect(s().passedModules).toEqual(['module-1'])
  })
})

describe('canChallengeModule — lời mời thi vượt chỉ hiện khi còn nghĩa', () => {
  const ids = MODULE.lessons.map((l) => l.id)
  const base = { lessonIds: ids, completedLessons: {}, moduleId: MODULE.id }

  it('module đang mở, chưa học hết bài → mời', () => {
    expect(canChallengeModule({ ...base, status: 'open' })).toBe(true)
  })

  it('module đang KHÓA cũng mời (nút vượt có ở mọi module)', () => {
    expect(canChallengeModule({ ...base, status: 'locked' })).toBe(true)
  })

  it('module đã đậu hoặc không tồn tại → không mời', () => {
    expect(canChallengeModule({ ...base, status: 'passed' })).toBe(false)
    expect(canChallengeModule({ ...base, status: undefined })).toBe(false)
  })

  it('đã học hết bài → không mời (đường thi thường đã mở, khỏi cửa riêng)', () => {
    const completedLessons = Object.fromEntries(ids.map((id) => [id, todayIso()]))
    expect(canChallengeModule({ ...base, completedLessons, status: 'open' })).toBe(false)
  })

  it('đã vượt hụt một lần vẫn mời tiếp — cửa vượt không tiêu mất', () => {
    // Lời mời chỉ suy từ trạng thái module + bài đã học; sổ challengeUsed
    // không còn là điều kiện, nên chủ đề lớn nào chưa đậu cũng luôn có cửa.
    expect(canChallengeModule({ ...base, status: 'open' })).toBe(true)
    expect(canChallengeModule({ ...base, status: 'locked' })).toBe(true)
  })
})

describe('phiên drill', () => {
  it('ghi lịch sử + XP theo số bài đủ điều kiện + streak', () => {
    const s = () => useProgress.getState()
    s().recordDrillSession(
      'subnet',
      [
        { correct: true, seconds: 12 },
        { correct: true, seconds: 20 },
        { correct: false, seconds: 30 },
      ],
      2, // 2 bài đúng trước khi xem lời giải
    )
    const st = s()
    expect(st.drillHistory).toHaveLength(1)
    expect(st.drillHistory[0]).toMatchObject({ mode: 'subnet', correct: 2, total: 3, date: todayIso() })
    expect(st.xpTotal).toBe(6) // 2 × 3 XP
    expect(st.streak.current).toBe(1)
    expect(st.answerHistory).toHaveLength(3)
  })
})
