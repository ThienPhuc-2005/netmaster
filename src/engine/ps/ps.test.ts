// Test engine terminal PowerShell (spec Module 12) — chạy trên 4 ĐỀ THẬT
// của fixture (đúng 4 mảng nội dung spec liệt kê), không đề bịa dễ dãi.

import { describe, expect, it } from 'vitest'
import {
  ALL_PS_SPECS,
  WORLD_VAN_PHONG,
  specDocLog,
  specTaoHangLoat,
  specTaoMotUser,
  specTestConnection,
} from '../../../tests/fixtures/psFixture'
import { initialPsState, validatePsWorld } from './world'
import { runPsLine, runPsScript } from './interpret'
import { gradePs, isPsSolved } from './gradePs'
import { parsePsSpec } from './psSchema'

const run = (...inputs: string[]) => runPsScript(WORLD_VAN_PHONG, inputs)
const lastOf = (...inputs: string[]) => run(...inputs).results.at(-1)!

describe('thế giới mẫu — kiểm cấu trúc', () => {
  it('mọi đề fixture sạch lỗi cấu trúc và qua schema', () => {
    for (const make of ALL_PS_SPECS) {
      const spec = make()
      expect(validatePsWorld(spec.world)).toEqual([])
      expect(() => parsePsSpec(spec)).not.toThrow()
    }
  })

  it('trùng samAccountName / OU ma là lỗi soạn bài', () => {
    const broken = specTaoMotUser().world
    broken.ad!.users.push({ name: 'X', sam: 'NVAN', ou: 'KeToan', enabled: true })
    expect(validatePsWorld(broken).map((p) => p.code)).toContain('duplicate-sam')

    const ghost = specTaoMotUser().world
    ghost.ad!.users.push({ name: 'Y', sam: 'yyy', ou: 'PhongMa', enabled: true })
    expect(validatePsWorld(ghost).map((p) => p.code)).toContain('user-ou-unknown')
  })
})

describe('cmdlet mạng', () => {
  it('Get-NetIPAddress đọc thẳng card mạng của máy', () => {
    const { lines } = lastOf('Get-NetIPAddress')
    expect(lines.join('\n')).toContain('IPAddress         : 192.168.20.5')
    expect(lines.join('\n')).toContain('InterfaceAlias    : Ethernet0')
  })

  it('Test-NetConnection: ping máy sống True, máy im lặng False, cổng mở/đóng đúng sự thật', () => {
    expect(lastOf('Test-NetConnection 192.168.20.80').lines.join('\n')).toContain('PingSucceeded          : True')
    expect(lastOf('Test-NetConnection 192.168.20.99').lines.join('\n')).toContain('PingSucceeded          : False')
    expect(lastOf('Test-NetConnection 192.168.20.80 -Port 443').lines.join('\n')).toContain('TcpTestSucceeded : True')
    expect(lastOf('Test-NetConnection 192.168.20.40 -Port 443').lines.join('\n')).toContain('TcpTestSucceeded : False')
  })

  it('gõ TÊN thay IP vẫn chạy (phân giải qua thế giới); tên lạ báo lỗi phân giải', () => {
    expect(lastOf('Test-NetConnection web.noibo.vn -Port 443').lines.join('\n')).toContain('RemoteAddress    : 192.168.20.80')
    const bad = lastOf('Test-NetConnection khongco.noibo.vn')
    expect(bad.outcome.kind).toBe('error')
    expect(bad.lines.join('\n')).toContain('Name resolution')
  })

  it('hoa thường tùy ý, nháy đơn nháy kép như nhau', () => {
    expect(lastOf('test-netconnection "192.168.20.80" -port 443').outcome.kind).toBe('ok')
    expect(lastOf("TEST-NETCONNECTION '192.168.20.80'").outcome.kind).toBe('ok')
  })
})

describe('AD: tra cứu và tạo user', () => {
  it('Get-ADUser -Identity tìm đúng người; người lạ báo lỗi như thật', () => {
    expect(lastOf('Get-ADUser -Identity nvan').lines.join('\n')).toContain('SamAccountName    : nvan')
    const missing = lastOf('Get-ADUser -Identity khongco')
    expect(missing.outcome.kind).toBe('error')
    expect(missing.lines.join('\n')).toContain("Cannot find an object with identity: 'khongco'")
  })

  it('Get-ADUser -Filter * liệt kê cả miền; -SearchBase khoanh theo OU', () => {
    const all = lastOf('Get-ADUser -Filter *')
    expect(all.lines.join('\n')).toContain('nvan')
    expect(all.lines.join('\n')).toContain('ttbinh')
    const ketoan = lastOf('Get-ADUser -Filter * -SearchBase "OU=KeToan,DC=noibo,DC=vn"')
    expect(ketoan.lines.join('\n')).toContain('nvan')
    expect(ketoan.lines.join('\n')).not.toContain('ttbinh')
  })

  it('New-ADUser tạo user im lặng như thật; Get-ADUser lại mới thấy — và trùng sam bị chặn', () => {
    const created = lastOf(
      'New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn"',
    )
    expect(created.outcome).toMatchObject({ kind: 'ok', createdUsers: 1 })
    expect(created.lines).toEqual([])

    const verify = lastOf(
      'New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn"',
      'Get-ADUser -Identity ltmai',
    )
    expect(verify.lines.join('\n')).toContain('OU=KeToan')

    const dup = lastOf('New-ADUser -Name "Ai Do" -SamAccountName nvan -Path "OU=KeToan,DC=noibo,DC=vn"')
    expect(dup.outcome.kind).toBe('error')
    expect(dup.lines.join('\n')).toContain('already exists')
  })

  it('tài khoản mới sinh ra ĐANG KHÓA — trừ khi khai -Enabled $true', () => {
    // AD thật: New-ADUser không kèm mật khẩu thì account tạo ra bị
    // Disabled. Mô phỏng cho "Enabled: True" là dạy một thói quen sai ở
    // đúng chỗ nguy hiểm nhất — quản trị viên mới tưởng tạo xong là dùng
    // được ngay (hội đồng 07-08, ghế kỹ thuật mạng).
    const created = lastOf(
      'New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn"',
      'Get-ADUser -Identity ltmai',
    )
    expect(created.lines.join('\n')).toContain('Enabled           : False')

    const forced = lastOf(
      'New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn" -Enabled $true',
      'Get-ADUser -Identity ltmai',
    )
    expect(forced.lines.join('\n')).toContain('Enabled           : True')
  })

  it('OU ma trong -Path bị từ chối', () => {
    const bad = lastOf('New-ADUser -Name X -SamAccountName xxx -Path "OU=PhongMa,DC=noibo,DC=vn"')
    expect(bad.outcome.kind).toBe('error')
    expect(bad.lines.join('\n')).toContain('Directory object not found')
  })
})

describe('pipeline một tầng — hàng loạt và đọc log', () => {
  it('Import-Csv | New-ADUser: cả danh sách mọc thành user một nhát', () => {
    const { state, results } = run('Import-Csv nhan-vien-moi.csv | New-ADUser')
    expect(results.at(-1)!.outcome).toMatchObject({ kind: 'ok', createdUsers: 3 })
    const nhansu = state.world.ad!.users.filter((u) => u.ou === 'NhanSu')
    expect(nhansu.map((u) => u.sam)).toEqual(['ttbinh', 'lvcuong', 'ptdung', 'hvem'])
  })

  it('Get-Content | Select-String lọc đúng dòng, ghi dấu vết foundLines', () => {
    const { state, results } = run('Get-Content router.log | Select-String ERROR')
    expect(results.at(-1)!.lines).toHaveLength(1)
    expect(results.at(-1)!.lines[0]).toContain('link down on port 3')
    expect(state.flags.foundLines[0]).toContain('link down')
  })

  it('Select-String đứng một mình cần -Path; có -Path thì kèm tên file trong output', () => {
    const alone = lastOf('Select-String ERROR')
    expect(alone.outcome.kind).toBe('error')
    const withPath = lastOf('Select-String ERROR router.log')
    expect(withPath.lines[0]).toContain('router.log:3:')
  })

  it('quá một dấu ống là lỗi cú pháp có chủ đích (phạm vi đóng băng)', () => {
    const result = lastOf('Get-Content router.log | Select-String ERROR | Select-String port')
    expect(result.outcome.kind).toBe('error')
    expect(result.lines.join('\n')).toContain('Only one pipeline stage')
  })

  it('file không tồn tại báo lỗi như thật', () => {
    expect(lastOf('Get-Content khong-co.log').lines.join('\n')).toContain("Cannot find path 'khong-co.log'")
  })
})

describe('help và lệnh lạ — outcome rỗng lines cho UI kể lời Việt', () => {
  it('Get-Help trần trả kind help, không lines', () => {
    const result = lastOf('Get-Help')
    expect(result.outcome.kind).toBe('help')
    expect(result.lines).toEqual([])
  })

  it('Get-Help <cmdlet> in cú pháp tiếng Anh', () => {
    expect(lastOf('Get-Help New-ADUser').lines.join('\n')).toContain('New-ADUser [-Name] <String>')
  })

  it('lệnh lạ trả kind unknown, không lines', () => {
    const result = lastOf('Format-C /now')
    expect(result.outcome).toMatchObject({ kind: 'unknown', input: 'Format-C' })
    expect(result.lines).toEqual([])
  })
})

describe('gradePs — chấm theo hiệu ứng, không so chuỗi lệnh', () => {
  it('bài kiểm tra kết nối: chỉ đạt khi ĐÃ chạy và THÀNH CÔNG đúng cổng', () => {
    const spec = specTestConnection()
    expect(isPsSolved(spec, initialPsState(spec.world))).toBe(false)
    // Kiểm sai cổng: chạy rồi nhưng chưa đúng việc đề giao.
    const wrongPort = runPsScript(spec.world, ['Test-NetConnection 192.168.20.80 -Port 80']).state
    expect(isPsSolved(spec, wrongPort)).toBe(false)
    const right = runPsScript(spec.world, spec.solution).state
    expect(isPsSolved(spec, right)).toBe(true)
  })

  it('bài hàng loạt: gõ tay từng user CŨNG được công nhận (chấm hiệu ứng, IKEA effect)', () => {
    const spec = specTaoHangLoat()
    const byHand = runPsScript(spec.world, [
      'New-ADUser -Name "Le Van Cuong" -SamAccountName lvcuong -Path "OU=NhanSu,DC=noibo,DC=vn"',
      'New-ADUser -Name "Pham Thi Dung" -SamAccountName ptdung -Path "OU=NhanSu,DC=noibo,DC=vn"',
      'New-ADUser -Name "Hoang Van Em" -SamAccountName hvem -Path "OU=NhanSu,DC=noibo,DC=vn"',
    ]).state
    expect(isPsSolved(spec, byHand)).toBe(true)
  })

  it('bài đọc log: Select-String thẳng vào file (không qua ống) cũng đạt', () => {
    const spec = specDocLog()
    const direct = runPsScript(spec.world, ['Select-String "link down" router.log']).state
    expect(isPsSolved(spec, direct)).toBe(true)
    const evaluation = gradePs(spec, initialPsState(spec.world))
    expect(evaluation.goals[0]!.met).toBe(false)
  })
})

describe('psSchema — chốt chặn nội dung', () => {
  it('lời giải không chạy được (lệnh lạ) bị chặn', () => {
    const spec = specTaoMotUser()
    spec.solution = ['Lam-Bua -Name x']
    expect(() => parsePsSpec(spec)).toThrowError(/không chạy được/)
  })

  it('lời giải chạy sạch mà không đạt mục tiêu bị chặn', () => {
    const spec = specTaoMotUser()
    spec.solution = ['Get-ADUser -Filter *']
    expect(() => parsePsSpec(spec)).toThrowError(/không đạt mục tiêu/)
  })

  it('đề đã đạt sẵn (user có từ đầu) bị chặn — người học phải có việc để làm', () => {
    const spec = specTaoMotUser()
    spec.world.ad!.users.push({ name: 'Le Thi Mai', sam: 'ltmai', ou: 'KeToan', enabled: true })
    expect(() => parsePsSpec(spec)).toThrowError(/đạt mục tiêu từ trước/)
  })
})

describe('trạng thái phiên nối tiếp giữa các dòng', () => {
  it('user tạo ở dòng trước tồn tại cho dòng sau; lỗi giữa chừng không phá state cũ', () => {
    let state = initialPsState(specTaoMotUser().world)
    state = runPsLine(state, 'New-ADUser -Name "A B" -SamAccountName ab -Path "OU=KeToan,DC=noibo,DC=vn"').state
    const errored = runPsLine(state, 'Get-Content khong-co.log')
    expect(errored.outcome.kind).toBe('error')
    // State giữ nguyên sau lỗi — user vừa tạo vẫn còn.
    const check = runPsLine(errored.state, 'Get-ADUser -Identity ab')
    expect(check.lines.join('\n')).toContain('SamAccountName    : ab')
  })
})
