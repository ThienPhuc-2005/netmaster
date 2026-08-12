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
import { docAnhChup } from '../../store/anhChup'

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

  it('file xuất gói cả sổ "giải thích chưa lọt" — cùng lý do với sổ góp ý', async () => {
    // Buổi test người thật chỉ gửi về ĐÚNG MỘT file JSON. Sổ này là kênh
    // duy nhất người test nói được "chỗ nào giảng chưa vào"; nằm ngoài
    // file là người soạn bài không bao giờ đọc được, tính năng coi như
    // không tồn tại.
    const chuaLot = [{ lessonId: 'm4-bai-2', questionId: 'm4-b2-prac-3', at: '2026-08-12' }]
    localStorage.setItem('netmaster-progress', JSON.stringify({ state: { giaiThichChuaLot: chuaLot }, version: 9 }))

    const originalCreate = URL.createObjectURL
    const originalRevoke = URL.revokeObjectURL
    const createObjectURL = vi.fn((_blob: Blob) => 'blob:test')
    URL.createObjectURL = createObjectURL as unknown as typeof URL.createObjectURL
    URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL
    try {
      renderProfile()
      fireEvent.click(screen.getByRole('button', { name: 'Xuất ra file' }))
      const blob = createObjectURL.mock.calls[0]![0]
      expect(await blob.text()).toContain('m4-b2-prac-3')
    } finally {
      URL.createObjectURL = originalCreate
      URL.revokeObjectURL = originalRevoke
    }
  })
})

describe('cửa nhập file sao lưu kiểm TỪNG THẺ (J1, khối 21.43)', () => {
  /** Dựng một File JSON như người học chọn từ máy. */
  function fileSaoLuu(reviewCards: unknown[]): File {
    const progress = JSON.stringify({
      state: { reviewCards, xpTotal: 120, passedModules: ['module-1'] },
      version: 8,
    })
    return new File(
      [JSON.stringify({ app: 'netmaster', data: { 'netmaster-progress': progress } })],
      'tien-do.json',
      { type: 'application/json' },
    )
  }

  const theLanh = {
    conceptId: 'goi-tin',
    moduleId: 'module-1',
    intervalIndex: 1,
    dueDate: '2026-08-12',
    lapses: 0,
    createdOn: '2026-07-20',
    lastReviewedOn: null,
  }

  async function nhap(file: File) {
    renderProfile()
    const o = document.querySelector('input[type="file"]') as HTMLInputElement
    Object.defineProperty(o, 'files', { value: [file] })
    fireEvent.change(o)
    // importBackup là async (đọc file) — nhường một nhịp cho nó chạy xong.
    await new Promise((r) => setTimeout(r, 20))
  }

  it('file có thẻ MÉO bị từ chối, tiến độ đang có không bị đụng', async () => {
    const { createdOn: _bo, ...meo } = theLanh
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
    localStorage.setItem('netmaster-progress', JSON.stringify({ state: { xpTotal: 777 }, version: 8 }))
    try {
      await nhap(fileSaoLuu([theLanh, meo]))
      expect(alert).toHaveBeenCalled()
      // Chặn ở cửa: tiến độ cũ còn nguyên để thử lại bằng file khác.
      expect(localStorage.getItem('netmaster-progress')).toContain('"xpTotal":777')
    } finally {
      alert.mockRestore()
      confirm.mockRestore()
    }
  })

  it('file lành thì vẫn nhập được như cũ', async () => {
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
    try {
      await nhap(fileSaoLuu([theLanh]))
      expect(alert).not.toHaveBeenCalled()
      expect(localStorage.getItem('netmaster-progress')).toContain('"xpTotal":120')
    } finally {
      alert.mockRestore()
      confirm.mockRestore()
    }
  })

  // L2 (lượt rà soát màn hiếm gặp): nhập file cũng là một thao tác GHI ĐÈ
  // trọn tiến độ, y như nút "Lùi về bản này" nằm ngay dưới nó — mà chỉ
  // nút kia có lưới đỡ. Chọn nhầm file là mất sạch bằng chính thao tác đi
  // cứu dữ liệu.
  it('nhập file thì CẤT BẢN ĐANG CÓ trước khi ghi đè', async () => {
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
    localStorage.setItem('netmaster-progress', JSON.stringify({ state: { xpTotal: 777 }, version: 8 }))
    try {
      await nhap(fileSaoLuu([theLanh]))
      expect(localStorage.getItem('netmaster-progress')).toContain('"xpTotal":120')
      const banCat = docAnhChup()
      const truocNhap = banCat.find((a) => a.lyDo === 'truoc-nhap')
      expect(truocNhap, 'nhập xong mà không có bản lùi nào').toBeDefined()
      expect(truocNhap?.duLieu).toContain('"xpTotal":777')
    } finally {
      alert.mockRestore()
      confirm.mockRestore()
    }
  })

  it('file bị TỪ CHỐI thì không cất bản thừa — chưa ghi đè gì thì chưa cần lùi', async () => {
    const { createdOn: _bo, ...meo } = theLanh
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
    localStorage.setItem('netmaster-progress', JSON.stringify({ state: { xpTotal: 777 }, version: 8 }))
    try {
      await nhap(fileSaoLuu([theLanh, meo]))
      expect(docAnhChup().some((a) => a.lyDo === 'truoc-nhap')).toBe(false)
    } finally {
      alert.mockRestore()
      confirm.mockRestore()
    }
  })

  it('bỏ qua hộp xác nhận thì cũng không cất bản nào', async () => {
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false)
    localStorage.setItem('netmaster-progress', JSON.stringify({ state: { xpTotal: 777 }, version: 8 }))
    try {
      await nhap(fileSaoLuu([theLanh]))
      expect(localStorage.getItem('netmaster-progress')).toContain('"xpTotal":777')
      expect(docAnhChup().some((a) => a.lyDo === 'truoc-nhap')).toBe(false)
    } finally {
      alert.mockRestore()
      confirm.mockRestore()
    }
  })
})

describe('K4 — đồ thị nếp học không trốn đúng lúc đáng nói nhất', () => {
  it('người ĐÃ TỪNG HỌC mà tám tuần đều trống: vẫn hiện, kèm câu nói thật', () => {
    // Tám cột trống CHÍNH LÀ câu chuyện của người vừa nghỉ dài.
    useProgress.setState({ completedLessons: { 'm1-bai-1': '2026-05-08' } })
    renderProfile()
    expect(screen.getByRole('region', { name: 'Nếp học 8 tuần gần đây' })).toBeTruthy()
    expect(screen.getByText(/chưa ngồi học buổi nào/)).toBeTruthy()
  })

  it('người MỚI TINH thì vẫn ẩn — tám cột 0 chưa kể được gì', () => {
    renderProfile()
    expect(screen.queryByRole('region', { name: 'Nếp học 8 tuần gần đây' })).toBeNull()
  })

  it('có hoạt động trong 8 tuần thì đọc câu baseline như cũ', () => {
    useProgress.setState({ completedLessons: { 'm1-bai-1': todayIso() } })
    renderProfile()
    expect(screen.getByText(/baseline của chính bạn/)).toBeTruthy()
    expect(screen.queryByText(/chưa ngồi học buổi nào/)).toBeNull()
  })
})

describe('K2 — số đóng băng là con số của HÔM NAY', () => {
  it('state còn ghi 0 của tháng cũ thì Hồ sơ vẫn hiện đủ quỹ tháng này', () => {
    useProgress.setState({
      streak: { current: 0, lastActiveDate: '2026-05-10', freezesLeft: 0, freezeMonth: '2026-05' },
    })
    renderProfile()
    const the = screen.getByText('Đóng băng còn lại').closest('div')?.parentElement
    expect(the?.textContent).toContain('2')
  })
})

// "Thứ bạn hay quên" (chủ dự án hỏi 08-12: "sao nó vẫn chưa có cái chỗ
// xem những câu hay quên").
//
// App đã có "chỗ hay vấp" nhưng đó là chuyện KHÁC: vấp đếm số lần thử
// sai lúc đang học bài, còn mục này đọc `lapses` của SM-2 — số lần đã
// học xong rồi vẫn quên. `lapses` có sẵn từ ngày đầu mà chưa bao giờ
// được kể lại thành danh sách.
describe('thứ bạn hay quên', () => {
  const the = (id: string, moduleId: string, lapses: number) => ({
    conceptId: id,
    moduleId,
    intervalIndex: 1 as const,
    dueDate: todayIso(),
    lapses,
    createdOn: '2026-06-01',
    lastReviewedOn: null,
  })

  it('hiện thứ quên từ 2 lần, kèm số lần và đường mở lại bài', () => {
    useProgress.setState({ reviewCards: [the('goi-tin', 'module-1', 4)] })
    renderProfile()
    const muc = screen.getByRole('region', { name: /Thứ bạn hay quên/ })
    expect(within(muc).getByText(/quên 4 lần/)).toBeTruthy()
    expect(within(muc).getByRole('link', { name: /Mở lại bài/ }).getAttribute('href')).toMatch(/^\/bai\//)
  })

  it('quên MỘT lần thì không kể tên — chuyện thường của trí nhớ', () => {
    useProgress.setState({ reviewCards: [the('goi-tin', 'module-1', 1)] })
    renderProfile()
    const muc = screen.getByRole('region', { name: /Thứ bạn hay quên/ })
    // Soi DANH SÁCH chứ không dò chữ: câu báo trống cũng chứa cụm "quên
    // tới hai lần", nên dò chữ thì test tự bắt trúng chính nó.
    expect(within(muc).queryAllByRole('listitem')).toHaveLength(0)
  })

  it('có thứ để luyện thì mục đưa luôn đường LUYỆN LẠI đúng mấy thứ đó', () => {
    useProgress.setState({ reviewCards: [the('goi-tin', 'module-1', 3)] })
    renderProfile()
    const muc = screen.getByRole('region', { name: /Thứ bạn hay quên/ })
    const nut = within(muc).getByRole('link', { name: /Luyện lại đúng mấy thứ này/ })
    expect(nut.getAttribute('href')).toBe('/luyen-lai?nguon=hay-quen')
  })

  it('chưa có gì thì KHÔNG mời luyện — phiên rỗng là lời mời hụt', () => {
    useProgress.setState({ reviewCards: [] })
    renderProfile()
    const muc = screen.getByRole('region', { name: /Thứ bạn hay quên/ })
    expect(within(muc).queryByRole('link', { name: /Luyện lại/ })).toBeNull()
  })

  // Đây chính là lỗi người dùng gặp: các mục khác cùng trang TỰ ẨN khi
  // chưa có dữ liệu, nên người đi tìm "chỗ xem câu hay quên" không thấy
  // nó ở đâu và tưởng app không có tính năng này.
  it('CHƯA có gì để kể thì mục vẫn hiện, kèm câu nói rõ vì sao trống', () => {
    useProgress.setState({ reviewCards: [] })
    renderProfile()
    const muc = screen.getByRole('region', { name: /Thứ bạn hay quên/ })
    expect(within(muc).getByText(/Chưa có thứ nào bạn quên tới hai lần/)).toBeTruthy()
  })
})

describe('sổ "giải thích chưa lọt" ở trang Hồ sơ (ý N6)', () => {
  const dong = (questionId: string, lessonId = 'm1-bai-1') => ({ lessonId, questionId, at: '2026-08-12' })

  it('hiện đề bài đọc được + đường mở lại bài + nút bỏ dòng', () => {
    useProgress.setState({ giaiThichChuaLot: [dong('m1-b1-prac-1')] })
    renderProfile()
    const muc = screen.getByRole('region', { name: /Chỗ bạn thấy giải thích chưa lọt/ })
    expect(within(muc).getByRole('link', { name: /Mở lại bài/ }).getAttribute('href')).toBe('/bai/m1-bai-1')
    expect(within(muc).getByRole('button', { name: /Bỏ dòng này/ })).toBeTruthy()
  })

  it('KHÔNG trộn với sổ khiếu nại chấm — hai mục riêng, hai câu chuyện riêng', () => {
    useProgress.setState({
      giaiThichChuaLot: [dong('m1-b1-prac-1')],
      disputedAnswers: [{ lessonId: 'm1-bai-1', questionId: 'm1-b1-prac-2', answer: 'cái phong bì', at: '2026-08-10' }],
    })
    renderProfile()
    const chuaLot = screen.getByRole('region', { name: /Chỗ bạn thấy giải thích chưa lọt/ })
    // Câu của sổ kia không được lọt sang mục này.
    expect(within(chuaLot).queryByText(/Bạn đã gõ/)).toBeNull()
    expect(screen.getByText('Câu bạn cho là mình đúng'), 'sổ khiếu nại chấm phải còn nguyên').toBeTruthy()
  })

  it('bỏ một dòng thì nó biến mất khỏi store', () => {
    useProgress.setState({ giaiThichChuaLot: [dong('m1-b1-prac-1')] })
    renderProfile()
    const muc = screen.getByRole('region', { name: /Chỗ bạn thấy giải thích chưa lọt/ })
    fireEvent.click(within(muc).getByRole('button', { name: /Bỏ dòng này/ }))
    expect(useProgress.getState().giaiThichChuaLot).toEqual([])
  })

  it('chưa khai lần nào thì KHÔNG dựng mục rỗng', () => {
    renderProfile()
    expect(screen.queryByText('Chỗ bạn thấy giải thích chưa lọt')).toBeNull()
  })
})
