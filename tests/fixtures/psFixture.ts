// Đề terminal PowerShell mẫu — 4 mảng nội dung của Module 12 (cmdlet
// mạng, tra cứu AD, tạo user hàng loạt, đọc log) + bài xếp nhóm AGDLP
// của Module 19 (spec v2 mục 4.5). Đây là hình dạng dữ liệu các module
// sẽ khai thật; dựng ở đây trước để test engine bám vào đề THẬT chứ
// không đề bịa dễ dãi.

import type { PsSpec } from '../../src/engine/ps/gradePs'
import type { PsWorld } from '../../src/engine/ps/world'

/** Văn phòng quen thuộc của Module 11, nhìn từ máy quản trị viên. */
export const WORLD_VAN_PHONG: PsWorld = {
  hostname: 'MAY-QUAN-TRI',
  interfaces: [{ alias: 'Ethernet0', ip: '192.168.20.5', prefix: 24 }],
  targets: [
    { ip: '192.168.20.80', name: 'web.noibo.vn', pingable: true, openPorts: [80, 443] },
    { ip: '192.168.20.40', name: 'file.noibo.vn', pingable: true, openPorts: [445] },
    { ip: '192.168.20.99', pingable: false, openPorts: [] },
  ],
  ad: {
    domain: 'noibo.vn',
    ous: ['KeToan', 'NhanSu'],
    users: [
      { name: 'Nguyen Van An', sam: 'nvan', ou: 'KeToan', enabled: true },
      { name: 'Tran Thi Binh', sam: 'ttbinh', ou: 'NhanSu', enabled: true },
    ],
  },
  files: {
    // Cột Path chứa DN đầy đủ, bọc nháy kép vì DN có dấu phẩy — ĐÚNG như
    // CSV cho New-ADUser ngoài đời (quy ước cột OU tự chế đã bỏ, hội đồng
    // 2026-08-07: -Path bind ByPropertyName, cột OU thật ra bị lờ đi và
    // user rơi vào CN=Users im lặng).
    'nhan-vien-moi.csv': [
      'Name,SamAccountName,Path',
      'Le Van Cuong,lvcuong,"OU=NhanSu,DC=noibo,DC=vn"',
      'Pham Thi Dung,ptdung,"OU=NhanSu,DC=noibo,DC=vn"',
      'Hoang Van Em,hvem,"OU=NhanSu,DC=noibo,DC=vn"',
    ],
    'router.log': [
      '2026-08-07 08:01:12 INFO  interface Ethernet0 up',
      '2026-08-07 08:14:55 INFO  dhcp lease renewed for 192.168.20.10',
      '2026-08-07 09:02:31 ERROR link down on port 3',
      '2026-08-07 09:02:40 INFO  spanning-tree reconverged',
    ],
  },
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

/** Bài cmdlet mạng: kiểm tra cổng 443 của web nội bộ có mở không. */
export function specTestConnection(): PsSpec {
  return {
    world: clone(WORLD_VAN_PHONG),
    goals: [{ kind: 'tested-connection', ip: '192.168.20.80', port: 443 }],
    solution: ['Test-NetConnection 192.168.20.80 -Port 443'],
  }
}

/** Bài tạo MỘT user đúng OU — bước đệm trước khi làm hàng loạt. */
export function specTaoMotUser(): PsSpec {
  return {
    world: clone(WORLD_VAN_PHONG),
    goals: [{ kind: 'ad-user', sam: 'ltmai', ou: 'KeToan' }],
    solution: ['New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn"'],
  }
}

/** Bài HÀNG LOẠT của spec: bơm cả file CSV vào ống — 3 user mọc ra một nhát. */
export function specTaoHangLoat(): PsSpec {
  return {
    world: clone(WORLD_VAN_PHONG),
    goals: [
      { kind: 'ad-user-count', ou: 'NhanSu', atLeast: 4 },
      { kind: 'ad-user', sam: 'lvcuong', ou: 'NhanSu' },
    ],
    solution: ['Import-Csv nhan-vien-moi.csv | New-ADUser'],
  }
}

/** Bài đọc log: lôi đúng dòng ERROR ra khỏi đống log của router. */
export function specDocLog(): PsSpec {
  return {
    world: clone(WORLD_VAN_PHONG),
    goals: [{ kind: 'found-line', mustContain: 'link down' }],
    solution: ['Get-Content router.log | Select-String ERROR'],
  }
}

/**
 * Miền có sẵn bộ khung AGDLP (M19): nhóm Global gom NGƯỜI theo vai,
 * nhóm DomainLocal gom NHÓM theo quyền. Người mới chuyển phòng chỉ cần
 * vào đúng nhóm Global là quyền tự chảy tới — đó chính là bài học.
 */
export function worldAgdlp(): PsWorld {
  const world = clone(WORLD_VAN_PHONG)
  world.ad!.groups = [
    { name: 'KeToan-GG', scope: 'Global', members: ['nvan'] },
    { name: 'QuyenDocBaoCao-DL', scope: 'DomainLocal', members: ['KeToan-GG'] },
  ]
  return world
}

/**
 * Bài xếp nhóm AGDLP: ttbinh chuyển sang kế toán, phải đọc được báo cáo.
 * CẶP goal ép đúng nếp: vào nhóm Global (chứ không nhét thẳng vào
 * DomainLocal) VÀ quyền phải thật sự chảy tới — goal DL tính cả nhóm
 * lồng nhóm nên lời giải một dòng Add vào GG là đạt cả hai.
 */
export function specXepNhom(): PsSpec {
  return {
    world: worldAgdlp(),
    goals: [
      { kind: 'group-member', group: 'KeToan-GG', sam: 'ttbinh' },
      { kind: 'group-member', group: 'QuyenDocBaoCao-DL', sam: 'ttbinh' },
    ],
    solution: ['Add-ADGroupMember KeToan-GG -Members ttbinh'],
  }
}

export const ALL_PS_SPECS = [specTestConnection, specTaoMotUser, specTaoHangLoat, specDocLog, specXepNhom]
