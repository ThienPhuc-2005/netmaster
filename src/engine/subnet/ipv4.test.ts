import { describe, expect, it } from 'vitest'
import {
  broadcastAddress,
  firstUsableHost,
  intToIp,
  ipToInt,
  lastUsableHost,
  magicNumber,
  maskToPrefix,
  networkAddress,
  prefixToMask,
  smallestPrefixForHosts,
  usableHostCount,
} from './ipv4'

describe('ipToInt / intToIp', () => {
  it('round-trips ordinary addresses', () => {
    for (const ip of ['0.0.0.0', '10.0.0.1', '172.16.5.9', '192.168.1.130', '255.255.255.255']) {
      expect(intToIp(ipToInt(ip))).toBe(ip)
    }
  })

  it('stays unsigned for first octet >= 128', () => {
    expect(ipToInt('200.1.2.3')).toBe(3355509251)
    expect(ipToInt('128.0.0.0')).toBe(2147483648)
    expect(ipToInt('255.255.255.255')).toBe(4294967295)
    expect(ipToInt('200.1.2.3')).toBeGreaterThan(0)
  })

  it('accepts zero-padded octets (grader leniency)', () => {
    expect(ipToInt('192.168.001.005')).toBe(ipToInt('192.168.1.5'))
    expect(ipToInt('010.000.000.001')).toBe(ipToInt('10.0.0.1'))
  })

  it('rejects malformed addresses', () => {
    expect(() => ipToInt('256.1.1.1')).toThrow()
    expect(() => ipToInt('1.2.3')).toThrow()
    expect(() => ipToInt('1.2.3.4.5')).toThrow()
    expect(() => ipToInt('a.b.c.d')).toThrow()
    expect(() => ipToInt('')).toThrow()
    expect(() => ipToInt('1.2.3.-4')).toThrow()
    expect(() => ipToInt('1.2.3.4 ')).toThrow()
  })

  it('intToIp rejects out-of-range integers', () => {
    expect(() => intToIp(-1)).toThrow()
    expect(() => intToIp(2 ** 32)).toThrow()
    expect(() => intToIp(1.5)).toThrow()
  })
})

describe('prefixToMask / maskToPrefix', () => {
  it('produces known masks', () => {
    expect(prefixToMask(0)).toBe('0.0.0.0')
    expect(prefixToMask(8)).toBe('255.0.0.0')
    expect(prefixToMask(12)).toBe('255.240.0.0')
    expect(prefixToMask(23)).toBe('255.255.254.0')
    expect(prefixToMask(26)).toBe('255.255.255.192')
    expect(prefixToMask(32)).toBe('255.255.255.255')
  })

  it('round-trips every prefix 0..32', () => {
    for (let p = 0; p <= 32; p++) {
      expect(maskToPrefix(prefixToMask(p))).toBe(p)
    }
  })

  it('rejects non-contiguous masks', () => {
    expect(() => maskToPrefix('255.0.255.0')).toThrow()
    expect(() => maskToPrefix('255.255.255.253')).toThrow()
    expect(() => maskToPrefix('0.255.0.0')).toThrow()
    expect(() => maskToPrefix('1.0.0.0')).toThrow()
  })

  it('rejects invalid prefixes and malformed masks', () => {
    expect(() => prefixToMask(-1)).toThrow()
    expect(() => prefixToMask(33)).toThrow()
    expect(() => prefixToMask(1.5)).toThrow()
    expect(() => maskToPrefix('255.255.256.0')).toThrow()
  })
})

describe('network / broadcast / host range — verified vectors', () => {
  it('192.168.1.130/26', () => {
    expect(networkAddress('192.168.1.130', 26)).toBe('192.168.1.128')
    expect(broadcastAddress('192.168.1.130', 26)).toBe('192.168.1.191')
    expect(firstUsableHost('192.168.1.130', 26)).toBe('192.168.1.129')
    expect(lastUsableHost('192.168.1.130', 26)).toBe('192.168.1.190')
    expect(usableHostCount(26)).toBe(62)
    expect(magicNumber(26)).toBe(64)
  })

  it('172.16.5.9/12 network', () => {
    expect(networkAddress('172.16.5.9', 12)).toBe('172.16.0.0')
  })

  it('10.0.0.0/8 broadcast', () => {
    expect(broadcastAddress('10.0.0.0', 8)).toBe('10.255.255.255')
  })

  it('192.168.3.7/23 — block in octet 3', () => {
    expect(magicNumber(23)).toBe(2)
    expect(networkAddress('192.168.3.7', 23)).toBe('192.168.2.0')
    expect(broadcastAddress('192.168.3.7', 23)).toBe('192.168.3.255')
    expect(firstUsableHost('192.168.3.7', 23)).toBe('192.168.2.1')
    expect(lastUsableHost('192.168.3.7', 23)).toBe('192.168.3.254')
  })

  it('/0 spans the whole address space', () => {
    expect(networkAddress('123.45.67.89', 0)).toBe('0.0.0.0')
    expect(broadcastAddress('123.45.67.89', 0)).toBe('255.255.255.255')
  })

  it('host helpers reject /31 and /32', () => {
    expect(() => firstUsableHost('10.0.0.1', 31)).toThrow()
    expect(() => firstUsableHost('10.0.0.1', 32)).toThrow()
    expect(() => lastUsableHost('10.0.0.1', 31)).toThrow()
    expect(() => lastUsableHost('10.0.0.1', 32)).toThrow()
  })
})

describe('usableHostCount', () => {
  it('computes 2^(32-p) - 2', () => {
    expect(usableHostCount(24)).toBe(254)
    expect(usableHostCount(30)).toBe(2)
    expect(usableHostCount(25)).toBe(126)
    expect(usableHostCount(16)).toBe(65534)
    expect(usableHostCount(0)).toBe(4294967294)
  })

  it('throws for /31 and /32 (outside MVP drill scope)', () => {
    expect(() => usableHostCount(31)).toThrow()
    expect(() => usableHostCount(32)).toThrow()
    expect(() => usableHostCount(33)).toThrow()
    expect(() => usableHostCount(-1)).toThrow()
  })
})

describe('magicNumber', () => {
  it('follows the 256 - mask-octet rule', () => {
    expect(magicNumber(17)).toBe(128)
    expect(magicNumber(23)).toBe(2)
    expect(magicNumber(25)).toBe(128)
    expect(magicNumber(26)).toBe(64)
    expect(magicNumber(30)).toBe(4)
  })

  it('returns 256 when the prefix ends on an octet boundary', () => {
    expect(magicNumber(8)).toBe(256)
    expect(magicNumber(16)).toBe(256)
    expect(magicNumber(24)).toBe(256)
  })

  it('rejects invalid prefixes', () => {
    expect(() => magicNumber(-1)).toThrow()
    expect(() => magicNumber(33)).toThrow()
    expect(() => magicNumber(2.5)).toThrow()
  })
})

describe('smallestPrefixForHosts', () => {
  it('picks the largest prefix that still fits', () => {
    expect(smallestPrefixForHosts(300)).toBe(23)
    expect(smallestPrefixForHosts(2)).toBe(30)
    expect(smallestPrefixForHosts(510)).toBe(23)
    expect(smallestPrefixForHosts(511)).toBe(22)
    expect(smallestPrefixForHosts(1)).toBe(30)
    expect(smallestPrefixForHosts(254)).toBe(24)
    expect(smallestPrefixForHosts(255)).toBe(23)
  })

  it('result always satisfies the demand while one prefix smaller would not', () => {
    for (const hosts of [1, 2, 3, 62, 63, 126, 127, 1000, 65534]) {
      const p = smallestPrefixForHosts(hosts)
      expect(usableHostCount(p)).toBeGreaterThanOrEqual(hosts)
      if (p < 30) expect(usableHostCount(p + 1)).toBeLessThan(hosts)
    }
  })

  it('rejects invalid demands', () => {
    expect(() => smallestPrefixForHosts(0)).toThrow()
    expect(() => smallestPrefixForHosts(-5)).toThrow()
    expect(() => smallestPrefixForHosts(2.5)).toThrow()
    expect(() => smallestPrefixForHosts(2 ** 32)).toThrow()
  })
})
