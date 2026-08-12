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
import type { DrillResult, ExerciseAttempt, ISODate, ReviewCard } from './types'
import type { LessonRuntime } from './lessonMachine'
import { addDays, diffDays, isBefore } from './dates'
import { conceptIdsInLesson, palaceRoomsInLesson } from './contentPure'
import { roomIdFromCardId } from './palace/cards'

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

/**
 * Khóa của một thẻ ôn trong bảng vấp: conceptId chỉ duy nhất TRONG một
 * module, nên phải kèm moduleId — cùng luật với khóa sắp xếp của hàng đợi.
 */
export function conceptKey(moduleId: string, conceptId: string): string {
  return `${moduleId}::${conceptId}`
}

/**
 * Vấp nhiều tới đâu, tính theo KHÁI NIỆM (kho ý tưởng I2).
 *
 * Đường nối giữa "chỗ vấp" và "thẻ ôn" là BÀI HỌC. Chỗ vấp ghi theo từng
 * CÂU (`exercises[].failCount`), còn thẻ ôn khóa theo KHÁI NIỆM — hai hệ
 * khác nhau, không map thẳng được. Nhưng câu nào cũng nằm trong một bài,
 * và bài nào cũng khai rõ nó dạy những khái niệm gì (bước Dạy), nên vấp
 * dồn ở bài nào thì mọi khái niệm bài đó dạy đều đáng ngờ.
 *
 * Cố ý KHÔNG dùng `byTopic` của `analyzeMistakes`: `hintTopic` là trường
 * TÙY CHỌN của nội dung, câu không khai thì rơi ra ngoài — mà thẻ ôn thì
 * bài nào cũng có. Lấy bài làm cầu nối thì không câu vấp nào bị bỏ sót.
 *
 * Chỉ đếm câu ĐÃ LÀM XONG, cùng luật với `analyzeMistakes`: câu đang làm
 * dở có failCount tạm thời.
 */
export function conceptStumbles(
  modules: readonly Module[],
  lessonRuntimes: Readonly<Record<string, LessonRuntime>>,
): Record<string, number> {
  const out: Record<string, number> = {}
  for (const module of modules) {
    for (const lesson of module.lessons) {
      const runtime = lessonRuntimes[lesson.id]
      if (runtime === undefined) continue
      let fails = 0
      for (const question of questionsInLesson(lesson)) {
        const attempt = runtime.exercises[question.id]
        if (attempt === undefined || !attempt.solved) continue
        fails += attempt.failCount
      }
      if (fails <= 0) continue
      for (const conceptId of conceptIdsInLesson(lesson)) {
        const key = conceptKey(module.id, conceptId)
        out[key] = (out[key] ?? 0) + fails
      }
    }
  }
  return out
}

/** Một thẻ hay bị "chắc mà không nhớ". */
export interface AoGiacRow {
  cardId: string
  lan: number
}

/**
 * Ngưỡng để một thẻ được gọi là ảo giác quen mặt: phải hụt ÍT NHẤT hai
 * lần. Một lần hụt là chuyện thường của trí nhớ; cái đáng chỉ ra là khi
 * cùng một thẻ hụt đi hụt lại — lúc đó mới là người học đang nhầm "thấy
 * quen" với "đã nhớ" ở đúng chỗ ấy.
 */
export const AO_GIAC_NGUONG = 2

/**
 * Những thẻ hay bị "chắc mà không nhớ" nhất (kho ý tưởng I4).
 *
 * Sắp theo số lần hụt giảm dần; hòa thì theo cardId để kết quả tất định.
 */
export function aoGiacHayGap(
  dem: Readonly<Record<string, number>>,
  nguong = AO_GIAC_NGUONG,
  limit = 5,
): AoGiacRow[] {
  return Object.entries(dem)
    .filter(([, lan]) => lan >= nguong)
    .map(([cardId, lan]) => ({ cardId, lan }))
    .sort((a, b) => b.lan - a.lan || (a.cardId < b.cardId ? -1 : a.cardId > b.cardId ? 1 : 0))
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

// ---------------------------------------------------------------
// PHÂN TÍCH chỗ hay sai (khối 21.8)
// ---------------------------------------------------------------
//
// Danh sách 5 câu vấp nhiều nhất (weakSpots) trả lời câu "câu nào";
// phần dưới đây trả lời câu KHÓ HƠN và đáng giá hơn: "vấp theo KIỂU
// nào". Ba lát cắt, mỗi lát một câu hỏi khác nhau:
//
//   - theo DẠNG CÂU: kỹ năng nào đang yếu (gõ lệnh? nhớ lại bằng chữ?
//     dựng mạng bằng tay?) — thứ mà nhìn từng câu lẻ không thấy;
//   - theo MODULE: vùng kiến thức nào đang hổng;
//   - theo CHỦ ĐỀ (`hintTopic` của câu hỏi): khái niệm cụ thể nào cứ
//     quay lại cắn — đây là thứ gần nhất với "lỗ hổng" thật sự.
//
// HAI LUẬT THỐNG KÊ, vì nói sai còn tệ hơn không nói:
//
//  1. **Chia theo TỈ LỆ, không đếm số thô.** Câu gõ tay nhiều gấp mười
//     câu CLI, nên đếm thô thì kết luận nào cũng là "bạn yếu câu gõ
//     tay". Tỉ lệ = số câu CÓ VẤP / số câu đã làm của nhóm đó.
//  2. **Nhóm chưa đủ mẫu thì KHÔNG kết luận.** Vấp 1 trong 1 câu CLI
//     không phải "yếu CLI 100%". Dưới `MIN_SAMPLE` câu thì nhóm đó
//     không được xếp hạng — nó vẫn hiện số liệu, chỉ không được dùng
//     làm lời phán.

/** Số câu tối thiểu của một nhóm trước khi được xếp hạng. */
export const MIN_SAMPLE = 4

export interface MistakeBucket {
  /** Khóa ngữ nghĩa: mã dạng câu, hoặc moduleId. */
  key: string
  /** Số câu đã LÀM XONG thuộc nhóm này. */
  attempted: number
  /** Số câu từng vấp ít nhất một lần. */
  stumbled: number
  /** Tổng số lần trả lời chưa đúng. */
  fails: number
  /** Số câu phải mở tới lời giải. */
  usedSolution: number
  /** stumbled / attempted, 0..1. */
  rate: number
  /** Đủ mẫu để đem ra kết luận chưa. */
  ranked: boolean
}

/**
 * Một chủ đề hay vấp — `hintTopic` là chữ của nội dung, giữ nguyên LText.
 *
 * Khác `MistakeBucket` ở một chỗ phải nhớ: nhóm này CHỈ gom câu đã vấp,
 * nên `attempted` ở đây là "số câu vấp thuộc chủ đề", `rate` luôn bằng 1
 * và không mang thông tin gì. Đọc chủ đề bằng `fails`, đừng đọc bằng
 * `rate` — mẫu số "tổng số câu của chủ đề" không tồn tại vì hintTopic là
 * trường TÙY CHỌN, câu không khai thì không đếm vào đâu được.
 */
export interface MistakeTopic extends MistakeBucket {
  topic: Question['hintTopic']
}

export interface MistakeAnalysis {
  attempted: number
  stumbled: number
  fails: number
  usedSolution: number
  /** Theo dạng câu, tỉ lệ vấp cao trước; nhóm chưa đủ mẫu xếp sau. */
  byKind: MistakeBucket[]
  /** Theo module, cùng luật xếp. */
  byModule: MistakeBucket[]
  /** Theo chủ đề, vấp nhiều lần trước. */
  byTopic: MistakeTopic[]
  /** Dạng câu yếu nhất ĐỦ MẪU — null khi chưa đủ dữ liệu để nói. */
  toughestKind: MistakeBucket | null
}

/** Cộng dồn một câu vào nhóm. */
function bump(map: Map<string, MistakeBucket>, key: string, attempt: ExerciseAttempt): MistakeBucket {
  let bucket = map.get(key)
  if (bucket === undefined) {
    bucket = { key, attempted: 0, stumbled: 0, fails: 0, usedSolution: 0, rate: 0, ranked: false }
    map.set(key, bucket)
  }
  bucket.attempted += 1
  if (attempt.failCount > 0) bucket.stumbled += 1
  bucket.fails += attempt.failCount
  if (attempt.usedSolution) bucket.usedSolution += 1
  return bucket
}

/** Chốt tỉ lệ + cờ đủ mẫu, rồi xếp: vấp nhiều trước, chưa đủ mẫu xuống cuối. */
function finish(map: Map<string, MistakeBucket>): MistakeBucket[] {
  return [...map.values()]
    .map((b) => ({ ...b, rate: b.attempted === 0 ? 0 : b.stumbled / b.attempted, ranked: b.attempted >= MIN_SAMPLE }))
    .sort(
      (a, b) =>
        Number(b.ranked) - Number(a.ranked) ||
        b.rate - a.rate ||
        b.fails - a.fails ||
        (a.key < b.key ? -1 : a.key > b.key ? 1 : 0),
    )
}

/**
 * Phân tích toàn bộ chỗ vấp của người học.
 *
 * Chỉ đếm câu ĐÃ LÀM XONG (`solved`): câu đang làm dở có failCount tạm
 * thời, gộp vào là chấm điểm người ta giữa chừng một câu họ sắp giải
 * được.
 */
export function analyzeMistakes(
  modules: readonly Module[],
  lessonRuntimes: Readonly<Record<string, LessonRuntime>>,
): MistakeAnalysis {
  const kinds = new Map<string, MistakeBucket>()
  const byModule = new Map<string, MistakeBucket>()
  const topics = new Map<string, MistakeTopic>()
  let attempted = 0
  let stumbled = 0
  let fails = 0
  let usedSolution = 0

  for (const module of modules) {
    for (const lesson of module.lessons) {
      const runtime = lessonRuntimes[lesson.id]
      if (runtime === undefined) continue
      for (const question of questionsInLesson(lesson)) {
        const attempt = runtime.exercises[question.id]
        if (attempt === undefined || !attempt.solved) continue
        attempted += 1
        if (attempt.failCount > 0) stumbled += 1
        fails += attempt.failCount
        if (attempt.usedSolution) usedSolution += 1

        bump(kinds, question.kind, attempt)
        bump(byModule, module.id, attempt)

        // Chủ đề chỉ có nghĩa khi câu ĐÃ VẤP — gom cả câu làm trơn tru
        // vào đây thì danh sách "chủ đề hay vấp" toàn chủ đề đã vững.
        const topic = question.hintTopic
        if (topic !== undefined && attempt.failCount > 0) {
          const key = topic.vi.trim().toLowerCase()
          const existing = topics.get(key)
          if (existing === undefined) {
            const fresh = bump(new Map(), key, attempt)
            topics.set(key, { ...fresh, topic })
          } else {
            existing.attempted += 1
            existing.stumbled += 1
            existing.fails += attempt.failCount
            if (attempt.usedSolution) existing.usedSolution += 1
          }
        }
      }
    }
  }

  const kindRows = finish(kinds)
  return {
    attempted,
    stumbled,
    fails,
    usedSolution,
    byKind: kindRows,
    byModule: finish(byModule),
    byTopic: [...topics.values()]
      .map((t) => ({ ...t, rate: 1, ranked: true }))
      .sort((a, b) => b.fails - a.fails || (a.key < b.key ? -1 : 1)),
    // Chỉ phán khi nhóm đủ mẫu VÀ thật sự có vấp — "yếu nhất" giữa toàn
    // nhóm 0% là một lời phán rỗng.
    toughestKind: kindRows.find((k) => k.ranked && k.stumbled > 0) ?? null,
  }
}

// ---------------------------------------------------------------
// LUYỆN LẠI đúng chỗ vấp (khối 21.9)
// ---------------------------------------------------------------
//
// Phân tích ở trên nói ra chỗ hổng, nhưng nói xong rồi để đấy thì mới
// làm được nửa việc: người học phải tự mò về từng bài để gặp lại đúng
// câu đã vấp. Phần dưới đây soạn thẳng một PHIÊN LUYỆN từ chính những
// câu đó.
//
// BA LUẬT giữ cho nó không phá cơ chế học (nguyên tắc 5 + mastery gate):
//  1. **KHÔNG XP, KHÔNG streak, KHÔNG đụng SM-2.** Câu ở đây đều đã giải
//     xong một lần rồi — cộng điểm cho lượt làm lại là mở đường farm
//     bằng cách cố tình vấp.
//  2. **Không mở khóa gì.** Phiên chỉ lấy câu trong những bài người học
//     ĐÃ HỌC XONG; nó không chạm tới bài chưa mở, không thay bài thi.
//  3. **Trộn xen kẽ module** (interleaving, spec 2.2): ba câu liền nhau
//     cùng một module thành ra luyện khối, mà chính kiểu luyện đó sinh
//     ra ảo giác thành thạo.

/** Một câu trong phiên luyện lại, kèm đường về bài gốc. */
export interface WeakDrillItem {
  moduleId: string
  lessonId: string
  question: Question
  /** Lời giải của bài — hiện sau khi trả lời, đúng nếp màn đáp án. */
  solution: Lesson['steps'][3]['exercises'][number]['solution']
  failCount: number
  usedSolution: boolean
  /**
   * Số lần QUÊN của thẻ đã kéo câu này vào phiên — chỉ có ở phiên luyện
   * "thứ hay quên". Có trường này thì nhãn trên câu nói "từng quên N
   * lần" thay vì "từng vấp N lần": hai con số đo hai chuyện khác nhau,
   * dùng nhầm nhãn là nói sai với người học.
   */
  quen?: number
}

/** Trần một phiên luyện lại — cùng cỡ phiên ôn, đủ dài mà không ngợp. */
export const WEAK_DRILL_CAP = 10

/**
 * Soạn phiên luyện lại từ những câu đã vấp.
 *
 * Thứ tự ba bước có chủ đích: xếp NẶNG TRƯỚC → trộn xen kẽ module →
 * mới cắt trần. Cắt trước khi trộn thì hỏng: mấy câu cùng mức vấp sẽ
 * được phân xử bằng id, mà id thì bắt đầu bằng "m1-", "m2-"… nên trần
 * 10 câu bị một module ăn trọn và phiên thành luyện khối. Trộn trước
 * thì mỗi module góp câu nặng nhất của nó trước, ai còn dư mới góp tiếp.
 */
export function weakSpotDrill(
  modules: readonly Module[],
  lessonRuntimes: Readonly<Record<string, LessonRuntime>>,
  cap = WEAK_DRILL_CAP,
): WeakDrillItem[] {
  const items: WeakDrillItem[] = []
  for (const module of modules) {
    for (const lesson of module.lessons) {
      const runtime = lessonRuntimes[lesson.id]
      if (runtime === undefined) continue
      const exercises = [...lesson.steps[3].exercises, ...lesson.steps[4].questions]
      for (const exercise of exercises) {
        const attempt = runtime.exercises[exercise.question.id]
        // Chỉ câu ĐÃ GIẢI XONG mà từng vấp: câu đang làm dở vẫn nằm
        // trong bài, kéo nó ra đây là hỏi hai nơi cùng một câu.
        if (attempt === undefined || !attempt.solved || attempt.failCount <= 0) continue
        items.push({
          moduleId: module.id,
          lessonId: lesson.id,
          question: exercise.question,
          solution: exercise.solution,
          failCount: attempt.failCount,
          usedSolution: attempt.usedSolution,
        })
      }
    }
  }

  const hardestFirst = [...items].sort(
    (a, b) =>
      b.failCount - a.failCount ||
      Number(b.usedSolution) - Number(a.usedSolution) ||
      (a.question.id < b.question.id ? -1 : a.question.id > b.question.id ? 1 : 0),
  )
  return interleaveModules(hardestFirst).slice(0, cap)
}

/** Xoay vòng theo module, giữ nguyên thứ tự bên trong mỗi module. */
function interleaveModules(items: readonly WeakDrillItem[]): WeakDrillItem[] {
  const queues = new Map<string, WeakDrillItem[]>()
  for (const item of items) {
    const queue = queues.get(item.moduleId)
    if (queue === undefined) queues.set(item.moduleId, [item])
    else queue.push(item)
  }
  const out: WeakDrillItem[] = []
  const lists = [...queues.values()]
  for (let round = 0; out.length < items.length; round += 1) {
    for (const list of lists) {
      const next = list[round]
      if (next !== undefined) out.push(next)
    }
  }
  return out
}

/**
 * Ngưỡng "hay quên": quên từ chừng này lần trở lên mới vào danh sách.
 *
 * Hai là con số của I4 (ảo giác quen mặt) và ở đây cũng đúng vì cùng một
 * lẽ: quên MỘT lần là chuyện thường của trí nhớ — cả cơ chế ôn ngắt quãng
 * dựng lên là để đón đúng cú quên đó. Đưa nó vào danh sách "bạn hay quên"
 * là gọi tên nhầm một chuyện bình thường, và làm danh sách dài tới mức
 * không ai đọc.
 */
export const NGUONG_HAY_QUEN = 2

/** Một thứ người học quên đi quên lại — đọc từ `lapses` của SM-2. */
export interface TheHayQuen {
  /** conceptId, hoặc `palace:<roomId>` với thẻ cung điện. */
  cardId: string
  moduleId: string
  soLanQuen: number
}

/**
 * Những thứ quên đi quên lại nhiều nhất trong hộp ôn tập.
 *
 * VÌ SAO CẦN, dù app đã có "chỗ hay vấp" (chủ dự án hỏi 08-12): hai thứ
 * đo hai chuyện khác hẳn nhau. "Chỗ hay vấp" đọc `failCount` — số lần
 * thử sai LÚC ĐANG HỌC BÀI, tức lúc kiến thức còn chưa vào. Cái này đọc
 * `lapses` — số lần đã học xong, tưởng nhớ rồi, để vài ngày lại quên
 * mất. Thứ hai mới là thứ đáng đem ra dạy lại theo cách khác, vì nó nói
 * rằng cách dạy hiện tại có vào nhưng KHÔNG BÁM.
 *
 * `lapses` vốn đã có sẵn từ ngày đầu (SM-2 tăng nó mỗi lần trả lời sai)
 * nhưng suốt từ đó tới nay chỉ dùng để nói MỘT câu giữa phiên ôn và để
 * xếp thứ tự thẻ — chưa bao giờ được kể lại thành một danh sách.
 *
 * Xếp: quên nhiều lên trước; bằng nhau thì thẻ TRỄ HƠN lên trước (cùng
 * số lần quên thì cái lâu chưa ôn đáng lo hơn); bằng nữa thì theo id cho
 * tất định.
 */
export function theHayQuen(cards: readonly ReviewCard[], limit = 5): TheHayQuen[] {
  return cards
    .filter((c) => c.lapses >= NGUONG_HAY_QUEN)
    .slice()
    .sort(
      (a, b) =>
        b.lapses - a.lapses ||
        (a.dueDate < b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0) ||
        (a.conceptId < b.conceptId ? -1 : a.conceptId > b.conceptId ? 1 : 0),
    )
    .slice(0, limit)
    .map((c) => ({ cardId: c.conceptId, moduleId: c.moduleId, soLanQuen: c.lapses }))
}

/**
 * Soạn phiên luyện lại từ NHỮNG THỨ HAY QUÊN (ý sinh khi làm mục "thứ
 * bạn hay quên", khối 21.52).
 *
 * Anh em với `weakSpotDrill` ngay trên, khác đúng NGUỒN — và cái khác đó
 * là cả lý do nó tồn tại: `weakSpotDrill` lấy câu người học từng thử sai
 * LÚC ĐANG HỌC, còn hàm này lấy bài đã dạy những thứ họ học xong rồi vẫn
 * quên. Vấp là kiến thức chưa vào; quên là đã vào mà không bám.
 *
 * ĐỀ LẤY TỪ ĐÂU: thẻ ôn chỉ giữ mặt trước/mặt sau, không kèm câu hỏi để
 * luyện — nên đề lấy từ bài tập của chính BÀI đã dạy khái niệm ấy. Đó là
 * xấp xỉ có chủ ý và cần nói rõ: một bài dạy vài khái niệm, nên phiên có
 * thể chạm cả những khái niệm hàng xóm. Chấp nhận được, vì chúng cùng
 * một bài và cùng một mạch giải thích — đúng thứ cần gặp lại khi một
 * mảnh trong đó không bám.
 *
 * BA LUẬT của `weakSpotDrill` giữ nguyên: không XP, không đụng lịch ôn,
 * và không mở khóa gì (thẻ ôn chỉ sinh ra sau khi học xong bài, nên bài
 * nguồn luôn là bài đã học).
 */
export function luyenThuHayQuen(
  modules: readonly Module[],
  cards: readonly ReviewCard[],
  cap: number = WEAK_DRILL_CAP,
): WeakDrillItem[] {
  const items: WeakDrillItem[] = []
  // Không cắt trần ở đây — cắt sau khi trộn, đúng lý do đã ghi ở
  // `weakSpotDrill`: cắt trước khi trộn là để một module ăn trọn trần.
  for (const { cardId, soLanQuen } of theHayQuen(cards, cards.length)) {
    const found = baiDayThe(modules, cardId)
    if (found === null) continue // nội dung đã đổi, không còn bài nào dạy nó
    // TRÚNG ĐÍCH TRƯỚC (ý N5): câu nào khai đúng khái niệm bị quên thì chỉ
    // lấy những câu ấy. Không câu nào trong bài khai thì lùi về lấy CẢ BÀI
    // như cũ — thà luyện rộng hơn một chút còn hơn phiên rỗng, và phần lớn
    // bài chỉ có 2 câu nên "rộng hơn" ở đây là rộng thêm đúng một câu.
    const trungDich = found.lesson.steps[3].exercises.filter((e) => e.conceptId === cardId)
    const deBai = trungDich.length > 0 ? trungDich : found.lesson.steps[3].exercises
    for (const exercise of deBai) {
      items.push({
        moduleId: found.module.id,
        lessonId: found.lesson.id,
        question: exercise.question,
        solution: exercise.solution,
        failCount: 0,
        usedSolution: false,
        quen: soLanQuen,
      })
    }
  }
  return interleaveModules(items).slice(0, cap)
}

/**
 * Bài đã dạy thứ nằm trên một thẻ — nhận cả conceptId thường lẫn thẻ
 * cung điện (`palace:<roomId>`, mặt trước là một PHÒNG chứ không phải
 * một khái niệm). Bản thuần của `baiDayKhaiNiem` bên tầng nội dung:
 * engine không được tự đọc kho nội dung nên nhận `modules` từ ngoài.
 */
function baiDayThe(
  modules: readonly Module[],
  cardId: string,
): { module: Module; lesson: Lesson } | null {
  const roomId = roomIdFromCardId(cardId)
  for (const module of modules) {
    for (const lesson of module.lessons) {
      const trung =
        roomId === null
          ? conceptIdsInLesson(lesson).includes(cardId)
          : palaceRoomsInLesson(lesson).includes(roomId)
      if (trung) return { module, lesson }
    }
  }
  return null
}
