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
import type { AnswerRecord, DrillMode, DrillResult, ISODate, ModuleStatus, ReviewCard, StreakState } from '../engine/types'
import { palaceRoomsInLesson } from '../engine/contentPure'
import type { ClinicQuestion, Lesson, Module } from '../engine/contentSchema'
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
import type { Topology } from '../engine/lab'
import type { PsOutcome, PsRunState } from '../engine/ps'
import type { CliOutcome, CliState } from '../engine/cli'
import { matchKeywords, type KeywordMatchResult } from '../engine/grading/keywordMatch'
import { createCard, reviewCard } from '../engine/sm2'
import { computeModuleStatuses, evaluateModuleTest, type ModuleTestEvaluation } from '../engine/masteryGate'
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

/** Trần lịch sử drill — đủ cho mọi thống kê ProfilePage đang hiển thị. */
export const DRILL_HISTORY_CAP = 100

/**
 * Trần số bài dở giữ lại. Mỗi bài dở là một ảnh chụp sơ đồ mạng hoặc một
 * phiên terminal — nhẹ, nhưng không có trần thì nó là trường DUY NHẤT
 * phình vô hạn theo số bài đã mở (bất đối xứng với answerHistory/drill).
 * Vượt trần thì bỏ bài dở CŨ NHẤT: người học quay lại bài bỏ dở 12 lượt
 * trước là chuyện gần như không xảy ra.
 */
export const PRACTICE_DRAFT_CAP = 12

/**
 * Version hiện tại của persist — nguồn chân lý DUY NHẤT, cửa nhập backup
 * đối chiếu với nó để từ chối file đến từ bản app mới hơn (migrate chỉ
 * biết đi tới, không biết đi lùi).
 */
export const PROGRESS_PERSIST_VERSION = 4

/** Một dòng trong nhật ký terminal PowerShell (UI dựng lại y nguyên). */
export interface PsTranscriptEntry {
  id: number
  input: string
  lines: string[]
  outcome: PsOutcome
}

/**
 * Một dòng nhật ký console thiết bị.
 *
 * `prompt` lưu theo từng dòng chứ không dựng lại lúc render: dấu nhắc đổi
 * theo chế độ (`>` → `#` → `(config)#`), mà chính chuỗi dấu nhắc ấy là
 * bằng chứng người học đã đi qua những chế độ nào. Dựng lại bằng chế độ
 * HIỆN TẠI là viết lại lịch sử.
 *
 * Ngoài các outcome của engine còn một dấu MỐC riêng của UI: `moved` —
 * lúc người học rút dây console sang thiết bị khác. Không ghi mốc đó thì
 * đọc lại nhật ký sẽ thấy một loạt lệnh như gõ nhầm máy.
 */
export type CliLogOutcome = CliOutcome | { kind: 'moved'; deviceId: string }

export interface CliTranscriptEntry {
  id: number
  input: string
  lines: string[]
  prompt: string
  outcome: CliLogOutcome
}

/**
 * BÀI DỞ của hai bề mặt thực hành nặng (hội đồng 07-08, ghế UX #20).
 *
 * Vì sao phải lưu: một bài lab lắp 8 thiết bị hoặc một phiên terminal 15
 * lệnh là mười lăm phút thật. Bấm nhầm nút Back, hết pin, đóng nhầm cửa
 * sổ — bản cũ mất sạch và người học phải làm lại từ đầu; đó là kiểu mất
 * mát khiến người ta bỏ hẳn bài chứ không chỉ bực mình.
 *
 * Lưu CÁI GÌ: đúng phần công sức — sơ đồ đang lắp (kèm chỗ đứng của
 * thiết bị trên mặt bàn) và thế giới + nhật ký của phiên terminal.
 * KHÔNG lưu lịch sử undo: nó là dấu chân của một buổi ngồi, không phải
 * thành quả, và giữ nó thì mỗi bài dở nặng gấp mấy chục lần.
 *
 * KHÔNG lưu bài dở của BÀI THI (ModuleTestPage không truyền draftKey):
 * rời bài thi giữa chừng là mất lượt thi, nạp lại một sơ đồ đã lắp dở
 * của đề thi là mở đường mang bài về nhà làm dần.
 *
 * Thêm một NHÁNH vào union này (lab → ps → cli) không phải đổi shape dữ
 * liệu cũ: bài dở lab/ps đã lưu vẫn đọc đúng nguyên vẹn, nên cửa migrate
 * không cần thêm bậc. Bump version chỉ dành cho thay đổi khiến dữ liệu cũ
 * bị ĐỌC SAI.
 */
export type PracticeDraft =
  | { kind: 'lab'; topology: Topology; layout: Record<string, { x: number; y: number }>; savedAt: ISODate }
  | { kind: 'ps'; state: PsRunState; entries: PsTranscriptEntry[]; savedAt: ISODate }
  | { kind: 'cli'; state: CliState; entries: CliTranscriptEntry[]; savedAt: ISODate }

/** Khóa bài dở — một câu hỏi trong một bài học là một mặt bàn riêng. */
export function practiceDraftKey(lessonId: string, questionId: string): string {
  return `${lessonId}::${questionId}`
}

/**
 * Phiên drill VLSM đang làm dở (biên bản trung cấp, ghế Tâm lý): 5 đề
 * thiết kế là bề mặt drill NẶNG nhất — rời giữa chừng ở đề 4/5 mà mất
 * trắng bảng đã điền là kiểu mất mát khiến người ta bỏ hẳn bài. Chỉ giữ
 * MỘT phiên (drill không có hai phiên song song); `seed` đủ để dựng lại
 * đúng bộ đề, phần còn lại là công sức: đề đang đứng, các ô đã điền, số
 * lần sai và kết quả các đề đã qua. Cùng luật với practiceDrafts: lưu
 * KHÔNG XP, xóa khi phiên xong.
 */
export interface VlsmDrillDraft {
  seed: number
  date: ISODate
  index: number
  rows: Record<string, { ip: string; prefix: string }>
  failCount: number
  outcomes: { correct: boolean; seconds: number }[]
}

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
  /**
   * moduleId -> ngày thi vượt GẦN NHẤT (học vượt, 08-08). Chỉ là NHẬT
   * KÝ, không phải then cài cửa: giới hạn "đúng một lượt" đã bỏ (chủ dự
   * án chốt 08-08) — mọi chủ đề lớn phải luôn có cửa vượt. Cổng 85% giữ
   * giá bằng ba lớp khác: mỗi lượt RÚT đề mới từ pool, xáo lựa chọn MCQ,
   * và màn rớt không in đáp án.
   */
  challengeUsed: Record<string, ISODate>
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
  /**
   * caseQuestionId -> ngày CHỮA KHỎI lần đầu ở tab Phòng khám (Phase 3
   * hạng mục 9 — phòng luyện song song). Chỉ lần đầu mỗi ca mới cộng
   * XP/streak; làm lại tự do không cộng (nguyên tắc 5, chặn farm).
   */
  clinicSolved: Record<string, ISODate>
  /**
   * khóa bài dở -> mặt bàn thực hành đang làm giữa chừng (xem
   * `PracticeDraft`). Thứ tự chèn của các khóa CHÍNH LÀ thứ tự cũ→mới
   * dùng để dọn khi vượt trần.
   */
  practiceDrafts: Record<string, PracticeDraft>
  /** Phiên drill VLSM dở — null khi không có (xem VlsmDrillDraft). */
  vlsmDrillDraft: VlsmDrillDraft | null
  drillHistory: DrillResult[]
  /** Ngày gần nhất hoàn thành phiên ôn — chốt luật "mở app là ôn trước". */
  lastReviewDate: ISODate | null
  /**
   * Chuyện streak CHƯA KỂ cho người học (hội đồng 2026-08-07, ghế tâm
   * lý): engine trả freezesUsed/reset để UI kể tử tế nhưng bản cũ vứt
   * đi — đóng băng tiêu trong im lặng, reset 30→1 câm lặng. Giờ sự kiện
   * gần nhất đợi ở đây tới khi UI kể xong và gọi dismissStreakEvent.
   */
  streakEvent: { kind: 'freeze-used'; used: number; left: number } | { kind: 'reset'; lostStreak: number } | null
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

  recordDrillSession: (
    mode: DrillMode,
    outcomes: { correct: boolean; seconds: number }[],
    xpEligibleCount: number,
  ) => void

  completeOnboarding: () => void

  /** UI đã kể xong chuyện streak (banner đóng) — xóa sự kiện chờ. */
  dismissStreakEvent: () => void

  /**
   * Ghi nhận người học vừa đi qua phiên củng cố nền (flow engine, spec
   * 2.3) — mở lại đường vào bài mới và khởi động thời gian nguội.
   */
  markSupportShown: () => void

  /** Tick/bỏ tick một bước của checklist lab VMware. */
  toggleVmLabStep: (stepId: string) => void

  /**
   * Ghi ảnh chụp bài đang làm dở (phòng lab / terminal PS). Gọi mỗi khi
   * mặt bàn đổi — KHÔNG XP, không đụng lịch SM-2, không ghi answerHistory:
   * đây là chuyện lưu công sức, không phải một lượt trả lời.
   */
  savePracticeDraft: (key: string, draft: PracticeDraft) => void

  /** Bỏ bài dở — người học đã nộp đúng, hoặc tự bấm làm lại từ đầu. */
  clearPracticeDraft: (key: string) => void

  /** Ghi ảnh chụp phiên drill VLSM đang dở (cùng luật savePracticeDraft). */
  saveVlsmDrillDraft: (draft: VlsmDrillDraft) => void

  /** Bỏ phiên drill dở — phiên đã xong, hoặc bắt đầu phiên mới. */
  clearVlsmDrillDraft: () => void

  /**
   * Nộp một lượt cho ca bệnh ở TAB PHÒNG KHÁM (không phải trong bài
   * học). Chấm y hệt mọi câu hỏi; XP + streak chỉ ở lần chữa khỏi ĐẦU
   * TIÊN của mỗi ca — làm lại tự do là để luyện tay, không phải để farm.
   */
  submitClinicCase: (
    question: ClinicQuestion,
    response: QuestionResponse,
  ) => { correct: boolean; firstSolve: boolean }

  /**
   * Ghi nhận một lượt thi mastery test. Trả kèm newlyPassed để UI biết
   * lúc nào đáng nổi fanfare "mở module mới".
   *
   * `orderedModuleIds` do CALLER cấp (như mọi action khác nhận
   * Module/Lesson làm tham số) — store không tự với sang tầng content:
   * tầng đó xây trên import.meta.glob của Vite, kéo nó vào đây là lời
   * hứa "chuyển backend chỉ thay tầng persist" thủng một lỗ.
   */
  recordMasteryAttempt: (
    module: Module,
    results: boolean[],
    orderedModuleIds: readonly string[],
  ) => ModuleTestEvaluation & { newlyPassed: boolean }

  /**
   * Ghi nhận lượt THI VƯỢT — người học đã biết sẵn phần này ở nơi khác
   * và muốn chứng minh thay vì ngồi học lại.
   *
   * Đây KHÔNG phải nút skip (nguyên tắc 2 vẫn nguyên): cùng đề thi ấy,
   * cùng ngưỡng 85% ấy, cùng chuỗi mở khóa ấy — chỉ bỏ điều kiện "phải
   * học hết bài trong module trước đã". Vượt được đúng module ĐANG MỞ,
   * đậu thì module sau mở ra rồi mới vượt tiếp được: không có đường
   * nhảy cóc giữa chuỗi.
   *
   * Ba khác biệt so với thi mastery thường:
   * - tiêu lượt thi vượt duy nhất của module NGAY khi nộp (đậu/rớt như nhau);
   * - đậu thì sinh đủ thẻ SM-2 cho mọi khái niệm + phòng cung điện của
   *   module, hạn ngày mai — biết hôm nay không có nghĩa là nhớ sau ba
   *   tuần, không sinh thẻ là vượt xong thủng luôn cơ chế ôn;
   * - vẫn KHÔNG XP/streak, y hệt thi mastery (nguyên tắc 5).
   */
  recordChallengeAttempt: (
    module: Module,
    results: boolean[],
    orderedModuleIds: readonly string[],
  ) => ModuleTestEvaluation & { newlyPassed: boolean; cardsCreated: number }
}

/** Streak chỉ được chạm tới từ các nhánh hoàn-thành-retrieval/lab dưới đây. */
type QualifyingSource = Parameters<typeof recordQualifyingActivity>[2]

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => {
      const touchStreak = (source: QualifyingSource) =>
        set((s) => {
          // Nhận TRỌN kết quả từ engine — hai cờ freezesUsed/reset chính
          // là "lời kể" engine đã soạn sẵn, vứt chúng đi là đóng băng tiêu
          // trong im lặng (lỗi hội đồng bắt được, không tái phạm).
          const outcome = recordQualifyingActivity(s.streak, todayIso(), source)
          const streakEvent =
            outcome.freezesUsed > 0
              ? ({ kind: 'freeze-used', used: outcome.freezesUsed, left: outcome.state.freezesLeft } as const)
              : outcome.reset
                ? ({ kind: 'reset', lostStreak: s.streak.current } as const)
                : s.streakEvent
          return { streak: outcome.state, streakEvent }
        })

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
        challengeUsed: {},
        xpTotal: 0,
        streak: initialStreak(todayIso()),
        answerHistory: [],
        answerTotal: 0,
        supportShownAtTotal: null,
        vmLabDone: {},
        clinicSolved: {},
        practiceDrafts: {},
        vlsmDrillDraft: null,
        drillHistory: [],
        lastReviewDate: null,
        streakEvent: null,
        onboardingDone: false,

        beginLesson: (lesson) => {
          const existing = get().lessonRuntimes[lesson.id]
          // Học tiếp bài dở; bài đã completed thì học lại bằng runtime mới
          // (đọc lại thoải mái — nhưng XP không cộng lần hai, xem advanceLesson).
          //
          // LƯỚI ĐỠ nội-dung-đã-đổi (hội đồng 2026-08-07): runtime persist
          // trỏ vào câu hỏi theo id — bản cập nhật nội dung đổi/thêm id là
          // runtime cũ hoặc CRASH giữa click handler (id lạ) hoặc KẸT bài
          // vĩnh viễn (canAdvance thiếu entry). So tập khóa + số màn dạy:
          // lệch thì coi như học lại bài từ đầu — mất tiến độ MỘT bài dở
          // là cái giá chấp nhận được, kẹt trắng màn thì không.
          if (existing && !existing.completed) {
            const wantedIds = [
              ...lesson.steps[3].exercises.map((e) => e.question.id),
              ...lesson.steps[4].questions.map((e) => e.question.id),
            ]
            const haveIds = Object.keys(existing.exercises)
            const sameShape =
              wantedIds.length === haveIds.length &&
              wantedIds.every((id) => id in existing.exercises) &&
              existing.teachScreenIndex < lesson.steps[2].screens.length
            if (sameShape) return existing
          }
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

        recordDrillSession: (mode, outcomes, xpEligibleCount) => {
          const result = sessionStats(outcomes, todayIso(), mode)
          set((s) => ({
            // Trần 100 phiên gần nhất — trường DUY NHẤT từng phình vô hạn
            // (answerHistory đã có trần từ đầu): người luyện mỗi ngày một
            // năm là ~365 record serialize nguyên cục mỗi lần persist.
            drillHistory: [...s.drillHistory, result].slice(-DRILL_HISTORY_CAP),
            xpTotal: s.xpTotal + xpFor('drillProblemCorrect') * xpEligibleCount,
          }))
          for (const o of outcomes) recordAnswer(o.correct)
          touchStreak('drillProblemCorrect')
        },

        // Onboarding là trải nghiệm, không phải bài học: KHÔNG cộng XP,
        // KHÔNG chạm streak (nguyên tắc 5 — xem animation không phải retrieval).
        completeOnboarding: () => set({ onboardingDone: true }),

        dismissStreakEvent: () => set({ streakEvent: null }),

        // Phiên củng cố cũng không cộng XP, không đụng lịch SM-2: ôn sớm
        // ngoài lịch mà ghi vào SM-2 sẽ phá interval, còn cộng XP thì
        // thành đường farm bằng cách cố tình sai cho tụt điểm.
        markSupportShown: () => set((s) => ({ supportShownAtTotal: s.answerTotal })),

        submitClinicCase: (question, response) => {
          const correct = gradeQuestion(question, response)
          // Mỗi lượt nộp là một lần retrieval thật — vào cửa sổ 10 câu của
          // flow engine như mọi nguồn khác (spec 2.3: "trộn mọi nguồn").
          recordAnswer(correct)
          const firstSolve = correct && get().clinicSolved[question.id] === undefined
          if (firstSolve) {
            set((s) => ({
              clinicSolved: { ...s.clinicSolved, [question.id]: todayIso() },
              // Chỉ xpTotal, KHÔNG moduleXp: thanh tiến độ module đo phần
              // bài học (practice + retrieval); XP phòng khám là dòng chảy
              // luyện tập hằng ngày như thẻ ôn/drill.
              xpTotal: s.xpTotal + xpFor('clinicCaseSolved'),
            }))
            touchStreak('clinicCaseSolved')
          }
          return { correct, firstSolve }
        },

        toggleVmLabStep: (stepId) =>
          set((s) => {
            const next = { ...s.vmLabDone }
            if (next[stepId] !== undefined) delete next[stepId]
            else next[stepId] = todayIso()
            return { vmLabDone: next }
          }),

        savePracticeDraft: (key, draft) =>
          set((s) => {
            // LRU theo LẦN CHẠM cuối: ghi đè là xóa rồi chèn lại về cuối
            // hàng. Giữ-nguyên-chỗ-đứng (bản cũ) có cái bẫy ngược đời:
            // bài mở từ tuần trước vừa được quay lại đầu tư thêm 20 phút
            // vẫn là bài bị dọn ĐẦU TIÊN khi vượt trần — thứ tự dọn phải
            // phản ánh công sức gần nhất (biên bản trung cấp, ghế dữ liệu).
            const next: Record<string, PracticeDraft> = { ...s.practiceDrafts }
            delete next[key]
            next[key] = draft
            const keys = Object.keys(next)
            for (const old of keys.slice(0, Math.max(0, keys.length - PRACTICE_DRAFT_CAP))) {
              delete next[old]
            }
            return { practiceDrafts: next }
          }),

        clearPracticeDraft: (key) =>
          set((s) => {
            if (s.practiceDrafts[key] === undefined) return {}
            const next = { ...s.practiceDrafts }
            delete next[key]
            return { practiceDrafts: next }
          }),

        saveVlsmDrillDraft: (draft) => set(() => ({ vlsmDrillDraft: draft })),

        clearVlsmDrillDraft: () =>
          set((s) => (s.vlsmDrillDraft === null ? {} : { vlsmDrillDraft: null })),

        recordMasteryAttempt: (module, results, orderedModuleIds) => {
          // Chốt chặn cuối của nguyên tắc 2: không tồn tại lượt thi hợp lệ
          // cho module đang khóa (đồng bộ với applyTestResult của engine).
          const statuses = computeModuleStatuses([...orderedModuleIds], new Set(get().passedModules))
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

        recordChallengeAttempt: (module, results, orderedModuleIds) => {
          // Module ĐANG KHÓA vẫn thi vượt được (chủ dự án chốt 08-08):
          // đây chính là đường dành cho người đã học mấy module đầu ở nơi
          // khác. Vẫn phải là module CÓ THẬT trong lộ trình.
          if (!orderedModuleIds.includes(module.id)) {
            throw new Error(`recordChallengeAttempt: module "${module.id}" is locked or unknown`)
          }

          const today = todayIso()
          const evaluation = evaluateModuleTest(results)
          for (const r of results) recordAnswer(r)
          const newlyPassed = evaluation.passed && !get().passedModules.includes(module.id)

          let cardsCreated = 0
          set((s) => {
            // Sổ vượt giờ chỉ GHI LẠI lần vượt gần nhất — nó không còn
            // khóa cửa nữa (vượt lại bao nhiêu lần cũng được).
            const challengeUsed = { ...s.challengeUsed, [module.id]: today }
            const base = {
              challengeUsed,
              masteryScores: {
                ...s.masteryScores,
                [module.id]: Math.max(s.masteryScores[module.id] ?? 0, evaluation.pct),
              },
              passedModules: newlyPassed ? [...s.passedModules, module.id] : s.passedModules,
            }
            if (!newlyPassed) return base

            // Vượt xong vẫn phải ÔN: mọi khái niệm của module (trừ khái
            // niệm meta khai noFlashcard) và mọi phòng cung điện được dạy
            // trong module đều vào Hộp ôn tập, hạn ngày mai — đúng lịch
            // của người học bình thường vừa xong bài (spec 2.2).
            const existing = new Set(s.reviewCards.map((c) => c.conceptId))
            const fresh = module.concepts
              .filter((c) => c.noFlashcard !== true && !existing.has(c.id))
              .map((c) => createCard(c.id, module.id, today))
            const roomIds = new Set(module.lessons.flatMap((l) => palaceRoomsInLesson(l).map(palaceCardId)))
            const freshRooms = [...roomIds]
              .filter((cardId) => !existing.has(cardId))
              .map((cardId) => createCard(cardId, module.id, today))
            cardsCreated = fresh.length + freshRooms.length
            return { ...base, reviewCards: [...s.reviewCards, ...fresh, ...freshRooms] }
          })

          // KHÔNG XP, KHÔNG streak — y hệt thi mastery thường (nguyên tắc 5).
          return { ...evaluation, newlyPassed, cardsCreated }
        },
      }
    },
    {
      name: 'netmaster-progress',
      version: PROGRESS_PERSIST_VERSION,
      // Mặc định của zustand trỏ window.localStorage — không tồn tại trong
      // node/test. Trỏ thẳng global localStorage: browser dùng bản thật,
      // test dùng stub in-memory từ tests/setup.ts.
      storage: createJSONStorage(() => localStorage),
      /**
       * CỬA MIGRATE — toàn bộ công sức người học (XP, streak, thẻ SM-2,
       * module đã đậu) nằm sau cánh cửa này. Zustand persist khi version
       * lưu ≠ version code mà KHÔNG có migrate sẽ VỨT TRẮNG state cũ —
       * với app học tập, mất lịch SM-2 là mất chính sản phẩm.
       *
       * Luật từ nay (hội đồng 2026-08-07, hai ghế độc lập cùng chỉ):
       * mọi thay đổi SHAPE của state persist BẮT BUỘC (1) bump version,
       * (2) thêm một case migrate từ version cũ, (3) cập nhật fixture
       * tests/fixtures/progressV1.json nếu shape v1 vẫn phải đọc được.
       * Test rehydrate ở progress.migrate.test.ts là chuông báo: đổi
       * shape mà quên cửa này là test đỏ.
       */
      migrate: (persisted, version) => {
        // Biến đổi DẦN v(n) → v(n+1) → … → mới nhất: mỗi bậc một câu lệnh,
        // không nhánh nào nhảy cóc. Thêm version mới thì nối thêm một bậc
        // ở cuối chuỗi này.
        let state = persisted as ProgressState
        // v1 → v2 (học vượt, 08-08): thêm sổ lượt thi vượt. Người học cũ
        // chưa dùng lượt nào nên sổ rỗng.
        if (version <= 1) {
          state = { ...state, challengeUsed: {} }
        }
        // v2 → v3 (persist bài dở lab/PS, 08-08): thêm ngăn bài dở, rỗng —
        // người học cũ không có bài dở nào để phục hồi, và đó là trạng
        // thái đúng chứ không phải mất mát.
        if (version <= 2) {
          state = { ...state, practiceDrafts: {} }
        }
        // v3 → v4 (drill VLSM, 08-09): phiên drill giờ có `mode`. Mọi
        // phiên đã ghi trước đây đều là drill subnetting của Module 3 —
        // đóng dấu đúng như thế, đừng để chúng thành phiên "không loại"
        // rồi rơi khỏi biểu đồ tiến bộ mà người học đã xây cả tháng.
        if (version <= 3) {
          state = {
            ...state,
            drillHistory: (state.drillHistory ?? []).map((d) => ({ ...d, mode: d.mode ?? 'subnet' })),
          }
        }
        if (version <= 4) return state
        // Version lạ (mới hơn code — người dùng lùi bản app): giữ nguyên
        // và để shallow-merge với default đỡ phần thiếu, còn hơn vứt trắng.
        return persisted as ProgressState
      },
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

/**
 * Module này có mời thi vượt được không (học vượt, 08-08).
 *
 * Mời ở MỌI module chưa đậu, kể cả module đang KHÓA (chủ dự án chốt
 * 08-08): người đã học mấy module đầu ở nơi khác cần vào thẳng module
 * mình đang cần, không phải vượt lần lượt từng cái một.
 *
 * Cửa vượt KHÔNG còn giới hạn một lượt (chủ dự án chốt 08-08, lượt sau):
 * mỗi chủ đề lớn luôn có cửa vượt, rớt rồi vẫn vượt lại được. Ba lớp
 * chống-học-thuộc-đề vẫn nguyên nên con số 85% không mất giá: thứ tự câu
 * xáo mỗi lượt, lựa chọn MCQ xáo mỗi lần render, và màn RỚT không in
 * đáp án (chỉ ý cần ôn).
 *
 * Hai điều kiện, thiếu một là không:
 * - module CHƯA đậu (đậu rồi thì không còn gì để vượt);
 * - CHƯA học hết bài trong module — học hết rồi thì đường thi mastery
 *   thường đã nằm ngay trên card, cửa riêng chỉ là nút thứ hai cùng đích;
 * và module phải có ít nhất một bài.
 */
export function canChallengeModule(args: {
  status: ModuleStatus | undefined
  lessonIds: readonly string[]
  completedLessons: Record<string, ISODate>
  moduleId: string
}): boolean {
  if (args.status === undefined || args.status === 'passed') return false
  if (args.lessonIds.length === 0) return false
  return !args.lessonIds.every((id) => args.completedLessons[id] !== undefined)
}
