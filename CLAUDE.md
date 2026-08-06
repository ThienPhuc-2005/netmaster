# CLAUDE.md — Luật dự án App Học Mạng

File này được đọc ở MỌI phiên làm việc. Tuân thủ tuyệt đối.

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

## Cấu trúc hiện tại (Phase 1 + Phase 2 XONG; kế tiếp là Phase 3)

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
- **Luật của cung điện, không được phá:**
  - Tòa nhà và lộ trình CỐ ĐỊNH — 15 phòng kín lưới, luôn đi tầng trệt
    lên nóc, trái sang phải (bản thân thứ tự là một phần của cái được nhớ).
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

## Khi gặp mơ hồ

Spec không nói rõ một chi tiết → KHÔNG đoán theo hướng đơn giản nhất.
Đưa ra 2-3 cách hiểu, đề xuất cách bám tinh thần spec nhất, hỏi ngắn
gọn rồi chờ. Một câu hỏi tốn 30 giây; làm sai hướng tốn cả buổi.
