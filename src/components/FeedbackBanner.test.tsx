// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { FeedbackBanner, type FeedbackState } from './FeedbackBanner'

afterEach(cleanup)

const HINT = 'Địa chỉ nhà nằm ngoài phong bì — trường nào của gói tin cũng vậy?'
const SOLUTION = 'Đáp án là địa chỉ IP đích: router chỉ đọc header để chuyển tiếp.'

function renderState(state: FeedbackState) {
  return render(<FeedbackBanner state={state} />)
}

describe('FeedbackBanner', () => {
  it('trạng thái đúng → lời khen', () => {
    const { container } = renderState({ kind: 'correct' })
    expect(container.textContent).toContain('Chuẩn luôn!')
  })

  it('tầng 1 có chủ đề → "Gần rồi — nghĩ lại về X nhé"', () => {
    const { container } = renderState({ kind: 'incorrect', tier: 1, topic: 'địa chỉ IP' })
    expect(container.textContent).toContain('Gần rồi — nghĩ lại về địa chỉ IP nhé.')
    expect(container.textContent).not.toContain(HINT)
  })

  it('tầng 1 không có chủ đề → lời động viên chung', () => {
    const { container } = renderState({ kind: 'incorrect', tier: 1 })
    expect(container.textContent).toContain('Gần rồi — thử thêm một lần nữa nhé.')
  })

  it('tầng 2 → hiện gợi ý cụ thể, CHƯA hiện lời giải', () => {
    const { container } = renderState({ kind: 'incorrect', tier: 2, hint: HINT, solution: SOLUTION })
    expect(container.textContent).toContain(HINT)
    expect(container.textContent).not.toContain(SOLUTION)
  })

  it('tầng 3 → hiện lời giải + lời nhắc tự gõ lại (generation effect)', () => {
    const { container } = renderState({ kind: 'incorrect', tier: 3, hint: HINT, solution: SOLUTION })
    expect(container.textContent).toContain(SOLUTION)
    expect(container.textContent).toContain('tự gõ lại')
  })

  it('KHÔNG BAO GIỜ hiện chữ "SAI" trần trụi ở bất kỳ trạng thái nào (spec 4.4)', () => {
    const states: FeedbackState[] = [
      { kind: 'correct' },
      { kind: 'incorrect', tier: 1, topic: 'subnet mask' },
      { kind: 'incorrect', tier: 2, hint: HINT },
      { kind: 'incorrect', tier: 3, hint: HINT, solution: SOLUTION },
    ]
    for (const state of states) {
      const { container } = renderState(state)
      expect(container.textContent).not.toMatch(/\bSAI\b/)
      cleanup()
    }
  })

  it('cận-đúng: hiện lời may đo thay cho câu tầng-1 chung', () => {
    const { container } = renderState({
      kind: 'incorrect',
      tier: 1,
      topic: 'vai trò của thiết bị',
      nearMiss: 'Đúng thiết bị rồi — nhưng vai trò nó đang đóng tên là gì?',
    })
    expect(container.textContent).toContain('Đúng thiết bị rồi')
    expect(container.textContent).not.toContain('Gần rồi — nghĩ lại')
  })

  it('có role="status" để screen reader đọc phản hồi', () => {
    const { getByRole } = renderState({ kind: 'incorrect', tier: 1 })
    expect(getByRole('status')).toBeTruthy()
  })
})
