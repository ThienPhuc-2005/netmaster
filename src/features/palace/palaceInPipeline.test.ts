// Bài có CUNG ĐIỆN KÝ ỨC đi trọn pipeline 6 bước.
//
// Phép thử kiến trúc y hệt cái đã làm với phòng lab: nếu chuyến đi lại
// từ trí nhớ thật sự chỉ là "một dạng câu hỏi khác", thì máy trạng thái,
// thang 3 tầng, XP, streak và Hộp ôn tập phải chạy nguyên mà
// `lessonMachine.ts` KHÔNG bị sửa một dòng nào.

import { beforeEach, describe, expect, it } from 'vitest'
import { useProgress } from '../../store/progress'
import { parseModule } from '../../engine/contentSchema'
import { canAdvance, currentStepType } from '../../engine/lessonMachine'
import { XP_AMOUNTS } from '../../engine/xp'
import { palaceCardId } from '../../engine/palace'
import type { RoomOutcome } from '../../engine/palace'
import { PALACE_FLOOR_1, makeModuleWithPalace } from '../../../tests/fixtures/moduleFixture'

const INITIAL = useProgress.getInitialState()

const palaceModule = parseModule(makeModuleWithPalace())
const lesson = palaceModule.lessons.find((l) => l.id === 'bai-1')!
const practiceQuestion = lesson.steps[3].exercises[0]!.question
const typedRetrieval = lesson.steps[4].questions.find((e) => e.question.kind === 'typed')!.question
const walkQuestion = lesson.steps[4].questions.find((e) => e.question.kind === 'palace-walk')!.question

/** Kết quả một chuyến đi trọn vẹn: nhớ hết, không phải mở đáp án lần nào. */
function perfectWalk(): RoomOutcome[] {
  return PALACE_FLOOR_1.map((roomId) => ({ roomId, failCount: 0, usedSolution: false }))
}

/** Đưa runtime tới bước Nhớ lại (hook → pretest → dạy → làm → nhớ lại). */
function walkToRetrieval() {
  const store = useProgress.getState()
  store.beginLesson(lesson)
  store.advanceLesson(palaceModule, lesson) // hook → pretest
  store.answerPretestQ(lesson, lesson.steps[1].questions[0]!.id, { kind: 'mcq', choiceIndex: 0 })
  store.advanceLesson(palaceModule, lesson) // pretest → teach
  // Bài 1 dạy 2 khái niệm nên có 2 màn; xem hết rồi mới qua bước.
  useProgress.getState().nextTeachScreen(lesson)
  useProgress.getState().advanceLesson(palaceModule, lesson) // teach → practice
  if (practiceQuestion.kind === 'typed') {
    useProgress
      .getState()
      .submitExerciseAnswer(lesson, practiceQuestion.id, { kind: 'typed', text: practiceQuestion.accept[0]! })
  }
  useProgress.getState().advanceLesson(palaceModule, lesson) // practice → retrieval
}

const submitWalk = (outcomes: RoomOutcome[]) =>
  useProgress.getState().submitExerciseAnswer(lesson, walkQuestion.id, { kind: 'palace-walk', outcomes })

/** Khép nốt bước Nhớ lại: câu gõ tay + bài tự giải thích. */
function finishRetrieval() {
  const store = useProgress.getState()
  if (typedRetrieval.kind === 'typed') {
    store.submitExerciseAnswer(lesson, typedRetrieval.id, { kind: 'typed', text: typedRetrieval.accept[0]! })
  }
  store.submitSelfExplainText(lesson, lesson.steps[4].selfExplain.exampleAnswer.vi)
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})

describe('cung điện nằm gọn trong pipeline sẵn có', () => {
  it('đứng ở bước Nhớ lại và có đủ hai câu: gõ tay + đi lại cung điện', () => {
    walkToRetrieval()
    const runtime = useProgress.getState().lessonRuntimes['bai-1']!
    expect(currentStepType(runtime, lesson)).toBe('retrieval')
    expect(lesson.steps[4].questions.map((e) => e.question.kind)).toEqual(['typed', 'palace-walk'])
  })

  it('câu cung điện có ô trạng thái riêng trong runtime như mọi câu khác', () => {
    walkToRetrieval()
    const runtime = useProgress.getState().lessonRuntimes['bai-1']!
    expect(runtime.exercises[walkQuestion.id]).toEqual({ failCount: 0, solved: false, usedSolution: false })
  })
})

describe('chấm chuyến đi qua đúng đường của mọi câu hỏi', () => {
  it('đi trọn và tự nhớ ra hết thì câu tính là xong', () => {
    walkToRetrieval()
    const result = submitWalk(perfectWalk())
    expect(result.correct).toBe(true)
    expect(result.solved).toBe(true)
  })

  it('quên một nhịp rồi tự nhớ ra vẫn tính là xong', () => {
    walkToRetrieval()
    const outcomes = perfectWalk()
    outcomes[1] = { ...outcomes[1]!, failCount: 2 }
    expect(submitWalk(outcomes).correct).toBe(true)
  })

  it('phải mở đáp án ở một phòng thì lượt đó chưa đạt', () => {
    walkToRetrieval()
    const outcomes = perfectWalk()
    outcomes[0] = { ...outcomes[0]!, failCount: 3, usedSolution: true }
    expect(submitWalk(outcomes).correct).toBe(false)
  })

  it('đi thiếu phòng không được tính là đi trọn', () => {
    walkToRetrieval()
    expect(submitWalk(perfectWalk().slice(0, 2)).correct).toBe(false)
  })

  it('đi đúng số phòng nhưng sai phòng cũng không đạt', () => {
    walkToRetrieval()
    const outcomes = perfectWalk()
    outcomes[2] = { roomId: 'r-ssh', failCount: 0, usedSolution: false }
    expect(submitWalk(outcomes).correct).toBe(false)
  })

  it('THANG 3 TẦNG chạy y hệt câu gõ tay', () => {
    walkToRetrieval()
    const short = perfectWalk().slice(0, 1)
    expect(submitWalk(short).tier).toBe(1)
    expect(submitWalk(short).tier).toBe(2)
    expect(submitWalk(short).tier).toBe(3)
    expect(useProgress.getState().lessonRuntimes['bai-1']!.exercises[walkQuestion.id]!.usedSolution).toBe(true)
    // Xem lời giải rồi vẫn phải tự đi lại được thì câu mới xong.
    expect(submitWalk(perfectWalk()).solved).toBe(true)
  })
})

describe('cánh cổng qua bước, XP và Hộp ôn tập', () => {
  it('chưa đi trọn cung điện thì chưa qua được bước Nhớ lại', () => {
    walkToRetrieval()
    finishRetrieval()
    const runtime = useProgress.getState().lessonRuntimes['bai-1']!
    expect(canAdvance(runtime, lesson)).toBe(false)
  })

  it('xong cả bước thì cộng đúng XP của bước Nhớ lại (nguyên tắc 5)', () => {
    walkToRetrieval()
    const xpBefore = useProgress.getState().xpTotal
    finishRetrieval()
    submitWalk(perfectWalk())
    useProgress.getState().advanceLesson(palaceModule, lesson)
    expect(useProgress.getState().xpTotal).toBe(xpBefore + XP_AMOUNTS.retrieval)
  })

  it('nộp hỏng bao nhiêu lần cũng không sinh XP', () => {
    walkToRetrieval()
    const xpBefore = useProgress.getState().xpTotal
    submitWalk([])
    submitWalk(perfectWalk().slice(0, 1))
    expect(useProgress.getState().xpTotal).toBe(xpBefore)
  })

  it('học xong bài thì mỗi phòng đã đi xem thành MỘT thẻ ôn riêng', () => {
    walkToRetrieval()
    finishRetrieval()
    submitWalk(perfectWalk())
    useProgress.getState().advanceLesson(palaceModule, lesson) // retrieval → summary
    useProgress.getState().advanceLesson(palaceModule, lesson) // summary → xong

    const ids = useProgress.getState().reviewCards.map((c) => c.conceptId)
    for (const roomId of PALACE_FLOOR_1) expect(ids).toContain(palaceCardId(roomId))
    // Thẻ khái niệm của bài vẫn sinh như cũ — hai loại thẻ sống chung hộp.
    expect(ids).toContain('goi-tin')
  })

  it('học lại bài không sinh thêm thẻ phòng lần hai', () => {
    walkToRetrieval()
    finishRetrieval()
    submitWalk(perfectWalk())
    useProgress.getState().advanceLesson(palaceModule, lesson)
    useProgress.getState().advanceLesson(palaceModule, lesson)
    const first = useProgress.getState().reviewCards.length

    walkToRetrieval()
    finishRetrieval()
    submitWalk(perfectWalk())
    useProgress.getState().advanceLesson(palaceModule, lesson)
    useProgress.getState().advanceLesson(palaceModule, lesson)
    expect(useProgress.getState().reviewCards).toHaveLength(first)
  })
})
