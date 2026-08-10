// Bộ xử lý HTTP của launcher (scripts/staticHandler.mjs).
//
// Đây là bề mặt DUY NHẤT của dự án nhận dữ liệu từ ngoài tiến trình: khi
// người học mở app bằng shortcut, máy chủ lắng nghe ở 127.0.0.1:4173 và
// bất kỳ trang web nào họ ghé cũng bắn được request vào đó.
//
// Bất biến duy nhất mà file test này canh: MỘT REQUEST HỎNG KHÔNG BAO GIỜ
// ĐƯỢC GIẾT TIẾN TRÌNH. Listener của `http` chạy đồng bộ nên một cú ném là
// uncaught exception — Node thoát, máy chủ chết giữa buổi học, cửa sổ app
// trắng bóc. Đợt quét bảo mật 08-10 tìm ra đúng đường đó: `GET /%` làm
// `decodeURIComponent` ném URIError và không ai bắt.

import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Writable } from 'node:stream'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createStaticHandler } from '../scripts/staticHandler.mjs'

/** Bản nhại của ServerResponse: vừa là stream ghi được, vừa ghi lại mã trả về. */
class FakeRes extends Writable {
  statusCode: number | null = null
  headers: Record<string, string> = {}
  headersSent = false
  body = ''
  killed = false

  setHeader(key: string, value: string): void {
    this.headers[key] = value
  }

  writeHead(code: number, headers?: Record<string, string>): this {
    this.statusCode = code
    Object.assign(this.headers, headers ?? {})
    this.headersSent = true
    return this
  }

  override _write(chunk: Buffer, _enc: string, done: () => void): void {
    this.body += chunk.toString()
    done()
  }

  override destroy(): this {
    this.killed = true
    return super.destroy() as this
  }
}

/** Bắn một request qua bộ xử lý và đợi tới lúc nó trả lời xong. */
type Handler = ReturnType<typeof createStaticHandler>

async function request(handler: Handler, url: string): Promise<FakeRes> {
  const res = new FakeRes()
  const finished = new Promise<void>((resolve) => {
    res.on('finish', () => resolve())
    res.on('close', () => resolve())
  })
  handler({ url }, res)
  await Promise.race([finished, new Promise<void>((r) => setTimeout(r, 500))])
  return res
}

let distDir = ''
let brokenDir = ''

beforeAll(() => {
  distDir = mkdtempSync(join(tmpdir(), 'netmaster-dist-'))
  writeFileSync(join(distDir, 'index.html'), '<!doctype html><title>app</title>', 'utf8')
  writeFileSync(join(distDir, 'app.js'), 'console.log(1)', 'utf8')

  // Cây "hỏng": index.html là THƯ MỤC, nên mở file chắc chắn lỗi (EISDIR)
  // — cách tái lập tất định đường stream ném lỗi ở tick sau.
  brokenDir = mkdtempSync(join(tmpdir(), 'netmaster-broken-'))
  mkdirSync(join(brokenDir, 'index.html'))
})

afterAll(() => {
  rmSync(distDir, { recursive: true, force: true })
  rmSync(brokenDir, { recursive: true, force: true })
})

describe('request hỏng không được giết máy chủ', () => {
  it('escape phần trăm hỏng → 400, KHÔNG ném (ca đợt quét bảo mật chỉ ra)', async () => {
    const handler = createStaticHandler({ distDir, marker: 'netmaster-launcher' })
    for (const bad of ['/%', '/%C0', '/%c0%ae', '/%zz', '/a%']) {
      const res = await request(handler, bad)
      expect(res.statusCode, `đường dẫn "${bad}"`).toBe(400)
    }
  })

  it('mở file hỏng → trả lời rồi thôi, không có lỗi nào bay lên tiến trình', async () => {
    const handler = createStaticHandler({ distDir: brokenDir, marker: 'netmaster-launcher' })
    const res = await request(handler, '/')
    // Header 200 đã gửi trước khi stream kịp báo lỗi, nên đường duy nhất
    // còn lại là cắt kết nối — miễn là KHÔNG ném.
    expect(res.killed || res.statusCode === 500).toBe(true)
  })

  it('chưa build (dist rỗng) → 404 nói thật, không phải 200 rỗng', async () => {
    const empty = mkdtempSync(join(tmpdir(), 'netmaster-empty-'))
    try {
      const res = await request(createStaticHandler({ distDir: empty, marker: 'm' }), '/gi-do')
      expect(res.statusCode).toBe(404)
    } finally {
      rmSync(empty, { recursive: true, force: true })
    }
  })
})

describe('phục vụ bình thường vẫn nguyên như cũ', () => {
  const handler = () => createStaticHandler({ distDir, marker: 'netmaster-launcher' })

  it('file tĩnh có thật thì trả đúng nội dung và đúng kiểu', async () => {
    const res = await request(handler(), '/app.js')
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe('console.log(1)')
    expect(res.headers['content-type']).toBe('text/javascript; charset=utf-8')
  })

  it('đường không phải file tĩnh rơi về index.html (browser router)', async () => {
    const res = await request(handler(), '/bai/m1-bai-1')
    expect(res.statusCode).toBe(200)
    expect(res.body).toContain('<title>app</title>')
  })

  it('dấu nhận dạng x-app luôn được gắn — đó là thứ launcher dùng để nhận ra máy chủ của mình', async () => {
    const res = await request(handler(), '/')
    expect(res.headers['x-app']).toBe('netmaster-launcher')
    const bad = await request(handler(), '/%')
    expect(bad.headers['x-app']).toBe('netmaster-launcher')
  })

  it('đường leo ra ngoài dist KHÔNG đọc được file ngoài (rơi về index.html)', async () => {
    const res = await request(handler(), '/../../../../etc/passwd')
    expect(res.statusCode).toBe(200)
    expect(res.body).toContain('<title>app</title>')
  })
})
