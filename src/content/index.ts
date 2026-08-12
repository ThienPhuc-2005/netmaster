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
// đồng bộ phía dưới luôn đọc được cache; test prime một lần trong
// tests/setup.ts).
//
// VỀ ĐƯỢC TỚI ĐÂU HỌC TỚI ĐÓ (khối 21.49). Cache KHÔNG còn là "đủ 21 hay
// không có gì": nó là KHÚC ĐẦU LIỀN MẠCH của khóa học, dài bao nhiêu tùy
// mạng. Ai đọc tầng này nhớ hai điều:
//   - `loadModules()` trả về khúc đã về, KHÔNG hứa đủ. Cần biết đủ hay
//     chưa thì hỏi `noiDungDayDu()` — và có hai việc bắt buộc phải hỏi
//     trước khi làm (dọn thẻ mồ côi · gọi tên "module cuối khóa").
//   - Gọi lại `primeModules()` là một lượt KÉO LẠI phần còn thiếu.

import { conceptIdsInLesson, orderedLessonIds, palaceRoomsInLesson } from '../engine/contentPure'
import { roomIdFromCardId } from '../engine/palace/cards'
import type { Lesson, Module } from '../engine/contentSchema'

// Vite/vitest gom mọi module JSON lúc build — thêm file là tự vào app.
// KHÔNG eager: mỗi entry là một hàm import() để chunk nội dung rời khỏi
// đường dựng màn hình đầu.
const LAZY_MODULES = import.meta.glob('../../content/modules/*.json', {
  import: 'default',
})

/**
 * Bản build này CÓ bao nhiêu module. Biết ngay từ lúc bundle chạy, không
 * cần một byte mạng nào — khoá glob là hằng số của bản build. Nhờ vậy app
 * luôn trả lời được câu "đã về đủ chưa" kể cả khi mạng chết hẳn.
 */
const TONG_SO_MODULE = Object.keys(LAZY_MODULES).length

let cache: Module[] | null = null

/** Module đã về được, theo khoá glob — lượt kéo lại chỉ kéo phần còn thiếu. */
const daVe = new Map<string, Module>()

/**
 * Cắt lấy KHÚC ĐẦU LIỀN MẠCH của khóa học (order 1, 2, 3… không đứt).
 *
 * Vì sao dám bỏ module nằm sau chỗ đứt: **cổng mastery vốn đã chặn không
 * cho học tới đó** (nguyên tắc 2 — chưa đậu module N thì N+1 khóa). Người
 * học có module 5 trong tay mà thiếu module 4 thì cũng không mở được 5.
 * Nên cắt đi KHÔNG lấy mất của họ thứ gì, mà lại giữ được điều quan trọng
 * nhất: danh sách còn lại là một KHÚC ĐẦU THẬT của khóa học, nên chuỗi mở
 * khóa không bị lệch. Giữ nguyên cả 5 lẫn 6 thì `computeModuleStatuses`
 * đọc dãy [1,2,3,5,6] và tưởng 5 đứng ngay sau 3 — đậu module 3 là module
 * 5 mở ra, tức là THỦNG CỔNG MASTERY vì một lần rớt mạng.
 *
 * Dãy `order` liên tục từ 1 là bất biến đã có cổng chất lượng khoá
 * (`content.test.ts`: "order liên tục từ 1, không đứt quãng").
 */
export function khucDauLienMach(mods: readonly Module[]): Module[] {
  const xep = [...mods].sort((a, b) => a.order - b.order)
  const giu: Module[] = []
  for (const [i, mod] of xep.entries()) {
    if (mod.order !== i + 1) break
    giu.push(mod)
  }
  return giu
}

/**
 * Kéo những file CHƯA về. Hỏng file nào bỏ file đó, không kéo cả lượt xuống.
 *
 * Ghi vào `daVe` NGAY KHI TỪNG FILE về, không đợi cả lượt xong: nhờ vậy
 * `soDaVe()` là con số sống, và nút "tải nốt" đếm được tiến độ thật thay
 * vì đứng im ở chữ "Đang tải…" (ý N1). Với mạng yếu, vài chục giây im
 * lặng khó phân biệt với treo.
 */
async function keoPhanConThieu(bao?: () => void): Promise<void> {
  const conThieu = Object.entries(LAZY_MODULES).filter(([khoa]) => !daVe.has(khoa))
  if (conThieu.length === 0) return
  const parse =
    import.meta.env.PROD
      ? null
      : (await import('../engine/contentSchema')).parseModule
  await Promise.allSettled(
    conThieu.map(async ([khoa, load]) => {
      const raw = await load()
      // Parse TRƯỚC khi ghi vào kho: file méo mà đã đếm vào rồi thì con
      // số tiến độ nói dối, và khúc đầu liền mạch bên dưới đọc phải rác.
      daVe.set(khoa, parse === null ? (raw as Module) : parse(raw))
      bao?.()
    }),
  )
}

/**
 * Kéo + kiểm nội dung, đổ vào cache cho `loadModules()` đồng bộ.
 *
 * KHÔNG còn "được ăn cả ngã về không" (khối 21.49). Trước đây một
 * `Promise.all` ôm trọn 21 file: rớt một file là hỏng cả lượt, mà app thì
 * chờ đúng lượt đó mới mở cửa — người đứng ở module 2 phải chờ gói của
 * module 21 về đủ. Giờ kéo từng file rời nhau rồi lấy khúc đầu liền mạch:
 * về được tới đâu học tới đó.
 *
 * Gọi lại hàm này chính là LƯỢT KÉO LẠI — nó chỉ đụng những file còn
 * thiếu, file đã về nằm yên trong `daVe`.
 *
 * DEV/TEST: parse zod từng module + validate chéo — lỗi nội dung chết tại
 * đây. Nhánh này DYNAMIC-IMPORT contentSchema nên PROD không ship tháp zod
 * theo đường nóng (~46KB gzip cho một tính năng đã cố tình tắt).
 * PROD: tin bản đã qua cổng chất lượng (content.test.ts chạy đúng schema
 * này trên đúng dữ liệu này trước khi build) — người dùng cuối không trả
 * CPU main thread cho việc kiểm tra dành cho dev.
 */
export async function primeModules(bao?: () => void): Promise<Module[]> {
  if (cache !== null && cache.length === TONG_SO_MODULE) return cache
  await keoPhanConThieu(bao)
  const khuc = khucDauLienMach([...daVe.values()])
  // Ngay cả module ĐẦU cũng không về được thì app không có gì để mở —
  // đây là ca duy nhất còn ném, và `AppGate` dựng màn "chưa tải được".
  if (khuc.length === 0) {
    throw new Error('primeModules: chưa kéo được module nào của khóa học')
  }
  if (!import.meta.env.PROD && khuc.length === TONG_SO_MODULE) {
    // Validate CHÉO chỉ chạy trên bộ ĐỦ: nhiều luật của nó nói về quan hệ
    // giữa các module, chạy trên khúc cụt thì báo lỗi oan. Ở dev/test nội
    // dung đọc thẳng từ đĩa nên luôn đủ — cổng chất lượng không hề lỏng đi.
    const { validateModules } = await import('../engine/contentSchema')
    validateModules(khuc)
  }
  cache = khuc
  return cache
}

/**
 * Bao nhiêu gói đã VỀ TỚI MÁY — con số SỐNG, nhích lên trong lúc đang kéo.
 *
 * Khác `tongSoModule() - soModuleThieu()`: cái đó đọc kho đã chốt, mà kho
 * chỉ được đặt lại khi cả lượt kéo xong. Hàm này đọc thẳng `daVe` nên nút
 * "tải nốt" đếm được từng gói một.
 */
export function soDaVe(): number {
  return daVe.size
}

/** Số module bản build này có — kể cả những gói chưa tải về. */
export function tongSoModule(): number {
  return TONG_SO_MODULE
}

/**
 * Nội dung đã về ĐỦ chưa?
 *
 * Hai việc BẮT BUỘC phải hỏi câu này trước khi làm (xem GHI-CHU-KY-THUAT):
 * dọn thẻ ôn mồ côi, và tuyên bố một module là "module cuối khóa".
 */
export function noiDungDayDu(): boolean {
  return cache !== null && cache.length === TONG_SO_MODULE
}

/** Còn thiếu mấy module để học tiếp được — 0 là đủ. */
export function soModuleThieu(): number {
  return TONG_SO_MODULE - (cache?.length ?? 0)
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

/**
 * Bài học đã DẠY thứ nằm trên một thẻ ôn — tra ngược từ mặt thẻ về bài.
 *
 * Cần cho mục "thứ bạn hay quên" ở trang Hồ sơ: biết mình hay quên cái gì
 * mà không có đường quay lại bài dạy nó thì danh sách chỉ để ngắm.
 *
 * Nhận cả hai loại mặt thẻ: conceptId thường, và thẻ cung điện mang tiền
 * tố `palace:` (mặt trước là một PHÒNG, không phải một khái niệm).
 *
 * Trả `null` khi nội dung đã đổi và không bài nào còn dạy thứ đó — tầng
 * UI vẫn hiện dòng, chỉ bỏ đường mở bài: số lần quên là chuyện thật đã
 * xảy ra, không vì nội dung đổi mà xoá đi.
 */
export function baiDayKhaiNiem(cardId: string): LessonRef | null {
  const roomId = roomIdFromCardId(cardId)
  for (const module of loadModules()) {
    for (const lesson of module.lessons) {
      if (roomId === null) {
        if (conceptIdsInLesson(lesson).includes(cardId)) return { module, lesson }
      } else if (palaceRoomsInLesson(lesson).includes(roomId)) {
        return { module, lesson }
      }
    }
  }
  return null
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
