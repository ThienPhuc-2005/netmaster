// Store tiến độ học — nơi DUY NHẤT nối engine với UI và localStorage.
//
// Phân vai: engine tính (thuần, nhận thời gian từ ngoài) — store cung
// cấp thời gian thật + giữ state + persist. Toàn bộ state là JSON thuần
// nên sau này chuyển backend chỉ thay tầng persist, không viết lại logic
// (yêu cầu CLAUDE.md).
//
// Các luật sư phạm được thi hành tại đây:
// - XP/streak CHỈ cộng ở: hoàn thành bước Thử tay, bước Nhớ lại, phiên
//   ôn thẻ, phiên drill (nguyên tắc 5). Không có action nào cộng XP cho
//   việc đọc/xem — và bài đã hoàn thành thì học lại không cộng nữa.
// - Flashcard sinh TỰ ĐỘNG cho mọi concept khi bài hoàn thành (spec 2.2),
//   mỗi concept đúng một thẻ.
// - Lịch sử 10 câu gần nhất chỉ GHI (đã chốt: flow engine để Phase 2);
//   pretest không ghi vào đây vì người học được "mồi" để đoán sai.

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { AnswerRecord, DrillResult, ISODate, ReviewCard, StreakState } from '../engine/types'
import { palaceRoomsInLesson, type Lesson, type Module } from '../engine/contentSchema'
import { palaceCardId } from '../engine/palace'
import { isoFromDate } from '../engine/dates'
import {
  advance,
  answerPretest,
  canAdvance,
  conceptsLearned,
  confirmSelfExplainRead,
  currentStepType,
  seeNextTeachScreen,
  startLesson,
  submitExercise,
  submitSelfExplain,
  type FeedbackTier,
  type LessonRuntime,
} from '../engine/lessonMachine'
import { findNearMiss, gradeQuestion, type QuestionResponse } from '../engine/grading/gradeQuestion'
import { matchKeywords, type KeywordMatchResult } from '../engine/grading/keywordMatch'
import { createCard, reviewCard } from '../engine/sm2'
import { computeModuleStatuses, evaluateModuleTest, type ModuleTestEvaluation } from '../engine/masteryGate'
import { loadModules } from '../content'
import { canStartNewLesson, dueCards, overdueCount } from '../engine/reviewQueue'
import { initialStreak, recordQualifyingActivity } from '../engine/streak'
import { pushAnswer } from '../engine/answerHistory'
import { xpFor } from '../engine/xp'
import { sessionStats } from '../engine/subnet/drill'

/** "Hôm nay" theo đồng hồ máy người học — engine không tự đọc, store cấp. */
export function todayIso(): ISODate {
  return isoFromDate(new Date())
}

/** Khóa lưu bài tự giải thích trong lessonAnswers (không trùng question id nào). */
export const SELF_EXPLAIN_ANSWER_KEY = '@self-explain'

export interface ProgressState {
  reviewCards: ReviewCard[]
  /** lessonId -> runtime đang học dở (persist để học tiếp giữa chừng). */
  lessonRuntimes: Record<string, LessonRuntime>
  /**
   * lessonId -> questionId -> câu trả lời GẦN NHẤT của người học (câu đã
   * solved thì đây chính là câu trả lời đúng cuối cùng). Chỉ phục vụ
   * XEM LẠI chỉ-đọc — mọi chấm điểm đã chốt trong runtime, không sửa được.
   */
  lessonAnswers: Record<string, Record<string, QuestionResponse>>
  /** lessonId -> ngày hoàn thành lần đầu. */
  completedLessons: Record<string, ISODate>
  /** moduleId -> XP đã tích trong module (nguồn của thanh tiến độ 15%). */
  moduleXp: Record<string, number>
  /** Module đã qua mastery test >= 85% (nguyên tắc 2 — mở module sau). */
  passedModules: string[]
  /** moduleId -> điểm % cao nhất từng đạt ở bài thi module. */
  masteryScores: Record<string, number>
  xpTotal: number
  streak: StreakState
  answerHistory: AnswerRecord[]
  /**
   * TỔNG số câu đã trả lời (đơn điệu tăng — answerHistory chỉ giữ 10 câu
   * cuối nên không đếm được). Cùng supportShownAtTotal làm thời gian
   * nguội của flow engine: sau một phiên củng cố phải có thêm ít nhất
   * SUPPORT_COOLDOWN_ANSWERS câu mới rồi mới được chèn phiên nữa.
   */
  answerTotal: number
  /** Giá trị answerTotal tại lần chèn phiên củng cố gần nhất. */
  supportShownAtTotal: number | null
  /**
   * stepId -> ngày tick của checklist lab VMware (spec Module 9). Chỉ
   * theo dõi, KHÔNG XP: việc thật xảy ra ngoài app, không kiểm chứng được.
   */
  vmLabDone: Record<string, ISODate>
  drillHistory: DrillResult[]
  /** Ngày gần nhất hoàn thành phiên ôn — chốt luật "mở app là ôn trước". */
  lastReviewDate: ISODate | null
  /**
   * Đã qua onboarding (bắn gói tin đầu tiên — spec 4.5: aha moment trong
   * 60 giây đầu, TRƯỚC mọi màn giới thiệu). false → app chỉ hiện onboarding.
   */
  onboardingDone: boolean

  beginLesson: (lesson: Lesson) => LessonRuntime
  answerPretestQ: (lesson: Lesson, questionId: string, response: QuestionResponse) => boolean
  nextTeachScreen: (lesson: Lesson) => void
  advanceLesson: (module: Module, lesson: Lesson) => void
  submitExerciseAnswer: (
    lesson: Lesson,
    questionId: string,
    response: QuestionResponse,
  ) => { correct: boolean; tier: FeedbackTier; solved: boolean; nearMiss: string | null }
  submitSelfExplainText: (lesson: Lesson, text: string) => { match: KeywordMatchResult; tier: FeedbackTier }
  confirmSelfExplain: (lesson: Lesson) => void

  gradeReviewCard: (conceptId: string, remembered: boolean) => void
  completeReviewSession: () => void

  recordDrillSession: (outcomes: { correct: boolean; seconds: number }[], xpEligibleCount: number) => void

  completeOnboarding: () => void

  /**
   * Ghi nhận người học vừa đi qua phiên củng cố nền (flow engine, spec
   * 2.3) — mở lại đường vào bài mới và khởi động thời gian nguội.
   */
  markSupportShown: () => void

  /** Tick/bỏ tick một bước của checklist lab VMware. */
  toggleVmLabStep: (stepId: string) => void

  /**
   * Ghi nhận một lượt thi mastery test. Trả kèm newlyPassed để UI biết
   * lúc nào đáng nổi fanfare "mở module mới".
   */
  recordMasteryAttempt: (
    module: Module,
    results: boolean[],
  ) => ModuleTestEvaluation & { newlyPassed: boolean }
}

/** Streak chỉ được chạm tới từ các nhánh hoàn-thành-retrieval/lab dưới đây. */
type QualifyingSource = Parameters<typeof recordQualifyingActivity>[2]

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => {
      const touchStreak = (source: QualifyingSource) =>
        set((s) => ({ streak: recordQualifyingActivity(s.streak, todayIso(), source).state }))

      const recordAnswer = (correct: boolean) =>
        set((s) => ({
          answerHistory: pushAnswer(s.answerHistory, correct, Date.now()),
          answerTotal: s.answerTotal + 1,
        }))

      const awardXp = (moduleId: string, amount: number) =>
        set((s) => ({
          xpTotal: s.xpTotal + amount,
          moduleXp: { ...s.moduleXp, [moduleId]: (s.moduleXp[moduleId] ?? 0) + amount },
        }))

      const recordLessonAnswer = (lessonId: string, questionId: string, response: QuestionResponse) =>
        set((s) => ({
          lessonAnswers: {
            ...s.lessonAnswers,
            [lessonId]: { ...s.lessonAnswers[lessonId], [questionId]: response },
          },
        }))

      return {
        reviewCards: [],
        lessonRuntimes: {},
        lessonAnswers: {},
        completedLessons: {},
        moduleXp: {},
        passedModules: [],
        masteryScores: {},
        xpTotal: 0,
        streak: initialStreak(todayIso()),
        answerHistory: [],
        answerTotal: 0,
        supportShownAtTotal: null,
        vmLabDone: {},
        drillHistory: [],
        lastReviewDate: null,
        onboardingDone: false,

        beginLesson: (lesson) => {
          const existing = get().lessonRuntimes[lesson.id]
          // Học tiếp bài dở; bài đã completed thì học lại bằng runtime mới
          // (đọc lại thoải mái — nhưng XP không cộng lần hai, xem advanceLesson).
          if (existing && !existing.completed) return existing
          const runtime = startLesson(lesson)
          set((s) => ({
            lessonRuntimes: { ...s.lessonRuntimes, [lesson.id]: runtime },
            // Lượt học mới thì bảng câu trả lời cũng làm lại từ đầu.
            lessonAnswers: { ...s.lessonAnswers, [lesson.id]: {} },
          }))
          return runtime
        },

        answerPretestQ: (lesson, questionId, response) => {
          const question = lesson.steps[1].questions.find((q) => q.id === questionId)
          if (!question) throw new Error(`answerPretestQ: unknown question "${questionId}"`)
          const correct = gradeQuestion(question, response)
          set((s) => {
            const rt = s.lessonRuntimes[lesson.id]
            if (!rt) return s
            return { lessonRuntimes: { ...s.lessonRuntimes, [lesson.id]: answerPretest(rt, lesson, questionId, correct) } }
          })
          recordLessonAnswer(lesson.id, questionId, response)
          // Pretest KHÔNG ghi answerHistory: người học được "mồi" để đoán,
          // kết quả không phản ánh trình độ (spec 2.1 bước 2).
          return correct
        },

        nextTeachScreen: (lesson) =>
          set((s) => {
            const rt = s.lessonRuntimes[lesson.id]
            if (!rt) return s
            // Đi qua engine để hưởng guard đúng-bước — store không tự tính.
            return { lessonRuntimes: { ...s.lessonRuntimes, [lesson.id]: seeNextTeachScreen(rt, lesson) } }
          }),

        submitExerciseAnswer: (lesson, questionId, response) => {
          const rt = get().lessonRuntimes[lesson.id]
          if (!rt) throw new Error(`submitExerciseAnswer: lesson "${lesson.id}" has no runtime`)
          const step = currentStepType(rt, lesson)
          const pool = step === 'practice' ? lesson.steps[3].exercises : lesson.steps[4].questions
          const exercise = pool.find((e) => e.question.id === questionId)
          if (!exercise) throw new Error(`submitExerciseAnswer: unknown question "${questionId}"`)
          const correct = gradeQuestion(exercise.question, response)
          const { runtime, tier, solved } = submitExercise(rt, lesson, questionId, correct)
          set((s) => ({ lessonRuntimes: { ...s.lessonRuntimes, [lesson.id]: runtime } }))
          recordLessonAnswer(lesson.id, questionId, response)
          recordAnswer(correct)
          // Cận-đúng: vẫn sai, nhưng UI được lời phản hồi may đo thay tầng-1 chung.
          const nearMiss = correct ? null : (findNearMiss(exercise.question, response)?.vi ?? null)
          return { correct, tier, solved, nearMiss }
        },

        submitSelfExplainText: (lesson, text) => {
          const rt = get().lessonRuntimes[lesson.id]
          if (!rt) throw new Error(`submitSelfExplainText: lesson "${lesson.id}" has no runtime`)
          const match = matchKeywords(text, lesson.steps[4].selfExplain.keywords)
          const { runtime, tier } = submitSelfExplain(rt, lesson, match.passed)
          set((s) => ({ lessonRuntimes: { ...s.lessonRuntimes, [lesson.id]: runtime } }))
          recordLessonAnswer(lesson.id, SELF_EXPLAIN_ANSWER_KEY, { kind: 'typed', text })
          return { match, tier }
        },

        confirmSelfExplain: (lesson) =>
          set((s) => {
            const rt = s.lessonRuntimes[lesson.id]
            if (!rt) return s
            return { lessonRuntimes: { ...s.lessonRuntimes, [lesson.id]: confirmSelfExplainRead(rt, lesson) } }
          }),

        advanceLesson: (module, lesson) => {
          const state = get()
          const rt = state.lessonRuntimes[lesson.id]
          if (!rt || !canAdvance(rt, lesson)) return
          const leavingStep = currentStepType(rt, lesson)
          const next = advance(rt, lesson)
          const firstCompletion = state.completedLessons[lesson.id] === undefined

          set((s) => ({ lessonRuntimes: { ...s.lessonRuntimes, [lesson.id]: next } }))

          // XP + streak chỉ ở hai bước retrieval/lab, và chỉ lần học đầu
          // (nguyên tắc 5 — không farm bằng cách học lại).
          if (leavingStep === 'practice' && firstCompletion) {
            awardXp(module.id, xpFor('practice'))
            touchStreak('practice')
          }
          if (leavingStep === 'retrieval' && firstCompletion) {
            awardXp(module.id, xpFor('retrieval'))
            touchStreak('retrieval')
          }

          if (next.completed && firstCompletion) {
            const today = todayIso()
            set((s) => {
              // Mỗi concept học xong sinh đúng MỘT thẻ vào Hộp ôn tập
              // (spec 2.2); concept đã có thẻ (dạy lại ở bài khác) giữ
              // nguyên lịch ôn; concept khai noFlashcard (khái niệm meta)
              // không bao giờ vào hộp.
              const existing = new Set(s.reviewCards.map((c) => c.conceptId))
              const skipFlashcard = new Set(module.concepts.filter((c) => c.noFlashcard === true).map((c) => c.id))
              const fresh = conceptsLearned(lesson)
                .filter((cid) => !existing.has(cid) && !skipFlashcard.has(cid))
                .map((cid) => createCard(cid, module.id, today))
              // Phòng cung điện đã đi xem cũng vào Hộp ôn tập, mỗi phòng
              // một thẻ (spec Module 5: "Port cũng vào Spaced Repetition").
              const freshRooms = palaceRoomsInLesson(lesson)
                .map(palaceCardId)
                .filter((cardId) => !existing.has(cardId))
                .map((cardId) => createCard(cardId, module.id, today))
              return {
                reviewCards: [...s.reviewCards, ...fresh, ...freshRooms],
                completedLessons: { ...s.completedLessons, [lesson.id]: today },
              }
            })
          }
        },

        gradeReviewCard: (conceptId, remembered) => {
          set((s) => {
            const idx = s.reviewCards.findIndex((c) => c.conceptId === conceptId)
            if (idx === -1) return s
            const cards = [...s.reviewCards]
            cards[idx] = reviewCard(cards[idx]!, remembered, todayIso())
            return { reviewCards: cards }
          })
          recordAnswer(remembered)
          if (remembered) {
            set((s) => ({ xpTotal: s.xpTotal + xpFor('reviewCardCorrect') }))
          }
        },

        completeReviewSession: () => {
          set({ lastReviewDate: todayIso() })
          // Hoàn thành phiên ôn = hoàn thành retrieval trong ngày.
          touchStreak('reviewCardCorrect')
        },

        recordDrillSession: (outcomes, xpEligibleCount) => {
          const result = sessionStats(outcomes, todayIso())
          set((s) => ({
            drillHistory: [...s.drillHistory, result],
            xpTotal: s.xpTotal + xpFor('drillProblemCorrect') * xpEligibleCount,
          }))
          for (const o of outcomes) recordAnswer(o.correct)
          touchStreak('drillProblemCorrect')
        },

        // Onboarding là trải nghiệm, không phải bài học: KHÔNG cộng XP,
        // KHÔNG chạm streak (nguyên tắc 5 — xem animation không phải retrieval).
        completeOnboarding: () => set({ onboardingDone: true }),

        // Phiên củng cố cũng không cộng XP, không đụng lịch SM-2: ôn sớm
        // ngoài lịch mà ghi vào SM-2 sẽ phá interval, còn cộng XP thì
        // thành đường farm bằng cách cố tình sai cho tụt điểm.
        markSupportShown: () => set((s) => ({ supportShownAtTotal: s.answerTotal })),

        toggleVmLabStep: (stepId) =>
          set((s) => {
            const next = { ...s.vmLabDone }
            if (next[stepId] !== undefined) delete next[stepId]
            else next[stepId] = todayIso()
            return { vmLabDone: next }
          }),

        recordMasteryAttempt: (module, results) => {
          // Chốt chặn cuối của nguyên tắc 2: không tồn tại lượt thi hợp lệ
          // cho module đang khóa (đồng bộ với applyTestResult của engine).
          const ids = loadModules().map((m) => m.id)
          const statuses = computeModuleStatuses(ids, new Set(get().passedModules))
          const status = statuses[module.id]
          if (status === undefined || status === 'locked') {
            throw new Error(`recordMasteryAttempt: module "${module.id}" is locked or unknown`)
          }
          const evaluation = evaluateModuleTest(results)
          for (const r of results) recordAnswer(r)
          const newlyPassed = evaluation.passed && !get().passedModules.includes(module.id)
          set((s) => ({
            masteryScores: {
              ...s.masteryScores,
              // bestScore chỉ đi lên — thi lại điểm thấp không kéo tụt.
              [module.id]: Math.max(s.masteryScores[module.id] ?? 0, evaluation.pct),
            },
            passedModules: newlyPassed ? [...s.passedModules, module.id] : s.passedModules,
          }))
          // KHÔNG cộng XP/streak cho bài thi: thi là cánh cổng, không phải
          // nguồn thưởng — chặn luôn đường farm bằng cách thi lại nhiều lần.
          return { ...evaluation, newlyPassed }
        },
      }
    },
    {
      name: 'netmaster-progress',
      version: 1,
      // Mặc định của zustand trỏ window.localStorage — không tồn tại trong
      // node/test. Trỏ thẳng global localStorage: browser dùng bản thật,
      // test dùng stub in-memory từ tests/setup.ts.
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// ---------------------------------------------------------------
// Selectors thuần cho routing/màn hình (test được không cần React)
// ---------------------------------------------------------------

/**
 * Luật "mỗi ngày mở app, việc ĐẦU TIÊN là ôn thẻ đến hạn" (spec 2.2):
 * còn thẻ đến hạn và hôm nay chưa xong phiên ôn → điều hướng sang Ôn tập.
 */
export function shouldReviewFirst(
  cards: ReviewCard[],
  lastReviewDate: ISODate | null,
  today: ISODate,
): boolean {
  return dueCards(cards, today).length > 0 && lastReviewDate !== today
}

/** Chặn học mới khi nợ > 30 thẻ quá hạn (spec 2.2) — kèm số nợ để UI nói tử tế. */
export function newLessonGate(cards: ReviewCard[], today: ISODate): { allowed: boolean; overdue: number } {
  return { allowed: canStartNewLesson(cards, today), overdue: overdueCount(cards, today) }
}
