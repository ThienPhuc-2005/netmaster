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
- ✅ **F7. Mở app bằng phần nội dung ĐÃ VỀ** (ý sinh trong lúc làm L1) —
  ĐÃ LÀM (khối 21.49): bỏ `Promise.all` ôm trọn 21 gói, kéo từng gói rời
  nhau rồi lấy **khúc đầu liền mạch**. Đây là cách gỡ TẬN GỐC L1: lưới đỡ
  của khối trước chỉ đỡ cho người rơi, còn đây là bỏ hẳn cái hố — người
  đứng ở module 2 không còn phải chờ gói của module 21.
  Ba điều rút ra, cái thứ nhất suýt thành lỗi mất dữ liệu:
  **dọn thẻ mồ côi phải hỏi `noiDungDayDu()` trước** — hàm đó XOÁ HẲN thẻ
  khỏi hộp, chạy nó trên khúc nội dung cụt là đọc "gói chưa tải về" thành
  "khái niệm đã bị bỏ" rồi xoá sạch lịch ôn của nửa khóa sau, chỉ vì một
  lần rớt mạng.
  **Phải CẮT tại chỗ đứt, không được giữ gói nằm sau nó**: chuỗi mở khóa
  đọc một DÃY và mở theo từng cặp liền kề, nên dãy [1,2,3,5,6] bị đọc
  thành "5 đứng ngay sau 3" — đậu module 3 là module 5 mở ra, tức thủng
  cổng mastery. Cắt đi không lấy mất của người học thứ gì, vì chính cổng
  mastery vốn đã chặn không cho học tới đó.
  **"Module cuối khóa" cũng phải hỏi `noiDungDayDu()`**: `at(-1)` của một
  khúc cụt là cuối KHÚC, không phải cuối khóa — thiếu điều kiện này thì
  người mất mạng giữa chừng bị app chúc mừng "khép lại cả khóa học".
- ✅ **F8. Màn tốt nghiệp tự kiểm trước khi nói về cả khóa** (ý sinh trong
  lúc làm F7) — ĐÃ LÀM (khối 21.50): đây là chỗ CUỐI CÙNG còn đo bằng
  toàn bộ lộ trình mà F7 chưa với tới. Hai đường rò, cùng một gốc "module
  cuối của khúc cụt bị đọc thành module cuối khóa":
  **mốc tốt nghiệp bịa ra** — người mới tải 3 chủ đề đầu rồi đậu chủ đề 3
  là chạm ngay mốc "tốt nghiệp nhập môn"; và **giấy chứng nhận in sai** —
  tờ PNG tải về được sẽ ghi "3/3 module" thay vì "3/21", mà giấy đã nằm
  trong máy người ta thì gỡ lại không được nữa.
  Chữa: `milestones()` trả RỖNG khi nội dung chưa đủ (mọi cửa vào màn tốt
  nghiệp tự đóng theo), còn ai gõ thẳng URL thì màn nói rõ "chưa soát được
  cả chặng đường" kèm nút tải nốt.
  Điều đắt nhất khi làm: **chưa đủ nội dung thì KHÔNG được đoán về phía
  nào cả**. Không chúc mừng đã đành, nhưng cũng không được rơi vào màn
  "mốc này chưa mở" có sẵn — người đã tốt nghiệp thật mà hôm nay mạng yếu
  sẽ đọc đúng câu phủ nhận công sức của họ. Màn này chỉ nói cái đang thật:
  chưa kiểm được.

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
- ✅ **K4. Đồ thị nếp học BIẾN MẤT đúng lúc nó đáng nói nhất** — ĐÃ DỌN
  (khối 21.47): người ĐÃ TỪNG học mà tám tuần đều trống thì đồ thị vẫn
  hiện, kèm câu nói thật "tám tuần gần đây bạn chưa ngồi buổi nào". Người
  mới tinh vẫn ẩn như cũ. Ghi chú cũ: (NHỎ). Mọi
  hoạt động nằm ngoài 8 tuần → cả 8 cột bằng 0 → component tự ẩn ("chưa
  kể được câu chuyện nào"). Nhưng với người vừa quay lại, tám cột trống
  CHÍNH LÀ câu chuyện: bạn đã nghỉ tám tuần. Luật "tuần nghỉ vẫn có
  vạch" nên nới tới cả trường hợp mọi tuần đều nghỉ.
- ✅ **K5. Module đậu bằng thi vượt: bản đồ chặng nói "CHƯA MỞ"** — ĐÃ DỌN
  (khối 21.47): thêm trạng thái chặng thứ tư "chưa học" (không ổ khóa) cho
  module ĐÃ ĐẬU — ở đó không có gì bị khóa cả. Module còn khóa thì vẫn là
  "chưa mở", vì ở đó ổ khóa nói đúng. Ghi chú cũ: (NHỎ) — ngay dưới huy hiệu "Đã đạt · 92%". Cùng họ với J6 vừa
  dọn: thẻ nói hai điều ngược nhau vì hai nguồn khác nhau (đậu đọc từ
  masteryScores, chặng đọc từ completedLessons).
- ✅ **L-mở-đầu** — xem mục L ngay dưới: lượt rà soát thứ ba đi vào ba màn
  HIẾM GẶP mà hai lượt trước không bước qua.
- ✅ **K6. Người đã đi hết khóa không còn việc gì để làm** — ĐÃ DỌN (khối
  21.47): hết bài và hết thẻ ôn thì thẻ Hôm nay chỉ đường sang phòng khám
  và drill — hai sân vốn đã mở mà thẻ này chưa từng nhắc. Cả hai không
  cộng XP, không đụng lịch ôn, nên mời ở đây không nới luật nào. Ghi chú cũ: (NHỎ). Hết thẻ
  đến hạn là thẻ Hôm nay nói "mai quay lại nhé" — với người còn bài để
  học thì đúng, với người đã tốt nghiệp thì đó là ngõ cụt mỗi ngày.
  Phòng khám (13 ca luyện tự do) và hai drill vẫn mở, nhưng thẻ Hôm nay
  không hề nhắc tới chúng.

## L. Rà soát BA MÀN HIẾM GẶP (08-12)

Hai lượt trước đi theo NGƯỜI: đường xuôi (mục J) rồi đường ngược (mục K).
Lượt này đi theo MÀN — ba màn hiếm tới mức chưa lượt nào bước vào, mà cả
ba đều rơi đúng lúc người học đang yếu thế nhất: vừa trượt bài thi, vừa
mất dữ liệu, vừa mất mạng. Cả ba phát hiện đều đã CHỮA trong cùng khối
21.48.

- ✅ **L1. Nội dung kéo hụt → app đứng ở MÀN TRẮNG câm, vĩnh viễn** (NẶNG)
  — ĐÃ CHỮA (khối 21.48). `AppGate` chờ `primeModules()` kéo đủ 21 chunk
  rồi mới mở khung app, nhưng KHÔNG ai bắt nhánh promise hụt: cổng đứng
  nguyên ở `return null`, tải lại vẫn trắng, không một chữ nào nói vì sao.
  Cùng họ J1/K1 — app không sập, nhưng cũng không đi được đâu.
  Chuyện đời thường chứ không hiếm như tưởng: chính
  `scripts/pwa-plugin.mjs` cache phần nội dung theo kiểu CỐ GẮNG
  (`Promise.allSettled`, hỏng file nào bỏ file đó) trong khi `AppGate`
  lại ĐÒI đủ — cài PWA lúc mạng chập chờn là đủ dựng ra cảnh này.
  Chữa: màn riêng nói thật + nút Thử lại gọi `primeModules()` một lượt
  mới (không tải lại trang — mất mạng thì tải lại còn phải trông vào
  service worker dựng lại vỏ app). Màn này cố ý KHÔNG mời sang Hồ sơ như
  màn lỗi hệ thống: mọi trang đều gọi `loadModules()` đồng bộ, mời sang
  đó là mời thẳng vào một màn lỗi khác.
- ✅ **L2. Nhập file sao lưu ghi đè sạch tiến độ mà KHÔNG cất bản đang
  có** (TRUNG BÌNH-NẶNG) — ĐÃ CHỮA (khối 21.48). Trong cùng một khung ở
  trang Hồ sơ có hai nút cùng ghi đè trọn tiến độ; nút "Lùi về bản này"
  cất bản hiện tại trước và còn hứa hẳn ra trong lời xác nhận, nút "Nhập
  từ file" thì không làm gì cả — dù nó mới là nút dễ chọn nhầm hơn (file
  ba tháng trước và file hôm qua trông y hệt nhau trong hộp thoại chọn
  file). Mất bằng chính thao tác đi cứu dữ liệu là kiểu mất tệ nhất.
  Chữa: thêm lý do chụp thứ tư `truoc-nhap` + hàm chung `chupTruocGhiDe`,
  và lời xác nhận nói ra lưới đỡ đó.
- ✅ **L3. Màn TRƯỢT bài thi nói một giọng cho mọi điểm số** (TRUNG BÌNH)
  — ĐÃ CHỮA (khối 21.48). Đo thật trên browser: thi vượt module 2, sai cả
  8 câu, màn kết quả ghi **"Được 0% — gần lắm rồi."** An ủi bằng một câu
  không đúng sự thật thì lần sau người học không tin câu nào nữa (họ
  J5/J6 — thanh tiến độ nói dối ở hai đầu). Kèm hai vết cùng màn: nút đặc
  luôn là "Thi lại ngay" trong khi mọi dòng phía trên đều bảo "mở lại bài
  dạy phần này" (chữ nói một đằng, nút mời một nẻo), và lời dặn chung in
  lại dưới TỪNG câu sai — 8 câu sai thì 6 dòng y hệt nhau, che mất mấy
  dòng thật sự có tin.

## M. Chủ dự án dùng thật rồi báo về (08-12)

- ✅ **M1. Sơ đồ lab trong bài thi bị bóp còn 270px** — ĐÃ CHỮA (khối
  21.51). Màn thi bó mọi dạng câu vào cột chữ 512px, kể cả sơ đồ lab vốn
  cần tối thiểu 560px: trên màn 1280px chỉ thấy 1 trong 4 thiết bị. Điều
  làm nó trốn được lâu: **cùng câu lab ấy trong BÀI HỌC thì bình thường**
  (bài học không bó cột), nên lỗi chỉ lộ ra khi đi thi thật.
  Nhân đó lộ thêm một chỗ hụt sẵn ở CẢ hai nơi: hai cột phòng lab chia
  2fr/1fr + sàn 280px ra đúng 536px — hụt 24px, tức sơ đồ lúc nào cũng
  phải cuộn ngang trên desktop dù cuộn ngang chỉ định dành cho màn dưới
  768px.
- ✅ **M2. Chỗ xem "những câu hay quên"** — ĐÃ LÀM (khối 21.51): mục
  "Thứ bạn hay quên" ở trang Hồ sơ, đọc `lapses` của SM-2.
  **Không trùng với "chỗ hay vấp" đã có**: vấp đếm số lần thử sai LÚC
  ĐANG HỌC BÀI (kiến thức chưa vào), còn cái này đếm số lần đã học xong,
  tưởng nhớ rồi, để vài ngày lại quên. Thứ hai mới là thứ đáng đem đi dạy
  lại theo cách khác — nó nói rằng cách dạy hiện tại CÓ VÀO nhưng KHÔNG
  BÁM. Con số ấy có sẵn từ ngày đầu mà suốt tới nay chỉ dùng để nói một
  câu giữa phiên ôn.
  Hai quyết định đáng nhớ: **ngưỡng 2 lần** (quên một lần là chuyện
  thường của trí nhớ — cả cơ chế ôn ngắt quãng dựng lên là để đón đúng cú
  quên đó), và **mục này hiện CẢ KHI TRỐNG**, khác mọi mục cùng trang.
  Các mục kia tự ẩn khi chưa có dữ liệu, và chính vì thế người đi tìm
  không thấy nó ở đâu rồi tưởng app không có — đúng chuyện đã xảy ra.
- ✅ **M3. Nút "luyện lại đúng mấy thứ hay quên"** (ý sinh khi làm M2) —
  ĐÃ LÀM (khối 21.52): mục "Thứ bạn hay quên" có nút mở thẳng một phiên
  luyện quanh đúng những thứ ấy, dùng lại nguyên màn luyện của "chỗ hay
  vấp" với nguồn đề thứ hai.
  Ba điều rút ra: **thẻ ôn không mang theo câu hỏi để luyện** — nó chỉ có
  mặt trước/mặt sau, nên đề phải lấy từ bài tập của BÀI đã dạy khái niệm
  đó, và đó là xấp xỉ cần khai chứ không nên giấu (một bài dạy vài khái
  niệm nên phiên chạm cả hàng xóm); **một màn hai nguồn tốt hơn hai màn**
  vì nhịp luyện và luật không-XP giống hệt nhau; và **nhãn phải theo đúng
  con số của nguồn** — "từng quên N lần" chứ không mượn "từng vấp N lần",
  hai con số đo hai chuyện khác nhau.
- ✅ **M4. Thẻ Hôm nay biết món cứng đầu đến hạn** (ý sinh khi làm M3) —
  ĐÃ LÀM (khối 21.53): dòng "ôn tập đến hạn" nói thêm mấy thẻ trong đó là
  thứ hay quên. Nó đổi cách đọc con số bên cạnh — 8 thẻ mà ba món cứng
  đầu thì buổi ôn nặng khác hẳn 8 thẻ thường.
  **Giọng là CƠ HỘI, không phải cảnh cáo**: đây đúng là lúc đáng gặp lại
  chúng nhất (ôn ngắt quãng bắt đúng lúc sắp quên mới bám), nên câu chữ
  nói ra cái lợi chứ không kể tội. Dùng CHUNG ngưỡng 2 lần với mục "thứ
  bạn hay quên" — hai chỗ lệch nhau thì người học đếm được sự mâu thuẫn.

## N. Ý còn chờ duyệt (08-12)

Sinh ra trong lúc làm khối 21.49-21.53, chưa ý nào được gọi tên.

- ✅ **N1. Nút "tải nốt nội dung" nên nói đang tải tới đâu** — ĐÃ LÀM (khối 21.56): tầng nạp ghi từng gói vào kho ngay khi nó về, nút hiện "Đang tải… 12/21". Ghi chú ý gốc: Hiện chỉ có
  "Đang tải…" im lặng; với mạng yếu thì vài chục giây câm khó phân biệt
  với treo. Hiện "đã về 15/21" thì đỡ hơn nhiều.
- ✅ **N2. Tự thử tải lại khi mạng vừa có lại** — ĐÃ LÀM (khối 21.56). Điều đắt nhất khi làm: **người bấm thì tải lại luôn, máy tự làm thì phải hỏi** — máy tự tải lại trang là giật trang khỏi tay người đang đọc dở. Ngoại lệ: màn mất mạng thì tự thử lại thẳng, ở đó không có gì để giật. Ghi chú ý gốc: Trình duyệt có báo sự kiện
  online; bắt người học nhớ bấm là bắt họ làm việc của máy.
- ✅ **N3. Test quét mã nguồn tìm chỗ đọc "toàn bộ khóa học" mà quên tự
  kiểm** — ĐÃ LÀM (khối 21.57), và nó tìm ra một lỗi thật ngay lượt đầu:
  dải đường đi lấy số chủ đề đã tải làm tổng nên nói "đã đậu 3 trên 12".
  Bài học khi làm: **bản đầu của phép quét tự vô hiệu hóa** — nó tha cả
  file chỉ vì chữ `tongSoModule` xuất hiện trong CHÚ THÍCH, nên thử lại
  đúng cái lỗi nó vừa tìm ra thì vẫn xanh. Phải bỏ comment trước khi soi.
  Ghi chú ý gốc: Khối 21.50 lộ ra một luật chung: hễ thêm chỗ nào suy từ cả lộ
  trình (`loadModules().at(-1)`, `.length` làm tổng số) thì chỗ đó phải
  hỏi `noiDungDayDu()` trước. Một test quét sẽ bắt được người sau quên.
- ✅ **N4. Trang `/design` bày trọn 8 dạng câu ở CẢ HAI khung** — ĐÃ LÀM
  (khối 21.55). Việc thật hóa ra KHÔNG phải dựng trang bày, mà là **rút
  luật bề rộng thành một hàm chung cho hai trang thật** rồi mới bày nó:
  một trang `/design` tự gõ lại chuỗi lớp thì nó trôi khỏi thực tế lúc nào
  không hay, và chứng minh được đúng con số không. Kèm test đi qua 8 dạng
  × 2 khung. Ghi chú ý gốc: (bài học và
  bài thi). Lỗi sơ đồ lab méo (M1) sống lâu được đúng vì cùng một câu
  hiển thị khác nhau ở hai nơi mà không chỗ nào bày cạnh nhau để so.
- ✅ **N5. Ưu tiên câu trúng đích trong phiên "luyện thứ hay quên"** — ĐÃ
  LÀM (khối 21.58): thêm trường `conceptId` tùy chọn cho câu tập, gắn 77
  thẻ, engine ưu tiên câu trúng khái niệm bị quên.
  **Đo trước khi làm mới thấy tầm ăn thua thật**: trung bình 1,87 câu/bài
  nên chỉ 43/108 bài là lọc đổi được gì. Vẫn đáng làm, nhưng không phải
  cuộc cách mạng như tên ý nghe.
  Hai điều rút ra: **bỏ trống là một lựa chọn hợp lệ** (9 câu bắc cầu hai
  khái niệm, gán bừa là nói sai về chính câu đó), và **cổng chất lượng
  phải chặn thẻ trỏ ra ngoài bài** — thẻ sai còn tệ hơn không khai.
  Ghi chú ý gốc: Hiện
  lấy trọn bài tập của bài nguồn; nếu sau này nội dung gắn thẻ khái niệm
  cho từng câu thì lọc được đúng câu dạy khái niệm bị quên.
- ✅ **N6. Sau phiên luyện mà VẪN sai đúng thứ đó thì app hỏi thẳng "chỗ
  này giải thích chưa lọt?"** — ĐÃ LÀM (khối 21.54, persist v8 → v9). Hỏi
  đúng lúc vừa trả lời chưa đúng trong phiên luyện; sổ RIÊNG, không trộn
  với sổ khiếu nại chấm; đọc lại ở trang Hồ sơ và đi theo file sao lưu.
  Ghi chú ý gốc: và ghi vào một cuốn sổ riêng — không trộn
  với sổ "mình nghĩ câu này đúng" (sổ đó là khiếu nại CHẤM, còn đây là
  góp ý về CÁCH DẠY). Đây là vòng khép kín cho đúng thứ chủ dự án muốn:
  họ thấy chỗ khó rồi bảo người soạn dạy lại. Cái giá: thêm một trường
  persist → bump version + một bậc migrate + fixture.

## O. Rà soát MÀN HẸP — đi bằng điện thoại 375px (08-12)

Ba lượt trước đi theo NGƯỜI (đường xuôi J, đường ngược K) và theo MÀN
HIẾM (L), đều trên màn rộng. Lượt này đi bằng điện thoại, vì mọi bề mặt
NẶNG của app (sơ đồ lab, bốn terminal, cung điện, bảng VLSM, trang Hồ sơ
vừa dài thêm ba mục) đều dồn về đó mà chưa ai đi trọn.
Kết quả: 3 phát hiện, cả ba đã chữa trong cùng khối 21.59.

- ✅ **O1. Nút chỉ-là-chữ chỉ cao 16px, và một cái trong đó XOÁ dữ liệu** —
  ĐÃ CHỮA. Đo thật: "Mở lại bài" 56×16, "Bỏ dòng này" 73×16, "Xem lại"
  56×16 — dưới mức tối thiểu 24px của WCAG 2.5.8. Cái đáng sợ không phải
  khó bấm: ở trang Hồ sơ hai nút ấy nằm CẠNH NHAU trong một dòng, một cái
  mở bài còn một cái xoá dòng, nên bấm trượt là mất dữ liệu.
  Chữa bằng một lớp dùng chung: nới vùng chạm bằng padding rồi kéo lại
  bằng margin âm — chữ đứng nguyên chỗ, chỉ vùng nhắm to ra, không xô
  lệch một pixel bố cục nào.
- ✅ **O2. Bảng VLSM: cuộn sang phải là mất tên phòng** — ĐÃ CHỮA. Bảng
  rộng 480px trong khung 343px, nên cuộn tới ô Prefix thì cột "Phòng ban
  1" trôi khỏi màn (đo được: right = −7). Đang điền số cho một phòng mà
  không thấy phòng nào — trong khi cả bài VLSM là khớp cỡ với ĐÚNG phòng.
  Cột đầu giờ dính lại ở mép trái.
- ✅ **O3. Trên điện thoại chỉ cấu hình được thiết bị bằng cách chạm vào
  sơ đồ rộng hơn màn hình** — ĐÃ CHỮA. Bảng Cấu hình chỉ nói "chọn một
  thiết bị trên sơ đồ" rồi để trống, mà dưới 768px sơ đồ rộng 575px trong
  màn 375px. Nặng hơn: **sổ kỹ thuật đang tự trấn an** rằng "mọi thao tác
  vẫn làm trọn được ở bảng cấu hình bên dưới" — câu đó chỉ đúng SAU khi
  đã chọn được thiết bị. Giờ bảng tự liệt kê thiết bị, chọn ngay tại chỗ.

## P. Rà soát BÀN PHÍM + TRÌNH ĐỌC MÀN HÌNH (08-12)

Lượt rà soát thứ năm, đi bằng phím Tab và bằng cây trợ năng thay vì bằng
mắt. Kết quả: 2 phát hiện (đã chữa ở khối 21.60) — và nhiều thứ HOÁ RA
ĐÃ ĐÚNG SẴN, ghi lại để lượt sau khỏi soi lại: cổng trong phòng lab đều
là nút thật có nhãn mô tả ("PC-A · eth0 — nối tới Switch-1"), phản hồi
chấm bài nằm trong vùng `role="status"`, tiêu đề không nhảy bậc, mọi
nút/link đều có tên đọc được, và CSS có sẵn luật `:focus-visible` toàn
cục.

- ✅ **P1. 18 link trên trang Học đọc y hệt nhau** — ĐÃ CHỮA (khối 21.60).
  Đo thật: 18 cửa "Mình biết phần này rồi — thi vượt luôn", 4 nút "Bắt
  đầu", 3 link "Xem lại", tất cả không mang tên chủ đề hay tên bài. Người
  dùng trình đọc màn hình gọi danh sách link ra thì nghe 18 lần cùng một
  câu. **App đã tự đặt ra luật này từ trước** ở mục "chỗ hay vấp" ("tựa
  bài đi vào tên đọc được") — chỉ là chưa áp cho chính trang được mở
  nhiều nhất.
- ✅ **P2. Đổi trang thì focus rơi về `<body>`** — ĐÃ CHỮA (khối 21.60).
  Bấm "Bắt đầu bài mới" → sang trang bài học mà `activeElement` là body:
  trình đọc màn hình không đọc một chữ nào về trang vừa mở, người dùng
  bàn phím phải Tab lại từ đầu qua 8 nút khung. App đã áp đúng luật này ở
  CHIỀU NGƯỢC từ lâu (quay về trang Học thì focus nhảy vào đúng thẻ) —
  chỉ thiếu ở chiều đi.
  Điều tinh nhất khi chữa: chỉ nhận focus KHI CHƯA AI NHẬN. Effect của
  con chạy trước effect của cha, nên không có vế đó thì khung app cướp
  mất focus mà trang con vừa nhắm — tức là chữa lỗi này bằng cách phá một
  hành vi đã chạy tốt.

**Một báo động giả, ghi lại để khỏi lặp**: phép đo đầu tiên báo "không
nút nào có viền focus". Sai — gọi `.focus()` bằng script KHÔNG kích hoạt
`:focus-visible` trong Chromium, nên đo kiểu đó luôn ra kết quả rỗng. Luật
CSS vẫn ở đó và vẫn chạy.


## Q. Lỗ hổng kiến thức — soát toàn bộ 696 câu hỏi (08-15)

Sinh từ lượt soát 21 module bằng 21 người đọc + 4 lăng kính riêng (nền tảng
nghề · đời thường · ngộ nhận kinh điển · độ dốc lộ trình), gộp lại và khử trùng
lặp. Đây là KIẾN THỨC CÒN THIẾU — phần câu hỏi hỏng nằm ở `SOAT-CAU-HOI.md`,
không trộn vào đây.

Mức: **phải có** = học xong app mà thiếu nó là thiếu thật · **nên có** = làm app
tròn hơn · **có thì tốt**.

- ☐ **Q1. Đặt tên cho cái thang đã dạy: mô hình phân tầng (tầng 2, tầng 3, tầng 7) và phân biệt khung với gói tin** — *PHẢI CÓ*.
  Hai lăng kính độc lập cùng chỉ vào đây. App đã dạy đủ mọi bậc của cái thang này — MAC ở dưới, IP ở giữa, port ở trên, khám bệnh từ dây lên — nhưng chưa một lần đặt tên, chữ OSI không có ở đâu trong 21 module. Ra ngoài thì cả nghề nói bằng số tầng, phỏng vấn nhập môn hỏi câu này đầu tiên, mở giáo trình nào ra cũng vấp ngay chương 1. Ngay trong app cũng đã lỗi nhịp: tên Module 17 ghi "bảo mật lớp 2" mà chưa chỗ nào định nghĩa lớp 2. Đi kèm là chữ "khung": từ Module 14 trở đi nó xuất hiện hàng chục lần mỗi module, còn Module 1 đến 13 chỉ biết mỗi "gói tin" — người tự học sẽ đinh ninh hai thứ là một.
  **Đặt ở đâu:** Một bài xen ngay sau Module 4, lúc người học vừa có đủ MAC, IP, port, switch, router để dán nhãn; khái niệm khung/gói gắn vào m4-bai-5 (chỗ app đã dạy "MAC đổi từng chặng, IP giữ nguyên" mà chưa đặt tên cho hai lớp vỏ). Rồi Module 11 gọi thang khám bằng số tầng, Module 14 và 17 dùng lại đúng chữ đó.
- ☐ **Q2. Đọc trọn một khối subnet: bảng quy đổi /25 đến /30, địa chỉ broadcast, dải máy dùng được, số máy = cỡ khối trừ 2** — *PHẢI CÓ*.
  Sáu nguồn khác nhau cùng chỉ vào chỗ này (ba lỗ hổng của Module 3, hai của Module 13, một của Module 21). Đây là lỗ hổng duy nhất đang làm HỎNG một tính năng đang chạy: màn luyện subnet của chính Module 3 trộn 6 loại đề, 4 loại hỏi thứ module chưa dạy chữ nào, mà bài 5 lại dặn ghé luyện mỗi ngày. Mẹo tính nhanh của bài bắt đầu bằng octet của mask nhưng bài không dạy cách có được octet đó, nên gặp /28 hay /29 là đứng hình ngay bước một. Module 13 thì mặc định người học đã biết "trừ 2 địa chỉ", và bài tổng duyệt Module 21 bắt gõ wildcard của /30 — con số người học gặp lần đầu ngay tại bài nộp.
  **Đặt ở đâu:** Bảng quy đổi đưa vào thân màn dạy CIDR của m3-bai-4 (không để trong ô Đào sâu). Thêm một màn dạy "đọc trọn một khối" vào cuối m3-bai-5 kèm một câu Thử tay tìm broadcast và một câu Nhớ lại đếm số máy. Thêm bậc /30 vào màn dạy cỡ khối của m13-bai-1.
- ☐ **Q3. Từ vựng đo mạng và ca bệnh "mạng chậm": băng thông, độ trễ, mất gói, jitter — và chuyện 100 Mbps không phải 100 MB mỗi giây** — *PHẢI CÓ*.
  Ba lăng kính cùng gọi tên, thêm một lăng kính nữa chỉ vào họ hàng gần của nó ("đầy vạch sóng mà không có Internet"). "Mạng chậm" là lời than phổ biến nhất ở mọi nhà và mọi văn phòng, mà học xong app người học không có một chữ nào để nói về nó: cả khóa không có khái niệm nào tên là băng thông hay độ trễ, dù Module 20 vẽ biểu đồ "45% băng thông" và Module 16 tính chi phí đường theo băng thông. Năm ca của phòng khám đều là bệnh chết hẳn, chưa ca nào chạm tới bệnh "tới mà ì". Hệ quả thật: người học không giải thích nổi vì sao gói 100 Mbps mà tải chỉ 12 MB/s, không biết đo tốc độ đẹp mà họp online vẫn giật là bệnh gì, nên phản xạ mãi là rút điện modem cắm lại rồi cầu may.
  **Đặt ở đâu:** Hai khái niệm mới (băng thông = ống rộng, độ trễ = ống dài) chen giữa m8-bai-2 và m8-bai-3, đúng lúc đang bàn tốc độ Wi-Fi và gói cước. Rồi một ca bệnh "không chết mà chậm" thêm vào cuối Module 11, và Module 20 dùng lại để con số baseline có đơn vị.
- ☐ **Q4. Tầng dây thật: cáp đồng và cáp quang, giới hạn 100 mét, tốc độ và duplex, PoE, đọc đèn cổng và đèn modem** — *PHẢI CÓ*.
  Ba nguồn cùng chỉ vào (hai lăng kính gọi tên "sợi dây thật", một chỉ riêng phần đèn modem). Module 11 dựng cả bài trên câu "khám từ tầng dây lên", nhưng sợi dây trong app chỉ có hai trạng thái: cắm hoặc tuột. Ngoài đời tầng thấp nhất hỏng tinh vi hơn nhiều và đó là nhóm sự cố chiếm nhiều ca trực nhất. Riêng phần đèn modem còn quyết định việc lớn nhất khi mất mạng — gọi tổng đài nhà mạng hay tự khám tiếp trong nhà — mà đây là phép chẩn đoán duy nhất người không rành máy tính cũng làm được; app hiện chỉ có đúng một câu bỏ lửng trong ô Đào sâu của m7-bai-4.
  **Đặt ở đâu:** Một bài mới trong Module 4, đặt trước bài switch (có dây rồi mới có thiết bị cắm vào). Phần đèn modem mở rộng câu Đào sâu đang bỏ lửng ở m7-bai-4 thành một màn dạy có khái niệm và thẻ ôn. Thêm một ca bệnh tầng thấp vào Module 11 (ping vẫn trả lời nhưng rớt gói và chậm).
- ☐ **Q5. HTTPS thật sự làm gì: chứng chỉ, ba kiểu lỗi chứng chỉ, mã đáp web — và luật "có ổ khóa chưa phải là an toàn"** — *PHẢI CÓ*.
  Hai lăng kính cùng chỉ vào. App cho nhớ port 443 và câu "HTTPS mã hóa" nhưng chưa nói chứng chỉ là gì, ai cấp, vì sao trình duyệt bôi đỏ. Trang lừa đảo cũng có ổ khóa vàng, mà người học vừa được dạy ba lớp khóa (WPA3, HTTPS, VPN) với cùng một thông điệp "khóa rồi thì người ngoài chỉ thấy chuỗi loạn xạ" — chưa lần nào nói mã hóa chỉ bảo đảm ĐƯỜNG ỐNG, không nói gì về NGƯỜI ở hai đầu ống. Đây cũng là mảnh còn thiếu để Zero Trust ở Module 10 và DoH ở Module 6 đứng vững. Thêm phần mã đáp (404, 403, 500, 301) để người học phân biệt được lỗi mạng với lỗi máy chủ.
  **Đặt ở đâu:** Một bài nối vào Module 6 (đã có DNS và DoH nên đúng mạch "hỏi ai và tin ai"), cộng một màn dạy "khóa và người" trong m8-bai-3 và một câu gọi lại ở m10-bai-4. Kèm một ca bệnh chứng chỉ ở Module 11, móc ngược về bài NTP ở Module 5 (lệch giờ làm chứng chỉ báo hết hạn oan).
- ☐ **Q6. Làm chủ mạng nhà: mở trang quản trị router, đổi mật khẩu admin mặc định, đọc danh sách thiết bị và ghim địa chỉ cho máy in, camera** — *PHẢI CÓ*.
  Ba nguồn cùng chỉ vào (hai lăng kính, cộng lỗ hổng "đặt trước địa chỉ theo MAC" của Module 18). App đã ba lần bảo người học làm việc TRONG trang quản trị router — chọn WPA3, khai port forwarding, tắt NAT của router thứ hai — mà chưa bài nào chỉ cách mở nó ra, dù con số Default Gateway trên tờ ipconfig chính là cửa vào. Mật khẩu admin mặc định in dưới đáy hộp là lỗ hổng nhà ở phổ biến hơn hẳn kiểu dò mật khẩu Wi-Fi mà app đã dạy rất kỹ: người học biết chống kẻ ngồi vỉa hè nhưng không biết cửa chính vẫn để admin/admin. Phần ghim địa chỉ theo MAC thì chữa đúng ca kinh điển của văn phòng nhỏ — máy in đổi địa chỉ sau mỗi lần cúp điện rồi cả phòng không in được — mà cả khóa chưa nhắc tới lần nào.
  **Đặt ở đâu:** Một bài mới chen giữa m7-bai-4 và m7-bai-5 (vừa vẽ xong sơ đồ nhà thì mở nắp hộp ra xem). Phần ghim địa chỉ nối vào m6-bai-5 (đọc tờ giấy thuê địa chỉ), móc ngược về ca trùng IP ở m11-bai-4.
- ☐ **Q7. Kênh Wi-Fi và nhà hàng xóm giẫm sóng, chỗ đặt router — và cho Wi-Fi quay lại phòng khám lẫn bài tổng duyệt** — *PHẢI CÓ*.
  Ba nguồn cùng chỉ vào. Chính m8-bai-1 tự hứa trong ô Đào sâu rằng "các nhà cạnh nhau dùng chung kênh sẽ giẫm sóng nhau" rồi không bao giờ quay lại: cả Module 8 không có khái niệm, câu hỏi hay thẻ ôn nào về kênh. Ở chung cư và nhà ống Việt Nam, hàng chục mạng chen nhau trên băng 2.4 GHz chính là lý do số một khiến Wi-Fi yếu dù điện thoại báo đầy vạch — người học hiện chỉ được dạy chọn băng tần nên sẽ đổi băng mãi mà bệnh vẫn còn. Nặng thêm: Wi-Fi dạy trọn ở Module 8 rồi tắt hẳn, cả 5 ca phòng khám đều là máy cắm dây và chi nhánh của bài tổng duyệt không có lấy một điểm phát sóng, trong khi ngoài đời gần như mọi máy người dùng nối bằng Wi-Fi.
  **Đặt ở đâu:** Một bài mới ngay sau m8-bai-1 (cùng nói về sóng, tăng đúng một bậc). Thêm một ca Wi-Fi vào Module 11 (laptop đủ vạch mà không vào được máy chủ, máy cắm dây cùng phòng thì vào ngon) và một dòng "khách dùng Wi-Fi" vào tờ yêu cầu của chặng 1 Module 21.
- ☐ **Q8. CGNAT: địa chỉ ở cổng WAN chưa chắc là của riêng nhà mình, và cách tự kiểm nhà có mấy lớp cổng** — *PHẢI CÓ*.
  Ba nguồn cùng chỉ vào (một lăng kính, hai lỗ hổng của Module 7). Nguy hiểm ở chỗ app đang dạy ngược: m7-bai-1 chốt "địa chỉ công cộng nằm ở cổng WAN của router nhà bạn" và gạt SAI phương án "của nhà cung cấp dịch vụ" — trong khi phần lớn thuê bao cáp quang hộ gia đình ở Việt Nam nằm sau lớp NAT của nhà mạng, tức phương án bị gạt mới đúng với họ. Bài 5 có dạy hai lớp cổng nhưng chỉ lớp do người dùng tự cắm, và cách gỡ hoàn toàn vô hiệu với lớp nằm bên nhà mạng. Kết quả: người học khai port forwarding đúng từng dòng, camera vẫn đen sì, và tin rằng mình làm sai — loay hoay đúng cái cảnh mà thư cuối Module 7 hứa sẽ gỡ. Kèm theo là bước chẩn đoán còn thiếu: đọc địa chỉ ở cổng WAN rồi so với con số hiện ra khi tra "IP của tôi".
  **Đặt ở đâu:** Một bài mới cuối Module 7, ngay sau bài gỡ hai lớp cổng — giữ nguyên mạch, chỉ đẩy lớp thứ hai ra ngoài nhà; gọi lại bài địa chỉ riêng/công cộng của m3-bai-3.
- ☐ **Q9. Địa chỉ MAC là con số card mạng tự khai — nên lọc MAC và port security chặn được ai, không chặn được ai** — *PHẢI CÓ*.
  Chính app đang gieo ngộ nhận này: m3-bai-1 chốt MAC "dập chết từ nhà máy, không đổi" ở màn dạy, ở tổng kết và cả thẻ ôn, chỉ một câu trong ô Đào sâu nhắc điện thoại tự tạo MAC ngẫu nhiên rồi bỏ đó. Đến m17-bai-4 app dựng port security và còn khuyên chặn ARP spoofing bằng nó, mà không một lần nói MAC là con số card mạng tự điền vào mỗi khung, hệ nào cũng đổi được bằng một lệnh. Người học ra khỏi khóa sẽ tin lọc MAC là bảo mật thật, và không giải thích nổi hai chuyện gặp hằng tuần: điện thoại đời mới đổi MAC mỗi mạng làm cổng port security sập và làm trượt việc ghim địa chỉ theo MAC.
  **Đặt ở đâu:** Một màn dạy mới trong m17-bai-4 ngay sau khái niệm port security (đó là chỗ ngộ nhận gây hại nhất), kèm sửa một dòng tổng kết ở m3-bai-1 từ "dập trên card thì không đổi" thành "nhà máy ghi sẵn, nhưng là con số máy tự khai", và một câu Nhớ lại ở Module 17.
- ☐ **Q10. Bảng quy hoạch VLAN — dải nào ăn VLAN nào, gateway đặt ở đâu — và cách thứ hai để nối hai VLAN (switch layer 3, SVI)** — *nên có*.
  Hai lăng kính cùng chỉ vào. Module 13 cắt dải mà không nhắc chữ VLAN lần nào; Module 14 chia VLAN mà mọi sơ đồ vẫn để cả bốn máy chung một dải. Tới bài tổng duyệt Module 21 thì bảng ghép đã điền sẵn hộ và người học chỉ phải dựng trunk — nghĩa là module mang tên "Dựng mạng chi nhánh" bỏ qua đúng bước quy hoạch mà người mới hay sai nhất. Phần SVI thì là cách làm mà mạng doanh nghiệp thật gần như luôn dùng: mở cấu hình switch lõi ra là thấy một cổng ảo mang địa chỉ IP, đúng thứ người học vừa được dạy ngầm là "switch không có IP, không định tuyến" — nhìn switch lõi mà không hiểu nó đang làm gì thì dễ đi sửa nhầm sang router.
  **Đặt ở đâu:** Một bài chen giữa m14-bai-4 và m14-bai-5 cho phần điền bảng bốn cột (phòng, dải, số VLAN, địa chỉ gateway) kèm một lab tự đặt địa chỉ; và một bài thứ sáu của Module 14 ngay sau router-on-a-stick cho SVI, để hai cách làm cùng một việc đứng cạnh nhau.

## R. Việc còn treo sau lượt vá 08-15 (khối 21.63)

Chín việc người chữa cố ý KHÔNG tự làm vì vượt phạm vi một lượt vá — mỗi cái
cần một khối riêng. Chi tiết đầy đủ ở `SOAT-CAU-HOI.md`.

- ☐ **R1. phụ — bản render duyệt nội dung** — Người phản biện chỉ ra nguyên nhân gốc khiến lượt soát trước nhìn nhầm: bản in ra để duyệt nội dung không hiện các nhóm "cận đúng", nên người soát tưởng câu hỏi đang đánh sai trắng người học trong khi thực ra đã có lời đón tử tế. Nên bổ sung một dòng "Cận đúng: …" vào bản render duyệt để lượt soát sau không lặp lại lỗi này.
  *Vì sao để lại:* Phải sửa script trong src/, ngoài phạm vi lượt này (chỉ được đụng đúng một file nội dung).
- ☐ **R2. drill-subnet: qBroadcast, qHostRange, qHostCount, qPrefixForHosts** — Đã xác nhận phát hiện này ĐÚNG: module 3 khai màn luyện subnet là màn luyện riêng của mình và bài 5 dặn người học ghé luyện mỗi ngày, nhưng màn luyện trộn 6 loại đề, trong đó 4 loại hỏi thứ module 3 chưa dạy một chữ nào (địa chỉ broadcast, host đầu/cuối dùng được, số host dùng được, chọn prefix cho N host). Tra cả file nội dung module 3 không có lấy một lần chữ "broadcast".
  *Vì sao để lại:* Vượt quyền của lượt này. Muốn chữa thì phải chọn một trong hai đường, đường nào cũng đụng thứ tôi bị cấm: (a) dạy thêm phần "đọc trọn một khối" — tức là thêm khái niệm mới và thêm màn dạy/câu hỏi mới, mà thêm khái niệm và thêm bài là việc phải xin duyệt riêng; hoặc (b) cắt màn luyện xuống còn 2 loại đề đã dạy — việc này nằm trong file máy móc của app (src/engine/subnet/drill.ts), lượt này tôi chỉ được sửa đúng file nội dung module 3. Đề nghị mở một khối riêng cho việc này; nó cũng gỡ nợ cho module 13 (bài VLSM đang mặc định người học biết luật trừ 2 địa chỉ).
- ☐ **R3. cổng chặn đề thi trùng câu trong bài (toàn app)** — Người phản biện đề xuất thêm một cổng kiểm tra tự động chặn việc đề thi chép lại quá nhiều câu trong bài, áp cho cả 21 module (module-7 và module-13 đang trùng 50%, module-16 47%, module-6 và module-14 42% — module-9 chỉ 25%, tức mức trung bình).
  *Vì sao để lại:* Việc này nằm ở phần mã kiểm tra chất lượng nội dung và ảnh hưởng cả 21 module, vượt ra ngoài phạm vi 'chỉ sửa một file module-9' của lượt này.
- ☐ **R4. hàng rào tự động (src/content/content.test.ts)** — Hai đề xuất siết luật chung cho MỌI module: (1) hàng rào chống "đáp án dài nhất là đáp án đúng" hiện chỉ soi đề thi mở khoá, chưa soi câu trong bài — nên module nào cũng có thể tái phạm; (2) hàng rào chống chấm oan câu phủ định hiện chỉ đối chiếu câu đầu của lời giải, nên bỏ sót các cách nói phủ định nằm trong thẻ khái niệm và phần tổng kết.
  *Vì sao để lại:* Nằm ngoài file nội dung của tôi — chạm vào là đụng mã nguồn app, phải là một khối riêng.
- ☐ **R5. m13-mt-4, m13-mt-5** — Hai câu thi này chép lại nguyên con số của câu người học vừa tự tay làm trong bài, cần đổi số để bắt tính lại: m13-mt-4 đổi thành 172.20.5.0/26 (đáp án 172.20.5.64), m13-mt-5 đổi thành 255.255.255.248 (đáp án 0.0.0.7 — cặp số này chưa xuất hiện chỗ nào trong module).
  *Vì sao để lại:* Đáp án của hai câu đang bị ghim cứng trong một file kiểm tra tự động của app (src/content/content.test.ts, dòng 831-832 chờ đúng '192.168.10.128' và '0.0.0.15'), mà lượt này tôi chỉ được đụng file nội dung module-13 — đổi số một mình sẽ làm test đỏ ngay. Cần một khối riêng sửa cả hai nơi cùng lúc.
- ☐ **R6. pool đề thi (câu mới về sub-interface)** — Đề nghị sau này thêm một câu vào bộ đề thi cuối module hỏi về sub-interface, để khái niệm lõi của bài 5 có mặt thật trong đề thi chứ không chỉ nằm ở bước luyện tập. Lượt này chưa làm.
  *Vì sao để lại:* Người phản biện đã nói rõ đây là MỞ RỘNG phạm vi đo, không phải sửa lỗi: bộ 12 câu đề thi hiện không có câu nào hỏi chữ sub-interface. Thêm câu mới vào đề thi làm đổi bộ đề nên xin để thành một khối riêng, chủ dự án duyệt rồi làm.
- ☐ **R7. m18-mt-7** — Đề thi của module đang nghiêng về APIPA (3 câu) trong khi không câu nào bắt người học NÊU RA hai cách dựng máy DHCP dự phòng đúng — dù đó là tên của cả bài 3. Mình đề xuất thêm một câu thứ 15 vào đề thi, bản nháp đã sẵn: "Máy DHCP duy nhất sắp phải bảo trì hằng tháng. Cách dựng máy thứ hai nào đứng vững?" — đáp án là chia kho tách bạch (80/20) hoặc bắt cặp dùng chung một cuốn sổ có đồng bộ, hai mồi nhử là "đặt máy hai trả lời chậm hơn" và "cho máy hai chỉ chạy những ngày máy một nghỉ". Không được rút câu APIPA để đổi chỗ — APIPA là manh mối chẩn đoán dùng lại ở hai bài và một ca bệnh.
  *Vì sao để lại:* Người phản biện đã hạ phát hiện này xuống mức "gợi ý cân đối, không phải lỗi", và mình kiểm lại thấy đúng: câu m18-mt-7 hoàn toàn lành, còn cách dựng dự phòng ĐÚNG thì bài 3 đã bắt nhớ lại tới ba lần (câu Thử tay hỏi thẳng, phần tự giải thích, thẻ ôn). Vì không phải lỗi bắt buộc chữa, và thêm câu vào đề thi là quyết định về nội dung, mình để chủ dự án gật rồi làm khối riêng thay vì tự thêm.
- ☐ **R8. m20-b2-prac-ps, m20-b3-prac-ps, m20-mt-ps1, m20-mt-ps2** — Phần chắc ăn của phát hiện này (thêm khóa lọc hẹp cho hai bài terminal trong bài học) tôi đã làm ở trên. Phần còn lại — dựng lại kịch bản cho câu terminal thứ hai của đề thi để nó thôi là bản sao của bài 3 (hiện cùng file, cùng đích, cùng lệnh, chỉ khác mốc giờ) — phải soạn mới một file log hơn 150 dòng có cảnh báo giả xen kẽ, đồng bộ với khóa lọc mới. Đó là một khối soạn nội dung riêng, không phải sửa chữ, nên tôi không tự làm trong lượt này.
  *Vì sao để lại:* Phải soạn mới một file nhật ký hơn 150 dòng cho câu thi, kèm chỉnh lại đích và khóa lọc — là việc soạn nội dung mới chứ không phải chữa chữ, và làm ẩu sẽ phá luật "log đề thi phải dài như thật" đang có test canh.
- ☐ **R9. m21-b2-prac-cli** — Để nguyên, không đụng vào. Phát hiện nói bài nộp chặng 2 nên bắt người học tự tra bảng trunk (bậc một của thang kiểm chứng), giống như bài chặng 3 đã bắt tra bảng luật chặn. Việc này cần một lượt riêng vì nó đổi điều kiện đậu của bài lab chứ không phải đổi câu văn, và phải sửa ba chỗ cùng lúc mới không hỏng.
  *Vì sao để lại:* Tôi đã mở file kiểm chứng và phát hiện đúng: màn dạy chốt thang kiểm chứng ba bậc (xem bảng trunk → xem bảng láng giềng OSPF ra Full → ping xuyên site) nhưng bài nộp chặng 2 chỉ bắt bậc hai và bậc ba. Không tự làm vì ba lý do: (1) lượt này chỉ được sửa chữ, mà đây là sửa mục tiêu chấm — tức là đổi cái người học phải làm mới được qua bài; (2) làm đúng phải đụng ba chỗ liền nhau: thêm hai mục tiêu "đã xem bảng trunk" trên hai switch, thêm dòng lệnh đó vào lời giải mẫu (bộ kiểm tra nội dung bắt lời giải mẫu phải tự đạt đủ mọi mục tiêu, thiếu là báo lỗi), và sửa đề bài để nói rõ phải kiểm chứng trunk trước khi nộp, kẻo người học trượt mà không hiểu vì sao; (3) chính người phản biện đã hạ mức xuống thấp — đây là chuyện cho nếp chấm nhất quán, không phải lỗ thủng chặn điểm. Riêng nửa sau của đề xuất (thêm câu nhớ lại "bằng chứng tầng 2 là lệnh nào") thì người phản biện đã bác vì trùng gần nguyên văn câu đã có ở Module 14 — tôi đồng ý và không thêm.
