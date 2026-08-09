// Chuỗi hiển thị cho người học.
//
// Tách khỏi contentSchema để nhiều schema nội dung (bài học, cung điện
// ký ức) dùng chung một định nghĩa mà không phải import chéo nhau.
// Phase 1 chỉ có tiếng Việt; trường `en` chừa sẵn cho bản dịch sau
// (đã chốt: khung UI song ngữ VI/EN, nội dung bài học VI trước).

// KHÔNG import zod ở đây — file này đi theo `lt()` vào mọi component,
// tức là vào bundle mở app của PROD. Schema zod của LText nằm ở
// ltextSchema.ts (đường DEV/TEST + /design); chốt chặn thuần-kiểu bên đó
// giữ hai mô tả khớp nhau.
export interface LText {
  vi: string
  en?: string
}

/**
 * Đường đọc DUY NHẤT của LText phía UI (hội đồng 2026-08-07, ghế i18n):
 * trước đây 40+ chỗ đóng đinh `.vi` rải trên 10 file — mỗi feature mới
 * lại nhân thêm call site, chi phí bật EN nội dung tăng dần theo thời
 * gian. Giờ mọi chỗ render đi qua đây: `en` chưa có thì rơi về `vi`
 * (hành vi hôm nay không đổi một pixel), ngày bật EN nội dung chỉ còn là
 * việc của tầng data. Thuần — dùng được cả trong engine lẫn UI.
 */
export function lt(text: LText, lang: 'vi' | 'en' = 'vi'): string {
  return lang === 'en' ? (text.en ?? text.vi) : text.vi
}

/** Như `lt` nhưng nhận LText tùy chọn — cho các trường optional (hintTopic, explain...). */
export function maybeLt(text: LText | undefined, lang: 'vi' | 'en' = 'vi'): string | undefined {
  return text === undefined ? undefined : lt(text, lang)
}
