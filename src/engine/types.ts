// Kiểu dữ liệu runtime của pedagogy engine.
//
// Quy ước BẤT BIẾN cho toàn bộ src/engine/:
// - Thuần TypeScript: không import React, không đọc localStorage,
//   không gọi Date.now()/new Date() bên trong engine. Mọi hàm nhận
//   thời gian ("hôm nay") từ ngoài vào — để test được 100% và để sau
//   này chuyển backend không phải sửa engine.
// - Engine trả về dữ liệu ngữ nghĩa (mã, số, cờ), KHÔNG trả chuỗi
//   hiển thị — chuỗi cho người học nằm ở tầng i18n/UI.

/** Ngày địa phương dạng 'YYYY-MM-DD' (theo máy người học). */
export type ISODate = string

// ---------------------------------------------------------------
// Ôn ngắt quãng — SM-2 đơn giản hóa (spec mục 2.2)
// ---------------------------------------------------------------

/** Chỉ số vào bảng INTERVALS_DAYS: 0→1 ngày, 1→3, 2→7, 3→14, 4→30. */
export type IntervalIndex = 0 | 1 | 2 | 3 | 4

export interface ReviewCard {
  conceptId: string
  /**
   * Giữ moduleId ngay trên thẻ để phiên ôn trộn thẻ từ nhiều module
   * (interleaving, spec 2.2) mà không phải tra cứu ngược nội dung.
   */
  moduleId: string
  intervalIndex: IntervalIndex
  /** Ngày đến hạn ôn kế tiếp. Thẻ "đến hạn" khi dueDate <= hôm nay. */
  dueDate: ISODate
  /** Số lần trả lời sai (mỗi lần sai reset interval về 1 ngày). */
  lapses: number
  createdOn: ISODate
  lastReviewedOn: ISODate | null
}

// ---------------------------------------------------------------
// Tiến độ học
// ---------------------------------------------------------------

/**
 * Trạng thái module theo mastery gate (nguyên tắc 2):
 * 'locked' cho tới khi module liền trước 'passed' (≥ 85%).
 * Không tồn tại trạng thái "skip".
 */
export type ModuleStatus = 'locked' | 'open' | 'passed'

export interface ModuleProgress {
  moduleId: string
  status: ModuleStatus
  /** Điểm % cao nhất từng đạt ở bài kiểm tra module. */
  bestScorePct: number | null
  xpEarned: number
}

/** Trạng thái làm một bài tập (practice/retrieval) — thử-sai trước. */
export interface ExerciseAttempt {
  failCount: number
  solved: boolean
  /**
   * Đã phải xem lời giải (sau 3 lần sai — nguyên tắc 4). Lưu lại làm
   * dữ liệu cho flow engine Phase 2, không dùng để phạt người học.
   */
  usedSolution: boolean
}

// ---------------------------------------------------------------
// Streak & XP (spec 2.4 — gamification có đạo đức)
// ---------------------------------------------------------------

export interface StreakState {
  current: number
  /** Ngày gần nhất có hoạt động HỢP LỆ (retrieval/lab — nguyên tắc 5). */
  lastActiveDate: ISODate | null
  /** Số lượt "đóng băng" còn lại trong tháng (2 lượt miễn phí/tháng). */
  freezesLeft: number
  /** Tháng 'YYYY-MM' mà freezesLeft đang tính — sang tháng mới reset. */
  freezeMonth: string
}

// ---------------------------------------------------------------
// Lịch sử trả lời — nguyên liệu cho độ khó thích ứng (Phase 2)
// ---------------------------------------------------------------

/**
 * Kết quả 1 câu trả lời. Phase 1 CHỈ ghi lại 10 câu gần nhất
 * (đã chốt với người dùng); flow engine đọc dữ liệu này ở Phase 2.
 */
export interface AnswerRecord {
  correct: boolean
  /** epoch ms — do store cung cấp khi ghi. */
  at: number
}

// ---------------------------------------------------------------
// Drill subnetting (Module 3)
// ---------------------------------------------------------------

/** Kết quả 1 phiên drill trong ngày — nguồn vẽ biểu đồ tiến bộ. */
export interface DrillResult {
  date: ISODate
  correct: number
  total: number
  avgSeconds: number
}
