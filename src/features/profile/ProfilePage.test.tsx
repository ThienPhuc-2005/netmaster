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
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ProfilePage } from './ProfilePage'
import { todayIso, useProgress } from '../../store/progress'
import { addDays } from '../../engine/dates'
import { loadModules } from '../../content'

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

describe('so với chính mình tháng trước (I3)', () => {
  /** Một mốc cũ đủ mẫu, cùng dạng câu với bảng phân tích dựng dưới đây. */
  const mocCu = (thang: string, attempted: number, stumbled: number) => ({
    thang,
    ngay: `${thang}-01`,
    theoDang: { typed: { attempted, stumbled } },
  })

  /**
   * Dựng chỗ vấp THẬT trên nội dung thật: gom `tong` câu gõ tay (đi qua
   * nhiều bài nếu một bài không đủ), đánh dấu tất cả đã giải xong —
   * bảng phân tích chỉ đếm câu `solved` — và cho `soVap` câu trong đó
   * mang dấu vấp. Trả về đúng số câu đã dựng.
   */
  function dungVap(soVap: number, tong = 8) {
    const runtimes: Record<string, unknown> = {}
    let daCo = 0
    for (const lesson of loadModules().flatMap((m) => m.lessons)) {
      if (daCo >= tong) break
      const typed = [
        ...lesson.steps[3].exercises.map((e) => e.question),
        ...lesson.steps[4].questions.map((e) => e.question),
      ].filter((q) => q.kind === 'typed')
      if (typed.length === 0) continue
      const exercises: Record<string, unknown> = {}
      for (const q of typed) {
        if (daCo >= tong) break
        exercises[q.id] = { failCount: daCo < soVap ? 2 : 0, solved: true, usedSolution: false }
        daCo += 1
      }
      runtimes[lesson.id] = {
        lessonId: lesson.id,
        stepIndex: 5,
        teachScreenIndex: 0,
        pretestAnswers: {},
        exercises,
        selfExplain: { attempts: 1, passed: true, done: true },
        completed: true,
      }
    }
    useProgress.setState({ lessonRuntimes: runtimes as never })
    return daCo
  }

  it('chưa có mốc tháng nào khác thì nói thẳng là đang chờ, không bịa số', () => {
    dungVap(1)
    renderProfile()
    expect(screen.getByText('So với chính mình tháng trước')).toBeTruthy()
    expect(screen.getByText(/Sang tháng sau/)).toBeTruthy()
  })

  it('mở trang lần đầu trong tháng thì tự cất mốc', () => {
    dungVap(1)
    renderProfile()
    expect(useProgress.getState().latCatThang).toHaveLength(1)
  })

  it('có mốc tháng trước thì so tỉ lệ và nói bạn đã lên', () => {
    const tong = dungVap(1) // giờ vấp 1/8
    useProgress.setState({ latCatThang: [mocCu('2026-01', tong, tong)] }) // hồi đó vấp 100%
    renderProfile()
    // Tìm trong ĐÚNG mục này: "Câu gõ tay" còn xuất hiện ở bảng phân
    // tích ngay dưới, tìm cả trang thì đụng hai chỗ.
    const muc = within(screen.getByRole('region', { name: 'So với chính mình tháng trước' }))
    expect(muc.getByText('Câu gõ tay')).toBeTruthy()
    expect(muc.getByText(`100% → ${Math.round((1 / tong) * 100)}%`)).toBeTruthy()
    expect(muc.getByText('đã lên')).toBeTruthy()
  })

  it('vấp nhiều lên thì NÓI THẲNG, không giấu tin xấu', () => {
    const tong = dungVap(3)
    useProgress.setState({ latCatThang: [mocCu('2026-01', tong, 0)] }) // hồi đó không vấp câu nào
    renderProfile()
    expect(screen.getByText('còn nặng hơn')).toBeTruthy()
  })

  it('mốc cũ mẫu quá mỏng thì không phán một chữ nào', () => {
    dungVap(1)
    useProgress.setState({ latCatThang: [mocCu('2026-01', 2, 2)] })
    renderProfile()
    expect(screen.getByText('chưa đủ mẫu để nói')).toBeTruthy()
  })
})

describe('quãng ngồi liền dài nhất trong tuần', () => {
  /** Thẻ nếp học chỉ dựng khi có việc đã làm — cấp cho nó một tuần có bài. */
  function coNepHoc() {
    useProgress.setState({ completedLessons: { 'm1-bai-1': todayIso() } })
  }

  it('có kỷ lục thì nói ra kèm chỗ tựa là tuần trước', () => {
    coNepHoc()
    useProgress.setState({
      quangHoc: { [todayIso()]: 34, [addDays(todayIso(), -7)]: 52 },
    })
    renderProfile()
    expect(screen.getByText(/ngồi liền lâu nhất 34 phút/)).toBeTruthy()
    expect(screen.getByText(/Tuần trước là 52 phút/)).toBeTruthy()
  })

  it('quãng dài quá thì nói thẳng cái giá, KHÔNG khen', () => {
    // App vừa rủ người ta nghỉ sau 25 phút thì không thể quay lại vỗ tay
    // vì họ ngồi liền 90 phút.
    coNepHoc()
    useProgress.setState({ quangHoc: { [todayIso()]: 90 } })
    renderProfile()
    expect(screen.getByText(/đè lên phần trước/)).toBeTruthy()
  })

  it('quãng vừa phải thì KHÔNG kèm lời nhắc nào', () => {
    coNepHoc()
    useProgress.setState({ quangHoc: { [todayIso()]: 28 } })
    renderProfile()
    expect(screen.queryByText(/đè lên phần trước/)).toBeNull()
  })

  it('tuần này chưa ngồi buổi nào thì không dựng dòng rỗng', () => {
    coNepHoc()
    useProgress.setState({ quangHoc: { [addDays(todayIso(), -7)]: 41 } })
    renderProfile()
    expect(screen.queryByText(/ngồi liền lâu nhất/)).toBeNull()
  })
})

describe('bản tự lưu trên máy (F3)', () => {
  const anh = (ngay: string, xp: number) => ({
    luc: `${ngay}T09:12:00`,
    ngay,
    version: 6,
    lyDo: 'dinh-ky' as const,
    duLieu: JSON.stringify({ state: { xpTotal: xp }, version: 6 }),
  })

  it('chưa có bản nào thì nói thẳng là chưa có, không giấu mục đi', () => {
    // Khác mục "hay vấp": ở đó rỗng là chưa đủ dữ liệu để nói gì, còn ở
    // đây rỗng vẫn là một thông tin — người học cần biết máy có đang tự
    // cất bản nào cho mình không.
    renderProfile()
    expect(screen.getByText('Bản tự lưu trên máy')).toBeTruthy()
    expect(screen.getByText(/Chưa có bản nào/)).toBeTruthy()
  })

  it('hiện từng bản kèm giờ và lý do cất', () => {
    localStorage.setItem(
      'netmaster-anh-chup',
      JSON.stringify({
        danhSach: [
          { ...anh('2026-08-11', 300), lyDo: 'truoc-nang-cap' },
          anh('2026-08-10', 250),
        ],
      }),
    )
    renderProfile()
    expect(screen.getByText('11/08 09:12')).toBeTruthy()
    expect(screen.getByText('cất trước khi nâng cấp dữ liệu')).toBeTruthy()
    expect(screen.getAllByRole('button', { name: 'Lùi về bản này' })).toHaveLength(2)
  })

  it('lùi về một bản thì ghi đè key tiến độ — và cất bản đang có trước đã', () => {
    localStorage.setItem('netmaster-progress', JSON.stringify({ state: { xpTotal: 999 }, version: 6 }))
    localStorage.setItem('netmaster-anh-chup', JSON.stringify({ danhSach: [anh('2026-08-10', 250)] }))
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)
    try {
      renderProfile()
      fireEvent.click(screen.getByRole('button', { name: 'Lùi về bản này' }))
      expect(localStorage.getItem('netmaster-progress')).toContain('"xpTotal":250')
      const kho = JSON.parse(localStorage.getItem('netmaster-anh-chup')!) as {
        danhSach: { lyDo: string; duLieu: string }[]
      }
      expect(kho.danhSach[0]!.lyDo).toBe('truoc-khoi-phuc')
      expect(kho.danhSach[0]!.duLieu).toContain('"xpTotal":999')
    } finally {
      confirmSpy.mockRestore()
    }
  })

  it('bấm nhầm rồi bỏ qua hộp xác nhận thì KHÔNG đụng gì', () => {
    localStorage.setItem('netmaster-progress', JSON.stringify({ state: { xpTotal: 999 }, version: 6 }))
    localStorage.setItem('netmaster-anh-chup', JSON.stringify({ danhSach: [anh('2026-08-10', 250)] }))
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)
    try {
      renderProfile()
      fireEvent.click(screen.getByRole('button', { name: 'Lùi về bản này' }))
      expect(localStorage.getItem('netmaster-progress')).toContain('"xpTotal":999')
    } finally {
      confirmSpy.mockRestore()
    }
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
