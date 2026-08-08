// Phiên củng cố nền — nhánh "support" của flow engine (spec 2.3:
// "đúng < 60% → chèn lại bài ôn nền tảng liên quan").
//
// Vì sao nó KHÔNG phải một phiên ôn SM-2:
//   - Thẻ được chọn theo QUAN HỆ NỀN với bài sắp học (engine/flow chọn),
//     không theo lịch đến hạn — ôn sớm ngoài lịch mà ghi vào SM-2 sẽ
//     phá interval của thẻ.
//   - KHÔNG cộng XP (nguyên tắc 5 + chống farm: cố tình sai cho tụt
//     điểm rồi cày phiên củng cố lấy thưởng).
//   - Vẫn giữ nhịp retrieval: mặt trước hiện ra, người học tự nhớ rồi
//     mới lật — không phải màn đọc lướt.
//
// Bắt buộc đi qua (đã chốt): "chèn" của spec nghĩa là nằm giữa đường,
// không phải một lời đề nghị. Nhưng nó ngắn (tối đa 6 thẻ) và có thời
// gian nguội — không ai bị nhốt trong vòng ôn vô hạn.

import { useEffect, useMemo, useState } from 'react'
import { lt } from '../../engine/ltext'
import { ArrowRight, Eye, Sprout } from 'lucide-react'
import type { Lesson, Module } from '../../engine/contentSchema'
import { foundationConceptIds } from '../../engine/flow'
import { loadModules } from '../../content'
import { useProgress } from '../../store/progress'
import { useT } from '../../i18n'
import { Button } from '../../components/Button'

/** Trần số thẻ một phiên củng cố — đủ nhắc nền, không thành hình phạt. */
const SUPPORT_CARD_CAP = 6

export function FoundationReview({ module, lesson }: { module: Module; lesson: Lesson }) {
  const t = useT()
  const markSupportShown = useProgress((s) => s.markSupportShown)

  // Khái niệm nền do engine chọn (gần nhất trước); chỉ giữ concept có
  // flashcard — khái niệm meta (noFlashcard) không có mặt thẻ để lật.
  const cards = useMemo(() => {
    const previous = loadModules().find((m) => m.order === module.order - 1) ?? null
    const conceptById = new Map(
      [module, ...(previous !== null ? [previous] : [])].flatMap((m) => m.concepts.map((c) => [c.id, c] as const)),
    )
    return foundationConceptIds(module, lesson, previous)
      .map((cid) => conceptById.get(cid))
      .filter((c) => c !== undefined && c.flashcard !== undefined)
      .slice(0, SUPPORT_CARD_CAP)
  }, [module, lesson])

  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  // Không có thẻ nền nào (dữ liệu cực đoan) → không có gì để củng cố,
  // mở đường vào bài luôn thay vì kẹt ở màn trống. Đặt trong effect vì
  // nó set state của store, không được làm giữa lúc render.
  const empty = cards.length === 0
  useEffect(() => {
    if (empty) markSupportShown()
  }, [empty, markSupportShown])
  if (empty) return null

  const card = cards[index]!
  const flashcard = card.flashcard!
  const atLast = index === cards.length - 1

  const next = () => {
    setRevealed(false)
    if (atLast) markSupportShown()
    else setIndex((i) => i + 1)
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-2 text-sm font-semibold text-accent">
          <Sprout size={16} aria-hidden />
          {t('flow.supportTitle')}
        </p>
        <p className="text-sm leading-relaxed text-ink-muted">{t('flow.supportBody')}</p>
      </div>

      <p className="text-xs font-medium text-ink-muted">
        {t('flow.supportCardOf', { current: index + 1, total: cards.length })}
      </p>

      <div className="flex min-h-44 flex-col justify-center gap-4 rounded-md border border-edge bg-panel px-6 py-8 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">{card.term}</p>
        <p className="text-base font-medium leading-relaxed text-ink">{lt(flashcard.front)}</p>
        {revealed && (
          <p className="border-t border-edge pt-4 text-sm leading-relaxed text-ink-muted">{lt(flashcard.back)}</p>
        )}
      </div>

      <div className="flex justify-center">
        {!revealed ? (
          <Button onClick={() => setRevealed(true)}>
            <Eye size={15} aria-hidden />
            {t('review.showAnswer')}
          </Button>
        ) : (
          <Button onClick={next}>
            {atLast ? t('flow.supportEnter') : t('flow.supportNext')}
            <ArrowRight size={15} aria-hidden />
          </Button>
        )}
      </div>
    </div>
  )
}
