// Nút "mình nghĩ câu này đúng" (khối 21.11) — dùng chung giữa bài học và
// màn kết quả bài thi.
//
// Nó tồn tại vì một lớp lỗi có thật: danh sách đáp án soạn hẹp hơn cách
// nói tự nhiên thì người trả lời ĐÚNG bị chấm là sai, và người học thật
// sẽ im lặng tự nghĩ mình dốt thay vì đi báo (khối 21.10).

import { useState } from 'react'
import { useT } from '../i18n'

/**
 * Nút báo "mình nghĩ câu này đúng" + lời xác nhận sau khi bấm.
 *
 * Cố ý là một dòng chữ nhỏ, KHÔNG phải nút to: nó không được cạnh tranh
 * với việc đáng làm hơn (thử lại). Và lời xác nhận phải nói rõ hai điều
 * — đã ghi lại, và câu vẫn chưa được tính đúng — nếu không thì nó thành
 * một cái nút "bấm là qua".
 */
export function DisputeButton({ alreadyReported, onReport }: { alreadyReported: boolean; onReport: () => boolean }) {
  const t = useT()
  const [justReported, setJustReported] = useState(false)
  if (alreadyReported || justReported) {
    return <p className="text-xs leading-relaxed text-ink-muted">{t('dispute.thanks')}</p>
  }
  return (
    <button
      onClick={() => {
        onReport()
        setJustReported(true)
      }}
      className="self-start text-xs font-medium text-ink-muted underline decoration-dotted underline-offset-4 hover:text-ink"
    >
      {t('dispute.action')}
    </button>
  )
}
