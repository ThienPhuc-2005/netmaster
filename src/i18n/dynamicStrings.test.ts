// Ba họ key i18n ghép ĐỘNG của các bề mặt trung cấp phải có chuỗi ở CẢ
// HAI ngôn ngữ: `cli.cmd.*` (bảng trợ giúp `?` của console thiết bị),
// `ps.cmd.*` (bảng trợ giúp terminal PowerShell), `vlsm.issue.*` (lời phê
// từng dòng của drill VLSM).
//
// Test parity vi↔en không bắt được nhóm này, và test "key mồ côi" cũng
// không: key được ghép động (`t(\`cli.cmd.${c}\`)`) nên phép quét tĩnh
// không thấy. Thêm lệnh thứ 25 hay mã issue thứ 8 mà quên i18n là người
// học đọc key thô giữa màn trợ giúp — đúng lớp lỗi labStrings.test.ts
// được viết ra để chặn (biên bản hội đồng trung cấp, ghế i18n).
//
// Bảng VlsmIssue khai kiểu `Record<Mã, true>`: engine thêm mã mới mà quên
// khai ở đây là `tsc` đỏ ngay. Hai danh sách lệnh vốn là `as const` trong
// engine nên tự nó đã là nguồn chân lý — duyệt thẳng.

import { describe, expect, it } from 'vitest'
import { translate, type Lang } from '../i18n'
import { CLI_COMMANDS } from '../engine/cli'
import { PS_COMMANDS } from '../engine/ps'
import type { VlsmIssue } from '../engine/subnet/vlsm'

const VLSM_ISSUES: Record<VlsmIssue, true> = {
  missing: true,
  invalid: true,
  'outside-base': true,
  'not-network-address': true,
  'too-small': true,
  wasteful: true,
  overlaps: true,
}

const LANGS: Lang[] = ['vi', 'en']

/** Có chuỗi thật không — translate() trả lại chính key khi thiếu. */
function hasString(lang: Lang, key: string): boolean {
  return translate(lang, key) !== key
}

describe('key i18n ghép động → chuỗi hiển thị', () => {
  it('mọi lệnh CLI trong bảng trợ giúp đều có mô tả', () => {
    const missing: string[] = []
    for (const lang of LANGS) {
      for (const command of CLI_COMMANDS) {
        if (!hasString(lang, `cli.cmd.${command}`)) missing.push(`${lang}: ${command}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('mọi cmdlet PS trong bảng trợ giúp đều có mô tả (trừ Get-Help — cố ý ẩn)', () => {
    const missing: string[] = []
    for (const lang of LANGS) {
      for (const command of PS_COMMANDS) {
        if (command === 'Get-Help') continue
        if (!hasString(lang, `ps.cmd.${command}`)) missing.push(`${lang}: ${command}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('mọi mã VlsmIssue đều có lời phê', () => {
    const missing: string[] = []
    for (const lang of LANGS) {
      for (const issue of Object.keys(VLSM_ISSUES)) {
        if (!hasString(lang, `vlsm.issue.${issue}`)) missing.push(`${lang}: ${issue}`)
      }
    }
    expect(missing).toEqual([])
  })
})
