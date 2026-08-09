// Máy trạng thái pipeline 6 bước của một bài học (spec 2.1):
// Hook → Pretest → Dạy → Làm → Retrieval → Kết.
//
// Bất biến sư phạm file này canh giữ:
// - Nguyên tắc 1: không có bài "đọc xong là qua" — advance() ném lỗi khi
//   bước hiện tại chưa xong, và module này KHÔNG export hàm goto/skip nào.
// - Nguyên tắc 3: bước Dạy đi từng màn một (seeNextTeachScreen).
// - Nguyên tắc 4: thử-sai trước, phản hồi 3 tầng, lời giải chỉ hiện sau
//   3 lần sai; xem lời giải xong vẫn phải TỰ GÕ đáp án đúng thì câu mới
//   tính xong (generation effect).
//
// Máy CHỈ nhận kết quả đúng/sai từ ngoài — việc chấm thuộc grading/.
// Technical contract: pure functions over immutable state — every
// transition returns a new LessonRuntime; inputs are never mutated.
// Errors thrown here signal PROGRAMMING errors (UI must consult
// canAdvance/state first); they are never shown to the learner.

import type { ExerciseAttempt } from './types'
import { conceptIdsInLesson } from './contentPure'
import type { Lesson, Step } from './contentSchema'

// Fixed tuple indices of the 6-step pipeline (enforced by StepsSchema).
const PRETEST = 1
const TEACH = 2
const PRACTICE = 3
const RETRIEVAL = 4
const SUMMARY = 5

// ---------------------------------------------------------------
// Phản hồi 3 tầng (spec 4.4, nguyên tắc 4)
// ---------------------------------------------------------------

export type FeedbackTier = 0 | 1 | 2 | 3

/**
 * Tầng phản hồi theo số lần sai:
 * 0 = chưa sai lần nào (chưa có gì để hiện);
 * 1 = "Gần rồi — nghĩ lại về X" (X = hintTopic của câu hỏi);
 * 2 = gợi ý cụ thể (hint);
 * >= 3 = lời giải + giải thích (solution).
 * Engine chỉ trả MÃ tầng — lời tử tế do tầng i18n/UI soạn, không bao giờ
 * hiện chữ "SAI" trần trụi.
 */
export function feedbackTier(failCount: number): FeedbackTier {
  if (!Number.isInteger(failCount) || failCount < 0) {
    throw new Error(`feedbackTier: failCount must be a non-negative integer, got ${failCount}`)
  }
  switch (failCount) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 2
    default:
      return 3
  }
}

// ---------------------------------------------------------------
// Trạng thái runtime của một bài đang học
// ---------------------------------------------------------------

export interface SelfExplainState {
  /** Số lần nộp CHƯA đạt (grading/matchKeywords chấm từ ngoài). */
  attempts: number
  /** Đã tự giải thích đủ ý bằng lời của mình. */
  passed: boolean
  /** Câu tự luận đã khép (đạt, hoặc đọc câu mẫu sau tầng 3). */
  done: boolean
}

export interface LessonRuntime {
  lessonId: string
  /** 0..5 theo pipeline 6 bước; khởi tạo 0 (hook). */
  stepIndex: number
  /** Màn dạy XA NHẤT đã xem (0-based); khởi tạo 0. */
  teachScreenIndex: number
  /**
   * questionId -> đúng/sai. CHỈ để ghi nhận đã trả lời — pretest sai
   * không trừ điểm (pretesting effect, spec 2.1 bước 2).
   */
  pretestAnswers: Record<string, boolean>
  /** Trạng thái từng bài tập practice + retrieval, key = question.id. */
  exercises: Record<string, ExerciseAttempt>
  selfExplain: SelfExplainState
  completed: boolean
}

/** Runtime must belong to the lesson it is driven with — catches stale
 *  persisted state being replayed against the wrong content. */
function assertLessonMatch(rt: LessonRuntime, lesson: Lesson): void {
  if (rt.lessonId !== lesson.id) {
    throw new Error(`Lesson runtime mismatch: runtime is for "${rt.lessonId}", got lesson "${lesson.id}"`)
  }
}

const freshAttempt = (): ExerciseAttempt => ({ failCount: 0, solved: false, usedSolution: false })

/** Khởi tạo runtime tại bước Hook, đủ entry cho mọi câu practice + retrieval. */
export function startLesson(lesson: Lesson): LessonRuntime {
  const exercises: Record<string, ExerciseAttempt> = {}
  const register = (questionId: string) => {
    // Trùng id giữa practice và retrieval sẽ gộp 2 câu vào 1 entry: giải ở
    // bước Làm là câu retrieval "tự solved" — thủng nguyên tắc 1. ModuleSchema
    // đã chặn khi parse cả module; guard này đỡ ca lesson được nạp lẻ.
    if (questionId in exercises) {
      throw new Error(`startLesson: duplicate question id "${questionId}" across practice/retrieval`)
    }
    exercises[questionId] = freshAttempt()
  }
  for (const ex of lesson.steps[PRACTICE].exercises) register(ex.question.id)
  for (const ex of lesson.steps[RETRIEVAL].questions) register(ex.question.id)
  return {
    lessonId: lesson.id,
    stepIndex: 0,
    teachScreenIndex: 0,
    pretestAnswers: {},
    exercises,
    selfExplain: { attempts: 0, passed: false, done: false },
    completed: false,
  }
}

/** Loại bước hiện tại — UI rẽ nhánh màn hình theo mã này. */
export function currentStepType(rt: LessonRuntime, lesson: Lesson): Step['type'] {
  assertLessonMatch(rt, lesson)
  const step = lesson.steps[rt.stepIndex]
  if (step === undefined) {
    throw new Error(`currentStepType: stepIndex ${rt.stepIndex} out of range 0..5`)
  }
  return step.type
}

// ---------------------------------------------------------------
// Bước 2 — Pretest
// ---------------------------------------------------------------

/**
 * Ghi nhận một câu pretest đã được trả lời. KHÔNG có khái niệm "trượt
 * pretest" — đúng/sai chỉ được lưu lại, không chặn, không trừ điểm
 * (pretesting effect: sai lúc này chính là cách mồi não để học tốt hơn).
 * Trả lời lại cùng câu TRONG bước pretest thì lần sau ghi đè lần trước.
 * Chỉ hợp lệ Ở bước pretest: trả lời trước (từ hook) là "làm trước" điều
 * kiện qua bước; trả lời sau khi đã học là dữ liệu pretest giả — cả hai
 * đều phá pretesting effect nên bị chặn từ engine.
 */
export function answerPretest(
  rt: LessonRuntime,
  lesson: Lesson,
  questionId: string,
  correct: boolean,
): LessonRuntime {
  if (currentStepType(rt, lesson) !== 'pretest') {
    throw new Error('answerPretest: only valid during the pretest step')
  }
  if (!lesson.steps[PRETEST].questions.some((q) => q.id === questionId)) {
    throw new Error(`answerPretest: unknown pretest question "${questionId}"`)
  }
  return { ...rt, pretestAnswers: { ...rt.pretestAnswers, [questionId]: correct } }
}

// ---------------------------------------------------------------
// Bước 3 — Dạy (một màn = một khái niệm, nguyên tắc 3)
// ---------------------------------------------------------------

/**
 * Xem màn dạy kế tiếp; chặn trần ở màn cuối (screens.length - 1).
 * Chỉ hợp lệ Ở bước teach — gọi trước từ bước khác sẽ "xem hộ" hết màn
 * dạy và vô hiệu hóa điều kiện qua bước (nguyên tắc 3: đi từng màn một).
 */
export function seeNextTeachScreen(rt: LessonRuntime, lesson: Lesson): LessonRuntime {
  if (currentStepType(rt, lesson) !== 'teach') {
    throw new Error('seeNextTeachScreen: only valid during the teach step')
  }
  const lastIndex = lesson.steps[TEACH].screens.length - 1
  return { ...rt, teachScreenIndex: Math.min(rt.teachScreenIndex + 1, lastIndex) }
}

// ---------------------------------------------------------------
// Bước 4 + 5 — Làm & Retrieval (thử-sai trước, nguyên tắc 4)
// ---------------------------------------------------------------

/**
 * Nộp một lượt trả lời bài tập. Chỉ hợp lệ khi câu thuộc bước HIỆN TẠI
 * (practice ở step 3, retrieval ở step 4) — nội dung đóng đúng bước,
 * không làm trước cũng không quay lại farm.
 *
 * - Đúng → solved. Kể cả SAU khi đã xem lời giải: người học vẫn phải tự
 *   gõ lại đáp án đúng thì câu mới tính xong (generation effect — không
 *   có nút "đã hiểu" cho bài tập).
 * - Sai → failCount + 1, tier = feedbackTier(failCount mới); chạm 3 lần
 *   sai thì usedSolution = true (UI hiện lời giải, nguyên tắc 4).
 * - Câu đã solved mà nộp tiếp → ném lỗi (chống farm XP, nguyên tắc 5).
 */
export function submitExercise(
  rt: LessonRuntime,
  lesson: Lesson,
  questionId: string,
  correct: boolean,
): { runtime: LessonRuntime; tier: FeedbackTier; solved: boolean } {
  const stepType = currentStepType(rt, lesson)
  let stepQuestionIds: string[]
  if (stepType === 'practice') {
    stepQuestionIds = lesson.steps[PRACTICE].exercises.map((e) => e.question.id)
  } else if (stepType === 'retrieval') {
    stepQuestionIds = lesson.steps[RETRIEVAL].questions.map((e) => e.question.id)
  } else {
    throw new Error(`submitExercise: current step "${stepType}" has no exercises`)
  }
  if (!stepQuestionIds.includes(questionId)) {
    throw new Error(`submitExercise: question "${questionId}" does not belong to the current "${stepType}" step`)
  }
  const attempt = rt.exercises[questionId]
  if (attempt === undefined) {
    // Unreachable when rt came from startLesson(lesson); guards corrupt state.
    throw new Error(`submitExercise: no attempt state for question "${questionId}"`)
  }
  if (attempt.solved) {
    throw new Error(`submitExercise: question "${questionId}" is already solved`)
  }

  if (correct) {
    const next: ExerciseAttempt = { ...attempt, solved: true }
    return {
      runtime: { ...rt, exercises: { ...rt.exercises, [questionId]: next } },
      // Tier tại thời điểm giải được — 0 nếu đúng ngay lần đầu.
      tier: feedbackTier(attempt.failCount),
      solved: true,
    }
  }

  const failCount = attempt.failCount + 1
  const next: ExerciseAttempt = {
    failCount,
    solved: false,
    // Sai lần 3 → đã phải xem lời giải; lưu lại làm dữ liệu cho flow
    // engine Phase 2, không dùng để phạt người học.
    usedSolution: attempt.usedSolution || failCount >= 3,
  }
  return {
    runtime: { ...rt, exercises: { ...rt.exercises, [questionId]: next } },
    tier: feedbackTier(failCount),
    solved: false,
  }
}

/**
 * Nộp câu "giải thích bằng lời của bạn" (kết quả passed do
 * grading/matchKeywords chấm từ ngoài). Đạt → passed = done = true.
 * Chưa đạt → attempts + 1 và trả tier theo thang 3 tầng.
 */
export function submitSelfExplain(
  rt: LessonRuntime,
  lesson: Lesson,
  passed: boolean,
): { runtime: LessonRuntime; tier: FeedbackTier } {
  if (currentStepType(rt, lesson) !== 'retrieval') {
    throw new Error('submitSelfExplain: only valid during the retrieval step')
  }
  if (rt.selfExplain.done) {
    // Đã khép mà nộp tiếp = farm XP → chặn từ engine (nguyên tắc 5).
    throw new Error('submitSelfExplain: self-explain is already done')
  }
  if (passed) {
    return {
      runtime: { ...rt, selfExplain: { ...rt.selfExplain, passed: true, done: true } },
      tier: feedbackTier(rt.selfExplain.attempts),
    }
  }
  const attempts = rt.selfExplain.attempts + 1
  return {
    runtime: { ...rt, selfExplain: { attempts, passed: false, done: false } },
    tier: feedbackTier(attempts),
  }
}

/**
 * Khép câu tự luận bằng cách ĐỌC câu trả lời mẫu — chỉ hợp lệ sau tầng 3
 * (attempts >= 3). Câu tự luận mở không bắt chép lại lời giải (chép mẫu
 * máy móc = phản sư phạm), nhưng trước tầng 3 thì không có đường tắt nào.
 * done = true, passed GIỮ false — dữ liệu này phân biệt "tự giải thích
 * được" với "phải đọc mẫu" cho flow engine sau này.
 */
export function confirmSelfExplainRead(rt: LessonRuntime, lesson: Lesson): LessonRuntime {
  if (currentStepType(rt, lesson) !== 'retrieval') {
    throw new Error('confirmSelfExplainRead: only valid during the retrieval step')
  }
  if (rt.selfExplain.done) {
    throw new Error('confirmSelfExplainRead: self-explain is already done')
  }
  if (rt.selfExplain.attempts < 3) {
    throw new Error(
      `confirmSelfExplainRead: example answer unlocks after 3 failed attempts (got ${rt.selfExplain.attempts})`,
    )
  }
  return { ...rt, selfExplain: { ...rt.selfExplain, done: true } }
}

// ---------------------------------------------------------------
// Tiến bước — cánh cổng duy nhất giữa các bước
// ---------------------------------------------------------------

/**
 * Điều kiện qua bước hiện tại:
 * - hook: luôn qua được (đọc xong bấm tiếp — câu hỏi tò mò không cần chấm);
 * - pretest: đã trả lời ĐỦ mọi câu, đúng sai không quan trọng;
 * - teach: đã xem đến màn cuối;
 * - practice: mọi bài tập của bước đã solved;
 * - retrieval: mọi câu đã solved VÀ selfExplain.done (nguyên tắc 1 —
 *   bài chỉ khép sau khi đã lôi kiến thức ra từ trí nhớ);
 * - summary: luôn qua được (qua = hoàn thành bài).
 * Bài đã completed → false: sự kiện "hoàn thành bài" (nơi store cộng XP)
 * không bao giờ được bắn lần thứ hai.
 */
export function canAdvance(rt: LessonRuntime, lesson: Lesson): boolean {
  if (rt.completed) return false
  const stepType = currentStepType(rt, lesson)
  switch (stepType) {
    case 'hook':
      return true
    case 'pretest':
      return lesson.steps[PRETEST].questions.every((q) => q.id in rt.pretestAnswers)
    case 'teach':
      return rt.teachScreenIndex >= lesson.steps[TEACH].screens.length - 1
    case 'practice':
      return lesson.steps[PRACTICE].exercises.every((e) => rt.exercises[e.question.id]?.solved === true)
    case 'retrieval':
      return (
        lesson.steps[RETRIEVAL].questions.every((e) => rt.exercises[e.question.id]?.solved === true) &&
        rt.selfExplain.done
      )
    case 'summary':
      return true
    default: {
      // Compile-time exhaustiveness guard over Step['type'].
      const exhausted: never = stepType
      throw new Error(`canAdvance: unknown step type ${String(exhausted)}`)
    }
  }
}

/**
 * Qua bước kế tiếp. canAdvance false → ném lỗi: KHÔNG TỒN TẠI đường nhảy
 * bước (nguyên tắc 1 + 2) — UI phải hỏi canAdvance trước khi cho bấm.
 * Từ summary (stepIndex 5) → completed = true, stepIndex giữ 5.
 */
export function advance(rt: LessonRuntime, lesson: Lesson): LessonRuntime {
  if (!canAdvance(rt, lesson)) {
    throw new Error(`advance: step ${rt.stepIndex} of lesson "${rt.lessonId}" is not complete — there is no skip path`)
  }
  if (rt.stepIndex === SUMMARY) {
    return { ...rt, completed: true }
  }
  return { ...rt, stepIndex: rt.stepIndex + 1 }
}

// ---------------------------------------------------------------
// Sau khi hoàn thành
// ---------------------------------------------------------------

/**
 * Danh sách conceptId sinh flashcard KHI bài hoàn thành (spec 2.2 —
 * "học xong" = đã qua retrieval, tức advance khỏi summary đã chạy).
 * Store gọi đúng một lần tại thời điểm completed chuyển true.
 */
export function conceptsLearned(lesson: Lesson): string[] {
  return conceptIdsInLesson(lesson)
}
