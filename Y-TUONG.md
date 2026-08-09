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
- ☐ **A3. Hồ sơ lỗi cá nhân** — trang Hồ sơ liệt kê "5 câu bạn sai
  nhiều nhất" + nút ôn riêng chúng. Sai lầm là dữ liệu quý nhất mà app
  đang có sẵn (answerHistory) nhưng chưa dùng.
- ☐ **A4. "Bạn của 3 tuần trước"** — khi ôn thẻ cũ: "lần đầu gặp câu
  này bạn sai 2 lần, giờ thử xem". Cảm giác tiến bộ đo được giữ người
  học lâu hơn điểm số.
- ☐ **A5. Tổng kết phiên học** — học xong một phiên hiện màn 5 giây:
  vừa học gì, đúng bao nhiêu, sinh mấy thẻ mới. Kết thúc có "cửa đóng"
  đàng hoàng thay vì trôi tuột (hiệu ứng peak-end).
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

- ☐ **E1. Mở app vào thẳng chỗ dở** — card "Học tiếp bài X — còn 2
  bước" ngay đầu trang Học. Giảm ma sát từ mở-app tới học-thật xuống
  một cú bấm.
- ☐ **E2. Kế hoạch hôm nay** — "hôm nay: 12 thẻ ôn + 1 bài mới ≈ 15
  phút" — người học không phải quyết định gì, bấm là chạy (giảm tê liệt
  lựa chọn).
- ☐ **E3. Bàn phím một tay cho desktop** — phím 1/2/3 chọn trắc nghiệm,
  Enter nộp, mũi tên đi cung điện. Tốc độ tạo dòng chảy.
- ☐ **E4. Sao lưu một cú bấm** — nút xuất tiến độ ra file + nhập lại.
  localStorage là thứ dễ bay nhất trần đời; người học mất 3 tuần tiến
  độ là app mất luôn người học.

## F. Kỹ thuật nền

- ☐ **F1. Cài như app thật (PWA)** — manifest + service worker. App vốn
  đã offline được, chỉ thiếu tấm áo để nằm trên màn hình chính điện
  thoại.
- ☐ **F2. Cắt nhỏ gói nội dung** — bundle content đang ~800kB một cục
  (build đang cảnh báo); tách theo module, vào bài nào tải bài đó → mở
  app lần đầu nhanh hơn hẳn.
- ☐ **F3. Ảnh chụp tiến độ tự động** — định kỳ tự lưu snapshot tiến độ
  (xoay vòng vài bản). Migrate lỡ hỏng còn đường lùi.

## G. Việc spec đã hứa nhưng chưa tới lượt

- ☐ **G1. Phòng khám hai terminal** — spec v2 mục 4.2 đã hứa: ca bệnh
  trung cấp khám bằng CẢ terminal Windows (máy con) lẫn console thiết
  bị (switch/router) trên cùng một mạng sống. Đây là mảnh ghép để ca
  bệnh M18-21 "thật" hẳn. (Capstone đã xong mà chưa cần tới — giờ nó
  là nâng cấp chất lượng, không còn là điều kiện.)

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
- ☐ **H6. Đồ thị "nếp học của bạn" ở Hồ sơ** — số câu đúng theo tuần,
  cho người học tự trải nghiệm khái niệm baseline (M20) trên chính dữ
  liệu của mình; hợp làm cùng B1.
- ☐ **H7. Bài đọc-số-thật cho scope DHCP** — nâng ca scope cạn M18
  thành bài tự tính: cho bảng 200 suất/197 đã cấp/lease 8 ngày, hỏi
  rút lease còn bao nhiêu thì sống qua sáng thứ hai.
- ☐ **H8. `Get-ADUser -Properties MemberOf`** — một THAM SỐ (không
  phải lệnh mới) mở chiều tra ngược "người này thuộc nhóm nào" cho ca
  khám quyền M19; giá: sửa mốc 11 lệnh thành 11 lệnh + 1 tham số.
