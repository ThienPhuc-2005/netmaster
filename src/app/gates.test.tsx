// @vitest-environment jsdom
// Hai cánh cổng điều hướng — vùng từng có bug thật (StrictMode render
// đôi nuốt mất <Navigate>) và cho tới hôm nay chưa test nào với tới.
//
// Ba lời hứa được khóa ở đây:
//   1. Người học MỚI thấy onboarding trước mọi thứ (spec 4.5), kể cả khi
//      hộp ôn tập đang có thẻ đến hạn.
//   2. Mở app mà còn thẻ đến hạn → vào Ôn tập TRƯỚC (spec 2.2).
//   3. Luật đó chỉ áp cho lần điều hướng ĐẦU của phiên: ôn xong quay về
//      trang Học thì không bị đá ngược lại — đúng cái vòng lặp mà cờ
//      openedIntoReview sinh ra để chặn.
//
// Chạy dưới StrictMode như app thật: render đôi mà quyết định vẫn đúng
// thì mới gọi là qua.

import { StrictMode } from 'react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { AppGate, LearnIndexGate, resetSessionGatesForTest } from './gates'
import { todayIso, useProgress } from '../store/progress'
import { createCard } from '../engine/sm2'

const INITIAL = useProgress.getInitialState()

/** Dựng app thu nhỏ đúng hình dạng router thật: AppGate bọc index gate. */
function renderApp(initialPath = '/') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppGate />,
        children: [
          { index: true, element: <LearnIndexGate /> },
          { path: 'on-tap', element: <p>màn ôn tập</p> },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  )
  return render(
    <StrictMode>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
      </LazyMotion>
    </StrictMode>,
  )
}

/** Một thẻ đến hạn HÔM NAY — nguyên liệu của luật "ôn trước". */
function dueCardToday() {
  return { ...createCard('goi-tin', 'module-1', todayIso()), dueDate: todayIso() }
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
  resetSessionGatesForTest()
})
afterEach(cleanup)

describe('AppGate — onboarding đứng trước mọi thứ', () => {
  it('hồ sơ trắng: thấy onboarding, KHÔNG thấy khung 4 tab', async () => {
    useProgress.setState({ onboardingDone: false })
    renderApp()
    expect(await screen.findByRole('button', { name: /Gửi gói tin/ })).toBeTruthy()
    expect(screen.queryByRole('navigation'), 'chưa xong onboarding mà đã hiện menu').toBeNull()
  })

  it('người mới CÓ thẻ đến hạn vẫn thấy onboarding trước, không bị đá sang Ôn tập', () => {
    // Thứ tự hai luật: aha moment (spec 4.5) đứng TRƯỚC luật ôn-trước
    // (spec 2.2). Đảo lại là người vừa cài app rơi thẳng vào phiên ôn
    // những thẻ mình chưa từng học.
    useProgress.setState({ onboardingDone: false, reviewCards: [dueCardToday()], lastReviewDate: null })
    renderApp()
    expect(screen.queryByText('màn ôn tập')).toBeNull()
  })
})

describe('LearnIndexGate — mở app là ôn trước (spec 2.2)', () => {
  it('còn thẻ đến hạn và hôm nay chưa ôn → vào thẳng Ôn tập', async () => {
    useProgress.setState({
      onboardingDone: true,
      reviewCards: [dueCardToday()],
      lastReviewDate: null,
    })
    renderApp()
    expect(await screen.findByText('màn ôn tập')).toBeTruthy()
  })

  it('hôm nay đã ôn rồi → vào thẳng trang Học', async () => {
    useProgress.setState({
      onboardingDone: true,
      reviewCards: [dueCardToday()],
      lastReviewDate: todayIso(),
    })
    renderApp()
    expect(await screen.findByRole('navigation')).toBeTruthy()
    expect(screen.queryByText('màn ôn tập')).toBeNull()
  })

  it('không thẻ nào đến hạn → vào thẳng trang Học', async () => {
    useProgress.setState({ onboardingDone: true, reviewCards: [], lastReviewDate: null })
    renderApp()
    expect(await screen.findByRole('navigation')).toBeTruthy()
    expect(screen.queryByText('màn ôn tập')).toBeNull()
  })

  it('đã bị đưa vào Ôn tập một lần thì lần sau về trang Học được (không kẹt vòng)', async () => {
    // Cờ openedIntoReview chính là thứ ngăn "ôn xong bấm Học → bị đá lại
    // Ôn tập → mãi không ra". Test đi đúng đường đó: lượt đầu vào ôn,
    // lượt sau (cùng phiên app, thẻ vẫn đến hạn) phải ở lại trang Học.
    useProgress.setState({ onboardingDone: true, reviewCards: [dueCardToday()], lastReviewDate: null })
    renderApp()
    expect(await screen.findByText('màn ôn tập')).toBeTruthy()
    cleanup()

    renderApp()
    expect(await screen.findByRole('navigation')).toBeTruthy()
    expect(screen.queryByText('màn ôn tập')).toBeNull()
  })
})
