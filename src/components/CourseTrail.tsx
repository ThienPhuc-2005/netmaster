// Bản đồ đường đi ở đầu danh sách chủ đề (kho ý tưởng B1).
//
// Một hàng 21 ô theo đúng thứ tự khóa học, cách quãng giữa các Phần để
// vẫn đọc ra hình dạng A|B|C|D|E. Ô đã đậu tô ruột theo dải ấm dần
// (engine/trail), ô đang mở viền tông của Phần nó, ô chưa mở viền nhạt.
//
// Ba quyết định cố ý:
//
// 1. KHÔNG bấm được. Cả dải là một tấm hình để LIẾC, không phải bộ điều
//    khiển — biến nó thành 21 cái link là chèn 21 chặng Tab vào ngay
//    trước nội dung chính, trả giá đắt hơn nhiều so với thứ nhận được
//    (card chủ đề nằm ngay bên dưới, cuộn là tới).
// 2. Vì thế nó mang role="img" + MỘT lời đọc gọn cho cả dải. 21 ô mỗi ô
//    một câu là tra tấn người dùng trình đọc màn hình.
// 3. Ô CHƯA CÓ NỘI DUNG thì không tồn tại ở đây (dải dựng từ chính danh
//    sách module nạp được), cùng luật thật thà với hình bản đồ khóa học
//    trong bài: bản đồ nói thật cả phần dang dở.

import { useT } from '../i18n'
import type { Module } from '../engine/contentSchema'
import { trailVar } from '../engine/trail'

const PART_TOKEN: Record<string, string> = {
  A: 'var(--part-a)',
  B: 'var(--part-b)',
  C: 'var(--part-c)',
  D: 'var(--part-d)',
  E: 'var(--part-e)',
}

export function CourseTrail({
  modules,
  passed,
  currentId,
}: {
  modules: readonly Module[]
  passed: ReadonlySet<string>
  currentId: string | null
}) {
  const t = useT()
  if (modules.length === 0) return null

  const total = modules.length
  const passedCount = modules.filter((m) => passed.has(m.id)).length

  return (
    <div
      role="img"
      aria-label={t('learn.trailAria', { passed: passedCount, total })}
      className="mb-6 flex flex-wrap items-center gap-1"
    >
      {modules.map((m, i) => {
        const partColor = PART_TOKEN[m.part] ?? 'var(--ink-muted)'
        const isPassed = passed.has(m.id)
        const isCurrent = m.id === currentId
        // Quãng nghỉ mở đầu mỗi Phần mới — nhịp thở của hình, không phải
        // trang trí: thiếu nó thì 21 ô đều tăm tắp, mất luôn cấu trúc.
        const newPart = i > 0 && modules[i - 1]!.part !== m.part
        return (
          <span
            key={m.id}
            aria-hidden
            title={`${m.order}. ${m.title.vi}`}
            className={`h-3 w-3 rounded-[3px] border transition-colors duration-(--dur) ${newPart ? 'ml-2' : ''}`}
            style={{
              background: isPassed ? trailVar(i, total) : 'transparent',
              borderColor: isPassed ? trailVar(i, total) : isCurrent ? partColor : 'var(--edge)',
              // Ô ĐANG HỌC dày viền lên để nổi khỏi hàng ô chưa mở —
              // không dùng hiệu ứng nhấp nháy, dải này nằm cạnh thẻ Hôm
              // nay và không được tranh việc với nó.
              borderWidth: isCurrent ? 2 : 1,
            }}
          />
        )
      })}
    </div>
  )
}
