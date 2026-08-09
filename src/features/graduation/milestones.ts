// Hai mốc tốt nghiệp của lộ trình (quyết định 5 của spec v2, đã duyệt):
// đậu module cuối NHẬP MÔN (hết Phần A-C) và đậu module cuối CẢ KHÓA.
//
// SUY TỪ DỮ LIỆU, không đóng đinh "module-12"/"module-21": lộ trình mà
// nới thêm module thì mốc tự dời theo, đúng nếp isFinalModule của màn
// thi. Thuần TS — trang tốt nghiệp và các nút dẫn vào cùng đọc một nguồn.

import { loadModules } from '../../content'

export type MilestoneId = 'nhap-mon' | 'trung-cap'

export interface Milestone {
  id: MilestoneId
  /** Đậu module này là chạm mốc. */
  moduleId: string
}

/** Các mốc đang có trong lộ trình, theo thứ tự đường đời người học. */
export function milestones(): Milestone[] {
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
