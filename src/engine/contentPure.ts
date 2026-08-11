// Hàm THUẦN trên nội dung — tách khỏi contentSchema.ts CÓ CHỦ ĐÍCH.
//
// Đường nóng PROD (flow, lessonMachine, store/progress, tầng nạp nội
// dung) chỉ cần ba hàm này cộng với type (type bị xóa lúc build). Nếu
// chúng nằm chung file với tháp zod thì mọi import kéo theo hàng trăm
// lời gọi z.object() chạy lúc mở app — thứ PROD đã cố tình không dùng
// (nhánh validate chỉ chạy DEV/TEST). Biên bản hội đồng trung cấp, ghế
// Hiệu năng: ~46KB gzip zod chết nằm ngay đường modulepreload.
//
// contentSchema.ts re-export lại ba hàm này nên chỗ nào đã sẵn cần zod
// (test, DesignPage) import từ đâu cũng được; riêng file trên ĐƯỜNG NÓNG
// phải import từ đây.

import type { LText } from './ltext'
import type { Lesson, Module } from './contentSchema'

/** Các phòng cung điện được ĐI XEM trong một bài (từ bước Dạy). */
export function palaceRoomsInLesson(lesson: Lesson): string[] {
  const teach = lesson.steps[2]
  return [...new Set(teach.screens.flatMap((s) => s.palaceTour ?? []))]
}

/** Các conceptId được dạy trong một bài (từ các màn hình bước Dạy). */
export function conceptIdsInLesson(lesson: Lesson): string[] {
  const teach = lesson.steps[2]
  return [...new Set(teach.screens.map((s) => s.conceptId))]
}

/** Thứ tự bài học chuẩn của module = duyệt các chặng theo thứ tự. */
export function orderedLessonIds(mod: Pick<Module, 'stages'>): string[] {
  return mod.stages.flatMap((st) => st.lessonIds)
}

export type StageProgressState = 'done' | 'current' | 'pending'

export interface StageProgressItem {
  id: string
  title: LText
  state: StageProgressState
}

/**
 * Dải chặng nhìn từ TRONG một bài học (kho ý tưởng H4).
 *
 * Khác `StageMap` ở trang Học một chỗ CỐT TỬ: chặng ĐANG LÀM là chặng
 * chứa bài đang mở, không phải chặng chứa bài dở dang đầu tiên. Học lại
 * một bài đã xong thì công trường phải chỉ về đúng chỗ người học đang
 * đứng, chứ không nhảy về phía trước.
 *
 * Không có nấc "khóa": chặng phía sau chỉ là CHƯA TỚI. Ổ khóa ở đây là
 * lời dọa vô nghĩa — người học đã ở trong module rồi.
 */
export function stageProgress(
  mod: Pick<Module, 'stages'>,
  currentLessonId: string,
  isDone: (lessonId: string) => boolean,
): StageProgressItem[] {
  return mod.stages.map((st) => {
    const state: StageProgressState = st.lessonIds.includes(currentLessonId)
      ? 'current'
      : st.lessonIds.every(isDone)
        ? 'done'
        : 'pending'
    return { id: st.id, title: st.title, state }
  })
}
