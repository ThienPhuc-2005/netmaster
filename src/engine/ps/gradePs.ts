// Chấm một bài terminal PowerShell (spec Module 12).
//
// Chấm theo HIỆU ỨNG + HÀNH ĐỘNG, không so chuỗi lệnh (đã chốt với
// người dùng — cùng triết lý gradeLab/gradeClinic: mọi cách viết hợp lệ
// đạt mục tiêu đều được công nhận, IKEA effect):
//   - 'ad-user' / 'ad-user-count' nhìn HIỆU ỨNG trên thế giới (user đã
//     mọc ra đúng chỗ chưa) — gõ từng lệnh hay bơm cả CSV qua ống đều
//     được, miễn AD ra đúng hình.
//   - 'tested-connection' / 'found-line' nhìn DẤU VẾT HÀNH ĐỘNG: kiểm
//     tra kết nối và lôi dòng log ra là việc không đổi thế giới, chỉ
//     chứng minh được bằng chính hành động đã làm trong phiên.
//
// Technical contract: thuần, tất định, không mutate.

import { isMemberOfGroup, type PsRunState, type PsWorld } from './world'

export type PsGoal =
  /** User `sam` phải tồn tại (đúng OU nếu khai). */
  | { kind: 'ad-user'; sam: string; ou?: string }
  /** OU phải có ít nhất `atLeast` user — mục tiêu của bài "hàng loạt". */
  | { kind: 'ad-user-count'; ou: string; atLeast: number }
  /**
   * User phải nằm trong nhóm, TÍNH CẢ nhóm lồng nhóm (M19 — AGDLP).
   * Nhờ tính xuyên nhóm mà một goal trên nhóm DomainLocal kiểm được trọn
   * chuỗi user → Global → DomainLocal; đề muốn ép đúng nếp AGDLP thì
   * khai CẶP goal (một trên nhóm Global, một trên nhóm DomainLocal).
   */
  | { kind: 'group-member'; group: string; sam: string }
  /** Đã chạy Test-NetConnection tới đích (đúng cổng nếu khai) và THÀNH CÔNG. */
  | { kind: 'tested-connection'; ip: string; port?: number }
  /** Đã lôi ra được (Select-String) một dòng chứa cụm này. */
  | { kind: 'found-line'; mustContain: string }

/** Đề một bài terminal — phần kỹ thuật thuần; chuỗi hiển thị ở tầng câu hỏi. */
export interface PsSpec {
  world: PsWorld
  goals: PsGoal[]
  /**
   * Lời giải tham chiếu: các dòng lệnh chạy tuần tự phải đạt trọn goals
   * (schema ép). Cũng là chất liệu tầng-3 của thang gợi ý mờ dần.
   */
  solution: string[]
}

export interface PsGoalOutcome {
  goal: PsGoal
  met: boolean
}

export interface PsEvaluation {
  goals: PsGoalOutcome[]
  passed: boolean
}

function goalMet(goal: PsGoal, state: PsRunState): boolean {
  switch (goal.kind) {
    case 'ad-user': {
      const user = state.world.ad?.users.find((u) => u.sam.toLowerCase() === goal.sam.toLowerCase())
      if (user === undefined) return false
      return goal.ou === undefined || user.ou.toLowerCase() === goal.ou.toLowerCase()
    }
    case 'ad-user-count': {
      const count =
        state.world.ad?.users.filter((u) => u.ou.toLowerCase() === goal.ou.toLowerCase()).length ?? 0
      return count >= goal.atLeast
    }
    case 'group-member':
      return isMemberOfGroup(state.world, goal.group, goal.sam)
    case 'tested-connection':
      return state.flags.testedConnections.some(
        (t) =>
          t.ip === goal.ip &&
          (goal.port === undefined ? t.port === null : t.port === goal.port) &&
          t.succeeded,
      )
    case 'found-line': {
      const needle = goal.mustContain.toLowerCase()
      return state.flags.foundLines.some((line) => line.toLowerCase().includes(needle))
    }
  }
}

export function gradePs(spec: PsSpec, state: PsRunState): PsEvaluation {
  const goals = spec.goals.map((goal) => ({ goal, met: goalMet(goal, state) }))
  return { goals, passed: goals.every((g) => g.met) }
}

/** Bài đã giải xong chưa — đường một-dòng cho tầng câu hỏi. */
export function isPsSolved(spec: PsSpec, state: PsRunState): boolean {
  return gradePs(spec, state).passed
}
