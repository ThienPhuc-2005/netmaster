// @vitest-environment jsdom
// Màn lỗi hệ thống — thứ người học chỉ gặp vào ngày tệ nhất, nên nó
// phải làm đúng MỘT việc: đưa họ ra khỏi chỗ hỏng.
//
// Bối cảnh (phát hiện J1, lượt rà soát 08-12): app mở ra là tự vào phiên
// ôn khi còn thẻ đến hạn. Nếu chính phiên ôn ném lỗi thì "Tải lại" chỉ
// đưa người học quay lại đúng chỗ vừa sập — vòng lặp kín, và trang Hồ sơ
// (nơi có nút lùi về bản tự lưu) không còn đường nào tới được.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { ManLoi, loiThanhChu } from './ManLoi'
import { translate } from '../i18n'
import { ANH_CHUP_KEY, PROGRESS_KEY } from '../store/anhChup'

const t = (key: string, params?: Record<string, string | number>) => translate('vi', key, params)

function tienDo(xp: number): string {
  return JSON.stringify({ state: { xpTotal: xp }, version: 8 })
}

beforeEach(() => {
  localStorage.clear()
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('màn lỗi luôn có đường ra khỏi chỗ hỏng', () => {
  it('có nút mở thẳng trang Hồ sơ, không đi qua router đang hỏng', () => {
    const assign = vi.fn()
    vi.spyOn(window, 'location', 'get').mockReturnValue({ ...window.location, assign } as Location)
    render(<ManLoi message="Cannot read properties of undefined" t={t} />)
    fireEvent.click(screen.getByRole('button', { name: 'Mở trang Hồ sơ' }))
    expect(assign).toHaveBeenCalledWith('/ho-so')
  })

  it('in nguyên văn lời máy nói — người cần hỗ trợ còn chụp lại được', () => {
    render(<ManLoi message="localeCompare of undefined" t={t} />)
    expect(screen.getByText(/localeCompare of undefined/)).toBeTruthy()
  })

  it('chưa có bản tự lưu nào thì KHÔNG hứa một nút không bấm được', () => {
    render(<ManLoi message="hỏng" t={t} />)
    expect(screen.queryByText(/Lùi về bản/)).toBeNull()
  })

  it('có bản tự lưu thì lùi về được NGAY TỪ MÀN LỖI — đường thoát thật', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(999))
    localStorage.setItem(
      ANH_CHUP_KEY,
      JSON.stringify({
        danhSach: [
          {
            luc: '2026-08-11T09:12:00',
            ngay: '2026-08-11',
            version: 8,
            lyDo: 'dinh-ky',
            duLieu: tienDo(250),
          },
        ],
      }),
    )
    const assign = vi.fn()
    vi.spyOn(window, 'location', 'get').mockReturnValue({ ...window.location, assign } as Location)
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(<ManLoi message="hỏng" t={t} />)
    fireEvent.click(screen.getByRole('button', { name: /Lùi về bản 11\/08 09:12/ }))

    // Tiến độ đã lùi thật, và bản đang có được cất lại trước khi ghi đè.
    expect(localStorage.getItem(PROGRESS_KEY)).toContain('"xpTotal":250')
    const kho = JSON.parse(localStorage.getItem(ANH_CHUP_KEY)!) as { danhSach: { lyDo: string }[] }
    expect(kho.danhSach[0]!.lyDo).toBe('truoc-khoi-phuc')
    expect(assign).toHaveBeenCalledWith('/')
  })

  it('bỏ qua hộp xác nhận thì không đụng gì', () => {
    localStorage.setItem(PROGRESS_KEY, tienDo(999))
    localStorage.setItem(
      ANH_CHUP_KEY,
      JSON.stringify({
        danhSach: [
          { luc: '2026-08-11T09:12:00', ngay: '2026-08-11', version: 8, lyDo: 'dinh-ky', duLieu: tienDo(250) },
        ],
      }),
    )
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<ManLoi message="hỏng" t={t} />)
    fireEvent.click(screen.getByRole('button', { name: /Lùi về bản/ }))
    expect(localStorage.getItem(PROGRESS_KEY)).toContain('"xpTotal":999')
  })
})

describe('loiThanhChu — dòng để người cần hỗ trợ chụp lại', () => {
  it('Error thì lấy đúng lời của nó', () => {
    expect(loiThanhChu(new Error('localeCompare of undefined'))).toBe('localeCompare of undefined')
  })

  it('lỗi kiểu route của router in ra mã + lời, KHÔNG phải [object Object]', () => {
    // Đường không khớp route nào: router ném {status, statusText}, mà
    // String(object) ra "[object Object]" — vô dụng đúng lúc cần đọc nhất.
    expect(loiThanhChu({ status: 404, statusText: 'Not Found' })).toBe('404 Not Found')
    expect(loiThanhChu({ status: 404, statusText: 'Not Found', data: 'không có trang' })).toContain('không có trang')
  })

  it('thứ lạ khác vẫn ra chữ đọc được', () => {
    expect(loiThanhChu('hỏng rồi')).toBe('hỏng rồi')
    expect(loiThanhChu({ ly: 'do' })).toBe('{"ly":"do"}')
  })
})
