// @vitest-environment jsdom
// Lời nhắc nghỉ — phần vỏ UI. Luật "khi nào nên nói" đã có test riêng ở
// `engine/nhacNghi.test.ts`; ở đây chỉ kiểm ba thứ engine cố ý không biết:
// giữ mồm lúc đang thi, tắt được, và bật lại được.

import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { NhacNghi, duocPhepNhac } from './NhacNghi'
import { useSettings } from '../store/settings'
import { HOC_LIEN_TUC_PHUT } from '../engine/nhacNghi'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  useSettings.setState({ nhacNghi: true })
})

const PHUT = 60_000

function moTai(duong: string) {
  return render(
    <MemoryRouter initialEntries={[duong]}>
      <NhacNghi />
    </MemoryRouter>,
  )
}

/**
 * Giả lập ngồi học liền một mạch rồi để đồng hồ chạy tới mốc nhắc.
 *
 * Bọc `act`: lời nhắc bật lên từ trong `setInterval`, mà React chỉ dọn
 * hàng đợi state khi được `act` bao quanh — thiếu nó thì đồng hồ chạy đủ
 * giờ nhưng màn hình chưa vẽ lại, và test đọc phải màn hình cũ.
 */
function hocLien(phut: number) {
  act(() => {
    vi.advanceTimersByTime(phut * PHUT)
  })
}

describe('nhắc nghỉ — chỗ được nói và chỗ phải im', () => {
  it('đang THI thì không bao giờ nhắc', () => {
    expect(duocPhepNhac('/kiem-tra/module-4')).toBe(false)
  })

  it('học bài, ôn tập, phòng khám thì nhắc được', () => {
    for (const duong of ['/bai/m1-bai-1', '/on-tap', '/phong-kham', '/']) {
      expect(duocPhepNhac(duong), duong).toBe(true)
    }
  })
})

describe('nhắc nghỉ — trên màn hình thật', () => {
  it('chưa đủ giờ thì không có gì hiện ra', () => {
    vi.useFakeTimers()
    moTai('/bai/m1-bai-1')
    hocLien(HOC_LIEN_TUC_PHUT - 2)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('đủ giờ thì hiện lời nhắc kèm số phút đã học', () => {
    vi.useFakeTimers()
    moTai('/bai/m1-bai-1')
    hocLien(HOC_LIEN_TUC_PHUT + 1)
    const banner = screen.getByRole('status')
    expect(banner.textContent).toContain('Nghỉ một chút')
    expect(banner.textContent).toContain(String(HOC_LIEN_TUC_PHUT))
  })

  it('đủ giờ mà đang thi thì vẫn im', () => {
    vi.useFakeTimers()
    moTai('/kiem-tra/module-4')
    hocLien(HOC_LIEN_TUC_PHUT + 5)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('tắt trong cài đặt thì không nhắc nữa', () => {
    useSettings.setState({ nhacNghi: false })
    vi.useFakeTimers()
    moTai('/bai/m1-bai-1')
    hocLien(HOC_LIEN_TUC_PHUT + 5)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('lời nhắc là role="status", KHÔNG phải alert — nó là lời rủ, không cắt ngang', () => {
    vi.useFakeTimers()
    const { container } = moTai('/bai/m1-bai-1')
    hocLien(HOC_LIEN_TUC_PHUT + 1)
    expect(container.querySelector('[role="alert"]')).toBeNull()
    expect(container.querySelector('[role="status"]')).not.toBeNull()
  })
})
