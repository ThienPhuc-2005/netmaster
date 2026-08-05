# SPEC: App Học Mạng Máy Tính — "NetMaster" (tên tạm, đổi tùy ý)

> Tài liệu này là đặc tả đầy đủ để Claude Code triển khai. Đọc toàn bộ trước khi code.
> **QUAN TRỌNG: Chỉ build Phase 1 (MVP) trước. Không build tất cả cùng lúc.**

---

## 1. TẦM NHÌN & NGUYÊN TẮC

Một app dạy mạng máy tính từ con số 0 đến trình độ đi làm (IT Support / SysAdmin),
được thiết kế dựa trên khoa học học tập thay vì chỉ trình bày nội dung.

**5 nguyên tắc bất biến (mọi quyết định code phải tuân theo):**

1. **Học = lôi ra, không phải nhét vào.** Mọi bài học kết thúc bằng retrieval
   (người dùng phải tự gõ/tự vẽ/tự giải), không bao giờ chỉ đọc xong là qua bài.
2. **Mastery gate.** Chưa đạt ≥ 85% bài kiểm tra module thì không mở module sau.
   Không có nút "skip".
3. **Một màn hình = một ý.** (Cognitive Load) Không nhồi. Nội dung dài thì chia
   thành nhiều bước nhỏ, mỗi bước một khái niệm.
4. **Thất bại trước, lời giải sau.** (Productive Failure) Với bài thực hành:
   cho người dùng thử và sai trước, chỉ hiện gợi ý sau 2 lần sai, hiện lời giải
   sau 3 lần sai.
5. **Phần thưởng chỉ gắn với học sâu.** XP/streak chỉ được cộng khi hoàn thành
   retrieval hoặc lab, KHÔNG cộng khi chỉ đọc/xem.

---

## 2. KIẾN TRÚC HỌC TẬP (Pedagogy Engine) — trái tim của app

Đây là các hệ thống dùng chung cho mọi bài học. Build các hệ thống này TRƯỚC
khi viết nội dung bài.

### 2.1. Cấu trúc một bài học (Lesson Flow) — 6 bước cố định

Mỗi bài học BẮT BUỘC đi qua pipeline này, theo đúng thứ tự:

| Bước | Tên | Kỹ thuật áp dụng | Mô tả |
|------|-----|------------------|-------|
| 1 | **Hook** | Curiosity gap | 1 câu hỏi lạ chưa trả lời, ví dụ: "Tại sao 2 máy cùng nhà lại 'nói chuyện' nhanh hơn 2 máy khác thành phố cả nghìn lần?" |
| 2 | **Pretest** | Pretesting effect | 1-2 câu hỏi về nội dung SẮP học. Sai không trừ điểm, có lời động viên: "Sai là bình thường — não bạn vừa được 'mồi' để học tốt hơn." |
| 3 | **Dạy** | Dual coding, Mayer principles, Progressive disclosure | Mỗi khái niệm = 1 hình/animation + chữ ngắn đặt NGAY CẠNH hình. Ẩn dụ đời thường trước, thuật ngữ sau. Chi tiết nâng cao giấu sau nút "Đào sâu hơn". |
| 4 | **Làm** | Productive failure, Generation effect, Worked example fading | Bài tương tác. Bài đầu module: có ví dụ giải sẵn. Các bài sau: rút dần phần giải sẵn (fading). Người dùng phải GÕ đáp án, hạn chế trắc nghiệm. |
| 5 | **Retrieval** | Active recall, Self-explanation | Đóng hết nội dung. Người dùng trả lời từ trí nhớ + 1 câu "Giải thích tại sao bằng lời của bạn" (gõ tự do, chấm bằng keyword matching đơn giản ở MVP). |
| 6 | **Kết** | Peak-end rule | Màn tổng kết đẹp: hôm nay học được gì (3 gạch đầu dòng), animation ăn mừng ngắn, hé lộ 1 câu về bài tiếp theo (Zeigarnik). |

### 2.2. Hệ thống ôn ngắt quãng (Spaced Repetition Engine)

- Mỗi khái niệm học xong sinh ra flashcard tự động vào "Hộp ôn tập".
- Thuật toán: dùng SM-2 đơn giản hóa (interval: 1 ngày → 3 ngày → 7 ngày →
  14 ngày → 30 ngày; sai thì reset về 1 ngày).
- Mỗi ngày mở app, việc ĐẦU TIÊN là ôn thẻ đến hạn (tối đa 15 thẻ/phiên) rồi
  mới học bài mới. Không cho học mới khi còn > 30 thẻ quá hạn.
- Phiên ôn trộn thẻ từ nhiều module (Interleaving) — không ôn theo khối.

### 2.3. Hệ thống độ khó thích ứng (Flow)

- Theo dõi tỷ lệ đúng 10 câu gần nhất.
- Đúng > 90% → tăng độ khó (câu hỏi mở thay trắc nghiệm, tình huống lạ hơn).
- Đúng < 60% → chèn lại bài ôn nền tảng liên quan.
- Mục tiêu giữ người học ở vùng đúng 70-85% (vùng flow).

### 2.4. Gamification có đạo đức

- **Streak** theo ngày, có 2 "đóng băng" miễn phí/tháng (không tạo áp lực độc hại).
- **XP** chỉ từ retrieval + lab (nguyên tắc 5). Thanh XP module bắt đầu ở 15%
  ("đã hoàn thành đăng ký bài" — Endowed progress).
- **Huy hiệu** gắn với hành vi sâu: "Giải thích được 10 khái niệm bằng lời mình",
  "Sửa được 5 mạng hỏng", KHÔNG có huy hiệu kiểu "đăng nhập 7 ngày".
- Chia mỗi module thành 4-6 chặng nhỏ nhìn thấy được (Goal gradient).

---

## 3. LỘ TRÌNH NỘI DUNG — từ dễ đến khó, hợp thời đại 2026

12 module. Mỗi module ghi rõ: mục tiêu, nội dung, và **kỹ thuật đặc thù** thêm
vào ngoài pipeline 6 bước chuẩn.

### PHẦN A — NỀN MÓNG (tư duy đúng trước, thuật ngữ sau)

**Module 1: Mạng là gì? — Câu chuyện bưu điện**
- Nội dung: 2 máy nói chuyện cần gì (địa chỉ, đường đi, ngôn ngữ chung, quy tắc).
  Mô hình hóa mạng như hệ thống bưu điện: thư = data, phong bì = gói tin,
  địa chỉ nhà = IP, số căn hộ = port, bưu tá = router.
- Kỹ thuật đặc thù: **Storytelling** — cả module là 1 câu chuyện gửi thư liên
  tỉnh. **Ẩn dụ nhất quán**: ẩn dụ bưu điện này được TÁI SỬ DỤNG xuyên suốt
  app (khi dạy NAT: "chung cư có 1 địa chỉ đường nhưng nhiều căn hộ"...).
- Kết quả đạt: người học vẽ lại được sơ đồ "1 tin nhắn đi từ máy A đến máy B"
  bằng ngôn ngữ đời thường.

**Module 2: Đường đi của gói tin — "Gõ google.com, chuyện gì xảy ra?"**
- Nội dung: toàn cảnh (chưa sâu): DNS hỏi địa chỉ → đóng gói → qua gateway →
  qua nhiều router → server trả lời. Đây là "bản đồ toàn thành phố" — các module
  sau zoom vào từng quận.
- Kỹ thuật đặc thù: **Animation gói tin bay qua sơ đồ** (dual coding + signaling:
  chặng đang giảng thì sáng lên, các chặng khác mờ đi). **Advance organizer**:
  cuối bài hiện bản đồ 12 module, chỉ rõ "bạn vừa thấy toàn cảnh, giờ mình đi
  từng phần".
- Retrieval đặc biệt: kéo-thả sắp xếp lại đúng thứ tự 8 chặng, sau đó GÕ lại
  từ trí nhớ không có gợi ý.

**Module 3: Địa chỉ — MAC, IP và Subnetting**
- Nội dung: MAC vs IP (số khung xe vs biển số), IPv4, private/public,
  subnet mask, chia subnet, CIDR. **Giới thiệu IPv6 ngay tại đây** (hợp thời
  đại — không dạy như "phần phụ lục").
- Kỹ thuật đặc thù: subnetting là kỹ năng luyện tay → **Drill mode riêng**:
  mỗi ngày 10 bài chia subnet tự sinh ngẫu nhiên, có đồng hồ đếm (desirable
  difficulty), theo dõi tốc độ tiến bộ qua biểu đồ. **Chunking**: dạy quy tắc
  "magic number" để nhẩm nhanh.
- Đây là module dài nhất phần A — chia thành 6 chặng nhỏ.

### PHẦN B — HẠ TẦNG (thiết bị và giao thức lõi)

**Module 4: Switch, Router, VLAN**
- Nội dung: switch học MAC table thế nào, router định tuyến thế nào, VLAN
  chia mạng ảo, ARP.
- Kỹ thuật đặc thù: **Simulation lab kéo-thả** (tận dụng kinh nghiệm Isoflow
  sẵn có): người dùng tự lắp mạng từ thiết bị rời (IKEA effect), bấm "gửi gói
  tin" và XEM nó chạy. **Productive failure**: đưa sơ đồ mạng lỗi (2 máy khác
  VLAN không ping được nhau) và yêu cầu sửa TRƯỚC khi dạy lý thuyết VLAN.

**Module 5: TCP, UDP và Port**
- Nội dung: bắt tay 3 bước, tin cậy vs tốc độ, port là gì, 15 port thông dụng
  nhất (80, 443, 22, 53, 3389, 445, 25, 587, 3306, 21, 23, 67/68, 123, 389, 636).
- Kỹ thuật đặc thù: danh sách port là kiến thức RỜI RẠC → đây là chỗ dùng
  **Cung điện ký ức**: app dựng "tòa nhà 15 phòng" cố định, mỗi phòng 1 port
  với hình ảnh gợi nhớ (phòng 443 có ổ khóa vàng = HTTPS, phòng 22 có vỏ sò
  = SSH shell...). Người học "đi tour" tòa nhà, sau đó retrieval bằng cách đi
  lại tour từ trí nhớ. Port cũng vào Spaced Repetition.
- **Von Restorff**: TCP handshake — bước SYN-ACK cho màu/hình độc nhất vì hay
  bị nhớ nhầm thứ tự.

**Module 6: DNS và DHCP**
- Nội dung: DNS phân cấp (root → TLD → authoritative), bản ghi A/AAAA/CNAME/MX,
  DHCP DORA. Thêm góc hiện đại: DNS over HTTPS.
- Kỹ thuật đặc thù: DORA (Discover-Offer-Request-Ack) → **chunking + kể chuyện
  hỏi cưới** (chàng trai Discover, cô gái Offer...). **Self-explanation** đậm:
  "Tại sao DHCP phải có bước Request dù đã nhận Offer?"

**Module 7: NAT, Firewall và mạng gia đình**
- Nội dung: NAT/PAT (ẩn dụ chung cư từ Module 1 quay lại), port forwarding,
  firewall stateful cơ bản, kiến trúc mạng nhà (modem-router-thiết bị).
- Kỹ thuật đặc thù: **Học gắn đời thật**: bài lab "vẽ lại sơ đồ mạng nhà BẠN"
  — kiến thức móc vào không gian quen thuộc của chính người học (chính là
  nguyên lý index/vị trí của memory palace áp lên đời thật).

### PHẦN C — ĐI LÀM (nội dung hợp thời đại, hướng doanh nghiệp)

**Module 8: Wi-Fi và IPv6 chuyên sâu**
- Nội dung: chuẩn Wi-Fi 6/6E/7, băng tần, bảo mật WPA2/WPA3, IPv6 addressing,
  SLAAC, dual-stack.
- Kỹ thuật đặc thù: **Interleaving mạnh** — bài tập trộn câu hỏi IPv4/IPv6
  để người học phân biệt được khi nào dùng kiến thức nào.

**Module 9: Windows Server — AD DS và GPO** ⭐ (module trọng điểm)
- Nội dung: domain, DC, OU, user/group, GPO, thứ tự áp dụng LSDOU, kế thừa
  và chặn kế thừa, gpresult/gpupdate.
- Kỹ thuật đặc thù: LSDOU và thứ tự xử lý GPO là chuỗi có thứ tự → **Cung điện
  ký ức lần 2**: "tòa nhà 4 tầng" Local → Site → Domain → OU, đi từ tầng trệt
  lên. **Worked example fading** đậm nhất app: bài 1 xem cấu hình GPO mẫu đầy
  đủ → bài 2 điền chỗ trống → bài 3 tự cấu hình từ yêu cầu suông.
- Kèm hướng dẫn dựng lab VMware thật song song (checklist từng bước, app track
  tiến độ lab).

**Module 10: Cloud Networking và Zero Trust**
- Nội dung: VPC/VNet, security group, VPN site-to-site vs client, khái niệm
  Zero Trust ("không tin ai mặc định, xác minh mọi truy cập"), identity là
  biên giới mới, sơ lược Entra ID hybrid.
- Kỹ thuật đặc thù: **So sánh song song** (contrast cases): mỗi khái niệm cloud
  đặt cạnh khái niệm on-prem tương đương đã học (security group ↔ firewall,
  VPC ↔ VLAN) — học cái mới bằng cách móc vào cái cũ (elaboration).

**Module 11: Troubleshooting — Phòng khám mạng** ⭐
- Nội dung: phương pháp chẩn đoán theo tầng (bottom-up), bộ công cụ: ping,
  ipconfig, traceroute, nslookup, netstat, Wireshark cơ bản.
- Kỹ thuật đặc thù: module này là **100% productive failure**: mỗi bài là 1
  "bệnh nhân" (mạng hỏng được mô phỏng), người học dùng lệnh ảo để chẩn đoán.
  KHÔNG có phần lý thuyết trước. Case từ dễ (rút dây) đến khó (DNS server chết,
  sai gateway, trùng IP, GPO chặn nhầm). **Interleaving**: case trộn kiến thức
  mọi module trước — đây chính là bài tổng ôn trá hình.

**Module 12: Tự động hóa — PowerShell cho người quản trị mạng**
- Nội dung: PowerShell cơ bản, cmdlet mạng (Test-NetConnection, Get-NetIPAddress),
  script tạo user AD hàng loạt, đọc log.
- Kỹ thuật đặc thù: **Generation effect tối đa**: mọi bài đều là "gõ lệnh vào
  terminal ảo", có gợi ý mờ dần (fading).

---

## 4. THIẾT KẾ CẢM QUAN (Design System)

### 4.1. Màu — quy tắc 60-30-10
- **Dark mode mặc định** (có toggle sáng): 60% nền xanh đen đậm (#0D1421 gợi ý),
  30% xám xanh cho panel/card, 10% màu nhấn.
- Màu nhấn: **cyan/xanh dương sáng** cho tương tác chính; **xanh lá** = đúng;
  **hổ phách** = cảnh báo/gợi ý; **đỏ** dùng CỰC KỲ tiết kiệm (chỉ lỗi hệ thống,
  không dùng cho "trả lời sai" — sai dùng hổ phách + lời tử tế).
- Mỗi PHẦN (A/B/C) có 1 tông nhấn phụ riêng để tạo cảm giác tiến trình.
- Contrast đạt WCAG AA tối thiểu.

### 4.2. Hình ảnh & chuyển động
- Mỗi khái niệm trọng yếu có 1 icon/hình đại diện riêng, nhất quán toàn app
  (picture superiority). Gói tin luôn cùng một hình dạng ở mọi module.
- Animation 200-300ms, easing ease-out. Chuyển động CHỈ để chỉ quan hệ
  (gói tin di chuyển, tầng đang nói sáng lên). Không animation trang trí.
- Phần đang giảng sáng, phần khác mờ 40% (signaling).
- Progressive disclosure: mọi sơ đồ có thể click vào từng phần tử để "bóc tầng"
  xem chi tiết bên trong.

### 4.3. Âm thanh (tất cả tắt được trong Settings)
- 4 earcon: đúng (ting ngắn sáng), sai (2 nốt trầm nhẹ — KHÔNG chói tai),
  hoàn thành bài (hợp âm đi lên ~1s), lên chặng mới (fanfare ngắn đặc trưng
  riêng của app).
- Phần đọc-suy nghĩ: im lặng hoàn toàn.
- (Phase 2) Thuyết minh giọng đọc cho animation dài (modality principle).

### 4.4. Câu chữ (Microcopy)
- Giọng "bạn/mình", trò chuyện, không văn sách giáo khoa (personalization
  principle của Mayer).
- Sai → phản hồi 3 tầng: (1) "Gần rồi — nghĩ lại về X nhé" → (2) gợi ý cụ thể
  → (3) lời giải + giải thích. Không bao giờ chỉ hiện "SAI".
- Mỗi bài học đặt tên như nhiệm vụ, có động từ: "Giải cứu gói tin bị lạc"
  thay vì "Bài 7: NAT".
- Thuật ngữ tiếng Anh giữ nguyên kèm giải nghĩa tiếng Việt lần đầu xuất hiện
  (đi làm dùng tiếng Anh), sau đó dùng tiếng Anh.

### 4.5. UX
- Menu chính tối đa 4 mục: Học | Ôn tập | Phòng khám | Hồ sơ (Hick's law).
- Onboarding: trong 60 giây đầu người dùng phải được BẮN 1 gói tin qua sơ đồ
  và thấy nó chạy — trước mọi màn đăng ký/giới thiệu (aha moment).
- Empty state có hướng dẫn việc cần làm, không màn hình trống.
- Mọi thao tác trong lab đều undo được — khuyến khích thử nghiệm.

---

## 5. YÊU CẦU KỸ THUẬT

- **Stack gợi ý**: React + Vite, TailwindCSS, Zustand (state), lưu tiến độ
  localStorage trước (Phase 1), sau này tính backend. Animation: Framer Motion
  hoặc CSS. Âm thanh: Howler.js hoặc Web Audio API.
- Responsive: ưu tiên desktop (lab kéo-thả cần màn rộng), mobile xem được
  phần đọc + flashcard.
- Cấu trúc nội dung tách khỏi code: bài học là data (JSON/MD) để thêm bài
  không sửa logic.
- Data model tối thiểu: `Module → Lesson → Step (6 loại theo pipeline) →
  Concept (sinh flashcard) → ReviewCard (SM-2 state)`.

---

## 6. PHÂN KỲ TRIỂN KHAI — LÀM THEO THỨ TỰ NÀY

### Phase 1 — MVP (làm trước, chạy được mới qua phase sau)
1. Pedagogy engine: pipeline 6 bước + mastery gate + flashcard SM-2 + XP/streak cơ bản.
2. Design system: màu, layout, earcon 4 âm, component bài học.
3. Nội dung: **chỉ Module 1, 2, 3** (đủ để test toàn bộ engine, gồm cả drill
   subnetting).
4. Onboarding 60 giây với animation bắn gói tin.

### Phase 2
5. Simulation lab kéo-thả (Module 4) — phần khó nhất về kỹ thuật.
6. Module 5, 6, 7 + cung điện ký ức Port (tòa nhà 15 phòng).
7. Độ khó thích ứng (flow engine).

### Phase 3
8. Module 8-10, cung điện GPO 4 tầng, checklist lab VMware.
9. Phòng khám mạng (Module 11) với terminal ảo.
10. Module 12 + terminal PowerShell ảo.

### Definition of Done cho mỗi phase
- Mọi bài đi đủ 6 bước, không bài nào "đọc xong là qua".
- Flashcard tự sinh và ôn đúng lịch SM-2.
- Không màn hình nào chứa quá 1 khái niệm mới.
- Test bằng người thật: 1 người chưa biết gì về mạng học xong Module 1-2
  phải VẼ LẠI được đường đi gói tin từ trí nhớ.
