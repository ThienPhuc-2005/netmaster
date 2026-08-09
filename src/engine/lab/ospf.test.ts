// OSPF-lite — khối 16.2.
//
// Năm lời hứa được khóa ở đây:
//   1. Láng giềng lên khi đủ BA điều kiện, và không lên thì trả về đúng
//      LÝ DO — thứ chẩn đoán được, khác hẳn một chữ "down" trơ trọi.
//   2. Bảng định tuyến TỰ HỌC: router học được subnet của router ở xa mà
//      không ai gõ tuyến tĩnh nào.
//   3. Cost đếm theo số chặng, và đường rẻ hơn thắng.
//   4. Tuyến tĩnh THẮNG tuyến OSPF cùng đích (AD 1 < 110).
//   5. Đứt một đường thì OSPF tự tìm đường vòng — tuyến tĩnh thì chết đứng.

import { describe, expect, it } from 'vitest'
import {
  ospfNeighborsOf,
  ospfRouterId,
  ospfRoutesOf,
  validateRouterOspf,
} from './ospf'
import { simulatePing } from './simulate'
import { threeRouterRing, twoRouterOspf } from '../../../tests/fixtures/labFixture'
import type { RouterDevice, Topology } from './topology'

function router(topo: Topology, id: string): RouterDevice {
  const device = topo.devices.find((d) => d.id === id)
  if (device === undefined || device.kind !== 'router') throw new Error(`${id} không phải router`)
  return device
}

describe('luật lên láng giềng', () => {
  it('đủ ba điều kiện thì lên FULL', () => {
    const neighbors = ospfNeighborsOf(twoRouterOspf({}), 'r-1')
    expect(neighbors).toHaveLength(1)
    expect(neighbors[0]).toMatchObject({ remoteId: 'r-2', state: 'full', reason: null })
  })

  it('một đầu chưa bật tiến trình: nói rõ là chưa có OSPF', () => {
    const neighbors = ospfNeighborsOf(twoRouterOspf({ ospfOnR2: false }), 'r-1')
    expect(neighbors[0]).toMatchObject({ state: 'down', reason: 'no-ospf-process' })
  })

  it('quên khai network cho chính cổng của mình: nói rõ chưa khai', () => {
    const neighbors = ospfNeighborsOf(twoRouterOspf({ declareOnR2: false }), 'r-1')
    expect(neighbors[0]).toMatchObject({ state: 'down', reason: 'network-not-declared' })
  })

  it('hai cổng khác subnet: nói rõ lệch subnet', () => {
    const neighbors = ospfNeighborsOf(twoRouterOspf({ mismatchSubnet: true }), 'r-1')
    expect(neighbors[0]).toMatchObject({ state: 'down', reason: 'subnet-mismatch' })
  })

  it('router ID là IP LỚN NHẤT trong các cổng (không có loopback thì luật rơi về vế này)', () => {
    const topo = twoRouterOspf({})
    // So theo GIÁ TRỊ địa chỉ chứ không theo thứ tự khai báo cổng: cổng
    // LAN 192.168.1.1 lớn hơn cổng WAN 10.0.12.1 nên nó thắng.
    expect(ospfRouterId(router(topo, 'r-1'))).toBe('192.168.1.1')
  })
})

describe('bảng định tuyến tự học', () => {
  it('router học được mạng LAN của router kia mà không ai gõ tuyến tĩnh', () => {
    const topo = twoRouterOspf({})
    expect(router(topo, 'r-1').staticRoutes).toEqual([])
    const routes = ospfRoutesOf(topo, 'r-1')
    expect(routes).toHaveLength(1)
    expect(routes[0]).toMatchObject({ destination: '192.168.2.0', prefix: 24, nextHopIp: '10.0.12.2', cost: 1 })
  })

  it('ping xuyên hai LAN chạy được chỉ nhờ OSPF', () => {
    expect(simulatePing(twoRouterOspf({}), { from: 'pc-a', to: 'pc-b' }).replied).toBe(true)
  })

  it('chưa lên láng giềng thì không học được gì và ping chết vì không có đường', () => {
    const topo = twoRouterOspf({ declareOnR2: false })
    expect(ospfRoutesOf(topo, 'r-1')).toEqual([])
    expect(simulatePing(topo, { from: 'pc-a', to: 'pc-b' }).failure).toBe('no-route')
  })

  it('subnet mà chính router đã nối trực tiếp không vào bảng OSPF', () => {
    const routes = ospfRoutesOf(twoRouterOspf({}), 'r-1')
    expect(routes.some((r) => r.destination === '192.168.1.0')).toBe(false)
  })
})

describe('cost và đường vòng', () => {
  it('cost đếm theo số chặng; đường ngắn hơn thắng', () => {
    const routes = ospfRoutesOf(threeRouterRing({}), 'r-1')
    const toLanC = routes.find((r) => r.destination === '192.168.3.0')
    // r-1 nối thẳng r-3 nên LAN của r-3 chỉ cách một chặng.
    expect(toLanC).toMatchObject({ cost: 1, nextHopIp: '10.0.13.3' })
  })

  it('đứt đường thẳng thì OSPF tự đi vòng, cost tăng lên', () => {
    const routes = ospfRoutesOf(threeRouterRing({ cutLink13: true }), 'r-1')
    const toLanC = routes.find((r) => r.destination === '192.168.3.0')
    expect(toLanC).toMatchObject({ cost: 2, nextHopIp: '10.0.12.2' })
  })

  it('đứt đường thẳng mà ping VẪN THÔNG — đây là điều tuyến tĩnh không làm được', () => {
    expect(simulatePing(threeRouterRing({ cutLink13: true }), { from: 'pc-a', to: 'pc-c' }).replied).toBe(true)
  })
})

describe('khoảng cách quản trị', () => {
  it('tuyến tĩnh cùng đích THẮNG tuyến OSPF (AD 1 < 110)', () => {
    const topo = threeRouterRing({ staticShortcut: true })
    // Tuyến tĩnh trỏ sang r-2 dù OSPF biết đường thẳng qua r-3.
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-c' })
    expect(result.replied).toBe(true)
    const viaR2 = result.stages.some((stage) => stage.hops.some((hop) => hop.to.deviceId === 'r-2'))
    expect(viaR2).toBe(true)
  })
})

describe('kiểm định cấu trúc', () => {
  const base = (ospf: RouterDevice['ospf']): RouterDevice => ({
    kind: 'router',
    id: 'r-x',
    hostname: 'Router-X',
    ports: [{ id: 'g0', mac: 'AA:BB:CC:00:00:11', ipConfig: { ip: '10.0.0.1', prefix: 24 } }],
    staticRoutes: [],
    ospf,
  })

  it('bật tiến trình mà CHƯA khai network là trạng thái đi-qua hợp lệ, không phải lỗi cấu trúc', () => {
    // Đây là khe giữa hai dòng lệnh trên console sống: `router ospf 1`
    // vừa chạy, câu `network` đầu tiên chưa kịp gõ. Coi nó là lỗi cấu
    // trúc từng làm bộ chấm sống ném lỗi và sập màn console (bug thật
    // của capstone). Đề soạn sẵn bỏ trống networks thì schema nội dung
    // (min 1) đã chặn lúc parse — việc của tầng đó, không phải tầng này.
    expect(validateRouterOspf(base({ processId: 1, networks: [] }))).toEqual([])
  })

  it('area khác 0 nằm ngoài phạm vi đã đóng băng', () => {
    const problems = validateRouterOspf(
      base({ processId: 1, networks: [{ ip: '10.0.0.0', wildcard: '0.0.0.255', area: 1 }] }),
    )
    expect(problems.map((p) => p.code)).toContain('bad-ospf-area')
  })

  it('router chưa bật OSPF thì không có gì để báo', () => {
    expect(validateRouterOspf(base(undefined))).toEqual([])
  })
})
