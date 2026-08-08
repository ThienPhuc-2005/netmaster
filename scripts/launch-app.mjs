// Bộ mở app trên máy: dựng bản build tĩnh, phục vụ ở localhost rồi mở
// cửa sổ trình duyệt ở chế độ "app" (không thanh địa chỉ, không tab).
//
// Chạy qua shortcut ngoài Desktop -> không thấy cửa sổ dòng lệnh nào.
// Không dính gì tới engine hay nội dung bài học; chỉ là lớp vỏ khởi động.

import { createServer } from 'node:http'
import { spawn, spawnSync } from 'node:child_process'
import { createReadStream, existsSync, readdirSync, statSync, appendFileSync } from 'node:fs'
import { extname, join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const projectDir = resolve(scriptDir, '..')
const distDir = join(projectDir, 'dist')
const logFile = join(scriptDir, 'launch.log')

const FIRST_PORT = 4173
const LAST_PORT = 4183
const MARKER = 'netmaster-launcher'

function log(message) {
  try {
    appendFileSync(logFile, `${new Date().toISOString()} ${message}\n`)
  } catch {
    // Ghi log hỏng thì kệ, không được làm chết đường mở app.
  }
}

// --- 1. Build lại khi mã nguồn mới hơn bản dist -------------------------

/** Mốc thời gian sửa mới nhất trong một cây thư mục (bỏ qua node_modules). */
function newestMtime(path) {
  if (!existsSync(path)) return 0
  const info = statSync(path)
  if (!info.isDirectory()) return info.mtimeMs
  let newest = info.mtimeMs
  for (const entry of readdirSync(path)) {
    if (entry === 'node_modules' || entry === '.git') continue
    newest = Math.max(newest, newestMtime(join(path, entry)))
  }
  return newest
}

function needsBuild() {
  const built = join(distDir, 'index.html')
  if (!existsSync(built)) return true
  const builtAt = statSync(built).mtimeMs
  const sources = ['src', 'content', 'index.html', 'package.json', 'vite.config.ts']
  return sources.some((rel) => newestMtime(join(projectDir, rel)) > builtAt)
}

if (needsBuild()) {
  log('nguon moi hon dist -> build lai')
  // shell: true là bắt buộc trên Windows — từ Node 20 trở đi spawnSync
  // không chạy thẳng npm.cmd được nữa (chặn lỗ hổng chèn tham số .cmd).
  // Truyền nguyên một chuỗi lệnh (không tách tham số) để Node khỏi cảnh
  // báo DEP0190 — ở đây không có tham số nào do người dùng nhập vào.
  const built = spawnSync('npm run build', { cwd: projectDir, encoding: 'utf8', shell: true })
  if (built.status !== 0) {
    log(`build that bai (${built.status}): ${built.error?.message ?? ''} ${built.stderr ?? ''}`)
    if (!existsSync(join(distDir, 'index.html'))) process.exit(1)
    log('dung tam ban dist cu')
  } else {
    log('build xong')
  }
}

// --- 2. Máy chủ tĩnh cho SPA -------------------------------------------

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

const server = createServer((req, res) => {
  res.setHeader('x-app', MARKER)
  const url = new URL(req.url ?? '/', 'http://localhost')
  const wanted = resolve(distDir, `.${decodeURIComponent(url.pathname)}`)

  // Đường dẫn phải nằm trong dist (chặn ../../ đi ra ngoài).
  const inside = wanted === distDir || wanted.startsWith(distDir + '\\') || wanted.startsWith(distDir + '/')
  let file = inside && existsSync(wanted) && statSync(wanted).isFile() ? wanted : null

  // Router của app là browser router: mọi đường không phải file tĩnh đều
  // trả index.html để react-router tự định tuyến phía trình duyệt.
  if (!file) file = join(distDir, 'index.html')

  res.writeHead(200, {
    'content-type': MIME[extname(file)] ?? 'application/octet-stream',
    'cache-control': 'no-cache',
  })
  createReadStream(file).pipe(res)
})

/** Kiểm tra cổng đang bận có phải máy chủ của chính app này không. */
async function isOurServer(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/`, { method: 'GET' })
    return res.headers.get('x-app') === MARKER
  } catch {
    return false
  }
}

async function listenSomewhere() {
  for (let port = FIRST_PORT; port <= LAST_PORT; port += 1) {
    const bound = await new Promise((done) => {
      const onError = (err) => {
        server.removeListener('listening', onListening)
        done(err.code === 'EADDRINUSE' ? 'busy' : 'error')
      }
      const onListening = () => {
        server.removeListener('error', onError)
        done('ok')
      }
      server.once('error', onError)
      server.once('listening', onListening)
      server.listen(port, '127.0.0.1')
    })

    if (bound === 'ok') return { port, started: true }
    if (bound === 'busy' && (await isOurServer(port))) return { port, started: false }
  }
  return null
}

const bound = await listenSomewhere()
if (!bound) {
  log(`khong con cong trong khoang ${FIRST_PORT}-${LAST_PORT}`)
  process.exit(1)
}
const appUrl = `http://localhost:${bound.port}/`
log(bound.started ? `mo may chu o ${appUrl}` : `dung lai may chu san o ${appUrl}`)

// --- 3. Mở cửa sổ dạng app ---------------------------------------------

/** Chrome/Edge có cờ --app: cửa sổ riêng, không tab, không thanh địa chỉ. */
function findBrowser() {
  const roots = [
    process.env['ProgramFiles'],
    process.env['ProgramFiles(x86)'],
    process.env['LOCALAPPDATA'],
  ].filter(Boolean)
  const candidates = [
    'Google\\Chrome\\Application\\chrome.exe',
    'Microsoft\\Edge\\Application\\msedge.exe',
    'BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    'Chromium\\Application\\chrome.exe',
  ]
  for (const rel of candidates) {
    for (const root of roots) {
      const full = join(root, rel)
      if (existsSync(full)) return full
    }
  }
  return null
}

const browser = findBrowser()
if (browser) {
  spawn(browser, [`--app=${appUrl}`, '--window-size=1280,860'], {
    detached: true,
    stdio: 'ignore',
  }).unref()
  log(`mo bang ${browser}`)
} else {
  // Không có trình duyệt nhân Chromium: mở bằng trình duyệt mặc định.
  spawn('cmd.exe', ['/c', 'start', '', appUrl], { detached: true, stdio: 'ignore' }).unref()
  log('khong thay Chrome/Edge, mo bang trinh duyet mac dinh')
}

// Tiến trình này đã trót mở máy chủ thì phải sống tiếp để phục vụ; nếu
// chỉ dùng lại máy chủ có sẵn thì thoát ngay cho gọn.
if (!bound.started) process.exit(0)
