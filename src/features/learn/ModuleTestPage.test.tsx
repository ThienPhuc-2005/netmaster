// @vitest-environment jsdom
// Màn thi mastery nói đúng sự thật về cái đang chờ phía sau.
//
// Module CUỐI của lộ trình không có "module sau" để mở. Hứa hẹn một
// module không tồn tại đúng vào lúc người học vừa khép lại cả khóa là
// lời nói dối, và nó rơi trúng khoảnh khắc peak-end (spec 2.1 bước 6,
// spec 4.4 microcopy). Lỗi này chỉ lộ ra khi đi thi thật ở module cuối
// nên rất dễ sống sót — file này biến nó thành test đỏ.
//
// Mọi thứ SUY TỪ DỮ LIỆU: thêm module mới vào content/modules/ thì
// "module cuối" tự dời theo, không phải sửa test.

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { ModuleTestPage } from './ModuleTestPage'
import { loadModules, lessonsInOrder } from '../../content'
import { masteryDrawCount } from '../../engine/masteryPool'
import { useProgress, todayIso } from '../../store/progress'

const INITIAL = useProgress.getInitialState()
const modules = loadModules()

function openTestFor(moduleId: string, mode: 'normal' | 'challenge' | 'challenge-locked' = 'normal') {
  const module = modules.find((m) => m.id === moduleId)!
  // Mở cổng: mọi module trước đã đậu. Chế độ thường còn cần học hết bài;
  // chế độ VƯỢT thì cố ý CHƯA học bài nào — đó chính là cái nó bỏ qua.
  // 'challenge-locked': hồ sơ TRẮNG, module đang khóa — đúng cảnh người
  // mới cài app và muốn vào thẳng module thứ tư.
  const earlier = mode === 'challenge-locked' ? [] : modules.slice(0, modules.indexOf(module)).map((m) => m.id)
  const done =
    mode === 'normal' ? Object.fromEntries(lessonsInOrder(module).map((l) => [l.id, todayIso()])) : {}
  useProgress.setState({ passedModules: earlier, completedLessons: done })

  const router = createMemoryRouter(
    [
      { path: '/kiem-tra/:moduleId', element: <ModuleTestPage /> },
      { path: '/', element: <p>trang học</p> },
    ],
    { initialEntries: [`/kiem-tra/${moduleId}${mode.startsWith('challenge') ? '?vuot=1' : ''}`] },
  )
  return render(<RouterProvider router={router} />)
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

type TestModule = (typeof modules)[number]

/**
 * Đi trọn một lượt thi đang mở, trả lời ĐÚNG HẾT hoặc SAI HẾT.
 * Mỗi lượt RÚT một đề con từ pool và xáo thứ tự, nên phải NHẬN DẠNG câu
 * đang hiện từ nội dung trên màn — không đi theo chỉ số mảng, và số bước
 * là cỡ ĐỀ (masteryDrawCount) chứ không phải cỡ pool.
 */
function walkTest(module: TestModule, mode: 'pass' | 'fail' | ((step: number) => 'pass' | 'fail')) {
  for (let step = 0; step < masteryDrawCount(module.masteryTest); step++) {
    // Cho phép chấm ĐIỂM GIỮA: màn trượt nói hai giọng khác nhau tùy còn
    // cách ngưỡng bao xa (L3), nên test phải dựng được lượt sai vài câu
    // chứ không chỉ sai hết hoặc đúng hết.
    const m = typeof mode === 'function' ? mode(step) : mode
    const input = screen.queryByPlaceholderText('Gõ câu trả lời của bạn…')
    if (input !== null) {
      const q = module.masteryTest.find((x) => x.kind === 'typed' && screen.queryByText(x.prompt.vi) !== null)
      const text = m === 'pass' && q !== undefined && q.kind === 'typed' ? q.accept[0]! : 'trả lời sai có chủ đích'
      fireEvent.change(input, { target: { value: text } })
      fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
      continue
    }
    const orderQ = module.masteryTest.find((x) => x.kind === 'order' && screen.queryByText(x.prompt.vi) !== null)
    if (orderQ !== undefined && orderQ.kind === 'order') {
      const items = m === 'pass' ? orderQ.items : [...orderQ.items].reverse()
      for (const item of items) fireEvent.click(screen.getByRole('button', { name: item.vi }))
      fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
      continue
    }
    const mcq = module.masteryTest.find((x) => x.kind === 'mcq' && screen.queryByText(x.prompt.vi) !== null)
    expect(mcq, `bước ${step}: không nhận ra dạng câu đang hiện`).toBeDefined()
    if (mcq !== undefined && mcq.kind === 'mcq') {
      const choice = m === 'pass' ? mcq.choices[mcq.answerIndex]! : mcq.choices.find((_, i) => i !== mcq.answerIndex)!
      fireEvent.click(screen.getByRole('button', { name: choice.vi }))
    }
  }
}

describe('màn thi mastery: lời hứa phải khớp lộ trình thật', () => {
  it('module cuối KHÔNG hứa mở module sau', () => {
    const last = modules.at(-1)!
    openTestFor(last.id)
    expect(screen.getByText(/khép lại cả khóa học/)).toBeDefined()
    expect(
      screen.queryByText(/mở module sau/),
      `${last.id} là module cuối mà vẫn hứa mở module sau`,
    ).toBeNull()
  })

  it('module giữa lộ trình vẫn hứa mở module sau', () => {
    // Nếu không có câu này, xóa nhầm nhánh "module sau" cũng không ai biết.
    const first = modules[0]!
    expect(first.id, 'bộ nội dung phải có hơn một module thì phép so mới có nghĩa').not.toBe(
      modules.at(-1)!.id,
    )
    openTestFor(first.id)
    expect(screen.getByText(/mở module sau/)).toBeDefined()
  })
})

describe('thư cuối module (kho ý tưởng D2)', () => {
  // Bài thi cố ý KHÔNG cộng XP (nguyên tắc 5) nên lá thư là thứ duy nhất
  // người học nhận lúc đậu — mất nó là màn đậu trở lại thành một dòng
  // "chúc mừng" trơ trọi.
  it('đậu thì đọc được thư của module vừa qua; rớt thì chưa', () => {
    const first = modules[0]!
    const letter = first.letter!.vi
    openTestFor(first.id)
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))

    walkTest(first, 'fail')
    expect(screen.queryByText(letter), 'rớt mà đã phát thư').toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Thi lại ngay' }))
    walkTest(first, 'pass')
    expect(screen.getByText('Lời nhắn để lại cho bạn')).toBeDefined()
    expect(screen.getByText(letter)).toBeDefined()
  })

  it('thư KHÔNG cộng XP — đọc xong mọi con số trong store y nguyên', () => {
    const first = modules[0]!
    openTestFor(first.id)
    const xpBefore = useProgress.getState().xpTotal
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))
    walkTest(first, 'pass')
    expect(screen.getByText(first.letter!.vi)).toBeDefined()
    expect(useProgress.getState().xpTotal).toBe(xpBefore)
  })
})

describe('màn rớt không được rò đáp án (giá trị của con số 85%)', () => {
  // Luật đã duyệt sau phiên hội đồng 2026-08-07: rớt chỉ hiện Ý CẦN ÔN;
  // in nguyên văn đáp án rồi cho thi lại nguyên đề là biến gate thành bài
  // chép 2 phút. Test này đi thi thật và trả lời SAI TẤT CẢ các câu.
  it('trả lời sai hết → thấy ý cần ôn, KHÔNG thấy nguyên văn đáp án', () => {
    const first = modules[0]!
    openTestFor(first.id)
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))

    const typedAnswers = first.masteryTest.flatMap((q) => (q.kind === 'typed' ? q.accept : []))

    // Trả lời từng câu một cách CHẮC CHẮN SAI, bất kể thứ tự đã xáo.
    walkTest(first, 'fail')
    // Đã rớt: có tiêu đề ý cần ôn + lời hẹn "đáp án hiện khi đậu"...
    // Sai HẾT thì giọng là "còn một quãng nữa" — câu "gần lắm rồi" chỉ
    // dành cho người thật sự gần (phát hiện L3).
    expect(screen.getByText(/còn một quãng nữa/)).toBeDefined()
    expect(screen.getAllByText(/đáp án đầy đủ sẽ hiện khi bạn đậu/).length).toBeGreaterThan(0)
    // ...và KHÔNG một đáp án typed nào bị in nguyên văn ra màn hình.
    for (const answer of typedAnswers) {
      expect(
        screen.queryByText(new RegExp(`Đáp án:.*${answer}`, 'i')),
        `đáp án "${answer}" bị rò ra màn rớt`,
      ).toBeNull()
    }
    expect(screen.queryByText(/^Đáp án:/), 'màn rớt không được có khối "Đáp án:"').toBeNull()
  })
})

describe('chế độ thi vượt (?vuot=1)', () => {
  it('chưa học bài nào vẫn vào thi được, và nói rõ rớt thì vượt lại được', () => {
    // Không có cờ vuot=1 thì đúng màn hình này phải chặn — câu dưới khẳng
    // định cửa vượt là thứ DUY NHẤT mở được nó.
    openTestFor(modules[0]!.id, 'challenge')
    expect(screen.getByText(/thi vượt lại được ngay/)).toBeDefined()
    expect(screen.getByRole('button', { name: 'Vào thi luôn' })).toBeDefined()
  })

  it('KHÔNG có cờ vượt + chưa học bài → vẫn bị chặn như cũ', () => {
    const first = modules[0]!
    useProgress.setState({ passedModules: [], completedLessons: {} })
    const router = createMemoryRouter(
      [
        { path: '/kiem-tra/:moduleId', element: <ModuleTestPage /> },
        { path: '/', element: <p>trang học</p> },
      ],
      { initialEntries: [`/kiem-tra/${first.id}`] },
    )
    render(<RouterProvider router={router} />)
    expect(screen.getByText('Chưa tới giờ thi')).toBeDefined()
  })

  it('vượt hụt hôm trước rồi thì cửa vượt VẪN mở lại được', () => {
    // Chốt 08-08 (lượt sau): mọi chủ đề lớn luôn có cửa vượt. Sổ
    // challengeUsed chỉ còn là nhật ký, không phải then cài cửa.
    const first = modules[0]!
    useProgress.setState({ challengeUsed: { [first.id]: todayIso() } })
    openTestFor(first.id, 'challenge')
    expect(screen.getByRole('heading').textContent).toContain('Thi vượt module')
    expect(screen.getByRole('button', { name: 'Vào thi luôn' })).toBeDefined()
  })

  it('rớt lượt vượt: có nút thi lại (vẫn ở chế độ vượt) và vẫn không rò đáp án', () => {
    const first = modules[0]!
    openTestFor(first.id, 'challenge')
    fireEvent.click(screen.getByRole('button', { name: 'Vào thi luôn' }))
    walkTest(first, 'fail')
    expect(screen.getByText(/Thi vượt lại luôn cũng được/)).toBeDefined()
    expect(screen.queryByText(/^Đáp án:/), 'màn rớt không được rò đáp án').toBeNull()
    expect(useProgress.getState().passedModules).toEqual([])

    // Thi lại ngay tại chỗ: vẫn là lượt VƯỢT (tiêu đề giữ nguyên), và
    // lần này đi trọn đề đậu thì module mở ra thật.
    fireEvent.click(screen.getByRole('button', { name: 'Thi lại ngay' }))
    expect(screen.getByRole('heading').textContent).toContain('Thi vượt module')
    walkTest(first, 'pass')
    expect(screen.getByText(/vượt module này rồi/)).toBeDefined()
    expect(useProgress.getState().passedModules).toContain(first.id)
  })

  it('đậu lượt vượt: mở module, sinh thẻ ôn, và nói cho người học biết', () => {
    const first = modules[0]!
    openTestFor(first.id, 'challenge')
    fireEvent.click(screen.getByRole('button', { name: 'Vào thi luôn' }))
    walkTest(first, 'pass')
    expect(screen.getByText(/vượt module này rồi/)).toBeDefined()
    // Lời hứa "vượt xong vẫn phải ôn" phải nói ra thành lời...
    expect(screen.getByText(/vừa vào Hộp ôn tập/)).toBeDefined()
    // ...và phải đúng: thẻ có thật trong store.
    const state = useProgress.getState()
    expect(state.passedModules).toContain(first.id)
    const cardIds = new Set(state.reviewCards.map((c) => c.conceptId))
    for (const c of first.concepts.filter((c) => c.noFlashcard !== true)) {
      expect(cardIds.has(c.id), `thiếu thẻ "${c.id}" sau khi vượt module`).toBe(true)
    }
    // Vượt vẫn không phải nguồn XP (nguyên tắc 5).
    expect(state.xpTotal).toBe(0)
  })

  it('đậu vượt → mời vượt tiếp module sau ngay tại màn kết quả', () => {
    // Người biết sẵn năm module đầu không phải năm lần quay về trang Học.
    // Chuỗi này bỏ quãng đường đi bộ, KHÔNG bỏ phép đo nào: bấm vào là
    // sang đúng bài thi của module sau.
    const first = modules[0]!
    const second = modules[1]!
    openTestFor(first.id, 'challenge')
    fireEvent.click(screen.getByRole('button', { name: 'Vào thi luôn' }))
    walkTest(first, 'pass')

    const nextBtn = screen.getByRole('button', { name: new RegExp(`Vượt tiếp:.*${second.title.vi}`) })
    fireEvent.click(nextBtn)

    // Đã sang bài thi vượt của module sau, ở trạng thái chưa bắt đầu.
    expect(screen.getByText(new RegExp(`Thi vượt module — ${second.title.vi}`))).toBeDefined()
    expect(screen.getByRole('button', { name: 'Vào thi luôn' })).toBeDefined()
  })

  it('rớt vượt → KHÔNG mời vượt tiếp (chưa đậu thì chưa đi tiếp)', () => {
    const first = modules[0]!
    openTestFor(first.id, 'challenge')
    fireEvent.click(screen.getByRole('button', { name: 'Vào thi luôn' }))
    walkTest(first, 'fail')
    expect(screen.queryByRole('button', { name: /Vượt tiếp:/ })).toBeNull()
  })

  it('hồ sơ TRẮNG: module đang khóa vẫn mở được bài thi vượt', () => {
    // Cảnh thật của chủ dự án (08-08): mới cài app, đã học M1-M3 ở nơi
    // khác, muốn vào thẳng Module 4. Đường thi THƯỜNG vẫn khóa như cũ —
    // chỉ cửa vượt mở.
    const m4 = modules[3]!
    openTestFor(m4.id, 'challenge-locked')
    expect(screen.getByText(new RegExp(`Thi vượt module — ${m4.title.vi}`))).toBeDefined()
    expect(screen.getByRole('button', { name: 'Vào thi luôn' })).toBeDefined()
    expect(useProgress.getState().passedModules).toEqual([])
  })

  it('module khóa KHÔNG có cờ vượt vẫn khóa (cửa vượt là đường duy nhất)', () => {
    const m4 = modules[3]!
    useProgress.setState({ passedModules: [], completedLessons: {} })
    const router = createMemoryRouter(
      [
        { path: '/kiem-tra/:moduleId', element: <ModuleTestPage /> },
        { path: '/', element: <p>trang học</p> },
      ],
      { initialEntries: [`/kiem-tra/${m4.id}`] },
    )
    render(<RouterProvider router={router} />)
    expect(screen.getByText('Module chưa mở')).toBeDefined()
  })

  it('đậu vượt một module đang khóa → module đó tính đậu, module sau mở', () => {
    // Dùng module-3: hồ sơ trắng thì nó đang khóa, và đề của nó toàn
    // câu gõ/trắc nghiệm/xếp thứ tự nên đi trọn được trong jsdom.
    const m3 = modules[2]!
    openTestFor(m3.id, 'challenge-locked')
    fireEvent.click(screen.getByRole('button', { name: 'Vào thi luôn' }))
    walkTest(m3, 'pass')

    const state = useProgress.getState()
    expect(state.passedModules).toEqual([m3.id])
    // Thẻ ôn của chính module vừa vượt vẫn sinh đủ.
    const cardIds = new Set(state.reviewCards.map((c) => c.conceptId))
    for (const c of m3.concepts.filter((c) => c.noFlashcard !== true)) {
      expect(cardIds.has(c.id), `thiếu thẻ "${c.id}"`).toBe(true)
    }
  })

})

describe('khiếu nại đáp án ngay ở màn kết quả thi (khối 21.12)', () => {
  // Đề thi là chỗ một danh sách đáp án hẹp gây thiệt hại lớn nhất: nó ăn
  // thẳng vào con số 85% của cổng mastery. Nhưng nút chỉ GHI LẠI — điểm
  // lượt thi đã chốt lúc nộp và không được đổi.
  it('câu gõ tay trả lời sai → có nút; bấm thì ghi nguyên văn, KHÔNG đổi điểm', () => {
    const first = modules[0]!
    openTestFor(first.id)
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))
    walkTest(first, 'fail')

    const scoreBefore = useProgress.getState().masteryScores[first.id]
    const buttons = screen.getAllByRole('button', { name: /Mình nghĩ câu này đúng/ })
    expect(buttons.length, 'đề nào cũng có ít nhất một câu gõ tay').toBeGreaterThan(0)
    fireEvent.click(buttons[0]!)

    const after = useProgress.getState()
    expect(after.disputedAnswers).toHaveLength(1)
    expect(after.disputedAnswers[0]!.answer).toBe('trả lời sai có chủ đích')
    // Câu đề thi không thuộc bài học nào — chỗ trống đó là dấu hiệu, không phải lỗi.
    expect(after.disputedAnswers[0]!.lessonId).toBe('')
    expect(after.masteryScores[first.id]).toBe(scoreBefore)
    expect(after.passedModules).toEqual([])
  })

  it('không mời khiếu nại câu đã trả lời ĐÚNG', () => {
    const first = modules[0]!
    openTestFor(first.id)
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))
    walkTest(first, 'pass')
    expect(screen.queryByRole('button', { name: /Mình nghĩ câu này đúng/ })).toBeNull()
  })
})

// L3 (lượt rà soát màn hiếm gặp 08-12) — MÀN TRƯỢT.
//
// Đo thật trên browser trước khi sửa: thi vượt module 2, sai cả 8 câu,
// màn kết quả ghi "Được 0% — gần lắm rồi." rồi mời "Thi lại ngay" bằng
// nút đặc — trong khi 8 dòng ngay phía trên đều bảo "mở lại bài dạy phần
// này". App vừa an ủi bằng một câu không đúng, vừa mời làm đúng thứ
// không nên làm.
describe('màn trượt nói đúng khoảng cách tới ngưỡng (L3)', () => {
  /** Số câu sai ÍT NHẤT để trượt — hụt chừng này là "gần lắm rồi". */
  function saiVuaDuTruot(module: TestModule): number {
    const n = masteryDrawCount(module.masteryTest)
    for (let k = 1; k <= n; k++) if (((n - k) * 100) / n < 85) return k
    return n
  }

  it('hụt sát ngưỡng: giữ nguyên giọng "gần lắm rồi" và nút Thi lại đứng đầu', () => {
    const first = modules[0]!
    const sai = saiVuaDuTruot(first)
    openTestFor(first.id)
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))
    walkTest(first, (step) => (step < sai ? 'fail' : 'pass'))

    expect(screen.getByText(/gần lắm rồi/), 'hụt sát ngưỡng mà không được nói là gần').toBeDefined()
    expect(screen.getByRole('button', { name: 'Thi lại ngay' })).toBeDefined()
    // Ở gần thì đi tiếp bằng thi lại — không đẩy người ta về học lại cả module.
    expect(screen.queryByRole('button', { name: 'Về học lại module này' })).toBeNull()
  })

  it('còn cách một quãng: KHÔNG khen "gần lắm rồi", và nút đặc trỏ về bài học', () => {
    const first = modules[0]!
    openTestFor(first.id)
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))
    walkTest(first, 'fail')

    expect(screen.queryByText(/gần lắm rồi/), 'được 0% mà app vẫn khen gần lắm rồi').toBeNull()
    expect(screen.getByText(/còn một quãng nữa/)).toBeDefined()
    // Cửa thi lại KHÔNG bị lấy đi, chỉ lùi về hàng hai.
    expect(screen.getByRole('button', { name: 'Về học lại module này' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Thi lại ngay' })).toBeDefined()
  })

  it('lời dặn chung chỉ nói MỘT LẦN, không lặp dưới từng câu sai', () => {
    const first = modules[0]!
    openTestFor(first.id)
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))
    walkTest(first, 'fail')

    // Trước đây câu này in dưới mỗi câu không khai hintTopic — sai 8 câu
    // thì thành 6 dòng y hệt nhau, che mất mấy dòng thật sự có tin.
    expect(screen.getAllByText(/đáp án đầy đủ sẽ hiện khi bạn đậu/)).toHaveLength(1)
  })
})
