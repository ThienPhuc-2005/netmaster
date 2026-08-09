// Bài có CONSOLE THIẾT BỊ đi trọn pipeline 6 bước.
//
// Phép thử kiến trúc quen thuộc (lần thứ NĂM — lab, palace, clinic, ps,
// cli): nếu bài CLI thật sự chỉ là "một dạng câu hỏi khác", thì máy trạng
// thái, thang phản hồi 3 tầng, XP, streak phải chạy y hệt mà KHÔNG sửa
// `lessonMachine.ts` một dòng nào. File này khóa lời hứa đó.

import { beforeEach, describe, expect, it } from 'vitest'
import { useProgress } from '../../store/progress'
import { parseModule } from '../../engine/contentSchema'
import { canAdvance, currentStepType, startLesson } from '../../engine/lessonMachine'
import { XP_AMOUNTS } from '../../engine/xp'
import { makeLesson, makeValidModule } from '../../../tests/fixtures/moduleFixture'
import { initialCliState, runCliSolution, type CliState } from '../../engine/cli'

const INITIAL = useProgress.getInitialState()

/** Module hợp lệ trong đó bài 2 có bước Làm là một bài CLI thiết bị. */
function moduleWithCli() {
  const base = makeValidModule()
  return parseModule({
    ...base,
    lessons: base.lessons.map((lesson) =>
      lesson.id === 'bai-2' ? makeLesson('bai-2', { fadingLevel: 1, conceptIds: ['port'], cliPractice: true }) : lesson,
    ),
  })
}

const cliModule = moduleWithCli()
const cliLesson = cliModule.lessons.find((l) => l.id === 'bai-2')!
const cliQuestion = cliLesson.steps[3].exercises[0]!.question
if (cliQuestion.kind !== 'cli') throw new Error('fixture hỏng: bài 2 phải mang bài CLI')

/** Phiên đã giải xong (chạy lời giải mẫu) và phiên chưa gõ gì. */
const SOLVED: CliState = runCliSolution(cliQuestion.spec).state
const UNTOUCHED: CliState = initialCliState(cliQuestion.spec.initial, cliQuestion.spec.deviceId)

function walkToPractice() {
  const store = useProgress.getState()
  store.beginLesson(cliLesson)
  store.advanceLesson(cliModule, cliLesson)
  const pretestId = cliLesson.steps[1].questions[0]!.id
  store.answerPretestQ(cliLesson, pretestId, { kind: 'mcq', choiceIndex: 0 })
  store.advanceLesson(cliModule, cliLesson)
  store.advanceLesson(cliModule, cliLesson)
}

const submitCli = (state: CliState) =>
  useProgress.getState().submitExerciseAnswer(cliLesson, cliQuestion.id, { kind: 'cli', state })

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})

describe('nội dung có bài CLI vẫn parse qua schema chuẩn', () => {
  it('bài CLI là một câu hỏi bình thường trong bước Làm, đủ 6 bước', () => {
    expect(cliLesson.steps[3].exercises[0]!.question.kind).toBe('cli')
    expect(cliLesson.steps.map((s) => s.type)).toEqual(['hook', 'pretest', 'teach', 'practice', 'retrieval', 'summary'])
  })

  it('id câu cli vào chung sổ id với mọi câu khác', () => {
    expect(startLesson(cliLesson).exercises[cliQuestion.id]).toEqual({
      failCount: 0,
      solved: false,
      usedSolution: false,
    })
  })
})

describe('chấm qua đúng đường của mọi câu hỏi', () => {
  it('phiên đạt mục tiêu → câu được tính xong; chưa gõ gì → chưa xong, thang lên tầng', () => {
    walkToPractice()
    expect(submitCli(UNTOUCHED)).toMatchObject({ correct: false, tier: 1 })
    expect(submitCli(SOLVED)).toMatchObject({ correct: true, solved: true })
  })

  it('THANG 3 TẦNG chạy y hệt câu gõ tay; xem lời giải rồi vẫn phải tự làm được', () => {
    walkToPractice()
    expect(submitCli(UNTOUCHED).tier).toBe(1)
    expect(submitCli(UNTOUCHED).tier).toBe(2)
    expect(submitCli(UNTOUCHED).tier).toBe(3)
    expect(useProgress.getState().lessonRuntimes['bai-2']!.exercises[cliQuestion.id]!.usedSolution).toBe(true)
    expect(submitCli(SOLVED).solved).toBe(true)
  })
})

describe('cổng qua bước + XP (nguyên tắc 5)', () => {
  it('chưa giải thì không qua bước; giải xong qua bước cộng đúng XP bước Làm', () => {
    walkToPractice()
    submitCli(UNTOUCHED)
    const rt = useProgress.getState().lessonRuntimes['bai-2']!
    expect(currentStepType(rt, cliLesson)).toBe('practice')
    expect(canAdvance(rt, cliLesson)).toBe(false)

    submitCli(SOLVED)
    useProgress.getState().advanceLesson(cliModule, cliLesson)
    expect(useProgress.getState().xpTotal).toBe(XP_AMOUNTS.practice)
    expect(useProgress.getState().streak.current).toBe(1)
  })

  it('nộp hỏng không cộng điểm; mỗi lượt vào lịch sử trả lời', () => {
    walkToPractice()
    submitCli(UNTOUCHED)
    submitCli(SOLVED)
    expect(useProgress.getState().xpTotal).toBe(0) // chưa advance
    expect(useProgress.getState().answerHistory.map((h) => h.correct)).toEqual([false, true])
  })
})
