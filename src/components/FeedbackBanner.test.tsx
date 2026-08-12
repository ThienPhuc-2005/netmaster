// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { FeedbackBanner, FeedbackRegion, type FeedbackState } from './FeedbackBanner'

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

  it('FeedbackRegion: vùng role="status" TỒN TẠI TRƯỚC khi có phản hồi (live region đáng tin)', () => {
    // Live region mount kèm sẵn nội dung thường bị screen reader nuốt —
    // hợp đồng mới: vùng trống có mặt từ đầu, phản hồi swap vào trong.
    const { getByRole, rerender } = render(<FeedbackRegion state={null} />)
    const region = getByRole('status')
    expect(region.textContent).toBe('')
    rerender(<FeedbackRegion state={{ kind: 'incorrect', tier: 1 }} />)
    expect(getByRole('status').textContent).toContain('Gần rồi')
  })
})

// ---------------------------------------------------------------
// Phản hồi phải VÀO TẦM MẮT sau khi nộp (phát hiện J2, khối 21.44)
// ---------------------------------------------------------------
//
// Ở bài nặng (lab, terminal, phòng khám) khối phản hồi nằm dưới mép màn
// hình: bấm "Nộp bài" xong màn hình trông y hệt lúc chưa bấm. Đo thật
// lúc rà soát: phản hồi ở 649–872px trong khi màn cao 694px.

describe('FeedbackRegion — đưa phản hồi vào tầm mắt', () => {
  /** Giả bộ khối phản hồi đang nằm ở khoảng dọc này so với màn hình. */
  function datVungPhanHoi(top: number, bottom: number) {
    const goc = Element.prototype.getBoundingClientRect
    Element.prototype.getBoundingClientRect = function () {
      if ((this as HTMLElement).getAttribute?.('role') === 'status') {
        return { top, bottom, left: 0, right: 0, width: 300, height: bottom - top, x: 0, y: top, toJSON: () => ({}) } as DOMRect
      }
      return goc.call(this)
    }
    return () => {
      Element.prototype.getBoundingClientRect = goc
    }
  }

  it('phản hồi nằm DƯỚI mép màn thì cuộn tới — và cuộn tức thì, không mượt', () => {
    const traLai = datVungPhanHoi(649, 872) // đúng số đo lúc rà soát
    const cuon = vi.fn()
    Element.prototype.scrollIntoView = cuon
    try {
      const { rerender } = render(<FeedbackRegion state={null} />)
      expect(cuon).not.toHaveBeenCalled()
      rerender(<FeedbackRegion state={{ kind: 'incorrect', tier: 1 }} />)
      expect(cuon).toHaveBeenCalledTimes(1)
      expect(cuon.mock.calls[0]![0]).toEqual({ block: 'nearest' })
    } finally {
      traLai()
    }
  })

  it('phản hồi ĐANG hiện sẵn thì KHÔNG giật màn hình', () => {
    const traLai = datVungPhanHoi(120, 260)
    const cuon = vi.fn()
    Element.prototype.scrollIntoView = cuon
    try {
      const { rerender } = render(<FeedbackRegion state={null} />)
      rerender(<FeedbackRegion state={{ kind: 'correct' }} />)
      expect(cuon).not.toHaveBeenCalled()
    } finally {
      traLai()
    }
  })

  it('dời FOCUS vào vùng phản hồi — bàn phím đứng ngay chỗ vừa hiện', () => {
    Element.prototype.scrollIntoView = vi.fn()
    const { rerender, container } = render(<FeedbackRegion state={null} />)
    rerender(<FeedbackRegion state={{ kind: 'incorrect', tier: 2, hint: HINT }} />)
    expect(document.activeElement).toBe(container.querySelector('[role="status"]'))
  })

  it('mỗi lần nộp tiếp theo lại đưa vào tầm mắt lần nữa (tầng gợi ý vừa dài ra)', () => {
    const traLai = datVungPhanHoi(700, 900)
    const cuon = vi.fn()
    Element.prototype.scrollIntoView = cuon
    try {
      const { rerender } = render(<FeedbackRegion state={null} />)
      rerender(<FeedbackRegion state={{ kind: 'incorrect', tier: 1 }} />)
      rerender(<FeedbackRegion state={{ kind: 'incorrect', tier: 2, hint: HINT }} />)
      rerender(<FeedbackRegion state={{ kind: 'incorrect', tier: 3, hint: HINT, solution: SOLUTION }} />)
      expect(cuon).toHaveBeenCalledTimes(3)
    } finally {
      traLai()
    }
  })
})
