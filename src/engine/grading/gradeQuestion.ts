// Chấm một câu hỏi theo kind (spec 2.1 bước 4-5). Engine chỉ trả
// đúng/sai — phản hồi 3 tầng khi sai (spec 4.4) do tầng UI dựng từ kết
// quả này cộng với hintTopic/hint/solution có sẵn trong nội dung bài.

import type { LText, Question } from '../contentSchema'
import { isLabSolved } from '../lab/gradeLab'
import { isClinicFixSolved } from '../clinic/gradeClinic'
import { isPsSolved } from '../ps/gradePs'
import type { PsRunState } from '../ps/world'
import { isCliSolved } from '../cli/gradeCli'
import type { CliState } from '../cli/state'
import type { Topology } from '../lab/topology'
import { walkOutcomesPassed, type RoomOutcome } from '../palace/walk'
import { openAcceptsOf } from '../flow'
import { typedAnswerMatches } from './normalize'

/** Câu trả lời người học nộp lên — kind phải trùng kind của Question. */
export type QuestionResponse =
  | { kind: 'typed'; text: string }
  | { kind: 'mcq'; choiceIndex: number }
  /**
   * `order` = mảng CHỈ SỐ ITEM GỐC theo thứ tự người học xếp.
   * `items` trong nội dung liệt kê theo thứ tự đúng; UI xáo trộn khi
   * hiển thị rồi quy đổi về chỉ số gốc khi nộp — nên đáp án đúng luôn
   * là [0, 1, 2, ...] bất kể xáo trộn thế nào.
   */
  | { kind: 'order'; order: number[] }
  /** `lab` = sơ đồ mạng người học lắp được; chấm bằng cách CHẠY nó. */
  | { kind: 'lab'; topology: Topology }
  /**
   * `palace-walk` = kết quả từng phòng của chuyến đi lại từ trí nhớ,
   * theo đúng thứ tự đã đi. Đủ để chấm mà không cần biết người học gõ
   * gì: từng phòng đã được cung điện chấm ngay lúc đi qua.
   */
  | { kind: 'palace-walk'; outcomes: RoomOutcome[] }
  /**
   * `clinic` = một lượt nộp của Phòng khám, gói CẢ HAI phần: chẩn đoán
   * (chỉ số bệnh đã chọn) và cách sửa — sơ đồ đã sửa với ca sửa-mạng,
   * hoặc chỉ số hành động với ca ngoài mô hình. Hình dạng phần fix phải
   * khớp `spec.fix.kind` của đề; lệch là bug tầng UI, không phải người
   * học sai.
   */
  | { kind: 'clinic'; diagnosisIndex: number; fix: ClinicFixResponse }
  /**
   * `ps` = trạng thái phiên terminal PowerShell lúc nộp (thế giới đã bị
   * lệnh của người học biến đổi + dấu vết hành động). Chấm bằng cách
   * hỏi "mục tiêu đạt chưa" — không so chuỗi lệnh.
   */
  | { kind: 'ps'; state: PsRunState }
  /**
   * `cli` = trạng thái phiên CLI thiết bị lúc nộp (sơ đồ đã bị lệnh của
   * người học biến đổi + dấu vết đã tra bảng nào). Chấm bằng "mục tiêu
   * đạt chưa" — không so chuỗi lệnh.
   */
  | { kind: 'cli'; state: CliState }

export type ClinicFixResponse =
  | { kind: 'edit-network'; topology: Topology }
  | { kind: 'choose-action'; actionIndex: number }
  /** Ca liên tầng: nửa bệnh trong sơ đồ sửa bằng tay, nửa ngoài chọn hành động. */
  | { kind: 'edit-and-act'; topology: Topology; actionIndex: number }

/** Kind lệch nhau là bug ở tầng UI (nộp nhầm loại), không phải người học sai. */
function kindMismatch(q: Question, r: QuestionResponse): Error {
  return new Error(
    `gradeQuestion: response kind "${r.kind}" khác question kind "${q.kind}" (câu "${q.id}") — lỗi lập trình ở tầng UI`,
  )
}

/**
 * Câu trả lời SAI nhưng CẬN-ĐÚNG (khớp một nhóm nearMisses của câu gõ
 * tay) → trả về feedback may đo của nhóm đó để UI thay cho lời tầng-1
 * chung chung. Vẫn là câu sai — thang 3 tầng không đổi. Trả null khi
 * không cận-đúng hoặc câu không khai nearMisses.
 */
export function findNearMiss(q: Question, r: QuestionResponse): LText | null {
  if (q.kind !== 'typed' || r.kind !== 'typed' || q.nearMisses === undefined) return null
  for (const nm of q.nearMisses) {
    if (typedAnswerMatches(r.text, nm.accept)) return nm.feedback
  }
  return null
}

export function gradeQuestion(q: Question, r: QuestionResponse): boolean {
  // Switch on the response kind so TypeScript narrows both sides;
  // the guard inside each branch narrows `q` to the matching variant.
  switch (r.kind) {
    case 'typed':
      // Flow engine (spec 2.3): người học đang thắng thế thì câu trắc
      // nghiệm được hỏi ở dạng MỞ — nộp lên là chữ gõ tay, chấm bằng
      // chữ của lựa chọn đúng. Đây là đường đi CHÍNH THỨC, không phải
      // mismatch: một câu trắc nghiệm luôn trả lời mở được.
      if (q.kind === 'mcq') return typedAnswerMatches(r.text, openAcceptsOf(q))
      if (q.kind !== 'typed') throw kindMismatch(q, r)
      return typedAnswerMatches(r.text, q.accept)
    case 'mcq':
      if (q.kind !== 'mcq') throw kindMismatch(q, r)
      return r.choiceIndex === q.answerIndex
    case 'order':
      if (q.kind !== 'order') throw kindMismatch(q, r)
      // Đúng khi xếp lại đủ và đúng thứ tự gốc: order[i] === i với mọi i.
      return r.order.length === q.items.length && r.order.every((itemIndex, pos) => itemIndex === pos)
    case 'lab':
      if (q.kind !== 'lab') throw kindMismatch(q, r)
      // Chấm HÀNH VI: chạy mô phỏng trên sơ đồ người học lắp và hỏi nó có
      // đạt mục tiêu của đề không — không so với sơ đồ mẫu (IKEA effect).
      return isLabSolved(q.spec, r.topology)
    case 'palace-walk':
      if (q.kind !== 'palace-walk') throw kindMismatch(q, r)
      // Đạt = đi trọn đúng những phòng đề bài đòi và không phòng nào phải
      // mở đáp án. Quên một nhịp rồi tự nhớ ra vẫn tính là nhớ được.
      return walkOutcomesPassed(r.outcomes, q.rooms)
    case 'clinic': {
      if (q.kind !== 'clinic') throw kindMismatch(q, r)
      // Chấm HAI phần trong một lượt (đã chốt với người dùng): chẩn đoán
      // đúng bệnh VÀ sửa khỏi bệnh. Đúng một nửa vẫn là chưa xong — ngoài
      // đời sửa đúng mà gọi tên bệnh sai thì lần sau vẫn mò lại từ đầu.
      const diagnosisRight = r.diagnosisIndex === q.diagnosis.answerIndex
      if (q.spec.fix.kind === 'edit-network') {
        if (r.fix.kind !== 'edit-network') throw kindMismatch(q, r)
        // Phần sửa chấm BA LỚP của phòng khám (goals + chẩn đoán tĩnh
        // sạch + triệu chứng gốc hết) — không phải gradeLab trần.
        return diagnosisRight && isClinicFixSolved(q.spec, r.fix.topology)
      }
      const actions = q.actions
      if (actions === undefined) {
        // Schema đã ép actions có mặt với ca chọn-hành-động và ca liên
        // tầng — tới được đây là nội dung lọt lưới parse, không phải
        // người học sai.
        throw new Error(`gradeQuestion: câu clinic "${q.id}" thiếu actions — nội dung chưa qua parseModule`)
      }
      if (q.spec.fix.kind === 'edit-and-act') {
        if (r.fix.kind !== 'edit-and-act') throw kindMismatch(q, r)
        // Ca liên tầng: BA phần phải cùng đúng. Sửa xong nửa mạng mà bỏ
        // quên nửa ngoài mô hình thì ngoài đời máy vẫn chưa dùng được —
        // cho qua ở đây là dạy người học dừng lại ở nửa dễ thấy.
        return (
          diagnosisRight &&
          isClinicFixSolved(q.spec, r.fix.topology) &&
          r.fix.actionIndex === actions.answerIndex
        )
      }
      if (r.fix.kind !== 'choose-action') throw kindMismatch(q, r)
      return diagnosisRight && r.fix.actionIndex === actions.answerIndex
    }
    case 'ps':
      if (q.kind !== 'ps') throw kindMismatch(q, r)
      // Chấm HIỆU ỨNG + DẤU VẾT: mọi chuỗi lệnh hợp lệ đạt mục tiêu đều
      // được công nhận (IKEA effect — cùng triết lý lab/clinic).
      return isPsSolved(q.spec, r.state)
    case 'cli':
      if (q.kind !== 'cli') throw kindMismatch(q, r)
      // Cũng chấm HIỆU ỨNG + DẤU VẾT: cấu hình bằng lệnh hay bằng đường
      // bấm chọn đều ra một sơ đồ, và bộ chấm chỉ nhìn sơ đồ đó.
      return isCliSolved(q.spec, r.state)
  }
}
