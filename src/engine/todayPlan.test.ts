// Kế hoạch "hôm nay" — bốn lời hứa, mỗi lời một test.
//
// Chạy trên NỘI DUNG THẬT (loadModules) chứ không phải module giả: cái
// đáng sợ ở đây không phải logic rẽ nhánh mà là kế hoạch trỏ sai chỗ khi
// gặp chuỗi mở khóa thật.

import { describe, expect, it } from 'vitest'
import { loadModules } from '../content'
import { nextAfterLesson, planToday } from './todayPlan'
import { startLesson } from './lessonMachine'
import { orderedLessonIds } from './contentPure'
import type { ReviewCard } from './types'

const modules = loadModules()
const TODAY = '2026-08-10'

/** Thẻ ôn — chỉ dueDate là thứ test này quan tâm. */
function card(conceptId: string, dueDate: string): ReviewCard {
  return {
    conceptId,
    moduleId: 'module-1',
    intervalIndex: 0,
    dueDate,
    lapses: 0,
    createdOn: '2026-01-01',
    lastReviewedOn: null,
  }
}

const emptyInput = {
  modules,
  passedModules: [] as string[],
  completedLessons: {} as Record<string, string>,
  lessonRuntimes: {},
  reviewCards: [] as ReviewCard[],
  today: TODAY,
}

describe('kế hoạch hôm nay', () => {
  it('người học mới: việc đầu tiên là bài ĐẦU TIÊN của module đầu, không phải thẻ ôn', () => {
    const plan = planToday(emptyInput)
    expect(plan.dueCount).toBe(0)
    expect(plan.focus).toBe('new')
    expect(plan.resume, 'chưa học gì thì không có bài dở').toBeNull()
    expect(plan.nextNew?.moduleId).toBe(modules[0]!.id)
    expect(plan.nextNew?.lessonId).toBe(orderedLessonIds(modules[0]!)[0])
    expect(plan.nextNew?.stepsLeft, 'bài mới là trọn 6 bước').toBe(6)
  })

  it('còn thẻ đến hạn thì ÔN TRƯỚC — không mời vào bài mới (spec 2.2)', () => {
    const plan = planToday({
      ...emptyInput,
      reviewCards: [card('c1', '2026-08-09'), card('c2', TODAY)],
    })
    expect(plan.dueCount).toBe(2)
    expect(plan.focus).toBe('review')
    // Bài mới vẫn được TÍNH vào kế hoạch (để nói "ôn xong còn bài này"),
    // chỉ là không được đứng đầu.
    expect(plan.nextNew).not.toBeNull()
  })

  it('bài đang dở thắng bài mới (Zeigarnik) và đếm đúng số bước còn lại', () => {
    const first = modules[0]!
    const lessonId = orderedLessonIds(first)[0]!
    const lesson = first.lessons.find((l) => l.id === lessonId)!
    const runtime = { ...startLesson(lesson), stepIndex: 4 }

    const plan = planToday({ ...emptyInput, lessonRuntimes: { [lessonId]: runtime } })
    expect(plan.focus).toBe('resume')
    expect(plan.resume?.lessonId).toBe(lessonId)
    expect(plan.resume?.stepsLeft, 'đang ở bước 5/6 thì còn 2 bước').toBe(2)
    expect(plan.nextNew, 'bài đang dở CHÍNH LÀ bài kế tiếp — không đếm hai lần').toBeNull()
  })

  it('mở bài ra xem rồi thoát ngay KHÔNG tính là bài dở', () => {
    const first = modules[0]!
    const lessonId = orderedLessonIds(first)[0]!
    const lesson = first.lessons.find((l) => l.id === lessonId)!

    const plan = planToday({ ...emptyInput, lessonRuntimes: { [lessonId]: startLesson(lesson) } })
    expect(plan.resume, 'stepIndex 0 chưa phải công sức').toBeNull()
    expect(plan.focus).toBe('new')
  })

  it('học hết bài mà chưa đậu → việc kế tiếp là ĐI THI, không nhảy sang module sau', () => {
    const first = modules[0]!
    const completedLessons = Object.fromEntries(orderedLessonIds(first).map((id) => [id, TODAY]))

    const plan = planToday({ ...emptyInput, completedLessons })
    expect(plan.focus).toBe('test')
    expect(plan.nextTest?.moduleId).toBe(first.id)
    expect(plan.nextNew, 'module sau còn khóa — không được mời sang').toBeNull()
  })

  it('đậu module đầu thì kế hoạch chuyển sang module hai — đi đúng chuỗi mở khóa', () => {
    const first = modules[0]!
    const completedLessons = Object.fromEntries(orderedLessonIds(first).map((id) => [id, TODAY]))

    const plan = planToday({ ...emptyInput, completedLessons, passedModules: [first.id] })
    expect(plan.focus).toBe('new')
    expect(plan.nextNew?.moduleId).toBe(modules[1]!.id)
  })

  it('nợ ôn quá trần: bài mới bị khóa và kế hoạch NÓI THẬT, không mời vào cửa khóa', () => {
    // 31 thẻ QUÁ HẠN (dueDate < hôm nay) là vượt trần 30 của spec 2.2.
    const overdue = Array.from({ length: 31 }, (_, i) => card(`c-${i}`, '2026-08-01'))
    const plan = planToday({ ...emptyInput, reviewCards: overdue })
    expect(plan.newLessonBlocked).toBe(true)
    expect(plan.focus, 'còn thẻ đến hạn thì việc đầu vẫn là ôn').toBe('review')
  })

  it('học xong sạch mọi module: kế hoạch biết mình đã hết việc', () => {
    const completedLessons = Object.fromEntries(
      modules.flatMap((m) => orderedLessonIds(m).map((id) => [id, TODAY])),
    )
    const plan = planToday({
      ...emptyInput,
      completedLessons,
      passedModules: modules.map((m) => m.id),
    })
    expect(plan.focus).toBe('done')
    expect(plan.nextNew).toBeNull()
    expect(plan.nextTest).toBeNull()
  })

  it('ước lượng thời gian làm tròn tới 5 phút và không bao giờ hứa "0 phút"', () => {
    const nothing = planToday({
      ...emptyInput,
      completedLessons: Object.fromEntries(
        modules.flatMap((m) => orderedLessonIds(m).map((id) => [id, TODAY])),
      ),
      passedModules: modules.map((m) => m.id),
    })
    expect(nothing.minutes).toBeGreaterThanOrEqual(5)

    const busy = planToday({
      ...emptyInput,
      reviewCards: Array.from({ length: 12 }, (_, i) => card(`c-${i}`, TODAY)),
    })
    expect(busy.minutes % 5, 'phải là bội của 5').toBe(0)
    // 12 thẻ (~4 phút) + một bài mới (12 phút) ≈ 16 → làm tròn 20.
    expect(busy.minutes).toBe(20)
  })
})

describe('học xong một bài rồi thì đi đâu', () => {
  const first = modules[0]!
  const lessonIds = orderedLessonIds(first)

  /** Kế hoạch tính NHƯ THỂ vừa học xong `throughIndex` bài đầu của module 1. */
  const planAfter = (throughIndex: number, extra: Partial<typeof emptyInput> = {}) =>
    planToday({
      ...emptyInput,
      completedLessons: Object.fromEntries(lessonIds.slice(0, throughIndex).map((id) => [id, TODAY])),
      ...extra,
    })

  it('còn bài trong module thì trỏ thẳng BÀI KẾ TIẾP', () => {
    expect(nextAfterLesson(planAfter(1))).toEqual({ kind: 'lesson', lessonId: lessonIds[1] })
  })

  it('vừa xong bài CUỐI của module thì trỏ sang bài THI', () => {
    expect(nextAfterLesson(planAfter(lessonIds.length))).toEqual({ kind: 'test', moduleId: first.id })
  })

  it('còn thẻ đến hạn nhưng CHƯA quá trần: vẫn học tiếp, không bẻ ngang sang ôn', () => {
    // "Ôn trước học sau" là luật của lúc MỞ APP (cổng ở main.tsx lo).
    // Bẻ ngang người đang học trôi chảy là phá đà, không dạy thêm gì.
    const plan = planAfter(1, { reviewCards: [card('c1', TODAY), card('c2', TODAY)] })
    expect(plan.focus, 'thẻ "Hôm nay" thì vẫn ưu tiên ôn').toBe('review')
    expect(nextAfterLesson(plan), 'nhưng cuối bài thì đi tiếp').toEqual({
      kind: 'lesson',
      lessonId: lessonIds[1],
    })
  })

  it('nợ VƯỢT TRẦN thì phải đi ôn — mời học tiếp là mời đâm vào cửa khóa', () => {
    const overdue = Array.from({ length: 31 }, (_, i) => card(`c-${i}`, '2026-08-01'))
    expect(nextAfterLesson(planAfter(1, { reviewCards: overdue }))).toEqual({ kind: 'review' })
  })

  it('học hết sạch mọi module thì thôi, không bịa ra việc', () => {
    const plan = planToday({
      ...emptyInput,
      completedLessons: Object.fromEntries(
        modules.flatMap((m) => orderedLessonIds(m).map((id) => [id, TODAY])),
      ),
      passedModules: modules.map((m) => m.id),
    })
    expect(nextAfterLesson(plan)).toEqual({ kind: 'none' })
  })

  it('bài kế tiếp đang DỞ thì đi qua đường resume, vẫn đúng bài đó', () => {
    // Bài mở tuần tự nên "bài dở" chỉ có thể là chính bài kế tiếp —
    // planToday dừng ở bài chưa xong ĐẦU TIÊN. Điều đáng khóa là nó đi
    // qua nhánh resume (mang theo số bước còn lại) chứ không coi bài
    // đang dở như bài mới tinh.
    const next = modules[0]!.lessons.find((l) => l.id === lessonIds[1])!
    const plan = planAfter(1, { lessonRuntimes: { [next.id]: { ...startLesson(next), stepIndex: 3 } } })
    expect(plan.resume?.lessonId, 'phải nhận ra đây là bài đang dở').toBe(next.id)
    expect(plan.nextNew, 'không được đếm hai lần').toBeNull()
    expect(nextAfterLesson(plan)).toEqual({ kind: 'lesson', lessonId: next.id })
  })
})
