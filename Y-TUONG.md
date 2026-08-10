# Y-TUONG.md — Kho ý tưởng đang chờ duyệt

Mỗi ý một dòng tiêu đề + 1-2 câu tiếng người. Chủ dự án gọi tên ý nào
thì ý đó thành việc của lượt sau (chuyển sang TRANG-THAI.md khi bắt tay
làm, gạch khỏi đây khi xong). Ý mới nghĩ ra trong lúc làm việc: thêm
vào cuối mục phù hợp, kèm ngày.

Trạng thái: ☐ chờ duyệt · ✅ đã làm · ✗ đã bàn và bỏ (giữ lại kèm lý do
để khỏi đề xuất lại).

## A. Tâm lý học & trí nhớ

- ☐ **A1. Thanh trí nhớ mờ dần** — mỗi thẻ ôn hiện "độ tươi" của trí
  nhớ (suy từ dữ liệu SM-2 sẵn có). Mở app thấy "3 thẻ sắp quên hôm
  nay" — lý do quay lại đúng khoa học hơn là sợ mất streak.
- ☐ **A2. Tự chấm độ chắc trước khi lật thẻ** — hỏi "bạn chắc bao
  nhiêu?" trước khi hiện đáp án, rồi so độ chắc với kết quả thật. Luyện
  khả năng tự biết mình biết gì — kỹ năng lõi của người học giỏi.
- ✅ **A3. Hồ sơ lỗi cá nhân** — ĐÃ LÀM (khối 21.2): mục "Chỗ bạn hay
  vấp" ở trang Hồ sơ, 5 câu thử lại nhiều nhất kèm đường quay lại bài.
  **Nguồn không phải answerHistory như ý gốc đoán** — trường đó chỉ có
  {correct, at} và giữ 10 bản ghi cuối; nguồn thật là
  `lessonRuntimes[].exercises[].failCount` (theo từng câu, giữ mãi).
- ✅ **A4. "Bạn của 3 tuần trước"** — ĐÃ LÀM (khối 21.2): thẻ từng quên
  thì phiên ôn nói trước khi lật ("thẻ này bạn từng quên 3 lần"), đọc
  từ `lapses` của SM-2. Chỉ hiện ở lượt chấm đầu, không hé lộ nội dung.
- ✅ **A5. Tổng kết phiên học** — ĐÃ LÀM (khối 21.1). Màn tổng kết bước 6
  vốn đã kể "vừa học gì" + XP + hé lộ bài sau; bổ sung nốt hai con số của
  cửa đóng: **tự giải được N/M bài** (không tính bài phải mở lời giải) và
  **N thẻ mới vào Hộp ôn tập** (đọc chung `newCardIdsForLesson` với store
  nên con số hứa không lệch con số thật).
- ☐ **A6. Nhắc nghỉ đúng lúc** — học liên tục ~25 phút thì nhắc nhẹ
  "não cần vài phút để đóng gói thứ vừa học". Tắt được trong cài đặt.

## B. Màu sắc & thị giác

- ☐ **B1. Bản đồ ấm dần** — ô module đã đậu trên bản đồ khóa học chuyển
  tông ấm dần; liếc một cái biết mình đi được bao xa, không cần đọc số.
- ☐ **B2. Chế độ tập trung** — vào bài học thì nav, streak, mọi thứ
  ngoài lề tự mờ/ẩn. "Một màn hình một khái niệm" triệt để tới cả khung
  app.
- ☐ **B3. Theme "tự động"** — thêm lựa chọn theo giờ/hệ điều hành
  (prefers-color-scheme) bên cạnh sáng/tối cố định.

## C. Âm thanh

- ☐ **C1. Giai điệu tiến độ** — xong một chặng: 3 nốt đi lên; đậu
  module: hợp âm kết. Cùng họ với 4 earcon hiện có, vẫn tắt một nút.
- ☐ **C2. Âm xúc giác cho lab** — tiếng "tách" khi cắm dây, "vụt" nhẹ
  khi gói tin bay. Tay không chạm được thiết bị thì để tai chạm.

## D. Câu chữ

- ☐ **D1. Khen đúng việc** — kho 20+ câu khen gắn với hành vi cụ thể
  ("bạn tự tra bảng trước khi hỏi — thói quen của người giỏi nghề")
  thay vì "Chính xác!" lặp mãi. Khen hành vi bền hơn khen kết quả.
- ☐ **D2. Thư cuối module** — đậu module thì nhận một đoạn 3-4 câu kể
  "bạn giờ làm được gì mà hai tuần trước chưa làm được", giọng người
  trực ca đêm để thư lại cho ca sáng.

## E. UX hành vi

- ✅ **E1 + E2. Thẻ "Hôm nay"** — ĐÃ LÀM (khối 21.1): một thẻ đầu trang
  Học nói hôm nay có gì (thẻ ôn đến hạn · bài đang dở kèm bước mấy/6 ·
  bài mới · thi cuối module) kèm ước lượng "≈ N phút" và MỘT nút cho
  việc đáng làm trước nhất. Engine `todayPlan.ts` thuần TS; thẻ này thay
  luôn banner nợ-ôn cũ.
- ☐ **E3. Bàn phím một tay cho desktop** — phím 1/2/3 chọn trắc nghiệm,
  Enter nộp, mũi tên đi cung điện. Tốc độ tạo dòng chảy.
- ✅ **E4. Sao lưu một cú bấm** — ĐÃ LÀM (hội đồng v1, ghế dữ liệu):
  tab Hồ sơ có nút xuất/nhập file JSON 3 key localStorage; cửa nhập siết
  thêm ở khối 20.3 (chặn file từ bản app mới hơn).

## F. Kỹ thuật nền

- ✅ **F1. Cài như app thật (PWA)** — ĐÃ LÀM (khối 21.5): manifest +
  service worker sinh lúc build theo BASE động, icon tự vẽ (không thêm
  dependency). Hoá ra app CHƯA offline được như ý gốc tưởng: AppGate
  chờ nạp đủ 21 chunk nội dung nên mất mạng là màn trắng — giờ precache
  hai mức, tắt server tải lại vẫn mở được bài học.
- ✅ **F2. Cắt nhỏ gói nội dung** — ĐÃ LÀM (khối 20.2): glob non-eager,
  21 module = 21 chunk riêng, `primeModules()` nạp sau cổng AppGate; kèm
  dời zod khỏi PROD. Khởi động ~530KB → ~215KB gzip.
- ☐ **F3. Ảnh chụp tiến độ tự động** — định kỳ tự lưu snapshot tiến độ
  (xoay vòng vài bản). Migrate lỡ hỏng còn đường lùi.

## G. Việc spec đã hứa nhưng chưa tới lượt

- ✅ **G1. Phòng khám hai terminal** — ĐÃ LÀM (khối 20.2): cờ
  `deviceConsole: true` cấp console thiết bị CHỈ-ĐỌC cạnh terminal
  Windows (`ClinicDeviceConsole`); hai ca liên tầng M21 dùng nó, nửa
  bệnh lớp 2 giờ KHÁM được thay vì đoán bằng loại trừ.

## H. Ý sinh ra trong lúc làm Phần D-E (08-09)

- ☐ **H1. Giấy chứng nhận tải được** — màn tốt nghiệp thêm nút xuất
  ảnh PNG từ chính bản đồ + số liệu (canvas, không backend): phần
  thưởng xã hội đem khoe được mà không phá luật không-XP.
- ☐ **H2. "Về đích sau X ngày"** — mốc tốt nghiệp in thêm số ngày từ
  bài học đầu tới lúc đậu (min/max ngày trong completedLessons — data
  có sẵn); con số thời gian làm câu chuyện cá nhân hơn điểm số.
- ☐ **H3. Ca bệnh sửa lai** — cho ca liên tầng phần SỬA nửa tay nửa
  chọn: sửa mạng bằng phòng lab thật (vd native VLAN) + chọn hành động
  cho phần ngoài mô hình (vd bản ghi DNS). Cần mở cơ chế fix mới ở
  engine phòng khám — đề xuất phá mốc khi làm.
- ☐ **H4. Tiến độ công trường capstone** — đầu các bài M21 hiện dòng
  "chặng 1 ✓ · chặng 2 đang làm · chặng 3 chờ" cho người học thấy tòa
  nhà mình đang xây dở tầng nào.
- ☐ **H5. Thẻ ôn điền-chữ-khuyết cho câu nhớ severity** — "Em Ăn ___
  Em Với ___ Iu Đi" thay vì chỉ hỏi xuôi, chống học vẹt mặt chữ.
- ✅ **H6. Đồ thị "nếp học của bạn"** — ĐÃ LÀM (khối 21.2): 8 tuần gần
  nhất ở trang Hồ sơ. Đếm **bài học xong + phiên luyện** chứ không phải
  "số câu đúng" như ý gốc — store không giữ lịch sử câu trả lời theo
  ngày. Tuần nghỉ vẫn có vạch, vì khoảng trống mới là thứ baseline dạy
  người ta đọc.
- ☐ **H7. Bài đọc-số-thật cho scope DHCP** — nâng ca scope cạn M18
  thành bài tự tính: cho bảng 200 suất/197 đã cấp/lease 8 ngày, hỏi
  rút lease còn bao nhiêu thì sống qua sáng thứ hai.
- ☐ **H8. `Get-ADUser -Properties MemberOf`** — một THAM SỐ (không
  phải lệnh mới) mở chiều tra ngược "người này thuộc nhóm nào" cho ca
  khám quyền M19; giá: sửa mốc 11 lệnh thành 11 lệnh + 1 tham số.
