// Đọc lại sai lầm của người học — chạy trên nội dung thật.

import { describe, expect, it } from 'vitest'
import { loadModules } from '../content'
import { startLesson } from './lessonMachine'
import { analyzeMistakes, MIN_SAMPLE, weakSpots, weeklyActivity, weekStartOf } from './mistakeLog'
import type { DrillResult } from './types'
import type { LessonRuntime as Runtime } from './lessonMachine'

const modules = loadModules()
const firstModule = modules[0]!
const firstLesson = firstModule.lessons[0]!

/** Runtime của một bài với vài câu bị vấp. */
function runtimeWithFails(fails: Record<string, { failCount: number; usedSolution?: boolean }>): Runtime {
  const base = startLesson(firstLesson)
  const exercises = { ...base.exercises }
  for (const [id, v] of Object.entries(fails)) {
    exercises[id] = { failCount: v.failCount, solved: true, usedSolution: v.usedSolution ?? false }
  }
  return { ...base, exercises }
}

/** Id các câu vấp được của bài đầu (thử tay + nhớ lại). */
const questionIds = [
  ...firstLesson.steps[3].exercises.map((e) => e.question.id),
  ...firstLesson.steps[4].questions.map((e) => e.question.id),
]

describe('chỗ hay vấp', () => {
  it('chưa học gì thì danh sách rỗng — không bịa ra lỗ hổng', () => {
    expect(weakSpots(modules, {})).toEqual([])
  })

  it('câu làm đúng ngay KHÔNG vào danh sách (chỉ đếm chỗ vấp thật)', () => {
    const runtimes = { [firstLesson.id]: startLesson(firstLesson) }
    expect(weakSpots(modules, runtimes)).toEqual([])
  })

  it('vấp nhiều đứng trước, và trả về đủ đường quay lại bài', () => {
    const [a, b] = questionIds
    const runtimes = {
      [firstLesson.id]: runtimeWithFails({ [a!]: { failCount: 1 }, [b!]: { failCount: 3 } }),
    }
    const spots = weakSpots(modules, runtimes)
    expect(spots).toHaveLength(2)
    expect(spots[0]!.questionId, 'câu vấp 3 lần phải đứng trước').toBe(b)
    expect(spots[0]!.failCount).toBe(3)
    expect(spots[0]!.lessonId).toBe(firstLesson.id)
    expect(spots[0]!.moduleId).toBe(firstModule.id)
  })

  it('hòa số lần vấp thì câu phải MỞ LỜI GIẢI nặng hơn', () => {
    const [a, b] = questionIds
    const runtimes = {
      [firstLesson.id]: runtimeWithFails({
        [a!]: { failCount: 3 },
        [b!]: { failCount: 3, usedSolution: true },
      }),
    }
    expect(weakSpots(modules, runtimes)[0]!.questionId).toBe(b)
  })

  it('cắt đúng `limit` chỗ, không đổ cả danh sách dài ra màn hình', () => {
    const runtimes = {
      [firstLesson.id]: runtimeWithFails(
        Object.fromEntries(questionIds.map((id, i) => [id, { failCount: i + 1 }])),
      ),
    }
    expect(weakSpots(modules, runtimes, 2)).toHaveLength(2)
  })

  it('kết quả TẤT ĐỊNH: cùng dữ liệu vào thì cùng thứ tự ra', () => {
    const runtimes = {
      [firstLesson.id]: runtimeWithFails(Object.fromEntries(questionIds.map((id) => [id, { failCount: 2 }]))),
    }
    const once = weakSpots(modules, runtimes).map((s) => s.questionId)
    const twice = weakSpots(modules, runtimes).map((s) => s.questionId)
    expect(once).toEqual(twice)
  })
})

describe('nếp học theo tuần', () => {
  const drill = (date: string): DrillResult => ({ date, mode: 'subnet', correct: 8, total: 10, avgSeconds: 20 })

  it('mốc tuần luôn rơi vào thứ Hai, kể cả khi hôm đó là Chủ nhật', () => {
    // 2026-08-10 là thứ Hai; 2026-08-16 là Chủ nhật cùng tuần đó.
    expect(weekStartOf('2026-08-10')).toBe('2026-08-10')
    expect(weekStartOf('2026-08-16')).toBe('2026-08-10')
    expect(weekStartOf('2026-08-17'), 'sang thứ Hai kế là tuần mới').toBe('2026-08-17')
  })

  it('luôn trả đủ số cột, tuần nghỉ vẫn có cột 0 — khoảng trống là thứ đáng nhìn', () => {
    const weeks = weeklyActivity({}, [], '2026-08-10', 8)
    expect(weeks).toHaveLength(8)
    expect(weeks.every((w) => w.total === 0)).toBe(true)
    expect(weeks.at(-1)!.weekStart, 'cột cuối là tuần hiện tại').toBe('2026-08-10')
  })

  it('đếm đúng bài học xong và phiên luyện vào tuần của chúng', () => {
    const weeks = weeklyActivity(
      { 'l-1': '2026-08-10', 'l-2': '2026-08-12', 'l-3': '2026-08-03' },
      [drill('2026-08-11'), drill('2026-08-04')],
      '2026-08-10',
      8,
    )
    const thisWeek = weeks.at(-1)!
    const lastWeek = weeks.at(-2)!
    expect(thisWeek).toMatchObject({ lessons: 2, drills: 1, total: 3 })
    expect(lastWeek).toMatchObject({ lessons: 1, drills: 1, total: 2 })
  })

  it('việc cũ hơn cửa sổ đang vẽ thì bỏ qua, không dồn vào cột đầu', () => {
    const weeks = weeklyActivity({ 'l-old': '2020-01-01' }, [], '2026-08-10', 4)
    expect(weeks.reduce((n, w) => n + w.total, 0)).toBe(0)
  })
})

describe('phân tích chỗ hay sai', () => {
  /** Runtime nói rõ từng câu: đã làm xong chưa, vấp mấy lần. */
  function runtimeOf(rows: Record<string, { failCount: number; solved?: boolean; usedSolution?: boolean }>): Runtime {
    const base = startLesson(firstLesson)
    const exercises = { ...base.exercises }
    for (const [id, v] of Object.entries(rows)) {
      exercises[id] = { failCount: v.failCount, solved: v.solved ?? true, usedSolution: v.usedSolution ?? false }
    }
    return { ...base, exercises }
  }

  it('chưa học gì thì không phán câu nào — không có dữ liệu thì im lặng', () => {
    const analysis = analyzeMistakes(modules, {})
    expect(analysis.attempted).toBe(0)
    expect(analysis.toughestKind).toBeNull()
    expect(analysis.byKind).toEqual([])
  })

  it('chỉ đếm câu ĐÃ LÀM XONG — câu đang dở không bị chấm giữa chừng', () => {
    const half = questionIds[0]!
    const analysis = analyzeMistakes(modules, {
      [firstLesson.id]: runtimeOf({ [half]: { failCount: 2, solved: false } }),
    })
    expect(analysis.attempted).toBe(0)
    expect(analysis.fails).toBe(0)
  })

  it('cộng đúng tổng: số câu, số câu vấp, số lần vấp, số lần phải mở lời giải', () => {
    const [a, b, c] = questionIds as [string, string, string]
    const analysis = analyzeMistakes(modules, {
      [firstLesson.id]: runtimeOf({
        [a]: { failCount: 0 },
        [b]: { failCount: 2 },
        [c]: { failCount: 3, usedSolution: true },
      }),
    })
    expect(analysis.attempted).toBe(3)
    expect(analysis.stumbled).toBe(2)
    expect(analysis.fails).toBe(5)
    expect(analysis.usedSolution).toBe(1)
  })

  it('nhóm CHƯA ĐỦ MẪU không được đem ra phán — vấp 1/1 không phải "yếu 100%"', () => {
    const one = questionIds[0]!
    const analysis = analyzeMistakes(modules, {
      [firstLesson.id]: runtimeOf({ [one]: { failCount: 3 } }),
    })
    expect(analysis.byKind[0]!.ranked).toBe(false)
    expect(analysis.toughestKind).toBeNull()
  })

  it('đủ mẫu thì phán dạng câu yếu nhất, và tỉ lệ tính trên số câu ĐÃ LÀM', () => {
    // Một bài không đủ mẫu cho dạng nào (3 câu là nhiều nhất) — học cả
    // module thì dạng gõ tay mới chạm ngưỡng. Đó đúng là ý của ngưỡng.
    const runtimes: Record<string, Runtime> = {}
    let seen = 0
    for (const lesson of firstModule.lessons) {
      const base = startLesson(lesson)
      const exercises = { ...base.exercises }
      for (const id of Object.keys(exercises)) {
        seen += 1
        // Vấp một câu trên hai — tỉ lệ ~50%, đủ để có thứ để xếp hạng.
        exercises[id] = { failCount: seen % 2 === 0 ? 1 : 0, solved: true, usedSolution: false }
      }
      runtimes[lesson.id] = { ...base, exercises }
    }

    const analysis = analyzeMistakes(modules, runtimes)
    const ranked = analysis.byKind.filter((k) => k.ranked)
    expect(ranked.length, 'học trọn một module phải đủ mẫu cho ít nhất một dạng câu').toBeGreaterThan(0)
    expect(analysis.toughestKind).toBe(ranked[0])
    for (const bucket of ranked) {
      expect(bucket.rate).toBeCloseTo(bucket.stumbled / bucket.attempted, 5)
      expect(bucket.attempted).toBeGreaterThanOrEqual(MIN_SAMPLE)
    }
    // Dạng câu chỉ xuất hiện một hai lần trong module vẫn có mặt để đọc
    // số, chỉ là không được xếp hạng.
    expect(analysis.byKind.some((k) => !k.ranked)).toBe(true)
  })

  it('mọi nhóm nào cũng chỉ được xếp sau nhóm ĐỦ MẪU', () => {
    const rows: Record<string, { failCount: number }> = {}
    questionIds.forEach((id) => {
      rows[id] = { failCount: 1 }
    })
    const analysis = analyzeMistakes(modules, { [firstLesson.id]: runtimeOf(rows) })
    const flags = analysis.byKind.map((k) => k.ranked)
    expect(flags).toEqual([...flags].sort((a, b) => Number(b) - Number(a)))
  })

  it('chủ đề hay vấp chỉ gom câu ĐÃ VẤP, xếp theo số lần vấp', () => {
    const rows: Record<string, { failCount: number }> = {}
    questionIds.forEach((id, i) => {
      rows[id] = { failCount: i === 0 ? 4 : 0 }
    })
    const analysis = analyzeMistakes(modules, { [firstLesson.id]: runtimeOf(rows) })
    for (const topic of analysis.byTopic) {
      expect(topic.fails).toBeGreaterThan(0)
      expect(topic.topic).toBeDefined()
    }
    expect(analysis.byTopic.map((t) => t.fails)).toEqual([...analysis.byTopic.map((t) => t.fails)].sort((a, b) => b - a))
  })
})
