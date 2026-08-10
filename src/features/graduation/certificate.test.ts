// @vitest-environment jsdom
// Nội dung tờ giấy chứng nhận (kho H1). Chỉ test tầng SOẠN NỘI DUNG —
// tầng đặt bút vẽ phải nhìn bằng mắt trên browser thật, jsdom không có
// canvas thật để mà kiểm.

import { describe, expect, it } from 'vitest'
import { buildCertificate, type CertificateInput } from './certificate'

const input: CertificateInput = {
  appName: 'NetMaster',
  title: 'Tốt nghiệp trung cấp — kết cả khóa',
  learnerName: '',
  intro: 'đã hoàn thành 21/21 module.',
  stats: [{ label: 'Module đã đậu', value: '21/21' }],
  rows: [{ part: 'A', total: 3, passed: 3 }],
  footer: 'Cấp ngày 10/08/2026',
  milestoneId: 'trung-cap',
  issuedOn: '2026-08-10',
}

describe('buildCertificate', () => {
  it('để trống ô tên thì tờ giấy KHÔNG có dòng tên, không in một gạch trống', () => {
    expect(buildCertificate(input).learnerName).toBeNull()
    expect(buildCertificate({ ...input, learnerName: '   ' }).learnerName).toBeNull()
  })

  it('cắt khoảng trắng thừa và gom khoảng trắng giữa tên', () => {
    expect(buildCertificate({ ...input, learnerName: '  Nguyễn   Văn A ' }).learnerName).toBe('Nguyễn Văn A')
  })

  it('tên quá dài bị chặn ở 40 ký tự — chặn Ở ĐÂY chứ không phải lúc vẽ', () => {
    const long = 'x'.repeat(80)
    expect(buildCertificate({ ...input, learnerName: long }).learnerName).toHaveLength(40)
  })

  it('tên file mang mốc và ngày cấp — tải hai mốc không đè lên nhau', () => {
    expect(buildCertificate(input).fileName).toBe('netmaster-trung-cap-2026-08-10.png')
    expect(buildCertificate({ ...input, milestoneId: 'nhap-mon' }).fileName).toBe('netmaster-nhap-mon-2026-08-10.png')
  })

  it('chép nguyên số liệu và bản đồ được giao — tờ giấy không tự tính lại con số nào', () => {
    const spec = buildCertificate(input)
    expect(spec.stats).toEqual(input.stats)
    expect(spec.rows).toEqual(input.rows)
    expect(spec.title).toBe(input.title)
    expect(spec.footer).toBe(input.footer)
  })
})
