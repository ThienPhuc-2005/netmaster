# SOÁT TOÀN BỘ CÂU HỎI — biên bản ngày 2026-08-15

> **TÌNH TRẠNG (cập nhật cuối 08-15): đã xử xong phần lớn.**
> - Khối 21.62 (việc A): dựng 3 cổng chặn tự động + nới 23 câu chấm oan.
> - Khối 21.63 (việc B): chữa **76 phát hiện**, bỏ qua 11 (kèm lý do, phần lớn
>   vì người phản biện đã bác chính phát hiện đó), **9 việc để lại thành khối
>   riêng** — đã cất ở mục R của `Y-TUONG.md`.
> - Mỗi file sửa xong có một người SOI LẠI bằng `git diff`. Ba module bị đánh
>   trượt (M8, M13, M15) và đã chữa tay: nặng nhất là M13 — bản sửa thay một
>   câu sai bằng một câu sai NẶNG HƠN (xem mục "Lời giải nói lệch" bên dưới).
> - Số đo sau khi vá: trắc nghiệm đoán được bằng độ dài 23 → 16 · câu thi chép
>   nguyên văn 7 → 5 · tổng câu hỏi 696 → 706 (+10 câu lấp chỗ "dạy rồi không
>   hỏi lại").


> Sinh từ một lượt soát 696 câu hỏi của 21 module. **Cách làm:** 21 người đọc
> (mỗi module một người, đọc trọn bản duyệt nội dung của module đó), rồi MỖI
> phát hiện giao cho một người PHẢN BIỆN riêng — người này mặc định coi phát
> hiện là sai, tự mở file và grep lại để bác. 84 phát hiện thô, **6 bị bác bỏ,
> 78 sống**. Kèm 6 phép quét cơ học chạy trên dữ liệu thật để đối chứng.

> Mỗi dòng dưới đây có mã câu — mở `REVIEW-NOI-DUNG.md` tìm mã đó là thấy nguyên văn.

## Đọc 30 giây

| Lớp lỗi | Số phát hiện | Mức nặng nhất |
|---|---:|---|
| 5. Đáp án chấp nhận quá hẹp — chấm sai người hiểu đúng | 23 | 16 nặng |
| 1. Đề đòi thứ bài chưa dạy | 13 | 8 nặng |
| 4. Đoán được không cần hiểu | 12 | 0 nặng |
| 3. Dạy rồi không bao giờ hỏi lại | 12 | 1 nặng |
| 8. Lời giải nói lệch với đề | 12 | 1 nặng |
| 6. Câu mơ hồ / nhiều đáp án đúng | 4 | 2 nặng |
| 7. Hỏi chữ thay vì hỏi hiểu | 1 | 0 nặng |
| 2. Thiếu bước chuyển | 1 | 0 nặng |

**Ba điều đáng nói nhất:**

1. **Lớp lỗi lớn nhất không phải kiến thức sai — mà là CHẤM SAI NGƯỜI HIỂU ĐÚNG.**
   23 phát hiện, 36 câu, 16/21 module. Nhiều ca nặng tới mức *chính lời giải mẫu
   của app*, gõ nguyên văn vào ô trả lời, vẫn bị chấm sai. Đây là lớp lỗi dạy người
   học một bài học sai lệch: hiểu đúng chưa đủ, phải đoán trúng chữ.
2. **Kiến thức bị nhốt trong ô "Đào sâu hơn" rồi vẫn đem ra chấm** — 12 câu ở 8
   module. Ô đó mặc định ĐÓNG (`LessonPlayer.tsx`, `useState(false)`), không bấm
   thì chưa từng nhìn thấy chữ nào. Cùng một hình dạng với ca `bảng ARP`.
3. **Lời giải / thư cuối module / lời úp mở nói sai hoặc nói ngược bài học** — 11 chỗ.
   Đây là chỗ người học tin tuyệt đối vì nó xuất hiện SAU khi đã trả lời.

## Sáu phép quét cơ học (đối chứng, chạy trên dữ liệu thật)

| Thứ đo | Kết quả |
|---|---|
| Tổng câu hỏi | 696 (108 pretest · 202 thử tay · 116 nhớ lại · 270 pool đề thi) |
| Từ khoá chỉ có trong đề, không bài nào dạy | 1 ca thật: `bảng ARP` (m4-mt-11) |
| Trắc nghiệm có đáp án đúng dài hơn hẳn mồi nhử | 23/214 câu tính điểm |
| Thẻ ôn mặt sau chở ≥3 ý rời | 76/154 thẻ; nặng nhất `Magic number` (204 ký tự, 4 ý) |
| Đề thi trùng nguyên văn câu trong bài | 7 câu (người đọc tìm ra 14 câu kể cả trùng gần) |
| Câu gõ tay chỉ nhận 1 cách viết, đáp án là chữ | 8 câu |
| Bài có bước tự giải thích | **108/108** — lành |
| Câu chỉ hỏi tên gọi | **11%** (62/588) — lành |

**Đã kiểm và KHÔNG phải lỗi** (ghi lại để lượt sau khỏi soi lại): 91% đáp án đúng
nằm ở ô đầu trong dữ liệu, nhưng `QuestionInput.tsx` xáo trộn lựa chọn lúc hiện ra
— một hội đồng trước đã bắt và chữa. APIPA, Double NAT đều có dạy đàng hoàng.

## Lớp lỗi lặp lại — thứ nên chặn bằng LUẬT, không phải vá từng câu

### Ô "Chấp nhận" hẹp hơn chính lời app tự dạy, tự gợi ý, tự giải
*36 câu · 16/21 module: M1, M2, M3, M6, M7, M8, M10, M11, M12, M13, M14, M15, M16, M17, M18, M20, M21*

Đây là lớp lỗi lớn nhất của cả lượt soát, chiếm gần một nửa số phát hiện. Cùng một cảnh lặp lại ở 16 module: người học hiểu đúng, gõ ra đúng chữ mà chính app vừa mớm cho họ (lời gợi ý tầng 2, câu trong bài dạy, lời giải mẫu, mặt sau thẻ ôn) và bị chấm sai. Ba biến thể: (a) accept chỉ có bản dài, thiếu cách nói rút gọn tự nhiên của tiếng Việt ("đông máy nhất" có, "đông nhất" không); (b) câu trả lời tự nhiên là một câu phủ định, mà bộ chấm khi thấy chữ "không/chưa" thì tắt luôn chế độ khớp-chứa, trong khi accept không có mục phủ định nào — người trả lời đúng bị khoá cứng; (c) cùng một khái niệm nhưng phòng thi chấm CHẶT HƠN bài học (m6-mt-4, m7-mt-11, m10-mt-1 dùng đúng từng chữ đề của câu trong bài mà accept lại bị cắt bớt). Ít nhất 8 câu thuộc lớp này nằm thẳng trong đề thi, tức chấm oan ngay ở cửa 85%.

**Luật đề xuất:** Nới cổng tự động đang có ở content.test.ts ("LỜI GIẢI của app phải qua được chính BỘ CHẤM của app"). Hiện nó chỉ soi mệnh đề đầu của lời giải và bỏ qua mọi lời giải dài hơn 9 chữ — nên phần lớn ca hỏng lọt lưới. Ba việc: (1) soi thêm lời gợi ý tầng 2 và tầng 3, vì đó là chữ app mớm thẳng vào miệng người học; (2) nếu lời giải hoặc gợi ý có chữ phủ định mà cả danh sách accept không mục nào mang phủ định thì báo đỏ (lá chắn phủ định sẽ khoá người trả lời đúng); (3) hai câu dùng chung một đề thì accept của câu THI phải là tập cha của accept câu HỌC, không bao giờ hẹp hơn. Kèm luật soạn bài: mở accept phải kiểm ngược bằng 5-6 cách nói đúng và vài câu sai, đừng thêm cụm 2-3 chữ trần vì nó cho lọt câu sai.

### Đề thi chép lại nguyên văn câu đã làm trong bài
*14 câu · M2, M3, M6, M7, M8, M9, M10, M12, M13, M14, M16, M20 (nặng nhất M13 4/12, M9 4-5/12; theo tỉ lệ thì M7 và M13 trùng 50%, M16 47%, M6 và M14 42%)*

Câu trong pool đề thi bê nguyên đề, nguyên con số, có khi nguyên cả danh sách chấp nhận của câu người học vừa tự tay làm ở bước Thử tay hoặc Nhớ lại. Hệ quả là cửa ải 85% đo việc nhớ mặt chữ chứ không đo kỹ năng: m13-mt-4 và m13-mt-5 trùng gần từng chữ với câu luyện; m3-mt-10 hỏi đúng cái IP 10.0.5.77 đã luyện nên nhớ đáp án cũ là qua mà không cần nhẩm; m8-mt-2 là bản sao của m8-b2-pra-2; m20-mt-ps2 gần như bản sao của bài terminal ở bài 3. Cửa mastery là thứ duy nhất chặn người chưa hiểu đi tiếp, mà nó đang mẻ một góc.

**Luật đề xuất:** Thêm một cổng tự động đo độ trùng giữa pool đề thi và câu trong bài của cùng module: trùng nguyên văn đề thì đỏ ngay; tỉ lệ câu trùng-gần vượt 25% pool thì đỏ; riêng câu tính toán (IP, mask, prefix) thì cấm dùng lại đúng con số đã xuất hiện ở bước Thử tay/Nhớ lại. Luật soạn bài đi kèm: đề thi được phép hỏi lại đúng KHÁI NIỆM nhưng phải thay vỏ tình huống và thay con số — giữ khái niệm, đổi cảnh.

### Kiến thức bị nhốt trong ô "Đào sâu hơn" rồi vẫn đem ra chấm
*12 câu · M1, M3, M5, M7, M10, M11, M12, M16 (và một phần M15)*

Ô "Đào sâu hơn" mặc định gấp lại, không bấm thì không bao giờ thấy. Vậy mà nhiều mẩu kiến thức chỉ sống ở đó lại bị đem ra chấm điểm: luật "mỗi router trừ TTL đi 1" (m11-mt-4), bảng quy đổi prefix sang mask (m3-mt-10), lý do tách port 25/587 để chống thư rác (câu tự giải thích của m5-bai-7, chấm theo nhóm ý nên thiếu ý là trượt), lời đáp "Request timed out" (ca khó nhất bài 5 M11), ý chia nhỏ gói vì đường truyền là của chung (chấm ở phần tự giải thích M1). Người học đi đúng đường thẳng qua các màn dạy vẫn bị hỏi thứ họ chưa từng nhìn thấy — nhiều chỗ họ vẫn đoán trúng bằng loại trừ, nhưng đó là may chứ không phải hiểu.

**Luật đề xuất:** Luật một dòng, dễ nhớ: thứ gì có mặt trong phần CHẤM ĐIỂM thì phải có mặt trong THÂN màn dạy — ô Đào sâu chỉ được chứa thứ làm giàu thêm, không được chứa thứ bắt buộc. Cổng tự động làm được ngay cho phần dễ nhất: mọi từ khoá của câu tự giải thích phải xuất hiện trong thân màn dạy của chính bài đó, không tính deepDive. Với đề thi thì làm cổng cảnh báo: cụm khoá trong lời giải mà chỉ tìm thấy ở deepDive của cả 21 module thì in ra danh sách để người soạn tự quyết.

### Trắc nghiệm cho điểm mà không đo gì: mồi nhử chết, đáp án dài nhất, mẹo "chọn cái khác đám"
*15 câu · M2, M5, M7, M8, M9, M10, M19, M21 (nặng nhất M10: cả 12 câu trắc nghiệm trong bài đều có đáp án đúng là phương án dài nhất)*

Bốn kiểu tặng điểm lặp đi lặp lại. Một: mồi nhử vô lý tới mức chưa học cũng gạch được (m19-mt-12 cả hai mồi đều tự mâu thuẫn với đề; m21-mt-9 có mồi bàn chuyện ra đề chứ không bàn chuyện mạng; m8-b2-pra-1 có mồi "không cần mật khẩu nữa"). Hai: đáp án đúng dài gấp ba bốn lần mồi nhử nên bấm câu dài nhất là trúng — cổng chống cue-độ-dài hiện chỉ gác đề thi, còn câu trong bài thì bỏ ngỏ, và M10 lọt trọn 12 câu. Ba: xếp hai phương án cùng cực với một phương án ngược, mà lần nào đáp án đúng cũng là phương án lẻ loi (m2-mt-3 và m2-mt-8; m7-mt-12 một "Có" đấu hai "Không"). Bốn: m5-mt-3 chỉ có hai phương án — câu duy nhất như vậy trong 132 câu trắc nghiệm của cả app, nhắm mắt cũng đúng 50%.

**Luật đề xuất:** Nới cổng cue-độ-dài đang có để nó gác cả câu Đoán thử, Thử tay và Nhớ lại chứ không chỉ đề thi. Thêm hai cổng nhỏ: cấm câu trắc nghiệm có dưới ba phương án; và cảnh báo khi mọi mồi nhử của một câu cùng mở đầu bằng một cực (Có/Không/Được) còn đáp án đúng là cực lẻ loi. Luật soạn bài: mỗi mồi nhử phải là một hiểu lầm CÓ THẬT của người mới, dài tương đương đáp án, và phải bác được bằng đúng kiến thức bài này — mồi nào loại được mà không cần học thì bỏ.

### Lời giải, thư cuối module và lời úp mở nói sai hoặc nói ngược bài học
*11 câu · M4, M5, M9, M11, M12, M13, M14, M15, M19 (và mâu thuẫn M13 với M21)*

Chỗ này nguy hơn cả chấm oan, vì nó DẠY SAI. Thư cuối M4 khen người học đã cho hai xóm nói chuyện lại được với nhau — việc chưa lab nào làm, và nói vậy là phủ nhận chính bài "khác VLAN thì không thấy nhau". Lời giải m14-b1-prac-2 vừa nói tốc độ không liên quan vừa khẳng định "trunk nhanh hơn" (sai kỹ thuật, lại xác nhận một nửa cái mồi nhử vừa loại). m15-mt-13 dạy rằng tên máy cũng được đem ra phân định khi bầu root — đúng cái hiểu lầm bài đang cố dập. m11-mt-9 thu "General failure" từ ba nguyên nhân xuống còn một. M12 dạy thành luật chung rằng thứ chảy trong đường ống "là bản ghi có cột tên" rồi ngay bài sau cho chảy toàn dòng chữ. m4-mt-12 nhắc một trải nghiệm phòng lab chưa từng xảy ra. m19-mt-ps1 khẳng định một điều sai trong chính thế giới của câu hỏi. M13 và M21 dạy hai thứ tự ngược nhau cho cùng một quy trình, mà M21 còn tự nhận "như Module 13 đã dạy".

**Luật đề xuất:** Luật soạn bài: lời giải, thư cuối module và lời úp mở là NỘI DUNG DẠY, không phải lời dẫn — chúng phải qua đúng cửa duyệt như màn dạy, và tuyệt đối không được nhắc tới trải nghiệm mà người học chưa có ("như bạn đã gặp trong phòng lab", "như Module X đã dạy") nếu chưa mở lại chỗ đó kiểm chứng. Cổng tự động rẻ: quét mọi câu chữ nhắc "phòng lab"/"bạn đã tự tay" trong thư và lời giải, đối chiếu với việc module đó có lab và lab có mục tiêu tương ứng không; và quét các cụm trích dẫn chéo module ("như Module N") để người soát mở đúng chỗ đối chiếu.

### Khái niệm dạy hẳn một màn nhưng không có chỗ nào bắt nhớ lại, nhất là ở cổng mastery
*10 câu · M6, M7, M8, M9, M12, M14, M17, M18, M19, M20*

Nguyên tắc số 1 của app là mọi bài học phải kết bằng retrieval, nhưng vài khái niệm rơi khỏi lưới. Nhồi bảng MAC — nửa làm nên tên Module 17 "bảo mật lớp 2" — không có câu nào trong pool 14 câu đề thi, cửa mastery chỉ đo cái chốt chặn mà không đo cái lỗ hổng nó chặn. Cả bài dạy thế hệ Wi-Fi của M8 gần như biến mất khỏi phòng thi, khoảng một phần ba số lượt thi không hỏi một chữ nào về nó. Chữ "sub-interface" — tên khái niệm lõi của bài 5 M14 — chỉ được hỏi ở đúng một câu, mà câu đó lại tự lộ đáp án trong đề. Khái niệm chủ đạo của bài 1 M20 (một dòng log trả lời bốn câu) không câu nào trong cả module bắt lấy ra từ trí nhớ. Bản ghi A của M6 chỉ là đáp án đúng ở bước Đoán thử — bước vốn để đoán, không tính là nhớ lại.

**Luật đề xuất:** Thêm một cổng bản đồ phủ sóng: với mỗi module, in ra bảng khái niệm × nơi được đo (Thử tay / Nhớ lại / Tự giải thích / thẻ ôn / pool đề thi), và báo đỏ khi một khái niệm không được đo ở BẤT KỲ chỗ nào ngoài bước Đoán thử. Không nên đòi mỗi khái niệm phải có một câu trong pool (12 khái niệm không nhét vừa số slot), nhưng phải đòi mỗi khái niệm có ít nhất một lần bị lấy ra khỏi trí nhớ. Luật soạn bài kèm theo: khái niệm nào là tên của cả bài hoặc nằm trong tên module thì bắt buộc phải có mặt trong pool đề thi.

## Việc nên làm trước (xếp theo giá trị trên công sức)

1. **[công vừa]** Làm một lượt nới ô "Chấp nhận" cho cả 36 câu gõ tay đang chấm oan, mỗi câu kiểm ngược bằng 5-6 cách nói đúng và vài câu sai
   *Vì:* Đây là lớp lỗi lớn nhất và cũng đau nhất: người học hiểu đúng, gõ đúng chữ mà app vừa mớm cho họ, rồi bị báo sai. Ít nhất 8 câu trong số đó nằm thẳng trong đề thi, tức là chấm oan ngay tại cửa 85% — sai một câu là mất cửa. Sửa toàn bộ chỉ là thêm chữ vào dữ liệu, không đụng engine, không đổi bài dạy.
2. **[công nhỏ]** Nới cổng kiểm tự động "lời giải phải qua được bộ chấm" để nó soi cả lời gợi ý, bắt luôn ca phủ định, và bắt accept của đề thi không được hẹp hơn accept của bài học
   *Vì:* Vá 36 câu bằng tay mà không dựng hàng rào thì bài mới viết sau sẽ đẻ lại đúng lớp lỗi đó. Cổng hiện có bỏ sót phần lớn ca hỏng vì nó chỉ soi mệnh đề đầu của lời giải và tha mọi lời giải dài hơn 9 chữ. Sửa vài chục dòng test là chặn được cả lớp về sau.
3. **[công nhỏ]** Cho bản duyệt nội dung (npm run content:review) in thêm dòng "Cận đúng" của mỗi câu gõ tay
   *Vì:* Lượt soát vừa rồi đã có một phát hiện SAI hoàn toàn chỉ vì bản duyệt không in phần cận đúng, người soát tưởng app đánh trượt người học trong khi app trả lời rất tử tế. Sửa vài dòng, lượt soát sau đỡ mất công đuổi theo lỗi ma.
4. **[công vừa]** Sửa 11 chỗ lời giải, thư cuối module và lời úp mở đang dạy sai hoặc nói ngược bài học
   *Vì:* Đây là loại lỗi duy nhất trong cả lượt soát khiến người học mang kiến thức SAI ra khỏi khóa: "trunk nhanh hơn access", "tên máy cũng được đem ra bầu root", thư khen một việc chưa lab nào làm, luật đường ống PowerShell sai bị thẻ ôn nhắc lại hàng tháng. Mỗi chỗ chỉ là sửa một hai câu văn, nhưng bỏ đó thì càng ôn càng khắc sâu cái sai.
5. **[công vừa]** Kéo 10 mẩu kiến thức đang bị nhốt trong ô "Đào sâu hơn" ra thân màn dạy — những mẩu đang bị đem ra chấm điểm
   *Vì:* Ô đó mặc định gấp lại, không bấm là không thấy. Nhưng luật trừ TTL, bảng quy đổi prefix, lý do chống thư rác, lời đáp Request timed out đều đang bị hỏi ở đề thi hoặc ở câu tự giải thích chấm theo nhóm ý. Mỗi mẩu là một hai câu chuyển chỗ, không phải viết bài mới; sửa xong thì đề thi thôi hỏi thứ chưa dạy chính thức.
6. **[công vừa]** Dựng cổng chặn đề thi trùng đề bài (trùng nguyên văn hoặc trùng con số), rồi đổi vỏ tình huống cho 14 câu đang trùng
   *Vì:* Cửa 85% là thứ duy nhất chặn người chưa hiểu đi tiếp. Hiện trung bình mỗi lượt thi có 2-3 câu chỉ đòi nhớ mặt chữ câu vừa luyện, riêng M13 và M9 nặng nhất. Có cổng rồi thì mọi module viết sau cũng được gác.
7. **[công nhỏ]** Sửa m13-mt-8: câu xếp thứ tự đang đánh trượt một dãy cũng đúng, và sửa luôn fixture test đang ghim đúng cú xếp bị oan
   *Vì:* Người hiểu bài trọn vẹn vẫn bị trừ điểm ở cửa 85%, mà câu này xuất hiện khoảng 60% số lượt thi. Cách chữa gọn: gộp hai bước hoán vị được thành một mục để chỉ còn bốn bước không thể xếp sai. Công nhỏ, chặn một cửa đang đóng oan.
8. **[công nhỏ]** Viết lại m8-mt-6 cho đứng được một mình (bỏ cụm "Cùng cảnh đó"), rồi rà cả kho tìm câu thi còn tham chiếu câu khác
   *Vì:* Đề thi rút 8 trong 12 câu rồi xáo thứ tự, nên khoảng 45% số lượt người học đọc một câu hỏi treo lơ lửng không có đầu. Đây là lỗi cơ chế chứ không phải lỗi kiến thức, sửa một câu văn là xong.
9. **[công vừa]** Chữa nhóm câu trắc nghiệm tặng điểm: thêm mồi nhử thứ ba cho m5-mt-3, thay các mồi nhử chết ở m19-mt-12, m21-mt-9, m8-b2-pra-1, và nới cổng cue-độ-dài sang câu trong bài
   *Vì:* m5-mt-3 là câu hai phương án duy nhất trong 132 câu trắc nghiệm của cả app — nhắm mắt đúng 50% ngay tại cửa mastery. Cả 12 câu trắc nghiệm trong bài của M10 đều có đáp án đúng là phương án dài nhất, bấm câu dài là ăn điểm. Nới cổng một lần rồi vá theo danh sách nó in ra.
10. **[công nhỏ]** Khoá lưới lọc cho câu terminal đề thi m12-mt-ps-2 (tối đa 2 dòng khớp) và cho hai câu luyện của M20 (tối đa 10)
   *Vì:* Hiện gõ một mẫu vơ vét kiểu tìm chữ "2026" là hốt cả file mà vẫn được tính ĐẠT — đúng thói quen mà bài đang dạy phải bỏ. Sửa là thêm một con số vào dữ liệu, chạy lại test là biết lời giải mẫu còn đạt không.
11. **[công vừa]** Dạy nốt nửa còn thiếu của Module 3: bảng quy đổi prefix sang mask (/25 đến /30) và cách đọc trọn một khối (địa chỉ mạng, broadcast, dải máy dùng được, số máy = cỡ khối trừ 2)
   *Vì:* Đây là tính năng đang HỎNG chứ không chỉ là lỗ hổng: màn luyện subnet của chính module trộn 6 loại đề, trong đó 4 loại hỏi thứ module chưa dạy một chữ nào, mà bài 5 lại dặn người học ghé luyện mỗi ngày. Vá chỗ này còn gỡ luôn thế bí ở đề thi m3-mt-10, và trả nợ cho Module 13 (VLSM mặc định người học biết trừ 2) lẫn bài tổng duyệt Module 21 (đường nối router /30).
12. **[công lớn]** Soạn cụm bài mới lấp các lỗ hổng lớn nhất: đặt tên cho mô hình phân tầng (tầng 2, tầng 3) và phân biệt khung với gói; tầng dây thật (cáp, cự ly, duplex, PoE, đèn cổng); từ vựng đo mạng và ca bệnh "mạng chậm"; chứng chỉ HTTPS và mã đáp web; cụm làm chủ mạng nhà (trang quản trị router, kênh Wi-Fi, CGNAT)
   *Vì:* Đây là phần tốn công nhất nên xếp sau, nhưng là thứ quyết định người học ra khỏi khóa có nói được tiếng của nghề và sửa được sự cố họ thật sự gặp hay không. Cả bốn lăng kính soát độc lập đều chỉ vào đúng nhóm này. Nên làm từng bài một, mỗi bài xong hẳn, không mở tất cả cùng lúc.

---

# 78 phát hiện, xếp theo lớp lỗi

## Lớp 5 — Đáp án chấp nhận quá hẹp — chấm sai người hiểu đúng (23 phát hiện)

### `m1-mt-6` — module-1 · vừa
**Vấn đề:** Đề tự tay nêu tên HTTP rồi hỏi "hai bên hiểu nhau nhờ cùng tuân theo thứ gì?". Người hiểu bài rất dễ gõ thẳng "HTTP" — và đó là câu trả lời đúng theo đúng cách khóa học tự diễn đạt ở câu khác. Nhưng danh sách chấp nhận không có "http", nên máy chấm sai người trả lời đúng.

**Bằng chứng:** m1-mt-6 accept = ["giao thức", "protocol", "quy tắc chung", "protocols"] — không có "http". Trong khi chính pool này, câu m1-mt-11 có đáp án ĐÚNG viết nguyên văn: "Nhờ hai bên cùng tuân theo HTTP — bộ quy tắc chung đã thỏa thuận trước". Bộ chấm (src/engine/grading/normalize.ts, hàm typedAnswerMatches) so theo từ nguyên vẹn, nên "http" trượt sạch cả 4 mục.

**Cách chữa:** Bỏ chữ HTTP khỏi đề để câu chỉ còn hỏi loại: "Máy bạn gửi yêu cầu theo một khuôn thư đã thỏa thuận trước, server đáp lại đúng khuôn ấy — khuôn chung mà cả hai cùng tuân theo được gọi là gì?". Nếu muốn giữ nguyên đề thì phải thêm "http" và "giao thức http" vào accept, nhưng khi đó câu gần như tự cho đáp án.

### `m2-b2-prac-1, m2-b2-ret-1` — module-2 · NẶNG
**Vấn đề:** Hai câu gõ tay về cổng làng chỉ chấp nhận "gateway / default gateway / cổng mặc định", nhưng chính màn dạy ngay trước đó khẳng định cánh cổng ấy CHÍNH LÀ chiếc router nhà bạn. Người hiểu đúng gõ "router nhà" sẽ bị chấm sai. Tệ hơn: chính đề thi của module (m2-mt-10) lại chấp nhận "router" — cùng một kiến thức, hai chỗ chấm ngược nhau.

**Bằng chứng:** Màn dạy m2-bai-2: "Cánh cổng đó chính là chiếc router nhà bạn"; tổng kết bài: "Cánh cổng đó chính là chiếc router nhà bạn — bưu tá đầu tiên của hành trình". Nhưng accept của m2-b2-prac-1 và m2-b2-ret-1 = ["gateway","default gateway","cổng mặc định"], còn accept của m2-mt-10 = ["default gateway","gateway","cổng mặc định","router","router nhà"]. Bộ chấm so theo TỪ nguyên vẹn (typedAnswerMatches), nên "router nhà mình" không khớp đáp án nào ở hai câu trên.

**Cách chữa:** m2-b2-prac-1 là câu điền chỗ trống ("...bắt buộc phải qua ___ — lối ra duy nhất của mạng nhà") nên "router", "router nhà", "cục phát wi-fi" điền vào là đúng nghĩa — thêm thẳng ba cụm này vào accept. Với m2-b2-ret-1 (hỏi TÊN của vai trò) thì khai một nearMisses: accept ["router","router nhà","cục phát wi-fi"] kèm feedback "Đúng thiết bị rồi! Mình đang hỏi TÊN cái vai nó đóng — cánh cổng đó gọi là gì?" để người học được ghi nhận là gần đúng thay vì bị đánh sai trắng.

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng: chỉ MỘT câu có vấn đề, là `m2-b2-prac-1`, và ở mức nhẹ.

Người học hiểu đúng gõ "router" / "router nhà" / "cục phát wi-fi" vào chỗ trống của `m2-b2-prac-1` bị chấm sai kèm phản hồi chung chung, trong khi câu anh em `m2-b2-ret-1` cùng bài đã có sẵn nhóm cận-đúng bắt đúng mấy chữ đó và trả lời tử tế ("Đúng thiết bị rồi — nhưng vai trò nó đang đóng trong câu chuyện này tên là gì?"). Vênh là ở chỗ prac-1 thiếu nhóm cận-đúng, chứ không phải app chấm ngược nhau giữa bài học và đề thi.

Bỏ hẳn hai ý sai này khỏi phát hiện:
- "m2-b2-ret-1 đánh sai trắng người gõ router" — không đúng, câu đó đã có nearMisses từ trước.
- "đề thi m2-mt-10 chấp nhận router nên mâu thuẫn" — không mâu thuẫn: mt-10 hỏi THIẾT BỊ nào (router là đáp đúng), ret-1 hỏi TÊN của vai trò.

Cách chữa nên khác cách họ đề xuất: KHÔNG thêm "router" vào `accept` của prac-1. Làm vậy là giết chính mục đích câu hỏi (rút lại thuật ngữ "default gateway" vừa học) và làm câu prac-2 ngay sau đó — trắc nghiệm hỏi thiết bị, đáp án router — thành thừa. Thay vào đó copy đúng nếp của ret-1: thêm cho prac-1 một khối
nearMisses: [{ accept: ["router","bộ định tuyến","cục phát wifi","cục phát wi-fi"], feedback: {vi: "Đúng thiết bị rồi! Mình đang hỏi cái TÊN của lối ra đó — cánh cổng ấy gọi là gì?"} }]
Nhờ luật khớp-chứa của bộ chấm, "router nhà mình", "là cái router" cũng bắt được. Xếp lại mức: nhẹ.

Một việc phụ đáng làm (nguyên nhân gốc của phát hiện hỏng này): bản render duyệt nội dung không in nearMisses, nên người soát nhìn nhầm. Nên bổ sung dòng "Cận đúng: …" vào `npm run content:review` để lượt soát sau không lặp lại lỗi này.

### `m3-b2-ret-1` — module-3 · vừa
**Vấn đề:** Câu nhớ lại hỏi "địa chỉ IPv4 gồm phần mạng và phần gì?", còn gợi ý tầng 2 của chính câu đó lại đặt hẳn chữ "số nhà" vào miệng người học — nhưng danh sách chấp nhận không có "số nhà". Người đọc gợi ý rồi gõ đúng thứ gợi ý vừa mớm sẽ bị chấm sai.

**Bằng chứng:** module-03.json dòng 227: "accept": ["host", "phần host", "host id", "phần host id"]. Dòng 229, gợi ý của đúng câu đó: "Phần mạng là khu phố — còn phần kia là \"số nhà\" của từng máy trong khu." Bộ chấm (src/engine/grading/normalize.ts) chỉ khớp nguyên chuỗi hoặc khớp-chứa theo TỪ, nên "số nhà" không có đường nào chạm tới "host". Ẩn dụ "số nhà" còn được lặp ở màn dạy, ở gạch đầu dòng tổng kết và ở thẻ ôn của khái niệm ipv4.

**Cách chữa:** Thêm vào accept: "số nhà", "phần số nhà", "host address", "phần máy". Rà cùng nếp cho các câu khác dùng ẩn dụ mạnh trong gợi ý mà accept chỉ nhận thuật ngữ tiếng Anh.

### `m6-mt-8, m6-b5-ret-1` — module-6 · vừa
**Vấn đề:** Hai câu hỏi "dùng hết bao nhiêu phần thời hạn thì máy xin gia hạn". Danh sách chấp nhận có "một nửa / nửa / 50% / 1/2" nhưng thiếu "một phần hai" — đúng cụm mà chính gợi ý của app mớm cho người học. Bộ chấm so theo TỪ nên "một phần hai" không khớp được "1/2": người hiểu đúng, đọc gợi ý rồi gõ lại bằng chữ của chính gợi ý đó, vẫn bị chấm sai. Ở m6-mt-8 thì không có gợi ý nào cứu, mà đó là câu tính vào ngưỡng 85%.

**Bằng chứng:** Gợi ý tầng 2 của m6-b5-ret-1: "Không đợi tới phút chót — mới đi được đúng một phần hai chặng đường." Accept của cả m6-b5-ret-1 lẫn m6-mt-8: một nửa | mot nua | nửa | nua | 50% | 1/2.

**Cách chữa:** Thêm vào accept của cả hai câu: "một phần hai", "mot phan hai", "1 phần 2" (dạng có khoảng trắng, vì "1/2" tách thành hai token rời nên không bắt được cách gõ này).

### `m6-mt-4` — module-6 · nhẹ
**Vấn đề:** Cùng một câu hỏi AAAA đứng ở hai nơi nhưng hai danh sách chấp nhận lệch nhau: bản trong bài học nhận "a a a a", bản trong đề thi thì không. Người học gõ "a a a a" lúc học được chấm đúng, gõ y hệt trong phòng thi bị chấm sai — trong khi cách gõ đó chính là cách bài dạy bảo họ nghĩ.

**Bằng chứng:** m6-b2-ret-1 accept: aaaa | a a a a | quad a. m6-mt-4 accept: aaaa | quad a | aaaa record. Gợi ý tầng 2 của m6-b2-ret-1: "Vẫn là chữ A, nhưng bốn lần — vì địa chỉ dài gấp bốn."

**Cách chữa:** Đồng bộ hai danh sách: thêm "a a a a" vào accept của m6-mt-4 (và thêm "aaaa record" vào m6-b2-ret-1 cho khớp hai chiều).

**Người phản biện chỉnh lại:** Lệch có thật nhưng chỉ lệch MỘT chiều, và chỉ cần sửa một dòng. Phát biểu lại: câu m6-mt-4 trong pool đề thi module 6 thiếu biến thể "a a a a", trong khi câu song sinh m6-b2-ret-1 ở bước Nhớ lại có — nên cách viết mà chính gợi ý của bài học gợi ra ("chữ A, nhưng bốn lần") được chấm đúng lúc học và chấm sai lúc thi, ở đúng bài thi gác cửa mở module 7. Chữa: thêm "a a a a" vào accept của m6-mt-4. KHÔNG cần thêm "aaaa record" vào m6-b2-ret-1 — đã chạy thử, câu đó chấm đúng "aaaa record" sẵn nhờ luật khớp-chứa theo cụm từ; hai chiều vốn đã cân, chỉ khuyết đúng biến thể tách chữ.

### `m7-b2-ret-1, m7-b3-ret-1, m7-b5-ret-1` — module-7 · NẶNG
**Vấn đề:** Ba câu Nhớ lại bắt viết cả câu đều chấm SAI chính lời giải mẫu của chúng. Bộ chấm đòi đúng một cụm từ nằm liền khối, nên người hiểu đúng mà nói khác đi một chữ ("không biết đưa lên căn hộ nào" thay vì "đưa cho ai") bị đánh trượt. Ở m7-b5-ret-1 còn nặng hơn: hễ câu trả lời có chữ "không" là bộ chấm tự khoá luôn cách khớp theo cụm, mà câu trả lời đúng gần như chắc chắn có chữ "không".

**Bằng chứng:** Chạy đúng bộ chấm của app (mcp grade_answer): m7-b2-ret-1 với chính lời giải tầng 3 của nó "Vì bảng NAT chưa có dòng nào cho gói tin đó — router không biết đưa lên căn hộ nào nên bỏ luôn." → matched: false; "vì bảng NAT không có dòng nào cho gói đó" → false; "chưa có dòng nào trong bảng NAT" → false. m7-b3-ret-1 với lời giải của chính nó "Khi gói tin khớp một dòng trong bảng kết nối đang mở — tức là thư trả lời..." → false; "khi nó khớp một dòng trong bảng kết nối đang mở" → false. m7-b5-ret-1 với lời giải của chính nó "Vì có hai cuốn sổ ở hai thiết bị: khai một chỗ thì chỗ kia không biết..." → false.

**Cách chữa:** Luật kiểm nhanh: lời giải tầng 3 của một câu gõ tay PHẢI tự chấm đúng chính nó. Cụ thể — m7-b2-ret-1 thêm accept: "không biết đưa", "không biết gửi", "không có dòng nào", "chưa có dòng nào", "không có trong bảng". m7-b3-ret-1 thêm: "khớp một dòng", "khớp một kết nối", "thư trả lời", "trong bảng kết nối". m7-b5-ret-1 thêm: "hai cuốn sổ", "hai bảng", "hai chỗ", "chỗ kia không biết" (accept ngắn, không kèm chữ "vì", và ít nhất một accept có chữ phủ định để lá chắn phủ định không khoá hết).

**Người phản biện chỉnh lại:** Đúng 2/3 câu, và sai ở luật kiểm họ rút ra.

ĐÚNG: m7-b2-ret-1 (nặng) và m7-b3-ret-1 (vừa) có accept hẹp hơn chính cách nói đúng của người học, vì khớp-chứa đòi cụm liền khối. Nặng nhất là m7-b2-ret-1: nó đánh trượt cả câu chữ do chính bài viết ra ("router không biết đưa lên căn hộ nào", "bảng NAT chưa có dòng nào"). Đây đúng là lớp lỗi GHI-CHU-KY-THUAT.md mục 6 đã gọi tên và bắt phải chữa: "accept phải chứa cả cách nói đầy đủ".

SAI: m7-b5-ret-1 không thuộc diện hỏng — mệnh đề đáp án của nó tự chấm đúng và các cách nói tự nhiên đều đậu; chỉ riêng câu trả lời có kèm "không biết" mới bị lá chắn phủ định khóa. Nới thêm cho nó là tùy chọn nhỏ, không phải sửa lỗi.

SAI Ở LUẬT: "lời giải tầng 3 phải tự chấm đúng chính nó" mạnh hơn luật app đang có và đi ngược một quyết định đã ghi rõ — test gác chỉ đo mệnh đề đáp án mở đầu, cố ý tha lời giải kể chuyện dài. Thước đúng là: accept phải phủ được các CÁCH NÓI ĐÚNG của người học, kiểm bằng grade_answer với 5-6 cách diễn đạt đúng + vài câu sai để kiểm ngược (đúng nếp mục "Nới accept phải nới ĐÚNG").

VIỆC NÊN LÀM: m7-b2-ret-1 thêm accept "không biết đưa lên căn hộ nào", "không có dòng nào cho gói", "chưa có dòng nào trong bảng nat", "không biết đưa gói cho ai" (kèm bản không dấu). m7-b3-ret-1 thêm "khớp một dòng trong bảng kết nối", "khớp một kết nối đang mở", "là thư trả lời" (bỏ chữ "khi" đầu để không kén chủ ngữ chen vào). Bỏ các cụm quá ngắn họ đề xuất — "hai chỗ", "hai bảng", "khớp một dòng" trần — vì mục 11 đã ghi cụm ngắn là bẫy nhận nhầm.

### `m7-mt-11` — module-7 · NẶNG
**Vấn đề:** Cùng một khái niệm port forwarding, nhưng đề thi chấm CHẶT HƠN bài học: bốn cách nói mà bài học đã nhận đúng thì tới phòng thi lại bị đánh sai. Người học được app dạy rằng "mở cổng" là đáp án đúng, xong bị chính app trừ điểm ở cửa 85%.

**Bằng chứng:** m7-b2-pra-2 (Thử tay) accept 8 cách: port forwarding | chuyển tiếp cổng | chuyen tiep cong | forward cổng | mở cổng | chuyển tiếp port | forward port | mở port. m7-mt-11 (đề thi) chỉ còn 5: port forwarding | chuyển tiếp port | chuyen tiep port | mở port | mo port. Chấm thử m7-mt-11: "mở cổng" → false, "forward port" → false, "chuyển tiếp cổng" → false, "port forward" → false (trong khi cùng ba chuỗi đó ở m7-b2-pra-2 đều → true).

**Cách chữa:** Chép nguyên 8 cách nói của m7-b2-pra-2 sang accept của m7-mt-11, và thêm "port forward" (dạng số ít rất hay gõ) vào CẢ HAI câu. Nguyên tắc chung: câu thi hỏi lại khái niệm nào thì accept phải là tập cha của accept câu dạy, không bao giờ hẹp hơn.

### `m8-b2-ret-1, m8-mt-7` — module-8 · NẶNG
**Vấn đề:** Hai chỗ chấm sai người hiểu đúng. (1) Câu nhớ lại bài 2 hỏi "hai bên nói chuyện bằng THẾ HỆ nào?" nhưng danh sách chấp nhận không có "6" lẫn "thế hệ 6" — hai cách trả lời tự nhiên nhất cho đúng chữ "thế hệ nào". Tôi đã chạy thử chính hàm chấm của app: cả hai đều bị báo sai. (2) Bài 5 dạy người học rằng "dora" là câu trả lời được chấp nhận cho cơ chế bốn nhịp, rồi đề thi m8-mt-7 hỏi gần y hệt lại gạt "dora" ra.

**Bằng chứng:** m8-b2-ret-1 accept: ["thấp hơn","thap hon","wi-fi 6","wifi 6","đời thấp","doi thap","cũ hơn","cu hon"] — chạy typedAnswerMatches: "6" => false, "thế hệ 6" => false, "thấp" => false. Còn m8-b5-ret-2 ("cơ chế cấp địa chỉ BỐN NHỊP... tên là gì? (viết tắt)") accept có "dora", nhưng m8-mt-7 ("...bốn nhịp Discover–Offer–Request–Ack là của giao thức nào? (viết tắt)") accept chỉ có ["dhcp","dynamic host configuration protocol"] — gõ "dora" => false.

**Cách chữa:** (1) Thêm vào accept của m8-b2-ret-1: "6", "thế hệ 6", "the he 6", "thấp", "thap", "đời cũ", "doi cu". (2) Chọn một trong hai cho thống nhất — nên BỎ "dora" khỏi accept của m8-b5-ret-2, vì đúng như Module 6 đã dạy, DORA là tên bốn nhịp còn DHCP mới là tên giao thức; đồng thời sửa đề m8-b5-ret-2 thành "...giao thức nào?" cho khớp cách hỏi của đề thi.

**Người phản biện chỉnh lại:** Chỉ còn một lỗi thật, ở m8-b2-ret-1: đề hỏi "thế hệ nào?" nhưng danh sách chấp nhận không có cách trả lời bằng chính con số thế hệ. Đã chạy bộ chấm của app: "6", "thế hệ 6", "the he 6", "đời cũ" đều bị báo sai, dù "wi-fi 6" và "thấp hơn" thì đúng. Sửa: thêm vào accept của m8-b2-ret-1 các mục "6", "thế hệ 6", "the he 6", "đời cũ", "doi cu". Không cần thêm "thấp"/"thap" trần (accept đã có "thấp hơn"/"đời thấp", thêm mục 1 từ chỉ nới khớp-chứa vô ích).

Bỏ hẳn ý về DORA: m8-mt-7 hỏi "bốn nhịp D-O-R-A là của GIAO THỨC nào" nên đáp án phải là DHCP; gạt "dora" ở đó là đúng, không phải mâu thuẫn. Giữ nguyên m8-b5-ret-2 (kể cả accept "dora") vì đề đó hỏi TÊN CƠ CHẾ bốn nhịp chứ không hỏi tên giao thức.

### `m10-b2-ret-1, m10-b4-ret-1, m10-mt-7` — module-10 · NẶNG
**Vấn đề:** Bộ chấm có một luật chặn: câu trả lời nào chứa chữ "không / chưa / sai" thì chỉ còn được chấm đúng khi TRÙNG NGUYÊN VĂN một mục trong danh sách Chấp nhận. Ba câu này lại có cách trả lời tự nhiên nhất là một câu phủ định, mà danh sách Chấp nhận không có mục phủ định nào — nên người hiểu đúng, trả lời đúng ý, vẫn bị chấm sai (một trong ba câu nằm ngay trong đề thi mở khoá module).

**Bằng chứng:** Chạy thật bộ chấm (src/engine/grading/normalize.ts) với đúng danh sách Chấp nhận của đề: "không ai vào được" → SAI ở m10-b2-ret-1, trong khi chính lời giải thích của bài viết "chưa khai luật nào thì không ai vào được". "không tin ai mặc định, phải xác minh" → SAI ở m10-b4-ret-1 và m10-mt-7, trong khi thẻ khái niệm m10-zero-trust ghi nguyên văn "Không tin ai mặc định — xác minh mọi truy cập". (Gõ trần "xác minh" thì đúng.)

**Cách chữa:** Thêm biến thể phủ định vào Chấp nhận: m10-b2-ret-1 thêm "không vào được", "không ai vào được", "không cho vào"; m10-b4-ret-1 và m10-mt-7 thêm "không tin", "không tin ai", "không tin mặc định". Đáp án có mang phủ định sẽ mở lại được luật khớp-chứa, nên các câu trả lời dài kiểu trên được chấm đúng ngay.

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng: lá chắn phủ định của bộ chấm (`normalize.ts` dòng 130) chặn nhầm ở HAI câu, không phải ba — m10-b2-ret-1 và m10-b4-ret-1, cả hai đều là bước Nhớ lại TRONG BÀI, KHÔNG có câu nào trong đề thi mở khoá. m10-mt-7 phải gỡ khỏi phát hiện: nó hỏi "biên giới mới của mạng là gì" (đáp: danh tính), nên "không tin ai mặc định, phải xác minh" bị chấm sai là chấm ĐÚNG. Vì mất vế "nằm trong đề thi", mức nên hạ từ "nặng" xuống "vừa": người học vẫn còn thang gợi ý 3 tầng và nút "mình nghĩ câu này đúng", không ai bị chặn cửa lên module 11.

Cách chữa nên sửa lại:
- m10-b2-ret-1 — thêm vào accept: "không ai vào được", "không ai vào", "không cho ai vào". KHÔNG thêm "không vào được" (quá rộng, sẽ nhận nhầm câu nói về chiều RA vốn mặc định mở).
- m10-b4-ret-1 — thêm: "không tin ai mặc định", "không tin ai". Cả hai đều là chữ app tự dạy ở thẻ `m10-zero-trust` và Tổng kết bài 4.
- m10-mt-7 — KHÔNG động vào accept. Thêm "không tin…" vào đây là mở cửa cho đáp án sai qua bài thi mở khoá.
Nếu muốn chặn tận gốc: nới test ở `content.test.ts` dòng 484-510 để câu gõ tay còn phải nuốt được cả cách nói phủ định trong `explain` của pretest và mặt trước thẻ khái niệm cùng bài, chứ không chỉ mệnh đề đầu của `solution`.

### `m10-mt-1` — module-10 · NẶNG
**Vấn đề:** Câu thi m10-mt-1 dùng ĐÚNG từng chữ đề của câu thử tay m10-b1-pra-2, nhưng danh sách Chấp nhận bị cắt mất "virtual network" — chính là tên đầy đủ của VNet mà bài đã dạy. Hậu quả: người học gõ "virtual network" ở bước Thử tay được app khen đúng, gõ y hệt trong phòng thi thì bị chấm sai.

**Bằng chứng:** m10-b1-pra-2 Chấp nhận: vpc | vnet | virtual private cloud | virtual network — m10-mt-1 Chấp nhận: vpc | vnet | virtual private cloud. Bài dạy m10-vpc: "AWS gọi là VPC, Azure gọi là VNet — cùng một ý." Đề còn ghi "(viết tắt được)", tức tên đầy đủ cũng phải được nhận. Chạy bộ chấm: "virtual network" → ĐÚNG với accept của bài, SAI với accept của đề thi.

**Cách chữa:** Thêm "virtual network" (và nên thêm "mạng riêng ảo") vào danh sách Chấp nhận của m10-mt-1 cho khớp với m10-b1-pra-2.

**Người phản biện chỉnh lại:** Lỗi CÓ THẬT, nhưng phát biểu lại cho đúng căn cứ và thu gọn cách chữa:

Phát biểu đúng: Câu thi `m10-mt-1` và câu Thử tay `m10-b1-pra-2` dùng ĐÚNG TỪNG CHỮ cùng một đề, nhưng accept của câu thi thiếu "virtual network". Chạy bộ chấm thật: "virtual network" ĐÚNG ở Thử tay, SAI ở phòng thi. Người học được app dạy rằng cách gõ đó chấp nhận được, rồi bị phạt vì chính nó. Căn cứ là BẤT NHẤT GIỮA HAI CÂU TRÙNG ĐỀ — không phải "bài đã dạy tên đầy đủ", vì grep toàn bộ content cho thấy chữ "Virtual Network" chỉ xuất hiện đúng ở accept của câu Thử tay, màn dạy chỉ viết "Azure gọi là VNet".

Cách chữa đúng: thêm DUY NHẤT "virtual network" vào accept của `m10-mt-1` cho khớp `m10-b1-pra-2`. KHÔNG thêm "mạng riêng ảo" — cụm đó hiện bị từ chối ở cả hai câu (thêm một bên là đẻ lại bất nhất theo chiều ngược), và nó là cách gọi tiếng Việt quen của VPN, mà module 10 dạy VPN ngay bài 3 và hỏi ở m10-mt-4/m10-mt-5.

Mức nên hạ từ "nặng" xuống "vừa": câu này không phải câu trụ, pool 12 rút 8 nên chỉ vào đề ~2/3 lượt, và sai một câu vẫn 7/8 = 87.5%, chưa tự mình đánh rớt cổng 85%.

Đáng làm kèm: cả kho có thêm 3 cặp đề trùng nguyên văn (grep prompt trùng ra "Máy chủ giữ sổ cái của miền…", "Trong Zero Trust, biên giới mới…", "Wi-Fi 6E khác Wi-Fi 6…") — nên có một test gác lớp lỗi này thay vì sửa tay từng ca.

### `m11-b2-prac-1, m11-b5-prac-1` — module-11 · vừa
**Vấn đề:** Danh sách "Chấp nhận" bỏ sót đúng những chữ mà chính bài dạy dùng. Ở m11-b2-prac-1, người học gõ lại nguyên văn câu gợi ý tầng 2 mà app vừa đưa cho vẫn bị chấm sai. Ở m11-b5-prac-1, câu hỏi mời trả lời theo hai vế nhưng chỉ chấp nhận vế khẳng định.

**Bằng chứng:** m11-b2-prac-1 accept = ['sau gateway','sau router','sau chặng 1','ngoài router','từ router ra ngoài','sau 192.168.20.1'] — không có biến thể nào dùng chữ "trạm", trong khi màn dạy m11-tracert viết "gọi tên từng TRẠM trên đường đi", gợi ý tầng 2 viết "Chỗ nghẽn nằm ngay sau trạm cuối cùng còn lên tiếng", và thẻ ôn cũng viết y hệt. Gõ "sau trạm cuối cùng còn lên tiếng" → sai. m11-b5-prac-1 hỏi "Đường mạng giữa hai máy còn sống hay đã đứt?" nhưng accept = ['còn sống','vẫn sống','sống','còn thông','vẫn thông']; src/engine/grading/normalize.ts gặp từ phủ định (không/chưa/sai) trong câu trả lời là TẮT khớp-chứa, nên "không đứt" hay "còn sống, chưa đứt" — trả lời đúng — đều bị chấm sai. Module-11 khai 0 nearMisses nên không có lưới đỡ nào.

**Cách chữa:** Thêm vào accept của m11-b2-prac-1: "sau trạm 1", "sau trạm cuối", "sau trạm cuối cùng", "từ chặng 2", "chặng 2 trở đi". Thêm vào accept của m11-b5-prac-1: "không đứt", "chưa đứt", "không phải đứt" (đáp án có phủ định thì lá chắn phủ định mở lại đúng như ghi chú trong normalize.ts).

### `m12-b4-ret-1, m12-b2-ret-1` — module-12 · NẶNG
**Vấn đề:** Câu Nhớ lại hỏi kiểu chọn-một-trong-hai ("chữ thuần HAY bản ghi có cột tên"), nên người học rất dễ trả lời bằng câu có vế phủ định — đúng như lời giải mẫu của chính app. Nhưng bộ chấm có luật: câu trả lời chứa chữ "không" thì chỉ còn khớp được với đáp án cũng mang phủ định, mà danh sách chấp nhận lại không có cái nào như vậy. Kết quả: người hiểu đúng hoàn toàn bị chấm sai.

**Bằng chứng:** Đề m12-b4-ret-1: "thứ chảy trong đường ống của PowerShell là chữ thuần hay là bản ghi có cột tên?" · Chấp nhận: bản ghi | ban ghi | bản ghi có cột | đối tượng | object (không cái nào mang phủ định) · Lời giải mẫu lại viết: "Là bản ghi có cột tên hẳn hoi (đối tượng), KHÔNG PHẢI chữ thuần" · Luật chấm (src/engine/grading/normalize.ts): "gặp phủ định ở BẤT KỲ đâu, ta tắt chế độ khớp-chứa", và test của chính engine chốt: typedAnswerMatches('không phải dns', ['dns']) === false.

**Cách chữa:** Thêm vào danh sách chấp nhận của m12-b4-ret-1 các cách nói mang phủ định: "không phải chữ thuần", "bản ghi chứ không phải chữ thuần", "không phải chữ" (thêm bản không dấu). Sửa như vậy vẫn an toàn: người trả lời sai "chữ thuần" hay "không phải bản ghi" vẫn trượt. Câu m12-b2-ret-1 (ngoặc vuông) dính cùng bệnh: các cách nói rất tự nhiên "có cũng được không có cũng được" (chính là lời gợi ý tầng 1), "không nhất thiết phải viết" (lời tầng 2), "bỏ cũng được" đều bị chấm sai — thêm chúng vào Chấp nhận.

**Người phản biện chỉnh lại:** m12-b4-ret-1: phát hiện ĐÚNG nguyên vẹn — đề dạng "A hay B", lời giải mẫu diễn đạt bằng vế phủ định, accept không có mục nào mang phủ định, nên lá chắn phủ định (normalize.ts) đánh trượt cả câu trả lời mẫu của chính app. Chữa: thêm "không phải chữ thuần" + "khong phai chu thuan" (BỎ biến thể cụt "không phải chữ" — đã kiểm thấy nó cho lọt câu vô nghĩa "không phải chữ thuần cũng không phải bản ghi").

m12-b2-ret-1: có lỗi thật nhưng KHÔNG phải "cùng bệnh" như họ chẩn. Accept của câu này ĐÃ có mục phủ định ("không bắt buộc"), nên "phần này không bắt buộc" chấm đỗ bình thường. Ba cách nói họ nêu trượt vì accept HẸP (riêng "bỏ cũng được" không có chữ phủ định nào). Phát biểu lại: accept của m12-b2-ret-1 không chứa chính lời app dùng để DẠY và GỢI Ý — màn dạy viết "có cũng được không có cũng được", gợi ý tầng 2 viết "không nhất thiết phải viết" — nên người học chép đúng lời app bị chấm sai. Chữa: thêm "có cũng được không có cũng được", "không nhất thiết", "bỏ cũng được", "không cần" (+ bản không dấu). Riêng ca "là tham số tùy chọn, không viết cũng được" (chứa nguyên cụm "tùy chọn" nhưng bị lá chắn chặn) thì thêm accept không cứu được — đó là hạn chế của lá chắn phủ định, nếu muốn xử phải sửa engine, nên tách thành phát hiện riêng chứ đừng gộp vào lượt vá nội dung này.

### `m13-b2-ret-1` — module-13 · nhẹ
**Vấn đề:** Câu nhớ lại gõ tay chấm hụt cách nói rút gọn tự nhiên nhất của tiếng Việt: người trả lời "phòng đông nhất" hoặc "đông nhất" là hiểu đúng hoàn toàn nhưng bị chấm sai, vì danh sách chấp nhận chỉ có bản đầy đủ "đông máy nhất".

**Bằng chứng:** accept: ["đông máy nhất", "phòng đông máy nhất", "nhiều máy nhất", "phòng nhiều máy nhất", "to nhất", "phòng to nhất", "lớn nhất", "phòng lớn nhất", "dong may nhat", ...] — không có "đông nhất". Bộ chấm so theo cụm từ nguyên vẹn từng TỪ (src/engine/grading/normalize.ts: "CHỨA đáp án dưới dạng cụm từ nguyên vẹn... so theo TỪ, không theo chuỗi con"), nên "phòng đông nhất" không khớp "đông máy nhất" vì thiếu chữ "máy" ở giữa.

**Cách chữa:** Thêm vào accept: "đông nhất", "phòng đông nhất", "dong nhat", "phòng đông", "nhiều máy". Các chuỗi này không thể làm đáp án sai ("phòng ít máy nhất") lọt lưới.

**Người phản biện chỉnh lại:** Lỗi có thật, giữ lớp 5 · mức nhe, nhưng phát biểu lại cho đúng phạm vi và sửa đơn thuốc.

Phát biểu đúng: ở `m13-b2-ret-1`, accept chỉ có bản dài "đông máy nhất" nên mọi cách nói rút gọn quanh từ trục "đông"/"nhiều" đều bị chấm sai dù hiểu đúng hoàn toàn — đã chạy bộ chấm thật và thấy trượt: "phòng đông nhất", "đông nhất", "nhiều nhất", "phòng nhiều nhất", "phòng đông máy", "phòng nhiều máy", cùng các câu đầy đủ chứa chúng ("cắt phòng đông nhất trước"). Nghịch lý là accept đã có sẵn bản rút gọn cho "to nhất"/"lớn nhất", chứng tỏ đây là sót chứ không phải chủ đích siết.

Đơn thuốc nên là: thêm "đông nhất", "phòng đông nhất", "nhiều nhất", "phòng nhiều nhất" (bốn chuỗi này đều 2-3 token có "nhất", không đáp án sai nào chứa được).
BỎ "nhiều máy" khỏi đề xuất — đã kiểm: thêm nó thì câu nước đôi "phòng nhiều máy hay ít máy" bị chấm ĐÚNG, vì lá chắn liệt kê chỉ chặn khi ứng viên là chữ số hoặc 1 ký tự.
BỎ "phòng đông" (cụt nghĩa, mất hẳn ý so sánh nhất) và "dong nhat" (thừa — bộ chấm đã tự cho người gõ không dấu khớp accept có dấu).

### `m14-mt-7, m14-b4-ret-1, m14-b1-ret-1` — module-14 · NẶNG
**Vấn đề:** Ba câu gõ tay về lệnh xem bảng chấm hụt đúng những cách viết tắt mà người hiểu bài rất dễ gõ ra. Danh sách Chấp nhận đã mở cửa cho bản viết tắt SÂU nhất ("sh int trunk") nhưng lại đóng cửa với bản viết tắt NỬA CHỪNG ("sh interfaces trunk") — người gõ tắt mỗi từ đầu bị chấm sai dù hiểu đúng hoàn toàn. Nặng nhất là m14-mt-7 vì nó nằm trong đề thi, mà cổng 85% chỉ cho sai 1 trong 8 câu.

**Bằng chứng:** m14-mt-7 và m14-b4-ret-1 cùng accept: ["show interfaces trunk", "show interface trunk", "sh int trunk", "show int trunk"] — không có "sh interfaces trunk" / "sh interface trunk". m14-b1-ret-1 accept: ["show vlan brief", "show vlan", "sh vlan brief"] — có "show vlan" và "sh vlan brief" nhưng KHÔNG có "sh vlan". Bộ chấm so theo TỪ nguyên vẹn (containsPhrase trong src/engine/grading/normalize.ts) nên "sh interfaces trunk" không khớp được "sh int trunk".

**Cách chữa:** Thêm vào accept của m14-mt-7 và m14-b4-ret-1: "sh interfaces trunk", "sh interface trunk". Thêm vào accept của m14-b1-ret-1: "sh vlan". Không phải bỏ bớt gì — chỉ vá đúng lỗ hổng giữa hai mức viết tắt đã được chấp nhận sẵn.

### `m15-b3-ret-1, m15-b4-ret-1, m15-b2-ret-1` — module-15 · NẶNG
**Vấn đề:** Ba câu Nhớ lại gõ tay chấm SAI người trả lời ĐÚNG, vì danh sách Chấp nhận thiếu đúng những cách nói tự nhiên nhất. Nặng nhất là m15-b4-ret-1: chính lời giải mẫu của app viết 'chính các switch tự tính lại cây', nhưng gõ đúng câu đó lại bị chấm sai.

**Bằng chứng:** Tôi chạy thẳng hàm chấm của app (typedAnswerMatches trong src/engine/grading/normalize.ts) với đúng danh sách accept trong content/modules/module-15.json. Kết quả: m15-b3-ret-1 hỏi 'cổng bị STP chặn có CÒN nghe BPDU không?' accept = [có, co, vẫn nghe, van nghe, có vẫn nghe] → gõ 'còn' SAI, 'còn nghe' SAI, 'vẫn còn nghe' SAI. m15-b4-ret-1 accept = [không ai, tự nó, stp, chính switch, switch tự làm...] → 'các switch' SAI, 'chính các switch' SAI, 'các switch tự tính lại' SAI, 'không cần ai cả' SAI. m15-b2-ret-1 accept có 'mac nhỏ hơn / mac thấp hơn' → 'mac bé hơn' SAI, dù phần Tự giải thích của CHÍNH bài 2 liệt kê nhóm ý [nhỏ hơn, thấp hơn, bé hơn] là ba cách nói tương đương.

**Cách chữa:** Thêm vào accept: m15-b3-ret-1 thêm 'còn', 'con', 'còn nghe', 'con nghe', 'vẫn còn nghe', 'van con nghe', 'có nghe'. m15-b4-ret-1 thêm 'các switch', 'cac switch', 'chính các switch', 'chinh cac switch', 'các switch tự tính lại', 'không cần ai', 'khong can ai', 'tự động', 'tu dong'. m15-b2-ret-1 thêm 'mac bé hơn', 'mac be hon', 'địa chỉ mac bé hơn', 'mac nhỏ nhất', 'mac nho nhat'.

### `m16-mt-7, m16-b3-prac-2` — module-16 · NẶNG
**Vấn đề:** Hai câu này hỏi tên của wildcard mask nhưng danh sách Chấp nhận lại loại đúng cái tên mà Module 13 đã dạy suốt: "mặt nạ lộn ngược". Tệ hơn, gợi ý tầng 2 của chính câu này mớm cho người học đúng chữ đó rồi lại chấm sai khi họ gõ ra. Câu m16-mt-7 nằm trong pool đề thi nên nó ăn thẳng vào cửa 85%.

**Bằng chứng:** Chấp nhận của cả hai câu: ["wildcard", "wildcard mask", "mặt nạ đảo", "mat na dao", "mặt nạ ngược", "mat na nguoc"] — không có "lộn ngược". Nhưng gợi ý tầng 2 của m16-b3-prac-2 viết: "Nó là subnet mask lộn ngược: chỗ nào phải khớp thì ghi 0, chỗ nào tùy ý thì ghi 255." Và gợi ý tầng 1 chỉ thẳng về "loại mặt nạ đã học ở Module 13" — nơi bài m13-bai-4 tên là "Đọc được mặt nạ lộn ngược" và khái niệm wildcard-mask định nghĩa "Mặt nạ lộn ngược của subnet mask" (cụm "lộn ngược" xuất hiện 11 lần trong module-13.json, cụm "mặt nạ đảo" 0 lần). Chạy thử đúng luật chấm của app (src/engine/grading/normalize.ts, khớp theo dãy từ nguyên): "mặt nạ lộn ngược" → SAI, "mat na lon nguoc" → SAI, "subnet mask lộn ngược" → SAI.

**Cách chữa:** Thêm vào accept của m16-mt-7 và m16-b3-prac-2: "mặt nạ lộn ngược", "mat na lon nguoc", "mask lộn ngược", "mask lon nguoc", "subnet mask lộn ngược". Nếu muốn thống nhất chữ nghĩa toàn khóa thì đổi luôn đề và lời giải của m16 từ "mặt nạ đảo" sang "mặt nạ lộn ngược" cho khớp Module 13.

### `m16-mt-2, m16-b1-ret-1` — module-16 · NẶNG
**Vấn đề:** Đề hỏi "bạn khai những mạng CỦA AI?" — câu hỏi kiểu "của ai" thì câu trả lời tự nhiên nhất là "của chính nó". Nhưng mọi đáp án chấp nhận đều bắt buộc phải có chữ "mạng" đứng đầu, nên người hiểu đúng trăm phần trăm mà trả lời gọn theo đúng ngữ pháp của đề vẫn bị chấm sai. m16-mt-2 nằm trong pool đề thi.

**Bằng chứng:** Đề m16-mt-2: "Với định tuyến động, trên mỗi router bạn khai những mạng của ai?" Chấp nhận: ["mạng của chính nó", "mang cua chinh no", "mạng của mình", "mang cua minh", "mạng nối trực tiếp", "mang noi truc tiep", "mạng của chính router đó", "mang cua chinh router do"] — cả 8 mục đều mở đầu bằng "mạng". Luật chấm chỉ khớp khi đáp án nằm trọn trong câu người học, nên câu ngắn hơn không bao giờ khớp. Chạy thử: "của chính nó" → SAI, "chính nó" → SAI, "của chính router đó" → SAI, "của mình" → SAI, "của nó" → SAI.

**Cách chữa:** Thêm vào accept của cả m16-mt-2 lẫn m16-b1-ret-1 các dạng không có chữ "mạng": "của chính nó", "cua chinh no", "chính nó", "chinh no", "của mình", "cua minh", "của chính router đó", "cua chinh router do", "nối trực tiếp", "noi truc tiep". Cách khác gọn hơn: sửa đề thành "...bạn khai những mạng nào?" để đáp án tự nhiên lại bắt đầu bằng chữ "mạng".

### `m17-b1-ret-1` — module-17 · NẶNG
**Vấn đề:** Câu Nhớ lại về dòng cấm vô hình — khái niệm xương sống của cả module — chấm SAI người trả lời đúng. Chính câu định nghĩa mà app tự viết cho khái niệm này, gõ nguyên văn vào ô trả lời, cũng bị chấm sai. Nguyên nhân kép: danh sách Chấp nhận có "cấm những gì chưa được cho phép" nhưng thiếu bản có chữ "tất cả", và bộ chấm tắt chế độ khớp-chứa khi câu trả lời mang chữ "không"/"chưa" — trong khi chủ đề này gần như bắt người học phải dùng đúng mấy chữ ấy.

**Bằng chứng:** Định nghĩa khái niệm m17-implicit-deny trong chính file nội dung: "Cuối mọi danh sách có một dòng không in ra: cấm tất cả những gì chưa được cho phép". Chạy thử bộ chấm thật (typedAnswerMatches + accept của m17-b1-ret-1): "cấm tất cả những gì chưa được cho phép" → SAI; "cấm tất cả những gì không được cho phép" → SAI; "cấm tất cả những gói không khớp dòng nào" → SAI; "chặn hết" → SAI. Trong khi lời giải tầng 3 của chính câu này viết: "Nó cấm tất cả. Gói không khớp dòng nào thì rơi vào dòng vô hình ấy và chết."

**Cách chữa:** Thêm vào accept vài cụm NGẮN có mang chữ phủ định, để lá chắn phủ định không đóng cửa: "không được cho phép", "khong duoc cho phep", "chưa được cho phép", "chua duoc cho phep", "không khớp dòng nào", "khong khop dong nao". Thêm luôn "chặn hết", "chan het", "cấm mọi thứ", "cam moi thu". Đã thử lại với bộ chấm: chỉ cần thêm nhóm này là cả bốn câu trả lời bị oan ở trên đều được chấm đúng.

### `m17-mt-9, m17-b4-prac-2, m17-b4-ret-1, m17-mt-7` — module-17 · NẶNG
**Vấn đề:** Bốn câu gõ tay có danh sách Chấp nhận neo chết vào một lối nói kèm chữ đệm ("bị…", "số…"), nên người hiểu đúng mà diễn đạt hơi khác là mất điểm. Hai trong bốn câu nằm trong pool đề thi, tức là chấm oan ngay ở cửa 85%.

**Bằng chứng:** m17-mt-9 và m17-b4-prac-2 có "bị tắt bằng lệnh" nhưng không có "tắt bằng lệnh" trần, có "bị shutdown" nhưng không có "shutdown" trần → chạy bộ chấm: "cổng bị người quản trị tắt bằng lệnh" SAI, "do người quản trị tắt bằng lệnh" SAI, "do quản trị viên gõ shutdown" SAI. m17-b4-ret-1 có "số địa chỉ mac" và "số mac" nhưng lối nói tự nhiên nhất "số lượng địa chỉ MAC" → SAI, "giới hạn số lượng địa chỉ MAC trên cổng" → SAI. m17-mt-7: "lúc gói mới vào cổng" → SAI (accept chỉ có "lúc gói đi vào cổng").

**Cách chữa:** Thêm accept ở dạng CỤM LÕI, bỏ chữ đệm đầu câu — bộ chấm khớp-chứa sẽ tự cứu mọi biến thể: m17-mt-9 + m17-b4-prac-2 thêm "tắt bằng lệnh", "tat bang lenh", "shutdown"; m17-b4-ret-1 thêm "số lượng địa chỉ mac", "so luong dia chi mac", "số lượng máy", "so luong may"; m17-mt-7 thêm "mới vào cổng", "moi vao cong", "đi vào cổng", "di vao cong". Đã thử: chỉ thêm "tắt bằng lệnh" + "shutdown" là ba câu trả lời bị oan ở trên đều đúng.

### `m18-b4-prac-2` — module-18 · NẶNG
**Vấn đề:** Câu gõ tay hỏi "Cuốn sổ TRONG đã làm gì với cái tên www?" có danh sách Chấp nhận hẹp tới mức chính LỜI GIẢI của nó gõ ra cũng bị chấm sai. Bộ chấm so theo cụm từ liền mạch, nên chỉ cần chèn một chữ vào giữa là trượt.

**Bằng chứng:** Lời giải tầng 3 viết: "Sổ trong TRỎ WWW VỀ ĐỊA CHỈ NỘI BỘ của máy chủ web". Nhưng Chấp nhận chỉ có ["trỏ về địa chỉ nội bộ","trả địa chỉ nội bộ","trỏ về ip nội bộ","trả ip trong nhà","trỏ thẳng vào máy chủ trong nhà"]. Chạy đúng thuật toán trong src/engine/grading/normalize.ts (containsPhrase — cụm từ phải liền mạch), các câu sau đều FAIL: "trỏ www về địa chỉ nội bộ" (nguyên văn lời giải), "trả về địa chỉ nội bộ", "trả về IP nội bộ", "trỏ về địa chỉ trong nhà", "trỏ về máy chủ web nội bộ", "trỏ nó về địa chỉ nội bộ".

**Cách chữa:** Thêm vào accept của m18-b4-prac-2 các biến thể ngắn, không dấu song song: "về địa chỉ nội bộ", "ve dia chi noi bo", "về ip nội bộ", "ve ip noi bo", "về địa chỉ trong nhà", "ve dia chi trong nha", "về máy chủ nội bộ", "ve may chu noi bo", "địa chỉ nội bộ", "dia chi noi bo". Cụm ngắn "về địa chỉ nội bộ" bắt trọn cả "trỏ…", "trả…", "trỏ www…" mà không mở cửa cho câu sai (câu phủ định đã bị lá chắn NEGATIONS chặn sẵn).

**Người phản biện chỉnh lại:** PHẦN BỆNH: họ ĐÚNG hoàn toàn, đã xác nhận bằng bộ chấm thật — accept của m18-b4-prac-2 hẹp tới mức từ chối chính lời giải tầng 3 của nó, và từ chối các cách nói tự nhiên nhất ("trả về địa chỉ nội bộ", "trỏ nó về...", "trỏ www về..."). Cần sửa.

PHẦN CHỮA: cắt bớt 2 mục. Thêm 8 mục này (bỏ cặp trần "địa chỉ nội bộ"/"dia chi noi bo" mà họ đề xuất):
"về địa chỉ nội bộ", "ve dia chi noi bo", "về ip nội bộ", "ve ip noi bo", "về địa chỉ trong nhà", "ve dia chi trong nha", "về máy chủ nội bộ", "ve may chu noi bo".
Đo được: 8 mục này đã bắt trọn 9/9 cách nói đúng (kể cả nguyên văn lời giải); thêm cặp trần vào chỉ mở cửa cho 3 câu rác chứ không cứu thêm câu đúng nào. Cặp trần vi phạm đúng luật "cụm quá NGẮN là bẫy" của chính dự án.

Hai việc kèm theo, không có trong phát hiện của họ:
a) Sửa xong nên rút gọn luôn lời giải tầng 3 để nó mở đầu bằng cụm đáp án ngắn (GHI-CHU dòng 309-311: accept[0] là chữ hiện ở dòng "Đáp án:", đừng để lệch với lời giải).
b) Ngưỡng 9 chữ của cổng trong content.test.ts là chỗ lọt lưới có hệ thống — mọi câu gõ tay có lời giải mệnh đề đầu dài đều đang không được gác. Đáng quét lại toàn bộ 21 module bằng ngưỡng nới hơn để xem còn bao nhiêu câu cùng bệnh; đây có thể không phải ca duy nhất.

Còn một lọt lưới nhỏ chấp nhận được ở cả hai phương án: "sổ ngoài mới trả về địa chỉ nội bộ" (sai chủ ngữ) vẫn PASS — không đáng đánh đổi thêm vì đề đã nêu rõ "Cuốn sổ TRONG".

### `m18-b2-prac-2` — module-18 · vừa
**Vấn đề:** Câu gõ tay hỏi "Con số nào của scope phải được theo dõi?" chấp nhận "tỉ lệ đã cấp" và "tỉ lệ sử dụng" nhưng lại bỏ sót đúng những cách nói cùng nghĩa mà người hiểu bài rất dễ gõ ra. Danh sách phủ không đều: có "tỉ lệ đã cấp" mà thiếu "tỉ lệ đã dùng"; có "tỉ lệ sử dụng" mà thiếu "phần trăm sử dụng".

**Bằng chứng:** Chấp nhận hiện tại: ["tỉ lệ cấp phát","tỷ lệ cấp phát","tỉ lệ đã cấp","phần trăm đã cấp","số địa chỉ đã cấp","tỉ lệ sử dụng"] (+ bản không dấu). Chạy bộ chấm thật, các câu sau đều FAIL: "tỉ lệ đã dùng", "phần trăm sử dụng", "tỉ lệ lấp đầy", "tỉ lệ địa chỉ đã cấp", "số suất còn trống". Riêng "tỉ lệ địa chỉ đã cấp" trượt chỉ vì chữ "địa chỉ" chen vào giữa cụm đã có sẵn trong accept.

**Cách chữa:** Bổ sung vào accept của m18-b2-prac-2 (kèm bản không dấu): "tỉ lệ đã dùng", "tỷ lệ đã dùng", "phần trăm sử dụng", "phần trăm đã dùng", "tỉ lệ lấp đầy", "tỉ lệ suất đã cấp", "số suất đã cấp", "số suất còn trống", "tỉ lệ còn trống". Hoặc gọn hơn: thêm cụm ngắn "đã cấp", "da cap", "đã dùng", "da dung" để luật khớp-chứa bắt trọn mọi biến thể.

**Người phản biện chỉnh lại:** Câu m18-b2-prac-2 (bước Thử tay, module 18) có danh sách accept phủ lệch giữa hai khung diễn đạt cùng nghĩa. Khung "cấp phát/đã cấp" được phủ dày (tỉ lệ cấp phát, tỉ lệ đã cấp, phần trăm đã cấp, số địa chỉ đã cấp), còn khung "sử dụng/đã dùng" chỉ có đúng một biến thể "tỉ lệ sử dụng" — trong khi cụm này thậm chí KHÔNG hề xuất hiện ở màn dạy nào, chứng tỏ người soạn đã chủ động chấp nhận cách nói đó rồi bỏ dở. Hậu quả (đã tái hiện bằng bộ chấm thật): "tỉ lệ đã dùng", "tỷ lệ đã dùng", "phần trăm sử dụng", "phần trăm đã dùng", "tỉ lệ lấp đầy", "số suất đã cấp", "tỉ lệ suất đã cấp", "tỉ lệ địa chỉ đã cấp" đều bị chấm sai. Riêng gợi ý của chính câu này lại mồi chữ "phần trăm", khiến người theo gợi ý gõ "phần trăm sử dụng" bị đánh trượt dù hiểu đúng bài.

CÁCH CHỮA ĐÚNG — chỉ thêm từ đồng nghĩa thật, kèm bản không dấu:
"tỉ lệ đã dùng" / "ti le da dung", "tỷ lệ đã dùng" / "ty le da dung", "phần trăm sử dụng" / "phan tram su dung", "phần trăm đã dùng" / "phan tram da dung", "tỉ lệ lấp đầy" / "ti le lap day", "số suất đã cấp" / "so suat da cap", "tỉ lệ suất đã cấp" / "ti le suat da cap", "tỉ lệ địa chỉ đã cấp" / "ti le dia chi da cap".

KHÔNG làm hai thứ sau:
- KHÔNG thêm cụm ngắn trần "đã cấp"/"đã dùng" như họ gợi ý phương án gọn. Bộ chấm khớp theo cụm từ liên tiếp, nên "đã dùng" trần sẽ cho đậu cả "số ngày lease đã dùng" — câu trả lời sai.
- Cân nhắc RIÊNG, đừng gộp: "số suất còn trống"/"tỉ lệ còn trống" là chỉ số ngược với lời giải đang khẳng định, muốn nhận thì phải sửa cả lời giải cho nhất quán.

Hạ mức từ "vua" xuống "thap-vua": lỗi nằm ở bước Thử tay có gợi ý mờ dần và lời giải, và không có câu tương ứng trong pool đề thi nên không ảnh hưởng mastery gate 85%.

### `m20-b5-ret-1` — module-20 · NẶNG
**Vấn đề:** Câu "baseline được vẽ từ đâu?" chấm SAI phần lớn cách nói đúng. Danh sách chấp nhận toàn cụm dài, người học phải trúng gần đúng chữ mới được điểm — kể cả chính lời giải của app, nếu bỏ mấy chữ "polling và log", cũng bị chấm sai.

**Bằng chứng:** Accept của câu: "từ dữ liệu của chính hệ thống | dữ liệu polling và log | lịch sử của chính hệ thống | dữ liệu của chính mình | polling và log". Chấm thử bằng đúng bộ chấm của app (grade_answer): "từ chính dữ liệu của hệ thống mình" → SAI; "từ dữ liệu quá khứ của chính hệ thống" → SAI; "dữ liệu thu được từ chính mạng của mình" → SAI; "từ lịch sử số đo của chính máy đó" → SAI; "từ log và polling của chính mình" → SAI (chỉ vì đảo thứ tự hai chữ). Trong khi lời giải in ra cho người học là "Từ chính dữ liệu polling và log của hệ thống mình".

**Cách chữa:** Thêm vào accept các CỤM LÕI ngắn thay vì cụm dài, để bộ chấm khớp-chứa bắt được: "của chính hệ thống", "của chính mình", "của hệ thống mình", "của chính mạng", "của chính máy", "chính máy đó", "polling", "log và polling", "log va polling". Giữ nguyên các cụm dài đang có.

### `m21-mt-stp2, m21-mt-8` — module-21 · NẶNG
**Vấn đề:** Hai câu gõ tay trong ĐỀ THI từ chối những cách nói mà người hiểu đúng rất dễ viết ra. Câu về cổng STP không nhận "blocking"/"BLK" — đúng chữ mà Module 15 bắt học thuộc hai lần — và cũng không nhận "cổng đang bị chặn" hay "cổng bị STP chặn" (nguyên văn lời giải nghĩa khái niệm của Module 15), chỉ vì thừa một chữ chen vào giữa cụm. Câu về ACL thì nhận "deny ngầm" nhưng lại đánh trượt "dòng cấm ngầm" — cùng một ý, chỉ khác một chữ tiếng Anh đổi sang tiếng Việt.

**Bằng chứng:** m21-mt-stp2 accept = ["cổng dự phòng","cổng bị chặn","cổng block","blocked port","cổng đang nằm im"]. Chấm thử bằng chính bộ chấm của app: "blocking" → sai, "cổng blocking" → sai, "cổng đang bị chặn" → sai, "cổng bị STP chặn" → sai. Trong khi module-15 có hai câu accept đúng ["blk","BLK","blocking"] (m15-b3-prac-1, m15-mt-4) và lời giải nghĩa khái niệm cong-chan viết y nguyên "Cổng bị STP chặn". Lời giải của chính m21-mt-stp2 cũng viết "(BLK)". m21-mt-8: "deny ngầm" → đúng, còn "dòng cấm ngầm" và "cấm ngầm" → sai.

**Cách chữa:** Thêm vào accept của m21-mt-stp2: "blk", "blocking", "cổng blocking", "cong blocking", "cổng đang bị chặn", "cong dang bi chan", "cổng bị stp chặn", "cong bi stp chan", "cổng đang bị stp chặn", "cổng backup", "cong backup". Thêm vào accept của m21-mt-8: "cấm ngầm", "cam ngam", "dòng cấm ngầm", "dong cam ngam", "dòng deny ngầm", "dong deny ngam".

## Lớp 1 — Đề đòi thứ bài chưa dạy (13 phát hiện)

### `m1-mt-12, m1-b5-ret-1` — module-1 · NẶNG
**Vấn đề:** Hai câu này hỏi thứ CHỈ nằm trong khối "Đào sâu hơn" — khối đó bị giấu sau một nút bấm, người học không mở thì chưa từng nhìn thấy chữ nào về nó. Câu thi m1-mt-12 đòi biết "mỗi gói mang số thứ tự nên máy nhận xếp lại được", còn câu Nhớ lại m1-b5-ret-1 đòi nhận ra HTTP/TCP/IP là gì trong khi màn dạy chính của bài 5 không hề nhắc tới ba cái tên đó (bullet tổng kết có nhắc, nhưng tổng kết đứng SAU bước Nhớ lại).

**Bằng chứng:** Tìm cả module-01.json, cụm "số thứ tự" chỉ xuất hiện ở 2 chỗ dạy — đều nằm trong trường "deepDive": dòng 55 "Mỗi gói tin gồm header (...địa chỉ, số thứ tự) và payload..." và dòng 599 "...số thứ tự trong header giúp máy nhận ráp về đúng trật tự" — cộng với chính câu m1-mt-12. Màn dạy chính bài 1 chỉ nói "mỗi phong bì tự mang địa chỉ", không có số thứ tự. Tương tự, HTTP/TCP/IP chỉ có ở deepDive bài 5 (dòng 498), thân bài chính (dòng 495) không nhắc. Mã nguồn xác nhận khối này là tùy chọn: src/features/learn/LessonPlayer.tsx dòng 168 ghi "deepDive giấu sau nút", và dòng 174 `useState(false)` — mặc định đóng.

**Cách chữa:** Đưa ý "gói đi nhiều đường nên đến lộn xộn, số thứ tự trong header giúp ráp lại" ra khỏi deepDive, thành một câu trong thân màn dạy `hanh-trinh-goi-tin` của m1-bai-6, kèm một bullet tổng kết; rồi thêm một câu Thử tay ở m1-bai-6 hỏi "các gói đến lộn xộn thì máy nhận dựa vào đâu để xếp lại?" trước khi đề thi hỏi. Với bài 5: thêm một câu vào thân màn dạy `giao-thuc` — "HTTP lo nội dung web, TCP lo gửi đủ và đúng thứ tự, IP lo địa chỉ" — thay vì để nguyên trong deepDive.

**Người phản biện chỉnh lại:** Chỉ m1-mt-12 là lỗi, và ở mức VỪA chứ không nặng: đáp án đúng dựa vào cơ chế "mỗi gói mang số thứ tự trong header" — cụm này trong module-01 chỉ tồn tại ở hai ô "Đào sâu hơn" (bài 1 và bài 6, mặc định đóng), thân màn dạy bắt buộc quy việc ráp lại cho "cùng giao thức" chứ không nhắc số thứ tự, còn chỗ dạy thật của cơ chế nằm mãi ở module 5. Người học đi đúng đường vẫn chọn đúng được bằng loại trừ (phương án "đường truyền giữ nguyên thứ tự" tự mâu thuẫn với đề; phương án "router xếp lại" trái với thứ module dạy 6 lần là MÁY NHẬN ráp lại), nên đây là chỗ hổng "thi thứ chưa dạy chính thức", không phải câu đánh đố không trả lời nổi. Cách chữa rẻ nhất: đưa một câu "các gói có thể đến lộn xộn, số thứ tự trong header cho máy nhận xếp lại đúng trật tự" vào THÂN màn dạy `hanh-trinh-goi-tin` (m1-bai-6) — hoặc, nếu muốn giữ M1 thật mỏng, chuyển hẳn câu m1-mt-12 sang pool module 5 nơi cơ chế được dạy đàng hoàng, và bù một câu khác cho pool M1 (pool đang đúng 12 câu, rút 8, không được tụt dưới 12).

Câu m1-b5-ret-1 KHÔNG phải lỗi, không cần sửa: nó hỏi tên gọi chung "giao thức" — thứ đã dạy ở thân bài, đã hỏi ở pretest và đã luyện ở Thử tay ngay trước đó — chứ không đòi người học biết HTTP, TCP, IP mỗi cái làm gì.

### `m1-mt-8` — module-1 · vừa
**Vấn đề:** Câu thi hỏi hai máy trong cùng một mạng có được trùng địa chỉ IP không. Nhưng suốt module 1 chưa bài nào nói địa chỉ IP phải là DUY NHẤT, cũng chưa nói trùng IP thì hỏng chuyện gì. Bài chỉ dạy "mỗi máy có một địa chỉ IP" — đó là câu nói về việc máy nào cũng có địa chỉ, không phải câu cấm trùng.

**Bằng chứng:** Màn dạy m1-bai-2 nguyên văn: "Mỗi máy trên mạng có một địa chỉ IP, như mỗi ngôi nhà có một địa chỉ đường." Tìm cả file module-01.json, chữ "duy nhất" và "trùng" theo nghĩa này chỉ xuất hiện ở dòng 805, 809, 810 — tức là bên trong chính câu m1-mt-8 (mồi nhử, gợi ý và lời giải), không có ở bất kỳ màn dạy, bullet tổng kết hay câu luyện nào. Tra CHI-MUC.md: bệnh trùng IP mãi tới module-11 mới được dạy (m11-bai-4 "Hai kẻ giành một số nhà", khái niệm `m11-arp-doi-chu`) — tức là 10 module sau.

**Cách chữa:** Thêm một câu vào thân màn dạy `dia-chi-ip` của m1-bai-2: "Trong cùng một mạng, hai máy không được mang cùng một địa chỉ IP — hai nhà ghi trùng số thì thư không biết giao vào đâu", kèm một bullet tổng kết tương ứng. Nếu không muốn thêm nội dung thì đổi m1-mt-8 sang hỏi thứ đã dạy hẳn (ví dụ vì sao bưu tá không cần mở thư).

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng — hạ mức xuống "thấp": Module 1 quả thật chưa BAO GIỜ nói tường minh "địa chỉ IP phải duy nhất trong một mạng" (kiểm cả 6 màn dạy, 18 bullet tổng kết, các bước Thử tay/Nhớ lại/Tự giải thích — không có; grep toàn 21 module cho thấy tính duy nhất chỉ được dạy hẳn ở m11-bai-4). Nhưng m1-mt-8 KHÔNG đòi kiến thức module 11: nó chỉ đòi suy ra một bước từ thứ đã dạy ("IP là dãy số định danh", "mỗi ngôi nhà một địa chỉ", "gói tin tìm đúng MỘT máy giữa hàng tỷ máy"), và cả hai mồi nhử đều bị nội dung module 1 bác trực tiếp (tên máy đã bị pretest m1-b2-pre-1 loại làm định danh; port chỉ phân biệt ứng dụng trong CÙNG một máy). Vì vậy đây là câu chuyển giao (transfer) hợp lệ, chỉ thiếu một mệnh đề chốt trong bài dạy.

Cách chữa nên làm: giữ nguyên m1-mt-8 (đừng đổi sang "vì sao bưu tá không cần mở thư" — câu đó đã là phần Tự giải thích của m1-bai-2, đổi thế là trùng lặp), chỉ thêm một mệnh đề vào cuối thân màn dạy `dia-chi-ip` của m1-bai-2, ví dụ: "…thư sẽ về đúng cửa. Cũng vì thế, hai nhà trong cùng một xóm không được ghi trùng số nhà — trong một mạng, mỗi máy giữ một địa chỉ IP riêng." Và sửa bullet tổng kết 1 thành "Mỗi máy trên mạng mang một địa chỉ IP RIÊNG — như địa chỉ nhà của nó." Cách này không tạo khái niệm mới (vẫn thuộc concept `dia-chi-ip`) nên không phạm luật "một màn hình = một khái niệm mới".

### `drill-subnet: qBroadcast, qHostRange, qHostCount, qPrefixForHosts` — module-3 · NẶNG
**Vấn đề:** Module 3 khai drill riêng của mình là drill subnet, và bài m3-bai-5 dặn người học ghé luyện mỗi ngày. Nhưng drill trộn đều 6 loại đề, trong đó 4 loại hỏi thứ module 3 chưa hề dạy một chữ nào: địa chỉ broadcast, host đầu/cuối dùng được, số host dùng được (trừ 2), và chọn prefix cho N host.

**Bằng chứng:** module-03.json dòng 7 khai "drill": "subnet". Đề drill trong src/i18n/vi.json: "Tìm địa chỉ broadcast của host {ip}/{prefix}." · "tìm host đầu tiên và cuối cùng dùng được" · "Mạng {ip}/{prefix} có bao nhiêu host dùng được?" · "Cần một mạng chứa được {hosts} host — prefix nhỏ nhất đủ dùng là bao nhiêu". Trong khi đó grep chữ "broadcast" trên toàn bộ content/modules/ chỉ ra module-04, 13, 15, 20 — module-03.json KHÔNG có một lần nào. Luật "trừ 2 địa chỉ cho mạng và broadcast" mãi module-13 mới dạy (module-13.json: "Mỗi khối mất hai địa chỉ cho mạng và broadcast, nên số máy dùng được là 14, 30, 62, 126"). src/engine/subnet/drill.ts trộn cả 6 loại đều tay: ALL_TYPES gồm network-addr, broadcast, host-range, host-count, prefix-for-hosts, mask-convert — chỉ loại đầu tiên là thứ module 3 có dạy.

**Cách chữa:** Thêm một màn dạy "Đọc trọn một khối" vào cuối m3-bai-5 (hoặc tách thành bài m3-bai-6 mới, đẩy IPv6 xuống): từ magic number đã có, dạy tiếp 3 dòng còn lại của cùng một khối — địa chỉ đầu khối là network, địa chỉ cuối khối là broadcast ("tiếng gọi cả khu phố"), ở giữa là dải số nhà thật, nên số host dùng được = cỡ khối trừ 2. Kèm 1 câu thử tay (tìm broadcast của 192.168.1.75/26) và 1 câu nhớ lại (một mạng /27 có mấy host dùng được). Nếu không muốn mở rộng nội dung thì phải cắt drill xuống còn network-addr + mask-convert cho tới khi có bài dạy.

### `m3-mt-10, m3-b5-prac-2` — module-3 · NẶNG
**Vấn đề:** Câu thi bắt tìm network address của 10.0.5.77/28, mà cả module chưa bao giờ cho biết /28 ứng với mask 255.255.255.240 — cũng chưa dạy luật nào để tự suy ra mask của một prefix bất kỳ. Tệ hơn, người học vẫn có thể đúng mà không cần tính: câu luyện m3-b5-prac-2 hỏi đúng IP 10.0.5.77 (chỉ khác prefix /27) và đáp án cũng đúng bằng 10.0.5.64 — nhớ đáp án cũ là qua.

**Bằng chứng:** Chuỗi "255.255.255.240" xuất hiện đúng MỘT lần trong module-03.json: chính ở phần "Vì sao" của m3-mt-10 (dòng 895). Bài m3-bai-4 chỉ cho "Quy đổi nhanh: /24 ↔ 255.255.255.0, /16 ↔ 255.255.0.0" và thêm "/8 ↔ 255.0.0.0". Phần Đào sâu của m3-bai-5 phát bốn cặp nhớ sẵn: "/25 → 256−128 = 128; /27 → 256−224 = 32; /30 → 256−252 = 4" — không có /28, và phần Đào sâu này còn bị giấu sau nút bấm (LessonPlayer.tsx dòng 168: "deepDive giấu sau nút"). Câu luyện m3-b5-prac-2: "Tìm network address của 10.0.5.77/27" → chấp nhận "10.0.5.64"; câu thi m3-mt-10: "Tìm network address của 10.0.5.77/28" → chấp nhận "10.0.5.64".

**Cách chữa:** Hai việc: (1) Thêm vào màn dạy CIDR của m3-bai-4 bảng quy đổi octet dở dang — /25 128, /26 192, /27 224, /28 240, /29 248, /30 252 — kèm câu giải thích "mỗi bit thêm vào hàng rào là cắt đôi khu phố". (2) Đổi đề m3-mt-10 sang một IP khác hẳn các câu đã luyện (vd 172.16.20.100/28 → 172.16.20.96) để câu thi đo được phép tính chứ không đo trí nhớ đáp án cũ. Sửa luôn phần "Vì sao" liệt kê mốc từ .0 (.0, .16, .32… .96) thay vì nhảy thẳng vào ".64 rồi .80".

**Người phản biện chỉnh lại:** Phát biểu lại cho chính xác: Câu thi m3-mt-10 hỏi network address của 10.0.5.77/28, nhưng cặp "/28 ↔ 255.255.255.240" không xuất hiện ở bất kỳ màn dạy nào của module-3 — chuỗi đó chỉ có đúng một lần trong module-03.json, ở chính phần "Vì sao" của mt-10 (dòng 895), tức là chỉ hiện SAU khi đã trả lời. Các cặp được phát: /24, /16, /8 (m3-bai-4), /26 (màn dạy m3-bai-5), /25, /27, /30 (Đào sâu m3-bai-5, bị thu gọn sau nút — LessonPlayer.tsx, state deepDiveOpen mặc định đóng). Nói "chưa dạy luật nào để tự suy ra mask" là hơi quá: phần Đào sâu m3-bai-5 (dòng 535) có giải thích 192 = 11000000 → 6 bit host → 2^6 = 64, người học tổng quát hóa được thì tự ra khối 16 cho /28 mà không cần con số 240; nhưng luật này chỉ nêu cho riêng /26, không phát biểu thành quy tắc chung, và nằm sau nút bấm — nên với người học đi đường thẳng qua các màn dạy, câu thi vẫn là không tính được.

Lỗ hổng đo lường thì đúng y nguyên như họ nói và nghiêm trọng hơn phần thiếu kiến thức: m3-b5-prac-2 hỏi CÙNG một IP "10.0.5.77" (chỉ khác /27) và có CÙNG accept "10.0.5.64" — người học nhớ đáp án cũ là qua mà không cần nhẩm gì.

Mức nên hạ từ "nặng" xuống "vừa": kỹ năng magic number vẫn còn được đo bởi ba câu khác trong pool (m3-mt-5 /26, m3-mt-6 172.16.4.201/25, m3-mt-8 sắp xếp bước), pool 12 rút 8 cần 7/8 — hỏng một câu không mở toang được cổng mastery.

Cách chữa giữ nguyên cả hai việc họ đề xuất, thêm một ý: nên phát bảng quy đổi octet ở màn dạy m3-bai-4 (không phải Đào sâu) để không bị nút thu gọn nuốt mất, và khi đổi IP cho m3-mt-10 thì nhớ đổi luôn ví dụ trong phần "Vì sao" cho khớp, đồng thời liệt kê mốc từ .0 thay vì nhảy thẳng vào ".64 rồi .80".

### `m4-mt-11` — module-4 · NẶNG
**Vấn đề:** Câu thi bắt so sánh "bảng MAC" với "bảng ARP", nhưng cụm "bảng ARP" không xuất hiện ở BẤT CỨ bài dạy nào trong toàn khóa. Bài 3 chỉ nói máy "nhớ luôn vào bộ nhớ tạm" — không hề đặt tên cho cuốn sổ đó, cũng không nói nó ghi hai cột IP–MAC ở màn dạy. Người học không biết chữ "bảng ARP" thì cả ba phương án đọc lên như nhau, phải đoán.

**Bằng chứng:** Đề m4-mt-11: "Bảng MAC của switch và bảng ARP của máy tính khác nhau ở chỗ nào?". Grep "bảng ARP" trên toàn bộ content/modules/*.json chỉ trúng 4 dòng, TẤT CẢ nằm trong chính câu này (module-04.json dòng 1128–1135). Màn dạy ARP chỉ có: "Hỏi xong máy nhớ luôn vào bộ nhớ tạm để lần sau khỏi hỏi lại"; cụm "cặp IP–MAC" chỉ nằm ở lời giải tầng 3 của m4-b3-prac-2, không phải màn dạy.

**Cách chữa:** Thêm vào màn dạy ARP (m4-bai-3) một câu đặt tên: "bộ nhớ tạm các cặp IP–MAC này gọi là bảng ARP (ARP cache)", kèm một câu thử tay dùng đúng chữ đó. Nếu không muốn thêm chữ vào bài dạy thì sửa đề m4-mt-11 thành "Cuốn sổ của switch và bộ nhớ tạm IP–MAC của máy tính khác nhau ở chỗ nào?" và sửa hai phương án theo.

**Người phản biện chỉnh lại:** Đề m4-mt-11 KHÔNG bắt người học đoán. Nửa "bảng MAC" của câu hỏi đã được dạy đầy đủ (màn dạy m4-bai-2 + tên khái niệm "Bảng MAC" in ngay trên màn dạy + thẻ ôn + tổng kết), nên chỉ riêng nửa đó đã loại được cả hai phương án nhiễu: phương án đảo ngược mô tả sai bảng MAC, phương án "hai bảng ghi cùng một thứ" cũng mâu thuẫn bài dạy. Ý "máy giữ bộ nhớ tạm các cặp IP–MAC" cũng đến tay MỌI người học, vì phần solution của m4-b3-prac-2 được bung ra ngay khi trả lời đúng, không phải chỉ ở tầng 3. Cái đúng còn lại, hạ xuống mức nhẹ: nhãn "bảng ARP" chưa từng được đặt tên ở bất kỳ màn dạy nào, lần đầu người học gặp chữ này là trong đề thi. Cách chữa nên làm: thêm một mệnh đề đặt tên vào màn dạy ARP (m4-bai-3, module-04.json:372), ví dụ "...nhớ luôn vào bộ nhớ tạm — cuốn sổ các cặp IP–MAC đó gọi là bảng ARP". Giữ nguyên đề m4-mt-11; không cần sửa phương án, và không cần thêm câu thử tay mới.

### `m5-bai-7 · selfExplain (bước Nhớ lại)` — module-5 · NẶNG
**Vấn đề:** Câu tự giải thích "vì sao thư gửi đi phải qua 587 chứ không phải 25?" đòi người học nhắc tới chuyện CHỐNG THƯ RÁC, nhưng cả màn dạy lẫn mô tả hai căn phòng đều không hề nói tới thư rác — chữ đó chỉ nằm trong khối "Đào sâu hơn" vốn bị gấp lại sau một nút bấm. Vì cách chấm cần chạm ≥60% số ý, mà câu này chỉ có 2 nhóm ý, nên chạm 1 nhóm là trượt: người viết đúng nguyên xi ý bài dạy ("587 bắt đăng nhập nên biết ai gửi") vẫn bị coi là chưa đạt.

**Bằng chứng:** Màn dạy m5-cong-thu-tu chỉ có: "Tầng 4 lo hai việc: thư từ và giờ giấc. Thùng thư bưu cục nhận thư chạy giữa các máy chủ; quầy xuất trình thẻ nhận thư do chính bạn gửi đi". Cụm "thư rác" trong toàn module-05.json chỉ xuất hiện 2 lần: ở deepDive ("Tách 25 và 587 là để chống thư rác…") và ở chính đáp án mẫu. Nhóm từ khóa bắt buộc thứ hai là ["thư rác","spam","giả mạo","chặn"]; LessonPlayer.tsx dòng 174 để deepDive mặc định đóng (useState(false)), và keywordMatch.ts đặt KEYWORD_PASS_RATIO = 0.6 nên 1/2 nhóm = 0.5 → trượt.

**Cách chữa:** Đưa ý chống thư rác lên MÀN DẠY chính của bài 7, thêm một câu vào body: "Tách làm hai là để chặn thư rác: 25 chỉ dành cho bưu cục nói với bưu cục, còn thư của chính bạn phải qua 587 và phải trình thẻ." Đồng thời nới nhóm từ khóa 2 thêm các cách nói người học dễ gõ: "biết ai gửi", "gửi bừa", "mạo danh", "ai cũng gửi được".

**Người phản biện chỉnh lại:** Lớp 1 · mức VỪA (không phải nặng). Câu tự giải thích của m5-bai-7 đòi một ý — lý do tách 25/587 là để chống thư rác — mà thân màn dạy chính không hề nói; ý đó chỉ nằm trong khối "Đào sâu hơn" đang mặc định gấp lại (LessonPlayer.tsx:174). Đáng nói hơn: chính câu Khởi động đã hỏi "Vì sao phải tách làm hai?" nhưng màn dạy chính không trả lời, để dành câu trả lời trong phần gấp — hứa mà không trả. Hệ quả thật KHÔNG phải bế tắc: nộp hỏng lần đầu là app đã gọi tên ý thiếu ("Gần đủ ý rồi — nói thêm về: thư rác"), và sau 3 lần thì mở đáp án mẫu để đi tiếp; cái mất là người viết đúng nguyên xi bài dạy vẫn ăn một nhịp "chưa đạt" oan ở lần 1.

CHỮA: thêm ý chống thư rác vào THÂN màn dạy `m5-cong-thu-tu` (module-05.json:1590), đại ý "Tách làm hai là để chặn thư rác: 25 chỉ dành cho bưu cục nói với bưu cục, còn thư của chính bạn phải qua 587 và phải trình thẻ" — như vậy cũng trả lời luôn câu hook. KHÔNG áp dụng nửa sau đề xuất của người soát: đừng nhét "biết ai gửi" vào nhóm 2 vì đó là ý của nhóm 1, làm thế là hai nhóm cùng bị thỏa bởi một ý. Muốn nới thì chỉ nới bằng các cách nói cùng nghĩa CHỐNG-THƯ-RÁC như "gửi bừa", "ai cũng gửi được", "thư quảng cáo", và giữ nguyên "mạo danh" là thừa vì đã có "giả mạo".

### `m5-mt-11` — module-5 · vừa
**Vấn đề:** Đề thi hỏi vì sao câu tra tên miền (port 53) chọn UDP. Toàn bộ lý lẽ để trả lời chỉ nằm trong khối "Đào sâu hơn" của bài 2 — khối bị gấp sau nút bấm, không mở thì chưa bao giờ gặp. Tệ hơn: nội dung DẠY CHÍNH lại đẩy người học sang hướng ngược, vì nó gắn UDP với "cuộc gọi và trận game" (việc thời gian thực), mà tra tên miền thì không phải việc thời gian thực.

**Bằng chứng:** Đề: "Một câu tra tên miền đi tới port 53 thường chọn UDP thay vì TCP. Vì sao?" — đáp án đúng "Vì câu hỏi và câu trả lời đều ngắn, hỏi lại còn nhanh hơn bắt tay". Cụm này chỉ có ở deepDive dòng 638: "DNS cũng chọn UDP: một câu hỏi, một câu trả lời, gọn trong một gói. Bắt tay ba nhịp chỉ để hỏi một câu ngắn thì phần thủ tục còn dài hơn phần nội dung". Body chính của m5-udp chỉ nói: "thứ mà cuộc gọi và trận game cần hơn là sự hoàn hảo"; tổng kết bài 2 cũng chỉ có "chậm một nhịp là hỏng thì UDP".

**Cách chữa:** Chuyển ý "câu hỏi ngắn thì thủ tục bắt tay còn dài hơn nội dung" từ deepDive lên body của màn m5-udp (thêm một câu, không cần thêm màn), rồi thêm ở bước Thử tay bài 2 một câu áp dụng: "Hỏi DNS chỉ một câu ngắn — nên đi TCP hay UDP, vì sao?" Có vậy đề m5-mt-11 mới là hỏi lại thứ đã dạy.

**Người phản biện chỉnh lại:** Không phải lớp 1 (hỏi thứ chưa dạy) mức vua, mà là lớp "lý lẽ đắt giá bị kẹt trong khối gấp", mức thấp. Sự thật: cặp DNS→UDP ĐÃ có trong luồng chính bài 2 (giải thích mẫu bước Nhớ lại, luôn hiện cho mọi người học — module-05.json dòng 744) và trong flashcard khái niệm m5-udp vào hộp ôn tập (dòng 1969); tổng kết bài 2 cũng dạy "UDP bỏ hết thủ tục" (dòng 752), còn bài 1 dạy bắt tay ba nhịp là phần phải trả trước khi gửi dữ liệu thật. Chỉ riêng câu diễn đạt sắc nhất — "thủ tục còn dài hơn nội dung" — là nằm ở deepDive dòng 638. Đề m5-mt-11 vì thế là câu vận dụng hợp lệ: cho sẵn đáp án UDP, chỉ đòi nhận ra lý lẽ, và hai mồi nhử đều mâu thuẫn với thứ đã dạy trong luồng chính (mã hóa là việc của HTTPS; TCP vẫn chạy trên port nổi tiếng 80/443) nên loại trừ được mà không cần mở khối gấp. Riêng cách chữa của họ vẫn nên nhận phần đầu: kéo một câu "hỏi một câu ngắn mà phải bắt tay ba nhịp thì thủ tục còn dài hơn nội dung" từ deepDive lên body màn m5-udp — rẻ, không thêm màn, làm mạch dạy liền lạc. Phần sau (thêm câu Thử tay về DNS) là tùy chọn, không bắt buộc để đề hợp lệ.

### `m7-mt-12` — module-7 · vừa
**Vấn đề:** Đáp án đúng dựa trên hai việc của tường lửa mà không màn dạy nào trong cả khoá từng nói: "lọc nội dung" và "chặn máy trong nhà đi ra". Bài 3 chỉ dạy tường lửa theo chiều VÀO. Người học chọn trúng là nhờ loại trừ mồi nhử chứ không nhờ hiểu.

**Bằng chứng:** Cụm "lọc nội dung" xuất hiện đúng MỘT lần trong toàn bộ content/modules/*.json — chính là đáp án của m7-mt-12; cụm "chặn máy trong nhà đi ra" cũng vậy. Màn dạy m7-firewall-stateful chỉ nói một chiều: "Gói tin từ ngoài vào chỉ được qua nếu khớp một dòng trong bảng". Thứ gần nhất là câu trả lời mẫu của phần tự giải thích bài 3 ("cho ai đi ra, cho gì đi vào") — văn bản người học chỉ thấy SAU khi đã tự trả lời, không phải một màn dạy. Thêm nữa mồi nhử "tường lửa chỉ cần cho công ty, mạng nhà không có gì đáng để mất" loại được ngay mà không cần biết gì.

**Cách chữa:** Thêm vào m7-bai-3 một phần Đào sâu "Tường lửa còn hai việc NAT không làm": (1) xét cả chiều RA — chặn được máy trong nhà tự gọi ra ngoài (máy dính mã độc gọi về chủ); (2) xem được nội dung chứ không chỉ địa chỉ. Rồi thay mồi nhử thứ ba bằng một mồi nhử nghe hợp lý hơn, ví dụ "Không — port forwarding đã thay được vai của tường lửa rồi".

**Người phản biện chỉnh lại:** Đúng một nửa, và nên phát biểu lại hẹp hơn: cụm "lọc nội dung" quả thật không xuất hiện ở bất kỳ màn dạy, phần Đào sâu, thẻ ôn hay lời giải nào trong toàn khoá (grep ra đúng 1 lần, chính là đáp án này), nên riêng nửa "tường lửa xem được nội dung" là đòi thứ chưa dạy. Nhưng nửa "chặn máy trong nhà đi ra" thì ĐÃ có trong chính bài 3: phần Tự giải thích ở bước Nhớ lại hỏi đúng câu này, chấm bằng từ khoá "luật/chặn/lọc/kiểm soát/chủ động", và câu trả lời mẫu người học đọc ngay sau đó ghi rõ "cho ai đi ra, cho gì đi vào" (LessonPlayer có render exampleAnswer). Đề thi hỏi lại câu Tự giải thích là hợp lệ. Mồi nhử "NAT đã chặn sạch mọi thứ từ ngoài vào" cũng không loại được nếu chưa học — nó chỉ sai với người nhớ "kín MỘT NỬA" ở Đào sâu m7-pat và bài 2 port forwarding, tức loại nó là dùng đúng thứ đã dạy. Cách chữa gọn hơn đề xuất của họ: (a) hoặc bỏ chữ "lọc nội dung" khỏi đáp án, để nó chỉ dựa vào chiều RA đã có trong bài; (b) hoặc thêm một câu vào phần Đào sâu của màn dạy m7-firewall-stateful nói tường lửa còn xét chiều ra và xem được nội dung — nếu chọn (b) thì nên chỉnh luôn mồi nhử pretest m7-b3-pre-1 ("chặn được virus trong tệp tải về") cho khỏi mâu thuẫn. Và điểm cần sửa hơn cả mà họ bỏ sót: câu đang là 1 lựa chọn "Có" đấu 2 lựa chọn "Không", ai cũng đoán trúng theo cảm tính — nên đổi ít nhất một mồi nhử sang dạng khẳng định (ví dụ "Có — nhưng chỉ vì NAT không chặn được người trong nhà truy cập web xấu") thay vì chỉ thay mồi nhử thứ ba như họ đề nghị.

### `m11-b5-prac-ca` — module-11 · NẶNG
**Vấn đề:** Ca thử tay khó nhất bài 5 (mức gợi ý ít nhất, không có ví dụ giải sẵn) đòi hai thứ mà bài chưa dạy: lời đáp "Request timed out" của ping, và chuyện tường lửa chặn ICMP theo CHIỀU VÀO trên máy đích. Cả hai chỉ nằm trong panel "Đào sâu hơn" — panel này mặc định ĐÓNG, người học không bấm thì không bao giờ thấy.

**Bằng chứng:** Màn dạy chính (m11-ipconfig-ping) chốt danh sách đóng: "Ba câu trả lời của ping kể ba câu chuyện khác nhau: Reply…; 'General failure'…; 'Destination host unreachable'…" — không có "Request timed out". Trong cả module-11.json, cụm đó với nghĩa lời đáp của ping chỉ xuất hiện 2 lần: chính đề m11-b5-prac-ca và gợi ý tầng 2 của nó. Còn luật "chặn ICMP chiều vào trên máy đích thì máy đích 'câm' với ping nhưng dịch vụ thật vẫn phục vụ" chỉ có ở deepDive của bài 5 (bài 5 chỉ có ĐÚNG 1 màn dạy), và src/features/learn/LessonPlayer.tsx dòng 168-174 ghi rõ "deepDive giấu sau nút" + useState(false). Ba lựa chọn chẩn đoán là "tường lửa đích chặn ICMP vào" / "dây đích tuột" / "sai gateway" — người bỏ qua deepDive không có chữ nào để tách hai lựa chọn đầu.

**Cách chữa:** Thêm "Request timed out" thành lời đáp thứ tư ngay trong THÂN màn dạy m11-ipconfig-ping (bài 1), viết rõ: gói rời được máy, tới nơi rồi nhưng không có hồi âm. Và tách bài 5 thành 2 màn dạy thay vì 1: màn A "ba ngọn đèn tại chỗ" (netstat, capture, gpresult), màn B "chặn chiều đi khác chặn chiều vào" — kéo nguyên đoạn deepDive hiện tại lên làm thân màn B, đặt TRƯỚC bước thử tay.

**Người phản biện chỉnh lại:** Vấn đề thật chỉ còn một nửa, mức NHẸ: thân màn dạy bài 1 (m11-ipconfig-ping) đóng khung "Ba câu trả lời của ping" như một danh sách khép kín, trong khi bài 5 (đề thử tay, gợi ý tầng 2, gạch đầu dòng tổng kết) lại dựa vào câu thứ tư "Request timed out". Nên sửa đúng một chỗ: thêm "Request timed out" vào thân màn dạy bài 1 (gói rời được máy, tới nơi, nhưng không có hồi âm) hoặc bỏ chữ "Ba" cho danh sách khỏi mang tiếng khép kín.

KHÔNG nên tách bài 5 thành 2 màn dạy và kéo deepDive lên trước bước thử tay: ca này giải được không cần deepDive (capture cho thấy ARP reply từ máy đích + echo-request tới nơi, netstat ESTABLISHED tới :445, đề nói ổ chia sẻ vẫn chạy — đủ loại cả "dây tuột" lẫn "sai gateway"), và dạy trước lời đáp sẽ biến một ca CHẨN ĐOÁN của phòng khám thành ca nhớ lại, làm yếu đúng chỗ mạnh nhất của Module 11.

### `m11-mt-4` — module-11 · NẶNG
**Vấn đề:** Câu trong pool đề thi hỏi "TTL=126, xuất phát 128 thì gói qua mấy router". Luật "mỗi router trừ TTL đi 1" chỉ được viết trong panel "Đào sâu hơn" của bài 1 (mặc định đóng), không màn dạy chính nào nói, không câu thử tay hay nhớ lại nào bắt lại. Lời giải còn dẫn nguồn tới một module không hề dạy TTL.

**Bằng chứng:** Grep module-11.json: chữ "TTL" chỉ có ở 4 chỗ — deepDive của bài 1, và prompt/hintTopic/explain của chính m11-mt-4. Lời giải viết "(kiến thức định tuyến Module 4)", còn deepDive viết "(bạn đã gặp ở Module 4)", nhưng grep toàn bộ content/modules/*.json cho thấy module-04.json chứa 0 lần chữ "TTL"; chỉ module-06, 11, 15, 18 có — và TTL ở module-06/18 là TTL của bản ghi DNS, nghĩa hoàn toàn khác.

**Cách chữa:** Chọn một trong hai: (a) kéo luật TTL từ deepDive lên thân màn dạy m11-ipconfig-ping và thêm một câu thử tay đọc TTL ở bài 1, rồi mới giữ m11-mt-4 trong pool; hoặc (b) bỏ m11-mt-4 khỏi pool đề thi. Dù chọn cách nào cũng phải xoá hai chỗ dẫn nguồn sai "Module 4" trong deepDive bài 1 và trong explain của m11-mt-4.

### `m14-b3-prac-cli` — module-14 · nhẹ
**Vấn đề:** Bài 3 bắt vào console gõ lệnh switchport trunk native vlan, nhưng màn dạy duy nhất của bài không hề nêu tên lệnh đó — cụm này xuất hiện lần đầu ở gợi ý tầng 2, tức là sau khi người học đã sai. Tổng kết bài lại viết "Sửa bằng switchport trunk native vlan", tức tóm tắt một thứ bài chưa từng dạy. Bài 4 ngay sau đó làm đúng cách nên sự lệch càng rõ.

**Bằng chứng:** Màn dạy native-vlan của m14-bai-3 chỉ nói: "Trên mỗi trunk có đúng một xóm được đi trần, không nhãn — đó là native VLAN, mặc định là VLAN 1... đó là lý do nó khó tìm." — không có chữ switchport nào. Grep cả content/modules/module-14.json: chuỗi "switchport trunk native vlan" chỉ xuất hiện từ dòng 746 (lời giải mẫu của chính bài tập) trở đi. Đối chiếu màn dạy allowed-list của m14-bai-4: "Lệnh khai là switchport trunk allowed vlan, và bảng show interfaces trunk luôn in ra danh sách hiện hành."

**Cách chữa:** Thêm một câu vào cuối màn dạy native-vlan của m14-bai-3, theo đúng khuôn bài 4: "Lệnh đổi số native là switchport trunk native vlan, gõ trong chế độ cổng; kiểm lại bằng show interfaces trunk." (Mức nhẹ vì người học vẫn có thể gõ ? để xem danh sách lệnh — mẹo này đã được dạy ở bài 1.)

### `m17-b2-prac-cli` — module-17 · NẶNG
**Vấn đề:** Bài 2 chỉ dạy "loại danh sách nào nhìn được gì" (chuẩn 1-99 so với mở rộng 100-199), nhưng đề thực hành của nó chấm bằng hành vi mạng: máy khách phải THẬT SỰ tắc. Muốn thế, người học buộc phải gắn danh sách lên cổng g0 theo chiều in — mà lệnh gắn và khái niệm chiều in/out lại chính là nội dung bài 3. Người học gặp việc gắn cửa lần đầu tiên ở ngay bài trước bài dạy nó.

**Bằng chứng:** Hai màn dạy của bài 2 (m17-acl-chuan, m17-acl-mo-rong) không có một chữ "access-group" hay "chiều" nào. Kiểm cả module: cụm "ip access-group" KHÔNG xuất hiện trong bất kỳ màn dạy nào của module 17 — chỗ sớm nhất nó lộ ra là lời giải tầng 3 của chính đề này. Mục tiêu chấm của đề là hành vi: {"from":"pc-khach","to":"srv-ke-toan","expect":"blocked"}. Gợi ý tầng 2 mới nói ra "rồi vào interface g0 và áp danh sách vào chiều in". Chỉ mục ghi rõ: m17-chieu-in-out "dạy ở m17-bai-3", và bài 3 tên là "Gắn luật vào đúng cửa, đúng chiều".

**Cách chữa:** Gắn sẵn danh sách 101 lên g0 chiều in ngay trong sơ đồ ban đầu của đề (đúng nếp bài 1 đã dùng), rồi sửa lời đề thành: "Danh sách 101 đã được gắn sẵn lên cổng phía văn phòng nhưng chưa có dòng nào — hãy viết đúng hai dòng luật". Người học chỉ luyện đúng thứ bài 2 dạy (chọn loại + viết dòng), việc gắn cửa để nguyên làm phần thưởng của bài 3. Sửa luôn gợi ý tầng 2 cho khỏi nhắc "chiều in" trước hạn.

**Người phản biện chỉnh lại:** Đề m17-b2-prac-cli chấm bằng hành vi mạng nên muốn qua phải gắn danh sách lên cổng — thao tác mà bài 3 mới dạy quy tắc chọn cửa/chiều, và tổng kết bài 2 cũng hẹn "bài sau mới nói chuyện đặt luật ở đâu". Nhưng đây KHÔNG phải chuyện chưa dạy bao giờ: màn dạy bài 1 (m17-acl) đã nói rõ "viết luật xong chưa lọc ai, phải áp lên một cổng theo một chiều", flashcard của chính khái niệm đó gọi thẳng tên "ip access-group", console gõ `?` in ra dòng "ip access-group <số> in|out", và sơ đồ bài 1 in dòng đó trong show running-config. Đề cũng không ép đúng cách đặt của bài 3 — gắn g0 chiều in hay g1 chiều out đều đạt cả hai mục tiêu. Đây là vết gối đầu về trình tự ở mức nhẹ/vừa, đáng gọt cho gọn chứ không phải lỗi nặng. Nếu muốn gọt thì gắn sẵn aclIn 101 lên g0 trong sơ đồ ban đầu mà ĐỪNG khai accessLists (khai danh sách rỗng sẽ dính lỗi empty-acl của cổng kiểm nội dung), rồi sửa lời đề thành "danh sách 101 đã treo sẵn ở cổng phía văn phòng nhưng chưa có dòng nào — hãy viết đúng hai dòng luật", và bỏ vế "áp vào chiều in" khỏi gợi ý tầng 2.

### `m18-b4-pre-ca` — module-18 · nhẹ
**Vấn đề:** Chữ "zone" là chìa khóa của cả chẩn đoán lẫn cách sửa trong ca bệnh mở màn bài 4, rồi lại nằm trong gạch đầu dòng tổng kết của bài — nhưng nó KHÔNG được định nghĩa ở bất cứ màn dạy nào của cả khóa. Màn dạy split DNS gọi thứ đó là "cuốn sổ TRONG", không bao giờ nói "cuốn sổ trong ấy tên nghề là zone". Người học nhận một từ khóa lạ trong bài học rút ra mà không ai giải nghĩa.

**Bằng chứng:** grep -i "zone" trên toàn bộ content/modules/*.json chỉ ra 5 chỗ, đều trong module-18: chẩn đoán đúng của ca bệnh ("zone nội bộ chưa được dựng"), hành động sửa đúng ("Dựng zone noibo.congty.vn"), lời giải thích ("quên dựng zone nội bộ"), tổng kết bài 4 ("thiếu bản ghi/zone"), và thân màn dạy m18-forwarder ("Máy DNS trong công ty giữ zone nội bộ"). Màn dạy m18-split-dns — nơi lẽ ra phải đặt tên — không có chữ zone nào.

**Cách chữa:** Thêm một mệnh đề đặt tên vào màn dạy m18-split-dns, ngay sau câu mô tả cuốn sổ trong, đại ý: "Trong nghề, mỗi cuốn sổ tên của một miền gọi là một ZONE — sổ trong là zone nội bộ, sổ ngoài là zone công cộng". Một dòng là đủ, không cần thêm khái niệm mới hay thẻ ôn.

## Lớp 4 — Đoán được không cần hiểu (12 phát hiện)

### `m2-mt-4` — module-2 · vừa
**Vấn đề:** Câu thi này lặp lại gần nguyên văn câu thử tay m2-b2-prac-2, phương án đúng giống hệt từng chữ — người học chỉ cần nhận ra chuỗi chữ đã thấy trong bài, không cần hiểu gì. Ngoài ra một mồi nhử dùng chữ "switch", thứ toàn khóa tới đây chưa hề giải thích (chỉ mục ghi switch dạy ở m4-bai-1), nên mồi đó không đo được gì cả.

**Bằng chứng:** m2-b2-prac-2: "Ở nhà bạn, thiết bị nào đang đứng làm default gateway?" — đáp án đúng "Chiếc router (cục phát Wi-Fi) nhà bạn". m2-mt-4: "Trong mạng nhà bạn, thiết bị nào đang đóng vai default gateway?" — đáp án đúng cũng đúng chuỗi "Chiếc router (cục phát Wi-Fi) nhà bạn". Grep cả module-02.json chỉ ra chữ "switch" xuất hiện đúng 2 lần: một ở dòng điểm danh lộ trình "Phần B của khóa (Module 4-7) đi sâu vào hạ tầng: switch, TCP/UDP, DNS, NAT" và một ở chính mồi nhử "Chiếc switch nối các máy trong nhà lại".

**Cách chữa:** Viết lại m2-mt-4 thành câu áp dụng thay vì câu nhận mặt, ví dụ: "Bạn rút dây Internet khỏi cục phát Wi-Fi nhưng vẫn để nó chạy. Máy trong nhà còn gửi file cho nhau được, nhưng không vào được google.com. Thiết bị vừa mất vai trò gì?" — và thay mồi nhử "switch" bằng thứ đã dạy ("Máy chủ DNS", "Server của trang web bạn mở", "Một router liên tỉnh trên Internet").

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng (hạ mức: vua → thấp):

m2-mt-4 là câu trắc nghiệm dùng lại phương án đúng TRÙNG TỪNG CHỮ với m2-b2-prac-2 ("Chiếc router (cục phát Wi-Fi) nhà bạn") trên một đề chỉ đổi cách nói. Vì là trắc nghiệm, người học có thể chọn đúng bằng cách nhận mặt chuỗi chữ đã thấy ở bước Thử tay, không cần đọc mồi nhử. Đây là điểm đáng chỉnh, nhưng ở mức NHẸ, vì:
- Gateway đã được pool đo bằng hai câu áp dụng khác (m2-mt-3 ca phủ định, m2-mt-10 gõ tay) cộng bước Nhớ lại và Tự giải thích của m2-bai-2 — không có chuyện "người học qua ải mà không hiểu gateway".
- Việc lặp đề neo định nghĩa là nếp chung của module (m2-mt-7 lặp nguyên văn m2-b4-prac-1, m2-mt-5 gần nguyên văn m2-b3-prac-1); hai câu đó vô hại vì là gõ tay.

BÁC BỎ phần mồi nhử "switch": đúng là switch chưa dạy tới Module 4 (grep: module-01 có 0 lần, module-02 có 2 lần, module-04 có 92 lần; chỉ mục ghi dạy ở m4-bai-1; lần nhắc duy nhất trước đó nằm trong deepDive giấu sau nút). Nhưng mồi nhử tự mô tả chức năng ngay trong câu — "nối các máy TRONG NHÀ lại" — nên loại được nó chỉ bằng ý đã dạy "trong làng thì khỏi cần cổng, ra Internet mới phải qua". Mồi này đo đúng phép phân biệt cốt lõi của bài, giữ nguyên được.

BÁC BỎ cách chữa họ đề xuất: kịch bản "rút dây Internet, máy trong nhà vẫn gửi file cho nhau" đã là nội dung của m2-mt-3 (và nằm nguyên trong lời giải thích của câu đó); pool rút 8/12 nên hai câu dễ cùng xuất hiện một lượt.

Chữa gọn nếu muốn: giữ nguyên đề và bộ mồi nhử, chỉ đổi CHỮ của phương án đúng cho khác bản ở Thử tay (ví dụ "Cục phát Wi-Fi đang cắm dây mạng của nhà mạng") để chặn lối tắt nhận mặt chuỗi; hoặc đổi m2-mt-4 sang tình huống khác hẳn m2-mt-3, ví dụ "Bạn xem ipconfig thấy dòng Default Gateway ghi 192.168.1.1 — con số đó là địa chỉ của thiết bị nào trong nhà?".

### `m2-mt-3, m2-mt-8` — module-2 · nhẹ
**Vấn đề:** Cả hai đều là câu có/không, và cả hai đều xếp 2 phương án cùng cực với 1 phương án ngược — mà lần nào đáp án đúng cũng chính là phương án lẻ loi đó. Người quen mẹo thi cứ chọn "cái khác đám" là trúng cả hai mà không cần hiểu gì về gateway hay chia gói.

**Bằng chứng:** m2-mt-3: "Có — mọi gói tin trong nhà phải trình diện gateway..." / "Không — gateway chỉ gác lối RA Internet, cùng làng thì nói thẳng" (đúng) / "Có — vì gateway giữ danh sách mọi máy trong nhà...". m2-mt-8: "Được — chiều về do server quyết..." / "Không — nặng mấy cũng chia thành nhiều gói..." (đúng) / "Được — miễn là đường mạng nhà bạn đủ nhanh...".

**Cách chữa:** Đảo cực ở một trong hai câu để mẹo đếm hết linh: ví dụ m2-mt-8 sửa đề thành "Server chia trang báo 2MB ra làm nhiều gói rồi mới gửi. Nhận định này đúng hay sai?" với hai mồi nhử bắt đầu bằng "Sai —" và đáp án đúng bắt đầu bằng "Đúng —". Hoặc bỏ hẳn chữ Có/Không/Được đứng đầu, để ba phương án là ba phát biểu ngang hàng về chuyện gì xảy ra.

### `m5-mt-3` — module-5 · vừa
**Vấn đề:** Câu này trong đề thi chỉ có HAI phương án, nên nhắm mắt chọn cũng đúng 50%. Nó là câu trắc nghiệm 2 phương án DUY NHẤT trong toàn bộ 132 câu trắc nghiệm của 21 pool đề thi — mọi câu khác đều 3 phương án. Cửa mở module cần ≥85% (7/8 câu), nên một câu đoán được là món quà đúng chỗ không nên tặng.

**Bằng chứng:** m5-mt-3 "Một cuộc gọi video nên đi bằng giao thức nào, và vì sao?" chỉ có choices: ["UDP — chậm một nhịp tệ hơn mất một khung hình", "TCP — phải bảo đảm không mất khung hình nào"]. Đếm trên toàn bộ content/modules/*.json: 132 câu mcq trong masteryTest, đúng 1 câu có 2 lựa chọn — chính là m5-mt-3.

**Cách chữa:** Thêm một mồi nhử thứ ba nghe hợp lý, không loại được bằng ngữ pháp hay bằng độ dài, ví dụ: "TCP — vì cuộc gọi cần đúng thứ tự khung hình nên phải đánh số và gửi lại". Mồi này đúng ở vế "cần đúng thứ tự" nhưng sai ở kết luận, nên buộc người học phải cân hậu quả chứ không nhận diện được bằng mắt.

### `m8-b2-pra-1, m8-b3-pra-1` — module-8 · vừa
**Vấn đề:** Hai câu thử tay này cho điểm mà không đo gì: cả hai đều có đáp án đúng dài gấp ba bốn lần hai mồi nhử, và cả hai mồi nhử đều loại được ngay mà không cần biết Wi-Fi là gì. Người học chưa đọc bài vẫn khoanh trúng.

**Bằng chứng:** m8-b2-pra-1: đáp án đúng "Chở nhiều thiết bị cùng lúc giỏi hơn hẳn — nhà càng đông thiết bị càng thấy khác" so với hai mồi "Sóng đi xa gấp đôi" và "Không cần mật khẩu nữa" (không chuẩn Wi-Fi nào bỏ mật khẩu — ai cũng loại được). m8-b3-pra-1: đáp án đúng "Thu được cú bắt tay là đem về dò mật khẩu offline, không ai hay biết" so với "Nó không mã hóa gì cả" — mà chính màn Đoán thử ngay trước đó đã chốt WPA là chuẩn MÃ HÓA, nên mồi này tự phủ định.

**Cách chữa:** Thay mồi nhử bằng những hiểu lầm CÓ THẬT, dài tương đương đáp án đúng. m8-b2-pra-1: đổi thành "Tốc độ tối đa của MỘT thiết bị đứng cạnh router tăng gấp đôi so với Wi-Fi 5" và "Mỗi thiết bị được cấp riêng một kênh nên không còn phải chờ tới lượt nữa". m8-b3-pra-1: đổi thành "Nó chỉ mã hóa lúc nhập mật khẩu, còn nội dung web sau đó thì để trần" và "Chìa của nó cố định cả đời router nên ai từng vào mạng là đọc được mãi mãi".

**Người phản biện chỉnh lại:** Chỉ m8-b2-pra-1 có vấn đề, mức "thap" (đánh bóng một câu), không phải "vua", và không dính m8-b3-pra-1.

Phát biểu lại: m8-b2-pra-1 có một mồi nhử chết ("Không cần mật khẩu nữa" — không cần biết Wi-Fi cũng loại được) cộng đáp án đúng dài 3,6-4,4 lần hai mồi (80 vs 18/22 ký tự — tỷ lệ lệch cao nhất trong 305 câu trắc nghiệm của cả app). Hai thứ cộng lại biến câu ba lựa chọn thành câu hai lựa chọn kèm cue độ dài. Chỉ cần thay MỘT mồi chết đó bằng một hiểu lầm có thật, dài tương đương; mồi "Sóng đi xa gấp đôi" giữ nguyên được vì nó là hiểu lầm phổ biến thật và phải học bài 1 mới bác được.

m8-b3-pra-1 GIỮ NGUYÊN: mồi "Nó chỉ chạy được trên băng 2.4 GHz" không loại được nếu chưa học, chênh lệch độ dài chỉ 2,0 lần, và khái niệm này còn được đo lại ở đề thi m8-mt-11 với ba lựa chọn dài bằng nhau.

Cảnh báo về cách chữa họ đề xuất: cả hai mồi họ soạn cho m8-b2-pra-1 đều nguy hiểm vì gần đúng sự thật. "Tốc độ tối đa của MỘT thiết bị tăng gấp đôi so với Wi-Fi 5" — Wi-Fi 6 THẬT SỰ nâng tốc độ đỉnh một luồng (~1,2 Gbps so với ~866 Mbps), nên đánh dấu nó "sai" là dạy sai. "Mỗi thiết bị được cấp riêng một kênh nên không còn phải chờ tới lượt" cũng sát nghĩa OFDMA thật của Wi-Fi 6, chỉ sai ở chữ "không còn phải chờ". Nếu sửa, nên chọn hiểu lầm dứt khoát sai, ví dụ "Xuyên tường tốt hơn nên phòng ngủ cuối nhà cũng đầy vạch" (bài 1 đã chốt tầm với là chuyện băng tần, không phải thế hệ) — dài tương đương, là hiểu lầm có thật, và bác được bằng đúng kiến thức module này.

### `m9-mt-2, m9-mt-4, m9-mt-6, m9-mt-8, m9-mt-9` — module-9 · vừa
**Vấn đề:** Quá nửa pool đề thi là bản chép gần như nguyên văn của chính câu trong bài, kể cả chuyến đi cung điện. Mỗi lượt rút 8/12 nên phòng thi phần lớn đo việc nhớ MẶT CHỮ câu đã gặp, chứ không đo việc đem hiểu biết sang tình huống mới.

**Bằng chứng:** m9-mt-2 trùng nguyên văn m9-b1-pra-2: "Máy chủ giữ sổ cái của miền và xác thực mọi lượt đăng nhập gọi là gì? (viết tắt được)". m9-mt-8 trùng nguyên văn m9-b5-ret-1: "Lệnh nào kê ra các GPO đang áp lên máy và người đang đăng nhập?". m9-mt-4 chỉ thêm bốn chữ so với m9-b4-pra-1; m9-mt-6 lặp lại m9-b5-ret-2; m9-mt-9 dùng đúng bốn phòng của m9-b4-ret-1.

**Cách chữa:** Giữ khái niệm, đổi vỏ tình huống cho ít nhất ba câu: m9-mt-8 → "Người dùng báo luật chưa ăn; bạn ngồi ngay máy họ, gõ lệnh gì để biết máy đang thật sự dính GPO nào và GPO nào bị gạt?"; m9-mt-2 → "Nhân viên chi nhánh gõ mật khẩu, máy trước mặt không tự quyết mà chạy đi hỏi máy nào?"; m9-mt-4 → cho sẵn ba tầng lộn xộn rồi bắt xếp lại thứ tự áp.

**Người phản biện chỉnh lại:** Bốn câu trong pool đề thi module-9 là bản chép gần như nguyên văn của chính câu trong bài: m9-mt-2 trùng m9-b1-pra-2 tới từng ký tự (cả mảng accept, và cùng câu chữ với thẻ khái niệm m9-dc); m9-mt-8 = m9-b5-ret-1 bỏ tiền tố "Không nhìn lại bài:"; m9-mt-4 = m9-b4-pra-1 thêm bốn chữ; m9-mt-6 giữ nguyên thân đề và đáp án đúng của m9-b5-ret-2. Câu m9-mt-11 cũng lặp tình huống m9-b3-pra-2. Vậy là 4-5 trên 12, tức KHÔNG quá nửa: sáu câu còn lại (mt-1, mt-3, mt-5, mt-7, mt-10, mt-12) mang vỏ tình huống mới thật, trong đó mt-5 còn trừu tượng hơn bản trong bài. Mỗi lượt rút 8/12 nên trung bình chỉ khoảng 2-3 câu bám mặt chữ trên một đề, không đủ để nói phòng thi "phần lớn" đo trí nhớ mặt chữ. Không tính m9-mt-9: cung điện chỉ có đúng bốn phòng LSDOU nên không thể đi phòng khác, và engine cố ý ghim câu palace-walk vào mọi lượt thi vì nó LÀ kỹ năng của module. Mức nên hạ xuống "thap" và đổi nhãn thành việc dọn TOÀN APP chứ không riêng module-9: cùng thước đo, module-7 và module-13 trùng 50%, module-16 47%, module-6 và module-14 42%, còn module-9 chỉ 25% — đúng mức trung vị. Việc đáng làm: đổi vỏ tình huống cho m9-mt-2, m9-mt-4, m9-mt-6 (mt-4 chuyển sang kind 'order' cho xếp lại ba tầng), và cân nhắc thêm một cổng trong content.test chặn đề thi trùng đề bài quá ngưỡng, áp cho cả 21 module. KHÔNG dùng bản thay m9-mt-8 họ đề xuất vì nó đụng nguyên tình huống m9-mt-12 đã có trong pool.

### `m10-b5-pra-1, m10-b4-pra-1, m10-b5-ret-2, m10-b1-pra-1, m10-b3-ret-2` — module-10 · vừa
**Vấn đề:** Toàn bộ 12 câu trắc nghiệm NẰM TRONG BÀI của module đều có đáp án đúng là phương án dài nhất, thường dài gấp đôi ba mồi nhử. Người không thuộc bài chỉ cần bấm câu dài nhất là ăn điểm — nặng nhất ở hai câu bước Nhớ lại, vì bước đó lẽ ra phải đo trí nhớ thật.

**Bằng chứng:** Đếm ký tự từng phương án: m10-b5-pra-1 = 95/33/42, m10-b4-pra-1 = 86/45/33, m10-b5-ret-2 = 88/32/39, m10-b1-pra-1 = 87/25/24, m10-b3-ret-2 = 69/30/26 — 12/12 câu trong bài có đáp án dài nhất. Chính dự án đã có hàng rào chống chuyện này (test "bài thi mastery: đáp án MCQ không lộ mình bằng ĐỘ DÀI", ngưỡng 45%) nhưng nó chỉ quét pool đề thi: pool 12 câu đạt chuẩn tuyệt đối (0/8 câu có đáp án dài nhất), còn câu trong bài lọt lưới hoàn toàn.

**Cách chữa:** Viết lại mồi nhử cho dài ngang đáp án — mỗi mồi nhử kèm một mệnh đề lý do giống đáp án đúng (ví dụ m10-b3-ret-2 sửa "Vì VPN làm mạng chạy nhanh hơn" thành "Vì VPN nén dữ liệu lại rồi mới gửi nên chủ quán không ghép lại được"). Ưu tiên 5 câu nêu trên. Đồng thời nới test cue-độ-dài trong src/content/content.test.ts để quét cả câu pretest/practice/retrieval, không chỉ masteryTest.

### `m12-mt-ps-2, m12-b5-prac-ps, m12-b5-ret-ps` — module-12 · vừa
**Vấn đề:** Ba câu terminal đọc log chỉ đòi "đã lôi ra được dòng chứa cụm X", không giới hạn lưới lọc phải hẹp. Người học gõ một từ khóa vơ vét (ví dụ Select-String 2026) sẽ hốt cả file, trong đó có dòng cần tìm, và được tính ĐẠT — kể cả ở câu cuối cùng của cả khóa học. Câu cho điểm mà không đo được kỹ năng lọc.

**Bằng chứng:** m12-mt-ps-2 goals: { kind: "found-line", mustContain: "pool exhausted" } — không có maxMatches; dhcp.log chỉ 4 dòng, dòng nào cũng chứa "2026". Chính engine đã dựng sẵn lá chắn cho việc này (src/engine/ps/gradePs.ts): "quét thô kiểu Select-String o vớt cả file rồi 'tình cờ' chứa dòng sự cố không được tính, vì kỹ năng được đo là LỌC" — và module-20 đang dùng ("maxMatches": 10), còn module-12 không câu nào dùng.

**Cách chữa:** Thêm "maxMatches": 1 vào goal found-line của m12-mt-ps-2 (chỉ một dòng ERROR trong dhcp.log) và của m12-b5-prac-ps, m12-b5-ret-ps (mỗi file cũng chỉ có đúng một dòng ERROR). Sau đó chạy lại test schema để chắc lời giải mẫu Get-Content <file> | Select-String ERROR vẫn đạt.

**Người phản biện chỉnh lại:** Đúng phần lõi, sai liều và sai phạm vi. Phát biểu lại: câu ĐỀ THI m12-mt-ps-2 (module-12.json dòng ~1798) thiếu maxMatches, trong khi hai câu đề thi cùng dạng của module-20 đều có — người học gõ một mẫu vơ vét (`Select-String 2026` hoặc `Select-String o`) vẫn được tính ĐẠT (đã chạy engine xác nhận). Nên vá RIÊNG câu đề thi này, và đặt "maxMatches": 2 chứ không phải 1: cap 1 đánh trượt cả lối lọc chính đáng theo giờ sự cố (`Select-String 10:15` khớp 2 dòng — đã chạy, TRƯỢT), trong khi cap 2 vẫn chặn sạch mẫu vơ vét (2026 khớp cả 4/4 dòng). Hai câu m12-b5-prac-ps và m12-b5-ret-ps thì ĐỂ NGUYÊN: chúng nằm trong bước Thử tay / Nhớ lại có thang gợi ý, không tính vào cổng 85%, và module-20 cũng cố ý để hai câu trong-bài của nó không cap. Mức nên hạ từ "vua" xuống "thap" — log M12 chỉ 4-6 dòng, sạch nhiễu là chủ đích (spec giao việc lọc-giữa-nhiễu cho M20), và lệnh `Get-Content` trần không kèm lọc vẫn bị chấm trượt nên kỹ năng M12 thật sự dạy vẫn được đo.

### `m13-mt-1, m13-mt-4, m13-mt-5, m13-mt-10` — module-13 · nhẹ
**Vấn đề:** Một phần ba pool đề thi là bản chép lại nguyên con số của câu đã làm trong bài, nên mỗi lượt rút 8 câu người học nhặt được vài điểm bằng trí nhớ bề mặt chứ không phải bằng phép tính. Cửa ải 85% vì thế đo nhẹ hơn nó tưởng.

**Bằng chứng:** m13-mt-4 "Bạn vừa cấp 192.168.10.0/25 cho phòng đầu tiên. Khối kế tiếp bắt đầu ở địa chỉ nào?" trùng số với m13-b3-prac-1 (chỉ đổi "phòng kinh doanh" thành "phòng đầu tiên"); m13-mt-5 "Subnet mask 255.255.255.240 đổi sang wildcard mask là gì?" trùng nguyên văn m13-b4-ret-1; m13-mt-1 trùng m13-b1-pre-1 (/26 → 62 máy); m13-mt-10 dùng lại đúng đáp án 192.168.10.96/26 của m13-b3-prac-2, chỉ đổi hai mồi nhử.

**Cách chữa:** Giữ nguyên dạng câu nhưng đổi con số để bắt tính lại: mt-4 đổi thành "vừa cấp 172.20.5.0/26, khối kế tiếp bắt đầu ở đâu" (→ 172.20.5.64); mt-5 đổi sang 255.255.255.192 (→ 0.0.0.63); mt-10 đổi khối hỏng thành 10.10.10.48/27; mt-1 đổi sang /27 (→ 30 máy).

**Người phản biện chỉnh lại:** Ba câu — KHÔNG phải bốn — là lỗi thật: mt-4, mt-5, mt-10 chép lại nguyên con số của câu người học đã tự tay làm ở bước Thử tay/Nhớ lại (mt-4 và mt-5 gần như trùng từng chữ), nên phần tính toán bị thay bằng nhớ lại chuỗi đáp án. Mỗi lượt rút 8 câu, bốn câu trùng nằm trong nhóm 10 câu bốc ngẫu nhiên nên trung bình ~2 câu là quà; cửa 85% (cần 7/8) vì thế mẻ một góc, chưa thủng — mức "nhe" là đúng. m13 nặng nhất app: 4/12 so với trung bình 11.9% của 21 module.

mt-1 nên loại khỏi danh sách lỗi: nó lặp lại câu Đoán thử (pretest), tức thứ người học được phép đoán sai TRƯỚC khi học, nên hỏi lại ở đề thi là phép đo pretest→posttest hợp lệ; và "/26 → 62 máy" vốn là con số app chủ ý bắt thuộc (có trong màn dạy và trong thẻ ôn). Sửa cũng không hại, nhưng đừng tính nó là lỗi.

Sửa lại thuốc cho mt-5: KHÔNG dùng 255.255.255.192 → 0.0.0.63 như họ đề xuất, vì đúng cặp số đó đã là ví dụ giải sẵn ở màn dạy bài 4 và là đáp án thẻ ôn wildcard-mask (0.0.0.63 xuất hiện 4 lần trong module). Dùng cặp còn trinh nguyên: 255.255.255.248 → 0.0.0.7, hoặc 255.255.255.128 → 0.0.0.127. Hai thuốc kia giữ nguyên: mt-4 → 172.20.5.0/26 (đáp án 172.20.5.64), mt-10 → khối hỏng 10.10.10.48/27.

### `m14-b5-prac-1` — module-14 · vừa
**Vấn đề:** Đề đã chứa sẵn một đáp án được chấm đúng: chép lại hai chữ trong chính câu hỏi là qua, không cần nhớ chữ "sub-interface". Mà đây là câu DUY NHẤT trong cả module hỏi tên khái niệm này — pool 12 câu không có câu nào về sub-interface, câu duy nhất của bài 5 (m14-mt-12) chỉ hỏi "sợi dây nối switch với router khai là gì" và trả lời được bằng chính tên module. Kết quả: app không đo được người học có nhớ khái niệm lõi của bài 5 hay không.

**Bằng chứng:** Đề m14-b5-prac-1: "Trong kiểu router-on-a-stick, mỗi CỬA LOGIC chia ra từ một chân router được gọi là gì?" — accept: ["sub-interface", "subinterface", "sub interface", "cửa logic", "cua logic"]. Bộ chấm còn có luật khớp-chứa nên mọi câu trả lời chứa cụm "cửa logic" đều được tính đúng.

**Cách chữa:** Viết lại đề để cụm được chấp nhận không nằm trong đề, vd: "Bên trong router-on-a-stick, một chân vật lý được chia thành nhiều phần, mỗi phần mang một số VLAN và một IP gateway. Tên tiếng Anh trong nghề của mỗi phần đó là gì?", rồi bỏ "cửa logic"/"cua logic" khỏi accept (đề đã hỏi rõ tên tiếng Anh). Thêm vào pool một câu về sub-interface để bài 5 có mặt thật trong đề thi.

**Người phản biện chỉnh lại:** Đề m14-b5-prac-1 tự lộ đáp án: cụm "cửa logic" nằm sẵn trong câu hỏi lại có trong danh sách accept, cộng luật khớp-chứa của bộ chấm, nên chép hai chữ từ đề ra là qua — câu này không đo được gì. Hệ quả đúng là: CHỮ "sub-interface" không được đo ở bất kỳ đâu trong app (đây là câu duy nhất đòi nó, pool 12 câu của module không có câu nào, câu chạm bài 5 duy nhất trong pool là m14-mt-12 hỏi về trunk). KHÔNG đúng nếu nói "cơ chế bài 5 không được đo": bước Nhớ lại (m14-b5-ret-1), câu thực hành MCQ về cái giá phải trả (m14-b5-prac-2) và flashcard SM-2 của concept router-on-a-stick vẫn đo phần cơ chế. Chữa: viết lại đề hỏi rõ "tên tiếng Anh trong nghề", bỏ "cửa logic"/"cua logic" khỏi accept của m14-b5-prac-1; cân nhắc thêm một câu pool về sub-interface (việc này là mở rộng phạm vi đo, không phải sửa lỗi).

### `m19-mt-12, m19-mt-7` — module-19 · vừa
**Vấn đề:** Hai câu thi này cho điểm mà gần như không đo gì: cả hai mồi nhử của m19-mt-12 đều vô lý tới mức người chưa học cũng gạch được, nên đáp án đúng là phương án duy nhất còn nghe được. m19-mt-7 cũng có một mồi nhử pha trò lạc hẳn khỏi chủ đề kỹ thuật, làm câu ba lựa chọn co lại còn hai.

**Bằng chứng:** m19-mt-12 hỏi "Vì sao KHÔNG gán quyền thẳng cho từng người", hai mồi nhử là: "Vì AD giới hạn mỗi tài khoản người dùng chỉ được nhận tối đa một quyền" và "Vì quyền gán thẳng cho người chạy chậm hơn hẳn quyền đi qua các nhóm". m19-mt-7 hỏi nhóm Domain Local dùng để làm gì, mồi nhử: "Gom người của một chi nhánh để chào cờ điểm danh mỗi sáng thứ hai".

**Cách chữa:** Thay mồi nhử của m19-mt-12 bằng những cái nghe LỌT TAI nhưng sai lệch tinh vi: "Vì quyền gán thẳng cho người bị AD tự xóa sau mỗi lần đổi mật khẩu" → vẫn chưa hay; tốt hơn là "Vì quyền gán thẳng chỉ có hiệu lực trên máy người đó đang ngồi" và "Vì gán thẳng thì quyền không kế thừa xuống thư mục con" — hai điều nghe rất giống chuyện thật nên buộc phải hiểu mới loại được. Với m19-mt-7, thay câu chào cờ bằng "Gom các nhóm vai của nhiều phòng ban để mang sang miền khác khi sáp nhập" (đây đúng là việc của nhóm Global — bắt người học phân biệt hai loại nhóm thật sự).

**Người phản biện chỉnh lại:** Chỉ m19-mt-12 hỏng đúng như mô tả: cả hai mồi nhử đều loại được mà không cần hiểu AGDLP — một cái bịa giới hạn AD trái với kinh nghiệm thường ngày, một cái nói chậm hơn — và tệ hơn, cả hai đều mâu thuẫn với chính vế "dù cách đó chạy được ngay" trong đề, nên đáp án đúng là phương án duy nhất còn đứng được. Câu này gần như tặng điểm, mức "vua" hợp lý.

m19-mt-7 thì nhẹ hơn hẳn, nên hạ xuống mức thấp: mồi nhử "chào cờ điểm danh" đúng là quà tặng và đúng là ngoại lệ lạc lõng của cả ngân hàng đề (mồi pha trò duy nhất trong 132 câu mcq của 21 module), đáng thay. Nhưng mồi nhử thứ ba — "chứa các tài khoản quản trị miền" — là mồi thật sự cắn câu, vì nhóm Administrators dựng sẵn ngoài đời đúng là scope Domain Local và cái tên mời gọi nhầm với Domain Admins. Người chưa nắm "DL là nhóm quyền đứng cạnh tài nguyên" vẫn có thể chọn sai. Vậy m19-mt-7 vẫn đo được kiến thức, chỉ là hẹp còn hai lựa chọn — không phải "cho điểm mà không đo gì".

### `m20-b3-prac-ps, m20-b2-prac-ps` — module-20 · vừa
**Vấn đề:** Hai bài terminal trong bài học không đòi lưới lọc phải hẹp, nên gõ một cụm vớt cả file cũng được tính là ĐẠT — đúng cái thói quen mà bài đang dạy phải bỏ. Câu thi cùng nội dung thì lại có khóa đó, nên bài học dễ hơn phòng thi ở đúng kỹ năng cốt lõi của module.

**Bằng chứng:** module-20.json — goal của m20-b3-prac-ps: {"kind":"found-line","mustContain":"link down on port 12"} (KHÔNG có maxMatches); goal của m20-mt-ps2, cùng tên file cùng đích: {"kind":"found-line","mustContain":"link down on port 12","maxMatches":10}. Bộ chấm (src/engine/ps/gradePs.ts:84) khi thiếu maxMatches chỉ hỏi "có dòng nào chứa cụm này không", và Select-String khớp CHUỖI CON (src/engine/ps/interpret.ts:606) — nên `Get-Content sw-core.log | Select-String 2026` vớt trọn 162 dòng vẫn được tính đạt. Chú thích của chính engine (src/engine/ps/world.ts:82-85) nói maxMatches sinh ra để chặn đúng chuyện này: "quét thô chứ không phải lọc".

**Cách chữa:** Thêm "maxMatches": 10 vào goal của m20-b3-prac-ps và của m20-b2-prac-ps. Ngưỡng 10 không phá đường đúng nào mà lời giải đã hứa: ở sw-core.log lọc ERROR ra 1 dòng, lọc "port 12" ra 4 dòng; ở tap-trung.log lọc ERROR ra 1 dòng, lọc "sw-tang-3" ra 9 dòng — đều lọt ngưỡng.

### `m21-mt-9, m21-mt-12` — module-21 · vừa
**Vấn đề:** Hai câu trắc nghiệm cho điểm mà không đo gì, vì cả hai mồi nhử đều vô lý tới mức loại trừ được ngay khi chưa học. Ở m21-mt-9, một mồi nhử nói về chuyện bài thi "trông dài hơn cho có vẻ khó" (bàn về cách ra đề, không phải về mạng), mồi còn lại gán cho router một đòi hỏi về "số mục tiêu chẵn" — router không hề biết bài tập có mấy mục tiêu. Đáp án đúng đồng thời là phương án dài nhất và là phương án duy nhất nói chuyện kỹ thuật.

**Bằng chứng:** m21-mt-9 choices: ["Vì thiếu vế nào cũng có cách giải sai: rút dây đạt vế chặn, mở toang đạt thông" ✓, "Vì hai mục tiêu giúp bài thi trông dài hơn và có vẻ khó hơn với người học", "Vì router yêu cầu số mục tiêu chẵn thì phần cứng mới xử lý được luật"]. m21-mt-12 choices: ["Ghi nhận nó vào baseline tuần đầu…" ✓, "Báo động ngay vì router mới dựng thì CPU phải luôn nằm dưới mức 10%", "Bỏ qua vĩnh viễn vì chỉ số CPU không liên quan gì tới thiết bị mạng"] — mồi thứ ba lại là một câu không ai tin nổi.

**Cách chữa:** Thay mồi nhử bằng những cách hiểu sai CÓ THẬT của người mới. m21-mt-9: "Chỉ cần đo vế chặn là đủ — chặn được rồi thì phần còn lại chắc chắn không đụng tới" và "Chỉ cần đo vế thông là đủ — mạng còn chạy nghĩa là luật viết đúng". m21-mt-12: "So 55% với con số của chi nhánh cũ rồi kết luận" và "Chờ tới khi người dùng kêu chậm mới xem lại đồ thị".

**Người phản biện chỉnh lại:** Chỉ m21-mt-9 hỏng thật: cả hai mồi nhử đều loại trừ được khi chưa học bài (một mồi bàn chuyện ra đề, một mồi gán cho router đòi hỏi tùy tiện về số mục tiêu chẵn), nên câu cho điểm mà không đo gì — sửa theo hướng người soát đề xuất là hợp lý. m21-mt-12 KHÔNG hỏng như mô tả: chỉ mồi thứ ba ("CPU không liên quan gì tới thiết bị mạng") là vô lý; mồi thứ hai ("báo động ngay vì CPU phải luôn dưới 10%") đúng là lỗi hiểu có thật — phán con số khi chưa có baseline — và trùng thủ pháp chuẩn-ngành-giả mà M20 cố tình dùng ở m20-mt-12, nên câu vẫn phân loại được người học. Với m21-mt-12 chỉ cần thay MỘT mồi thứ ba, và không nên lấy "chờ người dùng kêu chậm" vì đã dùng ở m20-mt-13; nên dùng "So 55% với con số của chi nhánh cũ rồi kết luận" (so nhầm với baseline của máy khác) và một mồi mới như "Chốt luôn 55% làm ngưỡng cảnh báo cho mọi router trong hệ". Mức của phát hiện nên hạ: khái niệm của mt-9 vẫn được đo đầy đủ ở bước Tự giải thích (gõ tay, module-21.json dòng 1863-1906), nên đây là câu phí chỗ chứ không phải lỗ thủng của mastery gate.

## Lớp 3 — Dạy rồi không bao giờ hỏi lại (12 phát hiện)

### `m2-b4-ret-1, m2-mt-12` — module-2 · vừa
**Vấn đề:** Bài m2-bai-4 dạy hẳn cặp request/response, nhưng bước Nhớ lại của bài chỉ có đúng một câu xếp thứ tự 8 chặng, và trong 8 dòng đó không dòng nào dùng chữ "request" hay "response". Kết quả: chữ "request" chưa từng bị lấy ra khỏi trí nhớ ở bất cứ bài nào — lần đầu người học phải tự nhớ nó là ngay trong phòng thi.

**Bằng chứng:** Bước practice m2-b4-prac-1 chỉ hỏi nửa "response" ("Lá thư trả lời... gọi là gì?"). Bước retrieval của m2-bai-4 chỉ có m2-b4-ret-1 dạng xếp thứ tự, các item là "Server nhận yêu cầu, đóng trang web vào gói tin gửi ngược lại"… — không item nào chứa chữ request/response. Nhóm ý của selfExplain cuối bài: [ráp lại, trả về, gửi ngược, phản hồi] — không nhóm nào đòi chữ "request"/"yêu cầu". Chỗ duy nhất bắt nhớ chữ này là đề thi m2-mt-12.

**Cách chữa:** Thêm vào bước Nhớ lại của m2-bai-4 một câu gõ tay ngắn trước câu xếp thứ tự: "Không nhìn lại bài: lá thư máy bạn gửi đi để ĐÒI trang — vế đầu của cặp thư — gọi là gì?" với accept ["request","yêu cầu","http request","lá thư yêu cầu"]. Hoặc nhẹ hơn: thêm nhóm ý bắt buộc [request, yêu cầu, thư hỏi] vào selfExplain của bài.

### `m6-b2-pre-1` — module-6 · nhẹ
**Vấn đề:** Bản ghi A được dạy hẳn — nó là khái niệm mở màn của bài 2 và là bản ghi cơ bản nhất — nhưng chưa bao giờ bị bắt lấy ra từ trí nhớ. Nó chỉ là đáp án đúng của câu Đoán thử, tức bước vốn để đoán chứ không tính là nhớ lại; sau đó A chỉ còn xuất hiện với vai mồi nhử. Người học có thể đậu module DNS mà chưa lần nào tự gọi tên bản ghi trỏ tên miền tới IPv4.

**Bằng chứng:** Đáp án đúng "Bản ghi A" chỉ có ở m6-b2-pre-1. Ở m6-b2-pra-2 (đáp án CNAME) và m6-mt-3 (đáp án MX), "A" nằm trong danh sách mồi nhử. Đáp án đúng của m6-b2-ret-1 và m6-mt-4 là AAAA, của m6-mt-9 là CNAME — không câu nào trong 9 câu thử tay, 6 câu nhớ lại và pool 12 câu đề thi có đáp án đúng là A.

**Cách chữa:** Thêm vào pool đề thi một câu hỏi bằng tình huống thay vì hỏi tên: "Công ty vừa dọn trang web sang máy chủ mới, muốn congty.vn mở ra trang trên máy đó — phải sửa bản ghi loại nào?" (đáp án A; mồi nhử CNAME, MX), hoặc đổi m6-b2-ret-1 thành câu hỏi cả cặp: "A và AAAA khác nhau ở chỗ nào?"

**Người phản biện chỉnh lại:** Bản ghi A KHÔNG phải "chưa bao giờ bị bắt lấy ra từ trí nhớ": khái niệm m6-ban-ghi-a sinh thẻ ôn SM-2 với mặt trước "Bản ghi A và AAAA khác nhau ở chỗ nào?", và bước Tự giải thích của bài 2 ("vì sao có bản ghi A rồi mà vẫn cần CNAME?") cũng bắt dùng lại vai của A. Phần đúng còn lại, hẹp hơn: trong 12 câu của pool đề thi module 6, không câu nào có A ở vai đáp án đúng (A chỉ làm mồi nhử ở m6-mt-3), nên người học có thể qua cổng 85% mà chưa lần nào tự gõ/tự chọn ra chữ "A" từ trí nhớ — chỗ duy nhất A là đáp án đúng là câu Đoán thử m6-b2-pre-1, vốn không tính là nhớ lại. Cách chữa nên giữ ĐÚNG một ý: thêm vào pool đề thi một câu tình huống có đáp án A (ví dụ "công ty dọn web sang máy chủ mới, muốn congty.vn mở ra trang trên máy đó — sửa bản ghi loại nào?", mồi nhử CNAME và MX). Bỏ hẳn đề xuất đổi m6-b2-ret-1 thành câu "A và AAAA khác nhau ở chỗ nào?" — câu đó đã là mặt trước thẻ ôn SM-2 của khái niệm này rồi, đổi vào sẽ trùng lặp và còn làm mất câu hỏi AAAA đang có.

### `m7-bai-3 · khái niệm m7-firewall-stateful (không có câu nào)` — module-7 · nhẹ
**Vấn đề:** Chuyện "dòng trong bảng có hạn, im lặng lâu là bị xoá nên ứng dụng phải gửi gói giữ nhịp" được dạy hẳn và còn được chốt trong tổng kết như một trong ba điều rút ra của bài, nhưng không một câu nào trong module bắt lấy nó ra từ trí nhớ.

**Bằng chứng:** Cụm "giữ nhịp" xuất hiện đúng 2 lần trong module-07.json: phần Đào sâu của m7-firewall-stateful ("cuộc trò chuyện im lặng quá lâu thì bị xóa khỏi bảng") và bullet tổng kết bài 3 ("Dòng có hạn — im lặng lâu là bị xóa, nên mới có gói giữ nhịp"). Rà cả 26 câu của 5 bài lẫn 12 câu pool đề thi: không câu nào chạm tới.

**Cách chữa:** Thêm một câu trắc nghiệm tình huống vào pool đề thi (hoặc bước Thử tay bài 3): "Bạn mở phiên điều khiển máy từ xa rồi bỏ đi ăn trưa, quay lại thấy kết nối đã đứt dù mạng vẫn tốt. Vì sao?" → đúng: "Dòng trong bảng kết nối của tường lửa có hạn, im lặng lâu thì bị xoá"; mồi nhử: "Vì router đổi địa chỉ công cộng giữa chừng" / "Vì port 3389 chỉ mở được vài phút mỗi lượt".

### `m8-mt-2` — module-8 · NẶNG
**Vấn đề:** Cả bài 2 — bài dạy về thế hệ Wi-Fi — gần như biến mất khỏi phòng thi. Trong 12 câu của pool, khái niệm "Thế hệ Wi-Fi" (m8-chuan-wifi: Wi-Fi 4/5/6/7, tương thích ngược, 802.11n/ac/ax/be) KHÔNG có lấy một câu nào; khái niệm "Wi-Fi 6E và Wi-Fi 7" chỉ có đúng một câu m8-mt-2, mà câu đó đòi gõ ra đúng một chữ số "6" và là bản sao nguyên văn của câu thử tay m8-b2-pra-2. Vì mỗi lượt chỉ rút 8/12 câu, có khoảng 1/3 số lượt thi người học đậu mà chưa bị hỏi một chữ nào về thế hệ Wi-Fi. Chuyện Wi-Fi 7 đi hai băng cùng lúc, Wi-Fi 6 chở đông giỏi hơn cũng không ở đâu đo tới.

**Bằng chứng:** Pool 12 câu chia theo bài: bài 1 có mt-1 + mt-10; bài 3 có mt-3 + mt-11; bài 4 có mt-4 + mt-6 + mt-12; bài 5 có mt-8 + mt-9; ôn module cũ có mt-5 + mt-7; bài 2 chỉ còn mt-2. Và m8-mt-2 giống từng chữ với m8-b2-pra-2: cùng đề "Wi-Fi 6E khác Wi-Fi 6 ở quyền chạy thêm trên băng tần nào? (con số)", cùng accept ["6","6ghz","băng 6","bang 6"]. Trong khi thư cuối module lại hứa: "tên thế hệ nào thật sự đem lại gì".

**Cách chữa:** Thêm 2 câu vào pool cho bài 2 và nâng cấp m8-mt-2. Gợi ý cụ thể: (a) câu tình huống về tương thích ngược — "Router Wi-Fi 7 mới mua, laptop trong nhà là Wi-Fi 5. Laptop đó chạy được ở đời nào?"; (b) câu về điểm mạnh thật của Wi-Fi 6 — "Nhà có 15 thiết bị cùng dùng mạng. Đổi từ router Wi-Fi 5 sang Wi-Fi 6 thì cái gì đỡ nhất?"; (c) sửa m8-mt-2 thành câu phân biệt "Wi-Fi 6E khác Wi-Fi 6 chỗ nào?" thay vì chỉ đòi gõ số 6.

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng (giữ lõi, bỏ phần nói quá, hạ mức nặng → vừa):

Lỗi thật nằm ở PHÒNG THI, không phải ở cả module. Trong pool 12 câu của module 8, khái niệm "Thế hệ Wi-Fi" (m8-chuan-wifi) không có câu nào, còn "Wi-Fi 6E và Wi-Fi 7" (m8-wifi-6e-7) chỉ có đúng m8-mt-2 — và câu đó là bản sao NGUYÊN VĂN của câu thử tay m8-b2-pra-2 (trùng cả đề lẫn accept ["6","6ghz","băng 6","bang 6"]). Vì mỗi lượt rút 8/12 đều tay và module 8 không có câu trụ nào, đúng 1/3 số lượt thi không hỏi một chữ nào về bài 2.

Hai điểm phải sửa trong bản gốc của người soát:
- BỎ vế "Wi-Fi 6 chở đông giỏi hơn cũng không ở đâu đo tới": nó chính là đáp án đúng của câu thử tay m8-b2-pra-1. Chỉ đúng với riêng "Wi-Fi 7 đi hai băng cùng lúc (MLO)" — thứ này không câu nào trong 34 câu của module hỏi tới.
- SỬA nhãn bản đồ pool: m8-mt-5 (NAT) và m8-mt-7 (DHCP) không phải "ôn module cũ" lạc chỗ; chúng là vế IPv4 đối chiếu cho bài 5 (cặp mt-5/mt-6, cặp mt-7/mt-8), explain của mt-5 nói thẳng điều đó.
- Khái niệm KHÔNG bị bỏ rơi trong dạy: pretest m8-b2-pre-1, Nhớ lại m8-b2-ret-1, Tự giải thích bài 2 và hai flashcard SM-2 đều đo nó. Vì vậy đây là lỗ hổng ĐO LƯỜNG Ở CỔNG MASTERY, mức VỪA — không phải mức nặng kiểu "khái niệm không được dạy/không được hỏi".

Cách chữa họ đề xuất thì giữ nguyên, hợp lý: thêm 2 câu cho bài 2 (tình huống tương thích ngược: router Wi-Fi 7 + laptop Wi-Fi 5 chốt ở đời nào; và điểm mạnh thật của Wi-Fi 6 khi nhà đông thiết bị — nên diễn đạt khác m8-b2-pra-1 để không lại trùng nguyên văn), đồng thời viết lại m8-mt-2 thành câu phân biệt "6E khác Wi-Fi 6 chỗ nào" thay vì đòi gõ một chữ số. Pool lên 14 câu là hợp lệ (M15-M21 đã có pool 13-16).

### `m9-b5-pra-1` — module-9 · vừa
**Vấn đề:** Khái niệm khó nhất module — kế thừa, Block Inheritance, Enforced — được dạy hẳn một màn nhưng KHÔNG có câu Thử tay nào. Câu thử tay duy nhất đang mang nhãn khái niệm đó lại hỏi chuyện phạm vi treo của bài 3, nên sổ lỗi cũng đổ oan cho khái niệm kế thừa mỗi khi người học sai.

**Bằng chứng:** m9-b5-pra-1 khai "conceptId": "m9-ke-thua" nhưng đề là: "mọi máy phòng Kế toán cấm cắm USB, các phòng khác không bị ảnh hưởng" → đáp án "Tạo GPO cấm USB rồi treo vào OU KeToan" — không một chữ nào về tấm chắn hay Enforced. Cả bước Thử tay của bài 5 (hai câu: câu này + gpupdate) không luyện kế thừa lần nào.

**Cách chữa:** Thêm một câu thử tay đúng khái niệm, ví dụ: "OU KeToan bật Block Inheritance; GPO luật mật khẩu treo ở Domain KHÔNG gắn Enforced — máy phòng Kế toán có nhận luật mật khẩu không?" (đáp: không), gợi ý tầng 1 "tấm chắn dựng ở đâu". Đồng thời đổi conceptId của m9-b5-pra-1 sang m9-gpo cho đúng thứ nó thật sự đo.

**Người phản biện chỉnh lại:** Bước Thử tay bài 5 (m9-bai-5) không có câu nào luyện Block Inheritance/Enforced; câu duy nhất mang thẻ `m9-ke-thua` là `m9-b5-pra-1` lại đo phạm vi treo GPO (chất liệu bài 3). Hậu quả THẬT chỉ nằm ở phiên "luyện thứ hay quên": bộ lọc trúng đích trong `luyenThuHayQuen` sẽ lôi đúng câu USB không liên quan ra cho người quên thẻ kế thừa, và loại luôn câu còn lại. Sổ lỗi/bảng vấp KHÔNG bị ảnh hưởng — `conceptStumbles` đổ vấp theo bài cho mọi khái niệm của bài, cố ý bỏ qua thẻ này. Cách chữa: (1) XÓA trường conceptId của m9-b5-pra-1 — schema khai rõ trường này tùy chọn và câu bắc cầu nhiều khái niệm thì để trống mới đúng; TUYỆT ĐỐI không đổi sang `m9-gpo` vì `validateModules` sẽ ném lỗi (bài 5 không dạy m9-gpo) làm đỏ test. (2) Nếu muốn thêm một câu Thử tay đúng kế thừa thì thêm mới và gắn thẻ `m9-ke-thua`, coi là cải thiện mức thấp chứ không phải vá lỗ hổng — khái niệm này đã có mặt ở pretest, Nhớ lại, Tự giải thích, thẻ ôn và pool đề thi.

### `m12-mt-7` — module-12 · vừa
**Vấn đề:** Get-NetIPAddress được dạy hẳn trong màn khái niệm của bài 1, nhưng suốt cả module không câu nào bắt người học nhớ lại hay gõ nó — kể cả thẻ ôn của chính khái niệm đó cũng chỉ hỏi Test-NetConnection. Lần duy nhất người học phải moi cái tên này ra từ trí nhớ lại rơi vào phòng thi.

**Bằng chứng:** Màn dạy m12-cmdlet-mang: "Get-NetIPAddress là ipconfig biết nói: in ra IPAddress, InterfaceAlias, PrefixLength" · Thẻ ôn cùng khái niệm chỉ hỏi: "Test-NetConnection gõ trần khác gì khi thêm -Port?" · Rà cả module-12.json: chữ NetIPAddress chỉ xuất hiện ở màn dạy, tổng kết, gợi ý/lời giải của m12-b1-prac-1 (làm ví dụ cho khuôn động từ-danh từ), thẻ khái niệm, và đề thi m12-mt-7 — không mục tiêu (goal) nào và không câu hỏi nào trong 5 bài đòi tới nó.

**Cách chữa:** Chọn một trong hai: (a) thêm vào mục tiêu của m12-b1-prac-ps một goal buộc chạy Get-NetIPAddress (ví dụ đề đổi thành "đọc địa chỉ IP của chính máy mình rồi mới kiểm tra port 443"); hoặc (b) tối thiểu là bổ sung vế Get-NetIPAddress vào mặt sau thẻ ôn m12-cmdlet-mang và vào câu Nhớ lại m12-b1-ret-1 ("lệnh nào đọc IP của chính máy mình, lệnh nào thăm dò máy khác?").

**Người phản biện chỉnh lại:** Khái niệm m12-cmdlet-mang gộp hai cmdlet nhưng vòng rèn chỉ chạm một vế: practice, Nhớ lại, Tự giải thích và thẻ ôn của chính khái niệm đó đều xoay quanh Test-NetConnection, còn Get-NetIPAddress chỉ được ĐỌC (màn dạy, tổng kết, mặt sau thẻ m12-cmdlet) chứ không lần nào bị chấm. Đây là lệch phủ sóng nhẹ, mức "thap", KHÔNG phải lỗi "đề thi hỏi thứ chưa dạy" — m12-mt-7 hợp lệ: tên lệnh có nguyên văn ở màn dạy và ở tổng kết bài 1, lại nằm đúng kỹ năng suy-tên-lệnh mà module drill ba lần (m12-b1-prac-1, m12-b3-pre-1, m12-b5-pre-1).

Chữa: chỉ nên đi cách (b), và đi ở tầng data. Bỏ cách (a) — engine lab PS chỉ có 5 loại goal (ad-user, ad-user-count, group-member, tested-connection, found-line), không loại nào chấm được "đã chạy Get-NetIPAddress", thêm goal mới là sửa engine + schema + test, quá giá so với lợi ích.

Lưu ý khi làm (b): đừng đổi m12-b1-ret-1 thành câu hai vế như họ đề xuất ("lệnh nào đọc IP máy mình, lệnh nào thăm dò máy khác?") — chấm gõ tay so khớp một chuỗi trong danh sách accept phẳng, câu hai vế sẽ phải liệt kê đủ mọi thứ tự viết và rất dễ oan cho người học. An toàn hơn: (i) bổ sung vế Get-NetIPAddress vào mặt sau thẻ ôn m12-cmdlet-mang cho khớp với term của chính nó, và (ii) nếu muốn có chấm thật thì thêm MỘT câu Nhớ lại riêng, một đáp án, dạng "Không nhìn lại bài: lệnh nào in ra IP đang đặt trên card mạng của chính máy bạn?" với accept giống m12-mt-7.

### `pool đề thi m17-mt-1 … m17-mt-ca (cả 14 câu)` — module-17 · vừa
**Vấn đề:** Nhồi bảng MAC — cú tấn công làm nên nửa "bảo mật lớp 2" trong chính tên module — không có câu nào trong pool 14 câu đề thi. Mỗi lượt thi rút 8 câu, nên hoàn toàn có thể đậu cửa 85% mà chưa một lần phải nhớ lại vì sao bảng MAC đầy lại biến switch thành cái loa của cả xóm.

**Bằng chứng:** Quét cả pool: 11 trong 12 khái niệm của module có ít nhất một câu hỏi trực tiếp; riêng m17-mac-flooding không có câu nào. Câu gần nhất là m17-mt-8, nhưng đề của nó hỏi "Port security trên một cổng access thật ra đang đếm và giới hạn cái gì?" — cụm "nhồi bảng MAC" chỉ nằm ở phần Vì sao, tức là hiện ra SAU khi người học đã trả lời xong.

**Cách chữa:** Thêm một câu trắc nghiệm vào pool (đưa pool lên 15 câu), ví dụ: "Kẻ tấn công cắm vào một cổng switch rồi bơm hàng vạn địa chỉ MAC bịa ra. Hắn được lợi gì?" — đáp án đúng: "Bảng MAC đầy nên switch không tra ra đích, phải phát tràn mọi khung ra mọi cổng, kể cả cổng hắn ngồi"; mồi nhử: "Switch tự khởi động lại và quên hết cấu hình VLAN" và "Các máy khác mất địa chỉ IP vì bảng MAC đã trống".

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng: "Trong pool 14 câu của module 17, không câu nào lấy CƠ CHẾ nhồi bảng MAC làm đề — cửa mastery đo cái chốt chặn (port security, m17-mt-8/mt-9) mà không đo cái lỗ hổng nó chặn. Đây là lỗ hổng ở tầng đề thi, KHÔNG phải lỗ hổng ở tầng nhớ lại: bước Nhớ lại của bài m17-bai-4 đã bắt người học tự giải thích đúng cơ chế đó (selfExplain, chấm 4 nhóm từ khoá), pretest cũng hỏi hành vi phát tràn, và concept có flashcard nên nó vào hộp SM-2. Mức nên hạ từ 'vua' xuống 'thap' — đây là chỗ ĐÁNG THÊM chứ không phải chỗ hỏng."

Về cách chữa: nếu muốn cửa mastery thật sự chạm tới nó, thêm câu MCQ như họ đề xuất là hợp lý nhưng chưa đủ (mỗi lượt chỉ bốc 5/12 câu không-trụ → ~42% gặp). Hai lựa chọn thẳng hơn: (a) sửa chính đề m17-mt-8 để nó hỏi cơ chế trước rồi mới hỏi chốt chặn — ví dụ "Port security giới hạn số MAC trên một cổng. Nếu KHÔNG có nó, kẻ bơm hàng vạn MAC giả được lợi gì?"; hoặc (b) chấp nhận rằng 12 concept không nhét vừa 11 slot không-trụ và để nguyên, vì bước Nhớ lại + flashcard đã gánh phần retrieval.

### `m18-mt-7` — module-18 · vừa
**Vấn đề:** Khái niệm m18-failover (hai cách dựng DHCP dự phòng ĐÚNG: chia kho 80/20, hoặc bắt cặp chung sổ) được dạy hẳn một màn, có thẻ ôn, là tên của cả bài 3 — nhưng pool 14 câu không có câu nào hỏi nó. Pool chỉ hỏi cái BẪY (bê nguyên cấu hình). Mỗi lượt thi rút 8/14, nên người học có thể qua cổng 85% mà chưa lần nào phải nhớ lại cách dựng ĐÚNG.

**Bằng chứng:** Rà 14 câu pool: mt-1 relay, mt-2 giaddr, mt-3 APIPA, mt-4 APIPA, mt-5 scope, mt-6 lease, mt-7 bẫy hai-server-một-dải, mt-8 split DNS, mt-9 split DNS, mt-10 forwarder, mt-11 conditional forwarder, mt-12 TTL, mt-ps port 53, mt-ca APIPA. Không câu nào chứa "80/20", "chia kho" hay "chung một cuốn sổ" ở vế đáp án đúng. Trong khi đó APIPA có tới 3 câu (mt-3, mt-4, mt-ca).

**Cách chữa:** Thêm một câu pool cho m18-failover, gợi ý dạng trắc nghiệm tình huống: "Máy DHCP duy nhất sắp phải bảo trì hằng tháng. Cách dựng máy thứ hai nào đứng vững?" — đúng: "Chia kho tách bạch (vd 80/20) hoặc bắt cặp failover dùng chung một cuốn sổ có đồng bộ"; mồi nhử: "Cho máy hai phát cùng dải nhưng đặt độ trễ trả lời chậm hơn" / "Cho máy hai chỉ chạy vào những ngày máy một nghỉ". Có thể cân lại bằng cách rút bớt một trong ba câu APIPA.

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng, và hạ mức xuống "thap" (gợi ý cân đối, không phải lỗi):

"Pool 14 câu của module-18 nghiêng về APIPA (3 câu: mt-3, mt-4, mt-ca) trong khi khái niệm m18-failover không có câu nào đòi người học NÊU RA hai cách dựng dự phòng đúng — mt-7 hỏi hậu quả của cái bẫy bê-nguyên-cấu-hình, mt-6 hỏi ảnh hưởng khi server tắt (lease còn hạn). Cụm 'chia kho / chung sổ' chỉ xuất hiện trong phần giải thích của mt-7, ở thể phủ định."

Ba điều phải bỏ khỏi phát hiện gốc vì sai:
- Bỏ "người học có thể qua cổng 85% mà chưa lần nào phải nhớ lại cách dựng ĐÚNG". Bài 3 bắt làm cả ba: câu Thử tay m18-b3-prac-1 hỏi thẳng "Cách nào dựng máy DHCP thứ hai ĐÚNG?"; phần Tự giải thích của bước Nhớ lại hỏi vì sao máy dự phòng chỉ cần 20% kho; thẻ ôn SM-2 của m18-failover hỏi thẳng "Hai kiểu dựng DHCP dự phòng đúng là gì".
- Bỏ cách gắn phát hiện vào m18-mt-7 như thể câu đó hỏng. m18-mt-7 đúng cả đề, đáp án lẫn mồi nhử; đây là nhận xét cấp POOL, phải ghi ở mức module.
- Bỏ hàm ý "mỗi khái niệm phải có một câu pool". Cổng chất lượng (src/content/content.test.ts) chỉ đòi pool >= 12 và rộng hơn cỡ đề 8; masteryTest không mang conceptId; 7 module khác cũng có khái niệm vắng mặt trong pool.

Nếu vẫn muốn thêm câu như họ đề xuất thì được, nhưng KHÔNG rút bớt câu APIPA để đổi: APIPA là manh mối chẩn đoán được dùng lại ở hai bài và một ca bệnh, ba câu là có chủ đích. Thêm thì nâng pool lên 15 câu (module 16/19/20 đã 15 câu, không phá luật nào).

### `m19-mt-1, m19-b1-prac-2 (khái niệm m19-site)` — module-19 · vừa
**Vấn đề:** Màn dạy đầu module dựng hẳn một điểm chốt: tầng Site trong chuỗi LSDOU của Module 9 tới đây mới có nghĩa thật — chính sách gắn vào site là áp theo CHỖ NGỒI. Điểm này được nhắc lại ở tổng kết và in luôn vào mặt sau thẻ ôn. Vậy mà trong toàn bộ 25 câu của 5 bài và 15 câu pool đề thi, không có MỘT câu nào bắt người học lấy nó ra từ trí nhớ hay áp dụng. Nó chỉ xuất hiện đúng một lần trong đề, mà là ở vai mồi nhử SAI.

**Bằng chứng:** Màn dạy m19-site: "tầng Site trong chuỗi LSDOU bạn học ở Module 9 tới hôm nay mới có nghĩa thật: một chính sách gắn vào site là gắn theo VỊ TRÍ NGỒI, áp cho mọi máy đang đứng ở đó, bất kể thuộc phòng ban nào." Tìm cả file module-19.json cho các cụm LSDOU / GPO / "chính sách": chỉ ra ở thân màn dạy, dòng tổng kết, phần định nghĩa và mặt sau thẻ ôn — cộng thêm mồi nhử sai của m19-mt-6 ("Gom MÁY TRẠM theo tầng nhà để tiện áp chính sách phần mềm chung"). Không câu hỏi nào hỏi tới.

**Cách chữa:** Thêm một câu tình huống vào bước Thử tay của m19-bai-1 và một câu song sinh vào pool đề thi, đại ý: "Công ty gắn một GPO cấm cài phần mềm lạ vào site DaNang. Chị Mai thuộc OU KeToan, hôm nay ngồi làm việc ở văn phòng Đà Nẵng — máy chị có dính luật đó không, vì sao?" (đáp: có, vì GPO gắn site áp theo chỗ máy đang đứng chứ không theo phòng ban). Câu này vừa lấp lỗ hổng, vừa là cây cầu duy nhất nối module 19 về module 9.

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng: Khái niệm m19-site được hỏi lại đầy đủ (m19-b1-prac-2, m19-mt-1, m19-mt-2, mặt trước thẻ ôn), và tầng Site của LSDOU cũng đã được kiểm tra ở module 9 (m9-b4-pra-1, m9-b4-ret-1, m9-mt-4, m9-mt-9). Thứ duy nhất chưa câu nào hỏi là GIA SỐ mà module 19 thêm vào: tương tác chéo hai trục — GPO gắn vào site áp theo chỗ máy đang đứng, bất kể người đó thuộc OU/phòng ban nào. Đây là lỗ hổng nhỏ, mức THẤP (thêm cầu nối liên module), không phải "dạy rồi không hỏi lại" mức vua. Câu tình huống chị Mai (OU KeToan, ngồi site DaNang, dính GPO cấm cài phần mềm) là bổ sung tốt nếu muốn khép kín cây cầu về module 9.

### `m20-b1-prac-1, m20-b1-prac-2, m20-b1-ret-1` — module-20 · vừa
**Vấn đề:** Khái niệm chủ đạo của bài 1 — một dòng log trả lời bốn câu: khi nào, máy nào, nặng cỡ nào, chuyện gì — được dạy hẳn một màn và có ẩn dụ, có thẻ ôn, nhưng KHÔNG câu hỏi nào trong toàn module bắt người học lấy nó ra từ trí nhớ. Cả bài 1 lẫn 15 câu đề thi đều chỉ xoay quanh thang severity.

**Bằng chứng:** Kiểm kê đủ 35 câu chấm điểm của module: bài 1 có m20-b1-pre-1 (mức 0 nghĩa là gì), m20-b1-prac-1 (ERROR mang số mấy), m20-b1-prac-2 (ngưỡng ẩn dòng nào), m20-b1-ret-1 (xếp 8 mức) và tự-giải-thích (ranh giới 3/4) — cả năm đều là khái niệm m20-severity. Pool 15 câu m20-mt-1 … m20-mt-ps2 cũng không câu nào hỏi bốn mảnh của một dòng log. Khái niệm m20-dong-syslog chỉ xuất hiện ở màn dạy và ở "Ví dụ giải sẵn" (bài giải sẵn, không phải câu hỏi). Trong khi thư cuối module hứa: "giờ bạn đọc một dòng nhật ký ra được bốn điều: khi nào, máy nào, nặng cỡ nào, chuyện gì".

**Cách chữa:** Thêm một câu vào bước Nhớ lại của m20-bai-1 và một câu song sinh vào pool: đưa một dòng log LẠ chưa từng xuất hiện trong bài (vd "2026-08-07 02:47:09 rtr-bien-01 WARNING bgp neighbor down") rồi bắt tách bốn mảnh — dạng xếp thứ tự bốn câu hỏi, hoặc gõ tay "máy nào" và "nặng cỡ nào". Như vậy mới đo đúng thứ tên bài hứa dạy.

### `m20-b2-prac-ps, m20-b3-prac-ps, m20-mt-ps1, m20-mt-ps2` — module-20 · nhẹ
**Vấn đề:** Bài 3 dạy chiến thuật ba nhát dao (theo mức nặng → theo thời gian → theo tên thiết bị), nhưng cả bốn bài terminal của module đều xong bằng đúng nhát thứ nhất. Hai nhát còn lại được dạy rồi không lần nào phải dùng, kể cả trong đề thi.

**Bằng chứng:** Lời giải mẫu của cả bốn câu đều là cùng một dòng: "Get-Content <file> | Select-String ERROR". Đếm trong fixture: tap-trung.log có đúng 1 dòng ERROR, sw-core.log (cả bản bài học lẫn bản đề thi) có đúng 1 dòng ERROR, srv-dhcp.log có 3 dòng ERROR nhưng giống hệt nhau ("no free leases in scope 10.20.3.0/24" lặp ba lần). Không đề nào ép người học phải khoanh thêm theo giờ hay theo tên máy.

**Cách chữa:** Sửa một fixture (đề nghị sw-core.log của m20-mt-ps2) cho có 3-4 dòng ERROR ở các khung giờ và thiết bị khác nhau — vd thêm "21:05 ERROR link down on port 3" và "22:40 ERROR psu 2 failure" — rồi hạ maxMatches xuống 2. Lúc đó lọc ERROR trần sẽ quá rộng, người học buộc phải chọn lưới hẹp hơn theo giờ ("03:") hay theo cổng ("port 12") trong một lượt. Lưu ý: engine chỉ cho MỘT nhịp ống (interpret.ts:698) nên đừng thiết kế lời giải phải nối hai Select-String.

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng: Trong module 20, không bài terminal nào ÉP người học dùng tới nhát dao thứ hai (theo giờ) hay thứ ba (theo tên máy/từ khóa) — lọc ERROR trần luôn đủ, vì cả ba fixture đều chỉ có 1 dòng ERROR (hoặc 3 dòng giống hệt nhau ở srv-dhcp.log). Đáng nói hơn: m20-mt-ps2 gần như bản sao của m20-b3-prac-ps (cùng file, cùng đích, cùng lệnh, chỉ khác mốc giờ), nên hai câu terminal trong đề thi không đo thêm gì so với lúc học. Không đúng nếu nói hai nhát kia "dạy rồi không hỏi lại": thẻ ôn SM-2 của m20-loc-truoc-doc bắt đọc lại đủ cả ba nhát, và lọc theo tên máy / theo cổng là đường đúng được chấm đạt ở ba trong bốn bài. Mức: nhẹ, thuộc loại làm mỏng bài tập chứ không sai kiến thức. Nếu sửa, hai việc rẻ và chắc ăn hơn đề xuất của họ: (1) đổi kịch bản m20-mt-ps2 cho khác hẳn bài 3 (file khác, triệu chứng khác) để đề thi thôi lặp lại bài học; (2) bổ sung maxMatches cho hai goal practice m20-b2-prac-ps và m20-b3-prac-ps — hiện hai câu này không khai, nên quét thô vẫn đạt, đúng thứ mà comment trong gradePs.ts nói là không được tính. Muốn ép hẳn lưới hẹp thì phải soạn lại fixture đồng bộ với maxMatches mới, chứ hạ thẳng xuống 2 sẽ loại luôn đường lọc theo cổng mà bài học đang khen là đúng.

### `m21-b2-prac-cli` — module-21 · vừa
**Vấn đề:** Bài dạy chốt "luật vàng của công trường" là thang kiểm chứng ba bậc, và bậc MỘT là chạy show interfaces trunk. Nhưng đề nộp chặng 2 chỉ bắt bậc hai (show ip ospf neighbor, phải ra Full) và bậc ba (ping) — bậc một không nằm trong bảng mục tiêu, và trong cả module không câu nào bắt người học lấy lệnh đó ra từ trí nhớ. Kết quả: đậu chặng 2 bằng đúng cái lối "gõ một mạch rồi ping phát ăn ngay" mà bài vừa chê là kiểu người mới.

**Bằng chứng:** Màn dạy m21-kiem-chung: "Dựng trunk xong: show interfaces trunk phải thấy đúng vai, đúng allowed list. Bật OSPF xong: show ip ospf neighbor... Rồi mới tới bằng chứng cuối: ping xuyên site." Nhưng mục tiêu của m21-b2-prac-cli chỉ có một mục 'viewed': {"command":"show ip ospf neighbor","deviceId":"r-cn"}. Câu nhớ lại m21-b2-ret-1 cũng chỉ hỏi bậc hai ("lệnh nào là bằng chứng kiểm chứng của tầng định tuyến"). Cụm "show interfaces trunk" xuất hiện 9 lần trong module-21.json, toàn bộ đều nằm trong lời văn (màn dạy, gợi ý, lời giải) — không lần nào là mục tiêu chấm hay đáp án của một câu hỏi.

**Cách chữa:** Thêm hai mục tiêu 'viewed' {"command":"show interfaces trunk","deviceId":"sw-1"} và {"...","deviceId":"sw-2"} vào goals của m21-b2-prac-cli (giống hệt nếp m21-b3-prac-cli đã bắt xem show access-lists). Kèm thêm một câu nhớ lại ở bước 5 của m21-bai-2: "bằng chứng của tầng 2 là lệnh nào?" với accept ["show interfaces trunk","sh interfaces trunk","show interface trunk","show int trunk"].

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng: "m21-b2-prac-cli chấm tầng 2 bằng TRẠNG THÁI (4 goal port-mode + trunk-carries) chứ không bằng một hành vi kiểm chứng, trong khi tầng 3 và tầng ping đều bị bắt bằng goal viewed/behavior. Bài dạy chốt thang ba bậc là ba LỆNH, nên để nếp chấm khớp lời dạy — và khớp chính m21-b3-prac-cli đã bắt viewed show access-lists — có thể thêm hai goal viewed {"command":"show interfaces trunk","deviceId":"sw-1"} và {"...","deviceId":"sw-2"}." Mức: THẤP (nhất quán nếp chấm), không phải lớp 3 mức vua.

BÁC nửa sau của cách chữa: KHÔNG thêm câu nhớ lại "bằng chứng tầng 2 là lệnh nào?" vào m21-bai-2 — nó trùng gần như nguyên văn m14-b4-ret-1 (đã có accept đúng bốn biến thể đó) và m14-mt-7 trong pool M14. Ô nhớ lại của m21-bai-2 đang dành cho cái MỚI của module này (OSPF), và câu hỏi đã ghi rõ phạm vi "tầng định tuyến" nên không hề mơ hồ.

Cũng bỏ hẳn câu "đậu chặng 2 bằng lối gõ một mạch rồi ping phát ăn ngay" — requireOspfFull:true chặn đúng lối đó.

## Lớp 8 — Lời giải nói lệch với đề (12 phát hiện)

### `m4-mt-12` — module-4 · vừa
**Vấn đề:** Phần "vì sao" nhắc tới một trải nghiệm chưa từng xảy ra: nó bảo người học đã gặp lỗi thiếu tuyến trong phòng lab. Cả 4 phòng lab của module 4 chỉ có switch và VLAN, không lab nào có router hay bảng định tuyến. Đọc xong người học sẽ tưởng mình bỏ sót hoặc quên mất một bài.

**Bằng chứng:** explain m4-mt-12: "Không dòng nào khớp thì gói bị bỏ — đúng cái lỗi thiếu tuyến bạn gặp trong phòng lab." Nhưng grep module-01→04 không có thiết bị "kind": "router" nào trong lab, và cả 4 lab (m4-b2-prac-lab, m4-b4-pre-lab, m4-b4-prac-lab, m4-mt-8) đều khai "setRoutes": false.

**Cách chữa:** Bỏ mệnh đề "— đúng cái lỗi thiếu tuyến bạn gặp trong phòng lab", hoặc đổi thành "— chuyện thiếu tuyến này bạn sẽ tự tay gặp ở phần sau".

### `m4-bai-4 (úp mở bài sau), m4-bai-5 (tổng kết), thư cuối module` — module-4 · vừa
**Vấn đề:** Cuối bài 4 hứa sẽ trả lời "ai bắc cầu qua bức tường VLAN vừa dựng", nhưng bài 5 lại dạy router nối hai mạng KHÁC DẢI địa chỉ — trong khi hai VLAN ở lab đều nằm chung dải 192.168.1.x, nên bài 5 không thật sự trả lời câu đã hứa. Tệ hơn, thư cuối module khẳng định người học đã tự tay cho hai xóm nói chuyện lại được với nhau — việc đó chưa lab nào làm, và nói vậy là ngầm phủ nhận chính bài học "khác VLAN thì không thấy nhau".

**Bằng chứng:** Úp mở m4-bai-4: "Ai được phép bắc cầu qua bức tường vừa dựng? Bài cuối module." Bài 5 dạy: "Router là cây cầu giữa hai mạng khác dải địa chỉ". Lab m4-b4-prac-lab để cả bốn máy ở 192.168.1.10–.40 (cùng dải, khác VLAN). Thư cuối: "Bạn cũng đã tự tay chia hai xóm trên cùng một switch rồi cho chúng nói chuyện lại được với nhau" — nối lại hai VLAN là router-on-a-stick, mãi module 14 mới dạy.

**Cách chữa:** Sửa úp mở bài 4 cho trung thực: "muốn hai xóm nói lại được với nhau còn cần thêm một thứ nữa — bài sau xem cây cầu đó làm việc thế nào, còn cách bắc cầu ngay trên một switch thì để dành phần sau". Thêm một dòng ở tổng kết bài 5: "switch không tự bắc cầu qua VLAN được — muốn hai VLAN nói chuyện phải nhờ router". Ở thư cuối, bỏ vế "rồi cho chúng nói chuyện lại được với nhau".

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng mức:

(1) Bài 5 trả lời NỬA VỜI lời hứa của bài 4 và của tên chặng "Bắc cầu qua tường". Nó nói đúng AI bắc cầu (router) và hook có nhắc lại bức tường VLAN, nhưng sau hook thì suốt bước dạy - thử tay - nhớ lại - tổng kết không còn một chữ VLAN nào; router được dạy như cầu giữa hai mạng KHÁC DẢI (192.168.1.x ↔ 10.0.0.x), trong khi hai xóm ở lab đều nằm trong 192.168.1.x. Người học không được nối lại hai đầu dây.

(2) Thư cuối module SAI SỰ THẬT, và đây mới là chỗ nặng: "rồi cho chúng nói chuyện lại được với nhau" mô tả việc chưa lab nào làm — lab bài 4 còn lấy "A không gọi được C" làm điều kiện ĐẠT, và cách nối hai VLAN (router-on-a-stick) mãi module 14 mới dạy.

Cách chữa: giữ nguyên hướng họ đề xuất, gồm ba mũi.
- Úp mở bài 4: sửa cho trung thực, đại ý "muốn hai xóm nói lại được với nhau còn cần thêm một thứ nữa — bài sau xem cây cầu đó làm việc thế nào; còn cách bắc cầu ngay trên một switch thì để dành phần sau".
- Tổng kết bài 5: thêm một gạch đầu dòng "Switch không tự bắc cầu qua VLAN được — muốn hai VLAN nói chuyện phải nhờ router." (Không nên nhét thêm chuyện mỗi VLAN cần một dải riêng vào đây: module 4 chưa dạy chia dải, để M13-14 lo.)
- Thư cuối: bỏ vế "rồi cho chúng nói chuyện lại được với nhau", giữ lại vế "đã tự tay chia hai xóm trên cùng một switch" — vế này đúng với lab bài 4.

### `m5-b6-pra-1` — module-5 · vừa
**Vấn đề:** Câu hỏi gọi phòng 21 là "phòng có băng chuyền chở thùng tệp", nhưng chính mô tả căn phòng trong bài lại nói ngược: 21 là quầy RA LỆNH, còn băng chuyền chở thùng chạy ở CỬA KHÁC. Người đọc kỹ sẽ hiểu đề đang hỏi cái cửa bên kia — mà cửa đó cả module không cho số nào. Đọc càng kỹ càng dễ khựng.

**Bằng chứng:** Mô tả phòng m5-r-ftp: "Phòng 21 là quầy RA LỆNH của khu kho: người ta đứng đó hô 'lấy thùng này', còn băng chuyền chở thùng thì chạy ở cửa bên." DeepDive nhắc lại: "cửa ấy chỉ là chỗ RA LỆNH… còn thùng tệp thật lại đi qua một cửa khác". Nhưng đề m5-b6-pra-1 là: "Phòng có băng chuyền chở thùng tệp không dán kín là port số mấy?" → đáp án 21; gợi ý nhớ lại và tổng kết cũng vẫn ghi "băng chuyền là 21 (FTP)".

**Cách chữa:** Sửa đề m5-b6-pra-1 thành "Quầy ra lệnh của khu kho — nơi hô 'gửi tệp này' — là port số mấy?" và đổi các chỗ gọi tắt "băng chuyền là 21" (gợi ý m5-b6-ret-1, tổng kết bài 6, thẻ ôn m5-cong-chia-se) thành "quầy ra lệnh là 21". Hoặc gọn hơn: nêu luôn số của cửa chở hàng (port 20) để hình băng chuyền có chỗ bám.

**Người phản biện chỉnh lại:** Phát biểu lại cho đúng: lỗi nằm ở MÔ TẢ PHÒNG m5-r-ftp (module-05.json dòng 230), không phải ở đề m5-b6-pra-1. Toàn module — hook bài 5, thân bài dạy, đề Thử tay, lời giải Nhớ lại, tổng kết, thẻ ôn m5-cong-chia-se, và cả hình vẽ palace-conveyor trong RoomGlyph.tsx — đều thống nhất "băng chuyền = phòng 21"; chỉ mỗi câu chuyện phòng và deepDive nói băng chuyền chạy ở cửa bên, tạo mâu thuẫn với chính bức hình treo trong phòng đó.

Cách chữa rẻ và đúng hơn: giữ nguyên đề và mọi nhãn "băng chuyền", chỉ viết lại story phòng 21 để băng chuyền Ở TRONG phòng 21, còn chi tiết tách kênh lệnh/kênh dữ liệu thì đẩy hết xuống deepDive. Ví dụ: "Phòng 21 là chỗ điều khiển băng chuyền chở thùng tệp: đứng đó hô 'lấy thùng này' là băng chuyền chạy. Không thùng nào dán kín." Sửa một dòng, hết mâu thuẫn, không đụng thẻ ôn/tổng kết/hình.

Tác động cũng nên hạ giọng: người đọc kỹ khựng một nhịp rồi vẫn trả lời 21 (cụm "không dán kín" và hình băng chuyền đều trỏ về phòng 21), chứ không dẫn tới đáp án sai.

### `m9-mt-12` — module-9 · vừa
**Vấn đề:** Đề thi hỏi "việc ĐẦU TIÊN" và chấm đúng là gpresult, nhưng chính bài 5 dạy thứ tự ngược lại: gpupdate trước, gpresult sau. Người học thuộc bài sẽ tìm gpupdate trong các lựa chọn, không thấy, và tưởng mình nhớ sai.

**Bằng chứng:** Câu tự giải thích của m9-bai-5, trả lời mẫu: "Trước hết gpupdate /force để loại trừ chuyện chưa kịp tải; rồi gpresult /r xem GPO có trong bảng kê không". Đề m9-mt-12: "Việc đầu tiên bạn làm là gì?" → đáp án "Chạy gpresult trên máy đó xem GPO nào đang thật sự dính", lời giải "Đọc trước, sửa sau".

**Cách chữa:** Chọn một trong hai và làm cho khớp: (a) đổi đề thành "Trước khi SỬA bất cứ thứ gì, bạn đọc bằng lệnh nào để biết máy đang dính GPO nào?", hoặc (b) sửa trả lời mẫu bài 5 thành "đọc gpresult /r trước; gpupdate /force khi nghi luật chưa kịp tải". Nhân tiện thay mồi nhử vô lý "Khởi động lại Domain Controller" bằng "Chạy gpupdate /force rồi thôi, không kiểm lại" — hai mồi nhử hiện tại vô lý tới mức loại trừ được ngay.

### `m11-mt-9` — module-11 · vừa
**Vấn đề:** Lời giải của câu thi thu hẹp "General failure" thành "card hoặc dây của chính máy mình" — trái với chính hai ca bệnh của module này và trái với thẻ ôn của module. Người học vừa học đúng ba nguyên nhân, thi xong đọc lời giải lại bị dạy ngược lại còn một nguyên nhân.

**Bằng chứng:** explain của m11-mt-9: "General failure: card hoặc dây của CHÍNH máy mình có vấn đề". Nhưng thẻ ôn m11-ipconfig-ping viết: "General failure: gói không rời nổi MÁY MÌNH (dây mình tuột, thiếu gateway, bị chặn outbound)". Và hai ca của module chạy đúng hai nguyên nhân bị bỏ: m11-b2-prac-ca — máy thiếu gateway, triệu chứng "General failure ngay lập tức"; m11-b5-pre-ca — GPO chặn ICMP chiều đi, "Ping lại 'General failure' ngay tại chỗ". Nửa sau của lời giải cũng lệch: "Destination host unreachable: gói đi được nhưng đường tới đích đứt", trong khi bài 1 dạy đó là "lời gọi ARP không ai đáp" và bài 2 dùng nó cho một gateway không ai giữ (chẳng có gì "đứt").

**Cách chữa:** Viết lại explain của m11-mt-9 bám thẻ ôn: "General failure: gói chưa rời nổi máy mình — dây mình tuột, thiếu gateway, hoặc bị luật chặn chiều đi. Destination host unreachable: gói rời được máy nhưng lời gọi ARP không ai đáp — bệnh nằm phía trước, thường ở máy đích hoặc ở một địa chỉ không ai giữ."

### `m12-pipeline (thẻ ôn), m12-b4-ret-1, m12-mt-6` — module-12 · vừa
**Vấn đề:** Bài 4 dạy thành một luật chung rằng thứ chảy trong đường ống PowerShell "là bản ghi có cột tên, không phải chữ". Ngay bài sau, chính module cho chảy trong ống những DÒNG CHỮ của file log (Get-Content | Select-String) mà không nói lại một lời nào. Người học ghi nhớ một câu sai kỹ thuật, lại còn được thẻ ôn SM-2 nhắc đi nhắc lại hàng tháng.

**Bằng chứng:** Tổng kết bài 4: "Trong ống chảy bản ghi có cột tên" · Thẻ ôn m12-pipeline: "Trong ống chảy BẢN GHI có cột tên (không phải chữ thuần)" · Bài 5 dạy: "Get-Content router.log đổ cả file ra, | Select-String ERROR giữ lại đúng những dòng có chứa chữ ấy" · Chính bộ mô phỏng của app (src/engine/ps/interpret.ts, runGetContent) đẩy vào ống các chuỗi văn bản: values: [...lines].

**Cách chữa:** Đổi cách nói từ "bản ghi có cột tên" sang "ĐỐI TƯỢNG chứ không phải văn bản thuần" ở tổng kết bài 4, thẻ ôn m12-pipeline và lời giải m12-b4-ret-1; giữ "bản ghi có cột tên" cho riêng ca Import-Csv. Thêm một câu vào màn dạy m12-doc-log: "Import-Csv nhả ra bản ghi có cột; Get-Content nhả ra từng dòng chữ — nên bên phải nó là Select-String (lọc chữ) chứ không phải New-ADUser (cần cột)".

### `m13-b2-prac-2, m13-b2-ret-1` — module-13 · vừa
**Vấn đề:** Cả bài 2 dựng trên một câu nói sai với chính con số của nó: cắt phòng nhỏ trước KHÔNG làm hết chỗ, chỉ làm phí đất. Bốn phòng 100/50/25/10 vẫn nằm gọn trong /24 dù cắt nhỏ trước. Tệ hơn, lời giải của câu thử tay ngay sau đó lại nói đúng sự thật, nên bài tự mâu thuẫn với mình, và một phương án nhiễu hóa ra lại đúng ở vế đầu.

**Bằng chứng:** Màn dạy (cat-lon-truoc): "một /25 không được phép đứng ở .16 — thế là kẹt dù tổng số địa chỉ vẫn thừa"; hook bài 2: "người thứ nhất tới phòng cuối thì hết chỗ đứng". Kiểm lại bằng đúng luật căn khối của bài 3: /28 ở .0-.15, /27 ở .32-.63, /26 ở .64-.127, /25 ở .128-.255 — cả bốn phòng đủ chỗ, chỉ bỏ không 16 địa chỉ. Lời giải m13-b2-prac-2 thừa nhận điều đó: "muốn nhét vào thì phải bỏ trống từ .16 tới .63, tức là mất không 48 địa chỉ" (tức là vẫn nhét được). Và phương án nhiễu C "Cả ba phòng vẫn xếp vừa, chỉ là bảng định tuyến của router dài thêm một dòng" — vế đầu đúng, chỉ vế sau sai.

**Cách chữa:** Thống nhất một câu chuyện duy nhất là PHÍ ĐẤT, không phải kẹt: đổi "thế là kẹt" thành "thế là khối /25 phải nhảy tới .128, bỏ không cả mảng .16-.31", và đổi hook thành "người thứ nhất xếp xong nhưng đốt mất một mảng đất, người thứ hai không mất một địa chỉ nào". Nếu muốn giữ cảnh thật sự hết chỗ thì phải thay bộ số bằng bộ chật hơn và tự kiểm lại bằng luật căn khối trước khi viết (bộ 100/50/25/10 trong /24 hiện vẫn đủ chỗ theo mọi thứ tự). Sửa luôn nhiễu C của m13-b2-prac-2, bỏ vế "cả ba phòng vẫn xếp vừa" vì vế đó đúng — ví dụ đổi thành "Router tự dồn ba khối lại cho khít nên không mất địa chỉ nào".

**Người phản biện chỉnh lại:** Đúng phần lõi, sai phần quy trách. Phát biểu lại: bài 2 module 13 kể một câu chuyện sai với chính bộ số của nó — 100/50/25/10 trong một /24 vừa gọn ở MỌI thứ tự cắt (kiểm hết 24 hoán vị), cắt nhỏ trước chỉ đốt không 16 địa chỉ chứ không bao giờ hết chỗ; bài lại tự mâu thuẫn vì lời giải m13-b2-prac-2 nói đúng sự thật là "vẫn nhét được, mất không 48 địa chỉ". Nhưng lỗi KHÔNG nằm ở hai câu hỏi bị gán: m13-b2-ret-1 hoàn toàn sạch (không có chữ sai nào), còn m13-b2-prac-2 có đáp án đúng và lời giải đúng, chỉ mắc lỗi nhẹ là nhiễu C có vế đầu đúng (vế sau "bảng tuyến dài thêm một dòng" vẫn sai nên câu không hỏng, chỉ yếu). Chỗ thật sự phải sửa là SÁU câu văn kể chuyện, không phải câu hỏi: hook bài 2 (module-13.json d.173), thân màn dạy `cat-lon-truoc` (d.206), gạch tổng kết bài 2 (d.309), câu trả lời mẫu Tự giải thích (d.300), úp mở cuối bài 1 (d.161), và lời giải câu đề thi m13-mt-8 (d.897) — tất cả đều đang nói "kẹt / hết chỗ giữa chừng". Cách chữa họ đề xuất (thống nhất một giọng PHÍ ĐẤT, hoặc thay bằng bộ số thật sự chật rồi tự kiểm lại bằng luật căn khối) là hợp lý, nhưng phải quét đủ sáu chỗ trên chứ không chỉ hook với màn dạy; riêng nhiễu C thì nên viết lại cho gọn chứ không phải vì nó "đúng".

### `m14-b1-prac-2` — module-14 · vừa
**Vấn đề:** Lời giải tự cãi mình trong đúng một câu và sai kỹ thuật: vừa nói tốc độ không liên quan, vừa khẳng định "trunk nhanh hơn". Cổng trunk và cổng access chạy cùng tốc độ trên cùng loại cáp — trunk không nhanh hơn ở bất cứ nghĩa nào. Tai hại hơn: mồi nhử vừa bị loại chính là "cổng access chạy chậm hơn cổng trunk", nên lời giải quay lại xác nhận một nửa cái mồi nhử đó; rồi trong đề thi m14-mt-1 lại có đúng mồi nhử "Trunk chạy nhanh hơn access vì dùng loại cáp có nhiều lõi đồng hơn" đứng chờ.

**Bằng chứng:** Lời giải m14-b1-prac-2: "...Tốc độ cổng không liên quan gì tới chuyện này; trunk nhanh hơn không phải vì cáp mà vì nó gộp được nhiều xóm." Ngược lại, giải thích của m14-mt-1 nói chuẩn: "Khác nhau ở số xóm phục vụ, không phải ở tốc độ hay loại cáp."

**Cách chữa:** Sửa vế cuối lời giải m14-b1-prac-2 thành: "Tốc độ cổng không liên quan gì tới chuyện này — trunk và access chạy cùng tốc độ trên cùng sợi cáp; trunk chỉ hơn ở chỗ gộp được nhiều xóm vào một dây." Bỏ hẳn cụm "trunk nhanh hơn".

### `m15-mt-13` — module-15 · vừa
**Vấn đề:** Lời giải của câu thi dạy sai luật bầu root bridge: nó nói TÊN MÁY cũng là thứ đem ra phân định khi priority hòa nhau. Thực tế và cả bài dạy đều chỉ có MAC. Người học đọc xong có thể tin rằng switch tên nhỏ hơn thì thắng — đúng cái hiểu lầm bài học đang cố dập.

**Bằng chứng:** m15-mt-13 explain: 'Switch-2 — priority NHỎ HƠN thắng (4096 < 32768). Tên máy hay địa chỉ MAC chỉ được đem ra phân định khi priority hòa nhau.' Trong khi màn dạy root-bridge của m15-bai-2 viết: 'hòa priority thì ai có địa chỉ MAC nhỏ hơn thắng' — không có tên máy. Và lời giải m15-b2-prac-2 còn nói thẳng 'Vị trí trong sơ đồ không được tính tới'.

**Cách chữa:** Sửa câu cuối của m15-mt-13 explain thành: 'Chỉ khi priority hòa nhau thì địa chỉ MAC mới được đem ra phân định — tên máy không bao giờ được tính tới.'

### `m15-mt-cli-1, m15-b3-prac-2` — module-15 · vừa
**Vấn đề:** Bài dạy nói cổng bị chặn là 'đầu xa gốc hơn' trên sợi dây thừa. Nhưng trên đúng cái sơ đồ tam giác mà cả module dùng, hai đầu sợi dây thừa CÁCH GỐC BẰNG NHAU — luật đã dạy không cho ra đáp án nào. Vậy mà lời giải câu thi vẫn khẳng định chắc nịch là cổng p3 của Switch-3. Người học tò mò nhìn cái cổng vẽ rỗng ruột trên sơ đồ sẽ không tự giải thích nổi vì sao là Switch-3 chứ không phải Switch-1.

**Bằng chứng:** Màn dạy cong-chan (m15-bai-3): 'STP chọn ra cổng xa gốc cây nhất trên sợi dây thừa'; phần Đào sâu: 'Trên mỗi sợi dây còn lại, đầu nào xa gốc hơn thì bị chặn.' Sơ đồ dùng trong mọi bài lab/console của module: Switch-2 priority 4096 (làm gốc), Switch-1 và Switch-3 đều priority 32768 và đều cách gốc ĐÚNG MỘT chặng; sợi thừa là ring-31 nối Switch-3·p3 — Switch-1·p3. Lời giải m15-mt-cli-1: 'cổng p3 của Switch-3 đang mang vai Altn, trạng thái BLK'. Trong src/engine/lab/stp.ts, khi hòa như vậy máy phân định bằng compareBridges → 'a.id < b.id', tức bằng CHUỖI ID thiết bị ('sw-1' < 'sw-3') — thứ người học không nhìn thấy và bài chưa hề dạy.

**Cách chữa:** Thêm một câu vào phần Đào sâu của màn cong-chan: 'Hai đầu cùng cách gốc bằng nhau thì luật chuyển sang so chính hai switch với nhau — switch nào có bridge ID (priority rồi tới MAC) nhỏ hơn thì được phát, đầu bên kia nằm im. Trong sơ đồ tam giác này Switch-1 nhỏ hơn Switch-3, nên cổng nằm im là p3 của Switch-3.' Đồng thời sửa 'đầu nào xa gốc hơn thì bị chặn' thành 'đầu nào xa gốc hơn thì bị chặn; cách gốc bằng nhau thì switch có bridge ID lớn hơn chịu chặn.'

**Người phản biện chỉnh lại:** Màn dạy cong-chan (m15-bai-3) nêu luật "đầu nào xa gốc hơn thì bị chặn", nhưng cả 8 sơ đồ của module đều là tam giác đối xứng (Switch-2 làm gốc ở 4096; Switch-1 và Switch-3 cùng 32768, cùng cách gốc 1 chặng), nên luật này không phân định được đầu nào của sợi thừa ring-31 phải nằm im. Đây là lỗ hổng CHIỀU SÂU, không phải lỗi câu hỏi: không câu nào trong module — kể cả pool đề thi — bắt người học tự suy ra đầu nào chặn. m15-mt-cli-1 chỉ chấm việc gõ đúng `show spanning-tree`, và bảng sim in thẳng "p3 Altn BLK" ra màn hình nên lời giải chỉ thuật lại thứ người học vừa thấy; m15-b3-prac-2 hỏi SỐ cổng bị chặn, thứ mà luật đã dạy suy ra trọn vẹn — câu này không liên quan, nên bỏ khỏi phát hiện. Mức đúng là THẤP.

Nếu vá, chỉ nên thêm một câu vào phần Đào sâu, và tránh khẳng định về MAC (không sơ đồ nào khai bridgeMac; engine phân định hòa bằng định danh thiết bị). Ví dụ: "Hai đầu cách gốc bằng nhau thì luật so tiếp chính hai switch với nhau — switch có bridge ID nhỏ hơn được phát, đầu bên kia nằm im; đó là lý do trên sơ đồ tam giác này cổng nằm im nằm ở Switch-3 chứ không phải Switch-1." Muốn triệt để hơn thì khai bridgeMac cho ba switch trong sơ đồ để con số phân định hiện ra được trên bảng, thay vì để người học tin suông.

### `m19-mt-ps1` — module-19 · NẶNG
**Vấn đề:** Câu thi terminal bắt người học "vá lại chuỗi" cho anh Nam đang nằm THẲNG trong nhóm quyền. Nhưng app không có lệnh gỡ, nên sau khi làm xong anh Nam vẫn còn nằm thẳng trong QuyenInAn-DL — đúng cái "sai nếp" mà module vừa dạy phải tránh. Nguy hại hơn là lời giải: nó khẳng định "ngày anh chuyển phòng chỉ cần rút khỏi nhóm vai", điều đó SAI trong chính thế giới của câu này — rút khỏi InAn-GG xong anh vẫn in được, vì mẩu quyền cũ vẫn dính thẳng vào người. Người học đậu bài thi rồi mang theo niềm tin ngược với bài học lõi của module.

**Bằng chứng:** Thế giới của đề: QuyenInAn-DL có members ["hvnam", "InAn-GG"], và lệnh Add-ADGroupMember chỉ THÊM chứ không gỡ (src/engine/ps/interpret.ts). Lời giải đề: "Bổ sung anh vào InAn-GG là chuỗi liền lại: … và ngày anh chuyển phòng chỉ cần rút khỏi nhóm vai." Trong khi màn dạy m19-vong-doi nói: "rút khỏi nhóm vai cũ … không sót lại mẩu quyền nào của đời trước", và m19-agdlp nói thấy ObjectClass user nằm thẳng trong nhóm quyền "là dấu vết của những lối tắt".

**Cách chữa:** Viết lại lời giải cho thật: "Bạn vừa nối được nửa còn thiếu — nhưng ca này chưa sạch: tra lại Get-ADGroupMember QuyenInAn-DL vẫn thấy hvnam đứng đó với ObjectClass user. Ngoài đời còn một động tác nữa mà app chưa có: Remove-ADGroupMember QuyenInAn-DL -Members hvnam. Chỉ khi gỡ xong thì câu 'chuyển phòng là rút khỏi nhóm vai' mới đúng." Và đổi lời đề từ "vá lại cho quyền chảy ĐÚNG CHUỖI" thành "nối nốt mắt xích còn thiếu (phần dọn dấu vết cũ để lượt sau)".

**Người phản biện chỉnh lại:** Lời giải của m19-mt-ps1 (content/modules/module-19.json dòng 1968) chứa một khẳng định SAI trong chính thế giới của đề: sau khi `Add-ADGroupMember InAn-GG -Members hvnam`, hvnam VẪN nằm thẳng trong QuyenInAn-DL (world dòng 1937-1943; app chỉ có chiều THÊM, PS_COMMANDS ở src/engine/ps/interpret.ts dòng 48-60), nên "ngày anh chuyển phòng chỉ cần rút khỏi nhóm vai" không đúng với anh Nam — rút khỏi InAn-GG xong anh vẫn in được. Vế "ai tra Get-ADGroupMember cũng đọc ra vì-sao-anh-có-quyền" cũng hụt, vì hvnam vẫn hiện ObjectClass user trong nhóm quyền — đúng thứ màn dạy m19-agdlp (dòng 649) gọi là dấu vết lối tắt, và bước Nhớ lại (dòng 1091) đã nêu rõ nguyên tắc chỉ đúng KHI không còn mẩu quyền dính thẳng vào người. Cần sửa lời giải để nói rõ ca này mới nối được mắt xích chứ chưa dọn dấu vết cũ (ngoài đời còn một nhịp Remove-ADGroupMember mà app không mô phỏng), và chỉnh lời đề từ "vá lại cho quyền chảy ĐÚNG CHUỖI" thành "nối nốt mắt xích còn thiếu". Không phải "người học mang niềm tin ngược với bài học lõi" — nguyên tắc họ học vẫn đúng; cái hỏng là câu này dạy ngầm rằng để sót mẩu quyền cũ vẫn tính là vá xong.

### `m19-b3-prac-1 (màn dạy m19-agdlp, phần Đào sâu hơn)` — module-19 · nhẹ
**Vấn đề:** Phần "Đào sâu hơn" của màn dạy AGDLP — chỗ duy nhất giải thích cột ObjectClass mà câu m19-b3-prac-1 hỏi ngay sau đó — mở đầu bằng một câu người học không thể hiểu và cũng không đúng với đời họ: nó nói người học đã cầm đường ống này trên tay "từ khối engine". "Khối" là cách gọi các đợt làm việc của người viết app, không phải thứ người học từng nghe; và trước module 19 thì trong toàn khóa chưa có bài nào dùng tới Get-ADGroupMember.

**Bằng chứng:** Nguyên văn màn dạy m19-agdlp: "Đường ống này bạn đã cầm trên tay từ khối engine: Get-ADGroupMember trên một nhóm quyền tử tế sẽ hiện ObjectClass group…". Tìm cả content/modules/*.json: chuỗi "Get-ADGroupMember" chỉ có trong module-19.json, không có ở bất kỳ module nào trước.

**Cách chữa:** Sửa mấy chữ đầu thành: "Đường ống này bạn vừa cầm trên tay ở phần Đoán thử: Get-ADGroupMember trên một nhóm quyền tử tế sẽ hiện ObjectClass group…" — vừa bỏ được chữ nghề của người viết app, vừa nối đúng vào việc người học thật sự vừa làm mấy phút trước.

## Lớp 6 — Câu mơ hồ / nhiều đáp án đúng (4 phát hiện)

### `m8-mt-6` — module-8 · NẶNG
**Vấn đề:** Câu thi này mở đầu bằng "Cùng cảnh đó" — nó dựa vào câu m8-mt-5 đứng ngay trước. Nhưng đề thi rút ngẫu nhiên 8 câu trong 12 rồi xáo thứ tự, nên rất thường xuyên người học đọc câu này mà chưa hề gặp "cảnh đó": hoặc m8-mt-5 không được rút, hoặc bị xáo ra sau. Tính ra khoảng 45% số lượt thi sẽ gặp câu hỏi treo lơ lửng không có đầu.

**Bằng chứng:** Đề m8-mt-6: "Cùng cảnh đó nhưng máy dùng 2001:db8::5 (IPv6 công cộng). Địa chỉ nguồn có phải đổi không?" — trong khi src/engine/masteryPool.ts ghi rõ: "Rút ngẫu nhiên từ pool" và "Trả về câu đã XÁO THỨ TỰ luôn (thứ tự câu cũng phải đổi mỗi lượt)". Module 8 không có câu trụ nào nên cả 12 câu đều bị bốc và xáo tự do.

**Cách chữa:** Viết lại đề m8-mt-6 cho đứng được một mình, bỏ hẳn cụm "Cùng cảnh đó": "Máy dùng địa chỉ IPv6 công cộng 2001:db8::5 mở một trang web. Địa chỉ nguồn có phải đổi gì trước khi gói tin ra tới Internet không?" Đồng thời rà cả bộ đề của các module khác xem còn câu nào mở đầu bằng "Cùng cảnh đó / như câu trên" không.

### `m9-mt-5` — module-9 · vừa
**Vấn đề:** Đề thi hỏi bằng chữ A/B trừu tượng, không nói rõ hai GPO đang cãi nhau về CÙNG một thiết lập. Mồi nhử "cả hai cùng áp, không ai đè ai" thật ra là đáp án đúng khi hai GPO chỉnh hai thứ khác nhau — người hiểu sâu chọn nó và mất điểm ở cửa 85%.

**Bằng chứng:** Đề m9-mt-5: "GPO Domain nói A, GPO treo ở OU nói B, không ai gắn Enforced. Máy trong OU theo luật nào?", mồi nhử thứ ba: "Cả hai luật cùng áp một lúc, không ai đè ai". Trong khi câu cùng nội dung ở bài 4 (m9-b4-pra-2) khóa chặt tình huống: "GPO Domain đặt hình nền XANH, GPO treo ở OU KeToan đặt hình nền ĐỎ".

**Cách chữa:** Viết lại đề thi cho khớp bài dạy: "Domain và OU cùng chỉnh MỘT thiết lập — Domain đặt hình nền XANH, OU đặt ĐỎ, không ai gắn Enforced. Máy trong OU hiện nền màu gì?". Nếu muốn giữ chữ A/B thì thêm mệnh đề "A và B là hai giá trị khác nhau của cùng một thiết lập".

**Người phản biện chỉnh lại:** Đúng một nửa, và mức phải hạ từ "vua" xuống "thấp". Phát biểu lại: đề m9-mt-5 thiếu một mệnh đề nói rõ A và B là hai giá trị khác nhau của CÙNG một thiết lập, nên mồi nhử "cả hai cùng áp, không ai đè ai" là mệnh đề đúng trong AD thật dưới cách đọc đó. Nhưng đây là vết xước diễn đạt, không phải bẫy: app chưa từng dạy chuyện hai GPO khác thiết lập thì cùng áp (grep toàn bộ nội dung không có), còn đề đã có ba tín hiệu chỉ về tranh chấp (lối nói "nói A/nói B", việc nhắc Enforced, và hai lựa chọn kia đều nói "đè"/"thắng" kèm câu hỏi "theo luật NÀO"). Cách chữa nên dùng: GIỮ nguyên chữ A/B và chỉ thêm một mệnh đề — "GPO Domain và GPO treo ở OU cùng chỉnh MỘT thiết lập: Domain đặt A, OU đặt B, không ai gắn Enforced. Máy trong OU theo luật nào?". KHÔNG bê nguyên tình huống XANH/ĐỎ của câu luyện tập m9-b4-pra-2 sang đề thi, vì pool đề cố ý không trùng nguyên văn câu vừa luyện (nếu trùng thì 85% chỉ còn đo trí nhớ về đề).

### `m13-mt-8` — module-13 · NẶNG
**Vấn đề:** Câu xếp thứ tự trong đề thi chỉ chấm đúng MỘT dãy, nhưng có hai dãy đều đúng như nhau: "chọn cỡ khối rồi mới xếp giảm dần" (đáp án của đề) và "xếp giảm dần rồi mới chọn cỡ khối". Chính app dạy dãy còn lại ở chỗ khác, nên người hiểu bài trọn vẹn vẫn bị trừ điểm ngay ở cửa ải 85%.

**Bằng chứng:** Đáp án đề đặt bước 2 = "Chọn cỡ khối vừa đủ cho từng phòng", bước 3 = "Xếp các phòng theo số máy giảm dần". Nhưng màn dạy m13-bai-2 viết "xếp nhu cầu giảm dần rồi cắt từ khối to nhất", và bài mẫu của capstone (m21-bai-1) viết thẳng "Bước 1 — xếp phòng theo cỡ GIẢM DẦN... Bước 2 — chọn cỡ khối nhỏ nhất đủ dùng cho từng phòng" — ngược đúng hai bước. Bộ chấm câu xếp thứ tự chỉ nhận đúng dãy gốc (src/engine/grading/gradeQuestion.test.ts: "accepts only the exact original order"). Ngoài ra bài mẫu duy nhất có đánh số của module (m13-bai-1) lại chỉ có 3 bước và bước cuối là "soi lại" — bước này không có trong đề.

**Cách chữa:** Gộp hai bước hoán vị được thành một mục để chỉ còn ba bước không thể xếp sai: ① "Liệt kê số máy của từng phòng" ② "Xếp các phòng giảm dần rồi chọn cỡ khối vừa đủ cho từng phòng" ③ "Cắt từ đầu dải, khối to trước" ④ "Soi lại: không chồng lấn, đủ chỗ, không phí đất" (bước ④ lấy đúng từ m13-bai-1 và m21-bai-1). Sửa luôn phần "Vì sao" vì nó đang giải thích chuyện đảo bước 3-4, không phải chỗ thật sự mơ hồ.

**Người phản biện chỉnh lại:** Câu xếp thứ tự m13-mt-8 có hai dãy đều đúng như nhau mà bộ chấm chỉ nhận một. Bước ② "Chọn cỡ khối vừa đủ cho từng phòng" và bước ③ "Xếp các phòng theo số máy giảm dần" đều chỉ cần đầu ra của bước ①, không bên nào cần bên kia, và vì cỡ khối tăng theo số máy nên đảo hai bước vẫn ra đúng một kết quả. Bộ chấm (src/engine/grading/gradeQuestion.ts:99-102) chỉ nhận hoán vị đồng nhất, schema không có chỗ khai dãy thay thế, và gradeQuestion.test.ts:64-66 ghim thẳng [0,2,1,3] — đúng cú đảo này — là SAI.

Hai điều chỉnh so với phát biểu gốc:

(a) Chỗ app dạy dãy ngược là bài mẫu capstone m21-bai-1 (module-21.json:116, "Bước 1 — xếp phòng theo cỡ GIẢM DẦN... Bước 2 — chọn cỡ khối nhỏ nhất đủ dùng"), và nó còn tự nhận là "từng bước như Module 13 đã dạy" — tức app tự mâu thuẫn. Nhưng Module 21 nằm SAU cửa ải 85% của Module 13, nên nó không phải thứ khiến người thi m13 xếp sai. Không được tính nó là nguyên nhân gây mất điểm tại cửa ải.

(b) Dẫn chứng m13-bai-2 ("xếp nhu cầu giảm dần rồi cắt từ khối to nhất", module-13.json:307) KHÔNG chống lại đáp án đề — câu đó nói về ③→④, trùng khớp với đáp án. Bỏ dẫn chứng này.

Nguyên nhân thật khiến người hiểu bài vẫn xếp "giảm dần" lên trước nằm ngay trong Module 13: thẻ khái niệm "cat-lon-truoc" (module-13.json:742) mở đầu bằng "xếp nhu cầu giảm dần", còn pretest và bước Nhớ lại đều nhấn "bắt đầu từ phòng đông máy nhất" — trong khi bước "chọn cỡ" chưa bao giờ được dạy là bắt buộc đứng trước.

Mức "nặng" giữ nguyên: đề rút 8 câu, ngưỡng 85% nghĩa là phải đúng 7/8, chỉ được sai một câu; câu này xuất hiện khoảng 60% số lượt thi.

Cách chữa họ đề xuất là đúng hướng: gộp ②③ thành một mục để còn bốn bước không thể xếp sai, thêm bước "Soi lại: không chồng lấn, đủ chỗ, không phí đất" (có sẵn ở m13-bai-1 và m21-bai-1), và viết lại phần "Vì sao" cho nhắm vào ranh giới xếp-trước-khi-cắt thay vì ranh giới hiện tại. Làm thêm hai việc: rà lại fixture [0,2,1,3] trong gradeQuestion.test.ts, và sửa m21-bai-1 để nó thôi mâu thuẫn với câu "như Module 13 đã dạy".

### `m16-mt-3` — module-16 · nhẹ
**Vấn đề:** Đề thi mô tả một hiện tượng mà chính máy giả lập của app không bao giờ tạo ra: "bảng láng giềng vẫn trống". Trong app, hai router đã nối dây và cùng bật OSPF mà thiếu câu network thì bảng KHÔNG trống — nó in một dòng DOWN kèm lý do. Người học nào đọc kỹ nhất bài 2 lại chính là người dễ loại nhầm đáp án đúng nhất.

**Bằng chứng:** Lời giải m16-b2-prac-cli dạy rõ: "Bảng in ra một dòng ở trạng thái DOWN kèm lý do no-ospf-process" và "router thật KHÔNG in dòng DOWN kèm lý do — láng giềng chưa từng chào thì bảng chỉ rỗng". Engine xác nhận: src/engine/cli/show.ts luôn in `DOWN (${neighbor.reason})` cho mọi láng giềng chưa lên, với các lý do link-down / no-ospf-process / subnet-mismatch / network-not-declared (src/engine/lab/ospf.ts). Trong khi đó đề m16-mt-3 viết: "Hai router đã nối dây và cùng bật OSPF, nhưng bảng láng giềng vẫn trống."

**Cách chữa:** Sửa thân đề m16-mt-3 cho khớp thứ người học thật sự nhìn thấy trên console của app, ví dụ: "...nhưng bảng láng giềng in một dòng DOWN thay vì FULL". Nếu cố ý muốn nói về thiết bị thật thì phải nói thẳng trong đề ("trên một router thật") để người học biết đang đứng ở đâu.

**Người phản biện chỉnh lại:** Thân đề m16-mt-3 không sai kiến thức (trên router thật, thiếu network thì bảng láng giềng đúng là rỗng — chính bài 2 của module đã dạy điều đó), và không có đường loại trừ nào khiến người học bỏ đáp án đúng. Phần còn lại đáng nhận: đề không nói rõ đang đứng ở console app hay thiết bị thật, mà app cố tình in thêm cột lý do. Nếu muốn chỉnh thì chỉnh một chữ cho rõ khung, KHÔNG đổi sang mô tả của sim: "Trên một router thật: hai router đã nối dây và cùng bật OSPF, nhưng bảng láng giềng vẫn trống..." (hoặc trung tính: "...nhưng chưa cặp láng giềng nào lên Full"). Tuyệt đối không sửa thành "in một dòng DOWN" — đó là chỗ app tự khai mình nói nhiều hơn thiết bị thật, đưa vào đề thi là dạy ngược.

## Lớp 7 — Hỏi chữ thay vì hỏi hiểu (1 phát hiện)

### `m1-mt-9, m1-mt-4` — module-1 · nhẹ
**Vấn đề:** Hai câu trong cùng pool cùng đo một thứ (port) và cùng chỉ đòi nhớ CHỮ. Riêng m1-mt-9 đọc xong định nghĩa đã nằm sẵn trong đề — người học chỉ còn việc điền cái tên. Pool 12 câu rút 8, nên khá thường xuyên cả hai cùng vào một đề, ăn mất hai chỗ mà chỉ đo một khái niệm.

**Bằng chứng:** m1-mt-9: "Vậy con số đóng vai SỐ CĂN HỘ — chỉ đúng ứng dụng nhận dữ liệu — gọi là gì?" (đề đã nói luôn port làm gì). m1-mt-4: "con số nào đưa nó vào đúng ứng dụng chat thay vì trình duyệt?" — hai câu cùng accept ["port","cổng","số port","số cổng"]. Đếm cả pool: 6/12 câu là dạng "… gọi là gì" (m1-mt-1, 2, 3, 4, 6, 9). Bộ rút đề (src/engine/masteryPool.ts) không lọc trùng khái niệm — MASTERY_DRAW_COUNT = 8 trên pool 12.

**Cách chữa:** Thay m1-mt-9 bằng một câu bắt ÁP DỤNG thay vì nhớ tên, ví dụ: "Máy Mai và máy bạn cùng mở trình duyệt vào một trang web. Hai kết nối đó khác nhau ở chỗ nào để máy chủ không trả nhầm trang?" — hoặc một câu hỏi hệ quả: "Gói tin tới đúng máy nhưng thiếu số port thì chuyện gì xảy ra?". Giữ m1-mt-4 làm câu đo port duy nhất.

## Lớp 2 — Thiếu bước chuyển (1 phát hiện)

### `m10-mt-9` — module-10 · nhẹ
**Vấn đề:** Đề thi bắt quy đổi "mua thêm switch cắm vào tủ rack" thành "khai thêm một mạng con trong VPC". Phép ghép switch ↔ mạng con chưa màn dạy nào làm: bài chỉ dạy nguyên tắc chung "thiết bị thành phần mềm khai báo", còn phép quy đổi cụ thể duy nhất bài dạy là VPC ↔ VLAN + subnet. Người học phải loại trừ chứ không suy ra được.

**Bằng chứng:** Tra cả module-10.json: cụm "mạng con" CHỈ xuất hiện trong hai câu đề thi (m10-mt-9, m10-mt-10), không có trong bất kỳ màn dạy, ví dụ giải sẵn hay tổng kết nào — bài luôn dùng chữ "subnet". Cụm "tủ rack" xuất hiện đúng một lần trong toàn module: chính câu m10-mt-9, chưa từng được giải nghĩa cho người học từ số 0.

**Cách chữa:** Hai cách, chọn một: (a) thêm một câu vào màn dạy m10-cloud, nối thẳng phép quy đổi — "cắm thêm switch để có thêm chỗ cho máy ↔ khai thêm một subnet trong VPC bằng vài dòng"; hoặc (b) đổi đề sang thứ bài đã quy đổi thật: "phòng ban mới cần một vùng mạng cô lập riêng — trên mây làm thế nào?". Kèm theo: thay "tủ rack" bằng "tủ thiết bị" hoặc bỏ hẳn.

**Người phản biện chỉnh lại:** Không phải lỗi "đòi thứ chưa dạy" — màn dạy m10-cloud gọi thẳng tên "switch" trong danh sách thiết bị hoá thành dòng khai báo, và m10-vpc nói rõ VPC vẫn "chia subnet y hệt", chỉ khác là "không dây, không switch". Suy ra được, không phải loại trừ. Chỉ còn một nhược điểm từ ngữ, mức rất nhẹ: đề thi dùng chữ "mạng con" trong khi cả module chỉ dạy chữ "subnet" (grep: "mạng con" không xuất hiện ở bất kỳ màn dạy nào của module 10), và "tủ rack" chưa từng được giải nghĩa. Chữa tối thiểu, không đụng màn dạy, không đổi đề: sửa phương án A và phương án nhiễu của m10-mt-10 từ "mạng con" thành "subnet" cho khớp từ vựng bài giảng, và đổi "cắm vào tủ rack" thành "cắm vào tủ thiết bị trong phòng máy chủ" (hoặc bỏ hẳn vế đó).

---

## 6 phát hiện BỊ BÁC BỎ (giữ lại để khỏi soi lại)

- **`m3-mt-12`** — Câu thi đi chiều ngược: từ mask 255.255.255.192 suy ra /26. Cả module chỉ luyện chiều xuôi (prefix → mask) và chỉ với mask tròn octet; phép ghép "CIDR đếm số bit phần mạng" + "192 là 2 bit" chưa bài n
  - *Vì sao bác:* Đã tự kiểm 4 nguồn, kết quả bác bỏ luận điểm chính "người học gặp phép ghép này lần đầu trong phòng thi".

1) Bản soát `scratchpad/soat-cau-hoi/soat-cau-hoi/module-3.md` (grep "255.255.255.192" ra các dòng 179, 184, 294, 303, 319, 322) và `content/modules/module-03.json` dòng 910-917 — đề đúng như họ trích: "Subnet mask 255.255.255.192 ghi gọn theo CIDR là gì? (trả lời dạng /n)", accept ["/26","26"], hintTopic "CIDR đếm số bit thuộc phần mạng".

2) Cặp /26 ↔ 255.255.255.192 KHÔNG bị giấu trong Đào sâu. Nó nằm ngay MÀN DẠY CHÍNH của m3-bai-5 (module-03.json dòng 532): "Với /26: mask là 255.255.
- **`m4-b4-ret-1 (khái niệm mien-quang-ba)`** — Bài 4 dạy hẳn một màn riêng về "miền quảng bá", nhưng bước Nhớ lại của chính bài đó chỉ hỏi tên VLAN, và câu tự giải thích cũng chỉ hỏi vì sao hai máy khác VLAN không gọi được nhau. Trong pool 12 câu 
  - *Vì sao bác:* Đã tự kiểm 4 nguồn, kết luận ngược lại phát hiện.

1) File soát `scratchpad/soat-cau-hoi/module-4.md` (dòng 131-210, mục `m4-bai-4`): trích dẫn của họ về bước Nhớ lại và Tự giải thích là ĐÚNG nguyên văn. Nhưng grep `m4-b4-ret-1` trong chính file đó ra 0 dòng — file soát không in id câu, nên id phải đối chiếu ngược qua JSON (`/lessons/3/steps/4/questions/0/id = m4-b4-ret-1`, xác nhận bằng script duyệt cây `content/modules/module-04.json`).

2) KÊNH HỌ BỎ SÓT — flashcard SM-2. `module-04.json` dòng 984-995 có concept `mien-quang-ba` với flashcard mặt trước: "Miền quảng bá là gì, và VLAN ảnh hưởn
- **`m6-mt-10`** — Câu thi hỏi "ngoài địa chỉ IP, DHCP còn giao gì" (subnet mask, default gateway, máy chủ DNS). Nhưng trong màn dạy DHCP, phần thân bài KHÔNG nhắc ba thứ đó một chữ nào — chúng chỉ nằm trong ô "Đào sâu 
  - *Vì sao bác:* Đã tự kiểm 5 chỗ, bằng chứng ngược lại phát hiện:

1) BẢN SOÁT (scratchpad/soat-cau-hoi/module-6.md, dòng 297-300) + content/modules/module-06.json:1381 (masteryTest[9]): câu này là TRẮC NGHIỆM 3 lựa chọn, không phải gõ tay. Người soát mô tả như thể "phải lấy ba thứ ra từ trí nhớ" — thực tế chỉ là nhận diện. Hai mồi nhử loại được sạch: "Địa chỉ MAC mới và danh sách port máy được phép mở" trái hẳn module-03 m3-bai-1 (MAC = "số khung dập chết từ nhà máy"), còn "bộ nhớ đệm DNS đã tra sẵn" trái với chính bài cache DNS trong module 6.

2) SAI Ở BẰNG CHỨNG LÕI. Họ nói thân màn dạy "không nhắc một ch
- **`m15-b2-prac-cli, m15-mt-cli-1`** — Hai câu console bắt gõ lệnh 'show spanning-tree', nhưng lệnh này chưa từng xuất hiện trong bất cứ màn dạy nào trước đó — lần đầu tiên nó có mặt trong cả khóa chính là ở đề bài của m15-b2-prac-cli. Ngư
  - *Vì sao bác:* ĐÃ MỞ: bản soát `…/scratchpad/soat-cau-hoi/module-15.md` (dòng 73-83 = m15-b2-prac-cli, dòng 294-302 = m15-mt-cli-1), `content/modules/module-15.json`, `content/modules/module-14.json`, `src/engine/cli/interpret.ts`, `src/features/cli/CliConsole.tsx`, `src/components/QuestionInput.tsx`, `src/i18n/vi.json`.

1) Phần grep của họ ĐÚNG nhưng vô hại: `grep -rn "show spanning-tree" content/modules/*.json` chỉ trúng module-15.json, chỗ sớm nhất là dòng 426-427 (goals + solution của chính m15-b2-prac-cli); ngoài module-15 chỉ có module-12.json:1212 là dòng log "spanning-tree reconverged". Hai màn dạy 
- **`m16-mt-4`** — Câu thi hỏi tên gói tin, đáp án là "hello". Nhưng cả module gọi nó bằng ẩn dụ "tiếng chào" — tên bài 2 là "Bắt được tiếng chào của hàng xóm", và gợi ý tầng 1 của chính câu thi này cũng là "tiếng chào"
  - *Vì sao bác:* Kiểm 4 bước, kết luận: cơ chế gây hại mà người soát mô tả KHÔNG tồn tại trong app.

1) Bản soát: mở `...\scratchpad\soat-cau-hoi\module-16.md`. Câu nằm ở dòng 322-324, trong mục ĐỀ THI (pool mastery), không phải trong bài học. Trích dẫn của họ về đề/hintTopic/accept là chính xác về mặt chữ.

2) Nguồn thật: `content/modules/module-16.json` dòng 1642, khối `masteryTest[3]`. accept đúng như họ ghi. Chạy bộ chấm thật (MCP grade_answer): "tiếng chào" → SAI, "tieng chao" → SAI, "gói tiếng chào" → SAI; "hello"/"Gói Hello"/"goi hello" → ĐÚNG. Phần chấm họ nói đúng.

3) NHƯNG kịch bản "người học mở gợi
- **`m21-mt-4`** — Đề thi hỏi hậu quả khi một đầu dây đã khai trunk còn đầu kia vẫn là cổng access. Tình huống lệch vai đó chưa bài nào trong 21 module dạy, chưa sơ đồ nào bày ra, chưa câu hỏi nào đặt. Module 14 chỉ dạy
  - *Vì sao bác:* TỰ KIỂM (không tin lời họ):

1) Đọc nguyên văn câu. `soat-cau-hoi/module-21.md` dòng 250-253 (ID "m21-mt-4" không có trong file md nên phải tìm bằng nguyên văn đề), đối chiếu nguồn thật `content/modules/module-21.json` dòng 2830-2854. Xác nhận: mcq, đáp án 0 = "Khung mang nhãn đâm vào cổng access thì bị bỏ — VLAN chết trên dây"; nhiễu B = tự đàm phán DTP; nhiễu C = chẵn/lẻ. Dump JSON: m21-mt-4 nằm trong `masteryTest` 16 câu của M21.

2) Họ nói "chưa bài nào dạy" → grep sai. Đề bài này nằm ở pool thi của M21, mà CHÍNH lesson m21-bai-2 dạy đủ ba mảnh:
- Hook (module-21.json ~dòng 700): "hai swit

## Điểm mạnh từng module (đừng phá khi sửa)

- **module-1** — Chuỗi ẩn dụ bưu điện được giữ chặt và nhất quán qua cả 6 bài (phong bì → địa chỉ nhà → số căn hộ → bưu tá → luật chơi), rồi m1-bai-6 hàn bốn khái niệm lại thành một hành trình có thật bằng câu xếp thứ tự cộng bài "kể lại cho đứa em" — module kết thúc bằng việc người học dựng lại cả câu chuyện, không phải điểm danh từng cái tên.
- **module-2** — Trục ẩn dụ làng — cổng làng — dây chuyền bưu tá — tòa nhà dịch vụ 24/7 được giữ liền mạch qua cả 4 bài rồi khép lại bằng câu xếp thứ tự 8 chặng, nên người học rời module cầm được một tấm bản đồ hành trình liền khối chứ không phải bốn mẩu khái niệm rời.
- **module-3** — Mạch magic number là điểm sáng thật: bài không chỉ đưa mẹo mà còn giải thích vì sao mẹo đúng (192 = 11000000 → 2^6 = 64), rồi cho luyện đúng mẫu đó ở thử tay, nhớ lại, thẻ ôn và một câu xếp thứ tự trong đề thi — một chuỗi dạy-rồi-đòi-lấy-ra rất chuẩn, đừng động vào.
- **module-4** — Các phòng lab được chấm bằng HÀNH VI và bài VLAN luôn kèm mục tiêu \"phải KHÔNG gọi được\", nên mẹo gộp hết vào một VLAN không qua được bài — đúng tinh thần bài học, đừng bỏ mục tiêu blocked đó đi.
- **module-5** — Cung điện ký ức được làm tới nơi: 15 port được dạy theo tầng, mỗi phòng một hình kỳ quặc riêng, rồi CHÍNH những phòng ấy được bắt đi lại từ trí nhớ ở cuối mỗi bài và một lần nữa trong đề thi — không con số nào được dạy mà không bị hỏi lại.
- **module-6** — Bài DORA không dừng ở chỗ thuộc bốn chữ: nó dạy hẳn LÝ DO nhịp Request phải nói to cho cả mạng nghe rồi kiểm lại đúng lý do đó bằng câu vì-sao trong đề thi (m6-mt-7) và câu tự giải thích — cộng với nearMiss ở m6-b1-pra-1 bắt đúng cái nhầm phổ biến nhất (gõ \"TLD\" thay vì \"gốc\") và trả lời riêng cho nó, đây là hai chỗ nên giữ nguyên không đụng vào.
- **module-7** — Phòng lab bài 4 khai thẳng trong đề rằng nó KHÔNG mô phỏng NAT và chỉ ngược về bài 1, thay vì để người học hoang mang khi thấy địa chỉ riêng 192.168.1.x đi thẳng tới máy chủ ngoài — kiểu nói thật về giới hạn của mô phỏng này rất hiếm, đừng gỡ đi.
- **module-8** — Module này làm rất tốt việc bắc cầu giữa hai hệ địa chỉ: các cặp câu "đổi hệ quy chiếu" (m8-b4-pra-2 và m8-mt-5 hỏi IPv4 riêng phải qua NAT, rồi m8-b5-pra-2 và m8-mt-6 hỏi ngay IPv6 công cộng đi thẳng) buộc người học nhận ra "đây là chuyện của hệ nào" thay vì học vẹt từng hệ một — đừng bỏ nếp ghép đôi này khi sửa.
- **module-9** — Cung điện LSDOU bốn tầng là điểm sáng: mỗi tầng một hình và một câu chuyện gắn đúng phạm vi luật, dạy ở bài 4 rồi bắt đi lại từ trí nhớ ở cả bài lẫn đề thi — cộng với cặp chống nhầm sắc bén "một người nằm đúng MỘT OU nhưng vào được NHIỀU group".
- **module-10** — Lối dạy "SO SÁNH SONG SONG" bám rất chắc: mỗi khái niệm mây đều được móc vào đúng một khái niệm đã học (VPC ↔ VLAN + subnet, security group ↔ tường lửa stateful Module 7, site-to-site ↔ cây cầu router Module 4, Entra ID ↔ AD DS Module 9), và pool 12 câu đề thi cân bằng độ dài phương án gần như hoàn hảo (0/8 câu trắc nghiệm có đáp án là phương án dài nhất) — giữ nguyên cả hai điều này.
- **module-11** — Thiết kế năm ca bệnh là điểm mạnh nhất: mỗi ca cô lập đúng MỘT bệnh, và lời giải tầng 3 của ca sau luôn đối chiếu tường minh với ca trước ("General failure là dây MÌNH, unreachable với mạng-mình-vẫn-sống là dây ĐÍCH"; "chặn outbound chết ngay tại máy mình, chặn inbound thì gói đi được mà không có hồi âm"; "timeout là dịch vụ im lặng, Non-existent domain là dịch vụ sống mà thiếu bản ghi") — người học được dạy phân biệt theo từng cặp tương phản chứ không phải học thuộc danh sách triệu chứng.
- **module-12** — Quy tắc đặt tên Động từ - Danh từ được dạy ở bài 1 rồi được TRẢ CÔNG thật sự ở bài 3 và bài 5: hai màn Đoán thử bắt người học tự suy ra Get-ADUser và Get-Content trước khi ai dạy — biến một mẹo ghi nhớ thành công cụ sinh ra kiến thức mới, và các bài terminal chấm theo kết quả trong sổ nên mọi cách viết hợp lệ đều được công nhận.
- **module-13** — Module bắc cầu rất chắc sang các module khác — luật căn khối được nối thẳng về magic number của Module 3 ("Luật này chính là magic number của Module 3 nhìn từ phía người thiết kế"), wildcard mask được dạy kèm lý do "router đòi dạng này khi khai mạng cho định tuyến và khi viết luật lọc" đúng thứ M16/M17 sẽ cần — và các câu gõ tay về prefix chấp nhận cả ba cách viết (/27, 27, 255.255.255.224); giữ nguyên những chỗ này.
- **module-14** — Các bài tập console được chấm bằng TRẠNG THÁI mạng chứ không so chuỗi lệnh (mục tiêu là native-match, port-mode, ping tới được), nên người học sửa ở đầu nào, đi đường vòng nào cũng được công nhận — đừng đổi sang chấm theo chuỗi lệnh.
- **module-15** — Xương sống thực hành của module rất chắc: người học tự tay gây ra cơn bão rồi tự dập nó mà KHÔNG được rút dây (m15-b1-pre-lab), sau đó đóng vai máy xúc cắt sợi chính và phải chứng minh đường dự phòng có thật bằng bằng chứng cứng — Switch-3 học được MAC của PC-A ngay trên cổng vốn nằm im (m15-b4-prac-lab).
- **module-16** — Module 16 sạch nhất ở đúng lớp lỗi nguy hiểm nhất (lớp 1): tôi quét từng chữ trong đề + đáp án đúng của cả 15 câu pool đối chiếu với toàn bộ văn bản dạy, không có một khái niệm nào chỉ xuất hiện trong phòng thi — và hai thứ vay từ module trước đều được gọi tên kèm nguồn ngay trong bài dạy ("wildcard mask bạn đã học ở Module 13", "thứ Module 15 đã cho bạn xem với cây STP"); đừng phá nếp khai nguồn này.
- **module-17** — Chuỗi Hook → Đoán thử → Dạy của bài 1 là mẫu mực: pretest bắt người học tự gõ show access-lists và tự thấy bảng chỉ có ĐÚNG một dòng trong khi cả văn phòng đang tắc, nên dòng cấm vô hình được phát hiện như một mâu thuẫn phải giải, chứ không phải một sự thật được thông báo — và mọi đề console đều chấm bằng hành vi mạng (ping thông/tắc) cộng dấu vết bắt buộc tra bảng, nên người học phải làm ra bằng chứng chứ không chỉ gõ đúng chữ.
- **module-18** — Module bắc cầu rất chắc sang kiến thức cũ thay vì để hố lớp-2: mỗi khái niệm mới đều được neo bằng tên gọi cụ thể của module trước (miền quảng bá M4, bão quảng bá M15, ca máy in trùng IP M11, port 53 của cung điện M5, Test-NetConnection -Port của M12), và các câu hỏi trộn lại (m18-b3-prac-2, m18-b5-prac-2) buộc người học tự đi qua phép ghép đó TRƯỚC khi vào phòng thi.
- **module-19** — Các bài terminal của module này chấm bằng CẶP mục tiêu — một trên nhóm vai, một trên nhóm quyền — nên người đi lối tắt nhét thẳng người vào nhóm quyền sẽ thấy mục tiêu nhóm vai vẫn đỏ ngay trước mắt: cơ chế chấm đo đúng cái NẾP chứ không chỉ đo kết quả, đây là thứ đắt giá nhất của module, đừng đụng vào.
- **module-20** — Mạch đồng hồ lệch (m20-gio-lech) là chuỗi lên bậc mẫu mực của cả khóa: màn dạy đưa ca 02:09/02:14 với đồng hồ chậm 6 phút, câu Thử tay m20-b2-prac-2 hỏi ngược lại \"kết luận đứng vững khi nào\", rồi câu thi m20-mt-7 bắt tự cộng 6 phút để lật ngược nhân quả — cùng một tình huống nhưng mỗi bậc đòi thêm một việc, và mỗi bài học đều để lại một đồ nghề cho bài sau dùng (thang severity thành lưỡi dao lọc ở bài 3, câu vặn \"có mỗi đêm không\" thành baseline ở bài 5).
- **module-21** — Ba chặng nộp riêng đều được chấm bằng HÀNH VI thật trên lab/CLI chứ không phải bằng chữ, và bộ mục tiêu \"cặp thông-chặn\" ở chặng 3 chặn được cả hai kiểu giải tủ cùng lúc (rút dây đạt vế chặn, permit any any đạt vế thông) — đây là chỗ đắt nhất của module, đừng đụng vào.