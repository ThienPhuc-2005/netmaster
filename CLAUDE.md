# CLAUDE.md — Luật dự án NetMaster (App Học Mạng)

File này đọc ở MỌI phiên, và cố ý NGẮN: chỉ chứa luật ứng xử. Ba file
anh em, mỗi file một vai:

- `TRANG-THAI.md` — đang ở đâu, làm gì tiếp. **Mở phiên mới là đọc mục
  "ĐỌC 30 GIÂY" đầu file đó TRƯỚC TIÊN.**
- `GHI-CHU-KY-THUAT.md` — bất biến kỹ thuật xếp theo vùng (lab, CLI, PS,
  cung điện, phòng khám, nội dung, store, UI…). **Sắp sửa vùng nào thì
  đọc mục vùng đó TRƯỚC khi sửa** — mỗi dòng trong đó là một bài học đã
  trả giá, phá là test đỏ hoặc lặp lỗi cũ.
- `Y-TUONG.md` — kho ý tưởng cải thiện app đang chờ duyệt.

## Mở phiên mới: 3 bước

1. Đọc đầu `TRANG-THAI.md` → biết khối đang làm và việc kế tiếp.
2. Xác định vùng sắp đụng → đọc mục tương ứng trong `GHI-CHU-KY-THUAT.md`.
3. Việc thuộc về TÍNH NĂNG/CƠ CHẾ HỌC → đối chiếu spec trước khi code.

## Thứ bậc quyền lực

**Lệnh trực tiếp của chủ dự án trong chat mạnh hơn mọi luật trong file
này.** Ra lệnh thì LÀM — không trình phương án, không xin duyệt lại,
không tranh luận. Nêu quan ngại nhiều nhất MỘT lần; chủ dự án nhắc lại
là làm ngay.

Hai thứ duy nhất không bao giờ bỏ, vì là BÁO CÁO SỰ THẬT chứ không phải
cãi lệnh:

1. Test đỏ / build hỏng / làm chưa xong → nói thẳng, không báo "xong".
2. Làm khác spec → khai ở mục SAI LỆCH của báo cáo cuối lượt.

## Nguồn chân lý

`SPEC-APP-HOC-MANG.md` (M1-12 + cơ chế chung) và `SPEC-TRUNG-CAP.md`
(M13-21). Hai bản mâu thuẫn về cơ chế chung thì v1 thắng. Spec là đề
bài, không phải xiềng xích — muốn khác spec thì đi cửa "Đề xuất" dưới.

## 5 nguyên tắc sư phạm bất khả xâm phạm

1. Mọi bài học kết thúc bằng retrieval — không có bài "đọc xong là qua".
2. Mastery gate ≥ 85% mới mở module sau. Không có nút skip.
3. Một màn hình = một khái niệm mới.
4. Thực hành: thử-sai trước, gợi ý sau 2 lần sai, lời giải sau 3 lần.
5. XP/streak chỉ từ retrieval và lab, không từ việc đọc/xem.

Code làm suy yếu 1 trong 5 điều trên = phá cơ chế học, dù chạy đúng.

## Ranh giới quyết định + cửa sáng tạo

- **CÁI GÌ app làm** (tính năng, cơ chế học, nội dung): mặc định theo
  spec. Muốn khác → ĐỀ XUẤT bằng tiếng người: "spec đang A, tôi muốn B,
  vì C" — chủ dự án gật một chữ là làm luôn, không nghi lễ giấy tờ.
- **Các mốc đóng băng** (24 lệnh CLI, 11 cmdlet PS, phạm vi sim…) KHÔNG
  phải cấm vĩnh viễn — chúng chỉ chặn scope creep VÔ THỨC. Thấy đáng mở
  thì đề xuất phá mốc bất cứ lúc nào, kèm cái giá phải trả.
- **LÀM BẰNG CÁCH NÀO** (thư viện, cấu trúc file, đặt tên, tối ưu): tự
  quyết, miễn không đổi hành vi người dùng thấy; đáng nói thì ghi một
  dòng trong báo cáo.
- **Ý TƯỞNG**: mỗi lượt được hiến 0-3 ý (mục Ý TƯỞNG của báo cáo), và
  ý phải BÁM VÀO thứ vừa làm trong lượt: đang làm bài/module nào thì đề
  xuất cách dạy, hình, lab, ca bệnh… hợp với ĐÚNG nội dung và dạng của
  bài đó (bài default gateway thì ý về gateway, bài ACL thì ý về ACL) —
  mỗi bài một dạng khác nhau, tự chọn dạng cho khớp. Ý cấp toàn-app chỉ
  đưa khi thật đáng, và cất vào kho `Y-TUONG.md` — chủ dự án hỏi "làm
  gì tiếp" hoặc rảnh việc thì lấy từ kho ra đề xuất.

## Quy trình làm việc

- Nhận việc theo KHỐI NHỎ; việc lớn/đụng kiến trúc → trình kế hoạch
  ngắn, chờ duyệt rồi code.
- **Báo tiến độ giữa lượt**: lượt dài thì đầu lượt in danh sách bước
  ("① … ② … ③ …"), xong bước nào báo một dòng ngay lúc đó. Cấm im lặng
  cày lâu rồi xổ một cục cuối lượt.
- Cấm giao code có placeholder, TODO, mock data, hàm rỗng. Không đủ thời
  gian → làm ít nhưng xong hẳn.
- Test cho logic lõi; chạy `npm test` + `npm run typecheck` trước khi
  báo xong. Nội dung mới thì thêm `npm run content:review` + kiểm
  browser thật (quy trình đầy đủ ở đầu `TRANG-THAI.md`).
- Không refactor lớn hoặc đổi cấu trúc thư mục khi chưa được yêu cầu.

## Khuôn báo cáo cuối lượt (bắt buộc)

```
## Báo cáo lượt này
ĐANG Ở ĐÂU: khối <x> · Phần <…> · <n>/21 module có nội dung
LƯỢT NÀY:  ✅ <mỗi dòng một việc, viết bằng tiếng người>
SỨC KHỎE:  <test> · <typecheck> · <build>
CẦN BẠN:   <việc chỉ chủ dự án làm được — không có thì "Không có gì">
SAI LỆCH:  Không có  (hoặc 1-2 dòng: spec đòi A, tôi làm B vì C —
           ok thì thôi, không ok thì nói tôi sửa)
Ý TƯỞNG:   <0-3 ý, mỗi ý một dòng — thích ý nào gọi tên là thành việc>
KẾ TIẾP:   <một dòng>
```

"Tiếng người" = đọc hiểu được mà không cần biết code; thuật ngữ và tên
file chỉ để trong ngoặc khi thật cần. Báo cáo dài dòng đầy thuật ngữ
cũng là một dạng báo cáo hỏng.

## Quy ước kỹ thuật cốt lõi

- Nội dung bài học là DATA (`content/modules/*.json`) — engine đọc data,
  thêm bài không sửa engine. App KHÔNG render markdown.
- `src/engine/` thuần TS: không React, không localStorage, không tự lấy
  giờ hệ thống.
- Chuỗi người học: tiếng Việt "bạn/mình", không bao giờ chữ "SAI" trần
  trụi. Khung app song ngữ VI/EN qua i18n (cùng key, có test parity);
  nội dung bài học qua LText, UI đọc bằng `lt()`.
- Thuật ngữ: "port" = TCP/UDP, "cổng" = vật lý; "subnet mask" giữ tiếng
  Anh.
- Đổi shape persist = bump version + một bậc migrate + fixture (hiện v4).
- Comment logic sư phạm tiếng Việt, kỹ thuật thuần tiếng Anh.
- Lưu tiến độ localStorage (chưa có backend); data model thiết kế để
  chuyển backend sau này không phải viết lại.

## Lệnh dev

- `npm run dev` — dev server (Vite, cổng 5173)
- `npm run build` — build production
- `npm test` — toàn bộ test (Vitest)
- `npm run test:watch` — test chế độ watch
- `npm run typecheck` — kiểm kiểu (`tsc --noEmit`)
- `npm run content:review` — render bản đọc duyệt nội dung
  (`REVIEW-NOI-DUNG.md`)

## Bản đồ thư mục

- `src/engine/` — lõi sư phạm thuần TS: SM-2, lessonMachine, mastery
  gate + masteryPool, flow, grading; các vùng lab/ cli/ ps/ palace/
  clinic/ subnet/.
- `src/features/` — learn (LessonPlayer 6 bước + ModuleTestPage), review,
  drill, lab, clinic, ps, cli, palace, profile, onboarding, `/design`.
- `content/modules/*.json` — 17 module nội dung thật; `src/content/` là
  tầng nạp + cổng chất lượng (`content.test.ts`).
- `src/store/` — progress (persist v4, nơi duy nhất nối engine với thời
  gian thật + localStorage), settings (theme/âm/lang).
- `src/components/` — Button, FeedbackBanner/FeedbackRegion, ProgressBar,
  QuestionInput, ConceptVisual (registry SVG), AppLayout (4 tab).
- `src/styles/tokens.css` — nguồn chân lý màu; `src/i18n/` — vi/en;
  `src/audio/` — earcon.
- `tests/fixtures/` — fixture cho test schema/store.
- Bất biến chi tiết của từng vùng: `GHI-CHU-KY-THUAT.md`.

## Khi gặp mơ hồ

Spec không nói rõ → KHÔNG đoán theo hướng dễ nhất. Đưa 2-3 cách hiểu,
đề xuất cách bám tinh thần spec nhất, hỏi ngắn gọn rồi chờ. Một câu hỏi
tốn 30 giây; làm sai hướng tốn cả buổi.
