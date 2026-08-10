// Ruột của MCP server NetMaster (khối 21.13) — phần THUẦN, test được.
//
// Vì sao có thư mục này: bộ chấm câu gõ tay của app cố tình đơn giản và
// TẤT ĐỊNH (chuỗi + cụm từ), vì cổng mastery 85% chỉ có nghĩa khi cùng
// một câu trả lời luôn nhận cùng một kết quả, và vì app phải chấm được
// khi mất mạng. Cái giá của sự đơn giản đó là lớp lỗi đã trả giá ở khối
// 21.10: danh sách đáp án soạn hẹp hơn cách nói tự nhiên thì người trả
// lời ĐÚNG bị chấm sai.
//
// Chỗ đúng cho một mô hình ngôn ngữ trong kiến trúc này KHÔNG phải là
// lúc người học bấm "Kiểm tra" (đưa key vào bundle static là công khai
// key; gọi mạng là mất offline và mất tất định). Chỗ đúng là LÚC SOẠN
// BÀI: Claude đọc nội dung + sổ khiếu nại của người học qua MCP, chạy
// chính bộ chấm thật, rồi đề xuất nới danh sách đáp án. Trí thông minh
// đọng lại trong DATA, còn người học vẫn được chấm bằng một hàm thuần.
//
// Technical contract: thuần TS, không đọc mạng, không tự lấy giờ; mọi
// đường dẫn và nội dung file bơm từ ngoài vào để test không cần ổ đĩa.

import { typedAnswerMatches } from '../../src/engine/grading/normalize.ts'

/** Một câu hỏi đã phẳng hóa, kèm chỗ nó nằm trong nội dung. */
export interface IndexedQuestion {
  moduleId: string
  moduleTitle: string
  /** null với câu của POOL bài thi — nó không thuộc bài học nào. */
  lessonId: string | null
  questionId: string
  kind: string
  prompt: string
  /** Chỉ câu gõ tay mới có. */
  accept: string[]
  /** Lời giải (bài học) hoặc giải thích (câu đứng độc lập). */
  solution: string | null
  /**
   * Chữ trong `solution` đến từ đâu — phân biệt này KHÔNG phải hình thức.
   * `solution` của một bài tập MỞ ĐẦU bằng cụm đáp án ("Địa chỉ MAC của
   * người gửi. Thư đi vào cổng nào thì…"), nên đối chiếu nó với accept là
   * phép đo có nghĩa. `explain` của câu đứng độc lập lại mở đầu bằng một
   * câu GIẢNG hoặc một ẩn dụ ("Ra khỏi làng thì phải qua cổng làng") —
   * đem so với accept là báo động giả. Đo nhầm hai thứ này ra 3 phát
   * hiện rác ngay lần chạy đầu.
   */
  solutionKind: 'solution' | 'explain' | null
  hintTopic: string | null
}

interface RawLText {
  vi: string
}
interface RawQuestion {
  id: string
  kind: string
  prompt: RawLText
  accept?: string[]
  explain?: RawLText
  hintTopic?: RawLText
}
interface RawExercise {
  question: RawQuestion
  solution?: RawLText
}
interface RawModule {
  id: string
  title: RawLText
  masteryTest: RawQuestion[]
  lessons: {
    id: string
    steps: [unknown, { questions: RawQuestion[] }, unknown, { exercises: RawExercise[] }, { questions: RawExercise[] }, unknown]
  }[]
}

/** Phẳng hóa một module JSON đã parse thành danh sách câu tra được. */
export function indexModule(mod: RawModule): IndexedQuestion[] {
  const out: IndexedQuestion[] = []
  const push = (q: RawQuestion, lessonId: string | null, solution: string | null) => {
    out.push({
      moduleId: mod.id,
      moduleTitle: mod.title.vi,
      lessonId,
      questionId: q.id,
      kind: q.kind,
      prompt: q.prompt.vi,
      accept: q.accept ?? [],
      solution: solution ?? q.explain?.vi ?? null,
      solutionKind: solution !== null ? 'solution' : q.explain !== undefined ? 'explain' : null,
      hintTopic: q.hintTopic?.vi ?? null,
    })
  }
  for (const q of mod.masteryTest) push(q, null, null)
  for (const lesson of mod.lessons) {
    for (const q of lesson.steps[1].questions) push(q, lesson.id, null)
    for (const e of lesson.steps[3].exercises) push(e.question, lesson.id, e.solution?.vi ?? null)
    for (const e of lesson.steps[4].questions) push(e.question, lesson.id, e.solution?.vi ?? null)
  }
  return out
}

export function indexModules(mods: RawModule[]): IndexedQuestion[] {
  return mods.flatMap(indexModule)
}

/** Tìm câu theo id chính xác, hoặc theo một mẩu chữ trong đề. */
export function findQuestions(index: readonly IndexedQuestion[], query: string, limit = 8): IndexedQuestion[] {
  const exact = index.filter((q) => q.questionId === query)
  if (exact.length > 0) return exact
  const needle = query.toLowerCase()
  return index.filter((q) => q.prompt.toLowerCase().includes(needle)).slice(0, limit)
}

export interface GradeReport {
  questionId: string
  prompt: string
  kind: string
  /** Kết quả của CHÍNH bộ chấm app dùng — không phải phỏng đoán. */
  results: { answer: string; matched: boolean }[]
  accept: string[]
  solution: string | null
}

/**
 * Chấm thử một loạt câu trả lời bằng đúng hàm app dùng.
 *
 * Đây là tool quan trọng nhất của server: nó chặn Claude khỏi việc ĐOÁN
 * xem app sẽ chấm ra sao. Muốn biết "địa chỉ MAC của người gửi" có qua
 * không thì chạy thật, đừng suy luận.
 */
export function gradeAnswers(
  index: readonly IndexedQuestion[],
  questionId: string,
  answers: readonly string[],
): GradeReport | { error: string } {
  const q = index.find((x) => x.questionId === questionId)
  if (q === undefined) return { error: `Không có câu nào mang id "${questionId}"` }
  if (q.kind !== 'typed') {
    return { error: `Câu "${questionId}" là dạng ${q.kind}, không chấm bằng danh sách đáp án chữ` }
  }
  return {
    questionId: q.questionId,
    prompt: q.prompt,
    kind: q.kind,
    results: answers.map((answer) => ({ answer, matched: typedAnswerMatches(answer, q.accept) })),
    accept: q.accept,
    solution: q.solution,
  }
}

export interface NarrowFinding {
  questionId: string
  moduleId: string
  lessonId: string | null
  prompt: string
  accept: string[]
  reason: 'solution-rejected' | 'few-variants'
  /** Mệnh đề lời giải bị chính accept từ chối (chỉ ở reason đầu). */
  rejectedClause?: string
}

/** Mệnh đề đáp án mở đầu lời giải — thứ người học chép lại khi bị bảo "tự gõ lại". */
export function solutionClause(solution: string): string {
  return (solution.split(/[;:]|—|\. /)[0] ?? '').trim().replace(/\.$/, '')
}

/**
 * Những câu gõ tay có nguy cơ cao dính lớp lỗi accept-hẹp.
 *
 * Hai dấu hiệu, xếp nặng trước: (1) accept từ chối chính mệnh đề đầu của
 * lời giải — đây là lỗi CHẮC CHẮN, đã có test gác trong app; (2) accept
 * có quá ít cách nói, tức là mọi cách diễn đạt khác đều rơi.
 */
export function narrowAccepts(index: readonly IndexedQuestion[], minVariants = 3): NarrowFinding[] {
  const findings: NarrowFinding[] = []
  for (const q of index) {
    if (q.kind !== 'typed') continue
    const base = { questionId: q.questionId, moduleId: q.moduleId, lessonId: q.lessonId, prompt: q.prompt, accept: q.accept }
    // CHỈ đo trên lời giải của bài tập — xem ghi chú ở `solutionKind`.
    if (q.solution !== null && q.solutionKind === 'solution') {
      const clause = solutionClause(q.solution)
      const skip = clause.split(' ').length > 9 || /\d/.test(clause) || clause.includes('"')
      if (!skip && !typedAnswerMatches(clause, q.accept)) {
        findings.push({ ...base, reason: 'solution-rejected', rejectedClause: clause })
        continue
      }
    }
    if (q.accept.length < minVariants) findings.push({ ...base, reason: 'few-variants' })
  }
  return findings.sort((a, b) => (a.reason === b.reason ? 0 : a.reason === 'solution-rejected' ? -1 : 1))
}

export interface DisputeReview {
  questionId: string
  /** null khi nội dung đã đổi và câu đó không còn. */
  prompt: string | null
  lessonId: string | null
  answer: string
  at: string
  /** Chạy lại bộ chấm HÔM NAY: câu đó giờ đã được nhận chưa. */
  matchedNow: boolean | null
  accept: string[]
}

/**
 * Đọc sổ "mình nghĩ câu này đúng" từ file sao lưu của người học (hoặc
 * nguyên nội dung key `netmaster-progress`) rồi chấm lại từng câu.
 *
 * `matchedNow === true` nghĩa là accept đã được nới sau lần khiếu nại đó
 * — dòng ấy coi như đã xử xong. Còn `false` là việc đang chờ người soạn
 * bài quyết: nới đáp án, hay câu trả lời kia thật sự sai.
 */
export function reviewDisputes(index: readonly IndexedQuestion[], backupJson: string): DisputeReview[] | { error: string } {
  let parsed: unknown
  try {
    parsed = JSON.parse(backupJson)
  } catch {
    return { error: 'Nội dung không phải JSON hợp lệ' }
  }
  const root = parsed as { data?: Record<string, string> ; state?: unknown }
  let progress: unknown = root.state !== undefined ? root : undefined
  if (progress === undefined && root.data?.['netmaster-progress'] !== undefined) {
    try {
      progress = JSON.parse(root.data['netmaster-progress'])
    } catch {
      return { error: 'Khóa netmaster-progress trong file sao lưu không đọc được' }
    }
  }
  const disputes = (progress as { state?: { disputedAnswers?: unknown } } | undefined)?.state?.disputedAnswers
  if (!Array.isArray(disputes)) return { error: 'File không có sổ disputedAnswers (người học chưa khiếu nại câu nào)' }

  return (disputes as { questionId: string; lessonId: string; answer: string; at: string }[]).map((d) => {
    const q = index.find((x) => x.questionId === d.questionId)
    return {
      questionId: d.questionId,
      prompt: q?.prompt ?? null,
      lessonId: d.lessonId === '' ? null : d.lessonId,
      answer: d.answer,
      at: d.at,
      matchedNow: q === undefined || q.kind !== 'typed' ? null : typedAnswerMatches(d.answer, q.accept),
      accept: q?.accept ?? [],
    }
  })
}

/**
 * Dòng JSON để dán vào nội dung — server CHỈ ĐỌC, không tự sửa file.
 *
 * Cố ý không cho MCP ghi vào `content/modules/`: nội dung là thứ người
 * soạn bài chịu trách nhiệm, và một tool tự sửa nội dung theo lời than
 * của người học là con đường ngắn nhất tới việc nới đáp án cho tới lúc
 * câu nào cũng đúng.
 */
export function acceptPatchLine(current: readonly string[], extras: readonly string[]): string {
  const merged = [...current]
  for (const e of extras) {
    if (!merged.some((x) => x.toLowerCase() === e.toLowerCase())) merged.push(e)
  }
  return `"accept": [${merged.map((x) => JSON.stringify(x)).join(', ')}]`
}
