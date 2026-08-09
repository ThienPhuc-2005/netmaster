# Kế hoạch nâng cấp: nhập môn → trung cấp

Soạn: 2026-08-08. Trạng thái: **ĐÃ DUYỆT (chủ dự án, 08-08).**
Khối 11.1 đã chạy: `SPEC-TRUNG-CAP.md` (spec v2) đã viết, đang chờ duyệt
spec — trong đó có 5 quyết định trình kèm đề xuất (spec mục 7). Duyệt
spec xong mới code. Kế hoạch này là lộ trình; spec là nguồn chân lý.

## 0. Ba quyết định đã chốt (chủ dự án, 08-08)

1. **Cả hai nhánh, hạ tầng trước:** Phần D = hạ tầng mạng (trunk, STP,
   OSPF, ACL), Phần E = quản trị hệ thống (AD sâu, giám sát). Đúng thứ
   tự nghề thật, và engine mở cho Phần D được phòng khám Phần E dùng lại.
2. **Có CLI thiết bị** — engine terminal mới, dạng câu hỏi thứ TÁM
   (`kind: 'cli'`). Cú pháp theo chuẩn công nghiệp (kiểu IOS) vì đó là
   kỹ năng mang đi xin việc được; cỡ việc ngang engine PowerShell.
3. **Quy mô đủ: 9 module mới** (M13-M21), chia hai phần, kết bằng một
   module capstone tổng ôn.

## 1. Người học sau trung cấp làm được gì

Sau M12 (nhập môn), người học HIỂU mạng và sửa được mạng nhỏ. Sau M21
(trung cấp), họ phải:

- **Thiết kế** dải địa chỉ cho một văn phòng nhiều phòng ban (VLSM),
  không chỉ đọc hiểu một dải cho sẵn.
- **Cấu hình bằng lệnh** switch/router ảo: trunk, VLAN, tuyến tĩnh,
  OSPF cơ bản, ACL — gõ CLI thật chứ không chỉ bấm chọn.
- **Chẩn đoán liên tầng**: ca bệnh trộn trunk sai native VLAN + DNS +
  ACL trong cùng một mạng — đúng cảnh helpdesk lên tier 2.
- **Vận hành hệ thống nhỏ**: DHCP/DNS doanh nghiệp có dự phòng, AD
  nhiều site, đọc log tập trung để tìm sự cố.

## 2. Danh sách module

### Phần D — Hạ tầng mạng trung cấp (M13-M17)

| # | Module | Khái niệm chính | Chiêu sư phạm | Engine cần |
|---|--------|-----------------|----------------|-----------|
| M13 | VLSM & thiết kế dải địa chỉ | VLSM, wildcard mask, tóm tắt tuyến, quy hoạch theo phòng ban | Drill VLSM mới (nối drill subnet M3); bài tập THIẾT KẾ chứ không chỉ tính | Mở rộng drill engine (S-M), không đụng lab |
| M14 | Trunk 802.1Q & định tuyến giữa VLAN | Tagged frame, native VLAN, allowed list, router-on-a-stick | **CLI ra mắt** ở bước Đoán thử (mò lệnh show trước khi học); lab sửa-trunk-hỏng | Lab mở TRUNK; CLI engine (show + switchport) |
| M15 | STP & vòng lặp lớp 2 | Broadcast storm, BPDU, root bridge, cổng block, PortFast | Productive failure: RÚT một dây tạo vòng → xem storm (mã `broadcast-storm` engine ĐÃ có sẵn) → bật STP cứu mạng | Lab thêm STP-lite; CLI `show spanning-tree` |
| M16 | OSPF cơ bản | Static vs dynamic, neighbor, hello, cost, area 0 | **Cung điện mới: 7 trạng thái neighbor** (Down→Init→2-Way→ExStart→Exchange→Loading→Full — dùng cung điện tổng quát hóa sẵn có, keyStyle text); lab: rút dây thấy OSPF tự tìm đường vòng | Lab thêm OSPF-lite; CLI `router ospf`/`network`/`show ip ospf neighbor` |
| M17 | ACL & bảo mật lớp 2 | ACL standard/extended, chiều in/out, port security, ARP spoofing | Ca bệnh "ACL chặn nhầm cả sếp" — nối thẳng tường lửa M7; ARP spoofing nối ca trùng-IP M11 | Lab thêm ACL; CLI `access-list`/`ip access-group` |

### Phần E — Quản trị hệ thống trung cấp (M18-M21)

| # | Module | Khái niệm chính | Chiêu sư phạm | Engine cần |
|---|--------|-----------------|----------------|-----------|
| M18 | DHCP/DNS doanh nghiệp | DHCP relay/helper, scope/failover, split DNS, forwarder | Chuyện hỏi cưới DORA quay lại nhưng "làng có nhiều xóm" (relay); ca bệnh scope cạn | Overlay clinic mở rộng nhẹ (relay, scope) — KHÔNG sim DHCP đầy đủ |
| M19 | AD nhiều site & ủy quyền | Site/subnet gắn AD, replication, AGDLP, delegation | Nối LSDOU M9: tòa GPO có thêm "tầng site" giờ mới có nghĩa thật; PS thêm cảnh tra sổ đa site | Tận dụng PS engine; thêm 1-2 cmdlet đọc (chốt khi viết spec) |
| M20 | Giám sát & nhật ký tập trung | Syslog, mức severity, SNMP khái niệm, đọc log nhiều nguồn | Generation effect: lôi sự cố ra từ log 200 dòng bằng pipeline PS (nối M12); "cảnh báo giả" là distractor thật | File log lớn hơn trong PS world — engine sẵn |
| M21 | Capstone: dựng mạng chi nhánh | Tổng hợp toàn khóa | Một đề lab LỚN (VLSM → trunk → OSPF → ACL → kiểm chứng bằng CLI + terminal Windows) + bài thi phòng khám ca liên tầng | Không engine mới — đây là bài kiểm tra của mọi thứ đã mở |

Chuỗi mở khóa nối tiếp: đậu M12 mở M13, tuyến tính như cũ. **Học vượt
sẵn có** chính là cửa cho người ngoài nhảy thẳng vào trung cấp — không
cần làm gì thêm.

## 3. Bốn gói engine (thứ tự làm)

### Gói 1 — Mở phạm vi mô phỏng lớp 2 (`engine/lab/`)

Phạm vi đóng băng cũ (không trunk, không STP) là ĐÚNG cho nhập môn; giờ
mở CÓ KIỂM SOÁT và đóng băng lại ở mốc mới:

- **Trunk 802.1Q**: cổng switch thêm `mode: access | trunk`, allowed
  VLANs, native VLAN. Khung đi qua trunk giữ tag; native VLAN sai lệch
  hai đầu là ca bệnh kinh điển phải mô phỏng được.
- **STP-lite**: tính cổng bị block TẤT ĐỊNH từ bridge priority + MAC
  (không mô phỏng timer/hội tụ theo thời gian). Không bật STP + có vòng
  → `broadcast-storm` (mã đã có). Bật STP → mạng sống, rút dây chính →
  cổng block tự mở.
- **Phạm vi đóng băng MỚI đề xuất**: vẫn KHÔNG VTP, KHÔNG EtherChannel,
  KHÔNG RSTP/MST (chỉ một STP), KHÔNG QinQ. Ghi đầu `topology.ts` như
  ba đơn giản hóa cũ.

### Gói 2 — CLI thiết bị (`src/engine/cli/` — dạng câu hỏi thứ 8)

Học đúng nếp PS engine đã thành công:

- **Thế giới = chính topology lab** (không bịa thế giới riêng — CLI và
  lab nhìn cùng một mạng, sửa bằng lệnh thì sơ đồ đổi theo và ngược lại).
- **Chấm theo HIỆU ỨNG + dấu vết** (như gradeLab/gradePs): trunk mọc
  đúng allowed list là đạt, không so chuỗi lệnh.
- **Danh sách lệnh ĐÓNG BĂNG ~20 lệnh** (chốt chính xác khi viết spec):
  - Chế độ: `enable`, `configure terminal`, `interface <id>`, `exit`, `end`
  - Show: `show vlan brief`, `show mac address-table`,
    `show interfaces trunk`, `show ip interface brief`, `show ip route`,
    `show ip ospf neighbor`, `show spanning-tree`, `show running-config`
  - Cấu hình: `vlan <n>`, `switchport mode access|trunk`,
    `switchport access vlan`, `switchport trunk allowed vlan`,
    `switchport trunk native vlan`, `ip address`, `no shutdown`,
    `ip route`, `router ospf <id>` + `network ... area 0`,
    `access-list` + `ip access-group`
  - KHÔNG scriptblock/alias/tab-completion "thông minh" — cùng triết lý
    "quá một dấu ống là lỗi có chủ đích" của PS.
- Output tiếng Anh nghề tất định trong `<pre>`; microcopy VI ở i18n —
  ranh giới chuỗi ba tầng giữ nguyên.
- `lessonMachine.ts` KHÔNG biết CLI tồn tại — `cliInPipeline.test` sẽ là
  lần khóa thứ NĂM của bất biến này.

### Gói 3 — Router nâng cao (`engine/lab/`)

- **ACL**: luật permit/deny theo src/dst/port gắn vào cổng router theo
  chiều in/out; `simulatePing` trả mã chẩn đoán mới (`acl-denied` kèm
  luật nào ăn) — nhật ký chặng vẫn là tải trọng sư phạm.
- **OSPF-lite**: mô phỏng KẾT QUẢ hội tụ, không mô phỏng giao thức theo
  thời gian: neighbor lên khi hai cổng cùng subnet + cùng area khai
  đúng; bảng định tuyến suy từ đồ thị cost. Tất định 100% — test được.

### Gói 4 — Drill VLSM (`engine/subnet/`)

Mở rộng drill hiện có: đề bài "chia dải X cho các phòng N người", chấm
theo đúng/đủ/không lãng phí. Schema `drill` từ literal `'subnet'` thành
enum — thay đổi nhỏ có cửa migrate nội dung.

## 4. Trình tự hạng mục & khối

Nhịp làm giữ như cũ: mỗi khối một lượt làm việc trọn vẹn, xong hẳn mới
sang khối sau, DoD + test + browser check từng khối.

| Hạng mục | Khối | Nội dung | Phụ thuộc |
|----------|------|----------|-----------|
| (11) Spec v2 | 11.1 | Viết `SPEC-TRUNG-CAP.md`: chi tiết 9 module, chốt danh sách lệnh CLI, phạm vi đóng băng mới, DoD trung cấp. **Chủ dự án duyệt xong mới code.** | — |
| (12) Lab lớp 2 | 12.1-12.3 | Engine trunk → engine STP-lite → UI lab (cổng trunk trên canvas, chip mode) | 11 |
| (13) CLI thiết bị | 13.1-13.4 | World+interpreter (show) → lệnh cấu hình + gradeCli → `kind:'cli'` vào pipeline + UI console → /design + review script | 11 (nội dung lệnh), 12 (trunk để lệnh có tác dụng) |
| (14) M13 VLSM | 14.1-14.2 | Drill VLSM engine → nội dung module-13.json | 11 (có thể làm SONG SONG 12-13 vì không đụng lab) |
| (15) M14-M15 | 15.1-15.2 | Nội dung trunk → nội dung STP (mỗi module 12 câu pool + hình + ca bệnh) | 12, 13 |
| (16) Router nâng cao | 16.1-16.2 | Engine ACL → engine OSPF-lite | 12 |
| (17) M16-M17 | 17.1-17.2 | Nội dung OSPF (cung điện 7 trạng thái) → nội dung ACL/bảo mật lớp 2 | 13, 16 |
| (18) Phần E | 18.1-18.3 | M18 DHCP/DNS doanh nghiệp → M19 AD đa site → M20 giám sát/log | 11 (ít phụ thuộc engine mới) |
| (19) Capstone | 19.1 | M21: đề lab lớn + bài thi liên tầng + màn kết CẢ KHÓA trung cấp | tất cả |
| (20) Khép | 20.1 | DoD toàn phần, kịch bản test người thật trung cấp, triệu tập hội đồng chấm nội dung mới | 19 |

Ước lượng thô: **~20 khối** (mỗi khối một lượt làm việc). Đường găng là
gói CLI engine; M13 làm song song được để có sản phẩm sớm.

## 5. Bất biến GIỮ NGUYÊN — không thương lượng

- 5 nguyên tắc sư phạm, pipeline 6 bước, mastery gate 85%, không skip.
- Mỗi module mới: **pool >= 12 câu rút 8**, câu TRỤ (lab/cli/clinic/
  palace/ps) luôn vào đề — `isAnchorQuestion` thêm `'cli'`.
- Nội dung là data (JSON), engine không biết module id; thêm dạng câu
  hỏi = thêm nhánh QuestionSchema, `lessonMachine` không sửa.
- XP chỉ từ retrieval/lab lần đầu; "Gửi thử"/gõ lệnh miễn phí, "Nộp bài"
  tính lượt; màn rớt không rò đáp án; học vượt sinh đủ thẻ SM-2.
- Engine thuần TS, thời gian bơm từ ngoài; persist đổi shape là bump
  version + bậc migrate mới; không tracking, không CDN, offline trọn vẹn.
- Ranh giới chuỗi: output máy tiếng Anh nguyên văn, microcopy VI qua
  i18n, nội dung bài học qua LText.

## 6. Câu hỏi sẽ chốt TRONG spec (khối 11.1, trình từng cái)

1. Danh sách lệnh CLI cuối cùng (~20 lệnh trên là đề xuất).
2. M19 có thêm cmdlet PS mới không, thêm những cái nào (phạm vi PS đang
   đóng băng 8 cmdlet — mở là phải chốt lại mốc đóng băng).
3. Cung điện M16 (7 trạng thái OSPF): đi xem ở bài nào, đi lại ở bài nào.
4. Capstone M21 chấm kiểu gì: một đề lab nhiều mục tiêu, hay chuỗi đề?
5. Có màn "tốt nghiệp trung cấp" riêng không (nối câu hỏi màn kết CẢ
   KHÓA đang chờ quyết từ biên bản hội đồng).

## 7. Rủi ro & cách đỡ

- **Scope creep mô phỏng** (rủi ro lớn nhất — STP/OSPF là hố không đáy):
  đỡ bằng phạm vi đóng băng MỚI ghi trong spec ngay khối 11.1, mọi
  "tiện tay mở thêm" bị luật chống hạ cấp/mở rộng chặn.
- **Độ chính xác kỹ thuật cao hơn hẳn nhập môn** (native VLAN, wildcard
  mask, trạng thái OSPF là chỗ tài liệu mạng hay sai): mỗi module content
  xong phải qua một lượt kiểm kỹ thuật riêng trước khi khép khối; hội
  đồng ghế kỹ thuật chấm lại ở hạng mục (20).
- **CLI engine phình**: học bài PS — tokenizer đơn giản, lệnh lạ trả
  outcome rỗng cho UI kể lời Việt, KHÔNG nhận mình mô phỏng đầy đủ IOS.
- **Người học cũ**: 12 module cũ không đổi một chữ — trung cấp là phần
  nối thêm, persist không cần migrate vì chỉ THÊM dữ liệu module mới.
