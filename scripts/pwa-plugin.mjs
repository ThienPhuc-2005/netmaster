// Plugin Vite: phát manifest + service worker cho bản build.
//
// Vì sao tự viết thay vì `vite-plugin-pwa`: hai thứ cần ở đây đều nhỏ và
// đều phụ thuộc BASE động (GitHub Pages phục vụ dưới /<tên-repo>/), mà
// dự án vốn đã có sẵn một plugin cùng khuôn (preload font) đọc
// `ctx.bundle` để lấy tên file có hash. Kéo cả workbox về để sinh ~40
// dòng JSON và một service worker đọc hiểu được là không đáng.
//
// Luật CACHE, cân nhắc cho một app HỌC (tiến độ nằm ở localStorage):
//
//  1. **File có hash là bất biến** → cache-first, giữ mãi. Tên đổi thì
//     coi như file khác, không bao giờ phục vụ nhầm bản cũ.
//  2. **HTML đi network-first** → deploy bản mới là lần mở kế tiếp thấy
//     ngay, không phải xoá app đi cài lại.
//  3. **KHÔNG `skipWaiting`**: service worker mới chỉ nắm quyền khi mọi
//     tab đã đóng. Tráo asset dưới chân một phiên đang học là mời lỗi
//     "không tải được chunk" giữa bài — đúng lúc người ta dễ bỏ cuộc nhất.
//  4. **Precache HAI MỨC.** `install` bắt buộc phải có VỎ APP (HTML +
//     entry + CSS + 2 font thân bài) — thiếu là hỏng, nên dùng `addAll`
//     (được ăn cả, ngã về không). Phần còn lại (chunk chia nhỏ, 21 file
//     nội dung, font phụ, icon) cache theo kiểu CỐ GẮNG: từng file một,
//     hỏng file nào bỏ file đó, không kéo cả lượt cài đặt xuống.
//
//     Vì sao phải ôm luôn nội dung, dù nạp lười là quyết định đã trả giá
//     ở khối 20.2: `AppGate` CHỜ `primeModules()`, mà hàm đó kéo trọn 21
//     chunk. Thiếu một file là app không khởi động nổi — nói "chạy được
//     khi mất mạng" mà chỉ cache vỏ là hứa suông (đã đo: mất mạng ra màn
//     trắng). Hai việc này không đá nhau: nạp lười lo ĐƯỜNG NÓNG lúc vẽ
//     màn đầu, còn service worker cache SAU khi trang đã tải xong, ngoài
//     đường nóng — và trình duyệt vốn đã tải đúng những file ấy rồi.

const SW_NAME = 'sw.js'
const MANIFEST_NAME = 'manifest.webmanifest'

/** Tên cache đổi theo mỗi lần build → bản cũ bị dọn lúc SW mới activate. */
function cacheName(buildId) {
  return `netmaster-${buildId}`
}

/**
 * Manifest — hàm THUẦN để test được (base nào ra đường dẫn nấy).
 * `base` luôn có dấu / ở cuối theo quy ước của Vite.
 */
export function buildManifest(base) {
  const icon = (file, sizes, purpose) => ({
    src: `${base}${file}`,
    sizes,
    type: 'image/png',
    ...(purpose === undefined ? {} : { purpose }),
  })
  return {
    name: 'NetMaster — Học mạng máy tính từ số 0',
    short_name: 'NetMaster',
    description: 'Học mạng máy tính từ số 0 theo khoa học học tập: ôn ngắt quãng, nhớ lại chủ động, lab thực hành.',
    lang: 'vi',
    dir: 'ltr',
    start_url: base,
    scope: base,
    display: 'standalone',
    orientation: 'any',
    // Nền tối của app (tokens.css --surface) để màn khởi động không loé
    // trắng rồi mới tối — chớp sáng vào mắt người học buổi tối.
    background_color: '#0d1421',
    theme_color: '#0d1421',
    categories: ['education'],
    icons: [
      icon('icon-192.png', '192x192'),
      icon('icon-512.png', '512x512'),
      icon('icon-maskable-192.png', '192x192', 'maskable'),
      icon('icon-maskable-512.png', '512x512', 'maskable'),
    ],
  }
}

/**
 * VỎ APP — thiếu một file là màn trắng, nên đây là phần BẮT BUỘC phải
 * cache xong thì lượt cài đặt mới coi là thành công.
 */
export function shellAssets(fileNames) {
  return fileNames.filter(
    (f) =>
      f.endsWith('.css') ||
      /(^|\/)index-[^/]+\.js$/.test(f) ||
      // Hai font thân bài — cùng bộ với preload ở index.html.
      /be-vietnam-pro-(latin|vietnamese)-400-normal-[^/]+\.woff2$/.test(f),
  )
}

/**
 * Phần cache theo kiểu CỐ GẮNG: mọi thứ còn lại app cần để chạy trọn vẹn
 * khi mất mạng — chunk chia nhỏ, 21 file nội dung, font phụ, icon.
 * Hỏng file nào bỏ file đó, không kéo cả lượt cài đặt xuống.
 *
 * Bỏ `.map` (chỉ dành cho dev) và `.html` (điều hướng đã có nhánh riêng).
 */
export function extraAssets(fileNames) {
  const shell = new Set(shellAssets(fileNames))
  return fileNames.filter(
    (f) => !shell.has(f) && !f.endsWith('.map') && !f.endsWith('.html'),
  )
}

function serviceWorkerSource(base, buildId, shell, extra) {
  return `// Service worker của NetMaster — sinh lúc build, đừng sửa tay.
// Luật cache ghi ở scripts/pwa-plugin.mjs.
const CACHE = ${JSON.stringify(cacheName(buildId))}
const BASE = ${JSON.stringify(base)}
const SHELL = ${JSON.stringify([base, ...shell.map((f) => base + f)], null, 2)}
const EXTRA = ${JSON.stringify(extra.map((f) => base + f), null, 2)}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE)
      // Vỏ app: được ăn cả ngã về không — thiếu là màn trắng.
      await cache.addAll(SHELL)
      // Phần còn lại (gồm 21 file nội dung mà AppGate chờ): cố gắng từng
      // file, hỏng cái nào bỏ cái đó. Một file lỗi không được làm hỏng
      // cả lượt cài đặt.
      await Promise.allSettled(EXTRA.map((url) => cache.add(url)))
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      // Dọn cache của các bản build cũ; bản đang dùng thì giữ.
      await Promise.all(keys.filter((k) => k.startsWith('netmaster-') && k !== CACHE).map((k) => caches.delete(k)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  if (!url.pathname.startsWith(BASE)) return

  // ignoreVary: BẮT BUỘC. Máy chủ tĩnh hay gắn "Vary: Origin" (Vite
  // preview có), mà mặc định caches.match phải thoả Vary — request của
  // trang và request lúc SW tự cache có bộ header khác nhau nên trượt,
  // rồi rơi xuống fetch và chết khi mất mạng. Đây chính là lỗi làm bản
  // đầu ra MÀN TRẮNG dù cache có đủ 85 file (đã đo).
  const fromCache = (request) => caches.match(request, { ignoreVary: true })

  // Điều hướng (mở app, deep-link): mạng trước để thấy bản mới ngay;
  // mất mạng thì rơi về vỏ app đã cache — SPA tự dựng lại route.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(BASE, copy))
          return res
        })
        .catch(async () => (await fromCache(BASE)) ?? Response.error()),
    )
    return
  }

  // File có hash là bất biến: có trong cache thì dùng luôn, không thì
  // tải rồi cất lại (đây là đường nội dung bài học đi vào cache dần).
  event.respondWith(
    fromCache(req).then(
      (hit) =>
        hit ??
        fetch(req).then((res) => {
          if (res.ok && res.type === 'basic') {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(req, copy))
          }
          return res
        }),
    ),
  )
})
`
}

/**
 * @param {string} base đường dẫn gốc app được phục vụ (có / ở cuối)
 */
export function pwa(base) {
  return {
    name: 'netmaster-pwa',
    apply: 'build',

    generateBundle(_options, bundle) {
      const files = Object.keys(bundle)
      const shell = shellAssets(files)
      const extra = extraAssets(files)
      if (shell.length === 0) {
        // Vỏ app rỗng nghĩa là quy tắc lọc đã lạc hậu so với cách Vite
        // đặt tên file — chết ở build còn hơn ship một app "offline"
        // mà mất mạng là màn trắng.
        throw new Error('pwa: không tìm thấy file nào của vỏ app — xem lại shellAssets()')
      }
      // Vân tay của bản build = tên các file vỏ (đã có hash nội dung).
      const buildId = shell.join('|').replace(/[^a-z0-9]/gi, '').slice(-24)

      this.emitFile({ type: 'asset', fileName: MANIFEST_NAME, source: JSON.stringify(buildManifest(base), null, 2) })
      this.emitFile({ type: 'asset', fileName: SW_NAME, source: serviceWorkerSource(base, buildId, shell, extra) })
    },

    transformIndexHtml: {
      order: 'post',
      handler() {
        return [
          { tag: 'link', attrs: { rel: 'manifest', href: `${base}${MANIFEST_NAME}` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'theme-color', content: '#0d1421' }, injectTo: 'head' },
          // iOS không đọc manifest cho biểu tượng màn hình chính.
          { tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'apple-mobile-web-app-capable', content: 'yes' }, injectTo: 'head' },
          {
            tag: 'meta',
            attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            injectTo: 'head',
          },
        ]
      },
    },
  }
}
