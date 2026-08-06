// Schema zod cho CUNG ĐIỆN KÝ ỨC trong nội dung bài học.
//
// Ngoài kiểm cấu trúc tòa nhà (validatePalace), file này ép các ràng buộc
// SƯ PHẠM mà một schema thuần cấu trúc không nói được — cùng lối với
// labSchema:
//
//   - Câu chuyện gợi nhớ phải NHẮC ĐÚNG từng key của phòng. Một câu
//     chuyện đẹp mà không dính key thì hình ảnh không móc vào cái cần
//     nhớ: người học nhớ ổ khóa vàng nhưng vẫn không nhớ 443. Đây chính
//     là chỗ hay hỏng nhất của cung điện ký ức làm ẩu.
//   - Hai phòng không được nhận chung một câu trả lời vế phụ (kể cả qua
//     cách gọi khác): một câu gõ vào khớp hai phòng thì chấm nhập nhằng.
//   - Câu chuyện phải đủ dài để là một HÌNH ẢNH, không phải nhắc lại tên.
//   - Tòa keyStyle 'number' thì key phải là số cổng hợp lệ (1..65535) —
//     ràng buộc CHUYÊN NGÀNH nằm ở schema, engine giữ phần tổng quát.
//
// Lỗi ở đây dành cho NGƯỜI SOẠN BÀI lúc dev/build, không bao giờ hiển thị
// cho người học.

import { z } from 'zod'
import { LTextSchema } from '../ltext'
import { normalizeAnswer, typedAnswerMatches } from '../grading/normalize'
import { nameAnswers, roomCountOf, validatePalace, type Palace } from './palace'

const idSchema = z.string().min(1)

/** Độ dài tối thiểu của câu chuyện gợi nhớ — xem ghi chú đầu file. */
const MIN_STORY_LENGTH = 12

export const PalaceRoomSchema = z.object({
  id: idSchema,
  floor: z.number().int().min(1),
  position: z.number().int().min(1),
  keys: z.array(z.string().min(1)).min(1).max(2),
  name: z.string().min(1),
  nameAliases: z.array(z.string().min(1)),
  imageId: idSchema,
  story: LTextSchema,
  note: LTextSchema.optional(),
})

const PalaceBaseSchema = z.object({
  id: idSchema,
  title: LTextSchema,
  floors: z.number().int().min(2).max(8),
  roomsPerFloor: z.number().int().min(1).max(4),
  keyStyle: z.enum(['number', 'text']),
  keyLabel: LTextSchema,
  nameLabel: LTextSchema,
  keyPlaceholder: LTextSchema.optional(),
  namePlaceholder: LTextSchema.optional(),
  keyHint: LTextSchema.optional(),
  nameHint: LTextSchema.optional(),
  rooms: z.array(PalaceRoomSchema).min(2),
})

function palaceCrossChecks(palace: Palace, ctx: z.RefinementCtx): void {
  const issue = (message: string, path: (string | number)[] = []) =>
    ctx.addIssue({ code: 'custom', message, path })

  if (palace.rooms.length !== roomCountOf(palace)) {
    issue(
      `Tòa nhà khai ${palace.floors} tầng × ${palace.roomsPerFloor} phòng = ${roomCountOf(palace)} nhưng có ${palace.rooms.length} phòng`,
      ['rooms'],
    )
  }

  for (const problem of validatePalace(palace)) {
    issue(`Tòa nhà có lỗi cấu trúc: ${problem.code} tại ${problem.where}`, ['rooms'])
  }

  // Tòa số: key phải là cổng hợp lệ. Đây là luật của NỘI DUNG port,
  // không phải của phương pháp cung điện — nên nằm ở schema.
  if (palace.keyStyle === 'number') {
    for (const [index, room] of palace.rooms.entries()) {
      for (const key of room.keys) {
        const value = Number(key)
        if (!/^\d+$/.test(key) || !Number.isSafeInteger(value) || value < 1 || value > 65535) {
          issue(`Phòng "${room.id}": key "${key}" không phải số cổng hợp lệ (1..65535)`, ['rooms', index])
        }
      }
    }
  }

  // Một câu trả lời vế phụ chỉ được thuộc về một phòng. Kiểm bằng CHÍNH
  // hàm chấm (typedAnswerMatches) chứ không so chuỗi thô: bộ chấm nhân
  // nhượng dấu và chấp nhận câu chứa cụm đáp án, nên hai cách gọi trông
  // khác nhau vẫn có thể cùng khớp một câu người học gõ.
  for (const [index, room] of palace.rooms.entries()) {
    for (const raw of nameAnswers(room)) {
      if (normalizeAnswer(raw).length === 0) {
        issue(`Phòng "${room.id}": cách gọi "${raw}" rỗng sau khi chuẩn hóa`, ['rooms', index])
        continue
      }
      for (const other of palace.rooms) {
        if (other.id === room.id) continue
        if (typedAnswerMatches(raw, nameAnswers(other))) {
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
          `Phòng "${room.id}": câu chuyện gợi nhớ quá ngắn — cần một hình ảnh, không phải nhắc lại cái tên`,
          ['rooms', index, 'story'],
        )
      }
      // Key phải xuất hiện trong chính câu chuyện: đó là sợi dây nối
      // hình ảnh với cái cần nhớ.
      for (const key of room.keys) {
        if (!text.toLowerCase().includes(key.toLowerCase())) {
          issue(
            `Phòng "${room.id}": câu chuyện không nhắc key "${key}" — hình ảnh sẽ không móc được vào cái cần nhớ`,
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
