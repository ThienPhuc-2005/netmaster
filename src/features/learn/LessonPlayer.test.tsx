// @vitest-environment jsdom
// Test end-to-end LessonPlayer trên NỘI DUNG THẬT (content/modules):
// đi trọn pipeline 6 bước của bài đầu Module 1 bằng đúng thao tác người
// học — chốt rằng UI, machine, grading, store và luật XP/flashcard khớp
// nhau trên chính dữ liệu sẽ ship.

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { LessonPlayer } from './LessonPlayer'
import { loadModules, lessonsInOrder } from '../../content'
import { startLesson } from '../../engine/lessonMachine'
import { useProgress, todayIso } from '../../store/progress'
import { praiseKeyFor, type PraiseSignal } from '../../engine/praise'
import { translate } from '../../i18n'

const INITIAL = useProgress.getInitialState()

/** Dấu vết của một câu gõ tay làm đúng ngay lần đầu ở bước Thử tay. */
const FIRST_TRY: PraiseSignal = { failCount: 0, usedSolution: false, step: 'practice', kind: 'typed' }

function renderLesson(lessonId: string) {
  const router = createMemoryRouter(
    [
      { path: '/bai/:lessonId', element: <LessonPlayer /> },
      { path: '/', element: <p>trang học</p> },
      { path: '/on-tap', element: <p>trang ôn</p> },
    ],
    { initialEntries: [`/bai/${lessonId}`] },
  )
  return render(<RouterProvider router={router} />)
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

function typeAnswer(value: string) {
  fireEvent.change(screen.getByPlaceholderText('Gõ câu trả lời của bạn…'), { target: { value } })
  fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
}

function clickContinue() {
  fireEvent.click(screen.getByRole('button', { name: /Tiếp tục/ }))
}

/** Đi tới phần tự giải thích của m1-bai-1 (đã giải xong câu nhớ lại). */
function walkToSelfExplain() {
  renderLesson('m1-bai-1')
  fireEvent.click(screen.getByRole('button', { name: /Bắt đầu/ }))
  fireEvent.click(screen.getByRole('button', { name: /Bị chia thành nhiều gói nhỏ/ }))
  clickContinue() // pretest → teach (1 màn)
  clickContinue() // teach → practice
  typeAnswer('gói tin')
  clickContinue() // đóng màn đáp án câu 1
  fireEvent.click(screen.getByRole('button', { name: /Chỉ gửi lại đúng gói bị thất lạc/ }))
  clickContinue() // đóng màn đáp án câu 2
  clickContinue() // practice → retrieval
  typeAnswer('gói tin')
  clickContinue() // đóng màn đáp án → hiện tự giải thích
}

describe('LessonPlayer — đi trọn bài đầu Module 1 (nội dung thật)', () => {
  it('hook → pretest → khám phá → thử tay → nhớ lại → tổng kết → XP + thẻ ôn', () => {
    renderLesson('m1-bai-1')

    // Bước 1 — Hook: câu chuyện gửi ảnh cho Mai
    expect(screen.getByText(/không hề đi "nguyên tấm"/)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Bắt đầu/ }))

    // Bước 2 — Pretest: đoán SAI vẫn đi tiếp; luôn thấy đáp án + vì sao
    fireEvent.click(screen.getByRole('button', { name: /Đi nguyên tấm tới máy Mai/ }))
    expect(screen.getByText(/não bạn vừa được "mồi"/)).toBeTruthy()
    expect(screen.getByText(/^Đáp án/)).toBeTruthy()
    expect(screen.getByText(/mỗi gói tự mang địa chỉ/)).toBeTruthy()
    clickContinue()

    // Bước 3 — Khám phá: 1 khái niệm / màn (Packet)
    expect(screen.getByText('Màn 1/1')).toBeTruthy()
    expect(screen.getByText('Packet')).toBeTruthy()
    clickContinue()

    // Bước 4 — Thử tay: có ví dụ giải sẵn (bài đầu, fading 0)
    expect(screen.getByText(/Ví dụ giải sẵn/)).toBeTruthy()
    typeAnswer('sai bét')
    expect(screen.getByText(/Gần rồi — nghĩ lại về/)).toBeTruthy()
    expect(document.body.textContent).not.toMatch(/\bSAI\b/)
    typeAnswer('goi tin') // thiếu dấu vẫn chấm đúng
    expect(screen.getByText(/Câu trả lời của bạn/)).toBeTruthy()
    clickContinue()
    fireEvent.click(screen.getByRole('button', { name: /Chỉ gửi lại đúng gói bị thất lạc/ }))
    clickContinue()
    clickContinue() // sang Nhớ lại

    // Bước 5 — Nhớ lại
    typeAnswer('gói tin')
    clickContinue()
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Vì chia nhỏ thì khi thất lạc chỉ cần gửi lại đúng gói đó.' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
    expect(screen.getByText(/tự giải thích được rồi/)).toBeTruthy()
    expect(screen.getByText(/Đối chiếu với giải thích mẫu/i)).toBeTruthy()
    clickContinue()

    // Bước 6 — Tổng kết
    expect(screen.getByText('Hôm nay bạn học được')).toBeTruthy()
    expect(screen.getByText('+30 XP')).toBeTruthy()
    // Nút chính giờ đi THẲNG bài sau; "Về trang Học" là nút phụ.
    expect(screen.getByRole('button', { name: /Học bài tiếp theo/ })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Về trang Học/ }))

    expect(screen.getByText('trang học')).toBeTruthy()
    const st = useProgress.getState()
    expect(st.xpTotal).toBe(30)
    expect(st.completedLessons['m1-bai-1']).toBeTruthy()
    expect(st.reviewCards.map((c) => c.conceptId)).toEqual(['goi-tin'])
    expect(st.streak.current).toBe(1)
  })

  it('không có nút nào nhảy bước: ở pretest chưa trả lời thì không có "Tiếp tục"', () => {
    renderLesson('m1-bai-1')
    fireEvent.click(screen.getByRole('button', { name: /Bắt đầu/ }))
    expect(screen.queryByRole('button', { name: /Tiếp tục/ })).toBeNull()
  })

  it('bài chưa mở (gõ URL trực tiếp) → màn khóa, không dựng runtime', () => {
    renderLesson('m1-bai-2')
    expect(screen.getByText(/Học xong bài trước sẽ mở bài này/)).toBeTruthy()
    expect(useProgress.getState().lessonRuntimes['m1-bai-2']).toBeUndefined()
  })
})

describe('khen đúng việc (kho ý tưởng D1)', () => {
  // Lời khen phải đọc ra HÀNH VI, không phải chỉ đúng/sai: cùng một câu,
  // người ra ngay và người sai rồi tự sửa xứng đáng nghe hai câu khác
  // nhau. Test đi thật hai đường đó trên cùng một câu của bài đầu.
  function toFirstPractice() {
    renderLesson('m1-bai-1')
    fireEvent.click(screen.getByRole('button', { name: /Bắt đầu/ }))
    fireEvent.click(screen.getByRole('button', { name: /Bị chia thành nhiều gói nhỏ/ }))
    clickContinue()
    clickContinue()
  }

  it('đúng ngay lần đầu: khen chuyện nắm chắc', () => {
    toFirstPractice()
    typeAnswer('gói tin')
    // Hạt giống xoay câu khen là số câu đã trả lời — đọc từ store chứ
    // không đoán, để test không vỡ khi bài có thêm câu ở bước trước.
    const seed = useProgress.getState().answerTotal
    expect(screen.getByText(translate('vi', praiseKeyFor(FIRST_TRY, seed)))).toBeTruthy()
  })

  it('sai rồi tự sửa: khen chuyện TỰ SỬA, không khen "đúng ngay"', () => {
    toFirstPractice()
    typeAnswer('không biết')
    typeAnswer('gói tin')
    const seed = useProgress.getState().answerTotal
    expect(screen.getByText(translate('vi', praiseKeyFor({ ...FIRST_TRY, failCount: 1 }, seed)))).toBeTruthy()
    expect(screen.queryByText(translate('vi', praiseKeyFor(FIRST_TRY, seed)))).toBeNull()
  })
})

describe('tự giải thích — ghim bug "do bảo mật"', () => {
  it('câu không chứa ý nào → rơi vào tầng gợi ý, KHÔNG BAO GIỜ được khen', () => {
    walkToSelfExplain()
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'do bảo mật' } })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))

    expect(screen.queryByText(/tự giải thích được rồi/)).toBeNull()
    expect(screen.queryByText(/Đối chiếu với giải thích mẫu/i)).toBeNull()
    expect(screen.getByText(/nói thêm về: chia nhỏ, gửi lại/)).toBeTruthy()
    const se = useProgress.getState().lessonRuntimes['m1-bai-1']?.selfExplain
    expect(se).toMatchObject({ attempts: 1, passed: false, done: false })
  })

  it('thiếu 1 ý → nhắc đúng ý còn thiếu (tầng 2)', () => {
    walkToSelfExplain()
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'vì phải chia nhỏ dữ liệu' } })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
    expect(screen.getByText(/nói thêm về: gửi lại/)).toBeTruthy()
  })
})

describe('quay lại CHỈ-ĐỌC', () => {
  it('bước Khám phá nhiều màn: lùi xem không đổi tiến độ (bài 2 màn của Module 2)', () => {
    // Đường tắt hợp lệ cho test: đánh dấu thẳng tiến độ để mở m2-bai-4
    // (bài duy nhất dạy 2 khái niệm trong Phần A hiện tại).
    const modules = loadModules()
    const m1 = modules[0]!
    const m2 = modules[1]!
    const done: Record<string, string> = {}
    for (const l of lessonsInOrder(m1)) done[l.id] = todayIso()
    for (const l of lessonsInOrder(m2).slice(0, 3)) done[l.id] = todayIso()
    useProgress.setState({ completedLessons: done, passedModules: [m1.id] })

    renderLesson('m2-bai-4')
    fireEvent.click(screen.getByRole('button', { name: /Bắt đầu/ }))
    // trả lời pretest (mcq — bấm lựa chọn đầu, đúng sai không quan trọng)
    const choices = screen.getAllByRole('button').filter((b) => b.className.includes('text-left'))
    fireEvent.click(choices[0]!)
    clickContinue() // → teach màn 1
    expect(screen.getByText('Màn 1/2')).toBeTruthy()
    clickContinue() // → màn 2
    expect(screen.getByText('Màn 2/2')).toBeTruthy()

    const before = useProgress.getState().lessonRuntimes['m2-bai-4']
    fireEvent.click(screen.getByRole('button', { name: /Màn trước/ }))
    expect(screen.getByText('Màn 1/2')).toBeTruthy()
    expect(useProgress.getState().lessonRuntimes['m2-bai-4']).toEqual(before)
    clickContinue() // tiến lại trong vùng đã đọc — vẫn không đổi store
    expect(screen.getByText('Màn 2/2')).toBeTruthy()
    expect(useProgress.getState().lessonRuntimes['m2-bai-4']).toEqual(before)
  })

  it('xem lại câu đã làm: thấy đề + câu trả lời + đáp án, state chấm/XP giữ nguyên', () => {
    renderLesson('m1-bai-1')
    fireEvent.click(screen.getByRole('button', { name: /Bắt đầu/ }))
    fireEvent.click(screen.getByRole('button', { name: /Bị chia thành nhiều gói nhỏ/ }))
    clickContinue()
    clickContinue() // → practice
    typeAnswer('goi tin')
    clickContinue() // đóng màn đáp án → còn câu 2 + danh sách xem lại

    const stateBefore = useProgress.getState()
    const xpBefore = stateBefore.xpTotal
    const runtimeBefore = stateBefore.lessonRuntimes['m1-bai-1']

    fireEvent.click(screen.getByText('Xem lại câu đã làm').parentElement!.querySelector('summary')!)
    expect(screen.getByText(/Câu trả lời của bạn/)).toBeTruthy()
    expect(screen.getByText('goi tin')).toBeTruthy()

    const stateAfter = useProgress.getState()
    expect(stateAfter.xpTotal).toBe(xpBefore)
    expect(stateAfter.lessonRuntimes['m1-bai-1']).toEqual(runtimeBefore)
    expect(stateAfter.answerHistory).toEqual(stateBefore.answerHistory)
  })
})

// ---------------------------------------------------------------
// Cuối bài đi THẲNG việc kế tiếp (khối 21.4 — lớp 1)
// ---------------------------------------------------------------

describe('màn tổng kết trỏ thẳng tới việc kế tiếp', () => {
  /** Đưa runtime của một bài tới màn tổng kết mà không phải bấm 6 bước. */
  function atSummary(lessonId: string) {
    const lesson = loadModules()
      .flatMap((m) => m.lessons)
      .find((l) => l.id === lessonId)!
    const base = startLesson(lesson)
    const exercises = Object.fromEntries(
      Object.keys(base.exercises).map((id) => [id, { failCount: 0, solved: true, usedSolution: false }]),
    )
    useProgress.setState(
      {
        lessonRuntimes: {
          [lessonId]: {
            ...base,
            exercises,
            stepIndex: 5,
            selfExplain: { attempts: 0, passed: true, done: true },
          },
        },
      },
      false,
    )
  }

  it('còn bài trong module: nút chính vào THẲNG bài sau, không vòng qua trang Học', () => {
    atSummary('m1-bai-1')
    renderLesson('m1-bai-1')
    fireEvent.click(screen.getByRole('button', { name: /Học bài tiếp theo/ }))
    // Đã sang bài 2 (tựa bài 2 hiện ra), không thấy "trang học".
    expect(screen.queryByText('trang học')).toBeNull()
    expect(useProgress.getState().completedLessons['m1-bai-1'], 'vẫn phải ghi nhận xong bài').toBeTruthy()
  })

  it('bài CUỐI module: nút chính mời đi thi, không mời bài sau', () => {
    const m1 = loadModules()[0]!
    const ids = lessonsInOrder(m1).map((l) => l.id)
    useProgress.setState(
      { completedLessons: Object.fromEntries(ids.slice(0, -1).map((id) => [id, todayIso()])) },
      false,
    )
    atSummary(ids.at(-1)!)
    renderLesson(ids.at(-1)!)
    expect(screen.getByRole('button', { name: /Vào thi cuối module/ })).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Học bài tiếp theo/ })).toBeNull()
  })

  it('nợ ôn VƯỢT TRẦN: mời trả nợ chứ không mời học tiếp (cửa bài mới đang khóa)', () => {
    useProgress.setState(
      {
        reviewCards: Array.from({ length: 31 }, (_, i) => ({
          conceptId: `c-${i}`,
          moduleId: 'module-1',
          intervalIndex: 0 as const,
          dueDate: '2020-01-01',
          lapses: 0,
          createdOn: '2020-01-01',
          lastReviewedOn: null,
        })),
      },
      false,
    )
    atSummary('m1-bai-1')
    renderLesson('m1-bai-1')
    expect(screen.getByRole('button', { name: /Trả nợ ôn tập/ })).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Học bài tiếp theo/ })).toBeNull()
  })

  it('luôn còn lối về trang Học — nút chính không được nuốt mất đường lui', () => {
    atSummary('m1-bai-1')
    renderLesson('m1-bai-1')
    fireEvent.click(screen.getByRole('button', { name: /Về trang Học/ }))
    expect(screen.getByText('trang học')).toBeTruthy()
  })
})

describe('nút "mình nghĩ câu này đúng" (khối 21.11)', () => {
  /** Tới câu gõ tay đầu tiên của bước Thử tay, bài 1 Module 1. */
  function toFirstTypedQuestion() {
    renderLesson('m1-bai-1')
    fireEvent.click(screen.getByRole('button', { name: /Bắt đầu/ }))
    fireEvent.click(screen.getByRole('button', { name: /Bị chia thành nhiều gói nhỏ/ }))
    clickContinue()
    clickContinue()
  }

  it('chỉ hiện SAU khi bị chấm là chưa đúng, không mời sẵn trước khi trả lời', () => {
    toFirstTypedQuestion()
    expect(screen.queryByRole('button', { name: /Mình nghĩ câu này đúng/ })).toBeNull()
    typeAnswer('một câu chưa đúng')
    expect(screen.getByRole('button', { name: /Mình nghĩ câu này đúng/ })).toBeTruthy()
  })

  it('bấm thì GHI LẠI nguyên văn câu vừa gõ, nhưng KHÔNG tính là đúng và không cộng gì', () => {
    toFirstTypedQuestion()
    typeAnswer('cái phong bì ấy')
    const before = useProgress.getState()

    fireEvent.click(screen.getByRole('button', { name: /Mình nghĩ câu này đúng/ }))

    const after = useProgress.getState()
    expect(after.disputedAnswers).toHaveLength(1)
    expect(after.disputedAnswers[0]!.answer).toBe('cái phong bì ấy')
    expect(after.disputedAnswers[0]!.lessonId).toBe('m1-bai-1')
    // Câu VẪN chưa xong, XP vẫn vậy: nút này không phải cửa qua bài.
    expect(after.xpTotal).toBe(before.xpTotal)
    const runtime = after.lessonRuntimes['m1-bai-1']!
    expect(Object.values(runtime.exercises).some((e) => e.solved)).toBe(false)
    // ...và lời xác nhận phải nói thẳng điều đó ra.
    expect(screen.getByText(/vẫn chưa được tính là đúng/)).toBeTruthy()
  })

  it('bấm hai lần không đẻ ra hai dòng', () => {
    toFirstTypedQuestion()
    typeAnswer('cái phong bì ấy')
    fireEvent.click(screen.getByRole('button', { name: /Mình nghĩ câu này đúng/ }))
    expect(useProgress.getState().reportDisputedAnswer('m1-bai-1', 'm1-b1-prac-1', 'lần nữa')).toBe(false)
    expect(useProgress.getState().disputedAnswers).toHaveLength(1)
  })
})
