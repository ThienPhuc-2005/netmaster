// @vitest-environment jsdom
// Trang Hồ sơ — hai việc dễ hỏng câm lặng:
//
//  1. **Sổ "mình nghĩ câu này đúng" phải ĐI THEO file sao lưu.** Trong
//     buổi test người thật, người test chỉ gửi lại đúng một file JSON;
//     nếu sổ góp ý không nằm trong đó thì mọi câu họ khiếu nại ở lại
//     trên máy họ và người soạn bài không bao giờ đọc được — tính năng
//     coi như không tồn tại.
//  2. Dòng đến từ ĐỀ THI không có bài để mở (lessonId trống) — phải nói
//     ra chứ không dựng một link chết.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ProfilePage } from './ProfilePage'
import { useProgress } from '../../store/progress'

const INITIAL = useProgress.getInitialState()

function renderProfile() {
  render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

describe('sổ "mình nghĩ câu này đúng" ở trang Hồ sơ', () => {
  it('hiện nguyên văn câu người học gõ + đường mở lại bài', () => {
    useProgress.setState({
      disputedAnswers: [
        { lessonId: 'm1-bai-1', questionId: 'm1-b1-prac-1', answer: 'cái phong bì ấy', at: '2026-08-10' },
      ],
    })
    renderProfile()
    expect(screen.getByText('Câu bạn cho là mình đúng')).toBeTruthy()
    expect(screen.getByText(/Bạn đã gõ: cái phong bì ấy/)).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Mở lại bài' }).getAttribute('href')).toBe('/bai/m1-bai-1')
  })

  it('dòng đến từ ĐỀ THI nói rõ là câu đề thi, không dựng link chết', () => {
    useProgress.setState({
      disputedAnswers: [{ lessonId: '', questionId: 'm1-mt-2', answer: 'gói dữ liệu', at: '2026-08-10' }],
    })
    renderProfile()
    expect(screen.getByText('Câu này ở đề thi cuối module')).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Mở lại bài' })).toBeNull()
  })

  it('bỏ một dòng thì nó biến mất khỏi store', () => {
    useProgress.setState({
      disputedAnswers: [{ lessonId: 'm1-bai-1', questionId: 'm1-b1-prac-1', answer: 'sai gì đó', at: '2026-08-10' }],
    })
    renderProfile()
    fireEvent.click(screen.getByRole('button', { name: 'Bỏ dòng này' }))
    expect(useProgress.getState().disputedAnswers).toEqual([])
  })

  it('chưa khiếu nại lần nào thì KHÔNG dựng mục rỗng', () => {
    renderProfile()
    expect(screen.queryByText('Câu bạn cho là mình đúng')).toBeNull()
  })
})

describe('file sao lưu mang theo sổ góp ý', () => {
  it('nút xuất file gói cả sổ góp ý — nếu không, buổi test người thật mất sạch góp ý', async () => {
    const disputed = [
      { lessonId: 'm4-bai-2', questionId: 'm4-b2-ret-1', answer: 'mac của người gửi', at: '2026-08-10' },
    ]
    useProgress.setState({ disputedAnswers: disputed })
    // Nút xuất đọc thẳng localStorage (nó sao lưu KEY, không sao lưu state
    // trong bộ nhớ) — dựng đúng cái key đó.
    localStorage.setItem('netmaster-progress', JSON.stringify({ state: { disputedAnswers: disputed }, version: 5 }))

    const originalCreate = URL.createObjectURL
    const originalRevoke = URL.revokeObjectURL
    const createObjectURL = vi.fn((_blob: Blob) => 'blob:test')
    URL.createObjectURL = createObjectURL as unknown as typeof URL.createObjectURL
    URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL
    try {
      renderProfile()
      fireEvent.click(screen.getByRole('button', { name: 'Xuất ra file' }))
      expect(createObjectURL).toHaveBeenCalledOnce()
      const blob = createObjectURL.mock.calls[0]![0]
      const text = await blob.text()
      expect(text).toContain('m4-b2-ret-1')
      expect(text).toContain('mac của người gửi')
    } finally {
      URL.createObjectURL = originalCreate
      URL.revokeObjectURL = originalRevoke
    }
  })
})
