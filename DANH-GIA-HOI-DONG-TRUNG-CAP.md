# Biên bản Hội đồng đánh giá NetMaster — đợt TRUNG CẤP (Phần D/E)

Ngày họp: 2026-08-09 · Thời điểm: 21/21 module + màn tốt nghiệp vừa khép,
hết phạm vi CODE của cả hai spec (hạng mục 20 của KE-HOACH-TRUNG-CAP.md).

**Cách làm việc (nếp hội đồng 07-08, mở rộng):** 15 ghế chấm độc lập theo
mảng — 14 mảng của đợt trước quy về phạm vi trung cấp, thêm ghế thứ 15
riêng cho Capstone & khép khóa. Mỗi phát hiện bắt buộc có bằng chứng trỏ
được (file:dòng). Tổng thu: **80 phát hiện (5 P0, 23 P1, 52 P2)**. 14 phát
hiện nặng nhất qua vòng **phản biện chéo**: một agent hoài nghi mở đúng
file ra tái lập — kết quả **14/14 tái lập được, 0 bị loại**. 5 P0 nêu ra
thực chất là 4 lỗi gốc (lỗi wildcard được HAI ghế bắt độc lập — tín hiệu
mạnh; một vòng phản biện giữ P0, một vòng hạ P1 vì nằm trong deepDive).
Phán quyết chủ tịch: **3 P0 đứng** (show spanning-tree, replication,
wildcard — dạy sai kiến thức trong nội dung người học đọc là P0 bất kể
nằm ở màn nào), 1 P0 hạ P1 (nslookup phi vật lý — không làm sai kết quả
chấm của ai). Còn 14 P1 chưa qua kiểm chéo (đánh dấu `○`). Chủ tịch tự
kiểm mẫu cả 3 lỗi gốc P0 — tái lập đúng nguyên văn từng dòng.

Ký hiệu: `✓PB` = đã qua phản biện chéo; `○` = một ghế nêu, có bằng chứng
trỏ file nhưng chưa kiểm chéo độc lập. Công sửa: S dưới 1 giờ, M một buổi,
L nhiều buổi. **Hội đồng chỉ đánh giá — chưa sửa gì; mục nào đụng hành vi
nhìn thấy được cần chủ dự án duyệt trước (luật CLAUDE.md).**

---

## 1. Tóm tắt điều hành

**Điểm trung bình 15 mảng: 7.6/10** — đúng bằng đợt nhập môn trước lượt
sửa lớn. Không mảng nào dưới 6.5. Phần trung cấp giữ được xương sống đã
làm nên tên tuổi của app (cơ chế học bị khóa bằng test, engine thi hành
đúng điều dạy, hai terminal fidelity cao); các vấn đề dồn về ba cụm:
**ba câu dạy sai kiến thức lọt lưới** (đều sửa dưới một giờ), **phép đo
yếu đúng ở chỗ đắt nhất — capstone và M13**, và **hiệu năng tải nội dung
21 module vẫn chưa có chiến lược** (vấn đề số 4 của hội đồng trước, giờ
to gấp đôi).

### 5 điểm mạnh nhất (giữ bằng mọi giá)

1. **Kiến thức mạng trung cấp gần như chính xác tuyệt đối, và engine THI
   HÀNH đúng điều được dạy.** Ghế kỹ thuật kiểm tay từng con số VLSM của
   mọi bài tập M13 và bản cắt capstone (60/25/10 máy → /26 /27 /28,
   wildcard 0.0.0.63/0.0.0.15/0.0.0.3) — không một số sai; native lệch,
   implicit deny, AD 0 < 1 < 110, longest-prefix-match đều đúng chuẩn và
   có mô phỏng tái hiện thật.
2. **Cơ chế học giữ nguyên bản chất ở cả 9 module mới.** Productive
   failure đứng TRƯỚC màn dạy ở đủ bốn chỗ spec gọi đích danh; bẫy AGDLP
   được engine chấm thật bằng cặp goal chống lối tắt (có test khóa);
   fading AGDLP 0→1→2 leo thang thật; cung điện OSPF 8 phòng chuẩn từng
   ly kể cả ghi chú NBMA của Attempt.
3. **Hai terminal fidelity chắc tay hiếm thấy.** CLI 5 chế độ đúng hình
   dạng IOS, từ chối bằng đúng câu; PS ghi im lặng như thật, idempotent;
   các đơn giản hóa cố ý đều khai công khai đầu file — trừ đúng những
   phát hiện ghi dưới.
4. **Kỷ luật kỹ thuật phần mới nguyên vẹn.** Engine thuần TS, schema
   gate CHẠY THẬT mọi lời giải mẫu lúc parse, luật viết một lần
   (applyTopologyChange chung lab/CLI), persist migrate từng bậc có
   fixture; i18n parity 529/529 key, bản EN là transcreation.
5. **Động lực có đạo đức được giữ qua bề mặt mới.** Gõ miễn phí / Nộp
   tính lượt nhất quán mọi console; màn tốt nghiệp KHÔNG cộng XP và bất
   biến đó có test; không ngả farm XP mới nào mở ra.

### 5 vấn đề lớn nhất

1. **[P0] `show spanning-tree` dán vai `Desg` cho chính root port** —
   bảng terminal nói ngược điều bài 15 vừa dạy ("mỗi switch không phải
   root có đúng một root port"); trớ trêu là `computeStp` ĐÃ tính sẵn
   rootPorts nhưng không trả ra. Sửa S. *(mục 5, ghế 3)*
2. **[P0] Dạy "mặc định mười lăm phút" cho replication giữa site** (AD
   thật: 180 phút, 15 là mức tối thiểu) — con số sai nằm cả trong
   flashcard, tức lịch SM-2 sẽ ôn nó tới thuộc lòng. Sửa S. *(ghế 4)*
3. **[P0] Ví dụ wildcard "0.0.0.1 để chỉ riêng các địa chỉ lẻ" sai** —
   0.0.0.1 bỏ qua bit cuối nên khớp cả chẵn lẫn lẻ theo cặp, tự mâu
   thuẫn với luật "bit 1 là mặc kệ" dạy ngay màn trước; wildcard là nền
   của cả M16 lẫn M17. Hai ghế bắt độc lập. Sửa S. *(ghế 2 + 6)*
4. **Capstone — đỉnh của khóa — đo yếu đúng chỗ đắt nhất.** Ca bệnh hai
   tầng lộ đáp án bằng cue "phương án bao trùm" (practice lẫn thi, không
   test nào chặn); nslookup trả lời xuyên đường L2 đã đứt (bằng chứng
   phi vật lý); nửa bệnh L2 không có cửa khám (spec 4.2 hứa CLI thiết bị
   trong phòng khám nhưng ca không được cấp); chặng 2 lặng lẽ đánh rơi
   phòng kỹ thuật khỏi "cùng một mạng"; và câu CLI trong bài thi vẫn
   chấm sống từng mục tiêu — mâu thuẫn lời hứa "không có gợi ý giữa
   chừng". *(ghế 1, 4, 5, 15)*
5. **Kỹ năng đích số 1 của trung cấp — TỰ THIẾT KẾ VLSM — không bị đo ở
   cổng mastery nào** (M13 là module trung cấp duy nhất không có câu
   trụ, drill không gate, capstone chặng 1 cho sẵn bản cắt); và **chiến
   lược tải nội dung vẫn chưa tồn tại**: 1.6MB JSON của 21 module dồn
   một chunk 1.1MB modulepreload chặn trước first paint, kèm ~46KB gzip
   zod chết trong PROD. *(ghế 1, 10, 12)*

---

## 2. Bảng điểm 15 mảng

**Điểm trung bình: 7.6/10.**

| # | Mảng | Điểm | Một câu phán quyết |
|---|------|:----:|--------------------|
| 1 | Sư phạm & khoa học học tập | 7.5 | Cơ chế học M13-21 dựng đúng và đẹp ở hầu hết chỗ spec gọi tên — productive failure, fading AGDLP, cung điện OSPF, chuỗi capstone — nhưng ca bệnh hai tầng chốt hạ tự lộ đáp án và kỹ năng thiết kế VLSM không bị đo ở cổng nào, đúng hai chỗ quan trọng nhất của phép đo. |
| 2 | Độ chính xác kỹ thuật hạ tầng (VLSM/trunk/STP/OSPF/ACL) | 8.0 | Kiến thức mạng của M13-17 chính xác gần như tuyệt đối và engine thi hành đúng điều được dạy — chỉ một câu deepDive về wildcard dạy sai thật sự, còn lại là vài khe fidelity nhỏ chưa khai với người học. |
| 3 | Fidelity CLI kiểu IOS | 7.2 | Engine CLI mô phỏng chế độ, cú pháp và hành vi lệnh chắc tay hiếm thấy, nhưng bảng show spanning-tree gán vai Desg cho chính root port — mâu thuẫn với điều bài 15 vừa dạy — cộng một chùm khuôn show lệch IOS chưa khai. |
| 4 | Độ chính xác hệ thống (DHCP/DNS/AD/giám sát) | 7.5 | Kiến thức DHCP/DNS/AD/giám sát vững chắc và engine PS trung thực với AD thật hiếm thấy, nhưng một con số replication sai-mặc-định lọt vào flashcard SM-2, các file log sinh script tự mâu thuẫn ở chỗ tinh, và ca hai-bệnh capstone đưa ra bằng chứng nslookup vật lý không thể có. |
| 5 | Tâm lý học động lực | 7.8 | Kỷ luật động lực trên các bề mặt mới rất chắc — gõ miễn phí/nộp tính lượt nhất quán, tốt nghiệp không XP có test chốt, không mở ngả farm mới — chỉ vướng một chỗ đau: câu CLI trong bài thi mastery vẫn chấm sống từng mục tiêu, mâu thuẫn với lời hứa "không có gợi ý giữa chừng". |
| 6 | Ngôn ngữ & microcopy | 7.8 | Chữ nghĩa M13-21 vào loại hiếm — giọng đều, ẩn dụ đắt, explain thật sự giải thích — nhưng bị trừ vì một ví dụ wildcard dạy sai, thuật ngữ "cổng dịch vụ" trôi khỏi luật port/cổng ở M17-18, và vài vết gợn nhỏ về nhất quán. |
| 7 | Hình khái niệm & dual coding | 7.8 | Mảng hình trung cấp là hàng tay nghề thật: soi 67 hình + 8 phòng OSPF không ra một lỗi kiến thức nào (số liệu, chiều mũi tên, thứ tự bậc đều chuẩn), chỉ vướng một chữ "cổng" sai quy ước thuật ngữ và một cặp phòng OSPF na ná bóng dáng. |
| 8 | UX & luồng thực hành | 8.1 | Các bề mặt mới chạy tròn trịa, lối thoát có ở mọi màn, hành vi then chốt đều bị test khóa — chỉ còn sáu vết gợn P2, không một lỗi dạy sai hay ngõ cụt nào. |
| 9 | Khả năng tiếp cận (a11y) | 7.5 | A11y bề mặt trung cấp làm có chủ đích và có test thật (tên nút mang trạng thái STP/trunk, live region CLI, contrast part-d/e đo bằng test), chỉ còn vài lỗ nhỏ: VlsmDrill rơi focus lúc mở phiên và bảng tiêu chí chỉ nói trạng thái bằng ký hiệu + màu. |
| 10 | Giá trị đo lường (assessment) | 7.5 | Bộ đề M13-21 đo thật thứ nó dạy ở đa số điểm chạm — pool đúng luật, câu trụ bám kỹ năng, distractor tử tế — nhưng M13 không có câu trụ nào nên đề rút ra có thể hụt mất kỹ năng VLSM, một câu CLI chấm sai cách sửa hợp lệ, và hai ca bệnh chốt khóa đoán được không cần khám. |
| 11 | Kiến trúc & chất lượng mã | 8.2 | Kiến trúc phần mới rất kỷ luật — engine thuần, luật viết một lần, schema gate chạy thật lời giải, test hành vi dày — nhưng còn hai vết P1: CLI nhận cú pháp extended cho ACL số chuẩn, và cột đếm match/bảng MAC của console không bao giờ có dữ liệu ở bề mặt thật. |
| 12 | Hiệu năng | 6.5 | Bài code-split của hội đồng trước được trả lời tử tế ở tầng route và console, nhưng câu hỏi trung tâm — nội dung phình 12→21 module — vẫn chưa giải: 1.6MB JSON dồn một chunk 1.1MB (gzip 274KB) modulepreload trước first paint, kèm ~46KB gzip zod chết trong PROD nằm ngay đường nóng. |
| 13 | i18n & song ngữ | 8.2 | Song ngữ phần trung cấp làm thật chứ không làm phép: parity 529/529 key khớp cả bộ placeholder, bản EN là transcreation tay nghề cao, không một chuỗi Việt trần trong UI mới — chỉ còn ba gợn nhỏ đều sửa dưới một giờ. |
| 14 | Riêng tư, dữ liệu & độ bền | 7.5 | Cửa migrate v1→v4 kỷ luật, có fixture thật và test xanh, xuất/nhập backup gánh trọn trường mới; nhưng nút "Dùng cửa sổ này" ghi đè tiến độ mới bằng RAM cũ, và bài dở lab gặp nội dung đã đổi thì thiết bị mới tàng hình không đường thoát — hai lỗ mất-dữ-liệu-im-lặng đúng loại mà mảng này tồn tại để chặn. |
| 15 | Capstone & khép khóa | 7.2 | Capstone có xương sống tốt (số liệu VLSM/wildcard/ACL đúng tuyệt đối, màn tốt nghiệp sạch và có test đủ 4 bất biến) nhưng đỉnh của cả khóa — ca bệnh liên tầng — đưa bằng chứng phi vật lý (nslookup sống trên đường L2 đã đứt) và bắt người học đoán nửa bệnh L2 vì không có cách nào soi trunk, cộng chuỗi 3 chặng lặng lẽ đánh rơi phòng kỹ thuật khỏi "cùng một mạng". |

---

## 3. 14 phát hiện nặng nhất — kết quả phản biện chéo

Chi tiết đầy đủ (kèm ghi chú phản biện) nằm trong mục ghế tương ứng ở mục 5.

| # | Ghế | Trước → Sau PB | Công | Phát hiện |
|---|-----|:---:|:---:|-----------|
| 1 | Độ chính xác kỹ thuật hạ tầng | P0 → P1 | S | DeepDive wildcard dạy sai: 0.0.0.1 không hề 'chỉ riêng các địa chỉ lẻ' |
| 2 | Fidelity CLI kiểu IOS | P0 | S | show spanning-tree gán vai 'Desg' cho root port — dạy sai vai cổng, mâu thuẫn với chính bài 15 |
| 3 | Độ chính xác hệ thống | P0 | S | Dạy sai mặc định replication giữa site: 15 phút thay vì 180 phút — và flashcard SM-2 sẽ khắc sâu con số sai |
| 4 | Ngôn ngữ & microcopy | P0 | S | Ví dụ wildcard 0.0.0.1 'chỉ riêng các địa chỉ lẻ' dạy sai kiến thức |
| 5 | Capstone & khép khóa | P0 → P1 | M | Ca liên tầng cho nslookup trả lời thành công qua đường L2 đã đứt — bằng chứng phi vật lý ngay trong bài dạy đọc bằng chứng |
| 6 | Sư phạm & khoa học học tập | P1 | S | Ca bệnh hai tầng của capstone tự lộ đáp án — anchor chốt hạ của cả trung cấp đo test-wiseness, không đo chẩn đoán |
| 7 | Sư phạm & khoa học học tập | P1 | M | Kỹ năng đích số 1 của trung cấp — TỰ THIẾT KẾ VLSM — không bị đo ở bất kỳ cổng mastery nào |
| 8 | Fidelity CLI kiểu IOS | P1 | S | CLI nhận ACL số 1-99 với cú pháp extended rồi in 'Standard IP access list' kèm dòng luật extended — cấu hình này gõ trên IOS thật là lỗi |
| 9 | Độ chính xác hệ thống | P1 | M | Ca hai-bệnh capstone: nslookup trả lời được dù đường tới DNS server đã đứt — bằng chứng vật lý không thể có, mâu thuẫn với chính bài NXDOMAIN của Module 18 |
| 10 | Độ chính xác hệ thống | P1 | S | Explain của m20-mt-ps2 trích sai timestamp dòng ERROR — mâu thuẫn trực tiếp với dữ liệu học viên vừa lọc ra |
| 11 | Độ chính xác hệ thống | P1 | S | srv-dhcp.log tự mâu thuẫn: cấp trùng IP cho nhiều MAC và scope "cạn" vẫn tiếp tục cấp — chính là bệnh trùng IP mà Module 18 vừa dạy phải tránh |
| 12 | Tâm lý học động lực | P1 | M | Câu CLI trong bài thi mastery vẫn chấm sống từng mục tiêu — mâu thuẫn lời hứa "không có gợi ý giữa chừng" và làm câu đó gần như điểm cho không |
| 13 | Ngôn ngữ & microcopy | P1 | S | Thuật ngữ trôi: 'cổng dịch vụ' / 'cổng 53' cho port TCP/UDP ở M17 và M18, ngược luật port/cổng và ngược chính M5 |
| 14 | Hình khái niệm & dual coding | P1 | S | Hình ACL mở rộng dùng chữ "cổng" cho TCP/UDP port, phạm quy ước thuật ngữ toàn dự án |

---

## 4. 14 phát hiện P1 chưa kiểm chéo (`○`)

Vòng phản biện giới hạn 14 ghế; các P1 dưới đây có bằng chứng trỏ file
nhưng chưa được tái lập độc lập — chi tiết ở mục ghế tương ứng.

1. `○` **[Hình khái niệm & dual coding]** Hai phòng OSPF Exchange và Full na ná nhau: cùng bóng dáng "hai hình chữ nhật chồng chéo" — *src/features/palace/RoomGlyph.tsx:263-269 (ospf-two-envelopes) và :280-287 (ospf-twin-maps)*
2. `○` **[Khả năng tiếp cận]** VlsmDrill rơi mất focus khi mở phiên: nút "Bắt đầu" unmount mà không có gì nhận focus — *src/features/drill/VlsmDrill.tsx:170 (nút start unmount khi phase đổi) và :247-254 (ô nhập đầu tiên KHÔNG có autoFocus)*
3. `○` **[Giá trị đo lường]** M13 không có câu trụ nào — đề rút ra có thể vắng sạch câu VLSM tính-tay, gate đo trượt kỹ năng chính — *content/modules/module-13.json:797-947 (pool 12 câu: 5 mcq + 6 typed + 1 order, không câu nào thuộc kind trụ)*
4. `○` **[Giá trị đo lường]** m14-mt-cli-2 chấm rớt cách sửa hợp lệ mà chính lời giải của nó công nhận: goal đóng đinh phải sửa ở sw-2 — *content/modules/module-14.json:1159 (goal {kind:'native-vlan', deviceId:'sw-2', vlan:1}), 1137/1147 (init: sw-1 native 1, sw-2 native 99), 1171 (explain: 'Sửa đầu nào cũng được, miễn khớp')*
5. `○` **[Giá trị đo lường]** Hai ca bệnh chốt khóa (m18-mt-ca, m21-mt-ca) đậu được bằng hai cú click, không cần gõ lệnh khám nào — và lựa chọn chẩn đoán có cue kép — *src/features/clinic/ClinicRoom.tsx:107 + src/engine/clinic/gradeClinic.ts:40 (choose-action = chọn diagnosisIndex + actionIndex, không đọc dấu vết terminal)*
6. `○` **[Kiến trúc & chất lượng mã]** CLI nhận cú pháp ACL mở rộng cho số hiệu 1-99 (ACL chuẩn) — thiết bị thật từ chối — *src/engine/cli/interpret.ts:185 (`number < 1 || number > 199`), src/engine/cli/show.ts:298 (in nhãn 'Standard IP access list' cho số ≤99)*
7. `○` **[Kiến trúc & chất lượng mã]** Cột đếm match của `show access-lists` và bảng `show mac address-table` không bao giờ có dữ liệu ở mọi bề mặt thật — *src/engine/cli/state.ts:62 (tham số `net?` của initialCliState), src/features/cli/CliConsole.tsx:151,218 (không nơi nào truyền net — grep toàn repo xác nhận), src/engine/cli/interpret.ts:314,330*
8. `○` **[Hiệu năng]** Toàn bộ 21 module (1.6MB JSON) vẫn là MỘT chunk eager 1.1MB chặn trước first paint — vấn đề số 4 của hội đồng trước to gấp đôi chứ chưa được giải — *src/content/index.ts:10-13 (import.meta.glob eager:true)*
9. `○` **[Hiệu năng]** Zod và toàn tháp schema vẫn ship + thực thi lúc khởi động dù PROD không bao giờ validate — tối ưu 'bỏ validate' mới tiết kiệm CPU, chưa tiết kiệm byte nào — *src/content/index.ts:29-30 (nhánh PROD không gọi parseModule)*
10. `○` **[Riêng tư, dữ liệu & độ bền]** Nút "Dùng cửa sổ này" không rehydrate — cửa sổ giành lại quyền ghi đè tiến độ mới bằng state RAM cũ — *src/components/SingleWindowGuard.tsx:50-54*
11. `○` **[Riêng tư, dữ liệu & độ bền]** Bài dở lab không có lưới đỡ nội-dung-đã-đổi: thiết bị mới của spec tàng hình, "Về sơ đồ ban đầu" cũng không cứu được — *src/features/lab/NetworkLab.tsx:167-174 và 307-311*
12. `○` **[Capstone & khép khóa]** Nửa bệnh L2 của cả hai ca liên tầng không thể khám ra trong app — chỉ đoán được bằng loại trừ, trái luận đề 'mỗi tầng một tấm bằng chứng' của chính module — *src/features/clinic/ClinicTerminal.tsx:2 ('không sơ đồ' trong pha khám), src/features/clinic/ClinicRoom.tsx:201-216 (nhánh choose-action chỉ có terminal + hai bảng chọn), đối chiếu SPEC-TRUNG-CAP.md:198-202*
13. `○` **[Capstone & khép khóa]** Chuỗi 3 chặng không 'trên CÙNG một mạng': phòng kỹ thuật và dải /27 lặng lẽ bốc hơi từ chặng 2, sơ đồ vật lý bị đập dựng lại không một lời — *content/modules/module-21.json:111-186 (chặng 1: ba phòng kd/kt/kh, ba switch, router có cổng .65/27) vs 407-520 (chặng 2: chỉ còn kd VLAN 10 + khách VLAN 20, hai switch, router chỉ còn g0 /26, g1 /28, g2 /30), đối chiếu SPEC-TRUNG-CAP.md:163-165 và chính lời module tại dòng 57*
14. `○` **[Capstone & khép khóa]** Pool tổng ôn 14 câu (không phải 15 như TRANG-THAI ghi) và trống hoàn toàn M15 STP — 'tổng ôn trá hình cả trung cấp' hở đúng một module — *content/modules/module-21.json:1237-1677 (đếm đúng 14 id m21-mt-*, grep 'STP|vòng lặp|spanning' toàn file: 0 kết quả), đối chiếu SPEC-TRUNG-CAP.md:87 (M15 = STP) và TRANG-THAI.md:630*

---

## 5. Chi tiết từng ghế

### Ghế 1 — Sư phạm & khoa học học tập (7.5)

Cơ chế học M13-21 dựng đúng và đẹp ở hầu hết chỗ spec gọi tên — productive failure, fading AGDLP, cung điện OSPF, chuỗi capstone — nhưng ca bệnh hai tầng chốt hạ tự lộ đáp án và kỹ năng thiết kế VLSM không bị đo ở cổng nào, đúng hai chỗ quan trọng nhất của phép đo.

Điểm mạnh nổi bật:

- Productive failure đứng TRƯỚC màn dạy ở đủ bốn chỗ spec gọi đích danh: M14 bài 1 thả vào Switch> mò show vlan brief (content/modules/module-14.json:30), M15 bài 1 mạng tam giác stpEnabled:false chỉ cho mỗi quyền setStp — muốn hết bão phải bật STP chứ không rút dây được (module-15.json:30,36,103), M17 bài 1 tự tra show access-lists, M19 bài 3 bẫy AGDLP bằng PS (module-19.json:361)
- Bẫy AGDLP được engine chấm thật chứ không chấm miệng: goal group-member tính xuyên nhóm lồng nhóm, cặp goal GG+DL khiến lối tắt nhét-user-thẳng-vào-DomainLocal bị bắt quả tang — và điều này bị khóa bằng test (src/engine/ps/gradePs.ts:22-28, src/engine/ps/psGroups.test.ts:124-131)
- Worked example fading AGDLP đúng 0→1→2 và leo thang thật: bài 3 đọc sơ đồ mẫu (fading 0 + workedExample), bài 4 điền một mắt xích thiếu (2 goal), bài 5 tự xếp hai user từ yêu cầu suông (4 goal) (module-19.json:427,587,761)
- Cung điện OSPF M16 chuẩn từng ly: tour tầng 1-2 ở bài 2 rồi walk ngay trong recall cùng bài, tầng 3-4 ở bài 3, bài thi phủ đủ 8 phòng — tất cả khóa bằng test kể cả ghi chú NBMA của Attempt (src/content/content.test.ts:165-191)
- Capstone 3 chặng đúng nghĩa trên CÙNG một mạng: bản địa chỉ 10.40.0.x xuyên suốt chặng 1→3, chặng 3 giữ cặp mục tiêu phải-thông + phải-chặn, và kỷ luật XP nguyên tắc 5 giữ nguyên (src/store/progress.ts:9-10,459-466; màn tốt nghiệp không cộng XP)

- `✓PB` **[P1/S] Ca bệnh hai tầng của capstone tự lộ đáp án — anchor chốt hạ của cả trung cấp đo test-wiseness, không đo chẩn đoán.**
  Bằng chứng: content/modules/module-21.json:1659,1667 (m21-mt-ca) và :1122,1130 (m21-b4-prac-ca)
  Cả hai ca hai-bệnh (practice bài 4 lẫn câu chốt bài thi M21) đều có đúng một lựa chọn mở đầu bằng "HAI bệnh chồng nhau…" / "Sửa CẢ HAI…" trong khi hai distractor tự nhận "Một bệnh duy nhất…" / "Chỉ sửa…". Đề còn dặn "khám cho ĐỦ, đừng dừng ở dấu chân đầu tiên" — tức người học không cần mở terminal vẫn chọn đúng cả diagnosis lẫn action bằng mẹo chọn-phương-án-bao-trùm. Tệ hơn: practice và exam dùng CÙNG cặp bệnh (trunk lệch native + DNS sai) với cùng khung câu chữ, nên lượt thi đo trí nhớ về bài practice. Test chống cue độ-dài (content.test.ts:434) chỉ quét kind mcq nên không bắt được. Đây là đúng cái ca spec gọi là "tổng ôn trá hình của CẢ trung cấp" — phép đo hỏng ở chỗ đắt nhất.
  → Giữ schema, chỉ sửa data: cả ba lựa chọn đều là "HAI bệnh" nhưng cặp bệnh khác nhau (vd. distractor "trunk thiếu allowed list + DNS chết", "native lệch + gateway sai") — muốn chọn đúng buộc phải khám ra ĐÚNG cặp. Đồng thời đổi cặp bệnh giữa practice bài 4 và exam (vd. practice dùng allowed-list thiếu + thiếu bản ghi). Thêm một dòng test content khóa: các choices của ca hai tầng không được phân lớp một-bệnh/hai-bệnh.
  *Phản biện: Đã mở content/modules/module-21.json: đúng dòng 1122/1130 (m21-b4-prac-ca, id ở dòng 1002) và 1659/1667 (m21-mt-ca, id ở dòng 1538). Cả hai ca đều có đúng một lựa chọn "HAI bệnh chồng nhau…"/"Sửa CẢ HAI…" là đáp án (answerIndex 0), hai distractor tự khai "Một bệnh duy nhất…"/"Chỉ…" — cue bao-trùm có thật ở cả diagnosis lẫn action, 4/4 chỗ. Đề exam còn nhắc thẳng "khám cho ĐỦ, đừng dừng ở dấu chân đầu tiên" (dòng 1540), hint practice cũng mớm "đủ dấu chân mới đếm đủ con" (1136). Cả hai ca dùng fix kind "choose-action" (dòng 1118, 1655) — kiểm src/engine/clinic/gradeClinic.ts xác nhận kiểu này chấm thuần ở tầng chọn lựa, terminal không bắt buộc, nên khẳng định "không cần mở terminal vẫn ăn điểm" đúng. Trùng lặp practice/exam: bệnh trunk GIỐNG HỆT (SW-1 native 10 vs SW-2 native 1, cùng khung topology 2 site); bệnh DNS hơi khác (practice: thiếu bản ghi; exam: bản ghi trỏ sai) — ghế nói "cùng cặp bệnh" hơi quá một nấc nhưng cùng tầng, cùng khung chữ, không đổi bản chất. src/content/content.test.ts:434 đúng là test chống cue độ-dài và dòng 453 `if (q.kind !== 'mcq') continue` xác nhận nó bỏ qua clinic-case — không có hàng rào nào bắt lỗi này. Ca m21-mt-ca là anchor luôn vào đề (comment test dòng 419: ca bệnh luôn vào đề). Phép đo hỏng ở câu chốt capstone, không có test chặn — giữ nguyên P1.*
- `✓PB` **[P1/M] Kỹ năng đích số 1 của trung cấp — TỰ THIẾT KẾ VLSM — không bị đo ở bất kỳ cổng mastery nào.**
  Bằng chứng: content/modules/module-13.json:921 (m13-mt-11, câu gần nhất với thiết kế); module-21.json:109 (m21-b1-prac-lab)
  Spec mục 1 chốt "Thiết kế dải VLSM… đo: drill VLSM + bài thi M13". Nhưng: (a) pool M13 là module trung cấp duy nhất KHÔNG có câu trụ nào — 12 câu toàn mcq/typed/order tính từng bước lẻ (m13-mt-11 chỉ hỏi một địa chỉ trong bản cắt), còn drill VLSM 3-tiêu-chí (nơi duy nhất chấm trọn một bài thiết kế) không gate gì cả; (b) capstone chặng 1 cũng không bắt tự cắt: bản cắt cho sẵn trong worked example, router đã mang sẵn địa chỉ ".1/26 .65/27 .97/28" từ tờ giấy, goals chỉ là 3 ping sau khi gán IP cho PC. Người học có thể đậu M13 lẫn M21 mà chưa từng tự cắt trọn một dải nào — mastery gate (nguyên tắc 2) không chạm tới kỹ năng module sinh ra để dạy.
  → Rẻ nhất: nâng 1-2 câu typed trong pool M13 thành bài cắt trọn (cho dải + 3 phòng, hỏi đủ ba địa chỉ mạng — vẫn kind typed, chấm ba accept) và thêm một câu tương tự vào pool M21. Đúng bài hơn (đắt hơn): thêm goal kiểu "pc nằm đúng cỡ subnet nhỏ nhất đủ dùng" cho lab chặng 1, hoặc mở kind câu hỏi 'vlsm' dùng lại bộ chấm 3 tiêu chí của drill làm câu trụ M13.
  *Phản biện: Tái lập đủ từng khẳng định. Đã mở: SPEC-TRUNG-CAP.md dòng 24-25 đúng nguyên văn "đo: drill VLSM + bài thi M13". module-13.json: pool masteryTest 12 câu toàn mcq/typed/order, m13-mt-11 ở dòng 921 chỉ chấm MỘT địa chỉ; đối chiếu module 14-21 đều có ít nhất một câu trụ (cli/lab/ps/clinic/palace-walk) — M13 là module trung cấp duy nhất không có. Drill VLSM (src/main.tsx route /luyen-vlsm, VlsmDrill.tsx) chỉ ghi drillHistory + XP qua recordDrillSession (progress.ts) — mở khóa module chỉ dựa mastery test >=85% (masteryGate), drill không gate gì. module-21.json: m21-b1-prac-lab đúng dòng 109, router gán sẵn .1/26 .65/27 .97/28 (dòng 172-174), bản cắt cho sẵn trong workedExample (dòng 69), goals đúng 3 ping, allow chỉ setIp. Kiểm thêm: toàn bộ exercise trong bài học M13 cũng chỉ hỏi từng bước lẻ — không bề mặt bắt buộc nào yêu cầu cắt trọn một dải. Ghi chú nhỏ không đổi mức: m13-mt-11 thực tế buộc chạy ngầm bản cắt 2 khối mới ra đáp án, nhưng chỉ chấm một ô và rút 8/12 có thể bỏ qua câu này. Giữ P1: kỹ năng đích số 1 của trung cấp không bị đo ở bất kỳ cổng mastery nào — đúng như ghế nêu.*
- `○` **[P2/S] Các bất biến cơ chế học trung cấp mà spec gọi đích danh chưa được khóa bằng test — lệch chuẩn bảo hiểm chính repo đặt ra ở nhập môn.**
  Bằng chứng: src/content/content.test.ts:165,350,385 (chỉ M16 palace + hai test M17 là của trung cấp) so với :53 (M4), :199 (M9), :216 (M11), :280,:326 (M12)
  Nhập môn khóa mọi chiêu sư phạm điểm nhấn bằng test suy-từ-dữ-liệu: M4 lab-trước-lý-thuyết, M9 fading 0→1→2, M11 100% productive failure, M12 generation effect + fading không lùi. Trung cấp chỉ khóa M16 palace và hai bất biến M17; KHÔNG có test nào giữ: M14 bài 1 CLI-pretest trước màn dạy trunk, M15 bài 1 bão-quảng-bá trước màn dạy STP (spec gọi là "productive failure trứ danh của module"), M19 chuỗi AGDLP fading 0→1→2 (fading dọc M19 là 0,1,0,1,2 nên test kiểu M12 không áp thô được — càng cần test riêng theo chuỗi bài 3→5), M13 drill='vlsm', M20 log 150-200 dòng có distractor WARNING, M21 bài thi kết bằng ca hai tầng. Hôm nay tất cả đều ĐÚNG (đã kiểm từng cái ở trên) — nhưng một lần refactor nội dung dời pretest xuống sau màn dạy sẽ im lặng qua CI, trong khi cùng lỗi đó ở M4/M11 làm test đỏ ngay.
  → Viết ~6 test theo đúng khuôn có sẵn trong content.test.ts (mỗi cái 5-15 dòng): kind pretest của m14-bai-1/m15-bai-1/m19-bai-3, chuỗi fadingLevel của m19 bài 3→5, m13.drill === 'vlsm', độ dài file log các bài ps M20 chủ lực, masteryTest M21 kết bằng clinic có đủ hai bệnh trong spec.
- `○` **[P2/S] M15: câu chốt bài thi là typed thường trong khi hai module lab-trọng-tâm trước nó đều kết bằng câu làm-thật.**
  Bằng chứng: content/modules/module-15.json (masteryTest: lab và cli nằm ở vị trí 9-10, câu cuối pool là typed); so với luật đã chốt cho M4 (content.test.ts:81-86), M11 (:266-272), M12 (:343-348)
  Pool được xáo khi rút nên thứ tự trong file không quyết định thứ tự đề — nhưng dự án đã lập luật riêng "câu chốt phải là câu làm thật" cho M4/M11/M12 và làm đúng luật đó ở M16 (lab cuối), M17/M18/M21 (clinic cuối), M19/M20 (ps cuối). M15 là module duy nhất của trung cấp có anchor (lab bão + cli spanning-tree) mà không đặt câu làm-thật ở vị trí chốt pool, và cũng không có test nào nói M15 phải kết bằng gì. Đây là gợn nhất quán của phép đo hơn là lỗi: anchor vẫn luôn vào đề nhờ masteryPool.ts:35, chỉ vị trí kết màn (peak-end) là lệch nếp.
  → Nếu drawMasteryTest/màn thi có nếp đặt anchor cuối đề thì bỏ qua finding này; nếu không, dời câu lab m15 xuống cuối pool cho cùng nếp các module anh em, và thêm một dòng test chung "module có anchor thì câu cuối pool là anchor" thay vì ba test lẻ M4/M11/M12 hiện tại.

### Ghế 2 — Độ chính xác kỹ thuật hạ tầng (VLSM/trunk/STP/OSPF/ACL) (8.0)

Kiến thức mạng của M13-17 chính xác gần như tuyệt đối và engine thi hành đúng điều được dạy — chỉ một câu deepDive về wildcard dạy sai thật sự, còn lại là vài khe fidelity nhỏ chưa khai với người học.

Điểm mạnh nổi bật:

- Toàn bộ số liệu VLSM đúng tuyệt đối — tôi kiểm từng con số của mọi bài tập và mastery test module 13 (ví dụ m13-mt-11, content/modules/module-13.json:921-929: /25 rồi /27 tại .128 — chuẩn), luật căn khối, thứ tự cắt to-trước, tóm tắt tuyến 4×/24→/22 đều dạy đúng và bộ chấm gradeVlsm (src/engine/subnet/vlsm.ts:139-210) thi hành đúng cả ba tiêu chí kể cả 'không phí đất'
- Ca native VLAN lệch dạy đúng cơ chế (module-14.json:371) và engine tái hiện trung thực đúng bệnh: khung trần rơi vào native của cổng nhận, có anomaly 'native-vlan-mismatch' (src/engine/lab/simulate.ts:336-352) — đúng yêu cầu spec 'sim phải tái hiện được'
- 8 trạng thái OSPF neighbor dạy đủ và Attempt được chú thích đúng 'chỉ có ở mạng NBMA' ngay trong phòng cung điện (module-16.json:50-52) — đúng cam kết 'dạy đúng, không làm tròn'; ExStart master theo router ID lớn hơn, hello 10s, AD 1/110, longest-prefix-trước-AD-sau (module-16.json:1126) đều chính xác
- Implicit deny, first-match, thứ tự dòng, standard-gần-đích/extended-gần-nguồn dạy đúng, và engine có số đếm match thật trong show access-lists (src/engine/cli/show.ts:300-302) khớp với điều bài học hứa (module-17.json:153) — chuỗi chẩn đoán 'số đếm không tăng = dòng vô hình ra tay' hoạt động thật
- Văn hóa khai báo đơn giản hóa cố ý rất tốt: đầu stp.ts:15-21, ospf.ts:20-23, acl.ts:13-19 đều liệt kê rõ, và phần lớn được nói thật với người học trong deepDive (cost theo băng thông module-16.json:867, ngữ pháp ACL chuẩn rút gọn module-17.json:426, err-disabled vs administratively down module-17.json:963)

- `✓PB` **[P0→P1/S] DeepDive wildcard dạy sai: 0.0.0.1 không hề 'chỉ riêng các địa chỉ lẻ'.**
  Bằng chứng: content/modules/module-13.json:485
  Câu "Wildcard vì thế linh hoạt hơn mask… ví dụ 0.0.0.1 để chỉ riêng các địa chỉ lẻ" sai hai lần. (1) Wildcard 0.0.0.1 nghĩa là BỎ QUA bit cuối — nó khớp một CẶP địa chỉ chẵn-lẻ liền nhau (ví dụ .0 và .1), không phải mọi địa chỉ lẻ. (2) 0.0.0.1 tương đương chính xác mask /31 (255.255.255.254 đảo lại), nên nó cũng không phải ví dụ cho 'mẫu mà mask không viết nổi'. Ví dụ đúng cho cả hai ý là wildcard 0.0.0.254 với nền kết thúc .1 (bit cuối phải bằng 1, các bit giữa mặc kệ → mọi địa chỉ lẻ trong /24). Người học vừa được dạy luật 'bit 1 là bỏ qua' ở ngay màn trước, đối chiếu là mâu thuẫn — mà wildcard là nền của cả M16 (network statement) lẫn M17 (ACL).
  → Sửa một câu: thay '0.0.0.1 để chỉ riêng các địa chỉ lẻ' thành 'ví dụ nền x.x.x.1 với wildcard 0.0.0.254 để tóm riêng các địa chỉ lẻ trong một /24 — mẫu mà không subnet mask nào viết nổi'.
  *Phản biện: Đã mở content/modules/module-13.json: dòng 485 có nguyên văn "ví dụ 0.0.0.1 để chỉ riêng các địa chỉ lẻ" trong deepDive. Cả hai khẳng định kỹ thuật của ghế đều đúng: (1) wildcard 0.0.0.1 khớp một cặp chẵn-lẻ liền kề, không phải mọi địa chỉ lẻ; (2) 0.0.0.1 là đảo của mask /31 (255.255.255.254) nên không phải "mẫu mà mask không viết nổi". Mâu thuẫn với luật "bit 1 là mặc kệ" ở dòng 482 cùng màn là có thật; ví dụ sửa 0.0.0.254 + nền .1 của ghế kiểm lại đúng. Tuy nhiên hạ P0 xuống P1: câu sai chỉ nằm trong deepDive (phần đọc thêm), còn luật chính dòng 482, MCQ pre và toàn bộ bài practice wildcard đều đúng, không câu chấm điểm nào dựa trên mệnh đề sai — thiệt hại là một câu minh họa gây bối rối, không phải dạy sai cơ chế nền của M16/M17.*
- `○` **[P2/S] show ip ospf neighbor in dòng DOWN kèm lý do — engine tự khai trong code nhưng nội dung không nói thật với người học.**
  Bằng chứng: src/engine/cli/show.ts:205-227 và content/modules/module-16.json:510-512
  Comment trong show.ts thừa nhận 'thiết bị thật không in dòng đó' và tự hứa 'app khai rõ chỗ mình nói nhiều hơn thiết bị' — nhưng lời khai đó chỉ nằm trong code. Nội dung M16 (solution m16-b2-prac-cli: 'Bảng in ra một dòng ở trạng thái DOWN kèm lý do no-ospf-process') kể như đó là hành vi bình thường của lệnh. Trên IOS thật, láng giềng chưa từng gửi hello thì KHÔNG có dòng nào — bảng rỗng. Người học sang thiết bị thật sẽ chờ một cột lý do không tồn tại. Các đơn giản hóa khác của module này đều được khai trong deepDive, riêng chỗ này bị sót.
  → Thêm một câu vào deepDive m16-bai-2 hoặc solution: 'Thiết bị thật không in dòng DOWN kèm lý do — bảng của nó chỉ rỗng; cột lý do là phần app nói thêm để bạn chẩn đoán được.'
- `○` **[P2/S] CLI cho ACL số 1-99 lọc được cả vế đích — điều không thể xảy ra trên thiết bị thật, lời khai trong bài chưa đủ kín.**
  Bằng chứng: src/engine/cli/interpret.ts:183-196 và content/modules/module-17.json:426
  parseAclRule dùng một ngữ pháp duy nhất (protocol + src + dst) cho toàn dải 1-199, và evaluateAcl so cả dst bất kể số hiệu — tức một danh sách 'chuẩn' số 10 trong app vẫn phân biệt được đích. DeepDive m17-bai-2 có khai 'ngoài đời một dòng chuẩn thật gọn hơn dòng bạn gõ ở đây' nhưng không nói thẳng rằng ACL chuẩn thật KHÔNG THỂ so vế đích — trong khi chính bài đó dạy 'chuẩn mù vế đích' làm nền cho quy tắc đặt gần đích. Nếu người học thử nghịch một ACL số 5 có host đích trong app và thấy nó chặn đúng đích, bài học 'mù vế đích' bị chính engine phản bác. May là mọi lab soạn sẵn đều dùng số 101 nên chưa ai vấp.
  → Hoặc (a) thêm nửa câu vào deepDive: 'trong app bạn gõ được vế đích cho cả số 1-99, nhưng thiết bị thật sẽ từ chối — chuẩn thật chỉ nhận vế nguồn'; hoặc (b) chặt hơn: interpret.ts từ chối dst khác any khi number ≤ 99.
- `○` **[P2/S] Mô tả 'established' như thể có trí nhớ — thực tế nó chỉ nhìn cờ TCP, không nhớ gì.**
  Bằng chứng: content/modules/module-17.json:703
  DeepDive viết established 'nhận diện gói của một cuộc trò chuyện đã mở sẵn, tức là mượn tạm một chút trí nhớ mà không cần cả bộ máy stateful'. Thực tế established hoàn toàn KHÔNG có trí nhớ: nó chỉ khớp gói TCP có cờ ACK hoặc RST bật — một phép kiểm stateless trên từng gói, và vì thế lừa được bằng gói ACK giả. Chữ 'trí nhớ' ở đây gieo đúng cái hiểu nhầm mà cả màn dạy (ACL không nhớ ≠ stateful có sổ) vừa cố dập.
  → Sửa thành: 'established không nhớ gì cả — nó chỉ nhìn cờ ACK/RST trên từng gói TCP, thứ chỉ xuất hiện sau khi cuộc gọi đã mở; một phép đoán stateless, rẻ nhưng lừa được, khác hẳn cuốn sổ của tường lửa stateful.'
- `○` **[P2/S] OSPF-lite bỏ ECMP (đường cùng cost chỉ giữ một) — đơn giản hóa chưa được khai ở đầu file.**
  Bằng chứng: src/engine/lab/ospf.ts:261-270
  Khi hai đường tới cùng subnet có cost bằng nhau, engine giữ đường gặp trước (điều kiện 'hop.cost < existing.cost' không đổi khi bằng), tức đường thắng do THỨ TỰ KHAI links trong JSON. Thiết bị thật cài cả hai (equal-cost multipath). Header ospf.ts khai cost-1-mỗi-chặng và bỏ máy trạng thái, nhưng không khai chỗ này — trái nếp 'đơn giản hóa cố ý phải khai ra' mà chính file này và stp.ts/acl.ts theo rất kỷ luật. Nội dung M16 không dạy gì về hòa cost nên chưa dạy sai ai; rủi ro là đề capstone sau này vô tình dựng sơ đồ hai đường cùng cost và bảng show ip route ra kết quả trông tùy hứng.
  → Thêm một dòng vào khối chú thích COST đầu ospf.ts: 'Hai đường cùng cost: giữ đường theo thứ tự khai links, KHÔNG mô phỏng ECMP của thiết bị thật' — và cân nhắc tie-break tất định theo nextHopIp nhỏ hơn cho khỏi phụ thuộc thứ tự JSON.

### Ghế 3 — Fidelity CLI kiểu IOS (7.2)

Engine CLI mô phỏng chế độ, cú pháp và hành vi lệnh chắc tay hiếm thấy, nhưng bảng show spanning-tree gán vai Desg cho chính root port — mâu thuẫn với điều bài 15 vừa dạy — cộng một chùm khuôn show lệch IOS chưa khai.

Điểm mạnh nổi bật:

- Thế giới CLI = chính Topology của phòng lab, mọi lệnh cấu hình đi qua đúng applyTopologyChange dùng chung (src/engine/cli/interpret.ts:425, src/engine/cli/state.ts:3-7) — không có bản sao đồng bộ hai chiều, sửa tay trên canvas là show thấy ngay (có test riêng cli.test.ts:177).
- Máy chế độ trung thực với IOS: exit lùi đúng một bậc còn end nhảy thẳng về privileged (interpret.ts:280-294), show running-config đòi privileged (interpret.ts:334), câu 'Enter configuration commands, one per line.  End with CNTL/Z.' đúng cả hai dấu cách (interpret.ts:267), rút console sang máy khác là về user mode (state.ts:82-84).
- ACL đánh số đúng hành vi thật: seq tự sinh bước 10 và chỉ nối vào cuối (src/engine/cli/config.ts:80-85), implicit deny không in ra (src/engine/cli/show.ts:291), đếm match có số ít/nhiều '(1 match)/(N matches)' (show.ts:301), giọng any/host/wildcard đúng IOS (src/engine/lab/acl.ts:202-206).
- Chốt chặn nội dung rất mạnh: lời giải mẫu phải chạy sạch không dòng nào bị từ chối VÀ đạt trọn mục tiêu, đề bài không được giải sẵn (src/engine/cli/cliSchema.ts:99-114) — loại hẳn loại lỗi 'đề dạy một lệnh không chạy'.
- Hai lời khai lệch IOS kiểm đúng như khai: MAC hai chấm thống nhất toàn app khai ở show.ts:7-13; từ chối trunk-config trên cổng access khai ở interpret.ts:23-28, thi hành bằng thông báo riêng ACCESS_MODE_REJECT (interpret.ts:100, dùng ở 452 và 462) chứ không mượn câu Invalid input — cả hai đều kèm lý do sư phạm thuyết phục.

- `✓PB` **[P0/S] show spanning-tree gán vai 'Desg' cho root port — dạy sai vai cổng, mâu thuẫn với chính bài 15.**
  Bằng chứng: src/engine/cli/show.ts:269; src/engine/lab/stp.ts:142-160; content/modules/module-15.json:558
  show.ts:269 in vai cổng bằng `blocked ? 'Altn' : 'Desg'` — nghĩa là trên switch KHÔNG phải root, cổng hướng về gốc (root port) cũng bị dán nhãn Desg. IOS thật in 'Root FWD' cho cổng đó. Trong khi module-15.json:558 dạy nguyên văn: 'Mỗi switch không phải root có đúng một root port — cổng hướng về gốc cây, luôn được phát' — người học đọc xong, mở terminal gõ show spanning-tree trên switch không phải root sẽ KHÔNG bao giờ thấy vai Root nào, bảng nói ngược bài. Trớ trêu là computeStp ĐÃ tính sẵn rootPorts (stp.ts:142-160) nhưng giữ làm biến cục bộ, không trả ra cho show dùng. Đây là bảng mà lời tựa show.ts tuyên bố 'fidelity phải giữ… mở thiết bị thật ra đọc được ngay', và lệch này KHÔNG được khai ở đâu.
  → Thêm `rootPorts` (map deviceId→PortRef) vào StpState trả về từ computeStp — dữ liệu đã tính sẵn, chỉ cần expose; show.ts in 'Root'/'FWD' cho cổng ấy. Nhân tiện cân nhắc khai luôn dòng 'Root bridge: <tên>' (show.ts:258, test cli.test.ts:139) là dòng tự chế thay cho khối Address/Cost/Port của IOS.
  *Phản biện: Đã mở cả 3 file: show.ts:269 đúng nguyên văn `blocked ? 'Altn' : 'Desg'` — root port trên switch không phải root bị in 'Desg FWD' thay vì 'Root FWD' như IOS thật. stp.ts:142-160 đúng là tính sẵn rootPorts nhưng dòng 173 chỉ trả { rootId, blocked }, vứt rootPorts đi. module-15.json:558 dạy nguyên văn 'Mỗi switch không phải root có đúng một root port… luôn được phát' — bảng terminal nói ngược bài. Lời tựa show.ts (dòng 1-13) cam kết fidelity, chỉ khai duy nhất đơn giản hóa MAC và tuyên bố 'HÀNH VI thì không đơn giản hóa dòng nào'; grep 'Desg' toàn bộ .md không thấy khai lệch này ở đâu. Bonus về dòng 'Root bridge:' (show.ts:258, cli.test.ts:139) cũng đúng. Nuance duy nhất: mâu thuẫn nằm ở deepDive chứ không phải body chính (body 555 chỉ nói Altn/BLK, phần đó bảng in đúng) — nhưng deepDive vẫn là nội dung dạy, bảng vẫn dạy sai vai cổng so với thiết bị thật, và lệch không được khai. Mọi số dòng và trích dẫn của ghế đều chính xác, không thổi phồng → giữ P0.*
- `✓PB` **[P1/S] CLI nhận ACL số 1-99 với cú pháp extended rồi in 'Standard IP access list' kèm dòng luật extended — cấu hình này gõ trên IOS thật là lỗi.**
  Bằng chứng: src/engine/cli/interpret.ts:185; src/engine/cli/show.ts:298
  parseAclRule (interpret.ts:185) chấp nhận number 1..199 và LUÔN đòi đủ protocol + src + dst (cú pháp extended). Trên IOS thật, ACL 1-99 là standard: chỉ nhận source, không có protocol, không có dst — `access-list 10 permit ip any any` bị từ chối. App lại nhận lệnh đó, và show access-lists (show.ts:298) in 'Standard IP access list 10' theo sau là dòng luật dạng extended — một khuôn output không thiết bị thật nào in. Người học tò mò gõ số nhỏ sẽ học được một cú pháp sai và một nhãn Standard/Extended gắn ngược. Nội dung hiện hành chỉ dùng 101 nên không lộ trong bài, nhưng terminal là chỗ gõ tự do.
  → Vì phạm vi chỉ mô hình extended ACL: siết parseAclRule về 100-199 (một dòng sửa điều kiện, từ chối 1-99 bằng % Invalid input) và bỏ nhánh nhãn 'Standard' trong show.ts — hoặc nếu muốn giữ 1-99 thì phải mô hình đúng cú pháp standard, tốn hơn hẳn.
  *Phản biện: Đã mở đúng cả hai file và tái lập nguyên vẹn từng khẳng định. (1) src/engine/cli/interpret.ts:185 đúng là `number < 1 || number > 199` — chấp nhận ACL số 1-99; ngay sau đó (dòng 190-196) LUÔN đòi protocol (ip/icmp/tcp/udp) + src + dst, tức cú pháp extended, không có nhánh standard. (2) Caller tại interpret.ts:386-390: ở config mode trên router, `access-list 10 permit ip any any` sẽ parse thành công và được thêm vào topology — lệnh này trên IOS thật bị từ chối vì ACL 10 là standard. (3) src/engine/cli/show.ts:298 đúng là `list.number <= 99 ? 'Standard' : 'Extended'`, theo sau in aclRuleText (src/engine/lab/acl.ts:209-211) dạng `permit ip any any` — tức nhãn 'Standard IP access list 10' kèm dòng luật extended, khuôn output không tồn tại trên thiết bị thật. (4) Grep content/modules xác nhận nội dung chỉ dùng access-list 101 (module-17, module-21) nên bài học không lộ, chỉ lộ khi gõ tự do trong terminal. Không có thổi phồng: ghế đã tự khai mitigation (nội dung chỉ dùng 101). Giữ P1 vì fidelity terminal là cam kết lõi của app (terminal là chỗ gõ tự do, và lỗi này dạy sai cả cú pháp lẫn nhãn Standard/Extended); đề xuất sửa một dòng (siết về 100-199) là hợp lý và rẻ.*
- `○` **[P2/S] show sai loại thiết bị vẫn trả outcome 'ok' và vẫn ghi dấu 'viewed' — lỗi hiển thị sai màu, cờ chấm bị nhiễm.**
  Bằng chứng: src/engine/cli/interpret.ts:305-312; src/engine/cli/show.ts:60; src/engine/cli/state.ts:39; src/features/cli/CliConsole.tsx:126
  Chạy `show vlan brief` trên router: showVlanBrief trả dòng '% Invalid input…' (show.ts:60) nhưng interpret bọc qua helper `seen` (interpret.ts:305-312) nên outcome là 'ok' và lệnh được ghi vào flags.viewed — trong khi state.ts:39 định nghĩa viewed là 'lệnh show đã chạy TRÓT LỌT'. Hệ quả kép: (1) CliConsole tô màu theo outcome.kind==='error' (CliConsole.tsx:126) nên dòng lỗi này hiện màu chữ thường thay vì hổ phách, lệch với mọi lỗi khác của terminal; (2) mục tiêu chấm kind 'viewed' có thể được tính đạt bởi một lệnh mà máy đã từ chối.
  → Kiểm loại thiết bị TRƯỚC khi gọi hàm show (hoặc cho hàm show trả về cặp {lines, ok}); sai loại thì đi đường failed() như mọi lỗi khác, không ghi viewed.
- `○` **[P2/S] show interfaces trunk: VLAN vừa khai bằng `vlan <n>` không xuất hiện ở mục forwarding, và thiếu hẳn mục 'Vlans allowed and active in management domain'.**
  Bằng chứng: src/engine/cli/show.ts:95, src/engine/cli/show.ts:111
  Mục thứ ba của bảng tính `carried` từ `vlansOnSwitch` — chỉ gom `port.vlan` của các cổng (show.ts:95) mà bỏ qua `declaredVlans`. Người học gõ `vlan 30` + allow 30 trên trunk nhưng chưa gán cổng access nào: `show vlan brief` thấy VLAN 30, còn mục forwarding của `show interfaces trunk` lại không liệt kê 30 — hai bảng cãi nhau về cùng một VLAN database. IOS thật lấy allowed ∩ VLAN active trong database nên CÓ in 30. Ngoài ra bảng thật có 4 mục, ở đây thiếu mục 'Vlans allowed and active in management domain' — chưa khai ở đâu (lời tựa show.ts chỉ khai mỗi vụ MAC).
  → Gộp declaredVlans vào vlansOnSwitch (một dòng, có sẵn helper vlansCarriedBy ở topology.ts:363); mục 'allowed and active' thì hoặc thêm hoặc khai một dòng vào lời tựa show.ts là bỏ cố ý.
- `○` **[P2/S] show ip ospf neighbor lệch khuôn IOS chưa khai đủ: có dòng 'Router ID' tự chế, thiếu cột Pri/Dead Time, state FULL thiếu hậu tố /DR|/BDR|/-.**
  Bằng chứng: src/engine/cli/show.ts:217-225
  Docstring (show.ts:205-213) chỉ khai một lệch: in thêm dòng neighbor DOWN kèm lý do. Nhưng bảng còn ba lệch nữa không khai: (1) dòng đầu 'Router ID x.x.x.x' — lệnh thật không in Router ID của chính mình; (2) khuôn cột thật là Neighbor ID / Pri / State / Dead Time / Address / Interface — ở đây thiếu Pri và Dead Time (bỏ Dead Time là hợp lý vì sim không có timer, nhưng phải khai); (3) state in 'FULL' trần — IOS luôn in FULL/DR, FULL/BDR hoặc FULL/-. Người học quen bảng này xong mở thiết bị thật sẽ vấp đúng chỗ cột lạ — ngược mục tiêu fidelity tự tuyên bố.
  → In 'FULL/-' (một chuỗi, trung thực vì sim không bầu DR) và bổ sung các lệch còn lại vào docstring khai đơn giản hóa; cân nhắc bỏ dòng Router ID hoặc khai nó.
- `○` **[P2/S] show ip route bảng rỗng in '% Network not in table' — IOS chỉ in câu đó khi tra MỘT đích cụ thể; thiếu dòng 'Gateway of last resort is not set'.**
  Bằng chứng: src/engine/cli/show.ts:197
  Khi router chưa có tuyến nào, show.ts:197 in '% Network not in table'. Trên IOS thật, câu đó chỉ xuất hiện với `show ip route <đích>` không khớp; còn `show ip route` bảng rỗng chỉ in khối Codes + 'Gateway of last resort is not set' rồi im. Dùng sai ngữ cảnh câu này dạy người học một phản xạ đọc sai (tưởng lệnh có tham số). Dòng 'Gateway of last resort…' cũng vắng mặt trong mọi trường hợp — chưa khai.
  → Thay dòng đó bằng 'Gateway of last resort is not set' (in luôn cả khi có tuyến, đúng khuôn thật vì phạm vi không có default route qua OSPF); khối Codes rút gọn C/S/O thì khai một dòng.
- `○` **[P2/M] Câu '% Invalid input detected at '^' marker.' không bao giờ kèm dấu ^ — trích dẫn một marker không tồn tại.**
  Bằng chứng: src/engine/cli/interpret.ts:49; src/engine/cli/interpret.ts:223-227
  IOS thật in lại dòng lệnh với dấu ^ đặt dưới đúng từ hỏng, rồi mới tới câu '% Invalid input detected at '^' marker.' — dấu ^ chính là giá trị chẩn đoán (chỉ chỗ sai). Ở đây failed() (interpret.ts:223-227) chỉ in mỗi câu chữ, người học đọc 'at ^ marker' rồi tìm mỏi mắt không thấy ^ nào. Với người chưa từng sờ IOS — đối tượng của app — đây là câu đố khó hiểu hơn là fidelity. Lệch khuôn này không được khai.
  → failed() nhận thêm vị trí token hỏng (đa số nhánh gọi đã biết từ nào sai), in hai dòng: dòng lệnh echo + dòng dấu ^ căn theo cột, rồi câu lỗi. Nhánh nào không xác định được thì đặt ^ ở token đầu như IOS vẫn làm khi mù mờ.
- `○` **[P2/S] Vài nhánh từ chối lệch hành vi IOS: `enable` khi đang privileged bị báo lỗi, lệnh THỪA từ lại báo '% Incomplete command.'.**
  Bằng chứng: src/engine/cli/interpret.ts:261; src/engine/cli/interpret.ts:370; src/engine/cli/interpret.ts:412-414; src/engine/cli/interpret.ts:473
  (1) interpret.ts:261: `enable` gõ ở privileged trả '% Invalid input' — IOS thật nhận im lặng (no-op); gõ thừa một lần enable là chuyện người mới làm suốt, bị mắng oan. (2) '% Incomplete command.' bị dùng cho cả trường hợp THỪA từ: `network 10.0.0.0 0.0.0.255 area 0 xyz` (words.length !== 5 tại :370), tương tự `ip route` 6 từ (:412-414) và `ip address` (:473) — IOS thật báo Incomplete khi THIẾU và Invalid input khi THỪA. Trong một engine lấy lỗi-chế-độ-là-bài-học làm triết lý, thông báo sai loại là dạy sai phản xạ đọc lỗi.
  → enable ở privileged → ok im lặng. Các nhánh kiểm độ dài: tách điều kiện thiếu từ (Incomplete) khỏi thừa từ (INVALID_INPUT) — mỗi chỗ một dòng if.

### Ghế 4 — Độ chính xác hệ thống (DHCP/DNS/AD/giám sát) (7.5)

Kiến thức DHCP/DNS/AD/giám sát vững chắc và engine PS trung thực với AD thật hiếm thấy, nhưng một con số replication sai-mặc-định lọt vào flashcard SM-2, các file log sinh script tự mâu thuẫn ở chỗ tinh, và ca hai-bệnh capstone đưa ra bằng chứng nslookup vật lý không thể có.

Điểm mạnh nổi bật:

- Chuỗi DHCP relay/giaddr → APIPA → bẫy hai-server-một-dải dạy đúng và móc xích chặt với M6/M11: giaddr đúng vai trò chọn scope (module-18.json:68-71), OFFER quay về relay đúng cơ chế (module-18.json:80), phân biệt NXDOMAIN với DNS-chết đúng nghề (module-18.json:721)
- Fidelity AD cao bất ngờ cho trình độ trung cấp: ngoại lệ đổi-mật-khẩu ưu tiên báo về DC đầu đàn (PDC emulator) được dạy đúng, không làm tròn (module-19.json:243, 932)
- Engine PS mô phỏng đúng luật AD thật: Global không chứa DomainLocal bị từ chối, vòng thành viên bị chặn, Add-ADGroupMember im lặng + idempotent, ObjectClass user/group hiện đúng (src/engine/ps/interpret.ts:441-456), tất cả có test khóa (src/engine/ps/psGroups.test.ts:97-105)
- Cơ chế chấm cặp goal GG+DL bắt được lối tắt nhét-thẳng-user-vào-nhóm-quyền: goal DL xanh nhờ nhóm lồng nhóm nhưng goal GG đỏ — productive failure được engine hoá thật sự (src/engine/ps/gradePs.ts:67-68, psGroups.test.ts:124-131)
- Syslog 8 mức + câu nhớ 'Em Ăn Cơm Em Với Người Iu Đi' khớp đúng thứ tự, ranh giới 3/4 và ngưỡng lọc ca đêm dạy đúng; polling vs trap và baseline hai-phía đều chuẩn (module-20.json:119, 1032-1046, 1268)

- `✓PB` **[P0/S] Dạy sai mặc định replication giữa site: 15 phút thay vì 180 phút — và flashcard SM-2 sẽ khắc sâu con số sai.**
  Bằng chứng: content/modules/module-19.json:230 ("mặc định mười lăm phút một chuyến") và :932 (flashcard "mặc định cỡ 15 phút một chuyến")
  Trong AD thật, chu kỳ replication mặc định của một site link là 180 phút (3 giờ); 15 phút là mức TỐI THIỂU cấu hình được, không phải mặc định. Bài dạy "mặc định mười lăm phút" ở cả teach body lẫn mặt sau flashcard — mà flashcard đi vào lịch SM-2, tức con số sai này sẽ được ôn đi ôn lại tới thuộc lòng. Đây là fact có trong đề phỏng vấn/chứng chỉ thật.
  → Sửa một cụm từ ở cả hai chỗ: hoặc "mặc định 180 phút, thường được rút xuống 15 phút" hoặc bỏ chữ "mặc định" thành "thường đặt cỡ 15 phút một chuyến" — cách hai giữ nguyên mạch chuyện 40-phút của bài.
  *Phản biện: Đã mở content/modules/module-19.json: dòng 230 (teach body, concept m19-replication) viết đúng nguyên văn "mặc định mười lăm phút một chuyến"; dòng 932 (mặt sau flashcard cùng concept) viết "mặc định cỡ 15 phút một chuyến". Cả hai số dòng ghế nêu chính xác. Về fact: trong AD thật, chu kỳ replication mặc định của site link là 180 phút; 15 phút là mức TỐI THIỂU cấu hình được — ghế nói đúng, bài dạy sai chữ "mặc định". Điểm nặng thêm: flashcard này đi vào lịch SM-2 nên số sai sẽ được ôn tới thuộc; mỉa mai là deepDive dòng 243 của chính bài này tuyên bố "dạy đúng, không làm tròn". Tái lập đúng nguyên → giữ P0. Đề xuất sửa cách hai của ghế ("thường đặt cỡ 15 phút một chuyến") là hợp lý vì giữ nguyên mạch chuyện 40 phút của phần mở đầu.*
- `✓PB` **[P1/M] Ca hai-bệnh capstone: nslookup trả lời được dù đường tới DNS server đã đứt — bằng chứng vật lý không thể có, mâu thuẫn với chính bài NXDOMAIN của Module 18.**
  Bằng chứng: src/engine/clinic/terminal.ts:142-151 (resolveName trả lời thuần từ overlay, không kiểm đường đi); content/modules/module-21.json:1138 và :1675 (explain kể "nslookup ... trả về Non-existent domain / 10.20.0.99" trong khi trunk từ ghế ngồi tới segment chứa DNS server 10.20.0.53 đang đứt vì lệch native VLAN)
  Module 18 (module-18.json:721) dạy rất kỹ: NXDOMAIN nghĩa là "DNS SỐNG và TRẢ LỜI đàng hoàng". Nhưng ở hai ca m21-b4-prac-ca và m21-mt-ca, mọi gói từ PC-KinhDoanh đều chết trên trunk lệch native — DNS query không thể tới 10.20.0.53, đời thật sẽ là timeout chứ không phải NXDOMAIN. Học viên nắm vững M18 sẽ suy luận: nslookup có trả lời → đường tới 10.20.0.53 thông → mà SRV-KeToan nằm CÙNG segment → ping số phải thông. Bằng chứng của ca tự đá nhau, đúng ở ca đinh của màn tốt nghiệp.
  → Hoặc cho resolveName kiểm reachability tới overlay.dns.serverIp (trả 'dns-timeout' khi đường đứt — enum đã có sẵn), hoặc thiết kế lại 2 ca: đặt DNS server ở phía chi nhánh (trước đoạn trunk hỏng) để nslookup hợp lý mà hai bệnh vẫn độc lập.
  *Phản biện: Đã mở src/engine/clinic/terminal.ts: resolveName (dòng 142-151) chỉ tra overlay.dns, và nslookup (dòng 470-483) gọi thẳng nó, không simulate đường đi tới serverIp — khẳng định đúng. Đã mở content/modules/module-21.json: dòng 1138 (m21-b4-prac-ca) và 1675 (m21-mt-ca) đúng nguyên văn như ghế trích; topology cả hai ca đặt SRV-DNS 10.20.0.53 ở trụ sở, phía bên kia trunk lệch native (SW-1 p3 nativeVlan 10, SW-2 p3 không khai → mặc định 1), cùng segment với server đích — mọi gói từ ghế PC-KinhDoanh đều chết trên trunk (simulate.ts dòng 336-352 xử lý native-vlan-mismatch thật) nên đời thật nslookup phải timeout. Đã mở module-18.json ~dòng 721: dạy đúng "Non-existent domain = máy DNS SỐNG và TRẢ LỜI đàng hoàng". Mâu thuẫn nội tại tái lập nguyên vẹn, xảy ra ở hai ca capstone; enum dns-timeout đã có sẵn trong ResolveFailure nên đề xuất sửa khả thi. Giữ nguyên P1.*
- `✓PB` **[P1/S] Explain của m20-mt-ps2 trích sai timestamp dòng ERROR — mâu thuẫn trực tiếp với dữ liệu học viên vừa lọc ra.**
  Bằng chứng: content/modules/module-20.json:2290 (explain nói "dòng 03:12:44 ERROR link down on port 12") vs :2265 (log thật của đề này: "2026-08-09 03:41:17 sw-core-01 ERROR link down on port 12")
  Đề mastery dùng log đêm 08-09/08 với ERROR lúc 03:41:17, nhưng explain copy nguyên câu từ bài học (log đêm 06-07/08, ERROR lúc 03:12:44). Học viên vừa chạy Select-String thấy 03:41:17, đọc explain lại thấy 03:12:44 — trong một module mà chủ đề xương sống là kỷ luật dòng thời gian và đối chiếu timestamp, lời giải chính thức tự trích sai giờ là lỗi đáng xấu hổ.
  → Sửa explain thành 03:41:17 (hoặc bỏ hẳn con số giờ khỏi explain để không phải đồng bộ tay với log sinh script).
  *Phản biện: Mở content/modules/module-20.json: dòng 2265 (trong item m20-mt-ps2, id ở dòng 2093) đúng là "2026-08-09 03:41:17 sw-core-01 ERROR link down on port 12" — ERROR duy nhất của log đề; dòng 2290 explain đúng là trích "dòng 03:12:44 ERROR link down on port 12". Con số 03:12:44 chỉ có ở log bài học (dòng 805, ngày 2026-08-07) — explain mastery copy nhầm từ bài học. Tái lập đúng nguyên từng khẳng định, giữ P1 vì lời giải chính thức mâu thuẫn trực tiếp với dữ liệu học viên vừa lọc trong module dạy đối chiếu timestamp.*
- `✓PB` **[P1/S] srv-dhcp.log tự mâu thuẫn: cấp trùng IP cho nhiều MAC và scope "cạn" vẫn tiếp tục cấp — chính là bệnh trùng IP mà Module 18 vừa dạy phải tránh.**
  Bằng chứng: content/modules/module-20.json:1946, 1973, 1999 (10.20.3.67 cấp cho 3 MAC khác nhau trong 1 giờ); :2026 và :2029 (10.20.3.136 cấp cho 2 MAC cách nhau 2 phút 45 giây); :2019-2028 (ERROR "no free leases" lúc 08:47 nhưng 08:51-08:54 vẫn granted 10.20.3.187/.136/.84); :2039 (09:05 utilization tụt về 96% sau khi đã cạn, không có dòng release/expire nào)
  Script sinh log không giữ tính duy nhất của IP đã cấp và không nhất quán với cốt truyện leo thang 78→85→91→cạn: một server DHCP duy nhất cấp cùng một địa chỉ cho hai MAC trong 3 phút là chính ca "một IP hai MAC" mà M11/M18 dạy là bệnh. Học viên đọc kỹ (đúng kỹ năng module đang dạy) sẽ thấy máy chủ trong đề hành xử như hạ tầng hỏng, trong khi đề chỉ định kể chuyện scope cạn.
  → Sửa script sinh log: giữ set IP đã cấp (không tái cấp khi chưa release), sau dòng "no free leases" thì scope 10.20.3.x ngừng granted và utilization giữ 100% (hoặc thêm dòng lease expired trước khi cấp lại).
  *Phản biện: Đã mở content/modules/module-20.json (bài m20-mt-ps1, srv-dhcp.log). Tái lập đúng từng dòng: 10.20.3.67 cấp cho 3 MAC khác nhau tại dòng 1946/1973/1999 (07:30-08:27); 10.20.3.136 cấp cho 2 MAC tại 2026/2029 cách 2p45s; ERROR "no free leases" 3 lần lúc 08:47 (dòng 2019/2020/2022) nhưng 08:51-08:54 vẫn granted .187/.136/.84 và sau 09:00 còn cấp tiếp .212/.104/.126/.68 trong scope 10.20.3.x; dòng 2039 utilization tụt 96% sau khi cạn; grep toàn file xác nhận không có dòng release/expire nào. Thêm bằng chứng ghế chưa nêu: 10.20.3.104 cũng cấp trùng 2 MAC (dòng 1960 và 2046). Phần explain dòng 2088 tự kể cốt truyện "85%, rồi 91%, rồi cạn" nên log mâu thuẫn với chính chủ đích dạy. Bài vẫn chấm được (goal chỉ cần tìm dòng ERROR) nhưng đây là bài luyện đọc log kỹ trong module dạy đúng bệnh trùng IP — giữ nguyên P1.*
- `○` **[P2/S] sw-core.log của bài học có cặp timestamp đảo thứ tự trong log một thiết bị.**
  Bằng chứng: content/modules/module-20.json:806-807 (dòng "03:13:02" đứng TRƯỚC dòng "03:12:48" trong cùng file sw-core.log của sw-core-01)
  Log nội bộ của MỘT thiết bị (một đồng hồ) phải đơn điệu theo thời gian — đảo thứ tự chỉ hợp lý ở máy thu tập trung nhận từ nhiều nguồn. Module này dạy chính kỷ luật timeline/NTP nên chi tiết này dễ bị học viên tinh mắt bắt lỗi ngược.
  → Đổi 03:12:48 thành 03:13:48 (hoặc hoán vị hai dòng) — một chữ số là xong.
- `○` **[P2/S] Add-ADGroupMember: gõ "-Members a, b" (có khoảng trắng sau dấu phẩy — lối gõ PowerShell tự nhiên) lặng lẽ bỏ rơi các thành viên sau.**
  Bằng chứng: src/engine/ps/interpret.ts:426 (chỉ split named['members']; token sau khoảng trắng rơi vào positional và bị bỏ qua không báo gì)
  PowerShell thật parse "-Members vvlong, dtthu" thành mảng đủ hai phần tử. Trong app, học viên gõ kiểu đó chỉ thêm được vvlong — không lỗi, không cảnh báo, chỉ thấy goal của dtthu đỏ mà không hiểu vì sao. Bài m19-b5-prac-ps yêu cầu thêm đúng 2 người nên khả năng dính bẫy này khá cao.
  → Khi membersText kết thúc bằng dấu phẩy hoặc còn positional token thừa sau -Members, hoặc nối tiếp các positional vào danh sách, hoặc báo lỗi cú pháp rõ ràng — đừng im lặng.
- `○` **[P2/S] Teach body M18 nói "hai nhịp đầu của DORA đi bằng quảng bá" — nhịp 2 là OFFER (từ server, thường unicast); đúng phải là DISCOVER và REQUEST.**
  Bằng chứng: content/modules/module-18.json:58 ("hai nhịp đầu đi bằng QUẢNG BÁ, vì máy mới chưa có địa chỉ nên chỉ biết hét") — trong khi flashcard cùng module nói đúng "DISCOVER và REQUEST gửi bằng quảng bá" (module-18.json:1048)
  Đọc theo thứ tự D-O-R-A thì "hai nhịp đầu" là Discover + Offer, mà Offer do server gửi và lý do "máy mới chưa có địa chỉ nên chỉ biết hét" không áp cho nó. Flashcard nói đúng nên đây là mâu thuẫn nội bộ nhỏ giữa hai chỗ trong cùng module.
  → Sửa teach body thành "hai nhịp từ phía máy xin (DISCOVER và REQUEST) đi bằng quảng bá" cho khớp flashcard.
- `○` **[P2/S] Explain m18-mt-ca loại trừ distractor bằng một mệnh đề chỉ đúng một nửa: "dây trục đứt thì máy vẫn giữ địa chỉ cũ chứ không đổi sang 169.254".**
  Bằng chứng: content/modules/module-18.json:1526
  Mệnh đề chỉ đúng cho máy đang giữ lease còn hạn. Máy khởi động mới sau cuối tuần (đúng kịch bản sáng-thứ-hai của ca) mà trunk đứt thì DISCOVER không tới được relay ở đầu kia trunk → cũng nhận 169.254 y hệt. Heuristic loại trừ này nếu học viên mang ra đời thật sẽ chẩn sai chính ca Monday-morning.
  → Sửa explain: phân biệt theo lease — "máy ĐANG chạy giữ địa chỉ cũ; còn cả loạt máy 169.254 đồng loạt kèm tầng khác vẫn chạy → thủ phạm ở phía cấp phát của riêng tầng này" — giữ kết luận, bỏ mệnh đề tuyệt đối.

### Ghế 5 — Tâm lý học động lực (7.8)

Kỷ luật động lực trên các bề mặt mới rất chắc — gõ miễn phí/nộp tính lượt nhất quán, tốt nghiệp không XP có test chốt, không mở ngả farm mới — chỉ vướng một chỗ đau: câu CLI trong bài thi mastery vẫn chấm sống từng mục tiêu, mâu thuẫn với lời hứa "không có gợi ý giữa chừng".

Điểm mạnh nổi bật:

- Màn tốt nghiệp đúng nghĩa 'tấm gương': chỉ đọc store, chặn gõ URL vượt cổng, và có test hồi quy KHÔNG-cộng-XP chốt hẳn bất biến (src/features/graduation/GraduationPage.test.tsx:104-113), kèm microcopy tự khai 'không cộng XP' cho người học (grad.noXpNote, src/i18n/vi.json)
- Tách bạch gõ-miễn-phí / nộp-tính-lượt được thi hành trọn trên console CLI: cli.freeNote + lab.submitHint nói rõ luật, 'Làm lại từ đầu' trả nguyên đề, bài dở lưu kèm dấu nhắc đúng thời điểm gõ (src/features/cli/CliConsole.tsx:132-146, 353-366), còn bài thi cố ý KHÔNG lưu bài dở (src/features/learn/ModuleTestPage.tsx:239 không truyền draftKey)
- Thang 3 tầng của drill VLSM bám đúng ba tiêu chí thiết kế với kỷ luật hiếm thấy: tầng 1 chỉ nêu tiêu chí, tầng 2 chỉ từng dòng mà không đọc hộ đáp án, tầng 3 mới bày MỘT cách cắt kèm lời 'cắt kiểu khác vẫn được công nhận' (src/features/drill/VlsmDrill.tsx:280-331) — và có test khóa từng tầng (src/features/drill/VlsmDrill.test.tsx:81-117)
- XP kín kẽ, không ngả farm mới: drill chỉ tính XP cho bài tự giải TRƯỚC khi lộ lời giải (correct = failCount < 3, src/features/drill/VlsmDrill.tsx:128-131), engine ném lỗi khi nộp lại câu đã solved (src/engine/lessonMachine.ts:219), thi mastery/thi vượt/tốt nghiệp đều không XP (src/store/progress.ts:607-608, 656)
- Không màu đỏ trừng phạt, không chữ 'SAI' trong toàn bộ chuỗi mới: lỗi máy trên console tô hổ phách text-warn (src/features/cli/CliConsole.tsx:118, 126), doctrine 'đỏ chỉ cho lỗi hệ thống' ghi ngay ở nguồn màu (src/styles/tokens.css:6-7), vi/en đủ key parity, mọi chuỗi cli.*/grad.*/vlsm.* giọng 'bạn/mình' tử tế

- `✓PB` **[P1/M] Câu CLI trong bài thi mastery vẫn chấm sống từng mục tiêu — mâu thuẫn lời hứa "không có gợi ý giữa chừng" và làm câu đó gần như điểm cho không.**
  Bằng chứng: src/features/cli/CliConsole.tsx:157 và 259-269; src/features/learn/ModuleTestPage.tsx:239; src/i18n/vi.json:76; content/modules/module-21.json:1433
  Bài thi module 21 có một câu kind 'cli' (module-21.json:1433). ModuleTestPage render nó qua QuestionInput không kèm cờ nào (ModuleTestPage.tsx:239), nên CliConsole vẫn chạy gradeCli sau MỖI lệnh (CliConsole.tsx:157) và bảng mục tiêu lật ○→✓ sống (dòng 259-269), cộng thêm dấu ? in nguyên bảng cú pháp lệnh tiếng Việt (cli.cmd.* là một cheat-sheet: 'switchport mode access | trunk'). Trong bài học đây là thiết kế hay; trong BÀI THI, người học chỉ cần kiên nhẫn gõ tới khi mọi dấu ✓ bật lên rồi mới bấm Nộp — câu cli thành điểm chắc chắn trong khi test.intro (vi.json:76) hứa 'Không có gợi ý giữa chừng'. Lab trong thi nhập môn có tiền lệ tương tự (GoalList sống) nhưng bảng CLI chi tiết hơn hẳn (từng goal port-mode/vlan/route), nên độ pha loãng cổng 85% nặng hơn.
  → Thêm một prop kiểu examMode cho CliConsole (và cân nhắc cả NetworkLab trong thi): vẫn liệt kê mục tiêu làm ĐỀ BÀI nhưng ẩn trạng thái xong/chưa xong — người học phải tự kiểm bằng lệnh show, vốn chính là kỹ năng bài muốn đo ('dòng nhắc kiểm chứng' đã có sẵn trong triết lý của console). Giữ nguyên hành vi chấm sống ở bài học và phòng luyện.
  *Phản biện: Đã mở đủ 4 file và tái lập đúng từng khẳng định. (1) src/features/cli/CliConsole.tsx:157 đúng là `const evaluation = useMemo(() => gradeCli(spec, state), [spec, state])` — chấm lại sau mỗi lệnh; dòng 259-269 đúng là bảng mục tiêu render sống ✓/○ kèm nhãn goalMet/goalUnmet, thậm chí còn có live region announce từng mục tiêu vừa đạt (dòng 165-180). CliConsoleProps (138-146) không hề có prop examMode hay cờ ẩn trạng thái nào. (2) src/features/learn/ModuleTestPage.tsx:239 đúng là `<QuestionInput question={question} onSubmit={submit} />` — không truyền cờ nào; QuestionInput.tsx case 'cli' (256-276) chuyển thẳng vào CliConsole không kèm chế độ thi. (3) src/i18n/vi.json:76 test.intro đúng nguyên văn 'Không có gợi ý giữa chừng — đây là lúc kiến thức tự đứng trên chân nó' (introFinal dòng 79 cũng hứa y hệt). (4) content/modules/module-21.json:1433 đúng là câu kind 'cli' (id m21-mt-cli) và nằm trong mảng "masteryTest" (bắt đầu dòng 1237) — tức là câu thi thật. Khẳng định phụ về dấu '?' cũng đúng: engine/cli/interpret.ts:253 trả outcome 'help' và vi.json:523 có bảng cú pháp kiểu cheat-sheet ('switchport mode access | trunk'). Về mức: giữ P1 — mâu thuẫn trực tiếp với lời hứa trong UI thi, và làm mềm cổng mastery 85% (nguyên tắc sư phạm số 2, thuộc nhóm bất khả xâm phạm của dự án); người học chỉ cần lặp lệnh tới khi mọi ✓ bật rồi Nộp, câu cli thành điểm gần chắc chắn. Tiền lệ lab trong thi nhập môn có thật nhưng không làm nhẹ lỗi này — nó chỉ cho thấy lỗ hổng có hệ thống. Đề xuất examMode của ghế hợp lý và khớp triết lý 'tự kiểm bằng lệnh show'.*
- `○` **[P2/M] Phiên drill VLSM 5 đề nặng nhưng không lưu bài dở — rời giữa chừng là mất trắng công đã điền.**
  Bằng chứng: src/features/drill/VlsmDrill.tsx:76-85 (toàn bộ phase/rows/outcomes là state cục bộ); src/store/progress.ts:122-125 (PracticeDraft chỉ có lab/ps/cli)
  Chính dự án vừa trả giá cho bài học này ở lab/PS/CLI (hội đồng #20, PracticeDraft ra đời vì 'mất bài dở là kiểu mất mát khiến người ta bỏ hẳn bài'). Drill VLSM là bề mặt mới NẶNG nhất trong nhóm drill — mỗi đề một bảng 3-4 dòng × 2 ô, comment tự nhận 'nặng hơn bài subnet nhiều' — nhưng mọi thứ (đề đang làm, các ô đã điền, số đề đã qua) nằm trong state component. Seed tất định giúp mở lại gặp đúng bộ đề (VlsmDrill.tsx:13-14, 94) nhưng phải làm lại từ đề 1 với bảng trắng. Back nhầm hay hết pin ở đề 4/5 là mất ~10 phút thiết kế.
  → Lưu ảnh chụp phiên drill VLSM (index, rows, outcomes, failCount) — hoặc thêm nhánh 'vlsm' vào PracticeDraft (thêm nhánh union không cần bump version, theo đúng ghi chú progress.ts:117-120), hoặc một ngăn drillDraft riêng, xóa khi phiên xong.
- `○` **[P2/S] Enter ở bất kỳ ô nào của bảng VLSM là nộp bài luôn — vô tình đốt một lượt trong thang 3 tầng.**
  Bằng chứng: src/features/drill/VlsmDrill.tsx:219 (form onSubmit={submit}) và 247-265 (8 ô input nằm trong form)
  Khác drill subnet (một ô, Enter-để-nộp là tự nhiên), bảng VLSM có tới 8 ô nhập chung một form. Người học điền dở dòng 2 mà gõ Enter theo phản xạ là bài bị chấm ngay với hàng loạt lỗi 'missing', failCount +1, thang gợi ý bị đẩy lên tầng kế — lượt sai này không phải do thiết kế sai mà do thao tác. Với luật 'correct = failCount < 3', hai cú Enter nhầm cộng một lần sai thật là mất luôn tư cách tính XP của đề đó.
  → Chặn Enter submit khi form chưa điền đủ các ô (hoặc chỉ nộp qua nút 'Kiểm tra'): preventDefault Enter trên input khi còn ô trống, hoặc hỏi xác nhận khi nộp bảng còn dòng trống.
- `○` **[P2/S] Màn mở đầu drill VLSM thiếu câu trấn an về đồng hồ mà drill subnet có.**
  Bằng chứng: src/i18n/vi.json:199 (vlsm.intro) so với vi.json:164 (drill.intro); đồng hồ hiện mỗi đề ở src/features/drill/VlsmDrill.tsx:207-212
  drill.intro có câu 'Sai không sao, đồng hồ chỉ để bạn đua với chính mình' — đúng bài bản giảm lo âu trước bài bấm giờ. vlsm.intro không nhắc gì tới đồng hồ dù timer vẫn chạy to rõ từng đề, mà VLSM lại là bài khó hơn hẳn (đề thiết kế nhiều phút thay vì nhẩm 30 giây), tức chỗ cần trấn an hơn lại im lặng.
  → Thêm một vế tương đương vào vlsm.intro (cả vi lẫn en): đồng hồ chỉ đo tiến bộ của chính bạn, đề khó thì lâu là bình thường.

### Ghế 6 — Ngôn ngữ & microcopy (7.8)

Chữ nghĩa M13-21 vào loại hiếm — giọng đều, ẩn dụ đắt, explain thật sự giải thích — nhưng bị trừ vì một ví dụ wildcard dạy sai, thuật ngữ "cổng dịch vụ" trôi khỏi luật port/cổng ở M17-18, và vài vết gợn nhỏ về nhất quán.

Điểm mạnh nổi bật:

- Explain/hint/solution giải thích CƠ CHẾ chứ không nhắc lại đáp án — ví dụ module-13.json:251 giải thích vì sao /26 không đứng được ở .16 (mất không 48 địa chỉ), module-16.json:1629 giải thích vì sao lệch số hiệu tiến trình không cản láng giềng; hint dạng "cú pháp khuyết" và câu hỏi dẫn đường đúng tinh thần thử-sai trước.
- Ranh giới ba tầng chuỗi giữ rất kỷ luật: output máy tiếng Anh nguyên văn (src/engine/cli/show.ts:143-197 dựng bảng IOS chuẩn cột; log fixture module-20.json:664-826 toàn tiếng Anh 'link down on port 12'), còn prose VI dịch lại là 'cổng 12' — đúng luật; UI mới (CliConsole.tsx, VlsmDrill.tsx, GraduationPage.tsx) không hardcode chuỗi người dùng, i18n vi/en parity 0 key lệch, không backtick markdown nào trong 9 file JSON.
- Ẩn dụ mới tự nhiên và bám nghề: y tá đi buồng / chuông đầu giường cho polling-trap (module-20.json:988) chạy xuyên suốt bài tới flashcard; bà mối làng bên cho DHCP relay nối tiếp chuyện 'hỏi cưới' M6 (module-18.json:1042,1057); tòa nhà 4 tầng 8 phòng cho 8 trạng thái OSPF (module-16.json:14-127) là cung điện ký ức đúng sách; 'Em Ăn Cơm Em Với Người Iu Đi' khớp chữ cái đầu 8 mức syslog, trung tính giới, không thô.
- Giọng 'bạn/mình' đều tăm tắp cả 9 module (grep 'quý vị/các em/anh chị' = 0 kết quả), 'subnet mask' giữ tiếng Anh trong khi 'mạng con' chỉ dùng cho danh từ subnet — đúng quy ước; 'cổng ra' cho gateway nối tiếp đúng M2/M6.
- App tự khai chỗ giản lược thay vì giả vờ mô phỏng đủ: module-16.json:401 (ba điều kiện láng giềng, khai rõ bỏ timer/area/auth), module-16.json:867 (cost=1 cố ý), module-17.json:628 (ngữ pháp ACL rút gọn 'nói thẳng chỗ mình giản lược') — trung thực fidelity hiếm thấy ở app học.

- `✓PB` **[P0/S] Ví dụ wildcard 0.0.0.1 'chỉ riêng các địa chỉ lẻ' dạy sai kiến thức.**
  Bằng chứng: content/modules/module-13.json:485
  DeepDive bài m13-bai-4 viết: wildcard "cho phép những mẫu mà mask không viết nổi, ví dụ 0.0.0.1 để chỉ riêng các địa chỉ lẻ". Sai: trong wildcard, bit 1 nghĩa là BỎ QUA (chính bài này dạy thế ở dòng 482). Wildcard 0.0.0.1 bỏ qua bit cuối, tức khớp CẢ địa chỉ chẵn lẫn lẻ theo từng cặp — ngược hẳn với 'chỉ riêng địa chỉ lẻ'. Muốn khớp riêng địa chỉ lẻ phải giữ bit cuối (bit 0) và thả các bit còn lại: wildcard x.x.x.254 với địa chỉ gốc lẻ. Người học giỏi tự kiểm bằng chính quy tắc bit 0/bit 1 vừa học sẽ thấy bài tự mâu thuẫn.
  → Sửa ví dụ thành đúng: "ví dụ 0.0.0.254 kèm địa chỉ gốc lẻ để khớp riêng các địa chỉ lẻ", hoặc thay bằng ví dụ dễ kiểm hơn (khớp đúng địa chỉ .1 của mọi mạng con: 0.0.255.0 kiểu chọn octet). Một dòng, dưới 1 giờ kể cả chạy content:review.
  *Phản biện: Đã mở content/modules/module-13.json. Dòng 485 đúng nguyên văn: deepDive viết "ví dụ 0.0.0.1 để chỉ riêng các địa chỉ lẻ". Dòng 482 cùng screen dạy "bit 1 nghĩa là ô này mặc kệ". Theo chính quy tắc đó, wildcard 0.0.0.1 bỏ qua bit cuối nên khớp cả chẵn lẫn lẻ theo cặp — ngược hẳn khẳng định "chỉ riêng địa chỉ lẻ"; muốn khớp riêng lẻ phải là wildcard giữ bit cuối (vd 0.0.0.254 + gốc lẻ). Phân tích kỹ thuật của ghế chính xác, bài tự mâu thuẫn trong một màn hình. Dạy sai kiến thức trong nội dung bài học → giữ P0.*
- `✓PB` **[P1/S] Thuật ngữ trôi: 'cổng dịch vụ' / 'cổng 53' cho port TCP/UDP ở M17 và M18, ngược luật port/cổng và ngược chính M5.**
  Bằng chứng: content/modules/module-18.json:949 ('Cổng 53 là cửa của DNS'), module-18.json:927,943,946,1415,1417; module-17.json:403,436,628,1557,1565 ('cổng dịch vụ')
  Luật dự án (CLAUDE.md): 'port' = TCP/UDP, 'cổng' = vật lý. M1-12 giữ đúng: module-05.json dùng 'port 443', 'port 53', 'port 25' xuyên suốt (module-05.json:772,826,1590). Sang trung cấp, M17 (ACL mở rộng) đặt ra cụm mới 'cổng dịch vụ' và M18 viết thẳng 'cổng 53', 'cổng của DNS' — trong khi chính hint module-18.json:946 bảo người học nhớ lại 'cung điện Module 5', nơi họ đã thuộc là PORT 53. Cùng một khái niệm mang hai tên ở hai nửa khóa; tệ hơn, 'cổng' giờ vừa là cổng switch vật lý (M14-17 dùng dày đặc) vừa là port dịch vụ — đúng cái nhập nhằng mà luật thuật ngữ sinh ra để chặn.
  → Thay 'cổng dịch vụ' → 'port dịch vụ' (hoặc 'port') và 'cổng 53' → 'port 53' tại 11 vị trí đã liệt kê ở M17/M18; grep lại 'cổng [0-9]' để chắc không sót (các 'cổng 12' của M20 là cổng vật lý, giữ nguyên).
  *Phản biện: Đã mở content/modules/module-18.json và module-17.json, kiểm từng dòng: module-18.json:927 ('đúng cổng dịch vụ của DNS'), 943 (hintTopic 'cổng dịch vụ của DNS'), 946 (hint 'cổng của DNS... cung điện Module 5'), 949 ('Cổng 53 là cửa của DNS'), 1415 (hintTopic 'cổng dịch vụ của DNS nằm trong cung điện Module 5'), 1417 (explain 'cổng 53 là cửa của DNS') — tất cả khớp nguyên văn. module-17.json:403, 436, 628, 1557, 1565 đều chứa 'cổng dịch vụ' đúng như ghế nêu. Đối chiếu module-05.json:772,826,1590 xác nhận M5 dùng 'port 443', 'port nguồn/đích', 'port 25' — cùng khái niệm hai tên ở hai nửa khóa là thật. Grep 'cổng [0-9]' xác nhận module-20 'cổng 12' và module-04 'cổng 1/cổng 3' là cổng vật lý (giữ nguyên, ghế nói đúng). Một điểm ghế nói hơi quá: 'M1-12 giữ đúng' không hoàn toàn — module-10.json:151 cũng viết 'mở cổng 443 cho web' (port dịch vụ), tức lỗi trôi thuật ngữ còn có thêm 1 vị trí ngoài danh sách chứ không làm phát hiện yếu đi. Vi phạm luật thuật ngữ CLAUDE.md rõ ràng, mâu thuẫn trực tiếp với chính hint bảo người học nhớ 'port 53' từ M5 — giữ nguyên P1. Khi sửa nên quét thêm cả 'Cổng [0-9]' viết hoa (module-18.json:949) và cân nhắc sửa luôn module-10.json:151.*
- `○` **[P2/S] M16 dùng 'số hiệu' cho hai thứ khác nhau trong cùng một bài — ExStart 'số hiệu lớn hơn cầm trịch' dễ bị hiểu là số hiệu tiến trình.**
  Bằng chứng: content/modules/module-16.json:631 vs module-16.json:638
  DeepDive bậc ExStart (dòng 631): 'router có số hiệu lớn hơn được cầm trịch' — ý nói Router ID, nhưng app chưa hề giới thiệu Router ID. Ngay màn teach kế tiếp cùng bài (dòng 638): 'lệnh router ospf kèm một số hiệu — số này chỉ có ý nghĩa trong nội bộ máy đó'. Người học chỉ biết đúng một 'số hiệu' là số tiến trình, nên rất dễ kết luận: số tiến trình quyết định ai nói trước — mâu thuẫn thẳng với dòng 638 và với mt-3 (số tiến trình không ảnh hưởng gì). 
  → Đổi dòng 631 thành phi-số: 'hai bên so một mã định danh riêng của từng router (Router ID), máy mang mã lớn hơn được cầm trịch — mã này khác với số hiệu tiến trình bạn gõ trong lệnh router ospf', hoặc bỏ hẳn chi tiết ai-thắng vì ngoài phạm vi sim.
- `○` **[P2/S] Fixture sw-core.log có dấu thời gian lộn thứ tự — ngay trong module dạy kỷ luật dòng thời gian.**
  Bằng chứng: content/modules/module-20.json:805-807 (03:12:44 → 03:13:02 → 03:12:48)
  Log một thiết bị duy nhất (sw-core-01) nhưng dòng 806 ghi 03:13:02 rồi dòng 807 quay lại 03:12:48. Bài 2 của chính module này dạy rằng thứ tự thời gian là xương sống của điều tra và lệch giờ là 'chuyện bịa'. Người học tinh mắt lọc quanh 03:12 sẽ thấy sổ của một máy tự chạy ngược — không có lời giải thích nào trong bài. Không phá bài chấm (goal chỉ cần found-line) nhưng là vết gợn đúng chỗ nhạy nhất.
  → Đảo hai dòng 806-807 cho đúng trình tự thời gian (WARNING 03:12:48 trước, INFO 03:13:02 sau).
- `○` **[P2/S] DeepDive M13 khuyên 'cộng 20% dự phòng' nhưng drill VLSM chấm khối to hơn mức cần là 'wasteful'.**
  Bằng chứng: content/modules/module-13.json:64 vs src/engine/subnet/vlsm.ts:178 và src/i18n/vi.json:213
  DeepDive m13-bai-1: 'Người làm nghề thường cộng thêm khoảng 20% dự phòng trước khi chọn cỡ'. Nhưng bộ chấm drill (vlsm.ts:178) đánh dấu 'wasteful' mọi khối có prefix nhỏ hơn smallest-fit, và tiêu chí hiển thị (vi.json:213) tuyên bố 'mỗi khối là cỡ nhỏ nhất đủ dùng'. Người học nghe lời khuyên nghề nghiệp của chính bài học — phòng 50 máy lấy /25 thay vì /26 — sẽ bị drill phê 'khối to hơn mức cần'. SolutionNote chỉ công nhận 'chừa đất để dành' (đất chưa cấp), không cứu được khối cấp dư cỡ.
  → Thêm nửa câu vào deepDive: 'trong bài luyện của app, để chấm được, bạn cứ chọn cỡ nhỏ nhất đủ dùng — dự phòng ngoài đời là chuyện thỏa thuận với chủ dải'; hoặc nới grader chấp nhận dư đúng một bậc kèm ghi chú (đắt hơn, không khuyến nghị).

### Ghế 7 — Hình khái niệm & dual coding (7.8)

Mảng hình trung cấp là hàng tay nghề thật: soi 67 hình + 8 phòng OSPF không ra một lỗi kiến thức nào (số liệu, chiều mũi tên, thứ tự bậc đều chuẩn), chỉ vướng một chữ "cổng" sai quy ước thuật ngữ và một cặp phòng OSPF na ná bóng dáng.

Điểm mạnh nổi bật:

- Số liệu kỹ thuật trong hình chính xác đến từng con số, tự kiểm không ra lỗi nào: wildcard 255.255.255.192→0.0.0.63 (ConceptVisual.tsx:2593-2600), tóm tắt 192.168.8-11.0/24→/22 căn đúng biên (:2620-2629), AD [1/0]/[110/2] (:3156-3158), bậc thang cỡ khối trừ 2 đúng (:2490-2493), đủ 8 bậc OSPF đúng thứ tự (:3053-3058), căn khối /26 đúng vạch 64 cả về tỉ lệ pixel (:2554-2580)
- 8 phòng OSPF mỗi phòng một ẩn dụ khớp 1-1 với story nội dung (module-16.json:34-121 ↔ RoomGlyph.tsx:220-287), kèm ghi chú NBMA cho bậc Attempt đúng kỹ thuật; registry cố ý ném lỗi khi thiếu hình thay vì rơi âm thầm (RoomGlyph.tsx:301-303)
- Kỷ luật token màu tuyệt đối: không một hex trần trong toàn bộ hình mới (grep fill/stroke="# sạch), mọi màu qua currentColor + class text-ok/warn/accent map qua @theme (app.css:6-17), mono qua var(--font-mono); màu dùng có nghĩa (warn = nguy cơ, ok = đã kiểm chứng)
- Mỗi hình một ý và caption nói tiếng người, ăn khớp ẩn dụ của chính module: "sổ rời tàu từng dòng một" (ConceptVisual.tsx:4279) nối thẳng vào ẩn dụ tàu chìm của M20 (module-20.json:564) — hình và bài cùng một giọng, không trang trí rỗng
- Hook visualId gán đúng nội dung khi đối chiếu chéo: hook "tầng ba 169.254" → ApipaSelf, hook "ba cuốn sổ ba mốc giờ" → ClockSkew, hook "y tá và chuông" → SnmpTrap (module-18.json:186, module-20.json:318/990) — và lưới test chặn visualId thiếu hình (ConceptVisual.test.tsx:34-38)

- `✓PB` **[P1/S] Hình ACL mở rộng dùng chữ "cổng" cho TCP/UDP port, phạm quy ước thuật ngữ toàn dự án.**
  Bằng chứng: src/components/ConceptVisual.tsx:3348 (ô nhãn 'cổng') và :3367 ("(cổng chỉ có với tcp và udp)")
  Quy ước cốt lõi trong CLAUDE.md: "port" = TCP/UDP, "cổng" = vật lý. Hình ExtendedAcl dán nhãn ô thứ tư là "cổng" và chú thêm "(cổng chỉ có với tcp và udp)" — cả hai chỗ đều là TCP/UDP port. Ngay trong Module 17, "cổng g0" (module-17.json:828) nghĩa là interface vật lý; cùng một bài mà một chữ mang hai nghĩa là đúng cái bẫy quy ước sinh ra để tránh. Nội dung bài ít nhất còn viết "cổng dịch vụ" (module-17.json:628), hình thì chỉ trơ chữ "cổng".
  → Đổi nhãn ô thành "port" và chú thích thành "(port chỉ có với tcp và udp)" — khớp quy ước và khớp cách M3 dạy port từ đầu.
  *Phản biện: Đã mở src/components/ConceptVisual.tsx: dòng 3348 đúng là ô nhãn 'cổng' trong hình ExtendedAcl (cạnh giao thức/nguồn/đích — ngữ cảnh TCP/UDP port), dòng 3367 đúng là chú thích "(cổng chỉ có với tcp và udp)". Đối chiếu content/modules/module-17.json: dòng 828 "cổng g0" là interface vật lý, dòng 628 nội dung bài viết "cổng dịch vụ" — cùng module một chữ hai nghĩa, phạm thẳng quy ước cốt lõi CLAUDE.md ("port" = TCP/UDP, "cổng" = vật lý). Mọi số dòng và khẳng định khớp nguyên vẹn, mức P1 không thổi phồng vì đây là quy ước bất biến của dự án trong nội dung người học nhìn thấy.*
- `○` **[P1/S] Hai phòng OSPF Exchange và Full na ná nhau: cùng bóng dáng "hai hình chữ nhật chồng chéo".**
  Bằng chứng: src/features/palace/RoomGlyph.tsx:263-269 (ospf-two-envelopes) và :280-287 (ospf-twin-maps)
  Cả hai glyph đều là hai rect bo góc lệch chéo đè lên nhau — khác nhau chỉ ở nét phụ (nắp phong bì vs dấu tích), thứ không đọc được khi liếc nhanh ở cỡ thumbnail. Luật đầu chính file này (dòng 4-6): "bóng dáng phải khác nhau đủ xa để liếc một cái là phân biệt được — hình na ná nhau thì hai chỗ trong cung điện đè lên nhau". Tệ hơn, đây là hai bậc gần kề trong cùng tòa nhà làm quen (tầng 3 phòng 2 và tầng 4 phòng 2) nên móc nhớ dễ chập nhất. Dự án từng sửa đúng lỗi này cho cặp 587/389 (comment RoomGlyph.tsx:133-137).
  → Vẽ lại một trong hai: Exchange thành hai phong bì BAY CHÉO thật sự (nghiêng ±20°, vệt chuyển động, không chồng lên nhau) khớp story "bay chéo qua nhau"; Full giữ hai bản đồ chồng khít. Bóng dáng "hai vật bay chéo" vs "hai tấm đè khít" là phân biệt được ngay.
- `○` **[P2/S] Hình VLSM: khối thứ tư không có nhãn /28, người học chỉ ráp được 3/4 cặp nhu cầu-khối.**
  Bằng chứng: src/components/ConceptVisual.tsx:2473 (rect x=198 w=12 không chữ) so với :2474-2475 (chỉ có nhãn /26, /27) và :2478 (caption liệt kê 4 nhu cầu "100 · 50 · 25 · 10 máy")
  Hình dạy "mỗi phòng một cỡ lô" với 4 nhu cầu nhưng chỉ 3 khối có nhãn prefix (/25, /26, /27); khối 12px cho 10 máy đứng trơ không tên. Người học vừa được BlockSizeLadder dạy tra bậc sẽ muốn khép vòng "10 máy → /28" mà hình bỏ lửng đúng mắt xích cuối.
  → Thêm nhãn /28 phía trên hoặc dưới khối cuối (khối 12px quá hẹp để chứa chữ bên trong — đặt text ở y khác, kiểm getBBox ở /design).
- `○` **[P2/S] Hình ARP mạo danh: hộp nạn nhân không nhãn và chứa câu ".1 là tôi" như thể nạn nhân tự xưng.**
  Bằng chứng: src/components/ConceptVisual.tsx:3551-3554 (rect accent chứa text ".1 là tôi", hai mũi tên :3556-3557 đều trỏ VÀO nó)
  Router và "máy lạ" đều có nhãn, riêng hộp thứ ba — nạn nhân nhận hai lời tự xưng — thì không tên, và lời tự xưng ".1 là tôi" lại nằm BÊN TRONG hộp nhận. Đọc tự nhiên thành "hộp bên phải nói .1 là tôi" — ngược vai trong đúng cái hình dạy về giả danh. Bài học P0 đợt trước (bắt tay vẽ ngược ACK) cho thấy hướng phát ngôn trong hình là thứ hội đồng soi kỹ.
  → Đặt nhãn "máy nạn nhân" (hoặc "sổ ARP") cho hộp phải, chuyển câu ".1 là tôi" thành nhãn đè trên hai mũi tên đến — hai lời xưng cùng một câu, một thật một giả.
- `○` **[P2/S] Hình DHCP failover vẽ gộp "chia kho 80/20" và "chung một cuốn sổ" thành một hệ, trong khi bài dạy đây là HAI lựa chọn.**
  Bằng chứng: src/components/ConceptVisual.tsx:3743-3761 (A·80% + B·20% cùng nối vào "một cuốn sổ chung") so với content/modules/module-18.json:508 ("Chia kho tách bạch cho hai máy, HOẶC bắt cặp failover dùng chung một cuốn sổ")
  Bài và glossary (module-18.json:594, 1100) đều dựng cấu trúc either/or: chia kho tách bạch (hai sổ, hai dải rời) hoặc bắt cặp chung sổ. Hình lại nối cả A 80% lẫn B 20% vào chung một cuốn sổ — người học dễ kết luận "chia kho 80/20 thì hai máy vẫn chung sổ", xóa nhòa đúng ranh giới mà bệnh "hai sổ rời cùng dải" (OverlapTrap ngay bài sau) cần ranh giới đó để hiểu.
  → Chia đôi khung như StatelessVsStateful (:3443): nửa trái hai kho tách 80/20 không sổ chung, nửa phải hai máy nối một sổ — đúng cấu trúc "hoặc" của caption.
- `○` **[P2/S] Năm chú thích mono 35-36 ký tự vượt ngưỡng ~34 đã ghi trong GHI-CHU-KY-THUAT, chỉ còn ~2px mép viewBox.**
  Bằng chứng: src/components/ConceptVisual.tsx:3283 (36 ký tự), :4432 (36), :3147 (35), :4125 (35), :3796 (35); luật ở GHI-CHU-KY-THUAT.md:219-221
  GHI-CHU ghi: cỡ 10 mono ≈ 6px/ký tự, quá ~34 là tràn viewBox 220 (M18 từng dính 9 hình một lượt). "khớp dòng 20 là dừng, không đọc tiếp" (RuleOrder) và "bật khỏi nếp: hai phía đều là chuông" (BaselineBand) đều 36 ký tự ≈ 216px căn giữa 110 — còn 2px mỗi bên; OspfCost, GgVsDl, OverlapTrap 35 ký tự. Font metric chỉ cần nhỉnh hơn 6px/ký tự một chút (tùy máy) là chữ liếm mép khung.
  → Rút mỗi câu 2-4 ký tự (vd "khớp dòng 20 là dừng ở đó", "bật khỏi nếp: hai phía đều báo") rồi soi getBBox ở /design đúng quy trình đã ghi.
- `○` **[P2/S] Hình SNMP polling: đồ thị đi LÊN nhưng chú thích nói "thấy được sự yếu dần", không có nhãn đại lượng.**
  Bằng chứng: src/components/ConceptVisual.tsx:4368 (path y giảm từ 104 xuống ~70 = đường đi lên) và :4370 ("hỏi đều → thấy được sự yếu dần")
  Đường xu hướng không trục, không nhãn đo cái gì; "yếu dần" cạnh một đường leo dốc chỉ đúng nếu người xem tự đoán đại lượng là nhiệt độ/lỗi tăng — còn đoán là "sức khỏe" hay "tín hiệu" thì hình nói ngược lời. Hook cùng bài (y tá ghi chỉ số bệnh nhân yếu dần) càng gợi cách đọc "chỉ số sức khỏe đi xuống".
  → Thêm một nhãn mono nhỏ cho đường (vd "lỗi/phút" hay "nhiệt độ") hoặc lật đường thành dốc xuống với nhãn "tín hiệu" — một chữ là hết mơ hồ.

### Ghế 8 — UX & luồng thực hành (8.1)

Các bề mặt mới chạy tròn trịa, lối thoát có ở mọi màn, hành vi then chốt đều bị test khóa — chỉ còn sáu vết gợn P2, không một lỗi dạy sai hay ngõ cụt nào.

Điểm mạnh nổi bật:

- Bảng mục tiêu CLI chấm sống từng lệnh kèm live region sr-only báo mục tiêu vừa đạt cho screen reader (src/components/../features/cli/CliConsole.tsx:167-180, 251-271), đúng nếp "gõ miễn phí, chỉ Nộp bài tính lượt" của ba terminal trước.
- Rút dây console là thao tác vật lý (hàng nút, không phải lệnh), để lại dấu mốc trong nhật ký và ép chế độ về user — cả ba điều bị test khóa (src/features/cli/CliConsole.test.tsx:78-86; src/engine/cli/state.ts:82-84).
- Bài dở CLI lưu dấu nhắc THEO TỪNG DÒNG làm bằng chứng chuỗi chế độ đã đi qua, và ranh giới bài-học-lưu/bài-thi-không có hẳn file test đứng gác (src/store/progress.ts:78-98; src/features/cli/CliConsole.test.tsx:123-135; src/components/QuestionInput.draft.test.tsx:52-56).
- GraduationPage gõ URL thẳng không vượt được cổng, cả trang không gọi một action store nào (đúng "tấm gương, không phải phần thưởng") — cả hai bất biến bị test khóa (src/features/graduation/GraduationPage.tsx:112-125; GraduationPage.test.tsx:63-113).
- VlsmDrill: thang 3 tầng bám đúng ba tiêu chí, thứ tự dòng của engine khớp thứ tự đề nên nhãn phòng ban không lệch (src/engine/subnet/vlsm.ts:161, 240-242), seed tất định theo ngày + số phiên chặn reroll né bài (VlsmDrill.tsx:94).

- `○` **[P2/S] Test VlsmDrill tính seed bằng ngày UTC trong khi màn hình dùng ngày local — flaky từ 0h tới 7h sáng giờ VN.**
  Bằng chứng: src/features/drill/VlsmDrill.test.tsx:31 và :124 (`new Date().toISOString().slice(0,10)`) so với src/store/progress.ts:51-53 + src/engine/dates.ts:37-42 (todayIso = ngày LOCAL)
  firstProblem() của test dựng lại seed từ ngày UTC, còn VlsmDrill.tsx:94 dựng seed từ todayIso() (ngày local). Máy chủ dự án ở UTC+7: chạy test trong khoảng 00:00-06:59 giờ địa phương thì hai ngày lệch nhau một ngày, seed khác, fillSolution điền lời giải của đề khác → cả suite drill VLSM đỏ oan.
  → Test dùng đúng todayIso() import từ store (hoặc isoFromDate(new Date())) thay vì toISOString, như chính màn hình đang dùng.
- `○` **[P2/M] Bài dở CLI/lab mở lại không có lưới đỡ nội-dung-đã-đổi như runtime đã có.**
  Bằng chứng: src/components/QuestionInput.tsx:184-190 (đọc draft chỉ theo key) + src/features/cli/CliConsole.tsx:151 (state lấy nguyên từ draft, bỏ qua spec.initial); đối chiếu lưới đỡ runtime ở src/store/progress.ts:365-381
  Hội đồng trước đã bắt đúng lỗi này cho lessonRuntimes và có guard so-khớp-shape; practiceDrafts thì chưa. Nếu bản cập nhật nội dung sửa spec.initial/goals nhưng giữ nguyên lesson id + question id, người học mở lại sẽ ngồi trước sơ đồ CŨ: mục tiêu mới soi vào topology cũ (thiết bị thiếu thì tên rơi về id thô — CliConsole.tsx:44-46), lời giải tham chiếu không còn khớp. Không crash (simulate trả mã lỗi mềm, simulate.ts:841-843) và "Làm lại từ đầu" thoát được, nhưng người học không biết vì sao bài trông lạ.
  → Đóng dấu vân tay spec vào draft khi lưu (ví dụ JSON.stringify(spec.initial) hash hoặc đơn giản đếm devices+goals); mở lại thấy lệch thì bỏ draft, vào đề mới — đúng triết lý "mất một bài dở còn hơn ngồi trước bàn sai đề".
- `○` **[P2/S] "Làm lại từ đầu" của phòng lab LƯU một bài dở nguyên sơ thay vì xóa — lệch với CLI/PS vừa làm chuẩn.**
  Bằng chứng: src/features/lab/NetworkLab.tsx:307-311 (reset đổi topology → effect lưu draft ở :199-205; chữ ký onDraftChange :140 không có đường null) so với src/features/cli/CliConsole.tsx:217-223 (reset bắn null → clearDraft) và test khóa CliConsole.test.tsx:149-155 "không lưu một sơ đồ trắng"
  CLI và PS coi reset là "bài dở phải biến mất" (QuestionInput.tsx:245-251, 264-272 có nhánh null → clearDraft); lab thì reset xong effect lưu luôn ảnh chụp topology nguyên sơ làm bài dở — chiếm một trong 12 suất PRACTICE_DRAFT_CAP và lần sau mở lại đi qua đường restoreLab vô nghĩa. Không hại dữ liệu nhưng là hai triết lý ngược nhau trong cùng một switch của QuestionInput.
  → Cho LabDraftSnapshot đi cùng hợp đồng với CLI: onDraftChange nhận null khi reset, QuestionInput nhánh lab thêm đường clearDraft — và thêm một test khóa như CLI đã có.
- `○` **[P2/S] SwitchTrunkEditor không có đường nào tới người học thật: không một module nào bật allow.setTrunk.**
  Bằng chứng: grep '"setTrunk": true' content/modules/*.json = 0 kết quả (module-14: 0 câu lab, 5 câu cli; chỉ module-15 có "setStp": true); component ở src/features/lab/LabPanels.tsx:359-451, chỉ được mount qua /design (src/features/design/DesignPage.tsx:204) và fixture test
  Bảng cấu hình trunk bằng bấm chọn được xây đủ (access không bày allowed/native — đúng, NetworkLab.test.tsx:385-394 khóa), nhưng nội dung trung cấp dạy trunk 100% qua CLI nên người học không bao giờ gặp nó. Nó thành UI bảo trì không người dùng — mọi sửa đổi sau này phải gánh test của một bề mặt không ai thấy.
  → Hoặc cho một câu lab ở M14/M21 bật setTrunk (spec dòng 295 vốn kê "UI canvas chip mode/allowed" trong khối engine), hoặc ghi rõ vào GHI-CHU-KY-THUAT rằng bảng này là hàng /design-only để không ai tưởng nó đang phục vụ bài học.
- `○` **[P2/S] Bỏ chip VLAN cuối cùng của allowed list âm thầm lật thành "cho tất cả" — ngược hẳn ý người bấm.**
  Bằng chứng: src/features/lab/LabPanels.tsx:418-424 (`next.length === 0 ? null : next` — null nghĩa là all)
  Người học đang khoanh trunk chỉ chở VLAN 10, bấm bỏ nốt chip 10 với ý "chặn hết" thì cổng nhảy sang cho MỌI VLAN qua — cực trị ngược lại. Có chip "Cho tất cả" sáng lên làm tín hiệu, nhưng với bài học về allowed list thì cú lật này dạy cảm giác sai. (Hiện chỉ chạm được qua /design nên đau chưa thành thật — xem phát hiện trên.)
  → Không cho bỏ chip cuối (giữ tối thiểu một VLAN khi đang ở chế độ danh sách), hoặc thêm một dòng microcopy ngay dưới: "bỏ hết danh sách là quay về cho tất cả".
- `○` **[P2/S] Live region của bảng mục tiêu CLI chỉ báo mục tiêu VỪA ĐẠT, im lặng khi mục tiêu tụt lại về chưa đạt; dấu mốc rút dây lại lưu chuỗi đã dịch vào draft.**
  Bằng chứng: src/features/cli/CliConsole.tsx:169-180 (chỉ lọc met && prev false) và :209-214 (prompt của entry 'moved' = t('cli.movedTo') — chuỗi tiếng Việt persist vào practiceDrafts)
  Hai vết nhỏ cùng file: (1) người học gõ shutdown làm mục tiêu port-up tụt ✓→○, mắt thấy nhưng screen reader không được kể; (2) dấu mốc rút dây lưu nguyên văn bản dịch tại thời điểm gõ — đổi ngôn ngữ rồi mở lại bài dở thì nhật ký lẫn chuỗi ngôn ngữ cũ, trái nếp "UI-chrome đi qua i18n lúc RENDER" mà chính các entry lệnh thường (prompt máy trung tính) đang giữ đúng.
  → (1) announce cả chiều tụt ("mục tiêu X không còn đạt"); (2) entry 'moved' lưu deviceId (đã có trong outcome) và để lúc render mới gọi t('cli.movedTo') — bỏ trường prompt dịch sẵn.

### Ghế 9 — Khả năng tiếp cận (a11y) (7.5)

A11y bề mặt trung cấp làm có chủ đích và có test thật (tên nút mang trạng thái STP/trunk, live region CLI, contrast part-d/e đo bằng test), chỉ còn vài lỗ nhỏ: VlsmDrill rơi focus lúc mở phiên và bảng tiêu chí chỉ nói trạng thái bằng ký hiệu + màu.

Điểm mạnh nổi bật:

- Trạng thái trunk và STP chặn đi THẲNG vào accessible name của nút cổng, không chỉ đổi màu — và có test hồi quy khóa lại (src/features/lab/LabCanvas.tsx:89-97, src/features/lab/NetworkLab.test.tsx:407-424)
- CliConsole đi trọn lời giải bằng bàn phím (test chứng minh ở src/features/cli/CliConsole.test.tsx:88-99), transcript role="log" có aria-label theo host, và live region sr-only thường trực announce từng mục tiêu vừa đạt (src/features/cli/CliConsole.tsx:167-180, 251-253, 308-312)
- --part-d và --part-e được đo contrast AA THẬT bằng công thức WCAG trên cả surface lẫn panel, cả hai theme (src/styles/tokens.test.ts:81-87) — tự chạy lại: 57/57 test xanh
- Reduced-motion phủ kín bề mặt mới: MotionConfig reducedMotion="user" toàn app (src/main.tsx:92), gói tin lab bỏ chuyến bay khi tắt chuyển động (src/features/lab/usePacketFlight.ts:52-64), mọi transition CSS buộc vào --dur=0ms (src/styles/tokens.css:91-95)
- Di chuyển thiết bị trên mặt bàn lab làm được bằng phím mũi tên, cùng hàm snapToGrid với chuột (src/features/lab/LabCanvas.tsx:190-202); VlsmDrill đặt aria-label riêng cho từng ô theo tên phòng ban và test truy vấn bằng đúng accessible name (src/features/drill/VlsmDrill.tsx:250-264, VlsmDrill.test.tsx:44-45)

- `○` **[P1/S] VlsmDrill rơi mất focus khi mở phiên: nút "Bắt đầu" unmount mà không có gì nhận focus.**
  Bằng chứng: src/features/drill/VlsmDrill.tsx:170 (nút start unmount khi phase đổi) và :247-254 (ô nhập đầu tiên KHÔNG có autoFocus); đối chiếu src/features/drill/DrillPage.tsx:264 — drill subnet cũ có autoFocus trên ô trả lời
  Người dùng bàn phím bấm "Bắt đầu phiên hôm nay" thì cả màn idle unmount, focus rớt về <body> — phải Tab lại từ đầu trang qua nav mới tới bảng thiết kế. Drill subnet cũ đã giải đúng bài này bằng autoFocus trên ô trả lời, VlsmDrill sao chép cấu trúc nhưng bỏ sót mảnh đó. Tương tự khi phiên kết thúc (phase 'done', dòng 137): form unmount và focus lại rơi về body ngay lúc người học cần đọc bảng tổng kết (WCAG 2.4.3).
  → Thêm autoFocus (hoặc ref + focus() sau start) vào ô "Địa chỉ mạng" của phòng ban đầu tiên; khi phase sang 'done' thì dồn focus vào heading của khối tổng kết (tabIndex={-1} + focus()).
- `○` **[P2/S] Bảng ba tiêu chí VLSM chỉ nói trạng thái đạt/chưa bằng ký hiệu ✓/○ và màu, không có chữ.**
  Bằng chứng: src/features/drill/VlsmDrill.tsx:290-294 — <span>{met ? '✓' : '○'}</span> rồi tên tiêu chí, không kèm chữ trạng thái; đối chiếu src/features/cli/CliConsole.tsx:264-266 — bảng mục tiêu CLI kèm hẳn "(xong)/(chưa xong)" bằng chữ
  NVDA/VoiceOver ở mức punctuation mặc định đọc ✓/○ không ổn định (có máy đọc "check", có máy nuốt "○"), nên người dùng trình đọc màn hình nghe ba tiêu chí giống hệt nhau, không biết cái nào hỏng. Chính codebase này đã đặt chuẩn đúng ở bảng mục tiêu CLI và lab (trạng thái thành chữ qua lab.goalMet/goalUnmet) — VlsmDrill là bề mặt mới duy nhất tụt lại.
  → Ghép thêm chữ trạng thái như CLI: sau tên tiêu chí thêm (đạt)/(chưa đạt) qua i18n, hoặc aria-label trọn câu trên từng <li>.
- `○` **[P2/S] Transcript console (role="log", cuộn dọc) không focus được bằng bàn phím nên không cuộn lại lịch sử được trên Firefox/Safari.**
  Bằng chứng: src/features/cli/CliConsole.tsx:308-313 — div overflow-y-auto max-h-72 có role="log" nhưng không có tabIndex; cùng khuôn với src/features/ps/PsConsole.tsx:231-236 và src/features/clinic/ClinicTerminal.tsx:100-105
  Vùng cuộn chỉ nhận focus tự động trên Chromium (keyboard-focusable scrollers); Firefox/Safari thì người dùng bàn phím thuần không có cách nào cuộn ngược lên xem output cũ — với bài dài hai switch, output show vlan brief đầu phiên trôi mất. Đây là khuôn thừa hưởng từ PS/Clinic (đợt trước không bắt), nhưng CliConsole là instance mới trong phạm vi chấm và là terminal có transcript dài nhất (hai thiết bị, enable lại từ đầu).
  → Thêm tabIndex={0} vào div transcript (cả ba terminal cho đồng bộ) — vùng đã có sẵn role và aria-label nên nhận focus là hợp lệ ngay.

### Ghế 10 — Giá trị đo lường (assessment) (7.5)

Bộ đề M13-21 đo thật thứ nó dạy ở đa số điểm chạm — pool đúng luật, câu trụ bám kỹ năng, distractor tử tế — nhưng M13 không có câu trụ nào nên đề rút ra có thể hụt mất kỹ năng VLSM, một câu CLI chấm sai cách sửa hợp lệ, và hai ca bệnh chốt khóa đoán được không cần khám.

Điểm mạnh nổi bật:

- Kỷ luật pool giữ vững và TỰ KIỂM bằng data: mọi module 13-21 có pool 12-15 câu rút 8, câu trụ không vượt cỡ đề, luật cue độ-dài MCQ (<=1.1x distractor, <=45% đáp-án-dài-nhất) chạy trên TOÀN BỘ modules kể cả 9 module mới (content.test.ts:406-480, tự chạy xác nhận 31/31 xanh); lựa chọn MCQ xáo lúc render (QuestionInput.tsx:73) nên answerIndex=0 hàng loạt trong data không thành cue.
- Câu trụ M14-17 đo đúng kỹ năng chữ ký của module và có nghề chống giải tủ: m17-mt-cli-1/2 chấm CẶP thông+chặn kèm dấu vết show access-lists (module-17.json), m16-mt-lab-1 bắt chứng minh đường vòng bằng goal pathThrough via r-2 sau khi tự cắt cáp (module-16.json), m15-mt-lab-1 cấm rút dây (allow chỉ mở setStp, module-15.json:1259) — đúng tinh thần m21-mt-9 tự thuyết minh.
- m16-mt-cli-1 (module-16.json) thiết kế kín: console cắm ở R-DN, muốn ping xuyên site BẮT BUỘC khai network OSPF vì R-HN chỉ học tuyến qua neighbor — không có đường tắt static route; đã tự dò thử phương án lách và không tìm ra.
- Distractor là lỗi hiểu nhầm thật, không có đáp án đùa: m15-mt-5 (cổng block vẫn nghe BPDU), m17-mt-6 (ACL không trạng thái đứt chiều về), m19-mt-8 (luật lồng nhóm AGDLP), m20-mt-12 (baseline trước khi phán CPU) — kiểm được HIỂU chứ không thuộc lòng.
- Ca chốt M21 đúng spec 'hai bệnh chồng nhau' (native lệch + DNS trỏ sai, module-21.json:1536-1676) và accept câu gõ tay vá rộng đúng nếp (mọi câu đều kèm bản không dấu; normalize.ts chứa-cụm-từ nhận '192.168.10.128/27' cho câu chỉ hỏi địa chỉ).

- `○` **[P1/M] M13 không có câu trụ nào — đề rút ra có thể vắng sạch câu VLSM tính-tay, gate đo trượt kỹ năng chính.**
  Bằng chứng: content/modules/module-13.json:797-947 (pool 12 câu: 5 mcq + 6 typed + 1 order, không câu nào thuộc kind trụ); src/engine/masteryPool.ts:35 (ANCHOR_KINDS chỉ có lab/palace-walk/clinic/ps/cli); SPEC-TRUNG-CAP.md:24-25 (kỹ năng 1 'Thiết kế VLSM... đo: drill VLSM + bài thi M13')
  Cơ chế câu trụ hoàn toàn dựa vào kind, mà kỹ năng của M13 (cắt dải nhiều bước) nằm trong câu typed thường. Rút 8/12 bỏ 4 câu: một lượt thi hoàn toàn có thể bỏ đúng m13-mt-4 (dòng 836), m13-mt-11 (dòng 921), m13-mt-7 và m13-mt-8 — tức cả bốn câu đòi THỰC HIỆN trình tự cắt/gộp — và đề còn lại toàn định nghĩa một bước (đếm host, wildcard bit, khối hợp lệ). Người học có thể đậu cổng 85% của module VLSM mà chưa từng làm một phép cắt liên hoàn nào trong phòng thi; drill VLSM thì không gate. Các module khác đều có trụ neo kỹ năng chính, riêng module mở màn trung cấp thì không.
  → Thêm cờ anchor theo CÂU (vd `anchor: true` trong schema, isAnchorQuestion đọc cờ trước rồi mới xét kind) và cắm cờ cho m13-mt-11 + m13-mt-7 (một cắt liên hoàn, một gộp tuyến); content.test thêm bất biến 'M13 phải có ít nhất 1 câu anchor tính-tay'.
- `○` **[P1/S] m14-mt-cli-2 chấm rớt cách sửa hợp lệ mà chính lời giải của nó công nhận: goal đóng đinh phải sửa ở sw-2.**
  Bằng chứng: content/modules/module-14.json:1159 (goal {kind:'native-vlan', deviceId:'sw-2', vlan:1}), 1137/1147 (init: sw-1 native 1, sw-2 native 99), 1171 (explain: 'Sửa đầu nào cũng được, miễn khớp'); src/engine/cli/gradeCli.ts:128-131 (so đúng port đúng vlan)
  Người học đặt `switchport trunk native vlan 99` trên sw-1 p4: hai đầu khớp native 99, VLAN 1 đi có nhãn (allowed list chứa 1), goal ping pc-a→pc-b XANH — nhưng goal native-vlan đòi sw-2 phải về 1 nên cả bài rớt. Câu này là câu trụ (kind cli) nên vào MỌI lượt thi M14. Vi phạm trực tiếp triết lý chấm-theo-hiệu-ứng đã chốt (SPEC-TRUNG-CAP.md:203-208 'mọi cách viết hợp lệ đạt mục tiêu đều được công nhận') và mâu thuẫn với chính explain của câu.
  → Thêm goal kind `native-match` (hai đầu link cùng native) vào gradeCli + schema, thay goal một-phía; hoặc tối thiểu sửa đề nói thẳng 'đầu sw-1 đang đúng chuẩn xóm, hãy đưa sw-2 về theo' để ràng buộc một-phía thành đề bài tường minh.
- `○` **[P1/M] Hai ca bệnh chốt khóa (m18-mt-ca, m21-mt-ca) đậu được bằng hai cú click, không cần gõ lệnh khám nào — và lựa chọn chẩn đoán có cue kép.**
  Bằng chứng: src/features/clinic/ClinicRoom.tsx:107 + src/engine/clinic/gradeClinic.ts:40 (choose-action = chọn diagnosisIndex + actionIndex, không đọc dấu vết terminal); content/modules/module-21.json:1655 (fix choose-action), 1657-1664 (diagnosis); src/content/content.test.ts:453 (luật cue độ-dài bỏ qua mọi kind khác mcq)
  Ca m21-mt-ca tự tuyên bố 'khám cho ĐỦ, đừng dừng ở dấu chân đầu tiên' nhưng chấm điểm không đòi một dấu chân nào: không goal viewed, không đếm lệnh. Tệ hơn, đáp án chẩn đoán là lựa chọn HỢP-CỦA-HAI ('HAI bệnh chồng nhau: ... và ...', dòng 1659) — vừa dài nhất (~97 ký tự so với ~75/66) vừa mang cấu trúc 'cả A lẫn B' kinh điển mà người thi lụa luôn bấm; hai distractor là hai nửa của nó. m18-mt-ca cùng dạng (module-18.json, diagnosis nêu chi tiết 169.254 chỉ ở đáp án đúng). Luật chống cue độ-dài của content.test chỉ quét kind mcq nên toàn bộ choices của clinic nằm ngoài rào. Ca 'tổng ôn trá hình của CẢ trung cấp' đo được đúng một việc: đọc vị người ra đề.
  → (a) Thêm goal dấu-vết cho choose-action (vd mustHaveRun: ['nslookup', 'ping'] — engine terminal đã ghi lịch sử); (b) mở rộng test cue độ-dài sang diagnosis/actions của clinic; (c) viết lại distractor để mỗi lựa chọn cùng cấu trúc hai-vế (vd 'trunk lệch native VÀ DHCP cạn scope') thay vì hai nửa của đáp án.
- `○` **[P2/S] m15-mt-cli-1 hỏi 'switch nào làm gốc, cổng nào nằm im' nhưng chỉ chấm việc ĐÃ GÕ show spanning-tree.**
  Bằng chứng: content/modules/module-15.json:1406 (goal duy nhất: {kind:'viewed', command:'show spanning-tree'})
  Câu trụ (vào mọi lượt thi M15) phát không 1/8 điểm cho ba dòng gõ máy: enable → show spanning-tree → xong, không cần đọc hiểu bảng. Đề hứa đo việc ĐỌC (tìm root, tìm cổng block) nhưng goal 'viewed' chỉ ghi nhận lệnh đã chạy — đúng chỗ hở mà spec 4.2 chỉ dặn dùng cho đề 'chẩn đoán bằng lệnh nào'.
  → Ghép câu này với một câu typed/mcq hỏi kết quả đọc được (switch nào là root? cổng nào BLK?) — hoặc chuyển đề thành 'chữa cây STP' có goal topology thật, giữ viewed làm goal phụ.
- `○` **[P2/S] Goal found-line đậu được bằng lưới quét thô — 'cảnh báo giả' M20 quảng cáo trong spec không hề cản người lọc ẩu.**
  Bằng chứng: src/engine/ps/interpret.ts:545-549 (mọi dòng khớp needle đều đổ vào foundLines), src/engine/ps/gradePs.ts:76-78; content/modules/module-20.json:1900 (m20-mt-ps1)
  `Get-Content srv-dhcp.log | Select-String o` khớp gần trọn 150 dòng, trong đó có dòng sự cố → goal xanh. Hai câu trụ ps của M20 (đo kỹ năng 'lôi ĐÚNG dòng giữa đống rơm có cảnh báo giả' — SPEC-TRUNG-CAP.md:153-157) chấp nhận cả người không lọc gì đáng kể, miễn có dùng Select-String. Distractor WARNING chỉ làm nhiễu mắt, không làm nhiễu điểm.
  → Thêm ràng buộc vào goal found-line (vd `maxMatches: 5` — needle phải đủ hẹp) hoặc goal phủ định `mustNotContain` để lưới quét thô rớt; giữ triết lý hiệu-ứng, chỉ siết độ chọn lọc.
- `○` **[P2/S] Hỏi thuộc lòng tên trường giaddr bằng câu gõ tay ở CẢ hai đề thi (M18, M21) — spec dặn 'không đòi thuộc trường gói', hint lại mớm đáp án.**
  Bằng chứng: content/modules/module-18.json:1209 (m18-mt-2, accept 'giaddr'), content/modules/module-21.json:1388-1393 (m21-mt-10, hintTopic 'sáu chữ cái, ghép gateway và address'); SPEC-TRUNG-CAP.md:135-136
  Spec M18 nói rõ chỉ đòi hiểu VAI TRÒ relay, không đòi thuộc trường gói; hai câu này đòi bật đúng cái tên 6 chữ cái. Câu M21 còn tự phá mình: hintTopic đánh vần gần hết đáp án ('ghép gateway và address' → gaddr chỉ thiếu chữ i), thành câu trivia vừa lệch spec vừa rẻ điểm. Trùng lặp nguyên xi giữa hai module cũng làm giảm giá trị 'ôn nhanh Phần E' mà m21-mt-10 tự nhận.
  → Đổi một trong hai thành câu hiểu-vai-trò (vd mcq 'máy chủ DHCP dùng thông tin nào để chọn scope, vì sao chuyển tiếp thô không đủ'); nếu giữ câu typed thì bỏ hint đánh vần.
- `○` **[P2/S] Hai câu palace-walk M16 thiếu hintTopic — rớt đề, màn 'ý cần ôn' chỉ nói được câu chung chung.**
  Bằng chứng: content/modules/module-16.json:1739 (m16-mt-12) và 1758 (m16-mt-13) không có trường hintTopic; src/features/learn/ModuleTestPage.tsx:296-298 (fallback reviewHintGeneric)
  Toàn bộ 128 câu còn lại của 9 pool D/E đều có hintTopic; đúng hai câu trụ cung điện OSPF (luôn vào đề M16, gánh 8 phòng trạng thái neighbor) thì không. Người rớt vì quên chuỗi Down→Full nhận dòng gợi ý chung thay vì được trỏ về tòa nhà làm quen — đúng chỗ cần trỏ nhất của module.
  → Thêm hintTopic ('tòa nhà làm quen 4 tầng — đi lại từ tầng trệt') cho cả hai câu; cân nhắc content.test ép mọi câu masteryTest có hintTopic.
- `○` **[P2/M] Câu gõ tay đáp án một-token (số/chữ đơn) cho phép trả lời nước đôi kiểu '1 hay 99' vẫn ăn điểm.**
  Bằng chứng: src/engine/grading/normalize.ts:88-94 (chứa-cụm-từ: token '1' nằm trong '1 hay 99' là khớp); content/modules/module-14.json:977 (m14-mt-5 accept '1'), module-20.json:1603 (m20-mt-2 accept '3'), module-16.json:1699 (m16-mt-9 accept 'o')
  Luật khớp-chứa (đúng đắn cho câu trả lời thành câu) cộng với đáp án chỉ một token cực ngắn mở đường hedge: gõ '1 hay 99', '2 hoặc 3', 'chữ o hay chữ c gì đó' đều được chấm đúng vì cụm một-token luôn tìm thấy trong câu liệt kê (từ phủ định mới chặn, 'hay/hoặc' thì không). Ăn theo cấu trúc chấm có từ v1 nhưng D/E thêm nhiều đáp án một-ký-tự nhất (native VLAN '1', severity '3', mã route 'o') nên diện phơi rộng hẳn ra.
  → Trong typedAnswerMatches, khi accept ngắn (<=2 token) và câu người học chứa liên từ liệt kê ('hay', 'hoặc', ',') kèm nhiều token số/chữ-đơn khác nhau thì rơi về so-nguyên-chuỗi — cùng nếp đã xử từ phủ định.

### Ghế 11 — Kiến trúc & chất lượng mã (8.2)

Kiến trúc phần mới rất kỷ luật — engine thuần, luật viết một lần, schema gate chạy thật lời giải, test hành vi dày — nhưng còn hai vết P1: CLI nhận cú pháp extended cho ACL số chuẩn, và cột đếm match/bảng MAC của console không bao giờ có dữ liệu ở bề mặt thật.

Điểm mạnh nổi bật:

- Luật biến đổi sơ đồ viết đúng một lần: CLI đi qua applyTopologyChange của phòng lab (src/engine/lab/session.ts:319-321, src/engine/cli/interpret.ts:32,425-436), luật "về access thì dọn sạch trường trunk" chỉ tồn tại một chỗ (session.ts:352-359); hai việc chỉ-CLI (shutdown, vlan database) tách riêng ở config.ts với lời giải thích vì sao (src/engine/cli/config.ts:1-13) và vẫn bị classifyDiff bắt dưới tên port-state/acl với quyền luôn-false (session.ts:568-583) — ChangeClass tách trunk/stp/acl đúng yêu cầu.
- Schema gate chạy máy thật chứ không chỉ kiểm hình dạng: cliSchema chạy trọn lời giải mẫu, từ chối dòng bị máy chê, từ chối đề đã giải sẵn và đề console cắm vào thiết bị không có CLI (src/engine/cli/cliSchema.ts:83-114); labSchema đối chiếu lời giải với quyền qua classifyDiff+allowanceViolations (src/engine/lab/labSchema.ts:255-262); cả hai có chốt chặn thuần-kiểu AssertAssignable khóa schema với kiểu viết tay (cliSchema.ts:134-135, labSchema.ts:310-312).
- Engine thuần tuyệt đối: grep không ra React/localStorage/Date.now/Math.random trong src/engine/{cli,subnet,lab,ps}; không một `any`/`@ts-ignore` nào trong code mới; typecheck sạch, 373 test vùng mới xanh.
- Test là test HÀNH VI: cliInPipeline.test.ts chứng minh dạng câu hỏi thứ 8 đi trọn pipeline 6 bước mà lessonMachine.ts không biết chữ 'cli' nào (src/features/cli/cliInPipeline.test.ts:1-13, grep lessonMachine sạch); CliConsole.test.tsx gõ trọn lời giải bằng bàn phím + rút dây console như người dùng thật; migrate test dùng payload v1 đóng băng, kiểm từng bậc v1→v2→v3→v4 và ca 'phiên đã có mode thì không đụng vào' (src/store/progress.migrate.test.ts:86-107, chuỗi migrate từng bậc ở src/store/progress.ts:681-711).
- Mọi đơn giản hóa so với thiết bị thật đều khai tường minh ngay đầu file kèm lý do sư phạm (src/engine/lab/topology.ts:11-29, stp.ts:15-23, acl.ts:13-20, show.ts:7-13) — đúng loại comment chặn vòng lặp 'sửa tới lui'; file to nhất (simulate.ts 899 dòng) vẫn phân lớp rõ L2/L3/API, chưa cần tách.

- `○` **[P1/S] CLI nhận cú pháp ACL mở rộng cho số hiệu 1-99 (ACL chuẩn) — thiết bị thật từ chối.**
  Bằng chứng: src/engine/cli/interpret.ts:185 (`number < 1 || number > 199`), src/engine/cli/show.ts:298 (in nhãn 'Standard IP access list' cho số ≤99)
  parseAclRule chỉ có MỘT cú pháp (protocol + src + dst + eq port, tức dạng extended) nhưng chấp nhận số hiệu 1-199. Gõ `access-list 10 permit tcp any any` được máy nhận, rồi `show access-lists` in 'Standard IP access list 10' kèm luật dạng extended — một trạng thái không thể tồn tại trên IOS thật (ACL chuẩn 1-99 chỉ lọc theo nguồn, không có protocol/dst). Module 17 dạy đúng chủ đề 'standard vs extended' (SPEC-TRUNG-CAP.md:116) nên người học thử số 1-99 trong console là gặp ngay phản hồi sai kiến thức. Nội dung hiện chỉ dùng ACL 101 (module-17/21) nên chưa thành P0, nhưng đường tự-gõ thì mở toang. Cùng lỗ ở schema: AccessListSchema cho number 1-199 với rule extended (src/engine/lab/labSchema.ts:93-97).
  → Chặn số <100 trong interpret.ts (từ chối bằng INVALID_INPUT — đúng hành vi IOS khi gõ cú pháp extended cho số chuẩn) và siết AccessListSchema về 100-199; hoặc nếu muốn dạy cả ACL chuẩn thì làm cú pháp chuẩn thật sự — nhưng đó là mở phạm vi, phải đi cửa đề xuất.
- `○` **[P1/M] Cột đếm match của `show access-lists` và bảng `show mac address-table` không bao giờ có dữ liệu ở mọi bề mặt thật.**
  Bằng chứng: src/engine/cli/state.ts:62 (tham số `net?` của initialCliState), src/features/cli/CliConsole.tsx:151,218 (không nơi nào truyền net — grep toàn repo xác nhận), src/engine/cli/interpret.ts:314,330
  Cơ chế đếm aclHits và bảng MAC học được có thật và có test (simulate.ts:196-220), comment của show.ts:286-292 gọi cột đếm là 'bằng chứng đắt nhất khi chẩn đoán', spec hứa 'chẩn đoán bằng show access-lists (đếm match)' (SPEC-TRUNG-CAP.md:122). Nhưng CliConsole — bề mặt CLI duy nhất (qua QuestionInput.tsx:261) — luôn khởi tạo net rỗng, và 24 lệnh đóng băng không có `ping`, nên trong MỌI bài CLI hai bảng này vĩnh viễn trống/số 0. Tham số `net?` là dead code ở production; lời hứa trong comment state.ts:57-58 ('bảng MAC học từ các lượt Gửi thử của phòng lab') không có dây nối nào thực hiện.
  → Nối dây thật: cho gradeCli trả về NetState sau khi chạy behavior goals và đổ ngược vào state.net của phiên console (hoặc thêm nút 'Gửi thử' dùng chung simulatePing trong bài CLI có behavior goal). Nếu quyết định để sau, xóa tham số net? và sửa hai comment đang hứa suông — code tự khai gian là nợ đắt hơn thiếu tính năng.
- `○` **[P2/S] OSPF-lite cho hai đầu lệch subnet mask vẫn lên FULL — thiết bị thật giữ DOWN.**
  Bằng chứng: src/engine/lab/ospf.ts:188 (`sameSubnet(myPort.ipConfig.ip, theirPort.ipConfig.ip, myPort.ipConfig.prefix)` — chỉ dùng prefix của một phía)
  Hello OSPF thật đòi network mask trùng nhau trên mạng broadcast. Ở đây 10.0.0.1/24 nối 10.0.0.2/30 lên FULL cả hai chiều (mỗi chiều so bằng prefix của chính mình đều trùng network). Người học gõ nhầm mask qua `ip address` — đúng loại lỗi Module 16 muốn dạy chẩn đoán — sẽ thấy láng giềng lên bình thường, ngược với thiết bị thật.
  → Thêm điều kiện `myPort.ipConfig.prefix === theirPort.ipConfig.prefix` vào phép kiểm, trả reason 'subnet-mismatch' (hoặc mã mới 'mask-mismatch' nếu muốn lời chẩn đoán riêng — nhớ thêm chuỗi i18n theo nếp labStrings.test).
- `○` **[P2/S] show.ts tự chế lại networkAddress/prefixToMask thay vì dùng ipv4.ts sẵn có.**
  Bằng chứng: src/engine/cli/show.ts:232-238 (networkOf) và 373-376 (maskOf) trùng src/engine/subnet/ipv4.ts:54-57,78-81
  show.ts đã import networkAddress gián tiếp qua các module lab khác, nhưng vẫn viết tay hai hàm bit-twiddling giống hệt prefixToMask/networkAddress. networkOf còn dùng non-null assertion trên octet không qua parser có kiểm định của ipv4.ts. Hai bản chép của cùng một phép toán là chỗ trôi lệch kinh điển.
  → Xóa networkOf/maskOf, import networkAddress + prefixToMask từ '../subnet/ipv4' (maskOf đang được export — kiểm nơi dùng rồi trỏ lại).
- `○` **[P2/S] Thiếu test khóa bộ key i18n động `cli.cmd.*` cho 27 mục của CLI_COMMANDS.**
  Bằng chứng: src/features/cli/CliConsole.tsx:110 (t(`cli.cmd.${c}`)), src/engine/cli/interpret.ts:69-97 (CLI_COMMANDS as const); grep CLI_COMMANDS trong *.test.* không ra kết quả
  Bảng trợ giúp `?` ghép key động nên cả test parity vi↔en lẫn quét key mồ côi đều không bắt được thiếu key — đúng lớp lỗi mà labStrings.test.ts được viết ra để chặn (chính file đó nói vậy ở đầu file) nhưng nếp ấy chưa phủ sang cli.cmd. Hiện tại đủ 27/27 key ở cả hai file (đã kiểm bằng script), nhưng thêm lệnh thứ 25 vào danh sách mà quên i18n là người học đọc key thô giữa bảng trợ giúp.
  → Thêm test kiểu labStrings: duyệt CLI_COMMANDS, assert translate('vi'/'en', `cli.cmd.${c}`) không trả về key thô — CLI_COMMANDS là `as const` nên có thể khai Record<typeof CLI_COMMANDS[number], true> để tsc đỏ ngay lúc thêm lệnh.

### Ghế 12 — Hiệu năng (6.5)

Bài code-split của hội đồng trước được trả lời tử tế ở tầng route và console, nhưng câu hỏi trung tâm — nội dung phình 12→21 module — vẫn chưa giải: 1.6MB JSON dồn một chunk 1.1MB (gzip 274KB) modulepreload trước first paint, kèm ~46KB gzip zod chết trong PROD nằm ngay đường nóng.

Điểm mạnh nổi bật:

- Đường nóng được cắt có chủ đích: mọi route ngoài luồng học chính đều lazy (src/main.tsx:28-40), bốn console nặng NetworkLab/ClinicRoom/PsConsole/CliConsole lazy trong QuestionInput (src/components/QuestionInput.tsx:21-24) — build thật cho ra 20+ chunk, CliConsole chỉ 7.35KB tải khi cần.
- Chấm sống CLI không chạy mỗi phím gõ: gradeCli bọc useMemo theo [spec, state] (src/features/cli/CliConsole.tsx:157) nên mô phỏng chỉ chạy mỗi lần NỘP LỆNH; gõ phím chỉ đổi state input cục bộ.
- Engine mô phỏng có kỷ luật hiệu năng: cây STP tính MỘT LẦN cho cả lượt ping (src/engine/lab/simulate.ts:850-853), LabCanvas memo computeStp theo topology (src/features/lab/LabCanvas.tsx:280), animation gói tin dùng keyframe của motion nên không re-render React từng frame (LabCanvas.tsx:361-368).
- PROD bỏ hẳn zod parse + validate chéo khi nạp nội dung, có cache module-level và giải thích rõ vì sao an toàn (src/content/index.ts:27-40) — người dùng cuối không trả CPU cho việc kiểm tra của dev.
- Chi tiết tải trang được chăm: chỉ preload đúng 2 file font thân bài với guard chết-ở-build khi fontsource đổi tên file (vite.config.ts, CRITICAL_FONTS), LazyMotion strict chỉ ship domAnimation (src/main.tsx:91).

- `○` **[P1/M] Toàn bộ 21 module (1.6MB JSON) vẫn là MỘT chunk eager 1.1MB chặn trước first paint — vấn đề số 4 của hội đồng trước to gấp đôi chứ chưa được giải.**
  Bằng chứng: src/content/index.ts:10-13 (import.meta.glob eager:true); build output đo thật: dist/assets/content-DBGP2l-u.js 1,105.60 kB │ gzip: 273.71 kB; dist/index.html có <link rel="modulepreload" href="/assets/content-DBGP2l-u.js">
  Đợt trước hội đồng chấm 668KB nội dung eager là vấn đề số 4; giờ content/modules/ đã 1.6MB raw (module-20 một mình 133KB) và vẫn nạp kiểu eager glob qua static import từ entry (AppGate/LearnPage/LessonPlayer eager → loadModules → RAW_MODULES). Kết quả đo thật: chunk content chiếm 274KB gzip trong tổng ~530KB gzip JS khởi động — người học đang ở module 1 vẫn phải kéo trọn đề thi, lab, ca bệnh của module 21 trước khi màn hình đầu render. Trên mạng 3G (~50KB/s) riêng nội dung là ~5.5 giây. Tệ hơn: vì là một chunk duy nhất có hash, SỬA MỘT CHỮ trong một module là toàn bộ 274KB đổi hash, người học cũ tải lại hết. Việc tách content thành chunk riêng (thay vì trộn vào index như đợt trước) chỉ mới là cache tốt hơn giữa các lần deploy không đổi nội dung, chưa phải code-split theo nhu cầu. Nội dung còn tăng tiếp (spec còn phần nâng cao) — đường cong này không tự dừng.
  → Hai bậc. Bậc S làm ngay: bỏ content ra khỏi đường modulepreload chặn paint — chuyển glob sang non-eager, AppGate await import trong lúc màn skeleton/onboarding hiện (paint xong mới kéo nội dung). Bậc M đúng bài: tách manifest nhẹ (id, order, title, số bài — vài KB, eager) khỏi thân module (lazy theo glob non-eager, mỗi module một chunk ~10-15KB gzip); loadModules giữ API sync cho manifest, thân bài nạp async khi vào module + prefetch module kế tiếp. Mỗi lần sửa nội dung chỉ invalidate đúng chunk module đó.
- `○` **[P1/M] Zod và toàn tháp schema vẫn ship + thực thi lúc khởi động dù PROD không bao giờ validate — tối ưu 'bỏ validate' mới tiết kiệm CPU, chưa tiết kiệm byte nào.**
  Bằng chứng: src/content/index.ts:29-30 (nhánh PROD không gọi parseModule); dist/assets/schemas-21QHUKEj.js 149.88 kB │ gzip: 46.42 kB chứa lõi zod (đếm thật: 351 lần '_zod', 5 'ZodError') và được modulepreload trong dist/index.html; các chunk labSchema (36.7KB), psSchema (17.7KB), clinicSchema (14.7KB) cũng đều modulepreload
  loadModules PROD đi nhánh không-parse, nhưng contentSchema.ts (và qua nó cliSchema/labSchema/psSchema/clinicSchema/palaceSchema) vẫn bị import tĩnh từ đường nóng để lấy type + vài hàm tiện ích (orderedLessonIds). Các định nghĩa z.object(...) là lời gọi hàm top-level nên bundler không tree-shake được: lõi zod (~40KB gzip trong chunk schemas) tải VÀ CHẠY khởi tạo hàng trăm schema ngay lúc mở app, rồi không ai dùng — grep toàn src: mọi safeParse/parse ngoài test chỉ nằm trong các hàm parse* phục vụ nhánh DEV và DesignPage (vốn đã lazy). Đây là ~15-20% JS khởi động trả cho một tính năng đã cố tình tắt trong PROD.
  → Tách hàm: contentSchema chỉ export type + hàm thuần (orderedLessonIds, validateModules logic thuần); mọi ZodSchema + parseModule dời sang file riêng (vd contentSchema.zod.ts) mà src/content/index.ts nạp bằng dynamic import bên trong nhánh `if (!import.meta.env.PROD)` — Vite thay hằng lúc build nên PROD rụng hẳn cả nhánh lẫn chunk zod. Kiểm lại bằng build: chunk schemas không còn trong danh sách modulepreload.
- `○` **[P2/S] Mỗi phím gõ trong CliConsole re-render toàn bộ nhật ký lệnh không giới hạn độ dài.**
  Bằng chứng: src/features/cli/CliConsole.tsx:153 (state input đặt cùng component với transcript) và :315-328 (entries.map render lại mọi entry mỗi render)
  gradeCli đã được memo đúng (dòng 157), nhưng setInput mỗi phím gõ vẫn re-render cả cây: bảng mục tiêu, hàng nút console và toàn bộ transcript. entries không có trần — một phiên capstone gõ 60-80 lệnh (kèm block <pre> nhiều dòng của show) là mỗi phím gõ dựng lại hàng trăm node. Trên máy yếu — đúng đối tượng của app học miễn phí — input bắt đầu trễ nhẹ. Chưa đau ở bài ngắn, nhưng là loại nợ phình theo độ dài phiên.
  → Bọc React.memo cho một component EntryRow (props entry bất biến theo id) hoặc tách form input + state input thành component con để keystroke không chạm cây transcript. Một giờ, kèm đo lại bằng React Profiler.
- `○` **[P2/S] ospfRoutesOf chạy lại trọn BFS cho MỖI chặng router của MỖI lượt ping — vô hại ở 10 thiết bị, không có rào khi topology lớn lên.**
  Bằng chứng: src/engine/lab/simulate.ts:548 (routerNextHop gọi ospfRoutesOf mỗi lần chọn chặng kế); src/engine/lab/ospf.ts:233-252 (BFS mà mỗi node frontier lại gọi fullNeighborsOf → ospfNeighborsOf quét toàn bộ topo.links)
  Một lượt ping qua k router → k lần dựng lại toàn bộ bảng OSPF, mỗi lần O(routers × links); bài nhiều behavior-goal (runLabGoals chạy chung trong gradeCli, CliConsole.tsx:157) nhân thêm số goal. Đo trên sơ đồ to nhất hiện có (module-21: 10 thiết bị) thì hoàn toàn không đáng kể — đây KHÔNG phải bug hiệu năng hôm nay. Ghi nhận vì nó nằm đúng đường 'chấm sống mỗi lệnh' và spec nâng cao sẽ còn mở sơ đồ lớn hơn: dạng chi phí ẩn này không có chỗ nào kêu lên khi bắt đầu đau.
  → Cache ospfRoutesOf theo (topology reference, deviceId) bằng WeakMap — topology bất biến giữa các lệnh nên cache tự đúng, xóa tự động khi topology thay. Cùng mẫu áp cho computeStp trong show.ts:108/:251. Dưới một giờ, giữ engine thuần.

### Ghế 13 — i18n & song ngữ (8.2)

Song ngữ phần trung cấp làm thật chứ không làm phép: parity 529/529 key khớp cả bộ placeholder, bản EN là transcreation tay nghề cao, không một chuỗi Việt trần trong UI mới — chỉ còn ba gợn nhỏ đều sửa dưới một giờ.

Điểm mạnh nổi bật:

- Parity tuyệt đối và có test khóa ba tầng: cùng cấu trúc key, cùng bộ {placeholder} từng key, và quét key mồ côi trong code (src/i18n/i18n.test.ts:19-42, 63-78) — tự chạy xác nhận 529/529 key, 0 lệch placeholder, 8/8 test xanh.
- Bản EN là transcreation thật chứ không phải dịch máy: 'administratively shut down' (en.json lab.failure.port-shutdown), 'the invisible deny at the end of the list caught it' (lab.deniedByImplicit), 'memory pays in installments' (grad.nextRoadTrungCap) — đọc như dân mạng viết, đã soi hơn 60 chuỗi mới thuộc cli/grad/vlsm/lab.
- labStrings.test.ts:17-51 phủ đủ mọi mã engine MỚI của đợt trung cấp (3 bệnh trunk M14, port-shutdown, acl-denied) ở CẢ HAI ngôn ngữ, kèm luật giọng văn không chữ 'SAI' — đúng bài học từ lỗi clinic Phase 1.
- Không một chuỗi tiếng Việt hardcode nào lộ ra người học trong src/features/{cli,drill,graduation,lab} — grep dấu tiếng Việt chỉ trúng comment; output thiết bị CLI đúng khuôn IOS tiếng Anh là fidelity đã khai (GHI-CHU-KY-THUAT.md:103-106), lệnh lạ và trợ giúp '?' kể lời qua i18n (cli.termUnknown, cli.termHelpTitle).
- Chiến lược nội dung khớp tuyên bố 100%: module 13-21 LText vi-only (0 nhánh en, tự đếm cả 21 file) — nhất quán với M1-12 và đúng khai báo tại src/engine/ltext.ts:5-6 + GHI-CHU-KY-THUAT.md:305-307; UI đọc qua lt(), nhãn SVG mới của JourneyMap chỉ dùng chữ cái phần + số thứ tự nên trung tính ngôn ngữ.

- `○` **[P2/S] Streak 1 ngày hiện '1 days' — phạm luật số trung tính của chính dự án.**
  Bằng chứng: src/features/graduation/GraduationPage.tsx:160 + src/i18n/en.json:548
  GraduationPage.tsx:160 render Tile với value={streak.current} và unit={t('grad.statStreakUnit')}; en.json:548 là "days". Người mới đạt mốc tốt nghiệp với streak đúng 1 ngày (trường hợp không hiếm) sẽ đọc '1 days'. GHI-CHU-KY-THUAT.md:302-304 tuyên bố rõ: chuỗi EN phải viết dạng trung tính số, 'không "1 cards"'. Bản VI '1 ngày' thì vô sự.
  → Bỏ unit khỏi tile streak và nhét đơn vị vào label ('Day streak (days)'), hoặc đổi format thành dạng trung tính như các key khác trong dự án đã làm (kiểu 'Ports held down: {count}').
- `○` **[P2/S] Chính tả Anh-Anh 'neighbour' nằm ngay cạnh lệnh Anh-Mỹ 'neighbor' trong cùng một dòng.**
  Bằng chứng: src/i18n/en.json:520
  Key cli.cmd."show ip ospf neighbor" có mô tả EN 'the OSPF neighbour table...' — dùng chính tả British trong khi chính tên lệnh Cisco là American 'neighbor', và đây là chuỗi DUY NHẤT trong toàn bộ en.json dùng chính tả British (đã quét cả file: neighbour/colour/behaviour/centre... chỉ trúng 1). Màn help '?' sẽ in hai cách viết cạnh nhau trên cùng một dòng.
  → Đổi 'neighbour' thành 'neighbor' cho khớp tên lệnh và phần còn lại của file.
- `○` **[P2/S] Ba họ key động mới (cli.cmd.*, vlsm.issue.*, ps.cmd.*) không có test gác — đúng lớp lỗi 'key trần' đã từng xảy ra.**
  Bằng chứng: src/features/cli/CliConsole.tsx:110, src/features/drill/VlsmDrill.tsx:306, src/features/ps/PsConsole.tsx:67-69
  Ba chỗ ghép key động: t(`cli.cmd.${c}`), t(`vlsm.issue.${issue}`), t(`ps.cmd.${c}`) — test 'key mồ côi' trong i18n.test.ts:68-71 chỉ quét lời gọi tĩnh nên không thấy, và khác với lab (labStrings.test.ts dùng Record<Mã, true> để tsc đỏ ngay khi engine thêm mã mới), ba họ này không có bảng gác nào. Hiện tại tự đối chiếu thì đang khớp (27/27 lệnh CLI, 7/7 mã VlsmIssue, 10/10 cmdlet trừ Get-Help cố ý ẩn) — nhưng thêm lệnh thứ 28 hay mã issue thứ 8 mà quên i18n là người học đọc 'cli.cmd.xyz' giữa màn help, không test nào đỏ. Chính comment mở đầu labStrings.test.ts:1-11 thừa nhận lớp lỗi này đã xảy ra thật với clinic.
  → Nhân khuôn labStrings.test.ts: một test duyệt CLI_COMMANDS, bộ mã VlsmIssue và PS_COMMANDS, khẳng định hasString(lang, key) cho cả vi lẫn en — chưa tới 30 dòng, chặn vĩnh viễn lớp lỗi này.

### Ghế 14 — Riêng tư, dữ liệu & độ bền (7.5)

Cửa migrate v1→v4 kỷ luật, có fixture thật và test xanh, xuất/nhập backup gánh trọn trường mới; nhưng nút "Dùng cửa sổ này" ghi đè tiến độ mới bằng RAM cũ, và bài dở lab gặp nội dung đã đổi thì thiết bị mới tàng hình không đường thoát — hai lỗ mất-dữ-liệu-im-lặng đúng loại mà mảng này tồn tại để chặn.

Điểm mạnh nổi bật:

- Chuỗi migrate từng bậc v1→v2→v3→v4 đúng chuẩn (src/store/progress.ts:681-711), có fixture v1 THẬT đóng băng (tests/fixtures/progressV1.json) và 12 test đều xanh khi tự chạy (progress.migrate.test.ts + practiceDraft.test.ts) — kể cả case v3 đã có mode thì không đụng vào, và drill cũ được đóng dấu 'subnet' thay vì rơi khỏi biểu đồ.
- Xuất backup là ảnh chụp RAW của 3 key localStorage (src/features/profile/ProfilePage.tsx:23-37) nên shape-agnostic: challengeUsed, drafts cli, DrillResult.mode tự đi theo không cần sửa gì; nhập backup v3 cũ vào app v4 đi đúng qua cửa migrate lúc reload (version giữ nguyên trong payload).
- Trần 12 bài dở kind-agnostic nên thêm nhánh cli không cần sửa; test phủ cả vượt trần, ghi đè không phình, và lưu bài dở không XP/streak (src/store/practiceDraft.test.ts:56-84) — hàng rào nguyên tắc 5 đặt đúng chỗ dễ thủng nhất.
- Không một byte rời máy: grep fetch/XMLHttpRequest/sendBeacon/WebSocket/EventSource trong src/ sạch, chỉ có 2 anchor liên hệ tĩnh (src/components/AppLayout.tsx:134-136).
- Draft sai kind (câu đổi từ lab sang cli nhưng giữ id) được chặn ngay tại cổng bằng check savedDraft?.kind (src/components/QuestionInput.tsx:210, 243, 264) — mở bài mới sạch thay vì crash; và ModuleTestPage không truyền draftKey (src/features/learn/ModuleTestPage.tsx:239) nên bài thi không bao giờ sinh bài dở.

- `○` **[P1/S] Nút "Dùng cửa sổ này" không rehydrate — cửa sổ giành lại quyền ghi đè tiến độ mới bằng state RAM cũ.**
  Bằng chứng: src/components/SingleWindowGuard.tsx:50-54
  Kịch bản: mở nhầm tab B (bị chặn ngay lúc mount, store đã hydrate tại thời điểm đó), học 1 giờ ở tab A (persist ghi localStorage sau mỗi action), rồi quay lại B bấm "Dùng cửa sổ này". Handler chỉ postMessage('takeover') + setBlocked(false) — KHÔNG gọi useProgress.persist.rehydrate(). Action đầu tiên ở B sẽ persist TOÀN BỘ state RAM cũ của B, xóa sạch 1 giờ học ở A. Đây chính xác là kiểu "mất tiến độ im lặng" mà comment đầu file (dòng 1-8) tuyên bố guard này tồn tại để chặn — guard chặn được hai cửa sổ ghi SONG SONG nhưng thủng ở đường bàn giao.
  → Trong onClick của nút takeover: await useProgress.persist.rehydrate() (và useSettings nếu có persist) TRƯỚC setBlocked(false); hoặc đơn giản hơn là window.location.reload() sau khi postMessage('takeover') — tải lại là hydrate mới nhất, không cần đồng bộ tay.
- `○` **[P1/S] Bài dở lab không có lưới đỡ nội-dung-đã-đổi: thiết bị mới của spec tàng hình, "Về sơ đồ ban đầu" cũng không cứu được.**
  Bằng chứng: src/features/lab/NetworkLab.tsx:167-174 và 307-311; src/features/lab/LabCanvas.tsx:311-312
  lessonRuntimes có lưới đỡ so tập khóa khi nội dung đổi (src/store/progress.ts:365-381, bài học được hội đồng trước) nhưng practiceDrafts thì KHÔNG: restoreLab (src/engine/lab/session.ts:146-154) nhận thẳng topology cũ không kiểm gì, và layout lấy nguyên từ draft (NetworkLab.tsx:172-174). Kịch bản mandate — question id giữ, sơ đồ đổi (thêm thiết bị/goal mới): thiết bị mới không có trong layout cũ → LabCanvas.tsx:311-312 return null → thiết bị TÀNG HÌNH, goal trỏ vào nó không bao giờ đạt. Nút "Về sơ đồ ban đầu" chỉ setSession(resetLab(...)) mà không regen layout (NetworkLab.tsx:307-311) nên reset xong thiết bị vẫn vô hình — người học kẹt câm lặng, chỉ thoát bằng cách tự thêm thiết bị tay. Không trắng màn (simulatePing trả 'src-not-found' thay vì throw — simulate.ts:840-843) nhưng là ngõ cụt không lời giải thích. CLI đỡ hơn vì "Làm lại từ đầu" clear draft thật (onDraftChange(null)).
  → Hai mũi, đều rẻ: (1) lúc restore, so tập device id của draft.topology/layout với spec.initial + devicesReferencedBy(spec.goals) — lệch thì bỏ draft mở bài sạch, đúng triết lý "mất một bài dở còn hơn kẹt" của lưới lessonRuntimes; (2) onReset gọi thêm setLayout(autoLayout(spec.initial.devices)).
- `○` **[P2/S] importBackup nuốt version tương lai và ghi settings/lang không kiểm — file hỏng kiểu tinh vi qua cửa êm.**
  Bằng chứng: src/features/profile/ProfilePage.tsx:44-51
  Validate chỉ dừng ở: app === 'netmaster', progressRaw parse ra object có version là number. Backup version 99 (từ bản app tương lai) qua cửa — migrate trả nguyên payload (progress.ts:707-710), shallow-merge chỉ đỡ key THIẾU chứ không đỡ key CÓ MẶT nhưng sai kiểu/đổi tên, app sau reload có thể crash rải rác thay vì từ chối tử tế lúc nhập. Hai key netmaster-settings và lang ghi thẳng không kiểm parse (dòng 48-51).
  → Thêm: Number.isInteger(version) && version >= 1 && version <= CURRENT (báo "backup từ bản app mới hơn, hãy cập nhật app" khi vượt), spot-check vài trường quý (Array.isArray(state.reviewCards), typeof xpTotal === 'number'), và JSON.parse thử netmaster-settings trước khi ghi.
- `○` **[P2/S] Dọn trần bài dở theo thứ tự MỞ ĐẦU TIÊN, không phải lần chạm cuối — bài vừa quay lại làm tiếp vẫn có thể là bài bị dọn kế tiếp.**
  Bằng chứng: src/store/progress.ts:567-578
  Ghi đè giữ nguyên chỗ đứng trong hàng (comment dòng 569-571 nói rõ là cố ý). Hệ quả: người học mở lab A từ tuần trước, hôm nay quay lại làm tiếp 20 phút (mỗi thay đổi đều save nhưng vị trí không đổi), rồi trong tuần mở thêm đủ 12 mặt bàn khác — bài A vừa được đầu tư thêm 20 phút là bài bị dọn ĐẦU TIÊN. LRU theo lần chạm phản ánh giá trị công sức đúng hơn và chỉ tốn một dòng (delete rồi re-insert key khi ghi đè). Kèm theo: draft mồ côi của câu đã bị xóa khỏi nội dung nằm lì chiếm 1/12 suất trần tới khi bị đẩy ra — lưới đỡ ở finding P1 trên sẽ tiện tay dọn luôn.
  → Trong savePracticeDraft: nếu key đã tồn tại thì delete trước khi gán lại để re-insert về cuối hàng (LRU theo lần chạm), sửa test 'giữ nguyên chỗ đứng' thành khẳng định ngược lại.

### Ghế 15 — Capstone & khép khóa (7.2)

Capstone có xương sống tốt (số liệu VLSM/wildcard/ACL đúng tuyệt đối, màn tốt nghiệp sạch và có test đủ 4 bất biến) nhưng đỉnh của cả khóa — ca bệnh liên tầng — đưa bằng chứng phi vật lý (nslookup sống trên đường L2 đã đứt) và bắt người học đoán nửa bệnh L2 vì không có cách nào soi trunk, cộng chuỗi 3 chặng lặng lẽ đánh rơi phòng kỹ thuật khỏi "cùng một mạng".

Điểm mạnh nổi bật:

- Toàn bộ con số tự tính lại đều đúng: 60/25/10 máy ra /26 /27 /28 nối đuôi không kẽ hở (module-21.json:69), liên site /30 dùng .113/.114 (module-21.json:103), wildcard 0.0.0.63/0.0.0.15/0.0.0.3 khớp từng câu network với từng cổng router (module-21.json:561-563, 784-786) và cả dòng ACL (module-21.json:854) — bản cắt chặng 1 thật sự được tra cứu tới dòng luật cuối như module tự hứa.
- Màn tốt nghiệp làm đúng cả 4 yêu cầu và có test chứng minh: mốc suy từ dữ liệu không đóng đinh module-12/21 (milestones.ts:19-31), gõ URL thẳng không vượt cổng (GraduationPage.tsx:110-125), bản đồ tô đúng số ô đã đậu (GraduationPage.tsx:60-63), không một action store nào bị gọi (GraduationPage.test.tsx:104-113); cửa vào từ màn ĐẬU có thật (ModuleTestPage.tsx:309-310).
- Hai concept đúng nghĩa meta, không lén khái niệm kỹ thuật mới (module-21.json:1204-1234) — đúng spec 'toàn module là làm'; ẩn dụ giàn giáo cho kiểm-chứng-từng-tầng là một trong những ẩn dụ đắt nhất khóa.
- Chặng 3 chấm cặp thông-chặn đủ 4 mục tiêu (module-21.json:843-846) và deepDive tự khai vì sao (module-21.json:700) — chống được cả hai kiểu giải tủ rút-dây và permit-any, đúng luật M4 ở cỡ lớn.
- Ca thi biến tấu thật so với ca luyện: bài 4 là DNS thiếu bản ghi (module-21.json:1111), đề thi là DNS trỏ sai địa chỉ (module-21.json:1647) — đo chuyển giao kỹ năng chứ không đo trí nhớ về ca đã gặp.

- `✓PB` **[P0→P1/M] Ca liên tầng cho nslookup trả lời thành công qua đường L2 đã đứt — bằng chứng phi vật lý ngay trong bài dạy đọc bằng chứng.**
  Bằng chứng: src/engine/clinic/terminal.ts:142-151 đối chiếu content/modules/module-21.json:1040 (SW-1 nativeVlan 10) vs 1049 (SW-2 native mặc định 1) và 1031 (SRV-DNS 10.20.0.53 nằm ở trụ sở, sau trunk đứt)
  resolveName chỉ đọc overlay.dns, không hề kiểm đường tới máy chủ DNS. Trong CẢ HAI ca liên tầng của M21, DNS server (10.20.0.53) nằm ở trụ sở, sau đúng đoạn trunk lệch native đang giết mọi khung của PC-KinhDoanh (tôi đã lần tay: khung PC ra p3 native 10 không nhãn → SW-2 nhận vào native 1 → chết trước cả gateway). Vậy mà nslookup vẫn trả 'Non-existent domain' (ca bài 4) và trả bản ghi trỏ sai 10.20.0.99 kèm header 'Server: 10.20.0.53' (ca thi, module-21.json:1675). Người học giỏi làm đúng bài học của chính module — kiểm từng tầng — sẽ gõ thêm ping 10.20.0.53 và thấy nghịch lý: máy chủ DNS vừa trả lời truy vấn UDP nhưng ping tới chính nó thì rớt. Ca đỉnh khóa dạy ngầm rằng phân giải tên không đi trên con đường mạng — sai kiến thức nền tảng đã dạy ở M11/M18.
  → Hai đường, chọn một: (a) sửa engine — resolveName kiểm reachability từ seat tới dns.serverIp bằng simulatePing, đường đứt thì trả dns-timeout (khớp failure đã có sẵn); khi đó phải chuyển bệnh DNS của hai ca sang dạng khác quan sát được; hoặc (b) sửa content rẻ hơn — dời SRV-DNS về nhánh chi nhánh, cắm vào SW-1 VLAN 10 (cùng segment với PC, không qua trunk): nslookup thành công là HỢP LÝ vật lý, còn đường số về trụ sở vẫn đứt vì trunk — hai manh mối hết đá nhau.
  *Phản biện: Đã mở src/engine/clinic/terminal.ts (resolveName dòng 142-151 chỉ đọc overlay.dns, cmdNslookup dòng 469-487 không hề gọi sim), content/modules/module-21.json (dòng 1040 SW-1 native 10, 1049 SW-2 không khai native, 1031+link e7 SRV-DNS 10.20.0.53 ở trụ sở sau trunk; ca thi dòng 1576/1585/1640/1647/1675 y hệt), src/engine/lab/topology.ts:337 (DEFAULT_NATIVE_VLAN=1) và simulate.ts:283-353 (khung VLAN 10 ra trần ở SW-1, SW-2 nhận vào native 1 → không bao giờ tới router). Tái lập ĐÚNG TỪNG khẳng định: cả hai ca liên tầng M21 đều cho nslookup trả lời từ máy chủ DNS mà đường L3 tới nó đã đứt — nghịch lý ping 10.20.0.53 rớt nhưng DNS vẫn đáp là có thật; failure 'dns-timeout' có sẵn nên đề xuất (a) khả thi, (b) cũng hợp topology. Hạ P0→P1 vì: chấm điểm, đáp án chẩn đoán và luồng học đều đúng, không test nào đỏ, nghịch lý chỉ lộ khi người học chủ động ping thêm máy chủ DNS — lỗi trung thực nội dung nghiêm trọng ở ca đỉnh khóa nhưng không chặn/không làm sai kết quả của ai.*
- `○` **[P1/M] Nửa bệnh L2 của cả hai ca liên tầng không thể khám ra trong app — chỉ đoán được bằng loại trừ, trái luận đề 'mỗi tầng một tấm bằng chứng' của chính module.**
  Bằng chứng: src/features/clinic/ClinicTerminal.tsx:2 ('không sơ đồ' trong pha khám), src/features/clinic/ClinicRoom.tsx:201-216 (nhánh choose-action chỉ có terminal + hai bảng chọn), đối chiếu SPEC-TRUNG-CAP.md:198-202
  Ghế người học là PC với 8 lệnh Windows; capture chỉ có src/dst/dropped không có vị trí hay VLAN (terminal.ts:107-116). Không có canvas, không có CLI switch, không có bất kỳ cửa nào nhìn thấy mode/native của p3 hai đầu. Vậy mà solution bảo 'soi trunk: SW-1 khai native 10, SW-2 để native 1' (module-21.json:1145) — soi bằng gì? Người học chỉ khoanh được 'đứt đâu đó trong L2 chi nhánh' (ping gateway rớt) rồi chọn phương án duy nhất nhắc L2. Đáng nói: spec 4.2 đã hứa đúng công cụ cho việc này — 'phòng khám trung cấp cho khám bằng CẢ hai terminal (Windows phía máy con, CLI phía thiết bị) trên cùng một mạng sống' (SPEC-TRUNG-CAP.md:200-202) — nhưng hai ca M21 không được cấp CLI thiết bị.
  → Cấp cho ca liên tầng M21 (và các ca choose-action trung cấp nói chung) một ghế CLI thiết bị chỉ-đọc bên cạnh terminal Windows — tối thiểu show interfaces trunk / show running-config trên hai switch — đúng lời hứa spec 4.2; engine CLI đã có sẵn, đây là việc nối UI ClinicRoom với nó.
- `○` **[P1/M] Chuỗi 3 chặng không 'trên CÙNG một mạng': phòng kỹ thuật và dải /27 lặng lẽ bốc hơi từ chặng 2, sơ đồ vật lý bị đập dựng lại không một lời.**
  Bằng chứng: content/modules/module-21.json:111-186 (chặng 1: ba phòng kd/kt/kh, ba switch, router có cổng .65/27) vs 407-520 (chặng 2: chỉ còn kd VLAN 10 + khách VLAN 20, hai switch, router chỉ còn g0 /26, g1 /28, g2 /30), đối chiếu SPEC-TRUNG-CAP.md:163-165 và chính lời module tại dòng 57
  Spec đóng đinh 'chuỗi 3 chặng trên CÙNG một mạng', và teach của chính module hứa 'chặng sau xây trên chặng trước' (module-21.json:57). Thực tế: người học vừa đổ mồ hôi cắt 10.40.0.64/27 cho 25 máy kỹ thuật và cấp IP cho PC-KyThuat ở chặng 1, sang chặng 2 thì phòng đó biến mất — không cổng router, không VLAN, không câu network (summary dòng 645 liệt kê wildcard cũng chỉ còn /26 /28 /30), và toàn bộ kiến trúc vật lý đổi từ ba-switch-ba-phòng sang hai-switch-VLAN mà hook chỉ nói 'đội thi công vừa rút đi'. Người học cẩn thận sẽ tự hỏi mình cắt /27 để làm gì và vì sao 'khai đủ ba mạng' lại thiếu đúng mạng mình vừa dựng.
  → Hoặc giữ đủ ba phòng qua chặng 2-3 (thêm VLAN 30 kỹ thuật + cổng router .65/27 + câu network 10.40.0.64 0.0.0.31 — thêm đúng một câu wildcard /27 vốn đang vắng mặt cả module), hoặc rẻ hơn: một câu chuyển cảnh trong hook chặng 2 khai thật ('phòng kỹ thuật chuyển sang tòa khác, dải /27 để dành') để bản cắt không thành lời hứa suông.
- `○` **[P1/S] Pool tổng ôn 14 câu (không phải 15 như TRANG-THAI ghi) và trống hoàn toàn M15 STP — 'tổng ôn trá hình cả trung cấp' hở đúng một module.**
  Bằng chứng: content/modules/module-21.json:1237-1677 (đếm đúng 14 id m21-mt-*, grep 'STP|vòng lặp|spanning' toàn file: 0 kết quả), đối chiếu SPEC-TRUNG-CAP.md:87 (M15 = STP) và TRANG-THAI.md:630
  Phủ pool tôi rà từng câu: VLSM ×2 (mt-2,3), trunk ×1 (mt-4), OSPF ×2+cli (mt-5,6,cli), ACL ×3 (mt-7,8,9), giaddr ×1 (mt-10), AGDLP ×1 (mt-11), baseline ×1 (mt-12), quy trình ×1 (mt-1), ca clinic ×1. M15 (STP — root election, cổng block, bão broadcast) không có một câu nào; chính danh sách trong TRANG-THAI.md:630 cũng bỏ sót STP khi tự liệt kê. Người học có thể tốt nghiệp trung cấp mà bài thi cuối chưa từng chạm lại kiến thức chống vòng lặp. Pool 14 ≥ 12 nên không phạm luật cứng, nhưng danh xưng 'tổng ôn cả trung cấp' thì chưa xứng.
  → Thêm 1-2 câu STP vào pool (ví dụ: mcq 'ba switch nối tam giác, priority bằng nhau — ai làm root và cổng nào block' đúng luật tất định của engine, và/hoặc typed về hệ quả rút dây thì cổng block tự mở) — vừa vá lỗ phủ vừa khớp lời TRANG-THAI đã ghi 15 câu.
- `○` **[P2/S] Đề thi không đảm bảo ca liên tầng 'kết đề' như spec và chính lời teaser của module hứa.**
  Bằng chứng: src/engine/masteryPool.ts:81 (shuffle cuối trộn cả anchor lẫn câu thường), đối chiếu SPEC-TRUNG-CAP.md:171 ('kết bằng ca bệnh liên tầng'), content/modules/module-21.json:1197 ('kết bằng một ca liên tầng'), TRANG-THAI.md:631 ('1 clinic kết đề')
  drawMasteryTest luôn RÚT được ca clinic (anchor) nhưng bước shuffled cuối cùng đặt nó ở vị trí ngẫu nhiên — ca tổng duyệt cảm xúc nhất khóa có thể rơi vào câu số 1, phá nhịp 'lên đỉnh rồi khép màn' mà cả spec lẫn nextTeaser của bài 4 đã hứa với người học. ModuleTestPage gọi thẳng drawMasteryTest(pool) không sắp lại (ModuleTestPage.tsx:185).
  → Sau shuffle, đẩy câu kind 'clinic' (hoặc tổng quát: anchor nặng nhất) về cuối mảng trong drawMasteryTest — một dòng sort ổn định, test tất định sẵn có rng bơm ngoài nên dễ khóa hành vi.
- `○` **[P2/S] Mục tiêu 'viewed show ip ospf neighbor' tick xong cả khi bảng láng giềng còn rỗng — lời hứa 'kiểm chứng ra Full trước khi nộp' không được chấm thật.**
  Bằng chứng: src/engine/cli/gradeCli.ts:157-158 (chỉ so command + deviceId, không nhìn trạng thái), đối chiếu content/modules/module-21.json:403 ('KIỂM CHỨNG láng giềng ra Full trước khi nộp') và 528 (goal viewed)
  Người học có thể gõ show ip ospf neighbor NGAY khi vào bài (bảng rỗng) rồi mới cấu hình — goal 'viewed' vẫn xanh vĩnh viễn vì flags.viewed chỉ ghi dấu đã-chạy-lệnh. Hai goal ping phía sau vẫn ép OSPF phải thật sự lên nên không lọt người chưa làm được bài, nhưng nghi thức 'nhìn thấy chữ Full làm bằng chứng' — đúng linh hồn của concept m21-kiem-chung — thì không được đo: bằng chứng rỗng cũng được tính là bằng chứng.
  → Cho goal viewed một biến thể có điều kiện trạng thái (ví dụ viewed-when: lệnh chạy TẠI thời điểm neighbor Full mới ghi dấu), hoặc khi ghi flags.viewed cho show ip ospf neighbor thì đính kèm snapshot có-Full-hay-không để goal đối chiếu — áp dụng luôn cho m21-mt-cli (module-21.json:1513).

---

## 6. Việc đề xuất theo thứ tự đáng làm (chờ chủ dự án duyệt)

Hội đồng chỉ đánh giá — mọi việc dưới đây đụng nội dung/hành vi nhìn
thấy được nên cần duyệt trước khi code (luật CLAUDE.md).

**Đợt 1 — ba câu dạy sai (P0, cả ba đều S, cộng lại dưới một buổi):**

1. `show spanning-tree` in vai `Root`/FWD cho root port — expose
   `rootPorts` từ `computeStp` (dữ liệu đã tính sẵn).
2. Sửa "mặc định mười lăm phút" → "thường đặt cỡ 15 phút" ở hai chỗ
   module-19 (teach + flashcard).
3. Sửa câu ví dụ wildcard module-13:485 (0.0.0.254 + nền lẻ, hoặc ví dụ
   chọn-octet dễ kiểm hơn).

**Đợt 2 — vá phép đo (cụm ✓PB, đa số S):**

4. Ca hai tầng M21 (practice + thi): cả ba lựa chọn đều "HAI bệnh" nhưng
   khác cặp; đổi cặp bệnh giữa practice và thi; mở rộng test cue độ-dài
   sang choices của clinic.
5. `examMode` cho CliConsole trong bài thi: mục tiêu vẫn là đề bài nhưng
   ẩn trạng thái ✓/○ — tự kiểm bằng lệnh show chính là kỹ năng cần đo
   (cân nhắc cả lab trong thi, tiền lệ cùng lỗ hổng).
6. M13 có câu trụ: cờ `anchor` theo câu (hoặc 1-2 câu cắt-trọn-dải) +
   bất biến content.test; thêm 1-2 câu STP vào pool M21 (đang trống M15).
7. Goal `native-match` hai đầu link cho m14-mt-cli-2 (đang chấm rớt cách
   sửa hợp lệ mà chính explain công nhận).
8. Hai lỗi data M20: explain m20-mt-ps2 trích sai timestamp; script sinh
   srv-dhcp.log cấp trùng IP + cấp tiếp sau "no free leases".

**Đợt 3 — capstone trung thực với người học:**

9. nslookup hết phi vật lý: dời SRV-DNS về phía chi nhánh (rẻ) hoặc
   resolveName kiểm reachability trả `dns-timeout` (đúng bài hơn).
10. Cấp CLI thiết bị chỉ-đọc cho ca liên tầng (lời hứa spec 4.2) — engine
    có sẵn, việc là nối UI ClinicRoom.
11. Chặng 2 khai thật chuyện phòng kỹ thuật (một câu chuyển cảnh, hoặc
    giữ đủ ba phòng và được thêm đúng câu wildcard /27 đang vắng).

**Đợt 4 — nền móng (M/L, làm theo sức):**

12. Chiến lược tải nội dung: bậc S bỏ modulepreload chunk content khỏi
    đường paint; bậc M tách manifest nhẹ + thân module lazy theo nhu cầu.
    Kèm: dời tháp zod khỏi PROD bằng dynamic import trong nhánh DEV.
13. Hai lỗ mất-dữ-liệu-im-lặng: nút "Dùng cửa sổ này" phải rehydrate
    trước khi mở khóa; bài dở lab so tập thiết bị với spec, lệch thì bỏ
    draft (đúng triết lý lưới lessonRuntimes).
14. CLI từ chối ACL số 1-99 (cú pháp extended cho số chuẩn là lỗi trên
    IOS thật) + siết AccessListSchema 100-199.
15. Nhóm nhỏ gom một lượt: thuật ngữ "cổng dịch vụ"→"port" (M17/M18 +
    module-10:151 + hình ExtendedAcl); focus VlsmDrill (autoFocus + dồn
    focus khi xong phiên); vẽ lại phòng Exchange cho khác bóng dáng Full;
    nối `net` vào console (hoặc xóa tham số chết + sửa comment hứa suông).

52 phát hiện P2 còn lại nằm trong mục ghế tương ứng (mục 5) — đáng gom
thành các lượt dọn như nếp "đợt ba" của biên bản trước.
