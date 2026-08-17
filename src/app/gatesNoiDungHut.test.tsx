// @vitest-environment jsdom
// Cổng vào app khi KHO NỘI DUNG KÉO HỤT (phát hiện L1, lượt rà soát màn
// hiếm gặp 08-12).
//
// Cảnh đời thật: mạng rớt giữa chừng, hoặc service worker cài lúc mạng
// chập chờn nên cache thiếu một trong 21 file nội dung — tầng đó cache
// theo kiểu CỐ GẮNG nên thiếu file là chuyện được phép xảy ra
// (scripts/pwa-plugin.mjs). `AppGate` chờ `primeModules()`, promise hụt
// thì trước đây cổng đứng mãi ở `return null`: MÀN TRẮNG câm, tải lại
// vẫn trắng.
//
// Hai lời hứa khoá ở đây:
//   1. Kéo hụt thì người học ĐỌC ĐƯỢC một câu, không phải nhìn màn trắng.
//   2. Bấm "Thử lại" mà mạng đã về thì vào thẳng app, không phải tải lại
//      trang (tải lại lúc mất mạng còn phải trông vào service worker).
//
// File riêng chứ không nhập chung `gates.test.tsx`: `contentReady` được
// bắn ngay lúc module gates nạp, nên muốn dựng cú hụt thì phải thay
// `primeModules` TRƯỚC lần import đó — tức phải import động.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { useProgress } from '../store/progress'

/** Cú kéo nội dung — mỗi test tự quyết nó về đích hay hụt. */
const keo = vi.fn<() => Promise<unknown>>()

/**
 * Hàm kéo THẬT của bản module đang chạy. Cần cầm nó vì `vi.resetModules()`
 * dựng một bản `src/content` mới toanh với kho rỗng — lượt "mạng đã về"
 * phải nạp thật vào đúng bản ấy, không thì `loadModules()` ngay sau đó
 * đọc kho rỗng và ném.
 */
let keoThat: () => Promise<unknown> = () => Promise.resolve([])

// Giữ nguyên mọi export thật (AppLayout/LearnPage bên dưới còn đọc nội
// dung thật), chỉ tráo đúng hàm kéo.
vi.mock('../content', async (importOriginal) => {
  const thuc = await importOriginal<typeof import('../content')>()
  keoThat = thuc.primeModules
  return { ...thuc, primeModules: () => keo() }
})

const INITIAL = useProgress.getInitialState()

async function renderApp() {
  vi.resetModules()
  const { AppGate, LearnIndexGate, resetSessionGatesForTest } = await import('./gates')
  resetSessionGatesForTest()
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppGate />,
        children: [{ index: true, element: <LearnIndexGate /> }],
      },
    ],
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
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak }, onboardingDone: true }, false)
  keo.mockReset()
  // Cú hụt được ghi lại bằng console.warn (cùng lối J1) — im tiếng trong
  // test để log không lẫn vào kết quả chạy.
  vi.spyOn(console, 'warn').mockImplementation(() => undefined)
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('AppGate — kho nội dung kéo hụt', () => {
  it('kéo hụt thì NÓI RA, không để lại màn trắng', async () => {
    keo.mockRejectedValue(new Error('Failed to fetch dynamically imported module'))
    await renderApp()

    expect(await screen.findByText(/Chưa tải được bài học về máy/)).toBeTruthy()
    // Đúng chỗ đau của L1: trước đây chỗ này là một trang trắng trơn.
    expect(document.body.textContent).not.toBe('')
    expect(screen.queryByRole('navigation'), 'chưa có nội dung mà đã mở khung app').toBeNull()
  })

  it('câu nói phải trấn an đúng thứ người học lo: tiến độ còn nguyên', async () => {
    keo.mockRejectedValue(new Error('offline'))
    await renderApp()

    expect(await screen.findByText(/Tiến độ học của bạn vẫn nằm nguyên trong máy/)).toBeTruthy()
  })

  it(
    'bấm Thử lại mà mạng đã về thì vào thẳng app, không cần tải lại trang',
    async () => {
      keo.mockRejectedValueOnce(new Error('offline'))
      await renderApp()
      const nut = await screen.findByRole('button', { name: 'Thử lại' })

      // Mạng về: lượt kéo sau nạp nội dung thật, đúng như app chạy.
      keo.mockImplementation(() => keoThat())
      nut.click()

      // Trần thời gian RIÊNG, không phải nới trần chung (khối 21.70, chữa
      // một flake có sẵn). Lượt kéo này parse THẬT cả 21 module qua zod —
      // vài trăm ms lúc máy rảnh, quá một giây lúc `npm test` chạy cùng
      // build/dev server, tức vượt trần 1000ms mặc định của findBy* và đỏ
      // oan. Đây là chờ VIỆC THẬT chứ không phải chờ một nhịp render, nên
      // cách đúng là cho nó đủ giờ, không phải mock cho nhanh: chính lời
      // hứa của test là "mạng về thì kéo lại THẬT".
      expect(await screen.findByRole('navigation', {}, { timeout: 15_000 })).toBeTruthy()
      expect(screen.queryByText(/Chưa tải được bài học về máy/)).toBeNull()
      expect(keo, 'Thử lại phải kéo lại thật, không dùng lại promise đã hụt').toHaveBeenCalledTimes(2)
    },
    20_000,
  )
})
