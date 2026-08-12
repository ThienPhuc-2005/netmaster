// Hai mốc tốt nghiệp của lộ trình (quyết định 5 của spec v2, đã duyệt):
// đậu module cuối NHẬP MÔN (hết Phần A-C) và đậu module cuối CẢ KHÓA.
//
// SUY TỪ DỮ LIỆU, không đóng đinh "module-12"/"module-21": lộ trình mà
// nới thêm module thì mốc tự dời theo, đúng nếp isFinalModule của màn
// thi. Thuần TS — trang tốt nghiệp và các nút dẫn vào cùng đọc một nguồn.

import { loadModules, noiDungDayDu } from '../../content'

export type MilestoneId = 'nhap-mon' | 'trung-cap'

export interface Milestone {
  id: MilestoneId
  /** Đậu module này là chạm mốc. */
  moduleId: string
}

/**
 * Các mốc đang có trong lộ trình, theo thứ tự đường đời người học.
 *
 * RỖNG khi nội dung chưa về đủ (khối 21.50). Hai mốc ở đây đều suy bằng
 * cách hỏi "module nào là module CUỐI" — mà từ khối 21.49 app mở được
 * bằng khúc đầu đã tải, nên "cuối" của một khúc cụt là cuối KHÚC. Người
 * mới tải về 3 chủ đề đầu (Phần A) mà đậu chủ đề 3 sẽ chạm ngay một mốc
 * "tốt nghiệp nhập môn" hoàn toàn bịa ra — kèm nút mở màn tốt nghiệp và
 * một tờ giấy chứng nhận tải về được, in "3/3 module". Giấy in sai thì
 * gỡ không được nữa: nó đã nằm trong máy người ta.
 *
 * Không có mốc nào thì mọi cửa dẫn tới màn tốt nghiệp tự đóng (màn thi,
 * trang Hồ sơ), còn ai gõ thẳng URL thì `GraduationPage` nói rõ vì sao.
 */
export function milestones(): Milestone[] {
  if (!noiDungDayDu()) return []
  const modules = loadModules()
  const lastIntro = [...modules].reverse().find((m) => m.part === 'A' || m.part === 'B' || m.part === 'C')
  const lastAll = modules.at(-1)
  const found: Milestone[] = []
  if (lastIntro !== undefined) found.push({ id: 'nhap-mon', moduleId: lastIntro.id })
  // Khi app chưa có phần trung cấp, module cuối nhập môn CŨNG là module
  // cuối cùng — lúc đó chỉ có một mốc, không kể một mốc hai lần.
  if (lastAll !== undefined && lastAll.id !== lastIntro?.id) {
    found.push({ id: 'trung-cap', moduleId: lastAll.id })
  }
  return found
}

/** Module này có phải cửa của một mốc tốt nghiệp không. */
export function milestoneOfModule(moduleId: string): Milestone | null {
  return milestones().find((m) => m.moduleId === moduleId) ?? null
}
