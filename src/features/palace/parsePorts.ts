// Đọc số cổng người học gõ vào.
//
// Người thật gõ "67, 68", "67 và 68", "cổng 443" — engine thì chỉ nhận
// mảng số. Việc dịch giữa hai thứ đó là của tầng UI, không phải của bộ
// chấm: engine giữ nguyên hợp đồng "chấm tập hợp số", còn ở đây ta rộng
// tay với cách gõ y như bộ chấm câu gõ tay rộng tay với dấu tiếng Việt.

/**
 * Mọi cụm chữ số trong câu, theo thứ tự xuất hiện, bỏ trùng. Không có
 * số nào thì trả mảng rỗng — đó là "chưa trả lời", không phải lỗi.
 */
export function parsePorts(raw: string): number[] {
  const found = raw.match(/\d+/g)
  if (found === null) return []
  const out: number[] = []
  for (const chunk of found) {
    const value = Number(chunk)
    // Số quá lớn (gõ nhầm cả dãy) không phải cổng nào cả — bỏ qua để
    // câu trả lời vẫn chấm được phần còn lại thay vì hỏng cả câu.
    if (!Number.isSafeInteger(value) || value < 1 || value > 65535) continue
    if (!out.includes(value)) out.push(value)
  }
  return out
}

/** Viết lại danh sách cổng cho người đọc: "67, 68". */
export function formatPorts(ports: readonly number[]): string {
  return ports.join(', ')
}
