// Đi tour cung điện, và đi lại tour từ trí nhớ (spec Module 5).
//
// Hai chuyến đi, hai vai trò sư phạm khác hẳn nhau:
//
//   - TOUR (đi xem): người học đi qua từng phòng, thấy hình gợi nhớ và
//     đọc câu chuyện. Đây là ENCODING — không chấm, không cộng điểm.
//     Nguyên tắc 5 nói thẳng: xem không phải retrieval.
//   - WALK (đi lại từ trí nhớ): cửa phòng đóng, người học tự nói trong
//     phòng có gì. Đây mới là RETRIEVAL — chấm, thang 3 tầng, và là nơi
//     duy nhất của cung điện được cộng XP.
//
// Lộ trình của cả hai lấy từ tourRoute(): luôn cùng một đường. Đi lại
// đúng đường cũ chính là cơ chế của phương pháp, không phải chi tiết
// giao diện — nên nó nằm ở engine.

import { feedbackTier, type FeedbackTier } from '../lessonMachine'
import { typedAnswerMatches } from '../grading/normalize'
import { serviceAnswers, tourRoute, type Palace, type PalaceRoom } from './palace'

// ---------------------------------------------------------------
// Chuyến 1 — đi xem (encoding)
// ---------------------------------------------------------------

export interface TourRuntime {
  palaceId: string
  /** Phòng đang đứng, 0-based theo lộ trình. */
  index: number
  /** Đã đi hết tòa nhà. */
  completed: boolean
}

export function startTour(palace: Palace): TourRuntime {
  return { palaceId: palace.id, index: 0, completed: false }
}

export function currentTourRoom(rt: TourRuntime, palace: Palace): PalaceRoom | null {
  assertSamePalace(rt.palaceId, palace)
  return tourRoute(palace)[rt.index] ?? null
}

/**
 * Sang phòng kế tiếp. Đi TUẦN TỰ, không nhảy cóc: cung điện chỉ hoạt
 * động khi các chỗ được nối thành một đường liền.
 */
export function seeNextRoom(rt: TourRuntime, palace: Palace): TourRuntime {
  assertSamePalace(rt.palaceId, palace)
  if (rt.completed) return rt
  const nextIndex = rt.index + 1
  const total = palace.rooms.length
  if (nextIndex >= total) return { ...rt, index: total - 1, completed: true }
  return { ...rt, index: nextIndex }
}

// ---------------------------------------------------------------
// Chuyến 2 — đi lại từ trí nhớ (retrieval)
// ---------------------------------------------------------------

/** Câu trả lời tại một phòng: cổng mấy, dịch vụ gì. */
export interface RoomAnswer {
  ports: number[]
  service: string
}

export interface RoomGrade {
  portsCorrect: boolean
  serviceCorrect: boolean
  /** Đúng = nhớ được CẢ số cổng lẫn dịch vụ. */
  correct: boolean
}

export interface RoomOutcome {
  roomId: string
  /** Số lần sai tại phòng này trước khi đi tiếp. */
  failCount: number
  /** Đã phải mở đáp án (sai 3 lần — nguyên tắc 4). */
  usedSolution: boolean
}

export interface WalkRuntime {
  palaceId: string
  index: number
  /** Số lần sai tại phòng ĐANG đứng — nguồn của thang 3 tầng. */
  failCount: number
  /** Kết quả các phòng đã đi qua, đúng thứ tự lộ trình. */
  outcomes: RoomOutcome[]
  completed: boolean
}

export function startWalk(palace: Palace): WalkRuntime {
  return { palaceId: palace.id, index: 0, failCount: 0, outcomes: [], completed: false }
}

export function currentWalkRoom(rt: WalkRuntime, palace: Palace): PalaceRoom | null {
  assertSamePalace(rt.palaceId, palace)
  if (rt.completed) return null
  return tourRoute(palace)[rt.index] ?? null
}

/** Tầng phản hồi hiện tại của phòng đang đứng (0 = chưa sai lần nào). */
export function walkTier(rt: WalkRuntime): FeedbackTier {
  return feedbackTier(rt.failCount)
}

/**
 * Chấm một phòng. Hai vế tách riêng để lời phản hồi nói đúng chỗ hổng
 * ("số cổng đúng rồi, còn tên dịch vụ thì chưa") thay vì phủ nhận cả câu
 * trả lời — quy tắc microcopy spec 4.4.
 *
 * Cổng chấm theo TẬP HỢP: phòng DHCP mang cặp 67/68, người học gõ thứ tự
 * nào cũng được, nhưng thiếu một số là chưa nhớ đủ.
 */
export function gradeRoomAnswer(room: PalaceRoom, answer: RoomAnswer): RoomGrade {
  const expected = new Set(room.ports)
  const given = new Set(answer.ports)
  const portsCorrect = expected.size === given.size && [...expected].every((p) => given.has(p))
  const serviceCorrect = typedAnswerMatches(answer.service, serviceAnswers(room))
  return { portsCorrect, serviceCorrect, correct: portsCorrect && serviceCorrect }
}

/**
 * Nộp câu trả lời tại phòng đang đứng.
 *
 * - Đúng → ghi kết quả phòng này, bước sang phòng kế tiếp.
 * - Sai → failCount + 1, tầng phản hồi đi lên; sai lần 3 thì mở đáp án
 *   NHƯNG người học vẫn phải tự gõ lại mới được đi tiếp (đúng như
 *   submitExercise của bài học: xem lời giải không thay được việc tự
 *   nhớ ra — testing effect).
 */
export function submitRoomAnswer(
  rt: WalkRuntime,
  palace: Palace,
  answer: RoomAnswer,
): { runtime: WalkRuntime; grade: RoomGrade; tier: FeedbackTier; advanced: boolean } {
  assertSamePalace(rt.palaceId, palace)
  const room = currentWalkRoom(rt, palace)
  if (room === null) throw new Error('submitRoomAnswer: chuyến đi đã kết thúc')

  const grade = gradeRoomAnswer(room, answer)
  if (!grade.correct) {
    const failCount = rt.failCount + 1
    return {
      runtime: { ...rt, failCount },
      grade,
      tier: feedbackTier(failCount),
      advanced: false,
    }
  }

  const outcome: RoomOutcome = {
    roomId: room.id,
    failCount: rt.failCount,
    usedSolution: rt.failCount >= 3,
  }
  const outcomes = [...rt.outcomes, outcome]
  const nextIndex = rt.index + 1
  const completed = nextIndex >= palace.rooms.length
  return {
    runtime: {
      ...rt,
      index: completed ? rt.index : nextIndex,
      failCount: 0,
      outcomes,
      completed,
    },
    grade,
    // Tầng tại lúc nhớ ra được — 0 nếu đúng ngay lần đầu.
    tier: feedbackTier(rt.failCount),
    advanced: true,
  }
}

/**
 * Những phòng nhớ được NGAY LẦN ĐẦU. Đây là thước đo trung thực của
 * chuyến đi: nhớ ra sau khi đã xem gợi ý thì chưa gọi là nhớ, nên phòng
 * đó không được tính là "đã thuộc" khi lên lịch ôn (xem cards.ts).
 */
export function roomsRecalledFirstTry(rt: WalkRuntime): string[] {
  return rt.outcomes.filter((o) => o.failCount === 0).map((o) => o.roomId)
}

export interface WalkScore {
  /** Số phòng nhớ được ngay lần đầu. */
  recalled: number
  /** Số phòng đã đi qua. */
  visited: number
  /** Tổng số phòng của tòa nhà. */
  total: number
  /** % nhớ được trên TỔNG số phòng (bỏ dở giữa chừng thì % thấp). */
  pct: number
}

export function walkScore(rt: WalkRuntime, palace: Palace): WalkScore {
  assertSamePalace(rt.palaceId, palace)
  const total = palace.rooms.length
  const recalled = roomsRecalledFirstTry(rt).length
  return {
    recalled,
    visited: rt.outcomes.length,
    total,
    pct: total === 0 ? 0 : Math.round((recalled / total) * 100),
  }
}

function assertSamePalace(runtimePalaceId: string, palace: Palace): void {
  if (runtimePalaceId !== palace.id) {
    throw new Error(`Cung điện không khớp: runtime của "${runtimePalaceId}", nhận "${palace.id}"`)
  }
}
