// "Hôm nay bạn có gì" — suy MỘT kế hoạch từ dữ liệu tiến độ đã có.
//
// Vì sao cần (kho ý tưởng E1 + E2): app đủ 21 module rồi, nhưng khoảnh
// khắc MỞ APP vẫn bắt người học tự quyết định — cuộn qua 21 card đi tìm
// module nào đang mở, bài nào đang dở, còn thẻ ôn nào không. Mỗi lần
// quyết định là một lần có thể bỏ cuộc; người học quay lại ngày thứ hai
// cần thấy ngay MỘT việc để bấm.
//
// Hai luật giữ cho kế hoạch này không phá cơ chế học:
//
//  1. **Không tạo đường tắt.** Kế hoạch chỉ TRỎ tới việc mà người học
//     vốn đã làm được: bài dở đang mở, bài mới kế tiếp của module đang
//     mở, phiên ôn đến hạn. Mastery gate, luật mở bài tuần tự và trần nợ
//     ôn vẫn do các engine cũ quyết — file này không được "mở" gì cả.
//  2. **Ôn trước, học sau** (spec 2.2). Còn thẻ đến hạn thì việc đầu
//     tiên luôn là ôn; nợ quá trần thì học mới bị chặn hẳn và kế hoạch
//     phải nói thật điều đó thay vì mời vào bài mới rồi để người học
//     đâm vào cửa khóa.
//
// Ước lượng thời gian là ƯỚC LƯỢNG, và UI phải hiện kèm dấu "≈": nói
// một con số cứng rồi sai là hứa hão (violated expectancy).
//
// Technical contract: thuần TS, tất định, không đọc giờ hệ thống —
// `today` bơm từ ngoài như mọi engine khác.

import type { Lesson, Module } from './contentSchema'
import type { ISODate, ReviewCard } from './types'
import type { LessonRuntime } from './lessonMachine'
import { orderedLessonIds } from './contentPure'
import { computeModuleStatuses } from './masteryGate'
import { canStartNewLesson, dueCards } from './reviewQueue'
import { NGUONG_HAY_QUEN } from './mistakeLog'

/** Số bước của một bài (pipeline 6 bước — `stepIndex` chạy 0..5). */
export const LESSON_STEP_COUNT = 6

/**
 * Hằng số ước lượng thời gian, khai ra để ai cũng sửa được có cơ sở:
 * một thẻ ôn là tự nhớ rồi lật (~20 giây), một bài học trọn 6 bước ~12
 * phút, mỗi bước còn lại của bài dở ~2.5 phút, một lượt thi 8 câu ~10
 * phút. Con số lấy từ nhịp thật của app, không phải đoán bừa.
 */
export const ESTIMATE = {
  secondsPerCard: 20,
  minutesPerLesson: 12,
  minutesPerStep: 2.5,
  minutesPerTest: 10,
} as const

/** Một việc cụ thể mà kế hoạch trỏ tới. */
export interface PlannedLesson {
  moduleId: string
  lessonId: string
  lesson: Lesson
  /** Số bước còn lại của bài dở; bài mới thì là trọn 6 bước. */
  stepsLeft: number
}

export interface PlannedTest {
  moduleId: string
  module: Module
}

/** Việc đáng bấm ĐẦU TIÊN — UI dựng nút chính từ đây. */
export type TodayFocus = 'review' | 'resume' | 'new' | 'test' | 'done'

export interface TodayPlan {
  /** Thẻ đến hạn hôm nay (gồm cả thẻ quá hạn từ hôm trước). */
  dueCount: number
  /**
   * Trong số thẻ đến hạn hôm nay, mấy thẻ là thứ người học QUÊN ĐI QUÊN
   * LẠI (từ hai lần trở lên — cùng ngưỡng với mục "thứ bạn hay quên").
   *
   * Vì sao đáng nói ra ngay ở thẻ Hôm nay: nó đổi cách đọc con số bên
   * cạnh. "8 thẻ đến hạn" mà ba trong đó là món cứng đầu thì buổi ôn hôm
   * nay nặng hơn một buổi 8 thẻ thường — biết trước là chuẩn bị được tâm
   * thế, thay vì đang ôn mới ngã ngửa.
   *
   * Cố ý KHÔNG dùng để dọa: đây đúng là thời điểm ĐÁNG GẶP nhất của mấy
   * món ấy (ôn ngắt quãng bắt đúng lúc sắp quên thì mới bám), nên câu chữ
   * ở tầng UI phải nói ra cái lợi đó chứ không kể tội người học.
   */
  dueHayQuen: number
  /** Nợ ôn vượt trần → bài MỚI bị khóa (spec 2.2). Bài dở vẫn học tiếp được. */
  newLessonBlocked: boolean
  /** Bài đang học dở — đã đi được ít nhất một bước. */
  resume: PlannedLesson | null
  /** Bài mới kế tiếp trong chuỗi mở khóa. */
  nextNew: PlannedLesson | null
  /** Module đã học hết bài mà chưa đậu → việc kế tiếp là đi thi. */
  nextTest: PlannedTest | null
  focus: TodayFocus
  /** Ước lượng tổng thời gian của kế hoạch, làm tròn tới 5 phút. */
  minutes: number
}

export interface TodayPlanInput {
  modules: readonly Module[]
  passedModules: readonly string[]
  completedLessons: Readonly<Record<string, ISODate>>
  lessonRuntimes: Readonly<Record<string, LessonRuntime>>
  reviewCards: readonly ReviewCard[]
  today: ISODate
}

/** Làm tròn lên bội của 5, tối thiểu 5 — "≈ 13 phút" là con số giả vờ chính xác. */
function roundToFive(minutes: number): number {
  return Math.max(5, Math.ceil(minutes / 5) * 5)
}

/**
 * Kế hoạch hôm nay.
 *
 * Thứ tự tìm việc đi ĐÚNG chuỗi mở khóa: duyệt module theo thứ tự, dừng
 * ở module đầu tiên chưa đậu và không khóa. Trong module đó, bài dở
 * (runtime chưa completed, đã qua bước 0) được ưu tiên hơn bài mới —
 * Zeigarnik: việc dang dở kéo người ta quay lại mạnh hơn việc chưa bắt đầu.
 */
export function planToday(input: TodayPlanInput): TodayPlan {
  const { modules, passedModules, completedLessons, lessonRuntimes, reviewCards, today } = input

  const denHan = dueCards([...reviewCards], today)
  const dueCount = denHan.length
  const dueHayQuen = denHan.filter((c) => c.lapses >= NGUONG_HAY_QUEN).length
  const newLessonBlocked = !canStartNewLesson([...reviewCards], today)
  const statuses = computeModuleStatuses(
    modules.map((m) => m.id),
    new Set(passedModules),
  )

  let resume: PlannedLesson | null = null
  let nextNew: PlannedLesson | null = null
  let nextTest: PlannedTest | null = null

  for (const module of modules) {
    if (statuses[module.id] !== 'open') continue // đã đậu hoặc còn khóa

    const byId = new Map(module.lessons.map((l) => [l.id, l]))
    const ordered = orderedLessonIds(module).flatMap((id) => {
      const lesson = byId.get(id)
      return lesson === undefined ? [] : [lesson]
    })

    for (const lesson of ordered) {
      if (completedLessons[lesson.id] !== undefined) continue
      const runtime = lessonRuntimes[lesson.id]
      // Bài dở THẬT = đã đi được ít nhất một bước. Mở ra xem rồi thoát
      // ngay (stepIndex 0) không phải công sức đáng gọi là "đang dở".
      const started = runtime !== undefined && !runtime.completed && runtime.stepIndex > 0
      const planned: PlannedLesson = {
        moduleId: module.id,
        lessonId: lesson.id,
        lesson,
        stepsLeft: started ? Math.max(1, LESSON_STEP_COUNT - runtime.stepIndex) : LESSON_STEP_COUNT,
      }
      if (started) resume = planned
      else nextNew = planned
      break // chỉ quan tâm bài KẾ TIẾP, không phải cả danh sách
    }

    // Học hết bài mà module chưa đậu → cửa tiếp theo là bài thi.
    if (resume === null && nextNew === null) nextTest = { moduleId: module.id, module }
    break // module đang mở đầu tiên là module của hôm nay
  }

  const focus: TodayFocus =
    dueCount > 0
      ? 'review'
      : resume !== null
        ? 'resume'
        : nextTest !== null
          ? 'test'
          : nextNew !== null && !newLessonBlocked
            ? 'new'
            : 'done'

  let minutes = (dueCount * ESTIMATE.secondsPerCard) / 60
  if (resume !== null) minutes += resume.stepsLeft * ESTIMATE.minutesPerStep
  else if (nextTest !== null) minutes += ESTIMATE.minutesPerTest
  else if (nextNew !== null && !newLessonBlocked) minutes += ESTIMATE.minutesPerLesson

  return {
    dueCount,
    dueHayQuen,
    newLessonBlocked,
    resume,
    nextNew,
    nextTest,
    focus,
    minutes: roundToFive(minutes),
  }
}

/** Việc kế tiếp NGAY SAU khi vừa học xong một bài. */
export type NextStep =
  | { kind: 'lesson'; lessonId: string }
  | { kind: 'test'; moduleId: string }
  /** Nợ ôn vượt trần — đi tiếp cũng đâm vào cửa khóa, phải trả nợ đã. */
  | { kind: 'review' }
  /** Hết việc (đã đi hết chặng đường hiện có). */
  | { kind: 'none' }

/**
 * "Học xong bài này rồi thì đi đâu?" — câu hỏi KHÁC với câu của thẻ
 * "Hôm nay", nên tách hàm riêng thay vì mượn `plan.focus`.
 *
 * Khác ở đúng một chỗ, và đó là chỗ có chủ đích: **còn thẻ đến hạn thì
 * KHÔNG đẩy người học đi ôn**. Luật "ôn trước học sau" (spec 2.2) là
 * luật của lúc MỞ APP — đã có cổng điều hướng ở main.tsx lo. Giữa
 * phiên, người đang học trôi chảy mà bị bẻ ngang sang hộp ôn tập là phá
 * đà chứ không dạy thêm được gì.
 *
 * Ngoại lệ duy nhất là nợ VƯỢT TRẦN: lúc đó `LessonPlayer` chặn cửa bài
 * mới thật, nên mời "học bài tiếp theo" là mời người ta đâm vào tường.
 *
 * Truyền vào `plan` đã tính với bài vừa xong ĐÃ ĐÁNH DẤU hoàn thành —
 * nếu không nó sẽ trỏ ngược về chính bài đang đứng.
 */
export function nextAfterLesson(plan: TodayPlan): NextStep {
  if (plan.newLessonBlocked) return { kind: 'review' }
  const lesson = plan.resume ?? plan.nextNew
  if (lesson !== null) return { kind: 'lesson', lessonId: lesson.lessonId }
  if (plan.nextTest !== null) return { kind: 'test', moduleId: plan.nextTest.moduleId }
  return { kind: 'none' }
}
