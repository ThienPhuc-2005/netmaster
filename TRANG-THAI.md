# Trạng thái dự án — NetMaster (Phase 1)

Cập nhật: 2026-08-05. File này chỉ để nắm nhanh tình hình khi mở lại dự
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

Kiểm tra hiện tại: **359/359 test xanh**, `npm run typecheck` sạch,
`npm run build` qua. Khối 6 đã đối chiếu DoD trên browser thật (đi trọn
bài học 6 bước, phiên ôn SM-2, luật "mở app là ôn trước", drill, mobile
không tràn ngang) và vá 1 lỗi tìm thấy khi đối chiếu: màn Phòng khám
hiện key i18n trần vì vi/en.json thiếu mục `clinic.*` — đã bổ sung chuỗi
và thêm test quét key mồ côi (key gọi trong code phải tồn tại trong
dictionary) để không tái diễn.

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

## Deploy GitHub Pages (đã chuẩn bị, chưa push)

- `vite.config.ts` đọc `GHPAGES_BASE`; workflow `.github/workflows/deploy.yml`
  truyền `/<tên-repo>/` tự động → đổi tên repo không phải sửa code.
- Routing: giữ BrowserRouter + basename từ `import.meta.env.BASE_URL`,
  trick 404 = copy `index.html` → `404.html` trong workflow (URL sạch,
  không hash). Đã kiểm bằng server mô phỏng Pages: deep-link
  `/netmaster/bai/m1-bai-2` render đúng bài, link nội bộ mang đúng prefix.
- Pipeline: push `main` → test + typecheck (đỏ là dừng) → build → deploy.
  Lần đầu cần bật Settings → Pages → Source → GitHub Actions.
- README.md (4 ảnh chụp thật trong `docs/`), LICENSE (MIT, Nguyen Van
  Thien Phuc), .gitignore, `git init -b main` đã xong. Git identity cấp
  repo: Nguyen Van Thien Phuc / thienphuc.security@gmail.com (GitHub:
  ThienPhuc-2005).
  CHƯA commit/push — người dùng tự làm để giữ authorship.

## Khối 6 còn lại làm gì

1. Đối chiếu từng tiêu chí Definition of Done (spec mục 6) cho toàn
   Phase 1, in rõ ĐẠT / CHƯA ĐẠT / LÀM KHÁC.
2. Soạn kịch bản test người thật: một người chưa biết gì về mạng học hết
   Module 1-2 rồi **vẽ lại đường đi gói tin từ trí nhớ**.
3. Xử lý các mục chưa đạt phát sinh từ hai việc trên.
