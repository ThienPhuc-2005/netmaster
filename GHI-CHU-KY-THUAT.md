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
- `hasCycle` (gradeLab) chỉ đếm dây NẰM TRONG tầng 2: router chặn khung
  quảng bá nên vòng qua router không sinh bão — mạng nhiều router nối
  vòng là ĐƯỜNG DỰ PHÒNG (M16 dựng lên để khen), chẩn đoán `l2-loop` ở
  đó là dạy ngược. `l2-loop` cũng chỉ là bệnh khi CHƯA bật STP.
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

## 4. Terminal PowerShell (engine/ps + features/ps)

- Phạm vi đóng băng — MỐC 2, **11 cmdlet**: 8 gốc (Get-Help,
  Get-NetIPAddress, Test-NetConnection, Get-ADUser, New-ADUser,
  Import-Csv, Get-Content, Select-String) + 3 nhóm cho AGDLP M19
  (Get-ADGroup, Get-ADGroupMember, Add-ADGroupMember). Pipeline MỘT
  tầng; KHÔNG scriptblock/biến/vòng lặp — quá một dấu ống là lỗi có chủ
  đích, đừng "tiện tay" mở ngữ pháp.
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

## 7. Nội dung & bài thi mastery

- **`masteryTest` là POOL, không phải ĐỀ**: mỗi module >= 12 câu, mỗi
  lượt `drawMasteryTest` rút 8 rồi xáo. Ba thứ không được phá: (a) cỡ đề
  cố định 8 — `MASTERY_DRAW_COUNT` đổi là đổi nghĩa ngưỡng 85% (7/8);
  (b) câu TRỤ (lab/palace-walk/clinic/ps/cli) luôn vào đề — chúng LÀ kỹ
  năng của module; (c) thi lại RÚT ĐỀ MỚI.
- **Màn rớt KHÔNG in đáp án** (chỉ ý cần ôn — hintTopic); đáp án đầy đủ
  chỉ hiện khi ĐẬU. Câu + lựa chọn MCQ xáo mỗi lượt/mỗi lần render.
- **Distractor không lộ đáp án bằng ĐỘ DÀI** (content.test khóa hai hàng
  rào: từng câu ≤ 1.1× distractor dài nhất trừ khi chênh ≤ 8 ký tự; toàn
  đề ≤ 45% câu có đáp án dài nhất). Distractor phải là lỗi hiểu nhầm
  THẬT, cấm distractor "đùa".
- **Accept gõ tay phủ cách gõ người thật**: bộ chấm tách token nên ký
  hiệu biến mất ("dấu |" → "dau", "65,535" → hai số). Đáp án là KÝ HIỆU
  thì accept có cả biến thể đọc thành chữ + biến thể có dấu phân cách
  (content.test chạy 19 cách gõ thật qua `typedAnswerMatches`).
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

## 8. Store, persist & điều hướng

- `src/store/progress.ts` là nơi DUY NHẤT nối engine + thời gian thật +
  localStorage. XP/streak chỉ từ retrieval/lab và CHỈ lần học đầu.
- **Persist đang ở v4. Cửa migrate**: đổi shape state = bump version +
  nối một bậc `v(n) → v(n+1)` + cập nhật fixture
  `tests/fixtures/progressV1.json` (`progress.migrate.test.ts` là chuông
  báo). Thêm NHÁNH vào union (vd PracticeDraft thêm kind) thì KHÔNG bump.
- **Bài dở lab/PS/CLI lưu qua `practiceDrafts`** (khóa
  `lessonId::questionId`) — CHỈ trong bài học; `ModuleTestPage` cố ý
  KHÔNG truyền draftKey (mang đề thi về nhà làm dần là phá thang 85%;
  `QuestionInput.draft.test.tsx` gác). Lab không lưu lịch sử undo,
  `restoreLab` giữ `initial` là đề bài; PS/CLI lưu cả nhật ký lệnh, "Làm
  lại từ đầu" xóa draft. Lưu bài dở KHÔNG XP/streak/answerHistory.
- **Phiên ôn có relearning**: thẻ quên requeue cuối phiên tới khi tự nhớ
  được; CHỈ lượt chấm đầu ghi SM-2 + XP (`ReviewPage.test.tsx` khóa).
- Điều hướng: mở app còn thẻ đến hạn → vào Ôn tập trước (gate ở
  main.tsx, quyết định trong effect SAU khi zustand rehydrate). AppGate
  chặn mọi route tới khi `onboardingDone`.

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
- Motion: app bọc `LazyMotion strict` — dùng `m.*`, KHÔNG `motion.*`;
  reduced-motion do `MotionConfig` + token `--dur` lo; animation CSS mới
  phải buộc thời lượng vào `--dur`.
- KHÔNG import tĩnh NetworkLab/ClinicRoom/PsConsole/CliConsole vào đường
  nóng — chúng lazy trong QuestionInput; route ngoài Learn/Review/Lesson
  lazy trong main.tsx.
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
- Icon dùng Lucide; cấm emoji làm icon. Âm: 4 earcon Web Audio tổng hợp,
  tắt được, không file âm.
- Onboarding: bắn gói tin 60 giây đầu, animation theo path (2 chặng ×
  280ms ease-out; reduced-motion → tới thẳng đích).

## 11. Drill (engine/subnet)

- Hai chế độ: `drill: 'subnet' | 'vlsm'`. `DrillResult.mode` bắt buộc;
  mỗi màn luyện chỉ đọc lịch sử CÙNG LOẠI (hai loại không chung thang đo).
- Drill VLSM chấm THIẾT KẾ, không so lời giải mẫu: ba tiêu chí đúng / đủ
  / không phí đất — bỏ tiêu chí ba là "chia đều mỗi phòng một /26" cũng
  qua, đúng thói quen VLSM sinh ra để chữa. Đề tự sinh có seed tất định.

## 12. Test người thật

- Kịch bản ở `KICH-BAN-TEST.md`: mục 9 (Phần C — interleaving, tòa GPO
  trên giấy, 3 cặp contrast), mục 10 (M11 — 2 ca chưa gặp), và DoD
  trung cấp (spec v2 mục 6: cấu hình trunk từ yêu cầu suông, khoanh bệnh
  native-lệch trong 10 phút, capstone không cần gợi ý tầng 3).
- Các buổi test cần NGƯỜI — không code được, treo ở đó là bình thường.
