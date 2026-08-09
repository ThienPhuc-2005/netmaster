// Tầng nạp nội dung: đọc module (data thuần JSON) → parse + validate →
// cấp cho UI. Thêm bài mới = thêm file JSON, KHÔNG sửa engine (CLAUDE.md).
//
// Nội dung thật nằm ở content/modules/*.json (Khối 5). moduleFixture chỉ
// còn phục vụ test schema/store — app không nạp fixture nữa.
//
// NẠP LƯỜI có chủ đích (biên bản hội đồng trung cấp, ghế Hiệu năng):
// 21 module là ~1.1MB JS — để eager là nó thành chunk modulepreload CHẶN
// trước first paint, người đứng ở Module 1 cũng phải kéo trọn đề thi của
// Module 21 rồi mới thấy màn hình đầu. Giờ glob non-eager: màn onboarding
// / khung app vẽ xong trước, nội dung kéo song song qua `primeModules()`
// (AppGate gọi và chờ — mọi route nằm sau AppGate nên `loadModules()`
// đồng bộ phía dưới luôn chạy sau khi cache đã đầy; test prime một lần
// trong tests/setup.ts).

import { orderedLessonIds } from '../engine/contentPure'
import type { Lesson, Module } from '../engine/contentSchema'

// Vite/vitest gom mọi module JSON lúc build — thêm file là tự vào app.
// KHÔNG eager: mỗi entry là một hàm import() để chunk nội dung rời khỏi
// đường dựng màn hình đầu.
const LAZY_MODULES = import.meta.glob('../../content/modules/*.json', {
  import: 'default',
})

let cache: Module[] | null = null

/**
 * Kéo + kiểm toàn bộ nội dung, đổ vào cache cho `loadModules()` đồng bộ.
 *
 * DEV/TEST: parse zod + validate chéo đầy đủ — lỗi nội dung chết tại đây.
 * Nhánh này DYNAMIC-IMPORT contentSchema nên PROD không ship tháp zod
 * theo đường nóng (~46KB gzip cho một tính năng đã cố tình tắt).
 * PROD: tin bản đã qua cổng chất lượng (content.test.ts chạy đúng schema
 * này trên đúng dữ liệu này trước khi build) — người dùng cuối không trả
 * CPU main thread cho việc kiểm tra dành cho dev.
 */
export async function primeModules(): Promise<Module[]> {
  if (cache !== null) return cache
  const raw = await Promise.all(Object.values(LAZY_MODULES).map((load) => load()))
  if (import.meta.env.PROD) {
    cache = (raw as Module[]).slice().sort((a, b) => a.order - b.order)
  } else {
    const { parseModule, validateModules } = await import('../engine/contentSchema')
    const modules = raw.map(parseModule).sort((a, b) => a.order - b.order)
    validateModules(modules)
    cache = modules
  }
  return cache
}

/**
 * Toàn bộ module theo thứ tự học — ĐỒNG BỘ, đọc từ cache đã prime.
 * Gọi trước khi `primeModules()` xong là lỗi lập trình (AppGate là nơi
 * prime; mọi màn dùng nội dung đều nằm sau cổng đó).
 */
export function loadModules(): Module[] {
  if (cache === null) {
    throw new Error(
      'loadModules() chạy trước khi primeModules() xong — nội dung chưa nạp. AppGate (src/app/gates.tsx) phải prime trước khi mở route; test thì prime ở tests/setup.ts.',
    )
  }
  return cache
}

export function findModule(moduleId: string): Module | null {
  return loadModules().find((m) => m.id === moduleId) ?? null
}

export interface LessonRef {
  module: Module
  lesson: Lesson
}

export function findLesson(lessonId: string): LessonRef | null {
  for (const module of loadModules()) {
    const lesson = module.lessons.find((l) => l.id === lessonId)
    if (lesson) return { module, lesson }
  }
  return null
}

export interface ConceptRef {
  module: Module
  concept: Module['concepts'][number]
}

/** Tra concept theo id — phiên ôn thẻ chỉ giữ conceptId, nội dung tra ở đây. */
export function findConcept(conceptId: string): ConceptRef | null {
  for (const module of loadModules()) {
    const concept = module.concepts.find((c) => c.id === conceptId)
    if (concept) return { module, concept }
  }
  return null
}

export interface PalaceRoomRef {
  module: Module
  palace: NonNullable<Module['palace']>
  room: NonNullable<Module['palace']>['rooms'][number]
}

/**
 * Tra một phòng cung điện theo id — phòng duy nhất toàn cục
 * (validateModules ép). Dùng ở hai chỗ: phòng ôn tập cần dựng mặt thẻ từ
 * `palace:<roomId>`, và bộ nhập câu hỏi cần biết phòng thuộc tòa nhà nào
 * (câu hỏi chỉ khai danh sách phòng, tòa nhà khai ở cấp module).
 */
export function findPalaceRoom(roomId: string): PalaceRoomRef | null {
  for (const module of loadModules()) {
    const palace = module.palace
    if (palace === undefined) continue
    const room = palace.rooms.find((r) => r.id === roomId)
    if (room) return { module, palace, room }
  }
  return null
}

/**
 * Bài học của một module theo đúng thứ tự chặng. Trong module, bài học
 * mở TUẦN TỰ: chỉ bài chưa hoàn thành đầu tiên là bấm vào được — goal
 * gradient dẫn người học đi từng bước, không có lối tắt.
 */
export function lessonsInOrder(module: Module): Lesson[] {
  const byId = new Map(module.lessons.map((l) => [l.id, l]))
  return orderedLessonIds(module).flatMap((id) => {
    const lesson = byId.get(id)
    return lesson ? [lesson] : []
  })
}
