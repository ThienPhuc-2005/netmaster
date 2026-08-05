// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

afterEach(cleanup)

describe('ProgressBar — endowed progress (spec 2.4)', () => {
  it('0 XP vẫn hiển thị 15%, không bao giờ từ 0', () => {
    const { getByRole } = render(<ProgressBar earnedXp={0} totalXp={120} />)
    const bar = getByRole('progressbar')
    expect(bar.getAttribute('aria-valuenow')).toBe('15')
    expect((bar.firstElementChild as HTMLElement).style.width).toBe('15%')
  })

  it('nửa đường → 15 + 85/2 = 57.5%', () => {
    const { getByRole } = render(<ProgressBar earnedXp={60} totalXp={120} />)
    const bar = getByRole('progressbar')
    expect(bar.getAttribute('aria-valuenow')).toBe('58') // hiển thị làm tròn
    expect((bar.firstElementChild as HTMLElement).style.width).toBe('57.5%')
  })

  it('đủ XP → 100%', () => {
    const { getByRole } = render(<ProgressBar earnedXp={120} totalXp={120} />)
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100')
  })

  it('% hiển thị đến từ engine — thanh và số không bao giờ lệch nhau', () => {
    const { container, getByRole } = render(<ProgressBar earnedXp={30} totalXp={120} />)
    // 15 + 85*0.25 = 36.25 → hiển thị 36
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('36')
    expect(container.textContent).toContain('36%')
  })
})
