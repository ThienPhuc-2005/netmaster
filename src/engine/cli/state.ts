// Phiên CLI thiết bị mạng (spec v2 Module 14-17) — trạng thái và chế độ.
//
// THẾ GIỚI CỦA CLI LÀ CHÍNH TOPOLOGY CỦA PHÒNG LAB. Không có thế giới
// riêng, không có bản sao đồng bộ hai chiều: gõ lệnh cấu hình là sửa
// thẳng sơ đồ, và sơ đồ sửa bằng tay thì lệnh `show` thấy ngay. Nhờ vậy
// phòng khám trung cấp khám được bằng CẢ hai terminal (Windows phía máy
// con, CLI phía thiết bị) trên cùng một mạng sống.
//
// CHẾ ĐỘ là bài học, không phải thủ tục phiền hà: người mới luôn gõ lệnh
// cấu hình ở chế độ xem rồi ngơ ngác vì máy từ chối. Ở đây máy từ chối
// đúng như thiết bị thật, bằng đúng câu tiếng Anh thật.
//
// Technical contract: mọi hàm THUẦN, state bất biến.

import type { DeviceId, PortId, Topology } from '../lab/topology'
import { emptyNetState, type NetState } from '../lab/simulate'

/**
 * Năm chế độ đủ cho phạm vi đã đóng băng (spec v2 mục 5.1 liệt kê
 * `router ospf <id>` trong nhóm lệnh chế độ, nên chế độ thứ năm là bắt
 * buộc — thiếu nó thì `network … area 0` không có chỗ để gõ):
 *   user          `Router-1>`                 — chỉ xem
 *   privileged    `Router-1#`                 — xem đủ thứ, vào được cấu hình
 *   config        `Router-1(config)#`         — sửa cấu hình chung
 *   config-if     `Router-1(config-if)#`      — sửa MỘT cổng
 *   config-router `Router-1(config-router)#`  — sửa MỘT tiến trình định tuyến
 */
export type CliMode = 'user' | 'privileged' | 'config' | 'config-if' | 'config-router'

/**
 * DẤU VẾT HÀNH ĐỘNG của phiên — nguyên liệu chấm cho những việc KHÔNG
 * đổi thế giới (nếp `PsFlags` của Module 12).
 *
 * Đề "chẩn đoán bằng lệnh nào" không có gì để nhìn trên sơ đồ: người học
 * chữa đúng chỗ nhờ ĐÃ TRA đúng bảng, và cái chứng minh được điều đó chỉ
 * có thể là chính hành động đã làm.
 */
export interface CliFlags {
  /** Những lệnh `show` đã chạy trót lọt, kèm thiết bị đã chạy trên đó. */
  viewed: { command: string; deviceId: DeviceId }[]
}

export function emptyCliFlags(): CliFlags {
  return { viewed: [] }
}

export interface CliState {
  /** Thiết bị đang ngồi trước mặt — CLI luôn thuộc về đúng một thiết bị. */
  deviceId: DeviceId
  mode: CliMode
  /** Cổng đang cấu hình; chỉ có nghĩa ở chế độ config-if. */
  portId: PortId | null
  /** Tiến trình OSPF đang cấu hình; chỉ có nghĩa ở chế độ config-router. */
  ospfProcessId: number | null
  /** Sơ đồ SỐNG — lệnh cấu hình sửa thẳng vào đây. */
  topology: Topology
  /** Bảng MAC/ARP học được từ các lượt "Gửi thử" của phòng lab. */
  net: NetState
  flags: CliFlags
}

export function initialCliState(topology: Topology, deviceId: DeviceId, net?: NetState): CliState {
  return {
    deviceId,
    mode: 'user',
    portId: null,
    ospfProcessId: null,
    topology,
    net: net ?? emptyNetState(),
    flags: emptyCliFlags(),
  }
}

/**
 * Rút dây console cắm sang thiết bị khác.
 *
 * Sơ đồ và dấu vết hành động đi theo (vẫn một mạng, vẫn một buổi làm
 * việc), nhưng CHẾ ĐỘ về lại `user`: mỗi lần ngồi xuống một thiết bị mới
 * là phải `enable` lại từ đầu, đúng như đời thật. Bài "dựng trunk hai
 * switch" đi qua đúng cửa này.
 */
export function moveCliConsole(state: CliState, deviceId: DeviceId): CliState {
  return { ...state, deviceId, mode: 'user', portId: null, ospfProcessId: null }
}

/** Tên thiết bị đứng trước dấu nhắc; id làm dự phòng nếu thiếu hostname. */
export function cliHostname(state: CliState): string {
  const device = state.topology.devices.find((d) => d.id === state.deviceId)
  return device?.hostname ?? state.deviceId
}

/** Dấu nhắc đúng hình dạng IOS — người học đọc nó để biết mình đang ở đâu. */
export function cliPrompt(state: CliState): string {
  const host = cliHostname(state)
  switch (state.mode) {
    case 'user':
      return `${host}>`
    case 'privileged':
      return `${host}#`
    case 'config':
      return `${host}(config)#`
    case 'config-if':
      return `${host}(config-if)#`
    case 'config-router':
      return `${host}(config-router)#`
  }
}

/** Chế độ này có xem được lệnh `show` không (config mode thì không). */
export function canShow(mode: CliMode): boolean {
  return mode === 'user' || mode === 'privileged'
}
