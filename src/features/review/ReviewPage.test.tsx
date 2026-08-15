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
import { NGUONG_HAY_QUEN } from '../../engine/mistakeLog'

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

/**
 * Lật thẻ. Ở lượt chấm ĐẦU, nút lật CHÍNH LÀ nút tự chấm độ chắc (kho ý
 * tưởng A2) — mặc định chọn "Lơ mơ" để các test cũ đo đúng thứ chúng
 * vốn đo; vòng học lại thì vẫn là nút "Hiện đáp án" như trước.
 */
function reveal(confidence: 'Mình chắc' | 'Lơ mơ' | 'Chịu' = 'Lơ mơ') {
  const relearn = screen.queryByRole('button', { name: /Hiện đáp án/ })
  if (relearn !== null) {
    fireEvent.click(relearn)
    return
  }
  fireEvent.click(screen.getByRole('button', { name: confidence }))
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

describe('tự chấm độ chắc trước khi lật (kho ý tưởng A2)', () => {
  function renderReview() {
    seedTwoDueCards()
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
  }

  it('hỏi độ chắc TRƯỚC khi lật, và chính nút đó lật thẻ (không thêm cú bấm)', () => {
    renderReview()
    expect(screen.getByText(/bạn thấy mình chắc tới đâu/)).toBeDefined()
    // Chưa lật thì chưa có nút tự chấm nhớ/quên.
    expect(screen.queryByRole('button', { name: /Mình nhớ/ })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Mình chắc' }))
    expect(screen.getByRole('button', { name: /Mình nhớ/ })).toBeDefined()
  })

  it('thấy chắc mà không nhớ ra → nói thẳng về ảo giác quen mặt', () => {
    renderReview()
    reveal('Mình chắc')
    answer(false)
    expect(screen.getByText(/ảo giác quen mặt/)).toBeDefined()
  })

  it('nói chịu mà vẫn nhớ ra → chỉ ra chuyện tự đánh giá thấp mình', () => {
    renderReview()
    reveal('Chịu')
    answer(true)
    expect(screen.getByText(/đánh giá mình thấp hơn thực tế/)).toBeDefined()
  })

  it('tự chấm khớp thì IM LẶNG — khen mỗi lượt đúng là nhiễu', () => {
    renderReview()
    reveal('Mình chắc')
    answer(true)
    expect(screen.queryByText(/ảo giác quen mặt/)).toBeNull()
    expect(screen.queryByText(/đánh giá mình thấp hơn thực tế/)).toBeNull()
  })

  it('vòng học lại KHÔNG hỏi độ chắc nữa — lúc đó người học đã biết đáp án', () => {
    renderReview()
    reveal('Lơ mơ')
    answer(false) // thẻ 1 quên → quay lại cuối phiên
    reveal('Lơ mơ')
    answer(true) // thẻ 2
    expect(screen.getByText('thẻ học lại')).toBeDefined()
    expect(screen.queryByRole('button', { name: 'Mình chắc' })).toBeNull()
    expect(screen.getByRole('button', { name: /Hiện đáp án/ })).toBeDefined()
  })

  it('tự chấm KHÔNG cộng XP và không đụng lịch SM-2 — chỉ là phép đo của người học', () => {
    renderReview()
    reveal('Mình chắc')
    answer(true)
    const after = useProgress.getState()
    const xpSure = after.xpTotal
    const dueDates = after.reviewCards.map((c) => c.dueDate)

    cleanup()
    useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
    renderReview()
    reveal('Chịu')
    answer(true)
    const other = useProgress.getState()
    // Cùng một kết quả "nhớ được", độ chắc khác nhau → store y hệt nhau.
    expect(other.xpTotal).toBe(xpSure)
    expect(other.reviewCards.map((c) => c.dueDate)).toEqual(dueDates)
  })
})

describe('xoay cách hỏi trên thẻ (kho ý tưởng H5)', () => {
  /** Đặt thẻ severity của Module 20 vào hộp ở đúng một mốc SM-2. */
  function seedSeverityCard(intervalIndex: 0 | 1 | 2 | 3 | 4) {
    const yesterday = addDays(todayIso(), -1)
    useProgress.setState({
      reviewCards: [{ ...createCard('m20-severity', 'module-20', yesterday), intervalIndex }],
    })
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
  }

  it('thẻ mới: hỏi xuôi', () => {
    seedSeverityCard(0)
    expect(screen.getByText(/Đọc 8 mức syslog/)).toBeDefined()
  })

  it('sau một lượt nhớ được: cùng thẻ đó hỏi bằng chỗ khuyết', () => {
    seedSeverityCard(1)
    expect(screen.getByText(/Em Ăn ___ Em Với ___ Iu Đi/)).toBeDefined()
    // Mặt sau KHÔNG đổi theo cách hỏi — nó phải trả lời được cả hai.
    reveal()
    expect(screen.getByText(/0 Emergency, 1 Alert, 2 Critical/)).toBeDefined()
  })

  it('thẻ quên rồi quay lại trong phiên vẫn giữ NGUYÊN câu hỏi vừa trượt', () => {
    // Chấm "chưa nhớ" đẩy lapses lên 1, tức là đổi mốc xoay. Nếu đọc mốc
    // đó lúc render thì vòng học lại sẽ hỏi một câu khác — người học tưởng
    // mình đang học lại thẻ này, thực ra đang gặp thẻ khác.
    seedSeverityCard(1)
    const asked = /Em Ăn ___ Em Với ___ Iu Đi/
    expect(screen.getByText(asked)).toBeDefined()
    reveal()
    answer(false)
    expect(screen.getByText('thẻ học lại')).toBeDefined()
    expect(screen.getByText(asked)).toBeDefined()
  })
})

// ---------------------------------------------------------------
// Hai con số của phiên phải KHỚP nhau (J7) + màn đóng có NÚT (J8)
// ---------------------------------------------------------------
//
// Lượt rà soát 08-12 bắt được: tiêu đề đếm thẻ CÒN đến hạn (tụt dần theo
// từng câu trả lời) trong khi bộ đếm ngay dưới đếm thẻ TRONG PHIÊN (tăng
// khi có thẻ học lại) — người học đọc cùng lúc thấy app tự mâu thuẫn.

describe('J7 — tiêu đề và bộ đếm nói cùng một con số', () => {
  function moPhien() {
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
  }

  it('vào phiên: tiêu đề nói đúng số thẻ của phiên, khớp bộ đếm', () => {
    seedTwoDueCards()
    moPhien()
    expect(screen.getByText(/Phiên hôm nay 2 thẻ/)).toBeTruthy()
    expect(screen.getByText('Thẻ 1/2')).toBeTruthy()
  })

  it('thẻ học lại làm phiên dài ra thì CẢ HAI cùng dài ra', () => {
    seedTwoDueCards()
    moPhien()
    reveal()
    answer(false) // quên → thẻ nối vào cuối phiên
    expect(screen.getByText('Thẻ 2/3')).toBeTruthy()
    expect(screen.getByText(/Phiên hôm nay 3 thẻ/)).toBeTruthy()
  })

  it('nợ vượt trần phiên thì nói thêm phần để dành, không giấu', () => {
    // 17 thẻ đến hạn: phiên lấy 15, còn 2 thẻ để phiên sau.
    const m1 = loadModules()[0]!
    const yesterday = addDays(todayIso(), -1)
    const concepts = loadModules()
      .flatMap((m) => m.concepts.filter((c) => c.flashcard !== undefined).map((c) => ({ c, m })))
      .slice(0, 17)
    expect(concepts).toHaveLength(17)
    useProgress.setState({
      reviewCards: concepts.map(({ c, m }) => createCard(c.id, m.id, yesterday)),
    })
    expect(m1).toBeDefined()
    moPhien()
    expect(screen.getByText(/Phiên hôm nay 15 thẻ/)).toBeTruthy()
    expect(screen.getByText(/Còn 2 thẻ nữa cũng đến hạn/)).toBeTruthy()
  })
})

describe('J8 — màn đóng phiên đưa một NÚT, không phải một dòng chữ', () => {
  it('ôn hết thẻ xong: "Sang học bài mới" là nút đặc màu nhấn', () => {
    seedTwoDueCards()
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
    for (let i = 0; i < 2; i += 1) {
      reveal()
      answer(true)
    }
    const cua = screen.getByRole('link', { name: /Sang học bài mới/ })
    // Nút đặc = nền màu nhấn + chữ nghịch màu, cùng lối với mọi màn đóng
    // khác của app; link chữ trơn thì không có hai thứ này.
    expect(cua.className).toContain('bg-accent')
    expect(cua.className).toContain('text-accent-contrast')
  })
})

// Thẻ mồ côi lọt vào hộp (nội dung đổi giữa chừng) — phiên ôn PHẢI bỏ
// qua, không được trả về màn trắng (phát hiện K1, khối 21.46).
describe('K1 — phiên ôn không bao giờ ra màn trắng vì thẻ mồ côi', () => {
  function seedLanhVaMoCoi() {
    const m1 = loadModules()[0]!
    const concept = m1.concepts.find((c) => c.flashcard !== undefined)!
    const yesterday = addDays(todayIso(), -1)
    useProgress.setState({
      reviewCards: [
        createCard('khai-niem-da-bi-xoa', m1.id, yesterday),
        createCard(concept.id, m1.id, yesterday),
      ],
    })
    return concept.id
  }

  it('vẫn dựng được phiên, chỉ gồm thẻ còn nội dung', () => {
    seedLanhVaMoCoi()
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Thẻ 1/1')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Mình chắc' })).toBeTruthy()
  })

  it('hộp TOÀN thẻ mồ côi: nói tử tế là hôm nay không có gì để ôn, không để trang trắng', () => {
    const m1 = loadModules()[0]!
    useProgress.setState({
      reviewCards: [createCard('da-xoa-1', m1.id, addDays(todayIso(), -1))],
    })
    const { container } = render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
    expect(container.textContent?.trim().length).toBeGreaterThan(0)
    expect(screen.getByText('Hôm nay không có thẻ đến hạn')).toBeTruthy()
  })
})

describe('cửa "chưa hiểu" trên thẻ ôn (chủ dự án hỏi 08-15)', () => {
  /** Một thẻ duy nhất, sinh từ concept thật để có ẩn dụ + hình + bài gốc. */
  function seedMotThe(lapses = 0) {
    const m1 = loadModules()[0]!
    const concept = m1.concepts.find((c) => c.flashcard !== undefined)!
    useProgress.setState({
      reviewCards: [{ ...createCard(concept.id, m1.id, addDays(todayIso(), -1)), lapses }],
    })
    return concept
  }

  /** Chữ đang hiện trên màn — so nguyên văn, khỏi phải thoát regex. */
  function chuTrenMan(): string {
    return document.body.textContent ?? ''
  }

  it('KHÔNG hiện trước khi lật — ẩn dụ đọc trước là gợi ý miễn phí', () => {
    const concept = seedMotThe()
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
    expect(screen.queryByRole('button', { name: /Chưa hiểu chỗ này/ })).toBeNull()
    expect(chuTrenMan()).not.toContain(concept.glossVi)
    expect(chuTrenMan()).not.toContain(concept.metaphor.vi)
  })

  it('lật xong, bấm vào là có CÁCH NÓI KHÁC: ẩn dụ, giải nghĩa, và đường về bài', () => {
    const concept = seedMotThe()
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
    reveal()
    fireEvent.click(screen.getByRole('button', { name: /Chưa hiểu chỗ này/ }))
    expect(chuTrenMan()).toContain(concept.metaphor.vi)
    expect(chuTrenMan()).toContain(concept.glossVi)
    const link = screen.getByRole('link', { name: /Mở lại bài/ })
    expect(link.getAttribute('href')).toMatch(/^\/bai\//)
  })

  it('thẻ đã quên tới ngưỡng thì app tự nói ra rằng có thể là chưa hiểu', () => {
    seedMotThe(NGUONG_HAY_QUEN)
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
    reveal()
    expect(screen.getByText(/chưa hiểu hẳn/)).toBeTruthy()
  })

  it('sang thẻ khác thì cửa tự đóng lại', () => {
    seedTwoDueCards()
    render(
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>,
    )
    reveal()
    fireEvent.click(screen.getByRole('button', { name: /Chưa hiểu chỗ này/ }))
    expect(screen.getByRole('button', { name: /Thu gọn/ })).toBeTruthy()
    answer(true)
    reveal()
    expect(screen.queryByRole('button', { name: /Thu gọn/ })).toBeNull()
    expect(screen.getByRole('button', { name: /Chưa hiểu chỗ này/ })).toBeTruthy()
  })
})
