# GHI-CHU-KY-THUAT.md — Bất biến kỹ thuật, xếp theo vùng

Cách dùng: **sắp sửa vùng nào thì đọc mục vùng đó TRƯỚC khi sửa.** Mỗi
gạch đầu dòng là một bài học đã trả giá mới có — phá nó là test đỏ hoặc
lặp lại một lỗi cũ. File này là SÁCH TRA CỨU, không phải lịch sử; nhật
ký từng khối làm việc nằm ở `TRANG-THAI.md`, luật ứng xử ở `CLAUDE.md`.

Nhiều bất biến ở đây có test gác sẵn. Test đỏ sau khi bạn sửa gì đó:
khả năng cao bạn vừa phá một dòng trong file này — đọc lại mục liên
quan trước khi "sửa test cho xanh".

## 1. Engine chung & máy trạng thái bài học

- `src/engine/` thuần TS: KHÔNG import React, KHÔNG đọc localStorage,
  KHÔNG tự lấy giờ hệ thống — thời gian bơm từ ngoài vào.
- `lessonMachine.ts` KHÔNG biết dạng câu hỏi nào tồn tại và không được
  sửa vì bất kỳ dạng nào. Hiện có 8 kind: typed, mcq, order, lab,
  palace-walk, clinic, ps, cli — mỗi kind là một nhánh của
  `QuestionSchema`, có `*InPipeline.test` khóa (bất biến này đã lặp 5 lần).
- Nội dung là DATA: thêm bài mới không sửa engine. Schema nội dung
  (`contentSchema.ts` + schema từng vùng) ép ràng buộc SƯ PHẠM ngay lúc
  parse — lỗi dành cho người soạn bài, không bao giờ hiện cho người học.
- `src/engine/ltext.ts`: `LTextSchema` dùng chung mọi schema nội dung.
  UI đọc LText qua `lt()/maybeLt()` — CẤM viết `.vi` mới trong component.
- Flow engine (`flow.ts`): `flowMode` chỉ kích hoạt khi cửa sổ đầy 10
  câu (>90% harder, <60% support, giữa hai ngưỡng không đụng);
  `deriveOpenQuestion` mcq→typed CÙNG id (lựa chọn đúng >24 ký tự thì
  không suy); `needsSupport` đếm 5 CÂU chứ không đếm đồng hồ. Phiên củng
  cố KHÔNG XP, KHÔNG đụng SM-2, chỉ chặn bài MỚI. Thi mastery không đổi
  độ khó — thang đo cố định thì 85% mới có nghĩa.
  `gradeQuestion(mcq, typed)` là đường chính thức, không phải kind mismatch.

## 2. Phòng lab (engine/lab + features/lab)

- **Phạm vi mô phỏng MỐC 3 — ĐÓNG BĂNG**: MAC table, ARP, VLAN access,
  trunk 802.1Q (native + allowed list), STP-lite, router + tuyến tĩnh,
  ACL đánh số, OSPF-lite area 0. KHÔNG: VTP, EtherChannel, RSTP/per-VLAN
  STP, QinQ, named ACL, NAT/DHCP/IPv6 trong lab. Năm đơn giản hóa cố ý
  ghi ở đầu `topology.ts` — đọc trước khi sửa. (Muốn mở phạm vi: đề xuất
  sửa spec, đừng "tiện tay".)
- **Mọi trường mới của topology đều TÙY CHỌN, "thiếu = hành vi cũ"**
  (`mode`, `allowedVlans`, `nativeVlan`, `shutdown`, `declaredVlans`,
  `stpEnabled`, `bridgePriority`, `accessLists`, `aclIn/aclOut`, `ospf`).
  Nhờ luật này nội dung M1-M12 chạy y nguyên qua 5 lần mở rộng engine.
- **STP-lite và OSPF-lite mô phỏng KẾT QUẢ, không mô phỏng giao thức**:
  không timer, không BPDU/hello theo thời gian, không máy trạng thái 8
  bậc. 8 bậc neighbor là kiến thức THUỘC (cung điện M16), không phải
  hành vi sim. Đừng "nâng cấp" thành mô phỏng theo thời gian.
- **`validateTopology` không được chê trạng thái ĐI-QUA của người gõ
  lệnh** (bug capstone, đã vá): `router ospf 1` vừa chạy mà chưa có câu
  `network` nào là hợp lệ (thiết bị thật cũng vậy) — từng bị coi là lỗi
  cấu trúc khiến bộ chấm sống của CliConsole ném lỗi và sập màn giữa
  bài. Đề soạn sẵn bỏ trống networks đã có schema nội dung (min 1) chặn
  lúc parse — mỗi tầng một người gác, đừng gác chéo. Test khóa ở
  `ospf.test.ts` + `cliConfig.test.ts` (chấm sống ngay sau router ospf).
- `simulate.ts`: VLAN đi theo KHUNG, nhãn chỉ là cách ghi trên dây — nhờ
  đó ba bệnh trunk tự hiện ra, không phải viết riêng từng ca
  (`trunk-vlan-not-allowed`, `native-vlan-mismatch`,
  `tagged-frame-on-access`). `PacketHop.tagged` để nhật ký nói được
  khung nào mang nhãn.
- **Luật UI phòng lab**: mọi thao tác có ĐƯỜNG BẤM CHỌN (kéo-thả là
  phụ) — mobile, bàn phím, trình đọc màn hình và test dùng chung một
  đường mã. "Gửi thử" MIỄN PHÍ, "Nộp bài" mới tính lượt trong thang 3
  tầng. Nhật ký chặng LUÔN render đầy đủ kể cả khi không có animation —
  tải trọng sư phạm nằm ở đó, animation chỉ đắp thêm.
- `geometry.ts`: tọa độ bằng MỘT hệ số, không `getScreenCTM` — nếu không
  sẽ mất khả năng test kéo-thả.
- **Bài dở lab có lưới đỡ nội-dung-đã-đổi** (biên bản trung cấp): lúc
  restore, tập thiết bị của spec.initial + thiết bị mà goals nhắc tới
  phải nằm TRỌN trong draft — lệch là bỏ draft mở bài sạch (mất một bài
  dở còn hơn kẹt với thiết bị tàng hình). Layout khi restore TRỘN
  autoLayout làm nền để thiết bị nào cũng có tọa độ; "Về sơ đồ ban đầu"
  regen cả layout.
- `runLabGoals` trả về cả `net` (NetState sau các gói thăm dò, gồm
  aclHits) — console CLI nối nó vào phiên để `show mac address-table` và
  cột match của `show access-lists` có dữ liệu thật. Đừng cắt trường này.
- `hasCycle` (gradeLab) chỉ đếm dây NẰM TRONG tầng 2: router chặn khung
  quảng bá nên vòng qua router không sinh bão — mạng nhiều router nối
  vòng là ĐƯỜNG DỰ PHÒNG (M16 dựng lên để khen), chẩn đoán `l2-loop` ở
  đó là dạy ngược. `l2-loop` cũng chỉ là bệnh khi CHƯA bật STP.
- **ACL chỉ dải extended 100-199.** Số 1-99 là ACL chuẩn của IOS với cú
  pháp KHÁC HẲN (chỉ nguồn) mà mô hình không có — CLI từ chối, schema
  siết min 100, `show access-lists` chỉ in nhãn Extended. Nhận số nhỏ với
  cú pháp extended là dạy một cấu hình không tồn tại (biên bản trung cấp).
- **ACL chỉ THÊM được vào CUỐI** — 24 lệnh không có `no ip access-group`
  hay lệnh xóa dòng. Mọi đề ACL phải giải bằng THÊM luật hoặc ÁP luật,
  không bao giờ bằng gỡ. Không phải hạn chế đáng vá: nó ép bài học "thứ
  tự là luật, dòng mới luôn xuống cuối". Ca chuẩn M17
  (`m17-b1-prac-cli`): danh sách chỉ có một dòng deny làm CẢ VĂN PHÒNG
  tắc vì dòng cấm vô hình, chữa bằng `access-list <n> permit ip any any`.
- **Nhật ký chặng phải gọi tên DÒNG LUẬT đã ăn gói** (`lab.deniedByRule`
  / `lab.deniedByImplicit` đọc `PingResult.deniedBy`). Hai câu tách bạch
  vì hai bệnh khác nhau: dòng người ta gõ sửa bằng thứ tự, dòng vô hình
  sửa bằng THÊM permit. `NetworkLab.test.tsx` khóa cả hai nhánh.
- **Port security và VLAN hopping là HẬU QUẢ mô phỏng được, không phải
  cơ chế**: sim không đếm MAC trên cổng, không dán hai lớp nhãn. M17 dạy
  bằng cổng đã bị đánh sập (`shutdown` → `show ip interface brief` →
  `no shutdown`) + phần đọc-hiểu, có khai đơn giản hóa trong "Đào sâu hơn".
- Layout: dưới 768px menu 4 mục xuống THANH ĐÁY, canvas lab cuộn ngang
  trong khung riêng, vùng chạm cổng ≥ 24px.
- **`SwitchTrunkEditor` (bảng vai cổng bấm chọn) là hàng /design-only**:
  nội dung trung cấp dạy trunk 100% qua CLI nên không module nào bật
  `allow.setTrunk` — bảng chỉ mount qua /design và fixture test. Đừng
  tưởng nó đang phục vụ bài học; muốn đưa nó tới người học thì mở
  setTrunk trong một câu lab (đề xuất trước).
- **"Về sơ đồ ban đầu" XÓA bài dở** (onDraftChange nhận `null`, nếp
  CLI/PS) — không được để effect lưu-bài-dở chụp lại sơ đồ nguyên sơ sau
  reset (test khóa). Bỏ chip VLAN CUỐI của allowed list là NO-OP, không
  âm thầm lật thành "cho tất cả" (muốn mở hết đã có chip "Tất cả").
- **Topology là BẤT BIẾN giữa các lệnh — `computeStp` và `ospfRoutesOf`
  cache theo object (WeakMap)**: mọi thay đổi phải tạo object mới. Test
  mà mutate topology tại chỗ rồi hỏi lại engine là ăn cache cũ (hai test
  STP từng dính); OSPF hòa cost tie-break theo nextHop nhỏ hơn, KHÔNG
  ECMP (khai đầu ospf.ts); hai đầu lệch subnet mask là neighbor DOWN.

## 3. CLI thiết bị (engine/cli + features/cli)

- **24 lệnh — ĐÓNG BĂNG** (spec v2 mục 5.1). Năm chế độ: user →
  privileged → config → config-if → config-router. Mở thêm lệnh = đề
  xuất sửa spec.
- **Chấm theo HIỆU ỨNG + DẤU VẾT** (`gradeCli`): cấu hình bằng lệnh hay
  bằng đường bấm chọn trên canvas đều được công nhận. Goal `viewed` là
  cách DUY NHẤT đo đề "chẩn đoán bằng lệnh nào".
- **Hai việc CHỈ CLI làm được** (không có đường bấm chọn trong lab):
  bật/tắt cổng + VLAN database (`ChangeClass 'port-state'`) và ACL
  (`'acl'`). `LabAllowance` không bao giờ cho hai lớp này — đề lab lỡ
  cần tới chúng sẽ bị chốt chặn schema chặn ngay.
- **`cliSchema` CHẠY THẬT lời giải mẫu lúc parse** — sai một lệnh là
  content test đỏ; không dòng lệnh nào trong nội dung là lời hứa suông.
- Fidelity không làm tròn: output đúng khuôn IOS (bảng `show vlan brief`
  đúng cột, `%` khi sai mode); lệnh chạy trót lọt thì IM LẶNG; cấu hình
  sống ngay (không mô phỏng `copy run start` — đơn giản hóa có khai);
  lệnh lạ/`?` trả outcome rỗng lines để UI kể lời Việt.
- Console UI (`CliConsole`): lịch sử ↑/↓, prompt đổi theo mode, bảng mục
  tiêu chấm SỐNG, "Làm lại từ đầu" thay undo (thiết bị thật không có
  undo). RÚT DÂY CONSOLE là hàng nút chọn thiết bị (thao tác vật lý,
  không phải lệnh); cắm sang máy mới thì mode về `user`.
- **Bài THI không chấm sống** (`examMode` — biên bản trung cấp): màn
  intro hứa "không có gợi ý giữa chừng" nên trong `ModuleTestPage`, bảng
  mục tiêu của CẢ BA bề mặt lab/CLI/PS là ĐỀ BÀI TĨNH (không ✓/○ lật
  theo thao tác, không announce), lab còn ẩn luôn "Chỗ đáng nhìn lại".
  Gửi thử / lệnh show / Get-* vẫn miễn phí — tự kiểm là kỹ năng được đo.
  Bài HỌC giữ nguyên chấm sống; đừng "thống nhất" hai chế độ vào nhau.
- `show spanning-tree` in vai **Root FWD** cho root port (rootPorts nằm
  trong `StpState`) — dán Desg cho cổng hướng về gốc là dạy ngược bài 15
  (từng là P0). Goal `native-match` đo HAI ĐẦU KHỚP, không đóng đinh phía
  phải sửa — đề "chữa native lệch" cấm dùng goal `native-vlan` một phía.
- **Khuôn lỗi hai dòng như IOS thật** (lượt dọn P2): INVALID_INPUT luôn
  kèm dòng dấu `^` căn đúng cột dưới token hỏng (cột tính CẢ dấu nhắc —
  transcript in `<dấu nhắc> <lệnh>`); THIẾU từ là `% Incomplete
  command.`, THỪA từ là Invalid; `enable` gõ thừa ở privileged là no-op
  im lặng; `show` sai LOẠI thiết bị đi đường error và KHÔNG ghi dấu
  `viewed`. Bảng trunk đủ 4 mục và mục active đọc CÙNG VLAN database với
  `show vlan brief`; `show ip route` in "Gateway of last resort is not
  set", không in "% Network not in table"; neighbor in `FULL/-` (các
  lệch còn lại khai ở docstring show.ts).
- Goal `viewed` có biến thể `requireOspfFull` cho `show ip ospf
  neighbor`: chỉ tính khi lệnh chạy LÚC bảng có láng giềng Full — "kiểm
  chứng ra Full" mà tick từ lúc bảng rỗng là bằng chứng rỗng. M16 bài 2
  (tra bảng DOWN) dùng viewed thường.
- **Bài dở CLI có lưới đỡ nội-dung-đã-đổi** như lab: thiết bị của
  spec.initial + goals phải nằm trọn trong draft, lệch là bỏ draft. Dấu
  mốc rút dây chỉ lưu `deviceId`, lời kể dịch lúc RENDER (persist chuỗi
  đã dịch là nhật ký lẫn tiếng khi đổi ngôn ngữ).

## 4. Terminal PowerShell (engine/ps + features/ps)

- Phạm vi đóng băng — MỐC 2, **11 cmdlet + 1 tham số**: 8 gốc (Get-Help,
  Get-NetIPAddress, Test-NetConnection, Get-ADUser, New-ADUser,
  Import-Csv, Get-Content, Select-String) + 3 nhóm cho AGDLP M19
  (Get-ADGroup, Get-ADGroupMember, Add-ADGroupMember). Pipeline MỘT
  tầng; KHÔNG scriptblock/biến/vòng lặp — quá một dấu ống là lỗi có chủ
  đích, đừng "tiện tay" mở ngữ pháp.
- **`Get-ADUser -Properties MemberOf` (H8, khối 21.42)** — tham số DUY
  NHẤT được mở ngoài 11 cmdlet (chủ dự án duyệt 08-12): chiều TRA NGƯỢC
  từ phía NGƯỜI ("anh này thuộc nhóm nào") bổ cho `Get-ADGroupMember`
  vốn hỏi từ phía nhóm. Ba luật:
  - **CHỈ nhóm TRỰC TIẾP** — `memberOf` của AD thật cũng vậy, và đây là
    BÀI HỌC: thấy `NhanSu-GG` rồi vẫn phải đi tiếp một nhịp mới biết
    quyền chảy tới đâu. In hộ cả chuỗi lồng nhau là làm hộ đúng cái nhịp
    nếp AGDLP dạy (khác `isMemberOfGroup` của goal — cái đó ĐI hết chuỗi).
  - **`-Properties` giá trị khác thì báo lỗi thẳng**, cùng lối với
    `-Filter *`: im lặng bỏ qua một tham số người học gõ là dạy sai.
  - **Người không thuộc nhóm nào vẫn có dòng `MemberOf : {}`** — "không
    thuộc nhóm nào" cũng là một câu trả lời, giấu dòng là bắt đoán.
- Nhóm AD: `ad.groups` TÙY CHỌN (thiếu = không nhóm — thế giới M12 giữ
  nguyên nghĩa); scope chỉ Global | DomainLocal. Hai luật thật giữ
  nguyên vì chúng LÀ bài học AGDLP: Global không chứa được DomainLocal,
  không được tạo vòng thành viên (cả validate lẫn Add-ADGroupMember đều
  chặn). Add-ADGroupMember IM LẶNG và idempotent như cmdlet GHI thật.
- Goal `group-member` tính CẢ nhóm lồng nhóm (`isMemberOfGroup` đi
  visited-set): một goal trên nhóm DomainLocal kiểm được trọn chuỗi
  user → Global → DL. Đề muốn ép đúng nếp AGDLP thì khai CẶP goal (một
  trên GG, một trên DL) — nhét thẳng user vào DL sẽ đỏ goal GG
  (psGroups.test khóa lối tắt này).
- Chấm hiệu ứng + dấu vết (`gradePs`, 4 goal: ad-user, ad-user-count,
  tested-connection, found-line): gõ tay từng user thay vì pipeline vẫn
  được công nhận (test khóa). "Hàng loạt" = MỘT dòng
  `Import-Csv | New-ADUser` chạy thật; script đa dòng chỉ đọc-hiểu.
- Fidelity không làm tròn: `New-ADUser` IM LẶNG như thật, không mật khẩu
  → tài khoản **Disabled**; ping unreachable in "Reply from <ai ký
  tên>:" và đếm **Received=4, Lost=0** — bẫy "0% loss mà vẫn không
  thông" là bài học, không phải lỗi. `Select-String` khớp CHUỖI CON
  không regex (đơn giản hóa khai ở đầu `world.ts`).
- Pipeline hàng loạt bind cột `Path` chứa DN đầy đủ, bọc nháy kép (DN có
  dấu phẩy; Import-Csv của engine đọc được nháy kép). Quy ước cột OU tự
  chế đã BỎ — ngoài đời nó rơi user vào CN=Users im lặng.
- `PsConsole`: gõ miễn phí, "Nộp bài" tính lượt; output máy tiếng Anh
  trong `<pre>` (lỗi tô hổ phách); microcopy vi ở i18n `ps.*`.

## 5. Cung điện ký ức (engine/palace + features/palace)

- Đã TỔNG QUÁT HÓA: `floors`/`roomsPerFloor`, hai vế `keys`/`name`,
  `keyStyle: 'number' | 'text'`, nhãn/gợi ý hai ô nhập là NỘI DUNG. Luật
  port 1..65535 là refinement của schema khi keyStyle 'number', KHÔNG
  nằm trong engine.
- Tòa nhà và lộ trình CỐ ĐỊNH — lưới kín, đi tầng trệt lên nóc, trái
  sang phải (thứ tự là một phần của cái được nhớ).
- Đi xem KHÔNG cộng điểm; chỉ chuyến đi lại từ trí nhớ mới là retrieval.
  Lúc đi lại: gợi ý là CHỖ + HÌNH; câu chuyện là tầng 2, con số là tầng
  3 — lộ số sớm là biến retrieval thành chép lại.
- Mỗi phòng một thẻ ôn riêng, khóa `palace:<roomId>` — không gộp.
- Chấm một chuyến: đạt = đi trọn đúng đoạn, không phòng nào phải mở đáp
  án. Không thêm ngưỡng phần trăm.
- Schema ép: phòng được đi xem TRƯỚC khi bị hỏi; mỗi phòng dạy một lần;
  dạy rồi phải có câu bắt nhớ lại; bài thi phủ HẾT phòng của tòa.
- Thêm tòa mới chỉ phải thêm HÌNH: `parsePorts.test.ts` suy danh sách
  tòa từ `loadModules()`; `RoomGlyph` KHÔNG có hình dự phòng.
- **Chuyến đi xem có mũi tên PHẢI, không có mũi tên trái** (khối 21.18):
  lưới kín đi tầng trệt lên nóc, trái sang phải — thứ tự là một phần của
  cái được nhớ, cho lùi là mời đi lộn xộn. Engine cũng không có bước lùi.
  Hook phím tắt phải đứng TRƯỚC cửa trả về sớm `room === null`.
- Ba tòa hiện có: Port 5×3 (M5), LSDOU 4×1 keyStyle text (M9), OSPF
  neighbor 4×2 keyStyle text (M16 — bậc Attempt PHẢI giữ ghi chú "chỉ có
  ở mạng NBMA"; content.test khóa thứ tự 8 bậc lẫn ghi chú).

## 6. Phòng khám (engine/clinic + features/clinic)

- Ca bệnh = topology lab NGUYÊN + overlay "hồ sơ bệnh" + seatId.
  Terminal 8 lệnh Windows, output SUY TỪ MÔ PHỎNG, tiếng Anh nghề tất
  định; help/lệnh lạ trả rỗng cho UI kể lời Việt.
- **Chấm HAI PHẦN trong MỘT lượt nộp: đúng bệnh VÀ sửa khỏi** — đúng một
  nửa vẫn là chưa xong. Sửa chấm BA LỚP: goals + mustClearDiagnoses sạch
  + triệu chứng hết.
- **Khám mù trước**: pha khám chỉ có lời than + terminal, KHÔNG sơ đồ
  (lộ sơ đồ sớm thì ca "rút dây" giải bằng mắt). Chốt chẩn đoán mới mở
  pha sửa; đổi chẩn đoán bằng chip tại chỗ, KHÔNG unmount phòng lab
  (unmount là mất sơ đồ sửa dở).
- Pha sửa edit-network dùng NGUYÊN `NetworkLab` + `hideDiagnosis` (máy
  nói tên bệnh hộ là lộ đề) + `onTopologyChange`: terminal và "Chạy lại
  triệu chứng" soi sơ đồ SỐNG; ARP cache cũ giữ nguyên như đời thật.
- Gõ lệnh + "Chạy lại triệu chứng" MIỄN PHÍ; "Nộp bài" mới tính lượt
  (một lượt = trọn gói hai phần).
- `lines` terminal là output tiếng Anh trong `<pre>`; microcopy vi ở
  i18n `clinic.*`.
- `src-no-link` báo "General failure" (dây MÌNH) khác "Destination host
  unreachable" (dây ĐÍCH) — cặp phân biệt là bài học M11 bài 1.
- Tab Phòng khám: `clinicCases.ts` suy ca TỪ BÀI HỌC của mọi module;
  **ca bài thi mastery CẤM đem ra luyện tự do** (test khóa). Cổng mở
  theo mastery gate (`clinicTabUnlocked`). XP nguồn 5 `clinicCaseSolved`
  (10): CHỈ lần chữa khỏi đầu mỗi ca, chỉ vào xpTotal (KHÔNG moduleXp).
- `clinicSchema` ép: bệnh nhân phải ỐM THẬT, lời giải chữa được ca của
  chính nó, trạng thái đầu chưa đạt sẵn, `mustClearDiagnoses` phải là
  bệnh thật của sơ đồ đầu.
- **`deviceConsole: true` (cấp spec ca)**: cấp console thiết bị CHỈ-ĐỌC
  cạnh terminal Windows — lời hứa spec v2 mục 4.2 cho ca liên tầng trung
  cấp (nửa bệnh L2 phải KHÁM được, không đoán bằng loại trừ). Chỉ nhận
  enable/exit/end + mọi lệnh show + `?`; lệnh cấu hình chặn bằng
  microcopy `clinic.deviceReadOnly` — sửa mạng là việc của pha sửa.
  Schema bắt sơ đồ phải có switch/router mới được khai cờ. Console soi
  topology SỐNG của ClinicRoom (pha sửa đổi sơ đồ là show thấy ngay).
- **Ca LIÊN TẦNG `fix.kind: 'edit-and-act'` (H3, khối 21.41)** — cách sửa
  THỨ BA của phòng khám (mốc "2 cách sửa" đã phá, chủ dự án duyệt 08-12):
  nửa bệnh trong sơ đồ sửa BẰNG TAY ở phòng lab, nửa ngoài mô hình chọn
  HÀNH ĐỘNG; chấm ba phần, thiếu phần nào cũng là chưa xong.
  - **Mọi chỗ cần goals/allow/solution phải hỏi `phanMang(fix)`**, đừng so
    `kind === 'edit-network'`: so tay thì thêm kiểu ca là ca mới lặng lẽ
    mất nửa sửa mạng — và nó KHÔNG đỏ test ở chỗ vừa sửa. Đã đi qua
    `phanMang`: gradeClinicFix, clinicSchema, ClinicRoom.
  - **Cổng chất lượng của ca sửa-sơ-đồ áp y nguyên cho nửa mạng** (lời
    giải phải chữa được ca của chính nó, trạng thái đầu chưa đạt sẵn,
    allowance đủ, mustClearDiagnoses là bệnh thật) — test khóa từng vế.
  - **Triệu chứng khai trong `symptom` phải là nửa MẠNG.** Schema đòi lời
    giải làm triệu chứng hết, mà nửa ngoài mô hình thì mô phỏng không với
    tới — khai triệu chứng theo nửa DNS là ca không bao giờ parse được.
    Nửa ngoài để người học tự thấy bằng bằng chứng khác (nslookup).
  - **Triệu chứng xanh KHÔNG có nghĩa là xong**: UI phải nói thêm câu
    `clinic.symptomHalfOnly` cạnh chỗ báo hết triệu chứng, không thì màu
    xanh thành lời hứa sai ngay giữa ca dạy "đếm đủ dấu chân".
  - Cross-check nội dung: `edit-and-act` BẮT BUỘC có `actions`;
    `edit-network` vẫn CẤM `actions` (muốn hai nửa thì khai đúng kiểu).
- **Bằng chứng của ca phải HỢP VẬT LÝ**: nslookup chỉ được trả lời khi
  đường tới DNS server đi được (terminal không kiểm reachability — nên
  đặt DNS server CÙNG segment với ghế ngồi khi đường xa đang đứt; hai ca
  M21 từng phạm, đã dời DNS về chi nhánh). Người học giỏi sẽ ping máy
  chủ DNS để kiểm — bằng chứng tự đá nhau là ca hỏng.

- **Sổ "mình nghĩ câu này đúng" (`disputedAnswers`, persist v5)**: nút chỉ
  hiện cho câu GÕ TAY đang bị chấm chưa đúng; ghi nguyên văn câu người học
  gõ, KHÔNG mở câu / KHÔNG cộng XP / KHÔNG đổi chấm (test khóa), trần 50
  dòng cũ-rơi-trước. Lời xác nhận BẮT BUỘC nói "vẫn chưa được tính là
  đúng" — bỏ câu đó là biến nó thành nút bấm-là-qua. Đọc lại ở trang Hồ sơ.

- **Bộ chấm câu gõ tay có hai cái bẫy đã trả giá (08-10)**: (a) khớp-chứa
  đòi cụm accept LIỀN NHAU, nên người trả lời RÕ HƠN đáp án mẫu ("địa chỉ
  MAC của người gửi" vs accept "địa chỉ người gửi") bị chấm sai — accept
  phải chứa cả cách nói đầy đủ; (b) lá chắn phủ định xét theo TỪNG đáp án,
  không tắt khớp-chứa cho đáp án vốn là câu phủ định ("Không ai cả").
  Test thường trực gác lớp lỗi này: `content.test.ts` bắt mọi câu gõ tay có
  lời giải ngắn mà accept của chính nó từ chối. `accept[0]` là chữ hiện ở
  dòng "Đáp án:" — để nó khớp với lời giải, đừng để hai câu khác nhau.

## 7. Nội dung & bài thi mastery

- **`masteryTest` là POOL, không phải ĐỀ**: mỗi module >= 12 câu, mỗi
  lượt `drawMasteryTest` rút 8 rồi xáo. Ba thứ không được phá: (a) cỡ đề
  cố định 8 — `MASTERY_DRAW_COUNT` đổi là đổi nghĩa ngưỡng 85% (7/8);
  (b) câu TRỤ (lab/palace-walk/clinic/ps/cli) luôn vào đề — chúng LÀ kỹ
  năng của module; (c) thi lại RÚT ĐỀ MỚI. Và (d — lượt dọn P2): câu KẾT
  đề là câu trụ NẶNG nhất (clinic > cli > lab > ps > palace-walk) —
  peak-end, ca tổng duyệt không được rơi vào câu số 1 (test khóa).
- **`letter` — thư cuối module (khối 21.6)**: NỘI DUNG trong data, hiện ở
  màn ĐẬU. Nó là thứ DUY NHẤT người học nhận khi đậu (bài thi cố ý không
  cộng XP), nên module nội dung thật thiếu thư là `content.test` đỏ; luật
  đi kèm: >= 220 ký tự, 3-5 câu, không lá nào trùng lá nào, và
  `content:review` phải in nguyên văn. Giọng: người trực ca đêm nhắn cho
  ca sáng, kể ĐÚNG việc module đó vừa cho họ làm được.
- **`stageProgress: true` — dải công trường trong bài (khối 21.19)**: cờ
  cấp MODULE, hiện tại CHỈ M21 bật. Nó bật dải chặng gọn (`StageStrip`)
  ngay trên tên bài trong `LessonPlayer`. Đừng bật đại trà: module thường
  lấy chặng để GOM bài, treo thêm một thước đo nữa cạnh thanh 6 bước là
  hai thước đánh nhau trên cùng màn hình. Chỉ bật cho module mà các chặng
  là một CÔNG TRÌNH nối nhau. Test `StageStrip.test` khóa "đúng một module
  bật cờ" — mở thêm module thì sửa test cùng lúc, có chủ ý.
- **Chặng ĐANG LÀM trong bài ≠ chặng đang làm ở trang Học**: `stageProgress`
  (`contentPure.ts`) lấy chặng chứa BÀI ĐANG MỞ, còn `StageMap` ở trang Học
  lấy chặng chứa bài dở dang đầu tiên. Học lại bài đã xong thì bản trong
  bài phải chỉ đúng chỗ đang đứng, không nhảy về phía trước (test khóa).
  Dải trong bài cũng KHÔNG có nấc "khóa" — người học đã ở trong module rồi,
  ổ khóa ở đó là lời dọa vô nghĩa; ba nấc là done/current/pending.
- **Màn rớt KHÔNG in đáp án** (chỉ ý cần ôn — hintTopic); đáp án đầy đủ
  chỉ hiện khi ĐẬU. Câu + lựa chọn MCQ xáo mỗi lượt/mỗi lần render.
- **Distractor không lộ đáp án bằng ĐỘ DÀI** (content.test khóa hai hàng
  rào: từng câu ≤ 1.1× distractor dài nhất trừ khi chênh ≤ 8 ký tự; toàn
  đề ≤ 45% câu có đáp án dài nhất). Distractor phải là lỗi hiểu nhầm
  THẬT, cấm distractor "đùa".
- **Ca clinic trong pool thi cũng bị test cue**: độ dài như MCQ, cộng
  luật chống cue BAO-TRÙM — đáp án kể "hai bệnh"/"cả hai" thì mọi
  distractor cũng phải hai-vế (khác cặp bệnh), không được để đáp án là
  lựa chọn gộp duy nhất giữa các lựa chọn một-bệnh (ca hai tầng M21 từng
  đoán được bằng mẹo, không cần mở terminal). Ca luyện và ca thi cùng
  dạng phải KHÁC cặp bệnh (M21: luyện = allowed-list + thiếu bản ghi,
  thi = native lệch + bản ghi trỏ sai).
- **Cờ `anchor: true` theo câu** (typed/mcq/order): câu tính-tay vẫn làm
  câu TRỤ được — `isAnchorQuestion` đọc cờ trước rồi mới xét kind. M13
  phải có ≥ 2 câu trụ tính-tay (content.test khóa); module mới mà kỹ
  năng chính không có kind trụ thì cắm cờ, đừng để gate rút trượt nó.
- **Accept gõ tay phủ cách gõ người thật**: bộ chấm tách token nên ký
  hiệu biến mất ("dấu |" → "dau", "65,535" → hai số). Đáp án là KÝ HIỆU
  thì accept có cả biến thể đọc thành chữ + biến thể có dấu phân cách
  (content.test chạy 19 cách gõ thật qua `typedAnswerMatches`).
  Câu NƯỚC ĐÔI bị chặn: đáp án ngắn (≤ 2 token) không được khớp-chứa khi
  câu người học đang liệt kê nhiều ứng viên ngắn ("1 hay 99") — cùng nếp
  từ phủ định.
- Goal `found-line` của PS nhận `maxMatches`: lượt Select-String tìm ra
  dòng đó phải đủ HẸP (quét thô `Select-String o` vớt cả file không được
  tính) — hai câu trụ M20 dùng maxMatches 10; dấu vết per-lượt nằm ở
  `PsFlags.foundRuns`.
- App KHÔNG render markdown — backtick trong JSON là ký tự thật lên màn
  hình. `workedExample` KHÔNG mở đầu bằng "Ví dụ giải sẵn" (LessonPlayer
  tự thêm nhãn). Muốn xuống dòng trong nội dung: CHỈ ô "Đào sâu hơn" làm
  được (`whitespace-pre-wrap`).
- Câu đứng độc lập (pretest/mastery) BẮT BUỘC có `explain`; concept
  không cờ `noFlashcard` bắt buộc có flashcard (schema ép).
- Chú thích mono đáy hình ConceptVisual: cỡ chữ 10 mono ≈ 6px/ký tự —
  quá ~34 ký tự là tràn viewBox 220 (M18 dính 9 hình một lượt). Soi
  `getBBox` ở `/design` trước khi báo xong.
- Ca phòng khám KHÔNG cần sửa-sơ-đồ (bệnh nằm ngoài mô hình mạng, vd
  scope DHCP cạn, thiếu zone DNS) thì dùng `fix: choose-action` — máy
  APIPA khai thẳng `ipConfig 169.254.x.x/16, gateway null` trong
  topology, `ping-fails` tự ốm nhờ `no-gateway`; ca thiếu bản ghi dùng
  `resolve-fails` (nxdomain khi overlay.dns không có tên đó).
- Luật riêng bị content.test khóa: M12 mọi bài có câu ps + fadingLevel
  không lùi, kết mức 2; M17 ca "chặn nhầm cả sếp" + interleaving
  stateful M7 ↔ ACL; M11 100% productive failure (ca ở bước Đoán thử);
  M9 fading GPO 0→1→2; palace các luật phủ phòng.
- Thuật ngữ: "port" = TCP/UDP port; "cổng" = cổng vật lý switch/router
  và ẩn dụ. Accept-list nhận cả hai. "subnet mask" giữ tiếng Anh. Dấu ba
  chấm "…" trong văn xuôi; "..." chỉ trong ký hiệu chép lại được (IPv6
  rút gọn, mẫu lệnh).
- `vmLab` (M9): checklist VMware khai trong JSON, store track
  `vmLabDone`, tick KHÔNG XP (việc ngoài app không kiểm chứng được).
- Sửa nội dung xong: `npm run content:review` render lại
  REVIEW-NOI-DUNG.md (bản đọc duyệt — KHÔNG phải nguồn chân lý).
- Quy trình viết một module mới: mục "Cách làm một module nội dung" ở
  đầu `TRANG-THAI.md`.
- Màn thi mastery: `ModuleTestPage` suy `isFinalModule` từ
  `loadModules().at(-1)` (module cuối đổi bộ chuỗi `test.*Final`) — thêm
  module mới thì "module cuối" tự dời, không sửa test.
- **Màn TRƯỢT nói hai giọng theo khoảng cách tới ngưỡng** (phát hiện L3,
  khối 21.48), chia bằng `ganNguong()` trong `engine/masteryGate.ts`
  (ngưỡng 85% trừ 15 điểm = bề rộng một hai câu trên đề 8 câu). Hụt sát
  thì giữ "gần lắm rồi" + nút đặc là Thi lại; còn cách một quãng thì đổi
  câu và ĐẢO VAI hai nút — nút đặc trỏ về bài học, Thi lại lùi xuống
  `ghost`. Đừng gộp lại thành một giọng cho gọn: bản cũ khen "Được 0% —
  gần lắm rồi" (đo thật trên browser), và an ủi bằng câu không đúng sự
  thật thì lần sau người học không tin câu nào nữa. Cửa thi lại KHÔNG
  được bỏ ở nhánh nào — "thi lại là để ôn, không phải để bị phạt".
- Danh sách "ý cần ôn" ở màn trượt: lời dặn chung (`test.reviewHintGeneric`)
  in ĐÚNG MỘT LẦN ở đầu danh sách, dòng theo từng câu chỉ hiện khi câu đó
  khai `hintTopic`. Phần lớn câu không khai, nên in dưới từng câu là 6
  dòng y hệt nhau che mất hai dòng thật sự có tin.

## 8. Store, persist & điều hướng

- `src/store/progress.ts` là nơi DUY NHẤT nối engine + thời gian thật +
  localStorage. XP/streak chỉ từ retrieval/lab và CHỈ lần học đầu.
- **PHẢN HỒI PHẢI VÀO TẦM MẮT SAU KHI NỘP (J2, khối 21.44 + 21.45)** —
  `FeedbackRegion` tự cuộn tới mỗi lần `state` đổi. Ba luật, đừng gỡ:
  chỉ cuộn khi khối thật sự NGOÀI tầm mắt (giật màn hình lúc nó đang
  hiện là làm phiền vô cớ); cuộn TỨC THÌ vì `smooth` chết trong khung
  `<main>` lồng; và **CUỘN RỒI MỚI dời focus** (WCAG 2.4.3) — dời focus
  cả khi không phải cuộn là cướp ô người học vừa gõ (bảng VLSM bốn dòng
  tám ô là chỗ lộ rõ nhất), và đo được là nó làm một test nặng chậm 2.5
  lần. Vùng này là live region nên khi đã hiện sẵn, trình đọc màn hình
  vẫn đọc mà không cần ai dời con trỏ. Bệnh gốc: ở bài lab/PS/CLI/phòng
  khám, khối phản hồi nằm ở 649–872px trong khi màn cao 694px — bấm
  "Nộp bài" xong màn hình y hệt lúc chưa bấm.
- **Thẻ module: một cửa vượt, và thanh tiến độ chỉ ở module ĐANG MỞ
  (J4-J6, khối 21.45)** — thanh đo XP, nên module khóa ("15%" là mốc
  khởi đầu, chưa mở bài nào) và module đậu bằng THI VƯỢT (không cộng XP
  nên thanh gần rỗng cạnh huy hiệu "Đã đạt · 89%") đều bị nó nói dối hộ.
  Cửa vượt giữ CHIP trên đầu thẻ: ý "mình biết phần này rồi" nảy ra lúc
  đọc tên module, không phải sau khi đọc hết danh sách bài.
- **Hai con số của phiên ôn phải KHỚP (J7, khối 21.45)**: tiêu đề đếm
  theo PHIÊN (`queue.length`, tăng khi có thẻ học lại) chứ không đếm thẻ
  còn đến hạn (tụt dần) — hai phép đếm khác nhau đứng cạnh nhau đọc như
  app tự mâu thuẫn. Nợ vượt trần 15 thẻ thì nói thêm một câu về phần để
  dành phiên sau: khớp nhau mà vẫn không giấu nợ.
- **Hàng nhập của 4 terminal `flex-wrap`, ô gõ `basis-[65%] sm:basis-auto`
  (J3, khối 21.44)**: trên màn 375px, dấu nhắc + nút "Chạy" từng bóp ô gõ
  còn 186px trên bề mặt GÕ NHIỀU NHẤT của app. Nay nút rớt xuống hàng
  dưới (`ml-auto sm:ml-0`) và ô gõ rộng 259px. Sửa ở CẢ BỐN (PsConsole,
  ClinicTerminal, ClinicDeviceConsole, CliConsole) — chúng là một khuôn,
  sửa lẻ một chỗ là ba chỗ kia lặng lẽ khác đi.
- **THẺ MỒ CÔI: HỘP ÔN SỐNG LÂU HƠN NỘI DUNG (K1, khối 21.46)** — thẻ
  còn trong hộp mà nội dung hiện tại không dựng nổi mặt (khái niệm đổi
  id, bỏ `flashcard`, phòng cung điện rời khỏi bài). Khác J1 ở chỗ thẻ
  ĐÚNG HÌNH DẠNG, chỉ mất chỗ tra — nên `theLanh` không bắt được.
  - **Dọn khỏi HỘP, không chỉ khỏi phiên**: thẻ mồ côi vẫn tính vào nợ
    quá hạn, mà cổng khóa bài mới đọc đúng con số đó — để lại là người
    học nợ vĩnh viễn một món không ai trả được. `donTheMoCoi` chạy ở
    `AppGate` ngay sau khi nội dung nạp xong (chỗ DUY NHẤT biết cả hộp
    lẫn nội dung), kêu một dòng `console.warn` như lối J1.
  - **Phiên ôn vẫn lọc lần nữa** (`cardFace(...) !== null`): nội dung là
    dữ liệu, mất mặt thẻ còn có đường khác. Trước khối này, `ReviewPage`
    gặp thẻ mồ côi thì `return null` — chú thích ghi "bỏ qua" nhưng thực
    tế là MÀN TRẮNG và phiên đứng chết tại đó, tải lại vẫn trắng.
  - Tính lượt hỏi trong bộ lọc phải dùng `flashcardTurn` TẠI CHỖ, không
    gọi `turnOf` (khai bên dưới, có đệm riêng) — gọi lên trên là chạm
    biến chưa khởi tạo.
- **Bốn chỗ thẻ/hồ sơ từng nói ngược sự thật của người quay lại (K4-K6,
  khối 21.47)**: đồ thị nếp học chỉ ẩn với người CHƯA TỪNG học (người đã
  từng học mà tám tuần trống thì tám cột trống chính là câu chuyện);
  `StageState` có nhánh thứ tư `'open'` = chưa học nhưng KHÔNG khóa, dành
  cho module đã đậu (đậu bằng thi vượt thì chặng nào cũng chưa đi mà
  chẳng chặng nào bị khóa); thẻ Hôm nay ở trạng thái `done` chỉ đường
  sang phòng khám + drill, và chỉ mời khi phòng khám ĐÃ MỞ.
- **Hai câu hỏi của người VỪA QUAY LẠI (K2 + K3, khối 21.46)**:
  - `freezesAvailable(streak, today)` — số đóng băng của HÔM NAY. Quỹ
    hồi theo tháng nhưng chỉ hồi khi có hoạt động, nên ai vắng qua tháng
    sẽ thấy con số của tháng cũ (thường là 0) ngay dưới dòng "mỗi tháng
    bạn có 2 lượt". Hàm này THUẦN và chỉ để ĐỌC: đọc hồ sơ mà tự hồi quỹ
    là để việc XEM đổi tiến độ, phá nguyên tắc 5.
  - `soNgayVang` + `VANG_LAU_NGAY` (14) — thẻ Hôm nay nói ra khoảng vắng
    trước khi giao việc. `null` cho người chưa học buổi nào (chào "lâu
    rồi không gặp" người mới tinh là chào nhầm), và ngưỡng 14 ngày vì
    dưới mốc đó quỹ đóng băng còn lo được, nói ra chỉ thành lời trách.
- **THẺ ÔN HỎNG KHÔNG ĐƯỢC LÀM SẬP CỬA VÀO APP (J1, khối 21.43)** — bất
  biến đắt nhất của vùng này, vì nó là lỗi DUY NHẤT từng khiến người học
  mất trắng tiến độ mà không có đường tự cứu:
  - Hộp ôn tập là thứ app đọc ĐẦU TIÊN mỗi lần mở (luật "ôn trước học
    sau"), nên một thẻ méo (thiếu `createdOn`, `dueDate` không đúng
    khuôn) làm sập NGAY cửa vào → màn lỗi thay cả khung app → "Tải lại"
    quay lại đúng chỗ sập → không tới nổi Hồ sơ để lùi về bản tự lưu.
  - Ba lớp chặn, đừng gỡ lớp nào: (1) `merge` của persist LỌC thẻ hỏng
    trước khi vào state (chạy mọi lần rehydrate, khác `migrate`);
    (2) `dueCards`/`overdueCount`/`buildReviewSession` tự lọc lần nữa —
    state còn được `setState` từ UI/test; (3) cửa nhập backup kiểm TỪNG
    thẻ bằng chính `theLanh`, không chỉ "có phải mảng không".
  - Luật giọng: **bỏ qua thẻ hỏng, KHÔNG BAO GIỜ ném**. Bỏ một thẻ là
    mất một thẻ; ném là mất cả hộp lẫn đường vào app. Có `console.warn`
    kèm số thẻ bị bỏ để người cần hỗ trợ chụp lại được.
- **Màn lỗi phải MANG THEO ĐƯỜNG THOÁT** (`components/ManLoi.tsx`, dùng
  chung cho `AppErrorBoundary` và `errorElement` của router): nút mở
  thẳng trang Hồ sơ bằng điều hướng CỨNG (router có thể là thứ đang
  hỏng) + nút lùi thẳng về bản tự lưu gần nhất (chỉ đụng localStorage,
  không cần engine nào chạy được). **Router bắt lỗi route TRƯỚC
  AppErrorBoundary** — thiếu `errorElement` là người học rơi vào màn lỗi
  mặc định của react-router, mất cả 4 tab. Lời máy nói đi qua
  `loiThanhChu`: router ném `{status, statusText}` chứ không phải
  `Error`, `String()` thẳng ra "[object Object]".
- **Persist đang ở v8. Cửa migrate**: đổi shape state = bump version +
  nối một bậc `v(n) → v(n+1)` + cập nhật fixture
  `tests/fixtures/progressV1.json` (`progress.migrate.test.ts` là chuông
  báo). Thêm NHÁNH vào union (vd PracticeDraft thêm kind) thì KHÔNG bump.
- **Bài dở lab/PS/CLI lưu qua `practiceDrafts`** (khóa
  `lessonId::questionId`) — CHỈ trong bài học; `ModuleTestPage` cố ý
  KHÔNG truyền draftKey (mang đề thi về nhà làm dần là phá thang 85%;
  `QuestionInput.draft.test.tsx` gác). Lab không lưu lịch sử undo,
  `restoreLab` giữ `initial` là đề bài; PS/CLI lưu cả nhật ký lệnh, "Làm
  lại từ đầu" xóa draft. Lưu bài dở KHÔNG XP/streak/answerHistory.
- **Phiên luyện lại chỗ vấp (`weakSpotDrill` + `/luyen-lai`, khối 21.9)**:
  KHÔNG XP / KHÔNG streak / KHÔNG đụng SM-2 và KHÔNG ghi lại runtime bài
  gốc — câu ở đây đã giải xong một lần, cộng điểm là mở đường farm (test
  khóa cả nhánh đúng lẫn sai). Thứ tự engine BẮT BUỘC: nặng trước → trộn
  xen kẽ module → mới cắt trần; cắt trước khi trộn thì một module ăn trọn
  trần (id "m1-" thắng tie-break) và phiên thành luyện khối.
- **Phân tích chỗ hay sai (`analyzeMistakes`, khối 21.8)** cắt ba lát: dạng
  câu / module / chủ đề (`hintTopic`). Hai luật thống kê KHÔNG được nới:
  chia theo TỈ LỆ (số thô luôn trỏ về dạng câu đông nhất) và nhóm dưới
  `MIN_SAMPLE`(4) câu chỉ được hiện số, KHÔNG được dùng làm lời phán —
  `toughestKind` trả null khi chưa đủ mẫu và UI phải nói thẳng là chưa đủ.
  Chỉ đếm câu `solved`; nhóm chủ đề chỉ gom câu ĐÃ VẤP nên `rate` của nó
  luôn bằng 1 và vô nghĩa — đọc chủ đề bằng `fails`.
- **Phiên ôn có relearning**: thẻ quên requeue cuối phiên tới khi tự nhớ
  được; CHỈ lượt chấm đầu ghi SM-2 + XP (`ReviewPage.test.tsx` khóa).
- **Một thẻ, nhiều cách hỏi (`alsoAsk`, khối 21.17)**: mặt trước xoay
  vòng theo `flashcardTurn` = `intervalIndex + lapses`, KHÔNG random (luật
  vùng engine) — thẻ mới luôn gặp cách hỏi xuôi trước, vì hỏi chỗ khuyết
  khi chưa biết nguyên câu là đánh đố. Mặt sau KHÔNG đổi theo cách hỏi:
  mọi cách hỏi phải trả lời được trọn vẹn bằng chính nó, nếu không thì đó
  là hai thẻ. `ReviewPage` CHỐT cách hỏi một lần rồi giữ suốt trang (chấm
  bài đổi ngay trạng thái SM-2 — đọc lại lúc render thì thẻ quay lại ở
  vòng học lại sẽ hỏi một câu khác, hóa ra học một thứ khác). Không bump
  persist: đây là trường NỘI DUNG, không phải trường của thẻ trong hộp.
- **Độ tươi trí nhớ + tự chấm độ chắc (khối 21.7)**: `freshness.ts` tính
  độ tươi = phần quãng nghỉ SM-2 còn lại (KHÔNG phải đường quên thật —
  đã khai ở đầu file). Luật đặt chỗ: **không hiện độ tươi trong lúc ôn**
  (đọc trước khi lật là lời mời bỏ cuộc) và **không mời ôn thẻ chưa tới
  hạn** (phá chính giãn cách). `calibration.ts` đối chiếu lời tự chấm với
  kết quả: "lơ mơ" luôn khớp, chỉ nói khi lệch, chỉ hỏi ở lượt chấm ĐẦU;
  cả hai KHÔNG lưu trữ, KHÔNG XP, KHÔNG đụng lịch SM-2 (test khóa).
- Điều hướng: mở app còn thẻ đến hạn → vào Ôn tập trước (gate ở
  main.tsx, quyết định trong effect SAU khi zustand rehydrate). AppGate
  chặn mọi route tới khi `onboardingDone` VÀ nội dung prime xong.
- **Cuối bài đi THẲNG việc kế tiếp** (`nextAfterLesson`): màn tổng kết
  giữ nguyên (cửa đóng của bài, peak-end — spec 2.1 bước 6), chỉ có nút
  cuối đi thẳng bài sau / bài thi thay vì vòng qua trang Học. Câu hỏi
  của nó KHÁC câu của thẻ "Hôm nay" nên là hàm riêng, khác đúng một
  chỗ có chủ đích: **còn thẻ đến hạn thì KHÔNG bẻ ngang sang ôn** — luật
  "ôn trước học sau" là luật của lúc MỞ APP (cổng ở main.tsx), giữa
  phiên mà bẻ là phá đà. Ngoại lệ duy nhất: nợ VƯỢT TRẦN, vì lúc đó
  `LessonPlayer` chặn cửa bài mới thật, mời học tiếp là mời đâm tường.
  Tính `planToday` với bài vừa xong ĐÃ đánh dấu hoàn thành, không thì nó
  trỏ ngược về chính bài đang đứng. Luôn giữ nút phụ "Về trang Học".
- **Mọi cửa quay lại trang Học phải MANG THEO ĐỊA CHỈ** — dùng
  `backToLearn(moduleId)` (`/?tiep=…`), đừng viết `to="/"` trần: trang
  Học dài 21 module nên về đầu trang là bắt người học cuộn đi tìm lại
  chỗ mình vừa đứng. Trang Học nhận cả id module lẫn id bài, rồi nhắm
  vào phần tử mang `data-next-action` (nút bài kế / cửa thi) chứ KHÔNG
  phải đầu card — card Module 3 cao hơn màn hình, đứng đầu card thì bài
  kế vẫn nằm dưới mép. Không có việc kế tiếp thì mới lấy cả card.
  Cuộn xong phải DỜI FOCUS vào đúng đó (WCAG 2.4.3). Có test khóa cả 5
  cửa (`returnToPlace.test.tsx`).
- **`scrollIntoView({behavior:'smooth'})` KHÔNG chạy trong app này**:
  khung cuộn là `<main>` lồng bên trong, và Chromium im lặng bỏ qua
  smooth trên khung lồng nhau (đo thật: `auto` nhảy đúng 1881px, `smooth`
  đứng yên ở 0). Dùng cuộn tức thì — quãng nhảy ~2000px thì tức thì cũng
  đỡ mất phương hướng hơn. `focus()` phải kèm `preventScroll: true`.
- **Thẻ "Hôm nay" đầu trang Học** (`planToday` — engine thuần): nó chỉ
  TRỎ tới việc người học vốn đã vào được, KHÔNG nới luật nào — mastery
  gate, mở bài tuần tự và trần nợ ôn vẫn do engine cũ quyết. Thứ tự ưu
  tiên: ôn (còn thẻ đến hạn) → bài dở (Zeigarnik) → thi cuối module →
  bài mới. Nợ quá trần thì KHÔNG mời bài mới, chỉ mời ôn kèm lời nói
  thật. Thẻ này đã THAY banner nợ-ôn cũ; đừng dựng lại banner thứ hai.
- **Luật "bài này sinh thẻ ôn nào" viết một lần** ở
  `newCardIdsForLesson` (reviewQueue): store gọi lúc tạo thẻ thật, màn
  tổng kết bài gọi để hứa trước con số. Chép luật sang UI là mở đường
  cho hai chỗ trôi lệch rồi con số trên màn hình thành lời hứa sai.
- **`answerHistory` KHÔNG dùng để thống kê được**: `AnswerRecord` chỉ có
  `{correct, at}` (không biết câu nào) và bị cắt còn 10 bản ghi cuối —
  nó là CỬA SỔ cho flow engine, không phải nhật ký. Muốn thống kê theo
  câu thì đọc `lessonRuntimes[].exercises[].failCount` (theo từng câu,
  giữ vĩnh viễn); theo ngày thì đọc `completedLessons` + `drillHistory`.
  Phiên ôn KHÔNG có lịch sử theo ngày (chỉ `lastReviewDate` lần cuối) —
  đừng suy nó từ `lastReviewedOn` của thẻ, một phiên 15 thẻ sẽ hóa 15 việc.
- **Nút "Dùng cửa sổ này" của SingleWindowGuard phải `location.reload()`**,
  không được chỉ mở khóa: cửa sổ bị chặn giữ state RAM cũ từ lúc mount —
  mở khóa suông là action đầu tiên persist bản cũ đè lên tiến độ vừa học
  ở cửa sổ kia (đúng loại mất-dữ-liệu guard này sinh ra để chặn).
- **Trần bài dở dọn theo LRU lần-chạm-cuối**: ghi đè là xóa-rồi-chèn-lại
  về cuối hàng (test khóa). Giữ-nguyên-chỗ-đứng từng khiến bài vừa được
  đầu tư thêm 20 phút vẫn là bài bị dọn đầu tiên.
- `PROGRESS_PERSIST_VERSION` là nguồn chân lý version persist; cửa
  `importBackup` đối chiếu để TỪ CHỐI file từ bản app mới hơn (migrate
  chỉ đi tới), spot-check vài trường quý và parse thử settings trước khi
  ghi — file hỏng tinh vi phải chết ở cửa, không crash rải rác sau reload.

- **Vấp đẩy thẻ ôn lên sớm (I2, khối 21.36)**: `conceptStumbles` quy chỗ
  vấp về từng khái niệm QUA BÀI HỌC — chỗ vấp ghi theo CÂU, thẻ ôn khóa
  theo KHÁI NIỆM, hai hệ không map thẳng; cầu nối là "bài này dạy khái
  niệm gì". Không dùng `hintTopic` (tùy chọn, câu không khai thì rơi ra
  ngoài, mà thẻ ôn thì bài nào cũng có).
  **Nó chỉ là TIE-BREAK sau `dueDate`, đừng nâng lên khóa chính**: thẻ nợ
  lâu là thẻ sắp quên hẳn, cứu nó cấp bách hơn thẻ mới hơi lung lay. Phần
  lớn thẻ cùng một hạn mà phiên chỉ lấy 15, nên tie-break đã đủ quyết ai
  lọt vào phiên — test khóa cả hai vế, kể cả vế "không vượt mặt thẻ nợ 5
  ngày".
- **Ảo giác quen mặt (I4, khối 21.36)**: `aoGiacQuenMat` là trường persist
  MỚI (v5 → v6) đếm số lần "chắc mà không nhớ" theo từng thẻ. Phần tự chấm
  còn lại vẫn tan theo phiên như cũ — chỉ nấc `overconfident` được lưu, vì
  chỉ nó mới cần nhìn qua NHIỀU phiên mới thấy. Ngưỡng hiện 2 lần
  (`AO_GIAC_NGUONG`): một lần hụt là chuyện thường, kết luận trên một mẫu
  là chấm điểm vội. Thẻ cung điện có tiền tố riêng nên tra tên phải hỏi cả
  `findConcept` lẫn `findPalaceRoom`; nội dung đổi mà thẻ không còn thì
  hiện tạm cardId chứ KHÔNG giấu dòng — số lần hụt vẫn là chuyện đã xảy ra.

- **Quãng ngồi liền dài nhất trong tuần (khối 21.40)**: `quangHoc` là
  trường persist MỚI (v7 → v8), ngày -> số phút của quãng dài nhất ngày
  đó, giữ 70 ngày. Luật ở `engine/quangHoc.ts`, đo ở `NhacNghi`.
  - **Ghi bằng `soPhutDenChamCuoi`, KHÔNG bằng `soPhutDaHoc`.** Quãng
    tính tới lần CHẠM CUỐI thì để tab mở rồi đi ăn cơm con số vẫn đứng
    yên; tính tới bây giờ thì quay lại thấy "tuần này bạn ngồi liền 180
    phút" — một kỷ lục chưa từng xảy ra (test khóa).
  - **Bộ đo KHÔNG gác theo cài đặt `nhacNghi`**: tắt lời nhắc là tắt LỜI
    NHẮC, không phải tắt cái đồng hồ. Chỉ phần HIỆN banner mới gác.
  - **Chỉ ghi khi phá kỷ lục trong ngày** — quãng đang chạy được báo lại
    mỗi 30 giây, ghi đè vô điều kiện thì con số một ngày TỤT xuống mỗi
    lần người học ngồi xuống lần thứ hai; và `set` rỗng vẫn đánh thức
    persist nên không có kỷ lục mới thì không được đụng ổ đĩa.
  - **Giọng: dữ liệu, không phải thành tích.** App vừa rủ nghỉ sau 25
    phút thì không được vỗ tay vì người ta ngồi liền 90 phút — không huy
    hiệu, không "kỷ lục mới!", và quá `QUANG_DAI_PHUT` (50) thì nói thẳng
    cái giá bằng hổ phách.
- **So với chính mình tháng trước (I3, khối 21.39)**: `latCatThang` là
  trường persist MỚI (v6 → v7) giữ tối đa 12 mốc, mỗi mốc là tỉ lệ vấp
  theo DẠNG CÂU tại thời điểm chụp. Luật ở `engine/soSanhThang.ts`.
  Bốn chỗ đừng nới:
  - **So TỈ LỆ tại hai thời điểm, KHÔNG lấy hiệu hai mốc.** Hiệu hai mốc
    ("tháng này vấp thêm bao nhiêu") nghe hay hơn nhiều nhưng SAI: học
    lại một bài đã xong thì `beginLesson` dựng runtime mới và `failCount`
    về 0, nên phép trừ ra số ÂM ngay lần đầu người học ôn lại bài cũ.
  - **Mốc của tháng hiện tại đứng yên cả tháng** (`nenChupThang` chỉ cất
    khi tháng đổi): để nó nhích theo mỗi lần mở trang là cuối tháng không
    còn gì để so.
  - **Chỉ lát cắt theo DẠNG CÂU.** Theo module thì người học đi qua một
    lần rồi thôi (so hai tháng là so hai vùng kiến thức khác nhau); theo
    chủ đề thì `hintTopic` là trường tùy chọn nên mẫu số không tồn tại.
  - **`ghiLatCatThang` KHÔNG được gọi `set` khi không có mốc mới** — mở
    trang Hồ sơ là gọi nó, mà một `set` rỗng vẫn đánh thức persist và ghi
    đè nguyên khối tiến độ xuống localStorage (test khóa).
  UI nói rõ đây là tỉ lệ TÍNH DỒN từ đầu khóa (nó nhích chậm — không nói
  thì "45% → 43%" bị đọc thành "mình giậm chân"), giữ ngưỡng `MIN_SAMPLE`
  của bảng phân tích, và vẫn hiện chiều đi XUỐNG bằng hổ phách: giấu tin
  xấu thì tin tốt cũng hết đáng tin.
- **Ảnh chụp tiến độ tự động (F3, khối 21.38)**: `engine/anhChup.ts` giữ
  luật thuần (khi nào chụp, bỏ bản nào), `store/anhChup.ts` giữ phần đụng
  localStorage. Ảnh nằm ở key RIÊNG `netmaster-anh-chup` — KHÔNG chui vào
  state persist, nên thêm nó không phải bump version. Bốn điều đừng nới:
  - **Bản `truoc-nang-cap` không bị cắt khỏi trần 3 bản.** Nó chụp trong
    `migrate` trước khi bậc migrate đầu tiên chạy, và là bản DUY NHẤT còn
    giữ hình dữ liệu cũ; nếu chính migrate làm hỏng thì mọi bản định kỳ
    sau đó đều chép lại cái hỏng. Ba ngày học liên tiếp là nó trôi mất
    nếu không có ngoại lệ này.
  - **Ảnh chụp không bao giờ được làm hỏng việc lưu chính.** Mỗi bản là
    một bản sao ĐẦY ĐỦ của tiến độ, mà cả app chỉ có ~5MB localStorage —
    ghi không lọt thì bỏ bản cũ rồi thử lại, cùng lắm xóa sạch key ảnh.
    Mọi lối vào của `store/anhChup.ts` đều nuốt lỗi, cố ý.
  - **Chụp định kỳ là MỖI NGÀY, chụp lúc MỞ APP** (`onRehydrateStorage`):
    ba bản cách nhau ba tiếng thì cả ba cùng chứa lỗi vừa xảy ra sáng nay.
    Chụp lúc mở app nên bản chụp = "trước khi buổi học hôm nay chạm vào".
  - **Đã có bản chứa đúng dữ liệu ấy thì không chụp nữa** — hai bản trùng
    chiếm hai chỗ trong ba mà chỉ lùi về được một điểm (bắt được lúc thử
    thật: lùi xong migrate chạy lại và định chụp thêm bản y hệt). Ngoại
    lệ: `truoc-nang-cap` trùng với một bản ĐỊNH KỲ thì vẫn chụp, vì nó
    mang thêm quyền không bị cắt.
  Nút "Lùi về bản này" ở trang Hồ sơ tự chụp bản ĐANG CÓ trước khi ghi đè
  (thao tác cứu dữ liệu cũng là thao tác ghi đè) và BẮT BUỘC `reload()`
  ngay sau đó — state RAM lúc ấy vẫn là bản vừa bị đè, hành động kế tiếp
  sẽ persist nó ngược lại (cùng lớp lỗi với SingleWindowGuard).
- **MỌI cửa ghi đè trọn tiến độ đều phải đi qua `chupTruocGhiDe()`** (phát
  hiện L2, khối 21.48). Hiện có HAI cửa, không phải một: nút lùi ảnh chụp
  và cửa NHẬP FILE sao lưu — cửa thứ hai trước đây ghi đè trắng trợn,
  chọn nhầm file là mất sạch không đường lùi. Thêm cửa thứ ba sau này
  (đồng bộ backend chẳng hạn) thì luật này áp luôn. Lý do chụp có bốn:
  `dinh-ky` · `truoc-nang-cap` · `truoc-khoi-phuc` · `truoc-nhap`; thêm
  lý do mới nhớ khai đủ ba chỗ (`LyDoChup`, `laAnhChup`, `LY_DO_KEY`) —
  thiếu `laAnhChup` là bản chụp bị lọc mất im lặng lúc đọc lại.
- **VỀ ĐƯỢC TỚI ĐÂU HỌC TỚI ĐÓ** (khối 21.49). `primeModules()` kéo từng
  gói RỜI NHAU (`allSettled`) rồi lấy **khúc đầu liền mạch** (order 1, 2,
  3… không đứt); gói nằm sau chỗ đứt coi như chưa về. Ba luật đi kèm,
  luật đầu là chống MẤT DỮ LIỆU:
  - **Dọn thẻ mồ côi CHỈ chạy khi `noiDungDayDu()`.** Hàm đó xoá hẳn thẻ
    khỏi hộp; chạy trên khúc cụt là xoá sạch lịch ôn của nửa khóa sau vì
    một lần rớt mạng. Thiếu thì thà để thẻ nằm đó, lượt sau dọn.
  - **Không được giữ gói nằm SAU chỗ đứt.** `computeModuleStatuses` mở
    khóa theo từng cặp liền kề, nên dãy [1,2,3,5,6] bị đọc thành "5 đứng
    ngay sau 3" — đậu module 3 là module 5 mở ra, THỦNG cổng mastery.
    Cắt đi không thiệt gì cho người học: cổng mastery vốn đã chặn không
    cho học tới đó.
  - **"Module cuối khóa" cũng phải hỏi `noiDungDayDu()`** — `at(-1)` của
    khúc cụt là cuối KHÚC, không phải cuối khóa. Áp cho CẢ HAI chỗ suy ra
    "cuối": `isFinalModule` ở màn thi, và `milestones()` của màn tốt
    nghiệp (khối 21.50 — hàm này trả RỖNG khi thiếu, nên mọi cửa vào màn
    tốt nghiệp tự đóng; giấy chứng nhận in "N/M module" nên soát thiếu là
    in sai lên thứ người học giữ lại vĩnh viễn).
  - **Màn nào từ chối phục vụ vì thiếu nội dung thì KHÔNG được đoán về
    phía nào cả.** Màn tốt nghiệp không chúc mừng đã đành, nhưng cũng
    không được rơi vào màn "mốc này chưa mở" có sẵn — người đã tốt nghiệp
    thật mà hôm nay mạng yếu sẽ đọc đúng câu phủ nhận công sức của họ.
    Nói cái đang thật: chưa kiểm được, và đây là đường tải nốt.
  Cả ba đều có test khoá (`content/napThieu.test.ts`,
  `app/gatesThieuNoiDung.test.tsx`,
  `features/learn/ModuleTestPageThieuNoiDung.test.tsx`).
  Gọi lại `primeModules()` chính là lượt KÉO LẠI phần còn thiếu.
- **`AppGate` PHẢI bắt nhánh `primeModules()` kéo hụt** (phát hiện L1,
  khối 21.48). Giờ hàm đó chỉ còn ném khi ngay cả module ĐẦU cũng không
  về được; nhưng promise hụt mà không ai bắt thì cổng đứng vĩnh viễn ở
  `return null` — MÀN TRẮNG câm, tải lại vẫn trắng (họ J1/K1). Ba điều
  không được nới:
  màn hụt phải NÓI RA thay vì trả `null`; nút Thử lại gọi `primeModules()`
  một lượt mới chứ không `reload()` (mất mạng thì tải lại còn phải trông
  vào service worker dựng lại vỏ app); và màn đó KHÔNG được mời sang Hồ
  sơ như màn lỗi hệ thống — mọi trang đều gọi `loadModules()` đồng bộ,
  mời sang đó là mời thẳng vào một màn lỗi khác. Kèm `contentReady.catch()`
  ở tầng module: promise bắn từ lúc bundle chạy nên có thể hụt TRƯỚC khi
  React kịp mount, thiếu dòng đó là console ăn một "Uncaught (in promise)".
  Gốc rễ đáng nhớ: `scripts/pwa-plugin.mjs` cache nội dung theo kiểu CỐ
  GẮNG (`allSettled`) trong khi cổng lại ĐÒI ĐỦ — hai bên không cùng một
  lời hứa, nên nhánh hụt là chuyện được phép xảy ra chứ không phải lỗi.

## 9. Học vượt — "thi vượt" (ngoài spec, đã duyệt 08-08)

Giữ NGUYÊN cổng: cùng đề mastery, cùng ngưỡng 85%, cùng chuỗi mở khóa —
chỉ bỏ điều kiện "học hết bài trước đã".

- KHÔNG đụng `masteryGate.ts` — thi vượt đi CẠNH chuỗi mở khóa.
- Nút vượt có ở MỌI module, kể cả module đang KHÓA (đường thi thường của
  module khóa vẫn khóa — cửa vượt là đường duy nhất).
- Đậu vượt module N chỉ đánh dấu ĐÚNG N — không bịa điểm cho module chưa
  đo; không mở trắng các module bị nhảy qua (chúng không có thẻ ôn, môn
  mạng xếp chồng, người học sẽ kẹt về sau).
- KHÔNG giới hạn số lượt; `challengeUsed` chỉ là NHẬT KÝ ngày vượt gần
  nhất, không phải then cài — không được dùng nó để chặn.
- Đậu vượt PHẢI sinh đủ thẻ SM-2 cho mọi concept (trừ noFlashcard) + mọi
  phòng cung điện, hạn ngày mai. Vẫn KHÔNG XP/streak.
- Rớt vượt: nút thi lại GIỮ chế độ vượt (`challenge: phase.challenge`);
  màn rớt không rò đáp án như thường. Cờ `?vuot=1` đi THEO LƯỢT THI,
  không suy lại từ store; chỉ sống khi còn nghĩa (chưa học hết bài).
- Màn ĐẬU có nút "Vượt tiếp <module sau>" khi module sau đủ điều kiện.

## 10. UI, thiết kế & hiệu năng

- `tokens.css` là nguồn chân lý màu 60-30-10; dark mặc định, light qua
  `[data-theme='light']`; contrast AA có test WCAG (`tokens.test.ts`) —
  đổi màu rớt 4.5:1 là test đỏ. Tông theo Phần đủ 5: `--part-a..e`
  (E = lục mạ, cố ý ngả vàng để không lẫn với teal của B và `--ok`).
- Mỗi Phần một tông nhấn phụ (luật spec v1, nối dài ở v2).
- `FeedbackBanner` 3 tầng, cấm chữ "SAI" trần trụi; phản hồi chấm bài
  render trong `FeedbackRegion` (live region thường trực), không mount
  banner kèm nội dung.
- **Khen theo HÀNH VI (`engine/praise.ts`, khối 21.6)**: bề mặt nào đọc
  ra được dấu vết (vấp mấy lần / có mở lời giải / dạng câu / bước nào)
  thì truyền `praise` vào `FeedbackState`; chỗ không đọc ra thì để trống
  và rơi về "Chuẩn luôn!" — khen bừa còn tệ hơn khen chung. Số câu khen
  mỗi ngữ cảnh khai ở `PRAISE_VARIANTS`, `dynamicStrings.test` bắt buộc
  đủ chữ cả vi lẫn en. Hạt giống xoay câu BƠM TỪ NGOÀI (engine không
  random, không đọc đồng hồ).
- **Giấy chứng nhận (`features/graduation/certificate.ts`)**: canvas
  thuần, không thư viện; tách `buildCertificate` (thuần, test được) khỏi
  `drawCertificate` (vẽ). Hai luật cố ý: tờ giấy LUÔN nền sáng dù app
  đang theme tối (để in), và tên người học KHÔNG lưu store — ô nhập tại
  chỗ, cắt/chặn 40 ký tự ngay ở tầng soạn nội dung.
- Motion: app bọc `LazyMotion strict` — dùng `m.*`, KHÔNG `motion.*`;
  reduced-motion do `MotionConfig` + token `--dur` lo; animation CSS mới
  phải buộc thời lượng vào `--dur`.
- KHÔNG import tĩnh NetworkLab/ClinicRoom/PsConsole/CliConsole vào đường
  nóng — chúng lazy trong QuestionInput; route ngoài Learn/Review/Lesson
  lazy trong main.tsx.
- **Nội dung nạp LƯỜI** (biên bản trung cấp, ghế Hiệu năng): glob
  non-eager, `primeModules()` async đổ cache, `loadModules()` đồng bộ
  đọc cache — AppGate prime (mọi route sau cổng), test prime ở
  `tests/setup.ts`. Mỗi module một chunk riêng: sửa một chữ chỉ
  invalidate đúng chunk đó. ĐỪNG đổi glob về eager "cho tiện".
- **Zod không được vào đường nóng PROD**: hàm thuần trên nội dung nằm ở
  `contentPure.ts` (flow/lessonMachine/progress/content chỉ import từ
  đó); `LTextSchema` ở `ltextSchema.ts` (ltext.ts chỉ có interface +
  `lt()` — nó đi vào MỌI component); engine index KHÔNG re-export
  `*Schema` (cần schema thì import thẳng file schema — DEV/TEST và
  /design là nơi duy nhất được cần). Kiểm bằng build: chunk chứa `_zod`
  không được nằm trong modulepreload của dist/index.html. Khởi động
  từ ~530KB gzip xuống ~215KB nhờ ba luật này.
- **PWA (cài lên màn hình chính + chạy khi mất mạng)**: manifest và
  service worker do `scripts/pwa-plugin.mjs` SINH LÚC BUILD, không có
  file tĩnh nào để sửa tay — vì mọi đường dẫn phải theo BASE động
  (GitHub Pages phục vụ dưới `/<tên-repo>/`). Icon sinh bằng
  `npm run icons` (tự vẽ PNG, không thêm dependency); đổi logo thì chạy
  lại rồi commit `public/*.png`.
  - **Precache HAI MỨC**: vỏ app (`addAll`, thiếu là màn trắng) + phần
    còn lại theo kiểu cố-gắng (`allSettled`). Phần cố-gắng PHẢI ôm trọn
    21 chunk nội dung: `AppGate` chờ `primeModules()` kéo đủ cả 21, nên
    thiếu một file là app không khởi động nổi khi mất mạng. Nạp lười của
    khối 20.2 KHÔNG mâu thuẫn: nó lo đường nóng lúc vẽ màn đầu, SW cache
    sau khi trang tải xong.
  - **`caches.match` phải kèm `{ ignoreVary: true }`** — máy chủ tĩnh hay
    gắn `Vary: Origin` (Vite preview có), request của trang và request
    lúc SW tự cache khác header nên trượt, rồi rơi xuống `fetch` và chết
    khi mất mạng. Đây đúng là lỗi từng làm bản đầu ra MÀN TRẮNG dù cache
    có đủ 85 file. Kiểm bằng cách TẮT server rồi tải lại, không tin suông.
  - **KHÔNG `skipWaiting`**: bản mới chỉ nắm quyền khi mọi tab đã đóng —
    tráo asset dưới chân một phiên đang học là mời lỗi "không tải được
    chunk" giữa bài. HTML đi network-first nên deploy mới vẫn thấy ngay;
    file có hash đi cache-first vì chúng bất biến.
  - SW chỉ đăng ký ở `import.meta.env.PROD`: dev server không phát
    `sw.js`, mà một SW cũ còn sống ở localhost sẽ phục vụ asset ôi giữa
    lúc đang sửa code.
- i18n: vi.json + en.json cùng cấu trúc key, test parity khóa cả bộ
  `{placeholder}` từng key; lang lưu localStorage key `lang`;
  `<html lang>` theo nút VI/EN (`applyLang`); chuỗi EN có số viết dạng
  TRUNG TÍNH SỐ (không "1 cards").
- Nhãn trong hình SVG là VI-only, đã tuyên bố (hình đi kèm NỘI DUNG, mà
  nội dung mới có tiếng Việt; có bản EN thật thì nhãn qua LText, KHÔNG
  qua i18n). `/design` là ngoại lệ hardcode VI có khai.
- `ConceptVisual`: đầu mũi tên `cv-arrow` khai ở `Frame` nên mọi hình
  dùng được; hình mới không tràn viewBox 220×130 (soi `getBBox` ở
  `/design`); registry thiếu visualId là `ConceptVisual.test` đỏ. Bản đồ
  khóa học `vis-ban-do-khoa-hoc`: lưới 21 ô, 5 hàng A-E, ô chưa có nội
  dung để RỖNG — bản đồ nói thật cả phần dang dở.
- **Nền có BA nấc (khối 21.18)**: `ThemePref = 'dark'|'light'|'auto'` là
  thứ người học CHỌN, `Theme = 'dark'|'light'` là nền THẬT — hai kiểu tách
  riêng để không chỗ nào lỡ ghi chữ 'auto' lên `<html data-theme>`.
  `resolveTheme` quy 'auto' về nền thật; hỏi hệ điều hành mà không ai trả
  lời được thì rơi về TỐI (mặc định spec 4.1), không phải sáng.
  `watchSystemTheme` chỉ gắn listener khi đang ở 'auto' — hứa "tự động"
  rồi bắt tải lại trang là hứa suông. Mặc định vẫn 'dark'. Persist settings
  KHÔNG có version và không cần bump: 'auto' chỉ là giá trị mới của một
  trường cũ, file cũ vẫn đọc đúng.
- **Nhắc nghỉ (`engine/nhacNghi.ts` + `components/NhacNghi.tsx`, khối
  21.33)**: học liền 25 phút thì một dòng nhắc nhẹ hiện ở đầu khung app,
  tắt được bằng nút cạnh nút nền/âm thanh (`settings.nhacNghi`, mặc định
  BẬT — thứ phải tự đi bật thì gần như không ai bật). Bốn luật:
  - **Nghỉ rồi thì không nhắc**: rời máy quá 5 phút là quãng đếm lại từ
    đầu và xóa dấu đã nhắc. Quay lại mà bị giục nghỉ thì lần sau không ai
    đọc lời nhắc nữa.
  - **Nhắc rồi thì im trọn một quãng nữa** — nhắc dồn là cách nhanh nhất
    để người ta tắt tính năng.
  - **Đang THI thì không bao giờ nhắc** (`duocPhepNhac`): chen ngang đúng
    lúc người ta cần liền mạch nhất. Đây là luật của TẦNG UI, engine cố ý
    không biết người học đang bận gì.
  - **Không nhớ qua lần tải trang**: quãng học sống trong bộ nhớ. Nhắc
    muộn một quãng thì không ai thiệt, còn nhắc oan ngay khi vừa mở app là
    lời nhắc mất uy tín ngay lần đầu.
  - **Tự lui sau `HIEN_GIAY` (45s) — khối 21.38**, và đếm bằng thời gian
    TRANG ĐANG HIỆN chứ không phải thời gian trôi (`document.visibility
    State`). Người nghe lời rủ mà đứng dậy thật thì tab nằm ở nền: đếm
    tiếp là lời nhắc tan đúng lúc không ai nhìn, quay lại chỉ thấy màn
    hình y như chưa từng nhắc gì. Tự lui là để khỏi PHẢI bấm tắt, không
    phải để bỏ nút tắt — nút vẫn còn.
  Engine không tự lấy giờ (luật `src/engine/`) — mọi hàm nhận `bayGio` từ
  ngoài, nên test đo được mọi mốc mà không phải chờ thật. Banner mang
  `role="status"` chứ không `alert`: nó là lời rủ, không phải cảnh báo.
  Test UI phải bọc `act` quanh `vi.advanceTimersByTime` — lời nhắc bật từ
  trong `setInterval`, thiếu `act` thì đồng hồ chạy đủ giờ mà màn hình
  chưa vẽ lại.
- **Phím tắt một tay (`components/shortcuts.ts`, khối 21.18)**: hai luật an
  toàn nằm TẬP TRUNG ở `useShortcuts`, đừng chép ra từng màn — (a) đang gõ
  trong input/textarea/select/contenteditable thì mọi phím tắt tắt hết
  (bấm "1" trong ô trả lời phải ra chữ "1"); (b) Enter/Space khi đang đứng
  trên button/a/summary thì NHƯỜNG cho trình duyệt bấm phần tử đó, nếu
  không một cú Enter chạy hai hành động. Phím số chọn theo VỊ TRÍ trên màn
  hình, còn thứ nộp lên vẫn là CHỈ SỐ GỐC của nội dung (lựa chọn bị xáo mỗi
  lượt render) — nhầm hai hệ đánh số này là chấm sai đúng người bấm nhanh.
  Con số in kèm là `aria-hidden` nên tên nút vẫn là nội dung lựa chọn.
  `useShortcuts` CỐ Ý không có mảng phụ thuộc (handlers dựng lại mỗi render).
- **Chế độ tập trung (khối 21.17)**: `isFocusRoute` ở `AppLayout` bật cho
  ĐÚNG hai đường `/bai/*` và `/kiem-tra/*` — các trang khác là nơi người
  học đang CHỌN đi đâu, thu khung ở đó là làm khó đúng việc họ định làm.
  Cách thu là CẤT thứ không phải đường ra (tên app, cụm cài đặt, icon liên
  hệ) + hạ sidebar desktop xuống thanh biểu tượng 64px, **không phải làm
  mờ**: hạ opacity chữ menu là hạ contrast xuống dưới 4.5:1. Tên bốn mục
  chuyển `sr-only` chứ không bị xóa, kèm `title` cho chuột. Mobile chỉ cất
  cụm cài đặt — thanh đáy là đường ra duy nhất trên màn hẹp nên chữ ở lại.
  `AppLayout.test.tsx` khóa cả bốn điều.
- **Vệt đường đi ấm dần (`CourseTrail` + `engine/trail.ts`, khối 21.19)**:
  dải 21 ô ở đầu danh sách chủ đề trang Học, ô đã đậu tô theo 5 nấc
  `--trail-1..5`. Bốn luật:
  - **Nấc theo VỊ TRÍ trong khóa, không theo số ô đã đậu.** Lấy theo số đã
    đậu thì ai cũng thấy vệt kết thúc bằng màu nóng nhất, kể cả người vừa
    đậu chủ đề 2 — vệt hết nói thật.
  - **Chia theo TỔNG, không theo khoảng-giữa-hai-đầu.** Cách kia làm nấc
    nóng nhất rơi trúng ĐÚNG MỘT ô cuối (đo trên browser thật, khóa 21 ô),
    tức bốn ô cuối trông y hệt nhau đúng lúc cần thấy mình sắp tới nơi.
    Test khóa "không nấc nào dưới 3 ô".
  - **Không bấm được**, mang `role="img"` + MỘT lời đọc cho cả dải. Biến 21
    ô thành link là chèn 21 chặng Tab ngay trước nội dung chính, mà card
    chủ đề nằm ngay bên dưới rồi.
  - **Dải màu KHÔNG chạm đỏ** (đỏ trong app chỉ có nghĩa lỗi hệ thống) và
    đảo chiều theo nền: nền tối chạy than → lửa (sáng dần), nền sáng chạy
    nâu đất → than hồng (đậm dần) — bê nguyên dải nền tối sang giấy trắng
    là nấc nóng nhất biến mất. `tokens.test` đo cả ba: >= 3:1 với panel
    (1.4.11 vật thể đồ họa), "ấm dần" phải đo được (nấc sau nổi hơn nấc
    trước), và lam < 0,75 × lục (dấu nhận biết không-phải-đỏ).
- **Xưởng vẽ isometric (khối 21.20, thử nghiệm)**: sơ đồ nhiều nút vẽ bằng
  FossFLOW (app ngoài, ở `học mang 3D/`), app chỉ nhận BỐ CỤC.
  - Vòng làm việc: mở xưởng vẽ (`preview_start` cấu hình `xuong-ve-isometric`,
    hoặc `npm --prefix C:/Users/atlan/fossflow run dev`) → vẽ → **Export
    File** ra JSON → bỏ vào `content/ban-ve/` → `npm run visuals:isometric`
    → `src/components/IsometricScenes.generated.tsx` (ĐỪNG SỬA TAY) →
    visualId `vis-iso-<tên-file>` tự có mặt trong REGISTRY và trên `/design`.
  - **KHÔNG dùng ảnh PNG của FossFLOW** (nút "Download as PNG" là đường
    xuất ảnh DUY NHẤT nó có): bitmap không đổi theo nền tối/sáng, không ăn
    token màu, và đứng cạnh hơn trăm hình vẽ tay thì lạc lõng. Script chỉ
    đọc ba thứ từ JSON — nút ở ô lưới nào, tên gì, nối với ai — rồi vẽ lại
    bằng nét `currentColor`; icon của FossFLOW bỏ hết, hình dáng suy từ
    LOẠI thiết bị (`SHAPES` trong script).
  - **Khối vẽ nhỏ hơn ô lưới (0,72)**: khung tự co giãn cho vừa 220×130,
    nên kéo bản vẽ chặt lại KHÔNG làm hình thưa ra — chỉ làm khối to lên
    và dính vào nhau. Script cảnh báo chỗ chật chứ KHÔNG tự dàn lại nút:
    máy dàn hộ thì mở bản vẽ ra lại thấy khác hình trong app.
  - **Nhãn vẽ sau cùng, mỗi nhãn một đế lót màu panel**: bản đầu để nhãn
    xen giữa các khối, đo trên browser thật thì cả 8 nhãn đều bị nét cắt
    ngang chữ.
  - **Trần thực tế 5-6 nút** trong khung 220×130, và phải giãn ≥2 ô. Đông
    hơn thì chữ 7px chen nhau — lúc đó chia thành hai hình, đừng nhồi.
  - **Khung co giãn phải DÒ, không tính một phát**: khối co theo hệ số, còn
    NHÃN thì không (cỡ chữ 7 cố định để còn đọc được). Bản đầu chỉ đo hộp
    bao của khối rồi chia, thế là đế nhãn ở nút ngoài cùng thò ra x=226 —
    tràn viewBox, đúng thứ luật hình cấm, và test đơn vị KHÔNG bắt được
    (chỉ đo `getBBox` trên browser thật mới thấy). Giờ script hạ dần 3%
    rồi đo lại toàn bộ ở tọa độ cuối, ép được mới sinh mã.
  - Bản vẽ phải kể ĐÚNG hiện trường lời bài: hình đầu tiên vẽ một switch và
    máy kế toán ở chi nhánh, trong khi hook `m21-bai-2` nói hai switch nối
    nhau và máy chủ ở TRỤ SỞ. Hình nói khác bài còn tệ hơn không có hình.
    `IsometricScenes.test` khóa việc này bằng bảng `DA_GAN`: mỗi bài đã gắn
    hình khai vài chữ PHẢI có trên hình, lấy thẳng từ lời hook.
  - **Chỗ dùng đúng nhất là bước KHỞI ĐỘNG.** Quy ước alias `vis-hook-*`
    hiện cho 101/108 bài dùng lại chính hình của màn Dạy — mọi bài đều có
    hình, nhưng hook hiếm khi kể được gì mới. Bài nào mà hook tả một HIỆN
    TRƯỜNG (bốn xóm một chân router, hai lối Hà Nội–Sài Gòn, sợi cáp đứt)
    thì sơ đồ thật hơn hẳn; bài nào hook nói về một Ý thì để nguyên hình ẩn
    dụ. Đừng thay đại trà.
  - **Nét đứt đi qua `style` của FossFLOW** (SOLID/DASHED/DOTTED) chứ không
    bịa quy ước riêng: người vẽ đổi kiểu nét ngay trong xưởng vẽ là hình
    trong app đổi theo. Dùng cho "sợi dây này không còn dẫn được".
  - **Nhãn dây hay đè nhãn nút** (nhãn dây nằm giữa dây, mà giữa dây thường
    rơi trúng nút đầu kia): script cảnh báo chỗ đè ở tọa độ cuối, cách chữa
    là bỏ bớt nhãn thừa chứ không phải dời nhãn — dời hộ là hình trong app
    khác hình trong xưởng vẽ.
  - Hai bài liền nhau kể tiếp một câu chuyện thì **giữ nguyên bố cục, chỉ
    đổi đúng thứ vừa thay đổi** (`hai-loi-ba-mien-m16` và bản `-dut-`: cùng
    ba nút, cùng chỗ đứng, khác một sợi nét đứt) — mắt tự nhảy vào chỗ khác.
    M15 đẩy nếp này lên BA nhịp trên cùng một vòng lặp (bài 1 bão → bài 2
    có cổng nằm im → bài 4 cáp đứt): 0 sợi đứt, rồi 1, rồi 1 ở sợi KHÁC.
    `IsometricScenes.test` khóa cả hai vế — tọa độ nhãn ba nút phải y hệt
    nhau qua cả ba bản vẽ, và sợi nét đứt của bài 2 phải khác sợi của bài 4.
  - **Một bản vẽ ra NHIỀU hình (khối 21.24)**: FossFLOW cho nhiều `view`
    trên cùng bộ nút. View ĐẦU giữ id `vis-iso-<tên-file>` (đừng đổi — nội
    dung đang trỏ vào), view sau thành `vis-iso-<tên-file>-<id-view>`. Dùng
    cho cặp "lúc chưa nối / lúc đã nối": vẽ bố cục một lần, view sau chỉ
    đổi vài sợi dây.
  - **`npm run ban-ve:tu-lab -- --chep <cauId> [--ten <slug>]` (khối
    21.30)**: chép thẳng bản vẽ của MỘT câu sang `content/ban-ve/`, làm hộ
    đúng ba việc từng phải làm tay ba lần liền — gỡ nét mục tiêu, bỏ view
    thứ hai nếu sau khi gỡ nó trùng khít view đầu, và **rút gọn nhãn dài**.
    Luật rút gọn đọc ra từ 80 tên thiết bị thật (44 nhãn dài, rút được 38):
    bỏ đuôi trong ngoặc → bỏ tiền tố loại thiết bị → **rút cụm chữ dính
    liền thành chữ cái đầu** (khối 21.38) → cắt ở dấu phân cách. Luật này
    ở `scripts/rut-gon-nhan.mjs` (kèm `.d.mts`) chứ không nằm trong
    `ban-ve-tu-lab.mjs`: script kia CHẠY NGAY khi import nên không đưa vào
    test được, mà luật thì đáng có test (`tests/rutGonNhan.test.ts`).
    Bốn chỗ bắt buộc phải nhớ:
    - Tiền tố CHỈ bỏ khi đứng trước dấu GẠCH. "PC-KinhDoanh" thì "PC" đúng
      là thẻ loại, nhưng "Máy chủ trên Internet" thì "Máy" là một nửa của
      "máy chủ" — bỏ đi ra "chủ trên Internet", đã thử và thấy vô nghĩa.
    - Mỗi bước xét độ dài HIỆN TẠI, không xét độ dài gốc: "PC-A (tầng 1)"
      bỏ ngoặc xong đã còn "PC-A" là đủ, chạy tiếp bước bỏ tiền tố thì ra
      mỗi chữ "A".
    - Bước nào gây TRÙNG nhãn trong cùng bản vẽ thì lùi lại hết — thà dài
      còn hơn hai khối mang một tên (nhãn dài chỉ làm hình chật, nhãn
      trùng làm hình NÓI DỐI).
    - **Cụm dính liền phải từ HAI tiếng trở lên mới rút**: "KinhDoanh" →
      "KD" thì người đọc sơ đồ vẫn nhận ra phòng ban, còn "Internet" → "I"
      là hết nghĩa. Cụm IN HOA HẾT ("MAY-TRUONG") không dính khuôn này vì
      không có tiếng thường theo sau — đoán chỗ tách tiếng trong một cụm
      toàn hoa là máy đoán mò. Bước này đứng TRƯỚC bước cắt vì nó giữ cả
      hai đầu của cái tên, và nó chính là đường thoát cho cặp
      "PC-KinhDoanh"/"SW-KinhDoanh" ở lab M21: bỏ tiền tố thì hai nhãn
      trùng nên bước đó phải lùi, rút ruột thì ra "PC-KD" với "SW-KD".
    Chỉ đổi `description`; `name` giữ tên đầy đủ làm nguồn sự thật. Script
    in ra TỪNG chỗ đã đổi, vì máy không biết "KyThuat" đọc là "kỹ thuật".
    **Chép xong thì tự chạy luôn `isometric-tu-ban-ve.mjs`** (khối 21.32) —
    chép mà không sinh hình thì bản vẽ nằm trong `content/ban-ve/` nhưng
    app chưa thấy gì, dễ tưởng lệnh chạy hỏng. Chỉ chạy KHI CÓ chép: lần
    chạy thường chỉ dựng nháp, không có lý do đụng file hình đang yên. Bản
    vẽ hỏng thì mã thoát khác 0, không im lặng báo thành công (đã thử). **Phải GỌI TÊN từng câu**, không có chế độ chép tất: 29 câu
    lab/ca bệnh chép hết là 29 hình nằm trong gói app mà không bài nào dùng
    — quyết định "bài này đáng có hình" là của người. **KHÔNG BAO GIỜ GHI
    ĐÈ**: file bên `content/ban-ve/` là công kéo thả của người. Gõ nhầm id
    thì script ném lỗi chứ không im lặng chạy qua.
  - **`npm run ban-ve:tu-lab` — chiều ngược (khối 21.24)**: đọc `spec` của
    câu lab và ca bệnh trong nội dung rồi dựng sẵn bản vẽ vào
    `content/ban-ve-nhap/`. Câu lab ra HAI view (đề bài + lời giải) vì spec
    có sẵn `initial` và `solution`; ca bệnh ra một view vì `fix` chỉ tả mục
    tiêu, không tả mạng sau khi sửa. **Ra thư mục NHÁP, không ra thẳng
    `content/ban-ve/`**: bản máy đặt chỉ xếp theo LOẠI thiết bị (router
    trên, máy trạm dưới), người phải kéo lại rồi mới chép sang — chép sang
    xong thì file đó là của người, script không đụng nữa. Ghi thẳng là mỗi
    lần chạy lại xóa sạch công kéo thả.
  - **Lab đổi DÂY thì bản vẽ hai view, lab đổi ĐỊA CHỈ thì một view** (khối
    21.29): lab chặng 1 của M21 là bài cắt dải địa chỉ — `initial` và
    `solution` có cùng bộ dây, nên sau khi gỡ nét mục tiêu thì hai view
    trùng khít và giữ cả hai chỉ là hai bản sao (test "nhiều view phải ra
    hình khác nhau" bắt đúng chỗ này). Luật của hình Tổng kết vì thế là
    "sinh từ bản vẽ LAB của chính bài", không phải "phải có đuôi -loi-giai".
  - **Trần 5-6 nút là trần của NHÃN, không phải của nút**: bản vẽ M21 ba
    phòng có 7 nút mà vẫn thoáng, vì bố cục là cây ba nhánh đều và nhãn
    ngắn ("sw KD"). Đông nút mà nhãn dài mới là chỗ vỡ.
  - **`summary.visualId` — hình THÀNH QUẢ ở màn tổng kết (khối 21.25)**:
    tùy chọn, chỉ gắn cho bài kết bằng một cái người học vừa DỰNG ra (lab).
    Bài không dựng gì mà treo hình vào đó thì chỉ là trang trí. Hiện có ở
    `m15-bai-4` và `m16-bai-5`, cả hai trỏ vào view `loi-giai`.
  - **Bản vẽ mang dấu `nguon` thì bị canh trôi** (`BanVeTheoLab.test.ts`):
    so THIẾT BỊ và DÂY của hình với chính câu lab trong nội dung, không so
    tọa độ (kéo thả là việc của người, dời một nút không phải là trôi). Đây
    là nửa còn lại của việc "lab sinh ra bản vẽ" — nửa đầu dựng được hình,
    nửa này giữ cho hình không lặng lẽ trôi xa lab. Đã thử làm hỏng một
    bản vẽ để chắc test đỏ thật.
  - **Nét MỤC TIÊU chỉ sống trong bản nháp, KHÔNG mang vào app (khối
    21.28)**: nó nối hai đầu xa nhau nên trên sơ đồ nhiều nút bao giờ cũng
    cắt ngang giữa hình, nhãn rơi trúng thiết bị đứng giữa (đo trên browser
    với lab M7: "phải tới" đè "switch"). Mà trong app thì đề bài đã nói mục
    tiêu bằng chữ rồi. Chép bản nháp sang `content/ban-ve/` thì gỡ nét ấy
    đi — `IsometricScenes.test` khóa luật này.
  - **Mục tiêu của lab vẽ thành nét CHẤM** (`goals` kiểu `ping` → "phải
    tới" / "phải KHÔNG tới"). Chấm chứ không đứt: nét đứt đã mang nghĩa
    "dây không dẫn được". Chỉ vẽ mục tiêu, KHÔNG vẽ những sợi còn thiếu
    (lấy solution trừ initial ra là biết) — nói bài đòi gì thì được, chỉ
    luôn chỗ phải cắm dây là làm hộ bài. Mục tiêu `pathThrough` CỐ Ý không
    vẽ: một ràng buộc về ĐƯỜNG ĐI không diễn đạt được bằng đoạn thẳng giữa
    hai đầu, và nhãn của nó rơi trúng nhãn thiết bị (đo trên browser).
  - **`color` của FossFLOW đọc như LỜI ĐÁNH DẤU, không đọc như mã màu**
    (khối 21.26): sợi nào được tô màu trong xưởng vẽ thì trong app thành
    sợi ăn `--accent` và dày nét lên, nhãn của nó ăn màu theo. Bảng màu của
    xưởng vẽ không biết gì về nền tối/sáng, bê nguyên hex vào là hình chết
    cứng ở một nền và lọt ra ngoài hệ token — test khóa "không mã màu cứng
    nào lọt vào", và đã đo trên browser: nền tối ra #38bdf8, nền sáng ra
    #0369a1, tức là đúng token chứ không phải màu chép tay.
  - **Một bài, MỘT mạng — bài thứ hai (khối 21.27)**: `m15-bai-4` cũng gộp,
    nhưng gộp NHẸ hơn M16: chỉ thêm view `hoi-tu` vào chính bản vẽ hook của
    nó (`vong-lap-stp-dut-m15`), không dồn ba bản vẽ vòng lặp về một file.
    Lý do giữ ba file: bộ ba nhịp bài 1→2→4 dựa vào chúng đứng riêng mà vẫn
    cùng bố cục, gộp lại là phá mạch đó. Hai hình vẽ tay `StpReconverge` và
    `OspfReroute` hết người dùng nên đã xóa (cái sau là code chết còn sót
    từ khối 21.26).
  - **Một bài, MỘT mạng (khối 21.26)**: `m16-bai-5` giờ lấy cả ba hình từ
    bốn view của cùng một bản vẽ lab — hook thấy sợi vừa đứt, màn Dạy thấy
    lối vòng sáng lên, Tổng kết thấy trạng thái cuối. Trước đó hook là tam
    giác ba router còn Tổng kết là sơ đồ lab bảy thiết bị: cùng một bài mà
    hai bức tranh không liên quan. Test khóa "ba màn cùng bộ thiết bị".
    **Cái giá đã trả**: mất mạch tam giác nối bài 4 sang bài 5, và bản vẽ
    `hai-loi-ba-mien-dut-m16` thành thừa nên đã xóa.
  - **Hook KHÔNG được sáng sợi nào** — view `dut` cố ý không tô đường vòng,
    vì hook hỏi đúng câu "lưu lượng đã đi lối nào". Chỉ màn Dạy mới chỉ
    đường. Test khóa cả hai vế.
  - **Cảnh báo nhãn đè nới biên 2px**: bề ngang nhãn trong script là ƯỚC
    LƯỢNG, trình duyệt đo bằng font thật — hai hình STP lọt lưới rồi vẫn đè
    nhau vài pixel trên browser. Thà báo thừa còn hơn để chữ chồng chữ.
  - **HAI CHỖ ĐÃ THỬ VÀ ĐÃ BỎ** (đừng đề xuất lại nếu không có lý do mới):
    - *Sơ đồ trong phòng khám lúc chẩn đoán*: đụng bất biến KHÁM MÙ ghi ngay
      đầu `ClinicRoom.tsx` — lộ sơ đồ sớm thì ca "rút dây" tự giải bằng mắt
      và terminal thành đồ cảnh. Đo lại bằng dữ liệu cũng ra đúng thế: 2/18
      ca có `fix.allow.addLinks`, tức bản đồ CHÍNH LÀ đáp án.
    - *Hình cung điện từng tầng cho M5*: màn Dạy của bài cung điện render
      `PalaceTour` THAY CHO `ConceptVisual`, nên `visualId` đặt ở đó là cấu
      hình chết. Mà cung điện đã có `PalaceMap` — bản đồ SỐNG, tô phòng đang
      đứng, đường đã đi, phòng đã mở; hình isometric tĩnh là bước lùi.
  - **Hình chỉ bày hiện trường, KHÔNG vẽ câu trả lời.** M15 bài 1 không vẽ
    gói tin chạy lòng vòng (hook hỏi "sợi dự phòng gây ra chuyện gì"), bài 2
    không đánh dấu switch nào là trung tâm (hook hỏi "ai thắng"), bài 4
    không tô sợi vừa được đánh thức (hook hỏi "lưu lượng đi lối nào"), M16
    bài 4 không ghi con số cost nào. Vẽ ra là trả lời hộ, tức là phá bước
    Khởi động — thứ mà không test nào bắt được, phải tự giữ.
  - `IsometricScenes.test.tsx` đối chiếu file sinh ra với bản vẽ nguồn nên
    **sửa bản vẽ mà quên chạy lại script là test đỏ**.
  - Chạy được xưởng vẽ phải vá hai chỗ của FossFLOW: `npm run build:lib`
    trước (app cần `fossflow/dist`), và tạo tay `packages/fossflow-lib/
    dist/styles.css` rỗng (app import file này nhưng lib không hề sinh ra
    — lỗi có sẵn của họ; build lại lib là mất, tạo lại là xong). Đường dẫn
    thật có dấu cách nên cấu hình khởi chạy đi qua junction
    `C:\Users\atlan\fossflow`.
- Icon dùng Lucide; cấm emoji làm icon. Âm: **8 earcon** Web Audio tổng
  hợp, không file âm, **tắt được theo BA NẤC**.
- **Ba nấc âm (khối 21.35)**: `mucAm = 'day-du' | 'chi-moc' | 'tat'`, nút
  cùng nếp ba nấc với nút nền. Có nấc giữa vì hai họ earcon khác hẳn tần
  suất: tiếng THAO TÁC (đúng/sai, cắm dây, gói tin bay) vang mấy chục lần
  một buổi, tiếng MỐC (xong bài, lên chặng, đậu module, tốt nghiệp) cả buổi
  một lần. Chỉ có tắt-hết thì người thấy ồn sẽ tắt luôn tiếng đáng nghe
  nhất. Phân loại nằm ở `TIENG_MOC` + `duocVang`, test khóa đúng bốn tiếng
  mốc và "tiếng vang mỗi thao tác phải dưới 0,2 giây".
- **Đổi `soundOn` → `mucAm` phải có bước chuyển đổi**: persist của settings
  KHÔNG có version (quy ước cũ), nên việc quy đổi làm trong `merge` —
  `soundOn:false` → `tat`, `true` → `day-du`. Thiếu bước ấy thì người đang
  tắt âm mở app lên là âm tự bật lại. Bốn đường (tắt/bật/đã có mucAm/máy
  trắng) đều có test.
- **`Tone.glideTo` (khối 21.35)**: lướt cao độ trong suốt `dur`. Có vì
  tiếng "vụt" của gói tin cần một cú lướt liền mạch — ba nốt rời chỉ nghe
  ra ba nốt rời. Earcon cũ không khai trường này nên giữ nguyên hành vi.
- **Tiếng "tách" chỉ vang khi sợi dây THẬT SỰ cắm vào**: `dispatch` của
  `NetworkLab` trả về có-áp-được-không, và tiếng chỉ phát khi `true`. Kêu
  lên rồi mới hiện lời từ chối là nói dối bằng âm thanh.
- **Thang bậc mốc đo được**: tốt nghiệp dài hơn đậu module, đậu module dài
  hơn mọi tiếng còn lại; và CHỈ hai tiếng đóng-lại ấy có nốt trầm NGÂN DÀI
  (dưới 150Hz, ngân ≥ 1 giây). Đo cả cao độ lẫn độ ngân chứ không chỉ cao
  độ: "tách" của lab cũng có nốt 180Hz nhưng chỉ 45ms — đó là cú gõ, không
  phải chân đế.
- **Mỗi mốc một tiếng riêng (khối 21.34)**: `moduleComplete` (đậu module)
  tách hẳn khỏi `stageUp` (xong một chặng). Trước đó hai mốc dùng chung
  `stageUp`, nên mốc lớn nhất của app — cửa mastery 85% — nghe y hệt một
  cột mốc giữa đường và tai không học được thang bậc nào. Tiếng đậu module
  là cadence át → chủ, **dài nhất và trầm nhất** cả bộ (nốt C3 130,81Hz là
  nốt duy nhất dưới 190Hz trong app): cái trầm ấy mới làm tai nghe ra chỗ
  ĐÓNG LẠI thay vì chỗ đi tiếp. `earcons.test` khóa hai điều — không hai
  earcon nào trùng bộ nốt, và tiếng đậu module phải dài nhất + trầm nhất.
  Thêm mốc mới thì thêm earcon mới, đừng mượn tiếng có sẵn.
- `TONES_FOR_TEST` mở bộ nốt ra CHỈ để test đọc: thiếu nó thì test chỉ
  khẳng định được "gọi không ném lỗi", mà hai earcon giống hệt nhau vẫn
  xanh — đúng thứ vừa phải đi sửa.
- Onboarding: bắn gói tin 60 giây đầu, animation theo path (2 chặng ×
  280ms ease-out; reduced-motion → tới thẳng đích).

## 11. Drill (engine/subnet)

- Hai chế độ: `drill: 'subnet' | 'vlsm'`. `DrillResult.mode` bắt buộc;
  mỗi màn luyện chỉ đọc lịch sử CÙNG LOẠI (hai loại không chung thang đo).
- Drill VLSM chấm THIẾT KẾ, không so lời giải mẫu: ba tiêu chí đúng / đủ
  / không phí đất — bỏ tiêu chí ba là "chia đều mỗi phòng một /26" cũng
  qua, đúng thói quen VLSM sinh ra để chữa. Đề tự sinh có seed tất định.
- **Phiên VLSM dở lưu vào `vlsmDrillDraft`** (store, một ngăn duy nhất):
  seed + đề đang đứng + ô đã điền + kết quả các đề đã qua; xóa khi phiên
  xong. Seed dùng ngày LOCAL (`todayIso()`) — test cũng phải dùng nó,
  `toISOString` là ngày UTC, lệch một ngày trong khung 0h-7h giờ VN.
- **Enter giữa bảng còn ô trống là NO-OP** (8 ô chung một form, phản xạ
  Enter đốt oan một bậc thang gợi ý); nộp bằng nút "Kiểm tra". Ba tiêu
  chí hiện trạng thái bằng CHỮ (đạt/chưa đạt) cạnh ký hiệu, nếp CLI/lab.

## 12. Launcher trên máy (scripts/launch-app.mjs + staticHandler.mjs)

- **Bộ xử lý HTTP là bề mặt DUY NHẤT của dự án nhận dữ liệu từ ngoài tiến
  trình**: máy chủ nghe ở 127.0.0.1:4173-4183, nên bất kỳ trang web nào người
  học mở cũng bắn được request vào (khác nguồn vẫn TỚI được handler, chỉ là
  không đọc được phản hồi).
- **LUẬT: một request hỏng không bao giờ được giết tiến trình.** Listener của
  `http` chạy đồng bộ nên một cú ném là uncaught exception → Node thoát → máy
  chủ chết giữa buổi học. Ba đường từng ném, giờ đều có lưới (khối 21.15):
  `decodeURIComponent` gặp escape hỏng (`/%`), `statSync` gặp file vừa biến
  mất (TOCTOU), và `createReadStream` mở file hỏng — stream không gắn handler
  `'error'` là uncaught exception ở tick sau. `tests/staticHandler.test.ts` khóa.
- **Ruột tách khỏi `launch-app.mjs` là có chủ đích**: file đó chạy thẳng (build,
  mở cổng, bung trình duyệt) nên nạp vào test là nó chạy thật. Logic phục vụ
  nằm ở `staticHandler.mjs` + `staticHandler.d.mts` (nếp `render-content-review`).
- Đường leo ra ngoài `dist` vẫn bị chặn bằng phép so tiền tố; đường không phải
  file tĩnh rơi về `index.html` (browser router). Chưa build thì trả **404**,
  đừng trả 200 rỗng.

## 12. Công cụ soạn bài (tools/mcp)

- **Thước "đủ cách nói" (khối 21.14)** — dùng CHUNG giữa MCP và
  `content:review`, sửa một nơi: (a) gộp biến thể chỉ khác DẤU trước khi
  đếm (bộ chấm vốn nhân nhượng dấu — soạn thêm bản không dấu là đếm ảo);
  (b) bỏ qua đáp án KÝ HIỆU (IP, port) và đáp án chỉ có MỘT CÁI TÊN (tên
  lệnh, viết tắt + tên đầy đủ tiếng Anh) — ở đó cách nói thứ ba không tồn
  tại. Ngưỡng hiện tại: 3 cách nói cho đáp án diễn đạt được bằng lời Việt.
- **Nới accept phải nới ĐÚNG**: mỗi cách nói thêm phải là câu trả lời đúng
  cho chính câu đó. Cụm quá NGẮN là bẫy — "chuyển mạch" trần nhận luôn
  "chuyển mạch gói" (một kỹ thuật, không phải thiết bị). Thêm xong thì
  chạy `grade_answer` với vài đáp án SAI để kiểm ngược.

- **MCP server CHỈ ĐỌC** (`tools/mcp/`, khối 21.13): không sửa nội dung,
  không sửa tiến độ, không gọi mạng. Muốn nới accept thì `accept_patch_line`
  dựng dòng JSON, người soạn bài tự dán — tool tự sửa nội dung theo lời
  than của người học là đường ngắn nhất tới chỗ câu nào cũng đúng.
- **Không có bản sao bộ chấm thứ hai**: server import thẳng
  `src/engine/grading/normalize.ts` (Node chạy TS bằng type stripping, nên
  import PHẢI kèm đuôi `.ts` và tsconfig bật `allowImportingTsExtensions`).
  Viết lại luật chấm trong tools/ là mở đường cho hai bộ chấm lệch nhau.
- **Phân biệt `solution` với `explain`** khi đo accept-hẹp: lời giải bài
  tập MỞ ĐẦU bằng cụm đáp án nên so với accept là có nghĩa; `explain` của
  câu đứng độc lập mở đầu bằng câu giảng/ẩn dụ nên so là báo động giả (3
  phát hiện rác ngay lần chạy đầu, có test khóa).
- Giao thức viết tay: stdio + JSON-RPC 2.0 phân cách bằng DÒNG; notification
  (không có `id`) TUYỆT ĐỐI không được trả lời. Có test spawn server thật.
- **Vì sao không gọi Claude lúc chấm bài**: app là static thuần trên Pages
  (key vào bundle = công khai key), phải chấm được khi mất mạng, và cổng
  85% chỉ có nghĩa khi cùng câu trả lời luôn ra cùng kết quả.

## 12. Test người thật

- Kịch bản ở `KICH-BAN-TEST.md`: mục 9 (Phần C — interleaving, tòa GPO
  trên giấy, 3 cặp contrast), mục 10 (M11 — 2 ca chưa gặp), và DoD
  trung cấp (spec v2 mục 6: cấu hình trunk từ yêu cầu suông, khoanh bệnh
  native-lệch trong 10 phút, capstone không cần gợi ý tầng 3).
- Các buổi test cần NGƯỜI — không code được, treo ở đó là bình thường.
