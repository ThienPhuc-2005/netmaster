// @vitest-environment jsdom
// Onboarding: bắn gói tin trước mọi màn giới thiệu (spec 4.5). Môi trường
// test không có SVG geometry (getTotalLength) → đi nhánh "tới thẳng đích"
// — đúng nhánh dành cho prefers-reduced-motion.

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { OnboardingPage } from './OnboardingPage'
import { useProgress } from '../../store/progress'

const INITIAL = useProgress.getInitialState()

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})
afterEach(cleanup)

describe('OnboardingPage', () => {
  it('màn đầu: chỉ lời mời + nút Gửi gói tin — chưa có giải thích nào (aha trước, chữ sau)', () => {
    render(<OnboardingPage />)
    expect(screen.getByText(/thử gửi một gói tin đã/)).toBeTruthy()
    expect(screen.getByRole('button', { name: /Gửi gói tin/ })).toBeTruthy()
    expect(screen.queryByText(/Đến nơi!/)).toBeNull()
    expect(screen.queryByRole('button', { name: /Vào học/ })).toBeNull()
  })

  it('gửi gói tin → tới đích, hiện lời kể + nút Vào học + gửi lại được', () => {
    render(<OnboardingPage />)
    fireEvent.click(screen.getByRole('button', { name: /Gửi gói tin/ }))
    expect(screen.getByText('Đến nơi!')).toBeTruthy()
    expect(screen.getByText(/cập bến Máy B/)).toBeTruthy()
    expect(screen.getByRole('button', { name: /Vào học/ })).toBeTruthy()
    // Gửi lại không làm hỏng gì
    fireEvent.click(screen.getByRole('button', { name: /Gửi thêm lần nữa/ }))
    expect(screen.getByText('Đến nơi!')).toBeTruthy()
  })

  it('Vào học → onboardingDone = true và persist; XP/streak KHÔNG bị chạm (nguyên tắc 5)', () => {
    render(<OnboardingPage />)
    fireEvent.click(screen.getByRole('button', { name: /Gửi gói tin/ }))
    fireEvent.click(screen.getByRole('button', { name: /Vào học/ }))

    const st = useProgress.getState()
    expect(st.onboardingDone).toBe(true)
    expect(st.xpTotal).toBe(0)
    expect(st.streak.current).toBe(0)
    expect(JSON.parse(localStorage.getItem('netmaster-progress')!).state.onboardingDone).toBe(true)
  })
})
