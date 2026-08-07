// Bài có TERMINAL POWERSHELL đi trọn pipeline 6 bước.
//
// Phép thử kiến trúc quen thuộc (lần thứ tư — lab, palace, clinic, ps):
// nếu bài terminal thật sự chỉ là "một dạng câu hỏi khác", thì máy trạng
// thái, thang phản hồi 3 tầng, XP, streak phải chạy y hệt mà KHÔNG sửa
// `lessonMachine.ts` một dòng nào. File này khóa lời hứa đó.

import { beforeEach, describe, expect, it } from 'vitest'
import { useProgress } from '../../store/progress'
import { parseModule } from '../../engine/contentSchema'
import { canAdvance, currentStepType, startLesson } from '../../engine/lessonMachine'
import { XP_AMOUNTS } from '../../engine/xp'
import { makeLesson, makeValidModule } from '../../../tests/fixtures/moduleFixture'
import { initialPsState, runPsScript, type PsRunState } from '../../engine/ps'

const INITIAL = useProgress.getInitialState()

/** Module hợp lệ trong đó bài 2 có bước Làm là một bài terminal PowerShell. */
function moduleWithPs() {
  const base = makeValidModule()
  return parseModule({
    ...base,
    lessons: base.lessons.map((lesson) =>
      lesson.id === 'bai-2' ? makeLesson('bai-2', { fadingLevel: 1, conceptIds: ['port'], psPractice: true }) : lesson,
    ),
  })
}

const psModule = moduleWithPs()
const psLesson = psModule.lessons.find((l) => l.id === 'bai-2')!
const psQuestion = psLesson.steps[3].exercises[0]!.question
if (psQuestion.kind !== 'ps') throw new Error('fixture hỏng: bài 2 phải mang bài terminal')

/** Trạng thái phiên đã giải xong (chạy lời giải mẫu) và chưa làm gì. */
const SOLVED: PsRunState = runPsScript(psQuestion.spec.world, psQuestion.spec.solution).state
const UNTOUCHED: PsRunState = initialPsState(psQuestion.spec.world)

function walkToPractice() {
  const store = useProgress.getState()
  store.beginLesson(psLesson)
  store.advanceLesson(psModule, psLesson)
  const pretestId = psLesson.steps[1].questions[0]!.id
  store.answerPretestQ(psLesson, pretestId, { kind: 'mcq', choiceIndex: 0 })
  store.advanceLesson(psModule, psLesson)
  store.advanceLesson(psModule, psLesson)
}

const submitPs = (state: PsRunState) =>
  useProgress.getState().submitExerciseAnswer(psLesson, psQuestion.id, { kind: 'ps', state })

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})

describe('nội dung có bài terminal vẫn parse qua schema chuẩn', () => {
  it('bài terminal là một câu hỏi bình thường trong bước Làm, đủ 6 bước', () => {
    expect(psLesson.steps[3].exercises[0]!.question.kind).toBe('ps')
    expect(psLesson.steps.map((s) => s.type)).toEqual(['hook', 'pretest', 'teach', 'practice', 'retrieval', 'summary'])
  })

  it('id câu ps vào chung sổ id với mọi câu khác', () => {
    expect(startLesson(psLesson).exercises[psQuestion.id]).toEqual({ failCount: 0, solved: false, usedSolution: false })
  })
})

describe('chấm qua đúng đường của mọi câu hỏi', () => {
  it('phiên đạt mục tiêu → câu được tính xong; chưa gõ gì → chưa xong, thang lên tầng', () => {
    walkToPractice()
    expect(submitPs(UNTOUCHED)).toMatchObject({ correct: false, tier: 1 })
    expect(submitPs(SOLVED)).toMatchObject({ correct: true, solved: true })
  })

  it('THANG 3 TẦNG chạy y hệt câu gõ tay; xem lời giải rồi vẫn phải tự làm được', () => {
    walkToPractice()
    expect(submitPs(UNTOUCHED).tier).toBe(1)
    expect(submitPs(UNTOUCHED).tier).toBe(2)
    expect(submitPs(UNTOUCHED).tier).toBe(3)
    expect(useProgress.getState().lessonRuntimes['bai-2']!.exercises[psQuestion.id]!.usedSolution).toBe(true)
    expect(submitPs(SOLVED).solved).toBe(true)
  })
})

describe('cổng qua bước + XP (nguyên tắc 5)', () => {
  it('chưa giải thì không qua bước; giải xong qua bước cộng đúng XP bước Làm', () => {
    walkToPractice()
    submitPs(UNTOUCHED)
    const rt = useProgress.getState().lessonRuntimes['bai-2']!
    expect(currentStepType(rt, psLesson)).toBe('practice')
    expect(canAdvance(rt, psLesson)).toBe(false)

    submitPs(SOLVED)
    useProgress.getState().advanceLesson(psModule, psLesson)
    expect(useProgress.getState().xpTotal).toBe(XP_AMOUNTS.practice)
    expect(useProgress.getState().streak.current).toBe(1)
  })

  it('nộp hỏng không cộng điểm; mỗi lượt vào lịch sử trả lời', () => {
    walkToPractice()
    submitPs(UNTOUCHED)
    submitPs(SOLVED)
    expect(useProgress.getState().xpTotal).toBe(0) // chưa advance
    expect(useProgress.getState().answerHistory.map((h) => h.correct)).toEqual([false, true])
  })
})
