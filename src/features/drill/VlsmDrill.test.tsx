// @vitest-environment jsdom
// Drill VLSM — màn thiết kế của Module 13.
//
// Bốn lời hứa của UI:
//   1. Bảng thiết kế nhận được lời giải bằng chính bàn phím, và một
//      thiết kế đạt ba tiêu chí thì đi tiếp đề sau.
//   2. Thang 3 tầng bám ba tiêu chí: tầng 1 chỉ nói tiêu chí, tầng 2 mới
//      chỉ ra từng dòng, tầng 3 mới bày một cách cắt.
//   3. Phiên ghi vào lịch sử với ĐÚNG loại `vlsm` — không lẫn vào biểu
//      đồ tiến bộ của drill subnet.
//   4. Chia đều cho xong (đúng nhưng phí đất) KHÔNG được tính là đạt.

import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { VlsmDrill } from './VlsmDrill'
import { todayIso, useProgress } from '../../store/progress'
import { generateVlsmSession, solveVlsm, type VlsmProblem } from '../../engine/subnet/vlsm'
import { mulberry32 } from '../../engine/subnet/drill'
import { smallestPrefixForHosts } from '../../engine/subnet/ipv4'

const INITIAL = useProgress.getInitialState()

beforeEach(() => {
  cleanup()
  localStorage.clear()
  useProgress.setState({ ...INITIAL, streak: { ...INITIAL.streak } }, false)
})

/** Đề đầu của phiên hôm nay — dựng lại ĐÚNG seed mà màn hình dùng: ngày
 *  LOCAL qua todayIso(), không phải ngày UTC (toISOString lệch một ngày
 *  trong khung 0h-7h giờ VN → cả suite đỏ oan — biên bản trung cấp). */
function firstProblem(): VlsmProblem {
  const seed = Number(todayIso().replaceAll('-', '')) + 13
  return generateVlsmSession(mulberry32(seed), 5)[0]!
}

function startSession() {
  render(<VlsmDrill />)
  fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu phiên hôm nay' }))
}

/** Điền một dòng bảng thiết kế bằng nhãn đọc được của ô. */
function fillRow(deptIndex: number, ip: string, prefix: number | string) {
  const dept = `Phòng ban ${deptIndex + 1}`
  fireEvent.change(screen.getByRole('textbox', { name: `Địa chỉ mạng cho ${dept}` }), { target: { value: ip } })
  fireEvent.change(screen.getByRole('textbox', { name: `Prefix cho ${dept}` }), { target: { value: String(prefix) } })
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }))
}

/** Điền trọn lời giải tham chiếu của một đề. */
function fillSolution(problem: VlsmProblem) {
  const solution = solveVlsm(problem)!
  problem.needs.forEach((need, i) => {
    const assignment = solution.find((a) => a.needId === need.id)!
    fillRow(i, assignment.ip, assignment.prefix)
  })
}

describe('bảng thiết kế', () => {
  it('mở phiên là thấy dải được giao và một dòng cho mỗi phòng ban', () => {
    const problem = firstProblem()
    startSession()
    expect(screen.getByText(new RegExp(`${problem.base.ip}/${problem.base.prefix}`))).toBeTruthy()
    for (const [i, need] of problem.needs.entries()) {
      expect(screen.getByRole('textbox', { name: `Địa chỉ mạng cho Phòng ban ${i + 1}` })).toBeTruthy()
      expect(screen.getAllByText(String(need.hosts)).length).toBeGreaterThan(0)
    }
  })

  it('thiết kế đạt ba tiêu chí thì đi tiếp đề sau', () => {
    startSession()
    expect(screen.getByText('Bài 1/5')).toBeTruthy()
    fillSolution(firstProblem())
    submit()
    expect(screen.getByText('Bài 2/5')).toBeTruthy()
  })
})

describe('thang 3 tầng bám ba tiêu chí', () => {
  it('tầng 1 chỉ nói tiêu chí; tầng 2 mới chỉ ra dòng; tầng 3 mới bày cách cắt', () => {
    const problem = firstProblem()
    startSession()
    // Bỏ trống hết = hỏng tiêu chí "đủ".
    submit()
    expect(screen.getByText(/Đủ: không bỏ sót phòng ban nào/)).toBeTruthy()
    expect(screen.queryByText(/chưa cấp khối nào/)).toBeNull()
    expect(screen.queryByText('Một cách cắt đạt yêu cầu')).toBeNull()

    submit()
    expect(screen.getAllByText(/chưa cấp khối nào/).length).toBe(problem.needs.length)
    expect(screen.queryByText('Một cách cắt đạt yêu cầu')).toBeNull()

    submit()
    expect(screen.getByText('Một cách cắt đạt yêu cầu')).toBeTruthy()
  })

  it('cắt đúng nhưng PHÍ ĐẤT: nói rõ hỏng tiêu chí thứ ba, không cho qua', () => {
    const problem = firstProblem()
    startSession()
    // Cấp cho mọi phòng một khối to bằng phòng lớn nhất, xếp liền nhau —
    // đúng hết, chỉ phí đất. Đây đúng là thói quen VLSM sinh ra để chữa.
    const biggest = Math.min(...problem.needs.map((n) => smallestPrefixForHosts(n.hosts)))
    const size = 2 ** (32 - biggest)
    const baseInt = problem.base.ip.split('.').map(Number)
    const toIp = (offset: number) => {
      const n = ((baseInt[0]! << 24) | (baseInt[1]! << 16) | (baseInt[2]! << 8) | baseInt[3]!) + offset
      return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.')
    }
    problem.needs.forEach((_, i) => fillRow(i, toIp(i * size), biggest))
    submit()

    expect(screen.getByText(/Không phí đất/)).toBeTruthy()
    // Vẫn ở đề 1 — chưa đạt thì chưa đi tiếp.
    expect(screen.getByText('Bài 1/5')).toBeTruthy()
  })
})

describe('lịch sử phiên', () => {
  it('phiên xong ghi ĐÚNG loại vlsm, không lẫn vào biểu đồ drill subnet', () => {
    startSession()
    const problems = generateVlsmSession(
      mulberry32(Number(todayIso().replaceAll('-', '')) + 13),
      5,
    )
    for (const problem of problems) {
      fillSolution(problem)
      submit()
    }
    const history = useProgress.getState().drillHistory
    expect(history).toHaveLength(1)
    expect(history[0]).toMatchObject({ mode: 'vlsm', correct: 5, total: 5 })
    expect(screen.getByText('Xong phiên luyện hôm nay!')).toBeTruthy()
  })
})
