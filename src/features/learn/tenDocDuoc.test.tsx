// @vitest-environment jsdom
// Tên ĐỌC ĐƯỢC của các nút lặp trên trang Học (phát hiện P1, lượt rà
// soát bàn phím + trình đọc màn hình 08-12).
//
// Đo thật trên browser trước khi sửa: trang Học có 18 link đọc y hệt nhau
// ("Mình biết phần này rồi — thi vượt luôn"), 4 nút "Bắt đầu" và 3 link
// "Xem lại". Người dùng trình đọc màn hình gọi danh sách link ra thì nghe
// 18 lần cùng một câu, không cách nào biết câu nào thuộc chủ đề nào.
//
// Luật này app đã tự đặt ra từ trước ở mục "chỗ hay vấp"
// (`profile.weakGoLessonAria`: "Tựa bài đi vào tên đọc được") — chỉ là
// chưa áp cho chính trang được mở nhiều nhất.

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { LearnPage } from './LearnPage'
import { loadModules } from '../../content'
import { todayIso, useProgress } from '../../store/progress'

const INITIAL = useProgress.getInitialState()
const modules = loadModules()

function renderLearn() {
  render(
    <MemoryRouter>
      <LearnPage />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

/** Tên mà trình đọc màn hình đọc ra cho mọi nút/link đang hiện. */
function tenDocDuoc(): string[] {
  return [...document.querySelectorAll('a[href], button')].map((e) =>
    (e.getAttribute('aria-label') ?? e.textContent ?? '').trim().replace(/\s+/g, ' '),
  )
}

describe('không hai nút nào trên trang Học đọc y hệt nhau (P1)', () => {
  it('hồ sơ giữa khóa: mọi tên đọc được đều phân biệt được', () => {
    useProgress.setState({
      passedModules: modules.slice(0, 3).map((m) => m.id),
      completedLessons: { [modules[3]!.lessons[0]!.id]: todayIso() },
    })
    renderLearn()

    const dem = new Map<string, number>()
    for (const t of tenDocDuoc()) dem.set(t, (dem.get(t) ?? 0) + 1)
    const trung = [...dem].filter(([t, n]) => n > 1 && t !== '')
    expect(
      trung.map(([t, n]) => `${n}× "${t}"`),
      'nút đọc giống hệt nhau thì người dùng trình đọc màn hình không chọn được',
    ).toEqual([])
  })

  it('cửa thi vượt mang TÊN CHỦ ĐỀ trong nhãn đọc được', () => {
    useProgress.setState({ passedModules: [modules[0]!.id] })
    renderLearn()
    const ten = tenDocDuoc().filter((t) => t.includes('Thi vượt chủ đề'))
    expect(ten.length).toBeGreaterThan(0)
    // Tên chủ đề thật phải nằm trong đó, không phải một câu chung chung.
    expect(ten.some((t) => t.includes(modules[1]!.title.vi))).toBe(true)
  })

  it('nút vào bài mang TÊN BÀI trong nhãn đọc được', () => {
    useProgress.setState({ passedModules: [] })
    renderLearn()
    const dau = modules[0]!.lessons[0]!
    expect(screen.getByRole('link', { name: new RegExp(dau.missionTitle.vi) })).toBeTruthy()
  })
})
