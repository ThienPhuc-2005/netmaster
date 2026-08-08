// Sinh scripts/netmaster.ico cho shortcut ngoài Desktop.
// Vẽ bằng tay ra pixel rồi tự đóng gói PNG + ICO, không thêm thư viện.
// Chạy lại khi muốn đổi hình: `node scripts/make-icon.mjs`

import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = join(dirname(fileURLToPath(import.meta.url)), 'netmaster.ico')

const BG = [13, 20, 33] // #0D1421 — nền tối như app
const FG = [56, 189, 248] // #38BDF8 — xanh nhấn 10%
const SIZES = [16, 32, 48, 64, 128, 256]
const SS = 4 // lấy mẫu quá 4x4 cho cạnh mượt

/** Khoảng cách từ điểm tới đoạn thẳng — dùng vẽ dây nối. */
function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax
  const dy = by - ay
  const len2 = dx * dx + dy * dy
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2))
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

/** Hình biểu tượng: một nút trung tâm nối ra ba nút vệ tinh (mạng sao). */
function sample(x, y, s) {
  const r = s * 0.22 // bán kính bo góc nền
  const cx = s / 2
  const cy = s / 2

  // Nền bo góc: nằm ngoài thì trong suốt.
  const qx = Math.max(Math.abs(x - cx) - (s / 2 - r), 0)
  const qy = Math.max(Math.abs(y - cy) - (s / 2 - r), 0)
  if (Math.hypot(qx, qy) > r) return null

  const hub = s * 0.115
  const node = s * 0.095
  const wire = s * 0.028
  const orbit = s * 0.29
  const satellites = [-90, 30, 150].map((deg) => {
    const rad = (deg * Math.PI) / 180
    return [cx + orbit * Math.cos(rad), cy + orbit * Math.sin(rad)]
  })

  if (Math.hypot(x - cx, y - cy) <= hub) return FG
  for (const [sx, sy] of satellites) {
    if (Math.hypot(x - sx, y - sy) <= node) return FG
    if (distToSegment(x, y, cx, cy, sx, sy) <= wire) return FG
  }
  return BG
}

/** Vẽ một kích thước ra vùng đệm RGBA, khử răng cưa bằng lấy mẫu quá. */
function render(s) {
  const rgba = Buffer.alloc(s * s * 4)
  for (let y = 0; y < s; y += 1) {
    for (let x = 0; x < s; x += 1) {
      let r = 0
      let g = 0
      let b = 0
      let a = 0
      for (let sy = 0; sy < SS; sy += 1) {
        for (let sx = 0; sx < SS; sx += 1) {
          const c = sample(x + (sx + 0.5) / SS, y + (sy + 0.5) / SS, s)
          if (c) {
            r += c[0]
            g += c[1]
            b += c[2]
            a += 255
          }
        }
      }
      const n = SS * SS
      const i = (y * s + x) * 4
      // Màu nhân sẵn với độ phủ rồi chia lại -> viền không bị xỉn.
      const cover = a / (255 * n)
      rgba[i] = cover > 0 ? Math.round(r / (cover * n)) : 0
      rgba[i + 1] = cover > 0 ? Math.round(g / (cover * n)) : 0
      rgba[i + 2] = cover > 0 ? Math.round(b / (cover * n)) : 0
      rgba[i + 3] = Math.round(a / n)
    }
  }
  return rgba
}

// --- Đóng gói PNG ------------------------------------------------------

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

function toPng(rgba, s) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(s, 0)
  ihdr.writeUInt32BE(s, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // truecolour + alpha
  const raw = Buffer.alloc(s * (s * 4 + 1))
  for (let y = 0; y < s; y += 1) {
    raw[y * (s * 4 + 1)] = 0 // filter none
    rgba.copy(raw, y * (s * 4 + 1) + 1, y * s * 4, (y + 1) * s * 4)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// --- Đóng gói ICO (mỗi mục là một PNG, Windows 10 đọc được) -------------

const images = SIZES.map((s) => ({ s, png: toPng(render(s), s) }))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(images.length, 4)

let offset = 6 + images.length * 16
const entries = images.map(({ s, png }) => {
  const e = Buffer.alloc(16)
  e[0] = s === 256 ? 0 : s
  e[1] = s === 256 ? 0 : s
  e.writeUInt16LE(1, 4) // planes
  e.writeUInt16LE(32, 6) // bits per pixel
  e.writeUInt32LE(png.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += png.length
  return e
})

writeFileSync(OUT, Buffer.concat([header, ...entries, ...images.map((i) => i.png)]))
console.log(`Đã ghi ${OUT} (${SIZES.join(', ')} px)`)
