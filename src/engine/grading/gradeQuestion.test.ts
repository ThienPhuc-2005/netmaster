import { describe, expect, it } from 'vitest'
import { findNearMiss } from './gradeQuestion'
import type { Question } from '../contentSchema'
import { gradeQuestion } from './gradeQuestion'
import {
  teamsAllOneVlan,
  teamsFixed,
  teamsNetwork,
  vlanRepairLab,
} from '../../../tests/fixtures/labFixture'
import { CASE_GPO_CHAN, CASE_SAI_GATEWAY } from '../../../tests/fixtures/clinicFixture'

// Câu hỏi mẫu tối thiểu, đúng kiểu suy ra từ contentSchema
const typedQ: Question = {
  kind: 'typed',
  id: 'q-typed',
  prompt: { vi: 'Phong bì trong ẩn dụ bưu điện là gì?' },
  accept: ['gói tin', 'packet'],
}

const mcqQ: Question = {
  kind: 'mcq',
  id: 'q-mcq',
  prompt: { vi: 'IP giống thứ gì trong ẩn dụ bưu điện?' },
  choices: [{ vi: 'tem thư' }, { vi: 'địa chỉ nhà' }, { vi: 'bưu tá' }],
  answerIndex: 1,
}

const orderQ: Question = {
  kind: 'order',
  id: 'q-order',
  prompt: { vi: 'Xếp lại đường đi của gói tin' },
  items: [{ vi: 'DNS hỏi địa chỉ' }, { vi: 'đóng gói' }, { vi: 'qua gateway' }, { vi: 'server trả lời' }],
}

describe('gradeQuestion — typed', () => {
  it('accepts a correct answer, including one typed without diacritics', () => {
    expect(gradeQuestion(typedQ, { kind: 'typed', text: 'gói tin' })).toBe(true)
    expect(gradeQuestion(typedQ, { kind: 'typed', text: 'goi tin' })).toBe(true)
    expect(gradeQuestion(typedQ, { kind: 'typed', text: '  Packet ' })).toBe(true)
  })

  it('rejects a wrong answer', () => {
    expect(gradeQuestion(typedQ, { kind: 'typed', text: 'lá thư' })).toBe(false)
  })
})

describe('gradeQuestion — mcq', () => {
  it('accepts the right choice and rejects others', () => {
    expect(gradeQuestion(mcqQ, { kind: 'mcq', choiceIndex: 1 })).toBe(true)
    expect(gradeQuestion(mcqQ, { kind: 'mcq', choiceIndex: 0 })).toBe(false)
    expect(gradeQuestion(mcqQ, { kind: 'mcq', choiceIndex: 99 })).toBe(false)
  })
})

describe('gradeQuestion — order', () => {
  it('accepts only the exact original order', () => {
    expect(gradeQuestion(orderQ, { kind: 'order', order: [0, 1, 2, 3] })).toBe(true)
  })

  it('rejects any swapped positions', () => {
    expect(gradeQuestion(orderQ, { kind: 'order', order: [0, 2, 1, 3] })).toBe(false)
    expect(gradeQuestion(orderQ, { kind: 'order', order: [1, 2, 3, 0] })).toBe(false)
  })

  it('rejects a wrong-length submission', () => {
    expect(gradeQuestion(orderQ, { kind: 'order', order: [0, 1, 2] })).toBe(false)
    expect(gradeQuestion(orderQ, { kind: 'order', order: [0, 1, 2, 3, 3] })).toBe(false)
    expect(gradeQuestion(orderQ, { kind: 'order', order: [] })).toBe(false)
  })
})

describe('gradeQuestion — mcq trả lời ở dạng MỞ (flow engine, spec 2.3)', () => {
  it('chấm bằng chữ của lựa chọn đúng, nhân nhượng dấu như câu gõ tay', () => {
    expect(gradeQuestion(mcqQ, { kind: 'typed', text: 'địa chỉ nhà' })).toBe(true)
    expect(gradeQuestion(mcqQ, { kind: 'typed', text: 'dia chi nha' })).toBe(true)
    expect(gradeQuestion(mcqQ, { kind: 'typed', text: 'là địa chỉ nhà' })).toBe(true)
  })

  it('gõ chữ của lựa chọn SAI thì không được điểm', () => {
    expect(gradeQuestion(mcqQ, { kind: 'typed', text: 'bưu tá' })).toBe(false)
    expect(gradeQuestion(mcqQ, { kind: 'typed', text: 'tem thư' })).toBe(false)
  })
})

describe('gradeQuestion — kind mismatch is a programming error', () => {
  it('throws when response kind differs from question kind', () => {
    expect(() => gradeQuestion(typedQ, { kind: 'mcq', choiceIndex: 0 })).toThrow()
    expect(() => gradeQuestion(mcqQ, { kind: 'order', order: [0] })).toThrow()
    expect(() => gradeQuestion(orderQ, { kind: 'typed', text: 'x' })).toThrow()
  })
})

describe('findNearMiss — câu trả lời cận-đúng nhận phản hồi may đo', () => {
  const gatewayQ = {
    kind: 'typed' as const,
    id: 'gw',
    prompt: { vi: 'Điểm ra duy nhất để rời mạng nhà gọi là gì?' },
    accept: ['gateway', 'cổng mặc định'],
    nearMisses: [
      {
        accept: ['router', 'bộ định tuyến'],
        feedback: { vi: 'Đúng thiết bị rồi — nhưng vai trò nó đang đóng tên là gì?' },
      },
    ],
  }

  it('gõ tên thiết bị thay vì vai trò → trả feedback của nhóm cận-đúng', () => {
    expect(findNearMiss(gatewayQ, { kind: 'typed', text: 'router' })?.vi).toMatch(/Đúng thiết bị rồi/)
    // khớp-chứa cũng áp dụng cho cận-đúng: "là cái router" vẫn bắt được
    expect(findNearMiss(gatewayQ, { kind: 'typed', text: 'là cái router' })?.vi).toMatch(/Đúng thiết bị rồi/)
  })

  it('trả lời sai hẳn hoặc đúng → không phải cận-đúng (null)', () => {
    expect(findNearMiss(gatewayQ, { kind: 'typed', text: 'dns' })).toBeNull()
    expect(findNearMiss(gatewayQ, { kind: 'typed', text: 'gateway' })).toBeNull()
  })

  it('câu không khai nearMisses hoặc không phải typed → null', () => {
    expect(findNearMiss(typedQ, { kind: 'typed', text: 'bừa' })).toBeNull()
    expect(findNearMiss(mcqQ, { kind: 'mcq', choiceIndex: 1 })).toBeNull()
  })
})

describe('câu lab — chấm bằng cách CHẠY sơ đồ người học lắp', () => {
  const labQ: Question = {
    kind: 'lab',
    id: 'q-lab',
    prompt: { vi: 'Sửa lại để hai máy kế toán gọi được nhau.' },
    spec: vlanRepairLab(),
  }

  it('sơ đồ đạt mục tiêu → đúng', () => {
    expect(gradeQuestion(labQ, { kind: 'lab', topology: teamsFixed() })).toBe(true)
  })

  it('sơ đồ đề bài chưa sửa → sai', () => {
    expect(gradeQuestion(labQ, { kind: 'lab', topology: teamsNetwork() })).toBe(false)
  })

  it('lời giải rẻ tiền gộp một VLAN → sai (mục tiêu "phải chặn" hỏng)', () => {
    expect(gradeQuestion(labQ, { kind: 'lab', topology: teamsAllOneVlan() })).toBe(false)
  })

  it('nộp nhầm loại câu trả lời là lỗi lập trình ở tầng UI, không phải người học sai', () => {
    expect(() => gradeQuestion(labQ, { kind: 'typed', text: 'gói tin' })).toThrowError(/lỗi lập trình ở tầng UI/)
    expect(() => gradeQuestion(typedQ, { kind: 'lab', topology: teamsFixed() })).toThrowError(
      /lỗi lập trình ở tầng UI/,
    )
  })

  it('câu lab không có khái niệm cận-đúng', () => {
    expect(findNearMiss(labQ, { kind: 'lab', topology: teamsNetwork() })).toBeNull()
  })
})

describe('câu clinic — chấm HAI PHẦN: chẩn đoán VÀ sửa', () => {
  const editQ: Question = {
    kind: 'clinic',
    id: 'q-clinic-edit',
    prompt: { vi: 'Máy kế toán không ra được web công ty.' },
    spec: CASE_SAI_GATEWAY,
    diagnosis: {
      choices: [{ vi: 'Đứt dây' }, { vi: 'Sai gateway' }, { vi: 'DNS chết' }],
      answerIndex: 1,
    },
  }
  const cured = CASE_SAI_GATEWAY.fix.kind === 'edit-network' ? CASE_SAI_GATEWAY.fix.solution : null!
  const sick = CASE_SAI_GATEWAY.patient.topology

  const actionQ: Question = {
    kind: 'clinic',
    id: 'q-clinic-action',
    prompt: { vi: 'Web vẫn mở được mà ping đâu cũng chết ngay tại máy.' },
    spec: CASE_GPO_CHAN,
    diagnosis: {
      choices: [{ vi: 'Mạng đứt' }, { vi: 'GPO chặn ICMP chiều đi' }],
      answerIndex: 1,
    },
    actions: {
      choices: [
        { vi: 'Báo quản trị miền sửa GPO đang chặn ICMP' },
        { vi: 'Đổi địa chỉ IP của máy' },
      ],
      answerIndex: 0,
    },
  }

  it('ca sửa-sơ-đồ: đúng bệnh + sơ đồ đã chữa → đúng', () => {
    expect(
      gradeQuestion(editQ, { kind: 'clinic', diagnosisIndex: 1, fix: { kind: 'edit-network', topology: cured } }),
    ).toBe(true)
  })

  it('đúng bệnh mà chưa chữa, hoặc chữa rồi mà gọi sai bệnh → đều sai', () => {
    expect(
      gradeQuestion(editQ, { kind: 'clinic', diagnosisIndex: 1, fix: { kind: 'edit-network', topology: sick } }),
    ).toBe(false)
    expect(
      gradeQuestion(editQ, { kind: 'clinic', diagnosisIndex: 0, fix: { kind: 'edit-network', topology: cured } }),
    ).toBe(false)
  })

  it('ca chọn-hành-động: đúng bệnh + đúng hành động → đúng; lệch một vế → sai', () => {
    expect(
      gradeQuestion(actionQ, { kind: 'clinic', diagnosisIndex: 1, fix: { kind: 'choose-action', actionIndex: 0 } }),
    ).toBe(true)
    expect(
      gradeQuestion(actionQ, { kind: 'clinic', diagnosisIndex: 1, fix: { kind: 'choose-action', actionIndex: 1 } }),
    ).toBe(false)
    expect(
      gradeQuestion(actionQ, { kind: 'clinic', diagnosisIndex: 0, fix: { kind: 'choose-action', actionIndex: 0 } }),
    ).toBe(false)
  })

  it('hình dạng phần fix lệch với đề là lỗi lập trình ở tầng UI', () => {
    expect(() =>
      gradeQuestion(editQ, { kind: 'clinic', diagnosisIndex: 1, fix: { kind: 'choose-action', actionIndex: 0 } }),
    ).toThrowError(/lỗi lập trình ở tầng UI/)
    expect(() =>
      gradeQuestion(actionQ, { kind: 'clinic', diagnosisIndex: 1, fix: { kind: 'edit-network', topology: sick } }),
    ).toThrowError(/lỗi lập trình ở tầng UI/)
    expect(() => gradeQuestion(typedQ, { kind: 'clinic', diagnosisIndex: 0, fix: { kind: 'choose-action', actionIndex: 0 } })).toThrowError(
      /lỗi lập trình ở tầng UI/,
    )
  })

  it('câu clinic không có khái niệm cận-đúng', () => {
    expect(
      findNearMiss(editQ, { kind: 'clinic', diagnosisIndex: 1, fix: { kind: 'edit-network', topology: sick } }),
    ).toBeNull()
  })
})
