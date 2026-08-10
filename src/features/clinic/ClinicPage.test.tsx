// @vitest-environment jsdom
// Tab Phòng khám (khối 9.4) — phòng luyện song song với Module 11.
//
// Ba luật được khóa ở đây:
//   1. CỔNG: tab khóa tới khi module chứa ca bệnh mở theo mastery gate
//      (đã chốt: đậu Module 10 thì Phòng khám mở).
//   2. DANH MỤC: ca lấy từ BÀI HỌC; ca của bài thi mastery không bao giờ
//      xuất hiện — đề thi mà luyện trước được thì thang 85% mất giá trị.
//   3. XP: chữa khỏi lần đầu mỗi ca +XP đúng một lần; làm lại tự do
//      không cộng (nguyên tắc 5).

import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach } from 'vitest'
import { ClinicPage } from './ClinicPage'
import { clinicCaseEntries, clinicTabUnlocked } from './clinicCases'
import { useProgress } from '../../store/progress'
import { loadModules } from '../../content'
import { XP_AMOUNTS } from '../../engine/xp'
import { praiseKeyFor, type PraiseSignal } from '../../engine/praise'
import { translate } from '../../i18n'

const INITIAL = useProgress.getInitialState()

/** Dấu vết của ca chữa khỏi ngay lần nộp đầu — nguồn của lời khen. */
const CLINIC_FIRST_TRY: PraiseSignal = {
  failCount: 0,
  usedSolution: false,
  step: 'practice',
  kind: 'clinic',
}

/** Danh sách id module theo order — đậu 1..10 thì Module 11 mở. */
const moduleIds = loadModules().map((m) => m.id)
const passedThroughM10 = moduleIds.slice(0, 10)

function unlockClinic() {
  useProgress.setState({ passedModules: passedThroughM10 })
}

beforeEach(() => {
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak }, passedModules: [] }, false)
})
afterEach(cleanup)

describe('danh mục ca (clinicCases)', () => {
  it('ca lấy từ bài học của Module 11, KHÔNG chứa ca của bài thi mastery', () => {
    const entries = clinicCaseEntries()
    expect(entries.length).toBeGreaterThanOrEqual(8)
    const ids = entries.map((e) => e.question.id)
    const m11 = loadModules().find((m) => m.id === 'module-11')!
    for (const q of m11.masteryTest) {
      if (q.kind === 'clinic') {
        expect(ids, `ca đề thi "${q.id}" bị lộ ra phòng luyện tự do`).not.toContain(q.id)
      }
    }
  })

  it('ca nào cũng có đủ chất liệu cho thang 3 tầng (tầng 3 không bao giờ trống)', () => {
    for (const entry of clinicCaseEntries()) {
      expect(entry.solution.length, `ca "${entry.question.id}" thiếu lời giải tầng 3`).toBeGreaterThan(0)
    }
  })

  it('cổng mở đúng theo mastery gate: chưa đậu M10 thì khóa, đậu rồi thì mở', () => {
    expect(clinicTabUnlocked([])).toBe(false)
    expect(clinicTabUnlocked(passedThroughM10.slice(0, 9))).toBe(false)
    expect(clinicTabUnlocked(passedThroughM10)).toBe(true)
  })
})

describe('màn danh sách', () => {
  it('chưa mở khóa: vẫn là màn úp mở, không lộ ca nào', () => {
    render(<ClinicPage />)
    expect(screen.getByText('Phòng khám chưa mở cửa')).toBeTruthy()
    expect(screen.queryByText(/Ca 1/)).toBeNull()
  })

  it('mở khóa: liệt kê đủ ca, nhóm theo bài học', () => {
    unlockClinic()
    render(<ClinicPage />)
    const total = clinicCaseEntries().length
    expect(screen.getByText(new RegExp(`Đã chữa khỏi 0/${total} ca`))).toBeTruthy()
    expect(screen.getByText('Ca 1')).toBeTruthy()
    expect(screen.getByText(`Ca ${total}`)).toBeTruthy()
    // Nhóm theo tựa bài học của Module 11.
    expect(screen.getByText('Nhận ca trực: máy không in được')).toBeTruthy()
  })
})

describe('làm một ca chọn-hành-động từ đầu tới cuối', () => {
  /** Ca DNS chết ở Đoán thử bài 3 — chữa bằng chọn hành động. */
  function openDnsCase() {
    unlockClinic()
    render(<ClinicPage />)
    fireEvent.click(screen.getByText(/Cả phòng kế toán nhao nhao/))
    // Pha khám → chốt chẩn đoán → chọn hành động → nộp.
    fireEvent.click(screen.getByRole('button', { name: 'Dịch vụ DNS nội bộ đang ngừng chạy' }))
    fireEvent.click(screen.getByRole('button', { name: 'Chốt chẩn đoán, vào sửa' }))
    fireEvent.click(screen.getByRole('button', { name: 'Khởi động lại dịch vụ DNS trên máy DNS-NOI-BO' }))
  }

  it('chữa khỏi lần đầu: +XP đúng một lần, ghi bệnh án, vào answerHistory', () => {
    openDnsCase()
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))

    // Lời khen nói đúng NGHỀ vừa làm (kho D1) chứ không phải câu chung
    // chung: chữa xong một ca thì được khen về nếp khám bệnh.
    expect(screen.getByText(translate('vi', praiseKeyFor(CLINIC_FIRST_TRY, 0)))).toBeTruthy()
    expect(screen.getByText(/\+10 XP/)).toBeTruthy()
    const state = useProgress.getState()
    expect(state.xpTotal).toBe(XP_AMOUNTS.clinicCaseSolved)
    expect(state.clinicSolved['m11-b3-pre-ca']).toBeDefined()
    expect(state.answerHistory.at(-1)?.correct).toBe(true)

    // Nộp lại ngay ca đang mở — vẫn đúng nhưng KHÔNG cộng thêm XP.
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    expect(useProgress.getState().xpTotal).toBe(XP_AMOUNTS.clinicCaseSolved)
    expect(screen.getByText(/không cộng XP/)).toBeTruthy()
  })

  it('chẩn đoán đúng mà chọn sai hành động: thang 3 tầng chạy, không XP', () => {
    unlockClinic()
    render(<ClinicPage />)
    fireEvent.click(screen.getByText(/Cả phòng kế toán nhao nhao/))
    fireEvent.click(screen.getByRole('button', { name: 'Dịch vụ DNS nội bộ đang ngừng chạy' }))
    fireEvent.click(screen.getByRole('button', { name: 'Chốt chẩn đoán, vào sửa' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cắm lại dây mạng cho máy bạn' }))
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))

    expect(screen.getByText(/Gần rồi/)).toBeTruthy()
    expect(useProgress.getState().xpTotal).toBe(0)
    expect(useProgress.getState().answerHistory.at(-1)?.correct).toBe(false)

    // Lần sai thứ ba mở lời giải (tầng 3 = explain của ca Đoán thử).
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    expect(screen.getByText(/Lời giải/)).toBeTruthy()
  })

  it('huy hiệu "Đã chữa khỏi" hiện lại ở danh sách sau khi quay ra', () => {
    openDnsCase()
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    fireEvent.click(screen.getByRole('button', { name: 'Về danh sách ca' }))
    expect(screen.getByText('Đã chữa khỏi')).toBeTruthy()
    const total = clinicCaseEntries().length
    expect(screen.getByText(new RegExp(`Đã chữa khỏi 1/${total} ca`))).toBeTruthy()
  })
})
