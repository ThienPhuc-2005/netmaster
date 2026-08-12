// Đọc lại sai lầm của người học — chạy trên nội dung thật.

import { describe, expect, it } from 'vitest'
import { loadModules } from '../content'
import { conceptIdsInLesson } from './contentPure'
import { startLesson } from './lessonMachine'
import {
  analyzeMistakes,
  MIN_SAMPLE,
  luyenThuHayQuen,
  theHayQuen,
  weakSpotDrill,
  weakSpots,
  WEAK_DRILL_CAP,
  weeklyActivity,
  weekStartOf,
} from './mistakeLog'
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

describe('phiên luyện lại chỗ vấp', () => {
  /** Đánh dấu MỌI bài của một module là đã học, mỗi câu vấp `fails` lần. */
  function runtimesFor(module: (typeof modules)[number], fails: (index: number) => number) {
    const runtimes: Record<string, Runtime> = {}
    let i = 0
    for (const lesson of module.lessons) {
      const base = startLesson(lesson)
      const exercises = { ...base.exercises }
      for (const id of Object.keys(exercises)) {
        exercises[id] = { failCount: fails(i), solved: true, usedSolution: false }
        i += 1
      }
      runtimes[lesson.id] = { ...base, exercises }
    }
    return runtimes
  }

  it('chưa vấp câu nào thì không có gì để luyện — không bịa đề', () => {
    expect(weakSpotDrill(modules, runtimesFor(firstModule, () => 0))).toEqual([])
  })

  it('chỉ lấy câu ĐÃ GIẢI XONG mà từng vấp', () => {
    const lesson = firstModule.lessons[0]!
    const base = startLesson(lesson)
    const ids = Object.keys(base.exercises)
    const exercises = { ...base.exercises }
    exercises[ids[0]!] = { failCount: 2, solved: true, usedSolution: false } // lấy
    exercises[ids[1]!] = { failCount: 3, solved: false, usedSolution: false } // đang dở → bỏ
    const drill = weakSpotDrill(modules, { [lesson.id]: { ...base, exercises } })
    expect(drill.map((d) => d.question.id)).toEqual([ids[0]])
  })

  it('câu vấp NẶNG nhất của mỗi module luôn lọt vào trần', () => {
    // Trần cắt SAU khi trộn: mỗi module góp câu nặng nhất của nó trước.
    const runtimes = runtimesFor(firstModule, (i) => 20 - i)
    const all = weakSpotDrill(modules, runtimes, 100)
    const capped = weakSpotDrill(modules, runtimes, 3)
    const heaviest = [...all].sort((a, b) => b.failCount - a.failCount).slice(0, 3).map((d) => d.question.id)
    expect(capped.map((d) => d.question.id).sort()).toEqual(heaviest.sort())
  })

  it('trộn XEN KẼ module — ba câu liền nhau cùng module là luyện khối', () => {
    const runtimes = { ...runtimesFor(modules[0]!, () => 2), ...runtimesFor(modules[1]!, () => 2) }
    const drill = weakSpotDrill(modules, runtimes, 6)
    const ids = drill.map((d) => d.moduleId)
    expect(new Set(ids).size, 'phiên phải chạm cả hai module').toBe(2)
    for (let i = 2; i < ids.length; i += 1) {
      const three = ids.slice(i - 2, i + 1)
      expect(new Set(three).size, `ba câu liền nhau cùng module tại vị trí ${i}`).toBeGreaterThan(1)
    }
  })

  it('không vượt trần, và mỗi câu chỉ xuất hiện một lần', () => {
    const runtimes = runtimesFor(firstModule, () => 1)
    const drill = weakSpotDrill(modules, runtimes, WEAK_DRILL_CAP)
    expect(drill.length).toBeLessThanOrEqual(WEAK_DRILL_CAP)
    expect(new Set(drill.map((d) => d.question.id)).size).toBe(drill.length)
  })

  it('mỗi câu mang theo đường về bài gốc và lời giải để hiện sau khi trả lời', () => {
    const drill = weakSpotDrill(modules, runtimesFor(firstModule, () => 2), 3)
    for (const item of drill) {
      expect(item.lessonId).toBeTruthy()
      expect(item.moduleId).toBeTruthy()
      expect(item.solution).toBeDefined()
    }
  })
})

describe('theHayQuen — thứ quên đi quên lại (chủ dự án hỏi 08-12)', () => {
  const the = (id: string, lapses: number, dueDate = '2026-08-20') => ({
    conceptId: id,
    moduleId: 'module-1',
    intervalIndex: 1 as const,
    dueDate,
    lapses,
    createdOn: '2026-06-01',
    lastReviewedOn: null,
  })

  it('quên MỘT lần thì chưa vào danh sách — đó là chuyện thường của trí nhớ', () => {
    // Cả cơ chế ôn ngắt quãng dựng lên là để đón đúng cú quên đầu tiên;
    // gọi nó là "hay quên" vừa sai vừa làm danh sách dài tới mức bỏ đọc.
    expect(theHayQuen([the('a', 1)])).toEqual([])
    expect(theHayQuen([the('a', 0)])).toEqual([])
  })

  it('từ hai lần trở lên thì vào, quên nhiều đứng trước', () => {
    const ds = theHayQuen([the('it', 2), the('nhieu', 5), the('vua', 3)])
    expect(ds.map((r) => r.cardId)).toEqual(['nhieu', 'vua', 'it'])
    expect(ds[0]!.soLanQuen).toBe(5)
  })

  it('cùng số lần quên thì thẻ ĐẾN HẠN SỚM HƠN đứng trước', () => {
    // Quên bằng nhau thì cái lâu chưa ôn đáng lo hơn.
    const ds = theHayQuen([the('sau', 3, '2026-09-01'), the('truoc', 3, '2026-08-01')])
    expect(ds.map((r) => r.cardId)).toEqual(['truoc', 'sau'])
  })

  it('cắt theo trần và tất định (chạy lại ra đúng một thứ tự)', () => {
    const cards = [the('a', 9), the('b', 8), the('c', 7), the('d', 6), the('e', 5), the('f', 4)]
    expect(theHayQuen(cards).length).toBe(5)
    expect(theHayQuen(cards)).toEqual(theHayQuen([...cards].reverse()))
  })

  it('hộp rỗng thì rỗng, không ném', () => {
    expect(theHayQuen([])).toEqual([])
  })
})

describe('luyenThuHayQuen — phiên luyện lại thứ hay quên (khối 21.52)', () => {
  const modules = loadModules()

  /** Một khái niệm THẬT trong nội dung, kèm bài dạy nó (bài có bài tập). */
  function khaiNiemThat(moduleIndex: number) {
    const module = modules[moduleIndex]!
    for (const lesson of module.lessons) {
      if (lesson.steps[3].exercises.length === 0) continue
      const ids = conceptIdsInLesson(lesson)
      if (ids.length > 0) return { moduleId: module.id, conceptId: ids[0]!, lesson }
    }
    throw new Error(`module ${module.id} không có bài nào vừa dạy khái niệm vừa có bài tập`)
  }

  const the = (conceptId: string, moduleId: string, lapses: number) => ({
    conceptId,
    moduleId,
    intervalIndex: 1 as const,
    dueDate: '2026-08-20',
    lapses,
    createdOn: '2026-06-01',
    lastReviewedOn: null,
  })

  it('lấy đề từ đúng BÀI đã dạy thứ bị quên', () => {
    const a = khaiNiemThat(0)
    const items = luyenThuHayQuen(modules, [the(a.conceptId, a.moduleId, 3)])
    expect(items.length).toBeGreaterThan(0)
    expect(items.every((i) => i.lessonId === a.lesson.id)).toBe(true)
  })

  it('mang theo SỐ LẦN QUÊN, và không giả vờ là số lần vấp', () => {
    // Hai con số đo hai chuyện khác nhau; màn luyện đọc `quen` để chọn
    // đúng nhãn "từng quên N lần" thay vì "từng vấp N lần".
    const a = khaiNiemThat(0)
    const items = luyenThuHayQuen(modules, [the(a.conceptId, a.moduleId, 3)])
    expect(items[0]!.quen).toBe(3)
    expect(items[0]!.failCount).toBe(0)
  })

  it('thứ chỉ quên MỘT lần không kéo được đề nào về', () => {
    const a = khaiNiemThat(0)
    expect(luyenThuHayQuen(modules, [the(a.conceptId, a.moduleId, 1)])).toEqual([])
  })

  it('thẻ trỏ khái niệm KHÔNG còn trong nội dung thì bỏ qua, không ném', () => {
    // Cùng lớp chuyện với thẻ mồ côi (K1): nội dung đổi id là thẻ cũ mất chỗ tra.
    expect(luyenThuHayQuen(modules, [the('khong-ton-tai', 'module-1', 5)])).toEqual([])
  })

  it('trộn xen kẽ module — luyện khối sinh ảo giác thành thạo', () => {
    const a = khaiNiemThat(0)
    const b = khaiNiemThat(1)
    const items = luyenThuHayQuen(modules, [the(a.conceptId, a.moduleId, 5), the(b.conceptId, b.moduleId, 4)])
    expect(items[0]!.moduleId).toBe(a.moduleId)
    expect(items[1]!.moduleId, 'câu thứ hai phải sang module khác').toBe(b.moduleId)
  })

  it('không vượt trần một phiên', () => {
    const cards = [0, 1, 2].map((i) => {
      const k = khaiNiemThat(i)
      return the(k.conceptId, k.moduleId, 5)
    })
    expect(luyenThuHayQuen(modules, cards).length).toBeLessThanOrEqual(WEAK_DRILL_CAP)
  })
})

describe('luyenThuHayQuen ưu tiên câu TRÚNG ĐÍCH (ý N5, khối 21.58)', () => {
  const modules = loadModules()

  /** Một bài có ít nhất một câu đã khai thẻ khái niệm. */
  function baiCoThe() {
    for (const m of modules) {
      for (const l of m.lessons) {
        const co = l.steps[3].exercises.find((e) => e.conceptId !== undefined)
        if (co !== undefined && l.steps[3].exercises.length > 1) {
          return { moduleId: m.id, lesson: l, conceptId: co.conceptId! }
        }
      }
    }
    throw new Error('nội dung phải có ít nhất một bài nhiều câu mà có câu khai thẻ')
  }

  const the = (conceptId: string, moduleId: string) => ({
    conceptId,
    moduleId,
    intervalIndex: 1 as const,
    dueDate: '2026-08-20',
    lapses: 3,
    createdOn: '2026-06-01',
    lastReviewedOn: null,
  })

  it('quên khái niệm nào thì chỉ lấy câu khai ĐÚNG khái niệm đó', () => {
    const { moduleId, lesson, conceptId } = baiCoThe()
    const items = luyenThuHayQuen(modules, [the(conceptId, moduleId)])
    expect(items.length).toBeGreaterThan(0)
    const idTrungDich = lesson.steps[3].exercises
      .filter((e) => e.conceptId === conceptId)
      .map((e) => e.question.id)
    expect(items.map((i) => i.question.id).sort()).toEqual(idTrungDich.sort())
  })

  it('bài KHÔNG câu nào khai thẻ thì lùi về lấy cả bài — thà rộng còn hơn rỗng', () => {
    // Dựng một bài giả không có thẻ nào: lấy bài thật rồi bóc hết conceptId.
    const { moduleId, lesson, conceptId } = baiCoThe()
    const boThe = {
      ...lesson,
      steps: lesson.steps.map((s, i) =>
        i === 3 ? { ...s, exercises: (s as typeof lesson.steps[3]).exercises.map((e) => ({ ...e, conceptId: undefined })) } : s,
      ),
    } as typeof lesson
    const gia = modules.map((m) =>
      m.id === moduleId ? { ...m, lessons: m.lessons.map((l) => (l.id === lesson.id ? boThe : l)) } : m,
    )
    const items = luyenThuHayQuen(gia, [the(conceptId, moduleId)])
    expect(items.length).toBe(lesson.steps[3].exercises.length)
  })
})
