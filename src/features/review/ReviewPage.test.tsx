// @vitest-environment jsdom
// Phiên ôn với bước RELEARNING (hội đồng 2026-08-07, đã duyệt):
//   - Thẻ "chưa nhớ" quay lại CUỐI phiên tới khi tự nhớ được một lần.
//   - Chỉ lượt chấm ĐẦU ghi vào SM-2 + XP; vòng học lại không đụng store
//     (không giãn lịch, không XP — chặn cả hai chiều méo khuyến khích).
// Test dùng nội dung THẬT (concept module-1) để mặt thẻ dựng được.

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ReviewPage } from './ReviewPage'
import { loadModules } from '../../content'
import { createCard } from '../../engine/sm2'
import { todayIso, useProgress } from '../../store/progress'
import { addDays } from '../../engine/dates'

const INITIAL = useProgress.getInitialState()

/** Hai thẻ đến hạn hôm nay, sinh từ concept thật của module 1. */
function seedTwoDueCards(): string[] {
  const m1 = loadModules()[0]!
  const concepts = m1.concepts.filter((c) => c.flashcard !== undefined).slice(0, 2)
  expect(concepts).toHaveLength(2)
  const yesterday = addDays(todayIso(), -1)
  useProgress.setState({
    reviewCards: concepts.map((c) => createCard(c.id, m1.id, yesterday)),
  })
  return concepts.map((c) => c.id)
}

function reveal() {
  fireEvent.click(screen.getByRole('button', { name: /Hiện đáp án/ }))
}
function answer(remembered: boolean) {
  fireEvent.click(screen.getByRole('button', { name: remembered ? /Mình nhớ/ : /Chưa nhớ ra/ }))
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

/** Thẻ vừa bị chấm QUÊN (lapses 1) — không giả định thứ tự phiên. */
function forgottenCard() {
  const marked = useProgress.getState().reviewCards.filter((c) => c.lapses === 1)
  expect(marked, 'phải có đúng một thẻ vừa bị chấm quên').toHaveLength(1)
  return marked[0]!
}

describe('relearning trong phiên ôn', () => {
  it('thẻ quên quay lại cuối phiên; lượt học lại không ghi SM-2, không XP', () => {
    seedTwoDueCards()
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )

    // Thẻ 1/2: trả lời QUÊN → hàng đợi nở thành 3 (thẻ nối vào cuối).
    expect(screen.getByText('Thẻ 1/2')).toBeDefined()
    reveal()
    answer(false)
    expect(screen.getByText('Thẻ 2/3')).toBeDefined()

    // Lượt chấm đầu đã ghi SM-2 đúng luật: bậc 0, hẹn ngày mai, lapses 1.
    const afterForget = forgottenCard()
    expect(afterForget.intervalIndex).toBe(0)
    expect(afterForget.dueDate).toBe(addDays(todayIso(), 1))
    const xpAfterForget = useProgress.getState().xpTotal

    // Thẻ 2/3: nhớ → XP cộng cho lượt chấm đầu của thẻ này.
    reveal()
    answer(true)
    const xpAfterSecond = useProgress.getState().xpTotal
    expect(xpAfterSecond).toBeGreaterThan(xpAfterForget)

    // Thẻ 3/3 là thẻ QUÊN quay lại — có nhãn học lại.
    expect(screen.getByText('Thẻ 3/3')).toBeDefined()
    expect(screen.getByText('thẻ học lại')).toBeDefined()

    // Nhớ được ở vòng học lại: phiên khép, nhưng store KHÔNG đổi thêm —
    // thẻ vẫn bậc 0 hẹn ngày mai (lượt học lại không giãn lịch), XP đứng yên.
    reveal()
    answer(true)
    expect(screen.getByText(/Xong phiên ôn hôm nay/)).toBeDefined()
    const finalCard = forgottenCard()
    expect(finalCard.intervalIndex).toBe(0)
    expect(finalCard.dueDate).toBe(addDays(todayIso(), 1))
    expect(useProgress.getState().xpTotal).toBe(xpAfterSecond)
  })

  it('quên ở cả vòng học lại → thẻ lại nối vào cuối, không ghi SM-2 lần hai', () => {
    seedTwoDueCards()
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
    reveal()
    answer(false) // thẻ 1 quên → hàng 3
    reveal()
    answer(true) // thẻ 2 nhớ
    reveal()
    answer(false) // vòng học lại vẫn quên → hàng 4
    expect(screen.getByText('Thẻ 4/4')).toBeDefined()
    // lapses vẫn 1 — vòng học lại không chồng thêm hình phạt vào lịch
    // (forgottenCard tự khẳng định chỉ có ĐÚNG MỘT thẻ mang lapses 1).
    expect(forgottenCard().intervalIndex).toBe(0)
  })
})
