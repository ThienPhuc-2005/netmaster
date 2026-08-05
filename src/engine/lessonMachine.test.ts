import { describe, expect, it } from 'vitest'
import { LessonSchema, type Lesson } from './contentSchema'
import {
  advance,
  answerPretest,
  canAdvance,
  conceptsLearned,
  confirmSelfExplainRead,
  currentStepType,
  feedbackTier,
  seeNextTeachScreen,
  startLesson,
  submitExercise,
  submitSelfExplain,
  type LessonRuntime,
} from './lessonMachine'

// ---------------------------------------------------------------
// Fixture: một bài học hợp lệ tối thiểu, parse qua LessonSchema để chắc
// chắn test chạy trên nội dung đúng "hợp đồng" thật.
// ---------------------------------------------------------------

const lt = (s: string) => ({ vi: s })

function typed(id: string) {
  return { kind: 'typed', id, prompt: lt(`câu hỏi ${id}`), accept: ['x'], hintTopic: lt(`chủ đề ${id}`) }
}

function ex(id: string) {
  return { question: typed(id), hint: lt(`gợi ý ${id}`), solution: lt(`lời giải ${id}`) }
}

function makeLesson(conceptIds: string[] = ['c1', 'c2']): Lesson {
  return LessonSchema.parse({
    id: 'lesson-1',
    missionTitle: lt('Giải cứu gói tin bị lạc'),
    steps: [
      { type: 'hook', question: lt('Tại sao gói tin biết đường đi?') },
      {
        type: 'pretest',
        questions: [
          {
            kind: 'mcq',
            id: 'pre1',
            prompt: lt('IP dùng để làm gì?'),
            choices: [lt('định danh'), lt('truyền điện')],
            answerIndex: 0,
          },
          typed('pre2'),
        ],
        encouragement: lt('Sai là bình thường — não bạn vừa được mồi.'),
      },
      {
        type: 'teach',
        screens: conceptIds.map((cid, i) => ({ conceptId: cid, visualId: `v${i}`, body: lt(`màn dạy ${i}`) })),
      },
      { type: 'practice', fadingLevel: 0, workedExample: lt('ví dụ giải sẵn'), exercises: [ex('p1'), ex('p2')] },
      {
        type: 'retrieval',
        questions: [ex('r1')],
        selfExplain: {
          prompt: lt('Giải thích bằng lời của bạn'),
          keywords: [['gói tin', 'packet']],
          exampleAnswer: lt('câu trả lời mẫu'),
        },
      },
      { type: 'summary', bullets: [lt('ý 1'), lt('ý 2'), lt('ý 3')], nextTeaser: lt('Bài sau: gateway là ai?') },
    ],
  })
}

// Walk helpers — mỗi helper dừng NGAY khi vừa vào bước đích.
function atPretest(l: Lesson): LessonRuntime {
  return advance(startLesson(l), l)
}
function atTeach(l: Lesson): LessonRuntime {
  let rt = atPretest(l)
  rt = answerPretest(rt, l, 'pre1', false)
  rt = answerPretest(rt, l, 'pre2', false)
  return advance(rt, l)
}
function atPractice(l: Lesson): LessonRuntime {
  let rt = atTeach(l)
  for (let i = 0; i < l.steps[2].screens.length - 1; i++) rt = seeNextTeachScreen(rt, l)
  return advance(rt, l)
}
function atRetrieval(l: Lesson): LessonRuntime {
  let rt = atPractice(l)
  rt = submitExercise(rt, l, 'p1', true).runtime
  rt = submitExercise(rt, l, 'p2', true).runtime
  return advance(rt, l)
}

describe('feedbackTier', () => {
  it('0 sai → 0; 1 → 1; 2 → 2; từ 3 trở lên → 3', () => {
    expect(feedbackTier(0)).toBe(0)
    expect(feedbackTier(1)).toBe(1)
    expect(feedbackTier(2)).toBe(2)
    expect(feedbackTier(3)).toBe(3)
    expect(feedbackTier(7)).toBe(3)
  })

  it('failCount âm hoặc không nguyên → ném lỗi', () => {
    expect(() => feedbackTier(-1)).toThrow(/non-negative integer/)
    expect(() => feedbackTier(1.5)).toThrow(/non-negative integer/)
  })
})

describe('startLesson', () => {
  it('khởi tạo tại hook, đủ entry exercises cho mọi câu practice + retrieval', () => {
    const l = makeLesson()
    const rt = startLesson(l)
    expect(rt.lessonId).toBe('lesson-1')
    expect(rt.stepIndex).toBe(0)
    expect(currentStepType(rt, l)).toBe('hook')
    expect(rt.teachScreenIndex).toBe(0)
    expect(rt.pretestAnswers).toEqual({})
    expect(rt.exercises).toEqual({
      p1: { failCount: 0, solved: false, usedSolution: false },
      p2: { failCount: 0, solved: false, usedSolution: false },
      r1: { failCount: 0, solved: false, usedSolution: false },
    })
    expect(rt.selfExplain).toEqual({ attempts: 0, passed: false, done: false })
    expect(rt.completed).toBe(false)
  })
})

describe('hook', () => {
  it('luôn qua được — đọc xong bấm tiếp', () => {
    const l = makeLesson()
    const rt = startLesson(l)
    expect(canAdvance(rt, l)).toBe(true)
    expect(currentStepType(advance(rt, l), l)).toBe('pretest')
  })
})

describe('pretest', () => {
  it('còn câu chưa trả lời → không qua được, advance ném lỗi', () => {
    const l = makeLesson()
    const rt = atPretest(l)
    expect(canAdvance(rt, l)).toBe(false)
    expect(() => advance(rt, l)).toThrow(/no skip path/)

    const half = answerPretest(rt, l, 'pre1', true)
    expect(canAdvance(half, l)).toBe(false)
    expect(() => advance(half, l)).toThrow(/no skip path/)
  })

  it('trả lời SAI hết vẫn qua được — pretest không phạt', () => {
    const l = makeLesson()
    let rt = atPretest(l)
    rt = answerPretest(rt, l, 'pre1', false)
    rt = answerPretest(rt, l, 'pre2', false)
    expect(rt.pretestAnswers).toEqual({ pre1: false, pre2: false })
    expect(canAdvance(rt, l)).toBe(true)
    expect(currentStepType(advance(rt, l), l)).toBe('teach')
  })

  it('questionId lạ → ném lỗi', () => {
    const l = makeLesson()
    expect(() => answerPretest(atPretest(l), l, 'khong-ton-tai', true)).toThrow(/unknown pretest question/)
  })

  it('trả lời lại cùng câu → ghi đè, vẫn chỉ tính là một câu đã trả lời', () => {
    const l = makeLesson()
    let rt = atPretest(l)
    rt = answerPretest(rt, l, 'pre1', false)
    rt = answerPretest(rt, l, 'pre1', true)
    expect(rt.pretestAnswers).toEqual({ pre1: true })
    expect(canAdvance(rt, l)).toBe(false) // pre2 vẫn chưa trả lời
  })

  it('thuần: không mutate runtime đầu vào', () => {
    const l = makeLesson()
    const before = atPretest(l)
    answerPretest(before, l, 'pre1', true)
    expect(before.pretestAnswers).toEqual({})
  })
})

describe('teach', () => {
  it('chưa xem hết màn → không qua được', () => {
    const l = makeLesson()
    const rt = atTeach(l)
    expect(currentStepType(rt, l)).toBe('teach')
    expect(canAdvance(rt, l)).toBe(false)
    expect(() => advance(rt, l)).toThrow(/no skip path/)
  })

  it('xem đến màn cuối → qua được; index chặn trần ở màn cuối', () => {
    const l = makeLesson() // 2 màn dạy
    let rt = atTeach(l)
    rt = seeNextTeachScreen(rt, l)
    expect(rt.teachScreenIndex).toBe(1)
    expect(canAdvance(rt, l)).toBe(true)
    rt = seeNextTeachScreen(rt, l) // bấm thêm không vượt trần
    expect(rt.teachScreenIndex).toBe(1)
    expect(currentStepType(advance(rt, l), l)).toBe('practice')
  })

  it('bài chỉ có 1 màn dạy → qua được ngay (màn 0 là màn cuối)', () => {
    const l = makeLesson(['c1'])
    const rt = atTeach(l)
    expect(canAdvance(rt, l)).toBe(true)
  })
})

describe('practice — submitExercise', () => {
  it('sai lần 1 → tier 1, lần 2 → tier 2, lần 3 → tier 3 + usedSolution', () => {
    const l = makeLesson()
    let rt = atPractice(l)

    const first = submitExercise(rt, l, 'p1', false)
    expect(first.tier).toBe(1)
    expect(first.solved).toBe(false)
    expect(first.runtime.exercises['p1']).toEqual({ failCount: 1, solved: false, usedSolution: false })

    const second = submitExercise(first.runtime, l, 'p1', false)
    expect(second.tier).toBe(2)
    expect(second.runtime.exercises['p1']?.usedSolution).toBe(false)

    const third = submitExercise(second.runtime, l, 'p1', false)
    expect(third.tier).toBe(3)
    expect(third.solved).toBe(false)
    // Sai lần 3: UI hiện lời giải, nhưng câu CHƯA xong — vẫn phải tự gõ lại.
    expect(third.runtime.exercises['p1']).toEqual({ failCount: 3, solved: false, usedSolution: true })
    expect(canAdvance(third.runtime, l)).toBe(false)
  })

  it('sau khi xem lời giải, gõ lại đáp án đúng thì câu mới tính xong (generation effect)', () => {
    const l = makeLesson()
    let rt = atPractice(l)
    for (let i = 0; i < 3; i++) rt = submitExercise(rt, l, 'p1', false).runtime
    const done = submitExercise(rt, l, 'p1', true)
    expect(done.solved).toBe(true)
    expect(done.runtime.exercises['p1']).toEqual({ failCount: 3, solved: true, usedSolution: true })
  })

  it('đúng ngay lần đầu → solved, tier 0, không dính usedSolution', () => {
    const l = makeLesson()
    const { runtime, tier, solved } = submitExercise(atPractice(l), l, 'p1', true)
    expect(solved).toBe(true)
    expect(tier).toBe(0)
    expect(runtime.exercises['p1']).toEqual({ failCount: 0, solved: true, usedSolution: false })
  })

  it('câu đã solved mà nộp tiếp → ném lỗi (chống farm XP)', () => {
    const l = makeLesson()
    const rt = submitExercise(atPractice(l), l, 'p1', true).runtime
    expect(() => submitExercise(rt, l, 'p1', true)).toThrow(/already solved/)
    expect(() => submitExercise(rt, l, 'p1', false)).toThrow(/already solved/)
  })

  it('còn câu chưa solved → không qua được; solved hết → sang retrieval', () => {
    const l = makeLesson()
    let rt = atPractice(l)
    rt = submitExercise(rt, l, 'p1', true).runtime
    expect(canAdvance(rt, l)).toBe(false)
    expect(() => advance(rt, l)).toThrow(/no skip path/)
    rt = submitExercise(rt, l, 'p2', true).runtime
    expect(canAdvance(rt, l)).toBe(true)
    expect(currentStepType(advance(rt, l), l)).toBe('retrieval')
  })

  it('nộp câu retrieval khi đang ở practice → ném lỗi (đóng nội dung đúng bước)', () => {
    const l = makeLesson()
    expect(() => submitExercise(atPractice(l), l, 'r1', true)).toThrow(/does not belong/)
  })

  it('questionId lạ → ném lỗi; nộp ở bước không có bài tập → ném lỗi', () => {
    const l = makeLesson()
    expect(() => submitExercise(atPractice(l), l, 'khong-ton-tai', true)).toThrow(/does not belong/)
    expect(() => submitExercise(startLesson(l), l, 'p1', true)).toThrow(/has no exercises/)
    expect(() => submitExercise(atTeach(l), l, 'p1', true)).toThrow(/has no exercises/)
  })

  it('thuần: runtime cũ giữ nguyên sau khi nộp', () => {
    const l = makeLesson()
    const before = atPractice(l)
    submitExercise(before, l, 'p1', false)
    expect(before.exercises['p1']).toEqual({ failCount: 0, solved: false, usedSolution: false })
  })
})

describe('retrieval — submitExercise + selfExplain', () => {
  it('nộp câu practice khi đang ở retrieval → ném lỗi', () => {
    const l = makeLesson()
    expect(() => submitExercise(atRetrieval(l), l, 'p1', true)).toThrow(/does not belong/)
  })

  it('mọi câu solved nhưng selfExplain chưa done → không qua được', () => {
    const l = makeLesson()
    const rt = submitExercise(atRetrieval(l), l, 'r1', true).runtime
    expect(canAdvance(rt, l)).toBe(false)
    expect(() => advance(rt, l)).toThrow(/no skip path/)
  })

  it('selfExplain done nhưng còn câu chưa solved → vẫn không qua được', () => {
    const l = makeLesson()
    const { runtime } = submitSelfExplain(atRetrieval(l), l, true)
    expect(canAdvance(runtime, l)).toBe(false)
  })

  it('selfExplain đạt ngay → passed + done, tier 0', () => {
    const l = makeLesson()
    const { runtime, tier } = submitSelfExplain(atRetrieval(l), l, true)
    expect(runtime.selfExplain).toEqual({ attempts: 0, passed: true, done: true })
    expect(tier).toBe(0)
  })

  it('trượt 3 lần → tier leo 1, 2, 3; đạt ở lần nộp sau vẫn passed', () => {
    const l = makeLesson()
    let rt = atRetrieval(l)
    const tiers: number[] = []
    for (let i = 0; i < 3; i++) {
      const res = submitSelfExplain(rt, l, false)
      tiers.push(res.tier)
      rt = res.runtime
    }
    expect(tiers).toEqual([1, 2, 3])
    expect(rt.selfExplain).toEqual({ attempts: 3, passed: false, done: false })
    // Đọc mẫu xong nhưng người học vẫn TỰ diễn đạt được → ghi nhận passed.
    const late = submitSelfExplain(rt, l, true)
    expect(late.runtime.selfExplain).toEqual({ attempts: 3, passed: true, done: true })
  })

  it('confirmSelfExplainRead trước tầng 3 → ném lỗi (không có đường tắt)', () => {
    const l = makeLesson()
    let rt = atRetrieval(l)
    expect(() => confirmSelfExplainRead(rt, l)).toThrow(/3 failed attempts/)
    rt = submitSelfExplain(rt, l, false).runtime
    rt = submitSelfExplain(rt, l, false).runtime
    expect(rt.selfExplain.attempts).toBe(2)
    expect(() => confirmSelfExplainRead(rt, l)).toThrow(/3 failed attempts/)
  })

  it('trượt 3 lần rồi confirmSelfExplainRead → done = true, passed GIỮ false', () => {
    const l = makeLesson()
    let rt = atRetrieval(l)
    for (let i = 0; i < 3; i++) rt = submitSelfExplain(rt, l, false).runtime
    rt = confirmSelfExplainRead(rt, l)
    expect(rt.selfExplain).toEqual({ attempts: 3, passed: false, done: true })
    // done rồi + mọi câu solved → khép được bước retrieval
    rt = submitExercise(rt, l, 'r1', true).runtime
    expect(canAdvance(rt, l)).toBe(true)
  })

  it('selfExplain đã done mà nộp/confirm tiếp → ném lỗi (chống farm)', () => {
    const l = makeLesson()
    const { runtime } = submitSelfExplain(atRetrieval(l), l, true)
    expect(() => submitSelfExplain(runtime, l, true)).toThrow(/already done/)
    expect(() => confirmSelfExplainRead(runtime, l)).toThrow(/already done/)
  })

  it('submitSelfExplain ngoài bước retrieval → ném lỗi', () => {
    const l = makeLesson()
    expect(() => submitSelfExplain(atPractice(l), l, true)).toThrow(/retrieval step/)
    expect(() => confirmSelfExplainRead(startLesson(l), l)).toThrow(/retrieval step/)
  })
})

describe('đi trọn pipeline 6 bước', () => {
  it('tuần tự hook → pretest → teach → practice → retrieval → summary → completed', () => {
    const l = makeLesson()
    let rt = startLesson(l)

    expect(currentStepType(rt, l)).toBe('hook')
    rt = advance(rt, l)

    expect(currentStepType(rt, l)).toBe('pretest')
    rt = answerPretest(rt, l, 'pre1', false)
    rt = answerPretest(rt, l, 'pre2', true)
    rt = advance(rt, l)

    expect(currentStepType(rt, l)).toBe('teach')
    rt = seeNextTeachScreen(rt, l)
    rt = advance(rt, l)

    expect(currentStepType(rt, l)).toBe('practice')
    rt = submitExercise(rt, l, 'p1', false).runtime // thử-sai trước vẫn hoàn thành được
    rt = submitExercise(rt, l, 'p1', true).runtime
    rt = submitExercise(rt, l, 'p2', true).runtime
    rt = advance(rt, l)

    expect(currentStepType(rt, l)).toBe('retrieval')
    rt = submitExercise(rt, l, 'r1', true).runtime
    rt = submitSelfExplain(rt, l, true).runtime
    rt = advance(rt, l)

    expect(currentStepType(rt, l)).toBe('summary')
    expect(rt.completed).toBe(false)
    expect(canAdvance(rt, l)).toBe(true)
    rt = advance(rt, l)

    expect(rt.completed).toBe(true)
    expect(rt.stepIndex).toBe(5) // stepIndex giữ 5, không tràn
  })

  it('bài đã completed: canAdvance false, advance ném lỗi — sự kiện hoàn thành chỉ bắn một lần', () => {
    const l = makeLesson()
    let rt = atRetrieval(l)
    rt = submitExercise(rt, l, 'r1', true).runtime
    rt = submitSelfExplain(rt, l, true).runtime
    rt = advance(rt, l) // → summary
    rt = advance(rt, l) // → completed
    expect(canAdvance(rt, l)).toBe(false)
    expect(() => advance(rt, l)).toThrow(/no skip path/)
  })
})

describe('conceptsLearned', () => {
  it('trả đúng danh sách concept được dạy, theo thứ tự màn dạy', () => {
    expect(conceptsLearned(makeLesson(['c1', 'c2']))).toEqual(['c1', 'c2'])
  })

  it('không trùng lặp dù concept xuất hiện ở nhiều màn', () => {
    // LessonSchema đơn lẻ không chặn màn trùng concept (ràng buộc đó nằm ở
    // cross-check cấp module) — engine vẫn phải khử trùng lặp phòng thủ.
    expect(conceptsLearned(makeLesson(['c1', 'c1', 'c2']))).toEqual(['c1', 'c2'])
  })
})

describe('guard đúng bước — không "làm trước" điều kiện qua bước', () => {
  it('answerPretest ngoài bước pretest → ném lỗi (trước là làm trước, sau là dữ liệu pretest giả)', () => {
    const l = makeLesson()
    expect(() => answerPretest(startLesson(l), l, 'pre1', true)).toThrow(/pretest step/)
    expect(() => answerPretest(atTeach(l), l, 'pre1', true)).toThrow(/pretest step/)
  })

  it('seeNextTeachScreen ngoài bước teach → ném lỗi (không "xem hộ" được màn dạy)', () => {
    const l = makeLesson()
    expect(() => seeNextTeachScreen(startLesson(l), l)).toThrow(/teach step/)
    expect(() => seeNextTeachScreen(atPretest(l), l)).toThrow(/teach step/)
    expect(() => seeNextTeachScreen(atPractice(l), l)).toThrow(/teach step/)
  })
})

describe('startLesson — trùng question id giữa practice và retrieval', () => {
  it('ném lỗi thay vì gộp 2 câu làm 1 (giải ở bước Làm sẽ "tự solved" câu retrieval)', () => {
    const l = makeLesson()
    const twisted = LessonSchema.parse({
      ...l,
      steps: [l.steps[0], l.steps[1], l.steps[2], l.steps[3], { ...l.steps[4], questions: [ex('p1')] }, l.steps[5]],
    })
    expect(() => startLesson(twisted)).toThrow(/duplicate question id "p1"/)
  })
})

describe('guard runtime/lesson', () => {
  it('runtime của bài khác → ném lỗi thay vì chạy sai âm thầm', () => {
    const l = makeLesson()
    const other: Lesson = { ...l, id: 'lesson-2' }
    const rt = startLesson(l)
    expect(() => currentStepType(rt, other)).toThrow(/mismatch/)
    expect(() => canAdvance(rt, other)).toThrow(/mismatch/)
    expect(() => answerPretest(rt, other, 'pre1', true)).toThrow(/mismatch/)
    expect(() => seeNextTeachScreen(rt, other)).toThrow(/mismatch/)
  })
})
