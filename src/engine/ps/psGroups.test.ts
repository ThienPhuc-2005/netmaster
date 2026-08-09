// Test ba cmdlet nhóm AD + goal group-member (khối 18.1, spec v2 mục
// 4.5) — nguyên liệu AGDLP của Module 19. Chạy trên đề THẬT của fixture.

import { describe, expect, it } from 'vitest'
import { specXepNhom, worldAgdlp } from '../../../tests/fixtures/psFixture'
import { initialPsState, isMemberOfGroup, validatePsWorld, type PsWorld } from './world'
import { runPsLine, runPsScript } from './interpret'
import { gradePs } from './gradePs'
import { parsePsSpec } from './psSchema'

const run = (...inputs: string[]) => runPsScript(worldAgdlp(), inputs)
const lastOf = (...inputs: string[]) => run(...inputs).results.at(-1)!

describe('Get-ADGroup', () => {
  it('-Identity tìm đúng nhóm, in scope và DN; nhóm lạ báo lỗi như thật', () => {
    const text = lastOf('Get-ADGroup -Identity KeToan-GG').lines.join('\n')
    expect(text).toContain('Name              : KeToan-GG')
    expect(text).toContain('GroupScope        : Global')
    expect(text).toContain('DistinguishedName : CN=KeToan-GG,CN=Users,DC=noibo,DC=vn')

    const missing = lastOf('Get-ADGroup -Identity KhongCo')
    expect(missing.outcome.kind).toBe('error')
    expect(missing.lines.join('\n')).toContain("Cannot find an object with identity: 'KhongCo'")
  })

  it('-Filter * liệt kê cả hai nhóm; thiếu cả Identity lẫn Filter thì máy hỏi lại', () => {
    const all = lastOf('Get-ADGroup -Filter *').lines.join('\n')
    expect(all).toContain('KeToan-GG')
    expect(all).toContain('QuyenDocBaoCao-DL')
    expect(lastOf('Get-ADGroup').outcome.kind).toBe('error')
  })

  it('máy chưa vào miền thì cả ba lệnh nhóm đều nói thẳng', () => {
    const world: PsWorld = { ...worldAgdlp(), ad: null }
    for (const line of ['Get-ADGroup -Filter *', 'Get-ADGroupMember KeToan-GG', 'Add-ADGroupMember KeToan-GG -Members nvan']) {
      const result = runPsLine(initialPsState(world), line)
      expect(result.outcome.kind).toBe('error')
      expect(result.lines.join('\n')).toContain('not joined to a domain')
    }
  })
})

describe('Get-ADGroupMember', () => {
  it('nhóm Global chứa NGƯỜI: ObjectClass user, đủ tên và sam', () => {
    const text = lastOf('Get-ADGroupMember -Identity KeToan-GG').lines.join('\n')
    expect(text).toContain('Name           : Nguyen Van An')
    expect(text).toContain('SamAccountName : nvan')
    expect(text).toContain('ObjectClass    : user')
  })

  it('nhóm DomainLocal chứa NHÓM: ObjectClass group — hình dạng chữ G→DL nhìn thấy được', () => {
    const text = lastOf('Get-ADGroupMember QuyenDocBaoCao-DL').lines.join('\n')
    expect(text).toContain('Name           : KeToan-GG')
    expect(text).toContain('ObjectClass    : group')
    expect(text).not.toContain('ObjectClass    : user')
  })

  it('thiếu -Identity hoặc nhóm lạ đều bị từ chối bằng giọng máy', () => {
    expect(lastOf('Get-ADGroupMember').outcome.kind).toBe('error')
    expect(lastOf('Get-ADGroupMember KhongCo').outcome.kind).toBe('error')
  })
})

describe('Add-ADGroupMember', () => {
  it('thêm user vào nhóm: im lặng như lệnh GHI thật, Get-ADGroupMember thấy ngay', () => {
    const added = run('Add-ADGroupMember KeToan-GG -Members ttbinh')
    const last = added.results.at(-1)!
    expect(last.outcome).toMatchObject({ kind: 'ok', addedMembers: 1 })
    expect(last.lines).toEqual([])
    const check = runPsLine(added.state, 'Get-ADGroupMember KeToan-GG')
    expect(check.lines.join('\n')).toContain('ttbinh')
  })

  it('đã là thành viên thì lặng lẽ cho qua (không lỗi, không thêm đôi)', () => {
    const twice = run(
      'Add-ADGroupMember KeToan-GG -Members ttbinh',
      'Add-ADGroupMember KeToan-GG -Members ttbinh',
    )
    expect(twice.results.at(-1)!.outcome).toMatchObject({ kind: 'ok', addedMembers: 0 })
    const members = runPsLine(twice.state, 'Get-ADGroupMember KeToan-GG').lines.join('\n')
    expect(members.match(/ttbinh/g)).toHaveLength(1)
  })

  it('-Members nhận danh sách cách nhau dấu phẩy; hoa thường tùy ý', () => {
    const both = run('add-adgroupmember ketoan-gg -members TTBINH,nvan')
    expect(both.results.at(-1)!.outcome).toMatchObject({ kind: 'ok', addedMembers: 1 })
    expect(isMemberOfGroup(both.state.world, 'KeToan-GG', 'ttbinh')).toBe(true)
  })

  it('thành viên lạ / nhóm lạ báo đúng danh tính không tìm thấy', () => {
    const badMember = lastOf('Add-ADGroupMember KeToan-GG -Members khongco')
    expect(badMember.outcome.kind).toBe('error')
    expect(badMember.lines.join('\n')).toContain("identity: 'khongco'")
    expect(lastOf('Add-ADGroupMember KhongCo -Members nvan').outcome.kind).toBe('error')
  })

  it('hai luật thật của AD: Global không chứa DomainLocal, và không được tạo vòng', () => {
    const wrongWay = lastOf('Add-ADGroupMember KeToan-GG -Members QuyenDocBaoCao-DL')
    expect(wrongWay.outcome.kind).toBe('error')
    expect(wrongWay.lines.join('\n')).toContain('global group cannot have a domain local group')

    const circular = lastOf('Add-ADGroupMember QuyenDocBaoCao-DL -Members QuyenDocBaoCao-DL')
    expect(circular.outcome.kind).toBe('error')
    expect(circular.lines.join('\n')).toContain('circular')
  })
})

describe('goal group-member — chấm hiệu ứng, tính cả nhóm lồng nhóm', () => {
  it('đề fixture qua schema; trạng thái đầu chưa đạt; lời giải một dòng đạt CẢ HAI goal', () => {
    const spec = specXepNhom()
    expect(() => parsePsSpec(spec)).not.toThrow()

    const untouched = gradePs(spec, initialPsState(spec.world))
    expect(untouched.passed).toBe(false)

    const solved = runPsScript(spec.world, spec.solution)
    const evaluation = gradePs(spec, solved.state)
    // Goal trên nhóm DomainLocal đạt NHỜ nhóm lồng nhóm: ttbinh vào
    // KeToan-GG, mà KeToan-GG nằm sẵn trong QuyenDocBaoCao-DL.
    expect(evaluation.goals.map((g) => g.met)).toEqual([true, true])
    expect(evaluation.passed).toBe(true)
  })

  it('nhét thẳng user vào DomainLocal là lối tắt sai nếp: goal DL đạt nhưng goal GG vẫn đỏ', () => {
    const spec = specXepNhom()
    const shortcut = runPsScript(spec.world, ['Add-ADGroupMember QuyenDocBaoCao-DL -Members ttbinh'])
    const evaluation = gradePs(spec, shortcut.state)
    expect(evaluation.goals.find((g) => g.goal.kind === 'group-member' && g.goal.group === 'QuyenDocBaoCao-DL')?.met).toBe(true)
    expect(evaluation.goals.find((g) => g.goal.kind === 'group-member' && g.goal.group === 'KeToan-GG')?.met).toBe(false)
    expect(evaluation.passed).toBe(false)
  })
})

describe('kiểm cấu trúc thế giới có nhóm', () => {
  it('fixture sạch; các lỗi soạn bài đều bị gọi tên', () => {
    expect(validatePsWorld(worldAgdlp())).toEqual([])

    const dupGroup = worldAgdlp()
    dupGroup.ad!.groups!.push({ name: 'ketoan-gg', scope: 'Global', members: [] })
    expect(validatePsWorld(dupGroup).map((p) => p.code)).toContain('duplicate-group')

    const ghostMember = worldAgdlp()
    ghostMember.ad!.groups![0]!.members.push('khongco')
    expect(validatePsWorld(ghostMember).map((p) => p.code)).toContain('group-member-unknown')

    const wrongWay = worldAgdlp()
    wrongWay.ad!.groups![0]!.members.push('QuyenDocBaoCao-DL')
    expect(validatePsWorld(wrongWay).map((p) => p.code)).toContain('global-contains-domainlocal')

    const cycle = worldAgdlp()
    cycle.ad!.groups!.push({ name: 'A-GG', scope: 'Global', members: ['B-GG'] })
    cycle.ad!.groups!.push({ name: 'B-GG', scope: 'Global', members: ['A-GG'] })
    expect(validatePsWorld(cycle).map((p) => p.code)).toContain('group-cycle')
  })

  it('thế giới KHÔNG khai groups giữ nguyên nghĩa cũ (không lỗi, không nhóm)', () => {
    const world = worldAgdlp()
    delete world.ad!.groups
    expect(validatePsWorld(world)).toEqual([])
    expect(runPsLine(initialPsState(world), 'Get-ADGroup -Filter *').lines).toEqual([])
  })
})
