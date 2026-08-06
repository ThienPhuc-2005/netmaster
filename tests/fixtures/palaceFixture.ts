// Cung điện ký ức mẫu cho test (spec Module 5 — tòa nhà 15 phòng).
//
// Đây là hình dạng dữ liệu mà module-05.json sẽ khai thật ở khối nội
// dung. Fixture cố tình dùng ĐÚNG 15 port của spec để test cũng là một
// lần kiểm rằng danh sách ấy nhét vừa tòa nhà 5 tầng × 3 phòng.
//
// Lộ trình đọc được thành câu chuyện: tầng 1 là sảnh (chuyện ra vào web),
// tầng 2 là phòng điều khiển từ xa, tầng 3 là kho chứa, tầng 4 là phòng
// thư từ và giờ giấc, tầng 5 là phòng sổ sách của tòa nhà.

import type { Palace, PalaceRoom } from '../../src/engine/palace'

function room(
  id: string,
  floor: number,
  position: number,
  ports: number[],
  transport: PalaceRoom['transport'],
  service: string,
  serviceAliases: string[],
  imageId: string,
  storyVi: string,
): PalaceRoom {
  return { id, floor, position, ports, transport, service, serviceAliases, imageId, story: { vi: storyVi } }
}

export const PORT_PALACE: Palace = {
  id: 'palace-port',
  title: { vi: 'Tòa nhà 15 phòng' },
  rooms: [
    room('r-http', 1, 1, [80], 'tcp', 'HTTP', ['web thường'], 'palace-door-open',
      'Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.'),
    room('r-https', 1, 2, [443], 'tcp', 'HTTPS', ['web bảo mật'], 'palace-golden-lock',
      'Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.'),
    room('r-dns', 1, 3, [53], 'udp', 'DNS', ['phân giải tên miền'], 'palace-phonebook',
      'Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.'),

    room('r-ssh', 2, 1, [22], 'tcp', 'SSH', ['secure shell'], 'palace-seashell',
      'Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.'),
    room('r-telnet', 2, 2, [23], 'tcp', 'Telnet', [], 'palace-glass-wall',
      'Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.'),
    room('r-rdp', 2, 3, [3389], 'tcp', 'RDP', ['remote desktop'], 'palace-mirror-screen',
      'Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.'),

    room('r-smb', 3, 1, [445], 'tcp', 'SMB', ['chia sẻ thư mục windows'], 'palace-shared-drive',
      'Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.'),
    room('r-ftp', 3, 2, [21], 'tcp', 'FTP', ['truyền tệp'], 'palace-conveyor',
      'Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.'),
    room('r-mysql', 3, 3, [3306], 'tcp', 'MySQL', ['cơ sở dữ liệu'], 'palace-file-cabinet',
      'Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.'),

    room('r-smtp', 4, 1, [25], 'tcp', 'SMTP', ['chuyển thư giữa các máy chủ'], 'palace-mailbox',
      'Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.'),
    room('r-submission', 4, 2, [587], 'tcp', 'Mail Submission', ['gửi thư có đăng nhập'], 'palace-id-check',
      'Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.'),
    room('r-ntp', 4, 3, [123], 'udp', 'NTP', ['đồng bộ giờ'], 'palace-big-clock',
      'Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.'),

    room('r-ldap', 5, 1, [389], 'tcp', 'LDAP', ['tra cứu người dùng'], 'palace-registry-book',
      'Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.'),
    room('r-ldaps', 5, 2, [636], 'tcp', 'LDAPS', ['sổ hộ khẩu có mã hóa'], 'palace-safe-book',
      'Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.'),
    room('r-dhcp', 5, 3, [67, 68], 'udp', 'DHCP', ['cấp địa chỉ tự động'], 'palace-key-pair',
      'Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.'),
  ],
}

/** Bản sao sâu để test sửa được mà không đụng vào fixture gốc. */
export function clonePalace(palace: Palace = PORT_PALACE): Palace {
  return {
    ...palace,
    rooms: palace.rooms.map((r) => ({ ...r, ports: [...r.ports], serviceAliases: [...r.serviceAliases], story: { ...r.story } })),
  }
}

/** Câu trả lời đúng của một phòng — dùng để đi hết chuyến trong test. */
export function correctAnswer(room: PalaceRoom): { ports: number[]; service: string } {
  return { ports: [...room.ports], service: room.service }
}
