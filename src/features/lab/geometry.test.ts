import { describe, expect, it } from 'vitest'
import {
  DESIGN_H,
  DESIGN_W,
  DEVICE_H,
  DEVICE_W,
  GRID,
  PORT_SPACING,
  autoLayout,
  nearestFreeCell,
  pointerToModel,
  portPoint,
  scaleOf,
  snapToGrid,
  wirePath,
} from './geometry'

describe('quy đổi toạ độ', () => {
  it('CHỐT CỦA JSDOM: chưa layout (width 0) thì hệ số là 1, không phải Infinity', () => {
    // Đây là điều kiện để kéo-thả test được: không có chốt này thì mọi
    // phép quy đổi trong jsdom cho NaN và cả đường kéo không kiểm được.
    expect(scaleOf({ width: 0 })).toBe(1)
  })

  it('canvas đúng bằng khổ thiết kế thì hệ số 1', () => {
    expect(scaleOf({ width: DESIGN_W })).toBe(1)
  })

  it('canvas thu một nửa thì hệ số 0.5', () => {
    expect(scaleOf({ width: DESIGN_W / 2 })).toBe(0.5)
  })

  it('quy đổi trừ đúng gốc của khung', () => {
    const rect = { left: 100, top: 50, width: DESIGN_W }
    expect(pointerToModel(rect, 340, 250)).toEqual({ x: 240, y: 200 })
  })

  it('canvas thu nhỏ: một pixel bằng hai đơn vị thiết kế', () => {
    const rect = { left: 0, top: 0, width: DESIGN_W / 2 }
    expect(pointerToModel(rect, 100, 60)).toEqual({ x: 200, y: 120 })
  })
})

describe('bắt lưới', () => {
  it('làm tròn về bội của lưới', () => {
    expect(snapToGrid({ x: 137, y: 219 })).toEqual({ x: 120, y: 200 })
    expect(snapToGrid({ x: 141, y: 221 })).toEqual({ x: 160, y: 240 })
  })

  it('kẹp trong khung, không cho thiết bị lọt ra ngoài mặt bàn', () => {
    const topLeft = snapToGrid({ x: -500, y: -500 })
    expect(topLeft.x).toBeGreaterThanOrEqual(DEVICE_W / 2 - GRID)
    expect(topLeft.y).toBeGreaterThan(0)

    const bottomRight = snapToGrid({ x: DESIGN_W + 500, y: DESIGN_H + 500 })
    expect(bottomRight.x).toBeLessThanOrEqual(DESIGN_W)
    expect(bottomRight.y).toBeLessThanOrEqual(DESIGN_H)
  })
})

describe('vị trí cổng', () => {
  const at = { x: 400, y: 300 }

  it('một cổng thì nằm giữa cạnh dưới', () => {
    expect(portPoint(at, 0, 1)).toEqual({ x: 400, y: 300 + DEVICE_H / 2 })
  })

  it('nhiều cổng rải đều và ĐỐI XỨNG quanh tâm', () => {
    const points = [0, 1, 2, 3].map((i) => portPoint(at, i, 4))
    const first = points[0]!
    const last = points[3]!
    expect(first.x + last.x).toBeCloseTo(2 * at.x)
    expect(points.every((p) => p.y === 300 + DEVICE_H / 2)).toBe(true)
  })

  it('VÙNG CHẠM KHÔNG CHỒNG NHAU: hai cổng liền nhau cách tối thiểu PORT_SPACING', () => {
    for (const count of [2, 3, 4, 6]) {
      const points = [...Array(count).keys()].map((i) => portPoint(at, i, count))
      for (let i = 1; i < points.length; i++) {
        expect(points[i]!.x - points[i - 1]!.x).toBeGreaterThanOrEqual(PORT_SPACING)
      }
    }
  })
})

describe('đường dây', () => {
  it('bắt đầu ở cổng này và kết thúc ở cổng kia', () => {
    const d = wirePath({ x: 100, y: 200 }, { x: 500, y: 240 })
    expect(d.startsWith('M 100 200')).toBe(true)
    expect(d.endsWith('500 240')).toBe(true)
  })

  it('luôn võng XUỐNG dưới hai đầu (cùng ngôn ngữ hình với onboarding)', () => {
    const d = wirePath({ x: 100, y: 200 }, { x: 300, y: 200 })
    const controlY = Number(d.split('Q')[1]!.trim().split(/\s+/)[1])
    expect(controlY).toBeGreaterThan(200)
  })
})

describe('xếp chỗ tự động', () => {
  it('máy tính hàng trên, switch hàng giữa, router hàng dưới', () => {
    const layout = autoLayout([
      { id: 'a', kind: 'pc' },
      { id: 'b', kind: 'pc' },
      { id: 's', kind: 'switch' },
      { id: 'r', kind: 'router' },
    ])
    expect(layout.a!.y).toBeLessThan(layout.s!.y)
    expect(layout.s!.y).toBeLessThan(layout.r!.y)
  })

  it('cùng hàng thì không chồng chỗ nhau', () => {
    const layout = autoLayout([
      { id: 'a', kind: 'pc' },
      { id: 'b', kind: 'pc' },
      { id: 'c', kind: 'pc' },
    ])
    const xs = [layout.a!.x, layout.b!.x, layout.c!.x]
    expect(new Set(xs).size).toBe(3)
  })

  it('tất định: gọi hai lần cho kết quả y hệt', () => {
    const devices = [{ id: 'a', kind: 'pc' as const }, { id: 's', kind: 'switch' as const }]
    expect(autoLayout(devices)).toEqual(autoLayout(devices))
  })

  it('không thiết bị nào thì bố cục rỗng', () => {
    expect(autoLayout([])).toEqual({})
  })
})

describe('tìm ô trống', () => {
  it('bàn trống thì trả ô đầu tiên', () => {
    const cell = nearestFreeCell([])
    expect(cell.x).toBeGreaterThan(0)
    expect(cell.y).toBeGreaterThan(0)
  })

  it('tránh những chỗ đã có thiết bị', () => {
    const taken = [nearestFreeCell([])]
    const next = nearestFreeCell(taken)
    expect(next).not.toEqual(taken[0])
  })
})
