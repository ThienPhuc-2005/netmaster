// ACL đánh số — khối 16.1.
//
// Bốn lời hứa được khóa ở đây:
//   1. Luật ĐẦU TIÊN khớp là luật quyết định, và cuối danh sách luôn có
//      DÒNG CẤM VÔ HÌNH — thứ đốn ngã người mới nhiều nhất.
//   2. Địa chỉ so bằng WILDCARD, không phải subnet mask.
//   3. ACL chỉ có tác dụng khi đã ÁP lên cổng; khai suông không lọc gì.
//   4. Số đếm của từng dòng là bằng chứng chẩn đoán: có số nghĩa là gói
//      tin CÓ đi tới đó và CÓ khớp dòng ấy.

import { describe, expect, it } from 'vitest'
import {
  ACL_ANY,
  aclOnPort,
  aclRuleText,
  evaluateAcl,
  matchesAclAddress,
  validateRouterAcls,
  type AccessList,
} from './acl'
import { simulatePing } from './simulate'
import { aclLab, routedWithAcl } from '../../../tests/fixtures/labFixture'
import type { RouterDevice, Topology } from './topology'

const KE_TOAN: AccessList = {
  number: 101,
  rules: [
    { seq: 10, action: 'permit', protocol: 'icmp', src: { ip: '192.168.1.0', wildcard: '0.0.0.255' }, dst: ACL_ANY },
    { seq: 20, action: 'deny', protocol: 'icmp', src: { ip: '10.0.0.7', wildcard: '0.0.0.0' }, dst: ACL_ANY },
  ],
}

describe('so địa chỉ bằng wildcard', () => {
  it('bit 0 của wildcard là chỗ phải khớp, bit 1 là chỗ mặc kệ', () => {
    const cadai = { ip: '192.168.1.0', wildcard: '0.0.0.255' }
    expect(matchesAclAddress(cadai, '192.168.1.77')).toBe(true)
    expect(matchesAclAddress(cadai, '192.168.2.77')).toBe(false)
  })

  it('host là wildcard toàn 0; any là wildcard toàn 255', () => {
    expect(matchesAclAddress({ ip: '10.0.0.7', wildcard: '0.0.0.0' }, '10.0.0.7')).toBe(true)
    expect(matchesAclAddress({ ip: '10.0.0.7', wildcard: '0.0.0.0' }, '10.0.0.8')).toBe(false)
    expect(matchesAclAddress(ACL_ANY, '203.0.113.9')).toBe(true)
  })
})

describe('thứ tự luật và dòng cấm vô hình', () => {
  it('luật đầu tiên khớp là luật quyết định — luật sau không được hỏi tới', () => {
    expect(evaluateAcl(KE_TOAN, { protocol: 'icmp', src: '192.168.1.5', dst: '10.0.0.20' })).toEqual({
      action: 'permit',
      seq: 10,
    })
  })

  it('không luật nào khớp thì DÒNG CẤM VÔ HÌNH ra tay, và nó không có số dòng', () => {
    expect(evaluateAcl(KE_TOAN, { protocol: 'icmp', src: '172.16.0.9', dst: '10.0.0.20' })).toEqual({
      action: 'deny',
      seq: null,
    })
  })

  it('viết luật hẹp SAU luật rộng là luật hẹp không bao giờ được hỏi tới', () => {
    const nguoc: AccessList = {
      number: 102,
      rules: [
        { seq: 10, action: 'permit', protocol: 'ip', src: ACL_ANY, dst: ACL_ANY },
        { seq: 20, action: 'deny', protocol: 'icmp', src: { ip: '10.0.0.7', wildcard: '0.0.0.0' }, dst: ACL_ANY },
      ],
    }
    expect(evaluateAcl(nguoc, { protocol: 'icmp', src: '10.0.0.7', dst: '192.168.1.5' })).toEqual({
      action: 'permit',
      seq: 10,
    })
  })

  it('luật tcp/udp không bao giờ ăn gói ping — tính cụ thể của giao thức', () => {
    const chanWeb: AccessList = {
      number: 103,
      rules: [{ seq: 10, action: 'deny', protocol: 'tcp', src: ACL_ANY, dst: ACL_ANY, dstPort: 80 }],
    }
    // Không khớp dòng 10, nên rơi xuống dòng cấm vô hình: vẫn bị cấm,
    // nhưng vì lý do KHÁC — và phân biệt được hai lý do đó là bài học.
    expect(evaluateAcl(chanWeb, { protocol: 'icmp', src: '10.0.0.7', dst: '192.168.1.5' })).toEqual({
      action: 'deny',
      seq: null,
    })
  })
})

describe('khai suông chưa lọc gì — phải ÁP lên cổng', () => {
  it('router có danh sách nhưng cổng chưa áp: aclOnPort trả null', () => {
    const topo = routedWithAcl({ apply: false })
    const router = topo.devices.find((d) => d.id === 'r-1') as RouterDevice
    expect(router.accessLists).toHaveLength(1)
    expect(aclOnPort(router, 'g0', 'in')).toBeNull()
  })

  it('cổng áp một số danh sách chưa hề khai thì cũng không lọc gì', () => {
    const topo = routedWithAcl({ apply: true })
    const router = topo.devices.find((d) => d.id === 'r-1') as RouterDevice
    const lac = { ...router, accessLists: [], ports: router.ports } as RouterDevice
    expect(aclOnPort(lac, 'g0', 'in')).toBeNull()
  })
})

describe('tác dụng thật trên mô phỏng', () => {
  it('chưa áp danh sách thì ping thông như cũ', () => {
    const result = simulatePing(routedWithAcl({ apply: false }), { from: 'pc-a', to: 'pc-b' })
    expect(result.replied).toBe(true)
    expect(result.failure).toBeNull()
  })

  it('áp danh sách chặn thì ping chết, nói rõ dòng luật nào ăn', () => {
    const result = simulatePing(routedWithAcl({ apply: true }), { from: 'pc-a', to: 'pc-b' })
    expect(result.replied).toBe(false)
    expect(result.failure).toBe('acl-denied')
    expect(result.deniedBy).toMatchObject({ deviceId: 'r-1', portId: 'g0', direction: 'in', listNumber: 101, seq: 20 })
  })

  it('số đếm của dòng luật tăng theo từng gói đi qua — bằng chứng chẩn đoán', () => {
    const topo = routedWithAcl({ apply: true })
    const first = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    expect(first.state.aclHits['r-1']?.[101]?.[20]).toBe(1)

    const second = simulatePing(topo, { from: 'pc-a', to: 'pc-b' }, first.state)
    expect(second.state.aclHits['r-1']?.[101]?.[20]).toBe(2)
  })

  it('dòng cấm vô hình chặn nhưng KHÔNG có số đếm', () => {
    const topo = routedWithAcl({ apply: true, onlyPermitOther: true })
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    expect(result.failure).toBe('acl-denied')
    expect(result.deniedBy?.seq).toBeNull()
    expect(result.state.aclHits['r-1']?.[101]).toBeUndefined()
  })
})

describe('đề lab ACL của fixture', () => {
  it('đề bài đang chặn, lời giải mở đúng đường mà vẫn giữ vế cấm', () => {
    const spec = aclLab()
    expect(simulatePing(spec.initial, { from: 'pc-a', to: 'pc-b' }).replied).toBe(false)
    expect(simulatePing(spec.solution, { from: 'pc-a', to: 'pc-b' }).replied).toBe(true)
  })
})

describe('kiểm định cấu trúc', () => {
  const router = (accessLists: RouterDevice['accessLists']): RouterDevice => ({
    kind: 'router',
    id: 'r-x',
    hostname: 'Router-X',
    ports: [{ id: 'g0', mac: 'AA:BB:CC:00:00:11', ipConfig: { ip: '10.0.0.1', prefix: 24 } }],
    staticRoutes: [],
    accessLists,
  })

  it('số danh sách ngoài 1..199 là lỗi', () => {
    expect(validateRouterAcls(router([{ number: 500, rules: [{ seq: 10, action: 'permit', protocol: 'ip', src: ACL_ANY, dst: ACL_ANY }] }]))).toContainEqual(
      { code: 'bad-acl-number', deviceId: 'r-x', number: 500 },
    )
  })

  it('danh sách RỖNG là lỗi — áp nó lên cổng là cấm sạch, gần như luôn là gõ nhầm', () => {
    expect(validateRouterAcls(router([{ number: 10, rules: [] }]))).toContainEqual({
      code: 'empty-acl',
      deviceId: 'r-x',
      number: 10,
    })
  })

  it('cổng eq trên luật không phải tcp/udp là lỗi', () => {
    const problems = validateRouterAcls(
      router([
        {
          number: 101,
          rules: [{ seq: 10, action: 'deny', protocol: 'icmp', src: ACL_ANY, dst: ACL_ANY, dstPort: 80 }],
        },
      ]),
    )
    expect(problems.map((p) => p.code)).toContain('acl-port-on-non-tcp')
  })

  it('sơ đồ sạch thì không báo gì', () => {
    const topo: Topology = routedWithAcl({ apply: true })
    const r = topo.devices.find((d) => d.id === 'r-1') as RouterDevice
    expect(validateRouterAcls(r)).toEqual([])
  })
})

describe('cách ghi ra chữ', () => {
  it('viết đúng giọng IOS: any, host, và cặp ip + wildcard', () => {
    expect(aclRuleText(KE_TOAN.rules[0]!)).toBe('permit icmp 192.168.1.0 0.0.0.255 any')
    expect(aclRuleText(KE_TOAN.rules[1]!)).toBe('deny icmp host 10.0.0.7 any')
  })
})
