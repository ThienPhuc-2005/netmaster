# Trạng thái dự án — NetMaster (Phase 1-3 XONG; đang làm Phase 4: TRUNG CẤP)

## ĐỌC 30 GIÂY: ĐANG ĐỨNG ĐÂU, LÀM GÌ TIẾP (cập nhật 2026-08-12)

**App hiện có ĐỦ 21/21 MODULE NỘI DUNG + MÀN TỐT NGHIỆP** (M1-12 nhập
môn, M13-17 Phần D, M18-21 Phần E), 1756 test xanh, typecheck sạch,
build qua. **Toàn bộ biên bản hội đồng trung cấp đã XỬ XONG (08-10):
15/15 việc mục 6 (khối 20.2, commit `1d04c0b`) + trọn LƯỢT DỌN 52 phát
hiện P2 mục 5 (khối 20.3).** Nội dung và engine không còn việc nào treo;
các khối gần đây đều là ý lấy từ kho `Y-TUONG.md`.
Việc kế tiếp là của CHỦ DỰ ÁN: ra lệnh commit khối 21.53. **Cả 17 phát
hiện của BA lượt rà soát (mục J 8 ý + mục K 6 ý + mục L 3 ý) đã xử xong
hết; kho ý tưởng SẠCH.** Việc duy nhất còn treo là tuyển người cho các
buổi test người thật (hai dòng DoD).

**Toàn bộ ENGINE của Phần D đã xong.** Không còn engine nào phải viết cho
M13-17: lab lớp 2 (trunk + STP), CLI thiết bị đủ **24/24 lệnh** của spec
mục 5.1, drill VLSM, ACL, OSPF-lite.

| Hạng mục (KE-HOACH-TRUNG-CAP.md) | Trạng thái |
|---|---|
| (11) Spec v2 `SPEC-TRUNG-CAP.md` | XONG |
| (12) Engine lab lớp 2: trunk → STP-lite → UI canvas | XONG |
| (13) Engine CLI: show → cấu hình + gradeCli → `kind:'cli'` + console UI → /design | XONG |
| (14) M13 VLSM: engine drill + màn luyện + `module-13.json` | XONG |
| (15) Nội dung `module-14.json` (trunk) + `module-15.json` (STP) | XONG |
| (16) Engine ACL → OSPF-lite (mở nốt 4 lệnh CLI treo) | XONG |
| (17.1) Nội dung M16 (OSPF, cung điện 8 phòng) | XONG |
| (17.2) Nội dung M17 (ACL, bảo mật lớp 2) | XONG — **hết PHẦN D** |
| (18) Phần E: PS +3 cmdlet → M18 → M19 → M20 | XONG |
| (19) M21 capstone + màn tốt nghiệp | XONG |
| (20) DoD toàn phần + kịch bản test người thật + hội đồng chấm D/E | XONG phần máy làm được — còn 2 dòng DoD cần NGƯỜI |

**KHỐI MỚI NHẤT — 21.53 (08-12), đang ở working tree chờ lệnh commit:**
**Thẻ Hôm nay biết món cứng đầu (ý M4) + dọn hai việc treo.**
- **Thẻ Hôm nay nói ra món hay quên đến hạn.** Dòng "ôn tập đến hạn: 8
  thẻ" giờ nói thêm mấy thẻ trong đó là thứ bạn quên đi quên lại. Nó đổi
  cách đọc con số bên cạnh: 8 thẻ mà ba món cứng đầu thì buổi ôn nặng
  khác hẳn 8 thẻ thường, biết trước là chuẩn bị được tâm thế.
- **Giọng là cơ hội, không phải cảnh cáo.** Đây đúng là lúc đáng gặp lại
  chúng nhất — ôn ngắt quãng bắt trúng lúc sắp quên thì mới bám — nên câu
  chữ nói cái lợi chứ không kể tội. Dùng CHUNG ngưỡng 2 lần với mục "thứ
  bạn hay quên" ở Hồ sơ; hai chỗ lệch nhau là người học đếm ra mâu thuẫn.
- **Đóng một cờ tự treo lượt trước**: câu tổng kết cuối phiên luyện (đã
  viết lại cho hết lặp ý) giờ đã xem tận mắt trên browser — dựng phiên
  đúng một câu để đi tới màn đóng cho nhanh.
- **Cất 6 ý còn treo vào kho** (`Y-TUONG.md` mục N) thay vì để chúng nằm
  trong báo cáo cũ rồi mất: nút tải nốt nói tiến độ · tự tải lại khi mạng
  về · test quét chỗ đọc "toàn bộ khóa học" mà quên tự kiểm · trang
  `/design` bày 8 dạng câu ở cả hai khung · lọc câu trúng đích hơn cho
  phiên luyện · app hỏi "chỗ này giải thích chưa lọt?" khi vẫn sai.
- 1812 test xanh (+4), typecheck sạch, build qua. Kiểm browser thật: gieo
  4 thẻ đến hạn trong đó 3 món quên 2-4 lần → thẻ Hôm nay ghi "Ôn tập đến
  hạn: 4 thẻ — trong đó 3 món bạn hay quên…"; gieo lại 2 thẻ chưa quên
  lần nào → về đúng dòng cũ, không thêm chữ nào. Seed đã xóa.

**KHỐI TRƯỚC — 21.52 (08-12), đã commit `09958f9`:**
**Nút "luyện lại đúng mấy thứ hay quên" (ý sinh từ khối trước).**
- **Mục "Thứ bạn hay quên" giờ có đường HÀNH ĐỘNG.** Trước đó nó chỉ kể
  ra; giờ có nút mở thẳng một phiên luyện quanh đúng những thứ ấy, khỏi
  phải mở lại từng bài.
- **Đề lấy từ đâu, nói thẳng ra**: thẻ ôn chỉ giữ mặt trước/mặt sau, không
  kèm câu hỏi để luyện — nên đề lấy từ bài tập của chính BÀI đã dạy khái
  niệm đó. Đây là xấp xỉ có chủ ý: một bài dạy vài khái niệm nên phiên có
  thể chạm cả khái niệm hàng xóm. Chấp nhận được vì chúng cùng một mạch
  giải thích, đúng thứ cần gặp lại khi một mảnh trong đó không bám.
- **Dùng lại nguyên màn luyện đã có, chỉ thêm nguồn thứ hai.** Nhịp luyện,
  cách chấm, luật không-XP giống hệt phiên "chỗ hay vấp" — dựng màn thứ
  hai chỉ để đổi một dòng soạn đề là nhân đôi chỗ phải sửa về sau.
- **Nhãn trên mỗi câu phải nói đúng con số của nó**: phiên này ghi "từng
  quên N lần", không mượn nhãn "từng vấp N lần" của phiên kia — hai con số
  đo hai chuyện khác nhau.
- 1808 test xanh (+12), typecheck sạch, build qua. Kiểm browser thật:
  gieo 3 thẻ quên 4/3/2 lần → phiên ra 6 câu, câu 1 của chủ đề 1, câu 3
  của chủ đề 3 (trộn xen kẽ đúng), nhãn ghi "từng quên 4 lần". **Đo trước
  và sau khi trả lời một câu: XP, chuỗi ngày và cả ba thẻ (hạn ôn, bậc,
  số lần quên) y nguyên từng chữ** — phiên này không đụng gì thật. Màn
  đóng phiên hiện đúng số câu làm được. Seed đã xóa.

**KHỐI TRƯỚC — 21.51 (08-12), đã commit `f5990df`:**
**Chủ dự án báo một lỗi và hỏi một thiếu sót — xử cả hai.**
- **LỖI: sơ đồ lab trong BÀI THI bị bóp méo.** Màn thi bó cả cột câu hỏi
  vào 512px cho dễ đọc, nhưng bó luôn cả sơ đồ lab — mà mặt bàn lab cần
  tối thiểu 560px. Hậu quả trên màn 1280px: chỉ nhìn thấy MỘT trong bốn
  thiết bị, phải cuộn ngang đi tìm ba cái còn lại. Cùng câu lab đó trong
  bài học thì bình thường, vì bài học không bó cột. Giờ bề rộng theo DẠNG
  CÂU: câu chữ giữ cột hẹp, còn lab/terminal/cung điện/phòng khám được cả
  mặt bàn.
- **Nhân đó sửa luôn một chỗ hụt sẵn từ trước ở CẢ bài học**: hai cột của
  phòng lab chia 2fr/1fr với sàn 280px, ra đúng 536px cho mặt bàn — hụt
  24px so với mức tối thiểu, nên sơ đồ LÚC NÀO cũng phải cuộn ngang trên
  desktop dù cuộn ngang vốn chỉ định dành cho màn dưới 768px. Đổi thành
  3fr/1fr + sàn 256px là vừa khít 560px.
- **THIẾU SÓT: chưa có chỗ xem "những câu hay quên".** App có "chỗ bạn
  hay vấp" nhưng đó là chuyện khác hẳn: vấp đếm số lần thử sai LÚC ĐANG
  HỌC BÀI, tức kiến thức chưa vào. Thứ chủ dự án hỏi là cái đã học xong,
  tưởng nhớ rồi, để vài ngày lại quên — con số đó (`lapses`) có sẵn từ
  ngày đầu nhưng suốt tới nay chỉ dùng để nói một câu giữa phiên ôn, chưa
  bao giờ được kể thành danh sách. Giờ trang Hồ sơ có mục **"Thứ bạn hay
  quên"**, đặt gần đầu trang, mỗi dòng gồm tên khái niệm + chủ đề + số
  lần quên + đường mở lại đúng bài đã dạy nó.
- **Mục này hiện CẢ KHI TRỐNG** — khác mọi mục cùng trang. Các mục kia tự
  ẩn khi chưa có dữ liệu, và chính vì thế người đi tìm không thấy nó ở
  đâu rồi tưởng app không có. Hộp trống nói rõ "chưa có gì" vẫn trả lời
  được câu hỏi "app có chỗ này không"; hộp vắng mặt thì không.
- 1796 test xanh (+10), typecheck sạch, build qua. Kiểm browser thật:
  câu lab 8/8 bài thi module 4 giờ hiện đủ bốn thiết bị, mặt bàn 560px,
  KHÔNG còn chỗ nào phải cuộn ngang (trước: cột 512px, mặt bàn 270px,
  thấy đúng một thiết bị); trang Hồ sơ gieo 4 thẻ quên 4/3/2/1 lần → hiện
  đúng 3 dòng theo thứ tự giảm dần, bỏ thẻ quên 1 lần, ba đường mở bài
  trỏ đúng bài dạy từng khái niệm; hộp rỗng thì hiện câu báo trống. Seed
  đã xóa.

**KHỐI TRƯỚC — 21.50 (08-12), đã commit `d34fcf7`:**
**Màn tốt nghiệp tự kiểm trước khi nói về cả khóa (ý F8).**
Khối trước cho app mở bằng phần nội dung đã về; khối này bịt nốt chỗ
CUỐI CÙNG còn đo bằng toàn bộ lộ trình mà khối trước chưa với tới.
- **Hai đường rò, cùng một gốc.** Mốc tốt nghiệp cũng suy bằng câu hỏi
  "chủ đề nào là chủ đề cuối", nên với nội dung cụt thì (1) **mốc bịa ra**
  — người mới tải 3 chủ đề đầu rồi đậu chủ đề 3 là chạm ngay mốc "tốt
  nghiệp nhập môn"; và (2) **giấy chứng nhận in sai** — tờ ảnh tải về được
  sẽ ghi "3/3 chủ đề" thay vì "3/21". Giấy đã nằm trong máy người ta thì
  gỡ lại không được nữa, nên đây là chỗ sai đắt nhất trong cả app.
- **Chữa ở hai tầng.** Không đủ nội dung thì không có mốc nào, nên mọi
  cửa vào màn tốt nghiệp (màn thi, trang Hồ sơ) tự đóng; ai gõ thẳng
  đường dẫn thì màn nói rõ "chưa soát được cả chặng đường" kèm nút tải
  nốt.
- **Điều đắt nhất khi làm: chưa đủ thì KHÔNG đoán về phía nào cả.** Không
  chúc mừng đã đành, nhưng cũng không được rơi vào màn "mốc này chưa mở"
  có sẵn — người đã tốt nghiệp thật mà hôm nay mạng yếu sẽ đọc đúng câu
  phủ nhận công sức của họ.
- 1786 test xanh (+5), typecheck sạch, build qua. Kiểm browser thật với
  người ĐÃ đậu 12 chủ đề đầu trong lúc mạng đứt sau gói thứ 12: mở thẳng
  đường dẫn tốt nghiệp → hiện "chưa soát được cả chặng đường · còn 9 chủ
  đề", không có nút cấp giấy; bấm tải nốt lúc mạng vẫn yếu → nói thật
  "vẫn chưa tải được". Cho mạng về rồi mở lại: màn tốt nghiệp thật nguyên
  vẹn, "12/21 chủ đề", bản đồ đủ 5 Phần A-E, giấy chứng nhận trở lại.
  Seed đã xóa.

**KHỐI TRƯỚC — 21.49 (08-12), đã commit `96d2a27`:**
**Mở app bằng phần nội dung ĐÃ VỀ — gỡ tận gốc L1 (ý F7 của kho ý tưởng).**
Khối trước đặt lưới đỡ cho người rơi; khối này bỏ hẳn cái hố.
- **App không còn đòi đủ 21 gói mới chịu mở.** Trước đây một cú `Promise
  .all` ôm trọn 21 file nội dung: rớt một file là hỏng cả lượt, mà app
  thì chờ đúng lượt đó mới mở cửa — người đứng ở chủ đề 2 phải chờ gói
  của chủ đề 21 về đủ. Giờ kéo từng gói rời nhau, về được tới đâu học
  tới đó; trang Học nói thẳng "còn N chủ đề chưa tải về máy" kèm nút tải
  nốt, và nói rõ học tới đâu thì mới cần tới phần còn thiếu.
- **Ba lưới an toàn phải dựng cùng lúc, không phải chuyện phụ.** Nặng
  nhất: bộ dọn thẻ ôn mồ côi XOÁ HẲN thẻ, nên chạy nó khi nội dung chưa
  đủ là đọc "gói chưa tải về" thành "khái niệm đã bị bỏ" rồi xoá sạch
  lịch ôn của nửa khóa sau — mất dữ liệu thật vì một lần rớt mạng. Thứ
  hai: gói nằm SAU chỗ đứt phải bỏ đi, vì chuỗi mở khóa đọc dãy theo
  từng cặp liền kề nên [1,2,3,5,6] bị hiểu thành "5 đứng ngay sau 3" —
  đậu chủ đề 3 là chủ đề 5 mở ra, tức thủng cổng mastery. Thứ ba: không
  được gọi tên "chủ đề cuối khóa" khi nội dung chưa đủ, không thì người
  mất mạng giữa chừng bị chúc mừng "khép lại cả khóa học".
- 1781 test xanh (+12), typecheck sạch, build qua. Kiểm browser thật:
  dựng cảnh mạng đứt sau gói thứ 12 → app MỞ RA bình thường với 12 chủ
  đề, thẻ Hôm nay vẫn mời học bài đầu, dòng cảnh báo ghi đúng "còn 9 chủ
  đề" và gọi đúng tên chủ đề cuối đang có; bấm "Tải nốt phần còn lại" khi
  mạng đã về → 9 gói thiếu về hết, app tự tải lại thành đủ 21; khi mạng
  vẫn yếu → hiện "vẫn chưa tải được", không hứa hão. Gieo 2 thẻ ôn của
  chủ đề 20 (chủ đề chưa tải về) rồi mở app: **cả 2 thẻ còn nguyên** —
  đúng chỗ mà thiếu lưới an toàn là mất sạch. Seed đã xóa.

**KHỐI TRƯỚC — 21.48 (08-12), đã commit `746f8d4`:**
**Lượt rà soát thứ ba: BA MÀN HIẾM GẶP — tìm và chữa gọn trong cùng khối.**
Hai lượt trước đi theo NGƯỜI (đường xuôi mục J, đường ngược mục K); lượt
này đi theo MÀN, vào ba chỗ chưa lượt nào bước qua — và cả ba đều rơi
đúng lúc người học yếu thế nhất.
- **L1 — mất mạng thì app thôi đứng câm ở màn trắng.** Cổng vào app chờ
  kéo đủ 21 gói nội dung, nhưng chưa ai bắt nhánh KÉO HỤT: người học nhìn
  một trang trắng trơn, tải lại vẫn trắng, không một chữ nói vì sao. Giờ
  có màn riêng nói thật ("tiến độ của bạn vẫn nằm nguyên trong máy") kèm
  nút Thử lại kéo lại tại chỗ, không phải tải lại trang. Đây không phải
  cảnh hiếm như tưởng: chính service worker cache phần nội dung theo kiểu
  CỐ GẮNG trong khi cổng vào lại ĐÒI ĐỦ — cài app lúc mạng chập chờn là
  đủ dựng ra cảnh này.
- **L2 — nhập file sao lưu giờ cũng có lưới đỡ.** Trong cùng một khung ở
  trang Hồ sơ có hai nút cùng ghi đè sạch tiến độ; nút "Lùi về bản này"
  cất bản đang có trước rồi mới ghi, nút "Nhập từ file" thì không — dù nó
  mới là nút dễ chọn nhầm hơn (file ba tháng trước và file hôm qua trông
  y hệt nhau lúc chọn). Mất bằng chính thao tác đi cứu dữ liệu là kiểu
  mất tệ nhất.
- **L3 — màn trượt bài thi thôi khen sai người.** Đo thật: sai cả 8 câu
  mà app vẫn ghi "Được 0% — gần lắm rồi". Giờ hụt sát ngưỡng mới được nói
  là gần; còn cách một quãng thì app nói thẳng và nút đặc trỏ VỀ BÀI HỌC
  thay vì mời thi lại ngay (cửa thi lại vẫn còn, chỉ lùi hàng hai). Kèm
  dọn bức tường câu lặp: lời dặn chung trước in dưới từng câu sai, 8 câu
  sai thành 6 dòng y hệt nhau che mất mấy dòng thật sự có tin.
- 1769 test xanh (+13), typecheck sạch, build qua. Kiểm browser thật cả
  ba màn: dựng cú kéo nội dung hụt → đọc được màn mới thay vì trang trắng
  (console chỉ còn một dòng cảnh báo có chủ đích, hết "Uncaught (in
  promise)"), màn hẹp 375px không tràn ngang; nhập một file sao lưu thật
  → xuất hiện bản "cất trước lần nhập file" lùi về được; thi vượt sai gần
  hết → "Được 25% — còn một quãng nữa" với nút đặc là "Về học lại module
  này". Seed đã xóa.

**KHỐI TRƯỚC — 21.47 (08-12), đã commit `5d54376`:**
**Dọn nốt 3 ý NHỎ của lượt rà soát ngược — mục K giờ SẠCH.**
- **K4 — đồ thị nếp học thôi trốn đúng lúc đáng nói nhất.** Người ĐÃ
  TỪNG học mà tám tuần đều trống thì đồ thị vẫn hiện, kèm câu nói thật
  "tám tuần gần đây bạn chưa ngồi buổi nào — nếp học đứt rồi nối lại
  được". Người mới tinh vẫn ẩn như cũ: ở đó tám cột 0 chưa kể được gì.
- **K5 — chặng của module đã đậu không còn mang ổ khóa.** Thêm trạng
  thái chặng thứ tư "chưa học": module đậu bằng thi vượt có chặng chưa
  đi, nhưng không chặng nào bị khóa — gắn ổ khóa lên đó là cãi nhau với
  huy hiệu "Đã đạt" ngay phía trên. Module còn khóa vẫn ghi "chưa mở",
  vì ở đó ổ khóa nói đúng.
- **K6 — người đã đi hết khóa không còn rơi vào ngõ cụt.** Hết bài và
  hết thẻ ôn thì thẻ Hôm nay chỉ đường sang phòng khám và drill — hai
  sân vốn đã mở mà thẻ này chưa từng nhắc. Cả hai không cộng XP, không
  đụng lịch ôn, nên mời ở đây không nới luật nào.
- 1756 test xanh (+8), typecheck sạch, build qua. Kiểm browser thật với
  người "đi hết khóa + nghỉ 3 tháng": thẻ Hôm nay chào 94 ngày rồi chỉ
  sang hai sân luyện; thẻ module ghi "CHƯA HỌC" thay cho "CHƯA MỞ"; Hồ
  sơ hiện 2 lượt đóng băng và đồ thị nếp học nói đúng câu tám-tuần-trống.
  Seed đã xóa.

**KHỐI TRƯỚC — 21.46 (08-12), đã commit `34252df`:**
**K1 + K2 + K3 — đón người quay lại sau kỳ nghỉ dài.**
- **K1 — bịt vòng kẹt câm thứ hai.** Thẻ ôn trỏ khái niệm nội dung không
  còn (chuyện xảy ra mỗi lần cập nhật nội dung đổi id) làm phiên ôn ra
  màn TRẮNG và đứng chết tại đó. Chữa ba lớp: **dọn thẻ mồ côi khỏi
  HỘP** ngay khi nội dung nạp xong — phải bỏ hẳn chứ không chỉ bỏ khỏi
  phiên, vì nó tính vào nợ quá hạn mà cổng khóa bài mới đọc đúng con số
  đó; **phiên ôn lọc thêm lần nữa**; và **hộp toàn thẻ mồ côi thì nói tử
  tế** "hôm nay không có thẻ đến hạn" thay vì trang trắng.
- **K2 — số đóng băng là con số của HÔM NAY.** Quỹ hồi theo tháng nhưng
  chỉ hồi khi có hoạt động, nên người vắng qua tháng mở Hồ sơ ra thấy "0
  lượt" ngay dưới dòng "mỗi tháng bạn có 2 lượt". Thêm một hàm thuần-đọc;
  cố ý KHÔNG hồi quỹ lúc đọc — để việc XEM đổi tiến độ là phá nguyên tắc 5.
- **K3 — app chào người vắng lâu.** Vắng từ 14 ngày trở lên thì thẻ Hôm
  nay nói ra số ngày thật, đặt TRƯỚC danh sách việc vì nó đổi cách đọc
  mọi dòng bên dưới. Giọng là đón chứ không trách ("khoảng trống không
  phải lỗ hổng"), và người mới tinh không bị chào nhầm.
- 1748 test xanh (+19), typecheck sạch, build qua. **Dựng lại đúng cảnh
  đã kẹt lúc rà soát**: hộp 40 thẻ (một nửa mồ côi) → app tự dọn còn 20,
  phiên ôn chạy trọn 15 thẻ không một lần màn trắng, xong phiên mời ôn
  tiếp 5 thẻ còn lại; Hồ sơ hiện "2 lượt đóng băng" thay vì 0; thẻ Hôm
  nay chào "cách đây 94 ngày". Seed đã xóa.

**LƯỢT RÀ SOÁT ĐƯỜNG NGƯỢC (08-12) — không sửa code.** Lượt trước đi
đường xuôi (người mới → giữa khóa); lượt này đi ngược: người bỏ học BA
THÁNG quay lại (nợ 40 thẻ, chuỗi đứt, hết đóng băng), người có NỘI DUNG
ĐỔI dưới chân trong lúc vắng mặt, và người đã đi hết khóa quay lại xem
còn gì để làm.
**Kết quả: 6 phát hiện, ghi vào mục K của `Y-TUONG.md`; K1+K2+K3 đã chữa
ở khối 21.46.** Nặng nhất là
**K1 — thẻ ôn trỏ khái niệm không còn thì phiên ôn ra MÀN TRỐNG và kẹt
câm**: nợ > 30 nên bài mới bị khóa, màn chặn chỉ có nút "Vào ôn tập", mà
ôn tập thì trắng — không sập app như J1, nhưng cũng không đi được đâu và
không một chữ nào nói vì sao. Nguyên nhân đời thường: một lần cập nhật
nội dung đổi id khái niệm. Còn lại: 2 TRUNG BÌNH (số đóng băng là con số
tháng cũ · app không nhận ra người vắng lâu) và 3 NHỎ.

**KHỐI TRƯỚC — 21.45 (08-12), đã commit `2472b90`:**
**Dọn nốt 5 ý NHỎ của lượt rà soát — mục J giờ SẠCH.**
- **J4 — mỗi thẻ module chỉ còn MỘT cửa thi vượt.** Trước đây có hai lối
  vào cùng trỏ một đường (chip trên đầu + hàng trọn câu ở cuối), nhân 21
  thẻ. Giữ chip trên đầu vì ý "mình biết phần này rồi" nảy ra lúc đọc TÊN
  module; câu đầy đủ vẫn còn nguyên cho trình đọc màn hình.
- **J5 + J6 — thanh tiến độ chỉ hiện ở module ĐANG MỞ.** Nó đo XP, nên ở
  hai đầu kia nó nói dối: module còn khóa hiện "15%" (mốc khởi đầu) dù
  chưa mở bài nào; module đậu bằng THI VƯỢT thì XP bằng 0 nên thanh gần
  rỗng đứng cạnh huy hiệu "Đã đạt · 89%". Ở module đã đậu, huy hiệu mới
  là câu trả lời.
- **J7 — hai con số của phiên ôn thôi cãi nhau.** Tiêu đề nói con số CỦA
  PHIÊN (khớp bộ đếm, cùng tăng khi có thẻ học lại); nợ vượt trần 15 thẻ
  thì nói thêm một câu về phần để dành phiên sau — khớp mà không giấu nợ.
- **J8 — màn đóng phiên ôn đưa một NÚT**, không để việc kế tiếp làm một
  dòng chữ màu nhấn.
- **Siết lại chính J2 vừa làm hôm qua**: đo được test nặng chậm 2.5 lần,
  soi ra là do dời focus cả khi phản hồi VỐN ĐÃ nằm trong tầm mắt. Giờ
  chỉ dời focus khi thật sự phải cuộn — phản hồi đang hiện sẵn mà giật
  focus ra khỏi ô người học vừa gõ là cướp chỗ đứng của họ (bảng VLSM
  bốn dòng tám ô là chỗ thấy rõ nhất). Chi phí về đúng mức cũ.
- 1729 test xanh (+11), typecheck sạch, build qua. Kiểm browser thật:
  thẻ đã đậu 0 cửa vượt · thẻ chưa đậu đúng 1 · thẻ khóa và thẻ đã đậu
  không còn thanh tiến độ, thẻ đang mở vẫn có; phiên ôn hiện "Phiên hôm
  nay 2 thẻ · Thẻ 1/2", trả lời sai một thẻ thì CẢ HAI thành 3; màn đóng
  phiên có nút đặc nền màu nhấn. Seed đã xóa.

**KHỐI TRƯỚC — 21.44 (08-12), đã commit `649953c`:**
**J2 + J3 — hai chỗ tay người học chạm hằng ngày.**
- **J2 — nộp bài xong là THẤY phản hồi.** Vùng phản hồi tự cuộn tới và
  dời focus vào chính nó. Ba luật: chỉ cuộn khi nó thật sự ngoài tầm mắt
  (đang hiện sẵn mà giật màn hình là làm phiền vô cớ), cuộn tức thì
  (cuộn mượt chết trong khung lồng của app — bài học cũ), và dời focus
  để bàn phím lẫn trình đọc màn hình đứng ngay chỗ vừa hiện.
- **J3 — ô gõ lệnh rộng ra trên điện thoại.** Hàng nhập cho xuống dòng,
  nút "Chạy" rớt xuống hàng dưới, ô gõ giữ phần lớn hàng đầu. Sửa ở CẢ
  BỐN terminal (PowerShell, phòng khám, console thiết bị, CLI) vì chúng
  là một khuôn — sửa lẻ một chỗ là ba chỗ kia lặng lẽ khác đi.
- 1718 test xanh (+5), typecheck sạch, build qua. **Đo lại đúng hai chỗ
  đã đo lúc rà soát**: phản hồi từ 649–872px (dưới mép màn 694px) nay về
  594–640px, nằm trọn trong tầm mắt và focus đứng đúng vùng vừa hiện —
  nộp lần hai lần ba (gợi ý dài ra) vẫn trong tầm mắt; ô gõ lệnh trên màn
  375px từ 186px lên 259px (thấy ~39 chữ thay vì ~28), nút Chạy xuống
  hàng dưới. Seed đã xóa.

**KHỐI TRƯỚC — 21.43 (08-12), đã commit `b283d9c`:**
**J1 — bịt lỗ hổng duy nhất khiến người học mất trắng mà không tự cứu được.**
- Bệnh: hộp ôn tập là thứ app đọc ĐẦU TIÊN mỗi lần mở, nên một thẻ ôn
  méo (thiếu trường, ngày sai khuôn) làm sập ngay cửa vào → màn lỗi thay
  cả khung app → bấm "Tải lại" là quay đúng chỗ vừa sập. Tiến độ vẫn nằm
  nguyên trong máy mà không cách nào chạm tới — kể cả ảnh chụp tự động
  vừa làm ở khối 21.38.
- **Lớp 1 — bỏ qua thẻ hỏng, không bao giờ ném.** Cửa `merge` của persist
  lọc thẻ méo trước khi nó vào state (chạy MỌI lần mở app, khác migrate);
  các hàm đọc thẻ tự lọc lần nữa vì state còn được đặt từ UI. Bỏ một thẻ
  là mất một thẻ; ném là mất cả đường vào app.
- **Lớp 2 — màn lỗi mang theo đường thoát.** Hai nút mới: mở thẳng trang
  Hồ sơ (điều hướng cứng, không qua router đang hỏng) và **lùi thẳng về
  bản tự lưu gần nhất ngay tại màn lỗi** (chỉ đụng localStorage, không
  cần engine nào chạy được). Và khai nó làm `errorElement` của router —
  hóa ra **router bắt lỗi TRƯỚC lưới đỡ của app**, nên trước giờ người
  học vẫn thấy màn lỗi mặc định của react-router, mất cả 4 tab.
- **Lớp 3 — cửa nhập file sao lưu kiểm TỪNG thẻ**, không chỉ "có phải
  mảng không": chặn ở cửa thì người học còn nguyên tiến độ cũ để thử lại
  bằng file khác, thay vì nhập xong mở app lên gặp màn lỗi.
- Vá thêm một chỗ lộ ra lúc thử: dòng lỗi in "[object Object]" vì router
  ném `{status, statusText}` chứ không phải `Error` — nay in "404 Not
  Found — …", đúng thứ người cần hỗ trợ chụp lại gửi đi.
- 1713 test xanh (+21), typecheck sạch, build qua. Kiểm browser thật:
  dựng lại ĐÚNG dữ liệu đã làm sập app lúc rà soát → giờ app mở bình
  thường vào trang Học, console kêu đúng một dòng "bỏ qua 1 thẻ ôn không
  đọc được"; ép router ném lỗi → thấy màn lỗi mới với đủ ba nút, bấm "Mở
  trang Hồ sơ" là tới đúng nơi có nút lùi. Seed đã xóa.

**LƯỢT RÀ SOÁT TRẢI NGHIỆM (08-12) — không sửa code, chỉ ĐI BỘ qua app
bằng mắt người trên browser thật** và ghi lại thứ người học chạm phải.
Đi hết: onboarding của người mới tinh → trang Học ở ba trạng thái thẻ
(đậu / đang học / còn khóa) → trọn một phiên ôn 8 thẻ → một bài học đủ
6 bước có terminal PowerShell (kể cả thang gợi ý 3 tầng) → cửa thi →
màn tốt nghiệp → Hồ sơ → phòng khám → drill, trên cả nền tối lẫn sáng
và màn hẹp 375px.
**Kết quả: 8 phát hiện, XỬ XONG CẢ 8 (J1 ở khối 21.43 · J2+J3 ở 21.44 ·
J4-J8 ở 21.45), ghi ở mục J của `Y-TUONG.md`** — 1 NẶNG
(J1: thẻ ôn hỏng làm app kẹt vòng lặp chết, không tới được Hồ sơ để lùi
về ảnh chụp), 2 TRUNG BÌNH (J2: nộp bài xong phản hồi nằm dưới mép màn
hình và app không cuộn tới; J3: ô gõ lệnh chỉ rộng 186/375px trên điện
thoại), 5 NHỎ. Chưa sửa gì — chờ chủ dự án gọi tên.

**KHỐI MỚI NHẤT — 21.42 (08-12), đã commit `954d7a8`:**
**H8 — chiều tra ngược `Get-ADUser -Properties MemberOf`.**
- Trước khối này, người trực chỉ hỏi được từ phía NHÓM ("nhóm này có
  ai" — `Get-ADGroupMember`). Giờ hỏi được từ phía NGƯỜI: "anh này đang
  thuộc nhóm nào" — đúng chiều dùng khi trong tay bạn là lời than của
  MỘT người cụ thể, tức là hầu hết các buổi trực.
- **Mốc 11 cmdlet KHÔNG bị phá**: đây là một THAM SỐ của lệnh đã có, nên
  mốc đọc lại thành "11 cmdlet **+ 1 tham số**" (đã sửa ở cả `CLAUDE.md`
  và `GHI-CHU-KY-THUAT.md`).
- **Chỉ kể nhóm TRỰC TIẾP**, y như AD thật — và đây là BÀI HỌC chứ không
  phải thiếu sót: thấy `NhanSu-GG` rồi vẫn phải đi tiếp một nhịp mới biết
  quyền chảy tới đâu, đúng cái nhịp nếp AGDLP dạy. In hộ cả chuỗi lồng
  nhau là làm hộ bài.
- Hai chỗ nhỏ mà thiếu thì tính năng coi như không tồn tại: **Get-Help
  khai luôn tham số** (không ai gõ thứ mình không biết là có), và
  **`-Properties` giá trị khác thì báo lỗi thẳng** thay vì im lặng bỏ qua.
- Nội dung M19 bài 4 nói ra chiều mới ở mục đào-sâu và ở lời giải tầng 3:
  tra được từ CẢ HAI đầu, và ngoài đời bạn thường cầm cái tên người trước.
- 1692 test xanh (+8), typecheck sạch, build qua, content:review render
  lại. Kiểm browser thật trong đúng bài M19: gõ tra ngược TRƯỚC khi thêm
  nhóm ra `MemberOf : {}`, thêm nhóm xong gõ lại ra
  `{CN=NhanSu-GG,CN=Users,DC=congty,DC=vn}` và KHÔNG kèm nhóm quyền lồng
  ngoài; `-Properties *` bị từ chối bằng dòng hổ phách; Get-Help in đúng
  hai dòng cú pháp mới. Console sạch, seed đã xóa.

**KHỐI TRƯỚC — 21.41 (08-12), đã commit `b4f5c2a`:**
**H3 — ca bệnh sửa "nửa tay nửa chọn"** (chủ dự án duyệt phá mốc).
- Phòng khám có **cách sửa thứ BA**: ca liên tầng, nửa bệnh nằm trong sơ
  đồ thì tự tay sửa ở phòng lab, nửa nằm ngoài mô hình mạng thì chọn hành
  động. Chấm ba phần — gọi đúng tên bệnh, sửa xong sơ đồ, chọn đúng việc
  phải nhờ người khác làm; thiếu phần nào cũng là chưa xong ca.
- **Mốc đã phá**: phòng khám từ 2 cách sửa lên 3. Cái giá: mọi chỗ đang
  rẽ nhánh theo kiểu sửa phải học thêm một nhánh. Trả giá bằng một hàm
  chung `phanMang()` — chỗ nào cần "nửa mạng" thì hỏi nó, không so tay
  từng kiểu; nhờ vậy toàn bộ cổng chất lượng cũ (lời giải phải chữa được
  ca của chính nó, trạng thái đầu chưa đạt sẵn…) tự động áp cho ca mới.
- **Ca thật: `m21-b4-prac-ca` của capstone được nâng cấp.** Trước đây cả
  hai nửa đều CHỌN từ danh sách; giờ nửa trunk phải tự mở allowed list
  cho VLAN 10 đi qua ở cả hai switch, còn bản ghi DNS thiếu thì phải nhờ
  người quản trị vùng tên — kéo dây hay sửa VLAN không đẻ ra được một
  bản ghi DNS.
- **Triệu chứng xanh KHÔNG có nghĩa là xong**: sửa xong nửa mạng thì app
  nói thêm "Mới là nửa mạng thôi — nửa ngoài sơ đồ vẫn đang chờ bạn".
  Thiếu câu đó thì màu xanh thành lời hứa sai ngay giữa ca dạy "đếm đủ
  dấu chân mới đếm đủ con".
- 1684 test xanh (+12), typecheck sạch, build qua, content:review render
  lại 21 module (bản đọc duyệt giờ in cả hai nửa). Kiểm browser thật: mở
  ca 13 ở tab Phòng khám, chốt chẩn đoán, tự tay mở allowed list hai
  switch → triệu chứng hết + câu nhắc nửa còn lại hiện đúng; nộp kèm hành
  động SAI thì app từ chối, nộp kèm hành động đúng thì ca ghi nhận chữa
  khỏi và cộng đúng 10 XP. Console sạch, seed đã xóa.

**KHỐI TRƯỚC — 21.40 (08-12), đã commit `5636c5b`:**
**Quãng ngồi liền dài nhất trong tuần — ý CUỐI CÙNG của lượt duyệt kho.**
- Một dòng trong thẻ "Nếp học 8 tuần": "Tuần này bạn ngồi liền lâu nhất 34
  phút. Tuần trước là 52 phút." Đồ thị đo BỀ RỘNG (tuần nào làm mấy việc),
  dòng này đo BỀ SÂU của một lần ngồi.
- **Giọng là phần khó nhất, không phải phép đo.** App vừa rủ người ta nghỉ
  sau 25 phút thì không thể quay lại vỗ tay vì họ ngồi liền 90 phút — nên
  đây là DỮ LIỆU, không phải thành tích: không "kỷ lục mới!", không huy
  hiệu, và quá 50 phút thì nói thẳng cái giá bằng màu hổ phách.
- **Bỏ đi mà để tab mở thì kỷ lục KHÔNG phình.** Quãng đo tới LẦN CHẠM
  CUỐI chứ không tới bây giờ; đo tới bây giờ thì đi ăn cơm về là thấy
  "tuần này bạn ngồi liền 180 phút" — một kỷ lục chưa từng xảy ra.
- **Tắt lời nhắc nghỉ vẫn đo.** Tắt lời nhắc là tắt LỜI NHẮC, không phải
  tắt cái đồng hồ — người tắt nhắc vẫn có quyền đọc nếp ngồi của mình.
- Persist bump **v7 → v8**; bậc migrate cấp sổ RỖNG, không suy ngược từ
  ngày học xong bài (mỗi bài một ngày) vì như thế là bịa ra một con số
  người học chưa từng ngồi.
- 1672 test xanh (+21), typecheck sạch, build qua. Kiểm browser thật: gõ
  phím thật 99 giây → app tự ghi kỷ lục 1 phút vào tiến độ; ngừng gõ 69
  giây nữa thì con số ĐỨNG YÊN; seed 90 phút thì câu nói-thẳng-cái-giá
  hiện đúng bằng hổ phách. Console sạch, seed đã xóa.

**KHỐI TRƯỚC — 21.39 (08-12), đã commit `4d8acdf`:**
**I3 — so với chính mình tháng trước.**
- Mỗi tháng, lần đầu mở trang Hồ sơ, app cất một MỐC nhỏ của bảng phân
  tích (tỉ lệ vấp theo từng dạng câu). Từ tháng sau, mục mới ở trang Hồ sơ
  nói thẳng: "Câu gõ tay 75% → 13% · đã lên".
- **Không lấy HIỆU hai mốc dù nghe hay hơn nhiều.** Học lại một bài đã
  xong thì bộ đếm vấp của bài đó bị dựng mới, nên phép trừ sẽ ra SỐ ÂM
  ngay lần đầu người học ôn lại bài cũ — một bảng thống kê ra số âm thì
  mất sạch niềm tin, đúng lúc nó đang định khen họ. So tỉ lệ tại hai thời
  điểm thì không bao giờ gặp chuyện đó.
- Ba luật giữ cho nó không nói dối: **nói rõ đây là tỉ lệ tính dồn từ đầu
  khóa** (nó nhích chậm, không nói thì người học đọc "45% → 43%" thành
  "mình giậm chân"), **chưa đủ mẫu thì không phán một chữ** (cùng ngưỡng
  4 câu với bảng phân tích), và **tin xấu vẫn hiện** — giấu chiều đi
  xuống thì chiều đi lên cũng hết đáng tin.
- Mốc của tháng hiện tại **đứng yên cả tháng**, không nhích theo mỗi lần
  mở trang; trôi theo thì cuối tháng chẳng còn gì để so.
- Persist bump **v6 → v7**. Bậc migrate cấp sổ RỖNG, cố ý không dựng
  ngược một mốc từ số liệu hôm nay — dán nhãn "tháng trước" cho số của
  hôm nay là một câu so sánh bịa.
- 1651 test xanh (+25), typecheck sạch, build qua. Kiểm browser thật: seed
  một người học có mốc tháng 7 → mục hiện "75% → 13% · đã lên"; vấp thêm
  rồi mở lại trong cùng tháng thì mốc tháng 8 ĐỨNG YÊN còn dòng so sánh
  cập nhật; đổi mốc cũ thành 0% thì hiện "còn nặng hơn" bằng hổ phách
  (không phải đỏ); người học tháng đầu tiên thấy đúng câu chờ. Console
  sạch, seed đã xóa.

**KHỐI TRƯỚC — 21.38 (08-11), đã commit `6b0161b`:**
**Cụm 4 — kỹ thuật nền, cụm cuối của lượt duyệt kho ý tưởng.**
- **F3 — app tự cất bản tiến độ.** Mỗi ngày mở app lên học cất một bản,
  và LUÔN cất một bản ngay trước khi cửa migrate viết đè. Giữ 3 bản; ở
  trang Hồ sơ mỗi bản có nút "Lùi về bản này".
  Ba luật đắt nhất, đều rút ra lúc làm: **bản trước-nâng-cấp không bao giờ
  bị cắt khỏi trần** (ba ngày học liên tiếp là nó trôi mất, mà nếu chính
  migrate làm hỏng thì mọi bản sau đều chép lại cái hỏng); **hết chỗ
  localStorage thì bỏ bản chụp, không bao giờ để tiến độ thật chết theo**
  (mỗi bản là một bản sao đầy đủ, mà cả app chỉ có ~5MB); và **lùi về một
  bản thì cất bản đang có trước đã** — thao tác cứu dữ liệu cũng là thao
  tác ghi đè.
- **Lời nhắc nghỉ tự lui sau 45 giây.** Nó là lời rủ, không phải việc phải
  làm; ngồi lì trên đầu trang cả buổi thì thành giấy dán tường hoặc thành
  lời trách. Đếm bằng thời gian TRANG ĐANG HIỆN, không phải thời gian
  trôi: người nghe rủ mà đứng dậy thật thì tab nằm ở nền, đếm tiếp là lời
  nhắc tan đúng lúc không ai nhìn. Nút tắt vẫn còn.
- **Lệnh chép bản vẽ rút được nhãn CamelCase**: "PC-KinhDoanh" → "PC-KD".
  Đây là đường thoát cho cặp PC-/SW- cùng phòng ở lab M21 — bỏ tiền tố thì
  hai nhãn trùng nhau nên phải lùi, rút ruột thì vẫn phân biệt được. Trên
  57 nhãn thật: còn dài 6 → còn 2 (hai cái còn lại rút là trùng, script in
  "sửa tay"). Luật tách ra `scripts/rut-gon-nhan.mjs` để test import được.
- 1626 test xanh (+45), typecheck sạch, build qua. Kiểm browser thật: giả
  máy đang ở persist v5 rồi mở app — bản chụp v5 hiện đúng ở Hồ sơ, bấm
  lùi thì tiến độ quay về v5 và migrate chạy lại; **lần thử này lòi ra một
  bản chụp trùng bị cất hai lần, đã siết luật trùng rồi thử lại**. Lời nhắc
  nghỉ: tab ở nền thì đứng yên thật (browser pane báo `hidden`), ép sang
  "đang hiện" thì đúng 5 giây sau là lui (tạm hạ mốc rồi khôi phục). Console
  sạch, seed đã xóa.
- **CÒN LẠI của lượt duyệt**: I3 (so với chính mình tháng trước) và quãng
  học dài nhất trong tuần. Trước đây định cho hai ý này đi ké F3 cho rẻ —
  **hóa ra không ké được**: ảnh chụp là 3 bản sao đầy đủ xoay vòng, không
  phải chuỗi số theo tháng, đọc nó ra thống kê là đọc sai bản chất. Hai ý
  đó vẫn cần sổ số liệu riêng của chúng.

**KHỐI TRƯỚC — 21.37 (08-11), đã commit `6f864d4`:**
**Cụm 3 — nội dung: H7, bài đọc-số-thật cho scope DHCP.**
- Thêm bài tập gõ tay thứ ba vào bước Thử tay của `m18-bai-2`, đúng bảng số
  ý gốc nêu: 200 suất · 197 đã cấp · lease 8 ngày. Hỏi rút lease xuống tối
  đa mấy ngày thì suất kịp trả về trước sáng thứ hai.
- Đáp án **2 ngày**, và lời giải nói luôn cái GIÁ: rút lease thì máy phải
  xin gia hạn dày hơn, nên đừng rút quá tay ở scope máy để bàn ngồi yên cả
  tuần. Bài này là bài TÍNH đầu tiên của M18 — hai bài cũ đều hỏi nhận biết.
- Đã thử bộ chấm THẬT với 15 cách gõ: nhận "2", "2 ngày", "48 giờ", "48h",
  "hai ngày", "2ngay" (gõ liền — phải thêm vào sau khi thử mới thấy thiếu);
  từ chối "3", "3 ngày", "8 ngày", "1 tuần".
- 1581 test xanh, typecheck sạch, build qua, content:review render lại 21
  module. Kiểm browser thật: đề bài hiện đủ, ô gõ và nút Kiểm tra dựng đúng.
  Seed đã xóa.

**KHỐI TRƯỚC — 21.36 (08-11), đã commit `39225f7`:**
**Cụm 2 — hồ sơ & ôn tập, mới xong HAI trong bốn việc.**
- **I2 — vấp đẩy thẻ ôn lên sớm.** Đường nối giữa "chỗ vấp" và "thẻ ôn" hóa
  ra là BÀI HỌC: chỗ vấp ghi theo CÂU, thẻ ôn khóa theo KHÁI NIỆM, không
  map thẳng được. Vấp chỉ là TIE-BREAK sau hạn ôn — thẻ nợ lâu vẫn đi
  trước, vì nó mới là thẻ sắp quên hẳn.
- **I4 — ảo giác quen mặt.** Mục "Thấy quen mà chưa thuộc" ở trang Hồ sơ.
  Phải bump persist **v5 → v6** (dữ liệu tự chấm trước đây tan theo phiên);
  chỉ lưu nấc "chắc mà không nhớ", ngưỡng 2 lần mới đem ra nói.
- 1581 test xanh (+24), typecheck sạch, build qua. Kiểm browser thật: mục
  mới hiện đúng thứ tự, thẻ dưới ngưỡng bị loại, tên thẻ tra ra đọc được,
  thẻ đã bị xóa khỏi nội dung thì hiện tạm mã. Console sạch, seed đã xóa.
- **CÒN LẠI của cụm 2**: I3 (so với chính mình tháng trước) và quãng học
  dài nhất trong tuần — cả hai đều cần thêm dữ liệu chụp theo thời gian,
  nên đi chung một khối với F3 (sao lưu tự động) thì rẻ hơn.

**KHỐI TRƯỚC — 21.35 (08-11), đã commit `9efe191`:**
**Cụm âm thanh** — chủ dự án duyệt hết kho ý tưởng, đây là cụm 1/4.
- **C2 — âm xúc giác cho lab**: "tách" khi cắm xong một sợi dây, "vụt" khi
  gói tin rời máy. Tiếng tách CHỈ vang khi dây thật sự cắm vào (`dispatch`
  giờ trả về có-áp-được-không) — kêu rồi mới hiện lời từ chối là nói dối
  bằng âm thanh. Tiếng vụt cần trường mới `Tone.glideTo`.
- **Tiếng cho màn tốt nghiệp**: mốc duy nhất lớn hơn đậu module.
- **Âm thanh thành BA nấc**: đầy đủ / chỉ tiếng mốc / tắt. Có nấc giữa vì
  tiếng thao tác vang mấy chục lần một buổi còn tiếng mốc cả buổi một lần;
  chỉ có tắt-hết thì người thấy ồn sẽ tắt luôn thứ đáng nghe nhất.
- **Máy cài bản cũ không bị bật lại âm**: `soundOn` cũ tự quy sang nấc
  tương ứng trong `merge` (persist settings không có version). Bốn đường
  chuyển đổi đều có test.
- 1568 test xanh (+10), typecheck sạch, build qua. Kiểm browser thật: chặn
  `createOscillator` để đếm nốt — nấc tắt im hết, nấc đầy đủ ra 2/8/2 nốt,
  nấc chỉ-mốc chỉ tiếng đậu module kêu; máy giả lập bản cũ đang tắt âm mở
  lên vẫn tắt. Console sạch, seed đã xóa.

**Lượt duyệt kho ý tưởng này đã đi hết 4 cụm** (âm thanh 21.35 · hồ sơ &
ôn tập 21.36 · nội dung 21.37 · kỹ thuật nền 21.38), rồi I3 làm nốt ở
khối 21.39 và quãng ngồi liền ở khối 21.40 — **kho ý tưởng giờ không còn
ý nào chờ duyệt**. **H3** đã làm ở khối 21.41 (phá mốc "2 cách sửa" của
phòng khám) và **H8** ở khối 21.42 (mốc 11 cmdlet giữ nguyên, chỉ thêm
một tham số) — **kho ý tưởng giờ SẠCH, không còn ý nào chờ.**

**KHỐI TRƯỚC — 21.34 (08-11), đã commit `e43e7d9`:**
**C1 — giai điệu tiến độ.** Việc thật hóa ra không phải "thêm nhạc" mà là
TÁCH hai mốc đang dùng chung một tiếng.
- Trước khối này, **đậu cả một module** và **xong một chặng nhỏ** phát ra
  đúng một tiếng (`stageUp`) — mốc lớn nhất của app (cửa mastery 85%) nghe
  y hệt một cột mốc giữa đường. Ba nốt đi lên mà ý gốc muốn thì `stageUp`
  vốn đã có sẵn.
- Thêm earcon thứ 5 `moduleComplete`: cadence át → chủ, **dài nhất và trầm
  nhất** cả bộ; nốt C3 là nốt duy nhất dưới 190Hz trong app, và chính cái
  trầm ấy làm tai nghe ra chỗ đóng lại thay vì chỗ đi tiếp.
- Mở `TONES_FOR_TEST` để test đọc được bộ nốt — trước đó test chỉ khẳng
  định "gọi không ném lỗi", tức hai earcon trùng nhau vẫn xanh.
- 1558 test xanh (+2), typecheck sạch, build qua. Kiểm browser thật: bấm
  hai nút ở `/design`, chặn `createOscillator` để đếm — lên chặng ra 6 nốt
  đúng bộ cũ, đậu module ra 8 nốt đúng cadence mới; console sạch. Đã thử
  làm hai earcon trùng nhau để chắc cổng chặn đỏ thật, rồi khôi phục.

**KHỐI TRƯỚC — 21.33 (08-11), đã commit `865b1e2`:**
**A6 — nhắc nghỉ đúng lúc** (ý đầu tiên lấy từ kho sau cả cụm hình vẽ).
- Học liền 25 phút thì một dòng nhắc nhẹ hiện ở đầu khung app; tắt được
  bằng nút ngay cạnh nút nền/âm thanh, lựa chọn có lưu lại.
- Ba luật làm nên "đúng lúc" mà ý gốc chưa nói: **nghỉ rồi thì không nhắc**
  (rời máy quá 5 phút là quãng đếm lại từ đầu), **nhắc rồi thì im trọn một
  quãng nữa**, và **đang thi thì không bao giờ nhắc**.
- Lõi thuần không tự lấy giờ nên test đo được mọi mốc mà không phải chờ
  thật; 12 test cho lõi + 7 test cho vỏ UI.
- 1556 test xanh (+19), typecheck sạch, build qua. Kiểm browser thật bằng
  cách tua đồng hồ 26 phút: lời nhắc hiện đúng câu kèm số phút, bấm nút tắt
  thì lời nhắc biến mất và nhãn nút lật sang "Bật nhắc nghỉ". Seed đã xóa.

**KHỐI TRƯỚC — 21.32 (08-11), đã commit `408124c`:**
lệnh chép tự sinh hình luôn — quy trình xưởng vẽ còn ĐÚNG MỘT lệnh.
- `--chep` xong thì tự chạy `visuals:isometric`, không phải gõ tay nữa.
- Chỉ chạy KHI CÓ chép: lần chạy thường vẫn chỉ dựng nháp, không đụng vào
  file hình đang yên.
- Bản vẽ hỏng thì mã thoát khác 0 — đã thử bằng cách cố tình làm hỏng một
  bản vẽ rồi chạy lệnh gộp, nó đỏ đúng như mong đợi.
- 1537 test xanh, typecheck sạch, build qua. Ba file thử đã xóa, file hình
  sinh ra không đổi một dòng.

**KHỐI TRƯỚC — 21.31 (08-11), đã commit `5cf589d`:**
`--chep` tự rút gọn nhãn dài, không chỉ nhắc nữa.
- Luật rút gọn ĐỌC RA TỪ DỮ LIỆU chứ không tự nghĩ: chạy thử trên 80 tên
  thiết bị thật trong nội dung — 44 nhãn dài quá 11 ký tự, rút được 38,
  6 cái bó tay có lý do, 0 bản vẽ nào bị nhãn trùng.
- Ba bước: bỏ đuôi trong ngoặc → bỏ tiền tố loại thiết bị → cắt ở dấu phân
  cách. Bước nào gây trùng nhãn thì lùi lại hết.
- Hai chỗ suýt sai, sửa nhờ chạy thử trên dữ liệu thật: "Máy chủ trên
  Internet" từng ra "chủ trên" (tiền tố chỉ được bỏ khi đứng trước dấu
  gạch), và "PC-A (tầng 1)" từng ra mỗi chữ "A" (mỗi bước phải xét độ dài
  hiện tại, không xét độ dài gốc).
- Chỉ đổi nhãn vẽ lên hình; tên đầy đủ ở lại trong trường `name`.
- Đã thử chép ba loại (lab bó tay · lab rút được · ca bệnh), rồi xóa ba file
  thử; file hình sinh ra không đổi một dòng.
- 1537 test xanh, typecheck sạch, build qua.

**KHỐI TRƯỚC — 21.30 (08-11), đã commit `eb2b15a`:**
`ban-ve:tu-lab` tự chép được sang `content/ban-ve/`.
- `npm run ban-ve:tu-lab -- --chep <cauId> [--ten <slug>]` làm hộ đúng ba
  việc tôi từng làm tay ba lần liền: gỡ nét mục tiêu, bỏ view thứ hai nếu
  trùng view đầu, nhắc nhãn dài quá 11 ký tự.
- Phải GỌI TÊN từng câu, không có chế độ chép tất — 29 câu chép hết là 29
  hình nằm trong gói app mà không bài nào dùng.
- **Không bao giờ ghi đè** file bên `content/ban-ve/`; gõ nhầm id thì ném
  lỗi chứ không im lặng chạy qua.
- Sửa thêm một dòng log nói sai: bộ chuyển in "11 hình" trong khi nó sinh
  18 hình từ 11 bản vẽ — nhìn log tưởng mất hình.
- Đã chạy thử đủ năm đường (chạy thường · id sai · lab đổi địa chỉ bỏ view
  trùng · lab đổi dây giữ hai view · chặn ghi đè lên bản vẽ thật), rồi xóa
  hai file thử nghiệm; file sinh ra không đổi một dòng.
- 1537 test xanh, typecheck sạch, build qua.

**KHỐI TRƯỚC — 21.29 (08-11), đã commit `ced1551`:**
hình kết cho M21 chặng 1 — chỗ cuối cùng của mạch "bài kết bằng thành quả".
- `m21-bai-1` giờ kết bằng sơ đồ ba phòng của chi nhánh: router trên, ba
  switch giữa, ba máy dưới. **Bảy nút mà vẫn thoáng**, vì bố cục là cây ba
  nhánh đều và nhãn ngắn — trần 5-6 nút hóa ra là trần của NHÃN, không phải
  của nút.
- Bản vẽ này chỉ có MỘT view, khác bốn lab kia: lab chặng 1 là bài cắt địa
  chỉ nên đề bài và lời giải cùng một bộ dây; gỡ nét mục tiêu xong hai view
  trùng khít, giữ cả hai chỉ là hai bản sao. Cổng chặn màn Tổng kết vì thế
  đổi từ "phải có đuôi -loi-giai" sang "phải sinh từ bản vẽ lab của bài".
- **Năm bài có lab thì cả năm đã có hình kết** (M4, M7, M15, M16, M21).
- 1537 test xanh, typecheck sạch, build qua, content:review render lại.
  Kiểm browser: 18 hình isometric, 0 nhãn đè nhau, 0 hình tràn viewBox.
  Seed đã xóa.

**KHỐI TRƯỚC — 21.28 (08-11), đã commit `a926904`:**
hai lab còn lại chưa có hình: M4 và M7.
- `m4-bai-2` (sổ nhớ mặt của switch) và `m7-bai-4` (lắp lại mạng nhà mình)
  giờ kết bằng chính sơ đồ người học vừa nối xong trong lab. Bản vẽ M7 lấy
  từ nháp máy dựng, rút gọn nhãn và đổi icon máy chủ ngoài Internet.
- **Luật mới, do browser chỉ ra**: nét MỤC TIÊU ("phải tới") chỉ sống trong
  bản nháp, không mang vào app — nó nối hai đầu xa nhau nên trên sơ đồ
  nhiều nút bao giờ cũng cắt ngang giữa hình và nhãn rơi trúng thiết bị
  đứng giữa. Đã gỡ khỏi cả ba bản vẽ đã chép sang, và có test khóa.
- Thêm cổng chặn: hình ở màn Tổng kết bắt buộc là view lời giải của một
  bản vẽ lab, không phải hình trang trí bất kỳ.
- 1528 test xanh, typecheck sạch, build qua, content:review render lại.
  Kiểm browser: 17 hình isometric, 0 nhãn đè nhau, 0 hình tràn viewBox.
  Seed đã xóa.

**KHỐI TRƯỚC — 21.27 (08-11), đã commit `036bc9f`:**
màn Dạy M15 bài 4 có hình chỉ đường, theo đúng khuôn vừa dựng cho M16.
- `vis-iso-vong-lap-stp-dut-m15-hoi-tu`: cùng vòng lặp ba tầng, cùng chỗ
  đứng, sợi tầng 1 - tầng 2 vẫn đứt, còn **lối mới qua tầng 3 sáng lên**
  đúng hai chặng. Hook của bài giữ nguyên, CỐ Ý không sáng sợi nào.
- Gộp NHẸ hơn M16: chỉ thêm một view vào bản vẽ hook sẵn có, KHÔNG dồn ba
  bản vẽ vòng lặp về một file — bộ ba nhịp bài 1→2→4 cần chúng đứng riêng.
- Dọn hai hình vẽ tay hết người dùng: `StpReconverge` và `OspfReroute`
  (cái sau là code chết còn sót từ khối trước, tôi để lọt).
- 1517 test xanh, typecheck sạch, build qua, content:review render lại.
  Kiểm browser: 15 hình isometric, 0 nhãn đè nhau, 0 hình tràn viewBox; view
  hội tụ sáng đúng hai chặng bằng token (#38bdf8 nền tối). Seed đã xóa.

**KHỐI TRƯỚC — 21.26 (08-11), đã commit `9ab4786`:**
hai ý cuối của cụm xưởng vẽ.
- **Tô sáng một sợi dây**: bộ chuyển đọc `color` của FossFLOW như một lời
  ĐÁNH DẤU chứ không như mã màu — sợi được tô thành sợi ăn `--accent`, dày
  nét lên, nhãn ăn màu theo. Đo trên browser: nền tối ra #38bdf8, nền sáng
  ra #0369a1, tức đúng token chứ không phải màu chép tay.
- **Cả bài m16-bai-5 dùng CHUNG một mạng**: bốn view của cùng bản vẽ lab —
  hook (sợi vừa đứt) · màn Dạy (lối vòng qua Đà Nẵng sáng lên) · Tổng kết
  (trạng thái cuối). Trước đó hook là tam giác ba router còn Tổng kết là sơ
  đồ lab bảy thiết bị, cùng một bài mà hai bức tranh không liên quan.
  **Hook cố ý KHÔNG sáng sợi nào** — nó hỏi đúng câu "lưu lượng đi lối nào".
- Cái giá đã trả và khai rõ: mất mạch tam giác nối bài 4 sang bài 5; bản vẽ
  `hai-loi-ba-mien-dut-m16` thành thừa nên đã xóa.
- 1514 test xanh, typecheck sạch, build qua, content:review render lại.
  Kiểm browser: 14 hình isometric, 0 nhãn đè nhau, 0 hình tràn viewBox; hook
  m16-bai-5 hiện 7 thiết bị + 1 nét đứt + 0 sợi sáng. Seed đã xóa.

**KHỐI TRƯỚC — 21.25 (08-11), đã commit `cb2fd80`:**
ba ý cuối của cụm xưởng vẽ, làm xong cả ba.
- **Hình thành quả ở màn Tổng kết**: bước 6 nhận thêm `visualId` (tùy chọn).
  `m15-bai-4` và `m16-bai-5` giờ kết bằng chính sơ đồ người học vừa dựng
  xong trong lab, đứng trên ba gạch đầu dòng.
- **Bản nháp tự nói mục tiêu**: `ban-ve:tu-lab` đọc `goals` của lab, vẽ mục
  tiêu ping thành nét CHẤM kèm nhãn "phải tới". Cố ý không vẽ những sợi còn
  thiếu — nói bài đòi gì thì được, chỉ chỗ cắm dây là làm hộ bài.
- **Cổng canh hình trôi xa lab** (`BanVeTheoLab.test.ts`): bản vẽ mang dấu
  `nguon` bị đối chiếu thiết bị + dây với chính câu lab trong nội dung. Đã
  cố tình làm hỏng một bản vẽ để chắc nó đỏ thật, rồi trả lại.
- Kèm hai chỗ sửa do đo browser: bỏ mục tiêu `pathThrough` (nhãn đè nhãn
  thiết bị), và nới biên cảnh báo nhãn đè lên 2px vì ước lượng bề ngang chữ
  trong script sát hơn font thật.
- 1518 test xanh (+21), typecheck sạch, build qua, content:review render lại.
  Kiểm browser: 13 hình isometric, **0 nhãn đè nhau, 0 hình tràn viewBox**;
  màn Tổng kết `m15-bai-4` hiện đúng sơ đồ lời giải. Seed đã xóa.

**KHỐI TRƯỚC — 21.24 (08-11), đã commit `a17278c`:**
chủ dự án duyệt 4 ý tận dụng xưởng vẽ. **LÀM XONG 2, DỪNG 2** — hai ý kia
đụng quyết định đã có sẵn trong app, khai rõ ở dưới.
- ✅ **Một bản vẽ ra nhiều hình**: view đầu giữ id cũ, view sau nối thêm id
  của nó. Chứng minh bằng `lab-noi-day-m4` → cặp hình đề bài / lời giải.
- ✅ **`npm run ban-ve:tu-lab`**: đọc spec lab + ca bệnh trong nội dung,
  dựng 29 bản vẽ nháp vào `content/ban-ve-nhap/` (11 lab × 2 view, 18 ca
  bệnh). Lab tự sinh ra hình, không phải đặt tọa độ bằng tay nữa.
- ⛔ **Sơ đồ trong phòng khám lúc chẩn đoán — DỪNG.** `ClinicRoom.tsx` mở
  đầu bằng bất biến KHÁM MÙ: không sơ đồ lúc khám, vì lộ sơ đồ sớm thì ca
  "rút dây" tự giải bằng mắt. Tôi đã viết xong rồi gỡ ra.
- ⛔ **Hình cung điện từng tầng cho M5 — DỪNG.** Màn Dạy bài cung điện
  render `PalaceTour` thay cho `ConceptVisual` nên visualId đặt ở đó là cấu
  hình chết; mà cung điện đã có `PalaceMap` sống, tô phòng đang đứng.
- 1497 test xanh (+15), typecheck sạch, build qua, content:review render lại.

**KHỐI TRƯỚC — 21.23 (08-11), đã commit `3d266db`:**
vòng lặp STP cho M15 — vẽ thành BA NHỊP của cùng một phòng máy.
- `vis-iso-vong-lap-stp-m15` → hook `m15-bai-1`: ba switch ba tầng nối
  thành vòng khép kín, sợi thứ ba ghi "sợi vừa cắm".
- `vis-iso-vong-lap-stp-chan-m15` → hook `m15-bai-2`: cùng vòng đó, sợi
  thứ ba chuyển nét đứt, ghi "cổng nằm im".
- `vis-iso-vong-lap-stp-dut-m15` → hook `m15-bai-4`: cùng vòng đó, lần này
  sợi tầng 1 - tầng 2 đứt, hai sợi kia nguyên.
- **Không hình nào vẽ câu trả lời**: bài 1 không vẽ gói tin chạy lòng vòng,
  bài 2 không đánh dấu ai là trung tâm, bài 4 không tô sợi vừa được đánh
  thức — ba hook hỏi đúng ba điều đó.
- Bài 3 (cổng nằm im) và bài 5 (portfast) CỐ Ý để nguyên hình cũ: hook của
  chúng nói về một Ý, không tả hiện trường.
- 1482 test xanh (+26), typecheck sạch, build qua (170,71KB gzip, +0,45KB).
  Kiểm browser thật cả ba bài: bbox y hệt nhau (202,9 × 103,2) nên bố cục
  đúng là không đổi, không tràn viewBox, không nhãn nào đè nhau, số sợi nét
  đứt 0/1/1 và sợi đứt của bài 4 khác sợi của bài 2; 375px không cuộn ngang.
  Dữ liệu seed đã xóa.

**KHỐI TRƯỚC — 21.22 (08-11), đã commit `0c66492`:**
ba sơ đồ topology nữa cho M14/M16, vẽ bằng đúng quy trình xưởng vẽ.
- `vis-iso-router-mot-chan-m14` → hook `m14-bai-5`: bốn VLAN treo dưới một
  switch, router nối xuống bằng đúng một sợi.
- `vis-iso-hai-loi-ba-mien-m16` → hook `m16-bai-4`: tam giác Hà Nội – Đà
  Nẵng – Sài Gòn, cáp thẳng và đường vòng.
- `vis-iso-hai-loi-ba-mien-dut-m16` → hook `m16-bai-5`: **cùng ba nút, cùng
  chỗ đứng**, chỉ sợi cáp thẳng chuyển nét đứt — mắt tự nhảy vào chỗ đổi.
- Bộ chuyển học thêm hai việc: hiểu `style` DASHED/DOTTED của FossFLOW, và
  **cảnh báo khi hai nhãn đè nhau** (bắt đúng vụ "một chân" đè "router" mà
  browser đo được).
- Vì sao chọn bước Khởi động: quy ước alias `vis-hook-*` đang cho **101/108
  bài** dùng lại chính hình của màn Dạy — có hình nhưng hook không kể gì
  mới. Ba bài này hook đều tả một HIỆN TRƯỜNG nên sơ đồ thật hơn hẳn.
- 1456 test xanh (+26), typecheck sạch, build qua (170,26KB gzip, +0,84KB
  cho ba hình). Kiểm browser thật cả ba bài: không hình nào tràn viewBox,
  không nhãn nào đè nhau, hai hình M16 có bbox y hệt nhau (đúng chủ ý),
  bài 5 có đúng 1 nét đứt còn bài 4 có 0; 375px không cuộn ngang. Dữ liệu
  seed đã xóa.

**KHỐI TRƯỚC — 21.20 + 21.21 (08-11), đã commit `7e0201d` và `535ba6d`:**
**thử "đường A"** — dùng app FossFLOW (thư mục `học mang 3D/`) làm XƯỞNG VẼ
ngoài app thay vì gộp hai app làm một.
- Kết quả: chạy trọn một vòng. Vẽ trong FossFLOW → xuất JSON → `npm run
  visuals:isometric` → hình isometric hiện trên `/design` với đúng viền,
  nền, nhãn aria như hình vẽ tay, đổi màu theo nền tối/sáng, tốn thêm
  0,85KB gzip.
- Ba điều đã đo được, ghi ở `GHI-CHU-KY-THUAT.md` mục 10: FossFLOW **không
  xuất SVG** (chỉ PNG — đã loại vì bitmap không đổi theo nền); khối phải
  vẽ nhỏ hơn ô lưới; nhãn phải có đế lót.
- **Trần thực tế ~6 nút** một hình. Hình thử `vis-iso-chi-nhanh-m21` (sơ đồ
  chi nhánh M21) đã chạm trần: giãn ≥2 ô mới đọc thoải mái.
- **Đã NỐI vào bài (lệnh chủ dự án)**: hook chặng 2 (`vis-hook-oc-dao`) giờ
  dùng hình hiện trường này thay cho cái thang kiểm chứng — trước đó hook và
  màn Dạy của CÙNG bài dùng chung một hình, tức hook mất việc. Bản vẽ đã vẽ
  lại cho ĐÚNG lời bài (hai switch nối nhau, máy chủ ở trụ sở), vì bản đầu
  vẽ sai hiện trường.
- 1430 test xanh (+8), typecheck sạch, build qua, content:review render lại.

**KHỐI 21.19 (08-11), đã commit `ec53407`:**
hai ý nữa từ kho, chủ dự án bảo "làm luôn mấy cái bạn khuyên".
- **H4 — tiến độ công trường capstone**: đầu mỗi bài M21 có dải chặng gọn
  "Chặng 1 ✓ · Chặng 2 đang làm · Chặng 3 chưa tới · Tổng duyệt", bật bằng
  cờ nội dung `stageProgress` (chỉ M21 bật). Chặng đang làm bám BÀI ĐANG
  MỞ nên học lại bài cũ vẫn chỉ đúng chỗ. Bất biến ở mục 7.
- **B1 — bản đồ ấm dần**: dải 21 ô ở đầu danh sách chủ đề trang Học, ô đã
  đậu tô theo 5 nấc ấm dần (`--trail-1..5`), ô đang học viền tông Phần.
  Khác ý gốc một chỗ đã khai: ý nói "trên bản đồ khóa học", nhưng bản đồ
  duy nhất biết tiến độ nằm ở màn tốt nghiệp (cả khóa thấy một lần) — nên
  dựng dải riêng đặt đúng trang mở hằng ngày. Bất biến ở mục 10.
- 1422 test xanh (+30 test mới của khối này), typecheck sạch, build qua,
  content:review render lại 21 module. Kiểm browser thật: `/bai/m21-bai-2`
  dải chặng đọc đúng bốn chặng với chặng 2 mang `aria-current="step"`,
  `/bai/m1-bai-1` KHÔNG có dải; trang Học vệt 21 ô ấm dần trái sang phải,
  ô M21 viền lục Phần E, nền tối chạy than → lửa và nền sáng chạy nâu đất
  → than hồng đúng hai dải khác nhau; 375px dải chặng thu từ 84px xuống
  16,5px còn một hàng và không cuộn ngang (375/375); console sạch. Dữ liệu
  seed đã xóa.

**KHỐI TRƯỚC — 21.18 (08-11), đã commit `ef5a3d2`:**
hai ý nữa từ kho, chủ dự án gọi tên.
- **B3 — nền tự động**: nút nền thành BA nấc tối → sáng → tự động. Nấc tự
  động bám `prefers-color-scheme` của hệ điều hành và đổi NGAY khi hệ điều
  hành đổi, không đợi mở lại app. Khác ý gốc một chỗ đã khai: bỏ vế "theo
  giờ". Mặc định vẫn TỐI. Bất biến ở `GHI-CHU-KY-THUAT.md` mục 10.
- **E3 — bàn phím một tay**: `components/shortcuts.ts` (dùng chung) + phím
  số cho trắc nghiệm và xếp thứ tự + Enter nộp câu xếp thứ tự + mũi tên
  phải đi cung điện. Con số in kèm lựa chọn trên màn rộng, ẩn trên màn hẹp.
  Bất biến ở mục 10 và mục 5.
- 1392 test xanh (+31 test mới của khối này), typecheck sạch, build qua.
  Kiểm browser thật: ba nấc nút nền chạy đủ vòng kèm icon/lời đọc đúng nấc
  sau; đặt hệ điều hành sáng + nấc tự động → app sáng, đặt tối → app tối;
  phím "2" trên câu trắc nghiệm thật của M1 chọn đúng lựa chọn thứ hai và
  chấm ngay; gõ "1"/"2" TRONG ô trả lời không kích hoạt gì; mũi tên phải đi
  đúng 3 phòng cung điện M5, mũi tên trái không làm gì; 375px con số ẩn
  hẳn, không cuộn ngang (375/375); console sạch. Dữ liệu seed đã xóa.
  **Một việc kiểm KHÔNG làm được bằng máy**: trình duyệt trong khay không
  phát sự kiện `change` của media query khi đổi nền hệ điều hành, nên
  đường "đang mở app mà đổi nền hệ thống" chỉ có test đơn vị gác.

**KHỐI TRƯỚC — 21.17 (08-11), đã commit `8c2d4be` và ĐÃ ĐẨY lên Pages:**
hai ý từ kho `Y-TUONG.md` do chủ dự án gọi tên.
- **B2 — chế độ tập trung**: vào `/bai/*` hoặc `/kiem-tra/*` thì khung app
  thu lại còn thanh biểu tượng (desktop 224 → 64px), cất tên app + cụm cài
  đặt + icon liên hệ; bốn mục menu ở lại nguyên độ tương phản. Làm KHÁC ý
  gốc một chỗ và đã khai: ý gốc nói "làm mờ", nhưng hạ độ đục chữ menu là
  hạ contrast dưới 4.5:1 nên đổi sang THU KHUNG. Bất biến ghi ở
  `GHI-CHU-KY-THUAT.md` mục 10.
- **H5 — một thẻ nhiều cách hỏi**: trường nội dung `alsoAsk` + hai hàm
  thuần `flashcardTurn`/`flashcardAskIndex`; thẻ 8 mức severity của M20 giờ
  xoay ba cách hỏi (xuôi → điền chỗ khuyết → hỏi ngược theo số). Bất biến ở
  mục 8. Mặt sau thẻ đó đánh số lại 0-7 cho mọi cách hỏi trả lời được.
- 1361 test xanh (+15 test mới của khối này), typecheck sạch, build qua, content:review
  render lại 21 module. Kiểm browser thật: `/bai/m1-bai-1` sidebar 64px và
  bốn mục vẫn gọi được tên, về `/` thì khung 224px hồi đủ cụm cài đặt;
  375px thanh đáy giữ chữ, ô bấm 94×70, không cuộn ngang (375/375); thẻ
  severity ở bậc 1 hiện đúng câu khuyết, bậc 2 hiện câu hỏi ngược, mặt sau
  cùng một bản. Dữ liệu seed dùng để kiểm đã xóa.

**MỘT VIỆC ĐANG TREO, phiên mới cần biết:**
1. **Phiên nền đang sửa hình `Journey`** (5 hình vis-hanh-trinh-* tràn
   viewBox, task riêng của chủ dự án, worktree `.claude/worktrees/…`) —
   ĐỪNG đụng component Journey trong `ConceptVisual.tsx` cho tới khi
   phiên đó nhập về. (Lượt dọn 20.3 có sửa 5 hình KHÁC trong
   ConceptVisual — không chạm Journey.)

**Hạng mục 20 KHÉP HẲN (08-09 → 08-10):** DoD đối chiếu, kịch bản test
trung cấp (`KICH-BAN-TEST.md` mục 12-13), hội đồng 15 ghế đã họp (biên
bản `DANH-GIA-HOI-DONG-TRUNG-CAP.md`, trung bình 7.6/10); **15/15 việc
mục 6 sửa xong ở khối 20.2 (commit `1d04c0b`), và trọn 52 phát hiện P2
mục 5 đã dọn ở khối 20.3 (08-10)** — biên bản không còn dòng nào treo.
Còn lại duy nhất:
- **Tuyển người test**: 2 dòng DoD còn CHƯA ĐẠT đều là buổi đo người
  thật (bài vẽ M1-2 của DoD v1; ba bài đo trung cấp của DoD v2 — kịch
  bản mục 12-13). App phần code sẵn sàng bàn giao.

**Cách làm một module nội dung** (đã chạy 4 lần liền, cứ theo đúng nếp):
1. Viết `content/modules/module-XX.json` — 5 bài × 6 bước, concepts có
   flashcard, `masteryTest` **>= 12 câu** (pool rút 8), câu TRỤ là
   lab/cli/palace-walk. Không dùng dấu backtick trong nội dung (app không
   render markdown).
2. `npx vitest run src/content` → sửa tới khi sạch (schema CHẠY THẬT mọi
   lời giải lab/CLI nên sai một lệnh là đỏ ngay).
3. `npx vitest run src/components/ConceptVisual.test.tsx` sẽ liệt kê
   visualId còn thiếu → vẽ hình mới trong `ConceptVisual.tsx` + đăng ký
   vào REGISTRY (kèm alias `vis-hook-*`).
4. `npm run typecheck` → `npm test` → `npm run content:review` →
   `npm run build`.
5. Kiểm browser thật: mở `/bai/mXX-bai-1`, đi vài bước, soi `getBBox`
   không hình nào tràn viewBox 220×130, mobile 375px không cuộn ngang.
   (Muốn mở khóa để kiểm thì sửa `passedModules` trong localStorage key
   `netmaster-progress`, **nhớ xóa sau khi xong**.)
6. Ghi lại vào file này + in mục "Sai lệch so với spec" cuối lượt.

## NHẬT KÝ CÁC KHỐI ĐÃ LÀM (trung cấp)

- Chủ dự án đã duyệt `KE-HOACH-TRUNG-CAP.md`: 9 module mới M13-21
  (Phần D hạ tầng: VLSM, trunk, STP, OSPF, ACL; Phần E hệ thống: DHCP/
  DNS doanh nghiệp, AD đa site, giám sát, capstone), engine CLI thiết
  bị kiểu IOS (dạng câu hỏi thứ 8), mở phạm vi lab lớp 2.
- Khối 11.1 XONG: `SPEC-TRUNG-CAP.md` (spec v2) — nguồn chân lý cho
  M13-21. **Cả 5 quyết định ở spec mục 7 đã được duyệt (08-08)**: 24
  lệnh CLI, PS 8→11 cmdlet, cung điện OSPF 4 tầng × 2 phòng, capstone
  chuỗi 3 chặng, màn tốt nghiệp gộp với màn kết cả khóa.
- **Khối 12.1 XONG (08-08): engine trunk 802.1Q** — headless, app chưa
  đổi một pixel.
  - `topology.ts`: `SwitchPort` thêm `mode` / `allowedVlans` /
    `nativeVlan`, tất cả TÙY CHỌN — **thiếu `mode` = access**, nên toàn
    bộ nội dung Module 4 giữ nguyên nghĩa, không sửa một chữ. Phạm vi
    đóng băng ghi lại thành MỐC 2 ở đầu file (có trunk; vẫn không VTP,
    EtherChannel, RSTP, QinQ) + đơn giản hóa thứ tư: trunk không đàm
    phán (không DTP).
  - `simulate.ts`: **VLAN đi theo khung**, nhãn chỉ là cách ghi trên
    dây. Cổng access đưa khung vào VLAN của cổng và gửi trần; trunk giữ
    VLAN, dán nhãn mọi VLAN trừ native. Nhờ mô hình đó, **cả ba bệnh
    trunk tự hiện ra** chứ không phải viết riêng từng ca:
    `trunk-vlan-not-allowed`, `native-vlan-mismatch`,
    `tagged-frame-on-access`. `PacketHop` thêm `tagged` để nhật ký
    chặng nói được khung nào mang nhãn.
  - `session.ts`: 3 thao tác mới (đổi vai cổng, allowed list, native) +
    quyền `setTrunk` tùy chọn (thiếu = không cho). Về access thì DỌN
    sạch trường trunk — không để dữ liệu tự mâu thuẫn.
  - `gradeLab.ts`: tách bệnh cho đúng — `vlan-mismatch-on-link` chỉ còn
    dành cho hai đầu ACCESS; thêm `trunk-one-side-only` và
    `native-vlan-mismatch-on-trunk`.
  - Fixture `trunkHealthy/trunkMissing/trunkAllowedMissingVlan/
    trunkNativeMismatch/trunkLab` — hai switch, hai xóm, một sợi dây.
  - 959/959 test xanh (+23), typecheck sạch, build qua.
- **Khối 12.2 XONG (08-08): STP-lite** — vẫn headless.
  - `src/engine/lab/stp.ts`: **mô phỏng KẾT QUẢ, không mô phỏng giao
    thức** — không timer, không BPDU, không listening/learning. Cho một
    sơ đồ trả về đúng một đáp án: ai làm root, cổng nào chặn. Luật bầu
    đúng thứ tự thật: priority nhỏ hơn thắng, hòa thì `bridgeMac`, hòa
    nữa thì id thiết bị (switch trong mô hình này vốn không có MAC nền —
    đơn giản hóa đã khai).
  - `Topology.stpEnabled` + `SwitchDevice.bridgePriority/bridgeMac`, tất
    cả TÙY CHỌN — **thiếu = STP tắt**, nên Module 4 giữ nguyên hành vi
    "có vòng là có bão".
  - Màn diễn của Module 15 chạy được end-to-end: mạng vòng ba switch
    chưa bật STP → `broadcast-storm`; bật lên → cùng mạng đó ping thông;
    **rút dây chính → cổng dự phòng tự mở, mạng vẫn thông**.
  - `diagnose` theo kịp: `l2-loop` chỉ còn là bệnh khi **chưa** bật STP —
    nêu "sơ đồ có vòng" lúc STP đang canh là dạy ngược bài vừa học.
  - `session.ts`: 2 thao tác mới (`set-stp`, `set-bridge-priority` — ép
    bội của 4096 như thiết bị thật) + quyền `setStp`; `ChangeClass` tách
    **`trunk` và `stp` thành hai nhóm quyền RIÊNG** (đề "sửa VLAN" không
    được ngầm cho phép dựng trunk hay bật STP).
  - 977/977 test xanh (+18), typecheck sạch, build qua.
- **Khối 12.3 XONG (08-08): UI phòng lab cho trunk + STP** — khối đầu
  tiên nhìn thấy được bằng mắt.
  - **Bảng vai cổng** (`SwitchTrunkEditor`): chip Access/Trunk, allowed
    list dạng chip bật-tắt (có chip "Tất cả"), native VLAN. Chỉ cổng
    ĐANG là trunk mới hiện allowed/native — cổng access không có hai thứ
    đó, bày ra là mời điền vào chỗ vô nghĩa. Mọi thao tác đi bằng ĐƯỜNG
    BẤM CHỌN, đúng luật phòng lab.
  - **Bảng Spanning Tree** (`StpPanel`): bật/tắt, chọn priority để chỉ
    định root, và NÓI RA cây đang thế nào — "Gốc cây: Switch-2", "Cổng
    đang nằm im: 1". Không nói ra thì người học chỉ thấy một cổng im lìm
    và tưởng nó hỏng.
  - **Cổng trên mặt bàn**: trunk có bóng dáng riêng; cổng bị STP chặn
    vẽ RỖNG RUỘT viền hổ phách (Von Restorff — nó không hỏng, nó đang
    nằm im). Cả hai trạng thái đi THẲNG vào tên đọc được của nút, không
    chỉ đổi màu.
  - **Nhật ký chặng nói được nhãn**: mỗi chặng ghi "(VLAN 10, mang nhãn)"
    hoặc "(VLAN 1, đi trần)" — tải trọng sư phạm của Module 14 nằm ở
    đây, không nằm ở animation.
  - `vlanChoicesOf` gom cả VLAN chỉ xuất hiện trong allowed list/native,
    nếu không thì đề "thêm VLAN 30 vào trunk" thành đề không bấm được.
  - `/design` thêm mục **"Phòng lab — trunk 802.1Q và STP (Phần D)"**:
    ba switch nối vòng, hai VLAN chung một trunk, đi qua `parseLabSpec`
    nên hợp lệ y hệt đề thật.
  - 984/984 test xanh (+7 test UI đi trọn lời giải bằng bấm chọn),
    typecheck sạch, build qua.
- **Khối 13.1 XONG (08-08): engine CLI thiết bị — phần XEM.**
  `src/engine/cli/` (state.ts + show.ts + interpret.ts), headless.
  - **Thế giới của CLI là CHÍNH topology phòng lab** — không bản sao,
    không đồng bộ hai chiều. Có test khóa: sửa VLAN thẳng trên sơ đồ thì
    `show vlan brief` đổi theo ngay.
  - 4 chế độ đúng hình dạng IOS (`Switch-1>` → `#` → `(config)#` →
    `(config-if)#`). **Luật chế độ là BÀI HỌC**: gõ `configure terminal`
    khi chưa `enable` bị từ chối bằng đúng câu
    `% Invalid input detected at '^' marker.` — `exit` lùi một bậc,
    `end` nhảy thẳng về privileged.
  - 7 lệnh show dựng bảng TỪ SƠ ĐỒ: `show vlan brief` (cổng trunk KHÔNG
    đứng tên VLAN nào — đúng thiết bị thật), `show interfaces trunk`
    (native + allowed + đang chở VLAN nào; chưa khai trunk thì bảng RỖNG
    và chính nó là câu trả lời), `show mac address-table` (đọc trạng thái
    học được của lượt "Gửi thử"), `show ip interface brief`,
    `show ip route` (mã C/S), `show spanning-tree` (chỉ rõ root và cổng
    `BLK`/`Altn`), `show running-config`.
  - Lệnh ngoài phạm vi → outcome rỗng cho UI kể tiếng Việt; `?` là
    outcome `help` riêng. Đúng nếp ba terminal trước.
  - **Một đơn giản hóa VỀ CÁCH GHI, đã khai ở đầu `show.ts`**: MAC in
    theo dạng chuẩn của app (`AA:BB:CC:00:00:01`) chứ không phải dạng
    chấm của IOS — app đã chọn một dạng từ Module 4 và terminal Phòng
    khám cũng theo dạng đó. HÀNH VI thì không đơn giản hóa dòng nào.
  - **Hoãn có chủ đích sang khối sau**: `show ip ospf neighbor` và
    `show access-lists` (chờ engine OSPF/ACL ở hạng mục 16), cùng nhóm
    lệnh cấu hình (khối 13.2). Khai lệnh cho engine chưa tồn tại chỉ
    tạo code chết.
  - 1004/1004 test xanh (+20), typecheck sạch.
- **Khối 13.2 XONG (08-09): engine CLI — phần CẤU HÌNH + `gradeCli`.**
  Vẫn headless, app chưa đổi một pixel.
  - **7 trong 9 lệnh cấu hình của spec mục 5.1**: `vlan <n>`,
    `switchport mode access|trunk`, `switchport access vlan <n>`,
    `switchport trunk allowed vlan <list>` (nhận cả `10-12,30` và `all`),
    `switchport trunk native vlan <n>`, `ip address <ip> <mask>`,
    `ip route <net> <mask> <next-hop>`, cùng cặp `shutdown`/`no shutdown`.
    Bốn lệnh còn lại (`router ospf`, `network … area 0`, `access-list`,
    `ip access-group`) HOÃN sang hạng mục 16 cùng hai lệnh show của
    chúng — khai lệnh cho engine chưa tồn tại chỉ tạo code chết.
  - **Lệnh cấu hình đi CHUNG một phép biến đổi với phòng lab**:
    `session.ts` xuất `applyTopologyChange`, nên luật "về access thì dọn
    sạch trường trunk" chỉ được viết một lần. Quyền thì mỗi bề mặt tự lo —
    phòng lab hỏi `LabAllowance`, CLI hỏi CHẾ ĐỘ và loại thiết bị.
  - **`shutdown` là trạng thái QUẢN TRỊ, không phải rớt dây** — trường
    `shutdown?` trên cổng switch/router, **thiếu = đang bật** (đơn giản
    hóa số 5 ghi ở đầu `topology.ts`: router thật xuất xưởng admin-down,
    ở đây mặc định bật để nội dung cũ giữ nguyên nghĩa). Ba nơi cùng nói
    một chuyện: mô phỏng trả mã bệnh RIÊNG `port-shutdown` (khác
    `src-no-link` — một bên đi cắm dây, một bên gõ `no shutdown`), cây STP
    coi dây đó như đã rút nên cổng dự phòng tự mở, và
    `show ip interface brief` in **`administratively down`** thay vì
    `down`. Gộp hai cột đó lại là xóa mất manh mối đắt nhất của bảng.
  - `vlan <n>` khai vào **VLAN database** (`declaredVlans`) nên
    `show vlan brief` thấy ngay VLAN chưa có cổng nào đứng tên — không
    thấy gì sau khi gõ thì người học tưởng lệnh trượt. **Cố ý KHÔNG mở
    chế độ `(config-vlan)#`** (bộ chế độ đã đóng băng ở bốn, mà trong đó
    phạm vi này không có lệnh nào để gõ).
  - **Cố ý khác IOS chỗ thứ hai, đã khai:** khai `switchport trunk
    allowed/native` cho cổng ĐANG LÀ ACCESS bị từ chối bằng
    `% Command rejected: the interface is in access mode.` IOS thật nhận
    rồi cất đó; mô hình này không có chỗ cất, và nói thẳng "đổi vai trước
    đã" dạy tốt hơn là im lặng nhận một lệnh không tác dụng.
  - `gradeCli` chấm **hiệu ứng + hình dạng + dấu vết**: `behavior` ủy
    quyền `runLabGoals` (tách ra từ `gradeLab`, hai bộ chấm dùng CHUNG
    một phép đo); `port-mode`/`access-vlan`/`trunk-carries`/
    `trunk-blocks`/`native-vlan`/`port-up`/`port-ip`/`static-route`/
    `vlan-exists` nhìn sơ đồ cuối; `viewed` đọc `CliFlags` — cách DUY
    NHẤT đo được đề "chẩn đoán bằng lệnh nào" (nếp `PsFlags` của M12).
    Cặp `trunk-carries`/`trunk-blocks` giữ đúng vai trò cặp
    `reach`/`blocked`: thiếu vế chặn thì người học "giải" bài lọc VLAN
    bằng cách cho tất cả đi qua — có test khóa.
  - **Chấm hiệu ứng nghĩa là dựng trunk bằng ĐƯỜNG BẤM CHỌN vẫn được
    công nhận y hệt gõ lệnh** (test khóa, đúng nếp gradePs).
  - `solution` của đề CLI là **chuỗi CHẶNG theo thiết bị**, vì bài "dựng
    trunk hai switch" phải rút dây console sang máy thứ hai
    (`moveCliConsole` đưa chế độ về `user` — ngồi xuống máy mới là phải
    `enable` lại). `runCliSolution` gom luôn những dòng bị máy từ chối:
    lời giải mẫu để lọt một dòng như thế là đề bài hỏng.
  - Fixture `tests/fixtures/cliFixture.ts` — 3 đề thật: trunk hai switch
    bằng lệnh, cổng router quên `no shutdown`, khai VLAN rồi tự tra bảng
    kiểm chứng.
  - 1030/1030 test xanh (+26), typecheck sạch, build qua.
- **Khối 13.3 XONG (08-09): `kind: 'cli'` vào pipeline + console UI +
  /design.** Khối đầu tiên của hạng mục 13 nhìn thấy được bằng mắt.
  - `kind: 'cli'` là **nhánh thứ TÁM** của `QuestionSchema`; response là
    `{kind:'cli', state}` — TRẠNG THÁI PHIÊN, chấm bằng `isCliSolved`.
    `lessonMachine.ts` KHÔNG bị sửa một dòng nào —
    `cliInPipeline.test.ts` khóa (lần thứ NĂM của bất biến này: lab →
    palace → clinic → ps → cli).
  - `cliSchema.ts` — chốt chặn nội dung nối gót labSchema/psSchema: sơ đồ
    sạch lỗi cấu trúc, console chỉ cắm được vào thiết bị CÓ CLI (máy tính
    không có), lời giải mẫu **không dòng nào bị máy từ chối** và chạy
    xong phải đạt trọn goals, đề chưa đạt sẵn.
  - `src/features/cli/CliConsole.tsx` — bảng mục tiêu **chấm sống** theo
    từng lệnh; dấu nhắc đổi theo chế độ; `?` và lệnh lạ nói tiếng Việt
    (i18n `cli.*`, 20 dòng mô tả lệnh, vi+en); "Làm lại từ đầu" thay undo
    (thiết bị thật không có undo); gõ miễn phí, chỉ "Nộp bài" tính lượt.
  - **Rút dây console là thao tác VẬT LÝ nên nó là NÚT BẤM, không phải
    câu lệnh** — hàng chip chọn thiết bị. Bấm sang máy khác thì chế độ về
    `user` (ngồi xuống máy lạ phải `enable` lại) và nhật ký ghi một DẤU
    MỐC; thiếu mốc đó thì đọc lại phiên sẽ thấy một loạt lệnh như gõ nhầm
    máy.
  - Bài dở: `PracticeDraft` thêm nhánh `kind: 'cli'` (sơ đồ đang sửa +
    nguyên nhật ký, **mỗi dòng lưu kèm dấu nhắc của lúc gõ** — chuỗi
    `>` → `#` → `(config)#` chính là bằng chứng đã đi qua những chế độ
    nào; dựng lại bằng chế độ hiện tại là viết lại lịch sử). Luật
    bài-học-lưu / bài-thi-không giữ nguyên (`ModuleTestPage` vẫn không
    truyền `draftKey`).
  - `masteryPool`: `cli` vào nhóm **câu TRỤ** — kỹ năng chính của Module
    14-17, rút trượt là có lượt thi không đo tới nó.
  - `/design` thêm mục **"Console thiết bị — CLI kiểu IOS (Phần D)"**
    (đề trunk hai switch, đi qua `QuestionSchema.parse` nên hợp lệ y hệt
    câu thật); `render-content-review.mjs` tả được đề CLI, **lệnh mẫu ghi
    rõ gõ ở MÁY NÀO** (bài hai switch mà gộp một danh sách thì người
    duyệt không kiểm được gì).
  - 1048/1048 test xanh (+18), typecheck sạch, build qua,
    `content:review` render lại 12 module. Kiểm browser thật trên
    /design: đi trọn đề bằng console — dấu nhắc chạy đủ 4 bậc,
    `switchport trunk allowed vlan` trên cổng access bị từ chối đúng lúc,
    `show interfaces trunk` in đúng bảng, bấm chip sang Switch-2 (nhật ký
    có dấu mốc, dấu nhắc về `Switch-2>`), 6 mục tiêu lật ✓ sống, nộp ra
    **"đạt"**; `?` liệt kê 20 lệnh và lệnh lạ nói tiếng Việt; mobile 375px
    document không cuộn ngang (375/375), output cuộn ngang TRONG `<pre>`
    của chính nó (317/439).
  - **Khối 13.4 gộp luôn vào đây** (/design + review script là hai việc
    nhỏ đi liền với UI). **Hạng mục (13) coi như khép**, còn treo đúng
    một mảnh: 4 lệnh OSPF/ACL chờ engine ở hạng mục 16.
- **Khối 14.1 XONG (08-09): drill VLSM — engine + màn luyện.**
  - `src/engine/subnet/vlsm.ts` — thuần TS: `gradeVlsm` chấm BA TIÊU CHÍ
    của spec (đúng / đủ / không phí đất), `solveVlsm` (lời giải tham
    chiếu: to trước, xếp liền nhau), `generateVlsmProblem` (rng bơm từ
    ngoài, tất định theo seed).
  - **Chấm THIẾT KẾ, không so lời giải mẫu**: bài này không có một đáp án
    đúng. Cắt theo thứ tự khác, chừa cả khoảng trống để dành — vẫn đạt.
    **Khoảng trống KHÔNG bị tính là lỗi** (quyết định có chủ ý, ghi ở đầu
    file): địa chỉ để dành là việc bình thường của người thiết kế; cái bị
    bắt là chồng lấn và cấp thừa cỡ.
  - **Tiêu chí "không phí đất" là cái giữ cho bài là VLSM**: thiếu nó thì
    "chia đều mỗi phòng một /26" cũng qua bài, mà đó đúng là thói quen
    VLSM sinh ra để chữa. Có test khóa.
  - Sinh đề NGƯỢC TỪ CỠ KHỐI (chọn cỡ trước, sinh số máy vừa khít sau)
    nên đề nào cũng có lời giải khít 100% — nếu không thì tiêu chí thứ ba
    vô nghĩa. Mỗi phòng một cỡ khác nhau (ba phòng cùng cỡ là bài chia
    đều của Module 3), và đề **không sắp sẵn từ lớn tới nhỏ** — tự nhận
    ra thứ tự cắt là bài học của module. Cả ba luật đều có test.
  - `src/features/drill/VlsmDrill.tsx` (route `/luyen-vlsm`) — mặt bàn là
    một BẢNG THIẾT KẾ, mỗi phòng một dòng hai ô. Thang 3 tầng bám đúng ba
    tiêu chí: **tầng 1 chỉ nói tiêu chí nào hỏng, tầng 2 mới chỉ ra từng
    dòng, tầng 3 mới bày một cách cắt** — đúng luật "feedback chỉ được
    chỗ sai, không đọc hộ đáp án".
  - `drill` trong schema module: `'subnet'` → **enum `'subnet' | 'vlsm'`**;
    card ở trang Học tự trỏ đúng route theo giá trị đó.
  - **`DrillResult` thêm `mode`** — hai loại drill không chung thang đo
    (10 bài vài chục giây ≠ 5 bài vài phút), trộn một biểu đồ là đường
    "giây/bài" nhảy dựng lên và người học tưởng mình đang tệ đi. Mỗi màn
    lọc lịch sử theo loại của mình. **Persist v3 → v4 kèm bậc migrate
    THẬT** (đóng dấu `mode: 'subnet'` cho mọi phiên cũ) + test.
  - 1073/1073 test xanh (+24), typecheck sạch, build qua. Kiểm browser
    thật: đi trọn một đề (dải /23, ba phòng 8/27/60 máy) → chấm đạt, nhảy
    sang đề sau và đồng hồ reset; bỏ trống nộp lần đầu chỉ hiện ba tiêu
    chí, chưa hiện dòng nào hỏng; mobile 375px document không cuộn ngang
    (375/375), bảng cuộn ngang trong khung riêng (343/480).
- **Khối 14.2 XONG (08-09): `module-13.json` — MODULE TRUNG CẤP ĐẦU TIÊN.**
  - **Phần D mở ở tầng khung**: `part` enum thêm `'D'`, token `--part-d`
    (tím, đạt AA cả hai nền — tokens.test đo), `[data-part='D']`,
    `PART_RANK` của content.test.
  - Nội dung: 5 bài theo đúng spec mục 3 — chia đều là phí đất → cắt lớn
    trước → căn khối → wildcard mask → tóm tắt tuyến. 6 khái niệm, 12 câu
    pool (mcq/typed/order), `drill: 'vlsm'` bật màn luyện của khối 14.1.
  - **Một mạch tình huống chạy suốt module**: công ty bốn phòng
    100/50/25/10 máy trên dải 192.168.10.0/24. Bài 1 cho thấy chia đều
    /26 làm phòng kinh doanh chết ngay, bài 2 cho thấy cắt sai THỨ TỰ thì
    đủ địa chỉ vẫn kẹt, bài 3 giải thích vì sao 192.168.10.160/26 là khối
    không tồn tại.
  - **Wildcard dạy Ở ĐÂY để M16 dùng cho OSPF** (spec chỉ đích danh);
    tóm tắt tuyến giữ mức đọc-hiểu như spec ghi.
  - 7 hình khái niệm mới trong `ConceptVisual` (+6 alias hook). Đã soi
    `getBBox` trên browser thật: **143 hình, không hình nào tràn viewBox**.
  - **Bản đồ khóa học vẽ lại theo spec v2**: 12 ô → **21 ô, 5 hàng
    A-E**; hàng chưa có nội dung để RỖNG (bản đồ nói thật cả về phần dang
    dở), hàng E chưa có tông riêng nên vẽ bằng màu chữ mờ. Test đổi từ
    "đủ lưới 12" sang "đủ lưới 21".
  - 1077/1077 test xanh (+4), typecheck sạch, build qua, `content:review`
    render **13 module**. Kiểm browser thật: card Module 13 mang
    `data-part="D"` (--part-accent = #c084fc), 5 chặng, cửa Học vượt và
    cửa `/luyen-vlsm` hiện đúng khi module mở; đi bài 1 từ Khởi động tới
    Thử tay — hình VLSM và hình bậc thang cỡ khối render đúng, ví dụ giải
    sẵn hiện nguyên vẹn, gõ `/27` chấm đúng ngay. Dữ liệu mở khóa dùng để
    kiểm đã xóa sau khi xong.
- **Khối 15.1 XONG (08-09): `module-14.json` — trunk 802.1Q, module CLI
  RA MẮT.**
  - 5 bài: hết cổng vì mỗi xóm một dây → dán nhãn 802.1Q → native VLAN
    lệch → allowed list thiếu tên → router-on-a-stick. 5 khái niệm, pool
    12 câu, 5 hình khái niệm mới (+5 alias hook).
  - **CLI ra mắt ĐÚNG CHỖ spec chỉ: bước Đoán thử của bài 1** — người học
    bị thả vào `Switch-1>` với lời nhắc "gõ ? xem có gì", mục tiêu là tự
    mò ra `show vlan brief` TRƯỚC khi được giảng chữ nào (đúng chiêu
    productive failure của M4/M11/M12).
  - **Ba câu CLI thật trong module**: pretest bài 1 (mò lệnh show), bài 3
    chữa **native VLAN lệch** (ca bệnh spec gọi là kinh điển của nghề —
    engine tái hiện được nên không phải kể suông), bài 4 chữa **allowed
    list thiếu VLAN 20** (đúng đề spec đặt hàng). Bài thi có 2 câu CLI
    làm **câu TRỤ** nên lượt thi nào cũng đo tới kỹ năng gõ lệnh.
  - `cliSchema` đã CHẠY THẬT mọi lời giải mẫu lúc parse — không dòng lệnh
    nào trong nội dung là lời hứa suông.
  - **Vá một chỗ lộ ruột dữ liệu**: màn hé đáp án câu CLI in `sw-1:` (id
    trong JSON) thay vì `Switch-1:` (tên trên dấu nhắc). Đã đổi sang
    hostname — id là lời của lập trình viên, không phải của người học.
  - 1077/1077 test xanh, typecheck sạch, build qua, `content:review`
    render **14 module**. Kiểm browser thật: bài 1 bước Đoán thử mở đúng
    console `Switch-1>`, gõ `?` ra bảng 20 lệnh tiếng Việt, `show vlan
    brief` in bảng VLAN thật (p1/p3 ở VLAN 10, p2 ở VLAN 20), mục tiêu
    lật ✓ sống, nộp ra "đoán đúng luôn" kèm đáp án đọc được; đề thi vượt
    Module 14 rút ra câu 1/8 chính là câu CLI dựng trunk hai switch.
- **Khối 15.2 XONG (08-09): `module-15.json` — STP, người canh vòng lặp.
  HẠNG MỤC (15) KHÉP.**
  - 5 bài: bão quảng bá → bầu root bridge → cổng nằm im → đứt dây chính
    cây mọc lối khác → PortFast. 6 khái niệm, pool 12 câu, 6 hình mới.
  - **Productive failure trứ danh của module, đúng như spec đặt hàng**:
    bước Đoán thử bài 1 là một BÀI LAB — ba switch nối tam giác chưa bật
    STP, người học bấm "Gửi thử" và tự xem cơn bão chạy vòng, rồi tìm ra
    nút bật STP. Không giảng chữ nào trước.
  - **Bài 4 mã hóa được "cổng dự phòng tự mở" thành mục tiêu chấm
    ĐƯỢC**: rút sợi dây chính ra, rồi phải đạt goal `macLearned` —
    Switch-3 học địa chỉ của PC-A **ngay trên cổng p3**, cái cổng vốn
    đang bị STP chặn. Trước khi rút, MAC ấy học ở cổng khác nên đề chưa
    đạt sẵn. Đây là cách nói "đường dự phòng có thật" bằng dữ liệu thay
    vì bằng lời hứa.
  - PortFast khai thẳng là **kiến thức thiết bị thật, app không mô phỏng
    thời gian hội tụ** — nói ra thay vì giả vờ (deepDive bài 5).
  - Câu trụ của bài thi: 1 lab (bật STP cứu mạng) + 1 CLI
    (`show spanning-tree`).
  - **Đồng bộ một cổng chặn cũ đã lạc hậu**: `content.test` kiểm "lab có
    cho người học làm gì không" nhưng chưa biết hai quyền của Phần D
    (`setTrunk`, `setStp`) — một bài lab hợp lệ vẫn bị báo là không cho
    làm gì. Đã cho khớp lại với `allowsAnything` của labSchema.
  - 1077/1077 test xanh, typecheck sạch, build qua, `content:review`
    render **15 module**. Kiểm browser thật bài 1: bấm "Gửi thử" ra nhật
    ký chặng khung quay vòng qua cả ba switch + lời "Mạng có vòng kín:
    câu hỏi quảng bá quay lại chính nơi vừa đi qua và nhân lên mãi" +
    chẩn đoán "Sơ đồ có vòng kín giữa các switch"; bấm "Bật STP" →
    bảng nói "Gốc cây: Switch-2, Cổng đang nằm im: 1", gửi lại thì "Gói
    tin tới nơi và có trả lời về", mục tiêu lật (xong). Cổng bị chặn có
    tên đọc được đầy đủ: "Switch-3 · p3 — nối tới Switch-1 (STP chặn)".
    Dữ liệu mở khóa dùng để kiểm đã xóa.
- **Khối 16.1 XONG (08-09): engine ACL đánh số** — headless, app chưa đổi
  một pixel.
  - `src/engine/lab/acl.ts`: luật ĐẦU TIÊN khớp là luật quyết định, cuối
    danh sách luôn có **DÒNG CẤM VÔ HÌNH** (implicit deny) — thứ đốn ngã
    người mới nhiều nhất; địa chỉ so bằng **wildcard** (nối thẳng vào bài
    Module 13), ba dạng `any` / `host x` / `x wildcard`.
  - **Ba đơn giản hóa cố ý, khai ở đầu file**: phòng lab chỉ sinh ICMP nên
    luật tcp/udp khai được nhưng không bao giờ ăn gói ping (đó là bài học
    về tính CỤ THỂ của luật, không phải lỗ hổng); ARP không bị ACL lọc như
    thiết bị thật; chỉ có ACL đánh số, không named ACL.
  - **Khai suông chưa lọc gì**: `accessLists` sống trên router,
    `aclIn`/`aclOut` mới là thứ áp nó lên cổng. Áp một số danh sách chưa
    hề khai thì mọi gói vẫn qua — đúng hành vi thiết bị thật, và là một ca
    bệnh đáng dạy.
  - `simulate.ts` thi hành ACL đúng thứ tự thật: chiều **out** xét trước
    cả ARP (gói bị cấm thì router không đi hỏi địa chỉ làm gì), chiều
    **in** xét NGAY khi gói vào cổng, trước cả câu hỏi "router có phải
    đích không". Mã bệnh mới `acl-denied` kèm `deniedBy` nói rõ **dòng
    luật nào ăn** — `seq: null` nghĩa là dòng cấm vô hình ra tay.
  - `NetState.aclHits` đếm số lần từng dòng ăn khớp; đây chính là cột số
    của `show access-lists`, và là bằng chứng chẩn đoán đắt nhất: luật có
    số nghĩa là gói CÓ đi tới đó.
  - **CLI mở thêm 3 lệnh** (còn đúng 2 lệnh OSPF treo): `access-list`
    (số dòng tự sinh bước 10, luật mới luôn xuống CUỐI — chính điều đó dạy
    vì sao phải viết luật hẹp trước luật rộng), `ip access-group … in|out`,
    và `show access-lists` in kèm số đếm. `show running-config` in lại cả
    danh sách lẫn dòng áp lên cổng.
  - `ChangeClass` thêm `'acl'` — cũng như `port-state`, đây là việc CHỈ
    CLI làm được nên `LabAllowance` không bao giờ cho, và đề lab nào lỡ
    cần tới nó sẽ bị chốt chặn schema chặn ngay.
  - 1100/1100 test xanh (+23), typecheck sạch, build qua.
- **Khối 16.2 XONG (08-09): engine OSPF-lite — HẠNG MỤC (16) KHÉP, và
  danh sách 24 lệnh CLI giờ ĐỦ CẢ 24.**
  - `src/engine/lab/ospf.ts`: **mô phỏng KẾT QUẢ, không mô phỏng giao
    thức** (đúng nếp STP-lite) — không timer, không gói hello, KHÔNG máy
    trạng thái 8 bậc. Tám bậc ấy là kiến thức THUỘC, để cung điện ký ức
    của Module 16 dạy; mô phỏng nửa vời chúng chỉ tạo thứ nhìn có vẻ thật.
  - **Láng giềng lên khi đủ BA điều kiện** (hai đầu đều bật tiến trình,
    hai cổng cùng subnet, mỗi đầu đã khai cổng của mình trong câu
    `network`), và không lên thì trả về đúng **LÝ DO**:
    `no-ospf-process` / `subnet-mismatch` / `network-not-declared` /
    `link-down`. Một chữ "down" trơ trọi thì chẩn đoán bằng gì.
  - **Bảng định tuyến TỰ HỌC**: lan theo từng lớp trên đồ thị láng giềng
    đã lên, cost 1 mỗi chặng, chặng đầu quyết định next hop. Router ID là
    IP lớn nhất trong các cổng — mô hình không có loopback nên luật rơi
    về vế thứ hai của chính chuẩn OSPF, vẫn là luật thật.
  - **Khoảng cách quản trị có nghĩa**: `routerNextHop` chọn theo HAI BẬC
    — longest prefix match trước, cùng prefix thì AD nhỏ hơn thắng
    (connected 0 < tĩnh 1 < OSPF 110). Có test: tuyến tĩnh cùng đích kéo
    gói đi đường khác với đường OSPF biết.
  - **Đứt đường thì OSPF tự đi vòng** (cost 1 → 2, ping vẫn thông) — đúng
    cái mà tuyến tĩnh không làm được, và là bài học lõi của Module 16.
  - `matchesWildcard` tách ra `wildcard.ts` dùng chung cho ACL và OSPF —
    hai nơi hỏi cùng một câu thì không được có hai câu trả lời.
  - **CLI: chế độ thứ NĂM `(config-router)#`** — spec mục 5.1 xếp
    `router ospf <id>` vào nhóm lệnh chế độ, nên thiếu chế độ này thì
    `network … area 0` không có chỗ để gõ. `exit` lùi về `(config)#`,
    `end` nhảy về privileged. Thêm `show ip ospf neighbor` (in cả dòng
    CHƯA lên kèm lý do — app cố ý nói nhiều hơn thiết bị thật, đã khai
    trong comment) và mã `O` trong `show ip route` kèm cặp
    `[110/cost]`.
  - 1122/1122 test xanh (+22), typecheck sạch, build qua.
- **Khối 17.1 XONG (08-09): nội dung `module-16.json` (OSPF)** — module
  thứ 16, và là **cung điện ký ức lần thứ BA**.
  - 5 bài đúng nếp Phần D: giới hạn tuyến tĩnh (mở màn bằng câu `cli` ở
    bước Đoán thử — người học tự tra `show ip route` của router câm rồi
    mới đọc lý thuyết) → láng giềng và gói hello → đồng bộ bản đồ + câu
    `network … area 0` → cost và bảng tự học → đứt cáp thì đi lối vòng +
    khoảng cách quản trị. 10 khái niệm, 14 câu trong pool thi.
  - **Cung điện 4 tầng × 2 phòng, `keyStyle: 'text'`**: Down, Attempt,
    Init, 2-Way / ExStart, Exchange, Loading, Full. Đi xem tầng 1-2 ở bài
    2 và tầng 3-4 ở bài 3, mỗi bài nhớ lại ngay đoạn vừa đi — 8 phòng
    chia hai lượt thay vì nhồi một lượt. Bậc Attempt giữ ghi chú **chỉ có
    ở mạng NBMA** (spec đòi dạy đúng, không làm tròn), và `content.test`
    khóa cả thứ tự 8 bậc lẫn ghi chú đó.
  - 8 hình phòng mới trong `RoomGlyph` (loa im tiếng, ống nghe gọi riêng,
    danh thiếp thiếu tên mình, bắt tay, búa chủ tọa, hai phong bì mục
    lục, phễu rót phần thiếu, hai bản đồ chồng khít) + 10 hình khái niệm
    mới trong `ConceptVisual`.
  - `parsePorts.test.ts` giờ **suy danh sách tòa nhà TỪ NỘI DUNG THẬT**
    thay vì chép tay fixture: quên khai tòa mới vào đó là ba phép kiểm
    hình gác nhầm chỗ (xanh trong khi tòa mới thiếu hình, còn app thì ném
    lỗi lúc chạy).
  - **Một lỗi engine thật lộ ra khi kiểm bằng browser**: `diagnose` báo
    "sơ đồ có vòng kín giữa các switch" cho mạng ba ROUTER nối vòng —
    tức là chê đúng cái đường dự phòng mà cả module dựng lên để khen.
    `hasCycle` giờ chỉ đếm dây nằm trọn trong tầng 2 (router chặn khung
    quảng bá nên vòng qua router không sinh bão), có test khóa.
  - 1124/1124 test xanh (+2), typecheck sạch, build qua. Đã kiểm bằng
    browser thật: 179 hình không hình nào tràn viewBox (đo `getBBox`),
    mobile 375px không cuộn ngang, cung điện đi lại chấm đúng, câu `cli`
    chạy trọn lời giải và mục tiêu bật xanh ngay khi khai đủ network.
- **Khối 17.2 XONG (08-09): nội dung `module-17.json` (ACL + bảo mật lớp
  2)** — module thứ 17, khép lại PHẦN D.
  - 5 bài: dòng cấm vô hình → chuẩn hay mở rộng → đúng cửa đúng chiều →
    khóa cổng switch (MAC flooding + port security) → kẻ mạo danh trong
    xóm (ARP spoofing + VLAN hopping mức đọc-hiểu). 12 khái niệm, 14 câu
    trong pool thi (3 câu trụ: 2 `cli` + 1 `clinic`).
  - **Ca "ACL chặn nhầm cả sếp" dựng đúng theo cơ chế THẬT của engine**:
    danh sách mới có đúng một dòng deny máy phòng khách, áp lên g0 chiều
    in — cả văn phòng tắc vì DÒNG CẤM VÔ HÌNH, không phải vì dòng người
    ta gõ. Chữa bằng `access-list 101 permit ip any any` (rơi xuống cuối,
    đứng sau dòng cấm nên máy khách vẫn tắc). Mở màn ở bước Đoán thử bài
    1 bằng câu `cli` chỉ có mỗi mục tiêu `viewed show access-lists` —
    người học tự tra bảng luật trước khi đọc một chữ lý thuyết nào.
  - **ACL chỉ cấu hình được bằng CLI** (luật Phần D), nên cả 5 đề ACL đều
    là câu `cli`; `content.test` khóa ca chặn-nhầm-sếp và luật interleaving
    tường lửa stateful M7 ↔ ACL không trạng thái.
  - **Nhật ký chặng giờ gọi tên DÒNG LUẬT đã ăn gói** (`lab.deniedByRule`
    / `deniedByImplicit`): engine vốn đã trả `deniedBy` nhưng UI im lặng,
    mà "một danh sách nào đó cấm" thì chưa sửa được. Hai câu tách bạch —
    dòng người ta gõ thì xóa/đảo thứ tự, dòng vô hình thì THÊM permit.
    Có test khóa cả hai nhánh.
  - Bài 5 nối thẳng ca trùng-IP của M11: cùng dấu hiệu một IP hai MAC,
    nhưng địa chỉ bị giành là địa chỉ CỔNG RA — hai ca `clinic` dùng
    `ping-flaps` + `mustClearDiagnoses: duplicate-ip`.
  - 12 hình khái niệm mới trong `ConceptVisual` (cửa có nội quy, ba dòng
    luật dừng ở dòng khớp, dòng cấm nét đứt, một vế nguồn ↔ bốn vế mở
    rộng, mũi tên in/out, hai mốc đặt luật, ACL ↔ stateful có sổ, bảng
    MAC tràn, ổ khóa cổng, hai kẻ nhận vơ .1, hai lớp nhãn).
  - **Ba đơn giản hóa đã khai thẳng trong bài** (không giấu): cú pháp
    console viết đủ giao thức-nguồn-đích cho cả số hiệu chuẩn; port
    security mô phỏng HẬU QUẢ (cổng đã bị đánh sập, dựng lại bằng
    `no shutdown`) chứ không mô phỏng bộ đếm MAC; VLAN hopping là phần
    đọc-hiểu, thứ cấu hình được là cái chốt chặn (native VLAN riêng).
  - 1128/1128 test xanh (+4), typecheck sạch, build qua, `content:review`
    render 17 module. Đã kiểm bằng browser thật: 196 hình không hình nào
    tràn viewBox (đo `getBBox`), mobile 375px không cuộn ngang, câu `cli`
    bài 1 chạy thật — gõ `show access-lists` ra đúng khuôn IOS và mục
    tiêu bật xanh ngay.
- **Khối 18.1 XONG (08-09): PS mở 8 → 11 cmdlet** — khối engine mở màn
  Phần E, app chưa đổi nội dung nào.
  - Thế giới PS thêm sổ NHÓM: `ad.groups` tùy chọn (thiếu = không nhóm,
    mọi đề Module 12 giữ nguyên nghĩa), scope Global | DomainLocal.
  - Ba lệnh mới đúng fidelity: `Get-ADGroup` (tra nhóm, -Identity /
    -Filter *), `Get-ADGroupMember` (cột ObjectClass nói nhóm đang chứa
    NGƯỜI hay NHÓM — hình dạng chữ G→DL nhìn thấy được),
    `Add-ADGroupMember` (lệnh GHI: im lặng như thật, idempotent, nhận
    danh sách -Members cách nhau dấu phẩy). Hai luật thật của AD được
    giữ vì chúng LÀ bài học: Global không chứa DomainLocal, không được
    tạo vòng thành viên.
  - Goal chấm mới `group-member` tính CẢ nhóm lồng nhóm — một goal trên
    nhóm DomainLocal kiểm trọn chuỗi AGDLP; đề khai CẶP goal (GG + DL)
    thì lối tắt nhét-thẳng-user-vào-DL bị chấm đỏ (test khóa).
  - Fixture `worldAgdlp()` + `specXepNhom()` — hình dạng đề M19 sẽ dùng;
    4 mã lỗi soạn bài mới trong `validatePsWorld`.
  - Mốc đóng băng MỚI: **11 cmdlet, pipeline vẫn MỘT tầng**, không
    scriptblock/biến/vòng lặp.
  - 1143/1143 test xanh (+15), typecheck sạch, build qua. Kiểm browser
    thật: bảng Get-Help trong `/design` liệt kê đủ 11 lệnh kèm mô tả
    tiếng Việt, console không lỗi.
- **Khối 18.2 XONG (08-09): nội dung `module-18.json` (DHCP & DNS doanh
  nghiệp)** — module ĐẦU TIÊN của Phần E, kèm mở khung Phần E.
  - Khung Phần E: schema `part` nhận 'E', token `--part-e` (lục mạ, cả
    hai theme, test contrast AA), `[data-part='E']`, hàng E của bản đồ
    khóa học đổi từ màu mờ sang tông thật.
  - 5 bài: relay + giaddr (ẩn dụ hỏi cưới M6 quay lại, self-explain đậm
    "vì sao relay phải ghi giaddr" đúng spec) → scope cạn + APIPA (ca
    "sáng thứ hai cả tầng câm" ở bước Đoán thử — productive failure) →
    DHCP failover + bẫy hai-server-một-dải (nối bệnh trùng IP M11) →
    split DNS (ca "chuyển DNS mới xong tên nội bộ chết" — resolve-fails)
    → forwarder + conditional forwarder + TTL. 10 khái niệm, 14 câu pool
    (2 trụ: 1 clinic APIPA + 1 ps Test-NetConnection cổng 53).
  - **Ca DHCP không cần mở overlay**: máy APIPA khai thẳng
    `169.254.x.x/16 + gateway null` trong topology — `ping-fails` tự ốm
    nhờ `no-gateway`, ipconfig tự lộ manh mối; cả hai ca đều
    `choose-action` vì thứ hỏng (scope, zone DNS) nằm ngoài mô hình mạng.
  - 10 hình khái niệm mới + 5 alias hook trong `ConceptVisual`; học được
    một luật mới: chú thích mono đáy hình quá ~34 ký tự là tràn viewBox
    (9 hình dính một lượt, đã đo `getBBox` và rút gọn — ghi vào
    GHI-CHU-KY-THUAT mục 7).
  - 1147/1147 test xanh (+4), typecheck sạch, build qua, content:review
    render 18 module. Kiểm browser thật: 211 hình không tràn (trừ 5 hình
    hanh-trinh tràn từ trước — nợ cũ, không thuộc khối này), card M18
    trên trang Học ăn đúng tông `#a3e635`, mobile 375px không cuộn
    ngang, console sạch.
- **Khối 18.3 XONG (08-09): nội dung `module-19.json` (AD đa site & ủy
  quyền)** — mảnh giữa của Phần E.
  - 5 bài: site & subnet gắn site (tầng Site của LSDOU M9 có nghĩa
    thật; ca "chi nhánh có DC mà vẫn chậm") → replication + khe trễ
    giữa site (đổi mật khẩu có đường ưu tiên — dạy đúng, không làm
    tròn) → AGDLP mở màn bằng **productive failure đúng kế hoạch: bước
    Đoán thử thả người học vào miền thật, đa số sẽ nhét thẳng user vào
    nhóm quyền và bảng mục tiêu đỏ một nửa — cái nửa đỏ là bài giảng**
    → vòng đời nhân sự (điền mắt xích, fading 1) → delegation + bài tự
    xếp từ yêu cầu suông có nhóm nhiễu (fading 2). Worked example
    fading trên AGDLP 0→1→2 đúng chiêu GPO M9.
  - 8 khái niệm, 15 câu pool (2 trụ đều là `ps`: ca kiểm-toán-vá-chuỗi
    — user nằm thẳng trong DL, bổ sung mắt xích GG; và ca xếp-mới có
    nhóm nhiễu). 4 bài `ps` của module đều dùng cặp goal
    `group-member` (GG + DL) để lối tắt bị chấm đỏ.
  - 8 hình khái niệm mới + 5 alias hook; 4 chú thích dài quá 34 ký tự
    bị tràn — đo `getBBox` rồi rút gọn (luật đã ghi ở GHI-CHU mục 7).
  - 1147/1147 test xanh, typecheck sạch, build qua, content:review
    render 19 module. Kiểm browser thật: cái bẫy lối tắt chạy đúng
    thiết kế (Add vào DL → goal DL ✓ goal GG ○; Add vào GG → cả hai ✓),
    lời "lệnh im lặng" mới hiện đúng, console sạch, không cuộn ngang.
- **Khối 18.4 XONG (08-09): nội dung `module-20.json` (Giám sát & nhật
  ký)** — khép hạng mục 18, Phần E chỉ còn capstone.
  - 5 bài: đọc một dòng syslog (4 câu hỏi: khi nào/máy nào/nặng cỡ
    nào/chuyện gì) + 8 mức severity với câu nhớ tiếng Việt **"Em Ăn Cơm
    Em Với Người Iu Đi"** (spec đòi mẹo câu nhớ; danh sách rời rạc để
    thẻ SM-2 gánh, có câu order 8 mức ở retrieval + đề thi) → log tập
    trung + giờ lệch/NTP (ca "đồng hồ chậm 6 phút đảo ngược nhân quả")
    → **đọc log THẬT độ dài thật** → SNMP polling vs trap (ẩn dụ y tá
    đi buồng / chuông đầu giường) → baseline (bất thường có HAI phía —
    im ắng khác nếp cũng là chuông).
  - **Generation effect đúng spec**: 3 file log SINH BẰNG SCRIPT tất
    định — sw-core.log 162 dòng (đúng MỘT dòng ERROR thật giữa hàng
    chục WARNING quạt/quảng bá làm cảnh báo giả), srv-dhcp.log 153
    dòng (chuỗi WARNING utilization 78→96% leo thang rồi ERROR no free
    leases — nối thẳng ca sáng-thứ-hai của M18), tap-trung.log 24 dòng
    3 máy trộn. Bài dạy chiến thuật "lọc trước, đọc sau" + hai câu vặn
    cảnh báo giả.
  - 15 câu pool (2 trụ `ps`: log DHCP cạn scope, log switch không còn
    gợi ý cú pháp). 8 khái niệm, 8 hình mới + alias.
  - 1147/1147 test xanh, typecheck sạch, build qua, content:review
    render 20 module. Kiểm browser thật: đi trọn bài 3 từ Đoán thử tới
    console, gõ một nhát Select-String ERROR giữa 162 dòng — đúng một
    dòng sự cố nổi lên, goal bật xanh; 237 hình không tràn (đã rút gọn
    4 chú thích); console sạch.
- **Khối 19.1 XONG (08-09): `module-21.json` CAPSTONE — nội dung khép
  lộ trình 21/21 module.**
  - 4 bài quanh CHUỖI 3 CHẶNG trên cùng mạng chi nhánh (quyết định 4):
    ① VLSM cắt 10.40.0.0/24 cho 3 phòng (60/25/10 máy → /26, /27, /28)
    + liên site /30, rồi câu `lab` đặt địa chỉ lên sơ đồ (chỉ setIp) —
    sai prefix/gateway là ping xuyên phòng tự đứt; ② câu `cli` dựng
    trunk hai switch + bật OSPF trên R-ChiNhanh (wildcard chép từ bản
    cắt: 0.0.0.63 / 0.0.0.15 / 0.0.0.3), goal `viewed show ip ospf
    neighbor` ép kiểm chứng Full; ③ câu `cli` ACL: khách bị chặn tới
    máy chủ kế toán, vẫn ra Internet, kinh doanh không vạ lây + tự tra
    bảng luật. Mỗi chặng một câu nộp riêng, thang 3 tầng riêng.
  - Chỉ 2 concept meta đúng spec (quy trình 4 bước: đặt địa chỉ → nối
    dây → cấu hình → kiểm chứng; kiểm chứng từng tầng) — không khái
    niệm mới.
  - Bài 4 + đề thi: **ca bệnh liên tầng** (trunk lệch native + DNS hỏng
    — bài luyện là bản-ghi-thiếu, ca thi là bản-ghi-trỏ-sai; chẩn đoán
    và hành động đều là phương án GỘP HAI BỆNH, một-bệnh là distractor).
    Pool 15 câu tổng ôn trá hình cả trung cấp (VLSM, trunk, OSPF, ACL,
    giaddr, AGDLP, baseline), 2 trụ: 1 `cli` + 1 `clinic` kết đề.
  - **Bắt và vá một bug engine thật khi chạy chặng 2 trên browser**:
    `router ospf 1` vừa gõ (chưa kịp câu network) → `validateTopology`
    coi networks rỗng là lỗi cấu trúc → bộ chấm sống ném lỗi, màn
    console TRẮNG XÓA. Vá: trạng thái đi-qua đó là hợp lệ (thiết bị
    thật cũng vậy); schema nội dung (min 1) vẫn gác đề soạn sẵn. Test
    khóa 2 tầng (ospf.test + cliConfig.test). Ghi bất biến vào
    GHI-CHU-KY-THUAT mục 2.
  - 1148/1148 test xanh (+1), typecheck sạch, build qua, content:review
    render 21 module. Kiểm browser thật: đi trọn bài 2 từ hook tới
    console, tự tay dựng trunk 2 switch + OSPF — 7/7 mục tiêu xanh,
    bảng láng giềng ra FULL đúng khuôn IOS; 243 hình không tràn.
- **Khối 19.2 XONG (08-09): MÀN TỐT NGHIỆP** — khép hạng mục 19 và toàn
  bộ phần CODE của cả hai spec.
  - `src/features/graduation/`: `milestones.ts` (hai mốc SUY TỪ DỮ LIỆU:
    nhập môn = module cuối Phần A-C, trung cấp = module cuối lộ trình —
    thêm module là mốc tự dời, cùng nếp isFinalModule) +
    `GraduationPage` (route lazy `/tot-nghiep/:milestoneId`).
  - Một trang hai mốc (quyết định 5): tiêu đề/lời dẫn riêng từng mốc,
    **bản đồ hành trình tô theo MODULE ĐÃ ĐẬU của chính người học**
    (hàng theo Phần, tông token `--part-*` — chính tấm bản đồ 21 ô của
    Module 1, giờ hết ô rỗng), 6 ô số liệu đọc từ store (module đậu,
    XP, streak, thẻ ôn, bài học, ca bệnh đã chữa), lời nhắc "không cộng
    XP — tấm gương, không phải phần thưởng".
  - Cửa vào: nút ở màn ĐẬU của bài thi hai module mốc + mục "Mốc tốt
    nghiệp đã đạt" trong Hồ sơ (xem lại được mãi). Gõ URL thẳng khi
    chưa đậu → màn chưa-mở, không lộ số liệu.
  - 7 test mới khóa: mốc suy từ data, cổng chặn URL, bản đồ tô đúng số
    ô, và bất biến KHÔNG-XP (render xong store y nguyên). Chuỗi song
    ngữ `grad.*` + `test.gradLink` đủ hai file.
  - 1155/1155 test xanh (+7), typecheck sạch, build qua. Kiểm browser
    thật: mốc trung cấp bản đồ kín 21 ô + số liệu đúng seed; mốc nhập
    môn tô đúng 12 ô + lời dẫn "con đường trung cấp đã mở"; cổng chặn
    hoạt động; Hồ sơ chỉ hiện mốc đã đạt; mobile không cuộn ngang; tab
    sạch không lỗi console (tiện thể xác nhận khiên chặn-hai-cửa-sổ
    vẫn gác đúng).

- **Khối 20.1 XONG (08-09): KHÉP HẠNG MỤC 20 phần máy làm được** — DoD
  toàn phần + kịch bản test người thật trung cấp + hội đồng chấm D/E.
  - **Bảng DoD ĐẠT/CHƯA ĐẠT** (rà từng dòng, bằng chứng tươi cùng ngày:
    1155/1155 test xanh, typecheck sạch, build qua):

    | Dòng DoD | Nguồn | Kết quả |
    |---|---|---|
    | Mọi bài đủ 6 bước, kết bằng retrieval | v1 mục 6 | **ĐẠT** — `StepsSchema` là `z.tuple` 6 bước nên không thể thiếu (contentSchema.ts:329), áp cả 21 module |
    | Flashcard tự sinh, ôn đúng lịch SM-2 | v1 mục 6 | **ĐẠT** — sm2 + relearning có test; học vượt cũng sinh đủ thẻ (test khóa) |
    | Không màn nào quá 1 khái niệm mới | v1 mục 6 | **ĐẠT** — mỗi screen một conceptId; ghế sư phạm hội đồng trung cấp không tìm ra vi phạm |
    | Test người thật M1-2 (bài vẽ từ trí nhớ) | v1 mục 6 | **CHƯA ĐẠT — cần người**; kịch bản mục 1-6 sẵn |
    | Bất biến cũ nguyên + `cliInPipeline.test` | v2 mục 6 | **ĐẠT** — lần khóa thứ 5 của bất biến lessonMachine, nằm trong 1155 test xanh |
    | Module mới: pool ≥ 12, câu trụ đúng luật, review render, hình không tràn | v2 mục 6 | **ĐẠT, kèm ghi chú** — POOL_MIN=12 có test (content.test.ts:406); review render 21 module; getBBox kiểm từng khối. Ghi chú: M13 không có câu KIND trụ — không phạm luật cứng nhưng là lỗ phép đo, hội đồng đã ghi P1 |
    | Phần D qua lượt kiểm fidelity riêng | v2 mục 6 | **ĐẠT, kèm ghi chú** — từng khối 12-17 có lượt kiểm browser; hội đồng chấm lại lộ thêm 2 lỗi dạy sai (vai Root, wildcard) — đúng vai trò của lượt chấm lại, chờ duyệt sửa |
    | Test người thật trung cấp (a)(b)(c) | v2 mục 6 | **CHƯA ĐẠT — cần người**; kịch bản mục 12-13 vừa viết |

    Hai dòng CHƯA ĐẠT đều là việc-cần-người — không dòng nào chặn được
    bằng code.
  - **`KICH-BAN-TEST.md` thêm mục 12 + 13** (mục "Sau buổi test" cũ dời
    xuống 14): mục 12 đo (a) dựng trunk hai switch từ TỜ YÊU CẦU SUÔNG
    qua đề /design (không ngữ cảnh bài học) và (b) ca native-lệch do
    điều phối viên tự cấy vào lab rồi bấm giờ 10 phút khoanh bệnh; mục
    13 đo (c) học M21 tại chỗ, ghi tầng gợi ý cao nhất từng chặng —
    ĐẬU khi không chặng nào cần tầng 3. Mỗi mục đủ bộ theo nếp cũ:
    điều kiện chọn người, chuẩn bị, điểm quan sát, tiêu chí ĐẬU/ĐẬU CÓ
    GHI CHÚ/RỚT (rớt trỏ về module gốc, không đổ cho người học), mẫu
    ghi chép.
  - **Hội đồng trung cấp đã họp** — nếp 07-08 mở rộng: 15 ghế (14 mảng
    cũ + ghế Capstone) chấm độc lập có bằng chứng file:dòng, 14 phát
    hiện nặng nhất qua phản biện chéo (14/14 tái lập, 0 loại), chủ tịch
    tự kiểm mẫu cả 3 lỗi gốc P0 — tái lập đúng nguyên văn. Kết quả:
    **trung bình 7.6/10** (cao nhất 8.2 kiến trúc + i18n, thấp nhất 6.5
    hiệu năng), 80 phát hiện → sau phản biện: **3 P0** (đều sửa S) +
    25 P1 + 52 P2. Biên bản đầy đủ + 4 đợt sửa đề xuất:
    `DANH-GIA-HOI-DONG-TRUNG-CAP.md`.
  - Sức khỏe lượt này: 1155/1155 test xanh, typecheck sạch, build qua
    (không sửa dòng code nào — toàn giấy tờ, đúng đề bài hạng mục 20).

- **Khối 20.2 XONG (08-09): LƯỢT SỬA THEO BIÊN BẢN TRUNG CẤP** — chủ dự
  án duyệt trọn gói ("làm hết đi tôi duyệt"), cả 15 việc mục 6 của
  `DANH-GIA-HOI-DONG-TRUNG-CAP.md` đã đóng trong một lượt.
  - **Đợt 1 — 3 câu dạy sai (P0):** `show spanning-tree` in vai
    **Root FWD** cho root port (`rootPorts` vào `StpState`, test khóa
    "đúng một cổng Root mỗi switch không phải root"); replication giữa
    site sửa thành "thường đặt cỡ 15 phút; mặc định gốc của AD là 180
    phút" ở cả teach lẫn flashcard M19; ví dụ wildcard M13 đổi thành
    nền .1 + wildcard 0.0.0.254 (đúng luật bit vừa dạy).
  - **Đợt 2 — vá phép đo:** ca hai tầng M21 (luyện + thi) viết lại — ba
    lựa chọn ĐỀU là "hai bệnh" khác cặp, luyện đổi sang cặp bệnh KHÁC
    thi (allowed-list thiếu + thiếu bản ghi ↔ native lệch + bản ghi trỏ
    sai); test cue mở rộng sang clinic (độ dài + chống bao-trùm — quét
    ra và vá luôn 3 ca cũ m11-mt-7/m11-mt-8/m18-mt-ca); **examMode**:
    bài thi không chấm sống ✓/○ ở CẢ BA bề mặt lab/CLI/PS, lab ẩn thêm
    "Chỗ đáng nhìn lại" (giữ lời "không có gợi ý giữa chừng"); cờ
    **`anchor: true` theo câu** — M13 có 2 câu trụ tính-tay (cắt liên
    hoàn + gộp tuyến, content.test khóa); pool M21 thêm 2 câu STP (hết
    trống M15, pool 16); goal **`native-match`** đo hai-đầu-khớp thay
    goal một phía ở m14-mt-cli-2 (sửa đầu nào cũng được công nhận, test
    khóa cả hai chiều); M20 sửa explain trích sai giờ + log DHCP hết tự
    mâu thuẫn (không tái cấp IP, scope cạn ngừng cấp, utilization không
    tụt).
  - **Đợt 3 — capstone trung thực:** SRV-DNS hai ca M21 dời về CÙNG XÓM
    chi nhánh (10.40.0.4) — nslookup hết phi vật lý, ping kiểm chứng
    được; **console thiết bị CHỈ-ĐỌC trong phòng khám**
    (`deviceConsole: true`, spec 4.2): chip chọn switch/router,
    enable/show chạy thật trên sơ đồ sống, lệnh cấu hình bị chặn bằng
    lời Việt — nửa bệnh L2 giờ KHÁM được thay vì đoán; hook chặng 2
    khai thật chuyện phòng kỹ thuật dời tòa, dải /27 thành của để dành.
  - **Đợt 4 — nền móng:** nội dung nạp LƯỜI (`primeModules` + AppGate;
    21 module = 21 chunk riêng, sửa một chữ chỉ invalidate đúng chunk
    đó) và **zod rời hẳn PROD** (tách `contentPure.ts` + `ltextSchema.ts`,
    engine index thôi re-export schema) — **khởi động ~530KB → ~215KB
    gzip**, đo thật trên dist; nút "Dùng cửa sổ này" reload để không ghi
    đè tiến độ bằng RAM cũ; bài dở lab có lưới đỡ nội-dung-đã-đổi (lệch
    tập thiết bị là bỏ draft) + reset regen layout; CLI từ chối ACL
    1-99 (chỉ extended 100-199, schema siết theo); quét thuật ngữ "cổng
    dịch vụ"→"port" (M17/M18/M10 + hình ExtendedAcl); VlsmDrill hết rơi
    focus (autoFocus + dồn focus màn tổng kết); phòng Exchange vẽ lại
    thành hai phong bì BAY CHÉO (hết na ná phòng Full); `net` của bộ
    chấm hành vi nối vào console — `show mac address-table` và cột match
    `show access-lists` có dữ liệu thật.
  - 1162/1162 test xanh (+7), typecheck sạch, build qua, content:review
    render 21 module. Kiểm browser thật: 296 hình không tràn getBBox;
    ca M21 bài 4 — console thiết bị từ chối config bằng lời Việt, `show
    interfaces trunk` lộ đúng bệnh allowed-list, chip sang SW-2 có dấu
    mốc, ping 10.40.0.4 thông + nslookup NXDOMAIN hợp lý; thi vượt M14
    câu CLI — bảng mục tiêu tĩnh có dòng "Bài thi không chấm sống",
    không ✓ sống, goal native-match nói đúng lời hai đầu; VlsmDrill
    focus rơi đúng ô đầu; console browser sạch lỗi.

- **Khối 20.3 XONG (08-10): LƯỢT DỌN 52 PHÁT HIỆN P2** — mục 5 của biên
  bản trung cấp sạch hẳn, biên bản không còn dòng nào treo.
  - **Fidelity CLI (ghế 3):** câu Invalid input giờ in đúng khuôn HAI
    DÒNG của IOS — dòng dấu `^` căn đúng cột dưới token hỏng (tính cả
    dấu nhắc); THIẾU từ là Incomplete, THỪA từ là Invalid; `enable` gõ
    thừa ở privileged thành no-op im lặng; `show` sai loại thiết bị đi
    đường lỗi thật và KHÔNG nhiễm cờ `viewed`; bảng trunk đủ 4 mục và
    đọc cùng VLAN database với `show vlan brief`; `show ip route` in
    "Gateway of last resort is not set" đúng ngữ cảnh; neighbor in
    `FULL/-`, mọi lệch còn lại khai ở docstring.
  - **Engine (ghế 2/11/12):** OSPF lệch subnet mask là láng giềng DOWN;
    hòa cost tie-break tất định theo next hop (khai rõ không ECMP);
    `computeStp` + `ospfRoutesOf` cache WeakMap theo topology bất biến;
    show.ts thôi tự chế toán bit, dùng ipv4.ts; goal `viewed` có biến
    thể `requireOspfFull` — "kiểm chứng ra Full" phải chạy lệnh LÚC bảng
    có Full mới được tính (2 đề M21 dùng); goal `found-line` có
    `maxMatches` — lưới quét thô `Select-String o` không qua được hai
    câu trụ M20 nữa; `Add-ADGroupMember -Members a, b` (phẩy + khoảng
    trắng) hết lặng lẽ bỏ rơi thành viên; bộ chấm gõ tay chặn câu nước
    đôi "1 hay 99" cho đáp án ngắn.
  - **Phép đo (ghế 1/10/15):** `drawMasteryTest` đẩy câu trụ NẶNG nhất
    về cuối đề (peak-end — ca liên tầng M21 luôn khép màn, M15 hết lệch
    nếp); ~7 test mới khóa bất biến sư phạm trung cấp (pretest CLI M14,
    bão-trước-dạy M15, bẫy AGDLP + fading 0→1→2 M19, drill vlsm M13,
    log thi M20 ≥ 150 dòng, clinic trong pool M21); m15-mt-cli-1 nói
    thật điều nó chấm + thêm câu đọc-bảng (ai làm root); câu giaddr M21
    thành MCQ hiểu-vai-trò, M18 bỏ hint đánh vần.
  - **Nội dung nói thật (ghế 2/4/6):** khai "dòng DOWN kèm lý do là app
    nói thêm" ngay trong bài M16; established sửa thành "chỉ nhìn cờ
    ACK/RST, không có trí nhớ"; DORA sửa "hai nhịp phát từ máy xin";
    explain APIPA phân biệt theo lease; "số hiệu" ExStart tách khỏi số
    tiến trình (Router ID); deepDive 20% dự phòng nối với luật chấm
    khít của drill; cặp timestamp đảo trong sw-core.log đã xuôi.
  - **UX + a11y (ghế 5/8/9):** phiên drill VLSM LƯU BÀI DỞ
    (`vlsmDrillDraft` — seed + ô đã điền + đề đang đứng, nút "Làm tiếp
    phiên đang dở"); Enter khi bảng còn ô trống là no-op (hết đốt oan
    thang gợi ý); ba tiêu chí có chữ (đạt)/(chưa đạt); transcript cả BA
    terminal focus được (tabIndex) — Firefox/Safari cuộn lại được lịch
    sử; live region CLI báo cả chiều mục tiêu TỤT; dấu mốc rút dây lưu
    deviceId, lời kể dịch lúc render; bài dở CLI có lưới đỡ
    nội-dung-đã-đổi như lab; "Về sơ đồ ban đầu" của lab XÓA bài dở
    (test khóa); bỏ chip VLAN cuối không âm thầm lật "cho tất cả";
    SwitchTrunkEditor ghi nhận là hàng /design-only.
  - **Hình (ghế 7):** khối /28 có nhãn; hình ARP mạo danh — nạn nhân có
    tên, câu ".1 là tôi" nằm trên HAI mũi tên đến; hình DHCP failover
    chia đôi khung either/or (hai kho rời ↔ một sổ chung); 5 chú thích
    35-36 ký tự rút về ≤ 34; đồ thị SNMP có nhãn đại lượng "lỗi/phút".
    (Không đụng hình Journey — phiên nền đang giữ.)
  - **Store + i18n (ghế 13/14):** trần bài dở dọn theo LRU lần-chạm-cuối;
    importBackup chặn version tương lai + spot-check trường quý + parse
    thử settings; streak hết "1 days" (đơn vị vào label); "neighbour" →
    "neighbor"; test gác 3 họ key động cli.cmd./ps.cmd./vlsm.issue.;
    test seed VlsmDrill dùng ngày local (hết flaky 0h-7h VN).
  - 1177/1177 test xanh (+22), typecheck sạch, build qua, content:review
    render 21 module. Kiểm browser thật: 243 hình getBBox không tràn;
    dấu ^ căn đúng cột dưới token hỏng trên /design; bảng trunk in đủ 4
    mục; drill VLSM chặn Enter khi thiếu ô, lưu bài dở và "Làm tiếp
    phiên đang dở" khôi phục đúng ô đã điền. Dữ liệu kiểm thử đã xóa.

- **Khối 21.1 XONG (08-10): thẻ "HÔM NAY" — ý đầu tiên lấy từ kho.**
  Biên bản hội đồng đã sạch nên lượt này mở `Y-TUONG.md`; chủ dự án giao
  tự chọn, chọn cụm "vòng quay lại app" (E1 + E2 + A5) vì app đủ nội
  dung rồi, mắt xích yếu nhất là khoảnh khắc MỞ APP.
  - **Dọn kho trước**: 3 ý đang ghi "chờ duyệt" thực ra đã làm xong từ
    các khối trước — E4 (sao lưu một cú bấm), F2 (cắt nhỏ gói nội dung),
    G1 (phòng khám hai terminal). Đã kiểm chứng bằng code rồi đánh dấu ✅
    kèm khối nào làm; kho giờ nói thật (còn 18 ý chờ).
  - **`src/engine/todayPlan.ts`** (thuần TS, 9 test): suy MỘT kế hoạch từ
    dữ liệu sẵn có. Thứ tự ưu tiên là ôn → bài dở → thi cuối module →
    bài mới. Hai luật giữ cho nó không phá cơ chế học, đã khai đầu file:
    (a) KHÔNG tạo đường tắt — chỉ trỏ tới việc người học vốn vào được,
    mastery gate/mở bài tuần tự/trần nợ ôn vẫn do engine cũ quyết;
    (b) ôn trước học sau, nợ quá trần thì không mời bài mới mà nói thật.
  - **Thẻ "Hôm nay" đầu trang Học**: nói hôm nay có gì (thẻ đến hạn ·
    bài dở kèm "bước 4/6" · bài mới · thi) + "≈ N phút" + MỘT nút. Nó
    THAY luôn banner nợ-ôn cũ — hai hộp cùng nói "vào ôn tập" là nhiễu.
    Bài dở thắng bài mới (Zeigarnik); mở bài ra xem rồi thoát ngay
    (bước 0) không tính là dở.
  - **A5 hóa ra đã làm 80%** (màn tổng kết bước 6 vốn có "học được gì" +
    XP + hé lộ bài sau). Làm nốt hai vế còn thiếu của ý: **tự giải được
    N/M bài** (bài phải mở lời giải không tính — cùng thước đo với drill)
    và **N thẻ mới vào Hộp ôn tập**.
  - **Luật sinh thẻ giờ viết MỘT LẦN**: `newCardIdsForLesson` ở
    reviewQueue — store gọi lúc tạo thẻ thật, màn tổng kết gọi để hứa
    trước. Kiểm browser xác nhận con số hứa khớp con số thật (hứa 1 thẻ
    → tạo đúng 1 thẻ `goi-tin`).
  - 1186/1186 test xanh (+9), typecheck sạch, build qua. Kiểm browser
    thật đủ 5 trạng thái của thẻ: người học mới (trỏ bài 1) · bài dở
    ("bước 4/6", ≈10 phút) · có 12 thẻ đến hạn (ôn đứng trước, vẫn nói
    ôn xong còn gì) · nợ 35 thẻ (chỉ mời ôn, KHÔNG mời bài mới, kèm lời
    nói thật) · màn tổng kết ("2/3 bài", "1 thẻ mới"). Mobile 375px
    không cuộn ngang (375/375), console sạch. Dữ liệu kiểm đã xóa.

- **Khối 21.2 XONG (08-10): ĐỌC LẠI CHÍNH MÌNH** — cụm A3 + H6 + A4 của
  kho ý tưởng: dữ liệu người học tự tạo ra suốt mấy tháng, giờ cho họ
  nhìn lại.
  - **Tiền đề của ý gốc SAI, đã sửa hướng**: kho ghi "dùng answerHistory
    đang có sẵn". Không dùng được — `AnswerRecord` chỉ có `{correct, at}`
    (không biết câu nào) và bị cắt còn 10 bản ghi cuối, nó là CỬA SỔ cho
    flow engine chứ không phải nhật ký. Nguồn thật hóa ra tốt hơn:
    `lessonRuntimes[].exercises[].failCount` biết đích danh TỪNG CÂU và
    giữ vĩnh viễn.
  - `src/engine/mistakeLog.ts` (thuần TS, 10 test): `weakSpots` (chỗ hay
    vấp, xếp vấp-nhiều-trước, hòa thì câu phải mở lời giải nặng hơn) và
    `weeklyActivity` (nếp học 8 tuần). Mốc tuần đếm từ một thứ Hai đã
    biết thay vì `Date.getDay()` — cả `dates.ts` cố ý tính bằng UTC.
  - **Trang Hồ sơ thêm hai mục**: "Chỗ bạn hay vấp" (5 câu thử lại nhiều
    nhất, kèm đường quay lại đúng bài — tựa bài đi vào aria-label để
    trình đọc màn hình không nghe năm dòng giống hệt nhau) và đồ thị
    "Nếp học 8 tuần gần đây" (kèm bảng sr-only, đúng nếp ProgressChart).
    Tuần nghỉ vẫn có vạch mảnh: khoảng trống mới là thứ baseline dạy đọc.
  - **Phiên ôn nói "thẻ này bạn từng quên N lần"** trước khi lật (đọc
    `lapses` của SM-2), chỉ ở lượt chấm đầu, không hé lộ nội dung.
  - Giọng giữ đúng luật 4.4: vấp là DỮ LIỆU, không phải lời chê — hổ
    phách chứ không đỏ, và câu dẫn nói thẳng "không phải để chấm điểm".
  - 1196/1196 test xanh (+10), typecheck sạch, build qua. Kiểm browser
    thật: chỗ vấp xếp đúng 3→2→1 kèm nhãn "có mở lời giải"; đồ thị gộp
    đúng tuần (28/07 · 04/08 · 10-12/08); phiên ôn hiện đúng câu "từng
    quên 3 lần"; mobile 375px không cuộn ngang; console sạch. Dữ liệu
    kiểm đã xóa.

- **Khối 21.3 XONG (08-10): VỀ ĐÚNG CHỖ** — chủ dự án báo lỗi thật: học
  xong một bài giữa Module 3 thì app đổ về đầu trang Học, phải cuộn lại
  mới học tiếp được. Soi ra không phải lỗi lẻ mà là MỘT bệnh có 5 cửa
  (xong bài · quay lại giữa bài · xong bài thi · xong phiên ôn · từ màn
  tốt nghiệp) — trang Học giờ dài 21 module (21.656px) nên cửa nào cũng
  đổ người ta xuống chân trang. Chủ dự án chọn làm **lớp 2** trong ba
  lớp đã trình: cửa nào biết mình đến từ đâu thì mang theo địa chỉ.
  - `backToLearn(moduleId)` → `/?tiep=…`, đường DUY NHẤT dựng link về;
    trang Học nhận cả id module lẫn id bài (nơi gọi khỏi tra ngược).
  - **Nhắm vào VIỆC KẾ TIẾP, không phải đầu card**: phát hiện khi kiểm
    browser thật — card Module 3 có 12 bài, cao hơn màn hình, nên cuộn
    tới đầu card thì bài kế VẪN nằm dưới mép dưới, tức là chưa chữa được
    gì. Giờ nhắm vào phần tử `data-next-action` (nút bài kế / cửa thi),
    cuộn nó vào GIỮA màn hình và dời focus vào đó — người dùng bàn phím
    chỉ còn cách một phím Enter. Module hết việc thì mới lấy cả card.
  - **Một bẫy trình duyệt đã ghi vào GHI-CHU**: `scrollIntoView` với
    `behavior:'smooth'` IM LẶNG không làm gì trên khung cuộn lồng nhau
    (`<main>`) trong Chromium — đo thật: `auto` nhảy đúng 1881px,
    `smooth` đứng yên ở 0. Đã chuyển sang cuộn tức thì, cũng hợp hơn cho
    quãng nhảy ~2000px.
  - Hai cửa KHÔNG có bối cảnh module (xong phiên ôn, màn tốt nghiệp) giữ
    nguyên về đầu trang — ở đó thẻ "Hôm nay" đã nói việc kế tiếp rồi.
  - 1205/1205 test xanh (+9, `returnToPlace.test.tsx` khóa cả 5 cửa +
    luật tabindex + neo đủ 21 module), typecheck sạch, build qua. Kiểm
    browser thật đúng ca chủ dự án gặp: học xong "Nhẩm ranh giới bằng
    magic number" (m3-bai-5) → về `/?tiep=module-3`, focus rơi đúng nút
    "Bắt đầu" của "Đọc biển số của tương lai", nằm giữa màn hình; nút
    "← Quay lại" trong bài và cửa bài thi cũng mang đúng địa chỉ; mobile
    375px không cuộn ngang; console sạch. Dữ liệu kiểm đã xóa.

- **Khối 21.4 XONG (08-10): ĐI THẲNG BÀI SAU** — lớp 1 của đề xuất ba
  lớp, làm nốt sau lớp 2. Vòng "xong bài → về trang Học → cuộn tìm →
  bấm" giờ biến mất hẳn ở luồng chính.
  - `nextAfterLesson(plan)` trong `todayPlan.ts` — hỏi cùng một bộ não
    với thẻ "Hôm nay" nhưng là CÂU HỎI KHÁC ("xong bài này rồi thì đi
    đâu"), nên tách hàm riêng. Khác đúng một chỗ có chủ đích: **còn thẻ
    đến hạn thì KHÔNG bẻ ngang sang ôn** — luật ôn-trước-học-sau là luật
    của lúc MỞ APP (cổng ở main.tsx lo), giữa phiên mà bẻ là phá đà.
    Ngoại lệ duy nhất là nợ VƯỢT TRẦN, vì lúc đó cửa bài mới khóa thật.
  - Màn tổng kết **giữ nguyên** (bullets + XP + hé lộ bài sau + hai con
    số của khối 21.1) — cửa đóng của bài vẫn còn, chỉ bỏ đoạn đường thừa
    phía sau. Nút chính đổi theo cảnh: "Học bài tiếp theo" / "Vào thi
    cuối module" / "Trả nợ ôn tập đã"; hết việc thì về lại một nút
    "Hoàn thành bài" như cũ. Luôn giữ nút phụ "Về trang Học".
  - 1215/1215 test xanh (+10: 6 test engine cho `nextAfterLesson`, 4
    test UI cho ba nhánh nút + lối lui), typecheck sạch, build qua. Kiểm
    browser thật đủ ba nhánh: xong m3-bai-5 → vào thẳng m3-bai-6 (vẫn
    ghi nhận xong bài + sinh thẻ); bài cuối module → "Vào thi cuối
    module"; nợ 31 thẻ → "Trả nợ ôn tập đã". Mobile 375px không cuộn
    ngang, console sạch. Dữ liệu kiểm đã xóa.
  - **Lớp 3 (nhớ chỗ cuộn cũ) coi như không cần nữa**: sau lớp 1 và 2
    thì không còn đường nào rơi vào cảnh "về rồi phải tự tìm chỗ".

- **Khối 21.5 XONG (08-10): CÀI ĐƯỢC NHƯ APP THẬT (PWA)** — ý F1 của
  kho. Giờ thêm được vào màn hình chính điện thoại và **mở được khi mất
  mạng** — đúng thứ các buổi test người thật cần (người test cài về máy
  họ thay vì phải nhớ URL).
  - **Icon tự vẽ, không thêm dependency**: `npm run icons` sinh 5 file
    PNG (192/512 + maskable + apple-touch) từ chính hình phong bì của
    favicon — rasterize bằng SDF + zlib có sẵn của Node. Kéo `sharp` về
    để chạy một lần rồi nằm đó là không đáng (cùng nếp earcon tự tổng
    hợp thay vì mang file âm).
  - **Manifest + service worker SINH LÚC BUILD** (`scripts/pwa-plugin.mjs`,
    cùng khuôn plugin preload font sẵn có): mọi đường dẫn phải theo BASE
    động vì GitHub Pages phục vụ dưới `/<tên-repo>/` — đã kiểm cả hai
    base, file tĩnh viết tay là link chết ngay lần deploy đầu.
  - **Ý gốc trong kho nói SAI một chỗ, đã sửa hướng**: kho ghi "app vốn
    đã offline được, chỉ thiếu tấm áo". Không phải — `AppGate` CHỜ
    `primeModules()` kéo đủ **cả 21 chunk nội dung**, nên bản đầu tôi
    làm (chỉ cache vỏ app) tắt server là **màn trắng**. Precache lại
    thành hai mức: vỏ bắt buộc (`addAll`) + phần còn lại cố-gắng
    (`allSettled`, ôm trọn 21 file nội dung).
  - **Một bẫy nữa chỉ lộ khi thử thật**: `caches.match` mặc định phải
    thoả `Vary`, mà máy chủ tĩnh hay gắn `Vary: Origin` — request của
    trang và request lúc SW tự cache khác header nên TRƯỢT hết, rồi rơi
    xuống `fetch` và chết vì mất mạng. Cache có đủ 85 file mà vẫn màn
    trắng. Vá bằng `{ ignoreVary: true }`.
  - Luật cache: HTML network-first (deploy mới thấy ngay), file có hash
    cache-first (bất biến), **KHÔNG `skipWaiting`** — tráo asset dưới
    chân phiên đang học là mời lỗi "không tải được chunk" giữa bài. SW
    chỉ đăng ký ở bản PROD.
  - 1226/1226 test xanh (+11), typecheck sạch, build qua. **Kiểm thật
    bằng cách TẮT HẲN server rồi tải lại**: app khởi động, mở được
    `/bai/m1-bai-1`, trang Học render đủ 21 module. Đã gỡ SW + xóa cache
    + xóa dữ liệu kiểm sau khi xong.
  - **ĐÃ DEPLOY (08-10)**: chủ dự án ra lệnh, đẩy 8 commit lên `main`,
    workflow xanh cả test/typecheck/build/deploy. Kiểm bản live
    https://thienphuc-2005.github.io/netmaster/ : manifest và sw.js mang
    đúng base `/netmaster/`, service worker đăng ký đúng scope và
    activate, cache 85 file gồm đủ 21 chunk nội dung, console sạch.

- **Khối 21.6 XONG (08-10): CỤM PHẦN THƯỞNG** — bốn ý D1 + D2 + H1 + H2
  của kho, làm một lượt vì chúng cùng trả lời một câu: người học nhận
  được gì khi làm đúng, khi đậu module, và khi về đích.
  - **D1 — khen đúng việc**: `src/engine/praise.ts` (thuần TS) đọc DẤU
    VẾT của câu vừa xong (vấp mấy lần, có phải mở lời giải không, câu
    dạng gì, đang ở bước nào) rồi chọn 1 trong **28 câu khen chia 9 ngữ
    cảnh HÀNH VI**. Thứ tự ưu tiên có chủ đích: đọc lời giải rồi tự gõ
    lại > sai rồi tự sửa > nếp tay chân từng nghề (lab/CLI/PS/cung
    điện/phòng khám) > nhớ lại khi bài đã đóng > đúng ngay. Khen nếp khó
    trước, vì "đúng ngay" nói về thứ người học VỐN ĐÃ BIẾT.
  - Xoay câu khen bằng HẠT GIỐNG bơm từ ngoài (`answerTotal` của store,
    số phòng đã đi của cung điện, số ca đã chữa) — engine giữ nguyên luật
    không random, không đồng hồ, nên test đọc được kết quả.
  - Ba bề mặt dùng chung một kho khen: bài học, cung điện, phòng khám.
    `FeedbackState` thêm `praise?` tùy chọn — chỗ nào không đọc ra được
    hành vi thì rơi về "Chuẩn luôn!" chứ không khen bừa.
  - **D2 — thư cuối module**: `letter` là trường NỘI DUNG trong data
    (`content/modules/*.json`), **21 lá thư riêng**, hiện ở màn ĐẬU bài
    thi. Lý do nó đáng có: bài thi cố ý KHÔNG cộng XP (nguyên tắc 5), nên
    trước lượt này người đậu chỉ nhận đúng một dòng chúc mừng. Giọng thư
    là người trực ca đêm để lại lời nhắn cho ca sáng, mỗi lá kể đúng việc
    module đó vừa cho họ làm được.
  - `content.test` khóa ba luật của thư: module thật nào cũng phải có,
    dài >= 220 ký tự và nằm trong khoảng 3-5 câu (chặn cả thư cụt lẫn thư
    dài thành bài giảng thứ hai), và **không lá nào trùng lá nào**.
    `content:review` in nguyên văn thư để người duyệt bắt được giọng sai.
  - **H2 — về đích sau X ngày**: `src/engine/journey.ts` suy từ
    `completedLessons`, không thêm một byte persist. In ra HAI con số chứ
    không một: tổng số ngày (tính cả hai đầu) và **số ngày THẬT SỰ ngồi
    học** — 75 ngày mà 5 ngày học là chuyện bình thường, nói ra để người
    học khỏi tự trách quãng nghỉ (giãn cách vốn là bạn của trí nhớ).
    Chưa xong bài nào thì im lặng, không in "0 ngày".
  - **H1 — giấy chứng nhận tải được**: PNG 1200×850 vẽ thẳng bằng canvas,
    không backend, không thêm thư viện. Tách hai tầng: `buildCertificate`
    thuần (soạn nội dung, test được) và `drawCertificate` (đặt bút vẽ).
    Hai quyết định về hình thức đã khai trong file: tờ giấy LUÔN nền sáng
    kể cả khi app đang theme tối (thứ này để gửi và để in), và tên người
    học là Ô NHẬP TẠI CHỖ **không lưu vào store** — thêm một trường
    persist cho một việc dùng một lần là không đáng.
  - 1257/1257 test xanh (+42), typecheck sạch, build qua, `content:review`
    render lại 21 module.
  - **Kiểm browser thật cả bốn**: (D1) cùng một câu, sai rồi tự sửa nhận
    "Không bỏ giữa chừng, cũng không xem đáp án…", câu sau đúng ngay nhận
    "Không vấp câu nào…" — hai lời khác nhau đúng như thiết kế; (D2) thi
    thật Module 1 đạt 100% → màn đậu hiện đủ lá thư; (H2) mốc trung cấp
    in "75" và dòng "từ 01/04/2026 tới 14/06/2026 — trong đó có 5 ngày
    bạn thật sự ngồi xuống học"; (H1) bấm tải ra đúng file
    `netmaster-trung-cap-2026-08-10.png`, 1200×850, 94KB — soi bằng pixel
    thì 14 dải chữ đều nằm trong khung (x 175-1023, y 96-783), không dải
    nào chồng nhau hay tràn viền. Mobile 375px không cuộn ngang, console
    sạch, dữ liệu kiểm đã xóa.

- **Khối 21.7 XONG (08-10): HỘP ÔN TẬP BIẾT NÓI** — cụm A1 + A2 của kho.
  Bốn ý trước lo lúc người học LÀM ĐÚNG và lúc VỀ ĐÍCH; lượt này lo bề
  mặt họ quay lại mỗi ngày mà mấy khối gần đây không đụng tới.
  - **A1 — độ tươi trí nhớ** (`src/engine/freshness.ts`, thuần TS): độ
    tươi = PHẦN QUÃNG NGHỈ CÒN LẠI tới hạn, tính trên chính khoảng cách
    SM-2 của thẻ. Khai thẳng trong file rằng đây KHÔNG phải đường quên
    Ebbinghaus — app không đo được trí nhớ thật của ai, nó chỉ nói được
    "so với lịch chính app đặt ra, thẻ này đã nguội bao nhiêu".
  - **Chỗ ĐẶT con số mới là quyết định sư phạm**: không hiện trong lúc
    ôn. "Trí nhớ còn 12%" đọc ngay trước khi lật là lời mời bỏ cuộc và
    bẻ gãy đúng động tác nhớ lại mà hộp ôn sinh ra để tạo. Nó sống ở
    trang Hồ sơ (bản đồ trí nhớ theo module, thanh mờ dần) và một dòng ở
    thẻ Hôm nay ("N thẻ đang mờ dần") — dòng đó CỐ Ý không kèm nút ôn:
    thẻ chưa tới hạn mà mời ôn sớm là phá chính giãn cách đang giữ nó.
  - **A2 — tự chấm độ chắc trước khi lật**: ba nút Mình chắc / Lơ mơ /
    Chịu CHÍNH LÀ nút lật thẻ, nên nhịp ôn 15 thẻ không dài thêm một cú
    bấm nào. `engine/calibration.ts` đối chiếu lời tự chấm với kết quả
    thật: thấy chắc mà không nhớ ra = ảo giác quen mặt (thứ đáng chỉ ra
    nhất), nói chịu mà vẫn nhớ ra = tự đánh giá thấp mình.
  - **"Lơ mơ" LUÔN tính là khớp** — người nói mình không chắc thì nhớ
    được hay không cũng không mâu thuẫn với chính lời họ; phạt họ ở đây
    là dạy người ta bớt thành thật. Có test khóa.
  - Chỉ nói khi LỆCH (khớp thì im — khen mỗi lượt đúng là nhiễu), chỉ
    hỏi ở lượt chấm ĐẦU (vòng học lại thì người học đã biết đáp án), và
    dòng tổng kết cuối phiên chỉ hiện từ 3 lượt trở lên.
  - **Không thêm một byte persist nào cho cả hai ý**: độ tươi suy từ
    SM-2 sẵn có, sổ tự chấm sống trong phiên rồi tan. Không XP, không
    đụng lịch SM-2 — có test khóa: cùng kết quả "nhớ được", chọn "Mình
    chắc" hay "Chịu" thì store y hệt nhau.
  - 1281/1281 test xanh (+24), typecheck sạch, build qua. Kiểm browser
    thật: chọn "Mình chắc" rồi "Chưa nhớ ra" → thẻ kế tiếp hiện đúng câu
    về ảo giác quen mặt; đi trọn phiên 3 thẻ ra dòng "Tự chấm khớp 2/3";
    vòng học lại quay về nút "Hiện đáp án"; trang Học hiện "1 thẻ đang mờ
    dần"; Hồ sơ vẽ bản đồ trí nhớ (Module 1 vừa ôn 100%, Module 2 còn
    53%). Mobile 375px không cuộn ngang, console sạch, dữ liệu kiểm đã
    xóa.

- **Khối 21.8 XONG (08-10): PHÂN TÍCH CHỖ HAY SAI** — chủ dự án đặt hàng.
  Trang Hồ sơ vốn đã liệt kê 5 câu vấp nhiều nhất (khối 21.2), nhưng danh
  sách đó chỉ trả lời "câu nào"; lượt này trả lời câu đắt hơn: **vấp theo
  KIỂU nào**.
  - `analyzeMistakes` trong `engine/mistakeLog.ts` cắt dữ liệu ba lát:
    theo DẠNG CÂU (kỹ năng nào yếu — gõ lệnh? nhớ bằng chữ? dựng mạng
    bằng tay?), theo MODULE (vùng kiến thức nào hổng), theo CHỦ ĐỀ
    (`hintTopic` — khái niệm cụ thể cứ quay lại cắn).
  - **Hai luật thống kê, vì nói sai còn tệ hơn không nói**: (a) chia theo
    TỈ LỆ chứ không đếm số thô — câu gõ tay nhiều gấp mười câu CLI nên
    đếm thô thì kết luận nào cũng là "bạn yếu câu gõ tay"; (b) nhóm dưới
    4 câu KHÔNG được đem ra phán, chỉ hiện số kèm chữ "còn ít". Vấp 1
    trên 1 câu CLI không phải "yếu CLI 100%".
  - Dòng kết luận chỉ nói khi có nhóm đủ mẫu; chưa đủ thì NÓI THẲNG là
    chưa đủ dữ liệu thay vì phán bừa cho có (có test khóa cả hai nhánh).
  - Chỉ đếm câu ĐÃ LÀM XONG — câu đang dở có failCount tạm thời, gộp vào
    là chấm điểm người ta giữa chừng một câu họ sắp giải được.
  - Giọng giữ luật 4.4: vấp là dữ liệu, không phải lời chê — thanh hổ
    phách, và câu kết luận nói rõ "không phải bạn kém dạng đó, chỉ là nó
    đang cần thêm lượt luyện".
  - `profile.kind.*` (8 tên dạng câu) vào `dynamicStrings.test` — thêm
    kind thứ 9 mà quên đặt tên là bảng in "cli"/"ps" trần vào mặt người học.
  - 1289/1289 test xanh (+8), typecheck sạch, build qua. Kiểm browser
    thật với hồ sơ 15 bài: kết luận trỏ đúng "Câu gõ tay — vấp ở 42% (26
    câu)", trong khi nhóm CLI 2/2 (100%) bị gạt khỏi lời phán vì chưa đủ
    mẫu — đúng luật thống kê; đổi sang hồ sơ 3 câu thì mục tự chuyển sang
    câu "chưa đủ để nói chắc". Mobile 375px không cuộn ngang, console
    sạch, dữ liệu kiểm đã xóa.

- **Khối 21.9 XONG (08-10): LUYỆN LẠI ĐÚNG CHỖ VẤP** — phần HÀNH ĐỘNG
  của mục phân tích vừa làm. Phân tích nói ra chỗ hổng rồi để đấy thì
  mới xong nửa việc: người học vẫn phải tự mò về từng bài để gặp lại câu
  đã vấp.
  - `weakSpotDrill` (mistakeLog.ts) soạn thẳng một phiên tối đa 10 câu từ
    chính những câu ĐÃ GIẢI XONG mà từng vấp. Route mới `/luyen-lai`,
    cửa vào là nút ngay trong mục phân tích ở trang Hồ sơ.
  - **Ba luật giữ nó không phá cơ chế học**: KHÔNG XP / KHÔNG streak /
    KHÔNG đụng lịch SM-2 (câu ở đây đã giải xong một lần rồi — cộng điểm
    cho lượt làm lại là mở đường farm bằng cách cố tình vấp); không mở
    khóa gì (chỉ lấy câu trong bài đã học xong); trộn XEN KẼ module.
  - **Thứ tự ba bước của engine là một quyết định, không phải tùy tiện**:
    xếp nặng trước → trộn xen kẽ → MỚI cắt trần. Làm ngược (cắt rồi trộn)
    thì mấy câu cùng mức vấp bị phân xử bằng id — mà id bắt đầu bằng
    "m1-", "m2-" — nên trần 10 câu bị một module ăn trọn và phiên thành
    luyện khối. Lỗi này lộ ra đúng lúc viết test, đã có test khóa.
  - Nhịp một câu: tự trả lời → chấm ngay → đáp án kèm vì sao → câu kế,
    và luôn có đường "Mở lại bài dạy phần này". Sai không bị phạt nhưng
    cũng KHÔNG lặng lẽ bỏ qua — vẫn là một lượt retrieval.
  - Màn này CỐ Ý không gọi một action ghi điểm nào của store; test khóa
    cả hai nhánh (đúng và sai) rằng xpTotal, reviewCards, streak và
    lessonRuntimes đứng nguyên.
  - 1300/1300 test xanh (+11), typecheck sạch, build qua. Kiểm browser
    thật với hồ sơ 12 bài: nút "Luyện lại 10 câu hay vấp" mở đúng phiên,
    đi trọn 10 câu ra màn tổng kết "đúng 2/10", XP đứng nguyên 500 suốt
    phiên. Mobile 375px không cuộn ngang, console sạch, dữ liệu kiểm đã
    xóa.

- **Khối 21.10 XONG (08-10): VÁ LỖI CHẤM SAI CÂU TRẢ LỜI ĐÚNG** — chủ
  dự án báo lỗi thật khi đang học: bài m4-bai-2 bước Nhớ lại, gõ "địa
  chỉ Mac của người gửi" — đúng y nguyên lời giải app in ra ngay bên
  dưới — mà bị chấm là chưa đúng.
  - **Bệnh 1 (nội dung)**: `containsPhrase` đòi cụm accept nằm LIỀN
    NHAU. Accept có "địa chỉ người gửi" nhưng người học nói RÕ HƠN
    ("địa chỉ MAC của người gửi") thì chữ "mac của" chen vào giữa và
    cụm không còn liền — trả lời chính xác hơn đáp án mẫu thì bị phạt.
  - **Bệnh 2 (bộ chấm)**: lá chắn phủ định tắt khớp-chứa khi câu có chữ
    "không/chưa/sai". Nhưng có câu mà ĐÁP ÁN ĐÚNG vốn là câu phủ định
    ("ai ra lệnh cho cổng dự phòng mở?" → "Không ai cả") — lá chắn
    đánh trượt chính đáp án của mình. Đã sửa: lá chắn xét theo TỪNG đáp
    án, chỉ tắt khớp-chứa với đáp án KHÔNG mang phủ định. "không phải
    stp" vẫn trượt accept "stp" như cũ (test khóa cả hai chiều).
  - **Quét cả bộ nội dung bằng một phép đo mới**: lời giải của app có qua
    nổi bộ chấm của app không. Ra 4 câu thật (m4-b2-ret-1, m15-b4-ret-1,
    m15-b5-ret-1, m5-b8-pra-2 "67 và 68") + m3-b6-ret-1 (ký hiệu ::).
    Đã nới accept cho từng câu; **phép đo đó giờ là test thường trực**
    trong `content.test.ts` — module mới mà soạn accept hẹp hơn lời giải
    của chính nó là đỏ ngay.
  - Đổi luôn accept[0] của m4-b2-ret-1 thành "Địa chỉ MAC của người
    gửi": dòng "Đáp án:" lấy phần tử đầu, mà trước đó nó in "địa chỉ
    nguồn" trong khi lời giải ngay dưới nói "Địa chỉ MAC của người GỬI"
    — hai câu khác nhau cho cùng một chỗ.
  - 1302/1302 test xanh (+2), typecheck sạch, build qua, content:review
    render lại 21 module. Kiểm browser thật ĐÚNG ca chủ dự án gặp: gõ
    "địa chỉ Mac của người gửi" → chấm ĐÚNG, khen retrieval, dòng Đáp án
    giờ khớp lời giải; và ca "Không ai cả" ở m15-bai-4 cũng đúng. Dữ
    liệu kiểm đã xóa.

- **Khối 21.11 XONG (08-10): NÚT "MÌNH NGHĨ CÂU NÀY ĐÚNG"** — chủ dự án
  chọn ý này ngay sau lượt vá lỗi chấm. Lý do nó đáng làm: lớp lỗi
  "accept hẹp hơn lời giải" (khối 21.10) chỉ lộ ra vì chủ dự án bực đủ
  để đi nhắn. Người học thật sẽ im lặng và tự nghĩ mình dốt.
  - Ở màn phản hồi khi bị chấm chưa đúng, câu GÕ TAY có thêm một dòng
    chữ nhỏ "Mình nghĩ câu này đúng". Bấm là app ghi lại NGUYÊN VĂN câu
    vừa gõ + id câu + ngày.
  - **Chỉ câu gõ tay mới có nút** — đó là dạng duy nhất mà một danh sách
    đáp án hẹp có thể đánh trượt người trả lời đúng; trắc nghiệm và xếp
    thứ tự thì đáp án là chính nó, còn lab/CLI/PS chấm bằng hiệu ứng.
  - **Nút KHÔNG mở câu, KHÔNG cộng gì, KHÔNG đổi kết quả chấm** — và lời
    xác nhận nói thẳng ra điều đó ("câu này vẫn chưa được tính là đúng"),
    nếu không nó thành cái nút bấm-là-qua. Test khóa: bấm xong runtime
    vẫn chưa solved, XP đứng nguyên.
  - Là chữ nhỏ gạch chân chứ không phải nút to: nó không được cạnh tranh
    với việc đáng làm hơn là thử lại.
  - **Trang Hồ sơ có mục "Câu bạn cho là mình đúng"** — hai vai: người
    học thấy lời mình không rơi vào hư không (kèm đường mở lại bài), và
    người soạn bài đọc được nguyên văn để soi accept. Trong buổi test
    người thật, đây là chỗ mở ra xem đầu tiên.
  - **Persist v4 → v5** kèm một bậc migrate thật + test: sổ góp ý mọc ra
    rỗng, mọi thứ cũ giữ nguyên. Trần 50 dòng, cũ rơi trước — hộp thư
    góp ý không được phình vô hạn rồi ăn chỗ của chính tiến độ học.
  - 1306/1306 test xanh (+4), typecheck sạch, build qua. Kiểm browser
    thật: gõ sai → nút hiện, bấm → localStorage ghi đúng một dòng
    ("cái phong bì ấy"), XP vẫn 0, câu vẫn chưa xong; Hồ sơ hiện đúng
    mục kèm đề bài và nguyên văn. **Kiểm cả migrate thật**: nạp hồ sơ
    v4 có 420 XP/streak 5/1 thẻ → lên v5, không mất gì. Mobile 375px
    không cuộn ngang, console sạch, dữ liệu kiểm đã xóa.

- **Khối 21.12 XONG (08-10): KHIẾU NẠI ĐƯỢC Ở CẢ ĐỀ THI + SỔ ĐI THEO
  FILE SAO LƯU** — hai ý nối tiếp khối 21.11, chủ dự án gọi làm luôn.
  - Nút "Mình nghĩ câu này đúng" tách thành component dùng chung
    (`components/DisputeButton.tsx`) và có mặt ở **màn kết quả bài thi**
    cho mọi câu gõ tay trả lời sai. Đây mới là chỗ một danh sách đáp án
    hẹp gây thiệt hại lớn nhất: nó ăn thẳng vào con số 85% của cổng
    mastery. Nút KHÔNG đổi điểm lượt thi (điểm chốt lúc nộp) — test khóa
    cả masteryScores lẫn passedModules đứng nguyên sau khi bấm.
  - Câu đề thi không thuộc bài học nào nên `lessonId` để TRỐNG; trang Hồ
    sơ hiểu chỗ trống đó là "câu đề thi cuối module" và không dựng link
    chết. Phần tra đề bài mở rộng để soi cả pool thi.
  - **File sao lưu vốn đã mang sổ góp ý** (nút xuất sao lưu trọn key
    `netmaster-progress`) — nhưng chuyện đó chưa có gì gác. Giờ có test:
    bấm Xuất ra file thì nội dung file phải chứa id câu + nguyên văn câu
    người học gõ. Mất chỗ này là buổi test người thật mất sạch góp ý mà
    không ai biết.
  - `KICH-BAN-TEST.md` mục 13 thêm phần **"Đọc sổ mình-nghĩ-tôi-đúng"**:
    cuối buổi mở Hồ sơ đọc cùng người tham gia, xin file JSON, và coi mỗi
    dòng là một nghi vấn accept-hẹp (issue NỘI DUNG, không bảo người học
    gõ khác đi). Không bấm lần nào cũng là dữ liệu — phải hỏi thẳng.
  - 1313/1313 test xanh (+7), typecheck sạch, build qua. Kiểm browser
    thật: thi Module 1 sai hết → 6 nút khiếu nại hiện đúng ở 6 câu gõ
    tay, bấm một cái thì store ghi `lessonId: ""` + nguyên văn, điểm thi
    vẫn 0 và chưa đậu module nào; Hồ sơ hiện đúng dòng kèm chữ "Câu này ở
    đề thi cuối module"; bấm Xuất ra file thì nội dung file có đủ id câu
    và câu đã gõ. Mobile 375px không cuộn ngang, console sạch, dữ liệu
    kiểm đã xóa.

- **Khối 21.13 XONG (08-10): MCP SERVER CHO APP** — chủ dự án đặt hàng
  "chấm bài thông minh hơn: tạo MCP cho app hay nối app với Claude".
  - **Quan ngại đã nêu một lần, rồi làm theo vế đầu**: nối app với Claude
    lúc CHẤM BÀI là không làm được trong kiến trúc này — app là static
    thuần trên Pages nên API key nhét vào bundle là công khai key; và gọi
    mạng lúc chấm thì mất offline (vừa làm PWA ở khối 21.5) lẫn tính TẤT
    ĐỊNH mà cổng 85% dựa vào. Chỗ đúng của mô hình ngôn ngữ ở đây là LÚC
    SOẠN BÀI, không phải lúc người học bấm Kiểm tra.
  - `tools/mcp/` — server MCP nói JSON-RPC qua stdio, **viết tay, không
    thêm một dependency nào** (nếp icon PWA + earcon). `lib.ts` là phần
    thuần test được, `server.mjs` chỉ lo giao thức. Node 24 chạy thẳng
    TS nên server import đúng `normalize.ts` mà app đang dùng — không có
    bản sao bộ chấm thứ hai để lệch nhau.
  - **5 tool**: `grade_answer` (chấm thử bằng CHÍNH hàm app dùng — chặn
    Claude khỏi việc đoán app sẽ chấm ra sao), `find_question`,
    `narrow_accepts` (câu có nguy cơ chấm oan), `review_disputes` (đọc
    sổ "mình nghĩ câu này đúng" từ file sao lưu của người học rồi chấm
    lại bằng bộ chấm hôm nay), `accept_patch_line`.
  - **Server CHỈ ĐỌC.** Không sửa nội dung, không sửa tiến độ, không gọi
    mạng — `accept_patch_line` chỉ dựng sẵn dòng JSON để người soạn bài
    tự dán. Một tool tự nới đáp án theo lời than của người học là con
    đường ngắn nhất tới chỗ câu nào cũng đúng.
  - **Nó kiếm cơm ngay lần chạy đầu**: `narrow_accepts` chỉ ra 3 câu mà
    cổng chặn trong app KHÔNG thấy (test nội dung chỉ soi câu trong bài,
    MCP soi cả pool đề thi). Soi tay thì cả 3 là BÁO ĐỘNG GIẢ — câu đề
    thi mang lời GIẢNG/ẩn dụ chứ không mang cụm đáp án. Đã siết phép đo
    (`solutionKind` phân biệt lời giải bài tập với lời giảng câu độc
    lập) và có test khóa đúng ca đó. Còn lại **89 câu gõ tay có dưới 3
    cách nói được chấp nhận** — đó là tồn kho nội dung thật, chờ duyệt.
  - `.mcp.json` ở gốc repo khai server cho Claude Code (phải mở lại phiên
    và duyệt server thì tool mới hiện).
  - 1330/1330 test xanh (+17: 15 test ruột + 2 test BẮT TAY THẬT bằng
    cách spawn server rồi nói JSON-RPC qua stdio), typecheck sạch (thêm
    `tools` vào tsconfig), build qua. Chạy thật cả 5 tool trên nội dung
    thật: ca chấm oan cũ ("địa chỉ Mac của người gửi") giờ báo đạt, còn
    một khiếu nại chép lại nguyên chữ trong đề thì vẫn báo chưa đạt —
    tool không đóng dấu bừa.

- **Khối 21.14 XONG (08-10): DỌN TỒN KHO ACCEPT-HẸP + CẢNH BÁO LÚC SOẠN**
  — chủ dự án giao dọn 89 câu MCP vừa chỉ ra, chạy lại tool sau mỗi lượt,
  và cho `content:review` kêu ngay lúc soạn bài.
  - **Thước đo phải sửa TRƯỚC khi dọn**, vì con số 89 đang nói dối theo
    hai hướng: (a) đếm số phần tử accept là đếm sai — bộ chấm vốn nhân
    nhượng dấu nên cặp "cổng access"/"cong access" chỉ là MỘT cách nói
    viết hai kiểu; (b) đáp án là KÝ HIỆU (192.168.1.64, cặp port 67/68)
    hay chỉ có MỘT CÁI TÊN (tên lệnh `ipconfig`, viết tắt BPDU, tên đầy
    đủ tiếng Anh của một viết tắt) thì không tồn tại "cách nói thứ ba" —
    ép soạn thêm chỉ đẻ ra rác.
  - Con số tụt theo từng lượt, có chạy lại tool sau mỗi lượt như yêu cầu:
    **89 → 70** (sửa thước) **→ 51** (M1-3) **→ 43** (M4-6) **→ 34**
    (M7-9) **→ 13** (phần còn lại) **→ 0** (siết nốt luật "cách nói bằng
    lời TIẾNG VIỆT").
  - **Nới đúng chỗ, không nới bừa**: cách nói thêm phải là câu trả lời
    ĐÚNG cho chính câu đó — bổ sung số nhiều tiếng Anh (packets, routers,
    protocols — bộ chấm so theo TỪ nên số nhiều vốn trượt), tên đầy đủ
    (address resolution protocol), và từ đồng nghĩa tiếng Việt (gói dữ
    liệu, thiết bị định tuyến, hệ thống tên miền, máy phục vụ).
  - **Một biến thể tôi thêm hớ rồi tự gỡ**: "chuyển mạch" trần cho câu
    hỏi TÊN THIẾT BỊ — nó nhận luôn "chuyển mạch gói", mà đó là một KỸ
    THUẬT chứ không phải cái switch. Đã bỏ, và kiểm ngược lại bằng
    `grade_answer`: "chuyển mạch gói", "đóng gói", "router", "offer"
    đều vẫn TRƯỢT đúng như phải thế.
  - `content:review` giờ in **CẢNH BÁO SOẠN BÀI** ngay dưới câu gõ tay
    nào chỉ nhận dưới 3 cách nói. Luật dùng CHUNG một nguồn với MCP
    (`tools/mcp/lib.ts`) — viết lại ở script là mở đường cho hai thước đo
    lệch nhau. Bộ nội dung hiện in ra 0 cảnh báo (vừa dọn xong), nên có
    `tests/contentReview.test.ts` dựng câu giả để chuông vẫn phải kêu.
  - 1339/1339 test xanh (+9), typecheck sạch, build qua, content:review
    render lại 21 module. Kiểm browser thật: gõ "gói dữ liệu" ở bài 1
    Module 1 → chấm ĐÚNG. Dữ liệu kiểm đã xóa.

- **Khối 21.15 XONG (08-10): QUÉT BẢO MẬT + VÁ CHỖ DUY NHẤT NÓ TÌM RA.**
  - Quét toàn repo ở revision `f7aa036`, mức medium: 12 vùng, 44 lượt
    nghiên cứu, 42 nghi vấn thô → 25 nghi vấn riêng, hội đồng 3 người
    chấm từng cái (75 lượt phiếu). **Giữ 2, cả hai LOW, và cả hai trỏ
    đúng MỘT dòng**: `scripts/launch-app.mjs:87`. Báo cáo ở
    `CLAUDE-SECURITY-20260810-141001/` (có .gitignore riêng).
  - **Bệnh**: đường dẫn request đi thẳng vào `decodeURIComponent` không
    lưới đỡ. `GET /%` làm nó ném `URIError` NGAY TRONG listener đồng bộ
    của `http` — không ai bắt, Node thoát, máy chủ chết. Bất kỳ trang web
    nào người học mở trong lúc app đang chạy đều bắn được request đó vào
    localhost. Đã **chứng minh hai chiều bằng máy chủ thật**: mã cũ ném
    URIError ra ngoài listener; mã mới trả 400 và vẫn phục vụ bình thường
    sau 4 request hỏng liên tiếp.
  - **Vá**: ruột bộ xử lý tách sang `scripts/staticHandler.mjs` (+ file
    khai kiểu `.d.mts` theo nếp `render-content-review`). Lý do tách là để
    TEST ĐƯỢC: `launch-app.mjs` chạy thẳng, nạp vào test là nó build và
    bung trình duyệt thật. Bịt cả ba đường ném: escape hỏng → 400;
    `statSync` TOCTOU → coi như không có file; `createReadStream` lỗi →
    có handler `'error'`. Thêm lưới cuối bọc cả thân handler.
  - **Cố ý KHÔNG thêm `process.on('uncaughtException')`** dù báo cáo có
    gợi ý: cái đó nuốt mọi lỗi lập trình khác và biến chúng thành im lặng.
    Bịt đúng ba chỗ có thể ném thì hơn một cái chăn trùm.
  - Đổi hành vi nhỏ, khai ra: chưa build mà gọi vào thì giờ trả **404**
    thay vì 200 với thân rỗng.
  - 1346/1346 test xanh (+7, `tests/staticHandler.test.ts`), typecheck
    sạch, build qua.

- **Khối 21.16 (08-10): ĐÃ DEPLOY + NÂNG ACTION.**
  - **Bản live giờ bằng `main`**: đẩy 9 commit (khối 21.6 → 21.15), workflow
    xanh cả build lẫn deploy. Kiểm bản live thật bằng hai dấu vết CHỈ có ở
    mã mới — gõ "gói dữ liệu" được chấm đúng (cách nói thêm ở khối 21.14)
    và lời khen ra "Ra liền, không cần gợi ý" (khen theo hành vi, khối
    21.6) — nên chắc chắn không phải cache cũ. Dữ liệu kiểm đã xóa.
  - **Nâng 4 action lên bản chạy Node 24** (GitHub đã hết hạn Node 20 và
    đang ép chạy tạm; tới lúc gỡ lớp tương thích là deploy đỏ): checkout
    v4→v7, setup-node v4→v7, upload-pages-artifact v3→v5, deploy-pages
    v4→v5.
  - **Đã soi phá vỡ trước khi nâng, không nâng mù**: checkout v7 chặn
    checkout fork PR cho `pull_request_target`/`workflow_run` (ta chỉ chạy
    trên `push`); setup-node v6 giới hạn tự-cache còn npm (ta khai thẳng
    `cache: npm`); upload-pages-artifact v5 vẫn giữ `path`; deploy-pages v5
    vẫn còn `reporting_interval` VÀ vẫn khóa cứng trần chờ 10 phút — nên
    mẹo 3 lượt thử trong workflow còn nguyên giá trị, đừng gỡ.
  - Chỉ có MỘT cách kiểm thật lần nâng này: đẩy lên và xem workflow chạy.
    Rủi ro có trần: test/typecheck/build vẫn gác trước bước deploy, nên
    action hỏng thì run đỏ và bản live giữ nguyên bản đang chạy.

Cập nhật: 2026-08-10. File này chỉ để nắm nhanh tình hình khi mở lại dự
án. Nguồn chân lý: `SPEC-APP-HOC-MANG.md` (M1-12) và
`SPEC-TRUNG-CAP.md` (M13-21); luật làm việc ở `CLAUDE.md`; **bất biến
kỹ thuật theo vùng ở `GHI-CHU-KY-THUAT.md` (sửa vùng nào đọc mục đó
trước)**; kho ý tưởng chờ duyệt ở `Y-TUONG.md`; nội dung bài đọc duyệt
ở `REVIEW-NOI-DUNG.md`; kế hoạch trung cấp ở `KE-HOACH-TRUNG-CAP.md`.

## MỞ PHIÊN MỚI THÌ ĐỌC ĐÂY TRƯỚC

**Phần dưới đây là LỊCH SỬ của spec v1 (Phase 1-3).** Trạng thái hiện
tại đọc ở đầu file; mục này giữ lại vì nó ghi các quyết định và bất biến
vẫn còn hiệu lực.

**Spec v1 đã đóng:** Phase 3 hạng mục (8), (9), (10) đều khép; hạng mục
(10) là hạng mục cuối cùng của spec mục 6. App có đủ **12 module** nhập
môn + tab Phòng khám + tab Ôn tập + drill subnetting.

**Sau khi hết phạm vi spec, dự án đã qua BA việc lớn ngoài spec (07-08
và 08-08):**

1. **Hội đồng đánh giá 14 ghế** (`DANH-GIA-HOI-DONG.md`) — 14 agent chấm
   độc lập + 12 phản biện chéo, điểm trung bình 7.6/10, 1 phát hiện P0
   (hình bắt tay TCP vẽ ngược chiều ACK) + 28 mục P1.
2. **Lượt sửa lớn theo biên bản** — 25/28 mục P0/P1 đã đóng, 876/876
   test xanh. Bốn quyết định người dùng đã duyệt trước khi code: (a) vá
   cổng mastery CẢ BA LỚP: xáo lựa chọn MCQ khi render + xáo thứ tự câu
   mỗi lượt thi + màn rớt CHỈ hiện ý cần ôn (đáp án đầy đủ chỉ khi đậu —
   có test khóa "màn rớt không rò đáp án"); (b) phiên ôn thêm RELEARNING:
   thẻ quên quay lại cuối phiên tới khi tự nhớ được, chỉ lượt chấm đầu
   ghi SM-2/XP (ReviewPage.test.tsx khóa); (c) PS bài hàng loạt đổi quy
   ước cột OU tự chế → cột **Path chứa DN chuẩn thật** (Import-Csv biết
   đọc nháy kép như CSV thật); (d) chốt thuật ngữ **"port"** cho TCP/UDP
   (quét M5-M12, "cổng" chỉ còn là cổng vật lý/ẩn dụ; accept-list giữ cả
   hai cách gõ).
   Kèm theo: migrate + fixture v1 + test rehydrate; xuất/nhập backup ở
   Hồ sơ; chặn 2 cửa sổ (BroadcastChannel); lưới đỡ runtime-lệch-content
   + AppErrorBoundary (--danger có consumer đầu tiên); kể chuyện streak
   freeze/reset (streakEvent + banner); animation ăn mừng màn Kết (CSS
   theo --dur, reduced-motion tự tắt); dòng giải-thích-ngày-2 + nút "Ôn
   phiên tiếp" ở ReviewPage; sửa copy huy hiệu hứa suông; sửa mô tả arp;
   hình DnsResolver/nắp gói tin/nhãn DORA/trục WellKnownDoors;
   bỏ opacity-60 card khóa; --part-accent sống (StageMap + chip bước,
   thêm 8 cặp tokens.test); FeedbackRegion live-region thường trực;
   history ↑/↓ terminal PS; lazy-route (Design/Drill/Clinic/Profile/
   ModuleTest) + lazy 3 bề mặt thực hành nặng trong QuestionInput (mở
   app không còn tải chunk phòng khám 537KB); PROD bỏ zod validate;
   clean-dist trước build; helper `lt()/maybeLt()` thay toàn bộ `.vi`
   trong UI (12 file — đường bật EN nội dung sau này).

**Việc kế tiếp đọc ở `KE-HOACH-TANG-DIEM.md`** — bảng điểm ước lượng
sau lượt sửa (7.6 → ~8.4) + lộ trình 4 đợt tăng điểm theo thứ tự đáng
làm. Còn treo như cũ: **các buổi test người thật**
(`KICH-BAN-TEST.md`) — cần người, không code được.

3. **Đợt "đề thi đáng tin" — nửa đầu (#5) XONG (08-08).** Rà trọn 38
   câu MCQ của 12 bài thi mastery, chỉ sửa JSON nội dung:
   - **Cue độ-dài đã tắt:** tỉ lệ "đáp án là lựa chọn dài nhất"
     **35/38 → 13/38** (34% — đúng mức ngẫu nhiên của đề 3 lựa chọn).
     Cách làm: distractor cụt lủn được viết dài ra thành lỗi hiểu nhầm
     đầy đủ, đáp án bị cắt phần diễn giải thừa (phần đó vốn đã nằm
     trong `explain`). Không câu nào còn đáp án vượt distractor dài
     nhất quá 10%.
   - **Distractor "đùa" viết lại thành lỗi hiểu nhầm THẬT:** "Cài bản
     Windows mới nhất" → "Máy được đặt vào cùng một workgroup với các
     máy khác" (nhầm workgroup với miền); "5 GHz — nhanh hơn là hơn" →
     "băng tần nhanh hơn thì đi xa hơn"; "Chỉ hoạt động với IPv6" →
     "Chỉ lọc được theo địa chỉ IP, không theo port"; "Tường lửa vành
     đai quá đắt" → "không lọc được lưu lượng mã hóa"; "Block
     Inheritance chặn được tất cả" → "…kể cả Enforced".
   - **Accept gõ tay vá 4 ca trượt oan** (bộ chấm tách token nên ký
     hiệu biến mất): `dấu |`, `65,535`/`65.535`, `gethelp`,
     `search base`, cộng `dấu ::`, `linklocal`, `doublenat`. Vá cả
     hai câu 65535 (bài học M5 + đề thi M5).
   - **Hai test mới khóa cả hai luật** trong `content.test.ts`: một đo
     cue độ-dài (từng câu ≤ 1.1× distractor dài nhất, toàn đề ≤ 45% câu
     có đáp án dài nhất), một chạy 19 cách gõ thật qua chính
     `typedAnswerMatches`. 878/878 test xanh, typecheck sạch, build qua,
     `content:review` render lại 12 module.
   - **Nửa sau (#6 — pool rút 8) đã làm 08-08, xem mục 5 bên dưới.**

4. **HỌC VƯỢT — "thi vượt" (08-08, việc NGOÀI spec, người dùng đặt
   hàng và đã duyệt 3 quyết định).** Nhu cầu thật: có vài module người
   dùng đã học ở nơi khác rồi.
   - **Va chạm đã nói thẳng trước khi code:** spec nguyên tắc 2 ghi
     "không có nút skip". Cách đọc đã chốt: spec cấm QUA module mà
     không chứng minh, không cấm con đường tới chỗ chứng minh. Nên thi
     vượt = **cùng đề mastery, cùng ngưỡng 85%, cùng chuỗi mở khóa**,
     chỉ bỏ điều kiện "phải học hết bài trong module trước đã".
   - **`masteryGate.ts` KHÔNG bị sửa một dòng nào** — module sắp vượt
     vốn đã `open`, nên việc này không chạm chuỗi mở khóa. Vượt đúng
     mắt xích đang mở; đậu thì module sau mở rồi mới vượt tiếp được.
   - Ba quyết định người dùng đã chốt: (a) thi vượt TỪNG module (không
     làm bài xếp lớp đầu khóa); (b) đậu là **sinh đủ thẻ SM-2** cho mọi
     khái niệm + phòng cung điện của module, hạn ngày mai; (c) **đúng
     một lượt** mỗi module, rớt thì học bình thường — vì đề còn cố
     định, nới luật này phải chờ làm xong #6.
   - Store: `challengeUsed` + `recordChallengeAttempt` (tiêu lượt ngay
     khi nộp, KHÔNG XP/streak) + selector thuần `canChallengeModule`;
     **persist bump v1 → v2 kèm case migrate + test** (đúng luật cửa
     migrate). UI: một dòng mời chữ nhỏ dưới danh sách bài ở trang Học
     (không tô accent — lối chính vẫn là học), `?vuot=1` trên
     `ModuleTestPage` với bộ chuỗi `test.challenge*` (vi+en).
   - **Chuỗi vượt:** nút **"Vượt tiếp \<module sau\>"** ngay trên màn
     đậu — bỏ quãng đi bộ về trang Học.
   - **Nút vượt ở MỌI module, kể cả module đang KHÓA (chủ dự án ra lệnh
     08-08 — thay luật cũ "chỉ vượt module đang mở").** Cảnh thật: đã
     học M1-M3 ở nơi khác, muốn vào thẳng Module 4. `canChallengeModule`
     giờ chỉ loại module ĐÃ ĐẬU; `recordChallengeAttempt` bỏ chốt chặn
     'locked' (chỉ còn chặn module không có trong lộ trình);
     `ModuleTestPage` cho cửa vượt đi qua màn "Module chưa mở". Đường
     thi THƯỜNG của module khóa vẫn khóa như cũ.
   - **Vẫn KHÔNG mở trắng các module bị nhảy qua:** đậu M4 chỉ đánh dấu
     M4. M1-M3 vẫn chưa đậu, muốn tính là xong thì vượt/học từng cái —
     không bịa điểm mastery cho thứ chưa đo một câu nào.
   - **BỎ giới hạn một lượt (chủ dự án ra lệnh 08-08, lượt sau — thay
     quyết định (c) ở trên).** Yêu cầu: MỌI chủ đề lớn phải luôn có nút
     học vượt; cửa dùng một lần rồi mất thì bằng không có cửa.
     `canChallengeModule` bỏ điều kiện `challengeUsed`; store bỏ chốt
     ném lỗi "đã dùng lượt"; `?vuot=1` không còn chết sau lần nộp đầu;
     màn RỚT lượt vượt giờ có nút "Thi lại ngay" **giữ nguyên chế độ
     vượt**. Sổ `challengeUsed` giữ lại làm nhật ký (persist vẫn v2,
     không phải migrate). Cổng 85% vẫn giữ giá nhờ ba lớp có sẵn: xáo
     thứ tự câu, xáo lựa chọn MCQ, màn rớt không in đáp án.
   - **Chỗ đứng của nút: NGAY CẠNH tên chủ đề lớn** (chủ dự án ra lệnh
     sửa lần hai — "nhìn không nổi bật"). Bản trước để một dòng chữ xám
     dưới đáy card, phải cuộn qua 5-8 hàng bài mới thấy → với người mới
     coi như không có. Giờ mỗi card có chip **"Học vượt"** viền accent +
     chữ accent ở góc phải tiêu đề (mobile 375px xuống dòng riêng), hover
     mới tô đặc; dòng mời chữ đầy đủ giữ nguyên ở cuối card để nói nó là
     gì. Ô accent ĐẶC vẫn dành riêng cho "Bắt đầu" của bài — lối chính
     vẫn là học. Chuỗi mới: `learn.challengeShort` (vi+en).
   - 901/901 test xanh (+23), typecheck sạch, build qua. Kiểm browser
     thật: đi trọn lượt vượt Module 1 đạt 100% → module-1 vào
     passedModules, **6 thẻ ôn sinh đủ hạn 2026-08-08, xpTotal 0,
     streak 0, completedLessons vẫn rỗng**; bấm "Vượt tiếp" nhảy đúng
     `/kiem-tra/module-2?vuot=1` với màn intro mới tinh; lời mời thi
     vượt tự dời sang Module 2 và biến mất khỏi Module 1; mobile 375px
     không tràn.

5. **Đợt "đề thi đáng tin" — nửa sau (#6) XONG (08-08).** Bài thi mastery
   không còn là ĐỀ CỐ ĐỊNH: `masteryTest` trong JSON giờ là **POOL 12 câu**
   của module, mỗi lượt thi **rút ra 8 câu** rồi xáo thứ tự.
   - Vì sao: đề cố định thì từ lượt thi lại thứ hai, 85% chỉ còn đo TRÍ
     NHỚ VỀ ĐỀ — người học vừa đọc ý cần ôn xong, gặp lại đúng 8 câu ấy.
     Xáo câu + xáo lựa chọn (đã có) không đổi được TẬP câu được hỏi.
   - `src/engine/masteryPool.ts` — thuần TS, rng bơm từ ngoài:
     `drawMasteryTest` (rút + xáo), `masteryDrawCount`, `isAnchorQuestion`.
     `MASTERY_DRAW_COUNT = 8` **cố định** để 7/8 đậu / 6/8 rớt giữ nguyên
     nghĩa của ngưỡng 85% giữa mọi module và mọi lượt (chuẩn hóa n).
   - **Câu TRỤ luôn có mặt trong mọi lượt**: lab (M4), palace-walk
     (M5/M9), clinic (M11), ps (M12). Rút trượt chúng là có ngày cổng
     mastery không đo tới kỹ năng chính của module; riêng M5 ba câu cung
     điện hợp lại mới phủ đủ 15 phòng. Chỗ còn lại mới bốc ngẫu nhiên.
   - **46 câu mới** (mỗi module lên đúng 12): bám concept của chính module,
     không lặp câu cũ, distractor là lỗi hiểu nhầm thật, đều có `hintTopic`
     nên màn RỚT trỏ được ý cần ôn thay vì câu chung chung. Nhân tiện tỉ lệ
     "đáp án là lựa chọn dài nhất" xuống **14/69 (20%)**.
   - Test khóa: `masteryPool.test.ts` (đúng 8 câu, không trùng, hai lượt ra
     hai đề, pool nhỏ hơn cỡ đề thì hỏi trọn, **mọi lượt đều chứa đủ câu
     trụ và phủ đủ phòng cung điện**) + `content.test.ts` (pool >= 12; câu
     trụ không được chiếm gần trọn đề). 908/908 test xanh, typecheck sạch,
     build qua, `content:review` render lại 12 module.
   - Kiểm browser thật: đi trọn lượt vượt Module 1 — màn intro nói "8 câu",
     đề đi từ Câu 1/8 tới 8/8 và có 3 trong số câu mới, đạt 100% →
     passedModules có module-1, **6 thẻ ôn hạn 2026-08-09, xpTotal 0,
     streak 0**, answerHistory ghi đúng 8 lượt; vào bài thi Module 2 hai
     lần liên tiếp ra hai đề khác nhau ngay từ câu đầu.

6. **Persist BÀI DỞ của phòng lab và terminal PS (#20) XONG (08-08)** —
   mục P1 CUỐI CÙNG của biên bản hội đồng, giờ biên bản sạch P0/P1.
   - Cảnh thật: lắp 8 thiết bị hoặc gõ 15 lệnh là mười lăm phút. Bấm
     nhầm Back, hết pin, đóng nhầm cửa sổ — bản cũ mất sạch. Đã chọn
     **persist thật**, không phải hộp xác nhận (hộp xác nhận chỉ đổi
     "mất trắng không báo" thành "mất trắng có báo").
   - Store: ngăn `practiceDrafts` khóa `lessonId::questionId`
     (`practiceDraftKey`), trần 12 bài dở (dọn cái cũ nhất),
     `savePracticeDraft` / `clearPracticeDraft`. **Persist v2 → v3 kèm
     case migrate + test** — migrate giờ là CHUỖI BẬC v(n)→v(n+1), thêm
     version mới chỉ việc nối thêm một bậc.
   - Lab: `restoreLab` (engine) mở lại từ sơ đồ dở nhưng vẫn giữ
     `initial` là đề bài, nên "Về sơ đồ ban đầu" không bị bẻ. **KHÔNG
     lưu lịch sử undo** — dấu chân của buổi ngồi, không phải thành quả.
     PS: lưu thế giới + NHẬT KÝ lệnh (thiếu nhật ký là mất phần lớn
     công sức); "Làm lại từ đầu" xóa luôn bài dở.
   - **Ranh giới quan trọng nhất: bài học lưu, BÀI THI KHÔNG.**
     `draftKey` chỉ được truyền từ `LessonPlayer`; `ModuleTestPage` cố ý
     không truyền — nạp lại sơ đồ lắp dở của đề thi là mở đường mang bài
     về nhà làm dần. `QuestionInput.draft.test.tsx` đứng gác chỗ đó.
   - Bài dở tự xóa khi câu đã xong (Đoán thử trả lời xong / bài tập giải
     đúng). Lưu bài dở KHÔNG cộng XP, không chạm streak, không ghi
     answerHistory (nguyên tắc 5 — có test khóa).
   - 925/925 test xanh (+17), typecheck sạch, build qua. Kiểm browser
     thật: sửa VLAN ở lab Đoán thử của `m4-bai-4` → F5 → vào lại đúng
     sơ đồ đã sửa, mục tiêu "(xong)"; nộp bài xong ngăn bài dở rỗng.
     Terminal M12: chạy `Get-NetIPAddress` → F5 → nhật ký và output còn
     nguyên; bấm "Làm lại từ đầu" → bài dở biến mất.

7. **Lượt dọn P2 (đợt ba) XONG (08-08)** — sáu nhóm nhỏ, sáu ghế cùng
   nhích. Sau lượt này biên bản hội đồng sạch P0/P1 và gần hết P2.
   - **Ngôn ngữ:** "subnet mask" thống nhất ở M6 (4 chỗ đang trôi thành
     "mặt nạ"); ẩn dụ DORA hết lệch giới; `...` → `…` ở M1-3 — **giữ
     ASCII trong ký hiệu IPv6 và mẫu lệnh PowerShell** vì người học có
     thể chép lại; accept "ben máy đích" viết lại thành biến thể không
     dấu cho đúng hàng.
   - **Kỹ thuật mạng:** `New-ADUser` mặc định **Enabled=False** như AD
     thật (tài khoản chưa có mật khẩu thì bị khóa) — engine đổi, có test
     khóa, deepDive + flashcard M12 giải thích; đề lab "mạng nhà" khai rõ
     phòng lab KHÔNG mô phỏng NAT (nhật ký chặng giữ IP riêng là cố ý);
     ping unreachable giờ có **prefix "Reply from &lt;ai ký tên&gt;:"** và
     đếm **Received=4, Lost=0 (0% loss)** như Windows thật — **bẫy "0%
     loss mà vẫn không thông" được giữ nguyên có chủ đích**, có test;
     phòng 21 kể lại thành quầy RA LỆNH, deepDive nói vì sao FTP vỡ khi
     có tường lửa (nối sang Module 7).
   - **Hình khái niệm:** `context-stroke` khai một chỗ ở `Frame` nên đầu
     mũi tên ăn màu của chính nét gọi nó (130 hình hưởng); glyph 587 vẽ
     lại thành THẺ TRÊN MẶT QUẦY (hết na ná sổ hộ khẩu 389 — luật "mỗi
     phòng một bóng dáng"); ổ khóa 443 render `var(--warn)` đúng chữ spec
     "ổ khóa VÀNG"; PalaceMap nền sáng /40 → /60.
   - **i18n:** `applyLang` cạnh `applyTheme` — bấm VI/EN là `<html lang>`
     đổi theo (WCAG 3.1.1); 4 chuỗi EN đếm được viết lại trung tính số
     ("1 cables connected" hết vỡ); test parity mới so bộ `{placeholder}`
     của từng key. **QUYẾT: nhãn SVG là VI-only, tuyên bố bằng comment**
     — hình đi kèm NỘI DUNG, mà nội dung Phase 1 chỉ có tiếng Việt; dịch
     nhãn là được cái hình nói tiếng Anh cạnh đoạn bài tiếng Việt.
     DesignPage cũng có một dòng tuyên bố ngoại lệ hardcode VI.
   - **A11y:** mũi tên dời thiết bị trên canvas lab đúng một ô lưới,
     dùng chung `snapToGrid` với chuột — sắp xếp mặt bàn hết là thao tác
     duy nhất chỉ có đường kéo-thả.
   - **Kiến trúc:** `AppGate`/`LearnIndexGate` tách khỏi `main.tsx` sang
     `src/app/gates.tsx` để test với tới được; `gates.test.tsx` chạy dưới
     StrictMode, 6 test phủ: onboarding đứng trước mọi thứ, luật ôn-trước,
     và cờ chống kẹt vòng "ôn xong bấm Học lại bị đá về Ôn tập".
   - 936/936 test xanh (+11), typecheck sạch, build qua. Kiểm browser
     thật: `<html lang>` lật vi↔en theo nút; marker `context-stroke` có
     mặt ở cả 130 hình; ổ khóa 443 đo được rgb(251,191,36) = --warn;
     PalaceMap nền sáng đo lại contrast **1.82 → 2.53**.

8. **Đợt bốn — phần LÀM ĐƯỢC NGAY đã xong (08-08); phần còn lại đang
   chờ chủ dự án quyết một câu hỏi kiến trúc.**
   - **Preload 2 font thân bài** (`vite.config.ts`, plugin
     `netmaster-preload-critical-fonts`): chữ tiếng Việt cần cả subset
     `latin` (ký tự) lẫn `vietnamese` (dấu) ở cân 400 mới đọc được một
     câu, nên preload đúng hai file đó. Tên file có hash nên phải sinh
     lúc build; **không tìm thấy file khớp là build CHẾT** — preload lặng
     lẽ biến mất là kiểu tối ưu "còn trên giấy". Có `crossorigin` để
     trình duyệt khỏi tải hai lần.
   - **Đo thật trên bản build** (`npm run preview`, cấu hình
     `netmaster-preview` trong `.claude/launch.json`): lần mở app đầu
     tải **483 KB / 18 request** — JS 340 KB (giải nén 1.2 MB), font
     123 KB, CSS 20 KB. Ước ở 3G thật (~50 KB/s): ~10 giây; slow-4G
     (~190 KB/s): ~2,5 giây.
   - **Preload có tác dụng đo được:** hai font thân bài bắt đầu tải ở
     **68 ms** (initiator `link`) thay vì 236-271 ms như các font còn lại
     (initiator `css`, phải chờ CSS về và parse xong mới lộ ra).
   - **Hai việc hiệu năng lớn còn lại DỪNG Ở KẾ HOẠCH** vì cùng vướng
     một câu hỏi: *có cho `loadModules()` thành async không?*
     (a) nội dung 12 module = **124 KB gz** tải ngay cả với người đang
     ở onboarding; (b) **zod nằm trong bundle đầu (~40 KB gz)** dù PROD
     không parse gì — vì mọi nơi import `contentSchema` để lấy type/hàm
     thuần, kéo theo cả file có schema. Cả hai chỉ gỡ được bằng một
     seam async, mà đó là việc L đụng ~10 nơi gọi + store + test →
     đúng luật CLAUDE.md: trình kế hoạch, chờ duyệt.

**Ba quyết định hạng mục (10) đã chốt (07-08, không hỏi lại):**
1. Phạm vi PowerShell ĐÓNG BĂNG: 8 cmdlet (Get-Help, Get-NetIPAddress,
   Test-NetConnection, Get-ADUser, New-ADUser, Import-Csv, Get-Content,
   Select-String) + pipeline MỘT tầng. KHÔNG scriptblock/biến/vòng lặp;
   lọc bằng tham số đơn giản (-Identity, -Filter *, -SearchBase).
2. "Tạo user hàng loạt" = MỘT dòng pipeline `Import-Csv | New-ADUser`
   chạy thật (đúng thần PowerShell); script đa dòng chỉ ở màn dạy dạng
   đọc-hiểu + điền-chỗ-trống, không thực thi.
3. Chấm theo HIỆU ỨNG + OUTPUT (như gradeLab/gradeClinic): goals nhìn
   thế giới (user mọc đúng OU) và dấu vết hành động (đã kiểm kết nối,
   đã lôi dòng log) — không so chuỗi lệnh.

| Khối | Nội dung | Trạng thái |
|------|----------|-----------|
| 10.1 | Engine `src/engine/ps/` (world + interpreter + gradePs + schema) | Xong |
| 10.2 | UI PsConsole + `kind: 'ps'` vào pipeline 6 bước + /design | Xong |
| 10.3 | Nội dung `module-12.json` + hình khái niệm | Xong |
| 10.4 | DoD + kiểm browser + tài liệu (khép hạng mục 10 và Phase 3) | Xong |

**Khối 10.1 đã làm gì** (headless — app chưa đổi một pixel):
- `src/engine/ps/world.ts` — thế giới giả 4 mảnh: máy đang ngồi (card
  mạng cho Get-NetIPAddress), đích mạng (pingable + cổng mở cho
  Test-NetConnection, có tên phân giải được), miền AD nhỏ (OU + user),
  file phẳng (CSV nhân sự + log). `validatePsWorld` tách lỗi CẤU TRÚC
  (trùng sam, OU ma) — cùng nếp lab/clinic. `PsFlags` ghi DẤU VẾT hành
  động (đã kiểm kết nối, đã lôi dòng log) — nguyên liệu chấm cho việc
  không đổi thế giới.
- `src/engine/ps/interpret.ts` — thông dịch 8 cmdlet + pipeline một
  tầng, tokenizer nháy kép/đơn, hoa thường tùy ý; output tiếng Anh nghề
  tất định (PingSucceeded/TcpTestSucceeded, DistinguishedName, lỗi
  "already exists"/"Cannot find path"); New-ADUser IM LẶNG như thật —
  muốn thấy phải Get-ADUser lại (thêm một nhịp retrieval); Get-Help
  trần + lệnh lạ trả outcome rỗng lines cho UI kể lời Việt (nếp của
  terminal Phòng khám); quá một dấu ống là lỗi có chủ đích.
- `gradePs.ts` — 4 loại goal: ad-user, ad-user-count (hàng loạt),
  tested-connection (phải THÀNH CÔNG đúng cổng), found-line. Đã khóa
  bằng test: gõ tay từng user thay vì pipeline VẪN được công nhận
  (chấm hiệu ứng, IKEA effect).
- `psSchema.ts` — chốt chặn nội dung: thế giới sạch, lời giải chạy
  sạch từng dòng VÀ đạt trọn goals, đề chưa đạt sẵn.
- `tests/fixtures/psFixture.ts` — 4 đề thật đúng 4 mảng spec: kiểm cổng
  443, tạo một user, tạo hàng loạt từ CSV, đọc log tìm ERROR.
  835/835 test xanh (+25), typecheck sạch, build qua.

**Khối 10.2 đã làm gì** (bài terminal thành thứ chơi được thật):
- `kind: 'ps'` thành nhánh thứ BẢY của `QuestionSchema`; `QuestionResponse`
  thêm `{kind:'ps', state}` — nộp TRẠNG THÁI PHIÊN (thế giới đã biến đổi
  + dấu vết hành động), `gradeQuestion` ủy quyền `isPsSolved`.
  `lessonMachine.ts` vẫn KHÔNG sửa dòng nào — `psInPipeline.test.ts`
  khóa (thang 3 tầng, cổng qua bước, XP y hệt câu gõ tay; lần khóa thứ
  TƯ của bất biến này: lab → palace → clinic → ps).
- `src/features/ps/PsConsole.tsx` — bàn PowerShell: bảng MỤC TIÊU CHẤM
  SỐNG theo từng lệnh (thấy ngay lệnh vừa gõ đẩy bài tới đâu), terminal
  `PS C:\>` với output máy tiếng Anh nguyên văn (lỗi tô hổ phách),
  Get-Help trần + cmdlet lạ nói tiếng Việt (i18n `ps.*` vi+en), nút
  "Làm lại từ đầu" (PS không có undo — trả nguyên thế giới), "Nộp bài"
  mới tính lượt. New-ADUser im lặng như thật → UI nói nhỏ một dòng
  chrome và xúi đi `Get-ADUser` kiểm chứng (thêm một nhịp retrieval).
- `canonicalAnswer` của câu ps = lệnh mẫu (tầng cuối của thang mờ dần);
  `render-content-review.mjs` tả được đề ps (thế giới, mục tiêu, lệnh
  mẫu); `/design` thêm mục Terminal PowerShell dùng đề "hàng loạt" của
  fixture qua `QuestionSchema.parse`; `moduleFixture` thêm `psPractice`.
- 851/851 test xanh (+16: pipeline, UI PsConsole, gradeQuestion ps),
  typecheck sạch, build qua. Kiểm browser thật trên /design: Import-Csv
  in bảng 3 người, pipeline `| New-ADUser` chạy im lặng kèm lời nhắc
  kiểm chứng, HAI mục tiêu lật ✓ sống trước khi nộp, nộp ra "đạt";
  mobile 375px scrollWidth = 375 không tràn.

**Khối 10.3 đã làm gì** (Module 12 thành module thật, chơi được):
- `content/modules/module-12.json` — 5 bài, 8 khái niệm, 10 đề terminal.
  Chuỗi bài bám đúng 4 mảng spec liệt kê: cmdlet mạng (bài 1-2) → tra và
  ghi sổ AD (bài 3) → tạo hàng loạt bằng một dòng pipeline (bài 4) → đọc
  log (bài 5). **Generation effect tối đa**: MỌI bài đều có ít nhất một
  câu gõ lệnh vào terminal ảo (content.test khóa); bài 3 và bài 5 đặt
  luôn câu ps ở bước Nhớ lại — gõ lại lệnh từ trí nhớ, không nhìn bài.
- **Gợi ý mờ dần đo được ở hai tầng**: trong một câu là thang 3 tầng sẵn
  có (hintTopic → cú pháp khuyết → lệnh mẫu), dọc module là chuỗi
  fadingLevel 0 → 1 → 1 → 2 → 2 (content.test khóa: không được lùi, bài
  cuối phải mức 2).
- Bài 1 mở màn bằng câu ps ở bước **Đoán thử** — người học mò terminal
  trước khi biết quy tắc Động từ-Danh từ (cùng chiêu productive failure
  của M4/M11). Bài thi 8 câu, **kết bằng hai câu ps** (tạo hàng loạt +
  đọc log DHCP hết dải cho thuê — bệnh của Module 6 quay lại).
- 8 hình khái niệm mới trong `ConceptVisual` (+5 alias hook):
  CmdletVerbNoun, NetCmdlets, NamedParams, HelpManual, AdDirectoryQuery,
  NewUserDn, PipelineFlow, LogFilter. Đã soi bằng `getBBox` trên browser
  thật: không hình nào tràn khỏi viewBox 220×130.
- **Hai lỗi nội dung tự bắt được khi kiểm browser** (ghi lại để không
  tái phạm): (1) app KHÔNG render markdown — dấu backtick trong JSON
  hiện thành ký tự thật, đã bỏ sạch 108 dấu; nội dung M1-M11 vốn không
  dùng backtick nào. (2) đoạn script đọc-hiểu nhiều dòng ở deepDive bài
  4 bị ép thành một dòng — đã thêm `whitespace-pre-wrap` cho ô deepDive
  của LessonPlayer (M1-M11 không có chuỗi nào chứa xuống dòng hay hai
  khoảng trắng liền, đã quét kiểm, nên cách hiển thị của chúng không đổi).
- 855/855 test xanh (+4 test nội dung M12), typecheck sạch, build qua.
  Kiểm browser thật: bài 1 pretest gõ `Test-NetConnection ... -Port 445`
  ra TcpTestSucceeded True, mục tiêu lật ✓ sống, nộp ra "đoán đúng luôn";
  bài 4 `Import-Csv nhan-vien-moi.csv | New-ADUser` tạo 4 user, cả hai
  mục tiêu ✓, terminal im lặng kèm lời xúi Get-ADUser kiểm chứng.

**Khối 10.4 đã làm gì** (khép hạng mục 10 + khép Phase 3):
- **Đối chiếu Definition of Done (spec mục 6) trên browser thật**, đi
  trọn bài `m12-bai-1` từ Khởi động tới Tổng kết:
  - *Mọi bài đi đủ 6 bước*: ĐẠT — thanh chặng chạy đủ 6 mục, bước Nhớ
    lại đóng hết nội dung phía trên, bước Kết ra 3 gạch + hé lộ bài sau
    + 30 XP.
  - *Flashcard tự sinh, ôn đúng lịch SM-2*: ĐẠT — học xong bài 1 sinh
    đúng 2 thẻ (`m12-cmdlet`, `m12-cmdlet-mang`, hạn 2026-08-08), đúng
    hai khái niệm bài đó dạy, không dư không thiếu.
  - *Không màn hình nào quá 1 khái niệm mới*: ĐẠT — bước Dạy đánh số
    "Màn 1/2", "Màn 2/2"; schema đã ép sẵn ở tầng dữ liệu.
  - *Test người thật*: TREO (cần người) — kịch bản đã soạn xong.
- **Thang 3 tầng trên câu terminal**: kiểm tay từng tầng — nộp lần 1 ra
  lời tầng 1 lấy từ hintTopic, lần 2 ra `hint` (cú pháp khuyết), lần 3
  ra `solution` (lệnh mẫu) kèm câu "tự gõ lại đáp án nhé". Không đâu
  hiện chữ "SAI" trần trụi (nguyên tắc 4 + spec 4.4).
- **Đi trọn bài thi Module 12** (8 câu, có 2 câu ps): đạt 100%, câu ps
  trong đề thi chấm sống y như trong bài học.
- **LỖI THẬT BẮT ĐƯỢC Ở BƯỚC NÀY:** đậu module CUỐI mà app vẫn báo
  *"module tiếp theo đã mở!"* — hứa một module không tồn tại, đúng vào
  khoảnh khắc peak-end của cả khóa. Đã vá: `ModuleTestPage` suy
  `isFinalModule` TỪ DỮ LIỆU (`loadModules().at(-1)`), ba chuỗi đổi theo
  (`test.introFinal`, `test.passTitleFinal`, `test.failBodyFinal`, đủ
  vi+en). Khóa bằng `ModuleTestPage.test.tsx` — thêm module mới thì
  "module cuối" tự dời, không phải sửa test.
- **Mobile 375px**: document không cuộn ngang (scrollWidth = 375); output
  terminal cuộn ngang TRONG khung `<pre>` của chính nó (clientWidth 318 /
  scrollWidth 439) — đúng luật layout của dự án.
- `KICH-BAN-TEST.md` **mục 11** — buổi test người thật Module 12: đo
  generation effect bằng ba bài (tự gõ lệnh từ terminal trống, phản xạ
  `Get-Help` thay vì hỏi người, "300 dòng thì làm sao"), kèm câu khép
  khóa hỏi người học tự xử lý được việc gì ở chỗ làm.
- 857/857 test xanh (+2), typecheck sạch, build qua.

**Ba quyết định hạng mục (9) đã chốt (06-08, không hỏi lại):**
1. Kiến trúc: engine clinic BỌC lab engine (case = topology lab + "hồ
   sơ bệnh" overlay) — KHÔNG mở phạm vi mô phỏng lab đã đóng băng.
2. Tab Phòng khám mở khóa khi Module 11 mở (đậu Module 10) — phòng
   luyện song song, làm lại case tự do.
3. Wireshark cơ bản = lệnh `capture`: bảng bắt gói suy từ chuỗi chặng
   simulatePing của lượt ping gần nhất.

**Việc treo (cần người, không code được):** các buổi test người thật
theo `KICH-BAN-TEST.md` (mục 1-6 Phase 1; mục 7 M4; mục 8 M5; mục 9
Phần C; mục 10 M11; mục 11 M12 — mục 12 là hướng dẫn xử lý sau buổi).

**Luật deploy (người dùng đã dặn 06-08):** KHÔNG ngồi canh deploy. Push
xong là làm việc tiếp; GitHub trục trặc thì lần push sau tự kéo mọi thứ
lên. Chỉ nhắc tới deploy khi nó thật sự chặn việc.

**Việc đang treo (không chặn code):**

1. **Deploy GitHub Pages đang nghẽn phía GitHub** (tối 06-08): mọi
   deployment nằm im ở `deployment_queued` hàng giờ, dù build luôn xanh.
   ĐÃ chẩn đoán xong và vá xong phía mình: `deploy-pages@v4` khóa cứng
   trần chờ 10 phút/lượt, nên workflow giờ tự thử 3 lượt × 10 phút
   (commit `a79338d`). Bản live vẫn lành, đang phục vụ đủ Module 1-7 +
   flow engine; các commit chưa lên chỉ là refactor headless. **Phiên
   mới không cần làm gì** — lần push kế tiếp tự kéo mọi thứ lên khi
   GitHub hồi; nếu muốn đẩy sớm thì `gh run rerun <run-id> --failed`.
   Nếu gặp lỗi 400 "cancel ... first": hủy deployment kẹt bằng
   `gh api -X POST repos/ThienPhuc-2005/netmaster/pages/deployments/<sha>/cancel`.
2. **Buổi test người thật** (`KICH-BAN-TEST.md`) — cần người, không code
   được.

## Phase 3 — hạng mục (9): Phòng khám mạng (Module 11)

Kế hoạch 5 khối đã duyệt. Bệnh nhân là dạng câu hỏi thứ SÁU
(`kind: 'clinic'`); "không lý thuyết trước" giữ bằng chiêu Module 4:
bệnh nhân đầu của mỗi bài đặt ở bước Đoán thử. Chấm hai phần: chẩn đoán
(chọn bệnh) + sửa (thao tác thật trên sơ đồ, chấm bằng gradeLab; ca
ngoài mô hình thì chọn hành động). "Gửi thử" miễn phí / "Nộp" tính lượt.

| Khối | Nội dung | Trạng thái |
|------|----------|-----------|
| 9.1 | Engine phòng khám thuần TS (`src/engine/clinic/`) | Xong |
| 9.2 | UI terminal + khung bệnh nhân + cắm `kind: 'clinic'` vào pipeline + /design | Xong |
| 9.3 | Nội dung `module-11.json` (case dễ→khó theo spec) + hình khái niệm | Xong |
| 9.4 | Mở khóa tab Phòng khám (danh sách case, làm lại tự do, XP lần đầu) | Xong |
| 9.5 | DoD + kiểm browser + tài liệu | Xong |

**Khối 9.1 đã làm gì** (headless — app chưa đổi một pixel):
- `src/engine/clinic/patient.ts` — ca bệnh = `topology` (dùng NGUYÊN mô
  hình lab, không sửa lab một dòng) + `overlay` "hồ sơ bệnh" (bảng DNS
  + cờ DNS chết, luật chặn ICMP trên máy theo chiều in/out kèm nguồn
  gpo/firewall, bảng netstat, danh sách GPO cho gpresult) + `seatId`
  (máy người học ngồi). `validatePatient` tách lỗi CẤU TRÚC (soạn sai)
  khỏi lỗi CẤU HÌNH (bệnh cố ý — chính là bài học); luật chặn nguồn GPO
  bắt buộc có mặt trong gpresult của máy đó (manh mối phải lôi ra được).
- `src/engine/clinic/terminal.ts` — 8 lệnh thật: ipconfig, ping,
  tracert, nslookup, netstat, arp, capture (Wireshark cơ bản), gpresult.
  Output SUY TỪ MÔ PHỎNG (ping/tracert ủy quyền simulatePing; capture
  đọc chuỗi chặng; arp đọc ARP cache học được), tiếng Anh nghề tất định
  — microcopy tiếng Việt thuộc tầng UI (help/unknown trả outcome rỗng
  lines để UI tự lo). Ca trùng IP: chủ IP LUÂN PHIÊN theo số lượt ping
  (tất định) — ping hai lần thấy MAC đổi trong `arp`, đúng cách bắt
  bệnh ngoài đời. Ca GPO chặn outbound: General failure tại chỗ, netstat
  vẫn ESTABLISHED — cái bẫy "mạng sống mà ping chết".
- `src/engine/clinic/gradeClinic.ts` — `checkSymptom` (3 kiểu triệu
  chứng: ping-fails, resolve-fails, ping-flaps) chạy qua ĐÚNG terminal
  để overlay được tính; `gradeClinicFix` chấm BA LỚP: goals gradeLab
  xanh + `mustClearDiagnoses` sạch (chặn "sửa giả" ca trùng IP) + triệu
  chứng gốc hết tái hiện.
- `src/engine/clinic/clinicSchema.ts` — zod + chốt chặn nội dung noi
  gương labSchema: bệnh nhân phải ỐM THẬT ở trạng thái đầu, lời giải
  phải chữa được ca của chính nó, trạng thái đầu không được đạt sẵn,
  mustClearDiagnoses không được khai khống, lời giải chỉ dùng thao tác
  đề cho phép.
- `tests/fixtures/clinicFixture.ts` — 5 ca THẬT đúng thang spec: rút
  dây, sai gateway, DNS chết, trùng IP, GPO chặn nhầm. 766/766 test
  xanh (+22), typecheck sạch, build qua.

**Khối 9.2 đã làm gì** (ca bệnh thành thứ chơi được thật):
- `kind: 'clinic'` thành nhánh thứ SÁU của `QuestionSchema`: `prompt` là
  lời than bệnh nhân, `spec` là ca bệnh (ClinicCaseSpecSchema), phần
  hiển thị chia hai — `diagnosis` {choices, answerIndex} và `actions`
  (BẮT BUỘC với ca choose-action, CẤM với ca edit-network; cross-check
  cấp module ép cả biên answerIndex). `gradeQuestion` chấm **HAI PHẦN
  trong MỘT lượt nộp: đúng bệnh VÀ sửa khỏi** — sửa đúng mà gọi sai tên
  bệnh vẫn chưa xong; phần sửa đi qua đủ ba lớp `gradeClinicFix`, không
  phải gradeLab trần. `lessonMachine.ts` KHÔNG bị sửa dòng nào —
  `clinicInPipeline.test.ts` khóa lời hứa (thang 3 tầng, cổng qua bước,
  XP y hệt câu gõ tay).
- `src/features/clinic/ClinicRoom.tsx` + `ClinicTerminal.tsx` — khung
  bệnh nhân ba nhịp đúng trình tự sư phạm: (1) **khám mù** — chỉ lời
  than + terminal 8 lệnh, không sơ đồ (ngoài đời không ai được nhìn sơ
  đồ chuẩn của mạng đang hỏng); (2) **chốt chẩn đoán** mới mở pha sửa,
  sau đó đổi chẩn đoán bằng chip tại chỗ, không unmount phòng lab;
  (3) **sửa** — ca edit-network nhúng NGUYÊN NetworkLab (thêm 2 prop
  tùy chọn: `hideDiagnosis` để máy khỏi mách bệnh, `onTopologyChange`
  để terminal + nút "Chạy lại triệu chứng" soi sơ đồ SỐNG — ping trong
  terminal thấy ngay mối sửa vừa làm, ARP cache cũ giữ nguyên như đời
  thật); ca choose-action chọn hành động. Khám và chạy lại triệu chứng
  MIỄN PHÍ, chỉ "Nộp bài" tính lượt.
- Ranh giới chuỗi giữ nguyên nếp: output thiết bị tiếng Anh render
  nguyên văn trong `<pre>`; microcopy tiếng Việt (help từng lệnh, lệnh
  lạ, capture trống, nhãn hai pha, triệu chứng còn/hết) vào
  `clinic.*` của vi.json + en.json (parity test phủ).
- `render-content-review.mjs` tả được ca bệnh (mạng bệnh nhân, hồ sơ
  bệnh, triệu chứng, hai phần đáp án đánh dấu ✓); `/design` thêm mục
  Phòng khám dùng ca sai-gateway của clinicFixture đi qua
  `QuestionSchema.parse`. `moduleFixture` thêm cờ `clinicPractice`.
- 799/799 test xanh (+33: pipeline, UI ClinicRoom, gradeQuestion clinic,
  cross-check schema), typecheck sạch, build qua. Kiểm browser thật trên
  /design: khám mù bằng ipconfig/ping (lộ gateway 192.168.10.99, ping
  unreachable), chốt chẩn đoán, sửa gateway về 192.168.10.1 trên sơ đồ,
  ping lại trong terminal ra Reply TTL=127, "Chạy lại triệu chứng" báo
  hết, nộp bài chấm "đạt"; mobile 375px scrollWidth = 375 không tràn.

**Khối 9.3 đã làm gì** (nội dung thật của Module 11 — bài tổng ôn trá hình):
- `content/modules/module-11.json` — 5 chặng × 1 bài, 6 khái niệm
  (phương pháp + đồ nghề: khám theo tầng, ipconfig/ping, tracert,
  nslookup, arp, gpresult/netstat), **11 ca bệnh** đúng thang dễ→khó
  của spec: rút dây (2 biến thể: dây MÌNH — General failure vs dây
  ĐÍCH — unreachable), sai/thiếu gateway, DNS chết vs THIẾU BẢN GHI
  (đọc kỹ timeout ≠ Non-existent domain), trùng IP (mustClearDiagnoses
  chặn sửa giả), GPO chặn outbound + tường lửa chặn inbound (cặp chiều
  đi/vào). **100% productive failure đúng chữ spec:** bệnh nhân đầu của
  MỖI bài nằm ở bước Đoán thử — content.test khóa luật này.
- Bài thi 8 câu **kết bằng 2 ca bệnh** — interleaving thật: ca sửa VLAN
  (kiến thức Module 4 quay lại trong vai bệnh, có goal "phải chặn" giữ
  bức tường phòng ban) và ca DNS chết chốt sổ; câu TTL=126 → 2 router
  (M4), câu gpresult (M9). content.test khóa: phủ đủ thang bệnh spec,
  cả hai kiểu sửa, bài thi kết bằng clinic + có ca setVlan.
- **Vá terminal cho đúng đời thật:** `src-no-link` (dây máy mình rơi)
  giờ báo "PING: transmit failed. General failure." như Windows thật —
  trước đây ra timeout thì không thể phân biệt "dây mình" với "dây
  đích" qua terminal, tức bài 1 không có manh mối để dạy. Đây là sửa
  fidelity output của khối 9.1, có test khóa.
- 6 hình ConceptVisual mới (+5 alias hook): thang 4 bậc bottom-up, giấy
  tờ + bắt mạch, tracert từng trạm, tách tên/số, ARP đổi chủ, khiên
  chặn tại máy. Đo getBBox trên /design: 5 hình tràn chú thích lúc đầu
  → rút gọn, giờ 0 tràn.
- 802/802 test xanh (+3), typecheck sạch, build qua, content:review
  render 11 module. Kiểm browser thật: đi bài m11-bai-1 — ca rút dây ở
  Đoán thử: ping ra General failure trong terminal, chốt chẩn đoán, nối
  dây bằng đường bấm chọn, ping lại Reply, "Chạy lại triệu chứng" báo
  hết, nộp → "Bạn đoán đúng luôn!" + explain; qua bước Dạy hiện 2 màn
  hình mới đúng nội dung.

**Khối 9.4 đã làm gì** (tab Phòng khám thành phòng luyện thật):
- `src/features/clinic/clinicCases.ts` — danh mục ca SUY TỪ DỮ LIỆU:
  quét mọi module, gom ca clinic ở Đoán thử/Thử tay/Nhớ lại kèm chất
  liệu 3 tầng (hint của Exercise; explain làm tầng-3 cho ca Đoán thử).
  **Ca của bài thi mastery CỐ Ý không đem ra** — đề thi luyện tự do
  trước được thì thang 85% mất giá trị (test khóa). `clinicTabUnlocked`
  đọc mastery gate: module chứa ca mở thì tab mở (đúng quyết định đã
  chốt: đậu Module 10 → Phòng khám mở).
- `ClinicPage` hai trạng thái: khóa giữ màn úp mở cũ; mở thì danh sách
  9 ca nhóm theo bài (thang dễ→khó), mỗi ca một màn làm lại tự do dùng
  NGUYÊN ClinicRoom + thang phản hồi 3 tầng như trong bài học.
  `AppLayout` bỏ khóa nav ĐỘNG theo cùng một cổng.
- XP: nguồn thứ 5 `clinicCaseSolved` (10 XP) vào XpSource — vẫn là
  lab/retrieval, hàng rào nguyên tắc 5 giữ nguyên (test gác cập nhật
  từ "đúng 4" thành "đúng 5 nguồn"). Store thêm `clinicSolved` map +
  `submitClinicCase`: mỗi lượt nộp ghi answerHistory (nguyên liệu flow
  engine); XP + streak CHỈ lần chữa khỏi đầu của mỗi ca; chỉ xpTotal,
  KHÔNG moduleXp (thanh tiến độ module đo phần bài học).
- 810/810 test xanh (+8: danh mục ca, cổng mastery, trọn luồng ca
  chọn-hành-động, XP một lần, thang 3 tầng, huy hiệu). Kiểm browser:
  hồ sơ chưa đậu → tab khóa + ổ khóa nav; giả lập đậu M1-10 → 9 ca
  hiện đủ, làm trọn ca DNS (nslookup timeout → chẩn đoán → hành động →
  nộp) ra "Chuẩn luôn!" +10 XP, streak 1; nộp lại không cộng thêm và
  nói rõ lý do; về danh sách thấy "Đã chữa khỏi 1/9 ca"; mobile 375px
  không tràn.

**Khối 9.5 đã làm gì** (khép hạng mục 9):
- **Kiểm end-to-end đường chưa từng thử: thi mastery Module 11 với 2 ca
  bệnh trên browser thật.** 6 câu thường + ca VLAN (khám mù bằng ping
  ra unreachable → chẩn đoán đúng bệnh → sửa VLAN p2 về 10 bằng đường
  bấm chọn → cặp mục tiêu "phải thông + phải chặn" cùng xanh → nộp) +
  ca DNS chọn-hành-động — **Đạt 100%**, masteryScores ghi 100, module-11
  vào passedModules, answerHistory nhận đủ 8 câu + 2 lượt ca. Theme
  sáng render sạch ở tab Phòng khám; mobile đã kiểm ở 9.2/9.4.
- `KICH-BAN-TEST.md` thêm **mục 10 — buổi test người thật Module 11**
  (mục "Sau buổi test" dời thành 11): đo KỸ NĂNG chẩn đoán bằng 2 ca
  chưa gặp trong tab Phòng khám — tiêu chí đậu là có lệnh khám TRƯỚC
  khi chốt bệnh, đọc đúng 2 cặp lời-từ-chối (General failure vs
  unreachable; timeout vs Non-existent domain), và chỉ đúng module gốc
  của bệnh (đo "tổng ôn trá hình").
- Đối chiếu DoD (spec mục 6) cho hạng mục 9: đủ 6 bước (tuple ép, parse
  xanh), flashcard tự sinh (6 concept M11 đều có thẻ), một màn một khái
  niệm (schema ép) — ĐẠT; test người thật là việc treo cần người (kịch
  bản đã soạn). Các tiêu chí riêng của spec Module 11: terminal ảo ✓,
  100% productive failure ✓ (test khóa), thang case dễ→khó ✓, tổng ôn
  trá hình ✓ (ca VLAN/M4, gpresult/M9, TTL/M4 trong bài thi).
- Hạng mục (9) XONG cả 5 khối. Phase 3 còn đúng hạng mục (10): Module
  12 + terminal PowerShell ảo — cần kế hoạch chia khối và duyệt trước.

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

Khối 6 đã đối chiếu DoD trên browser thật (đi trọn bài học 6 bước, phiên
ôn SM-2, luật "mở app là ôn trước", drill, mobile không tràn ngang) và vá
1 lỗi tìm thấy khi đối chiếu: màn Phòng khám hiện key i18n trần vì
vi/en.json thiếu mục `clinic.*` — đã bổ sung chuỗi và thêm test quét key
mồ côi (key gọi trong code phải tồn tại trong dictionary).

## Phase 2 — hạng mục (5): simulation lab kéo-thả Module 4

Kế hoạch chia 6 khối, đã duyệt. Quyết định đã chốt: lab đặt ở **bước
Đoán thử** (giữ nguyên tuple 6 bước); hai nút tách bạch **"Gửi thử"
(miễn phí) / "Nộp bài" (tính lượt)**; **mobile phải hoàn thành được lab**
(mọi thao tác có đường bấm-chọn, kéo-thả chỉ là đường phụ); phạm vi mô
phỏng đóng băng ở **MAC table + ARP + VLAN cổng access + router** (không
trunk, không router-on-a-stick); bài thi mastery Module 4 có **đúng 1 câu
lab đặt cuối**.

| Khối | Nội dung | Trạng thái |
|------|----------|-----------|
| 2.1 | Dọn đường: bỏ mọi chỗ đếm cứng số module ở tầng nội dung | Xong |
| 2.2 | Bộ mô phỏng mạng thuần `src/engine/lab/` (topology, ping từng chặng, undo) | Xong |
| 2.3 | `gradeLab` + `LabSpecSchema` (chưa cắm vào union câu hỏi) | Xong |
| 2.4a | UI lab `src/features/lab/` — chơi được thật, trưng ở `/design` | Xong |
| 2.4b | Cắm lab vào pipeline 6 bước (`kind:'lab'` trong union câu hỏi) | Xong |
| 2.5 | Nội dung `content/modules/module-04.json` + hình khái niệm | Xong |
| 2.6 | Đối chiếu DoD + kiểm browser + cập nhật tài liệu | Xong |

**Khối 2.1 đã làm gì** (không đổi hành vi người học):
- `validateModules` ép **`order` duy nhất** giữa các module — trùng order
  khiến thứ tự sắp xếp không xác định, mastery gate có thể mở nhầm module
  (lỗ hổng nguyên tắc 2, tồn tại độc lập với Module 4).
- `content.test.ts` bỏ mảng id hard-code và điều kiện "mọi module Phần A";
  thay bằng bất biến suy từ dữ liệu (order liên tục từ 1, phần không lùi
  A→B→C) và tra module theo id thay vì chỉ số mảng.
- `render-content-review.mjs`: `renderQuestion` thêm nhánh **ném lỗi khi
  gặp `kind` lạ** (trước đây im lặng nuốt mất phần đáp án — người duyệt ký
  vào bản review thiếu dữ liệu); tiêu đề sinh từ dữ liệu; tách `main()`
  sau cờ chạy-như-lệnh để test import được mà không ghi đè file.
- `ConceptVisual`: bản đồ khóa học (advance organizer Module 2) giữ lưới
  12 module theo spec nhưng **tô sáng theo số module thật đang có**; thêm
  `hasVisual()` và test chặn visualId không có hình (trước đây rơi âm
  thầm về hình thư chung).

Đã chứng minh dứt điểm bằng cách thả tạm một `module-04.json` thứ tư vào
`content/modules/`: test vẫn xanh, `content:review` tự đổi tiêu đề thành
"Module 1-4 (Phần A+B)", bản đồ khóa học tự sáng 4 ô — rồi xóa file tạm.

**Khối 2.2 đã làm gì** (headless — app người dùng không đổi một pixel):
- `src/engine/lab/topology.ts` — mô hình mạng + `validateTopology` trả mã
  lỗi CẤU TRÚC (dây trỏ cổng không có, một cổng hai dây, trùng MAC…).
  Phân biệt rạch ròi với lỗi CẤU HÌNH (thiếu gateway, sai VLAN): lỗi cấu
  hình là thứ người học phải tự tìm, không phải bug.
- `src/engine/lab/simulate.ts` — `simulatePing` trả **chuỗi chặng có thứ
  tự** để UI phát lại thành animation. Bốn khoảnh khắc dạy học được mã
  hóa thành `HopReason`: `broadcast-flood` (ARP hỏi cả phòng),
  `unknown-unicast-flood` (switch chưa học → phát tán), `mac-table-hit`
  (đã học → đi đúng một cổng), `routed` (router đổi MAC, giữ nguyên IP).
  Thất bại trả mã chẩn đoán: `arp-unresolved` (chính là ca hai máy khác
  VLAN), `no-gateway`, `gateway-off-subnet`, `no-route`,
  `broadcast-storm`, `hop-budget-exceeded`.
- `src/engine/lab/session.ts` — trình soạn thảo + **undo dạng ảnh chụp**
  (spec 4.5). `LabAllowance` cho phép đề bài giới hạn thao tác, engine ÉP
  chứ không chỉ để UI ẩn nút. `classifyDiff` + `allowanceViolations` là
  nguyên liệu cho cross-check nội dung ở khối 2.3.
- `tests/fixtures/labFixture.ts` — 5 topology mẫu, gồm **ca hỏng của spec
  Module 4** (hai máy cùng dải IP nhưng khác VLAN) và lời giải của nó.

Ba đơn giản hóa CỐ Ý so với thiết bị thật, đã ghi trong đầu file
`topology.ts`: không trunk (hai switch nối nhau bằng cổng access, khung
chỉ qua khi hai đầu cùng VLAN); switch không có IP quản trị; mỗi cổng
router mang đúng một IP.

**Khối 2.3 đã làm gì** (vẫn headless — `QuestionSchema` chưa có nhánh lab):
- `src/engine/lab/gradeLab.ts` — chấm **hành vi, không chấm hình dạng**:
  chạy mô phỏng rồi hỏi "mạng này có làm được việc đề bài yêu cầu không",
  không so sơ đồ người học với sơ đồ mẫu. Mọi lời giải chạy được đều được
  công nhận (IKEA effect). Bốn loại mục tiêu: `ping` (reach/blocked),
  `pathThrough`, `macLearned`, `arpResolved`.
- **Cặp `reach` + `blocked` là mấu chốt sư phạm**: thiếu goal `blocked`
  thì bài VLAN bị "giải" bằng cách gộp tất cả vào một VLAN — đúng kết
  quả, sai bài học. Đã khóa bằng test.
- `diagnose()` bám MỤC TIÊU của đề, không chỉ nhìn sơ đồ: bài chia phòng
  ban cố ý có hai VLAN trong cùng dải địa chỉ, nên triệu chứng "cùng dải
  khác VLAN" chỉ được nêu cho đúng cặp máy mà đề đòi phải thông nhau.
- `src/engine/lab/labSchema.ts` — zod cho đề lab, ép các ràng buộc mà
  schema thuần cấu trúc không nói được: **lời giải phải thật sự giải
  được** (chạy `gradeLab` lên chính nó), **đề bài chưa được giải sẵn**
  (productive failure ép ở tầng dữ liệu), **lời giải chỉ dùng thao tác mà
  đề cho phép** (đề không được đòi thứ chính nó cấm).
- Fixture thêm 2 đề lab mẫu: "sửa VLAN chia phòng ban" và "lắp mạng từ
  thiết bị rời" — chính là hình dạng dữ liệu Module 4 sẽ khai trong JSON.

**Khối 2.4a đã làm gì** (lab chơi được thật; pipeline 6 bước chưa đụng):
- `src/features/lab/` — mặt bàn ba tầng: dây vẽ SVG, thiết bị và cổng là
  `<button>` thật, gói tin bay ở tầng trên. Thiết bị KHÔNG nằm trong SVG
  để chúng là nút thật — nhờ đó bàn phím, trình đọc màn hình và test đi
  chung một đường mã với chuột.
- **Một action, hai đường vào**: mọi thao tác (nối dây, đổi VLAN, đặt địa
  chỉ, gỡ thiết bị) làm trọn được bằng BẤM CHỌN; kéo-thả chỉ để sắp xếp
  cho dễ nhìn. Đây là lý do lab dùng được trên điện thoại (đã chốt).
- **Toạ độ bằng một hệ số, không dùng `getScreenCTM()`** (jsdom không có
  API đó): canvas co giãn đều nên quy đổi con trỏ chỉ là một phép chia,
  và `width === 0` chốt hệ số 1 — chính điều này làm kéo-thả test được.
- Hai nút tách bạch: **"Gửi thử" miễn phí, "Nộp bài" mới tính lượt**.
- **Nhật ký chặng LUÔN render đầy đủ**, kể cả khi tắt chuyển động hoặc
  trong jsdom. Animation là lớp dual-coding đắp thêm, không phải nơi
  chứa tải trọng sư phạm.
- Rút `PacketShape` / `DeviceGlyph` / `samplePath` thành dùng chung với
  onboarding — spec 4.2 đòi "gói tin luôn cùng một hình dạng ở mọi
  module", giờ là component thật chứ không phải lời hứa.
- Trưng bày ở `/design` với một đề lab đi qua `parseLabSpec` nên nó phải
  hợp lệ y hệt đề thật.

**Khối 2.4b đã làm gì** (bật công tắc — lab thành một dạng câu hỏi thật):
- `QuestionSchema` có nhánh thứ tư `kind: 'lab'`; `QuestionResponse` thêm
  `{kind:'lab', topology}`; `gradeQuestion` ủy quyền cho `isLabSolved`.
- `QuestionInput` render phòng lab; `AnswerReveal` cho `canonicalAnswer`
  trả `null` với lab (một sơ đồ không rút gọn thành một dòng chữ được, và
  mọi lời giải chạy được đều hợp lệ).
- `render-content-review.mjs` diễn đạt đề lab thành chữ: sơ đồ, mục tiêu,
  quyền thao tác, lời giải mẫu — người duyệt không phải mở JSON topology.
- **`lessonMachine.ts` vẫn KHÔNG bị sửa một dòng nào** — bất biến của cả
  hạng mục còn nguyên. `labInPipeline.test.ts` khóa lời hứa đó: thang 3
  tầng, cổng qua bước, XP và lịch sử trả lời chạy y hệt câu gõ tay.

**Khối 2.5 đã làm gì** (nội dung thật của Module 4):
- `content/modules/module-04.json` — Phần B, 5 chặng × 1 bài, 6 khái niệm
  (switch, bảng MAC, ARP, VLAN, miền quảng bá, định tuyến), bài thi 8 câu
  **kết bằng đúng 1 câu lab** như đã chốt.
- Ba bài lab đặt đúng chỗ spec đòi: bài 2 có lab **lắp mạng từ thiết bị
  rời** (IKEA effect); bài 4 có lab **sửa mạng hỏng ngay ở bước Đoán thử**
  — người học vọc trước khi đọc lý thuyết VLAN (productive failure), sai
  không chặn và không trừ điểm; bài 4 bước Thử tay có lab đầy đủ với cặp
  mục tiêu "phải thông + phải chặn".
- Hệ ẩn dụ bưu điện nối tiếp từ Module 1-3: switch là bưu cục của làng,
  bảng MAC là cuốn sổ nhớ mặt, ARP là tiếng gọi giữa sân, VLAN là bức
  tường ngăn xóm, router là cây cầu.
- 6 hình SVG mới trong `ConceptVisual` REGISTRY.
- **PHÉP THỬ KIẾN TRÚC ĐẠT: khối này KHÔNG sửa file nào trong
  `src/engine/`.** Thêm module mới đúng là chỉ thêm một file JSON.

**Khối 2.6 đã làm gì** (khép hạng mục):
- **Vá một lỗi thật phát hiện khi kiểm mobile:** sidebar dọc ăn 224px
  trong màn 375px, chỉ chừa ~87px cho nội dung — lab không thao tác nổi.
  Dưới 768px, menu 4 mục giờ chuyển xuống **thanh đáy** và canvas lab
  **cuộn ngang trong khung riêng** (giữ chiều rộng tối thiểu 560px để hai
  vùng chạm cổng không dính nhau). Lỗi này có từ Phase 1 nhưng khi đó
  mobile chỉ cần đọc; quyết định "lab phải hoàn thành được trên điện
  thoại" biến nó thành mục CHƯA ĐẠT.
- Đã kiểm trên máy 375px: giải trọn bài lab bằng đường bấm chọn, chip
  VLAN 72×26px, không tràn ngang. Desktop không hồi quy.
- `KICH-BAN-TEST.md` thêm buổi test Module 4: tiêu chí đậu là **tự chẩn
  đoán được một mạng hỏng chưa từng gặp và nói được vì sao**.
- `CLAUDE.md` cập nhật cấu trúc + các luật của phòng lab không được phá.

Kiểm tra khi khép hạng mục: **596/596 test xanh** (+237 so với Phase 1),
`npm run typecheck` sạch, `npm run build` qua. Đã kiểm trên trình duyệt
thật: sửa VLAN → mục tiêu chuyển xong, hoàn tác trả đúng trạng thái
trước, vùng chạm cổng 24px cách nhau 30px (WCAG 2.5.8). Và kiểm
end-to-end bằng cách thả tạm một module có bài lab vào `content/modules/`:
bài đi trọn 6 bước, nộp lab đúng → "Chuẩn luôn!" → qua bước → **+10 XP
đúng bằng XP bước Làm** — rồi xóa file tạm.

Đã commit `3e0b3b4` và push: workflow xanh, **Module 4 đã lên bản live**
(kiểm bằng cách tải bundle của Pages, có nội dung Module 4 và chuỗi của
phòng lab).

## Phase 2 — hạng mục (6): Module 5, 6, 7 + cung điện ký ức Port

Kế hoạch chia 6 khối. Làm cung điện TRƯỚC nội dung: nó là mảnh kiến trúc
mới duy nhất của hạng mục này (đúng vai trò phòng lab ở hạng mục 5), làm
xong thì Module 5/6/7 chỉ còn là viết JSON.

| Khối | Nội dung | Trạng thái |
|------|----------|-----------|
| 6.1 | Engine cung điện ký ức thuần TS (`src/engine/palace/`) | Xong |
| 6.2 | UI hai chuyến đi + cắm vào pipeline 6 bước | Xong |
| 6.3 | Nội dung Module 5 (TCP/UDP/Port) + hình khái niệm | Xong |
| 6.4 | Nội dung Module 6 (DNS phân cấp, DHCP DORA, DoH) | Xong |
| 6.5 | Nội dung Module 7 (NAT/PAT, port forwarding, firewall, mạng nhà) | Xong |
| 6.6 | Đối chiếu DoD + kiểm browser + cập nhật tài liệu | Xong |

**Khối 6.1 đã làm gì** (headless — app người dùng không đổi một pixel):
- `src/engine/palace/palace.ts` — tòa nhà **5 tầng × 3 phòng = 15 phòng**,
  `validatePalace` trả mã lỗi CẤU TRÚC (lưới có lỗ, trùng cổng, hai phòng
  chung một hình…). `tourRoute` chốt **lộ trình cố định** tầng trệt lên
  nóc, trái sang phải — thứ tự phòng trong JSON không đổi được đường đi
  của người học, vì bản thân thứ tự là một phần của cái được nhớ.
- `src/engine/palace/walk.ts` — **hai chuyến đi tách bạch**: đi xem
  (encoding, không chấm, không cộng điểm — nguyên tắc 5) và đi lại từ trí
  nhớ (retrieval, thang 3 tầng dùng lại `feedbackTier` của bài học). Chấm
  tách hai vế cổng/dịch vụ để phản hồi nói đúng chỗ hổng; sai 3 lần được
  mở đáp án nhưng **vẫn phải tự gõ lại mới đi tiếp**.
- `src/engine/palace/cards.ts` — **15 phòng = 15 thẻ SM-2 riêng**, khóa
  `palace:<roomId>`. Nhờ tiền tố, hàng đợi ôn tập / SM-2 / dữ liệu đã lưu
  của người học chạy nguyên, không phải sửa gì.
- `src/engine/palace/palaceSchema.ts` — zod + chốt chặn nội dung: **câu
  chuyện gợi nhớ phải nhắc đúng số cổng** (hình ảnh không dính số thì
  người học nhớ ổ khóa vàng mà vẫn quên 443 — chỗ hay hỏng nhất của cung
  điện làm ẩu), và **không hai phòng nào nhận chung một câu trả lời**,
  kiểm bằng chính hàm chấm chứ không so chuỗi thô.
- `src/engine/ltext.ts` — tách `LTextSchema` khỏi contentSchema để hai
  schema nội dung dùng chung mà không import chéo. contentSchema re-export
  nên nơi gọi cũ không phải sửa.
- Fixture `tests/fixtures/palaceFixture.ts` dựng đủ **15 port của spec**
  vào tòa nhà — chính lúc dựng đã lộ một ca thật: "SMTP Submission" chứa
  nguyên cụm "SMTP" nên bộ chấm tính đúng cho cả phòng 25; đã đổi thành
  "Mail Submission" và khóa ca này bằng test.
- 652/652 test xanh (+56), typecheck sạch.

**Khối 6.2 đã làm gì** (cung điện thành thứ chơi được thật):
- **Đã chốt hướng A**: chuyến đi xem là một MÀN DẠY (`palaceTour` trên
  màn dạy — vẫn "một màn = một khái niệm", khái niệm ở đây là cung điện);
  chuyến đi lại từ trí nhớ là nhánh thứ NĂM của `QuestionSchema`
  (`kind: 'palace-walk'`). `lessonMachine.ts` lại KHÔNG bị sửa dòng nào.
- Engine thêm khả năng đi TỪNG ĐOẠN (`startTour/startWalk(palace, roomIds)`):
  nội dung chia 15 phòng ra học dần, không nhồi một lượt (nguyên tắc 3).
  Đoạn nào cũng đi theo đúng thứ tự lộ trình gốc dù khai lộn xộn.
- Luật chấm chuyến đi: **đạt = đi trọn đúng đoạn đề bài đòi và không
  phòng nào phải mở đáp án**. Quên một nhịp rồi tự nhớ ra vẫn đạt (đó vẫn
  là nhớ lại thành công); không đặt thêm ngưỡng phần trăm mới nào.
- `src/features/palace/` — `PalaceTour` (đi xem: hình + số + chuyện),
  `PalaceWalk` (đi lại: chỉ chỗ và HÌNH làm gợi ý, tầng 2 mới kể chuyện,
  tầng 3 mới nói số), `PalaceMap` (sơ đồ 5 tầng, lật ngửa dần theo bước
  chân — vừa là mỏ neo không gian vừa là thanh tiến độ), `RoomGlyph`
  (15 hình vẽ tay, registry KHÔNG có hình dự phòng: thiếu hình là lỗi
  soạn bài, có test chặn), `parsePorts` (người thật gõ "67 và 68").
- Schema cấp module ép **thứ tự sư phạm**: phòng phải được dẫn đi xem
  TRƯỚC khi bị hỏi lại; mỗi phòng chỉ dạy một lần; dạy rồi thì phải có
  câu bắt nhớ lại (nguyên tắc 1). `validateModules` thêm luật id phòng
  duy nhất toàn cục.
- Hộp ôn tập: học xong bài nào thì các phòng bài đó dẫn qua thành thẻ
  SM-2 riêng; `ReviewPage` biết lật hai loại mặt thẻ (khái niệm và
  phòng) — SM-2, hàng đợi, luật "mở app là ôn trước" không phải sửa gì.
- `render-content-review.mjs` tả được cung điện, màn đi xem và câu đi
  lại; `/design` trưng cả hai chuyến cạnh nhau (tự dùng tòa nhà thật khi
  Module 5 có mặt).
- 707/707 test xanh (+55), typecheck sạch, build qua. Đã kiểm trên trình
  duyệt thật: đi trọn tầng 1, gõ không dấu ("web thuong") vẫn được chấm
  đúng, bản đồ lật ngửa đúng nhịp, kết quả "đạt — nhớ được cả đoạn" kèm
  "nhớ được ngay 2/3 phòng"; mobile 375px không tràn ngang.

**Khối 6.3 đã làm gì** (nội dung thật của Module 5):
- `content/modules/module-05.json` — Phần B, 5 chặng, **8 bài**, 11 khái
  niệm, cung điện 15 phòng đúng 15 port của spec. Ba bài đầu dạy TCP /
  bắt tay 3 bước / UDP / luật của số cổng; năm bài sau mỗi bài đi một
  TẦNG của cung điện (3 phòng), đi xem ở bước Dạy rồi đi lại từ trí nhớ
  ngay ở bước Nhớ lại của chính bài đó.
- **Von Restorff cho SYN-ACK** (spec đòi): trong hình bắt tay, hai nhịp
  SYN và ACK vẽ mờ, nhịp giữa SYN-ACK vẽ khác hẳn — màu nhấn, nét dày,
  mũi tên hai đầu, có khung bao. Cái lạ chỉ nổi khi xung quanh bình thường.
- Câu gõ tay về SYN-ACK khai `nearMisses` cho hai câu trả lời cận-đúng
  hay gặp nhất ("syn", "ack") — mỗi câu có lời phản hồi may đo riêng.
- 6 hình SVG mới trong `ConceptVisual`: bắt tay 3 nhịp, TCP gửi lại gói
  thiếu, UDP bắn một chiều, dãy cửa cổng nổi tiếng, cổng tạm thời, tòa
  nhà cung điện.
- `content.test.ts` thêm 3 bất biến suy từ dữ liệu (không đếm cứng):
  mọi phòng của cung điện phải được dẫn đi xem, mọi phòng phải bị hỏi
  trong **bài thi module** (không phòng nào lọt qua cổng mastery), và
  cung điện Module 5 phải gồm đúng 15 port spec liệt kê.
- 710/710 test xanh (+3), typecheck sạch, build qua. Đã đi trọn bài
  m5-bai-4 trên trình duyệt thật: tour khóa nút đi tiếp tới khi đi hết
  đoạn, chuyến nhớ lại chấm "Chuẩn luôn!", +30 XP, Hộp ôn tập nhận đúng
  1 thẻ khái niệm + 3 thẻ phòng, và thẻ phòng lật ra "Cổng 53 — DNS".

**Khối 6.4 đã làm gì** (nội dung thật của Module 6):
- `content/modules/module-06.json` — Phần B, 5 chặng, 5 bài, 8 khái niệm.
  DNS ba tầng (gốc → TLD → có thẩm quyền) và vai trò resolver; bản ghi
  A/AAAA/CNAME/MX; **DNS over HTTPS** làm góc hiện đại, nối thẳng về
  phòng 443 của cung điện Module 5; DHCP DORA; và tờ giấy thuê có hạn.
- **DORA kể thành chuyện hỏi cưới** như spec đòi: Discover là chàng trai
  hỏi to giữa sân, Offer là các nhà đánh tiếng, Request là chốt một nhà
  TRƯỚC CẢ LÀNG, Ack là nhà ấy gật đầu. Hình vẽ nhấn riêng nhịp Request
  (nét dày, màu nhấn) vì nó là nhịp khó hiểu nhất.
- **Self-explanation đậm** đúng câu spec chỉ định: "tại sao DHCP vẫn phải
  có nhịp Request dù đã nhận Offer?" — ba nhóm từ khóa (nhiều máy chủ /
  chọn công khai / rút lời trả địa chỉ về kho).
- 8 hình SVG mới; và **vá một lỗi thật của tầng hình**: đầu mũi tên
  `cv-arrow` trước đây chỉ khai bên trong MỘT hình, hình nào vẽ mũi tên
  mà quên khai lại thì nét đó cụt đầu — lỗi im lặng, chỉ nhìn mới thấy.
  Nay khai ở `Frame` nên mọi hình đều có.
- `/design` thêm mục **"Hình khái niệm"** bày hết 54 hình ra một trang.
  Nhờ nó phát hiện thêm 3 chỗ chữ tràn khung (kể cả một chỗ có sẵn từ
  Phase 1: nhãn "C · 8-12" của bản đồ khóa học bị cắt đuôi) — đã sửa cả.
- 710/710 test xanh, typecheck sạch, build qua. Đã soi cả 54 hình trên
  trình duyệt thật, đo bằng `getBBox` để chắc không còn chữ nào tràn.

**Khối 6.5 đã làm gì** (nội dung thật của Module 7 — hết Phần B):
- `content/modules/module-07.json` — 5 chặng, 5 bài, 6 khái niệm. NAT/PAT
  (ẩn dụ chung cư của Module 1 quay lại: cả nhà một số nhà, phân biệt
  bằng số căn hộ), port forwarding, tường lửa stateful, kiến trúc mạng
  nhà, và double NAT khi cắm thêm router thứ hai.
- **Bài lab "vẽ lại sơ đồ mạng nhà BẠN"** như spec đòi (học gắn đời
  thật): người học nối máy tính + điện thoại qua switch lên router nhà
  rồi đặt địa chỉ cho chúng; phần router ra modem đã đấu sẵn y như đời
  thật. Chấm bằng hành vi: cả hai thiết bị phải ping được máy chủ ngoài
  Internet, đi qua HAI router bằng tuyến mặc định.
- Nội dung nối chéo về các module trước: port forwarding nhắc lại phòng
  3389/445 của cung điện Module 5; bài mạng nhà dạy cách nghi đúng chặng
  khi mất mạng (nền cho Phòng khám ở Phase 3).
- 6 hình SVG mới. Đã đo lại toàn bộ 65 hình bằng `getBBox` trên
  `/design`: không hình nào còn chữ tràn khung.
- 710/710 test xanh, typecheck sạch, build qua. Đã GIẢI TRỌN bài lab
  trên trình duyệt thật bằng đường bấm chọn (nối 3 dây, đặt 2 địa chỉ) —
  hai mục tiêu chuyển "xong", nộp bài ra "Chuẩn luôn!".

**Khối 6.6 đã làm gì** (khép hạng mục 6):
- Kiểm end-to-end trên trình duyệt thật: **thi trọn bài mastery Module 5**
  gồm 3 câu đi lại cung điện (6+7+2... phòng, phủ đủ 15) — đạt 100%, mở
  module sau; cố tình quên một nhịp rồi tự nhớ ra vẫn được chấm đạt, đúng
  luật đã chốt. Kiểm mobile 375px: bài học cung điện xếp một cột, không
  tràn ngang, thanh đáy nguyên.
- `KICH-BAN-TEST.md` thêm mục 8 — buổi test người thật cho Module 5, HAI
  buổi cách một đêm (trí nhớ dài hạn chỉ đo được sau giấc ngủ). Tiêu chí
  đậu: **điền lại ≥ 12/15 phòng trên giấy kẻ lưới, và khi hỏi "sao nhớ
  được" phải nhắc tới HÌNH hoặc CHỖ** — chứng tỏ cung điện làm việc chứ
  không phải học vẹt đè lên.
- Hạng mục (6) XONG cả 6 khối. Phase 2 còn đúng một hạng mục: (7) flow
  engine độ khó thích ứng.

## Phase 2 — hạng mục (7): flow engine độ khó thích ứng — XONG

Ba quyết định đã chốt trước khi code: tăng độ khó bằng phép suy cơ học
(trắc nghiệm → gõ tay, không viết thêm nội dung; "tình huống lạ hơn" để
mở); phiên củng cố BẮT BUỘC đi qua; cửa sổ 10 câu trộn mọi nguồn
retrieval.

- `src/engine/flow.ts` — thuần TS: `flowMode` chỉ kích hoạt khi cửa sổ
  ĐẦY 10 câu (đúng nghĩa đen spec, không phán người mới học); > 90% →
  harder, < 60% → support, 60-90 không đụng gì (vùng flow là ĐÍCH, hai
  ngưỡng là bộ truyền động). `deriveOpenQuestion` suy bản gõ tay từ câu
  trắc nghiệm — cùng id nên trạng thái chấm/thang 3 tầng/XP không biết
  gì về chuyện đổi dạng; lựa chọn đúng dài quá 24 ký tự thì KHÔNG suy
  (bắt gõ nguyên mệnh đề là đánh đố trí gõ phím, không phải trí nhớ).
  `foundationConceptIds` chọn khái niệm nền gần-nhất-trước; đầu module
  thì mượn nền module liền trước. `needsSupport` có thời gian nguội 5
  câu — người đang yếu không bị nhốt trong vòng ôn vô hạn.
- `gradeQuestion` học một đường CHÍNH THỨC mới: câu mcq nhận câu trả lời
  typed, chấm bằng chữ của lựa chọn đúng (một câu trắc nghiệm luôn trả
  lời mở được — không phải kind mismatch nữa).
- `FoundationReview` (`src/features/learn/`) — phiên củng cố ≤ 6 thẻ,
  chặn cửa bài MỚI (bài dở dang không bị cắt ngang), KHÔNG cộng XP,
  KHÔNG đụng lịch SM-2 (ôn sớm ghi vào SM-2 sẽ phá interval; cộng XP là
  mở đường farm bằng cách cố tình sai). Vẫn giữ nhịp retrieval: tự nhớ
  rồi mới lật. Bài đầu Module 1 không có nền → đi thẳng, không kẹt.
- Thi mastery KHÔNG đổi độ khó — thang đo cố định thì ngưỡng 85% mới
  có nghĩa. `lessonMachine.ts` tiếp tục không bị sửa dòng nào.
- Store thêm `answerTotal` (đơn điệu tăng) + `supportShownAtTotal` làm
  mốc thời gian nguội; `markSupportShown()`.
- 732/732 test xanh (+22), typecheck sạch, build qua. Kiểm cả hai nhánh
  trên trình duyệt thật: tụt 40% → thẻ nền chặn cửa bài mới, đi hết thẻ
  vào bài, mốc nguội ghi, XP = 0; thắng 100% → câu trắc nghiệm "CNAME"
  hiện thành ô gõ tay kèm lời nhắn, gõ "cname" được chấm "Chuẩn luôn!".

Kiểm tra khi khép Phase 2: **732/732 test xanh**, typecheck sạch, build
qua, app live có đủ Module 1-7. **Phase 2 XONG cả 3 hạng mục (5)(6)(7).**

## Phase 3 — hạng mục (8): Module 8-10 + cung điện GPO + checklist VMware

Kế hoạch 5 khối đã duyệt. Ba quyết định đã chốt: **tổng quát hóa cung
điện** (phương án A); tòa GPO **4 tầng × 1 phòng**; checklist VMware
khai trong JSON module, tick persist, **không XP**.

| Khối | Nội dung | Trạng thái |
|------|----------|-----------|
| 8.1 | Tổng quát hóa cung điện + schema/store checklist VMware | Xong |
| 8.2 | Nội dung Module 8 (Wi-Fi, WPA, IPv6/SLAAC — interleaving IPv4↔IPv6) | Xong |
| 8.3 | Nội dung Module 9 ⭐ (AD DS/GPO, cung điện LSDOU, fading đậm, checklist VMware) | Xong |
| 8.4 | Nội dung Module 10 (VPC/Zero Trust — contrast cases với on-prem) | Xong |
| 8.5 | DoD + kiểm browser + tài liệu | Xong |

**Khối 8.1 đã làm gì** (M5 không đổi hành vi — test cũ xanh nguyên):
- Cung điện hết đóng đinh vào Port: kích thước (`floors`/`roomsPerFloor`)
  và ruột phòng khai THEO TỪNG TÒA. Ruột phòng thành hai vế trung tính
  **`keys`** (vế chính: "443" / "Domain") + **`name`** (vế phụ: "HTTPS" /
  "chính máy đó"); nhãn, placeholder và gợi ý tầng-1 của hai ô nhập là
  NỘI DUNG do tòa nhà khai (`keyLabel`/`nameLabel`/`keyHint`/`nameHint`),
  không phải chuỗi i18n. `keyStyle: 'number' | 'text'` quyết định cách UI
  đọc câu trả lời (tách cụm chữ số vs cả ô là một key).
- Luật port-riêng (1..65535) rời khỏi engine, thành refinement của schema
  khi `keyStyle: 'number'` — engine giữ phần bất biến của PHƯƠNG PHÁP,
  schema giữ phần chuyên ngành của từng tòa.
- `module-05.json` đổi tên trường theo hình dạng mới (nội dung không đổi
  một chữ); `GPO_PALACE` 4×1 vào fixture làm ca kiểm "cung điện chữ" —
  cùng engine đi trọn chuyến Local → Site → Domain → OU.
- Checklist VMware: `vmLab {title, intro?, steps[]}` trong ModuleSchema
  (id bước duy nhất toàn cục — validateModules ép), store thêm
  `vmLabDone` + `toggleVmLabStep` (không XP). UI hiển thị sang khối 8.3.
- 741/741 test xanh (+9 ròng), typecheck sạch, build qua. Kiểm browser:
  cung điện M5 sau migration chạy nguyên — nhãn "Số cổng"/"Dịch vụ" giờ
  đến từ nội dung, gõ "web thuong" vẫn được chấm đúng.

**Khối 8.2 đã làm gì** (nội dung thật của Module 8 — mở Phần C):
- `content/modules/module-08.json` — 5 chặng, 5 bài, 10 khái niệm, bài
  thi 9 câu. Bài 1 băng tần (quy tắc "gần ưu tiên nhanh, xa ưu tiên
  tới"), bài 2 thế hệ Wi-Fi 4→7 + 6E/MLO (ẩn dụ đời xe, tương thích
  ngược), bài 3 WPA2/WPA3 (điểm yếu dò offline → bắt tay "gõ cửa từng
  lần"; nối về phòng 443), bài 4 link-local fe80 + global unicast /64
  (khu phố router rao + số nhà máy chọn; pretest gài đúng chỗ nhầm
  "NAT = bảo mật"), bài 5 SLAAC vs DHCP-có-sổ + dual-stack.
- **Interleaving mạnh đúng spec:** từ bài 4, bài tập và câu nhớ lại trộn
  A-B giữa hai hệ — câu IPv6 đứng cạnh câu "đổi hệ quy chiếu" bắt dùng
  lại NAT (M7), DORA (M6), địa chỉ riêng (M3); bài thi xen kẽ câu 4-8
  (fe80 → NAT → no-NAT IPv6 → DHCP → SLAAC) và câu 9 phân biệt
  dual-stack với double NAT. Kỹ năng được luyện là NHẬN RA câu này thuộc
  hệ nào trước khi trả lời.
- 10 hình SVG mới trong `ConceptVisual` (sóng thay dây, ba làn băng tần,
  timeline thế hệ, làn 6 GHz vắng, khóa WPA, WPA3 gõ cửa, phòng fe80,
  biển số /64 hai nửa, SLAAC tự ghép, hai biển dual-stack). Đo `getBBox`
  cả 80 hình trên `/design`: 4 hình mới tràn chú thích lúc đầu — đã rút
  gọn, giờ 80/80 nằm trong khung.
- Module 8 KHÔNG cần lab, KHÔNG cần cung điện, KHÔNG sửa engine — chỉ
  một file JSON + hình. Phép thử kiến trúc tiếp tục đạt.
- 741/741 test xanh, typecheck sạch, build qua, content:review đã render
  8 module. Kiểm browser bằng hồ sơ mới: trang Học liệt kê Module 8 đủ
  5 chặng (khóa tuần tự), deep-link `/bai/m8-bai-1` đi được: hook → đoán
  thử chấm + giải thích → màn dạy hiện hình mới + "Đào sâu hơn".
- Deploy Pages đã HỒI hẳn phía GitHub: run của khối 8.2 xanh cả build
  lẫn deploy — bản live đang có đủ Module 1-8.

**Khối 8.3 đã làm gì** (Module 9 ⭐ — module trọng điểm của Phần C):
- `content/modules/module-09.json` — 5 chặng, 5 bài, 8 khái niệm, bài
  thi 9 câu. Bài 1 domain + DC (nối thẳng về phòng 389/636 cung điện
  M5), bài 2 user/group vs OU (cặp chống nhầm "một OU, nhiều group"),
  bài 3 GPO (bẫy chữ nghĩa "tên có Group nhưng không treo vào group"),
  bài 4 LSDOU + cung điện, bài 5 kế thừa/Block/Enforced + gpupdate/
  gpresult.
- **Cung điện GPO** — tòa 4 tầng × 1 phòng, keyStyle 'text' (đúng
  phương án A đã chốt, nội dung lấy từ hình mẫu `GPO_PALACE`): đi xem ở
  bước Dạy bài 4, đi lại từ trí nhớ ở bước Nhớ lại, bài thi kết bằng
  palace-walk phủ đủ 4 phòng. 4 hình mới trong `RoomGlyph`: bảng nội
  quy / bảng tin / lá cờ / cửa phòng ban.
- **Worked example fading 0→1→2 trên ba bài GPO liên tiếp** đúng câu
  spec ("xem mẫu đầy đủ → điền chỗ trống → tự cấu hình từ yêu cầu
  suông"): bài 3 fading 0 kèm ví dụ treo GPO từ A-Z, bài 4 fading 1
  (điền tầng thiếu), bài 5 fading 2 (yêu cầu suông "cấm USB phòng Kế
  toán"). `content.test.ts` khóa cả chuỗi này + cấu trúc tòa 4×1 + luật
  "Module 9 phải có vmLab".
- **Checklist lab VMware có UI**: thẻ trong ModuleCard (trang Học) khi
  module mở — 8 bước dựng miền thật (cài Server → thăng DC → OU/user →
  join client → treo GPO → gpupdate/gpresult), tick persist vào
  `vmLabDone`, đếm "x/8 bước", KHÔNG cộng XP (đã kiểm: xpTotal đứng
  nguyên khi tick). 2 chuỗi UI-chrome mới vào vi.json + en.json.
- `render-content-review.mjs` học tả `vmLab` — bản duyệt không được
  nuốt im lặng nội dung người học nhìn thấy (cùng luật với câu hỏi
  kind lạ ở khối 2.1).
- `parsePorts.test.ts` nâng cấp: bộ ba test hình gợi nhớ giờ quét MỌI
  tòa nhà (Port + GPO) — mỗi phòng một hình, không hình thừa, không
  hình trùng xuyên tòa.
- 744/744 test xanh (+3), typecheck sạch, build qua, content:review
  render 9 module. Kiểm browser: đo getBBox 93 hình khái niệm — 0 tràn;
  đi trọn bài m9-bai-4 (tour 4 tầng, bản đồ lật đúng nhịp, điền "site"
  được chấm, chuyến đi lại từ trí nhớ gõ "local"/"may cuc bo" không dấu
  vẫn "Chuẩn luôn!", đi trọn 4 tầng đạt); checklist VMware tick được,
  persist, XP không đổi.
- Deploy khối 8.3 đỏ MỘT lượt vì lỗi hạ tầng GitHub (không tải được
  action — Service Unavailable), `gh run rerun --failed` là xanh ngay.
  Code không liên quan.

**Khối 8.4 đã làm gì** (Module 10 — khép phần nội dung của hạng mục 8):
- `content/modules/module-10.json` — 5 chặng, 5 bài, 8 khái niệm, bài
  thi 8 câu. Bài 1 cloud + VPC/VNet, bài 2 security group, bài 3 VPN
  site-to-site vs client, bài 4 mô hình vành đai → Zero Trust (danh
  tính là biên giới mới), bài 5 Entra ID hybrid.
- **Contrast cases đúng spec** — mỗi khái niệm cloud dạy bằng màn
  "SO SÁNH SONG SONG" đặt cạnh khái niệm on-prem đã học: VPC ↔ VLAN +
  subnet (M3-4, kỹ năng CIDR dùng nguyên), security group ↔ tường lửa
  stateful (M7, cùng chữ stateful), VPN site-to-site ↔ cây cầu router
  (M4), client VPN ↔ bài mạng lạ WPA/HTTPS (M8), vành đai ↔ NAT + tường
  lửa cổng (M7), Entra ID ↔ AD DS (M9 — bài tập "tạo user đúng OU" dùng
  lại nguyên kỹ năng). Hình vẽ theo đúng ngôn ngữ đó: khung hai ô
  "nhà ↔ mây" ngăn bằng nét đứt.
- Zero Trust dạy bằng cặp tương phản perimeter-trước-đã (lâu đài–hào
  nước, kèm điểm chết di chuyển ngang) rồi mới tới Zero Trust — bản
  thân cách dạy cũng là contrast case.
- 8 hình ConceptVisual mới; đo getBBox 106 hình trên /design — 0 tràn
  khung. Không sửa engine, không i18n mới, không test đặc thù cần thêm
  (bất biến chung + luật schema đã phủ; module này không lab/cung điện).
- 744/744 test xanh, typecheck sạch, build qua, content:review render
  10 module. Kiểm browser: deep-link `/bai/m10-bai-1` render hook + hình
  cloud đúng.

**Khối 8.5 đã làm gì** (khép hạng mục 8):
- **Vá 2 lỗi thật tìm thấy khi kiểm tổng:** (1) chữ "Ví dụ giải sẵn"
  hiện LẶP ĐÔI ở bước Thử tay — LessonPlayer tự thêm nhãn mà nội dung
  M6-M10 cũng mở đầu bằng đúng cụm đó; đã cắt khỏi cả 6 workedExample
  (M6, M7, M8, M9×2, M10) và ghi thành luật soạn bài trong CLAUDE.md.
  (2) Trên 375px, hàng bài KHÓA bị ép tựa đề thành mỗi-từ-một-dòng vì
  nhãn "Học xong bài trước…" chiếm nửa hàng — nhãn giờ co tối đa 40%.
- Kiểm browser tổng: đi TRỌN bài m8-bai-1 cả 6 bước trên trình duyệt
  thật (pretest → 2 màn dạy → worked example + 2 bài tập → retrieval +
  tự giải thích được chấm keyword → tổng kết +30 XP, store ghi đúng);
  mobile 375px: trang Học (bản đồ chặng + checklist VMware) và bài cung
  điện GPO xếp một cột, scrollWidth = 375 không tràn; theme sáng render
  sạch ở cả hai màn vừa kiểm.
- `KICH-BAN-TEST.md` thêm mục 9 — buổi test người thật Phần C, hai buổi
  cách một đêm, ĐO ĐÚNG BA KỸ THUẬT của ba module: 4 tình huống
  interleaving IPv4↔IPv6 (đạt ≥ 3/4 nói đúng hệ + tên cơ chế), điền lại
  tòa GPO 4 tầng trên giấy + câu "Domain bảo A, OU bảo B" (phải nhắc
  hình/tầng khi hỏi "sao nhớ"), 3 cặp contrast cloud↔on-prem (≥ 2/3 nêu
  đúng tên và một điểm khác).
- `CLAUDE.md` cập nhật: cấu trúc hạng mục (8) hoàn chỉnh + luật
  workedExample không tự viết nhãn.
- Đối chiếu DoD (spec mục 6) cho Module 8-10: đủ 6 bước (schema tuple ép,
  parse xanh), flashcard tự sinh đủ (8+8+10 concept + 4 thẻ phòng GPO),
  một màn một khái niệm (schema ép, không màn nào lặp concept) — ĐẠT;
  test người thật là việc treo cần người (kịch bản đã soạn).
- 744/744 test xanh, typecheck sạch, build qua, content:review render
  lại 10 module sau khi sửa workedExample.

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

## Deploy GitHub Pages — ĐÃ LIVE

- Repo: https://github.com/ThienPhuc-2005/netmaster (public)
- App: https://thienphuc-2005.github.io/netmaster/
- Commit đầu `a87155b` "NetMaster Phase 1: pedagogy engine + Module 1-3
  + deploy", author Nguyen Van Thien Phuc. Workflow run đầu xanh cả
  build lẫn deploy; đã kiểm app live + deep-link /on-tap render đúng.

### Ghi chú kỹ thuật deploy (giữ để tra sau)

- `vite.config.ts` đọc `GHPAGES_BASE`; workflow `.github/workflows/deploy.yml`
  truyền `/<tên-repo>/` tự động → đổi tên repo không phải sửa code.
- Routing: giữ BrowserRouter + basename từ `import.meta.env.BASE_URL`,
  trick 404 = copy `index.html` → `404.html` trong workflow (URL sạch,
  không hash). Đã kiểm bằng server mô phỏng Pages: deep-link
  `/netmaster/bai/m1-bai-2` render đúng bài, link nội bộ mang đúng prefix.
- Pipeline: push `main` → test + typecheck (đỏ là dừng) → build → deploy.
  Lần đầu cần bật Settings → Pages → Source → GitHub Actions.
- README.md (4 ảnh chụp thật trong `docs/`), LICENSE (MIT, Nguyen Van
  Thien Phuc). Git identity cấp repo: Nguyen Van Thien Phuc /
  thienphuc.security@gmail.com (GitHub: ThienPhuc-2005). Pages bật qua
  API (`build_type: workflow`), không cần bấm tay trong Settings.
  CHƯA commit/push — người dùng tự làm để giữ authorship.

## Khối 6 còn lại làm gì

1. Đối chiếu từng tiêu chí Definition of Done (spec mục 6) cho toàn
   Phase 1, in rõ ĐẠT / CHƯA ĐẠT / LÀM KHÁC.
2. Soạn kịch bản test người thật: một người chưa biết gì về mạng học hết
   Module 1-2 rồi **vẽ lại đường đi gói tin từ trí nhớ**.
3. Xử lý các mục chưa đạt phát sinh từ hai việc trên.
