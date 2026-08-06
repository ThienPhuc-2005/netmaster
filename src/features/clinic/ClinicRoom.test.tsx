// @vitest-environment jsdom
// Khung bệnh nhân của Phòng khám, kiểm đúng trình tự sư phạm:
//
//   1. KHÁM MÙ — mở ca là chỉ thấy terminal, KHÔNG thấy sơ đồ. Lộ sơ đồ
//      sớm thì ca "rút dây" giải bằng mắt, terminal thành đồ cảnh.
//   2. Chốt chẩn đoán mới mở pha sửa; pha sửa của ca sửa-mạng phải GIẤU
//      danh sách "Chỗ đáng nhìn lại" của phòng lab — máy nói tên bệnh hộ
//      là lộ đề.
//   3. Nộp bài trao lên MỘT câu trả lời hai phần (chẩn đoán + cách sửa).

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { ClinicRoom } from './ClinicRoom'
import { QuestionSchema, type ClinicQuestion } from '../../engine/contentSchema'
import { CASE_GPO_CHAN, CASE_TRUNG_IP } from '../../../tests/fixtures/clinicFixture'

afterEach(cleanup)

// Hai ca trưng đủ hai kiểu sửa. Đi qua QuestionSchema nên câu hỏi của
// test hợp lệ y hệt câu thật trong nội dung.
const EDIT_Q = QuestionSchema.parse({
  kind: 'clinic',
  id: 'ui-clinic-edit',
  prompt: { vi: 'Máy kế toán in lúc được lúc không.' },
  spec: CASE_TRUNG_IP,
  diagnosis: {
    choices: [{ vi: 'Đứt dây tới máy in' }, { vi: 'Hai thiết bị giành nhau một IP' }, { vi: 'DNS chết' }],
    answerIndex: 1,
  },
}) as ClinicQuestion

const ACTION_Q = QuestionSchema.parse({
  kind: 'clinic',
  id: 'ui-clinic-action',
  prompt: { vi: 'Web vẫn chạy mà ping đâu cũng chết ngay tại máy.' },
  spec: CASE_GPO_CHAN,
  diagnosis: {
    choices: [{ vi: 'Mạng đứt' }, { vi: 'GPO chặn ICMP chiều đi' }],
    answerIndex: 1,
  },
  actions: {
    choices: [{ vi: 'Báo quản trị miền sửa GPO đang chặn ICMP' }, { vi: 'Đổi địa chỉ IP của máy' }],
    answerIndex: 0,
  },
}) as ClinicQuestion

/** Gõ một lệnh vào terminal rồi bấm Chạy. */
function runCommandInUi(line: string) {
  fireEvent.change(screen.getByRole('textbox', { name: 'Ô gõ lệnh' }), { target: { value: line } })
  fireEvent.click(screen.getByRole('button', { name: 'Chạy' }))
}

function lockDiagnosis(label: RegExp) {
  fireEvent.click(screen.getByRole('button', { name: label }))
  fireEvent.click(screen.getByRole('button', { name: 'Chốt chẩn đoán, vào sửa' }))
}

describe('pha khám — chỉ có terminal, không sơ đồ', () => {
  it('mở ca là thấy terminal của đúng máy ngồi, chưa thấy phòng lab lẫn nút nộp', () => {
    render(<ClinicRoom question={EDIT_Q} onSubmit={() => {}} />)
    expect(screen.getByRole('log', { name: 'Terminal của máy MAY-KE-TOAN' })).toBeTruthy()
    expect(screen.queryByText('Mục tiêu của bài')).toBeNull()
    expect(screen.queryByRole('button', { name: 'Nộp bài' })).toBeNull()
  })

  it('help kể danh sách lệnh bằng tiếng Việt; lệnh lạ được đáp tử tế', () => {
    render(<ClinicRoom question={EDIT_Q} onSubmit={() => {}} />)
    runCommandInUi('help')
    expect(screen.getByText(/liệt kê các chính sách/)).toBeTruthy()
    runCommandInUi('format c:')
    expect(screen.getByText(/không có lệnh "format"/)).toBeTruthy()
  })

  it('output thiết bị là tiếng Anh nghề thật, suy từ mô phỏng', () => {
    render(<ClinicRoom question={EDIT_Q} onSubmit={() => {}} />)
    runCommandInUi('ipconfig')
    expect(screen.getByText(/IPv4 Address.*192\.168\.10\.10/)).toBeTruthy()
    // Ca trùng IP: ping thông (một trong hai chủ trả lời) — bệnh chỉ lộ
    // khi soi arp qua hai lượt ping, đúng cách bắt bệnh ngoài đời.
    runCommandInUi('ping 192.168.10.20')
    expect(screen.getByText(/Reply from 192\.168\.10\.20/)).toBeTruthy()
  })

  it('gpresult lôi được thủ phạm của ca GPO ra ánh sáng', () => {
    render(<ClinicRoom question={ACTION_Q} onSubmit={() => {}} />)
    runCommandInUi('gpresult')
    expect(screen.getByText(/GPO-Chan-ICMP-Ra/)).toBeTruthy()
  })
})

describe('chốt chẩn đoán mở pha sửa', () => {
  it('chưa chọn bệnh thì nút chốt bị khóa', () => {
    render(<ClinicRoom question={EDIT_Q} onSubmit={() => {}} />)
    const lock = screen.getByRole('button', { name: 'Chốt chẩn đoán, vào sửa' })
    expect((lock as HTMLButtonElement).disabled).toBe(true)
  })

  it('ca sửa-mạng: chốt xong hiện phòng lab nhưng GIẤU "Chỗ đáng nhìn lại"', () => {
    render(<ClinicRoom question={EDIT_Q} onSubmit={() => {}} />)
    lockDiagnosis(/giành nhau một IP/)
    expect(screen.getByText('Mục tiêu của bài')).toBeTruthy()
    // Sơ đồ trùng IP — phòng lab thường sẽ mách "Hai thiết bị đang mang
    // cùng một địa chỉ IP", nhưng ở phòng khám thì tìm ra điều đó là bài.
    expect(screen.queryByText(/cùng một địa chỉ IP/)).toBeNull()
    expect(screen.getByRole('button', { name: 'Nộp bài' })).toBeTruthy()
  })

  it('chạy lại triệu chứng trên sơ đồ chưa sửa → bệnh nhân vẫn còn ốm', () => {
    render(<ClinicRoom question={EDIT_Q} onSubmit={() => {}} />)
    lockDiagnosis(/giành nhau một IP/)
    fireEvent.click(screen.getByRole('button', { name: 'Chạy lại triệu chứng' }))
    expect(screen.getByText(/vẫn còn đúng triệu chứng cũ/)).toBeTruthy()
  })
})

describe('nộp bài — một lượt gói cả hai phần', () => {
  it('ca sửa-mạng: nộp trao lên chẩn đoán đã chọn + sơ đồ hiện tại', () => {
    const onSubmit = vi.fn()
    render(<ClinicRoom question={EDIT_Q} onSubmit={onSubmit} />)
    lockDiagnosis(/giành nhau một IP/)
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }))
    expect(onSubmit).toHaveBeenCalledWith({
      kind: 'clinic',
      diagnosisIndex: 1,
      fix: { kind: 'edit-network', topology: CASE_TRUNG_IP.patient.topology },
    })
  })

  it('ca chọn-hành-động: phải chọn hành động rồi mới nộp được', () => {
    const onSubmit = vi.fn()
    render(<ClinicRoom question={ACTION_Q} onSubmit={onSubmit} />)
    lockDiagnosis(/GPO chặn ICMP/)
    const submit = screen.getByRole('button', { name: 'Nộp bài' }) as HTMLButtonElement
    expect(submit.disabled).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: /Báo quản trị miền/ }))
    fireEvent.click(submit)
    expect(onSubmit).toHaveBeenCalledWith({
      kind: 'clinic',
      diagnosisIndex: 1,
      fix: { kind: 'choose-action', actionIndex: 0 },
    })
  })

  it('không truyền onSubmit (chế độ xem) thì không bao giờ có nút nộp', () => {
    render(<ClinicRoom question={ACTION_Q} />)
    lockDiagnosis(/GPO chặn ICMP/)
    fireEvent.click(screen.getByRole('button', { name: /Báo quản trị miền/ }))
    expect(screen.queryByRole('button', { name: 'Nộp bài' })).toBeNull()
  })
})
