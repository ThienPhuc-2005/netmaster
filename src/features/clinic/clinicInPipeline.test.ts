// Bài có CA BỆNH PHÒNG KHÁM đi trọn pipeline 6 bước.
//
// Cùng phép thử kiến trúc với labInPipeline: nếu ca bệnh thật sự chỉ là
// "một dạng câu hỏi khác" (dạng thứ sáu), thì máy trạng thái, thang phản
// hồi 3 tầng, XP, streak phải chạy y hệt mà KHÔNG sửa `lessonMachine.ts`
// một dòng nào. File này khóa lời hứa đó — và khóa thêm luật riêng của
// phòng khám: chấm HAI phần, đúng một nửa vẫn là chưa xong.

import { beforeEach, describe, expect, it } from 'vitest'
import { useProgress } from '../../store/progress'
import { parseModule } from '../../engine/contentSchema'
import { canAdvance, currentStepType, startLesson } from '../../engine/lessonMachine'
import { XP_AMOUNTS } from '../../engine/xp'
import { makeLesson, makeValidModule } from '../../../tests/fixtures/moduleFixture'
import type { Topology } from '../../engine/lab'

const INITIAL = useProgress.getInitialState()

/** Module hợp lệ trong đó bài 2 có bước Làm là một ca bệnh phòng khám. */
function moduleWithClinic() {
  const base = makeValidModule()
  return parseModule({
    ...base,
    lessons: base.lessons.map((lesson) =>
      lesson.id === 'bai-2'
        ? makeLesson('bai-2', { fadingLevel: 1, conceptIds: ['port'], clinicPractice: true })
        : lesson,
    ),
  })
}

const clinicModule = moduleWithClinic()
const clinicLesson = clinicModule.lessons.find((l) => l.id === 'bai-2')!
const clinicQuestion = clinicLesson.steps[3].exercises[0]!.question
const clinicQuestionId = clinicQuestion.id

if (clinicQuestion.kind !== 'clinic' || clinicQuestion.spec.fix.kind !== 'edit-network') {
  throw new Error('fixture hỏng: bài 2 phải mang ca bệnh sửa-sơ-đồ')
}
/** Sơ đồ đã chữa khỏi (lời giải tham chiếu của ca) và sơ đồ còn ốm. */
const CURED: Topology = clinicQuestion.spec.fix.solution
const STILL_SICK: Topology = clinicQuestion.spec.patient.topology
const RIGHT_DIAGNOSIS = clinicQuestion.diagnosis.answerIndex
const WRONG_DIAGNOSIS = (RIGHT_DIAGNOSIS + 1) % clinicQuestion.diagnosis.choices.length

/** Đưa runtime tới đúng bước Làm (hook → pretest → dạy → làm). */
function walkToPractice() {
  const store = useProgress.getState()
  store.beginLesson(clinicLesson)
  store.advanceLesson(clinicModule, clinicLesson) // hook → pretest
  const pretestId = clinicLesson.steps[1].questions[0]!.id
  store.answerPretestQ(clinicLesson, pretestId, { kind: 'mcq', choiceIndex: 0 })
  store.advanceLesson(clinicModule, clinicLesson) // pretest → teach
  store.advanceLesson(clinicModule, clinicLesson) // teach → practice (1 màn nên đã ở cuối)
  return useProgress.getState()
}

const submitClinic = (diagnosisIndex: number, topology: Topology) =>
  useProgress.getState().submitExerciseAnswer(clinicLesson, clinicQuestionId, {
    kind: 'clinic',
    diagnosisIndex,
    fix: { kind: 'edit-network', topology },
  })

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})

describe('nội dung có ca bệnh vẫn parse qua schema chuẩn', () => {
  it('ca bệnh là một câu hỏi bình thường trong bước Làm', () => {
    expect(clinicLesson.steps[3].exercises[0]!.question.kind).toBe('clinic')
  })

  it('vẫn đủ 6 bước đúng thứ tự — tuple không đổi', () => {
    expect(clinicLesson.steps.map((s) => s.type)).toEqual([
      'hook',
      'pretest',
      'teach',
      'practice',
      'retrieval',
      'summary',
    ])
  })

  it('id câu clinic vào chung sổ id với mọi câu khác', () => {
    const runtime = startLesson(clinicLesson)
    expect(runtime.exercises[clinicQuestionId]).toEqual({ failCount: 0, solved: false, usedSolution: false })
  })
})

describe('chấm HAI PHẦN qua đúng đường của mọi câu hỏi', () => {
  it('chẩn đoán đúng + sửa khỏi bệnh thì câu được tính là xong', () => {
    walkToPractice()
    const result = submitClinic(RIGHT_DIAGNOSIS, CURED)
    expect(result.correct).toBe(true)
    expect(result.solved).toBe(true)
  })

  it('chẩn đoán đúng mà chưa sửa thì vẫn chưa xong, thang lên tầng 1', () => {
    walkToPractice()
    const result = submitClinic(RIGHT_DIAGNOSIS, STILL_SICK)
    expect(result.correct).toBe(false)
    expect(result.tier).toBe(1)
  })

  it('SỬA ĐÚNG mà GỌI SAI TÊN BỆNH cũng chưa xong — hai phần là một lượt', () => {
    walkToPractice()
    expect(submitClinic(WRONG_DIAGNOSIS, CURED).correct).toBe(false)
  })

  it('THANG 3 TẦNG chạy y hệt câu gõ tay: sai lần 3 mới mở lời giải', () => {
    walkToPractice()
    expect(submitClinic(RIGHT_DIAGNOSIS, STILL_SICK).tier).toBe(1)
    expect(submitClinic(RIGHT_DIAGNOSIS, STILL_SICK).tier).toBe(2)
    expect(submitClinic(RIGHT_DIAGNOSIS, STILL_SICK).tier).toBe(3)
    expect(useProgress.getState().lessonRuntimes['bai-2']!.exercises[clinicQuestionId]!.usedSolution).toBe(true)
  })

  it('xem lời giải rồi vẫn phải TỰ CHỮA ĐƯỢC thì câu mới tính xong', () => {
    walkToPractice()
    submitClinic(RIGHT_DIAGNOSIS, STILL_SICK)
    submitClinic(RIGHT_DIAGNOSIS, STILL_SICK)
    submitClinic(RIGHT_DIAGNOSIS, STILL_SICK)
    expect(useProgress.getState().lessonRuntimes['bai-2']!.exercises[clinicQuestionId]!.solved).toBe(false)

    expect(submitClinic(RIGHT_DIAGNOSIS, CURED).solved).toBe(true)
  })
})

describe('cánh cổng qua bước không đổi', () => {
  it('chưa chữa xong thì KHÔNG qua bước được — không có đường tắt', () => {
    walkToPractice()
    submitClinic(RIGHT_DIAGNOSIS, STILL_SICK)
    const runtime = useProgress.getState().lessonRuntimes['bai-2']!
    expect(currentStepType(runtime, clinicLesson)).toBe('practice')
    expect(canAdvance(runtime, clinicLesson)).toBe(false)
  })

  it('chữa xong thì mở đường qua bước Nhớ lại', () => {
    walkToPractice()
    submitClinic(RIGHT_DIAGNOSIS, CURED)
    expect(canAdvance(useProgress.getState().lessonRuntimes['bai-2']!, clinicLesson)).toBe(true)
  })
})

describe('XP và streak (nguyên tắc 5)', () => {
  it('chữa xong và qua bước thì cộng đúng XP của bước Làm', () => {
    walkToPractice()
    submitClinic(RIGHT_DIAGNOSIS, CURED)
    useProgress.getState().advanceLesson(clinicModule, clinicLesson)

    const state = useProgress.getState()
    expect(state.xpTotal).toBe(XP_AMOUNTS.practice)
    expect(state.moduleXp['module-1']).toBe(XP_AMOUNTS.practice)
    expect(state.streak.current).toBe(1)
  })

  it('NỘP HỎNG KHÔNG CỘNG ĐIỂM: thử bao nhiêu lần cũng không sinh XP', () => {
    walkToPractice()
    submitClinic(RIGHT_DIAGNOSIS, STILL_SICK)
    submitClinic(WRONG_DIAGNOSIS, CURED)
    expect(useProgress.getState().xpTotal).toBe(0)
  })

  it('mỗi lượt nộp được ghi vào lịch sử trả lời (nguyên liệu flow engine)', () => {
    walkToPractice()
    submitClinic(RIGHT_DIAGNOSIS, STILL_SICK)
    submitClinic(RIGHT_DIAGNOSIS, CURED)
    expect(useProgress.getState().answerHistory.map((h) => h.correct)).toEqual([false, true])
  })
})
