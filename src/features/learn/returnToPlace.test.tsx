// @vitest-environment jsdom
// "Về ĐÚNG CHỖ" — mọi cửa quay lại trang Học phải mang theo địa chỉ, và
// trang Học phải đưa người ta tới đó.
//
// Vì sao khóa bằng test: trang Học dài 21 module. Một cửa quên mang địa
// chỉ là người học lại bị đổ xuống đầu trang rồi phải cuộn đi tìm chỗ
// mình vừa đứng — lỗi im lặng, không ai thấy cho tới khi dùng thật.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { LearnPage, backToLearn, moduleAnchorId } from './LearnPage'
import { loadModules } from '../../content'
import { useProgress } from '../../store/progress'

const INITIAL = useProgress.getInitialState()
const modules = loadModules()
const target = modules[2]! // một module ở GIỮA danh sách, không phải cái đầu

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
  // jsdom không có scrollIntoView — stub để bắt được lời gọi.
  Element.prototype.scrollIntoView = vi.fn()
})
afterEach(cleanup)

function renderLearn(path: string) {
  const router = createMemoryRouter([{ path: '/', element: <LearnPage /> }], { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

/** Mở khóa tới module đích để nó có một "việc kế tiếp" thật. */
function openTargetModule() {
  useProgress.setState({ passedModules: modules.slice(0, 2).map((m) => m.id) }, false)
}

describe('trang Học nhận địa chỉ và đưa người ta tới đúng chỗ', () => {
  it('không có địa chỉ thì KHÔNG tự cuộn đi đâu cả', () => {
    renderLearn('/')
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled()
  })

  it('module còn việc: nhắm thẳng VIỆC KẾ TIẾP, không phải đầu card', () => {
    // Card Module 3 cao hơn cả màn hình (12 bài) — đứng ở đầu card thì
    // bài kế vẫn nằm dưới mép dưới, đúng cái phiền cần chữa.
    openTargetModule()
    renderLearn(backToLearn(target.id))

    const card = document.getElementById(moduleAnchorId(target.id))!
    const action = card.querySelector('[data-next-action]')
    expect(action, 'module đang mở phải có một việc kế tiếp được đánh dấu').not.toBeNull()
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
    // Cuộn thôi chưa đủ: bàn phím và trình đọc màn hình không đi theo mắt.
    // Focus rơi đúng nút việc kế tiếp — chỉ còn cách một phím Enter.
    expect(document.activeElement).toBe(action)
  })

  it('module không còn việc (đang khóa) thì lấy cả card làm đích', () => {
    renderLearn(backToLearn(target.id)) // chưa mở khóa → module-3 còn khóa
    const card = document.getElementById(moduleAnchorId(target.id))
    expect(card?.querySelector('[data-next-action]')).toBeNull()
    expect(document.activeElement).toBe(card)
  })

  it('nhận cả id BÀI, không bắt nơi gọi tra ngược ra module', () => {
    const lessonId = target.lessons[0]!.id
    renderLearn(`/?tiep=${lessonId}`)
    expect(document.activeElement).toBe(document.getElementById(moduleAnchorId(target.id)))
  })

  it('địa chỉ rác thì lặng lẽ bỏ qua, không nổ và không cuộn bừa', () => {
    renderLearn('/?tiep=khong-co-that')
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled()
  })

  it('card module nhận focus được nhưng KHÔNG chen vào thứ tự Tab thường', () => {
    renderLearn('/')
    const card = document.getElementById(moduleAnchorId(target.id))
    expect(card?.getAttribute('tabindex')).toBe('-1')
  })
})

describe('mọi cửa quay lại đều mang theo địa chỉ', () => {
  it('đường về từ bài học trỏ đúng module của bài đó', () => {
    // backToLearn là đường DUY NHẤT dựng link về — khóa luôn hình dạng
    // của nó để không ai lặng lẽ quay lại viết "/" trần.
    expect(backToLearn(target.id)).toBe(`/?tiep=${target.id}`)
  })

  it('trang Học có neo cho MỌI module, không sót cái nào', () => {
    renderLearn('/')
    for (const m of modules) {
      expect(document.getElementById(moduleAnchorId(m.id)), `thiếu neo cho ${m.id}`).not.toBeNull()
    }
  })

  it('thẻ "Hôm nay" vẫn đứng đầu trang — địa chỉ không được đẩy nó đi', () => {
    renderLearn(backToLearn(target.id))
    expect(screen.getByRole('heading', { name: /Hôm nay/i })).toBeTruthy()
  })
})
