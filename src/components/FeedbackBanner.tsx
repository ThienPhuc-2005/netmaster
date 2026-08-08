// Banner phản hồi 3 tầng (spec 4.4, nguyên tắc 4). Đây là BỘ MẶT của
// triết lý chấm bài: không bao giờ hiện chữ "SAI" trần trụi, không dùng
// màu đỏ cho câu trả lời chưa đúng — đỏ chỉ dành cho lỗi hệ thống.
// Tầng 1: lời động viên (kèm chủ đề nếu có) → tầng 2: gợi ý cụ thể →
// tầng 3: lời giải + nhắc tự gõ lại (generation effect).
// Mã tầng đến từ engine (feedbackTier); chữ hiển thị đến từ i18n +
// nội dung bài học — component này chỉ ghép hai thứ đó lại.

import { CheckCircle2, Lightbulb, BookOpenCheck, HelpCircle } from 'lucide-react'
import { useT } from '../i18n'
import type { FeedbackTier } from '../engine/lessonMachine'

export type FeedbackState =
  | { kind: 'correct' }
  | {
      kind: 'incorrect'
      tier: Exclude<FeedbackTier, 0>
      /** "X" trong "Gần rồi — nghĩ lại về X nhé" (hintTopic của câu hỏi). */
      topic?: string
      /** Gợi ý cụ thể từ nội dung bài (tầng 2). */
      hint?: string
      /** Lời giải + giải thích từ nội dung bài (tầng 3). */
      solution?: string
      /**
       * Câu trả lời cận-đúng: lời phản hồi may đo từ nội dung bài
       * (nearMisses) thay cho câu tầng-1 chung — vẫn là màu hổ phách,
       * vẫn trong thang 3 tầng.
       */
      nearMiss?: string
    }

/**
 * Vùng live THƯỜNG TRỰC cho phản hồi chấm bài. Live region chỉ được
 * screen reader announce đáng tin khi phần tử ĐÃ TỒN TẠI trước rồi nội
 * dung mới đổi — mount cả khối role="status" kèm sẵn nội dung (kiểu
 * `{feedback && <FeedbackBanner/>}` cũ) thường bị NVDA/VoiceOver nuốt
 * (hội đồng 2026-08-07, ghế a11y). Dùng vùng này ở chỗ phản hồi xuất
 * hiện SAU tương tác; banner tĩnh (trưng bày, xem lại) dùng thẳng
 * FeedbackBanner không role.
 */
export function FeedbackRegion({ state }: { state: FeedbackState | null }) {
  return <div role="status">{state !== null && <FeedbackBanner state={state} />}</div>
}

export function FeedbackBanner({ state }: { state: FeedbackState }) {
  const t = useT()

  if (state.kind === 'correct') {
    return (
      <div className="flex items-center gap-3 rounded-md border border-ok/40 bg-panel px-4 py-3 text-sm text-ok">
        <CheckCircle2 size={18} aria-hidden />
        <span className="font-semibold">{t('feedback.correct')}</span>
      </div>
    )
  }

  const tier1Text =
    state.nearMiss ??
    (state.topic !== undefined
      ? t('feedback.tier1WithTopic', { topic: state.topic })
      : t('feedback.tier1Generic'))

  return (
    <div className="flex flex-col gap-2 rounded-md border border-warn/40 bg-panel px-4 py-3 text-sm text-ink">
      <div className="flex items-center gap-3 text-warn">
        <HelpCircle size={18} aria-hidden />
        <span className="font-semibold">{tier1Text}</span>
      </div>

      {state.tier >= 2 && state.hint !== undefined && (
        <div className="flex items-start gap-3 border-t border-edge pt-2">
          <Lightbulb size={18} aria-hidden className="mt-0.5 shrink-0 text-warn" />
          <p>
            <span className="font-semibold">{t('feedback.tier2Label')}: </span>
            {state.hint}
          </p>
        </div>
      )}

      {state.tier >= 3 && state.solution !== undefined && (
        <div className="flex items-start gap-3 border-t border-edge pt-2">
          <BookOpenCheck size={18} aria-hidden className="mt-0.5 shrink-0 text-accent" />
          <div>
            <p>
              <span className="font-semibold">{t('feedback.tier3Label')}: </span>
              {state.solution}
            </p>
            <p className="mt-1 text-ink-muted">{t('feedback.tier3Note')}</p>
          </div>
        </div>
      )}
    </div>
  )
}
