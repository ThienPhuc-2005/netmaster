// So địa chỉ bằng WILDCARD MASK — dùng chung cho ACL và OSPF.
//
// Hai nơi ấy đều hỏi đúng một câu: "địa chỉ này có nằm trong vùng mà tôi
// khai không?", và cả hai đều dùng mặt nạ lộn ngược của Module 13. Tách
// ra một chỗ để chúng không bao giờ trôi khỏi nhau.
//
// Luật: bit nào của wildcard bằng 0 thì bit tương ứng PHẢI giống hệt;
// bit 1 thì bỏ qua. Viết bằng XOR rồi che đi phần được bỏ qua.

import { ipToInt } from '../subnet/ipv4'
import type { Ipv4 } from './topology'

export function matchesWildcard(base: Ipv4, wildcard: Ipv4, ip: Ipv4): boolean {
  const care = ~ipToInt(wildcard) >>> 0
  return (((ipToInt(ip) ^ ipToInt(base)) >>> 0) & care) === 0
}
