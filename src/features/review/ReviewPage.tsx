// Tab Ôn tập — phiên flashcard theo SM-2 (spec 2.2): tối đa 15 thẻ,
// trộn xen kẽ module (buildReviewSession đã lo), tự chấm "nhớ/chưa nhớ".
// Danh sách thẻ của phiên chốt MỘT LẦN lúc vào trang — trả lời từng thẻ
// không làm phiên xáo lại giữa chừng.

import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Eye, Layers, ThumbsDown, ThumbsUp } from 'lucide-react'
import { buildReviewSession } from '../../engine/reviewQueue'
import { findConcept } from '../../content'
import { todayIso, useProgress } from '../../store/progress'
import { useT } from '../../i18n'
import { playEarcon } from '../../audio/earcons'
import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'

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

  const conceptId = sessionConceptIds[index]
  const ref = conceptId !== undefined ? findConcept(conceptId) : null
  // flashcard optional ở schema (concept noFlashcard) — nhưng thẻ ôn chỉ
  // được store sinh cho concept CÓ flashcard, nên nhánh này là phòng thủ.
  if (conceptId === undefined || ref === null || ref.concept.flashcard === undefined) return null
  const flashcard = ref.concept.flashcard

  const grade = (remembered: boolean) => {
    gradeReviewCard(conceptId, remembered)
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

        <div className="flex min-h-44 flex-col justify-center gap-4 rounded-md border border-edge bg-panel px-6 py-8 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">{ref.concept.term}</p>
          <p className="text-base font-medium leading-relaxed text-ink">{flashcard.front.vi}</p>
          {revealed && (
            <p className="border-t border-edge pt-4 text-sm leading-relaxed text-ink-muted">
              {flashcard.back.vi}
            </p>
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
