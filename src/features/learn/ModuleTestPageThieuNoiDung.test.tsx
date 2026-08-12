// @vitest-environment jsdom
// Lưới an toàn thứ hai của khối 21.49: **không gọi tên "module cuối
// khóa" khi nội dung chưa về đủ.**
//
// App giờ mở bằng khúc đầu đã tải được, nên `loadModules().at(-1)` là
// module cuối của KHÚC, không phải của khóa. Thiếu điều kiện
// `noiDungDayDu()` thì người mất mạng giữa chừng học tới module cuối
// cùng mình tải được sẽ nghe app chúc mừng "khép lại cả khóa học" —
// đúng loại nói dối rơi trúng khoảnh khắc peak-end mà file
// `ModuleTestPage.test.tsx` sinh ra để chặn.
//
// File riêng vì phải tráo `noiDungDayDu` cho CẢ file; trộn vào file kia
// là mọi test ở đó chạy trong cảnh "nội dung thiếu".

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { ModuleTestPage } from './ModuleTestPage'
import { loadModules, lessonsInOrder } from '../../content'
import { todayIso, useProgress } from '../../store/progress'

const dayDu = vi.fn<() => boolean>()

vi.mock('../../content', async (importOriginal) => {
  const thuc = await importOriginal<typeof import('../../content')>()
  return { ...thuc, noiDungDayDu: () => dayDu() }
})

const INITIAL = useProgress.getInitialState()

/** Mở màn thi của module CUỐI trong danh sách đang nạp được. */
function moManThiModuleCuoi() {
  const modules = loadModules()
  const cuoi = modules.at(-1)!
  useProgress.setState({
    passedModules: modules.slice(0, modules.length - 1).map((m) => m.id),
    completedLessons: Object.fromEntries(lessonsInOrder(cuoi).map((l) => [l.id, todayIso()])),
  })
  const router = createMemoryRouter(
    [
      { path: '/kiem-tra/:moduleId', element: <ModuleTestPage /> },
      { path: '/', element: <p>trang học</p> },
    ],
    { initialEntries: [`/kiem-tra/${cuoi.id}`] },
  )
  render(<RouterProvider router={router} />)
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

describe('"module cuối khóa" chỉ được gọi tên khi nội dung về ĐỦ', () => {
  it('nội dung CHƯA đủ: module cuối của khúc KHÔNG được hứa khép lại cả khóa', () => {
    dayDu.mockReturnValue(false)
    moManThiModuleCuoi()

    expect(
      screen.queryByText(/khép lại cả khóa học/),
      'khúc nội dung cụt mà app đã chúc mừng xong cả khóa',
    ).toBeNull()
    // Rơi về lời hứa thường: còn module sau, chỉ là chưa tải về.
    expect(screen.getByText(/mở module sau/)).toBeDefined()
  })

  it('nội dung ĐÃ đủ: vẫn nói đúng như cũ (lời hứa module cuối không bị nới)', () => {
    dayDu.mockReturnValue(true)
    moManThiModuleCuoi()

    expect(screen.getByText(/khép lại cả khóa học/)).toBeDefined()
  })
})
