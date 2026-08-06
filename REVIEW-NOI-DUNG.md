# REVIEW NỘI DUNG — Module 1-5 (Phần A+B)

> Sinh tự động từ `content/modules/module-01.json`, `content/modules/module-02.json`, `content/modules/module-03.json`, `content/modules/module-04.json`, `content/modules/module-05.json` bằng `npm run content:review`.
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

- `m5-r-http` — tầng 1 phòng 1 · cổng 80 · HTTP · hình `palace-door-open` — Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.
- `m5-r-https` — tầng 1 phòng 2 · cổng 443 · HTTPS · hình `palace-golden-lock` — Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.
- `m5-r-dns` — tầng 1 phòng 3 · cổng 53 · DNS · hình `palace-phonebook` — Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.
- `m5-r-ssh` — tầng 2 phòng 1 · cổng 22 · SSH · hình `palace-seashell` — Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.
- `m5-r-telnet` — tầng 2 phòng 2 · cổng 23 · Telnet · hình `palace-glass-wall` — Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.
- `m5-r-rdp` — tầng 2 phòng 3 · cổng 3389 · RDP · hình `palace-mirror-screen` — Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.
- `m5-r-smb` — tầng 3 phòng 1 · cổng 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
- `m5-r-ftp` — tầng 3 phòng 2 · cổng 21 · FTP · hình `palace-conveyor` — Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.
- `m5-r-mysql` — tầng 3 phòng 3 · cổng 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
- `m5-r-smtp` — tầng 4 phòng 1 · cổng 25 · SMTP · hình `palace-mailbox` — Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.
- `m5-r-submission` — tầng 4 phòng 2 · cổng 587 · Mail Submission · hình `palace-id-check` — Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.
- `m5-r-ntp` — tầng 4 phòng 3 · cổng 123 · NTP · hình `palace-big-clock` — Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.
- `m5-r-ldap` — tầng 5 phòng 1 · cổng 389 · LDAP · hình `palace-registry-book` — Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.
- `m5-r-ldaps` — tầng 5 phòng 2 · cổng 636 · LDAPS · hình `palace-safe-book` — Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.
- `m5-r-dhcp` — tầng 5 phòng 3 · cổng 67/68 · DHCP · hình `palace-key-pair` — Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.

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
    - tầng 1 phòng 1 · cổng 80 · HTTP · hình `palace-door-open` — Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.
    - tầng 1 phòng 2 · cổng 443 · HTTPS · hình `palace-golden-lock` — Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.
    - tầng 1 phòng 3 · cổng 53 · DNS · hình `palace-phonebook` — Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.

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
    - tầng 1 phòng 1 · cổng 80 · HTTP · hình `palace-door-open` — Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.
    - tầng 1 phòng 2 · cổng 443 · HTTPS · hình `palace-golden-lock` — Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.
    - tầng 1 phòng 3 · cổng 53 · DNS · hình `palace-phonebook` — Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.
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
    - tầng 2 phòng 1 · cổng 22 · SSH · hình `palace-seashell` — Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.
    - tầng 2 phòng 2 · cổng 23 · Telnet · hình `palace-glass-wall` — Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.
    - tầng 2 phòng 3 · cổng 3389 · RDP · hình `palace-mirror-screen` — Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.
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
    - tầng 2 phòng 1 · cổng 22 · SSH · hình `palace-seashell` — Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.
    - tầng 2 phòng 2 · cổng 23 · Telnet · hình `palace-glass-wall` — Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.
    - tầng 2 phòng 3 · cổng 3389 · RDP · hình `palace-mirror-screen` — Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.
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
    - tầng 3 phòng 1 · cổng 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
    - tầng 3 phòng 2 · cổng 21 · FTP · hình `palace-conveyor` — Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.
    - tầng 3 phòng 3 · cổng 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
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
    - tầng 3 phòng 1 · cổng 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
    - tầng 3 phòng 2 · cổng 21 · FTP · hình `palace-conveyor` — Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.
    - tầng 3 phòng 3 · cổng 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
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
    - tầng 4 phòng 1 · cổng 25 · SMTP · hình `palace-mailbox` — Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.
    - tầng 4 phòng 2 · cổng 587 · Mail Submission · hình `palace-id-check` — Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.
    - tầng 4 phòng 3 · cổng 123 · NTP · hình `palace-big-clock` — Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.
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
    - tầng 4 phòng 1 · cổng 25 · SMTP · hình `palace-mailbox` — Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.
    - tầng 4 phòng 2 · cổng 587 · Mail Submission · hình `palace-id-check` — Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.
    - tầng 4 phòng 3 · cổng 123 · NTP · hình `palace-big-clock` — Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.
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
    - tầng 5 phòng 1 · cổng 389 · LDAP · hình `palace-registry-book` — Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.
    - tầng 5 phòng 2 · cổng 636 · LDAPS · hình `palace-safe-book` — Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.
    - tầng 5 phòng 3 · cổng 67/68 · DHCP · hình `palace-key-pair` — Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.
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
    - tầng 5 phòng 1 · cổng 389 · LDAP · hình `palace-registry-book` — Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.
    - tầng 5 phòng 2 · cổng 636 · LDAPS · hình `palace-safe-book` — Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.
    - tầng 5 phòng 3 · cổng 67/68 · DHCP · hình `palace-key-pair` — Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.
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
    - tầng 1 phòng 1 · cổng 80 · HTTP · hình `palace-door-open` — Cửa chính số 80 mở toang cả ngày, ai đi ngang cũng nhìn thấy hết bên trong.
    - tầng 1 phòng 2 · cổng 443 · HTTPS · hình `palace-golden-lock` — Phòng 443 treo một ổ khóa vàng, thư vào đây được niêm phong trước khi ra.
    - tầng 1 phòng 3 · cổng 53 · DNS · hình `palace-phonebook` — Quầy lễ tân phòng 53 giữ cuốn danh bạ dày, tra tên ra số nhà trong một nốt nhạc.
    - tầng 2 phòng 1 · cổng 22 · SSH · hình `palace-seashell` — Phòng 22 bày một vỏ sò, ghé tai vào là ra lệnh được cho máy ở tận đâu.
    - tầng 2 phòng 2 · cổng 23 · Telnet · hình `palace-glass-wall` — Phòng 23 làm y hệt phòng bên cạnh nhưng bốn vách bằng kính, ai đi ngang cũng đọc được lệnh.
    - tầng 2 phòng 3 · cổng 3389 · RDP · hình `palace-mirror-screen` — Phòng 3389 có tấm gương lớn chiếu nguyên màn hình của một máy tính ở xa.
  - **Vì sao:** Tầng 1: 80 HTTP, 443 HTTPS, 53 DNS. Tầng 2: 22 SSH, 23 Telnet, 3389 RDP.
- **Đề:** Đi lại tầng 3 và tầng 4 của tòa nhà từ trí nhớ.
  - **Dạng:** đi lại cung điện từ trí nhớ (6 phòng)
    - tầng 3 phòng 1 · cổng 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
    - tầng 3 phòng 2 · cổng 21 · FTP · hình `palace-conveyor` — Phòng 21 có băng chuyền chở nguyên thùng tệp qua lại, thùng nào cũng không dán kín.
    - tầng 3 phòng 3 · cổng 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
    - tầng 4 phòng 1 · cổng 25 · SMTP · hình `palace-mailbox` — Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.
    - tầng 4 phòng 2 · cổng 587 · Mail Submission · hình `palace-id-check` — Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.
    - tầng 4 phòng 3 · cổng 123 · NTP · hình `palace-big-clock` — Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.
  - **Vì sao:** Tầng 3: 445 SMB, 21 FTP, 3306 MySQL. Tầng 4: 25 SMTP, 587 gửi thư có đăng nhập, 123 NTP.
- **Đề:** Lên nóc: đi lại tầng 5 từ trí nhớ.
  - **Dạng:** đi lại cung điện từ trí nhớ (3 phòng)
    - tầng 5 phòng 1 · cổng 389 · LDAP · hình `palace-registry-book` — Phòng 389 giữ sổ hộ khẩu của tòa nhà: ai làm gì, thuộc phòng ban nào.
    - tầng 5 phòng 2 · cổng 636 · LDAPS · hình `palace-safe-book` — Phòng 636 cũng là cuốn sổ ấy, nhưng đặt trong két sắt và chỉ mở qua khe kính.
    - tầng 5 phòng 3 · cổng 67/68 · DHCP · hình `palace-key-pair` — Phòng 67 phát chìa khóa nhà, phòng 68 nhận lại biên nhận — cặp phòng này chuyên lo cho người mới đến.
  - **Vì sao:** Tầng 5: 389 LDAP, 636 LDAPS, 67/68 DHCP.
