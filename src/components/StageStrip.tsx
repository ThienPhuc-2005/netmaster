// Dải chặng CÔNG TRƯỜNG — bản gọn của StageMap, đứng trong lòng bài học
// (kho ý tưởng H4). Chỉ bật cho module khai `stageProgress` trong data.
//
// Vì sao không dùng thẳng StageMap: bản kia là bản đồ ĐỂ CHỌN ở trang
// Học — tên chặng nằm dưới từng chấm, chiếm trọn chiều ngang. Trong bài
// học, ngay trên đầu đã có thanh 6 bước; đặt thêm một khối cao ngang thế
// nữa là hai thước đo tranh nhau. Ở đây: một hàng chấm bé + TÊN của mỗi
// chặng (đã có "Chặng 1:" ngay trong tên nên không tự đánh số lại).
//
// Chặng đang làm ăn var(--part-accent) như mọi chi tiết tông-theo-Phần;
// chặng đã xong dùng cặp accent/accent-contrast đã đo. Chặng chưa tới
// KHÔNG hạ opacity chữ (rớt AA) — nó nhạt đi bằng ink-muted + viền edge.

import { Check } from 'lucide-react'
import { useT } from '../i18n'
import type { StageProgressItem, StageProgressState } from '../engine/contentPure'
import { lt } from '../engine/ltext'

const PART_ACCENT = 'var(--part-accent, var(--accent))'

const STATE_LABEL: Record<StageProgressState, string> = {
  done: 'stage.done',
  current: 'stage.current',
  pending: 'stage.pending',
}

function Marker({ state }: { state: StageProgressState }) {
  if (state === 'done') {
    return (
      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast">
        <Check size={11} aria-hidden />
      </span>
    )
  }
  if (state === 'current') {
    return (
      <span
        className="flex size-4 shrink-0 items-center justify-center rounded-full border-2 bg-panel"
        style={{ borderColor: PART_ACCENT }}
      >
        <span className="size-1.5 rounded-full" style={{ background: PART_ACCENT }} />
      </span>
    )
  }
  return <span className="size-4 shrink-0 rounded-full border border-edge bg-panel" />
}

export function StageStrip({ stages, label }: { stages: StageProgressItem[]; label: string }) {
  const t = useT()
  return (
    <ol aria-label={label} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      {stages.map((stage) => (
        <li
          key={stage.id}
          aria-current={stage.state === 'current' ? 'step' : undefined}
          className="flex items-center gap-1.5"
        >
          <Marker state={stage.state} />
          {/* Màn hẹp chỉ để lại tên của chặng ĐANG LÀM: bốn tên đầy đủ
              xuống 3 hàng, ăn 84px ngay trên tên bài (đo ở 375px) — đẩy
              việc hôm nay ra khỏi tầm mắt để nói một thứ chỉ cần liếc.
              Tên các chặng kia KHÔNG bị xóa, chỉ chuyển sr-only nên
              người dùng trình đọc màn hình vẫn nghe đủ bốn chặng. */}
          <span
            className={`text-[11px] ${stage.state === 'current' ? '' : 'sr-only sm:not-sr-only'} ${
              stage.state === 'pending' ? 'text-ink-muted' : 'font-medium text-ink'
            }`}
          >
            {lt(stage.title)}
          </span>
          {/* Trạng thái nói bằng CHỮ cho người đọc màn hình — hình tròn
              rỗng/đặc không đọc lên được thành lời. */}
          <span className="sr-only">{t(STATE_LABEL[stage.state])}</span>
        </li>
      ))}
    </ol>
  )
}
