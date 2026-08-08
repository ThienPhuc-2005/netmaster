# CLAUDE.md — Luật dự án App Học Mạng

File này được đọc ở MỌI phiên làm việc. Tuân thủ tuyệt đối.

## Thứ bậc quyền lực (chốt 2026-08-08)

**Lệnh trực tiếp của chủ dự án trong phiên chat mạnh hơn mọi luật trong
file này, kể cả mục "Luật chống hạ cấp" và mọi chỗ ghi "phải hỏi trước".**
Chủ dự án ra lệnh thì LÀM, không trình phương án, không xin duyệt, không
tranh luận. Nêu quan ngại nhiều nhất MỘT LẦN và chỉ khi thật sự cần —
chủ dự án nhắc lại là chấm dứt, làm ngay.

Hai thứ vẫn giữ vì chúng là BÁO CÁO SỰ THẬT, không phải cãi:
- Test đỏ / build hỏng / làm chưa xong thì nói thẳng, không báo "xong".
- Mục "Sai lệch so với spec" cuối lượt — để chủ dự án biết mình vừa
  nhận cái gì, không phải để phản đối.

Các luật dưới đây là mặc định khi chủ dự án KHÔNG nói gì khác.

## Nguồn chân lý

`SPEC-APP-HOC-MANG.md` là đặc tả duy nhất của dự án. Mọi quyết định về
TÍNH NĂNG và CƠ CHẾ HỌC phải khớp spec. Khi có mâu thuẫn giữa spec và
bất kỳ thứ gì khác (kể cả code đã viết), spec thắng.

## Luật chống hạ cấp — QUAN TRỌNG NHẤT

1. **Cấm tự ý đơn giản hóa yêu cầu trong spec.** Nếu một yêu cầu khó,
   tốn thời gian, hoặc có vẻ "quá phức tạp cho MVP": DỪNG LẠI, nêu rõ
   vấn đề + 2-3 phương án kèm trade-off, rồi CHỜ người dùng quyết.
   Không bao giờ tự quyết rồi làm.
2. **Cấm giao nộp code chứa placeholder, TODO, mock data, hàm rỗng,
   `// implement later`.** Nếu không đủ thời gian trong một lượt:
   làm ít module hơn nhưng xong hẳn, thay vì nhiều module dở dang.
3. **Phạm vi đã được chốt.** Dự án đã chia 3 phase trong spec (mục 6) —
   tức là việc cắt giảm phạm vi ĐÃ được làm rồi. Không đề xuất cắt thêm
   tính năng khỏi phase đang làm. Chỉ được làm đúng phase hiện tại,
   không tự ý làm trước phase sau.
4. **Báo cáo sai lệch bắt buộc.** Kết thúc MỖI lượt làm việc, in mục:

   ```
   ## Sai lệch so với spec
   - (liệt kê từng chỗ làm khác spec, kèm lý do)
   - hoặc: "Không có"
   ```

   Làm khác mà không khai = lỗi nghiêm trọng nhất của dự án.

## Ranh giới quyền quyết định

- **Phải hỏi trước khi thay đổi** (CÁI GÌ app làm): tính năng, pipeline
  6 bước, mastery gate, thuật toán SM-2, nội dung bài học, luồng người
  dùng, bất kỳ mục nào trong spec.
- **Được tự quyết** (LÀM BẰNG CÁCH NÀO): lựa chọn thư viện, cấu trúc
  file, đặt tên biến, tối ưu hiệu năng — miễn không đổi hành vi mà
  người dùng nhìn thấy. Khi tự quyết khác gợi ý trong spec mục 5
  (ví dụ thay Framer Motion bằng CSS), ghi 1 dòng lý do vào báo cáo
  cuối lượt.

## 5 nguyên tắc sư phạm bất khả xâm phạm (từ spec mục 1)

1. Mọi bài học kết thúc bằng retrieval — không có bài "đọc xong là qua".
2. Mastery gate ≥ 85% mới mở module sau. Không có nút skip.
3. Một màn hình = một khái niệm mới.
4. Bài thực hành: người dùng thử-sai trước, gợi ý sau 2 lần sai,
   lời giải sau 3 lần sai.
5. XP/streak chỉ cộng từ retrieval và lab, không cộng từ việc đọc/xem.

Bất kỳ thay đổi code nào làm suy yếu 1 trong 5 điều trên đều bị coi là
phá hoại cơ chế học của app, dù code chạy đúng.

## Quy trình làm việc

- Nhận việc theo KHỐI NHỎ do người dùng giao. Không tự mở rộng sang
  khối khác dù "tiện tay".
- Việc lớn hoặc đụng kiến trúc: trình kế hoạch trước, chờ duyệt,
  rồi mới code.
- Sau mỗi khối: tự đối chiếu với "Definition of Done" (spec mục 6)
  và pipeline 6 bước (spec mục 2.1), in kết quả ĐẠT / CHƯA ĐẠT /
  LÀM KHÁC cho từng tiêu chí, sửa mọi mục CHƯA ĐẠT trước khi báo xong.
- Viết test cho logic lõi (SM-2, mastery gate, flow độ khó). Chạy test
  trước khi báo hoàn thành. Không báo "xong" khi test đỏ.
- Không refactor lớn hoặc đổi cấu trúc thư mục khi chưa được yêu cầu.

## Quy ước kỹ thuật

- Nội dung bài học tách khỏi code: bài học là data (JSON/MD),
  engine đọc data. Thêm bài mới không được đòi sửa logic engine.
- Comment code bằng tiếng Việt cho phần logic sư phạm (để người dùng
  đọc hiểu được), tiếng Anh cho phần kỹ thuật thuần.
- Mọi chuỗi hiển thị cho người học: tiếng Việt, giọng "bạn/mình",
  theo quy tắc microcopy ở spec mục 4.4. Không bao giờ hiển thị
  chữ "SAI" trần trụi.
- Lưu tiến độ localStorage (Phase 1). Thiết kế data model sao cho
  sau này chuyển backend không phải viết lại.

## Lệnh dev

- `npm run dev` — chạy dev server (Vite, cổng 5173)
- `npm run build` — build production
- `npm test` — chạy toàn bộ test (Vitest)
- `npm run test:watch` — test ở chế độ watch
- `npm run typecheck` — kiểm tra kiểu TypeScript (`tsc --noEmit`)

## Cấu trúc hiện tại (Phase 1 + 2 + 3 XONG — hết phạm vi spec; chỉ còn treo các buổi test người thật)

- `src/engine/` — pedagogy engine thuần TS: SM-2, hàng đợi ôn tập,
  mastery gate, máy trạng thái bài học 6 bước, XP/streak, bộ chấm,
  drill subnetting. KHÔNG import React, KHÔNG đọc localStorage,
  KHÔNG tự lấy giờ hệ thống — thời gian bơm từ ngoài vào.
- `src/styles/` — tokens.css (nguồn chân lý màu 60-30-10, dark mặc định,
  light qua `[data-theme='light']`); contrast AA có test đo bằng công
  thức WCAG (tokens.test.ts) — đổi màu rớt 4.5:1 là test đỏ.
- `src/i18n/` — vi.json + en.json (chuỗi UI, cùng cấu trúc key, có test
  parity), helper `translate`/`useT`. Nội dung bài học KHÔNG qua i18n.
- `src/store/` — settings (theme/âm/lang; lang lưu localStorage key `lang`).
- `src/audio/` — 4 earcon tổng hợp Web Audio, tắt được, không file âm.
- `src/components/` — Button, EmptyState, FeedbackBanner (3 tầng, cấm
  chữ "SAI"), ProgressBar (sàn 15%, % lấy từ engine), StageMap,
  QuestionInput (typed/mcq/order), ConceptVisual (registry SVG theo
  visualId), AppLayout (4 tab: Học | Ôn tập | Phòng khám khóa | Hồ sơ).
- `src/store/progress.ts` — store tiến độ persist (nơi DUY NHẤT nối
  engine + thời gian thật + localStorage; XP/streak chỉ từ retrieval/lab
  và chỉ lần học đầu). Selector thuần: shouldReviewFirst, newLessonGate.
- `src/content/` — tầng nạp nội dung (parse + validate + content.test.ts
  làm cổng chất lượng). Nội dung THẬT ở content/modules/*.json (Module
  1-3 Phần A); moduleFixture chỉ còn phục vụ test. Sửa nội dung xong
  chạy `npm run content:review` để render lại REVIEW-NOI-DUNG.md (bản
  đọc duyệt — không phải nguồn chân lý).
- `src/features/` — learn (LearnPage + LessonPlayer 6 bước), review
  (phiên flashcard SM-2), drill (subnetting + biểu đồ), profile, clinic
  (khóa), `/design` (trưng bày design system, vào thẳng URL).
- Luật điều hướng: mở app còn thẻ đến hạn → vào Ôn tập trước (gate ở
  main.tsx — quyết định trong effect SAU khi zustand rehydrate).
- `src/features/onboarding/` — bắn gói tin 60 giây đầu (spec 4.5),
  animation theo path bằng thư viện motion (2 chặng × 280ms ease-out,
  router sáng khi ghé; reduced-motion → tới thẳng đích). AppGate trong
  main.tsx chặn mọi route tới khi onboardingDone.
- `tests/fixtures/` — nội dung module mẫu (chỉ cho test schema/store).
- Màn thi mastery: `src/features/learn/ModuleTestPage.tsx` (route
  /kiem-tra/:moduleId) — >= 85% mở module sau, rớt hiện ý cần ôn,
  thi lại tự do, KHÔNG cộng XP/streak.
- Khối 6 đã xong: bảng đối chiếu DoD nằm trong báo cáo lượt làm việc,
  kịch bản test người thật ở `KICH-BAN-TEST.md`. Phase 1 chỉ còn treo
  buổi test người thật (cần người, không code được).

### Phase 2 — hạng mục (5): phòng lab Module 4

- `src/engine/lab/` — bộ mô phỏng mạng THUẦN, không React: `topology.ts`
  (mô hình + kiểm cấu trúc), `simulate.ts` (ping trả CHUỖI CHẶNG để UI
  phát lại; mã lý do từng chặng và mã bệnh khi hỏng), `session.ts`
  (soạn thảo + undo dạng ảnh chụp + quyền thao tác), `gradeLab.ts`
  (chấm theo MỤC TIÊU, không so sơ đồ mẫu; chẩn đoán bám mục tiêu đề
  bài), `labSchema.ts` (zod + chốt chặn nội dung).
- **Phạm vi mô phỏng đã ĐÓNG BĂNG** (đã chốt): MAC table, ARP, VLAN cổng
  access, router + tuyến tĩnh. KHÔNG trunk, KHÔNG router-on-a-stick,
  không STP/DHCP/NAT/IPv6. Ba đơn giản hóa cố ý ghi ở đầu `topology.ts`.
- `src/features/lab/` — phòng lab: canvas ba tầng (dây SVG / thiết bị và
  cổng là `<button>` thật / gói tin bay), `geometry.ts` (toạ độ bằng MỘT
  hệ số, không `getScreenCTM` — nếu không sẽ mất khả năng test kéo-thả),
  `usePacketFlight.ts` (phát N chặng động).
- **Luật của phòng lab, không được phá:** mọi thao tác có ĐƯỜNG BẤM CHỌN
  (kéo-thả chỉ là đường phụ) — nhờ đó mobile, bàn phím, trình đọc màn
  hình và test dùng chung một đường mã. Hai nút tách bạch: "Gửi thử"
  miễn phí, "Nộp bài" mới tính một lượt trong thang 3 tầng. Nhật ký chặng
  LUÔN render đầy đủ kể cả khi không có animation — tải trọng sư phạm
  nằm ở đó, animation chỉ là lớp đắp thêm.
- `kind: 'lab'` là nhánh thứ tư của `QuestionSchema` — lab là MỘT DẠNG
  CÂU HỎI, nên `lessonMachine.ts` không biết nó tồn tại và không được
  sửa vì nó.
- Nội dung: `content/modules/module-04.json` (Phần B, 5 chặng, 6 khái
  niệm, thi 8 câu kết bằng 1 câu lab). Lab sửa-mạng-hỏng đặt ở **bước
  Đoán thử** của bài VLAN — productive failure trước lý thuyết.
- Layout: dưới 768px, menu 4 mục chuyển xuống THANH ĐÁY và canvas lab
  cuộn ngang trong khung riêng (giữ vùng chạm cổng ≥ 24px).

### Phase 2 — hạng mục (6): cung điện ký ức Port + Module 5-7 (XONG)

- `src/engine/palace/` — cung điện ký ức THUẦN, không React: `palace.ts`
  (tòa nhà 5 tầng × 3 phòng + kiểm cấu trúc + lộ trình), `walk.ts` (đi
  xem và đi lại từ trí nhớ, đi được từng đoạn), `cards.ts` (15 phòng →
  15 thẻ SM-2), `palaceSchema.ts` (zod + chốt chặn nội dung).
- `src/features/palace/` — `PalaceTour`, `PalaceWalk`, `PalaceMap`,
  `RoomGlyph` (registry 15 hình, KHÔNG có hình dự phòng), `parsePorts`.
- **Cung điện đã TỔNG QUÁT HÓA (khối 8.1):** kích thước và ruột phòng
  khai theo từng tòa — `floors`/`roomsPerFloor`, hai vế `keys`/`name`,
  `keyStyle: 'number' | 'text'`, nhãn/gợi ý hai ô nhập là nội dung
  (`keyLabel`/`nameLabel`/`keyHint`/`nameHint`). Luật port 1..65535 là
  refinement của schema khi keyStyle 'number', KHÔNG nằm trong engine.
- **Luật của cung điện, không được phá:**
  - Tòa nhà và lộ trình CỐ ĐỊNH — lưới kín, luôn đi tầng trệt lên nóc,
    trái sang phải (bản thân thứ tự là một phần của cái được nhớ).
  - Đi xem KHÔNG cộng điểm; chỉ chuyến đi lại từ trí nhớ mới là retrieval
    (nguyên tắc 5). Lúc đi lại, gợi ý là CHỖ + HÌNH; câu chuyện là tầng 2,
    con số là tầng 3. Lộ số ra sớm là biến retrieval thành chép lại.
  - Mỗi phòng một thẻ ôn riêng, khóa `palace:<roomId>` — không gộp 15
    port vào một thẻ.
  - Chấm một chuyến: đạt = đi trọn đúng đoạn và không phòng nào phải mở
    đáp án. Không thêm ngưỡng phần trăm mới.
  - Nội dung: phòng phải được dẫn đi xem TRƯỚC khi bị hỏi lại, mỗi phòng
    chỉ dạy một lần, dạy rồi thì phải có câu bắt nhớ lại (schema ép).
- `palaceTour` là trường tùy chọn của MÀN DẠY; `kind: 'palace-walk'` là
  nhánh thứ năm của `QuestionSchema`. `lessonMachine.ts` không biết cung
  điện tồn tại và không được sửa vì nó.
- `src/engine/ltext.ts` — `LTextSchema` dùng chung cho các schema nội
  dung; contentSchema re-export nên nơi gọi cũ không đổi.
- Nội dung: `content/modules/module-05.json` (Phần B, 5 chặng, 8 bài,
  cung điện 15 phòng). Ba bài đầu dạy TCP/bắt tay/UDP/luật số cổng, năm
  bài sau mỗi bài một TẦNG: đi xem ở bước Dạy, đi lại từ trí nhớ ở bước
  Nhớ lại. Bài thi 8 câu, ba câu cuối phủ hết 15 phòng — `content.test.ts`
  khóa luật "không phòng nào lọt qua cổng mastery".
- Nội dung: `content/modules/module-06.json` (DNS ba tầng, bản ghi
  A/AAAA/CNAME/MX, DNS over HTTPS, DHCP DORA kể thành chuyện hỏi cưới,
  thời hạn thuê). Câu tự giải thích của bài DORA là câu spec chỉ đích
  danh: "vì sao vẫn cần Request dù đã có Offer".
- Nội dung: `content/modules/module-07.json` (NAT/PAT với ẩn dụ chung cư
  quay lại, port forwarding, tường lửa stateful, kiến trúc mạng nhà,
  double NAT). Bài 4 có **lab "lắp lại mạng nhà bạn"** — thiết bị nhà +
  modem nhà mạng + máy chủ ngoài Internet, chấm bằng ping qua hai router.
  Đây là hạng mục "học gắn đời thật" spec đòi cho Module 7.
- `ConceptVisual`: đầu mũi tên `cv-arrow` khai ở `Frame` nên MỌI hình
  dùng được; `/design` có mục "Hình khái niệm" bày hết registry ra một
  trang để soi tràn chữ bằng mắt (và bằng `getBBox`).

### Phase 2 — hạng mục (7): flow engine độ khó thích ứng (XONG)

- `src/engine/flow.ts` — thuần TS: `flowMode` (chỉ kích hoạt khi cửa sổ
  đầy 10 câu; > 90% harder, < 60% support, giữa hai ngưỡng không đụng
  gì), `deriveOpenQuestion` (trắc nghiệm → gõ tay, CÙNG id; lựa chọn
  đúng > 24 ký tự thì không suy), `foundationConceptIds` (nền gần-nhất-
  trước; đầu module mượn module liền trước), `needsSupport` (thời gian
  nguội 5 câu, đếm bằng câu trả lời chứ không bằng đồng hồ).
- **Luật của flow engine, không được phá:**
  - Phiên củng cố KHÔNG cộng XP, KHÔNG đụng lịch SM-2, và chỉ chặn bài
    MỚI — bài đang dở không bị cắt ngang.
  - Thi mastery không đổi độ khó — thang đo cố định thì 85% mới có nghĩa.
  - `gradeQuestion(mcq, typed)` là đường chính thức (chấm bằng chữ của
    lựa chọn đúng), không phải kind mismatch.
  - `lessonMachine.ts` vẫn không biết flow engine tồn tại.
- Store: `answerTotal` + `supportShownAtTotal` + `markSupportShown()`.
  UI: `FoundationReview` chặn cửa trong LessonPlayer; ExerciseRunner đổi
  dạng câu theo `flowMode` — đổi CÁCH RENDER, không đổi dữ liệu bài.

### Phase 3 — hạng mục (8): Module 8-10 + cung điện GPO + checklist VMware (XONG)

- Ba quyết định đã chốt: cung điện tổng quát hóa (phương án A); tòa GPO
  **4 tầng × 1 phòng** (LSDOU mỗi tầng một bậc); checklist lab VMware
  khai `vmLab` trong JSON module, store track `vmLabDone`, **không XP**
  (việc thật ngoài app không kiểm chứng được — nguyên tắc 5).
- Nội dung: `module-08.json` (Wi-Fi băng tần/thế hệ/WPA + IPv6
  link-local/global/SLAAC/dual-stack — **interleaving mạnh**: từ bài 4
  bài tập trộn xen kẽ câu IPv4/IPv6, bài thi xen kẽ câu 4-8);
  `module-09.json` (AD DS/GPO — cung điện LSDOU 4×1 keyStyle 'text' đi
  xem + đi lại trong bài 4, bài thi kết bằng palace-walk phủ 4 phòng;
  **fading GPO 0→1→2 trên ba bài liên tiếp** bị content.test khóa;
  vmLab 8 bước); `module-10.json` (cloud — **contrast cases**: mỗi màn
  dạy là "SO SÁNH SONG SONG" cloud ↔ on-prem đã học, hình hai ô
  nhà ↔ mây ngăn nét đứt).
- UI checklist VMware: `VmLabChecklist` trong LearnPage (ModuleCard),
  hiện khi module mở; tick gọi `toggleVmLabStep`, đếm x/y bước, KHÔNG
  XP. Chuỗi UI-chrome ở i18n (`learn.vmLabProgress`/`vmLabNoXp`);
  title/intro/steps là NỘI DUNG từ JSON.
- 4 glyph GPO trong `RoomGlyph` (bảng nội quy / bảng tin / lá cờ / cửa
  phòng ban); `parsePorts.test.ts` quét MỌI tòa (Port + GPO): không
  hình thiếu/thừa/trùng xuyên tòa.
- **Luật rút ra, không được phá:** `workedExample` trong JSON KHÔNG mở
  đầu bằng "Ví dụ giải sẵn" — LessonPlayer tự thêm nhãn đó, viết vào
  nội dung là chữ lặp đôi trên màn hình (lỗi thật đã vá ở M6-M10).
- Kịch bản test người thật Phần C: `KICH-BAN-TEST.md` mục 9 (đo
  interleaving 4 tình huống, điền lại tòa GPO trên giấy, hỏi 3 cặp
  contrast).

### Phase 3 — hạng mục (9): Phòng khám mạng (XONG cả 5 khối)

- `src/engine/clinic/` (khối 9.1) — engine thuần TS: `patient.ts` (ca =
  topology lab NGUYÊN + overlay "hồ sơ bệnh" + seatId), `terminal.ts`
  (8 lệnh, output SUY TỪ MÔ PHỎNG, tiếng Anh nghề tất định; help/unknown
  trả rỗng cho UI), `gradeClinic.ts` (checkSymptom 3 kiểu; gradeClinicFix
  chấm BA LỚP: goals + mustClearDiagnoses sạch + triệu chứng hết),
  `clinicSchema.ts` (bệnh nhân phải ốm thật, lời giải chữa được ca của
  chính nó, trạng thái đầu chưa đạt sẵn).
- `kind: 'clinic'` là nhánh thứ SÁU của `QuestionSchema` (khối 9.2):
  `prompt` là lời than bệnh nhân, `spec` là ca bệnh, `diagnosis`
  {choices, answerIndex}; `actions` BẮT BUỘC khi fix 'choose-action' và
  CẤM khi 'edit-network' (cross-check cấp module ép). **Chấm HAI PHẦN
  trong MỘT lượt nộp: đúng bệnh VÀ sửa khỏi — đúng một nửa vẫn là chưa
  xong.** `lessonMachine.ts` không biết phòng khám tồn tại và không được
  sửa vì nó (clinicInPipeline.test khóa).
- `src/features/clinic/` — `ClinicRoom` (khung bệnh nhân) +
  `ClinicTerminal`. **Luật của phòng khám, không được phá:**
  - **Khám mù trước:** pha khám chỉ có lời than + terminal, KHÔNG sơ đồ
    (lộ sơ đồ sớm thì ca "rút dây" giải bằng mắt). Chốt chẩn đoán mới mở
    pha sửa; sau đó đổi chẩn đoán bằng chip tại chỗ, KHÔNG unmount phòng
    lab — unmount là mất sơ đồ đang sửa dở.
  - Pha sửa edit-network dùng NGUYÊN `NetworkLab` với `hideDiagnosis`
    (máy nói tên bệnh hộ là lộ đề) + `onTopologyChange`: terminal và nút
    "Chạy lại triệu chứng" soi sơ đồ SỐNG — ping trong terminal thấy
    ngay mối sửa vừa làm; ARP cache cũ giữ nguyên như đời thật.
  - Gõ lệnh và "Chạy lại triệu chứng" MIỄN PHÍ; chỉ "Nộp bài" tính một
    lượt trong thang 3 tầng (một lượt = trọn gói hai phần).
  - Ranh giới chuỗi: `lines` của terminal là output thiết bị tiếng Anh,
    render nguyên văn trong `<pre>`; microcopy tiếng Việt (help, lệnh
    lạ, capture trống, nhãn hai pha) ở i18n `clinic.*`.
- `/design` có mục Phòng khám (ca sai-gateway từ clinicFixture, đi qua
  `QuestionSchema.parse` nên hợp lệ y hệt câu thật);
  `render-content-review.mjs` tả được ca bệnh (mạng, hồ sơ bệnh, triệu
  chứng, hai phần đáp án có đánh dấu ✓).
- Nội dung: `content/modules/module-11.json` (khối 9.3) — 5 bài, 6 khái
  niệm phương-pháp (khám theo tầng + đồ nghề), 11 ca bệnh thang dễ→khó
  đúng spec; **bệnh nhân đầu của MỖI bài đặt ở bước Đoán thử (100%
  productive failure — content.test khóa)**; bài thi 8 câu kết bằng 2
  ca (VLAN của M4 quay lại + DNS chết). Terminal: `src-no-link` báo
  "General failure" (dây MÌNH) khác "Destination host unreachable"
  (dây ĐÍCH) — cặp phân biệt này là bài học của bài 1, không được phá.
- Tab Phòng khám (khối 9.4): `clinicCases.ts` liệt kê ca TỪ BÀI HỌC của
  mọi module (suy từ dữ liệu); **ca bài thi mastery CẤM đem ra luyện tự
  do** (thang 85% mất giá trị — test khóa). Cổng mở theo mastery gate
  (`clinicTabUnlocked` — đậu M10 thì mở), nav AppLayout bỏ khóa động
  cùng cổng. XP nguồn thứ 5 `clinicCaseSolved` (10): CHỈ lần chữa khỏi
  đầu mỗi ca, chỉ vào xpTotal (KHÔNG moduleXp), mỗi lượt nộp vẫn ghi
  answerHistory. Làm lại tự do, thang 3 tầng giữ nguyên trong tab.
- Kịch bản test người thật Module 11: `KICH-BAN-TEST.md` mục 10 (đo kỹ
  năng chẩn đoán bằng 2 ca chưa gặp; hai cặp lời-từ-chối; chỉ đúng
  module gốc của bệnh).

### Phase 3 — hạng mục (10): Module 12 + terminal PowerShell ảo (XONG cả 4 khối — hạng mục CUỐI của spec)

- Ba quyết định đã chốt: **phạm vi PS đóng băng** ở 8 cmdlet (Get-Help,
  Get-NetIPAddress, Test-NetConnection, Get-ADUser, New-ADUser,
  Import-Csv, Get-Content, Select-String) + pipeline MỘT tầng, KHÔNG
  scriptblock/biến/vòng lặp; **"hàng loạt" = một dòng
  `Import-Csv | New-ADUser` chạy thật**, script đa dòng chỉ đọc-hiểu;
  **chấm theo hiệu ứng + dấu vết hành động**, không so chuỗi lệnh.
- `src/engine/ps/` (khối 10.1) — thuần TS: `world.ts` (máy + đích mạng
  + AD nhỏ + file; `PsFlags` ghi dấu vết hành động), `interpret.ts`
  (tokenizer + 8 cmdlet, output tiếng Anh nghề tất định; New-ADUser IM
  LẶNG như thật; Get-Help trần/lệnh lạ trả rỗng lines cho UI),
  `gradePs.ts` (4 goal: ad-user, ad-user-count, tested-connection,
  found-line), `psSchema.ts` (thế giới sạch, lời giải chạy sạch + đạt
  trọn goals, đề chưa đạt sẵn). Select-String khớp CHUỖI CON không
  regex — đơn giản hóa cố ý ghi ở đầu world.ts.
- **Luật không được phá:** chấm hiệu ứng nghĩa là gõ tay từng user thay
  vì pipeline vẫn được công nhận (có test khóa); quá một dấu ống là
  lỗi có chủ đích, đừng "tiện tay" mở rộng ngữ pháp.
- `kind: 'ps'` là nhánh thứ BẢY của `QuestionSchema` (khối 10.2):
  response là `{kind:'ps', state}` — TRẠNG THÁI PHIÊN, chấm bằng
  `isPsSolved`. `lessonMachine.ts` không biết terminal tồn tại
  (psInPipeline.test khóa — lần thứ tư của bất biến này).
  `src/features/ps/PsConsole.tsx`: bảng mục tiêu CHẤM SỐNG theo từng
  lệnh; "Làm lại từ đầu" thay cho undo (PS thật không có undo); gõ
  miễn phí, chỉ "Nộp bài" tính lượt; output máy tiếng Anh nguyên văn
  trong `<pre>` (lỗi tô hổ phách), microcopy vi ở i18n `ps.*`.
  Gợi ý mờ dần = thang 3 tầng sẵn có: hintTopic → cú pháp khuyết
  (hint) → lệnh mẫu (solution/canonicalAnswer).
- Nội dung: `content/modules/module-12.json` (khối 10.3) — 5 bài, 8 khái
  niệm, 10 đề terminal theo đúng 4 mảng spec (cmdlet mạng → tra/ghi sổ AD
  → hàng loạt một dòng pipeline → đọc log). **MỌI bài phải có ít nhất một
  câu ps** (generation effect tối đa) và **fadingLevel dọc module chỉ được
  giữ hoặc tăng, bài cuối mức 2** — content.test khóa cả hai. Bài 1 mở
  màn bằng câu ps ở bước Đoán thử; bài thi kết bằng hai câu ps.
- **Luật rút ra, không được phá:** app KHÔNG render markdown — viết dấu
  backtick trong JSON là hiện ký tự thật lên màn hình (lỗi đã vá ở M12;
  M1-M11 không dùng backtick nào). Ô "Đào sâu hơn" của LessonPlayer dùng
  `whitespace-pre-wrap` để đoạn script đọc-hiểu nhiều dòng của M12 giữ
  được hình dạng; muốn xuống dòng trong nội dung thì chỉ chỗ này làm được.
- Khối 10.4: màn thi mastery phải nói đúng sự thật về cái chờ phía sau —
  module CUỐI không có "module sau" để mở, nên `ModuleTestPage` suy
  `isFinalModule` từ `loadModules().at(-1)` và đổi sang bộ chuỗi
  `test.*Final`. `ModuleTestPage.test.tsx` khóa: thêm module mới thì
  "module cuối" tự dời theo, không phải sửa test.

### Sau hội đồng đánh giá (07-08) — các bất biến MỚI, không được phá

- **Màn rớt bài thi mastery KHÔNG in đáp án** (chỉ ý cần ôn — hintTopic);
  đáp án đầy đủ chỉ hiện khi ĐẬU. Câu + lựa chọn MCQ xáo mỗi lượt.
  `ModuleTestPage.test.tsx` có test "màn rớt không rò đáp án".
- **Phiên ôn có relearning:** thẻ quên requeue cuối phiên tới khi tự nhớ
  được; CHỈ lượt chấm đầu ghi SM-2 + XP (`ReviewPage.test.tsx` khóa).
- **Persist có cửa migrate:** đổi shape state là PHẢI bump version + case
  migrate + cập nhật fixture `tests/fixtures/progressV1.json`
  (`progress.migrate.test.ts` là chuông báo). Migrate viết thành CHUỖI
  BẬC `v(n) → v(n+1)` (hiện ở v3) — thêm version mới là nối thêm một bậc
  ở cuối, không nhánh nào nhảy cóc.
- **Bài dở lab/PS được lưu, nhưng CHỈ trong bài học** (08-08): store có
  ngăn `practiceDrafts` khóa `lessonId::questionId`; `LessonPlayer`
  truyền `draftKey`, **`ModuleTestPage` cố ý KHÔNG truyền** — nạp lại sơ
  đồ lắp dở của đề thi là mở đường mang bài thi về nhà làm dần
  (`QuestionInput.draft.test.tsx` gác). Lab không lưu lịch sử undo và
  `restoreLab` vẫn giữ `initial` là đề bài (nút "Về sơ đồ ban đầu" không
  được bẻ); PS lưu cả nhật ký lệnh, "Làm lại từ đầu" xóa bài dở. Lưu bài
  dở KHÔNG cộng XP/streak/answerHistory (nguyên tắc 5).
- **UI đọc LText qua `lt()/maybeLt()`** (engine/ltext) — cấm viết `.vi`
  mới trong component; phản hồi chấm bài render trong `FeedbackRegion`
  (live region thường trực), không mount banner kèm nội dung.
- **Thuật ngữ:** "port" cho TCP/UDP port; "cổng" chỉ dành cho cổng vật
  lý switch/router và ẩn dụ (lớp cổng NAT). Accept-list nhận cả hai.
  "subnet mask" giữ nguyên tiếng Anh (không trôi thành "mặt nạ"); dấu ba
  chấm dùng "…" trong văn xuôi, chỉ giữ "..." trong ký hiệu người học có
  thể chép lại (địa chỉ IPv6 rút gọn, mẫu lệnh PowerShell).
- **Nhãn trong hình SVG là VI-only, đã tuyên bố** (08-08): hình đi kèm
  NỘI DUNG bài học, mà nội dung Phase 1 chỉ có tiếng Việt. Khi nào nội
  dung có bản EN thật thì nhãn đi qua LText (không phải i18n — i18n dành
  cho chuỗi khung app). `/design` cũng là ngoại lệ hardcode VI có khai.
- **`<html lang>` phải theo nút VI/EN** (`applyLang` cạnh `applyTheme`);
  chuỗi EN có số viết dạng TRUNG TÍNH SỐ (không "1 cards"), và test
  parity khóa bộ `{placeholder}` của từng key phải khớp giữa hai bản.
- **Fidelity terminal không được "làm tròn cho đẹp"**: `New-ADUser` không
  kèm mật khẩu sinh tài khoản **Disabled**; ping unreachable in
  "Reply from &lt;ai ký tên&gt;:" và đếm **Received=4, Lost=0** — bẫy
  "0% loss mà vẫn không thông" là bài học, không phải lỗi.
- **PS pipeline hàng loạt bind cột `Path` chứa DN đầy đủ** (bọc nháy kép
  vì DN có dấu phẩy — Import-Csv của engine đọc được nháy kép); quy ước
  cột OU tự chế đã bỏ vì ngoài đời nó rơi user vào CN=Users im lặng.
- **Motion:** app bọc `LazyMotion strict` — dùng `m.*`, không `motion.*`;
  reduced-motion do `MotionConfig` + token `--dur` lo, animation CSS mới
  phải buộc thời lượng vào `--dur`.
- **Không import tĩnh NetworkLab/ClinicRoom/PsConsole vào đường nóng** —
  chúng lazy trong QuestionInput; route ngoài Learn/Review/Lesson lazy
  trong main.tsx.
- **Đề thi mastery không được lộ đáp án bằng ĐỘ DÀI** (08-08): distractor
  phải viết đủ ý như đáp án. `content.test.ts` khóa hai hàng rào — từng
  câu đáp án ≤ 1.1× distractor dài nhất (miễn trừ khi cả ba lựa chọn
  chênh ≤ 8 ký tự), toàn bộ đề ≤ 45% câu có đáp án dài nhất. Distractor
  phải là lỗi hiểu nhầm THẬT, cấm distractor "đùa" kiểu loại được bằng
  cách đọc lướt.
- **`masteryTest` là POOL, không phải ĐỀ** (08-08): mỗi module >= 12 câu,
  mỗi lượt thi rút 8 bằng `drawMasteryTest` (`src/engine/masteryPool.ts`)
  rồi xáo thứ tự. Ba thứ không được phá: (a) **cỡ đề cố định 8** —
  `MASTERY_DRAW_COUNT` đổi là đổi luôn nghĩa của ngưỡng 85% (7/8 đậu);
  (b) **câu TRỤ luôn vào đề** — lab/palace-walk/clinic/ps là kỹ năng của
  module, rút trượt là có lượt thi không đo tới nó (M5 còn cần cả ba câu
  cung điện mới phủ đủ 15 phòng); (c) **thi lại phải RÚT ĐỀ MỚI**, không
  dùng lại đề vừa rớt. Thêm module mới thì viết đủ 12 câu — `content.test`
  làm đỏ nếu thiếu.
- **Accept gõ tay phải phủ cách gõ của người thật**: bộ chấm tách token
  nên ký hiệu biến mất ("dấu |" → chỉ còn "dau", "65,535" → hai số).
  Đáp án là KÝ HIỆU thì accept phải có cả biến thể đọc thành chữ và
  biến thể có dấu phân cách. `content.test.ts` chạy 19 cách gõ thật qua
  chính `typedAnswerMatches`.

### Học vượt — "thi vượt" (08-08, ngoài spec, người dùng đã duyệt)

Spec nguyên tắc 2 cấm **nút skip**, không cấm con đường đi tới chứng
minh. Thi vượt giữ NGUYÊN cổng: cùng đề mastery, cùng ngưỡng 85%, cùng
chuỗi mở khóa — chỉ bỏ điều kiện "phải học hết bài trong module trước".

- **Không được đụng `masteryGate.ts`** vì việc này. Thi vượt không chạm
  chuỗi mở khóa một dòng nào; nó đi CẠNH chuỗi đó.
- **Nút vượt có ở MỌI module, kể cả module đang KHÓA** (chủ dự án ra
  lệnh 08-08, thay luật cũ "chỉ vượt module đang mở"): người đã học mấy
  module đầu ở nơi khác vào thẳng module mình cần. Đường thi THƯỜNG của
  module khóa vẫn khóa như cũ — cửa vượt là đường duy nhất.
- **Đậu vượt module N chỉ đánh dấu ĐÚNG module N** (không tự đánh dấu
  đậu các module trước — không bịa điểm mastery cho thứ chưa đo).
  `computeModuleStatuses` vì thế có thể để M2/M3 ở trạng thái khóa
  trong khi M4 đã đậu; đó là đúng dữ liệu, và nút vượt trên từng module
  chính là đường vào của chúng.
- **KHÔNG giới hạn số lượt** (chủ dự án ra lệnh 08-08 lượt sau, thay
  luật cũ "đúng một lượt, tiêu ngay khi nộp"): mọi chủ đề lớn chưa đậu
  đều LUÔN có cửa vượt, rớt rồi vượt lại được ngay tại màn kết quả —
  cửa dùng một lần rồi mất thì bằng không có cửa. Cổng 85% giữ giá
  bằng ba lớp khác đã có: xáo thứ tự câu mỗi lượt, xáo lựa chọn MCQ mỗi
  lần render, và màn RỚT không in đáp án (chỉ ý cần ôn). Sổ
  `challengeUsed` giữ lại nhưng chỉ còn là NHẬT KÝ ngày vượt gần nhất,
  không phải then cài cửa — không được dùng nó để chặn lại.
  Làm xong #6 (pool 12-16 câu rút 8) thì lớp chống-nhớ-đề còn dày hơn.
- **Đậu vượt PHẢI sinh đủ thẻ SM-2** cho mọi khái niệm (trừ
  `noFlashcard`) + mọi phòng cung điện của module, hạn ngày mai. Không
  sinh thẻ là vượt xong thủng luôn cơ chế ôn của cả mảng kiến thức đó.
- **Vẫn KHÔNG XP/streak** — thi là cổng, không phải phần thưởng
  (nguyên tắc 5), y hệt thi mastery thường.
- Rớt vượt KHÔNG được khóa đường thi mastery thường; màn rớt có nút thi
  lại và nút đó GIỮ NGUYÊN chế độ vượt (`challenge: phase.challenge`) —
  nhảy sang đường mastery thường là ghi điểm cho module chưa học bài
  nào. Luật không-rò-đáp-án ở màn rớt giữ nguyên.
- Cờ `?vuot=1` chỉ SỐNG khi còn nghĩa (chưa học hết bài trong module —
  học hết rồi thì đường thi thường đã nằm ngay trên card). Trong `ModuleTestPage`
  cờ đi THEO LƯỢT THI (`phase.challenge`), không suy lại từ store —
  màn kết quả phải giữ giọng thi vượt tới lúc người học rời trang.
- **Chuỗi vượt: nút "Vượt tiếp <module sau>" ở màn ĐẬU** (chỉ khi module
  sau cũng đủ điều kiện vượt) — bỏ quãng đi bộ về trang Học.
- **Cái vẫn KHÔNG làm: mở trắng các module bị nhảy qua.** Đậu bài M4
  không đánh dấu M1-M3 là đã đạt. Ai nhảy tới M4 thì M1-M3 vẫn ở đó
  chưa đậu, muốn tính là xong thì vượt/học từng cái. Lý do: đánh dấu
  đậu cho thứ chưa đo một câu nào là bịa số, và các module đó cũng
  không sinh thẻ ôn — môn mạng xếp chồng, người học sẽ kẹt ở lab M7 /
  ca bệnh M11 vì thiếu kiến thức M4 chưa từng chạm.

## Khi gặp mơ hồ

Spec không nói rõ một chi tiết → KHÔNG đoán theo hướng đơn giản nhất.
Đưa ra 2-3 cách hiểu, đề xuất cách bám tinh thần spec nhất, hỏi ngắn
gọn rồi chờ. Một câu hỏi tốn 30 giây; làm sai hướng tốn cả buổi.
