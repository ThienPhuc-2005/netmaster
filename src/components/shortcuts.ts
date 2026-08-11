// Phím tắt một tay cho máy bàn (kho ý tưởng E3).
//
// Vì sao đáng làm: một bài học là vài chục lượt trả lời, mỗi lượt là một
// quãng rời bàn phím đi tìm chuột rồi quay lại. Quãng đó ngắn nhưng nó
// cắt đúng lúc người học đang giữ một ý trong đầu — bỏ được thì nhịp học
// liền mạch hẳn.
//
// Hai luật an toàn nằm ở đây chứ không rải ra từng màn, vì quên MỘT chỗ
// là hỏng cả tính năng:
//   1. Đang gõ chữ thì mọi phím tắt tắt hết. Bấm "1" trong ô trả lời phải
//      ra chữ "1", không phải chọn đáp án A.
//   2. Enter/Space khi đang đứng trên nút hay link thì để trình duyệt tự
//      bấm nút đó — chặn đường mã gốc là cướp việc của bàn phím, và là
//      cách nhanh nhất tạo ra "một lần bấm chạy hai hành động".

import { useEffect } from 'react'

/** Đang đứng trong ô nhập chữ? */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (target === null || !(target instanceof HTMLElement)) return false
  const tag = target.tagName
  // `isContentEditable` không phải lúc nào cũng là boolean (phần tử chưa
  // gắn vào trang trả về undefined) — ép kiểu để hàm này luôn trả true/false.
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable === true
}

/** Phần tử mà bản thân bàn phím đã bấm được bằng Enter/Space. */
function selfActivates(target: EventTarget | null): boolean {
  if (target === null || !(target instanceof HTMLElement)) return false
  return ['BUTTON', 'A', 'SUMMARY'].includes(target.tagName)
}

/**
 * Nghe một bộ phím trên cả cửa sổ. `handlers` khai theo `event.key`, ví dụ
 * `{ '1': …, Enter: …, ArrowRight: … }`; phím không khai thì không đụng tới.
 *
 * Cố ý KHÔNG có mảng phụ thuộc: `handlers` dựng lại mỗi lượt render (nó
 * đóng gói trạng thái đang thay đổi của màn), nên khóa theo phụ thuộc là
 * chuốc lấy closure ôi. Gỡ-gắn lại một listener mỗi lượt render là rẻ.
 */
export function useShortcuts(handlers: Record<string, () => void>, enabled = true): void {
  useEffect(() => {
    if (!enabled) return
    const onKeyDown = (e: KeyboardEvent) => {
      // Tổ hợp có phím điều khiển là phím tắt của trình duyệt/hệ điều hành.
      if (e.altKey || e.ctrlKey || e.metaKey) return
      if (isTypingTarget(e.target)) return
      if ((e.key === 'Enter' || e.key === ' ') && selfActivates(e.target)) return
      const run = handlers[e.key]
      if (run === undefined) return
      e.preventDefault()
      run()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })
}

/**
 * Bảng phím SỐ cho một danh sách lựa chọn: phím "1" chọn mục đang hiện ở
 * vị trí thứ nhất trên màn hình, "2" mục thứ hai…
 *
 * Dừng ở 9 vì phím "0" đứng cuối hàng số trên bàn phím — gán nó cho mục
 * thứ mười là mời bấm nhầm. Danh sách của app dài nhất là 5 mục.
 */
export function numberKeyHandlers(count: number, onPick: (position: number) => void): Record<string, () => void> {
  const handlers: Record<string, () => void> = {}
  for (let i = 0; i < Math.min(count, 9); i++) {
    handlers[String(i + 1)] = () => onPick(i)
  }
  return handlers
}
