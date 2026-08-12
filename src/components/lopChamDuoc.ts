// Bề mặt CHẠM ĐƯỢC cho những nút chỉ-là-chữ (phát hiện O1, lượt rà soát
// màn hẹp 08-12).
//
// Chữ `text-xs` cao đúng 16px, nên một link kiểu "Mở lại bài" chỉ cho
// ngón tay 16px chiều dọc để nhắm — dưới mức tối thiểu 24px của WCAG
// 2.5.8. Đo thật trên màn 375px: "Mở lại bài" 56×16, "Bỏ dòng này" 73×16,
// "Xem lại" 56×16.
//
// Vì sao nó KHÔNG chỉ là chuyện khó bấm: ở trang Hồ sơ hai nút ấy nằm
// CẠNH NHAU trong cùng một dòng, mà một cái mở bài còn cái kia XOÁ DÒNG.
// Bấm trượt trên điện thoại là mất dữ liệu, không phải mất một cú bấm.
//
// Cách làm: nới vùng chạm bằng padding rồi kéo lại bằng margin âm — chữ
// đứng nguyên chỗ cũ trong mắt người đọc, chỉ vùng nhắm của ngón tay to
// ra. Không đổi một pixel bố cục nào, nên áp được cho mọi chỗ đang có.
export const LOP_CHAM_DUOC = 'inline-flex min-h-6 items-center py-1.5 -my-1.5'
