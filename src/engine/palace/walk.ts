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
import { lenientEquals, normalizeAnswer, typedAnswerMatches } from '../grading/normalize'
import { nameAnswers, roomById, tourRoute, type Palace, type PalaceRoom } from './palace'

// ---------------------------------------------------------------
// Đoạn đường của một chuyến đi
// ---------------------------------------------------------------

/**
 * Một chuyến đi có thể chỉ qua MỘT ĐOẠN của tòa nhà (thường là một
 * tầng). Vì sao cần: nguyên tắc 3 cấm nhồi 15 phòng mới vào một màn
 * hình, nên nội dung chia cung điện ra học dần — bài này tầng 1, bài
 * sau tầng 2. Nhưng đoạn nào cũng phải đi theo ĐÚNG thứ tự của lộ
 * trình gốc: người học không bao giờ thấy hai trật tự khác nhau của
 * cùng một tòa nhà.
 *
 * `roomIds` bỏ trống = đi cả tòa nhà.
 */
function resolveRoute(palace: Palace, roomIds?: readonly string[]): string[] {
  const full = tourRoute(palace).map((r) => r.id)
  if (roomIds === undefined) return full
  if (roomIds.length === 0) throw new Error('Chuyến đi phải có ít nhất một phòng')
  const wanted = new Set(roomIds)
  if (wanted.size !== roomIds.length) throw new Error('Danh sách phòng của chuyến đi bị trùng')
  for (const id of roomIds) {
    if (roomById(palace, id) === null) {
      throw new Error(`Phòng "${id}" không thuộc cung điện "${palace.id}"`)
    }
  }
  return full.filter((id) => wanted.has(id))
}

function roomAtRoute(palace: Palace, route: readonly string[], index: number): PalaceRoom | null {
  const id = route[index]
  return id === undefined ? null : roomById(palace, id)
}

// ---------------------------------------------------------------
// Chuyến 1 — đi xem (encoding)
// ---------------------------------------------------------------

export interface TourRuntime {
  palaceId: string
  /** Các phòng của chuyến đi, theo đúng thứ tự lộ trình gốc. */
  route: string[]
  /** Phòng đang đứng, 0-based trong route. */
  index: number
  /** Đã đi hết đoạn đường của chuyến này. */
  completed: boolean
}

export function startTour(palace: Palace, roomIds?: readonly string[]): TourRuntime {
  return { palaceId: palace.id, route: resolveRoute(palace, roomIds), index: 0, completed: false }
}

export function currentTourRoom(rt: TourRuntime, palace: Palace): PalaceRoom | null {
  assertSamePalace(rt.palaceId, palace)
  return roomAtRoute(palace, rt.route, rt.index)
}

/**
 * Sang phòng kế tiếp. Đi TUẦN TỰ, không nhảy cóc: cung điện chỉ hoạt
 * động khi các chỗ được nối thành một đường liền.
 */
export function seeNextRoom(rt: TourRuntime, palace: Palace): TourRuntime {
  assertSamePalace(rt.palaceId, palace)
  if (rt.completed) return rt
  const nextIndex = rt.index + 1
  if (nextIndex >= rt.route.length) return { ...rt, index: rt.route.length - 1, completed: true }
  return { ...rt, index: nextIndex }
}

// ---------------------------------------------------------------
// Chuyến 2 — đi lại từ trí nhớ (retrieval)
// ---------------------------------------------------------------

/** Câu trả lời tại một phòng: vế chính (keys) và vế phụ (name). */
export interface RoomAnswer {
  keys: string[]
  name: string
}

export interface RoomGrade {
  keysCorrect: boolean
  nameCorrect: boolean
  /** Đúng = nhớ được CẢ hai vế. */
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
  /** Các phòng của chuyến đi, theo đúng thứ tự lộ trình gốc. */
  route: string[]
  index: number
  /** Số lần sai tại phòng ĐANG đứng — nguồn của thang 3 tầng. */
  failCount: number
  /** Kết quả các phòng đã đi qua, đúng thứ tự lộ trình. */
  outcomes: RoomOutcome[]
  completed: boolean
}

export function startWalk(palace: Palace, roomIds?: readonly string[]): WalkRuntime {
  return {
    palaceId: palace.id,
    route: resolveRoute(palace, roomIds),
    index: 0,
    failCount: 0,
    outcomes: [],
    completed: false,
  }
}

export function currentWalkRoom(rt: WalkRuntime, palace: Palace): PalaceRoom | null {
  assertSamePalace(rt.palaceId, palace)
  if (rt.completed) return null
  return roomAtRoute(palace, rt.route, rt.index)
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
 * Vế chính chấm theo TẬP HỢP: phòng DHCP mang cặp 67/68, người học gõ
 * thứ tự nào cũng được, nhưng thiếu một phần tử là chưa nhớ đủ. So khớp
 * từng phần tử bằng lenientEquals — key chữ ("Domain") nhân nhượng dấu
 * y như câu gõ tay.
 */
export function gradeRoomAnswer(room: PalaceRoom, answer: RoomAnswer): RoomGrade {
  const expected = room.keys.map(normalizeAnswer)
  const given = answer.keys.map(normalizeAnswer)
  const keysCorrect =
    expected.length === given.length &&
    expected.every((k) => given.some((g) => lenientEquals(g, k))) &&
    given.every((g) => expected.some((k) => lenientEquals(g, k)))
  const nameCorrect = typedAnswerMatches(answer.name, nameAnswers(room))
  return { keysCorrect, nameCorrect, correct: keysCorrect && nameCorrect }
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
  const completed = nextIndex >= rt.route.length
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
  /** Tổng số phòng của chuyến đi. */
  total: number
  /** % nhớ được trên TỔNG số phòng (bỏ dở giữa chừng thì % thấp). */
  pct: number
}

export function walkScore(rt: WalkRuntime): WalkScore {
  const total = rt.route.length
  const recalled = roomsRecalledFirstTry(rt).length
  return {
    recalled,
    visited: rt.outcomes.length,
    total,
    pct: total === 0 ? 0 : Math.round((recalled / total) * 100),
  }
}

/**
 * Chuyến đi này có được tính là ĐẠT khi nộp làm một câu hỏi trong bài
 * học không.
 *
 * Luật: đi trọn đoạn VÀ không phòng nào phải mở đáp án. Nghĩa là quên
 * một hai nhịp rồi tự nhớ ra vẫn đạt (đó là retrieval thành công, còn
 * quý hơn nhớ ngay); nhưng đã phải để app nói ra câu trả lời thì lượt
 * này chưa thuộc — đi lại chuyến khác. Không đặt thêm ngưỡng phần trăm
 * nào mới: "đã phải xem lời giải" vốn đã là mốc tầng 3 của cả app.
 */
export function walkPassed(rt: WalkRuntime): boolean {
  return walkOutcomesPassed(rt.outcomes, rt.route)
}

/**
 * Cùng luật, nhưng chấm từ KẾT QUẢ THÔ đã nộp lên thay vì từ runtime —
 * đây là đường mà `gradeQuestion` đi. Phải tự kiểm rằng người học đã đi
 * đúng những phòng đề bài đòi: một chuyến đi hai phòng không được tính
 * là đạt cho đề bài năm phòng.
 */
export function walkOutcomesPassed(outcomes: readonly RoomOutcome[], route: readonly string[]): boolean {
  if (route.length === 0 || outcomes.length !== route.length) return false
  if (!route.every((roomId, i) => outcomes[i]?.roomId === roomId)) return false
  return outcomes.every((o) => !o.usedSolution)
}

function assertSamePalace(runtimePalaceId: string, palace: Palace): void {
  if (runtimePalaceId !== palace.id) {
    throw new Error(`Cung điện không khớp: runtime của "${runtimePalaceId}", nhận "${palace.id}"`)
  }
}
