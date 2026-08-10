// Manifest + danh sách vỏ app của PWA (kho ý tưởng F1).
//
// Hai thứ đáng khóa bằng test, vì hỏng cái nào cũng hỏng IM LẶNG:
//
//  1. **Đường dẫn theo BASE.** GitHub Pages phục vụ app dưới
//     /<tên-repo>/. `start_url` hay icon thiếu tiền tố base thì nút
//     "Thêm vào màn hình chính" mở ra trang 404 — mà chỉ lộ khi cài
//     thật trên điện thoại, không bao giờ lộ lúc chạy máy mình.
//  2. **Hai mức precache phải chia đúng.** Vỏ app (bắt buộc, `addAll`)
//     thiếu file là màn trắng; phần cố-gắng phải ôm trọn 21 chunk nội
//     dung, vì `AppGate` chờ `primeModules()` kéo đủ cả 21 — thiếu một
//     file là app không khởi động nổi khi mất mạng (đã đo thật).

import { describe, expect, it } from 'vitest'
// @ts-expect-error -- plugin thuần JS, dùng chung với vite.config.ts
import { buildManifest, extraAssets, shellAssets } from '../scripts/pwa-plugin.mjs'

/** Hình dạng file thật của một bản build (lấy từ dist thật, rút gọn). */
const BUNDLE = [
  'index.html',
  'assets/index-Eia8Dm8B.js',
  'assets/index-BqvgN_I-.css',
  'assets/be-vietnam-pro-latin-400-normal-D3pAcv6d.woff2',
  'assets/be-vietnam-pro-vietnamese-400-normal-Cg8mBqWz.woff2',
  'assets/be-vietnam-pro-latin-700-normal-BhY1kZ2p.woff2',
  'assets/jetbrains-mono-latin-400-normal-Ck9tFvXe.woff2',
  'assets/module-17-McJY7g7g.js',
  'assets/module-20-B_mUd2TY.js',
  'assets/DesignPage-BqvgN_I-.js',
  'assets/createLucideIcon-6SnO24Y8.js',
]

describe('manifest PWA', () => {
  it('chạy ở gốc: mọi đường dẫn bắt đầu bằng /', () => {
    const m = buildManifest('/')
    expect(m.start_url).toBe('/')
    expect(m.scope).toBe('/')
    expect(m.icons.every((i: { src: string }) => i.src.startsWith('/'))).toBe(true)
  })

  it('chạy dưới GitHub Pages: MỌI đường dẫn mang tiền tố base', () => {
    const base = '/netmaster/'
    const m = buildManifest(base)
    expect(m.start_url).toBe(base)
    expect(m.scope, 'thiếu scope là trình duyệt từ chối đăng ký').toBe(base)
    for (const icon of m.icons) {
      expect(icon.src.startsWith(base), `icon lạc base: ${icon.src}`).toBe(true)
    }
  })

  it('có đủ icon để cài được: 192, 512 và cả bản maskable', () => {
    const m = buildManifest('/')
    const sizes = m.icons.map((i: { sizes: string }) => i.sizes)
    expect(sizes).toContain('192x192')
    expect(sizes).toContain('512x512')
    // Thiếu maskable là Android tự bo góc ảnh vuông, viền phong bì bị xén.
    expect(m.icons.some((i: { purpose?: string }) => i.purpose === 'maskable')).toBe(true)
  })

  it('cài xong mở ra là app, không phải tab trình duyệt; nền tối không loé trắng', () => {
    const m = buildManifest('/')
    expect(m.display).toBe('standalone')
    expect(m.background_color).toBe('#0d1421')
    expect(m.lang).toBe('vi')
  })
})

describe('vỏ app — phần BẮT BUỘC cache xong mới coi là cài được', () => {
  const shell = shellAssets(BUNDLE)

  it('gồm entry JS, CSS và hai font thân bài', () => {
    expect(shell).toContain('assets/index-Eia8Dm8B.js')
    expect(shell).toContain('assets/index-BqvgN_I-.css')
    expect(shell).toContain('assets/be-vietnam-pro-latin-400-normal-D3pAcv6d.woff2')
    expect(shell).toContain('assets/be-vietnam-pro-vietnamese-400-normal-Cg8mBqWz.woff2')
  })

  it('vỏ phải MỎNG: không ôm nội dung bài học, không ôm font phụ', () => {
    expect(shell.some((f: string) => f.includes('module-'))).toBe(false)
    expect(shell.some((f: string) => f.includes('700-normal'))).toBe(false)
    expect(shell.some((f: string) => f.includes('jetbrains-mono'))).toBe(false)
  })

  it('bundle lạ hoắc thì trả về rỗng để build tự chết, không ship app "offline" rỗng', () => {
    expect(shellAssets(['assets/khong-giong-ai.txt'])).toEqual([])
  })
})

describe('phần cache CỐ GẮNG — thứ app cần để chạy trọn khi mất mạng', () => {
  const extra = extraAssets(BUNDLE)

  it('ôm TRỌN nội dung: AppGate chờ đủ 21 chunk, thiếu một file là app câm', () => {
    expect(extra).toContain('assets/module-17-McJY7g7g.js')
    expect(extra).toContain('assets/module-20-B_mUd2TY.js')
  })

  it('ôm cả chunk chia nhỏ và font phụ — entry import chúng ngay lúc khởi động', () => {
    expect(extra).toContain('assets/createLucideIcon-6SnO24Y8.js')
    expect(extra).toContain('assets/jetbrains-mono-latin-400-normal-Ck9tFvXe.woff2')
  })

  it('KHÔNG trùng với vỏ app — cache hai lần là phí băng thông lượt cài', () => {
    const shell = new Set(shellAssets(BUNDLE))
    expect(extra.some((f: string) => shell.has(f))).toBe(false)
  })

  it('bỏ HTML (điều hướng có nhánh riêng) và source map (chỉ dành cho dev)', () => {
    const withNoise = extraAssets([...BUNDLE, 'assets/index-Eia8Dm8B.js.map'])
    expect(withNoise.some((f: string) => f.endsWith('.html'))).toBe(false)
    expect(withNoise.some((f: string) => f.endsWith('.map'))).toBe(false)
  })
})
