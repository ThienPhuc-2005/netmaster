# Kế hoạch tăng điểm — đọc file này khi mở phiên mới

Cập nhật: tối 2026-08-07, NGAY SAU lượt sửa lớn theo biên bản hội đồng.

**Phiên mới đọc theo thứ tự:** `TRANG-THAI.md` (tình hình chung) →
`DANH-GIA-HOI-DONG.md` (biên bản 14 ghế + checklist mục 4, đã tick 25/28
mục P0/P1) → file này (việc kế tiếp). Luật làm việc vẫn ở `CLAUDE.md` —
đặc biệt mục "Sau hội đồng đánh giá (07-08) — các bất biến MỚI".

---

## 1. Điểm đã tăng chưa?

Hội đồng chấm ngày 07-08 ra **7.6/10** trung bình. Sau lượt sửa
(25/28 mục P0+P1 đóng, 876/876 test xanh), hội đồng CHƯA chấm lại —
bảng dưới là **ƯỚC LƯỢNG** suy từ việc phát hiện nào của từng ghế đã
đóng. Muốn con số chính thức: yêu cầu "triệu tập lại hội đồng chấm lại"
(chạy lại 14 agent như phiên trước, dùng cùng luật chấm trong
DANH-GIA-HOI-DONG.md).

| # | Ghế | Cũ | Ước lượng mới | Đã đóng / còn mở |
|---|-----|:--:|:---:|------------------|
| 1 | Sư phạm | 8.0 | ~8.5 | Đóng: mastery hết rò đáp án, relearning. Mở: SM-2 trần 30 ngày (P2, đụng spec), cửa sổ flow trộn ngữ cảnh (P2), XP tự chấm (P2 — trade-off chờ quyết) |
| 2 | Kỹ thuật mạng | 8.5 | ~9.2 | Đóng: PS cột Path chuẩn thật; **cả 4 mục fidelity (08-08): Enabled=False, khai báo NAT trong lab mạng nhà, prefix + thống kê ping unreachable, phòng 21 FTP**. Mở: không đáng kể |
| 3 | Tâm lý | 8.0 | ~8.7 | Đóng: freeze kể chuyện, huy hiệu hết hứa suông, animation ăn mừng. Mở: màn kết CẢ KHÓA riêng (P2, cần duyệt), openAccepts cho harder (P2, đụng schema) |
| 4 | Ngôn ngữ | 8.0 | ~9.0 | Đóng: port/cổng chốt "port"; **cả cụm P2/S dọn xong 08-08** (subnet mask M6, DORA hết lệch giới, dấu ba chấm, accept "ben"). Mở: không đáng kể |
| 5 | Màu sắc | 8.0 | ~9.3 | Đóng: opacity-60, part-accent sống, +8 cặp tokens.test, --danger có consumer; **PalaceMap light 1.82 → 2.53 (08-08)**. Mở: không đáng kể |
| 6 | Hình khái niệm | 7.0 | ~9.0 | Đóng: P0 bắt tay, DnsResolver, nắp gói tin, nhãn DORA, trục cửa; **context-stroke mũi tên, glyph 587 vẽ lại, ổ khóa 443 vàng thật (08-08)**. Mở: DORA nhãn hai đầu, trục WellKnownDoors |
| 7 | UX | 8.0 | ~8.8 | Đóng: ngõ cụt phiên ôn; **#20 persist bài dở lab/PS (08-08) — P1 cuối cùng của biên bản đã khép**. Mở: undo chấm nhầm ôn tập (P2, cần duyệt), drawer đọc-lại bước Khám phá (P2, đụng pipeline — cần duyệt) |
| 8 | Onboarding | 8.0 | ~8.5 | Đóng: ngày-2 có lời giải thích, link ôn hết chỉ sai hướng. Mở: empty state thiếu nút hành động, tab-qua-đêm né luật ôn-trước, aha reduced-motion (P2) |
| 9 | A11y | 8.0 | ~9.2 | Đóng: FeedbackRegion, focus order, aria-label typed, vùng chạm, announce goal, MotionConfig; **mũi tên dời thiết bị canvas + `<html lang>` theo nút VI/EN (08-08)**. Mở: không đáng kể |
| 10 | Kiến trúc | 8.0 | ~9.0 | Đóng: migrate+fixture (giờ là chuỗi bậc tới v3), lưới đỡ runtime, ErrorBoundary, decouple store, nearMisses, cap drill; **gates tách file + test jsdom StrictMode (08-08)**. Mở: cross-check nearMisses, store thôi with-tay content |
| 11 | Hiệu năng | 6.5 | ~8.0 | Đóng: lazy 5 route + 3 bề mặt nặng, PROD bỏ zod-validate, clean-dist, LazyMotion; **preload 2 font thân bài + đo thật bản build (08-08): 483 KB / 18 request**. Mở: nội dung 124 KB gz và thư viện zod 40 KB gz vẫn nằm trong lần tải đầu — cả hai cần seam async, **chờ quyết** |
| 12 | Đo lường | 6.5 | ~9.0 | Đóng: xáo MCQ + xáo câu + màn rớt kín đáp án; **#5 cue độ-dài + distractor "đùa" + accept gõ tay (08-08)**; **#6 pool 12 câu/module rút 8, chuẩn hóa n (08-08)**. Mở: không đáng kể |
| 13 | i18n | 7.5 | ~9.0 | Đóng: lt()/maybeLt() thay hết .vi, arp; **applyLang, chuỗi EN trung tính số, test parity placeholder, chốt nhãn SVG VI-only (08-08)**. Mở: bản EN cho NỘI DUNG bài học (việc L, ngoài Phase 1) |
| 14 | Dữ liệu | 6.5 | ~8.7 | Đóng: backup xuất/nhập, migrate, chặn 2 cửa sổ, content-hash runtime, cap drillHistory. Mở: không đáng kể |

**Trung bình ước lượng: ~9.0/10** (từ 7.6). Sau đợt ba, biên bản hội đồng
sạch P0/P1 và gần hết P2 — ghế kéo điểm xuống rõ nhất chỉ còn **Hiệu năng
(7.8)**; sau đó là ba cụm chờ chủ dự án quyết (Sư phạm ~8.5, Tâm lý ~8.7,
UX ~8.8).

---

## 2. Việc tiếp theo để tăng điểm — theo thứ tự đáng làm

### Đợt "Đề thi đáng tin" (#5 + #6) — ĐÃ XONG 08-08

**Việc kế tiếp giờ là "Đợt ba" bên dưới: lượt dọn P2 rẻ (một buổi, nhiều
ghế nhích điểm).** Mọi mục P0/P1 của biên bản hội đồng đã đóng hết.

Ghế Đo lường còn 6.5→7.5 vì hai mục nội dung chưa làm:

1. ~~**#5 [M] Rà 12 bài thi mastery**~~ — **XONG 08-08.** Cue độ-dài:
   35/38 → 13/38 (mức ngẫu nhiên của đề 3 lựa chọn), không câu nào có
   đáp án vượt distractor dài nhất quá 10%. Distractor "đùa" viết lại
   thành lỗi hiểu nhầm thật (workgroup ≠ miền, "băng tần nhanh hơn thì
   đi xa hơn", "Enforced bị Block Inheritance chặn"…). Accept gõ tay vá
   4 ca trượt oan ("dấu |", "65,535", "gethelp", "search base"). Hai
   test mới trong `content.test.ts` khóa cả hai luật.
   **Thêm một lý do #6 gấp hơn trước:** tính năng **học vượt** (08-08)
   cho phép thi vượt module, và luật "đúng một lượt" hiện nay tồn tại
   CHỈ vì đề còn cố định 8 câu. Có pool rồi mới bàn được chuyện nới
   thành thi vượt lại được.

2. ~~**#6 [L] Pool đề thi**~~ — **XONG 08-08.** Mọi module lên **pool 12
   câu**, mỗi lượt thi **rút 8** (`src/engine/masteryPool.ts`, thuần TS,
   rng bơm từ ngoài). Ba quyết định đã chốt khi làm (chủ dự án ra lệnh
   "làm tiếp", không trình phương án):
   - **Cỡ pool 12, không 16.** 12 rút 8 = 495 tổ hợp, đủ để không lượt
     nào lặp lượt trước; 16 đòi 96 câu mới và chất lượng câu sẽ loãng.
   - **Cỡ đề CỐ ĐỊNH 8** (chuẩn hóa n): 7/8 đậu, 6/8 rớt — y hệt trước,
     nên con số 85% không đổi nghĩa giữa các module và các lượt.
   - **Câu TRỤ luôn vào đề**: lab (M4), cung điện (M5/M9), ca bệnh (M11),
     terminal PS (M12). Rút trượt chúng nghĩa là có lượt thi không đo tới
     kỹ năng chính của module; riêng M5 ba câu cung điện hợp lại mới phủ
     đủ 15 phòng. Chỗ còn lại mới bốc ngẫu nhiên.
   46 câu mới bám concept, không lặp câu cũ; nhân tiện tỉ lệ "đáp án là
   lựa chọn dài nhất" xuống **14/69 (20%)** từ 13/38 (34%). Ghế Đo lường
   ước lên ~9.

### Đợt hai: đóng P1 cuối + cụm UX (ghế 7 lên ~8.8)

3. ~~**#20 [M] Persist bài dở lab/PS**~~ — **XONG 08-08.** Chọn hướng
   PERSIST THẬT thay vì hộp xác nhận: hộp xác nhận chỉ đổi "mất trắng
   không báo" thành "mất trắng có báo", công sức vẫn bay.
   - Store thêm ngăn `practiceDrafts` (khóa `lessonId::questionId`),
     persist **v2 → v3 kèm case migrate + test** (đúng luật cửa migrate),
     trần 12 bài dở, dọn cái cũ nhất khi vượt.
   - Lab lưu sơ đồ + chỗ đứng thiết bị (KHÔNG lưu lịch sử undo — dấu
     chân của buổi ngồi, không phải thành quả); `restoreLab` giữ
     `initial` là đề bài nên "Về sơ đồ ban đầu" vẫn về đúng vạch xuất
     phát. PS lưu thế giới + NHẬT KÝ lệnh; "Làm lại từ đầu" xóa bài dở.
   - **Bài học lưu, bài thi KHÔNG** (`draftKey` chỉ truyền từ
     LessonPlayer): rời bài thi giữa chừng là mất lượt, nạp lại sơ đồ
     lắp dở của đề thi là mở đường mang bài về nhà làm dần. Có test gác
     đúng ranh giới này.
   - Bài dở bị xóa khi câu đã xong (đoán thử trả lời xong, bài tập giải
     đúng) — ngăn bài dở không giữ những thứ đã làm xong.
4. **Undo 5 giây sau khi chấm nhầm thẻ ôn** (P2, cần duyệt — đụng phiên
   ôn): giữ snapshot thẻ trước grade, nút "Hoàn tác" hiện ~5s.

### Đợt ba: lượt dọn P2 rẻ — XONG 08-08

Sáu nhóm dưới đây đã làm hết trong một lượt; chi tiết ở `TRANG-THAI.md`
mục 7. **Việc kế tiếp là đợt bốn.**

5. ~~Ngôn ngữ (ghế 4)~~ — XONG: "subnet mask" thống nhất ở M6 (4 chỗ),
   ẩn dụ DORA hết lệch giới, "..." → "…" ở M1-3 (giữ ASCII trong ký hiệu
   IPv6 và mẫu lệnh PS — người học có thể chép lại), accept "ben máy
   đích" viết lại thành biến thể không dấu.
6. ~~Kỹ thuật (ghế 2)~~ — XONG: New-ADUser mặc định **Enabled=False**
   như AD thật (+ test khóa, + deepDive/flashcard M12 giải thích);
   đề lab mạng nhà khai rõ "phòng lab không mô phỏng NAT"; ping
   unreachable có prefix **"Reply from <IP người ký tên>:"** và đếm
   **Received=4, Lost=0 (0% loss)** — giữ nguyên bẫy "0% loss mà vẫn
   không thông" (+ test); phòng 21 kể lại thành quầy RA LỆNH, deepDive
   nói vì sao FTP vỡ qua tường lửa.
7. ~~Hình (ghế 6)~~ — XONG: `context-stroke` ở Frame nên đầu mũi tên ăn
   màu của chính nét gọi nó (130 hình hưởng); glyph 587 vẽ lại thành
   THẺ TRÊN MẶT QUẦY, hết na ná sổ hộ khẩu 389; ổ khóa 443 render
   `var(--warn)` (đo trên browser: rgb(251,191,36)); PalaceMap nền sáng
   /40 → /60 (contrast 1.82 → 2.53).
8. ~~i18n (ghế 13)~~ — XONG: `applyLang` cạnh `applyTheme` (đo thật:
   bấm VI/EN là `<html lang>` đổi theo); 4 chuỗi EN đếm được viết lại
   trung tính số; test parity mới so bộ `{placeholder}` từng key; hai
   comment tuyên bố ngoại lệ VI-only. **Nhãn SVG: chốt VI-only** — hình
   đi kèm NỘI DUNG, mà nội dung Phase 1 chỉ có tiếng Việt; dịch nhãn là
   được cái hình nói tiếng Anh cạnh đoạn bài tiếng Việt.
9. ~~A11y (ghế 9)~~ — XONG: mũi tên dời thiết bị canvas đúng một ô lưới
   (dùng chung `snapToGrid` với chuột), + 2 test.
10. ~~Kiến trúc (ghế 10)~~ — XONG: hai cổng tách ra `src/app/gates.tsx`
    và có `gates.test.tsx` chạy dưới StrictMode — 6 test phủ onboarding
    đứng trước, luật ôn-trước, và cờ chống kẹt vòng.

### Đợt bốn: hiệu năng sâu + các mục cần bàn với chủ dự án

11. Hiệu năng — **phần làm được ngay XONG 08-08, phần lớn đang chờ một
    quyết định:**
    - ~~preload 2 font critical~~ — XONG: plugin
      `netmaster-preload-critical-fonts` trong `vite.config.ts` (tên file
      có hash nên phải sinh lúc build; không khớp là **build chết**, để
      preload không lặng lẽ biến mất). Đo trên bản build: font thân bài
      bắt đầu tải ở **68 ms** thay vì 236-271 ms.
    - ~~đo thật~~ — XONG: bản build, lần mở app đầu = **483 KB / 18
      request** (JS 340, font 123, CSS 20). Ước 3G thật (~50 KB/s) ~10 s;
      slow-4G (~190 KB/s) ~2,5 s. Cấu hình `netmaster-preview` đã thêm
      vào `.claude/launch.json` để đo lại bất cứ lúc nào.
    - **CHỜ QUYẾT — một câu hỏi, hai món lợi:** *cho `loadModules()`
      thành async không?*
      - Món 1: **nội dung 124 KB gz** hiện tải ngay cả với người đang ở
        onboarding. Lazy theo module → người học bài 1 chỉ tải module 1.
      - Món 2: **zod ~40 KB gz nằm trong bundle đầu** dù PROD không parse
        gì — vì mọi nơi import `contentSchema` để lấy type/hàm thuần nên
        kéo theo cả file schema. Muốn tách phải có seam async y hệt.
      - Giá: `loadModules()` sync đang được ~10 nơi gọi thẳng trong lúc
        render (LearnPage, LessonPlayer, ModuleTestPage, ReviewPage,
        clinicCases, FoundationReview, ConceptVisual…). Async hóa nghĩa
        là thêm một trạng thái "đang tải nội dung" vào những màn đó, sửa
        cả store + test. Việc L, làm cẩn thận hết một buổi.
      - Nếu KHÔNG làm: 483 KB vẫn là con số phải sống chung; ghế Hiệu
        năng đứng ở ~7.8-8.
12. Các mục CẦN CHỦ DỰ ÁN QUYẾT (đừng tự làm): màn kết CẢ KHÓA riêng;
    XP nút tự chấm (trade-off hai chiều đã ghi trong biên bản); SM-2
    thêm bậc 60/120 hoặc nghỉ hưu thẻ (sửa SPEC); cửa sổ flow lọc ngữ
    cảnh; openAccepts cho mcq harder (đụng schema); drawer đọc-lại bước
    Khám phá; hệ huy hiệu thật theo spec 2.4.

### Ngoài code (điểm không tăng bằng code được nữa)

- **Các buổi test người thật** theo `KICH-BAN-TEST.md` mục 1-11 — nhiều
  phát hiện (nhất là cụm mastery + onboarding ngày-2 vừa sửa) cần người
  thật xác nhận. Phase 1 chỉ khép chính thức khi 1 người ĐẬU bài vẽ.

---

## 3. Luật cho phiên làm tiếp (nhắc lại cho khỏi phá)

- Mục nào ghi "(cần duyệt)" là trình phương án + chờ, KHÔNG tự code.
- Không phá 10 điều "đã đạt chuẩn — đừng phá" (DANH-GIA-HOI-DONG.md mục
  5) và các bất biến mới trong CLAUDE.md (màn rớt kín đáp án, relearning,
  cửa migrate, lt(), port/cổng, cột Path, LazyMotion m.*, lazy đường nóng).
- Sửa nội dung JSON xong: `npm run content:review` + `npm test`; sửa
  xong bất kỳ đợt nào: typecheck + full test + build, và tick checklist
  trong DANH-GIA-HOI-DONG.md mục 4.
- Muốn số điểm CHÍNH THỨC thay vì ước lượng: triệu tập lại hội đồng 14
  ghế chấm lại (cùng luật chấm, cùng schema — xem "Cách làm việc" đầu
  biên bản), so bảng điểm mới với bảng cũ.
