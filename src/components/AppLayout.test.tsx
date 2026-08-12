// @vitest-environment jsdom
// Chế độ tập trung (kho ý tưởng B2) — khung app tự thu lại khi người học
// đang trong bài học hoặc bài thi.
//
// Bốn lời hứa được khóa ở đây, vì mỗi cái là một cách chế độ này có thể
// hỏng mà nhìn ảnh chụp không thấy:
//   1. Chỉ bài học / bài thi mới thu khung; các trang CHỌN ĐI ĐÂU thì không.
//   2. Bốn mục menu KHÔNG bao giờ mất — chúng là đường ra.
//   3. Tên mục menu vẫn còn trong cây trợ năng dù màn hình không in chữ.
//   4. Cụm cài đặt và hai icon liên hệ là thứ được cất đi.

import { afterEach, describe, expect, it } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { AppLayout, isFocusRoute } from './AppLayout'

function renderAt(path: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          { index: true, element: <p>trang học</p> },
          { path: 'bai/:lessonId', element: <p>màn bài học</p> },
          { path: 'kiem-tra/:moduleId', element: <p>màn bài thi</p> },
          { path: 'ho-so', element: <p>trang hồ sơ</p> },
        ],
      },
    ],
    { initialEntries: [path] },
  )
  return render(<RouterProvider router={router} />)
}

/** Khung có đang thu lại không — đọc đúng cái dấu UI dùng để quyết định. */
function frameIsFocused(): boolean {
  return document.querySelector('aside')?.getAttribute('data-focus-mode') === 'on'
}

afterEach(cleanup)

describe('isFocusRoute — đường nào được thu khung', () => {
  it('bài học và bài thi thì có', () => {
    expect(isFocusRoute('/bai/m1-bai-1')).toBe(true)
    expect(isFocusRoute('/kiem-tra/module-1')).toBe(true)
  })

  it('các trang CHỌN ĐI ĐÂU thì không — làm mờ menu ở đó là làm khó đúng việc người ta định làm', () => {
    for (const p of ['/', '/on-tap', '/phong-kham', '/ho-so', '/luyen-subnet', '/luyen-lai']) {
      expect(isFocusRoute(p), p).toBe(false)
    }
  })
})

describe('AppLayout — chế độ tập trung', () => {
  it('trang Học: khung đầy đủ, có cụm cài đặt', () => {
    renderAt('/')
    expect(frameIsFocused()).toBe(false)
    expect(screen.getByRole('button', { name: /chế độ|theme|sáng|tối/i }), 'thiếu nút đổi theme').toBeTruthy()
  })

  it('vào bài học: khung thu lại và cụm cài đặt biến mất', () => {
    renderAt('/bai/m1-bai-1')
    expect(frameIsFocused()).toBe(true)
    expect(screen.queryByRole('link', { name: /facebook/i }), 'icon liên hệ vẫn còn giữa bài học').toBeNull()
  })

  it('vào bài thi: cũng thu khung', () => {
    renderAt('/kiem-tra/module-1')
    expect(frameIsFocused()).toBe(true)
  })

  it('thu khung rồi thì BỐN mục menu vẫn còn, vẫn gọi được tên', () => {
    // Đây là lằn ranh giữa "thu gọn" và "nhốt người học trong bài": menu
    // biến mất thì trên mobile không còn đường nào ra khỏi màn hình này.
    renderAt('/bai/m1-bai-1')
    const nav = screen.getByRole('navigation')
    expect(nav.querySelectorAll('a')).toHaveLength(4)
    for (const name of ['Học', 'Ôn tập', 'Phòng khám', 'Hồ sơ']) {
      expect(screen.getByRole('link', { name: new RegExp(name) }), name).toBeTruthy()
    }
  })
})

// ĐỔI TRANG THÌ FOCUS PHẢI ĐI THEO (phát hiện P2, lượt rà soát bàn phím).
//
// Đo thật trước khi sửa: từ trang Học bấm "Bắt đầu bài mới" → sang
// /bai/... mà `document.activeElement` là <body>. Trình đọc màn hình
// không đọc chữ nào về trang vừa mở, còn người dùng bàn phím phải Tab
// lại từ đầu qua 8 nút khung mới chạm được nội dung.
describe('focus khi đổi trang', () => {
  function routerTuPath(path: string) {
    return createMemoryRouter(
      [
        {
          path: '/',
          element: <AppLayout />,
          children: [
            { index: true, element: <p>trang học</p> },
            { path: 'bai/:lessonId', element: <p>màn bài học</p> },
          ],
        },
      ],
      { initialEntries: [path] },
    )
  }

  it('mở app lần đầu thì KHÔNG giật focus — chưa ai đổi trang cả', () => {
    render(<RouterProvider router={routerTuPath('/')} />)
    expect(document.activeElement, 'giật focus ngay lúc mở app là vô cớ').toBe(document.body)
  })

  it('đi sang trang khác thì focus rời <body>, đứng vào vùng nội dung', async () => {
    const router = routerTuPath('/')
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate('/bai/m1-bai-1')
    })
    expect(document.activeElement).not.toBe(document.body)
    expect(document.activeElement?.tagName.toLowerCase()).toBe('main')
  })

  it('nếu trang MỚI đã tự nhận focus thì KHÔNG cướp lại', async () => {
    // Luật này giữ cho `useScrollToModule` còn sống: quay về trang Học có
    // `?tiep=` thì focus phải nằm ở đúng thẻ module, không phải ở <main>.
    const router = routerTuPath('/')
    render(<RouterProvider router={router} />)
    await act(async () => {
      await router.navigate('/bai/m1-bai-1')
    })
    const nut = document.createElement('button')
    document.body.appendChild(nut)
    nut.focus()
    await act(async () => {
      await router.navigate('/')
    })
    expect(document.activeElement, 'cha cướp mất focus mà con vừa nhắm').toBe(nut)
    nut.remove()
  })
})
