// Luyện lại đúng chỗ vấp (khối 21.9) — phần HÀNH ĐỘNG của mục phân tích
// chỗ hay sai. Phân tích nói ra chỗ hổng; màn này cho gặp lại đúng những
// câu đó mà không phải mò về từng bài.
//
// BA LUẬT khiến nó không phá cơ chế học (đã ghi ở `weakSpotDrill`):
//   1. KHÔNG XP, KHÔNG streak, KHÔNG đụng lịch SM-2 — câu ở đây đều đã
//      giải xong một lần, cộng điểm cho lượt làm lại là mở đường farm.
//      Màn này CỐ Ý không gọi một action ghi điểm nào của store.
//   2. Không mở khóa gì: đề chỉ lấy từ bài đã học xong.
//   3. Trộn xen kẽ module (engine lo) — luyện khối sinh ảo giác thành thạo.
//
// Nhịp một câu: tự trả lời → chấm ngay → đọc đáp án và vì sao → câu kế.
// Sai không bị phạt gì, nhưng cũng KHÔNG được lặng lẽ bỏ qua: câu chưa
// đúng được nói thẳng là chưa đúng rồi mới mở đáp án, vì đây vẫn là một
// lượt retrieval chứ không phải màn đọc lại.

import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ChevronLeft, MessageSquareWarning, RotateCcw, Target } from 'lucide-react'
import { lt, maybeLt } from '../../engine/ltext'
import { loadModules } from '../../content'
import { gradeQuestion, type QuestionResponse } from '../../engine/grading/gradeQuestion'
import { luyenThuHayQuen, weakSpotDrill } from '../../engine/mistakeLog'
import { useProgress } from '../../store/progress'
import { useT } from '../../i18n'
import { playEarcon } from '../../audio/earcons'
import { AnswerReveal } from '../../components/AnswerReveal'
import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { QuestionInput } from '../../components/QuestionInput'

export function WeakSpotDrillPage() {
  const t = useT()
  const lessonRuntimes = useProgress((s) => s.lessonRuntimes)
  const reviewCards = useProgress((s) => s.reviewCards)
  const ghiChuaLot = useProgress((s) => s.ghiChuaLot)
  const daKhaiChuaLot = useProgress((s) => s.giaiThichChuaLot)
  const [searchParams] = useSearchParams()
  // HAI NGUỒN, MỘT MÀN (khối 21.52). Nhịp luyện, cách chấm, luật không-XP
  // đều giống hệt nhau — khác đúng chỗ lấy đề, nên dựng màn thứ hai chỉ
  // để đổi một dòng soạn đề là nhân đôi chỗ phải sửa về sau.
  const hayQuen = searchParams.get('nguon') === 'hay-quen'

  // Đề chốt MỘT LẦN lúc mở trang: trả lời xong một câu mà đề tự xáo lại
  // giữa chừng thì người học không biết mình đang ở đâu trong phiên.
  const items = useMemo(
    () =>
      hayQuen ? luyenThuHayQuen(loadModules(), reviewCards) : weakSpotDrill(loadModules(), lessonRuntimes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hayQuen],
  )
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState<{ correct: boolean; response: QuestionResponse } | null>(null)
  const [rightCount, setRightCount] = useState(0)

  const backLink = (
    <Link to="/ho-so" className="text-sm font-medium text-accent hover:underline">
      {t('weakDrill.backToProfile')}
    </Link>
  )

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title={t(hayQuen ? 'weakDrill.quenEmptyTitle' : 'weakDrill.emptyTitle')}
        body={t(hayQuen ? 'weakDrill.quenEmptyBody' : 'weakDrill.emptyBody')}
        action={backLink}
      />
    )
  }

  const heading = (
    <div className="mb-6 flex flex-col gap-2">
      <Link to="/ho-so" className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink">
        <ChevronLeft size={14} aria-hidden />
        {t('weakDrill.backToProfile')}
      </Link>
      <h1 className="text-xl font-bold text-ink">{t(hayQuen ? 'weakDrill.quenTitle' : 'weakDrill.title')}</h1>
    </div>
  )

  if (index >= items.length) {
    return (
      <>
        {heading}
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
          <h2 className="text-lg font-semibold text-ink">{t('weakDrill.doneTitle')}</h2>
          <p className="text-sm leading-relaxed text-ink-muted">
            {t(hayQuen ? 'weakDrill.quenDoneBody' : 'weakDrill.doneBody', {
              correct: rightCount,
              total: items.length,
            })}
          </p>
          <p className="text-xs leading-relaxed text-ink-muted">{t('weakDrill.noXpNote')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => {
                setIndex(0)
                setRightCount(0)
                setResult(null)
              }}
            >
              <RotateCcw size={15} aria-hidden />
              {t('weakDrill.again')}
            </Button>
            {backLink}
          </div>
        </div>
      </>
    )
  }

  const item = items[index]!
  const daBaoChuaLot = daKhaiChuaLot.some((d) => d.questionId === item.question.id)

  const submit = (response: QuestionResponse) => {
    const correct = gradeQuestion(item.question, response)
    playEarcon(correct ? 'correct' : 'incorrect')
    if (correct) setRightCount((n) => n + 1)
    setResult({ correct, response })
  }

  return (
    <>
      {heading}
      <div className="mx-auto flex max-w-lg flex-col gap-4">
        <p className="text-xs font-medium text-ink-muted">
          {t('weakDrill.cardOf', { current: index + 1, total: items.length })}
          {/* Hai con số đo hai chuyện khác nhau — dùng nhầm nhãn là nói sai
              với người học: vấp là lúc đang học, quên là đã học xong rồi. */}
          <span className="ml-2 text-warn">
            {item.quen === undefined
              ? t('weakDrill.slipTag', { count: item.failCount })
              : t('weakDrill.quenTag', { count: item.quen })}
          </span>
        </p>

        <p className="font-medium text-ink">{lt(item.question.prompt)}</p>

        {result === null ? (
          // Không truyền draftKey: phiên này là luyện tại chỗ, không phải
          // bài học — giữ bài dở ở đây sẽ đá nhau với bài dở của bài gốc
          // (cùng questionId, hai nơi cùng ghi một khóa).
          <QuestionInput key={item.question.id} question={item.question} onSubmit={submit} />
        ) : (
          <div className="flex flex-col gap-3">
            <FeedbackBanner
              state={
                result.correct
                  ? { kind: 'correct', praise: t('weakDrill.correctAgain') }
                  : { kind: 'incorrect', tier: 1, topic: maybeLt(item.question.hintTopic) }
              }
            />
            <AnswerReveal question={item.question} response={result.response} explanation={lt(item.solution)} />

            {/* "CHỖ NÀY GIẢI THÍCH CHƯA LỌT" (ý N6) — chỉ mời khi vừa trả
                lời CHƯA ĐÚNG, và chỉ ở phiên luyện lại.
                Vì sao đúng chỗ này: câu trong phiên đều thuộc bài người
                học ĐÃ HỌC XONG. Sai lại ở đây không còn là "chưa học tới",
                nó là tín hiệu lời giảng chưa vào — và đây là lúc duy nhất
                người học vừa đọc lại lời giải xong nên biết rõ nó lọt hay
                không. Hỏi lúc khác là hỏi lúc họ đã quên mất cảm giác ấy.
                Đây KHÔNG phải nút khiếu nại chấm ("mình nghĩ câu này
                đúng"): ở đây người học không đòi mình đúng. */}
            {!result.correct && (
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-edge bg-panel px-4 py-3">
                {daBaoChuaLot ? (
                  <p className="text-xs text-ink-muted">{t('weakDrill.chuaLotDaGhi')}</p>
                ) : (
                  <>
                    <p className="text-xs text-ink-muted">{t('weakDrill.chuaLotHoi')}</p>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        ghiChuaLot(item.lessonId, item.question.id)
                      }}
                    >
                      <MessageSquareWarning size={14} aria-hidden />
                      {t('weakDrill.chuaLotNut')}
                    </Button>
                  </>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => {
                  setResult(null)
                  setIndex(index + 1)
                }}
              >
                {t('weakDrill.next')}
              </Button>
              <Link to={`/bai/${item.lessonId}`} className="text-sm font-medium text-accent hover:underline">
                {t('weakDrill.openLesson')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
