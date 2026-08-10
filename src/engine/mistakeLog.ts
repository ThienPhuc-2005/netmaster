// Sai lầm là dữ liệu quý nhất người học tự tạo ra — file này đọc nó.
//
// Vì sao cần (kho ý tưởng A3 + H6): app ghi lại từng lần vấp của từng
// câu suốt mấy tháng học, rồi không bao giờ cho người học nhìn lại. Hai
// thứ suy được từ đó mà không phải thêm một byte persist nào:
//
//  1. **Chỗ hay vấp** — câu nào bạn phải thử nhiều lần nhất. Đây là bản
//     đồ lỗ hổng cá nhân, chính xác hơn mọi bài kiểm tra vì nó ghi lúc
//     người học đang thật sự vật lộn.
//  2. **Nếp học theo tuần** — bao nhiêu việc làm được mỗi tuần. Chính là
//     khái niệm BASELINE của Module 20, lần này trên dữ liệu của chính
//     mình: nhìn nếp của mình rồi mới biết tuần nào là bất thường.
//
// MỘT ĐIỀU CHỈNH SO VỚI Ý GỐC, khai ra: ý trong kho nói "dùng
// answerHistory". Không dùng được — `AnswerRecord` chỉ có
// `{correct, at}` (không biết câu nào) và chỉ giữ 10 bản ghi cuối cho
// flow engine. Nguồn thật là `lessonRuntimes[].exercises[].failCount`:
// theo TỪNG CÂU, giữ vĩnh viễn, và biết luôn câu đó nằm ở bài nào.
//
// KHÔNG dùng những con số này để phạt hay xếp hạng (nguyên tắc 5):
// chúng chỉ để người học tự thấy mình nên quay lại đâu.
//
// Technical contract: thuần TS, tất định, `today` bơm từ ngoài.

import type { Lesson, Module, Question } from './contentSchema'
import type { DrillResult, ISODate } from './types'
import type { LessonRuntime } from './lessonMachine'
import { addDays, diffDays, isBefore } from './dates'

/** Một chỗ người học vấp nhiều — kèm đường quay lại đúng bài đã dạy nó. */
export interface WeakSpot {
  moduleId: string
  moduleTitle: Module['title']
  lessonId: string
  lessonTitle: Lesson['missionTitle']
  questionId: string
  prompt: Question['prompt']
  /** Số lần trả lời chưa đúng trước khi giải được. */
  failCount: number
  /** Đã phải mở lời giải mới qua được. */
  usedSolution: boolean
}

/** Mọi câu hỏi có thể vấp trong một bài (thử tay + nhớ lại). */
function questionsInLesson(lesson: Lesson): Question[] {
  return [...lesson.steps[3].exercises.map((e) => e.question), ...lesson.steps[4].questions.map((e) => e.question)]
}

/**
 * Những chỗ vấp nhiều nhất, nhiều trước ít sau.
 *
 * Chỉ tính câu đã vấp THẬT (`failCount > 0`) — câu làm đúng ngay không
 * phải chỗ yếu, và liệt kê nó ra chỉ làm loãng danh sách. Xếp hạng:
 * vấp nhiều hơn đứng trước; hòa thì câu phải MỞ LỜI GIẢI đứng trước
 * (vấp 3 lần rồi phải xem đáp án nặng hơn vấp 3 lần rồi tự ra); hòa nữa
 * thì theo thứ tự bài để kết quả tất định.
 */
export function weakSpots(
  modules: readonly Module[],
  lessonRuntimes: Readonly<Record<string, LessonRuntime>>,
  limit = 5,
): WeakSpot[] {
  const spots: WeakSpot[] = []

  for (const module of modules) {
    for (const lesson of module.lessons) {
      const runtime = lessonRuntimes[lesson.id]
      if (runtime === undefined) continue
      for (const question of questionsInLesson(lesson)) {
        const attempt = runtime.exercises[question.id]
        if (attempt === undefined || attempt.failCount <= 0) continue
        spots.push({
          moduleId: module.id,
          moduleTitle: module.title,
          lessonId: lesson.id,
          lessonTitle: lesson.missionTitle,
          questionId: question.id,
          prompt: question.prompt,
          failCount: attempt.failCount,
          usedSolution: attempt.usedSolution,
        })
      }
    }
  }

  return spots
    .sort(
      (a, b) =>
        b.failCount - a.failCount ||
        Number(b.usedSolution) - Number(a.usedSolution) ||
        (a.lessonId < b.lessonId ? -1 : a.lessonId > b.lessonId ? 1 : 0) ||
        (a.questionId < b.questionId ? -1 : a.questionId > b.questionId ? 1 : 0),
    )
    .slice(0, limit)
}

/** Một tuần trong đồ thị nếp học. */
export interface WeekActivity {
  /** Thứ Hai của tuần đó — nhãn và khóa sắp xếp. */
  weekStart: ISODate
  /** Số bài học xong trong tuần. */
  lessons: number
  /** Số phiên luyện (cả hai loại drill). */
  drills: number
  /** Tổng việc làm được trong tuần — chiều cao cột. */
  total: number
}

/**
 * Mốc thứ Hai gần nhất trước ngày này (tuần bắt đầu từ thứ Hai, nếp VN).
 *
 * Đếm từ một thứ Hai đã biết thay vì hỏi `Date.getDay()`: cả module
 * `dates.ts` cố ý tính bằng UTC để né hẳn chuyện múi giờ và DST, dùng
 * giờ local ở đây là chọc một lỗ vào đúng kỷ luật đó.
 */
const MONDAY_ANCHOR: ISODate = '2024-01-01' // đúng là một thứ Hai

export function weekStartOf(date: ISODate): ISODate {
  const since = diffDays(MONDAY_ANCHOR, date)
  return addDays(date, -(((since % 7) + 7) % 7))
}

/**
 * Nếp học `weeks` tuần gần nhất, cũ trước mới sau.
 *
 * Đếm HAI loại việc để lại dấu ngày trong store: bài học xong
 * (`completedLessons`) và phiên luyện (`drillHistory`). Phiên ôn KHÔNG
 * đếm được theo tuần — store chỉ giữ `lastReviewDate` của lần gần nhất,
 * không giữ lịch sử; nói dối bằng cách suy từ `lastReviewedOn` của thẻ
 * thì một phiên 15 thẻ hóa 15 việc. Thà đếm thiếu mà thật.
 *
 * Tuần KHÔNG có hoạt động vẫn phải có cột (giá trị 0): bỏ trống các
 * tuần nghỉ là vẽ một đường liền mạch không có thật — mà chính khoảng
 * trống mới là thứ người học cần nhìn thấy.
 */
export function weeklyActivity(
  completedLessons: Readonly<Record<string, ISODate>>,
  drillHistory: readonly DrillResult[],
  today: ISODate,
  weeks = 8,
): WeekActivity[] {
  const thisMonday = weekStartOf(today)
  const firstMonday = addDays(thisMonday, -7 * (weeks - 1))

  const buckets = new Map<ISODate, WeekActivity>()
  for (let i = 0; i < weeks; i++) {
    const weekStart = addDays(firstMonday, 7 * i)
    buckets.set(weekStart, { weekStart, lessons: 0, drills: 0, total: 0 })
  }

  const bump = (date: ISODate, field: 'lessons' | 'drills') => {
    if (isBefore(date, firstMonday)) return // ngoài cửa sổ đang vẽ
    const bucket = buckets.get(weekStartOf(date))
    if (bucket === undefined) return // ngày ở tương lai — bỏ qua, không bịa cột
    bucket[field] += 1
    bucket.total += 1
  }

  for (const date of Object.values(completedLessons)) bump(date, 'lessons')
  for (const session of drillHistory) bump(session.date, 'drills')

  return [...buckets.values()]
}
