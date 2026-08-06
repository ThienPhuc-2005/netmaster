// @vitest-environment jsdom
// Flow engine cắm vào pipeline — trên NỘI DUNG THẬT.
//
// Ba lời hứa được khóa ở đây:
//   1. Thắng thế (> 90%): câu trắc nghiệm trong bài hiện thành ô GÕ TAY,
//      chấm đúng bằng chữ của lựa chọn đúng, trạng thái/XP y như cũ.
//   2. Đuối (< 60%): bài MỚI phải đi qua phiên củng cố nền — bắt buộc,
//      không nút bỏ qua; đi hết thẻ thì vào bài; có thời gian nguội.
//   3. `lessonMachine.ts` không sửa dòng nào — mọi chuyện là cách render
//      và cách chấm ở tầng ngoài.

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { LessonPlayer } from './LessonPlayer'
import { useProgress, todayIso } from '../../store/progress'
import type { AnswerRecord } from '../../engine/types'

const INITIAL = useProgress.getInitialState()

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

/** Cửa sổ 10 câu với k câu đúng. */
function history(k: number): AnswerRecord[] {
  return Array.from({ length: 10 }, (_, i) => ({ correct: i < k, at: i }))
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

describe('support: phiên củng cố nền chặn cửa bài mới', () => {
  it('tụt dưới 60% → bài mới mở ra là thẻ nền, không phải bài học', () => {
    useProgress.setState({
      answerHistory: history(4),
      answerTotal: 10,
      completedLessons: { 'm1-bai-1': todayIso() },
    })
    renderLesson('m1-bai-2')
    expect(screen.getByText('Nhặt lại vài viên gạch nền đã')).toBeDefined()
    // Không có nút bỏ qua — đường duy nhất là đi hết thẻ.
    expect(screen.queryByRole('button', { name: /Bỏ qua/ })).toBeNull()
    // Bài học chưa được khởi tạo.
    expect(useProgress.getState().lessonRuntimes['m1-bai-2']).toBeUndefined()
  })

  it('đi hết thẻ → vào bài; thời gian nguội ghi lại; bài dở dang không bị cắt ngang', () => {
    useProgress.setState({
      answerHistory: history(4),
      answerTotal: 10,
      completedLessons: { 'm1-bai-1': todayIso() },
    })
    renderLesson('m1-bai-2')

    // Lật hết từng thẻ: Hiện đáp án → Thẻ tiếp/Vào bài học.
    for (let guard = 0; guard < 12; guard += 1) {
      const reveal = screen.queryByRole('button', { name: /Hiện đáp án/ })
      if (reveal === null) break
      fireEvent.click(reveal)
      const enter = screen.queryByRole('button', { name: /Vào bài học/ })
      fireEvent.click(enter ?? screen.getByRole('button', { name: /Thẻ tiếp/ }))
    }

    // Vào tới bài thật (bước Hook có nút Bắt đầu), mốc nguội đã ghi.
    expect(screen.getByRole('button', { name: /Bắt đầu/ })).toBeDefined()
    expect(useProgress.getState().supportShownAtTotal).toBe(10)
    // KHÔNG cộng XP, KHÔNG sinh thẻ SM-2 từ phiên củng cố.
    expect(useProgress.getState().xpTotal).toBe(0)
    expect(useProgress.getState().reviewCards).toHaveLength(0)

    // Mở lại cùng bài (đang dở) — không bị chèn lần nữa dù điểm vẫn thấp.
    cleanup()
    renderLesson('m1-bai-2')
    expect(screen.queryByText('Nhặt lại vài viên gạch nền đã')).toBeNull()
  })

  it('bài ĐẦU Module 1 không có nền để ôn → đi thẳng vào bài, không kẹt màn trống', () => {
    useProgress.setState({ answerHistory: history(4), answerTotal: 10 })
    renderLesson('m1-bai-1')
    expect(screen.getByRole('button', { name: /Bắt đầu/ })).toBeDefined()
    // Vẫn ghi mốc nguội để không thử chèn lại liên tục.
    expect(useProgress.getState().supportShownAtTotal).toBe(10)
  })

  it('60-90% (vùng flow) thì không chèn gì', () => {
    useProgress.setState({
      answerHistory: history(7),
      answerTotal: 10,
      completedLessons: { 'm1-bai-1': todayIso() },
    })
    renderLesson('m1-bai-2')
    expect(screen.queryByText('Nhặt lại vài viên gạch nền đã')).toBeNull()
    expect(screen.getByRole('button', { name: /Bắt đầu/ })).toBeDefined()
  })
})

describe('harder: trắc nghiệm thành câu hỏi mở ngay trong store', () => {
  // Đường chấm là chuyện của store + gradeQuestion — kiểm không cần render:
  // câu mcq của bài thật nhận câu trả lời GÕ TAY và giải được bằng chữ
  // của lựa chọn đúng (mọi trạng thái solved/XP đi đường cũ).
  it('submitExerciseAnswer chấm bản gõ tay của câu mcq trong nội dung thật', async () => {
    const { findLesson } = await import('../../content')
    const ref = findLesson('m6-bai-2')! // practice có mcq "CNAME" (ngắn, suy được)
    const store = useProgress.getState()
    store.beginLesson(ref.lesson)
    store.advanceLesson(ref.module, ref.lesson)
    store.answerPretestQ(ref.lesson, ref.lesson.steps[1].questions[0]!.id, { kind: 'mcq', choiceIndex: 0 })
    useProgress.getState().advanceLesson(ref.module, ref.lesson)
    // đọc hết 2 màn dạy rồi qua bước Làm
    useProgress.getState().nextTeachScreen(ref.lesson)
    useProgress.getState().advanceLesson(ref.module, ref.lesson)

    // Câu 1 (typed) giải trước cho đúng thứ tự
    const q1 = ref.lesson.steps[3].exercises[0]!.question
    if (q1.kind === 'typed') {
      useProgress.getState().submitExerciseAnswer(ref.lesson, q1.id, { kind: 'typed', text: q1.accept[0]! })
    }
    // Câu 2 là mcq "CNAME" — nộp bản GÕ TAY, phải được chấm đúng
    const result = useProgress
      .getState()
      .submitExerciseAnswer(ref.lesson, 'm6-b2-pra-2', { kind: 'typed', text: 'cname' })
    expect(result.correct).toBe(true)
    expect(result.solved).toBe(true)
  })
})
