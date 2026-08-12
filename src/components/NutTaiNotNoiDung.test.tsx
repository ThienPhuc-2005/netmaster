// @vitest-environment jsdom
// Nút "tải nốt nội dung" — hai lời hứa của khối 21.56 (ý N1 + N2).
//
//  1. Đang kéo thì ĐẾM ĐƯỢC (`đã về 15/21`), không đứng im ở "Đang tải…".
//     Với mạng yếu, vài chục giây im lặng khó phân biệt với treo.
//  2. Mạng về thì TỰ thử lại — nhưng máy tự làm thì phải HỎI trước khi
//     tải lại trang. Người bấm là họ đang chờ kết quả, tải lại luôn được;
//     máy tự làm mà tải lại là giật trang khỏi tay người đang đọc dở.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { NutTaiNotNoiDung } from './NutTaiNotNoiDung'

/** Kho nội dung giả — mỗi test tự dựng số gói đã về / còn thiếu. */
const daVe = vi.fn<() => number>()
const conThieu = vi.fn<() => number>()
const keo = vi.fn<(bao?: () => void) => Promise<unknown>>()

vi.mock('../content', async (importOriginal) => {
  const thuc = await importOriginal<typeof import('../content')>()
  return {
    ...thuc,
    tongSoModule: () => 21,
    soDaVe: () => daVe(),
    soModuleThieu: () => conThieu(),
    primeModules: (bao?: () => void) => keo(bao),
  }
})

/** Bắt `window.location.reload` để biết trang CÓ bị tải lại hay không. */
let taiLai: ReturnType<typeof vi.fn>

beforeEach(() => {
  taiLai = vi.fn()
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, reload: taiLai },
  })
  daVe.mockReturnValue(12)
  conThieu.mockReturnValue(9)
  keo.mockReset()
})
afterEach(cleanup)

describe('đếm tiến độ trong lúc kéo (N1)', () => {
  it('mỗi gói về là con số nhích lên, không đứng im ở "Đang tải…"', async () => {
    let bao: (() => void) | undefined
    keo.mockImplementation((cb) => {
      bao = cb
      return new Promise(() => undefined) // treo lại để soi lúc đang kéo
    })
    render(<NutTaiNotNoiDung />)
    fireEvent.click(screen.getByRole('button', { name: 'Tải nốt phần còn lại' }))

    expect(screen.getByRole('button', { name: /Đang tải… 12\/21/ })).toBeTruthy()
    // Gói thứ 13 về.
    daVe.mockReturnValue(13)
    act(() => bao?.())
    expect(screen.getByRole('button', { name: /Đang tải… 13\/21/ })).toBeTruthy()
  })

  it('đang kéo thì nút khoá lại — hai lượt chồng nhau chỉ tổ đếm loạn', () => {
    keo.mockImplementation(() => new Promise(() => undefined))
    render(<NutTaiNotNoiDung />)
    fireEvent.click(screen.getByRole('button', { name: 'Tải nốt phần còn lại' }))
    expect(screen.getByRole('button', { name: /Đang tải…/ })).toHaveProperty('disabled', true)
  })
})

describe('mạng về thì tự thử lại (N2)', () => {
  it('có sự kiện online là tự kéo, không đợi ai bấm', async () => {
    keo.mockResolvedValue([])
    render(<NutTaiNotNoiDung />)
    await act(async () => {
      window.dispatchEvent(new Event('online'))
    })
    expect(keo).toHaveBeenCalled()
  })

  it('MÁY tự kéo được thêm thì HỎI, không tự tải lại trang', async () => {
    keo.mockImplementation(async () => {
      conThieu.mockReturnValue(0) // về đủ rồi
      return []
    })
    render(<NutTaiNotNoiDung />)
    await act(async () => {
      window.dispatchEvent(new Event('online'))
    })

    expect(screen.getByText(/Mạng về rồi/)).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Dùng ngay' })).toBeTruthy()
    expect(taiLai, 'máy tự tải lại là giật trang khỏi tay người đang đọc').not.toHaveBeenCalled()
  })

  it('NGƯỜI bấm mà kéo được thêm thì tải lại luôn — họ đang chờ kết quả', async () => {
    keo.mockImplementation(async () => {
      conThieu.mockReturnValue(0)
      return []
    })
    render(<NutTaiNotNoiDung />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Tải nốt phần còn lại' }))
    })
    expect(taiLai).toHaveBeenCalled()
  })

  it('mạng về mà kéo vẫn hụt thì nói thật, không hứa hão', async () => {
    keo.mockResolvedValue([]) // conThieu giữ nguyên 9 → không được gì
    render(<NutTaiNotNoiDung />)
    await act(async () => {
      window.dispatchEvent(new Event('online'))
    })
    expect(screen.getByText(/Vẫn chưa tải được/)).toBeTruthy()
    expect(taiLai).not.toHaveBeenCalled()
  })

  it('đã đủ nội dung thì sự kiện online KHÔNG gọi kéo nữa', async () => {
    conThieu.mockReturnValue(0)
    render(<NutTaiNotNoiDung />)
    await act(async () => {
      window.dispatchEvent(new Event('online'))
    })
    expect(keo).not.toHaveBeenCalled()
  })

  it('gỡ khỏi màn thì thôi nghe sự kiện online', async () => {
    keo.mockResolvedValue([])
    const { unmount } = render(<NutTaiNotNoiDung />)
    unmount()
    await act(async () => {
      window.dispatchEvent(new Event('online'))
    })
    expect(keo).not.toHaveBeenCalled()
  })
})
