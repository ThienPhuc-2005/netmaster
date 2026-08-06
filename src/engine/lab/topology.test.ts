import { describe, expect, it } from 'vitest'
import {
  addressedPorts,
  cloneTopology,
  deviceOwningIp,
  findDevice,
  isPortUsed,
  isValidIpv4,
  isValidMac,
  isValidPrefix,
  isValidVlan,
  linkOfPort,
  macOfPort,
  normalizeMac,
  peerOfPort,
  portIdsOf,
  sameSubnet,
  validateTopology,
  vlanOfPort,
  type Topology,
} from './topology'
import { flatNetwork, looseParts, routedNetwork, splitVlanNetwork, MAC } from '../../../tests/fixtures/labFixture'

describe('chuẩn hóa & kiểm định dạng', () => {
  it('normalizeMac đưa về dạng HOA hai chấm', () => {
    expect(normalizeMac('aa:bb:cc:00:00:01')).toBe('AA:BB:CC:00:00:01')
    expect(normalizeMac('AA-BB-CC-00-00-01')).toBe('AA:BB:CC:00:00:01')
    expect(normalizeMac('  aa:bb:cc:00:00:01  ')).toBe('AA:BB:CC:00:00:01')
  })

  it('normalizeMac trả null cho chuỗi không phải MAC', () => {
    expect(normalizeMac('aa:bb:cc:00:00')).toBeNull()
    expect(normalizeMac('zz:bb:cc:00:00:01')).toBeNull()
    expect(normalizeMac('192.168.1.1')).toBeNull()
    expect(isValidMac('không phải mac')).toBe(false)
  })

  it('isValidIpv4 nhận địa chỉ đúng, từ chối địa chỉ sai', () => {
    expect(isValidIpv4('192.168.1.1')).toBe(true)
    expect(isValidIpv4('0.0.0.0')).toBe(true)
    expect(isValidIpv4('255.255.255.255')).toBe(true)
    expect(isValidIpv4('192.168.1')).toBe(false)
    expect(isValidIpv4('192.168.1.256')).toBe(false)
    expect(isValidIpv4('')).toBe(false)
  })

  it('prefix hợp lệ 0..32, VLAN hợp lệ 1..4094', () => {
    expect(isValidPrefix(0)).toBe(true)
    expect(isValidPrefix(32)).toBe(true)
    expect(isValidPrefix(33)).toBe(false)
    expect(isValidPrefix(1.5)).toBe(false)
    expect(isValidVlan(1)).toBe(true)
    expect(isValidVlan(4094)).toBe(true)
    expect(isValidVlan(0)).toBe(false)
    expect(isValidVlan(4095)).toBe(false)
  })

  it('sameSubnet so theo prefix', () => {
    expect(sameSubnet('192.168.1.10', '192.168.1.20', 24)).toBe(true)
    expect(sameSubnet('192.168.1.10', '192.168.2.20', 24)).toBe(false)
    expect(sameSubnet('192.168.1.10', '192.168.2.20', 16)).toBe(true)
  })
})

describe('truy vấn topology', () => {
  it('portIdsOf trả đúng cổng theo loại thiết bị', () => {
    const topo = routedNetwork()
    expect(portIdsOf(findDevice(topo, 'pc-a')!)).toEqual(['eth0'])
    expect(portIdsOf(findDevice(topo, 'sw-1')!)).toEqual(['p1', 'p2', 'p3'])
    expect(portIdsOf(findDevice(topo, 'r-1')!)).toEqual(['g0', 'g1'])
  })

  it('peerOfPort tìm đúng đầu kia sợi dây, cả hai chiều', () => {
    const topo = flatNetwork()
    expect(peerOfPort(topo, { deviceId: 'pc-a', portId: 'eth0' })).toEqual({ deviceId: 'sw-1', portId: 'p1' })
    expect(peerOfPort(topo, { deviceId: 'sw-1', portId: 'p1' })).toEqual({ deviceId: 'pc-a', portId: 'eth0' })
  })

  it('cổng chưa cắm dây: peer null, isPortUsed false', () => {
    const topo = flatNetwork()
    const free = { deviceId: 'sw-1', portId: 'p4' }
    expect(peerOfPort(topo, free)).toBeNull()
    expect(linkOfPort(topo, free)).toBeNull()
    expect(isPortUsed(topo, free)).toBe(false)
    expect(isPortUsed(topo, { deviceId: 'sw-1', portId: 'p1' })).toBe(true)
  })

  it('macOfPort: PC và router có MAC, switch trong suốt nên không', () => {
    const topo = routedNetwork()
    expect(macOfPort(topo, { deviceId: 'pc-a', portId: 'eth0' })).toBe(MAC.pcA)
    expect(macOfPort(topo, { deviceId: 'r-1', portId: 'g1' })).toBe(MAC.routerWan)
    expect(macOfPort(topo, { deviceId: 'sw-1', portId: 'p1' })).toBeNull()
  })

  it('vlanOfPort chỉ có nghĩa với cổng switch', () => {
    const topo = splitVlanNetwork()
    expect(vlanOfPort(topo, { deviceId: 'sw-1', portId: 'p1' })).toBe(10)
    expect(vlanOfPort(topo, { deviceId: 'sw-1', portId: 'p2' })).toBe(20)
    expect(vlanOfPort(topo, { deviceId: 'pc-a', portId: 'eth0' })).toBeNull()
  })

  it('addressedPorts: PC 1 địa chỉ, router nhiều, switch không có', () => {
    const topo = routedNetwork()
    expect(addressedPorts(findDevice(topo, 'pc-a')!)).toHaveLength(1)
    expect(addressedPorts(findDevice(topo, 'r-1')!)).toHaveLength(2)
    expect(addressedPorts(findDevice(topo, 'sw-1')!)).toEqual([])
  })

  it('PC chưa cấu hình IP thì không có cổng mang địa chỉ', () => {
    const topo = flatNetwork()
    const pcA = findDevice(topo, 'pc-a')!
    if (pcA.kind === 'pc') pcA.ipConfig = null
    expect(addressedPorts(pcA)).toEqual([])
  })

  it('deviceOwningIp tra ngược từ địa chỉ về thiết bị và cổng', () => {
    const topo = routedNetwork()
    expect(deviceOwningIp(topo, '10.0.0.1')).toMatchObject({ portId: 'g1', mac: MAC.routerWan })
    expect(deviceOwningIp(topo, '192.168.1.10')?.device.id).toBe('pc-a')
    expect(deviceOwningIp(topo, '8.8.8.8')).toBeNull()
  })

  it('cloneTopology tạo bản độc lập', () => {
    const original = flatNetwork()
    const copy = cloneTopology(original)
    copy.devices.pop()
    copy.links.pop()
    expect(original.devices).toHaveLength(3)
    expect(original.links).toHaveLength(2)
  })
})

describe('validateTopology', () => {
  it('các topology mẫu đều sạch lỗi cấu trúc', () => {
    for (const topo of [flatNetwork(), splitVlanNetwork(), routedNetwork(), looseParts()]) {
      expect(validateTopology(topo)).toEqual([])
    }
  })

  it('dây trỏ vào cổng không tồn tại', () => {
    const topo = flatNetwork()
    topo.links.push({ id: 'lx', a: { deviceId: 'pc-a', portId: 'eth9' }, b: { deviceId: 'sw-1', portId: 'p4' } })
    expect(validateTopology(topo)).toContainEqual({
      code: 'unknown-port',
      linkId: 'lx',
      ref: { deviceId: 'pc-a', portId: 'eth9' },
    })
  })

  it('dây trỏ vào thiết bị không tồn tại', () => {
    const topo = flatNetwork()
    topo.links.push({ id: 'lx', a: { deviceId: 'ma', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p4' } })
    expect(validateTopology(topo).some((p) => p.code === 'unknown-port')).toBe(true)
  })

  it('một cổng cắm hai dây', () => {
    const topo = flatNetwork()
    topo.links.push({ id: 'lx', a: { deviceId: 'pc-a', portId: 'eth0' }, b: { deviceId: 'sw-1', portId: 'p4' } })
    expect(validateTopology(topo)).toContainEqual({
      code: 'port-double-linked',
      ref: { deviceId: 'pc-a', portId: 'eth0' },
    })
  })

  it('dây nối hai cổng của cùng một thiết bị', () => {
    const topo = flatNetwork()
    topo.links.push({ id: 'lx', a: { deviceId: 'sw-1', portId: 'p3' }, b: { deviceId: 'sw-1', portId: 'p4' } })
    expect(validateTopology(topo)).toContainEqual({ code: 'self-link', linkId: 'lx' })
  })

  it('trùng id thiết bị, trùng id dây', () => {
    const topo = flatNetwork()
    topo.devices.push(structuredClone(topo.devices[0]!))
    topo.links.push({ ...topo.links[0]!, a: { deviceId: 'pc-b', portId: 'eth0' } })
    const problems = validateTopology(topo)
    expect(problems).toContainEqual({ code: 'duplicate-device-id', deviceId: 'pc-a' })
    expect(problems).toContainEqual({ code: 'duplicate-link-id', linkId: 'l1' })
  })

  it('trùng MAC giữa hai máy', () => {
    const topo = flatNetwork()
    const pcB = topo.devices.find((d) => d.id === 'pc-b')!
    if (pcB.kind === 'pc') pcB.port.mac = MAC.pcA
    expect(validateTopology(topo)).toContainEqual({ code: 'duplicate-mac', mac: MAC.pcA })
  })

  it('MAC sai định dạng, IP sai, prefix sai, VLAN sai', () => {
    const topo = flatNetwork()
    const pcA = topo.devices.find((d) => d.id === 'pc-a')!
    if (pcA.kind === 'pc') {
      pcA.port.mac = 'không-phải-mac'
      pcA.ipConfig = { ip: '999.1.1.1', prefix: 40 }
    }
    const swi = topo.devices.find((d) => d.id === 'sw-1')!
    if (swi.kind === 'switch') swi.ports = swi.ports.map((p) => (p.id === 'p1' ? { ...p, vlan: 5000 } : p))
    const codes = validateTopology(topo).map((p) => p.code)
    expect(codes).toContain('bad-mac')
    expect(codes).toContain('bad-ip')
    expect(codes).toContain('bad-prefix')
    expect(codes).toContain('bad-vlan')
  })

  it('gateway sai định dạng cũng bị bắt', () => {
    const topo = flatNetwork()
    const pcA = topo.devices.find((d) => d.id === 'pc-a')!
    if (pcA.kind === 'pc') pcA.gateway = '192.168.1'
    expect(validateTopology(topo).some((p) => p.code === 'bad-ip')).toBe(true)
  })

  it('tuyến tĩnh sai địa chỉ bị bắt', () => {
    const topo = routedNetwork()
    const router = topo.devices.find((d) => d.id === 'r-1')!
    if (router.kind === 'router') {
      router.staticRoutes = [{ destination: 'sai', prefix: 99, nextHop: '10.0.0.2' }]
    }
    const codes = validateTopology(topo).map((p) => p.code)
    expect(codes).toContain('bad-ip')
    expect(codes).toContain('bad-prefix')
  })

  it('switch không cổng nào, router không cổng nào', () => {
    const topo: Topology = {
      devices: [
        { kind: 'switch', id: 'sw-0', hostname: 'S', ports: [] },
        { kind: 'router', id: 'r-0', hostname: 'R', ports: [], staticRoutes: [] },
      ],
      links: [],
    }
    const codes = validateTopology(topo).map((p) => p.code)
    expect(codes).toContain('switch-without-ports')
    expect(codes).toContain('router-without-ports')
  })

  it('trùng id cổng trong cùng một thiết bị', () => {
    const topo = flatNetwork()
    const swi = topo.devices.find((d) => d.id === 'sw-1')!
    if (swi.kind === 'switch') swi.ports = [...swi.ports, { id: 'p1', vlan: 1 }]
    expect(validateTopology(topo)).toContainEqual({ code: 'duplicate-port-id', deviceId: 'sw-1', portId: 'p1' })
  })

  it('không mutate topology được kiểm', () => {
    const topo = flatNetwork()
    const snapshot = JSON.stringify(topo)
    validateTopology(topo)
    expect(JSON.stringify(topo)).toBe(snapshot)
  })
})
