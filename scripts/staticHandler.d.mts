// Khai báo kiểu cho bộ xử lý HTTP của launcher. Script là JS thuần (chạy
// bằng node, không qua Vite), nhưng test viết bằng TS nên cần chỗ này để
// `tsc --noEmit` biết hình dạng hàm được export.

/**
 * Dựng bộ xử lý phục vụ bản build tĩnh trong `distDir`.
 *
 * Bộ xử lý KHÔNG BAO GIỜ được ném: listener của `http` chạy đồng bộ nên
 * một cú ném là uncaught exception và Node thoát — máy chủ chết giữa
 * buổi học. Mọi đường hỏng đều phải kết thúc bằng một mã lỗi.
 */
export function createStaticHandler(options: { distDir: string; marker: string }): (
  req: { url?: string },
  res: unknown,
) => void
