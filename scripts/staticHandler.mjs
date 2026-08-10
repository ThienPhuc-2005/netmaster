// Bộ xử lý HTTP của launcher (tách khỏi launch-app.mjs để test được).
//
// Vì sao tách: `launch-app.mjs` là script chạy thẳng — nạp nó vào là nó
// build, mở cổng và bung trình duyệt — nên không test được một dòng nào.
// Mà đây lại là bề mặt DUY NHẤT của dự án nhận dữ liệu từ ngoài tiến
// trình: bất kỳ trang web nào người học mở cũng bắn được request vào
// 127.0.0.1:4173. Đợt quét bảo mật 08-10 chỉ đúng chỗ này.
//
// LUẬT SỐNG CÒN của file này: MỘT REQUEST HỎNG KHÔNG BAO GIỜ ĐƯỢC GIẾT
// TIẾN TRÌNH. Listener của `http` chạy đồng bộ, nên một cú ném ở đây là
// uncaught exception và Node thoát — máy chủ chết giữa buổi học, cửa sổ
// app trắng bóc. Ba chỗ từng ném và giờ đều có lưới:
//   1. `decodeURIComponent` gặp escape hỏng ("/%", "/%C0") → URIError;
//   2. `statSync` gặp file vừa biến mất giữa hai lời gọi (TOCTOU);
//   3. `createReadStream` mở file hỏng — stream không có handler 'error'
//      là một uncaught exception nữa, lần này ở tick sau.

import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json',
}

const TEXT = { 'content-type': 'text/plain; charset=utf-8' }

/** Trả lời một mã lỗi nếu còn kịp; đã gửi header rồi thì cắt kết nối. */
function fail(res, code, message) {
  if (res.headersSent) {
    res.destroy()
    return
  }
  res.writeHead(code, TEXT)
  res.end(message)
}

/**
 * Dựng bộ xử lý phục vụ tĩnh cho bản build trong `distDir`.
 *
 * Router của app là browser router nên mọi đường không phải file tĩnh
 * đều trả index.html — react-router tự định tuyến phía trình duyệt.
 */
export function createStaticHandler({ distDir, marker }) {
  return function handle(req, res) {
    try {
      res.setHeader('x-app', marker)

      let wanted
      try {
        const url = new URL(req.url ?? '/', 'http://localhost')
        wanted = resolve(distDir, `.${decodeURIComponent(url.pathname)}`)
      } catch {
        // Escape phần trăm hỏng. Trả 400 và đứng dậy đi tiếp — KHÔNG để
        // URIError bay lên listener.
        fail(res, 400, 'duong dan khong hop le')
        return
      }

      // Đường dẫn phải nằm trong dist (chặn ../../ đi ra ngoài).
      const inside = wanted === distDir || wanted.startsWith(distDir + '\\') || wanted.startsWith(distDir + '/')
      let file = null
      if (inside) {
        try {
          file = existsSync(wanted) && statSync(wanted).isFile() ? wanted : null
        } catch {
          // File biến mất giữa existsSync và statSync — coi như không có.
          file = null
        }
      }

      if (file === null) {
        const fallback = join(distDir, 'index.html')
        // Chưa build thì nói thật bằng 404, đừng gửi 200 rỗng.
        if (!existsSync(fallback)) {
          fail(res, 404, 'chua co ban build trong dist')
          return
        }
        file = fallback
      }

      const stream = createReadStream(file)
      stream.once('error', () => fail(res, 500, 'khong doc duoc file'))
      res.writeHead(200, {
        'content-type': MIME[extname(file)] ?? 'application/octet-stream',
        'cache-control': 'no-cache',
      })
      stream.pipe(res)
    } catch {
      // Lưới cuối cùng: bất kỳ thứ gì chưa lường tới cũng chỉ hỏng đúng
      // MỘT request, không hạ được máy chủ.
      fail(res, 500, 'loi may chu')
    }
  }
}
