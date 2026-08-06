import { describe, expect, it } from 'vitest'
import { parseLabSpec } from './labSchema'
import type { LabSpec } from './gradeLab'
import {
  ONLY_VLAN_ALLOWANCE,
  ONLY_WIRING_ALLOWANCE,
  teamsAllOneVlan,
  teamsFixed,
  teamsNetwork,
  unwiredParts,
  vlanRepairLab,
  wiredUp,
  wiringLab,
} from '../../../tests/fixtures/labFixture'

/** Sửa một mảnh của đề lab hợp lệ để dựng ca hỏng cần kiểm. */
const broken = (patch: Partial<LabSpec>): unknown => ({ ...vlanRepairLab(), ...patch })

describe('đề lab hợp lệ thì parse được', () => {
  it('bài sửa VLAN', () => {
    expect(() => parseLabSpec(vlanRepairLab())).not.toThrow()
  })

  it('bài lắp mạng từ thiết bị rời', () => {
    expect(() => parseLabSpec(wiringLab())).not.toThrow()
  })

  it('parse xong trả lại đúng dữ liệu', () => {
    const spec = parseLabSpec(vlanRepairLab())
    expect(spec.goals).toHaveLength(2)
    expect(spec.initial.devices).toHaveLength(5)
  })
})

describe('kiểm cấu trúc', () => {
  it('thiếu mục tiêu', () => {
    expect(() => parseLabSpec(broken({ goals: [] }))).toThrow(/Đề lab không hợp lệ/)
  })

  it('MAC sai định dạng', () => {
    const spec = vlanRepairLab()
    const pc = spec.initial.devices.find((d) => d.id === 'pc-a')
    if (pc?.kind === 'pc') pc.port.mac = 'không-phải-mac'
    expect(() => parseLabSpec(spec)).toThrow(/MAC phải có dạng/)
  })

  it('VLAN ngoài khoảng 1..4094', () => {
    const spec = vlanRepairLab()
    const swi = spec.initial.devices.find((d) => d.id === 'sw-1')
    if (swi?.kind === 'switch') swi.ports = swi.ports.map((p) => ({ ...p, vlan: 9999 }))
    expect(() => parseLabSpec(spec)).toThrow(/Đề lab không hợp lệ/)
  })

  it('sơ đồ đề bài có lỗi cấu trúc (một cổng hai dây)', () => {
    const spec = vlanRepairLab()
    spec.initial.links.push({
      id: 'lx',
      a: { deviceId: 'pc-a', portId: 'eth0' },
      b: { deviceId: 'sw-1', portId: 'p4' },
    })
    expect(() => parseLabSpec(spec)).toThrow(/lỗi cấu trúc: port-double-linked/)
  })
})

describe('chốt chặn sư phạm — thứ schema thuần cấu trúc không nói được', () => {
  it('LỜI GIẢI KHÔNG GIẢI ĐƯỢC thì chặn ngay lúc parse', () => {
    // Lời giải "gộp hết vào một VLAN" phá mục tiêu tách phòng ban.
    expect(() => parseLabSpec(broken({ solution: teamsAllOneVlan() }))).toThrow(
      /Lời giải không đạt được mục tiêu/,
    )
  })

  it('lời giải y hệt đề bài cũng bị chặn', () => {
    expect(() => parseLabSpec(broken({ solution: teamsNetwork() }))).toThrow(
      /Lời giải không đạt được mục tiêu/,
    )
  })

  it('ĐỀ BÀI ĐÃ GIẢI SẴN thì chặn — mất productive failure', () => {
    // Đề bài chính là lời giải: người học mở ra đã thấy xanh hết.
    expect(() => parseLabSpec(broken({ initial: teamsFixed() }))).toThrow(/đã đạt sẵn mục tiêu/)
  })

  it('LỜI GIẢI CẦN THAO TÁC BỊ CẤM thì chặn — đề bài tự mâu thuẫn', () => {
    // Đề chỉ cho cắm dây, nhưng lời giải lại phải đổi VLAN.
    expect(() => parseLabSpec(broken({ allow: ONLY_WIRING_ALLOWANCE }))).toThrow(
      /những thao tác mà đề bài không cho phép: vlan/,
    )
  })

  it('mục tiêu trỏ vào thiết bị không có trong đề bài', () => {
    expect(() =>
      parseLabSpec(
        broken({
          goals: [{ kind: 'ping', from: 'pc-a', to: 'may-khong-ton-tai', expect: 'reach' }],
        }),
      ),
    ).toThrow(/không có trong sơ đồ đề bài/)
  })

  it('đề bài không cho phép làm gì cả', () => {
    const nothing = {
      addDevices: [],
      removeDevices: false,
      addLinks: false,
      removeLinks: false,
      setVlan: false,
      setIp: false,
      setRoutes: false,
      maxDevices: 6,
    }
    expect(() => parseLabSpec(broken({ allow: nothing }))).toThrow(/không cho phép người học làm gì/)
  })

  it('mục tiêu toàn "phải chặn" thì chặn — rút hết dây là xong bài', () => {
    expect(() =>
      parseLabSpec(
        broken({
          goals: [{ kind: 'ping', from: 'pc-a', to: 'pc-c', expect: 'blocked' }],
        }),
      ),
    ).toThrow(/ít nhất một mục tiêu ping "reach"/)
  })

  it('mục tiêu bảng MAC mà không có ping nào sinh traffic', () => {
    const spec: unknown = {
      initial: unwiredParts(),
      goals: [{ kind: 'macLearned', switchId: 'sw-1', mac: 'AA:BB:CC:00:00:01', portId: 'p1', vlan: 1 }],
      allow: ONLY_WIRING_ALLOWANCE,
      solution: wiredUp(),
    }
    expect(() => parseLabSpec(spec)).toThrow(/cần ít nhất một mục tiêu ping/)
  })

  it('gom nhiều lỗi vào một thông báo cho người soạn bài dễ sửa', () => {
    // Đề bài bị lắp ngược: sơ đồ đã giải sẵn nằm ở `initial`, sơ đồ hỏng
    // nằm ở `solution`, và quyền thao tác lại không cho đổi VLAN.
    let message = ''
    try {
      parseLabSpec(
        broken({ initial: teamsFixed(), solution: teamsNetwork(), allow: ONLY_WIRING_ALLOWANCE }),
      )
    } catch (error) {
      message = (error as Error).message
    }
    expect(message).toContain('đã đạt sẵn mục tiêu')
    expect(message).toContain('không cho phép')
    expect(message).toContain('Lời giải không đạt được mục tiêu')
  })
})

describe('quyền thao tác của hai đề mẫu khớp với lời giải của chúng', () => {
  it('bài sửa VLAN chỉ cần quyền đổi VLAN', () => {
    expect(vlanRepairLab().allow).toEqual(ONLY_VLAN_ALLOWANCE)
    expect(() => parseLabSpec(vlanRepairLab())).not.toThrow()
  })

  it('bài lắp dây chỉ cần quyền cắm dây', () => {
    expect(wiringLab().allow).toEqual(ONLY_WIRING_ALLOWANCE)
    expect(() => parseLabSpec(wiringLab())).not.toThrow()
  })
})
