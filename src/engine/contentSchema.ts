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
import { ClinicCaseSpecSchema } from './clinic/clinicSchema'
import { PsSpecSchema } from './ps/psSchema'
import { CliSpecSchema } from './cli/cliSchema'
import { PalaceSchema } from './palace/palaceSchema'
import { LTextSchema } from './ltextSchema'
import type { LText } from './ltext'

/** Chuỗi hiển thị cho người học — định nghĩa ở `./ltext` (dùng chung với
 *  các schema nội dung khác); re-export để nơi gọi cũ không phải sửa. */
export { LTextSchema }
export type { LText }

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

/**
 * Cờ CÂU TRỤ theo từng câu: một câu typed/mcq/order vẫn có thể LÀ kỹ năng
 * chính của module (M13: bài cắt VLSM liên hoàn là câu tính-tay, không có
 * kind trụ nào chở được nó). `isAnchorQuestion` đọc cờ này TRƯỚC rồi mới
 * xét kind — biên bản hội đồng trung cấp, ghế Đo lường.
 */
const anchorField = z.literal(true).optional()

/** Câu gõ tay — dạng CHÍNH (generation effect; spec 2.1 bước 4:
 *  "Người dùng phải GÕ đáp án, hạn chế trắc nghiệm"). */
const TypedQuestionSchema = z.object({
  kind: z.literal('typed'),
  id: idSchema,
  anchor: anchorField,
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
  anchor: anchorField,
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
  anchor: anchorField,
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

/**
 * Đi lại một đoạn cung điện ký ức từ trí nhớ (spec Module 5). Cũng như
 * lab, đây VẪN LÀ MỘT CÂU HỎI — có id, có đề, chấm ra đúng/sai — nên
 * máy trạng thái 6 bước, thang 3 tầng, XP và mastery gate dùng lại
 * nguyên vẹn. `rooms` là đoạn đường phải đi; tòa nhà khai ở cấp module.
 */
const PalaceWalkQuestionSchema = z.object({
  kind: z.literal('palace-walk'),
  id: idSchema,
  prompt: LTextSchema,
  rooms: z.array(idSchema).min(1),
  hintTopic: LTextSchema.optional(),
  explain: explainField,
})

/**
 * Ca bệnh Phòng khám (spec Module 11) — dạng câu hỏi thứ SÁU. Người học
 * khám mạng của "bệnh nhân" qua terminal (không được nhìn sơ đồ trước),
 * rồi trả lời HAI phần trong một lượt nộp: CHẨN ĐOÁN (chọn bệnh trong
 * `diagnosis.choices`) và SỬA (theo `spec.fix`: sửa sơ đồ chấm bằng
 * gradeClinicFix, hoặc chọn hành động trong `actions.choices` với ca
 * ngoài mô hình mạng). Về hợp đồng nó VẪN LÀ MỘT CÂU HỎI — có id, có đề,
 * chấm ra đúng/sai — nên máy trạng thái 6 bước, thang 3 tầng, XP và
 * mastery gate dùng lại nguyên vẹn, không sửa một dòng nào.
 *
 * Phần kỹ thuật của ca (mạng + hồ sơ bệnh + triệu chứng + cách sửa) nằm
 * trong `spec` (schema riêng ở engine/clinic); chuỗi hiển thị ở đây.
 */
const ClinicQuestionSchema = z.object({
  kind: z.literal('clinic'),
  id: idSchema,
  /** Lời than của bệnh nhân — chính là "đề bài" người học nhận được. */
  prompt: LTextSchema,
  spec: ClinicCaseSpecSchema,
  /** Danh sách bệnh khả dĩ để người học chọn sau khi khám. */
  diagnosis: z.object({
    choices: z.array(LTextSchema).min(2),
    answerIndex: z.number().int().min(0),
  }),
  /** Hành động xử lý — BẮT BUỘC khi spec.fix là 'choose-action' (cross-check ép). */
  actions: z
    .object({
      choices: z.array(LTextSchema).min(2),
      answerIndex: z.number().int().min(0),
    })
    .optional(),
  hintTopic: LTextSchema.optional(),
  explain: explainField,
})

/**
 * Bài terminal PowerShell (spec Module 12) — dạng câu hỏi thứ BẢY.
 * Người học GÕ LỆNH THẬT vào terminal ảo để đạt mục tiêu (generation
 * effect tối đa); chấm theo hiệu ứng + dấu vết hành động qua gradePs,
 * không so chuỗi lệnh. Gợi ý mờ dần map vào thang 3 tầng sẵn có:
 * tầng 1 hintTopic → tầng 2 cú pháp khuyết (hint của Exercise) →
 * tầng 3 lệnh đầy đủ. Về hợp đồng nó VẪN LÀ MỘT CÂU HỎI — máy trạng
 * thái 6 bước, XP và mastery gate dùng lại nguyên vẹn.
 */
const PsQuestionSchema = z.object({
  kind: z.literal('ps'),
  id: idSchema,
  prompt: LTextSchema,
  spec: PsSpecSchema,
  hintTopic: LTextSchema.optional(),
  explain: explainField,
})

/**
 * Bài CLI thiết bị (spec v2 Phần D) — dạng câu hỏi thứ TÁM. Người học gõ
 * lệnh IOS thật lên console của switch/router để đạt mục tiêu; chấm theo
 * hiệu ứng trên sơ đồ + dấu vết đã tra bảng nào, không so chuỗi lệnh.
 * Thang gợi ý mờ dần dùng lại thang 3 tầng sẵn có: hintTopic → cú pháp
 * khuyết (hint của Exercise) → chuỗi lệnh mẫu. Về hợp đồng nó VẪN LÀ MỘT
 * CÂU HỎI, nên máy trạng thái 6 bước, XP và mastery gate không đổi.
 */
const CliQuestionSchema = z.object({
  kind: z.literal('cli'),
  id: idSchema,
  prompt: LTextSchema,
  spec: CliSpecSchema,
  hintTopic: LTextSchema.optional(),
  explain: explainField,
})

export const QuestionSchema = z.discriminatedUnion('kind', [
  TypedQuestionSchema,
  McqQuestionSchema,
  OrderQuestionSchema,
  LabQuestionSchema,
  PalaceWalkQuestionSchema,
  ClinicQuestionSchema,
  PsQuestionSchema,
  CliQuestionSchema,
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
      /**
       * Cách hỏi KHÁC cho cùng một mặt sau (kho ý tưởng H5).
       *
       * Thẻ chỉ hỏi xuôi một kiểu thì sau vài lượt người học nhớ MẶT CHỮ
       * của câu hỏi rồi đọc thuộc lòng mặt sau — nhất là với danh sách
       * học bằng câu nhớ. Xoay cách hỏi (điền chỗ khuyết, hỏi ngược một
       * mắt xích) buộc phải lấy lại đúng thứ đó từ trí nhớ chứ không phải
       * lấy lại cái phản xạ đọc trôi.
       *
       * LUẬT SOẠN BÀI: mọi cách hỏi ở đây phải trả lời được TRỌN VẸN bằng
       * đúng `back` bên trên — mặt sau không đổi theo cách hỏi, nếu không
       * thì đây là hai thẻ chứ không phải một.
       */
      alsoAsk: z.array(LTextSchema).min(1).max(3).optional(),
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
  /**
   * Màn dạy này là một chuyến ĐI XEM cung điện ký ức: liệt kê các phòng
   * của chuyến (spec Module 5). Vẫn đúng "một màn = một khái niệm" —
   * khái niệm ở đây chính là cung điện; và vì nội dung tự chọn đoạn
   * đường nên 15 phòng chia ra học dần được, không nhồi một lượt.
   */
  palaceTour: z.array(idSchema).min(1).optional(),
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
  part: z.enum(['A', 'B', 'C', 'D', 'E']),
  title: LTextSchema,
  /** 4-6 chặng nhìn thấy được (spec 2.4); Module 3 dùng đủ 6. */
  stages: z.array(StageSchema).min(4).max(6),
  lessons: z.array(LessonSchema).min(1),
  concepts: z.array(ConceptSchema).min(1),
  /**
   * POOL câu hỏi của bài kiểm tra module — mastery gate ≥ 85% (nguyên
   * tắc 2). Một lượt thi KHÔNG hỏi trọn pool: `drawMasteryTest` rút ra
   * một đề con cỡ cố định (engine/masteryPool), nên thi lại là đề khác.
   * Min 5 chỉ là sàn kỹ thuật cho fixture; nội dung thật phải >= 12 câu
   * — luật đó ép ở content.test.ts vì nó là quy ước nội dung.
   */
  masteryTest: z.array(QuestionSchema).min(5),
  /**
   * THƯ CUỐI MODULE (kho ý tưởng D2) — đọc ở màn ĐẬU bài thi module.
   * Vài câu kể "giờ bạn làm được gì mà lúc mở module này chưa làm được",
   * viết bằng giọng người trực ca đêm để lại lời nhắn cho ca sáng.
   *
   * Là NỘI DUNG nên nằm trong data, không nằm trong code: mỗi module một
   * lá thư riêng vì mỗi module cho người học một tay nghề khác nhau —
   * sinh tự động từ tên bài chỉ ra một mẫu câu rỗng.
   *
   * Tùy chọn ở tầng schema (fixture test không cần thư), nhưng nội dung
   * THẬT thì bắt buộc — luật đó ở `content.test.ts` cùng chỗ với luật
   * pool >= 12 câu.
   */
  letter: LTextSchema.optional(),
  /**
   * Chế độ drill hằng ngày của module: `subnet` là bài TÍNH LẠI của
   * Module 3, `vlsm` là bài THIẾT KẾ của Module 13 (spec v2 mục 4.4).
   */
  drill: z.enum(['subnet', 'vlsm']).optional(),
  /**
   * Cung điện ký ức của module (spec Module 5 — tòa nhà 15 phòng). Khai
   * ở cấp module chứ không ở từng bài: tòa nhà là MỘT, các bài chỉ đi
   * những đoạn khác nhau của nó.
   */
  palace: PalaceSchema.optional(),
  /**
   * Checklist dựng lab VMware thật song song (spec Module 9: "app track
   * tiến độ lab"). App chỉ THEO DÕI — việc thật xảy ra ngoài app, không
   * kiểm chứng được, nên tick xong KHÔNG cộng XP (nguyên tắc 5).
   */
  vmLab: z
    .object({
      title: LTextSchema,
      intro: LTextSchema.optional(),
      steps: z.array(z.object({ id: idSchema, text: LTextSchema })).min(3),
    })
    .optional(),
})

// ---------------------------------------------------------------
// Ràng buộc chéo (không diễn đạt được bằng cấu trúc thuần)
// ---------------------------------------------------------------

type ModuleBase = z.infer<typeof ModuleBaseSchema>
type QuestionT = z.infer<typeof QuestionSchema>
type LessonT = z.infer<typeof LessonSchema>

// Ba hàm thuần dời sang contentPure.ts (đường nóng PROD không được kéo
// tháp zod này) — re-export để chỗ đã sẵn cần zod import đâu cũng được.
export { conceptIdsInLesson, orderedLessonIds, palaceRoomsInLesson } from './contentPure'
import { orderedLessonIds } from './contentPure'

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

type IssueFn = (path: (string | number)[], message: string) => void

/**
 * Ràng buộc của cung điện ký ức ở cấp module (spec Module 5).
 *
 * Điều quan trọng nhất ép ở đây là THỨ TỰ: phòng nào cũng phải được đi
 * xem TRƯỚC khi bị hỏi lại từ trí nhớ. Hỏi một phòng chưa từng dẫn qua
 * không phải là "đề khó" — đó là bắt đoán mò, và nó phá đúng cái cơ chế
 * mà cung điện dựng lên. Đây là bản sao của luật "concept phải được dạy
 * mới sinh flashcard" đang có, chỉ khác đơn vị.
 */
function palaceCrossChecks(mod: ModuleBase, issue: IssueFn): void {
  const tourScreens = mod.lessons.flatMap((lesson, li) =>
    lesson.steps[2].screens.flatMap((screen, si) =>
      screen.palaceTour === undefined ? [] : [{ lessonId: lesson.id, li, si, rooms: screen.palaceTour }],
    ),
  )
  const walkQuestions = collectQuestions(mod).flatMap(({ q, where }) =>
    q.kind === 'palace-walk' ? [{ q, where }] : [],
  )

  if (mod.palace === undefined) {
    for (const screen of tourScreens) {
      issue(['lessons', screen.li, 'steps', 2, 'screens', screen.si], 'Màn dạy khai palaceTour nhưng module không có cung điện')
    }
    for (const { q, where } of walkQuestions) {
      issue([where], `Câu "${q.id}" đi lại cung điện nhưng module không có cung điện`)
    }
    return
  }

  const palace = mod.palace
  const roomIds = new Set(palace.rooms.map((r) => r.id))
  const tourOrder: string[] = []
  const touredIn = new Map<string, string>()

  for (const screen of tourScreens) {
    const path = ['lessons', screen.li, 'steps', 2, 'screens', screen.si]
    for (const roomId of screen.rooms) {
      if (!roomIds.has(roomId)) {
        issue(path, `Chuyến đi xem nhắc tới phòng "${roomId}" không có trong cung điện "${palace.id}"`)
        continue
      }
      const owner = touredIn.get(roomId)
      if (owner !== undefined) {
        issue(path, `Phòng "${roomId}" được đi xem ở cả bài "${owner}" lẫn bài "${screen.lessonId}" — mỗi phòng chỉ dạy một lần`)
        continue
      }
      touredIn.set(roomId, screen.lessonId)
      tourOrder.push(roomId)
    }
  }

  // Thứ tự học chuẩn của module, dùng để trả lời câu "tour trước hay
  // câu hỏi trước". Trong CÙNG một bài thì bước Dạy (index 2) luôn đứng
  // trước bước Làm (3) và Nhớ lại (4), nên chỉ cần so ở mức bài học.
  const lessonRank = new Map(orderedLessonIds(mod).map((id, i) => [id, i]))
  const rankOfTour = (roomId: string): number => {
    const lessonId = touredIn.get(roomId)
    return lessonId === undefined ? Number.POSITIVE_INFINITY : (lessonRank.get(lessonId) ?? Number.POSITIVE_INFINITY)
  }

  const askedRooms = new Set<string>()
  for (const { q, where } of walkQuestions) {
    if (q.kind !== 'palace-walk') continue
    if (new Set(q.rooms).size !== q.rooms.length) {
      issue([where], `Câu "${q.id}" liệt kê trùng phòng`)
    }
    // Bài kiểm tra module đứng sau MỌI bài học, nên nó được hỏi tất cả.
    const isMasteryTest = where.startsWith('masteryTest')
    const lessonIndex = Number(where.match(/^lessons\[(\d+)\]/)?.[1] ?? '-1')
    const askedInRank = isMasteryTest
      ? Number.POSITIVE_INFINITY
      : (lessonRank.get(mod.lessons[lessonIndex]?.id ?? '') ?? Number.POSITIVE_INFINITY)

    for (const roomId of q.rooms) {
      if (!roomIds.has(roomId)) {
        issue([where], `Câu "${q.id}" nhắc tới phòng "${roomId}" không có trong cung điện "${palace.id}"`)
        continue
      }
      askedRooms.add(roomId)
      if (rankOfTour(roomId) > askedInRank) {
        issue(
          [where],
          `Câu "${q.id}" hỏi phòng "${roomId}" trước khi người học được dẫn qua phòng đó — cung điện chỉ hoạt động khi đi xem trước rồi mới nhớ lại`,
        )
      }
    }
  }

  // Có tòa nhà thì phải dùng nó, và dạy tới đâu phải nhớ lại tới đó
  // (nguyên tắc 1 — không có gì "học xong là qua").
  if (tourOrder.length === 0) {
    issue(['palace'], `Module khai cung điện "${palace.id}" nhưng không bài nào dẫn người học đi xem`)
  }
  for (const roomId of tourOrder) {
    if (!askedRooms.has(roomId)) {
      issue(['palace'], `Phòng "${roomId}" được đi xem nhưng không câu hỏi nào bắt nhớ lại`)
    }
  }
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
  if (mod.vmLab !== undefined) dupCheck(mod.vmLab.steps.map((s) => s.id), 'vmLab.steps')

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
    if (q.kind === 'typed' && q.nearMisses !== undefined) {
      // Near-miss trùng đáp án đúng không bao giờ bắn (gradeQuestion chấm
      // accept chính trước) — lỗi nội dung tự ẩn mình, đúng loại cross-check
      // sinh ra để bắt. So bản normalize thô (lowercase + trim) là đủ.
      const main = new Set(q.accept.map((a) => a.trim().toLowerCase()))
      for (const nm of q.nearMisses) {
        for (const a of nm.accept) {
          if (main.has(a.trim().toLowerCase())) {
            issue([where], `Câu "${q.id}": near-miss "${a}" trùng đáp án đúng — sẽ không bao giờ bắn`)
          }
        }
      }
    }
    if (q.kind === 'clinic') {
      // Câu phòng khám chấm HAI phần — cả hai phần đều phải trỏ được vào
      // lựa chọn có thật, và phần SỬA của dữ liệu kỹ thuật (spec.fix)
      // phải khớp với phần SỬA của dữ liệu hiển thị (actions).
      if (q.diagnosis.answerIndex >= q.diagnosis.choices.length) {
        issue([where], `Câu "${q.id}": diagnosis.answerIndex ${q.diagnosis.answerIndex} vượt quá số lựa chọn (${q.diagnosis.choices.length})`)
      }
      if (q.spec.fix.kind === 'choose-action' && q.actions === undefined) {
        issue([where], `Câu "${q.id}": ca chọn-hành-động phải khai "actions" — không có thì người học hết đường sửa`)
      }
      if (q.spec.fix.kind === 'edit-network' && q.actions !== undefined) {
        issue([where], `Câu "${q.id}": ca sửa-sơ-đồ không dùng "actions" — hai đường sửa cùng lúc làm người học lạc`)
      }
      if (q.actions !== undefined && q.actions.answerIndex >= q.actions.choices.length) {
        issue([where], `Câu "${q.id}": actions.answerIndex ${q.actions.answerIndex} vượt quá số lựa chọn (${q.actions.choices.length})`)
      }
    }
    if (standalone && q.explain === undefined) {
      issue(
        [where],
        `Câu "${q.id}" đứng độc lập (pretest/mastery test) phải có "explain" — người học luôn được thấy vì sao đáp án là vậy`,
      )
    }
  }

  palaceCrossChecks(mod, issue)

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

export type Question = z.infer<typeof QuestionSchema>
export type TypedQuestion = Extract<Question, { kind: 'typed' }>
export type McqQuestion = Extract<Question, { kind: 'mcq' }>
export type OrderQuestion = Extract<Question, { kind: 'order' }>
export type LabQuestion = Extract<Question, { kind: 'lab' }>
export type PalaceWalkQuestion = Extract<Question, { kind: 'palace-walk' }>
export type ClinicQuestion = Extract<Question, { kind: 'clinic' }>
export type PsQuestion = Extract<Question, { kind: 'ps' }>
export type CliQuestion = Extract<Question, { kind: 'cli' }>
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
  // Phòng cung điện cũng phải duy nhất toàn cục: thẻ ôn của nó nằm CÙNG
  // một hộp với thẻ khái niệm (khóa `palace:<roomId>`), và tầng nội dung
  // tra ngược phòng theo id để dựng mặt thẻ.
  const palaceIds = new Map<string, string>()
  const roomIds = new Map<string, string>()
  const vmStepIds = new Map<string, string>()
  for (const mod of modules) {
    if (moduleIds.has(mod.id)) problems.push(`Trùng module id "${mod.id}"`)
    moduleIds.add(mod.id)
    const orderOwner = orders.get(mod.order)
    if (orderOwner === undefined) orders.set(mod.order, mod.id)
    else problems.push(`Trùng order ${mod.order} giữa module "${orderOwner}" và "${mod.id}"`)
    for (const c of mod.concepts) claim(conceptIds, c.id, mod.id, 'Concept')
    for (const l of mod.lessons) claim(lessonIds, l.id, mod.id, 'Lesson')
    for (const { q } of collectQuestions(mod)) claim(questionIds, q.id, mod.id, 'Question')
    if (mod.palace !== undefined) {
      claim(palaceIds, mod.palace.id, mod.id, 'Cung điện')
      for (const room of mod.palace.rooms) claim(roomIds, room.id, mod.id, 'Phòng cung điện')
    }
    // Bước checklist VMware duy nhất toàn cục: store lưu tick theo stepId.
    for (const step of mod.vmLab?.steps ?? []) claim(vmStepIds, step.id, mod.id, 'Bước lab VMware')
  }
  if (problems.length > 0) {
    throw new Error(`Nội dung liên-module không hợp lệ:\n${problems.map((p) => `- ${p}`).join('\n')}`)
  }
}
