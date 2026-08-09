// CLI thiết bị — khối 13.2 (cấu hình + chấm).
//
// Bốn lời hứa được khóa ở đây:
//   1. Lệnh cấu hình sửa THẲNG sơ đồ sống: gõ xong thì `show` thấy ngay,
//      mô phỏng ping cũng đổi theo ngay.
//   2. Luật chế độ và luật vai cổng có thật — gõ đúng lệnh sai chỗ thì
//      máy từ chối bằng giọng máy, không lặng lẽ nhận.
//   3. `shutdown` là trạng thái QUẢN TRỊ khác hẳn "chưa cắm dây", và cả
//      ba nơi (mô phỏng, bảng show, cây STP) đều phải nói cùng một chuyện.
//   4. `gradeCli` chấm HIỆU ỨNG: gõ lệnh hay bấm chọn trên mặt bàn đều
//      được công nhận, miễn sơ đồ cuối cùng làm được việc đề bài đòi.

import { describe, expect, it } from 'vitest'
import {
  ACCESS_MODE_REJECT,
  INVALID_INPUT,
  cliPrompt,
  gradeCli,
  initialCliState,
  isCliSolved,
  moveCliConsole,
  runCliLine,
  runCliScript,
  runCliSolution,
  type CliState,
} from './index'
import { applyTopologyChange } from '../lab/session'
import { diagnose } from '../lab/gradeLab'
import { simulatePing } from '../lab/simulate'
import { computeStp, isPortBlocked } from '../lab/stp'
import { findDevice } from '../lab/topology'
import { ringOfSwitches, trunkMissing, trunkNativeMismatch, routedNetwork, twoRouterOspf } from '../../../tests/fixtures/labFixture'
import { routerPortByCli, routerWithDownPort, trunkByCli, vlanDatabaseByCli } from '../../../tests/fixtures/cliFixture'

/** Gõ một chuỗi lệnh, trả state cuối + kết quả lệnh cuối. */
function type(start: CliState, ...lines: string[]) {
  const run = runCliScript(start, lines)
  const last = run.results.at(-1)
  if (last === undefined) throw new Error('type() cần ít nhất một dòng lệnh')
  return { state: run.state, last, text: last.lines.join('\n') }
}

const onSwitch1 = () => initialCliState(trunkMissing(), 'sw-1')
const inConfigIf = (portId: string) =>
  type(onSwitch1(), 'enable', 'configure terminal', `interface ${portId}`).state

function switchPort(state: CliState, deviceId: string, portId: string) {
  const device = findDevice(state.topology, deviceId)
  if (device === null || device.kind !== 'switch') throw new Error(`${deviceId} không phải switch`)
  return device.ports.find((p) => p.id === portId)
}

describe('luật chế độ giữ nguyên cho nhóm lệnh cấu hình', () => {
  it('lệnh cấu hình cổng ở chế độ privileged bị từ chối', () => {
    const privileged = type(onSwitch1(), 'enable').state
    const { last } = type(privileged, 'switchport mode trunk')
    expect(last.outcome.kind).toBe('error')
    expect(last.lines).toEqual([INVALID_INPUT])
  })

  it('lệnh của chế độ config gõ trong config-if cũng bị từ chối', () => {
    const { last } = type(inConfigIf('p4'), 'vlan 30')
    expect(last.outcome.kind).toBe('error')
  })

  it('rút console sang thiết bị khác thì phải enable lại từ đầu', () => {
    const deep = type(onSwitch1(), 'enable', 'configure terminal').state
    const moved = moveCliConsole(deep, 'sw-2')
    expect(moved.mode).toBe('user')
    expect(moved.portId).toBeNull()
    // Sơ đồ thì đi theo — vẫn đang làm việc trên đúng một mạng.
    expect(moved.topology).toBe(deep.topology)
  })
})

describe('trunk 802.1Q bằng lệnh', () => {
  it('khai trunk + allowed + native đổi sơ đồ thật, show thấy ngay', () => {
    const { state } = type(
      inConfigIf('p4'),
      'switchport mode trunk',
      'switchport trunk allowed vlan 10,20',
      'switchport trunk native vlan 99',
    )
    const port = switchPort(state, 'sw-1', 'p4')
    expect(port).toMatchObject({ mode: 'trunk', allowedVlans: [10, 20], nativeVlan: 99 })

    const { text } = type(state, 'end', 'show interfaces trunk')
    expect(text).toContain('p4')
    expect(text).toContain('802.1q')
    expect(text).toContain('10,20')
  })

  it('allowed list nhận cả khoảng và chữ all', () => {
    const withRange = type(inConfigIf('p4'), 'switchport mode trunk', 'switchport trunk allowed vlan 10-12,30').state
    expect(switchPort(withRange, 'sw-1', 'p4')?.allowedVlans).toEqual([10, 11, 12, 30])

    const withAll = type(withRange, 'switchport trunk allowed vlan all').state
    expect(switchPort(withAll, 'sw-1', 'p4')?.allowedVlans).toBeUndefined()
  })

  it('khai allowed/native cho cổng ĐANG LÀ ACCESS bị từ chối bằng lời máy', () => {
    const { last } = type(inConfigIf('p4'), 'switchport trunk allowed vlan 10')
    expect(last.outcome.kind).toBe('error')
    expect(last.lines).toEqual([ACCESS_MODE_REJECT])
    // Và sơ đồ KHÔNG đổi — từ chối là từ chối hẳn.
    expect(switchPort(last.state, 'sw-1', 'p4')?.allowedVlans).toBeUndefined()
  })

  it('quay về access thì DỌN sạch trường của trunk', () => {
    const trunk = type(
      inConfigIf('p4'),
      'switchport mode trunk',
      'switchport trunk allowed vlan 10,20',
      'switchport trunk native vlan 99',
    ).state
    const back = type(trunk, 'switchport mode access').state
    expect(switchPort(back, 'sw-1', 'p4')).toEqual({ id: 'p4', vlan: 1 })
  })

  it('VLAN ngoài dải 1..4094 bị từ chối', () => {
    const { last } = type(inConfigIf('p1'), 'switchport access vlan 5000')
    expect(last.outcome.kind).toBe('error')
    expect(last.lines).toEqual([INVALID_INPUT])
  })
})

describe('VLAN database — lệnh vlan <n>', () => {
  it('VLAN vừa khai có mặt trong show vlan brief dù chưa cổng nào đứng tên', () => {
    const { state } = type(onSwitch1(), 'enable', 'configure terminal', 'vlan 30')
    const { text } = type(state, 'end', 'show vlan brief')
    expect(text).toMatch(/30\s+VLAN0030\s+active/)
  })

  it('khai lại VLAN đã có không đẻ thêm dòng nào', () => {
    const { state } = type(onSwitch1(), 'enable', 'configure terminal', 'vlan 30', 'vlan 30')
    const device = findDevice(state.topology, 'sw-1')
    expect(device?.kind === 'switch' ? device.declaredVlans : null).toEqual([30])
  })

  it('running-config in lại lệnh vlan đã khai', () => {
    const { state } = type(onSwitch1(), 'enable', 'configure terminal', 'vlan 30', 'end')
    expect(type(state, 'show running-config').text).toContain('vlan 30')
  })

  it('switch mới là nơi khai VLAN — trên router thì lệnh bị từ chối', () => {
    const router = initialCliState(routedNetwork(), 'r-1')
    const { last } = type(router, 'enable', 'configure terminal', 'vlan 30')
    expect(last.outcome.kind).toBe('error')
  })
})

describe('router: địa chỉ cổng và tuyến tĩnh', () => {
  const onRouter = () => initialCliState(routedNetwork(), 'r-1')

  it('ip address đổi địa chỉ cổng và show ip route thấy mạng nối trực tiếp', () => {
    const { state } = type(onRouter(), 'enable', 'configure terminal', 'interface g1', 'ip address 10.9.0.1 255.255.255.0')
    const { text } = type(state, 'end', 'show ip route')
    expect(text).toContain('C    10.9.0.0/24 is directly connected, g1')
  })

  it('mask có bit không liền bị từ chối', () => {
    const { last } = type(onRouter(), 'enable', 'configure terminal', 'interface g1', 'ip address 10.9.0.1 255.0.255.0')
    expect(last.outcome.kind).toBe('error')
    expect(last.lines).toEqual([INVALID_INPUT])
  })

  it('ip address trên switch bị từ chối (switch ở đây trong suốt tầng 2)', () => {
    const { last } = type(inConfigIf('p1'), 'ip address 10.9.0.1 255.255.255.0')
    expect(last.outcome.kind).toBe('error')
  })

  it('ip route thêm tuyến; gõ lại cùng đích thì ĐÈ chứ không đẻ hai dòng', () => {
    const first = type(onRouter(), 'enable', 'configure terminal', 'ip route 172.16.0.0 255.255.0.0 10.0.0.9').state
    const second = type(first, 'ip route 172.16.0.0 255.255.0.0 10.0.0.8').state
    const device = findDevice(second.topology, 'r-1')
    expect(device?.kind === 'router' ? device.staticRoutes : []).toEqual([
      { destination: '172.16.0.0', prefix: 16, nextHop: '10.0.0.8' },
    ])
    expect(type(second, 'end', 'show ip route').text).toContain('S    172.16.0.0/16 [1/0] via 10.0.0.8')
  })

  it('ip route thiếu tham số nói "Incomplete command"', () => {
    const { last } = type(onRouter(), 'enable', 'configure terminal', 'ip route 172.16.0.0 255.255.0.0')
    expect(last.lines).toEqual(['% Incomplete command.'])
  })
})

describe('shutdown / no shutdown — trạng thái quản trị, không phải rớt dây', () => {
  it('cổng tắt làm ping chết với đúng mã bệnh riêng của nó', () => {
    const shut = type(
      initialCliState(routedNetwork(), 'r-1'),
      'enable',
      'configure terminal',
      'interface g1',
      'shutdown',
    ).state
    const result = simulatePing(shut.topology, { from: 'pc-a', to: 'pc-b' })
    expect(result.failure).toBe('port-shutdown')
    expect(diagnose(shut.topology)).toContain('port-shutdown')
  })

  it('bảng show phân biệt "administratively down" với "down"', () => {
    const state = initialCliState(routerWithDownPort(), 'r-1')
    const { text } = type(state, 'enable', 'show ip interface brief')
    expect(text).toContain('administratively down')
    expect(type(state, 'enable', 'show running-config').text).toContain(' shutdown')
  })

  it('no shutdown bật lại cổng và xóa hẳn dấu vết, ping thông trở lại', () => {
    const fixed = type(
      initialCliState(routerWithDownPort(), 'r-1'),
      'enable',
      'configure terminal',
      'interface g1',
      'ip address 10.0.0.1 255.255.255.0',
      'no shutdown',
    ).state
    const device = findDevice(fixed.topology, 'r-1')
    const port = device?.kind === 'router' ? device.ports.find((p) => p.id === 'g1') : null
    expect(port).toEqual({ id: 'g1', mac: 'AA:BB:CC:00:00:12', ipConfig: { ip: '10.0.0.1', prefix: 24 } })
    expect(simulatePing(fixed.topology, { from: 'pc-a', to: 'pc-b' }).replied).toBe(true)
  })

  it('tắt một cổng trong mạng vòng thì cây STP tính lại, cổng dự phòng mở ra', () => {
    const ring = initialCliState(ringOfSwitches(true), 'sw-1')
    const blockedBefore = computeStp(ring.topology).blocked
    expect(blockedBefore.length).toBe(1)

    const shut = type(ring, 'enable', 'configure terminal', 'interface p2', 'shutdown').state
    const after = computeStp(shut.topology)
    // Dây vừa tắt biến khỏi cây, nên không còn dây thừa nào phải chặn.
    expect(after.blocked).toEqual([])
    expect(isPortBlocked(after, blockedBefore[0]!)).toBe(false)
  })
})

describe('gradeCli — chấm hiệu ứng, không so chuỗi lệnh', () => {
  it('đề trunk: đề bài chưa đạt sẵn, lời giải mẫu chạy sạch và đạt trọn', () => {
    const spec = trunkByCli()
    expect(isCliSolved(spec, initialCliState(spec.initial, spec.deviceId))).toBe(false)

    const run = runCliSolution(spec)
    expect(run.rejected).toEqual([])
    const evaluation = gradeCli(spec, run.state)
    expect(evaluation.goals.every((g) => g.met)).toBe(true)
    expect(evaluation.passed).toBe(true)
  })

  it('dựng trunk bằng ĐƯỜNG BẤM CHỌN cũng được công nhận y hệt gõ lệnh', () => {
    const spec = trunkByCli()
    let topology = spec.initial
    for (const deviceId of ['sw-1', 'sw-2']) {
      topology = applyTopologyChange(topology, { kind: 'set-switch-port-mode', deviceId, portId: 'p4', mode: 'trunk' })
      topology = applyTopologyChange(topology, {
        kind: 'set-trunk-allowed',
        deviceId,
        portId: 'p4',
        vlans: [10, 20],
      })
    }
    expect(isCliSolved(spec, { ...initialCliState(topology, 'sw-1') })).toBe(true)
  })

  it('cho MỌI VLAN qua thì mục tiêu "phải chặn" không đạt', () => {
    const base = trunkByCli()
    const spec = {
      ...base,
      goals: [
        ...base.goals,
        { kind: 'trunk-blocks' as const, deviceId: 'sw-1', portId: 'p4', vlans: [99] },
      ],
    }
    const openAll = runCliSolution({
      ...spec,
      solution: [
        {
          deviceId: 'sw-1',
          lines: ['enable', 'configure terminal', 'interface p4', 'switchport mode trunk', 'end'],
        },
        {
          deviceId: 'sw-2',
          lines: ['enable', 'configure terminal', 'interface p4', 'switchport mode trunk', 'end'],
        },
      ],
    })
    const evaluation = gradeCli(spec, openAll.state)
    expect(evaluation.goals.find((g) => g.goal.kind === 'trunk-blocks')?.met).toBe(false)
    expect(evaluation.passed).toBe(false)

    // Còn lời giải có allowed list thì vế chặn tự đạt.
    expect(gradeCli(spec, runCliSolution(spec).state).passed).toBe(true)
  })

  it('đề router: quên no shutdown thì mục tiêu ping hỏng, dù địa chỉ đã đúng', () => {
    const spec = routerPortByCli()
    const forgot = runCliSolution({
      ...spec,
      solution: [
        {
          deviceId: 'r-1',
          lines: ['enable', 'configure terminal', 'interface g1', 'ip address 10.0.0.1 255.255.255.0', 'end'],
        },
      ],
    })
    const evaluation = gradeCli(spec, forgot.state)
    expect(evaluation.goals.find((g) => g.goal.kind === 'port-ip')?.met).toBe(true)
    expect(evaluation.goals.find((g) => g.goal.kind === 'port-up')?.met).toBe(false)
    expect(evaluation.goals.find((g) => g.goal.kind === 'behavior')?.met).toBe(false)

    expect(gradeCli(spec, runCliSolution(spec).state).passed).toBe(true)
  })

  it('mục tiêu DẤU VẾT chỉ đạt khi đã tra đúng bảng trên đúng thiết bị', () => {
    const spec = vlanDatabaseByCli()
    const withoutShow = runCliSolution({
      ...spec,
      solution: [
        {
          deviceId: 'sw-1',
          lines: ['enable', 'configure terminal', 'vlan 30', 'interface p3', 'switchport access vlan 30', 'end'],
        },
      ],
    })
    const evaluation = gradeCli(spec, withoutShow.state)
    expect(evaluation.goals.find((g) => g.goal.kind === 'viewed')?.met).toBe(false)

    // Tra đúng bảng nhưng trên switch KHÁC thì vẫn chưa tính.
    const wrongDevice = runCliLine(moveCliConsole(withoutShow.state, 'sw-2'), 'show vlan brief')
    expect(gradeCli(spec, wrongDevice.state).passed).toBe(false)

    expect(gradeCli(spec, runCliSolution(spec).state).passed).toBe(true)
  })
})

describe('ACL bằng lệnh (khối 16.1)', () => {
  const onRouter = () => initialCliState(routedNetwork(), 'r-1')

  it('viết luật rồi áp lên cổng: ping đang thông thành bị chặn', () => {
    const { state } = type(
      onRouter(),
      'enable',
      'configure terminal',
      'access-list 101 deny icmp host 192.168.1.10 any',
      'access-list 101 permit ip any any',
      'interface g0',
      'ip access-group 101 in',
      'end',
    )
    const result = simulatePing(state.topology, { from: 'pc-a', to: 'pc-b' })
    expect(result.failure).toBe('acl-denied')
    expect(result.deniedBy).toMatchObject({ listNumber: 101, seq: 10, direction: 'in' })
  })

  it('số dòng tự sinh theo bước 10, và luật mới luôn xuống CUỐI danh sách', () => {
    const { state } = type(
      onRouter(),
      'enable',
      'configure terminal',
      'access-list 101 permit ip any any',
      'access-list 101 deny icmp host 192.168.1.10 any',
    )
    const device = findDevice(state.topology, 'r-1')
    const rules = device?.kind === 'router' ? (device.accessLists?.[0]?.rules ?? []) : []
    expect(rules.map((r) => [r.seq, r.action])).toEqual([
      [10, 'permit'],
      [20, 'deny'],
    ])
    // Luật rộng viết trước nên luật cấm phía sau không bao giờ được hỏi tới.
    expect(simulatePing(state.topology, { from: 'pc-a', to: 'pc-b' }).replied).toBe(true)
  })

  it('show access-lists in số đếm của từng dòng sau khi có gói đi qua', () => {
    const configured = type(
      onRouter(),
      'enable',
      'configure terminal',
      'access-list 101 deny icmp host 192.168.1.10 any',
      'interface g0',
      'ip access-group 101 in',
      'end',
    ).state
    const run = simulatePing(configured.topology, { from: 'pc-a', to: 'pc-b' })
    const withHits = { ...configured, net: run.state }
    const text = type(withHits, 'show access-lists').text
    expect(text).toContain('Extended IP access list 101')
    expect(text).toMatch(/10 deny icmp host 192\.168\.1\.10 any \(1 match\)/)
  })

  it('cú pháp sai hoặc sai chế độ đều bị từ chối bằng giọng máy', () => {
    const inConfig = type(onRouter(), 'enable', 'configure terminal').state
    expect(type(inConfig, 'access-list 101 permit icmp any').last.outcome.kind).toBe('error')
    expect(type(inConfig, 'access-list 101 block icmp any any').last.outcome.kind).toBe('error')
    // eq chỉ đi với tcp/udp — gắn vào icmp là lỗi cú pháp.
    expect(type(inConfig, 'access-list 101 deny icmp any any eq 80').last.outcome.kind).toBe('error')
    // ip access-group là lệnh của cổng, gõ ở (config)# thì máy từ chối.
    expect(type(inConfig, 'ip access-group 101 in').last.outcome.kind).toBe('error')
  })

  it('số ACL chuẩn 1-99 bị từ chối — mô hình chỉ có cú pháp extended', () => {
    // IOS thật: 1-99 là ACL chuẩn (chỉ nguồn). Nhận số đó với cú pháp
    // extended là dạy một cấu hình không tồn tại (biên bản trung cấp).
    const inConfig = type(onRouter(), 'enable', 'configure terminal').state
    expect(type(inConfig, 'access-list 10 permit ip any any').last.outcome.kind).toBe('error')
    expect(type(inConfig, 'access-list 99 deny icmp any any').last.outcome.kind).toBe('error')
    expect(type(inConfig, 'access-list 100 permit ip any any').last.outcome.kind).toBe('ok')
  })

  it('running-config in lại cả danh sách lẫn dòng áp lên cổng', () => {
    const { state } = type(
      onRouter(),
      'enable',
      'configure terminal',
      'access-list 101 permit icmp any any',
      'interface g0',
      'ip access-group 101 in',
      'end',
    )
    const text = type(state, 'show running-config').text
    expect(text).toContain(' ip access-group 101 in')
    expect(text).toContain('access-list 101 permit icmp any any')
  })
})

describe('OSPF bằng lệnh (khối 16.2) — chế độ thứ năm', () => {
  const onR1 = () => initialCliState(twoRouterOspf({ ospfOnR2: false }), 'r-1')

  it('router ospf mở chế độ (config-router); network chỉ gõ được trong đó', () => {
    const inConfig = type(onR1(), 'enable', 'configure terminal').state
    // Gõ network khi chưa vào tiến trình: máy từ chối.
    expect(type(inConfig, 'network 10.0.12.0 0.0.0.255 area 0').last.outcome.kind).toBe('error')

    const inRouter = type(inConfig, 'router ospf 1').state
    expect(cliPrompt(inRouter)).toBe('Router-1(config-router)#')
    expect(type(inRouter, 'network 10.0.12.0 0.0.0.255 area 0').last.outcome.kind).toBe('ok')
  })

  it('exit lùi từ config-router về config, end nhảy thẳng về privileged', () => {
    const inRouter = type(onR1(), 'enable', 'configure terminal', 'router ospf 1').state
    expect(cliPrompt(type(inRouter, 'exit').state)).toBe('Router-1(config)#')
    expect(cliPrompt(type(inRouter, 'end').state)).toBe('Router-1#')
  })

  it('chấm sống KHÔNG sập ở khe giữa router ospf 1 và câu network đầu tiên (bug capstone)', () => {
    // Bảng mục tiêu chấm sống sau TỪNG dòng lệnh. Ngay sau `router ospf
    // 1`, topology có ospf.networks rỗng — từng bị coi là lỗi cấu trúc
    // khiến runLabGoals ném lỗi và màn console trắng xóa giữa bài thi.
    const inRouter = type(onR1(), 'enable', 'configure terminal', 'router ospf 1').state
    const spec = {
      initial: twoRouterOspf({ ospfOnR2: false }),
      deviceId: 'r-1' as const,
      goals: [
        { kind: 'behavior' as const, goal: { kind: 'ping' as const, from: 'pc-a', to: 'pc-b', expect: 'reach' as const } },
      ],
      solution: [{ deviceId: 'r-1', lines: ['enable'] }],
    }
    expect(() => gradeCli(spec, inRouter)).not.toThrow()
    expect(gradeCli(spec, inRouter).passed).toBe(false)
  })

  it('area khác 0 nằm ngoài phạm vi đóng băng nên bị từ chối', () => {
    const inRouter = type(onR1(), 'enable', 'configure terminal', 'router ospf 1').state
    expect(type(inRouter, 'network 10.0.12.0 0.0.0.255 area 1').last.outcome.kind).toBe('error')
  })

  it('bật OSPF ở đầu còn lại là láng giềng lên FULL và ping xuyên hai LAN chạy', () => {
    const start = initialCliState(twoRouterOspf({ ospfOnR2: false }), 'r-2')
    const { state } = type(
      start,
      'enable',
      'configure terminal',
      'router ospf 1',
      'network 192.168.2.0 0.0.0.255 area 0',
      'network 10.0.12.0 0.0.0.255 area 0',
      'end',
    )
    expect(type(state, 'show ip ospf neighbor').text).toContain('FULL')
    expect(simulatePing(state.topology, { from: 'pc-a', to: 'pc-b' }).replied).toBe(true)
  })

  it('bảng láng giềng nói rõ LÝ DO khi chưa lên, và show ip route in mã O', () => {
    const chuaLen = initialCliState(twoRouterOspf({ declareOnR2: false }), 'r-1')
    expect(type(chuaLen, 'show ip ospf neighbor').text).toContain('network-not-declared')

    const daLen = initialCliState(twoRouterOspf({}), 'r-1')
    const text = type(daLen, 'show ip route').text
    expect(text).toContain('Codes: C - connected, S - static, O - OSPF')
    expect(text).toContain('O    192.168.2.0/24 [110/1] via 10.0.12.2')
  })

  it('running-config in lại tiến trình và các câu network', () => {
    const { state } = type(
      onR1(),
      'enable',
      'configure terminal',
      'router ospf 1',
      'network 10.0.99.0 0.0.0.255 area 0',
      'end',
    )
    const text = type(state, 'show running-config').text
    expect(text).toContain('router ospf 1')
    expect(text).toContain(' network 10.0.99.0 0.0.0.255 area 0')
  })
})

describe('goal native-match: đo HAI ĐẦU KHỚP, không đóng đinh phía phải sửa', () => {
  // Biên bản hội đồng trung cấp (ghế Đo lường): goal native-vlan một phía
  // từng chấm rớt cách sửa hợp lệ mà chính explain của đề công nhận.
  const spec = () => ({
    initial: trunkNativeMismatch(),
    deviceId: 'sw-2',
    goals: [
      {
        kind: 'native-match' as const,
        a: { deviceId: 'sw-1', portId: 'p4' },
        b: { deviceId: 'sw-2', portId: 'p4' },
      },
    ],
    solution: [],
  })

  it('trạng thái đầu (native lệch 1 ↔ 99) chưa đạt', () => {
    expect(isCliSolved(spec(), initialCliState(trunkNativeMismatch(), 'sw-2'))).toBe(false)
  })

  it('đưa sw-2 về native 1 → đạt', () => {
    const { state } = type(
      initialCliState(trunkNativeMismatch(), 'sw-2'),
      'enable', 'configure terminal', 'interface p4', 'switchport trunk native vlan 1', 'end',
    )
    expect(isCliSolved(spec(), state)).toBe(true)
  })

  it('đưa sw-1 lên native 99 CŨNG đạt — cách sửa hợp lệ ở đầu kia không bị chấm rớt', () => {
    const { state } = type(
      initialCliState(trunkNativeMismatch(), 'sw-1'),
      'enable', 'configure terminal', 'interface p4', 'switchport trunk native vlan 99', 'end',
    )
    expect(isCliSolved(spec(), state)).toBe(true)
  })
})
