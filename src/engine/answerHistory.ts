// Lịch sử trả lời — cửa sổ trượt 10 câu gần nhất (spec 2.3).
//
// Phase 1 CHỈ ghi lại, không điều chỉnh gì (đã chốt với người dùng).
// Đây là nguyên liệu cho độ khó thích ứng ở Phase 2: flow engine sẽ đọc
// accuracyPct — > 90% tăng độ khó, < 60% chèn bài ôn nền tảng, mục tiêu
// giữ người học ở vùng đúng 70-85% (vùng flow).

import type { AnswerRecord } from './types'

export const HISTORY_CAP = 10

/** Append one record, keeping only the newest HISTORY_CAP entries. */
export function pushAnswer(history: AnswerRecord[], correct: boolean, at: number): AnswerRecord[] {
  // slice(-CAP) also trims oversized input (e.g. corrupt persisted data).
  return [...history, { correct, at }].slice(-HISTORY_CAP)
}

/**
 * % đúng trên cửa sổ hiện có (0..100). Trả null khi rỗng — "chưa có
 * dữ liệu" khác hẳn "0% đúng", flow engine Phase 2 không được nhầm.
 */
export function accuracyPct(history: AnswerRecord[]): number | null {
  if (history.length === 0) return null
  const correct = history.reduce((n, r) => n + (r.correct ? 1 : 0), 0)
  return (correct / history.length) * 100
}
