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
- ✅ **F3. Ảnh chụp tiến độ tự động** — ĐÃ LÀM (khối 21.38): mỗi ngày mở
  app lên học cất một bản, và luôn cất một bản NGAY TRƯỚC khi cửa migrate
  viết đè; giữ 3 bản, trang Hồ sơ có nút lùi về từng bản. Ba luật đắt nhất
  không được nới: **bản trước-nâng-cấp không bị cắt khỏi trần** (nếu chính
  migrate làm hỏng thì mọi bản sau đều chép lại cái hỏng), **hết chỗ
  localStorage thì bỏ ảnh chụp chứ không để tiến độ thật chết theo**, và
  **lùi về một bản thì cất bản đang có trước đã**. Ý gốc nói "định kỳ" —
  chốt là MỖI NGÀY chứ không mỗi giờ: ba bản cách nhau ba tiếng thì cả ba
  cùng chứa một lỗi vừa xảy ra sáng nay.
- ✅ **F4. Lời nhắc nghỉ tự lui** — ĐÃ LÀM (khối 21.38): hiện 45 giây rồi
  tự đi, nút tắt vẫn còn. Đếm bằng thời gian TRANG ĐANG HIỆN chứ không
  phải thời gian trôi — người nghe rủ mà đứng dậy thật thì tab nằm ở nền,
  đếm tiếp là lời nhắc tan đúng lúc không ai nhìn.
- ✅ **F6. Quãng ngồi liền dài nhất trong tuần** — ĐÃ LÀM (khối 21.40):
  một dòng trong thẻ nếp học, "tuần này 34 phút · tuần trước 52 phút".
  Đồ thị 8 tuần đo bề RỘNG, dòng này đo bề SÂU của một lần ngồi.
  Phần khó là GIỌNG chứ không phải phép đo: app vừa rủ người ta nghỉ sau
  25 phút thì không thể quay lại vỗ tay vì họ ngồi liền 90 phút — nên nó
  là dữ liệu, không phải thành tích, và quá 50 phút thì nói thẳng cái giá.
  Hai luật kỹ thuật: **đo tới lần chạm cuối** (bỏ đi mà để tab mở thì kỷ
  lục không phình) và **tắt lời nhắc nghỉ vẫn đo** (tắt lời nhắc không
  phải tắt cái đồng hồ).
- ✅ **F5. Rút gọn nhãn CamelCase cho bản vẽ** — ĐÃ LÀM (khối 21.38):
  "PC-KinhDoanh" → "PC-KD". Bước này đứng TRƯỚC bước cắt vì nó giữ được cả
  hai đầu của cái tên; nó cũng là đường thoát cho cặp PC-/SW- cùng phòng ở
  lab M21 (bỏ tiền tố là hai nhãn trùng nhau). 57 nhãn thật: còn dài 6 →
  còn 2, hai cái còn lại rút là trùng nên script in "sửa tay".

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
- ✅ **I2. Chủ đề vấp đẩy thẻ ôn lên sớm** — ĐÃ LÀM (khối 21.36). Đường nối
  giữa "chỗ vấp" và "thẻ ôn" hóa ra là BÀI HỌC, không phải chủ đề: chỗ vấp
  ghi theo từng CÂU, thẻ ôn khóa theo KHÁI NIỆM, hai hệ không map thẳng —
  nhưng câu nào cũng nằm trong một bài, và bài nào cũng khai nó dạy khái
  niệm gì. Cố ý KHÔNG dùng `hintTopic` (trường tùy chọn, câu không khai thì
  rơi ra ngoài). **Vấp chỉ là TIE-BREAK, không phải khóa chính**: thẻ trễ
  hạn lâu là thẻ sắp quên hẳn, cho "hay vấp" chen lên trước nó là đổi thứ
  đang mất lấy thứ mới hơi lung lay. Đứng ở tie-break là vừa đủ để quyết ai
  lọt vào phiên 15 thẻ.
- ✅ **I3. So với chính mình tháng trước** — ĐÃ LÀM (khối 21.39): mỗi
  tháng, lần đầu mở trang Hồ sơ thì app cất một mốc nhỏ của bảng phân
  tích; từ tháng sau, mục mới nói "Câu gõ tay 75% → 13% · đã lên". Đúng
  như đã ghi lượt trước, **không ké được F3** — ảnh chụp tiến độ là 3 bản
  sao đầy đủ xoay vòng, không phải chuỗi số theo tháng — nên ý này có sổ
  số liệu riêng (`latCatThang`, persist v7).
  Quyết định đắt nhất: **so TỈ LỆ tại hai thời điểm, không lấy HIỆU hai
  mốc**. Học lại một bài đã xong thì bộ đếm vấp của bài đó bị dựng mới,
  nên phép trừ ra số ÂM ngay lần đầu người học ôn lại bài cũ — bảng thống
  kê ra số âm thì mất sạch niềm tin đúng lúc nó đang định khen họ.
- ✅ **I4. Ảo giác quen mặt vào hồ sơ lỗi** — ĐÃ LÀM (khối 21.36): mục "Thấy
  quen mà chưa thuộc" ở trang Hồ sơ. Phải bump persist v5 → v6 vì đúng như
  ý gốc nói, dữ liệu tự chấm trước đây tan theo phiên. Chỉ lưu nấc
  `overconfident` — nói "chịu" rồi vẫn nhớ ra là chuyện tốt, "lơ mơ" luôn
  là khớp. **Ngưỡng 2 lần**: một lần hụt là chuyện thường của trí nhớ, đem
  ra bảo người học "bạn đang tự lừa mình" là kết luận vội trên một mẫu.

## H. Ý sinh ra trong lúc làm Phần D-E (08-09)

- ✅ **H1. Giấy chứng nhận tải được** — ĐÃ LÀM (khối 21.6): PNG
  1200×850 vẽ bằng canvas, nền sáng cố định (để in), tên người học là ô
  nhập tại chỗ KHÔNG lưu vào store.
- ✅ **H2. "Về đích sau X ngày"** — ĐÃ LÀM (khối 21.6): thẻ số ngày +
  một dòng kể từ ngày nào tới ngày nào. Có thêm con số ý gốc chưa nghĩ
  tới: **số ngày THẬT SỰ ngồi học** — 75 ngày mà 19 ngày học là chuyện
  bình thường, nói ra để người học khỏi tự trách quãng nghỉ.
- ✅ **H3. Ca bệnh sửa lai** — ĐÃ LÀM (khối 21.41, chủ dự án duyệt phá
  mốc "2 cách sửa" của phòng khám): kiểu ca thứ ba `edit-and-act` — nửa
  bệnh trong sơ đồ tự tay sửa ở phòng lab, nửa ngoài mô hình chọn hành
  động, chấm ba phần. Ca thật là `m21-b4-prac-ca` của capstone: mở
  allowed list trunk cho VLAN 10 bằng tay + nhờ quản trị DNS thêm bản ghi
  còn thiếu.
  Ba điều rút ra khi làm: **cái giá của mốc bị phá trả bằng một hàm chung**
  (`phanMang()` — chỗ nào cần "nửa mạng" thì hỏi nó, nhờ vậy mọi cổng chất
  lượng cũ tự động áp cho ca mới); **triệu chứng khai trong ca phải là nửa
  MẠNG** (schema đòi lời giải làm triệu chứng hết, mà nửa ngoài mô hình
  thì mô phỏng không với tới); và **triệu chứng xanh phải kèm câu "mới là
  nửa mạng thôi"** — không thì màu xanh thành lời hứa sai ngay giữa ca dạy
  "đếm đủ dấu chân mới đếm đủ con".
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
- ✅ **H7. Bài đọc-số-thật cho scope DHCP** — ĐÃ LÀM (khối 21.37): thêm bài
  tập gõ tay thứ ba vào bước Thử tay của `m18-bai-2`, đúng bảng số ý gốc
  nêu. Đáp án **tối đa 2 ngày**: máy rời mạng chiều thứ sáu thì lease 2 ngày
  hết hạn chiều chủ nhật, kịp trả suất trước giờ làm; để 3 ngày là mãi chiều
  thứ hai mới hết. Lời giải nói thêm cái GIÁ của việc rút lease (máy phải
  xin gia hạn dày hơn) — rút lease không phải phép màu miễn phí.
  Bài này là bài TÍNH đầu tiên của M18: hai bài cũ đều hỏi nhận biết.
- ✅ **H8. `Get-ADUser -Properties MemberOf`** — ĐÃ LÀM (khối 21.42): mở
  chiều tra ngược từ phía NGƯỜI ("anh này thuộc nhóm nào"), bổ cho
  `Get-ADGroupMember` vốn chỉ hỏi được từ phía nhóm. Đúng như ý gốc nói,
  mốc đọc lại thành **11 cmdlet + 1 tham số** chứ không phá mốc.
  Hai điều rút ra: **chỉ kể nhóm TRỰC TIẾP** (như AD thật — và đó là bài
  học: muốn biết quyền chảy tới đâu vẫn phải đi tiếp một nhịp, in hộ cả
  chuỗi lồng nhau là làm hộ bài); và **phải khai trong Get-Help** — tham
  số không có trong help là tham số không ai biết mà gõ.

## J. Rà soát TRẢI NGHIỆM trên browser thật (08-12)

Một lượt đi bộ qua app bằng mắt người: người học mới tinh (onboarding →
trang Học), người học giữa khóa (12/21 module, 7 thẻ đến hạn), phiên ôn
trọn vẹn, một bài học đủ 6 bước có terminal PowerShell, cửa thi, màn tốt
nghiệp, trang Hồ sơ, phòng khám, drill — trên cả nền tối/sáng và màn
hẹp 375px. Không soi NỘI DUNG (hội đồng đã soi), chỉ soi thứ người học
CHẠM vào.

- ✅ **J1. Thẻ ôn hỏng = app kẹt vòng lặp chết, không đường thoát** — ĐÃ
  CHỮA (khối 21.43), làm đủ cả ba lớp: phiên ôn (và mọi chỗ đọc thẻ) BỎ
  QUA thẻ hỏng thay vì ném; màn lỗi mang theo hai đường thoát (mở thẳng
  Hồ sơ + lùi thẳng về bản tự lưu) và được khai làm `errorElement` của
  router — chỗ trước đây nuốt cả 4 tab; cửa nhập backup kiểm TỪNG thẻ.
  Ghi chú cũ giữ lại để nhớ vì sao:
  (NẶNG). Một thẻ thiếu trường (`createdOn`) làm `buildReviewSession`
  ném lỗi. Vì luật "mở app là ôn trước", app tự vào Ôn tập → sập → màn
  lỗi thay CẢ khung app (mất luôn 4 tab) → bấm "Tải lại" là quay đúng
  vào vòng đó. Người học không cách nào tới được trang Hồ sơ, nên **ảnh
  chụp tự động (F3) lẫn nút xuất/nhập file đều vô dụng đúng lúc cần
  nhất**. Ba lớp chữa, làm được từng lớp một: (a) phiên ôn BỎ QUA thẻ
  hỏng thay vì ném; (b) màn lỗi giữ một đường tới Hồ sơ / một nút "lùi
  về bản tự lưu"; (c) cửa nhập backup kiểm hình dạng từng THẺ, không chỉ
  đếm mảng.
- ✅ **J2. Nộp bài xong không thấy phản hồi** — ĐÃ CHỮA (khối 21.44):
  vùng phản hồi tự cuộn tới và dời focus vào chính nó mỗi lần nộp, chỉ
  cuộn khi nó thật sự ngoài tầm mắt. Đo lại trên browser: trước 649–872px
  (dưới mép màn 694px), nay 594–640px và focus đứng đúng vùng vừa hiện;
  nộp lần hai lần ba (gợi ý dài ra) vẫn nằm trọn trong tầm mắt.
  Ghi chú cũ: Ở bài nặng
  (PowerShell/lab/CLI/phòng khám) khung phản hồi nằm DƯỚI mép màn hình
  — đo thật: khung ở 649–872px trong khi màn cao 694px. App không cuộn
  tới và không dời focus, nên bấm "Nộp bài" xong màn hình trông y hệt
  lúc chưa bấm. Dự án đã có luật "cuộn xong phải dời focus" cho các cửa
  quay lại trang Học — chưa áp cho chỗ này.
- ✅ **J3. Ô gõ lệnh chỉ rộng 186/375px trên điện thoại** — ĐÃ CHỮA (khối
  21.44): hàng nhập cho phép xuống dòng, nút "Chạy" rớt xuống hàng dưới,
  ô gõ rộng 259px (thấy ~39 chữ thay vì ~28). Sửa ở cả BỐN terminal vì
  chúng là một khuôn. Ghi chú cũ: (TRUNG BÌNH,
  màn hẹp). Dấu nhắc `PS C:\>` và nút "Chạy" ăn hết chiều ngang, đến
  placeholder cũng bị cắt giữa chừng. Đây là bề mặt GÕ NHIỀU NHẤT của
  app mà lại hẹp nhất trên màn nhỏ nhất; lệnh thật dài gấp ba lần ô.
- ✅ **J4. Hai cửa "thi vượt" giống hệt nhau trên cùng một thẻ module** —
  ĐÃ DỌN (khối 21.45): giữ chip trên đầu thẻ (ý "mình biết phần này rồi"
  nảy ra lúc đọc TÊN module, không phải sau khi đọc hết danh sách bài),
  bỏ hàng trùng ở cuối; câu đầy đủ vẫn còn trong aria-label. Ghi chú cũ:
  (NHỎ): nút góc trên phải và dòng cuối thẻ trỏ cùng một đường
  (`/kiem-tra/<module>?vuot=1`), nhân với 21 thẻ.
- ✅ **J5 + J6. Thanh tiến độ nói dối ở hai đầu** — ĐÃ DỌN (khối 21.45)
  bằng MỘT luật: thanh chỉ hiện ở module ĐANG MỞ. Module khóa không có gì
  để đo; module đã đậu thì huy hiệu "Đã đạt · N%" mới là câu trả lời (đậu
  bằng thi vượt không cộng XP nên thanh gần rỗng cãi nhau với huy hiệu).
  Ghi chú cũ: (NHỎ): mốc
  khởi đầu 15% sinh ra cho module ĐANG học; ở 9 thẻ khóa liên tiếp nó
  thành 9 lần cùng một con số không mang tin gì.
- ✅ **J6** — dọn CHUNG với J5 ở khối 21.45 (xem ngay trên). Câu hỏi "thanh
  đo XP hay đo đường đã đi" trả lời được mà không phải đổi phép đo: thanh
  vẫn đo XP, chỉ thôi xuất hiện ở nơi XP không nói lên điều gì.
- ✅ **J7. Hai con số của phiên ôn cãi nhau** — ĐÃ DỌN (khối 21.45): tiêu
  đề nói con số CỦA PHIÊN (khớp bộ đếm, cùng tăng khi có thẻ học lại), và
  khi nợ vượt trần 15 thẻ thì nói thêm một câu về phần để dành phiên sau
  — khớp nhau mà không giấu nợ. Ghi chú cũ: (NHỎ): tiêu đề "Bạn có 6
  thẻ đến hạn" trong khi bộ đếm ngay dưới ghi "Thẻ 2/8" (8 = có thẻ học
  lại). Cả hai đều đúng nhưng đọc cùng lúc thì như app tự mâu thuẫn.
- ✅ **J8. Màn cuối phiên ôn: việc kế tiếp là một DÒNG CHỮ** — ĐÃ DỌN
  (khối 21.45): "Sang học bài mới" thành nút đặc màu nhấn như mọi màn
  đóng khác. Ghi chú cũ: (NHỎ) —
  "Sang học bài mới" chỉ là link màu nhấn, trong khi mọi màn đóng khác
  của app đều đưa một nút đặc. Đây là màn peak-end của phiên ôn.

## K. Rà soát ĐƯỜNG NGƯỢC — người quay lại sau khi nghỉ dài (08-12)

Lượt rà soát trước đi đường xuôi (người mới → giữa khóa). Lượt này đi
đường ngược: người bỏ học ba tháng quay lại (nợ 40 thẻ, chuỗi đứt, hết
đóng băng), người có nội dung ĐỔI dưới chân trong lúc vắng mặt, và người
đã đi hết khóa quay lại xem còn gì để làm.

- ✅ **K1. Thẻ ôn trỏ khái niệm KHÔNG CÒN → phiên ôn ra MÀN TRỐNG, kẹt
  câm** — ĐÃ CHỮA (khối 21.46) đủ ba lớp: dọn thẻ mồ côi khỏi HỘP ngay
  khi nội dung nạp xong (nó tính vào nợ nên phải bỏ hẳn, không chỉ bỏ
  khỏi phiên) · phiên ôn lọc thêm lần nữa · hộp toàn thẻ mồ côi thì nói
  tử tế "hôm nay không có thẻ đến hạn" thay vì trang trắng. Ghi chú cũ: (NẶNG — nặng ngang J1, và dễ xảy ra hơn nhiều). Nội dung cập nhật
  mà một khái niệm đổi id hoặc bị bỏ là thẻ cũ trong hộp thành mồ côi.
  `ReviewPage` gặp thẻ mồ côi thì `return null` — chú thích trong code
  ghi "bỏ qua", nhưng code KHÔNG bỏ qua: nó không dựng gì cả, phiên đứng
  yên tại đúng thẻ đó. Đo thật: mở /on-tap ra trang trắng (chỉ còn 4
  tab), tải lại vẫn trắng.
  **Vòng kẹt kín**: nợ > 30 thẻ nên bài mới bị khóa, màn chặn chỉ có một
  nút "Vào ôn tập", mà ôn tập thì trắng. Người học không sập app (khác
  J1) nhưng cũng không đi được đâu — và không có một chữ nào nói vì sao.
  Ba lớp chữa gợi ý: (a) dựng phiên thì LỌC thẻ không tra ra mặt (tầng
  UI có nội dung trong tay); (b) dọn thẻ mồ côi khỏi hộp sau khi nội
  dung prime xong, kêu một dòng `console.warn` như lối J1; (c) nếu vẫn
  còn thẻ không dựng được thì hiện một câu tử tế thay vì trang trắng.
- ✅ **K2. Số "đóng băng còn lại" ở Hồ sơ là con số của THÁNG CŨ** — ĐÃ
  CHỮA (khối 21.46): thêm `freezesAvailable` thuần-đọc, Hồ sơ hiện số
  của HÔM NAY. Cố ý KHÔNG hồi quỹ lúc đọc: để việc XEM đổi tiến độ là
  phá nguyên tắc 5. Ghi chú cũ: (TRUNG
  BÌNH). Quỹ đóng băng nạp lại theo tháng, nhưng chỉ nạp khi người học
  LÀM được việc gì đó. Người vắng ba tháng mở Hồ sơ ra thấy "0 lượt" —
  đúng lúc họ cần biết mình còn lưới đỡ nào nhất. Chưa kể ngay dưới có
  câu "mỗi tháng bạn có 2 lượt đóng băng tự động", nên hai dòng cạnh
  nhau nói ngược nhau.
- ✅ **K3. App không nhận ra người vừa vắng mặt lâu** — ĐÃ CHỮA (khối
  21.46): vắng từ 14 ngày trở lên thì thẻ Hôm nay chào một câu có SỐ
  NGÀY thật, đặt TRƯỚC danh sách việc vì nó đổi cách đọc mọi dòng bên
  dưới. Giọng là đón chứ không trách, và người mới tinh không bị chào
  nhầm. Ghi chú cũ: (TRUNG BÌNH). Quay
  lại sau 94 ngày, câu đầu tiên đọc được vẫn là "não sắp quên đúng lịch
  rồi" — đúng với người nghỉ hai ngày, nhẹ hều với người nghỉ ba tháng.
  Không một chỗ nào trong app nói "lâu rồi không gặp" hay hạ kỳ vọng
  xuống. Cả `streak` về 0 cũng im lặng: không lời nào giải thích.
- ☐ **K4. Đồ thị nếp học BIẾN MẤT đúng lúc nó đáng nói nhất** (NHỎ). Mọi
  hoạt động nằm ngoài 8 tuần → cả 8 cột bằng 0 → component tự ẩn ("chưa
  kể được câu chuyện nào"). Nhưng với người vừa quay lại, tám cột trống
  CHÍNH LÀ câu chuyện: bạn đã nghỉ tám tuần. Luật "tuần nghỉ vẫn có
  vạch" nên nới tới cả trường hợp mọi tuần đều nghỉ.
- ☐ **K5. Module đậu bằng thi vượt: bản đồ chặng nói "CHƯA MỞ" ở mọi
  chặng** (NHỎ) — ngay dưới huy hiệu "Đã đạt · 92%". Cùng họ với J6 vừa
  dọn: thẻ nói hai điều ngược nhau vì hai nguồn khác nhau (đậu đọc từ
  masteryScores, chặng đọc từ completedLessons).
- ☐ **K6. Người đã đi hết khóa không còn việc gì để làm** (NHỎ). Hết thẻ
  đến hạn là thẻ Hôm nay nói "mai quay lại nhé" — với người còn bài để
  học thì đúng, với người đã tốt nghiệp thì đó là ngõ cụt mỗi ngày.
  Phòng khám (13 ca luyện tự do) và hai drill vẫn mở, nhưng thẻ Hôm nay
  không hề nhắc tới chúng.
