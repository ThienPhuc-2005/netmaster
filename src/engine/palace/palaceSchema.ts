// Schema zod cho CUNG ĐIỆN KÝ ỨC trong nội dung bài học.
//
// Ngoài kiểm cấu trúc tòa nhà (validatePalace), file này ép các ràng buộc
// SƯ PHẠM mà một schema thuần cấu trúc không nói được — cùng lối với
// labSchema:
//
//   - Câu chuyện gợi nhớ phải NHẮC ĐÚNG SỐ CỔNG của phòng. Một câu
//     chuyện đẹp mà không dính số thì hình ảnh không móc vào cái cần
//     nhớ: người học nhớ ổ khóa vàng nhưng vẫn không nhớ 443. Đây chính
//     là chỗ hay hỏng nhất của cung điện ký ức làm ẩu.
//   - Hai phòng không được nhận chung một câu trả lời (kể cả qua cách
//     gọi khác): một câu gõ vào khớp hai phòng thì chấm điểm nhập nhằng.
//   - Câu chuyện phải đủ dài để là một HÌNH ẢNH, không phải nhắc lại tên
//     dịch vụ. Rào tối thiểu, cố tình đặt thấp — chống ẩu chứ không phải
//     áp đặt văn phong.
//
// Lỗi ở đây dành cho NGƯỜI SOẠN BÀI lúc dev/build, không bao giờ hiển thị
// cho người học.

import { z } from 'zod'
import { LTextSchema } from '../ltext'
import { normalizeAnswer, typedAnswerMatches } from '../grading/normalize'
import {
  FLOORS,
  ROOMS_PER_FLOOR,
  ROOM_COUNT,
  serviceAnswers,
  validatePalace,
  type Palace,
} from './palace'

const idSchema = z.string().min(1)

/** Độ dài tối thiểu của câu chuyện gợi nhớ — xem ghi chú đầu file. */
const MIN_STORY_LENGTH = 12

export const PalaceRoomSchema = z.object({
  id: idSchema,
  floor: z.number().int().min(1).max(FLOORS),
  position: z.number().int().min(1).max(ROOMS_PER_FLOOR),
  ports: z.array(z.number().int().min(1).max(65535)).min(1).max(2),
  transport: z.enum(['tcp', 'udp', 'both']),
  service: z.string().min(1),
  serviceAliases: z.array(z.string().min(1)),
  imageId: idSchema,
  story: LTextSchema,
})

const PalaceBaseSchema = z.object({
  id: idSchema,
  title: LTextSchema,
  rooms: z.array(PalaceRoomSchema).length(ROOM_COUNT),
})

function palaceCrossChecks(palace: Palace, ctx: z.RefinementCtx): void {
  const issue = (message: string, path: (string | number)[] = []) =>
    ctx.addIssue({ code: 'custom', message, path })

  for (const problem of validatePalace(palace)) {
    issue(`Tòa nhà có lỗi cấu trúc: ${problem.code} tại ${problem.where}`, ['rooms'])
  }

  // Một câu trả lời chỉ được thuộc về một phòng. Kiểm bằng CHÍNH hàm
  // chấm (typedAnswerMatches) chứ không so chuỗi thô: bộ chấm nhân
  // nhượng dấu và chấp nhận câu chứa cụm đáp án, nên hai cách gọi trông
  // khác nhau vẫn có thể cùng khớp một câu người học gõ.
  for (const [index, room] of palace.rooms.entries()) {
    for (const raw of serviceAnswers(room)) {
      if (normalizeAnswer(raw).length === 0) {
        issue(`Phòng "${room.id}": cách gọi "${raw}" rỗng sau khi chuẩn hóa`, ['rooms', index])
        continue
      }
      for (const other of palace.rooms) {
        if (other.id === room.id) continue
        if (typedAnswerMatches(raw, serviceAnswers(other))) {
          issue(
            `Cách gọi "${raw}" của phòng "${room.id}" cũng được chấm đúng cho phòng "${other.id}" — chấm điểm sẽ nhập nhằng`,
            ['rooms', index],
          )
        }
      }
    }
  }

  for (const [index, room] of palace.rooms.entries()) {
    for (const text of storyTexts(room.story)) {
      if (text.trim().length < MIN_STORY_LENGTH) {
        issue(
          `Phòng "${room.id}": câu chuyện gợi nhớ quá ngắn — cần một hình ảnh, không phải nhắc lại tên dịch vụ`,
          ['rooms', index, 'story'],
        )
      }
      // Số cổng phải xuất hiện trong chính câu chuyện: đó là sợi dây nối
      // hình ảnh với con số cần nhớ.
      for (const port of room.ports) {
        if (!text.includes(String(port))) {
          issue(
            `Phòng "${room.id}": câu chuyện không nhắc số cổng ${port} — hình ảnh sẽ không móc được vào con số`,
            ['rooms', index, 'story'],
          )
        }
      }
    }
  }
}

function storyTexts(story: Palace['rooms'][number]['story']): string[] {
  return story.en === undefined ? [story.vi] : [story.vi, story.en]
}

export const PalaceSchema = PalaceBaseSchema.superRefine((palace, ctx) => {
  palaceCrossChecks(palace as Palace, ctx)
})

/** Parse một cung điện, ném lỗi gộp dễ đọc trỏ đúng chỗ sai. */
export function parsePalace(data: unknown): Palace {
  const result = PalaceSchema.safeParse(data)
  if (!result.success) {
    const lines = result.error.issues.map((i) => `- [${i.path.join('.')}] ${i.message}`)
    throw new Error(`Cung điện ký ức không hợp lệ:\n${lines.join('\n')}`)
  }
  return result.data as Palace
}

export type ParsedPalace = z.infer<typeof PalaceSchema>

/**
 * Chốt chặn thuần-kiểu: schema zod và kiểu viết tay ở `palace.ts` là hai
 * mô tả của CÙNG một hình dạng dữ liệu. Dòng dưới không sinh code chạy —
 * nó chỉ khiến `tsc` báo lỗi ngay khi hai bên lệch nhau.
 */
type AssertAssignable<Target, Source extends Target> = [Target, Source]
export type SchemaMatchesPalace = AssertAssignable<Palace, ParsedPalace>
