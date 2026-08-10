// MCP server của NetMaster (khối 21.13).
//
// Hai tầng test, vì hai thứ khác nhau có thể hỏng:
//   1. RUỘT (lib.ts) — phép chấm, phép đo accept-hẹp, phép đọc sổ khiếu
//      nại. Đây là chỗ một lỗi âm thầm sẽ khiến Claude tư vấn sai cho
//      người soạn bài.
//   2. GIAO THỨC — server có thật sự nói được JSON-RPC qua stdio không.
//      Viết tay giao thức thì phải có người gác: sai một chữ trong khuôn
//      trả lời là Claude Code không thấy tool nào cả, mà chẳng báo gì.

import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  acceptPatchLine,
  distinctPhrasings,
  hasProseForm,
  isSymbolAnswer,
  findQuestions,
  gradeAnswers,
  indexModules,
  narrowAccepts,
  reviewDisputes,
  solutionClause,
} from '../tools/mcp/lib'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Một module tối giản đủ hình dạng thật để phẳng hóa được. */
function moduleFixture() {
  const q = (id: string, kind: string, prompt: string, accept?: string[], extra: Record<string, unknown> = {}) => ({
    id,
    kind,
    prompt: { vi: prompt },
    ...(accept !== undefined ? { accept } : {}),
    ...extra,
  })
  return {
    id: 'module-x',
    title: { vi: 'Module thử' },
    // Đáp án tiếng Việt nhiều chữ nhưng chỉ hai cách nói — đúng dạng mà
    // thước đo phải kêu; `explain` mở đầu bằng ẩn dụ để kiểm luật
    // "không đo trên lời giảng".
    masteryTest: [
      q('x-mt-1', 'typed', 'Câu đề thi?', ['bộ định tuyến', 'router'], {
        explain: { vi: 'Ẩn dụ nào đó. Bộ định tuyến là đáp án.' },
      }),
    ],
    lessons: [
      {
        id: 'x-bai-1',
        steps: [
          {},
          { questions: [q('x-pre-1', 'mcq', 'Đoán thử?')] },
          {},
          {
            exercises: [
              {
                question: q('x-prac-1', 'typed', 'Thử tay?', ['địa chỉ người gửi']),
                solution: { vi: 'Địa chỉ MAC của người gửi. Thư đi vào cổng nào thì máy gửi ở cổng đó.' },
              },
            ],
          },
          {
            questions: [
              {
                question: q('x-ret-1', 'typed', 'Nhớ lại?', ['gói tin', 'packet', 'gói dữ liệu']),
                solution: { vi: 'Gói tin. Mỗi gói mang một phần dữ liệu.' },
              },
            ],
          },
          {},
        ],
      },
    ],
  }
}

const index = indexModules([moduleFixture() as never])

describe('phẳng hóa nội dung', () => {
  it('gom đủ câu đề thi, đoán thử, thử tay và nhớ lại', () => {
    expect(index.map((q) => q.questionId).sort()).toEqual(['x-mt-1', 'x-prac-1', 'x-pre-1', 'x-ret-1'])
  })

  it('câu đề thi KHÔNG thuộc bài học nào (lessonId null)', () => {
    expect(index.find((q) => q.questionId === 'x-mt-1')!.lessonId).toBeNull()
    expect(index.find((q) => q.questionId === 'x-ret-1')!.lessonId).toBe('x-bai-1')
  })

  it('phân biệt lời giải của bài tập với lời giảng của câu độc lập', () => {
    expect(index.find((q) => q.questionId === 'x-prac-1')!.solutionKind).toBe('solution')
    expect(index.find((q) => q.questionId === 'x-mt-1')!.solutionKind).toBe('explain')
  })
})

describe('chấm thử bằng chính bộ chấm của app', () => {
  it('chạy THẬT chứ không đoán: cách nói rõ hơn accept vẫn phải ra kết quả của app', () => {
    const report = gradeAnswers(index, 'x-ret-1', ['gói tin', 'packet', 'con tem'])
    expect('results' in report).toBe(true)
    if (!('results' in report)) return
    expect(report.results.map((r) => r.matched)).toEqual([true, true, false])
  })

  it('câu không phải dạng gõ tay thì nói thẳng, không chấm bừa', () => {
    expect(gradeAnswers(index, 'x-pre-1', ['gì đó'])).toMatchObject({ error: expect.stringContaining('mcq') })
  })

  it('id lạ trả lỗi đọc được', () => {
    expect(gradeAnswers(index, 'khong-co', ['x'])).toMatchObject({ error: expect.stringContaining('khong-co') })
  })
})

describe('đo câu có nguy cơ chấm oan', () => {
  it('bắt câu mà accept từ chối chính lời giải của nó', () => {
    const found = narrowAccepts(index, 1).filter((f) => f.reason === 'solution-rejected')
    expect(found.map((f) => f.questionId)).toEqual(['x-prac-1'])
    expect(found[0]!.rejectedClause).toBe('Địa chỉ MAC của người gửi')
  })

  it('KHÔNG đo trên lời giảng của câu độc lập — ẩn dụ không phải cụm đáp án', () => {
    // Đây chính là 3 báo động giả của lần chạy đầu tiên.
    expect(narrowAccepts(index, 1).some((f) => f.questionId === 'x-mt-1')).toBe(false)
  })

  it('bắt câu có quá ít cách nói được chấp nhận', () => {
    const few = narrowAccepts(index, 3).filter((f) => f.reason === 'few-variants')
    expect(few.map((f) => f.questionId)).toContain('x-mt-1')
    expect(few.map((f) => f.questionId)).not.toContain('x-ret-1')
  })

  it('lỗi CHẮC CHẮN xếp trước lỗi nghi ngờ', () => {
    const reasons = narrowAccepts(index, 3).map((f) => f.reason)
    expect(reasons.indexOf('solution-rejected')).toBeLessThan(reasons.indexOf('few-variants'))
  })
})

describe('thước đo "đủ cách nói"', () => {
  it('bản viết không dấu KHÔNG tính là một cách nói khác — bộ chấm vốn đã nhân nhượng dấu', () => {
    expect(distinctPhrasings(['cổng access', 'cong access', 'switch'])).toHaveLength(2)
  })

  it('đáp án ký hiệu (IP, port, ::) không có "cách nói" nào để đòi', () => {
    expect(isSymbolAnswer(['192.168.1.64', '192.168.1.64/26'])).toBe(true)
    expect(isSymbolAnswer(['67 68', '67, 68'])).toBe(true)
    expect(isSymbolAnswer(['gói tin'])).toBe(false)
  })

  it('tên đầy đủ tiếng Anh của một viết tắt KHÔNG phải cách nói thứ hai', () => {
    // "address resolution protocol" là tên của ARP, không phải một lối
    // diễn đạt khác — đòi cách thứ ba ở đây là đòi thứ không tồn tại.
    expect(hasProseForm(['arp', 'address resolution protocol'])).toBe(false)
    expect(hasProseForm(['ipconfig'])).toBe(false)
    expect(hasProseForm(['router', 'bộ định tuyến'])).toBe(true)
  })
})

describe('đọc sổ khiếu nại từ file sao lưu của người học', () => {
  const progress = {
    state: {
      disputedAnswers: [
        { lessonId: 'x-bai-1', questionId: 'x-ret-1', answer: 'gói dữ liệu', at: '2026-08-10' },
        { lessonId: '', questionId: 'x-mt-1', answer: 'beta', at: '2026-08-10' },
      ],
    },
    version: 5,
  }

  it('đọc được file sao lưu (bọc trong data) lẫn nguyên key tiến độ', () => {
    const backup = JSON.stringify({ app: 'netmaster', data: { 'netmaster-progress': JSON.stringify(progress) } })
    const rows = reviewDisputes(index, backup)
    expect(Array.isArray(rows)).toBe(true)
    expect(reviewDisputes(index, JSON.stringify(progress))).toEqual(rows)
  })

  it('chấm lại HÔM NAY: câu đã được nới thì báo xong, câu chưa thì còn treo', () => {
    const rows = reviewDisputes(index, JSON.stringify(progress))
    if (!Array.isArray(rows)) throw new Error('phải đọc được')
    expect(rows[0]).toMatchObject({ questionId: 'x-ret-1', matchedNow: true })
    expect(rows[1]).toMatchObject({ questionId: 'x-mt-1', matchedNow: false, lessonId: null })
  })

  it('file hỏng hoặc chưa khiếu nại lần nào → nói thật, không ném lỗi', () => {
    expect(reviewDisputes(index, 'không phải json')).toMatchObject({ error: expect.any(String) })
    expect(reviewDisputes(index, JSON.stringify({ state: {} }))).toMatchObject({ error: expect.any(String) })
  })
})

describe('dòng vá accept', () => {
  it('gộp thêm cách nói mới, bỏ trùng không phân biệt hoa thường', () => {
    expect(acceptPatchLine(['gói tin'], ['Gói Tin', 'packet'])).toBe('"accept": ["gói tin", "packet"]')
  })

  it('solutionClause cắt đúng mệnh đề đáp án mở đầu', () => {
    expect(solutionClause('Địa chỉ MAC của người gửi. Thư đi vào cổng nào…')).toBe('Địa chỉ MAC của người gửi')
  })
})

describe('server nói được giao thức MCP qua stdio', () => {
  /** Gửi vài dòng JSON-RPC vào server thật, đọc lần lượt các dòng trả về. */
  async function talk(requests: unknown[]): Promise<Record<string, unknown>[]> {
    const child = spawn(process.execPath, [join(ROOT, 'tools', 'mcp', 'server.mjs')], { cwd: ROOT })
    const out: Record<string, unknown>[] = []
    const done = new Promise<void>((resolve, reject) => {
      let buffer = ''
      child.stdout.on('data', (chunk: Buffer) => {
        buffer += chunk.toString()
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (line.trim() !== '') out.push(JSON.parse(line) as Record<string, unknown>)
        }
        if (out.length >= requests.length) resolve()
      })
      child.stderr.on('data', (chunk: Buffer) => reject(new Error(chunk.toString())))
      child.on('error', reject)
    })
    for (const r of requests) child.stdin.write(`${JSON.stringify(r)}\n`)
    await done
    child.kill()
    return out
  }

  it('bắt tay initialize + liệt kê đủ tool', async () => {
    const [init, list] = await talk([
      { jsonrpc: '2.0', id: 1, method: 'initialize', params: {} },
      { jsonrpc: '2.0', id: 2, method: 'tools/list' },
    ])
    expect((init!.result as { serverInfo: { name: string } }).serverInfo.name).toBe('netmaster')
    const tools = (list!.result as { tools: { name: string }[] }).tools.map((t) => t.name)
    expect(tools).toEqual([
      'grade_answer',
      'find_question',
      'narrow_accepts',
      'review_disputes',
      'accept_patch_line',
    ])
  }, 20000)

  it('gọi tool chạy trên NỘI DUNG THẬT: ca chủ dự án từng bị chấm oan giờ đạt', async () => {
    const [res] = await talk([
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: {
          name: 'grade_answer',
          arguments: { questionId: 'm4-b2-ret-1', answers: ['địa chỉ Mac của người gửi', 'địa chỉ đích'] },
        },
      },
    ])
    const text = (res!.result as { content: { text: string }[] }).content[0]!.text
    const payload = JSON.parse(text) as { results: { matched: boolean }[] }
    expect(payload.results.map((r) => r.matched)).toEqual([true, false])
  }, 20000)
})
