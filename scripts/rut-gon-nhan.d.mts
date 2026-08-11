// Khai báo kiểu cho luật rút gọn nhãn bản vẽ. Script là JS thuần (chạy
// bằng node, không qua Vite), nhưng test viết bằng TS nên cần chỗ này để
// `tsc --noEmit` biết hình dạng hàm được export.

/** Nhãn dài quá bao nhiêu ký tự thì phải rút. */
export const NHAN_DAI: number

/**
 * Rút gọn nhãn của MỘT bản vẽ (truyền cả bộ vào cùng lúc: luật chống
 * trùng tên xét trên toàn bản vẽ, không xét từng nhãn rời).
 */
export function rutGonNhan(nhanGoc: readonly string[]): string[]
