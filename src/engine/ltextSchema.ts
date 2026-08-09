// Schema zod của LText — TÁCH KHỎI ltext.ts có chủ đích: `lt()` nằm trong
// mọi component nên ltext.ts thuộc đường nóng PROD, mà chỉ một dòng
// `import { z }` ở đó là cả lõi zod (~46KB gzip) đi theo bundle mở app
// (biên bản hội đồng trung cấp, ghế Hiệu năng — đây chính là sợi dây
// cuối cùng buộc zod vào chunk index). Schema chỉ dành cho cổng nội dung
// DEV/TEST và /design — những nơi vốn đã kéo zod.

import { z } from 'zod'
import type { LText } from './ltext'

export const LTextSchema = z.object({
  vi: z.string().min(1),
  en: z.string().min(1).optional(),
})

/**
 * Chốt chặn thuần-kiểu (cùng lối labSchema): interface viết tay trong
 * ltext.ts và schema ở đây là hai mô tả của CÙNG một hình dạng — lệch
 * nhau là `tsc` đỏ ngay.
 */
type AssertAssignable<Target, Source extends Target> = [Target, Source]
export type SchemaMatchesLText = AssertAssignable<LText, z.infer<typeof LTextSchema>>
