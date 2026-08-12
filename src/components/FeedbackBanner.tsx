// Banner phản hồi 3 tầng (spec 4.4, nguyên tắc 4). Đây là BỘ MẶT của
// triết lý chấm bài: không bao giờ hiện chữ "SAI" trần trụi, không dùng
// màu đỏ cho câu trả lời chưa đúng — đỏ chỉ dành cho lỗi hệ thống.
// Tầng 1: lời động viên (kèm chủ đề nếu có) → tầng 2: gợi ý cụ thể →
// tầng 3: lời giải + nhắc tự gõ lại (generation effect).
// Mã tầng đến từ engine (feedbackTier); chữ hiển thị đến từ i18n +
// nội dung bài học — component này chỉ ghép hai thứ đó lại.

import { useEffect, useRef } from 'react'
import { CheckCircle2, Lightbulb, BookOpenCheck, HelpCircle } from 'lucide-react'
import { useT } from '../i18n'
import type { FeedbackTier } from '../engine/lessonMachine'

export type FeedbackState =
  | {
      kind: 'correct'
      /**
       * Lời khen gắn với HÀNH VI vừa làm (engine/praise) — bề mặt nào đọc
       * ra được hành vi thì truyền vào; thiếu thì rơi về câu khen chung.
       * Khen việc bền hơn khen kết quả, nhưng chỉ khi câu khen nói đúng
       * việc: chỗ không biết người học vừa làm gì thì im lặng tử tế hơn.
       */
      praise?: string
    }
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
  const vung = useRef<HTMLDivElement>(null)

  // ĐƯA PHẢN HỒI VÀO TẦM MẮT (phát hiện J2, lượt rà soát 08-12).
  //
  // Ở bài nặng — phòng lab, terminal PowerShell/CLI, ca phòng khám — khối
  // phản hồi nằm dưới cùng một trang cao gấp rưỡi màn hình. Đo thật lúc
  // rà soát: phản hồi ở 649–872px trong khi màn cao 694px. Người học bấm
  // "Nộp bài" xong nhìn màn hình y hệt lúc chưa bấm, tưởng nút hỏng.
  //
  // Ba luật, mỗi luật một lý do:
  //   1. CHỈ cuộn khi phản hồi thật sự nằm ngoài tầm mắt — giật màn hình
  //      khi nó đang hiện sẵn là làm phiền không lý do (câu ngắn: trắc
  //      nghiệm, gõ tay… vốn đã thấy phản hồi ngay).
  //   2. Cuộn TỨC THÌ, không mượt: khung cuộn của app là <main> lồng bên
  //      trong, Chromium lặng lẽ bỏ qua `smooth` ở khung lồng (đã đo, xem
  //      GHI-CHU mục 8).
  //   3. CUỘN RỒI THÌ MỚI dời focus (WCAG 2.4.3, cùng luật với mọi cửa
  //      quay lại trang Học) — và chỉ khi ấy. Phản hồi đang nằm sẵn
  //      trong tầm mắt mà vẫn giật focus ra khỏi ô người học vừa gõ là
  //      cướp chỗ đứng của họ: ở bảng VLSM (bốn dòng, mỗi dòng hai ô)
  //      người ta thường sửa tiếp đúng ô vừa nộp. Vùng này là live
  //      region, nên khi nó đã hiện sẵn thì trình đọc màn hình vẫn đọc
  //      mà không cần ai dời con trỏ đi đâu cả.
  useEffect(() => {
    if (state === null) return
    const el = vung.current
    if (el === null) return
    const r = el.getBoundingClientRect()
    const ngoaiTamMat = r.bottom > window.innerHeight || r.top < 0
    if (!ngoaiTamMat) return
    el.scrollIntoView({ block: 'nearest' })
    el.focus({ preventScroll: true })
  }, [state])

  return (
    <div role="status" ref={vung} tabIndex={-1} className="scroll-mt-4 focus:outline-none">
      {state !== null && <FeedbackBanner state={state} />}
    </div>
  )
}

export function FeedbackBanner({ state }: { state: FeedbackState }) {
  const t = useT()

  if (state.kind === 'correct') {
    return (
      // Câu khen theo hành vi dài hơn "Chuẩn luôn!" một quãng nên khối này
      // canh MÉP TRÊN: canh giữa thì icon trôi xuống giữa đoạn hai dòng.
      <div className="flex items-start gap-3 rounded-md border border-ok/40 bg-panel px-4 py-3 text-sm leading-relaxed text-ok">
        <CheckCircle2 size={18} aria-hidden className="mt-0.5 shrink-0" />
        <span className="font-semibold">{state.praise ?? t('feedback.correct')}</span>
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
