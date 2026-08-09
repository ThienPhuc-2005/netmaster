// Access Control List đánh số (spec v2 mục 4.3) — bộ lọc gói tin trên
// cổng router.
//
// MÔ HÌNH: một danh sách là một dãy luật CÓ THỨ TỰ. Gói tin được so từ
// trên xuống, LUẬT ĐẦU TIÊN KHỚP là luật quyết định, và nếu không luật
// nào khớp thì có một dòng vô hình ở cuối: CẤM TẤT CẢ. Cái dòng vô hình
// ấy (implicit deny) là thứ đốn ngã người mới nhiều nhất — viết một luật
// "cho phép kế toán" rồi tưởng phần còn lại vẫn chạy như cũ.
//
// ĐỊA CHỈ SO BẰNG WILDCARD, không phải subnet mask: bit 0 của wildcard là
// chỗ phải khớp, bit 1 là chỗ mặc kệ (Module 13 dạy cách đọc nó).
//
// BA ĐƠN GIẢN HÓA CỐ Ý, khai ra để không ai "sửa" tới lui:
//   1. Phòng lab chỉ sinh lưu lượng ICMP (ping) và ARP. Luật tcp/udp vì
//      thế KHAI ĐƯỢC nhưng không bao giờ khớp gói ping — và đó đúng là
//      bài học về tính cụ thể của luật, không phải lỗ hổng.
//   2. ARP không bị ACL lọc: nó là khung tầng 2, đúng như thiết bị thật.
//   3. Chỉ có ACL đánh số (numbered), không có named ACL — nằm ngoài
//      phạm vi đã đóng băng ở spec mục 5.1.
//
// Technical contract: mọi hàm THUẦN, không mutate đầu vào.

import { matchesWildcard } from './wildcard'
import { isValidIpv4, type Ipv4, type RouterDevice } from './topology'

/** Giao thức mà một luật nhắm tới. `ip` khớp mọi giao thức. */
export type AclProtocol = 'ip' | 'icmp' | 'tcp' | 'udp'

/** Một vế địa chỉ của luật: địa chỉ nền + wildcard mask. */
export interface AclAddress {
  ip: Ipv4
  wildcard: Ipv4
}

/** Vế "any" — mọi bit đều mặc kệ. */
export const ACL_ANY: AclAddress = { ip: '0.0.0.0', wildcard: '255.255.255.255' }

export interface AclRule {
  /** Số thứ tự dòng, tăng dần trong danh sách; cũng là cái `show access-lists` in ra. */
  seq: number
  action: 'permit' | 'deny'
  protocol: AclProtocol
  src: AclAddress
  dst: AclAddress
  /**
   * Cổng đích của luật tcp/udp. Phòng lab không sinh lưu lượng tcp/udp
   * nên trường này chỉ để ĐỌC và để dạy — xem đơn giản hóa 1 ở đầu file.
   */
  dstPort?: number
}

export interface AccessList {
  /** Số hiệu danh sách: 1-99 là ACL chuẩn, 100-199 là ACL mở rộng. */
  number: number
  rules: AclRule[]
}

/** Chiều áp danh sách lên một cổng. */
export type AclDirection = 'in' | 'out'

/** Gói tin đem ra so luật. Phạm vi mô phỏng hiện tại chỉ có ICMP. */
export interface AclPacket {
  protocol: 'icmp'
  src: Ipv4
  dst: Ipv4
}

/**
 * Kết quả so một danh sách. `seq: null` nghĩa là KHÔNG luật nào khớp và
 * dòng cấm vô hình ở cuối đã ra tay — phân biệt được hai ca này là điều
 * kiện để lời chẩn đoán nói đúng chuyện.
 */
export interface AclVerdict {
  action: 'permit' | 'deny'
  seq: number | null
}

/**
 * Địa chỉ có khớp vế địa chỉ của luật không.
 *
 * Bit nào của wildcard bằng 0 thì bit tương ứng phải giống hệt; bit 1 thì
 * bỏ qua. Viết bằng phép XOR rồi che đi phần được bỏ qua.
 */
export function matchesAclAddress(match: AclAddress, ip: Ipv4): boolean {
  return matchesWildcard(match.ip, match.wildcard, ip)
}

function matchesProtocol(rule: AclRule, packet: AclPacket): boolean {
  if (rule.protocol === 'ip') return true
  return rule.protocol === packet.protocol
}

/** Luật này có ăn gói tin đó không (đủ cả ba vế: giao thức, nguồn, đích). */
export function matchesAclRule(rule: AclRule, packet: AclPacket): boolean {
  return (
    matchesProtocol(rule, packet) &&
    matchesAclAddress(rule.src, packet.src) &&
    matchesAclAddress(rule.dst, packet.dst)
  )
}

/**
 * So gói tin với cả danh sách: luật ĐẦU TIÊN khớp là luật quyết định.
 * Không luật nào khớp thì dòng cấm vô hình cuối danh sách ra tay.
 */
export function evaluateAcl(list: AccessList, packet: AclPacket): AclVerdict {
  for (const rule of [...list.rules].sort((a, b) => a.seq - b.seq)) {
    if (matchesAclRule(rule, packet)) return { action: rule.action, seq: rule.seq }
  }
  return { action: 'deny', seq: null }
}

/** Danh sách số này trên router; null nếu router chưa khai. */
export function findAccessList(device: RouterDevice, number: number): AccessList | null {
  return device.accessLists?.find((l) => l.number === number) ?? null
}

/**
 * Danh sách áp lên một cổng theo chiều đã cho; null khi cổng không áp gì
 * HOẶC khi nó áp một số danh sách chưa hề được khai.
 *
 * Ca thứ hai là bệnh thật của nghề: `ip access-group 101 in` trong khi
 * chưa ai viết access-list 101. Thiết bị thật khi đó cho mọi gói đi qua
 * (không có danh sách thì không có gì để cấm), nên ở đây cũng trả null —
 * và người học sẽ ngạc nhiên đúng chỗ đáng ngạc nhiên.
 */
export function aclOnPort(device: RouterDevice, portId: string, direction: AclDirection): AccessList | null {
  const port = device.ports.find((p) => p.id === portId)
  if (port === undefined) return null
  const number = direction === 'in' ? port.aclIn : port.aclOut
  if (number === undefined) return null
  return findAccessList(device, number)
}

// ---------------------------------------------------------------
// Kiểm định cấu trúc
// ---------------------------------------------------------------

/** Lỗi CẤU TRÚC của ACL — dữ liệu không thể tồn tại trên thiết bị thật. */
export type AclProblem =
  | { code: 'bad-acl-number'; deviceId: string; number: number }
  | { code: 'duplicate-acl-number'; deviceId: string; number: number }
  | { code: 'duplicate-acl-seq'; deviceId: string; number: number; seq: number }
  | { code: 'bad-acl-address'; deviceId: string; number: number; seq: number; value: string }
  | { code: 'bad-acl-port'; deviceId: string; number: number; seq: number; port: number }
  | { code: 'acl-port-on-non-tcp'; deviceId: string; number: number; seq: number }
  | { code: 'empty-acl'; deviceId: string; number: number }

export function validateRouterAcls(device: RouterDevice): AclProblem[] {
  const problems: AclProblem[] = []
  const seenNumbers = new Set<number>()

  for (const list of device.accessLists ?? []) {
    if (!Number.isInteger(list.number) || list.number < 1 || list.number > 199) {
      problems.push({ code: 'bad-acl-number', deviceId: device.id, number: list.number })
    }
    if (seenNumbers.has(list.number)) {
      problems.push({ code: 'duplicate-acl-number', deviceId: device.id, number: list.number })
    }
    seenNumbers.add(list.number)

    // Danh sách rỗng KHÔNG phải "không lọc gì": dòng cấm vô hình vẫn ở
    // đó, nên áp nó lên cổng là cấm sạch. Đó gần như luôn là gõ nhầm.
    if (list.rules.length === 0) {
      problems.push({ code: 'empty-acl', deviceId: device.id, number: list.number })
    }

    const seenSeq = new Set<number>()
    for (const rule of list.rules) {
      if (seenSeq.has(rule.seq)) {
        problems.push({ code: 'duplicate-acl-seq', deviceId: device.id, number: list.number, seq: rule.seq })
      }
      seenSeq.add(rule.seq)

      for (const address of [rule.src, rule.dst]) {
        for (const value of [address.ip, address.wildcard]) {
          if (!isValidIpv4(value)) {
            problems.push({ code: 'bad-acl-address', deviceId: device.id, number: list.number, seq: rule.seq, value })
          }
        }
      }

      if (rule.dstPort !== undefined) {
        if (rule.protocol !== 'tcp' && rule.protocol !== 'udp') {
          problems.push({ code: 'acl-port-on-non-tcp', deviceId: device.id, number: list.number, seq: rule.seq })
        }
        if (!Number.isInteger(rule.dstPort) || rule.dstPort < 1 || rule.dstPort > 65535) {
          problems.push({ code: 'bad-acl-port', deviceId: device.id, number: list.number, seq: rule.seq, port: rule.dstPort })
        }
      }
    }
  }

  return problems
}

// ---------------------------------------------------------------
// Cách ghi ra chữ (dùng chung cho show access-lists và running-config)
// ---------------------------------------------------------------

/** Một vế địa chỉ viết theo đúng giọng IOS: any / host x / x wildcard. */
export function aclAddressText(address: AclAddress): string {
  if (address.wildcard === '255.255.255.255' && address.ip === '0.0.0.0') return 'any'
  if (address.wildcard === '0.0.0.0') return `host ${address.ip}`
  return `${address.ip} ${address.wildcard}`
}

/** Một dòng luật viết theo đúng giọng IOS, chưa kèm số đếm. */
export function aclRuleText(rule: AclRule): string {
  const port = rule.dstPort === undefined ? '' : ` eq ${rule.dstPort}`
  return `${rule.action} ${rule.protocol} ${aclAddressText(rule.src)} ${aclAddressText(rule.dst)}${port}`
}
