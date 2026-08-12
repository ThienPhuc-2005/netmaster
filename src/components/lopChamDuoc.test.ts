// Vùng chạm của nút chỉ-là-chữ (phát hiện O1, lượt rà soát màn hẹp).
//
// jsdom KHÔNG tính layout nên không đo được chiều cao thật; thứ khoá được
// ở đây là LUẬT: mọi nút chữ nhỏ phải mang lớp nới vùng chạm, và lớp đó
// phải thật sự đặt sàn 24px. Phép đo thật đã làm trên browser: trước khi
// sửa "Mở lại bài" 56×16, "Bỏ dòng này" 73×16, "Xem lại" 56×16 — đều dưới
// mức tối thiểu 24px của WCAG 2.5.8.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { LOP_CHAM_DUOC } from './lopChamDuoc'

const GOC = join(process.cwd(), 'src')

/** Những file có nút chỉ-là-chữ; thêm chỗ mới thì khai vào đây. */
const NOI_CO_NUT_CHU = [
  'features/profile/LearningInsights.tsx',
  'components/DisputeButton.tsx',
  'features/learn/LearnPage.tsx',
]

describe('nút chỉ-là-chữ phải đủ chỗ cho ngón tay (O1)', () => {
  it('lớp nới vùng chạm đặt sàn ít nhất 24px', () => {
    // `min-h-6` của Tailwind = 1.5rem = 24px, đúng mức WCAG 2.5.8.
    expect(LOP_CHAM_DUOC).toContain('min-h-6')
    // Nới bằng padding rồi kéo lại bằng margin âm — chữ đứng nguyên chỗ,
    // chỉ vùng nhắm to ra. Thiếu vế margin âm là cả trang xô lệch.
    expect(LOP_CHAM_DUOC).toMatch(/py-\d/)
    expect(LOP_CHAM_DUOC).toMatch(/-my-\d/)
  })

  it('mọi chỗ có nút chữ đều đã áp lớp đó', () => {
    for (const file of NOI_CO_NUT_CHU) {
      const noi = readFileSync(join(GOC, file), 'utf8')
      expect(noi, `${file} có nút chữ mà chưa nới vùng chạm`).toContain('LOP_CHAM_DUOC')
    }
  })

  it('hai nút cạnh nhau ở trang Hồ sơ: một cái XOÁ, nên cả hai phải đủ to', () => {
    // Đây là lý do O1 không chỉ là chuyện khó bấm: "Mở lại bài" và "Bỏ
    // dòng này" nằm cùng một dòng, bấm trượt là mất dữ liệu chứ không
    // phải mất một cú bấm.
    const noi = readFileSync(join(GOC, 'features/profile/LearningInsights.tsx'), 'utf8')
    const soLanAp = noi.split('LOP_CHAM_DUOC').length - 1
    expect(soLanAp, 'còn nút chữ nào chưa áp thì đôi nút nguy hiểm vẫn hở').toBeGreaterThanOrEqual(5)
  })
})
