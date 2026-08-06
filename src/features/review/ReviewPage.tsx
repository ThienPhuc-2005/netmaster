// Tab Ôn tập — phiên flashcard theo SM-2 (spec 2.2): tối đa 15 thẻ,
// trộn xen kẽ module (buildReviewSession đã lo), tự chấm "nhớ/chưa nhớ".
// Danh sách thẻ của phiên chốt MỘT LẦN lúc vào trang — trả lời từng thẻ
// không làm phiên xáo lại giữa chừng.

import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Eye, Layers, ThumbsDown, ThumbsUp } from 'lucide-react'
import { buildReviewSession } from '../../engine/reviewQueue'
import { roomIdFromCardId } from '../../engine/palace'
import { findConcept, findPalaceRoom } from '../../content'
import { todayIso, useProgress } from '../../store/progress'
import { useT, type TFunc } from '../../i18n'
import { RoomGlyph } from '../palace/RoomGlyph'
import { playEarcon } from '../../audio/earcons'
import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'

interface CardFace {
  /** Nhãn nhỏ phía trên: thuật ngữ, hoặc vị trí phòng trong tòa nhà. */
  label: string
  front: string
  back: string
  /** Hình gợi nhớ — chỉ thẻ cung điện mới có (chỗ + hình là gợi ý). */
  imageId?: string
}

/**
 * Hai loại thẻ nằm CHUNG một hộp ôn tập: thẻ khái niệm (khóa là
 * conceptId) và thẻ phòng cung điện (khóa `palace:<roomId>`). Chỗ này là
 * nơi duy nhất phân biệt chúng — SM-2, hàng đợi và luật "mở app là ôn
 * trước" không cần biết gì về chuyện đó.
 */
function cardFace(cardId: string, t: TFunc): CardFace | null {
  const roomId = roomIdFromCardId(cardId)
  if (roomId !== null) {
    const ref = findPalaceRoom(roomId)
    if (ref === null) return null
    const { room } = ref
    return {
      label: t('palace.location', { floor: String(room.floor), position: String(room.position) }),
      front: t('palace.cardFrontHint'),
      back: t('palace.cardBack', { ports: room.ports.join(', '), service: room.service }),
      imageId: room.imageId,
    }
  }
  const ref = findConcept(cardId)
  // flashcard optional ở schema (concept noFlashcard) — nhưng thẻ ôn chỉ
  // được store sinh cho concept CÓ flashcard, nên nhánh này là phòng thủ.
  if (ref === null || ref.concept.flashcard === undefined) return null
  return {
    label: ref.concept.term,
    front: ref.concept.flashcard.front.vi,
    back: ref.concept.flashcard.back.vi,
  }
}

export function ReviewPage() {
  const t = useT()
  const allCards = useProgress((s) => s.reviewCards)
  const gradeReviewCard = useProgress((s) => s.gradeReviewCard)
  const completeReviewSession = useProgress((s) => s.completeReviewSession)

  // Phiên hôm nay: chốt danh sách conceptId một lần khi mở trang.
  const sessionConceptIds = useMemo(
    () => buildReviewSession(allCards, todayIso()).map((c) => c.conceptId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const heading = <h1 className="mb-6 text-xl font-bold">{t('review.title')}</h1>

  if (allCards.length === 0) {
    return (
      <>
        {heading}
        <EmptyState icon={Layers} title={t('review.emptyTitle')} body={t('review.emptyBody')} />
      </>
    )
  }

  if (sessionConceptIds.length === 0) {
    // Có thẻ nhưng chưa thẻ nào đến hạn — giãn cách là chủ đích, nói rõ.
    const nextDate = [...allCards].sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]?.dueDate
    return (
      <>
        {heading}
        <EmptyState
          icon={Layers}
          title={t('review.noneDueTitle')}
          body={nextDate !== undefined ? t('review.noneDueBody', { nextDate }) : t('review.noneDueBodyNoDate')}
        />
      </>
    )
  }

  if (finished) {
    return (
      <>
        {heading}
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
          <h2 className="text-lg font-semibold text-ink">{t('review.doneTitle')}</h2>
          <p className="text-sm text-ink-muted">
            {t('review.doneBody', { correct: correctCount, total: sessionConceptIds.length })}
          </p>
          <Link to="/" className="text-sm font-semibold text-accent hover:underline">
            {t('review.goLearn')}
          </Link>
        </div>
      </>
    )
  }

  const cardId = sessionConceptIds[index]
  const face = cardId === undefined ? null : cardFace(cardId, t)
  // Thẻ mồ côi (nội dung đổi sau khi người học đã có thẻ) — bỏ qua thay
  // vì dựng nửa vời một mặt thẻ trống.
  if (cardId === undefined || face === null) return null

  const grade = (remembered: boolean) => {
    gradeReviewCard(cardId, remembered)
    playEarcon(remembered ? 'correct' : 'incorrect')
    if (remembered) setCorrectCount((n) => n + 1)
    setRevealed(false)
    if (index + 1 >= sessionConceptIds.length) {
      completeReviewSession()
      playEarcon('lessonComplete')
      setFinished(true)
    } else {
      setIndex(index + 1)
    }
  }

  return (
    <>
      {heading}
      <div className="mx-auto flex max-w-lg flex-col gap-4">
        <p className="text-xs font-medium text-ink-muted">
          {t('review.cardOf', { current: index + 1, total: sessionConceptIds.length })}
        </p>

        <div className="flex min-h-44 flex-col items-center justify-center gap-4 rounded-md border border-edge bg-panel px-6 py-8 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">{face.label}</p>
          {face.imageId !== undefined && (
            <div className="h-20 w-20 rounded-md border border-edge bg-bg p-1">
              <RoomGlyph imageId={face.imageId} label={face.label} />
            </div>
          )}
          <p className="text-base font-medium leading-relaxed text-ink">{face.front}</p>
          {revealed && (
            <p className="border-t border-edge pt-4 text-sm leading-relaxed text-ink-muted">{face.back}</p>
          )}
        </div>

        {!revealed ? (
          <div className="flex justify-center">
            <Button onClick={() => setRevealed(true)}>
              <Eye size={15} aria-hidden />
              {t('review.showAnswer')}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-3">
              <Button onClick={() => grade(true)}>
                <ThumbsUp size={15} aria-hidden />
                {t('review.remembered')}
              </Button>
              <Button variant="ghost" onClick={() => grade(false)}>
                <ThumbsDown size={15} aria-hidden />
                {t('review.forgot')}
              </Button>
            </div>
            <p className="text-xs text-ink-muted">{t('review.selfGradeHint')}</p>
          </div>
        )}
      </div>
    </>
  )
}
