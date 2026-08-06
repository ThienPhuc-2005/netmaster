// Mô hình BỆNH NHÂN của Phòng khám mạng (spec Module 11).
//
// Quyết định kiến trúc đã chốt với người dùng: engine phòng khám BỌC
// engine lab chứ không mở rộng nó. Một ca bệnh gồm:
//
//   - `topology`: mạng của bệnh nhân — dùng NGUYÊN mô hình lab
//     (src/engine/lab). Mọi bệnh diễn đạt được bằng topology (rút dây,
//     sai gateway, trùng IP, sai VLAN…) thì nằm ở đây, và ping/tracert
//     chạy bằng đúng simulatePing — lab engine không sửa một dòng nào,
//     phạm vi mô phỏng đã đóng băng giữ nguyên.
//   - `overlay` ("hồ sơ bệnh"): những thứ lab KHÔNG mô hình — bảng DNS,
//     dịch vụ DNS chết, luật chặn trên máy (GPO/tường lửa chặn nhầm),
//     bảng kết nối cho netstat, danh sách GPO cho gpresult. Overlay là
//     DỮ LIỆU khai theo từng ca; engine phòng khám tự diễn giải, không
//     đẩy trách nhiệm sang lab.
//
// Người học ngồi ở MỘT máy (`seatId`) và chỉ nhìn mạng qua terminal —
// đúng cảnh đi làm: không ai được nhìn sơ đồ chuẩn của mạng đang hỏng.
//
// Technical contract: thuần — không đồng hồ, không random, không mutate.

import {
  deviceOwningIp,
  findDevice,
  isValidIpv4,
  validateTopology,
  type DeviceId,
  type Ipv4,
  type Topology,
} from '../lab/topology'

/** Một dòng trong bảng DNS mà resolver của mạng này biết. */
export interface DnsRecord {
  name: string
  ip: Ipv4
}

/** Một dòng kết quả netstat — dữ liệu khai theo ca, không mô phỏng TCP thật. */
export interface NetstatRow {
  proto: 'TCP' | 'UDP'
  /** ví dụ "0.0.0.0:445" */
  local: string
  /** ví dụ "203.0.113.9:51344" hoặc "*:*" */
  remote: string
  /** ví dụ "LISTENING" | "ESTABLISHED" | "" (UDP không có state) */
  state: string
}

/** Luật chặn ICMP ngay trên một máy — mô hình của ca "GPO/tường lửa chặn nhầm". */
export interface HostBlock {
  deviceId: DeviceId
  /**
   * Chiều bị chặn: 'inbound' = máy này nuốt ping TỚI nó (mạng thông mà
   * nó câm); 'outbound' = máy này không gửi được ping ĐI (General
   * failure ngay tại chỗ dù mạng khỏe — ca GPO chặn nhầm kinh điển,
   * gpresult tại chính máy lôi thủ phạm ra ánh sáng).
   */
  direction: 'inbound' | 'outbound'
  /** Nguồn của luật — quyết định lệnh nào lôi nó ra ánh sáng (gpresult vs xem tường lửa). */
  source: 'gpo' | 'firewall'
  /** Tên luật/GPO — hiện trong gpresult, là manh mối người học phải tự nối. */
  ruleName: string
}

/** GPO đang áp trên một máy (cho lệnh gpresult của ca liên quan Module 9). */
export interface AppliedGpo {
  name: string
  /** true = GPO này chính là thủ phạm chặn (để schema ép ruleName khớp). */
  blocking?: true
}

/**
 * Hồ sơ bệnh — phần mạng mà lab engine không mô hình. MỌI trường đều
 * tùy chọn: ca đơn giản (rút dây) chỉ cần topology, overlay rỗng.
 */
export interface ClinicOverlay {
  dns?: {
    /** IP của DNS server — PHẢI là IP một thiết bị trong topology (schema ép). */
    serverIp: Ipv4
    records: DnsRecord[]
    /** Dịch vụ DNS chết: nslookup/resolve timeout — nhưng ping tới IP server vẫn theo topology. */
    down?: true
  }
  /** Các máy có luật chặn ICMP đến (ping tới nó bị nuốt dù mạng thông). */
  hostBlocks?: HostBlock[]
  /** Bảng kết nối đang mở theo máy — cho netstat. */
  connections?: Record<DeviceId, NetstatRow[]>
  /** GPO đang áp theo máy — cho gpresult. */
  gpos?: Record<DeviceId, AppliedGpo[]>
}

/**
 * Triệu chứng chính của ca — diễn đạt KHAI BÁO để schema ép được
 * "bệnh có thật": chạy triệu chứng trên trạng thái đầu PHẢI ra đúng
 * kết quả hỏng như lời than. Bệnh nhân không ốm là đề bài nói dối.
 */
export type ClinicSymptom =
  /** Ping (tới IP hoặc tên miền — tên thì đi qua DNS trước) phải HỎNG ở trạng thái đầu. */
  | { kind: 'ping-fails'; from: DeviceId; target: string }
  /** Phân giải tên phải HỎNG (DNS chết / thiếu bản ghi) dù mạng có thể vẫn thông. */
  | { kind: 'resolve-fails'; from: DeviceId; name: string }
  /**
   * IP đích đang bị GIÀNH bởi nhiều máy (bệnh trùng IP): dịch vụ lúc
   * được lúc không, MAC trong ARP đổi giữa hai lượt ping. "Ốm" nghĩa là
   * còn từ hai chủ trở lên cùng giữ IP đó.
   */
  | { kind: 'ping-flaps'; from: DeviceId; target: string }

/** Bệnh nhân: mạng + hồ sơ bệnh + chỗ ngồi của người học. */
export interface ClinicPatient {
  topology: Topology
  overlay: ClinicOverlay
  /** Máy người học ngồi — terminal chạy từ đây; phải là PC có trong topology. */
  seatId: DeviceId
}

// ---------------------------------------------------------------
// Kiểm cấu trúc — lỗi của NGƯỜI SOẠN BÀI, không phải bệnh của ca
// ---------------------------------------------------------------

export interface PatientProblem {
  code:
    | 'topology-invalid'
    | 'seat-not-found'
    | 'seat-not-pc'
    | 'dns-server-ip-unowned'
    | 'dns-record-ip-invalid'
    | 'block-device-not-found'
    | 'gpo-device-not-found'
    | 'block-gpo-unlisted'
  where: string
}

/**
 * Phân biệt rạch ròi như lab: lỗi CẤU TRÚC (khai sai dữ liệu — chặn ở
 * đây) khác lỗi CẤU HÌNH (mạng hỏng có chủ đích — chính là bài học).
 * Trùng IP, thiếu gateway, thiếu dây… là BỆNH hợp lệ, không phải lỗi.
 */
export function validatePatient(patient: ClinicPatient): PatientProblem[] {
  const problems: PatientProblem[] = []
  const { topology, overlay, seatId } = patient

  // Lưu ý: validateTopology coi trùng-MAC là lỗi cấu trúc nhưng trùng-IP
  // thì không — đúng ý phòng khám (trùng IP là một ca bệnh của spec).
  for (const p of validateTopology(topology)) {
    problems.push({ code: 'topology-invalid', where: JSON.stringify(p) })
  }

  const seat = findDevice(topology, seatId)
  if (seat === null) problems.push({ code: 'seat-not-found', where: seatId })
  else if (seat.kind !== 'pc') problems.push({ code: 'seat-not-pc', where: seatId })

  if (overlay.dns !== undefined) {
    if (deviceOwningIp(topology, overlay.dns.serverIp) === null) {
      problems.push({ code: 'dns-server-ip-unowned', where: overlay.dns.serverIp })
    }
    for (const record of overlay.dns.records) {
      if (!isValidIpv4(record.ip)) {
        problems.push({ code: 'dns-record-ip-invalid', where: `${record.name} → ${record.ip}` })
      }
    }
  }

  for (const block of overlay.hostBlocks ?? []) {
    if (findDevice(topology, block.deviceId) === null) {
      problems.push({ code: 'block-device-not-found', where: block.deviceId })
    }
    // Luật chặn nguồn GPO phải hiện ra được dưới ánh đèn gpresult: máy bị
    // chặn phải có danh sách GPO chứa đúng tên luật, đánh dấu blocking.
    if (block.source === 'gpo') {
      const gpos = overlay.gpos?.[block.deviceId] ?? []
      if (!gpos.some((g) => g.name === block.ruleName && g.blocking === true)) {
        problems.push({ code: 'block-gpo-unlisted', where: `${block.deviceId}/${block.ruleName}` })
      }
    }
  }

  for (const deviceId of Object.keys(overlay.gpos ?? {})) {
    if (findDevice(topology, deviceId) === null) {
      problems.push({ code: 'gpo-device-not-found', where: deviceId })
    }
  }

  return problems
}

/** Các thiết bị cùng giữ một IP — nguyên liệu của ca "trùng IP". */
export function ipOwners(topology: Topology, ip: Ipv4): DeviceId[] {
  const owners: DeviceId[] = []
  for (const device of topology.devices) {
    if (device.kind === 'pc') {
      if (device.ipConfig?.ip === ip) owners.push(device.id)
    } else if (device.kind === 'router') {
      if (device.ports.some((p) => p.ipConfig?.ip === ip)) owners.push(device.id)
    }
  }
  return owners
}

/** Máy đang bị luật chặn ICMP? Trả về luật để terminal kể đúng nguồn. */
export function hostBlockOf(overlay: ClinicOverlay, deviceId: DeviceId): HostBlock | null {
  return (overlay.hostBlocks ?? []).find((b) => b.deviceId === deviceId) ?? null
}
