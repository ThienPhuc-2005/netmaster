# Trạng thái dự án — NetMaster (Phase 1 xong, đang Phase 2)

Cập nhật: 2026-08-06. File này chỉ để nắm nhanh tình hình khi mở lại dự
án. Nguồn chân lý vẫn là `SPEC-APP-HOC-MANG.md`; luật làm việc ở
`CLAUDE.md`; nội dung bài đọc duyệt ở `REVIEW-NOI-DUNG.md`.

## Đang ở đâu

Phase 1 (MVP) đã xong **cả 6 khối**, cộng **2 lượt sửa** sau khi người
thật dùng thử và người duyệt đọc nội dung. Việc duy nhất còn treo của
Phase 1 là **buổi test người thật theo `KICH-BAN-TEST.md`** (tiêu chí
đậu: vẽ lại đường đi gói tin từ trí nhớ) — việc này cần người, không
code được.

| Khối | Nội dung | Trạng thái |
|------|----------|-----------|
| 1 | Pedagogy engine thuần TS (SM-2, mastery gate, máy trạng thái 6 bước, XP/streak, bộ chấm, drill subnetting) | Xong |
| 2 | Design system: tokens 60-30-10 (dark mặc định + light, contrast AA có test WCAG), 4 earcon Web Audio, component nền, layout 4 tab, khung i18n VI/EN | Xong |
| 3 | Màn hình nghiệp vụ: LessonPlayer 6 bước, phiên ôn flashcard, drill subnetting, Hồ sơ, store persist localStorage | Xong |
| 4 | Onboarding 60 giây: bắn gói tin A → router → B, animation theo path bằng motion | Xong |
| 5 | Nội dung thật Module 1-3, màn thi mastery, REVIEW-NOI-DUNG.md | Xong |
| 6 | Đối chiếu Definition of Done + kịch bản test người thật (`KICH-BAN-TEST.md`) | Xong |

Khối 6 đã đối chiếu DoD trên browser thật (đi trọn bài học 6 bước, phiên
ôn SM-2, luật "mở app là ôn trước", drill, mobile không tràn ngang) và vá
1 lỗi tìm thấy khi đối chiếu: màn Phòng khám hiện key i18n trần vì
vi/en.json thiếu mục `clinic.*` — đã bổ sung chuỗi và thêm test quét key
mồ côi (key gọi trong code phải tồn tại trong dictionary).

## Phase 2 — hạng mục (5): simulation lab kéo-thả Module 4

Kế hoạch chia 6 khối, đã duyệt. Quyết định đã chốt: lab đặt ở **bước
Đoán thử** (giữ nguyên tuple 6 bước); hai nút tách bạch **"Gửi thử"
(miễn phí) / "Nộp bài" (tính lượt)**; **mobile phải hoàn thành được lab**
(mọi thao tác có đường bấm-chọn, kéo-thả chỉ là đường phụ); phạm vi mô
phỏng đóng băng ở **MAC table + ARP + VLAN cổng access + router** (không
trunk, không router-on-a-stick); bài thi mastery Module 4 có **đúng 1 câu
lab đặt cuối**.

| Khối | Nội dung | Trạng thái |
|------|----------|-----------|
| 2.1 | Dọn đường: bỏ mọi chỗ đếm cứng số module ở tầng nội dung | Xong |
| 2.2 | Bộ mô phỏng mạng thuần `src/engine/lab/` (topology, ping từng chặng, undo) | Xong |
| 2.3 | `gradeLab` + `LabSpecSchema` (chưa cắm vào union câu hỏi) | Xong |
| 2.4a | UI lab `src/features/lab/` — chơi được thật, trưng ở `/design` | Xong |
| 2.4b | Cắm lab vào pipeline 6 bước (`kind:'lab'` trong union câu hỏi) | Xong |
| 2.5 | Nội dung `content/modules/module-04.json` + hình khái niệm | Xong |
| 2.6 | Đối chiếu DoD + kiểm browser + cập nhật tài liệu | Xong |

**Khối 2.1 đã làm gì** (không đổi hành vi người học):
- `validateModules` ép **`order` duy nhất** giữa các module — trùng order
  khiến thứ tự sắp xếp không xác định, mastery gate có thể mở nhầm module
  (lỗ hổng nguyên tắc 2, tồn tại độc lập với Module 4).
- `content.test.ts` bỏ mảng id hard-code và điều kiện "mọi module Phần A";
  thay bằng bất biến suy từ dữ liệu (order liên tục từ 1, phần không lùi
  A→B→C) và tra module theo id thay vì chỉ số mảng.
- `render-content-review.mjs`: `renderQuestion` thêm nhánh **ném lỗi khi
  gặp `kind` lạ** (trước đây im lặng nuốt mất phần đáp án — người duyệt ký
  vào bản review thiếu dữ liệu); tiêu đề sinh từ dữ liệu; tách `main()`
  sau cờ chạy-như-lệnh để test import được mà không ghi đè file.
- `ConceptVisual`: bản đồ khóa học (advance organizer Module 2) giữ lưới
  12 module theo spec nhưng **tô sáng theo số module thật đang có**; thêm
  `hasVisual()` và test chặn visualId không có hình (trước đây rơi âm
  thầm về hình thư chung).

Đã chứng minh dứt điểm bằng cách thả tạm một `module-04.json` thứ tư vào
`content/modules/`: test vẫn xanh, `content:review` tự đổi tiêu đề thành
"Module 1-4 (Phần A+B)", bản đồ khóa học tự sáng 4 ô — rồi xóa file tạm.

**Khối 2.2 đã làm gì** (headless — app người dùng không đổi một pixel):
- `src/engine/lab/topology.ts` — mô hình mạng + `validateTopology` trả mã
  lỗi CẤU TRÚC (dây trỏ cổng không có, một cổng hai dây, trùng MAC…).
  Phân biệt rạch ròi với lỗi CẤU HÌNH (thiếu gateway, sai VLAN): lỗi cấu
  hình là thứ người học phải tự tìm, không phải bug.
- `src/engine/lab/simulate.ts` — `simulatePing` trả **chuỗi chặng có thứ
  tự** để UI phát lại thành animation. Bốn khoảnh khắc dạy học được mã
  hóa thành `HopReason`: `broadcast-flood` (ARP hỏi cả phòng),
  `unknown-unicast-flood` (switch chưa học → phát tán), `mac-table-hit`
  (đã học → đi đúng một cổng), `routed` (router đổi MAC, giữ nguyên IP).
  Thất bại trả mã chẩn đoán: `arp-unresolved` (chính là ca hai máy khác
  VLAN), `no-gateway`, `gateway-off-subnet`, `no-route`,
  `broadcast-storm`, `hop-budget-exceeded`.
- `src/engine/lab/session.ts` — trình soạn thảo + **undo dạng ảnh chụp**
  (spec 4.5). `LabAllowance` cho phép đề bài giới hạn thao tác, engine ÉP
  chứ không chỉ để UI ẩn nút. `classifyDiff` + `allowanceViolations` là
  nguyên liệu cho cross-check nội dung ở khối 2.3.
- `tests/fixtures/labFixture.ts` — 5 topology mẫu, gồm **ca hỏng của spec
  Module 4** (hai máy cùng dải IP nhưng khác VLAN) và lời giải của nó.

Ba đơn giản hóa CỐ Ý so với thiết bị thật, đã ghi trong đầu file
`topology.ts`: không trunk (hai switch nối nhau bằng cổng access, khung
chỉ qua khi hai đầu cùng VLAN); switch không có IP quản trị; mỗi cổng
router mang đúng một IP.

**Khối 2.3 đã làm gì** (vẫn headless — `QuestionSchema` chưa có nhánh lab):
- `src/engine/lab/gradeLab.ts` — chấm **hành vi, không chấm hình dạng**:
  chạy mô phỏng rồi hỏi "mạng này có làm được việc đề bài yêu cầu không",
  không so sơ đồ người học với sơ đồ mẫu. Mọi lời giải chạy được đều được
  công nhận (IKEA effect). Bốn loại mục tiêu: `ping` (reach/blocked),
  `pathThrough`, `macLearned`, `arpResolved`.
- **Cặp `reach` + `blocked` là mấu chốt sư phạm**: thiếu goal `blocked`
  thì bài VLAN bị "giải" bằng cách gộp tất cả vào một VLAN — đúng kết
  quả, sai bài học. Đã khóa bằng test.
- `diagnose()` bám MỤC TIÊU của đề, không chỉ nhìn sơ đồ: bài chia phòng
  ban cố ý có hai VLAN trong cùng dải địa chỉ, nên triệu chứng "cùng dải
  khác VLAN" chỉ được nêu cho đúng cặp máy mà đề đòi phải thông nhau.
- `src/engine/lab/labSchema.ts` — zod cho đề lab, ép các ràng buộc mà
  schema thuần cấu trúc không nói được: **lời giải phải thật sự giải
  được** (chạy `gradeLab` lên chính nó), **đề bài chưa được giải sẵn**
  (productive failure ép ở tầng dữ liệu), **lời giải chỉ dùng thao tác mà
  đề cho phép** (đề không được đòi thứ chính nó cấm).
- Fixture thêm 2 đề lab mẫu: "sửa VLAN chia phòng ban" và "lắp mạng từ
  thiết bị rời" — chính là hình dạng dữ liệu Module 4 sẽ khai trong JSON.

**Khối 2.4a đã làm gì** (lab chơi được thật; pipeline 6 bước chưa đụng):
- `src/features/lab/` — mặt bàn ba tầng: dây vẽ SVG, thiết bị và cổng là
  `<button>` thật, gói tin bay ở tầng trên. Thiết bị KHÔNG nằm trong SVG
  để chúng là nút thật — nhờ đó bàn phím, trình đọc màn hình và test đi
  chung một đường mã với chuột.
- **Một action, hai đường vào**: mọi thao tác (nối dây, đổi VLAN, đặt địa
  chỉ, gỡ thiết bị) làm trọn được bằng BẤM CHỌN; kéo-thả chỉ để sắp xếp
  cho dễ nhìn. Đây là lý do lab dùng được trên điện thoại (đã chốt).
- **Toạ độ bằng một hệ số, không dùng `getScreenCTM()`** (jsdom không có
  API đó): canvas co giãn đều nên quy đổi con trỏ chỉ là một phép chia,
  và `width === 0` chốt hệ số 1 — chính điều này làm kéo-thả test được.
- Hai nút tách bạch: **"Gửi thử" miễn phí, "Nộp bài" mới tính lượt**.
- **Nhật ký chặng LUÔN render đầy đủ**, kể cả khi tắt chuyển động hoặc
  trong jsdom. Animation là lớp dual-coding đắp thêm, không phải nơi
  chứa tải trọng sư phạm.
- Rút `PacketShape` / `DeviceGlyph` / `samplePath` thành dùng chung với
  onboarding — spec 4.2 đòi "gói tin luôn cùng một hình dạng ở mọi
  module", giờ là component thật chứ không phải lời hứa.
- Trưng bày ở `/design` với một đề lab đi qua `parseLabSpec` nên nó phải
  hợp lệ y hệt đề thật.

**Khối 2.4b đã làm gì** (bật công tắc — lab thành một dạng câu hỏi thật):
- `QuestionSchema` có nhánh thứ tư `kind: 'lab'`; `QuestionResponse` thêm
  `{kind:'lab', topology}`; `gradeQuestion` ủy quyền cho `isLabSolved`.
- `QuestionInput` render phòng lab; `AnswerReveal` cho `canonicalAnswer`
  trả `null` với lab (một sơ đồ không rút gọn thành một dòng chữ được, và
  mọi lời giải chạy được đều hợp lệ).
- `render-content-review.mjs` diễn đạt đề lab thành chữ: sơ đồ, mục tiêu,
  quyền thao tác, lời giải mẫu — người duyệt không phải mở JSON topology.
- **`lessonMachine.ts` vẫn KHÔNG bị sửa một dòng nào** — bất biến của cả
  hạng mục còn nguyên. `labInPipeline.test.ts` khóa lời hứa đó: thang 3
  tầng, cổng qua bước, XP và lịch sử trả lời chạy y hệt câu gõ tay.

**Khối 2.5 đã làm gì** (nội dung thật của Module 4):
- `content/modules/module-04.json` — Phần B, 5 chặng × 1 bài, 6 khái niệm
  (switch, bảng MAC, ARP, VLAN, miền quảng bá, định tuyến), bài thi 8 câu
  **kết bằng đúng 1 câu lab** như đã chốt.
- Ba bài lab đặt đúng chỗ spec đòi: bài 2 có lab **lắp mạng từ thiết bị
  rời** (IKEA effect); bài 4 có lab **sửa mạng hỏng ngay ở bước Đoán thử**
  — người học vọc trước khi đọc lý thuyết VLAN (productive failure), sai
  không chặn và không trừ điểm; bài 4 bước Thử tay có lab đầy đủ với cặp
  mục tiêu "phải thông + phải chặn".
- Hệ ẩn dụ bưu điện nối tiếp từ Module 1-3: switch là bưu cục của làng,
  bảng MAC là cuốn sổ nhớ mặt, ARP là tiếng gọi giữa sân, VLAN là bức
  tường ngăn xóm, router là cây cầu.
- 6 hình SVG mới trong `ConceptVisual` REGISTRY.
- **PHÉP THỬ KIẾN TRÚC ĐẠT: khối này KHÔNG sửa file nào trong
  `src/engine/`.** Thêm module mới đúng là chỉ thêm một file JSON.

**Khối 2.6 đã làm gì** (khép hạng mục):
- **Vá một lỗi thật phát hiện khi kiểm mobile:** sidebar dọc ăn 224px
  trong màn 375px, chỉ chừa ~87px cho nội dung — lab không thao tác nổi.
  Dưới 768px, menu 4 mục giờ chuyển xuống **thanh đáy** và canvas lab
  **cuộn ngang trong khung riêng** (giữ chiều rộng tối thiểu 560px để hai
  vùng chạm cổng không dính nhau). Lỗi này có từ Phase 1 nhưng khi đó
  mobile chỉ cần đọc; quyết định "lab phải hoàn thành được trên điện
  thoại" biến nó thành mục CHƯA ĐẠT.
- Đã kiểm trên máy 375px: giải trọn bài lab bằng đường bấm chọn, chip
  VLAN 72×26px, không tràn ngang. Desktop không hồi quy.
- `KICH-BAN-TEST.md` thêm buổi test Module 4: tiêu chí đậu là **tự chẩn
  đoán được một mạng hỏng chưa từng gặp và nói được vì sao**.
- `CLAUDE.md` cập nhật cấu trúc + các luật của phòng lab không được phá.

Kiểm tra khi khép hạng mục: **596/596 test xanh** (+237 so với Phase 1),
`npm run typecheck` sạch, `npm run build` qua. Đã kiểm trên trình duyệt
thật: sửa VLAN → mục tiêu chuyển xong, hoàn tác trả đúng trạng thái
trước, vùng chạm cổng 24px cách nhau 30px (WCAG 2.5.8). Và kiểm
end-to-end bằng cách thả tạm một module có bài lab vào `content/modules/`:
bài đi trọn 6 bước, nộp lab đúng → "Chuẩn luôn!" → qua bước → **+10 XP
đúng bằng XP bước Làm** — rồi xóa file tạm.

Đã commit `3e0b3b4` và push: workflow xanh, **Module 4 đã lên bản live**
(kiểm bằng cách tải bundle của Pages, có nội dung Module 4 và chuỗi của
phòng lab).

## Phase 2 — hạng mục (6): Module 5, 6, 7 + cung điện ký ức Port

Kế hoạch chia 6 khối. Làm cung điện TRƯỚC nội dung: nó là mảnh kiến trúc
mới duy nhất của hạng mục này (đúng vai trò phòng lab ở hạng mục 5), làm
xong thì Module 5/6/7 chỉ còn là viết JSON.

| Khối | Nội dung | Trạng thái |
|------|----------|-----------|
| 6.1 | Engine cung điện ký ức thuần TS (`src/engine/palace/`) | Xong |
| 6.2 | UI hai chuyến đi + cắm vào pipeline 6 bước | Xong |
| 6.3 | Nội dung Module 5 (TCP/UDP/Port) + hình khái niệm | Xong |
| 6.4 | Nội dung Module 6 (DNS phân cấp, DHCP DORA, DoH) | Xong |
| 6.5 | Nội dung Module 7 (NAT/PAT, port forwarding, firewall, mạng nhà) | Xong |
| 6.6 | Đối chiếu DoD + kiểm browser + cập nhật tài liệu | Xong |

**Khối 6.1 đã làm gì** (headless — app người dùng không đổi một pixel):
- `src/engine/palace/palace.ts` — tòa nhà **5 tầng × 3 phòng = 15 phòng**,
  `validatePalace` trả mã lỗi CẤU TRÚC (lưới có lỗ, trùng cổng, hai phòng
  chung một hình…). `tourRoute` chốt **lộ trình cố định** tầng trệt lên
  nóc, trái sang phải — thứ tự phòng trong JSON không đổi được đường đi
  của người học, vì bản thân thứ tự là một phần của cái được nhớ.
- `src/engine/palace/walk.ts` — **hai chuyến đi tách bạch**: đi xem
  (encoding, không chấm, không cộng điểm — nguyên tắc 5) và đi lại từ trí
  nhớ (retrieval, thang 3 tầng dùng lại `feedbackTier` của bài học). Chấm
  tách hai vế cổng/dịch vụ để phản hồi nói đúng chỗ hổng; sai 3 lần được
  mở đáp án nhưng **vẫn phải tự gõ lại mới đi tiếp**.
- `src/engine/palace/cards.ts` — **15 phòng = 15 thẻ SM-2 riêng**, khóa
  `palace:<roomId>`. Nhờ tiền tố, hàng đợi ôn tập / SM-2 / dữ liệu đã lưu
  của người học chạy nguyên, không phải sửa gì.
- `src/engine/palace/palaceSchema.ts` — zod + chốt chặn nội dung: **câu
  chuyện gợi nhớ phải nhắc đúng số cổng** (hình ảnh không dính số thì
  người học nhớ ổ khóa vàng mà vẫn quên 443 — chỗ hay hỏng nhất của cung
  điện làm ẩu), và **không hai phòng nào nhận chung một câu trả lời**,
  kiểm bằng chính hàm chấm chứ không so chuỗi thô.
- `src/engine/ltext.ts` — tách `LTextSchema` khỏi contentSchema để hai
  schema nội dung dùng chung mà không import chéo. contentSchema re-export
  nên nơi gọi cũ không phải sửa.
- Fixture `tests/fixtures/palaceFixture.ts` dựng đủ **15 port của spec**
  vào tòa nhà — chính lúc dựng đã lộ một ca thật: "SMTP Submission" chứa
  nguyên cụm "SMTP" nên bộ chấm tính đúng cho cả phòng 25; đã đổi thành
  "Mail Submission" và khóa ca này bằng test.
- 652/652 test xanh (+56), typecheck sạch.

**Khối 6.2 đã làm gì** (cung điện thành thứ chơi được thật):
- **Đã chốt hướng A**: chuyến đi xem là một MÀN DẠY (`palaceTour` trên
  màn dạy — vẫn "một màn = một khái niệm", khái niệm ở đây là cung điện);
  chuyến đi lại từ trí nhớ là nhánh thứ NĂM của `QuestionSchema`
  (`kind: 'palace-walk'`). `lessonMachine.ts` lại KHÔNG bị sửa dòng nào.
- Engine thêm khả năng đi TỪNG ĐOẠN (`startTour/startWalk(palace, roomIds)`):
  nội dung chia 15 phòng ra học dần, không nhồi một lượt (nguyên tắc 3).
  Đoạn nào cũng đi theo đúng thứ tự lộ trình gốc dù khai lộn xộn.
- Luật chấm chuyến đi: **đạt = đi trọn đúng đoạn đề bài đòi và không
  phòng nào phải mở đáp án**. Quên một nhịp rồi tự nhớ ra vẫn đạt (đó vẫn
  là nhớ lại thành công); không đặt thêm ngưỡng phần trăm mới nào.
- `src/features/palace/` — `PalaceTour` (đi xem: hình + số + chuyện),
  `PalaceWalk` (đi lại: chỉ chỗ và HÌNH làm gợi ý, tầng 2 mới kể chuyện,
  tầng 3 mới nói số), `PalaceMap` (sơ đồ 5 tầng, lật ngửa dần theo bước
  chân — vừa là mỏ neo không gian vừa là thanh tiến độ), `RoomGlyph`
  (15 hình vẽ tay, registry KHÔNG có hình dự phòng: thiếu hình là lỗi
  soạn bài, có test chặn), `parsePorts` (người thật gõ "67 và 68").
- Schema cấp module ép **thứ tự sư phạm**: phòng phải được dẫn đi xem
  TRƯỚC khi bị hỏi lại; mỗi phòng chỉ dạy một lần; dạy rồi thì phải có
  câu bắt nhớ lại (nguyên tắc 1). `validateModules` thêm luật id phòng
  duy nhất toàn cục.
- Hộp ôn tập: học xong bài nào thì các phòng bài đó dẫn qua thành thẻ
  SM-2 riêng; `ReviewPage` biết lật hai loại mặt thẻ (khái niệm và
  phòng) — SM-2, hàng đợi, luật "mở app là ôn trước" không phải sửa gì.
- `render-content-review.mjs` tả được cung điện, màn đi xem và câu đi
  lại; `/design` trưng cả hai chuyến cạnh nhau (tự dùng tòa nhà thật khi
  Module 5 có mặt).
- 707/707 test xanh (+55), typecheck sạch, build qua. Đã kiểm trên trình
  duyệt thật: đi trọn tầng 1, gõ không dấu ("web thuong") vẫn được chấm
  đúng, bản đồ lật ngửa đúng nhịp, kết quả "đạt — nhớ được cả đoạn" kèm
  "nhớ được ngay 2/3 phòng"; mobile 375px không tràn ngang.

**Khối 6.3 đã làm gì** (nội dung thật của Module 5):
- `content/modules/module-05.json` — Phần B, 5 chặng, **8 bài**, 11 khái
  niệm, cung điện 15 phòng đúng 15 port của spec. Ba bài đầu dạy TCP /
  bắt tay 3 bước / UDP / luật của số cổng; năm bài sau mỗi bài đi một
  TẦNG của cung điện (3 phòng), đi xem ở bước Dạy rồi đi lại từ trí nhớ
  ngay ở bước Nhớ lại của chính bài đó.
- **Von Restorff cho SYN-ACK** (spec đòi): trong hình bắt tay, hai nhịp
  SYN và ACK vẽ mờ, nhịp giữa SYN-ACK vẽ khác hẳn — màu nhấn, nét dày,
  mũi tên hai đầu, có khung bao. Cái lạ chỉ nổi khi xung quanh bình thường.
- Câu gõ tay về SYN-ACK khai `nearMisses` cho hai câu trả lời cận-đúng
  hay gặp nhất ("syn", "ack") — mỗi câu có lời phản hồi may đo riêng.
- 6 hình SVG mới trong `ConceptVisual`: bắt tay 3 nhịp, TCP gửi lại gói
  thiếu, UDP bắn một chiều, dãy cửa cổng nổi tiếng, cổng tạm thời, tòa
  nhà cung điện.
- `content.test.ts` thêm 3 bất biến suy từ dữ liệu (không đếm cứng):
  mọi phòng của cung điện phải được dẫn đi xem, mọi phòng phải bị hỏi
  trong **bài thi module** (không phòng nào lọt qua cổng mastery), và
  cung điện Module 5 phải gồm đúng 15 port spec liệt kê.
- 710/710 test xanh (+3), typecheck sạch, build qua. Đã đi trọn bài
  m5-bai-4 trên trình duyệt thật: tour khóa nút đi tiếp tới khi đi hết
  đoạn, chuyến nhớ lại chấm "Chuẩn luôn!", +30 XP, Hộp ôn tập nhận đúng
  1 thẻ khái niệm + 3 thẻ phòng, và thẻ phòng lật ra "Cổng 53 — DNS".

**Khối 6.4 đã làm gì** (nội dung thật của Module 6):
- `content/modules/module-06.json` — Phần B, 5 chặng, 5 bài, 8 khái niệm.
  DNS ba tầng (gốc → TLD → có thẩm quyền) và vai trò resolver; bản ghi
  A/AAAA/CNAME/MX; **DNS over HTTPS** làm góc hiện đại, nối thẳng về
  phòng 443 của cung điện Module 5; DHCP DORA; và tờ giấy thuê có hạn.
- **DORA kể thành chuyện hỏi cưới** như spec đòi: Discover là chàng trai
  hỏi to giữa sân, Offer là các nhà đánh tiếng, Request là chốt một nhà
  TRƯỚC CẢ LÀNG, Ack là nhà ấy gật đầu. Hình vẽ nhấn riêng nhịp Request
  (nét dày, màu nhấn) vì nó là nhịp khó hiểu nhất.
- **Self-explanation đậm** đúng câu spec chỉ định: "tại sao DHCP vẫn phải
  có nhịp Request dù đã nhận Offer?" — ba nhóm từ khóa (nhiều máy chủ /
  chọn công khai / rút lời trả địa chỉ về kho).
- 8 hình SVG mới; và **vá một lỗi thật của tầng hình**: đầu mũi tên
  `cv-arrow` trước đây chỉ khai bên trong MỘT hình, hình nào vẽ mũi tên
  mà quên khai lại thì nét đó cụt đầu — lỗi im lặng, chỉ nhìn mới thấy.
  Nay khai ở `Frame` nên mọi hình đều có.
- `/design` thêm mục **"Hình khái niệm"** bày hết 54 hình ra một trang.
  Nhờ nó phát hiện thêm 3 chỗ chữ tràn khung (kể cả một chỗ có sẵn từ
  Phase 1: nhãn "C · 8-12" của bản đồ khóa học bị cắt đuôi) — đã sửa cả.
- 710/710 test xanh, typecheck sạch, build qua. Đã soi cả 54 hình trên
  trình duyệt thật, đo bằng `getBBox` để chắc không còn chữ nào tràn.

**Khối 6.5 đã làm gì** (nội dung thật của Module 7 — hết Phần B):
- `content/modules/module-07.json` — 5 chặng, 5 bài, 6 khái niệm. NAT/PAT
  (ẩn dụ chung cư của Module 1 quay lại: cả nhà một số nhà, phân biệt
  bằng số căn hộ), port forwarding, tường lửa stateful, kiến trúc mạng
  nhà, và double NAT khi cắm thêm router thứ hai.
- **Bài lab "vẽ lại sơ đồ mạng nhà BẠN"** như spec đòi (học gắn đời
  thật): người học nối máy tính + điện thoại qua switch lên router nhà
  rồi đặt địa chỉ cho chúng; phần router ra modem đã đấu sẵn y như đời
  thật. Chấm bằng hành vi: cả hai thiết bị phải ping được máy chủ ngoài
  Internet, đi qua HAI router bằng tuyến mặc định.
- Nội dung nối chéo về các module trước: port forwarding nhắc lại phòng
  3389/445 của cung điện Module 5; bài mạng nhà dạy cách nghi đúng chặng
  khi mất mạng (nền cho Phòng khám ở Phase 3).
- 6 hình SVG mới. Đã đo lại toàn bộ 65 hình bằng `getBBox` trên
  `/design`: không hình nào còn chữ tràn khung.
- 710/710 test xanh, typecheck sạch, build qua. Đã GIẢI TRỌN bài lab
  trên trình duyệt thật bằng đường bấm chọn (nối 3 dây, đặt 2 địa chỉ) —
  hai mục tiêu chuyển "xong", nộp bài ra "Chuẩn luôn!".

**Khối 6.6 đã làm gì** (khép hạng mục 6):
- Kiểm end-to-end trên trình duyệt thật: **thi trọn bài mastery Module 5**
  gồm 3 câu đi lại cung điện (6+7+2... phòng, phủ đủ 15) — đạt 100%, mở
  module sau; cố tình quên một nhịp rồi tự nhớ ra vẫn được chấm đạt, đúng
  luật đã chốt. Kiểm mobile 375px: bài học cung điện xếp một cột, không
  tràn ngang, thanh đáy nguyên.
- `KICH-BAN-TEST.md` thêm mục 8 — buổi test người thật cho Module 5, HAI
  buổi cách một đêm (trí nhớ dài hạn chỉ đo được sau giấc ngủ). Tiêu chí
  đậu: **điền lại ≥ 12/15 phòng trên giấy kẻ lưới, và khi hỏi "sao nhớ
  được" phải nhắc tới HÌNH hoặc CHỖ** — chứng tỏ cung điện làm việc chứ
  không phải học vẹt đè lên.
- Hạng mục (6) XONG cả 6 khối. Phase 2 còn đúng một hạng mục: (7) flow
  engine độ khó thích ứng.

Kiểm tra hiện tại: **710/710 test xanh**, typecheck sạch, build qua,
app live có đủ Module 1-7.

## Lệnh hay dùng

- `npm run dev` — dev server (cổng 5173)
- `npm test` — toàn bộ test
- `npm run typecheck` — kiểm kiểu
- `npm run content:review` — render lại `REVIEW-NOI-DUNG.md` sau khi sửa
  nội dung trong `content/modules/*.json`

## Quyết định đã chốt trong quá trình làm

Những điểm này đã được người dùng duyệt — không tự ý đảo lại.

**Phạm vi & lộ trình**
- i18n: khung UI song ngữ VI/EN; nội dung bài học chỉ tiếng Việt ở
  Phase 1, schema chừa sẵn trường `en`.
- Tab "Phòng khám" hiện nhưng khóa, có màn úp mở (tính năng Phase 3).
- Flow engine (độ khó thích ứng, spec 2.3) để Phase 2; Phase 1 chỉ ghi
  lịch sử 10 câu gần nhất làm nguyên liệu.

**Cơ chế học**
- Streak: lỡ ngày cuối tháng cũ được cứu bằng quota "đóng băng" của
  tháng mới — hướng nhân từ, mỗi tháng vẫn chỉ trừ tối đa 2 lượt.
- Bài thi mastery **không cộng XP/streak**: thi là cánh cổng, không phải
  nguồn thưởng (chặn farm bằng cách thi lại nhiều lần).
- XP chỉ cộng lần học đầu của mỗi bài; học lại không cộng nữa.
- Bài học trong module mở tuần tự; module sau chỉ mở khi module trước
  đạt ≥ 85%.
- Xem lại chỉ-đọc giới hạn **trong bước đang làm** (bước Nhớ lại phải
  đóng nội dung — không mở đường xem chéo).
- Drill subnetting không có màn hiện đáp án sau mỗi câu (giữ nhịp luyện
  tốc độ); lời giải 3 tầng vẫn còn nguyên khi cần.

**Giao diện**
- Cụm toggle (theme / âm thanh / ngôn ngữ) đặt ở chân sidebar — không
  làm màn Settings riêng (giữ menu đúng 4 mục theo spec 4.5).
- Giữ trang `/design` trưng bày design system (vào thẳng URL, không nằm
  trong menu).
- Animation đọc theo **từng chuyển động**: mỗi chặng bay 280ms ease-out
  cộng nhịp dừng ở router, thay vì ép cả chuyến vào 300ms.

**Bộ chấm**
- Bỏ dấu chỉ nhân nhượng khi một phía vốn không dấu: người gõ có dấu thì
  so có dấu ("mật" không khớp "mất").
- Chấp nhận câu trả lời **chứa** cụm đáp án dưới dạng từ nguyên vẹn
  ("là dns", "địa chỉ ip của máy"); nhưng nếu câu có từ phủ định
  (không/chưa/sai) ở **bất kỳ đâu** thì tắt chế độ đó, chỉ còn nhận khớp
  nguyên chuỗi.
- **Near-miss là cơ chế của schema**, không phải vá một chỗ: câu gõ tay
  khai `nearMisses` để câu trả lời cận-đúng nhận phản hồi may đo, vẫn
  tính là một lần sai trong thang 3 tầng.
- Cờ `noFlashcard` cho khái niệm meta (đang bật cho "Bản đồ lộ trình");
  thiếu flashcard mà không khai cờ là lỗi nội dung.

## Deploy GitHub Pages — ĐÃ LIVE

- Repo: https://github.com/ThienPhuc-2005/netmaster (public)
- App: https://thienphuc-2005.github.io/netmaster/
- Commit đầu `a87155b` "NetMaster Phase 1: pedagogy engine + Module 1-3
  + deploy", author Nguyen Van Thien Phuc. Workflow run đầu xanh cả
  build lẫn deploy; đã kiểm app live + deep-link /on-tap render đúng.

### Ghi chú kỹ thuật deploy (giữ để tra sau)

- `vite.config.ts` đọc `GHPAGES_BASE`; workflow `.github/workflows/deploy.yml`
  truyền `/<tên-repo>/` tự động → đổi tên repo không phải sửa code.
- Routing: giữ BrowserRouter + basename từ `import.meta.env.BASE_URL`,
  trick 404 = copy `index.html` → `404.html` trong workflow (URL sạch,
  không hash). Đã kiểm bằng server mô phỏng Pages: deep-link
  `/netmaster/bai/m1-bai-2` render đúng bài, link nội bộ mang đúng prefix.
- Pipeline: push `main` → test + typecheck (đỏ là dừng) → build → deploy.
  Lần đầu cần bật Settings → Pages → Source → GitHub Actions.
- README.md (4 ảnh chụp thật trong `docs/`), LICENSE (MIT, Nguyen Van
  Thien Phuc). Git identity cấp repo: Nguyen Van Thien Phuc /
  thienphuc.security@gmail.com (GitHub: ThienPhuc-2005). Pages bật qua
  API (`build_type: workflow`), không cần bấm tay trong Settings.
  CHƯA commit/push — người dùng tự làm để giữ authorship.

## Khối 6 còn lại làm gì

1. Đối chiếu từng tiêu chí Definition of Done (spec mục 6) cho toàn
   Phase 1, in rõ ĐẠT / CHƯA ĐẠT / LÀM KHÁC.
2. Soạn kịch bản test người thật: một người chưa biết gì về mạng học hết
   Module 1-2 rồi **vẽ lại đường đi gói tin từ trí nhớ**.
3. Xử lý các mục chưa đạt phát sinh từ hai việc trên.
