// Bài kiểm tra module — mastery gate (nguyên tắc 2): >= 85% mở module
// sau, không có nút skip. Trong lúc thi KHÔNG có gợi ý/phản hồi từng câu
// (kiến thức phải tự đứng); kết quả hiện một thể ở cuối.
//
// Ba luật đo lường (hội đồng 2026-08-07 + 08-08, đã duyệt) giữ cho con số
// 85% thật sự đo kiến thức chứ không đo trí nhớ về ĐỀ:
//   - Mỗi lượt RÚT một đề con từ pool của module (drawMasteryTest) — thi
//     lại là đề khác, không phải đề cũ vừa đọc ý cần ôn xong. Cỡ đề cố
//     định nên 85% vẫn so sánh được giữa các lượt.
//   - Thứ tự CÂU xáo lại mỗi lượt thi (thứ tự lựa chọn MCQ đã xáo ở
//     McqInput) — thuộc lòng "câu 3 chọn ô B" hết đường sống.
//   - RỚT chỉ hiện Ý CẦN ÔN (prompt + hintTopic), KHÔNG in nguyên văn
//     đáp án — in đáp án rồi cho thi lại ngay là biến gate thành bài
//     chép 2 phút. Đáp án đầy đủ chỉ hiện sau khi ĐẬU (lúc đó đọc lại
//     là ôn, không còn là lỗ rò). Đúng chữ spec: "rớt hiện ý cần ôn".
//
// CHẾ ĐỘ THI VƯỢT (?vuot=1, 08-08) dùng chung TOÀN BỘ màn này: cùng đề,
// cùng ngưỡng 85%, cùng luật xáo câu và luật rớt-không-rò-đáp-án. Khác
// đúng một chỗ, nằm ở mép ngoài: bỏ điều kiện "đã học hết bài trong
// module". Vượt hụt thì thi vượt lại được ngay — giới hạn một lượt đã bỏ
// (chủ dự án chốt 08-08): cửa vượt phải luôn có mặt ở mọi chủ đề lớn,
// mà cửa đã tiêu mất thì bằng không có. Đây KHÔNG phải nút skip —
// nguyên tắc 2 nguyên vẹn: vẫn phải làm đúng >= 85% đề mastery.

import { useState } from 'react'
import { lt, maybeLt } from '../../engine/ltext'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router'
import { Award, ChevronLeft, GraduationCap, Lock, Mail } from 'lucide-react'
import { findModule, lessonsInOrder } from '../../content'
import { backToLearn } from './LearnPage'
import { MASTERY_THRESHOLD_PCT, computeModuleStatuses } from '../../engine/masteryGate'
import { gradeQuestion, type QuestionResponse } from '../../engine/grading/gradeQuestion'
import { drawMasteryTest, masteryDrawCount } from '../../engine/masteryPool'
import type { Question } from '../../engine/contentSchema'
import { loadModules } from '../../content'
import { canChallengeModule, useProgress } from '../../store/progress'
import { milestoneOfModule } from '../graduation/milestones'
import { useT } from '../../i18n'
import { playEarcon } from '../../audio/earcons'
import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'
import { QuestionInput } from '../../components/QuestionInput'
import { AnswerReveal } from '../../components/AnswerReveal'
import { DisputeButton } from '../../components/DisputeButton'

// `challenge` phải đi THEO LƯỢT THI, không suy lại từ store: nộp xong là
// lượt vượt bị tiêu, cờ suy từ store lật về false ngay giữa lúc màn kết
// quả đang cần nói bằng giọng thi vượt.
// `questions` cũng đi THEO LƯỢT THI: đề được rút lúc bấm "Bắt đầu" và
// sống tới hết màn kết quả, nên phần điểm lại câu sai bên dưới soi đúng
// đề vừa làm chứ không phải một lượt rút mới.
type Phase =
  | { kind: 'idle' }
  | {
      kind: 'running'
      challenge: boolean
      questions: Question[]
      index: number
      responses: QuestionResponse[]
      results: boolean[]
    }
  | {
      kind: 'done'
      challenge: boolean
      questions: Question[]
      pct: number
      passed: boolean
      newlyPassed: boolean
      responses: QuestionResponse[]
      results: boolean[]
    }

export function ModuleTestPage() {
  const t = useT()
  const { moduleId } = useParams()
  const module = moduleId !== undefined ? findModule(moduleId) : null
  const completedLessons = useProgress((s) => s.completedLessons)
  const passedModules = useProgress((s) => s.passedModules)
  const masteryScores = useProgress((s) => s.masteryScores)
  const recordMasteryAttempt = useProgress((s) => s.recordMasteryAttempt)
  const recordChallengeAttempt = useProgress((s) => s.recordChallengeAttempt)
  // Sổ "mình nghĩ câu này đúng" — câu của BÀI THI không thuộc bài học nào
  // nên lessonId để trống; trang Hồ sơ hiểu chỗ trống đó là "câu đề thi"
  // và không dựng link mở bài.
  const reportDisputed = useProgress((s) => s.reportDisputedAnswer)
  const disputed = useProgress((s) => s.disputedAnswers)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' })

  // Đề không tồn tại thì chưa biết về đâu — chỉ ca này mới về đầu trang.
  const backLink = (
    <Link to={module === null ? '/' : backToLearn(module.id)} className="text-sm font-medium text-accent hover:underline">
      {t('lesson.backToLearn')}
    </Link>
  )

  if (module === null) {
    return <EmptyState icon={ChevronLeft} title={t('lesson.notFound')} body="" action={backLink} />
  }

  const allModules = loadModules()
  const statuses = computeModuleStatuses(
    allModules.map((m) => m.id),
    new Set(passedModules),
  )
  // Module CUỐI của lộ trình không có "module sau" để mở — hứa hẹn một
  // module không tồn tại đúng vào lúc người học vừa kết thúc cả khóa là
  // lời nói dối, và nó rơi trúng khoảnh khắc peak-end (spec 2.1 bước 6).
  // Suy từ dữ liệu, không đếm cứng số module.
  const isFinalModule = allModules.at(-1)?.id === module.id
  // Mốc tốt nghiệp (nếu module này là cửa của một mốc) — nút hiện ở màn ĐẬU.
  const gradMilestone = milestoneOfModule(module.id)

  // Thi sau khi học hết bài trong module — bài thi lấy chất liệu từ đó.
  const allLessonsDone = lessonsInOrder(module).every((l) => completedLessons[l.id] !== undefined)
  // Chế độ vượt chỉ SỐNG khi nó còn nghĩa: chưa học hết bài trong module.
  // Học xong rồi thì rơi về đường thi thường (cùng đề, cùng ngưỡng).
  const challenge = searchParams.get('vuot') === '1' && !allLessonsDone
  // Cửa chỉ xét lúc CHƯA vào thi. Nộp xong là lượt vượt bị tiêu, `challenge`
  // lật về false ngay — xét lại ở đây thì màn kết quả biến mất trước mắt
  // người vừa thi xong.
  const gateOpen = challenge || phase.kind !== 'idle'
  // Module đang khóa vào được BẰNG ĐÚNG cửa vượt (chốt 08-08) — đường
  // thi thường vẫn khóa như cũ.
  if (statuses[module.id] === 'locked' && !gateOpen) {
    return <EmptyState icon={Lock} title={t('test.lockedTitle')} body="" action={backLink} />
  }
  if (!allLessonsDone && !gateOpen) {
    return <EmptyState icon={GraduationCap} title={t('test.notReadyTitle')} body={t('test.notReadyBody')} action={backLink} />
  }

  // `masteryTest` là POOL của module; một lượt thi chỉ hỏi một đề con.
  const pool = module.masteryTest
  const drawCount = masteryDrawCount(pool)
  const best = masteryScores[module.id]
  const runIsChallenge = phase.kind === 'idle' ? challenge : phase.challenge

  // Vượt xong module này mà module sau cũng vượt được thì mời đi tiếp
  // NGAY TẠI ĐÂY: người biết sẵn năm module đầu không phải năm lần quay
  // về trang Học cuộn tìm. Mỗi module vẫn là một bài thi riêng — chuỗi
  // này chỉ bỏ quãng đường đi bộ, không bỏ phép đo nào.
  const nextModule = allModules[allModules.findIndex((m) => m.id === module.id) + 1]
  const nextChallengeable =
    nextModule !== undefined &&
    phase.kind === 'done' &&
    phase.challenge &&
    phase.passed &&
    canChallengeModule({
      // `statuses` tính lại mỗi lần render từ passedModules, nên ngay sau
      // khi đậu nó đã thấy module sau chuyển sang 'open'.
      status: statuses[nextModule.id],
      lessonIds: lessonsInOrder(nextModule).map((l) => l.id),
      completedLessons,
      moduleId: nextModule.id,
    })

  const heading = (
    <div className="mb-6 flex flex-col gap-2">
      <Link
        to={backToLearn(module.id)}
        className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink"
      >
        <ChevronLeft size={14} aria-hidden />
        {t('lesson.backToLearn')}
      </Link>
      <h1 className="text-xl font-bold text-ink">
        {t(runIsChallenge ? 'test.challengeTitle' : 'test.title')} — {lt(module.title)}
      </h1>
    </div>
  )

  if (phase.kind === 'idle') {
    return (
      <>
        {heading}
        <div className="flex max-w-lg flex-col gap-5">
          <p className="text-sm leading-relaxed text-ink-muted">
            {challenge
              ? t('test.challengeIntro', { count: drawCount, threshold: MASTERY_THRESHOLD_PCT })
              : t(isFinalModule ? 'test.introFinal' : 'test.intro', {
                  count: drawCount,
                  threshold: MASTERY_THRESHOLD_PCT,
                })}
          </p>
          {challenge && <p className="text-sm font-semibold text-warn">{t('test.challengeOneShot')}</p>}
          {best !== undefined && (
            <p className="font-mono text-sm font-semibold text-ink">{t('test.bestScore', { pct: Math.round(best) })}</p>
          )}
          <div>
            <Button
              onClick={() =>
                setPhase({
                  kind: 'running',
                  challenge,
                  questions: drawMasteryTest(pool),
                  index: 0,
                  responses: [],
                  results: [],
                })
              }
            >
              {t(challenge ? 'test.challengeStart' : 'test.start')}
            </Button>
          </div>
        </div>
      </>
    )
  }

  if (phase.kind === 'running') {
    const question = phase.questions[phase.index]
    if (question === undefined) return null

    const submit = (response: QuestionResponse) => {
      const correct = gradeQuestion(question, response)
      const responses = [...phase.responses, response]
      const results = [...phase.results, correct]
      if (phase.index + 1 < phase.questions.length) {
        setPhase({ ...phase, index: phase.index + 1, responses, results })
        return
      }
      const orderedIds = allModules.map((m) => m.id)
      const outcome = phase.challenge
        ? recordChallengeAttempt(module, results, orderedIds)
        : recordMasteryAttempt(module, results, orderedIds)
      // Đậu module là mốc LỚN NHẤT của app (cửa mastery 85%) — nó có
      // tiếng riêng, không dùng chung với tiếng lên chặng nữa (kho ý
      // tưởng C1). Thi lại mà đã đậu từ trước thì im: mốc chỉ vang một lần.
      if (outcome.newlyPassed) playEarcon('moduleComplete')
      setPhase({
        kind: 'done',
        challenge: phase.challenge,
        questions: phase.questions,
        pct: outcome.pct,
        passed: outcome.passed,
        newlyPassed: outcome.newlyPassed,
        responses,
        results,
      })
    }

    return (
      <>
        {heading}
        <div className="mx-auto flex max-w-lg flex-col gap-4">
          <p className="text-xs font-medium text-ink-muted">
            {t('test.questionOf', { current: phase.index + 1, total: phase.questions.length })}
          </p>
          <p className="font-medium text-ink" key={question.id}>
            {lt(question.prompt)}
          </p>
          {/* examMode: bài thi không chấm sống, không gọi tên bệnh — giữ đúng lời
    hứa "không có gợi ý giữa chừng" của màn intro (cổng mastery 85%). */}
<QuestionInput question={question} onSubmit={submit} examMode />
        </div>
      </>
    )
  }

  // Kết quả — duyệt ĐÚNG ĐỀ VỪA THI, theo thứ tự đã thi.
  const wrong = phase.questions
    .map((q, i) => ({ q, response: phase.responses[i], correct: phase.results[i] === true }))
    .filter((x) => !x.correct)
  const pctRounded = Math.round(phase.pct)

  return (
    <>
      {heading}
      <div className="flex max-w-xl flex-col gap-5">
        {phase.passed && (
          <div className="flex items-start gap-3 rounded-md border border-ok/40 bg-panel px-5 py-4">
            <Award size={20} aria-hidden className="mt-0.5 shrink-0 text-ok" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-ok">
                {phase.challenge && phase.newlyPassed
                  ? t(isFinalModule ? 'test.challengePassFinal' : 'test.challengePass', { pct: pctRounded })
                  : phase.newlyPassed
                    ? t(isFinalModule ? 'test.passTitleFinal' : 'test.passTitle', { pct: pctRounded })
                    : t('test.passTitleAgain', { pct: pctRounded })}
              </p>
              {/* Vượt xong vẫn phải ôn — nói thẳng ra để người học không
                  tưởng module này biến mất khỏi đời mình (spec 2.2). */}
              {phase.challenge && phase.newlyPassed && (
                <p className="text-sm text-ink-muted">{t('test.challengePassCards')}</p>
              )}
            </div>
          </div>
        )}

        {/* THƯ CUỐI MODULE (kho ý tưởng D2): bài thi cố ý không cộng XP
            (nguyên tắc 5), nên thứ duy nhất người học nhận lúc đậu là
            đúng lá thư này — vài câu kể họ vừa làm được gì mà lúc mở
            module còn chưa làm được. Nội dung nằm trong data của từng
            module; module chưa soạn thư thì khối này vắng mặt, không có
            khung rỗng. */}
        {phase.passed && module.letter !== undefined && (
          <div className="flex items-start gap-3 rounded-md border border-edge bg-panel px-5 py-4">
            <Mail size={18} aria-hidden className="mt-0.5 shrink-0 text-accent" />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t('test.letterTitle')}</p>
              <p className="text-sm leading-relaxed text-ink">{lt(module.letter)}</p>
            </div>
          </div>
        )}

        {!phase.passed && (
          <div className="flex flex-col gap-1 rounded-md border border-warn/40 bg-panel px-5 py-4">
            <p className="font-semibold text-warn">{t('test.failTitle', { pct: pctRounded })}</p>
            <p className="text-sm text-ink-muted">
              {phase.challenge
                ? t('test.challengeFailBody', { threshold: MASTERY_THRESHOLD_PCT })
                : t(isFinalModule ? 'test.failBodyFinal' : 'test.failBody', { threshold: MASTERY_THRESHOLD_PCT })}
            </p>
          </div>
        )}

        {wrong.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{t('test.reviewTitle')}</h2>
            {wrong.map(({ q, response }) => (
              <div key={q.id} className="flex flex-col gap-2">
                <p className="text-sm font-medium text-ink">{lt(q.prompt)}</p>
                {phase.passed ? (
                  // Đã ĐẬU: đọc lại đáp án + vì sao là ôn, không còn là lỗ rò.
                  <AnswerReveal question={q} response={response} explanation={maybeLt(q.explain)} />
                ) : (
                  // Chưa đậu: chỉ Ý CẦN ÔN — trỏ hướng, không đưa đáp án.
                  <p className="rounded-md border border-edge bg-panel px-4 py-3 text-sm leading-relaxed text-ink-muted">
                    {q.hintTopic !== undefined
                      ? t('test.reviewHint', { topic: lt(q.hintTopic) })
                      : t('test.reviewHintGeneric')}
                  </p>
                )}
                {/* Khiếu nại được NGAY TẠI ĐÂY (khối 21.12): đề thi là chỗ
                    một danh sách đáp án hẹp gây thiệt hại lớn nhất — nó ăn
                    thẳng vào con số 85% của cổng mastery. Nút không đổi
                    điểm lượt thi này (điểm đã chốt lúc nộp), nó chỉ ghi
                    lại nguyên văn để người soạn bài soi lại. */}
                {q.kind === 'typed' && response?.kind === 'typed' && (
                  <DisputeButton
                    alreadyReported={disputed.some((d) => d.questionId === q.id)}
                    onReport={() => reportDisputed('', q.id, response.text)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {/* Đậu đúng module MỐC (cuối nhập môn / cuối khóa) thì mở cửa
              màn tốt nghiệp — mốc suy từ dữ liệu, thêm module là tự dời. */}
          {phase.passed && gradMilestone !== null && (
            <Button onClick={() => void navigate(`/tot-nghiep/${gradMilestone.id}`)}>
              {t('test.gradLink')}
            </Button>
          )}
          {nextChallengeable && nextModule !== undefined && (
            <Button
              onClick={() => {
                // Sang bài thi của module sau: xóa lượt cũ TRƯỚC khi đổi
                // URL, nếu không màn kết quả cũ dính lại trên đề mới.
                setPhase({ kind: 'idle' })
                void navigate(`/kiem-tra/${nextModule.id}?vuot=1`)
              }}
            >
              {t('test.challengeNext', { module: lt(nextModule.title) })}
            </Button>
          )}
          {/* Rớt thì thi lại được, kể cả lượt VƯỢT — và thi lại GIỮ NGUYÊN
              chế độ của lượt vừa rồi: vượt hụt mà nhảy sang đường mastery
              thường là ghi điểm cho module chưa học xong bài nào. */}
          {!phase.passed && (
            <Button
              onClick={() =>
                setPhase({
                  kind: 'running',
                  challenge: phase.challenge,
                  // Thi lại là RÚT ĐỀ MỚI — thi lại đúng đề vừa đọc ý cần
                  // ôn xong thì con số 85% chỉ còn đo trí nhớ về đề.
                  questions: drawMasteryTest(pool),
                  index: 0,
                  responses: [],
                  results: [],
                })
              }
            >
              {t('test.retake')}
            </Button>
          )}
          {backLink}
        </div>
      </div>
    </>
  )
}
