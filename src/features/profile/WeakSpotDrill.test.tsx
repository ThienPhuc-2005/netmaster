// @vitest-environment jsdom
// Luyện lại chỗ hay vấp (khối 21.9). Bất biến quan trọng nhất ở đây là
// KHÔNG XP / KHÔNG đụng lịch ôn: mọi câu trong phiên đều đã được giải
// xong một lần rồi, nên cộng điểm cho lượt làm lại là mở đường farm
// bằng cách cố tình vấp (nguyên tắc 5).

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { WeakSpotDrillPage } from './WeakSpotDrill'
import { loadModules } from '../../content'
import { startLesson } from '../../engine/lessonMachine'
import { conceptIdsInLesson } from '../../engine/contentPure'
import { useProgress } from '../../store/progress'

const INITIAL = useProgress.getInitialState()
const modules = loadModules()
const firstLesson = modules[0]!.lessons[0]!

/** Bài đầu đã học xong, câu gõ tay đầu tiên từng vấp 3 lần. */
function seedOneStumble() {
  const typed = firstLesson.steps[3].exercises.find((e) => e.question.kind === 'typed')!
  const base = startLesson(firstLesson)
  const exercises = { ...base.exercises }
  for (const id of Object.keys(exercises)) {
    exercises[id] = { failCount: 0, solved: true, usedSolution: false }
  }
  exercises[typed.question.id] = { failCount: 3, solved: true, usedSolution: false }
  useProgress.setState({ lessonRuntimes: { [firstLesson.id]: { ...base, exercises } } })
  return typed
}

function renderDrill() {
  render(
    <MemoryRouter>
      <WeakSpotDrillPage />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

describe('luyện lại chỗ hay vấp', () => {
  it('chưa vấp câu nào thì nói thẳng là chưa có gì để luyện', () => {
    renderDrill()
    expect(screen.getByText('Chưa có câu nào để luyện lại')).toBeTruthy()
  })

  it('hỏi đúng câu đã vấp, kèm số lần từng vấp', () => {
    const typed = seedOneStumble()
    renderDrill()
    expect(screen.getByText(typed.question.prompt.vi)).toBeTruthy()
    expect(screen.getByText('từng vấp 3 lần')).toBeTruthy()
    expect(screen.getByText('Câu 1/1')).toBeTruthy()
  })

  it('trả lời đúng: khen + hiện đáp án và vì sao, KHÔNG cộng XP', () => {
    const typed = seedOneStumble()
    if (typed.question.kind !== 'typed') throw new Error('fixture phải là câu gõ tay')
    renderDrill()

    fireEvent.change(screen.getByPlaceholderText('Gõ câu trả lời của bạn…'), {
      target: { value: typed.question.accept[0]! },
    })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))

    expect(screen.getByText(/chỗ vấp cũ đang lành lại/)).toBeTruthy()
    expect(screen.getByText(/Đáp án:/)).toBeTruthy()
    expect(useProgress.getState().xpTotal).toBe(0)
  })

  it('trả lời chưa đúng cũng KHÔNG phạt: không đụng XP, không đụng lịch ôn, vẫn nói thật là chưa đúng', () => {
    seedOneStumble()
    const before = useProgress.getState()
    renderDrill()

    fireEvent.change(screen.getByPlaceholderText('Gõ câu trả lời của bạn…'), {
      target: { value: 'trả lời sai có chủ đích' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))

    expect(screen.getByText(/Gần rồi/)).toBeTruthy()
    const after = useProgress.getState()
    expect(after.xpTotal).toBe(before.xpTotal)
    expect(after.reviewCards).toEqual(before.reviewCards)
    expect(after.streak).toEqual(before.streak)
    // Runtime của bài gốc không được sửa: điểm vấp cũ là lịch sử, không
    // phải sổ ghi tiếp của phòng tập.
    expect(after.lessonRuntimes).toEqual(before.lessonRuntimes)
  })

  it('đi hết phiên ra màn tổng kết, nói rõ không cộng XP', () => {
    const typed = seedOneStumble()
    if (typed.question.kind !== 'typed') throw new Error('fixture phải là câu gõ tay')
    renderDrill()
    fireEvent.change(screen.getByPlaceholderText('Gõ câu trả lời của bạn…'), {
      target: { value: typed.question.accept[0]! },
    })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
    fireEvent.click(screen.getByRole('button', { name: /Câu tiếp theo/ }))

    expect(screen.getByText('Xong phiên luyện lại')).toBeTruthy()
    expect(screen.getByText(/không cộng XP và không đổi lịch ôn/)).toBeTruthy()
    expect(useProgress.getState().xpTotal).toBe(0)
  })
})

// NGUỒN THỨ HAI của cùng màn này (khối 21.52): luyện lại THỨ HAY QUÊN.
// Cùng nhịp, cùng cách chấm, cùng luật không-XP — khác đúng chỗ lấy đề,
// nên phải khoá được rằng hai nguồn không lẫn vào nhau.
describe('luyện lại thứ hay quên (?nguon=hay-quen)', () => {
  /** Một khái niệm THẬT của bài đầu + thẻ ôn đã quên `lapses` lần. */
  function seedQuen(lapses: number) {
    const conceptId = conceptIdsInLesson(firstLesson)[0]!
    useProgress.setState({
      reviewCards: [
        {
          conceptId,
          moduleId: modules[0]!.id,
          intervalIndex: 1,
          dueDate: '2026-08-20',
          lapses,
          createdOn: '2026-06-01',
          lastReviewedOn: null,
        },
      ],
    })
    return conceptId
  }

  function renderQuen() {
    render(
      <MemoryRouter initialEntries={['/luyen-lai?nguon=hay-quen']}>
        <WeakSpotDrillPage />
      </MemoryRouter>,
    )
  }

  it('mở đúng phiên "hay quên", nhãn nói QUÊN chứ không nói vấp', () => {
    seedQuen(4)
    renderQuen()
    expect(screen.getByRole('heading', { name: 'Luyện lại thứ hay quên' })).toBeTruthy()
    expect(screen.getByText('từng quên 4 lần')).toBeTruthy()
    expect(screen.queryByText(/từng vấp/), 'dùng nhầm nhãn là nói sai với người học').toBeNull()
  })

  it('quên MỘT lần thì chưa tới lượt — nói rõ chưa có gì để luyện', () => {
    seedQuen(1)
    renderQuen()
    expect(screen.getByText('Chưa có thứ nào để luyện lại')).toBeTruthy()
  })

  it('KHÔNG cộng XP và KHÔNG đụng lịch ôn — cùng luật với phiên chỗ vấp', () => {
    seedQuen(3)
    renderQuen()
    const truoc = JSON.stringify(useProgress.getState().reviewCards)
    const xpTruoc = useProgress.getState().xpTotal

    const o = screen.queryByPlaceholderText('Gõ câu trả lời của bạn…')
    if (o !== null) {
      fireEvent.change(o, { target: { value: 'trả lời gì đó' } })
      fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
    }

    expect(useProgress.getState().xpTotal).toBe(xpTruoc)
    expect(JSON.stringify(useProgress.getState().reviewCards), 'phiên luyện đã đẩy lịch ôn').toBe(truoc)
  })

  it('KHÔNG có cờ nguồn thì vẫn là phiên chỗ vấp như cũ', () => {
    seedQuen(4)
    renderDrill()
    expect(screen.getByText('Chưa có câu nào để luyện lại')).toBeTruthy()
  })
})

// "CHỖ NÀY GIẢI THÍCH CHƯA LỌT" (ý N6) — kênh DUY NHẤT người học nói
// được về CHẤT LƯỢNG BÀI GIẢNG. Mọi con số khác của app đo họ làm được
// tới đâu; không con số nào tách được "chưa học đủ" khỏi "đã học mà lời
// giảng không vào".
describe('nút "giải thích chưa lọt"', () => {
  it('trả lời CHƯA ĐÚNG thì mới mời — đúng lúc vừa đọc lại lời giải xong', () => {
    const typed = seedOneStumble()
    renderDrill()
    fireEvent.change(screen.getByPlaceholderText('Gõ câu trả lời của bạn…'), {
      target: { value: 'trả lời sai có chủ đích' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
    expect(screen.getByRole('button', { name: /Chỗ này giải thích chưa lọt/ })).toBeTruthy()
    expect(typed.question.id).toBeTruthy()
  })

  it('trả lời ĐÚNG thì KHÔNG mời — lời giảng vừa vào thì hỏi làm gì', () => {
    const typed = seedOneStumble()
    if (typed.question.kind !== 'typed') throw new Error('cần một câu gõ tay')
    renderDrill()
    fireEvent.change(screen.getByPlaceholderText('Gõ câu trả lời của bạn…'), {
      target: { value: typed.question.accept[0]! },
    })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
    expect(screen.queryByRole('button', { name: /Chỗ này giải thích chưa lọt/ })).toBeNull()
  })

  it('bấm thì ghi vào sổ RIÊNG, không lẫn vào sổ khiếu nại chấm', () => {
    const typed = seedOneStumble()
    renderDrill()
    fireEvent.change(screen.getByPlaceholderText('Gõ câu trả lời của bạn…'), {
      target: { value: 'trả lời sai có chủ đích' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
    fireEvent.click(screen.getByRole('button', { name: /Chỗ này giải thích chưa lọt/ }))

    const s = useProgress.getState()
    expect(s.giaiThichChuaLot).toHaveLength(1)
    expect(s.giaiThichChuaLot[0]).toMatchObject({ questionId: typed.question.id, lessonId: firstLesson.id })
    // Hai sổ đo hai chuyện khác nhau: kia là "máy chấm sai", đây là
    // "lời giảng chưa vào". Trộn lại là người soạn bài không biết nên
    // nới đáp án hay viết lại bài.
    expect(s.disputedAnswers, 'ghi nhầm sang sổ khiếu nại chấm').toEqual([])
  })

  it('ghi rồi thì đổi thành lời xác nhận, không mời bấm lần nữa', () => {
    seedOneStumble()
    renderDrill()
    fireEvent.change(screen.getByPlaceholderText('Gõ câu trả lời của bạn…'), {
      target: { value: 'trả lời sai có chủ đích' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
    fireEvent.click(screen.getByRole('button', { name: /Chỗ này giải thích chưa lọt/ }))

    expect(screen.getByText(/Đã ghi lại/)).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Chỗ này giải thích chưa lọt/ })).toBeNull()
    expect(useProgress.getState().giaiThichChuaLot, 'bấm hai lần không nhân đôi tiếng nói').toHaveLength(1)
  })

  it('KHÔNG cộng XP — nói ra một góp ý không phải là kiếm điểm', () => {
    seedOneStumble()
    renderDrill()
    const xpTruoc = useProgress.getState().xpTotal
    fireEvent.change(screen.getByPlaceholderText('Gõ câu trả lời của bạn…'), {
      target: { value: 'trả lời sai có chủ đích' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Kiểm tra/ }))
    fireEvent.click(screen.getByRole('button', { name: /Chỗ này giải thích chưa lọt/ }))
    expect(useProgress.getState().xpTotal).toBe(xpTruoc)
  })
})
