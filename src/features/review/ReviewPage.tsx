// Tab Ôn tập — phiên flashcard theo SM-2 (spec 2.2): tối đa 15 thẻ,
// trộn xen kẽ module (buildReviewSession đã lo), tự chấm "nhớ/chưa nhớ".
// Danh sách thẻ của phiên chốt MỘT LẦN lúc vào trang — trả lời từng thẻ
// không làm phiên xáo lại giữa chừng.
//
// RELEARNING (hội đồng 2026-08-07, đã duyệt): thẻ trả lời "chưa nhớ"
// quay lại CUỐI phiên cho tới khi người học tự nhớ được một lần — cố nhớ
// thất bại rồi đọc đáp án thụ động là restudy, chưa phải retrieval; lần
// nhớ lại THÀNH CÔNG sau feedback mới là lúc củng cố xảy ra (thiết kế
// relearning của mọi SRS nghiêm túc). Chỉ lượt chấm ĐẦU của thẻ ghi vào
// SM-2 và XP — lượt học lại là chuyện nội bộ của phiên, không đụng lịch
// (luật reset 1 ngày của spec giữ nguyên), không cộng gì.

import { useMemo, useRef, useState } from 'react'
import { lt } from '../../engine/ltext'
import { Link } from 'react-router'
import { Eye, Layers, RotateCcw, ThumbsDown, ThumbsUp } from 'lucide-react'
import { SESSION_CAP, buildReviewSession, dueCards, flashcardAskIndex, flashcardTurn } from '../../engine/reviewQueue'
import { conceptStumbles } from '../../engine/mistakeLog'
import {
  calibrationSummary,
  calibrationVerdict,
  type CalibrationRecord,
  type CalibrationVerdict,
  type Confidence,
} from '../../engine/calibration'
import { roomIdFromCardId } from '../../engine/palace'
import { findConcept, findPalaceRoom, loadModules } from '../../content'
import { shouldReviewFirst, todayIso, useProgress } from '../../store/progress'
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
function cardFace(cardId: string, t: TFunc, turn: number): CardFace | null {
  const roomId = roomIdFromCardId(cardId)
  if (roomId !== null) {
    const ref = findPalaceRoom(roomId)
    if (ref === null) return null
    const { room } = ref
    return {
      label: t('palace.location', { floor: String(room.floor), position: String(room.position) }),
      front: t('palace.cardFrontHint'),
      back: t('palace.cardBack', { keys: room.keys.join(', '), name: room.name }),
      imageId: room.imageId,
    }
  }
  const ref = findConcept(cardId)
  // flashcard optional ở schema (concept noFlashcard) — nhưng thẻ ôn chỉ
  // được store sinh cho concept CÓ flashcard, nên nhánh này là phòng thủ.
  if (ref === null || ref.concept.flashcard === undefined) return null
  // Thẻ khai nhiều cách hỏi (H5) thì lượt này lấy đúng một cách; mặt sau
  // không đổi — mọi cách hỏi phải trả lời được bằng chính nó (luật soạn
  // bài ở contentSchema).
  const { front, alsoAsk } = ref.concept.flashcard
  const asks = [front, ...(alsoAsk ?? [])]
  return {
    label: ref.concept.term,
    front: lt(asks[flashcardAskIndex(turn, asks.length)] ?? front),
    back: lt(ref.concept.flashcard.back),
  }
}

export function ReviewPage() {
  const t = useT()
  const allCards = useProgress((s) => s.reviewCards)
  const lessonRuntimes = useProgress((s) => s.lessonRuntimes)
  const lastReviewDate = useProgress((s) => s.lastReviewDate)
  const gradeReviewCard = useProgress((s) => s.gradeReviewCard)
  const completeReviewSession = useProgress((s) => s.completeReviewSession)
  const ghiAoGiacQuenMat = useProgress((s) => s.ghiAoGiacQuenMat)

  // Chỗ hay vấp, quy về từng khái niệm (kho ý tưởng I2) — cùng hạn thì
  // thẻ của khái niệm hay cắn được lên trước.
  const vapTheoKhaiNiem = useMemo(
    () => conceptStumbles(loadModules(), lessonRuntimes),
    [lessonRuntimes],
  )

  // Phiên hôm nay: chốt danh sách conceptId một lần khi mở trang.
  const sessionConceptIds = useMemo(
    () => buildReviewSession(allCards, todayIso(), SESSION_CAP, vapTheoKhaiNiem).map((c) => c.conceptId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  // Hàng đợi CỦA PHIÊN: bắt đầu bằng danh sách chốt, thẻ "chưa nhớ" được
  // nối thêm vào cuối (relearning). Chỉ thẻ chưa có trong firstGraded mới
  // được ghi vào store — các vòng học lại là chuyện nội bộ.
  const [queue, setQueue] = useState<string[]>(sessionConceptIds)
  const [firstGraded, setFirstGraded] = useState<ReadonlySet<string>>(new Set())
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  // Tự chấm độ chắc (kho ý tưởng A2): độ chắc của THẺ ĐANG MỞ, và sổ ghi
  // cả phiên. Cả hai sống trong phiên, KHÔNG lưu xuống máy — đây là phép
  // đo của người học về chính mình lúc này, không phải điểm số.
  const [confidence, setConfidence] = useState<Confidence | null>(null)
  const [calibration, setCalibration] = useState<CalibrationRecord[]>([])
  const [lastVerdict, setLastVerdict] = useState<CalibrationVerdict | null>(null)
  // Cách hỏi của thẻ (H5) suy từ trạng thái SM-2, mà trạng thái đó đổi
  // NGAY khi chấm — nên phải chốt một lần rồi giữ suốt trang: thẻ trả lời
  // "chưa nhớ" quay lại cuối phiên mà đổi luôn câu hỏi thì vòng học lại
  // hóa ra là học một thứ khác.
  const turns = useRef(new Map<string, number>())
  const turnOf = (id: string): number => {
    const cached = turns.current.get(id)
    if (cached !== undefined) return cached
    const turn = flashcardTurn(allCards.find((c) => c.conceptId === id) ?? null)
    turns.current.set(id, turn)
    return turn
  }

  // Người bị luật "mở app là ôn trước" đưa thẳng vào đây cần một lời
  // giải thích TẠI CHỖ — banner vì-sao nằm ở trang Học là nơi họ không
  // được đưa tới (hội đồng, ghế onboarding).
  const teleported = shouldReviewFirst(allCards, lastReviewDate, todayIso())
  const heading = (
    <div className="mb-6 flex flex-col gap-1">
      <h1 className="text-xl font-bold">{t('review.title')}</h1>
      {teleported && !finished && sessionConceptIds.length > 0 && (
        <p className="text-sm text-ink-muted">
          {t('review.whyHere', { count: dueCards(allCards, todayIso()).length })}
        </p>
      )}
    </div>
  )

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
    // Hết phiên nhưng CÒN thẻ đến hạn (phiên cắt trần 15) — không làm ngõ
    // cụt đẩy người học đi vòng Học↔Ôn tập: mời ôn phiên tiếp ngay tại chỗ.
    const stillDue = buildReviewSession(allCards, todayIso(), SESSION_CAP, vapTheoKhaiNiem).map((c) => c.conceptId)
    const calibSummary = calibrationSummary(calibration)
    return (
      <>
        {heading}
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
          <h2 className="text-lg font-semibold text-ink">{t('review.doneTitle')}</h2>
          <p className="text-sm text-ink-muted">
            {t('review.doneBody', { correct: correctCount, total: sessionConceptIds.length })}
          </p>
          {/* Tổng kết tự chấm (A2): con số này KHÔNG phải điểm — nó đo
              khả năng tự biết mình biết gì, và chỉ nói ra khi đủ vài
              lượt để có nghĩa. */}
          {calibSummary.accuracy !== null && calibSummary.total >= 3 && (
            <p className="text-sm leading-relaxed text-ink-muted">
              {t('review.calibDone', {
                aligned: calibSummary.aligned,
                total: calibSummary.total,
              })}
              {calibSummary.overconfident > 0 && ` ${t('review.calibDoneOver', { count: calibSummary.overconfident })}`}
            </p>
          )}
          {stillDue.length > 0 ? (
            <>
              <p className="text-sm text-ink-muted">{t('review.moreDue', { count: stillDue.length })}</p>
              <Button
                onClick={() => {
                  setQueue(stillDue)
                  setFirstGraded(new Set())
                  setIndex(0)
                  setCorrectCount(0)
                  setRevealed(false)
                  setFinished(false)
                }}
              >
                <RotateCcw size={15} aria-hidden />
                {t('review.nextSession')}
              </Button>
            </>
          ) : (
            <Link to="/" className="text-sm font-semibold text-accent hover:underline">
              {t('review.goLearn')}
            </Link>
          )}
        </div>
      </>
    )
  }

  const cardId = queue[index]
  const face = cardId === undefined ? null : cardFace(cardId, t, turnOf(cardId))
  // Thẻ mồ côi (nội dung đổi sau khi người học đã có thẻ) — bỏ qua thay
  // vì dựng nửa vời một mặt thẻ trống.
  if (cardId === undefined || face === null) return null
  const isRelearn = firstGraded.has(cardId)

  /**
   * "Bạn của mấy tuần trước" (kho ý tưởng A4): thẻ từng quên mấy lần thì
   * nói ra trước khi lật. Cảm giác tiến bộ đo được giữ người học lâu hơn
   * điểm số — và con số này vốn đã nằm sẵn trong `lapses` của SM-2.
   *
   * Chỉ nói ở lượt chấm ĐẦU: trong vòng học lại của chính phiên này thì
   * câu đó thành thừa. Và nó không hé lộ gì về nội dung nên không làm
   * hỏng nhịp tự-nhớ-trước-khi-lật.
   */
  const lapses = allCards.find((c) => c.conceptId === cardId)?.lapses ?? 0
  const showComeback = !isRelearn && lapses > 0

  const grade = (remembered: boolean) => {
    // Chỉ lượt chấm ĐẦU ghi SM-2 + XP; vòng học lại không đụng store.
    if (!isRelearn) {
      gradeReviewCard(cardId, remembered)
      setFirstGraded((s) => new Set(s).add(cardId))
      if (remembered) setCorrectCount((n) => n + 1)
      // Đối chiếu lời tự chấm với chuyện vừa xảy ra — chỉ ở lượt ĐẦU,
      // vì vòng học lại thì người học đã biết đáp án, độ chắc hết nghĩa.
      if (confidence !== null) {
        setCalibration((rows) => [...rows, { cardId, confidence, remembered }])
        const verdict = calibrationVerdict(confidence, remembered)
        setLastVerdict(verdict)
        // Ảo giác quen mặt là thứ chỉ lộ ra qua NHIỀU phiên, nên nấc này
        // được ghi lại; phần tự chấm còn lại vẫn tan theo phiên như cũ.
        if (verdict === 'overconfident') ghiAoGiacQuenMat(cardId)
      }
    }
    playEarcon(remembered ? 'correct' : 'incorrect')
    // Chưa nhớ (lần đầu hay lần học lại) → thẻ nối vào cuối hàng đợi.
    const nextQueue = remembered ? queue : [...queue, cardId]
    if (!remembered) setQueue(nextQueue)
    setRevealed(false)
    setConfidence(null)
    if (index + 1 >= nextQueue.length) {
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
          {t('review.cardOf', { current: index + 1, total: queue.length })}
          {isRelearn && <span className="ml-2 font-semibold text-accent">{t('review.relearnTag')}</span>}
        </p>

        {showComeback && <p className="text-xs text-ink-muted">{t('review.comeback', { count: lapses })}</p>}

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
          /* Tự chấm độ chắc TRƯỚC KHI LẬT (kho ý tưởng A2). Ba nút này
             CHÍNH LÀ nút lật thẻ — hỏi thêm một màn nữa là đổi một thói
             quen tốt lấy một phiền phức. Ở vòng học lại thì bỏ qua: lúc
             đó người học đã biết đáp án, hỏi độ chắc là hỏi vô nghĩa. */
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-ink-muted">
              {isRelearn ? t('review.showAnswerHint') : t('review.confidenceAsk')}
            </p>
            {isRelearn ? (
              <Button onClick={() => setRevealed(true)}>
                <Eye size={15} aria-hidden />
                {t('review.showAnswer')}
              </Button>
            ) : (
              <div className="flex flex-wrap justify-center gap-3">
                {(['sure', 'unsure', 'blank'] as const).map((level) => (
                  <Button
                    key={level}
                    variant={level === 'sure' ? 'primary' : 'ghost'}
                    onClick={() => {
                      setConfidence(level)
                      setRevealed(true)
                    }}
                  >
                    {t(`review.confidence.${level}`)}
                  </Button>
                ))}
              </div>
            )}
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

        {/* Đối chiếu lượt VỪA RỒI — hiện ở thẻ kế tiếp, đúng lúc lời tự
            chấm còn nóng. Chỉ nói khi có chuyện đáng nói (lệch hai
            hướng); khớp thì im lặng, khen mỗi lượt đúng là nhiễu. */}
        <div role="status">
          {lastVerdict !== null && lastVerdict !== 'aligned' && !revealed && (
            <p className="rounded-md border border-edge bg-panel px-4 py-3 text-sm leading-relaxed text-ink-muted">
              {t(lastVerdict === 'overconfident' ? 'review.calibOver' : 'review.calibUnder')}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
