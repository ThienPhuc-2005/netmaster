// Bài có LAB đi trọn pipeline 6 bước.
//
// Đây là phép thử kiến trúc của cả hạng mục: nếu lab thật sự chỉ là "một
// dạng câu hỏi khác", thì máy trạng thái, thang phản hồi 3 tầng, XP,
// streak và flashcard phải chạy y hệt mà KHÔNG sửa `lessonMachine.ts`
// một dòng nào. File này khóa lời hứa đó lại.

import { beforeEach, describe, expect, it } from 'vitest'
import { useProgress } from '../../store/progress'
import { parseModule } from '../../engine/contentSchema'
import { canAdvance, currentStepType, startLesson } from '../../engine/lessonMachine'
import { XP_AMOUNTS } from '../../engine/xp'
import { makeLesson, makeValidModule } from '../../../tests/fixtures/moduleFixture'
import { teamsAllOneVlan, teamsFixed, teamsNetwork } from '../../../tests/fixtures/labFixture'
import type { Topology } from '../../engine/lab'

const INITIAL = useProgress.getInitialState()

/** Module hợp lệ trong đó bài 2 có bước Làm là một phòng lab. */
function moduleWithLab() {
  const base = makeValidModule()
  return parseModule({
    ...base,
    lessons: base.lessons.map((lesson) =>
      lesson.id === 'bai-2' ? makeLesson('bai-2', { fadingLevel: 1, conceptIds: ['port'], labPractice: true }) : lesson,
    ),
  })
}

const labModule = moduleWithLab()
const labLesson = labModule.lessons.find((l) => l.id === 'bai-2')!
const labQuestionId = labLesson.steps[3].exercises[0]!.question.id

/** Đưa runtime tới đúng bước Làm (hook → pretest → dạy → làm). */
function walkToPractice() {
  const store = useProgress.getState()
  store.beginLesson(labLesson)
  store.advanceLesson(labModule, labLesson) // hook → pretest
  const pretestId = labLesson.steps[1].questions[0]!.id
  store.answerPretestQ(labLesson, pretestId, { kind: 'mcq', choiceIndex: 0 })
  store.advanceLesson(labModule, labLesson) // pretest → teach
  store.advanceLesson(labModule, labLesson) // teach → practice (1 màn nên đã ở cuối)
  return useProgress.getState()
}

const submitLab = (topology: Topology) =>
  useProgress.getState().submitExerciseAnswer(labLesson, labQuestionId, { kind: 'lab', topology })

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})

describe('nội dung có lab vẫn parse qua schema chuẩn', () => {
  it('bài lab là một câu hỏi bình thường trong bước Làm', () => {
    expect(labLesson.steps[3].exercises[0]!.question.kind).toBe('lab')
  })

  it('vẫn đủ 6 bước đúng thứ tự — tuple không đổi', () => {
    expect(labLesson.steps.map((s) => s.type)).toEqual([
      'hook',
      'pretest',
      'teach',
      'practice',
      'retrieval',
      'summary',
    ])
  })

  it('id câu lab vào chung sổ id với mọi câu khác', () => {
    const runtime = startLesson(labLesson)
    expect(runtime.exercises[labQuestionId]).toEqual({ failCount: 0, solved: false, usedSolution: false })
  })
})

describe('chấm lab qua đúng đường của mọi câu hỏi', () => {
  it('sơ đồ đúng thì câu được tính là xong', () => {
    walkToPractice()
    const result = submitLab(teamsFixed())
    expect(result.correct).toBe(true)
    expect(result.solved).toBe(true)
  })

  it('sơ đồ chưa sửa thì chưa xong, và thang phản hồi lên tầng 1', () => {
    walkToPractice()
    const result = submitLab(teamsNetwork())
    expect(result.correct).toBe(false)
    expect(result.solved).toBe(false)
    expect(result.tier).toBe(1)
  })

  it('LỜI GIẢI RẺ TIỀN gộp hết vào một VLAN cũng bị chấm là chưa xong', () => {
    walkToPractice()
    expect(submitLab(teamsAllOneVlan()).correct).toBe(false)
  })

  it('THANG 3 TẦNG chạy y hệt câu gõ tay: sai lần 3 mới mở lời giải', () => {
    walkToPractice()
    expect(submitLab(teamsNetwork()).tier).toBe(1)
    expect(submitLab(teamsNetwork()).tier).toBe(2)
    expect(submitLab(teamsNetwork()).tier).toBe(3)
    expect(useProgress.getState().lessonRuntimes['bai-2']!.exercises[labQuestionId]!.usedSolution).toBe(true)
  })

  it('xem lời giải rồi vẫn phải TỰ SỬA ĐƯỢC thì câu mới tính xong (generation effect)', () => {
    walkToPractice()
    submitLab(teamsNetwork())
    submitLab(teamsNetwork())
    submitLab(teamsNetwork())
    const runtime = useProgress.getState().lessonRuntimes['bai-2']!
    expect(runtime.exercises[labQuestionId]!.solved).toBe(false)

    expect(submitLab(teamsFixed()).solved).toBe(true)
  })
})

describe('cánh cổng qua bước không đổi', () => {
  it('chưa giải lab thì KHÔNG qua bước được — không có đường tắt', () => {
    walkToPractice()
    submitLab(teamsNetwork())
    const runtime = useProgress.getState().lessonRuntimes['bai-2']!
    expect(currentStepType(runtime, labLesson)).toBe('practice')
    expect(canAdvance(runtime, labLesson)).toBe(false)
  })

  it('giải xong lab thì mở đường qua bước Nhớ lại', () => {
    walkToPractice()
    submitLab(teamsFixed())
    const runtime = useProgress.getState().lessonRuntimes['bai-2']!
    expect(canAdvance(runtime, labLesson)).toBe(true)
  })
})

describe('XP và streak (nguyên tắc 5)', () => {
  it('giải lab xong và qua bước thì cộng đúng XP của bước Làm', () => {
    walkToPractice()
    submitLab(teamsFixed())
    useProgress.getState().advanceLesson(labModule, labLesson)

    const state = useProgress.getState()
    expect(state.xpTotal).toBe(XP_AMOUNTS.practice)
    expect(state.moduleXp['module-1']).toBe(XP_AMOUNTS.practice)
    expect(state.streak.current).toBe(1)
  })

  it('NỘP HỎNG KHÔNG CỘNG ĐIỂM: thử bao nhiêu lần cũng không sinh XP', () => {
    walkToPractice()
    submitLab(teamsNetwork())
    submitLab(teamsAllOneVlan())
    submitLab(teamsNetwork())
    expect(useProgress.getState().xpTotal).toBe(0)
  })

  it('mỗi lượt nộp lab được ghi vào lịch sử trả lời (nguyên liệu flow engine)', () => {
    walkToPractice()
    submitLab(teamsNetwork())
    submitLab(teamsFixed())
    const history = useProgress.getState().answerHistory
    expect(history.map((h) => h.correct)).toEqual([false, true])
  })
})
