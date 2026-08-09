import { describe, expect, it } from 'vitest'
import {
  ALLOW_EVERYTHING,
  MAX_HISTORY,
  allowanceViolations,
  applyLabAction,
  canApplyLabAction,
  canRedo,
  canUndo,
  classifyDiff,
  freePortsOf,
  redoLab,
  resetLab,
  startLab,
  undoLab,
  type LabAction,
  type LabAllowance,
  type LabSession,
} from './session'
import { findDevice, validateTopology, type Device } from './topology'
import { MAC, flatNetwork, looseParts, routedNetwork, splitVlanFixed, splitVlanNetwork,
  ONLY_TRUNK_ALLOWANCE,
  ONLY_VLAN_ALLOWANCE,
  trunkHealthy,
  trunkMissing,
  ONLY_STP_ALLOWANCE,
  ringOfSwitches,
} from '../../../tests/fixtures/labFixture'

const newSwitch = (id: string): Device => ({
  kind: 'switch',
  id,
  hostname: 'Switch mới',
  ports: [
    { id: 'p1', vlan: 1 },
    { id: 'p2', vlan: 1 },
  ],
})

const setVlan = (portId: string, vlan: number): LabAction => ({
  kind: 'set-switch-port-vlan',
  deviceId: 'sw-1',
  portId,
  vlan,
})

/** Quyền hẹp: chỉ được đổi VLAN — dùng cho bài "sửa mạng hỏng". */
const ONLY_VLAN: LabAllowance = {
  addDevices: [],
  removeDevices: false,
  addLinks: false,
  removeLinks: false,
  setVlan: true,
  setIp: false,
  setRoutes: false,
  maxDevices: 4,
}

describe('khởi tạo phiên', () => {
  it('bản làm việc tách rời đề bài — sửa không đụng bản gốc', () => {
    const initial = flatNetwork()
    const session = startLab(initial, ALLOW_EVERYTHING)
    session.present.devices.pop()
    expect(initial.devices).toHaveLength(3)
    expect(session.initial.devices).toHaveLength(3)
  })

  it('mới mở thì chưa undo/redo được', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    expect(canUndo(session)).toBe(false)
    expect(canRedo(session)).toBe(false)
  })
})

describe('áp dụng thao tác', () => {
  it('đổi VLAN một cổng: ghi đúng một mốc lịch sử', () => {
    const session = startLab(splitVlanNetwork(), ONLY_VLAN)
    const after = applyLabAction(session, setVlan('p1', 20))
    expect(after.past).toHaveLength(1)
    expect(canUndo(after)).toBe(true)
    const swi = findDevice(after.present, 'sw-1')!
    if (swi.kind === 'switch') expect(swi.ports.find((p) => p.id === 'p1')?.vlan).toBe(20)
  })

  it('phiên cũ không bị sửa (state bất biến)', () => {
    const session = startLab(splitVlanNetwork(), ONLY_VLAN)
    applyLabAction(session, setVlan('p1', 20))
    const swi = findDevice(session.present, 'sw-1')!
    if (swi.kind === 'switch') expect(swi.ports.find((p) => p.id === 'p1')?.vlan).toBe(10)
  })

  it('thêm thiết bị và nối dây', () => {
    let session = startLab(looseParts(), ALLOW_EVERYTHING)
    session = applyLabAction(session, { kind: 'add-device', device: newSwitch('sw-new') })
    session = applyLabAction(session, {
      kind: 'add-link',
      link: { id: 'nl1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-new', portId: 'p1' } },
    })
    expect(session.present.devices).toHaveLength(3)
    expect(session.present.links).toHaveLength(1)
    expect(validateTopology(session.present)).toEqual([])
  })

  it('gỡ thiết bị thì gỡ luôn dây của nó', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    const after = applyLabAction(session, { kind: 'remove-device', deviceId: 'sw-1' })
    expect(after.present.devices).toHaveLength(2)
    expect(after.present.links).toHaveLength(0)
    expect(validateTopology(after.present)).toEqual([])
  })

  it('MỘT lần undo khôi phục cả thiết bị lẫn dây đã gỡ theo', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    const removed = applyLabAction(session, { kind: 'remove-device', deviceId: 'sw-1' })
    const back = undoLab(removed)
    expect(back.present.devices).toHaveLength(3)
    expect(back.present.links).toHaveLength(2)
  })

  it('đặt IP và gateway cho máy tính', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    const after = applyLabAction(session, {
      kind: 'set-pc-ip',
      deviceId: 'pc-a',
      ipConfig: { ip: '10.0.0.5', prefix: 8 },
      gateway: '10.0.0.1',
    })
    const pcA = findDevice(after.present, 'pc-a')!
    if (pcA.kind === 'pc') {
      expect(pcA.ipConfig).toEqual({ ip: '10.0.0.5', prefix: 8 })
      expect(pcA.gateway).toBe('10.0.0.1')
    }
  })

  it('xóa cấu hình IP cũng là một thao tác hợp lệ', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    const after = applyLabAction(session, { kind: 'set-pc-ip', deviceId: 'pc-a', ipConfig: null, gateway: null })
    const pcA = findDevice(after.present, 'pc-a')!
    if (pcA.kind === 'pc') expect(pcA.ipConfig).toBeNull()
  })

  it('đặt IP cho cổng router và tuyến tĩnh', () => {
    let session = startLab(routedNetwork(), ALLOW_EVERYTHING)
    session = applyLabAction(session, {
      kind: 'set-router-port-ip',
      deviceId: 'r-1',
      portId: 'g1',
      ipConfig: { ip: '10.0.0.254', prefix: 24 },
    })
    session = applyLabAction(session, {
      kind: 'set-static-routes',
      deviceId: 'r-1',
      routes: [{ destination: '172.16.0.0', prefix: 24, nextHop: '10.0.0.9' }],
    })
    const router = findDevice(session.present, 'r-1')!
    if (router.kind === 'router') {
      expect(router.ports.find((p) => p.id === 'g1')?.ipConfig?.ip).toBe('10.0.0.254')
      expect(router.staticRoutes).toHaveLength(1)
    }
  })
})

describe('từ chối thao tác — lời từ chối là MÃ, không phải chữ "SAI"', () => {
  it('quyền không cho thì từ chối, kể cả thao tác hợp lý', () => {
    const session = startLab(splitVlanNetwork(), ONLY_VLAN)
    expect(canApplyLabAction(session, { kind: 'remove-device', deviceId: 'sw-1' })).toBe('not-allowed')
    expect(
      canApplyLabAction(session, { kind: 'set-pc-ip', deviceId: 'pc-a', ipConfig: null, gateway: null }),
    ).toBe('not-allowed')
    expect(canApplyLabAction(session, setVlan('p1', 20))).toBeNull()
  })

  it('cổng đã có dây thì không cắm thêm', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    expect(
      canApplyLabAction(session, {
        kind: 'add-link',
        link: { id: 'x', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p3' } },
      }),
    ).toBe('port-occupied')
  })

  it('không nối hai cổng của cùng một thiết bị', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    expect(
      canApplyLabAction(session, {
        kind: 'add-link',
        link: { id: 'x', a: { deviceId: 'sw-1', portId: 'p3' }, b: { deviceId: 'sw-1', portId: 'p4' } },
      }),
    ).toBe('self-link')
  })

  it('vượt trần số thiết bị', () => {
    const session = startLab(flatNetwork(), { ...ALLOW_EVERYTHING, maxDevices: 3 })
    expect(canApplyLabAction(session, { kind: 'add-device', device: newSwitch('sw-x') })).toBe('max-devices')
  })

  it('trùng id thiết bị, trùng id dây', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    expect(canApplyLabAction(session, { kind: 'add-device', device: newSwitch('sw-1') })).toBe('duplicate-device-id')
    expect(
      canApplyLabAction(session, {
        kind: 'add-link',
        link: { id: 'l1', a: { deviceId: 'sw-1', portId: 'p3' }, b: { deviceId: 'pc-b', portId: 'eth0' } },
      }),
    ).toBe('duplicate-link-id')
  })

  it('thiết bị hoặc cổng không tồn tại', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    expect(canApplyLabAction(session, { kind: 'remove-device', deviceId: 'khong-co' })).toBe('unknown-device')
    expect(canApplyLabAction(session, setVlan('p9', 20))).toBe('unknown-port')
    expect(canApplyLabAction(session, { kind: 'remove-link', linkId: 'khong-co' })).toBe('unknown-link')
  })

  it('đặt VLAN cho máy tính (sai loại thiết bị)', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    expect(
      canApplyLabAction(session, { kind: 'set-switch-port-vlan', deviceId: 'pc-a', portId: 'eth0', vlan: 10 }),
    ).toBe('wrong-device-kind')
  })

  it('giá trị VLAN / IP / prefix không hợp lệ', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    expect(canApplyLabAction(session, setVlan('p1', 0))).toBe('invalid-vlan')
    expect(
      canApplyLabAction(session, {
        kind: 'set-pc-ip',
        deviceId: 'pc-a',
        ipConfig: { ip: '999.1.1.1', prefix: 24 },
        gateway: null,
      }),
    ).toBe('invalid-ip')
    expect(
      canApplyLabAction(session, {
        kind: 'set-pc-ip',
        deviceId: 'pc-a',
        ipConfig: { ip: '10.0.0.1', prefix: 40 },
        gateway: null,
      }),
    ).toBe('invalid-prefix')
  })

  it('applyLabAction ném lỗi khi thao tác bị từ chối (lỗi lập trình UI)', () => {
    const session = startLab(splitVlanNetwork(), ONLY_VLAN)
    expect(() => applyLabAction(session, { kind: 'remove-device', deviceId: 'sw-1' })).toThrowError(/not-allowed/)
  })
})

describe('undo / redo / làm lại', () => {
  const threeSteps = (): LabSession => {
    let session = startLab(splitVlanNetwork(), ONLY_VLAN)
    session = applyLabAction(session, setVlan('p1', 30))
    session = applyLabAction(session, setVlan('p1', 40))
    session = applyLabAction(session, setVlan('p1', 20))
    return session
  }

  const vlanOfP1 = (session: LabSession): number | undefined => {
    const swi = findDevice(session.present, 'sw-1')
    return swi?.kind === 'switch' ? swi.ports.find((p) => p.id === 'p1')?.vlan : undefined
  }

  it('undo lùi từng bước đúng thứ tự', () => {
    let session = threeSteps()
    expect(vlanOfP1(session)).toBe(20)
    session = undoLab(session)
    expect(vlanOfP1(session)).toBe(40)
    session = undoLab(session)
    expect(vlanOfP1(session)).toBe(30)
    session = undoLab(session)
    expect(vlanOfP1(session)).toBe(10) // về lại đề bài
    expect(canUndo(session)).toBe(false)
  })

  it('undo ở đáy lịch sử không làm gì cả, không nổ', () => {
    const session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    expect(undoLab(session)).toEqual(session)
    expect(redoLab(session)).toEqual(session)
  })

  it('redo tiến lại đúng bước vừa lùi', () => {
    let session = threeSteps()
    session = undoLab(undoLab(session))
    expect(canRedo(session)).toBe(true)
    session = redoLab(session)
    expect(vlanOfP1(session)).toBe(40)
    session = redoLab(session)
    expect(vlanOfP1(session)).toBe(20)
    expect(canRedo(session)).toBe(false)
  })

  it('làm việc mới sau khi undo thì nhánh redo bị bỏ', () => {
    let session = threeSteps()
    session = undoLab(session)
    expect(canRedo(session)).toBe(true)
    session = applyLabAction(session, setVlan('p1', 50))
    expect(canRedo(session)).toBe(false)
    expect(vlanOfP1(session)).toBe(50)
  })

  it('lịch sử có trần: thao tác cũ nhất bị bỏ, phiên vẫn dùng được', () => {
    let session = startLab(splitVlanNetwork(), ONLY_VLAN)
    for (let i = 0; i < MAX_HISTORY + 10; i++) {
      session = applyLabAction(session, setVlan('p1', (i % 4000) + 1))
    }
    expect(session.past).toHaveLength(MAX_HISTORY)
    expect(canUndo(session)).toBe(true)
  })

  it('làm lại từ đầu quay về đề bài — và CHÍNH NÓ cũng undo được', () => {
    let session = threeSteps()
    session = resetLab(session)
    expect(vlanOfP1(session)).toBe(10)
    // Bấm nhầm "làm lại" mà mất sạch công lắp thì người học sẽ ngại thử.
    session = undoLab(session)
    expect(vlanOfP1(session)).toBe(20)
  })
})

describe('phân loại thay đổi (đối chiếu với quyền được phép)', () => {
  it('không đổi gì thì không có loại nào', () => {
    expect(classifyDiff(flatNetwork(), flatNetwork())).toEqual([])
  })

  it('nhận ra đổi VLAN', () => {
    expect(classifyDiff(splitVlanNetwork(), splitVlanFixed())).toEqual(['vlan'])
  })

  it('nhận ra thêm/bớt thiết bị và dây', () => {
    let session = startLab(looseParts(), ALLOW_EVERYTHING)
    const before = session.present
    session = applyLabAction(session, { kind: 'add-device', device: newSwitch('sw-new') })
    session = applyLabAction(session, {
      kind: 'add-link',
      link: { id: 'nl1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-new', portId: 'p1' } },
    })
    expect(classifyDiff(before, session.present).sort()).toEqual(['add-device', 'add-link'])
    expect(classifyDiff(session.present, before).sort()).toEqual(['remove-device', 'remove-link'])
  })

  it('nhận ra đổi IP và đổi tuyến tĩnh', () => {
    const before = routedNetwork()
    const afterIp = routedNetwork()
    const pcA = findDevice(afterIp, 'pc-a')!
    if (pcA.kind === 'pc') pcA.gateway = '192.168.1.254'
    expect(classifyDiff(before, afterIp)).toEqual(['ip'])

    const afterRoutes = routedNetwork()
    const router = findDevice(afterRoutes, 'r-1')!
    if (router.kind === 'router') {
      router.staticRoutes = [{ destination: '172.16.0.0', prefix: 24, nextHop: '10.0.0.2' }]
    }
    expect(classifyDiff(before, afterRoutes)).toEqual(['routes'])
  })

  it('allowanceViolations chỉ ra đúng loại thao tác vượt quyền', () => {
    expect(allowanceViolations(ONLY_VLAN, ['vlan'])).toEqual([])
    expect(allowanceViolations(ONLY_VLAN, ['vlan', 'ip', 'add-device'])).toEqual(['ip', 'add-device'])
    expect(allowanceViolations(ALLOW_EVERYTHING, ['vlan', 'ip', 'add-device', 'routes'])).toEqual([])
  })

  it('lời giải bài "sửa VLAN" nằm gọn trong quyền chỉ-đổi-VLAN', () => {
    // Đây chính là phép kiểm mà tầng nội dung sẽ dùng ở khối sau: đề bài
    // không được đòi người học làm thứ mà chính nó cấm.
    const changes = classifyDiff(splitVlanNetwork(), splitVlanFixed())
    expect(allowanceViolations(ONLY_VLAN, changes)).toEqual([])
  })
})

describe('trợ giúp cho UI', () => {
  it('freePortsOf liệt kê cổng còn trống', () => {
    const topo = flatNetwork()
    expect(freePortsOf(topo, 'sw-1')).toEqual(['p3', 'p4'])
    expect(freePortsOf(topo, 'pc-a')).toEqual([])
    expect(freePortsOf(topo, 'khong-co')).toEqual([])
  })

  it('nối thêm dây thì danh sách cổng trống ngắn lại', () => {
    let session = startLab(flatNetwork(), ALLOW_EVERYTHING)
    session = applyLabAction(session, { kind: 'add-device', device: newSwitch('sw-2') })
    session = applyLabAction(session, {
      kind: 'add-link',
      link: { id: 'nl', a: { deviceId: 'sw-1', portId: 'p3' }, b: { deviceId: 'sw-2', portId: 'p1' } },
    })
    expect(freePortsOf(session.present, 'sw-1')).toEqual(['p4'])
    expect(freePortsOf(session.present, 'sw-2')).toEqual(['p2'])
  })
})

describe('MAC trong fixture giữ nguyên định danh', () => {
  it('các MAC mẫu là địa chỉ hợp lệ và không trùng nhau', () => {
    const macs = Object.values(MAC)
    expect(new Set(macs).size).toBe(macs.length)
  })
})

describe('thao tác trunk — quyền và tính nhất quán dữ liệu (Module 14)', () => {
  const trunkAction = (portId: string): LabAction => ({
    kind: 'set-switch-port-mode',
    deviceId: 'sw-1',
    portId,
    mode: 'trunk',
  })

  it('đề không xin quyền setTrunk thì không đổi được vai cổng', () => {
    // Quyền phải xin TƯỜNG MINH: mọi đề lab viết trước Module 14 không
    // khai setTrunk, và chúng phải giữ nguyên nghĩa cũ.
    const session = startLab(trunkMissing(), ONLY_VLAN_ALLOWANCE)
    expect(canApplyLabAction(session, trunkAction('p4'))).toBe('not-allowed')
  })

  it('có quyền thì đổi được access → trunk', () => {
    const session = startLab(trunkMissing(), ONLY_TRUNK_ALLOWANCE)
    expect(canApplyLabAction(session, trunkAction('p4'))).toBeNull()
    const next = applyLabAction(session, trunkAction('p4'))
    const sw = next.present.devices.find((d) => d.id === 'sw-1')
    expect(sw?.kind === 'switch' && sw.ports.find((p) => p.id === 'p4')?.mode).toBe('trunk')
  })

  it('khai allowed/native cho cổng còn là ACCESS bị từ chối — đổi vai trước đã', () => {
    const session = startLab(trunkMissing(), ONLY_TRUNK_ALLOWANCE)
    expect(
      canApplyLabAction(session, { kind: 'set-trunk-allowed', deviceId: 'sw-1', portId: 'p1', vlans: [10] }),
    ).toBe('wrong-device-kind')
  })

  it('allowed rỗng bị từ chối: trunk câm là gõ nhầm, không phải ý đồ', () => {
    const session = startLab(trunkHealthy(), ONLY_TRUNK_ALLOWANCE)
    expect(
      canApplyLabAction(session, { kind: 'set-trunk-allowed', deviceId: 'sw-1', portId: 'p4', vlans: [] }),
    ).toBe('invalid-vlan')
  })

  it('về lại ACCESS thì DỌN sạch trường của trunk (không để dữ liệu tự mâu thuẫn)', () => {
    const session = startLab(trunkHealthy(), ONLY_TRUNK_ALLOWANCE)
    const next = applyLabAction(session, {
      kind: 'set-switch-port-mode',
      deviceId: 'sw-1',
      portId: 'p4',
      mode: 'access',
    })
    const sw = next.present.devices.find((d) => d.id === 'sw-1')
    const port = sw?.kind === 'switch' ? sw.ports.find((p) => p.id === 'p4') : undefined
    expect(port?.allowedVlans).toBeUndefined()
    expect(port?.nativeVlan).toBeUndefined()
    expect(validateTopology(next.present)).toEqual([])
  })

  it('mọi thao tác trunk đều UNDO được như mọi thao tác khác', () => {
    const session = startLab(trunkMissing(), ONLY_TRUNK_ALLOWANCE)
    const next = applyLabAction(session, trunkAction('p4'))
    const back = undoLab(next)
    const sw = back.present.devices.find((d) => d.id === 'sw-1')
    expect(sw?.kind === 'switch' && sw.ports.find((p) => p.id === 'p4')?.mode).toBeUndefined()
  })
})

describe('thao tác STP — quyền và phân loại thay đổi (Module 15)', () => {
  it('đề không xin quyền setStp thì không bật được STP', () => {
    const session = startLab(ringOfSwitches(false), ONLY_VLAN_ALLOWANCE)
    expect(canApplyLabAction(session, { kind: 'set-stp', enabled: true })).toBe('not-allowed')
  })

  it('có quyền thì bật được, và bật là mạng vòng hết bão', () => {
    const session = startLab(ringOfSwitches(false), ONLY_STP_ALLOWANCE)
    const next = applyLabAction(session, { kind: 'set-stp', enabled: true })
    expect(next.present.stpEnabled).toBe(true)
  })

  it('priority phải là bội của 4096 như thiết bị thật', () => {
    const session = startLab(ringOfSwitches(true), ONLY_STP_ALLOWANCE)
    expect(canApplyLabAction(session, { kind: 'set-bridge-priority', deviceId: 'sw-1', priority: 100 })).toBe(
      'invalid-priority',
    )
    expect(canApplyLabAction(session, { kind: 'set-bridge-priority', deviceId: 'sw-1', priority: 8192 })).toBeNull()
  })

  it('classifyDiff gọi đúng tên nhóm thay đổi: trunk và stp là hai quyền RIÊNG', () => {
    // Đề "sửa VLAN" không được ngầm cho phép dựng trunk hay bật STP —
    // đó là hai bài học khác nhau, hai bộ quyền khác nhau.
    expect(classifyDiff(ringOfSwitches(false), ringOfSwitches(true))).toEqual(['stp'])
    expect(classifyDiff(trunkMissing(), trunkHealthy())).toEqual(['trunk'])
    expect(allowanceViolations(ONLY_VLAN_ALLOWANCE, ['trunk', 'stp'])).toEqual(['trunk', 'stp'])
    expect(allowanceViolations(ONLY_TRUNK_ALLOWANCE, ['trunk'])).toEqual([])
  })
})
