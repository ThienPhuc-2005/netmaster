// @vitest-environment jsdom
// Phím tắt một tay (kho ý tưởng E3).
//
// Test ở đây chủ yếu gác HAI CÁI BẪY chứ không phải gác tính năng — tính
// năng hỏng thì thấy ngay, còn hai cái này hỏng âm thầm và chỉ lộ ra khi
// người học đã mất một lượt trả lời:
//   1. Bấm số trong lúc đang gõ câu trả lời phải ra CHỮ SỐ, không phải
//      chọn đáp án.
//   2. Enter khi đang đứng trên một nút chỉ được bấm ĐÚNG nút đó — không
//      được vừa bấm nút vừa chạy phím tắt Enter.

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { isTypingTarget, numberKeyHandlers, useShortcuts } from './shortcuts'

function Harness({ onKey, enabled = true }: { onKey: (label: string) => void; enabled?: boolean }) {
  useShortcuts(
    {
      ...numberKeyHandlers(3, (position) => onKey(`số ${position + 1}`)),
      Enter: () => onKey('enter'),
      ArrowRight: () => onKey('tới'),
    },
    enabled,
  )
  return (
    <div>
      <input aria-label="ô trả lời" />
      <button onClick={() => onKey('bấm nút')}>một nút</button>
    </div>
  )
}

afterEach(cleanup)

describe('isTypingTarget', () => {
  it('ô nhập, vùng văn bản, ô chọn là chỗ đang gõ', () => {
    for (const tag of ['input', 'textarea', 'select']) {
      expect(isTypingTarget(document.createElement(tag)), tag).toBe(true)
    }
  })

  it('nút và div thường thì không', () => {
    expect(isTypingTarget(document.createElement('button'))).toBe(false)
    expect(isTypingTarget(document.createElement('div'))).toBe(false)
    expect(isTypingTarget(null)).toBe(false)
  })
})

describe('numberKeyHandlers', () => {
  it('khai đúng số phím theo số mục, đánh số từ 1', () => {
    const picked: number[] = []
    const h = numberKeyHandlers(3, (p) => picked.push(p))
    expect(Object.keys(h)).toEqual(['1', '2', '3'])
    h['2']!()
    expect(picked).toEqual([1])
  })

  it('dừng ở 9 — phím "0" đứng cuối hàng số, gán cho mục thứ mười là mời bấm nhầm', () => {
    expect(Object.keys(numberKeyHandlers(20, () => {}))).toHaveLength(9)
  })
})

describe('useShortcuts', () => {
  it('bấm số ở ngoài ô nhập → chạy phím tắt', () => {
    const onKey = vi.fn()
    render(<Harness onKey={onKey} />)
    fireEvent.keyDown(window, { key: '2' })
    expect(onKey).toHaveBeenCalledWith('số 2')
  })

  it('ĐANG GÕ trong ô trả lời → phím số không đụng gì, chữ số vào ô như thường', () => {
    const onKey = vi.fn()
    render(<Harness onKey={onKey} />)
    fireEvent.keyDown(screen.getByLabelText('ô trả lời'), { key: '2' })
    expect(onKey).not.toHaveBeenCalled()
  })

  it('Enter khi đang đứng TRÊN NÚT → để nút tự bấm, không chạy phím tắt Enter', () => {
    // Không có luật này thì một cú Enter chạy hai việc: bấm nút đang focus
    // VÀ nộp bài — đúng kiểu "chọn xong tự nộp luôn" mà người học không kịp
    // hiểu chuyện gì vừa xảy ra.
    const onKey = vi.fn()
    render(<Harness onKey={onKey} />)
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
    expect(onKey).not.toHaveBeenCalledWith('enter')
  })

  it('phím số VẪN chạy khi đang đứng trên nút — chỉ Enter/Space mới phải nhường', () => {
    const onKey = vi.fn()
    render(<Harness onKey={onKey} />)
    fireEvent.keyDown(screen.getByRole('button'), { key: '1' })
    expect(onKey).toHaveBeenCalledWith('số 1')
  })

  it('tổ hợp có Ctrl/Alt/Meta là phím tắt của trình duyệt, không cướp', () => {
    const onKey = vi.fn()
    render(<Harness onKey={onKey} />)
    fireEvent.keyDown(window, { key: '1', ctrlKey: true })
    fireEvent.keyDown(window, { key: 'ArrowRight', metaKey: true })
    expect(onKey).not.toHaveBeenCalled()
  })

  it('phím không khai thì không đụng tới', () => {
    const onKey = vi.fn()
    render(<Harness onKey={onKey} />)
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    fireEvent.keyDown(window, { key: '7' })
    expect(onKey).not.toHaveBeenCalled()
  })

  it('tắt thì im hẳn, và gỡ listener khi rời màn', () => {
    const onKey = vi.fn()
    render(<Harness onKey={onKey} enabled={false} />)
    fireEvent.keyDown(window, { key: '1' })
    expect(onKey).not.toHaveBeenCalled()

    cleanup()
    const live = vi.fn()
    const { unmount } = render(<Harness onKey={live} />)
    unmount()
    fireEvent.keyDown(window, { key: '1' })
    expect(live).not.toHaveBeenCalled()
  })
})
