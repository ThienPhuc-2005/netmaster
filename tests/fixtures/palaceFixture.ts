// Cung điện ký ức mẫu cho test (spec Module 5 — tòa nhà 15 phòng).
//
// Đây là hình dạng dữ liệu mà module-05.json khai thật. Fixture cố tình
// dùng ĐÚNG 15 port của spec để test cũng là một lần kiểm rằng danh sách
// ấy nhét vừa tòa nhà 5 tầng × 3 phòng.
//
// Lộ trình đọc được thành câu chuyện: tầng 1 là sảnh (chuyện ra vào web),
// tầng 2 là phòng điều khiển từ xa, tầng 3 là kho chứa, tầng 4 là phòng
// thư từ và giờ giấc, tầng 5 là phòng sổ sách của tòa nhà.

import type { Palace, PalaceRoom } from '../../src/engine/palace'

function room(
  id: string,
  floor: number,
  position: number,
  keys: string[],
  name: string,
  nameAliases: string[],
  imageId: string,
  storyVi: string,
  noteVi?: string,
): PalaceRoom {
  return {
    id,
    floor,
    position,
    keys,
    name,
    nameAliases,
    imageId,
    story: { vi: storyVi },
    ...(noteVi !== undefined ? { note: { vi: noteVi } } : {}),
  }
}

const TCP = 'Chạy trên TCP'
const UDP = 'Chạy trên UDP'

export const PORT_PALACE: Palace = {
  id: 'palace-port',
  title: { vi: 'Tòa nhà 15 phòng' },
  floors: 5,
  roomsPerFloor: 3,
  keyStyle: 'number',
  keyLabel: { vi: 'Số cổng' },
  nameLabel: { vi: 'Dịch vụ' },
  keyPlaceholder: { vi: 'ví dụ 443' },
  namePlaceholder: { vi: 'ví dụ HTTPS' },
  keyHint: { vi: 'con số ghi trên cửa' },
  nameHint: { vi: 'việc người ta làm trong phòng' },
  rooms: [
    room('r-http', 1, 1, ['80'], 'HTTP', ['web thường'], 'palace-door-open',
      'Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.', TCP),
    room('r-https', 1, 2, ['443'], 'HTTPS', ['web bảo mật'], 'palace-golden-lock',
      'Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.', TCP),
    room('r-dns', 1, 3, ['53'], 'DNS', ['phân giải tên miền'], 'palace-phonebook',
      'Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.', UDP),

    room('r-ssh', 2, 1, ['22'], 'SSH', ['secure shell'], 'palace-seashell',
      'Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.', TCP),
    room('r-telnet', 2, 2, ['23'], 'Telnet', [], 'palace-glass-wall',
      'Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.', TCP),
    room('r-rdp', 2, 3, ['3389'], 'RDP', ['remote desktop'], 'palace-mirror-screen',
      'Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.', TCP),

    room('r-smb', 3, 1, ['445'], 'SMB', ['chia sẻ thư mục windows'], 'palace-shared-drive',
      'Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.', TCP),
    room('r-ftp', 3, 2, ['21'], 'FTP', ['truyền tệp'], 'palace-conveyor',
      'Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.', TCP),
    room('r-mysql', 3, 3, ['3306'], 'MySQL', ['cơ sở dữ liệu'], 'palace-file-cabinet',
      'Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.', TCP),

    room('r-smtp', 4, 1, ['25'], 'SMTP', ['chuyển thư giữa các máy chủ'], 'palace-mailbox',
      'Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.', TCP),
    room('r-submission', 4, 2, ['587'], 'Mail Submission', ['gửi thư có đăng nhập'], 'palace-id-check',
      'Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.', TCP),
    room('r-ntp', 4, 3, ['123'], 'NTP', ['đồng bộ giờ'], 'palace-big-clock',
      'Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.', UDP),

    room('r-ldap', 5, 1, ['389'], 'LDAP', ['tra cứu người dùng'], 'palace-registry-book',
      'Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.', TCP),
    room('r-ldaps', 5, 2, ['636'], 'LDAPS', ['sổ hộ khẩu có mã hóa'], 'palace-safe-book',
      'Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.', TCP),
    room('r-dhcp', 5, 3, ['67', '68'], 'DHCP', ['cấp địa chỉ tự động'], 'palace-key-pair',
      'Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.', UDP),
  ],
}

/**
 * Tòa nhà GPO 4 tầng × 1 phòng (spec Module 9): chuỗi LSDOU đi từ tầng
 * trệt lên — Local → Site → Domain → OU, đúng thứ tự áp dụng GPO. Đây
 * là hình dạng dữ liệu mà module-09.json sẽ khai thật, và là ca kiểm
 * "cung điện chữ" (keyStyle 'text') của engine tổng quát.
 */
export const GPO_PALACE: Palace = {
  id: 'palace-gpo',
  title: { vi: 'Tòa nhà 4 tầng LSDOU' },
  floors: 4,
  roomsPerFloor: 1,
  keyStyle: 'text',
  keyLabel: { vi: 'Bậc GPO' },
  nameLabel: { vi: 'Bậc này áp cho' },
  keyPlaceholder: { vi: 'ví dụ Local' },
  rooms: [
    room('r-local', 1, 1, ['Local'], 'chính máy đó', ['máy cục bộ', 'local computer'], 'gpo-house-rules',
      'Tầng trệt Local: tấm bảng nội quy dán ngay cửa nhà — luật của riêng máy đó, chưa ai ngoài nhìn thấy.'),
    room('r-site', 2, 1, ['Site'], 'cả văn phòng một chỗ', ['một site', 'chi nhánh'], 'gpo-office-floor',
      'Tầng hai Site: bảng tin của cả tòa văn phòng — máy nào ngồi trong tòa này đều phải đọc.'),
    room('r-domain', 3, 1, ['Domain'], 'toàn công ty', ['cả miền', 'toàn miền'], 'gpo-company-flag',
      'Tầng ba Domain: lá cờ công ty treo giữa sảnh — luật chung cho mọi máy đã gia nhập miền.'),
    room('r-ou', 4, 1, ['OU'], 'từng phòng ban', ['đơn vị tổ chức', 'organizational unit'], 'gpo-department-door',
      'Tầng nóc OU: cửa từng phòng ban có luật riêng — áp SAU CÙNG nên thắng hết các tầng dưới.'),
  ],
}

/** Bản sao sâu để test sửa được mà không đụng vào fixture gốc. */
export function clonePalace(palace: Palace = PORT_PALACE): Palace {
  return {
    ...palace,
    rooms: palace.rooms.map((r) => ({
      ...r,
      keys: [...r.keys],
      nameAliases: [...r.nameAliases],
      story: { ...r.story },
      ...(r.note !== undefined ? { note: { ...r.note } } : {}),
    })),
  }
}

/** Câu trả lời đúng của một phòng — dùng để đi hết chuyến trong test. */
export function correctAnswer(room: PalaceRoom): { keys: string[]; name: string } {
  return { keys: [...room.keys], name: room.name }
}
