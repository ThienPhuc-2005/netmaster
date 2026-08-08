# Trạng thái dự án — NetMaster (Phase 1 + 2 + 3 XONG — hết phạm vi spec)

Cập nhật: 2026-08-07. File này chỉ để nắm nhanh tình hình khi
mở lại dự án. Nguồn chân lý vẫn là `SPEC-APP-HOC-MANG.md`; luật làm việc
ở `CLAUDE.md`; nội dung bài đọc duyệt ở `REVIEW-NOI-DUNG.md`.

## MỞ PHIÊN MỚI THÌ ĐỌC ĐÂY TRƯỚC

**Đang đứng đâu:** **CẢ BA PHASE ĐÃ XONG — hết phạm vi spec.** Phase 3
hạng mục (8), (9), (10) đều khép; hạng mục (10) là hạng mục cuối cùng
của spec mục 6. App có đủ **12 module** + tab Phòng khám + tab Ôn tập +
drill subnetting.

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
