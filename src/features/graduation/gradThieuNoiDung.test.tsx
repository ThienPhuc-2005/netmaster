// @vitest-environment jsdom
// Màn tốt nghiệp TỰ KIỂM trước khi nói về cả khóa (khối 21.50).
//
// Đây là màn duy nhất còn lại đo bằng TOÀN BỘ lộ trình: bản đồ hành
// trình vẽ từng ô theo Phần, và con số "N/M module" đi thẳng vào giấy
// chứng nhận TẢI VỀ ĐƯỢC. Từ khối 21.49 app mở được bằng khúc đầu đã tải
// về, nên `loadModules()` có thể đang cụt.
//
// Hai lời hứa khoá ở đây:
//   1. Nội dung chưa đủ thì KHÔNG có mốc tốt nghiệp nào — mốc suy bằng
//      cách hỏi "module nào là module cuối", mà cuối của một khúc cụt là
//      cuối KHÚC. Người tải được 3 chủ đề đầu rồi đậu chủ đề 3 sẽ chạm
//      một mốc bịa ra, kèm giấy chứng nhận in "3/3 module".
//   2. Gõ thẳng URL vào màn tốt nghiệp lúc đó thì màn nói ĐÚNG chuyện
//      đang xảy ra — không chúc mừng, mà cũng không phán "bạn chưa đạt"
//      (người đã tốt nghiệp thật có thể đang ngồi kia, chỉ là mất mạng).

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { GraduationPage } from './GraduationPage'
import { milestoneOfModule, milestones } from './milestones'
import { loadModules } from '../../content'
import { useProgress } from '../../store/progress'

const dayDu = vi.fn<() => boolean>()
const thieu = vi.fn<() => number>()

vi.mock('../../content', async (importOriginal) => {
  const thuc = await importOriginal<typeof import('../../content')>()
  return { ...thuc, noiDungDayDu: () => dayDu(), soModuleThieu: () => thieu() }
})

const INITIAL = useProgress.getInitialState()

function moManTotNghiep(milestoneId: string) {
  const router = createMemoryRouter(
    [
      { path: '/tot-nghiep/:milestoneId', element: <GraduationPage /> },
      { path: '/', element: <p>trang học</p> },
    ],
    { initialEntries: [`/tot-nghiep/${milestoneId}`] },
  )
  render(<RouterProvider router={router} />)
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
  thieu.mockReturnValue(9)
})
afterEach(cleanup)

describe('mốc tốt nghiệp chỉ tồn tại khi soát được cả khóa', () => {
  it('nội dung CHƯA đủ: không mốc nào — mọi cửa vào màn tốt nghiệp tự đóng', () => {
    dayDu.mockReturnValue(false)
    expect(milestones()).toEqual([])
    // Cửa ở màn thi đọc chính hàm này; rỗng nghĩa là không mọc nút mốc giả.
    expect(milestoneOfModule(loadModules().at(-1)!.id)).toBeNull()
  })

  it('nội dung ĐÃ đủ: hai mốc thật vẫn nguyên (không nới lời hứa cũ)', () => {
    dayDu.mockReturnValue(true)
    const moc = milestones()
    expect(moc.map((m) => m.id)).toEqual(['nhap-mon', 'trung-cap'])
    expect(moc.at(-1)!.moduleId, 'mốc cả khóa phải là module cuối thật').toBe(loadModules().at(-1)!.id)
  })
})

describe('màn tốt nghiệp khi nội dung chưa đủ', () => {
  it('nói CHƯA SOÁT ĐƯỢC, không chúc mừng và cũng không phán "chưa đạt"', () => {
    dayDu.mockReturnValue(false)
    // Người này đã đậu THẬT module cuối — chỉ là hôm nay mạng chưa về đủ.
    useProgress.setState({ passedModules: loadModules().map((m) => m.id) })
    moManTotNghiep('trung-cap')

    expect(screen.getByText(/Chưa soát được cả chặng đường/)).toBeDefined()
    expect(screen.getByText(/còn 9 chủ đề chưa tải về/)).toBeDefined()
    expect(screen.queryByRole('button', { name: /Tải giấy chứng nhận/ }), 'cấp giấy trên số liệu thiếu').toBeNull()
    expect(screen.queryByText(/Mốc này chưa mở/), 'phán oan người đã tốt nghiệp thật').toBeNull()
  })

  it('đưa đúng một đường ra: tải nốt phần còn lại', () => {
    dayDu.mockReturnValue(false)
    moManTotNghiep('trung-cap')
    expect(screen.getByRole('button', { name: 'Tải nốt phần còn lại' })).toBeDefined()
  })

  it('nội dung ĐỦ mà chưa đậu thì vẫn là màn "chưa tới mốc" như cũ', () => {
    dayDu.mockReturnValue(true)
    moManTotNghiep('trung-cap')
    expect(screen.getByText(/Mốc này chưa mở/)).toBeDefined()
  })
})
