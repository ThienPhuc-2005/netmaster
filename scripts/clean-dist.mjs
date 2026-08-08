// Dọn dist/ trước khi build. Vite có emptyOutDir mặc định nhưng OneDrive
// hay khóa file khiến bước đó thất bại IM LẶNG — hội đồng đếm được 6 thế
// hệ bundle cũ (~7.5MB rác) nằm lại trong dist/, deploy nguyên thư mục là
// ship rác lên Pages. Script này xóa có retry; xóa không nổi thì NÓI RA.

import { rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

if (existsSync(dist)) {
  try {
    rmSync(dist, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
    console.log('Đã dọn dist/ trước khi build.')
  } catch (error) {
    console.warn(`Không dọn được dist/ (OneDrive đang khóa file?): ${error.message}`)
    console.warn('Build vẫn chạy, nhưng dist/ có thể còn bundle cũ — kiểm lại trước khi deploy.')
  }
}
