// Chuỗi hiển thị cho người học.
//
// Tách khỏi contentSchema để nhiều schema nội dung (bài học, cung điện
// ký ức) dùng chung một định nghĩa mà không phải import chéo nhau.
// Phase 1 chỉ có tiếng Việt; trường `en` chừa sẵn cho bản dịch sau
// (đã chốt: khung UI song ngữ VI/EN, nội dung bài học VI trước).

import { z } from 'zod'

export const LTextSchema = z.object({
  vi: z.string().min(1),
  en: z.string().min(1).optional(),
})

export type LText = z.infer<typeof LTextSchema>
