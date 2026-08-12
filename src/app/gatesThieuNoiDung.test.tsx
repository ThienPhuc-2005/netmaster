// @vitest-environment jsdom
// Hai lưới an toàn khi app mở bằng NỘI DUNG CHƯA ĐỦ (khối 21.49).
//
// Từ khối này app không đòi đủ 21 gói mới chịu mở nữa — về được tới đâu
// học tới đó. Cái giá là có những lúc `loadModules()` trả về một khúc
// cụt, và có hai việc trong app đọc khúc cụt đó thành "nội dung đã bị bỏ
// đi". File này khoá cả hai lại.
//
// Nặng nhất là việc thứ nhất: dọn thẻ mồ côi XOÁ HẲN thẻ khỏi hộp ôn
// tập. Chạy nó trên khúc cụt là xoá sạch lịch ôn của nửa khóa sau chỉ vì
// một lần rớt mạng — mất dữ liệu thật, và người học không hề biết mình
// vừa mất gì.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { AppGate, resetSessionGatesForTest } from './gates'
import { todayIso, useProgress } from '../store/progress'
import { createCard } from '../engine/sm2'

/** Nội dung đã về ĐỦ chưa — mỗi test tự dựng. */
const dayDu = vi.fn<() => boolean>()

vi.mock('../content', async (importOriginal) => {
  const thuc = await importOriginal<typeof import('../content')>()
  return { ...thuc, noiDungDayDu: () => dayDu() }
})

const INITIAL = useProgress.getInitialState()

/** Thẻ trỏ một khái niệm KHÔNG có trong nội dung — đúng hình dạng thẻ mồ côi. */
function theMoCoi() {
  return { ...createCard('khai-niem-khong-ton-tai', 'module-99', todayIso()), dueDate: todayIso() }
}

// CỐ Ý không `vi.resetModules()` như file gatesNoiDungHut: ở đây phải
// soi STORE sau khi cổng chạy, mà nạp lại module là cổng cầm một bản
// store khác bản test đang cầm — câu "thẻ vẫn còn nguyên" khi đó đúng
// một cách vô nghĩa, vì có ai đụng vào bản của test đâu. (Đã ăn đúng cú
// đó lúc viết file này.) File kia phải nạp lại vì nó cần dựng lại
// `contentReady`; ở đây chỉ cần tráo `noiDungDayDu`, không cần.
function renderApp() {
  resetSessionGatesForTest()
  const router = createMemoryRouter(
    [{ path: '/', element: <AppGate />, children: [{ index: true, element: <p>trang học</p> }] }],
    { initialEntries: ['/'] },
  )
  return render(
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </LazyMotion>,
  )
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState(
    { ...INITIAL, streak: { ...INITIAL.streak }, onboardingDone: true, reviewCards: [theMoCoi()] },
    false,
  )
  vi.spyOn(console, 'warn').mockImplementation(() => undefined)
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('dọn thẻ mồ côi chỉ chạy khi nội dung về ĐỦ', () => {
  it('nội dung CHƯA đủ: thẻ nằm yên trong hộp, không bị xoá', async () => {
    dayDu.mockReturnValue(false)
    renderApp()
    await screen.findByText('trang học')

    expect(
      useProgress.getState().reviewCards,
      'xoá thẻ ôn vì một gói nội dung chưa tải về = mất dữ liệu thật',
    ).toHaveLength(1)
  })

  it('nội dung ĐÃ đủ: thẻ mồ côi thật thì vẫn dọn như cũ (K1 không bị nới)', async () => {
    dayDu.mockReturnValue(true)
    renderApp()
    await screen.findByText('trang học')

    expect(useProgress.getState().reviewCards).toHaveLength(0)
  })
})
