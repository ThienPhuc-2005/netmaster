// Khai báo kiểu cho script render bản duyệt nội dung. Script là JS thuần
// (chạy bằng node, không qua Vite), nhưng test viết bằng TS nên cần chỗ
// này để `tsc --noEmit` biết hình dạng hai hàm được export.

/** Render một câu hỏi ra dòng Markdown. Ném lỗi nếu gặp `kind` chưa biết render. */
export function renderQuestion(q: unknown, indent?: string): string[]

/** Render toàn bộ bản duyệt; `mods` là JSON module thô, `files` là tên file nguồn. */
export function renderReview(mods: readonly unknown[], files: readonly string[]): string
