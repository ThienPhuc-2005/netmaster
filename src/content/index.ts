// Tầng nạp nội dung: đọc module (data thuần JSON) → parse + validate →
// cấp cho UI. Thêm bài mới = thêm file JSON, KHÔNG sửa engine (CLAUDE.md).
//
// Nội dung thật nằm ở content/modules/*.json (Khối 5). moduleFixture chỉ
// còn phục vụ test schema/store — app không nạp fixture nữa.

import { parseModule, validateModules, orderedLessonIds, type Lesson, type Module } from '../engine/contentSchema'

// Vite/vitest gom mọi module JSON lúc build — thêm file là tự vào app.
const RAW_MODULES = import.meta.glob('../../content/modules/*.json', {
  eager: true,
  import: 'default',
})

let cache: Module[] | null = null

/** Toàn bộ module theo thứ tự học (parse 1 lần, validate chéo liên-module). */
export function loadModules(): Module[] {
  if (cache === null) {
    const modules = Object.values(RAW_MODULES)
      .map(parseModule)
      .sort((a, b) => a.order - b.order)
    validateModules(modules)
    cache = modules
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
