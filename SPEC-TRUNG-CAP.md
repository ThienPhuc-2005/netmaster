# SPEC v2: NetMaster Trung cấp — Phần D & E (Module 13-21)

> Đặc tả cho đợt nâng cấp nhập môn → trung cấp. Cùng hiệu lực với
> `SPEC-APP-HOC-MANG.md` (spec v1): v1 giữ nguyên cho M1-12, file này là
> nguồn chân lý cho M13-21 và các engine mở rộng. Khi hai bản mâu thuẫn
> về CƠ CHẾ CHUNG (pipeline, SM-2, gate…), v1 thắng — trung cấp không
> được đổi luật chơi đã chạy.
>
> Trạng thái: **ĐÃ DUYỆT (chủ dự án, 08-08) — cả 5 quyết định ở mục 7
> chốt theo đề xuất.** Đang thi công Phase 4; tiến độ từng khối ghi ở
> `TRANG-THAI.md`.

---

## 1. TẦM NHÌN TRUNG CẤP

Nhập môn (M1-12) trả lời "mạng hoạt động thế nào và sửa mạng nhỏ ra
sao". Trung cấp (M13-21) trả lời "làm sao THIẾT KẾ, CẤU HÌNH BẰNG LỆNH
và VẬN HÀNH mạng của một doanh nghiệp nhỏ" — tương đương mặt bằng CCNA
phần nền + junior sysadmin.

Người học sau M21 phải làm được bốn việc, mỗi việc có chỗ đo:

1. **Thiết kế** dải địa chỉ VLSM cho văn phòng nhiều phòng ban
   (đo: drill VLSM + bài thi M13).
2. **Cấu hình bằng CLI** trunk, VLAN, tuyến tĩnh, OSPF, ACL trên
   switch/router ảo (đo: câu `cli` trong M14-17, capstone M21).
3. **Chẩn đoán liên tầng** ca bệnh trộn hạ tầng + dịch vụ
   (đo: phòng khám M17-21, bài thi M21).
4. **Vận hành hệ thống nhỏ**: DHCP/DNS có dự phòng, AD đa site, đọc log
   tập trung (đo: M18-20).

**5 nguyên tắc bất biến của v1 giữ nguyên toàn phần.** Không nhắc lại —
mọi module dưới đây mặc định tuân thủ.

---

## 2. NHỮNG GÌ KẾ THỪA NGUYÊN VẸN (không sửa vì trung cấp)

- Pipeline 6 bước, mastery gate 85%, pool >= 12 câu rút 8, câu TRỤ luôn
  vào đề (thêm `cli` vào danh sách kind trụ), thi lại rút đề mới.
- SM-2, phiên ôn relearning, flow engine, XP/streak nguyên tắc 5.
- Học vượt: chính là cửa vào cho người ngoài nhảy thẳng trung cấp —
  nút vượt đã có ở mọi module, không làm gì thêm.
- `lessonMachine.ts` không biết dạng câu hỏi nào tồn tại;
  `kind: 'cli'` là nhánh thứ TÁM của QuestionSchema, có
  `cliInPipeline.test` khóa (lần thứ năm của bất biến).
- Ranh giới chuỗi ba tầng; nội dung là data; engine thuần TS; persist
  có cửa migrate; không tracking, không CDN, offline trọn vẹn.
- Design system, ẩn dụ bưu điện, giọng microcopy. Phần D và E cần hai
  tông nhấn phụ mới (nối quy tắc mỗi-Phần-một-tông của v1, thêm cặp
  token + test contrast như luật).

---

## 3. LỘ TRÌNH NỘI DUNG

### PHẦN D — HẠ TẦNG MẠNG TRUNG CẤP (M13-17)

**Module 13: VLSM — Cắt đất cho đúng người** 
- Nội dung: nhắc lại CIDR/magic number (bắc cầu từ M3), VLSM — chia một
  dải thành các subnet KHÁC CỠ theo nhu cầu từng phòng ban, thứ tự cắt
  từ lớn tới nhỏ, wildcard mask (dạy Ở ĐÂY để M16 dùng cho OSPF network
  statement), tóm tắt tuyến (route summarization) mức đọc-hiểu.
- Kỹ thuật đặc thù: **Drill VLSM** nối drill subnet M3 — đề tự sinh
  ("dải 192.168.10.0/24, ba phòng 60/25/10 máy, cắt sao cho khớp"),
  chấm ba tiêu chí: đúng (không chồng lấn, đủ host), đủ (phủ hết yêu
  cầu), không lãng phí (mỗi subnet là cỡ nhỏ nhất đủ dùng). Bài tập là
  bài THIẾT KẾ, không phải bài tính lại.
- Không cần engine lab/CLI — module này làm SONG SONG được với engine.

**Module 14: Trunk 802.1Q — Một sợi dây chở nhiều xóm** ⭐ (CLI ra mắt)
- Nội dung: vì sao nối hai switch mỗi VLAN một dây là không xong
  (bắc cầu từ tường VLAN M4), tagged frame — dán nhãn xóm lên khung,
  native VLAN — một xóm đi không nhãn, allowed list, router-on-a-stick
  (sub-interface mức khái niệm, lab dùng router chân rời hoặc SVI-lite
  — chốt trong khối engine).
- Kỹ thuật đặc thù: **CLI thiết bị ra mắt tại bước Đoán thử bài 1** —
  người học được thả vào `Switch>` với đúng lời nhắc "gõ ? xem có gì",
  mò `show vlan brief` TRƯỚC khi học lý thuyết (đúng chiêu PS của M12).
  Lab sửa-trunk-hỏng: hai switch nối nhau, VLAN 20 không qua được vì
  allowed list thiếu — sửa bằng CLI, nhật ký chặng cho thấy khung bị
  chặn ở đâu.
- Ca bệnh đặc trưng: native VLAN lệch hai đầu — khung rơi sang xóm khác
  trong im lặng (ca kinh điển của nghề, sim phải tái hiện được).

**Module 15: STP — Người canh vòng lặp**
- Nội dung: vòng lặp lớp 2 và broadcast storm, BPDU, bầu root bridge
  (priority + MAC), cổng bị block là TÍNH NĂNG chứ không phải hỏng,
  chuyện gì xảy ra khi rút dây chính (cổng block tự mở), PortFast cho
  cổng cắm máy con.
- Kỹ thuật đặc thù: **Productive failure trứ danh của module**: bài 1
  Đoán thử đưa mạng ba switch nối tam giác KHÔNG bật STP — người học
  bấm Gửi thử và XEM broadcast storm chạy vòng (mã `broadcast-storm`
  engine đã có từ M4, giờ mới được lên sân khấu). Bật STP → mạng sống —
  bài học tự kể chính nó.
- **Von Restorff**: trạng thái cổng block cho hình/màu độc nhất trên
  canvas (nó là thứ hay bị tưởng là lỗi).

**Module 16: OSPF — Các router tự hỏi đường nhau**
- Nội dung: giới hạn của tuyến tĩnh khi mạng lớn (bắc cầu từ M4),
  neighbor và gói hello, cost, area 0, bảng định tuyến TỰ HỌC, chuyện
  gì xảy ra khi một đường đứt (OSPF tìm đường vòng — tuyến tĩnh thì
  chết đứng), so sánh static vs dynamic khi nào dùng gì.
- Kỹ thuật đặc thù: **Cung điện ký ức lần 3** — "tòa nhà 4 tầng × 2
  phòng" cho 8 trạng thái neighbor, mỗi tầng một giai đoạn của cuộc
  làm quen: tầng 1 chưa quen (Down, Attempt*), tầng 2 chào hỏi (Init,
  2-Way), tầng 3 thỏa thuận (ExStart, Exchange), tầng 4 đồng bộ
  (Loading, Full). (*Attempt ghi chú rõ: chỉ có ở mạng NBMA — dạy đúng,
  không làm tròn.) Đi xem ở bài dạy neighbor, đi lại từ trí nhớ ở bước
  Nhớ lại, bài thi phủ đủ 8 phòng (luật cũ của M5/M9).
- Lab: hai đường giữa ba router, rút đường chính → ping vẫn thông vì
  bảng định tuyến tự đổi — nhật ký chặng cho thấy đường vòng.

**Module 17: ACL & bảo mật lớp 2 — Luật chặn đúng người**
- Nội dung: ACL standard vs extended, thứ tự dòng và implicit deny,
  chiều in/out và ĐẶT Ở ĐÂU (standard gần đích, extended gần nguồn),
  port security mức khái niệm + lab, ARP spoofing — kẻ mạo danh trong
  xóm (bắc cầu từ ca trùng-IP M11), VLAN hopping mức đọc-hiểu.
- Kỹ thuật đặc thù: ca bệnh "ACL chặn nhầm cả sếp" — viết luật chặn
  một phòng nhưng đặt sai chiều nên chặn cả giám đốc: chẩn đoán bằng
  `show access-lists` (đếm match) + nhật ký chặng có mã `acl-denied`
  kèm số dòng luật ăn. Interleaving: bài tập trộn câu tường lửa
  stateful M7 ↔ ACL không trạng thái — phân biệt được hai họ.

### PHẦN E — QUẢN TRỊ HỆ THỐNG TRUNG CẤP (M18-21)

**Module 18: DHCP & DNS doanh nghiệp — Dịch vụ không được chết**
- Nội dung: DHCP relay/helper — "làng có nhiều xóm nhưng chỉ một nhà
  làm mối" (ẩn dụ hỏi cưới M6 quay lại), scope và tỉ lệ cạn, dự phòng
  DHCP failover mức khái niệm, split DNS trong/ngoài, forwarder và
  conditional forwarder, TTL khi đổi hạ tầng.
- Kỹ thuật đặc thù: ca bệnh "sáng thứ hai cả tầng 3 không có mạng"
  (scope cạn — máy nhận APIPA 169.254.x.x); self-explanation đậm:
  "vì sao relay phải đổi trường giaddr thay vì chuyển tiếp thô?" mức
  vừa phải — spec chỉ đòi hiểu vai trò relay, không đòi thuộc trường gói.

**Module 19: AD đa site & ủy quyền — Một miền, nhiều tòa nhà**
- Nội dung: site và subnet gắn site — tầng "Site" của LSDOU (M9) giờ
  mới có nghĩa thật, replication giữa DC mức khái niệm, AGDLP — xếp
  quyền theo chuỗi Account→Global→DomainLocal→Permission, delegation —
  giao bớt quyền cho helpdesk mà không phát admin.
- Kỹ thuật đặc thù: **Worked example fading trên AGDLP** (đúng chiêu
  GPO của M9): bài đầu xem sơ đồ xếp nhóm mẫu → điền chỗ trống → tự
  xếp từ yêu cầu suông. PS mở thêm 3 cmdlet (mục 5.4) để tra và xếp
  nhóm bằng lệnh — sổ AD của engine PS được dùng lại nguyên vẹn.

**Module 20: Giám sát & nhật ký — Nhìn thấy sự cố trước người dùng**
- Nội dung: syslog và 8 mức severity (danh sách RỜI RẠC — thẻ SM-2
  gánh, không cần cung điện: có mẹo câu nhớ), log tập trung vì sao
  (giờ lệch, máy chết mất log), SNMP mức khái niệm (polling vs trap),
  baseline — biết bình thường mới thấy bất thường.
- Kỹ thuật đặc thù: **Generation effect trên log thật độ dài thật**:
  file log 150-200 dòng trong PS world, người học phải
  `Get-Content | Select-String` lôi đúng dòng sự cố ra — trong đề có
  "cảnh báo giả" (dòng WARNING vô hại) làm distractor thật. Nối thẳng
  kỹ năng đọc log M12 lên cỡ doanh nghiệp.

**Module 21: Capstone — Dựng mạng chi nhánh** ⭐ (bài thi của cả engine)
- Nội dung: KHÔNG khái niệm mới (chỉ 1-2 concept meta về quy trình
  triển khai: đặt địa chỉ trước — nối dây — cấu hình — kiểm chứng).
  Toàn module là làm.
- Kỹ thuật đặc thù: **chuỗi 3 chặng trên CÙNG một mạng** (không phải
  một đề khổng lồ — mỗi chặng nộp riêng, thang 3 tầng riêng, nản ở
  chặng 2 không mất công chặng 1):
  1. VLSM: cắt dải cho 3 phòng ban + liên site, đặt địa chỉ lên sơ đồ.
  2. Nối và cấu hình: trunk giữa switch, OSPF giữa hai router site
     bằng CLI, kiểm chứng `show ip ospf neighbor` ra Full.
  3. Luật: ACL chặn phòng khách vào server kế toán nhưng vẫn cho ra
     Internet — cặp mục tiêu "phải thông + phải chặn" (luật M4) ở cỡ lớn.
- Bài thi mastery M21: 8 câu rút từ pool, kết bằng **ca bệnh liên tầng**
  (trunk lệch native + DNS trỏ sai — hai bệnh chồng nhau, phải khám ra
  cả hai) — tổng ôn trá hình của CẢ trung cấp, như M11 làm cho nhập môn.

---

## 4. MỞ RỘNG ENGINE

### 4.1. Lab lớp 2 (`engine/lab/`) — mở phạm vi CÓ KIỂM SOÁT

- Cổng switch thêm `mode: 'access' | 'trunk'`, `allowedVlans`,
  `nativeVlan`. Khung qua trunk mang tag theo VLAN nguồn; native đi
  không tag. **Native lệch hai đầu phải tái hiện đúng bệnh**: khung
  rời không tag ở đầu này, đầu kia nhận vào native CỦA NÓ → sang xóm
  khác trong im lặng.
- **STP-lite tất định**: root = priority nhỏ nhất, hòa thì MAC nhỏ
  nhất; cost mỗi link bằng nhau, hòa thì bridge ID rồi port ID — không
  timer, không mô phỏng hội tụ theo thời gian. Topology khai
  `stpEnabled` (mặc định tắt để M4 cũ không đổi hành vi). Có vòng +
  không STP → `broadcast-storm` như cũ; có STP → tính cổng block,
  rút dây → tính lại.
- `simulatePing` giữ hợp đồng chuỗi chặng; `HopReason` thêm
  `trunk-tagged` (khung mang nhãn qua trunk) và mã hỏng mới
  `trunk-vlan-not-allowed`, `native-vlan-mismatch`, `stp-blocked`.

### 4.2. CLI thiết bị (`engine/cli/`) — dạng câu hỏi thứ 8

- **Thế giới = chính `Topology` của lab.** Không có thế giới riêng:
  lệnh cấu hình biến đổi topology, sơ đồ trên canvas đổi theo (nếu bài
  có canvas); lệnh show đọc từ topology + kết quả mô phỏng. Đây là
  điều kiện để phòng khám trung cấp cho khám bằng CẢ hai terminal
  (Windows phía máy con, CLI phía thiết bị) trên cùng một mạng sống.
- **Chấm theo hiệu ứng + dấu vết** (`gradeCli`, nếp gradeLab/gradePs):
  goals nhìn topology (trunk mọc đúng allowed list, OSPF neighbor Full,
  ACL chặn đúng chiều) và `CliFlags` ghi dấu hành động (đã show đúng
  bảng — cho đề "chẩn đoán bằng lệnh nào"). Không so chuỗi lệnh; cấu
  hình bằng đường bấm chọn trên canvas (nơi bài cho phép) vẫn được công
  nhận nếu hiệu ứng đạt.
- **Fidelity không làm tròn**: output theo khuôn IOS thật (bảng
  `show vlan brief` đúng cột, `%` khi lệnh sai mode); lệnh chạy trót
  lọt thì im lặng; cấu hình SỐNG ngay (không mô phỏng copy run start —
  ghi rõ là đơn giản hóa cố ý). Lệnh lạ/`?` trả outcome rỗng lines cho
  UI kể lời Việt — nếp terminal ba lần trước.
- UI: console trong `QuestionInput` (lazy như ba bề mặt nặng), lịch sử
  ↑/↓, prompt đổi theo mode, bảng mục tiêu chấm sống, "Làm lại từ đầu",
  gõ miễn phí — "Nộp bài" tính lượt. Bài dở lưu qua `practiceDrafts`
  (kind 'cli', học luật bài-học-lưu-bài-thi-không).

### 4.3. Router nâng cao (`engine/lab/`)

- **ACL**: mảng luật đánh số trên cổng router theo chiều in/out; match
  proto/src/dst/port với wildcard = mask đảo; implicit deny cuối; đếm
  match cho `show access-lists`. `simulatePing` trả `acl-denied` kèm
  số dòng luật ăn — nhật ký chặng vẫn là tải trọng sư phạm.
- **OSPF-lite tất định**: neighbor lên khi hai cổng cùng subnet + cùng
  được khai trong `network ... area 0` hai đầu; trạng thái trả về là
  Full hoặc lý-do-không-lên (subnet lệch, chưa khai network) — KHÔNG
  mô phỏng máy trạng thái 8 bậc theo thời gian (8 bậc là kiến thức
  THUỘC ở cung điện, không phải hành vi sim). Bảng định tuyến suy từ
  đồ thị cost (mỗi hop cost 1), tuyến tĩnh thắng OSPF (AD 1 < 110 —
  dạy đúng khái niệm AD ở mức một câu).

### 4.4. Drill VLSM (`engine/subnet/`)

- Schema module: `drill` từ literal `'subnet'` → enum
  `'subnet' | 'vlsm'`. Đề sinh ngẫu nhiên có seed tất định để test.
- Chấm 3 tiêu chí (đúng/đủ/không lãng phí) trả từng dòng — feedback
  chỉ được chỗ sai, không chỉ đáp án.

### 4.5. PS mở thêm cho M19 — chốt lại mốc đóng băng

- Thêm 3 cmdlet: `Get-ADGroup`, `Get-ADGroupMember`,
  `Add-ADGroupMember` (một lệnh GHI — AGDLP phải thực hành được).
- Mốc đóng băng MỚI: **11 cmdlet, pipeline vẫn MỘT tầng**, vẫn không
  scriptblock/biến/vòng lặp. Goal mới cho gradePs: `group-member`
  (user nằm đúng nhóm).

---

## 5. QUYẾT ĐỊNH ĐÓNG BĂNG (chống scope creep — quan trọng nhất spec này)

### 5.1. Danh sách lệnh CLI — 24 lệnh, ĐÓNG BĂNG

Chế độ và di chuyển (6): `enable`, `configure terminal`,
`interface <id>`, `router ospf <id>`, `exit`, `end`.

Show (9, chạy ở mode ưu tiên): `show vlan brief`,
`show mac address-table`, `show interfaces trunk`,
`show ip interface brief`, `show ip route`, `show ip ospf neighbor`,
`show spanning-tree`, `show access-lists`, `show running-config`.

Cấu hình (9): `vlan <n>`, `switchport mode access|trunk`,
`switchport access vlan <n>`, `switchport trunk allowed vlan <list>`,
`switchport trunk native vlan <n>`, `ip address <ip> <mask>` (+
`no shutdown`/`shutdown`), `ip route <net> <mask> <next-hop>`,
`network <net> <wildcard> area 0`,
`access-list <n> permit|deny …` + `ip access-group <n> in|out`.

KHÔNG có: VTP, EtherChannel, RSTP/MST, named ACL, sub-interface cú
pháp thật (`.10`), IPv6 trên CLI, `copy run start`, tab-completion,
alias tắt kiểu `sh vl`. Gõ lệnh ngoài danh sách → outcome rỗng, UI kể
lời Việt. Mở thêm lệnh = sửa spec, không "tiện tay".

### 5.2. Phạm vi mô phỏng lớp 2-3 — ĐÓNG BĂNG MỚI

Có: trunk 802.1Q, native VLAN, allowed list, STP-lite một instance,
ACL đánh số, OSPF-lite area 0, tuyến tĩnh (cũ). KHÔNG có: VTP,
EtherChannel, RSTP, per-VLAN STP, NAT trong lab (vẫn như cũ — khai báo
trong đề), DHCP trong lab (overlay phòng khám gánh phần kể chuyện),
IPv6 routing. Ghi đầu `topology.ts` nối vào ba đơn giản hóa cũ.

### 5.3. Ba mốc cũ giữ nguyên

Phạm vi 8 lệnh terminal phòng khám Windows: giữ (đủ cho trung cấp vì
CLI thiết bị gánh phần mới). Cung điện: luật đi-xem-trước-hỏi-sau giữ.
PS: mốc mới 11 cmdlet ở mục 4.5.

---

## 6. PHÂN KỲ — Phase 4 & 5

### Phase 4 — Hạ tầng (hạng mục 11-17 của KE-HOACH-TRUNG-CAP.md)

11. Spec này được duyệt.
12. Engine lab lớp 2: trunk → STP-lite → UI canvas (chip mode/allowed,
    hình cổng block Von Restorff).
13. Engine CLI: world+show → cấu hình+gradeCli → `kind:'cli'` vào
    pipeline + console UI → /design + render-review.
14. M13 (song song được từ khi spec duyệt): drill VLSM → module-13.json.
15. module-14.json → module-15.json.
16. Engine ACL → OSPF-lite.
17. module-16.json (cung điện 8 phòng) → module-17.json.

### Phase 5 — Hệ thống + capstone (hạng mục 18-20)

18. PS +3 cmdlet → module-18.json → module-19.json → module-20.json.
19. module-21.json capstone + ca bệnh liên tầng + màn tốt nghiệp.
20. DoD toàn phần, kịch bản test người thật trung cấp
    (`KICH-BAN-TEST.md` mục mới), triệu tập hội đồng chấm phần D/E.

### Definition of Done trung cấp (thêm vào DoD v1, không thay)

- Mọi bất biến mục 2 còn nguyên (test kiến trúc cũ xanh, thêm
  `cliInPipeline.test`).
- Mỗi module mới: pool >= 12 câu, câu trụ đúng luật, content:review
  render được, hình khái niệm không tràn (getBBox).
- Nội dung kỹ thuật phần D qua MỘT lượt kiểm fidelity riêng trước khi
  khép khối (native VLAN, wildcard, trạng thái OSPF là vùng tài liệu
  hay sai — chuẩn của dự án là "engine thi hành đúng điều được dạy").
- Test người thật trung cấp: một người đã đậu M12, sau M14-15, phải
  (a) cấu hình được trunk 2 switch từ yêu cầu suông bằng CLI KHÔNG
  nhìn bài, và (b) trước ca native-lệch chưa gặp, gõ đúng lệnh show
  khoanh bệnh trong 10 phút. Capstone: dựng trọn mạng chi nhánh chặng
  1-3 không cần gợi ý tầng 3.

---

## 7. NĂM QUYẾT ĐỊNH TRÌNH CHỦ DỰ ÁN (đề xuất in đậm)

1. **Danh sách 24 lệnh CLI ở mục 5.1** — đề xuất chốt như ghi.
2. **PS mở 8 → 11 cmdlet** (Get-ADGroup, Get-ADGroupMember,
   Add-ADGroupMember) cho M19 — đề xuất chốt; từ chối thì M19 chuyển
   AGDLP sang bấm chọn + đọc-hiểu, mất một miếng generation effect.
3. **Cung điện M16 = 4 tầng × 2 phòng, 8 trạng thái neighbor** (Attempt
   ghi chú NBMA-only) — đề xuất chốt; phương án phụ: 7 phòng bỏ Attempt.
4. **Capstone chấm theo CHUỖI 3 chặng trên cùng mạng** (mỗi chặng nộp
   riêng) — đề xuất chốt; phương án phụ: một đề lớn nộp một lần (rủi
   ro nản giữa chừng cao).
5. **Màn tốt nghiệp trung cấp riêng sau khi đậu M21** (tổng kết số
   liệu cả khóa, không XP) — việc này TRÙNG với mục "màn kết CẢ KHÓA"
   đang chờ duyệt từ biên bản hội đồng: đề xuất làm MỘT lần ở hạng mục
   19 cho cả hai mốc (đậu M12 khi chưa có phần D nhìn thấy màn của nó,
   đậu M21 thấy màn trung cấp).
