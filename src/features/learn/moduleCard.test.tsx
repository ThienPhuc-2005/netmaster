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
import { todayIso, useProgress } from '../../store/progress'
import { addDays } from '../../engine/dates'

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

// Người vắng lâu quay lại (phát hiện K3, khối 21.46): app phải NÓI RA
// khoảng vắng trước khi giao việc — im lặng giả vờ như không có gì xảy
// ra là thứ khiến người ta đóng app lần nữa. Giọng là ĐÓN, không TRÁCH.
describe('K3 — thẻ Hôm nay chào người vắng lâu', () => {
  function vangTu(ngay: string) {
    useProgress.setState({
      streak: { current: 0, lastActiveDate: ngay, freezesLeft: 0, freezeMonth: ngay.slice(0, 7) },
    })
  }

  it('vắng ba tháng: nói đúng số ngày, và nói khoảng trống không phải lỗi', () => {
    vangTu(addDays(todayIso(), -94))
    moTrangHoc()
    expect(screen.getByText(/cách đây 94 ngày/)).toBeTruthy()
    expect(screen.getByText(/Khoảng trống không phải lỗ hổng/)).toBeTruthy()
  })

  it('nghỉ một tuần thì IM — dưới ngưỡng thì nói ra chỉ thành lời trách', () => {
    vangTu(addDays(todayIso(), -7))
    moTrangHoc()
    expect(screen.queryByText(/Lâu rồi không gặp/)).toBeNull()
  })

  it('người MỚI TINH không bị chào nhầm là người vắng mặt', () => {
    moTrangHoc() // streak mặc định: chưa học buổi nào
    expect(screen.queryByText(/Lâu rồi không gặp/)).toBeNull()
  })
})

// K5 + K6 (khối 21.47) — hai chỗ thẻ nói ngược với sự thật của người
// đã đậu / đã đi hết đường.
describe('K5 — module đậu bằng thi vượt: chặng chưa học KHÔNG mang ổ khóa', () => {
  it('đậu mà chưa học bài nào: chặng ghi "Chưa học", không phải "Chưa mở"', () => {
    // Đúng ca thi vượt: masteryScores có điểm, completedLessons trống.
    useProgress.setState({ passedModules: [dauTien.id], masteryScores: { [dauTien.id]: 92 } })
    moTrangHoc()
    const card = within(the(dauTien.id))
    expect(card.getAllByText('Chưa học').length).toBeGreaterThan(0)
    expect(card.queryByText('Chưa mở')).toBeNull()
  })

  it('module còn KHÓA thì vẫn là "Chưa mở" — ở đó ổ khóa nói đúng', () => {
    moTrangHoc()
    expect(within(the(thuHai.id)).getAllByText('Chưa mở').length).toBeGreaterThan(0)
  })
})

describe('K6 — hết bài rồi thì thẻ Hôm nay chỉ đường sang sân luyện', () => {
  it('đã đậu hết và không còn thẻ ôn: mời phòng khám + drill', () => {
    useProgress.setState({
      passedModules: modules.map((m) => m.id),
      masteryScores: Object.fromEntries(modules.map((m) => [m.id, 92])),
      reviewCards: [],
    })
    moTrangHoc()
    expect(screen.getByText(/Hết bài không có nghĩa là hết việc/)).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Phòng khám' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Luyện chia subnet' })).toBeTruthy()
  })

  it('người còn bài để học thì KHÔNG bị mời — họ đã có việc rồi', () => {
    moTrangHoc()
    expect(screen.queryByText(/Hết bài không có nghĩa là hết việc/)).toBeNull()
  })
})
