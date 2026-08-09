import { describe, expect, it } from 'vitest'
import {
  arpCacheOf,
  macTableOf,
  pingSucceeded,
  simulatePing,
  type PacketHop,
  type PingResult,
  type SimStage,
} from './simulate'
import { findDevice, type Topology } from './topology'
import {
  MAC,
  flatNetwork,
  loopedNetwork,
  looseParts,
  routedNetwork,
  splitVlanFixed,
  splitVlanNetwork,
  trunkAllowedMissingVlan,
  trunkHealthy,
  trunkMissing,
  trunkNativeMismatch,
} from '../../../tests/fixtures/labFixture'

const phases = (r: PingResult): string[] => r.stages.map((s) => s.phase)
const allHops = (r: PingResult): PacketHop[] => r.stages.flatMap((s) => s.hops)
const reasons = (stage: SimStage | undefined): string[] => (stage?.hops ?? []).map((h) => h.reason)
const stageOf = (r: PingResult, phase: string): SimStage | undefined => r.stages.find((s) => s.phase === phase)

describe('mạng phẳng: hai máy một switch', () => {
  it('ping thành công cả hai chiều', () => {
    const result = simulatePing(flatNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(result.reached).toBe(true)
    expect(result.replied).toBe(true)
    expect(result.failure).toBeNull()
    expect(pingSucceeded(result)).toBe(true)
  })

  it('trình tự đúng: hỏi ARP trước, gửi gói sau, rồi trả lời về', () => {
    const result = simulatePing(flatNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(phases(result)).toEqual(['arp-request', 'arp-reply', 'echo-request', 'echo-reply'])
  })

  it('ARP đi bằng quảng bá: rời máy rồi switch phát tán', () => {
    const result = simulatePing(flatNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(reasons(stageOf(result, 'arp-request'))).toEqual(['host-egress', 'broadcast-flood'])
  })

  it('switch học được MAC nên gói tin sau đi thẳng một cổng', () => {
    const result = simulatePing(flatNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(reasons(stageOf(result, 'echo-request'))).toEqual(['host-egress', 'mac-table-hit'])
  })

  it('bảng MAC của switch nhớ đúng máy nào ở cổng nào', () => {
    const result = simulatePing(flatNetwork(), { from: 'pc-a', to: 'pc-b' })
    const table = macTableOf(result.state, 'sw-1')
    expect(table).toContainEqual({ vlan: 1, mac: MAC.pcA, portId: 'p1' })
    expect(table).toContainEqual({ vlan: 1, mac: MAC.pcB, portId: 'p2' })
  })

  it('ARP cache hai đầu đều nhớ nhau', () => {
    const result = simulatePing(flatNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(arpCacheOf(result.state, 'pc-a')).toContainEqual({ ip: '192.168.1.20', mac: MAC.pcB })
    expect(arpCacheOf(result.state, 'pc-b')).toContainEqual({ ip: '192.168.1.10', mac: MAC.pcA })
  })

  it('lần ping thứ hai KHÔNG hỏi ARP nữa (đã nhớ rồi)', () => {
    const topo = flatNetwork()
    const first = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    const second = simulatePing(topo, { from: 'pc-a', to: 'pc-b' }, first.state)
    expect(phases(second)).toEqual(['echo-request', 'echo-reply'])
    expect(pingSucceeded(second)).toBe(true)
  })

  it('máy chưa cắm dây thì switch phát tán vào hư không, không sinh chặng thừa', () => {
    // sw-1 có 4 cổng nhưng chỉ 2 cổng có dây: quảng bá chỉ tạo 1 chặng.
    const result = simulatePing(flatNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(stageOf(result, 'arp-request')?.hops).toHaveLength(2)
  })

  it('không mutate topology đầu vào', () => {
    const topo = flatNetwork()
    const snapshot = JSON.stringify(topo)
    simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    expect(JSON.stringify(topo)).toBe(snapshot)
  })

  it('chạy hai lần trên cùng topology cho kết quả y hệt (tất định)', () => {
    const topo = flatNetwork()
    const a = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    const b = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    expect(JSON.stringify(a.stages)).toBe(JSON.stringify(b.stages))
  })
})

describe('VLAN chia mạng (ca hỏng của spec Module 4)', () => {
  it('hai máy khác VLAN không ping được nhau dù IP cùng dải', () => {
    const result = simulatePing(splitVlanNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(result.reached).toBe(false)
    expect(result.failure).toBe('arp-unresolved')
  })

  it('gói chết ngay tại máy gửi — chưa ai trả lời câu hỏi ARP', () => {
    const result = simulatePing(splitVlanNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(result.stoppedAt).toEqual({ deviceId: 'pc-a', portId: 'eth0' })
    expect(stageOf(result, 'arp-request')?.arrivedAt).toBeNull()
  })

  it('hai máy CÙNG VLAN vẫn ping được bình thường', () => {
    const result = simulatePing(splitVlanNetwork(), { from: 'pc-b', to: 'pc-c' })
    expect(pingSucceeded(result)).toBe(true)
  })

  it('sửa VLAN cho khớp thì thông ngay — đây là lời giải của bài', () => {
    const result = simulatePing(splitVlanFixed(), { from: 'pc-a', to: 'pc-b' })
    expect(pingSucceeded(result)).toBe(true)
  })

  it('quảng bá không rò sang VLAN khác', () => {
    const result = simulatePing(splitVlanNetwork(), { from: 'pc-b', to: 'pc-c' })
    // VLAN 20 có p2 (pc-b) và p3 (pc-c); chặng ARP không được chạm p1/p4.
    const touched = allHops(result).map((h) => h.to.portId)
    expect(touched).not.toContain('p1')
  })
})

describe('định tuyến qua router', () => {
  it('hai subnet nói chuyện được qua router', () => {
    const result = simulatePing(routedNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(pingSucceeded(result)).toBe(true)
  })

  it('router xuất hiện trong đường đi (không nối tắt)', () => {
    const result = simulatePing(routedNetwork(), { from: 'pc-a', to: 'pc-b' })
    const visited = allHops(result).map((h) => h.to.deviceId)
    expect(visited).toContain('r-1')
    expect(visited).toContain('sw-1')
    expect(visited).toContain('sw-2')
  })

  it('có chặng được đánh dấu là ĐÃ ĐỊNH TUYẾN', () => {
    const result = simulatePing(routedNetwork(), { from: 'pc-a', to: 'pc-b' })
    const echo = result.stages.filter((s) => s.phase === 'echo-request')
    // Router phải gửi tiếp một chặng nữa sau khi nhận — tức là có 2 lượt echo đi.
    expect(echo.length).toBeGreaterThanOrEqual(2)
  })

  it('BÀI HỌC LÕI: IP nguồn giữ nguyên suốt chuyến, MAC đổi từng chặng', () => {
    const result = simulatePing(routedNetwork(), { from: 'pc-a', to: 'pc-b' })
    const echoHops = result.stages.filter((s) => s.phase === 'echo-request').flatMap((s) => s.hops)
    // IP: mọi chặng đều mang đúng cặp địa chỉ đầu-cuối.
    for (const hop of echoHops) {
      expect(hop.srcIp).toBe('192.168.1.10')
      expect(hop.dstIp).toBe('10.0.0.20')
    }
    // MAC: chặng đầu gửi tới router, chặng sau router gửi đi tiếp.
    const macs = echoHops.map((h) => `${h.srcMac}->${h.dstMac}`)
    expect(new Set(macs).size).toBeGreaterThan(1)
    expect(macs.some((m) => m.startsWith(MAC.routerWan))).toBe(true)
  })

  it('thiếu gateway thì không ra khỏi mạng nhà được', () => {
    const topo = routedNetwork()
    const pcA = findDevice(topo, 'pc-a')!
    if (pcA.kind === 'pc') pcA.gateway = null
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    expect(result.failure).toBe('no-gateway')
    expect(result.stoppedAt?.deviceId).toBe('pc-a')
  })

  it('gateway ghi sai dải thì cũng chết ngay tại máy gửi', () => {
    const topo = routedNetwork()
    const pcA = findDevice(topo, 'pc-a')!
    if (pcA.kind === 'pc') pcA.gateway = '10.9.9.1'
    expect(simulatePing(topo, { from: 'pc-a', to: 'pc-b' }).failure).toBe('gateway-off-subnet')
  })

  it('router không có tuyến tới dải lạ', () => {
    const topo = routedNetwork()
    topo.devices.push({
      kind: 'pc',
      id: 'pc-x',
      hostname: 'PC-X',
      port: { id: 'eth0', mac: 'AA:BB:CC:00:00:09' },
      ipConfig: { ip: '172.16.0.5', prefix: 24 },
      gateway: null,
    })
    topo.links.push({ id: 'lx', a: { deviceId: 'pc-x', portId: 'eth0' }, b: { deviceId: 'sw-2', portId: 'p3' } })
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-x' })
    expect(result.failure).toBe('no-route')
    expect(result.stoppedAt?.deviceId).toBe('r-1')
  })

  it('đi tới được nhưng không có đường về: reached nhưng không replied', () => {
    const topo = routedNetwork()
    const pcB = findDevice(topo, 'pc-b')!
    if (pcB.kind === 'pc') pcB.gateway = null
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    expect(result.reached).toBe(true)
    expect(result.replied).toBe(false)
    expect(result.failure).toBe('no-gateway')
    expect(pingSucceeded(result)).toBe(false)
  })

  it('tuyến tĩnh trỏ qua router được dùng khi không có tuyến trực tiếp', () => {
    const topo = routedNetwork()
    // Dựng thêm một mạng 172.16.0.0/24 sau lưng r-1, tới bằng tuyến tĩnh
    // trỏ next hop 10.0.0.2 — nhưng chưa có thiết bị nào giữ IP đó.
    const router = findDevice(topo, 'r-1')!
    if (router.kind === 'router') {
      router.staticRoutes = [{ destination: '172.16.0.0', prefix: 24, nextHop: '10.0.0.2' }]
    }
    topo.devices.push({
      kind: 'pc',
      id: 'pc-x',
      hostname: 'PC-X',
      port: { id: 'eth0', mac: 'AA:BB:CC:00:00:09' },
      ipConfig: { ip: '172.16.0.5', prefix: 24 },
      gateway: null,
    })
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-x' })
    // Tuyến có, nhưng next hop không tồn tại → chết ở bước hỏi ARP tại router.
    expect(result.failure).toBe('arp-unresolved')
    expect(result.stoppedAt?.deviceId).toBe('r-1')
  })
})

describe('mạng vòng (không có STP)', () => {
  it('hai switch nối hai dây gây bão quảng bá', () => {
    const result = simulatePing(loopedNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(result.failure).toBe('broadcast-storm')
    expect(result.reached).toBe(false)
  })

  it('mô phỏng vẫn KẾT THÚC (không treo) và có chặng để hiển thị', () => {
    const result = simulatePing(loopedNetwork(), { from: 'pc-a', to: 'pc-b' })
    expect(result.stages.length).toBeGreaterThan(0)
    expect(allHops(result).length).toBeGreaterThan(0)
  })

  it('gỡ một dây thừa là mạng chạy lại bình thường', () => {
    const topo = loopedNetwork()
    topo.links = topo.links.filter((l) => l.id !== 'l4')
    expect(pingSucceeded(simulatePing(topo, { from: 'pc-a', to: 'pc-b' }))).toBe(true)
  })
})

describe('các ca lỗi cấu hình cơ bản', () => {
  it('máy gửi chưa có IP', () => {
    const topo = flatNetwork()
    const pcA = findDevice(topo, 'pc-a')!
    if (pcA.kind === 'pc') pcA.ipConfig = null
    expect(simulatePing(topo, { from: 'pc-a', to: 'pc-b' }).failure).toBe('src-no-ip')
  })

  it('máy nhận chưa có IP', () => {
    const topo = flatNetwork()
    const pcB = findDevice(topo, 'pc-b')!
    if (pcB.kind === 'pc') pcB.ipConfig = null
    expect(simulatePing(topo, { from: 'pc-a', to: 'pc-b' }).failure).toBe('dst-no-ip')
  })

  it('ping tới switch: switch không mang địa chỉ IP', () => {
    expect(simulatePing(flatNetwork(), { from: 'pc-a', to: 'sw-1' }).failure).toBe('dst-no-ip')
  })

  it('thiết bị chưa cắm dây nào', () => {
    const result = simulatePing(looseParts(), { from: 'pc-a', to: 'pc-b' })
    expect(result.failure).toBe('src-no-link')
    expect(result.stoppedAt).toEqual({ deviceId: 'pc-a', portId: 'eth0' })
  })

  it('id thiết bị không tồn tại', () => {
    expect(simulatePing(flatNetwork(), { from: 'khong-co', to: 'pc-b' }).failure).toBe('src-not-found')
    expect(simulatePing(flatNetwork(), { from: 'pc-a', to: 'khong-co' }).failure).toBe('dst-not-found')
  })

  it('rút dây giữa chừng thì gói không tới được nữa', () => {
    const topo = flatNetwork()
    topo.links = topo.links.filter((l) => l.id !== 'l2')
    expect(simulatePing(topo, { from: 'pc-a', to: 'pc-b' }).failure).toBe('arp-unresolved')
  })

  it('hai máy trùng IP: gói không tới nơi, không treo', () => {
    const topo: Topology = flatNetwork()
    const pcB = findDevice(topo, 'pc-b')!
    if (pcB.kind === 'pc') pcB.ipConfig = { ip: '192.168.1.10', prefix: 24 }
    // Trùng IP là bệnh mạng có thật. Ở mô hình này, máy gửi đi hỏi chính
    // địa chỉ của mình nên không ai trả lời được — kết quả là ping hỏng,
    // đúng triệu chứng người học gặp ngoài đời (dù nguyên nhân sâu xa là
    // xung đột địa chỉ chứ không phải ARP).
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    expect(result.failure).toBe('arp-unresolved')
    expect(pingSucceeded(result)).toBe(false)
  })

  it('tuyến tĩnh trỏ vòng nhau: hết ngân sách chặng thay vì chạy mãi', () => {
    // r-1 và r-2 mỗi bên đẩy gói cho bên kia với cùng một đích. Không có
    // trần chặng thì đây là vòng lặp vô hạn — test này khóa chốt chặn đó.
    const topo: Topology = {
      devices: [
        {
          kind: 'pc',
          id: 'pc-a',
          hostname: 'PC-A',
          port: { id: 'eth0', mac: MAC.pcA },
          ipConfig: { ip: '192.168.1.10', prefix: 24 },
          gateway: '192.168.1.1',
        },
        {
          kind: 'pc',
          id: 'pc-x',
          hostname: 'PC-X',
          port: { id: 'eth0', mac: MAC.pcC },
          ipConfig: { ip: '172.16.0.5', prefix: 24 },
          gateway: null,
        },
        {
          kind: 'router',
          id: 'r-1',
          hostname: 'Router-1',
          ports: [
            { id: 'g0', mac: MAC.routerLan, ipConfig: { ip: '192.168.1.1', prefix: 24 } },
            { id: 'g1', mac: MAC.routerWan, ipConfig: { ip: '10.0.0.1', prefix: 24 } },
          ],
          staticRoutes: [{ destination: '172.16.0.0', prefix: 24, nextHop: '10.0.0.2' }],
        },
        {
          kind: 'router',
          id: 'r-2',
          hostname: 'Router-2',
          ports: [{ id: 'g0', mac: 'AA:BB:CC:00:00:21', ipConfig: { ip: '10.0.0.2', prefix: 24 } }],
          staticRoutes: [{ destination: '172.16.0.0', prefix: 24, nextHop: '10.0.0.1' }],
        },
      ],
      links: [
        { id: 'l1', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'r-1', portId: 'g0' } },
        { id: 'l2', a: { deviceId: 'r-1', portId: 'g1' }, b: { deviceId: 'r-2', portId: 'g0' } },
      ],
    }
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-x' })
    expect(result.failure).toBe('hop-budget-exceeded')
  })
})

describe('trunk 802.1Q — một sợi dây chở nhiều xóm (Module 14)', () => {
  it('chưa làm trunk: hai máy cùng VLAN 10 ở hai switch không gọi được nhau', () => {
    // Dây giữa hai switch còn là cổng access VLAN 1: khung của VLAN 10
    // không có đường sang. Đây là ĐỀ BÀI của Module 14.
    const result = simulatePing(trunkMissing(), { from: 'pc-a', to: 'pc-b' })
    expect(pingSucceeded(result)).toBe(false)
  })

  it('khai trunk hai đầu: VLAN 10 sang được, và khung MANG NHÃN trên dây trunk', () => {
    const result = simulatePing(trunkHealthy(), { from: 'pc-a', to: 'pc-b' })
    expect(pingSucceeded(result)).toBe(true)

    // Nhãn là tải trọng sư phạm của bài: nhật ký phải nói được khung nào
    // đi trần, khung nào mang nhãn, và mang nhãn VLAN mấy.
    const onUplink = allHops(result).filter((h) => h.linkId === 'uplink')
    expect(onUplink.length).toBeGreaterThan(0)
    for (const hop of onUplink) {
      expect(hop.vlan).toBe(10)
      expect(hop.tagged, 'VLAN 10 không phải native nên phải mang nhãn').toBe(true)
    }
    // Đoạn dây từ máy tới switch vẫn đi trần — nhãn chỉ sống trên trunk.
    const toHost = allHops(result).filter((h) => h.linkId === 'l1')
    expect(toHost.every((h) => !h.tagged)).toBe(true)
  })

  it('trunk vẫn giữ bức tường VLAN: kế toán không gọi được kỹ thuật', () => {
    // Trunk chở nhiều xóm trên một dây, KHÔNG phải gộp các xóm làm một.
    const result = simulatePing(trunkHealthy(), { from: 'pc-a', to: 'pc-c' })
    expect(pingSucceeded(result)).toBe(false)
  })

  it('BỆNH allowed list thiếu VLAN: gọi đúng tên bệnh, không nói chung chung', () => {
    const result = simulatePing(trunkAllowedMissingVlan(), { from: 'pc-a', to: 'pc-b' })
    expect(pingSucceeded(result)).toBe(false)
    expect(result.failure).toBe('trunk-vlan-not-allowed')
  })

  it('BỆNH native lệch hai đầu: khung trần lạc sang VLAN khác', () => {
    // Bệnh kinh điển vì nó IM LẶNG: không cổng nào báo lỗi, khung vẫn
    // qua dây, chỉ là sang tới nơi thì nó đã thuộc xóm khác.
    const result = simulatePing(trunkNativeMismatch(), { from: 'pc-a', to: 'pc-b' })
    expect(pingSucceeded(result)).toBe(false)
    expect(result.failure).toBe('native-vlan-mismatch')
  })

  it('native VLAN đi TRẦN, các VLAN khác mang nhãn — trên cùng một trunk', () => {
    // Đặt native = 10 thì chính VLAN 10 đi trần; đây là chỗ người học hay
    // lẫn, nên engine phải phân biệt được rành mạch.
    const topo = trunkHealthy()
    for (const device of topo.devices) {
      if (device.kind !== 'switch') continue
      const uplink = device.ports.find((p) => p.id === 'p4')
      if (uplink !== undefined) uplink.nativeVlan = 10
    }
    const result = simulatePing(topo, { from: 'pc-a', to: 'pc-b' })
    expect(pingSucceeded(result)).toBe(true)
    const onUplink = allHops(result).filter((h) => h.linkId === 'uplink')
    expect(onUplink.every((h) => h.vlan === 10 && !h.tagged)).toBe(true)
  })

  it('bảng MAC của switch ghi theo VLAN, học được cả máy ở đầu kia trunk', () => {
    const result = simulatePing(trunkHealthy(), { from: 'pc-a', to: 'pc-b' })
    const table = macTableOf(result.state, 'sw-2')
    const entry = table.find((e) => e.mac === MAC.pcA)
    expect(entry, 'Switch-2 phải học được PC-A qua cổng trunk').toBeDefined()
    expect(entry?.vlan).toBe(10)
    expect(entry?.portId).toBe('p4')
  })
})
