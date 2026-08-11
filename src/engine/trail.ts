// Vệt đường đi trên bản đồ khóa học (kho ý tưởng B1) — phần THUẦN.
//
// Ý: liếc một cái biết mình đi được bao xa, không phải đọc số. Cách làm:
// ô của chủ đề ĐÃ ĐẬU tô theo một dải 5 nấc ấm dần, nấc lấy theo VỊ TRÍ
// của chủ đề trong khóa chứ không theo số chủ đề đã đậu. Khác biệt này
// là cốt lõi: người đậu 5 chủ đề đầu thấy một vệt than nguội ngắn, người
// đang ở chủ đề 18 thấy vệt chạy từ than tới lửa — hai bức tranh khác
// nhau, đúng như hai quãng đường khác nhau.
//
// (Nếu lấy nấc theo SỐ ĐÃ ĐẬU thì ai cũng thấy vệt kết thúc bằng màu
// nóng nhất, kể cả người mới đậu chủ đề 2 — vệt hết nói thật.)

/** Số nấc của dải ấm; khớp --trail-1..--trail-5 trong tokens.css. */
export const TRAIL_STEPS = 5

/**
 * Chủ đề thứ `index` (đếm từ 0) trong khóa `total` chủ đề nằm ở nấc mấy.
 * Trả 1..TRAIL_STEPS. Khóa rỗng hoặc chỉ 1 chủ đề thì mọi ô về nấc 1 —
 * một mình một ô thì không có "dần" nào để kể.
 */
export function trailHeat(index: number, total: number): number {
  if (total <= 1 || index <= 0) return 1
  // Chia theo TỔNG chứ không theo khoảng-giữa-hai-đầu: chia kiểu kia thì
  // nấc nóng nhất rơi trúng ĐÚNG MỘT ô cuối cùng (đo trên browser thật
  // với khóa 21 chủ đề), tức là bốn ô cuối trông y hệt nhau đúng lúc
  // người học cần thấy mình sắp tới nơi. Chia thế này mỗi nấc ôm ~4 ô.
  const step = Math.floor((Math.min(index, total - 1) / total) * TRAIL_STEPS) + 1
  return Math.min(step, TRAIL_STEPS)
}

/** Biến `trailHeat` thành tên biến CSS để component gán thẳng vào fill. */
export function trailVar(index: number, total: number): string {
  return `var(--trail-${trailHeat(index, total)})`
}
