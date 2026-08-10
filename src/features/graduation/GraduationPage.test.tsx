// @vitest-environment jsdom
// Màn tốt nghiệp (quyết định 5 của spec v2) — ba bất biến phải giữ:
//
//   1. MỐC SUY TỪ DỮ LIỆU: cuối nhập môn = module cuối của Phần A-C,
//      cuối khóa = module cuối lộ trình — thêm module là mốc tự dời,
//      không sửa code (cùng nếp isFinalModule của màn thi).
//   2. GÕ URL KHÔNG VƯỢT ĐƯỢC CỔNG: chưa đậu module mốc thì màn tổng
//      kết không mở — cùng bất biến với bài học và bài thi.
//   3. KHÔNG XP: màn kết là tấm gương, không phải phần thưởng (nguyên
//      tắc 5) — render xong mọi con số trong store phải y nguyên.

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { GraduationPage } from './GraduationPage'
import { milestones, milestoneOfModule } from './milestones'
import { loadModules } from '../../content'
import { useProgress } from '../../store/progress'

const INITIAL = useProgress.getInitialState()
const modules = loadModules()

function renderAt(milestoneId: string) {
  const router = createMemoryRouter(
    [
      { path: '/tot-nghiep/:milestoneId', element: <GraduationPage /> },
      { path: '/', element: <p>trang học</p> },
    ],
    { initialEntries: [`/tot-nghiep/${milestoneId}`] },
  )
  return render(<RouterProvider router={router} />)
}

/** Đậu mọi module TỚI HẾT module mốc đã cho (tính cả nó). */
function passUpTo(moduleId: string) {
  const index = modules.findIndex((m) => m.id === moduleId)
  useProgress.setState({ passedModules: modules.slice(0, index + 1).map((m) => m.id) })
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

describe('mốc tốt nghiệp suy từ dữ liệu', () => {
  it('cuối nhập môn là module cuối Phần A-C, cuối khóa là module cuối lộ trình', () => {
    const found = milestones()
    const lastIntro = [...modules].reverse().find((m) => m.part === 'A' || m.part === 'B' || m.part === 'C')!
    expect(found.find((m) => m.id === 'nhap-mon')?.moduleId).toBe(lastIntro.id)
    expect(found.find((m) => m.id === 'trung-cap')?.moduleId).toBe(modules.at(-1)!.id)
  })

  it('milestoneOfModule chỉ nhận đúng hai module mốc', () => {
    for (const m of milestones()) {
      expect(milestoneOfModule(m.moduleId)?.id).toBe(m.id)
    }
    expect(milestoneOfModule(modules[0]!.id)).toBeNull()
  })
})

describe('cổng vào', () => {
  it('chưa đậu module mốc thì gõ URL thẳng cũng chỉ thấy màn chưa-mở, không lộ số liệu', () => {
    renderAt('trung-cap')
    expect(screen.getByText('Mốc này chưa mở')).toBeTruthy()
    expect(screen.queryByText('Số liệu cả chặng đường')).toBeNull()
  })

  it('mốc không tồn tại cũng rơi về màn chưa-mở', () => {
    renderAt('sieu-cap')
    expect(screen.getByText('Mốc này chưa mở')).toBeTruthy()
  })
})

describe('màn tổng kết', () => {
  it('đậu hết nhập môn: tiêu đề nhập môn + bản đồ tô đúng số module đã đậu', () => {
    const nhapMon = milestones().find((m) => m.id === 'nhap-mon')!
    passUpTo(nhapMon.moduleId)
    const { container } = renderAt('nhap-mon')

    expect(screen.getByText('Tốt nghiệp nhập môn')).toBeTruthy()
    // Bản đồ vẽ TRỌN lộ trình, tô đậm đúng phần đã đậu — nói thật cả về
    // quãng đường còn lại (Phần D-E chưa đi).
    const cells = [...container.querySelectorAll('svg[role="img"] rect')]
    expect(cells).toHaveLength(modules.length)
    const filled = cells.filter((r) => r.getAttribute('fill') !== 'none')
    expect(filled).toHaveLength(useProgress.getState().passedModules.length)
  })

  it('đậu cả khóa: tiêu đề trung cấp, bản đồ kín, số liệu đọc từ store', () => {
    passUpTo(modules.at(-1)!.id)
    useProgress.setState({ xpTotal: 1234 })
    const { container } = renderAt('trung-cap')

    expect(screen.getByText('Tốt nghiệp trung cấp — kết cả khóa')).toBeTruthy()
    const filled = [...container.querySelectorAll('svg[role="img"] rect')].filter(
      (r) => r.getAttribute('fill') !== 'none',
    )
    expect(filled).toHaveLength(modules.length)
    expect(screen.getByText('1234')).toBeTruthy()
    expect(screen.getByText(`${modules.length}/${modules.length}`)).toBeTruthy()
  })

  it('nói được đi hết chặng đường mất bao nhiêu ngày (kho H2)', () => {
    passUpTo(modules.at(-1)!.id)
    useProgress.setState({
      completedLessons: { a: '2026-03-01', b: '2026-03-02', c: '2026-04-10' },
    })
    renderAt('trung-cap')

    // 01/03 → 10/04 tính cả hai đầu = 41 ngày, trong đó 3 ngày ngồi học.
    expect(screen.getByText('Về đích sau (ngày)')).toBeTruthy()
    expect(screen.getByText('41')).toBeTruthy()
    expect(screen.getByText(/01\/03\/2026.*10\/04\/2026.*3 ngày/s)).toBeTruthy()
  })

  it('chưa xong bài nào thì im lặng về số ngày, không in "0 ngày"', () => {
    // Hồ sơ đi cửa thi vượt suốt cả khóa: đậu hết mà không có ngày học
    // nào — bịa ra một con số ở đây là nói dối trên chính tấm gương.
    passUpTo(modules.at(-1)!.id)
    renderAt('trung-cap')
    expect(screen.queryByText('Về đích sau (ngày)')).toBeNull()
  })

  it('KHÔNG cộng XP: render xong, mọi con số trong store y nguyên', () => {
    passUpTo(modules.at(-1)!.id)
    useProgress.setState({ xpTotal: 777 })
    const before = useProgress.getState()
    renderAt('trung-cap')
    const after = useProgress.getState()
    expect(after.xpTotal).toBe(777)
    expect(after.streak).toEqual(before.streak)
    expect(after.passedModules).toEqual(before.passedModules)
  })
})
