// @vitest-environment jsdom
// Phím tắt một tay TRÊN CÂU HỎI THẬT (kho ý tưởng E3).
//
// Cái đáng gác nhất ở đây không phải "phím 2 có chạy không", mà là: phím
// số chọn theo VỊ TRÍ NGƯỜI HỌC ĐANG NHÌN, còn thứ nộp lên vẫn là CHỈ SỐ
// GỐC của nội dung. Lựa chọn được xáo mỗi lần render (chống cue vị trí),
// nên nhầm hai hệ đánh số này là chấm sai đúng những người bấm nhanh.

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { QuestionInput } from './QuestionInput'
import { QuestionSchema, type Question } from '../engine/contentSchema'

const MCQ = QuestionSchema.parse({
  kind: 'mcq',
  id: 'ui-keys-mcq',
  prompt: { vi: 'Thiết bị nào nối hai mạng khác nhau?' },
  choices: [{ vi: 'Switch' }, { vi: 'Router' }, { vi: 'Hub' }],
  answerIndex: 1,
  explain: { vi: 'Router đứng giữa hai mạng.' },
}) as Question

const ORDER = QuestionSchema.parse({
  kind: 'order',
  id: 'ui-keys-order',
  prompt: { vi: 'Xếp đúng thứ tự DORA.' },
  items: [{ vi: 'Discover' }, { vi: 'Offer' }, { vi: 'Request' }],
  correctOrder: [0, 1, 2],
  explain: { vi: 'D-O-R-A.' },
}) as Question

/**
 * Nhãn đang hiện ở vị trí thứ `position` trên màn hình (đã bị xáo). Đọc
 * qua TÊN TRỢ NĂNG chứ không phải textContent: con số phím tắt là chữ
 * aria-hidden nên nó không nằm trong tên — đúng thứ ta muốn so.
 */
function labelAt(position: number): string {
  return screen.getAllByRole('button')[position]!.getAttribute('aria-label') ?? textOf(position)
}

function textOf(position: number): string {
  return screen.getAllByRole('button')[position]!.textContent!.replace(/^\d+/, '').trim()
}

afterEach(cleanup)

describe('trắc nghiệm — phím số', () => {
  it('bấm số chọn đúng lựa chọn ĐANG ĐỨNG ở vị trí đó, nộp lên là chỉ số gốc', () => {
    const onSubmit = vi.fn()
    render(<QuestionInput question={MCQ} onSubmit={onSubmit} />)
    // Vị trí 2 trên màn hình là lựa chọn nào thì nộp lên phải là chính nó,
    // dù thứ tự đã bị xáo.
    const shown = labelAt(1)
    fireEvent.keyDown(window, { key: '2' })
    const expectedIndex = ['Switch', 'Router', 'Hub'].indexOf(shown)
    expect(onSubmit).toHaveBeenCalledWith({ kind: 'mcq', choiceIndex: expectedIndex })
  })

  it('mỗi lựa chọn có con số in kèm — phím tắt không ai thấy là phím tắt không ai dùng', () => {
    render(<QuestionInput question={MCQ} onSubmit={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
    buttons.forEach((b, i) => {
      expect(b.textContent, `lựa chọn thứ ${i + 1}`).toMatch(new RegExp(`^${i + 1}\\D`))
    })
  })

  it('con số KHÔNG chui vào tên nút — trình đọc màn hình vẫn đọc đúng nội dung lựa chọn', () => {
    render(<QuestionInput question={MCQ} onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Router' })).toBeTruthy()
  })

  it('số ngoài phạm vi không làm gì', () => {
    const onSubmit = vi.fn()
    render(<QuestionInput question={MCQ} onSubmit={onSubmit} />)
    fireEvent.keyDown(window, { key: '9' })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('câu đang khóa (đã trả lời xong) thì phím tắt im', () => {
    const onSubmit = vi.fn()
    render(<QuestionInput question={MCQ} onSubmit={onSubmit} disabled />)
    fireEvent.keyDown(window, { key: '1' })
    expect(onSubmit).not.toHaveBeenCalled()
  })
})

describe('xếp thứ tự — phím số dồn theo danh sách còn lại, Enter nộp', () => {
  it('chọn hết bằng phím số rồi Enter nộp, thứ tự nộp đúng thứ tự bấm', () => {
    const onSubmit = vi.fn()
    render(<QuestionInput question={ORDER} onSubmit={onSubmit} />)

    // Luôn bấm phím "1": danh sách co lại sau mỗi lần chọn nên con số dồn
    // lên — đúng cái người học nhìn thấy trên màn hình.
    const picked: string[] = []
    for (let i = 0; i < 3; i++) {
      picked.push(labelAt(0))
      fireEvent.keyDown(window, { key: '1' })
    }

    fireEvent.keyDown(window, { key: 'Enter' })
    const names = ['Discover', 'Offer', 'Request']
    expect(onSubmit).toHaveBeenCalledWith({ kind: 'order', order: picked.map((p) => names.indexOf(p)) })
  })

  it('chưa xếp đủ thì Enter KHÔNG nộp — nộp nửa chừng là đốt oan một bậc thang gợi ý', () => {
    const onSubmit = vi.fn()
    render(<QuestionInput question={ORDER} onSubmit={onSubmit} />)
    fireEvent.keyDown(window, { key: '1' })
    fireEvent.keyDown(window, { key: 'Enter' })
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
