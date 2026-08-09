# REVIEW NỘI DUNG — Module 1-21 (Phần A+B+C+D+E)

> Sinh tự động từ `content/modules/module-01.json`, `content/modules/module-02.json`, `content/modules/module-03.json`, `content/modules/module-04.json`, `content/modules/module-05.json`, `content/modules/module-06.json`, `content/modules/module-07.json`, `content/modules/module-08.json`, `content/modules/module-09.json`, `content/modules/module-10.json`, `content/modules/module-11.json`, `content/modules/module-12.json`, `content/modules/module-13.json`, `content/modules/module-14.json`, `content/modules/module-15.json`, `content/modules/module-16.json`, `content/modules/module-17.json`, `content/modules/module-18.json`, `content/modules/module-19.json`, `content/modules/module-20.json`, `content/modules/module-21.json` bằng `npm run content:review`.
> Đây là bản để ĐỌC DUYỆT; muốn sửa thì sửa file JSON rồi render lại.

## Mạng là gì? — Câu chuyện bưu điện `module-1`

Phần A · 5 chặng · 6 bài · 6 khái niệm

**Chặng:** Phong bì đầu tiên (m1-bai-1) → Địa chỉ và căn hộ (m1-bai-2, m1-bai-3) → Bưu tá lên đường (m1-bai-4) → Luật chơi chung (m1-bai-5) → Gửi trọn lá thư (m1-bai-6)

### Bài: Đóng gói tấm ảnh đầu tiên `m1-bai-1`

**1 · Khởi động (hook):** Bạn gửi cho Mai — cô bạn ở thành phố khác — một tấm ảnh sinh nhật. Tấm ảnh không hề đi "nguyên tấm": nó bị xé nhỏ ra rồi ráp lại ở máy Mai. Vì sao phải phiền phức vậy?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: khi tấm ảnh đi qua mạng, nó sẽ…
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
  - **Gợi ý (tầng 2):** Nhớ lại lý do người ta chịu khó chia nhỏ: mất một phong bì thì chỉ mất… bao nhiêu?
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
- **Đề:** Đoán thử nhé: mỗi máy trên mạng được nhận ra nhờ…
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

**1 · Khởi động (hook):** Máy Mai vừa mở trình duyệt, vừa nghe nhạc, vừa chat — cùng MỘT địa chỉ IP. Tấm ảnh của bạn đến nơi… sao nó không giao nhầm vào ứng dụng nghe nhạc?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: hai ứng dụng chạy trên cùng một máy được phân biệt nhờ…
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
- **Đề:** Đoán thử nhé: thiết bị chuyển gói tin từ mạng này sang mạng khác là…
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
- **Đề:** Đoán thử nhé: bộ quy tắc chung để hai máy hiểu được nhau gọi là…
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
- **Đề:** Không nhìn lại bài: HTTP, TCP, IP được gọi chung là các…
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
- **Đề:** Đoán thử nhé: việc ĐẦU TIÊN máy bạn làm khi bấm "Gửi" tấm ảnh là…
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

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

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
  - **Dạng:** trắc nghiệm · **Vì dữ liệu đi thành nhiều gói, chỉ cần gửi lại gói bị mất** ✓ / Vì router dọc đường giữ bản sao, mất thì nó gửi lại giúp / Vì máy nhận đoán được phần thiếu từ các gói đã tới
  - **Vì sao:** Chia nhỏ là để hỏng đâu vá đó: mất gói nào gửi lại đúng gói ấy, các gói còn lại không phải đi lần hai.
- **Đề:** Mạng nhà bạn có laptop, điện thoại và máy in cùng nối một router. Hai trong ba máy đó có được mang cùng một địa chỉ IP không?
  - **Dạng:** trắc nghiệm · **Không được — trong cùng một mạng, mỗi máy phải giữ một địa chỉ IP riêng** ✓ / Được — trùng địa chỉ IP vẫn ổn vì mỗi máy còn có tên riêng để phân biệt / Được — hai máy chỉ va nhau khi cùng mở một ứng dụng vào đúng một lúc
  - **Chủ đề gợi ý (tầng 1):** địa chỉ IP phải là duy nhất trong một mạng
  - **Vì sao:** Địa chỉ IP là địa chỉ nhà: hai nhà ghi trùng địa chỉ thì thư không biết giao vào đâu. Trùng IP là mạng của cả hai máy cùng chập chờn.
- **Đề:** Theo ẩn dụ bưu điện của khóa học, địa chỉ IP là địa chỉ tòa nhà. Vậy con số đóng vai SỐ CĂN HỘ — chỉ đúng ứng dụng nhận dữ liệu — gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** port | cổng | số port | số cổng | port number
  - **Chủ đề gợi ý (tầng 1):** con số phân biệt các ứng dụng trên cùng một máy
  - **Vì sao:** IP đưa gói tin tới đúng tòa nhà, port gõ đúng cửa căn hộ. Thiếu port thì gói tin tới được máy nhưng không biết trao cho ứng dụng nào.
- **Đề:** Máy bạn ở Hà Nội gửi ảnh cho máy Mai ở Cần Thơ. Vì sao máy bạn không cần biết trước cả con đường tới máy Mai?
  - **Dạng:** trắc nghiệm · **Vì mỗi router chỉ cần biết chặng kế tiếp rồi chuyền tay nhau tới đích** ✓ / Vì máy bạn đã tải sẵn bản đồ đường đi của toàn bộ Internet khi khởi động / Vì gói tin tự dò từng sợi cáp một cho tới khi gặp đúng máy của Mai
  - **Chủ đề gợi ý (tầng 1):** router chỉ quyết định chặng kế tiếp
  - **Vì sao:** Không ai giữ bản đồ cả Internet. Mỗi router chỉ trả lời một câu: gói này nên đi tiếp qua cửa nào. Nhiều câu trả lời đúng nối lại thành một hành trình.
- **Đề:** Trình duyệt của bạn do một công ty viết, server web do công ty khác viết, vậy mà chúng nói chuyện trơn tru. Nhờ đâu?
  - **Dạng:** trắc nghiệm · **Nhờ hai bên cùng tuân theo HTTP — bộ quy tắc chung đã thỏa thuận trước** ✓ / Nhờ hai bên dò cách nói của nhau trong vài giây đầu của mỗi lần kết nối / Nhờ router dọc đường dịch qua lại giữa hai cách nói khác nhau
  - **Chủ đề gợi ý (tầng 1):** giao thức — bộ quy tắc chung
  - **Vì sao:** Giao thức là luật thống nhất từ trước: cùng khuôn thư, cùng thứ tự lượt nói. Hai bên không cần quen nhau, chỉ cần cùng theo một luật.
- **Đề:** Các gói tin của một tấm ảnh đến máy nhận không đúng thứ tự đã gửi. Nhờ đâu máy nhận vẫn ráp lại được đúng tấm ảnh?
  - **Dạng:** trắc nghiệm · **Nhờ số thứ tự ghi sẵn trong mỗi gói tin, máy nhận xếp lại theo số** ✓ / Nhờ đường truyền luôn giữ nguyên thứ tự gói tin từ lúc gửi tới lúc nhận / Nhờ router cuối cùng xếp lại thứ tự giúp rồi mới giao cho máy nhận
  - **Chủ đề gợi ý (tầng 1):** số thứ tự trong mỗi gói tin
  - **Vì sao:** Mỗi gói mang số thứ tự của mình. Mạng không hứa giao đúng thứ tự — chính con số đó cho phép máy nhận xếp lại và biết gói nào chưa tới.

## Đường đi của gói tin — Gõ google.com, chuyện gì xảy ra? `module-2`

Phần A · 4 chặng · 4 bài · 5 khái niệm

**Chặng:** Hỏi đường trước đã (m2-bai-1) → Cánh cổng ra thế giới (m2-bai-2) → Băng qua thành phố (m2-bai-3) → Chuyến về và tấm bản đồ (m2-bai-4)

### Bài: Tra danh bạ của Internet `m2-bai-1`

**1 · Khởi động (hook):** Bạn gõ google.com và bấm Enter. Nhưng google.com không phải là một địa chỉ — nó chỉ là cái TÊN, như "quán phở chú Ba" chứ không phải số nhà. Vậy máy bạn gọi cho ai để xin "số nhà" thật của Google trước khi lên đường?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: máy bạn tìm đến server của Google nhờ…
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
- *[ban-do-lo-trinh]* Dừng một nhịp nhìn lại: bạn vừa thấy TOÀN CẢNH — cả thành phố Internet từ trên cao. Đó chính là vai trò của Module 2 trong khóa học. 10 module còn lại là những chuyến zoom vào từng quận: quận địa chỉ (Module 3), quận thiết bị trong làng (Module 4), quận luật gửi thư TCP và số căn hộ port (Module 5), thâm cung của cuốn danh bạ DNS (Module 6)… Từ giờ, học tới đâu bạn cũng biết mình đang đứng ở góc nào trên tấm bản đồ này.
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

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Hệ thống "danh bạ của Internet" — đưa tên miền, nhận về địa chỉ IP — gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** dns | domain name system
  - **Vì sao:** DNS đổi cái tên cho người (google.com) thành địa chỉ IP cho máy — như tổng đài 1080 tra hộ số điện thoại từ một cái tên.
- **Đề:** Bạn mang laptop sang nhà một người bạn — mạng Wi-Fi lạ hoắc, lần đầu kết nối. Gõ google.com, laptop vẫn tìm đúng server Google. Nhờ đâu?
  - **Dạng:** trắc nghiệm · Laptop nhớ sẵn đường đi từ hồi ở nhà nên cứ thế đi lại / **Mạng nào cũng hỏi DNS được, danh bạ vẫn trả đúng IP của Google** ✓ / Router nhà bạn ấy giữ sẵn bản sao trang Google cho khách
  - **Vì sao:** Cuốn danh bạ DNS phục vụ mọi mạng: dù bạn ngồi ở đâu, đưa cái tên google.com là nhận về địa chỉ IP của server Google. Đường đi thì mỗi lần mỗi khác — các router tự lo — nhưng bước tra danh bạ luôn hoạt động.
- **Đề:** Bạn chuyển file từ laptop sang máy tính để bàn — cả hai cùng mạng nhà. Gói tin có phải đi qua default gateway không?
  - **Dạng:** trắc nghiệm · Có — mọi gói tin trong nhà phải trình diện gateway rồi mới đi tiếp / **Không — gateway chỉ gác lối RA Internet, cùng làng thì nói thẳng** ✓ / Có — vì gateway giữ danh sách mọi máy trong nhà để chỉ đường
  - **Vì sao:** Gateway là cổng làng — chỉ gác những chuyến RA thế giới. Hai máy cùng mạng nhà trao đổi thẳng trong "làng", không cần qua cổng; rút dây Internet thì chúng vẫn gửi file cho nhau bình thường.
- **Đề:** Trong mạng nhà bạn, thiết bị nào đang đóng vai default gateway?
  - **Dạng:** trắc nghiệm · Máy chủ DNS mà nhà mạng cấp cho bạn / Chiếc switch nối các máy trong nhà lại / **Chiếc router (cục phát Wi-Fi) nhà bạn** ✓
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
  - **Dạng:** trắc nghiệm · Được — chiều về do server quyết, khỏe thì gửi cả trang một lần / **Không — nặng mấy cũng chia thành nhiều gói, qua router như lượt đi** ✓ / Được — miễn là đường mạng nhà bạn đủ nhanh để hứng trọn
  - **Vì sao:** Luật chia gói áp dụng cho cả hai chiều, nặng nhẹ gì cũng vậy: server đóng trang báo vào nhiều gói tin, các router chuyền tay từng gói, máy bạn nhận đủ rồi ráp lại thành trang hoàn chỉnh.
- **Đề:** Gõ đúng tên miền thì trình duyệt báo không tìm thấy trang, nhưng gõ thẳng địa chỉ IP của trang đó lại vào được. Khâu nào đang hỏng?
  - **Dạng:** trắc nghiệm · **Khâu tra danh bạ DNS — tên không đổi ra được địa chỉ IP** ✓ / Khâu đường truyền tới server — gói tin không rời được mạng nhà bạn / Khâu server của trang web — máy chủ đã tắt nên không ai trả lời
  - **Chủ đề gợi ý (tầng 1):** DNS đổi tên miền sang địa chỉ IP
  - **Vì sao:** Vào được bằng địa chỉ IP nghĩa là đường đi và server đều lành, chỉ khâu đổi TÊN sang SỐ hỏng — đó đúng là việc của DNS.
- **Đề:** Máy bạn muốn gửi gói tin tới một địa chỉ IP nằm ngoài mạng nhà. Nó phải giao gói cho thiết bị nào trước tiên?
  - **Dạng:** gõ tay · **Chấp nhận:** default gateway | gateway | cổng mặc định | router | router nhà
  - **Chủ đề gợi ý (tầng 1):** lối ra duy nhất khỏi mạng nhà
  - **Vì sao:** Ra khỏi làng thì phải qua cổng làng: mọi gói tin đi tới mạng khác đều được giao cho default gateway — chính là chiếc router nhà bạn.
- **Đề:** Máy bạn tắt lúc nửa đêm, còn server tòa báo thì không bao giờ tắt. Vì sao server phải luôn bật?
  - **Dạng:** trắc nghiệm · **Vì yêu cầu có thể tới bất cứ lúc nào, không ai hẹn giờ trước với server** ✓ / Vì server phải liên tục đẩy trang web đi cho tất cả mọi người dù không ai hỏi tới / Vì server sẽ mất hết dữ liệu đã lưu nếu bị tắt điện quá vài phút
  - **Chủ đề gợi ý (tầng 1):** server đứng chờ yêu cầu
  - **Vì sao:** Server là quán mở cửa suốt ngày đêm: nó không biết trước ai sẽ tới lúc nào nên phải chờ sẵn. Máy cá nhân chỉ bật khi bạn cần dùng.
- **Đề:** Mỗi lượt mở web là một cặp thư. Lá thư máy bạn gửi đi để đòi trang — vế đầu của cặp ấy — gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** request | yêu cầu | http request | lá thư yêu cầu
  - **Chủ đề gợi ý (tầng 1):** vế thư đi của cặp request / response
  - **Vì sao:** Request là thư đi, response là thư trả lời. Một trang web thường là nhiều cặp: chữ một cặp, mỗi tấm ảnh lại một cặp riêng.

## Địa chỉ — MAC, IP và Subnetting `module-3`

Phần A · 6 chặng · 6 bài · 7 khái niệm · drill: subnet

**Chặng:** Số khung và biển số (m3-bai-1) → Đọc vị một địa chỉ IPv4 (m3-bai-2) → Nhà riêng, địa chỉ chung (m3-bai-3) → Kẻ ranh giới khu phố (m3-bai-4) → Nhẩm nhanh bằng magic number (m3-bai-5) → Biển số cho cả tương lai (m3-bai-6)

### Bài: Phân biệt số khung và biển số `m3-bai-1`

**1 · Khởi động (hook):** Sáng nay bạn dùng laptop ở nhà, chiều mang ra quán cà phê. Trên máy có HAI dãy số định danh: một dãy lặng lẽ đổi theo nơi bạn ngồi, một dãy không hề nhúc nhích từ ngày máy xuất xưởng. Hai dãy số đó là gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: mang laptop từ nhà ra quán cà phê, MAC address của máy sẽ…
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
- **Đề:** Đoán thử nhé: con số lớn nhất mà một "ô" của địa chỉ IPv4 có thể chứa là…
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
- **Đề:** Đoán thử nhé: hai nhà cùng dùng 192.168.1.5 mà không sao, vì…
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
  - **Đào sâu hơn:** Vì sao mẹo này đúng? Vì octet 192 của mask là 11000000: 2 bit đầu thuộc phần khu phố, 6 bit còn lại cho số nhà → mỗi khu có 2^6 = 64 địa chỉ. Phép 256 − 192 chỉ là đường tắt luôn ra đúng con số đó. Mẹo này chạy với mọi prefix: /25 → 256−128 = 128 (mốc .0, .128); /27 → 256−224 = 32 (mốc .0, .32, .64…); /30 → 256−252 = 4. Càng luyện càng nhanh — nên app có hẳn một drill mỗi ngày cho bạn.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Tìm network address của 192.168.1.75/26. (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 192.168.1.64
  - **Chủ đề gợi ý (tầng 1):** mốc gần nhất không vượt quá octet cuối
  - **Gợi ý (tầng 2):** Magic number = 256 − octet đáng chú ý của mask. Tự liệt kê các mốc rồi so với 75.
  - **Lời giải (tầng 3):** 192.168.1.64. Nhẩm: /26 → mask …192 → 256 − 192 = 64 → các mốc 0, 64, 128, 192. Mốc gần nhất không vượt quá 75 là 64 → network address là 192.168.1.64.
- **Đề:** Tìm network address của 10.0.5.77/27. (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 10.0.5.64
  - **Chủ đề gợi ý (tầng 1):** magic number của mask 255.255.255.224
  - **Gợi ý (tầng 2):** Magic number = 256 − octet đáng chú ý của mask 255.255.255.224. Tự liệt kê các mốc rồi so với 77.
  - **Lời giải (tầng 3):** 10.0.5.64. Nhẩm: /27 → mask …224 → 256 − 224 = 32 → các mốc 0, 32, 64, 96. Mốc gần nhất không vượt quá 77 là 64 → network address là 10.0.5.64.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: tìm network address của 172.16.9.100/26. (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 172.16.9.64
  - **Gợi ý (tầng 2):** Magic number = 256 − octet đáng chú ý của mask. Tự liệt kê các mốc rồi so với 100.
  - **Lời giải (tầng 3):** 172.16.9.64. /26 → 256 − 192 = 64 → mốc 0, 64, 128, 192; mốc gần nhất không vượt quá 100 là 64.
- **Tự giải thích:** Giải thích bằng lời của bạn: cách tìm network address của một IP bằng magic number, từng bước một.
  - **Nhóm ý cần chạm:** [bước nhảy, 256 trừ] · [không vượt quá, gần nhất, mốc mạng]
  - **Trả lời mẫu:** Mình đổi prefix ra mask, lấy 256 trừ octet đáng chú ý của mask để được magic number — đó là bước nhảy giữa các khu phố. Liệt kê các mốc theo bước nhảy đó (0, 64, 128…), rồi chọn mốc gần nhất không vượt quá octet của IP — mốc đó chính là network address.

**6 · Tổng kết:**
- Magic number = 256 − octet đáng chú ý của mask (vd /26 → 256 − 192 = 64).
- Các mốc mạng nhảy theo bước magic number: .0, .64, .128, .192…
- Network address = mốc gần nhất không vượt quá IP đang xét.
- *Úp mở bài sau:* Mẹo đã nắm — giờ chỉ thiếu tốc độ. Drill "Luyện chia subnet" trong tab Học sinh đề mới mỗi ngày kèm đồng hồ đếm: ghé luyện mỗi ngày để tay nhẩm nhanh dần lên. Còn bài cuối module: chuyện IPv4… sắp hết sạch địa chỉ.

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

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

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
  - **Dạng:** trắc nghiệm · **Dài 128 bit, viết hex 8 nhóm, rút gọn chuỗi 0 bằng ::** ✓ / Dài 64 bit, viết thập phân ngăn bằng dấu chấm như IPv4 / Là IPv4 nối thêm một octet thứ năm cho đỡ cạn số
  - **Vì sao:** IPv6 dài 128 bit, viết hex thành 8 nhóm ngăn bằng ":", và chuỗi nhóm 0 liên tiếp được rút gọn bằng "::" đúng một lần — một hệ địa chỉ mới hẳn, không phải IPv4 "nối dài".
- **Đề:** Sắp xếp các bước tìm network address của 192.168.1.130/26 bằng magic number theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Đổi /26 ra subnet mask: 255.255.255.192
    2. Lấy 256 trừ octet đáng chú ý: 256 − 192 = 64
    3. Liệt kê các mốc mạng theo bước 64: .0, .64, .128, .192
    4. Chọn mốc gần nhất không vượt quá 130 → network address là 192.168.1.128
  - **Vì sao:** Quy trình nhẩm: prefix → mask → magic number (256 trừ octet đáng chú ý) → liệt kê mốc → chọn mốc gần nhất không vượt quá IP.
- **Đề:** Ký hiệu rút gọn một chuỗi nhóm 0 liên tiếp trong địa chỉ IPv6 là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** :: | dấu :: | dau :: | hai dấu hai chấm | hai dau hai cham
  - **Vì sao:** Ký hiệu "::" thay cho chuỗi nhóm 0 liên tiếp — và chỉ được dùng đúng MỘT lần trong một địa chỉ, vì có hai chỗ "::" thì máy không biết mỗi chỗ giấu bao nhiêu nhóm 0.
- **Đề:** Tìm network address của 10.0.5.77/28. (trả lời dạng x.x.x.x)
  - **Dạng:** gõ tay · **Chấp nhận:** 10.0.5.64
  - **Chủ đề gợi ý (tầng 1):** magic number của /28
  - **Vì sao:** /28 là mask 255.255.255.240, magic number = 256 − 240 = 16. Các mốc mạng: .64 rồi .80 — số 77 nằm trong khối mở đầu ở .64, nên network address là 10.0.5.64.
- **Đề:** Hàng triệu mạng gia đình ở Việt Nam cùng dùng dải 192.168.1.x mà không loạn địa chỉ. Vì sao?
  - **Dạng:** trắc nghiệm · **Vì địa chỉ private chỉ có giá trị trong nội bộ, không ra tới Internet** ✓ / Vì nhà mạng đã chia sẵn cho mỗi nhà một dải 192.168 riêng, không nhà nào trùng nhà nào / Vì các router tự thỏa thuận với nhau để không nhà nào lấy trùng dải
  - **Chủ đề gợi ý (tầng 1):** vì sao địa chỉ private dùng lại được
  - **Vì sao:** Địa chỉ private là số phòng trong tòa nhà: tòa nào cũng có phòng 101 mà không loạn, vì thư từ bên ngoài chỉ ghi tới địa chỉ tòa nhà — tức IP public.
- **Đề:** Subnet mask 255.255.255.192 ghi gọn theo CIDR là gì? (trả lời dạng /n)
  - **Dạng:** gõ tay · **Chấp nhận:** /26 | 26
  - **Chủ đề gợi ý (tầng 1):** CIDR đếm số bit thuộc phần mạng
  - **Vì sao:** 255.255.255.192 có 26 bit đầu là 1 (8 + 8 + 8 + 2), nên viết gọn là /26 — cũng chính là mask có magic number 64.

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

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

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
  - **Dạng:** trắc nghiệm · **Hai cổng đang ở hai VLAN khác nhau** ✓ / Switch hỏng nên không chuyển được khung / Hai máy chưa cùng một workgroup Windows
  - **Vì sao:** VLAN khác nhau là nghi ngờ số một: mọi thứ nhìn đều đúng, nhưng switch coi hai số VLAN là hai mạng riêng nên tiếng gọi ARP không qua được.
- **Đề:** Thiết bị nối hai mạng khác dải địa chỉ và chuyển gói giữa chúng tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** router | bộ định tuyến
  - **Vì sao:** Router. Mỗi chân của nó nằm ở một mạng, và nó tra bảng định tuyến để biết đẩy gói sang chân nào.
- **Đề:** Gói tin đi từ máy A qua hai router rồi tới máy B. Trên đường đi, thứ gì KHÔNG đổi?
  - **Dạng:** trắc nghiệm · Địa chỉ MAC nguồn / Địa chỉ MAC đích / **Địa chỉ IP nguồn và đích** ✓
  - **Vì sao:** Cặp địa chỉ IP giữ nguyên suốt chuyến vì đó là địa chỉ đầu–cuối. Hai địa chỉ MAC thì đổi mới ở từng chặng trao tay.
- **Đề:** Một switch không chia VLAN, 20 máy cắm chung. Một máy phát tiếng gọi ARP hỏi cả phòng. Ai nghe thấy tiếng gọi đó?
  - **Dạng:** trắc nghiệm · **Cả 19 máy còn lại — chúng nằm chung một miền quảng bá** ✓ / Chỉ máy có địa chỉ IP được hỏi, switch biết đường gửi riêng cho nó / Không máy nào, vì switch chặn mọi tiếng gọi chung cho đỡ nghẽn đường
  - **Chủ đề gợi ý (tầng 1):** miền quảng bá — tiếng gọi chung lan tới đâu
  - **Vì sao:** Tiếng gọi chung lan tới đâu, miền quảng bá rộng tới đó. Switch chưa biết ai giữ địa chỉ IP ấy nên phải hỏi cả phòng — chia VLAN chính là dựng tường cho tiếng gọi khỏi lan sang xóm khác.
- **Đề:** Hai máy cắm chung một switch nhưng bạn muốn chúng không nhìn thấy nhau, mà không mua thêm thiết bị. Bạn chia switch bằng thứ gì?
  - **Dạng:** gõ tay · **Chấp nhận:** vlan | virtual lan | mạng lan ảo | mang lan ao
  - **Chủ đề gợi ý (tầng 1):** cách chia một switch thành nhiều mạng
  - **Vì sao:** VLAN chia một switch vật lý thành nhiều mạng tách biệt: hai cổng khác VLAN thì như cắm vào hai switch khác nhau, dù chung một cái hộp.
- **Đề:** Bảng MAC của switch và bảng ARP của máy tính khác nhau ở chỗ nào?
  - **Dạng:** trắc nghiệm · **Bảng MAC ghi máy nào ở cổng nào; bảng ARP ghi IP nào ứng với MAC nào** ✓ / Bảng MAC ghi IP nào ứng với MAC nào; bảng ARP ghi máy nào ở cổng nào / Hai bảng ghi cùng một thứ, chỉ khác chỗ cất là switch hay máy tính
  - **Chủ đề gợi ý (tầng 1):** hai cuốn sổ: bảng MAC và bảng ARP
  - **Vì sao:** Hai cuốn sổ khác nhau: switch nhớ CỔNG của từng địa chỉ MAC, còn máy tính nhớ địa chỉ MAC ứng với từng địa chỉ IP nó vừa hỏi bằng ARP.
- **Đề:** Router nhận gói tin gửi tới một mạng nó không nối trực tiếp. Nó tra cuốn sổ nào để biết đẩy gói đi đâu?
  - **Dạng:** gõ tay · **Chấp nhận:** bảng định tuyến | bang dinh tuyen | routing table | bảng route
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ đường đi của router
  - **Vì sao:** Router tra bảng định tuyến: mỗi dòng nói "muốn tới mạng này thì giao cho ai". Không dòng nào khớp thì gói bị bỏ — đúng cái lỗi thiếu tuyến bạn gặp trong phòng lab.
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
- `m5-r-ftp` — tầng 3 phòng 2 · 21 · FTP · hình `palace-conveyor` — Phòng 21 là quầy RA LỆNH của khu kho: người ta đứng đó hô "lấy thùng này", còn băng chuyền chở thùng thì chạy ở cửa bên. Không thùng nào dán kín.
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

### Bài: Đọc luật của những con số port `m5-bai-3`

**1 · Khởi động (hook):** Máy chủ web luôn ngồi ở port 443 không bao giờ đổi, còn máy bạn thì mỗi lần mở một trang lại dùng một số port khác. Vì sao một bên cố định, một bên đổi liên tục?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: số port nằm trong khoảng nào?
  - **Dạng:** trắc nghiệm · 0 đến 255 / **0 đến 65535** ✓ / 0 đến vô hạn
  - **Vì sao:** Port là số 16 bit nên chạy từ 0 đến 65535 — đúng bằng số căn hộ tối đa của "chung cư" một địa chỉ IP.

**3 · Khám phá (teach):**
- *[m5-cong-noi-tieng]* Dải 0-1023 là những port NỔI TIẾNG: mỗi số được cả thế giới quy ước dành cho một dịch vụ. Máy chủ phải ngồi đúng số đó, vì người tới gõ cửa cần biết trước phải gõ ở đâu — không ai đi hỏi từng nhà xem web nằm ở cửa số mấy.
  - **Đào sâu hơn:** Trên Linux và các hệ họ Unix, chỉ tài khoản quản trị mới mở được port dưới 1024. Đó là lớp bảo vệ cũ nhưng vẫn còn: một chương trình bất kỳ không tự nhận mình là máy chủ web của cả máy được.
- *[m5-cong-tam-thoi]* Phía bạn thì ngược lại: mỗi lần mở một kết nối, hệ điều hành cấp cho nó một port TẠM THỜI lấy từ dải số lớn. Nhờ vậy mở mười tab cùng lúc vẫn không lẫn — mười port khác nhau, mười cuộc trò chuyện riêng.
  - **Đào sâu hơn:** Một kết nối được nhận diện bằng bốn thứ: IP nguồn, port nguồn, IP đích, port đích. Chỉ cần một trong bốn khác đi là một cuộc trò chuyện khác — đó là lý do một máy chủ ở port 443 phục vụ được hàng nghìn người cùng lúc.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Dải port 0-1023 được gọi là dải port gì? (nói bằng tiếng Việt cũng được)
  - **Dạng:** gõ tay · **Chấp nhận:** nổi tiếng | noi tieng | well-known | well known | cổng nổi tiếng | cong noi tieng | port nổi tiếng
  - **Chủ đề gợi ý (tầng 1):** vì sao máy chủ phải ngồi đúng số quy ước
  - **Gợi ý (tầng 2):** Cả thế giới đã quy ước sẵn nên ai cũng biết — bởi vậy mới gọi tên như thế.
  - **Lời giải (tầng 3):** Đó là dải port nổi tiếng (well-known): mỗi số đã có chủ theo quy ước chung, ví dụ 443 của HTTPS.
- **Đề:** Bạn mở ba tab cùng vào một trang web. Ba kết nối đó khác nhau ở chỗ nào?
  - **Dạng:** trắc nghiệm · **Khác port TẠM THỜI phía máy bạn** ✓ / Khác port phía máy chủ / Khác địa chỉ IP của máy bạn
  - **Chủ đề gợi ý (tầng 1):** bên nào là bên đổi số mỗi lần mở kết nối
  - **Gợi ý (tầng 2):** Máy chủ vẫn ngồi nguyên ở 443 — vậy thứ phải khác nhau nằm ở đầu bên kia.
  - **Lời giải (tầng 3):** Ba tab dùng ba port tạm thời khác nhau ở phía máy bạn; máy chủ vẫn ở nguyên port 443.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: số port lớn nhất có thể là bao nhiêu?
  - **Dạng:** gõ tay · **Chấp nhận:** 65535 | 65,535 | 65.535 | 65 535
  - **Chủ đề gợi ý (tầng 1):** sức chứa của một con số 16 bit
  - **Gợi ý (tầng 2):** Đếm từ 0, và tổng cộng có 65536 chỗ.
  - **Lời giải (tầng 3):** 65535 — port là số 16 bit nên đánh số từ 0 đến 65535.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao máy chủ phải ngồi port cố định còn máy bạn thì không?
  - **Nhóm ý cần chạm:** [biết trước, quy ước, cố định, tìm được] · [nhiều kết nối, nhiều tab, phân biệt, không lẫn]
  - **Trả lời mẫu:** Máy chủ ngồi cố định để ai cũng biết trước phải gõ cửa số mấy; máy bạn mỗi kết nối lấy một port tạm thời khác nhau để mở nhiều tab cùng lúc mà dữ liệu không lẫn vào nhau.

**6 · Tổng kết:**
- Port là số từ 0 đến 65535 — chung cư một địa chỉ IP có ngần ấy căn.
- Dải 0-1023 là port nổi tiếng: đã có chủ theo quy ước toàn cầu.
- Phía bạn dùng port tạm thời, mỗi kết nối một số, nên nhiều tab không lẫn nhau.
- *Úp mở bài sau:* Còn 15 con số nổi tiếng nhất thì học kiểu gì cho vào đầu? Bài sau mình bước vào một tòa nhà.

### Bài: Bước vào tòa nhà mười lăm phòng `m5-bai-4`

**1 · Khởi động (hook):** 15 con số rời rạc, không suy ra được từ nguyên lý nào. Học thuộc lòng thì mai quên — vậy người ta nhớ hàng trăm thứ vụn vặt bằng cách gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: cách nào giúp nhớ một danh sách dài rời rạc lâu nhất?
  - **Dạng:** trắc nghiệm · Đọc đi đọc lại danh sách cho tới khi thuộc / **Gắn mỗi mẩu vào một CHỖ trong một không gian quen thuộc rồi đi lại con đường đó** ✓ / Chép lại danh sách ra giấy vài lần
  - **Vì sao:** Trí nhớ không gian khỏe hơn trí nhớ danh sách rất nhiều: gắn mẩu kiến thức vào một chỗ cụ thể rồi đi lại con đường ấy là kỹ thuật cung điện ký ức, dùng cả nghìn năm nay.

**3 · Khám phá (teach):**
- *[m5-cung-dien]* Mình sẽ dựng một tòa nhà 5 tầng, mỗi tầng 3 phòng — đúng 15 phòng cho 15 port. Mỗi phòng có một hình ảnh kỳ quặc gắn với con số của nó. Luật chơi: lúc nào cũng đi cùng một đường, từ tầng trệt lên nóc, trái sang phải. Chính THỨ TỰ đó là sợi dây móc trí nhớ.
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
- **Đề:** Phòng có ổ khóa vàng là port số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 443
  - **Chủ đề gợi ý (tầng 1):** cửa nào được niêm phong trước khi thư đi ra
  - **Gợi ý (tầng 2):** Nó là cửa thứ hai của tầng 1, và là cửa mà trình duyệt hiện hình ổ khóa nhỏ trên thanh địa chỉ.
  - **Lời giải (tầng 3):** Port 443 — HTTPS, phiên bản có khóa của web.

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
  - **Đào sâu hơn:** Telnet ra đời khi mạng còn là chuyện của vài trường đại học tin nhau. Ngày nay nó chỉ còn dùng để thử xem một port có mở không, chứ không ai đăng nhập bằng nó nữa.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Phòng có vỏ sò — gõ lệnh từ xa an toàn — là port số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 22
  - **Chủ đề gợi ý (tầng 1):** cửa đầu tiên của tầng hai
  - **Gợi ý (tầng 2):** Vỏ sò trong tiếng Anh là shell, và tên giao thức cũng có chữ đó.
  - **Lời giải (tầng 3):** Port 22 — SSH (secure shell).
- **Đề:** Phòng vách kính (Telnet, port 23) nguy hiểm ở chỗ nào?
  - **Dạng:** trắc nghiệm · **Mật khẩu đi qua mạng dưới dạng chữ thường, ai bắt được gói tin là đọc được** ✓ / Nó làm máy chủ chạy chậm đi / Nó chỉ chạy được trên mạng nội bộ
  - **Chủ đề gợi ý (tầng 1):** ý nghĩa của bốn vách kính trong hình
  - **Gợi ý (tầng 2):** Vách kính nghĩa là người đi ngang nhìn thấy hết những gì bạn gõ.
  - **Lời giải (tầng 3):** Telnet không mã hóa gì cả: tên đăng nhập và mật khẩu đi trần trên đường truyền.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đi lại tầng 2 từ trí nhớ: vỏ sò, vách kính, tấm gương — mỗi phòng là port nào?
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
- **Đề:** Đoán thử nhé: thư mục chia sẻ giữa các máy Windows đi qua port nào?
  - **Dạng:** trắc nghiệm · **445** ✓ / 80 / 3306
  - **Vì sao:** 445 là port SMB — thứ làm nên ổ đĩa mạng và thư mục chia sẻ trong công ty.

**3 · Khám phá (teach):**
- *[m5-cong-chia-se]* Tầng 3 là chỗ chứa đồ: một kho chung mà ổ đĩa nhà này cắm thẳng sang nhà kia, một băng chuyền chở nguyên thùng tệp qua lại nhưng thùng không dán kín, và một phòng xếp kín tủ hồ sơ hỏi gì cũng tra ra.
  - **Đi xem cung điện (3 phòng):**
    - tầng 3 phòng 1 · 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
    - tầng 3 phòng 2 · 21 · FTP · hình `palace-conveyor` — Phòng 21 là quầy RA LỆNH của khu kho: người ta đứng đó hô "lấy thùng này", còn băng chuyền chở thùng thì chạy ở cửa bên. Không thùng nào dán kín.
    - tầng 3 phòng 3 · 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
  - **Đào sâu hơn:** Cả ba phòng này là mục tiêu ưa thích của kẻ tấn công, vì đằng sau chúng là dữ liệu chứ không phải giao diện. Nguyên tắc chung: đừng bao giờ để 445 và 3306 nhìn thẳng ra Internet. Một chi tiết đáng nhớ về phòng 21: cửa ấy chỉ là chỗ RA LỆNH — "gửi tệp này", "liệt kê thư mục kia" — còn thùng tệp thật lại đi qua một cửa khác mở riêng cho từng lượt. Chính chỗ tách đôi đó làm FTP hay vỡ khi có tường lửa đứng giữa: tường lửa thấy cửa lệnh thì cho qua, còn cửa chở hàng mở sau lưng nó thì không (bạn sẽ gặp lại chuyện này ở Module 7).

**4 · Thử tay (practice, fading 2):**
- **Đề:** Phòng có băng chuyền chở thùng tệp không dán kín là port số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 21
  - **Chủ đề gợi ý (tầng 1):** cách truyền tệp đời đầu, không mã hóa
  - **Gợi ý (tầng 2):** Nó là phòng giữa của tầng 3, và tên giao thức có chữ "File".
  - **Lời giải (tầng 3):** Port 21 — FTP, kiểu truyền tệp đời đầu, dữ liệu và mật khẩu đều đi trần.
- **Đề:** Phòng tủ hồ sơ — cơ sở dữ liệu MySQL — là port số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 3306
  - **Chủ đề gợi ý (tầng 1):** con số của kho dữ liệu
  - **Gợi ý (tầng 2):** Bốn chữ số, bắt đầu bằng 33.
  - **Lời giải (tầng 3):** Port 3306 — MySQL.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đi lại tầng 3 từ trí nhớ: kho chung, băng chuyền, tủ hồ sơ.
  - **Dạng:** đi lại cung điện từ trí nhớ (3 phòng)
    - tầng 3 phòng 1 · 445 · SMB · hình `palace-shared-drive` — Phòng 445 là kho chung của tòa nhà, ổ đĩa nhà này cắm thẳng sang nhà kia.
    - tầng 3 phòng 2 · 21 · FTP · hình `palace-conveyor` — Phòng 21 là quầy RA LỆNH của khu kho: người ta đứng đó hô "lấy thùng này", còn băng chuyền chở thùng thì chạy ở cửa bên. Không thùng nào dán kín.
    - tầng 3 phòng 3 · 3306 · MySQL · hình `palace-file-cabinet` — Phòng 3306 xếp kín tủ hồ sơ, hỏi câu nào cũng có người tra ra đúng bảng.
  - **Chủ đề gợi ý (tầng 1):** hình trong từng phòng của tầng ba
  - **Gợi ý (tầng 2):** Một số ba chữ số, một số hai chữ số, một số bốn chữ số — mỗi phòng một dáng riêng.
  - **Lời giải (tầng 3):** Tầng 3: kho chung là 445 (SMB), băng chuyền là 21 (FTP), tủ hồ sơ là 3306 (MySQL).
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao không nên để port 3306 mở thẳng ra Internet?
  - **Nhóm ý cần chạm:** [dữ liệu, cơ sở dữ liệu, kho, hồ sơ] · [tấn công, nguy hiểm, lộ, đánh cắp, rủi ro]
  - **Trả lời mẫu:** Vì sau port đó là toàn bộ dữ liệu thật chứ không phải giao diện; mở ra ngoài là mời cả thế giới thử mật khẩu vào thẳng kho hồ sơ.

**6 · Tổng kết:**
- Tầng 3 chứa đồ: 445 kho chung, 21 băng chuyền, 3306 tủ hồ sơ.
- FTP truyền tệp nhưng không dán kín — mật khẩu đi trần như Telnet.
- Port dữ liệu (445, 3306) không bao giờ nên nhìn thẳng ra Internet.
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
  - **Đào sâu hơn:** Tách 25 và 587 là để chống thư rác: port 25 chỉ dành cho máy chủ nói chuyện với máy chủ, còn người dùng gửi thư phải qua 587 và phải đăng nhập. Nhà mạng thường chặn thẳng port 25 đi ra từ máy người dùng.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Phòng bắt xuất trình thẻ rồi mới nhận thư bạn gửi đi là port số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 587
  - **Chủ đề gợi ý (tầng 1):** port dành cho người dùng gửi thư, phải đăng nhập
  - **Gợi ý (tầng 2):** Ba chữ số, và nó không phải 25 — 25 là port của máy chủ nói với máy chủ.
  - **Lời giải (tầng 3):** Port 587 — nơi ứng dụng thư của bạn đăng nhập rồi mới gửi được thư đi.
- **Đề:** Cái đồng hồ to của tòa nhà — dịch vụ đồng bộ giờ — nằm ở port nào?
  - **Dạng:** gõ tay · **Chấp nhận:** 123
  - **Chủ đề gợi ý (tầng 1):** con số dễ nhớ nhất tòa nhà
  - **Gợi ý (tầng 2):** Đếm một, hai, ba.
  - **Lời giải (tầng 3):** Port 123 — NTP, chạy trên UDP.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đi lại tầng 4 từ trí nhớ: thùng thư, quầy xuất trình thẻ, đồng hồ lớn.
  - **Dạng:** đi lại cung điện từ trí nhớ (3 phòng)
    - tầng 4 phòng 1 · 25 · SMTP · hình `palace-mailbox` — Phòng 25 là thùng thư bưu cục, thư chạy từ bưu cục này sang bưu cục kia suốt đêm.
    - tầng 4 phòng 2 · 587 · Mail Submission · hình `palace-id-check` — Phòng 587 bắt xuất trình thẻ nhân viên rồi mới nhận lá thư bạn muốn gửi đi.
    - tầng 4 phòng 3 · 123 · NTP · hình `palace-big-clock` — Phòng 123 chỉ có mỗi cái đồng hồ to, cả tòa nhà chỉnh giờ theo nó.
  - **Chủ đề gợi ý (tầng 1):** hình trong từng phòng của tầng bốn
  - **Gợi ý (tầng 2):** Hai phòng đầu cùng lo thư, phòng cuối là con số đếm 1-2-3.
  - **Lời giải (tầng 3):** Tầng 4: thùng thư là 25 (SMTP), quầy xuất trình thẻ là 587, đồng hồ lớn là 123 (NTP).
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao thư gửi đi của người dùng phải qua port 587 chứ không phải 25?
  - **Nhóm ý cần chạm:** [đăng nhập, xác thực, chứng minh, thẻ] · [thư rác, spam, giả mạo, chặn]
  - **Trả lời mẫu:** Vì 587 bắt đăng nhập trước khi nhận thư, nhờ đó biết ai gửi; còn 25 để cho máy chủ nói với máy chủ và thường bị nhà mạng chặn để hạn chế thư rác gửi bừa.

**6 · Tổng kết:**
- Tầng 4: 25 thùng thư giữa các máy chủ, 587 quầy bắt xuất trình thẻ.
- 123 là đồng hồ lớn — đồng bộ giờ, chạy trên UDP.
- Lệch giờ là hỏng chứng chỉ và nhật ký, nên NTP là chuyện hạ tầng.
- *Úp mở bài sau:* Còn một tầng nữa trên nóc: nơi giữ sổ hộ khẩu của cả tòa nhà, và nơi phát chìa khóa cho người mới đến.

### Bài: Lên nóc: sổ hộ khẩu và chìa khóa nhà `m5-bai-8`

**1 · Khởi động (hook):** Cắm dây mạng vào là máy có địa chỉ IP ngay, chẳng cần gõ gì. Ai đã phát địa chỉ đó cho bạn, và bằng port nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: dịch vụ tự cấp địa chỉ IP cho máy mới vào mạng dùng mấy số port?
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
- **Đề:** Cuốn sổ hộ khẩu cất trong két sắt — LDAP có mã hóa — là port số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 636
  - **Chủ đề gợi ý (tầng 1):** bản có khóa của cuốn sổ 389
  - **Gợi ý (tầng 2):** Ba chữ số, và nó KHÔNG phải 389 — 389 là cuốn sổ để ngoài.
  - **Lời giải (tầng 3):** Port 636 — LDAPS, tức LDAP có mã hóa.
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
- **Well-known port** `m5-cong-noi-tieng` — Port nổi tiếng — dải 0-1023 đã có chủ theo quy ước toàn cầu
  - Ẩn dụ: Như số nhà của trụ sở công: ai cũng biết trước phải tới đâu, không cần hỏi đường.
  - Thẻ ôn: *Dải port nổi tiếng là dải nào, và vì sao phải cố định?* → 0-1023. Máy chủ phải ngồi đúng số quy ước để người tới biết trước phải gõ cửa nào.
- **Ephemeral port** `m5-cong-tam-thoi` — Port tạm thời — số hệ điều hành cấp cho mỗi kết nối phía máy bạn
  - Ẩn dụ: Như số thứ tự lấy ở quầy: mỗi lượt một số khác, xong việc là trả lại.
  - Thẻ ôn: *Vì sao mở mười tab cùng một trang web mà dữ liệu không lẫn vào nhau?* → Mỗi kết nối được cấp một port tạm thời khác nhau ở phía máy bạn; máy chủ vẫn ở nguyên một port.
- **Memory palace** `m5-cung-dien` — Cung điện ký ức — gắn mẩu kiến thức vào một chỗ trong không gian quen thuộc
  - Ẩn dụ: Tòa nhà 5 tầng, mỗi phòng một hình kỳ quặc; nhớ lại bằng cách đi lại đúng con đường ấy.
  - Thẻ ôn: *(khái niệm meta — noFlashcard, không vào hộp ôn)*
- **Port tầng 1 — web** `m5-cong-web` — Nhóm port đưa bạn tới một trang web: 80, 443, 53
  - Ẩn dụ: Tầng trệt của tòa nhà: cửa mở toang, cửa khóa vàng và quầy danh bạ.
  - Thẻ ôn: *Ba phòng tầng 1 của cung điện là những port nào?* → 80 HTTP (cửa mở toang), 443 HTTPS (ổ khóa vàng), 53 DNS (quầy danh bạ).
- **Port tầng 2 — điều khiển từ xa** `m5-cong-dieu-khien` — Nhóm port ngồi đây điều khiển máy ở chỗ khác: 22, 23, 3389
  - Ẩn dụ: Tầng hai: vỏ sò, phòng vách kính và tấm gương chiếu màn hình máy kia.
  - Thẻ ôn: *Ba phòng tầng 2 của cung điện là những port nào?* → 22 SSH (vỏ sò, có mã hóa), 23 Telnet (vách kính, gửi trần), 3389 RDP (tấm gương).
- **Port tầng 3 — kho dữ liệu** `m5-cong-chia-se` — Nhóm port chia sẻ tệp và giữ dữ liệu: 445, 21, 3306
  - Ẩn dụ: Tầng ba là kho: ổ đĩa chung, băng chuyền thùng tệp, tủ hồ sơ.
  - Thẻ ôn: *Ba phòng tầng 3 của cung điện là những port nào?* → 445 SMB (kho chung), 21 FTP (băng chuyền), 3306 MySQL (tủ hồ sơ).
- **Port tầng 4 — thư từ và giờ giấc** `m5-cong-thu-tu` — Nhóm port lo thư đi và đồng bộ giờ: 25, 587, 123
  - Ẩn dụ: Tầng bốn: thùng thư bưu cục, quầy xuất trình thẻ và cái đồng hồ to.
  - Thẻ ôn: *Ba phòng tầng 4 của cung điện là những port nào?* → 25 SMTP (thư giữa máy chủ), 587 gửi thư có đăng nhập, 123 NTP (đồng bộ giờ).
- **Port tầng 5 — người và chỗ ở** `m5-cong-danh-ba` — Nhóm port giữ danh bạ người dùng và cấp địa chỉ: 389, 636, 67/68
  - Ẩn dụ: Nóc nhà: sổ hộ khẩu, sổ trong két sắt và cặp phòng phát chìa khóa.
  - Thẻ ôn: *Ba phòng tầng 5 của cung điện là những port nào?* → 389 LDAP (sổ hộ khẩu), 636 LDAPS (sổ trong két sắt), 67/68 DHCP (cặp chìa khóa).

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Thứ tự đúng của cái bắt tay ba bước là gì?
  - **Dạng:** trắc nghiệm · **SYN → SYN-ACK → ACK** ✓ / SYN → ACK → SYN-ACK / ACK → SYN → SYN-ACK
  - **Vì sao:** Máy bạn mở lời bằng SYN, máy chủ đáp bằng gói mang hai vai SYN-ACK, máy bạn chốt bằng ACK.
- **Đề:** Nhịp giữa của bắt tay ba bước tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** syn-ack | syn ack | synack
  - **Vì sao:** SYN-ACK là nhịp duy nhất mang hai vai: vừa xác nhận đã nghe thấy, vừa hỏi ngược lại để mở chiều còn lại.
- **Đề:** Một cuộc gọi video nên đi bằng giao thức nào, và vì sao?
  - **Dạng:** trắc nghiệm · **UDP — chậm một nhịp tệ hơn mất một khung hình** ✓ / TCP — phải bảo đảm không mất khung hình nào
  - **Vì sao:** Với cuộc gọi, dừng lại chờ gửi lại một mẩu đã rớt còn phá trải nghiệm hơn là mất luôn mẩu đó.
- **Đề:** Số port lớn nhất có thể là bao nhiêu?
  - **Dạng:** gõ tay · **Chấp nhận:** 65535 | 65,535 | 65.535 | 65 535
  - **Vì sao:** Port là số 16 bit nên đánh số từ 0 đến 65535.
- **Đề:** Bạn mở ba tab cùng vào một trang web. Thứ khác nhau giữa ba kết nối là gì?
  - **Dạng:** trắc nghiệm · **Port tạm thời phía máy bạn** ✓ / Port phía máy chủ của trang web / Địa chỉ IP của máy chủ trang web
  - **Vì sao:** Máy chủ vẫn ngồi nguyên một port; mỗi kết nối phía bạn được cấp một port tạm thời riêng nên dữ liệu không lẫn.
- **Đề:** TCP làm việc gì mà UDP không làm?
  - **Dạng:** trắc nghiệm · **Đánh số gói, chờ báo nhận và gửi lại gói thiếu** ✓ / Mã hóa nội dung gói tin trước khi đẩy ra đường truyền / Chọn đường đi ngắn nhất qua các router trên Internet
  - **Chủ đề gợi ý (tầng 1):** TCP bảo đảm bằng cách nào
  - **Vì sao:** TCP lo phần tin cậy: đánh số, báo nhận, gửi lại gói thiếu. Mã hóa là việc của HTTPS, chọn đường là việc của router — ba việc khác nhau, đừng dồn hết cho TCP.
- **Đề:** Dải port đã có chủ theo quy ước toàn cầu chạy từ 0 tới số nào?
  - **Dạng:** gõ tay · **Chấp nhận:** 1023 | 1.023 | 1,023
  - **Chủ đề gợi ý (tầng 1):** biên trên của dải port nổi tiếng
  - **Vì sao:** 0 tới 1023 là dải well-known: 80 của web, 443 của web mã hóa, 22 của SSH. Trên máy chủ, mở một port trong dải này còn cần quyền quản trị.
- **Đề:** Một câu tra tên miền đi tới port 53 thường chọn UDP thay vì TCP. Vì sao?
  - **Dạng:** trắc nghiệm · **Vì câu hỏi và câu trả lời đều ngắn, hỏi lại còn nhanh hơn bắt tay** ✓ / Vì UDP tự mã hóa sẵn nội dung nên câu tra tên miền của bạn được giấu kín / Vì TCP không dùng được cho những port nằm trong dải nổi tiếng
  - **Chủ đề gợi ý (tầng 1):** khi nào chọn UDP thay TCP
  - **Vì sao:** Một câu hỏi tên miền gọn trong một gói. Bắt tay ba bước cho đúng một gói là quá tốn — mất thì hỏi lại còn rẻ hơn. Đó là chỗ UDP thắng.
- **Đề:** Máy bạn mở một kết nối tới web. Số port mà hệ điều hành cấp cho kết nối đó ở PHÍA MÁY BẠN thuộc loại nào?
  - **Dạng:** gõ tay · **Chấp nhận:** port tạm thời | port tam thoi | ephemeral | ephemeral port | cổng tạm thời | tạm thời
  - **Chủ đề gợi ý (tầng 1):** port phía máy bạn trong mỗi kết nối
  - **Vì sao:** Phía server là port cố định (80, 443), phía bạn là port tạm thời — hệ điều hành bốc ra một số cho mỗi kết nối rồi thu lại khi đóng.
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
    - tầng 3 phòng 2 · 21 · FTP · hình `palace-conveyor` — Phòng 21 là quầy RA LỆNH của khu kho: người ta đứng đó hô "lấy thùng này", còn băng chuyền chở thùng thì chạy ở cửa bên. Không thùng nào dán kín.
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
- **Ví dụ giải sẵn:** Bạn gõ example.com: (1) máy bạn hỏi resolver; (2) resolver hỏi máy chủ gốc, được chỉ sang máy chủ .com; (3) hỏi .com, được chỉ sang máy chủ có thẩm quyền của example.com; (4) hỏi nơi đó, nhận được địa chỉ IP; (5) resolver trả về cho máy bạn và nhớ tạm lại. Đọc lại một lượt, rồi thử tự gọi tên tầng đầu tiên xem.
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
- **Đề:** Đoán thử nhé: câu hỏi DNS thường (port 53) đi trên đường dưới dạng nào?
  - **Dạng:** trắc nghiệm · **Chữ trần — ai chặn được gói tin là đọc được tên miền bạn hỏi** ✓ / Đã mã hóa sẵn từ đầu
  - **Vì sao:** DNS ra đời khi chưa ai nghĩ tới chuyện rình mò: câu hỏi đi trần, nên nhà mạng hay bất kỳ ai ngồi giữa đều đọc được bạn đang tra tên miền nào.

**3 · Khám phá (teach):**
- *[m6-doh]* DNS over HTTPS đóng câu hỏi DNS vào một phong bì HTTPS rồi gửi qua port 443 — đúng cái phòng ổ khóa vàng ở tầng 1 tòa nhà bạn vừa học. Người ngồi giữa chỉ thấy bạn đang nói chuyện với một máy chủ nào đó, không đọc được bạn hỏi tên miền gì.
  - **Đào sâu hơn:** Đổi lại, toàn bộ câu hỏi của bạn dồn về một nhà cung cấp DoH — riêng tư với nhà mạng, nhưng lộ hết với chỗ đó. Và vì lẫn vào lưu lượng 443 nên quản trị mạng công ty cũng khó lọc tên miền độc hại hơn: mỗi lựa chọn đều có cái giá của nó.

**4 · Thử tay (practice, fading 1):**
- **Đề:** DNS over HTTPS gửi câu hỏi qua port số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 443
  - **Chủ đề gợi ý (tầng 1):** phòng ổ khóa vàng ở tầng 1 tòa nhà
  - **Gợi ý (tầng 2):** Cùng port với mọi trang web có khóa — đó chính là mẹo để nó lẫn vào đám đông.
  - **Lời giải (tầng 3):** Port 443 — câu hỏi DNS được bọc trong HTTPS nên trông không khác gì một lượt truy cập web.
- **Đề:** Cái giá phải trả khi bật DNS over HTTPS là gì?
  - **Dạng:** trắc nghiệm · **Toàn bộ câu hỏi dồn về một nhà cung cấp, và mạng công ty khó lọc tên miền độc hại hơn** ✓ / Tốc độ mạng giảm một nửa / Không vào được trang web dùng HTTP
  - **Chủ đề gợi ý (tầng 1):** riêng tư với ai, và lộ với ai
  - **Gợi ý (tầng 2):** Giấu được với người ngồi giữa, nhưng người nhận câu hỏi thì thấy hết.
  - **Lời giải (tầng 3):** Riêng tư với nhà mạng nhưng dồn hết vào một nhà cung cấp DoH; và vì lẫn vào port 443 nên bộ lọc của mạng công ty khó làm việc hơn.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: kỹ thuật bọc câu hỏi DNS vào phong bì HTTPS tên là gì? (viết tắt cũng được)
  - **Dạng:** gõ tay · **Chấp nhận:** doh | dns over https
  - **Chủ đề gợi ý (tầng 1):** tên ghép của hai thứ bạn vừa học
  - **Gợi ý (tầng 2):** Ghép tên giao thức tra tên miền với tên giao thức web có khóa.
  - **Lời giải (tầng 3):** DNS over HTTPS (DoH) — câu hỏi DNS đi trong HTTPS qua port 443.
- **Tự giải thích:** Giải thích bằng lời của bạn: HTTPS đã mã hóa nội dung rồi, vậy vì sao vẫn cần mã hóa cả câu hỏi DNS?
  - **Nhóm ý cần chạm:** [trước, trước khi, đi trước, bước đầu] · [tên miền, trang nào, biết bạn vào, lộ, theo dõi]
  - **Trả lời mẫu:** Vì câu hỏi DNS xảy ra TRƯỚC khi kết nối HTTPS được dựng lên; nó đi trần nên người ngồi giữa vẫn biết bạn vào trang nào, dù không đọc được bạn xem gì trong đó.

**6 · Tổng kết:**
- Câu hỏi DNS thường đi trần — ai ngồi giữa cũng đọc được tên miền bạn hỏi.
- DoH bọc câu hỏi đó trong HTTPS và gửi qua port 443.
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
  - **Đào sâu hơn:** Ngoài địa chỉ IP, gói cấp phát còn kèm subnet mask, địa chỉ gateway và địa chỉ máy chủ DNS — nên chỉ một lần hỏi là máy bạn có đủ mọi thứ cần để ra Internet.
- *[m6-dora]* Bốn nhịp DORA đọc như một chuyện hỏi cưới: chàng trai đứng giữa sân hỏi to "có nhà nào gả không?" (Discover) — các nhà có con gái đánh tiếng "nhà tôi có" (Offer) — chàng chọn MỘT nhà và nói to tên nhà đó cho cả làng nghe (Request) — nhà ấy gật đầu, thế là xong (Ack).
  - **Đào sâu hơn:** Vì sao Request phải nói TO cho cả làng nghe chứ không thì thầm riêng: những nhà kia đang giữ chỗ chờ bạn, nghe thấy bạn chọn người khác thì mới rút lời và trả địa chỉ về kho. Không có nhịp này, mạng có hai máy chủ DHCP sẽ dần cạn địa chỉ vì ai cũng giữ chỗ cho những chàng đã nhận lời một nhà khác.

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
- DHCP cho THUÊ địa chỉ, kèm subnet mask, gateway và máy chủ DNS.
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
- **DNS over HTTPS** `m6-doh` — Bọc câu hỏi DNS trong HTTPS và gửi qua port 443
  - Ẩn dụ: Thay vì hỏi to giữa đường, bạn viết câu hỏi vào phong bì niêm phong rồi mới gửi đi.
  - Thẻ ôn: *DNS over HTTPS giải quyết chuyện gì, và đánh đổi cái gì?* → Giấu tên miền bạn hỏi khỏi người ngồi giữa (đi qua port 443). Đổi lại, câu hỏi dồn hết về một nhà cung cấp và bộ lọc của mạng công ty khó làm việc hơn.
- **DHCP** `m6-dhcp` — Dịch vụ cho thuê địa chỉ IP cùng subnet mask, gateway và máy chủ DNS
  - Ẩn dụ: Như thuê nhà: có giấy, có thời hạn, hết hạn thì gia hạn hoặc trả lại chìa khóa.
  - Thẻ ôn: *Ngoài địa chỉ IP, DHCP còn cấp cho máy bạn những gì?* → Mặt nạ mạng, địa chỉ gateway và địa chỉ máy chủ DNS — đủ để ra Internet chỉ sau một lần hỏi.
- **DORA** `m6-dora` — Bốn nhịp cấp phát địa chỉ: Discover, Offer, Request, Ack
  - Ẩn dụ: Chuyện hỏi cưới: hỏi to giữa sân — nhà có con gái đánh tiếng — chốt một nhà trước cả làng — nhà ấy gật đầu.
  - Thẻ ôn: *Bốn nhịp DORA, và vì sao nhịp Request phải nói to cho cả mạng nghe?* → Discover → Offer → Request → Ack. Request nói to để những máy chủ không được chọn rút lời và trả địa chỉ đang giữ chỗ về kho.
- **DHCP lease** `m6-lease` — Thời hạn thuê địa chỉ và việc gia hạn giữa chừng
  - Ẩn dụ: Tờ giấy thuê có ngày hết hạn; đi được nửa hạn là đã đi xin gia hạn cho chắc.
  - Thẻ ôn: *Khi nào máy bạn xin gia hạn địa chỉ, và bằng mấy nhịp?* → Khi dùng hết một nửa thời hạn, bằng hai nhịp Request + Ack gửi thẳng cho máy chủ đã cấp.

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

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
- **Đề:** DNS over HTTPS gửi câu hỏi qua port nào, và giấu được điều gì?
  - **Dạng:** trắc nghiệm · **Port 443 — giấu tên miền bạn hỏi khỏi người ngồi giữa** ✓ / Port 53 — giấu nội dung trang web khỏi nhà mạng / Port 80 — giấu địa chỉ IP của bạn khỏi mọi trang web
  - **Vì sao:** Câu hỏi DNS được bọc trong HTTPS qua port 443 nên trông như một lượt truy cập web bình thường.
- **Đề:** Xếp bốn nhịp DHCP theo đúng thứ tự.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Discover
    2. Offer
    3. Request
    4. Ack
  - **Vì sao:** DORA: hỏi to giữa sân — nhà có thì đánh tiếng — chốt một nhà trước cả làng — nhà ấy gật đầu.
- **Đề:** Vì sao nhịp Request của DHCP phải gửi dạng quảng bá cho cả mạng nghe?
  - **Dạng:** trắc nghiệm · **Để máy chủ không được chọn rút lời, trả địa chỉ về kho** ✓ / Để router trong nhà ghi lại địa chỉ mới của máy bạn / Vì máy bạn vẫn chưa biết địa chỉ của máy chủ DHCP nào
  - **Vì sao:** Nhiều máy chủ có thể cùng đánh tiếng và mỗi nơi giữ sẵn một địa chỉ; Request nói to để những nơi không được chọn giải phóng chỗ đã giữ.
- **Đề:** Máy bạn bắt đầu xin gia hạn địa chỉ khi đã dùng hết bao nhiêu phần thời hạn thuê?
  - **Dạng:** gõ tay · **Chấp nhận:** một nửa | mot nua | nửa | nua | 50% | 1/2
  - **Vì sao:** Một nửa — xin sớm thì hỏng một lần vẫn còn nửa hạn sau để thử lại, không mất địa chỉ giữa chừng.
- **Đề:** Bản ghi đặt một tên miền làm biệt danh trỏ về tên miền khác gọi là bản ghi gì?
  - **Dạng:** gõ tay · **Chấp nhận:** cname | bản ghi cname | ban ghi cname | biệt danh
  - **Chủ đề gợi ý (tầng 1):** bản ghi biệt danh
  - **Vì sao:** CNAME là biệt danh: www.congty.com trỏ về congty.com. Đổi địa chỉ IP thì chỉ sửa một chỗ, mọi biệt danh tự đi theo.
- **Đề:** Ngoài địa chỉ IP, máy chủ DHCP còn giao cho máy bạn những gì?
  - **Dạng:** trắc nghiệm · **Subnet mask, default gateway và địa chỉ máy chủ DNS** ✓ / Tên miền của trang chủ và bộ nhớ đệm DNS đã tra sẵn / Địa chỉ MAC mới và danh sách port máy được phép mở
  - **Chủ đề gợi ý (tầng 1):** gói thuê của DHCP gồm những gì
  - **Vì sao:** Thuê nhà là thuê trọn gói: địa chỉ, subnet mask, cổng ra và chỗ hỏi đường. Thiếu gateway thì máy có địa chỉ mà vẫn không ra được Internet.
- **Đề:** Máy bạn hỏi một tên miền. Ai là bên ĐI HỎI hộ qua từng tầng rồi mang câu trả lời về?
  - **Dạng:** trắc nghiệm · **Máy chủ phân giải, thường là của nhà mạng** ✓ / Máy chủ gốc, vì nó đứng trên cùng và biết mọi tên miền / Máy chủ có thẩm quyền của tên miền bạn vừa gõ
  - **Chủ đề gợi ý (tầng 1):** bên đi hỏi hộ máy bạn
  - **Vì sao:** Resolver là người chạy việc: hỏi gốc, hỏi TLD, hỏi máy chủ có thẩm quyền, rồi mang đúng MỘT câu trả lời về cho máy bạn. Máy chủ gốc không giữ câu trả lời của mọi tên miền.
- **Đề:** Laptop ngủ qua đêm, sáng mở lên thì thời hạn thuê địa chỉ đã hết. Chuyện gì xảy ra?
  - **Dạng:** trắc nghiệm · **Máy phải xin lại từ đầu bằng Discover trước khi dùng mạng** ✓ / Máy giữ nguyên địa chỉ cũ vĩnh viễn vì nó đã từng được cấp / Máy tự đặt cho mình một địa chỉ bất kỳ trong dải mạng nhà
  - **Chủ đề gợi ý (tầng 1):** hết hạn thuê thì máy làm gì
  - **Vì sao:** Hết hạn thuê là hết quyền ở: máy chạy lại DORA từ nhịp Discover. Còn hạn thì nó chỉ cần xin gia hạn ở nửa chặng đường.

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
- *[m7-pat]* Nhưng thư trả về thì giao cho ai? Router giữ một CUỐN SỔ: mỗi lượt đi ra, nó ghi "căn hộ 192.168.1.10 port 51344 ↔ số nhà chung port 40001". Thư về mang port 40001 thì tra sổ là biết đưa lên căn hộ nào. Dùng số port để phân biệt như vậy gọi là PAT.
  - **Đào sâu hơn:** Vì bảng này chỉ có dòng khi có người TRONG nhà mở lời trước, nên mặc định người ngoài không tự gõ cửa vào được — router không biết đưa cho ai. Đó là lý do mạng nhà tự nhiên đã kín một nửa, dù bạn chưa cài tường lửa nào.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Máy tính 192.168.1.10 mở một trang web. (1) Gói đi ra mang địa chỉ nguồn 192.168.1.10 port 51344. (2) Router đổi nguồn thành 203.0.113.7 port 40001 và ghi cặp đó vào sổ. (3) Máy chủ trả lời về 203.0.113.7 port 40001. (4) Router tra sổ, đổi ngược lại và đưa gói lên đúng máy tính. Đọc kỹ bước 2 rồi thử tự gọi tên cuốn sổ ấy nhé.
- **Đề:** Việc router đổi địa chỉ riêng thành địa chỉ công cộng khi gói tin đi ra gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** nat | network address translation
  - **Chủ đề gợi ý (tầng 1):** chuyện xảy ra với địa chỉ nguồn khi gói rời khỏi nhà
  - **Gợi ý (tầng 2):** Ba chữ cái, chữ giữa là "address".
  - **Lời giải (tầng 3):** NAT — Network Address Translation, việc đổi địa chỉ riêng thành địa chỉ công cộng ở cổng WAN.
- **Đề:** Nhờ đâu router biết thư trả về thuộc máy nào trong nhà?
  - **Dạng:** trắc nghiệm · **Tra cuốn sổ ghi cặp địa chỉ và SỐ CỔNG lúc gói đi ra** ✓ / Hỏi lại tất cả các máy trong nhà / Dựa vào địa chỉ MAC ghi trong gói tin
  - **Chủ đề gợi ý (tầng 1):** thứ router ghi lại lúc gói đi ra
  - **Gợi ý (tầng 2):** Đúng thứ đã giúp phân biệt các ứng dụng ở Module 5 — con số căn hộ.
  - **Lời giải (tầng 3):** Tra bảng NAT/PAT: mỗi dòng ghi cặp "địa chỉ riêng + port riêng ↔ địa chỉ chung + port chung".

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: cách NAT dùng SỐ CỔNG để cả nhà chung một địa chỉ công cộng gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** pat | port address translation
  - **Chủ đề gợi ý (tầng 1):** chữ đầu là tên con số phân biệt các căn hộ
  - **Gợi ý (tầng 2):** Giống NAT nhưng chữ đầu đổi thành chữ đầu của "port".
  - **Lời giải (tầng 3):** PAT — Port Address Translation, phân biệt từng máy trong nhà bằng số port trên cùng một địa chỉ chung.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao nhà bạn và nhà hàng xóm cùng dùng địa chỉ 192.168.1.10 mà không đụng nhau?
  - **Nhóm ý cần chạm:** [riêng, nội bộ, trong nhà, private] · [không ra ngoài, đổi, nat, không xuất hiện, thay bằng]
  - **Trả lời mẫu:** Vì đó là địa chỉ riêng, chỉ có nghĩa trong phạm vi từng nhà; ra tới Internet thì router đã đổi nó thành địa chỉ công cộng của nhà mình rồi, nên hai con số giống nhau không bao giờ gặp nhau ngoài đường.

**6 · Tổng kết:**
- Cả nhà là một chung cư: nhiều địa chỉ riêng, một số nhà chung ra ngoài.
- NAT đổi địa chỉ riêng thành địa chỉ công cộng ở cổng WAN của router.
- PAT dùng số port để biết thư về thuộc máy nào — router tra sổ.
- *Úp mở bài sau:* Sổ chỉ có dòng khi người trong nhà mở lời trước. Vậy muốn ai đó ngoài đường chủ động gõ cửa vào một máy trong nhà thì làm sao?

### Bài: Chừa sẵn một lối vào cho người ngoài `m7-bai-2`

**1 · Khởi động (hook):** Bạn muốn xem camera nhà mình từ chỗ làm. Nhưng router không biết gói tin lạ từ ngoài đường thuộc về máy nào trong nhà — vậy phải dặn nó trước bằng cách gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: muốn truy cập được một máy trong nhà từ Internet, bạn phải khai gì trên router?
  - **Dạng:** trắc nghiệm · **Một dòng dặn trước: port nào từ ngoài thì đưa vào máy nào, port nào** ✓ / Đổi địa chỉ máy đó thành địa chỉ công cộng / Tắt NAT đi
  - **Vì sao:** Đó là port forwarding: bạn ghi sẵn một dòng trong sổ của router, để gói tin lạ tới port đã khai được đưa thẳng vào đúng máy trong nhà.

**3 · Khám phá (teach):**
- *[m7-port-forwarding]* Port forwarding là một dòng bạn ghi TRƯỚC vào sổ của router: "ai gõ vào port 8080 của số nhà chung thì dẫn tới máy 192.168.1.50 port 80". Từ đó người ngoài gõ đúng port ấy là vào được đúng máy ấy — dù trong nhà chưa ai mở lời.
  - **Đào sâu hơn:** Mỗi dòng như vậy là một cánh cửa mở thường trực ra Internet, và cả thế giới đều dò được. Nhớ lại tòa nhà 15 phòng: mở 3389 hay 445 ra ngoài là mời cả hành tinh thử mật khẩu vào màn hình và ổ đĩa nhà bạn.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Port nào sau đây TUYỆT ĐỐI không nên mở thẳng ra Internet bằng port forwarding?
  - **Dạng:** trắc nghiệm · **3389 — màn hình máy tính từ xa** ✓ / 443 — trang web có khóa / 123 — đồng bộ giờ
  - **Chủ đề gợi ý (tầng 1):** phòng có tấm gương chiếu nguyên màn hình
  - **Gợi ý (tầng 2):** Nghĩ xem port nào cho người ngoài ngồi thẳng vào máy bạn nếu đoán trúng mật khẩu.
  - **Lời giải (tầng 3):** 3389 (RDP): mở ra Internet là mời cả thế giới thử mật khẩu để vào thẳng màn hình máy bạn.
- **Đề:** Dòng khai sẵn trên router để người ngoài vào được một máy trong nhà gọi là gì? (tiếng Anh cũng được)
  - **Dạng:** gõ tay · **Chấp nhận:** port forwarding | chuyển tiếp cổng | chuyen tiep cong | forward cổng | mở cổng | chuyển tiếp port | forward port | mở port
  - **Chủ đề gợi ý (tầng 1):** việc router làm với gói tin tới đúng port đã khai
  - **Gợi ý (tầng 2):** Hai từ: một từ là "port", từ kia nghĩa là chuyển tiếp.
  - **Lời giải (tầng 3):** Port forwarding — chuyển tiếp port: khai trước port nào từ ngoài thì đưa vào máy nào trong nhà.

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
- Port forwarding là dòng khai trước: port ngoài nào dẫn vào máy nào, port nào.
- Mỗi dòng là một cửa mở thường trực — đừng bao giờ mở 3389 hay 445.
- *Úp mở bài sau:* Nhưng vì sao thư trả lời của một trang web thì router cho vào, còn gói tin lạ y hệt lại bị chặn? Người gác cửa nhớ mặt bằng cách nào?

### Bài: Xem người gác cửa lật sổ `m7-bai-3`

**1 · Khởi động (hook):** Một gói tin từ Internet gõ cửa nhà bạn. Router cho vào nếu đó là thư trả lời, chặn nếu là người lạ tự tới — mà hai gói tin nhìn gần như y hệt nhau. Nó phân biệt kiểu gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: tường lửa "có nhớ trạng thái" khác tường lửa thường ở chỗ nào?
  - **Dạng:** trắc nghiệm · **Nó nhớ những kết nối do người trong nhà mở ra, và chỉ cho thư trả lời của đúng những kết nối đó vào** ✓ / Nó chạy nhanh hơn / Nó chặn được virus trong tệp tải về
  - **Vì sao:** Stateful nghĩa là có nhớ: mỗi kết nối đi ra được ghi vào bảng, và chỉ gói tin khớp một dòng trong bảng ấy mới được đi vào.

**3 · Khám phá (teach):**
- *[m7-firewall-stateful]* Tường lửa có nhớ trạng thái giữ một bảng các cuộc trò chuyện đang mở: ai trong nhà vừa gọi ra đâu, bằng port nào. Gói tin từ ngoài vào chỉ được qua nếu khớp một dòng trong bảng — tức là đúng câu trả lời của một cuộc gọi có thật. Người lạ tự tới, không có dòng nào, thì mời về.
  - **Đào sâu hơn:** Mỗi dòng còn có hạn: cuộc trò chuyện im lặng quá lâu thì bị xóa khỏi bảng để lấy chỗ. Đó là lý do vài ứng dụng phải gửi gói "giữ nhịp" đều đặn, nếu không kết nối tự đứt sau vài phút không nói gì.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Máy bạn mở một trang web. Gói tin trả về từ máy chủ đó được vào nhà vì sao?
  - **Dạng:** trắc nghiệm · **Vì nó khớp một dòng trong bảng kết nối đang mở của tường lửa** ✓ / Vì máy chủ web là địa chỉ tin cậy / Vì port 443 luôn được mở sẵn
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
- **Đề:** Lắp lại mạng nhà bạn: nối máy tính và điện thoại qua switch vào router nhà, rồi đặt địa chỉ cho hai thiết bị đó sao cho cả hai ra được máy chủ ngoài Internet. Phần từ router ra nhà mạng đã đấu sẵn, y như đời thật. Một điều cần biết trước khi đọc nhật ký chặng: phòng lab này KHÔNG mô phỏng NAT, nên bạn sẽ thấy địa chỉ riêng 192.168.1.x đi thẳng tới máy chủ ngoài. Ngoài đời router đã đổi nó thành địa chỉ công cộng ở ngay chặng ra — đúng như bài NAT đầu module.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** Máy tính [chưa đặt IP] · Điện thoại [chưa đặt IP] · Switch trong nhà [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1, p4:VLAN 1] · Router nhà [lan:192.168.1.1/24, wan:203.0.113.2/30] · Modem nhà mạng [g0:203.0.113.1/30, g1:198.51.100.1/24] · Máy chủ trên Internet [198.51.100.10/24, gw 198.51.100.1] — dây: Router nhà·wan — Modem nhà mạng·g0 | Modem nhà mạng·g1 — Máy chủ trên Internet·eth0
    - **Mục tiêu:**
      - m7-may-tinh PHẢI gọi được m7-may-chu
      - m7-dien-thoai PHẢI gọi được m7-may-chu
    - **Được phép:** cắm dây, gỡ dây, đặt địa chỉ
    - **Lời giải mẫu:** Máy tính [192.168.1.10/24, gw 192.168.1.1] · Điện thoại [192.168.1.11/24, gw 192.168.1.1] · Switch trong nhà [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1, p4:VLAN 1] · Router nhà [lan:192.168.1.1/24, wan:203.0.113.2/30] · Modem nhà mạng [g0:203.0.113.1/30, g1:198.51.100.1/24] · Máy chủ trên Internet [198.51.100.10/24, gw 198.51.100.1] — dây: Router nhà·wan — Modem nhà mạng·g0 | Modem nhà mạng·g1 — Máy chủ trên Internet·eth0 | Máy tính·eth0 — Switch trong nhà·p1 | Điện thoại·wlan0 — Switch trong nhà·p2 | Switch trong nhà·p3 — Router nhà·lan
  - **Chủ đề gợi ý (tầng 1):** thứ mỗi thiết bị cần để biết đường ra khỏi nhà
  - **Gợi ý (tầng 2):** Nối máy tính và điện thoại vào switch, switch nối lên cổng LAN của router nhà. Rồi mỗi thiết bị cần một địa chỉ cùng dải 192.168.1.x và gateway trỏ về 192.168.1.1.
  - **Lời giải (tầng 3):** Máy tính 192.168.1.10/24 và điện thoại 192.168.1.11/24, cả hai đặt gateway 192.168.1.1; dây đi từ hai thiết bị vào switch, rồi từ switch lên cổng LAN của router nhà. Phần WAN ra modem đã đấu sẵn. Nhật ký chặng giữ nguyên địa chỉ riêng suốt đường đi vì phòng lab không mô phỏng NAT — cái bạn đang luyện ở đây là đường DÂY và địa chỉ, còn lớp đổi địa chỉ thì bài 1 của module đã lo.

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
- **PAT** `m7-pat` — Dùng số port để nhiều máy chung một địa chỉ công cộng
  - Ẩn dụ: Cuốn sổ của bảo vệ: thư về mang số nào thì dẫn lên đúng căn hộ đó.
  - Thẻ ôn: *Nhờ đâu router biết thư trả về thuộc máy nào trong nhà?* → Nhờ bảng NAT/PAT: mỗi dòng ghi "địa chỉ riêng + port riêng ↔ địa chỉ chung + port chung" lúc gói đi ra.
- **Port forwarding** `m7-port-forwarding` — Khai trước một lối vào: port ngoài nào dẫn tới máy nào trong nhà
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

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Việc router đổi địa chỉ riêng thành địa chỉ công cộng khi gói tin ra Internet gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** nat | network address translation
  - **Vì sao:** NAT — đổi địa chỉ nguồn ở cổng WAN, nhờ đó cả nhà dùng chung một địa chỉ công cộng.
- **Đề:** Nhờ đâu router biết gói tin trả về thuộc máy nào trong nhà?
  - **Dạng:** trắc nghiệm · **Tra bảng NAT/PAT ghi cặp địa chỉ và port lúc gói đi ra** ✓ / Dựa vào địa chỉ MAC của máy nhận ghi trong gói tin / Phát hỏi lại tất cả thiết bị trong nhà xem của ai
  - **Vì sao:** Mỗi lượt đi ra sinh một dòng trong bảng; thư về khớp dòng nào thì đưa lên máy đó.
- **Đề:** Port nào tuyệt đối không nên mở ra Internet bằng port forwarding?
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
  - **Dạng:** trắc nghiệm · **Chặng phía trên: đường ra của router hoặc nhà mạng** ✓ / Chiếc switch nối các máy trong nhà, ngay dưới router / Card mạng của chính chiếc máy bạn đang ngồi dùng
  - **Vì sao:** Có được địa chỉ 192.168.x.x nghĩa là phần trong nhà vẫn chạy; vấn đề nằm ở chặng ra ngoài.
- **Đề:** Cắm router thứ hai vào cổng WAN của hộp nhà mạng sinh ra tình trạng gì? (tiếng Anh cũng được)
  - **Dạng:** gõ tay · **Chấp nhận:** double nat | doublenat | nat kép | nat kep | hai lớp nat | hai lop nat
  - **Vì sao:** Double NAT: hai lớp đổi địa chỉ, hai cuốn sổ — port forwarding khai một chỗ là chưa đủ.
- **Đề:** Cách gỡ double NAT khi vẫn muốn dùng router thứ hai cho rộng sóng?
  - **Dạng:** trắc nghiệm · **Tắt NAT và DHCP trên nó, cắm dây vào cổng LAN** ✓ / Khai port forwarding trên cả hai router cho khớp nhau / Đặt hai router về cùng một dải địa chỉ cho đồng bộ
  - **Vì sao:** Tắt vai làm cổng của router thứ hai thì cả nhà quay về một lớp NAT và một cuốn sổ duy nhất.
- **Đề:** Ba máy trong nhà cùng mở một trang web qua đúng một địa chỉ công cộng. Router phân biệt ba luồng bằng gì?
  - **Dạng:** trắc nghiệm · **Bằng số port nguồn khác nhau nó gán cho từng luồng** ✓ / Bằng địa chỉ MAC của từng máy ghi kèm trong gói tin / Bằng thứ tự thời gian: máy nào hỏi trước thì nhận trước
  - **Chủ đề gợi ý (tầng 1):** nhiều máy chung một địa chỉ công cộng nhờ gì
  - **Vì sao:** PAT là NAT cộng thêm số port: một địa chỉ công cộng, mỗi luồng một số port riêng — như một tòa nhà chung địa chỉ mà mỗi phòng một số.
- **Đề:** Tường lửa nhà bạn chặn mọi kết nối từ ngoài vào. Vậy vì sao trang web vẫn trả dữ liệu về được cho máy bạn?
  - **Dạng:** trắc nghiệm · **Vì tường lửa nhớ kết nối do máy bạn mở ra và cho lượt về đi qua** ✓ / Vì tường lửa chỉ chặn được kết nối tới, còn dữ liệu trả về thì không xét / Vì port 443 luôn được mở sẵn cả hai chiều trên mọi tường lửa nhà
  - **Chủ đề gợi ý (tầng 1):** tường lửa nhớ các kết nối đang mở
  - **Vì sao:** Stateful nghĩa là có trí nhớ: tường lửa ghi lại kết nối do trong nhà mở ra, gói về khớp kết nối đó thì được vào; gói lạ tự dưng gõ cửa thì không.
- **Đề:** Bạn dựng một máy chủ trong nhà và muốn người ngoài vào được. Trên router phải khai trước lối vào bằng việc gì?
  - **Dạng:** gõ tay · **Chấp nhận:** port forwarding | chuyển tiếp port | chuyen tiep port | mở port | mo port
  - **Chủ đề gợi ý (tầng 1):** khai trước một lối vào từ ngoài
  - **Vì sao:** Port forwarding khai sẵn: gói tới port ngoài này thì giao cho máy nào trong nhà. Không khai thì NAT chặn như mọi khách không hẹn trước.
- **Đề:** Nhà bạn đã có NAT rồi thì còn cần tường lửa nữa không?
  - **Dạng:** trắc nghiệm · **Có — NAT giấu địa chỉ chứ không lọc nội dung hay chặn máy trong nhà đi ra** ✓ / Không — NAT đã chặn sạch mọi thứ đi từ ngoài vào nên mạng trong nhà bạn kín rồi / Không — tường lửa chỉ cần cho công ty, mạng nhà không có gì đáng để mất
  - **Chủ đề gợi ý (tầng 1):** NAT khác tường lửa ở chỗ nào
  - **Vì sao:** NAT là bức tường tình cờ: nó giấu máy trong nhà nhưng không xem nội dung và không chặn máy trong nhà tự mở kết nối ra ngoài. Hai việc khác nhau.

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
- **Ví dụ giải sẵn:** Nhà hai tầng, router đặt phòng khách. (1) TV cạnh router cần xem phim nét — cho nó băng 5 GHz: nhanh, mà ngồi gần thì không sợ đuối. (2) Camera ngoài cổng cách hai bức tường — cho nó 2.4 GHz: chậm cũng được, quan trọng là sóng TỚI nơi. Quy tắc rút ra: gần ưu tiên nhanh, xa ưu tiên tới. Cầm quy tắc đó làm hai câu dưới nhé.
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

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Camera ở góc vườn, cách router hai bức tường, nên vào băng tần nào?
  - **Dạng:** trắc nghiệm · **2.4 GHz — tần số thấp đi xa, xuyên tường tốt** ✓ / 5 GHz — băng tần nhanh hơn thì đi xa hơn / 6 GHz — thế hệ mới nên xuyên tường tốt hơn
  - **Vì sao:** Xa ưu tiên TỚI: 2.4 GHz vang xa nhất; tốc độ của 5/6 GHz vô nghĩa nếu sóng không tới nơi.
- **Đề:** Wi-Fi 6E khác Wi-Fi 6 ở quyền chạy thêm trên băng tần nào? (con số)
  - **Dạng:** gõ tay · **Chấp nhận:** 6 | 6ghz | băng 6 | bang 6
  - **Vì sao:** 6E = Wi-Fi 6 cộng quyền vào băng 6 GHz — làn đường mới còn vắng.
- **Đề:** Chuẩn bảo mật Wi-Fi mới, chặn được kiểu dò mật khẩu offline, tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** wpa3 | wpa 3
  - **Vì sao:** WPA3: kiểu bắt tay mới buộc mỗi lần đoán mật khẩu phải hỏi router một lần theo thời gian thật.
- **Đề:** Địa chỉ IPv6 bắt đầu bằng fe80 là loại địa chỉ gì?
  - **Dạng:** gõ tay · **Chấp nhận:** link-local | link local | linklocal | nội bộ | noi bo | trong phòng | trong phong | cục bộ | cuc bo
  - **Vì sao:** Link-local — máy tự sinh, chỉ có nghĩa trong một đường truyền, không bao giờ qua router.
- **Đề:** Máy 192.168.1.10 mở một trang web. Chuyện gì phải xảy ra với địa chỉ nguồn trước khi gói tin ra tới Internet?
  - **Dạng:** trắc nghiệm · **Router đổi nó thành địa chỉ công cộng — NAT** ✓ / Không đổi gì cả — địa chỉ riêng vẫn đi thẳng ra ngoài / DNS đổi địa chỉ riêng đó thành một tên miền
  - **Vì sao:** 192.168.x.x là địa chỉ riêng IPv4 — phải qua NAT ở router (Module 7). Nhận ra "đây là chuyện của hệ nào" chính là kỹ năng module này luyện.
- **Đề:** Cùng cảnh đó nhưng máy dùng 2001:db8::5 (IPv6 công cộng). Địa chỉ nguồn có phải đổi không?
  - **Dạng:** trắc nghiệm · **Không — đó đã là biển số công cộng thật, đi thẳng** ✓ / Có — gói tin nào ra Internet cũng phải qua NAT / Có — router đổi nó thành địa chỉ fe80 của mình
  - **Vì sao:** IPv6 đủ địa chỉ cho tất cả nên không cần NAT; việc chặn người lạ là của tường lửa — đừng nhầm hai vai.
- **Đề:** Cơ chế cấp địa chỉ qua bốn nhịp Discover–Offer–Request–Ack là của giao thức nào? (viết tắt)
  - **Dạng:** gõ tay · **Chấp nhận:** dhcp
  - **Vì sao:** DHCP — cơ chế cấp phát CÓ SỔ của IPv4 (Module 6); bên IPv6 khi cần sổ sách người ta dùng DHCPv6.
- **Đề:** Cơ chế để máy IPv6 tự ghép địa chỉ từ lời rao prefix của router tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** slaac
  - **Vì sao:** SLAAC — stateless: router rao tên khu phố, máy tự chọn số nhà, không ai giữ sổ.
- **Đề:** Máy bạn đang mang đồng thời 192.168.1.10 và 2001:db8::5. Tình trạng này gọi là gì?
  - **Dạng:** trắc nghiệm · **Dual-stack — chạy song song hai hệ địa chỉ** ✓ / Double NAT — hai lớp đổi địa chỉ chồng lên nhau / Link-local — hai biệt danh chỉ dùng trong phòng
  - **Vì sao:** Dual-stack: hai biển số song song trên một card mạng. Double NAT (Module 7) là chuyện khác hẳn — hai lớp ĐỔI địa chỉ IPv4 lồng nhau.
- **Đề:** Ba máy cùng nối Wi-Fi vào một router. Vì sao tốc độ của mỗi máy tụt xuống khi cả ba cùng tải file?
  - **Dạng:** trắc nghiệm · **Vì không khí là một sợi dây chung, mỗi lúc chỉ một máy được nói** ✓ / Vì router chia đôi băng tần 5 GHz thành ba kênh nhỏ cho ba máy / Vì mỗi máy phải chờ hai máy kia mã hóa xong gói tin của chúng
  - **Chủ đề gợi ý (tầng 1):** không khí là sợi dây dùng chung
  - **Vì sao:** Wi-Fi là một cuộc họp: ai muốn nói phải chờ tới lượt. Dây mạng thì mỗi máy một sợi riêng nên không phải xếp hàng như vậy.
- **Đề:** Vì sao mật khẩu Wi-Fi ngắn nguy hiểm hơn hẳn khi mạng còn chạy WPA2?
  - **Dạng:** trắc nghiệm · **Vì kẻ tấn công bắt được gói bắt tay rồi mang về dò offline hàng triệu lần** ✓ / Vì WPA2 gửi thẳng mật khẩu ra ngoài không khí trong mỗi lần máy kết nối lại / Vì WPA2 chỉ cho phép mật khẩu tối đa tám ký tự nên dò một lúc là trúng
  - **Chủ đề gợi ý (tầng 1):** vì sao WPA2 sợ mật khẩu ngắn
  - **Vì sao:** WPA2 để kẻ tấn công mang gói bắt tay về nhà dò thoải mái. WPA3 bắt mỗi lần đoán phải hỏi router một lần — dò hàng triệu lần thành bất khả thi.
- **Đề:** Một mạng IPv6 công cộng thường được cấp nguyên một khối /64. Điều đó nói lên gì?
  - **Dạng:** trắc nghiệm · **Mỗi mạng con có sẵn số nhà thoải mái nên không cần NAT** ✓ / Mạng đó chỉ được phép có tối đa 64 máy nối vào cùng lúc / Địa chỉ của mọi máy trong mạng đó dài đúng 64 bit
  - **Chủ đề gợi ý (tầng 1):** 64 bit đầu là khu phố, 64 bit sau là số nhà
  - **Vì sao:** /64 chia đôi địa chỉ: nửa đầu là khu phố nhà mạng cấp, nửa sau là số nhà của từng máy. Số nhà nhiều tới mức không ai phải dùng NAT để tiết kiệm.

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
- **Ví dụ giải sẵn:** Đọc một miền đang chạy: công ty dùng miền lab.local. (1) Máy chủ DC01 giữ sổ cái và trả lời mọi lượt đăng nhập. (2) 200 máy nhân viên đã join miền — góc đăng nhập ghi LAB\ten-nhan-vien thay vì tên máy. (3) Muốn đổi luật mật khẩu: sửa MỘT chỗ trên DC01, cả 200 máy tự nhận. Đọc lại bước (3): sửa một chỗ, áp mọi nơi — đó là toàn bộ lý do miền tồn tại.
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
- **Ví dụ giải sẵn:** Treo một GPO từ A tới Z: (1) Trên DC mở Group Policy Management. (2) Tạo GPO mới, đặt tên HinhNen-CongTy. (3) Mở GPO, sửa luật: User Configuration → Desktop → Wallpaper, trỏ về ảnh logo chung. (4) TREO GPO vào OU KeToan. (5) Chờ máy làm mới luật — hình nền cả phòng đổi. Đọc lại bước (4) lần nữa: quên treo thì luật nằm chết trên giấy, và treo Ở ĐÂU quyết định AI phải theo.
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

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Máy "gia nhập miền" nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Chịu luật chung của miền, đăng nhập xác thực qua DC** ✓ / Máy được đặt vào cùng một workgroup với các máy khác / Máy được nối vào cùng switch với máy chủ công ty
  - **Vì sao:** Gia nhập miền là ký giao kèo vào làng: luật chung từ máy chủ, tài khoản là của làng, DC gác cổng đăng nhập.
- **Đề:** Máy chủ giữ sổ cái của miền và xác thực mọi lượt đăng nhập gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** domain controller | dc
  - **Vì sao:** Domain Controller — giữ sổ cái AD (tra qua LDAP 389) và gác cổng mọi lượt đăng nhập.
- **Đề:** GROUP và OU khác nhau thế nào?
  - **Dạng:** trắc nghiệm · **Group để cấp quyền; OU để xếp chỗ và treo GPO** ✓ / Là một thứ với hai tên gọi khác nhau / OU để cấp quyền, còn group để xếp chỗ và treo GPO
  - **Vì sao:** Group = thẻ câu lạc bộ (quyền); OU = ngăn kéo hồ sơ (xếp chỗ, treo luật). Một người nằm một OU, thuộc nhiều group.
- **Đề:** Điền tầng còn thiếu vào thứ tự áp GPO: Local → ___ → Domain → OU.
  - **Dạng:** gõ tay · **Chấp nhận:** site
  - **Vì sao:** LSDOU: Local → Site → Domain → OU — Site là bậc "cả văn phòng một chỗ", đứng ngay trên tầng trệt.
- **Đề:** GPO Domain nói A, GPO treo ở OU nói B, không ai gắn Enforced. Máy trong OU theo luật nào?
  - **Dạng:** trắc nghiệm · **B — OU áp sau nên đè lên luật Domain** ✓ / A — miền to hơn nên luật miền thắng / Cả hai luật cùng áp một lúc, không ai đè ai
  - **Vì sao:** Bậc áp sau thắng: OU là tiếng nói cuối trong LSDOU nên luật B đè luật A — trừ khi A được gắn Enforced.
- **Đề:** GPO miền gắn Enforced gặp OU bật Block Inheritance — kết quả?
  - **Dạng:** trắc nghiệm · **Enforced xuyên qua tấm chắn — luật miền vẫn thắng** ✓ / Block Inheritance chặn được tất cả, kể cả Enforced / Máy client báo lỗi cấu hình và bỏ qua cả hai
  - **Vì sao:** Enforced là mũi khoan xuyên mái che: vượt Block Inheritance và đè cả luật OU — dùng cho thứ không được có ngoại lệ.
- **Đề:** Lệnh nào bắt máy áp luật mới ngay lập tức, không chờ chu kỳ làm mới?
  - **Dạng:** gõ tay · **Chấp nhận:** gpupdate | gpupdate /force | gpupdate/force
  - **Vì sao:** gpupdate /force — tải và áp lại toàn bộ GPO ngay, dùng khi nghiệm thu luật vừa treo.
- **Đề:** Lệnh nào kê ra các GPO đang áp lên máy và người đang đăng nhập?
  - **Dạng:** gõ tay · **Chấp nhận:** gpresult | gpresult /r | gpresult/r
  - **Vì sao:** gpresult /r — bảng kê GPO đang áp và GPO bị gạt kèm lý do; công cụ chẩn đoán số một khi luật không ăn.
- **Đề:** Mười người mới vào phòng kế toán, cần đúng bộ quyền như người cũ. Cách làm gọn nhất là gì?
  - **Dạng:** trắc nghiệm · **Thêm cả mười vào group của phòng kế toán, quyền cấp cho group** ✓ / Cấp quyền bằng tay cho từng người theo đúng danh sách quyền của người cũ / Tạo cho mỗi người một OU riêng rồi treo quyền lên từng OU đó
  - **Chủ đề gợi ý (tầng 1):** group để cấp quyền, OU để xếp chỗ
  - **Vì sao:** Group là để cấp quyền một lần cho nhiều người: vào group là có quyền, rời group là mất quyền. OU là ngăn kéo xếp chỗ và treo GPO — hai việc khác nhau.
- **Đề:** Bạn muốn một luật chỉ áp cho riêng phòng kế toán, không đụng phòng khác. Bạn treo GPO lên đâu?
  - **Dạng:** gõ tay · **Chấp nhận:** ou | ou phòng kế toán | ou kế toán | organizational unit | ou cua phong ke toan
  - **Chủ đề gợi ý (tầng 1):** chỗ treo GPO cho một phòng ban
  - **Vì sao:** GPO treo được ở Site, Domain và OU. Muốn luật chỉ dính đúng một phòng ban thì treo lên OU của phòng đó — đó chính là lý do OU tồn tại.
- **Đề:** Người dùng kêu luật mới không có hiệu lực trên máy họ. Việc đầu tiên bạn làm là gì?
  - **Dạng:** trắc nghiệm · **Chạy gpresult trên máy đó xem GPO nào đang thật sự dính** ✓ / Xóa GPO cũ đi rồi tạo lại từ đầu cho chắc chắn sạch sẽ / Khởi động lại Domain Controller để nó phát luật xuống lại
  - **Chủ đề gợi ý (tầng 1):** lệnh kê luật đang dính máy
  - **Vì sao:** Đọc trước, sửa sau: gpresult kê ra GPO đang áp và GPO bị gạt kèm lý do. Chưa biết luật nào thắng mà đã đi sửa là mò kim đáy bể.
- **Đề:** Leo lại tòa nhà bốn tầng từ trí nhớ: mỗi tầng là bậc GPO nào, và luật của nó áp cho ai?
  - **Dạng:** đi lại cung điện từ trí nhớ (4 phòng)
    - tầng 1 phòng 1 · Local · chính máy đó · hình `gpo-house-rules` — Tầng trệt Local: tấm bảng nội quy dán ngay cửa nhà — luật của riêng máy đó, chưa ai ngoài nhìn thấy.
    - tầng 2 phòng 1 · Site · cả văn phòng một chỗ · hình `gpo-office-floor` — Tầng hai Site: bảng tin của cả tòa văn phòng — máy nào ngồi trong tòa này đều phải đọc.
    - tầng 3 phòng 1 · Domain · toàn công ty · hình `gpo-company-flag` — Tầng ba Domain: lá cờ công ty treo giữa sảnh — luật chung cho mọi máy đã gia nhập miền.
    - tầng 4 phòng 1 · OU · từng phòng ban · hình `gpo-department-door` — Tầng nóc OU: cửa từng phòng ban có luật riêng — áp SAU CÙNG nên thắng hết các tầng dưới.
  - **Vì sao:** Local (chính máy đó) → Site (cả văn phòng một chỗ) → Domain (toàn công ty) → OU (từng phòng ban) — chính thứ tự leo là thứ tự áp luật.

## Cloud Networking và Zero Trust `module-10`

Phần C · 5 chặng · 5 bài · 8 khái niệm

**Chặng:** Thuê góc đám mây (m10-bai-1) → Gác sát từng máy (m10-bai-2) → Cầu và hầm (m10-bai-3) → Không tin ai mặc định (m10-bai-4) → Một danh tính hai thế giới (m10-bai-5)

### Bài: Thuê một góc đám mây và kẻ mạng lên đó `m10-bai-1`

**1 · Khởi động (hook):** Công ty bạn vừa "lên mây": không mua switch, không kéo một sợi dây nào, không có phòng máy chủ — vậy mà vẫn có một mạng riêng với các dải địa chỉ y như ở nhà. Mạng đó nằm ở đâu, và ai kẻ ra nó?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: "đám mây" thực chất là gì?
  - **Dạng:** trắc nghiệm · **Máy chủ trong data center của người khác — bạn thuê qua Internet và tự phục vụ bằng phần mềm** ✓ / Một công nghệ mạng hoàn toàn mới, không liên quan gì mạng thường / Một loại Wi-Fi tầm xa
  - **Vì sao:** Không có phép màu nào cả: đám mây là data center khổng lồ của nhà cung cấp. Cái mới là cách dùng — mọi thứ từng là THIẾT BỊ nay thành PHẦN MỀM bạn tự khai báo.

**3 · Khám phá (teach):**
- *[m10-cloud]* Đám mây là data center của nhà cung cấp (AWS, Azure, Google), bạn thuê một phần qua Internet. Điểm khác căn bản với phòng máy chủ ở nhà: mọi thứ từng là THIẾT BỊ phải mua và cắm — switch, router, tường lửa — nay thành PHẦN MỀM bạn khai trên màn hình, có trong vài giây, trả tiền theo lượng dùng.
  - **Đào sâu hơn:** Vì hạ tầng là phần mềm, người ta khai nó bằng… tệp văn bản (infrastructure as code): cả một mạng công ty nằm gọn trong vài trang khai báo, xóa đi dựng lại trong một buổi trưa. Đó là điều phòng máy chủ vật lý không bao giờ làm được.
- *[m10-vpc]* SO SÁNH SONG SONG — mạng nhà (đã học) ↔ VPC (mới): ở nhà bạn có dải địa chỉ riêng và VLAN ngăn cách hàng xóm (Module 3-4). Trên mây, thứ tương ứng là VPC/VNet: một vùng mạng RIÊNG kẻ ra trong data center của họ, có dải địa chỉ bạn tự chọn, chia subnet y hệt. GIỐNG: cô lập, dải riêng, chia subnet bằng CIDR. KHÁC: không dây, không switch — ranh giới kẻ hoàn toàn bằng khai báo.
  - **Đào sâu hơn:** AWS gọi là VPC, Azure gọi là VNet — cùng một ý. Hai VPC khác nhau mặc định không thấy nhau dù nằm chung một tòa data center, hệt như hai VLAN trên cùng một switch ở Module 4. Kỹ năng chia subnet và magic number của Module 3 dùng NGUYÊN, không đổi một ly.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Đọc một VPC đang chạy: công ty khai VPC 10.0.0.0/16. (1) Subnet 10.0.1.0/24 đặt tên "public" — chứa máy chủ web cần nhìn ra Internet. (2) Subnet 10.0.2.0/24 đặt tên "private" — chứa cơ sở dữ liệu, không lối ra ngoài. (3) Toàn bộ là địa chỉ riêng lớp 10.x — đúng bảng private của Module 3. Để ý: bạn vừa đọc hiểu một mạng cloud bằng kiến thức subnet cũ, không cần học phép chia nào mới.
- **Đề:** VPC giống NHẤT với thứ gì bạn đã học ở on-prem?
  - **Dạng:** trắc nghiệm · **VLAN + dải subnet riêng — một vùng cô lập, nhưng kẻ bằng khai báo thay vì dây và switch** ✓ / Một sợi cáp quang rất dài / Một bản ghi DNS đặc biệt
  - **Chủ đề gợi ý (tầng 1):** bức tường ngăn xóm của Module 4
  - **Gợi ý (tầng 2):** Thứ gì ở Module 4 tạo ra một vùng mạng cô lập trên hạ tầng dùng chung?
  - **Lời giải (tầng 3):** VLAN + subnet: cùng là vùng cô lập có dải địa chỉ riêng — VPC chỉ đổi cách dựng ranh giới từ thiết bị sang khai báo.
- **Đề:** Vùng mạng riêng bạn kẻ ra trong data center của nhà cung cấp gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** vpc | vnet | virtual private cloud | virtual network
  - **Chủ đề gợi ý (tầng 1):** ba chữ cái, chữ giữa là private
  - **Gợi ý (tầng 2):** Virtual Private Cloud — bên Azure gọi là VNet.
  - **Lời giải (tầng 3):** VPC (Azure: VNet) — mạng riêng ảo trong data center của nhà cung cấp, chia subnet y như mạng nhà.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: kỹ năng nào của Module 3 được dùng NGUYÊN khi kẻ subnet trong VPC?
  - **Dạng:** gõ tay · **Chấp nhận:** chia subnet | subnet | subnetting | cidr | magic number
  - **Chủ đề gợi ý (tầng 1):** thứ bạn từng luyện bằng drill mỗi ngày
  - **Gợi ý (tầng 2):** Chính là thứ có chế độ luyện riêng với đồng hồ bấm giờ.
  - **Lời giải (tầng 3):** Chia subnet / CIDR — 10.0.0.0/16 cắt thành các /24 đúng bằng magic number của Module 3, không có phép chia mới nào.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao đã học VLAN và subnet thì học VPC nhanh hơn hẳn?
  - **Nhóm ý cần chạm:** [giống, giong, tương ứng, tuong ung, móc vào, moc vao, cái cũ, cai cu, đã học, da hoc] · [khai báo, khai bao, phần mềm, phan mem, không dây, khong day, cô lập, co lap]
  - **Trả lời mẫu:** Vì VPC là cùng một Ý TƯỞNG với VLAN + subnet: vùng cô lập có dải địa chỉ riêng. Cái mới chỉ là ranh giới kẻ bằng khai báo thay vì dây và switch — não móc cái mới vào cái cũ nên nhớ nhanh hơn học từ số không.

**6 · Tổng kết:**
- Đám mây = data center của người khác; thiết bị thành phần mềm khai báo.
- VPC/VNet ↔ VLAN + subnet: cùng là vùng cô lập có dải địa chỉ riêng.
- Kỹ năng CIDR của Module 3 dùng nguyên trên mây, không đổi một ly.
- *Úp mở bài sau:* Ở nhà, MỘT tường lửa đứng ở cổng che cả mạng. Trên mây, mỗi máy ảo lại có một người gác của riêng nó — vì sao phải cầu kỳ vậy?

### Bài: Đặt người gác sát từng máy `m10-bai-2`

**1 · Khởi động (hook):** Ở mạng nhà, một tường lửa đứng ở cổng là che được cả nhà (Module 7). Trên mây, người ta không làm vậy: MỖI máy ảo mang một người gác của riêng nó. Cầu kỳ thế để làm gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: security group trên mây mặc định xử lý lưu lượng ĐI VÀO máy ảo thế nào?
  - **Dạng:** trắc nghiệm · **Chặn hết — bạn phải tự mở từng luật cho thứ mình cần** ✓ / Cho hết vào, chặn dần về sau / Chỉ chặn ban đêm
  - **Vì sao:** Mặc định của security group là ĐÓNG: chưa khai luật nào thì không ai vào được. Muốn mở port 443 cho web? Tự tay thêm một dòng. An toàn nằm ở chỗ quên thì ĐÓNG chứ không phải quên thì mở.

**3 · Khám phá (teach):**
- *[m10-security-group]* SO SÁNH SONG SONG — tường lửa nhà (đã học) ↔ security group (mới): GIỐNG nhau ở chỗ cùng là stateful — nhớ kết nối đang mở, thư trả lời tự được vào (Module 7). KHÁC ở vị trí đứng: tường lửa nhà đứng ở MỘT cái cổng che cả mạng; security group bám SÁT TỪNG máy ảo, mỗi máy một bộ luật riêng, và mặc định chặn hết chiều vào.
  - **Đào sâu hơn:** Vì sao phải bám từng máy? Vì trên mây không có "bên trong" đáng tin: hai máy ảo nằm cùng VPC vẫn phải qua security group của nhau mới nói chuyện được. Kẻ xấu chiếm một máy không có nghĩa là được tự do đi ngang — bạn sẽ gặp lại ý này ở bài Zero Trust, nó chính là mầm mống của cả triết lý đó.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Điền vào chỗ khác biệt: tường lửa nhà đứng ở một cổng vành đai, còn security group…
  - **Dạng:** trắc nghiệm · **…bám sát từng máy ảo — mỗi máy một bộ luật riêng** ✓ / …đứng ở cổng data center của nhà cung cấp / …chỉ hoạt động khi máy tắt
  - **Chủ đề gợi ý (tầng 1):** vị trí đứng của người gác
  - **Gợi ý (tầng 2):** Nhìn lại hình so sánh: bên trái một người gác ở cổng, bên phải thì sao?
  - **Lời giải (tầng 3):** Bám sát từng máy ảo: mỗi máy một security group, hai máy chung VPC vẫn phải qua luật của nhau.
- **Đề:** Security group giống tường lửa Module 7 ở tính chất nào — nhớ các kết nối đang mở? (tính từ tiếng Anh)
  - **Dạng:** gõ tay · **Chấp nhận:** stateful
  - **Chủ đề gợi ý (tầng 1):** tính từ đã học ở bài người gác cửa nhớ mặt
  - **Gợi ý (tầng 2):** Ghép "state" với đuôi "-ful" — đúng chữ của Module 7.
  - **Lời giải (tầng 3):** Stateful — cùng cơ chế nhớ kết nối: bạn mở lời thì thư trả lời tự được vào, không cần khai luật chiều về.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: security group chưa khai luật nào thì lưu lượng đi vào máy ảo ra sao?
  - **Dạng:** gõ tay · **Chấp nhận:** chặn hết | chan het | bị chặn | bi chan | chặn | chan | deny | đóng | dong
  - **Chủ đề gợi ý (tầng 1):** mặc định đóng hay mở
  - **Gợi ý (tầng 2):** An toàn kiểu mây: quên khai thì mọi thứ ở trạng thái nào?
  - **Lời giải (tầng 3):** Chặn hết — mặc định đóng; muốn gì phải tự mở từng luật. Quên là đóng, không phải quên là hở.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao trên mây người ta đặt người gác sát từng máy thay vì một người gác ở cổng?
  - **Nhóm ý cần chạm:** [bên trong, ben trong, đi ngang, di ngang, chiếm một máy, chiem mot may, tin nhau] · [từng máy, tung may, riêng, rieng, mỗi máy, moi may, sát máy, sat may]
  - **Trả lời mẫu:** Vì trên mây không có "bên trong" đáng tin: một cổng vành đai mà thủng thì kẻ xấu đi ngang tự do. Gác sát từng máy thì chiếm được một máy cũng chỉ dừng ở đó — mỗi bước đi tiếp lại vấp một bộ luật khác.

**6 · Tổng kết:**
- Security group ↔ tường lửa nhà: cùng stateful, thư trả lời tự vào.
- Khác chỗ đứng: không ở cổng vành đai mà bám sát từng máy ảo.
- Mặc định chặn hết chiều vào — quên là đóng, không phải quên là hở.
- *Úp mở bài sau:* VPC ở trên mây, văn phòng ở dưới đất — hai mạng hai thế giới. Kế toán ngồi văn phòng muốn đọc máy chủ trên mây như máy trong nhà thì nối bằng gì?

### Bài: Bắc cầu và đào hầm về văn phòng `m10-bai-3`

**1 · Khởi động (hook):** Văn phòng có mạng riêng dưới đất, công ty lại có VPC trên mây — hai thế giới cách nhau cả một Internet công cộng đầy người lạ. Làm sao nối chúng thành một mà không ai đọc trộm được?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: VPN nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Đường hầm MÃ HÓA đi xuyên qua Internet công cộng — bên ngoài chỉ thấy vỏ, không đọc được ruột** ✓ / Một đường cáp riêng phải thuê kéo tận nơi / Phần mềm đổi quốc gia để xem phim
  - **Vì sao:** VPN dựng một đường hầm mã hóa giữa hai đầu: gói tin thật được bọc trong lớp vỏ mã hóa rồi mới đi qua Internet — ai bắt được dọc đường cũng chỉ thấy chuỗi loạn xạ, như WPA làm với sóng Wi-Fi (Module 8).

**3 · Khám phá (teach):**
- *[m10-vpn-s2s]* SO SÁNH SONG SONG — cây cầu router (đã học) ↔ VPN site-to-site (mới): ở Module 4, router là cây cầu nối hai xóm trong cùng tòa nhà. Site-to-site VPN cũng là cây cầu ấy, nhưng bắc giữa HAI MẠNG cách nhau cả Internet: router văn phòng và cổng VPN của VPC bắt tay, dựng đường hầm mã hóa cố định. Từ đó hai mạng như một — máy văn phòng gọi 10.0.2.5 trên mây tự nhiên như gọi máy cùng phòng, người dùng không phải cài gì.
  - **Đào sâu hơn:** Cầu nối MẠNG với MẠNG, dựng một lần chạy cả năm — đó là dấu hiệu nhận biết site-to-site. Khi cần băng thông lớn và độ trễ ổn định hơn nữa, công ty thuê hẳn đường riêng vào data center (Direct Connect / ExpressRoute) — vẫn ý tưởng cây cầu, chỉ đổi vật liệu.
- *[m10-vpn-client]* Còn nhân viên ngồi quán cà phê thì không có router văn phòng nào bên cạnh. Họ dùng CLIENT VPN: phần mềm trên laptop tự đào một đường hầm riêng về mạng công ty — nối MỘT NGƯỜI vào mạng, chứ không phải mạng vào mạng. Wi-Fi quán có xấu bụng cỡ nào cũng chỉ thấy vỏ hầm, vì lớp mã hóa là của riêng bạn — đúng bài học mạng lạ của Module 8.
  - **Đào sâu hơn:** Cách phân biệt không bao giờ lẫn: đếm xem đường hầm nối GÌ với GÌ. Mạng ↔ mạng, dựng sẵn, người dùng vô cảm = site-to-site. Người ↔ mạng, bật khi cần, phải cài phần mềm = client. Một công ty thường dùng cả hai cùng lúc.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Chi nhánh Đà Nẵng cần thấy VPC trên mây mọi lúc, 40 nhân viên trong đó không ai phải cài gì. Chọn kiểu nào?
  - **Dạng:** trắc nghiệm · **Site-to-site — router chi nhánh bắc cầu cố định tới VPC** ✓ / Phát cho mỗi người một client VPN / Mở hết security group cho nhanh
  - **Chủ đề gợi ý (tầng 1):** đường hầm nối gì với gì
  - **Gợi ý (tầng 2):** Cả một MẠNG cần nối, và người dùng phải vô cảm — đó là dấu hiệu của kiểu nào?
  - **Lời giải (tầng 3):** Site-to-site: cầu mạng-nối-mạng dựng một lần, mọi máy trong chi nhánh tự nhiên thấy VPC, không ai phải cài gì.
- **Đề:** Điền chỗ trống: site-to-site nối mạng với mạng, còn ___ VPN nối một người với mạng.
  - **Dạng:** gõ tay · **Chấp nhận:** client
  - **Chủ đề gợi ý (tầng 1):** phần mềm cài trên laptop
  - **Gợi ý (tầng 2):** Chữ tiếng Anh chỉ máy của người dùng cuối.
  - **Lời giải (tầng 3):** Client VPN — laptop tự đào hầm riêng về mạng công ty, bật khi cần.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: kiểu VPN nào nối trọn HAI MẠNG thành một qua Internet, người dùng không phải cài gì?
  - **Dạng:** gõ tay · **Chấp nhận:** site-to-site | site to site | s2s
  - **Chủ đề gợi ý (tầng 1):** cây cầu của Module 4, bắc xa hơn
  - **Gợi ý (tầng 2):** Tên tiếng Anh có chữ "site" xuất hiện hai lần.
  - **Lời giải (tầng 3):** Site-to-site — hai thiết bị đầu mạng bắt tay dựng hầm cố định, hai mạng như một.
- **Đề:** Vẫn từ trí nhớ: vì sao ngồi Wi-Fi quán cà phê bật client VPN thì chủ quán không đọc trộm được dữ liệu công ty?
  - **Dạng:** trắc nghiệm · **Vì dữ liệu được bọc trong lớp mã hóa của đường hầm — quán chỉ thấy vỏ** ✓ / Vì VPN làm mạng chạy nhanh hơn / Vì quán không có tường lửa
  - **Chủ đề gợi ý (tầng 1):** ai giữ chìa của lớp khóa
  - **Gợi ý (tầng 2):** Giống HTTPS và WPA: nội dung bị khóa trước khi rời máy bạn.
  - **Lời giải (tầng 3):** Lớp mã hóa của hầm là của riêng bạn và công ty — mạng quán chỉ chuyển hộ cái vỏ, không mở được ruột.
- **Tự giải thích:** Giải thích bằng lời của bạn: làm sao phân biệt site-to-site với client VPN mà không bao giờ lẫn?
  - **Nhóm ý cần chạm:** [mạng với mạng, mang voi mang, hai mạng, hai mang, cố định, co dinh, dựng sẵn, dung san] · [một người, mot nguoi, laptop, cài, cai phan mem, khi cần, khi can]
  - **Trả lời mẫu:** Đếm xem hầm nối gì với gì: nối mạng với mạng, dựng sẵn chạy quanh năm, người dùng không cài gì — là site-to-site; nối một người với mạng, phải cài phần mềm và bật khi cần — là client VPN.

**6 · Tổng kết:**
- VPN = đường hầm mã hóa xuyên Internet — ngoài thấy vỏ, không đọc được ruột.
- Site-to-site ↔ cây cầu router: mạng nối mạng, cố định, người dùng vô cảm.
- Client VPN: một người nối vào mạng, cài phần mềm, bật khi cần.
- *Úp mở bài sau:* Cầu với hầm đều dẫn về một giả định cũ: "vào được bên trong là người nhà". Bài sau chính giả định đó bị đập bỏ — và cả cách phòng thủ mạng thay đổi theo.

### Bài: Đập bỏ tường thành, kiểm từng cánh cửa `m10-bai-4`

**1 · Khởi động (hook):** Mô hình cũ: vượt qua tường lửa là thành "người nhà", muốn đi đâu thì đi. Một kẻ trộm lọt vào là khoắng cả kho. Zero Trust tuyên bố một câu nghe rất lạnh lùng: không ai là người nhà cả. Vì sao ngành bảo mật lại đi đến nước đó?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: nguyên tắc cốt lõi của Zero Trust là gì?
  - **Dạng:** trắc nghiệm · **Không tin ai mặc định — xác minh MỌI truy cập, dù đến từ "bên trong"** ✓ / Mua tường lửa đắt tiền hơn / Cấm nhân viên làm việc từ xa
  - **Vì sao:** Zero Trust bỏ hẳn khái niệm "bên trong an toàn": mọi truy cập đều phải chứng minh bạn là ai, máy có sạch không, có quyền với đúng thứ đó không — mỗi lần, chứ không phải một lần ở cổng.

**3 · Khám phá (teach):**
- *[m10-perimeter]* Mô hình cũ bạn đã sống trong nó suốt Phần B: LÂU ĐÀI VÀ HÀO NƯỚC. Mọi phòng thủ dồn ở vành đai — tường lửa đứng ở cổng (Module 7), NAT che bên trong, ai vượt qua được là "người nhà", đi ngang tự do. Nó chạy tốt khi mọi thứ đáng giá đều nằm trong một tòa nhà và nhân viên ngồi cả trong đó.
  - **Đào sâu hơn:** Điểm chết của lâu đài nằm ở chính chữ "trong": chỉ cần MỘT lần lọt — một email lừa, một mật khẩu lộ, một laptop nhiễm mang từ nhà vào — kẻ tấn công thành người nhà và di chuyển ngang (lateral movement) tới kho quý nhất. Các vụ rò rỉ lớn nhất thập kỷ đều đi đúng kịch bản đó.
- *[m10-zero-trust]* SO SÁNH SONG SONG — lâu đài (cũ) ↔ Zero Trust (mới): ngày nay dữ liệu ở trên mây, nhân viên ở quán cà phê — vành đai nào bao cho xuể? Zero Trust trả lời: bỏ tường thành, đặt trạm kiểm ở TỪNG cánh cửa. Không tin ai mặc định; mọi truy cập đều xác minh: bạn LÀ AI, máy có sạch không, có quyền với đúng thứ này không. Biên giới mới của mạng không còn là tường lửa — mà là DANH TÍNH.
  - **Đào sâu hơn:** Bạn đã gặp tinh thần này hai lần mà chưa gọi tên: security group bám từng máy (bài 2) là Zero Trust cho máy chủ; văn phòng hiện đại bỏ VPN, cho ứng dụng tự kiểm danh tính từng lượt, là Zero Trust cho con người. "Verify, then trust — every time" thay cho "trust the inside".

**4 · Thử tay (practice, fading 2):**
- **Đề:** Kẻ tấn công lừa được MỘT nhân viên và chiếm laptop của họ. Ở mô hình lâu đài, chuyện gì xảy ra tiếp?
  - **Dạng:** trắc nghiệm · **Hắn thành "người nhà", di chuyển ngang tự do tới các máy khác — vành đai không cản nữa** ✓ / Không sao, tường lửa vành đai sẽ chặn hắn lại / Máy tự khóa vì phát hiện người lạ
  - **Chủ đề gợi ý (tầng 1):** vành đai kiểm ở đâu, và sau đó thì sao
  - **Gợi ý (tầng 2):** Lâu đài chỉ kiểm MỘT lần ở cổng — mà hắn thì đã ở trong cổng rồi.
  - **Lời giải (tầng 3):** Di chuyển ngang tự do: vành đai chỉ kiểm ở cổng, bên trong tin nhau — đó chính là điểm chết khiến Zero Trust ra đời.
- **Đề:** Trong Zero Trust, biên giới mới của mạng là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** danh tính | danh tinh | identity
  - **Chủ đề gợi ý (tầng 1):** câu hỏi đổi từ "bạn đứng đâu" sang…
  - **Gợi ý (tầng 2):** Không còn là chỗ đứng hay tường lửa — mà là câu hỏi "bạn LÀ AI".
  - **Lời giải (tầng 3):** Danh tính (identity) — mọi quyết định cho/chặn xoay quanh bạn là ai và máy bạn có sạch không, không phải bạn đang đứng trong hay ngoài.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: Zero Trust đòi làm gì với MỌI truy cập, kể cả từ "bên trong"?
  - **Dạng:** gõ tay · **Chấp nhận:** xác minh | xac minh | verify | kiểm tra | kiem tra | chứng minh | chung minh
  - **Chủ đề gợi ý (tầng 1):** một động từ, làm mỗi lần chứ không phải một lần ở cổng
  - **Gợi ý (tầng 2):** Trạm kiểm ở từng cánh cửa làm gì với từng người tới?
  - **Lời giải (tầng 3):** Xác minh — mỗi truy cập, mỗi lần: bạn là ai, máy có sạch không, có quyền với đúng thứ này không.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao mô hình lâu đài hết thời khi công ty lên mây và nhân viên làm việc từ xa?
  - **Nhóm ý cần chạm:** [bên trong, ben trong, vành đai, vanh dai, tường, tuong thanh, bao, cổng, cong] · [mây, may, từ xa, tu xa, quán, quan ca phe, khắp nơi, khap noi, danh tính, danh tinh]
  - **Trả lời mẫu:** Lâu đài chỉ có nghĩa khi mọi thứ quý nằm gọn trong một vành đai. Giờ dữ liệu ở trên mây, người làm ở quán cà phê — chẳng còn "bên trong" nào để bao. Nên phòng thủ chuyển sang xác minh từng truy cập theo danh tính, thay vì tin theo chỗ đứng.

**6 · Tổng kết:**
- Lâu đài–hào nước: kiểm một lần ở cổng, bên trong tin nhau — lọt một lần là đi ngang tự do.
- Zero Trust: không tin ai mặc định, xác minh mọi truy cập, mọi lần.
- Biên giới mới là danh tính — bạn là ai, không phải bạn đứng đâu.
- *Úp mở bài sau:* Danh tính là biên giới — vậy ai đang GIỮ danh tính? Ở văn phòng là AD DS của Module 9; trên mây lại có một cuốn sổ khác. Hai cuốn sổ, một con người — gỡ thế nào?

### Bài: Gộp hai cuốn sổ danh tính làm một `m10-bai-5`

**1 · Khởi động (hook):** Công ty có AD DS giữ sổ nhân sự cho mọi máy trong văn phòng (Module 9), rồi lại dùng cả chục ứng dụng trên mây. Chẳng lẽ mỗi người hai bộ tài khoản, hai mật khẩu — và quên gấp đôi?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử nhé: cách gọn nhất để một người dùng được cả hệ trong nhà lẫn ứng dụng trên mây là gì?
  - **Dạng:** trắc nghiệm · **Đồng bộ sổ danh tính trong nhà với sổ trên mây — một danh tính dùng cả hai thế giới** ✓ / Mỗi người tự nhớ hai bộ tài khoản / Bỏ hẳn AD, ai thích đặt mật khẩu gì thì đặt
  - **Vì sao:** Đó là mô hình hybrid: sổ AD trong nhà đồng bộ với sổ trên mây (Entra ID) — một con người, một danh tính, đăng nhập được cả hai thế giới.

**3 · Khám phá (teach):**
- *[m10-entra-hybrid]* SO SÁNH SONG SONG — AD DS (đã học) ↔ Entra ID (mới): AD DS là sổ cái TRONG NHÀ — xác thực cho máy join miền, GPO, thư mục nội bộ. Entra ID là sổ cái TRÊN MÂY — xác thực cho ứng dụng web: Microsoft 365, và hàng nghìn dịch vụ khác. HYBRID là cầu đồng bộ giữa hai sổ: tài khoản tạo trong AD tự chảy lên Entra — một con người, MỘT danh tính, đăng nhập cả hai thế giới.
  - **Đào sâu hơn:** Đây chính là hạ tầng của Zero Trust bài trước: khi mọi truy cập đều phải xác minh danh tính, cuốn sổ danh tính thành trái tim của cả hệ thống — nên nó phải là MỘT cuốn (đồng bộ), và đăng nhập được bồi thêm lớp xác nhận qua điện thoại (MFA). Chiếm được mật khẩu mà không có máy điện thoại thì vẫn đứng ngoài.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Yêu cầu suông: nhân viên mới cần vào được máy văn phòng LẪN Microsoft 365, chỉ một tài khoản. Công ty đang chạy AD DS + Entra ID hybrid — bạn làm gì?
  - **Dạng:** trắc nghiệm · **Tạo user trong AD (đúng OU của phòng ban) — đồng bộ tự đẩy lên Entra, một tài khoản dùng cả hai** ✓ / Tạo hai tài khoản riêng ở hai nơi / Đưa tài khoản chung của phòng cho dùng tạm
  - **Chủ đề gợi ý (tầng 1):** sổ nào là gốc, sổ nào là bản đồng bộ
  - **Gợi ý (tầng 2):** Trong mô hình hybrid, tài khoản sinh ở sổ trong nhà rồi tự chảy lên mây — bạn chỉ phải làm đúng một việc của Module 9.
  - **Lời giải (tầng 3):** Tạo user trong AD, đặt vào đúng OU (kỹ năng Module 9) — cầu đồng bộ tự đưa danh tính lên Entra ID, một tài khoản đăng nhập cả hai thế giới.
- **Đề:** Sổ danh tính TRÊN MÂY của Microsoft, anh em đồng bộ với AD DS, tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** entra | entra id | azure ad | azure active directory
  - **Chủ đề gợi ý (tầng 1):** tên mới của Azure AD
  - **Gợi ý (tầng 2):** Tên hiện nay bắt đầu bằng E — tên cũ là Azure AD.
  - **Lời giải (tầng 3):** Entra ID (tên cũ: Azure AD) — sổ danh tính trên mây, xác thực cho ứng dụng web.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: mô hình đồng bộ sổ AD trong nhà với sổ trên mây, cho một danh tính dùng cả hai thế giới, gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** hybrid | lai | hybrid identity | entra hybrid
  - **Chủ đề gợi ý (tầng 1):** từ tiếng Anh nghĩa là "lai" giữa hai thế giới
  - **Gợi ý (tầng 2):** Một từ tiếng Anh, chỉ xe vừa chạy xăng vừa chạy điện cũng dùng từ này.
  - **Lời giải (tầng 3):** Hybrid — AD DS trong nhà đồng bộ với Entra ID trên mây; tài khoản sinh một nơi, dùng mọi nơi.
- **Đề:** Vẫn từ trí nhớ: vì sao trong thế giới Zero Trust, cuốn sổ danh tính thành thứ phải bảo vệ nhất?
  - **Dạng:** trắc nghiệm · **Vì mọi quyết định cho/chặn đều dựa vào danh tính — chiếm được sổ là chiếm được biên giới** ✓ / Vì nó chứa nhiều dung lượng nhất / Vì nó thay thế được tường lửa hoàn toàn
  - **Chủ đề gợi ý (tầng 1):** biên giới mới nằm ở đâu thì kho quý nằm ở đó
  - **Gợi ý (tầng 2):** Bài 4 nói biên giới mới là gì? Vậy thứ GIỮ biên giới đó quan trọng cỡ nào?
  - **Lời giải (tầng 3):** Danh tính là biên giới mới, nên sổ danh tính là cánh cổng của mọi thứ — vì thế mới cần MFA bồi thêm sau mật khẩu.
- **Tự giải thích:** Giải thích bằng lời của bạn: Entra ID hybrid giải quyết nỗi khổ nào của người dùng lẫn người quản trị?
  - **Nhóm ý cần chạm:** [hai tài khoản, hai tai khoan, hai mật khẩu, hai mat khau, một danh tính, mot danh tinh, một tài khoản, mot tai khoan] · [đồng bộ, dong bo, tạo một nơi, tao mot noi, quản một chỗ, quan mot cho, thu hồi, thu hoi]
  - **Trả lời mẫu:** Người dùng khỏi nhớ hai bộ mật khẩu — một danh tính đăng nhập cả văn phòng lẫn mây. Người quản trị tạo và thu hồi tài khoản ở đúng MỘT chỗ (AD, như Module 9 đã học), đồng bộ lo phần còn lại — nghỉ việc là khóa được cả hai thế giới trong một thao tác.

**6 · Tổng kết:**
- AD DS giữ sổ trong nhà; Entra ID giữ sổ trên mây; hybrid đồng bộ hai sổ làm một.
- Một danh tính cho cả hai thế giới — tạo và thu hồi ở đúng một chỗ.
- Danh tính là biên giới mới nên sổ danh tính là thứ phải bảo vệ nhất — MFA bồi thêm.
- *Úp mở bài sau:* Bạn đã có đủ đồ nghề của người đi làm: từ sợi dây đồng tới đám mây. Phía trước là Phòng khám mạng — nơi các bệnh nhân là những mạng hỏng thật sự chờ bạn chẩn đoán.

### Khái niệm & flashcard (8)

- **Cloud** `m10-cloud` — Data center của nhà cung cấp — thiết bị thành phần mềm tự khai báo
  - Ẩn dụ: Thuê một góc nhà kho khổng lồ của người khác, kê đồ bằng cách điền phiếu.
  - Thẻ ôn: *"Đám mây" thực chất là gì, và điểm khác căn bản với phòng máy chủ ở nhà?* → Data center của nhà cung cấp, thuê qua Internet. Khác căn bản: mọi thứ từng là thiết bị (switch, router, tường lửa) thành phần mềm khai báo, có trong vài giây, trả theo lượng dùng.
- **VPC / VNet** `m10-vpc` — Mạng riêng kẻ trong data center của nhà cung cấp — VLAN + subnet phiên bản khai báo
  - Ẩn dụ: Một khoảnh đất riêng có rào, kẻ trong trang trại của người khác.
  - Thẻ ôn: *VPC tương ứng với thứ gì đã học ở on-prem — giống và khác chỗ nào?* → ↔ VLAN + dải subnet riêng. Giống: vùng cô lập, dải địa chỉ riêng, chia bằng CIDR. Khác: không dây không switch — ranh giới kẻ hoàn toàn bằng khai báo.
- **Security group** `m10-security-group` — Tường lửa stateful bám sát từng máy ảo, mặc định chặn chiều vào
  - Ẩn dụ: Mỗi máy một vệ sĩ riêng kè kè bên cạnh, thay vì một bảo vệ chung ở cổng khu phố.
  - Thẻ ôn: *Security group giống và khác tường lửa nhà (Module 7) thế nào?* → Giống: stateful — nhớ kết nối, thư trả lời tự vào. Khác: bám sát TỪNG máy ảo thay vì đứng một cổng vành đai, và mặc định chặn hết chiều vào.
- **VPN site-to-site** `m10-vpn-s2s` — Đường hầm mã hóa cố định nối trọn hai mạng qua Internet
  - Ẩn dụ: Cây cầu router của Module 4, bắc xuyên qua quảng trường đông người, có mái che kín.
  - Thẻ ôn: *Dấu hiệu nhận biết VPN site-to-site?* → Nối MẠNG với MẠNG: hai thiết bị đầu mạng dựng hầm cố định chạy quanh năm, mọi máy hai bên thấy nhau, người dùng không phải cài gì.
- **Client VPN** `m10-vpn-client` — Đường hầm mã hóa nối MỘT người vào mạng công ty
  - Ẩn dụ: Ống kín riêng của một người, đào từ bàn quán cà phê về tới văn phòng.
  - Thẻ ôn: *Client VPN khác site-to-site chỗ nào?* → Nối NGƯỜI với mạng: cài phần mềm trên laptop, bật khi cần. Site-to-site nối mạng với mạng, cố định, người dùng vô cảm.
- **Mô hình vành đai** `m10-perimeter` — Lâu đài–hào nước: phòng thủ dồn ở cổng, bên trong tin nhau
  - Ẩn dụ: Lâu đài có hào sâu và một cổng đá — nhưng vượt được cổng thì mọi cánh cửa bên trong đều mở.
  - Thẻ ôn: *Điểm chết của mô hình vành đai (lâu đài–hào nước)?* → Chỉ kiểm MỘT lần ở cổng, bên trong tin nhau — kẻ tấn công lọt một lần là di chuyển ngang tự do tới kho quý nhất.
- **Zero Trust** `m10-zero-trust` — Không tin ai mặc định — xác minh mọi truy cập; danh tính là biên giới mới
  - Ẩn dụ: Bỏ tường thành, đặt trạm kiểm ở từng cánh cửa — ai tới cũng phải trình mặt, mỗi lần.
  - Thẻ ôn: *Zero Trust thay đổi câu hỏi phòng thủ từ gì sang gì?* → Từ "bạn đứng trong hay ngoài?" sang "bạn LÀ AI, máy có sạch không, có quyền với đúng thứ này không?" — xác minh mọi truy cập, mọi lần; danh tính là biên giới mới.
- **Entra ID hybrid** `m10-entra-hybrid` — Sổ danh tính trên mây đồng bộ với AD DS — một danh tính cho hai thế giới
  - Ẩn dụ: Sổ cái của trưởng làng có bản sao trên mây, hai sổ tự chép cho nhau từng dòng.
  - Thẻ ôn: *Entra ID hybrid là gì, giải quyết chuyện gì?* → Cầu đồng bộ giữa AD DS (sổ trong nhà) và Entra ID (sổ trên mây): tài khoản tạo một nơi dùng cả hai thế giới, thu hồi một thao tác khóa được cả hai.

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Vùng mạng riêng bạn kẻ ra trong data center của nhà cung cấp gọi là gì? (viết tắt được)
  - **Dạng:** gõ tay · **Chấp nhận:** vpc | vnet | virtual private cloud
  - **Vì sao:** VPC (Azure: VNet) — phiên bản khai báo của VLAN + dải subnet riêng; chia subnet bằng đúng CIDR của Module 3.
- **Đề:** VPC tương ứng với cặp khái niệm on-prem nào bạn đã học?
  - **Dạng:** trắc nghiệm · **VLAN + subnet riêng — vùng cô lập có dải riêng** ✓ / Bảng MAC + ARP — cách switch nhớ máy nào ở cổng nào / DHCP + DNS — cấp địa chỉ và phân giải tên trong mạng
  - **Vì sao:** Cùng một ý tưởng cô lập vùng mạng — VPC chỉ đổi cách dựng ranh giới từ dây và switch sang khai báo.
- **Đề:** Security group khác tường lửa nhà (Module 7) ở điểm nào?
  - **Dạng:** trắc nghiệm · **Bám sát từng máy ảo, mặc định chặn hết chiều vào** ✓ / Không nhớ được kết nối, phải khai luật cả hai chiều / Chỉ lọc được theo địa chỉ IP, không theo port
  - **Vì sao:** Cùng là stateful, nhưng chỗ đứng khác hẳn: mỗi máy một bộ luật riêng — hai máy chung VPC vẫn phải qua luật của nhau.
- **Đề:** Nối trọn hai mạng (văn phòng ↔ VPC) qua Internet, người dùng không phải cài gì — kiểu VPN nào?
  - **Dạng:** gõ tay · **Chấp nhận:** site-to-site | site to site | s2s
  - **Vì sao:** Site-to-site: hai thiết bị đầu mạng dựng đường hầm mã hóa cố định — cây cầu router của Module 4 bắc xuyên Internet.
- **Đề:** Laptop ở quán cà phê muốn chui vào mạng công ty — kiểu VPN nào?
  - **Dạng:** gõ tay · **Chấp nhận:** client | client vpn | vpn client
  - **Vì sao:** Client VPN — nối MỘT người vào mạng: cài phần mềm, bật khi cần, lớp mã hóa riêng bất chấp Wi-Fi quán.
- **Đề:** Điểm chết của mô hình vành đai (lâu đài–hào nước) là gì?
  - **Dạng:** trắc nghiệm · **Kiểm một lần ở cổng, lọt vào là đi ngang tự do** ✓ / Tường lửa vành đai không lọc được lưu lượng mã hóa / Chỉ áp dụng được cho mạng dùng IPv4 đời cũ
  - **Vì sao:** Chữ "trong" chính là điểm chết: một email lừa hay một mật khẩu lộ biến kẻ tấn công thành "người nhà".
- **Đề:** Trong Zero Trust, biên giới mới của mạng là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** danh tính | danh tinh | identity
  - **Vì sao:** Danh tính — mọi quyết định cho/chặn dựa trên bạn là ai và máy có sạch không, thay vì bạn đứng trong hay ngoài tường lửa.
- **Đề:** Entra ID hybrid nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Đồng bộ sổ AD DS trong nhà với sổ Entra ID trên mây** ✓ / Thay Domain Controller trong nhà bằng máy chủ trên mây / Một loại VPN nối văn phòng với đám mây Microsoft
  - **Vì sao:** Tài khoản tạo trong AD (đúng kỹ năng Module 9) tự chảy lên Entra ID — người dùng một mật khẩu, quản trị một chỗ tạo và thu hồi.
- **Đề:** Trong cloud, việc tương ứng với "mua thêm switch cắm vào tủ rack" là gì?
  - **Dạng:** trắc nghiệm · **Khai thêm một mạng con trong VPC bằng vài dòng cấu hình** ✓ / Gọi điện cho nhà cung cấp để họ lắp thêm thiết bị thật cho bạn / Thuê thêm một máy ảo rồi cài phần mềm switch lên máy đó
  - **Chủ đề gợi ý (tầng 1):** thiết bị trong cloud thành dòng khai báo
  - **Vì sao:** Trong cloud, thiết bị thành cấu hình: mạng con, tường lửa, tuyến đường đều là dòng khai báo. Khái niệm thì không đổi — vẫn là mạng con, vẫn là tường lửa.
- **Đề:** Bạn dựng máy ảo mới trong VPC rồi cài web server, nhưng từ Internet không ai vào được. Nghi ngờ đầu tiên?
  - **Dạng:** trắc nghiệm · **Security group vẫn chặn chiều vào — chưa mở port cho ai** ✓ / Máy ảo chưa được cấp địa chỉ IP nội bộ trong mạng con đó / VPC chưa bật chế độ cho phép chạy web server ở bên trong
  - **Chủ đề gợi ý (tầng 1):** mặc định của security group
  - **Vì sao:** Security group mặc định chặn hết chiều vào — đúng nếp Zero Trust: không mở sẵn thứ gì. Đây là ca thường gặp nhất của người mới dựng máy ảo.
- **Đề:** Chi nhánh 30 người cần dùng ứng dụng nội bộ chạy trong VPC, không muốn ai phải bật phần mềm gì. Chọn cách nào?
  - **Dạng:** trắc nghiệm · **VPN site-to-site nối trọn mạng chi nhánh với VPC** ✓ / Client VPN, cài lên từng máy trong ba mươi máy đó / Mở port ứng dụng ra Internet rồi đặt mật khẩu thật dài
  - **Chủ đề gợi ý (tầng 1):** hai kiểu VPN dùng vào việc gì
  - **Vì sao:** Nối trọn hai mạng thì đường hầm dựng một lần ở hai đầu, người dùng không biết nó tồn tại. Client VPN là đường cho từng người đi lẻ.
- **Đề:** Nhân viên đã đăng nhập tài khoản công ty và đang ngồi trong văn phòng. Theo Zero Trust, họ mở được kho dữ liệu kế toán chưa?
  - **Dạng:** trắc nghiệm · **Chưa — mỗi lần truy cập vẫn phải xác minh danh tính và quyền** ✓ / Rồi — ngồi trong mạng nội bộ nghĩa là đã qua vòng kiểm tra rồi / Rồi — miễn là máy của họ đã gia nhập miền của công ty
  - **Chủ đề gợi ý (tầng 1):** Zero Trust xác minh từng lượt truy cập
  - **Vì sao:** Vị trí không còn là bằng chứng. Zero Trust hỏi lại ở mỗi lượt truy cập: ai, máy nào, quyền gì — ngồi trong văn phòng cũng không được miễn.

## Phòng khám mạng — chẩn đoán sự cố `module-11`

Phần C · 5 chặng · 5 bài · 6 khái niệm

**Chặng:** Ca trực đầu tiên (m11-bai-1) → Lần theo đường đi (m11-bai-2) → Tên và số (m11-bai-3) → Bệnh chập chờn (m11-bai-4) → Manh mối tại chỗ (m11-bai-5)

### Bài: Nhận ca trực: máy không in được `m11-bai-1`

**1 · Khởi động (hook):** Điện thoại phòng IT reo: "Máy chị tự nhiên không in được nữa!". Trên tay bạn chỉ có một cửa sổ terminal, không được nhìn sơ đồ mạng. Bắt đầu từ đâu để không phải đoán mò?

**2 · Đoán thử (pretest):**
- **Đề:** Bệnh nhân đầu tiên của bạn đây: chị kế toán tầng 2 than không in được sang MAY-IN-TANG-2 (192.168.20.21). Chưa ai dạy bạn phương pháp nào cả — cứ gõ lệnh mà khám, sai không mất gì. Đoán bệnh rồi thử chữa xem.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-KE-TOAN [192.168.20.10/24] · MAY-IN-TANG-2 [192.168.20.21/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1] — dây: MAY-IN-TANG-2·eth0 — SW-TANG-2·p2
    - **Ngồi ở máy:** MAY-KE-TOAN
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** MAY-KE-TOAN ping 192.168.20.21 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Dây mạng của chính máy bạn đang ngồi bị tuột** ✓ · Máy in đặt sai địa chỉ IP · DNS nội bộ ngừng chạy
    - **Sửa:** trực tiếp trên sơ đồ — mục tiêu:
      - c1a-ke-toan PHẢI gọi được c1a-may-in
    - **Được phép:** cắm dây
    - **Lời giải mẫu:** MAY-KE-TOAN [192.168.20.10/24] · MAY-IN-TANG-2 [192.168.20.21/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1] — dây: MAY-IN-TANG-2·eth0 — SW-TANG-2·p2 | MAY-KE-TOAN·eth0 — SW-TANG-2·p1
  - **Chủ đề gợi ý (tầng 1):** gói tin có rời nổi máy bạn không
  - **Vì sao:** Ping đi đâu cũng ra "PING: transmit failed. General failure." — gói không rời nổi máy, nghĩa là bệnh nằm ngay tầng thấp nhất: sợi dây của chính máy mình. Cắm lại dây vào switch là mạch chạy. Đây chính là lý do buổi khám nào cũng bắt đầu từ dây cắm.

**3 · Khám phá (teach):**
- *[m11-kham-theo-tang]* Người sửa mạng lành nghề không đoán — họ khám theo tầng, từ THẤP lên CAO: dây cắm → địa chỉ IP → đường đi → dịch vụ. Như bác sĩ bắt mạch trước khi hỏi chuyện ăn uống: tầng dưới mà hỏng thì mọi tầng trên hỏng theo, nên phải loại trừ từ nền móng lên.
  - **Đào sâu hơn:** Phương pháp này gọi là bottom-up troubleshooting, bám theo đúng các tầng bạn đã học từ Module 1: tầng vật lý (dây, Module 4), tầng địa chỉ (IP/gateway, Module 3), tầng định tuyến (router, Module 4), rồi mới tới dịch vụ (DNS/web, Module 6). Phần lớn sự cố văn phòng nằm ở hai tầng thấp nhất — vì thế khám từ dưới lên thường ra bệnh rất nhanh.
- *[m11-ipconfig-ping]* Hai món đồ nghề đầu tiên: ipconfig đọc "giấy tờ tùy thân" của máy (IP, subnet mask, gateway, DNS), còn ping là cái ống nghe — gửi gói thăm dò rồi nghe ngóng. Ba câu trả lời của ping kể ba câu chuyện khác nhau: Reply là mạch sống; "General failure" là gói KHÔNG RỜI NỔI máy mình; "Destination host unreachable" là gói rời được máy nhưng gọi không ai đáp.
  - **Đào sâu hơn:** Dòng Reply còn tặng kèm một manh mối: TTL. Máy Windows xuất phát ở TTL 128, qua mỗi router bị trừ 1 (bạn đã gặp ở Module 4). Thấy TTL=126 tức là gói đã đi qua 2 router — chưa cần tracert cũng ước được quãng đường.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Ca mẫu, khám đúng bài bản: chị kế toán than "không vào được máy in". Bước 1 — ipconfig: máy có IP 192.168.20.10/24, hợp lệ, không nghi gì. Bước 2 — ping 192.168.20.21: cả bốn gói đều "General failure" — gói không rời nổi máy, vậy không cần nghi máy in hay DNS gì hết, bệnh ở ngay tầng dây của máy mình. Bước 3 — nhìn xuống gầm bàn: dây mạng tuột thật. Cắm lại, ping ra Reply. Chốt bệnh án: đứt kết nối vật lý tại máy trạm.
- **Đề:** Ca tiếp theo cùng phòng: vẫn máy chị kế toán, lần này in được rồi nhưng không chấm công được vào MAY-CHAM-CONG (192.168.20.30). Khám theo đúng trình tự vừa học nhé.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-KE-TOAN [192.168.20.10/24] · MAY-IN-TANG-2 [192.168.20.21/24] · MAY-CHAM-CONG [192.168.20.30/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: MAY-KE-TOAN·eth0 — SW-TANG-2·p1 | MAY-IN-TANG-2·eth0 — SW-TANG-2·p2
    - **Ngồi ở máy:** MAY-KE-TOAN
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** MAY-KE-TOAN ping 192.168.20.30 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Dây của MAY-CHAM-CONG bị tuột** ✓ · Dây của chính máy bạn bị tuột · Máy bạn thiếu gateway
    - **Sửa:** trực tiếp trên sơ đồ — mục tiêu:
      - c1b-ke-toan PHẢI gọi được c1b-cham-cong
    - **Được phép:** cắm dây
    - **Lời giải mẫu:** MAY-KE-TOAN [192.168.20.10/24] · MAY-IN-TANG-2 [192.168.20.21/24] · MAY-CHAM-CONG [192.168.20.30/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: MAY-KE-TOAN·eth0 — SW-TANG-2·p1 | MAY-IN-TANG-2·eth0 — SW-TANG-2·p2 | MAY-CHAM-CONG·eth0 — SW-TANG-2·p3
  - **Chủ đề gợi ý (tầng 1):** phía nào không trả lời tiếng gọi
  - **Gợi ý (tầng 2):** Ping máy in vẫn Reply — mạng phía bạn đang sống, loại ngay ca "dây mình tuột". Ping máy chấm công thì "Destination host unreachable": gói rời được máy, chỉ là lời gọi "ai giữ 192.168.20.30?" không ai đáp. Ai đang không nghe được lời gọi đó?
  - **Lời giải (tầng 3):** Bệnh nằm ở phía máy đích: MAY-CHAM-CONG bị tuột dây nên không nghe được tiếng gọi ARP. Trong pha sửa, nối cổng eth0 của nó vào cổng trống p3 của switch — ping lại là có Reply. So với ca trước: General failure là dây MÌNH, còn unreachable với mạng-mình-vẫn-sống là dây ĐÍCH.
- **Đề:** Bạn ping một máy cùng phòng và nhận "Destination host unreachable" trong khi ping các máy khác vẫn Reply. Bệnh khả năng cao nằm ở phía nào — máy mình hay máy đích?
  - **Dạng:** gõ tay · **Chấp nhận:** máy đích | phía đích | phía máy đích | ben may dich | đích
  - **Chủ đề gợi ý (tầng 1):** gói có rời được máy bạn không
  - **Gợi ý (tầng 2):** Các máy khác vẫn Reply nghĩa là dây và cấu hình phía bạn đều ổn. Vậy tiếng gọi "ai giữ địa chỉ này?" chết ở đâu?
  - **Lời giải (tầng 3):** Ở phía máy đích: mạng của bạn sống (ping máy khác vẫn Reply), nhưng máy đích không đáp lời gọi ARP — thường là nó tuột dây, tắt nguồn, hoặc tự chặn.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: khám theo tầng (bottom-up) luôn bắt đầu từ tầng nào?
  - **Dạng:** gõ tay · **Chấp nhận:** dây | dây cắm | tầng vật lý | vật lý | tầng thấp nhất
  - **Chủ đề gợi ý (tầng 1):** tầng thấp nhất của mạng
  - **Gợi ý (tầng 2):** Là thứ hữu hình nhất, nằm dưới cùng — hỏng nó thì mọi tầng trên hỏng theo.
  - **Lời giải (tầng 3):** Bắt đầu từ tầng vật lý — sợi dây. Tầng dưới hỏng kéo mọi tầng trên hỏng theo, nên loại trừ từ nền móng lên là nhanh nhất.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao nên khám từ tầng thấp lên thay vì đoán ngay "chắc do DNS" hay "chắc do web"?
  - **Nhóm ý cần chạm:** [tầng thấp, dây, vật lý, nền] · [loại trừ, khoanh vùng, thu hẹp, chắc chắn]
  - **Trả lời mẫu:** Vì tầng dưới hỏng thì mọi tầng trên hỏng theo — đoán ngay tầng cao là có thể sửa nhầm chỗ không bệnh. Khám từ dây lên giúp loại trừ từng tầng một cách chắc chắn, khoanh vùng bệnh ngày càng hẹp thay vì đoán mò.

**6 · Tổng kết:**
- Khám theo tầng từ thấp lên: dây → IP → đường đi → dịch vụ.
- ipconfig đọc giấy tờ của máy; ping bắt mạch đường truyền.
- General failure = bệnh tại máy mình; unreachable khi mạng mình sống = bệnh phía đích.
- *Úp mở bài sau:* Ca sau lạ hơn: trong nhà gọi nhau ngon lành, nhưng cứ bước ra khỏi cửa là lạc. Cánh cửa nào của mạng đang hỏng?

### Bài: Trong nhà gọi được, ra ngoài thì không `m11-bai-2`

**1 · Khởi động (hook):** Chị kế toán in được, chấm công được — nhưng không mở nổi web công ty nằm ngoài Internet. Trong nhà nói chuyện rôm rả mà ra khỏi cửa là lạc đường: bệnh này nằm ở đâu?

**2 · Đoán thử (pretest):**
- **Đề:** Bệnh nhân than: "máy chị vào máy in bình thường mà web công ty (203.0.113.1) thì chịu". Khám bằng đồ nghề bài trước xem — để ý kỹ tờ ipconfig, rồi thử ping từng chặng một.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-KE-TOAN [192.168.20.10/24, gw 192.168.20.99] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1] · RT-VAN-PHONG [lan:192.168.20.1/24, wan:203.0.113.2/30] · WEB-CONG-TY [203.0.113.1/30, gw 203.0.113.2] — dây: MAY-KE-TOAN·eth0 — SW-TANG-2·p1 | SW-TANG-2·p2 — RT-VAN-PHONG·lan | RT-VAN-PHONG·wan — WEB-CONG-TY·eth0
    - **Ngồi ở máy:** MAY-KE-TOAN
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** MAY-KE-TOAN ping 203.0.113.1 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Gateway của máy trỏ về một địa chỉ không ai giữ** ✓ · Dây mạng của máy bị tuột · Máy chủ web bên ngoài đã sập
    - **Sửa:** trực tiếp trên sơ đồ — mục tiêu:
      - c2a-ke-toan PHẢI gọi được c2a-web
    - **Được phép:** đặt địa chỉ
    - **Lời giải mẫu:** MAY-KE-TOAN [192.168.20.10/24, gw 192.168.20.1] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1] · RT-VAN-PHONG [lan:192.168.20.1/24, wan:203.0.113.2/30] · WEB-CONG-TY [203.0.113.1/30, gw 203.0.113.2] — dây: MAY-KE-TOAN·eth0 — SW-TANG-2·p1 | SW-TANG-2·p2 — RT-VAN-PHONG·lan | RT-VAN-PHONG·wan — WEB-CONG-TY·eth0
  - **Chủ đề gợi ý (tầng 1):** cánh cửa ra khỏi dải mạng của máy
  - **Vì sao:** ipconfig lộ manh mối: Default Gateway ghi 192.168.20.99. Ping thử chính 192.168.20.99 — "Destination host unreachable": không ai giữ địa chỉ đó cả! Cửa ra được trỏ về một cánh cửa ma, nên mọi chuyến đi ra ngoài dải đều chết từ bước đầu, còn trong dải thì vẫn chạy vì không cần qua gateway. Sửa gateway về 192.168.20.1 (cổng LAN của router) là thông.

**3 · Khám phá (teach):**
- *[m11-tracert]* Khi bệnh kiểu "trong được, ngoài không", nghi phạm số một là cánh cửa ra: gateway. Lệnh tracert gọi tên từng trạm trên đường đi — trạm nào còn trả lời tức là đường tới đó còn sống; trạm nào im lặng (* * *) thì chỗ nghẽn nằm ngay sau trạm cuối cùng còn lên tiếng. Bệnh chết từ chặng 1 nghĩa là gói còn chưa qua nổi gateway của chính mình.
  - **Đào sâu hơn:** Vì sao "trong dải vẫn chạy"? Nhớ Module 3: đích cùng dải thì máy gọi thẳng nhau bằng ARP, không cần gateway. Chỉ khi đích NGOÀI dải, máy mới đưa gói cho gateway — nên gateway sai/thiếu chỉ giết những chuyến đi xa. Cặp triệu chứng "trong sống, ngoài chết" gần như chỉ tay vào đúng một trường cấu hình.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Máy anh bảo vệ mới lắp: trong mạng chạy tốt, ra web công ty (203.0.113.1) thì "General failure" ngay lập tức. Điền nốt chỗ trống của quy trình: ipconfig xem giấy tờ → phát hiện thiếu gì → sửa.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-BAO-VE [192.168.20.15/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1] · RT-VAN-PHONG [lan:192.168.20.1/24, wan:203.0.113.2/30] · WEB-CONG-TY [203.0.113.1/30, gw 203.0.113.2] — dây: MAY-BAO-VE·eth0 — SW-TANG-2·p1 | SW-TANG-2·p2 — RT-VAN-PHONG·lan | RT-VAN-PHONG·wan — WEB-CONG-TY·eth0
    - **Ngồi ở máy:** MAY-BAO-VE
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** MAY-BAO-VE ping 203.0.113.1 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Máy chưa được khai gateway — không có cửa ra** ✓ · Router văn phòng bị treo · Dây từ switch lên router bị đứt
    - **Sửa:** trực tiếp trên sơ đồ — mục tiêu:
      - c2b-bao-ve PHẢI gọi được c2b-web
      - phải hết sạch: missing-gateway
    - **Được phép:** đặt địa chỉ
    - **Lời giải mẫu:** MAY-BAO-VE [192.168.20.15/24, gw 192.168.20.1] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1] · RT-VAN-PHONG [lan:192.168.20.1/24, wan:203.0.113.2/30] · WEB-CONG-TY [203.0.113.1/30, gw 203.0.113.2] — dây: MAY-BAO-VE·eth0 — SW-TANG-2·p1 | SW-TANG-2·p2 — RT-VAN-PHONG·lan | RT-VAN-PHONG·wan — WEB-CONG-TY·eth0
  - **Chủ đề gợi ý (tầng 1):** ô Default Gateway trên tờ ipconfig
  - **Gợi ý (tầng 2):** ipconfig đi: ô Default Gateway trống trơn. Không có cửa ra thì gói ngoài dải chết ngay tại máy — đúng chữ "General failure" tức thì. Còn router có treo không? Ping 192.168.20.1 thử là biết.
  - **Lời giải (tầng 3):** Máy thiếu gateway. Ping 192.168.20.1 vẫn Reply nghĩa là router sống và đường trong nhà thông — chỉ cần điền gateway 192.168.20.1 cho MAY-BAO-VE là chuyến đi xa có người dẫn đường.
- **Đề:** Tracert tới một máy ngoài Internet in được chặng 1 là 192.168.20.1 (<1ms) rồi từ chặng 2 toàn * * *. Đường đứt ở khoảng nào?
  - **Dạng:** gõ tay · **Chấp nhận:** sau gateway | sau router | sau chặng 1 | ngoài router | từ router ra ngoài | sau 192.168.20.1
  - **Chủ đề gợi ý (tầng 1):** trạm cuối cùng còn lên tiếng
  - **Gợi ý (tầng 2):** Trạm 192.168.20.1 (gateway) còn trả lời — đường tới đó sống. Chỗ nghẽn nằm ngay sau trạm cuối cùng còn lên tiếng.
  - **Lời giải (tầng 3):** Đứt ở đoạn SAU gateway: từ máy tới router văn phòng còn sống (chặng 1 trả lời), nhưng từ router ra ngoài thì im lặng — nghi đường lên nhà mạng hoặc chặng kế tiếp.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: ping máy CÙNG dải thì sống, ping mọi thứ NGOÀI dải đều chết. Trường cấu hình nào của máy đáng nghi nhất?
  - **Dạng:** gõ tay · **Chấp nhận:** gateway | default gateway | cổng mặc định | cửa ra
  - **Chủ đề gợi ý (tầng 1):** thứ chỉ dùng khi đi ra khỏi dải
  - **Gợi ý (tầng 2):** Trong dải thì máy gọi thẳng nhau, không cần nó. Chỉ chuyến đi xa mới phải qua nó.
  - **Lời giải (tầng 3):** Gateway. Trong dải máy gọi thẳng nhau bằng ARP nên gateway sai/thiếu không lộ; ra ngoài dải mọi gói phải qua gateway — nó hỏng là mọi chuyến đi xa chết.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao gateway sai mà ping máy cùng phòng vẫn chạy bình thường?
  - **Nhóm ý cần chạm:** [cùng dải, trong dải, gọi thẳng, trực tiếp, arp] · [ngoài dải, qua gateway, cửa ra, đi xa]
  - **Trả lời mẫu:** Vì đích cùng dải thì máy hỏi thẳng nhau bằng ARP rồi gửi trực tiếp, không đụng tới gateway. Gateway chỉ được dùng khi đích nằm ngoài dải — nên gateway sai chỉ giết các chuyến đi xa, còn trong phòng vẫn nói chuyện bình thường.

**6 · Tổng kết:**
- "Trong sống, ngoài chết" — nghi phạm số một là gateway.
- tracert gọi tên từng trạm: chỗ nghẽn nằm ngay sau trạm cuối còn lên tiếng.
- Ping thẳng địa chỉ gateway để kiểm tra cánh cửa có thật và còn sống.
- *Úp mở bài sau:* Ca sau còn lạ nữa: máy chủ sống nhăn răng, ping số thì Reply — mà gõ tên miền thì chịu chết. Ai mới là kẻ ốm?

### Bài: Máy chủ sống mà tên miền chết `m11-bai-3`

**1 · Khởi động (hook):** Ping 192.168.20.80 — Reply ngon lành. Gõ web.noibo.vn — trình duyệt quay mòng mòng rồi bó tay. Máy chủ rõ ràng đang sống, vậy đứa nào ốm?

**2 · Đoán thử (pretest):**
- **Đề:** Cả phòng kế toán nhao nhao: "web nội bộ sập rồi!". Bạn ngồi vào máy chị kế toán. Đừng vội tin lời than — thử tách bạch xem: bằng SỐ thì sao, bằng TÊN thì sao, và đứa trung gian nào đứng giữa hai thứ đó.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-KE-TOAN [192.168.20.10/24] · DNS-NOI-BO [192.168.20.53/24] · WEB-NOI-BO [192.168.20.80/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: MAY-KE-TOAN·eth0 — SW-TANG-2·p1 | DNS-NOI-BO·eth0 — SW-TANG-2·p2 | WEB-NOI-BO·eth0 — SW-TANG-2·p3
    - **Ngồi ở máy:** MAY-KE-TOAN
    - **Hồ sơ bệnh:** DNS 192.168.20.53 (ĐANG CHẾT) [web.noibo.vn → 192.168.20.80]
    - **Triệu chứng:** MAY-KE-TOAN phân giải tên "web.noibo.vn" PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Dịch vụ DNS nội bộ đang ngừng chạy** ✓ · Máy chủ web đã tắt · Dây mạng máy bạn bị tuột
    - **Sửa:** chọn hành động — **Khởi động lại dịch vụ DNS trên máy DNS-NOI-BO** ✓ · Cắm lại dây mạng cho máy bạn · Đổi địa chỉ IP của máy chủ web
  - **Chủ đề gợi ý (tầng 1):** đứa trung gian giữa tên và số
  - **Vì sao:** Ping 192.168.20.80 Reply — web sống. Ping cả 192.168.20.53 cũng Reply — MÁY DNS sống. Nhưng nslookup web.noibo.vn thì "DNS request timed out": máy sống mà DỊCH VỤ trên nó đã chết. Web không sập, dây không tuột — cuốn danh bạ ngừng trả lời nên cả phòng tưởng web chết. Việc đúng là khởi động lại dịch vụ DNS.

**3 · Khám phá (teach):**
- *[m11-tach-ten-so]* Phép thử tách đôi: ping bằng SỐ trước, rồi ping bằng TÊN. Số sống mà tên chết — bệnh không nằm ở đích, nó nằm ở cuốn danh bạ DNS (Module 6) đứng giữa hai thứ đó. Lệnh nslookup hỏi thẳng danh bạ; và hãy đọc kỹ lời từ chối: "request timed out" là dịch vụ không trả lời, còn "Non-existent domain" là dịch vụ SỐNG nhưng không có bản ghi cho tên đó — hai bệnh khác nhau, hai cách chữa khác nhau.
  - **Đào sâu hơn:** Vì sao "máy sống, dịch vụ chết" lại xảy ra được? Ping đi bằng ICMP, do hệ điều hành trả lời; còn DNS là một chương trình lắng nghe trên port 53 (bạn đã ghé phòng 53 của cung điện Module 5). Máy bật mà chương trình tắt thì ping vẫn Reply, còn nslookup thì timeout. Đó là lý do người trực phải khám tới TẦNG DỊCH VỤ chứ không dừng ở "máy còn sống".

**4 · Thử tay (practice, fading 1):**
- **Đề:** Sáng nay công ty vừa lắp máy chấm công mới, và có người kêu: "gõ chamcong.noibo.vn không được, chắc DNS lại chết rồi!". Khoan tin — làm lại phép thử của bài, và đọc KỸ lời từ chối của nslookup trước khi kết luận.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-KE-TOAN [192.168.20.10/24] · DNS-NOI-BO [192.168.20.53/24] · MAY-CHAM-CONG [192.168.20.30/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: MAY-KE-TOAN·eth0 — SW-TANG-2·p1 | DNS-NOI-BO·eth0 — SW-TANG-2·p2 | MAY-CHAM-CONG·eth0 — SW-TANG-2·p3
    - **Ngồi ở máy:** MAY-KE-TOAN
    - **Hồ sơ bệnh:** DNS 192.168.20.53 [web.noibo.vn → 192.168.20.80]
    - **Triệu chứng:** MAY-KE-TOAN phân giải tên "chamcong.noibo.vn" PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **DNS sống nhưng chưa có bản ghi cho tên mới** ✓ · Dịch vụ DNS đã chết hẳn · Máy chấm công chưa cắm mạng
    - **Sửa:** chọn hành động — **Thêm bản ghi chamcong.noibo.vn → 192.168.20.30 trên DNS server** ✓ · Khởi động lại dịch vụ DNS · Đổi gateway của máy bạn
  - **Chủ đề gợi ý (tầng 1):** khác nhau giữa timeout và Non-existent domain
  - **Gợi ý (tầng 2):** nslookup chamcong.noibo.vn trả "Non-existent domain" — tức danh bạ CÓ trả lời, chỉ là không tìm thấy tên. Thử nslookup web.noibo.vn: vẫn ra số ngon lành. Vậy dịch vụ chết hay thiếu trang?
  - **Lời giải (tầng 3):** DNS đang sống khỏe (tên cũ vẫn tra được, lời từ chối là "Non-existent domain" chứ không phải timeout) — chỉ là máy chấm công MỚI chưa được ghi vào danh bạ. Việc đúng: thêm bản ghi chamcong.noibo.vn → 192.168.20.30. Khởi động lại DNS là chữa nhầm bệnh.
- **Đề:** nslookup một tên trả về "Non-existent domain". Đó là dấu hiệu dịch vụ DNS đã chết, hay DNS sống nhưng thiếu bản ghi?
  - **Dạng:** gõ tay · **Chấp nhận:** thiếu bản ghi | chưa có bản ghi | không có bản ghi | sống nhưng thiếu bản ghi
  - **Chủ đề gợi ý (tầng 1):** ai là người đang từ chối bạn
  - **Gợi ý (tầng 2):** Muốn nói "không có tên này" thì phải CÓ AI ĐÓ đang trả lời đã. Dịch vụ chết thì chỉ có im lặng — timeout.
  - **Lời giải (tầng 3):** DNS sống nhưng thiếu bản ghi: "Non-existent domain" là một CÂU TRẢ LỜI — dịch vụ phải sống mới nói được câu đó. Dịch vụ chết cho ra "request timed out" — im lặng hoàn toàn.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: lệnh nào hỏi thẳng danh bạ DNS xem một tên trỏ về số nào?
  - **Dạng:** gõ tay · **Chấp nhận:** nslookup
  - **Chủ đề gợi ý (tầng 1):** đồ nghề chuyên hỏi danh bạ
  - **Gợi ý (tầng 2):** ns là name server — lệnh này "tra cứu" trên đó.
  - **Lời giải (tầng 3):** nslookup — hỏi thẳng DNS server, bỏ qua trình duyệt, để cô lập xem cuốn danh bạ có vấn đề không.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao phải ping bằng SỐ trước khi kết luận "web sập" hay "DNS hỏng"?
  - **Nhóm ý cần chạm:** [tách, cô lập, khoanh, phân biệt, loại trừ] · [dns, danh bạ, tên]
  - **Trả lời mẫu:** Vì "gõ tên không vào được" gộp hai nghi phạm làm một: đích chết, hoặc danh bạ hỏng. Ping bằng số bỏ DNS ra khỏi cuộc chơi — số sống mà tên chết thì bệnh chắc chắn nằm ở khâu phân giải tên, không phải ở đích. Tách được hai nghi phạm là đã khoanh vùng xong một nửa ca bệnh.

**6 · Tổng kết:**
- Tách tên khỏi số: ping số trước — số sống + tên chết = bệnh ở DNS.
- "Máy còn ping được" chưa chắc "dịch vụ còn sống" — khám tới tầng dịch vụ.
- Timeout là dịch vụ im lặng; "Non-existent domain" là dịch vụ sống nhưng thiếu bản ghi.
- *Úp mở bài sau:* Ca sau thuộc loại khó chịu nhất phòng khám: bệnh CHẬP CHỜN — lúc in được lúc không, chẳng theo quy luật nào. May là có một lệnh bắt được nó tại trận.

### Bài: Hai kẻ giành một số nhà `m11-bai-4`

**1 · Khởi động (hook):** "Máy in lúc được lúc không, sáng in ầm ầm, chiều lại đơ!" — bệnh chập chờn không tái hiện được theo ý mình là ác mộng của người trực. Nhưng có một cuốn sổ trên chính máy bạn ghi lại thủ phạm.

**2 · Đoán thử (pretest):**
- **Đề:** Phòng kế toán vừa nhận thêm một máy in mới. Từ hôm đó, in sang máy in cũ (192.168.20.21) lúc được lúc mất. Mẹo cho người trực: bệnh chập chờn thì đừng thử MỘT lần rồi kết luận — làm đi làm lại và so hai lần với nhau.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-KE-TOAN [192.168.20.10/24] · MAY-IN-KE-TOAN [192.168.20.21/24] · MAY-IN-MOI [192.168.20.21/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: MAY-KE-TOAN·eth0 — SW-TANG-2·p1 | MAY-IN-KE-TOAN·eth0 — SW-TANG-2·p2 | MAY-IN-MOI·eth0 — SW-TANG-2·p3
    - **Ngồi ở máy:** MAY-KE-TOAN
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** MAY-KE-TOAN ping 192.168.20.21 lúc được lúc không (nhiều máy giành một IP)
    - **Chẩn đoán (chọn 1):** **Hai thiết bị đang giành nhau một địa chỉ IP** ✓ · Dây máy in cũ bị lỏng · DNS trả sai địa chỉ
    - **Sửa:** trực tiếp trên sơ đồ — mục tiêu:
      - c4a-ke-toan PHẢI gọi được c4a-may-in-cu
      - phải hết sạch: duplicate-ip
    - **Được phép:** đặt địa chỉ
    - **Lời giải mẫu:** MAY-KE-TOAN [192.168.20.10/24] · MAY-IN-KE-TOAN [192.168.20.21/24] · MAY-IN-MOI [192.168.20.22/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: MAY-KE-TOAN·eth0 — SW-TANG-2·p1 | MAY-IN-KE-TOAN·eth0 — SW-TANG-2·p2 | MAY-IN-MOI·eth0 — SW-TANG-2·p3
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ MAC mà máy bạn tự ghi
  - **Vì sao:** Ping 192.168.20.21 hai lượt rồi mở arp -a mà xem: lượt đầu địa chỉ đó gắn MAC …:20, lượt sau đã thành …:21 — MỘT số nhà, HAI chủ thay nhau trả lời. Máy in mới bị đặt trùng IP với máy in cũ, ai đáp ARP sau cùng thì "giành" được gói tin, nên dịch vụ chập chờn theo vận may. Sửa: cấp cho máy in mới một địa chỉ khác (ví dụ .22).

**3 · Khám phá (teach):**
- *[m11-arp-doi-chu]* Nhớ Module 4: MAC là số khung đóng chết vào máy, IP là biển số tháo lắp được. Lệnh arp -a mở cuốn sổ "biển số ↔ số khung" mà máy bạn tự ghi qua mỗi lần hỏi ARP. Bệnh trùng IP hiện nguyên hình ở đó: ping cùng một IP hai lượt mà MAC trong sổ ĐỔI — tức là hai cái máy khác nhau đang thay phiên trả lời cùng một biển số. Đó là bằng chứng thép, không cần đoán.
  - **Đào sâu hơn:** Vì sao lúc được lúc mất? Khi hai máy cùng giữ một IP, cả hai đều đáp lời gọi ARP — ai đáp SAU CÙNG thì đè câu trả lời của kẻ trước trong cache của máy hỏi. Gói tin vì thế lúc chảy về máy này, lúc về máy kia, tùy vận may từng đợt ARP. Ngoài đời bạn còn thấy Windows kêu "IP address conflict" — chính là nó tự soi thấy chuyện này.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Bạn ping cùng một địa chỉ hai lượt. arp -a lượt đầu ghi MAC đuôi :20, lượt sau thành đuôi :21. Tên bệnh là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** trùng ip | trùng địa chỉ ip | duplicate ip | ip conflict | xung đột ip
  - **Chủ đề gợi ý (tầng 1):** một biển số, mấy chủ xe
  - **Gợi ý (tầng 2):** MAC là số khung — mỗi máy một số, không đổi được. Cùng một IP mà số khung đổi qua đổi lại nghĩa là mấy máy đang giữ IP đó?
  - **Lời giải (tầng 3):** Trùng IP (IP conflict): hai máy cùng giữ một địa chỉ, thay phiên trả lời ARP nên MAC trong sổ đổi qua đổi lại. Một biển số mà hai số khung là bằng chứng không cãi được.
- **Đề:** Vì sao trùng IP làm dịch vụ LÚC ĐƯỢC LÚC MẤT thay vì chết hẳn?
  - **Dạng:** trắc nghiệm · **Ai trả lời ARP sau cùng sẽ giành được IP — gói lúc chảy về máy này, lúc về máy kia** ✓ / Switch tự động chặn cả hai máy khi thấy trùng / Gói tin bị chia đôi cho cả hai máy nên mất một nửa
  - **Chủ đề gợi ý (tầng 1):** ai là người trả lời câu hỏi ARP
  - **Gợi ý (tầng 2):** Cả hai máy đều nghe thấy câu hỏi "ai giữ IP này?" — và cả hai đều trả lời. Cache của máy hỏi giữ câu trả lời của ai?
  - **Lời giải (tầng 3):** Cả hai máy đều đáp ARP; câu trả lời đến SAU đè câu trả lời trước trong cache. Gói tin vì thế lúc về máy này lúc về máy kia — dịch vụ chập chờn theo từng đợt ARP, chứ không chết hẳn.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: lệnh nào mở cuốn sổ "IP ↔ MAC" mà máy bạn tự ghi, để bắt tại trận bệnh trùng IP?
  - **Dạng:** gõ tay · **Chấp nhận:** arp | arp -a
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ ghi từ những lần hỏi "ai giữ địa chỉ này"
  - **Gợi ý (tầng 2):** Chính là giao thức "gọi giữa sân" của Module 4 — lệnh cùng tên.
  - **Lời giải (tầng 3):** arp -a — xem ARP cache. Ping hai lượt rồi so MAC của cùng một IP giữa hai lần xem: MAC đổi là trùng IP.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao MAC trong arp -a đổi qua đổi lại lại là bằng chứng của bệnh trùng IP?
  - **Nhóm ý cần chạm:** [mac, số khung, không đổi] · [hai máy, giành, thay phiên, trùng]
  - **Trả lời mẫu:** MAC gắn chết vào từng máy, không đổi được — nên một IP tử tế chỉ được phép đi kèm một MAC. Thấy cùng một IP mà MAC đổi qua đổi lại nghĩa là hai máy khác nhau đang thay phiên trả lời cho địa chỉ đó, tức hai máy đang giành nhau cùng một IP.

**6 · Tổng kết:**
- Bệnh chập chờn: đừng thử một lần — làm đi làm lại rồi so hai lần với nhau.
- arp -a là cuốn sổ IP ↔ MAC; cùng IP mà MAC đổi = hai máy giành một địa chỉ.
- Chữa trùng IP: cấp cho một trong hai máy địa chỉ khác còn trống.
- *Úp mở bài sau:* Ca chót là ca hắc búa nhất khoa: mạng sống nhăn răng, web chạy ầm ầm — mà ping thì chết ngay trên máy. Nghe vô lý? Chờ xem thủ phạm là ai.

### Bài: Bệnh nằm ngay trên máy `m11-bai-5`

**1 · Khởi động (hook):** Web mở được, chat chạy, file server vào ngon — nhưng gõ ping là "General failure" ngay tại chỗ. Mạng sống mà ping chết: nghe vô lý, cho tới khi bạn nhớ ra gói tin phải XIN PHÉP rời máy trước đã.

**2 · Đoán thử (pretest):**
- **Đề:** Anh trưởng phòng kế toán (máy vào miền công ty) than: "web nội bộ chị vẫn xem được, mà ping kiểm tra thì toàn lỗi — máy anh hỏng mạng à?". Khám đi: lần này đủ đồ nghề rồi đấy, kể cả mấy lệnh dành riêng cho máy trong miền (Module 9).
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-TRUONG-PHONG [192.168.20.11/24] · WEB-NOI-BO [192.168.20.80/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1] — dây: MAY-TRUONG-PHONG·eth0 — SW-TANG-2·p1 | WEB-NOI-BO·eth0 — SW-TANG-2·p2
    - **Ngồi ở máy:** MAY-TRUONG-PHONG
    - **Hồ sơ bệnh:** luật chặn ICMP outbound trên c5a-truong-phong (nguồn gpo: "GPO-Chan-ICMP-Ra") · gpresult c5a-truong-phong: HinhNen-CongTy, GPO-Chan-ICMP-Ra ⚠, CamUSB-KeToan · netstat c5a-truong-phong: 2 dòng
    - **Triệu chứng:** MAY-TRUONG-PHONG ping 192.168.20.80 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Một chính sách (GPO) trên máy đang chặn ping chiều đi** ✓ · Mạng tới máy chủ web bị đứt · Máy đang trùng địa chỉ IP với máy khác
    - **Sửa:** chọn hành động — **Báo quản trị miền sửa GPO đang chặn ICMP chiều đi** ✓ · Thay dây mạng cho máy · Khởi động lại máy chủ web
  - **Chủ đề gợi ý (tầng 1):** luật đang áp lên chính máy đó
  - **Vì sao:** netstat cho thấy máy đang có kết nối ESTABLISHED tới 192.168.20.80:443 — tức đường mạng tới đúng máy chủ đó ĐANG SỐNG. Ping lại "General failure" ngay tại chỗ, capture trống trơn: gói ICMP không được phép rời máy. Mạng không đứt, không trùng IP — có luật chặn ngay trên máy. gpresult lôi thủ phạm ra ánh sáng: GPO-Chan-ICMP-Ra. Máy vào miền thì luật đến từ miền — việc đúng là báo quản trị miền sửa GPO đó.

**3 · Khám phá (teach):**
- *[m11-manh-moi-tai-cho]* Khi "mạng sống mà ping chết", đừng đổ tội cho dây hay switch — soi ngay trên máy. Ba ngọn đèn: netstat liệt kê các kết nối đang mở (có ESTABLISHED tới đích tức đường tới đó còn sống); capture xem gói ICMP có thật sự rời máy không (trống trơn = bị giữ lại từ trong nhà); gpresult (máy vào miền, Module 9) kê các chính sách đang áp — luật chặn ICMP nếu có sẽ nằm ngay trong danh sách đó.
  - **Đào sâu hơn:** Ping dùng giao thức ICMP — một loại gói RIÊNG, khác với TCP mà web (443) hay file (445) đang dùng. Tường lửa và GPO chặn được TỪNG LOẠI gói theo TỪNG CHIỀU: chặn ICMP chiều đi thì ping chết mà web vẫn chạy; chặn ICMP chiều vào trên máy đích thì máy đích "câm" với ping nhưng dịch vụ thật vẫn phục vụ. Vì thế "ping chết" không bao giờ đủ để kết luận "mạng chết" — nó chỉ nói ICMP đang không qua được.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Ca ngược chiều: từ máy bạn ping MAY-CHU-FILE (192.168.20.40) toàn "Request timed out", nhưng ổ mạng chia sẻ từ đúng máy chủ đó vẫn mở phà phà. Máy bạn KHÔNG vào miền, không có GPO nào cả. Tự khám từ đầu tới cuối rồi chọn cách xử lý.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-KE-TOAN [192.168.20.10/24] · MAY-CHU-FILE [192.168.20.40/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1] — dây: MAY-KE-TOAN·eth0 — SW-TANG-2·p1 | MAY-CHU-FILE·eth0 — SW-TANG-2·p2
    - **Ngồi ở máy:** MAY-KE-TOAN
    - **Hồ sơ bệnh:** luật chặn ICMP inbound trên c5b-file (nguồn firewall: "Chan-ICMP-Vao") · netstat c5b-ke-toan: 1 dòng
    - **Triệu chứng:** MAY-KE-TOAN ping 192.168.20.40 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Tường lửa trên máy chủ file đang nuốt gói ping chiều vào** ✓ · Dây của máy chủ file bị tuột · Máy bạn sai gateway
    - **Sửa:** chọn hành động — **Mở luật cho ICMP chiều vào trong tường lửa của MAY-CHU-FILE** ✓ · Cắm lại dây mạng cho MAY-CHU-FILE · Đặt lại gateway cho máy bạn
  - **Chủ đề gợi ý (tầng 1):** gói ping có RỜI được máy bạn không, và có VỀ được không
  - **Gợi ý (tầng 2):** Lần này ping ra "Request timed out" chứ không phải General failure — gói RỜI được máy bạn. netstat thấy ESTABLISHED tới :445 của chính máy chủ đó — đường mạng sống. Chạy capture xem: echo-request bay TỚI nơi mà không có echo-reply bay về. Ai đang nuốt gói ở cửa NHÀ NÓ?
  - **Lời giải (tầng 3):** Đường mạng thông (dịch vụ file :445 vẫn ESTABLISHED, capture thấy echo-request tới đích), nhưng máy chủ file lặng thinh với ICMP — tường lửa của chính nó chặn chiều VÀO. So với ca trước: chặn outbound chết từ General failure ngay tại máy mình; chặn inbound thì gói đi được mà không có hồi âm. Việc đúng: mở luật ICMP inbound trên MAY-CHU-FILE.
- **Đề:** netstat thấy kết nối ESTABLISHED tới máy chủ, nhưng ping chính máy chủ đó lại thất bại. Đường mạng giữa hai máy còn sống hay đã đứt?
  - **Dạng:** gõ tay · **Chấp nhận:** còn sống | vẫn sống | sống | còn thông | vẫn thông
  - **Chủ đề gợi ý (tầng 1):** ESTABLISHED nghĩa là gì
  - **Gợi ý (tầng 2):** Một kết nối TCP muốn ở trạng thái ESTABLISHED thì hai máy phải đang bắt tay nói chuyện được với nhau — qua đúng con đường đó.
  - **Lời giải (tầng 3):** Còn sống: ESTABLISHED nghĩa là TCP đang nói chuyện thành công qua chính con đường ấy. Ping chết chỉ chứng tỏ ICMP bị chặn ở đâu đó — không đủ để kết luận mạng đứt.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: trên máy đã vào miền, lệnh nào liệt kê các chính sách (GPO) đang áp — nơi tìm luật chặn nhầm?
  - **Dạng:** gõ tay · **Chấp nhận:** gpresult | gpresult /r
  - **Chủ đề gợi ý (tầng 1):** lệnh quen từ Module 9
  - **Gợi ý (tầng 2):** Chính là lệnh bạn dùng ở bài kế thừa GPO — "kết quả group policy".
  - **Lời giải (tầng 3):** gpresult — kê mọi GPO đang áp lên máy. Máy vào miền mà tự dưng đổi tính, soi danh sách này trước khi đổ tội cho phần cứng.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao "ping chết" chưa đủ để kết luận "mạng chết"?
  - **Nhóm ý cần chạm:** [icmp, loại gói, riêng, một loại] · [chặn, luật, tường lửa, gpo]
  - **Trả lời mẫu:** Ping dùng ICMP — chỉ là MỘT loại gói. Tường lửa hay GPO chặn được riêng ICMP theo từng chiều trong khi TCP của web, file vẫn chạy bình thường. Nên ping chết chỉ nói "ICMP không qua được"; muốn kết luận mạng chết phải soi thêm netstat, capture, gpresult xem gói bị nuốt ở đâu.

**6 · Tổng kết:**
- Mạng sống mà ping chết: soi luật ngay trên máy — gpresult, netstat, capture.
- Chặn ICMP chiều đi = General failure tại chỗ; chặn chiều vào = timeout mà dịch vụ vẫn chạy.
- Ping chỉ đo ICMP — nó chết không có nghĩa cả mạng chết.
- *Úp mở bài sau:* Hết khoa khám lẻ — bài thi tổng của phòng khám sẽ trộn đủ mọi loại bệnh bạn từng gặp, không báo trước ca nào. Đúng như một buổi trực thật.

### Khái niệm & flashcard (6)

- **Bottom-up troubleshooting** `m11-kham-theo-tang` — Khám theo tầng — lần từ dây cắm lên tới dịch vụ
  - Ẩn dụ: Như bác sĩ bắt mạch trước khi hỏi chuyện ăn ngủ: tầng dưới hỏng thì mọi tầng trên hỏng theo, nên khám từ nền móng lên là loại trừ nhanh nhất.
  - Thẻ ôn: *Khám theo tầng (bottom-up) là khám theo thứ tự nào?* → Từ thấp lên cao: dây cắm → địa chỉ IP → đường đi (gateway/router) → dịch vụ (DNS, web). Tầng dưới hỏng kéo mọi tầng trên hỏng theo.
- **ipconfig & ping** `m11-ipconfig-ping` — Cặp đồ nghề đầu tay: đọc giấy tờ của máy và bắt mạch đường truyền
  - Ẩn dụ: ipconfig là xem giấy tờ tùy thân; ping là cái ống nghe — ba kiểu đáp (Reply, General failure, unreachable) là ba nhịp mạch khác nhau.
  - Thẻ ôn: *Ping ra "General failure" khác gì "Destination host unreachable"?* → General failure: gói không rời nổi MÁY MÌNH (dây mình tuột, thiếu gateway, bị chặn outbound). Unreachable: gói rời được máy nhưng lời gọi ARP không ai đáp — bệnh phía trước, thường ở máy đích.
- **tracert** `m11-tracert` — Gọi tên từng trạm trên đường đi để tìm chỗ nghẽn
  - Ẩn dụ: Như gọi điện lần lượt cho từng trạm giao hàng: trạm nào còn bắt máy thì hàng đã qua đó — chỗ mất hàng nằm ngay sau trạm cuối còn bắt máy.
  - Thẻ ôn: *Đọc kết quả tracert thế nào để tìm chỗ nghẽn?* → Trạm còn trả lời = đường tới đó còn sống. Chỗ nghẽn nằm ngay sau trạm cuối cùng còn lên tiếng; * * * từ chặng 1 nghĩa là chưa qua nổi gateway của chính mình.
- **nslookup** `m11-tach-ten-so` — Tách tên khỏi số để khoanh bệnh về DNS
  - Ẩn dụ: Gọi bằng số điện thoại thì được, gọi qua danh bạ thì lạc — người ốm là cuốn danh bạ, không phải người nghe máy.
  - Thẻ ôn: *nslookup trả "request timed out" khác gì "Non-existent domain"?* → Timeout: dịch vụ DNS im lặng — nghi nó chết. Non-existent domain: DNS SỐNG và trả lời hẳn hoi, chỉ là không có bản ghi cho tên đó — chữa bằng cách thêm bản ghi, không phải khởi động lại.
- **arp -a** `m11-arp-doi-chu` — Cuốn sổ IP ↔ MAC làm chứng cho bệnh trùng IP
  - Ẩn dụ: MAC là số khung, IP là biển số. Một biển số mà sổ ghi hai số khung thay phiên nhau — hai xe đang giành một tấm biển.
  - Thẻ ôn: *Bắt bệnh trùng IP bằng arp -a như thế nào?* → Ping cùng một IP vài lượt rồi so arp -a giữa các lần: cùng IP mà MAC đổi nghĩa là hai máy thay phiên trả lời ARP — hai máy đang giữ chung một địa chỉ.
- **gpresult & netstat** `m11-manh-moi-tai-cho` — Soi manh mối ngay trên máy khi mạng sống mà ping chết
  - Ẩn dụ: Cửa nhà bị dán bùa thì trách gì đường sá: netstat xem các cuộc nói chuyện đang mở, capture xem gói có rời nhà, gpresult đọc các lá bùa đang dán.
  - Thẻ ôn: *"Mạng sống mà ping chết" — soi ba thứ gì ngay trên máy?* → netstat (còn kết nối ESTABLISHED = đường sống), capture (gói ICMP có rời máy/có hồi âm không), gpresult (máy vào miền — luật GPO nào đang chặn). Ping chỉ đo ICMP, nó chết không có nghĩa mạng chết.

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Lệnh nào cho xem địa chỉ IP, subnet mask và gateway của máy đang ngồi?
  - **Dạng:** gõ tay · **Chấp nhận:** ipconfig
  - **Chủ đề gợi ý (tầng 1):** tờ giấy tùy thân của máy
  - **Vì sao:** ipconfig — bước mở đầu của mọi buổi khám: đọc giấy tờ của máy trước khi thăm dò ra ngoài.
- **Đề:** Khám theo tầng (bottom-up) đi theo thứ tự nào?
  - **Dạng:** trắc nghiệm · Dịch vụ → đường đi → IP → dây / **Dây → IP → đường đi → dịch vụ** ✓ / IP → dây → dịch vụ → đường đi
  - **Vì sao:** Từ thấp lên cao: dây cắm → địa chỉ IP → đường đi → dịch vụ. Tầng dưới hỏng thì mọi tầng trên hỏng theo, nên loại trừ từ nền móng lên.
- **Đề:** Ping bằng địa chỉ IP thì Reply, ping bằng tên miền thì "could not find host". Bệnh nằm ở hệ thống nào?
  - **Dạng:** gõ tay · **Chấp nhận:** dns | danh bạ | phân giải tên
  - **Chủ đề gợi ý (tầng 1):** đứa trung gian giữa tên và số
  - **Vì sao:** Số sống mà tên chết — đích không ốm, kẻ ốm là DNS (khâu phân giải tên). Đây chính là phép thử tách-tên-khỏi-số.
- **Đề:** Ping ra "Reply from … TTL=126" trên máy Windows (xuất phát TTL 128). Gói đã đi qua mấy router?
  - **Dạng:** gõ tay · **Chấp nhận:** 2 | hai | 2 router | hai router
  - **Chủ đề gợi ý (tầng 1):** mỗi router trừ TTL đi một
  - **Vì sao:** 128 − 126 = 2: mỗi router trên đường trừ TTL đi 1 (kiến thức định tuyến Module 4). Đọc TTL là ước được quãng đường mà chưa cần tracert.
- **Đề:** arp -a sau hai lượt ping cùng một IP cho hai MAC khác nhau. Kết luận nào đúng?
  - **Dạng:** trắc nghiệm · **Hai thiết bị đang giành nhau một địa chỉ IP** ✓ / Switch ghi sai bảng MAC nên trả về lung tung / DNS đang trả về sai bản ghi cho tên máy đó
  - **Vì sao:** MAC gắn chết vào máy — cùng một IP mà MAC đổi nghĩa là hai máy thay phiên trả lời ARP: bệnh trùng IP, bắt tại trận bằng chính cuốn sổ arp.
- **Đề:** Máy vào miền tự dưng ping chết ngay tại chỗ dù web vẫn chạy. Lệnh nào lôi danh sách chính sách đang áp lên máy ra ánh sáng?
  - **Dạng:** gõ tay · **Chấp nhận:** gpresult | gpresult /r
  - **Chủ đề gợi ý (tầng 1):** lệnh soi GPO từ Module 9
  - **Vì sao:** gpresult — kê mọi GPO đang áp (Module 9). Máy vào miền thì luật đến từ miền; luật chặn ICMP nếu có sẽ nằm ngay trong danh sách đó.
- **Đề:** Ping ra "PING: transmit failed. General failure." khác gì với "Destination host unreachable"?
  - **Dạng:** trắc nghiệm · **Câu đầu là hỏng ngay tại máy mình; câu sau là đi được nhưng không tới đích** ✓ / Câu đầu là máy đích đã tắt hẳn; câu sau là tên miền không phân giải ra được số / Hai câu như nhau, Windows in ngẫu nhiên một trong hai khi ping hỏng
  - **Chủ đề gợi ý (tầng 1):** hai lời từ chối của ping khác nhau ở chỗ nào
  - **Vì sao:** General failure: card hoặc dây của CHÍNH máy mình có vấn đề, gói chưa rời khỏi máy. Destination host unreachable: gói đi được nhưng đường tới đích đứt. Đọc đúng hai câu này là khoanh xong nửa ca bệnh.
- **Đề:** Trang web mở rất chậm và bạn muốn biết gói tin nghẽn ở trạm nào trên đường đi. Lệnh nào gọi tên từng trạm?
  - **Dạng:** gõ tay · **Chấp nhận:** tracert | tracert -d | traceroute
  - **Chủ đề gợi ý (tầng 1):** lệnh gọi tên từng trạm trên đường đi
  - **Vì sao:** tracert kê từng trạm kèm thời gian. Trạm nào bắt đầu chậm hẳn hoặc dừng hẳn là chỗ đáng nghi — nó khoanh vùng giúp bạn chứ không sửa hộ bạn.
- **Đề:** nslookup trả "Request timed out" khác gì với "Non-existent domain"?
  - **Dạng:** trắc nghiệm · **Timeout: máy chủ DNS không trả lời. Non-existent: DNS trả lời rằng tên đó không có** ✓ / Timeout: tên miền bị viết sai chính tả. Non-existent: máy chủ DNS đang quá tải nặng / Hai câu cùng nghĩa là DNS hỏng, chỉ khác ở phiên bản Windows in câu nào
  - **Chủ đề gợi ý (tầng 1):** hai lời của nslookup: im lặng và trả lời không có
  - **Vì sao:** Timeout là DNS không nói gì — nghi máy chủ DNS chết. Non-existent là DNS nói rõ "không có tên này" — nghi thiếu bản ghi. Cùng vùng bệnh, hai cách chữa khác nhau.
- **Đề:** Ping tới máy khác thì chết, nhưng netstat trên chính máy đó vẫn kê ra các kết nối ESTABLISHED. Đọc thế nào?
  - **Dạng:** trắc nghiệm · **Mạng vẫn thông; ICMP đang bị chặn tại chỗ bởi tường lửa hoặc GPO** ✓ / Card mạng đã hỏng hẳn; các kết nối kia chỉ là dấu vết cũ chưa được dọn / Máy đã rơi khỏi miền nên chỉ còn giữ được kết nối ra ngoài Internet
  - **Chủ đề gợi ý (tầng 1):** netstat khi ping chết mà mạng vẫn sống
  - **Vì sao:** ESTABLISHED nghĩa là dữ liệu vẫn đi về được. Chỉ mỗi ping chết thì thủ phạm là luật chặn ICMP ngay trên máy — đúng cái bẫy "mạng sống mà ping chết".
- **Đề:** Ca thi thứ nhất: sau buổi dọn tủ rack cuối tuần, KE-TOAN-A không gọi được KE-TOAN-B (192.168.30.20) nữa dù hai máy cùng dải. Máy KY-THUAT thì theo quy định vốn phải tách riêng khỏi kế toán. Khám, gọi tên bệnh, và sửa cho đúng — đừng phá luôn bức tường ngăn với kỹ thuật.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** KE-TOAN-A [192.168.30.10/24] · KE-TOAN-B [192.168.30.20/24] · KY-THUAT [192.168.30.30/24] · SW-TANG-3 [p1:VLAN 10, p2:VLAN 20, p3:VLAN 20] — dây: KE-TOAN-A·eth0 — SW-TANG-3·p1 | KE-TOAN-B·eth0 — SW-TANG-3·p2 | KY-THUAT·eth0 — SW-TANG-3·p3
    - **Ngồi ở máy:** KE-TOAN-A
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** KE-TOAN-A ping 192.168.30.20 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Hai máy kế toán bị chia vào hai VLAN khác nhau** ✓ · Hai máy kế toán đang trùng một địa chỉ IP nên giành nhau · Máy KE-TOAN-A thiếu default gateway nên gói không ra nổi
    - **Sửa:** trực tiếp trên sơ đồ — mục tiêu:
      - mt7-kt-a PHẢI gọi được mt7-kt-b
      - mt7-kt-a phải KHÔNG gọi được mt7-ky-thuat
      - phải hết sạch: same-subnet-different-vlan
    - **Được phép:** đổi VLAN
    - **Lời giải mẫu:** KE-TOAN-A [192.168.30.10/24] · KE-TOAN-B [192.168.30.20/24] · KY-THUAT [192.168.30.30/24] · SW-TANG-3 [p1:VLAN 10, p2:VLAN 10, p3:VLAN 20] — dây: KE-TOAN-A·eth0 — SW-TANG-3·p1 | KE-TOAN-B·eth0 — SW-TANG-3·p2 | KY-THUAT·eth0 — SW-TANG-3·p3
  - **Chủ đề gợi ý (tầng 1):** bức tường vô hình trong switch (Module 4)
  - **Vì sao:** Cùng dải mà "Destination host unreachable" — lời gọi ARP không vượt qua được bức tường VLAN (Module 4): buổi dọn tủ rack đã cắm KE-TOAN-B vào cổng thuộc VLAN 20. Kéo cổng đó về VLAN 10 cho khớp KE-TOAN-A; giữ nguyên KY-THUAT ở VLAN 20 — gộp tất cả vào một VLAN thì thông chỗ này nhưng phá bức tường mà quy định công ty yêu cầu.
- **Đề:** Ca thi cuối: cả công ty kêu "portal nội bộ sập". Bạn ngồi vào một máy bất kỳ. Khám cho ra kẻ ốm thật sự — rồi chọn đúng một việc để làm.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-NHAN-VIEN [192.168.20.12/24] · DNS-NOI-BO [192.168.20.53/24] · PORTAL-NOI-BO [192.168.20.90/24] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: MAY-NHAN-VIEN·eth0 — SW-TANG-2·p1 | DNS-NOI-BO·eth0 — SW-TANG-2·p2 | PORTAL-NOI-BO·eth0 — SW-TANG-2·p3
    - **Ngồi ở máy:** MAY-NHAN-VIEN
    - **Hồ sơ bệnh:** DNS 192.168.20.53 (ĐANG CHẾT) [portal.noibo.vn → 192.168.20.90]
    - **Triệu chứng:** MAY-NHAN-VIEN phân giải tên "portal.noibo.vn" PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Dịch vụ DNS nội bộ ngừng chạy — portal vẫn sống** ✓ · Máy chủ portal đã sập hẳn — ping số cũng không trả lời · Switch tầng 2 mất điện nên cả dải máy chủ biến mất
    - **Sửa:** chọn hành động — **Khởi động lại dịch vụ DNS trên DNS-NOI-BO** ✓ · Khởi động lại máy chủ portal rồi chờ nó lên · Thay switch tầng 2 và kiểm tra nguồn điện
  - **Chủ đề gợi ý (tầng 1):** số thì sao, tên thì sao
  - **Vì sao:** Ping 192.168.20.90 vẫn Reply — portal sống, switch càng không mất điện. nslookup portal.noibo.vn timeout — cuốn danh bạ mới là kẻ ốm: cả công ty gõ TÊN nên cả công ty tưởng portal sập. Khởi động lại dịch vụ DNS là đúng bệnh; khởi động lại portal là chữa nhầm người đang khỏe.

## Tự động hóa — PowerShell cho người quản trị mạng `module-12`

Phần C · 5 chặng · 5 bài · 8 khái niệm

**Chặng:** Ra lệnh cho máy (m12-bai-1) → Tham số và sổ tay (m12-bai-2) → Hỏi sổ hộ khẩu của miền (m12-bai-3) → Một lệnh cho cả danh sách (m12-bai-4) → Lôi manh mối ra khỏi log (m12-bai-5)

### Bài: Nói chuyện với máy bằng động từ và danh từ `m12-bai-1`

**1 · Khởi động (hook):** Sếp nhắn: "Kiểm tra giúp xem máy chủ file còn mở port chia sẻ không". Bạn có thể bấm chuột mò mẫm mười phút — hoặc gõ một dòng và có câu trả lời sau một giây. Một dòng đó trông như thế nào?

**2 · Đoán thử (pretest):**
- **Đề:** Chưa ai dạy bạn cú pháp nào cả — cứ mở terminal mà mò. Việc cần làm: xác nhận máy chủ file 192.168.20.40 còn mở port 445 (port chia sẻ thư mục của Windows). Gõ sai thoải mái, máy này là máy giả, không hỏng được gì đâu.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: file.noibo.vn=192.168.20.40 cổng 445 · web.noibo.vn=192.168.20.80 cổng 80/443 · 192.168.20.99 (im lặng)
    - **Mục tiêu:**
      - phải kiểm tra cổng 445 của 192.168.20.40 thành công
    - **Lệnh mẫu:** `Test-NetConnection 192.168.20.40 -Port 445`
  - **Chủ đề gợi ý (tầng 1):** tên lệnh trong PowerShell luôn ghép hai mảnh
  - **Vì sao:** Lệnh cần tìm là Test-NetConnection 192.168.20.40 -Port 445. Đọc tên lệnh là đoán ra việc: Test (kiểm tra) — Net (mạng) — Connection (kết nối). Dòng TcpTestSucceeded : True chính là câu trả lời cho sếp. Mò mẫm nãy giờ không phí: bộ não vừa tự dựng sẵn chỗ để cất quy tắc đặt tên mà bài này sắp dạy.

**3 · Khám phá (teach):**
- *[m12-cmdlet]* Mọi lệnh PowerShell đều tên theo một khuôn: Động từ - Danh từ. Get-NetIPAddress = lấy - địa chỉ IP. New-ADUser = tạo mới - người dùng AD. Test-NetConnection = kiểm tra - kết nối mạng. Nhờ khuôn này bạn không phải học thuộc từng lệnh: biết mình muốn LÀM GÌ với CÁI GÌ là đoán được tên.
  - **Đào sâu hơn:** Danh sách động từ được Microsoft chuẩn hóa hẳn: Get (lấy về), Set (đặt lại), New (tạo mới), Remove (xóa), Test (kiểm tra), Import/Export (nạp vào/xuất ra), Start/Stop. Đây là lý do PowerShell học một lần dùng được khắp nơi — quản Exchange, quản Azure, quản máy in đều cùng bộ động từ ấy, chỉ đổi danh từ phía sau.
- *[m12-cmdlet-mang]* Hai lệnh mạng đầu tay. Get-NetIPAddress là ipconfig biết nói: in ra IPAddress, InterfaceAlias, PrefixLength thành từng dòng gọn. Test-NetConnection là ping và telnet gộp làm một: gõ trần thì nó ping (PingSucceeded), thêm -Port thì nó gõ đúng cánh cửa đó xem có ai mở (TcpTestSucceeded).
  - **Đào sâu hơn:** Khác biệt này quan trọng lúc chẩn đoán: PingSucceeded True mà TcpTestSucceeded False nghĩa là máy đích SỐNG nhưng dịch vụ ở port đó không chạy (hoặc bị tường lửa chặn riêng port ấy) — đúng cặp phân biệt bạn đã dùng ở Phòng khám, giờ đo được bằng một dòng lệnh thay vì suy đoán.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Việc cần làm: xem web nội bộ web.noibo.vn còn phục vụ HTTPS không. Bước 1 — dịch yêu cầu sang động từ-danh từ: mình muốn KIỂM TRA một KẾT NỐI MẠNG, vậy lệnh là Test-NetConnection. Bước 2 — đích đến viết ngay sau tên lệnh, không cần tên tham số: Test-NetConnection web.noibo.vn. Bước 3 — HTTPS là port 443, mà muốn gõ đúng cánh cửa thì phải nói rõ cửa nào, nên thêm -Port 443. Dòng hoàn chỉnh: Test-NetConnection web.noibo.vn -Port 443. Bước 4 — đọc kết quả: TcpTestSucceeded : True là xong việc; nếu ra False thì máy có thể vẫn sống, chỉ dịch vụ ở port đó là không.
- **Đề:** Tới lượt bạn: xác nhận web nội bộ 192.168.20.80 còn mở port 443. Gõ bao nhiêu lần cũng được, chỉ khi bấm "Nộp bài" mới tính một lượt.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: file.noibo.vn=192.168.20.40 cổng 445 · web.noibo.vn=192.168.20.80 cổng 80/443 · 192.168.20.99 (im lặng)
    - **Mục tiêu:**
      - phải kiểm tra cổng 443 của 192.168.20.80 thành công
    - **Lệnh mẫu:** `Test-NetConnection web.noibo.vn -Port 443`
  - **Chủ đề gợi ý (tầng 1):** port phải nói rõ, không thì lệnh chỉ ping
  - **Gợi ý (tầng 2):** Khuôn của dòng lệnh là: Test-NetConnection <đích> -Port <số port>. Đích viết bằng IP hay bằng tên đều được — máy tự phân giải. Thiếu -Port thì lệnh chỉ ping, và ping thành công không chứng minh được port 443 đang mở.
  - **Lời giải (tầng 3):** Test-NetConnection 192.168.20.80 -Port 443 (hoặc thay IP bằng web.noibo.vn). Nhìn dòng TcpTestSucceeded : True là chốt được: port 443 đang mở.
- **Đề:** Tên của mọi lệnh PowerShell đều ghép từ hai mảnh theo một khuôn. Khuôn đó là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** động từ - danh từ | động từ danh từ | dong tu - danh tu | dong tu danh tu | verb-noun | verb noun
  - **Chủ đề gợi ý (tầng 1):** làm GÌ với CÁI GÌ
  - **Gợi ý (tầng 2):** Nhìn lại ba cái tên: Get-NetIPAddress, New-ADUser, Test-NetConnection. Mảnh đứng trước nói hành động, mảnh đứng sau nói đối tượng.
  - **Lời giải (tầng 3):** Động từ - Danh từ (verb-noun): Get-NetIPAddress là lấy-địa chỉ IP, New-ADUser là tạo mới-người dùng AD. Biết muốn làm gì với cái gì là đoán được tên lệnh.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: lệnh nào vừa ping được vừa gõ thử được một port TCP cụ thể trên máy khác?
  - **Dạng:** gõ tay · **Chấp nhận:** Test-NetConnection | test netconnection | test-netconnection
  - **Chủ đề gợi ý (tầng 1):** động từ "kiểm tra" ghép với danh từ "kết nối mạng"
  - **Gợi ý (tầng 2):** Ghép theo khuôn: động từ nghĩa là "kiểm tra", danh từ là "kết nối mạng" viết liền không dấu cách.
  - **Lời giải (tầng 3):** Test-NetConnection. Gõ trần thì nó ping (PingSucceeded); thêm -Port <số> thì nó gõ đúng cánh cửa đó và trả TcpTestSucceeded.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao Test-NetConnection -Port nói được nhiều hơn một lệnh ping thường?
  - **Nhóm ý cần chạm:** [cổng, port, dịch vụ] · [ping, icmp, máy sống, máy đích]
  - **Trả lời mẫu:** Ping chỉ cho biết máy đích còn sống và đường đi tới đó còn thông. Test-NetConnection kèm -Port đi thêm một bước: nó gõ đúng cánh cửa của dịch vụ. Nhờ vậy phân biệt được hai ca rất khác nhau — máy chết hẳn, và máy vẫn sống nhưng dịch vụ ở port đó không chạy hoặc bị chặn.

**6 · Tổng kết:**
- Tên lệnh PowerShell luôn theo khuôn Động từ - Danh từ, nên đoán được chứ không cần học thuộc.
- Get-NetIPAddress là ipconfig biết nói; Test-NetConnection là ping và telnet gộp một.
- Thêm -Port mới chứng minh được dịch vụ ở port đó đang mở; ping suông thì không.
- *Úp mở bài sau:* Nhưng làm sao biết một lệnh nhận những tham số nào? Bài sau: cách bắt chính PowerShell tự khai ra cú pháp của nó.

### Bài: Bắt máy tự khai cú pháp `m12-bai-2`

**1 · Khởi động (hook):** Trên đời có hàng nghìn cmdlet, không ai nhớ nổi tham số của từng cái. Vậy mà dân quản trị vẫn gõ đúng ngay từ lần đầu với một lệnh chưa từng dùng. Họ tra ở đâu — Google, hay ngay trong terminal?

**2 · Đoán thử (pretest):**
- **Đề:** Bạn muốn kiểm tra port 1433 của máy chủ SQL. Cách viết nào đúng khuôn tham số của PowerShell?
  - **Dạng:** trắc nghiệm · **Test-NetConnection sql.noibo.vn -Port 1433** ✓ / Test-NetConnection sql.noibo.vn:1433 / Test-NetConnection --port=1433 sql.noibo.vn
  - **Chủ đề gợi ý (tầng 1):** PowerShell gọi tên tham số bằng một dấu gạch
  - **Vì sao:** PowerShell dùng MỘT dấu gạch nối rồi tới tên tham số, rồi khoảng trắng, rồi giá trị: -Port 1433. Kiểu host:port là thói quen từ trình duyệt, còn --port= là thói quen từ Linux — cả hai đều không phải khuôn của PowerShell.

**3 · Khám phá (teach):**
- *[m12-tham-so]* Tham số là những cái nhãn dán vào giá trị: -Port 443, -Name "Le Thi Mai", -SamAccountName ltmai. Một dấu gạch, tên tham số, khoảng trắng, giá trị. Giá trị nào có dấu cách thì bọc trong nháy kép — không bọc thì máy tưởng đó là hai giá trị rời.
  - **Đào sâu hơn:** Vài tham số quan trọng nhất được phép giấu nhãn đi, gọi là tham số vị trí: Test-NetConnection web.noibo.vn chính là -ComputerName web.noibo.vn viết tắt. Người mới nên viết đủ nhãn cho rõ, người quen tay thì bỏ bớt cái đầu tiên. Nhưng từ cái thứ hai trở đi thì phải có nhãn, vì máy không đoán được bạn đang nói tới thứ gì.
- *[m12-get-help]* Get-Help là cuốn sổ tay nằm sẵn trong máy. Gõ Get-Help Test-NetConnection là nó in ra khối SYNTAX — đúng những tham số lệnh đó nhận, cái nào bắt buộc, cái nào tùy chọn. Dấu ngoặc vuông nghĩa là có cũng được không có cũng được.
  - **Đào sâu hơn:** Đọc được khối SYNTAX là kỹ năng tự học quan trọng nhất của cả module này: [-ComputerName] <String> nghĩa là tham số bắt buộc nhưng cái NHÃN thì tùy (viết trần cũng hiểu); còn [-Port <Int32>] cả cụm nằm trong ngoặc nghĩa là muốn bỏ hẳn cũng được. Nắm quy ước ngoặc này thì cmdlet lạ nào bạn cũng tự tra được, không phụ thuộc vào việc có ai dạy hay không.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Máy chủ SQL của công ty là sql.noibo.vn, phục vụ ở port 1433. Xác nhận port đó đang mở. Chưa chắc cú pháp thì cứ hỏi sổ tay ngay trong terminal trước khi gõ lệnh chính.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: sql.noibo.vn=192.168.20.60 cổng 1433 · web.noibo.vn=192.168.20.80 cổng 80/443 · 192.168.20.99 (im lặng)
    - **Mục tiêu:**
      - phải kiểm tra cổng 1433 của 192.168.20.60 thành công
    - **Lệnh mẫu:** `Get-Help Test-NetConnection` rồi `Test-NetConnection sql.noibo.vn -Port 1433`
  - **Chủ đề gợi ý (tầng 1):** sổ tay nằm ngay trong terminal
  - **Gợi ý (tầng 2):** Hai nhịp: Get-Help Test-NetConnection để đọc khối SYNTAX, rồi gõ lệnh chính theo đúng khuôn <đích> -Port <số>. Gõ tên máy thay IP vẫn chạy — máy tự phân giải như DNS ngoài đời.
  - **Lời giải (tầng 3):** Test-NetConnection sql.noibo.vn -Port 1433. Nhìn TcpTestSucceeded : True là xong. Muốn tra trước thì Get-Help Test-NetConnection — khối SYNTAX cho thấy -Port là tham số tùy chọn kiểu Int32.
- **Đề:** Bạn gặp một lệnh lạ tên New-ADUser và không biết nó nhận tham số gì. Gõ dòng nào để chính máy khai ra cú pháp?
  - **Dạng:** gõ tay · **Chấp nhận:** Get-Help New-ADUser | get-help new-aduser | help New-ADUser | help new-aduser
  - **Chủ đề gợi ý (tầng 1):** lấy - trợ giúp
  - **Gợi ý (tầng 2):** Vẫn là khuôn động từ-danh từ: động từ "lấy", danh từ "trợ giúp". Rồi viết tên lệnh cần tra ngay phía sau.
  - **Lời giải (tầng 3):** Get-Help New-ADUser. Khối SYNTAX in ra sẽ cho thấy -Name và -SamAccountName là bắt buộc, còn -Path và -Enabled nằm trong ngoặc vuông nên tùy chọn.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: trong khối SYNTAX, cụm nằm trong ngoặc vuông như [-Port <Int32>] mang ý nghĩa gì?
  - **Dạng:** gõ tay · **Chấp nhận:** tùy chọn | tuy chon | không bắt buộc | khong bat buoc | có thể bỏ | co the bo
  - **Chủ đề gợi ý (tầng 1):** có cũng được, không có cũng được
  - **Gợi ý (tầng 2):** Ngoặc vuông trong mọi tài liệu dòng lệnh đều mang cùng một nghĩa: phần này không nhất thiết phải viết.
  - **Lời giải (tầng 3):** Là tham số tùy chọn — bỏ đi lệnh vẫn chạy. Còn [-ComputerName] <String> chỉ có mỗi cái nhãn nằm trong ngoặc: giá trị thì bắt buộc, chỉ cái nhãn là được phép bỏ.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao biết dùng Get-Help lại đáng giá hơn việc học thuộc tham số của từng lệnh?
  - **Nhóm ý cần chạm:** [học thuộc, nhớ hết, thuộc lòng, hàng nghìn] · [tự tra, tra cứu, sổ tay, syntax, cú pháp]
  - **Trả lời mẫu:** Vì có hàng nghìn cmdlet, học thuộc tham số của từng cái là chuyện bất khả thi. Get-Help biến việc đó thành kỹ năng tra cứu: gặp lệnh lạ nào cũng tự đọc được khối SYNTAX ngay trong terminal, biết cái nào bắt buộc cái nào tùy chọn, không cần mạng và không phụ thuộc vào việc có ai dạy mình hay không.

**6 · Tổng kết:**
- Tham số viết theo khuôn một dấu gạch: -Port 443; giá trị có dấu cách thì bọc nháy kép.
- Get-Help <tên lệnh> in ra khối SYNTAX ngay trong terminal, không cần mạng.
- Ngoặc vuông = tùy chọn; ngoặc chỉ ôm cái nhãn = giá trị bắt buộc, nhãn thì được bỏ.
- *Úp mở bài sau:* Giờ bạn gõ được lệnh mạng. Nhưng công việc thật của quản trị viên phần lớn nằm ở chỗ khác: cuốn sổ hộ khẩu của miền — nơi cất tên từng nhân viên.

### Bài: Hỏi và ghi vào sổ hộ khẩu của miền `m12-bai-3`

**1 · Khởi động (hook):** Phòng nhân sự gửi xuống: "Tuần này có một bạn mới vào phòng Kế toán". Mở giao diện đồ họa bấm qua bảy cửa sổ cũng xong. Nhưng nếu tuần sau là ba mươi bạn thì sao?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: theo khuôn động từ-danh từ đã học, lệnh tra cứu một người dùng trong Active Directory sẽ tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** Get-ADUser | get aduser | get-aduser | get ad user
  - **Chủ đề gợi ý (tầng 1):** lấy - người dùng AD
  - **Vì sao:** Get-ADUser — đúng khuôn: động từ Get (lấy về), danh từ ADUser (người dùng Active Directory). Đoán được tên lệnh mà chưa từng học chính là phần thưởng của quy tắc đặt tên ở bài 1.

**3 · Khám phá (teach):**
- *[m12-ad-doc]* Get-ADUser đọc cuốn sổ hộ khẩu của miền. Hỏi đúng một người thì -Identity <sam>. Hỏi cả danh sách thì -Filter *, nghĩa là "lấy tất". Muốn thu hẹp về một ngăn kéo OU thì thêm -SearchBase "OU=KeToan,DC=noibo,DC=vn" — chỉ đếm người trong đúng ngăn ấy.
  - **Đào sâu hơn:** Kết quả in ra bốn dòng đáng đọc: Name (tên hiển thị), SamAccountName (tên đăng nhập), DistinguishedName (chỗ đứng trong cây thư mục) và Enabled. DistinguishedName chính là cái bạn đã học ở Module 9 dưới dạng cây OU — giờ nó hiện ra thành một dòng chữ đọc từ trong ra ngoài: CN=người, OU=ngăn kéo, DC=từng mảnh tên miền.
- *[m12-tao-user]* New-ADUser ghi thêm một dòng vào sổ. Ba mảnh cần khai: -Name "Le Thi Mai" (tên hiển thị, có dấu cách nên phải bọc nháy), -SamAccountName ltmai (tên đăng nhập), và -Path "OU=KeToan,DC=noibo,DC=vn" (đặt vào ngăn kéo nào). Thiếu -Path thì máy không biết cất người mới vào đâu.
  - **Đào sâu hơn:** Chạy xong New-ADUser, terminal im re — không một dòng thông báo. Đó là nếp của PowerShell chứ không phải lỗi: lệnh chạy trót lọt thì không nói gì, có chuyện mới lên tiếng. Muốn tận mắt xác nhận thì hỏi lại bằng Get-ADUser -Identity ltmai. Thói quen tự kiểm chứng này đáng giữ suốt nghề — nhất là khi lệnh vừa chạy tác động lên ba mươi người. Và khi kiểm chứng, để ý dòng Enabled: tài khoản tạo mà không kèm mật khẩu thì sinh ra ở trạng thái False — AD cố tình khóa lại để không có cái cửa nào mở toang mà chưa ai đặt khóa. Muốn bật thì đặt mật khẩu rồi bật riêng.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Nhân sự báo: chị Le Thi Mai vào phòng Kế toán, tên đăng nhập ltmai. Ghi chị ấy vào miền noibo.vn cho đúng ngăn kéo. Xong nhớ tự kiểm chứng — lệnh tạo sẽ không nói gì với bạn đâu.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: dc01.noibo.vn=192.168.20.10 cổng 389/445 — AD noibo.vn: OU [KeToan, NhanSu, KyThuat], 2 user sẵn có
    - **Mục tiêu:**
      - user "ltmai" phải tồn tại trong OU KeToan
    - **Lệnh mẫu:** `New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn"` rồi `Get-ADUser -Identity ltmai`
  - **Chủ đề gợi ý (tầng 1):** ba mảnh: tên hiển thị, tên đăng nhập, ngăn kéo
  - **Gợi ý (tầng 2):** Khuôn đầy đủ: New-ADUser -Name "<tên có dấu cách>" -SamAccountName <tên đăng nhập> -Path "OU=<ngăn kéo>,DC=noibo,DC=vn". Tên miền noibo.vn tách thành hai mảnh DC=noibo và DC=vn.
  - **Lời giải (tầng 3):** New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn". Terminal im lặng là dấu hiệu tốt; gõ thêm Get-ADUser -Identity ltmai sẽ thấy dòng DistinguishedName ghi rõ chị Mai đang nằm trong ngăn KeToan.
- **Đề:** Trong miền noibo.vn, đường dẫn thư mục (DistinguishedName) của ngăn kéo KyThuat viết đầy đủ ra sao?
  - **Dạng:** gõ tay · **Chấp nhận:** OU=KyThuat,DC=noibo,DC=vn | ou=kythuat,dc=noibo,dc=vn
  - **Chủ đề gợi ý (tầng 1):** tên miền tách thành từng mảnh DC=
  - **Gợi ý (tầng 2):** Đọc từ trong ra ngoài: ngăn kéo trước, rồi tới từng mảnh của tên miền. Dấu chấm trong tên miền chính là chỗ tách mảnh.
  - **Lời giải (tầng 3):** OU=KyThuat,DC=noibo,DC=vn. Ngăn kéo đứng trước, rồi mỗi mảnh của tên miền thành một DC= — noibo.vn có một dấu chấm nên tách thành hai mảnh.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đóng hết ghi chép lại nhé. Anh Hoang Van Minh vừa nhận việc ở phòng Kỹ thuật, tên đăng nhập hvminh. Ghi anh ấy vào miền từ trí nhớ của bạn.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: dc01.noibo.vn=192.168.20.10 cổng 389/445 — AD noibo.vn: OU [KeToan, NhanSu, KyThuat], 2 user sẵn có
    - **Mục tiêu:**
      - user "hvminh" phải tồn tại trong OU KyThuat
    - **Lệnh mẫu:** `New-ADUser -Name "Hoang Van Minh" -SamAccountName hvminh -Path "OU=KyThuat,DC=noibo,DC=vn"`
  - **Chủ đề gợi ý (tầng 1):** ngăn kéo lần này là KyThuat
  - **Gợi ý (tầng 2):** Vẫn ba mảnh như lúc nãy, chỉ đổi ngăn kéo trong -Path sang KyThuat. Tên có dấu cách nhớ bọc nháy kép.
  - **Lời giải (tầng 3):** New-ADUser -Name "Hoang Van Minh" -SamAccountName hvminh -Path "OU=KyThuat,DC=noibo,DC=vn".
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao New-ADUser chạy xong lại không in ra thông báo nào, và bạn nên làm gì sau đó?
  - **Nhóm ý cần chạm:** [im lặng, không in, khong in, không báo, khong bao, không nói, khong noi] · [Get-ADUser, kiểm chứng, kiem chung, kiểm tra lại, kiem tra lai, xác nhận, xac nhan]
  - **Trả lời mẫu:** Vì nếp của PowerShell là lệnh chạy trót lọt thì không nói gì, có chuyện mới lên tiếng — im lặng chính là tin tốt. Nhưng im lặng cũng có nghĩa mình chưa tận mắt thấy kết quả, nên việc nên làm ngay sau đó là hỏi lại bằng Get-ADUser -Identity <tên đăng nhập> để xác nhận người mới đã nằm đúng ngăn kéo.

**6 · Tổng kết:**
- Get-ADUser đọc sổ: -Identity hỏi một người, -Filter * lấy tất, -SearchBase thu hẹp về một OU.
- New-ADUser cần ba mảnh: -Name, -SamAccountName và -Path trỏ tới ngăn kéo OU.
- Lệnh chạy xong im lặng là bình thường — tự kiểm chứng lại bằng Get-ADUser.
- *Úp mở bài sau:* Một người thì một dòng lệnh. Ba mươi người thì vẫn một dòng — nhờ một ký tự duy nhất mà bài sau sẽ chỉ cho bạn.

### Bài: Một dòng lệnh cho cả danh sách `m12-bai-4`

**1 · Khởi động (hook):** Nhân sự gửi một file CSV có ba mươi bạn thực tập, tất cả cần tài khoản trong sáng mai. Gõ tay ba mươi lệnh mất một tiếng và chắc chắn sẽ trượt phím vài lần. Có cách nào bơm thẳng cả file vào lệnh tạo không?

**2 · Đoán thử (pretest):**
- **Đề:** Trong PowerShell, ký tự nào nối kết quả của lệnh trước làm đầu vào cho lệnh sau?
  - **Dạng:** trắc nghiệm · **Dấu ống |** ✓ / Dấu lớn hơn > / Dấu và &
  - **Chủ đề gợi ý (tầng 1):** hình dáng của một đường ống dẫn
  - **Vì sao:** Dấu ống | — hình dáng của nó chính là ẩn dụ: một đường ống dẫn đồ từ lệnh này sang lệnh kia. Dấu > là ghi ra file, còn & là chạy lệnh, cả hai đều không nối hai lệnh với nhau theo kiểu này.

**3 · Khám phá (teach):**
- *[m12-pipeline]* Dấu ống | nối hai lệnh thành một dây chuyền: thứ lệnh trái nhả ra chảy thẳng sang lệnh phải. Import-Csv nhan-vien-moi.csv đọc file thành từng bản ghi; nối tiếp | New-ADUser là mỗi bản ghi thành một tài khoản. Một dòng, ba mươi người, không trượt phím lần nào.
  - **Đào sâu hơn:** Điều làm dấu ống của PowerShell khác hẳn dòng lệnh Linux: thứ chảy trong ống không phải chữ mà là BẢN GHI có cột tên hẳn hoi. Nhờ vậy New-ADUser tự nhặt được cột Name, cột SamAccountName, cột Path trong file CSV mà bạn không phải cắt chuỗi lấy từng mảnh. Đổi lại, tên cột trong file phải khớp với thứ lệnh bên phải cần — sai tên cột là dây chuyền đứng ngay.

Đọc thêm một đoạn script thật (chỉ đọc hiểu, terminal trong bài chưa chạy được nhiều dòng):

    $ds = Import-Csv nhan-vien-moi.csv
    foreach ($n in $ds) {
      New-ADUser -Name $n.Name -SamAccountName $n.SamAccountName -Path $n.Path
    }

Đoạn này làm đúng việc mà một dòng pipeline đã làm — dài hơn nhưng cho bạn chỗ chen thêm kiểm tra ở giữa. Dân quản trị hay bắt đầu bằng một dòng, tới khi cần cẩn thận hơn mới mở nó ra thành vòng lặp như trên.

**4 · Thử tay (practice, fading 2):**
- **Đề:** File nhan-vien-moi.csv nằm sẵn trên máy, gồm bốn bạn mới của phòng Nhân sự. Tạo tài khoản cho cả bốn bằng MỘT dòng lệnh. Xem trước nội dung file rồi hãy bơm vào ống — nhìn dữ liệu trước khi tác động lên nó là thói quen đáng có.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: dc01.noibo.vn=192.168.20.10 cổng 389/445 — AD noibo.vn: OU [KeToan, NhanSu], 2 user sẵn có — file: nhan-vien-moi.csv
    - **Mục tiêu:**
      - OU NhanSu phải có ít nhất 5 user
      - user "lvcuong" phải tồn tại trong OU NhanSu
    - **Lệnh mẫu:** `Import-Csv nhan-vien-moi.csv` rồi `Import-Csv nhan-vien-moi.csv | New-ADUser` rồi `Get-ADUser -Filter * -SearchBase "OU=NhanSu,DC=noibo,DC=vn"`
  - **Chủ đề gợi ý (tầng 1):** nối hai lệnh bằng một đường ống
  - **Gợi ý (tầng 2):** Gõ Import-Csv nhan-vien-moi.csv trước để soi bảng dữ liệu. Thấy ba cột Name, SamAccountName, Path đúng thứ New-ADUser cần rồi thì nối hai lệnh lại: <lệnh đọc file> | New-ADUser.
  - **Lời giải (tầng 3):** Import-Csv nhan-vien-moi.csv | New-ADUser. Terminal im lặng như mọi lần tạo user; muốn tận mắt thấy bốn bạn mới thì Get-ADUser -Filter * -SearchBase "OU=NhanSu,DC=noibo,DC=vn". Gõ tay bốn lệnh New-ADUser riêng lẻ cũng được công nhận — bài này chấm theo kết quả trong sổ, không chấm theo cách bạn viết.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: thứ chảy trong đường ống của PowerShell là chữ thuần hay là bản ghi có cột tên?
  - **Dạng:** gõ tay · **Chấp nhận:** bản ghi | ban ghi | bản ghi có cột | ban ghi co cot | đối tượng | doi tuong | object
  - **Chủ đề gợi ý (tầng 1):** vì sao New-ADUser tự nhặt được cột SamAccountName
  - **Gợi ý (tầng 2):** Nghĩ xem vì sao lệnh bên phải tự biết cột nào là tên đăng nhập mà bạn không phải cắt chuỗi.
  - **Lời giải (tầng 3):** Là bản ghi có cột tên hẳn hoi (đối tượng), không phải chữ thuần. Nhờ vậy New-ADUser tự nhặt đúng cột Name, SamAccountName, Path — đổi lại tên cột trong file phải khớp thứ lệnh bên phải cần.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao một dòng pipeline lại an toàn hơn việc ngồi gõ tay ba mươi lệnh giống nhau?
  - **Nhóm ý cần chạm:** [gõ nhầm, go nham, trượt phím, truot phim, sai sót, sai sot, nhầm lẫn, nham lan] · [một dòng, mot dong, đồng nhất, dong nhat, lặp lại, lap lai, giống nhau, giong nhau, nhanh]
  - **Trả lời mẫu:** Vì gõ tay ba mươi lần là ba mươi cơ hội trượt phím, và một tài khoản sai ngăn kéo có thể kéo theo sai quyền. Một dòng pipeline chỉ có một chỗ để sai: chính dòng đó. Soi dữ liệu bằng Import-Csv trước rồi mới nối ống, thì mọi bản ghi được xử lý y hệt nhau, nhanh hơn và dễ kiểm lại hơn.

**6 · Tổng kết:**
- Dấu ống | đưa thứ lệnh trái nhả ra chảy thẳng sang lệnh phải.
- Import-Csv <file> | New-ADUser tạo cả danh sách bằng đúng một dòng.
- Trong ống chảy bản ghi có cột tên, nên tên cột phải khớp thứ lệnh bên phải cần.
- *Úp mở bài sau:* Bài cuối: khi sự cố đã xảy ra rồi, làm sao lôi đúng ba dòng đáng đọc ra khỏi một file log dài mười nghìn dòng?

### Bài: Lôi đúng dòng ra khỏi đống log `m12-bai-5`

**1 · Khởi động (hook):** Router rớt mạng lúc chín giờ sáng. File log của nó có mười nghìn dòng, trong đó chỉ ba dòng nói đúng chuyện. Cuộn chuột tìm bằng mắt mất nửa buổi — hay là bảo máy tự lọc?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán theo khuôn động từ-danh từ: lệnh đọc toàn bộ nội dung một file ra màn hình sẽ tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** Get-Content | get content | get-content
  - **Chủ đề gợi ý (tầng 1):** lấy - nội dung
  - **Vì sao:** Get-Content — động từ Get (lấy về), danh từ Content (nội dung). Đây là lệnh mở đầu của mọi việc đọc log; muốn lọc thì nối tiếp thêm một lệnh nữa vào sau dấu ống.

**3 · Khám phá (teach):**
- *[m12-doc-log]* Đọc log là một dây chuyền hai nhịp: Get-Content router.log đổ cả file ra, | Select-String ERROR giữ lại đúng những dòng có chứa chữ ấy. Kết quả in ra kèm số thứ tự dòng, nên bạn biết chuyện xảy ra ở đoạn nào của file mà lần tiếp.
  - **Đào sâu hơn:** Select-String cũng dùng riêng được nếu chỉ đường tới file: Select-String ERROR -Path router.log. Trong bài này nó khớp chuỗi con và không phân biệt hoa thường, nên gõ error hay ERROR đều ra. PowerShell thật còn nhận cả biểu thức chính quy — nhưng đó là chuyện của sau này; ở đây quen nếp "đọc rồi lọc" trước đã.

Mẹo nghề: lọc lấy dòng ERROR ra rồi, đừng dừng ở đó. Nhìn số thứ tự dòng, quay lại đọc vài dòng ngay TRƯỚC nó — nguyên nhân thường nằm ở đấy, còn dòng ERROR chỉ là hậu quả cuối cùng.

**4 · Thử tay (practice, fading 2):**
- **Đề:** File router.log nằm sẵn trên máy. Lôi ra dòng ghi nhận sự cố lúc chín giờ sáng — cụ thể là dòng nói về một port bị mất tín hiệu.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: router.noibo.vn=192.168.20.1 cổng 443 — file: router.log
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "link down"
    - **Lệnh mẫu:** `Get-Content router.log | Select-String ERROR`
  - **Chủ đề gợi ý (tầng 1):** đọc cả file rồi lọc bằng một từ khóa
  - **Gợi ý (tầng 2):** Hai nhịp nối bằng dấu ống: Get-Content router.log để đổ file ra, rồi | Select-String <từ khóa>. Dòng sự cố trong log này được đánh dấu bằng chữ ERROR.
  - **Lời giải (tầng 3):** Get-Content router.log | Select-String ERROR — lôi ra dòng 09:02:31 ERROR link down on port 3. Cũng có thể gõ thẳng Select-String "link down" -Path router.log nếu bạn đã biết chính xác cụm cần tìm.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đóng ghi chép lại. Người dùng than tối qua không quay VPN vào được. File vpn.log có sẵn trên máy — tự lôi dòng nói về việc xác thực hỏng ra, không nhìn lại bài.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: router.noibo.vn=192.168.20.1 cổng 443 — file: vpn.log
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "authentication failed"
    - **Lệnh mẫu:** `Get-Content vpn.log | Select-String ERROR`
  - **Chủ đề gợi ý (tầng 1):** vẫn là dây chuyền đọc rồi lọc
  - **Gợi ý (tầng 2):** Cùng một khuôn của bài vừa rồi, chỉ đổi tên file thành vpn.log. Từ khóa lọc có thể là ERROR, hoặc chính cụm failed.
  - **Lời giải (tầng 3):** Get-Content vpn.log | Select-String ERROR — ra dòng 21:10:05 ERROR authentication failed for user ttbinh. Vậy tunnel dựng được tới bước IKE, hỏng ở khâu xác thực người dùng: đi tra tài khoản ttbinh chứ không phải tra đường mạng.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao lọc được dòng ERROR rồi vẫn nên đọc mấy dòng ngay trước nó?
  - **Nhóm ý cần chạm:** [nguyên nhân, nguyen nhan, gốc, goc, trước đó, truoc do] · [hậu quả, hau qua, kết quả, ket qua, cuối cùng, cuoi cung, triệu chứng, trieu chung]
  - **Trả lời mẫu:** Vì dòng ERROR thường chỉ là hậu quả cuối cùng, còn nguyên nhân đã xảy ra vài dòng trước đó và có khi chỉ được ghi ở mức INFO. Đọc ngược lên vài dòng mới thấy được chuỗi sự việc dẫn tới lỗi, nhờ đó chữa đúng gốc thay vì chữa cái triệu chứng cuối cùng.

**6 · Tổng kết:**
- Get-Content <file> đổ cả file ra; nối | Select-String <từ khóa> để giữ đúng dòng cần.
- Kết quả kèm số thứ tự dòng — lần ngược lên vài dòng thường thấy nguyên nhân.
- Select-String dùng riêng cũng được nếu chỉ đường bằng -Path.
- *Úp mở bài sau:* Bạn vừa đóng lại chặng cuối của cả khóa học. Bài kiểm tra module này cũng là lần cuối bạn ngồi trước terminal ảo — sau đó là mạng thật.

### Khái niệm & flashcard (8)

- **Cmdlet** `m12-cmdlet` — Lệnh PowerShell, tên luôn theo khuôn Động từ - Danh từ
  - Ẩn dụ: Như gọi món trong quán: nói động từ (lấy, tạo, kiểm tra) rồi nói danh từ (địa chỉ IP, người dùng, kết nối) — không cần thuộc thực đơn cũng gọi được.
  - Thẻ ôn: *Tên cmdlet PowerShell theo khuôn nào? Cho hai ví dụ.* → Động từ - Danh từ (verb-noun): Get-NetIPAddress (lấy - địa chỉ IP), New-ADUser (tạo mới - người dùng AD). Bộ động từ chuẩn hóa: Get, Set, New, Remove, Test, Import, Export.
- **Get-NetIPAddress & Test-NetConnection** `m12-cmdlet-mang` — Hai cmdlet mạng đầu tay: đọc cấu hình máy mình và thăm dò máy khác
  - Ẩn dụ: Get-NetIPAddress là tờ giấy tùy thân của máy; Test-NetConnection là vừa gọi cửa vừa thử đúng một cánh cửa xem có ai mở.
  - Thẻ ôn: *Test-NetConnection gõ trần khác gì khi thêm -Port?* → Gõ trần thì nó ping và trả PingSucceeded (máy đích còn sống không). Thêm -Port <số> thì nó gõ đúng port đó và trả TcpTestSucceeded (dịch vụ ở port ấy có mở không). Ping True mà TcpTest False = máy sống, dịch vụ chết hoặc bị chặn.
- **Parameter** `m12-tham-so` — Tham số — cái nhãn dán vào giá trị, viết sau một dấu gạch
  - Ẩn dụ: Như ghi tên lên từng hộp đồ trước khi đưa: -Port 443, -Name "Le Thi Mai". Máy không phải đoán hộp nào đựng gì.
  - Thẻ ôn: *Viết tham số trong PowerShell theo khuôn nào, và khi nào phải bọc nháy kép?* → Một dấu gạch, tên tham số, khoảng trắng, giá trị: -Port 443. Giá trị có dấu cách thì bọc nháy kép: -Name "Le Thi Mai". Tham số đầu tiên thường được phép bỏ nhãn (tham số vị trí).
- **Get-Help** `m12-get-help` — Sổ tay cú pháp nằm sẵn trong máy, không cần mạng
  - Ẩn dụ: Như cuốn hướng dẫn kẹp sẵn trong hộp đồ nghề: gặp lệnh lạ thì mở ra đọc khối SYNTAX, không phải chạy đi hỏi ai.
  - Thẻ ôn: *Trong khối SYNTAX, [-Port <Int32>] và [-ComputerName] <String> khác nhau chỗ nào?* → [-Port <Int32>]: cả cụm trong ngoặc nên tham số này tùy chọn, bỏ hẳn cũng được. [-ComputerName] <String>: chỉ cái NHÃN nằm trong ngoặc — giá trị bắt buộc phải có, chỉ được phép bỏ nhãn (viết trần).
- **Get-ADUser** `m12-ad-doc` — Đọc sổ hộ khẩu của miền: một người, cả danh sách, hoặc một ngăn kéo
  - Ẩn dụ: Hỏi thủ thư: hỏi đích danh một người thì -Identity, mượn cả kệ thì -Filter *, giới hạn trong một ngăn thì -SearchBase.
  - Thẻ ôn: *Ba cách hỏi của Get-ADUser và tác dụng từng cách?* → -Identity <sam>: đúng một người. -Filter *: lấy tất cả user trong miền. -SearchBase "OU=...,DC=...": thu hẹp về đúng một ngăn kéo OU. Kết quả in ra Name, SamAccountName, DistinguishedName, Enabled.
- **New-ADUser** `m12-tao-user` — Ghi thêm một người vào sổ, phải nói rõ cất vào ngăn kéo nào
  - Ẩn dụ: Điền phiếu nhập hộ khẩu: họ tên, tên đăng nhập, và số nhà — thiếu số nhà thì thư ký không biết xếp phiếu vào ngăn nào.
  - Thẻ ôn: *New-ADUser cần những mảnh nào, và vì sao chạy xong không thấy thông báo?* → -Name (tên hiển thị, có dấu cách thì bọc nháy), -SamAccountName (tên đăng nhập), -Path "OU=<ngăn>,DC=<miền>,DC=<đuôi>". Im lặng là nếp PowerShell: chạy trót lọt thì không nói gì. Tự kiểm chứng bằng Get-ADUser -Identity <sam> — và nhìn dòng Enabled: chưa có mật khẩu thì tài khoản mới sinh ra đang bị khóa (False).
- **Pipeline** `m12-pipeline` — Dấu ống | nối lệnh trước làm đầu vào cho lệnh sau
  - Ẩn dụ: Một đường ống dẫn: đầu này đổ danh sách vào, đầu kia tài khoản mọc ra — không phải bê từng thùng một.
  - Thẻ ôn: *Import-Csv nhan-vien-moi.csv | New-ADUser làm gì, và thứ chảy trong ống là gì?* → Đọc file CSV thành từng bản ghi rồi tạo một tài khoản cho mỗi bản ghi — cả danh sách trong một dòng. Trong ống chảy BẢN GHI có cột tên (không phải chữ thuần), nên tên cột phải khớp thứ lệnh bên phải cần: Name, SamAccountName, và Path chứa đường dẫn OU đầy đủ (bọc nháy kép vì trong DN có dấu phẩy).
- **Get-Content & Select-String** `m12-doc-log` — Dây chuyền đọc log: đổ cả file ra rồi giữ lại đúng dòng cần
  - Ẩn dụ: Đổ cả rổ ra bàn rồi lấy nam châm hút đúng mấy cái đinh — nhanh hơn ngồi bới từng nắm.
  - Thẻ ôn: *Lọc dòng ERROR trong file router.log bằng dòng lệnh nào?* → Get-Content router.log | Select-String ERROR. Kết quả kèm số thứ tự dòng — đọc ngược lên vài dòng trước đó thường thấy nguyên nhân, vì dòng ERROR chỉ là hậu quả cuối cùng.

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Tên mọi cmdlet PowerShell đều ghép theo khuôn hai mảnh nào?
  - **Dạng:** gõ tay · **Chấp nhận:** động từ - danh từ | động từ danh từ | dong tu - danh tu | dong tu danh tu | verb-noun | verb noun | động từ và danh từ | dong tu va danh tu
  - **Chủ đề gợi ý (tầng 1):** làm GÌ với CÁI GÌ
  - **Vì sao:** Động từ - Danh từ. Nhờ khuôn này bạn đoán được tên lệnh chưa từng gặp: muốn lấy nội dung file thì Get-Content, muốn tạo user thì New-ADUser.
- **Đề:** Test-NetConnection tới một máy chủ trả về PingSucceeded : True nhưng TcpTestSucceeded : False. Kết luận đúng nhất là gì?
  - **Dạng:** trắc nghiệm · **Máy đích vẫn sống, dịch vụ ở port đó không chạy hoặc bị chặn** ✓ / Máy đích đã tắt hẳn nên không trả lời gì cả / Máy của bạn chưa có địa chỉ IP hợp lệ nên không đi ra được
  - **Chủ đề gợi ý (tầng 1):** hai dòng kết quả đo hai thứ khác nhau
  - **Vì sao:** PingSucceeded True chứng minh máy đích còn sống và đường đi còn thông. TcpTestSucceeded False nói riêng về cánh cửa đó: dịch vụ không chạy, hoặc tường lửa chặn đúng port ấy. Máy tắt hẳn thì ping đã False rồi.
- **Đề:** Bạn gặp cmdlet lạ và cần biết nó nhận tham số nào. Gõ dòng nào ngay trong terminal để máy tự khai cú pháp?
  - **Dạng:** gõ tay · **Chấp nhận:** Get-Help | get help | get-help | gethelp
  - **Chủ đề gợi ý (tầng 1):** lấy - trợ giúp
  - **Vì sao:** Get-Help <tên lệnh>. Khối SYNTAX in ra cho biết tham số nào bắt buộc, tham số nào nằm trong ngoặc vuông (tùy chọn) — đọc được nó là tự học được mọi cmdlet.
- **Đề:** Muốn liệt kê mọi user nằm trong OU tên NhanSu của miền noibo.vn, bạn thêm tham số nào vào Get-ADUser -Filter * để thu hẹp phạm vi?
  - **Dạng:** gõ tay · **Chấp nhận:** -SearchBase | SearchBase | -searchbase | searchbase | search base
  - **Chủ đề gợi ý (tầng 1):** chỉ cho lệnh biết bắt đầu tìm từ ngăn kéo nào
  - **Vì sao:** -SearchBase "OU=NhanSu,DC=noibo,DC=vn". Không có nó thì -Filter * quét cả miền; có nó thì chỉ đếm người trong đúng ngăn kéo đó.
- **Đề:** Bạn chạy New-ADUser và terminal không in ra một chữ nào. Điều này nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Bình thường — chạy trót lọt thì PowerShell im lặng** ✓ / Lệnh hỏng giữa chừng nên chưa kịp in gì ra màn hình / Tài khoản đã được tạo nhưng đang chờ phê duyệt
  - **Chủ đề gợi ý (tầng 1):** nếp của PowerShell khi mọi việc êm xuôi
  - **Vì sao:** Im lặng là tin tốt: PowerShell chỉ lên tiếng khi có chuyện. Nhưng vì mắt chưa thấy gì, thói quen nghề là hỏi lại ngay bằng Get-ADUser -Identity <tên đăng nhập> — nhất là khi lệnh vừa tác động lên cả danh sách.
- **Đề:** Ký tự nào nối kết quả của lệnh trước làm đầu vào cho lệnh sau?
  - **Dạng:** gõ tay · **Chấp nhận:** | | dấu | | dau | | dấu ống | dau ong | ống | ong | dấu gạch đứng | dau gach dung | pipeline | pipe
  - **Chủ đề gợi ý (tầng 1):** hình dáng một đường ống dẫn
  - **Vì sao:** Dấu ống |. Trong PowerShell thứ chảy qua nó là bản ghi có cột tên, nên lệnh bên phải tự nhặt đúng cột mình cần.
- **Đề:** Cmdlet nào đọc ra địa chỉ IP đang đặt trên các card mạng của chính máy bạn?
  - **Dạng:** gõ tay · **Chấp nhận:** get-netipaddress | getnetipaddress | get netipaddress | get-netipaddress -addressfamily ipv4
  - **Chủ đề gợi ý (tầng 1):** cmdlet đọc giấy tờ mạng của máy mình
  - **Vì sao:** Get-NetIPAddress — vai trò như ipconfig ở Module 11, nhưng trả về bản ghi có cột nên lọc được và nối tiếp được bằng dấu ống.
- **Đề:** Trong dòng Get-ADUser -Filter * -SearchBase "OU=NhanSu,DC=noibo,DC=vn", hai chữ mở đầu bằng dấu gạch là gì?
  - **Dạng:** trắc nghiệm · **Tham số — cái nhãn nói giá trị đứng sau nó mang nghĩa gì** ✓ / Tên hai cmdlet phụ chạy kèm cmdlet chính ở đầu dòng / Chú thích dành cho người đọc, PowerShell bỏ qua chúng khi chạy
  - **Chủ đề gợi ý (tầng 1):** chữ đứng sau dấu gạch trong một dòng lệnh
  - **Vì sao:** Tham số là nhãn dán vào giá trị: -Filter nói "lọc theo cái này", -SearchBase nói "tìm trong ngăn kéo này". Nhờ có nhãn nên thứ tự viết không quan trọng.
- **Đề:** Bạn đổ cả file log ra bằng Get-Content rồi muốn giữ lại đúng những dòng chứa chữ ERROR. Nối tiếp bằng cmdlet nào?
  - **Dạng:** gõ tay · **Chấp nhận:** select-string | selectstring | select string
  - **Chủ đề gợi ý (tầng 1):** cmdlet giữ lại dòng khớp chữ cần tìm
  - **Vì sao:** Get-Content đổ cả file ra, Select-String giữ lại dòng khớp. Một lệnh lấy, một lệnh lọc, nối nhau bằng dấu ống — đó là dây chuyền đọc log.
- **Đề:** Vì sao nối thẳng Import-Csv vào New-ADUser bằng dấu ống là chạy được?
  - **Dạng:** trắc nghiệm · **Vì tên cột trong CSV khớp tên tham số mà New-ADUser nhận** ✓ / Vì New-ADUser tự đọc file CSV nếu thấy dấu ống đứng trước nó / Vì PowerShell tự đoán thứ tự cột theo đúng thứ tự tham số
  - **Chủ đề gợi ý (tầng 1):** pipeline khớp cột CSV với tham số
  - **Vì sao:** Pipeline nối theo TÊN: mỗi dòng CSV thành một bản ghi, cột Name rơi vào -Name, cột Path rơi vào -Path. Đặt sai tên cột là dây chuyền đứt ngay.
- **Đề:** Việc thật: file thuc-tap-sinh.csv có ba bạn thực tập cần tài khoản trong OU KyThuat. Tạo đủ cả ba.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: dc01.noibo.vn=192.168.20.10 cổng 389/445 — AD noibo.vn: OU [KeToan, NhanSu, KyThuat], 2 user sẵn có — file: thuc-tap-sinh.csv
    - **Mục tiêu:**
      - OU KyThuat phải có ít nhất 3 user
      - user "btlan" phải tồn tại trong OU KyThuat
    - **Lệnh mẫu:** `Import-Csv thuc-tap-sinh.csv | New-ADUser`
  - **Chủ đề gợi ý (tầng 1):** cả danh sách đi qua một đường ống
  - **Vì sao:** Import-Csv thuc-tap-sinh.csv | New-ADUser — file có sẵn ba cột Name, SamAccountName, Path đúng thứ lệnh bên phải cần, nên cả ba tài khoản mọc ra trong một dòng. Gõ tay ba lệnh New-ADUser riêng cũng được công nhận: bài chấm theo kết quả trong sổ, không chấm cách viết.
- **Đề:** Câu cuối của cả khóa học. Máy trong phòng họp sáng nay không xin được địa chỉ IP. File dhcp.log nằm trên máy bạn — lôi ra dòng nói đúng nguyên nhân.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [192.168.20.5/24] — đích: router.noibo.vn=192.168.20.1 cổng 443 — file: dhcp.log
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "pool exhausted"
    - **Lệnh mẫu:** `Get-Content dhcp.log | Select-String ERROR`
  - **Chủ đề gợi ý (tầng 1):** đọc cả file rồi lọc lấy dòng đáng đọc
  - **Vì sao:** Get-Content dhcp.log | Select-String ERROR lôi ra dòng dhcp pool exhausted on scope 192.168.20.0 — dải địa chỉ cho thuê đã hết sạch, nên máy mới xin không còn gì để cấp. Đây là bệnh của Module 6 quay lại, lần này bạn bắt được nó bằng một dòng lệnh.

## VLSM — Cắt đất cho đúng người `module-13`

Phần D · 5 chặng · 5 bài · 6 khái niệm · drill: vlsm

**Chặng:** Chia đều là phí đất (m13-bai-1) → Cắt phòng to trước (m13-bai-2) → Đứng đúng ranh giới (m13-bai-3) → Mặt nạ lộn ngược (m13-bai-4) → Gom tuyến cho gọn bảng (m13-bai-5)

### Bài: Cứu dải địa chỉ bị chia đều `m13-bai-1`

**1 · Khởi động (hook):** Công ty có bốn phòng: kinh doanh 100 máy, kế toán 50, kỹ thuật 25, giám đốc 10. Người làm mạng trước bạn lấy dải 192.168.10.0/24 chia đều làm bốn phần, mỗi phòng một /26. Tuần đầu tiên, phòng kinh doanh đã kêu hết địa chỉ, còn phòng giám đốc bỏ không hơn năm mươi chỗ. Cùng một dải ấy, chia thế nào mới đủ?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: một mạng /26 cấp được cho bao nhiêu máy?
  - **Dạng:** trắc nghiệm · 64 máy / **62 máy** ✓ / 26 máy
  - **Vì sao:** /26 có 64 địa chỉ, nhưng hai địa chỉ đầu và cuối đã có chủ: một làm địa chỉ mạng, một làm broadcast. Còn lại 62 chỗ cho máy thật.

**3 · Khám phá (teach):**
- *[vlsm]* Chia đều là cách chia của người không nhìn người ở. VLSM (Variable Length Subnet Mask — mặt nạ mạng dài ngắn khác nhau) làm ngược lại: mỗi phòng một cỡ lô, cắt vừa số máy của phòng đó. Cùng dải 192.168.10.0/24, phòng 100 máy nhận một /25, phòng 50 máy nhận /26, phòng 25 máy nhận /27, phòng 10 máy nhận /28 — cộng lại vẫn nằm gọn trong dải, mà không phòng nào thiếu chỗ.
  - **Đào sâu hơn:** Chia đều là thói quen từ thời trước CIDR, khi mỗi mạng chỉ có một subnet mask duy nhất áp cho tất cả. Router hiện đại gắn mặt nạ theo TỪNG tuyến nên mỗi subnet mang mask riêng được — đó chính là chữ Variable trong VLSM. Cũng vì thế mà bảng định tuyến ghi kèm prefix cho từng dòng, chứ không ghi một mask chung cho cả mạng.
- *[co-khoi-vua-du]* Cỡ khối chỉ nhảy theo lũy thừa của 2: /28 là 16 địa chỉ, /27 là 32, /26 là 64, /25 là 128. Mỗi khối mất hai địa chỉ cho mạng và broadcast, nên số máy dùng được là 14, 30, 62, 126. Quy tắc chọn cỡ: lấy số máy của phòng, cộng 2, rồi tìm bậc thấp nhất còn chứa nổi. Phòng 50 máy cần 52 chỗ, /27 chỉ có 32 nên trượt, /26 có 64 nên vừa — chọn /26.
  - **Đào sâu hơn:** Cộng 2 rồi mới so là cách nhẩm an toàn hơn so trực tiếp: phòng đúng 30 máy nhìn qua tưởng /27 (30 host) là khít, nhưng nếu ngày mai thêm một máy in mạng thì hết chỗ ngay. Người làm nghề thường cộng thêm khoảng 20% dự phòng trước khi chọn cỡ — dải địa chỉ riêng thì rẻ, còn đi chia lại cả mạng thì đắt.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Cắt dải 192.168.10.0/24 cho bốn phòng 100 / 50 / 25 / 10 máy. Bước 1 — chọn cỡ cho từng phòng: 100 máy cần 102 chỗ nên lấy /25 (126 chỗ); 50 máy lấy /26 (62); 25 máy lấy /27 (30); 10 máy lấy /28 (14). Bước 2 — xếp từ đầu dải, khối to đi trước: kinh doanh 192.168.10.0/25 chiếm .0 tới .127; kế toán 192.168.10.128/26 chiếm .128 tới .191; kỹ thuật 192.168.10.192/27 chiếm .192 tới .223; giám đốc 192.168.10.224/28 chiếm .224 tới .239. Bước 3 — soi lại: bốn khối không giẫm lên nhau, còn dư 16 địa chỉ cuối dải (.240 tới .255) để dành cho phòng mới. Cùng một dải mà chia đều thì phòng kinh doanh chết ngay từ dòng đầu.
- **Đề:** Phòng kho có 28 máy và sắp thêm 2 máy quét mã. Prefix nhỏ nhất đủ dùng cho phòng này là bao nhiêu (dạng /xx)?
  - **Dạng:** gõ tay · **Chấp nhận:** /27 | 27 | 255.255.255.224
  - **Chủ đề gợi ý (tầng 1):** số chỗ thật của từng cỡ khối sau khi trừ 2
  - **Gợi ý (tầng 2):** Phòng cần 30 chỗ. Đi từ bậc nhỏ lên: /28 cho 14 chỗ — thiếu; bậc kế tiếp cho 30 chỗ — vừa khít. Bậc kế tiếp đó là prefix nào?
  - **Lời giải (tầng 3):** Là /27: nó có 32 địa chỉ, trừ địa chỉ mạng và broadcast còn đúng 30 chỗ cho 30 máy. Lấy /26 thì chạy được nhưng bỏ phí 32 địa chỉ; lấy /28 thì thiếu hẳn 16 chỗ.
- **Đề:** Vì sao chia đều dải /24 thành bốn phần /26 lại hỏng với bộ nhu cầu 100 / 50 / 25 / 10 máy?
  - **Dạng:** trắc nghiệm · **Vì /26 không đủ chỗ cho phòng 100 máy, trong khi phòng 10 máy bỏ không hơn năm mươi địa chỉ** ✓ / Vì một dải /24 chỉ được cắt thành tối đa hai mạng con, cắt bốn phần là vượt giới hạn / Vì các mạng con của cùng một dải bắt buộc phải mang cùng một subnet mask
  - **Chủ đề gợi ý (tầng 1):** cỡ lô so với số người ở của từng phòng
  - **Gợi ý (tầng 2):** Đếm thử: /26 có 62 chỗ. Phòng 100 máy nhét vừa không? Còn phòng 10 máy thì thừa bao nhiêu?
  - **Lời giải (tầng 3):** Vì cắt đều là cắt theo cái lô, không theo người ở: 62 chỗ không chứa nổi 100 máy, còn phòng 10 máy ôm 62 chỗ thì bỏ hoang 52. Một dải /24 cắt được nhiều hơn hai mạng con, và mỗi mạng con hoàn toàn được mang mask riêng — đó chính là VLSM.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: phòng 100 máy cần prefix nhỏ nhất là bao nhiêu (dạng /xx)?
  - **Dạng:** gõ tay · **Chấp nhận:** /25 | 25 | 255.255.255.128
  - **Gợi ý (tầng 2):** Phòng cần 102 chỗ. /26 cho 62 chỗ — thiếu. Bậc ngay trên /26 là bậc nào?
  - **Lời giải (tầng 3):** Là /25: 128 địa chỉ, còn 126 chỗ dùng được — đủ cho 100 máy và còn dư chỗ cho máy mới.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao chia một dải thành các phần BẰNG NHAU lại vừa thiếu vừa thừa?
  - **Nhóm ý cần chạm:** [nhu cầu, số máy, số lượng máy, người ở] · [khác nhau, không giống nhau, chênh lệch] · [thiếu chỗ, không đủ, hết địa chỉ] · [bỏ phí, lãng phí, thừa, bỏ hoang]
  - **Trả lời mẫu:** Vì các phòng có số máy khác nhau hẳn nhau. Cắt lô bằng nhau thì phòng đông máy không đủ chỗ, còn phòng ít máy ôm một đống địa chỉ bỏ hoang. Cắt theo nhu cầu từng phòng mới vừa.

**6 · Tổng kết:**
- VLSM là cắt mỗi phòng một cỡ lô theo số máy, không cắt đều.
- Cỡ khối nhảy theo lũy thừa 2, và mỗi khối mất 2 địa chỉ cho mạng và broadcast.
- Chọn cỡ: số máy cộng 2, rồi lấy bậc thấp nhất còn chứa đủ.
- *Úp mở bài sau:* Biết cỡ của từng phòng rồi, nhưng cắt phòng nào trước? Bài sau cho bạn xem hai người cùng bộ nhu cầu, cắt hai thứ tự — một người vừa khít, một người hết chỗ giữa chừng.

### Bài: Xếp thứ tự cắt cho khỏi kẹt `m13-bai-2`

**1 · Khởi động (hook):** Hai người cùng nhận dải 192.168.10.0/24 và cùng bộ nhu cầu 100 / 50 / 25 / 10 máy. Người thứ nhất cắt phòng 10 máy trước, người thứ hai cắt phòng 100 máy trước. Người thứ hai xếp gọn cả bốn phòng; người thứ nhất tới phòng cuối thì hết chỗ đứng. Cùng số địa chỉ, sao lại lệch nhau?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: khi cắt VLSM, nên bắt đầu từ phòng nào?
  - **Dạng:** trắc nghiệm · **Phòng đông máy nhất** ✓ / Phòng ít máy nhất / Phòng nào cũng như nhau
  - **Vì sao:** Khối to kén chỗ đứng hơn hẳn khối nhỏ: một /25 chỉ đứng được ở hai vạch trong cả dải /24. Cắt nó trước, khi dải còn nguyên, thì chắc chắn có chỗ; để lại sau cùng thì phần trống còn lại thường đã bị cắt vụn.

**3 · Khám phá (teach):**
- *[cat-lon-truoc]* Luật cắt VLSM chỉ có một câu: xếp nhu cầu giảm dần rồi cắt từ khối to nhất, lấp liên tiếp từ đầu dải. Với 100 / 50 / 25 / 10 máy: /25 nằm ở .0, /26 tiếp ngay ở .128, /27 ở .192, /28 ở .224 — không hở khe nào. Nếu cắt phòng 10 máy trước và đặt nó ở .0, thì phần còn lại bắt đầu từ .16, mà một /25 không được phép đứng ở .16 — thế là kẹt dù tổng số địa chỉ vẫn thừa.
  - **Đào sâu hơn:** Đây chính là bài toán xếp hộp: khối càng to thì càng ít chỗ đặt hợp lệ, nên phải đặt nó trước lúc mặt bằng còn nguyên. Trong cả dải /24 có 256 địa chỉ, một khối /25 chỉ có đúng hai chỗ đứng (.0 và .128), còn một khối /28 có mười sáu chỗ. Cắt to trước là cách chắc chắn không bao giờ phải cắt đi cắt lại — và nó cũng là thứ tự mà mọi đề thi chứng chỉ mạng chấm.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Dải 192.168.20.0/24, ba phòng: 60 / 12 / 28 máy. Cắt đúng thứ tự thì phòng 60 máy đứng ở địa chỉ mạng nào? Điền dạng đầy đủ, ví dụ 192.168.20.x
  - **Dạng:** gõ tay · **Chấp nhận:** 192.168.20.0 | 192.168.20.0/26
  - **Chủ đề gợi ý (tầng 1):** khối to nhất được cắt trước, ngay từ đầu dải
  - **Gợi ý (tầng 2):** Điền chỗ trống: phòng to nhất là phòng … máy, nó nhận cỡ /26, và vì cắt trước tiên nên nó đứng ngay ở đầu dải là 192.168.20.…
  - **Lời giải (tầng 3):** 192.168.20.0/26. Phòng 60 máy là phòng to nhất nên được cắt trước, đặt ngay đầu dải; sau nó là phòng 28 máy ở 192.168.20.64/27, rồi phòng 12 máy ở 192.168.20.96/28.
- **Đề:** Vẫn dải 192.168.20.0/24 và ba phòng 60 / 12 / 28 máy, nhưng người làm cắt phòng 12 máy trước và đặt nó ở 192.168.20.0/28. Hậu quả gần nhất là gì?
  - **Dạng:** trắc nghiệm · **Phần trống còn lại bắt đầu ở .16, mà khối /26 của phòng 60 máy không được phép đứng ở đó** ✓ / Phòng 12 máy sẽ mất kết nối vì khối /28 luôn phải nằm ở cuối dải địa chỉ / Cả ba phòng vẫn xếp vừa, chỉ là bảng định tuyến của router dài thêm một dòng
  - **Chủ đề gợi ý (tầng 1):** chỗ đứng hợp lệ của một khối lớn
  - **Gợi ý (tầng 2):** Khối /26 rộng 64 địa chỉ nên chỉ đứng được ở .0, .64, .128, .192. Sau khi .0 tới .15 đã có chủ, khối ấy còn cửa nào không mất thêm đất?
  - **Lời giải (tầng 3):** Phần trống bắt đầu ở .16 nhưng /26 chỉ đứng được ở .0, .64, .128 hoặc .192 — muốn nhét vào thì phải bỏ trống từ .16 tới .63, tức là mất không 48 địa chỉ. Khối /28 đứng ở cuối dải hay đầu dải đều được; vấn đề nằm ở THỨ TỰ cắt, không phải ở chỗ đứng của nó.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: khi cắt VLSM, phòng nào được cắt trước — phòng đông máy nhất hay ít máy nhất?
  - **Dạng:** gõ tay · **Chấp nhận:** đông máy nhất | phòng đông máy nhất | nhiều máy nhất | phòng nhiều máy nhất | to nhất | phòng to nhất | lớn nhất | phòng lớn nhất | dong may nhat | nhieu may nhat | to nhat | lon nhat
  - **Gợi ý (tầng 2):** Khối nào kén chỗ đứng hơn thì phải xếp lúc mặt bằng còn nguyên.
  - **Lời giải (tầng 3):** Phòng đông máy nhất. Khối to có rất ít chỗ đứng hợp lệ, nên cắt nó trước là cách duy nhất chắc chắn không phải cắt lại từ đầu.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao cắt khối to trước lại tránh được cảnh hết chỗ giữa chừng?
  - **Nhóm ý cần chạm:** [khối to, khối lớn, phòng to, phòng đông, mạng lớn] · [ít chỗ đứng, kén chỗ, chỗ đặt, vạch, ranh giới] · [cắt trước, làm trước, ưu tiên, xếp trước]
  - **Trả lời mẫu:** Vì khối càng to thì càng ít chỗ đứng hợp lệ — một /25 chỉ đứng được ở hai vạch trong cả dải /24. Cắt nó lúc dải còn nguyên thì luôn có chỗ; để nó lại sau cùng thì phần trống đã bị cắt vụn, có đủ địa chỉ cũng không nhét vừa.

**6 · Tổng kết:**
- Xếp nhu cầu giảm dần rồi cắt từ khối to nhất, lấp liên tiếp từ đầu dải.
- Khối càng to càng ít chỗ đứng hợp lệ — nên nó phải được xếp trước.
- Đủ tổng số địa chỉ vẫn có thể kẹt, nếu cắt sai thứ tự.
- *Úp mở bài sau:* Bài sau mổ xẻ đúng cái luật vừa nhắc tới ba lần: vì sao một khối /26 chỉ được đứng ở .0, .64, .128 và .192, chứ không phải chỗ nào cũng được?

### Bài: Đặt khối đúng vạch `m13-bai-3`

**1 · Khởi động (hook):** Bạn cấp cho phòng kế toán khối 192.168.10.160/26 — địa chỉ đọc lên nghe rất gọn gàng. Nhưng router từ chối nhận, và máy nào cấu hình theo cũng không nói chuyện được với ai. Con số 160 sai ở chỗ nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: một khối /27 được phép bắt đầu ở địa chỉ nào?
  - **Dạng:** trắc nghiệm · **.0, .32, .64, .96 …** ✓ / .0, .27, .54, .81 … / Bất kỳ địa chỉ nào còn trống
  - **Vì sao:** Khối /27 rộng 32 địa chỉ, nên nó chỉ được bắt đầu ở những mốc chia hết cho 32. Con số 27 là số bit phần mạng, không phải bước nhảy của khối.

**3 · Khám phá (teach):**
- *[can-khoi]* Một subnet chỉ được bắt đầu ở địa chỉ chia hết cho chính cỡ của nó — đó là luật căn khối. Khối /26 rộng 64 nên chỉ đứng được ở .0, .64, .128, .192; khối /27 rộng 32 nên đứng ở .0, .32, .64, .96 và cứ thế. Vì vậy 192.168.10.160/26 là địa chỉ không tồn tại: 160 không chia hết cho 64. Nếu bạn gõ nó vào, thiết bị sẽ tự hiểu thành khối .128/26 — tức là bạn nghĩ một đằng, mạng chạy một nẻo.
  - **Đào sâu hơn:** Luật này chính là magic number của Module 3 nhìn từ phía người thiết kế. Ở đó bạn lấy 256 trừ đi ô cuối của mask để biết bước nhảy; ở đây bạn dùng chính bước nhảy ấy làm danh sách chỗ đứng hợp lệ. Lý do sâu xa nằm ở nhị phân: phần mạng phải là các bit đầu giống hệt nhau cho mọi địa chỉ trong khối, mà điều đó chỉ đúng khi khối bắt đầu ở bội số của cỡ nó.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Bạn vừa cấp 192.168.10.0/25 cho phòng kinh doanh. Khối kế tiếp bắt đầu ở địa chỉ nào? Điền dạng đầy đủ.
  - **Dạng:** gõ tay · **Chấp nhận:** 192.168.10.128
  - **Chủ đề gợi ý (tầng 1):** khối vừa cấp chiếm tới đâu thì khối sau bắt đầu từ đó
  - **Gợi ý (tầng 2):** Điền chỗ trống: /25 rộng … địa chỉ, chiếm từ .0 tới .127, nên chỗ trống kế tiếp bắt đầu ở .…
  - **Lời giải (tầng 3):** 192.168.10.128. Khối /25 rộng 128 địa chỉ, ăn từ .0 tới .127; địa chỉ còn trống đầu tiên là .128 — và may thay 128 cũng chia hết cho mọi cỡ khối nhỏ hơn, nên khối sau đứng đó là hợp lệ.
- **Đề:** Khối nào dưới đây KHÔNG hợp lệ?
  - **Dạng:** trắc nghiệm · 192.168.10.96/27 / **192.168.10.96/26** ✓ / 192.168.10.64/26
  - **Chủ đề gợi ý (tầng 1):** địa chỉ đầu khối phải chia hết cho cỡ khối
  - **Gợi ý (tầng 2):** Với mỗi dòng, lấy số cuối chia cho cỡ khối: /27 rộng 32, /26 rộng 64. Dòng nào chia không hết?
  - **Lời giải (tầng 3):** 192.168.10.96/26 là dòng hỏng: 96 chia cho 64 không hết. Còn 96 chia hết cho 32 nên 96/27 hợp lệ, và 64 chia hết cho 64 nên 64/26 cũng hợp lệ.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: khối /26 nằm ngay sau 192.168.10.64/26 bắt đầu ở địa chỉ nào? Điền dạng đầy đủ.
  - **Dạng:** gõ tay · **Chấp nhận:** 192.168.10.128
  - **Gợi ý (tầng 2):** Cứ cộng đúng cỡ khối vào địa chỉ đầu của khối trước.
  - **Lời giải (tầng 3):** 192.168.10.128 — khối /26 rộng 64 địa chỉ, nên 64 cộng 64 là 128. Các mốc hợp lệ của /26 luôn là .0, .64, .128, .192.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao 192.168.10.160/26 là một khối không tồn tại?
  - **Nhóm ý cần chạm:** [chia hết, bội số, chia được, đúng vạch] · [cỡ khối, 64, độ rộng, kích thước] · [không hợp lệ, không tồn tại, sai, bị hiểu thành]
  - **Trả lời mẫu:** Vì khối /26 rộng 64 địa chỉ, mà 160 không chia hết cho 64. Khối chỉ được bắt đầu ở các mốc .0, .64, .128, .192; gõ 160 vào thì thiết bị tự quy về khối .128/26 chứ không tạo ra khối mới nào.

**6 · Tổng kết:**
- Một subnet chỉ được bắt đầu ở địa chỉ chia hết cho cỡ của chính nó.
- Cỡ khối là bước nhảy: /26 nhảy 64, /27 nhảy 32, /28 nhảy 16.
- Gõ sai vạch thì thiết bị tự quy về khối gần nhất — mạng chạy khác điều bạn nghĩ.
- *Úp mở bài sau:* Ba bài vừa rồi bạn luôn viết mặt nạ kiểu 255.255.255.192. Bài sau, router sẽ đòi bạn viết đúng mạng đó thành 0.0.0.63 — và đó không phải trò đánh đố.

### Bài: Đọc được mặt nạ lộn ngược `m13-bai-4`

**1 · Khởi động (hook):** Bạn khai một mạng vào router. Chỗ cấu hình định tuyến và chỗ viết luật lọc đều bắt gõ 0.0.0.63, trong khi trên máy tính vẫn là 255.255.255.192. Cùng một mạng, vì sao lại có hai kiểu mặt nạ ngược nhau?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: wildcard mask của một mạng /24 là gì?
  - **Dạng:** trắc nghiệm · **0.0.0.255** ✓ / 255.255.255.0 / 0.0.0.24
  - **Vì sao:** Wildcard là mặt nạ lộn ngược: lấy 255 trừ từng ô của subnet mask. Mạng /24 có mask 255.255.255.0 nên wildcard là 0.0.0.255.

**3 · Khám phá (teach):**
- *[wildcard-mask]* Wildcard mask là mặt nạ lộn ngược của subnet mask: bit 0 nghĩa là ô này phải khớp đúng, bit 1 nghĩa là ô này mặc kệ. Cách tính nhanh: lấy 255 trừ đi từng ô. Mask 255.255.255.192 thành wildcard 0.0.0.63; mask 255.255.255.0 thành 0.0.0.255; mask 255.255.0.0 thành 0.0.255.255. Router dùng dạng này ở hai chỗ bạn sẽ gặp ngay ở các module sau: khai mạng cho định tuyến động, và viết luật lọc gói tin.
  - **Đào sâu hơn:** Vì sao lại có hai kiểu ngược nhau? Vì subnet mask trả lời câu hỏi của một máy — phần nào của địa chỉ là mạng của tôi; còn wildcard trả lời câu hỏi của một bộ lọc — những bit nào tôi được phép bỏ qua khi đối chiếu. Wildcard vì thế linh hoạt hơn mask: nó cho phép những mẫu mà mask không viết nổi — ví dụ nền 10.0.0.1 với wildcard 0.0.0.254 nghĩa là GIỮ bit cuối bằng 1 còn các bit giữa mặc kệ, tức tóm riêng mọi địa chỉ LẺ trong dải /24; không subnet mask nào tả nổi một nhóm như vậy vì mask bắt buộc phần khớp phải nằm liền bên trái. Trong phạm vi khóa này bạn chỉ cần dạng lộn ngược đơn giản, nhưng biết lý do thì không bao giờ gõ nhầm hai chỗ cho nhau.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Mạng 192.168.10.0/27 có wildcard mask là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** 0.0.0.31
  - **Chủ đề gợi ý (tầng 1):** 255 trừ đi từng ô của subnet mask
  - **Gợi ý (tầng 2):** Mask của /27 là 255.255.255.224. Lấy 255 trừ từng ô: 255 trừ 255 là 0, còn ô cuối 255 trừ 224 là bao nhiêu?
  - **Lời giải (tầng 3):** 0.0.0.31. Mask của /27 là 255.255.255.224, và 255 trừ 224 bằng 31 — cũng chính là số địa chỉ trong khối trừ đi 1.
- **Đề:** Trong wildcard mask, một bit mang giá trị 1 có nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Bit tương ứng của địa chỉ được bỏ qua khi đối chiếu** ✓ / Bit tương ứng của địa chỉ bắt buộc phải khớp đúng / Bit tương ứng thuộc phần mạng chứ không thuộc phần máy
  - **Chủ đề gợi ý (tầng 1):** vai trò ngược nhau của bit 0 và bit 1 trong wildcard
  - **Gợi ý (tầng 2):** Wildcard là mặt nạ của bộ lọc, và cái tên của nó chính là gợi ý: wildcard nghĩa là quân bài thay được cho mọi quân khác.
  - **Lời giải (tầng 3):** Bit 1 nghĩa là bỏ qua, bit 0 nghĩa là phải khớp — ngược hẳn với subnet mask. Còn chuyện bit nào thuộc phần mạng là việc của subnet mask, không phải của wildcard.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: subnet mask 255.255.255.240 đổi sang wildcard mask là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** 0.0.0.15
  - **Gợi ý (tầng 2):** Ba ô đầu đều là 255 trừ 255. Ô cuối: 255 trừ 240.
  - **Lời giải (tầng 3):** 0.0.0.15 — tương ứng mạng /28, khối 16 địa chỉ nên wildcard là 15.
- **Tự giải thích:** Giải thích bằng lời của bạn: wildcard mask khác subnet mask ở chỗ nào, và tính nó thế nào?
  - **Nhóm ý cần chạm:** [lộn ngược, ngược lại, đảo, nghịch đảo] · [255 trừ, lấy 255, trừ đi] · [bỏ qua, mặc kệ, không cần khớp, phải khớp]
  - **Trả lời mẫu:** Wildcard là mặt nạ lộn ngược của subnet mask, tính bằng cách lấy 255 trừ đi từng ô. Trong wildcard, bit 0 là chỗ phải khớp đúng, bit 1 là chỗ được bỏ qua — nên router dùng nó khi cần đối chiếu một dải địa chỉ.

**6 · Tổng kết:**
- Wildcard mask là subnet mask lộn ngược: lấy 255 trừ từng ô.
- Bit 0 là phải khớp, bit 1 là bỏ qua — ngược hẳn subnet mask.
- Router đòi dạng này khi khai mạng cho định tuyến và khi viết luật lọc.
- *Úp mở bài sau:* Chi nhánh của bạn có bốn mạng con liền nhau, và router đang quảng bá bốn dòng tuyến. Bài cuối module cho bạn cách gộp cả bốn thành đúng một dòng.

### Bài: Gộp bốn dòng tuyến thành một `m13-bai-5`

**1 · Khởi động (hook):** Router chi nhánh đang báo lên trụ sở bốn mạng: 192.168.8.0/24, 192.168.9.0/24, 192.168.10.0/24 và 192.168.11.0/24. Người có nghề nhìn qua rồi thay cả bốn dòng bằng đúng một dòng, mà trụ sở vẫn tới được mọi máy. Dòng đó viết thế nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: gộp bốn mạng /24 liền nhau lại thì được một mạng có prefix nào?
  - **Dạng:** trắc nghiệm · **/22** ✓ / /26 / /24 vẫn giữ nguyên
  - **Vì sao:** Gộp là đi ngược chiều cắt: mỗi lần gấp đôi số mạng thì prefix ngắn đi 1. Bốn mạng là gấp đôi hai lần, nên /24 thành /22.

**3 · Khám phá (teach):**
- *[tom-tat-tuyen]* Tóm tắt tuyến (route summarization) là gộp nhiều mạng liền kề thành một dòng tuyến duy nhất. Bốn mạng 192.168.8.0/24 tới 192.168.11.0/24 gộp lại thành 192.168.8.0/22: dải này phủ đúng từ 192.168.8.0 tới 192.168.11.255, không thiếu và không thừa mạng nào. Điều kiện để gộp được: các mạng phải liền kề và khối gộp phải bắt đầu đúng vạch — chính luật căn khối của bài trước, chỉ nhìn theo chiều ngược lại.
  - **Đào sâu hơn:** Vì sao trụ sở lại thích một dòng hơn bốn dòng? Vì bảng định tuyến càng ngắn thì router tra càng nhanh và càng ít tốn bộ nhớ; quan trọng hơn, khi một mạng con ở chi nhánh chập chờn thì trụ sở không phải cập nhật lại bảng — dòng tóm tắt vẫn đứng yên. Cái giá phải trả: gói tin gửi tới một mạng con đã chết vẫn được đưa tới chi nhánh rồi mới bị bỏ. Ở mức khóa này bạn chỉ cần đọc hiểu và nhận ra dòng tóm tắt khi thấy nó; viết nó vào cấu hình thật là việc của phần định tuyến động.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Gộp hai mạng 10.1.4.0/24 và 10.1.5.0/24 thành một dòng tuyến. Viết dạng đầy đủ, ví dụ 10.1.x.x/xx
  - **Dạng:** gõ tay · **Chấp nhận:** 10.1.4.0/23 | 10.1.4.0 /23
  - **Chủ đề gợi ý (tầng 1):** gộp gấp đôi số mạng thì prefix ngắn đi một bậc
  - **Gợi ý (tầng 2):** Hai mạng /24 liền nhau gộp lại thì prefix ngắn đi 1 bậc, thành /23. Địa chỉ đầu vẫn là địa chỉ của mạng nhỏ hơn.
  - **Lời giải (tầng 3):** 10.1.4.0/23 — dải này phủ từ 10.1.4.0 tới 10.1.5.255, đúng hai mạng cần gộp. Gộp hai mạng thì prefix ngắn đi 1; muốn tới /22 thì phải gộp tới bốn mạng.
- **Đề:** Cặp mạng nào dưới đây KHÔNG gộp được thành một dòng tuyến gọn?
  - **Dạng:** trắc nghiệm · 192.168.6.0/24 và 192.168.7.0/24 / **192.168.5.0/24 và 192.168.6.0/24** ✓ / 192.168.4.0/24 và 192.168.5.0/24
  - **Chủ đề gợi ý (tầng 1):** khối gộp cũng phải bắt đầu đúng vạch
  - **Gợi ý (tầng 2):** Khối gộp của hai mạng /24 rộng 2 nên phải bắt đầu ở số chẵn. Cặp nào có mạng đầu là số lẻ?
  - **Lời giải (tầng 3):** Cặp 5 và 6 không gộp được: khối /23 phải bắt đầu ở số chẵn nên 5 không đứng đầu khối được. Cặp 4-5 và cặp 6-7 đều bắt đầu ở số chẵn nên gộp gọn thành /23.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: gộp bốn mạng 172.16.12.0/24 tới 172.16.15.0/24 thành một dòng thì được gì? Viết dạng đầy đủ.
  - **Dạng:** gõ tay · **Chấp nhận:** 172.16.12.0/22 | 172.16.12.0 /22
  - **Gợi ý (tầng 2):** Bốn mạng là hai lần gấp đôi, nên prefix ngắn đi 2 bậc từ /24.
  - **Lời giải (tầng 3):** 172.16.12.0/22 — phủ từ 172.16.12.0 tới 172.16.15.255, và 12 chia hết cho 4 nên khối gộp đứng đúng vạch.
- **Tự giải thích:** Giải thích bằng lời của bạn: tóm tắt tuyến là gì, và cần điều kiện nào mới gộp được?
  - **Nhóm ý cần chạm:** [gộp, gom, nhập lại, một dòng] · [liền kề, liền nhau, kế tiếp, cạnh nhau] · [đúng vạch, chia hết, bội số, bắt đầu đúng]
  - **Trả lời mẫu:** Tóm tắt tuyến là gộp nhiều mạng con thành một dòng tuyến duy nhất cho ngắn bảng định tuyến. Muốn gộp được thì các mạng phải liền kề nhau và khối gộp phải bắt đầu đúng vạch — y như luật căn khối lúc cắt, chỉ nhìn ngược chiều.

**6 · Tổng kết:**
- Tóm tắt tuyến gộp nhiều mạng liền kề thành một dòng tuyến duy nhất.
- Gấp đôi số mạng thì prefix ngắn đi một bậc: bốn mạng /24 thành một /22.
- Chỉ gộp được khi các mạng liền kề và khối gộp bắt đầu đúng vạch.
- *Úp mở bài sau:* Bạn đã biết cắt dải cho từng phòng. Module sau đưa bạn tới sợi dây nối hai tòa nhà: một sợi cáp phải chở được nhiều xóm cùng lúc, và bạn sẽ cấu hình nó bằng lệnh gõ thẳng vào switch.

### Khái niệm & flashcard (6)

- **VLSM** `vlsm` — Variable Length Subnet Mask — chia một dải thành các mạng con KHÁC CỠ nhau theo nhu cầu từng nơi
  - Ẩn dụ: Như cắt đất cho thuê: xưởng cần lô lớn, quán nước cần lô nhỏ. Cắt lô bằng nhau là vừa thiếu chỗ cho xưởng, vừa bỏ hoang đất của quán.
  - Thẻ ôn: *VLSM là gì, và nó khác cách chia đều ở chỗ nào?* → Là cách chia một dải thành các mạng con khác cỡ nhau, mỗi nơi một cỡ vừa với số máy của nó. Chia đều thì nơi đông máy thiếu chỗ còn nơi ít máy bỏ hoang địa chỉ.
- **Cỡ khối vừa đủ** `co-khoi-vua-du` — Prefix nhỏ nhất mà vẫn chứa đủ số máy, sau khi đã trừ 2 địa chỉ cho mạng và broadcast
  - Ẩn dụ: Như mua giày: chọn size nhỏ nhất mà chân vẫn thoải mái, chứ không phải cứ lấy size to nhất cho chắc.
  - Thẻ ôn: *Phòng có N máy thì chọn cỡ khối thế nào?* → Lấy N cộng 2 (địa chỉ mạng và broadcast), rồi chọn bậc lũy thừa 2 thấp nhất còn chứa nổi: /28 cho 14 máy, /27 cho 30, /26 cho 62, /25 cho 126.
- **Cắt lớn trước** `cat-lon-truoc` — Thứ tự cấp phát VLSM: xếp nhu cầu giảm dần rồi cắt từ khối to nhất, lấp liên tiếp từ đầu dải
  - Ẩn dụ: Xếp hành lý vào cốp xe: bỏ vali to xuống trước, đồ lặt vặt nhét khe sau. Làm ngược lại thì vali không còn chỗ nào đặt vừa.
  - Thẻ ôn: *Vì sao khi cắt VLSM phải bắt đầu từ phòng đông máy nhất?* → Vì khối càng to càng ít chỗ đứng hợp lệ — một /25 chỉ đứng được ở hai vạch trong cả dải /24. Cắt nó lúc dải còn nguyên thì luôn vừa; để sau cùng thì phần trống đã bị cắt vụn.
- **Căn khối** `can-khoi` — Luật block alignment: một subnet chỉ được bắt đầu ở địa chỉ chia hết cho cỡ của chính nó
  - Ẩn dụ: Như gạch lát nền: viên gạch phải nằm đúng ô lưới. Đặt lệch nửa ô thì không viên nào ăn khớp với viên nào.
  - Thẻ ôn: *Một khối /26 được phép bắt đầu ở những địa chỉ nào?* → Ở các mốc chia hết cho 64: .0, .64, .128, .192. Khối chỉ được bắt đầu ở bội số của cỡ chính nó, nên 192.168.10.160/26 là khối không tồn tại.
- **Wildcard mask** `wildcard-mask` — Mặt nạ lộn ngược của subnet mask — bit 0 là phải khớp, bit 1 là bỏ qua
  - Ẩn dụ: Như tờ giấy khoét lỗ soi lên danh sách: chỗ bịt kín là chỗ bắt buộc trùng, chỗ khoét thủng là chỗ ai cũng được.
  - Thẻ ôn: *Wildcard mask của mạng /26 là gì, và tính bằng cách nào?* → Là 0.0.0.63 — lấy 255 trừ đi từng ô của subnet mask 255.255.255.192. Trong wildcard, bit 0 nghĩa là phải khớp đúng, bit 1 nghĩa là bỏ qua.
- **Route summarization** `tom-tat-tuyen` — Tóm tắt tuyến — gộp nhiều mạng liền kề thành một dòng tuyến ngắn hơn
  - Ẩn dụ: Như ghi địa chỉ nhận: thay vì liệt kê bốn căn hộ liền nhau, chỉ cần ghi tên tòa nhà — bưu tá tới nơi rồi tự chia tiếp.
  - Thẻ ôn: *Tóm tắt tuyến là gì, và cần điều kiện nào mới gộp được?* → Là gộp nhiều mạng liền kề thành một dòng tuyến cho gọn bảng định tuyến. Điều kiện: các mạng phải liền kề và khối gộp phải bắt đầu đúng vạch — ví dụ bốn mạng 192.168.8.0/24 tới 192.168.11.0/24 gộp thành 192.168.8.0/22.

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Một mạng /26 cấp được cho bao nhiêu máy?
  - **Dạng:** trắc nghiệm · **62 máy** ✓ / 64 máy / 60 máy
  - **Chủ đề gợi ý (tầng 1):** hai địa chỉ bị giữ lại trong mỗi khối
  - **Vì sao:** /26 có 64 địa chỉ, trừ địa chỉ mạng và broadcast còn 62 chỗ cho máy thật.
- **Đề:** Một phòng có 50 máy. Prefix nhỏ nhất đủ dùng cho phòng đó là bao nhiêu (dạng /xx)?
  - **Dạng:** gõ tay · **Chấp nhận:** /26 | 26 | 255.255.255.192
  - **Chủ đề gợi ý (tầng 1):** số chỗ thật của từng bậc khối
  - **Vì sao:** Phòng cần 52 chỗ. /27 chỉ có 30 nên trượt; /26 có 62 nên vừa và không phí quá nhiều.
- **Đề:** Khi cắt VLSM, vì sao phải cấp cho phòng đông máy nhất trước?
  - **Dạng:** trắc nghiệm · **Vì khối lớn có rất ít chỗ đứng hợp lệ, cắt sau cùng thì thường không còn chỗ nào vừa** ✓ / Vì phòng đông máy luôn phải nằm ở đầu dải, còn phòng ít máy phải nằm ở cuối dải / Vì cấp cho phòng nhỏ trước sẽ làm tổng số địa chỉ cần dùng lớn hơn dải được giao
  - **Chủ đề gợi ý (tầng 1):** chỗ đứng hợp lệ của khối lớn
  - **Vì sao:** Khối càng to càng kén vạch: một /25 chỉ đứng được ở .0 hoặc .128 trong cả dải /24. Cắt nó lúc dải còn nguyên thì luôn có chỗ.
- **Đề:** Bạn vừa cấp 192.168.10.0/25 cho phòng đầu tiên. Khối kế tiếp bắt đầu ở địa chỉ nào? Điền dạng đầy đủ.
  - **Dạng:** gõ tay · **Chấp nhận:** 192.168.10.128
  - **Chủ đề gợi ý (tầng 1):** độ rộng của khối vừa cấp
  - **Vì sao:** /25 rộng 128 địa chỉ, chiếm từ .0 tới .127, nên chỗ trống kế tiếp bắt đầu ở .128.
- **Đề:** Subnet mask 255.255.255.240 đổi sang wildcard mask là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** 0.0.0.15
  - **Chủ đề gợi ý (tầng 1):** cách tính mặt nạ lộn ngược
  - **Vì sao:** Lấy 255 trừ từng ô: ba ô đầu ra 0, ô cuối 255 trừ 240 bằng 15.
- **Đề:** Trong wildcard mask, bit mang giá trị 0 có nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Bit tương ứng của địa chỉ phải khớp đúng** ✓ / Bit tương ứng của địa chỉ được bỏ qua / Bit tương ứng thuộc về phần máy trong địa chỉ
  - **Chủ đề gợi ý (tầng 1):** vai trò ngược nhau của bit 0 và bit 1
  - **Vì sao:** Wildcard ngược với subnet mask: bit 0 là chỗ phải khớp, bit 1 là chỗ bỏ qua khi đối chiếu.
- **Đề:** Gộp bốn mạng 192.168.4.0/24, 192.168.5.0/24, 192.168.6.0/24 và 192.168.7.0/24 thành một dòng tuyến. Viết dạng đầy đủ.
  - **Dạng:** gõ tay · **Chấp nhận:** 192.168.4.0/22 | 192.168.4.0 /22
  - **Chủ đề gợi ý (tầng 1):** gấp đôi số mạng thì prefix ngắn đi một bậc
  - **Vì sao:** Bốn mạng là hai lần gấp đôi nên /24 thành /22; khối 192.168.4.0/22 phủ đúng từ .4.0 tới .7.255.
- **Đề:** Xếp lại đúng thứ tự bốn bước làm một bài chia VLSM.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Liệt kê số máy của từng phòng
    2. Chọn cỡ khối vừa đủ cho từng phòng
    3. Xếp các phòng theo số máy giảm dần
    4. Cắt từ đầu dải, khối to trước, khối nhỏ sau
  - **Chủ đề gợi ý (tầng 1):** trình tự làm một bài thiết kế dải địa chỉ
  - **Vì sao:** Biết nhu cầu trước, rồi mới quy ra cỡ khối, rồi mới sắp thứ tự, cuối cùng mới đặt bút cắt. Đảo hai bước cuối là nguồn gốc của cảnh hết chỗ giữa chừng.
- **Đề:** Một mạng /25 cấp được cho bao nhiêu máy?
  - **Dạng:** gõ tay · **Chấp nhận:** 126 | 126 máy
  - **Chủ đề gợi ý (tầng 1):** tổng địa chỉ của khối trừ đi hai
  - **Vì sao:** /25 có 128 địa chỉ, trừ địa chỉ mạng và broadcast còn 126 chỗ.
- **Đề:** Khối nào dưới đây không phải là một mạng hợp lệ?
  - **Dạng:** trắc nghiệm · 192.168.10.32/27 / **192.168.10.96/26** ✓ / 192.168.10.192/26
  - **Chủ đề gợi ý (tầng 1):** địa chỉ đầu khối phải chia hết cho cỡ khối
  - **Vì sao:** 96 không chia hết cho 64 nên 96/26 không tồn tại. Còn 32 chia hết cho 32 và 192 chia hết cho 64 nên hai khối kia hợp lệ.
- **Đề:** Dải 10.20.30.0/24 chia cho ba phòng 100 / 30 / 12 máy, cắt đúng thứ tự. Phòng 30 máy nhận địa chỉ mạng nào? Điền dạng đầy đủ.
  - **Dạng:** gõ tay · **Chấp nhận:** 10.20.30.128 | 10.20.30.128/27
  - **Chủ đề gợi ý (tầng 1):** khối to đứng trước thì khối sau bắt đầu ở đâu
  - **Vì sao:** Phòng 100 máy lấy /25 từ .0 tới .127. Phòng 30 máy là phòng to kế tiếp, nhận /27 bắt đầu ngay ở .128.
- **Đề:** Cặp mạng nào dưới đây gộp được thành một dòng tuyến /23?
  - **Dạng:** trắc nghiệm · 10.0.9.0/24 và 10.0.10.0/24 / **10.0.6.0/24 và 10.0.7.0/24** ✓ / 10.0.7.0/24 và 10.0.9.0/24
  - **Chủ đề gợi ý (tầng 1):** khối gộp cũng phải bắt đầu đúng vạch
  - **Vì sao:** Khối /23 rộng hai mạng nên phải bắt đầu ở số chẵn: cặp 6-7 đạt cả hai điều kiện liền kề và đúng vạch. Cặp 9-10 liền kề nhưng bắt đầu ở số lẻ; cặp 7-9 thì không liền kề.

## Trunk 802.1Q — Một sợi dây chở nhiều xóm `module-14`

Phần D · 5 chặng · 5 bài · 5 khái niệm

**Chặng:** Hết cổng vì mỗi xóm một dây (m14-bai-1) → Dán nhãn xóm lên khung (m14-bai-2) → Xóm đi trần: native VLAN (m14-bai-3) → Danh sách khách được qua (m14-bai-4) → Một chân router cho nhiều xóm (m14-bai-5)

### Bài: Ngồi xuống trước console lần đầu `m14-bai-1`

**1 · Khởi động (hook):** Hai tòa nhà của công ty, mỗi tòa một switch, và bốn phòng ban đã chia VLAN đàng hoàng. Muốn kế toán tòa này nói chuyện với kế toán tòa kia, người ta kéo một sợi cáp cho VLAN kế toán, rồi lại kéo thêm một sợi cho VLAN kỹ thuật. Bốn VLAN là bốn sợi, mà switch chỉ có 24 cổng. Có cách nào để MỘT sợi chở được cả bốn xóm không?

**2 · Đoán thử (pretest):**
- **Đề:** Trước khi mình giảng gì cả: bạn đang ngồi trước console của Switch-1. Gõ dấu ? để xem thiết bị hiểu những lệnh nào, rồi tự tìm lấy bảng VLAN của nó. Sai cũng không sao — phần này không tính điểm.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (kế toán) [192.168.1.10/24] · PC-C (kỹ thuật) [192.168.1.30/24] · Switch-1 [p1:VLAN 10, p2:VLAN 20, p3:VLAN 10, p4:VLAN 1] — dây: PC-A (kế toán)·eth0 — Switch-1·p1 | PC-C (kỹ thuật)·eth0 — Switch-1·p2
    - **Console cắm ở:** Switch-1
    - **Mục tiêu:**
      - phải xem "show vlan brief" trên Switch-1
    - **Lệnh mẫu trên Switch-1:** `show vlan brief`
  - **Chủ đề gợi ý (tầng 1):** lệnh xem bảng VLAN của switch
  - **Vì sao:** Lệnh đó là show vlan brief. Bảng nó in ra cho biết switch đang có những VLAN nào và cổng nào thuộc VLAN nào — đây là thứ đầu tiên người làm mạng nhìn khi ngồi xuống một switch lạ.

**3 · Khám phá (teach):**
- *[trunk]* Cổng access mà bạn học ở Module 4 chỉ thuộc đúng một VLAN, nên nối hai switch bằng cổng access thì mỗi VLAN phải ăn một sợi dây riêng. Trunk là vai thứ hai của một cổng switch: nó chở MỌI VLAN trên cùng một sợi. Hai đầu sợi dây giữa hai switch cùng khai trunk là bốn xóm đi chung một cáp, và 24 cổng của switch để dành cho máy người dùng thay vì để đấu nối nội bộ.
  - **Đào sâu hơn:** Tên gọi trong nghề: cổng access nối XUỐNG máy người dùng, cổng trunk nối NGANG giữa các thiết bị mạng. Chuẩn dán nhãn tên là 802.1Q, còn gọi là dot1q; nó là chuẩn mở nên switch của hãng nào cũng nói chuyện được với nhau. Ở phòng lab của app này, cổng là trunk vì người ta khai nó là trunk — thiết bị thật còn có kiểu tự đàm phán gọi là DTP, nhưng mọi tài liệu bảo mật đều khuyên tắt nó đi và khai tay cho chắc.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Đây là trọn bộ lệnh khai một cổng thành trunk, gõ trên console của Switch-1. Bước 1: gõ enable để vào chế độ có quyền — dấu nhắc đổi từ Switch-1> sang Switch-1#. Bước 2: gõ configure terminal để vào chế độ cấu hình — dấu nhắc thành Switch-1(config)#. Bước 3: gõ interface p4 để chọn đúng cổng đang nối sang switch kia — dấu nhắc thành Switch-1(config-if)#. Bước 4: gõ switchport mode trunk. Bước 5: gõ end để về lại Switch-1#, rồi show interfaces trunk để tự kiểm chứng: cổng p4 phải xuất hiện trong bảng. Nhớ luật chế độ: gõ interface khi chưa configure terminal thì máy từ chối, và đó là máy đang dạy bạn chứ không phải máy khó tính.
- **Đề:** Đang ở dấu nhắc Switch-1(config-if)# của cổng p4, gõ lệnh gì để biến cổng này thành trunk?
  - **Dạng:** gõ tay · **Chấp nhận:** switchport mode trunk | switchport mode trunk  | sw mode trunk
  - **Chủ đề gợi ý (tầng 1):** lệnh đặt vai cho một cổng switch
  - **Gợi ý (tầng 2):** Cú pháp khuyết: switchport mode … — chỗ trống điền vai bạn muốn cổng nhận, và vai đó chính là tên bài học hôm nay.
  - **Lời giải (tầng 3):** switchport mode trunk. Cũng lệnh switchport mode ấy, thay trunk bằng access là trả cổng về vai cũ của Module 4.
- **Đề:** Vì sao nối hai switch bằng cổng access lại tốn dây đến thế?
  - **Dạng:** trắc nghiệm · **Vì một cổng access chỉ thuộc đúng một VLAN, nên mỗi VLAN muốn qua phải có một sợi riêng** ✓ / Vì cổng access chạy chậm hơn cổng trunk nên phải chia tải ra nhiều sợi dây / Vì switch chỉ cho phép mỗi sợi cáp mang tối đa một trăm khung tin mỗi giây
  - **Chủ đề gợi ý (tầng 1):** số VLAN mà một cổng access thuộc về
  - **Gợi ý (tầng 2):** Nhớ lại Module 4: một cổng access đứng tên đúng mấy VLAN? Vậy bốn VLAN cần mấy cổng như thế?
  - **Lời giải (tầng 3):** Vì cổng access chỉ thuộc một VLAN duy nhất — bốn VLAN là bốn sợi dây và bốn cổng ở mỗi đầu. Tốc độ cổng không liên quan gì tới chuyện này; trunk nhanh hơn không phải vì cáp mà vì nó gộp được nhiều xóm.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: lệnh nào cho bạn xem switch đang có những VLAN nào và cổng nào thuộc VLAN nào?
  - **Dạng:** gõ tay · **Chấp nhận:** show vlan brief | show vlan | sh vlan brief
  - **Gợi ý (tầng 2):** Ba từ, bắt đầu bằng show — đúng lệnh bạn mò ra ở bước Đoán thử.
  - **Lời giải (tầng 3):** show vlan brief. Bảng của nó có cột VLAN, tên, trạng thái và danh sách cổng — riêng cổng trunk sẽ không đứng tên VLAN nào, vì nó chở nhiều xóm cùng lúc.
- **Tự giải thích:** Giải thích bằng lời của bạn: trunk giải quyết được vấn đề gì mà cổng access không giải quyết nổi?
  - **Nhóm ý cần chạm:** [một sợi, một dây, một cáp, cùng một dây] · [nhiều vlan, nhiều xóm, cả bốn, tất cả vlan] · [tiết kiệm cổng, đỡ tốn dây, hết cổng, tốn cổng]
  - **Trả lời mẫu:** Cổng access chỉ thuộc một VLAN nên mỗi xóm phải có một sợi dây riêng giữa hai switch, và switch cạn cổng rất nhanh. Trunk cho phép một sợi chở nhiều VLAN cùng lúc, nên chỉ cần một cáp nối ngang là đủ cho tất cả các xóm.

**6 · Tổng kết:**
- Cổng access thuộc đúng một VLAN; cổng trunk chở nhiều VLAN trên một sợi.
- Khai trunk bằng lệnh: enable, configure terminal, interface p4, switchport mode trunk.
- Ngồi xuống một switch lạ thì show vlan brief là bảng nhìn đầu tiên.
- *Úp mở bài sau:* Một sợi chở bốn xóm — nhưng đầu bên kia làm sao biết khung này của xóm nào? Bài sau mở phong bì ra xem cái nhãn mà switch dán lên đó.

### Bài: Đọc được cái nhãn trên khung `m14-bai-2`

**1 · Khởi động (hook):** Cùng một sợi cáp, cùng một lúc, khung của kế toán và khung của kỹ thuật nối đuôi nhau chạy qua. Sang tới switch bên kia, không khung nào đi lạc sang xóm của khung kia. Switch bên nhận dựa vào đâu để biết khung nào là của ai?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: khi khung của VLAN 20 đi qua trunk, switch làm gì với nó?
  - **Dạng:** trắc nghiệm · **Chèn thêm một nhãn ghi số VLAN vào khung** ✓ / Đổi địa chỉ MAC nguồn thành MAC của switch / Ghi số VLAN vào phần địa chỉ IP của gói tin
  - **Vì sao:** Switch chèn một nhãn 802.1Q dài 4 byte vào khung, trong đó có số VLAN. Đầu kia đọc nhãn, biết khung thuộc xóm nào, rồi gỡ nhãn ra trước khi giao xuống cổng access.

**3 · Khám phá (teach):**
- *[tagged-frame]* Trên trunk, mỗi khung được dán thêm một nhãn 802.1Q ghi rõ số VLAN của nó — khung mang nhãn gọi là tagged frame. Đầu nhận đọc nhãn để biết khung thuộc xóm nào, rồi GỠ nhãn trước khi giao xuống cổng access, nên máy người dùng không bao giờ nhìn thấy cái nhãn ấy. Nói cách khác: VLAN đi theo khung suốt chặng, còn nhãn chỉ là cách ghi số xóm trên sợi dây giữa hai switch.
  - **Đào sâu hơn:** Nhãn dài 4 byte, chèn ngay sau địa chỉ MAC nguồn. Trong 4 byte đó có 12 bit dành cho số VLAN — nên VLAN chỉ chạy từ 1 tới 4094, đúng con số bạn gặp trong mọi bảng cấu hình. Vì khung dài thêm 4 byte, khung tối đa trên trunk là 1522 byte thay vì 1518; switch đời cũ không hiểu điều này sẽ báo lỗi khung quá cỡ, và đó là một trong những lỗi khó chịu nhất khi đấu nối thiết bị nhiều thế hệ.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Máy trong VLAN 10 gửi một khung sang tòa nhà bên kia. Trên sợi trunk, khung ấy mang theo con số nào trong nhãn của nó?
  - **Dạng:** gõ tay · **Chấp nhận:** 10 | vlan 10 | vlan10
  - **Chủ đề gợi ý (tầng 1):** nhãn 802.1Q ghi lại số của xóm nào
  - **Gợi ý (tầng 2):** Điền chỗ trống: nhãn ghi số VLAN của chính khung đó, mà khung này xuất phát từ cổng access thuộc VLAN …
  - **Lời giải (tầng 3):** Số 10 — nhãn ghi đúng VLAN mà khung đang thuộc về. Sang tới đầu kia, switch đọc số 10, gỡ nhãn, rồi chỉ giao khung xuống các cổng access của VLAN 10.
- **Đề:** Máy tính cắm vào cổng access có nhìn thấy nhãn 802.1Q không?
  - **Dạng:** trắc nghiệm · **Không, vì switch đã gỡ nhãn ra trước khi giao khung xuống cổng access** ✓ / Có, và card mạng của máy phải tự đọc nhãn để biết mình thuộc VLAN nào / Có, nhưng chỉ khi máy được cấu hình đúng số VLAN trong phần cài đặt mạng
  - **Chủ đề gợi ý (tầng 1):** nhãn tồn tại trên đoạn dây nào
  - **Gợi ý (tầng 2):** Nhãn chỉ sống trên đoạn dây giữa hai thiết bị mạng. Cổng nối xuống máy người dùng là cổng gì, và cổng đó có đọc nhãn không?
  - **Lời giải (tầng 3):** Không. Nhãn chỉ tồn tại trên trunk; tới cổng access thì switch gỡ ra, nên máy người dùng nhận một khung trần y như thời chưa có VLAN. Chính vì thế bạn không phải cấu hình gì trên máy khi phòng mình được chia VLAN.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: tên chuẩn dán nhãn VLAN lên khung là gì? (viết dạng số hiệu chuẩn)
  - **Dạng:** gõ tay · **Chấp nhận:** 802.1q | 802.1Q | ieee 802.1q | dot1q | 8021q
  - **Gợi ý (tầng 2):** Bắt đầu bằng 802.1 — chuẩn của tổ chức IEEE, tên tắt trong nghề là dot1q.
  - **Lời giải (tầng 3):** 802.1Q. Đây là chuẩn mở nên switch của các hãng khác nhau vẫn hiểu nhãn của nhau.
- **Tự giải thích:** Giải thích bằng lời của bạn: nhãn 802.1Q sinh ra rồi biến mất ở những chỗ nào trên đường đi của khung?
  - **Nhóm ý cần chạm:** [dán, chèn, gắn thêm, thêm nhãn] · [trunk, dây giữa hai switch, đường trục] · [gỡ, tháo, bỏ nhãn, tách ra] · [cổng access, xuống máy, máy người dùng]
  - **Trả lời mẫu:** Switch dán nhãn khi đẩy khung ra trunk, để đầu kia biết khung thuộc VLAN nào. Tới nơi, switch bên nhận đọc nhãn rồi gỡ ra trước khi giao khung xuống cổng access, nên máy người dùng không bao giờ thấy nhãn.

**6 · Tổng kết:**
- Trên trunk, khung được dán nhãn 802.1Q ghi số VLAN của nó.
- Đầu nhận đọc nhãn rồi gỡ ra trước khi giao xuống cổng access.
- Nhãn chỉ sống trên trunk — máy người dùng không bao giờ thấy nó.
- *Úp mở bài sau:* Có đúng MỘT xóm được đi qua trunk mà không cần nhãn. Bài sau cho bạn xem cái xóm đặc biệt ấy — và vì sao nó là nguồn của một ca bệnh im lặng nhất nghề mạng.

### Bài: Chữa ca native VLAN lệch `m14-bai-3`

**1 · Khởi động (hook):** Nửa văn phòng chạy ngon, nửa kia mất kết nối mà không thiết bị nào báo lỗi, không đèn nào đỏ. Người trực ca đêm khai trunk ở Switch-2 và gõ thêm một dòng cấu hình mà anh ấy tin là vô hại. Dòng ấy đã làm khung của một xóm lặng lẽ rơi sang xóm khác. Xóm nào bị nạn, và vì sao?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: trên một trunk, khung của native VLAN đi qua như thế nào?
  - **Dạng:** trắc nghiệm · **Đi trần, không mang nhãn nào cả** ✓ / Mang nhãn ghi số 0 để đánh dấu là xóm mặc định / Mang hai nhãn chồng lên nhau để phân biệt với xóm khác
  - **Vì sao:** Native VLAN là xóm duy nhất đi qua trunk mà không dán nhãn. Chuẩn 802.1Q quy định vậy để trunk vẫn nói chuyện được với thiết bị không hiểu nhãn.

**3 · Khám phá (teach):**
- *[native-vlan]* Trên mỗi trunk có đúng một xóm được đi trần, không nhãn — đó là native VLAN, mặc định là VLAN 1. Chuyện chỉ lành khi HAI ĐẦU khai cùng một số. Nếu Switch-1 khai native là 1 còn Switch-2 khai native là 99, thì khung đi trần từ VLAN 1 sang tới đầu kia sẽ được hiểu thành khung của VLAN 99: nó rơi sang xóm khác, im lặng, không lỗi, không cảnh báo. Khung mang nhãn thì không hề hấn gì — nên bệnh này chỉ giết nửa văn phòng, và đó là lý do nó khó tìm.
  - **Đào sâu hơn:** Vì sao chuẩn lại chừa một xóm đi trần? Vì thời trunk mới ra đời, còn nhiều thiết bị không hiểu nhãn; xóm không nhãn giúp chúng vẫn nói chuyện được. Ngày nay lời khuyên chung là đổi native sang một VLAN không ai dùng và không cắm máy nào vào đó, để tránh cả bệnh lệch native lẫn kiểu tấn công nhồi hai nhãn. Thiết bị thật có cơ chế phát hiện lệch native qua giao thức khám phá láng giềng — nhưng nó chỉ ghi vào nhật ký, và nhật ký thì phải có người đọc.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Đây đúng là mạng của ca đêm hôm ấy: Switch-1 khai native VLAN 1, Switch-2 khai native VLAN 99, nên hai máy kế toán ở VLAN 1 mất nhau. Vào console sửa cho hai đầu khớp lại. Gõ thử bao nhiêu cũng miễn phí, chỉ Nộp bài mới tính một lượt.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (kế toán) [192.168.1.10/24] · PC-B (kế toán) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 20, p4:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 20, p4:VLAN 1] — dây: PC-A (kế toán)·eth0 — Switch-1·p1 | PC-B (kế toán)·eth0 — Switch-2·p1 | Switch-1·p4 — Switch-2·p4
    - **Console cắm ở:** Switch-2
    - **Mục tiêu:**
      - trunk ở cổng p4 của Switch-2 phải khai native VLAN 1
      - pc-a PHẢI gọi được pc-b
    - **Lệnh mẫu trên Switch-2:** `enable` rồi `configure terminal` rồi `interface p4` rồi `switchport trunk native vlan 1` rồi `end` rồi `show interfaces trunk`
  - **Chủ đề gợi ý (tầng 1):** số native VLAN ở hai đầu trunk
  - **Gợi ý (tầng 2):** Cú pháp khuyết: vào interface p4 rồi gõ switchport trunk native vlan … — con số điền vào phải khớp với đầu bên kia, và bảng show interfaces trunk cho bạn thấy đầu này đang khai số mấy.
  - **Lời giải (tầng 3):** Trên Switch-2: enable, configure terminal, interface p4, switchport trunk native vlan 1, end. Sửa ở đầu nào cũng được, miễn hai đầu cùng một số — nhưng đổi đầu đang đúng thành 99 thì bạn lại phải đi dời cả các máy VLAN 1 sang xóm khác.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: native VLAN mặc định của một trunk là VLAN số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 1 | vlan 1 | vlan1
  - **Gợi ý (tầng 2):** Cùng số với VLAN mặc định mà mọi cổng switch thuộc về khi chưa ai cấu hình gì.
  - **Lời giải (tầng 3):** VLAN 1. Vì đó là mặc định của mọi thiết bị nên hai đầu thường tự khớp — bệnh chỉ xuất hiện khi có người đổi một đầu mà quên đầu kia.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao native VLAN lệch hai đầu lại là ca bệnh im lặng, chỉ hỏng một nửa?
  - **Nhóm ý cần chạm:** [không nhãn, đi trần, không dán nhãn] · [hiểu nhầm, rơi sang, lạc sang, sang xóm khác] · [mang nhãn, có nhãn, vlan khác vẫn chạy, nửa còn lại]
  - **Trả lời mẫu:** Vì chỉ khung của native VLAN mới đi trần. Sang đầu kia, khung không nhãn ấy bị hiểu thành khung của native VLAN bên đó, tức là rơi sang xóm khác mà không ai báo lỗi. Các VLAN còn lại đi có nhãn nên vẫn chạy bình thường — thành ra chỉ hỏng đúng một nửa.

**6 · Tổng kết:**
- Native VLAN là xóm duy nhất đi qua trunk không mang nhãn; mặc định là VLAN 1.
- Hai đầu trunk khai native lệch nhau thì khung trần lặng lẽ rơi sang xóm khác.
- Sửa bằng switchport trunk native vlan, và luôn kiểm lại bằng show interfaces trunk.
- *Úp mở bài sau:* Trunk chở được mọi xóm — nhưng bạn có muốn nó chở TẤT CẢ không? Bài sau là danh sách khách mời của sợi cáp, và một ca hỏng chỉ vì thiếu đúng một số trong danh sách.

### Bài: Thêm xóm còn thiếu vào danh sách `m14-bai-4`

**1 · Khởi động (hook):** Trunk đã dựng, VLAN kế toán đi lại bình thường giữa hai tòa nhà. Nhưng VLAN kỹ thuật thì không: máy bên này ping máy bên kia mãi không tới, dù cả hai đều cắm đúng cổng, đúng xóm. Sợi cáp vẫn là sợi cáp ấy. Thiếu cái gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: một trunk chưa khai gì thêm thì cho những VLAN nào đi qua?
  - **Dạng:** trắc nghiệm · **Tất cả các VLAN** ✓ / Chỉ VLAN 1 / Không VLAN nào, phải khai từng cái một
  - **Vì sao:** Mặc định trunk cho tất cả VLAN qua. Chỉ khi người ta khai một danh sách allowed thì trunk mới thành cánh cửa có kiểm soát — và cũng từ đó mới có bệnh thiếu tên trong danh sách.

**3 · Khám phá (teach):**
- *[allowed-list]* Allowed list là danh sách khách được qua trunk. Mặc định trunk cho mọi VLAN đi, nhưng người quản trị thường thu hẹp lại chỉ những xóm thật sự cần — vừa an toàn hơn, vừa đỡ khung quảng bá chạy lung tung. Cái giá là một ca hỏng rất hay gặp: khai thiếu một số trong danh sách thì đúng xóm đó chết, còn các xóm khác vẫn chạy ngon lành nên chẳng ai ngờ tới sợi trunk. Lệnh khai là switchport trunk allowed vlan, và bảng show interfaces trunk luôn in ra danh sách hiện hành.
  - **Đào sâu hơn:** Trên thiết bị thật, gõ lại lệnh allowed vlan là GHI ĐÈ cả danh sách chứ không phải thêm vào — muốn thêm phải dùng dạng có từ add, và không ít sự cố đã sinh ra từ đúng chỗ này: một dòng lệnh tưởng là bổ sung hóa ra xóa sạch phần còn lại. Trong app này chỉ có dạng ghi đè, nên cứ liệt kê đủ mọi VLAN cần chở trong một dòng.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Kế toán (VLAN 10) đi lại được giữa hai tòa nhà, nhưng kỹ thuật (VLAN 20) thì không. Vào console tìm ra chỗ nghẽn rồi sửa, sao cho cả hai xóm cùng qua được sợi trunk.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (kế toán) [192.168.1.10/24] · PC-B (kế toán) [192.168.1.20/24] · PC-C (kỹ thuật) [192.168.1.30/24] · PC-D (kỹ thuật) [192.168.1.40/24] · Switch-1 [p1:VLAN 10, p2:VLAN 20, p4:VLAN 1] · Switch-2 [p1:VLAN 10, p2:VLAN 20, p4:VLAN 1] — dây: PC-A (kế toán)·eth0 — Switch-1·p1 | PC-C (kỹ thuật)·eth0 — Switch-1·p2 | PC-B (kế toán)·eth0 — Switch-2·p1 | PC-D (kỹ thuật)·eth0 — Switch-2·p2 | Switch-1·p4 — Switch-2·p4
    - **Console cắm ở:** Switch-2
    - **Mục tiêu:**
      - trunk ở cổng p4 của Switch-2 phải cho VLAN 10, 20 đi qua
      - pc-c PHẢI gọi được pc-d
      - pc-a PHẢI gọi được pc-b
    - **Lệnh mẫu trên Switch-2:** `enable` rồi `show interfaces trunk` rồi `configure terminal` rồi `interface p4` rồi `switchport trunk allowed vlan 10,20` rồi `end`
  - **Chủ đề gợi ý (tầng 1):** danh sách VLAN mà trunk cho đi qua
  - **Gợi ý (tầng 2):** Chạy show interfaces trunk ở cả hai switch và so hai danh sách với nhau — một bên có hai số, bên kia chỉ có một.
  - **Lời giải (tầng 3):** Switch-2 khai allowed vlan 10 nên VLAN 20 bị chặn ngay tại trunk. Sửa: enable, configure terminal, interface p4, switchport trunk allowed vlan 10,20, end. Nhớ liệt kê CẢ VLAN 10 trong dòng lệnh — lệnh này ghi đè cả danh sách, không phải thêm vào.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: lệnh nào in ra danh sách VLAN mà từng trunk đang cho đi qua?
  - **Dạng:** gõ tay · **Chấp nhận:** show interfaces trunk | show interface trunk | sh int trunk | show int trunk
  - **Gợi ý (tầng 2):** Cũng họ lệnh show, nói về interface, và tên bài học hôm nay đứng cuối.
  - **Lời giải (tầng 3):** show interfaces trunk. Bảng của nó có ba phần: cổng nào đang trunk, native VLAN của từng cổng, và danh sách VLAN được phép đi qua.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao thiếu một số trong allowed list lại là ca khó tìm?
  - **Nhóm ý cần chạm:** [một vlan, đúng xóm đó, riêng vlan] · [vẫn chạy, bình thường, không ai ngờ, các vlan khác] · [trunk, danh sách, allowed]
  - **Trả lời mẫu:** Vì chỉ đúng VLAN bị thiếu tên mới chết, còn các VLAN khác vẫn đi lại bình thường qua chính sợi trunk ấy. Mọi người thấy mạng vẫn chạy nên đi tìm ở máy, ở dây, mà không nghĩ tới danh sách trên trunk.

**6 · Tổng kết:**
- Mặc định trunk cho mọi VLAN qua; allowed list là danh sách thu hẹp do người khai.
- Thiếu một số trong danh sách thì đúng xóm đó chết, các xóm khác vẫn chạy.
- Lệnh allowed vlan GHI ĐÈ cả danh sách — liệt kê đủ mọi VLAN cần chở trong một dòng.
- *Úp mở bài sau:* Bốn xóm đã đi chung một dây giữa hai switch. Nhưng muốn kế toán gọi sang kỹ thuật thì vẫn phải qua router — và bài cuối module cho bạn xem cách cắm router bằng đúng MỘT sợi cáp.

### Bài: Nối router bằng một chân duy nhất `m14-bai-5`

**1 · Khởi động (hook):** Công ty có bốn VLAN và muốn chúng gọi được sang nhau. Cách cũ: router phải có bốn chân, mỗi chân cắm vào một VLAN. Nhưng router bạn đang có chỉ còn đúng một chân trống. Người ta vẫn làm được — bằng cách nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: muốn một chân router phục vụ bốn VLAN thì sợi dây nối vào nó phải là gì?
  - **Dạng:** trắc nghiệm · **Một trunk, để cả bốn xóm cùng đi vào một chân** ✓ / Một cổng access của VLAN quan trọng nhất trong bốn xóm / Một sợi cáp đặc biệt chạy nhanh gấp bốn lần cáp thường
  - **Vì sao:** Chính là trunk — thứ bạn học suốt module này. Chân router nhận cả bốn xóm qua một sợi, rồi tự tách ra bốn cửa logic bên trong.

**3 · Khám phá (teach):**
- *[router-on-a-stick]* Router-on-a-stick là cách cho một chân router phục vụ nhiều VLAN: sợi dây nối switch với router được khai là trunk, còn bên trong router, cái chân vật lý ấy được chia thành nhiều cửa logic gọi là sub-interface — mỗi cửa mang một số VLAN và một địa chỉ IP làm gateway cho xóm đó. Khung của VLAN 10 đi vào, router đọc nhãn, giao cho cửa của VLAN 10 xử lý, rồi đẩy ngược ra cũng trên sợi ấy nhưng mang nhãn của VLAN đích.
  - **Đào sâu hơn:** Điểm yếu của cách này: mọi lưu lượng giữa các VLAN đều đi vào rồi lại đi ra trên CÙNG một sợi, nên sợi đó gánh gấp đôi. Mạng lớn vì thế dùng switch lớp 3 với cửa logic ngay trong switch thay vì đẩy hết lên router. Trong phòng lab của app này, sơ đồ dùng router nhiều chân cho dễ nhìn; cú pháp sub-interface thuộc phần đọc-hiểu ở đây, và bạn sẽ gặp lại ý tưởng cửa-logic-trên-một-chân khi học định tuyến ở các module sau.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Trong kiểu router-on-a-stick, mỗi cửa logic chia ra từ một chân router được gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** sub-interface | subinterface | sub interface | cửa logic | cua logic
  - **Chủ đề gợi ý (tầng 1):** tên gọi của cửa logic trên một chân vật lý
  - **Gợi ý (tầng 2):** Tiếng Anh ghép từ interface với tiền tố mang nghĩa con, phụ — cùng tiền tố với subnet.
  - **Lời giải (tầng 3):** Sub-interface. Mỗi sub-interface mang một số VLAN và một địa chỉ IP đóng vai gateway cho chính xóm đó.
- **Đề:** Nhược điểm rõ nhất của router-on-a-stick là gì?
  - **Dạng:** trắc nghiệm · **Lưu lượng giữa các VLAN đi vào rồi ra trên cùng một sợi, nên sợi đó gánh gấp đôi** ✓ / Router bắt buộc phải có ít nhất bốn chân vật lý mới chia được cửa logic / Các VLAN đi qua kiểu này sẽ mất nhãn nên switch không phân biệt được nữa
  - **Chủ đề gợi ý (tầng 1):** đường đi của gói tin khi hai VLAN nói chuyện với nhau
  - **Gợi ý (tầng 2):** Vẽ đường đi của một gói từ VLAN 10 sang VLAN 20: nó qua sợi dây router mấy lần?
  - **Lời giải (tầng 3):** Gói đi lên router rồi lại quay xuống trên đúng sợi ấy, nên sợi gánh cả chiều vào lẫn chiều ra. Cách này sinh ra chính là để dùng một chân, và nhãn VLAN vẫn nguyên vẹn trên trunk.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: sợi dây nối switch với router trong kiểu router-on-a-stick phải được khai là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** trunk | cổng trunk | cong trunk | đường trunk
  - **Gợi ý (tầng 2):** Chính là thứ cả module này nói về — một sợi chở nhiều xóm.
  - **Lời giải (tầng 3):** Trunk. Không có trunk thì chân router chỉ nhận được đúng một VLAN, và ý tưởng một-chân-cho-nhiều-xóm sụp ngay từ đầu.
- **Tự giải thích:** Giải thích bằng lời của bạn: một chân router phục vụ được bốn VLAN bằng cách nào?
  - **Nhóm ý cần chạm:** [trunk, một sợi, chung một dây] · [sub-interface, cửa logic, chia nhỏ, nhiều cửa] · [gateway, địa chỉ ip, mỗi vlan một]
  - **Trả lời mẫu:** Sợi nối switch với router được khai là trunk nên cả bốn xóm cùng đi vào một chân. Bên trong router, chân đó chia thành nhiều sub-interface, mỗi cửa mang một số VLAN và một địa chỉ IP làm gateway cho xóm ấy.

**6 · Tổng kết:**
- Router-on-a-stick: một chân router phục vụ nhiều VLAN nhờ sợi nối là trunk.
- Mỗi sub-interface mang một số VLAN và một IP gateway cho xóm đó.
- Cái giá phải trả: lưu lượng liên VLAN đi vào và ra trên cùng một sợi.
- *Úp mở bài sau:* Hai switch nối nhau đã ngon. Nhưng nếu ai đó cắm thêm một sợi thứ hai cho chắc ăn, mạng sẽ chết trong vài giây — module sau cho bạn xem cơn bão đó, và người canh gác đứng ra dập nó.

### Khái niệm & flashcard (5)

- **Trunk** `trunk` — Cổng trunk — cổng switch chở nhiều VLAN trên cùng một sợi dây, khác cổng access chỉ thuộc một VLAN
  - Ẩn dụ: Như xe buýt đường dài chạy qua nhiều xóm: một chuyến chở khách của cả bốn xóm, thay vì mỗi xóm phải có một chuyến riêng.
  - Thẻ ôn: *Cổng trunk khác cổng access ở chỗ nào?* → Cổng access chỉ thuộc đúng một VLAN và gửi khung trần; cổng trunk chở nhiều VLAN trên một sợi và dán nhãn cho khung để đầu kia biết khung thuộc xóm nào.
- **Tagged frame** `tagged-frame` — Khung mang nhãn — khung được chèn thêm nhãn 802.1Q ghi số VLAN khi đi qua trunk
  - Ẩn dụ: Như dán mẩu giấy ghi tên xóm lên từng kiện hàng trước khi chất chung một chuyến xe — tới nơi, người ta bóc giấy ra rồi mới giao.
  - Thẻ ôn: *Nhãn 802.1Q được dán vào lúc nào và gỡ ra lúc nào?* → Dán khi khung đi ra trunk, gỡ khi khung được giao xuống cổng access. Máy người dùng không bao giờ thấy nhãn, nên chia VLAN không đòi cấu hình gì trên máy.
- **Native VLAN** `native-vlan` — VLAN đi qua trunk mà KHÔNG mang nhãn; mặc định là VLAN 1 và phải khớp ở hai đầu
  - Ẩn dụ: Như một kiện hàng không dán giấy vì ai cũng ngầm hiểu nó của xóm nào. Hai bên hiểu khác nhau là kiện hàng đi lạc mà không ai biết.
  - Thẻ ôn: *Chuyện gì xảy ra khi hai đầu trunk khai native VLAN khác nhau?* → Khung đi trần từ native VLAN bên này bị hiểu thành khung của native VLAN bên kia — rơi sang xóm khác, im lặng, không báo lỗi. Các VLAN mang nhãn vẫn chạy nên chỉ hỏng một nửa.
- **Allowed VLAN list** `allowed-list` — Danh sách VLAN được phép đi qua một trunk; thiếu = mặc định cho tất cả đi qua
  - Ẩn dụ: Như danh sách khách mời dán ở cổng: không có danh sách thì ai cũng vào; có danh sách mà quên một tên thì đúng người đó bị chặn, còn cả đoàn vẫn vào bình thường.
  - Thẻ ôn: *Trunk khai thiếu một VLAN trong allowed list thì hỏng thế nào?* → Đúng VLAN đó không qua được trunk, các VLAN khác vẫn chạy bình thường. Xem danh sách hiện hành bằng show interfaces trunk; sửa bằng switchport trunk allowed vlan, và lệnh này ghi đè cả danh sách.
- **Router-on-a-stick** `router-on-a-stick` — Một chân router phục vụ nhiều VLAN: dây nối là trunk, chân được chia thành các sub-interface
  - Ẩn dụ: Như một quầy tiếp dân duy nhất chia thành bốn ô cửa: khách xóm nào tới đúng ô của xóm đó, mà tòa nhà vẫn chỉ có một lối vào.
  - Thẻ ôn: *Router-on-a-stick hoạt động thế nào, và cái giá của nó là gì?* → Dây nối switch với router là trunk; chân router chia thành các sub-interface, mỗi cửa mang một VLAN và một IP gateway. Cái giá: lưu lượng liên VLAN đi vào rồi ra trên cùng một sợi nên sợi đó gánh gấp đôi.

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Cổng trunk khác cổng access ở điểm cốt lõi nào?
  - **Dạng:** trắc nghiệm · **Trunk chở nhiều VLAN trên một sợi, access chỉ thuộc đúng một VLAN** ✓ / Trunk chạy nhanh hơn access vì dùng loại cáp có nhiều lõi đồng hơn / Trunk chỉ nối được xuống máy người dùng, access chỉ nối ngang thiết bị
  - **Chủ đề gợi ý (tầng 1):** số VLAN mà mỗi loại cổng phục vụ
  - **Vì sao:** Khác nhau ở số xóm phục vụ, không phải ở tốc độ hay loại cáp. Trunk còn nối NGANG giữa các thiết bị mạng, còn access nối XUỐNG máy người dùng.
- **Đề:** Tên chuẩn dán nhãn VLAN lên khung là gì? (viết dạng số hiệu chuẩn)
  - **Dạng:** gõ tay · **Chấp nhận:** 802.1q | 802.1Q | dot1q | ieee 802.1q | 8021q
  - **Chủ đề gợi ý (tầng 1):** chuẩn dán nhãn của IEEE
  - **Vì sao:** 802.1Q, tên tắt trong nghề là dot1q; nhãn dài 4 byte và chứa 12 bit số VLAN.
- **Đề:** Đang ở dấu nhắc Switch-1(config-if)#, gõ lệnh gì để biến cổng đang chọn thành trunk?
  - **Dạng:** gõ tay · **Chấp nhận:** switchport mode trunk | sw mode trunk
  - **Chủ đề gợi ý (tầng 1):** lệnh đặt vai cho một cổng switch
  - **Vì sao:** switchport mode trunk. Thay trunk bằng access là trả cổng về vai chỉ phục vụ một VLAN.
- **Đề:** Hai đầu trunk khai native VLAN khác nhau thì hậu quả là gì?
  - **Dạng:** trắc nghiệm · **Khung đi trần lặng lẽ rơi sang VLAN khác, không thiết bị nào báo lỗi** ✓ / Cả sợi trunk ngừng hoạt động và mọi VLAN đều mất kết nối lập tức / Switch tự động đổi native của một đầu cho khớp với đầu còn lại
  - **Chủ đề gợi ý (tầng 1):** xóm nào đi qua trunk mà không mang nhãn
  - **Vì sao:** Chỉ khung của native VLAN đi trần nên chỉ nó bị hiểu nhầm; các VLAN mang nhãn vẫn chạy, và đó chính là lý do ca bệnh này khó tìm.
- **Đề:** Native VLAN mặc định của một trunk là VLAN số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 1 | vlan 1 | vlan1
  - **Chủ đề gợi ý (tầng 1):** VLAN mặc định của mọi cổng switch
  - **Vì sao:** VLAN 1 — cũng là VLAN mặc định của mọi cổng, nên hai đầu thường tự khớp cho tới khi có người đổi một bên.
- **Đề:** Một trunk chưa khai allowed list thì cho VLAN nào đi qua?
  - **Dạng:** trắc nghiệm · **Tất cả các VLAN** ✓ / Chỉ native VLAN / Chỉ VLAN 10 và 20
  - **Chủ đề gợi ý (tầng 1):** mặc định rộng hay hẹp của một trunk
  - **Vì sao:** Mặc định trunk cho tất cả VLAN qua. Danh sách allowed là do người quản trị thu hẹp lại, và cũng từ đó mới có bệnh thiếu tên trong danh sách.
- **Đề:** Lệnh nào in ra bảng cho biết cổng nào đang là trunk, native VLAN và danh sách VLAN được phép đi qua?
  - **Dạng:** gõ tay · **Chấp nhận:** show interfaces trunk | show interface trunk | sh int trunk | show int trunk
  - **Chủ đề gợi ý (tầng 1):** bảng tra cứu của một sợi trunk
  - **Vì sao:** show interfaces trunk. Bảng rỗng nghĩa là switch này chưa có cổng trunk nào — và chính cái bảng rỗng ấy thường là câu trả lời.
- **Đề:** Xếp lại đúng thứ tự các lệnh để khai cổng p4 thành trunk từ dấu nhắc Switch-1>.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. enable
    2. configure terminal
    3. interface p4
    4. switchport mode trunk
  - **Chủ đề gợi ý (tầng 1):** thứ tự các chế độ của CLI
  - **Vì sao:** Đi từ chế độ xem lên chế độ có quyền, vào cấu hình chung, chọn đúng cổng, rồi mới đặt vai. Gõ nhảy cóc thì máy từ chối bằng đúng câu lỗi của thiết bị thật.
- **Đề:** Sợi nối hai switch vẫn đang là cổng access nên hai tòa nhà chưa thấy nhau. Vào console dựng trunk cho VLAN 10 và VLAN 20 cùng đi chung sợi đó — nhớ làm đủ cả hai đầu.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (kế toán) [192.168.1.10/24] · PC-B (kế toán) [192.168.1.20/24] · PC-C (kỹ thuật) [192.168.1.30/24] · Switch-1 [p1:VLAN 10, p2:VLAN 20, p4:VLAN 1] · Switch-2 [p1:VLAN 10, p2:VLAN 20, p4:VLAN 1] — dây: PC-A (kế toán)·eth0 — Switch-1·p1 | PC-C (kỹ thuật)·eth0 — Switch-1·p2 | PC-B (kế toán)·eth0 — Switch-2·p1 | Switch-1·p4 — Switch-2·p4
    - **Console cắm ở:** Switch-1
    - **Mục tiêu:**
      - cổng p4 của Switch-1 phải là trunk
      - cổng p4 của Switch-2 phải là trunk
      - pc-a PHẢI gọi được pc-b
      - pc-a phải KHÔNG gọi được pc-c
    - **Lệnh mẫu trên Switch-1:** `enable` rồi `configure terminal` rồi `interface p4` rồi `switchport mode trunk` rồi `end`
    - **Lệnh mẫu trên Switch-2:** `enable` rồi `configure terminal` rồi `interface p4` rồi `switchport mode trunk` rồi `end`
  - **Chủ đề gợi ý (tầng 1):** vai của cổng nối giữa hai switch
  - **Vì sao:** Khai trunk ở CẢ HAI đầu thì VLAN 10 đi lại được giữa hai tòa nhà, mà kế toán vẫn không gọi được sang kỹ thuật — bức tường VLAN của Module 4 còn nguyên.
- **Đề:** Trunk đã dựng nhưng ai đó khai native VLAN lệch nhau giữa hai đầu, và hai máy kế toán mất nhau. Vào console chữa cho hai đầu khớp lại.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (kế toán) [192.168.1.10/24] · PC-B (kế toán) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 20, p4:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 20, p4:VLAN 1] — dây: PC-A (kế toán)·eth0 — Switch-1·p1 | PC-B (kế toán)·eth0 — Switch-2·p1 | Switch-1·p4 — Switch-2·p4
    - **Console cắm ở:** Switch-2
    - **Mục tiêu:**
      - hai đầu trunk p4 của Switch-1 và p4 của Switch-2 phải khai CÙNG native VLAN
      - pc-a PHẢI gọi được pc-b
    - **Lệnh mẫu trên Switch-2:** `enable` rồi `configure terminal` rồi `interface p4` rồi `switchport trunk native vlan 1` rồi `end`
  - **Chủ đề gợi ý (tầng 1):** số native VLAN ở hai đầu trunk
  - **Vì sao:** Hai đầu phải cùng một số native — và bộ chấm đo đúng điều đó: sửa đầu nào cũng được, miễn hai đầu khớp lại. Ngoài đời người ta thường đưa đầu LỆCH về theo quy hoạch chung, vì đổi đầu đang đúng chuẩn nghĩa là sửa hồ sơ của cả xóm đang chạy yên.
- **Đề:** Máy tính cắm vào cổng access có nhìn thấy nhãn 802.1Q không?
  - **Dạng:** trắc nghiệm · **Không, switch đã gỡ nhãn trước khi giao khung xuống cổng access** ✓ / Có, card mạng phải tự đọc nhãn mới biết mình thuộc VLAN nào / Có, nhưng chỉ khi máy chạy hệ điều hành hỗ trợ chuẩn 802.1Q
  - **Chủ đề gợi ý (tầng 1):** nhãn tồn tại trên đoạn dây nào
  - **Vì sao:** Nhãn chỉ sống trên trunk. Nhờ vậy chia VLAN không đòi cấu hình gì trên máy người dùng.
- **Đề:** Trong kiểu router-on-a-stick, sợi dây nối switch với router phải được khai là gì?
  - **Dạng:** trắc nghiệm · **Trunk, để mọi VLAN cùng đi vào một chân router** ✓ / Cổng access của VLAN có nhiều máy nhất trong công ty / Cổng access của native VLAN để router khỏi phải đọc nhãn
  - **Chủ đề gợi ý (tầng 1):** cách nhiều xóm cùng đi vào một chân
  - **Vì sao:** Phải là trunk. Chân router sau đó chia thành các sub-interface, mỗi cửa một VLAN và một IP gateway.

## STP — Người canh vòng lặp `module-15`

Phần D · 5 chặng · 5 bài · 6 khái niệm

**Chặng:** Cơn bão trong ba giây (m15-bai-1) → Bầu ra gốc cây (m15-bai-2) → Cổng nằm im không phải cổng hỏng (m15-bai-3) → Đứt dây chính, cây mọc lối khác (m15-bai-4) → Cổng cắm máy khỏi phải chờ (m15-bai-5)

### Bài: Dập cơn bão quảng bá `m15-bai-1`

**1 · Khởi động (hook):** Ba switch của ba tầng nhà được nối thành một vòng khép kín — người lắp nghĩ rằng có đường dự phòng thì chắc ăn hơn. Cắm xong sợi cuối cùng, cả ba tầng mất mạng trong vòng vài giây, đèn trên switch nhấp nháy như đèn vũ trường. Sợi dây dự phòng ấy đã gây ra chuyện gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đây đúng là mạng ba tầng ấy. Bấm Gửi thử để tự xem chuyện gì xảy ra, rồi tìm cách cho PC-A gọi được PC-B mà KHÔNG rút sợi dây nào. Sai cũng không sao — phần này không tính điểm.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** PC-A (tầng 1) [192.168.1.10/24] · PC-B (tầng 3) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-A (tầng 1)·eth0 — Switch-1·p1 | PC-B (tầng 3)·eth0 — Switch-3·p1 | Switch-1·p2 — Switch-2·p2 | Switch-2·p3 — Switch-3·p2 | Switch-3·p3 — Switch-1·p3
    - **Mục tiêu:**
      - pc-a PHẢI gọi được pc-b
    - **Được phép:** KHÔNG cho phép thao tác nào (đề bài hỏng)
    - **Lời giải mẫu:** PC-A (tầng 1) [192.168.1.10/24] · PC-B (tầng 3) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-A (tầng 1)·eth0 — Switch-1·p1 | PC-B (tầng 3)·eth0 — Switch-3·p1 | Switch-1·p2 — Switch-2·p2 | Switch-2·p3 — Switch-3·p2 | Switch-3·p3 — Switch-1·p3
  - **Chủ đề gợi ý (tầng 1):** thứ canh chừng vòng lặp trên sơ đồ
  - **Vì sao:** Vòng kín ở tầng 2 làm khung quảng bá quay lại chính chỗ nó vừa đi qua rồi nhân lên mãi — đó là bão quảng bá. Bật Spanning Tree lên, switch tự chặn bớt một cổng để cắt vòng, và mạng sống lại ngay mà sợi dây dự phòng vẫn còn nguyên.

**3 · Khám phá (teach):**
- *[bao-quang-ba]* Ở tầng 2 không có thứ gì giống TTL của gói tin IP: khung quảng bá không có bộ đếm để tự chết. Nối ba switch thành vòng kín thì một khung quảng bá đi hết vòng lại quay về switch đầu tiên, switch này lại phát tiếp ra mọi cổng, và mỗi vòng lại nhân đôi số bản sao. Chỉ vài giây là đường truyền đầy khung rác, bảng MAC loạn lên vì cùng một địa chỉ lúc thấy ở cổng này lúc thấy ở cổng kia, và cả mạng đứng hình. Đó là bão quảng bá.
  - **Đào sâu hơn:** Vì sao khung tầng 2 không có TTL? Vì Ethernet sinh ra cho một đoạn cáp chung, nơi không có khái niệm đi qua nhiều chặng — không ai nghĩ sẽ có vòng. Khi mạng lớn lên và người ta nối switch với nhau để dự phòng, vòng lặp thành chuyện có thật, và lời giải là một giao thức đứng canh chứ không phải sửa lại khuôn khung tin. Hậu quả thực tế của một cơn bão còn nặng hơn mất mạng: CPU của switch chạy hết công suất nên console cũng đơ, người quản trị không vào nổi thiết bị để chữa.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Cách đọc một cơn bão trên phòng lab, từng bước. Bước 1: bấm Gửi thử với sơ đồ vòng chưa bật STP, rồi đọc nhật ký chặng — bạn sẽ thấy cùng một khung ARP xuất hiện lại ở switch đã đi qua, và kết quả trả về là mã bão quảng bá. Bước 2: hỏi đúng câu hỏi chẩn đoán — sơ đồ này có đường nào đi vòng về chỗ cũ không? Ba switch nối tam giác thì có. Bước 3: đừng rút dây. Rút là mất luôn đường dự phòng, mà đường dự phòng là lý do người ta kéo sợi đó. Bước 4: bật Spanning Tree ở bảng điều khiển của phòng lab. Switch sẽ tự chọn ra một cổng để chặn, vòng bị cắt, khung quảng bá hết đường quay lại. Bước 5: bấm Gửi thử lần nữa — gói tin đi tới nơi và có trả lời về.
- **Đề:** Vì sao khung quảng bá đi vòng mãi không tự chết như gói tin IP?
  - **Dạng:** trắc nghiệm · **Vì khung tầng 2 không có bộ đếm chặng, nên không có gì bảo nó dừng lại** ✓ / Vì switch cố tình giữ lại bản sao của mọi khung quảng bá để tra cứu sau / Vì khung quảng bá luôn được ưu tiên hơn khung thường nên không bị bỏ
  - **Chủ đề gợi ý (tầng 1):** thứ mà gói tin IP có còn khung tầng 2 thì không
  - **Gợi ý (tầng 2):** Nhớ lại Module 4: cái gì làm gói tin IP tự chết sau một số chặng? Khung tầng 2 có thứ tương đương không?
  - **Lời giải (tầng 3):** Vì khung tầng 2 không có TTL — không có bộ đếm chặng nào để nó tự hết hạn. Switch không giữ bản sao, và khung quảng bá cũng không được ưu tiên gì cả; vấn đề nằm ở chỗ không ai bảo nó dừng.
- **Đề:** Mạng có vòng kín đang bão. Bạn muốn giữ nguyên sợi dây dự phòng mà mạng vẫn sống — phải bật thứ gì lên?
  - **Dạng:** gõ tay · **Chấp nhận:** stp | spanning tree | spanning-tree | giao thức spanning tree
  - **Chủ đề gợi ý (tầng 1):** tên giao thức đứng canh vòng lặp
  - **Gợi ý (tầng 2):** Điền chỗ trống: tên tiếng Anh của nó là Spanning Tree Protocol, viết tắt ba chữ cái.
  - **Lời giải (tầng 3):** STP — Spanning Tree Protocol. Nó không rút dây của bạn; nó chỉ chọn ra một cổng và cho cổng đó nằm im, đủ để cắt vòng mà vẫn giữ sợi dây làm dự phòng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: hiện tượng khung quảng bá nhân lên mãi trong một mạng có vòng kín gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** bão quảng bá | bao quang ba | broadcast storm | bão broadcast | bao broadcast
  - **Gợi ý (tầng 2):** Hai chữ: một chữ chỉ hiện tượng thời tiết dữ dội, một chữ là kiểu gửi cho cả phòng.
  - **Lời giải (tầng 3):** Bão quảng bá — tiếng Anh là broadcast storm. Mỗi vòng lại nhân đôi số bản sao, nên chỉ vài giây là mạng tắc nghẽn hoàn toàn.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao thêm một sợi dây dự phòng lại làm sập cả mạng?
  - **Nhóm ý cần chạm:** [vòng, vòng kín, vòng lặp, tam giác] · [quảng bá, broadcast, khung phát cho cả phòng] · [nhân lên, quay lại, lặp mãi, không dừng] · [không có ttl, không tự chết, không có bộ đếm]
  - **Trả lời mẫu:** Vì sợi dây thứ hai tạo ra một vòng kín. Khung quảng bá đi hết vòng lại quay về chỗ cũ, switch phát tiếp ra mọi cổng, và vì khung tầng 2 không có bộ đếm chặng nào để tự chết nên số bản sao cứ nhân lên tới khi mạng tắc.

**6 · Tổng kết:**
- Vòng kín ở tầng 2 sinh ra bão quảng bá: khung nhân lên mãi vì không có TTL.
- Chữa bằng cách bật STP, không phải bằng cách rút dây dự phòng.
- STP chặn bớt một cổng để cắt vòng, sợi dây vẫn nằm đó chờ tới lượt.
- *Úp mở bài sau:* STP chặn một cổng — nhưng cổng nào, trên switch nào? Bài sau cho bạn xem cuộc bầu cử mà các switch tự tổ chức với nhau, và luật thắng cử hơi ngược đời.

### Bài: Tìm ra gốc của cây `m15-bai-2`

**1 · Khởi động (hook):** Ba switch vừa được cắm điện cùng lúc, không ai cấu hình gì thêm. Vài giây sau, cả ba đã thống nhất được với nhau ai là trung tâm và cổng nào phải nằm im — không có máy chủ nào đứng ra phân xử. Chúng bầu bằng cách nào, và ai thắng?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: switch nào được bầu làm root bridge?
  - **Dạng:** trắc nghiệm · **Switch có số priority NHỎ nhất** ✓ / Switch có số priority LỚN nhất / Switch được cắm điện sớm nhất trong cả nhóm
  - **Vì sao:** Số nhỏ hơn thắng — đây là chỗ rất dễ nhớ ngược. Hòa priority thì so tiếp địa chỉ MAC, và cũng là MAC nhỏ hơn thắng.

**3 · Khám phá (teach):**
- *[bpdu]* Các switch nói chuyện với nhau bằng một loại khung riêng gọi là BPDU (Bridge Protocol Data Unit). Cứ vài giây một lần, mỗi switch phát BPDU ra các cổng để khoe mình là ai và mình cách gốc cây bao xa. Nhờ dòng tin đó, cả nhóm tự thống nhất được sơ đồ cây mà không cần ai đứng ra chỉ huy — và cũng nhờ nó mà khi có sợi dây đứt, cả nhóm biết ngay để tính lại.
  - **Đào sâu hơn:** Trong app này, cây STP được tính ra một lần theo sơ đồ chứ không mô phỏng dòng BPDU theo thời gian — bạn thấy KẾT QUẢ của cuộc bầu, không thấy từng khung chạy. Thiết bị thật gửi BPDU mỗi 2 giây và một cổng phải đi qua các bậc lắng nghe rồi học hỏi trước khi được phát, tổng cộng khoảng 30 giây với STP đời đầu. Con số 30 giây đó chính là lý do bài cuối module tồn tại.
- *[root-bridge]* Root bridge là gốc của cây: mọi đường đi đều được tính theo khoảng cách tới nó. Luật bầu chọn theo thứ tự: ai có số priority NHỎ hơn thì thắng; hòa priority thì ai có địa chỉ MAC nhỏ hơn thắng. Mặc định mọi switch đều mang priority 32768, nên nếu không ai cấu hình gì thì kết cục do MAC quyết định — tức là do lô sản xuất quyết định. Người làm mạng nghiêm túc luôn tự chỉ định root bằng cách hạ priority của switch trung tâm xuống, thay vì để may rủi chọn hộ.
  - **Đào sâu hơn:** Vì sao để MAC quyết định lại tệ? Vì MAC nhỏ thường thuộc về thiết bị CŨ nhất trong phòng máy — cái switch mua từ đời nào, đặt ở góc nhà, đường lên yếu nhất. Cây STP khi đó lấy nó làm trung tâm và mọi lưu lượng bị hút vòng qua đó. Trên thiết bị thật, priority chỉ nhận bội số của 4096, nên các mức hay dùng là 0, 4096, 8192 — đặt switch lõi ở 4096 và switch dự phòng ở 8192 là nếp phổ biến.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Ba switch trong sơ đồ này đã bật STP. Vào console của Switch-1 và tra xem cây đang lấy switch nào làm gốc.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (tầng 1) [192.168.1.10/24] · PC-B (tầng 3) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-A (tầng 1)·eth0 — Switch-1·p1 | PC-B (tầng 3)·eth0 — Switch-3·p1 | Switch-1·p2 — Switch-2·p2 | Switch-2·p3 — Switch-3·p2 | Switch-3·p3 — Switch-1·p3
    - **Console cắm ở:** Switch-1
    - **Mục tiêu:**
      - phải xem "show spanning-tree" trên Switch-1
    - **Lệnh mẫu trên Switch-1:** `show spanning-tree`
  - **Chủ đề gợi ý (tầng 1):** lệnh xem trạng thái cây STP
  - **Gợi ý (tầng 2):** Cú pháp khuyết: show … — phần còn thiếu chính là tên tiếng Anh của cây, viết có dấu gạch nối ở giữa.
  - **Lời giải (tầng 3):** show spanning-tree. Bảng in ra dòng Root bridge: Switch-2 — vì Switch-2 mang priority 4096, nhỏ hơn 32768 của hai switch còn lại nên nó thắng cuộc bầu.
- **Đề:** Ba switch đều để nguyên priority mặc định 32768. Ai sẽ thành root bridge?
  - **Dạng:** trắc nghiệm · **Switch có địa chỉ MAC nhỏ nhất, thường là thiết bị cũ nhất trong phòng máy** ✓ / Switch nằm ở giữa sơ đồ vì nó có nhiều đường nối tới các switch khác nhất / Không switch nào cả, vì hòa priority thì cây STP sẽ không dựng được
  - **Chủ đề gợi ý (tầng 1):** cái được đem ra so khi priority hòa nhau
  - **Gợi ý (tầng 2):** Hòa priority thì luật chuyển sang so một con số gắn chết vào phần cứng từ nhà máy — Module 3 gọi nó là số khung.
  - **Lời giải (tầng 3):** Switch có MAC nhỏ nhất thắng — và MAC nhỏ thường thuộc thiết bị cũ nhất, thường cũng là cái yếu nhất. Vị trí trong sơ đồ không được tính tới, còn hòa priority thì cây vẫn dựng được vì luôn còn MAC để phân định.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: hai switch có priority bằng nhau thì cái nào thắng cuộc bầu root?
  - **Dạng:** gõ tay · **Chấp nhận:** mac nhỏ hơn | mac nho hon | địa chỉ mac nhỏ hơn | dia chi mac nho hon | cái có mac nhỏ hơn | mac thấp hơn | mac thap hon
  - **Gợi ý (tầng 2):** Vẫn là luật nhỏ hơn thắng, nhưng lần này so con số gắn chết vào card mạng.
  - **Lời giải (tầng 3):** Cái có địa chỉ MAC nhỏ hơn. Vì thế để mặc định là giao cây cho lô sản xuất quyết định — nên người làm nghề luôn tự hạ priority của switch trung tâm xuống.
- **Tự giải thích:** Giải thích bằng lời của bạn: các switch bầu root bridge theo luật nào, và vì sao không nên để mặc định?
  - **Nhóm ý cần chạm:** [priority, độ ưu tiên, số ưu tiên] · [nhỏ hơn, thấp hơn, bé hơn] · [mac, địa chỉ mac, số khung] · [thiết bị cũ, máy cũ, may rủi, ngẫu nhiên, không kiểm soát]
  - **Trả lời mẫu:** Ai có priority nhỏ hơn thì thắng; hòa priority thì so MAC, cũng nhỏ hơn thắng. Để mặc định thì mọi switch cùng 32768 nên kết cục do MAC quyết định, mà MAC nhỏ thường là thiết bị cũ nhất — cây sẽ lấy đúng cái yếu nhất làm trung tâm.

**6 · Tổng kết:**
- Switch nói chuyện với nhau bằng BPDU để tự dựng cây, không cần ai chỉ huy.
- Bầu root: priority nhỏ hơn thắng; hòa thì MAC nhỏ hơn thắng.
- Để mặc định là giao cây cho lô sản xuất chọn — hãy tự chỉ định switch trung tâm.
- *Úp mở bài sau:* Cây đã có gốc, và đâu đó trong sơ đồ có một cổng đang nằm im. Bài sau nói về cái cổng ấy — thứ mà người mới nhìn thấy là tưởng hỏng và đi thay dây.

### Bài: Đọc đúng một cổng đang nằm im `m15-bai-3`

**1 · Khởi động (hook):** Bạn mới nhận bàn giao một phòng máy. Trên switch tầng ba có một cổng cắm dây đàng hoàng nhưng đèn không sáng như các cổng khác, và nó đã như thế nhiều tháng. Người bàn giao bảo cứ để yên. Đây là một cổng hỏng cần thay dây, hay là một thứ khác?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: một cổng bị STP chặn nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Nó đang được giữ làm dự phòng, không phát khung để tránh vòng lặp** ✓ / Nó đã hỏng phần cứng và cần được thay bằng cổng khác trên switch / Nó đang bị quản trị viên tắt bằng lệnh nên không hoạt động nữa
  - **Vì sao:** Cổng bị chặn là TÍNH NĂNG chứ không phải hỏng: nó vẫn nghe ngóng, chỉ không phát khung dữ liệu, và sẽ mở ra ngay khi đường chính đứt.

**3 · Khám phá (teach):**
- *[cong-chan]* Cắt vòng nghĩa là phải có ai đó ngừng phát. STP chọn ra cổng xa gốc cây nhất trên sợi dây thừa và cho nó ở trạng thái chặn: cổng vẫn nghe BPDU để biết cây có đổi không, nhưng không phát khung dữ liệu nào. Trong bảng show spanning-tree, cổng ấy hiện vai Altn và trạng thái BLK; trên sơ đồ của phòng lab, nó được vẽ rỗng ruột viền hổ phách để bạn nhận ra ngay — nó không hỏng, nó đang chờ tới lượt.
  - **Đào sâu hơn:** Mỗi switch không phải root có đúng một root port — cổng hướng về gốc cây, luôn được phát. Trên mỗi sợi dây còn lại, đầu nào xa gốc hơn thì bị chặn. Vì thế số cổng bị chặn đúng bằng số sợi dây thừa so với một cây: ba switch nối tam giác có ba dây nhưng cây chỉ cần hai, nên đúng một cổng nằm im. Nếu bạn thấy nhiều cổng bị chặn hơn dự đoán, thường là sơ đồ có nhiều vòng hơn bạn tưởng — và đó là một manh mối chẩn đoán rất tốt.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Trong bảng show spanning-tree, cổng đang bị chặn hiện trạng thái viết tắt là gì? (ba chữ cái)
  - **Dạng:** gõ tay · **Chấp nhận:** blk | BLK | blocking
  - **Chủ đề gợi ý (tầng 1):** cột trạng thái của bảng spanning-tree
  - **Gợi ý (tầng 2):** Điền chỗ trống: cổng đang phát ghi FWD (forwarding), còn cổng nằm im ghi … — viết tắt của blocking.
  - **Lời giải (tầng 3):** BLK, viết tắt của blocking. Cùng dòng đó, cột vai ghi Altn — cổng thay thế, tức là đường dự phòng.
- **Đề:** Ba switch nối thành tam giác và đã bật STP. Có bao nhiêu cổng bị chặn?
  - **Dạng:** trắc nghiệm · **Đúng một cổng** ✓ / Đúng ba cổng / Không cổng nào
  - **Chủ đề gợi ý (tầng 1):** số dây thừa so với một cây không vòng
  - **Gợi ý (tầng 2):** Ba switch muốn nối liền nhau mà không có vòng thì cần mấy sợi dây? Tam giác đang có mấy sợi?
  - **Lời giải (tầng 3):** Đúng một. Ba switch chỉ cần hai sợi là đã liền mạch; tam giác có ba sợi nên thừa một, và STP chặn đúng một cổng để cắt vòng đó.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: cổng bị STP chặn có còn nghe BPDU không?
  - **Dạng:** gõ tay · **Chấp nhận:** có | co | vẫn nghe | van nghe | có, vẫn nghe
  - **Gợi ý (tầng 2):** Nếu nó điếc hẳn thì làm sao biết lúc nào đường chính đứt để mở ra?
  - **Lời giải (tầng 3):** Có. Cổng chặn vẫn nghe BPDU để theo dõi cây — nhờ vậy nó biết khi nào đường chính hỏng và tới lượt mình phát.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao cổng bị chặn là tính năng chứ không phải sự cố?
  - **Nhóm ý cần chạm:** [cắt vòng, chống vòng lặp, tránh bão, chặn vòng] · [dự phòng, chờ tới lượt, để dành, thay thế] · [vẫn nghe, vẫn theo dõi, bpdu, mở ra khi đứt]
  - **Trả lời mẫu:** Vì phải có một cổng ngừng phát thì vòng mới bị cắt và mạng mới hết bão. Cổng ấy không hỏng: nó vẫn nghe BPDU, và khi đường chính đứt thì nó mở ra gánh lưu lượng — đó chính là lý do người ta kéo sợi dây thứ hai.

**6 · Tổng kết:**
- Cổng bị chặn không phát khung dữ liệu nhưng vẫn nghe BPDU.
- Bảng show spanning-tree ghi vai Altn, trạng thái BLK cho cổng ấy.
- Số cổng bị chặn đúng bằng số sợi dây thừa so với một cây không vòng.
- *Úp mở bài sau:* Vậy cái cổng nằm im ấy bao giờ mới tới lượt? Bài sau cắt đứt sợi dây chính ngay trước mắt bạn — và bạn sẽ tự kiểm chứng lưu lượng đi lối nào.

### Bài: Chứng minh đường dự phòng có thật `m15-bai-4`

**1 · Khởi động (hook):** Máy xúc ngoài đường vừa cắt trúng sợi cáp chạy giữa tầng 1 và tầng 2 — đúng sợi mà mọi lưu lượng đang đi qua. Không ai kịp chạm vào switch, mà vài giây sau nhân viên báo mạng vẫn dùng được bình thường. Lưu lượng đã đi lối nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: đường chính đứt thì cổng đang bị chặn sẽ ra sao?
  - **Dạng:** trắc nghiệm · **Tự mở ra và bắt đầu phát khung** ✓ / Vẫn nằm im cho tới khi có người vào bật lại bằng lệnh / Bị đánh dấu hỏng luôn vì cây STP đã tính xong từ trước
  - **Vì sao:** Cổng chặn vẫn nghe BPDU nên nhận ra cây đã đổi. Nó tự chuyển sang phát — không cần ai chạm vào thiết bị.

**3 · Khám phá (teach):**
- *[hoi-tu-lai]* Cây STP không phải bức tranh vẽ một lần rồi treo đó. Dòng BPDU chạy đều đặn, nên khi một sợi dây đứt, các switch quanh đó phát hiện ra và cả nhóm tính lại cây. Cổng đang bị chặn thấy đường về gốc không còn nữa liền chuyển sang phát, và lưu lượng đi lối mới. Đó là lý do người ta chịu kéo sợi cáp thứ hai dù biết nó sẽ nằm im: nó không nằm im mãi mãi, nó nằm im tới đúng cái ngày cần tới.
  - **Đào sâu hơn:** Trong app này, cây được tính lại tức thì theo sơ đồ hiện tại — bạn rút dây thì lượt Gửi thử kế tiếp đã đi lối mới. Thiết bị thật cần thời gian: STP đời đầu mất khoảng 30 tới 50 giây để một cổng chặn chuyển hẳn sang phát, đủ lâu để người dùng kịp than phiền. Đó là lý do các phiên bản sau như RSTP ra đời, rút thời gian ấy xuống dưới một giây — nhưng luật bầu cây thì vẫn y nguyên những gì bạn học ở bài trước.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Sơ đồ này đang chạy ổn, lưu lượng từ PC-A đi vòng qua Switch-2 để tới PC-B. Hãy đóng vai máy xúc: rút sợi dây giữa Switch-1 và Switch-2 ra, rồi chứng minh PC-A vẫn gọi được PC-B và Switch-3 giờ nhận khung của PC-A ngay trên cổng p3 — cái cổng vốn đang nằm im.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** PC-A (tầng 1) [192.168.1.10/24] · PC-B (tầng 3) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-A (tầng 1)·eth0 — Switch-1·p1 | PC-B (tầng 3)·eth0 — Switch-3·p1 | Switch-1·p2 — Switch-2·p2 | Switch-2·p3 — Switch-3·p2 | Switch-3·p3 — Switch-1·p3
    - **Mục tiêu:**
      - pc-a PHẢI gọi được pc-b
      - sw-3 học được AA:BB:CC:00:00:01 ở cổng p3 (VLAN 1)
    - **Được phép:** gỡ dây
    - **Lời giải mẫu:** PC-A (tầng 1) [192.168.1.10/24] · PC-B (tầng 3) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-A (tầng 1)·eth0 — Switch-1·p1 | PC-B (tầng 3)·eth0 — Switch-3·p1 | Switch-2·p3 — Switch-3·p2 | Switch-3·p3 — Switch-1·p3
  - **Chủ đề gợi ý (tầng 1):** lối đi mới khi đường chính không còn
  - **Gợi ý (tầng 2):** Chọn sợi dây nối Switch-1 với Switch-2 rồi gỡ nó ra, sau đó bấm Gửi thử và đọc nhật ký chặng xem khung của PC-A đi qua những cổng nào.
  - **Lời giải (tầng 3):** Gỡ sợi ring-12 giữa Switch-1 và Switch-2. Vòng biến mất nên cổng p3 của Switch-3 không còn phải nằm im; PC-A đi thẳng sang Switch-3 qua chính cổng đó, và nhật ký chặng cho thấy Switch-3 học được địa chỉ của PC-A ngay trên p3.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: sau khi đường chính đứt, ai là người ra lệnh cho cổng dự phòng mở ra?
  - **Dạng:** gõ tay · **Chấp nhận:** không ai | khong ai | tự nó | tu no | stp | chính switch | chinh switch | switch tự làm | switch tu lam
  - **Gợi ý (tầng 2):** Nhớ lại cảnh máy xúc: có ai kịp chạm vào thiết bị đâu.
  - **Lời giải (tầng 3):** Không ai cả — chính các switch tự tính lại cây nhờ dòng BPDU, rồi cổng đang chặn tự chuyển sang phát.
- **Tự giải thích:** Giải thích bằng lời của bạn: chuyện gì diễn ra bên trong mạng trong vài giây sau khi sợi cáp chính bị cắt?
  - **Nhóm ý cần chạm:** [bpdu, tin nhắn giữa switch, phát hiện, nhận ra] · [tính lại, dựng lại cây, bầu lại, cây đổi] · [cổng chặn, cổng dự phòng, cổng nằm im] · [mở ra, chuyển sang phát, gánh lưu lượng]
  - **Trả lời mẫu:** Các switch không còn nhận được BPDU trên sợi vừa đứt nên biết cây đã đổi và tính lại. Cổng vốn bị chặn thấy đường về gốc mất rồi liền chuyển sang phát, lưu lượng đi theo lối vòng còn lại — tất cả tự động, không ai chạm vào thiết bị.

**6 · Tổng kết:**
- Cây STP được tính lại mỗi khi sơ đồ đổi, nhờ dòng BPDU chạy đều đặn.
- Đường chính đứt thì cổng đang chặn tự mở ra và gánh lưu lượng.
- Sợi cáp dự phòng nằm im tới đúng cái ngày cần tới — đó là lý do người ta kéo nó.
- *Úp mở bài sau:* Còn một chỗ mà cái cẩn thận của STP lại thành phiền phức: cổng cắm máy nhân viên. Bài cuối module cho bạn cách bỏ qua quãng chờ ở đúng những cổng ấy.

### Bài: Cho cổng máy con vào việc ngay `m15-bai-5`

**1 · Khởi động (hook):** Nhân viên phàn nàn: cắm dây mạng vào máy xong phải đợi gần nửa phút mới có mạng, ngày nào cũng vậy. Dây tốt, switch tốt, không ai cấu hình sai gì cả. Nửa phút đó máy đang chờ điều gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: vì sao cổng vừa cắm dây lại phải chờ trước khi cho dữ liệu đi?
  - **Dạng:** trắc nghiệm · **Vì STP phải nghe ngóng xem cổng này có tạo ra vòng lặp không** ✓ / Vì switch cần thời gian cấp một địa chỉ IP mới cho máy vừa cắm / Vì card mạng của máy phải tự kiểm tra dây trước khi gửi khung
  - **Vì sao:** STP mặc định coi mọi cổng đều có thể nối tới switch khác, nên nó nghe ngóng vài chục giây trước khi cho phát. Với cổng cắm máy con, quãng chờ ấy là thừa.

**3 · Khám phá (teach):**
- *[portfast]* STP không biết cổng vừa cắm dây nối tới máy con hay tới một switch khác, nên nó nghe ngóng vài chục giây cho chắc. PortFast là lời khai của người quản trị: cổng này nối tới máy con, cho nó phát ngay đi. Nhờ vậy máy vừa cắm dây là có mạng. Điều kiện đi kèm rất nghiêm: chỉ bật PortFast trên cổng chắc chắn nối tới máy con — cắm một switch vào cổng ấy là bạn vừa mở đường cho vòng lặp hình thành trước khi STP kịp phản ứng.
  - **Đào sâu hơn:** App này không mô phỏng thời gian hội tụ nên bạn sẽ không thấy quãng chờ ấy trong phòng lab — nó là kiến thức của thiết bị thật, và đây là chỗ nội dung nói thẳng ra thay vì giả vờ. Trên thiết bị thật, PortFast thường đi kèm BPDU Guard: nếu cổng đã khai là cổng máy con mà lại nhận được BPDU, tức là có người cắm switch vào đó, thiết bị tắt luôn cổng để giữ an toàn cho cả mạng. Cặp PortFast cộng BPDU Guard là cấu hình chuẩn cho mọi cổng người dùng trong doanh nghiệp.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Tính năng cho phép một cổng bỏ qua quãng chờ của STP và phát ngay tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** portfast | port fast | port-fast
  - **Chủ đề gợi ý (tầng 1):** tên tính năng dành cho cổng cắm máy con
  - **Gợi ý (tầng 2):** Ghép hai từ tiếng Anh: cổng và nhanh.
  - **Lời giải (tầng 3):** PortFast. Chỉ bật nó trên cổng chắc chắn nối tới máy con — cắm switch vào cổng đã bật PortFast là mời vòng lặp vào nhà.
- **Đề:** Bật PortFast trên cổng nối sang một switch khác thì rủi ro là gì?
  - **Dạng:** trắc nghiệm · **Cổng phát ngay nên vòng lặp kịp hình thành trước khi STP nhận ra** ✓ / Cổng sẽ mất khả năng nhận BPDU nên switch kia không bao giờ thấy nó / Switch sẽ tự hạ priority của mình xuống và giành làm root bridge
  - **Chủ đề gợi ý (tầng 1):** cái mà quãng chờ của STP vốn dùng để ngăn
  - **Gợi ý (tầng 2):** Quãng chờ ấy sinh ra để làm gì? Bỏ nó đi ở đúng chỗ nối switch-switch thì thứ đó có cơ hội xảy ra.
  - **Lời giải (tầng 3):** Cổng phát ngay lập tức nên nếu đầu kia là switch, vòng lặp hình thành và bão nổ ra trước khi cây kịp tính lại. Cổng vẫn nhận BPDU bình thường, và PortFast không dính gì tới priority.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: PortFast chỉ được bật trên loại cổng nào?
  - **Dạng:** gõ tay · **Chấp nhận:** cổng nối máy con | cong noi may con | cổng cắm máy | cong cam may | cổng access | cong access | cổng nối tới máy tính | cong noi toi may tinh | cổng người dùng | cong nguoi dung
  - **Gợi ý (tầng 2):** Cổng nối XUỐNG thứ gì thì an toàn, còn nối NGANG thì nguy hiểm?
  - **Lời giải (tầng 3):** Cổng nối tới máy con của người dùng. Cổng nối sang switch khác thì tuyệt đối không — đó là mời vòng lặp vào nhà.
- **Tự giải thích:** Giải thích bằng lời của bạn: PortFast giải quyết chuyện gì, và vì sao nó nguy hiểm nếu đặt nhầm chỗ?
  - **Nhóm ý cần chạm:** [chờ, quãng chờ, chậm, ba mươi giây, vài chục giây] · [máy con, máy người dùng, cổng access, cắm máy] · [vòng lặp, bão, switch khác, nối switch]
  - **Trả lời mẫu:** PortFast bỏ quãng chờ nghe ngóng của STP để máy vừa cắm dây là có mạng ngay. Nhưng nếu bật nhầm trên cổng nối sang switch khác thì cổng phát ngay lập tức, vòng lặp kịp hình thành và bão nổ ra trước khi cây kịp tính lại.

**6 · Tổng kết:**
- STP bắt cổng mới cắm chờ vài chục giây vì không biết đầu kia là máy hay switch.
- PortFast là lời khai cổng này nối máy con — cho phát ngay, khỏi chờ.
- Bật nhầm trên cổng nối switch là mở đường cho vòng lặp và bão.
- *Úp mở bài sau:* Tầng 2 đã có người canh vòng lặp. Nhưng khi mạng lớn tới mức có hàng chục router, việc chỉ đường bằng tay sẽ sụp — module sau cho các router tự hỏi đường nhau.

### Khái niệm & flashcard (6)

- **Broadcast storm** `bao-quang-ba` — Bão quảng bá — khung quảng bá chạy vòng trong mạng có vòng kín tầng 2 và nhân lên tới khi mạng tắc
  - Ẩn dụ: Như tin đồn trong một dãy phòng nối vòng: mỗi phòng nghe xong lại kể cho mọi phòng khác, tin quay về phòng cũ rồi lại được kể tiếp — chỉ vài vòng là không ai làm việc nổi.
  - Thẻ ôn: *Bão quảng bá xảy ra khi nào, và vì sao nó không tự dừng?* → Khi mạng tầng 2 có vòng kín. Khung quảng bá đi hết vòng lại quay về switch cũ và được phát tiếp; khung tầng 2 không có TTL nên không có gì bảo nó dừng, số bản sao nhân lên tới khi mạng tắc.
- **BPDU** `bpdu` — Bridge Protocol Data Unit — khung mà các switch trao đổi để tự dựng và cập nhật cây STP
  - Ẩn dụ: Như tiếng điểm danh vài giây một lần trong tòa nhà: ai còn đó, ai cách trung tâm bao xa. Im tiếng ở một hướng là cả nhóm biết có chuyện.
  - Thẻ ôn: *BPDU là gì và dùng để làm gì?* → Là khung riêng của các switch, phát đều đặn vài giây một lần để khoe mình là ai và cách gốc cây bao xa. Nhờ nó cả nhóm tự dựng được cây STP và biết ngay khi có dây đứt để tính lại.
- **Root bridge** `root-bridge` — Switch gốc của cây STP; bầu theo priority nhỏ hơn thắng, hòa thì MAC nhỏ hơn thắng
  - Ẩn dụ: Như chọn nhà trưởng họ để mọi đường đi trong làng tính theo khoảng cách tới nhà đó — chọn nhầm nhà ở rìa làng thì ai cũng phải đi vòng.
  - Thẻ ôn: *Luật bầu root bridge là gì, và vì sao không nên để mặc định?* → Priority nhỏ hơn thắng; hòa thì MAC nhỏ hơn thắng. Để mặc định thì mọi switch cùng 32768 nên MAC quyết định, mà MAC nhỏ thường là thiết bị cũ nhất — cây lấy đúng cái yếu nhất làm trung tâm.
- **Blocked port** `cong-chan` — Cổng bị STP chặn — không phát khung dữ liệu nhưng vẫn nghe BPDU; là tính năng, không phải hỏng
  - Ẩn dụ: Như cửa thoát hiểm luôn khóa nhưng có người trực bên trong: ngày thường không ai qua, cháy một cái là nó mở ngay.
  - Thẻ ôn: *Cổng bị STP chặn khác cổng hỏng ở chỗ nào?* → Cổng chặn vẫn nghe BPDU và sẽ tự mở khi đường chính đứt; nó chỉ không phát khung dữ liệu để cắt vòng. Bảng show spanning-tree ghi vai Altn, trạng thái BLK.
- **Hội tụ lại** `hoi-tu-lai` — STP tính lại cây khi sơ đồ đổi, và cổng đang chặn tự chuyển sang phát
  - Ẩn dụ: Như dòng nước gặp đá chắn: bịt lối này thì nó tự tìm lối kia, không cần ai đào kênh mới.
  - Thẻ ôn: *Đường chính đứt thì ai ra lệnh cho cổng dự phòng mở ra?* → Không ai cả. Các switch mất BPDU trên sợi vừa đứt, tự tính lại cây, và cổng đang chặn chuyển sang phát. Thiết bị thật mất khoảng 30 tới 50 giây với STP đời đầu.
- **PortFast** `portfast` — Cho một cổng bỏ qua quãng chờ của STP và phát ngay; chỉ dùng cho cổng nối tới máy con
  - Ẩn dụ: Như lối đi riêng cho khách quen: không phải xếp hàng kiểm tra, nhưng chỉ mở cho đúng người mình chắc chắn.
  - Thẻ ôn: *PortFast dùng để làm gì, và cấm bật ở đâu?* → Cho cổng phát ngay khỏi chờ STP nghe ngóng, để máy vừa cắm dây là có mạng. Cấm bật trên cổng nối sang switch khác — cổng phát ngay thì vòng lặp kịp hình thành trước khi cây tính lại.

### Bài kiểm tra module (pool 12 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Vì sao vòng kín ở tầng 2 lại sinh ra bão quảng bá?
  - **Dạng:** trắc nghiệm · **Vì khung tầng 2 không có bộ đếm chặng nên đi vòng mãi không tự chết** ✓ / Vì switch phải giữ lại một bản sao của mỗi khung quảng bá để tra cứu / Vì hai sợi dây song song luôn nhân đôi băng thông của đường truyền
  - **Chủ đề gợi ý (tầng 1):** thứ mà gói tin IP có còn khung tầng 2 thì không
  - **Vì sao:** Khung tầng 2 không có TTL. Đi hết vòng nó quay về switch cũ, được phát tiếp, và số bản sao nhân lên tới khi mạng tắc.
- **Đề:** Giao thức đứng canh vòng lặp ở tầng 2 tên viết tắt là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** stp | spanning tree | spanning-tree | spanning tree protocol
  - **Chủ đề gợi ý (tầng 1):** tên giao thức dựng cây không vòng
  - **Vì sao:** STP — Spanning Tree Protocol. Nó chặn bớt cổng để cắt vòng chứ không đòi bạn rút dây dự phòng.
- **Đề:** Switch nào thắng cuộc bầu root bridge?
  - **Dạng:** trắc nghiệm · **Switch có priority nhỏ nhất; hòa thì switch có MAC nhỏ hơn** ✓ / Switch có priority lớn nhất; hòa thì switch có MAC lớn hơn / Switch có nhiều cổng đang cắm dây nhất trong cả nhóm
  - **Chủ đề gợi ý (tầng 1):** hướng so sánh của cuộc bầu
  - **Vì sao:** Nhỏ hơn là mạnh hơn — cả với priority lẫn với MAC. Số cổng đang dùng không được tính tới.
- **Đề:** Trong bảng show spanning-tree, cổng đang bị chặn mang trạng thái viết tắt là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** blk | BLK | blocking
  - **Chủ đề gợi ý (tầng 1):** cột trạng thái của bảng spanning-tree
  - **Vì sao:** BLK, viết tắt của blocking; cột vai của nó ghi Altn — cổng thay thế.
- **Đề:** Một cổng bị STP chặn có còn nghe BPDU không?
  - **Dạng:** trắc nghiệm · **Có, nhờ vậy nó biết lúc nào cây đổi để tự mở ra** ✓ / Không, cổng bị chặn ngừng hẳn mọi hoạt động thu và phát / Không, trừ khi quản trị viên bật riêng chế độ nghe cho nó
  - **Chủ đề gợi ý (tầng 1):** cách cổng dự phòng biết tới lượt mình
  - **Vì sao:** Cổng chặn chỉ ngừng phát khung dữ liệu; nó vẫn nghe BPDU, nếu không thì chẳng bao giờ biết đường chính đã đứt.
- **Đề:** Ba switch nối thành tam giác và đã bật STP thì có mấy cổng bị chặn?
  - **Dạng:** trắc nghiệm · **Một** ✓ / Hai / Ba
  - **Chủ đề gợi ý (tầng 1):** số dây thừa so với một cây không vòng
  - **Vì sao:** Ba switch chỉ cần hai sợi để liền mạch, tam giác có ba nên thừa một — STP chặn đúng một cổng.
- **Đề:** Tính năng cho cổng bỏ qua quãng chờ của STP và phát ngay tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** portfast | port fast | port-fast
  - **Chủ đề gợi ý (tầng 1):** tính năng dành cho cổng cắm máy con
  - **Vì sao:** PortFast — chỉ bật trên cổng nối tới máy con; cắm switch vào cổng đã bật PortFast là mời vòng lặp vào nhà.
- **Đề:** Xếp lại đúng trình tự những gì xảy ra khi sợi cáp chính giữa hai switch bị cắt.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Switch không còn nhận BPDU trên sợi vừa đứt
    2. Các switch tính lại cây STP
    3. Cổng đang bị chặn chuyển sang trạng thái phát
    4. Lưu lượng đi theo lối vòng còn lại
  - **Chủ đề gợi ý (tầng 1):** chuỗi phản ứng sau khi một sợi dây đứt
  - **Vì sao:** Mất tín hiệu BPDU là dấu hiệu đầu tiên; từ đó cả nhóm tính lại cây, cổng dự phòng mở ra, rồi lưu lượng mới đổi lối.
- **Đề:** Mạng ba switch nối vòng này đang bão, PC-A không gọi được PC-B. Hãy cứu nó mà KHÔNG được rút sợi dây nào — đường dự phòng phải còn nguyên.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** PC-A (tầng 1) [192.168.1.10/24] · PC-B (tầng 3) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-A (tầng 1)·eth0 — Switch-1·p1 | PC-B (tầng 3)·eth0 — Switch-3·p1 | Switch-1·p2 — Switch-2·p2 | Switch-2·p3 — Switch-3·p2 | Switch-3·p3 — Switch-1·p3
    - **Mục tiêu:**
      - pc-a PHẢI gọi được pc-b
    - **Được phép:** KHÔNG cho phép thao tác nào (đề bài hỏng)
    - **Lời giải mẫu:** PC-A (tầng 1) [192.168.1.10/24] · PC-B (tầng 3) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-A (tầng 1)·eth0 — Switch-1·p1 | PC-B (tầng 3)·eth0 — Switch-3·p1 | Switch-1·p2 — Switch-2·p2 | Switch-2·p3 — Switch-3·p2 | Switch-3·p3 — Switch-1·p3
  - **Chủ đề gợi ý (tầng 1):** thứ canh chừng vòng lặp trên sơ đồ
  - **Vì sao:** Bật Spanning Tree là đủ: switch tự chặn một cổng để cắt vòng, mạng sống lại mà sợi dây dự phòng vẫn nằm nguyên chờ ngày cần tới.
- **Đề:** Vào console của Switch-3 và tra bảng spanning-tree để xem cây đang lấy switch nào làm gốc và cổng nào đang nằm im.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (tầng 1) [192.168.1.10/24] · PC-B (tầng 3) [192.168.1.20/24] · Switch-1 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-2 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · Switch-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-A (tầng 1)·eth0 — Switch-1·p1 | PC-B (tầng 3)·eth0 — Switch-3·p1 | Switch-1·p2 — Switch-2·p2 | Switch-2·p3 — Switch-3·p2 | Switch-3·p3 — Switch-1·p3
    - **Console cắm ở:** Switch-3
    - **Mục tiêu:**
      - phải xem "show spanning-tree" trên Switch-3
    - **Lệnh mẫu trên Switch-3:** `show spanning-tree`
  - **Chủ đề gợi ý (tầng 1):** lệnh xem trạng thái cây STP
  - **Vì sao:** show spanning-tree. Bảng cho biết gốc cây là Switch-2 (priority 4096) và cổng p3 của Switch-3 đang mang vai Altn, trạng thái BLK.
- **Đề:** Bật PortFast trên cổng nối sang một switch khác thì chuyện gì có thể xảy ra?
  - **Dạng:** trắc nghiệm · **Cổng phát ngay nên vòng lặp kịp hình thành trước khi STP nhận ra** ✓ / Cổng ngừng nhận BPDU nên switch bên kia không bao giờ thấy nó / Switch tự hạ priority của mình xuống để giành làm root bridge
  - **Chủ đề gợi ý (tầng 1):** công dụng của quãng chờ mà PortFast bỏ đi
  - **Vì sao:** Quãng chờ sinh ra chính để phát hiện vòng lặp. Bỏ nó ở cổng nối switch là mở đường cho bão nổ ra trước khi cây kịp tính lại.
- **Đề:** Các switch trao đổi với nhau bằng loại khung nào để dựng và cập nhật cây STP? (viết tắt bốn chữ cái)
  - **Dạng:** gõ tay · **Chấp nhận:** bpdu | BPDU | bridge protocol data unit
  - **Chủ đề gợi ý (tầng 1):** tiếng điểm danh giữa các switch
  - **Vì sao:** BPDU — Bridge Protocol Data Unit, phát đều đặn vài giây một lần; im tiếng trên một hướng là cả nhóm biết có dây đứt.

## OSPF — Các router tự hỏi đường nhau `module-16`

Phần D · 5 chặng · 5 bài · 10 khái niệm

**Chặng:** Khai đường bằng tay tới lúc gãy (m16-bai-1) → Hai router làm quen (m16-bai-2) → Chép bản đồ cho giống nhau (m16-bai-3) → Đường nào rẻ thì đi (m16-bai-4) → Đứt đường, tự tìm lối vòng (m16-bai-5)

### Cung điện ký ức: Tòa nhà 4 tầng làm quen `m16-cung-dien-ospf` (8 phòng)

- `m16-r-down` — tầng 1 phòng 1 · Down · im lặng hoàn toàn · hình `ospf-silent-speaker` — Tầng trệt phòng Down: chiếc loa treo trên tường im bặt, chẳng một tiếng chào nào vọng tới — trong sổ của router, hàng xóm vẫn còn là chỗ trống.
- `m16-r-attempt` — tầng 1 phòng 2 · Attempt · gọi riêng từng nhà · hình `ospf-lone-phone` — Cạnh đó, phòng Attempt: một chiếc điện thoại quay số gọi đích danh sang nhà hàng xóm, vì ở xóm này hét chung ra giữa đường thì chẳng ai nghe thấy.
- `m16-r-init` — tầng 2 phòng 1 · Init · mới nghe tiếng chào một chiều · hình `ospf-name-card` — Tầng hai phòng Init: một tấm danh thiếp vừa luồn qua khe cửa, trên đó có tên hàng xóm mà tìm mỏi mắt vẫn thiếu tên mình.
- `m16-r-2way` — tầng 2 phòng 2 · 2-Way · hai bên đã thấy tên nhau · hình `ospf-handshake` — Kế bên là phòng 2-Way: hai bàn tay bắt chặt giữa sảnh, vì tấm thiếp lần này có cả tên mình nằm trong danh sách hàng xóm.
- `m16-r-exstart` — tầng 3 phòng 1 · ExStart · chốt ai nói trước · hình `ospf-gavel` — Tầng ba phòng ExStart: chiếc búa chủ tọa gõ một tiếng xuống bàn để chốt xem ai được mở lời trước trong cuộc trao đổi sắp tới.
- `m16-r-exchange` — tầng 3 phòng 2 · Exchange · trao mục lục cho nhau · hình `ospf-two-envelopes` — Sát vách là phòng Exchange: hai phong bì mục lục bay chéo qua nhau, mỗi bên khoe mình đang giữ những trang bản đồ mạng nào.
- `m16-r-loading` — tầng 4 phòng 1 · Loading · xin nốt phần còn thiếu · hình `ospf-funnel` — Tầng nóc phòng Loading: một cái phễu lớn rót nốt những trang bản đồ còn thiếu vào kho, xin đúng phần mình đang hụt.
- `m16-r-full` — tầng 4 phòng 2 · Full · hai bản đồ giống hệt nhau · hình `ospf-twin-maps` — Phòng cuối cùng, phòng Full: hai tấm bản đồ đặt chồng khít lên nhau, lệch nhau đúng không một nét — từ giây đó hai router nhìn mạng y hệt nhau.

### Bài: Đếm số dòng phải gõ bằng tay `m16-bai-1`

**1 · Khởi động (hook):** Công ty vừa mở chi nhánh thứ tư. Người quản trị mở sổ ra và thấy mình phải gõ thêm tuyến tĩnh trên cả ba router cũ, rồi gõ tiếp ba tuyến trên router mới — quên đúng một dòng là một chi nhánh câm tiếng. Tới chi nhánh thứ mười thì cuốn sổ ấy dài bao nhiêu, và hôm nào đứt cáp thì ai sửa?

**2 · Đoán thử (pretest):**
- **Đề:** PC-A ở Hà Nội gọi PC-B ở Đà Nẵng thì lặng thinh, dù dây nối giữa hai router vẫn tốt. Console đang cắm vào Router-DN. Hãy tra bảng định tuyến của nó và tự xem router này có biết đường về mạng 192.168.1.0 hay không. Sai cũng không sao — phần này không tính điểm.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (Hà Nội) [192.168.1.10/24, gw 192.168.1.1] · PC-B (Đà Nẵng) [192.168.2.10/24, gw 192.168.2.1] · Switch-HN [p1:VLAN 1, p2:VLAN 1] · Switch-DN [p1:VLAN 1, p2:VLAN 1] · Router-HN [g0:192.168.1.1/24, g1:10.0.12.1/24] · Router-DN [g0:192.168.2.1/24, g1:10.0.12.2/24] — dây: PC-A (Hà Nội)·eth0 — Switch-HN·p1 | Switch-HN·p2 — Router-HN·g0 | PC-B (Đà Nẵng)·eth0 — Switch-DN·p1 | Switch-DN·p2 — Router-DN·g0 | Router-HN·g1 — Router-DN·g1
    - **Console cắm ở:** Router-DN
    - **Mục tiêu:**
      - phải xem "show ip route" trên Router-DN
    - **Lệnh mẫu trên Router-DN:** `show ip route`
  - **Chủ đề gợi ý (tầng 1):** lệnh xem bảng định tuyến của router
  - **Vì sao:** Bảng của Router-DN chỉ có hai dòng chữ C — hai mạng nó nối trực tiếp. Đường về 192.168.1.0 thì trống trơn, vì người quản trị gõ tuyến tĩnh ở Hà Nội mà quên gõ chiều ngược lại. Gói tin đi được sang tới nơi nhưng lời đáp lạc đường về, và người dùng chỉ thấy mạng câm.

**3 · Khám phá (teach):**
- *[m16-gioi-han-tinh]* Tuyến tĩnh là bạn cầm tay chỉ đường cho router: mạng đó đi lối này. Cách ấy gọn khi có hai ba router, nhưng số dòng phải gõ phình theo số mạng nhân số router. Bốn chi nhánh, mỗi nơi một mạng LAN thì mỗi router phải biết ba mạng của người khác — thêm một chi nhánh là mở lại từng router cũ để gõ thêm. Tệ hơn nữa, tuyến tĩnh không biết cựa quậy: đường bạn chỉ mà đứt thì router vẫn cắm cúi đẩy gói tin vào chỗ đứt, tới khi có người tới sửa bằng tay.
  - **Đào sâu hơn:** Có một chỗ tuyến tĩnh vẫn là lựa chọn đúng tới tận hôm nay: tuyến mặc định ra Internet. Mạng nhà bạn chỉ có đúng một lối ra, chẳng có gì để chọn, nên khai một dòng là xong và không cần giao thức nào bàn bạc. Quy tắc nghề gọn lại thành: chỗ nào chỉ có một đường thì chỉ tay, chỗ nào có nhiều đường và đường có thể đứt thì để router tự lo.
- *[m16-dinh-tuyen-dong]* Định tuyến động lật ngược việc: thay vì bạn kể cho router nghe về mạng của người khác, bạn chỉ khai những mạng của CHÍNH NÓ, rồi các router tự kể cho nhau nghe. OSPF là giao thức làm việc đó trong mạng doanh nghiệp. Thêm một chi nhánh thì chỉ cấu hình router mới, các router cũ tự nghe tin và tự thêm dòng vào bảng. Đường đứt thì tin xấu cũng lan theo cách đó, và bảng tự sửa lại trong vài giây.
  - **Đào sâu hơn:** OSPF viết tắt của Open Shortest Path First: mở (ai cũng dùng được, không thuộc riêng hãng nào) và chọn đường ngắn nhất trước. Mỗi router giữ một tấm bản đồ toàn mạng rồi tự tính đường ngắn nhất trên tấm bản đồ ấy, chứ không nghe hàng xóm mách rằng đường này xa mấy chặng. Chính vì tự tính trên bản đồ mà OSPF không bị lừa bởi những vòng lặp mà các họ giao thức đời cũ hay vấp.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Đếm thử số dòng tuyến tĩnh phải gõ, từng bước. Bước 1: đếm số mạng LAN — bốn chi nhánh là bốn mạng. Bước 2: nhìn từ chỗ đứng của MỘT router: nó nối trực tiếp mạng của mình nên khỏi khai, còn lại ba mạng của người khác phải chỉ đường, tức là ba dòng. Bước 3: nhân lên cho cả nhóm — bốn router, mỗi cái ba dòng, tổng cộng mười hai dòng phải gõ đúng và không sót. Bước 4: thêm chi nhánh thứ năm và đếm lại — giờ mỗi router bốn dòng, tổng hai mươi dòng, tức là bạn phải mở lại cả bốn router cũ. Bước 5: rút ra công thức đơn giản để nhớ — mỗi router phải khai số mạng của người khác, và con số đó lớn dần theo mỗi lần mở chi nhánh.
- **Đề:** Năm router, mỗi router một mạng LAN riêng, nối nhau đủ đường. Nếu chỉ đường bằng tuyến tĩnh thì MỖI router phải khai bao nhiêu tuyến để biết đường tới mọi LAN còn lại?
  - **Dạng:** gõ tay · **Chấp nhận:** 4 | bốn | bon | 4 tuyến | 4 tuyen | bốn tuyến | bon tuyen | bốn dòng | bon dong
  - **Chủ đề gợi ý (tầng 1):** số mạng mà router phải nghe kể về
  - **Gợi ý (tầng 2):** Mạng của chính nó thì router đã nối trực tiếp, khỏi khai. Còn lại mấy mạng của người khác?
  - **Lời giải (tầng 3):** Bốn. Router nối trực tiếp mạng của mình nên chỉ còn bốn mạng của người khác phải chỉ đường — và cả nhóm năm router gộp lại là hai mươi dòng phải gõ đúng.
- **Đề:** Một sợi cáp trên đường tuyến tĩnh đang trỏ tới bị đứt, trong khi vẫn còn một lối vòng khác đi tới đích. Router làm gì?
  - **Dạng:** trắc nghiệm · **Vẫn đẩy gói tin vào lối cũ, vì tuyến tĩnh chỉ đổi khi có người sửa** ✓ / Tự dò tìm lối vòng còn lại rồi ghi đè dòng tuyến tĩnh đã hỏng / Xóa hẳn tuyến tĩnh đó khỏi bảng và báo lỗi về cho máy quản trị
  - **Chủ đề gợi ý (tầng 1):** ai là người sửa một dòng tuyến tĩnh
  - **Gợi ý (tầng 2):** Dòng tuyến tĩnh do ai gõ vào? Vậy nó đổi được nhờ ai?
  - **Lời giải (tầng 3):** Nó vẫn đẩy gói tin vào lối cũ. Tuyến tĩnh là lời của con người, và chỉ con người sửa được — router chẳng tự dò lối vòng, cũng chẳng tự xóa dòng bạn đã gõ.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: với định tuyến động, trên mỗi router bạn khai những mạng của ai?
  - **Dạng:** gõ tay · **Chấp nhận:** mạng của chính nó | mang cua chinh no | mạng của mình | mang cua minh | mạng nối trực tiếp | mang noi truc tiep | mạng của chính router đó | mang cua chinh router do
  - **Gợi ý (tầng 2):** Đó chính là chỗ khác nhau với tuyến tĩnh: tĩnh thì kể về mạng của người khác.
  - **Lời giải (tầng 3):** Mạng của chính nó — những mạng router đang nối trực tiếp. Phần còn lại các router tự kể cho nhau nghe, đó mới là cái làm nên chữ động.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao mạng càng lớn thì tuyến tĩnh càng đuối?
  - **Nhóm ý cần chạm:** [số dòng, so dong, nhiều tuyến, nhieu tuyen, phình, phinh, nhân lên, nhan len] · [từng router, tung router, gõ tay, go tay, sửa tay, sua tay, mở lại, mo lai] · [đứt, dut, hỏng đường, hong duong, sự cố, su co] · [tự sửa, tu sua, tự học, tu hoc, tự đổi, tu doi, chết đứng, chet dung]
  - **Trả lời mẫu:** Vì số dòng phải gõ phình lên theo số mạng nhân số router, nên thêm một chi nhánh là phải mở lại từng router cũ và chỉ cần sót một dòng là có chỗ mất liên lạc. Tệ hơn, đường đứt thì tuyến tĩnh nằm im chờ người tới sửa, trong khi định tuyến động tự đổi bảng trong vài giây.

**6 · Tổng kết:**
- Tuyến tĩnh là bạn chỉ tay từng đường: số dòng phình theo số mạng nhân số router.
- Tuyến tĩnh không tự cựa quậy — đường đứt thì nằm im chờ người sửa.
- Định tuyến động lật ngược việc: khai mạng của chính mình, để router tự kể cho nhau.
- *Úp mở bài sau:* Nhưng hai router chưa từng biết nhau thì kể chuyện cho ai nghe? Bài sau xem chúng làm quen — và có một tòa nhà bốn tầng để bạn nhớ trọn cuộc làm quen ấy.

### Bài: Bắt được tiếng chào của hàng xóm `m16-bai-2`

**1 · Khởi động (hook):** Hai router vừa được nối vào nhau bằng một sợi cáp. Không ai khai tên, không ai khai địa chỉ của bên kia. Vậy mà vài giây sau, mỗi cái đã có tên hàng xóm trong bảng và biết đường sang các mạng phía bên kia. Chúng làm quen bằng cách nào, và cái bắt tay ấy đi qua mấy bậc?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: hai router nối dây với nhau thì cần gì nữa mới thành láng giềng OSPF?
  - **Dạng:** trắc nghiệm · **Hai cổng phải cùng subnet và mỗi bên phải khai cổng đó vào OSPF** ✓ / Chỉ cần nối dây là đủ, OSPF tự bật khi thấy cổng có địa chỉ / Phải khai tay địa chỉ của router bên kia vào danh sách láng giềng
  - **Vì sao:** Nối dây mới là điều kiện đầu. Hai cổng còn phải cùng một subnet, và MỖI BÊN phải tự khai cổng của mình vào một câu network — đây là chỗ hay hỏng nhất khi cấu hình OSPF.

**3 · Khám phá (teach):**
- *[m16-hello]* Cứ mười giây một lần, router bật OSPF lại phát ra một gói hello trên mỗi cổng đã được khai vào OSPF. Gói ấy nói ba điều: tôi là ai, tôi ở subnet nào, và tôi đang nghe thấy những ai. Ai bắt được tiếng chào đó, thấy mình cùng subnet và cũng đang khai cổng của mình vào OSPF thì đáp lại — thế là hai bên vào cuộc làm quen. Dòng hello ấy còn làm thêm một việc: nó là nhịp tim. Im tiếng vài nhịp là bên kia biết hàng xóm đã mất, và bảng đường phải tính lại.
  - **Đào sâu hơn:** Ba điều kiện thật sự để một cặp láng giềng lên được, đúng thứ tự phòng lab kiểm: hai đầu dây đều là router đã bật tiến trình OSPF; hai cổng cùng một subnet; và mỗi đầu đều đã khai cổng của mình trong một câu network. Thiết bị thật còn soi thêm vài thứ nữa — hello timer hai bên phải bằng nhau, area phải khớp, xác thực nếu bật cũng phải khớp. App này đóng băng ở ba điều kiện trên và nói thẳng chỗ mình giản lược, thay vì vờ như đã mô phỏng hết.
- *[m16-lam-quen]* Cuộc làm quen của hai router đi qua tám bậc có tên, và cách chắc nhất để nhớ chúng là đi bộ qua một tòa nhà bốn tầng, mỗi tầng hai phòng. Hai tầng dưới là chuyện chào hỏi. Hãy đi xem tầng trệt và tầng hai trước: bốn phòng đầu kể lại quãng từ lúc còn im lặng tới lúc hai bên chính thức nhìn thấy nhau.
  - **Đi xem cung điện (4 phòng):**
    - tầng 1 phòng 1 · Down · im lặng hoàn toàn · hình `ospf-silent-speaker` — Tầng trệt phòng Down: chiếc loa treo trên tường im bặt, chẳng một tiếng chào nào vọng tới — trong sổ của router, hàng xóm vẫn còn là chỗ trống.
    - tầng 1 phòng 2 · Attempt · gọi riêng từng nhà · hình `ospf-lone-phone` — Cạnh đó, phòng Attempt: một chiếc điện thoại quay số gọi đích danh sang nhà hàng xóm, vì ở xóm này hét chung ra giữa đường thì chẳng ai nghe thấy.
    - tầng 2 phòng 1 · Init · mới nghe tiếng chào một chiều · hình `ospf-name-card` — Tầng hai phòng Init: một tấm danh thiếp vừa luồn qua khe cửa, trên đó có tên hàng xóm mà tìm mỏi mắt vẫn thiếu tên mình.
    - tầng 2 phòng 2 · 2-Way · hai bên đã thấy tên nhau · hình `ospf-handshake` — Kế bên là phòng 2-Way: hai bàn tay bắt chặt giữa sảnh, vì tấm thiếp lần này có cả tên mình nằm trong danh sách hàng xóm.
  - **Đào sâu hơn:** Vì sao 2-Way đã nhìn thấy nhau rồi mà cuộc làm quen vẫn chưa xong? Vì thấy nhau khác với tin nhau: tới đây hai router mới biết có hàng xóm, còn bản đồ mạng thì mỗi bên vẫn giữ một bản của riêng mình. Trên mạng nhiều router chung một đoạn cáp, có những cặp dừng lại vĩnh viễn ở 2-Way và thế là đủ — chúng chỉ đồng bộ đầy đủ với router được bầu làm đầu mối. Đó là kiến thức đọc-hiểu, không phải hành vi app này mô phỏng.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Router-HN đã bật OSPF và khai đủ hai mạng, nhưng PC-A vẫn không gọi được PC-B. Console đang cắm vào Router-HN. Hãy tra đúng bảng cho biết cuộc làm quen với hàng xóm đang dừng ở đâu và vì sao.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (Hà Nội) [192.168.1.10/24, gw 192.168.1.1] · PC-B (Đà Nẵng) [192.168.2.10/24, gw 192.168.2.1] · Switch-HN [p1:VLAN 1, p2:VLAN 1] · Switch-DN [p1:VLAN 1, p2:VLAN 1] · Router-HN [g0:192.168.1.1/24, g1:10.0.12.1/24] · Router-DN [g0:192.168.2.1/24, g1:10.0.12.2/24] — dây: PC-A (Hà Nội)·eth0 — Switch-HN·p1 | Switch-HN·p2 — Router-HN·g0 | PC-B (Đà Nẵng)·eth0 — Switch-DN·p1 | Switch-DN·p2 — Router-DN·g0 | Router-HN·g1 — Router-DN·g1
    - **Console cắm ở:** Router-HN
    - **Mục tiêu:**
      - phải xem "show ip ospf neighbor" trên Router-HN
    - **Lệnh mẫu trên Router-HN:** `show ip ospf neighbor`
  - **Chủ đề gợi ý (tầng 1):** bảng liệt kê hàng xóm OSPF
  - **Gợi ý (tầng 2):** Cú pháp khuyết: show ip ospf … — phần còn thiếu là từ tiếng Anh chỉ hàng xóm.
  - **Lời giải (tầng 3):** show ip ospf neighbor. Bảng in ra một dòng ở trạng thái DOWN kèm lý do no-ospf-process: đầu bên kia còn chưa bật tiến trình OSPF, nên tiếng chào của Router-HN bay sang mà chẳng ai đáp.
- **Đề:** Router-HN nhận được hello của hàng xóm nhưng trong tiếng chào đó thiếu hẳn tên mình. Cuộc làm quen đang ở bậc nào?
  - **Dạng:** trắc nghiệm · **Init — mới nghe được tiếng chào đi một chiều** ✓ / 2-Way — hai bên đều đã thấy tên của nhau / Full — hai bên đã chép xong bản đồ mạng
  - **Chủ đề gợi ý (tầng 1):** bậc mà tiếng chào mới đi được một chiều
  - **Gợi ý (tầng 2):** Nhớ lại tấm danh thiếp luồn qua khe cửa ở tầng hai: trên đó có tên hàng xóm mà thiếu tên mình.
  - **Lời giải (tầng 3):** Init. Nghe được tiếng chào nhưng tên mình còn vắng trong đó nghĩa là bên kia chưa nghe thấy mình — tiếng chào mới đi được một chiều. Có tên mình trong đó thì mới lên 2-Way.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đóng bài lại và đi bộ hai tầng dưới của tòa nhà từ trí nhớ: mỗi phòng là bậc nào của cuộc làm quen, và ở bậc đó đang xảy ra chuyện gì?
  - **Dạng:** đi lại cung điện từ trí nhớ (4 phòng)
    - tầng 1 phòng 1 · Down · im lặng hoàn toàn · hình `ospf-silent-speaker` — Tầng trệt phòng Down: chiếc loa treo trên tường im bặt, chẳng một tiếng chào nào vọng tới — trong sổ của router, hàng xóm vẫn còn là chỗ trống.
    - tầng 1 phòng 2 · Attempt · gọi riêng từng nhà · hình `ospf-lone-phone` — Cạnh đó, phòng Attempt: một chiếc điện thoại quay số gọi đích danh sang nhà hàng xóm, vì ở xóm này hét chung ra giữa đường thì chẳng ai nghe thấy.
    - tầng 2 phòng 1 · Init · mới nghe tiếng chào một chiều · hình `ospf-name-card` — Tầng hai phòng Init: một tấm danh thiếp vừa luồn qua khe cửa, trên đó có tên hàng xóm mà tìm mỏi mắt vẫn thiếu tên mình.
    - tầng 2 phòng 2 · 2-Way · hai bên đã thấy tên nhau · hình `ospf-handshake` — Kế bên là phòng 2-Way: hai bàn tay bắt chặt giữa sảnh, vì tấm thiếp lần này có cả tên mình nằm trong danh sách hàng xóm.
  - **Chủ đề gợi ý (tầng 1):** đi từ tầng trệt lên, trái sang phải
  - **Gợi ý (tầng 2):** Tầng trệt là lúc còn chưa nghe thấy gì; tầng hai là lúc tiếng chào đã bay qua bay lại.
  - **Lời giải (tầng 3):** Down (im lặng hoàn toàn) → Attempt (gọi riêng từng nhà, chỉ có ở mạng NBMA) → Init (mới nghe tiếng chào một chiều) → 2-Way (hai bên đã thấy tên nhau).
- **Tự giải thích:** Giải thích bằng lời của bạn: gói hello làm những việc gì cho OSPF?
  - **Nhóm ý cần chạm:** [tìm, tim, làm quen, lam quen, phát hiện, phat hien, hàng xóm, hang xom] · [cùng subnet, cung subnet, kiểm, kiem, khớp, khop, điều kiện, dieu kien] · [nhịp tim, nhip tim, đều đặn, deu dan, giữ, giu, còn sống, con song] · [mất, mat, im tiếng, im tieng, tính lại, tinh lai, đứt, dut]
  - **Trả lời mẫu:** Gói hello vừa để tìm hàng xóm vừa để kiểm xem hai bên có hợp nhau không: cùng subnet, cùng khai cổng đó vào OSPF thì mới đáp lời. Sau khi quen rồi, nó thành nhịp tim — im tiếng vài nhịp là bên kia biết hàng xóm đã mất và tính lại đường ngay.

**6 · Tổng kết:**
- Gói hello đi tìm hàng xóm và sau đó làm nhịp tim giữ mối quan hệ.
- Ba điều kiện lên láng giềng: đều bật OSPF, cùng subnet, mỗi bên tự khai cổng của mình.
- Hai tầng dưới của tòa nhà: Down, Attempt, Init, 2-Way — từ im lặng tới thấy tên nhau.
- *Úp mở bài sau:* Thấy tên nhau xong thì hai router bắt đầu chép bản đồ cho giống hệt nhau. Bài sau đi nốt hai tầng trên của tòa nhà, và bạn sẽ tự tay bật OSPF cho một router đang câm.

### Bài: Chép bản đồ tới lúc giống hệt `m16-bai-3`

**1 · Khởi động (hook):** Bảng láng giềng in ra đúng một chữ: FULL. Người mới đọc thường mừng vì thấy chữ đầy đủ, rồi bỏ qua luôn. Nhưng đầy đủ ở đây là đầy đủ CÁI GÌ, và giữa 2-Way với Full thì hai router đã kịp trao nhau những gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: hai router ở trạng thái Full nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Hai bên đã giữ cùng một tấm bản đồ mạng, giống nhau từng dòng** ✓ / Hai bên đã dùng hết băng thông của sợi cáp nối giữa chúng / Hai bên đã khai đủ mọi mạng LAN của công ty vào câu network
  - **Vì sao:** Full nói về BẢN ĐỒ, không nói về băng thông hay số câu lệnh: hai router đã đồng bộ xong cơ sở dữ liệu trạng thái đường đi và giờ nhìn mạng giống hệt nhau.

**3 · Khám phá (teach):**
- *[m16-dong-bo]* Sau khi thấy tên nhau, hai router chuyển sang việc nặng hơn: chép bản đồ mạng cho giống hệt nhau. Tấm bản đồ ấy là danh sách mọi đường nối mà cả vùng đang có, và chỉ khi hai bên giữ bản y hệt thì đường tính ra mới tin được. Hãy đi nốt tầng ba và tầng nóc của tòa nhà: bốn phòng còn lại kể lại quãng từ lúc chốt ai nói trước tới lúc hai bản đồ chồng khít lên nhau.
  - **Đi xem cung điện (4 phòng):**
    - tầng 3 phòng 1 · ExStart · chốt ai nói trước · hình `ospf-gavel` — Tầng ba phòng ExStart: chiếc búa chủ tọa gõ một tiếng xuống bàn để chốt xem ai được mở lời trước trong cuộc trao đổi sắp tới.
    - tầng 3 phòng 2 · Exchange · trao mục lục cho nhau · hình `ospf-two-envelopes` — Sát vách là phòng Exchange: hai phong bì mục lục bay chéo qua nhau, mỗi bên khoe mình đang giữ những trang bản đồ mạng nào.
    - tầng 4 phòng 1 · Loading · xin nốt phần còn thiếu · hình `ospf-funnel` — Tầng nóc phòng Loading: một cái phễu lớn rót nốt những trang bản đồ còn thiếu vào kho, xin đúng phần mình đang hụt.
    - tầng 4 phòng 2 · Full · hai bản đồ giống hệt nhau · hình `ospf-twin-maps` — Phòng cuối cùng, phòng Full: hai tấm bản đồ đặt chồng khít lên nhau, lệch nhau đúng không một nét — từ giây đó hai router nhìn mạng y hệt nhau.
  - **Đào sâu hơn:** Vì sao phải chốt ai nói trước ở bậc ExStart? Vì nếu hai bên cùng mở lời một lúc thì cuộc trao đổi loạn ngay từ câu đầu — router có số hiệu lớn hơn được cầm trịch, y như một cuộc họp phải có người điều khiển. Ở bậc Exchange, cái được trao là MỤC LỤC chứ chưa phải nội dung: mỗi bên gửi danh sách những trang mình đang giữ. Nhờ vậy tới bậc Loading, mỗi bên chỉ xin đúng phần mình đang hụt, thay vì chép lại cả tập từ đầu.
- *[m16-area-0]* Bật OSPF trên router gồm hai việc. Việc thứ nhất là mở tiến trình bằng lệnh router ospf kèm một số hiệu — số này chỉ có ý nghĩa trong nội bộ máy đó, hai router mang số khác nhau vẫn quen nhau bình thường. Việc thứ hai mới quan trọng: mỗi câu network khai một dải địa chỉ và mọi cổng có địa chỉ nằm trong dải ấy sẽ tham gia OSPF. Dải viết bằng wildcard mask bạn đã học ở Module 13, tức mặt nạ đảo: 0.0.0.255 nghĩa là ba nhóm số đầu phải khớp, nhóm cuối tùy ý. Cuối câu là area 0 — vùng xương sống mà mọi mạng OSPF đều phải có.
  - **Đào sâu hơn:** Mạng lớn chia thành nhiều area để mỗi vùng chỉ phải giữ bản đồ chi tiết của chính mình, và mọi area khác đều phải nối về area 0. Phạm vi của app này đóng băng ở area 0 nên bạn sẽ luôn gõ area 0 — gõ số khác là máy từ chối, cố ý như vậy để bạn quen tay với vùng xương sống trước. Một mẹo đọc câu network cho đúng: nó không nói mạng nào được quảng bá, mà nói CỔNG NÀO tham gia OSPF; cổng đã tham gia thì mạng của cổng đó tự được quảng bá theo.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Đây đúng là mạng của bài trước: Router-DN còn chưa bật OSPF nên hai chi nhánh chưa gọi được nhau. Console đang cắm sẵn vào Router-DN. Hãy bật tiến trình OSPF số 1 và khai cả hai mạng của nó vào area 0, sao cho PC-A gọi được PC-B.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (Hà Nội) [192.168.1.10/24, gw 192.168.1.1] · PC-B (Đà Nẵng) [192.168.2.10/24, gw 192.168.2.1] · Switch-HN [p1:VLAN 1, p2:VLAN 1] · Switch-DN [p1:VLAN 1, p2:VLAN 1] · Router-HN [g0:192.168.1.1/24, g1:10.0.12.1/24] · Router-DN [g0:192.168.2.1/24, g1:10.0.12.2/24] — dây: PC-A (Hà Nội)·eth0 — Switch-HN·p1 | Switch-HN·p2 — Router-HN·g0 | PC-B (Đà Nẵng)·eth0 — Switch-DN·p1 | Switch-DN·p2 — Router-DN·g0 | Router-HN·g1 — Router-DN·g1
    - **Console cắm ở:** Router-DN
    - **Mục tiêu:**
      - pc-a PHẢI gọi được pc-b
    - **Lệnh mẫu trên Router-DN:** `enable` rồi `configure terminal` rồi `router ospf 1` rồi `network 192.168.2.0 0.0.0.255 area 0` rồi `network 10.0.12.0 0.0.0.255 area 0` rồi `end`
  - **Chủ đề gợi ý (tầng 1):** hai việc phải làm để bật OSPF trên một router
  - **Gợi ý (tầng 2):** Cú pháp khuyết, gõ trong chế độ cấu hình: router ospf … rồi network <dải> <wildcard> area 0. Nhớ khai CẢ HAI mạng của Router-DN, kể cả đường nối sang Hà Nội.
  - **Lời giải (tầng 3):** Vào chế độ cấu hình rồi gõ: router ospf 1, network 192.168.2.0 0.0.0.255 area 0, network 10.0.12.0 0.0.0.255 area 0. Khai thiếu câu thứ hai thì cổng g1 không tham gia OSPF, láng giềng đứng im ở lý do network-not-declared và mạng vẫn câm.
- **Đề:** Trong câu network của OSPF, dải địa chỉ được viết bằng loại mặt nạ đảo tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** wildcard | wildcard mask | mặt nạ đảo | mat na dao | mặt nạ ngược | mat na nguoc
  - **Chủ đề gợi ý (tầng 1):** loại mặt nạ đã học ở Module 13
  - **Gợi ý (tầng 2):** Nó là subnet mask lộn ngược: chỗ nào phải khớp thì ghi 0, chỗ nào tùy ý thì ghi 255.
  - **Lời giải (tầng 3):** Wildcard mask, tức mặt nạ đảo. Với 0.0.0.255 thì ba nhóm số đầu phải khớp, nhóm cuối tùy ý — nên câu network 192.168.2.0 0.0.0.255 tóm đúng mọi cổng thuộc mạng 192.168.2.0/24.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đóng bài lại và đi nốt hai tầng trên của tòa nhà từ trí nhớ: mỗi phòng là bậc nào, và ở bậc đó hai router đang trao nhau cái gì?
  - **Dạng:** đi lại cung điện từ trí nhớ (4 phòng)
    - tầng 3 phòng 1 · ExStart · chốt ai nói trước · hình `ospf-gavel` — Tầng ba phòng ExStart: chiếc búa chủ tọa gõ một tiếng xuống bàn để chốt xem ai được mở lời trước trong cuộc trao đổi sắp tới.
    - tầng 3 phòng 2 · Exchange · trao mục lục cho nhau · hình `ospf-two-envelopes` — Sát vách là phòng Exchange: hai phong bì mục lục bay chéo qua nhau, mỗi bên khoe mình đang giữ những trang bản đồ mạng nào.
    - tầng 4 phòng 1 · Loading · xin nốt phần còn thiếu · hình `ospf-funnel` — Tầng nóc phòng Loading: một cái phễu lớn rót nốt những trang bản đồ còn thiếu vào kho, xin đúng phần mình đang hụt.
    - tầng 4 phòng 2 · Full · hai bản đồ giống hệt nhau · hình `ospf-twin-maps` — Phòng cuối cùng, phòng Full: hai tấm bản đồ đặt chồng khít lên nhau, lệch nhau đúng không một nét — từ giây đó hai router nhìn mạng y hệt nhau.
  - **Chủ đề gợi ý (tầng 1):** tầng ba là thỏa thuận, tầng nóc là đồng bộ
  - **Gợi ý (tầng 2):** Tầng ba mở đầu bằng tiếng búa chủ tọa; tầng nóc kết thúc bằng hai tấm bản đồ chồng khít.
  - **Lời giải (tầng 3):** ExStart (chốt ai nói trước) → Exchange (trao mục lục cho nhau) → Loading (xin nốt phần còn thiếu) → Full (hai bản đồ giống hệt nhau).
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao ở bậc Exchange hai router trao MỤC LỤC trước, thay vì gửi thẳng cả tập bản đồ?
  - **Nhóm ý cần chạm:** [mục lục, muc luc, danh sách, danh sach, danh mục, danh muc] · [thiếu, thieu, hụt, hut, phần cần, phan can, cái chưa có, cai chua co] · [đỡ, do ton, tiết kiệm, tiet kiem, nhanh hơn, nhanh hon, khỏi chép lại, khoi chep lai]
  - **Trả lời mẫu:** Vì trao mục lục trước thì mỗi bên tự đối chiếu và biết mình đang hụt những trang nào, rồi tới bậc Loading chỉ xin đúng phần đó. Gửi thẳng cả tập là chép lại cả những trang bên kia đã có, vừa tốn đường truyền vừa lâu hơn hẳn.

**6 · Tổng kết:**
- Full nghĩa là hai router đã giữ cùng một tấm bản đồ mạng, giống nhau từng dòng.
- Tầng ba và tầng nóc: ExStart, Exchange, Loading, Full — chốt vai, trao mục lục, xin phần thiếu, khớp nhau.
- Bật OSPF là hai việc: mở tiến trình router ospf, rồi khai từng dải bằng network với wildcard và area 0.
- *Úp mở bài sau:* Bản đồ đã giống nhau, nhưng từ đây sang chi nhánh kia có hai lối đi. Bài sau xem router chọn lối nào và nó đo đường bằng thước gì.

### Bài: Đọc bảng đường router tự học `m16-bai-4`

**1 · Khởi động (hook):** Từ chi nhánh Hà Nội sang chi nhánh Sài Gòn có hai lối: một sợi cáp nối thẳng, và một đường vòng qua chi nhánh Đà Nẵng. Chẳng ai bảo router phải đi lối nào, vậy mà nó chọn dứt khoát và cả nhóm đều chọn giống nhau. Nó đo hai lối đó bằng thước gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: OSPF chọn đường tới một mạng dựa vào cái gì?
  - **Dạng:** trắc nghiệm · **Tổng cost của các chặng trên đường, nhỏ hơn thì thắng** ✓ / Số thứ tự cổng trên router, cổng số nhỏ hơn được ưu tiên / Thứ tự các mạng được khai trong những câu network
  - **Vì sao:** OSPF cộng cost dọc đường và chọn tổng nhỏ nhất. Số hiệu cổng hay thứ tự câu network không dính gì tới việc chọn đường.

**3 · Khám phá (teach):**
- *[m16-cost]* OSPF đo đường bằng cost — một con số nói đi qua chặng này đắt bao nhiêu. Có bản đồ toàn vùng trong tay, mỗi router tự cộng cost dọc từng lối tới đích rồi giữ lối có tổng nhỏ nhất. Trong phòng lab này mỗi chặng router sang router tính cost 1, nên đường một chặng luôn thắng đường hai chặng. Vì mọi router đều tính trên cùng một tấm bản đồ nên chúng ra cùng kết quả, và không có cảnh hai router đá bóng gói tin qua lại cho nhau.
  - **Đào sâu hơn:** Thiết bị thật không tính cost bằng số chặng mà tính theo băng thông: cost bằng một trăm triệu chia cho tốc độ cổng tính theo bit mỗi giây, nên cổng nhanh có cost nhỏ và được chuộng hơn. Nhờ vậy OSPF biết chọn đường cáp quang hai chặng thay vì đường thuê bao chậm một chặng. App này đóng băng ở cost 1 mỗi chặng — đơn giản hóa cố ý, khai thẳng ở đầu engine — nên bạn đọc được cách chọn đường mà không phải nhớ công thức.
- *[m16-bang-tu-hoc]* Kết quả của tất cả những việc trên nằm gọn trong bảng định tuyến, và lệnh show ip route mở nó ra. Đầu mỗi dòng là một chữ cái cho biết dòng đó ở đâu ra: chữ C là mạng router nối trực tiếp, chữ S là tuyến bạn gõ tay, chữ O là tuyến OSPF tự học được. Cuối dòng OSPF có cặp số trong ngoặc vuông, dạng 110 gạch chéo cost: số 110 là mức tin cậy của OSPF, còn số sau là tổng cost tới đích. Nhìn cặp số ấy là biết đường này học từ đâu và xa bao nhiêu.
  - **Đào sâu hơn:** Đọc bảng định tuyến là kỹ năng chẩn đoán mạnh nhất khi làm việc với router, vì nó trả lời thẳng câu hỏi quan trọng nhất: gói tin đi tới đích này sẽ ra bằng cổng nào. Ba câu hỏi nên hỏi theo thứ tự khi mạng có sự cố. Đích cần tới có mặt trong bảng chưa? Nếu có thì đi ra cổng nào và qua chặng kế nào? Và dòng đó mang chữ gì — chữ O biến mất trong khi trước đó vẫn có nghĩa là láng giềng vừa rớt, chứ chẳng phải bạn gõ sai lệnh nào.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Ba chi nhánh nối thành vòng, cả ba router đều đã chạy OSPF. Console đang cắm vào Router-HN. Hãy mở bảng định tuyến của nó và tự đọc xem mạng 192.168.3.0 của chi nhánh Sài Gòn được học với cost bao nhiêu, đi ra cổng nào.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (Hà Nội) [192.168.1.10/24, gw 192.168.1.1] · PC-C (Sài Gòn) [192.168.3.10/24, gw 192.168.3.1] · Switch-HN [p1:VLAN 1, p2:VLAN 1] · Switch-SG [p1:VLAN 1, p2:VLAN 1] · Router-HN [g0:192.168.1.1/24, g1:10.0.12.1/24, g2:10.0.13.1/24] · Router-DN [g1:10.0.12.2/24, g2:10.0.23.2/24] · Router-SG [g0:192.168.3.1/24, g1:10.0.23.3/24, g2:10.0.13.3/24] — dây: PC-A (Hà Nội)·eth0 — Switch-HN·p1 | Switch-HN·p2 — Router-HN·g0 | PC-C (Sài Gòn)·eth0 — Switch-SG·p1 | Switch-SG·p2 — Router-SG·g0 | Router-HN·g1 — Router-DN·g1 | Router-DN·g2 — Router-SG·g1 | Router-HN·g2 — Router-SG·g2
    - **Console cắm ở:** Router-HN
    - **Mục tiêu:**
      - phải xem "show ip route" trên Router-HN
    - **Lệnh mẫu trên Router-HN:** `show ip route`
  - **Chủ đề gợi ý (tầng 1):** lệnh mở bảng định tuyến
  - **Gợi ý (tầng 2):** Ba từ, bắt đầu bằng show, rồi tới ip, rồi tới từ tiếng Anh nghĩa là tuyến đường.
  - **Lời giải (tầng 3):** show ip route. Dòng cần tìm là O 192.168.3.0/24 [110/1] via 10.0.13.3, g2 — chữ O nghĩa là học từ OSPF, số 110 là mức tin cậy của OSPF, cost 1 vì đi thẳng một chặng qua cổng g2, chứ không vòng qua Đà Nẵng cho tốn hai chặng.
- **Đề:** Trong bảng show ip route, tuyến mà router tự học được từ OSPF mang chữ cái đầu dòng nào?
  - **Dạng:** gõ tay · **Chấp nhận:** o | O | chữ o | chu o | mã o | ma o
  - **Chủ đề gợi ý (tầng 1):** chữ cái đầu dòng của tuyến OSPF
  - **Gợi ý (tầng 2):** Chữ C là mạng nối trực tiếp, chữ S là tuyến gõ tay, còn OSPF lấy chính chữ cái đầu tên nó.
  - **Lời giải (tầng 3):** Chữ O. Trong cùng bảng đó, chữ C là mạng nối trực tiếp và chữ S là tuyến tĩnh bạn gõ tay.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: trong phòng lab này, một chặng từ router sang router có cost bằng bao nhiêu?
  - **Dạng:** gõ tay · **Chấp nhận:** 1 | một | mot | cost 1 | bằng 1 | bang 1
  - **Gợi ý (tầng 2):** Đường một chặng thắng đường hai chặng, vì mỗi chặng đều đáng giá đúng chừng đó.
  - **Lời giải (tầng 3):** Bằng 1. Nhờ vậy tổng cost chính là số chặng, và đường ít chặng hơn thì thắng. Thiết bị thật thì tính cost theo băng thông của cổng.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao ba router lại chọn đường giống nhau mà chẳng cần bàn bạc thêm?
  - **Nhóm ý cần chạm:** [cùng bản đồ, cung ban do, bản đồ giống nhau, ban do giong nhau, đồng bộ, dong bo] · [tự tính, tu tinh, cộng cost, cong cost, tính cost, tinh cost] · [nhỏ nhất, nho nhat, rẻ nhất, re nhat, ngắn nhất, ngan nhat]
  - **Trả lời mẫu:** Vì sau khi đồng bộ, cả ba giữ cùng một tấm bản đồ mạng. Mỗi cái tự cộng cost dọc từng lối rồi giữ lối tổng nhỏ nhất, mà cùng dữ liệu với cùng cách tính thì ra cùng kết quả — nên không có chuyện hai router đá gói tin qua lại cho nhau.

**6 · Tổng kết:**
- OSPF cộng cost dọc đường và giữ lối có tổng nhỏ nhất; trong app mỗi chặng cost 1.
- Lệnh show ip route mở bảng: chữ C là nối trực tiếp, S là gõ tay, O là OSPF tự học.
- Cặp số trong ngoặc là mức tin cậy trên cost — 110 là con số của OSPF.
- *Úp mở bài sau:* Bây giờ tới phần đáng giá nhất của cả module: cắt phăng sợi cáp mà lưu lượng đang đi qua, rồi xem bảng tự viết lại chính nó trước mắt bạn.

### Bài: Cắt cáp và xem bảng tự viết lại `m16-bai-5`

**1 · Khởi động (hook):** Nhà thầu đào đường cắt trúng sợi cáp nối thẳng Hà Nội với Sài Gòn. Nếu đường ấy được chỉ bằng tuyến tĩnh thì cả hai chi nhánh ngồi chờ người tới sửa. Nhưng mạng này chạy OSPF, và nhân viên còn chẳng kịp nhận ra có sự cố. Trong mấy giây đó, ba router đã làm gì với nhau?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: dấu hiệu đầu tiên cho ba router biết sợi cáp đã đứt là gì?
  - **Dạng:** trắc nghiệm · **Gói hello im tiếng vài nhịp trên cổng hướng ra sợi cáp đó** ✓ / Máy quản trị gửi một bản tin báo lỗi tới cả ba router cùng lúc / Gói tin của người dùng dội ngược trở lại router vừa gửi nó đi
  - **Vì sao:** Hello chính là nhịp tim đã học ở bài 2. Nó im vài nhịp thì láng giềng bị coi là mất, và từ đó cả vùng tính lại bản đồ.

**3 · Khám phá (teach):**
- *[m16-hoi-tu-vong]* Khi một sợi cáp đứt, hai router hai đầu mất nhịp hello và coi như láng giềng đã mất. Chúng sửa tấm bản đồ của mình rồi loan tin sửa đó ra cả vùng, nên mọi router cùng bỏ đường vừa hỏng khỏi bản đồ. Ai nấy tính lại cost trên tấm bản đồ mới, và nếu còn lối vòng nào tới đích thì lối đó lập tức thành đường chính. Bảng định tuyến tự viết lại: dòng cũ biến mất, dòng mới hiện ra với cost lớn hơn và chặng kế khác hẳn — tất cả xong trong lúc người dùng còn chưa kịp phàn nàn.
  - **Đào sâu hơn:** Quá trình vừa kể có tên riêng: hội tụ. Nó đúng là thứ Module 15 đã cho bạn xem ở tầng 2 với cây STP, chỉ khác chỗ đứng: STP tính lại cây để cắt vòng lặp, còn OSPF tính lại đường ngắn nhất để đi vòng qua chỗ hỏng. Điểm chung của cả hai là mạng phải có sẵn ĐƯỜNG THỪA thì mới có gì mà chuyển sang. Giao thức chỉ biết chọn trong những lối bạn đã kéo cáp; không có lối vòng nào thì OSPF cũng chỉ báo mất đường mà thôi.
- *[m16-ad]* Nếu cùng một mạng đích lại có cả tuyến tĩnh bạn gõ tay lẫn tuyến OSPF tự học, router tin cái nào? Nó so mức tin cậy, tiếng nghề gọi là khoảng cách quản trị: tuyến tĩnh mang số 1, tuyến OSPF mang số 110, và số nhỏ hơn thì được tin hơn. Vậy tuyến tĩnh thắng — cũng dễ hiểu, vì đó là lời khẳng định của con người. Nhưng nhớ luôn cái giá: dòng bạn gõ vẫn nằm im khi đường của nó đứt, và nó sẽ che mất đường vòng mà OSPF đã tìm ra.
  - **Đào sâu hơn:** Khoảng cách quản trị chỉ được đem ra so khi hai tuyến cùng độ dài prefix. Nếu prefix khác nhau thì luật khớp dài nhất thắng trước: dòng 192.168.3.0/24 luôn được dùng thay cho dòng 192.168.0.0/16, bất kể dòng nào học từ đâu. Thứ tự xét trong router vì thế là prefix dài hơn trước, hòa mới xét tới mức tin cậy, hòa nữa mới tới cost. Đây cũng là lý do một tuyến tĩnh gõ ẩu với prefix quá rộng ít khi gây họa, còn tuyến tĩnh gõ đúng dải của một mạng đang chạy OSPF thì có thể ghim lưu lượng vào một đường đã chết.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Đây là mạng ba chi nhánh của bài trước, lưu lượng từ PC-A sang PC-C đang đi thẳng qua sợi cáp Hà Nội — Sài Gòn. Hãy đóng vai nhà thầu đào đường: cắt đúng sợi cáp đó ra, rồi chứng minh PC-A vẫn gọi được PC-C và lần này đường đi có ghé qua Router-DN.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** PC-A (Hà Nội) [192.168.1.10/24, gw 192.168.1.1] · PC-C (Sài Gòn) [192.168.3.10/24, gw 192.168.3.1] · Switch-HN [p1:VLAN 1, p2:VLAN 1] · Switch-SG [p1:VLAN 1, p2:VLAN 1] · Router-HN [g0:192.168.1.1/24, g1:10.0.12.1/24, g2:10.0.13.1/24] · Router-DN [g1:10.0.12.2/24, g2:10.0.23.2/24] · Router-SG [g0:192.168.3.1/24, g1:10.0.23.3/24, g2:10.0.13.3/24] — dây: PC-A (Hà Nội)·eth0 — Switch-HN·p1 | Switch-HN·p2 — Router-HN·g0 | PC-C (Sài Gòn)·eth0 — Switch-SG·p1 | Switch-SG·p2 — Router-SG·g0 | Router-HN·g1 — Router-DN·g1 | Router-DN·g2 — Router-SG·g1 | Router-HN·g2 — Router-SG·g2
    - **Mục tiêu:**
      - đường pc-a → pc-c phải qua r-2
    - **Được phép:** gỡ dây
    - **Lời giải mẫu:** PC-A (Hà Nội) [192.168.1.10/24, gw 192.168.1.1] · PC-C (Sài Gòn) [192.168.3.10/24, gw 192.168.3.1] · Switch-HN [p1:VLAN 1, p2:VLAN 1] · Switch-SG [p1:VLAN 1, p2:VLAN 1] · Router-HN [g0:192.168.1.1/24, g1:10.0.12.1/24, g2:10.0.13.1/24] · Router-DN [g1:10.0.12.2/24, g2:10.0.23.2/24] · Router-SG [g0:192.168.3.1/24, g1:10.0.23.3/24, g2:10.0.13.3/24] — dây: PC-A (Hà Nội)·eth0 — Switch-HN·p1 | Switch-HN·p2 — Router-HN·g0 | PC-C (Sài Gòn)·eth0 — Switch-SG·p1 | Switch-SG·p2 — Router-SG·g0 | Router-HN·g1 — Router-DN·g1 | Router-DN·g2 — Router-SG·g1
  - **Chủ đề gợi ý (tầng 1):** lối còn lại khi đường thẳng mất
  - **Gợi ý (tầng 2):** Chọn sợi cáp nối Router-HN với Router-SG rồi gỡ nó ra, sau đó bấm Gửi thử và đọc nhật ký chặng xem gói tin ghé qua những router nào.
  - **Lời giải (tầng 3):** Gỡ sợi wan-13 giữa Router-HN và Router-SG. Cả vùng bỏ đường đó khỏi bản đồ và tính lại: mạng 192.168.3.0 giờ học được với cost 2 qua chặng kế 10.0.12.2, nên gói tin của PC-A đi vòng qua Router-DN rồi mới tới Sài Gòn — chẳng ai phải gõ thêm một dòng lệnh nào.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: cùng một mạng đích mà có cả tuyến tĩnh lẫn tuyến OSPF thì router tin cái nào?
  - **Dạng:** gõ tay · **Chấp nhận:** tuyến tĩnh | tuyen tinh | tĩnh | tinh | static | tuyến static | tuyen static | tuyến tĩnh vì ad nhỏ hơn | tuyen tinh vi ad nho hon
  - **Gợi ý (tầng 2):** So mức tin cậy: một bên mang số 1, một bên mang số 110 — số nhỏ hơn thì được tin hơn.
  - **Lời giải (tầng 3):** Tuyến tĩnh, vì khoảng cách quản trị của nó là 1 còn của OSPF là 110. Cái giá phải trả: dòng gõ tay ấy vẫn nằm im khi đường của nó đứt, và nó che mất lối vòng mà OSPF đã tìm ra.
- **Tự giải thích:** Giải thích bằng lời của bạn: từ lúc sợi cáp đứt tới lúc lưu lượng chạy lối khác, các router đã làm những gì?
  - **Nhóm ý cần chạm:** [hello, nhịp tim, nhip tim, im tiếng, im tieng, mất láng giềng, mat lang gieng] · [sửa bản đồ, sua ban do, loan tin, báo cho nhau, bao cho nhau, cập nhật, cap nhat] · [tính lại, tinh lai, cost, đường ngắn nhất, duong ngan nhat] · [lối vòng, loi vong, đường vòng, duong vong, đường khác, duong khac, bảng đổi, bang doi]
  - **Trả lời mẫu:** Hai router hai đầu mất nhịp hello nên coi láng giềng đã mất, sửa bản đồ của mình rồi loan tin ra cả vùng. Mọi router bỏ đường hỏng khỏi bản đồ, tính lại cost, và lối vòng còn lại thành đường chính — bảng định tuyến tự viết lại mà chẳng ai gõ thêm dòng nào.

**6 · Tổng kết:**
- Mất nhịp hello là dấu hiệu đầu tiên; cả vùng sửa bản đồ rồi tính lại đường.
- Còn lối vòng thì lối đó thành đường chính ngay, không cần ai gõ lệnh.
- Tuyến tĩnh có mức tin cậy 1 nên thắng OSPF 110 — kèm cái giá là nó không tự sửa.
- *Úp mở bài sau:* Giờ mọi máy trong công ty đều gọi được nhau, kể cả những máy lẽ ra không nên gọi tới phòng kế toán. Module sau dạy cách viết luật chặn đúng người mà không chặn nhầm sếp.

### Khái niệm & flashcard (10)

- **Giới hạn của tuyến tĩnh** `m16-gioi-han-tinh` — Chỉ đường bằng tay: số dòng phình theo số mạng nhân số router, và đường đứt thì tuyến nằm im chờ người sửa
  - Ẩn dụ: Như dán giấy chỉ đường ở từng ngã tư trong thành phố: mở thêm một khu phố là phải đi dán lại khắp nơi, và hôm nào có đường cấm thì tờ giấy vẫn chỉ vào đó.
  - Thẻ ôn: *Hai điểm yếu của tuyến tĩnh khi mạng lớn lên là gì?* → Một là số dòng phải gõ phình theo số mạng nhân số router, thêm một chi nhánh là mở lại từng router cũ. Hai là nó không tự cựa quậy: đường bị đứt thì router vẫn đẩy gói tin vào chỗ hỏng cho tới khi có người sửa bằng tay.
- **Định tuyến động** `m16-dinh-tuyen-dong` — Mỗi router chỉ khai mạng của chính nó rồi các router tự kể đường cho nhau; OSPF là giao thức làm việc đó
  - Ẩn dụ: Như mỗi nhà chỉ cần treo biển số nhà mình, còn bản đồ khu phố thì hàng xóm tự truyền tai nhau và tự cập nhật khi có đường mới.
  - Thẻ ôn: *Với định tuyến động, trên mỗi router bạn khai những mạng nào?* → Chỉ khai những mạng router đó nối trực tiếp. Phần còn lại các router tự kể cho nhau nghe, nên thêm chi nhánh chỉ phải cấu hình router mới và bảng của các router cũ tự mọc thêm dòng.
- **Gói hello** `m16-hello` — Gói OSPF phát đều đặn trên mỗi cổng đã khai: vừa để tìm láng giềng, vừa làm nhịp tim giữ mối quan hệ
  - Ẩn dụ: Như tiếng chào buổi sáng vọng qua hàng rào: lần đầu là để làm quen, những lần sau là để biết hàng xóm vẫn còn ở nhà.
  - Thẻ ôn: *Gói hello làm những việc gì, và ba điều kiện để hai router thành láng giềng?* → Hello vừa đi tìm láng giềng vừa làm nhịp tim: im vài nhịp là bên kia coi như mất hàng xóm. Ba điều kiện: hai đầu đều bật OSPF, hai cổng cùng subnet, và mỗi bên đều đã khai cổng của mình trong một câu network.
- **Bốn bậc làm quen** `m16-lam-quen` — Down, Attempt, Init, 2-Way — quãng từ lúc im lặng tới lúc hai router thấy tên nhau
  - Ẩn dụ: Như hai tầng dưới của một tòa nhà: tầng trệt còn im tiếng và gọi riêng, tầng hai thì tấm danh thiếp đã đi qua đi lại.
  - Thẻ ôn: *Bốn bậc đầu của quan hệ láng giềng OSPF là gì?* → Down (im lặng hoàn toàn), Attempt (gọi riêng từng nhà, chỉ có ở mạng NBMA), Init (mới nghe tiếng chào một chiều, còn thiếu tên mình trong đó), 2-Way (hai bên đã thấy tên nhau).
- **Bốn bậc đồng bộ** `m16-dong-bo` — ExStart, Exchange, Loading, Full — quãng chép bản đồ mạng cho tới lúc hai bên giống hệt nhau
  - Ẩn dụ: Như hai tầng trên của tòa nhà: tầng ba chốt vai và trao mục lục, tầng nóc là hai tấm bản đồ chồng khít lên nhau.
  - Thẻ ôn: *Bốn bậc sau của quan hệ láng giềng OSPF là gì, và Full nghĩa là gì?* → ExStart (chốt ai nói trước), Exchange (trao mục lục những trang bản đồ mình giữ), Loading (xin nốt phần còn thiếu), Full (hai bên giữ cùng một bản đồ mạng, giống nhau từng dòng).
- **Câu network và area 0** `m16-area-0` — Mỗi câu network dùng wildcard mask để chọn những cổng tham gia OSPF; area 0 là vùng xương sống
  - Ẩn dụ: Như khai với ban quản lý xem những cửa nào của nhà mình mở ra sân chung — cửa đã khai thì mới được vào cuộc họp của cả khu.
  - Thẻ ôn: *Câu network của OSPF thật ra chọn cái gì, và viết bằng loại mặt nạ nào?* → Nó chọn những CỔNG có địa chỉ nằm trong dải khai, và cổng đã tham gia thì mạng của cổng đó tự được quảng bá. Dải viết bằng wildcard mask (mặt nạ đảo), cuối câu là area 0 — vùng xương sống.
- **OSPF cost** `m16-cost` — Giá của một chặng; router cộng cost dọc đường và giữ lối có tổng nhỏ nhất
  - Ẩn dụ: Như chọn đường theo tiền vé chứ không theo cảm tính: cộng vé từng chặng rồi đi lối rẻ nhất.
  - Thẻ ôn: *OSPF chọn đường theo gì, và trong app này một chặng đáng giá bao nhiêu?* → Theo tổng cost dọc đường, nhỏ nhất thì thắng. Trong app mỗi chặng router sang router có cost 1 nên tổng cost chính là số chặng; thiết bị thật tính cost theo băng thông của cổng nên cổng nhanh có cost nhỏ hơn.
- **Bảng định tuyến tự học** `m16-bang-tu-hoc` — Kết quả cuối cùng của OSPF, đọc bằng show ip route: chữ C nối trực tiếp, S gõ tay, O học từ OSPF
  - Ẩn dụ: Như tấm bảng chỉ đường ở cổng làng, có ghi rõ mỗi lối này ai dựng: người trong làng, ông trưởng thôn, hay chính đám xe ôm truyền tai nhau.
  - Thẻ ôn: *Trong show ip route, ba chữ cái đầu dòng C, S, O nghĩa là gì?* → C là mạng router nối trực tiếp, S là tuyến tĩnh gõ tay, O là tuyến học được từ OSPF. Dòng OSPF còn kèm cặp số 110 gạch chéo cost: 110 là mức tin cậy của OSPF, số sau là tổng cost tới đích.
- **Hội tụ lại của OSPF** `m16-hoi-tu-vong` — Đường đứt thì cả vùng sửa bản đồ, tính lại cost và chuyển sang lối vòng còn lại
  - Ẩn dụ: Như dòng nước gặp đá chắn: bịt lối này thì nó tự tìm lối kia — miễn là trước đó có ai đã đào sẵn một con mương thứ hai.
  - Thẻ ôn: *Sợi cáp đứt thì OSPF làm gì, và điều kiện để nó cứu được mạng là gì?* → Hai đầu mất nhịp hello, sửa bản đồ rồi loan tin ra cả vùng; mọi router tính lại cost và lối vòng còn lại thành đường chính. Điều kiện: mạng phải có sẵn đường thừa — giao thức chỉ chọn được trong những lối đã kéo cáp.
- **Khoảng cách quản trị** `m16-ad` — Mức tin cậy của một nguồn tuyến; tuyến tĩnh là 1, OSPF là 110, số nhỏ hơn thì được tin hơn
  - Ẩn dụ: Như nghe hai người chỉ đường: lời của người mình tin hơn thì được nghe trước, dù người kia vừa đi qua đó về.
  - Thẻ ôn: *Cùng một đích mà có cả tuyến tĩnh lẫn tuyến OSPF thì router chọn cái nào, và cái giá là gì?* → Chọn tuyến tĩnh, vì khoảng cách quản trị 1 nhỏ hơn 110 của OSPF. Cái giá: dòng gõ tay nằm im khi đường của nó đứt và che mất lối vòng OSPF đã tìm ra. Luật này chỉ xét khi hai tuyến cùng độ dài prefix.

### Bài kiểm tra module (pool 15 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Vì sao tuyến tĩnh đuối dần khi công ty mở thêm chi nhánh?
  - **Dạng:** trắc nghiệm · **Vì số dòng phải gõ phình theo số mạng nhân số router, sót một dòng là mất liên lạc** ✓ / Vì mỗi tuyến tĩnh chiếm một phần băng thông cố định trên đường truyền giữa hai site / Vì router chỉ chứa được một số tuyến tĩnh nhất định rồi sẽ từ chối nhận thêm dòng
  - **Chủ đề gợi ý (tầng 1):** thứ phình lên mỗi lần thêm một mạng
  - **Vì sao:** Tuyến tĩnh không tốn băng thông và cũng chẳng chạm giới hạn số dòng ở cỡ mạng này. Cái gãy là công sức con người: mỗi chi nhánh mới là một vòng mở lại từng router cũ.
- **Đề:** Với định tuyến động, trên mỗi router bạn khai những mạng của ai?
  - **Dạng:** gõ tay · **Chấp nhận:** mạng của chính nó | mang cua chinh no | mạng của mình | mang cua minh | mạng nối trực tiếp | mang noi truc tiep | mạng của chính router đó | mang cua chinh router do
  - **Chủ đề gợi ý (tầng 1):** chỗ khác nhau căn bản với tuyến tĩnh
  - **Vì sao:** Chỉ khai mạng của chính router đó. Phần còn lại các router tự kể cho nhau nghe — đó mới là cái làm nên chữ động.
- **Đề:** Hai router đã nối dây và cùng bật OSPF, nhưng bảng láng giềng vẫn trống. Nguyên nhân nào khớp nhất?
  - **Dạng:** trắc nghiệm · **Một bên còn thiếu câu network phủ cổng đó, hoặc hai cổng khác subnet** ✓ / Hai router mang số hiệu tiến trình OSPF khác nhau nên chúng bỏ qua nhau / Chưa ai khai tay địa chỉ của router bên kia vào danh sách láng giềng tĩnh
  - **Chủ đề gợi ý (tầng 1):** ba điều kiện lên láng giềng
  - **Vì sao:** Số hiệu tiến trình chỉ có ý nghĩa nội bộ máy, hai bên khác số vẫn quen nhau. OSPF cũng không cần khai tay láng giềng — thứ hay thiếu là câu network phủ đúng cổng, hoặc hai cổng đặt lệch subnet.
- **Đề:** Gói mà router OSPF phát đều đặn để tìm láng giềng và giữ nhịp với họ tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** hello | gói hello | goi hello | hello packet | gói tin hello | goi tin hello
  - **Chủ đề gợi ý (tầng 1):** tiếng chào vọng qua hàng rào
  - **Vì sao:** Gói hello. Nó vừa đi tìm láng giềng lúc đầu, vừa làm nhịp tim về sau — im vài nhịp là bên kia coi như hàng xóm đã mất.
- **Đề:** Hai router ở trạng thái Full nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Hai bên đã giữ cùng một bản đồ mạng, giống nhau từng dòng** ✓ / Hai bên đã dùng hết băng thông của sợi cáp nối giữa chúng / Hai bên đã khai đủ mọi mạng của công ty vào câu network
  - **Chủ đề gợi ý (tầng 1):** thứ được chép cho đầy đủ
  - **Vì sao:** Full nói về BẢN ĐỒ: cơ sở dữ liệu đường đi của hai bên đã đồng bộ xong, nên từ đó hai router nhìn mạng giống hệt nhau.
- **Đề:** Router-A nghe được hello của hàng xóm nhưng trong đó thiếu tên mình. Đang ở bậc nào?
  - **Dạng:** trắc nghiệm · **Init — tiếng chào mới đi được một chiều** ✓ / 2-Way — hai bên đều đã thấy tên nhau / ExStart — hai bên đang chốt ai nói trước
  - **Chủ đề gợi ý (tầng 1):** bậc của tấm danh thiếp thiếu tên mình
  - **Vì sao:** Init: nghe được hello nhưng tên mình còn vắng trong đó, tức bên kia chưa nghe thấy mình. Có tên mình rồi mới lên 2-Way.
- **Đề:** Câu network của OSPF viết dải địa chỉ bằng loại mặt nạ đảo tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** wildcard | wildcard mask | mặt nạ đảo | mat na dao | mặt nạ ngược | mat na nguoc
  - **Chủ đề gợi ý (tầng 1):** loại mặt nạ đã học ở Module 13
  - **Vì sao:** Wildcard mask. Với 0.0.0.255 thì ba nhóm số đầu phải khớp còn nhóm cuối tùy ý, nên nó tóm gọn mọi cổng thuộc một mạng /24.
- **Đề:** Có hai lối tới cùng một mạng: một chặng, hoặc hai chặng vòng qua router khác. OSPF chọn thế nào?
  - **Dạng:** trắc nghiệm · **Cộng cost dọc mỗi lối rồi giữ lối có tổng nhỏ hơn, ở đây là lối một chặng** ✓ / Giữ cả hai lối trong bảng và lần lượt gửi gói tin qua từng lối một / Giữ lối đi qua cổng có số hiệu nhỏ hơn trên chính router đang tính
  - **Chủ đề gợi ý (tầng 1):** thước đo đường của OSPF
  - **Vì sao:** OSPF cộng cost dọc đường và giữ tổng nhỏ nhất. Trong app mỗi chặng cost 1 nên lối một chặng thắng; số hiệu cổng không dính gì tới việc chọn đường.
- **Đề:** Trong bảng show ip route, tuyến router tự học được từ OSPF mang chữ cái đầu dòng nào?
  - **Dạng:** gõ tay · **Chấp nhận:** o | O | chữ o | chu o | mã o | ma o
  - **Chủ đề gợi ý (tầng 1):** chữ cái đầu dòng của tuyến OSPF
  - **Vì sao:** Chữ O. Cùng bảng đó, C là mạng nối trực tiếp và S là tuyến tĩnh gõ tay.
- **Đề:** Cùng một mạng đích có cả tuyến tĩnh lẫn tuyến OSPF, cùng độ dài prefix. Router dùng cái nào?
  - **Dạng:** trắc nghiệm · **Tuyến tĩnh, vì khoảng cách quản trị 1 nhỏ hơn 110 của OSPF** ✓ / Tuyến OSPF, vì nó mới được cập nhật gần đây hơn tuyến tĩnh / Cả hai luân phiên, để chia đều lưu lượng ra hai đường đó
  - **Chủ đề gợi ý (tầng 1):** mức tin cậy của hai nguồn tuyến
  - **Vì sao:** Số nhỏ hơn thì được tin hơn, nên tuyến tĩnh thắng. Cái giá là nó nằm im khi đường của nó đứt và che mất lối vòng OSPF đã tìm ra.
- **Đề:** Xếp lại đúng trình tự những gì xảy ra sau khi một sợi cáp giữa hai router bị cắt.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Gói hello im tiếng trên cổng hướng ra sợi cáp vừa đứt
    2. Hai router hai đầu coi láng giềng đã mất và sửa bản đồ của mình
    3. Tin sửa bản đồ lan ra cả vùng, mọi router bỏ đường hỏng
    4. Mỗi router tính lại cost và bảng định tuyến chuyển sang lối vòng
  - **Chủ đề gợi ý (tầng 1):** chuỗi phản ứng sau khi mất một đường
  - **Vì sao:** Mất nhịp hello là dấu hiệu đầu tiên; từ đó bản đồ được sửa, tin lan ra cả vùng, và cuối cùng mỗi router tính lại đường ngắn nhất.
- **Đề:** Đi hai tầng dưới của tòa nhà làm quen từ trí nhớ: mỗi phòng là bậc nào, và ở bậc đó đang xảy ra chuyện gì?
  - **Dạng:** đi lại cung điện từ trí nhớ (4 phòng)
    - tầng 1 phòng 1 · Down · im lặng hoàn toàn · hình `ospf-silent-speaker` — Tầng trệt phòng Down: chiếc loa treo trên tường im bặt, chẳng một tiếng chào nào vọng tới — trong sổ của router, hàng xóm vẫn còn là chỗ trống.
    - tầng 1 phòng 2 · Attempt · gọi riêng từng nhà · hình `ospf-lone-phone` — Cạnh đó, phòng Attempt: một chiếc điện thoại quay số gọi đích danh sang nhà hàng xóm, vì ở xóm này hét chung ra giữa đường thì chẳng ai nghe thấy.
    - tầng 2 phòng 1 · Init · mới nghe tiếng chào một chiều · hình `ospf-name-card` — Tầng hai phòng Init: một tấm danh thiếp vừa luồn qua khe cửa, trên đó có tên hàng xóm mà tìm mỏi mắt vẫn thiếu tên mình.
    - tầng 2 phòng 2 · 2-Way · hai bên đã thấy tên nhau · hình `ospf-handshake` — Kế bên là phòng 2-Way: hai bàn tay bắt chặt giữa sảnh, vì tấm thiếp lần này có cả tên mình nằm trong danh sách hàng xóm.
  - **Vì sao:** Down (im lặng hoàn toàn) → Attempt (gọi riêng từng nhà, chỉ có ở mạng NBMA) → Init (mới nghe tiếng chào một chiều) → 2-Way (hai bên đã thấy tên nhau).
- **Đề:** Đi hai tầng trên của tòa nhà làm quen từ trí nhớ: mỗi phòng là bậc nào, và hai router đang trao nhau cái gì?
  - **Dạng:** đi lại cung điện từ trí nhớ (4 phòng)
    - tầng 3 phòng 1 · ExStart · chốt ai nói trước · hình `ospf-gavel` — Tầng ba phòng ExStart: chiếc búa chủ tọa gõ một tiếng xuống bàn để chốt xem ai được mở lời trước trong cuộc trao đổi sắp tới.
    - tầng 3 phòng 2 · Exchange · trao mục lục cho nhau · hình `ospf-two-envelopes` — Sát vách là phòng Exchange: hai phong bì mục lục bay chéo qua nhau, mỗi bên khoe mình đang giữ những trang bản đồ mạng nào.
    - tầng 4 phòng 1 · Loading · xin nốt phần còn thiếu · hình `ospf-funnel` — Tầng nóc phòng Loading: một cái phễu lớn rót nốt những trang bản đồ còn thiếu vào kho, xin đúng phần mình đang hụt.
    - tầng 4 phòng 2 · Full · hai bản đồ giống hệt nhau · hình `ospf-twin-maps` — Phòng cuối cùng, phòng Full: hai tấm bản đồ đặt chồng khít lên nhau, lệch nhau đúng không một nét — từ giây đó hai router nhìn mạng y hệt nhau.
  - **Vì sao:** ExStart (chốt ai nói trước) → Exchange (trao mục lục cho nhau) → Loading (xin nốt phần còn thiếu) → Full (hai bản đồ giống hệt nhau).
- **Đề:** Router-DN đã bật OSPF và khai mạng LAN của nó, nhưng hai chi nhánh vẫn không gọi được nhau. Console đang cắm vào Router-DN: hãy khai nốt phần còn thiếu để PC-A gọi được PC-B.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-A (Hà Nội) [192.168.1.10/24, gw 192.168.1.1] · PC-B (Đà Nẵng) [192.168.2.10/24, gw 192.168.2.1] · Switch-HN [p1:VLAN 1, p2:VLAN 1] · Switch-DN [p1:VLAN 1, p2:VLAN 1] · Router-HN [g0:192.168.1.1/24, g1:10.0.12.1/24] · Router-DN [g0:192.168.2.1/24, g1:10.0.12.2/24] — dây: PC-A (Hà Nội)·eth0 — Switch-HN·p1 | Switch-HN·p2 — Router-HN·g0 | PC-B (Đà Nẵng)·eth0 — Switch-DN·p1 | Switch-DN·p2 — Router-DN·g0 | Router-HN·g1 — Router-DN·g1
    - **Console cắm ở:** Router-DN
    - **Mục tiêu:**
      - pc-a PHẢI gọi được pc-b
    - **Lệnh mẫu trên Router-DN:** `enable` rồi `configure terminal` rồi `router ospf 1` rồi `network 10.0.12.0 0.0.0.255 area 0` rồi `end`
  - **Chủ đề gợi ý (tầng 1):** cổng nào của Router-DN còn đứng ngoài OSPF
  - **Vì sao:** Thiếu câu network cho đường nối sang Hà Nội: cổng g1 chưa tham gia OSPF nên láng giềng đứng ở lý do network-not-declared. Gõ network 10.0.12.0 0.0.0.255 area 0 trong tiến trình OSPF là hai bên lên Full và bảng đường tự mọc dòng chữ O.
- **Đề:** Mạng ba chi nhánh này đang cho lưu lượng đi thẳng từ Hà Nội sang Sài Gòn. Hãy cắt sợi cáp nối thẳng đó ra và chứng minh PC-A vẫn gọi được PC-C, với đường đi ghé qua Router-DN.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** PC-A (Hà Nội) [192.168.1.10/24, gw 192.168.1.1] · PC-C (Sài Gòn) [192.168.3.10/24, gw 192.168.3.1] · Switch-HN [p1:VLAN 1, p2:VLAN 1] · Switch-SG [p1:VLAN 1, p2:VLAN 1] · Router-HN [g0:192.168.1.1/24, g1:10.0.12.1/24, g2:10.0.13.1/24] · Router-DN [g1:10.0.12.2/24, g2:10.0.23.2/24] · Router-SG [g0:192.168.3.1/24, g1:10.0.23.3/24, g2:10.0.13.3/24] — dây: PC-A (Hà Nội)·eth0 — Switch-HN·p1 | Switch-HN·p2 — Router-HN·g0 | PC-C (Sài Gòn)·eth0 — Switch-SG·p1 | Switch-SG·p2 — Router-SG·g0 | Router-HN·g1 — Router-DN·g1 | Router-DN·g2 — Router-SG·g1 | Router-HN·g2 — Router-SG·g2
    - **Mục tiêu:**
      - đường pc-a → pc-c phải qua r-2
    - **Được phép:** gỡ dây
    - **Lời giải mẫu:** PC-A (Hà Nội) [192.168.1.10/24, gw 192.168.1.1] · PC-C (Sài Gòn) [192.168.3.10/24, gw 192.168.3.1] · Switch-HN [p1:VLAN 1, p2:VLAN 1] · Switch-SG [p1:VLAN 1, p2:VLAN 1] · Router-HN [g0:192.168.1.1/24, g1:10.0.12.1/24, g2:10.0.13.1/24] · Router-DN [g1:10.0.12.2/24, g2:10.0.23.2/24] · Router-SG [g0:192.168.3.1/24, g1:10.0.23.3/24, g2:10.0.13.3/24] — dây: PC-A (Hà Nội)·eth0 — Switch-HN·p1 | Switch-HN·p2 — Router-HN·g0 | PC-C (Sài Gòn)·eth0 — Switch-SG·p1 | Switch-SG·p2 — Router-SG·g0 | Router-HN·g1 — Router-DN·g1 | Router-DN·g2 — Router-SG·g1
  - **Chủ đề gợi ý (tầng 1):** lối còn lại khi đường thẳng mất
  - **Vì sao:** Gỡ sợi nối thẳng Router-HN với Router-SG là đủ: cả vùng bỏ đường đó khỏi bản đồ, tính lại cost, và mạng 192.168.3.0 được học lại với cost 2 qua Router-DN — không ai phải gõ thêm dòng lệnh nào.

## ACL và bảo mật lớp 2 — Luật chặn đúng người `module-17`

Phần D · 5 chặng · 5 bài · 12 khái niệm

**Chặng:** Dòng cấm không ai nhìn thấy (m17-bai-1) → Chặn cả xóm hay chặn đúng một cửa (m17-bai-2) → Đúng cửa, đúng chiều (m17-bai-3) → Khóa cổng switch lại (m17-bai-4) → Kẻ mạo danh trong xóm (m17-bai-5)

### Bài: Tìm ra dòng luật đang chặn cả sếp `m17-bai-1`

**1 · Khởi động (hook):** Người quản trị viết đúng MỘT dòng luật để chặn máy phòng khách khỏi máy chủ kế toán. Gõ xong, thử lại: máy khách tắc thật. Nửa tiếng sau giám đốc gọi xuống — máy của sếp cũng không vào được nữa. Mở luật ra xem thì trên router vẫn chỉ có một dòng, và dòng ấy không hề nhắc tới máy giám đốc. Vậy ai đang chặn sếp?

**2 · Đoán thử (pretest):**
- **Đề:** Console đang cắm vào R-Van-phong. Trước khi ai giải thích gì cho bạn, hãy tự mở danh sách lọc trên router ra xem nó thật sự có mấy dòng, và dòng nào đang ăn gói tin. Sai cũng không sao — phần này không tính điểm.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-Giam-doc [192.168.1.10/24, gw 192.168.1.1] · PC-Phong-khach [192.168.1.66/24, gw 192.168.1.1] · SRV-Ke-toan [192.168.2.50/24, gw 192.168.2.1] · SW-Van-phong [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-May-chu [p1:VLAN 1, p2:VLAN 1] · R-Van-phong [g0:192.168.1.1/24, g1:192.168.2.1/24] — dây: PC-Giam-doc·eth0 — SW-Van-phong·p1 | PC-Phong-khach·eth0 — SW-Van-phong·p2 | SW-Van-phong·p3 — R-Van-phong·g0 | R-Van-phong·g1 — SW-May-chu·p1 | SW-May-chu·p2 — SRV-Ke-toan·eth0
    - **Console cắm ở:** R-Van-phong
    - **Mục tiêu:**
      - phải xem "show access-lists" trên R-Van-phong
    - **Lệnh mẫu trên R-Van-phong:** `show access-lists`
  - **Chủ đề gợi ý (tầng 1):** lệnh mở các danh sách lọc trên router
  - **Vì sao:** Bảng in ra đúng một dòng: 10 deny icmp host 192.168.1.66 any. Không dòng nào nhắc tới 192.168.1.10, mà sếp vẫn tắc. Lý do nằm ở chỗ máy không in ra: cuối MỌI danh sách còn một dòng vô hình — cấm tất cả những gì chưa được cho phép. Máy khách chết ở dòng 10; cả văn phòng còn lại chết ở dòng vô hình ấy.

**3 · Khám phá (teach):**
- *[m17-acl]* ACL là một danh sách luật gắn lên cổng router, và nó làm đúng việc của người soát vé: mỗi gói tin đi qua cổng đó bị đem ra so với từng dòng, cho đi hay chặn lại. Một dòng luật gồm ba mảnh: cho phép hay cấm, giao thức nào, và cặp nguồn - đích. Danh sách đánh số từ 1 tới 99 gọi là chuẩn, từ 100 tới 199 gọi là mở rộng — bài sau bạn sẽ thấy hai loại ấy nhìn được những gì. Viết luật ra thôi thì chưa lọc ai cả: phải áp nó lên một cổng, theo một chiều, luật mới bắt đầu có hiệu lực.
  - **Đào sâu hơn:** Hai chỗ dễ hiểu nhầm. Một, ACL chỉ soi gói tin ĐI QUA router; gói do chính router sinh ra không bị danh sách của nó chặn. Hai, ARP là khung tầng 2, không phải gói IP, nên nó luồn qua bên dưới mọi ACL — trong phòng lab của app cũng vậy. Nghĩa là hai máy cùng xóm vẫn hỏi tên nhau được dù bạn có viết luật gì trên router đi nữa; ACL chỉ có tiếng nói ở chỗ gói tin phải nhờ router chuyển giúp.
- *[m17-thu-tu-dong]* Router đọc danh sách từ trên xuống và DỪNG ở dòng khớp đầu tiên. Dòng đó nói cho đi thì gói đi, nói cấm thì gói chết tại chỗ; những dòng phía dưới không bao giờ được hỏi tới. Vì thế thứ tự chính là luật: viết dòng rộng (cho phép cả dải) lên trên dòng hẹp (cấm một máy) thì dòng hẹp thành vô nghĩa, nó nằm đó cho đẹp. Quy tắc gõ: hẹp trước, rộng sau. Với ACL đánh số, dòng mới luôn rơi xuống CUỐI danh sách — không chèn được vào giữa, nên phải nghĩ trước khi gõ.
  - **Đào sâu hơn:** Lệnh show access-lists in kèm số đếm sau mỗi dòng: bao nhiêu gói đã khớp dòng đó. Cột ấy là bằng chứng khi chẩn đoán. Dòng có số đếm tăng nghĩa là gói tin CÓ tới được router và CÓ ăn đúng dòng đó — bạn biết mình đang nhìn đúng thủ phạm. Ngược lại, gói bị chặn mà không dòng nào tăng số thì kẻ ra tay là dòng vô hình ở màn hình tiếp theo.
- *[m17-implicit-deny]* Cuối mọi danh sách lọc có một dòng bạn không gõ và cũng không nhìn thấy: cấm tất cả. Gói tin đọc hết các dòng viết ra mà không khớp dòng nào thì rơi vào đó và chết. Hệ quả rất phũ: ngay khi bạn áp một danh sách lên cổng, mặc định của cổng ấy đổi từ cho tất cả sang cấm tất cả, và chỉ những gì bạn cho phép tường minh mới còn đi được. Nên danh sách nào cũng phải kết bằng một dòng mở cửa cho phần còn lại, nếu ý bạn chỉ là chặn vài kẻ.
  - **Đào sâu hơn:** Vì sao dòng ấy tồn tại? Vì luật an toàn ngoài đời cũng thế: cái gì không được cho phép thì mặc định là không được. Thà chặn nhầm còn hơn để lọt — miễn là người viết luật biết mình đang bật cái mặc định đó lên. Cái bẫy nằm ở chỗ nó vô hình: show access-lists không in nó ra, nên người mới nhìn danh sách một dòng và tưởng mình chỉ vừa chặn một máy.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Đọc một danh sách lọc đúng cách router đọc, từng bước một. Danh sách có hai dòng viết ra: dòng 10 cấm icmp từ host 192.168.1.66 đi bất kỳ đâu; dòng 20 cho phép ip từ dải 192.168.1.0 wildcard 0.0.0.255 đi bất kỳ đâu. Cộng thêm dòng vô hình cuối cùng: cấm tất cả. Bước 1 — gói của máy khách 192.168.1.66: so dòng 10, khớp cả giao thức lẫn nguồn, ăn ngay, CẤM, dừng đọc. Bước 2 — gói của máy giám đốc 192.168.1.10: so dòng 10, nguồn không khớp nên bỏ qua; so dòng 20, địa chỉ nằm trong dải 192.168.1.0 tới 192.168.1.255 nên khớp, CHO ĐI, dừng đọc. Bước 3 — gói của một máy ở dải 192.168.9.x: dòng 10 không khớp, dòng 20 cũng không khớp, hết dòng viết ra, dòng vô hình ra tay, CẤM. Bước 4 — rút ra ba thói quen: luôn đọc từ trên xuống, luôn dừng ở dòng khớp đầu tiên, và luôn nhớ dòng cuối cùng dù nó không hiện trên màn hình.
- **Đề:** Chính là ca lúc nãy, giờ tới lượt bạn chữa. Trên R-Van-phong, danh sách 101 mới có đúng một dòng cấm máy phòng khách và đang áp lên cổng g0 chiều vào. Hãy sửa sao cho máy giám đốc gọi được máy chủ kế toán trở lại, mà máy phòng khách thì vẫn phải tắc. Gõ show access-lists để tự làm chứng cho mình.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-Giam-doc [192.168.1.10/24, gw 192.168.1.1] · PC-Phong-khach [192.168.1.66/24, gw 192.168.1.1] · SRV-Ke-toan [192.168.2.50/24, gw 192.168.2.1] · SW-Van-phong [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-May-chu [p1:VLAN 1, p2:VLAN 1] · R-Van-phong [g0:192.168.1.1/24, g1:192.168.2.1/24] — dây: PC-Giam-doc·eth0 — SW-Van-phong·p1 | PC-Phong-khach·eth0 — SW-Van-phong·p2 | SW-Van-phong·p3 — R-Van-phong·g0 | R-Van-phong·g1 — SW-May-chu·p1 | SW-May-chu·p2 — SRV-Ke-toan·eth0
    - **Console cắm ở:** R-Van-phong
    - **Mục tiêu:**
      - pc-sep PHẢI gọi được srv-ke-toan
      - pc-khach phải KHÔNG gọi được srv-ke-toan
      - phải xem "show access-lists" trên R-Van-phong
    - **Lệnh mẫu trên R-Van-phong:** `enable` rồi `configure terminal` rồi `access-list 101 permit ip any any` rồi `end` rồi `show access-lists`
  - **Chủ đề gợi ý (tầng 1):** dòng dành cho phần còn lại
  - **Gợi ý (tầng 2):** Danh sách đang thiếu câu nói cho phần còn lại đi qua. ACL đánh số chỉ thêm được vào CUỐI — mà cuối lại đúng là chỗ câu ấy cần nằm.
  - **Lời giải (tầng 3):** Vào chế độ cấu hình rồi thêm một dòng mở cửa cho phần còn lại: access-list 101 permit ip any any. Nó rơi xuống thành dòng 20, tức là NẰM SAU dòng cấm máy khách — nên máy khách vẫn chết ở dòng 10, còn mọi máy khác gặp dòng 20 và đi được. Gõ show access-lists rồi thử lại, bạn sẽ thấy số đếm của từng dòng nói đúng ai đang ăn gói.
- **Đề:** Một người gõ hai dòng theo thứ tự này: trước là permit ip any any, sau là deny icmp host 192.168.1.66 any. Kết quả ra sao?
  - **Dạng:** trắc nghiệm · **Máy 192.168.1.66 vẫn đi được, vì dòng cho phép đứng trên đã ăn gói trước** ✓ / Máy 192.168.1.66 bị chặn, vì dòng cấm nào cũng mạnh hơn dòng cho phép / Cả hai dòng cùng vô hiệu, vì trong một danh sách không được trộn cho phép với cấm
  - **Chủ đề gợi ý (tầng 1):** dòng nào được đọc trước
  - **Gợi ý (tầng 2):** Router dừng ở dòng khớp ĐẦU TIÊN. Gói của .66 gặp dòng nào trước?
  - **Lời giải (tầng 3):** Nó vẫn đi được. Gói của .66 khớp ngay dòng permit ip any any ở trên, router quyết định xong và dừng — dòng cấm phía dưới không bao giờ được hỏi tới. Trong ACL không có chuyện cấm mạnh hơn cho phép; chỉ có trên mạnh hơn dưới.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: cuối mỗi danh sách lọc luôn có một dòng không được in ra. Dòng đó làm gì?
  - **Dạng:** gõ tay · **Chấp nhận:** cấm tất cả | cam tat ca | cấm hết | cam het | chặn tất cả | chan tat ca | cấm tất cả phần còn lại | cam tat ca phan con lai | cấm những gì chưa được cho phép | cam nhung gi chua duoc cho phep | deny all | deny any
  - **Chủ đề gợi ý (tầng 1):** mặc định của một cổng đã áp danh sách
  - **Gợi ý (tầng 2):** Gói tin đọc hết các dòng viết ra mà không khớp dòng nào thì chuyện gì xảy ra với nó?
  - **Lời giải (tầng 3):** Nó cấm tất cả. Gói không khớp dòng nào thì rơi vào dòng vô hình ấy và chết — nên áp một danh sách lên cổng là đổi mặc định của cổng từ cho tất cả thành cấm tất cả.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao viết đúng một dòng cấm mà cả văn phòng lại mất đường đi?
  - **Nhóm ý cần chạm:** [vô hình, vo hinh, không in ra, khong in ra, ngầm, ngam, implicit] · [cấm tất cả, cam tat ca, cấm hết, cam het, chặn tất cả, chan tat ca, deny all] · [cuối danh sách, cuoi danh sach, dòng cuối, dong cuoi, sau cùng, sau cung] · [không khớp, khong khop, không có dòng nào cho phép, khong co dong nao cho phep, thiếu permit, thieu permit]
  - **Trả lời mẫu:** Vì cuối danh sách có một dòng vô hình cấm tất cả. Dòng tôi gõ chỉ nói về máy phòng khách, nên gói của mọi máy khác không khớp dòng nào và rơi thẳng vào dòng cấm cuối cùng. Áp danh sách lên cổng là bật cái mặc định cấm tất cả lên, muốn giữ đường cho phần còn lại thì phải viết thêm một dòng permit.

**6 · Tổng kết:**
- ACL là danh sách luật gắn lên cổng router; viết ra thôi chưa lọc ai, phải áp lên cổng theo một chiều.
- Router đọc từ trên xuống và dừng ở dòng khớp đầu tiên — hẹp viết trước, rộng viết sau.
- Cuối mọi danh sách có dòng vô hình cấm tất cả; nó là thủ phạm quen mặt của những ca chặn nhầm.
- *Úp mở bài sau:* Nhưng dòng luật ban nãy chặn máy khách đi MỌI nơi, kể cả ra Internet — trong khi sếp chỉ muốn cấm nó vào máy chủ kế toán. Bài sau: hai họ danh sách, một họ chỉ nhìn được người gửi, họ kia nhìn được cả người nhận.

### Bài: Chọn đúng loại danh sách cho việc mình cần `m17-bai-2`

**1 · Khởi động (hook):** Yêu cầu của sếp nghe rất gọn: máy phòng khách không được vào máy chủ kế toán, nhưng vẫn phải lướt web bình thường. Bạn viết một luật chặn máy đó — và khách kêu mất mạng hoàn toàn. Luật đã chạy đúng như bạn viết. Vậy bạn đã viết thiếu điều gì mà sếp coi là hiển nhiên?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: một danh sách lọc CHUẨN (số 1 tới 99) nhìn được thông tin nào của gói tin?
  - **Dạng:** trắc nghiệm · **Chỉ địa chỉ người gửi** ✓ / Cả người gửi lẫn người nhận / Người gửi, người nhận và cả port dịch vụ
  - **Chủ đề gợi ý (tầng 1):** chữ chuẩn ở đây nghĩa là đơn giản nhất
  - **Vì sao:** Chỉ nhìn được địa chỉ nguồn. Đó vừa là ưu điểm (viết một dòng là xong) vừa là cái bẫy: đã chặn một nguồn thì chặn nó đi mọi nơi, không tách được nơi nào cấm nơi nào cho.

**3 · Khám phá (teach):**
- *[m17-acl-chuan]* Danh sách CHUẨN mang số từ 1 tới 99. Nó chỉ soi được một thứ: gói tin này của ai gửi. Không biết gói đang đi đâu, không biết là ping hay web. Vì thế một dòng cấm trong danh sách chuẩn là cấm nguồn ấy đi TẤT CẢ mọi nơi — đúng cảnh máy phòng khách mất mạng sạch ở phần mở đầu. Nó hợp cho những việc thô mà rõ: cấm hẳn một dải, hoặc chỉ cho đúng một dải quản trị vào.
  - **Đào sâu hơn:** Fidelity cần nói rõ: trên thiết bị thật, danh sách chuẩn viết ngắn hơn vì nó chỉ khai một vế nguồn. Console trong app này rút gọn ngữ pháp cho đồng nhất — mọi dòng đều viết đủ giao thức, nguồn rồi đích, dù bạn dùng số hiệu nào. Bạn vẫn học đúng cái quan trọng (loại nào nhìn được gì, đặt ở đâu), chỉ cần nhớ rằng ngoài đời một dòng chuẩn thật gọn hơn dòng bạn gõ ở đây.
- *[m17-acl-mo-rong]* Danh sách MỞ RỘNG mang số từ 100 tới 199 và nhìn được cả bốn thứ: giao thức, nguồn, đích, và với tcp hay udp thì thêm port dịch vụ. Nhờ vậy nó nói được đúng câu của sếp: máy 192.168.1.66 không được ping tới 192.168.2.50, còn đi chỗ khác thì tùy. Cái giá phải trả là mỗi dòng dài hơn và bạn phải nghĩ kỹ hơn về vế đích — nhưng đó chính là chỗ luật trở nên đúng người đúng việc.
  - **Đào sâu hơn:** Địa chỉ trong mọi dòng luật viết bằng wildcard mask của Module 13, không phải subnet mask: bit 0 là chỗ phải khớp, bit 1 là chỗ mặc kệ. Ba lối viết tắt hay gặp: any là 0.0.0.0 với wildcard 255.255.255.255 (mặc kệ tất), host 192.168.2.50 là wildcard 0.0.0.0 (khớp từng bit), còn 192.168.1.0 0.0.0.255 nghĩa là cả xóm .1. Phòng lab chỉ sinh lưu lượng ping, nên dòng luật tcp hay udp kèm port dịch vụ ở đây là để ĐỌC và để hiểu, chứ không có gói nào của app khớp vào chúng.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Router R-Van-phong hiện chưa có luật nào. Hãy viết đúng ý sếp: PC-Phong-khach (192.168.1.66) không được ping tới SRV-Ke-toan (192.168.2.50), còn PC-Giam-doc (192.168.1.10) thì vẫn phải gọi được máy chủ. Đây là việc cần loại danh sách nhìn thấy cả vế đích — và đừng quên phần còn lại của văn phòng.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-Giam-doc [192.168.1.10/24, gw 192.168.1.1] · PC-Phong-khach [192.168.1.66/24, gw 192.168.1.1] · SRV-Ke-toan [192.168.2.50/24, gw 192.168.2.1] · SW-Van-phong [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-May-chu [p1:VLAN 1, p2:VLAN 1] · R-Van-phong [g0:192.168.1.1/24, g1:192.168.2.1/24] — dây: PC-Giam-doc·eth0 — SW-Van-phong·p1 | PC-Phong-khach·eth0 — SW-Van-phong·p2 | SW-Van-phong·p3 — R-Van-phong·g0 | R-Van-phong·g1 — SW-May-chu·p1 | SW-May-chu·p2 — SRV-Ke-toan·eth0
    - **Console cắm ở:** R-Van-phong
    - **Mục tiêu:**
      - pc-khach phải KHÔNG gọi được srv-ke-toan
      - pc-sep PHẢI gọi được srv-ke-toan
    - **Lệnh mẫu trên R-Van-phong:** `enable` rồi `configure terminal` rồi `access-list 101 deny icmp host 192.168.1.66 host 192.168.2.50` rồi `access-list 101 permit ip any any` rồi `interface g0` rồi `ip access-group 101 in` rồi `end`
  - **Chủ đề gợi ý (tầng 1):** loại danh sách nhìn được cả vế đích
  - **Gợi ý (tầng 2):** Ba mảnh cần gõ, theo đúng thứ tự: một dòng cấm hẹp (deny icmp host … host …), một dòng mở cho phần còn lại (permit ip any any), rồi vào interface g0 và áp danh sách vào chiều in. Số hiệu phải nằm trong khoảng 100 tới 199.
  - **Lời giải (tầng 3):** Gõ lần lượt: enable, configure terminal, access-list 101 deny icmp host 192.168.1.66 host 192.168.2.50, access-list 101 permit ip any any, interface g0, ip access-group 101 in, end. Dòng cấm hẹp đứng trước nên nó ăn đúng gói của máy khách gửi tới máy chủ; dòng permit đứng sau giữ đường cho tất cả những gì còn lại, kể cả máy khách đi nơi khác.
- **Đề:** Bạn cần một luật phân biệt được nguồn VÀ đích. Số hiệu danh sách phải nằm trong khoảng nào?
  - **Dạng:** gõ tay · **Chấp nhận:** 100-199 | 100 199 | 100 tới 199 | 100 toi 199 | từ 100 đến 199 | tu 100 den 199 | 100 den 199 | mở rộng | mo rong | acl mở rộng | acl mo rong | extended
  - **Chủ đề gợi ý (tầng 1):** dải số của họ danh sách mở rộng
  - **Gợi ý (tầng 2):** Một họ chiếm dải số nhỏ, họ kia chiếm dải số lớn hơn. Họ nào nhìn được nhiều thứ hơn?
  - **Lời giải (tầng 3):** Từ 100 tới 199 — dải của danh sách mở rộng. Dải 1 tới 99 là danh sách chuẩn, chỉ soi được nguồn nên không tách được đích này với đích kia.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đóng bài lại: danh sách CHUẨN chỉ so được vế nào của gói tin?
  - **Dạng:** gõ tay · **Chấp nhận:** nguồn | nguon | địa chỉ nguồn | dia chi nguon | người gửi | nguoi gui | máy gửi | may gui | source
  - **Chủ đề gợi ý (tầng 1):** một trong hai vế địa chỉ
  - **Gợi ý (tầng 2):** Nếu nó biết được vế kia thì đã chẳng có chuyện chặn một máy là chặn nó đi khắp nơi.
  - **Lời giải (tầng 3):** Chỉ vế nguồn — địa chỉ người gửi. Vì mù vế đích nên một dòng cấm trong danh sách chuẩn là cấm nguồn ấy đi mọi nơi.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao yêu cầu kiểu "cấm phòng khách vào máy chủ kế toán nhưng vẫn cho lướt web" bắt buộc phải dùng danh sách mở rộng?
  - **Nhóm ý cần chạm:** [đích, dich, nơi đến, noi den, người nhận, nguoi nhan, máy chủ, may chu] · [chuẩn, chuan, 1 đến 99, 1 den 99, standard] · [mở rộng, mo rong, 100, extended] · [chặn hết, chan het, cấm mọi nơi, cam moi noi, mất mạng, mat mang, tất cả các đích, tat ca cac dich]
  - **Trả lời mẫu:** Vì yêu cầu đó phân biệt theo NƠI ĐẾN, mà danh sách chuẩn chỉ nhìn được người gửi. Dùng chuẩn thì cấm máy phòng khách là cấm nó đi mọi nơi, mất luôn cả đường ra web. Danh sách mở rộng số 100 tới 199 nhìn được cả đích nên viết được đúng câu: cấm máy đó tới máy chủ kế toán, còn các đích khác vẫn cho đi.

**6 · Tổng kết:**
- Danh sách chuẩn (1 tới 99) chỉ soi được nguồn: cấm một nguồn là cấm nó đi mọi nơi.
- Danh sách mở rộng (100 tới 199) soi được giao thức, nguồn, đích và port dịch vụ.
- Địa chỉ trong luật viết bằng wildcard: any là mặc kệ tất, host là khớp từng bit.
- *Úp mở bài sau:* Luật đã viết đúng chữ rồi. Nhưng cùng một danh sách, gắn vào cổng này thay vì cổng kia, hoặc chiều vào thay vì chiều ra, sẽ cho ra hai kết quả khác hẳn nhau — bài sau là chuyện đặt luật đứng ở đâu.

### Bài: Gắn luật vào đúng cửa, đúng chiều `m17-bai-3`

**1 · Khởi động (hook):** Hai người viết y hệt một danh sách lọc. Người thứ nhất gắn nó vào cổng phía văn phòng, chiều gói tin đi vào router. Người thứ hai gắn vào cổng phía máy chủ, chiều gói tin đi ra. Cùng một dòng chữ, cùng một mạng — nhưng chỉ một trong hai chặn đúng thứ cần chặn. Vì sao chỗ đứng của luật lại đổi được kết quả?

**2 · Đoán thử (pretest):**
- **Đề:** Bạn vừa gõ xong hai dòng access-list trên router và thoát ra. Chưa gõ thêm gì nữa. Lúc này mạng ra sao?
  - **Dạng:** trắc nghiệm · **Chưa có gì đổi, vì danh sách chưa được gắn vào cổng nào** ✓ / Luật đã có hiệu lực ngay trên mọi cổng của router đó / Router chặn sạch mọi hướng cho tới khi bạn gõ lệnh mở lại
  - **Chủ đề gợi ý (tầng 1):** quãng giữa viết luật và luật có hiệu lực
  - **Vì sao:** Chưa có gì đổi. Viết danh sách mới chỉ là soạn nội quy để trong ngăn kéo; phải dán nó lên một cánh cửa cụ thể theo một chiều cụ thể bằng ip access-group thì người gác mới bắt đầu đọc.

**3 · Khám phá (teach):**
- *[m17-chieu-in-out]* Chiều được tính theo con mắt của ROUTER, không phải theo cảm giác của bạn. Chiều in là lúc gói vừa đi vào cổng đó, trước khi router tra bảng định tuyến. Chiều out là lúc gói đã được chọn đường và sắp rời cổng đó. Cùng một danh sách đặt hai chiều sẽ soi hai luồng gói khác nhau: gói của văn phòng đi lên máy chủ là chiều IN ở cổng phía văn phòng, nhưng lại là chiều OUT ở cổng phía máy chủ. Câu hỏi phải tự trả lời trước khi gõ: luồng mình muốn chặn đi vào cổng nào và ra cổng nào?
  - **Đào sâu hơn:** Chặn ở chiều in rẻ hơn: gói bị loại trước cả bước tra bảng định tuyến, router đỡ làm việc thừa. Đó là một lý do người ta thích in hơn out khi cả hai cùng chặn đúng. Lý do thứ hai thuộc về chẩn đoán: luật đặt ngay cửa vào thì số đếm match nói thẳng có bao nhiêu gói của nhánh ấy đang bị chặn, không lẫn với gói của nhánh khác cũng đi qua cổng ra.
- *[m17-dat-o-dau]* Quy tắc nghề gói lại thành một câu: danh sách MỞ RỘNG đặt gần NGUỒN, danh sách CHUẨN đặt gần ĐÍCH. Mở rộng biết cả đích nên chặn được ngay tại cửa nhà kẻ bị cấm, gói chết sớm, không tốn đường truyền. Chuẩn thì mù vế đích — đặt nó gần nguồn là chặn kẻ đó đi mọi nơi, kể cả những nơi lẽ ra được đi; nên phải mang xuống sát đích cần bảo vệ, chỗ mà chặn nguồn ấy đúng bằng chặn nguồn ấy tới đích ấy.
  - **Đào sâu hơn:** Quy tắc này là hệ quả chứ không phải điều luật thần bí: nó chỉ nói rằng hãy chặn ở chỗ gần nhất mà luật của bạn còn đủ thông tin để chặn ĐÚNG. Khi phải chọn giữa chặn sớm và chặn đúng thì chặn đúng luôn thắng — một luật chặn nhầm cả người ngay tình còn tệ hơn một luật để gói chạy thêm vài chặng.
- *[m17-acl-vs-stateful]* Nhớ lại tường lửa stateful ở Module 7: nó GHI SỔ cuộc gọi bạn vừa mở, nên khi trang web trả lời, lời đáp được vào thẳng dù chẳng ai viết luật cho chiều về. ACL đánh số không có cuốn sổ đó. Nó xét từng gói một cách rời rạc, không nhớ gói nào vừa đi qua, nên chiều về phải tự bạn lo bằng một dòng luật khác. Hai họ không thay thế nhau: ACL là dao mổ thô đặt trên đường đi của router, tường lửa stateful là người gác nhớ mặt khách.
  - **Đào sâu hơn:** Đó là lý do các dòng luật ngoài đời hay có chữ established ở vế tcp: nó nhận diện gói của một cuộc trò chuyện đã mở sẵn, tức là mượn tạm một chút trí nhớ mà không cần cả bộ máy stateful. Trong phạm vi của app này chỉ có ping, và ping thì gói đi lẫn lời đáp đều là icmp — nên nếu bạn chặn icmp một chiều thì hãy tự hỏi chiều còn lại đi qua cổng nào.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Người trực ca trước đã viết sẵn danh sách 101 trên R-Van-phong: dòng 10 cấm máy phòng khách ping máy chủ kế toán, dòng 20 cho phép phần còn lại. Viết xong thì hết ca, chưa gắn vào đâu cả — và máy khách vẫn vào máy chủ ngon lành. Hãy gắn danh sách vào đúng cửa, đúng chiều, rồi mở show access-lists ra kiểm chứng.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-Giam-doc [192.168.1.10/24, gw 192.168.1.1] · PC-Phong-khach [192.168.1.66/24, gw 192.168.1.1] · SRV-Ke-toan [192.168.2.50/24, gw 192.168.2.1] · SW-Van-phong [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-May-chu [p1:VLAN 1, p2:VLAN 1] · R-Van-phong [g0:192.168.1.1/24, g1:192.168.2.1/24] — dây: PC-Giam-doc·eth0 — SW-Van-phong·p1 | PC-Phong-khach·eth0 — SW-Van-phong·p2 | SW-Van-phong·p3 — R-Van-phong·g0 | R-Van-phong·g1 — SW-May-chu·p1 | SW-May-chu·p2 — SRV-Ke-toan·eth0
    - **Console cắm ở:** R-Van-phong
    - **Mục tiêu:**
      - pc-khach phải KHÔNG gọi được srv-ke-toan
      - pc-sep PHẢI gọi được srv-ke-toan
      - phải xem "show access-lists" trên R-Van-phong
    - **Lệnh mẫu trên R-Van-phong:** `enable` rồi `configure terminal` rồi `interface g0` rồi `ip access-group 101 in` rồi `end` rồi `show access-lists`
  - **Chủ đề gợi ý (tầng 1):** cổng phía văn phòng và chiều gói tin đi vào
  - **Gợi ý (tầng 2):** Danh sách này là loại mở rộng nên đặt gần nguồn: cổng g0 quay về phía văn phòng. Luồng cần chặn đi VÀO cổng ấy, nên chiều cần chọn là in. Vào interface g0 rồi gắn bằng ip access-group.
  - **Lời giải (tầng 3):** Gõ: enable, configure terminal, interface g0, ip access-group 101 in, end. Đặt ở g0 chiều in là chặn ngay tại cửa vào, gói của máy khách chết trước cả khi router tra bảng đường. Gõ show access-lists sau vài lượt thử, số đếm ở dòng 10 sẽ tăng đúng bằng số gói máy khách vừa gửi.
- **Đề:** Trộn lại kiến thức Module 7: ở nhà, bạn mở một trang web và lời đáp về được dù chẳng ai viết luật cho chiều về. Nếu đường đi ấy chỉ có ACL đánh số canh gác thì sao?
  - **Dạng:** trắc nghiệm · **Chiều về phải có luật riêng cho phép, vì ACL không nhớ cuộc gọi nào vừa mở** ✓ / Chiều về vẫn tự lọt, vì ACL ghi sổ cuộc gọi giống hệt tường lửa stateful / Chiều về bị chặn hẳn, vì ACL cấm mọi gói tin không do router tự sinh ra
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ nhớ cuộc gọi mà ACL không có
  - **Gợi ý (tầng 2):** Thứ làm nên chữ stateful ở Module 7 là gì? ACL đánh số có thứ đó không?
  - **Lời giải (tầng 3):** Chiều về phải được cho phép tường minh. Tường lửa stateful nhớ cuộc gọi bạn vừa mở nên lời đáp tự được vào; ACL đánh số xét từng gói rời rạc, không có trí nhớ, nên nếu bạn chặn nhầm chiều về thì cuộc trò chuyện đứt dù chiều đi vẫn thông.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: danh sách mở rộng nên đặt gần đầu nào của đường đi — nguồn hay đích?
  - **Dạng:** gõ tay · **Chấp nhận:** nguồn | nguon | gần nguồn | gan nguon | gần máy gửi | gan may gui | source
  - **Chủ đề gợi ý (tầng 1):** loại nào biết đủ thông tin để chặn sớm
  - **Gợi ý (tầng 2):** Nó biết cả vế đích, nên chặn sớm cũng không sợ chặn nhầm đích khác.
  - **Lời giải (tầng 3):** Gần nguồn. Vì mở rộng biết cả vế đích nên chặn ngay cửa nhà kẻ bị cấm vẫn đúng người đúng việc, lại tiết kiệm đường truyền. Danh sách chuẩn thì ngược lại: mù vế đích nên phải mang xuống gần đích.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao danh sách chuẩn lại phải đặt gần đích, trong khi mở rộng thì đặt gần nguồn?
  - **Nhóm ý cần chạm:** [chỉ biết nguồn, chi biet nguon, mù đích, mu dich, không biết đích, khong biet dich] · [chặn nhầm, chan nham, chặn hết, chan het, mọi nơi, moi noi, mọi đích, moi dich] · [gần đích, gan dich, sát đích, sat dich, cuối đường, cuoi duong] · [mở rộng, mo rong, biết đích, biet dich, chặn sớm, chan som, gần nguồn, gan nguon]
  - **Trả lời mẫu:** Vì danh sách chuẩn chỉ biết người gửi. Đặt nó gần nguồn thì nó chặn kẻ đó đi tất cả mọi nơi, kể cả những nơi lẽ ra vẫn được đi, nên phải mang xuống sát đích cần bảo vệ để chặn nguồn ấy đúng bằng chặn nguồn ấy tới đích ấy. Danh sách mở rộng biết cả vế đích nên chặn ngay gần nguồn vẫn đúng người đúng việc, lại đỡ tốn đường truyền.

**6 · Tổng kết:**
- Viết luật xong chưa lọc gì — phải gắn vào một cổng theo một chiều bằng ip access-group.
- Chiều tính theo mắt router: in là gói vừa vào cổng, out là gói sắp rời cổng.
- Mở rộng đặt gần nguồn, chuẩn đặt gần đích; ACL không nhớ chiều về như tường lửa stateful.
- *Úp mở bài sau:* Tới đây bạn đã canh được cửa của router. Nhưng kẻ phá đám nguy hiểm nhất lại không đi qua router: nó cắm thẳng vào một cổng switch trong xóm. Bài sau xuống tầng 2 khóa cổng lại.

### Bài: Dựng lại cổng switch vừa bị đánh sập `m17-bai-4`

**1 · Khởi động (hook):** Có một kiểu nghe lén không cần phần mềm cao siêu nào: chỉ cần cắm máy vào một cổng switch trống rồi bơm cho bảng MAC của nó đầy ứ những địa chỉ bịa ra. Switch hết chỗ ghi thì cư xử ra sao — và vì sao chuyện đó lại khiến kẻ ngồi ở cổng trống nhìn thấy thư của cả xóm?

**2 · Đoán thử (pretest):**
- **Đề:** Bảng MAC của switch bị nhồi đầy bằng hàng vạn địa chỉ giả. Switch xử sự thế nào với khung tiếp theo mà nó không tra ra cổng đích?
  - **Dạng:** trắc nghiệm · **Phát khung đó ra mọi cổng còn lại, như hồi chưa học được ai ngồi đâu** ✓ / Vứt bỏ khung đó và ghi một dòng cảnh báo vào nhật ký của thiết bị / Tự xóa sạch bảng MAC rồi dựng lại từ đầu trước khi chuyển tiếp khung
  - **Chủ đề gợi ý (tầng 1):** việc switch làm khi không biết đích ngồi cổng nào
  - **Vì sao:** Nó phát tràn ra mọi cổng — đúng hành vi mặc định của switch khi chưa học được đích, như bạn thấy từ Module 4. Kẻ tấn công nhồi bảng chính là để ép switch rơi lại vào trạng thái đó, vì lúc ấy mọi khung đều chạy qua chỗ hắn ngồi.

**3 · Khám phá (teach):**
- *[m17-mac-flooding]* Bảng MAC của switch có sức chứa hữu hạn. Kẻ tấn công cắm vào một cổng rồi gửi liên tục khung với địa chỉ nguồn bịa ra, mỗi khung một địa chỉ mới, cho tới khi bảng đầy. Từ lúc đó switch không còn chỗ ghi ai ngồi cổng nào, nên khung nào tra không ra đích cũng bị phát tràn ra mọi cổng — kể cả cổng của kẻ đang ngồi nghe. Không cần chọc thủng gì cả: hắn chỉ ép cái switch làm đúng hành vi mặc định của nó.
  - **Đào sâu hơn:** Vì sao chuyện này không ồn ào? Vì mạng vẫn chạy: thư vẫn tới đúng người nhận, chỉ là nó tới cả những người khác nữa. Người dùng không thấy gì bất thường, còn kẻ nghe lén thì chỉ cần ngồi im mà đọc. Dấu hiệu nhìn ra được nằm ở bảng MAC của switch: một cổng access lẽ ra chỉ có một hai địa chỉ mà bỗng đứng tên hàng loạt.
- *[m17-port-security]* Port security là chốt chặn ngay tại cổng access: khai rằng cổng này chỉ được phép có tối đa mấy địa chỉ MAC. Vượt số đó thì switch coi là vi phạm và xử theo cách đã khai — thường là ĐÁNH SẬP cổng, đưa nó về trạng thái tắt cho tới khi có người tới bật lại bằng tay. Nhờ vậy trò nhồi bảng MAC chết ngay ở cổng đầu tiên nó thử. Cái giá phải trả là công vận hành: đổi máy, thay dây, cắm nhầm ổ đều có thể làm cổng sập, và người trực phải biết đường dựng nó dậy.
  - **Đào sâu hơn:** Phòng lab của app mô phỏng HẬU QUẢ chứ không mô phỏng bộ đếm MAC: bạn sẽ gặp một cổng đã bị đánh sập và phải dựng lại, chứ không cắm được máy thứ hai để tự làm nó sập. Trên thiết bị thật, cổng ở trạng thái đó hiện là err-disabled và người trực phải shutdown rồi no shutdown mới sống lại; ở đây bảng show ip interface brief ghi administratively down, và một lệnh no shutdown là đủ. Điều đáng nhớ giống hệt nhau: cổng tắt vì bị bảo vệ, không phải vì hỏng.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Sáng nay có người cắm một switch mini vào ổ mạng phòng khách, port security trên SW-Van-phong đánh sập cổng đó. Thiết bị lạ đã được gỡ, giờ máy phòng khách vẫn chưa có mạng. Console đang cắm vào SW-Van-phong: tìm ra cổng nào đang chết bằng lệnh xem trạng thái các cổng, rồi dựng nó dậy.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-Giam-doc [192.168.1.10/24, gw 192.168.1.1] · PC-Phong-khach [192.168.1.66/24, gw 192.168.1.1] · SRV-Ke-toan [192.168.2.50/24, gw 192.168.2.1] · SW-Van-phong [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-May-chu [p1:VLAN 1, p2:VLAN 1] · R-Van-phong [g0:192.168.1.1/24, g1:192.168.2.1/24] — dây: PC-Giam-doc·eth0 — SW-Van-phong·p1 | PC-Phong-khach·eth0 — SW-Van-phong·p2 | SW-Van-phong·p3 — R-Van-phong·g0 | R-Van-phong·g1 — SW-May-chu·p1 | SW-May-chu·p2 — SRV-Ke-toan·eth0
    - **Console cắm ở:** SW-Van-phong
    - **Mục tiêu:**
      - phải xem "show ip interface brief" trên SW-Van-phong
      - cổng p2 của SW-Van-phong phải đang bật (đã no shutdown)
      - pc-khach PHẢI gọi được srv-ke-toan
    - **Lệnh mẫu trên SW-Van-phong:** `show ip interface brief` rồi `enable` rồi `configure terminal` rồi `interface p2` rồi `no shutdown` rồi `end`
  - **Chủ đề gợi ý (tầng 1):** bảng trạng thái các cổng và lệnh bật cổng
  - **Gợi ý (tầng 2):** Bảng show ip interface brief phân biệt hai kiểu chết: administratively down là mình tự tắt, còn down là mất tín hiệu đầu kia. Tìm dòng kiểu thứ nhất, rồi vào đúng cổng đó trong chế độ cấu hình.
  - **Lời giải (tầng 3):** Gõ show ip interface brief, đọc thấy cổng p2 ghi administratively down. Rồi enable, configure terminal, interface p2, no shutdown, end. Cổng sống lại và máy phòng khách gọi được máy chủ. Nhớ rằng dựng cổng dậy chỉ là nửa việc — nửa còn lại là tìm xem ai đã cắm thiết bị lạ vào đó.
- **Đề:** Trong bảng trạng thái cổng, chữ administratively down nói lên điều gì về nguyên nhân?
  - **Dạng:** gõ tay · **Chấp nhận:** bị tắt bằng lệnh | bi tat bang lenh | cổng bị tắt bằng lệnh | cong bi tat bang lenh | do người tắt | do nguoi tat | bị shutdown | bi shutdown | tắt chủ động | tat chu dong | tự tắt | tu tat
  - **Chủ đề gợi ý (tầng 1):** khác nhau giữa cổng bị tắt và cổng mất tín hiệu
  - **Gợi ý (tầng 2):** Nếu là dây lỏng thì cột đó chỉ ghi down trơn. Thêm chữ administratively nghĩa là có bàn tay ai đó, hoặc một cơ chế bảo vệ, đã ra lệnh.
  - **Lời giải (tầng 3):** Cổng đang bị tắt bằng lệnh — do người trực gõ shutdown, hoặc do một cơ chế như port security đánh sập. Khác hẳn dòng chỉ ghi down: đó là cổng đang bật nhưng không thấy tín hiệu ở đầu kia, tức là đi tìm sợi dây.

**5 · Nhớ lại (retrieval):**
- **Đề:** Đóng bài lại: port security giới hạn cái gì trên một cổng access?
  - **Dạng:** gõ tay · **Chấp nhận:** số địa chỉ mac | so dia chi mac | số lượng mac | so luong mac | số mac | so mac | số máy được cắm | so may duoc cam | số thiết bị | so thiet bi
  - **Chủ đề gợi ý (tầng 1):** thứ mà kẻ nhồi bảng tạo ra thật nhiều
  - **Gợi ý (tầng 2):** Trò tấn công là bơm thật nhiều địa chỉ giả. Vậy chốt chặn phải đếm cái gì?
  - **Lời giải (tầng 3):** Số địa chỉ MAC được phép xuất hiện trên cổng đó. Vượt ngưỡng thì switch coi là vi phạm và thường đánh sập cổng, phải có người bật lại bằng tay.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao nhồi đầy bảng MAC lại giúp kẻ tấn công nghe lén được cả xóm?
  - **Nhóm ý cần chạm:** [bảng mac, bang mac, đầy, day, hết chỗ, het cho, tràn bảng, tran bang] · [không tra ra, khong tra ra, không biết đích, khong biet dich, không học được, khong hoc duoc] · [phát tràn, phat tran, phát ra mọi cổng, phat ra moi cong, gửi ra tất cả, gui ra tat ca, flood] · [nghe lén, nghe len, đọc được, doc duoc, nhìn thấy, nhin thay, bắt được, bat duoc]
  - **Trả lời mẫu:** Vì bảng MAC có sức chứa hữu hạn. Khi nó đầy những địa chỉ giả, switch không còn ghi được ai ngồi cổng nào, nên mỗi khung tra không ra đích đều bị phát tràn ra mọi cổng. Kẻ ngồi ở cổng trống vì thế nhận được cả những khung không gửi cho hắn, mà mạng thì vẫn chạy bình thường nên không ai nghi ngờ gì.

**6 · Tổng kết:**
- Bảng MAC đầy thì switch phát tràn — nghe lén tầng 2 lợi dụng đúng hành vi mặc định ấy.
- Port security giới hạn số MAC trên một cổng access; vi phạm thì cổng bị đánh sập.
- administratively down là cổng bị tắt bằng lệnh, khác hẳn down vì mất tín hiệu đầu kia.
- *Úp mở bài sau:* Còn một kiểu mạo danh tinh vi hơn nhồi bảng: kẻ tấn công không giành cổng, hắn giành chính cái ĐỊA CHỈ của cổng ra. Bài cuối module là một ca bệnh chập chờn mà bạn từng gặp ở phòng khám, lần này đứng dưới ánh sáng khác.

### Bài: Vạch mặt kẻ nhận vơ địa chỉ cổng ra `m17-bai-5`

**1 · Khởi động (hook):** Ở Module 11 bạn từng gặp bệnh chập chờn vì hai máy giành một số nhà, và chữa nó bằng cách đổi địa chỉ cho kẻ tới sau. Nhưng nếu kẻ tới sau KHÔNG hề nhầm lẫn — nếu hắn cố tình nhận vơ đúng địa chỉ của cổng ra, để mọi gói tin của cả xóm phải đi qua tay hắn trước? Cùng một dấu hiệu trên màn hình, hai câu chuyện khác hẳn nhau.

**2 · Đoán thử (pretest):**
- **Đề:** "Từ hôm qua mạng ở tầng 3 lúc được lúc mất, chẳng theo quy luật nào cả. Mở trang trong công ty thì khi vào được khi báo lỗi." Bạn đang ngồi ở MAY-NHAN-VIEN. Mẹo cũ của phòng khám: bệnh chập chờn thì thử đi thử lại rồi so hai lần với nhau, và đừng quên cuốn sổ ARP trên chính máy mình.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-NHAN-VIEN [192.168.30.15/24, gw 192.168.30.1] · LAPTOP-LA [192.168.30.1/24, gw 192.168.30.1] · SRV-NOI-BO [10.30.0.9/24, gw 10.30.0.1] · SW-TANG-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-MAY-CHU [p1:VLAN 1, p2:VLAN 1] · R-CONG-RA [g0:192.168.30.1/24, g1:10.30.0.1/24] — dây: MAY-NHAN-VIEN·eth0 — SW-TANG-3·p1 | LAPTOP-LA·eth0 — SW-TANG-3·p2 | SW-TANG-3·p3 — R-CONG-RA·g0 | R-CONG-RA·g1 — SW-MAY-CHU·p1 | SW-MAY-CHU·p2 — SRV-NOI-BO·eth0
    - **Ngồi ở máy:** MAY-NHAN-VIEN
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** MAY-NHAN-VIEN ping 192.168.30.1 lúc được lúc không (nhiều máy giành một IP)
    - **Chẩn đoán (chọn 1):** **Một máy lạ trong xóm đang giữ đúng địa chỉ của cổng ra** ✓ · Cổng ra của router đã bị tắt bằng lệnh nên gói tin không qua được · Máy chủ nội bộ trả lời chậm nên trang trong công ty lúc mở được lúc không
    - **Sửa:** trực tiếp trên sơ đồ — mục tiêu:
      - c17-nv PHẢI gọi được c17-srv
      - phải hết sạch: duplicate-ip
    - **Được phép:** đặt địa chỉ
    - **Lời giải mẫu:** MAY-NHAN-VIEN [192.168.30.15/24, gw 192.168.30.1] · LAPTOP-LA [192.168.30.77/24, gw 192.168.30.1] · SRV-NOI-BO [10.30.0.9/24, gw 10.30.0.1] · SW-TANG-3 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-MAY-CHU [p1:VLAN 1, p2:VLAN 1] · R-CONG-RA [g0:192.168.30.1/24, g1:10.30.0.1/24] — dây: MAY-NHAN-VIEN·eth0 — SW-TANG-3·p1 | LAPTOP-LA·eth0 — SW-TANG-3·p2 | SW-TANG-3·p3 — R-CONG-RA·g0 | R-CONG-RA·g1 — SW-MAY-CHU·p1 | SW-MAY-CHU·p2 — SRV-NOI-BO·eth0
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ ARP và địa chỉ của cổng ra
  - **Vì sao:** Ping 192.168.30.1 hai lượt rồi mở arp -a: cùng một địa chỉ mà lần này gắn MAC …:11 của router, lần sau đã thành …:66 của LAPTOP-LA. Một cổng ra, hai kẻ nhận vơ, ai đáp sau thì thắng — nên mạng chập chờn theo vận may. Đây chính là hình dạng của một cú mạo danh ARP: kẻ đứng giữa nhận mình là cổng ra để cả xóm phải đi qua tay hắn. Chữa trước mắt: lấy lại địa chỉ .1 cho router, đẩy máy lạ sang một địa chỉ khác.

**3 · Khám phá (teach):**
- *[m17-arp-spoofing]* ARP không có cơ chế xác thực: ai đáp cũng được tin, và câu đáp tới sau ghi đè câu đáp tới trước. Kẻ mạo danh lợi dụng đúng chỗ đó — hắn liên tục nói mình là 192.168.30.1, cái cổng ra của cả xóm. Máy trong xóm ghi vào sổ ARP MAC của hắn, rồi ngoan ngoãn gửi mọi gói đi Internet qua hắn. Hắn đọc xong chuyển tiếp cho router thật, nên người dùng chẳng thấy gì lạ ngoài chuyện mạng thỉnh thoảng khựng. Đó là cùng một dấu hiệu với ca trùng IP ở Module 11, chỉ khác động cơ: một bên gõ nhầm, một bên cố ý.
  - **Đào sâu hơn:** Ba lớp chặn ngoài đời, từ rẻ tới đắt. Một, port security ở bài trước: giới hạn MAC trên cổng khiến kẻ tấn công khó thay hình đổi dạng. Hai, Dynamic ARP Inspection trên switch: nó soi từng lời đáp ARP và vứt bỏ lời nào không khớp cặp địa chỉ mà switch đã biết. Ba, cách thô mà chắc cho máy quan trọng: khai cứng địa chỉ cổng ra vào sổ ARP để không lời đáp nào ghi đè được. Riêng chuyện chia VLAN nhỏ ra cũng đã giúp: ARP không đi xuyên VLAN, nên kẻ mạo danh chỉ lừa được đúng cái xóm hắn đang cắm dây vào.
- *[m17-vlan-hopping]* VLAN hopping là trò nhảy rào sang xóm khác mà không cần đi qua router. Kiểu hay gặp nhất dựa vào NATIVE VLAN của Module 14: khung đi trong native VLAN không mang nhãn, nên kẻ tấn công dán sẵn hai lớp nhãn vào khung của mình. Switch đầu tiên bóc lớp ngoài (đúng native của nó) rồi đẩy khung qua trunk; switch thứ hai nhìn thấy lớp nhãn còn lại và tưởng khung ấy thuộc VLAN kia. Cách chặn gọn nhất cũng nằm ở đúng chỗ đó: đừng để native VLAN trùng với VLAN đang chở người dùng — đặt nó thành một VLAN không ai dùng, và khai cổng nối máy con là access một cách tường minh.
  - **Đào sâu hơn:** Vì sao trò này chỉ chạy được một chiều? Vì lớp nhãn thứ hai chỉ sống sót nhờ cú bóc nhãn ở switch đầu — còn đường về thì không ai dán hộ kẻ tấn công hai lớp nhãn cả. Nghĩa là hắn bắn gói sang xóm khác được nhưng không nhận được lời đáp. Nghe thì cụt, nhưng vẫn đủ để phá: một dòng lệnh bắn sang thiết bị bên kia đôi khi là tất cả những gì hắn cần. Phòng lab của app không mô phỏng trò dán hai lớp nhãn — đây là phần đọc hiểu, còn thứ bạn cấu hình được là cái chốt chặn: native VLAN riêng và cổng access khai rõ.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Máy của bạn ping cổng ra rất tốt, nhưng sổ ARP cho thấy địa chỉ cổng ra lúc gắn MAC này lúc gắn MAC kia. Kết luận nào đứng vững nhất?
  - **Dạng:** trắc nghiệm · **Có hai thiết bị cùng nhận là chủ địa chỉ đó, dù do nhầm hay do cố ý** ✓ / Router đang quá tải nên nó phải đổi địa chỉ MAC của cổng ra liên tục / Sổ ARP của máy bạn đã hỏng và cần được xóa sạch rồi dựng lại từ đầu
  - **Chủ đề gợi ý (tầng 1):** một địa chỉ IP mà hai MAC thay nhau trả lời
  - **Gợi ý (tầng 2):** MAC là số khung đóng chết vào máy, không đổi theo tải. Vậy hai MAC khác nhau nghĩa là mấy cái máy?
  - **Lời giải (tầng 3):** Có hai thiết bị cùng nhận là chủ của địa chỉ đó. MAC không đổi theo tải, và sổ ARP chỉ ghi lại điều nó nghe được. Còn chuyện do gõ nhầm hay do mạo danh thì phải đi tìm tiếp — nhưng bằng chứng một địa chỉ hai chủ thì đã chắc rồi.
- **Đề:** Chốt chặn gọn nhất cho trò VLAN hopping kiểu hai lớp nhãn là đổi thứ gì trên đường trunk?
  - **Dạng:** gõ tay · **Chấp nhận:** native vlan | vlan native | đổi native vlan | doi native vlan | native vlan riêng | native vlan rieng | native vlan không dùng | native vlan khong dung
  - **Chủ đề gợi ý (tầng 1):** cái VLAN đi không nhãn trên trunk
  - **Gợi ý (tầng 2):** Trò này sống nhờ cú bóc nhãn ở switch đầu tiên. Cú bóc ấy xảy ra với VLAN nào?
  - **Lời giải (tầng 3):** Native VLAN. Đặt nó thành một VLAN không ai dùng để khung của người dùng luôn mang nhãn, thế là cú bóc nhãn đầu tiên chẳng còn giúp gì cho kẻ tấn công. Kèm theo: khai tường minh cổng nối máy con là access.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: kẻ mạo danh ARP thường nhận vơ địa chỉ của thiết bị nào trong xóm, và vì sao chọn đúng nó?
  - **Dạng:** gõ tay · **Chấp nhận:** cổng ra | cong ra | router | gateway | cổng mặc định | cong mac dinh | địa chỉ cổng ra | dia chi cong ra | default gateway
  - **Chủ đề gợi ý (tầng 1):** thiết bị mà cả xóm phải đi qua để ra ngoài
  - **Gợi ý (tầng 2):** Muốn đọc thư của cả xóm thì nên đứng ở chỗ nào trên đường đi của họ?
  - **Lời giải (tầng 3):** Địa chỉ cổng ra, tức router mặc định. Vì mọi gói tin đi khỏi xóm đều phải gửi qua đó, nên chiếm được cái tên ấy là đứng giữa được toàn bộ lưu lượng đi ra mà chẳng cần chạm tới máy nào.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao cùng một dấu hiệu "một IP hai MAC" mà lần này lại nguy hiểm hơn ca gõ nhầm ở Module 11?
  - **Nhóm ý cần chạm:** [cổng ra, cong ra, gateway, router, cổng mặc định, cong mac dinh] · [cố ý, co y, mạo danh, mao danh, tấn công, tan cong, kẻ lạ, ke la] · [đứng giữa, dung giua, đi qua tay, di qua tay, nghe lén, nghe len, đọc trộm, doc trom] · [cả xóm, ca xom, mọi máy, moi may, toàn bộ, toan bo, lưu lượng, luu luong]
  - **Trả lời mẫu:** Vì địa chỉ bị giành lần này là địa chỉ cổng ra, thứ mà cả xóm phải dùng để đi ra ngoài. Ca ở Module 11 chỉ là hai máy in gõ trùng số nên hỏng đúng một dịch vụ; còn ở đây kẻ lạ cố ý nhận vơ để mọi gói tin của mọi máy đều đi qua tay hắn trước, đọc xong mới chuyển tiếp. Người dùng chỉ thấy mạng hơi chập chờn, trong khi dữ liệu của cả tầng đã đi qua một chỗ không ai kiểm soát.

**6 · Tổng kết:**
- ARP tin bất kỳ ai đáp và câu sau đè câu trước — nền móng của trò mạo danh cổng ra.
- Một IP hai MAC trong sổ ARP là bằng chứng thép; động cơ nhầm hay cố ý thì phải đi tìm tiếp.
- VLAN hopping sống nhờ native VLAN trùng VLAN người dùng — đặt native riêng là chặn được.
- *Úp mở bài sau:* Vậy là bạn đã có đủ đồ nghề của người dựng hạ tầng: cắt dải, nối trunk, canh vòng lặp, để router tự hỏi đường và viết luật chặn đúng người. Phần sau của khóa bước sang phía dịch vụ — nơi mạng đã chạy rồi mà người dùng vẫn kêu, vì thứ hỏng nằm ở DHCP, DNS và những cuốn sổ của hệ thống.

### Khái niệm & flashcard (12)

- **ACL (access control list)** `m17-acl` — Danh sách luật gắn lên cổng router; mỗi gói đi qua bị đem so với từng dòng để cho đi hay chặn lại
  - Ẩn dụ: Như người soát vé đứng ở một cánh cửa với tờ nội quy trong tay: ai qua cửa cũng bị đối chiếu, và tờ nội quy chỉ có tiếng nói ở đúng cánh cửa nó được dán lên.
  - Thẻ ôn: *Một ACL gồm những gì, và viết xong đã lọc được gói tin chưa?* → Một danh sách là dãy dòng luật có thứ tự, mỗi dòng gồm cho phép hay cấm, giao thức, nguồn và đích. Viết xong CHƯA lọc gì cả: phải gắn nó lên một cổng cụ thể theo một chiều cụ thể bằng ip access-group thì mới có hiệu lực.
- **Thứ tự dòng luật** `m17-thu-tu-dong` — Router đọc từ trên xuống và dừng ở dòng khớp đầu tiên; các dòng sau không được hỏi tới
  - Ẩn dụ: Như đọc nội quy từ trên xuống rồi làm theo điều đầu tiên đúng với trường hợp của mình — đọc tới đó là gấp tờ giấy lại.
  - Thẻ ôn: *Vì sao luật hẹp phải viết trước luật rộng trong một ACL?* → Vì router dừng ở dòng khớp đầu tiên. Dòng rộng đặt trên sẽ ăn hết gói tin và dòng hẹp phía dưới không bao giờ được hỏi tới. ACL đánh số lại chỉ thêm được vào cuối danh sách, nên phải nghĩ thứ tự trước khi gõ.
- **Dòng cấm vô hình** `m17-implicit-deny` — Cuối mọi danh sách có một dòng không in ra: cấm tất cả những gì chưa được cho phép
  - Ẩn dụ: Như câu cuối của mọi bản nội quy mà không ai buồn viết ra: cái gì không ghi là được phép thì mặc nhiên là không được.
  - Thẻ ôn: *Áp một danh sách lọc lên cổng thì mặc định của cổng đó đổi thế nào?* → Từ cho tất cả đi thành cấm tất cả, vì cuối danh sách luôn có dòng vô hình cấm mọi thứ chưa được cho phép tường minh. Muốn giữ đường cho phần còn lại thì phải viết thêm một dòng permit, thường là permit ip any any ở cuối.
- **ACL chuẩn** `m17-acl-chuan` — Danh sách số 1 tới 99, chỉ so được địa chỉ nguồn nên cấm một nguồn là cấm nó đi mọi nơi
  - Ẩn dụ: Như người gác chỉ nhìn mặt khách chứ không hỏi khách định vào phòng nào: đã chặn thì chặn khỏi cả tòa nhà.
  - Thẻ ôn: *ACL chuẩn mang dải số nào, so được vế nào, và vì thế phải đặt ở đâu?* → Số 1 tới 99, chỉ so được địa chỉ nguồn. Vì mù vế đích nên đặt nó gần nguồn sẽ chặn kẻ đó đi mọi nơi; phải đặt gần ĐÍCH cần bảo vệ thì việc chặn mới đúng phạm vi mong muốn.
- **ACL mở rộng** `m17-acl-mo-rong` — Danh sách số 100 tới 199, so được giao thức, nguồn, đích và port dịch vụ với tcp hay udp
  - Ẩn dụ: Như người gác hỏi đủ ba câu: anh là ai, anh định vào phòng nào, và anh tới có việc gì.
  - Thẻ ôn: *ACL mở rộng mang dải số nào, nhìn được những gì, và đặt ở đâu?* → Số 100 tới 199; nhìn được giao thức, nguồn, đích và cả port dịch vụ với tcp hay udp. Vì biết đủ để chặn đúng nên đặt gần NGUỒN: gói chết sớm, không tốn đường truyền của cả chặng sau.
- **Chiều in và out** `m17-chieu-in-out` — Chiều tính theo mắt router: in là gói vừa vào cổng, out là gói sắp rời cổng
  - Ẩn dụ: Như bảo vệ đứng ở cửa: soi lúc khách bước vào là một việc, soi lúc khách bước ra lại là việc khác hẳn.
  - Thẻ ôn: *Chiều in và out của một ACL được tính theo cái gì, và chặn ở chiều nào thì rẻ hơn?* → Tính theo con mắt của router: in là gói vừa đi vào cổng, trước khi tra bảng định tuyến; out là gói đã chọn xong đường và sắp rời cổng. Chặn ở chiều in rẻ hơn vì gói bị loại trước cả bước tra bảng.
- **Đặt ACL ở đâu** `m17-dat-o-dau` — Mở rộng đặt gần nguồn, chuẩn đặt gần đích — chặn ở chỗ gần nhất mà luật vẫn còn đủ thông tin để chặn đúng
  - Ẩn dụ: Như chặn người ngay ở đầu ngõ nếu bạn biết họ định đi đâu; còn nếu chỉ biết mặt họ thôi thì phải đứng chặn ngay trước cửa phòng cần giữ.
  - Thẻ ôn: *Quy tắc đặt ACL của nghề nói gì, và lý do đằng sau là gì?* → ACL mở rộng đặt gần nguồn, ACL chuẩn đặt gần đích. Lý do chung: chặn ở chỗ gần nhất mà luật còn đủ thông tin để chặn ĐÚNG. Mở rộng biết cả đích nên chặn sớm vẫn đúng; chuẩn mù đích nên chặn sớm là chặn nhầm cả những nơi lẽ ra được đi.
- **ACL so với tường lửa stateful** `m17-acl-vs-stateful` — ACL xét từng gói rời rạc và không nhớ gì; tường lửa stateful ghi sổ cuộc gọi nên chiều về tự được vào
  - Ẩn dụ: Như người soát vé không nhớ mặt ai, so với người gác cổng có cuốn sổ ghi khách vừa vào và tự mở cửa cho họ đi ra.
  - Thẻ ôn: *Khác nhau căn bản giữa ACL đánh số và tường lửa stateful của Module 7 là gì?* → Tường lửa stateful nhớ cuộc gọi đã mở nên lời đáp về được vào mà không cần luật riêng. ACL đánh số không có trí nhớ: nó xét từng gói một cách rời rạc, nên chiều về phải được cho phép tường minh, nếu không cuộc trò chuyện đứt dù chiều đi vẫn thông.
- **Nhồi bảng MAC** `m17-mac-flooding` — Bơm hàng loạt MAC giả cho bảng của switch đầy, ép nó phát tràn mọi khung để ngồi một chỗ mà nghe
  - Ẩn dụ: Như nhét đầy hòm thư của người gác cổng bằng tên giả: hết chỗ nhớ ai ở phòng nào, ông ấy đành đọc to mọi lá thư giữa sảnh.
  - Thẻ ôn: *Nhồi bảng MAC khiến switch làm gì, và vì sao kẻ tấn công có lợi?* → Bảng đầy thì switch không tra ra đích nên phát tràn khung ra mọi cổng, đúng hành vi mặc định của nó. Kẻ ngồi ở một cổng bất kỳ vì thế nhận được cả khung không gửi cho mình, trong khi mạng vẫn chạy nên không ai nghi ngờ.
- **Port security** `m17-port-security` — Giới hạn số địa chỉ MAC trên một cổng access; vi phạm thì cổng bị đánh sập và phải bật lại bằng tay
  - Ẩn dụ: Như quy định mỗi ổ cắm trong phòng chỉ đăng ký được một chiếc máy: cắm thêm cái thứ hai là ổ tự ngắt điện cho tới khi có người tới mở lại.
  - Thẻ ôn: *Port security giới hạn cái gì, và hậu quả khi vi phạm hiện ra thế nào?* → Giới hạn số địa chỉ MAC được xuất hiện trên một cổng access. Vượt ngưỡng thì switch đánh sập cổng: bảng trạng thái ghi cổng bị tắt bằng lệnh (administratively down, thiết bị thật ghi err-disabled) và phải có người gõ no shutdown mới sống lại.
- **ARP spoofing** `m17-arp-spoofing` — Kẻ lạ nhận vơ địa chỉ IP của cổng ra để cả xóm gửi gói qua tay hắn trước
  - Ẩn dụ: Như một người lạ đứng ở đầu ngõ tự nhận mình là bác bưu tá: cả xóm đưa thư cho hắn, hắn đọc xong mới chuyển tiếp cho người thật.
  - Thẻ ôn: *ARP spoofing lợi dụng điểm yếu nào, và dấu hiệu nhìn ra được là gì?* → Lợi dụng chuyện ARP không xác thực: ai đáp cũng được tin và câu đáp sau đè câu trước. Dấu hiệu: trong sổ arp -a, địa chỉ cổng ra lúc gắn MAC này lúc gắn MAC kia, mạng chập chờn. Chặn bằng port security, Dynamic ARP Inspection, hoặc khai cứng địa chỉ cổng ra cho máy quan trọng.
- **VLAN hopping** `m17-vlan-hopping` — Nhảy sang VLAN khác bằng cách dán hai lớp nhãn, lợi dụng cú bóc nhãn của native VLAN
  - Ẩn dụ: Như dán hai lớp phong bì lồng nhau: người gác bóc lớp ngoài rồi chuyển tiếp, và lớp trong đưa lá thư sang một xóm mà người gửi không có quyền vào.
  - Thẻ ôn: *Trò VLAN hopping hai lớp nhãn dựa vào đâu, và chặn bằng cách nào?* → Dựa vào native VLAN: khung native đi không nhãn nên switch đầu bóc lớp nhãn ngoài, switch sau nhìn lớp còn lại và tưởng khung thuộc VLAN khác. Chặn bằng cách đặt native VLAN thành một VLAN không ai dùng và khai tường minh cổng nối máy con là access.

### Bài kiểm tra module (pool 14 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Bạn áp lên cổng một danh sách chỉ có đúng một dòng cấm máy 192.168.1.66. Chuyện gì xảy ra với các máy khác trong văn phòng?
  - **Dạng:** trắc nghiệm · **Chúng cũng bị chặn, vì dòng vô hình cuối danh sách cấm mọi thứ chưa được cho phép** ✓ / Chúng vẫn đi lại bình thường, vì danh sách chỉ nhắc đích danh một địa chỉ duy nhất / Chúng bị chậm lại đôi chút, vì router phải so từng gói với dòng luật vừa được thêm
  - **Chủ đề gợi ý (tầng 1):** dòng không được in ra ở cuối danh sách
  - **Vì sao:** Chúng cũng tắc. Áp một danh sách lên cổng là đổi mặc định của cổng từ cho tất cả thành cấm tất cả — gói không khớp dòng nào sẽ rơi vào dòng vô hình ở cuối. Muốn giữ đường cho phần còn lại thì phải viết thêm một dòng permit.
- **Đề:** Router đọc danh sách lọc từ trên xuống và dừng lại ở dòng nào?
  - **Dạng:** gõ tay · **Chấp nhận:** dòng khớp đầu tiên | dong khop dau tien | dòng đầu tiên khớp | dong dau tien khop | dòng khớp đầu | dong khop dau | dòng đầu tiên trùng khớp | dong dau tien trung khop | first match
  - **Chủ đề gợi ý (tầng 1):** quy tắc dừng khi so luật
  - **Vì sao:** Dòng khớp đầu tiên. Quyết định xong là router gấp danh sách lại, các dòng phía dưới không bao giờ được hỏi tới — nên thứ tự chính là luật, và luật hẹp phải viết trước luật rộng.
- **Đề:** Sếp muốn cấm phòng khách vào máy chủ kế toán nhưng vẫn cho họ lướt web. Bạn phải dùng loại danh sách nào, và vì sao?
  - **Dạng:** trắc nghiệm · **Mở rộng, vì yêu cầu phân biệt theo đích mà danh sách chuẩn không nhìn thấy đích** ✓ / Chuẩn, vì yêu cầu chỉ nhắc tới một nguồn duy nhất là dải máy của phòng khách / Loại nào cũng được, miễn là đặt danh sách ấy đúng chiều trên cổng phía văn phòng
  - **Chủ đề gợi ý (tầng 1):** vế địa chỉ mà danh sách chuẩn không thấy
  - **Vì sao:** Phải là mở rộng (100 tới 199). Yêu cầu này phân biệt theo NƠI ĐẾN, mà danh sách chuẩn chỉ soi được người gửi — dùng chuẩn thì cấm phòng khách là cấm họ đi mọi nơi, mất luôn đường ra web.
- **Đề:** Dải số hiệu của danh sách lọc MỞ RỘNG là bao nhiêu tới bao nhiêu?
  - **Dạng:** gõ tay · **Chấp nhận:** 100-199 | 100 199 | 100 tới 199 | 100 toi 199 | từ 100 đến 199 | tu 100 den 199 | 100 den 199 | 100 đến 199
  - **Chủ đề gợi ý (tầng 1):** hai dải số của hai họ danh sách
  - **Vì sao:** Từ 100 tới 199. Dải 1 tới 99 dành cho danh sách chuẩn — loại chỉ soi được nguồn.
- **Đề:** Vì sao quy tắc nghề bảo đặt ACL mở rộng gần nguồn, còn ACL chuẩn thì gần đích?
  - **Dạng:** trắc nghiệm · **Vì chuẩn mù vế đích nên chặn sớm là chặn nhầm cả những đích lẽ ra được đi** ✓ / Vì router gần đích có nhiều bộ nhớ hơn nên nó chứa được danh sách dài hơn / Vì danh sách chuẩn chỉ chạy được ở chiều out, còn mở rộng chỉ chạy ở chiều in
  - **Chủ đề gợi ý (tầng 1):** chặn ở chỗ gần nhất mà luật còn chặn đúng
  - **Vì sao:** Vì chuẩn chỉ biết người gửi. Đặt nó gần nguồn thì nó cấm kẻ đó đi tất cả mọi nơi, nên phải mang xuống sát đích cần bảo vệ. Mở rộng biết cả đích nên chặn ngay gần nguồn vẫn đúng người đúng việc, lại đỡ tốn đường truyền.
- **Đề:** Trên đường đi chỉ có ACL đánh số canh gác. Bạn cho phép chiều đi nhưng quên chiều về. Kết quả?
  - **Dạng:** trắc nghiệm · **Cuộc trò chuyện đứt, vì ACL không nhớ cuộc gọi nào vừa mở để tự cho lời đáp vào** ✓ / Vẫn chạy bình thường, vì lời đáp của một cuộc gọi hợp lệ luôn được miễn xét luật / Vẫn chạy nhưng chậm, vì mỗi lời đáp phải chờ router hỏi lại bên gửi một lượt
  - **Chủ đề gợi ý (tầng 1):** thứ tường lửa stateful có mà ACL không có
  - **Vì sao:** Đứt. Tường lửa stateful của Module 7 ghi sổ cuộc gọi nên lời đáp tự được vào; ACL đánh số xét từng gói rời rạc, không có trí nhớ, nên chiều về phải được cho phép tường minh.
- **Đề:** Trong lệnh gắn danh sách lên cổng, chiều in nghĩa là soi gói tin ở thời điểm nào?
  - **Dạng:** gõ tay · **Chấp nhận:** khi gói vừa vào cổng | khi goi vua vao cong | lúc gói đi vào cổng | luc goi di vao cong | gói vừa đi vào | goi vua di vao | trước khi tra bảng định tuyến | truoc khi tra bang dinh tuyen | gói đi vào router | goi di vao router
  - **Chủ đề gợi ý (tầng 1):** chiều tính theo con mắt của router
  - **Vì sao:** Lúc gói vừa đi VÀO cổng đó, trước cả bước tra bảng định tuyến. Chiều out thì ngược lại: gói đã chọn xong đường và sắp rời cổng. Cùng một luồng gói sẽ là in ở cổng này nhưng out ở cổng kia.
- **Đề:** Port security trên một cổng access thật ra đang đếm và giới hạn cái gì?
  - **Dạng:** trắc nghiệm · **Số địa chỉ MAC được phép xuất hiện trên cổng đó** ✓ / Số gói tin đi qua cổng đó trong mỗi giây đồng hồ / Số VLAN mà cổng đó được phép chở qua một lúc
  - **Chủ đề gợi ý (tầng 1):** thứ mà trò nhồi bảng tạo ra thật nhiều
  - **Vì sao:** Số địa chỉ MAC. Trò nhồi bảng MAC sống nhờ việc bịa ra thật nhiều địa chỉ, nên chốt chặn phải đếm đúng thứ đó. Vượt ngưỡng thì cổng bị đánh sập và cần người bật lại bằng tay.
- **Đề:** Bảng trạng thái cổng ghi administratively down. Nguyên nhân thuộc loại nào?
  - **Dạng:** gõ tay · **Chấp nhận:** bị tắt bằng lệnh | bi tat bang lenh | cổng bị tắt bằng lệnh | cong bi tat bang lenh | do người tắt | do nguoi tat | bị shutdown | bi shutdown | tắt chủ động | tat chu dong
  - **Chủ đề gợi ý (tầng 1):** khác nhau giữa cổng bị tắt và cổng mất tín hiệu
  - **Vì sao:** Cổng đang bị tắt bằng lệnh — người trực gõ shutdown, hoặc một cơ chế như port security đánh sập nó. Dòng chỉ ghi down trơn thì lại là chuyện khác: cổng vẫn bật nhưng không thấy tín hiệu đầu kia, tức là đi tìm sợi dây.
- **Đề:** Sổ arp -a trên máy bạn cho thấy địa chỉ cổng ra lúc gắn MAC này lúc gắn MAC kia. Điều gì chắc chắn đúng?
  - **Dạng:** trắc nghiệm · **Có hai thiết bị cùng nhận là chủ của địa chỉ đó trong xóm** ✓ / Router đang đổi địa chỉ MAC của cổng ra theo từng phiên làm việc / Máy bạn đã mất đường tới cổng ra và đang hỏi lại địa chỉ liên tục
  - **Chủ đề gợi ý (tầng 1):** một địa chỉ IP mà hai MAC thay nhau trả lời
  - **Vì sao:** Có hai thiết bị cùng nhận là chủ địa chỉ đó — MAC đóng chết vào phần cứng nên không đổi theo phiên. Còn do gõ nhầm hay do mạo danh ARP thì phải đi tìm tiếp, nhưng chuyện một địa chỉ hai chủ thì đã chắc.
- **Đề:** Cách chặn gọn nhất cho trò VLAN hopping kiểu dán hai lớp nhãn là gì?
  - **Dạng:** trắc nghiệm · **Đặt native VLAN của trunk thành một VLAN không ai dùng** ✓ / Bật lại STP trên toàn bộ các switch đang nối vòng với nhau / Gắn một danh sách lọc mở rộng lên cổng trunk theo chiều in
  - **Chủ đề gợi ý (tầng 1):** VLAN đi không nhãn trên trunk
  - **Vì sao:** Đổi native VLAN sang một VLAN không ai dùng. Trò này sống nhờ cú bóc nhãn của native VLAN ở switch đầu tiên; native không chở người dùng thì khung của họ luôn mang nhãn và cú bóc ấy chẳng còn giúp gì cho kẻ tấn công. STP canh vòng lặp, còn ACL là chuyện tầng 3 — cả hai không đụng tới trò này.
- **Đề:** Router R-Van-phong đã có sẵn danh sách 101 (dòng 10 cấm 192.168.1.66 ping tới 192.168.2.50, dòng 20 cho phép phần còn lại) nhưng chưa gắn vào cổng nào. Hãy gắn nó vào đúng chỗ để máy phòng khách tắc đường tới máy chủ kế toán, còn máy giám đốc thì vẫn gọi được.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-Giam-doc [192.168.1.10/24, gw 192.168.1.1] · PC-Phong-khach [192.168.1.66/24, gw 192.168.1.1] · SRV-Ke-toan [192.168.2.50/24, gw 192.168.2.1] · SW-Van-phong [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-May-chu [p1:VLAN 1, p2:VLAN 1] · R-Van-phong [g0:192.168.1.1/24, g1:192.168.2.1/24] — dây: PC-Giam-doc·eth0 — SW-Van-phong·p1 | PC-Phong-khach·eth0 — SW-Van-phong·p2 | SW-Van-phong·p3 — R-Van-phong·g0 | R-Van-phong·g1 — SW-May-chu·p1 | SW-May-chu·p2 — SRV-Ke-toan·eth0
    - **Console cắm ở:** R-Van-phong
    - **Mục tiêu:**
      - pc-khach phải KHÔNG gọi được srv-ke-toan
      - pc-sep PHẢI gọi được srv-ke-toan
    - **Lệnh mẫu trên R-Van-phong:** `enable` rồi `configure terminal` rồi `interface g0` rồi `ip access-group 101 in` rồi `end`
  - **Chủ đề gợi ý (tầng 1):** cổng phía văn phòng và chiều gói đi vào
  - **Vì sao:** Danh sách mở rộng thì đặt gần nguồn: vào interface g0 rồi gõ ip access-group 101 in. Gói của máy phòng khách bị loại ngay tại cửa vào, trước cả bước tra bảng định tuyến, còn mọi máy khác gặp dòng 20 và đi tiếp bình thường.
- **Đề:** Trên R-Van-phong, danh sách 101 chỉ có đúng một dòng cấm máy phòng khách và đang gắn ở cổng g0 chiều in — nhưng cả văn phòng đều mất đường tới máy chủ kế toán. Hãy chữa sao cho máy giám đốc gọi lại được, máy phòng khách vẫn phải tắc, và tự tra bảng luật để làm chứng.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-Giam-doc [192.168.1.10/24, gw 192.168.1.1] · PC-Phong-khach [192.168.1.66/24, gw 192.168.1.1] · SRV-Ke-toan [192.168.2.50/24, gw 192.168.2.1] · SW-Van-phong [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-May-chu [p1:VLAN 1, p2:VLAN 1] · R-Van-phong [g0:192.168.1.1/24, g1:192.168.2.1/24] — dây: PC-Giam-doc·eth0 — SW-Van-phong·p1 | PC-Phong-khach·eth0 — SW-Van-phong·p2 | SW-Van-phong·p3 — R-Van-phong·g0 | R-Van-phong·g1 — SW-May-chu·p1 | SW-May-chu·p2 — SRV-Ke-toan·eth0
    - **Console cắm ở:** R-Van-phong
    - **Mục tiêu:**
      - pc-sep PHẢI gọi được srv-ke-toan
      - pc-khach phải KHÔNG gọi được srv-ke-toan
      - phải xem "show access-lists" trên R-Van-phong
    - **Lệnh mẫu trên R-Van-phong:** `enable` rồi `configure terminal` rồi `access-list 101 permit ip any any` rồi `end` rồi `show access-lists`
  - **Chủ đề gợi ý (tầng 1):** dòng dành cho phần còn lại
  - **Vì sao:** Thêm access-list 101 permit ip any any. Nó rơi xuống thành dòng 20, đứng SAU dòng cấm máy khách, nên máy khách vẫn chết ở dòng 10 còn mọi máy khác gặp dòng 20 và đi được. Đây chính là thuốc chữa cho dòng cấm vô hình.
- **Đề:** "Phòng kinh doanh kêu mạng chập chờn từ sáng, mở hệ thống nội bộ lúc được lúc không." Bạn ngồi ở MAY-KINH-DOANH. Khám đi: bệnh chập chờn thì thử vài lượt rồi so với nhau, và mở cuốn sổ ARP ra xem địa chỉ cổng ra đang thuộc về ai.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-KINH-DOANH [192.168.40.20/24, gw 192.168.40.1] · MAY-KHONG-RO [192.168.40.1/24, gw 192.168.40.1] · SRV-NOI-BO [10.40.0.9/24, gw 10.40.0.1] · SW-TANG-4 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-MAY-CHU-4 [p1:VLAN 1, p2:VLAN 1] · R-CONG-RA-4 [g0:192.168.40.1/24, g1:10.40.0.1/24] — dây: MAY-KINH-DOANH·eth0 — SW-TANG-4·p1 | MAY-KHONG-RO·eth0 — SW-TANG-4·p2 | SW-TANG-4·p3 — R-CONG-RA-4·g0 | R-CONG-RA-4·g1 — SW-MAY-CHU-4·p1 | SW-MAY-CHU-4·p2 — SRV-NOI-BO·eth0
    - **Ngồi ở máy:** MAY-KINH-DOANH
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** MAY-KINH-DOANH ping 192.168.40.1 lúc được lúc không (nhiều máy giành một IP)
    - **Chẩn đoán (chọn 1):** **Một máy lạ trong xóm đang giữ đúng địa chỉ của cổng ra** ✓ · Danh sách lọc trên router chặn nhầm dải máy của phòng kinh doanh · Cổng nối switch với router đang bị tắt bằng lệnh nên gói không qua
    - **Sửa:** trực tiếp trên sơ đồ — mục tiêu:
      - c17b-kd PHẢI gọi được c17b-srv
      - phải hết sạch: duplicate-ip
    - **Được phép:** đặt địa chỉ
    - **Lời giải mẫu:** MAY-KINH-DOANH [192.168.40.20/24, gw 192.168.40.1] · MAY-KHONG-RO [192.168.40.88/24, gw 192.168.40.1] · SRV-NOI-BO [10.40.0.9/24, gw 10.40.0.1] · SW-TANG-4 [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · SW-MAY-CHU-4 [p1:VLAN 1, p2:VLAN 1] · R-CONG-RA-4 [g0:192.168.40.1/24, g1:10.40.0.1/24] — dây: MAY-KINH-DOANH·eth0 — SW-TANG-4·p1 | MAY-KHONG-RO·eth0 — SW-TANG-4·p2 | SW-TANG-4·p3 — R-CONG-RA-4·g0 | R-CONG-RA-4·g1 — SW-MAY-CHU-4·p1 | SW-MAY-CHU-4·p2 — SRV-NOI-BO·eth0
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ ARP và địa chỉ cổng ra
  - **Vì sao:** Ping 192.168.40.1 vài lượt rồi mở arp -a: địa chỉ cổng ra lúc gắn MAC …:11 của router, lúc gắn …:66 của MAY-KHONG-RO. Một cổng ra, hai kẻ nhận vơ — đúng hình dạng của cú mạo danh ARP. Chữa trước mắt là trả lại địa chỉ .1 cho router và đẩy máy lạ sang địa chỉ khác; chữa lâu dài là port security và Dynamic ARP Inspection ở cổng đó.

## DHCP và DNS doanh nghiệp — Dịch vụ không được chết `module-18`

Phần E · 5 chặng · 5 bài · 10 khái niệm

**Chặng:** Chuyển lời qua ranh giới xóm (m18-bai-1) → Sáng thứ hai câm lặng (m18-bai-2) → Hai người làm mối (m18-bai-3) → Một cái tên, hai câu trả lời (m18-bai-4) → Hỏi hộ và trí nhớ có hạn (m18-bai-5)

### Bài: Đưa lời hỏi cưới vượt ranh giới xóm `m18-bai-1`

**1 · Khởi động (hook):** Công ty có mười tầng, mỗi tầng một xóm mạng riêng, nhưng phòng máy chủ chỉ nuôi ĐÚNG MỘT máy DHCP. Mà bạn còn nhớ từ bài hỏi cưới: lời xin địa chỉ là một tiếng hét quảng bá, và tiếng hét thì không bao giờ lọt qua router. Vậy máy mới ở tầng chín cắm dây vào, ai nghe được nó — và bằng cách nào lời của nó tới được phòng máy chủ?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: gói DISCOVER mà máy mới hét lên để xin địa chỉ có tự đi qua router sang xóm khác được không?
  - **Dạng:** trắc nghiệm · **Không — nó là quảng bá, mà router thì chặn mọi tiếng hét quảng bá** ✓ / Được — router chuyển mọi gói tin, quảng bá hay không cũng vậy / Được, nhưng chỉ khi hai xóm nằm chung một chiếc switch lớn
  - **Chủ đề gợi ý (tầng 1):** ranh giới của một tiếng hét quảng bá
  - **Vì sao:** Không qua được. DISCOVER gửi tới địa chỉ quảng bá, và ranh giới của quảng bá chính là router (bài học miền quảng bá từ hồi VLAN). Đó là lý do tồn tại của cả bài hôm nay: phải có ai đó trong xóm chuyển lời hộ.

**3 · Khám phá (teach):**
- *[m18-ranh-gioi-dora]* Cuộc hỏi cưới DORA của Module 6 có một chi tiết hồi đó chưa thành vấn đề: hai nhịp đầu đi bằng QUẢNG BÁ, vì máy mới chưa có địa chỉ nên chỉ biết hét lên cho cả xóm nghe. Trong mạng nhà một xóm thì thế là đủ. Nhưng doanh nghiệp chia hàng chục xóm, mà quảng bá chết ở ranh giới router — nghĩa là máy DHCP đặt ở xóm máy chủ sẽ vĩnh viễn không nghe thấy tiếng hét từ tầng chín. Nếu không có gì thêm, mỗi xóm phải tự nuôi một máy DHCP riêng — mười tầng là mười máy phải trông nom.
  - **Đào sâu hơn:** Vì sao không cho quảng bá qua router luôn cho tiện? Vì đó chính là thứ đã làm nên bão quảng bá của Module 15: quảng bá lan tới đâu, mọi máy ở đó phải dừng tay xử lý tới đó. Ranh giới router là cái phanh giữ cho một tiếng hét chỉ làm phiền một xóm — bỏ cái phanh đó đi để tiện cho DHCP là chữa một chỗ ngứa bằng cách tháo cả hàng rào.
- *[m18-relay]* Lời giải của nghề là đặt trong mỗi xóm một NGƯỜI CHUYỂN LỜI: DHCP relay (trên thiết bị thật là lệnh ip helper-address trên cổng router). Relay đứng trong xóm nên nghe được tiếng hét. Nghe xong, nó không hét tiếp — nó gói lời xin vào một lá thư gửi ĐÍCH DANH tới máy DHCP ở xóm máy chủ, và thư đích danh thì qua router bình thường. Quan trọng nhất: trước khi gửi, relay ghi vào ô giaddr địa chỉ của chính xóm mình. Nhờ ô đó mà máy chủ ở xa biết tiếng hét này phát từ xóm nào.
  - **Đào sâu hơn:** Trên router thật, relay thường chính là cái cổng router của xóm: một dòng ip helper-address 10.20.0.10 trên cổng tầng chín là xong. Còn giaddr là tên một ô có thật trong gói DHCP (gateway address) — relay điền địa chỉ cổng xóm của nó vào đó. Toàn bộ phép màu một-server-cho-mười-xóm nằm gọn trong một ô địa chỉ ấy.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Theo chân một lời xin địa chỉ từ tầng chín về phòng máy chủ, từng chặng. Chặng 1: máy mới hét DISCOVER — cả xóm tầng chín nghe, router chặn lại đúng luật quảng bá. Chặng 2: relay của xóm (chính cổng router tầng chín) nghe được tiếng hét, ghi địa chỉ xóm 10.20.9.1 vào ô giaddr. Chặng 3: relay gửi lá thư đích danh tới máy DHCP 10.20.0.10 — thư có địa chỉ người nhận nên qua router êm ru. Chặng 4: máy chủ mở thư, nhìn ô giaddr thấy 10.20.9.1, hiểu ngay là xóm tầng chín đang hỏi, bèn chọn dải 10.20.9.x mà cấp. Chặng 5: OFFER quay về relay, relay trao tận tay máy mới — cuộc hỏi cưới tiếp tục như Module 6 đã kể.
- **Đề:** Xếp lại đường đi của một lời xin địa chỉ khi xóm có relay:
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Máy mới hét DISCOVER, cả xóm nghe, router chặn lại
    2. Relay trong xóm nghe được, ghi địa chỉ xóm vào ô giaddr
    3. Relay gửi thư đích danh tới máy DHCP ở xóm máy chủ
    4. Máy chủ nhìn giaddr, chọn đúng dải của xóm đang hỏi
    5. OFFER quay về relay, relay trao tận tay máy mới
  - **Chủ đề gợi ý (tầng 1):** ai nghe được tiếng hét, và ai đọc ô giaddr
  - **Gợi ý (tầng 2):** Bắt đầu từ tiếng hét kẹt trong xóm. Người duy nhất vừa nghe được tiếng hét vừa viết được thư đích danh là ai?
  - **Lời giải (tầng 3):** Hét trong xóm → relay nghe và ghi giaddr → thư đích danh vượt router → máy chủ đọc giaddr chọn dải → OFFER quay về qua relay. Mấu chốt là hai chặng giữa: đổi tiếng hét thành thư, và ghi rõ xóm nào đang hỏi.
- **Đề:** Một máy DHCP duy nhất cấp đúng dải cho mười xóm khác nhau. Nó phân biệt các xóm bằng cách nào?
  - **Dạng:** trắc nghiệm · **Nhìn ô giaddr mà relay đã ghi để biết lời xin phát từ xóm nào** ✓ / Đoán theo địa chỉ MAC của máy xin, vì MAC có ghi mã tòa nhà / Cấp lần lượt từng dải theo thứ tự lời xin gửi tới trong ngày
  - **Chủ đề gợi ý (tầng 1):** ô địa chỉ mà relay điền trước khi gửi
  - **Gợi ý (tầng 2):** MAC không mang thông tin vị trí, và cấp theo thứ tự thì máy tầng chín có ngày nhận địa chỉ tầng hai. Manh mối duy nhất về XÓM nằm trong lá thư của ai?
  - **Lời giải (tầng 3):** Nhờ ô giaddr. Relay ghi địa chỉ xóm mình vào đó trước khi chuyển lời, nên máy chủ chỉ cần đối chiếu giaddr với danh sách scope là chọn đúng dải. Không có giaddr thì mười xóm trông giống hệt nhau.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: relay ghi địa chỉ xóm mình vào Ô NÀO của gói DHCP trước khi chuyển cho máy chủ?
  - **Dạng:** gõ tay · **Chấp nhận:** giaddr | ô giaddr | o giaddr | truong giaddr | trường giaddr | gateway address
  - **Chủ đề gợi ý (tầng 1):** tên ô bắt đầu bằng chữ g
  - **Gợi ý (tầng 2):** Tên ô ghép từ chữ gateway và address — viết tắt sáu chữ cái.
  - **Lời giải (tầng 3):** Ô giaddr (gateway address). Máy chủ đọc ô này để biết xóm nào đang hỏi mà chọn dải cho đúng — cả phép màu một-server-nhiều-xóm nằm ở đó.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao relay phải ghi giaddr thay vì cứ chuyển tiếp nguyên xi tiếng hét cho máy chủ?
  - **Nhóm ý cần chạm:** [giaddr, địa chỉ xóm, dia chi xom, địa chỉ của xóm, dia chi cua xom] · [chọn dải, chon dai, chọn scope, chon scope, đúng dải, dung dai, dải nào, dai nao] · [không biết xóm nào, khong biet xom nao, tưởng cùng xóm, tuong cung xom, mất dấu, mat dau, không phân biệt, khong phan biet] · [quảng bá, quang ba, không qua router, khong qua router, thư đích danh, thu dich danh]
  - **Trả lời mẫu:** Vì tiếng hét gốc không nói nó phát từ xóm nào — nếu relay chuyển tiếp nguyên xi, máy chủ nhận được lời xin mà mất dấu nơi phát, không biết phải chọn dải nào trong hàng chục scope. Relay ghi địa chỉ xóm mình vào ô giaddr rồi gửi thành thư đích danh: thư thì qua được router, còn giaddr cho máy chủ đúng một manh mối cần thiết — xóm nào đang hỏi.

**6 · Tổng kết:**
- DISCOVER là tiếng hét quảng bá — chết ở ranh giới router, không tự tới được máy DHCP ở xóm khác.
- Relay trong xóm đổi tiếng hét thành thư đích danh gửi máy chủ — một server lo được cả chục xóm.
- Ô giaddr do relay ghi là manh mối duy nhất cho máy chủ biết xóm nào đang hỏi mà chọn đúng dải.
- *Úp mở bài sau:* Relay đã đưa được lời xin về máy chủ. Nhưng máy chủ cũng có lúc HẾT ĐỊA CHỈ để cấp — và cái buổi sáng nó hết sạch bao giờ cũng là sáng thứ hai. Bài sau bạn trực ca đúng buổi sáng đó.

### Bài: Trực ca sáng thứ hai cả tầng câm lặng `m18-bai-2`

**1 · Khởi động (hook):** Thứ sáu mọi máy còn chạy ngon lành. Sáng thứ hai, một loạt máy tầng ba cùng lúc không vào được gì — mà lạ thay, máy nào cũng ĐANG CÓ một địa chỉ IP, chỉ là một địa chỉ không ai đặt, bắt đầu bằng 169.254. Địa chỉ đó ở đâu ra, và vì sao bệnh này thích bùng vào sáng đầu tuần?

**2 · Đoán thử (pretest):**
- **Đề:** "Cả tầng ba sáng nay không ai vào được hệ thống, gọi xuống dồn dập!" Bạn đang ngồi ở MAY-TANG-3. Tầng hai bên cạnh vẫn làm việc bình thường. Khám đi — và nhớ nhìn kỹ địa chỉ IP của chính máy mình trước tiên.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-TANG-3 [169.254.7.23/16] · MAY-TANG-2 [10.20.2.15/24, gw 10.20.2.1] · SRV-HE-THONG [10.20.0.9/24, gw 10.20.0.1] · SW-TANG-3 [p1:VLAN 1, p2:VLAN 1] · SW-TANG-2 [p1:VLAN 1, p2:VLAN 1] · SW-MAY-CHU [p1:VLAN 1, p2:VLAN 1] · R-TOA-NHA [g0:10.20.3.1/24, g1:10.20.2.1/24, g2:10.20.0.1/24] — dây: MAY-TANG-3·eth0 — SW-TANG-3·p1 | SW-TANG-3·p2 — R-TOA-NHA·g0 | MAY-TANG-2·eth0 — SW-TANG-2·p1 | SW-TANG-2·p2 — R-TOA-NHA·g1 | SRV-HE-THONG·eth0 — SW-MAY-CHU·p1 | SW-MAY-CHU·p2 — R-TOA-NHA·g2
    - **Ngồi ở máy:** MAY-TANG-3
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** MAY-TANG-3 ping 10.20.0.9 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **DHCP không còn địa chỉ để cấp — máy tự bịa một địa chỉ 169.254 vô dụng** ✓ · Switch tầng ba hỏng nên toàn bộ khung tin của tầng bị nuốt mất · DNS của công ty chết nên mọi tên miền đều không phân giải được
    - **Sửa:** chọn hành động — **Kiểm tra DHCP server: scope của tầng ba đã cạn — mở rộng dải hoặc rút ngắn thời gian thuê** ✓ · Thay dây mạng cho từng máy ở tầng ba rồi khởi động lại toàn bộ · Đổi DNS trên từng máy tầng ba sang một máy chủ DNS công cộng
  - **Chủ đề gợi ý (tầng 1):** địa chỉ IP mà ipconfig của chính bạn đang cầm
  - **Vì sao:** ipconfig trên máy bạn lộ ngay manh mối: địa chỉ 169.254.7.23, không gateway, không DNS — bộ ba của một máy XIN ĐỊA CHỈ THẤT BẠI rồi tự bịa số để khỏi trắng tay. Tầng hai vẫn chạy nên mạng trục không chết; thứ chết là nguồn cấp địa chỉ cho tầng ba: scope đã cạn. Sửa ở máy chủ DHCP (mở rộng dải, rút thời gian thuê), không phải ở dây hay ở DNS — hai thứ đó chẳng liên quan tới địa chỉ tự bịa.

**3 · Khám phá (teach):**
- *[m18-scope]* Scope là dải địa chỉ mà máy DHCP được phép đem cho thuê ở một xóm — ví dụ 10.20.3.50 tới 10.20.3.250, tức hai trăm suất. Mỗi máy thuê một suất theo thời hạn lease của Module 6. Chuyện cạn xảy ra khi số KHÁCH THUÊ vượt số suất: nhân viên đông lên, mỗi người thêm điện thoại với laptop cá nhân, khách ghé xin wifi — và những chiếc máy chỉ ghé một buổi vẫn giữ suất tới hết hạn thuê. Người vận hành tử tế theo dõi TỈ LỆ CẤP PHÁT của từng scope: chạm 90% là tin xấu đang xếp hàng, chứ không đợi tới sáng nó cạn hẳn.
  - **Đào sâu hơn:** Vì sao hay bùng sáng thứ hai? Cuối tuần văn phòng vắng nhưng lease chưa hết hạn — suất của người về quê vẫn bị giữ. Sáng thứ hai cả công ty ùa vào cùng lúc: máy cũ xin gia hạn, máy mới xin suất mới, đám khách vãng lai tuần trước vẫn chiếm chỗ — cầu vọt đúng lúc cung đã mòn. Hai núm vặn của người vận hành: mở rộng dải (thêm suất) và rút ngắn lease ở xóm đông khách vãng lai (suất được trả nhanh hơn).
- *[m18-apipa]* Máy xin DHCP mà không ai trả lời thì không chịu trắng tay: nó tự bịa cho mình một địa chỉ trong dải 169.254.x.x — gọi là APIPA. Địa chỉ tự bịa này chỉ đủ để nói chuyện với hàng xóm CÙNG cảnh ngộ trong xóm, còn gateway và DNS thì trống trơn, nên với người dùng nó đồng nghĩa với mất mạng. Với người trực thì ngược lại — nó là manh mối quý: thấy 169.254 là biết chắc máy này ĐÃ XIN mà KHÔNG AI CẤP, tức thủ phạm nằm ở phía dịch vụ DHCP, không phải ở sợi dây.
  - **Đào sâu hơn:** Phân biệt hai cảnh cùng chữ mất mạng: máy cầm 169.254 nghĩa là đường dây tới switch vẫn sống (nó đã hét được và chờ mãi không ai đáp) — bệnh ở dịch vụ cấp phát. Còn máy báo cáp mạng bị rút thì tiếng hét còn chưa rời khỏi máy. Cùng một lời than của người dùng, hai hướng khám khác hẳn nhau — đó là lý do ipconfig luôn là lệnh mở màn.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Hai máy cùng tầng đều xin DHCP thất bại và đều tự nhận địa chỉ 169.254.x.x. Chúng có ping được NHAU không?
  - **Dạng:** trắc nghiệm · **Được — hai địa chỉ tự bịa nằm cùng dải, nói chuyện trong xóm vẫn ổn** ✓ / Không — địa chỉ tự bịa là địa chỉ giả nên không gửi nổi gói tin nào / Chỉ được nếu switch của tầng có bật sẵn tính năng chuyển tiếp DHCP
  - **Chủ đề gợi ý (tầng 1):** hai máy cùng dải 169.254 và cùng một switch
  - **Gợi ý (tầng 2):** 169.254.x.x với prefix 16 — hai máy cùng dải, cùng xóm. Ping trong xóm cần gateway không?
  - **Lời giải (tầng 3):** Được. Hai máy cùng nằm trong dải 169.254.0.0/16 và cùng xóm nên gọi nhau không cần gateway. Cái chúng mất là đường RA KHỎI xóm — vì gateway và DNS đều trống. APIPA là phao cứu sinh trong xóm, không phải mạng thật.
- **Đề:** Người vận hành muốn biết một scope sắp cạn TRƯỚC khi nó cạn. Con số nào của scope phải được theo dõi thường xuyên?
  - **Dạng:** gõ tay · **Chấp nhận:** tỉ lệ cấp phát | ti le cap phat | tỷ lệ cấp phát | ty le cap phat | tỉ lệ đã cấp | ti le da cap | phần trăm đã cấp | phan tram da cap | số địa chỉ đã cấp | so dia chi da cap | tỉ lệ sử dụng | ti le su dung
  - **Chủ đề gợi ý (tầng 1):** so số suất đã cho thuê với tổng số suất
  - **Gợi ý (tầng 2):** Không phải đợi chuông reo — là một con số phần trăm nhìn vào biết còn bao nhiêu suất trống.
  - **Lời giải (tầng 3):** Tỉ lệ cấp phát — số địa chỉ đã cho thuê trên tổng số suất của scope. Chạm ngưỡng 90% là lúc hành động (mở rộng dải, rút lease), chứ không đợi sáng thứ hai chuông reo dồn dập.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: máy xin địa chỉ mà không ai đáp sẽ tự bịa một địa chỉ bắt đầu bằng cặp số nào?
  - **Dạng:** gõ tay · **Chấp nhận:** 169.254 | 169254 | 169 254 | dải 169.254 | dai 169.254 | 169.254.x.x
  - **Chủ đề gợi ý (tầng 1):** dải địa chỉ tự cấp của APIPA
  - **Gợi ý (tầng 2):** Cặp số mở đầu mà mọi người trực đều thuộc lòng — một trăm sáu chín, hai trăm năm tư.
  - **Lời giải (tầng 3):** 169.254 — dải APIPA. Thấy nó trong ipconfig là biết máy đã hét xin địa chỉ mà không ai đáp: thủ phạm ở phía dịch vụ DHCP, không phải sợi dây.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao bệnh scope cạn hay bùng đúng sáng thứ hai?
  - **Nhóm ý cần chạm:** [cuối tuần, cuoi tuan, thứ sáu, thu sau, về quê, ve que, vắng, vang] · [lease, thời hạn thuê, thoi han thue, chưa hết hạn, chua het han, giữ suất, giu suat, chiếm chỗ, chiem cho] · [cùng lúc, cung luc, ùa vào, ua vao, đồng loạt, dong loat, sáng thứ hai, sang thu hai] · [hết suất, het suat, cạn, can, không còn địa chỉ, khong con dia chi]
  - **Trả lời mẫu:** Vì cuối tuần văn phòng vắng nhưng các suất thuê chưa hết hạn — máy của người nghỉ vẫn giữ chỗ, kể cả máy khách vãng lai ghé một buổi tuần trước. Sáng thứ hai cả công ty ùa vào cùng lúc: máy cũ gia hạn, máy mới xin suất, trong khi kho suất đã mòn sẵn — cầu vọt đúng lúc cung cạn, và loạt máy đến sau nhận 169.254 đồng loạt.

**6 · Tổng kết:**
- Scope là kho suất cho thuê của một xóm — theo dõi tỉ lệ cấp phát, chạm 90% là hành động.
- 169.254 là địa chỉ máy tự bịa khi xin không ai đáp: dây vẫn sống, bệnh nằm ở dịch vụ DHCP.
- Sáng thứ hai là giờ vàng của bệnh scope cạn: lease cuối tuần giữ suất, cả công ty ùa vào một lượt.
- *Úp mở bài sau:* Mở rộng scope rồi — nhưng vẫn còn đúng MỘT máy DHCP. Nó mà nằm bảo trì thì sao? Bài sau: hai người làm mối chia nhau một làng, và cái bẫy chết người khi cả hai cùng cầm một cuốn sổ.

### Bài: Dựng người làm mối thứ hai không giẫm chân nhau `m18-bai-3`

**1 · Khởi động (hook):** Máy DHCP duy nhất của công ty cần tắt 30 phút để vá lỗi. Người mới vào nghề toát mồ hôi: cả công ty sắp rớt mạng? Người cũ thản nhiên: đa số chẳng ai nhận ra đâu. Cả hai đều có lý — vậy ai đúng, và chuyện gì quyết định điều đó?

**2 · Đoán thử (pretest):**
- **Đề:** Máy DHCP tắt 30 phút giữa giờ làm. Các máy ĐANG DÙNG MẠNG có mất kết nối ngay không?
  - **Dạng:** trắc nghiệm · **Không — địa chỉ đã thuê còn hạn thì cứ dùng tiếp, chẳng cần hỏi ai** ✓ / Có — mất máy chủ cấp phát là mọi địa chỉ lập tức bị thu hồi / Có — vì mỗi gói tin gửi đi đều phải qua máy DHCP đóng dấu trước
  - **Chủ đề gợi ý (tầng 1):** bản chất của một hợp đồng thuê còn hạn
  - **Vì sao:** Không mất ngay. Địa chỉ là hợp đồng thuê CÓ THỜI HẠN — server tắt thì hợp đồng còn hạn vẫn nguyên giá trị, máy cứ dùng tiếp. Kẻ khổ là máy MỚI cắm vào (không ai đáp tiếng hét) và máy vừa hết hạn thuê. DHCP chỉ đứng ở cửa cấp phát, không đứng trên đường đi của từng gói tin.

**3 · Khám phá (teach):**
- *[m18-failover]* Muốn dịch vụ cấp phát sống qua cả lúc một máy chủ nằm viện thì nuôi HAI máy. Cách mộc mạc nhất: chia đôi kho suất — máy A giữ 80% dải, máy B giữ 20% còn lại, hai kho KHÔNG chồng lên nhau; A tắt thì B vẫn cấp được từ phần của nó. Cách sang hơn: hai máy bắt cặp failover, dùng CHUNG một cuốn sổ cho thuê và liên tục kể cho nhau nghe từng hợp đồng — một máy gục, máy kia cầm nguyên cuốn sổ cấp tiếp như chưa có gì xảy ra. Mức khái niệm cần nhớ: hoặc chia kho tách bạch, hoặc chung sổ có đồng bộ — không có kiểu thứ ba.
  - **Đào sâu hơn:** Tỉ lệ 80/20 không phải phép chia công bằng mà là phép chia VAI: máy A gánh việc hằng ngày, máy B là phao dự phòng — 20% suất của nó chỉ cần đủ cho quãng thời gian A nằm viện, vì các máy còn hạn thuê đâu cần hỏi ai. Đó cũng là câu trả lời cho thắc mắc vì sao phao chỉ cần bé: lease chính là chiếc phao thứ nhất rồi.
- *[m18-trung-dai]* Cái bẫy chết người của kẻ vội: dựng máy B bằng cách BÊ NGUYÊN cấu hình máy A — hai máy cùng phát MỘT dải, không chia, không chung sổ. Trông thì chạy: máy nào hỏi cũng được đáp, còn nhanh gấp đôi. Nhưng hai cuốn sổ rời nhau không biết đối phương đã cho thuê số nào — sớm muộn máy A cấp 10.20.3.77 cho người này trong khi máy B cũng cấp đúng 10.20.3.77 cho người khác. Và thế là bệnh TRÙNG IP chập chờn của Module 11 quay lại, lần này không phải do ai gõ nhầm tay, mà do chính hạ tầng đẻ ra đều đặn.
  - **Đào sâu hơn:** Bệnh này ác ở chỗ nó ủ lâu: hai server cùng phát một dải có thể chạy êm hàng tuần — chừng nào hai bên tình cờ chưa cấp trùng số. Tới lúc trùng, triệu chứng lại y hệt ca máy in Module 11 (một IP hai MAC thay nhau trả lời), khiến người trực đi tìm kẻ gõ nhầm trong khi thủ phạm ngồi trong phòng máy chủ. Gặp trùng IP tái đi tái lại ở một xóm cấp phát tự động: đừng hỏi ai gõ — hỏi có mấy máy DHCP đang phát dải đó.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Cách nào dựng máy DHCP thứ hai ĐÚNG?
  - **Dạng:** trắc nghiệm · **Chia kho tách bạch cho hai máy, hoặc bắt cặp failover dùng chung một cuốn sổ** ✓ / Bê nguyên cấu hình máy một sang máy hai cho đồng bộ, cùng phát một dải / Cho máy hai chỉ phát địa chỉ vào ban đêm để tránh đụng giờ với máy một
  - **Chủ đề gợi ý (tầng 1):** hai cuốn sổ rời nhau thì biết gì về nhau
  - **Gợi ý (tầng 2):** Câu hỏi cốt lõi: hai máy có cách nào biết ĐỐI PHƯƠNG đã cho thuê số nào chưa?
  - **Lời giải (tầng 3):** Chia kho tách bạch hoặc chung sổ failover. Bê nguyên cấu hình là hai cuốn sổ rời cùng phát một dải — máy nào cũng tưởng số còn trống, và bệnh trùng IP được hạ tầng sản xuất đều đặn. Phát theo giờ cũng chung một lỗi: hai sổ vẫn chẳng biết gì về nhau.
- **Đề:** Trộn lại Module 11: một xóm cấp DHCP tự động cứ vài ngày lại có ca trùng IP, mỗi lần một máy khác nhau. Nghi phạm số một của bạn?
  - **Dạng:** trắc nghiệm · **Hai máy DHCP đang cùng phát một dải mà không chia kho, không chung sổ** ✓ / Một nhân viên nào đó cứ vài ngày lại gõ nhầm địa chỉ tĩnh một lần / Switch của xóm bị lỗi bảng MAC nên gán nhầm địa chỉ cho các máy
  - **Chủ đề gợi ý (tầng 1):** trùng IP lặp lại có hệ thống thì thủ phạm là hệ thống
  - **Gợi ý (tầng 2):** Gõ nhầm là tai nạn lẻ tẻ của MỘT máy. Bệnh tái phát đều đặn, nạn nhân đổi liên tục — cái gì sản xuất được lỗi đều đặn như thế?
  - **Lời giải (tầng 3):** Hai máy DHCP cùng phát một dải. Lỗi con người thì lẻ tẻ và dính một máy; lỗi lặp có hệ thống với nạn nhân ngẫu nhiên là chữ ký của hạ tầng cấp phát đôi. Switch thì không gán địa chỉ IP cho ai bao giờ — nó sống ở tầng 2.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: hai máy DHCP cùng phục vụ một xóm mà KHÔNG chia kho, không chung sổ — sớm muộn sinh ra bệnh gì?
  - **Dạng:** gõ tay · **Chấp nhận:** trùng ip | trung ip | trùng địa chỉ | trung dia chi | cấp trùng ip | cap trung ip | hai máy một ip | hai may mot ip | duplicate ip
  - **Chủ đề gợi ý (tầng 1):** bệnh chập chờn quen mặt từ phòng khám
  - **Gợi ý (tầng 2):** Chính là ca máy in chập chờn của Module 11 — nhưng lần này do hạ tầng đẻ ra.
  - **Lời giải (tầng 3):** Trùng IP. Hai cuốn sổ rời nhau không biết đối phương đã cho thuê số nào, nên sớm muộn hai máy khác nhau cùng được cấp một địa chỉ — bệnh chập chờn Module 11 quay lại, lần này theo lịch của hạ tầng chứ không theo bàn tay gõ nhầm.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao máy DHCP dự phòng chỉ cần giữ 20% kho suất mà vẫn đủ cứu cả xóm khi máy chính nằm viện?
  - **Nhóm ý cần chạm:** [lease, còn hạn, con han, hợp đồng thuê, hop dong thue, dùng tiếp, dung tiep] · [không cần hỏi, khong can hoi, không phải xin lại, khong phai xin lai, chẳng hỏi ai, chang hoi ai] · [máy mới, may moi, hết hạn, het han, số ít, so it, ít máy, it may] · [tạm thời, tam thoi, quãng bảo trì, quang bao tri, trong lúc, trong luc]
  - **Trả lời mẫu:** Vì các máy đang giữ hợp đồng thuê còn hạn cứ thế dùng tiếp, chẳng cần hỏi ai — lease chính là chiếc phao thứ nhất. Trong quãng máy chính nằm viện, chỉ máy mới cắm vào và máy vừa hết hạn mới cần xin, mà số đó ít, nên 20% kho suất của máy dự phòng là đủ đắp qua cơn.

**6 · Tổng kết:**
- Server tắt không làm máy đang dùng rớt mạng — lease còn hạn là chiếc phao thứ nhất.
- Dự phòng đúng kiểu: chia kho tách bạch (80/20) hoặc bắt cặp failover chung một cuốn sổ.
- Hai máy cùng phát một dải không chia là nhà máy sản xuất bệnh trùng IP — đừng bê nguyên cấu hình.
- *Úp mở bài sau:* Địa chỉ đã có người lo ngày đêm. Nhưng còn CÁI TÊN: vì sao cùng gõ một địa chỉ web mà ngồi trong công ty lại thấy khác hẳn ngồi quán cà phê? Bài sau: một cái tên, hai câu trả lời — và cả hai đều đúng.

### Bài: Giải nghĩa một cái tên có hai câu trả lời `m18-bai-4`

**1 · Khởi động (hook):** Chị kế toán cầm laptop ra quán cà phê thì mở trang chủ công ty ngon lành; về tới bàn làm việc, cũng chiếc laptop đó, cũng địa chỉ đó — lại vào được luôn, nhưng nhanh hơn hẳn. Trong khi anh thực tập gõ tên hệ thống nội bộ ở nhà thì máy báo không tồn tại, dù ở công ty nó chạy. Cùng những cái tên ấy — ai đang trả lời khác nhau, và vì sao lại nên như thế?

**2 · Đoán thử (pretest):**
- **Đề:** "Công ty vừa chuyển sang máy chủ DNS mới, từ đó không ai mở được hệ thống nội bộ portal.noibo.congty.vn nữa — báo không tồn tại. Web bên ngoài thì vẫn lướt bình thường!" Bạn ngồi ở MAY-KE-TOAN. Khám bằng nslookup xem cái tên ấy chết ở đâu.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-KE-TOAN [10.20.2.21/24, gw 10.20.2.1] · SRV-DNS-MOI [10.20.0.53/24, gw 10.20.0.1] · SRV-PORTAL [10.20.0.80/24, gw 10.20.0.1] · SW-VAN-PHONG [p1:VLAN 1, p2:VLAN 1] · SW-MAY-CHU [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] · R-CONG-TY [g0:10.20.2.1/24, g1:10.20.0.1/24] — dây: MAY-KE-TOAN·eth0 — SW-VAN-PHONG·p1 | SW-VAN-PHONG·p2 — R-CONG-TY·g0 | R-CONG-TY·g1 — SW-MAY-CHU·p1 | SW-MAY-CHU·p2 — SRV-DNS-MOI·eth0 | SW-MAY-CHU·p3 — SRV-PORTAL·eth0
    - **Ngồi ở máy:** MAY-KE-TOAN
    - **Hồ sơ bệnh:** DNS 10.20.0.53 [www.congty.vn → 203.0.113.80, mail.congty.vn → 203.0.113.25]
    - **Triệu chứng:** MAY-KE-TOAN phân giải tên "portal.noibo.congty.vn" PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **DNS mới chỉ biết tên công cộng — zone nội bộ chưa được dựng nên tên trong nhà thành vô chủ** ✓ · Máy chủ portal đã tắt hẳn nên cái tên của nó bị xóa khỏi mọi máy DNS · Dây mạng từ văn phòng lên tủ máy chủ đứt nên mọi câu hỏi DNS rơi rụng
    - **Sửa:** chọn hành động — **Dựng zone noibo.congty.vn trên DNS trong, thêm bản ghi portal trỏ về 10.20.0.80** ✓ · Đổi DNS trên từng máy nhân viên sang một máy chủ DNS công cộng ngoài Internet · Khởi động lại máy chủ portal và toàn bộ switch trong phòng máy chủ
  - **Chủ đề gợi ý (tầng 1):** nslookup nói tên chết kiểu gì — im lặng hay không tồn tại
  - **Vì sao:** nslookup portal.noibo.congty.vn trả về Non-existent domain — máy DNS SỐNG và TRẢ LỜI đàng hoàng, chỉ là câu trả lời của nó là "tôi không biết tên này". Nó vẫn phân giải được www và mail, tức bệnh không nằm ở dây hay ở dịch vụ, mà ở CUỐN SỔ: DNS mới chỉ chép phần tên công cộng, quên dựng zone nội bộ. Đổi sang DNS công cộng càng tệ — DNS ngoài Internet lại càng không biết tên trong nhà bạn. Thuốc đúng: dựng zone noibo.congty.vn ngay trên DNS trong.

**3 · Khám phá (teach):**
- *[m18-split-dns]* Doanh nghiệp giữ HAI cuốn sổ tên cho cùng một miền — gọi là split DNS. Cuốn NGOÀI đặt trên Internet, ai hỏi cũng đáp, nhưng chỉ ghi những tên đáng phơi ra đời: www, mail, và trỏ chúng về địa chỉ công cộng. Cuốn TRONG đặt ở phòng máy chủ, chỉ người trong mạng hỏi được: ghi đủ tên nội bộ (portal, kho file, máy in) trỏ thẳng về địa chỉ trong nhà — và với chính www, nó có thể trả địa chỉ NỘI BỘ để nhân viên đi đường tắt trong nhà thay vì vòng ra Internet rồi quay về. Cùng một cái tên, hai câu trả lời — mỗi câu đúng cho chỗ đứng của người hỏi.
  - **Đào sâu hơn:** Vì sao không gộp một cuốn cho đỡ mệt? Hai lý do. Bảo mật: phơi cuốn sổ nội bộ ra Internet là phát miễn phí bản đồ phòng máy chủ cho kẻ dò la — tên máy, vai trò, địa chỉ trong nhà. Đường đi: người trong nhà mà bị trỏ ra địa chỉ công cộng sẽ đi vòng qua cửa NAT rồi quay ngược vào — chậm, và có kiến trúc còn tắc hẳn. Ca anh thực tập ở phần mở đầu là mặt còn lại của cùng đồng xu: ở nhà anh hỏi cuốn NGOÀI, mà cuốn ngoài thì cố tình không ghi tên nội bộ.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Máy trong công ty không phân giải được tên nội bộ. Một người đề nghị: đổi DNS của máy sang máy chủ DNS công cộng nổi tiếng cho khỏe. Kết quả sẽ ra sao?
  - **Dạng:** trắc nghiệm · **Tệ hơn — DNS công cộng càng không biết tên nội bộ, lại mất luôn các tên trong nhà khác** ✓ / Khỏi hẳn — máy chủ DNS công cộng lớn thì cuốn sổ nào cũng đầy đủ hơn DNS công ty / Không đổi gì — mọi máy DNS trên đời đều chép chung một cuốn sổ như nhau
  - **Chủ đề gợi ý (tầng 1):** tên nội bộ nằm trong cuốn sổ của ai
  - **Gợi ý (tầng 2):** portal.noibo.congty.vn có nằm trên Internet không? Máy chủ DNS công cộng tra nó ở đâu ra?
  - **Lời giải (tầng 3):** Tệ hơn. Tên nội bộ chỉ tồn tại trong cuốn sổ TRONG của công ty — DNS công cộng không có và không bao giờ có nó. Đổi DNS ra ngoài là tự cắt mình khỏi toàn bộ tên trong nhà. Đây là phản xạ sai phổ biến nhất của người mới, nên nó đứng đầu danh sách bẫy.
- **Đề:** Nhân viên trong công ty mở www.congty.vn mà không phải đi vòng ra Internet rồi quay về. Cuốn sổ TRONG đã làm gì với cái tên www đó?
  - **Dạng:** gõ tay · **Chấp nhận:** trỏ về địa chỉ nội bộ | tro ve dia chi noi bo | trả địa chỉ nội bộ | tra dia chi noi bo | trỏ về ip nội bộ | tro ve ip noi bo | trả ip trong nhà | tra ip trong nha | trỏ thẳng vào máy chủ trong nhà | tro thang vao may chu trong nha
  - **Chủ đề gợi ý (tầng 1):** cùng một tên nhưng câu trả lời dành cho người trong nhà
  - **Gợi ý (tầng 2):** Đó chính là chỗ chị kế toán thấy "nhanh hơn hẳn" khi về bàn làm việc — sổ trong trả một địa chỉ khác sổ ngoài.
  - **Lời giải (tầng 3):** Sổ trong trỏ www về địa chỉ NỘI BỘ của máy chủ web, nên người trong nhà đi đường tắt trong nhà. Sổ ngoài vẫn trỏ về địa chỉ công cộng cho khách Internet — hai câu trả lời cùng đúng, mỗi câu cho một chỗ đứng.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: kiểu triển khai giữ hai cuốn sổ tên trong/ngoài cho cùng một miền gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** split dns | split-dns | dns tách đôi | dns tach doi | dns hai cuốn sổ | dns hai cuon so
  - **Chủ đề gợi ý (tầng 1):** tên tiếng Anh, có chữ chia/tách
  - **Gợi ý (tầng 2):** Chữ đầu nghĩa là tách đôi — split.
  - **Lời giải (tầng 3):** Split DNS: cuốn ngoài phơi tên công cộng cho Internet, cuốn trong giữ đủ tên nội bộ cho người trong nhà — cùng một miền, hai câu trả lời có chủ đích.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao KHÔNG nên phơi cuốn sổ tên nội bộ ra Internet cho tiện một cuốn?
  - **Nhóm ý cần chạm:** [bản đồ, ban do, lộ, lo , phơi, phoi, dò la, do la, trinh sát, trinh sat] · [tên nội bộ, ten noi bo, máy chủ trong nhà, may chu trong nha, địa chỉ trong, dia chi trong] · [bảo mật, bao mat, kẻ tấn công, ke tan cong, an toàn, an toan] · [đường vòng, duong vong, đi vòng, di vong, nat, chậm, cham, đường tắt, duong tat]
  - **Trả lời mẫu:** Vì cuốn sổ nội bộ chính là tấm bản đồ phòng máy chủ: tên máy, vai trò, địa chỉ trong nhà. Phơi nó ra Internet là tặng không tấm bản đồ đó cho kẻ dò la. Chưa kể chuyện đường đi: người trong nhà bị trỏ ra địa chỉ công cộng sẽ đi vòng qua cửa NAT rồi quay lại, chậm và có khi tắc — trong khi sổ trong cho họ đi đường tắt nội bộ.

**6 · Tổng kết:**
- Split DNS = hai cuốn sổ cho một miền: sổ ngoài phơi tên công cộng, sổ trong giữ đủ tên nội bộ.
- Tên nội bộ chỉ sống trong sổ trong — đổi máy sang DNS công cộng là tự cắt mình khỏi chúng.
- Non-existent domain từ một DNS đang sống nghĩa là thiếu bản ghi/zone — bệnh ở cuốn sổ, không ở dây.
- *Úp mở bài sau:* Sổ trong không biết một cái tên ngoài Internet thì sao — nó bó tay à? Không: nó đi HỎI HỘ. Và mọi câu trả lời xin về đều có hạn sử dụng — thứ sẽ phản chủ đúng cái ngày bạn thay máy chủ. Bài cuối: forwarder và TTL.

### Bài: Điều khiển trí nhớ của cả hệ thống tên `m18-bai-5`

**1 · Khởi động (hook):** Chín giờ sáng bạn chuyển trang nội bộ sang máy chủ mới và sửa bản ghi DNS ngay lập tức. Chín giờ năm phút, phòng kế toán vẫn vào bản cũ. Mười giờ, vài người vẫn thế — trong khi máy bạn thì thấy bản mới từ lâu. Không có gì hỏng cả. Ai đang "nhớ dai" giữa đường, và lẽ ra bạn phải làm gì từ MẤY NGÀY TRƯỚC?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: sửa bản ghi DNS xong mà một số máy vẫn ra địa chỉ cũ thêm cả tiếng — vì sao?
  - **Dạng:** trắc nghiệm · **Câu trả lời cũ còn hạn nhớ trong các bộ đệm dọc đường nên chưa ai thèm hỏi lại** ✓ / Bản ghi mới cần thời gian lan truyền vật lý qua từng sợi cáp tới mọi máy / Máy chủ DNS chỉ đọc lại cuốn sổ của nó vào đầu mỗi giờ chẵn
  - **Chủ đề gợi ý (tầng 1):** mỗi câu trả lời DNS đều kèm một hạn sử dụng
  - **Vì sao:** Mỗi câu trả lời DNS mang theo một hạn nhớ (TTL). Máy nào xin được câu trả lời cũ TRƯỚC lúc bạn sửa sẽ dùng nó tới hết hạn mới chịu hỏi lại — chẳng có gì lan truyền vật lý, cũng chẳng có giờ chẵn nào cả. Trí nhớ có hạn chính là thứ làm DNS nhanh, và cũng là thứ phản chủ khi bạn đổi hạ tầng mà quên báo trước.

**3 · Khám phá (teach):**
- *[m18-forwarder]* Máy DNS trong công ty giữ zone nội bộ, nhưng thế giới ngoài kia thì nó không biết hết — và không cần biết. Gặp tên lạ, nó chuyển câu hỏi cho một người HỎI HỘ đã chỉ định sẵn: forwarder. Mọi thắc mắc ra Internet dồn về một cửa duy nhất, và cái cửa đó thành chỗ vàng để vận hành: bộ đệm chung cho cả công ty (một người hỏi xong, nghìn người sau hưởng), một chỗ duy nhất để lọc tên độc hại, một chỗ duy nhất để nhìn xem cả công ty đang hỏi gì.
  - **Đào sâu hơn:** Không khai forwarder thì máy DNS tự đi hỏi từ gốc: root, rồi máy chủ của vn, rồi của congty.vn — cách này tự lập nhưng mỗi máy DNS trong công ty đều phải tự bơi ra Internet, khó lọc, khó nhìn. Chọn forwarder vì thế ít khi là chuyện kỹ thuật thuần: nó là quyết định gom mọi cánh cửa ra thế giới về một chỗ canh được.
- *[m18-cond-forwarder]* Có những cái tên không nên hỏi vòng ra Internet: tên nội bộ của CÔNG TY ĐỐI TÁC vừa nối VPN với bạn chẳng hạn — Internet không biết chúng, chỉ DNS nội bộ của đối tác biết. Conditional forwarder là luật hỏi đúng nhà: riêng những tên thuộc doitac.vn thì chuyển thẳng câu hỏi tới máy DNS của đối tác qua đường VPN, còn mọi tên khác vẫn đi cửa forwarder thường. Một dòng luật cho mỗi người quen — thay vì bắt cả thế giới trả lời hộ thứ chỉ hàng xóm biết.
  - **Đào sâu hơn:** Đây chính là mảnh ghép DNS cho mạng nhiều công ty nối nhau: sáp nhập, thuê ngoài, chi nhánh dùng miền riêng. Dấu hiệu nhận biết đang thiếu nó: ping địa chỉ IP của máy đối tác thì thông (đường VPN sống) mà gọi bằng TÊN thì Non-existent domain — tầng đường đi ổn, tầng tên chưa ai chỉ lối.
- *[m18-ttl]* Mỗi bản ghi DNS mang một hạn nhớ — TTL, tính bằng giây: ai xin được câu trả lời thì được phép nhớ nó đúng chừng ấy lâu rồi mới phải hỏi lại. TTL dài thì cả hệ thống nhẹ gánh nhưng trí nhớ cũ lởn vởn lâu; TTL ngắn thì đổi gì cũng lan nhanh nhưng máy DNS bị hỏi dồn dập. Luật vàng khi ĐỔI HẠ TẦNG: hạ TTL của bản ghi sắp đổi xuống thật ngắn TRƯỚC vài ngày — đợi hạn nhớ cũ trôi hết — rồi mới đổi địa chỉ; xong xuôi ổn định thì nâng TTL về như cũ. Trí nhớ của cả Internet không xóa được bằng lệnh, chỉ điều khiển được bằng cách hẹn giờ từ trước.
  - **Đào sâu hơn:** Vì sao phải hạ TRƯỚC vài ngày mà không phải vài phút? Vì lời hứa cũ vẫn còn hiệu lực: bản ghi đang để TTL một ngày nghĩa là ngoài kia có những bộ đệm được phép nhớ câu trả lời cũ tới hết một ngày nữa — bạn hạ TTL hôm nay thì phải đợi trọn vòng hạn CŨ trôi qua, mọi bộ đệm mới cầm bản TTL ngắn. Hạ sớm bao lâu = TTL cũ dài bao nhiêu. Đó là phép tính người vận hành làm trên lịch, trước khi chạm vào bất cứ máy chủ nào.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Trước giờ chuyển hạ tầng, bạn phải kiểm chứng máy DNS nội bộ 10.20.0.53 còn đang NGHE ở đúng port dịch vụ của DNS hay không — bằng terminal PowerShell, như một người vận hành thật.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [10.20.2.5/24] — đích: dns.congty.vn=10.20.0.53 cổng 53 · portal.noibo.congty.vn=10.20.0.80 cổng 80/443
    - **Mục tiêu:**
      - phải kiểm tra cổng 53 của 10.20.0.53 thành công
    - **Lệnh mẫu:** `Test-NetConnection 10.20.0.53 -Port 53`
  - **Chủ đề gợi ý (tầng 1):** port dịch vụ của DNS và cmdlet kiểm tra kết nối
  - **Gợi ý (tầng 2):** Cmdlet là Test-NetConnection, đích là 10.20.0.53, còn port của DNS thì bạn đã thuộc từ cung điện Module 5 — con số nằm ở tầng hai của tòa nhà.
  - **Lời giải (tầng 3):** Test-NetConnection 10.20.0.53 -Port 53. Port 53 là cửa của DNS; TcpTestSucceeded : True nghĩa là dịch vụ đang nghe — kiểm chứng bằng lệnh trước giờ đổi hạ tầng là thói quen sống còn của người vận hành.
- **Đề:** Ping tới địa chỉ IP máy chủ của đối tác qua VPN thì thông, nhưng gọi bằng tên noibo.doitac.vn thì báo không tồn tại. Thiếu mảnh nào?
  - **Dạng:** trắc nghiệm · **Conditional forwarder trỏ các tên doitac.vn về máy DNS của đối tác** ✓ / Một tuyến đường tĩnh mới, vì đường VPN hiện tại chưa dẫn tới máy chủ đó / Bản ghi các tên đối tác trên máy chủ DNS công cộng ngoài Internet
  - **Chủ đề gợi ý (tầng 1):** ping số thông thì tầng đường đi còn thiếu gì đâu
  - **Gợi ý (tầng 2):** Bài Module 11 dạy tách tên khỏi số: số sống mà tên chết thì bệnh nằm ở tầng nào?
  - **Lời giải (tầng 3):** Thiếu conditional forwarder. Ping số thông chứng tỏ đường VPN ổn — tuyến tĩnh không thiếu; còn tên nội bộ của đối tác thì Internet không biết nên đưa lên DNS công cộng là vô ích. Phải có luật hỏi đúng nhà: tên doitac.vn chuyển thẳng tới DNS của đối tác.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: vài ngày TRƯỚC khi đổi địa chỉ một máy chủ, người vận hành phải làm gì với TTL của bản ghi sắp đổi?
  - **Dạng:** gõ tay · **Chấp nhận:** hạ ttl | ha ttl | giảm ttl | giam ttl | hạ xuống | ha xuong | rút ngắn ttl | rut ngan ttl | hạ ttl xuống thật ngắn | ha ttl xuong that ngan
  - **Chủ đề gợi ý (tầng 1):** điều khiển hạn nhớ từ trước, không xóa được lúc sau
  - **Gợi ý (tầng 2):** Trí nhớ ngoài kia không xóa được bằng lệnh — chỉ hẹn giờ cho nó ngắn lại từ trước.
  - **Lời giải (tầng 3):** Hạ TTL xuống thật ngắn từ trước vài ngày, đợi hạn nhớ cũ trôi hết rồi mới đổi địa chỉ — đổi xong ổn định thì nâng TTL về như cũ. Đây là phép tính làm trên lịch, trước khi chạm vào máy chủ.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao phải hạ TTL từ TRƯỚC vài ngày chứ không phải ngay lúc đổi địa chỉ?
  - **Nhóm ý cần chạm:** [hạn cũ, han cu, ttl cũ, ttl cu, lời hứa cũ, loi hua cu, còn hiệu lực, con hieu luc] · [bộ đệm, bo dem, cache, nhớ, nho , trí nhớ, tri nho] · [trôi hết, troi het, hết hạn, het han, đợi, doi , chờ, cho ] · [hỏi lại, hoi lai, xin lại, xin lai, cầm bản mới, cam ban moi, ttl ngắn, ttl ngan]
  - **Trả lời mẫu:** Vì các bộ đệm ngoài kia đang cầm câu trả lời cũ kèm hạn nhớ CŨ — lời hứa đó còn hiệu lực tới hết hạn, mình không xóa hộ họ được. Hạ TTL hôm nay thì phải đợi trọn vòng hạn cũ trôi qua, mọi bộ đệm hỏi lại và cầm bản TTL ngắn; tới lúc ấy mới đổi địa chỉ thì trí nhớ cũ chỉ sống thêm vài phút thay vì cả ngày.

**6 · Tổng kết:**
- Gặp tên lạ, DNS trong hỏi hộ qua forwarder — một cửa ra để đệm chung, lọc chung, nhìn chung.
- Tên của đối tác thì hỏi đúng nhà bằng conditional forwarder, đừng bắt Internet trả lời hộ.
- TTL là hạn nhớ của mỗi câu trả lời: đổi hạ tầng thì hạ TTL trước vài ngày, xong nâng lại.
- *Úp mở bài sau:* Địa chỉ có người phát, cái tên có người giữ — hạ tầng dịch vụ đã đứng vững. Phần tiếp theo bước sang con người: một miền, nhiều tòa nhà, và câu hỏi ai được quyền làm gì ở đâu — Active Directory đa site đang đợi.

### Khái niệm & flashcard (10)

- **Quảng bá DHCP và ranh giới router** `m18-ranh-gioi-dora` — Hai nhịp đầu của DORA đi bằng quảng bá nên chết ở ranh giới router — máy DHCP khác xóm không tự nghe được lời xin
  - Ẩn dụ: Như lời hỏi cưới hét giữa sân đình làng mình: cả làng nghe rõ, nhưng bà mối ở làng bên thì không — giữa hai làng có con sông không tiếng hét nào vượt qua.
  - Thẻ ôn: *Vì sao máy DHCP đặt ở xóm khác không tự nghe được máy mới xin địa chỉ?* → Vì DISCOVER và REQUEST gửi bằng quảng bá — máy mới chưa có địa chỉ nên chỉ biết hét cho cả xóm. Mà quảng bá chết ở ranh giới router, nên lời xin không bao giờ tự tới được xóm máy chủ; phải có relay chuyển lời.
- **DHCP relay (ip helper)** `m18-relay` — Người chuyển lời trong xóm: nghe tiếng hét DISCOVER, ghi địa chỉ xóm vào ô giaddr rồi gửi thư đích danh tới máy DHCP
  - Ẩn dụ: Như nhà mai mối trong làng: nghe lời hỏi cưới hét giữa sân, chép thành thư ghi rõ làng nào gửi, rồi đưa tận tay bà mối ở làng bên.
  - Thẻ ôn: *DHCP relay làm hai việc gì với tiếng hét xin địa chỉ?* → Một: đổi tiếng hét quảng bá thành thư đích danh gửi máy DHCP — thư thì qua được router. Hai: ghi địa chỉ xóm mình vào ô giaddr, để máy chủ biết xóm nào đang hỏi mà chọn đúng dải cấp. Trên router thật là lệnh ip helper-address.
- **Scope và tỉ lệ cạn** `m18-scope` — Dải địa chỉ cho thuê của một xóm; theo dõi tỉ lệ cấp phát để hành động trước khi cạn — chạm 90% là tin xấu xếp hàng
  - Ẩn dụ: Như bãi gửi xe của một tòa nhà: đếm chỗ trống mỗi sáng thì không bao giờ bị cảnh cả đoàn xe đứng chờ trước rào chắn.
  - Thẻ ôn: *Scope là gì, và người vận hành theo dõi con số nào để nó không cạn bất ngờ?* → Scope là dải địa chỉ máy DHCP được phép cho một xóm thuê. Theo dõi tỉ lệ cấp phát (số đã cho thuê trên tổng suất): chạm ~90% là mở rộng dải hoặc rút ngắn lease ở xóm đông khách vãng lai — hành động trước khi chuông reo.
- **APIPA 169.254** `m18-apipa` — Địa chỉ máy tự bịa trong dải 169.254.x.x khi xin DHCP không ai đáp — không gateway, không DNS, chỉ nói chuyện được trong xóm
  - Ẩn dụ: Như người xếp hàng mãi không được phát số thứ tự bèn tự viết một con số lên tay: trong phòng chờ ai cũng hiểu, nhưng ra khỏi cửa thì con số ấy vô giá trị.
  - Thẻ ôn: *Thấy máy cầm địa chỉ 169.254.x.x thì người trực kết luận được ngay điều gì?* → Máy ĐÃ hét xin DHCP mà KHÔNG AI đáp — nên đường dây tới switch vẫn sống, thủ phạm nằm ở phía dịch vụ cấp phát (scope cạn, server chết, relay hỏng), không phải sợi dây. Địa chỉ tự bịa không có gateway lẫn DNS nên với người dùng là mất mạng.
- **DHCP failover** `m18-failover` — Hai máy DHCP cùng gánh một xóm: chia kho tách bạch (80/20) hoặc bắt cặp dùng chung một cuốn sổ cho thuê có đồng bộ
  - Ẩn dụ: Như hai người làm mối chia nhau một làng: hoặc mỗi người một nửa cuốn danh sách, hoặc ngồi chung một cuốn và kể nhau nghe từng đám — không bao giờ hai người cùng gả một cô.
  - Thẻ ôn: *Hai kiểu dựng DHCP dự phòng đúng là gì, và vì sao máy dự phòng chỉ cần kho nhỏ?* → Chia kho tách bạch (vd 80/20, hai dải không chồng nhau) hoặc bắt cặp failover chung một cuốn sổ có đồng bộ. Kho dự phòng nhỏ vẫn đủ vì lease còn hạn là các máy cứ dùng tiếp — chỉ máy mới và máy hết hạn cần xin trong quãng máy chính nằm viện.
- **Bẫy hai server một dải** `m18-trung-dai` — Hai máy DHCP cùng phát một dải mà không chia kho, không chung sổ — hạ tầng tự sản xuất bệnh trùng IP đều đặn
  - Ẩn dụ: Như hai quầy vé cùng bán một khoang tàu mà không nhìn sổ của nhau: sớm muộn hai hành khách cầm vé trùng số ghế, và cãi nhau trên tàu chứ không phải ở quầy.
  - Thẻ ôn: *Xóm cấp DHCP tự động mà bệnh trùng IP cứ tái phát, nạn nhân đổi liên tục — nghi phạm số một?* → Hai máy DHCP đang cùng phát một dải không chia kho, không chung sổ. Lỗi người gõ nhầm thì lẻ tẻ và dính một máy; lỗi lặp đều đặn với nạn nhân ngẫu nhiên là chữ ký của hạ tầng cấp phát đôi — sửa ở phòng máy chủ, không phải đi tìm người gõ.
- **Split DNS** `m18-split-dns` — Hai cuốn sổ tên cho cùng một miền: sổ ngoài phơi tên công cộng cho Internet, sổ trong giữ đủ tên nội bộ cho người trong nhà
  - Ẩn dụ: Như danh bạ của một gia đình: tấm treo ngoài cổng chỉ ghi số tiếp khách, còn cuốn trong bếp ghi đủ số phòng từng người — khách và người nhà tra hai cuốn khác nhau.
  - Thẻ ôn: *Split DNS là gì, và vì sao không gộp hai cuốn sổ làm một?* → Cùng một miền giữ hai bản: DNS ngoài chỉ ghi tên công cộng, DNS trong ghi đủ tên nội bộ (và có thể trỏ cả www về địa chỉ trong nhà cho đường tắt). Không gộp vì phơi sổ nội bộ ra Internet là tặng bản đồ phòng máy chủ cho kẻ dò la, và người trong nhà sẽ phải đi vòng qua NAT.
- **DNS forwarder** `m18-forwarder` — Người hỏi hộ được chỉ định: DNS trong gặp tên lạ thì chuyển câu hỏi ra một cửa duy nhất — nơi đệm chung, lọc chung, giám sát chung
  - Ẩn dụ: Như cả cơ quan chỉ nhờ một người chuyên đi hỏi giấy tờ hộ: hỏi một lần cả sở được nhờ, và mọi câu hỏi ra ngoài đều đi qua đúng một cái bàn nhìn thấy được.
  - Thẻ ôn: *Forwarder là gì, và gom mọi câu hỏi ra một cửa thì được những gì?* → Là máy DNS được chỉ định để hỏi hộ mọi tên mà DNS trong không biết. Một cửa ra cho: bộ đệm chung (một người hỏi, nghìn người hưởng), một chỗ lọc tên độc hại, một chỗ nhìn toàn cảnh cả công ty đang hỏi gì. Không khai thì mỗi máy DNS tự bơi ra Internet từ gốc.
- **Conditional forwarder** `m18-cond-forwarder` — Luật hỏi đúng nhà: tên thuộc miền của đối tác thì chuyển thẳng tới DNS của đối tác, không hỏi vòng ra Internet
  - Ẩn dụ: Như dặn lễ tân: giấy tờ của công ty bên kia thì gọi thẳng lễ tân bên đó mà hỏi — đừng tra danh bạ thành phố, thành phố không ghi số nội bộ nhà người ta.
  - Thẻ ôn: *Khi nào cần conditional forwarder, và dấu hiệu đang thiếu nó là gì?* → Khi phải phân giải tên NỘI BỘ của một miền khác (đối tác nối VPN, công ty sáp nhập) — Internet không biết những tên đó. Dấu hiệu thiếu: ping IP của máy đối tác thì thông mà gọi bằng tên thì Non-existent domain — đường sống, tên chưa ai chỉ lối.
- **TTL của bản ghi DNS** `m18-ttl` — Hạn nhớ kèm theo mỗi câu trả lời DNS; đổi hạ tầng thì hạ TTL trước vài ngày, đợi hạn cũ trôi hết rồi mới đổi, xong nâng lại
  - Ẩn dụ: Như hạn sử dụng in trên hộp sữa đã bán ra: sữa giao rồi thì không thu về được nữa — muốn ngày mai ai cũng uống lô mới thì từ tuần trước phải bán loại hạn ngắn.
  - Thẻ ôn: *TTL của bản ghi DNS là gì, và luật vàng khi sắp đổi địa chỉ một máy chủ?* → Là hạn nhớ (tính bằng giây) mà mọi bộ đệm được phép giữ câu trả lời trước khi hỏi lại. Luật vàng: hạ TTL xuống thật ngắn TRƯỚC vài ngày (đợi trọn vòng hạn cũ trôi qua), đổi địa chỉ, ổn định rồi nâng TTL về như cũ — trí nhớ ngoài kia không xóa được bằng lệnh, chỉ hẹn giờ được từ trước.

### Bài kiểm tra module (pool 14 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Vì sao một máy DHCP đặt ở phòng máy chủ không tự phục vụ được máy mới ở các tầng khác, nếu thiếu relay?
  - **Dạng:** trắc nghiệm · **Vì lời xin địa chỉ là quảng bá, mà quảng bá thì chết ở ranh giới router** ✓ / Vì mỗi tầng dùng một chuẩn dây mạng riêng nên gói tin không tương thích / Vì máy DHCP chỉ đủ sức trả lời các máy nằm chung một chiếc switch
  - **Chủ đề gợi ý (tầng 1):** DISCOVER là loại gói gì
  - **Vì sao:** DISCOVER là tiếng hét quảng bá — máy mới chưa có địa chỉ nên chỉ biết hét, và router chặn quảng bá đúng luật miền quảng bá. Không phải chuyện dây hay sức máy: thiếu người chuyển lời thì tiếng hét vĩnh viễn kẹt trong xóm.
- **Đề:** Relay ghi địa chỉ của xóm đang hỏi vào ô nào trong gói DHCP để máy chủ chọn đúng dải?
  - **Dạng:** gõ tay · **Chấp nhận:** giaddr | ô giaddr | o giaddr | trường giaddr | truong giaddr | gateway address
  - **Chủ đề gợi ý (tầng 1):** sáu chữ cái, ghép từ gateway và address
  - **Vì sao:** Ô giaddr (gateway address). Máy chủ đối chiếu giaddr với danh sách scope để biết cấp dải nào — thiếu nó thì mười xóm trông giống hệt nhau.
- **Đề:** Một loạt máy cùng tầng đồng loạt cầm địa chỉ 169.254.x.x vào sáng thứ hai. Kết luận nào đứng vững nhất?
  - **Dạng:** trắc nghiệm · **Nguồn cấp DHCP của tầng đó hỏng — máy xin không ai đáp nên tự bịa số** ✓ / Có kẻ đang mạo danh ARP chiếm địa chỉ cổng ra của tầng để nghe lén / Switch của tầng vừa mất điện nên bảng MAC bị xóa trắng toàn bộ
  - **Chủ đề gợi ý (tầng 1):** 169.254 nghĩa là đã hét mà không ai đáp
  - **Vì sao:** 169.254 là địa chỉ tự bịa của máy xin DHCP thất bại. Cả loạt máy cùng bịa nghĩa là nguồn cấp của tầng chết chung (scope cạn, server tắt, relay hỏng). Mạo danh ARP không làm máy đổi địa chỉ của chính nó; bảng MAC trắng thì tự học lại trong vài giây.
- **Đề:** Máy xin DHCP mà không ai trả lời sẽ tự cấp cho mình một địa chỉ bắt đầu bằng cặp số nào?
  - **Dạng:** gõ tay · **Chấp nhận:** 169.254 | 169254 | 169 254 | 169.254.x.x | dải 169.254 | dai 169.254
  - **Chủ đề gợi ý (tầng 1):** dải địa chỉ APIPA
  - **Vì sao:** 169.254 — dải APIPA. Nó chỉ đủ nói chuyện trong xóm với máy cùng cảnh ngộ; gateway và DNS trống trơn nên với người dùng là mất mạng, còn với người trực là manh mối chỉ thẳng về phía dịch vụ DHCP.
- **Đề:** Người vận hành muốn scope không bao giờ cạn bất ngờ. Việc nào là ĐÚNG NGHỀ nhất?
  - **Dạng:** trắc nghiệm · **Theo dõi tỉ lệ cấp phát từng scope, chạm ngưỡng ~90% là mở dải hoặc rút lease** ✓ / Đặt thời gian thuê thật dài cho mọi xóm để các máy khỏi phải xin lại nhiều lần / Khởi động lại máy DHCP mỗi tối để nó tự dọn sạch các hợp đồng thuê cũ
  - **Chủ đề gợi ý (tầng 1):** hành động trước khi chuông reo, không phải sau
  - **Vì sao:** Theo dõi tỉ lệ cấp phát và hành động ở ngưỡng. Lease dài làm bệnh NẶNG THÊM ở xóm đông khách vãng lai (suất bị giữ lâu hơn); khởi động lại server không xóa hợp đồng còn hạn — và không nên xóa.
- **Đề:** Máy DHCP duy nhất tắt 30 phút giữa giờ làm. Nhóm máy nào bị ảnh hưởng?
  - **Dạng:** trắc nghiệm · **Chỉ máy mới cắm vào và máy vừa hết hạn thuê — máy còn hạn cứ dùng tiếp** ✓ / Toàn bộ máy trong công ty, vì mất server là mọi địa chỉ bị thu hồi ngay / Không máy nào cả, vì router sẽ tạm đứng ra cấp địa chỉ thay cho server
  - **Chủ đề gợi ý (tầng 1):** hợp đồng thuê còn hạn thì cần hỏi ai
  - **Vì sao:** Lease còn hạn thì cứ dùng, chẳng cần hỏi ai — DHCP đứng ở cửa cấp phát chứ không đứng trên đường đi của gói tin. Khổ chủ chỉ là máy mới và máy vừa hết hạn. Router không tự thay vai server trừ khi được cấu hình làm DHCP.
- **Đề:** Dựng máy DHCP thứ hai bằng cách bê nguyên cấu hình máy thứ nhất — cùng phát một dải. Hậu quả?
  - **Dạng:** trắc nghiệm · **Hai cuốn sổ rời nhau sớm muộn cấp trùng địa chỉ cho hai máy khác nhau** ✓ / Hai máy tự phát hiện nhau rồi tự động chia đôi dải địa chỉ cho khỏi đụng / Không sao cả, vì máy xin địa chỉ chỉ nhận lời đáp của server tới trước
  - **Chủ đề gợi ý (tầng 1):** hai cuốn sổ có nhìn thấy nhau không
  - **Vì sao:** Hai server không chia kho, không chung sổ thì không biết đối phương đã cho thuê số nào — sớm muộn cấp trùng, và bệnh chập chờn Module 11 quay lại đều đặn. Chẳng có phép tự phát hiện nào, còn nhận lời đáp tới trước chính là cách hai máy khác nhau nhận trùng số từ hai server.
- **Đề:** Split DNS nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Một miền hai bản trả lời: sổ trong đủ tên nội bộ, sổ ngoài chỉ tên công cộng** ✓ / Chia đều các câu hỏi DNS cho hai máy chủ để không máy nào bị quá tải nặng / Tách phần tên miền khỏi phần địa chỉ IP để hai đội kỹ thuật quản lý riêng
  - **Chủ đề gợi ý (tầng 1):** hai cuốn sổ cho hai chỗ đứng của người hỏi
  - **Vì sao:** Split DNS là hai cuốn sổ cho CÙNG một miền: người trong nhà tra sổ trong (đủ tên nội bộ, đường tắt trong nhà), khách Internet tra sổ ngoài (chỉ tên đáng phơi ra). Không phải chuyện chia tải hay chia đội.
- **Đề:** Máy trong công ty không phân giải được tên nội bộ, một người bèn đổi DNS của máy sang máy chủ công cộng ngoài Internet. Vì sao cách này thất bại?
  - **Dạng:** trắc nghiệm · **Vì tên nội bộ chỉ nằm trong sổ DNS trong — ngoài Internet không ai giữ nó** ✓ / Vì máy chủ DNS công cộng luôn chặn mọi câu hỏi phát ra từ mạng doanh nghiệp / Vì đổi DNS trên máy trạm bắt buộc phải khởi động lại toàn bộ hệ thống mạng
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ nào giữ tên trong nhà
  - **Vì sao:** Tên nội bộ sống duy nhất trong sổ trong — DNS công cộng không có và không bao giờ có. Đổi ra ngoài là tự cắt mình khỏi mọi tên trong nhà, kể cả những tên đang chạy tốt. Đây là phản xạ sai kinh điển của người mới trực.
- **Đề:** DNS nội bộ gặp một tên ngoài Internet mà nó không biết — nó chuyển câu hỏi cho ai?
  - **Dạng:** gõ tay · **Chấp nhận:** forwarder | dns forwarder | máy hỏi hộ | may hoi ho | máy chủ chuyển tiếp | may chu chuyen tiep | người hỏi hộ | nguoi hoi ho
  - **Chủ đề gợi ý (tầng 1):** người hỏi hộ được chỉ định sẵn
  - **Vì sao:** Forwarder — máy DNS được chỉ định hỏi hộ mọi tên lạ. Gom về một cửa để cả công ty dùng chung bộ đệm, lọc tên độc hại một chỗ và nhìn toàn cảnh một chỗ.
- **Đề:** Công ty vừa nối VPN với đối tác. Ping IP máy chủ đối tác thì thông, gọi bằng tên nội bộ của họ thì báo không tồn tại. Mảnh còn thiếu?
  - **Dạng:** trắc nghiệm · **Conditional forwarder chuyển các tên thuộc miền đối tác thẳng tới DNS của họ** ✓ / Một tuyến đường tĩnh bổ sung, vì VPN hiện chưa dẫn tới được máy chủ đó / Bản ghi các tên của đối tác đăng lên máy chủ DNS công cộng ngoài Internet
  - **Chủ đề gợi ý (tầng 1):** số thông tên chết thì bệnh ở tầng nào
  - **Vì sao:** Ping số thông nghĩa là tầng đường đi ổn — không thiếu tuyến. Tên nội bộ của đối tác thì Internet không biết nên đăng ra ngoài là vô nghĩa. Thiếu đúng một luật hỏi-đúng-nhà: conditional forwarder trỏ miền đối tác về DNS của họ.
- **Đề:** Vài ngày trước khi đổi địa chỉ một máy chủ, người vận hành làm gì với TTL của bản ghi sắp đổi?
  - **Dạng:** gõ tay · **Chấp nhận:** hạ ttl | ha ttl | giảm ttl | giam ttl | rút ngắn ttl | rut ngan ttl | hạ xuống thật ngắn | ha xuong that ngan | giảm xuống | giam xuong
  - **Chủ đề gợi ý (tầng 1):** trí nhớ ngoài kia chỉ hẹn giờ được từ trước
  - **Vì sao:** Hạ TTL xuống thật ngắn từ trước — đợi trọn vòng hạn cũ trôi qua để mọi bộ đệm cầm bản hạn ngắn, rồi mới đổi địa chỉ; ổn định xong nâng TTL về như cũ. Không hạ trước thì bản cũ sống lởn vởn tới hết hạn dài, chẳng lệnh nào xóa hộ được.
- **Đề:** Công ty vừa dựng máy DNS dự phòng 10.20.0.54. Trước khi khai nó cho các máy trạm, hãy kiểm chứng bằng terminal PowerShell rằng dịch vụ DNS trên đó đã thật sự nghe ở đúng cổng của nghề.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [10.20.2.5/24] — đích: dns1.congty.vn=10.20.0.53 cổng 53 · dns2.congty.vn=10.20.0.54 cổng 53 · portal.noibo.congty.vn=10.20.0.80 cổng 80/443
    - **Mục tiêu:**
      - phải kiểm tra cổng 53 của 10.20.0.54 thành công
    - **Lệnh mẫu:** `Test-NetConnection 10.20.0.54 -Port 53`
  - **Chủ đề gợi ý (tầng 1):** port dịch vụ của DNS nằm trong cung điện Module 5
  - **Vì sao:** Test-NetConnection 10.20.0.54 -Port 53 — port 53 là cửa của DNS. TcpTestSucceeded : True mới đủ tin để khai máy này cho các máy trạm; ping thông thôi chỉ chứng minh máy sống, không chứng minh dịch vụ đang nghe.
- **Đề:** "Tầng năm gọi xuống: sáng nay cả phòng không ai vào được hệ thống, các tầng khác vẫn chạy ầm ầm." Bạn ngồi ở MAY-TANG-5. Khám đi — bắt đầu từ chính địa chỉ của mình như một người trực có nghề.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** MAY-TANG-5 [169.254.31.8/16] · MAY-TANG-4 [10.20.4.18/24, gw 10.20.4.1] · SRV-HE-THONG [10.20.0.9/24, gw 10.20.0.1] · SW-TANG-5 [p1:VLAN 1, p2:VLAN 1] · SW-TANG-4 [p1:VLAN 1, p2:VLAN 1] · SW-MAY-CHU [p1:VLAN 1, p2:VLAN 1] · R-TOA-NHA [g0:10.20.5.1/24, g1:10.20.4.1/24, g2:10.20.0.1/24] — dây: MAY-TANG-5·eth0 — SW-TANG-5·p1 | SW-TANG-5·p2 — R-TOA-NHA·g0 | MAY-TANG-4·eth0 — SW-TANG-4·p1 | SW-TANG-4·p2 — R-TOA-NHA·g1 | SRV-HE-THONG·eth0 — SW-MAY-CHU·p1 | SW-MAY-CHU·p2 — R-TOA-NHA·g2
    - **Ngồi ở máy:** MAY-TANG-5
    - **Hồ sơ bệnh:** không có (bệnh nằm trọn trong sơ đồ)
    - **Triệu chứng:** MAY-TANG-5 ping 10.20.0.9 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **Nguồn cấp DHCP của tầng năm chết — máy xin không ai đáp nên tự bịa địa chỉ 169.254** ✓ · Sợi cáp trục nối tầng năm xuống phòng máy chủ đứt — cả tầng mất mạng ngay lập tức · Máy chủ hệ thống quá tải nên từ chối kết nối của nguyên một tầng đông người nhất
    - **Sửa:** chọn hành động — **Kiểm tra phía DHCP: scope tầng năm cạn hoặc relay của tầng hỏng — sửa ở đó** ✓ · Thay toàn bộ dây mạng của tầng năm rồi khởi động lại từng máy một · Nâng cấp máy chủ hệ thống lên cấu hình mạnh hơn để chịu tải tốt hơn
  - **Chủ đề gợi ý (tầng 1):** ipconfig của chính bạn — địa chỉ ấy ai cấp
  - **Vì sao:** ipconfig lộ địa chỉ 169.254.31.8, không gateway, không DNS — cả tầng xin DHCP mà không ai đáp nên đồng loạt tự bịa số. Dây trục mà đứt thì máy vẫn giữ địa chỉ 10.20.5.x cũ chứ không đổi sang 169.254; server quá tải thì tầng khác cũng phải kêu. Thủ phạm nằm ở phía cấp phát của TẦNG NĂM: scope cạn hoặc relay hỏng — sửa ở phòng máy chủ, không phải thay dây hay nâng server.

## AD đa site và ủy quyền — Một miền, nhiều tòa nhà `module-19`

Phần E · 5 chặng · 5 bài · 8 khái niệm

**Chặng:** Một miền, nhiều tòa nhà (m19-bai-1) → Hai cuốn sổ cái chép cho nhau (m19-bai-2) → Xếp quyền như nối ống nước (m19-bai-3) → Điền nốt mắt xích (m19-bai-4) → Giao chìa khóa hẹp (m19-bai-5)

### Bài: Tìm ra ai chỉ đường sai cho chi nhánh `m19-bai-1`

**1 · Khởi động (hook):** Công ty mở chi nhánh Đà Nẵng, dựng hẳn một Domain Controller ngay tầng ba cho oách. Vậy mà sáng nào nhân viên trong đó cũng than đăng nhập chậm cả nửa phút. Soi kỹ mới tá hỏa: mọi máy Đà Nẵng đang vượt tám trăm cây số ra Hà Nội để hỏi một chuyện mà cái máy chủ ngay tầng trên trả lời được. Ai — hay đúng hơn, THIẾU cái gì — khiến chúng mù đường đến vậy?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: máy ở Đà Nẵng dựa vào manh mối nào để biết mình đang đứng gần Domain Controller nào?
  - **Dạng:** trắc nghiệm · **Địa chỉ IP của chính nó — nếu có ai đó đã khai dải nào thuộc nơi nào** ✓ / Đo thời gian ping tới từng DC trong miền rồi tự chọn máy nhanh nhất / Không cần biết — DC nào nhận được yêu cầu trước thì trả lời trước
  - **Chủ đề gợi ý (tầng 1):** thứ duy nhất trên máy nói lên vị trí của nó
  - **Vì sao:** Manh mối là địa chỉ IP — nhưng chỉ khi người quản trị ĐÃ KHAI dải nào thuộc nơi nào trong AD. Máy không tự đo ping tới từng DC, và nếu để mặc ai nhận trước trả lời trước thì tám trăm cây số với tầng trên là như nhau. Cái tên của lời khai đó là bài học hôm nay: site.

**3 · Khám phá (teach):**
- *[m19-site]* Một miền AD có thể trải trên nhiều tòa nhà, nhiều thành phố — nhưng dây mạng trong một tòa thì nhanh, còn đường nối giữa hai thành phố vừa chậm vừa đắt. AD mô tả sự thật địa lý đó bằng SITE: một site là một cụm mạng con gần nhau, nối nhau bằng đường nhanh. Hà Nội một site, Đà Nẵng một site — vẫn chung MỘT miền, một bộ tài khoản. Và tầng Site trong chuỗi LSDOU bạn học ở Module 9 tới hôm nay mới có nghĩa thật: một chính sách gắn vào site là gắn theo VỊ TRÍ NGỒI, áp cho mọi máy đang đứng ở đó, bất kể thuộc phòng ban nào.
  - **Đào sâu hơn:** Site không phải OU. OU chia theo TỔ CHỨC (phòng kế toán, phòng nhân sự — dù ngồi đâu), site chia theo ĐỊA LÝ (tòa nhà này, thành phố kia — dù thuộc phòng nào). Một nhân viên kế toán ở Đà Nẵng: tài khoản nằm trong OU KeToan, còn máy của chị ấy đứng trong site DaNang. Hai trục đó vuông góc với nhau, và AD cần cả hai.
- *[m19-subnet-site]* AD không có mắt để nhìn bản đồ — thứ duy nhất nó thấy là địa chỉ IP. Nên người quản trị phải KHAI: dải 10.30.0.0/16 thuộc site DaNang, dải 10.20.0.0/16 thuộc site HaNoi. Từ đó máy trạm tự định vị: nhìn IP của mình, tra ra site của mình, rồi tìm Domain Controller CÙNG SITE mà hỏi — đăng nhập, đổi mật khẩu, tra nhóm đều gõ cửa gần nhà. Chi nhánh Đà Nẵng ở phần mở đầu chậm vì đúng một lỗ hổng: dải mạng mới chưa được gắn vào site nào, nên máy mù vị trí và đành hỏi vu vơ ra tận Hà Nội.
  - **Đào sâu hơn:** Dấu hiệu nhận biết quên-gắn-subnet là một chi nhánh MỚI chậm một cách khó hiểu dù hạ tầng tại chỗ đầy đủ. Việc dựng DC tại chỗ chỉ là một nửa; nửa kia là ba dòng khai báo subnet-thuộc-site. Quên nửa sau thì DC mới đứng đó làm cảnh — như phần mở đầu bạn vừa thấy.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Lần theo một máy Đà Nẵng lúc đăng nhập, từng bước. Bước 1: máy nhìn địa chỉ của chính nó — 10.30.2.15. Bước 2: nó tra trong AD xem dải 10.30.2.x đã được khai thuộc site nào — thấy site DaNang, vậy là biết mình đang đứng đâu. Bước 3: nó hỏi tiếp: site DaNang có những Domain Controller nào? — thấy DC-DN ngay tầng ba. Bước 4: mọi câu chuyện đăng nhập diễn ra với DC-DN, vài mili giây một câu. Bước 5: thử tưởng tượng bước 2 thất bại vì không ai khai dải này — máy mù vị trí, đành gõ cửa DC bất kỳ trong miền, và tám trăm cây số biến thành nửa phút chờ.
- **Đề:** Chi nhánh mới có DC tại chỗ hẳn hoi mà máy vẫn chạy ra DC thành phố khác hỏi. Thiếu mảnh nào?
  - **Dạng:** trắc nghiệm · **Dải mạng của chi nhánh chưa được khai gắn vào site nào trong AD** ✓ / DC tại chỗ chưa được bật tính năng trả lời các máy trạm ở gần / Đường truyền giữa hai thành phố còn quá nhanh nên máy không phân biệt
  - **Chủ đề gợi ý (tầng 1):** máy định vị bằng lời khai subnet-thuộc-site
  - **Gợi ý (tầng 2):** DC không có nút bật-tắt trả-lời-gần; máy tự tìm DC theo site. Vậy nó tra site của mình từ đâu?
  - **Lời giải (tầng 3):** Thiếu lời khai subnet-thuộc-site. Máy nhìn IP để tra site — dải chưa gắn site thì máy mù vị trí và hỏi vu vơ. Dựng DC tại chỗ mới là một nửa việc; ba dòng khai báo kia là nửa còn lại.
- **Đề:** Site và OU khác nhau ở trục chia. Câu nào nói ĐÚNG?
  - **Dạng:** trắc nghiệm · **OU chia theo tổ chức phòng ban, site chia theo vị trí địa lý của mạng** ✓ / Site chia theo phòng ban còn OU chia theo tòa nhà đặt máy trạm / Hai thứ là một — site chỉ là tên gọi mới của OU từ bản AD gần đây
  - **Chủ đề gợi ý (tầng 1):** một nhân viên kế toán ngồi ở Đà Nẵng thuộc cả hai trục
  - **Gợi ý (tầng 2):** Tài khoản chị kế toán ở Đà Nẵng nằm trong OU nào, còn máy chị ấy đứng trong site nào?
  - **Lời giải (tầng 3):** OU theo tổ chức (kế toán, nhân sự — dù ngồi đâu), site theo địa lý (Hà Nội, Đà Nẵng — dù phòng nào). Hai trục vuông góc: tài khoản vào OU, máy đứng trong site — AD cần cả hai.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: khai subnet gắn site để máy trạm tự tìm được CÁI GÌ ở gần mình?
  - **Dạng:** gõ tay · **Chấp nhận:** dc | domain controller | dc gần nhất | dc gan nhat | domain controller gần nhất | domain controller gan nhat | máy chủ miền | may chu mien | dc cùng site | dc cung site
  - **Chủ đề gợi ý (tầng 1):** máy chủ mà mọi cuộc đăng nhập phải gõ cửa
  - **Gợi ý (tầng 2):** Chính là cái máy đứng tầng ba ở Đà Nẵng mà suýt bị bỏ quên.
  - **Lời giải (tầng 3):** Domain Controller cùng site. Máy nhìn IP → tra ra site → gõ cửa DC gần nhà, thay vì vượt tám trăm cây số hỏi chuyện đăng nhập.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao AD bắt người quản trị phải KHAI subnet gắn site thay vì tự biết máy nào đứng đâu?
  - **Nhóm ý cần chạm:** [không có mắt, khong co mat, không tự biết, khong tu biet, không nhìn thấy, khong nhin thay, mù, mu ] · [ip, địa chỉ, dia chi, dải mạng, dai mang, subnet] · [khai, khai báo, khai bao, gắn, gan , quản trị khai, quan tri khai] · [vị trí, vi tri, địa lý, dia ly, gần, gan nhat, site]
  - **Trả lời mẫu:** Vì AD không có mắt nhìn bản đồ — thứ duy nhất nó thấy là địa chỉ IP, mà IP tự thân không nói lên thành phố nào. Người quản trị phải khai dải nào thuộc site nào; từ lời khai đó máy mới tra được vị trí của mình rồi tìm DC cùng site. Quên khai là máy mù đường, hỏi vu vơ ra tận chi nhánh xa.

**6 · Tổng kết:**
- Site là cụm mạng con gần nhau về địa lý — chung miền nhưng khác chỗ đứng; tầng Site của LSDOU giờ có nghĩa thật.
- OU chia theo tổ chức, site chia theo địa lý — hai trục vuông góc, AD cần cả hai.
- Phải KHAI subnet gắn site: máy nhìn IP tra ra site rồi tìm DC gần nhà — quên khai là chi nhánh chậm khó hiểu.
- *Úp mở bài sau:* Hai site, mỗi bên một DC — tức là hai cuốn sổ cái của cùng một miền. Chúng chép cho nhau bằng cách nào, và nhanh tới đâu? Bài sau có một nhân viên đổi mật khẩu ở Hà Nội rồi lên máy bay.

### Bài: Đoán xem cuốn sổ nào đã kịp chép `m19-bai-2`

**1 · Khởi động (hook):** Chín giờ sáng, anh trưởng phòng được thêm vào nhóm dự án ở Hà Nội. Chín giờ mười, anh gọi từ Đà Nẵng: "vẫn chưa mở được thư mục dự án!" Người trực xanh mặt tưởng mình thao tác hỏng. Mười giờ kém, tự nhiên nó chạy — chẳng ai sửa gì cả. Không có gì hỏng, không có ai nhầm. Vậy trong bốn mươi phút đó, chuyện gì đang xảy ra giữa hai thành phố?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: miền có nhiều Domain Controller thì cuốn sổ tài khoản nằm ở đâu?
  - **Dạng:** trắc nghiệm · **Mỗi DC giữ một bản đầy đủ, và chúng phải chép thay đổi cho nhau** ✓ / Chỉ DC đầu tiên giữ sổ gốc, các DC còn lại hỏi nó từng câu một / Sổ được cắt đôi: mỗi DC giữ nửa danh sách tài khoản của miền
  - **Chủ đề gợi ý (tầng 1):** vì sao chi nhánh vẫn đăng nhập được khi đứt cáp ra trụ sở
  - **Vì sao:** Mỗi DC giữ MỘT BẢN ĐẦY ĐỦ — nhờ vậy đứt cáp giữa hai thành phố thì chi nhánh vẫn tự đăng nhập được bằng DC tại chỗ. Cái giá của sự độc lập đó: các bản sổ phải chép thay đổi cho nhau, và chép thì cần thời gian — đó chính là bốn mươi phút bí ẩn ở phần mở đầu.

**3 · Khám phá (teach):**
- *[m19-replication]* Mỗi Domain Controller giữ một bản đầy đủ của cuốn sổ miền, và mọi thay đổi — thêm user, đổi nhóm, sửa mật khẩu — ghi vào một DC rồi được CHÉP dần sang các DC khác. Đó là replication. Nhịp chép ăn theo site của bài trước: TRONG một site, dây nhanh nên thay đổi lan gần như tức thì; GIỮA hai site, đường vừa chậm vừa đắt nên thay đổi được gom lại, nén nhỏ và gửi THEO LỊCH — thường được đặt cỡ mười lăm phút một chuyến (mặc định của AD là 180 phút — nơi nào cần tươi hơn thì rút xuống), có nơi đặt thưa hơn nữa để tiết kiệm đường truyền.
  - **Đào sâu hơn:** Vì sao không chép tức thì cho khỏe? Vì đường WAN giữa hai thành phố là tài nguyên đắt: hàng nghìn thay đổi lặt vặt mỗi giờ mà chuyến nào cũng chạy tức thì thì đường truyền nghẹt vì việc sổ sách. Gom lại theo chuyến là cái giá hợp lý — miễn là người vận hành BIẾT mình đã chọn cái giá đó, thay vì ngơ ngác như người trực ở phần mở đầu.
- *[m19-do-tre]* Hệ quả vận hành: giữa hai site luôn có một KHE TRỄ. Vừa cấp quyền ở Hà Nội thì trong dăm phút tới vài chục phút, cuốn sổ ở Đà Nẵng vẫn là bản cũ — người dùng trong đó chưa thấy gì, và điều đó KHÔNG PHẢI HỎNG. Phản xạ đúng của người trực: trước khi lao vào sửa một ca "cấp quyền rồi mà chưa có", hỏi hai câu — thay đổi ghi ở site nào, người dùng đang đứng ở site nào? Nếu khác nhau, hãy đợi hết một chuyến chép rồi mới kết luận. Sửa loạn trong khe trễ là cách nhanh nhất biến một ca không-phải-bệnh thành bệnh thật.
  - **Đào sâu hơn:** Một ngoại lệ đáng biết để khỏi hoang mang ngược: ĐỔI MẬT KHẨU không chịu đợi lịch như thay đổi thường — mật khẩu mới được ưu tiên báo ngay về một DC đầu đàn, nên anh nhân viên đổi mật khẩu ở Hà Nội rồi bay vào Đà Nẵng thường vẫn đăng nhập được bằng mật khẩu mới. AD cố tình dành đường khẩn cho thứ người dùng cảm nhận rõ nhất — dạy đúng, không làm tròn: thay đổi thường đi theo lịch, mật khẩu có đường riêng.

**4 · Thử tay (practice, fading 1):**
- **Đề:** 9:00 thêm user vào nhóm tại DC Hà Nội. 9:10 user đó ở Đà Nẵng chưa thấy quyền. Người trực nên làm gì TRƯỚC TIÊN?
  - **Dạng:** trắc nghiệm · **Đối chiếu lịch chép giữa hai site rồi đợi hết một chuyến trước khi kết luận** ✓ / Thêm user vào nhóm lần nữa ngay trên DC Đà Nẵng cho chắc chắn ăn / Khởi động lại DC Đà Nẵng để nó tải lại cuốn sổ mới nhất từ Hà Nội
  - **Chủ đề gợi ý (tầng 1):** khe trễ giữa site không phải là bệnh
  - **Gợi ý (tầng 2):** Thay đổi ghi ở site nào, người dùng đứng site nào? Hai nơi khác nhau thì giữa chúng có gì?
  - **Lời giải (tầng 3):** Đối chiếu lịch chép và đợi hết một chuyến. Ghi đè lần nữa hay khởi động lại DC đều là sửa loạn trong khe trễ — thứ tự nhiên sẽ tự lành lại còn bị tay người khuấy thành bệnh thật.
- **Đề:** Vì sao replication GIỮA hai site đi theo lịch thay vì chép tức thì như trong một site?
  - **Dạng:** trắc nghiệm · **Vì đường giữa hai site chậm và đắt — gom thay đổi rồi nén gửi theo chuyến** ✓ / Vì hai site thuộc hai miền khác nhau nên phải chờ xác nhận của cả hai / Vì luật AD cấm hai DC ở xa nhau trao đổi dữ liệu quá một lần mỗi giờ
  - **Chủ đề gợi ý (tầng 1):** site sinh ra để mô tả đường nhanh và đường chậm
  - **Gợi ý (tầng 2):** Nhớ lại lý do site tồn tại: trong site dây nhanh, giữa site là đường WAN. Đường đắt thì chở hàng kiểu gì?
  - **Lời giải (tầng 3):** Vì đường WAN giữa site vừa chậm vừa đắt — nên thay đổi được gom, nén và gửi theo chuyến. Hai site vẫn chung một miền, và chẳng có luật một-lần-mỗi-giờ nào: lịch chép là thứ người vận hành tự đặt theo túi tiền đường truyền.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: việc các DC chép thay đổi cho nhau để mọi bản sổ giống nhau gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** replication | sao chép | sao chep | nhân bản | nhan ban | đồng bộ | dong bo
  - **Chủ đề gợi ý (tầng 1):** thuật ngữ tiếng Anh bắt đầu bằng repli
  - **Gợi ý (tầng 2):** Tiếng Anh, cùng họ với chữ replica — bản sao.
  - **Lời giải (tầng 3):** Replication. Trong site lan gần như tức thì; giữa site gom lại, nén và đi theo lịch — khe trễ giữa hai site là tính chất, không phải bệnh.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao ca "cấp quyền rồi mà bên kia chưa thấy" thường KHÔNG phải là hỏng, và phản xạ đúng của người trực là gì?
  - **Nhóm ý cần chạm:** [khe trễ, khe tre, độ trễ, do tre, chưa kịp chép, chua kip chep, chưa lan tới, chua lan toi] · [theo lịch, theo lich, chuyến, chuyen, gom, nén, nen ] · [hai site, khác site, khac site, site nào, site nao, đứng ở đâu, dung o dau] · [đợi, doi , chờ, cho het, không sửa loạn, khong sua loan, đừng vội, dung voi]
  - **Trả lời mẫu:** Vì thay đổi ghi ở một site cần thời gian mới chép sang site kia — giữa hai site, sổ đi theo chuyến chứ không tức thì, nên có một khe trễ vài phút tới vài chục phút là bình thường. Phản xạ đúng: hỏi thay đổi ghi ở đâu và người dùng đứng ở đâu; nếu khác site thì đợi hết một chuyến chép rồi mới kết luận, đừng ghi đè hay khởi động lại giữa chừng.

**6 · Tổng kết:**
- Mỗi DC giữ một bản sổ đầy đủ — thay đổi ghi một nơi rồi replication chép dần sang các nơi khác.
- Trong site chép gần như tức thì; giữa site gom, nén, đi theo lịch — vì đường WAN chậm và đắt.
- Khe trễ giữa site là tính chất: cấp quyền rồi bên kia chưa thấy thì đợi hết chuyến chép, đừng sửa loạn.
- *Úp mở bài sau:* Sổ sách đã chảy thông giữa các tòa nhà. Giờ tới câu hỏi khó hơn: QUYỀN nên chảy thế nào từ một con người tới một thư mục? Bài sau bạn được thả vào miền thật với bộ lệnh nhóm mới toanh — và đa số người mới sẽ đi đúng vào cái bẫy đã giăng sẵn.

### Bài: Nối ống nước cho quyền chảy đúng nếp `m19-bai-3`

**1 · Khởi động (hook):** Anh Chí chuyển sang phòng kế toán, cần đọc được thư mục Báo cáo. Cách nhanh nhất ai cũng nghĩ ra: mở thẳng nhóm có quyền đọc rồi nhét anh vào — năm giây, chạy ngay. Sáu tháng sau công ty có ba trăm người, mỗi lần ai đó chuyển phòng là một cơn ác mộng truy vết: ai đang nằm trong nhóm nào, vì sao, và ai cho phép? Cái lối tắt năm giây ấy đắt tới mức nào — và nghề này xếp quyền kiểu gì để ba trăm người vẫn gọn như ba chục?

**2 · Đoán thử (pretest):**
- **Đề:** Thử sức trước khi học: anh Le Van Chi (lvchi) vừa chuyển sang kế toán và cần đọc được Báo cáo. Miền đã có sẵn các nhóm — mò bằng Get-ADGroup -Filter * và Get-ADGroupMember xem quyền đang chảy kiểu gì, rồi xếp anh Chí vào chỗ bạn cho là đúng. Sai cũng không sao — phần này không tính điểm, và bảng mục tiêu sẽ nói thật với bạn.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [10.20.2.5/24] — AD congty.vn: OU [KeToan, KinhDoanh], 2 user sẵn có
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "undefined"
      - phải lôi ra được dòng chứa "undefined"
    - **Lệnh mẫu:** `Add-ADGroupMember KeToan-GG -Members lvchi`
  - **Chủ đề gợi ý (tầng 1):** nhóm nào gom NGƯỜI, nhóm nào giữ QUYỀN
  - **Vì sao:** Nếu bạn nhét lvchi thẳng vào QuyenDocBaoCao-DL: mục tiêu về nhóm quyền bật xanh mà mục tiêu về KeToan-GG vẫn đỏ — đó chính là cái lối tắt năm giây của phần mở đầu, chạy được nhưng sai nếp. Đường đúng chỉ một dòng: Add-ADGroupMember KeToan-GG -Members lvchi. Anh Chí vào nhóm VAI kế toán, mà nhóm vai đã cắm sẵn vào nhóm quyền — quyền tự chảy tới, cả hai mục tiêu cùng xanh. Get-ADGroupMember QuyenDocBaoCao-DL sẽ cho bạn thấy vì sao: thành viên của nó là một NHÓM, không phải từng con người.

**3 · Khám phá (teach):**
- *[m19-agdlp]* Nếp xếp quyền của nghề gói trong bốn chữ AGDLP — một đường ống bốn khúc: Account (con người) vào Global group (nhóm VAI — kế toán, nhân sự); Global group cắm vào Domain Local group (nhóm QUYỀN — được đọc Báo cáo, được sửa Hồ sơ); và Permission (quyền thật trên thư mục) chỉ gắn vào nhóm Domain Local. Người KHÔNG bao giờ chạm thẳng vào quyền. Nghe vòng vèo, nhưng chính các khúc nối đó làm hệ thống sống được với thay đổi: người chuyển phòng — rút khỏi một nhóm vai, cắm vào nhóm vai khác, mọi quyền tự chảy theo; thêm tài nguyên mới — dựng một nhóm quyền, cắm các nhóm vai vào, xong.
  - **Đào sâu hơn:** Đường ống này bạn đã cầm trên tay từ khối engine: Get-ADGroupMember trên một nhóm quyền tử tế sẽ hiện ObjectClass group — thành viên của nó là NHÓM, không phải người. Còn thấy một danh sách dài ObjectClass user nằm thẳng trong nhóm quyền là dấu vết của những lối tắt năm giây chồng chất — mỗi cái tên ở đó là một câu hỏi "ai cho vào, vì sao" không còn ai trả lời được.
- *[m19-gg-dl]* Hai loại nhóm, hai câu hỏi khác nhau. Nhóm GLOBAL trả lời "người này LÀ AI trong tổ chức?" — nó gom người theo vai và đi theo con người: chuyển phòng là đổi nhóm Global. Nhóm DOMAIN LOCAL trả lời "tài nguyên này AI ĐƯỢC ĐỘNG VÀO?" — nó đứng cạnh tài nguyên và giữ quyền: thư mục Báo cáo có nhóm đọc của nó, máy in màu có nhóm in của nó. Vai thì cắm vào quyền, không bao giờ ngược lại — và AD khóa cứng chiều ngược: nhét một nhóm Domain Local vào nhóm Global là máy từ chối thẳng, như bạn sẽ thấy nếu thử.
  - **Đào sâu hơn:** Vì sao luật cứng đó tồn tại? Nhóm Global được thiết kế để mang đi khắp nơi (kể cả sang miền khác khi công ty sáp nhập), còn nhóm Domain Local bị neo tại miền của tài nguyên. Cho DL chui vào GG là để một thứ bị neo trốn trong một thứ hay di chuyển — mâu thuẫn tự thân, nên AD cấm từ gốc chứ không đợi hậu quả.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Đọc một sơ đồ AGDLP mẫu của phòng kế toán, từng khúc ống. Khúc 1 — Account: chị Tran Thi Mai (ttmai), một con người bằng xương thịt. Khúc 2 — Global: ttmai nằm trong KeToan-GG, nhóm VAI của phòng kế toán; nhìn tên nhóm là biết nó gom NGƯỜI. Khúc 3 — Domain Local: KeToan-GG được cắm vào QuyenDocBaoCao-DL, nhóm QUYỀN đứng cạnh thư mục Báo cáo; gõ Get-ADGroupMember QuyenDocBaoCao-DL sẽ thấy thành viên duy nhất là một nhóm — ObjectClass group. Khúc 4 — Permission: thư mục Báo cáo cấp quyền đọc cho đúng một cái tên: QuyenDocBaoCao-DL. Giờ thử chạy nước qua ống: chị Mai đọc được Báo cáo vì Mai thuộc KeToan-GG, KeToan-GG nằm trong QuyenDocBaoCao-DL, và nhóm đó có quyền đọc — ba khúc nối, không khúc nào chạm thẳng người vào quyền.
- **Đề:** Gõ Get-ADGroupMember trên một nhóm QUYỀN được xếp đúng nếp AGDLP, cột ObjectClass sẽ hiện gì?
  - **Dạng:** trắc nghiệm · **group — thành viên của nhóm quyền là các nhóm vai, không phải từng người** ✓ / user — nhóm quyền phải liệt kê đủ từng con người được động vào tài nguyên / computer — vì quyền gắn với máy trạm chứ không gắn với tài khoản người
  - **Chủ đề gợi ý (tầng 1):** thành viên của nhóm quyền là loại đối tượng nào
  - **Gợi ý (tầng 2):** Trong đường ống AGDLP, cái gì được cắm vào nhóm Domain Local?
  - **Lời giải (tầng 3):** ObjectClass group. Nhóm quyền chứa các nhóm vai — thấy một dãy user nằm thẳng trong đó là dấu vết lối tắt chồng chất, mỗi tên là một câu hỏi không ai còn trả lời được.
- **Đề:** Trong chuỗi AGDLP, quyền thật trên thư mục chỉ được gắn vào loại nhóm nào?
  - **Dạng:** gõ tay · **Chấp nhận:** domain local | domainlocal | nhóm domain local | nhom domain local | dl | nhóm quyền | nhom quyen | domain local group
  - **Chủ đề gợi ý (tầng 1):** chữ DL trong bốn chữ cái
  - **Gợi ý (tầng 2):** Không phải nhóm vai, càng không phải từng người — là loại nhóm đứng cạnh tài nguyên.
  - **Lời giải (tầng 3):** Nhóm Domain Local — nhóm quyền đứng cạnh tài nguyên. Người vào nhóm vai (Global), vai cắm vào quyền (Domain Local), quyền gắn vào tài nguyên: ba khúc nối của một đường ống.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: xếp bốn khúc của đường ống quyền theo đúng thứ tự nước chảy.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Account — con người có tài khoản
    2. Global group — nhóm vai gom người
    3. Domain Local group — nhóm quyền cạnh tài nguyên
    4. Permission — quyền thật trên thư mục
  - **Chủ đề gợi ý (tầng 1):** bốn chữ cái A G DL P đọc xuôi
  - **Gợi ý (tầng 2):** Bắt đầu từ con người, kết thúc ở quyền trên thư mục — đúng thứ tự bốn chữ cái.
  - **Lời giải (tầng 3):** Account → Global group → Domain Local group → Permission. Người vào vai, vai cắm vào quyền, quyền gắn tài nguyên — không khúc nào được nhảy cóc.
- **Tự giải thích:** Giải thích bằng lời của bạn: nhét thẳng một người vào nhóm quyền thì chạy được ngay — vậy nó đắt ở chỗ nào?
  - **Nhóm ý cần chạm:** [chuyển phòng, chuyen phong, đổi vai, doi vai, thay đổi, thay doi, ba trăm người, ba tram nguoi] · [truy vết, truy vet, ai cho vào, ai cho vao, vì sao, vi sao, không ai trả lời, khong ai tra loi] · [từng nhóm, tung nhom, từng tài nguyên, tung tai nguyen, sửa từng, sua tung, dọn từng, don tung] · [nhóm vai, nhom vai, global, tự chảy, tu chay, quyền theo vai, quyen theo vai]
  - **Trả lời mẫu:** Nó đắt ở ngày mai: người chuyển phòng thì quyền cũ không tự rút — phải nhớ ra từng nhóm quyền đã nhét họ vào mà dọn tay, và sáu tháng sau chẳng ai còn trả lời được ai cho vào, vì sao. Đi qua nhóm vai thì mọi thay đổi chỉ chạm một chỗ: đổi nhóm Global là toàn bộ quyền tự chảy theo vai mới, còn sơ đồ thì tự kể được chuyện của nó.

**6 · Tổng kết:**
- AGDLP: người vào nhóm vai (Global), vai cắm vào nhóm quyền (Domain Local), quyền gắn tài nguyên.
- Global trả lời "là ai trong tổ chức", Domain Local trả lời "tài nguyên này ai được động" — vai cắm vào quyền, không ngược lại.
- Nhét thẳng người vào nhóm quyền chạy được ngay nhưng đắt ở ngày mai — mọi thay đổi và truy vết đều thành thủ công.
- *Úp mở bài sau:* Bạn đã thấy đường ống mẫu. Bài sau là ca thật đầu tiên: người mới về phòng, đường ống có sẵn — điền nốt mắt xích còn thiếu bằng một dòng lệnh.

### Bài: Điền nốt mắt xích cho người mới về phòng `m19-bai-4`

**1 · Khởi động (hook):** Chị Phạm Thị Lan nhận việc ở phòng nhân sự từ thứ hai. Thứ tư chị vẫn ngồi chờ ai đó "cấp quyền vào hồ sơ" — phiếu yêu cầu chạy lòng vòng qua ba chữ ký. Trong khi ở công ty xếp quyền tử tế, toàn bộ việc đó là MỘT dòng lệnh năm giây của người trực. Khoảng cách giữa ba ngày và năm giây nằm ở đâu?

**2 · Đoán thử (pretest):**
- **Đề:** Người mới về phòng nhân sự. Theo nếp AGDLP, người trực cần đụng vào NHÓM nào?
  - **Dạng:** trắc nghiệm · **Chỉ nhóm vai Global của phòng nhân sự — quyền sẽ tự chảy qua các khúc sau** ✓ / Mọi nhóm quyền Domain Local có liên quan tới từng thư mục của phòng / Không nhóm nào — cấp quyền đọc ghi thẳng trên từng thư mục cho nhanh
  - **Chủ đề gợi ý (tầng 1):** một người mới = một mắt xích ở khúc nào
  - **Vì sao:** Chỉ nhóm vai Global. Đường ống đã nối sẵn từ trước: vai cắm vào các nhóm quyền, quyền gắn vào tài nguyên — người mới chỉ cần vào đúng vai là mọi thứ tự chảy. Đụng vào từng nhóm quyền hay từng thư mục chính là con đường ba-ngày-ba-chữ-ký của phần mở đầu.

**3 · Khám phá (teach):**
- *[m19-vong-doi]* Sức mạnh thật của AGDLP lộ ra ở VÒNG ĐỜI NHÂN SỰ — thứ xảy ra hàng tuần ở mọi công ty. Người MỚI: thêm vào nhóm vai của phòng, một dòng lệnh, toàn bộ quyền cần thiết tự chảy tới. Người CHUYỂN PHÒNG: rút khỏi nhóm vai cũ, thêm vào nhóm vai mới — quyền cũ tự rút, quyền mới tự tới, không sót lại mẩu quyền nào của đời trước. Người NGHỈ: khóa tài khoản là mọi cửa đóng cùng lúc. Cả ba kịch bản chỉ chạm vào MỘT chỗ: quan hệ giữa con người và nhóm vai. Không kịch bản nào phải mở từng thư mục, từng nhóm quyền ra soát.
  - **Đào sâu hơn:** Phạm vi lệnh của app dừng ở chiều THÊM (Add-ADGroupMember) — chiều rút khỏi nhóm ngoài đời là Remove-ADGroupMember, cùng ngữ pháp. Điều đáng nhớ không phải cái tên lệnh, mà là chỗ đứng của nó: mọi biến động nhân sự đều xử lý ở khúc Account–Global, hai khúc sau của đường ống không ai phải chạm tới. Đó là phép đo một hệ thống quyền tử tế: ngày bận rộn nhất của phòng nhân sự, người trực vẫn chỉ gõ những lệnh một dòng.

**4 · Thử tay (practice, fading 1):**
- **Đề:** Chị Phạm Thị Lan (ptlan) chính thức về phòng nhân sự. Đường ống của phòng đã nối sẵn: NhanSu-GG cắm trong QuyenSuaHoSo-DL. Điền nốt mắt xích còn thiếu để chị Lan sửa được hồ sơ — và nhớ tra lại bằng Get-ADGroupMember cho chắc tay.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [10.20.2.5/24] — AD congty.vn: OU [NhanSu, KeToan], 2 user sẵn có
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "undefined"
      - phải lôi ra được dòng chứa "undefined"
    - **Lệnh mẫu:** `Add-ADGroupMember NhanSu-GG -Members ptlan`
  - **Chủ đề gợi ý (tầng 1):** một dòng Add vào đúng nhóm VAI
  - **Gợi ý (tầng 2):** Cú pháp khuyết: Add-ADGroupMember <nhóm vai của phòng> -Members <sam của chị Lan>. Nhóm vai là cái có đuôi GG.
  - **Lời giải (tầng 3):** Add-ADGroupMember NhanSu-GG -Members ptlan. Chị Lan vào nhóm vai, mà NhanSu-GG đã nằm sẵn trong QuyenSuaHoSo-DL nên cả hai mục tiêu cùng xanh — quyền chảy tới mà không ai phải chạm vào nhóm quyền hay thư mục.
- **Đề:** Anh Nam chuyển từ kế toán sang kinh doanh. Theo nếp AGDLP, hai động tác của người trực là gì?
  - **Dạng:** trắc nghiệm · **Rút anh khỏi nhóm vai kế toán và thêm vào nhóm vai kinh doanh — hết** ✓ / Soát từng nhóm quyền của kế toán để gỡ tên anh rồi cấp lại từ đầu / Khóa tài khoản cũ và tạo cho anh một tài khoản mới bên kinh doanh
  - **Chủ đề gợi ý (tầng 1):** biến động nhân sự chỉ chạm khúc nào của ống
  - **Gợi ý (tầng 2):** Quyền cũ tự rút khi cái gì thay đổi? Người và VAI — không phải người và từng thư mục.
  - **Lời giải (tầng 3):** Đổi nhóm vai: rút khỏi KeToan-GG, thêm vào KinhDoanh-GG. Quyền cũ tự rút, quyền mới tự tới — không sót mẩu quyền nào của đời trước, không ai phải soát từng nhóm quyền, càng không phải đập tài khoản làm lại.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: muốn xem một nhóm đang chứa những ai (người hay nhóm), bạn gõ lệnh nào?
  - **Dạng:** gõ tay · **Chấp nhận:** get-adgroupmember | get adgroupmember | getadgroupmember | get-adgroupmember -identity | lệnh get-adgroupmember | lenh get-adgroupmember
  - **Chủ đề gợi ý (tầng 1):** họ Get, danh từ GroupMember
  - **Gợi ý (tầng 2):** Động từ Get, danh từ ADGroupMember — đúng nếp động từ gạch danh từ của Module 12.
  - **Lời giải (tầng 3):** Get-ADGroupMember -Identity <tên nhóm>. Cột ObjectClass của nó nói thật nhóm đang chứa NGƯỜI hay chứa NHÓM — công cụ soi nếp AGDLP nhanh nhất trong tay bạn.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao ở hệ thống xếp đúng nếp, người chuyển phòng KHÔNG bao giờ mang theo quyền của phòng cũ?
  - **Nhóm ý cần chạm:** [rút khỏi, rut khoi, ra khỏi nhóm, ra khoi nhom, rời nhóm vai, roi nhom vai, đổi nhóm, doi nhom] · [quyền theo vai, quyen theo vai, quyền qua nhóm, quyen qua nhom, tự rút, tu rut, tự mất, tu mat] · [không gắn thẳng, khong gan thang, không trực tiếp, khong truc tiep, không chạm quyền, khong cham quyen] · [nhóm vai cũ, nhom vai cu, vai mới, vai moi, global]
  - **Trả lời mẫu:** Vì quyền của họ chưa bao giờ gắn thẳng vào con người — tất cả đi qua nhóm vai. Rút họ khỏi nhóm vai cũ là mọi quyền của phòng cũ tự đứt theo, thêm vào nhóm vai mới là quyền mới tự chảy tới. Không có mẩu quyền nào dính trực tiếp vào người để mà sót lại.

**6 · Tổng kết:**
- Người mới về phòng = một dòng Add vào nhóm vai — đường ống nối sẵn lo phần còn lại.
- Chuyển phòng = đổi nhóm vai; nghỉ việc = khóa tài khoản — mọi biến động chỉ chạm khúc Account–Global.
- Get-ADGroupMember với cột ObjectClass là máy soi nếp: nhóm quyền tử tế chứa NHÓM, không chứa người lẻ.
- *Úp mở bài sau:* Còn một câu hỏi treo từ đầu module: chính người trực lấy đâu ra quyền để gõ những lệnh này — chẳng lẽ phát cho cả đội helpdesk chức admin toàn miền? Bài cuối: giao chìa khóa mà không giao cả chùm.

### Bài: Giao chìa khóa hẹp cho đúng người `m19-bai-5`

**1 · Khởi động (hook):** Đội helpdesk mỗi ngày nhận chục cuộc "em quên mật khẩu". Muốn họ tự xử được thì phải cho quyền reset mật khẩu — và cách nhanh nhất ai cũng biết: thêm cả đội vào Domain Admins. Từ hôm đó, ba bạn trẻ mới ra trường cầm trong tay quyền xóa được CẢ MIỀN — để làm một việc bé bằng cái reset. Nghề này có cách nào trao đúng một chiếc chìa, thay vì cả chùm chìa khóa của tòa nhà?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: quyền mà đội helpdesk THẬT SỰ cần cho việc "em quên mật khẩu" trông như thế nào?
  - **Dạng:** trắc nghiệm · **Đúng thao tác reset mật khẩu, trên đúng nhánh OU chứa nhân viên thường** ✓ / Quyền quản trị toàn miền, vì reset mật khẩu đụng vào cơ sở dữ liệu AD / Không cần quyền gì — helpdesk chỉ việc gọi lên cấp trên làm hộ mỗi lần
  - **Chủ đề gợi ý (tầng 1):** việc bé thì chìa khóa bé
  - **Vì sao:** Đúng thao tác, đúng phạm vi: reset mật khẩu, trên nhánh OU nhân viên thường — không đụng được tài khoản sếp, càng không đụng cấu trúc miền. Admin toàn miền cho một việc bé là treo rủi ro cả tòa nhà vào túi áo thực tập sinh; còn "gọi cấp trên làm hộ" thì chính là cái cảnh chờ ba ngày của bài trước.

**3 · Khám phá (teach):**
- *[m19-delegation]* AD có cơ chế trao chìa hẹp tên là DELEGATION — ủy quyền: chọn một NHÁNH OU, chọn một BỘ THAO TÁC, rồi trao đúng gói đó cho một nhóm. Ví dụ kinh điển: nhóm Helpdesk-GG được reset mật khẩu và mở khóa tài khoản TRÊN nhánh OU NhanVien — hết. Không đụng được OU Lãnh đạo, không sửa được nhóm, không sờ được cấu trúc miền. Ba đặc điểm làm nên một cú ủy quyền tử tế: hẹp THAO TÁC (chỉ việc cần), hẹp PHẠM VI (chỉ nhánh cần), và trao cho NHÓM chứ không cho cá nhân — người vào đội thì vào nhóm, rời đội thì rút, đúng nếp AGDLP bạn vừa học.
  - **Đào sâu hơn:** Vì sao trao cho nhóm quan trọng đến thế? Vì ủy quyền cho cá nhân là quay lại đúng cái bẫy lối tắt: nửa năm sau không ai nhớ đã trao gì cho ai, người nghỉ việc mang theo quyền mồ côi nằm rải rác trên từng nhánh OU. Trao cho nhóm thì câu hỏi "ai đang có quyền này" luôn trả lời được bằng một lệnh Get-ADGroupMember — và thu hồi là một động tác rút khỏi nhóm. Quyền tối thiểu đủ dùng cộng với truy vết được: đó là hai chân của mọi hệ thống ủy quyền đứng vững.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Phòng dự án tuyển hai kỹ sư mới: Vu Van Long (vvlong) và Do Thi Thu (dtthu). Cả hai phải vào được kho tài liệu dự án. Miền đã dựng sẵn các nhóm — tự tra, tự quyết định, tự xếp cho đúng nếp; bảng mục tiêu sẽ chấm sống từng bước của bạn.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [10.20.2.5/24] — AD congty.vn: OU [DuAn, KeToan], 4 user sẵn có
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "undefined"
      - phải lôi ra được dòng chứa "undefined"
      - phải lôi ra được dòng chứa "undefined"
      - phải lôi ra được dòng chứa "undefined"
    - **Lệnh mẫu:** `Add-ADGroupMember DuAn-GG -Members vvlong,dtthu`
  - **Chủ đề gợi ý (tầng 1):** hai người, một nhóm vai, một dòng lệnh
  - **Gợi ý (tầng 2):** Tra Get-ADGroupMember QuyenKhoTaiLieu-DL xem nhóm quyền đang chứa nhóm vai nào — rồi Add cả hai người vào đúng nhóm vai đó (tham số -Members nhận danh sách cách nhau dấu phẩy).
  - **Lời giải (tầng 3):** Add-ADGroupMember DuAn-GG -Members vvlong,dtthu. Cả hai vào nhóm vai dự án; DuAn-GG đã cắm sẵn trong QuyenKhoTaiLieu-DL nên bốn mục tiêu cùng xanh. Nhét thẳng vào nhóm quyền thì hai mục tiêu nhóm vai vẫn đỏ — đúng cái lối tắt mà module này dạy bạn tránh.
- **Đề:** Cú ủy quyền nào dưới đây là TỬ TẾ theo chuẩn của bài?
  - **Dạng:** trắc nghiệm · **Nhóm Helpdesk-GG được reset mật khẩu trên đúng nhánh OU NhanVien** ✓ / Từng bạn helpdesk được ủy quyền riêng cho gọn từng con người một / Nhóm Helpdesk-GG vào Domain Admins nhưng mọi người hứa chỉ dùng để reset
  - **Chủ đề gợi ý (tầng 1):** hẹp thao tác, hẹp phạm vi, trao cho nhóm
  - **Gợi ý (tầng 2):** Ba tiêu chí: đúng việc, đúng nhánh, và trao cho ai để còn truy vết được?
  - **Lời giải (tầng 3):** Nhóm Helpdesk-GG + đúng thao tác + đúng nhánh OU — đủ ba chân: hẹp thao tác, hẹp phạm vi, trao cho nhóm. Ủy quyền cho từng cá nhân là gieo quyền mồ côi; còn lời hứa "chỉ dùng để reset" không phải là một cơ chế bảo mật.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: cơ chế trao một bộ thao tác hẹp trên một nhánh OU cho một nhóm — không phát admin — gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** delegation | ủy quyền | uy quyen | delegation of control | ủy quyền trên ou | uy quyen tren ou
  - **Chủ đề gợi ý (tầng 1):** tiếng Việt hai chữ, tiếng Anh một chữ
  - **Gợi ý (tầng 2):** Chữ tiếng Anh cùng họ với delegate — người được cử đi thay.
  - **Lời giải (tầng 3):** Delegation — ủy quyền. Hẹp thao tác, hẹp phạm vi, trao cho nhóm: helpdesk làm được việc của mình mà chùm chìa khóa của tòa nhà vẫn nằm nguyên trong két.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao thêm helpdesk vào Domain Admins là sai NGAY CẢ KHI họ chỉ định dùng nó để reset mật khẩu?
  - **Nhóm ý cần chạm:** [quyền tối thiểu, quyen toi thieu, đủ dùng, du dung, việc bé, viec be, chìa hẹp, chia hep] · [cả miền, ca mien, toàn miền, toan mien, mọi thứ, moi thu, cả tòa nhà, ca toa nha] · [lộ, lo , mất tài khoản, mat tai khoan, bị chiếm, bi chiem, rủi ro, rui ro, kẻ tấn công, ke tan cong] · [lời hứa, loi hua, không phải cơ chế, khong phai co che, ý định, y dinh, nhầm tay, nham tay]
  - **Trả lời mẫu:** Vì quyền không đo bằng ý định mà đo bằng thứ có thể xảy ra: một tài khoản Domain Admins bị lộ, bị lừa, hay lỡ tay là cả miền lãnh đủ — bất kể chủ nhân của nó tử tế đến đâu. Lời hứa chỉ-dùng-để-reset không phải cơ chế. Quyền tối thiểu đủ dùng thu nhỏ bán kính sát thương: chìa hẹp thì mất chìa cũng chỉ mất một cánh cửa.

**6 · Tổng kết:**
- Delegation: trao đúng thao tác, trên đúng nhánh OU, cho một NHÓM — không phát admin toàn miền.
- Trao cho nhóm để truy vết bằng một lệnh và thu hồi bằng một động tác rút — không gieo quyền mồ côi.
- Quyền đo bằng thứ có thể xảy ra, không đo bằng ý định — chìa hẹp thì mất chìa chỉ mất một cửa.
- *Úp mở bài sau:* Miền đã có trật tự: đúng người, đúng vai, đúng chìa. Nhưng hệ thống tử tế đến mấy cũng sẽ có ngày trục trặc — và lúc đó thứ cứu bạn là những dòng NHẬT KÝ nó để lại. Module sau: nhìn thấy sự cố trước cả người dùng.

### Khái niệm & flashcard (8)

- **Site trong AD** `m19-site` — Cụm mạng con gần nhau về địa lý, nối nhau bằng đường nhanh — chung miền nhưng khác chỗ đứng; tầng Site của LSDOU áp chính sách theo vị trí
  - Ẩn dụ: Như các chi nhánh của một dòng họ: vẫn chung gia phả, nhưng ai ở tòa nào thì sinh hoạt ở tòa đó — việc chung mới gửi thư qua lại giữa các tòa.
  - Thẻ ôn: *Site khác OU ở trục chia nào?* → Site chia theo ĐỊA LÝ (cụm subnet gần nhau, đường nhanh — Hà Nội, Đà Nẵng), OU chia theo TỔ CHỨC (kế toán, nhân sự — dù ngồi đâu). Hai trục vuông góc: tài khoản nằm trong OU, máy đứng trong site; GPO gắn site áp theo vị trí ngồi.
- **Subnet gắn site** `m19-subnet-site` — Lời khai dải-nào-thuộc-nơi-nào trong AD; máy nhìn IP của mình tra ra site rồi tìm DC cùng site mà hỏi
  - Ẩn dụ: Như bảng mã vùng điện thoại dán ở tổng đài: nhìn đầu số biết người gọi ở tỉnh nào mà nối cho tổng đài viên gần đó — không có bảng thì cuộc nào cũng dồn về trụ sở.
  - Thẻ ôn: *Chi nhánh mới có DC tại chỗ mà đăng nhập vẫn chậm khó hiểu — nghi phạm số một?* → Dải mạng của chi nhánh chưa được khai gắn vào site. Máy nhìn IP để tra site của mình — dải vô chủ thì máy mù vị trí, gõ cửa DC bất kỳ (thường ở thành phố khác). Dựng DC tại chỗ chỉ là nửa việc; khai subnet-thuộc-site là nửa còn lại.
- **Replication giữa DC** `m19-replication` — Mỗi DC giữ một bản sổ miền đầy đủ; thay đổi ghi một nơi rồi chép dần sang nơi khác — trong site tức thì, giữa site nén và theo lịch
  - Ẩn dụ: Như các chi nhánh ngân hàng cùng giữ một cuốn sổ cái: bút toán ghi ở đâu cũng được, nhưng cuối mỗi chuyến xe liên tỉnh các chi nhánh mới khớp sổ với nhau.
  - Thẻ ôn: *Replication trong site và giữa site khác nhau thế nào, và vì sao?* → Trong site: dây nhanh, thay đổi lan gần như tức thì. Giữa site: đường WAN chậm và đắt nên thay đổi được gom, nén, gửi theo lịch (thường đặt cỡ 15 phút một chuyến; mặc định gốc của AD là 180 phút). Ngoại lệ đáng nhớ: đổi mật khẩu có đường ưu tiên riêng, không đợi lịch.
- **Khe trễ giữa site** `m19-do-tre` — Quãng thời gian thay đổi ghi ở site này chưa lan tới site kia — là tính chất của hệ thống, không phải bệnh
  - Ẩn dụ: Như gửi tiền ở quầy tỉnh này rồi lập tức rút ở tỉnh khác: sổ bên kia chưa kịp khớp thì máy báo thiếu — đợi chuyến khớp sổ, không phải ngân hàng mất tiền.
  - Thẻ ôn: *Cấp quyền ở site A, người dùng ở site B chưa thấy — người trực làm gì trước tiên?* → Hỏi hai câu: thay đổi ghi ở site nào, người dùng đứng site nào. Khác site thì đối chiếu lịch replication và đợi hết một chuyến chép rồi mới kết luận — ghi đè lần nữa hay khởi động lại DC là sửa loạn trong khe trễ, biến ca không-phải-bệnh thành bệnh thật.
- **AGDLP** `m19-agdlp` — Nếp xếp quyền bốn khúc: Account vào Global group (vai), Global cắm vào Domain Local group (quyền), Permission chỉ gắn vào Domain Local
  - Ẩn dụ: Như đường ống nước bốn khúc nối sẵn: người là nguồn nước, vai là ống nhánh, quyền là ống gom, thư mục là vòi — nước chảy được vì các khúc đã cắm nhau, không ai nối nguồn thẳng vào vòi.
  - Thẻ ôn: *Đọc xuôi bốn khúc của chuỗi AGDLP và việc mỗi khúc đảm nhận?* → Account (con người) → Global group (nhóm VAI gom người theo phòng ban) → Domain Local group (nhóm QUYỀN đứng cạnh tài nguyên) → Permission (quyền thật trên thư mục, chỉ gắn vào nhóm DL). Người không bao giờ chạm thẳng vào quyền.
- **Global vs Domain Local** `m19-gg-dl` — Global gom NGƯỜI theo vai và đi theo con người; Domain Local giữ QUYỀN và đứng cạnh tài nguyên — vai cắm vào quyền, AD cấm chiều ngược
  - Ẩn dụ: Như thẻ nhân viên và ổ khóa cửa: thẻ đi theo người (đổi phòng là đổi thẻ), ổ khóa đứng yên cạnh cửa — người ta lập trình cho Ổ nhận loại thẻ nào, chứ không nhét ổ khóa vào túi áo nhân viên.
  - Thẻ ôn: *Nhóm Global và Domain Local mỗi loại trả lời câu hỏi gì, và luật cứng giữa chúng?* → Global: "người này LÀ AI trong tổ chức" — gom người theo vai, đi theo con người. Domain Local: "tài nguyên này AI ĐƯỢC ĐỘNG" — giữ quyền, neo cạnh tài nguyên. Vai cắm vào quyền; chiều ngược (DL chui vào GG) bị AD từ chối thẳng.
- **Vòng đời nhân sự trong AGDLP** `m19-vong-doi` — Người mới = thêm vào nhóm vai; chuyển phòng = đổi nhóm vai; nghỉ = khóa tài khoản — mọi biến động chỉ chạm khúc Account–Global
  - Ẩn dụ: Như đổi chỗ ở trong khu tập thể có sổ trực chung: chỉ cần sửa một dòng tên-thuộc-nhà-nào, còn điện nước chìa khóa của căn mới tự theo về — không phải đi đấu lại từng đường dây.
  - Thẻ ôn: *Ba kịch bản nhân sự (mới, chuyển phòng, nghỉ) xử lý thế nào trong hệ AGDLP tử tế?* → Mới: một dòng Add vào nhóm vai của phòng — quyền tự chảy. Chuyển phòng: rút khỏi vai cũ, thêm vào vai mới — quyền cũ tự đứt, không sót mẩu nào. Nghỉ: khóa tài khoản — mọi cửa đóng cùng lúc. Cả ba chỉ chạm quan hệ người–nhóm vai.
- **Delegation (ủy quyền)** `m19-delegation` — Trao một bộ thao tác hẹp, trên một nhánh OU, cho một nhóm — helpdesk làm được việc mà không cầm admin toàn miền
  - Ẩn dụ: Như giao cho bác bảo vệ chiếc chìa mở đúng phòng họp tầng ba: bác làm trọn việc của mình, còn chùm chìa khóa của cả tòa nhà vẫn nằm trong két giám đốc.
  - Thẻ ôn: *Ba đặc điểm của một cú ủy quyền tử tế trong AD?* → Hẹp THAO TÁC (chỉ việc cần — vd reset mật khẩu), hẹp PHẠM VI (chỉ nhánh OU cần — vd NhanVien, không đụng Lãnh đạo), và trao cho NHÓM chứ không cho cá nhân — để truy vết bằng một lệnh Get-ADGroupMember và thu hồi bằng một động tác rút khỏi nhóm.

### Bài kiểm tra module (pool 15 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Site trong AD là gì?
  - **Dạng:** trắc nghiệm · **Cụm mạng con gần nhau về địa lý, nối nhau bằng đường nhanh, chung một miền** ✓ / Một nhánh phòng ban trong cây tổ chức, chứa tài khoản của nhân viên nhánh đó / Một miền con tách riêng cho chi nhánh, có bộ tài khoản độc lập với trụ sở
  - **Chủ đề gợi ý (tầng 1):** trục địa lý, không phải trục tổ chức
  - **Vì sao:** Site chia theo địa lý: cụm subnet gần nhau, dây nhanh — vẫn chung miền, chung bộ tài khoản. Nhánh phòng ban là OU (trục tổ chức); miền con là chuyện khác hẳn, chi nhánh trong bài vẫn nằm nguyên trong một miền.
- **Đề:** Khai subnet gắn site giúp máy trạm tự tìm được cái gì ở gần mình?
  - **Dạng:** gõ tay · **Chấp nhận:** dc | domain controller | dc gần nhất | dc gan nhat | dc cùng site | dc cung site | domain controller cùng site | domain controller cung site | máy chủ miền | may chu mien
  - **Chủ đề gợi ý (tầng 1):** máy chủ mà cuộc đăng nhập nào cũng phải gõ cửa
  - **Vì sao:** Domain Controller cùng site. Máy nhìn IP của mình → tra lời khai subnet-thuộc-site → biết site của mình → hỏi DC gần nhà. Quên khai là chi nhánh mới chậm khó hiểu dù DC đứng ngay tầng trên.
- **Đề:** 9:00 thêm user vào nhóm ở DC Hà Nội; 9:10 tại Đà Nẵng quyền chưa xuất hiện. Cách hiểu ĐÚNG?
  - **Dạng:** trắc nghiệm · **Bình thường — giữa hai site, thay đổi đi theo lịch chép nên có khe trễ** ✓ / Thao tác thêm nhóm đã thất bại và cần được thực hiện lại ngay lập tức / DC Đà Nẵng đã hỏng dịch vụ sao chép và cần khởi động lại khẩn cấp
  - **Chủ đề gợi ý (tầng 1):** khe trễ giữa site là tính chất
  - **Vì sao:** Giữa hai site, replication gom thay đổi và đi theo lịch — mươi phút chưa thấy là nằm trong khe trễ bình thường. Làm lại hay khởi động lại DC lúc này là sửa loạn một ca không-phải-bệnh.
- **Đề:** Vì sao replication GIỮA site không chạy tức thì như TRONG site?
  - **Dạng:** trắc nghiệm · **Đường WAN giữa site chậm và đắt — thay đổi được gom, nén, gửi theo chuyến** ✓ / Hai site bắt buộc thuộc hai miền nên mọi trao đổi phải qua bước xác thực chéo / AD giới hạn cứng mỗi giờ một lần để bảo vệ cơ sở dữ liệu khỏi ghi đè
  - **Chủ đề gợi ý (tầng 1):** site sinh ra để mô tả đường nhanh, đường chậm
  - **Vì sao:** Site mô tả sự thật đường truyền: trong site dây nhanh nên chép tức thì; giữa site là WAN chậm và đắt nên gom chuyến. Hai site vẫn chung miền, và lịch chép do người vận hành đặt chứ không có giới hạn cứng nào.
- **Đề:** Xếp bốn khúc của chuỗi AGDLP theo đúng chiều quyền chảy:
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Account — con người có tài khoản
    2. Global group — nhóm vai gom người
    3. Domain Local group — nhóm quyền cạnh tài nguyên
    4. Permission — quyền thật trên thư mục
  - **Chủ đề gợi ý (tầng 1):** đọc xuôi bốn chữ cái A G DL P
  - **Vì sao:** Account → Global → Domain Local → Permission: người vào vai, vai cắm vào quyền, quyền gắn tài nguyên. Chuỗi này là xương sống của cả module — không khúc nào được nhảy cóc.
- **Đề:** Nhóm GLOBAL trong nếp AGDLP gom cái gì?
  - **Dạng:** trắc nghiệm · **Gom NGƯỜI theo vai — kế toán, nhân sự — và đi theo con người** ✓ / Gom QUYỀN của một tài nguyên — ai được đọc, ai được sửa thư mục đó / Gom MÁY TRẠM theo tầng nhà để tiện áp chính sách phần mềm chung
  - **Chủ đề gợi ý (tầng 1):** nhóm trả lời câu hỏi là-ai
  - **Vì sao:** Global gom người theo VAI — nó trả lời "người này là ai trong tổ chức" và đi theo con người khi họ chuyển vai. Gom quyền là việc của Domain Local; máy trạm theo tầng là chuyện của OU/GPO.
- **Đề:** Nhóm DOMAIN LOCAL trong nếp AGDLP dùng để làm gì?
  - **Dạng:** trắc nghiệm · **Giữ quyền của một tài nguyên — quyền thật trên thư mục chỉ gắn vào nó** ✓ / Gom người của một chi nhánh để chào cờ điểm danh mỗi sáng thứ hai / Chứa các tài khoản quản trị miền được phép sửa cấu trúc thư mục AD
  - **Chủ đề gợi ý (tầng 1):** nhóm đứng cạnh tài nguyên
  - **Vì sao:** Domain Local là nhóm QUYỀN: nó đứng cạnh tài nguyên và là cái tên duy nhất được gắn quyền thật. Thành viên của nó là các nhóm vai — không phải người lẻ, càng không phải chỗ chứa admin.
- **Đề:** Thao tác nào bị AD TỪ CHỐI THẲNG, không cần đợi hậu quả?
  - **Dạng:** trắc nghiệm · **Nhét một nhóm Domain Local vào trong một nhóm Global** ✓ / Nhét một nhóm Global vào trong một nhóm Domain Local / Thêm một người dùng vào cùng lúc hai nhóm Global khác nhau
  - **Chủ đề gợi ý (tầng 1):** chiều ngược của đường ống
  - **Vì sao:** Global không chứa được Domain Local — DL bị neo cạnh tài nguyên còn GG sinh ra để mang đi, nên AD cấm từ gốc. Chiều xuôi (GG vào DL) chính là nếp AGDLP; một người thuộc nhiều nhóm vai là chuyện thường ngày.
- **Đề:** Chị Hoa chuyển từ nhân sự sang kế toán. Trong hệ AGDLP tử tế, người trực làm gì?
  - **Dạng:** trắc nghiệm · **Rút chị khỏi NhanSu-GG, thêm vào KeToan-GG — quyền tự đổi theo vai** ✓ / Soát mọi nhóm quyền có tên chị để gỡ từng chỗ rồi cấp lại từ đầu / Giữ nguyên nhóm cũ và cấp thêm quyền kế toán thẳng vào tài khoản chị
  - **Chủ đề gợi ý (tầng 1):** biến động nhân sự chỉ chạm khúc người–vai
  - **Vì sao:** Đổi nhóm vai là xong: quyền nhân sự tự đứt, quyền kế toán tự chảy. Soát từng nhóm quyền là hệ quả của lối tắt ngày trước; còn giữ vai cũ + cấp thẳng là vừa sót quyền cũ vừa gieo thêm quyền mồ côi.
- **Đề:** Cơ chế trao một bộ thao tác hẹp trên một nhánh OU cho một nhóm — không phát admin toàn miền — gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** delegation | ủy quyền | uy quyen | delegation of control | ủy quyền trên ou | uy quyen tren ou
  - **Chủ đề gợi ý (tầng 1):** tiếng Anh cùng họ với delegate
  - **Vì sao:** Delegation — ủy quyền. Ba chân của một cú ủy quyền tử tế: hẹp thao tác, hẹp phạm vi OU, và trao cho nhóm để còn truy vết và thu hồi được.
- **Đề:** Helpdesk cần reset mật khẩu cho nhân viên thường. Cách trao quyền ĐÚNG?
  - **Dạng:** trắc nghiệm · **Ủy quyền thao tác reset trên nhánh OU NhanVien cho nhóm Helpdesk-GG** ✓ / Thêm cả đội helpdesk vào Domain Admins kèm quy định chỉ dùng để reset / Ủy quyền riêng cho từng bạn helpdesk trên toàn bộ cây OU của miền
  - **Chủ đề gợi ý (tầng 1):** ba chân: thao tác, phạm vi, nhóm
  - **Vì sao:** Đúng thao tác (reset), đúng phạm vi (OU NhanVien), trao cho nhóm (Helpdesk-GG). Domain Admins cho việc bé là treo cả miền vào rủi ro — quy định miệng không phải cơ chế; ủy quyền cho từng cá nhân trên toàn cây thì vừa rộng vừa không truy vết nổi.
- **Đề:** Vì sao KHÔNG gán quyền thẳng cho từng người dù cách đó chạy được ngay?
  - **Dạng:** trắc nghiệm · **Vì mọi thay đổi nhân sự sau đó đều thành việc dọn tay từng quyền** ✓ / Vì AD giới hạn mỗi tài khoản người dùng chỉ được nhận tối đa một quyền / Vì quyền gán thẳng cho người chạy chậm hơn hẳn quyền đi qua các nhóm
  - **Chủ đề gợi ý (tầng 1):** cái giá nằm ở ngày mai, không ở hôm nay
  - **Vì sao:** Cái giá là ngày mai: người chuyển phòng thì quyền cũ không tự rút, nửa năm sau không ai trả lời được ai-cho-vào-vì-sao. AD không giới hạn một quyền, và tốc độ chẳng khác nhau — khác nhau ở chi phí thay đổi và truy vết.
- **Đề:** Lệnh nào cho bạn xem một nhóm đang chứa những ai — kèm cột nói rõ thành viên là người hay nhóm?
  - **Dạng:** gõ tay · **Chấp nhận:** get-adgroupmember | get adgroupmember | getadgroupmember | get-adgroupmember -identity | lệnh get-adgroupmember | lenh get-adgroupmember
  - **Chủ đề gợi ý (tầng 1):** động từ Get, danh từ ADGroupMember
  - **Vì sao:** Get-ADGroupMember -Identity <tên nhóm>. Cột ObjectClass là máy soi nếp AGDLP: nhóm quyền tử tế hiện group (chứa nhóm vai), còn một dãy user nằm thẳng trong nhóm quyền là dấu vết lối tắt chồng chất.
- **Đề:** Đợt kiểm toán phát hiện anh Hoang Van Nam (hvnam) đang nằm THẲNG trong nhóm quyền in ấn — sai nếp, và không rõ ai cho vào. Bạn không có lệnh gỡ, nhưng phải vá lại cho quyền chảy ĐÚNG CHUỖI: anh Nam thuộc nhóm vai, và nhóm vai nằm trong nhóm quyền. Tra kỹ bằng Get-ADGroupMember rồi bổ sung mắt xích còn thiếu.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [10.20.2.5/24] — AD congty.vn: OU [VanPhong], 2 user sẵn có
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "undefined"
      - phải lôi ra được dòng chứa "undefined"
    - **Lệnh mẫu:** `Add-ADGroupMember InAn-GG -Members hvnam`
  - **Chủ đề gợi ý (tầng 1):** mắt xích nhóm VAI đang thiếu tên anh Nam
  - **Vì sao:** Add-ADGroupMember InAn-GG -Members hvnam. Anh Nam đang có quyền nhờ nằm thẳng trong nhóm quyền — mục tiêu DL xanh sẵn nhưng mục tiêu nhóm vai đỏ. Bổ sung anh vào InAn-GG là chuỗi liền lại: về sau ai tra Get-ADGroupMember cũng đọc ra được vì-sao-anh-có-quyền, và ngày anh chuyển phòng chỉ cần rút khỏi nhóm vai.
- **Đề:** Chị Dang Thi Thu (dtthu2) vừa về phòng kinh doanh và cần gửi được báo giá. Miền có sẵn nhiều nhóm — kể cả vài nhóm không liên quan. Tự tra bằng Get-ADGroup và Get-ADGroupMember, tìm đúng đường ống của kinh doanh, rồi xếp chị vào đúng nếp AGDLP.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy MAY-QUAN-TRI [10.20.2.5/24] — AD congty.vn: OU [KinhDoanh, KeToan], 3 user sẵn có
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "undefined"
      - phải lôi ra được dòng chứa "undefined"
    - **Lệnh mẫu:** `Add-ADGroupMember KinhDoanh-GG -Members dtthu2`
  - **Chủ đề gợi ý (tầng 1):** tìm nhóm VAI của kinh doanh trước, đừng đụng nhóm quyền
  - **Vì sao:** Add-ADGroupMember KinhDoanh-GG -Members dtthu2. Tra QuyenGuiBaoGia-DL thấy nó chứa KinhDoanh-GG — vậy chỉ cần đưa chị Thu vào nhóm vai đó là cả hai mục tiêu xanh. Nhét thẳng vào nhóm quyền thì mục tiêu nhóm vai vẫn đỏ; còn mấy nhóm kế toán đứng đó để thử xem bạn có tra trước khi xếp hay không.

## Giám sát và nhật ký — Nhìn thấy sự cố trước người dùng `module-20`

Phần E · 5 chặng · 5 bài · 8 khái niệm

**Chặng:** Đọc được một dòng nhật ký (m20-bai-1) → Gom nhật ký về một chỗ (m20-bai-2) → Mò kim trong đống rơm thật (m20-bai-3) → Hỏi thăm hay chờ chuông (m20-bai-4) → Biết bình thường mới thấy bất thường (m20-bai-5)

### Bài: Đọc một dòng nhật ký như người có nghề `m20-bai-1`

**1 · Khởi động (hook):** Hai giờ sáng, chiếc switch ở tầng hầm lặng lẽ ghi một dòng chữ vào sổ của nó. Không ai đọc. Sáu tiếng sau cả tòa nhà mất mạng, và người ta mất nửa ngày truy tìm nguyên nhân — trong khi câu trả lời đã nằm sẵn trong sổ từ hai giờ sáng, gắn kèm một con số từ 0 tới 7 nói rõ chuyện này nghiêm trọng cỡ nào. Con số đó đọc thế nào?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: trong thang mức độ nghiêm trọng của nhật ký hệ thống (syslog), mức số 0 nghĩa là gì?
  - **Dạng:** trắc nghiệm · **Nặng nhất — hệ thống đang sụp, số càng nhỏ chuyện càng lớn** ✓ / Nhẹ nhất — chỉ là dòng gỡ lỗi, số càng lớn chuyện càng lớn / Số 0 nghĩa là không có gì để ghi, dòng đó có thể bỏ qua
  - **Chủ đề gợi ý (tầng 1):** chiều của thang đo hay bị đoán ngược
  - **Vì sao:** Số 0 là Emergency — nặng nhất, hệ thống đang sụp. Thang syslog chạy NGƯỢC trực giác: số càng nhỏ càng nghiêm trọng, 7 (Debug) mới là nhẹ nhất. Đoán ngược chiều thang này là lỗi kinh điển của người mới đọc log.

**3 · Khám phá (teach):**
- *[m20-dong-syslog]* Mỗi dòng nhật ký hệ thống trả lời bốn câu hỏi, theo đúng thứ tự: KHI NÀO (dấu thời gian), MÁY NÀO (tên thiết bị), NẶNG CỠ NÀO (mức severity), và CHUYỆN GÌ (nội dung). Ví dụ: 2026-08-07 03:12:44 sw-core-01 ERROR link down on port 12 — ba giờ sáng, switch trục, mức Error, cổng 12 mất kết nối. Bốn mảnh đó là khuôn chung của cả nghề: log của switch, router, máy chủ DHCP hay DNS đều kể chuyện theo cùng một nhịp, nên học đọc một dòng là đọc được sổ của mọi thiết bị.
  - **Đào sâu hơn:** Vì sao dấu thời gian đứng đầu? Vì sự cố hiếm khi là MỘT dòng — nó là một chuỗi dòng nối nhau theo thời gian, thường rải trên nhiều thiết bị. Người có nghề đọc log không đọc từng dòng rời: họ dựng lại DÒNG THỜI GIAN của biến cố. Đó cũng là lý do bài sau sẽ bắt các máy phải chung một đồng hồ — thời gian mà lệch thì câu chuyện tự mâu thuẫn.
- *[m20-severity]* Mức nghiêm trọng là một con số từ 0 tới 7, và SỐ CÀNG NHỎ CHUYỆN CÀNG LỚN: 0 Emergency (hệ thống sụp), 1 Alert (phải xử ngay), 2 Critical (hỏng nặng), 3 Error (có lỗi thật), 4 Warning (đáng để mắt), 5 Notice (bình thường nhưng đáng ghi), 6 Informational (thông tin thường ngày), 7 Debug (gỡ lỗi). Mẹo nhớ tám chữ đầu bằng một câu: Em Ăn Cơm Em Với Người Iu Đi — Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debug. Ranh giới đáng nhớ nhất nằm giữa 3 và 4: từ Error trở xuống là CÓ CHUYỆN THẬT, còn Warning trở lên là đáng để mắt nhưng chưa chắc là sự cố.
  - **Đào sâu hơn:** Tám mức này là danh sách rời rạc đúng nghĩa — không có cung điện nào để đi, chỉ có thuộc. Thẻ ôn tập của module sẽ gánh việc đó cho bạn bằng lịch SM-2. Còn trong ca trực, con số này là công cụ LỌC: đêm hôm bận rộn, người ta đặt ngưỡng chỉ báo từ mức 3 trở xuống — vì một trận lụt dòng Warning vô hại có thể nhấn chìm đúng một dòng Error biết nói.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Đọc thử một dòng log theo đúng bốn câu hỏi. Dòng: 2026-08-07 03:12:44 sw-core-01 ERROR link down on port 12. Bước 1 — KHI NÀO: 03:12 rạng sáng ngày 07, lúc không có bàn tay người nào đang thao tác, tức là thiết bị tự gặp chuyện. Bước 2 — MÁY NÀO: sw-core-01, switch TRỤC của tòa nhà — chuyện của nó là chuyện của nhiều người. Bước 3 — NẶNG CỠ NÀO: ERROR, mức 3 — có chuyện thật, không phải cảnh báo vu vơ. Bước 4 — CHUYỆN GÌ: cổng 12 mất kết nối. Ghép bốn mảnh: ba giờ sáng, một cổng trên switch trục rơi — nếu cổng 12 dẫn lên tầng nào đó thì sáng mai tầng đó sẽ gọi. Một dòng chữ, đủ để người trực đêm hành động trước khi chuông reo.
- **Đề:** Mức ERROR mang số mấy trong thang syslog?
  - **Dạng:** gõ tay · **Chấp nhận:** 3 | số 3 | so 3 | mức 3 | muc 3
  - **Chủ đề gợi ý (tầng 1):** đếm theo câu Em Ăn Cơm Em…
  - **Gợi ý (tầng 2):** Đếm từ 0: Em (0) Ăn (1) Cơm (2) Em (3)… — chữ Em thứ hai là Error.
  - **Lời giải (tầng 3):** Số 3. Em Ăn Cơm Em Với Người Iu Đi — Emergency 0, Alert 1, Critical 2, Error 3. Ranh giới có-chuyện-thật nằm ngay tại đây: từ 3 trở xuống là lỗi thật.
- **Đề:** Đêm trực bận, bạn đặt ngưỡng chỉ hiện dòng từ mức 3 trở xuống. Loại dòng nào sẽ BỊ ẨN đi?
  - **Dạng:** trắc nghiệm · **Warning, Notice, Informational, Debug — các mức từ 4 tới 7** ✓ / Emergency, Alert, Critical — ba mức nặng nhất của thang / Không dòng nào cả, vì ngưỡng chỉ đổi màu chữ khi hiển thị
  - **Chủ đề gợi ý (tầng 1):** từ mức 3 trở xuống nghĩa là số nhỏ hơn hoặc bằng 3
  - **Gợi ý (tầng 2):** Số nhỏ là nặng. Ngưỡng giữ lại 0-3 thì phần bị ẩn là những số nào?
  - **Lời giải (tầng 3):** Các mức 4-7 (Warning trở lên về phía nhẹ) bị ẩn. Ngưỡng lọc là công cụ sống còn của ca đêm: giữ lại 0-3 để một dòng Error biết nói không bị trận lụt Warning vô hại nhấn chìm.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: xếp tám mức syslog theo đúng thứ tự từ 0 (nặng nhất) tới 7 (nhẹ nhất).
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Emergency — hệ thống sụp
    2. Alert — phải xử ngay
    3. Critical — hỏng nặng
    4. Error — có lỗi thật
    5. Warning — đáng để mắt
    6. Notice — bình thường nhưng đáng ghi
    7. Informational — thông tin thường ngày
    8. Debug — gỡ lỗi
  - **Chủ đề gợi ý (tầng 1):** câu Em Ăn Cơm Em Với Người Iu Đi
  - **Gợi ý (tầng 2):** Em Ăn Cơm Em Với Người Iu Đi — mỗi chữ đầu là một mức, đọc xuôi từ nặng tới nhẹ.
  - **Lời giải (tầng 3):** Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debug — 0 tới 7, số càng nhỏ càng nặng. Câu nhớ: Em Ăn Cơm Em Với Người Iu Đi.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao ranh giới giữa mức 3 và mức 4 là ranh giới đáng nhớ nhất của thang?
  - **Nhóm ý cần chạm:** [error, lỗi thật, loi that, có chuyện thật, co chuyen that, mức 3, muc 3] · [warning, cảnh báo, canh bao, đáng để mắt, dang de mat, chưa chắc, chua chac] · [ngưỡng, nguong, lọc, loc , ẩn, an di, giữ lại, giu lai] · [nhấn chìm, nhan chim, lụt, lut , nhiễu, nhieu, vô hại, vo hai]
  - **Trả lời mẫu:** Vì đó là ranh giới giữa CÓ CHUYỆN THẬT và ĐÁNG ĐỂ MẮT: từ Error (3) trở xuống là lỗi thật cần hành động, còn Warning (4) trở lên nhiều khi vô hại. Ngưỡng lọc của ca trực thường đặt đúng tại đây — giữ 0-3 để dòng lỗi biết nói không bị trận lụt cảnh báo vặt nhấn chìm.

**6 · Tổng kết:**
- Một dòng log trả lời bốn câu: khi nào, máy nào, nặng cỡ nào, chuyện gì — khuôn chung của mọi thiết bị.
- Thang severity 0-7 chạy ngược trực giác: số càng nhỏ càng nặng. Mẹo: Em Ăn Cơm Em Với Người Iu Đi.
- Ranh giới 3/4 là ranh giới có-chuyện-thật: ngưỡng lọc ca trực thường giữ 0-3, ẩn 4-7.
- *Úp mở bài sau:* Đọc được một dòng rồi — nhưng công ty có ba chục thiết bị, mỗi máy một cuốn sổ riêng. Sự cố xảy ra lúc nửa đêm thì bạn mở cuốn nào trước? Bài sau: gom hết sổ về một chỗ, và cái bẫy đồng hồ khiến ba cuốn sổ kể ba câu chuyện khác nhau.

### Bài: Gom ba chục cuốn sổ về một chỗ `m20-bai-2`

**1 · Khởi động (hook):** Sự cố nửa đêm: người dùng kêu mạng chập chờn khoảng 2 giờ sáng. Bạn mở log của switch — thấy một biến cố lúc 02:14. Mở log của router — 02:09. Máy chủ DHCP — 02:21. Ba cuốn sổ, ba mốc giờ, và câu hỏi chết người: chuyện nào xảy ra TRƯỚC? Nếu ba thiết bị này không chung một đồng hồ, thứ tự đó là chuyện bịa — và bạn sẽ đi sửa cái hậu quả thay vì cái nguyên nhân.

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: vì sao log để rải trên từng thiết bị là mối nguy, ngay cả khi chẳng máy nào hỏng?
  - **Dạng:** trắc nghiệm · **Vì thiết bị chết là sổ của nó chết theo — đúng lúc cần đọc nhất thì mất** ✓ / Vì mỗi thiết bị chỉ đủ chỗ ghi log trong một giờ rồi tự xóa sạch / Vì đọc log trên thiết bị bắt buộc phải tắt nó đi mới mở sổ được
  - **Chủ đề gợi ý (tầng 1):** cuốn sổ nằm trên chính con tàu đang chìm
  - **Vì sao:** Sổ nằm trên chính thiết bị thì thiết bị chết là sổ chết theo — mà lúc thiết bị chết lại chính là lúc bạn cần đọc sổ nhất. Chưa kể muốn lần một sự cố phải mở ba chục máy. Log tập trung sinh ra để chữa cả hai: bản sao nằm ở nơi an toàn, và mọi câu chuyện nằm cạnh nhau.

**3 · Khám phá (teach):**
- *[m20-log-tap-trung]* Log tập trung là một máy chủ đứng ra nhận bản sao nhật ký của MỌI thiết bị — switch, router, máy chủ dịch vụ — ngay khi từng dòng được ghi. Ba lý do khiến nó thành chuẩn của nghề: một, thiết bị chết không mang theo sổ (bản sao đã kịp rời tàu từng dòng một); hai, một sự cố liên quan ba thiết bị thì cả ba câu chuyện nằm cạnh nhau trên một màn hình, khỏi mở ba chục máy; ba, kẻ đột nhập xóa dấu vết trên máy nạn nhân cũng không với tay được tới bản sao ở nơi khác.
  - **Đào sâu hơn:** Giao thức chở những dòng log này đi chính là syslog của bài trước — nó không chỉ là khuôn dòng chữ mà còn là cách gửi dòng chữ đó qua mạng về máy thu. Trong thế giới Windows, vai máy thu này thường do một máy chủ thu thập sự kiện đảm nhận; tên công cụ khác nhau, triết lý y hệt: sổ phải có bản sao rời tàu, và các câu chuyện phải nằm cạnh nhau.
- *[m20-gio-lech]* Nhưng gom sổ về một chỗ chỉ có nghĩa khi mọi thiết bị CHUNG MỘT ĐỒNG HỒ. Đồng hồ máy móc trôi tự nhiên vài giây mỗi ngày — để mặc một năm là lệch nhau cả chục phút. Lúc đó dòng thời gian ghép từ nhiều máy thành chuyện bịa: hậu quả đứng trước nguyên nhân, và người trực đi sửa nhầm đầu dây. Thuốc của nghề là NTP — mọi thiết bị định kỳ chỉnh giờ theo cùng một nguồn. Quy tắc: trỏ tất cả về cùng nguồn giờ, và kiểm tra độ lệch như kiểm tra một dịch vụ sống còn — vì đúng giờ là điều kiện để mọi cuốn sổ còn đáng tin.
  - **Đào sâu hơn:** Ca kinh điển của giờ lệch: log router ghi tuyến rơi lúc 02:09, log switch ghi bão quảng bá lúc 02:14 — trông như router gây chuyện trước. Nhưng nếu đồng hồ router chạy chậm 6 phút thì sự thật đảo ngược: bão nổ ra trước, tuyến rơi là hậu quả. Cùng một dữ liệu, hai câu chuyện ngược nhau — chỉ vì một cái đồng hồ lười. Đó là lý do người điều tra sự cố luôn hỏi câu đầu tiên: các máy này có chung giờ không?

**4 · Thử tay (practice, fading 1):**
- **Đề:** Máy thu log tập trung đã gom sổ của ba thiết bị vào file tap-trung.log. Người dùng kêu mạng tầng ba chập chờn — hãy lôi đúng dòng SỰ CỐ ra khỏi đống log trộn lẫn đó bằng một dòng pipeline như bạn đã học ở Module 12.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy SRV-GIAM-SAT [10.20.0.15/24] — file: tap-trung.log
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "link flapping on port 7"
    - **Lệnh mẫu:** `Get-Content tap-trung.log | Select-String ERROR`
  - **Chủ đề gợi ý (tầng 1):** một dòng Get-Content nối ống sang Select-String
  - **Gợi ý (tầng 2):** Cú pháp khuyết: Get-Content tap-trung.log | Select-String <cụm cần lọc>. Muốn ra chuyện thật thì lọc theo mức nào của thang syslog?
  - **Lời giải (tầng 3):** Get-Content tap-trung.log | Select-String ERROR — lọc theo mức có-chuyện-thật là dòng sự cố nổi lên ngay: sw-tang-3 báo link flapping on port 7 (cổng chập chờn), khớp hẳn với lời than của người dùng. Lọc theo tên máy sw-tang-3 cũng tới đích — nhiều đường đúng, miễn là ĐỪNG đọc tuần tự từ dòng một.
- **Đề:** Log router ghi tuyến rơi lúc 02:09, log switch ghi bão quảng bá lúc 02:14. Kết luận "router gây chuyện trước" đứng vững khi nào?
  - **Dạng:** trắc nghiệm · **Chỉ khi hai thiết bị đang chung một nguồn giờ NTP — không thì thứ tự là chuyện bịa** ✓ / Luôn luôn — dấu thời gian trong log là thứ không bao giờ nói dối người đọc / Chỉ khi hai thiết bị cùng một hãng sản xuất để khuôn log giống hệt nhau
  - **Chủ đề gợi ý (tầng 1):** so hai mốc giờ của hai cái đồng hồ khác nhau
  - **Gợi ý (tầng 2):** 02:09 của router và 02:14 của switch là số đo từ HAI đồng hồ. So chúng với nhau cần điều kiện gì?
  - **Lời giải (tầng 3):** Chỉ khi hai máy chung nguồn giờ. Đồng hồ router mà chậm 6 phút thì sự thật đảo ngược — bão nổ trước, tuyến rơi là hậu quả. Dấu thời gian chỉ đáng tin bằng cái đồng hồ đẻ ra nó; khuôn log giống nhau chẳng cứu được điều đó.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: dịch vụ giữ cho mọi thiết bị chung một đồng hồ tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** ntp | network time protocol | giao thức ntp | giao thuc ntp
  - **Chủ đề gợi ý (tầng 1):** ba chữ cái, có chữ T của time
  - **Gợi ý (tầng 2):** Network Time Protocol — gọi tắt ba chữ.
  - **Lời giải (tầng 3):** NTP. Trỏ mọi thiết bị về cùng một nguồn giờ và canh độ lệch như canh một dịch vụ sống còn — vì dòng thời gian ghép từ nhiều máy chỉ đáng tin khi các đồng hồ cùng chạy.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao giờ lệch giữa các thiết bị có thể khiến người trực đi sửa NHẦM nguyên nhân?
  - **Nhóm ý cần chạm:** [thứ tự, thu tu, trước sau, truoc sau, đảo ngược, dao nguoc, dòng thời gian, dong thoi gian] · [đồng hồ, dong ho, lệch, lech, trôi, troi , chậm, cham ] · [nguyên nhân, nguyen nhan, hậu quả, hau qua, nhầm đầu dây, nham dau day] · [nhiều máy, nhieu may, ghép, ghep, nhiều thiết bị, nhieu thiet bi, so với nhau, so voi nhau]
  - **Trả lời mẫu:** Vì muốn biết nguyên nhân phải dựng được thứ tự trước-sau từ dấu thời gian của NHIỀU máy. Đồng hồ một máy chạy lệch là thứ tự đó đảo ngược: hậu quả đứng trước nguyên nhân, và người trực lao vào sửa cái đứng trước — tức là sửa hậu quả. Cùng một đống log, đồng hồ lệch kể một câu chuyện bịa.

**6 · Tổng kết:**
- Log tập trung: bản sao rời tàu từng dòng — thiết bị chết không mang theo sổ, kẻ xóa vết không với tới.
- Mọi câu chuyện nằm cạnh nhau một chỗ — lần sự cố không phải mở ba chục máy.
- Điều kiện để tin được dòng thời gian ghép: mọi thiết bị chung giờ NTP — đồng hồ lệch là chuyện bịa.
- *Úp mở bài sau:* Sổ đã về một mối, giờ đã chung một nhịp. Nhưng sổ thật của một đêm trực dày hàng trăm dòng — và trong đó có những dòng CẢNH BÁO trông rất đáng sợ mà hoàn toàn vô hại. Bài sau bạn nhận nguyên một file như thế, không cắt gọt.

### Bài: Mò đúng cây kim trong đống rơm thật `m20-bai-3`

**1 · Khởi động (hook):** Camera tầng bốn mất kết nối lúc rạng sáng. Trong tay bạn là file log của switch trục: hơn một trăm sáu mươi dòng của một đêm — đầy những dòng WARNING trông phát sợ mà máy vẫn chạy êm, và đâu đó MỘT dòng nói đúng chuyện bạn cần. Người mới đọc từ dòng một và lạc sau hai phút. Người có nghề gõ một câu lệnh và thấy nó sau hai giây. Khác nhau ở đâu?

**2 · Đoán thử (pretest):**
- **Đề:** File log 160 dòng, nghi có sự cố rạng sáng. Việc ĐẦU TIÊN của người có nghề?
  - **Dạng:** trắc nghiệm · **Lọc trước theo mức nặng — Select-String ERROR — rồi mới đọc phần lọt lưới** ✓ / Đọc tuần tự từ dòng đầu tới dòng cuối để không bỏ sót manh mối nào / Xóa bớt các dòng cũ hơn ba tiếng cho file gọn lại rồi đọc phần còn lại
  - **Chủ đề gợi ý (tầng 1):** log không phải truyện để đọc từ trang một
  - **Vì sao:** Lọc trước, đọc sau. 160 dòng đọc tuần tự thì mắt người trôi qua dòng quan trọng lúc nào không hay; còn xóa dòng cũ là hủy chứng cứ. Thang severity của bài 1 sinh ra để làm lưỡi dao lọc: ERROR trở xuống là chuyện thật — bắt đầu từ đó.

**3 · Khám phá (teach):**
- *[m20-loc-truoc-doc]* Chiến thuật đọc log của nghề gói trong bốn chữ: LỌC TRƯỚC, ĐỌC SAU. Nhát dao thứ nhất lọc theo mức nặng (Select-String ERROR — chuyện thật nổi lên, thường chỉ còn vài dòng); nhát thứ hai lọc theo thời gian quanh lúc người dùng kêu; nhát thứ ba lọc theo tên thiết bị hoặc từ khóa của triệu chứng. Sau hai ba nhát dao, file trăm dòng còn lại dăm dòng — LÚC ĐÓ mới đọc kỹ từng chữ. Và cái bẫy lớn nhất của đống rơm: những dòng WARNING kêu rất to (quạt quay nhanh, tỉ lệ quảng bá cao) nhưng đêm nào cũng xuất hiện mà chẳng chết ai — cảnh báo giả quen mặt, được sinh ra để dụ người mới dừng nhầm chỗ.
  - **Đào sâu hơn:** Vì sao cảnh báo giả nguy hiểm? Vì nó đúng NGHĨA ĐEN — quạt quay nhanh thật, tỉ lệ quảng bá cao thật — chỉ là những chuyện đó vô hại ở mạng của bạn, đêm nào cũng thế. Người mới thấy chữ WARNING đầu tiên là dừng lại và tuyên bố tìm ra thủ phạm; người có nghề hỏi tiếp: dòng này có XUẤT HIỆN MỖI ĐÊM không, và nó có ĂN KHỚP với triệu chứng không? Câu hỏi thứ nhất chính là baseline — nhân vật của bài cuối; câu thứ hai là kỷ luật đối chiếu triệu chứng mà phòng khám đã rèn bạn từ Module 11.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Đây rồi: sw-core.log — nguyên một đêm của switch trục, hơn 160 dòng không cắt gọt. Camera tầng bốn (cắm vào cổng 12) mất kết nối lúc rạng sáng. Lôi đúng dòng sự cố ra. Cẩn thận: đêm đó có rất nhiều cảnh báo trông đáng sợ.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy SRV-GIAM-SAT [10.20.0.15/24] — file: sw-core.log
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "link down on port 12"
    - **Lệnh mẫu:** `Get-Content sw-core.log | Select-String ERROR`
  - **Chủ đề gợi ý (tầng 1):** nhát dao thứ nhất: lọc theo mức có-chuyện-thật
  - **Gợi ý (tầng 2):** Get-Content sw-core.log | Select-String <gì đó>. Trong 160 dòng, WARNING có hàng chục — nhưng mức NẶNG hơn nó thì hiếm lắm.
  - **Lời giải (tầng 3):** Get-Content sw-core.log | Select-String ERROR — cả đêm chỉ lọt lưới đúng một chuyện thật: 03:12:44 ERROR link down on port 12, khớp hẳn camera tầng bốn. Mấy chục dòng WARNING quạt và quảng bá là cảnh báo giả quen mặt — lọc theo chúng là lạc cả buổi. Lọc theo port 12 cũng tới đích: nhiều đường đúng, cùng một kỷ luật lọc-trước-đọc-sau.
- **Đề:** Trong file đêm đó, dòng WARNING fan 2 speed high xuất hiện hàng chục lần. Vì sao KHÔNG kết luận nó là thủ phạm vụ camera?
  - **Dạng:** trắc nghiệm · **Nó xuất hiện đều đặn mọi đêm và chẳng ăn khớp gì với triệu chứng mất kết nối** ✓ / Vì mức Warning trong thang syslog nghĩa là thiết bị đã tự sửa xong lỗi đó / Vì quạt là phần cơ khí nên nhật ký của nó không được tính là log mạng
  - **Chủ đề gợi ý (tầng 1):** hai câu hỏi vặn cảnh báo giả
  - **Gợi ý (tầng 2):** Hai câu của người có nghề: dòng này có xuất hiện mỗi đêm không, và nó có ăn khớp triệu chứng không?
  - **Lời giải (tầng 3):** Vì nó rớt cả hai câu vặn: xuất hiện đều đặn mọi đêm (nền quen thuộc, không phải biến cố) và quạt quay nhanh chẳng liên quan gì tới một cổng mất kết nối. Warning không có nghĩa là đã-tự-sửa, và log quạt vẫn là log — chỉ là log vô hại ở mạng này.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: bốn chữ tóm gọn chiến thuật đọc log của nghề?
  - **Dạng:** gõ tay · **Chấp nhận:** lọc trước đọc sau | loc truoc doc sau | lọc trước, đọc sau | loc truoc, doc sau
  - **Chủ đề gợi ý (tầng 1):** hai động từ, mỗi động từ một trạng từ
  - **Gợi ý (tầng 2):** Việc gì làm trước khi để mắt chạm vào từng chữ? Lọc… rồi mới…
  - **Lời giải (tầng 3):** Lọc trước, đọc sau. Nhát dao theo mức nặng, theo thời gian, theo thiết bị — file trăm dòng còn dăm dòng rồi mới đọc kỹ. Không ai có nghề đọc log như đọc truyện.
- **Tự giải thích:** Giải thích bằng lời của bạn: cảnh báo giả là gì, và người có nghề vặn nó bằng hai câu hỏi nào?
  - **Nhóm ý cần chạm:** [warning, cảnh báo, canh bao, trông đáng sợ, trong dang so, kêu to, keu to] · [vô hại, vo hai, không chết ai, khong chet ai, quen mặt, quen mat, nền, nen ] · [mỗi đêm, moi dem, đều đặn, deu dan, thường xuyên, thuong xuyen, baseline] · [ăn khớp, an khop, triệu chứng, trieu chung, liên quan, lien quan, khớp với, khop voi]
  - **Trả lời mẫu:** Cảnh báo giả là dòng WARNING nói chuyện có thật nhưng vô hại ở mạng của mình — quạt quay nhanh, quảng bá cao — đêm nào cũng hiện và chẳng chết ai, sinh ra để dụ người mới dừng nhầm chỗ. Hai câu vặn: dòng này có xuất hiện đều đặn mọi đêm không (nếu có thì nó là nền, không phải biến cố), và nó có ăn khớp với triệu chứng đang điều tra không (không khớp thì không phải thủ phạm).

**6 · Tổng kết:**
- Lọc trước, đọc sau: nhát dao theo mức nặng → thời gian → thiết bị; còn dăm dòng mới đọc kỹ.
- Cảnh báo giả nói chuyện có thật nhưng vô hại — vặn nó bằng hai câu: có đều đặn mọi đêm không, có khớp triệu chứng không.
- Một đêm 160 dòng thường chỉ có một chuyện thật — thang severity là lưỡi dao tách nó ra trong hai giây.
- *Úp mở bài sau:* Đọc log là nhìn về QUÁ KHỨ — chuyện đã xảy ra rồi. Còn muốn biết thiết bị đang sống hay sắp chết NGAY LÚC NÀY thì sao? Bài sau: hai kiểu canh chừng — đi hỏi thăm từng giường, hay chờ chuông đầu giường reo.

### Bài: Chọn cách canh chừng cho cả tòa thiết bị `m20-bai-4`

**1 · Khởi động (hook):** Bệnh viện có hai cách biết bệnh nhân trở nặng: y tá đi buồng đều đặn từng giường ghi chỉ số, và chuông đầu giường cho bệnh nhân bấm khi thấy khó thở. Bỏ cách một, bạn không có sổ theo dõi để biết ai đang YẾU DẦN; bỏ cách hai, người trở nặng giữa hai lượt đi buồng không ai hay. Mạng máy tính canh chừng thiết bị bằng đúng hai cách đó — và cũng không bỏ được cách nào. Chúng tên là gì?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: hệ giám sát muốn biết mức CPU của switch NGAY LÚC NÀY thì làm gì?
  - **Dạng:** trắc nghiệm · **Chủ động hỏi switch qua giao thức giám sát — như y tá tự đi buồng** ✓ / Ngồi chờ switch tự gửi mức CPU về — thiết bị luôn tự khai đều đặn / Đọc lại file log của switch, vì mọi chỉ số đều được ghi vào log
  - **Chủ đề gợi ý (tầng 1):** muốn có chỉ số đều đặn thì ai phải chủ động
  - **Vì sao:** Muốn chỉ số đều đặn thì hệ giám sát phải CHỦ ĐỘNG hỏi — gọi là polling. Thiết bị không tự khai CPU định kỳ (nó chỉ tự hô khi có biến — đó là trap, nhân vật thứ hai của bài), còn log ghi BIẾN CỐ chứ không ghi nhịp tim từng phút.

**3 · Khám phá (teach):**
- *[m20-snmp-polling]* Cách canh chừng thứ nhất: hệ giám sát ĐI HỎI THĂM từng thiết bị theo nhịp đều — vài phút một lượt, qua giao thức SNMP: CPU bao nhiêu, RAM còn mấy, cổng nào đang chạy, nhiệt độ thế nào. Đó là POLLING — y tá đi buồng. Cái quý của nó là sự ĐỀU ĐẶN: hỏi đều thì vẽ được đồ thị theo thời gian, và đồ thị cho thấy thứ mà không biến cố nào báo — con thiết bị đang YẾU DẦN: CPU nhích lên từng tuần, cổng trục ngày càng gần mức nghẽn. Polling nhìn thấy cái chết đến chậm.
  - **Đào sâu hơn:** Nhược điểm của đi buồng nằm ngay trong chữ nhịp: chuyện xảy ra GIỮA hai lượt hỏi thì phải đợi lượt sau mới biết — nhịp 5 phút nghĩa là mù tối đa 5 phút. Rút nhịp xuống vài giây thì chính việc hỏi thăm lại thành gánh nặng cho mạng và thiết bị. Nhịp hỏi là một cái giá phải chọn — và phần mù giữa hai lượt chính là chỗ cần tới nhân vật thứ hai.
- *[m20-snmp-trap]* Cách thứ hai: thiết bị TỰ HÔ LÊN ngay khi có biến — cổng vừa rơi, nguồn điện vừa hỏng, nhiệt vượt ngưỡng — gói tin báo động bay thẳng về hệ giám sát, không đợi ai hỏi. Đó là TRAP — chuông đầu giường. Cái quý của nó là TỨC THÌ: biến cố được biết trong giây đầu tiên, không phải cuối nhịp polling. Nhưng chuông chỉ reo khi có biến: nó không vẽ được đồ thị, không thấy được sự yếu dần, và thiết bị chết đột ngột tới mức không kịp hô thì chuông câm luôn. Nghề vì thế dùng CẢ HAI: polling vẽ sức khỏe dài hạn, trap bắt biến cố tức thì — y tá vẫn đi buồng đều, và chuông vẫn treo đầu giường.
  - **Đào sâu hơn:** Trap còn một điểm yếu kín: nó là một gói tin gửi MỘT LẦN — mạng đang rối đúng lúc có biến (là lúc hay có biến nhất) thì gói báo động có thể rơi giữa đường, và không ai biết mình đã lỡ chuông. Vì thế hệ giám sát trưởng thành không bao giờ tin mình chỉ nhờ trap: polling lượt sau sẽ phát hiện thiết bị im lặng bất thường — hai cách canh chừng làm lưới an toàn cho nhau, đúng nghĩa đen.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Muốn biết cổng trục của switch đang TIẾN DẦN tới mức nghẽn qua từng tuần, bạn cần dữ liệu từ đâu?
  - **Dạng:** trắc nghiệm · **Polling — chuỗi số đo đều đặn theo thời gian mới vẽ được xu hướng** ✓ / Trap — thiết bị sẽ tự hô lên ngay khi thấy cổng của nó sắp nghẽn / Log tập trung — mọi mức tải của cổng đều được ghi thành dòng log
  - **Chủ đề gợi ý (tầng 1):** xu hướng cần chuỗi số đo đều
  - **Gợi ý (tầng 2):** Yếu DẦN nghĩa là phải so nhiều lần đo theo thời gian. Cách nào đo đều đặn?
  - **Lời giải (tầng 3):** Polling. Xu hướng chỉ hiện ra từ chuỗi số đo đều — trap chỉ reo khi có biến cố rời rạc (và sắp-nghẽn chưa phải biến cố), log ghi chuyện xảy ra chứ không ghi nhịp tim từng phút. Đây chính là cái polling nhìn thấy mà trap mù.
- **Đề:** Nguồn điện của switch vừa hỏng — hệ giám sát biết trong giây đầu tiên nhờ cơ chế nào?
  - **Dạng:** gõ tay · **Chấp nhận:** trap | snmp trap | bẫy trap | bay trap | gửi trap | gui trap
  - **Chủ đề gợi ý (tầng 1):** chuông đầu giường của thiết bị
  - **Gợi ý (tầng 2):** Không phải đợi lượt hỏi thăm — thiết bị TỰ hô. Tên tiếng Anh bốn chữ cái.
  - **Lời giải (tầng 3):** Trap — thiết bị tự gửi gói báo động về hệ giám sát ngay khi có biến, không đợi lượt polling. Tức thì là cái quý của nó; không vẽ được xu hướng là cái nó thiếu — nên nghề dùng cả hai.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: giao thức chuẩn để hệ giám sát hỏi thăm và nhận báo động từ thiết bị mạng tên là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** snmp | giao thức snmp | giao thuc snmp | simple network management protocol
  - **Chủ đề gợi ý (tầng 1):** bốn chữ cái, chữ M của management
  - **Gợi ý (tầng 2):** Simple Network Management Protocol — gọi tắt bốn chữ.
  - **Lời giải (tầng 3):** SNMP — đường dây chung của cả polling (hỏi thăm định kỳ) lẫn trap (thiết bị tự hô). Hai kiểu canh chừng, một giao thức.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao hệ giám sát tử tế phải dùng CẢ polling lẫn trap chứ không chọn một?
  - **Nhóm ý cần chạm:** [xu hướng, xu huong, yếu dần, yeu dan, đồ thị, do thi, dài hạn, dai han, đều đặn, deu dan] · [tức thì, tuc thi, ngay lập tức, ngay lap tuc, giây đầu, giay dau, có biến, co bien] · [giữa hai lượt, giua hai luot, mù, mu , nhịp, nhip, đợi lượt sau, doi luot sau] · [lưới an toàn, luoi an toan, bù cho nhau, bu cho nhau, rơi mất, roi mat, lỡ chuông, lo chuong]
  - **Trả lời mẫu:** Vì mỗi cách mù đúng chỗ cách kia sáng: polling đo đều nên vẽ được xu hướng yếu dần nhưng mù trong khoảng giữa hai lượt hỏi; trap báo biến cố trong giây đầu nhưng không vẽ được đồ thị và gói báo động có thể rơi mất đúng lúc mạng rối. Dùng cả hai thì polling lượt sau còn bắt được thiết bị im lặng bất thường khi trap thất lạc — hai cách làm lưới an toàn cho nhau.

**6 · Tổng kết:**
- Polling (SNMP): hỏi thăm đều đặn — vẽ được đồ thị, thấy được thiết bị yếu dần; mù giữa hai lượt hỏi.
- Trap (SNMP): thiết bị tự hô khi có biến — tức thì; nhưng không vẽ xu hướng và chuông có thể thất lạc.
- Nghề dùng cả hai làm lưới an toàn cho nhau: y tá vẫn đi buồng đều, chuông vẫn treo đầu giường.
- *Úp mở bài sau:* Đồ thị polling đã vẽ xong: CPU switch đang chạy 60%. Vậy... đó là tin tốt hay tin xấu? Câu hỏi nghe ngớ ngẩn ấy chính là bài cuối — và không trả lời được nó thì mọi đồ thị trên đời đều vô nghĩa.

### Bài: Vẽ đường bình thường để thấy điều bất thường `m20-bai-5`

**1 · Khởi động (hook):** Đồ thị giám sát báo CPU của switch trục đang ở 60%. Người trực mới toát mồ hôi định báo động; người trực cũ liếc qua rồi thản nhiên rót cà phê. Cũng con số đó, hai phản ứng ngược nhau — và NGƯỜI CŨ đúng. Ông ấy biết một thứ mà đồ thị không vẽ: con số này so với MỌI THỨ TƯ HÀNG TUẦN là cao hay thấp?

**2 · Đoán thử (pretest):**
- **Đề:** CPU switch đang 60%. Câu hỏi nào phải trả lời TRƯỚC khi kết luận tốt hay xấu?
  - **Dạng:** trắc nghiệm · **Bình thường của chính máy này, vào khung giờ này, là bao nhiêu?** ✓ / Nhà sản xuất khuyến cáo CPU của dòng switch này tối đa bao nhiêu? / Các switch của công ty khác cùng ngành đang chạy trung bình bao nhiêu?
  - **Chủ đề gợi ý (tầng 1):** so với chính nó, không so với ai khác
  - **Vì sao:** Phải so với BÌNH THƯỜNG CỦA CHÍNH NÓ: máy này, khung giờ này, thường chạy bao nhiêu? 60% là báo động nếu mọi thứ tư nó chỉ chạy 20%, và là chuyện thường nếu tuần nào giờ này cũng thế. Khuyến cáo nhà sản xuất hay số của công ty khác không nói được điều đó.

**3 · Khám phá (teach):**
- *[m20-baseline]* BASELINE là đường bình thường của chính hệ thống bạn: CPU giờ cao điểm quanh mức nào, băng thông trưa thứ hai thường bao nhiêu, đêm có bao nhiêu dòng Warning quen mặt. Nó không nằm trong sách nào — nó được VẼ từ chính dữ liệu polling và log của bạn, tích lũy qua tuần qua tháng. Có baseline, con số 60% mới có nghĩa: nằm trong nếp cũ thì rót cà phê, nhảy vọt khỏi nếp thì báo động — kể cả khi con số tuyệt đối trông vô hại. Không có baseline, mọi đồ thị chỉ là con số trôi nổi và mọi ngưỡng báo động chỉ là đoán mò.
  - **Đào sâu hơn:** Baseline chính là mảnh ghép còn thiếu của hai bài trước. Câu vặn cảnh-báo-giả "dòng này có xuất hiện mỗi đêm không?" là baseline của log. Đồ thị polling chỉ thành công cụ khi có nếp cũ để so. Và tinh tế nhất: bất thường không chỉ là VƯỢT LÊN — máy mọi ngày 40% nay im ắng ở 5% cũng là chuông báo, vì có khi cả tầng đã mất đường tới nó mà chưa ai kêu. Baseline cho bạn thấy sự cố từ cả hai phía, trước khi người dùng thấy.

**4 · Thử tay (practice, fading 2):**
- **Đề:** Router biên mọi trưa chạy 45% băng thông; trưa nay đồ thị chỉ 4%, không ai than phiền gì. Người trực có baseline nghĩ gì?
  - **Dạng:** trắc nghiệm · **Đáng ngờ — im ắng khác nếp cũng là bất thường, có thể lưu lượng đang không tới được nó** ✓ / Tin tốt — tải càng thấp thiết bị càng nhàn, mạng đang khỏe hơn mọi ngày / Không có gì đáng nói, vì chỉ số vượt LÊN mới được tính là bất thường
  - **Chủ đề gợi ý (tầng 1):** bất thường có cả hai phía của đường nếp
  - **Gợi ý (tầng 2):** Mọi trưa 45%, nay 4% — lưu lượng của cả công ty biến đi đâu? Nó có còn ĐI QUA máy này không?
  - **Lời giải (tầng 3):** Đáng ngờ. Im ắng lệch hẳn nếp cũ nghĩa là lưu lượng thường ngày không tới được máy này nữa — có thể một nhánh đã rơi và người dùng chưa kịp kêu. Baseline báo sự cố từ cả hai phía: vọt lên và tụt xuống bất thường đều là chuông.
- **Đề:** Đường bình thường của chính hệ thống — thứ giúp phân biệt 60% đáng sợ với 60% vô hại — gọi là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** baseline | đường cơ sở | duong co so | đường nền | duong nen | mức nền | muc nen
  - **Chủ đề gợi ý (tầng 1):** tiếng Anh, ghép từ base và line
  - **Gợi ý (tầng 2):** Base + line — đường nền.
  - **Lời giải (tầng 3):** Baseline. Vẽ từ chính dữ liệu polling và log của hệ thống mình, tích lũy qua tuần tháng — không nằm trong sách nào, và thiếu nó thì mọi ngưỡng báo động chỉ là đoán mò.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: baseline được vẽ từ đâu?
  - **Dạng:** gõ tay · **Chấp nhận:** từ dữ liệu của chính hệ thống | tu du lieu cua chinh he thong | dữ liệu polling và log | du lieu polling va log | lịch sử của chính hệ thống | lich su cua chinh he thong | dữ liệu của chính mình | du lieu cua chinh minh | polling và log | polling va log
  - **Chủ đề gợi ý (tầng 1):** không nằm trong sách nào
  - **Gợi ý (tầng 2):** Không phải sách nhà sản xuất, không phải số công ty khác — từ chính cái gì bạn thu hằng ngày?
  - **Lời giải (tầng 3):** Từ chính dữ liệu polling và log của hệ thống mình, tích lũy qua tuần tháng. Bình thường của mỗi mạng mỗi khác — nên đường nền phải tự vẽ, không chép được của ai.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao nói "không có baseline thì mọi đồ thị giám sát đều vô nghĩa"?
  - **Nhóm ý cần chạm:** [so với, so voi, so sánh, so sanh, đối chiếu, doi chieu] · [bình thường, binh thuong, nếp cũ, nep cu, mọi ngày, moi ngay, đường nền, duong nen] · [con số trôi nổi, con so troi noi, không có nghĩa, khong co nghia, không kết luận, khong ket luan, đoán mò, doan mo] · [cao hay thấp, cao hay thap, tốt hay xấu, tot hay xau, bất thường, bat thuong]
  - **Trả lời mẫu:** Vì một con số chỉ có nghĩa khi có thứ để so. CPU 60% tự thân không tốt không xấu — nó chỉ thành thông tin khi đặt cạnh nếp cũ của chính máy đó vào chính khung giờ đó: nằm trong nếp là chuyện thường, bật khỏi nếp là chuông báo, kể cả khi bật xuống phía im ắng. Thiếu đường nền để so thì đồ thị chỉ là những con số trôi nổi và mọi ngưỡng báo động là đoán mò.

**6 · Tổng kết:**
- Baseline là đường bình thường của CHÍNH hệ thống bạn — vẽ từ polling và log, không chép được từ sách.
- Con số chỉ có nghĩa khi so với nếp cũ: trong nếp thì rót cà phê, bật khỏi nếp thì báo động.
- Bất thường có hai phía — vọt lên đáng sợ, mà im ắng khác thường cũng là chuông báo.
- *Úp mở bài sau:* Đồ nghề đã đủ một vòng: thiết kế dải địa chỉ, dựng trunk, canh vòng lặp, định tuyến tự động, luật chặn, dịch vụ có dự phòng, quyền đúng nếp, và giờ là đôi mắt canh cả hệ thống. Module cuối cùng không dạy gì mới — nó đưa bạn một chi nhánh trống trơn và bảo: dựng đi.

### Khái niệm & flashcard (8)

- **Dòng nhật ký syslog** `m20-dong-syslog` — Mỗi dòng log trả lời bốn câu theo thứ tự: khi nào, máy nào, nặng cỡ nào, chuyện gì — khuôn chung của mọi thiết bị
  - Ẩn dụ: Như một dòng trong sổ trực ban của bảo vệ: giờ nào, chốt nào, mức khẩn nào, chuyện gì — ca sau đọc một dòng là dựng lại được tình hình.
  - Thẻ ôn: *Một dòng log syslog trả lời bốn câu hỏi nào, theo thứ tự?* → KHI NÀO (dấu thời gian) — MÁY NÀO (tên thiết bị) — NẶNG CỠ NÀO (mức severity 0-7) — CHUYỆN GÌ (nội dung). Sự cố là chuỗi dòng nối theo thời gian, nên dấu thời gian đứng đầu và các máy phải chung giờ.
- **8 mức severity của syslog** `m20-severity` — 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug — số càng nhỏ càng nặng
  - Ẩn dụ: Như còi báo động của tòa nhà: số hồi còi càng ít càng khẩn — một hồi dài là cháy thật, còn bảy tiếng bíp lặt vặt chỉ là thợ đang dò mạch.
  - Thẻ ôn: *Đọc 8 mức syslog từ 0 tới 7 (có câu nhớ), và ranh giới nào đáng nhớ nhất?* → Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debug — Em Ăn Cơm Em Với Người Iu Đi. Số càng nhỏ càng nặng. Ranh giới 3/4: từ Error trở xuống là CÓ CHUYỆN THẬT, Warning trở lên là đáng để mắt nhưng chưa chắc sự cố.
- **Log tập trung** `m20-log-tap-trung` — Một máy chủ nhận bản sao nhật ký của mọi thiết bị ngay khi từng dòng được ghi — sổ có bản rời tàu, mọi câu chuyện nằm cạnh nhau
  - Ẩn dụ: Như hộp đen máy bay đặt ở đài kiểm soát thay vì chỉ trên máy bay: tàu gặp nạn thì băng ghi âm đã kịp về nơi an toàn từng câu một.
  - Thẻ ôn: *Ba lý do khiến log tập trung thành chuẩn của nghề?* → Một: thiết bị chết không mang theo sổ — bản sao đã rời tàu từng dòng. Hai: sự cố liên quan nhiều máy thì mọi câu chuyện nằm cạnh nhau, khỏi mở ba chục thiết bị. Ba: kẻ đột nhập xóa vết trên máy nạn nhân không với tay được tới bản sao.
- **Giờ lệch và NTP** `m20-gio-lech` — Đồng hồ thiết bị trôi tự nhiên; các máy không chung giờ thì dòng thời gian ghép từ nhiều log là chuyện bịa — NTP giữ mọi máy chung một nhịp
  - Ẩn dụ: Như lấy lời khai nhân chứng mà đồng hồ mỗi người một giờ: người nói 2 giờ 9, kẻ nói 2 giờ 14 — thứ tự ai thấy gì trước thành vô nghĩa nếu không chỉnh về một múi.
  - Thẻ ôn: *Vì sao giờ lệch giữa thiết bị nguy hiểm cho việc điều tra sự cố, và thuốc là gì?* → Vì dựng nguyên nhân cần thứ tự trước-sau ghép từ log NHIỀU máy — một đồng hồ chạy lệch là hậu quả đứng trước nguyên nhân, người trực sửa nhầm đầu dây. Thuốc: NTP — trỏ mọi thiết bị về cùng nguồn giờ và canh độ lệch như dịch vụ sống còn.
- **Lọc trước, đọc sau** `m20-loc-truoc-doc` — Chiến thuật đọc log: nhát dao theo mức nặng → thời gian → thiết bị, còn dăm dòng mới đọc kỹ; cảnh giác cảnh báo giả quen mặt
  - Ẩn dụ: Như tìm người trong nhà ga: không nhìn từng khuôn mặt từ cổng vào — khoanh chuyến tàu, khoanh toa, rồi mới nhìn mặt từng người trong toa đó.
  - Thẻ ôn: *Chiến thuật đọc file log trăm dòng, và hai câu vặn dành cho cảnh báo giả?* → Lọc trước đọc sau: theo mức nặng (Select-String ERROR) → theo thời gian quanh triệu chứng → theo thiết bị/từ khóa; còn dăm dòng mới đọc kỹ. Gặp WARNING đáng sợ, vặn hai câu: có xuất hiện đều đặn mọi đêm không (nền hay biến cố), có ăn khớp triệu chứng không.
- **SNMP polling** `m20-snmp-polling` — Hệ giám sát chủ động hỏi thăm chỉ số thiết bị theo nhịp đều — vẽ được đồ thị, thấy được thiết bị yếu dần; mù giữa hai lượt hỏi
  - Ẩn dụ: Như y tá đi buồng đo chỉ số từng giường theo giờ: sổ theo dõi đều đặn cho thấy ai đang yếu dần — nhưng chuyện xảy ra giữa hai lượt đi buồng thì phải đợi lượt sau.
  - Thẻ ôn: *Polling là gì, quý ở đâu và mù ở đâu?* → Hệ giám sát chủ động hỏi chỉ số (CPU, RAM, cổng, nhiệt) qua SNMP theo nhịp đều. Quý: chuỗi số đo đều vẽ được đồ thị — thấy thiết bị YẾU DẦN trước khi chết. Mù: biến cố giữa hai lượt hỏi phải đợi lượt sau; rút nhịp quá ngắn thì việc hỏi thành gánh nặng.
- **SNMP trap** `m20-snmp-trap` — Thiết bị tự gửi gói báo động về hệ giám sát ngay khi có biến — tức thì, nhưng không vẽ được xu hướng và chuông có thể thất lạc
  - Ẩn dụ: Như chuông cấp cứu đầu giường: bệnh nhân khó thở là bấm ngay, không đợi y tá tới lượt — nhưng chuông không ghi sổ theo dõi, và người ngất quá nhanh thì không kịp bấm.
  - Thẻ ôn: *Trap là gì, và vì sao không thể chỉ dựa vào trap?* → Thiết bị TỰ HÔ khi có biến (cổng rơi, nguồn hỏng) — hệ giám sát biết trong giây đầu, không đợi nhịp polling. Nhưng: không vẽ được xu hướng, thiết bị chết đột ngột không kịp hô, và gói báo động gửi một lần có thể rơi giữa đường. Nên polling và trap làm lưới an toàn cho nhau.
- **Baseline** `m20-baseline` — Đường bình thường của chính hệ thống, vẽ từ dữ liệu polling và log tích lũy — con số chỉ có nghĩa khi so với nếp cũ, lệch cả hai phía đều là chuông
  - Ẩn dụ: Như bác sĩ gia đình biết huyết áp nền của từng bệnh nhân: cùng một số đo, người này là bình thường, người kia là cấp cứu — không có sổ khám cũ thì con số nào cũng câm.
  - Thẻ ôn: *Baseline là gì, lấy từ đâu, và bất thường có mấy phía?* → Đường bình thường của CHÍNH hệ thống mình — CPU giờ cao điểm, băng thông trưa thứ hai, số Warning quen mặt mỗi đêm — vẽ từ dữ liệu polling và log tích lũy, không chép được từ sách. Bất thường có HAI phía: vọt lên khỏi nếp, và im ắng khác nếp (lưu lượng không tới được máy) — cả hai đều là chuông.

### Bài kiểm tra module (pool 15 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Trong thang severity của syslog, chiều nào là ĐÚNG?
  - **Dạng:** trắc nghiệm · **Số càng nhỏ càng nghiêm trọng — 0 là hệ thống sụp, 7 là dòng gỡ lỗi** ✓ / Số càng lớn càng nghiêm trọng — 7 là hệ thống sụp, 0 là dòng gỡ lỗi / Số chẵn dành cho lỗi thật còn số lẻ dành cho các loại cảnh báo nhẹ
  - **Chủ đề gợi ý (tầng 1):** chiều thang hay bị đoán ngược
  - **Vì sao:** Số càng nhỏ càng nặng: 0 Emergency là sụp, 7 Debug là gỡ lỗi. Thang chạy ngược trực giác nên nó là câu đầu tiên phải thuộc — Em Ăn Cơm Em Với Người Iu Đi.
- **Đề:** Mức ERROR trong thang syslog mang số mấy?
  - **Dạng:** gõ tay · **Chấp nhận:** 3 | số 3 | so 3 | mức 3 | muc 3
  - **Chủ đề gợi ý (tầng 1):** đếm theo câu nhớ từ số 0
  - **Vì sao:** Số 3 — Em (0) Ăn (1) Cơm (2) Em (3): Emergency, Alert, Critical, Error. Ranh giới có-chuyện-thật của cả thang nằm ngay sau nó.
- **Đề:** Xếp tám mức syslog từ 0 (nặng nhất) tới 7 (nhẹ nhất):
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Emergency
    2. Alert
    3. Critical
    4. Error
    5. Warning
    6. Notice
    7. Informational
    8. Debug
  - **Chủ đề gợi ý (tầng 1):** Em Ăn Cơm Em Với Người Iu Đi
  - **Vì sao:** Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debug — câu nhớ Em Ăn Cơm Em Với Người Iu Đi, số càng nhỏ càng nặng. Danh sách rời rạc này do thẻ ôn SM-2 gánh — thi xong nó vẫn quay lại thăm bạn.
- **Đề:** Ca đêm bận, người trực đặt ngưỡng chỉ báo các dòng từ mức 3 trở xuống. Họ đang đánh đổi điều gì?
  - **Dạng:** trắc nghiệm · **Bỏ qua Warning trở lên về phía nhẹ để dòng lỗi thật không bị nhấn chìm** ✓ / Bỏ qua ba mức nặng nhất của thang để đêm trực được yên tĩnh trọn vẹn / Không đánh đổi gì, vì ngưỡng lọc chỉ thay đổi màu sắc khi hiển thị
  - **Chủ đề gợi ý (tầng 1):** giữ 0-3 thì phần nào bị ẩn
  - **Vì sao:** Giữ 0-3 (Emergency tới Error) nghĩa là ẩn 4-7 (Warning tới Debug): chấp nhận không thấy cảnh báo nhẹ để một dòng Error biết nói không chìm trong trận lụt Warning vô hại — đánh đổi có chủ đích của ca đêm.
- **Đề:** Lý do nào KHÔNG phải là lý do gom log về máy chủ tập trung?
  - **Dạng:** trắc nghiệm · **Log tập trung giúp thiết bị ghi nhật ký nhanh hơn hẳn ghi vào sổ tại chỗ** ✓ / Thiết bị chết thì bản sao nhật ký đã kịp rời tàu, không mất theo máy / Sự cố liên quan nhiều thiết bị thì mọi câu chuyện nằm cạnh nhau một chỗ
  - **Chủ đề gợi ý (tầng 1):** ba lý do thật: sổ rời tàu, cạnh nhau, kẻ xóa vết
  - **Vì sao:** Tốc độ ghi không phải lý do — gửi bản sao qua mạng chẳng làm việc ghi nhanh lên. Ba lý do thật: sổ có bản rời tàu trước khi thiết bị chết, mọi câu chuyện nằm cạnh nhau khi lần sự cố, và kẻ đột nhập xóa vết tại chỗ không với tới bản sao.
- **Đề:** Dịch vụ nào giữ đồng hồ của mọi thiết bị chạy chung một nhịp — điều kiện để dòng thời gian ghép từ nhiều log đáng tin?
  - **Dạng:** gõ tay · **Chấp nhận:** ntp | network time protocol | giao thức ntp | giao thuc ntp
  - **Chủ đề gợi ý (tầng 1):** ba chữ cái, T là time
  - **Vì sao:** NTP — Network Time Protocol. Đồng hồ thiết bị trôi tự nhiên; không chung nguồn giờ thì thứ tự trước-sau ghép từ nhiều máy là chuyện bịa, và người trực đi sửa hậu quả thay vì nguyên nhân.
- **Đề:** Log router ghi tuyến rơi 02:09, log switch ghi bão quảng bá 02:14 — nhưng đồng hồ router chạy chậm 6 phút. Sự thật là gì?
  - **Dạng:** trắc nghiệm · **Bão quảng bá nổ ra trước — tuyến rơi thật ra xảy ra lúc 02:15, là hậu quả** ✓ / Tuyến vẫn rơi trước như log ghi, vì giờ lệch không đổi được thứ tự dòng / Không thể có chuyện đó, vì hai thiết bị trong một mạng luôn chung giờ
  - **Chủ đề gợi ý (tầng 1):** cộng 6 phút vào mốc giờ của router
  - **Vì sao:** Đồng hồ router chậm 6 phút nghĩa là 02:09 của nó thật ra là 02:15 — tức bão (02:14) nổ TRƯỚC, tuyến rơi là hậu quả. Một cái đồng hồ lười đảo ngược cả câu chuyện điều tra; và thiết bị không tự chung giờ — NTP phải được cấu hình.
- **Đề:** Nhận file log 180 dòng của một đêm để tìm một sự cố rạng sáng. Bước mở màn đúng nghề?
  - **Dạng:** trắc nghiệm · **Lọc theo mức nặng trước — Select-String ERROR — rồi mới đọc phần còn lại** ✓ / Đọc tuần tự từ dòng một để chắc chắn không bỏ sót bất kỳ manh mối nào / Kéo thẳng xuống các dòng cuối file vì sự cố mới nhất luôn nằm ở đó
  - **Chủ đề gợi ý (tầng 1):** lọc trước, đọc sau
  - **Vì sao:** Lọc trước đọc sau: nhát dao theo mức nặng đưa file 180 dòng về vài dòng chuyện thật. Đọc tuần tự thì mắt trôi qua dòng quan trọng; nhảy xuống cuối file thì sự cố rạng sáng đã bị hàng giờ log sau đó đè lên.
- **Đề:** Dòng WARNING broadcast ratio high xuất hiện đều đặn mỗi đêm suốt nửa năm, mạng vẫn êm. Đêm nay điều tra sự cố, bạn gặp lại nó. Xử thế nào?
  - **Dạng:** trắc nghiệm · **Ghi nhận là nền quen thuộc rồi lọc tiếp — trừ khi nó đột nhiên khác nếp mọi đêm** ✓ / Kết luận thủ phạm ngay, vì tỉ lệ quảng bá cao luôn là dấu hiệu bão quảng bá / Xóa các dòng đó khỏi file log để những lần điều tra sau đỡ bị nhiễu mắt
  - **Chủ đề gợi ý (tầng 1):** hai câu vặn cảnh báo giả
  - **Vì sao:** Xuất hiện đều đặn nửa năm mà mạng êm — nó là NỀN, không phải biến cố; chỉ đáng ngờ khi đột nhiên khác nếp (chính là tư duy baseline). Kết luận vội là dừng nhầm chỗ kinh điển; còn xóa dòng log là hủy chứng cứ.
- **Đề:** Polling và trap khác nhau ở điểm cốt lõi nào?
  - **Dạng:** trắc nghiệm · **Polling: giám sát chủ động hỏi theo nhịp; trap: thiết bị tự hô khi có biến** ✓ / Polling dùng cho switch còn trap chỉ dùng được cho router và máy chủ / Polling gửi cảnh báo tức thì còn trap gom số liệu để vẽ đồ thị dài hạn
  - **Chủ đề gợi ý (tầng 1):** y tá đi buồng và chuông đầu giường
  - **Vì sao:** Polling: giám sát chủ động hỏi đều (vẽ được đồ thị, thấy yếu dần). Trap: thiết bị tự hô khi có biến (tức thì). Phương án ba nói ngược vai; còn cả hai đều chạy trên SNMP cho mọi loại thiết bị.
- **Đề:** Cơ chế nào cho hệ giám sát biết nguồn điện switch vừa hỏng NGAY trong giây đầu tiên, không đợi lượt hỏi thăm?
  - **Dạng:** gõ tay · **Chấp nhận:** trap | snmp trap | gửi trap | gui trap
  - **Chủ đề gợi ý (tầng 1):** chuông đầu giường
  - **Vì sao:** Trap — thiết bị tự gửi gói báo động ngay khi có biến. Tức thì là cái quý; cái thiếu là không vẽ được xu hướng và gói có thể thất lạc — nên polling vẫn đi buồng đều làm lưới an toàn.
- **Đề:** CPU switch trục đang 60%. Vì sao người trực có kinh nghiệm CHƯA kết luận gì?
  - **Dạng:** trắc nghiệm · **Vì 60% chỉ có nghĩa khi so với baseline — nếp cũ của chính máy này giờ này** ✓ / Vì đồng hồ đo CPU của thiết bị mạng luôn sai lệch quá lớn để tin được / Vì CPU dưới 90% theo chuẩn chung của ngành là an toàn tuyệt đối
  - **Chủ đề gợi ý (tầng 1):** con số cần thứ để so
  - **Vì sao:** 60% là báo động nếu mọi thứ tư máy này chỉ chạy 20%, là chuyện thường nếu tuần nào cũng thế — con số chỉ thành thông tin khi so với baseline của chính nó. Không có chuẩn chung nào của ngành thay được nếp cũ của từng hệ thống.
- **Đề:** Router biên mọi trưa chạy 45% băng thông, trưa nay im ắng ở 4%. Người trực có baseline làm gì?
  - **Dạng:** trắc nghiệm · **Đi kiểm tra ngay — im ắng bật khỏi nếp cũng là chuông báo như vọt lên** ✓ / Ghi nhận tin vui vì thiết bị đang được nghỉ ngơi nhàn hơn mọi ngày / Chờ tới khi có người dùng gọi lên than phiền rồi mới bắt đầu xem xét
  - **Chủ đề gợi ý (tầng 1):** bất thường có hai phía
  - **Vì sao:** Bất thường có hai phía: 4% giữa trưa nghĩa là lưu lượng thường ngày không tới được máy này — có thể một nhánh đã rơi mà người dùng chưa kịp kêu. Thấy sự cố TRƯỚC người dùng chính là toàn bộ lý do của môn giám sát.
- **Đề:** Sáng thứ hai, người dùng tầng ba lại kêu không có mạng. Trong tay bạn là srv-dhcp.log — nhật ký một buổi sáng của máy chủ DHCP, hơn 150 dòng. Lôi đúng dòng sự cố ra bằng một dòng pipeline; kiến thức Module 18 sẽ nói cho bạn biết nó nghĩa là gì.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy SRV-GIAM-SAT [10.20.0.15/24] — file: srv-dhcp.log
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "no free leases in scope 10.20.3.0"
    - **Lệnh mẫu:** `Get-Content srv-dhcp.log | Select-String ERROR`
  - **Chủ đề gợi ý (tầng 1):** lọc theo mức có-chuyện-thật của thang syslog
  - **Vì sao:** Get-Content srv-dhcp.log | Select-String ERROR lôi ra dòng no free leases in scope 10.20.3.0 — scope tầng ba đã cạn, đúng ca sáng-thứ-hai của Module 18. Đống WARNING utilization phía trước chính là điềm báo bị bỏ qua: 85%, rồi 91%, rồi cạn. Ai theo dõi tỉ lệ cấp phát đã thấy nó từ tuần trước.
- **Đề:** Camera tầng bốn mất hình lúc rạng sáng; sw-core.log ghi nguyên đêm của switch trục — hơn 160 dòng, thừa mứa cảnh báo giả. Tìm đúng dòng sự cố. Đây là đống rơm bạn từng gặp trong bài học — nhưng lần này không còn gợi ý cú pháp nào nữa.
  - **Dạng:** terminal PowerShell (gõ lệnh đạt mục tiêu)
    - **Thế giới:** máy SRV-GIAM-SAT [10.20.0.15/24] — file: sw-core.log
    - **Mục tiêu:**
      - phải lôi ra được dòng chứa "link down on port 12"
    - **Lệnh mẫu:** `Get-Content sw-core.log | Select-String ERROR`
  - **Chủ đề gợi ý (tầng 1):** lọc trước, đọc sau
  - **Vì sao:** Get-Content sw-core.log | Select-String ERROR — một nhát dao theo mức nặng và dòng 03:41:17 ERROR link down on port 12 nổi lên giữa 160 dòng. Mấy chục WARNING quạt và quảng bá là nền quen mặt của mọi đêm; camera tầng bốn cắm ở cổng 12 — thời gian và vị trí khớp trọn.

## Capstone — Dựng mạng chi nhánh `module-21`

Phần E · 4 chặng · 4 bài · 2 khái niệm

**Chặng:** Chặng 1: Cắt đất trên giấy (m21-bai-1) → Chặng 2: Nối dây, dạy đường (m21-bai-2) → Chặng 3: Luật chặn đúng người (m21-bai-3) → Tổng duyệt trước bàn giao (m21-bai-4)

### Bài: Cắt dải địa chỉ cho chi nhánh mới `m21-bai-1`

**1 · Khởi động (hook):** Sáng nay công ty ký hợp đồng thuê tầng bảy một tòa nhà ở thành phố khác. Trên bàn bạn: một thùng thiết bị còn nguyên hộp, một dải địa chỉ được cấp — 10.40.0.0/24 — và một tờ yêu cầu ba dòng: phòng kinh doanh 60 máy, phòng kỹ thuật 25 máy, phòng khách 10 máy, cộng một đường nối về trụ sở. Không ai đưa thêm chỉ dẫn nào. Người có nghề bắt đầu từ đâu — và vì sao KHÔNG phải từ cái thùng thiết bị?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: dựng một mạng mới từ con số không, việc ĐẦU TIÊN của người có nghề là gì?
  - **Dạng:** trắc nghiệm · **Đặt địa chỉ trên giấy — cắt dải cho từng phòng trước khi chạm vào thiết bị** ✓ / Nối dây toàn bộ thiết bị trước để nhìn thấy mạng chạy rồi tính tiếp / Cấu hình từng thiết bị ngay khi mở hộp cho khỏi quên các bước lệnh
  - **Chủ đề gợi ý (tầng 1):** thứ rẻ nhất để sửa là thứ nằm trên giấy
  - **Vì sao:** Đặt địa chỉ trên giấy trước. Bản cắt dải sai mà phát hiện khi còn trên giấy thì sửa mất một phút; phát hiện sau khi đã cấu hình ba chục thiết bị thì đập đi làm lại cả buổi. Quy trình của nghề: đặt địa chỉ → nối dây → cấu hình → kiểm chứng — và bước một không cần cắm điện.

**3 · Khám phá (teach):**
- *[m21-quy-trinh]* Mọi mạng trong khóa này bạn đều nhận SẴN — capstone là lần đầu bạn dựng từ số không, nên nó cần một quy trình: ĐẶT ĐỊA CHỈ (cắt dải trên giấy — VLSM của Module 13), NỐI DÂY (sơ đồ vật lý), CẤU HÌNH (trunk, định tuyến, luật — bằng CLI), KIỂM CHỨNG (mỗi bước xong phải có bằng chứng bằng lệnh). Thứ tự này không phải nghi thức: mỗi bước đứng trên kết quả của bước trước, và lỗi ở bước nào thì rẻ nhất là bắt được ngay tại bước đó. Cả module này là một công trường: ba chặng nộp riêng, chặng sau xây trên chặng trước — nản ở chặng nào cũng không mất công chặng đã qua.
  - **Đào sâu hơn:** Vì sao địa chỉ đứng trước cả nối dây? Vì bản cắt dải là thứ MỌI bước sau tra cứu: cổng router lấy địa chỉ nào, câu network của OSPF khai dải nào, luật ACL chặn subnet nào — tất cả chép từ tờ giấy đó. Tờ giấy sai thì mọi thứ xây trên nó sai theo, mà tờ giấy thì sửa bằng cục tẩy. Nghề gọi đây là nguyên tắc lỗi-rẻ: đẩy mọi quyết định dễ sai về nơi sửa nó rẻ nhất.

**4 · Thử tay (practice, fading 0):**
- **Ví dụ giải sẵn:** Cắt mẫu dải 10.40.0.0/24 cho tờ yêu cầu, từng bước như Module 13 đã dạy. Bước 1 — xếp phòng theo cỡ GIẢM DẦN: kinh doanh 60, kỹ thuật 25, khách 10, liên site 2. Bước 2 — chọn cỡ khối nhỏ nhất đủ dùng cho từng phòng: 60 máy cần /26 (62 chỗ), 25 máy cần /27 (30 chỗ), 10 máy cần /28 (14 chỗ), liên site 2 địa chỉ cần /30. Bước 3 — cắt lớn trước từ đầu dải: kinh doanh lấy 10.40.0.0/26 (hết .63), kỹ thuật lấy 10.40.0.64/27 (hết .95), khách lấy 10.40.0.96/28 (hết .111), liên site lấy 10.40.0.112/30. Bước 4 — kiểm lại ba tiêu chí: không chồng lấn, đủ chỗ từng phòng, không phí đất. Bước 5 — ghi luôn địa chỉ cổng router của từng phòng (theo lệ: địa chỉ đầu dải): 10.40.0.1, 10.40.0.65, 10.40.0.97 — tờ giấy này là kim chỉ nam của cả ba chặng.
- **Đề:** Theo bản cắt trong ví dụ: phòng kỹ thuật 25 máy nhận dải nào? (viết dạng địa-chỉ/prefix)
  - **Dạng:** gõ tay · **Chấp nhận:** 10.40.0.64/27 | 10.40.0.64 /27 | 10.40.0.64/ 27
  - **Chủ đề gợi ý (tầng 1):** khối /27 nằm ngay sau khối /26 của kinh doanh
  - **Gợi ý (tầng 2):** Kinh doanh chiếm 10.40.0.0/26, tức tới hết .63. Khối kế tiếp bắt đầu ở đâu, và 25 máy cần cỡ nào?
  - **Lời giải (tầng 3):** 10.40.0.64/27 — bắt đầu ngay sau khối /26 (hết .63), cỡ /27 cho 30 chỗ là cỡ nhỏ nhất đủ 25 máy. Cắt lớn trước, khối sau nối đuôi khối trước là không bao giờ chồng lấn.
- **Đề:** Đường liên site về trụ sở chỉ cần hai địa chỉ. Dải nhỏ nhất đủ dùng, cắt tiếp theo bản trong ví dụ, là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** 10.40.0.112/30 | 10.40.0.112 /30 | 10.40.0.112/ 30
  - **Chủ đề gợi ý (tầng 1):** khối /30 có đúng 2 địa chỉ dùng được
  - **Gợi ý (tầng 2):** Khách chiếm 10.40.0.96/28 (hết .111). Hai địa chỉ dùng được là cỡ /30 — bắt đầu từ đâu?
  - **Lời giải (tầng 3):** 10.40.0.112/30 — hai địa chỉ dùng được (.113 và .114), vừa khít cho hai đầu WAN. Cắt /24 to hơn cho một sợi dây nối hai router là kiểu phí đất mà drill VLSM đã dạy bạn tránh.
- **Đề:** CHẶNG 1 — nộp riêng: đặt bản cắt lên sơ đồ thật. Router chi nhánh đã mang sẵn địa chỉ cổng theo tờ giấy (.1 /26, .65 /27, .97 /28). Ba máy đại diện ba phòng còn TRẮNG TRƠN: cấp địa chỉ và gateway cho từng máy đúng dải phòng nó, sao cho ba phòng gọi được nhau qua router.
  - **Dạng:** phòng lab (lắp/sửa sơ đồ mạng)
    - **Sơ đồ đề bài:** PC-KinhDoanh [chưa đặt IP] · PC-KyThuat [chưa đặt IP] · PC-PhongKhach [chưa đặt IP] · SW-KinhDoanh [p1:VLAN 1, p2:VLAN 1] · SW-KyThuat [p1:VLAN 1, p2:VLAN 1] · SW-PhongKhach [p1:VLAN 1, p2:VLAN 1] · R-ChiNhanh [g0:10.40.0.1/26, g1:10.40.0.65/27, g2:10.40.0.97/28] — dây: PC-KinhDoanh·eth0 — SW-KinhDoanh·p1 | SW-KinhDoanh·p2 — R-ChiNhanh·g0 | PC-KyThuat·eth0 — SW-KyThuat·p1 | SW-KyThuat·p2 — R-ChiNhanh·g1 | PC-PhongKhach·eth0 — SW-PhongKhach·p1 | SW-PhongKhach·p2 — R-ChiNhanh·g2
    - **Mục tiêu:**
      - pc-kd PHẢI gọi được pc-kt
      - pc-kt PHẢI gọi được pc-kh
      - pc-kd PHẢI gọi được pc-kh
    - **Được phép:** đặt địa chỉ
    - **Lời giải mẫu:** PC-KinhDoanh [10.40.0.2/26, gw 10.40.0.1] · PC-KyThuat [10.40.0.66/27, gw 10.40.0.65] · PC-PhongKhach [10.40.0.98/28, gw 10.40.0.97] · SW-KinhDoanh [p1:VLAN 1, p2:VLAN 1] · SW-KyThuat [p1:VLAN 1, p2:VLAN 1] · SW-PhongKhach [p1:VLAN 1, p2:VLAN 1] · R-ChiNhanh [g0:10.40.0.1/26, g1:10.40.0.65/27, g2:10.40.0.97/28] — dây: PC-KinhDoanh·eth0 — SW-KinhDoanh·p1 | SW-KinhDoanh·p2 — R-ChiNhanh·g0 | PC-KyThuat·eth0 — SW-KyThuat·p1 | SW-KyThuat·p2 — R-ChiNhanh·g1 | PC-PhongKhach·eth0 — SW-PhongKhach·p1 | SW-PhongKhach·p2 — R-ChiNhanh·g2
  - **Chủ đề gợi ý (tầng 1):** mỗi máy cùng dải với cổng router phòng nó, gateway là chính cổng đó
  - **Gợi ý (tầng 2):** Kinh doanh: địa chỉ trong 10.40.0.2-.62 với prefix 26, gateway 10.40.0.1. Làm tương tự cho kỹ thuật (/27, gateway .65) và khách (/28, gateway .97) — nhớ prefix của TỪNG phòng khác nhau.
  - **Lời giải (tầng 3):** Ví dụ đạt: PC kinh doanh 10.40.0.2/26 gateway 10.40.0.1; PC kỹ thuật 10.40.0.66/27 gateway 10.40.0.65; PC khách 10.40.0.98/28 gateway 10.40.0.97. Địa chỉ nào cùng dải với cổng router phòng đó đều được — sai prefix hoặc sai gateway là ping xuyên phòng đứt ngay, và nhật ký chặng sẽ chỉ chỗ đứt.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: bốn bước của quy trình dựng mạng, theo đúng thứ tự? (viết cách nhau bằng dấu phẩy hoặc mũi tên)
  - **Dạng:** gõ tay · **Chấp nhận:** đặt địa chỉ, nối dây, cấu hình, kiểm chứng | dat dia chi, noi day, cau hinh, kiem chung | đặt địa chỉ nối dây cấu hình kiểm chứng | dat dia chi noi day cau hinh kiem chung | địa chỉ, nối dây, cấu hình, kiểm chứng | dia chi, noi day, cau hinh, kiem chung
  - **Chủ đề gợi ý (tầng 1):** bắt đầu từ tờ giấy, kết thúc bằng bằng chứng
  - **Gợi ý (tầng 2):** Giấy trước, dây sau, lệnh tiếp, và không bao giờ tin mà không kiểm.
  - **Lời giải (tầng 3):** Đặt địa chỉ → nối dây → cấu hình → kiểm chứng. Mỗi bước đứng trên bước trước, và lỗi bắt sớm ở đâu thì rẻ ở đó — tờ giấy sửa bằng tẩy, mạng chạy rồi sửa bằng cả buổi.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao VLSM phải cắt khối LỚN trước, khối nhỏ sau?
  - **Nhóm ý cần chạm:** [lớn trước, lon truoc, giảm dần, giam dan, to trước, to truoc] · [chồng lấn, chong lan, đè lên, de len, trùng, trung ] · [căn khối, can khoi, ranh giới, ranh gioi, biên, bien , lỗ hổng, lo hong, kẽ hở, ke ho] · [nối đuôi, noi duoi, liền mạch, lien mach, khít, khit]
  - **Trả lời mẫu:** Vì khối to chỉ đứng được ở những ranh giới thưa — cắt khối nhỏ trước là lấp mất các ranh giới đó, đến lượt khối to không còn chỗ đặt vừa và sinh kẽ hở phí đất. Cắt to trước, nhỏ sau thì khối sau cứ nối đuôi khối trước: không chồng lấn, không kẽ hở, và tờ giấy tự khít.

**6 · Tổng kết:**
- Quy trình bốn bước: đặt địa chỉ → nối dây → cấu hình → kiểm chứng — lỗi bắt sớm là lỗi rẻ.
- Bản cắt VLSM là kim chỉ nam mọi bước sau: địa chỉ cổng, câu network OSPF, luật ACL đều chép từ nó.
- Chặng 1 nộp xong: ba phòng ba dải đúng cỡ, gọi nhau thông qua router — nền của hai chặng còn lại.
- *Úp mở bài sau:* Địa chỉ đã nằm đúng chỗ. Nhưng chi nhánh vẫn là ốc đảo: hai switch chưa chở nổi hai xóm qua một sợi dây, và router chi nhánh chưa từng chào hỏi router trụ sở. Chặng 2: nối dây và để hai bên tự dạy nhau đường.

### Bài: Nối chi nhánh về trụ sở bằng trunk và OSPF `m21-bai-2`

**1 · Khởi động (hook):** Đội thi công vừa rút đi — và mang theo một tin mới: phòng kỹ thuật dời sang tòa nhà bên cạnh, dải /27 bạn cắt ở chặng 1 thành của để dành (địa chỉ để dành là chuyện thường ngày của người thiết kế — bản cắt không hề uổng). Ở tòa này còn lại kinh doanh và khách: hai switch đã nối nhau một sợi dây, đường WAN về trụ sở đã sáng đèn. Nhưng máy kinh doanh gọi máy chủ kế toán ở trụ sở thì lặng thinh — khung tin của xóm 10 chết ngay trên sợi dây giữa hai switch, còn router chi nhánh thì chưa hề biết trụ sở có những mạng nào. Hai việc, hai tầng, một chặng: bạn còn nhớ dụng cụ của Module 14 và 16 chứ?

**2 · Đoán thử (pretest):**
- **Đề:** Một sợi dây giữa hai switch phải chở khung tin của CẢ VLAN 10 lẫn VLAN 20. Hai đầu dây đó phải là gì?
  - **Dạng:** trắc nghiệm · **Cổng trunk cả hai đầu, allowed list cho cả hai VLAN đi qua** ✓ / Cổng access VLAN 10 một đầu và cổng access VLAN 20 đầu kia / Không cần gì đặc biệt — switch tự nhận ra khung của nhiều VLAN
  - **Chủ đề gợi ý (tầng 1):** một dây chở nhiều xóm là bài mở màn Phần D
  - **Vì sao:** Trunk cả hai đầu + allowed list đủ hai VLAN — bài học mở màn Module 14. Access hai đầu lệch VLAN là khung lạc xóm trong im lặng; còn switch không tự đàm phán gì trong mô hình này (không DTP — đơn giản hóa đã khai).

**3 · Khám phá (teach):**
- *[m21-kiem-chung]* Chặng này làm hai việc ở hai tầng — trunk ở tầng 2, OSPF ở tầng 3 — và luật vàng của công trường là KIỂM CHỨNG TỪNG TẦNG XONG MỚI LEO TIẾP. Dựng trunk xong: show interfaces trunk phải thấy đúng vai, đúng allowed list. Bật OSPF xong: show ip ospf neighbor phải thấy chữ FULL — hai router đã đồng bộ trọn bản đồ. Rồi mới tới bằng chứng cuối: ping xuyên site. Người mới hay gõ một mạch rồi ping phát ăn ngay; đến lúc ping câm thì không biết nó chết ở tầng nào. Người có nghề leo thang từng bậc, mỗi bậc một tấm bằng chứng — vì thế lúc có chuyện, họ biết ngay bậc nào gãy.
  - **Đào sâu hơn:** Chuỗi kiểm chứng của chặng này đọc như một bài thơ ba câu: show interfaces trunk (tầng 2 sống chưa) → show ip ospf neighbor ra Full (tầng 3 quen nhau chưa) → ping xuyên site (đường đi trọn vẹn chưa). Ba lệnh, ba tầng, đúng thứ tự thấp lên cao — chính là cái thang khám bệnh của phòng khám Module 11, giờ chạy chiều xuôi để XÂY thay vì chiều ngược để SỬA.

**4 · Thử tay (practice, fading 1):**
- **Đề:** CHẶNG 2 — nộp riêng. Hiện trạng: sợi dây giữa SW-1 và SW-2 còn là access mặc định nên VLAN 10 (kinh doanh) và VLAN 20 (khách) không qua nổi; R-ChiNhanh chưa bật OSPF nên chưa biết đường về trụ sở (trụ sở ĐÃ bật sẵn). Việc của bạn: dựng trunk hai đầu dây liên switch (cổng p3 mỗi bên, cho đúng VLAN 10 và 20 đi), bật OSPF trên R-ChiNhanh khai đủ ba mạng của nó, rồi KIỂM CHỨNG láng giềng ra Full trước khi nộp.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-KinhDoanh [10.40.0.2/26, gw 10.40.0.1] · PC-PhongKhach [10.40.0.98/28, gw 10.40.0.97] · SRV-KeToan [10.20.0.9/24, gw 10.20.0.1] · SRV-Web-Internet [203.0.113.80/24, gw 203.0.113.1] · SW-1 [p1:VLAN 10, p2:VLAN 20, p3:VLAN 1] · SW-2 [p1:VLAN 10, p2:VLAN 20, p3:VLAN 1] · R-ChiNhanh [g0:10.40.0.1/26, g1:10.40.0.97/28, g2:10.40.0.113/30] · R-TruSo [g0:10.40.0.114/30, g1:10.20.0.1/24, g2:203.0.113.1/24] · SW-TruSo [p1:VLAN 1, p2:VLAN 1] · SW-Web [p1:VLAN 1, p2:VLAN 1] — dây: PC-KinhDoanh·eth0 — SW-1·p1 | PC-PhongKhach·eth0 — SW-1·p2 | SW-1·p3 — SW-2·p3 | SW-2·p1 — R-ChiNhanh·g0 | SW-2·p2 — R-ChiNhanh·g1 | R-ChiNhanh·g2 — R-TruSo·g0 | R-TruSo·g1 — SW-TruSo·p1 | SW-TruSo·p2 — SRV-KeToan·eth0 | R-TruSo·g2 — SW-Web·p1 | SW-Web·p2 — SRV-Web-Internet·eth0
    - **Console cắm ở:** SW-1
    - **Mục tiêu:**
      - cổng p3 của SW-1 phải là trunk
      - cổng p3 của SW-2 phải là trunk
      - trunk ở cổng p3 của SW-1 phải cho VLAN 10, 20 đi qua
      - trunk ở cổng p3 của SW-2 phải cho VLAN 10, 20 đi qua
      - phải xem "show ip ospf neighbor" trên R-ChiNhanh
      - pc-kd PHẢI gọi được srv-kt
      - pc-kh PHẢI gọi được srv-web
    - **Lệnh mẫu trên SW-1:** `enable` rồi `configure terminal` rồi `interface p3` rồi `switchport mode trunk` rồi `switchport trunk allowed vlan 10,20` rồi `end`
    - **Lệnh mẫu trên SW-2:** `enable` rồi `configure terminal` rồi `interface p3` rồi `switchport mode trunk` rồi `switchport trunk allowed vlan 10,20` rồi `end`
    - **Lệnh mẫu trên R-ChiNhanh:** `enable` rồi `configure terminal` rồi `router ospf 1` rồi `network 10.40.0.0 0.0.0.63 area 0` rồi `network 10.40.0.96 0.0.0.15 area 0` rồi `network 10.40.0.112 0.0.0.3 area 0` rồi `end` rồi `show ip ospf neighbor`
  - **Chủ đề gợi ý (tầng 1):** trunk hai đầu p3, rồi router ospf 1 với ba câu network wildcard
  - **Gợi ý (tầng 2):** Ba khối việc: trên MỖI switch vào interface p3 gõ switchport mode trunk + switchport trunk allowed vlan 10,20; trên R-ChiNhanh vào router ospf 1 rồi khai ba câu network với wildcard ĐẢO của từng dải (/26 → 0.0.0.63, /28 → 0.0.0.15, /30 → 0.0.0.3); cuối cùng show ip ospf neighbor phải ra Full.
  - **Lời giải (tầng 3):** SW-1 và SW-2: interface p3 → switchport mode trunk → switchport trunk allowed vlan 10,20. R-ChiNhanh: router ospf 1 → network 10.40.0.0 0.0.0.63 area 0 → network 10.40.0.96 0.0.0.15 area 0 → network 10.40.0.112 0.0.0.3 area 0 → end → show ip ospf neighbor thấy FULL. Trunk sống thì hai xóm qua được dây liên switch; OSPF lên thì hai router tự kể đường cho nhau — ping xuyên site tự thông, không một tuyến tĩnh nào phải gõ.
- **Đề:** show ip ospf neighbor trên R-ChiNhanh ra Full. Cột mốc đó chứng minh điều gì?
  - **Dạng:** trắc nghiệm · **Hai router đã đồng bộ trọn bản đồ mạng — bảng định tuyến hai bên tự đầy đủ** ✓ / Đường WAN giữa hai site đạt tốc độ tối đa theo hợp đồng với nhà mạng / Mọi máy trạm hai site đã ping được nhau, không cần kiểm chứng thêm
  - **Chủ đề gợi ý (tầng 1):** phòng Full trong tòa nhà làm quen của M16
  - **Gợi ý (tầng 2):** Full là phòng cuối của tòa nhà bốn tầng — hai bản đồ chồng khít. Nó nói về ROUTER, chưa nói về máy trạm.
  - **Lời giải (tầng 3):** Full = hai router giữ cùng một bản đồ, bảng định tuyến tự học đủ đường. Nó không đo tốc độ, và cũng CHƯA thay được bước ping cuối — trunk hỏng thì router Full mà máy trạm vẫn câm, vì thế thang kiểm chứng mới cần đủ ba bậc.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: lệnh nào là bằng chứng kiểm chứng của tầng định tuyến trong chặng này?
  - **Dạng:** gõ tay · **Chấp nhận:** show ip ospf neighbor | sh ip ospf neighbor | show ip ospf neighbour
  - **Chủ đề gợi ý (tầng 1):** bảng láng giềng phải ra chữ Full
  - **Gợi ý (tầng 2):** Bảng liệt kê hàng xóm OSPF và trạng thái cuộc làm quen.
  - **Lời giải (tầng 3):** show ip ospf neighbor — ra FULL mới tính là hai router đồng bộ xong bản đồ. Mỗi tầng một bằng chứng: trunk có show interfaces trunk, định tuyến có bảng láng giềng, đường trọn vẹn có ping.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao phải kiểm chứng TỪNG TẦNG thay vì gõ hết cấu hình rồi ping một phát cuối cùng?
  - **Nhóm ý cần chạm:** [tầng nào, tang nao, bậc nào, bac nao, chết ở đâu, chet o dau, khoanh, khoanh vung] · [ping câm, ping cam, không biết, khong biet, mù, mu ] · [từng bước, tung buoc, từng tầng, tung tang, mỗi bậc, moi bac, bằng chứng, bang chung] · [trunk, ospf, full, neighbor, láng giềng, lang gieng]
  - **Trả lời mẫu:** Vì ping là phép thử của CẢ đường đi — nó câm thì chỉ biết là hỏng, không biết hỏng ở tầng nào. Kiểm từng tầng thì mỗi bậc có một tấm bằng chứng riêng: trunk sống (show interfaces trunk), láng giềng Full (show ip ospf neighbor), rồi mới ping. Lúc có chuyện, người leo thang từng bậc biết ngay bậc nào gãy; người gõ một mạch phải dò lại từ đầu.

**6 · Tổng kết:**
- Chặng 2 nộp xong: trunk chở hai xóm qua một dây, OSPF cho hai site tự kể đường — không một tuyến tĩnh nào.
- Wildcard trong câu network chép thẳng từ bản cắt chặng 1: /26 → 0.0.0.63, /28 → 0.0.0.15, /30 → 0.0.0.3.
- Kiểm chứng leo thang ba bậc: trunk sống → láng giềng Full → ping xuyên site.
- *Úp mở bài sau:* Mạng đã thông hai site — thông tới mức AI CŨNG tới được máy chủ kế toán, kể cả cái máy ở phòng khách mà khách vãng lai nào cũng cắm được. Chặng cuối: viết luật chặn đúng người, và đừng chặn nhầm cả sếp như ca kinh điển của Module 17.

### Bài: Viết luật bảo vệ máy chủ kế toán `m21-bai-3`

**1 · Khởi động (hook):** Biên bản nghiệm thu chặng 2 vừa ký xong thì trưởng phòng kế toán gọi: "máy nào ở phòng khách cũng mở được đường tới máy chủ kế toán — thế thì khách vãng lai cắm laptop vào là dò được tài liệu lương thưởng à?" Yêu cầu chốt bằng một câu: khách vẫn được ra Internet thoải mái, nhưng tuyệt đối không được chạm vào máy chủ kế toán — và các phòng khác không bị vạ lây. Một câu của sếp, mấy dòng luật của bạn?

**2 · Đoán thử (pretest):**
- **Đề:** Luật "chặn phòng khách tới máy chủ kế toán, còn lại cho qua" cần phân biệt cả NGUỒN lẫn ĐÍCH. Nó thuộc họ ACL nào, và theo quy tắc nghề thì đặt gần đâu?
  - **Dạng:** trắc nghiệm · **ACL mở rộng (100-199), đặt gần NGUỒN — ngay cổng router phía phòng khách** ✓ / ACL chuẩn (1-99), đặt gần NGUỒN — vì luật nào cũng nên chặn từ sớm / ACL mở rộng (100-199), đặt gần ĐÍCH — sát ngay trước máy chủ kế toán
  - **Chủ đề gợi ý (tầng 1):** loại nào nhìn được đích thì được phép chặn sớm
  - **Vì sao:** Cần cả nguồn lẫn đích → họ mở rộng (100-199). Mở rộng biết đủ thông tin để chặn ĐÚNG ngay từ sớm nên đặt gần nguồn — cổng router phía phòng khách; gói xấu chết tại cửa, không tốn đường WAN. Chuẩn mù đích mới phải lùi về gần đích.

**3 · Khám phá (teach):**
- *[m21-quy-trinh]* Để ý chỗ đứng của chặng này trong quy trình: LUẬT ĐI SAU CÙNG — sau khi địa chỉ đã đúng, đường đã thông, kiểm chứng đã xanh. Không phải ngẫu nhiên: luật chặn viết lên một mạng chưa thông là tự bịt mắt mình — ping câm thì hết biết tại luật hay tại đường. Dựng cho THÔNG trước, kiểm chứng xong, rồi mới THẮT lại đúng chỗ; và sau khi thắt phải kiểm chứng CẢ HAI CHIỀU: thứ phải chặn đã chặn, và mọi thứ từng thông vẫn thông. Cặp bằng chứng thông-và-chặn đó là chữ ký nghiệm thu của người làm luật cẩn thận.
  - **Đào sâu hơn:** Cặp thông-chặn còn là hàng rào chống hai kiểu giải sai đã gặp suốt khóa: chỉ đo phải-chặn thì rút dây cũng đạt (Module 4 dạy từ những ngày đầu); chỉ đo phải-thông thì permit any any cũng đạt (Module 17 vừa nhắc). Đề nộp của chặng này vì thế chấm đủ bốn mục tiêu: khách bị chặn tới kế toán, khách vẫn ra Internet, kinh doanh không vạ lây, và bạn đã tự tra bảng luật làm bằng chứng.

**4 · Thử tay (practice, fading 2):**
- **Đề:** CHẶNG 3 — nộp riêng, không còn khuôn gợi ý. Mạng chính là thành quả chặng 2 (trunk sống, OSPF Full, mọi đường đều thông). Yêu cầu của kế toán: phòng khách (dải 10.40.0.96/28) không được ping tới máy chủ kế toán 10.20.0.9; vẫn ra được Internet (203.0.113.80); phòng kinh doanh không bị ảnh hưởng. Tự chọn số hiệu, tự chọn cửa, tự chọn chiều — và tự tra bảng luật để làm bằng chứng trước khi nộp.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-KinhDoanh [10.40.0.2/26, gw 10.40.0.1] · PC-PhongKhach [10.40.0.98/28, gw 10.40.0.97] · SRV-KeToan [10.20.0.9/24, gw 10.20.0.1] · SRV-Web-Internet [203.0.113.80/24, gw 203.0.113.1] · SW-1 [p1:VLAN 10, p2:VLAN 20, p3:VLAN 1] · SW-2 [p1:VLAN 10, p2:VLAN 20, p3:VLAN 1] · R-ChiNhanh [g0:10.40.0.1/26, g1:10.40.0.97/28, g2:10.40.0.113/30] · R-TruSo [g0:10.40.0.114/30, g1:10.20.0.1/24, g2:203.0.113.1/24] · SW-TruSo [p1:VLAN 1, p2:VLAN 1] · SW-Web [p1:VLAN 1, p2:VLAN 1] — dây: PC-KinhDoanh·eth0 — SW-1·p1 | PC-PhongKhach·eth0 — SW-1·p2 | SW-1·p3 — SW-2·p3 | SW-2·p1 — R-ChiNhanh·g0 | SW-2·p2 — R-ChiNhanh·g1 | R-ChiNhanh·g2 — R-TruSo·g0 | R-TruSo·g1 — SW-TruSo·p1 | SW-TruSo·p2 — SRV-KeToan·eth0 | R-TruSo·g2 — SW-Web·p1 | SW-Web·p2 — SRV-Web-Internet·eth0
    - **Console cắm ở:** R-ChiNhanh
    - **Mục tiêu:**
      - pc-kh phải KHÔNG gọi được srv-kt
      - pc-kh PHẢI gọi được srv-web
      - pc-kd PHẢI gọi được srv-kt
      - phải xem "show access-lists" trên R-ChiNhanh
    - **Lệnh mẫu trên R-ChiNhanh:** `enable` rồi `configure terminal` rồi `access-list 101 deny icmp 10.40.0.96 0.0.0.15 host 10.20.0.9` rồi `access-list 101 permit ip any any` rồi `interface g1` rồi `ip access-group 101 in` rồi `end` rồi `show access-lists`
  - **Chủ đề gợi ý (tầng 1):** một dòng cấm hẹp, một dòng mở rộng, áp đúng cửa phòng khách
  - **Gợi ý (tầng 2):** Nếp Module 17: dòng cấm HẸP trước (deny icmp <dải khách với wildcard> host <máy chủ>), dòng permit ip any any sau, rồi vào đúng cổng router phía phòng khách áp chiều in. Wildcard của /28 tra từ bản cắt chặng 1.
  - **Lời giải (tầng 3):** Trên R-ChiNhanh: access-list 101 deny icmp 10.40.0.96 0.0.0.15 host 10.20.0.9 → access-list 101 permit ip any any → interface g1 → ip access-group 101 in → show access-lists. Dòng hẹp đứng trước ăn đúng gói khách-tới-kế-toán; dòng mở sau giữ đường Internet cho khách và mọi đường của kinh doanh. Bốn mục tiêu xanh là biên bản nghiệm thu tự ký.
- **Đề:** Nộp chặng 3 mà chỉ đạt mục tiêu "khách bị chặn tới kế toán", còn "khách ra Internet" đỏ. Khả năng cao bạn đã phạm lỗi nào?
  - **Dạng:** trắc nghiệm · **Thiếu dòng permit cuối danh sách — dòng cấm vô hình đang chặn cả phần còn lại** ✓ / Đặt số hiệu ACL quá lớn nên router tự động chặn mọi loại lưu lượng / Gõ luật trên switch thay vì router nên chỉ một nửa số luật có hiệu lực
  - **Chủ đề gợi ý (tầng 1):** ca chặn-nhầm-cả-sếp của Module 17
  - **Gợi ý (tầng 2):** Danh sách chỉ có một dòng deny thì gói KHÔNG khớp dòng nào sẽ gặp ai ở cuối danh sách?
  - **Lời giải (tầng 3):** Thiếu permit ip any any — mọi gói không khớp dòng cấm rơi vào dòng cấm vô hình cuối danh sách, và khách mất luôn Internet (may mà bảng mục tiêu bắt được trước khi sếp gọi). Số hiệu chỉ chọn họ ACL, còn switch trong app không nhận luật ACL — hai phương án kia là nhiễu.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: wildcard tương ứng với dải /28 của phòng khách là gì?
  - **Dạng:** gõ tay · **Chấp nhận:** 0.0.0.15 | 0 0 0 15 | 0.0.0.15.
  - **Chủ đề gợi ý (tầng 1):** mặt nạ đảo của /28
  - **Gợi ý (tầng 2):** /28 chừa 4 bit cho máy — 4 bit mặc kệ là số 15 ở octet cuối.
  - **Lời giải (tầng 3):** 0.0.0.15 — mặt nạ đảo của /28: bốn bit cuối mặc kệ, phần còn lại phải khớp. Con số này chép thẳng từ bản cắt chặng 1 — tờ giấy ấy phục vụ tới tận dòng luật cuối cùng.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao nghiệm thu một luật chặn phải đo CẢ chiều thông lẫn chiều chặn?
  - **Nhóm ý cần chạm:** [rút dây, rut day, chặn hết, chan het, cấm sạch, cam sach, vạ lây, va lay] · [permit any, mở toang, mo toang, cho hết qua, cho het qua] · [hai chiều, hai chieu, cả hai, ca hai, cặp, cap , thông và chặn, thong va chan] · [vẫn thông, van thong, không ảnh hưởng, khong anh huong, đường cũ, duong cu]
  - **Trả lời mẫu:** Vì mỗi chiều chặn được một kiểu giải sai: chỉ đo phải-chặn thì cấm sạch mọi thứ (hoặc rút dây) cũng đạt; chỉ đo phải-thông thì mở toang permit any any cũng đạt. Đo cả cặp mới ép được luật đúng nghĩa: thứ cần chặn đã chặn, mọi thứ từng thông vẫn thông, không ai bị vạ lây.

**6 · Tổng kết:**
- Luật đi sau cùng: dựng cho thông, kiểm chứng xong, rồi mới thắt — chặn trên mạng chưa thông là tự bịt mắt.
- Chặng 3 nộp xong: khách bị chặn tới kế toán, vẫn ra Internet, kinh doanh vô sự — cặp thông-chặn đủ bốn bằng chứng.
- Bản cắt chặng 1 phục vụ tới dòng luật cuối: wildcard 0.0.0.15 chép thẳng từ cỡ /28 trên giấy.
- *Úp mở bài sau:* Chi nhánh đã dựng xong bằng chính tay bạn. Còn đúng một cửa: tổng duyệt — nơi một ca bệnh kiểu mới đợi sẵn: HAI bệnh chồng lên nhau trên cùng một mạng, và khám ra một bệnh mới chỉ là đi được nửa đường.

### Bài: Tổng duyệt: ca bệnh hai tầng chồng nhau `m21-bai-4`

**1 · Khởi động (hook):** Tuần đầu chi nhánh vận hành, người dùng phòng kinh doanh báo: "mở kho tài liệu bằng tên thì báo không tồn tại, mà đồng nghiệp chỉ cho gõ thẳng địa chỉ số cũng không ăn thua." Hai triệu chứng nghe na ná — nhưng người khám giỏi ngửi thấy mùi lạ: nếu chỉ là MỘT bệnh, tại sao cả đường tên lẫn đường số cùng chết theo hai kiểu khác nhau? Có khi nào... đang có HAI bệnh chồng lên nhau?

**2 · Đoán thử (pretest):**
- **Đề:** Đoán thử: ping theo TÊN báo không phân giải được, ping theo SỐ cũng rớt. Suy luận nào chắc tay nhất?
  - **Dạng:** trắc nghiệm · **Có thể là hai bệnh ở hai tầng — kiểm tra tầng tên và tầng đường đi riêng nhau** ✓ / Chắc chắn chỉ là bệnh DNS, vì triệu chứng đầu tiên nhắc tới cái tên / Chắc chắn chỉ là bệnh dây, vì đường số rớt nghĩa là phần cứng có vấn đề
  - **Chủ đề gợi ý (tầng 1):** tách tên khỏi số là bài khám nhập môn của M11
  - **Vì sao:** Tên chết vì tầng phân giải, số chết vì tầng đường đi — hai tầng ĐỘC LẬP, nên hai triệu chứng cùng lúc hoàn toàn có thể là hai bệnh chồng nhau. Vội gán tất cả cho một thủ phạm là sửa xong một bệnh rồi tưởng ca đã khỏi — cái bẫy của mọi ca liên tầng.

**3 · Khám phá (teach):**
- *[m21-kiem-chung]* Ca liên tầng là kỳ thi thật của thang khám từng tầng: mỗi tầng phải được khám ĐỘC LẬP và kết luận ĐỘC LẬP. Tầng tên: nslookup — bản ghi có không, trỏ về đâu. Tầng đường: ping bằng SỐ, để tầng tên không che mắt. Tầng 2: khung có qua nổi trunk không — nhật ký chặng và cấu hình hai đầu dây trả lời. Điều cấm kỵ duy nhất: DỪNG SỚM. Tìm ra một bệnh thật rồi vẫn phải khám nốt các tầng còn lại — vì "đã tìm thấy MỘT thủ phạm" và "đã tìm thấy MỌI thủ phạm" là hai mệnh đề khác nhau, và ca tổng duyệt này cố tình chứa nhiều hơn một.
  - **Đào sâu hơn:** Vì sao bệnh chồng bệnh hay gặp ở mạng mới dựng? Vì các lỗi cấu hình sinh ra CÙNG một đợt thi công — người quên native VLAN cũng dễ là người gõ nhầm bản ghi DNS trong cùng buổi chiều. Mạng chạy lâu năm thì lỗi rơi rớt từng cái một; mạng mới bàn giao thì lỗi đến theo lô. Người nghiệm thu chi nhánh mới vì thế khám như thợ săn đếm đủ dấu chân: một dấu chưa chắc là một con.

**4 · Thử tay (practice, fading 2):**
- **Đề:** "Phòng kinh doanh không mở được kho tài liệu kho.chi-nhanh.vn — gõ tên báo không tồn tại, gõ thẳng số 10.20.0.40 cũng không thông!" Bạn ngồi ở PC-KinhDoanh. Khám cho ra TẤT CẢ các bệnh — ca này không hứa chỉ có một.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** PC-KinhDoanh [10.40.0.2/26, gw 10.40.0.1] · SRV-KhoTaiLieu [10.20.0.40/24, gw 10.20.0.1] · SRV-DNS [10.40.0.4/26, gw 10.40.0.1] · SW-1 [p1:VLAN 10, p2:VLAN 10, p3:VLAN 1] · SW-2 [p1:VLAN 10, p3:VLAN 1] · R-ChiNhanh [g0:10.40.0.1/26, g2:10.40.0.113/30] · R-TruSo [g0:10.40.0.114/30, g1:10.20.0.1/24] · SW-TruSo [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-KinhDoanh·eth0 — SW-1·p1 | SW-1·p3 — SW-2·p3 | SW-2·p1 — R-ChiNhanh·g0 | R-ChiNhanh·g2 — R-TruSo·g0 | R-TruSo·g1 — SW-TruSo·p1 | SW-TruSo·p2 — SRV-KhoTaiLieu·eth0 | SW-1·p2 — SRV-DNS·eth0
    - **Ngồi ở máy:** PC-KinhDoanh
    - **Hồ sơ bệnh:** DNS 10.40.0.4 [portal.chi-nhanh.vn → 10.20.0.41]
    - **Triệu chứng:** PC-KinhDoanh ping 10.20.0.40 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **HAI bệnh chồng nhau: allowed list của trunk không cho VLAN kinh doanh đi qua, và DNS thiếu bản ghi kho tài liệu** ✓ · HAI bệnh chồng nhau: trunk hai đầu khai lệch native VLAN, và bản ghi kho tài liệu trỏ về một địa chỉ sai · HAI bệnh chồng nhau: cổng nối PC kinh doanh bị gán sai VLAN, và máy chủ DNS không trả lời truy vấn
    - **Sửa:** chọn hành động — **Sửa CẢ HAI: thêm VLAN kinh doanh vào allowed list hai đầu trunk, và thêm bản ghi kho.chi-nhanh.vn trỏ về 10.20.0.40** ✓ · Sửa CẢ HAI: khai lại native VLAN cho khớp hai đầu trunk, và sửa bản ghi kho tài liệu về đúng địa chỉ máy chủ · Sửa CẢ HAI: đưa cổng của PC kinh doanh về đúng VLAN, và khởi động lại dịch vụ DNS trên máy chủ tên
  - **Chủ đề gợi ý (tầng 1):** khám tầng tên và tầng đường ĐỘC LẬP — đủ dấu chân mới đếm đủ con
  - **Vì sao:** Hai tầng, hai bằng chứng độc lập. Tầng tên: nslookup kho.chi-nhanh.vn → Non-existent domain, trong khi ping 10.40.0.4 (máy chủ DNS ngồi ngay cùng xóm) vẫn thông — DNS SỐNG và trả lời đàng hoàng, nó chỉ THIẾU bản ghi: portal có, kho thì không. Tầng đường: ping 10.20.0.40 bằng số vẫn rớt — mở console SW-1 gõ show interfaces trunk: allowed list hai đầu chỉ còn VLAN 20, khung VLAN 10 của kinh doanh bị chặn ngay cửa trunk. Ba lựa chọn đều kể HAI bệnh — chỉ cặp bằng chứng thật mới chọn nổi. Sửa một trong hai chỉ khỏi nửa bệnh: phải mở allowed list VÀ thêm bản ghi.
  - **Gợi ý (tầng 2):** Tách tên khỏi số như M11: nslookup nói gì về cái tên? ping thẳng máy chủ DNS cùng xóm nói gì về con đường tới nó? ping bằng số nói gì về con đường xa? Console thiết bị có show interfaces trunk — soi allowed list và native hai đầu rồi hãy chốt cặp bệnh.
  - **Lời giải (tầng 3):** nslookup ra Non-existent domain trong khi ping 10.40.0.4 vẫn thông → DNS sống nhưng thiếu bản ghi (bệnh tầng tên). ping số vẫn rớt → bệnh tầng đường: show interfaces trunk trên SW-1 và SW-2 — allowed list hai đầu chỉ cho VLAN 20, thiếu VLAN 10. Chọn đúng CẶP bệnh và hành động sửa cả hai. Ca không còn cho đoán bằng mẹo phương-án-bao-trùm: cả ba lựa chọn đều là hai bệnh.

**5 · Nhớ lại (retrieval):**
- **Đề:** Không nhìn lại bài: xếp lại quy trình bốn bước đã theo bạn suốt module.
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Đặt địa chỉ — cắt dải trên giấy
    2. Nối dây — dựng sơ đồ vật lý
    3. Cấu hình — trunk, định tuyến, luật
    4. Kiểm chứng — mỗi bước một bằng chứng
  - **Chủ đề gợi ý (tầng 1):** giấy → dây → lệnh → bằng chứng
  - **Gợi ý (tầng 2):** Bắt đầu từ thứ sửa được bằng cục tẩy, kết thúc bằng thứ ký được biên bản.
  - **Lời giải (tầng 3):** Đặt địa chỉ → nối dây → cấu hình → kiểm chứng. Bạn vừa sống trọn quy trình này qua ba chặng nộp riêng — nó là thứ mang được sang mọi mạng thật.
- **Tự giải thích:** Giải thích bằng lời của bạn: vì sao tìm ra MỘT bệnh thật rồi vẫn chưa được phép dừng khám?
  - **Nhóm ý cần chạm:** [hai bệnh, hai benh, nhiều bệnh, nhieu benh, chồng nhau, chong nhau, theo lô, theo lo] · [một thủ phạm, mot thu pham, mọi thủ phạm, moi thu pham, chưa chắc hết, chua chac het] · [từng tầng, tung tang, độc lập, doc lap, khám nốt, kham not, các tầng còn lại, cac tang con lai] · [sửa xong vẫn, sua xong van, nửa bệnh, nua benh, vẫn không thông, van khong thong, tưởng khỏi, tuong khoi]
  - **Trả lời mẫu:** Vì tìm thấy một thủ phạm không chứng minh là đã thấy mọi thủ phạm — mạng mới thi công hay hỏng theo lô, hai lỗi sinh cùng một buổi chiều. Mỗi tầng phải được khám và kết luận độc lập; dừng ở bệnh đầu tiên thì sửa xong triệu chứng vẫn còn, người khám lại tưởng mình sửa sai trong khi thật ra chỉ sửa THIẾU.

**6 · Tổng kết:**
- Ca liên tầng: khám từng tầng độc lập, kết luận độc lập — tên bằng nslookup, đường bằng ping số, tầng 2 bằng cấu hình trunk.
- Một dấu chân chưa chắc một con: tìm ra một bệnh vẫn phải khám nốt các tầng còn lại.
- Mạng mới bàn giao hỏng theo lô — người nghiệm thu giỏi đếm đủ trước khi ký.
- *Úp mở bài sau:* Bài thi cuối cùng của cả khóa đang đợi — tám câu rút từ mọi ngóc ngách trung cấp, kết bằng một ca liên tầng bạn chưa từng gặp. Đậu nó là chi nhánh chính thức bàn giao, và hành trình 21 module khép lại tròn một vòng.

### Khái niệm & flashcard (2)

- **Quy trình bốn bước triển khai** `m21-quy-trinh` — Đặt địa chỉ (trên giấy) → nối dây → cấu hình → kiểm chứng; luật chặn đi sau cùng, khi mạng đã thông và đã có bằng chứng
  - Ẩn dụ: Như xây nhà: bản vẽ trước, móng và khung sau, điện nước tiếp, nghiệm thu cuối — không ai đi dây điện trước khi có bản vẽ, và không ai khóa cửa một căn nhà chưa xây xong.
  - Thẻ ôn: *Bốn bước của quy trình dựng mạng, và vì sao thứ tự đó?* → Đặt địa chỉ → nối dây → cấu hình → kiểm chứng. Mỗi bước đứng trên kết quả bước trước, và lỗi bắt sớm ở đâu thì rẻ ở đó: bản cắt sai trên giấy sửa bằng tẩy, sai sau khi cấu hình ba chục thiết bị sửa bằng cả buổi. Luật chặn luôn đi sau cùng — thắt một mạng chưa thông là tự bịt mắt.
- **Kiểm chứng từng tầng** `m21-kiem-chung` — Mỗi tầng xong phải có bằng chứng bằng lệnh trước khi leo tiếp: trunk sống → láng giềng Full → ping trọn đường; khám bệnh cũng từng tầng độc lập, không dừng ở thủ phạm đầu tiên
  - Ẩn dụ: Như thợ leo giàn giáo thử từng tầng trước khi bước lên: sập ở đâu biết ngay ở đó — còn kẻ leo một mạch tới nóc, lúc rơi chẳng biết mình rơi từ tầng nào.
  - Thẻ ôn: *Chuỗi kiểm chứng ba bậc của một mạng hai site, và luật cấm của ca bệnh liên tầng?* → show interfaces trunk (tầng 2 sống) → show ip ospf neighbor ra Full (tầng 3 quen nhau) → ping xuyên site (đường trọn vẹn). Luật cấm khi khám ca liên tầng: KHÔNG dừng ở thủ phạm đầu tiên — mỗi tầng khám độc lập, kết luận độc lập, vì mạng mới thi công hỏng theo lô.

### Bài kiểm tra module (pool 16 câu, mỗi lượt rút 8, cần ≥ 85%)

- **Đề:** Xếp bốn bước của quy trình dựng mạng theo đúng thứ tự:
  - **Dạng:** xếp thứ tự (thứ tự đúng):
    1. Đặt địa chỉ — cắt dải trên giấy
    2. Nối dây — dựng sơ đồ vật lý
    3. Cấu hình — trunk, định tuyến, luật
    4. Kiểm chứng — bằng chứng bằng lệnh
  - **Chủ đề gợi ý (tầng 1):** thứ sửa bằng tẩy đứng đầu
  - **Vì sao:** Đặt địa chỉ → nối dây → cấu hình → kiểm chứng. Mỗi bước đứng trên bước trước; bản cắt trên giấy là thứ mọi bước sau tra cứu nên nó đi đầu, còn bằng chứng nghiệm thu luôn chốt sổ.
- **Đề:** Phòng 60 máy nhận dải cắt từ 10.50.0.0/24, cắt từ đầu dải. Dải của phòng đó là gì? (địa-chỉ/prefix)
  - **Dạng:** gõ tay · **Chấp nhận:** 10.50.0.0/26 | 10.50.0.0 /26 | 10.50.0.0/ 26
  - **Chủ đề gợi ý (tầng 1):** cỡ khối nhỏ nhất đủ 60 máy
  - **Vì sao:** 10.50.0.0/26 — khối /26 có 62 chỗ, là cỡ nhỏ nhất đủ 60 máy; /25 là phí đất, /27 thì thiếu. Cắt từ đầu dải nên bắt đầu tại .0.
- **Đề:** Vì sao VLSM cắt khối LỚN trước khối nhỏ?
  - **Dạng:** trắc nghiệm · **Khối to chỉ đặt vừa ở ranh giới thưa — cắt nhỏ trước là lấp mất chỗ, sinh kẽ hở** ✓ / Vì phòng đông máy bao giờ cũng quan trọng hơn nên được ưu tiên cấp trước / Vì router chỉ chấp nhận các dải được khai theo thứ tự từ lớn tới nhỏ
  - **Chủ đề gợi ý (tầng 1):** chuyện căn khối, không phải chuyện ưu tiên
  - **Vì sao:** Là chuyện CĂN KHỐI: khối /26 chỉ đứng được ở ranh giới bội của 64 — cắt mấy khối nhỏ trước là các ranh giới đó bị lấp, khối to phải nhảy xa hơn và sinh kẽ hở phí đất. Router chẳng bắt thứ tự nào, và đây không phải chuyện phòng nào quan trọng.
- **Đề:** Hai switch nối nhau: một đầu đã khai trunk, đầu kia còn access. Hậu quả đúng như engine mô phỏng?
  - **Dạng:** trắc nghiệm · **Khung mang nhãn đâm vào cổng access thì bị bỏ — VLAN chết trên dây** ✓ / Hai đầu tự đàm phán để cùng thành trunk sau vài giây bắt tay / Chỉ VLAN số chẵn qua được còn VLAN số lẻ bị chặn lại ở giữa dây
  - **Chủ đề gợi ý (tầng 1):** cổng access không đọc nhãn
  - **Vì sao:** Đầu trunk dán nhãn khung rồi gửi đi; đầu access không đọc nhãn nên bỏ khung — bệnh trunk-một-đầu. Mô hình này không có đàm phán DTP (đơn giản hóa đã khai), và chẵn lẻ thì không liên quan gì.
- **Đề:** Ba switch nối tam giác, STP bật, priority để mặc định cả ba. Cây hình thành thế nào?
  - **Dạng:** trắc nghiệm · **Địa chỉ nhỏ nhất thắng cử làm root, một cổng trong vòng nằm im** ✓ / Ba switch thay nhau làm root theo giờ để chia đều tải các dây / Không có root — STP chặn ngẫu nhiên một cổng là vòng hết bão
  - **Chủ đề gợi ý (tầng 1):** luật bầu root: priority trước, hòa thì địa chỉ nhỏ hơn thắng
  - **Vì sao:** Priority hòa thì so địa chỉ — nhỏ nhất làm root, và kết quả là TẤT ĐỊNH chứ không ngẫu nhiên hay luân phiên: cùng sơ đồ luôn ra cùng cây. Vòng ba dây thì đúng một cổng phải nằm im để bão không thành.
- **Đề:** STP đang canh một mạng có vòng. Sợi dây chính vừa đứt mà mạng vẫn thông — nhờ loại cổng nào tỉnh dậy?
  - **Dạng:** gõ tay · **Chấp nhận:** cổng dự phòng | cong du phong | cổng bị chặn | cong bi chan | cổng block | cong block | blocked port | cổng đang nằm im | cong dang nam im
  - **Chủ đề gợi ý (tầng 1):** cổng đang nằm im của STP không phải cổng hỏng
  - **Vì sao:** Cổng dự phòng — cái cổng STP vẫn bắt nằm im (BLK). Mất dây là cây tính lại tức thì và cổng block mở ra thành đường thay thế. Bài 15 dặn đúng câu này: cổng im lìm không phải cổng hỏng, nó là đường sống để dành.
- **Đề:** Lệnh kiểm chứng hai router OSPF đã đồng bộ trọn bản đồ với nhau?
  - **Dạng:** gõ tay · **Chấp nhận:** show ip ospf neighbor | sh ip ospf neighbor | show ip ospf neighbour
  - **Chủ đề gợi ý (tầng 1):** bảng phải ra chữ Full
  - **Vì sao:** show ip ospf neighbor — trạng thái Full nghĩa là hai bản đồ chồng khít (phòng cuối của tòa nhà làm quen M16). Chưa Full thì bảng còn nói lý-do-chưa-lên để lần tiếp.
- **Đề:** Hai router nối thẳng nhau, cùng bật OSPF mà láng giềng không lên. Cặp điều kiện nào PHẢI soi đầu tiên?
  - **Dạng:** trắc nghiệm · **Hai cổng đối diện cùng subnet chưa, và hai bên đã khai network phủ cổng đó chưa** ✓ / Hai router cùng hãng sản xuất chưa, và số hiệu tiến trình OSPF có bằng nhau không / Dây nối có phải loại chéo không, và hai cổng có cùng tốc độ vật lý hay không
  - **Chủ đề gợi ý (tầng 1):** hai điều kiện lên láng giềng của OSPF-lite
  - **Vì sao:** Neighbor lên khi hai cổng CÙNG SUBNET và cả hai bên đã KHAI network phủ cổng — đúng hai điều kiện engine mô phỏng. Số hiệu tiến trình không cần khớp, hãng và loại dây là chuyện tầng khác.
- **Đề:** Luật "chặn phòng khách tới máy chủ kế toán, vẫn cho ra Internet" nên viết bằng gì và đặt ở đâu?
  - **Dạng:** trắc nghiệm · **ACL mở rộng, đặt gần nguồn — cổng router phía phòng khách, chiều vào** ✓ / ACL chuẩn, đặt gần nguồn — vì luật đơn giản thì nên chặn từ sớm nhất / ACL mở rộng, đặt tại cổng ra Internet của trụ sở cho tiện quản lý chung
  - **Chủ đề gợi ý (tầng 1):** biết đích thì được chặn sớm
  - **Vì sao:** Phân biệt nguồn VÀ đích → mở rộng; mở rộng biết đủ để chặn đúng nên đặt gần nguồn (cổng phía khách, chiều in) — gói xấu chết tại cửa. Chuẩn mù đích sẽ chặn khách đi MỌI nơi, mất luôn Internet; còn đặt ở cổng Internet thì gói tới kế toán chẳng bao giờ đi qua đó.
- **Đề:** Danh sách ACL chỉ có các dòng deny mà thiếu dòng permit cuối — mọi gói còn lại chết vì cái gì?
  - **Dạng:** gõ tay · **Chấp nhận:** dòng cấm vô hình | dong cam vo hinh | implicit deny | cấm vô hình | cam vo hinh | deny ngầm | deny ngam | dòng deny vô hình | dong deny vo hinh
  - **Chủ đề gợi ý (tầng 1):** dòng không in ra ở cuối mọi danh sách
  - **Vì sao:** Dòng cấm vô hình (implicit deny) — cuối mọi danh sách, không in ra trong show access-lists. Áp danh sách lên cổng là đổi mặc định của cổng thành cấm-tất-cả; muốn giữ phần còn lại phải có permit ip any any.
- **Đề:** Vì sao đề nghiệm thu luật chặn luôn chấm CẶP mục tiêu thông-và-chặn?
  - **Dạng:** trắc nghiệm · **Vì thiếu vế nào cũng có cách giải sai: rút dây đạt vế chặn, mở toang đạt thông** ✓ / Vì hai mục tiêu giúp bài thi trông dài hơn và có vẻ khó hơn với người học / Vì router yêu cầu số mục tiêu chẵn thì phần cứng mới xử lý được luật
  - **Chủ đề gợi ý (tầng 1):** mỗi vế chặn một kiểu giải tủ
  - **Vì sao:** Chỉ đo phải-chặn thì cấm sạch (hay rút dây) cũng đạt; chỉ đo phải-thông thì permit any any cũng đạt. Cặp mục tiêu ép luật đúng nghĩa: chặn đúng kẻ cần chặn, giữ nguyên đường của mọi người khác.
- **Đề:** Ôn nhanh Phần E: relay ghi địa chỉ xóm đang xin DHCP vào ô nào của gói tin?
  - **Dạng:** gõ tay · **Chấp nhận:** giaddr | ô giaddr | o giaddr | trường giaddr | truong giaddr | gateway address
  - **Chủ đề gợi ý (tầng 1):** sáu chữ cái, ghép gateway và address
  - **Vì sao:** Ô giaddr — nhờ nó máy DHCP một mình phục vụ được hàng chục xóm: nhìn giaddr là biết lời xin phát từ dải nào mà chọn đúng scope.
- **Đề:** Nhân viên mới về chi nhánh cần đủ quyền làm việc. Trong hệ AGDLP tử tế, người trực làm gì?
  - **Dạng:** trắc nghiệm · **Thêm vào nhóm vai Global của phòng — quyền tự chảy qua đường ống có sẵn** ✓ / Nhét thẳng vào từng nhóm quyền Domain Local liên quan cho nhanh gọn / Cấp quyền đọc ghi trực tiếp lên từng thư mục mà người đó cần dùng
  - **Chủ đề gợi ý (tầng 1):** một mắt xích ở khúc người-vai
  - **Vì sao:** Một dòng Add vào nhóm vai Global — đường ống vai-cắm-vào-quyền đã nối sẵn từ trước. Hai cách còn lại đều là lối tắt chạy-được-ngay nhưng đắt ở ngày mai: không truy vết nổi, chuyển phòng không tự rút.
- **Đề:** Tuần đầu vận hành, đồ thị CPU của R-ChiNhanh chạy 55%. Người trực nên làm gì với con số đó?
  - **Dạng:** trắc nghiệm · **Ghi nhận nó vào baseline tuần đầu — có nếp rồi mới phán được cao hay thấp** ✓ / Báo động ngay vì router mới dựng thì CPU phải luôn nằm dưới mức 10% / Bỏ qua vĩnh viễn vì chỉ số CPU không liên quan gì tới thiết bị mạng
  - **Chủ đề gợi ý (tầng 1):** mạng mới chưa có nếp cũ để so
  - **Vì sao:** Mạng mới dựng CHƯA có baseline — việc của tuần đầu là ghi nếp: 55% này chính là dữ liệu nền để mai kia phán 70% là bất thường hay chuyện thường. Không có chuẩn dưới-10% nào của ngành, và CPU router dĩ nhiên đáng theo dõi.
- **Đề:** Trụ sở vừa dựng thêm router R-Moi cho một mạng lab mới, nối thẳng vào R-TruSo. R-TruSo đã bật OSPF sẵn; R-Moi thì chưa biết gì. Bật OSPF trên R-Moi, khai đủ hai mạng của nó, kiểm chứng láng giềng ra Full — và mạng lab phải gọi được máy chủ kế toán.
  - **Dạng:** console thiết bị (gõ lệnh IOS đạt mục tiêu)
    - **Sơ đồ đề bài:** PC-Lab [10.60.0.10/24, gw 10.60.0.1] · SRV-KeToan [10.20.0.9/24, gw 10.20.0.1] · SW-Lab [p1:VLAN 1, p2:VLAN 1] · SW-KeToan [p1:VLAN 1, p2:VLAN 1] · R-Moi [g0:10.60.0.1/24, g1:10.99.1.1/30] · R-TruSo [g0:10.99.1.2/30, g1:10.20.0.1/24] — dây: PC-Lab·eth0 — SW-Lab·p1 | SW-Lab·p2 — R-Moi·g0 | R-Moi·g1 — R-TruSo·g0 | R-TruSo·g1 — SW-KeToan·p1 | SW-KeToan·p2 — SRV-KeToan·eth0
    - **Console cắm ở:** R-Moi
    - **Mục tiêu:**
      - phải xem "show ip ospf neighbor" trên R-Moi
      - pc-lab PHẢI gọi được srv-kt2
    - **Lệnh mẫu trên R-Moi:** `enable` rồi `configure terminal` rồi `router ospf 1` rồi `network 10.60.0.0 0.0.0.255 area 0` rồi `network 10.99.1.0 0.0.0.3 area 0` rồi `end` rồi `show ip ospf neighbor`
  - **Chủ đề gợi ý (tầng 1):** router ospf 1 rồi hai câu network với wildcard đảo
  - **Vì sao:** Trên R-Moi: router ospf 1 → network 10.60.0.0 0.0.0.255 area 0 → network 10.99.1.0 0.0.0.3 area 0 → end → show ip ospf neighbor ra Full. Hai bên cùng subnet WAN và cùng khai network là láng giềng lên; bảng định tuyến tự học và ping xuyên site tự thông.
- **Đề:** "Chi nhánh mới bàn giao được ba hôm: phòng kinh doanh không vào được máy chủ kế toán bằng tên ketoan.congty.vn — mà anh kỹ thuật thử gõ thẳng số cũng chịu chết!" Bạn ngồi ở PC-KinhDoanh. Ca nghiệm thu cuối cùng của khóa: khám cho ĐỦ, đừng dừng ở dấu chân đầu tiên.
  - **Dạng:** ca bệnh phòng khám (khám qua terminal → chẩn đoán → sửa)
    - **Mạng bệnh nhân:** PC-KinhDoanh [10.40.0.2/26, gw 10.40.0.1] · SRV-KeToan [10.20.0.9/24, gw 10.20.0.1] · SRV-DNS [10.40.0.4/26, gw 10.40.0.1] · SW-1 [p1:VLAN 10, p2:VLAN 10, p3:VLAN 1] · SW-2 [p1:VLAN 10, p3:VLAN 1] · R-ChiNhanh [g0:10.40.0.1/26, g2:10.40.0.113/30] · R-TruSo [g0:10.40.0.114/30, g1:10.20.0.1/24] · SW-TruSo [p1:VLAN 1, p2:VLAN 1, p3:VLAN 1] — dây: PC-KinhDoanh·eth0 — SW-1·p1 | SW-1·p3 — SW-2·p3 | SW-2·p1 — R-ChiNhanh·g0 | R-ChiNhanh·g2 — R-TruSo·g0 | R-TruSo·g1 — SW-TruSo·p1 | SW-TruSo·p2 — SRV-KeToan·eth0 | SW-1·p2 — SRV-DNS·eth0
    - **Ngồi ở máy:** PC-KinhDoanh
    - **Hồ sơ bệnh:** DNS 10.40.0.4 [ketoan.congty.vn → 10.20.0.99, portal.congty.vn → 10.20.0.41]
    - **Triệu chứng:** PC-KinhDoanh ping 10.20.0.9 PHẢI hỏng
    - **Chẩn đoán (chọn 1):** **HAI bệnh chồng nhau: trunk hai đầu khai lệch native VLAN, và bản ghi DNS trỏ máy kế toán về địa chỉ sai** ✓ · HAI bệnh chồng nhau: allowed list của trunk chặn mất VLAN kinh doanh, và DNS thiếu hẳn bản ghi máy kế toán · HAI bệnh chồng nhau: cổng của router chi nhánh đang bị shutdown, và máy chủ DNS không trả lời truy vấn
    - **Sửa:** chọn hành động — **Sửa CẢ HAI: khai native VLAN khớp hai đầu trunk, và sửa bản ghi ketoan.congty.vn về 10.20.0.9** ✓ · Sửa CẢ HAI: thêm VLAN kinh doanh vào allowed list trunk, và thêm mới một bản ghi cho máy kế toán · Sửa CẢ HAI: gõ no shutdown trên cổng router chi nhánh, và khởi động lại dịch vụ DNS trên máy chủ
  - **Chủ đề gợi ý (tầng 1):** tách tên khỏi số, rồi soi cấu hình trunk hai đầu
  - **Vì sao:** Tầng tên: nslookup ketoan.congty.vn trả về 10.20.0.99 — máy chủ DNS (10.40.0.4, ngồi cùng xóm nên tra được) đang giữ bản ghi TRỎ SAI: máy thật là 10.20.0.9. Tầng đường: ping thẳng 10.20.0.9 vẫn rớt — show interfaces trunk hai đầu: SW-1 khai native 10, SW-2 để native 1, khung đi trần lạc xóm ở đầu kia. Ba lựa chọn đều kể hai bệnh — allowed list thì show đã cho thấy vẫn đủ 10 với 20, router không cổng nào administratively down, nên chỉ cặp native-lệch + bản-ghi-sai đứng vững. Sửa một chỉ khỏi nửa: khai native khớp VÀ sửa bản ghi.
