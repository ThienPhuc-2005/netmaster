# Kịch bản test người thật — Phase 1 (Module 1-2)

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

## 7. Sau buổi test

- Mỗi mục RỚT hoặc ghi chú hiểu sai → mở issue nội dung: ghi rõ khái
  niệm hiểu sai, bài nào dạy nó, và câu người tham gia đã nói.
- Bối rối THAO TÁC (không tìm thấy nút, không hiểu vì sao bị khóa) →
  issue UX riêng, không trộn với issue nội dung.
- Phase 1 chỉ được coi là khép lại khi có ít nhất 1 người ĐẬU bài vẽ.
