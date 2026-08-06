# REVIEW NỘI DUNG — Module 1-9 (Phần A+B+C)

> Sinh tự động từ `content/modules/module-01.json`, `content/modules/module-02.json`, `content/modules/module-03.json`, `content/modules/module-04.json`, `content/modules/module-05.json`, `content/modules/module-06.json`, `content/modules/module-07.json`, `content/modules/module-08.json`, `content/modules/module-09.json` bằng `npm run content:review`.
> Đây là bản để ĐỌC DUYỆT; muốn sửa thì sửa file JSON rồi render lại.

## Mạng là gì? — Câu chuyện bưu điện `module-1`

Phần A · 5 chặng · 6 bài · 6 khái niệm

**Chặng:** Phong bì đầu tiên (m1-bai-1) → Địa chỉ và căn hộ (m1-bai-2, m1-bai-3) → Bưu tá lên đường (m1-bai-4) → Luật chơi chung (m1-bai-5) → Gửi trọn lá thư (m1-bai-6)

### Bài: Đóng gói tấm ảnh đầu tiên `m1-bai-1`

**1 · Khởi động (hook):** Bạn gửi cho Mai — cô bạn ở thành phố khác — một tấm ảnh sinh nhật. Tấm ảnh không hề đi "nguyên tấm": nó bị xé nhỏ ra rồi ráp lại ở máy Mai. Vì sao phải phiền phức vậy?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: khi tấm ảnh đi qua mạng, nó sẽ...
  - **Dạng:** trắc nghiệm · Đi nguyên tấm tới máy Mai / **Bị chia thành nhiều gói nhỏ rồi ráp lại ở máy Mai** ✓
  - **Vì sao:** Tấm ảnh được cắt thành nhiều gói tin, mỗi gói tự mang địa chỉ để đi, rồi được ráp lại ở máy nhận — bài này sẽ cho bạn thấy vì sao làm vậy lại khôn ngoan.

**3 · Khám phá (teach):**
- *[goi-tin]* Dữ liệu không đi qua mạng "nguyên khối". Tấm ảnh của bạn bị chia thành từng gói tin — như một bức thư dài được tách ra nhiều phong bì, mỗi phong bì tự mang địa chỉ, nên trạm nào cầm nó cũng biết phải chuyển tiếp đi đâu.
  - **Đào sâu hơn:** Mỗi gói tin gồm header (phần "ngoài phong bì": địa chỉ, số thứ tự) và payload (phần nội dung thật). Nhờ số thứ tự, máy Mai ráp các gói về đúng trật tự dù chúng đến lộn xộn. Còn một lý do nữa để chia nhỏ: đường truyền là của chung — gói nhỏ của bạn chen vai với gói của hàng xóm trên cùng một sợi dây, nhiều cuộc trò chuyện dùng chung một đường mà không ai phải chờ một "kiện hàng" khổng lồ chắn lối.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Muốn gửi câu "chúc mừng sinh nhật" sang máy Mai, mình bọc từng phần câu chữ lại rồi ghi thông tin chuyển phát ra NGOÀI lớp bọc — như lời chúc nằm kín bên trong, còn địa chỉ ghi ngoài bì để ai cầm cũng biết chuyển đi đâu. Nội dung ở trong, thông tin dẫn đường ở ngoài.
- **Đề:** Trong ẩn dụ bưu điện, phong bì thư tương ứng với thứ gì trong mạng?
  - **Dạng:** gõ tay · **Chấp nhận:** gói tin | packet
  - **Chủ đề gợi ý (tầng 1):** vai trò của phong bì khi gửi thư
  - **Gợi ý (tầng 2):** Thứ đó "bọc" một phần dữ liệu lại và ghi thông tin chuyển phát bên ngoài.
  - **Lời giải (tầng 3):** Phong bì tương ứng với gói tin (packet): dữ liệu được bọc lại, bên ngoài ghi thông tin để mạng biết chuyển đi đâu.
- **Đề:** Một gói tin trên đường đi bị thất lạc. Máy gửi phải làm gì?
  - **Dạng:** trắc nghiệm · Gửi lại toàn bộ tấm ảnh từ đầu / **Chỉ gửi lại đúng gói bị thất lạc** ✓ / Bỏ cuộc, báo lỗi cho người dùng
  - **Chủ đề gợi ý (tầng 1):** lợi ích của việc chia nhỏ
  - **Gợi ý (tầng 2):** Nhớ lại lý do người ta chịu khó chia nhỏ: mất một phong bì thì chỉ mất... bao nhiêu?
  - **Lời giải (tầng 3):** Chỉ cần gửi lại đúng gói thất lạc — đây chính là lý do lớn nhất để chia nhỏ: hỏng đâu vá đó, không làm lại từ đầu.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: đơn vị dữ liệu được chia nhỏ để gửi qua mạng gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** gói tin | packet
  - **Gợi ý (tầng 2):** Chính là "phong bì" trong câu chuyện bưu điện của mình.
  - **Lời giải (tầng 3):** Đó là gói tin (packet) — mỗi gói mang một phần dữ liệu kèm thông tin chuyển phát.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao dữ liệu không đi "nguyên khối" qua mạng?
  - **Nhóm ý cần chạm:** [chia nhỏ, nhiều gói, tách ra] · [gửi lại, thất lạc, hỏng đâu vá đó] · [dùng chung, chia sẻ, nhiều cuộc]
  - **Trả lời mẫu:** Chia nhỏ để nhiều cuộc trò chuyện dùng chung một đường dây, và nếu một gói thất lạc thì chỉ cần gửi lại đúng gói đó thay vì gửi lại toàn bộ.

**6 · Tổng kết:**
- Dữ liệu đi qua mạng dưới dạng gói tin, như thư bỏ trong phong bì.
- Mỗi gói tin tự mang địa chỉ — trạm nào cầm nó cũng biết nên chuyển đi đâu.
- Chia nhỏ giúp gửi lại phần thất lạc mà không phải làm lại từ đầu.
- *Úp mở bài sau:* Phong bì đã dán kín — nhưng ghi địa chỉ thế nào để thư không lạc giữa hàng tỷ máy? Bài sau mình mở chuyện địa chỉ IP.

### Bài: Ghi địa chỉ ngoài phong bì `m1-bai-2`

**1 · Khởi động (hook):** Trên Internet có hàng tỷ chiếc máy. Phong bì của bạn rời khỏi nhà và tìm đến ĐÚNG máy của Mai — không nhầm sang máy hàng xóm. Nhờ dòng chữ nào ngoài phong bì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: mỗi máy trên mạng được nhận ra nhờ...
  - **Dạng:** trắc nghiệm · Tên chủ nhân đặt cho máy / **Một dãy số định danh gọi là địa chỉ IP** ✓ / Màu vỏ máy
  - **Vì sao:** Mỗi máy mang một địa chỉ IP — dãy số định danh như địa chỉ nhà, để gói tin biết giao đến đâu giữa hàng tỷ máy.

**3 · Khám phá (teach):**
- *[dia-chi-ip]* Mỗi máy trên mạng có một địa chỉ IP, như mỗi ngôi nhà có một địa chỉ đường. Bưu tá không cần biết trong thư viết gì — chỉ cần địa chỉ ngoài phong bì là đúng, thư sẽ về đúng cửa.
  - **Đào sâu hơn:** IPv4 là dạng địa chỉ phổ biến nhất hiện nay: 4 con số 0-255 ngăn bởi dấu chấm, ví dụ 192.168.1.10. Module 3 mình sẽ mổ xẻ từng con số này.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Trong ẩn dụ bưu điện, "địa chỉ nhà" ghi ngoài phong bì tương ứng với thứ gì trong mạng?
  - **Dạng:** gõ tay · **Chấp nhận:** địa chỉ ip | ip | ip address
  - **Chủ đề gợi ý (tầng 1):** thứ giúp bưu tá biết giao thư đến đâu
  - **Gợi ý (tầng 2):** Là dãy số định danh của máy nhận — thứ mà thiếu nó thì gói tin không biết đi đâu.
  - **Lời giải (tầng 3):** Đó là địa chỉ IP: dãy số định danh máy nhận, ghi trong header gói tin như địa chỉ nhà ghi ngoài phong bì.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: dãy số định danh một máy trên mạng, ghi ngoài "phong bì" gói tin, gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** địa chỉ ip | ip | ip address
  - **Gợi ý (tầng 2):** Nó đóng vai địa chỉ nhà trong câu chuyện bưu điện.
  - **Lời giải (tầng 3):** Đó là địa chỉ IP — mỗi máy một địa chỉ, gói tin nhìn nó để tìm đường về đúng máy.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao bưu tá không cần đọc nội dung thư mà thư vẫn tới đúng nhà?
  - **Nhóm ý cần chạm:** [địa chỉ, ngoài phong bì, header] · [không cần mở, nội dung, bên trong]
  - **Trả lời mẫu:** Vì mọi thông tin cần cho việc chuyển phát — địa chỉ người nhận — nằm NGOÀI phong bì. Bưu tá chỉ đọc phần ngoài đó và giao thư; nội dung bên trong không liên quan đến đường đi.

**6 · Tổng kết:**
- Mỗi máy trên mạng mang một địa chỉ IP — như địa chỉ nhà của nó.
- Địa chỉ nằm ngoài "phong bì" (header) để mạng đọc mà không cần mở nội dung.
- Nhờ địa chỉ IP, gói tin tìm đúng một máy giữa hàng tỷ máy.
- *Úp mở bài sau:* Thư đã về đúng nhà. Nhưng "nhà" của Mai là một chung cư mấy chục ứng dụng cùng ở — làm sao thư gõ đúng cửa căn hộ? Bài sau: số port.

### Bài: Gõ đúng cửa căn hộ `m1-bai-3`

**1 · Khởi động (hook):** Máy Mai vừa mở trình duyệt, vừa nghe nhạc, vừa chat — cùng MỘT địa chỉ IP. Tấm ảnh của bạn đến nơi... sao nó không giao nhầm vào ứng dụng nghe nhạc?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: hai ứng dụng chạy trên cùng một máy được phân biệt nhờ...
  - **Dạng:** trắc nghiệm · Địa chỉ IP khác nhau / **Số port khác nhau** ✓
  - **Vì sao:** Cả máy chỉ có một địa chỉ IP, nhưng mỗi ứng dụng lắng nghe trên một số port riêng — nhờ đó dữ liệu không giao nhầm cửa.

**3 · Khám phá (teach):**
- *[port]* Một máy chạy nhiều ứng dụng cùng lúc, nên chỉ địa chỉ IP là chưa đủ — cần thêm số port, như số căn hộ trong một chung cư đông hộ: đúng tòa nhà rồi vẫn phải gõ đúng cửa.
  - **Đào sâu hơn:** Port là số từ 0 đến 65535. Web thường dùng 443 (HTTPS) và 80 (HTTP); mỗi kết nối được định danh bằng cặp IP:port ở cả hai đầu. Phần B của khóa học có hẳn một "tòa nhà 15 phòng" để bạn thuộc các port thông dụng.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Trong ẩn dụ chung cư, số căn hộ tương ứng với thứ gì trong mạng?
  - **Dạng:** gõ tay · **Chấp nhận:** port | cổng | số port
  - **Chủ đề gợi ý (tầng 1):** cách phân biệt các ứng dụng trên cùng một máy
  - **Gợi ý (tầng 2):** Đúng tòa nhà (địa chỉ IP) rồi vẫn cần một con số nữa để tới đúng cửa.
  - **Lời giải (tầng 3):** Số căn hộ tương ứng với port: địa chỉ IP đưa gói tin tới đúng máy, port đưa nó tới đúng ứng dụng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: con số giúp gói tin tìm đúng ỨNG DỤNG trên một máy gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** port | cổng | số port | số cổng
  - **Gợi ý (tầng 2):** Nó giống số căn hộ trong một chung cư.
  - **Lời giải (tầng 3):** Đó là port — mỗi ứng dụng lắng nghe trên một số port riêng.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao có địa chỉ IP rồi vẫn cần port?
  - **Nhóm ý cần chạm:** [nhiều ứng dụng, cùng một máy, cùng máy] · [phân biệt, đúng ứng dụng, đúng cửa]
  - **Trả lời mẫu:** Một máy chạy nhiều ứng dụng cùng lúc; địa chỉ IP chỉ đưa dữ liệu tới đúng máy, còn port phân biệt dữ liệu đó thuộc ứng dụng nào — như địa chỉ đưa thư tới đúng chung cư, số căn hộ đưa tới đúng cửa.

**6 · Tổng kết:**
- Địa chỉ IP đưa gói tin tới đúng máy, port đưa nó tới đúng ứng dụng.
- Port như số căn hộ trong một chung cư nhiều hộ.
- Mỗi kết nối được nhận diện bằng cặp IP và port ở hai đầu.
- *Úp mở bài sau:* Địa chỉ đủ cả số nhà lẫn căn hộ rồi — giờ ai là người thật sự cầm phong bì băng qua thành phố? Bài sau mình theo chân "bưu tá" router.

### Bài: Theo chân bưu tá giao phong bì `m1-bai-4`

**1 · Khởi động (hook):** Gói tin từ nhà bạn tới máy Mai ở thành phố khác đi qua cả chục "trạm" trung gian — ai đứng ở mỗi trạm quyết định rẽ trái hay rẽ phải?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: thiết bị chuyển gói tin từ mạng này sang mạng khác là...
  - **Dạng:** trắc nghiệm · Màn hình / **Router** ✓ / Bàn phím
  - **Vì sao:** Router là thiết bị đứng giữa các mạng: đọc địa chỉ đích của gói tin rồi quyết định chặng kế tiếp — như bưu tá đọc phong bì.

**3 · Khám phá (teach):**
- *[router]* Router là bưu tá của mạng: nhận gói tin, đọc địa chỉ IP đích ngoài "phong bì", rồi chuyển nó sang chặng kế tiếp gần đích hơn. Mỗi bưu tá chỉ cần biết chặng kế tiếp — không ai cần thuộc cả con đường.
  - **Đào sâu hơn:** Router giữ bảng định tuyến (routing table) — như sổ tay các tuyến đường của bưu tá, được cập nhật khi đường sá thay đổi. Nhờ vậy nếu một tuyến nghẽn, gói tin có thể đi vòng đường khác.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Trong ẩn dụ bưu điện, bưu tá tương ứng với thiết bị nào trong mạng?
  - **Dạng:** gõ tay · **Chấp nhận:** router | bộ định tuyến
  - **Chủ đề gợi ý (tầng 1):** ai đọc địa chỉ trên phong bì và chọn đường đi
  - **Gợi ý (tầng 2):** Thiết bị này đọc địa chỉ IP đích rồi quyết định chặng kế tiếp.
  - **Lời giải (tầng 3):** Bưu tá tương ứng với router: nó đọc địa chỉ IP đích trên gói tin và chuyển gói sang chặng gần đích hơn.
- **Đề:** Một router trên đường đi cần biết những gì để làm việc?
  - **Dạng:** trắc nghiệm · Toàn bộ con đường từ máy gửi đến máy nhận / **Chỉ chặng kế tiếp gần đích hơn** ✓ / Nội dung bên trong gói tin
  - **Chủ đề gợi ý (tầng 1):** bưu tá có cần thuộc cả nước không
  - **Gợi ý (tầng 2):** Bưu tá quận này chỉ cần đưa thư sang quận gần hơn — người tiếp theo lo phần còn lại.
  - **Lời giải (tầng 3):** Mỗi router chỉ cần biết chặng kế tiếp. Chính vì thế mạng chịu lỗi rất giỏi: một trạm hỏng, các trạm khác tự tìm đường vòng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: thiết bị đọc địa chỉ IP đích và chọn chặng kế tiếp cho gói tin gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** router | bộ định tuyến
  - **Gợi ý (tầng 2):** Chính là "bưu tá" trong câu chuyện gửi thư.
  - **Lời giải (tầng 3):** Đó là router (bộ định tuyến) — mỗi router đưa gói tin gần đích thêm một chặng.
- **Tự giải thích:** Giải thích bằng lời của bạn: router làm gì khi nhận được một gói tin?
  - **Nhóm ý cần chạm:** [địa chỉ, ip, đích] · [chuyển tiếp, chặng, gần đích]
  - **Trả lời mẫu:** Router đọc địa chỉ IP đích trên gói tin, tra "sổ tay đường đi" của nó rồi chuyển gói sang chặng kế tiếp gần đích hơn — như bưu tá đọc phong bì rồi đưa thư về đúng tuyến.

**6 · Tổng kết:**
- Router là bưu tá: đọc địa chỉ đích rồi chuyển gói tin đi tiếp.
- Một gói tin thường qua nhiều router trước khi tới nơi.
- Mỗi router chỉ cần biết chặng kế tiếp — nên mạng hỏng một trạm vẫn chạy.
- *Úp mở bài sau:* Địa chỉ chuẩn, bưu tá giỏi — nhưng nếu bạn viết thư bằng tiếng Việt mà Mai chỉ đọc được tiếng Pháp thì sao? Bài sau: luật chơi chung giữa hai máy.

### Bài: Thống nhất luật chơi giữa hai máy `m1-bai-5`

**1 · Khởi động (hook):** Bạn biết địa chỉ Mai, bưu tá giao thư chuẩn từng nhà — nhưng thư viết bằng thứ tiếng Mai không đọc nổi thì vẫn vô dụng. Máy tính tránh chuyện này thế nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: bộ quy tắc chung để hai máy hiểu được nhau gọi là...
  - **Dạng:** trắc nghiệm · Mật khẩu / **Giao thức** ✓ / Địa chỉ IP
  - **Vì sao:** Bộ quy tắc chung đó gọi là giao thức — thư tới đúng địa chỉ nhưng sai quy ước thì bên nhận vẫn không đọc nổi.

**3 · Khám phá (teach):**
- *[giao-thuc]* Hai máy muốn hiểu nhau phải theo cùng một bộ quy tắc gọi là giao thức (protocol) — như hai người viết thư phải cùng ngôn ngữ, cùng quy ước trình bày thì mới đọc được thư của nhau.
  - **Đào sâu hơn:** Mỗi việc có giao thức riêng, xếp chồng lên nhau: HTTP lo nội dung web, TCP lo gửi đủ và đúng thứ tự, IP lo địa chỉ và đường đi. Một lần bạn mở trang web là cả chồng giao thức cùng làm việc.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Bộ quy tắc chung mà hai máy phải cùng tuân theo để hiểu nhau gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** giao thức | protocol
  - **Chủ đề gợi ý (tầng 1):** quy ước chung khi hai bên trao đổi
  - **Gợi ý (tầng 2):** Giống quy ước viết thư: cùng ngôn ngữ, cùng cách trình bày.
  - **Lời giải (tầng 3):** Đó là giao thức (protocol): tập quy tắc thống nhất về cách đóng gói, gửi và diễn giải dữ liệu.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: HTTP, TCP, IP được gọi chung là các...
  - **Dạng:** gõ tay · **Chấp nhận:** giao thức | protocol
  - **Gợi ý (tầng 2):** Là "luật chơi chung" giữa các máy.
  - **Lời giải (tầng 3):** Chúng là các giao thức — mỗi giao thức phụ trách một việc trên đường đi của dữ liệu.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao hai máy phải dùng chung giao thức mới trao đổi được?
  - **Nhóm ý cần chạm:** [quy tắc, quy ước, luật chung] · [hiểu, diễn giải, đọc được]
  - **Trả lời mẫu:** Không có quy tắc chung thì bên nhận không biết cách diễn giải dãy tín hiệu 0-1 (bit) nhận được — như nhận lá thư viết bằng thứ tiếng mình không đọc nổi. Giao thức là quy ước chung giúp hai bên hiểu nhau.

**6 · Tổng kết:**
- Giao thức là luật chơi chung để hai máy hiểu nhau.
- Thư tới đúng địa chỉ nhưng sai quy ước thì vẫn vô dụng.
- Các giao thức xếp chồng: HTTP lo nội dung, TCP lo đủ và đúng thứ tự, IP lo đường đi.
- *Úp mở bài sau:* Bạn đã có đủ bộ tứ: phong bì, địa chỉ, bưu tá, luật chơi. Bài cuối: ghép tất cả lại — tiễn một lá thư đi trọn hành trình từ máy bạn đến máy Mai.

### Bài: Tiễn lá thư đi trọn hành trình `m1-bai-6`

**1 · Khởi động (hook):** Đã đến lúc gửi thật tấm ảnh sinh nhật. Nhắm mắt hình dung thử: từ cú bấm "Gửi" của bạn đến tiếng "ting" trên máy Mai, chuyện gì xảy ra theo thứ tự nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: việc ĐẦU TIÊN máy bạn làm khi bấm "Gửi" tấm ảnh là...
  - **Dạng:** trắc nghiệm · **Chia tấm ảnh thành các gói tin và ghi địa chỉ** ✓ / Gửi nguyên tấm ảnh cho router / Gửi nguyên tấm ảnh không chia, vì ảnh nhỏ thì khỏi cần đóng gói
  - **Vì sao:** Bước đầu tiên luôn là đóng gói: chia dữ liệu thành các gói tin, mỗi gói ghi địa chỉ IP máy nhận — có phong bì đúng địa chỉ rồi mới nói đến chuyện lên đường.

**3 · Khám phá (teach):**
- *[hanh-trinh-goi-tin]* Ghép cả câu chuyện lại: máy bạn CHIA ảnh vào các gói tin và ghi địa chỉ IP của Mai — các gói rời nhà, được các ROUTER chuyền tay nhau, mỗi trạm một chặng gần hơn — đến máy Mai, PORT đưa chúng vào đúng ứng dụng — và nhờ cùng GIAO THỨC, máy Mai ráp lại thành đúng tấm ảnh.
  - **Đào sâu hơn:** Các gói có thể đi những con đường khác nhau và đến lộn xộn — số thứ tự trong header giúp máy nhận ráp về đúng trật tự. Đó là lý do mạng vừa nhanh vừa bền: không có con đường nào là duy nhất.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Sắp xếp hành trình tấm ảnh từ máy bạn đến máy Mai theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Máy bạn chia tấm ảnh vào các gói tin, ghi địa chỉ IP của máy Mai
    2. Các gói tin rời máy bạn, đến router đầu tiên
    3. Các router lần lượt chuyển gói tin về gần máy Mai
    4. Máy Mai nhận các gói, port đưa vào đúng ứng dụng, ráp lại thành tấm ảnh
  - **Chủ đề gợi ý (tầng 1):** trình tự đóng gói — lên đường — chuyển tiếp — ráp lại
  - **Gợi ý (tầng 2):** Chưa đóng gói thì chưa có gì để gửi — vậy bắt đầu từ đâu?
  - **Lời giải (tầng 3):** Đóng gói và ghi địa chỉ → rời máy đến router đầu tiên → các router chuyền dần về gần đích → máy nhận ráp lại và giao cho đúng ứng dụng qua port.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: trên máy NHẬN, thứ gì đưa dữ liệu vào đúng ứng dụng đang chờ nó?
  - **Dạng:** gõ tay · **Chấp nhận:** port | cổng | số port | số cổng
  - **Gợi ý (tầng 2):** Đến đúng chung cư rồi — còn phải gõ đúng cửa.
  - **Lời giải (tầng 3):** Là port: địa chỉ IP đưa gói tin tới đúng máy, port đưa nó vào đúng ứng dụng.
- **Tự giải thích:** Bài tốt nghiệp của module: KỂ LẠI bằng lời của bạn — như kể cho đứa em — hành trình tấm ảnh đi từ máy bạn đến máy Mai.
  - **Nhóm ý cần chạm:** [gói tin, chia nhỏ, đóng gói] · [địa chỉ, ip] · [router, bưu tá, chuyển tiếp] · [ráp lại, port, đúng ứng dụng]
  - **Trả lời mẫu:** Máy mình chia tấm ảnh thành nhiều gói tin, mỗi gói ghi địa chỉ IP của máy Mai. Các gói rời nhà, được các router — như bưu tá — chuyền tay nhau, mỗi trạm một chặng gần hơn. Đến máy Mai, số port đưa chúng vào đúng ứng dụng, và các gói được ráp lại thành đúng tấm ảnh ban đầu.

**6 · Tổng kết:**
- Một lần gửi = đóng gói, ghi địa chỉ, bưu tá chuyền tay, ráp lại ở đích.
- Bạn vừa kể lại được cả hành trình bằng lời của mình — đó là thứ ở lại lâu nhất.
- Bốn nhân vật chính: gói tin, địa chỉ IP, router, giao thức — sẽ theo bạn suốt khóa học.
- *Úp mở bài sau:* Bài kiểm tra module đang chờ ngay bên ngoài — qua được là mở Module 2: theo chân một cú gõ "google.com" xuyên qua cả thành phố Internet.

### Khái niệm & flashcard (6)

- **Packet** `goi-tin` — Gói tin — đơn vị dữ liệu nhỏ được gửi qua mạng
  - Ẩn dụ: Gói tin như phong bì thư: bên trong là nội dung, bên ngoài ghi thông tin chuyển phát.
  - Thẻ ôn: *Gói tin (packet) là gì?* → Đơn vị dữ liệu nhỏ được gửi qua mạng — như một phong bì thư mang một phần nội dung kèm địa chỉ.
- **IP address** `dia-chi-ip` — Địa chỉ IP — dãy số định danh một máy trên mạng
  - Ẩn dụ: Địa chỉ IP như địa chỉ nhà: bưu tá chỉ cần nhìn nó để biết giao thư đến đâu.
  - Thẻ ôn: *Địa chỉ IP dùng để làm gì?* → Định danh một máy trên mạng để gói tin tìm đến đúng nơi — như địa chỉ nhà ghi trên phong bì.
- **Port** `port` — Cổng — con số phân biệt các ứng dụng trên cùng một máy
  - Ẩn dụ: Port như số căn hộ trong chung cư: đúng tòa nhà rồi vẫn phải gõ đúng cửa.
  - Thẻ ôn: *Port dùng để làm gì?* → Phân biệt các ứng dụng trên cùng một máy — IP tìm đúng máy, port tìm đúng ứng dụng.
- **Router** `router` — Bộ định tuyến — thiết bị chuyển gói tin giữa các mạng
  - Ẩn dụ: Router như bưu tá: đọc địa chỉ trên phong bì rồi chọn chặng tiếp theo cho lá thư.
  - Thẻ ôn: *Router làm nhiệm vụ gì?* → Đọc địa chỉ IP đích của gói tin và chuyển nó sang chặng kế tiếp gần đích hơn.
- **Protocol** `giao-thuc` — Giao thức — bộ quy tắc chung để hai máy hiểu nhau
  - Ẩn dụ: Giao thức như quy ước viết thư: cùng ngôn ngữ, cùng cách trình bày thì mới đọc được thư của nhau.
  - Thẻ ôn: *Giao thức (protocol) là gì?* → Bộ quy tắc chung mà hai máy cùng tuân theo để đóng gói, gửi và diễn giải dữ liệu.
- **Hành trình gói tin** `hanh-trinh-goi-tin` — Đường đi trọn vẹn của dữ liệu từ máy gửi đến máy nhận
  - Ẩn dụ: Một lần gửi thư trọn vẹn: đóng phong bì, ghi địa chỉ, bưu tá chuyền tay, người nhận mở đúng căn hộ.
  - Thẻ ôn: *Kể ngắn gọn hành trình một tin nhắn từ máy A đến máy B?* → Chia thành gói tin ghi địa chỉ IP → các router chuyền tay nhau → máy nhận ráp lại, port đưa vào đúng ứng dụng.

### Bài kiểm tra module (7 câu, cần ≥ 85%)

- **Đề:** Bạn vào Wi-Fi quán cà phê. Quán cấp cho máy bạn một dãy số định danh để dữ liệu tìm về đúng máy giữa hàng chục khách — dãy số đó gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** địa chỉ ip | ip | ip address | ipv4 | địa chỉ ipv4
  - **Vì sao:** Địa chỉ IP định danh máy bạn trên mạng — như địa chỉ nhà ghi ngoài phong bì để dữ liệu biết giao về đâu.
- **Đề:** Một file 10MB rời máy bạn dưới dạng hàng nghìn mảnh nhỏ, mỗi mảnh tự mang địa chỉ. Mỗi mảnh như vậy gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** gói tin | packet
  - **Vì sao:** Gói tin (packet): dữ liệu được chia nhỏ, mỗi gói mang một phần nội dung kèm thông tin chuyển phát.
- **Đề:** Gói tin của bạn đang dừng ở một trạm giữa đường. Thiết bị tại trạm đọc địa chỉ đích rồi đẩy nó sang chặng kế tiếp — thiết bị đó gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** router | bộ định tuyến
  - **Vì sao:** Router đọc địa chỉ IP đích trên gói tin rồi chuyển nó sang chặng kế tiếp gần đích hơn — như bưu tá đọc phong bì.
- **Đề:** Máy Mai mở 3 ứng dụng cùng lúc. Tấm ảnh về đến máy — con số nào đưa nó vào đúng ứng dụng chat thay vì trình duyệt?
  - **Dạng:** gõ tay · **Chấp nhận:** port | cổng | số port | số cổng
  - **Vì sao:** IP đưa gói tin tới đúng máy, port đưa nó tới đúng ứng dụng — như số căn hộ trong một chung cư.
- **Đề:** Lần này Mai gửi ảnh đáp lễ cho BẠN. Sắp xếp hành trình tấm ảnh từ máy Mai về máy bạn.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Máy Mai chia tấm ảnh vào các gói tin, ghi địa chỉ IP máy bạn
    2. Gói tin rời máy Mai, đến router đầu tiên
    3. Các router lần lượt chuyển gói tin về gần máy bạn
    4. Máy bạn nhận đủ các gói và ráp lại thành tấm ảnh
  - **Vì sao:** Chiều nào cũng cùng một kịch bản: chia gói → rời máy gửi → qua từng router gần đích dần → máy nhận ráp lại.
- **Đề:** Máy bạn gửi yêu cầu theo đúng khuôn HTTP, server đáp lại đúng khuôn ấy — hai bên hiểu nhau nhờ cùng tuân theo thứ gì?
  - **Dạng:** gõ tay · **Chấp nhận:** giao thức | protocol
  - **Vì sao:** Giao thức là luật chơi chung: cùng quy ước đóng gói và diễn giải thì hai máy mới đọc hiểu dữ liệu của nhau.
- **Đề:** Một gói tin bị thất lạc giữa đường. Nhờ đâu máy gửi KHÔNG phải gửi lại toàn bộ dữ liệu?
  - **Dạng:** trắc nghiệm · **Vì dữ liệu đã được chia thành nhiều gói — chỉ cần gửi lại gói mất** ✓ / Vì router giữ một bản sao của mọi thứ / Vì máy nhận tự đoán được phần thiếu
  - **Vì sao:** Chia nhỏ là để hỏng đâu vá đó: mất gói nào gửi lại đúng gói ấy, các gói còn lại không phải đi lần hai.

## Đường đi của gói tin — Gõ google.com, chuyện gì xảy ra? `module-2`

Phần A · 4 chặng · 4 bài · 5 khái niệm

**Chặng:** Hỏi đường trước đã (m2-bai-1) → Cánh cổng ra thế giới (m2-bai-2) → Băng qua thành phố (m2-bai-3) → Chuyến về và tấm bản đồ (m2-bai-4)

### Bài: Tra danh bạ của Internet `m2-bai-1`

**1 · Khởi động (hook):** Bạn gõ google.com và bấm Enter. Nhưng google.com không phải là một địa chỉ — nó chỉ là cái TÊN, như "quán phở chú Ba" chứ không phải số nhà. Vậy máy bạn gọi cho ai để xin "số nhà" thật của Google trước khi lên đường?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: máy bạn tìm đến server của Google nhờ...
  - **Dạng:** trắc nghiệm · Cái tên google.com — máy đọc tên y như người đọc / **Một dãy số địa chỉ IP — cái tên phải được đổi thành số trước đã** ✓ / Không cần gì cả — bấm Enter là trình duyệt tự biết đường
  - **Vì sao:** Máy tính chỉ hiểu địa chỉ IP dạng số. google.com là tên đặt cho người dễ nhớ — trước khi đi, máy bạn phải "tra danh bạ" để đổi tên đó thành dãy số thật.

**3 · Khám phá (teach):**
- *[dns]* google.com là TÊN dành cho người; máy chỉ hiểu SỐ — tức địa chỉ IP bạn đã gặp ở Module 1. Đứng giữa hai thế giới đó là DNS: cuốn danh bạ của Internet, như tổng đài 1080 ngày trước — thời chưa có smartphone, muốn biết số của ai thì gọi tổng đài, đưa cái tên, tổng đài đọc hộ con số. Máy bạn hỏi "google.com ở đâu?", DNS trả về địa chỉ IP của server Google.
  - **Đào sâu hơn:** Cuốn danh bạ này không nằm ở một chỗ — nó là cả một hệ thống phân cấp gồm nhiều tầng máy chủ trên khắp thế giới. Module 6 mình sẽ mở hẳn nó ra xem ai hỏi ai, theo thứ tự nào.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Bạn gõ youtube.com. Bước 1 — máy bạn hỏi DNS: "youtube.com nằm ở địa chỉ IP nào?". Bước 2 — DNS tra danh bạ, trả về một dãy số, ví dụ 142.250.199.78. Bước 3 — máy bạn ghi dãy số đó làm địa chỉ ĐÍCH lên các gói tin sắp gửi. Tên chỉ dùng để hỏi đường; lên đường thì đi bằng số.
- **Đề:** Bạn gõ vnexpress.net. Trước khi gửi được gói tin nào tới server của trang đó, máy bạn phải hỏi hệ thống nào để lấy địa chỉ IP?
  - **Dạng:** gõ tay · **Chấp nhận:** dns | domain name system
  - **Chủ đề gợi ý (tầng 1):** cuốn danh bạ đổi tên thành số
  - **Gợi ý (tầng 2):** Hệ thống này nhận vào cái TÊN trang web và trả lại dãy SỐ — giống tổng đài 1080 tra hộ số điện thoại.
  - **Lời giải (tầng 3):** Đó là DNS — danh bạ của Internet: máy bạn đưa tên vnexpress.net, DNS trả về địa chỉ IP của server, rồi máy mới đóng gói và lên đường.
- **Đề:** Máy bạn đưa cho DNS cái tên google.com. DNS đưa lại thứ gì?
  - **Dạng:** trắc nghiệm · Nội dung trang chủ Google / **Địa chỉ IP của server Google** ✓ / Danh sách từng router phải đi qua
  - **Chủ đề gợi ý (tầng 1):** danh bạ cho bạn thứ gì khi bạn đưa cái tên
  - **Gợi ý (tầng 2):** Tổng đài 1080 không đọc hộ bạn cả cuộc trò chuyện — nó chỉ cho bạn đúng một thứ để tự gọi.
  - **Lời giải (tầng 3):** DNS chỉ trả về địa chỉ IP của server. Lấy nội dung trang là việc của chuyến đi sau đó; còn đường đi qua router nào thì các "bưu tá" tự quyết trên từng chặng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: hệ thống "danh bạ" đổi tên miền thành địa chỉ IP gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** dns | domain name system
  - **Gợi ý (tầng 2):** Chính là "tổng đài 1080" của Internet trong bài mình vừa học.
  - **Lời giải (tầng 3):** Đó là DNS — đưa tên miền, nhận về địa chỉ IP. Mọi chuyến đi trên web đều mở màn bằng một câu hỏi gửi cho nó.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao máy bạn phải hỏi DNS trước, rồi mới kết nối được tới google.com?
  - **Nhóm ý cần chạm:** [tên miền, cái tên, chỉ là tên] · [địa chỉ ip, dãy số, hiểu số] · [danh bạ, tra cứu, tra tên]
  - **Trả lời mẫu:** Vì google.com chỉ là cái tên cho người dễ nhớ, còn máy tính chỉ hiểu địa chỉ IP dạng số. Máy mình phải hỏi DNS — cuốn danh bạ của Internet — để đổi tên đó thành địa chỉ IP thật, rồi mới ghi địa chỉ lên gói tin và lên đường được.

**6 · Tổng kết:**
- google.com là tên cho người; máy chỉ hiểu địa chỉ IP dạng số.
- DNS là danh bạ của Internet: đưa cái tên, nhận về địa chỉ IP.
- Mọi chuyến đi trên web đều mở màn bằng một câu hỏi tra danh bạ.
- *Úp mở bài sau:* Địa chỉ đã cầm trong tay — nhưng gói tin vẫn đứng trong "ngôi làng" mạng nhà bạn. Cả làng chỉ có đúng một lối thông ra thế giới. Bài sau: cánh cổng đó ở đâu?

### Bài: Bước qua cổng làng `m2-bai-2`

**1 · Khởi động (hook):** Gói tin đã ghi sẵn địa chỉ IP của Google — nhưng nó đang đứng trong mạng nhà bạn, một "ngôi làng" bé xíu có vài chiếc máy quen mặt. Google thì ở tận đâu đâu ngoài kia. Làng này có bao nhiêu lối ra, và lối đó nằm ở đâu?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: mạng nhà bạn có bao nhiêu lối ra Internet?
  - **Dạng:** trắc nghiệm · Mỗi thiết bị tự mở một lối ra riêng của nó / **Đúng một lối duy nhất — mọi gói tin muốn ra ngoài đều phải qua đó** ✓ / Không cần lối nào — gói tin "bay" thẳng lên Internet
  - **Vì sao:** Cả mạng nhà chỉ có một cánh cổng ra thế giới: default gateway. Điện thoại, laptop, TV — gói tin của máy nào muốn ra Internet cũng phải xếp hàng qua đúng cổng đó.

**3 · Khám phá (teach):**
- *[gateway]* Mạng nhà bạn là một ngôi làng nhỏ: vài chiếc máy nói chuyện với nhau thoải mái mà không cần ra đường lớn. Nhưng muốn gửi gì ra thế giới, MỌI gói tin đều phải đi qua đúng một cánh cổng làng — gọi là default gateway (cổng mặc định). Cánh cổng đó chính là chiếc router nhà bạn: "bưu tá" đầu tiên nhận gói tin và đưa nó ra đường lớn.
  - **Đào sâu hơn:** Máy bạn được "phát" sẵn địa chỉ của cổng khi vừa vào mạng. Mở Command Prompt gõ ipconfig, bạn sẽ thấy dòng Default Gateway — thường là 192.168.1.1 — chính là router đang đặt ở góc nhà bạn.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Điền nốt giúp mình: "Trong làng gửi cho nhau thì khỏi cần, nhưng gói tin muốn RA Internet thì bắt buộc phải qua ___ — lối ra duy nhất của mạng nhà."
  - **Dạng:** gõ tay · **Chấp nhận:** gateway | default gateway | cổng mặc định
  - **Chủ đề gợi ý (tầng 1):** cánh cổng duy nhất của ngôi làng
  - **Gợi ý (tầng 2):** Tên tiếng Anh của nó có chữ "gate" — đúng nghĩa một cánh cổng. Ở nhà bạn, nó chính là cục phát Wi-Fi.
  - **Lời giải (tầng 3):** Đó là default gateway (cổng mặc định): điểm ra duy nhất của mạng nhà, chính là chiếc router nhà bạn — mọi gói tin ra Internet đều phải qua nó.
- **Đề:** Ở nhà bạn, thiết bị nào đang đứng làm default gateway?
  - **Dạng:** trắc nghiệm · Chiếc máy tính mạnh nhất trong nhà / **Chiếc router (cục phát Wi-Fi) nhà bạn** ✓ / Server của Google
  - **Chủ đề gợi ý (tầng 1):** ai đứng ngay ranh giới giữa mạng nhà và Internet
  - **Gợi ý (tầng 2):** Là thiết bị đứng ngay ranh giới: một chân trong nhà, một chân nối ra Internet — Module 1 bạn từng gặp nó trong vai "bưu tá".
  - **Lời giải (tầng 3):** Chính là chiếc router nhà bạn. Nó đứng giữa hai thế giới: nhận gói tin từ các máy trong nhà rồi đưa ra Internet — vừa là bưu tá đầu tiên, vừa là cánh cổng làng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: điểm ra DUY NHẤT mà mọi gói tin phải đi qua để rời mạng nhà gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** gateway | default gateway | cổng mặc định
  - **Gợi ý (tầng 2):** Là "cổng làng" trong câu chuyện của mình — ở nhà bạn nó là cục phát Wi-Fi.
  - **Lời giải (tầng 3):** Đó là default gateway (cổng mặc định) — chiếc router nhà bạn, cánh cổng duy nhất giữa mạng nhà và Internet.
- **Tự giải thích:** Giải thích bằng lời của bạn: gói tin gửi cho máy CÙNG NHÀ và gói tin gửi cho google.com khác nhau chỗ nào trên đường đi?
  - **Nhóm ý cần chạm:** [trong nhà, cùng làng, cùng mạng] · [gateway, cổng làng, cổng mặc định] · [router nhà, ra internet, ra ngoài]
  - **Trả lời mẫu:** Gói tin gửi cho máy cùng nhà thì đi thẳng trong mạng nội bộ, không cần ra đường lớn. Còn gói tin gửi cho google.com phải ra Internet, nên bắt buộc đi qua default gateway — chiếc router nhà mình, cánh cổng duy nhất nối làng với thế giới.

**6 · Tổng kết:**
- Mạng nhà bạn là một ngôi làng nhỏ — các máy trong làng nói chuyện thẳng với nhau.
- Muốn ra Internet, mọi gói tin đều phải qua đúng một cổng: default gateway.
- Cánh cổng đó chính là chiếc router nhà bạn — bưu tá đầu tiên của hành trình.
- *Úp mở bài sau:* Qua cổng rồi — trước mặt là cả "thành phố" Internet trải rộng khắp hành tinh. Ai sẽ chuyền gói tin của bạn qua đó, và đích đến trông ra sao? Bài sau mình băng qua thành phố.

### Bài: Chuyền tay qua các trạm `m2-bai-3`

**1 · Khởi động (hook):** Gói tin vừa lọt qua cổng làng — trước mặt là thành phố Internet mênh mông. Đích đến của nó không phải nhà ai đó, mà là một tòa nhà không bao giờ tắt đèn, nơi hàng triệu lá thư đổ về mỗi giây. Tòa nhà đó là gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: trang google.com thật ra đang "sống" ở đâu?
  - **Dạng:** trắc nghiệm · Trên máy tính cá nhân của một nhân viên Google, bật trong giờ làm / **Trên các server luôn bật, đứng chờ yêu cầu từ khắp thế giới** ✓ / Không ở máy nào cả — trang web trôi "trên mây", chẳng cần máy móc
  - **Vì sao:** Mọi trang web đều nằm trên server — những cỗ máy luôn bật, sinh ra để chờ và phục vụ yêu cầu. "Trên mây" nghe bay bổng vậy thôi, phía sau vẫn là các tòa nhà chứa đầy server.

**3 · Khám phá (teach):**
- *[server]* Đích đến của gói tin là server — máy chủ. Khác hẳn máy cá nhân của bạn (lúc bật lúc tắt, phục vụ mỗi mình bạn), server như tòa nhà dịch vụ giữa trung tâm: mở cửa 24/7, chỉ để ĐỨNG CHỜ yêu cầu và phục vụ hàng triệu người cùng lúc. Còn đường tới đó? Bạn biết rồi đấy — các router liên tỉnh chuyền tay nhau, đúng kiểu bưu tá ở Module 1: mỗi trạm một chặng gần đích hơn.
  - **Đào sâu hơn:** Muốn tận mắt đếm các trạm giữa đường? Gõ tracert google.com trong Command Prompt — từng dòng hiện ra là một router mà gói tin của bạn đã ghé qua. Module 11 mình sẽ dùng chính lệnh này để bắt bệnh mạng.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Cỗ máy luôn bật, đứng chờ yêu cầu để phục vụ hàng triệu người cùng lúc — nơi các trang web thật sự "sống" — gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** server | máy chủ
  - **Chủ đề gợi ý (tầng 1):** tòa nhà dịch vụ không bao giờ đóng cửa
  - **Gợi ý (tầng 2):** Trái ngược với máy cá nhân "lúc bật lúc tắt" của bạn — máy này sinh ra để phục vụ, tên tiếng Anh nghĩa là "người phục vụ".
  - **Lời giải (tầng 3):** Đó là server (máy chủ): luôn bật, luôn lắng nghe, chuyên phục vụ yêu cầu từ máy khác — như tòa nhà dịch vụ mở cửa 24/7.
- **Đề:** Trên quãng đường từ cổng làng tới server, gói tin của bạn được đưa đi bằng cách nào?
  - **Dạng:** trắc nghiệm · Một router duy nhất thuộc lòng cả con đường và đi trọn chuyến / **Nhiều router chuyền tay nhau, mỗi trạm đưa gói một chặng gần đích hơn** ✓ / DNS cầm gói tin đi giao tận nơi, vì nó biết địa chỉ
  - **Chủ đề gợi ý (tầng 1):** cách các bưu tá làm việc mà bạn học ở Module 1
  - **Gợi ý (tầng 2):** Nhớ luật của các bưu tá: không ai thuộc cả con đường — mỗi người chỉ lo đưa thư sang trạm gần đích hơn.
  - **Lời giải (tầng 3):** Nhiều router chuyền tay nhau — mỗi trạm chỉ biết chặng kế tiếp, như dây chuyền bưu tá. Còn DNS chỉ là danh bạ đứng tra số, không bao giờ cầm thư đi giao.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: google.com thật ra nằm trên loại máy nào — luôn bật, chuyên đứng chờ và phục vụ yêu cầu?
  - **Dạng:** gõ tay · **Chấp nhận:** server | máy chủ
  - **Gợi ý (tầng 2):** Là "tòa nhà dịch vụ" không bao giờ tắt đèn trong câu chuyện của mình.
  - **Lời giải (tầng 3):** Đó là server (máy chủ) — điểm hẹn cuối của mọi gói tin bạn gửi đi khi mở một trang web.
- **Tự giải thích:** Giải thích bằng lời của bạn: server khác chiếc laptop của bạn ở chỗ nào?
  - **Nhóm ý cần chạm:** [luôn bật, không tắt, suốt ngày đêm] · [chờ yêu cầu, phục vụ, lắng nghe] · [nhiều người, hàng triệu, máy khác]
  - **Trả lời mẫu:** Laptop của mình lúc bật lúc tắt và chủ yếu phục vụ một mình mình. Server thì luôn bật, đứng lắng nghe yêu cầu suốt ngày đêm và phục vụ hàng triệu người cùng lúc — như tòa nhà dịch vụ mở cửa 24/7 giữa trung tâm thành phố.

**6 · Tổng kết:**
- Server là tòa nhà dịch vụ 24/7: luôn bật, chờ yêu cầu, phục vụ hàng triệu người.
- Trang web không "trôi trên mây" — nó nằm trên những server rất thật.
- Đường tới server là dây chuyền bưu tá: các router chuyền tay, mỗi trạm một chặng.
- *Úp mở bài sau:* Yêu cầu của bạn đã đến tay server — nhưng màn hình máy bạn vẫn trắng trơn. Vì chuyến đi mới xong một nửa. Bài sau: chuyến trở về, và một tấm bản đồ dành riêng cho bạn.

### Bài: Đón trang web trở về `m2-bai-4`

**1 · Khởi động (hook):** Server đã đọc xong yêu cầu của bạn. Nhưng trang Google chưa hiện ra — vì mọi thứ nãy giờ mới là NỬA chuyến đi. Trang web nặng gấp nghìn lần câu hỏi bạn gửi — nó về nhà bạn bằng cách nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: trang web từ server về máy bạn bằng cách nào?
  - **Dạng:** trắc nghiệm · Đi nguyên khối một mạch, theo đường ống riêng cho chiều về / **Cũng bị chia thành gói tin và qua các router, y như lượt đi** ✓ / Máy bạn chép từ router gần nhà, vì router lưu sẵn mọi trang web
  - **Vì sao:** Chiều về không có đặc quyền gì: trang web cũng bị chia thành gói tin, cũng được các router chuyền tay, rồi máy bạn ráp lại — đúng luật chơi bạn học từ Module 1.

**3 · Khám phá (teach):**
- *[request-response]* Mọi lượt mở trang web là một CẶP thư: request — lá thư yêu cầu máy bạn gửi đi, và response — lá thư trả lời server gửi ngược về, chở theo trang web. Chuyến về đi đúng luật cũ: trang web bị chia thành gói tin, các router chuyền tay từng chặng, về tới máy bạn thì được ráp lại — và màn hình sáng lên.
  - **Đào sâu hơn:** Cặp request/response này là nhịp thở của giao thức HTTP. Một trang web thật ra cần hàng chục cặp thư như vậy — chữ, ảnh, video đều là những response riêng. Module 5 mình sẽ xem TCP giữ trật tự cho cả dòng thư này kiểu gì.
- *[ban-do-lo-trinh]* Dừng một nhịp nhìn lại: bạn vừa thấy TOÀN CẢNH — cả thành phố Internet từ trên cao. Đó chính là vai trò của Module 2 trong khóa học. 10 module còn lại là những chuyến zoom vào từng quận: quận địa chỉ (Module 3), quận thiết bị trong làng (Module 4), quận luật gửi thư TCP và số căn hộ port (Module 5), thâm cung của cuốn danh bạ DNS (Module 6)... Từ giờ, học tới đâu bạn cũng biết mình đang đứng ở góc nào trên tấm bản đồ này.
  - **Đào sâu hơn:** Phần B của khóa (Module 4-7) đi sâu vào hạ tầng: switch, TCP/UDP, DNS, NAT. Phần C (Module 8-12) là chuyện đi làm: Wi-Fi, Windows Server, cloud, phòng khám mạng và tự động hóa. Tất cả đều là những chỗ bạn VỪA đi ngang qua trong hành trình hôm nay.

**4 · Thử tay (practice, fading 2):**
- **Đề:** "Lá thư trả lời" mà server gửi ngược về máy bạn, chở theo trang web, gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** response | phản hồi | hồi đáp
  - **Chủ đề gợi ý (tầng 1):** nửa sau của cặp thư đi và thư trả lời
  - **Gợi ý (tầng 2):** Nó là bạn đồng hành của request — thư hỏi đi thì thư này quay về.
  - **Lời giải (tầng 3):** Đó là response (phản hồi): server đóng trang web vào các gói tin và gửi ngược về, hoàn tất cặp request/response của lượt web.
- **Đề:** Điểm nào sau đây ĐÚNG về chuyến về của trang web?
  - **Dạng:** trắc nghiệm · **Nó cũng bị chia thành gói tin và qua các router như lượt đi** ✓ / Nó đi nguyên khối vì server đủ mạnh để gửi một lần / Nó không cần địa chỉ, vì đường về chỉ có một lối
  - **Chủ đề gợi ý (tầng 1):** luật chơi chung cho cả hai chiều
  - **Gợi ý (tầng 2):** Mạng không có luật riêng cho chiều về — nhớ lại vì sao dữ liệu luôn phải chia nhỏ ở Module 1.
  - **Lời giải (tầng 3):** Chuyến về theo đúng luật cũ: chia gói, ghi địa chỉ máy bạn làm đích, các router chuyền tay, máy bạn ráp lại. Hai chiều bình đẳng trước luật chơi của mạng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Bài tốt nghiệp toàn cảnh: sắp xếp 8 chặng của hành trình "gõ google.com" theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Bạn gõ google.com và bấm Enter
    2. Máy bạn hỏi DNS: google.com nằm ở địa chỉ IP nào?
    3. DNS trả về địa chỉ IP của server
    4. Máy bạn đóng yêu cầu vào các gói tin, ghi địa chỉ IP đích
    5. Gói tin qua gateway — cánh cổng rời mạng nhà
    6. Các router trên Internet chuyền tay nhau về gần server
    7. Server nhận yêu cầu, đóng trang web vào gói tin gửi ngược lại
    8. Máy bạn ráp các gói thành trang web hiện lên màn hình
  - **Chủ đề gợi ý (tầng 1):** thứ tự hỏi đường — đóng gói — qua cổng — băng thành phố — trở về
  - **Gợi ý (tầng 2):** Chưa có địa chỉ thì chưa đóng gói được — nên tra danh bạ luôn đứng trước đóng gói. Và hai chặng cuối cùng luôn là chuyến về.
  - **Lời giải (tầng 3):** Gõ tên → hỏi DNS → nhận địa chỉ IP → đóng gói ghi địa chỉ → qua gateway → các router chuyền tay → server trả lời → máy bạn ráp lại. Hỏi đường trước, lên đường sau; chuyến về khép lại vòng tròn.
- **Tự giải thích:** GÕ lại hành trình từ trí nhớ, bằng lời của bạn: từ lúc gõ google.com đến lúc trang web hiện lên màn hình.
  - **Nhóm ý cần chạm:** [danh bạ, hỏi dns, dns trả, tra tên] · [địa chỉ ip, dãy số] · [gateway, cổng làng, cổng mặc định, rời mạng nhà] · [router, chuyền tay, bưu tá] · [server, máy chủ] · [ráp lại, trả về, gửi ngược, phản hồi]
  - **Trả lời mẫu:** Mình gõ google.com — nhưng đó chỉ là cái tên, nên máy mình hỏi DNS, cuốn danh bạ của Internet, để lấy địa chỉ IP thật. Có địa chỉ rồi, máy đóng yêu cầu vào các gói tin, ghi địa chỉ đích, rồi cho chúng qua gateway — cánh cổng duy nhất của mạng nhà, chính là router nhà mình. Ngoài kia, các router chuyền tay nhau như dây chuyền bưu tá, mỗi trạm một chặng gần server hơn. Server — tòa nhà dịch vụ luôn mở cửa — nhận yêu cầu, đóng trang web vào gói tin gửi ngược về. Máy mình ráp các gói lại, và trang web hiện lên màn hình.

**6 · Tổng kết:**
- Mọi lượt web là một cặp thư: request đi, response chở trang web quay về.
- Chuyến về đi đúng luật cũ: chia gói, qua router, ráp lại ở máy bạn.
- Bạn vừa cầm tấm bản đồ toàn thành phố — các module sau chỉ là zoom vào từng quận.
- *Úp mở bài sau:* Bài kiểm tra Module 2 đang chờ ngay ngoài cửa — vượt qua là mở Module 3: mổ xẻ những dãy số địa chỉ mà nãy giờ mình vẫn coi là "cho sẵn". Đến lúc tự đọc được chúng rồi.

### Khái niệm & flashcard (5)

- **DNS** `dns` — Domain Name System — "danh bạ" của Internet, đổi tên miền thành địa chỉ IP
  - Ẩn dụ: DNS như tổng đài 1080: bạn đưa cái tên, tổng đài đọc lại cho bạn con số cần gọi.
  - Thẻ ôn: *DNS làm nhiệm vụ gì?* → Đổi tên miền (google.com) thành địa chỉ IP dạng số — vì tên dành cho người, còn máy chỉ hiểu số.
- **Default gateway** `gateway` — Cổng mặc định — lối ra duy nhất từ mạng nhà lên Internet, chính là router nhà bạn
  - Ẩn dụ: Gateway như cổng làng: ai muốn rời làng ra thế giới đều phải đi qua đúng một cánh cổng đó.
  - Thẻ ôn: *Default gateway là gì?* → Lối ra duy nhất của mạng nhà — mọi gói tin muốn lên Internet đều phải qua nó; ở nhà bạn, đó chính là chiếc router.
- **Server** `server` — Máy chủ — máy luôn bật, đứng chờ yêu cầu và phục vụ nhiều người cùng lúc
  - Ẩn dụ: Server như tòa nhà dịch vụ mở cửa 24/7: không bao giờ tắt đèn, chỉ đứng chờ khách đến yêu cầu.
  - Thẻ ôn: *Server khác máy cá nhân ở điểm nào?* → Server luôn bật và chuyên đứng chờ, phục vụ yêu cầu của hàng triệu máy khác — máy cá nhân thì lúc bật lúc tắt và phục vụ mỗi chủ nhân.
- **Request / Response** `request-response` — Yêu cầu / phản hồi — cặp "thư đi, thư trả lời" của mọi lượt truy cập web
  - Ẩn dụ: Mỗi lượt web là một cặp thư: bạn gửi thư hỏi (request), server gửi thư trả lời chở trang web (response).
  - Thẻ ôn: *Một lượt mở trang web gồm những "lá thư" nào?* → Một cặp: request từ máy bạn đi, response từ server chở trang web quay về — cả hai chiều đều chia thành gói tin và qua các router.
- **Bản đồ lộ trình** `ban-do-lo-trinh` — Vị trí của Module 2 trong khóa: toàn cảnh trước, chi tiết sau
  - Ẩn dụ: Module 2 là tấm bản đồ toàn thành phố; các module sau là những chuyến zoom vào từng quận.
  - Thẻ ôn: *(khái niệm meta — noFlashcard, không vào hộp ôn)*

### Bài kiểm tra module (8 câu, cần ≥ 85%)

- **Đề:** Hệ thống "danh bạ của Internet" — đưa tên miền, nhận về địa chỉ IP — gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** dns | domain name system
  - **Vì sao:** DNS đổi cái tên cho người (google.com) thành địa chỉ IP cho máy — như tổng đài 1080 tra hộ số điện thoại từ một cái tên.
- **Đề:** Bạn mang laptop sang nhà một người bạn — mạng Wi-Fi lạ hoắc, lần đầu kết nối. Gõ google.com, laptop vẫn tìm đúng server Google. Nhờ đâu?
  - **Dạng:** trắc nghiệm · Laptop đã lưu sẵn đường đi từ hồi còn ở nhà bạn / **Ở mạng nào thì máy cũng hỏi DNS được — danh bạ vẫn trả về địa chỉ IP của Google** ✓ / Router nhà người bạn đã lưu sẵn cả trang Google
  - **Vì sao:** Cuốn danh bạ DNS phục vụ mọi mạng: dù bạn ngồi ở đâu, đưa cái tên google.com là nhận về địa chỉ IP của server Google. Đường đi thì mỗi lần mỗi khác — các router tự lo — nhưng bước tra danh bạ luôn hoạt động.
- **Đề:** Bạn chuyển file từ laptop sang máy tính để bàn — cả hai cùng mạng nhà. Gói tin có phải đi qua default gateway không?
  - **Dạng:** trắc nghiệm · Có — mọi gói tin trong nhà đều phải trình diện gateway trước / **Không — gateway chỉ gác lối RA Internet; hai máy cùng làng nói chuyện thẳng với nhau** ✓ / Có — nhưng chỉ khi Internet đang hoạt động
  - **Vì sao:** Gateway là cổng làng — chỉ gác những chuyến RA thế giới. Hai máy cùng mạng nhà trao đổi thẳng trong "làng", không cần qua cổng; rút dây Internet thì chúng vẫn gửi file cho nhau bình thường.
- **Đề:** Trong mạng nhà bạn, thiết bị nào đang đóng vai default gateway?
  - **Dạng:** trắc nghiệm · Chiếc điện thoại đang kết nối Wi-Fi / Server của trang web bạn hay mở / **Chiếc router (cục phát Wi-Fi) nhà bạn** ✓
  - **Vì sao:** Router nhà bạn đứng ngay ranh giới: một chân trong mạng nhà, một chân nối ra Internet — nên nó chính là cánh cổng mặc định.
- **Đề:** Loại máy luôn bật, chuyên đứng chờ yêu cầu và phục vụ hàng triệu người cùng lúc gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** server | máy chủ
  - **Vì sao:** Server (máy chủ) — tòa nhà dịch vụ 24/7 của Internet: mọi trang web bạn mở đều đang "sống" trên những cỗ máy như vậy.
- **Đề:** Sáng nay bạn đọc báo: gõ vnexpress.net và bấm Enter. Sắp xếp 8 chặng của chuyến đi này theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Bạn gõ vnexpress.net và bấm Enter
    2. Máy bạn hỏi DNS: vnexpress.net nằm ở địa chỉ IP nào?
    3. DNS trả về địa chỉ IP của server tòa báo
    4. Máy bạn đóng yêu cầu vào các gói tin, ghi địa chỉ IP đích
    5. Gói tin qua gateway — cánh cổng rời mạng nhà
    6. Các router trên Internet chuyền tay nhau về gần server tòa báo
    7. Server tòa báo nhận yêu cầu, đóng trang báo vào gói tin gửi ngược lại
    8. Máy bạn ráp các gói thành trang báo hiện lên màn hình
  - **Vì sao:** Trang nào cũng chung một kịch bản: hỏi danh bạ lấy địa chỉ → đóng gói → qua cổng làng → các router chuyền tay → server trả lời → ráp lại. Chưa có địa chỉ IP thì chưa gói nào lên đường được.
- **Đề:** "Lá thư trả lời" server gửi ngược về máy bạn, chở theo trang web, gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** response | phản hồi | hồi đáp
  - **Vì sao:** Response (phản hồi) — nửa sau của cặp thư: request mang câu hỏi đi, response chở trang web quay về.
- **Đề:** Bạn mở một trang báo đầy ảnh, nặng 2MB — gấp nghìn lần câu yêu cầu bạn gửi đi. Server có được gửi cả trang về trong MỘT gói tin cho nhanh không?
  - **Dạng:** trắc nghiệm · Được — chiều về do server toàn quyền quyết định / **Không — response nặng mấy cũng phải chia thành nhiều gói tin và qua các router như lượt đi** ✓ / Được — miễn là mạng nhà bạn đủ nhanh để hứng
  - **Vì sao:** Luật chia gói áp dụng cho cả hai chiều, nặng nhẹ gì cũng vậy: server đóng trang báo vào nhiều gói tin, các router chuyền tay từng gói, máy bạn nhận đủ rồi ráp lại thành trang hoàn chỉnh.

## Địa chỉ — MAC, IP và Subnetting `module-3`

Phần A · 6 chặng · 6 bài · 7 khái niệm · drill: subnet

**Chặng:** Số khung và biển số (m3-bai-1) → Đọc vị một địa chỉ IPv4 (m3-bai-2) → Nhà riêng, địa chỉ chung (m3-bai-3) → Kẻ ranh giới khu phố (m3-bai-4) → Nhẩm nhanh bằng magic number (m3-bai-5) → Biển số cho cả tương lai (m3-bai-6)

### Bài: Phân biệt số khung và biển số `m3-bai-1`

**1 · Khởi động (hook):** Sáng nay bạn dùng laptop ở nhà, chiều mang ra quán cà phê. Trên máy có HAI dãy số định danh: một dãy lặng lẽ đổi theo nơi bạn ngồi, một dãy không hề nhúc nhích từ ngày máy xuất xưởng. Hai dãy số đó là gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: mang laptop từ nhà ra quán cà phê, MAC address của máy sẽ...
  - **Dạng:** trắc nghiệm · Đổi theo mạng mới của quán / **Giữ nguyên như lúc ở nhà** ✓
  - **Vì sao:** MAC address được gắn vào card mạng từ nhà máy — như số khung xe, đổi chỗ ngồi không làm nó đổi. Thứ đổi theo mạng là địa chỉ IP.

**3 · Khám phá (teach):**
- *[mac]* Chiếc xe có SỐ KHUNG dập chết từ nhà máy và BIỂN SỐ đổi theo nơi đăng ký. Máy tính y hệt: MAC address (địa chỉ MAC — số định danh phần cứng của card mạng) là số khung, gắn chết từ nhà máy, không đổi; địa chỉ IP là biển số, đổi theo mạng bạn đang cắm vào. Trong mạng nội bộ, các máy gọi nhau bằng MAC; muốn đi xuyên mạng ra thế giới, gói tin dẫn đường bằng IP. Ở Module 1 mình gọi IP là địa chỉ nhà — vẫn đúng. Nhưng đứng từ phía chiếc máy hay di chuyển, nó giống biển số hơn: đổi nơi "đăng ký" là đổi số.
  - **Đào sâu hơn:** MAC dài 48 bit, viết dạng hex (hệ đếm 16 ký tự: 0-9 và a-f) như AA:BB:CC:11:22:33. Ba byte đầu là mã nhà sản xuất (OUI) — nhìn nó có thể đoán card mạng do hãng nào làm. Vì sao cần cả hai địa chỉ? Vì mạng nội bộ giao khung tin theo MAC, còn các router giữa các thành phố chỉ đọc IP — hai tầng địa chỉ, hai việc khác nhau. Lưu ý đời mới: điện thoại hiện đại thường tự tạo MAC "giả" ngẫu nhiên cho từng mạng Wi-Fi để chống theo dõi — số khung thật vẫn nằm trên card mạng, chỉ là máy chìa ra một "biển tạm" khác.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Laptop của bạn xuất xưởng với số khung AA:BB:CC:11:22:33 — đó là MAC address, đi theo máy suốt đời. Sáng cắm Wi-Fi ở nhà, máy nhận "biển số" 192.168.1.7; chiều ra quán, biển số đổi thành 192.168.50.23 — nhưng số khung vẫn y nguyên. Muốn biết một địa chỉ thuộc loại nào, cứ hỏi: nó có đổi khi sang mạng khác không?
- **Đề:** Ra quán cà phê, máy bạn nhận địa chỉ 172.20.5.9 thay cho 192.168.1.7 ở nhà — dãy vừa đổi đó là MAC hay IP?
  - **Dạng:** gõ tay · **Chấp nhận:** ip | địa chỉ ip
  - **Chủ đề gợi ý (tầng 1):** địa chỉ nào đổi theo mạng đang cắm vào
  - **Gợi ý (tầng 2):** Áp câu hỏi thử của ví dụ: dãy này ĐỔI khi máy sang mạng khác — vậy nó là số khung hay biển số?
  - **Lời giải (tầng 3):** Là địa chỉ IP: nó đổi theo mạng máy đang cắm vào — biển số theo nơi "đăng ký". Còn MAC (số khung) dập trên card thì vẫn y nguyên.
- **Đề:** Gói tin cần đi XUYÊN nhiều mạng tới một máy chủ ở thành phố khác. Địa chỉ nào dẫn đường cho chặng dài đó?
  - **Dạng:** trắc nghiệm · MAC address / **Địa chỉ IP** ✓ / Cả hai như nhau, dùng cái nào cũng được
  - **Chủ đề gợi ý (tầng 1):** địa chỉ dùng trong nội bộ và địa chỉ dùng xuyên mạng
  - **Gợi ý (tầng 2):** Router — bưu tá của Module 1 — chỉ đọc một loại địa chỉ trên phong bì. Loại nào ví như biển số?
  - **Lời giải (tầng 3):** Địa chỉ IP. MAC chỉ dùng để các máy trong CÙNG mạng nội bộ gọi nhau; muốn băng qua các router tới mạng khác, gói tin dẫn đường bằng IP.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: địa chỉ nào được ví như BIỂN SỐ xe — đổi theo nơi "đăng ký"?
  - **Dạng:** gõ tay · **Chấp nhận:** ip | địa chỉ ip | ip address
  - **Gợi ý (tầng 2):** Là địa chỉ mà quán cà phê cấp cho máy bạn khi vừa nối Wi-Fi.
  - **Lời giải (tầng 3):** Đó là địa chỉ IP — mạng nào cấp biển số của mạng đó; còn MAC là số khung — dập trên card thì không đổi.
- **Tự giải thích:** Giải thích bằng lời của bạn: MAC address và địa chỉ IP khác nhau thế nào?
  - **Nhóm ý cần chạm:** [số khung, phần cứng, không đổi, nhà máy] · [biển số, thay đổi, theo mạng]
  - **Trả lời mẫu:** MAC như số khung xe: gắn chết vào card mạng từ nhà máy, không đổi khi sang mạng khác, dùng để các máy trong mạng nội bộ gọi nhau. IP như biển số: do mạng đang cắm vào cấp, đổi theo nơi "đăng ký", dùng để gói tin đi xuyên các mạng.

**6 · Tổng kết:**
- MAC address là số khung: dập trên card từ nhà máy thì không đổi.
- Địa chỉ IP là biển số: đổi theo mạng máy đang cắm vào.
- MAC dùng trong mạng nội bộ, IP dẫn đường xuyên các mạng.
- *Úp mở bài sau:* Biển số 192.168.1.10 trông như bốn ô số rời rạc — nhưng nó giấu một cấu trúc tinh tế. Bài sau mình mổ xẻ từng ô.

### Bài: Đọc vị bốn ô số `m3-bai-2`

**1 · Khởi động (hook):** 192.168.1.10 — vì sao địa chỉ IP luôn là BỐN cụm số ngăn bằng dấu chấm? Và vì sao bạn không bao giờ thấy cụm nào vượt quá 255?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: con số lớn nhất mà một "ô" của địa chỉ IPv4 có thể chứa là...
  - **Dạng:** trắc nghiệm · 100 / **255** ✓ / 999
  - **Vì sao:** Mỗi ô (octet) là 8 bit — đúng 256 giá trị, từ 0 đến 255. Vì thế 192.168.300.1 không bao giờ là địa chỉ hợp lệ.

**3 · Khám phá (teach):**
- *[ipv4]* Địa chỉ IPv4 gồm 4 octet (mỗi octet là một cụm số từ 0 đến 255) ngăn bằng dấu chấm, ví dụ 192.168.1.10. Nhưng đừng đọc nó như bốn số rời: địa chỉ chia làm hai phần — PHẦN MẠNG là tên KHU PHỐ, PHẦN HOST là SỐ NHÀ trong khu. Các máy cùng khu phố có phần mạng giống hệt nhau, chỉ khác số nhà. "Ngôi làng" của Module 2 chính là một khu phố như thế này — từ giờ mình gọi theo tên trên bản đồ: khu phố.
  - **Đào sâu hơn:** Mỗi octet là 8 bit, nên cả địa chỉ dài 32 bit — tổng cộng 2^32 ≈ 4,3 tỷ địa chỉ cho cả thế giới. Con số nghe to nhưng sẽ thành chuyện đau đầu ở bài cuối module. Còn ranh giới giữa "khu phố" và "số nhà" nằm chính xác ở đâu? Đó là chuyện của hai bài sau.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Địa chỉ IPv4 tổng cộng dài bao nhiêu bit? (trả lời một con số)
  - **Dạng:** gõ tay · **Chấp nhận:** 32 | 32 bit
  - **Chủ đề gợi ý (tầng 1):** 4 octet, mỗi octet mấy bit
  - **Gợi ý (tầng 2):** Mỗi octet là 8 bit, và địa chỉ có 4 octet — nhân lên nhé.
  - **Lời giải (tầng 3):** 32 bit — 4 octet × 8 bit. Chính vì chỉ có 32 bit nên cả thế giới chỉ có khoảng 4,3 tỷ địa chỉ IPv4.
- **Đề:** Địa chỉ nào dưới đây KHÔNG THỂ tồn tại?
  - **Dạng:** trắc nghiệm · **192.168.300.1** ✓ / 10.0.0.1 / 172.20.255.254
  - **Chủ đề gợi ý (tầng 1):** giới hạn giá trị của một octet
  - **Gợi ý (tầng 2):** Soi từng ô số: có ô nào vượt quá mức trần 255 không?
  - **Lời giải (tầng 3):** 192.168.300.1 không thể tồn tại — octet thứ ba là 300, vượt quá 255. Hai địa chỉ còn lại đều có cả bốn octet trong khoảng 0-255.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: địa chỉ IPv4 gồm phần mạng và phần gì?
  - **Dạng:** gõ tay · **Chấp nhận:** host | phần host
  - **Gợi ý (tầng 2):** Phần mạng là khu phố — còn phần kia là "số nhà" của từng máy trong khu.
  - **Lời giải (tầng 3):** Phần host — số nhà của từng máy. Phần mạng chung cho cả khu phố, phần host phân biệt từng máy trong khu.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao địa chỉ IP chia làm HAI PHẦN thay vì là một dãy số vô nghĩa?
  - **Nhóm ý cần chạm:** [khu phố, cùng mạng, chung khu] · [số nhà, từng máy, phân biệt]
  - **Trả lời mẫu:** Chia hai phần để nhìn địa chỉ là biết máy thuộc khu phố nào: phần mạng chung cho mọi máy cùng mạng — như tên khu phố, phần host phân biệt từng máy — như số nhà. Nhờ vậy router chỉ cần nhìn "khu phố" để chuyển thư về đúng khu, việc tìm đúng nhà để khu đó tự lo.

**6 · Tổng kết:**
- IPv4 = 4 octet 0-255 ngăn bằng dấu chấm, tổng cộng 32 bit.
- Địa chỉ chia hai phần: phần mạng (khu phố) + phần host (số nhà).
- Máy cùng mạng có phần mạng giống hệt nhau, chỉ khác phần host.
- *Úp mở bài sau:* Nhà bạn dùng 192.168.1.x — và lạ chưa, nhà hàng xóm cũng dùng đúng dải đó. Hai nhà "trùng địa chỉ" mà Internet không loạn. Bài sau giải mã.

### Bài: Phân biệt biển số nội bộ và biển số toàn cầu `m3-bai-3`

**1 · Khởi động (hook):** Mở cài đặt Wi-Fi, máy bạn là 192.168.1.5. Sang nhà hàng xóm mở thử — máy họ CŨNG là 192.168.1.5. Hai máy trùng địa chỉ mà cả hai nhà vẫn lướt web ngon lành. Sao Internet không loạn?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: hai nhà cùng dùng 192.168.1.5 mà không sao, vì...
  - **Dạng:** trắc nghiệm · Nhà cung cấp mạng chia ca cho hai nhà dùng lệch giờ nhau / **Đó là địa chỉ private — chỉ có nghĩa trong nội bộ từng nhà** ✓ / Internet tự động đổi địa chỉ một trong hai nhà
  - **Vì sao:** 192.168.1.5 là địa chỉ private: nó chỉ có nghĩa bên trong từng mạng nhà, không bao giờ xuất hiện ngoài Internet — nên triệu nhà dùng lại cùng lúc vẫn không đụng nhau.

**3 · Khám phá (teach):**
- *[private-public]* Địa chỉ IP có hai hạng. Private (địa chỉ riêng) như SỐ PHÒNG trong một tòa nhà: tòa nào cũng có phòng 101, dùng lại thoải mái vì số phòng chỉ có nghĩa trong tòa nhà đó — và không ai gửi thư ngoài đường bằng số phòng. Public (địa chỉ công cộng) như địa chỉ đường: duy nhất trên toàn cầu. Ba dải private của IPv4: 10.0.0.0/8, 172.16.0.0/12 và 192.168.0.0/16. Khoan — nghe giống số căn hộ (port) ở Module 1? Khác nhé: port là cửa của từng ỨNG DỤNG bên trong một máy; còn số phòng ở đây là của từng MÁY bên trong một mạng.
  - **Đào sâu hơn:** Dải 172.16.0.0/12 chạy từ 172.16.0.0 đến 172.31.255.255 — nghĩa là 172.32.x.x đã là public, một cái bẫy kinh điển trong đề thi. Còn máy mang "số phòng" thì ra đường bằng cách nào? Đó là chuyện của NAT — Module 7 sẽ kể trọn.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Địa chỉ nào dưới đây là private?
  - **Dạng:** trắc nghiệm · 172.32.1.5 / **192.168.2.10** ✓ / 8.8.8.8
  - **Chủ đề gợi ý (tầng 1):** ba dải private và ranh giới chính xác của dải 172
  - **Gợi ý (tầng 2):** Dải private của "họ 172" chỉ chạy từ 172.16 đến 172.31 — soi kỹ octet thứ hai.
  - **Lời giải (tầng 3):** 192.168.2.10 là private (nằm trong 192.168.0.0/16). Bẫy nằm ở 172.32.1.5: dải private 172.16.0.0/12 dừng ở 172.31, nên 172.32 là public. 8.8.8.8 là DNS công cộng của Google — public.
- **Đề:** Địa chỉ 10.20.30.40 thuộc loại nào — private hay public?
  - **Dạng:** gõ tay · **Chấp nhận:** private | địa chỉ private | ip private | địa chỉ riêng | riêng
  - **Chủ đề gợi ý (tầng 1):** dải private bắt đầu bằng số 10
  - **Gợi ý (tầng 2):** Cả "họ nhà 10" — 10.0.0.0/8, tức mọi địa chỉ bắt đầu bằng 10. — đều cùng một hạng.
  - **Lời giải (tầng 3):** Private — 10.20.30.40 nằm trong dải 10.0.0.0/8: mọi địa chỉ bắt đầu bằng 10. đều là địa chỉ riêng dùng nội bộ.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: các địa chỉ bắt đầu bằng 192.168. thuộc loại nào — private hay public?
  - **Dạng:** gõ tay · **Chấp nhận:** private | địa chỉ private | ip private | địa chỉ riêng | riêng
  - **Gợi ý (tầng 2):** Là loại địa chỉ mà nhà nào cũng dùng lại được — như số phòng trong tòa nhà.
  - **Lời giải (tầng 3):** Private — 192.168.0.0/16 là một trong ba dải địa chỉ riêng, chỉ có nghĩa trong nội bộ từng mạng.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao hàng triệu nhà cùng dùng dải 192.168.1.x mà không xung đột với nhau?
  - **Nhóm ý cần chạm:** [nội bộ, trong nhà, số phòng, dùng lại] · [không ra, ngoài Internet, toàn cầu, duy nhất]
  - **Trả lời mẫu:** Vì 192.168.1.x là địa chỉ private — như số phòng trong tòa nhà, chỉ có nghĩa bên trong từng nhà. Các gói tin mang địa chỉ này không bao giờ chạy thẳng ra ngoài Internet, nên triệu nhà dùng lại cùng dải vẫn không đụng nhau; chỉ địa chỉ public mới cần duy nhất toàn cầu.

**6 · Tổng kết:**
- Private như số phòng: dùng nội bộ, nhà nào cũng dùng lại được.
- Ba dải private: 10.0.0.0/8, 172.16.0.0/12 (đến 172.31), 192.168.0.0/16.
- Public duy nhất toàn cầu — như địa chỉ đường ngoài phố.
- *Úp mở bài sau:* Bạn đã nghe "khu phố" và "số nhà" mãi — nhưng chính xác thì ranh giới giữa hai phần nằm ở ĐÂU trong bốn ô số? Bài sau: kẻ hàng rào.

### Bài: Kẻ hàng rào cho khu phố `m3-bai-4`

**1 · Khởi động (hook):** Nhìn 192.168.1.10 trần trụi, máy tính KHÔNG thể biết khu phố kết thúc ở đâu và số nhà bắt đầu từ đâu. Vậy thứ gì luôn đứng cạnh địa chỉ IP để kẻ vạch ranh giới đó?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: dãy số 255.255.255.0 đứng cạnh một địa chỉ IP để làm gì?
  - **Dạng:** trắc nghiệm · Che giấu địa chỉ khỏi tin tặc / **Kẻ ranh giới giữa phần mạng và phần host** ✓ / Tăng tốc độ đường truyền
  - **Vì sao:** 255.255.255.0 là subnet mask — hàng rào cho máy biết: 3 octet đầu là khu phố (phần mạng), octet cuối là số nhà (phần host).

**3 · Khám phá (teach):**
- *[subnet-mask]* Subnet mask (mặt nạ mạng) là HÀNG RÀO của khu phố: nó đứng cạnh địa chỉ IP và chỉ ra phần nào là khu phố, phần nào là số nhà. Mask 255.255.255.0 nghĩa là: 3 octet đầu (192.168.1) là khu phố, octet cuối (.10) là số nhà. Cùng một địa chỉ nhưng mask khác nhau là ranh giới khu phố khác hẳn nhau.
  - **Đào sâu hơn:** Vì sao lại là 255? Vì 255 = tám bit 1 liền nhau. Mask thực chất là dãy bit: bit 1 liền mạch từ trái đánh dấu phần mạng, phần còn lại toàn bit 0 là phần host. 255.255.255.0 = 24 bit 1 rồi 8 bit 0.
- *[cidr]* Viết cả dãy 255.255.255.0 thì dài dòng, nên dân làm mạng ghi gọn bằng CIDR (cách ghi /n sau địa chỉ): 192.168.1.10/24 nghĩa là 24 bit đầu là phần mạng. Quy đổi nhanh: /24 ↔ 255.255.255.0, /16 ↔ 255.255.0.0 — con số sau dấu gạch chéo chính là số bit của "hàng rào".
  - **Đào sâu hơn:** Cùng logic: /8 ↔ 255.0.0.0. Bạn đã gặp CIDR từ bài trước mà chưa gọi tên: 10.0.0.0/8 hay 192.168.0.0/16 chính là cách ghi này. CIDR còn cho phép ranh giới rơi vào GIỮA một octet, như /26 — chuyện gay cấn của bài sau.

**4 · Thử tay (practice, fading 2):**
- **Đề:** /16 tương ứng với subnet mask nào? (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 255.255.0.0
  - **Chủ đề gợi ý (tầng 1):** số bit 1 mà con số sau dấu gạch chéo mô tả
  - **Gợi ý (tầng 2):** 16 bit = đúng 2 octet đầu toàn bit 1, tức hai ô 255; hai ô còn lại là 0.
  - **Lời giải (tầng 3):** /16 ↔ 255.255.0.0 — 16 bit đầu là phần mạng, tức 2 octet đầu "đầy" 255, hai octet sau thuộc phần host.
- **Đề:** Với mask 255.255.255.0, mấy octet đầu của địa chỉ thuộc phần mạng (khu phố)? (trả lời một con số)
  - **Dạng:** gõ tay · **Chấp nhận:** 3
  - **Chủ đề gợi ý (tầng 1):** octet nào của mask mang giá trị 255
  - **Gợi ý (tầng 2):** Đếm xem trong mask có bao nhiêu ô mang giá trị 255 — mỗi ô 255 "khóa" một octet vào phần mạng.
  - **Lời giải (tầng 3):** 3 octet đầu — ba ô 255 của mask đánh dấu ba octet đầu là khu phố, octet cuối là số nhà.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: với địa chỉ 192.168.1.10 và mask 255.255.255.0, phần KHU PHỐ (phần mạng) là chuỗi nào? (trả lời dạng x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 192.168.1
  - **Gợi ý (tầng 2):** Mask có ba ô 255 — hàng rào dựng ngay sau octet thứ ba.
  - **Lời giải (tầng 3):** 192.168.1 — ba octet đầu là khu phố theo mask 255.255.255.0; số 10 cuối cùng là số nhà.
- **Tự giải thích:** Giải thích bằng lời của bạn: subnet mask dùng để làm gì, và /24 nghĩa là sao?
  - **Nhóm ý cần chạm:** [ranh giới, hàng rào, phần mạng, khu phố] · [24 bit, 255.255.255.0, ghi gọn]
  - **Trả lời mẫu:** Subnet mask là hàng rào kẻ ranh giới trên địa chỉ IP: phần bị mask "phủ" là phần mạng (khu phố), phần còn lại là phần host (số nhà). /24 là cách ghi gọn kiểu CIDR: 24 bit đầu là phần mạng, tương đương mask 255.255.255.0.

**6 · Tổng kết:**
- Subnet mask kẻ ranh giới phần mạng / phần host trên địa chỉ IP.
- 255.255.255.0 nghĩa là 3 octet đầu là khu phố, octet cuối là số nhà.
- CIDR ghi gọn hàng rào: /24 ↔ 255.255.255.0, /16 ↔ 255.255.0.0.
- *Úp mở bài sau:* Nhưng khi hàng rào cắm vào GIỮA một octet — như /26 — thì đọc ranh giới kiểu gì? Dân làm mạng có mẹo nhẩm 3 giây tên là magic number. Bài sau học lỏm ngay.

### Bài: Nhẩm ranh giới bằng magic number `m3-bai-5`

**1 · Khởi động (hook):** Một kỹ thuật viên nhìn 192.168.1.130/26 và buột miệng ngay: "máy này thuộc khu phố .128" — không giấy nháp, không đổi ra nhị phân. Họ nhẩm bằng mẹo gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: /26 có mask 255.255.255.192. Các "khu phố" trên octet cuối sẽ cách nhau bao nhiêu số?
  - **Dạng:** trắc nghiệm · **64** ✓ / 192 / 26
  - **Vì sao:** Bước nhảy = 256 − 192 = 64. Các mốc khu phố lần lượt là .0, .64, .128, .192 — đó chính là "magic number" mà bài này dạy bạn nhẩm.

**3 · Khám phá (teach):**
- *[magic-number]* Magic number (quy tắc nhẩm chia subnet) chỉ có MỘT phép trừ: lấy 256 trừ đi octet "đáng chú ý" của mask — octet khác 0 và khác 255. Với /26: mask là 255.255.255.192 → magic number = 256 − 192 = 64. Các khu phố nhảy theo bước 64: mốc .0, .64, .128, .192. Muốn tìm network address (địa chỉ mạng — "tên khu phố") của một IP: chọn mốc gần nhất KHÔNG vượt quá nó. Ví dụ 192.168.1.130/26: mốc 128 ≤ 130 < 192 → khu phố là 192.168.1.128.
  - **Đào sâu hơn:** Vì sao mẹo này đúng? Vì octet 192 của mask là 11000000: 2 bit đầu thuộc phần khu phố, 6 bit còn lại cho số nhà → mỗi khu có 2^6 = 64 địa chỉ. Phép 256 − 192 chỉ là đường tắt luôn ra đúng con số đó. Mẹo này chạy với mọi prefix: /25 → 256−128 = 128 (mốc .0, .128); /27 → 256−224 = 32 (mốc .0, .32, .64...); /30 → 256−252 = 4. Càng luyện càng nhanh — nên app có hẳn một drill mỗi ngày cho bạn.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Tìm network address của 192.168.1.75/26. (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 192.168.1.64
  - **Chủ đề gợi ý (tầng 1):** mốc gần nhất không vượt quá octet cuối
  - **Gợi ý (tầng 2):** Magic number = 256 − octet đáng chú ý của mask. Tự liệt kê các mốc rồi so với 75.
  - **Lời giải (tầng 3):** 192.168.1.64. Nhẩm: /26 → mask ...192 → 256 − 192 = 64 → các mốc 0, 64, 128, 192. Mốc gần nhất không vượt quá 75 là 64 → network address là 192.168.1.64.
- **Đề:** Tìm network address của 10.0.5.77/27. (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 10.0.5.64
  - **Chủ đề gợi ý (tầng 1):** magic number của mask 255.255.255.224
  - **Gợi ý (tầng 2):** Magic number = 256 − octet đáng chú ý của mask 255.255.255.224. Tự liệt kê các mốc rồi so với 77.
  - **Lời giải (tầng 3):** 10.0.5.64. Nhẩm: /27 → mask ...224 → 256 − 224 = 32 → các mốc 0, 32, 64, 96. Mốc gần nhất không vượt quá 77 là 64 → network address là 10.0.5.64.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: tìm network address của 172.16.9.100/26. (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 172.16.9.64
  - **Gợi ý (tầng 2):** Magic number = 256 − octet đáng chú ý của mask. Tự liệt kê các mốc rồi so với 100.
  - **Lời giải (tầng 3):** 172.16.9.64. /26 → 256 − 192 = 64 → mốc 0, 64, 128, 192; mốc gần nhất không vượt quá 100 là 64.
- **Tự giải thích:** Giải thích bằng lời của bạn: cách tìm network address của một IP bằng magic number, từng bước một.
  - **Nhóm ý cần chạm:** [bước nhảy, 256 trừ] · [không vượt quá, gần nhất, mốc mạng]
  - **Trả lời mẫu:** Mình đổi prefix ra mask, lấy 256 trừ octet đáng chú ý của mask để được magic number — đó là bước nhảy giữa các khu phố. Liệt kê các mốc theo bước nhảy đó (0, 64, 128...), rồi chọn mốc gần nhất không vượt quá octet của IP — mốc đó chính là network address.

**6 · Tổng kết:**
- Magic number = 256 − octet đáng chú ý của mask (vd /26 → 256 − 192 = 64).
- Các mốc mạng nhảy theo bước magic number: .0, .64, .128, .192...
- Network address = mốc gần nhất không vượt quá IP đang xét.
- *Úp mở bài sau:* Mẹo đã nắm — giờ chỉ thiếu tốc độ. Drill "Luyện chia subnet" trong tab Học sinh đề mới mỗi ngày kèm đồng hồ đếm: ghé luyện mỗi ngày để tay nhẩm nhanh dần lên. Còn bài cuối module: chuyện IPv4... sắp hết sạch địa chỉ.

### Bài: Đọc biển số của tương lai `m3-bai-6`

**1 · Khởi động (hook):** IPv4 chỉ có khoảng 4,3 tỷ địa chỉ — mà Trái Đất có hơn 8 tỷ người, mỗi người vài thiết bị. Kho biển số đã cạn từ lâu, vậy sao Internet vẫn chạy, và "biển số đời mới" trông ra sao?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: địa chỉ IPv6 dài bao nhiêu bit?
  - **Dạng:** trắc nghiệm · 32 bit / 64 bit / **128 bit** ✓
  - **Vì sao:** IPv6 dài 128 bit — gấp 4 lần IPv4 (32 bit). Không gian địa chỉ lớn đến mức mỗi hạt cát trên Trái Đất cũng có phần.

**3 · Khám phá (teach):**
- *[ipv6]* IPv6 (thế hệ địa chỉ IP mới, 128 bit) là tấm biển số dài đến mức mỗi hạt cát trên Trái Đất cũng có phần — không bao giờ lo cạn. Viết bằng số hex, 8 nhóm ngăn bằng dấu hai chấm, ví dụ 2001:0db8:0000:0000:0000:0000:0000:0001. Dài quá? Có luật rút gọn: chuỗi nhóm 0 liên tiếp thay bằng "::" — nhưng chỉ được dùng "::" ĐÚNG MỘT LẦN trong một địa chỉ. Địa chỉ trên thu gọn thành 2001:db8::1.
  - **Đào sâu hơn:** Vì sao "::" chỉ được xuất hiện một lần? Vì nếu có hai chỗ "::", máy không biết mỗi chỗ giấu bao nhiêu nhóm 0 — địa chỉ thành mơ hồ. Hiện nay hầu hết máy chạy dual-stack: song song cả IPv4 lẫn IPv6 trên cùng một card mạng — Module 8 sẽ đào sâu IPv6 và cơ chế này.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Một địa chỉ IPv6 đầy đủ gồm mấy nhóm số hex? (trả lời một con số)
  - **Dạng:** gõ tay · **Chấp nhận:** 8 | 8 nhóm
  - **Chủ đề gợi ý (tầng 1):** số nhóm ngăn bằng dấu hai chấm
  - **Gợi ý (tầng 2):** Đếm số nhóm trong 2001:0db8:0000:0000:0000:0000:0000:0001 — mỗi nhóm ngăn nhau bằng dấu ":".
  - **Lời giải (tầng 3):** 8 nhóm — địa chỉ IPv6 đầy đủ viết hex thành 8 nhóm ngăn bằng dấu ":"; 128 bit chia đều, mỗi nhóm 16 bit.
- **Đề:** Cách rút gọn nào sau đây là HỢP LỆ với IPv6?
  - **Dạng:** trắc nghiệm · **2001:db8::1** ✓ / 2001::db8::1 / 2001.db8.0.1
  - **Chủ đề gợi ý (tầng 1):** số lần "::" được phép xuất hiện
  - **Gợi ý (tầng 2):** Đếm số lần "::" xuất hiện trong từng đáp án — luật cho phép mấy lần? Và IPv6 ngăn nhóm bằng ký tự nào?
  - **Lời giải (tầng 3):** 2001:db8::1 hợp lệ. 2001::db8::1 sai vì dùng "::" hai lần — máy không biết mỗi chỗ giấu bao nhiêu nhóm 0. 2001.db8.0.1 sai vì IPv6 ngăn nhóm bằng dấu ":", không phải dấu chấm.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: trong IPv6, ký hiệu nào dùng để rút gọn chuỗi nhóm 0 liên tiếp (chỉ được dùng một lần)?
  - **Dạng:** gõ tay · **Chấp nhận:** :: | hai dấu hai chấm
  - **Gợi ý (tầng 2):** Là hai ký tự giống nhau đứng liền, chính là thứ biến 2001:0db8:0000:...:0001 thành 2001:db8::1.
  - **Lời giải (tầng 3):** Ký hiệu "::" — thay cho chuỗi nhóm 0 liên tiếp, và chỉ được xuất hiện đúng một lần trong một địa chỉ.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao thế giới cần IPv6 trong khi đã có IPv4?
  - **Nhóm ý cần chạm:** [cạn kiệt, không đủ, hết địa chỉ, 4,3 tỷ] · [128 bit, nhiều hơn, khổng lồ, dài hơn]
  - **Trả lời mẫu:** IPv4 chỉ có 32 bit — khoảng 4,3 tỷ địa chỉ, quá ít cho hàng chục tỷ thiết bị nên đã cạn kiệt. IPv6 dài 128 bit, không gian địa chỉ khổng lồ đến mức mỗi hạt cát cũng có phần — mỗi thiết bị có thể mang biển số public riêng mà không bao giờ lo hết.

**6 · Tổng kết:**
- IPv4 32 bit ≈ 4,3 tỷ địa chỉ — đã cạn từ lâu.
- IPv6 128 bit, viết hex 8 nhóm ngăn bằng dấu ":".
- Chuỗi nhóm 0 liên tiếp rút gọn bằng "::" — đúng một lần duy nhất.
- *Úp mở bài sau:* Bạn đã cầm trọn bộ chìa khóa địa chỉ: MAC, IPv4, private/public, mask, magic number, IPv6. Bài thi Module 3 chờ ngay ngoài cửa — vượt ải là bước sang Phần B: sờ tận tay switch, router và VLAN.

### Khái niệm & flashcard (7)

- **MAC address** `mac` — Địa chỉ MAC — số định danh phần cứng gắn chết vào card mạng từ nhà máy
  - Ẩn dụ: MAC như số khung xe: dập từ nhà máy, đi theo xe suốt đời — đổi chủ, đổi tỉnh cũng không đổi số khung.
  - Thẻ ôn: *MAC address là gì — và có đổi khi mang máy sang mạng khác không?* → Số định danh phần cứng của card mạng, gắn chết từ nhà máy như số khung xe — KHÔNG đổi khi sang mạng khác; dùng để các máy trong mạng nội bộ gọi nhau.
- **IPv4** `ipv4` — Địa chỉ IP thế hệ 4 — 4 octet 0-255 ngăn bằng dấu chấm, gồm phần mạng và phần host
  - Ẩn dụ: Địa chỉ hai phần: phần đầu là tên khu phố (phần mạng), phần sau là số nhà trong khu (phần host).
  - Thẻ ôn: *Địa chỉ IPv4 có cấu tạo thế nào?* → 4 octet, mỗi octet từ 0 đến 255, ngăn bằng dấu chấm — chia làm phần mạng (khu phố) và phần host (số nhà).
- **Private / Public IP** `private-public` — Địa chỉ riêng dùng nội bộ (dùng lại được, không ra Internet) và địa chỉ công cộng duy nhất toàn cầu
  - Ẩn dụ: Private như số phòng trong tòa nhà: tòa nào cũng có phòng 101, nhưng không ai gửi thư ngoài đường bằng số phòng; public như địa chỉ đường — duy nhất toàn cầu.
  - Thẻ ôn: *Ba dải địa chỉ private của IPv4 là gì?* → 10.0.0.0/8, 172.16.0.0/12 (172.16 đến 172.31) và 192.168.0.0/16 — chỉ dùng nội bộ, không định tuyến trên Internet.
- **Subnet mask** `subnet-mask` — Mặt nạ mạng — dãy số kẻ ranh giới giữa phần mạng và phần host của một địa chỉ IP
  - Ẩn dụ: Hàng rào khu phố: nhìn hàng rào là biết khu phố kết thúc ở đâu và số nhà bắt đầu từ đâu.
  - Thẻ ôn: *Mask 255.255.255.0 nói gì về một địa chỉ IP?* → 3 octet đầu là phần mạng (khu phố), octet cuối là phần host (số nhà) — mask là hàng rào kẻ ranh giới đó.
- **CIDR** `cidr` — Cách ghi gọn subnet mask bằng /n — n là số bit đầu thuộc phần mạng
  - Ẩn dụ: Thay vì tả cả hàng rào, chỉ ghi một con số sau dấu gạch chéo: /24 nghĩa là "hàng rào dựng ngay sau bit thứ 24".
  - Thẻ ôn: */24 và /16 tương ứng với subnet mask nào?* → /24 ↔ 255.255.255.0; /16 ↔ 255.255.0.0 — con số sau dấu gạch chéo là số bit của phần mạng.
- **Magic number** `magic-number` — Quy tắc nhẩm chia subnet: magic number = 256 trừ octet đáng chú ý của mask
  - Ẩn dụ: Bước nhảy giữa các mốc đầu khu phố: biết bước nhảy là đọc được ranh giới mọi khu phố trên cả con đường.
  - Thẻ ôn: *Cách tìm network address của một IP bằng magic number?* → Magic number = 256 − octet đáng chú ý của mask; các mốc mạng nhảy theo bước đó; network address là mốc gần nhất KHÔNG vượt quá IP. Ví dụ 192.168.1.130/26: 256 − 192 = 64 → mốc 128 → network 192.168.1.128.
- **IPv6** `ipv6` — Thế hệ địa chỉ IP mới dài 128 bit, viết hex 8 nhóm ngăn bằng dấu hai chấm
  - Ẩn dụ: Tấm biển số dài đến mức mỗi hạt cát trên Trái Đất cũng có phần — không bao giờ lo cạn kho số.
  - Thẻ ôn: *IPv6 dài bao nhiêu bit và viết thế nào?* → 128 bit; viết hex thành 8 nhóm ngăn bằng ":"; chuỗi nhóm 0 liên tiếp rút gọn bằng "::" đúng một lần — ví dụ 2001:db8::1.

### Bài kiểm tra module (9 câu, cần ≥ 85%)

- **Đề:** Bạn mang laptop từ nhà đến quán cà phê. Điều gì xảy ra với hai địa chỉ của máy?
  - **Dạng:** trắc nghiệm · MAC đổi theo mạng mới, IP giữ nguyên / **IP đổi theo mạng mới, MAC giữ nguyên** ✓ / Cả hai cùng đổi theo mạng mới
  - **Vì sao:** MAC là số khung — gắn chết từ nhà máy, không đổi; IP là biển số — do mạng đang cắm vào cấp nên đổi theo nơi ngồi.
- **Đề:** Mỗi octet của địa chỉ IPv4 nhận giá trị từ 0 đến bao nhiêu?
  - **Dạng:** gõ tay · **Chấp nhận:** 255
  - **Vì sao:** Mỗi octet là 8 bit — chứa được 256 giá trị, đếm từ 0 đến 255. Địa chỉ có octet vượt 255 là địa chỉ không tồn tại.
- **Đề:** Địa chỉ nào dưới đây là private?
  - **Dạng:** trắc nghiệm · 172.32.8.1 / 203.113.5.7 / **192.168.10.5** ✓
  - **Vì sao:** 192.168.10.5 nằm trong dải private 192.168.0.0/16. Bẫy ở 172.32.8.1: dải private 172.16.0.0/12 chỉ chạy đến 172.31 nên 172.32 là public; 203.113.5.7 cũng là public.
- **Đề:** /24 tương ứng với subnet mask nào? (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 255.255.255.0
  - **Vì sao:** /24 nghĩa là 24 bit đầu là phần mạng — đúng 3 octet "đầy" bit 1, tức 255.255.255.0.
- **Đề:** Tính magic number của /26. (trả lời một con số)
  - **Dạng:** gõ tay · **Chấp nhận:** 64
  - **Vì sao:** /26 → mask 255.255.255.192 → magic number = 256 − 192 = 64. Các mốc mạng nhảy theo bước 64: .0, .64, .128, .192.
- **Đề:** Tìm network address của 172.16.4.201/25. (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 172.16.4.128
  - **Vì sao:** /25 → mask 255.255.255.128 → magic number = 256 − 128 = 128 → mốc .0 và .128. Mốc gần nhất không vượt quá 201 là 128 → network address là 172.16.4.128.
- **Đề:** Điều nào sau đây đúng về IPv6?
  - **Dạng:** trắc nghiệm · **Dài 128 bit, viết hex 8 nhóm, rút gọn nhóm 0 liên tiếp bằng "::"** ✓ / Dài 64 bit, viết thập phân ngăn bằng dấu chấm / Là IPv4 nối thêm một octet thứ năm cho đỡ cạn số
  - **Vì sao:** IPv6 dài 128 bit, viết hex thành 8 nhóm ngăn bằng ":", và chuỗi nhóm 0 liên tiếp được rút gọn bằng "::" đúng một lần — một hệ địa chỉ mới hẳn, không phải IPv4 "nối dài".
- **Đề:** Sắp xếp các bước tìm network address của 192.168.1.130/26 bằng magic number theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Đổi /26 ra subnet mask: 255.255.255.192
    2. Lấy 256 trừ octet đáng chú ý: 256 − 192 = 64
    3. Liệt kê các mốc mạng theo bước 64: .0, .64, .128, .192
    4. Chọn mốc gần nhất không vượt quá 130 → network address là 192.168.1.128
  - **Vì sao:** Quy trình nhẩm: prefix → mask → magic number (256 trừ octet đáng chú ý) → liệt kê mốc → chọn mốc gần nhất không vượt quá IP.
- **Đề:** Ký hiệu rút gọn một chuỗi nhóm 0 liên tiếp trong địa chỉ IPv6 là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** ::
  - **Vì sao:** Ký hiệu "::" thay cho chuỗi nhóm 0 liên tiếp — và chỉ được dùng đúng MỘT lần trong một địa chỉ, vì có hai chỗ "::" thì máy không biết mỗi chỗ giấu bao nhiêu nhóm 0.

## Switch, Router, VLAN — Thiết bị trong làng `module-4`

Phần B · 5 chặng · 5 bài · 6 khái niệm

**Chặng:** Bưu cục của làng (m4-bai-1) → Cuốn sổ nhớ mặt (m4-bai-2) → Hỏi tên trước khi trao (m4-bai-3) → Dựng tường chia xóm (m4-bai-4) → Bắc cầu qua tường (m4-bai-5)

### Bài: Gom cả phòng về một mối `m4-bai-1`

**1 · Khởi động (hook):** Một phòng có 10 máy, máy nào cũng cần nói chuyện được với máy nào. Nếu kéo dây thẳng từng cặp thì hết 45 sợi. Người ta làm cách nào để chỉ cần 10 sợi?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: cái hộp mà mọi máy trong phòng đều cắm dây vào, nó làm gì với dữ liệu đi qua?
  - **Dạng:** trắc nghiệm · Phát mọi thứ cho mọi máy, máy nào không phải của mình thì tự bỏ qua / **Nhìn địa chỉ rồi chuyển đúng cho một máy** ✓ / Lưu lại toàn bộ rồi gửi vào cuối ngày
  - **Vì sao:** Nó nhìn địa chỉ rồi chuyển đúng chỗ. Đúng là lúc mới bật nó chưa biết ai ở đâu nên phát rộng thật — nhưng nó học rất nhanh, và bài sau mình sẽ xem nó học kiểu gì.

**3 · Khám phá (teach):**
- *[switch]* Switch là cái bưu cục đặt giữa làng: thay vì mỗi nhà tự chạy sang nhà kia, mọi lá thư đều đưa vào bưu cục, rồi bưu cục chuyển tới đúng nhà nhận. Mỗi máy chỉ cần một sợi dây cắm vào một cổng của switch là nói chuyện được với cả phòng.
  - **Đào sâu hơn:** Kéo dây thẳng từng cặp cho n máy cần n×(n−1)/2 sợi — 10 máy đã là 45, 30 máy là 435. Dùng switch thì mỗi máy đúng một sợi. Đây là lý do mọi mạng thật đều hình sao quanh switch chứ không phải mạng nhện.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Ví dụ đã giải: phòng có 4 máy. Mỗi máy cắm một sợi vào switch, tổng 4 sợi. Máy 1 gửi cho máy 3: thư đi vào switch qua cổng 1, switch nhìn địa chỉ đích rồi đẩy ra cổng 3. Máy 2 và máy 4 không nhận được gì cả — thư không đi lạc sang chỗ chúng.
- **Đề:** Thiết bị đóng vai bưu cục — nối nhiều máy trong CÙNG một mạng lại với nhau — gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** switch | bộ chuyển mạch
  - **Chủ đề gợi ý (tầng 1):** cái hộp nhiều cổng mà mọi máy trong phòng cắm dây vào
  - **Gợi ý (tầng 2):** Nó là hộp có nhiều cổng, mỗi máy cắm một sợi. Tên tiếng Anh của nó cũng là từ mình vẫn dùng cho công tắc điện.
  - **Lời giải (tầng 3):** Đó là switch. Mỗi máy một sợi dây cắm vào một cổng, và switch lo phần chuyển thư giữa các cổng.
- **Đề:** Phòng đang có 6 máy nối qua switch. Thêm máy thứ 7 thì phải kéo thêm mấy sợi dây?
  - **Dạng:** trắc nghiệm · 6 sợi — nối tới từng máy cũ / **1 sợi — cắm vào switch là xong** ✓ / 7 sợi
  - **Gợi ý (tầng 2):** Máy mới cần nói chuyện với ai? Và nó cần chạm tới ai để làm được điều đó?
  - **Lời giải (tầng 3):** Đúng một sợi. Máy mới chỉ cần chạm tới switch, còn switch đã chạm tới mọi máy khác rồi — đó chính là cái lợi của hình sao.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: tên thiết bị nối nhiều máy trong cùng một mạng là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** switch | bộ chuyển mạch
  - **Gợi ý (tầng 2):** Hộp nhiều cổng, đóng vai bưu cục của làng.
  - **Lời giải (tầng 3):** Switch — mỗi máy một sợi dây, nó lo việc chuyển thư giữa các cổng.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao dùng switch lại đỡ dây hơn nhiều so với nối thẳng từng cặp máy?
  - **Nhóm ý cần chạm:** [một sợi, 1 sợi, một dây, mỗi máy một] · [switch, bưu cục, hộp] · [từng cặp, nối thẳng, nối trực tiếp, mọi máy khác]
  - **Trả lời mẫu:** Nối thẳng từng cặp thì mỗi máy phải có dây tới mọi máy còn lại, càng đông càng rối. Có switch thì mỗi máy chỉ cần một sợi cắm vào nó, còn switch chạm tới tất cả — thêm máy mới cũng chỉ thêm đúng một sợi.

**6 · Tổng kết:**
- Switch là bưu cục của làng: mọi máy cắm vào nó, nó chuyển thư giữa các cổng.
- Mỗi máy chỉ cần một sợi dây, thay vì nối chằng chịt tới từng máy khác.
- Nó chuyển đúng cho một máy chứ không phát bừa cho cả phòng.
- *Úp mở bài sau:* Nhưng khoan — switch làm sao biết máy nào đang ngồi ở cổng nào? Không ai khai báo với nó cả. Bài sau mình mở cuốn sổ mà nó tự ghi.

### Bài: Mở cuốn sổ nhớ mặt của switch `m4-bai-2`

**1 · Khởi động (hook):** Người mới chuyển đến xóm, lá thư đầu tiên bưu tá phải hỏi khắp nơi mới tìm ra nhà. Nhưng từ lá thứ hai thì đi thẳng. Switch cũng làm y như vậy — nó nhớ bằng cách nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: switch vừa bật, chưa biết gì. Máy A gửi thư cho máy B. Switch làm gì?
  - **Dạng:** trắc nghiệm · Vứt lá thư đi vì chưa biết B ở đâu / **Đẩy ra tất cả các cổng còn lại, ai đúng thì nhận** ✓ / Hỏi máy A xem B cắm ở cổng nào
  - **Vì sao:** Chưa biết thì nó phát ra mọi cổng còn lại — gọi là flood. Hơi phí, nhưng chỉ phí đúng lần đầu: khi B trả lời, switch nhìn thấy B ở cổng nào và ghi nhớ luôn.

**3 · Khám phá (teach):**
- *[mac-table]* Switch giữ một cuốn sổ hai cột: địa chỉ MAC của máy, và cổng mà máy đó đang cắm. Mỗi khi có thư đi qua, nó nhìn địa chỉ NGƯỜI GỬI rồi ghi: 'à, máy này đang ở cổng 3'. Không ai khai báo cả — nó tự học từ chính dòng thư chạy qua mình.
  - **Đào sâu hơn:** Vì học từ địa chỉ người GỬI nên switch chỉ biết một máy sau khi máy đó đã gửi ít nhất một lần. Lá thư đầu tiên tới một máy còn im lặng luôn bị phát rộng ra mọi cổng — đó là lý do lần đầu bao giờ cũng 'ồn' hơn các lần sau.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Hai máy và một switch đang nằm rời trên bàn. Cắm dây cho chúng nói chuyện được với nhau, rồi bấm Gửi thử để xem switch học được gì.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** Máy A [192.168.1.10/24] · Máy B [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1, p4:VLAN 1] — dây: chưa cắm dây nào
    - **Mục tiêu:**
      - pc-a PHẢI gọi được pc-b
      - đường pc-a → pc-b phải qua sw-1
    - **Được phép:** cắm dây, gỡ dây
    - **Lời giải mẫu:** Máy A [192.168.1.10/24] · Máy B [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1, p4:VLAN 1] — dây: Máy A·eth0 — Switch-1·p1 | Máy B·eth0 — Switch-1·p2
  - **Chủ đề gợi ý (tầng 1):** đường mà thư phải đi để tới được máy kia
  - **Gợi ý (tầng 2):** Mỗi máy cần đúng một sợi dây nối tới một cổng còn trống của switch. Chọn thiết bị trên sơ đồ rồi bấm Nối dây ở bảng bên phải.
  - **Lời giải (tầng 3):** Cắm Máy A vào một cổng switch, Máy B vào một cổng khác. Khi bạn Gửi thử, để ý nhật ký: lần đầu switch phát rộng vì chưa biết ai ở đâu, sau đó nó gửi thẳng đúng một cổng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: switch nhìn vào địa chỉ NÀO trong lá thư để học ra 'máy này đang ở cổng nào'?
  - **Dạng:** gõ tay · **Chấp nhận:** địa chỉ nguồn | mac nguồn | địa chỉ người gửi | mac người gửi | địa chỉ gửi | nguồn
  - **Gợi ý (tầng 2):** Nó không đoán từ nơi thư định đến, mà từ nơi thư vừa đi ra.
  - **Lời giải (tầng 3):** Địa chỉ MAC của người GỬI. Thư đi vào cổng nào thì máy gửi đang ở cổng đó — switch ghi cặp đó vào sổ.
- **Tự giải thích:** Bằng lời của bạn: vì sao lá thư ĐẦU TIÊN gửi tới một máy thường bị switch phát ra mọi cổng, còn các lá sau thì không?
  - **Nhóm ý cần chạm:** [chưa biết, chưa học, chưa có trong sổ, chưa nhớ] · [phát ra mọi cổng, phát rộng, flood, tất cả các cổng] · [địa chỉ nguồn, người gửi, mac nguồn, khi trả lời, khi máy kia gửi]
  - **Trả lời mẫu:** Lúc đầu cuốn sổ của switch chưa có tên máy nhận, nên nó không biết đẩy ra cổng nào và đành phát ra mọi cổng. Nhưng khi máy nhận trả lời, thư của máy đó đi qua switch và nó nhìn địa chỉ người gửi để ghi vào sổ. Từ đó trở đi nó gửi thẳng đúng một cổng.

**6 · Tổng kết:**
- Switch tự học bằng cách nhìn địa chỉ NGƯỜI GỬI của mỗi lá thư đi qua.
- Cuốn sổ đó ghi hai cột: địa chỉ MAC và cổng mà máy đó đang cắm.
- Chưa có trong sổ thì nó phát ra mọi cổng — chỉ tốn đúng lần đầu.
- *Úp mở bài sau:* Có điều máy gửi lấy đâu ra địa chỉ MAC của máy nhận để ghi lên thư? Nó mới chỉ biết địa chỉ IP thôi. Bài sau: tiếng gọi giữa sân làng.

### Bài: Hỏi tên người giữ địa chỉ `m4-bai-3`

**1 · Khởi động (hook):** Bạn biết số nhà cần giao, nhưng thư lại phải đề tên người nhận mới trao tận tay được. Máy tính cũng vướng đúng chỗ này: nó biết địa chỉ IP, nhưng cần địa chỉ MAC. Nó hỏi ai?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: máy A muốn gửi cho địa chỉ 192.168.1.20 nhưng chưa biết MAC của máy đó. Nó làm gì?
  - **Dạng:** trắc nghiệm · **Hỏi to cả mạng: ai đang giữ 192.168.1.20?** ✓ / Gửi thư đi rồi hy vọng máy nào đó chuyển hộ / Tra một danh sách có sẵn trong máy từ lúc cài đặt
  - **Vì sao:** Nó hỏi to cả mạng. Câu hỏi được gửi tới mọi máy, và chỉ đúng máy đang giữ địa chỉ đó lên tiếng trả lời kèm MAC của mình.

**3 · Khám phá (teach):**
- *[arp]* ARP là tiếng gọi giữa sân làng: 'ai đang giữ địa chỉ 192.168.1.20 thì cho tôi biết tên với!'. Câu hỏi này gửi tới MỌI máy trong mạng. Chỉ đúng máy giữ địa chỉ đó trả lời, kèm địa chỉ MAC của nó. Hỏi xong máy nhớ luôn vào bộ nhớ tạm để lần sau khỏi hỏi lại.
  - **Đào sâu hơn:** Address Resolution Protocol — giao thức phân giải địa chỉ. Nó bắc cầu giữa hai tầng: IP là địa chỉ logic do người đặt, MAC là địa chỉ vật lý gắn với card mạng. Không có ARP thì biết số nhà cũng chẳng trao được thư.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Giao thức đi hỏi 'ai đang giữ địa chỉ IP này?' để lấy về địa chỉ MAC tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** arp
  - **Chủ đề gợi ý (tầng 1):** tiếng gọi giữa sân làng để tìm chủ của một địa chỉ
  - **Gợi ý (tầng 2):** Tên viết tắt gồm ba chữ cái, từ đầy đủ có nghĩa là 'phân giải địa chỉ'.
  - **Lời giải (tầng 3):** ARP. Nó hỏi to cả mạng 'ai giữ IP này?' và nhận về địa chỉ MAC của đúng máy đó.
- **Đề:** Máy A vừa hỏi ARP xong và đã biết MAC của máy B. Lát sau A gửi tiếp cho B thì sao?
  - **Dạng:** trắc nghiệm · Phải hỏi lại từ đầu mỗi lần gửi / **Dùng luôn địa chỉ đã nhớ, không cần hỏi nữa** ✓ / Hỏi switch thay vì hỏi cả mạng
  - **Gợi ý (tầng 2):** Hỏi xong rồi thì người ta thường làm gì với câu trả lời?
  - **Lời giải (tầng 3):** Dùng luôn cái đã nhớ. Máy giữ một bộ nhớ tạm các cặp IP–MAC, nên chỉ lần đầu mới phải hỏi.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: ARP dùng để tìm ra thứ gì?
  - **Dạng:** gõ tay · **Chấp nhận:** địa chỉ mac | mac | địa chỉ vật lý
  - **Gợi ý (tầng 2):** Nó bắt đầu từ địa chỉ IP và cần lấy về địa chỉ gắn cứng với card mạng.
  - **Lời giải (tầng 3):** Địa chỉ MAC — địa chỉ vật lý của máy đang giữ địa chỉ IP mà mình hỏi.
- **Tự giải thích:** Bằng lời của bạn: vì sao biết địa chỉ IP thôi vẫn chưa đủ để gửi thư trong cùng một mạng?
  - **Nhóm ý cần chạm:** [mac, địa chỉ vật lý, card mạng] · [ip, địa chỉ logic, số nhà] · [arp, hỏi, hỏi to, tìm ra]
  - **Trả lời mẫu:** Trong cùng một mạng, thư được trao tay theo địa chỉ MAC chứ không phải IP. Biết IP mới là biết số nhà, còn muốn trao tận tay thì phải biết tên chủ nhà. ARP chính là bước hỏi để đổi từ IP sang MAC, và máy nhớ lại câu trả lời cho những lần sau.

**6 · Tổng kết:**
- ARP hỏi cả mạng 'ai giữ địa chỉ IP này?' và nhận về địa chỉ MAC.
- Chỉ đúng máy giữ địa chỉ đó lên tiếng; các máy khác im lặng bỏ qua.
- Hỏi một lần rồi nhớ, những lần sau khỏi hỏi lại.
- *Úp mở bài sau:* Tiếng gọi ARP lan tới mọi máy trong mạng. Nhưng nếu công ty muốn kế toán và kỹ thuật không nghe thấy nhau, dù cắm chung một switch, thì làm thế nào? Bài sau mình dựng một bức tường.

### Bài: Dựng tường ngăn giữa hai xóm `m4-bai-4`

**1 · Khởi động (hook):** Hai máy cắm chung một switch, địa chỉ cùng một dải, dây cắm chắc chắn — mà vẫn không gọi được nhau. Không hỏng gì cả. Vậy ai đang chắn đường?

**2 · Đoán thử (pretest):**
- **Đề:** Đây chính là ca đó: Máy A không gọi được Máy B dù nhìn đâu cũng thấy đúng. Cứ vọc thử xem — bấm Gửi thử, đọc nhật ký, và thử sửa nếu bạn đoán ra. Phần này không tính điểm, mình chỉ muốn bạn chạm tay vào vấn đề trước khi đọc lý thuyết.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** Máy A [192.168.1.10/24] · Máy B [192.168.1.20/24] · Switch-1 [p1:VLAN 10, p2:VLAN 20] — dây: Máy A·eth0 — Switch-1·p1 | Máy B·eth0 — Switch-1·p2
    - **Mục tiêu:**
      - pc-a PHẢI gọi được pc-b
    - **Được phép:** đổi VLAN
    - **Lời giải mẫu:** Máy A [192.168.1.10/24] · Máy B [192.168.1.20/24] · Switch-1 [p1:VLAN 10, p2:VLAN 10] — dây: Máy A·eth0 — Switch-1·p1 | Máy B·eth0 — Switch-1·p2
  - **Vì sao:** Thủ phạm là con số VLAN trên từng cổng switch: cổng của Máy A ghi 10, cổng của Máy B ghi 20. Switch coi hai con số đó là hai mạng hoàn toàn tách rời, nên tiếng gọi ARP của A không bao giờ tới tai B. Ngay sau đây mình sẽ xem VLAN là gì.

**3 · Khám phá (teach):**
- *[vlan]* VLAN là bức tường vô hình dựng bên trong switch. Mỗi cổng được gán một số VLAN, và switch chỉ chuyển thư giữa những cổng CÙNG SỐ. Một switch 24 cổng gán hai số khác nhau thì hoạt động y như hai switch riêng biệt đặt cạnh nhau — dù bên ngoài vẫn là một cái hộp.
  - **Đào sâu hơn:** Virtual LAN — mạng cục bộ ảo. Người ta dùng nó để tách phòng ban, tách máy khách khỏi máy nội bộ, tách camera khỏi máy nhân viên. Tách bằng phần mềm nên đổi lại chỉ mất vài giây, không phải đi kéo lại dây.
- *[mien-quang-ba]* Tiếng gọi ARP lan tới đâu thì miền quảng bá rộng tới đó — và nó dừng lại đúng ở bức tường VLAN. Đây là lý do sâu xa khiến hai máy khác VLAN không thấy nhau: không phải thư bị chặn, mà là câu hỏi 'ai giữ địa chỉ này?' không bao giờ tới tai người kia.
  - **Đào sâu hơn:** Mạng càng đông máy trong một miền quảng bá, tiếng ồn nền càng lớn vì mọi máy đều phải nghe mọi tiếng gọi. Chia VLAN vừa để cách ly về bảo mật, vừa để cắt bớt tiếng ồn đó.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Công ty có hai phòng: kế toán (Máy A, Máy B) và kỹ thuật (Máy C, Máy D). Hai máy kế toán PHẢI gọi được nhau, còn kế toán và kỹ thuật thì KHÔNG được thấy nhau. Sửa lại cho đúng cả hai yêu cầu.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** Máy A (kế toán) [192.168.1.10/24] · Máy B (kế toán) [192.168.1.20/24] · Máy C (kỹ thuật) [192.168.1.30/24] · Máy D (kỹ thuật) [192.168.1.40/24] · Switch-1 [p1:VLAN 10, p2:VLAN 20, p3:VLAN 20, p4:VLAN 20] — dây: Máy A (kế toán)·eth0 — Switch-1·p1 | Máy B (kế toán)·eth0 — Switch-1·p2 | Máy C (kỹ thuật)·eth0 — Switch-1·p3 | Máy D (kỹ thuật)·eth0 — Switch-1·p4
    - **Mục tiêu:**
      - pc-a PHẢI gọi được pc-b
      - pc-a phải KHÔNG gọi được pc-c
    - **Được phép:** đổi VLAN
    - **Lời giải mẫu:** Máy A (kế toán) [192.168.1.10/24] · Máy B (kế toán) [192.168.1.20/24] · Máy C (kỹ thuật) [192.168.1.30/24] · Máy D (kỹ thuật) [192.168.1.40/24] · Switch-1 [p1:VLAN 10, p2:VLAN 10, p3:VLAN 20, p4:VLAN 20] — dây: Máy A (kế toán)·eth0 — Switch-1·p1 | Máy B (kế toán)·eth0 — Switch-1·p2 | Máy C (kỹ thuật)·eth0 — Switch-1·p3 | Máy D (kỹ thuật)·eth0 — Switch-1·p4
  - **Chủ đề gợi ý (tầng 1):** con số VLAN trên từng cổng, và yêu cầu THỨ HAI của đề
  - **Gợi ý (tầng 2):** Máy A đang ở VLAN 10 một mình. Kéo cổng của Máy B về cùng số với A. Nhưng coi chừng: nếu gộp luôn cả C và D vào đó thì yêu cầu 'kế toán và kỹ thuật không được thấy nhau' sẽ hỏng.
  - **Lời giải (tầng 3):** Đặt cổng của Máy B về VLAN 10 cho khớp Máy A, giữ nguyên C và D ở VLAN 20. Gộp tất cả vào một VLAN cũng làm A gọi được B — nhưng nó phá mất yêu cầu tách hai phòng ban, nên chỉ đúng một nửa là chưa đạt.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: cách chia một switch thành nhiều mạng tách biệt bằng phần mềm gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** vlan | mạng lan ảo | lan ảo
  - **Gợi ý (tầng 2):** Bốn chữ cái, chữ đầu là chữ V — nghĩa là 'ảo'.
  - **Lời giải (tầng 3):** VLAN. Mỗi cổng mang một số VLAN, và switch chỉ chuyển thư giữa các cổng cùng số.
- **Tự giải thích:** Bằng lời của bạn: vì sao hai máy cùng dải địa chỉ, cắm chung một switch, mà vẫn không gọi được nhau?
  - **Nhóm ý cần chạm:** [vlan, số vlan, hai xóm, bức tường] · [khác nhau, hai số, không cùng, khác vlan] · [tách, hai mạng riêng, không thấy, không tới, chặn, không nghe]
  - **Trả lời mẫu:** Vì hai cổng của chúng được gán hai số VLAN khác nhau. Switch coi mỗi số là một mạng riêng, nên nó không chuyển thư qua lại giữa hai bên — kể cả tiếng gọi ARP cũng dừng ở bức tường đó. Địa chỉ IP nhìn có vẻ hợp lý nhưng không cứu được, vì rào cản nằm ở tầng dưới.

**6 · Tổng kết:**
- VLAN là bức tường vô hình trong switch: cổng chỉ nói chuyện với cổng cùng số.
- Một switch chia VLAN hoạt động như nhiều switch riêng đặt cạnh nhau.
- Tiếng gọi ARP dừng lại ở tường — nên hai bên không hề biết nhau tồn tại.
- *Úp mở bài sau:* Tách xong rồi, nhưng kế toán vẫn cần gửi báo cáo cho kỹ thuật. Ai được phép bắc cầu qua bức tường vừa dựng? Bài cuối module.

### Bài: Bắc cầu giữa hai mạng `m4-bai-5`

**1 · Khởi động (hook):** Switch chỉ chuyển thư trong cùng một mạng, và VLAN còn dựng thêm tường. Vậy khi cần gửi từ mạng này sang mạng kia, ai đứng ra làm cầu?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: gói tin đi từ mạng 192.168.1.x sang mạng 10.0.0.x qua router. Cái gì thay đổi trên đường đi?
  - **Dạng:** trắc nghiệm · Địa chỉ IP đích đổi theo từng chặng / **Địa chỉ MAC đổi từng chặng, còn IP giữ nguyên** ✓ / Không có gì đổi cả
  - **Vì sao:** MAC đổi, IP giữ nguyên. MAC là địa chỉ trao tay giữa hai thiết bị cạnh nhau nên mỗi chặng một khác; còn IP là địa chỉ đầu–cuối, nó phải giữ nguyên thì gói mới biết đích đến cuối cùng ở đâu.

**3 · Khám phá (teach):**
- *[dinh-tuyen]* Router là cây cầu giữa hai mạng khác dải địa chỉ. Nó có một chân cắm ở mỗi bên, mỗi chân mang một địa chỉ IP thuộc mạng bên đó. Nhận gói từ bên này, nó đọc địa chỉ đích, tra bảng định tuyến xem nên đẩy sang chân nào, rồi đóng gói lại và trao tay tiếp.
  - **Đào sâu hơn:** Mỗi lần trao tay, router thay địa chỉ MAC nguồn và đích thành cặp mới của chặng kế — nhưng địa chỉ IP nguồn và đích thì giữ y nguyên từ đầu đến cuối. Đó là lý do người ta nói MAC là địa chỉ 'chặng', còn IP là địa chỉ 'chuyến'.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Thiết bị nối HAI mạng khác dải địa chỉ với nhau và chuyển gói giữa chúng gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** router | bộ định tuyến
  - **Chủ đề gợi ý (tầng 1):** cây cầu giữa hai dải địa chỉ khác nhau
  - **Gợi ý (tầng 2):** Ở Module 1 mình từng gọi nó là bưu tá liên tỉnh; tên tiếng Anh của nó cũng là tên cục thiết bị phát wifi ở nhà bạn.
  - **Lời giải (tầng 3):** Router. Mỗi chân của nó nằm ở một mạng, và nó tra bảng định tuyến để biết đẩy gói sang chân nào.
- **Đề:** Gói tin vừa được router chuyển sang mạng bên kia. So với lúc mới rời máy gửi, cái gì đã khác?
  - **Dạng:** trắc nghiệm · Địa chỉ IP đích / **Địa chỉ MAC nguồn và đích** ✓ / Cả IP lẫn MAC đều đổi
  - **Gợi ý (tầng 2):** Cái nào là địa chỉ của chặng trước mắt, cái nào là địa chỉ của cả chuyến đi?
  - **Lời giải (tầng 3):** Chỉ cặp địa chỉ MAC đổi — vì mỗi chặng là một lần trao tay giữa hai thiết bị cạnh nhau. Địa chỉ IP giữ nguyên suốt chuyến để gói không quên đích đến.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: khi gói tin đi qua router, địa chỉ nào GIỮ NGUYÊN suốt chuyến?
  - **Dạng:** gõ tay · **Chấp nhận:** địa chỉ ip | ip | ip nguồn và đích | địa chỉ ip đích
  - **Gợi ý (tầng 2):** Địa chỉ của cả chuyến đi, không phải của từng chặng trao tay.
  - **Lời giải (tầng 3):** Địa chỉ IP. MAC đổi ở từng chặng vì nó chỉ dùng để trao tay giữa hai thiết bị cạnh nhau.
- **Tự giải thích:** Bằng lời của bạn: vì sao qua mỗi router thì địa chỉ MAC đổi mà địa chỉ IP lại không?
  - **Nhóm ý cần chạm:** [mac, địa chỉ vật lý] · [từng chặng, trao tay, hai thiết bị cạnh nhau, mỗi chặng] · [ip, địa chỉ ip] · [đầu cuối, giữ nguyên, đích cuối, cả chuyến, không đổi]
  - **Trả lời mẫu:** MAC chỉ có nghĩa giữa hai thiết bị nằm cạnh nhau trên cùng một chặng, nên mỗi lần trao tay là một cặp MAC mới. Còn IP là địa chỉ của cả chuyến đi từ máy gửi tới máy nhận — nếu router sửa nó thì gói sẽ quên mất mình đang đi đâu.

**6 · Tổng kết:**
- Router là cây cầu giữa hai mạng khác dải, mỗi chân nằm ở một bên.
- Nó tra bảng định tuyến để biết nên đẩy gói ra chân nào.
- MAC đổi ở từng chặng trao tay; IP giữ nguyên suốt chuyến.
- *Úp mở bài sau:* Bài kiểm tra Module 4 đang đợi — và câu cuối là một phòng lab thật. Vượt qua rồi, Module 5 sẽ mở cánh cửa TCP, UDP và những con số cổng mà bạn đã gặp thoáng qua từ Module 1.

### Khái niệm & flashcard (6)

- **Switch** `switch` — Bộ chuyển mạch — thiết bị nối nhiều máy trong cùng một mạng
  - Ẩn dụ: Switch như bưu cục giữa làng: thay vì mỗi nhà tự chạy sang nhà kia, mọi lá thư đưa vào bưu cục rồi được chuyển tới đúng nhà.
  - Thẻ ôn: *Switch làm nhiệm vụ gì?* → Nối nhiều máy trong CÙNG một mạng và chuyển thư tới đúng cổng của máy nhận — mỗi máy chỉ cần một sợi dây cắm vào nó.
- **MAC address table** `mac-table` — Bảng MAC — cuốn sổ switch ghi 'máy nào đang ở cổng nào'
  - Ẩn dụ: Như cuốn sổ của bác bảo vệ chung cư: ai vừa đi qua cửa nào thì ghi lại, lần sau khỏi phải hỏi cả tòa nhà.
  - Thẻ ôn: *Switch học bảng MAC bằng cách nào?* → Nhìn địa chỉ MAC NGƯỜI GỬI của mỗi lá thư đi qua rồi ghi lại 'máy này ở cổng đó'. Chưa có trong sổ thì nó phát ra mọi cổng.
- **ARP** `arp` — Address Resolution Protocol — giao thức đổi địa chỉ IP thành địa chỉ MAC
  - Ẩn dụ: Như đứng giữa sân hỏi to: 'ai đang ở số nhà 20 thế?' — đúng người đó lên tiếng, còn lại im lặng.
  - Thẻ ôn: *ARP dùng để làm gì?* → Hỏi cả mạng 'ai đang giữ địa chỉ IP này?' để lấy về địa chỉ MAC của máy đó — vì trong cùng một mạng, thư được trao tay theo MAC.
- **VLAN** `vlan` — Virtual LAN — mạng cục bộ ảo, chia một switch thành nhiều mạng tách biệt
  - Ẩn dụ: Như dựng tường ngăn giữa tòa nhà: vẫn một tòa, nhưng hai bên không qua lại được với nhau.
  - Thẻ ôn: *VLAN là gì?* → Cách chia một switch thành nhiều mạng tách biệt bằng phần mềm: mỗi cổng mang một số VLAN, và switch chỉ chuyển thư giữa các cổng cùng số.
- **Broadcast domain** `mien-quang-ba` — Miền quảng bá — vùng mà một tiếng gọi chung lan tới được
  - Ẩn dụ: Như tiếng loa phường: nghe được tới đâu thì miền tới đó, và nó dừng lại ở bức tường.
  - Thẻ ôn: *Miền quảng bá là gì, và VLAN ảnh hưởng thế nào tới nó?* → Là vùng mà một tiếng gọi chung (như ARP) lan tới được. Mỗi VLAN là một miền quảng bá riêng — tiếng gọi dừng ở ranh giới VLAN.
- **Routing** `dinh-tuyen` — Định tuyến — việc router chọn đường đẩy gói sang mạng khác
  - Ẩn dụ: Như cây cầu giữa hai bờ: mỗi chân cầu đặt ở một bờ, và người gác cầu quyết định cho đi hướng nào.
  - Thẻ ôn: *Khi gói tin đi qua router, địa chỉ nào đổi và địa chỉ nào giữ nguyên?* → MAC đổi ở từng chặng (nó chỉ dùng để trao tay giữa hai thiết bị cạnh nhau), còn IP nguồn và đích giữ nguyên suốt chuyến.

### Bài kiểm tra module (8 câu, cần ≥ 85%)

- **Đề:** Văn phòng mới có 12 máy cần nói chuyện với nhau. Cách nối tiết kiệm dây nhất là gì?
  - **Dạng:** trắc nghiệm · Nối thẳng từng cặp máy với nhau / **Mỗi máy một sợi cắm vào switch** ✓ / Nối vòng tròn, máy này sang máy kia
  - **Vì sao:** Mỗi máy một sợi vào switch: 12 sợi. Nối thẳng từng cặp cần tới 66 sợi, còn nối vòng tròn thì đứt một chỗ là chia đôi cả mạng.
- **Đề:** Switch ghi vào cuốn sổ của nó hai thứ: cổng, và cái gì nữa?
  - **Dạng:** gõ tay · **Chấp nhận:** địa chỉ mac | mac | địa chỉ vật lý
  - **Vì sao:** Địa chỉ MAC. Cuốn sổ đó tên là bảng MAC, ghi cặp 'địa chỉ MAC — cổng đang cắm'.
- **Đề:** Switch nhận một lá thư gửi tới địa chỉ MAC mà nó CHƯA có trong sổ. Nó làm gì?
  - **Dạng:** trắc nghiệm · Bỏ lá thư đi / **Đẩy ra mọi cổng còn lại** ✓ / Giữ lại chờ tới khi biết đường
  - **Vì sao:** Đẩy ra mọi cổng còn lại. Cách này hơi phí nhưng bảo đảm thư tới nơi, và ngay sau đó switch học được đường nhờ thư trả lời.
- **Đề:** Máy biết địa chỉ IP của máy kia nhưng chưa biết địa chỉ MAC. Nó dùng giao thức nào để hỏi?
  - **Dạng:** gõ tay · **Chấp nhận:** arp
  - **Vì sao:** ARP — nó hỏi to cả mạng 'ai đang giữ địa chỉ IP này?' và đúng máy đó trả lời kèm MAC của mình.
- **Đề:** Hai máy cắm chung một switch, địa chỉ đều thuộc dải 192.168.1.x, dây cắm tốt. Chúng vẫn không ping được nhau. Nghi ngờ đầu tiên nên là gì?
  - **Dạng:** trắc nghiệm · **Hai cổng đang ở hai VLAN khác nhau** ✓ / Switch bị hỏng / Địa chỉ IP đặt sai dải
  - **Vì sao:** VLAN khác nhau là nghi ngờ số một: mọi thứ nhìn đều đúng, nhưng switch coi hai số VLAN là hai mạng riêng nên tiếng gọi ARP không qua được.
- **Đề:** Thiết bị nối hai mạng khác dải địa chỉ và chuyển gói giữa chúng tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** router | bộ định tuyến
  - **Vì sao:** Router. Mỗi chân của nó nằm ở một mạng, và nó tra bảng định tuyến để biết đẩy gói sang chân nào.
- **Đề:** Gói tin đi từ máy A qua hai router rồi tới máy B. Trên đường đi, thứ gì KHÔNG đổi?
  - **Dạng:** trắc nghiệm · Địa chỉ MAC nguồn / Địa chỉ MAC đích / **Địa chỉ IP nguồn và đích** ✓
  - **Vì sao:** Cặp địa chỉ IP giữ nguyên suốt chuyến vì đó là địa chỉ đầu–cuối. Hai địa chỉ MAC thì đổi mới ở từng chặng trao tay.
- **Đề:** Câu cuối là một ca thật: cả ba máy đang chung một VLAN nên máy khách (Máy K) nhìn thấy luôn hai máy nội bộ. Hãy tách Máy K ra, nhưng giữ hai máy nội bộ vẫn nói chuyện được với nhau.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** Máy nội bộ A [192.168.5.10/24] · Máy nội bộ B [192.168.5.20/24] · Máy khách K [192.168.5.30/24] · Switch-1 [p1:VLAN 10, p2:VLAN 10, p3:VLAN 10] — dây: Máy nội bộ A·eth0 — Switch-1·p1 | Máy nội bộ B·eth0 — Switch-1·p2 | Máy khách K·eth0 — Switch-1·p3
    - **Mục tiêu:**
      - pc-a PHẢI gọi được pc-b
      - pc-a phải KHÔNG gọi được pc-k
    - **Được phép:** đổi VLAN
    - **Lời giải mẫu:** Máy nội bộ A [192.168.5.10/24] · Máy nội bộ B [192.168.5.20/24] · Máy khách K [192.168.5.30/24] · Switch-1 [p1:VLAN 10, p2:VLAN 10, p3:VLAN 99] — dây: Máy nội bộ A·eth0 — Switch-1·p1 | Máy nội bộ B·eth0 — Switch-1·p2 | Máy khách K·eth0 — Switch-1·p3
  - **Vì sao:** Chuyển cổng của Máy khách K sang một số VLAN khác (ví dụ 99) là đủ: nó bị tách khỏi miền quảng bá của hai máy nội bộ, trong khi A và B vẫn cùng VLAN 10 nên vẫn gọi được nhau.

## TCP, UDP và Port — Cửa nào của ngôi nhà `module-5`

Phần B · 5 chặng · 8 bài · 11 khái niệm

**Chặng:** Bắt tay rồi mới nói (m5-bai-1) → Nhanh hay chắc (m5-bai-2) → Số nhà của dịch vụ (m5-bai-3) → Đi tour tòa nhà (m5-bai-4, m5-bai-5, m5-bai-6) → Lên nóc tòa nhà (m5-bai-7, m5-bai-8)

### Cung điện ký ức: Tòa nhà 15 phòng `m5-cung-dien-port` (15 phòng)

- `m5-r-http` — tầng 1 phòng 1 · 80 · HTTP · hình `palace-door-open` — Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.
- `m5-r-https` — tầng 1 phòng 2 · 443 · HTTPS · hình `palace-golden-lock` — Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.
- `m5-r-dns` — tầng 1 phòng 3 · 53 · DNS · hình `palace-phonebook` — Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.
- `m5-r-ssh` — tầng 2 phòng 1 · 22 · SSH · hình `palace-seashell` — Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.
- `m5-r-telnet` — tầng 2 phòng 2 · 23 · Telnet · hình `palace-glass-wall` — Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.
- `m5-r-rdp` — tầng 2 phòng 3 · 3389 · RDP · hình `palace-mirror-screen` — Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.
- `m5-r-smb` — tầng 3 phòng 1 · 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
- `m5-r-ftp` — tầng 3 phòng 2 · 21 · FTP · hình `palace-conveyor` — Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.
- `m5-r-mysql` — tầng 3 phòng 3 · 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
- `m5-r-smtp` — tầng 4 phòng 1 · 25 · SMTP · hình `palace-mailbox` — Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.
- `m5-r-submission` — tầng 4 phòng 2 · 587 · Mail Submission · hình `palace-id-check` — Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.
- `m5-r-ntp` — tầng 4 phòng 3 · 123 · NTP · hình `palace-big-clock` — Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.
- `m5-r-ldap` — tầng 5 phòng 1 · 389 · LDAP · hình `palace-registry-book` — Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.
- `m5-r-ldaps` — tầng 5 phòng 2 · 636 · LDAPS · hình `palace-safe-book` — Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.
- `m5-r-dhcp` — tầng 5 phòng 3 · 67/68 · DHCP · hình `palace-key-pair` — Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.

### Bài: Bắt tay ba nhịp trước khi nói chuyện `m5-bai-1`

**1 · Khởi động (hook):** Trước khi bạn kịp thấy chữ đầu tiên của một trang web, máy bạn và máy chủ đã trao đổi xong ba gói tin ngắn. Ba gói đó nói gì với nhau, và vì sao thiếu một gói là cả cuộc trò chuyện không bắt đầu được?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: trước khi gửi dữ liệu thật, TCP làm gì đầu tiên?
  - **Dạng:** trắc nghiệm · Gửi luôn dữ liệu, hỏng đâu sửa đó / **Trao đổi vài gói tin ngắn để hai bên xác nhận đã sẵn sàng** ✓ / Hỏi router xem đường có thông không
  - **Vì sao:** TCP mở đầu bằng ba gói tin ngắn — cái bắt tay — để hai bên xác nhận nghe được nhau trước khi tốn công gửi dữ liệu thật.

**3 · Khám phá (teach):**
- *[m5-tcp]* TCP là kiểu gửi thư BẢO ĐẢM: mỗi gói tin được đánh số, bên nhận phải báo đã nhận, thiếu gói nào bên gửi gửi lại đúng gói đó. Chậm hơn một nhịp, nhưng dữ liệu tới nơi đủ và đúng thứ tự.
  - **Đào sâu hơn:** Bên nhận báo bằng gói ACK kèm số thứ tự nó đang chờ. Bên gửi không đợi từng gói một mà gửi trước cả một cụm rồi mới chờ báo — cụm đó gọi là cửa sổ, và nó co giãn theo tình trạng đường truyền.
- *[m5-bat-tay]* Cái bắt tay có ba nhịp: máy bạn gửi SYN ("tôi muốn nói chuyện"), máy chủ đáp SYN-ACK, rồi máy bạn gửi ACK. Nhịp giữa là nhịp DUY NHẤT mang hai vai một lúc — vừa trả lời câu hỏi của bạn, vừa hỏi ngược lại — nên nó cũng là nhịp hay bị nhớ nhầm thứ tự nhất.
  - **Đào sâu hơn:** Vì sao cần đủ ba nhịp: sau nhịp hai thì mới chỉ MÁY BẠN biết chắc cả hai chiều đều thông. Nhịp ba là để máy chủ cũng biết điều đó. Thiếu nó, máy chủ phải giữ nửa kết nối chờ vô thời hạn — đúng chỗ mà kiểu tấn công SYN flood nhắm vào.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Ví dụ giải sẵn: bạn mở một trang web. Máy bạn gửi SYN → máy chủ đáp SYN-ACK → máy bạn gửi ACK. Xong ba nhịp, kết nối mới mở và trình duyệt mới bắt đầu tải trang. Đọc lại một lượt rồi tự gọi tên nhịp giữa xem nhé.
- **Đề:** Nhịp giữa của cái bắt tay ba bước tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** syn-ack | syn ack | synack
  - **Chủ đề gợi ý (tầng 1):** nhịp vừa trả lời vừa hỏi ngược lại
  - **Gợi ý (tầng 2):** Nó là một gói duy nhất nhưng ghép tên của hai gói kia lại.
  - **Lời giải (tầng 3):** Đó là SYN-ACK: máy chủ vừa xác nhận đã nghe thấy bạn (ACK), vừa hỏi ngược lại để mở chiều còn lại (SYN).

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: xếp ba nhịp của cái bắt tay theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Máy bạn gửi SYN — "tôi muốn mở kết nối"
    2. Máy chủ đáp SYN-ACK — "nghe rồi, và tôi cũng muốn mở chiều ngược lại"
    3. Máy bạn gửi ACK — "rõ, bắt đầu thôi"
  - **Chủ đề gợi ý (tầng 1):** ai là người mở lời trước
  - **Gợi ý (tầng 2):** Người gõ địa chỉ trang web là người mở lời — và cũng là người chốt câu cuối.
  - **Lời giải (tầng 3):** SYN → SYN-ACK → ACK. Máy bạn mở lời, máy chủ đáp bằng gói mang hai vai, máy bạn chốt lại.
- **Đề:** Giao thức gửi kiểu "thư bảo đảm" — đánh số từng gói, thiếu là đòi gửi lại — tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** tcp
  - **Chủ đề gợi ý (tầng 1):** giao thức lo chuyện đủ và đúng thứ tự
  - **Gợi ý (tầng 2):** Ba chữ cái, và nó chính là chữ đầu trong cụm "TCP/IP" bạn hay thấy.
  - **Lời giải (tầng 3):** Đó là TCP — nó lo cho dữ liệu tới đủ và đúng thứ tự, còn IP lo chuyện tìm đường.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao phải bắt tay ba nhịp thay vì gửi luôn dữ liệu?
  - **Nhóm ý cần chạm:** [sẵn sàng, xác nhận, đồng ý, chắc chắn] · [hai chiều, cả hai bên, hai bên, ngược lại]
  - **Trả lời mẫu:** Ba nhịp để cả hai bên cùng biết chắc đường đi VÀ đường về đều thông, rồi mới tốn công gửi dữ liệu thật; gửi bừa mà bên kia chưa sẵn sàng thì mất công gửi lại từ đầu.

**6 · Tổng kết:**
- TCP là thư bảo đảm: đánh số, báo nhận, thiếu thì gửi lại.
- Kết nối mở bằng ba nhịp SYN → SYN-ACK → ACK.
- Nhịp giữa SYN-ACK mang hai vai — đó là nhịp hay bị nhớ nhầm.
- *Úp mở bài sau:* Nhưng xem bóng đá trực tuyến mà cứ dừng lại đòi gửi lại từng khung hình thì còn gì là trận đấu? Bài sau mình gặp kẻ chịu mất để đổi lấy nhanh.

### Bài: Chọn giữa nhanh và chắc `m5-bai-2`

**1 · Khởi động (hook):** Khi bạn gọi video, một mẩu tiếng bị rớt thì thà mất luôn còn hơn dừng cả cuộc gọi để chờ gửi lại. Vậy có giao thức nào cố tình KHÔNG bảo đảm không?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: gọi video và chơi game trực tuyến thường dùng giao thức nào?
  - **Dạng:** trắc nghiệm · TCP / **UDP** ✓
  - **Vì sao:** UDP: gói nào rớt thì thôi, không dừng lại đòi gửi lại — đổi một chút chất lượng lấy độ trễ thấp.

**3 · Khám phá (teach):**
- *[m5-udp]* UDP là gửi thư THƯỜNG: không bắt tay, không đánh số, không đòi lại. Gói tới được thì tới, rớt thì thôi. Đổi lại, nó không có nhịp chờ nào — thứ mà cuộc gọi và trận game cần hơn là sự hoàn hảo.
  - **Đào sâu hơn:** DNS cũng chọn UDP: một câu hỏi, một câu trả lời, gọn trong một gói. Bắt tay ba nhịp chỉ để hỏi một câu ngắn thì phần thủ tục còn dài hơn phần nội dung — mất công hơn là hỏi lại khi lỡ rớt.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Giao thức chấp nhận mất gói để đổi lấy độ trễ thấp tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** udp
  - **Chủ đề gợi ý (tầng 1):** kiểu gửi không đòi báo nhận
  - **Gợi ý (tầng 2):** Ba chữ cái, và nó là kẻ đối lập của TCP trong chuyện bảo đảm.
  - **Lời giải (tầng 3):** Đó là UDP — gửi xong là xong, không chờ báo nhận, không gửi lại.
- **Đề:** Tải một tệp cài đặt 2GB thì nên đi bằng giao thức nào?
  - **Dạng:** trắc nghiệm · **TCP — thiếu một mẩu là tệp hỏng, phải bảo đảm** ✓ / UDP — cho nhanh
  - **Chủ đề gợi ý (tầng 1):** hậu quả khi mất một mẩu dữ liệu
  - **Gợi ý (tầng 2):** Thử hỏi: mất một khung hình trong cuộc gọi thì sao, mất một mẩu trong tệp cài đặt thì sao?
  - **Lời giải (tầng 3):** TCP. Với tệp, thiếu một mẩu là hỏng cả tệp — nên phải chọn kiểu bảo đảm dù chậm hơn.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: giao thức nào KHÔNG bắt tay, không đánh số, không gửi lại gói rớt?
  - **Dạng:** gõ tay · **Chấp nhận:** udp
  - **Chủ đề gợi ý (tầng 1):** kiểu gửi thư thường
  - **Gợi ý (tầng 2):** Nó là lựa chọn của cuộc gọi video và trận game.
  - **Lời giải (tầng 3):** UDP — bỏ hết thủ tục để không có nhịp chờ nào.
- **Tự giải thích:** Giải thích bằng lời của bạn: khi nào nên chọn TCP, khi nào nên chọn UDP?
  - **Nhóm ý cần chạm:** [đủ, chính xác, bảo đảm, không mất, gửi lại] · [nhanh, độ trễ, thời gian thực, trực tiếp]
  - **Trả lời mẫu:** Việc nào mà thiếu một mẩu là hỏng cả — tải tệp, mở trang web, gửi thư — thì chọn TCP vì nó gửi lại phần thiếu. Việc nào mà chậm một nhịp còn tệ hơn mất một mẩu — gọi video, chơi game, hỏi DNS — thì chọn UDP.

**6 · Tổng kết:**
- UDP bỏ hết thủ tục: không bắt tay, không báo nhận, không gửi lại.
- Mất gói với UDP là chuyện bình thường, đổi lại là không có nhịp chờ.
- Chọn theo hậu quả: thiếu một mẩu là hỏng thì TCP, chậm một nhịp là hỏng thì UDP.
- *Úp mở bài sau:* Cả hai đều phải ghi một con số lên phong bì để biết giao cho ứng dụng nào. Con số đó có luật chơi riêng — bài sau mình mở ra xem.

### Bài: Đọc luật của những con số cổng `m5-bai-3`

**1 · Khởi động (hook):** Máy chủ web luôn ngồi ở cổng 443 không bao giờ đổi, còn máy bạn thì mỗi lần mở một trang lại dùng một số cổng khác. Vì sao một bên cố định, một bên đổi liên tục?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: số cổng nằm trong khoảng nào?
  - **Dạng:** trắc nghiệm · 0 đến 255 / **0 đến 65535** ✓ / 0 đến vô hạn
  - **Vì sao:** Cổng là số 16 bit nên chạy từ 0 đến 65535 — đúng bằng số căn hộ tối đa của "chung cư" một địa chỉ IP.

**3 · Khám phá (teach):**
- *[m5-cong-noi-tieng]* Dải 0-1023 là những cổng NỔI TIẾNG: mỗi số được cả thế giới quy ước dành cho một dịch vụ. Máy chủ phải ngồi đúng số đó, vì người tới gõ cửa cần biết trước phải gõ ở đâu — không ai đi hỏi từng nhà xem web nằm ở cửa số mấy.
  - **Đào sâu hơn:** Trên Linux và các hệ họ Unix, chỉ tài khoản quản trị mới mở được cổng dưới 1024. Đó là lớp bảo vệ cũ nhưng vẫn còn: một chương trình bất kỳ không tự nhận mình là máy chủ web của cả máy được.
- *[m5-cong-tam-thoi]* Phía bạn thì ngược lại: mỗi lần mở một kết nối, hệ điều hành cấp cho nó một cổng TẠM THỜI lấy từ dải số lớn. Nhờ vậy mở mười tab cùng lúc vẫn không lẫn — mười cổng khác nhau, mười cuộc trò chuyện riêng.
  - **Đào sâu hơn:** Một kết nối được nhận diện bằng bốn thứ: IP nguồn, cổng nguồn, IP đích, cổng đích. Chỉ cần một trong bốn khác đi là một cuộc trò chuyện khác — đó là lý do một máy chủ ở cổng 443 phục vụ được hàng nghìn người cùng lúc.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Dải cổng 0-1023 được gọi là dải cổng gì? (nói bằng tiếng Việt cũng được)
  - **Dạng:** gõ tay · **Chấp nhận:** nổi tiếng | noi tieng | well-known | well known | cổng nổi tiếng | cong noi tieng
  - **Chủ đề gợi ý (tầng 1):** vì sao máy chủ phải ngồi đúng số quy ước
  - **Gợi ý (tầng 2):** Cả thế giới đã quy ước sẵn nên ai cũng biết — bởi vậy mới gọi tên như thế.
  - **Lời giải (tầng 3):** Đó là dải cổng nổi tiếng (well-known): mỗi số đã có chủ theo quy ước chung, ví dụ 443 của HTTPS.
- **Đề:** Bạn mở ba tab cùng vào một trang web. Ba kết nối đó khác nhau ở chỗ nào?
  - **Dạng:** trắc nghiệm · **Khác cổng TẠM THỜI phía máy bạn** ✓ / Khác cổng phía máy chủ / Khác địa chỉ IP của máy bạn
  - **Chủ đề gợi ý (tầng 1):** bên nào là bên đổi số mỗi lần mở kết nối
  - **Gợi ý (tầng 2):** Máy chủ vẫn ngồi nguyên ở 443 — vậy thứ phải khác nhau nằm ở đầu bên kia.
  - **Lời giải (tầng 3):** Ba tab dùng ba cổng tạm thời khác nhau ở phía máy bạn; máy chủ vẫn ở nguyên cổng 443.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: số cổng lớn nhất có thể là bao nhiêu?
  - **Dạng:** gõ tay · **Chấp nhận:** 65535
  - **Chủ đề gợi ý (tầng 1):** sức chứa của một con số 16 bit
  - **Gợi ý (tầng 2):** Đếm từ 0, và tổng cộng có 65536 chỗ.
  - **Lời giải (tầng 3):** 65535 — cổng là số 16 bit nên đánh số từ 0 đến 65535.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao máy chủ phải ngồi cổng cố định còn máy bạn thì không?
  - **Nhóm ý cần chạm:** [biết trước, quy ước, cố định, tìm được] · [nhiều kết nối, nhiều tab, phân biệt, không lẫn]
  - **Trả lời mẫu:** Máy chủ ngồi cố định để ai cũng biết trước phải gõ cửa số mấy; máy bạn mỗi kết nối lấy một cổng tạm thời khác nhau để mở nhiều tab cùng lúc mà dữ liệu không lẫn vào nhau.

**6 · Tổng kết:**
- Cổng là số từ 0 đến 65535 — chung cư một địa chỉ IP có ngần ấy căn.
- Dải 0-1023 là cổng nổi tiếng: đã có chủ theo quy ước toàn cầu.
- Phía bạn dùng cổng tạm thời, mỗi kết nối một số, nên nhiều tab không lẫn nhau.
- *Úp mở bài sau:* Còn 15 con số nổi tiếng nhất thì học kiểu gì cho vào đầu? Bài sau mình bước vào một tòa nhà.

### Bài: Bước vào tòa nhà mười lăm phòng `m5-bai-4`

**1 · Khởi động (hook):** 15 con số rời rạc, không suy ra được từ nguyên lý nào. Học thuộc lòng thì mai quên — vậy người ta nhớ hàng trăm thứ vụn vặt bằng cách gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: cách nào giúp nhớ một danh sách dài rời rạc lâu nhất?
  - **Dạng:** trắc nghiệm · Đọc đi đọc lại danh sách cho tới khi thuộc / **Gắn mỗi mẩu vào một CHỖ trong một không gian quen thuộc rồi đi lại con đường đó** ✓ / Chép lại danh sách ra giấy vài lần
  - **Vì sao:** Trí nhớ không gian khỏe hơn trí nhớ danh sách rất nhiều: gắn mẩu kiến thức vào một chỗ cụ thể rồi đi lại con đường ấy là kỹ thuật cung điện ký ức, dùng cả nghìn năm nay.

**3 · Khám phá (teach):**
- *[m5-cung-dien]* Mình sẽ dựng một tòa nhà 5 tầng, mỗi tầng 3 phòng — đúng 15 phòng cho 15 cổng. Mỗi phòng có một hình ảnh kỳ quặc gắn với con số của nó. Luật chơi: lúc nào cũng đi cùng một đường, từ tầng trệt lên nóc, trái sang phải. Chính THỨ TỰ đó là sợi dây móc trí nhớ.
  - **Đào sâu hơn:** Hình càng lạ càng dễ nhớ — não bỏ qua cái quen thuộc và ghim lại cái bất thường. Đó cũng là lý do các hình trong tòa nhà này hơi vô lý một chút: ổ khóa vàng, vỏ sò, tấm gương chiếu màn hình máy khác.
- *[m5-cong-web]* Tầng 1 là ba cánh cửa bạn dùng mỗi ngày mà không để ý: một cửa mở toang (web thường), một cửa khóa vàng (web bảo mật), một quầy danh bạ (tra tên ra địa chỉ). Đi qua từng phòng một nhé — đừng vội.
  - **Đi xem cung điện (3 phòng):**
    - tầng 1 phòng 1 · 80 · HTTP · hình `palace-door-open` — Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.
    - tầng 1 phòng 2 · 443 · HTTPS · hình `palace-golden-lock` — Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.
    - tầng 1 phòng 3 · 53 · DNS · hình `palace-phonebook` — Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Ba phòng tầng 1 phục vụ chung một việc gì?
  - **Dạng:** trắc nghiệm · **Đưa bạn tới một trang web: tra tên miền rồi mở trang** ✓ / Điều khiển máy tính ở xa / Chia sẻ tệp trong mạng nội bộ
  - **Chủ đề gợi ý (tầng 1):** việc bạn làm mỗi lần gõ một địa chỉ web
  - **Gợi ý (tầng 2):** Nghĩ lại Module 2: gõ google.com xong thì việc đầu tiên là hỏi ai?
  - **Lời giải (tầng 3):** Cả ba lo chuyện mở một trang web: 53 tra tên ra địa chỉ, rồi 80 hoặc 443 tải trang về.
- **Đề:** Phòng có ổ khóa vàng là cổng số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 443
  - **Chủ đề gợi ý (tầng 1):** cửa nào được niêm phong trước khi thư đi ra
  - **Gợi ý (tầng 2):** Nó là cửa thứ hai của tầng 1, và là cửa mà trình duyệt hiện hình ổ khóa nhỏ trên thanh địa chỉ.
  - **Lời giải (tầng 3):** Cổng 443 — HTTPS, phiên bản có khóa của web.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đóng sách lại và đi lại tầng 1 từ trí nhớ: đứng trước mỗi cửa, nói xem trong phòng có số mấy và ai ở đó.
  - **Dạng:** đi lại cung điện từ trí nhớ (3 phòng)
    - tầng 1 phòng 1 · 80 · HTTP · hình `palace-door-open` — Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.
    - tầng 1 phòng 2 · 443 · HTTPS · hình `palace-golden-lock` — Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.
    - tầng 1 phòng 3 · 53 · DNS · hình `palace-phonebook` — Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.
  - **Chủ đề gợi ý (tầng 1):** hình bạn vừa thấy trong phòng
  - **Gợi ý (tầng 2):** Nhớ hình trước, con số bám theo hình — cửa mở toang, ổ khóa vàng, cuốn danh bạ.
  - **Lời giải (tầng 3):** Tầng 1: cửa mở toang là 80 (HTTP), ổ khóa vàng là 443 (HTTPS), quầy danh bạ là 53 (DNS).
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao gắn con số vào một hình ảnh trong một căn phòng lại dễ nhớ hơn học thuộc danh sách?
  - **Nhóm ý cần chạm:** [hình ảnh, hình, hình dung, tưởng tượng] · [chỗ, vị trí, căn phòng, không gian, đường đi]
  - **Trả lời mẫu:** Vì trí nhớ về nơi chốn và hình ảnh khỏe hơn trí nhớ về những con số trơ trọi: mình nhớ được cái ổ khóa vàng ở phòng thứ hai tầng một, rồi con số 443 tự bám theo hình ấy.

**6 · Tổng kết:**
- Tòa nhà có 5 tầng, mỗi tầng 3 phòng, và luôn đi cùng một đường.
- Tầng 1 lo chuyện web: 80 cửa mở toang, 443 ổ khóa vàng, 53 quầy danh bạ.
- Nhớ hình trước, con số bám theo hình — đừng cố nhớ số trần trụi.
- *Úp mở bài sau:* Lên tầng 2, có một phòng bốn vách bằng kính mà ai đi ngang cũng đọc được mọi thứ bên trong. Bạn sẽ không muốn dùng phòng đó đâu.

### Bài: Lên tầng hai: điều khiển máy ở xa `m5-bai-5`

**1 · Khởi động (hook):** Hai căn phòng cạnh nhau làm đúng một việc: gõ lệnh cho máy ở xa. Một phòng kín, một phòng bốn vách kính. Vì sao phòng kính vẫn còn tồn tại?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: SSH và Telnet khác nhau chủ yếu ở chỗ nào?
  - **Dạng:** trắc nghiệm · **SSH mã hóa đường truyền, Telnet gửi trần** ✓ / SSH nhanh hơn Telnet / Telnet dùng cho Windows, SSH cho Linux
  - **Vì sao:** Cùng một việc — gõ lệnh từ xa — nhưng Telnet gửi cả mật khẩu dưới dạng chữ thường, ai bắt được gói tin là đọc được hết.

**3 · Khám phá (teach):**
- *[m5-cong-dieu-khien]* Tầng 2 dành cho việc ngồi đây mà điều khiển máy ở chỗ khác: một phòng có vỏ sò (gõ lệnh an toàn), một phòng vách kính ngay bên cạnh (cũng gõ lệnh, nhưng ai cũng đọc được), và một phòng có gương lớn chiếu nguyên màn hình máy kia.
  - **Đi xem cung điện (3 phòng):**
    - tầng 2 phòng 1 · 22 · SSH · hình `palace-seashell` — Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.
    - tầng 2 phòng 2 · 23 · Telnet · hình `palace-glass-wall` — Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.
    - tầng 2 phòng 3 · 3389 · RDP · hình `palace-mirror-screen` — Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.
  - **Đào sâu hơn:** Telnet ra đời khi mạng còn là chuyện của vài trường đại học tin nhau. Ngày nay nó chỉ còn dùng để thử xem một cổng có mở không, chứ không ai đăng nhập bằng nó nữa.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Phòng có vỏ sò — gõ lệnh từ xa an toàn — là cổng số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 22
  - **Chủ đề gợi ý (tầng 1):** cửa đầu tiên của tầng hai
  - **Gợi ý (tầng 2):** Vỏ sò trong tiếng Anh là shell, và tên giao thức cũng có chữ đó.
  - **Lời giải (tầng 3):** Cổng 22 — SSH (secure shell).
- **Đề:** Phòng vách kính (Telnet, cổng 23) nguy hiểm ở chỗ nào?
  - **Dạng:** trắc nghiệm · **Mật khẩu đi qua mạng dưới dạng chữ thường, ai bắt được gói tin là đọc được** ✓ / Nó làm máy chủ chạy chậm đi / Nó chỉ chạy được trên mạng nội bộ
  - **Chủ đề gợi ý (tầng 1):** ý nghĩa của bốn vách kính trong hình
  - **Gợi ý (tầng 2):** Vách kính nghĩa là người đi ngang nhìn thấy hết những gì bạn gõ.
  - **Lời giải (tầng 3):** Telnet không mã hóa gì cả: tên đăng nhập và mật khẩu đi trần trên đường truyền.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đi lại tầng 2 từ trí nhớ: vỏ sò, vách kính, tấm gương — mỗi phòng là cổng nào?
  - **Dạng:** đi lại cung điện từ trí nhớ (3 phòng)
    - tầng 2 phòng 1 · 22 · SSH · hình `palace-seashell` — Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.
    - tầng 2 phòng 2 · 23 · Telnet · hình `palace-glass-wall` — Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.
    - tầng 2 phòng 3 · 3389 · RDP · hình `palace-mirror-screen` — Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.
  - **Chủ đề gợi ý (tầng 1):** hình trong từng phòng của tầng hai
  - **Gợi ý (tầng 2):** Hai phòng đầu là hai số liền nhau — chúng làm cùng một việc mà.
  - **Lời giải (tầng 3):** Tầng 2: vỏ sò là 22 (SSH), vách kính là 23 (Telnet), tấm gương là 3389 (RDP).
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao 22 và 23 lại là hai số liền nhau trong tòa nhà này?
  - **Nhóm ý cần chạm:** [cùng việc, giống nhau, cùng một việc, gõ lệnh, điều khiển] · [mã hóa, an toàn, trần, bảo mật]
  - **Trả lời mẫu:** Vì hai phòng làm đúng một việc là gõ lệnh cho máy ở xa, chỉ khác nhau ở chỗ một bên mã hóa còn một bên gửi trần — nên đặt cạnh nhau thì nhớ cặp dễ hơn nhớ rời.

**6 · Tổng kết:**
- Tầng 2 là tầng điều khiển máy ở xa.
- 22 vỏ sò (SSH, có mã hóa) đứng ngay cạnh 23 vách kính (Telnet, trần).
- 3389 là tấm gương chiếu nguyên màn hình máy kia (RDP).
- *Úp mở bài sau:* Tầng 3 là kho của cả tòa nhà: có băng chuyền chở thùng tệp, có ổ đĩa cắm sang nhà hàng xóm, và một tủ hồ sơ khổng lồ.

### Bài: Lên tầng ba: kho của cả tòa nhà `m5-bai-6`

**1 · Khởi động (hook):** Trong công ty, thư mục chung ai cũng mở được nằm ở đâu? Và vì sao kho dữ liệu của một trang web lại KHÔNG bao giờ nên mở cửa ra ngoài đường?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: thư mục chia sẻ giữa các máy Windows đi qua cổng nào?
  - **Dạng:** trắc nghiệm · **445** ✓ / 80 / 3306
  - **Vì sao:** 445 là cổng SMB — thứ làm nên ổ đĩa mạng và thư mục chia sẻ trong công ty.

**3 · Khám phá (teach):**
- *[m5-cong-chia-se]* Tầng 3 là chỗ chứa đồ: một kho chung mà ổ đĩa nhà này cắm thẳng sang nhà kia, một băng chuyền chở nguyên thùng tệp qua lại nhưng thùng không dán kín, và một phòng xếp kín tủ hồ sơ hỏi gì cũng tra ra.
  - **Đi xem cung điện (3 phòng):**
    - tầng 3 phòng 1 · 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
    - tầng 3 phòng 2 · 21 · FTP · hình `palace-conveyor` — Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.
    - tầng 3 phòng 3 · 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
  - **Đào sâu hơn:** Cả ba phòng này là mục tiêu ưa thích của kẻ tấn công, vì đằng sau chúng là dữ liệu chứ không phải giao diện. Nguyên tắc chung: đừng bao giờ để 445 và 3306 nhìn thẳng ra Internet.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Phòng có băng chuyền chở thùng tệp không dán kín là cổng số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 21
  - **Chủ đề gợi ý (tầng 1):** cách truyền tệp đời đầu, không mã hóa
  - **Gợi ý (tầng 2):** Nó là phòng giữa của tầng 3, và tên giao thức có chữ "File".
  - **Lời giải (tầng 3):** Cổng 21 — FTP, kiểu truyền tệp đời đầu, dữ liệu và mật khẩu đều đi trần.
- **Đề:** Phòng tủ hồ sơ — cơ sở dữ liệu MySQL — là cổng số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 3306
  - **Chủ đề gợi ý (tầng 1):** con số của kho dữ liệu
  - **Gợi ý (tầng 2):** Bốn chữ số, bắt đầu bằng 33.
  - **Lời giải (tầng 3):** Cổng 3306 — MySQL.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đi lại tầng 3 từ trí nhớ: kho chung, băng chuyền, tủ hồ sơ.
  - **Dạng:** đi lại cung điện từ trí nhớ (3 phòng)
    - tầng 3 phòng 1 · 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
    - tầng 3 phòng 2 · 21 · FTP · hình `palace-conveyor` — Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.
    - tầng 3 phòng 3 · 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
  - **Chủ đề gợi ý (tầng 1):** hình trong từng phòng của tầng ba
  - **Gợi ý (tầng 2):** Một số ba chữ số, một số hai chữ số, một số bốn chữ số — mỗi phòng một dáng riêng.
  - **Lời giải (tầng 3):** Tầng 3: kho chung là 445 (SMB), băng chuyền là 21 (FTP), tủ hồ sơ là 3306 (MySQL).
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao không nên để cổng 3306 mở thẳng ra Internet?
  - **Nhóm ý cần chạm:** [dữ liệu, cơ sở dữ liệu, kho, hồ sơ] · [tấn công, nguy hiểm, lộ, đánh cắp, rủi ro]
  - **Trả lời mẫu:** Vì sau cổng đó là toàn bộ dữ liệu thật chứ không phải giao diện; mở ra ngoài là mời cả thế giới thử mật khẩu vào thẳng kho hồ sơ.

**6 · Tổng kết:**
- Tầng 3 chứa đồ: 445 kho chung, 21 băng chuyền, 3306 tủ hồ sơ.
- FTP truyền tệp nhưng không dán kín — mật khẩu đi trần như Telnet.
- Cổng dữ liệu (445, 3306) không bao giờ nên nhìn thẳng ra Internet.
- *Úp mở bài sau:* Tầng 4 là chỗ thư từ đi qua ban đêm, và một cái đồng hồ to mà cả tòa nhà phải chỉnh giờ theo.

### Bài: Lên tầng bốn: thư từ và giờ giấc `m5-bai-7`

**1 · Khởi động (hook):** Hai phòng cạnh nhau cùng lo chuyện thư đi: một phòng nhận thư từ bưu cục khác, một phòng bắt bạn xuất trình thẻ mới nhận. Vì sao phải tách làm hai?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: vì sao máy chủ nào cũng cần đồng bộ giờ với nhau?
  - **Dạng:** trắc nghiệm · **Để nhật ký và chứng chỉ bảo mật còn khớp được với nhau** ✓ / Để màn hình hiện đúng giờ cho người dùng xem / Để tiết kiệm điện
  - **Vì sao:** Lệch giờ vài phút là chứng chỉ báo hết hạn nhầm, nhật ký hai máy không ghép được, đăng nhập một lần cũng hỏng — nên giờ giấc là chuyện hạ tầng, không phải chuyện trang trí.

**3 · Khám phá (teach):**
- *[m5-cong-thu-tu]* Tầng 4 lo hai việc: thư từ và giờ giấc. Thùng thư bưu cục nhận thư chạy giữa các máy chủ; quầy xuất trình thẻ nhận thư do chính bạn gửi đi; và cái đồng hồ to giữ nhịp cho cả tòa nhà.
  - **Đi xem cung điện (3 phòng):**
    - tầng 4 phòng 1 · 25 · SMTP · hình `palace-mailbox` — Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.
    - tầng 4 phòng 2 · 587 · Mail Submission · hình `palace-id-check` — Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.
    - tầng 4 phòng 3 · 123 · NTP · hình `palace-big-clock` — Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.
  - **Đào sâu hơn:** Tách 25 và 587 là để chống thư rác: cổng 25 chỉ dành cho máy chủ nói chuyện với máy chủ, còn người dùng gửi thư phải qua 587 và phải đăng nhập. Nhà mạng thường chặn thẳng cổng 25 đi ra từ máy người dùng.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Phòng bắt xuất trình thẻ rồi mới nhận thư bạn gửi đi là cổng số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 587
  - **Chủ đề gợi ý (tầng 1):** cổng dành cho người dùng gửi thư, phải đăng nhập
  - **Gợi ý (tầng 2):** Ba chữ số, và nó không phải 25 — 25 là cổng của máy chủ nói với máy chủ.
  - **Lời giải (tầng 3):** Cổng 587 — nơi ứng dụng thư của bạn đăng nhập rồi mới gửi được thư đi.
- **Đề:** Cái đồng hồ to của tòa nhà — dịch vụ đồng bộ giờ — nằm ở cổng nào?
  - **Dạng:** gõ tay · **Chấp nhận:** 123
  - **Chủ đề gợi ý (tầng 1):** con số dễ nhớ nhất tòa nhà
  - **Gợi ý (tầng 2):** Đếm một, hai, ba.
  - **Lời giải (tầng 3):** Cổng 123 — NTP, chạy trên UDP.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đi lại tầng 4 từ trí nhớ: thùng thư, quầy xuất trình thẻ, đồng hồ lớn.
  - **Dạng:** đi lại cung điện từ trí nhớ (3 phòng)
    - tầng 4 phòng 1 · 25 · SMTP · hình `palace-mailbox` — Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.
    - tầng 4 phòng 2 · 587 · Mail Submission · hình `palace-id-check` — Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.
    - tầng 4 phòng 3 · 123 · NTP · hình `palace-big-clock` — Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.
  - **Chủ đề gợi ý (tầng 1):** hình trong từng phòng của tầng bốn
  - **Gợi ý (tầng 2):** Hai phòng đầu cùng lo thư, phòng cuối là con số đếm 1-2-3.
  - **Lời giải (tầng 3):** Tầng 4: thùng thư là 25 (SMTP), quầy xuất trình thẻ là 587, đồng hồ lớn là 123 (NTP).
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao thư gửi đi của người dùng phải qua cổng 587 chứ không phải 25?
  - **Nhóm ý cần chạm:** [đăng nhập, xác thực, chứng minh, thẻ] · [thư rác, spam, giả mạo, chặn]
  - **Trả lời mẫu:** Vì 587 bắt đăng nhập trước khi nhận thư, nhờ đó biết ai gửi; còn 25 để cho máy chủ nói với máy chủ và thường bị nhà mạng chặn để hạn chế thư rác gửi bừa.

**6 · Tổng kết:**
- Tầng 4: 25 thùng thư giữa các máy chủ, 587 quầy bắt xuất trình thẻ.
- 123 là đồng hồ lớn — đồng bộ giờ, chạy trên UDP.
- Lệch giờ là hỏng chứng chỉ và nhật ký, nên NTP là chuyện hạ tầng.
- *Úp mở bài sau:* Còn một tầng nữa trên nóc: nơi giữ sổ hộ khẩu của cả tòa nhà, và nơi phát chìa khóa cho người mới đến.

### Bài: Lên nóc: sổ hộ khẩu và chìa khóa nhà `m5-bai-8`

**1 · Khởi động (hook):** Cắm dây mạng vào là máy có địa chỉ IP ngay, chẳng cần gõ gì. Ai đã phát địa chỉ đó cho bạn, và bằng cổng nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: dịch vụ tự cấp địa chỉ IP cho máy mới vào mạng dùng mấy số cổng?
  - **Dạng:** trắc nghiệm · Một số duy nhất / **Một cặp hai số** ✓
  - **Vì sao:** DHCP dùng cặp 67/68: một số cho bên phát địa chỉ, một số cho bên nhận — đó là lý do phòng cuối cùng của tòa nhà là một cặp phòng thông nhau.

**3 · Khám phá (teach):**
- *[m5-cong-danh-ba]* Tầng trên cùng giữ những thứ về NGƯỜI và CHỖ Ở: một cuốn sổ hộ khẩu ghi ai làm gì thuộc phòng ban nào, cùng cuốn sổ ấy nhưng cất trong két sắt, và cặp phòng chuyên phát chìa khóa nhà cho người mới đến.
  - **Đi xem cung điện (3 phòng):**
    - tầng 5 phòng 1 · 389 · LDAP · hình `palace-registry-book` — Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.
    - tầng 5 phòng 2 · 636 · LDAPS · hình `palace-safe-book` — Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.
    - tầng 5 phòng 3 · 67/68 · DHCP · hình `palace-key-pair` — Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.
  - **Đào sâu hơn:** LDAP là nền của Active Directory — thứ bạn sẽ gặp lại ở Phần C khi học quản trị Windows Server. Lúc đó cặp 389/636 sẽ quay lại, và bạn đã có sẵn chỗ để treo nó.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Cuốn sổ hộ khẩu cất trong két sắt — LDAP có mã hóa — là cổng số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 636
  - **Chủ đề gợi ý (tầng 1):** bản có khóa của cuốn sổ 389
  - **Gợi ý (tầng 2):** Ba chữ số, và nó KHÔNG phải 389 — 389 là cuốn sổ để ngoài.
  - **Lời giải (tầng 3):** Cổng 636 — LDAPS, tức LDAP có mã hóa.
- **Đề:** Cặp phòng phát chìa khóa nhà cho người mới — DHCP — mang hai số nào?
  - **Dạng:** gõ tay · **Chấp nhận:** 67 68 | 67, 68 | 67/68 | 68 67 | 67-68
  - **Chủ đề gợi ý (tầng 1):** cặp số liền nhau ở phòng cuối cùng
  - **Gợi ý (tầng 2):** Hai số liền nhau, đều bắt đầu bằng số 6.
  - **Lời giải (tầng 3):** 67 và 68 — một số cho bên phát địa chỉ, một số cho bên nhận.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đi lại tầng 5 từ trí nhớ: sổ hộ khẩu, két sắt, cặp chìa khóa.
  - **Dạng:** đi lại cung điện từ trí nhớ (3 phòng)
    - tầng 5 phòng 1 · 389 · LDAP · hình `palace-registry-book` — Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.
    - tầng 5 phòng 2 · 636 · LDAPS · hình `palace-safe-book` — Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.
    - tầng 5 phòng 3 · 67/68 · DHCP · hình `palace-key-pair` — Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.
  - **Chủ đề gợi ý (tầng 1):** hình trong từng phòng trên nóc tòa nhà
  - **Gợi ý (tầng 2):** Hai cuốn sổ là cùng một thứ, chỉ khác chuyện khóa; phòng cuối mang hai số.
  - **Lời giải (tầng 3):** Tầng 5: sổ hộ khẩu là 389 (LDAP), sổ trong két là 636 (LDAPS), cặp chìa khóa là 67/68 (DHCP).
- **Tự giải thích:** Giải thích bằng lời của bạn: đi từ tầng 1 lên nóc, mỗi tầng lo chuyện gì?
  - **Nhóm ý cần chạm:** [web, trang web, tên miền] · [điều khiển, từ xa, gõ lệnh] · [tệp, dữ liệu, chia sẻ, kho] · [thư, giờ, đồng bộ] · [sổ, người dùng, địa chỉ, danh bạ]
  - **Trả lời mẫu:** Tầng 1 lo chuyện mở trang web, tầng 2 điều khiển máy ở xa, tầng 3 là kho tệp và dữ liệu, tầng 4 lo thư từ và giờ giấc, tầng 5 giữ sổ người dùng và phát địa chỉ cho máy mới.

**6 · Tổng kết:**
- Tầng 5: 389 sổ hộ khẩu, 636 sổ trong két sắt, 67/68 cặp chìa khóa.
- DHCP là phòng duy nhất mang hai số: một bên phát, một bên nhận.
- Cả tòa nhà giờ đã đủ 15 phòng — và bạn đi lại được từ trí nhớ.
- *Úp mở bài sau:* Địa chỉ trong nhà bạn là địa chỉ riêng, vậy làm sao cả nhà cùng ra Internet bằng một địa chỉ công cộng? Module sau mình mở chuyện NAT và tường lửa.

### Khái niệm & flashcard (11)

- **TCP** `m5-tcp` — Giao thức gửi bảo đảm — đánh số, báo nhận, gửi lại gói thiếu
  - Ẩn dụ: TCP như thư bảo đảm: bưu điện bắt ký nhận, thiếu lá nào thì gửi lại lá đó.
  - Thẻ ôn: *TCP bảo đảm điều gì cho dữ liệu?* → Tới đủ và đúng thứ tự: mỗi gói được đánh số, bên nhận báo đã nhận, thiếu gói nào bên gửi gửi lại gói đó.
- **Three-way handshake** `m5-bat-tay` — Bắt tay ba bước — ba gói tin mở đầu một kết nối TCP
  - Ẩn dụ: Như gọi điện: "Alô?" — "Alô, nghe không?" — "Nghe rồi". Ba câu xong mới vào chuyện.
  - Thẻ ôn: *Ba nhịp của bắt tay TCP theo đúng thứ tự là gì?* → SYN → SYN-ACK → ACK. Nhịp giữa mang hai vai: vừa xác nhận, vừa hỏi ngược lại để mở chiều còn lại.
- **UDP** `m5-udp` — Giao thức gửi không bảo đảm — nhanh, không báo nhận, không gửi lại
  - Ẩn dụ: UDP như thư thường thả vào thùng: không ai ký nhận, mất thì thôi, nhưng đi ngay.
  - Thẻ ôn: *UDP đánh đổi thứ gì để lấy thứ gì?* → Bỏ độ tin cậy (không bắt tay, không báo nhận, không gửi lại) để lấy độ trễ thấp — hợp với gọi video, game, DNS.
- **Well-known port** `m5-cong-noi-tieng` — Cổng nổi tiếng — dải 0-1023 đã có chủ theo quy ước toàn cầu
  - Ẩn dụ: Như số nhà của trụ sở công: ai cũng biết trước phải tới đâu, không cần hỏi đường.
  - Thẻ ôn: *Dải cổng nổi tiếng là dải nào, và vì sao phải cố định?* → 0-1023. Máy chủ phải ngồi đúng số quy ước để người tới biết trước phải gõ cửa nào.
- **Ephemeral port** `m5-cong-tam-thoi` — Cổng tạm thời — số hệ điều hành cấp cho mỗi kết nối phía máy bạn
  - Ẩn dụ: Như số thứ tự lấy ở quầy: mỗi lượt một số khác, xong việc là trả lại.
  - Thẻ ôn: *Vì sao mở mười tab cùng một trang web mà dữ liệu không lẫn vào nhau?* → Mỗi kết nối được cấp một cổng tạm thời khác nhau ở phía máy bạn; máy chủ vẫn ở nguyên một cổng.
- **Memory palace** `m5-cung-dien` — Cung điện ký ức — gắn mẩu kiến thức vào một chỗ trong không gian quen thuộc
  - Ẩn dụ: Tòa nhà 5 tầng, mỗi phòng một hình kỳ quặc; nhớ lại bằng cách đi lại đúng con đường ấy.
  - Thẻ ôn: *(khái niệm meta — noFlashcard, không vào hộp ôn)*
- **Cổng tầng 1 — web** `m5-cong-web` — Nhóm cổng đưa bạn tới một trang web: 80, 443, 53
  - Ẩn dụ: Tầng trệt của tòa nhà: cửa mở toang, cửa khóa vàng và quầy danh bạ.
  - Thẻ ôn: *Ba phòng tầng 1 của cung điện là những cổng nào?* → 80 HTTP (cửa mở toang), 443 HTTPS (ổ khóa vàng), 53 DNS (quầy danh bạ).
- **Cổng tầng 2 — điều khiển từ xa** `m5-cong-dieu-khien` — Nhóm cổng ngồi đây điều khiển máy ở chỗ khác: 22, 23, 3389
  - Ẩn dụ: Tầng hai: vỏ sò, phòng vách kính và tấm gương chiếu màn hình máy kia.
  - Thẻ ôn: *Ba phòng tầng 2 của cung điện là những cổng nào?* → 22 SSH (vỏ sò, có mã hóa), 23 Telnet (vách kính, gửi trần), 3389 RDP (tấm gương).
- **Cổng tầng 3 — kho dữ liệu** `m5-cong-chia-se` — Nhóm cổng chia sẻ tệp và giữ dữ liệu: 445, 21, 3306
  - Ẩn dụ: Tầng ba là kho: ổ đĩa chung, băng chuyền thùng tệp, tủ hồ sơ.
  - Thẻ ôn: *Ba phòng tầng 3 của cung điện là những cổng nào?* → 445 SMB (kho chung), 21 FTP (băng chuyền), 3306 MySQL (tủ hồ sơ).
- **Cổng tầng 4 — thư từ và giờ giấc** `m5-cong-thu-tu` — Nhóm cổng lo thư đi và đồng bộ giờ: 25, 587, 123
  - Ẩn dụ: Tầng bốn: thùng thư bưu cục, quầy xuất trình thẻ và cái đồng hồ to.
  - Thẻ ôn: *Ba phòng tầng 4 của cung điện là những cổng nào?* → 25 SMTP (thư giữa máy chủ), 587 gửi thư có đăng nhập, 123 NTP (đồng bộ giờ).
- **Cổng tầng 5 — người và chỗ ở** `m5-cong-danh-ba` — Nhóm cổng giữ danh bạ người dùng và cấp địa chỉ: 389, 636, 67/68
  - Ẩn dụ: Nóc nhà: sổ hộ khẩu, sổ trong két sắt và cặp phòng phát chìa khóa.
  - Thẻ ôn: *Ba phòng tầng 5 của cung điện là những cổng nào?* → 389 LDAP (sổ hộ khẩu), 636 LDAPS (sổ trong két sắt), 67/68 DHCP (cặp chìa khóa).

### Bài kiểm tra module (8 câu, cần ≥ 85%)

- **Đề:** Thứ tự đúng của cái bắt tay ba bước là gì?
  - **Dạng:** trắc nghiệm · **SYN → SYN-ACK → ACK** ✓ / SYN → ACK → SYN-ACK / ACK → SYN → SYN-ACK
  - **Vì sao:** Máy bạn mở lời bằng SYN, máy chủ đáp bằng gói mang hai vai SYN-ACK, máy bạn chốt bằng ACK.
- **Đề:** Nhịp giữa của bắt tay ba bước tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** syn-ack | syn ack | synack
  - **Vì sao:** SYN-ACK là nhịp duy nhất mang hai vai: vừa xác nhận đã nghe thấy, vừa hỏi ngược lại để mở chiều còn lại.
- **Đề:** Một cuộc gọi video nên đi bằng giao thức nào, và vì sao?
  - **Dạng:** trắc nghiệm · **UDP — chậm một nhịp còn tệ hơn mất một khung hình** ✓ / TCP — phải bảo đảm không mất khung hình nào
  - **Vì sao:** Với cuộc gọi, dừng lại chờ gửi lại một mẩu đã rớt còn phá trải nghiệm hơn là mất luôn mẩu đó.
- **Đề:** Số cổng lớn nhất có thể là bao nhiêu?
  - **Dạng:** gõ tay · **Chấp nhận:** 65535
  - **Vì sao:** Cổng là số 16 bit nên đánh số từ 0 đến 65535.
- **Đề:** Bạn mở ba tab cùng vào một trang web. Thứ khác nhau giữa ba kết nối là gì?
  - **Dạng:** trắc nghiệm · **Cổng tạm thời phía máy bạn** ✓ / Cổng phía máy chủ / Địa chỉ IP của máy chủ
  - **Vì sao:** Máy chủ vẫn ngồi nguyên một cổng; mỗi kết nối phía bạn được cấp một cổng tạm thời riêng nên dữ liệu không lẫn.
- **Đề:** Đi lại tầng 1 và tầng 2 của tòa nhà từ trí nhớ.
  - **Dạng:** đi lại cung điện từ trí nhớ (6 phòng)
    - tầng 1 phòng 1 · 80 · HTTP · hình `palace-door-open` — Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.
    - tầng 1 phòng 2 · 443 · HTTPS · hình `palace-golden-lock` — Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.
    - tầng 1 phòng 3 · 53 · DNS · hình `palace-phonebook` — Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.
    - tầng 2 phòng 1 · 22 · SSH · hình `palace-seashell` — Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.
    - tầng 2 phòng 2 · 23 · Telnet · hình `palace-glass-wall` — Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.
    - tầng 2 phòng 3 · 3389 · RDP · hình `palace-mirror-screen` — Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.
  - **Vì sao:** Tầng 1: 80 HTTP, 443 HTTPS, 53 DNS. Tầng 2: 22 SSH, 23 Telnet, 3389 RDP.
- **Đề:** Đi lại tầng 3 và tầng 4 của tòa nhà từ trí nhớ.
  - **Dạng:** đi lại cung điện từ trí nhớ (6 phòng)
    - tầng 3 phòng 1 · 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
    - tầng 3 phòng 2 · 21 · FTP · hình `palace-conveyor` — Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.
    - tầng 3 phòng 3 · 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
    - tầng 4 phòng 1 · 25 · SMTP · hình `palace-mailbox` — Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.
    - tầng 4 phòng 2 · 587 · Mail Submission · hình `palace-id-check` — Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.
    - tầng 4 phòng 3 · 123 · NTP · hình `palace-big-clock` — Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.
  - **Vì sao:** Tầng 3: 445 SMB, 21 FTP, 3306 MySQL. Tầng 4: 25 SMTP, 587 gửi thư có đăng nhập, 123 NTP.
- **Đề:** Lên nóc: đi lại tầng 5 từ trí nhớ.
  - **Dạng:** đi lại cung điện từ trí nhớ (3 phòng)
    - tầng 5 phòng 1 · 389 · LDAP · hình `palace-registry-book` — Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.
    - tầng 5 phòng 2 · 636 · LDAPS · hình `palace-safe-book` — Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.
    - tầng 5 phòng 3 · 67/68 · DHCP · hình `palace-key-pair` — Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.
  - **Vì sao:** Tầng 5: 389 LDAP, 636 LDAPS, 67/68 DHCP.

## DNS và DHCP — Hỏi đường và thuê nhà `module-6`

Phần B · 5 chặng · 5 bài · 8 khái niệm

**Chặng:** Hỏi đường trước khi đi (m6-bai-1) → Trong cuốn sổ có gì (m6-bai-2) → Ai nghe được câu hỏi của bạn (m6-bai-3) → Chuyện hỏi cưới bốn nhịp (m6-bai-4) → Giấy thuê có hạn (m6-bai-5)

### Bài: Lần theo ba tầng người biết đường `m6-bai-1`

**1 · Khởi động (hook):** Không có một cuốn danh bạ khổng lồ nào chứa hết mọi tên miền trên đời — nếu có thì nó sập trong một giây. Vậy tại sao gõ tên nào máy bạn cũng tra ra được địa chỉ?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: khi bạn gõ một tên miền lạ, máy bạn hỏi ai đầu tiên?
  - **Dạng:** trắc nghiệm · Hỏi thẳng máy chủ của trang web đó / **Hỏi một máy chủ chuyên đi hỏi hộ, thường là của nhà mạng** ✓ / Hỏi Google
  - **Vì sao:** Máy bạn chỉ hỏi ĐÚNG MỘT chỗ: máy chủ phân giải (resolver). Nó mới là bên chạy đi hỏi vòng quanh rồi mang câu trả lời về.

**3 · Khám phá (teach):**
- *[m6-resolver]* Máy bạn lười một cách có chủ đích: nó gửi đúng một câu hỏi cho máy chủ PHÂN GIẢI (thường là của nhà mạng hoặc do bạn tự chọn), rồi ngồi chờ. Anh này mới là người chạy vòng quanh hỏi hộ, và mang về một câu trả lời gọn ghẽ.
  - **Đào sâu hơn:** Hỏi hộ xong, resolver còn NHỚ TẠM câu trả lời trong một khoảng thời gian do chủ tên miền quy định (TTL). Nhờ vậy người thứ hai hỏi cùng tên miền được trả lời ngay, không phải chạy lại vòng nào.
- *[m6-phan-cap]* Vòng hỏi ấy đi qua ba tầng, từ chung tới riêng: máy chủ GỐC chỉ biết "ai quản .com", máy chủ TLD của .com chỉ biết "ai quản example.com", và máy chủ có THẨM QUYỀN của example.com mới là nơi giữ câu trả lời thật. Không ai biết tất cả — mỗi tầng chỉ biết chỉ sang tầng sau.
  - **Đào sâu hơn:** Đọc tên miền từ PHẢI sang TRÁI mới đúng thứ tự hỏi: www.example.com nghĩa là gốc → .com → example.com → www. Dấu chấm cuối cùng (gốc) bị lược đi trong đời thường nên ít ai để ý.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Ví dụ giải sẵn — bạn gõ example.com: (1) máy bạn hỏi resolver; (2) resolver hỏi máy chủ gốc, được chỉ sang máy chủ .com; (3) hỏi .com, được chỉ sang máy chủ có thẩm quyền của example.com; (4) hỏi nơi đó, nhận được địa chỉ IP; (5) resolver trả về cho máy bạn và nhớ tạm lại. Đọc lại một lượt, rồi thử tự gọi tên tầng đầu tiên xem.
- **Đề:** Máy chủ chỉ biết "ai đang quản .com, .vn, .org" nằm ở tầng nào của DNS?
  - **Dạng:** gõ tay · **Chấp nhận:** gốc | goc | root | máy chủ gốc | may chu goc | root server
  - **Chủ đề gợi ý (tầng 1):** tầng đứng trên cùng, biết ít nhất mà chỉ đường cho tất cả
  - **Gợi ý (tầng 2):** Nó là nơi vòng hỏi bắt đầu, và tên nó nghĩa là "gốc rễ".
  - **Lời giải (tầng 3):** Đó là máy chủ gốc (root): nó không giữ địa chỉ nào cả, chỉ biết ai quản từng đuôi tên miền.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: xếp lại vòng đi hỏi của resolver theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Máy bạn hỏi máy chủ phân giải
    2. Resolver hỏi máy chủ gốc — được chỉ sang máy chủ .com
    3. Resolver hỏi máy chủ .com — được chỉ sang máy chủ của example.com
    4. Resolver hỏi máy chủ có thẩm quyền — nhận được địa chỉ IP
    5. Resolver trả địa chỉ về cho máy bạn và nhớ tạm lại
  - **Chủ đề gợi ý (tầng 1):** hướng đi từ chung tới riêng
  - **Gợi ý (tầng 2):** Đọc tên miền từ phải sang trái: gốc trước, đuôi sau, tên riêng sau cùng.
  - **Lời giải (tầng 3):** Máy bạn → resolver → gốc → TLD (.com) → máy chủ có thẩm quyền → resolver trả lời và nhớ tạm.
- **Đề:** Máy chủ giữ câu trả lời THẬT cho một tên miền được gọi là máy chủ gì?
  - **Dạng:** gõ tay · **Chấp nhận:** có thẩm quyền | co tham quyen | thẩm quyền | tham quyen | authoritative
  - **Chủ đề gợi ý (tầng 1):** nơi duy nhất có quyền nói "địa chỉ đúng là đây"
  - **Gợi ý (tầng 2):** Hai tầng trên chỉ biết chỉ đường; tầng này mới có quyền trả lời.
  - **Lời giải (tầng 3):** Máy chủ có thẩm quyền (authoritative) — nơi chủ tên miền khai địa chỉ thật.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao DNS phải chia ba tầng thay vì gom hết vào một cuốn sổ khổng lồ?
  - **Nhóm ý cần chạm:** [quá nhiều, khổng lồ, hàng tỉ, không xuể, quá tải] · [chia, phân cấp, mỗi tầng, chia nhau, một phần]
  - **Trả lời mẫu:** Vì số tên miền quá lớn để một chỗ giữ hết và một chỗ hỏng là cả thế giới mất mạng; chia ba tầng thì mỗi tầng chỉ giữ một phần và chỉ việc chỉ sang tầng sau.

**6 · Tổng kết:**
- Máy bạn chỉ hỏi resolver; resolver mới là bên chạy đi hỏi hộ.
- Vòng hỏi đi từ chung tới riêng: gốc → TLD → máy chủ có thẩm quyền.
- Không tầng nào biết tất cả — mỗi tầng chỉ biết chỉ sang tầng sau.
- *Úp mở bài sau:* Tới nơi rồi, nhưng trong cuốn sổ của máy chủ có thẩm quyền ghi những gì? Bài sau mình mở sổ ra xem — có cả biệt danh lẫn địa chỉ hòm thư.

### Bài: Mở cuốn sổ của tên miền `m6-bai-2`

**1 · Khởi động (hook):** Cùng một tên miền vừa mở ra trang web, vừa nhận được thư điện tử, lại còn có mấy cái tên phụ trỏ về nó. Cuốn sổ nào chứa nổi mấy việc khác nhau như vậy trong một chỗ?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: bản ghi ghi thẳng "tên miền này ứng với địa chỉ IPv4 nào" tên là gì?
  - **Dạng:** trắc nghiệm · **Bản ghi A** ✓ / Bản ghi MX / Bản ghi CNAME
  - **Vì sao:** A là bản ghi cơ bản nhất: tên miền → một địa chỉ IPv4. Bản IPv6 của nó là AAAA, đọc là "quad A".

**3 · Khám phá (teach):**
- *[m6-ban-ghi-a]* Bản ghi A là dòng cơ bản nhất trong sổ: tên miền này ứng với địa chỉ IPv4 kia. Bản ghi AAAA làm đúng việc đó cho IPv6 — bốn chữ A vì địa chỉ IPv6 dài gấp bốn lần địa chỉ IPv4.
  - **Đào sâu hơn:** Một tên miền có thể khai nhiều bản ghi A trỏ tới nhiều máy chủ khác nhau; resolver lần lượt phát cho mỗi người hỏi một địa chỉ, và thế là đã có một kiểu chia tải đơn giản nhất.
- *[m6-ban-ghi-cname-mx]* CNAME là dòng ghi BIỆT DANH: "tên này thật ra là tên kia, đi hỏi tên kia ấy". Còn MX là dòng ghi riêng cho thư điện tử: "thư gửi tới tên miền này thì đưa cho máy chủ thư kia". Nhờ MX mà trang web và hòm thư của cùng một tên miền nằm ở hai nơi khác nhau vẫn chạy.
  - **Đào sâu hơn:** Một biệt danh không được đứng ở gốc tên miền (example.com) vì chỗ đó còn phải khai MX và vài bản ghi bắt buộc khác — CNAME thì nuốt hết mọi thứ khác của cái tên nó đứng cạnh.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Bạn muốn thư gửi tới công ty rơi đúng vào máy chủ thư của công ty. Phải khai bản ghi loại nào?
  - **Dạng:** gõ tay · **Chấp nhận:** mx | bản ghi mx | ban ghi mx
  - **Chủ đề gợi ý (tầng 1):** loại bản ghi dành riêng cho thư điện tử
  - **Gợi ý (tầng 2):** Hai chữ cái, và chữ M đứng cho "mail".
  - **Lời giải (tầng 3):** Bản ghi MX — nó chỉ ra máy chủ nhận thư cho tên miền đó.
- **Đề:** "blog.example.com thật ra chính là example.com" — dòng này là bản ghi loại nào?
  - **Dạng:** trắc nghiệm · **CNAME** ✓ / A / MX
  - **Chủ đề gợi ý (tầng 1):** dòng ghi biệt danh, không ghi địa chỉ
  - **Gợi ý (tầng 2):** Nó không nói địa chỉ, nó chỉ nói "đi hỏi cái tên kia ấy".
  - **Lời giải (tầng 3):** CNAME — biệt danh trỏ về một tên khác, rồi tên đó mới có bản ghi A thật.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: bản ghi trỏ tên miền tới một địa chỉ IPv6 tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** aaaa | a a a a | quad a
  - **Chủ đề gợi ý (tầng 1):** bản anh em của bản ghi A, dành cho địa chỉ dài hơn
  - **Gợi ý (tầng 2):** Vẫn là chữ A, nhưng bốn lần — vì địa chỉ dài gấp bốn.
  - **Lời giải (tầng 3):** AAAA — bản ghi trỏ tên miền tới địa chỉ IPv6.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao có bản ghi A rồi mà vẫn cần CNAME?
  - **Nhóm ý cần chạm:** [nhiều tên, tên phụ, biệt danh, trỏ về, bí danh] · [đổi, sửa một chỗ, một nơi, khỏi phải sửa, cập nhật]
  - **Trả lời mẫu:** Vì nhiều tên phụ cùng trỏ về một chỗ; khai biệt danh thì lúc đổi địa chỉ chỉ phải sửa đúng một dòng A, còn dùng A cho từng tên thì phải sửa hết.

**6 · Tổng kết:**
- A trỏ tên miền tới địa chỉ IPv4; AAAA làm việc đó cho IPv6.
- CNAME là biệt danh: "tên này thật ra là tên kia".
- MX chỉ ra máy chủ nhận thư — nhờ nó web và hòm thư tách rời được.
- *Úp mở bài sau:* Có một chuyện ít ai để ý: câu hỏi DNS của bạn đi trần trên đường, ai ngồi giữa cũng đọc được bạn đang vào trang nào. Bài sau mình bọc nó lại.

### Bài: Bọc kín câu hỏi của mình `m6-bai-3`

**1 · Khởi động (hook):** Trang web bạn vào đã khóa bằng HTTPS, không ai đọc được nội dung. Nhưng câu hỏi "trang đó ở đâu" mà máy bạn gửi đi trước đó thì sao?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: câu hỏi DNS thường (cổng 53) đi trên đường dưới dạng nào?
  - **Dạng:** trắc nghiệm · **Chữ trần — ai chặn được gói tin là đọc được tên miền bạn hỏi** ✓ / Đã mã hóa sẵn từ đầu
  - **Vì sao:** DNS ra đời khi chưa ai nghĩ tới chuyện rình mò: câu hỏi đi trần, nên nhà mạng hay bất kỳ ai ngồi giữa đều đọc được bạn đang tra tên miền nào.

**3 · Khám phá (teach):**
- *[m6-doh]* DNS over HTTPS đóng câu hỏi DNS vào một phong bì HTTPS rồi gửi qua cổng 443 — đúng cái phòng ổ khóa vàng ở tầng 1 tòa nhà bạn vừa học. Người ngồi giữa chỉ thấy bạn đang nói chuyện với một máy chủ nào đó, không đọc được bạn hỏi tên miền gì.
  - **Đào sâu hơn:** Đổi lại, toàn bộ câu hỏi của bạn dồn về một nhà cung cấp DoH — riêng tư với nhà mạng, nhưng lộ hết với chỗ đó. Và vì lẫn vào lưu lượng 443 nên quản trị mạng công ty cũng khó lọc tên miền độc hại hơn: mỗi lựa chọn đều có cái giá của nó.

**4 · Thử tay (practice, fading 1):**
- **Đề:** DNS over HTTPS gửi câu hỏi qua cổng số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 443
  - **Chủ đề gợi ý (tầng 1):** phòng ổ khóa vàng ở tầng 1 tòa nhà
  - **Gợi ý (tầng 2):** Cùng cổng với mọi trang web có khóa — đó chính là mẹo để nó lẫn vào đám đông.
  - **Lời giải (tầng 3):** Cổng 443 — câu hỏi DNS được bọc trong HTTPS nên trông không khác gì một lượt truy cập web.
- **Đề:** Cái giá phải trả khi bật DNS over HTTPS là gì?
  - **Dạng:** trắc nghiệm · **Toàn bộ câu hỏi dồn về một nhà cung cấp, và mạng công ty khó lọc tên miền độc hại hơn** ✓ / Tốc độ mạng giảm một nửa / Không vào được trang web dùng HTTP
  - **Chủ đề gợi ý (tầng 1):** riêng tư với ai, và lộ với ai
  - **Gợi ý (tầng 2):** Giấu được với người ngồi giữa, nhưng người nhận câu hỏi thì thấy hết.
  - **Lời giải (tầng 3):** Riêng tư với nhà mạng nhưng dồn hết vào một nhà cung cấp DoH; và vì lẫn vào cổng 443 nên bộ lọc của mạng công ty khó làm việc hơn.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: kỹ thuật bọc câu hỏi DNS vào phong bì HTTPS tên là gì? (viết tắt cũng được)
  - **Dạng:** gõ tay · **Chấp nhận:** doh | dns over https
  - **Chủ đề gợi ý (tầng 1):** tên ghép của hai thứ bạn vừa học
  - **Gợi ý (tầng 2):** Ghép tên giao thức tra tên miền với tên giao thức web có khóa.
  - **Lời giải (tầng 3):** DNS over HTTPS (DoH) — câu hỏi DNS đi trong HTTPS qua cổng 443.
- **Tự giải thích:** Giải thích bằng lời của bạn: HTTPS đã mã hóa nội dung rồi, vậy vì sao vẫn cần mã hóa cả câu hỏi DNS?
  - **Nhóm ý cần chạm:** [trước, trước khi, đi trước, bước đầu] · [tên miền, trang nào, biết bạn vào, lộ, theo dõi]
  - **Trả lời mẫu:** Vì câu hỏi DNS xảy ra TRƯỚC khi kết nối HTTPS được dựng lên; nó đi trần nên người ngồi giữa vẫn biết bạn vào trang nào, dù không đọc được bạn xem gì trong đó.

**6 · Tổng kết:**
- Câu hỏi DNS thường đi trần — ai ngồi giữa cũng đọc được tên miền bạn hỏi.
- DoH bọc câu hỏi đó trong HTTPS và gửi qua cổng 443.
- Đổi lại: riêng tư với nhà mạng, nhưng dồn hết vào một nhà cung cấp.
- *Úp mở bài sau:* Xong chuyện hỏi đường. Còn cái địa chỉ IP của chính máy bạn — ai phát cho bạn, và vì sao phải qua tới bốn nhịp mới xong?

### Bài: Nghe trọn chuyện hỏi cưới bốn nhịp `m6-bai-4`

**1 · Khởi động (hook):** Cắm dây mạng vào là máy có địa chỉ ngay, chẳng phải gõ gì. Nhưng nếu trong nhà có HAI người cùng đứng ra phát địa chỉ thì sao — máy bạn nghe ai?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: máy vừa vào mạng, chưa có địa chỉ nào, thì gửi câu hỏi đầu tiên cho ai?
  - **Dạng:** trắc nghiệm · Gửi cho router — nó biết địa chỉ router mà / **Hét cho cả mạng nghe, vì chưa biết ai là người phát địa chỉ** ✓
  - **Vì sao:** Máy mới chưa có địa chỉ của mình, cũng chưa biết ai phát địa chỉ — nên nó chỉ còn một cách: hét lên cho cả mạng nghe (quảng bá).

**3 · Khám phá (teach):**
- *[m6-dhcp]* DHCP là dịch vụ phát địa chỉ cho máy mới vào mạng. Địa chỉ ấy không phải của bạn mà là THUÊ: có thời hạn, hết hạn thì phải xin gia hạn, không dùng nữa thì trả về cho người sau.
  - **Đào sâu hơn:** Ngoài địa chỉ IP, gói cấp phát còn kèm mặt nạ mạng, địa chỉ gateway và địa chỉ máy chủ DNS — nên chỉ một lần hỏi là máy bạn có đủ mọi thứ cần để ra Internet.
- *[m6-dora]* Bốn nhịp DORA đọc như một chuyện hỏi cưới: chàng trai đứng giữa sân hỏi to "có nhà nào gả không?" (Discover) — các nhà có con gái đánh tiếng "nhà tôi có" (Offer) — chàng chọn MỘT nhà và nói to tên nhà đó cho cả làng nghe (Request) — nhà ấy gật đầu, thế là xong (Ack).
  - **Đào sâu hơn:** Vì sao Request phải nói TO cho cả làng nghe chứ không thì thầm riêng: những nhà kia đang giữ chỗ chờ bạn, nghe thấy bạn chọn người khác thì mới rút lời và trả địa chỉ về kho. Không có nhịp này, mạng có hai máy chủ DHCP sẽ dần cạn địa chỉ vì ai cũng giữ chỗ cho những người đã đi lấy chồng nơi khác.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Xếp bốn nhịp DORA theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Discover — máy mới hét cho cả mạng: "có ai phát địa chỉ không?"
    2. Offer — máy chủ DHCP đánh tiếng: "tôi có địa chỉ này cho bạn"
    3. Request — máy mới nói to: "tôi chọn địa chỉ của máy chủ ấy"
    4. Ack — máy chủ được chọn gật đầu, địa chỉ chính thức thuộc về máy mới
  - **Chủ đề gợi ý (tầng 1):** chuyện hỏi cưới: hỏi — đánh tiếng — chốt — gật đầu
  - **Gợi ý (tầng 2):** Bốn chữ đầu ghép lại thành DORA, và thứ tự chữ cũng chính là thứ tự nhịp.
  - **Lời giải (tầng 3):** Discover → Offer → Request → Ack.
- **Đề:** Nhịp thứ ba của DHCP — nhịp máy mới chốt một máy chủ và nói to cho cả mạng nghe — tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** request
  - **Chủ đề gợi ý (tầng 1):** nhịp chốt lời trong chuyện hỏi cưới
  - **Gợi ý (tầng 2):** Chữ R trong DORA.
  - **Lời giải (tầng 3):** Request — và nó cố tình nói to để những máy chủ không được chọn rút lời.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: bốn nhịp của DHCP ghép lại thành từ gì?
  - **Dạng:** gõ tay · **Chấp nhận:** dora
  - **Chủ đề gợi ý (tầng 1):** chữ đầu của bốn nhịp
  - **Gợi ý (tầng 2):** Bốn chữ cái: hỏi — đánh tiếng — chốt — gật.
  - **Lời giải (tầng 3):** DORA: Discover, Offer, Request, Ack.
- **Tự giải thích:** Giải thích bằng lời của bạn: tại sao DHCP vẫn phải có nhịp Request dù máy bạn ĐÃ nhận được Offer rồi?
  - **Nhóm ý cần chạm:** [nhiều máy chủ, hai máy chủ, nhiều lời, nhiều offer, vài nơi] · [chọn một, chốt, nói rõ, công khai] · [rút lời, trả lại, giải phóng, thu hồi, nhả ra]
  - **Trả lời mẫu:** Vì có thể nhiều máy chủ cùng đánh tiếng, mỗi nơi đang giữ sẵn một địa chỉ cho bạn. Request nói to tên nơi bạn chọn để những nơi kia biết mà rút lời và trả địa chỉ về kho — nếu không, kho địa chỉ sẽ cạn dần vì bị giữ chỗ vô ích.

**6 · Tổng kết:**
- DHCP cho THUÊ địa chỉ, kèm mặt nạ, gateway và máy chủ DNS.
- Bốn nhịp DORA: Discover → Offer → Request → Ack.
- Request nói to để những máy chủ không được chọn rút lời và trả địa chỉ về kho.
- *Úp mở bài sau:* Đã là thuê thì có hạn. Hết hạn mà bạn vẫn đang dùng máy thì chuyện gì xảy ra? Bài cuối module mình xem tờ giấy thuê.

### Bài: Đọc kỹ tờ giấy thuê địa chỉ `m6-bai-5`

**1 · Khởi động (hook):** Máy tính công ty để nguyên cả tuần không tắt vẫn giữ đúng một địa chỉ, còn điện thoại bạn ra quán cà phê một lát về nhà thì địa chỉ đã khác. Ai quyết định chuyện đó?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: máy bạn xin gia hạn địa chỉ vào lúc nào?
  - **Dạng:** trắc nghiệm · Đúng lúc hết hạn / **Khi mới đi được nửa thời hạn — xin sớm cho chắc** ✓ / Chỉ khi mất mạng
  - **Vì sao:** Máy xin gia hạn từ giữa thời hạn: xin sớm thì hỏng một lần vẫn còn nguyên nửa hạn để thử lại, chứ đợi tới phút chót là mất địa chỉ giữa chừng.

**3 · Khám phá (teach):**
- *[m6-lease]* Mỗi địa chỉ được cấp kèm một THỜI HẠN THUÊ. Đi được nửa hạn, máy bạn lặng lẽ xin gia hạn với chính máy chủ đã cấp — chỉ hai nhịp Request và Ack, không phải hỏi lại cả làng. Hỏng thì còn nguyên nửa hạn sau để thử tiếp; tới lúc cạn hạn thật mới quay về hét từ đầu.
  - **Đào sâu hơn:** Mạng công ty hay đặt hạn dài (8 giờ tới vài ngày) vì máy ít thay đổi; quán cà phê đặt hạn ngắn (một hai giờ) vì khách vào ra liên tục — hạn dài ở đó sẽ khóa cứng kho địa chỉ cho những người đã về nhà từ lâu.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Quán cà phê nên đặt thời hạn thuê địa chỉ thế nào?
  - **Dạng:** trắc nghiệm · **Ngắn — khách vào ra liên tục, phải trả địa chỉ về kho sớm** ✓ / Dài — cho khách khỏi phải xin lại
  - **Chủ đề gợi ý (tầng 1):** chuyện gì xảy ra với địa chỉ của khách đã về nhà
  - **Gợi ý (tầng 2):** Nghĩ tới kho địa chỉ: ai đã đi rồi mà vẫn giữ chỗ thì người mới lấy đâu ra chỗ?
  - **Lời giải (tầng 3):** Hạn ngắn, vì khách ra vào liên tục; hạn dài sẽ khóa cứng kho địa chỉ cho những người đã đi từ lâu.
- **Đề:** Lúc gia hạn, máy bạn dùng mấy nhịp của DORA?
  - **Dạng:** gõ tay · **Chấp nhận:** 2 | hai | 2 nhịp | hai nhịp
  - **Chủ đề gợi ý (tầng 1):** gia hạn thì đã biết hỏi ai rồi
  - **Gợi ý (tầng 2):** Không phải hỏi lại cả làng nữa — chỉ còn nhịp chốt và nhịp gật.
  - **Lời giải (tầng 3):** Hai nhịp: Request và Ack, gửi thẳng cho máy chủ đã cấp.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: máy bạn bắt đầu xin gia hạn địa chỉ khi đã dùng hết bao nhiêu phần thời hạn?
  - **Dạng:** gõ tay · **Chấp nhận:** một nửa | mot nua | nửa | nua | 50% | 1/2
  - **Chủ đề gợi ý (tầng 1):** xin sớm để còn đường thử lại
  - **Gợi ý (tầng 2):** Không đợi tới phút chót — mới đi được đúng một phần hai chặng đường.
  - **Lời giải (tầng 3):** Một nửa thời hạn: xin sớm thì hỏng một lần vẫn còn nửa hạn sau để thử lại.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao địa chỉ IP lại cho thuê có hạn thay vì cấp hẳn một lần cho mỗi máy?
  - **Nhóm ý cần chạm:** [có hạn, hết hạn, thu hồi, trả lại, giải phóng] · [máy mới, người sau, dùng lại, tái sử dụng, kho địa chỉ]
  - **Trả lời mẫu:** Vì kho địa chỉ có hạn: máy nào rời mạng mà không trả thì chỗ đó chết cứng. Cho thuê có hạn nên hết hạn không ai gia hạn là địa chỉ tự quay về kho cho người sau dùng.

**6 · Tổng kết:**
- Địa chỉ DHCP là đi thuê có thời hạn, không phải cấp hẳn.
- Đi hết nửa hạn là máy tự xin gia hạn bằng hai nhịp Request + Ack.
- Hạn dài cho mạng ổn định, hạn ngắn cho chỗ khách ra vào liên tục.
- *Úp mở bài sau:* Cả nhà bạn có chục thiết bị, mỗi cái một địa chỉ riêng — vậy mà ra Internet lại chỉ thấy MỘT địa chỉ. Module sau mình mở chuyện NAT và tường lửa.

### Khái niệm & flashcard (8)

- **DNS resolver** `m6-resolver` — Máy chủ phân giải — bên đi hỏi hộ rồi mang câu trả lời về cho máy bạn
  - Ẩn dụ: Như người quen rành đường: bạn hỏi một câu, anh ta chạy vòng quanh hỏi giúp rồi về báo lại.
  - Thẻ ôn: *Máy bạn hỏi ai khi cần tra một tên miền, và bên đó làm gì?* → Hỏi máy chủ phân giải (resolver). Nó chạy vòng hỏi gốc → TLD → máy chủ có thẩm quyền, mang địa chỉ về và nhớ tạm cho lần sau.
- **DNS hierarchy** `m6-phan-cap` — Ba tầng của DNS: gốc → TLD → máy chủ có thẩm quyền
  - Ẩn dụ: Hỏi đường ba chặng: người ở ngã tư chỉ sang huyện, huyện chỉ sang xã, xã mới biết đúng nhà.
  - Thẻ ôn: *Ba tầng của DNS theo đúng thứ tự hỏi là gì?* → Máy chủ gốc (biết ai quản .com) → máy chủ TLD (.com) → máy chủ có thẩm quyền của tên miền, nơi giữ câu trả lời thật.
- **A / AAAA record** `m6-ban-ghi-a` — Bản ghi trỏ tên miền tới địa chỉ IPv4 (A) hoặc IPv6 (AAAA)
  - Ẩn dụ: Dòng cơ bản nhất trong sổ danh bạ: tên này ở địa chỉ kia.
  - Thẻ ôn: *Bản ghi A và AAAA khác nhau ở chỗ nào?* → A trỏ tên miền tới địa chỉ IPv4; AAAA trỏ tới địa chỉ IPv6 (bốn chữ A vì địa chỉ dài gấp bốn).
- **CNAME / MX record** `m6-ban-ghi-cname-mx` — Bản ghi biệt danh (CNAME) và bản ghi máy chủ thư (MX)
  - Ẩn dụ: CNAME là "tên này thật ra là tên kia"; MX là "thư của nhà này đưa cho bác kia giữ".
  - Thẻ ôn: *CNAME và MX dùng để làm gì?* → CNAME khai biệt danh trỏ về một tên khác; MX chỉ ra máy chủ nhận thư cho tên miền đó.
- **DNS over HTTPS** `m6-doh` — Bọc câu hỏi DNS trong HTTPS và gửi qua cổng 443
  - Ẩn dụ: Thay vì hỏi to giữa đường, bạn viết câu hỏi vào phong bì niêm phong rồi mới gửi đi.
  - Thẻ ôn: *DNS over HTTPS giải quyết chuyện gì, và đánh đổi cái gì?* → Giấu tên miền bạn hỏi khỏi người ngồi giữa (đi qua cổng 443). Đổi lại, câu hỏi dồn hết về một nhà cung cấp và bộ lọc của mạng công ty khó làm việc hơn.
- **DHCP** `m6-dhcp` — Dịch vụ cho thuê địa chỉ IP cùng mặt nạ, gateway và máy chủ DNS
  - Ẩn dụ: Như thuê nhà: có giấy, có thời hạn, hết hạn thì gia hạn hoặc trả lại chìa khóa.
  - Thẻ ôn: *Ngoài địa chỉ IP, DHCP còn cấp cho máy bạn những gì?* → Mặt nạ mạng, địa chỉ gateway và địa chỉ máy chủ DNS — đủ để ra Internet chỉ sau một lần hỏi.
- **DORA** `m6-dora` — Bốn nhịp cấp phát địa chỉ: Discover, Offer, Request, Ack
  - Ẩn dụ: Chuyện hỏi cưới: hỏi to giữa sân — nhà có con gái đánh tiếng — chốt một nhà trước cả làng — nhà ấy gật đầu.
  - Thẻ ôn: *Bốn nhịp DORA, và vì sao nhịp Request phải nói to cho cả mạng nghe?* → Discover → Offer → Request → Ack. Request nói to để những máy chủ không được chọn rút lời và trả địa chỉ đang giữ chỗ về kho.
- **DHCP lease** `m6-lease` — Thời hạn thuê địa chỉ và việc gia hạn giữa chừng
  - Ẩn dụ: Tờ giấy thuê có ngày hết hạn; đi được nửa hạn là đã đi xin gia hạn cho chắc.
  - Thẻ ôn: *Khi nào máy bạn xin gia hạn địa chỉ, và bằng mấy nhịp?* → Khi dùng hết một nửa thời hạn, bằng hai nhịp Request + Ack gửi thẳng cho máy chủ đã cấp.

### Bài kiểm tra module (8 câu, cần ≥ 85%)

- **Đề:** Xếp lại vòng đi hỏi của một câu tra tên miền theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Máy bạn hỏi máy chủ phân giải
    2. Resolver hỏi máy chủ gốc
    3. Resolver hỏi máy chủ TLD (.com)
    4. Resolver hỏi máy chủ có thẩm quyền và nhận địa chỉ IP
  - **Vì sao:** Vòng hỏi đi từ chung tới riêng; mỗi tầng chỉ biết chỉ sang tầng sau, không tầng nào biết tất cả.
- **Đề:** Máy chủ giữ câu trả lời thật cho một tên miền gọi là máy chủ gì?
  - **Dạng:** gõ tay · **Chấp nhận:** có thẩm quyền | co tham quyen | thẩm quyền | tham quyen | authoritative
  - **Vì sao:** Máy chủ có thẩm quyền (authoritative) — nơi chủ tên miền khai địa chỉ thật; hai tầng trên chỉ chỉ đường.
- **Đề:** Bạn muốn thư gửi tới tên miền công ty rơi đúng vào máy chủ thư. Khai bản ghi loại nào?
  - **Dạng:** trắc nghiệm · **MX** ✓ / A / CNAME
  - **Vì sao:** MX chỉ ra máy chủ nhận thư cho tên miền, nhờ đó web và hòm thư nằm hai nơi vẫn chạy.
- **Đề:** Bản ghi trỏ tên miền tới một địa chỉ IPv6 tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** aaaa | quad a
  - **Vì sao:** AAAA — bản anh em của A, dành cho địa chỉ IPv6 dài gấp bốn lần.
- **Đề:** DNS over HTTPS gửi câu hỏi qua cổng nào, và giấu được điều gì?
  - **Dạng:** trắc nghiệm · **Cổng 443 — giấu tên miền bạn hỏi khỏi người ngồi giữa** ✓ / Cổng 53 — giấu nội dung trang web / Cổng 80 — giấu địa chỉ IP của bạn
  - **Vì sao:** Câu hỏi DNS được bọc trong HTTPS qua cổng 443 nên trông như một lượt truy cập web bình thường.
- **Đề:** Xếp bốn nhịp DHCP theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Discover
    2. Offer
    3. Request
    4. Ack
  - **Vì sao:** DORA: hỏi to giữa sân — nhà có thì đánh tiếng — chốt một nhà trước cả làng — nhà ấy gật đầu.
- **Đề:** Vì sao nhịp Request của DHCP phải gửi dạng quảng bá cho cả mạng nghe?
  - **Dạng:** trắc nghiệm · **Để những máy chủ không được chọn rút lời và trả địa chỉ đang giữ chỗ về kho** ✓ / Để router ghi lại địa chỉ mới của bạn / Vì máy bạn vẫn chưa biết địa chỉ của máy chủ DHCP
  - **Vì sao:** Nhiều máy chủ có thể cùng đánh tiếng và mỗi nơi giữ sẵn một địa chỉ; Request nói to để những nơi không được chọn giải phóng chỗ đã giữ.
- **Đề:** Máy bạn bắt đầu xin gia hạn địa chỉ khi đã dùng hết bao nhiêu phần thời hạn thuê?
  - **Dạng:** gõ tay · **Chấp nhận:** một nửa | mot nua | nửa | nua | 50% | 1/2
  - **Vì sao:** Một nửa — xin sớm thì hỏng một lần vẫn còn nửa hạn sau để thử lại, không mất địa chỉ giữa chừng.

## NAT, Firewall và mạng nhà bạn `module-7`

Phần B · 5 chặng · 5 bài · 6 khái niệm

**Chặng:** Một số nhà cho cả chung cư (m7-bai-1) → Mở một cánh cửa vào nhà (m7-bai-2) → Người gác cửa nhớ mặt (m7-bai-3) → Sơ đồ nhà bạn (m7-bai-4) → Khi nhà có hai lớp cổng (m7-bai-5)

### Bài: Tìm ra cả nhà đang dùng chung một địa chỉ `m7-bai-1`

**1 · Khởi động (hook):** Nhà bạn có chục thiết bị, mỗi cái một địa chỉ riêng. Vậy mà tra "địa chỉ IP của tôi" trên máy tính và trên điện thoại lại ra CÙNG một con số. Con số đó của ai?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: địa chỉ công cộng mà cả nhà bạn dùng chung là địa chỉ của thiết bị nào?
  - **Dạng:** trắc nghiệm · Của máy tính đang mở / **Của router nhà bạn, ở phía quay ra Internet** ✓ / Của nhà cung cấp dịch vụ, không thuộc nhà bạn
  - **Vì sao:** Địa chỉ công cộng nằm ở cổng WAN của router — cái chân quay ra ngoài. Mọi thiết bị trong nhà mượn chung con số đó khi ra Internet.

**3 · Khám phá (teach):**
- *[m7-nat]* Ẩn dụ chung cư quay lại: mạng nhà bạn là một tòa nhà, mỗi thiết bị là một căn hộ mang địa chỉ riêng (192.168.x.x). Cả tòa chỉ có MỘT số nhà nhìn từ ngoài đường — địa chỉ công cộng ở cổng WAN của router. NAT là việc router đổi địa chỉ riêng thành số nhà chung khi gói tin đi ra.
  - **Đào sâu hơn:** Địa chỉ riêng do đó không cần duy nhất trên thế giới: nhà bạn và nhà hàng xóm cùng dùng 192.168.1.10 chẳng sao cả, vì hai con số ấy không bao giờ xuất hiện ngoài Internet.
- *[m7-pat]* Nhưng thư trả về thì giao cho ai? Router giữ một CUỐN SỔ: mỗi lượt đi ra, nó ghi "căn hộ 192.168.1.10 cổng 51344 ↔ số nhà chung cổng 40001". Thư về mang cổng 40001 thì tra sổ là biết đưa lên căn hộ nào. Dùng số cổng để phân biệt như vậy gọi là PAT.
  - **Đào sâu hơn:** Vì bảng này chỉ có dòng khi có người TRONG nhà mở lời trước, nên mặc định người ngoài không tự gõ cửa vào được — router không biết đưa cho ai. Đó là lý do mạng nhà tự nhiên đã kín một nửa, dù bạn chưa cài tường lửa nào.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Ví dụ giải sẵn: máy tính 192.168.1.10 mở một trang web. (1) Gói đi ra mang địa chỉ nguồn 192.168.1.10 cổng 51344. (2) Router đổi nguồn thành 203.0.113.7 cổng 40001 và ghi cặp đó vào sổ. (3) Máy chủ trả lời về 203.0.113.7 cổng 40001. (4) Router tra sổ, đổi ngược lại và đưa gói lên đúng máy tính. Đọc kỹ bước 2 rồi thử tự gọi tên cuốn sổ ấy nhé.
- **Đề:** Việc router đổi địa chỉ riêng thành địa chỉ công cộng khi gói tin đi ra gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** nat | network address translation
  - **Chủ đề gợi ý (tầng 1):** chuyện xảy ra với địa chỉ nguồn khi gói rời khỏi nhà
  - **Gợi ý (tầng 2):** Ba chữ cái, chữ giữa là "address".
  - **Lời giải (tầng 3):** NAT — Network Address Translation, việc đổi địa chỉ riêng thành địa chỉ công cộng ở cổng WAN.
- **Đề:** Nhờ đâu router biết thư trả về thuộc máy nào trong nhà?
  - **Dạng:** trắc nghiệm · **Tra cuốn sổ ghi cặp địa chỉ và SỐ CỔNG lúc gói đi ra** ✓ / Hỏi lại tất cả các máy trong nhà / Dựa vào địa chỉ MAC ghi trong gói tin
  - **Chủ đề gợi ý (tầng 1):** thứ router ghi lại lúc gói đi ra
  - **Gợi ý (tầng 2):** Đúng thứ đã giúp phân biệt các ứng dụng ở Module 5 — con số căn hộ.
  - **Lời giải (tầng 3):** Tra bảng NAT/PAT: mỗi dòng ghi cặp "địa chỉ riêng + cổng riêng ↔ địa chỉ chung + cổng chung".

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: cách NAT dùng SỐ CỔNG để cả nhà chung một địa chỉ công cộng gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** pat | port address translation
  - **Chủ đề gợi ý (tầng 1):** chữ đầu là tên con số phân biệt các căn hộ
  - **Gợi ý (tầng 2):** Giống NAT nhưng chữ đầu đổi thành chữ đầu của "port".
  - **Lời giải (tầng 3):** PAT — Port Address Translation, phân biệt từng máy trong nhà bằng số cổng trên cùng một địa chỉ chung.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao nhà bạn và nhà hàng xóm cùng dùng địa chỉ 192.168.1.10 mà không đụng nhau?
  - **Nhóm ý cần chạm:** [riêng, nội bộ, trong nhà, private] · [không ra ngoài, đổi, nat, không xuất hiện, thay bằng]
  - **Trả lời mẫu:** Vì đó là địa chỉ riêng, chỉ có nghĩa trong phạm vi từng nhà; ra tới Internet thì router đã đổi nó thành địa chỉ công cộng của nhà mình rồi, nên hai con số giống nhau không bao giờ gặp nhau ngoài đường.

**6 · Tổng kết:**
- Cả nhà là một chung cư: nhiều địa chỉ riêng, một số nhà chung ra ngoài.
- NAT đổi địa chỉ riêng thành địa chỉ công cộng ở cổng WAN của router.
- PAT dùng số cổng để biết thư về thuộc máy nào — router tra sổ.
- *Úp mở bài sau:* Sổ chỉ có dòng khi người trong nhà mở lời trước. Vậy muốn ai đó ngoài đường chủ động gõ cửa vào một máy trong nhà thì làm sao?

### Bài: Chừa sẵn một lối vào cho người ngoài `m7-bai-2`

**1 · Khởi động (hook):** Bạn muốn xem camera nhà mình từ chỗ làm. Nhưng router không biết gói tin lạ từ ngoài đường thuộc về máy nào trong nhà — vậy phải dặn nó trước bằng cách gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: muốn truy cập được một máy trong nhà từ Internet, bạn phải khai gì trên router?
  - **Dạng:** trắc nghiệm · **Một dòng dặn trước: cổng nào từ ngoài thì đưa vào máy nào, cổng nào** ✓ / Đổi địa chỉ máy đó thành địa chỉ công cộng / Tắt NAT đi
  - **Vì sao:** Đó là port forwarding: bạn ghi sẵn một dòng trong sổ của router, để gói tin lạ tới cổng đã khai được đưa thẳng vào đúng máy trong nhà.

**3 · Khám phá (teach):**
- *[m7-port-forwarding]* Port forwarding là một dòng bạn ghi TRƯỚC vào sổ của router: "ai gõ vào cổng 8080 của số nhà chung thì dẫn tới máy 192.168.1.50 cổng 80". Từ đó người ngoài gõ đúng cổng ấy là vào được đúng máy ấy — dù trong nhà chưa ai mở lời.
  - **Đào sâu hơn:** Mỗi dòng như vậy là một cánh cửa mở thường trực ra Internet, và cả thế giới đều dò được. Nhớ lại tòa nhà 15 phòng: mở 3389 hay 445 ra ngoài là mời cả hành tinh thử mật khẩu vào màn hình và ổ đĩa nhà bạn.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Cổng nào sau đây TUYỆT ĐỐI không nên mở thẳng ra Internet bằng port forwarding?
  - **Dạng:** trắc nghiệm · **3389 — màn hình máy tính từ xa** ✓ / 443 — trang web có khóa / 123 — đồng bộ giờ
  - **Chủ đề gợi ý (tầng 1):** phòng có tấm gương chiếu nguyên màn hình
  - **Gợi ý (tầng 2):** Nghĩ xem cổng nào cho người ngoài ngồi thẳng vào máy bạn nếu đoán trúng mật khẩu.
  - **Lời giải (tầng 3):** 3389 (RDP): mở ra Internet là mời cả thế giới thử mật khẩu để vào thẳng màn hình máy bạn.
- **Đề:** Dòng khai sẵn trên router để người ngoài vào được một máy trong nhà gọi là gì? (tiếng Anh cũng được)
  - **Dạng:** gõ tay · **Chấp nhận:** port forwarding | chuyển tiếp cổng | chuyen tiep cong | forward cổng | mở cổng
  - **Chủ đề gợi ý (tầng 1):** việc router làm với gói tin tới đúng cổng đã khai
  - **Gợi ý (tầng 2):** Hai từ: một từ là "cổng", từ kia nghĩa là chuyển tiếp.
  - **Lời giải (tầng 3):** Port forwarding — chuyển tiếp cổng: khai trước cổng nào từ ngoài thì đưa vào máy nào trong nhà.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: vì sao bình thường người ngoài KHÔNG tự vào được máy trong nhà bạn? (một câu ngắn)
  - **Dạng:** gõ tay · **Chấp nhận:** router không biết đưa cho ai | khong biet dua cho ai | không có trong bảng nat | khong co trong bang nat | chưa ai trong nhà mở lời | chua ai trong nha mo loi
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ chỉ có dòng khi nào
  - **Gợi ý (tầng 2):** Sổ NAT chỉ ghi dòng khi có người trong nhà mở lời trước.
  - **Lời giải (tầng 3):** Vì bảng NAT chưa có dòng nào cho gói tin đó — router không biết đưa lên căn hộ nào nên bỏ luôn.
- **Tự giải thích:** Giải thích bằng lời của bạn: port forwarding tiện ở chỗ nào và nguy ở chỗ nào?
  - **Nhóm ý cần chạm:** [từ xa, từ ngoài, truy cập, vào được] · [cả thế giới, ai cũng, dò, tấn công, rủi ro, mật khẩu]
  - **Trả lời mẫu:** Tiện vì từ ngoài vào thẳng được máy trong nhà, không cần ai ở nhà mở lời trước. Nguy vì cánh cửa đó mở thường trực với cả Internet, ai cũng dò được và cứ thế thử mật khẩu.

**6 · Tổng kết:**
- Bình thường người ngoài không vào được vì bảng NAT chưa có dòng nào cho họ.
- Port forwarding là dòng khai trước: cổng ngoài nào dẫn vào máy nào, cổng nào.
- Mỗi dòng là một cửa mở thường trực — đừng bao giờ mở 3389 hay 445.
- *Úp mở bài sau:* Nhưng vì sao thư trả lời của một trang web thì router cho vào, còn gói tin lạ y hệt lại bị chặn? Người gác cửa nhớ mặt bằng cách nào?

### Bài: Xem người gác cửa lật sổ `m7-bai-3`

**1 · Khởi động (hook):** Một gói tin từ Internet gõ cửa nhà bạn. Router cho vào nếu đó là thư trả lời, chặn nếu là người lạ tự tới — mà hai gói tin nhìn gần như y hệt nhau. Nó phân biệt kiểu gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: tường lửa "có nhớ trạng thái" khác tường lửa thường ở chỗ nào?
  - **Dạng:** trắc nghiệm · **Nó nhớ những kết nối do người trong nhà mở ra, và chỉ cho thư trả lời của đúng những kết nối đó vào** ✓ / Nó chạy nhanh hơn / Nó chặn được virus trong tệp tải về
  - **Vì sao:** Stateful nghĩa là có nhớ: mỗi kết nối đi ra được ghi vào bảng, và chỉ gói tin khớp một dòng trong bảng ấy mới được đi vào.

**3 · Khám phá (teach):**
- *[m7-firewall-stateful]* Tường lửa có nhớ trạng thái giữ một bảng các cuộc trò chuyện đang mở: ai trong nhà vừa gọi ra đâu, bằng cổng nào. Gói tin từ ngoài vào chỉ được qua nếu khớp một dòng trong bảng — tức là đúng câu trả lời của một cuộc gọi có thật. Người lạ tự tới, không có dòng nào, thì mời về.
  - **Đào sâu hơn:** Mỗi dòng còn có hạn: cuộc trò chuyện im lặng quá lâu thì bị xóa khỏi bảng để lấy chỗ. Đó là lý do vài ứng dụng phải gửi gói "giữ nhịp" đều đặn, nếu không kết nối tự đứt sau vài phút không nói gì.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Máy bạn mở một trang web. Gói tin trả về từ máy chủ đó được vào nhà vì sao?
  - **Dạng:** trắc nghiệm · **Vì nó khớp một dòng trong bảng kết nối đang mở của tường lửa** ✓ / Vì máy chủ web là địa chỉ tin cậy / Vì cổng 443 luôn được mở sẵn
  - **Chủ đề gợi ý (tầng 1):** thứ được ghi vào bảng lúc bạn mở lời
  - **Gợi ý (tầng 2):** Tường lửa không quen ai cả — nó chỉ nhớ những cuộc gọi vừa đi ra.
  - **Lời giải (tầng 3):** Vì lúc bạn mở lời, tường lửa đã ghi cuộc trò chuyện đó vào bảng; gói trả về khớp đúng dòng ấy nên được qua.
- **Đề:** Tường lửa có nhớ các kết nối đang mở được gọi bằng tính từ tiếng Anh nào?
  - **Dạng:** gõ tay · **Chấp nhận:** stateful
  - **Chủ đề gợi ý (tầng 1):** tính từ nghĩa là "có nhớ trạng thái"
  - **Gợi ý (tầng 2):** Ghép từ "state" (trạng thái) với đuôi "-ful".
  - **Lời giải (tầng 3):** Stateful — tường lửa có nhớ trạng thái của từng kết nối.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: tường lửa stateful cho một gói tin từ ngoài đi vào khi nào?
  - **Dạng:** gõ tay · **Chấp nhận:** khi khớp một kết nối đang mở | khop mot ket noi dang mo | khi nó là thư trả lời | khi no la thu tra loi | khi có trong bảng kết nối | khi co trong bang ket noi
  - **Chủ đề gợi ý (tầng 1):** điều kiện duy nhất để được qua cửa
  - **Gợi ý (tầng 2):** Nó phải là câu trả lời cho một cuộc gọi mà người trong nhà đã mở.
  - **Lời giải (tầng 3):** Khi gói tin khớp một dòng trong bảng kết nối đang mở — tức là thư trả lời của một cuộc trò chuyện do bên trong khởi xướng.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao chỉ riêng NAT đã che được phần nào cho mạng nhà, nhưng vẫn cần thêm tường lửa?
  - **Nhóm ý cần chạm:** [bảng, sổ, dòng, không biết đưa cho ai] · [luật, chặn, lọc, kiểm soát, chủ động]
  - **Trả lời mẫu:** NAT che được vì gói lạ không có dòng nào trong bảng nên router không biết đưa cho ai; nhưng đó chỉ là tác dụng phụ. Tường lửa mới là thứ chặn có luật rõ ràng: cho ai đi ra, cho gì đi vào, và ghi lại được.

**6 · Tổng kết:**
- Stateful nghĩa là có nhớ: bảng ghi mọi kết nối đang mở.
- Gói từ ngoài chỉ qua được nếu khớp một dòng trong bảng ấy.
- Dòng có hạn — im lặng lâu là bị xóa, nên mới có gói giữ nhịp.
- *Úp mở bài sau:* Ba bài vừa rồi nói về cái router nhà bạn. Bài sau bạn sẽ tự lắp lại sơ đồ mạng nhà mình và cho nó chạy thật.

### Bài: Lắp lại mạng nhà bạn trên bàn `m7-bai-4`

**1 · Khởi động (hook):** Trong nhà bạn có một cái hộp nhấp nháy đèn. Nó là modem, là router, hay là cả hai? Và cái dây từ ngoài đường cắm vào chân nào của nó?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: modem và router khác nhau ở chỗ nào?
  - **Dạng:** trắc nghiệm · **Modem nối nhà bạn với nhà mạng; router chia đường cho các thiết bị trong nhà** ✓ / Modem phát Wi-Fi, router thì không / Hai từ chỉ cùng một thứ
  - **Vì sao:** Modem là cái chân bước ra đường của nhà bạn; router là người chia đường bên trong. Hộp nhà mạng cho mượn thường gộp cả hai (và cả điểm phát Wi-Fi) vào một vỏ.

**3 · Khám phá (teach):**
- *[m7-mang-nha]* Mạng nhà xếp thành một hàng: đường của nhà mạng → MODEM (bước ra đường) → ROUTER (chia đường, làm NAT, giữ tường lửa) → SWITCH và ĐIỂM PHÁT WI-FI (nối các thiết bị). Cái hộp nhà mạng cho mượn thường gộp cả ba vai vào một vỏ, nên nhìn thì thấy một hộp mà thật ra là ba việc.
  - **Đào sâu hơn:** Biết tách ba vai là biết chỗ chẩn đoán: đèn modem tắt là chuyện của nhà mạng; máy có địa chỉ 192.168 mà không ra được Internet là chuyện của router; máy này thấy máy kia nhưng cả hai không ra ngoài thì switch vẫn ổn, lỗi nằm phía trên.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Lắp lại mạng nhà bạn: nối máy tính và điện thoại qua switch vào router nhà, rồi đặt địa chỉ cho hai thiết bị đó sao cho cả hai ra được máy chủ ngoài Internet. Phần từ router ra nhà mạng đã đấu sẵn, y như đời thật.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** Máy tính [chưa đặt IP] · Điện thoại [chưa đặt IP] · Switch trong nhà [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1, p4:VLAN 1] · Router nhà [lan:192.168.1.1/24, wan:203.0.113.2/30] · Modem nhà mạng [g0:203.0.113.1/30, g1:198.51.100.1/24] · Máy chủ trên Internet [198.51.100.10/24, gw 198.51.100.1] — dây: Router nhà·wan — Modem nhà mạng·g0 | Modem nhà mạng·g1 — Máy chủ trên Internet·eth0
    - **Mục tiêu:**
      - m7-may-tinh PHẢI gọi được m7-may-chu
      - m7-dien-thoai PHẢI gọi được m7-may-chu
    - **Được phép:** cắm dây, gỡ dây, đặt địa chỉ
    - **Lời giải mẫu:** Máy tính [192.168.1.10/24, gw 192.168.1.1] · Điện thoại [192.168.1.11/24, gw 192.168.1.1] · Switch trong nhà [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1, p4:VLAN 1] · Router nhà [lan:192.168.1.1/24, wan:203.0.113.2/30] · Modem nhà mạng [g0:203.0.113.1/30, g1:198.51.100.1/24] · Máy chủ trên Internet [198.51.100.10/24, gw 198.51.100.1] — dây: Router nhà·wan — Modem nhà mạng·g0 | Modem nhà mạng·g1 — Máy chủ trên Internet·eth0 | Máy tính·eth0 — Switch trong nhà·p1 | Điện thoại·wlan0 — Switch trong nhà·p2 | Switch trong nhà·p3 — Router nhà·lan
  - **Chủ đề gợi ý (tầng 1):** thứ mỗi thiết bị cần để biết đường ra khỏi nhà
  - **Gợi ý (tầng 2):** Nối máy tính và điện thoại vào switch, switch nối lên cổng LAN của router nhà. Rồi mỗi thiết bị cần một địa chỉ cùng dải 192.168.1.x và gateway trỏ về 192.168.1.1.
  - **Lời giải (tầng 3):** Máy tính 192.168.1.10/24 và điện thoại 192.168.1.11/24, cả hai đặt gateway 192.168.1.1; dây đi từ hai thiết bị vào switch, rồi từ switch lên cổng LAN của router nhà. Phần WAN ra modem đã đấu sẵn.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại sơ đồ: xếp các chặng của mạng nhà theo thứ tự từ ngoài đường vào tới máy bạn.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Đường của nhà mạng
    2. Modem — chân bước ra đường của nhà bạn
    3. Router — chia đường, làm NAT, giữ tường lửa
    4. Switch và điểm phát Wi-Fi
    5. Máy tính, điện thoại và các thiết bị khác
  - **Chủ đề gợi ý (tầng 1):** ba vai thường gộp trong một cái hộp
  - **Gợi ý (tầng 2):** Đi từ ngoài vào: ai chạm đường trước, ai chia đường, ai nối thiết bị.
  - **Lời giải (tầng 3):** Đường nhà mạng → modem → router → switch/Wi-Fi → thiết bị.
- **Tự giải thích:** Giải thích bằng lời của bạn: nếu máy bạn có địa chỉ 192.168.1.x mà vẫn không vào được Internet, bạn nghi chặng nào trước?
  - **Nhóm ý cần chạm:** [router, gateway, cửa ra, chặng trên] · [trong nhà, nội bộ, vẫn thấy, lan]
  - **Trả lời mẫu:** Có địa chỉ 192.168.1.x nghĩa là phần trong nhà (switch và router phát địa chỉ) vẫn chạy, nên mình nghi chặng phía trên: đường ra của router, hoặc modem và đường nhà mạng.

**6 · Tổng kết:**
- Mạng nhà là một hàng: nhà mạng → modem → router → switch/Wi-Fi → thiết bị.
- Một cái hộp nhà mạng cho mượn thường gộp cả ba vai vào một vỏ.
- Tách được ba vai là biết nghi đúng chặng khi mất mạng.
- *Úp mở bài sau:* Nếu bạn cắm thêm một router thứ hai cho rộng sóng thì sao? Có nhà tự nhiên sinh ra hai lớp cổng — và nhiều thứ bắt đầu trục trặc.

### Bài: Gỡ cái nhà có hai lớp cổng `m7-bai-5`

**1 · Khởi động (hook):** Bạn mua thêm một router cho sóng khỏe, cắm vào hộp nhà mạng. Wi-Fi mạnh hẳn, nhưng camera xem từ xa thì chết, gọi video hay giật. Chuyện gì vừa xảy ra?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: cắm router thứ hai vào sau hộp nhà mạng thì mạng nhà có mấy lớp NAT?
  - **Dạng:** trắc nghiệm · Một / **Hai** ✓
  - **Vì sao:** Hộp nhà mạng đã làm NAT một lần, router mới làm thêm một lần nữa — nhà bạn thành hai lớp cổng lồng nhau.

**3 · Khám phá (teach):**
- *[m7-double-nat]* Hai lớp NAT nghĩa là gói tin bị đổi địa chỉ hai lần, và có HAI cuốn sổ ở hai chỗ khác nhau. Port forwarding khai ở router trong thì hộp ngoài không biết, khai ở hộp ngoài thì nó chỉ dẫn tới router trong chứ không tới máy bạn — cửa mở nửa vời nên camera không xem được từ xa.
  - **Đào sâu hơn:** Cách gỡ gọn nhất thường là để router thứ hai làm ĐIỂM PHÁT SÓNG: tắt phần phát địa chỉ và NAT của nó, cắm dây vào cổng LAN thay vì cổng WAN. Khi ấy cả nhà lại chỉ còn một lớp cổng, một cuốn sổ, một chỗ để khai.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Cách gỡ hai lớp NAT gọn nhất khi bạn muốn dùng router thứ hai cho rộng sóng?
  - **Dạng:** trắc nghiệm · **Để router thứ hai làm điểm phát sóng: tắt NAT và phát địa chỉ, cắm dây vào cổng LAN** ✓ / Khai port forwarding trên cả hai thiết bị / Đặt cùng một dải địa chỉ cho cả hai router
  - **Chủ đề gợi ý (tầng 1):** làm sao để chỉ còn một cuốn sổ
  - **Gợi ý (tầng 2):** Nếu nhà chỉ nên có một lớp cổng, thì thiết bị thứ hai không được làm cổng nữa.
  - **Lời giải (tầng 3):** Cho router thứ hai làm điểm phát sóng: tắt NAT và phát địa chỉ, cắm dây vào cổng LAN — cả nhà quay về một lớp NAT, một cuốn sổ.
- **Đề:** Tình trạng gói tin bị đổi địa chỉ hai lần bởi hai router lồng nhau gọi là gì? (tiếng Anh cũng được)
  - **Dạng:** gõ tay · **Chấp nhận:** double nat | nat kép | nat kep | hai lớp nat | hai lop nat
  - **Chủ đề gợi ý (tầng 1):** hai lớp cổng lồng nhau
  - **Gợi ý (tầng 2):** Ghép chữ "hai lần" với tên của việc đổi địa chỉ.
  - **Lời giải (tầng 3):** Double NAT (NAT kép) — hai lớp đổi địa chỉ, hai cuốn sổ ở hai chỗ.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: vì sao port forwarding hay hỏng khi nhà có hai lớp NAT?
  - **Dạng:** gõ tay · **Chấp nhận:** vì có hai cuốn sổ | vi co hai cuon so | hai bảng nat | hai bang nat | khai một chỗ chưa đủ | khai mot cho chua du
  - **Chủ đề gợi ý (tầng 1):** khai ở đâu thì thiết bị kia có biết không
  - **Gợi ý (tầng 2):** Mỗi lớp giữ một cuốn sổ riêng, mà bạn chỉ khai ở một cuốn.
  - **Lời giải (tầng 3):** Vì có hai cuốn sổ ở hai thiết bị: khai một chỗ thì chỗ kia không biết, nên cánh cửa chỉ mở được nửa đường.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao thêm một router lại làm hỏng những thứ đang chạy tốt?
  - **Nhóm ý cần chạm:** [hai lần, hai lớp, lồng nhau, thêm một lớp] · [sổ, bảng, không biết, chỉ tới router, nửa đường]
  - **Trả lời mẫu:** Vì gói tin bị đổi địa chỉ thêm một lần nữa và sinh ra cuốn sổ thứ hai; những thứ cần người ngoài chủ động gõ cửa như camera hay gọi video thì khai một cuốn sổ là chưa đủ, gói tin dừng lại giữa hai lớp.

**6 · Tổng kết:**
- Cắm router thứ hai vào cổng WAN là sinh ra hai lớp NAT, hai cuốn sổ.
- Port forwarding khai một chỗ thì cửa chỉ mở được nửa đường.
- Gỡ bằng cách cho router thứ hai làm điểm phát sóng, cắm vào cổng LAN.
- *Úp mở bài sau:* Hết Phần B. Phần sau là chuyện đi làm: Wi-Fi chuyên sâu, máy chủ Windows, và một phòng khám mạng nơi bạn vào vai người chẩn đoán.

### Khái niệm & flashcard (6)

- **NAT** `m7-nat` — Đổi địa chỉ riêng trong nhà thành địa chỉ công cộng khi ra Internet
  - Ẩn dụ: Cả chung cư một số nhà: thư ra ngoài đều ghi số nhà chung, không ghi số căn hộ.
  - Thẻ ôn: *NAT làm gì với gói tin đi ra Internet?* → Đổi địa chỉ nguồn từ địa chỉ riêng (192.168.x.x) thành địa chỉ công cộng ở cổng WAN của router.
- **PAT** `m7-pat` — Dùng số cổng để nhiều máy chung một địa chỉ công cộng
  - Ẩn dụ: Cuốn sổ của bảo vệ: thư về mang số nào thì dẫn lên đúng căn hộ đó.
  - Thẻ ôn: *Nhờ đâu router biết thư trả về thuộc máy nào trong nhà?* → Nhờ bảng NAT/PAT: mỗi dòng ghi "địa chỉ riêng + cổng riêng ↔ địa chỉ chung + cổng chung" lúc gói đi ra.
- **Port forwarding** `m7-port-forwarding` — Khai trước một lối vào: cổng ngoài nào dẫn tới máy nào trong nhà
  - Ẩn dụ: Dặn bảo vệ: ai tới hỏi phòng 402 thì cứ dẫn lên.
  - Thẻ ôn: *Port forwarding dùng khi nào, và nguy ở chỗ nào?* → Khi cần người ngoài chủ động vào một máy trong nhà. Nguy vì đó là cửa mở thường trực ra Internet — không bao giờ mở 3389 hay 445.
- **Stateful firewall** `m7-firewall-stateful` — Tường lửa có nhớ các kết nối đang mở
  - Ẩn dụ: Người gác cửa nhớ mặt: chỉ cho vào những ai là câu trả lời của một cuộc gọi từ trong nhà.
  - Thẻ ôn: *Tường lửa stateful cho gói tin từ ngoài vào khi nào?* → Khi gói khớp một dòng trong bảng kết nối đang mở — tức là thư trả lời của cuộc trò chuyện do bên trong khởi xướng.
- **Kiến trúc mạng nhà** `m7-mang-nha` — Nhà mạng → modem → router → switch/Wi-Fi → thiết bị
  - Ẩn dụ: Một hàng người chuyền tay: người chạm đường, người chia đường, người phát tới từng phòng.
  - Thẻ ôn: *Mạng nhà đi qua những chặng nào, từ ngoài đường vào tới máy bạn?* → Đường nhà mạng → modem → router (NAT + tường lửa) → switch và điểm phát Wi-Fi → thiết bị. Một hộp nhà mạng thường gộp cả ba vai.
- **Double NAT** `m7-double-nat` — Hai lớp đổi địa chỉ do hai router lồng nhau
  - Ẩn dụ: Nhà có hai lớp cổng, mỗi lớp một cuốn sổ — khai một cuốn thì khách vẫn kẹt ở giữa.
  - Thẻ ôn: *Vì sao double NAT làm hỏng port forwarding, và gỡ thế nào?* → Vì có hai bảng NAT ở hai thiết bị, khai một chỗ là chưa đủ. Gỡ bằng cách cho router thứ hai làm điểm phát sóng: tắt NAT, cắm vào cổng LAN.

### Bài kiểm tra module (8 câu, cần ≥ 85%)

- **Đề:** Việc router đổi địa chỉ riêng thành địa chỉ công cộng khi gói tin ra Internet gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** nat | network address translation
  - **Vì sao:** NAT — đổi địa chỉ nguồn ở cổng WAN, nhờ đó cả nhà dùng chung một địa chỉ công cộng.
- **Đề:** Nhờ đâu router biết gói tin trả về thuộc máy nào trong nhà?
  - **Dạng:** trắc nghiệm · **Tra bảng NAT/PAT ghi cặp địa chỉ và số cổng lúc gói đi ra** ✓ / Dựa vào địa chỉ MAC của máy nhận / Hỏi lại tất cả thiết bị trong nhà
  - **Vì sao:** Mỗi lượt đi ra sinh một dòng trong bảng; thư về khớp dòng nào thì đưa lên máy đó.
- **Đề:** Cổng nào tuyệt đối không nên mở ra Internet bằng port forwarding?
  - **Dạng:** trắc nghiệm · **3389** ✓ / 443 / 123
  - **Vì sao:** 3389 là RDP — mở ra là mời cả thế giới thử mật khẩu để ngồi thẳng vào màn hình máy bạn.
- **Đề:** Tường lửa có nhớ các kết nối đang mở được gọi bằng tính từ tiếng Anh nào?
  - **Dạng:** gõ tay · **Chấp nhận:** stateful
  - **Vì sao:** Stateful — nó giữ bảng các cuộc trò chuyện đang mở và chỉ cho thư trả lời của đúng những cuộc đó đi vào.
- **Đề:** Xếp các chặng của mạng nhà từ ngoài đường vào tới máy bạn.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Đường của nhà mạng
    2. Modem
    3. Router
    4. Switch và điểm phát Wi-Fi
    5. Máy tính, điện thoại
  - **Vì sao:** Modem chạm đường, router chia đường và làm NAT, switch/Wi-Fi nối tới từng thiết bị.
- **Đề:** Máy bạn có địa chỉ 192.168.1.20 nhưng không vào được Internet. Nghi chặng nào trước?
  - **Dạng:** trắc nghiệm · **Chặng phía trên: đường ra của router, modem hoặc nhà mạng** ✓ / Switch trong nhà / Card mạng của máy
  - **Vì sao:** Có được địa chỉ 192.168.x.x nghĩa là phần trong nhà vẫn chạy; vấn đề nằm ở chặng ra ngoài.
- **Đề:** Cắm router thứ hai vào cổng WAN của hộp nhà mạng sinh ra tình trạng gì? (tiếng Anh cũng được)
  - **Dạng:** gõ tay · **Chấp nhận:** double nat | nat kép | nat kep | hai lớp nat | hai lop nat
  - **Vì sao:** Double NAT: hai lớp đổi địa chỉ, hai cuốn sổ — port forwarding khai một chỗ là chưa đủ.
- **Đề:** Cách gỡ double NAT khi vẫn muốn dùng router thứ hai cho rộng sóng?
  - **Dạng:** trắc nghiệm · **Cho nó làm điểm phát sóng: tắt NAT và phát địa chỉ, cắm dây vào cổng LAN** ✓ / Khai port forwarding trên cả hai / Đặt hai router cùng một dải địa chỉ
  - **Vì sao:** Tắt vai làm cổng của router thứ hai thì cả nhà quay về một lớp NAT và một cuốn sổ duy nhất.

## Wi-Fi và IPv6 chuyên sâu `module-8`

Phần C · 5 chặng · 5 bài · 10 khái niệm

**Chặng:** Sóng thay dây (m8-bai-1) → Đọc tên thế hệ (m8-bai-2) → Khóa cửa cho sóng (m8-bai-3) → Biển số đời mới (m8-bai-4) → Máy tự lo liệu (m8-bai-5)

### Bài: Chọn đúng băng tần cho từng góc nhà `m8-bai-1`

**1 · Khởi động (hook):** Đứng cạnh router thì mạng vùn vụt, vào phòng ngủ cách hai bức tường thì lết từng chút. Cùng một cái hộp phát ra — sao sóng lúc khỏe lúc yếu vậy?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: so với băng 5 GHz, sóng Wi-Fi 2.4 GHz thì sao?
  - **Dạng:** trắc nghiệm · **Đi xa và xuyên tường tốt hơn, nhưng chậm hơn** ✓ / Nhanh hơn nhưng yếu hơn / Giống hệt nhau, chỉ khác tên
  - **Vì sao:** Tần số thấp như giọng trầm: vang xa, luồn qua tường tốt, nhưng chở được ít dữ liệu hơn. Tần số cao như giọng thanh: chở nhiều mà đuối sức nhanh.

**3 · Khám phá (teach):**
- *[m8-song-wifi]* Wi-Fi là sóng radio thay cho sợi dây mạng: điểm phát Wi-Fi (thường nằm ngay trong hộp router nhà bạn — Module 7) nói chuyện với các thiết bị qua không khí. Nhưng không khí là MỘT sợi dây chung: mọi thiết bị quanh đó thay phiên nhau nói, càng đông càng phải chờ.
  - **Đào sâu hơn:** Vì là sóng phát ra mọi hướng, Wi-Fi không dừng ở cửa nhà bạn — nó bay sang hàng xóm và ra tận vỉa hè. Hai hệ quả sẽ quay lại trong module này: ai đứng gần cũng NGHE được (nên phải khóa — bài 3), và các nhà cạnh nhau dùng chung kênh sẽ giẫm sóng nhau.
- *[m8-bang-tan]* Wi-Fi chạy trên ba dải sóng — gọi là băng tần. 2.4 GHz như giọng trầm: vang xa, xuyên tường tốt, nhưng chậm và đông đúc nhất. 5 GHz như giọng thanh: nhanh hơn hẳn nhưng đuối khi qua tường. 6 GHz (mới nhất) còn nhanh và vắng hơn nữa — đổi lại tầm với ngắn nhất.
  - **Đào sâu hơn:** Băng 2.4 GHz đông vì đủ thứ cùng chen vào đó: Bluetooth, lò vi sóng, chuột không dây… Router hai băng thường phát cả hai dưới một tên mạng; máy tự chọn băng — và đôi khi chọn dở, cứ bám 2.4 GHz dù đang đứng cạnh router.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Ví dụ giải sẵn: nhà hai tầng, router đặt phòng khách. (1) TV cạnh router cần xem phim nét — cho nó băng 5 GHz: nhanh, mà ngồi gần thì không sợ đuối. (2) Camera ngoài cổng cách hai bức tường — cho nó 2.4 GHz: chậm cũng được, quan trọng là sóng TỚI nơi. Quy tắc rút ra: gần ưu tiên nhanh, xa ưu tiên tới. Cầm quy tắc đó làm hai câu dưới nhé.
- **Đề:** Camera lắp ngoài vườn, cách router hai bức tường. Cho nó vào băng tần nào?
  - **Dạng:** trắc nghiệm · **2.4 GHz — chậm nhưng đi xa, xuyên tường tốt** ✓ / 5 GHz — nhanh nhất có thể / 6 GHz — mới nhất chắc là tốt nhất
  - **Chủ đề gợi ý (tầng 1):** đánh đổi giữa đi xa và chạy nhanh
  - **Gợi ý (tầng 2):** Camera cần sóng TỚI nơi trước đã — tốc độ chỉ là chuyện tính sau.
  - **Lời giải (tầng 3):** 2.4 GHz: tần số thấp vang xa, xuyên tường tốt nhất — đúng việc cho thiết bị ở xa router.
- **Đề:** Ngồi làm việc ngay cạnh router và cần tốc độ cao nhất — bạn ưu tiên băng có tần số thế nào? (cao hay thấp)
  - **Dạng:** gõ tay · **Chấp nhận:** cao | tần số cao | tan so cao | 5 | 6
  - **Chủ đề gợi ý (tầng 1):** đứng gần thì nhược điểm nào biến mất
  - **Gợi ý (tầng 2):** Đứng gần thì nhược điểm của băng tần cao biến mất, chỉ còn lại ưu điểm.
  - **Lời giải (tầng 3):** Tần số cao (5 hoặc 6 GHz): chở được nhiều dữ liệu; ngồi gần nên không sợ sóng đuối sức.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: băng tần nào đi xa, xuyên tường tốt nhất? (con số)
  - **Dạng:** gõ tay · **Chấp nhận:** 2.4 | 2,4 | 2.4ghz
  - **Chủ đề gợi ý (tầng 1):** giọng trầm hay giọng cao vang xa hơn
  - **Gợi ý (tầng 2):** Giọng trầm vang xa — tức là băng tần THẤP nhất trong ba băng.
  - **Lời giải (tầng 3):** 2.4 GHz — tần số thấp nhất nên đi xa, xuyên tường tốt nhất; đổi lại chậm và đông đúc nhất.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao không có băng tần nào là "tốt nhất" cho mọi thiết bị trong nhà?
  - **Nhóm ý cần chạm:** [xa, xuyên tường, xuyen tuong, tới nơi, toi noi, phủ sóng] · [nhanh, tốc độ, toc do, chậm, cham]
  - **Trả lời mẫu:** Vì mỗi băng đánh đổi một kiểu: 2.4 GHz đi xa xuyên tường nhưng chậm, 5 và 6 GHz nhanh nhưng đuối khi qua tường — nên thiết bị ở xa cần 2.4, thiết bị ngồi gần cần 5 hoặc 6.

**6 · Tổng kết:**
- Wi-Fi là sóng radio thay dây; không khí là một sợi dây chung, càng đông càng chờ.
- 2.4 GHz xa mà chậm; 5 GHz nhanh mà gần; 6 GHz nhanh nhất, vắng nhất, ngắn nhất.
- Gần ưu tiên nhanh, xa ưu tiên tới — không băng nào tốt nhất cho mọi góc nhà.
- *Úp mở bài sau:* Trên vỏ hộp còn một con số nữa: Wi-Fi 5, Wi-Fi 6, Wi-Fi 7. Số đó không phải băng tần — vậy nó là gì?

### Bài: Đọc vanh vách tên thế hệ Wi-Fi `m8-bai-2`

**1 · Khởi động (hook):** Hộp router ghi Wi-Fi 6, điện thoại mới khoe Wi-Fi 7, còn tài liệu cũ lại viết 802.11ac. Ba cách gọi rối rắm đó đang nói về cùng một chuyện gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: router Wi-Fi 6 gặp điện thoại Wi-Fi 7 thì hai bên nói chuyện bằng gì?
  - **Dạng:** trắc nghiệm · **Bằng Wi-Fi 6 — bên mới tự hạ xuống nói giọng cũ** ✓ / Bằng Wi-Fi 7 — máy mới kéo router lên theo / Không kết nối được vì lệch chuẩn
  - **Vì sao:** Các thế hệ Wi-Fi tương thích ngược: bên mới biết nói giọng cũ, nên cặp nào cũng chốt ở thế hệ THẤP hơn của hai bên.

**3 · Khám phá (teach):**
- *[m8-chuan-wifi]* Wi-Fi 4, 5, 6, 7 là các THẾ HỆ của chuẩn Wi-Fi — tên kỹ thuật lần lượt là 802.11n, ac, ax, be, nhưng người ta đánh số cho dễ nhớ. Số càng cao càng mới: nhanh hơn, chen chúc giỏi hơn. Hai thiết bị khác thế hệ vẫn nói chuyện được — chúng dùng thế hệ thấp hơn của hai bên.
  - **Đào sâu hơn:** Cách gọi bằng số ra đời năm 2018, vì 802.11ac/ax quá khó nhớ với người mua hàng. Từ Wi-Fi 6 trở đi, con số còn được in thẳng lên logo thiết bị — liếc vỏ hộp là biết đời.
- *[m8-wifi-6e-7]* Wi-Fi 6 nổi bật không phải vì nhanh hơn, mà vì chở ĐÔNG giỏi hơn: một lượt phát chia được cho nhiều thiết bị — như xe buýt nhiều ghế thay vì mỗi chuyến chở một khách. Wi-Fi 6E là đúng Wi-Fi 6 nhưng thêm quyền chạy trên băng 6 GHz — làn đường mới toanh còn vắng. Wi-Fi 7 mở kênh rộng gấp đôi và biết đi HAI băng cùng lúc.
  - **Đào sâu hơn:** Đi hai băng cùng lúc (Wi-Fi 7 gọi là MLO) nghĩa là điện thoại vừa dùng 5 GHz vừa dùng 6 GHz như hai làn song song — làn này nghẽn thì dữ liệu dồn sang làn kia, độ trễ ổn định hẳn khi chơi game hay gọi video.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Điểm mạnh đáng tiền nhất của Wi-Fi 6 so với Wi-Fi 5 là gì?
  - **Dạng:** trắc nghiệm · **Chở nhiều thiết bị cùng lúc giỏi hơn hẳn — nhà càng đông thiết bị càng thấy khác** ✓ / Sóng đi xa gấp đôi / Không cần mật khẩu nữa
  - **Chủ đề gợi ý (tầng 1):** chuyến xe buýt nhiều ghế
  - **Gợi ý (tầng 2):** Nghĩ về chuyến xe chia được nhiều ghế cho nhiều khách trong một lượt chạy.
  - **Lời giải (tầng 3):** Wi-Fi 6 chia một lượt phát cho nhiều thiết bị cùng lúc — nhà đông thiết bị hưởng lợi rõ nhất.
- **Đề:** Wi-Fi 6E khác Wi-Fi 6 ở quyền chạy thêm trên băng tần nào? (con số)
  - **Dạng:** gõ tay · **Chấp nhận:** 6 | 6ghz | băng 6 | bang 6
  - **Chủ đề gợi ý (tầng 1):** chữ E mở thêm một làn đường
  - **Gợi ý (tầng 2):** Chính là băng tần mới toanh, vắng nhất trong bài trước.
  - **Lời giải (tầng 3):** Băng 6 GHz — Wi-Fi 6E = Wi-Fi 6 cộng quyền vào làn 6 GHz còn vắng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: router Wi-Fi 6 gặp máy Wi-Fi 7 — hai bên nói chuyện bằng thế hệ nào?
  - **Dạng:** gõ tay · **Chấp nhận:** thấp hơn | thap hon | wi-fi 6 | wifi 6 | đời thấp | doi thap | cũ hơn | cu hon
  - **Chủ đề gợi ý (tầng 1):** bên nào phải chiều bên nào
  - **Gợi ý (tầng 2):** Bên mới biết nói giọng cũ — cặp nào cũng chốt ở đời thấp hơn của hai bên.
  - **Lời giải (tầng 3):** Bằng Wi-Fi 6 — thế hệ thấp hơn của hai bên; chuẩn mới luôn tương thích ngược.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao mua router Wi-Fi 7 xịn về mà mạng nhà chưa chắc đã nhanh lên?
  - **Nhóm ý cần chạm:** [thiết bị, thiet bi, máy cũ, may cu, hai bên, hai ben, thấp hơn, thap hon] · [nhà mạng, nha mang, đường truyền, duong truyen, gói cước, goi cuoc, internet]
  - **Trả lời mẫu:** Vì tốc độ chốt ở thế hệ THẤP hơn của từng cặp — điện thoại cũ vẫn nói giọng cũ với router mới; và đường ra Internet còn bị chặn bởi gói cước nhà mạng, router nhanh mấy cũng không vượt được cái ống đó.

**6 · Tổng kết:**
- Wi-Fi 4/5/6/7 là thế hệ; số càng cao càng mới, và luôn tương thích ngược.
- Wi-Fi 6 chở đông giỏi; 6E thêm làn 6 GHz; Wi-Fi 7 kênh rộng và đi hai băng cùng lúc.
- Tốc độ thật chốt ở thế hệ thấp hơn của từng cặp thiết bị — và ở gói cước nhà mạng.
- *Úp mở bài sau:* Sóng nhà bạn bay ra tận vỉa hè, ai đứng đó cũng "nghe" được từng gói tin. Vậy cái gì ngăn họ đọc trộm?

### Bài: Khóa cửa cho sóng nhà bạn `m8-bai-3`

**1 · Khởi động (hook):** Sóng Wi-Fi không dừng ở tường nhà — nó tràn ra vỉa hè. Một người ngồi ngoài đó với chiếc laptop thu được mọi gói tin đang bay trong không khí. Điều gì ngăn họ đọc trộm?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: WPA2, WPA3 trong trang cài đặt router là gì?
  - **Dạng:** trắc nghiệm · **Chuẩn MÃ HÓA sóng Wi-Fi — khóa nội dung trước khi phát vào không khí** ✓ / Chuẩn tốc độ, giống Wi-Fi 5, Wi-Fi 6 / Tên hai băng tần
  - **Vì sao:** WPA là bộ khóa của sóng: mọi khung tin được mã hóa bằng chìa sinh từ mật khẩu Wi-Fi — người nghe lén chỉ thu được một chuỗi loạn xạ.

**3 · Khám phá (teach):**
- *[m8-wpa2]* Vì ai đứng gần cũng thu được sóng, Wi-Fi phải mã hóa: WPA2 là bộ khóa phổ biến hơn cả — nội dung được khóa bằng chìa sinh từ mật khẩu mạng. Nhưng WPA2 có một điểm yếu đã thành kinh điển: kẻ xấu THU lại khoảnh khắc một thiết bị bắt tay vào mạng, đem tệp đó về nhà, rồi cho máy đoán mật khẩu hàng tỷ lần — không ai hay biết.
  - **Đào sâu hơn:** Kiểu tấn công đó gọi là dò offline: mọi phép thử diễn ra trên máy của kẻ tấn công, router nhà bạn không nhận được gì nên không thể chặn hay báo động. Mật khẩu ngắn và phổ biến kiểu "12345678" rơi trong vài phút.
- *[m8-wpa3]* WPA3 vá đúng chỗ đó bằng kiểu bắt tay mới: mỗi lần muốn thử một mật khẩu, kẻ tấn công buộc phải "gõ cửa" router MỘT lần theo thời gian thật — hết trò mang về nhà dò hàng tỷ lần. Mật khẩu yếu vẫn là mật khẩu yếu, nhưng cái giá của mỗi lần đoán đắt lên hàng triệu lần.
  - **Đào sâu hơn:** Kiểu bắt tay mới tên là SAE. WPA3 còn kèm Enhanced Open cho mạng KHÔNG mật khẩu (quán cà phê): vẫn mã hóa riêng từng người dù chẳng cần đăng nhập. Và nhớ tòa nhà 15 phòng: trên mạng lạ, HTTPS ở phòng 443 vẫn là lớp khóa của riêng bạn — khóa của mạng và khóa của trang web là hai lớp độc lập.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Điểm yếu kinh điển của WPA2 nằm ở đâu?
  - **Dạng:** trắc nghiệm · **Thu được cú bắt tay là đem về dò mật khẩu offline, không ai hay biết** ✓ / Nó không mã hóa gì cả / Nó chỉ chạy được trên băng 2.4 GHz
  - **Chủ đề gợi ý (tầng 1):** thứ kẻ xấu chỉ cần thu đúng một lần
  - **Gợi ý (tầng 2):** Kẻ tấn công không đoán trên router — hắn đoán ở nhà hắn, trên thứ đã thu được.
  - **Lời giải (tầng 3):** Thu lại cú bắt tay lúc thiết bị vào mạng rồi dò mật khẩu offline — router không hề biết nên không thể chặn.
- **Đề:** Vào trang cài đặt router, chuẩn bảo mật mới nhất bạn nên chọn là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** wpa3 | wpa 3
  - **Chủ đề gợi ý (tầng 1):** đời kế tiếp của WPA2
  - **Gợi ý (tầng 2):** Tăng con số sau chữ WPA lên một.
  - **Lời giải (tầng 3):** WPA3 — bắt tay kiểu mới chặn được kiểu dò offline; router và thiết bị đời mới đều hỗ trợ.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: trên mạng Wi-Fi mở của quán cà phê, lớp khóa nào vẫn che nội dung bạn gửi cho từng trang web? (gợi ý: phòng 443)
  - **Dạng:** gõ tay · **Chấp nhận:** https | tls | ssl
  - **Chủ đề gợi ý (tầng 1):** ổ khóa vàng của tòa nhà 15 phòng
  - **Gợi ý (tầng 2):** Chính là dịch vụ ở phòng 443 trong cung điện ký ức.
  - **Lời giải (tầng 3):** HTTPS (TLS) — mã hóa giữa máy bạn và từng trang web, độc lập với chuyện mạng Wi-Fi có khóa hay không.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao WPA3 làm kẻ dò mật khẩu khốn khổ hơn hẳn so với WPA2?
  - **Nhóm ý cần chạm:** [gõ cửa, go cua, hỏi router, hoi router, trực tiếp, truc tiep, từng lần, tung lan, thời gian thật, thoi gian that] · [offline, mang về, mang ve, hàng tỷ, hang ty, tỷ lần, ty lan]
  - **Trả lời mẫu:** Với WPA2, hắn thu một cú bắt tay rồi về nhà thử hàng tỷ mật khẩu offline. Với WPA3, mỗi lần đoán buộc phải gõ cửa router một lần theo thời gian thật — vừa chậm, vừa lộ mặt, và chặn được.

**6 · Tổng kết:**
- Sóng bay ra tận vỉa hè nên nội dung phải được mã hóa — đó là việc của WPA.
- WPA2 dính đòn dò offline: thu cú bắt tay một lần, về nhà đoán hàng tỷ lần.
- WPA3 bắt mỗi lần đoán phải gõ cửa router — cứ chọn WPA3 khi router cho phép.
- *Úp mở bài sau:* Xong phần sóng. Giờ tới phần địa chỉ: ngay lúc này trên máy bạn có sẵn một địa chỉ lạ bắt đầu bằng fe80 mà bạn chưa từng đặt — của ai vậy?

### Bài: Đọc biển số đời mới không vấp `m8-bai-4`

**1 · Khởi động (hook):** Gõ lệnh xem địa chỉ trên máy, bạn sẽ thấy một dòng bắt đầu bằng fe80:: mà bạn chưa từng đặt, và cũng chẳng ai phát cho máy cả. Nó ở đâu ra, và để làm gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: IPv6 cho mỗi thiết bị một địa chỉ công cộng thật. Vậy còn cần NAT như bên IPv4 không?
  - **Dạng:** trắc nghiệm · **Không cần — NAT sinh ra vì IPv4 thiếu địa chỉ, mà IPv6 thì thừa** ✓ / Vẫn cần, vì NAT là lớp bảo mật / Cần, vì IPv6 rồi cũng sắp cạn
  - **Vì sao:** NAT (Module 7) là giải pháp tình thế cho việc IPv4 cạn địa chỉ. IPv6 đủ địa chỉ cho mỗi hạt cát — ai cũng có biển số công cộng thật. Còn việc chặn người lạ xưa nay vẫn là của TƯỜNG LỬA; đừng nhầm hai vai.

**3 · Khám phá (teach):**
- *[m8-link-local]* Địa chỉ fe80:: là link-local: máy TỰ sinh ngay khi bật card mạng, không cần xin ai. Nó như biệt danh gọi nhau TRONG MỘT PHÒNG — chỉ có nghĩa giữa các máy chung một đường truyền, không bao giờ được đi qua router. IPv6 dùng nó cho việc nội bộ: tìm hàng xóm, nói chuyện với router.
  - **Đào sâu hơn:** Vì luôn tồn tại kể cả khi chưa mạng nào cấp phát gì, link-local là "đường dây nóng" của IPv6: mọi trao đổi hạ tầng — nghe router rao, hỏi địa chỉ MAC của hàng xóm (vai của ARP ngày xưa) — đều chạy trên nó. Hai máy nối thẳng một sợi dây cũng nói chuyện được với nhau bằng fe80.
- *[m8-global-unicast]* Địa chỉ công cộng của IPv6 (global unicast, thường mở đầu bằng số 2 hoặc 3) chia đôi đúng ở /64: nửa đầu là TÊN KHU PHỐ do router rao — phần dẫn đường trên Internet; nửa sau là SỐ NHÀ do chính máy chọn. Mỗi thiết bị một biển số công cộng thật — hết thời cả nhà mượn chung một số như bên NAT.
  - **Đào sâu hơn:** Nửa sau ngày nay thường là số ngẫu nhiên và đổi định kỳ — để không ai lần theo một chiếc máy qua các mạng khác nhau bằng chính địa chỉ của nó. Còn về độ lớn: không gian /64 của MỘT khu phố đã gấp hơn 4 tỷ lần toàn bộ Internet IPv4.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Địa chỉ nào sau đây là link-local IPv6 — chỉ có nghĩa trong một phòng?
  - **Dạng:** trắc nghiệm · **fe80::1** ✓ / 192.168.1.10 / 2001:db8::5
  - **Chủ đề gợi ý (tầng 1):** cụm mở đầu của biệt danh trong phòng
  - **Gợi ý (tầng 2):** Biệt danh trong phòng luôn mở đầu bằng fe80.
  - **Lời giải (tầng 3):** fe80::1 là link-local. Còn 192.168.1.10 là IPv4 riêng (Module 3), và 2001:db8::5 là IPv6 công cộng.
- **Đề:** Đổi hệ quy chiếu: máy 192.168.1.10 (IPv4 riêng) mở một trang web. Ai phải ra tay thì gói tin của nó mới ra được Internet?
  - **Dạng:** trắc nghiệm · **Router làm NAT — đổi địa chỉ riêng thành địa chỉ công cộng** ✓ / Không ai cả — nó tự đi thẳng như IPv6 / DNS đổi địa chỉ giúp nó
  - **Chủ đề gợi ý (tầng 1):** chuyện Module 7 — cả nhà một số nhà
  - **Gợi ý (tầng 2):** 192.168.x.x không bao giờ xuất hiện ngoài Internet — phải có ai đó đổi nó trước.
  - **Lời giải (tầng 3):** Router làm NAT (Module 7). Đây chính là điểm khác cốt lõi giữa hai hệ: IPv4 riêng phải được đổi địa chỉ, IPv6 công cộng thì đi thẳng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: địa chỉ IPv6 bắt đầu bằng fe80 là loại gì, dùng trong phạm vi nào?
  - **Dạng:** gõ tay · **Chấp nhận:** link-local | link local | trong phòng | trong phong | nội bộ | noi bo | một đường truyền | mot duong truyen | cục bộ | cuc bo
  - **Chủ đề gợi ý (tầng 1):** biệt danh chỉ gọi được trong phòng
  - **Gợi ý (tầng 2):** Tên tiếng Anh ghép "link" với "local" — phạm vi là một đường truyền.
  - **Lời giải (tầng 3):** Link-local — máy tự sinh, chỉ có nghĩa giữa các máy chung một đường truyền, không bao giờ qua router.
- **Đề:** Vẫn từ trí nhớ, nhưng đổi sang hệ cũ: cơ chế nào cho phép cả nhà IPv4 dùng chung một địa chỉ công cộng? (viết tắt)
  - **Dạng:** gõ tay · **Chấp nhận:** nat | pat | nat/pat
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ ở cổng WAN
  - **Gợi ý (tầng 2):** Ba chữ cái, học ở Module 7 — chữ giữa là "address".
  - **Lời giải (tầng 3):** NAT (kèm PAT) — đổi địa chỉ riêng thành địa chỉ chung và tra sổ khi thư về. IPv6 không cần tới nó.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao IPv4 phải đẻ ra NAT, còn IPv6 thì không cần?
  - **Nhóm ý cần chạm:** [thiếu, thieu, cạn, can kiet, mượn chung, muon chung, 4,3 tỷ, it dia chi] · [đủ, du dia chi, thừa, thua, công cộng thật, cong cong that, mỗi thiết bị, moi thiet bi]
  - **Trả lời mẫu:** IPv4 chỉ có khoảng 4,3 tỷ địa chỉ nên cả nhà phải mượn chung một địa chỉ công cộng qua NAT. IPv6 nhiều địa chỉ đến mức mỗi thiết bị mang một biển số công cộng thật — không phải đổi chác gì nữa, chỉ còn cần tường lửa đứng gác.

**6 · Tổng kết:**
- fe80:: là link-local — máy tự sinh, chỉ có nghĩa trong một đường truyền.
- Địa chỉ công cộng IPv6 chia đôi ở /64: khu phố do router rao + số nhà do máy tự chọn.
- IPv6 không cần NAT — đủ biển số cho tất cả; việc gác cửa là của tường lửa.
- *Úp mở bài sau:* Nửa đầu "router rao", nửa sau "máy tự chọn" — vậy chúng ghép lại thành địa chỉ hoàn chỉnh bằng cách nào mà chẳng cần cuộc hỏi cưới 4 nhịp nào? Bài sau xem máy tự lo liệu.

### Bài: Xem máy tự lo liệu địa chỉ `m8-bai-5`

**1 · Khởi động (hook):** Ở IPv4, máy phải qua đủ bốn nhịp hỏi cưới Discover–Offer–Request–Ack mới có địa chỉ. Máy IPv6 vừa bật lên đã tự có, chẳng xin ai. Nó lấy địa chỉ ở đâu ra?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: máy IPv6 có địa chỉ công cộng bằng cách nào?
  - **Dạng:** trắc nghiệm · **Nghe router rao tên khu phố rồi TỰ ghép số nhà của mình vào** ✓ / Vẫn phải hỏi cưới bốn nhịp như DHCP / Người dùng phải gõ tay từng địa chỉ
  - **Vì sao:** Cơ chế đó tên là SLAAC: router rao đều đặn "khu phố này tên …/64"; máy nghe được thì tự ghép nửa sau — có địa chỉ mà không ai phải giữ sổ.

**3 · Khám phá (teach):**
- *[m8-slaac]* SLAAC — máy tự cấu hình địa chỉ. Router rao đều đặn như loa phường: "ai ở đây thì mang tên phố 2001:db8:1:1::/64". Máy mới tới nghe được, lấy tên phố làm nửa đầu, tự chọn số nhà làm nửa sau — thế là có địa chỉ công cộng. Không nhịp hỏi, không ai giữ sổ, không ai phải gật đầu.
  - **Đào sâu hơn:** Khác biệt với DHCP nằm ở cuốn SỔ: DHCP có máy chủ nhớ ai thuê địa chỉ nào, hạn bao lâu (Module 6) — quản được, nhưng phải nuôi người giữ sổ. SLAAC không ai ghi chép; máy chỉ hỏi vọng một câu "có ai trùng số này không?" trước khi dùng cho chắc. Mạng công ty cần sổ sách vẫn dùng DHCPv6; mạng nhà thì SLAAC là mặc định.
- *[m8-dual-stack]* Dual-stack: một card mạng mang SONG SONG hai địa chỉ — một IPv4, một IPv6 — như chiếc xe đeo hai biển số. Với mỗi đích đến, máy chọn đường đi được: đích có IPv6 thì thường ưu tiên IPv6, chưa có thì quay về IPv4. Nhờ đó cả Internet đổi hệ TỪ TỪ suốt hai chục năm mà chưa từng phải tắt đi bật lại.
  - **Đào sâu hơn:** "Ưu tiên nhưng không cố chấp": trình duyệt hiện đại cho hai đường chạy đua vài chục mili-giây rồi lấy đường về đích trước (kỹ thuật tên là Happy Eyeballs) — người dùng không bao giờ phải biết mình đang đi hệ nào. Chính chiếc máy bạn đang cầm gần như chắc chắn đang chạy dual-stack.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Cơ chế để máy IPv6 TỰ ghép địa chỉ từ lời rao của router tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** slaac
  - **Chủ đề gợi ý (tầng 1):** năm chữ cái, mở đầu bằng chữ S của "stateless"
  - **Gợi ý (tầng 2):** Viết tắt của Stateless Address Autoconfiguration — năm chữ cái.
  - **Lời giải (tầng 3):** SLAAC — Stateless (không ai giữ sổ) Address Autoconfiguration (máy tự cấu hình địa chỉ).
- **Đề:** Đổi hệ: một máy IPv4 xin địa chỉ qua DHCP. Khác biệt CỐT LÕI so với SLAAC là gì?
  - **Dạng:** trắc nghiệm · **DHCP có máy chủ giữ sổ — nhớ ai thuê địa chỉ nào, hạn bao lâu; SLAAC không ai ghi chép** ✓ / DHCP chạy nhanh hơn SLAAC / DHCP không cần router trong mạng
  - **Chủ đề gợi ý (tầng 1):** bên nào có người giữ sổ
  - **Gợi ý (tầng 2):** Nhớ tờ giấy thuê có thời hạn ở Module 6 — ai đang giữ tờ đó?
  - **Lời giải (tầng 3):** DHCP là cơ chế CÓ SỔ SÁCH: máy chủ nhớ từng hợp đồng thuê. SLAAC vô sổ — máy tự ghép, mạng nhẹ việc nhưng không ai quản danh sách.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: xếp đúng thứ tự các bước một máy IPv6 vừa bật lên cho tới khi có địa chỉ công cộng.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Bật card mạng — tự sinh địa chỉ fe80 dùng trong phòng
    2. Nghe router rao tên khu phố /64
    3. Tự chọn số nhà, ghép vào tên khu phố
    4. Hỏi vọng "có ai trùng số này không?" rồi bắt đầu dùng
  - **Chủ đề gợi ý (tầng 1):** từ trong phòng ra tới ngoài phố
  - **Gợi ý (tầng 2):** Bắt đầu từ thứ máy TỰ có sẵn (bài trước), rồi mới tới thứ phải nghe từ router.
  - **Lời giải (tầng 3):** fe80 trước (tự có), rồi nghe rao, ghép địa chỉ, kiểm trùng rồi dùng — không nhịp nào phải xin phép ai.
- **Đề:** Vẫn từ trí nhớ, đổi sang hệ cũ: cơ chế cấp địa chỉ BỐN NHỊP có người giữ sổ của IPv4 tên là gì? (viết tắt)
  - **Dạng:** gõ tay · **Chấp nhận:** dhcp | dora
  - **Chủ đề gợi ý (tầng 1):** cuộc hỏi cưới ở Module 6
  - **Gợi ý (tầng 2):** Bốn nhịp Discover–Offer–Request–Ack là của giao thức nào?
  - **Lời giải (tầng 3):** DHCP — cấp phát có sổ sách qua bốn nhịp DORA; đối trọng của SLAAC bên IPv6.
- **Tự giải thích:** Giải thích bằng lời của bạn: nhờ đâu Internet chuyển từ IPv4 sang IPv6 suốt hai chục năm mà chưa từng phải "tắt đi bật lại"?
  - **Nhóm ý cần chạm:** [song song, hai địa chỉ, hai dia chi, cả hai, ca hai, cùng lúc, cung luc, dual] · [từ từ, tu tu, dần, dan dan, quay về, quay ve, ipv4]
  - **Trả lời mẫu:** Nhờ dual-stack: mỗi máy mang song song cả hai địa chỉ, đích nào có IPv6 thì đi IPv6, chưa có thì quay về IPv4 — từng mạng cứ thế nâng cấp dần mà không ai bị đứt.

**6 · Tổng kết:**
- SLAAC: router rao tên khu phố, máy tự ghép số nhà — có địa chỉ mà không ai giữ sổ.
- DHCP là đối trọng có sổ sách: máy chủ nhớ từng hợp đồng thuê (DORA, Module 6).
- Dual-stack đeo hai biển số song song — bí quyết giúp Internet đổi hệ không sập.
- *Úp mở bài sau:* Hết chuyện sóng và biển số. Module sau bước hẳn vào văn phòng: một máy chủ Windows cai quản mọi máy con trong công ty — và một tòa nhà ký ức bốn tầng chờ bạn leo.

### Khái niệm & flashcard (10)

- **Wi-Fi** `m8-song-wifi` — Sóng radio thay cho sợi dây mạng; không khí là một sợi dây chung
  - Ẩn dụ: Cả phòng nói chuyện qua cùng một khoảng không khí — thay phiên nhau nói, càng đông càng chờ.
  - Thẻ ôn: *Wi-Fi thay sợi dây mạng bằng gì, và cái giá phải trả là gì?* → Bằng sóng radio qua không khí — nhưng không khí là MỘT dây chung: mọi thiết bị thay phiên nhau nói, và ai đứng gần cũng thu được sóng.
- **Băng tần** `m8-bang-tan` — Dải sóng Wi-Fi chạy trên đó: 2.4 / 5 / 6 GHz
  - Ẩn dụ: Giọng trầm vang xa qua tường; giọng cao rõ chữ nhưng phải đứng gần.
  - Thẻ ôn: *Ba băng tần Wi-Fi đánh đổi với nhau thế nào?* → 2.4 GHz xa, xuyên tường tốt nhưng chậm và đông; 5 GHz nhanh mà gần; 6 GHz nhanh nhất, vắng nhất, tầm ngắn nhất. Gần ưu tiên nhanh, xa ưu tiên tới.
- **Thế hệ Wi-Fi** `m8-chuan-wifi` — Wi-Fi 4/5/6/7 — các đời của chuẩn 802.11, đánh số cho dễ nhớ
  - Ẩn dụ: Đời xe: xe mới vẫn chạy chung đường với xe cũ, nhưng cặp nào đi chung thì theo tốc độ xe cũ.
  - Thẻ ôn: *Hai thiết bị khác thế hệ Wi-Fi nói chuyện với nhau bằng đời nào?* → Bằng thế hệ THẤP hơn của hai bên — chuẩn mới luôn tương thích ngược (Wi-Fi 4/5/6/7 = 802.11n/ac/ax/be).
- **Wi-Fi 6E và Wi-Fi 7** `m8-wifi-6e-7` — 6E = Wi-Fi 6 thêm băng 6 GHz; Wi-Fi 7 kênh rộng gấp đôi, đi hai băng cùng lúc
  - Ẩn dụ: 6E là tấm vé vào làn cao tốc mới còn vắng; Wi-Fi 7 cho xe chạy hai làn một lúc.
  - Thẻ ôn: *Wi-Fi 6E khác Wi-Fi 6 chỗ nào? Wi-Fi 7 thêm gì?* → 6E = đúng Wi-Fi 6 cộng quyền chạy băng 6 GHz còn vắng. Wi-Fi 7 mở kênh rộng gấp đôi và đi hai băng cùng lúc (MLO).
- **WPA2** `m8-wpa2` — Chuẩn mã hóa Wi-Fi phổ biến; yếu trước kiểu dò mật khẩu offline
  - Ẩn dụ: Khóa cửa tốt nhưng để lọt một kẽ: kẻ trộm chụp ảnh ổ khóa rồi về nhà mài chìa cả đêm.
  - Thẻ ôn: *Điểm yếu kinh điển của WPA2 là gì?* → Kẻ xấu thu cú bắt tay lúc thiết bị vào mạng rồi dò mật khẩu OFFLINE hàng tỷ lần — router không hề biết để chặn.
- **WPA3** `m8-wpa3` — Chuẩn mã hóa mới: mỗi lần đoán mật khẩu phải hỏi router một lần
  - Ẩn dụ: Ổ khóa không chụp ảnh được — muốn thử chìa nào phải tra vào cửa ngay trước mặt bảo vệ.
  - Thẻ ôn: *WPA3 chặn kiểu tấn công nào của thời WPA2, bằng cách gì?* → Chặn dò mật khẩu offline: bắt tay kiểu mới (SAE) buộc mỗi lần đoán phải hỏi router theo thời gian thật — chậm, lộ mặt, chặn được.
- **Link-local (fe80::)** `m8-link-local` — Địa chỉ IPv6 máy tự sinh, chỉ có nghĩa trong một đường truyền
  - Ẩn dụ: Biệt danh trong phòng: gọi nhau thoải mái, bước ra khỏi cửa là vô nghĩa.
  - Thẻ ôn: *Địa chỉ fe80:: là gì, ai cấp cho máy?* → Link-local: máy TỰ sinh khi bật card mạng, không xin ai; chỉ dùng giữa các máy chung một đường truyền, không bao giờ qua router.
- **Global unicast** `m8-global-unicast` — Địa chỉ IPv6 công cộng: /64 chia đôi khu phố + số nhà, không cần NAT
  - Ẩn dụ: Biển số công cộng thật cho từng thiết bị — hết thời cả nhà mượn chung một số.
  - Thẻ ôn: *Địa chỉ công cộng IPv6 chia đôi ở đâu, hai nửa do ai quyết?* → Ở /64: nửa đầu là tên khu phố do router rao; nửa sau là số nhà do máy tự chọn. Mỗi thiết bị một địa chỉ công cộng thật — không cần NAT, chỉ cần tường lửa.
- **SLAAC** `m8-slaac` — Máy tự cấu hình địa chỉ IPv6 từ lời rao của router, không ai giữ sổ
  - Ẩn dụ: Nghe loa phường đọc tên phố rồi tự sơn số nhà — chẳng phải nộp đơn cho ai.
  - Thẻ ôn: *SLAAC khác DHCP ở điểm cốt lõi nào?* → SLAAC vô sổ: router chỉ rao prefix, máy tự ghép — không ai nhớ ai dùng gì. DHCP có máy chủ giữ sổ thuê (DORA), quản được nhưng phải nuôi người giữ sổ.
- **Dual-stack** `m8-dual-stack` — Một card mạng mang song song cả địa chỉ IPv4 lẫn IPv6
  - Ẩn dụ: Chiếc xe đeo hai biển số — đường mới đi biển mới, đường cũ vẫn biển cũ.
  - Thẻ ôn: *Dual-stack là gì, và vì sao nó quan trọng với cả Internet?* → Máy mang song song cả IPv4 lẫn IPv6: đích có IPv6 thì ưu tiên, chưa có thì quay về IPv4 — nhờ đó Internet đổi hệ từ từ mà không sập.

### Bài kiểm tra module (9 câu, cần ≥ 85%)

- **Đề:** Camera ở góc vườn, cách router hai bức tường, nên vào băng tần nào?
  - **Dạng:** trắc nghiệm · **2.4 GHz — tần số thấp đi xa, xuyên tường tốt** ✓ / 5 GHz — nhanh hơn là hơn / 6 GHz — mới nhất là tốt nhất
  - **Vì sao:** Xa ưu tiên TỚI: 2.4 GHz vang xa nhất; tốc độ của 5/6 GHz vô nghĩa nếu sóng không tới nơi.
- **Đề:** Wi-Fi 6E khác Wi-Fi 6 ở quyền chạy thêm trên băng tần nào? (con số)
  - **Dạng:** gõ tay · **Chấp nhận:** 6 | 6ghz | băng 6 | bang 6
  - **Vì sao:** 6E = Wi-Fi 6 cộng quyền vào băng 6 GHz — làn đường mới còn vắng.
- **Đề:** Chuẩn bảo mật Wi-Fi mới, chặn được kiểu dò mật khẩu offline, tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** wpa3 | wpa 3
  - **Vì sao:** WPA3: kiểu bắt tay mới buộc mỗi lần đoán mật khẩu phải hỏi router một lần theo thời gian thật.
- **Đề:** Địa chỉ IPv6 bắt đầu bằng fe80 là loại địa chỉ gì?
  - **Dạng:** gõ tay · **Chấp nhận:** link-local | link local | nội bộ | noi bo | trong phòng | trong phong | cục bộ | cuc bo
  - **Vì sao:** Link-local — máy tự sinh, chỉ có nghĩa trong một đường truyền, không bao giờ qua router.
- **Đề:** Máy 192.168.1.10 mở một trang web. Chuyện gì phải xảy ra với địa chỉ nguồn trước khi gói tin ra tới Internet?
  - **Dạng:** trắc nghiệm · **Router đổi nó thành địa chỉ công cộng — NAT** ✓ / Không gì cả, nó đi thẳng / DNS đổi nó thành tên miền
  - **Vì sao:** 192.168.x.x là địa chỉ riêng IPv4 — phải qua NAT ở router (Module 7). Nhận ra "đây là chuyện của hệ nào" chính là kỹ năng module này luyện.
- **Đề:** Cùng cảnh đó nhưng máy dùng 2001:db8::5 (IPv6 công cộng). Địa chỉ nguồn có phải đổi không?
  - **Dạng:** trắc nghiệm · **Không — đó đã là biển số công cộng thật, đi thẳng; tường lửa vẫn đứng gác** ✓ / Có — mọi gói tin đều phải qua NAT / Có — router đổi nó thành fe80
  - **Vì sao:** IPv6 đủ địa chỉ cho tất cả nên không cần NAT; việc chặn người lạ là của tường lửa — đừng nhầm hai vai.
- **Đề:** Cơ chế cấp địa chỉ qua bốn nhịp Discover–Offer–Request–Ack là của giao thức nào? (viết tắt)
  - **Dạng:** gõ tay · **Chấp nhận:** dhcp
  - **Vì sao:** DHCP — cơ chế cấp phát CÓ SỔ của IPv4 (Module 6); bên IPv6 khi cần sổ sách người ta dùng DHCPv6.
- **Đề:** Cơ chế để máy IPv6 tự ghép địa chỉ từ lời rao prefix của router tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** slaac
  - **Vì sao:** SLAAC — stateless: router rao tên khu phố, máy tự chọn số nhà, không ai giữ sổ.
- **Đề:** Máy bạn đang mang đồng thời 192.168.1.10 và 2001:db8::5. Tình trạng này gọi là gì?
  - **Dạng:** trắc nghiệm · **Dual-stack — chạy song song hai hệ, ưu tiên IPv6 khi đích có** ✓ / Double NAT — hai lớp đổi địa chỉ / Link-local — hai biệt danh trong phòng
  - **Vì sao:** Dual-stack: hai biển số song song trên một card mạng. Double NAT (Module 7) là chuyện khác hẳn — hai lớp ĐỔI địa chỉ IPv4 lồng nhau.

## Windows Server — AD DS và GPO `module-9`

Phần C · 5 chặng · 5 bài · 8 khái niệm

**Chặng:** Làng có luật (m9-bai-1) → Xếp cư dân (m9-bai-2) → Treo bộ luật (m9-bai-3) → Leo tòa LSDOU (m9-bai-4) → Phân xử và soi luật (m9-bai-5)

### Cung điện ký ức: Tòa nhà 4 tầng LSDOU `m9-cung-dien-gpo` (4 phòng)

- `m9-r-local` — tầng 1 phòng 1 · Local · chính máy đó · hình `gpo-house-rules` — Tầng trệt Local: tấm bảng nội quy dán ngay cửa nhà — luật của riêng máy đó, chưa ai ngoài nhìn thấy.
- `m9-r-site` — tầng 2 phòng 1 · Site · cả văn phòng một chỗ · hình `gpo-office-floor` — Tầng hai Site: bảng tin của cả tòa văn phòng — máy nào ngồi trong tòa này đều phải đọc.
- `m9-r-domain` — tầng 3 phòng 1 · Domain · toàn công ty · hình `gpo-company-flag` — Tầng ba Domain: lá cờ công ty treo giữa sảnh — luật chung cho mọi máy đã gia nhập miền.
- `m9-r-ou` — tầng 4 phòng 1 · OU · từng phòng ban · hình `gpo-department-door` — Tầng nóc OU: cửa từng phòng ban có luật riêng — áp SAU CÙNG nên thắng hết các tầng dưới.

### Checklist lab VMware: Lab thật: dựng làng AD trên VMware (8 bước, không XP)

Song song với module này, hãy dựng một miền thật trên máy bạn — AD chỉ THẬT khi tự tay bạn thăng máy chủ lên DC. App chỉ theo dõi tiến độ; việc thật diễn ra ngoài app nên không tính XP.

1. Tạo máy ảo Windows Server trên VMware Workstation (2 CPU, 4 GB RAM, 60 GB đĩa) và cài xong hệ điều hành. `m9-vm-1`
2. Đặt IP tĩnh cho máy chủ, đổi tên máy thành DC01, khởi động lại. `m9-vm-2`
3. Thêm role Active Directory Domain Services, thăng máy lên Domain Controller với miền mới (ví dụ lab.local). `m9-vm-3`
4. Tạo OU "KeToan" và một user thử nằm trong OU đó (ví dụ an.nguyen). `m9-vm-4`
5. Tạo máy ảo Windows client, trỏ DNS về địa chỉ của DC01 rồi join miền. `m9-vm-5`
6. Tạo GPO đặt hình nền chung (hoặc cấm USB), treo vào OU KeToan. `m9-vm-6`
7. Trên client, đăng nhập bằng user thử, chạy gpupdate /force và xác nhận luật đã ăn. `m9-vm-7`
8. Chạy gpresult /r, đối chiếu danh sách GPO đang áp với những gì bạn đã treo. `m9-vm-8`

### Bài: Nhận chức trưởng làng máy `m9-bai-1`

**1 · Khởi động (hook):** Công ty có 200 máy. Sáng mai mọi máy phải theo luật mật khẩu mới. Chẳng lẽ ôm bàn phím đi từng bàn? Phải có ai đó là "trưởng làng" của cả 200 máy — bằng cách nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: để một người quản được 200 máy như một, các máy phải làm gì?
  - **Dạng:** trắc nghiệm · **Cùng gia nhập một miền — chịu chung bộ luật từ máy chủ trung tâm** ✓ / Cài chung một phần mềm diệt virus / Nối chung vào một switch
  - **Vì sao:** Đó là domain (miền): các máy ký giao kèo vào chung một làng, và từ đó luật chỉ cần sửa MỘT chỗ trên máy chủ.

**3 · Khám phá (teach):**
- *[m9-domain]* Domain (miền) là "làng có luật" của các máy Windows: máy nào GIA NHẬP miền là ký giao kèo chịu luật chung, và tài khoản đăng nhập từ đó là tài khoản của LÀNG chứ không của riêng máy. Trước khi gia nhập, mỗi máy là một nhà riêng tự quản — muốn gì phải tới từng bàn.
  - **Đào sâu hơn:** Tên miền nội bộ thường dạng lab.local hay corp.congty.vn — nhìn giống tên web nhưng vai khác: nó là TÊN của làng, do DNS nội bộ phân giải. Vì thế dựng AD bao giờ cũng đi kèm máy chủ DNS — đó là lý do bạn phải học DNS (Module 6) trước khi bước vào đây.
- *[m9-dc]* Domain Controller (DC) là máy chủ giữ SỔ CÁI của làng: danh sách người, máy, nhóm, luật. Bạn đăng nhập ở bất kỳ máy nào trong miền, máy đó đều chạy tới hỏi DC: "người này có thật không, mật khẩu đúng không?". Cuốn sổ ấy chính là sổ hộ khẩu bạn đã gặp — phòng 389 (LDAP) của tòa nhà 15 phòng.
  - **Đào sâu hơn:** Làng nghiêm túc không bao giờ chỉ có MỘT DC: sổ cái được nhân bản sang DC thứ hai, lỡ một máy hỏng thì cả làng vẫn đăng nhập được. Sổ tra qua LDAP (389), bản niêm phong qua LDAPS (636) — đúng hai phòng tầng 5 của cung điện Module 5.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Ví dụ giải sẵn — đọc một miền đang chạy: công ty dùng miền lab.local. (1) Máy chủ DC01 giữ sổ cái và trả lời mọi lượt đăng nhập. (2) 200 máy nhân viên đã join miền — góc đăng nhập ghi LAB\ten-nhan-vien thay vì tên máy. (3) Muốn đổi luật mật khẩu: sửa MỘT chỗ trên DC01, cả 200 máy tự nhận. Đọc lại bước (3): sửa một chỗ, áp mọi nơi — đó là toàn bộ lý do miền tồn tại.
- **Đề:** Máy đã gia nhập miền thì tài khoản đăng nhập là của ai?
  - **Dạng:** trắc nghiệm · **Của miền — DC xác thực, ngồi máy nào trong miền cũng đăng nhập được** ✓ / Của riêng máy đó, như máy ở nhà / Của nhà cung cấp Internet
  - **Chủ đề gợi ý (tầng 1):** ai là người đối chiếu mật khẩu
  - **Gợi ý (tầng 2):** Khi bạn gõ mật khẩu, máy trước mặt không tự quyết — nó chạy đi hỏi ai đó.
  - **Lời giải (tầng 3):** Tài khoản của MIỀN: DC đối chiếu mật khẩu, nên một tài khoản dùng được ở mọi máy đã gia nhập miền.
- **Đề:** Máy chủ giữ sổ cái của miền và xác thực mọi lượt đăng nhập gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** domain controller | dc
  - **Chủ đề gợi ý (tầng 1):** trưởng làng giữ sổ
  - **Gợi ý (tầng 2):** Hai chữ cái viết tắt — chữ đầu là Domain.
  - **Lời giải (tầng 3):** Domain Controller (DC) — giữ sổ cái AD và gác cổng mọi lượt đăng nhập của miền.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: sổ cái của miền được tra qua giao thức nào — phòng 389 của tòa nhà 15 phòng?
  - **Dạng:** gõ tay · **Chấp nhận:** ldap
  - **Chủ đề gợi ý (tầng 1):** sổ hộ khẩu ở tầng 5 cung điện
  - **Gợi ý (tầng 2):** Bốn chữ cái, phòng 389 — cuốn sổ ghi ai làm gì, thuộc phòng ban nào.
  - **Lời giải (tầng 3):** LDAP — giao thức tra sổ cái; bản mã hóa là LDAPS ở phòng 636. Cung điện Module 5 giờ thành kiến thức đi làm.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao công ty 200 máy cần miền, còn nhà bạn 5 thiết bị thì không?
  - **Nhóm ý cần chạm:** [một chỗ, mot cho, trung tâm, trung tam, sửa một lần, sua mot lan, tập trung, tap trung] · [từng máy, tung may, từng bàn, tung ban, ít máy, it may, tự quản, tu quan]
  - **Trả lời mẫu:** Với 200 máy, sửa từng bàn là bất khả thi — miền cho phép sửa một chỗ trên DC rồi mọi máy tự theo. Nhà 5 thiết bị thì đi từng máy còn nhanh hơn dựng cả một máy chủ để quản.

**6 · Tổng kết:**
- Domain là làng có luật: máy gia nhập là chịu luật chung, tài khoản là của làng.
- DC giữ sổ cái và xác thực mọi lượt đăng nhập — sổ tra qua LDAP 389.
- Sửa một chỗ, áp mọi nơi — toàn bộ lý do miền tồn tại.
- *Úp mở bài sau:* Có làng rồi thì phải xếp CƯ DÂN: nhân viên mới vào phòng Kế toán cần đúng 37 quyền như đồng nghiệp. Gõ tay 37 lần, hay có cách một lần?

### Bài: Xếp cư dân vào đúng ngăn `m9-bai-2`

**1 · Khởi động (hook):** Nhân viên mới vào phòng Kế toán, cần đúng 37 quyền y như đồng nghiệp cùng phòng. Cấp tay từng quyền thì vừa lâu vừa sót. Người quản trị giỏi chỉ làm MỘT thao tác — thao tác gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: cách cấp quyền khôn ngoan trong miền là cấp cho ai?
  - **Dạng:** trắc nghiệm · **Cho NHÓM — ai được thả vào nhóm là tự có đủ quyền của nhóm** ✓ / Cho từng người một, chắc chắn nhất / Cho từng máy tính
  - **Vì sao:** Quyền cấp cho nhóm một lần duy nhất; người vào nhóm tự có, người rời nhóm tự mất — không sót, không thừa, kiểm toán được.

**3 · Khám phá (teach):**
- *[m9-user-group]* Trong miền, mỗi người một tài khoản (user) — nhưng quyền thì KHÔNG cấp cho từng người. Ta tạo NHÓM (group) "KeToan", cấp 37 quyền cho nhóm đúng một lần; nhân viên mới chỉ cần được thả vào nhóm là mang đủ quyền. Người chuyển phòng? Rút khỏi nhóm — mọi quyền tự rơi theo.
  - **Đào sâu hơn:** Cấp quyền thẳng cho cá nhân là món nợ kỹ thuật: nửa năm sau không ai còn nhớ ai đang giữ gì, kiểm toán chỉ còn cách dò từng dòng. Nguyên tắc nhà nghề: tài khoản → nhóm → quyền, không bao giờ đi tắt.
- *[m9-ou]* OU (Organizational Unit) là NGĂN KÉO của cây thư mục miền: xếp người và máy theo phòng ban — KeToan, NhanSu, VanHanh. Đừng nhầm với group: GROUP để CẤP QUYỀN, còn OU để XẾP CHỖ và TREO LUẬT — bài sau bạn sẽ treo nguyên một bộ luật lên đúng một ngăn kéo.
  - **Đào sâu hơn:** Cặp so sánh chống nhầm: một người NẰM trong đúng MỘT OU (như một hồ sơ nằm một ngăn), nhưng THAM GIA được NHIỀU group (như một người vào nhiều câu lạc bộ). Nhớ được cặp này là hết lẫn hai khái niệm.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Nhân viên mới vào phòng Kế toán. Cách chuẩn để họ có đủ quyền như đồng nghiệp?
  - **Dạng:** trắc nghiệm · **Thả vào group KeToan — quyền đi theo nhóm** ✓ / Cấp lại từng quyền một cho chắc / Cho dùng chung tài khoản của đồng nghiệp
  - **Chủ đề gợi ý (tầng 1):** tấm thẻ câu lạc bộ
  - **Gợi ý (tầng 2):** Một thao tác duy nhất, và quyền không bao giờ sót — vì quyền chưa từng cấp cho cá nhân.
  - **Lời giải (tầng 3):** Thả vào group KeToan. Quyền đã cấp cho nhóm từ trước, thành viên mới tự mang đủ 37 quyền.
- **Đề:** Điền chỗ trống: GROUP để cấp ___, còn OU để xếp chỗ và treo luật.
  - **Dạng:** gõ tay · **Chấp nhận:** quyền | quyen | permission
  - **Chủ đề gợi ý (tầng 1):** thứ đi theo tấm thẻ câu lạc bộ
  - **Gợi ý (tầng 2):** Thứ mà nhân viên mới cần đúng 37 cái.
  - **Lời giải (tầng 3):** QUYỀN — group là đơn vị cấp quyền; OU là đơn vị xếp chỗ và treo luật (GPO).

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: cái ngăn kéo xếp người và máy theo phòng ban trong cây thư mục miền gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** ou | organizational unit | đơn vị tổ chức | don vi to chuc
  - **Chủ đề gợi ý (tầng 1):** ngăn kéo hồ sơ, không phải câu lạc bộ
  - **Gợi ý (tầng 2):** Hai chữ cái — chữ đầu là Organizational.
  - **Lời giải (tầng 3):** OU — Organizational Unit: ngăn kéo phòng ban, mỗi hồ sơ nằm đúng một ngăn, và luật thì dán lên ngăn.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao cấp quyền cho nhóm lại hơn hẳn cấp cho từng người?
  - **Nhóm ý cần chạm:** [một lần, mot lan, vào nhóm, vao nhom, tự có, tu co, theo nhóm, theo nhom] · [rời, roi nhom, rút, rut khoi, thu hồi, thu hoi, chuyển phòng, chuyen phong, kiểm toán, kiem toan]
  - **Trả lời mẫu:** Quyền cấp cho nhóm đúng một lần: ai vào nhóm tự có đủ, ai rời nhóm tự mất sạch — không sót khi vào, không quên thu hồi khi đi, và kiểm toán chỉ cần đọc danh sách nhóm.

**6 · Tổng kết:**
- User là tài khoản của làng; quyền cấp cho GROUP, không cấp cho từng người.
- OU là ngăn kéo phòng ban — để xếp chỗ và treo luật, đừng nhầm với group.
- Một người nằm một OU, nhưng tham gia được nhiều group.
- *Úp mở bài sau:* Ngăn kéo xếp xong rồi. Sáng thứ hai, 200 máy cùng đổi hình nền thành logo công ty — mà không ai chạm vào máy nào. Đêm qua đã xảy ra chuyện gì?

### Bài: Treo bộ luật đầu tiên lên làng `m9-bai-3`

**1 · Khởi động (hook):** Sáng thứ hai, cả 200 máy cùng đổi hình nền thành logo công ty — không ai đi từng bàn, không ai cài gì lên máy nào. Đêm qua, chuyện gì đã xảy ra trên máy chủ?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: GPO là gì?
  - **Dạng:** trắc nghiệm · **Một TẬP LUẬT đặt trên máy chủ, máy trong miền tự tải về áp dụng** ✓ / Một phần mềm phải cài lên từng máy / Một loại bản ghi DNS
  - **Vì sao:** GPO — Group Policy Object: bộ luật viết một lần ở trung tâm; máy trong phạm vi được treo cứ đến hẹn tự tải về áp, không cần ai đụng vào máy.

**3 · Khám phá (teach):**
- *[m9-gpo]* GPO (Group Policy Object) là một TẬP LUẬT viết một lần trên máy chủ: hình nền, luật mật khẩu, cấm USB, chặn cài phần mềm… Nhưng GPO tự nó chưa làm gì cả — nó chỉ CÓ TÁC DỤNG khi được TREO (link) vào một chỗ: cả miền, một site, hay một OU. Máy trong chỗ đó cứ đến hẹn lại tải luật về và tự áp.
  - **Đào sâu hơn:** Tên có chữ "Group" nhưng GPO KHÔNG treo vào group được — chỗ treo chỉ có Site, Domain, OU. Đây là cái bẫy chữ nghĩa nổi tiếng nhất của AD, và là lý do bài trước bắt bạn tách bạch group với OU. Máy client tự làm mới luật quãng mỗi 90 phút — muốn ngay lập tức thì có một câu lệnh, bài cuối sẽ đưa.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Ví dụ giải sẵn — treo một GPO từ A tới Z: (1) Trên DC mở Group Policy Management. (2) Tạo GPO mới, đặt tên HinhNen-CongTy. (3) Mở GPO, sửa luật: User Configuration → Desktop → Wallpaper, trỏ về ảnh logo chung. (4) TREO GPO vào OU KeToan. (5) Chờ máy làm mới luật — hình nền cả phòng đổi. Đọc lại bước (4) lần nữa: quên treo thì luật nằm chết trên giấy, và treo Ở ĐÂU quyết định AI phải theo.
- **Đề:** Viết xong một GPO thật đẹp nhưng chưa treo (link) vào đâu — chuyện gì xảy ra?
  - **Dạng:** trắc nghiệm · **Không gì cả — GPO chỉ có tác dụng khi được treo vào miền, site hoặc OU** ✓ / Cả miền lập tức áp luật / Chỉ máy chủ DC áp luật
  - **Chủ đề gợi ý (tầng 1):** bước (4) của ví dụ giải sẵn
  - **Gợi ý (tầng 2):** Tờ cáo thị viết xong mà cất trong ngăn kéo thì dân làng đọc kiểu gì?
  - **Lời giải (tầng 3):** Không gì xảy ra: GPO phải được TREO vào một chỗ (Site/Domain/OU) thì máy trong chỗ đó mới tải về áp.
- **Đề:** Muốn luật chỉ áp cho riêng phòng Kế toán, bạn treo GPO vào đâu? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** ou | ou ketoan | ou kế toán | ou ke toan | organizational unit
  - **Chủ đề gợi ý (tầng 1):** ngăn kéo của phòng đó
  - **Gợi ý (tầng 2):** Không phải group — chỗ treo là cái ngăn kéo chứa người và máy của phòng.
  - **Lời giải (tầng 3):** Treo vào OU KeToan — phạm vi treo quyết định ai phải theo, và OU là mức khoanh vùng theo phòng ban.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: GPO treo được vào những chỗ nào?
  - **Dạng:** trắc nghiệm · **Site, Domain, OU** ✓ / Group / Từng tệp tin trên máy
  - **Chủ đề gợi ý (tầng 1):** cái bẫy nằm ngay trong tên GPO
  - **Gợi ý (tầng 2):** Tên có chữ Group nhưng group KHÔNG nằm trong danh sách chỗ treo.
  - **Lời giải (tầng 3):** Site, Domain, OU — ba loại chỗ treo duy nhất. GPO không treo vào group được, dù tên nó có chữ Group.
- **Đề:** Vẫn từ trí nhớ: tập luật viết một lần trên máy chủ, máy trong miền tự tải về áp, gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** gpo | group policy | group policy object
  - **Chủ đề gợi ý (tầng 1):** tờ cáo thị của đình làng
  - **Gợi ý (tầng 2):** Ba chữ cái, chữ cuối là Object.
  - **Lời giải (tầng 3):** GPO — Group Policy Object: viết một lần, treo đúng chỗ, máy tự áp.
- **Tự giải thích:** Giải thích bằng lời của bạn: GPO hơn gì việc đi từng máy chỉnh tay?
  - **Nhóm ý cần chạm:** [một lần, mot lan, trung tâm, trung tam, tự tải, tu tai, tự áp, tu ap] · [treo, link, phạm vi, pham vi, chỗ nào, cho nao, ai phải theo, ai phai theo]
  - **Trả lời mẫu:** Viết một lần ở trung tâm rồi máy tự tải về áp — 200 máy hay 2000 máy cũng chỉ một thao tác. Và nhờ chuyện treo theo phạm vi, mình chọn được chính xác ai phải theo luật nào thay vì áp bừa cả công ty.

**6 · Tổng kết:**
- GPO là tập luật viết một lần trên máy chủ; máy trong miền tự tải về áp.
- GPO chỉ có tác dụng khi được TREO — vào Site, Domain hoặc OU, không vào group.
- Treo ở đâu quyết định ai phải theo — phạm vi là một nửa của bộ luật.
- *Úp mở bài sau:* Nhưng máy bạn không chỉ nhận luật từ một chỗ: chính nó, tòa nhà, công ty, phòng ban — BỐN tầng luật cùng đổ xuống. Bốn tầng cãi nhau thì ai thắng? Bài sau leo tòa nhà.

### Bài: Leo tòa nhà bốn tầng LSDOU `m9-bai-4`

**1 · Khởi động (hook):** Một máy trong phòng Kế toán nhận luật từ BỐN nơi cùng lúc: của chính nó, của văn phòng, của công ty, của phòng ban. Bốn luật cãi nhau về cùng một thứ — máy nghe ai?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: máy áp các bậc GPO theo thứ tự nào?
  - **Dạng:** trắc nghiệm · **Local → Site → Domain → OU, bậc áp sau đè lên bậc trước** ✓ / OU trước, Local sau cùng / Thứ tự ngẫu nhiên mỗi lần khởi động
  - **Vì sao:** LSDOU — leo từ tầng trệt lên nóc. Ai nói SAU người đó thắng, nên luật OU (gần người dùng nhất) là tiếng nói cuối cùng.

**3 · Khám phá (teach):**
- *[m9-lsdou]* Thứ tự áp GPO là một TÒA NHÀ BỐN TẦNG, leo từ trệt lên nóc: Local (luật riêng máy) → Site (cả văn phòng một chỗ) → Domain (toàn công ty) → OU (từng phòng ban). Tầng áp SAU ghi đè tầng trước, nên OU — nói cuối — thắng hết. Giờ đi thăm từng tầng; nhớ CHỖ của mỗi tầng, vì chính thứ tự là thứ phải nhớ.
  - **Đi xem cung điện (4 phòng):**
    - tầng 1 phòng 1 · Local · chính máy đó · hình `gpo-house-rules` — Tầng trệt Local: tấm bảng nội quy dán ngay cửa nhà — luật của riêng máy đó, chưa ai ngoài nhìn thấy.
    - tầng 2 phòng 1 · Site · cả văn phòng một chỗ · hình `gpo-office-floor` — Tầng hai Site: bảng tin của cả tòa văn phòng — máy nào ngồi trong tòa này đều phải đọc.
    - tầng 3 phòng 1 · Domain · toàn công ty · hình `gpo-company-flag` — Tầng ba Domain: lá cờ công ty treo giữa sảnh — luật chung cho mọi máy đã gia nhập miền.
    - tầng 4 phòng 1 · OU · từng phòng ban · hình `gpo-department-door` — Tầng nóc OU: cửa từng phòng ban có luật riêng — áp SAU CÙNG nên thắng hết các tầng dưới.
  - **Đào sâu hơn:** Vì sao xếp vậy? Càng lên cao, luật càng GẦN người dùng: luật phòng ban hiểu công việc của phòng hơn luật toàn công ty. Khi các OU lồng nhau, OU cha áp trước OU con — vẫn đúng tinh thần "cụ thể hơn thì nói sau".

**4 · Thử tay (practice, fading 1):**
- **Đề:** Điền tầng còn thiếu: Local → ___ → Domain → OU.
  - **Dạng:** gõ tay · **Chấp nhận:** site
  - **Chủ đề gợi ý (tầng 1):** tầng hai của tòa nhà
  - **Gợi ý (tầng 2):** Bậc của "cả văn phòng một chỗ" — bảng tin của tòa nhà.
  - **Lời giải (tầng 3):** Site — bậc áp cho mọi máy ngồi cùng một chỗ vật lý, đứng giữa Local và Domain.
- **Đề:** GPO Domain đặt hình nền XANH, GPO treo ở OU KeToan đặt hình nền ĐỎ. Máy phòng Kế toán hiện nền màu gì?
  - **Dạng:** trắc nghiệm · **Đỏ — OU áp sau nên đè lên luật Domain** ✓ / Xanh — Domain to hơn thì thắng / Máy báo xung đột và giữ nền cũ
  - **Chủ đề gợi ý (tầng 1):** ai nói cuối trong tòa nhà
  - **Gợi ý (tầng 2):** Leo tòa nhà từ trệt lên nóc — tầng nào ở trên nói sau?
  - **Lời giải (tầng 3):** Đỏ. OU là bậc áp cuối cùng nên khi cãi nhau, luật OU đè luật Domain (trừ khi Domain dùng vũ khí đặc biệt — bài sau).

**5 · Nhớ lại (retrieval):**
- **Đề:** Đóng sách lại và leo tòa nhà từ trí nhớ: đứng ở mỗi tầng, nói xem đó là bậc GPO nào và luật của nó áp cho ai.
  - **Dạng:** đi lại cung điện từ trí nhớ (4 phòng)
    - tầng 1 phòng 1 · Local · chính máy đó · hình `gpo-house-rules` — Tầng trệt Local: tấm bảng nội quy dán ngay cửa nhà — luật của riêng máy đó, chưa ai ngoài nhìn thấy.
    - tầng 2 phòng 1 · Site · cả văn phòng một chỗ · hình `gpo-office-floor` — Tầng hai Site: bảng tin của cả tòa văn phòng — máy nào ngồi trong tòa này đều phải đọc.
    - tầng 3 phòng 1 · Domain · toàn công ty · hình `gpo-company-flag` — Tầng ba Domain: lá cờ công ty treo giữa sảnh — luật chung cho mọi máy đã gia nhập miền.
    - tầng 4 phòng 1 · OU · từng phòng ban · hình `gpo-department-door` — Tầng nóc OU: cửa từng phòng ban có luật riêng — áp SAU CÙNG nên thắng hết các tầng dưới.
  - **Chủ đề gợi ý (tầng 1):** leo từ tầng trệt lên nóc, đúng thứ tự áp luật
  - **Gợi ý (tầng 2):** Tầng trệt là luật của riêng máy; càng lên cao luật càng gần phòng ban của người dùng.
  - **Lời giải (tầng 3):** Local (chính máy đó) → Site (cả văn phòng một chỗ) → Domain (toàn công ty) → OU (từng phòng ban).
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao bậc OU được xếp nói CUỐI CÙNG?
  - **Nhóm ý cần chạm:** [gần, gan nguoi dung, cụ thể, cu the, phòng ban, phong ban, hiểu việc, hieu viec] · [sau, ghi đè, ghi de, thắng, thang, cuối, cuoi, chốt, chot]
  - **Trả lời mẫu:** Vì OU gần người dùng nhất — luật phòng ban hiểu công việc của phòng hơn luật chung toàn công ty. Xếp nó nói sau cùng nghĩa là khi cãi nhau, luật cụ thể nhất thắng.

**6 · Tổng kết:**
- LSDOU: Local → Site → Domain → OU, leo từ tầng trệt lên nóc.
- Bậc áp sau đè bậc trước — OU nói cuối nên thắng khi cãi nhau.
- Càng lên cao luật càng gần người dùng: cụ thể hơn thì nói sau.
- *Úp mở bài sau:* Nhưng có tầng không muốn nhận luật từ dưới đẩy lên, và có luật đòi xuyên thủng mọi tầng. Bài cuối: hai vũ khí đối đầu — và hai câu thần chú soi xem luật đang kẹt ở đâu.

### Bài: Phân xử khi các tầng cãi nhau `m9-bai-5`

**1 · Khởi động (hook):** Bạn treo GPO cẩn thận rồi mà máy client vẫn trơ trơ. Luật đang kẹt ở tầng nào? Bị chặn hay chưa kịp tải? Có hai câu lệnh trả lời được — và một cặp vũ khí đang đấu nhau ở giữa tòa nhà.

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: một OU không muốn nhận luật từ trên chảy xuống thì làm gì?
  - **Dạng:** trắc nghiệm · **Bật Block Inheritance — dựng tấm chắn chặn dòng kế thừa** ✓ / Xóa GPO của miền đi / Rút hết máy khỏi miền
  - **Vì sao:** Block Inheritance chặn luật thừa kế từ các bậc trên — trừ những GPO được đánh dấu Enforced, thứ xuyên qua mọi tấm chắn.

**3 · Khám phá (teach):**
- *[m9-ke-thua]* Luật KẾ THỪA: GPO treo ở miền tự chảy xuống mọi OU bên dưới. OU nào không muốn nhận thì bật BLOCK INHERITANCE — dựng tấm chắn, luật trên không lọt vào nữa. Nhưng quản trị miền có vũ khí sau cùng: đánh dấu một GPO là ENFORCED — luật ấy xuyên thủng mọi tấm chắn, và thắng cả luật OU khi hai bên cãi nhau.
  - **Đào sâu hơn:** Enforced đảo cả luật "sau thắng trước": GPO enforced của miền đè luật OU dù OU nói sau. Nó dành cho thứ không được phép có ngoại lệ — luật mật khẩu, phần mềm bảo vệ. Lạm dụng enforced thì mô hình phân quyền theo tầng thành vô nghĩa, nên người giỏi dùng nó rất dè.
- *[m9-gpresult]* Hai câu thần chú khi luật không ăn: gpupdate /force — "áp luật mới NGAY, đừng chờ chu kỳ 90 phút"; và gpresult /r — "kê ra máy này, người này đang dính những GPO nào, cái nào bị gạt". Có gpresult, bạn không phải ĐOÁN luật kẹt ở tầng nào — tấm bảng kê nói thẳng.
  - **Đào sâu hơn:** Trong bảng gpresult, GPO bị Block Inheritance gạt ra nằm ở mục riêng kèm lý do bị từ chối — đọc mục đó TRƯỚC khi nghi ngờ bất cứ thứ gì khác. Đây chính là thói quen "nghi đúng chặng" của bài mạng nhà (Module 7), áp sang thế giới AD.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Yêu cầu suông từ sếp: "mọi máy phòng Kế toán cấm cắm USB, các phòng khác không bị ảnh hưởng". Bạn làm gì?
  - **Dạng:** trắc nghiệm · **Tạo GPO cấm USB rồi treo vào OU KeToan** ✓ / Treo vào Domain rồi nhắn các phòng khác bỏ qua / Đi khóa cổng USB từng máy của phòng Kế toán
  - **Chủ đề gợi ý (tầng 1):** phạm vi treo quyết định ai phải theo
  - **Gợi ý (tầng 2):** Tự dựng lời giải từ hai bài trước: luật viết ở đâu, và khoanh vùng bằng cái gì?
  - **Lời giải (tầng 3):** Tạo GPO cấm USB, treo vào OU KeToan — luật tự áp cho đúng phòng đó, các OU khác không dính.
- **Đề:** Treo xong luật, muốn máy client áp NGAY để nghiệm thu — bạn gõ lệnh gì?
  - **Dạng:** gõ tay · **Chấp nhận:** gpupdate | gpupdate /force | gpupdate/force
  - **Chủ đề gợi ý (tầng 1):** câu thần chú giục việc
  - **Gợi ý (tầng 2):** Lệnh bắt đầu bằng gp, kết thúc bằng update — thêm /force cho dứt khoát.
  - **Lời giải (tầng 3):** gpupdate /force — bắt máy tải và áp toàn bộ luật ngay, không chờ chu kỳ làm mới.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: lệnh nào kê ra các GPO đang áp lên máy và người đang đăng nhập?
  - **Dạng:** gõ tay · **Chấp nhận:** gpresult | gpresult /r | gpresult/r
  - **Chủ đề gợi ý (tầng 1):** tấm bảng kê thay cho việc đoán
  - **Gợi ý (tầng 2):** Ghép gp với "kết quả" tiếng Anh.
  - **Lời giải (tầng 3):** gpresult /r — bảng kê GPO đang áp và GPO bị gạt kèm lý do; hết phải đoán luật kẹt ở đâu.
- **Đề:** Vẫn từ trí nhớ: GPO miền gắn Enforced gặp OU bật Block Inheritance — luật nào thắng?
  - **Dạng:** trắc nghiệm · **Enforced xuyên qua tấm chắn — luật miền thắng** ✓ / Block chặn được tất cả, kể cả Enforced / Hai luật triệt tiêu nhau
  - **Chủ đề gợi ý (tầng 1):** dòng nước khoan thủng mái che
  - **Gợi ý (tầng 2):** Một bên là mái che, một bên là mũi khoan — mũi khoan sinh ra để làm gì?
  - **Lời giải (tầng 3):** Enforced thắng: nó xuyên qua Block Inheritance và đè cả luật OU khi xung đột — vũ khí sau cùng của quản trị miền.
- **Tự giải thích:** Giải thích bằng lời của bạn: khi một luật không ăn xuống máy client, bạn lần theo thứ tự nào để tìm ra chỗ kẹt?
  - **Nhóm ý cần chạm:** [gpresult, bảng kê, bang ke, liệt kê, liet ke, đang dính, dang dinh, bị gạt, bi gat] · [gpupdate, làm mới, lam moi, block, enforced, chặn, chan, treo, tầng, tang]
  - **Trả lời mẫu:** Trước hết gpupdate /force để loại trừ chuyện chưa kịp tải; rồi gpresult /r xem GPO có trong bảng kê không — nếu nằm ở mục bị gạt thì đọc lý do (thường là Block Inheritance), nếu vắng hẳn thì xem lại chỗ treo. Lần theo bảng kê, không đoán mò.

**6 · Tổng kết:**
- Luật kế thừa chảy từ miền xuống; Block Inheritance dựng tấm chắn ở OU.
- Enforced xuyên mọi tấm chắn và đè cả luật OU — dùng dè, cho thứ không có ngoại lệ.
- gpupdate /force áp ngay; gpresult /r kê luật đang dính — lần theo bảng, không đoán.
- *Úp mở bài sau:* Lý thuyết đủ rồi — AD chỉ THẬT khi tự tay dựng: checklist lab VMware đang chờ ở trang Học, dựng làng của riêng bạn rồi hãy vào bài thi. Module sau: đem cả mạng lên mây.

### Khái niệm & flashcard (8)

- **Domain** `m9-domain` — Làng có luật của các máy Windows — gia nhập là chịu luật chung
  - Ẩn dụ: Ký giao kèo vào làng: từ nay việc làng là việc mình, sổ sách làng giữ.
  - Thẻ ôn: *Máy "gia nhập miền" thì điều gì thay đổi?* → Nó chịu bộ luật chung của miền, và tài khoản đăng nhập là của MIỀN — DC xác thực, ngồi máy nào trong miền cũng đăng nhập được.
- **Domain Controller** `m9-dc` — Máy chủ giữ sổ cái của miền và xác thực mọi lượt đăng nhập
  - Ẩn dụ: Trưởng làng giữ sổ cái: ai ra vào làng cũng phải qua tay ông đối chiếu.
  - Thẻ ôn: *Domain Controller làm hai việc gì?* → Giữ sổ cái AD (người, máy, nhóm, luật — tra qua LDAP 389) và xác thực mọi lượt đăng nhập trong miền.
- **User và Group** `m9-user-group` — Tài khoản của miền, và nhóm để cấp quyền một lần cho nhiều người
  - Ẩn dụ: Thẻ câu lạc bộ: có thẻ là vào được mọi phòng của câu lạc bộ, trả thẻ là hết.
  - Thẻ ôn: *Vì sao cấp quyền cho group thay vì cho từng người?* → Cấp một lần cho nhóm: ai vào nhóm tự có, ai rời nhóm tự mất — không sót khi vào, không quên thu hồi khi đi, kiểm toán được.
- **OU** `m9-ou` — Ngăn kéo xếp người và máy theo phòng ban — chỗ để treo GPO
  - Ẩn dụ: Ngăn kéo hồ sơ: một hồ sơ nằm đúng một ngăn, và luật thì dán lên từng ngăn.
  - Thẻ ôn: *OU khác group ở chỗ nào?* → OU để XẾP CHỖ và TREO LUẬT (GPO); group để CẤP QUYỀN. Một người nằm đúng một OU nhưng tham gia được nhiều group.
- **GPO** `m9-gpo` — Tập luật viết một lần trên máy chủ, máy trong miền tự tải về áp
  - Ẩn dụ: Tờ cáo thị dán ở đình làng: dán chỗ nào, dân chỗ đó theo.
  - Thẻ ôn: *GPO có tác dụng từ khi nào, và treo được vào đâu?* → Từ khi được TREO (link) vào Site, Domain hoặc OU — viết xong mà không treo thì nằm chết trên giấy. Không treo vào group được, dù tên có chữ Group.
- **Thứ tự LSDOU** `m9-lsdou` — Local → Site → Domain → OU; bậc áp sau đè bậc trước
  - Ẩn dụ: Tòa nhà bốn tầng leo từ trệt lên nóc — người nói cuối là người chốt.
  - Thẻ ôn: *Bốn bậc GPO áp theo thứ tự nào, và ai thắng khi cãi nhau?* → Local → Site → Domain → OU. Bậc áp SAU ghi đè bậc trước nên OU thắng — trừ khi bậc trên gắn Enforced.
- **Kế thừa GPO** `m9-ke-thua` — Luật trên chảy xuống dưới; Block Inheritance chặn, Enforced xuyên chắn
  - Ẩn dụ: Thác nước chảy xuống các tầng: có tầng dựng mái che, và có dòng nước khoan thủng cả mái.
  - Thẻ ôn: *Block Inheritance gặp GPO Enforced thì sao?* → Enforced xuyên qua tấm chắn và đè cả luật OU khi xung đột — vũ khí sau cùng của quản trị miền, dùng cho thứ không được có ngoại lệ.
- **gpupdate và gpresult** `m9-gpresult` — gpupdate /force áp luật ngay; gpresult /r kê luật đang dính máy
  - Ẩn dụ: Một câu giục "áp luôn đi", một tấm bảng kê "đang theo những luật nào".
  - Thẻ ôn: *Luật không ăn xuống client — hai lệnh nào cứu bạn, mỗi lệnh làm gì?* → gpupdate /force: áp toàn bộ luật ngay, không chờ chu kỳ. gpresult /r: kê GPO đang áp và GPO bị gạt kèm lý do — lần theo bảng, không đoán.

### Bài kiểm tra module (9 câu, cần ≥ 85%)

- **Đề:** Máy "gia nhập miền" nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Chịu bộ luật chung của miền và xác thực đăng nhập qua DC** ✓ / Cài bản Windows mới nhất / Nối vào cùng switch với máy chủ
  - **Vì sao:** Gia nhập miền là ký giao kèo vào làng: luật chung từ máy chủ, tài khoản là của làng, DC gác cổng đăng nhập.
- **Đề:** Máy chủ giữ sổ cái của miền và xác thực mọi lượt đăng nhập gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** domain controller | dc
  - **Vì sao:** Domain Controller — giữ sổ cái AD (tra qua LDAP 389) và gác cổng mọi lượt đăng nhập.
- **Đề:** GROUP và OU khác nhau thế nào?
  - **Dạng:** trắc nghiệm · **Group để cấp quyền; OU để xếp chỗ và treo GPO** ✓ / Là một thứ với hai tên gọi / OU để cấp quyền; group để treo GPO
  - **Vì sao:** Group = thẻ câu lạc bộ (quyền); OU = ngăn kéo hồ sơ (xếp chỗ, treo luật). Một người nằm một OU, thuộc nhiều group.
- **Đề:** Điền tầng còn thiếu vào thứ tự áp GPO: Local → ___ → Domain → OU.
  - **Dạng:** gõ tay · **Chấp nhận:** site
  - **Vì sao:** LSDOU: Local → Site → Domain → OU — Site là bậc "cả văn phòng một chỗ", đứng ngay trên tầng trệt.
- **Đề:** GPO Domain nói A, GPO treo ở OU nói B, không ai gắn Enforced. Máy trong OU theo luật nào?
  - **Dạng:** trắc nghiệm · **B — OU áp sau nên đè lên luật Domain** ✓ / A — miền to hơn thì thắng / Cả hai luật cùng áp một lúc
  - **Vì sao:** Bậc áp sau thắng: OU là tiếng nói cuối trong LSDOU nên luật B đè luật A — trừ khi A được gắn Enforced.
- **Đề:** GPO miền gắn Enforced gặp OU bật Block Inheritance — kết quả?
  - **Dạng:** trắc nghiệm · **Enforced xuyên qua tấm chắn — luật miền vẫn áp và thắng xung đột** ✓ / Block Inheritance chặn được tất cả / Máy client báo lỗi cấu hình
  - **Vì sao:** Enforced là mũi khoan xuyên mái che: vượt Block Inheritance và đè cả luật OU — dùng cho thứ không được có ngoại lệ.
- **Đề:** Lệnh nào bắt máy áp luật mới ngay lập tức, không chờ chu kỳ làm mới?
  - **Dạng:** gõ tay · **Chấp nhận:** gpupdate | gpupdate /force | gpupdate/force
  - **Vì sao:** gpupdate /force — tải và áp lại toàn bộ GPO ngay, dùng khi nghiệm thu luật vừa treo.
- **Đề:** Lệnh nào kê ra các GPO đang áp lên máy và người đang đăng nhập?
  - **Dạng:** gõ tay · **Chấp nhận:** gpresult | gpresult /r | gpresult/r
  - **Vì sao:** gpresult /r — bảng kê GPO đang áp và GPO bị gạt kèm lý do; công cụ chẩn đoán số một khi luật không ăn.
- **Đề:** Leo lại tòa nhà bốn tầng từ trí nhớ: mỗi tầng là bậc GPO nào, và luật của nó áp cho ai?
  - **Dạng:** đi lại cung điện từ trí nhớ (4 phòng)
    - tầng 1 phòng 1 · Local · chính máy đó · hình `gpo-house-rules` — Tầng trệt Local: tấm bảng nội quy dán ngay cửa nhà — luật của riêng máy đó, chưa ai ngoài nhìn thấy.
    - tầng 2 phòng 1 · Site · cả văn phòng một chỗ · hình `gpo-office-floor` — Tầng hai Site: bảng tin của cả tòa văn phòng — máy nào ngồi trong tòa này đều phải đọc.
    - tầng 3 phòng 1 · Domain · toàn công ty · hình `gpo-company-flag` — Tầng ba Domain: lá cờ công ty treo giữa sảnh — luật chung cho mọi máy đã gia nhập miền.
    - tầng 4 phòng 1 · OU · từng phòng ban · hình `gpo-department-door` — Tầng nóc OU: cửa từng phòng ban có luật riêng — áp SAU CÙNG nên thắng hết các tầng dưới.
  - **Vì sao:** Local (chính máy đó) → Site (cả văn phòng một chỗ) → Domain (toàn công ty) → OU (từng phòng ban) — chính thứ tự leo là thứ tự áp luật.
