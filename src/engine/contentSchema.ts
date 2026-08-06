// Schema Zod cho nội dung bài học (content/modules/*.json).
//
// Đây là "hợp đồng" giữa người soạn bài và engine: nội dung sai cấu trúc
// bị chặn ngay lúc load, engine không phải phòng thủ. Các ràng buộc
// SƯ PHẠM được ép CỨNG ở tầng schema thay vì tầng UI:
//
// - Mỗi bài đúng 6 bước, đúng thứ tự Hook → Pretest → Dạy → Làm →
//   Retrieval → Kết (spec 2.1) — dùng z.tuple nên không thể thiếu bước,
//   thừa bước hay đảo thứ tự. Không tồn tại bài "đọc xong là qua"
//   ngay từ tầng dữ liệu (nguyên tắc 1).
// - Mỗi màn hình Dạy đúng 1 khái niệm (nguyên tắc 3 — cognitive load).
// - Bước Kết đúng 3 gạch đầu dòng + 1 câu úp mở bài sau (peak-end +
//   Zeigarnik, spec 2.1 bước 6).
// - Module chia 4-6 chặng nhìn thấy được (goal gradient, spec 2.4).
// - Bài đầu module phải có ví dụ giải sẵn — worked example fading
//   bắt đầu từ mức 0 (spec 2.1 bước 4).

import { z } from 'zod'
import { LabSpecSchema } from './lab/labSchema'

/**
 * Chuỗi hiển thị cho người học. Phase 1 chỉ có tiếng Việt; trường `en`
 * chừa sẵn cho bản dịch sau (đã chốt: khung UI song ngữ VI/EN, nội dung
 * bài học VI trước, schema có chỗ cho EN).
 */
export const LTextSchema = z.object({
  vi: z.string().min(1),
  en: z.string().min(1).optional(),
})

const idSchema = z.string().min(1)

// ---------------------------------------------------------------
// Câu hỏi
// ---------------------------------------------------------------

/**
 * Giải thích ngắn "vì sao đáp án là vậy" — hiện SAU khi người học đã
 * trả lời (đúng hay sai đều thấy, feedback tức thời củng cố trí nhớ).
 * BẮT BUỘC với câu đứng độc lập (pretest, mastery test — cross-check
 * ép ở cấp module); câu nằm trong Exercise đã có `solution` đóng vai
 * này nên được miễn.
 */
const explainField = LTextSchema.optional()

/** Câu gõ tay — dạng CHÍNH (generation effect; spec 2.1 bước 4:
 *  "Người dùng phải GÕ đáp án, hạn chế trắc nghiệm"). */
const TypedQuestionSchema = z.object({
  kind: z.literal('typed'),
  id: idSchema,
  prompt: LTextSchema,
  /** Các đáp án chấp nhận; so khớp sau khi normalize (grading/). */
  accept: z.array(z.string().min(1)).min(1),
  /** "X" trong phản hồi tầng 1: "Gần rồi — nghĩ lại về X nhé" (spec 4.4). */
  hintTopic: LTextSchema.optional(),
  explain: explainField,
  /**
   * Câu trả lời CẬN-ĐÚNG được đón bằng phản hồi riêng thay vì chấm sai
   * khô khốc (vd hỏi "vai trò" mà gõ tên thiết bị). Vẫn tính là một lần
   * sai (thang 3 tầng chạy tiếp) — chỉ lời phản hồi là may đo.
   */
  nearMisses: z
    .array(
      z.object({
        accept: z.array(z.string().min(1)).min(1),
        feedback: LTextSchema,
      }),
    )
    .min(1)
    .optional(),
})

/** Trắc nghiệm — dùng hạn chế, chủ yếu cho pretest. */
const McqQuestionSchema = z.object({
  kind: z.literal('mcq'),
  id: idSchema,
  prompt: LTextSchema,
  choices: z.array(LTextSchema).min(2),
  answerIndex: z.number().int().min(0),
  hintTopic: LTextSchema.optional(),
  explain: explainField,
})

/** Kéo-thả xếp thứ tự (retrieval Module 2: xếp lại 8 chặng đường đi).
 *  `items` liệt kê theo THỨ TỰ ĐÚNG; UI chịu trách nhiệm xáo trộn. */
const OrderQuestionSchema = z.object({
  kind: z.literal('order'),
  id: idSchema,
  prompt: LTextSchema,
  items: z.array(LTextSchema).min(2),
  hintTopic: LTextSchema.optional(),
  explain: explainField,
})

/**
 * Bài lab: người học lắp/sửa một sơ đồ mạng thay vì gõ chữ (spec Module
 * 4). Về mặt hợp đồng nó VẪN LÀ MỘT CÂU HỎI — có id, có đề, chấm ra
 * đúng/sai — nên toàn bộ máy trạng thái 6 bước, thang phản hồi 3 tầng,
 * XP và mastery gate dùng lại được nguyên vẹn, không sửa một dòng nào.
 *
 * Phần mô tả mạng nằm trong `spec` (schema riêng ở engine/lab), thuần
 * kỹ thuật; mọi chuỗi hiển thị vẫn ở tầng câu hỏi như các dạng khác.
 */
const LabQuestionSchema = z.object({
  kind: z.literal('lab'),
  id: idSchema,
  prompt: LTextSchema,
  spec: LabSpecSchema,
  hintTopic: LTextSchema.optional(),
  explain: explainField,
})

export const QuestionSchema = z.discriminatedUnion('kind', [
  TypedQuestionSchema,
  McqQuestionSchema,
  OrderQuestionSchema,
  LabQuestionSchema,
])

// ---------------------------------------------------------------
// Khái niệm — đơn vị sinh flashcard
// ---------------------------------------------------------------

export const ConceptSchema = z.object({
  id: idSchema,
  /** Thuật ngữ chuẩn — giữ tiếng Anh nếu là thuật ngữ nghề (spec 4.4). */
  term: z.string().min(1),
  /** Giải nghĩa tiếng Việt cho lần xuất hiện đầu tiên (spec 4.4). */
  glossVi: z.string().min(1),
  /** Ẩn dụ đời thường — hệ ẩn dụ bưu điện nhất quán xuyên app (Module 1). */
  metaphor: LTextSchema,
  /** 1 khái niệm = 1 hình cố định toàn app (picture superiority, spec 4.2). */
  iconId: idSchema,
  /** Nguồn sinh flashcard tự động vào Hộp ôn tập (spec 2.2). */
  flashcard: z
    .object({
      front: LTextSchema,
      back: LTextSchema,
    })
    .optional(),
  /**
   * Khái niệm meta (vd "bản đồ lộ trình") không vào Hộp ôn tập.
   * Cross-check cấp module ép: không có cờ này thì flashcard BẮT BUỘC —
   * mặc định của spec 2.2 ("mỗi khái niệm học xong sinh flashcard")
   * vẫn là luật, cờ là ngoại lệ phải khai tường minh.
   */
  noFlashcard: z.literal(true).optional(),
})

// ---------------------------------------------------------------
// 6 bước của một bài học (spec 2.1)
// ---------------------------------------------------------------

/** Bước 1 — Hook: 1 câu hỏi lạ chưa trả lời (curiosity gap). */
export const HookStepSchema = z.object({
  type: z.literal('hook'),
  question: LTextSchema,
  visualId: idSchema.optional(),
})

/** Bước 2 — Pretest: 1-2 câu về nội dung SẮP học; sai không trừ điểm. */
export const PretestStepSchema = z.object({
  type: z.literal('pretest'),
  questions: z.array(QuestionSchema).min(1).max(2),
  /** Lời động viên khi sai ("não bạn vừa được 'mồi'..."). */
  encouragement: LTextSchema,
})

/** Một màn hình dạy = ĐÚNG 1 khái niệm (nguyên tắc 3). */
export const TeachScreenSchema = z.object({
  conceptId: idSchema,
  visualId: idSchema,
  /** Chữ ngắn đặt NGAY CẠNH hình (Mayer — spatial contiguity). */
  body: LTextSchema,
  /** Chi tiết nâng cao giấu sau nút "Đào sâu hơn" (progressive disclosure). */
  deepDive: LTextSchema.optional(),
})

/** Bước 3 — Dạy. */
export const TeachStepSchema = z.object({
  type: z.literal('teach'),
  screens: z.array(TeachScreenSchema).min(1),
})

/**
 * Bài tập với phản hồi 3 tầng (spec 4.4, nguyên tắc 4):
 * tầng 1 sinh từ hintTopic của câu hỏi, tầng 2 = hint (sau 2 lần sai),
 * tầng 3 = solution (sau 3 lần sai). Không bao giờ hiện "SAI" trần trụi.
 */
export const ExerciseSchema = z.object({
  question: QuestionSchema,
  hint: LTextSchema,
  solution: LTextSchema,
})

/** Bước 4 — Làm (productive failure + worked example fading). */
export const PracticeStepSchema = z.object({
  type: z.literal('practice'),
  /**
   * Worked example fading trong module: 0 = có ví dụ giải sẵn đầy đủ
   * (bắt buộc ở bài đầu module), 1 = điền chỗ trống, 2 = tự làm hẳn.
   */
  fadingLevel: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  workedExample: LTextSchema.optional(),
  exercises: z.array(ExerciseSchema).min(1),
})

/** Bước 5 — Retrieval: đóng hết nội dung, trả lời từ trí nhớ. */
export const RetrievalStepSchema = z.object({
  type: z.literal('retrieval'),
  questions: z.array(ExerciseSchema).min(1),
  /** "Giải thích tại sao bằng lời của bạn" — chấm keyword matching (MVP). */
  selfExplain: z.object({
    prompt: LTextSchema,
    /** Nhóm từ khóa: mỗi nhóm là các cách nói tương đương, khớp 1 là đủ. */
    keywords: z.array(z.array(z.string().min(1)).min(1)).min(1),
    /** Câu trả lời mẫu — tầng 3 khi 3 lần chưa đủ ý. */
    exampleAnswer: LTextSchema,
  }),
})

/** Bước 6 — Kết: tổng kết 3 ý + úp mở bài sau (peak-end + Zeigarnik). */
export const SummaryStepSchema = z.object({
  type: z.literal('summary'),
  bullets: z.tuple([LTextSchema, LTextSchema, LTextSchema]),
  nextTeaser: LTextSchema,
})

/**
 * Pipeline 6 bước CỐ ĐỊNH — tuple ép đúng loại, đúng thứ tự, đúng số
 * lượng ngay khi parse. Đây là chốt chặn dữ liệu của nguyên tắc 1.
 */
export const StepsSchema = z.tuple([
  HookStepSchema,
  PretestStepSchema,
  TeachStepSchema,
  PracticeStepSchema,
  RetrievalStepSchema,
  SummaryStepSchema,
])

export const LessonSchema = z.object({
  id: idSchema,
  /** Tên kiểu nhiệm vụ, có động từ: "Giải cứu gói tin bị lạc" (spec 4.4). */
  missionTitle: LTextSchema,
  steps: StepsSchema,
})

/** Chặng nhỏ trong module (goal gradient). */
export const StageSchema = z.object({
  id: idSchema,
  title: LTextSchema,
  lessonIds: z.array(idSchema).min(1),
})

const ModuleBaseSchema = z.object({
  id: idSchema,
  order: z.number().int().min(1),
  part: z.enum(['A', 'B', 'C']),
  title: LTextSchema,
  /** 4-6 chặng nhìn thấy được (spec 2.4); Module 3 dùng đủ 6. */
  stages: z.array(StageSchema).min(4).max(6),
  lessons: z.array(LessonSchema).min(1),
  concepts: z.array(ConceptSchema).min(1),
  /**
   * Bài kiểm tra module — mastery gate ≥ 85% (nguyên tắc 2). Tối thiểu
   * 5 câu để ngưỡng 85% có ý nghĩa thống kê tối thiểu.
   */
  masteryTest: z.array(QuestionSchema).min(5),
  /** Module 3 bật chế độ drill subnetting hằng ngày. */
  drill: z.literal('subnet').optional(),
})

// ---------------------------------------------------------------
// Ràng buộc chéo (không diễn đạt được bằng cấu trúc thuần)
// ---------------------------------------------------------------

type ModuleBase = z.infer<typeof ModuleBaseSchema>
type QuestionT = z.infer<typeof QuestionSchema>
type LessonT = z.infer<typeof LessonSchema>

/** Các conceptId được dạy trong một bài (từ các màn hình bước Dạy). */
export function conceptIdsInLesson(lesson: LessonT): string[] {
  const teach = lesson.steps[2]
  return [...new Set(teach.screens.map((s) => s.conceptId))]
}

/** Thứ tự bài học chuẩn của module = duyệt các chặng theo thứ tự. */
export function orderedLessonIds(mod: ModuleBase): string[] {
  return mod.stages.flatMap((st) => st.lessonIds)
}

/**
 * Gom mọi câu hỏi trong module (pretest, practice, retrieval, mastery
 * test). `standalone` = câu không nằm trong Exercise — bắt buộc phải có
 * `explain` vì không có `solution` nào đóng vai lời giải thích.
 */
function collectQuestions(mod: ModuleBase): { q: QuestionT; where: string; standalone: boolean }[] {
  const out: { q: QuestionT; where: string; standalone: boolean }[] = []
  for (const [li, lesson] of mod.lessons.entries()) {
    const [, pretest, , practice, retrieval] = lesson.steps
    pretest.questions.forEach((q, i) =>
      out.push({ q, where: `lessons[${li}].steps[1].questions[${i}]`, standalone: true }),
    )
    practice.exercises.forEach((e, i) =>
      out.push({ q: e.question, where: `lessons[${li}].steps[3].exercises[${i}]`, standalone: false }),
    )
    retrieval.questions.forEach((e, i) =>
      out.push({ q: e.question, where: `lessons[${li}].steps[4].questions[${i}]`, standalone: false }),
    )
  }
  mod.masteryTest.forEach((q, i) => out.push({ q, where: `masteryTest[${i}]`, standalone: true }))
  return out
}

function moduleCrossChecks(mod: ModuleBase, ctx: z.RefinementCtx): void {
  const issue = (path: (string | number)[], message: string) =>
    ctx.addIssue({ code: 'custom', message, path })

  // ID không trùng lặp
  const dupCheck = (ids: string[], label: string) => {
    const seen = new Set<string>()
    for (const id of ids) {
      if (seen.has(id)) issue([label], `Trùng id "${id}" trong ${label}`)
      seen.add(id)
    }
  }
  dupCheck(mod.lessons.map((l) => l.id), 'lessons')
  dupCheck(mod.concepts.map((c) => c.id), 'concepts')
  dupCheck(mod.stages.map((s) => s.id), 'stages')
  dupCheck(collectQuestions(mod).map((x) => x.q.id), 'questions')

  // Chặng ↔ bài học: mỗi bài thuộc đúng 1 chặng, không tham chiếu mồ côi
  const lessonIds = new Set(mod.lessons.map((l) => l.id))
  const referenced = new Map<string, number>()
  for (const [si, stage] of mod.stages.entries()) {
    for (const lid of stage.lessonIds) {
      if (!lessonIds.has(lid)) {
        issue(['stages', si, 'lessonIds'], `Chặng "${stage.id}" tham chiếu bài học không tồn tại: "${lid}"`)
      }
      referenced.set(lid, (referenced.get(lid) ?? 0) + 1)
    }
  }
  for (const l of mod.lessons) {
    const count = referenced.get(l.id) ?? 0
    if (count === 0) issue(['lessons'], `Bài học "${l.id}" không thuộc chặng nào`)
    if (count > 1) issue(['stages'], `Bài học "${l.id}" xuất hiện trong nhiều hơn 1 chặng`)
  }

  // Khái niệm: màn dạy tham chiếu concept có thật; concept nào cũng được dạy
  // (concept sinh flashcard "khi học xong" — concept không được dạy sẽ không
  // bao giờ vào Hộp ôn tập, tức là lỗi soạn bài).
  const conceptIds = new Set(mod.concepts.map((c) => c.id))
  const taught = new Set<string>()
  for (const [li, lesson] of mod.lessons.entries()) {
    const teach = lesson.steps[2]
    const seenInLesson = new Set<string>()
    for (const [si, screen] of teach.screens.entries()) {
      if (!conceptIds.has(screen.conceptId)) {
        issue(['lessons', li, 'steps', 2, 'screens', si], `Màn dạy tham chiếu concept không tồn tại: "${screen.conceptId}"`)
      }
      if (seenInLesson.has(screen.conceptId)) {
        issue(
          ['lessons', li, 'steps', 2, 'screens', si],
          `Concept "${screen.conceptId}" bị dạy lặp trong cùng một bài — mỗi màn hình phải là 1 khái niệm MỚI (nguyên tắc 3)`,
        )
      }
      seenInLesson.add(screen.conceptId)
      taught.add(screen.conceptId)
    }
  }
  for (const c of mod.concepts) {
    if (!taught.has(c.id)) {
      issue(['concepts'], `Concept "${c.id}" không được dạy ở màn hình nào — sẽ không bao giờ sinh flashcard`)
    }
    // Flashcard là mặc định (spec 2.2); miễn trừ phải khai noFlashcard.
    if (c.flashcard === undefined && c.noFlashcard !== true) {
      issue(['concepts'], `Concept "${c.id}" thiếu flashcard — muốn miễn phải khai noFlashcard: true`)
    }
    if (c.flashcard !== undefined && c.noFlashcard === true) {
      issue(['concepts'], `Concept "${c.id}" vừa có flashcard vừa khai noFlashcard — chọn một`)
    }
  }

  // MCQ: answerIndex phải trỏ vào choices; câu độc lập phải có explain
  for (const { q, where, standalone } of collectQuestions(mod)) {
    if (q.kind === 'mcq' && q.answerIndex >= q.choices.length) {
      issue([where], `Câu "${q.id}": answerIndex ${q.answerIndex} vượt quá số lựa chọn (${q.choices.length})`)
    }
    if (standalone && q.explain === undefined) {
      issue(
        [where],
        `Câu "${q.id}" đứng độc lập (pretest/mastery test) phải có "explain" — người học luôn được thấy vì sao đáp án là vậy`,
      )
    }
  }

  // Worked example fading: bài ĐẦU module bắt buộc mức 0 kèm ví dụ giải sẵn
  // (spec 2.1 bước 4: "Bài đầu module: có ví dụ giải sẵn").
  const ordered = orderedLessonIds(mod)
  const firstLesson = mod.lessons.find((l) => l.id === ordered[0])
  if (firstLesson) {
    const practice = firstLesson.steps[3]
    if (practice.fadingLevel !== 0) {
      issue(['lessons'], `Bài đầu module ("${firstLesson.id}") phải có fadingLevel 0 — ví dụ giải sẵn đầy đủ`)
    }
  }
  // Mọi practice mức 0 phải kèm workedExample thật
  for (const [li, lesson] of mod.lessons.entries()) {
    const practice = lesson.steps[3]
    if (practice.fadingLevel === 0 && !practice.workedExample) {
      issue(['lessons', li, 'steps', 3], `Bài "${lesson.id}": fadingLevel 0 nhưng thiếu workedExample`)
    }
  }
}

export const ModuleSchema = ModuleBaseSchema.superRefine(moduleCrossChecks)

// ---------------------------------------------------------------
// Kiểu suy ra & hàm parse
// ---------------------------------------------------------------

export type LText = z.infer<typeof LTextSchema>
export type Question = z.infer<typeof QuestionSchema>
export type TypedQuestion = Extract<Question, { kind: 'typed' }>
export type McqQuestion = Extract<Question, { kind: 'mcq' }>
export type OrderQuestion = Extract<Question, { kind: 'order' }>
export type Concept = z.infer<typeof ConceptSchema>
export type HookStep = z.infer<typeof HookStepSchema>
export type PretestStep = z.infer<typeof PretestStepSchema>
export type TeachScreen = z.infer<typeof TeachScreenSchema>
export type TeachStep = z.infer<typeof TeachStepSchema>
export type Exercise = z.infer<typeof ExerciseSchema>
export type PracticeStep = z.infer<typeof PracticeStepSchema>
export type RetrievalStep = z.infer<typeof RetrievalStepSchema>
export type SummaryStep = z.infer<typeof SummaryStepSchema>
export type Step = z.infer<typeof StepsSchema>[number]
export type Lesson = z.infer<typeof LessonSchema>
export type Stage = z.infer<typeof StageSchema>
export type Module = z.infer<typeof ModuleSchema>

/**
 * Parse + validate một module từ JSON. Ném lỗi gộp, dễ đọc, trỏ đúng
 * vị trí sai — lỗi này dành cho NGƯỜI SOẠN BÀI lúc dev/build, không
 * bao giờ hiển thị cho người học.
 */
export function parseModule(data: unknown): Module {
  const result = ModuleSchema.safeParse(data)
  if (!result.success) {
    const lines = result.error.issues.map((i) => `- [${i.path.join('.')}] ${i.message}`)
    throw new Error(`Nội dung module không hợp lệ:\n${lines.join('\n')}`)
  }
  return result.data
}

/**
 * Kiểm tra chéo GIỮA các module — gọi ở tầng nạp nội dung sau khi từng
 * module đã qua parseModule. superRefine của ModuleSchema chỉ nhìn được
 * MỘT module; trong khi đó ReviewCard nhận diện thẻ bằng conceptId trên
 * toàn app (spec 2.2), nên hai module trùng conceptId sẽ đè thẻ của nhau
 * trong Hộp ôn tập. Lesson id và question id cũng phải duy nhất toàn cục
 * (khóa của LessonProgress và dữ liệu trả lời). Lỗi dành cho người soạn
 * bài lúc dev/build, không bao giờ hiển thị cho người học.
 *
 * `order` cũng phải duy nhất: thứ tự module CHÍNH LÀ chuỗi mở khóa của
 * mastery gate (nguyên tắc 2). Hai module trùng `order` khiến phép sắp
 * xếp không xác định được ai trước ai — gate có thể mở nhầm module.
 */
export function validateModules(modules: readonly Module[]): void {
  const problems: string[] = []
  const claim = (registry: Map<string, string>, id: string, moduleId: string, label: string) => {
    const owner = registry.get(id)
    if (owner === undefined) registry.set(id, moduleId)
    else problems.push(`${label} "${id}" xuất hiện ở cả module "${owner}" và "${moduleId}"`)
  }

  const moduleIds = new Set<string>()
  const orders = new Map<number, string>()
  const conceptIds = new Map<string, string>()
  const lessonIds = new Map<string, string>()
  const questionIds = new Map<string, string>()
  for (const mod of modules) {
    if (moduleIds.has(mod.id)) problems.push(`Trùng module id "${mod.id}"`)
    moduleIds.add(mod.id)
    const orderOwner = orders.get(mod.order)
    if (orderOwner === undefined) orders.set(mod.order, mod.id)
    else problems.push(`Trùng order ${mod.order} giữa module "${orderOwner}" và "${mod.id}"`)
    for (const c of mod.concepts) claim(conceptIds, c.id, mod.id, 'Concept')
    for (const l of mod.lessons) claim(lessonIds, l.id, mod.id, 'Lesson')
    for (const { q } of collectQuestions(mod)) claim(questionIds, q.id, mod.id, 'Question')
  }
  if (problems.length > 0) {
    throw new Error(`Nội dung liên-module không hợp lệ:\n${problems.map((p) => `- ${p}`).join('\n')}`)
  }
}
