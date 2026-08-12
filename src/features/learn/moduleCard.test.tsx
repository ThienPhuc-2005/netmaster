// @vitest-environment jsdom
// Thẻ module ở trang Học — ba luật rút ra từ lượt rà soát trải nghiệm
// 08-12 (mục J của kho ý tưởng), mỗi luật là một chỗ thẻ từng TỰ NÓI
// NGƯỢC hoặc tự lặp lại chính nó:
//
//   J4 — CHỈ MỘT cửa thi vượt trên mỗi thẻ. Trước đây có hai lối vào
//        cùng trỏ một đường, nhân 21 thẻ.
//   J5 — module còn KHÓA không hiện thanh tiến độ: "15%" là mốc khởi
//        đầu của thanh, mà module chưa mở bài nào thì con số đó rỗng.
//   J6 — module ĐÃ ĐẬU cũng không hiện thanh: thanh đo XP, mà đậu bằng
//        thi vượt thì không có XP nào — thanh gần rỗng đứng cạnh huy
//        hiệu "Đã đạt · 89%" là hai con số cãi nhau trên một thẻ.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { LearnPage, moduleAnchorId } from './LearnPage'
import { loadModules } from '../../content'
import { useProgress } from '../../store/progress'

const INITIAL = useProgress.getInitialState()
const modules = loadModules()
const dauTien = modules[0]!
const thuHai = modules[1]!

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
  Element.prototype.scrollIntoView = vi.fn()
})
afterEach(cleanup)

function moTrangHoc() {
  const router = createMemoryRouter([{ path: '/', element: <LearnPage /> }], { initialEntries: ['/'] })
  return render(<RouterProvider router={router} />)
}

/** Thẻ của một module trên trang — tìm theo neo mà trang tự gắn. */
function the(moduleId: string): HTMLElement {
  return document.getElementById(moduleAnchorId(moduleId))!
}

describe('J4 — mỗi thẻ chỉ một cửa thi vượt', () => {
  it('module chưa đậu: đúng MỘT đường tới cửa vượt', () => {
    moTrangHoc()
    const cua = [...the(dauTien.id).querySelectorAll('a')].filter((a) =>
      (a.getAttribute('href') ?? '').includes('vuot=1'),
    )
    expect(cua).toHaveLength(1)
  })

  it('cửa ấy vẫn nói trọn câu cho trình đọc màn hình, không chỉ hai chữ', () => {
    moTrangHoc()
    const cua = [...the(dauTien.id).querySelectorAll('a')].find((a) =>
      (a.getAttribute('href') ?? '').includes('vuot=1'),
    )!
    expect(cua.getAttribute('aria-label')).toBe('Mình biết phần này rồi — thi vượt luôn')
  })

  it('module ĐÃ ĐẬU thì không mời vượt nữa', () => {
    useProgress.setState({ passedModules: [dauTien.id], masteryScores: { [dauTien.id]: 89 } })
    moTrangHoc()
    const cua = [...the(dauTien.id).querySelectorAll('a')].filter((a) =>
      (a.getAttribute('href') ?? '').includes('vuot=1'),
    )
    expect(cua).toHaveLength(0)
  })
})

describe('J5 + J6 — thanh tiến độ chỉ nói khi nó có gì để nói', () => {
  const thanh = (moduleId: string) => within(the(moduleId)).queryByRole('progressbar')

  it('module ĐANG MỞ có thanh tiến độ', () => {
    moTrangHoc()
    expect(thanh(dauTien.id)).not.toBeNull()
  })

  it('module còn KHÓA thì KHÔNG có thanh — "15%" ở đó là con số rỗng', () => {
    moTrangHoc()
    // Module thứ hai còn khóa với người học mới tinh.
    expect(thanh(thuHai.id)).toBeNull()
  })

  it('module ĐÃ ĐẬU thì huy hiệu nói thay, không để hai con số cãi nhau', () => {
    // Đúng ca thi vượt: đậu 89% mà XP bằng 0 vì bài thi không cộng XP.
    useProgress.setState({ passedModules: [dauTien.id], masteryScores: { [dauTien.id]: 89 } })
    moTrangHoc()
    expect(thanh(dauTien.id)).toBeNull()
    expect(within(the(dauTien.id)).getByText(/Đã đạt · 89%/)).toBeTruthy()
  })
})
