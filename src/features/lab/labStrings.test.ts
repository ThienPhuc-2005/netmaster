// Mọi MÃ mà engine lab có thể trả ra đều phải có chuỗi hiển thị ở CẢ HAI
// ngôn ngữ.
//
// Test parity vi↔en không bắt được nhóm này, và test "key mồ côi" cũng
// không: các key đó được ghép động (`lab.failure.${code}`) nên phép quét
// tĩnh không thấy. Thiếu một chuỗi thì người học sẽ đọc phải mã máy kiểu
// "arp-unresolved" ngay giữa bài — đúng loại lỗi đã từng xảy ra với màn
// Phòng khám ở Phase 1.
//
// Các bảng dưới đây khai kiểu `Record<Mã, true>`: thêm một mã mới vào
// engine mà quên khai ở đây là `tsc` đỏ ngay, chưa cần chạy test.

import { describe, expect, it } from 'vitest'
import { translate, type Lang } from '../../i18n'
import type { HopReason, LabDiagnosis, LabRejection, PingFailure } from '../../engine/lab'

const FAILURES: Record<PingFailure, true> = {
  'src-not-found': true,
  'dst-not-found': true,
  'src-no-ip': true,
  'dst-no-ip': true,
  'src-no-link': true,
  'no-gateway': true,
  'gateway-off-subnet': true,
  'arp-unresolved': true,
  'no-route': true,
  'hop-budget-exceeded': true,
  'broadcast-storm': true,
  // Ba bệnh trunk của Module 14 (spec v2 Phần D).
  'trunk-vlan-not-allowed': true,
  'native-vlan-mismatch': true,
  'tagged-frame-on-access': true,
  // Cổng tắt bằng lệnh — CLI thiết bị (spec v2 mục 4.2).
  'port-shutdown': true,
  // Bộ lọc ACL trên cổng router (spec v2 mục 4.3).
  'acl-denied': true,
}

const DIAGNOSES: Record<LabDiagnosis, true> = {
  'device-isolated': true,
  'missing-ip': true,
  'missing-gateway': true,
  'gateway-not-in-subnet': true,
  'duplicate-ip': true,
  'vlan-mismatch-on-link': true,
  'same-subnet-different-vlan': true,
  'l2-loop': true,
  'trunk-one-side-only': true,
  'native-vlan-mismatch-on-trunk': true,
  'port-shutdown': true,
}

const REJECTIONS: Record<LabRejection, true> = {
  'not-allowed': true,
  'max-devices': true,
  'duplicate-device-id': true,
  'duplicate-link-id': true,
  'unknown-device': true,
  'unknown-port': true,
  'unknown-link': true,
  'wrong-device-kind': true,
  'port-occupied': true,
  'self-link': true,
  'invalid-vlan': true,
  'invalid-ip': true,
  'invalid-prefix': true,
  'invalid-priority': true,
}

/** Mã lý do chặng → key i18n; phải khớp bảng REASON_KEY trong LabPanels. */
const REASON_KEYS: Record<HopReason, string> = {
  'host-egress': 'lab.reasonHostEgress',
  'broadcast-flood': 'lab.reasonBroadcastFlood',
  'unknown-unicast-flood': 'lab.reasonUnknownUnicastFlood',
  'mac-table-hit': 'lab.reasonMacTableHit',
  routed: 'lab.reasonRouted',
}

const LANGS: Lang[] = ['vi', 'en']

/** Có chuỗi thật không — translate() trả lại chính key khi thiếu. */
function hasString(lang: Lang, key: string): boolean {
  return translate(lang, key) !== key
}

describe('mã engine → chuỗi hiển thị', () => {
  it('mọi lý do ping hỏng đều có lời giải thích', () => {
    const missing: string[] = []
    for (const lang of LANGS) {
      for (const code of Object.keys(FAILURES)) {
        if (!hasString(lang, `lab.failure.${code}`)) missing.push(`${lang}: ${code}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('mọi chẩn đoán đều có lời gợi ý', () => {
    const missing: string[] = []
    for (const lang of LANGS) {
      for (const code of Object.keys(DIAGNOSES)) {
        if (!hasString(lang, `lab.diagnosis.${code}`)) missing.push(`${lang}: ${code}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('mọi lý do từ chối thao tác đều có lời nói tử tế', () => {
    const missing: string[] = []
    for (const lang of LANGS) {
      for (const code of Object.keys(REJECTIONS)) {
        if (!hasString(lang, `lab.refusal.${code}`)) missing.push(`${lang}: ${code}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('mọi lý do chặng đều có chú thích cho nhật ký', () => {
    const missing: string[] = []
    for (const lang of LANGS) {
      for (const key of Object.values(REASON_KEYS)) {
        if (!hasString(lang, key)) missing.push(`${lang}: ${key}`)
      }
    }
    expect(missing).toEqual([])
  })
})

describe('giọng văn của lời từ chối (spec 4.4)', () => {
  it('không câu nào hiện chữ "SAI" trần trụi', () => {
    for (const code of Object.keys(REJECTIONS)) {
      expect(translate('vi', `lab.refusal.${code}`)).not.toMatch(/\bSAI\b/)
    }
    for (const code of Object.keys(FAILURES)) {
      expect(translate('vi', `lab.failure.${code}`)).not.toMatch(/\bSAI\b/)
    }
  })

  it('lời chẩn đoán mô tả triệu chứng, không ra lệnh phải làm gì', () => {
    // Gợi ý tầng 1-2 chỉ hướng người học nhìn vào đâu; lời giải là tầng 3.
    for (const code of Object.keys(DIAGNOSES)) {
      expect(translate('vi', `lab.diagnosis.${code}`)).not.toMatch(/^Hãy |^Đổi |^Sửa /)
    }
  })
})
