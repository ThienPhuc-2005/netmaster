# Biên bản Hội đồng đánh giá NetMaster

Ngày họp: 2026-08-07 · Thời điểm: Phase 1+2+3 vừa khép, hết phạm vi spec.

**Cách làm việc:** 14 chuyên gia (agent) chấm độc lập theo mảng, mỗi phát
hiện bắt buộc có bằng chứng trỏ được (file:dòng hoặc hồ sơ hiện trường đi
app thật trên browser). 12 phát hiện nặng nhất qua vòng **phản biện chéo**:
một agent hoài nghi mở đúng file ra tái lập — không tái lập được là loại,
thổi phồng là hạ cấp. Kết quả phản biện: 12/12 xác nhận có thật, 2 bị hạ
cấp P1→P2, 0 bị loại. Chủ tịch tự kiểm mẫu thêm 3 phát hiện (gồm P0 duy
nhất) trước khi ghi biên bản — cả 3 tái lập đúng từng con số.

Ký hiệu: `✓PB` = đã qua phản biện chéo; `○` = mới một ghế nêu, bằng chứng
có trỏ file nhưng chưa kiểm chéo độc lập. Công sửa: S dưới 1 giờ, M một
buổi, L nhiều buổi. **Hội đồng chỉ đánh giá — chưa sửa gì; mục nào đụng
hành vi nhìn thấy được đều cần chủ dự án duyệt trước (luật CLAUDE.md).**

---

## 1. Tóm tắt điều hành

**Điểm trung bình 14 mảng: 7.6/10.** Không mảng nào dưới 6.5. Xương sống
sư phạm và kỷ luật kỹ thuật thuộc hàng hiếm thấy ở app tự làm; các vấn đề
tập trung ở ba cụm: giá trị của con số 85%, độ bền dữ liệu người học, và
hiệu năng tải trang.

### 5 điểm mạnh nhất (giữ bằng mọi giá)

1. **Cơ chế học làm đúng BẢN CHẤT, không chỉ đúng tên — và bị khóa bằng
   test.** Retrieval ép bằng máy trạng thái (xem lời giải xong vẫn phải
   tự gõ lại), productive failure phải đứng TRƯỚC màn dạy, fading không
   được lùi, cung điện phủ 100% phòng trong bài thi — tất cả là test đỏ
   nếu ai phá (content.test.ts).
2. **Kiến thức mạng chính xác hiếm thấy cho tài liệu nhập môn.** Các bẫy
   kinh điển (172.32 là public, MAC đổi từng chặng còn IP giữ nguyên,
   DORA Request phải broadcast, TTL 128−n, Enforced xuyên Block
   Inheritance) đều đúng, và engine mô phỏng THI HÀNH đúng điều được dạy.
3. **Gamification có đạo đức thật.** Streak freeze tự động không mua bán,
   reset không tịch thu lượt; mọi ngả farm XP bị chặn có chủ đích; phản
   hồi sai không chữ "SAI", không màu đỏ, ba tầng ấm áp.
4. **Kỷ luật kỹ thuật:** engine thuần kiểm bằng grep chứ không bằng lời
   hứa; không một mã hex lọt ngoài tokens.css; i18n test ba lớp; thiết bị
   lab là `<button>` thật có aria-label bị test khóa.
5. **Riêng tư tuyệt đối + tiếng Việt chất lượng.** Không một byte rời
   máy (grep xác nhận 0 network call); giọng "bạn/mình" giữ đều 12 module,
   bản EN là transcreation chứ không dịch máy.

### 5 vấn đề lớn nhất

1. **[P0] Hình bắt tay ba bước vẽ SAI chiều ACK** — hình được spec chỉ
   đích danh vì "hay bị nhớ nhầm thứ tự" lại đang dạy nhầm thứ tự.
   Sửa 2 dòng SVG. *(mục 4, việc số 1)*
2. **Con số 85% đang đo yếu hơn nó tuyên bố.** Ba lỗ cộng hưởng: rớt thi
   → app in nguyên văn đáp án → thi lại NGUYÊN đề nguyên thứ tự; 35/38
   câu MCQ đáp án là lựa chọn dài nhất + 28/38 nằm ở vị trí đầu + không
   xáo; đề 7-9 câu nên "85%" thực chất là "sai tối đa 1 câu".
3. **Két dữ liệu người học không có khóa dự phòng.** localStorage không
   migrate (bump version = xóa trắng), không xuất/nhập backup (Clear
   browsing data = mất hàng chục giờ học), hai cửa sổ app ghi đè nhau
   im lặng, bài dở gặp nội dung cập nhật có thể trắng màn không lưới đỡ.
4. **Chiến lược tải trang gần như chưa tồn tại.** 1.27MB một cục không
   code-split, trong đó 668KB là nội dung cả 12 module mà người ở bài 1
   cũng phải tải + trả CPU validate zod mỗi lần mở app.
5. **Ba lời hứa cảm xúc chưa trả:** huy hiệu hứa đích danh nhưng không
   tồn tại; streak freeze cứu chuỗi trong im lặng (lời kể đã thiết kế ở
   engine mà store vứt đi); màn Kết thiếu "animation ăn mừng ngắn" spec
   đòi — tắt âm là peak-end phẳng lì.

---

## 2. Bảng điểm 14 mảng

| # | Mảng | Điểm | Một câu phán quyết |
|---|------|:----:|--------------------|
| 1 | Sư phạm & khoa học học tập | 8.0 | Đúng bản chất và bị khóa bằng test; ba khe hở: thi lại thuộc đáp án, thẻ quên không được nhớ lại trong phiên, XP thưởng lời tự khai |
| 2 | Độ chính xác kỹ thuật mạng | 8.5 | Chính xác hiếm thấy, engine khớp lời dạy; gợn ở fidelity terminal ảo (nặng nhất: quy ước cột OU của Import-Csv) |
| 3 | Tâm lý học động lực | 8.0 | Gamification có đạo đức thật; nợ ba lời hứa cảm xúc (huy hiệu, freeze im lặng, peak-end) |
| 4 | Ngôn ngữ & microcopy | 8.0 | Văn giáo dục tiếng Việt tốt hiếm thấy, không giọng máy; gợn nhất quán thuật ngữ port/cổng |
| 5 | Màu sắc & hệ thị giác | 8.0 | Kỷ luật token tuyệt đối, contrast có test thật; lớp opacity composite lọt lưới đo, tông-theo-Phần chết lâm sàng |
| 6 | Hình khái niệm & dual coding | 7.0 | Công trình dual coding có kỷ luật; nhưng chính hình spec chỉ đích danh vẽ sai chiều (P0) |
| 7 | UX & luồng tương tác | 8.0 | Mọi cổng chặn có lối thoát chủ đích; hai chỗ đau: ngõ cụt phiên ôn khi còn nợ, bài dở lab/PS mất trắng khi rời trang |
| 8 | Onboarding & phiên đầu | 8.0 | Aha 60 giây có thật, đứng trước mọi thứ; ngày quay lại thứ 2 bị đẩy vào Ôn tập không lời giải thích |
| 9 | Khả năng tiếp cận (a11y) | 8.0 | Nền vững hiếm thấy; kênh phản hồi chấm bài chưa chắc đến tai screen reader (live region mount kèm nội dung) |
| 10 | Kiến trúc & chất lượng mã | 8.0 | Phân tầng thật, schema gate hàng hiếm; chỗ đau duy nhất: câu chuyện TIẾN HÓA dữ liệu persist chưa được xây |
| 11 | Hiệu năng | 6.5 | Runtime sạch nhưng chiến lược tải gần như chưa tồn tại — máy yếu mạng chậm đau đầu tiên |
| 12 | Giá trị đo lường (assessment) | 6.5 | Máy chấm đạt chuẩn; giá trị con số 85% bị xói bởi cue MCQ + nguyên đề khi thi lại + đề ngắn |
| 13 | i18n & song ngữ | 7.5 | Chrome gần chuẩn ngành; chiến lược dịch NỘI DUNG mới tồn tại trên giấy (LText.en không ai đọc) |
| 14 | Riêng tư, dữ liệu & độ bền | 6.5 | Riêng tư tuyệt đối; nhưng độ bền dựa hoàn toàn vào việc "không có gì bất thường xảy ra" |

---

## 3. Chi tiết từng ghế

### Ghế 1 — Sư phạm & khoa học học tập (8.0)

Điểm mạnh nổi bật: retrieval ép bằng máy trạng thái không có hàm skip
(lessonMachine.ts:315-355); SM-2 trung thành bản chất spacing hơn cả nghĩa
đen spec — hoãn ôn đầu 1 ngày tránh "nhớ giả", interval tính từ ngày ôn
thật (sm2.ts:26-53); bất biến sư phạm khóa bằng test trên nội dung thật.

- `✓PB` **[P1/M] Cổng mastery vượt được bằng thuộc lòng đáp án của chính
  đề thi.** Đề cố định, rớt → in nguyên văn đáp án từng câu sai → nút thi
  lại ngay với nguyên đề nguyên thứ tự (ModuleTestPage.tsx:67,167-183).
  Phản biện còn phát hiện thêm: MCQ cũng KHÔNG xáo lựa chọn nên thuộc
  được theo vị trí. → Chọn ít nhất 2/3 lớp: xáo thứ tự câu mỗi lượt; khi
  rớt chỉ hiện Ý CẦN ÔN (không hiện nguyên văn đáp án); bắt một hoạt động
  ôn lại trước khi nút thi lại sáng. *(cần duyệt — đụng mastery gate)*
- `✓PB` **[P1/M] Thẻ ôn trả lời "quên" không bao giờ được nhớ lại thành
  công trong phiên** — cố nhớ thất bại → đọc đáp án thụ động → hết
  (ReviewPage.tsx:124-136). Mọi SRS nghiêm túc có bước relearning. → Requeue
  thẻ quên về cuối phiên tới khi tự nhớ được một lần; chỉ lượt chấm ĐẦU ghi
  vào SM-2. *(cần duyệt — đụng hành vi phiên ôn spec 2.2)*
- `✓PB→hạ P2` **[P2/S] XP +2 gắn vào nút tự chấm "Mình nhớ"** (progress.ts:
  329-331). Phản biện hạ cấp: 2 XP vô hình lúc bấm, không vào moduleXp,
  microcopy đã xin trung thực; chiều ngược (thưởng theo thẻ) cũng có đường
  farm riêng — trade-off thật, đáng đưa chủ dự án quyết chứ không hiển nhiên.
- `○` **[P2/M] SM-2 kịch trần 30 ngày vĩnh viễn** — không graduation, hết
  12 module gánh ~4-5 thẻ/ngày không đường thoát. → Đề xuất sửa SPEC: thêm
  bậc 60/120 hoặc "nghỉ hưu" thẻ. *(cần duyệt — đụng spec 2.2)*
- `○` **[P2/M] Cửa sổ flow 10 câu trộn mọi ngữ cảnh, vắt qua ranh giới
  module** — vừa đậu thi điểm cao thì câu ĐẦU module mới (kiến thức mới
  tinh) bị ép thành gõ tay (flow.ts:54-61). → Lọc cửa sổ theo ngữ cảnh
  bài học, reset khi sang module. *(cần duyệt — đụng flow engine)*

### Ghế 2 — Độ chính xác kỹ thuật mạng (8.5)

Điểm mạnh nổi bật: cặp "General failure" / "Destination host unreachable"
suy từ mô phỏng đúng hành vi Windows và bị test khóa; "MAC đổi từng chặng,
IP giữ nguyên" được engine THI HÀNH (simulate.ts:428-435); bẫy 172.32,
DORA broadcast, gia hạn 50% đều đúng chuẩn.

- `✓PB` **[P1/M] `Import-Csv | New-ADUser` với cột "OU" được dạy như
  PowerShell thật.** New-ADUser thật không có tham số -OU, không bind cột
  đó — ngoài đời lệnh chạy im lặng và user rơi vào CN=Users (lỗi âm thầm
  nguy hiểm nhất). Flashcard/hint/explain trình bày quy ước tự chế của
  engine như kiến thức chung (module-12.json:747,856; interpret.ts:293).
  → Hoặc đổi CSV mẫu sang cột Path chứa DN đầy đủ (khớp đời thật), hoặc
  thêm câu khai báo "cột OU là quy ước riêng của terminal này". *(cần
  duyệt — đụng nội dung M12)*
- `○` **[P2/S] New-ADUser ảo mặc định Enabled=True** — thật thì account
  KHÔNG mật khẩu bị tạo DISABLED. → Đổi default engine + một câu flashcard
  (kèm bài học bảo mật miễn phí).
- `○` **[P2/S] Lab "mạng nhà" cho IP private đi thẳng ra Internet không
  NAT** — nhật ký chặng (tải trọng sư phạm!) hiện 192.168.1.10 tới tận máy
  chủ ngoài, mâu thuẫn bài NAT cùng module. → Không cần thêm NAT (phạm vi
  đóng băng đúng); chỉ thêm một câu khai báo trong đề/lời giải lab.
- `○` **[P2/S] Ping unreachable thiếu prefix "Reply from <IP máy mình>:"**
  và đếm Lost=4 thay vì Received như Windows thật — mất luôn gotcha "0%
  loss mà vẫn không thông".
- `○` **[P2/S] Phòng 21 kể "băng chuyền chở thùng tệp"** — cổng 21 chỉ là
  kênh điều khiển FTP; dữ liệu đi 20/passive (chính là lý do FTP vỡ qua
  firewall — kiến thức M7 của app). → Một dòng deepDive.

### Ghế 3 — Tâm lý học động lực (8.0)

Điểm mạnh nổi bật: freeze tự tiêu không mua bán, reset GIỮ lượt còn lại
(chi tiết nhân đạo Duolingo không có); mọi ngả farm XP chặn có chủ đích
và app nói thật ("lần này không cộng XP, nhưng tay nghề thì có").

- `✓PB` **[P1/S] Đóng băng streak tiêu trong im lặng.** Engine trả
  freezesUsed/reset kèm chú thích "để UI kể chuyện tử tế" — store vứt cả
  hai cờ (progress.ts:160-161), không UI/chuỗi nào kể. Người học không
  biết mình vừa được cứu chuỗi; lượt cạn dần không ai báo; reset 30→1
  câm lặng. → Trả cờ lên caller + 2 chuỗi i18n + một banner nhỏ.
- `✓PB` **[P1/S] Lời hứa huy hiệu không thể thực hiện.** "Huy hiệu đầu
  tiên đang chờ: hoàn thành phần Nhớ lại đầu tiên" (vi.json:391) nhưng
  không tồn tại hệ huy hiệu nào — 100% người học kích hoạt điều kiện ngay
  bài 1 và hộp hứa trơ ra vĩnh viễn. Violated expectancy ở đúng app lấy
  động lực làm luận đề. → Sửa copy ngay (S); hệ huy hiệu thật trình duyệt
  sau. *(sửa copy: S; hệ huy hiệu: cần duyệt)*
- `✓PB` **[P1/M] Peak-end thiếu "animation ăn mừng ngắn" spec đòi** (spec
  dòng 45) — màn Kết chỉ có earcon + icon tĩnh; tắt âm/khiếm thính nhận
  đỉnh cảm xúc phẳng. Đây là sai lệch spec CHƯA TỪNG KHAI. → Animation CSS
  300-500ms tôn trọng reduced-motion.
- `○` **[P2/M] Kết thúc CẢ KHÓA chỉ là một dòng banner** giống mọi lần đậu
  thi — đỉnh self-efficacy lớn nhất đời người học được trao một dòng chữ.
  → Màn kết khóa riêng (nhìn lại hành trình + SM-2 vẫn tiếp tục). *(cần
  duyệt — màn hình mới)*
- `○` **[P2/M] Chế độ harder chấm nguyên văn chữ lựa chọn** — người giỏi gõ
  "IP" thay vì "địa chỉ IP" bị chấm sai, phần thưởng thành hình phạt.
  → Cho mcq khai `openAccepts` trong schema. *(cần duyệt — đụng schema)*

### Ghế 4 — Ngôn ngữ & microcopy tiếng Việt (8.0)

Điểm mạnh nổi bật: giọng "bạn/mình" giữ đều từ chrome tới Phần C, không
câu nào lộ cấu trúc Anh-dịch-Việt; 3 tầng phản hồi đúng spec 4.4; tên bài
toàn nhiệm-vụ-có-động-từ.

- `✓PB` **[P1/M] Thuật ngữ trôi "port" (M1) → "cổng" (M5-M12)**, trong khi
  "cổng" đồng thời là cổng VẬT LÝ switch ở M4 — hai khái niệm khác hẳn
  chung một chữ, vi phạm spec 4.4 (giữ thuật ngữ Anh sau lần giải nghĩa
  đầu). ~29 chỗ cần sửa. → Chốt quy ước: "port" cho TCP/UDP, "cổng" cho
  lỗ cắm vật lý; giữ nguyên accept-list. *(cần duyệt — đụng nội dung)*
- `○` **[P2/S] "Subnet mask" trôi thành "mặt nạ (mạng)" riêng ở M6** (3
  chỗ, có chỗ cụt còn "mặt nạ" trần).
- `○` **[P2/S] Ẩn dụ hỏi cưới DORA lệch giới một câu** — "đã đi lấy chồng
  nơi khác" trong khi người được giữ chỗ là các chàng trai (module-06:386).
- `○` **[P2/S] Ba chấm không thống nhất:** "..." ASCII ở M1-3+12, "…" ở
  M8-11 + toàn bộ vi.json.
- `○` **[P2/S] Accept lai nửa dấu:** "ben máy đích" (module-11:313).

### Ghế 5 — Màu sắc & hệ thị giác (8.0)

Điểm mạnh nổi bật: 0 mã hex lọt ngoài tokens.css (grep xác nhận); contrast
đo bằng công thức WCAG thật trên chính file nguồn, 2 theme + parity; light
theme là bản vẽ lại theo vai trò, không phải dịch vội.

- `✓PB` **[P1/S] `opacity-60` trên card module khóa làm chữ rớt AA** —
  ink-muted@60% = 2.6:1 light / 3.5:1 dark, và tokens.test chỉ đo token
  nguyên chất nên không bao giờ bắt được lớp composite (LearnPage.tsx:148).
  → Bỏ opacity cấp card, thể hiện khóa bằng token tường minh.
- `✓PB` **[P1/M] Cơ chế tông-theo-Phần (--part-accent) chết lâm sàng** —
  tokens.css định nghĩa + LearnPage gắn data-part, nhưng 0 consumer; lời
  hứa spec 4.1 "mỗi Phần một tông tạo cảm giác tiến trình" không thực thi.
  → Chọn 2-3 điểm chạm (chip bước, StageMap, viền card); thêm cặp
  part-x/panel vào test trước (đã đo hộ: đều đậu).
- `✓PB→hạ P2` **[P2/S] tokens.test thiếu cặp đang dùng thật** (accent/
  panel-hover ở nav active...) — hiện tất cả ĐANG đậu nên chỉ là lỗ lưới
  an toàn, không phải lỗi hiện hữu. → Thêm 6-8 cặp vào mảng PAIRS.
- `○` **[P2/S] Token --danger được test nhưng 0 consumer** — app chưa có
  bề mặt lỗi hệ thống nào (liên đới finding ErrorBoundary của ghế 10).
- `○` **[P2/S] PalaceMap phòng ngoài lộ trình 1.82:1 ở light** — trang trí
  nên WCAG cho phép, nhưng tòa nhà mất hình ở light theme.

### Ghế 6 — Hình khái niệm & dual coding (7.0)

Điểm mạnh nổi bật: registry cố tình KHÔNG có hình dự phòng + cổng chặn
test (thiếu hình là lỗi build); signaling/Von Restorff cài đúng có chủ
đích; CourseMap suy từ dữ liệu thật, "hình không thể nói dối tiến độ".

- `✓PB` **[P0/S] Handshake3Way vẽ SAI chiều ACK, mơ hồ chiều SYN-ACK.**
  ACK: path `M164 94 H56` + markerEnd → mũi tên TRỎ VÀO máy bạn, tức dạy
  "máy chủ gửi ACK" — ngược TCP thật; SYN-ACK hai đầu mũi tên không nói
  được chiều (ConceptVisual.tsx:616,623). Cùng hình đó SYN vẽ ĐÚNG chiều
  nên người học chắc chắn đọc mũi tên là chiều đi. Hình dùng thật ở M5
  (2 visualId), đúng chỗ spec ghi "hay bị nhớ nhầm thứ tự". Chủ tịch đã
  tự mở file xác nhận. → Đổi ACK thành `M56 94 H164`; SYN-ACK bỏ
  markerStart, path `M146 67 H74`. Von Restorff (khung + nét dày) còn
  nguyên. **Sửa 2 dòng — nên làm NGAY.**
- `○` **[P1/S] DnsResolver dùng đúng glyph của router** (vòng tròn + chữ
  thập) — gieo "resolver là một loại router" vào trí nhớ hình ảnh, phạm
  spec 4.2 mỗi khái niệm một hình riêng. → Vẽ resolver bằng motif danh bạ.
- `○` **[P1/S] Gói tin không giữ "cùng một hình dạng ở mọi module"** (spec
  4.2 nói thẳng) — TcpReliable/UdpFast vẽ hộp trơn không nắp phong bì,
  đúng chỗ cần nhận ra "vẫn là gói tin đó". → Thêm nét nắp (1 path/gói).
- `○` **[P2/S] Đầu mũi tên không ăn màu theo nhóm** — marker kế thừa màu
  từ gốc svg, không từ path gọi nó. → `stroke='context-stroke'` một chỗ ở
  Frame, mọi hình hưởng.
- `○` **[P2/S] WellKnownDoors: trục ghi "0 — 1023" nhưng cửa 22 đứng bên
  phải cửa 443** — mã hóa không gian mâu thuẫn thứ tự số, ở đúng module
  dạy trí nhớ vị trí. → Sắp 22, 80, 443 hoặc bỏ dấu hiệu trục.
- `○` **[P2/S] DoraFourBeats thiếu nhãn hai đầu** (Handshake3Way cùng bố
  cục thì có nhãn). → Thêm "máy bạn"/"DHCP".
- `○` **[P2/S] Glyph 587 và 389 na ná bóng dáng** — phạm chính luật đầu
  file RoomGlyph. → Đẩy id-check về "quầy xuất trình".
- `○` **[P2/S] "Ổ khóa VÀNG" phòng 443 không vàng** — spec chỉ định màu
  cho móc nhớ mà glyph render một màu accent. → Cho glyph khai màu riêng
  (var(--warn) đã qua test contrast).

### Ghế 7 — UX & luồng tương tác (8.0)

Điểm mạnh nổi bật: hợp đồng hai nút Gửi thử/Nộp bài nói rõ bằng microcopy
nhất quán lab + PS; mọi cổng chặn có lối thoát chủ đích ("không ai bị nhốt
trong vòng ôn vô hạn" — có comment + trần 6 thẻ); thoát giữa bài không mất
tiến độ pipeline.

- `○` **[P1/S] Màn kết phiên ôn là ngõ cụt khi còn nợ thẻ** — cắt trần 15
  thẻ nhưng màn finished chỉ có link về Học; người nợ >30 bị đẩy đi vòng
  Học↔Ôn tập, và bấm tab Ôn tập lúc đó không remount nên đứng im
  (ReviewPage.tsx:101-116). → Hiện "Còn N thẻ đến hạn" + nút "Ôn phiên
  tiếp".
- `○` **[P1/M] Bài dở trong lab và terminal PS mất trắng khi rời trang** —
  session hoàn toàn useState cục bộ, lệch lời hứa ngầm "mọi tiến độ đều
  persist" (NetworkLab.tsx:134-140; PsConsole.tsx:104-105). → Persist
  snapshot theo questionId, hoặc tối thiểu xác nhận trước khi rời.
- `○` **[P2/M] Từ bước Thử tay/Nhớ lại không có đường ĐỌC LẠI bước Khám
  phá** — chip 6 bước là trang trí, quên khái niệm chỉ còn cách ăn thang
  gợi ý hoặc thoát ra. → Đề xuất drawer CHỈ ĐỌC (không phải nút nhảy bước
  — không phạm nguyên tắc 1). *(cần duyệt — đụng pipeline 6 bước)*
- `○` **[P2/M] Chấm nhầm nhớ/quên trong ôn tập là chịu** — không undo, hai
  nút sát nhau trên mobile; mọi SRS trưởng thành có Undo. → "Hoàn tác" 5
  giây sau mỗi lần chấm. *(cần duyệt — đụng phiên ôn)*
- `○` **[P2/S] Terminal PS không có lịch sử lệnh (mũi tên lên)** — gõ lại
  nguyên dòng pipeline sau mỗi lần sai chính tả; PS thật có history mà app
  đang tự hào mô phỏng "như thật". → ArrowUp/Down duyệt lịch sử.
- `○` **[P2/S] Vùng chạm bộ toggle thanh đáy mobile ~16px** — dưới mốc
  24px WCAG, dưới chuẩn 24px dự án tự đặt cho cổng lab. → p-2 cho ba nút.

### Ghế 8 — Onboarding & phiên đầu (8.0)

Điểm mạnh nổi bật: aha moment 60 giây có thật, đứng trước mọi màn giới
thiệu, không đòi gì từ người dùng; không màn hình trống nào thiếu lời dẫn;
mọi luật khó dịch sang ngôn ngữ người thường không lộ jargon.

- `○` **[P1/S] Ngày 2 bị teleport vào Ôn tập không một lời giải thích tại
  chỗ** — banner vì-sao nằm ở LearnPage, nơi người dùng KHÔNG được đưa
  tới; cảm giác đầu tiên là "app mở nhầm tab" (main.tsx:57; ReviewPage
  không có dòng dẫn). → Một dòng dưới heading khi shouldReviewFirst: "Bạn
  có N thẻ đến hạn — ôn xong mình học tiếp."
- `○` **[P2/S] Mũi tên "Vào ôn tập ↓" chỉ sai hướng** — banner nằm phía
  TRÊN (LearnPage.tsx:67). → Đổi thành Link thẳng tới /on-tap.
- `○` **[P2/S] Empty state Ôn tập không đưa nút hành động** dù EmptyState
  có sẵn prop action và pattern đã dùng nơi khác. → Truyền action.
- `○` **[P2/M] Tab để mở qua đêm né được luật ôn-trước** — cờ
  openedIntoReview là biến module, chỉ reset khi reload (main.tsx:35).
  → Ghi kèm ngày vào cờ. *(cần duyệt — đụng luật điều hướng spec 2.2)*
- `○` **[P2/M] Người bật reduced-motion nhận aha moment chỉ còn một dòng
  chữ** — spec đòi THẤY gói tin ghé router; reduced-motion cấm chuyển
  động, không cấm trạng thái rời rạc. → Chuỗi trạng thái tĩnh có nhịp.

### Ghế 9 — Khả năng tiếp cận (8.0)

Điểm mạnh nổi bật: thiết bị/cổng lab là button thật, aria-label giàu ngữ
nghĩa bị test khóa nội dung thật; reduced-motion tôn trọng ở CSS + 2
animation JS lớn, nhật ký chặng luôn render đầy đủ; terminal có role=log,
StageMap aria-current có test.

- `○` **[P1/M] Live region mount cùng lúc với nội dung** — FeedbackBanner
  (role=status) chỉ render KHI có phản hồi; NVDA/VoiceOver thường bỏ qua
  region chèn vào kèm sẵn nội dung → người dùng screen reader nộp bài
  không nghe "đúng/gần rồi" — kênh trung tâm của cơ chế 3 tầng
  (FeedbackBanner.tsx:37; LessonPlayer.tsx:367). → Container role=status
  TRỐNG luôn có mặt, swap nội dung vào trong.
- `○` **[P2/S] Câu xếp thứ tự: bấm chọn xong phần tử unmount, focus rơi về
  body** — câu 5 mục là 5 lần lạc focus. → Chuyển focus chủ động.
- `○` **[P2/S] Bảng mục tiêu chấm sống không announce** — điểm bán hàng
  của PsConsole chỉ dành cho mắt. → Live region ẩn announce từng goal đạt.
- `○` **[P2/S] MiniPacket bỏ qua reduced-motion** — motion.g không qua
  useReducedMotion. → `<MotionConfig reducedMotion="user">` một lần ở
  main.tsx, cover mọi component hiện tại và tương lai.
- `○` **[P2/M] Di chuyển thiết bị canvas chỉ có kéo-thả** — thao tác DUY
  NHẤT không có đường bấm-chọn thay thế (luật dự án). → Phím mũi tên dời
  theo snapToGrid khi thiết bị selected.
- `○` **[P2/S] Ô gõ đáp án typed chỉ có placeholder làm nhãn** — dạng câu
  chủ lực lại lệch chuẩn của chính dự án (PS/Clinic đặt tên tử tế).
  → aria-label một dòng.

### Ghế 10 — Kiến trúc & chất lượng mã (8.0)

Điểm mạnh nổi bật: engine thuần kiểm bằng grep; "lessonMachine không biết
dạng câu tồn tại" khóa bằng 4 test kiến trúc qua 7 kind; schema gate ép
luật SƯ PHẠM ở tầng dữ liệu (mức chuẩn ngành ít edtech đạt); thêm module
13 chi phí code gần 0 (grep xác nhận không module id nào hardcode).

- `○` **[P1/M] Runtime dở persist gặp content đã đổi: crash hoặc kẹt bài,
  không lưới đỡ** — đổi id câu → throw trong click handler và KHÔNG có
  ErrorBoundary nào (màn trắng, chỉ thoát bằng xóa localStorage); thêm câu
  → canAdvance false vĩnh viễn (progress.ts:206; lessonMachine.ts:214-217,
  326-330). Nội dung 12 module đang sửa liên tục — không phải ca lý
  thuyết. → So tập khóa runtime với content lúc beginLesson, lệch thì học
  lại bài; + ErrorBoundary gốc có nút "làm lại bài này".
- `○` **[P1/S] persist version 1 KHÔNG có migrate** — bump version là
  zustand VỨT toàn bộ state: mất sạch XP/streak/thẻ SM-2, tức mất chính
  sản phẩm (progress.ts:412-419). Trùng với ghế 14. → Khung migrate (v1 →
  identity) + fixture đóng băng payload v1 + test rehydrate. **Nên làm
  trước MỌI thay đổi state tiếp theo.**
- `○` **[P2/S] Store với tay sang tầng content** (loadModules trong
  recordMasteryAttempt) — vết gợn duy nhất trên lời hứa "chuyển backend
  chỉ thay tầng persist". → Nhận orderedModuleIds làm tham số.
- `○` **[P2/M] Lỗ coverage thật của 857 test:** vòng đời persist theo thời
  gian + wiring hydration main.tsx (vùng từng có bug StrictMode thật) —
  đúng hai vùng có finding P1 ở trên, lỗ test và lỗ code trùng nhau.
  → Test jsdom cho gates + test rehydrate payload cũ.
- `○` **[P2/S] nearMisses.accept trùng accept chính bị nuốt im lặng**
  → Một cross-check giao-tập-rỗng theo khuôn sẵn có.
- `○` **[P2/S] drillHistory tăng vô hạn** (trùng ghế 14) → slice trần.

### Ghế 11 — Hiệu năng (6.5)

Điểm mạnh nổi bật: zustand selector đúng chuẩn cả 50+ chỗ (không re-render
storm); answerHistory có trần — persist không chậm dần theo tháng; pipeline
font tự host đúng bài bản (unicode-range, swap, subset).

- `○` **[P1/M] Một bundle 1.27MB, zero code-split, zero lazy route** — 3G
  yếu mất 7-9s JS + 1-2s parse trên máy văn phòng cũ, đúng nhóm người dùng
  của app (main.tsx:14-23; grep lazy|Suspense = 0). → React.lazy cho
  Drill/Clinic/Profile/Design/ModuleTest; giữ eager Learn/Review.
- `○` **[P1/M] 668KB nội dung 12 module eager + zod validate cả 12 lúc mở
  app** — hơn NỬA bundle; người ở bài 1 trả tiền tải + CPU cho ca bệnh
  M11, thế giới PS M12; zod đang validate thứ content.test.ts đã validate
  lúc build (content/index.ts:10-27). → Bước build prevalidate: emit JSON
  sạch, client bỏ zod (~50KB gz + toàn bộ CPU); bước hai mới tính lazy
  per-module.
- `○` **[P2/S] /design (132 SVG + fixture) ship cho mọi người học** —
  lazy-route rẻ nhất, làm trước cả mục trên.
- `○` **[P2/S] Không preload font critical** — chữ nhảy muộn trên mạng
  chậm; 2 file quyết định (~32KB). → `<link rel="preload">` cho BVP 400
  vietnamese + latin.
- `○` **[P2/S] motion import bản đầy đủ ở component nóng nhất** (~30KB gz
  cho 1 motion.g) → LazyMotion + m.* ở 3 file.
- `○` **[P2/S] dist/ chứa 6 thế hệ bundle cũ (~7.5MB rác)** — OneDrive
  khóa file làm empty-outDir thất bại im lặng; deploy nguyên dist là ship
  rác. → Dọn dist trước build / CI build ngoài OneDrive.

### Ghế 12 — Giá trị đo lường (6.5)

Điểm mạnh nổi bật: bộ chấm typed công bằng thật cho người gõ tiếng Việt
(luật vàng bỏ dấu chống "mật"≈"mất", guard phủ định); toán gate chính xác
tuyệt đối ở ngưỡng, không farm được; item chuyển-cảnh + chấm hiệu ứng cho
content validity cao.

- `○` **[P1/M] MCQ lộ hai cue kinh điển: 35/38 đáp án là lựa chọn DÀI
  NHẤT, 28/38 ở vị trí ĐẦU (M5-M10: 22/22), và UI không xáo** — người
  test-wise bấm "câu đầu/câu dài" ăn gần trọn phần MCQ ≈ nửa điểm đề ở
  M7/8/10. Chủ tịch đã tự chạy lại thống kê: khớp từng con số. → (1) xáo
  lựa chọn lúc render (useMemo như OrderInput — không đụng schema);
  (2) cân độ dài + viết lại distractor yếu. *(việc 2 cần duyệt)*
- `○` **[P1/M] Rớt thi → in đáp án chuẩn từng câu (kể cả LỆNH GIẢI ps) →
  thi lại nguyên đề nguyên thứ tự** — từ lượt 2 điểm đo trí nhớ đề. Trùng
  finding ghế 1 nhưng thêm góc: spec chỉ đòi "hiện Ý cần ôn", app đang
  cho NHIỀU hơn spec và chính phần thừa tạo lỗ. → Màn rớt chỉ hiện
  prompt + hintTopic/explain; xáo thứ tự câu; dài hạn: pool 12-16 câu rút
  8. *(cần duyệt)*
- `○` **[P1/L] Đề 7-9 câu: gate thực chất là "sai tối đa 1 câu"**, chuẩn
  thật dao động 85.7-88.9% tùy module; người mastery thật 85%/câu vẫn rớt
  ~34%/lượt, người 70% đậu ~25%/lượt và thi lại tự do cộng dồn >50% sau 3
  lượt. → Chuẩn hóa n + tăng lên 12-14 câu (một công đôi việc với pool).
  *(cần duyệt — viết thêm nội dung)*
- `○` **[P2/S] Accept typed rộng-hẹp không đều tay** — "65,535" bị tách
  token chấm sai, "dấu |" trượt vì tokenize xóa ký hiệu, M5 nhận "synack"
  mà M12 không nhận "gethelp". → Rà một lượt accept theo checklist.

### Ghế 13 — i18n & song ngữ (7.5)

Điểm mạnh nổi bật: bản EN là transcreation giữ giọng ("right before your
brain lets it slip"); test i18n ba lớp sinh từ sự cố thật, khóa cả giọng
văn (cấm chữ "SAI", cấm mệnh lệnh); ranh giới chrome/nội dung giữ sạch
trong toàn bộ luồng người học.

- `○` **[P1/S] Mô tả lệnh arp gọi ARP cache là "MAC address table"** —
  trộn đúng hai khái niệm mà M4 dạy tách bạch (bảng của SWITCH vs bảng
  IP→MAC của host); en.json còn nặng hơn (vi/en.json:334). → Sửa hai
  chuỗi thành "bảng IP → MAC (ARP cache)".
- `○` **[P1/M] LText.en là trường chết** — 40+ call site đóng đinh `.vi`
  trên 10 file, không helper trung gian; chi phí bật EN nội dung tăng dần
  theo mỗi feature mới. → Helper thuần `lt(text, lang)` thay cơ học ngay
  khi còn ~40 chỗ; hành vi không đổi (en chưa có thì rơi về vi).
- `○` **[P2/L] Nhãn tiếng Việt khắc cứng trong SVG ConceptVisual** — nội
  dung dạy học sống trong src/components, điểm mù của cả hai đường dịch.
  → Chưa cần làm, nhưng phải CHỐT phương án (VI-only tuyên bố, hay bảng
  LText) trước khi registry phình thêm. *(cần quyết)*
- `○` **[P2/S] Interpolate không có số nhiều** — bản EN vỡ ở count=1
  ("1 days", "1 cables connected"). → Viết lại chuỗi EN dạng trung tính số.
- `○` **[P2/S] `<html lang="vi">` tĩnh** — bật EN thì screen reader đọc
  chrome EN bằng giọng Việt. → applyLang cạnh applyTheme.
- `○` **[P2/S] Test parity chưa khóa placeholder** — rơi {count} trong
  tương lai sẽ lọt lưới. → Một it() so tập /\{(\w+)\}/ hai bản.
- `○` **[P2/S] DesignPage hardcode VI không tuyên bố ngoại lệ** → một dòng
  comment đầu file.

### Ghế 14 — Riêng tư, dữ liệu & độ bền (6.5)

Điểm mạnh nổi bật: không tracking/analytics/fetch — 0 match toàn src, khớp
đo hiện trường; một đường persist duy nhất, engine không đọc localStorage;
answerHistory có cap kèm phòng thủ dữ liệu hỏng.

- `○` **[P1/M] Không có xuất/nhập backup** — toàn bộ tiến độ trong MỘT
  profile trình duyệt; launcher mở cửa sổ `--app` nên người dùng KHÔNG
  BIẾT dữ liệu nằm trong Chrome — một lần "Clear browsing data" theo thói
  quen là mất hàng chục giờ học. → Cặp nút Xuất/Nhập ở tab Hồ sơ (dump/
  restore 3 key), không đổi data model, không phạm "Phase 1 localStorage".
- `○` **[P1/S] version 1 không migrate** (trùng ghế 10 — hai ghế độc lập
  cùng chỉ một chỗ: tín hiệu mạnh). → Xem mục 4, việc số 3.
- `○` **[P1/M] Hai cửa sổ app ghi đè nhau im lặng** — launcher luôn spawn
  cửa sổ mới kể cả khi server sẵn; không storage listener/BroadcastChannel;
  học 3 bài ở A, bấm một nút ở B là B ghi đè sạch (launch-app.mjs:168-179).
  → Rẻ nhất: BroadcastChannel phát hiện phiên thứ hai → màn chặn "App đang
  mở ở cửa sổ khác".
- `○` **[P1/M] lessonRuntimes persist trỏ content theo id, không đóng dấu
  phiên bản** (trùng ghế 10, thêm góc dữ liệu). → Content hash vào runtime
  lúc startLesson; lệch thì hủy runtime dở, giữ completedLessons, nói tử
  tế "Bài này vừa được cập nhật, mình học lại bước nhé".
- `○` **[P2/S] drillHistory phình không giới hạn** — trường DUY NHẤT
  không cap, bất đối xứng với answerHistory. → slice(-100).

---

## 4. Danh sách ưu tiên hợp nhất (checklist sửa dần)

> **Cập nhật tối 2026-08-07 — lượt sửa lớn đã chạy xong:** 25/28 mục
> P0/P1 đã đóng (đánh dấu [x]), 876/876 test xanh, đối chiếu browser
> thật. Bốn quyết định "cần duyệt" đã được chủ dự án chốt trước khi code:
> cả ba lớp vá mastery / thêm relearning / PS đổi sang cột Path chuẩn
> thật / chốt thuật ngữ "port". Ba mục P1 còn mở vì là việc VIẾT NỘI DUNG
> cỡ lớn hoặc cần bàn thêm: #5 (rà distractor + accept 12 module), #6
> (pool 12-16 câu/đề — cỡ L), #20 (persist bài dở lab/PS — cần chọn
> chiến lược snapshot). Danh sách P2 chưa đụng, trừ các mục tiện tay đã
> làm kèm: history terminal PS, vùng chạm toggle, focus câu order,
> announce mục tiêu, MotionConfig, aria-label ô typed, LazyMotion,
> --danger có consumer (ErrorBoundary), cap drillHistory, cross-check
> nearMisses, store thôi gọi loadModules.

Đã gộp trùng giữa các ghế. Thứ tự trong nhóm = thứ tự nên làm.
"(duyệt)" = đụng hành vi nhìn thấy/spec — trình phương án chờ chủ dự án
quyết rồi mới code.

### P0 — sai kiến thức, sửa ngay

- [x] **1. Hình bắt tay ba bước: đảo chiều ACK, chốt chiều SYN-ACK**
      (ghế 6, `✓PB`, S) — 2 dòng SVG trong ConceptVisual.tsx:616,623.

### P1 — giá trị cổng mastery (cụm liên hoàn, nên quyết CÙNG NHAU) (duyệt)

- [x] 2. Xáo thứ tự lựa chọn MCQ lúc render (ghế 12, S — không đụng schema)
- [x] 3. Xáo thứ tự CÂU mỗi lượt thi (ghế 1+12, S)
- [x] 4. Màn rớt: chỉ hiện Ý CẦN ÔN (hintTopic/explain), thôi in nguyên
      văn đáp án + lệnh giải (ghế 1+12, `✓PB`, S)
- [x] 5. Nội dung: cân độ dài distractor, viết lại distractor "đùa",
      rà accept typed một lượt (ghế 12, M) — 08-08: 38 câu MCQ của 12 đề
      rà xong, tỉ lệ "đáp án là lựa chọn dài nhất" 35/38 → 13/38 (mức
      ngẫu nhiên); hai test mới khóa cả cue độ-dài lẫn accept gõ tay.
- [x] 6. Dài hạn: pool 12-16 câu/module rút 8 + chuẩn hóa n (ghế 12, L)
      — 08-08: mọi module lên **pool 12 câu**, mỗi lượt thi **rút 8**
      (`engine/masteryPool.ts`); câu TRỤ (lab/cung điện/ca bệnh/terminal)
      luôn có mặt nên cổng không bao giờ bỏ qua kỹ năng của module. Chuẩn
      hóa n: mọi module cùng 8 câu, 7/8 đậu — 46 câu mới viết bám concept,
      không câu nào lặp câu cũ.

### P1 — độ bền dữ liệu người học (nên làm TRƯỚC mọi thay đổi state khác)

- [x] 7. Khung migrate v1 + fixture đóng băng payload + test rehydrate
      (ghế 10+14 — hai ghế độc lập cùng chỉ, S)
- [x] 8. Xuất/Nhập tiến độ ở tab Hồ sơ (ghế 14, M) (duyệt — nút mới)
- [x] 9. Lưới đỡ runtime-lệch-content: so khóa lúc beginLesson + content
      hash + ErrorBoundary gốc (ghế 10+14, M)
- [x] 10. Chặn hai cửa sổ song song (BroadcastChannel + màn chặn) (ghế
      14, M)

### P1 — hiệu năng tải trang

- [x] 11. Lazy route: DesignPage trước (rẻ nhất), rồi Drill/Clinic/
      Profile/ModuleTest (ghế 11, M)
- [x] 12. Prevalidate nội dung lúc build — client bỏ zod (ghế 11, M)
- [x] 13. Dọn dist/ 6 thế hệ bundle cũ trước deploy (ghế 11, S)

### P1 — cơ chế học & cảm xúc (duyệt — đụng spec/hành vi)

- [x] 14. Requeue thẻ "quên" trong phiên ôn — bước relearning (ghế 1,
      `✓PB`, M)
- [x] 15. Kể chuyện streak freeze + reset (ghế 3, `✓PB`, S)
- [x] 16. Sửa copy huy hiệu hứa suông NGAY (S); kế hoạch hệ huy hiệu
      trình sau (ghế 3, `✓PB`)
- [x] 17. Animation ăn mừng màn Kết (spec đòi, chưa khai sai lệch) (ghế
      3, `✓PB`, M)
- [x] 18. Ngày-2: một dòng giải thích ở đầu ReviewPage (ghế 8, S)
- [x] 19. Ngõ cụt phiên ôn khi còn nợ: nút "Ôn phiên tiếp" (ghế 7, S)
- [x] 20. Persist bài dở lab/PS (hoặc xác nhận trước khi rời) (ghế 7, M)
      — 08-08: chọn hướng PERSIST THẬT (không phải hộp xác nhận). Ngăn
      `practiceDrafts` trong store (persist v2 → v3 + case migrate + test),
      khóa theo bài × câu, trần 12 bài dở. Lab lưu sơ đồ + chỗ đứng thiết
      bị; PS lưu thế giới + nhật ký lệnh. Bài học lưu, **bài thi KHÔNG**
      (`draftKey` chỉ truyền từ LessonPlayer) — có test gác.

### P1 — nội dung & hình (duyệt — đụng nội dung)

- [x] 21. Chốt quy ước port/cổng, quét ~29 chỗ M5-M12 (ghế 4, `✓PB`, M)
- [x] 22. Import-Csv cột OU: đổi sang cột Path hoặc khai báo đơn giản hóa
      (ghế 2, `✓PB`, M)
- [x] 23. Sửa mô tả arp "MAC address table" → "bảng IP → MAC (ARP cache)"
      (ghế 13, S)
- [x] 24. DnsResolver thôi mượn glyph router; gói tin TCP/UDP thêm nắp
      phong bì (ghế 6, S)

### P1 — thị giác & a11y

- [x] 25. Bỏ opacity-60 card khóa — thể hiện bằng token tường minh (ghế
      5, `✓PB`, S)
- [x] 26. Cho --part-accent sống: 2-3 điểm chạm + cặp test contrast (ghế
      5, `✓PB`, M)
- [x] 27. Live region thường trực cho phản hồi chấm bài (ghế 9, M)
- [x] 28. Helper `lt(text, lang)` thay 40 chỗ `.vi` (ghế 13, M)

### P2 — ghi nhận, sửa dần theo dịp

Cụm sư phạm: SM-2 bậc 60/120 hoặc nghỉ hưu thẻ (duyệt spec); cửa sổ flow
lọc ngữ cảnh (duyệt); XP tự chấm — trade-off thật, đưa chủ dự án quyết;
màn kết CẢ KHÓA riêng (duyệt); openAccepts cho mcq harder (duyệt schema);
drawer đọc-lại bước Khám phá (duyệt).

Cụm nội dung: ~~subnet mask ở M6~~; ~~ẩn dụ DORA lệch giới~~; ~~"..." →
"…"~~; ~~"ben máy đích"~~; ~~NAT khai báo trong lab mạng nhà~~;
~~New-ADUser enabled default~~; ~~ping unreachable prefix + thống kê~~;
~~chuyện phòng 21 (FTP control)~~ — **cả cụm XONG 08-08 (đợt ba)**.

Cụm UI/a11y/perf: undo chấm nhầm ôn tập (duyệt); history terminal PS;
vùng chạm toggle; focus câu order; announce goal đạt; MotionConfig
reduced-motion; aria-label ô typed; preload font; LazyMotion;
~~PalaceMap light~~; --danger có consumer (gộp với ErrorBoundary);
~~glyph 587/389~~; ~~ổ khóa 443 màu vàng~~; DORA thêm nhãn;
WellKnownDoors trục số; ~~context-stroke cho mũi tên~~;
~~dời thiết bị canvas bằng bàn phím~~ (08-08, đợt ba).

Cụm kỹ thuật: store thôi with-tay content; ~~test gates main.tsx~~ +
payload cũ; cross-check nearMisses; cap drillHistory; ~~parity
placeholder~~; ~~applyLang~~; ~~plural EN~~; ~~comment ngoại lệ
DesignPage~~; ~~chốt phương án nhãn SVG~~ (chốt VI-only, 08-08, đợt ba).

> **Còn lại của P2** sau đợt ba: các mục ghi "(duyệt)" cần chủ dự án
> quyết, cộng preload font + LazyMotion-đo-thật (đợt bốn), DORA thêm
> nhãn / WellKnownDoors trục số (hai hình), cross-check nearMisses,
> store thôi with-tay content, vùng chạm/focus/announce (đã làm kèm
> lượt sửa 07-08 — xem đầu mục 4).

### Việc KHÔNG code được (nhắc lại cho đủ)

- [ ] Các buổi test người thật theo KICH-BAN-TEST.md — nhiều phát hiện ở
      trên (nhất là cụm mastery và onboarding ngày-2) sẽ được người thật
      xác nhận hay bác bỏ nhanh hơn mọi hội đồng.

---

## 5. Những gì đã đạt chuẩn — ĐỪNG PHÁ

Chốt chặn cho các phiên sửa sau. Sửa bất kỳ mục nào ở mục 4 mà làm suy
suyển các thứ dưới đây là lỗ nặng hơn lãi:

1. **Máy trạng thái 6 bước không biết dạng câu hỏi tồn tại** — 4 test
   kiến trúc khóa qua 7 kind. Mọi dạng bài mới tiếp tục là "một dạng câu
   hỏi", không sửa lessonMachine.
2. **Engine thuần** — không React, không localStorage, không tự lấy giờ.
   Thời gian bơm từ ngoài. Khi sửa store đừng để logic chảy ngược vào engine.
3. **Schema gate sư phạm** — tuple 6 bước, cung điện "đi xem trước hỏi
   sau", câu độc lập bắt buộc explain, id duy nhất liên-module. Nội dung
   sai phải chết ở build, không bao giờ tới người học.
4. **Ranh giới chuỗi ba tầng** — output thiết bị tiếng Anh nguyên văn
   trong `<pre>`; microcopy VI qua i18n; nội dung bài học là data. Đã có
   test khóa giọng văn (cấm "SAI", cấm mệnh lệnh).
5. **Hai nút Gửi thử miễn phí / Nộp bài tính lượt** — hợp đồng nhất quán
   lab + clinic + PS. Mọi bề mặt thực hành mới theo đúng hợp đồng này.
6. **Token màu + test contrast WCAG thật** — thêm màu là thêm cặp đo,
   không hardcode hex, không gradient tím-xanh.
7. **XP chỉ từ retrieval/lab lần đầu; thi và việc-ngoài-app không XP** —
   mọi chỉnh sửa gamification đi qua nguyên tắc 5 trước.
8. **Mọi thao tác có đường bấm-chọn** (kéo-thả là đường phụ) và **nhật ký
   chặng luôn render đầy đủ** — animation chỉ là lớp đắp.
9. **Không tracking, không CDN, offline trọn vẹn** — mọi tính năng mới
   không được thêm network call.
10. **Nội dung là data** — thêm module = thêm JSON + vẽ hình; grep không
    được ra module id trong logic.
