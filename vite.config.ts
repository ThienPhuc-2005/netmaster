import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// @ts-expect-error -- plugin thuần JS (cùng họ với scripts/*.mjs), không có .d.ts
import { pwa } from './scripts/pwa-plugin.mjs'

// GitHub Pages serves the app under /<repo-name>/. The deploy workflow
// passes GHPAGES_BASE="/<repo-name>/" so the base always matches the
// actual repo name; local dev and plain `vite build` stay at '/'.
const base = process.env.GHPAGES_BASE ?? '/'

/**
 * Hai file font của CHỮ THÂN BÀI được preload ngay trong <head>.
 *
 * Vì sao chỉ hai: chữ tiếng Việt lấy ký tự ASCII từ subset `latin` và
 * lấy dấu từ subset `vietnamese`, nên riêng cân nặng 400 đã phải có đủ
 * cả hai mới đọc được một câu. Các cân 600/700 và font mono chỉ xuất
 * hiện ở tiêu đề/số liệu — để trình duyệt tự lấy theo nhịp thường.
 *
 * Vì sao cần plugin thay vì viết tay vào index.html: tên file có hash,
 * đổi mỗi lần build. Viết tay là link chết sau lần build kế tiếp.
 */
const CRITICAL_FONTS = [
  /be-vietnam-pro-latin-400-normal-[^/]+\.woff2$/,
  /be-vietnam-pro-vietnamese-400-normal-[^/]+\.woff2$/,
]

function preloadCriticalFonts(): Plugin {
  return {
    name: 'netmaster-preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const emitted = Object.keys(ctx.bundle ?? {})
        const picked = CRITICAL_FONTS.map((pattern) => {
          const hit = emitted.find((file) => pattern.test(file))
          // Fontsource đổi cách đặt tên file là preload lặng lẽ biến mất —
          // đúng kiểu tối ưu "còn trên giấy". Chết ở build còn hơn.
          if (hit === undefined) {
            throw new Error(
              `preload font: không tìm thấy file khớp ${pattern} trong bundle. ` +
                'Kiểm lại tên file của @fontsource rồi sửa CRITICAL_FONTS.',
            )
          }
          return hit
        })
        return picked.map((file) => ({
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            href: `${base}${file}`,
            // Font luôn tải ở chế độ CORS-anonymous; thiếu thuộc tính này
            // là trình duyệt tải file HAI LẦN (một cho preload, một cho
            // @font-face) — tối ưu thành phản tối ưu.
            crossorigin: '',
          },
          injectTo: 'head-prepend' as const,
        }))
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadCriticalFonts(), pwa(base)],
  base,
  // Preview harness assigns a free port via PORT when 5173 is taken.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
