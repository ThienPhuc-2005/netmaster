// Hình học của phòng lab — thuần, không React, test được không cần DOM.
//
// RÀNG BUỘC CHỊU LỰC: canvas luôn co giãn ĐỀU (một tỉ lệ khung cố định).
// Nhờ vậy quy đổi toạ độ con trỏ → đơn vị thiết kế chỉ cần MỘT hệ số,
// không phải `getScreenCTM()`. Đây không phải tối ưu vặt: jsdom không
// cài getScreenCTM, nên dùng nó là mất khả năng test toàn bộ đường kéo
// thả vĩnh viễn. Ai sửa canvas thành co giãn không đều sẽ làm lệch mọi
// phép quy đổi ở đây.

/** Không gian thiết kế: mọi toạ độ trong lab là ĐƠN VỊ THIẾT KẾ, không phải pixel. */
export const DESIGN_W = 960
export const DESIGN_H = 560
export const GRID = 40
export const DEVICE_W = 76
export const DEVICE_H = 52

export interface Point {
  x: number
  y: number
}

/**
 * Hệ số quy đổi pixel → đơn vị thiết kế.
 * `width === 0` xảy ra khi phần tử chưa layout (jsdom, tab ẩn): trả 1 để
 * phép quy đổi vẫn XÁC ĐỊNH (1px = 1 đơn vị) thay vì sinh Infinity/NaN.
 */
export function scaleOf(rect: { width: number }): number {
  return rect.width > 0 ? rect.width / DESIGN_W : 1
}

export function pointerToModel(
  rect: { left: number; top: number; width: number },
  clientX: number,
  clientY: number,
): Point {
  const scale = scaleOf(rect)
  return { x: (clientX - rect.left) / scale, y: (clientY - rect.top) / scale }
}

/** Bắt vào lưới và kẹp trong khung — sơ đồ người học lắp luôn gọn mắt. */
export function snapToGrid(p: Point): Point {
  const clampedX = Math.min(Math.max(p.x, DEVICE_W / 2), DESIGN_W - DEVICE_W / 2)
  const clampedY = Math.min(Math.max(p.y, DEVICE_H), DESIGN_H - DEVICE_H)
  return { x: Math.round(clampedX / GRID) * GRID, y: Math.round(clampedY / GRID) * GRID }
}

/**
 * Khoảng cách tối thiểu giữa hai cổng liền nhau. Vùng chạm một cổng là
 * 24 CSS px (WCAG 2.5.8). Canvas thường hiển thị ở ~0.6 lần khổ thiết
 * kế (nó chia cột với bảng cấu hình), nên 48 đơn vị mới cho ra ~29px
 * thật — đủ để hai vùng chạm không dính sát nhau. Đo trên trình duyệt
 * thật chứ không suy từ lý thuyết.
 */
export const PORT_SPACING = 48

/**
 * Vị trí cổng thứ `index` trong `count` cổng: rải đều dọc cạnh dưới.
 * Thiết bị nhiều cổng thì hàng cổng XÒE RỘNG HƠN thân thiết bị — trông
 * như các chân cắm, và quan trọng hơn là các vùng chạm không chồng nhau.
 */
export function portPoint(pos: Point, index: number, count: number): Point {
  const y = pos.y + DEVICE_H / 2
  // Một cổng thì nằm chính giữa — không có gì để rải.
  if (count <= 1) return { x: pos.x, y }
  const span = Math.max(DEVICE_W - 16, (count - 1) * PORT_SPACING)
  return { x: pos.x - span / 2 + (span / (count - 1)) * index, y }
}

/**
 * Sợi dây nối hai cổng: đường cong võng xuống — cùng ngôn ngữ hình với
 * đường bay gói tin ở màn onboarding. Path này vừa là dây nhìn thấy,
 * vừa là đường ray để gói tin bám theo.
 */
export function wirePath(a: Point, b: Point): string {
  const sag = Math.min(70, Math.abs(b.x - a.x) * 0.22 + 28)
  const midX = (a.x + b.x) / 2
  const lowestY = Math.max(a.y, b.y) + sag
  return `M ${a.x} ${a.y} Q ${midX} ${lowestY} ${b.x} ${b.y}`
}

/**
 * Ô lưới trống gần nhất để đặt thiết bị mới — dùng cho đường BẤM-để-thêm
 * (đường chính, hoạt động cả trên điện thoại lẫn bàn phím; kéo-thả chỉ là
 * đường phụ).
 */
export function nearestFreeCell(taken: readonly Point[], startRow = 1): Point {
  const isTaken = (p: Point) => taken.some((t) => Math.abs(t.x - p.x) < GRID && Math.abs(t.y - p.y) < GRID)
  for (let row = startRow; row * GRID < DESIGN_H - DEVICE_H; row++) {
    for (let col = 1; col * GRID < DESIGN_W - DEVICE_W / 2; col++) {
      const candidate = snapToGrid({ x: col * GRID * 2, y: row * GRID * 2 })
      if (!isTaken(candidate)) return candidate
    }
  }
  return snapToGrid({ x: DESIGN_W / 2, y: DESIGN_H / 2 })
}

/**
 * Xếp sơ đồ ban đầu: máy tính hàng trên, switch hàng giữa, router hàng
 * dưới. Tất định (không random) nên sơ đồ của mọi người học giống nhau,
 * và ảnh chụp màn hình trong tài liệu luôn khớp.
 */
export function autoLayout(devices: readonly { id: string; kind: 'pc' | 'switch' | 'router' }[]): Record<string, Point> {
  const rows: Record<'pc' | 'switch' | 'router', number> = { pc: 120, switch: 300, router: 460 }
  const layout: Record<string, Point> = {}
  const counters: Record<string, number> = { pc: 0, switch: 0, router: 0 }
  const totals = {
    pc: devices.filter((d) => d.kind === 'pc').length,
    switch: devices.filter((d) => d.kind === 'switch').length,
    router: devices.filter((d) => d.kind === 'router').length,
  }
  for (const device of devices) {
    const index = counters[device.kind] ?? 0
    counters[device.kind] = index + 1
    const total = totals[device.kind]
    const step = DESIGN_W / (total + 1)
    layout[device.id] = snapToGrid({ x: step * (index + 1), y: rows[device.kind] })
  }
  return layout
}
