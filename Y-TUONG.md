# Y-TUONG.md — Kho ý tưởng đang chờ duyệt

Mỗi ý một dòng tiêu đề + 1-2 câu tiếng người. Chủ dự án gọi tên ý nào
thì ý đó thành việc của lượt sau (chuyển sang TRANG-THAI.md khi bắt tay
làm, gạch khỏi đây khi xong). Ý mới nghĩ ra trong lúc làm việc: thêm
vào cuối mục phù hợp, kèm ngày.

Trạng thái: ☐ chờ duyệt · ✅ đã làm · ✗ đã bàn và bỏ (giữ lại kèm lý do
để khỏi đề xuất lại).

## A. Tâm lý học & trí nhớ

- ✅ **A1. Thanh trí nhớ mờ dần** — ĐÃ LÀM (khối 21.7): `engine/
  freshness.ts` + bản đồ trí nhớ theo module ở trang Hồ sơ + dòng "N thẻ
  đang mờ dần" ở thẻ Hôm nay. **Cố ý KHÔNG hiện độ tươi trong lúc ôn**:
  "trí nhớ còn 12%" đọc trước khi lật là lời mời bỏ cuộc.
- ✅ **A2. Tự chấm độ chắc trước khi lật thẻ** — ĐÃ LÀM (khối 21.7):
  ba nút Mình chắc / Lơ mơ / Chịu CHÍNH LÀ nút lật thẻ (không thêm cú
  bấm nào), rồi đối chiếu với kết quả. Chỉ nói khi LỆCH; "lơ mơ" luôn
  tính là khớp — phạt người thành thật là dạy người ta bớt thành thật.
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
- ✅ **A6. Nhắc nghỉ đúng lúc** — ĐÃ LÀM (khối 21.33): học liền 25 phút thì
  một dòng nhắc nhẹ hiện ra, tắt được bằng nút ngay cạnh nút nền/âm thanh.
  Ba luật làm nên "đúng lúc" mà ý gốc chưa nói: **nghỉ rồi thì không nhắc**
  (rời máy quá 5 phút là quãng đếm lại từ đầu — quay lại mà bị giục nghỉ
  thì lần sau không ai đọc nữa), **nhắc rồi thì im trọn một quãng nữa**, và
  **đang thi thì không bao giờ nhắc**. Quãng học sống trong bộ nhớ, tải lại
  trang là đếm lại: nhắc muộn không ai thiệt, nhắc oan là mất uy tín ngay
  lần đầu.

## B. Màu sắc & thị giác

- ✅ **B1. Bản đồ ấm dần** — ĐÃ LÀM (khối 21.19): dải 21 ô ở đầu danh sách
  chủ đề trang Học, ô đã đậu tô theo 5 nấc ấm dần. Nấc lấy theo VỊ TRÍ
  trong khóa chứ không theo số ô đã đậu — lấy theo số đã đậu thì ai cũng
  thấy vệt kết thúc bằng màu nóng nhất, kể cả người vừa đậu chủ đề 2. Ý
  gốc nói "trên bản đồ khóa học", nhưng bản đồ 21 ô duy nhất biết tiến độ
  lại nằm ở màn tốt nghiệp (mỗi khóa thấy một lần) — nên dựng dải riêng
  đặt đúng trang người học mở hằng ngày. Cố ý KHÔNG bấm được: 21 ô thành
  link là 21 chặng Tab chắn trước nội dung chính.
- ✅ **B2. Chế độ tập trung** — ĐÃ LÀM (khối 21.17): vào bài học hoặc bài
  thi thì khung app THU LẠI còn thanh biểu tượng (desktop 224px → 64px),
  tên app + dòng tag + cụm cài đặt + hai icon liên hệ cất đi; bốn mục
  menu ở lại. **Cố ý KHÔNG làm mờ như ý gốc**: hạ độ đục chữ menu là hạ
  contrast xuống dưới 4.5:1 — đổi một nguyên tắc sư phạm lấy một lỗi tiếp
  cận thì không đáng. Mobile giữ nguyên chữ ở thanh đáy (đường ra duy nhất
  trên màn hẹp), chỉ cất cụm cài đặt.
- ✅ **B3. Theme "tự động"** — ĐÃ LÀM (khối 21.18): nút nền thành BA nấc
  tối → sáng → tự động. Chỉ theo hệ điều hành (`prefers-color-scheme`),
  **KHÔNG theo giờ như ý gốc còn để ngỏ**: giờ máy không nói được người
  học đang ngồi chỗ sáng hay tối, còn hệ điều hành thì đã hỏi họ rồi. Đổi
  nền hệ điều hành giữa chừng thì app đổi ngay, không đợi mở lại. Mặc định
  vẫn là TỐI (spec 4.1), 'auto' là thứ người học tự bật.

## C. Âm thanh

- ✅ **C1. Giai điệu tiến độ** — ĐÃ LÀM (khối 21.34): thêm earcon thứ 5
  `moduleComplete` — cadence át → chủ, dài nhất và trầm nhất trong cả bộ.
  **Việc thật hóa ra không phải "thêm nhạc" mà là TÁCH hai mốc**: trước đó
  đậu cả module và xong một chặng nhỏ phát ra ĐÚNG MỘT tiếng (`stageUp`),
  nên mốc lớn nhất của app nghe y hệt một cột mốc giữa đường. Ba nốt đi lên
  của ý gốc thì `stageUp` vốn đã có sẵn. Test khóa "không hai earcon nào
  trùng bộ nốt" + "tiếng đậu module phải dài nhất và trầm nhất".
- ✅ **C2. Âm xúc giác cho lab** — ĐÃ LÀM (khối 21.35): "tách" khi cắm xong
  một sợi dây, "vụt" khi gói tin rời máy. Hai chỗ phải cẩn thận: tiếng tách
  CHỈ vang khi sợi dây thật sự cắm vào (kêu rồi mới hiện lời từ chối là nói
  dối bằng âm thanh — `dispatch` phải trả về có-áp-được-không), và tiếng
  vụt cần `Tone.glideTo` mới có: một cú lướt liền mạch mới nghe ra chuyển
  động, ba nốt rời chỉ nghe ra ba nốt rời. Cả hai đều dưới 60-160ms và rất
  khẽ vì chúng vang mấy chục lần một buổi.
  Kèm theo: **âm thanh thành BA nấc** (đầy đủ / chỉ tiếng mốc / tắt). Có
  nấc giữa vì tiếng thao tác và tiếng mốc khác hẳn tần suất — chỉ có
  tắt-hết thì người thấy ồn sẽ tắt luôn những tiếng đáng nghe nhất. Máy
  cài bản cũ (`soundOn`) tự chuyển sang nấc tương ứng, người đang tắt âm
  không bị bật lại.
- ✅ **Tiếng cho màn tốt nghiệp** (ý sinh trong lúc làm C1) — ĐÃ LÀM (khối
  21.35): mốc duy nhất lớn hơn đậu module, dùng cùng cadence nhưng bung
  rộng thêm một quãng tám và ngân gần gấp đôi.

## D. Câu chữ

- ✅ **D1. Khen đúng việc** — ĐÃ LÀM (khối 21.6): 28 câu khen chia 9
  ngữ cảnh HÀNH VI (`src/engine/praise.ts`), xoay vòng tất định theo số
  câu đã trả lời. Ưu tiên khen nếp khó trước: đọc lời giải rồi tự gõ
  lại > sai rồi tự sửa > nếp tay chân của từng nghề (lab/CLI/PS/cung
  điện/phòng khám) > nhớ lại > đúng ngay.
- ✅ **D2. Thư cuối module** — ĐÃ LÀM (khối 21.6): trường `letter` trong
  data của module, 21 lá thư riêng, hiện ở màn ĐẬU bài thi. Đây là thứ
  DUY NHẤT người học nhận lúc đậu, vì bài thi cố ý không cộng XP.

## E. UX hành vi

- ✅ **E1 + E2. Thẻ "Hôm nay"** — ĐÃ LÀM (khối 21.1): một thẻ đầu trang
  Học nói hôm nay có gì (thẻ ôn đến hạn · bài đang dở kèm bước mấy/6 ·
  bài mới · thi cuối module) kèm ước lượng "≈ N phút" và MỘT nút cho
  việc đáng làm trước nhất. Engine `todayPlan.ts` thuần TS; thẻ này thay
  luôn banner nợ-ôn cũ.
- ✅ **E3. Bàn phím một tay cho desktop** — ĐÃ LÀM (khối 21.18): phím số
  chọn trắc nghiệm và xếp thứ tự (chọn theo VỊ TRÍ đang nhìn thấy, nộp lên
  vẫn là chỉ số gốc), Enter nộp câu xếp thứ tự khi đã đủ, mũi tên phải đi
  cung điện. Con số in kèm từng lựa chọn trên màn rộng — phím tắt không ai
  thấy là phím tắt không ai dùng; màn hẹp thì ẩn hẳn. **Không có chiều
  lùi trong cung điện**: thứ tự đi là một phần của cái được nhớ.
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

## I. Ý sinh ra trong lúc làm cụm hồ sơ (08-10)

- ✅ **I1. Luyện lại đúng chỗ vấp** — ĐÃ LÀM (khối 21.9): nút trong mục
  phân tích mở phiên tối đa 10 câu gồm chính những câu từng vấp; không
  XP, không đụng lịch ôn.
- ✅ **I5. Nút "mình nghĩ câu này đúng"** — ĐÃ LÀM (khối 21.11): ghi
  nguyên văn câu người học gõ khi họ tin mình đúng mà app chấm chưa;
  đọc lại ở trang Hồ sơ. Bắt lớp lỗi accept-hẹp bằng chính người học.
- ✅ **I6. Khiếu nại được ở cả đề thi + sổ đi theo file sao lưu** — ĐÃ
  LÀM (khối 21.12).
- ✅ **I7. MCP cho app** — ĐÃ LÀM (khối 21.13): Claude cắm thẳng vào bộ
  chấm thật + nội dung + sổ khiếu nại, để nới đáp án lúc SOẠN BÀI thay vì
  gọi mạng lúc chấm.
- ✅ **I8. Dọn tồn kho accept-hẹp** — ĐÃ LÀM (khối 21.14): 89 → 0, kèm
  cảnh báo ngay trên bản đọc duyệt cho câu dưới 3 cách nói.
- ☐ **I2. Chủ đề vấp đẩy thẻ ôn lên sớm** — chủ đề nào cứ quay lại cắn
  thì thẻ khái niệm tương ứng được ưu tiên trong hàng đợi ôn.
- ☐ **I3. So với chính mình tháng trước** — chụp lại bảng phân tích theo
  tháng để thấy dạng câu từng yếu giờ đã lên.
- ☐ **I4. Ảo giác quen mặt vào hồ sơ lỗi** — thẻ nào hay bị "chắc mà
  không nhớ" (dữ liệu tự chấm A2) thì gom vào mục chỗ hay vấp; hiện dữ
  liệu đó tan theo phiên.

## H. Ý sinh ra trong lúc làm Phần D-E (08-09)

- ✅ **H1. Giấy chứng nhận tải được** — ĐÃ LÀM (khối 21.6): PNG
  1200×850 vẽ bằng canvas, nền sáng cố định (để in), tên người học là ô
  nhập tại chỗ KHÔNG lưu vào store.
- ✅ **H2. "Về đích sau X ngày"** — ĐÃ LÀM (khối 21.6): thẻ số ngày +
  một dòng kể từ ngày nào tới ngày nào. Có thêm con số ý gốc chưa nghĩ
  tới: **số ngày THẬT SỰ ngồi học** — 75 ngày mà 19 ngày học là chuyện
  bình thường, nói ra để người học khỏi tự trách quãng nghỉ.
- ☐ **H3. Ca bệnh sửa lai** — cho ca liên tầng phần SỬA nửa tay nửa
  chọn: sửa mạng bằng phòng lab thật (vd native VLAN) + chọn hành động
  cho phần ngoài mô hình (vd bản ghi DNS). Cần mở cơ chế fix mới ở
  engine phòng khám — đề xuất phá mốc khi làm.
- ✅ **H4. Tiến độ công trường capstone** — ĐÃ LÀM (khối 21.19): dải chặng
  gọn ngay trên tên bài M21, bật bằng cờ nội dung `stageProgress`. Chặng
  ĐANG LÀM là chặng chứa bài đang mở (không phải bài dở dang đầu tiên như
  bản đồ ở trang Học) — học lại bài cũ thì công trường chỉ đúng chỗ đang
  đứng. Không có nấc "khóa": đã vào module rồi thì ổ khóa là lời dọa vô
  nghĩa. Màn hẹp chỉ để lại tên chặng đang làm (bốn tên đầy đủ ăn 84px
  ngay trên tên bài), tên các chặng kia chuyển sr-only chứ không xóa.
- ✅ **H5. Thẻ ôn điền-chữ-khuyết cho câu nhớ severity** — ĐÃ LÀM (khối
  21.17): trường `alsoAsk` cho phép MỘT thẻ có nhiều cách hỏi cùng một
  mặt sau, xoay vòng theo bậc SM-2 + số lần quên (engine không random).
  Thẻ severity M20 có 3 cách hỏi: xuôi → điền chỗ khuyết → hỏi ngược
  theo số mức. Mặt sau đánh số lại 0-7 để cách hỏi nào cũng trả lời được
  bằng đúng nó.
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
