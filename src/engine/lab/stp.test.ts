// STP-lite: bầu root và chặn cổng (Module 15).
//
// Mọi khẳng định ở đây là TẤT ĐỊNH — không timer, không thứ tự ngẫu
// nhiên. Đó là điều kiện để bài học "rút dây thì cổng dự phòng tự mở"
// diễn được trước mắt người học mà vẫn test được.

import { describe, expect, it } from 'vitest'
import { DEFAULT_BRIDGE_PRIORITY, bridgePriorityOf, computeStp, isPortBlocked, stpEnabled } from './stp'
import { pingSucceeded, simulatePing } from './simulate'
import { diagnose, gradeLab } from './gradeLab'
import type { SwitchDevice } from './topology'
import { ringOfSwitches, stpLab } from '../../../tests/fixtures/labFixture'

describe('bầu root bridge', () => {
  it('STP tắt là không chặn cổng nào — Module 4 giữ nguyên hành vi', () => {
    const topo = ringOfSwitches(false)
    expect(stpEnabled(topo)).toBe(false)
    const state = computeStp(topo)
    expect(state.rootId).toBeNull()
    expect(state.blocked).toEqual([])
  })

  it('priority NHỎ HƠN thắng, không phải tên nhỏ hơn', () => {
    // Chỗ người học hay nhớ ngược: sw-2 tên đứng giữa nhưng priority
    // 4096 nên nó làm root.
    expect(computeStp(ringOfSwitches(true)).rootId).toBe('sw-2')
  })

  it('priority hòa thì phân định bằng MAC nền, rồi mới tới tên', () => {
    const topo = ringOfSwitches(true)
    const switches = topo.devices.filter((d): d is SwitchDevice => d.kind === 'switch')
    for (const device of switches) device.bridgePriority = DEFAULT_BRIDGE_PRIORITY

    // Chưa khai MAC: hòa hết thì tên nhỏ nhất thắng.
    expect(computeStp(topo).rootId).toBe('sw-1')

    // Khai MAC: sw-3 mang MAC nhỏ nhất nên nó lên làm root dù tên đứng cuối.
    switches[0]!.bridgeMac = 'AA:BB:CC:DD:00:30'
    switches[1]!.bridgeMac = 'AA:BB:CC:DD:00:20'
    switches[2]!.bridgeMac = 'AA:BB:CC:DD:00:10'
    expect(computeStp(topo).rootId).toBe('sw-3')
  })

  it('priority mặc định là 32768 khi đề không khai', () => {
    expect(bridgePriorityOf({ kind: 'switch', id: 's', hostname: 'S', ports: [] })).toBe(DEFAULT_BRIDGE_PRIORITY)
  })
})

describe('chặn cổng để cắt vòng', () => {
  it('mạng vòng ba switch: đúng MỘT cổng bị chặn', () => {
    // Một vòng thì thừa đúng một sợi dây, nên chặn đúng một đầu — chặn
    // hai là cắt luôn cả đường dự phòng.
    expect(computeStp(ringOfSwitches(true)).blocked).toHaveLength(1)
  })

  it('cổng bị chặn KHÔNG nằm trên root — root phát ra mọi cổng', () => {
    const state = computeStp(ringOfSwitches(true))
    expect(state.blocked[0]!.deviceId).not.toBe(state.rootId)
  })

  it('không vòng thì không chặn gì cả — STP bật cũng không đụng vào', () => {
    const topo = ringOfSwitches(true)
    topo.links = topo.links.filter((l) => l.id !== 'ring-31')
    expect(computeStp(topo).blocked).toEqual([])
  })

  it('kết quả TẤT ĐỊNH: chạy nhiều lần ra đúng một đáp án', () => {
    const runs = Array.from({ length: 5 }, () => JSON.stringify(computeStp(ringOfSwitches(true))))
    expect(new Set(runs).size).toBe(1)
  })

  it('cổng bị chặn làm sợi dây câm theo CẢ HAI chiều', () => {
    const topo = ringOfSwitches(true)
    const state = computeStp(topo)
    const blocked = state.blocked[0]!
    expect(isPortBlocked(state, blocked)).toBe(true)
    // Không chặng nào của lượt ping được đi qua sợi dây có đầu bị chặn.
    const link = topo.links.find((l) => l.a.deviceId === blocked.deviceId && l.a.portId === blocked.portId)
    const other = topo.links.find((l) => l.b.deviceId === blocked.deviceId && l.b.portId === blocked.portId)
    const blockedLinkId = (link ?? other)!.id
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    const hops = result.stages.flatMap((s) => s.hops)
    expect(hops.some((h) => h.linkId === blockedLinkId)).toBe(false)
  })
})

describe('màn diễn của Module 15', () => {
  it('CHƯA bật STP: mạng vòng thành bão quảng bá, ping chết', () => {
    const result = simulatePing(ringOfSwitches(false), { from: 'pc-a', to: 'pc-b' })
    expect(pingSucceeded(result)).toBe(false)
    expect(result.failure).toBe('broadcast-storm')
  })

  it('BẬT STP: đúng mạng đó sống lại, không sửa gì thêm', () => {
    expect(pingSucceeded(simulatePing(ringOfSwitches(true), { from: 'pc-a', to: 'pc-b' }))).toBe(true)
  })

  it('RÚT dây chính: hết vòng, cổng dự phòng tự mở, mạng vẫn thông', () => {
    // Đây là lý do người ta nối vòng ngay từ đầu. Không có màn này thì
    // STP chỉ là "cái làm chậm mạng" trong mắt người học.
    const topo = ringOfSwitches(true)
    const blockedBefore = computeStp(topo).blocked[0]!
    const victim = topo.links.find(
      (l) =>
        l.id.startsWith('ring-') &&
        !(l.a.deviceId === blockedBefore.deviceId && l.a.portId === blockedBefore.portId) &&
        !(l.b.deviceId === blockedBefore.deviceId && l.b.portId === blockedBefore.portId),
    )
    expect(victim, 'phải có một sợi vòng không dính đầu đang chặn').toBeDefined()
    topo.links = topo.links.filter((l) => l.id !== victim!.id)

    expect(computeStp(topo).blocked, 'hết vòng thì hết cổng phải nằm im').toEqual([])
    expect(pingSucceeded(simulatePing(topo, { from: 'pc-a', to: 'pc-b' })), 'mạng phải vẫn thông').toBe(true)
  })

  it('bật STP rồi thì vòng KHÔNG còn bị coi là bệnh', () => {
    // Chẩn đoán phải theo kịp: nêu "sơ đồ có vòng" khi STP đang canh nó
    // là dạy ngược đúng bài vừa học.
    expect(diagnose(ringOfSwitches(false), stpLab().goals)).toContain('l2-loop')
    expect(diagnose(ringOfSwitches(true), stpLab().goals)).not.toContain('l2-loop')
  })

  it('đề lab Module 15 chấm được: đề chưa đạt, lời giải đạt trọn', () => {
    const spec = stpLab()
    expect(gradeLab(spec, spec.initial).passed, 'đề bài không được đạt sẵn').toBe(false)
    expect(gradeLab(spec, spec.solution).passed, 'lời giải phải thật sự giải được').toBe(true)
  })
})
