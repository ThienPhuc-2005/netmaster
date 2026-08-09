// CLI thiết bị — khối 13.1 (xem).
//
// Ba lời hứa được khóa ở đây:
//   1. Thế giới của CLI là CHÍNH sơ đồ phòng lab — sửa sơ đồ bằng tay
//      thì `show` thấy ngay, không có bản sao nào phải đồng bộ.
//   2. Luật CHẾ ĐỘ có thật: gõ đúng lệnh sai chỗ thì máy từ chối bằng
//      đúng câu tiếng Anh của thiết bị thật.
//   3. Lệnh ngoài phạm vi đóng băng trả outcome rỗng cho UI kể tiếng
//      Việt — engine không đoán bừa, không tự chế lệnh.

import { describe, expect, it } from 'vitest'
import { cliPrompt, initialCliState, runCliLine, INVALID_INPUT } from './index'
import { simulatePing } from '../lab/simulate'
import {
  ringOfSwitches,
  routedNetwork,
  trunkHealthy,
  trunkMissing,
} from '../../../tests/fixtures/labFixture'
import type { CliState } from './index'

/** Gõ một chuỗi lệnh liên tiếp, trả kết quả lệnh cuối + state cuối. */
function type(start: CliState, ...inputs: string[]) {
  let state = start
  let last = runCliLine(state, '')
  for (const input of inputs) {
    last = runCliLine(state, input)
    state = last.state
  }
  return { last, state, text: last.lines.join('\n') }
}

const onSwitch1 = () => initialCliState(trunkHealthy(), 'sw-1')

describe('chế độ — dấu nhắc và luật đi vào đi ra', () => {
  it('dấu nhắc đổi theo chế độ, đúng hình dạng IOS', () => {
    const s0 = onSwitch1()
    expect(cliPrompt(s0)).toBe('Switch-1>')
    const s1 = type(s0, 'enable').state
    expect(cliPrompt(s1)).toBe('Switch-1#')
    const s2 = type(s1, 'configure terminal').state
    expect(cliPrompt(s2)).toBe('Switch-1(config)#')
    const s3 = type(s2, 'interface p4').state
    expect(cliPrompt(s3)).toBe('Switch-1(config-if)#')
  })

  it('vào cấu hình khi chưa enable là bị từ chối — luật chế độ có thật', () => {
    const { last } = type(onSwitch1(), 'configure terminal')
    expect(last.outcome.kind).toBe('error')
    expect(last.lines).toEqual([INVALID_INPUT])
  })

  it('exit lùi ĐÚNG MỘT bậc, end nhảy thẳng về privileged', () => {
    const deep = type(onSwitch1(), 'enable', 'configure terminal', 'interface p4').state
    expect(cliPrompt(type(deep, 'exit').state)).toBe('Switch-1(config)#')
    expect(cliPrompt(type(deep, 'end').state)).toBe('Switch-1#')
  })

  it('cổng ma bị nói thẳng, không im lặng cho cấu hình vào hư không', () => {
    const { last } = type(onSwitch1(), 'enable', 'configure terminal', 'interface p99')
    expect(last.outcome.kind).toBe('error')
    expect(last.lines.join('')).toContain('Invalid interface')
  })

  it('lệnh ngoài phạm vi: outcome rỗng cho UI kể tiếng Việt', () => {
    const { last } = type(onSwitch1(), 'enable', 'reload')
    expect(last.outcome).toMatchObject({ kind: 'unknown', input: 'reload' })
    expect(last.lines).toEqual([])
  })

  it('dấu ? là lời xin trợ giúp, không phải lệnh lạ', () => {
    expect(type(onSwitch1(), '?').last.outcome.kind).toBe('help')
  })
})

describe('show — đọc thẳng từ sơ đồ phòng lab', () => {
  it('show vlan brief kê đúng cổng access theo từng VLAN', () => {
    const { text } = type(onSwitch1(), 'show vlan brief')
    expect(text).toContain('VLAN')
    expect(text).toMatch(/10\s+VLAN0010\s+active\s+p1, p3/)
    expect(text).toMatch(/20\s+VLAN0020\s+active\s+p2/)
  })

  it('show vlan brief KHÔNG kê cổng trunk — trunk không đứng tên xóm nào', () => {
    const { text } = type(onSwitch1(), 'show vlan brief')
    // p4 là trunk trong fixture; nó không được xuất hiện ở cột Ports.
    expect(text).not.toContain('p4')
  })

  it('show interfaces trunk nói đủ ba thứ: native, allowed, đang chở VLAN nào', () => {
    const { text } = type(onSwitch1(), 'show interfaces trunk')
    expect(text).toContain('802.1q')
    expect(text).toMatch(/p4\s+on\s+802\.1q\s+trunking\s+1/)
    expect(text).toContain('10,20')
  })

  it('chưa khai trunk thì bảng trunk RỖNG — chính nó là câu trả lời', () => {
    // "Sao VLAN 10 không sang được?" → mở bảng ra thấy không có dòng nào.
    const { text } = type(initialCliState(trunkMissing(), 'sw-1'), 'show interfaces trunk')
    expect(text).not.toContain('802.1q')
  })

  it('show mac address-table đọc đúng bảng học được sau lượt Gửi thử', () => {
    // Thế giới là chính sơ đồ lab, nên trạng thái học được của lab dùng
    // lại nguyên vẹn — không có bảng MAC thứ hai nào cả.
    const topo = trunkHealthy()
    const run = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    const state = initialCliState(topo, 'sw-1', run.state)
    const { text } = type(state, 'show mac address-table')
    expect(text).toContain('Mac Address Table')
    expect(text).toContain('AA:BB:CC:00:00:01')
    expect(text).toMatch(/Total Mac Addresses for this criterion: [1-9]/)
  })

  it('show ip route trên router: tuyến connected và tuyến tĩnh phân biệt bằng mã C/S', () => {
    const { text } = type(initialCliState(routedNetwork(), 'r-1'), 'show ip route')
    expect(text).toContain('C    192.168.1.0/24 is directly connected, g0')
    expect(text).toContain('Codes: C - connected, S - static')
  })

  it('show ip route trên SWITCH bị từ chối — switch không định tuyến', () => {
    const { last } = type(onSwitch1(), 'show ip route')
    expect(last.lines).toEqual([INVALID_INPUT])
  })

  it('show ip interface brief kê trạng thái dây của từng cổng', () => {
    const { text } = type(initialCliState(routedNetwork(), 'r-1'), 'show ip interface brief')
    expect(text).toContain('Interface')
    expect(text).toMatch(/g0\s+192\.168\.1\.1\s+YES manual up\s+up/)
  })

  it('show spanning-tree: tắt STP thì nói thẳng, bật thì chỉ rõ cổng nào BLK', () => {
    const off = type(initialCliState(ringOfSwitches(false), 'sw-1'), 'show spanning-tree')
    expect(off.text).toContain('not running')

    const on = type(initialCliState(ringOfSwitches(true), 'sw-1'), 'show spanning-tree')
    expect(on.text).toContain('Spanning tree enabled protocol ieee')
    // sw-2 là root (priority 4096), nên sw-1 không phải root.
    expect(on.text).toContain('Root bridge: Switch-2')

    const rootView = type(initialCliState(ringOfSwitches(true), 'sw-2'), 'show spanning-tree')
    expect(rootView.text).toContain('This bridge is the root')
  })

  it('cổng bị chặn hiện Sts BLK — đúng chỗ người học đi tìm', () => {
    const topo = ringOfSwitches(true)
    for (const id of ['sw-1', 'sw-2', 'sw-3']) {
      const { text } = type(initialCliState(topo, id), 'show spanning-tree')
      if (text.includes('BLK')) {
        expect(text).toContain('Altn')
        return
      }
    }
    throw new Error('mạng vòng bật STP mà không switch nào báo cổng BLK')
  })

  it('show running-config cần quyền: chế độ xem thì bị từ chối', () => {
    const { last } = type(onSwitch1(), 'show running-config')
    expect(last.lines).toEqual([INVALID_INPUT])
  })

  it('show running-config dựng lại đúng cấu hình đang chạy', () => {
    const { text } = type(onSwitch1(), 'enable', 'show running-config')
    expect(text).toContain('hostname Switch-1')
    expect(text).toContain('switchport mode trunk')
    expect(text).toContain('switchport trunk allowed vlan 10,20')
    expect(text).toContain('switchport access vlan 10')
    expect(text).toContain('end')
  })

  it('trong chế độ cấu hình thì show bị từ chối (phạm vi không có "do")', () => {
    const { last } = type(onSwitch1(), 'enable', 'configure terminal', 'show vlan brief')
    expect(last.outcome.kind).toBe('error')
  })
})

describe('sửa sơ đồ bằng tay thì show thấy NGAY', () => {
  it('đổi VLAN của cổng trên topology → show vlan brief đổi theo', () => {
    // Đây là lời hứa "một thế giới": không có bản sao nào phải đồng bộ.
    const topo = trunkHealthy()
    const sw = topo.devices.find((d) => d.id === 'sw-1')
    if (sw?.kind === 'switch') {
      const port = sw.ports.find((p) => p.id === 'p1')
      if (port !== undefined) port.vlan = 30
    }
    const { text } = type(initialCliState(topo, 'sw-1'), 'show vlan brief')
    expect(text).toMatch(/30\s+VLAN0030\s+active\s+p1/)
  })
})
