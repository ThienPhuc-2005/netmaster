// MCP server của NetMaster (khối 21.13) — cho Claude cắm thẳng vào BỘ
// CHẤM THẬT và nội dung thật của app.
//
// Vì sao viết tay JSON-RPC thay vì kéo @modelcontextprotocol/sdk về:
// giao thức stdio của MCP là JSON-RPC 2.0 phân cách bằng dòng, đủ nhỏ để
// viết trọn trong một file — và dự án này đã hai lần chọn tự làm thay vì
// thêm dependency (icon PWA, earcon). Thêm một cây phụ thuộc để phục vụ
// bốn cái tool là không đáng.
//
// Server CHỈ ĐỌC. Nó không sửa nội dung, không sửa tiến độ, không gọi
// mạng. Việc nới danh sách đáp án vẫn là quyết định của người soạn bài;
// tool chỉ đưa ra dòng JSON để dán.
//
// Chạy thử tay:
//   echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node tools/mcp/server.mjs

import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createInterface } from 'node:readline'
import {
  acceptPatchLine,
  findQuestions,
  gradeAnswers,
  indexModules,
  narrowAccepts,
  reviewDisputes,
} from './lib.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const CONTENT_DIR = join(ROOT, 'content', 'modules')

/** Nạp toàn bộ nội dung một lần lúc khởi động — 21 file, đọc là xong. */
function loadIndex() {
  const mods = readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(CONTENT_DIR, f), 'utf8').replace(/^﻿/, '')))
  return indexModules(mods)
}

const index = loadIndex()

const TOOLS = [
  {
    name: 'grade_answer',
    description:
      'Chấm thử câu trả lời bằng ĐÚNG bộ chấm app dùng (typedAnswerMatches). Dùng cái này thay vì đoán xem app sẽ chấm ra sao.',
    inputSchema: {
      type: 'object',
      properties: {
        questionId: { type: 'string', description: 'Id câu hỏi, ví dụ m4-b2-ret-1' },
        answers: { type: 'array', items: { type: 'string' }, description: 'Các cách trả lời muốn thử' },
      },
      required: ['questionId', 'answers'],
    },
  },
  {
    name: 'find_question',
    description: 'Tìm câu hỏi theo id chính xác hoặc theo một mẩu chữ trong đề bài.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' }, limit: { type: 'number' } },
      required: ['query'],
    },
  },
  {
    name: 'narrow_accepts',
    description:
      'Liệt kê câu gõ tay có nguy cơ chấm oan: accept từ chối chính lời giải của nó, hoặc accept có quá ít cách nói.',
    inputSchema: {
      type: 'object',
      properties: { minVariants: { type: 'number', description: 'Ngưỡng số cách nói, mặc định 3' } },
    },
  },
  {
    name: 'review_disputes',
    description:
      'Đọc sổ "mình nghĩ câu này đúng" từ file sao lưu của người học (dán nguyên nội dung JSON) và chấm lại từng câu bằng bộ chấm hôm nay.',
    inputSchema: {
      type: 'object',
      properties: { backupJson: { type: 'string', description: 'Nguyên văn nội dung file sao lưu' } },
      required: ['backupJson'],
    },
  },
  {
    name: 'accept_patch_line',
    description:
      'Dựng sẵn dòng "accept": [...] để người soạn bài dán vào content/modules/*.json. Server KHÔNG tự sửa nội dung.',
    inputSchema: {
      type: 'object',
      properties: {
        questionId: { type: 'string' },
        extras: { type: 'array', items: { type: 'string' }, description: 'Các cách nói muốn thêm' },
      },
      required: ['questionId', 'extras'],
    },
  },
]

function callTool(name, args) {
  switch (name) {
    case 'grade_answer':
      return gradeAnswers(index, String(args.questionId), args.answers ?? [])
    case 'find_question':
      return findQuestions(index, String(args.query), args.limit ?? 8)
    case 'narrow_accepts':
      return narrowAccepts(index, args.minVariants ?? 3)
    case 'review_disputes':
      return reviewDisputes(index, String(args.backupJson))
    case 'accept_patch_line': {
      const q = index.find((x) => x.questionId === args.questionId)
      if (q === undefined) return { error: `Không có câu nào mang id "${args.questionId}"` }
      return { questionId: q.questionId, line: acceptPatchLine(q.accept, args.extras ?? []) }
    }
    default:
      return { error: `Tool lạ: ${name}` }
  }
}

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`)
}

function handle(msg) {
  // Notification (không có id) thì theo giao thức là KHÔNG được trả lời.
  if (msg.id === undefined) return

  if (msg.method === 'initialize') {
    send({
      jsonrpc: '2.0',
      id: msg.id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'netmaster', version: '1.0.0' },
      },
    })
    return
  }
  if (msg.method === 'tools/list') {
    send({ jsonrpc: '2.0', id: msg.id, result: { tools: TOOLS } })
    return
  }
  if (msg.method === 'tools/call') {
    const { name, arguments: args } = msg.params ?? {}
    let payload
    try {
      payload = callTool(name, args ?? {})
    } catch (err) {
      payload = { error: err instanceof Error ? err.message : String(err) }
    }
    send({
      jsonrpc: '2.0',
      id: msg.id,
      result: { content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }] },
    })
    return
  }
  send({ jsonrpc: '2.0', id: msg.id, error: { code: -32601, message: `Method not found: ${msg.method}` } })
}

createInterface({ input: process.stdin }).on('line', (line) => {
  const text = line.trim()
  if (text === '') return
  try {
    handle(JSON.parse(text))
  } catch {
    // Dòng rác giữa luồng: bỏ qua, đừng làm sập server đang phục vụ.
  }
})
