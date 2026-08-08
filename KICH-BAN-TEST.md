# Kịch bản test người thật

Phần lõi (mục 1-6): Phase 1, Module 1-2. Buổi bổ sung: Module 4 (mục 7),
Module 5 (mục 8) và Phần C — Module 8-9-10 (mục 9) — làm sau khi người
tham gia đã qua phần lõi.

Mục tiêu: kiểm chứng Definition of Done cuối cùng của Phase 1 (spec mục 6):
**một người chưa biết gì về mạng, sau khi tự học Module 1-2 trong app,
vẽ lại được đường đi của gói tin từ trí nhớ.**

Tài liệu này dành cho người điều phối buổi test (bạn). Người tham gia
không đọc tài liệu này.

## 1. Chọn người tham gia

- 1 người (tốt nhất 2-3 người để kết quả đỡ may rủi) **chưa từng học
  mạng máy tính**: không biết IP là gì, không phân biệt router/modem.
  Hỏi sàng lọc trước: "DNS là gì?" — nếu trả lời được thì chọn người khác.
- Biết dùng máy tính ở mức gõ phím, dùng trình duyệt.
- Không phải người thân quen với dự án (tránh thiên vị khen).

## 2. Chuẩn bị

- Máy tính có màn hình ≥ 13", trình duyệt Chrome/Edge mới.
- Chạy `npm run dev`, mở app ở cửa sổ ẩn danh (localStorage sạch —
  người tham gia phải thấy onboarding như người dùng mới thật).
- Giấy trắng A4 + bút (cho bài vẽ cuối).
- Đồng hồ/điện thoại bấm giờ. Nếu người tham gia đồng ý, quay màn hình.
- Lịch: **3 buổi cách nhau ít nhất 1 đêm** (lịch ôn SM-2 cần qua ngày
  mới có thẻ đến hạn — đừng dồn 1 buổi, sẽ không test được vòng ôn tập).

| Buổi | Nội dung | Thời lượng dự kiến |
|------|----------|--------------------|
| 1 | Onboarding + Module 1 (6 bài) + thi Module 1 | 60-90 phút |
| 2 (hôm sau) | Ôn thẻ đến hạn + Module 2 (4 bài) + thi Module 2 | 45-75 phút |
| 3 (cách buổi 2 ít nhất 1 ngày) | Ôn thẻ + **bài vẽ từ trí nhớ** | 20-30 phút |

## 3. Luật cho người điều phối

- **Không dạy, không gợi ý, không cầm chuột hộ.** Chỉ được trả lời câu
  hỏi về THAO TÁC ("bấm đâu để tiếp tục?"), không bao giờ trả lời câu
  hỏi về NỘI DUNG ("DNS là gì?"). Câu trả lời chuẩn: "Bạn cứ thử theo
  cách bạn hiểu, sai cũng không sao."
- Khuyến khích **nghĩ thành tiếng** (think-aloud): "Bạn cứ nói ra bạn
  đang nghĩ gì, đang định bấm gì."
- Ghi chép theo mẫu ở mục 6. Ghi cả giờ bắt đầu/kết thúc từng module.

## 4. Các bước thao tác & điểm quan sát

### Buổi 1 — Onboarding + Module 1

1. Đưa người tham gia vào app (cửa sổ ẩn danh). Nói đúng một câu:
   "Đây là app tự học mạng máy tính, bạn cứ dùng theo ý mình."
   - **Quan sát:** họ có bấm "Gửi gói tin" trong vòng 60 giây đầu không?
     Có phản ứng gì khi thấy gói tin chạy (à/ồ, cười, im lặng)?
2. Để họ tự học hết 6 bài Module 1 ("Mạng là gì? — Câu chuyện bưu điện").
   - **Quan sát mỗi bài:** có đọc Hook/Pretest hay bấm lướt? Ở bước
     Thử tay, sai lần 1-2 họ phản ứng thế nào với lời phản hồi (có đọc
     gợi ý không, có nản không)? Bước Nhớ lại họ có cố nhớ thật hay
     đoán bừa?
   - **Quan sát chuyển bài:** có hiểu bản đồ chặng không, có tìm cách
     "nhảy cóc" bài khóa không (và có hiểu vì sao khóa không)?
3. Hết 6 bài, để họ tự thấy nút thi và tự vào "Thi cuối module".
   - **Quan sát:** điểm lần 1; nếu < 85%, họ có đọc "Những ý cần ôn lại"
     rồi thi lại không, hay bỏ cuộc? (Không giục thi lại — xem app có
     tự kéo họ lại được không.)
4. Kết buổi: hỏi miệng 2 câu, ghi nguyên văn câu trả lời:
   - "Bạn kể mình nghe: một tấm ảnh đi từ máy bạn sang máy bạn của bạn
     như thế nào?"
   - "Có chỗ nào trong app làm bạn khó chịu hoặc bối rối không?"

### Buổi 2 — Ôn tập + Module 2

5. Mở app. **Quan sát quan trọng nhất buổi:** app phải tự đưa vào màn
   Ôn tập (thẻ Module 1 đến hạn). Người tham gia có hiểu vì sao không?
   Có tự đánh giá thật lòng ("Mình nhớ"/"Chưa nhớ ra") không?
6. Học 4 bài Module 2 ("Đường đi của gói tin").
   - **Quan sát:** bài cuối có bài xếp 8 chặng — họ xếp mất bao lâu,
     sai mấy lần? Phần "GÕ lại hành trình từ trí nhớ" họ viết được
     mấy ý (app chấm theo 6 nhóm từ khóa — ghi lại app báo thiếu ý nào)?
7. Thi Module 2, ghi điểm lần 1 và số lần thi.
8. Kết buổi: KHÔNG báo trước buổi 3 có bài vẽ (tránh học tủ).

### Buổi 3 — Ôn tập + BÀI VẼ TỪ TRÍ NHỚ (tiêu chí đậu chính)

9. Mở app, ôn thẻ đến hạn như thường lệ. Sau đó **đóng app / tắt màn hình**.
10. Đưa giấy bút, đọc đúng đề bài này:
    > "Bạn gõ google.com vào trình duyệt và bấm Enter. Hãy vẽ đường đi
    > của gói tin từ máy bạn đến khi trang web hiện lên — vẽ sơ đồ các
    > chặng, có mũi tên chỉ hướng, và chú thích mỗi chặng bằng lời của
    > bạn. Không cần thuật ngữ chuẩn, vẽ theo cách bạn hiểu."
    - Không giới hạn thời gian chặt; quá 15 phút thì dừng.
    - Không nhắc, không hỏi mớm ("thế còn DNS?" là phạm luật).
11. Vẽ xong, yêu cầu họ **thuyết minh miệng** sơ đồ của chính họ (1-2
    phút) — để phân biệt "nhớ vẹt hình" với "hiểu thật". Ghi âm/ghi chép.

## 5. Chấm bài vẽ

Đối chiếu sơ đồ + lời thuyết minh với 8 ý. Mỗi ý tính ĐẠT khi có mặt
trong hình hoặc lời thuyết minh, **diễn đạt đời thường vẫn tính**
(cột phải là ví dụ đạt):

| # | Ý cần có | Ví dụ diễn đạt đời thường vẫn tính đạt |
|---|----------|----------------------------------------|
| 1 | Gõ tên trang, tên chưa phải địa chỉ | "google.com chỉ là cái tên" |
| 2 | Hỏi DNS để đổi tên ra địa chỉ | "tra danh bạ ra số nhà" |
| 3 | Nhận về địa chỉ IP | "được dãy số địa chỉ" |
| 4 | Dữ liệu chia thành gói tin, ghi địa chỉ đích | "cắt nhỏ bỏ phong bì, ghi địa chỉ" |
| 5 | Ra khỏi mạng nhà qua gateway/router nhà | "qua cổng làng / qua cục wifi nhà" |
| 6 | Nhiều router chuyền tay nhau trên Internet | "các trạm bưu điện chuyền tiếp" |
| 7 | Server nhận và gửi phản hồi ngược lại | "máy chủ gửi trang web về" |
| 8 | Máy mình ráp các gói lại thành trang web | "ghép các mảnh lại, hiện lên màn hình" |

Kết luận:

- **ĐẬU: ≥ 6/8 ý, trong đó bắt buộc có ý 2 (DNS), ý 4 (chia gói),
  ý 6 (router chuyền tiếp), và hướng mũi tên đúng (có chiều đi và
  chiều về).** Thứ tự các chặng về cơ bản đúng (đảo 2 chặng kề nhau
  không quá 1 lần).
- **ĐẬU VỚI GHI CHÚ:** đủ điều kiện trên nhưng thuyết minh miệng lộ
  hiểu sai 1 khái niệm → ghi lại khái niệm đó để sửa nội dung bài.
- **RỚT:** < 6 ý, hoặc thiếu 1 trong 4 ý bắt buộc, hoặc chỉ vẽ được
  hình mà không thuyết minh nổi. Rớt nghĩa là NỘI DUNG hoặc CƠ CHẾ HỌC
  chưa đạt — mở lại nội dung Module 1-2 để sửa, không đổ cho người học.

## 6. Mẫu ghi chép (điền cho từng người)

```
Người tham gia: … (tuổi/nghề: …)        Ngày: …
Buổi 1: bắt đầu …h — kết thúc …h
  Onboarding: bấm gửi gói tin sau … giây; phản ứng: …
  Module 1: bài dừng lâu nhất: … ; số lần sai nhiều nhất ở: …
  Thi M1: lần 1 …% ; số lần thi: … ; có đọc "ý cần ôn": có/không
  Trả lời miệng cuối buổi: …
Buổi 2: app có tự vào Ôn tập: có/không ; nhớ …/… thẻ
  Bài xếp 8 chặng: … phút, sai … lần
  GÕ lại hành trình: app báo thiếu ý: …
  Thi M2: lần 1 …% ; số lần thi: …
Buổi 3: nhớ …/… thẻ
  BÀI VẼ: đạt …/8 ý ; thiếu ý số: … ; mũi tên 2 chiều: có/không
  Thuyết minh: …
  KẾT LUẬN: ĐẬU / ĐẬU CÓ GHI CHÚ / RỚT
Điều bất ngờ nhất quan sát được: …
```

## 7. Buổi bổ sung — Module 4 (phòng lab)

Chỉ làm buổi này **sau khi** người tham gia đã qua bài vẽ ở mục 5. Mục
tiêu khác hẳn: không kiểm trí nhớ nữa mà kiểm **năng lực chẩn đoán** —
người học có tự tìm ra bệnh của một mạng hỏng không.

### Chuẩn bị thêm

- Máy có màn hình rộng (lab thao tác thoải mái nhất từ 1280px trở lên).
- **Nếu muốn kiểm cả điện thoại**: chuẩn bị thêm một máy 375px. Lab được
  thiết kế để hoàn thành được trên mobile (mọi thao tác có đường bấm
  chọn, sơ đồ cuộn ngang) — buổi test là chỗ để xác nhận điều đó có đúng
  với người thật hay không.

### Các bước và điểm quan sát

1. Để họ học bài 1 → 3 của Module 4 (switch, bảng MAC, ARP).
   - **Quan sát bài 2:** đây là lab đầu tiên — lắp mạng từ thiết bị rời.
     Họ tìm ra cách nối dây trong bao lâu? Có bấm "Gửi thử" trước khi
     hiểu đề không? Có đọc nhật ký chặng không, hay chỉ nhìn kết quả?
2. **Bài 4 — quan sát kỹ nhất buổi này.** Bước Đoán thử mở ra một mạng
   hỏng TRƯỚC khi dạy chữ nào về VLAN.
   - Họ có tự bấm "Gửi thử" không, hay ngồi chờ hướng dẫn?
   - Họ đoán bệnh gì? Ghi **nguyên văn** câu họ nói. Nhiều người sẽ nghi
     dây, nghi IP, nghi switch hỏng — đó chính là dữ liệu quý.
   - Họ có mò ra VLAN không? Không mò ra cũng **hoàn toàn đạt** — bước
     này thiết kế để gây tò mò, không phải để đúng.
   - Sau khi đọc lời giải thích ở màn đáp án, nét mặt có "à ra thế" không?
3. Để họ học tiếp phần lý thuyết VLAN rồi làm lab ở bước Thử tay.
   - **Điểm quan sát quan trọng:** lab này có hai yêu cầu — hai máy kế
     toán phải gọi được nhau, VÀ kế toán không được thấy kỹ thuật. Rất
     nhiều người sẽ gộp tất cả vào một VLAN cho nhanh. Khi bài báo chưa
     đạt, họ có tự nhận ra mình vừa phá yêu cầu thứ hai không?
   - Họ dùng "Gửi thử" mấy lần trước khi bấm "Nộp bài"? Có hiểu rằng gửi
     thử không tính điểm không?
4. Học nốt bài 5 rồi thi Module 4. Đề rút 8 câu từ pool 12 và luôn có
   một câu lab (câu lab là "câu trụ", lượt thi nào cũng phải làm).
   - Ghi điểm lần 1 và số lần thi lại.
   - **Nếu họ thi lại:** hỏi xem đề lần hai có giống lần đầu không. Đề
     phải khác — đó là lý do pool tồn tại.

### Tiêu chí đậu của buổi này

Sau khi học xong Module 4, đưa họ **một mạng hỏng chưa từng gặp** (mở
lại bài 4, bấm "Về sơ đồ ban đầu", rồi tự tay đổi một cổng sang VLAN
khác trước khi giao máy). Yêu cầu: tìm ra chỗ hỏng và sửa.

- **ĐẬU:** tự tìm ra trong vòng 5 phút, và **nói được vì sao** — đại ý
  "hai máy này đang ở hai VLAN khác nhau nên không nghe thấy nhau". Diễn
  đạt đời thường vẫn tính; không cần dùng đúng từ "miền quảng bá".
- **ĐẬU CÓ GHI CHÚ:** sửa đúng nhưng giải thích sai cơ chế (ví dụ nói
  "vì IP khác dải") — ghi lại để sửa nội dung bài.
- **RỚT:** không tìm ra, hoặc sửa bằng cách thử ngẫu nhiên từng cổng cho
  tới khi xanh. Rớt nghĩa là bài 4 chưa dạy được cách chẩn đoán — mở lại
  nội dung bài đó, đừng đổ cho người học.

### Mẫu ghi chép bổ sung

```
Buổi Module 4: bắt đầu …h — kết thúc …h
  Bài 2 (lab lắp mạng): nối xong sau … phút; có đọc nhật ký chặng: có/không
  Bài 4 bước Đoán thử: tự bấm Gửi thử: có/không
    Đoán bệnh gì (nguyên văn): …
    Có mò ra VLAN không: có/không
  Bài 4 bước Thử tay: có gộp hết vào một VLAN không: có/không
    Số lần Gửi thử trước khi Nộp: …
  Thi M4: lần 1 …% ; số lần thi: … ; làm được câu lab cuối: có/không
  BÀI CHẨN ĐOÁN CUỐI: tìm ra sau … phút
    Giải thích (nguyên văn): …
    KẾT LUẬN: ĐẬU / ĐẬU CÓ GHI CHÚ / RỚT
  (Nếu có thử trên điện thoại) thao tác được trọn vẹn: có/không; vướng ở đâu: …
```

## 8. Buổi bổ sung — Module 5 (cung điện ký ức)

Chỉ làm **sau** buổi Module 4 (mục 7). Mục tiêu: kiểm xem cung điện ký
ức có làm đúng việc của nó không — 15 con số rời rạc phải BÁM lại được
sau ít nhất một đêm, nhờ chỗ và hình chứ không nhờ học vẹt.

### Lịch — bắt buộc hai buổi cách nhau một đêm

Trí nhớ dài hạn chỉ đo được sau giấc ngủ. Dồn một buổi là chỉ đo trí
nhớ ngắn hạn — vô nghĩa với module này.

| Buổi | Nội dung | Thời lượng |
|------|----------|-----------|
| A | Học hết 8 bài Module 5 + thi module | 60-90 phút |
| B (hôm sau trở đi) | Ôn thẻ đến hạn + **bài đi lại trên giấy** | 20-30 phút |

### Buổi A — các điểm quan sát

1. Ba bài đầu (TCP, bắt tay, UDP, số cổng) quan sát như mọi bài thường.
   Riêng câu SYN-ACK: họ có nhớ nhầm thứ tự không, và hình vẽ nhấn nhịp
   giữa có được họ nhắc tới khi tự giải thích không?
2. **Bài 4 — lần đầu gặp cung điện.** Quan sát kỹ:
   - Ở chuyến đi xem, họ có ĐỌC câu chuyện từng phòng không hay bấm lướt
     "Sang phòng kế" cho nhanh? (Bấm lướt là tín hiệu xấu — encoding
     không xảy ra thì lát nữa chuyến đi lại sẽ lộ ngay.)
   - Ở chuyến đi lại ngay trong bài, họ nhớ được mấy phòng ngay lần đầu?
     Khi quên, phản hồi tầng 1 ("nghĩ lại về hình bạn thấy trong phòng")
     có giúp họ tự nhớ ra không, hay phải tới tầng 2 (kể lại chuyện)?
3. Các bài 5-8 (mỗi bài một tầng): ghi lại tầng nào vấp nhiều nhất.
   Theo thiết kế, cặp 22/23 và cặp 25/587 là chỗ dễ lẫn — xem có đúng.
4. Thi module: 3 câu cuối là đi lại cả tòa nhà. Ghi điểm lần 1, số phòng
   phải mở đáp án (nếu có), số lần thi.

### Buổi B — bài đi lại trên giấy (tiêu chí đậu chính)

5. Mở app, ôn thẻ đến hạn (thẻ phòng sẽ chiếm phần lớn phiên ôn). Ghi
   số thẻ nhớ được. Sau đó **đóng app**.
6. Đưa giấy kẻ sẵn lưới 5 hàng × 3 cột (hàng dưới cùng ghi "Tầng 1"),
   đọc đúng đề bài này:
   > "Đây là tòa nhà trong app. Bạn đi lại nó từ trí nhớ: điền vào mỗi
   > phòng số cổng và tên dịch vụ, theo đúng thứ tự bạn đã đi — tầng
   > trệt lên nóc, trái sang phải. Nhớ hình trong phòng trước cũng được."
   - Không nhắc, không gợi ý. Quá 10 phút thì dừng.
7. Chấm: mỗi phòng ĐẠT khi đúng cả số lẫn dịch vụ (tên đời thường vẫn
   tính: "web có khóa" = HTTPS). Đúng số sai chỗ = nửa điểm, ghi chú lại.

Kết luận:

- **ĐẬU: ≥ 12/15 phòng, và khi được hỏi "sao bạn nhớ được số này?" với
  2 phòng bất kỳ, câu trả lời có nhắc tới HÌNH hoặc CHỖ** ("phòng có ổ
  khóa vàng", "nó ở góc trái tầng hai") — chứng tỏ cung điện làm việc,
  không phải học vẹt đè lên.
- **ĐẬU CÓ GHI CHÚ:** ≥ 12/15 nhưng giải thích không nhắc hình/chỗ nào
  (có thể họ nhớ theo cách riêng — không sao, nhưng ghi lại).
- **RỚT:** < 12/15. Xem lại phòng nào rớt nhiều: nếu dồn vào một tầng
  thì câu chuyện của tầng đó chưa đủ dính — mở issue nội dung cho đúng
  các phòng đó, đừng đổ cho người học.

### Mẫu ghi chép bổ sung

```
Buổi A: bắt đầu …h — kết thúc …h
  Bài 4 chuyến đi xem: có đọc chuyện từng phòng: có/không
  Chuyến đi lại trong bài: nhớ ngay …/3 phòng; tầng phản hồi cao nhất phải dùng: …
  Tầng vấp nhiều nhất (bài 5-8): tầng … ; cặp bị lẫn: …
  Thi M5: lần 1 …% ; số phòng phải mở đáp án: … ; số lần thi: …
Buổi B: ôn thẻ: nhớ …/… thẻ
  BÀI ĐI LẠI TRÊN GIẤY: đúng …/15 phòng (nửa điểm: …)
  Hỏi "sao nhớ được": có nhắc hình/chỗ: có/không — nguyên văn: …
  KẾT LUẬN: ĐẬU / ĐẬU CÓ GHI CHÚ / RỚT
```

## 9. Buổi bổ sung — Phần C (Module 8-9-10)

Chỉ làm **sau** buổi Module 5 (mục 8), và người tham gia phải tự học
xong Module 6-7 trước đó. Ba module Phần C dùng ba kỹ thuật khác nhau,
nên buổi này đo ba thứ khác nhau — đừng gộp thành một bài kiểm chung.

### Lịch — hai buổi cách nhau một đêm

| Buổi | Nội dung | Thời lượng |
|------|----------|-----------|
| A | Học Module 8 + 9 (kèm thi từng module) | 2 buổi nhỏ hoặc 1 buổi dài 2-3 giờ |
| B (hôm sau trở đi) | Ôn thẻ + Module 10 + ba bài đo cuối | 60-90 phút |

Nếu người tham gia có máy đủ mạnh và VMware, khuyến khích họ làm
checklist lab AD song song ở nhà giữa hai buổi (app có sẵn checklist ở
trang Học, không tính điểm) — ghi lại họ tick được tới bước mấy.

### Buổi A — điểm quan sát

1. **Module 8, bài 4-5 (interleaving):** khi câu IPv4 chen giữa các câu
   IPv6 ("đổi hệ quy chiếu"), họ có khựng lại không? Có nhận ra "câu
   này là chuyện hệ cũ" trước khi trả lời không, hay trả lời máy móc?
2. **Module 9, bài 4 (cung điện GPO):** như buổi Module 5 — có đọc
   chuyện từng tầng không hay bấm lướt; chuyến đi lại trong bài nhớ
   ngay mấy tầng.
3. **Module 9, bài 3 → 5 (fading GPO):** ở bài 5, câu "yêu cầu suông"
   (cấm USB phòng Kế toán) họ tự dựng được lời giải không, hay phải mở
   gợi ý? Đây là phép đo trực tiếp của worked example fading.

### Buổi B — ba bài đo cuối (làm sau khi ôn thẻ, ĐÓNG APP)

4. **Đo interleaving (Module 8)** — đọc lần lượt 4 tình huống, yêu cầu
   nói "chuyện của hệ nào, cơ chế tên gì":
   - "Máy 192.168.1.10 mở web, địa chỉ nguồn bị đổi ở router" → IPv4, NAT
   - "Máy vừa bật đã có địa chỉ bắt đầu fe80" → IPv6, link-local
   - "Máy xin địa chỉ qua 4 nhịp hỏi–đề nghị–chốt–gật" → IPv4, DHCP/DORA
   - "Máy nghe router rao tên khu phố rồi tự ghép địa chỉ" → IPv6, SLAAC
   **ĐẠT: ≥ 3/4, nói đúng cả hệ lẫn tên cơ chế** (tên đời thường vẫn tính).
5. **Đo cung điện GPO (Module 9)** — giấy kẻ 4 ô chồng dọc, đề bài:
   "Điền lại tòa nhà bốn tầng từ trệt lên nóc: tầng nào, bậc GPO nào,
   áp cho ai." Sau đó hỏi: "Domain bảo A, OU bảo B — máy nghe ai, vì
   sao?" **ĐẠT: đủ 4 tầng đúng thứ tự + trả lời được \"OU thắng vì áp
   sau\"; khi hỏi \"sao nhớ được\" có nhắc tới HÌNH hoặc TẦNG.**
6. **Đo contrast cases (Module 10)** — hỏi 3 cặp: "Trên mây, cái tương
   ứng với VLAN là gì?", "…với tường lửa nhà là gì?", "…với AD DS là
   gì?" **ĐẠT: ≥ 2/3 nêu đúng tên cloud VÀ nói được một điểm khác**
   ("security group thì bám từng máy" là đủ).

Kết luận chung: ĐẬU khi đạt cả ba bài đo; đậu 2/3 là ĐẬU CÓ GHI CHÚ
(ghi rõ bài rớt thuộc module nào — đó là nội dung phải sửa); dưới nữa
là RỚT của module tương ứng, mở lại nội dung module đó, không đổ cho
người học.

### Mẫu ghi chép bổ sung

```
Buổi A: bắt đầu …h — kết thúc …h
  M8 interleaving: có khựng khi đổi hệ: có/không; ghi chú: …
  M9 cung điện: đọc chuyện từng tầng: có/không; đi lại nhớ ngay …/4
  M9 bài 5 (yêu cầu suông): tự dựng lời giải: có/không
  Thi M8 …% / M9 …% (lần 1)
  Checklist VMware (nếu làm): tick tới bước …/8
Buổi B: ôn thẻ nhớ …/…
  Đo interleaving: …/4 — sai ở tình huống: …
  Đo cung điện GPO: …/4 tầng; "OU thắng vì áp sau": có/không; nhắc hình/tầng: có/không
  Đo contrast: …/3 — nguyên văn câu hay nhất: …
  Thi M10 …% (lần 1)
  KẾT LUẬN: ĐẬU / ĐẬU CÓ GHI CHÚ / RỚT (module: …)
```

## 10. Buổi bổ sung — Module 11 (Phòng khám mạng)

Đo kỹ năng CHẨN ĐOÁN — mục tiêu của cả module: không phải nhớ đáp án
từng ca, mà cầm terminal lên là biết bắt đầu từ đâu. Người tham gia đã
học xong Module 1-10 (hoặc dùng hồ sơ mồi sẵn của điều phối viên).

**Buổi duy nhất (~60-75 phút):**

1. Học trọn Module 11 (5 bài). Điểm quan sát trong lúc học:
   - Ở ca mở màn mỗi bài (bước Đoán thử): người tham gia CÓ GÕ LỆNH
     trước khi chọn chẩn đoán không, hay chọn bừa? (Chọn bừa không phải
     lỗi — nhưng ghi lại: productive failure phải gây "vật lộn dễ chịu",
     không phải cáu bực. Nếu cáu, ghi nguyên văn câu than.)
   - Có bấm "Chạy lại triệu chứng" trước khi Nộp không?
2. Nghỉ 5 phút, rồi vào tab Phòng khám và đo bằng HAI CA người đó
   chưa chữa khỏi (điều phối viên chọn từ danh sách, ưu tiên một ca
   sửa-sơ-đồ + một ca chọn-hành-động). Luật: điều phối viên chỉ ngồi
   nhìn, không nhắc lệnh.

**Ba bài đo (tiêu chí đậu):**

- **Quy trình khám:** với mỗi ca đo, người tham gia phải THAO TÁC theo
  trình tự có chủ đích (nói to càng tốt): xem giấy tờ máy trước
  (ipconfig) hoặc bắt mạch (ping) trước khi kết luận — không đoán chay.
  Đậu khi cả 2/2 ca đều có ít nhất một lệnh khám TRƯỚC khi chốt chẩn
  đoán, và chẩn đoán đúng ở lượt nộp thứ nhất hoặc thứ hai.
- **Đọc đúng lời từ chối:** hỏi miệng 2 cặp phân biệt: (a) "General
  failure" khác gì "Destination host unreachable"? (b) nslookup
  "request timed out" khác gì "Non-existent domain"? Đậu khi trả lời
  đúng ý ≥ 1.5/2 cặp (nói được phía nào của đường truyền / dịch vụ
  sống hay chết).
- **Tổng ôn trá hình:** trong ca sửa-sơ-đồ đã đo, hỏi "bệnh này dùng
  kiến thức của module nào hồi trước?" — đậu khi chỉ đúng module (VLAN
  → M4, gateway → M3/M4, DNS → M6, GPO → M9…).

Kết luận: ĐẬU khi đạt cả ba; 2/3 là ĐẬU CÓ GHI CHÚ; dưới nữa mở lại
nội dung bài tương ứng (bài nào dạy manh mối bị bỏ lỡ), không đổ cho
người học.

### Mẫu ghi chép bổ sung

```
Buổi M11: bắt đầu …h — kết thúc …h
  Ca Đoán thử: gõ lệnh trước khi đoán ở …/5 bài; câu than (nếu có): …
  "Chạy lại triệu chứng" trước khi nộp: có/không
  Đo 2 ca chưa gặp: ca 1 (loại …): lệnh đầu tiên …, chẩn đoán đúng lượt …
                    ca 2 (loại …): lệnh đầu tiên …, chẩn đoán đúng lượt …
  Cặp phân biệt (a): đúng/sai — (b): đúng/sai
  Chỉ đúng module gốc của bệnh: có/không
  Thi M11 …% (lần 1)
  KẾT LUẬN: ĐẬU / ĐẬU CÓ GHI CHÚ / RỚT (bài cần mở lại: …)
```

## 11. Buổi bổ sung — Module 12 (PowerShell)

Đo GENERATION EFFECT — mục tiêu của cả module: không phải nhận ra lệnh
đúng khi nhìn thấy nó, mà tự gõ ra được lệnh trên một terminal trống.
Đây cũng là module cuối của khóa, nên buổi này khép luôn Phần C. Người
tham gia đã học xong Module 1-11 (hoặc dùng hồ sơ mồi sẵn).

**Buổi duy nhất (~60-75 phút):**

1. Học trọn Module 12 (5 bài). Điểm quan sát trong lúc học:
   - Bài 1 mở màn bằng terminal trống ở bước Đoán thử: người tham gia
     có GÕ THỬ gì không, hay ngồi im chờ "Nộp bài"? (Ngồi im không phải
     lỗi — nhưng ghi lại: nếu người học không dám gõ, chỗ hỏng nằm ở lời
     mời của đề, không ở người học.)
   - Có ai tự gõ `Get-Help` mà không được nhắc không? Ghi lại ở bài nào.
   - Sau khi `New-ADUser` chạy im lặng: người tham gia có tự gõ
     `Get-ADUser` để kiểm chứng không, hay tin luôn là xong?
2. Nghỉ 5 phút. Đóng app lại, mở một tab terminal của bài đã học (điều
   phối viên chọn bài 3 và bài 5) và đo bằng ba việc dưới đây. Luật:
   điều phối viên chỉ ngồi nhìn, KHÔNG nhắc cú pháp, KHÔNG cho mở lại
   bài. Người tham gia được phép dùng `Get-Help` — đó chính là thứ đang
   đo, không phải gian lận.

**Ba bài đo (tiêu chí đậu):**

- **Tự gõ được lệnh từ đầu:** hai việc, không xem lại bài — (a) kiểm tra
  một cổng cụ thể của một máy chủ có mở không; (b) tạo một user vào đúng
  một OU được chỉ định. Đậu khi cả 2/2 việc đạt mục tiêu trong vòng 2
  lượt nộp, và KHÔNG mở tới tầng lời giải.
- **Tự tra cứu thay vì hỏi:** giữa lúc làm, hỏi chen một tham số người
  tham gia chắc chắn chưa thuộc (ví dụ: "tạo user nhưng để tài khoản ở
  trạng thái khóa thì thêm gì?"). Đậu khi phản xạ đầu tiên là gõ
  `Get-Help New-ADUser` và đọc khối SYNTAX — không đậu nếu quay sang hỏi
  điều phối viên hoặc mở Google.
- **Thấy được đường ống:** đưa một file CSV 4 dòng, yêu cầu tạo tài khoản
  cho cả bốn. Chấp nhận mọi cách làm (gõ tay từng lệnh vẫn được app công
  nhận). Sau khi xong, hỏi miệng: "nếu file có 300 dòng thì bạn làm thế
  nào?" — đậu khi nói được là vẫn MỘT dòng, nối `Import-Csv` với
  `New-ADUser` bằng dấu ống; đậu có ghi chú nếu phải gợi ý một lần.

Kết luận: ĐẬU khi đạt cả ba; 2/3 là ĐẬU CÓ GHI CHÚ; dưới nữa mở lại
bài tương ứng (bài 2 dạy Get-Help, bài 4 dạy dấu ống), không đổ cho
người học.

**Câu hỏi khép khóa** (không tính điểm, chỉ ghi nguyên văn): "Học xong
cả 12 module, việc nào ở chỗ làm bạn nghĩ mình tự xử lý được ngay bây
giờ?" — câu trả lời này đáng giá hơn mọi con số ở trên.

### Mẫu ghi chép bổ sung

```
Buổi M12: bắt đầu …h — kết thúc …h
  Bài 1 (terminal trống): có gõ thử trước khi nộp: có/không
  Tự gõ Get-Help không cần nhắc: có/không (bài số …)
  Tự Get-ADUser kiểm chứng sau New-ADUser: có/không
  Việc (a) kiểm cổng: đạt ở lượt …, có mở lời giải: có/không
  Việc (b) tạo user vào OU: đạt ở lượt …, có mở lời giải: có/không
  Tra cứu khi bí: Get-Help / hỏi người / Google
  Câu "300 dòng thì sao": trả lời …
  Thi M12 …% (lần 1)
  Câu khép khóa (nguyên văn): …
  KẾT LUẬN: ĐẬU / ĐẬU CÓ GHI CHÚ / RỚT (bài cần mở lại: …)
```

## 12. Sau buổi test

- Mỗi mục RỚT hoặc ghi chú hiểu sai → mở issue nội dung: ghi rõ khái
  niệm hiểu sai, bài nào dạy nó, và câu người tham gia đã nói.
- Bối rối THAO TÁC (không tìm thấy nút, không hiểu vì sao bị khóa) →
  issue UX riêng, không trộn với issue nội dung.
- Phase 1 chỉ được coi là khép lại khi có ít nhất 1 người ĐẬU bài vẽ.
