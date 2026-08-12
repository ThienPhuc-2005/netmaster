// Phép quét MÃ NGUỒN: chỗ nào đọc "cả khóa học" mà quên tự kiểm? (ý N3)
//
// VÌ SAO CẦN MỘT TEST QUÉT CHỮ, thứ vốn không đẹp: từ khối 21.49 app mở
// được bằng KHÚC ĐẦU đã tải, nên `loadModules()` có thể đang cụt. Mọi chỗ
// đối xử với danh sách ấy như CẢ KHÓA HỌC đều nói dối khi mạng yếu — và
// lớp lỗi này không có hình dạng chung để một test hành vi bắt được: nó
// nằm rải rác ở bất cứ file nào lỡ viết `modules.at(-1)` hay lấy
// `modules.length` làm tổng. Ba lần đã dính: "module cuối khóa" ở màn
// thi, mốc tốt nghiệp, và — do chính phép quét này tìm ra — dải đường đi
// nói "đã đậu 3 trên 12" thay vì trên 21.
//
// CÁCH THOÁT khi test này đỏ, chọn một:
//   - hỏi `noiDungDayDu()` trước khi tuyên bố gì về cả khóa;
//   - hoặc lấy tổng từ `tongSoModule()` (biết được kể cả khi chưa tải gói
//     nào) thay vì độ dài danh sách đã tải;
//   - hoặc thêm file vào `MIEN_TRU` KÈM LÝ DO, nếu chỗ đó thật sự chỉ nói
//     về phần đã có.
//
// Giới hạn đã biết, khai ra để không ai tưởng nó là lưới kín: quét bằng
// biểu thức chữ nên chỉ bắt được hai lối viết phổ biến dưới đây. Nó là
// cái chuông, không phải cái khóa.

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const GOC = join(process.cwd(), 'src')

/** File được miễn, kèm lý do — thêm vào đây là một quyết định, không phải cách né. */
const MIEN_TRU: Record<string, string> = {
  'content/index.ts': 'chính là nơi định nghĩa "đủ hay chưa" — nó phải đếm được cả hai con số',
}

/**
 * Bỏ comment trước khi soi — BẮT BUỘC, không phải cho gọn.
 *
 * Bản đầu của phép quét này soi thẳng nguyên văn file, nên một chữ
 * `tongSoModule` nằm trong CHÚ THÍCH cũng đủ tha cả file. Thử lại đúng
 * cái lỗi nó vừa tìm ra thì test vẫn xanh — tức phép quét tự vô hiệu hóa
 * bằng chính lời giải thích của người viết. Giữ nguyên dòng để đếm số.
 */
function boComment(noi: string): string {
  return noi.replace(/\/\*[\s\S]*?\*\//g, (khoi) => khoi.replace(/[^\n]/g, ' ')).replace(/\/\/[^\n]*/g, '')
}

function moiFileNguon(thuMuc: string, goc = ''): string[] {
  const ra: string[] = []
  for (const muc of readdirSync(thuMuc, { withFileTypes: true })) {
    const duong = join(thuMuc, muc.name)
    const tuongDoi = goc === '' ? muc.name : `${goc}/${muc.name}`
    if (muc.isDirectory()) {
      ra.push(...moiFileNguon(duong, tuongDoi))
      continue
    }
    if (!/\.tsx?$/.test(muc.name)) continue
    if (/\.test\.tsx?$/.test(muc.name)) continue // test được phép dựng cảnh cụt
    ra.push(tuongDoi)
  }
  return ra
}

/** Lấy PHẦN TỬ CUỐI của danh sách module — tức tự nhận "đây là cuối khóa". */
const CUOI_KHOA = /\b(?:allModules|modules|loadModules\(\))\s*\.at\(-1\)/

/**
 * Lấy ĐỘ DÀI danh sách module. Bỏ qua ba lối viết vô hại: kiểm rỗng, và
 * lấy phần tử cuối bằng chỉ số (`modules[modules.length - 1]`) — cái đó
 * nói về "chủ đề cuối ĐANG CÓ", không phải về cả khóa.
 */
const TONG_KHOA = /\b(?:allModules|modules)\.length\b/
const VO_HAI = /(?:length\s*[=!]==?\s*0|length\s*>\s*0|length\s*-\s*1)/

describe('không chỗ nào được coi danh sách đã tải là CẢ KHÓA HỌC (N3)', () => {
  const files = moiFileNguon(GOC)

  it('quét được kha khá file — phép quét rỗng là phép quét vô dụng', () => {
    expect(files.length).toBeGreaterThan(50)
  })

  it('mọi chỗ đọc "cả khóa" đều có tự kiểm, hoặc lấy tổng từ đúng nguồn', () => {
    const pham: string[] = []
    for (const file of files) {
      if (file in MIEN_TRU) continue
      const noi = boComment(readFileSync(join(GOC, file), 'utf8'))
      // Đã hỏi "đủ chưa" hoặc đã lấy tổng từ nguồn biết cả khóa → yên tâm.
      if (noi.includes('noiDungDayDu') || noi.includes('tongSoModule')) continue
      for (const [i, dong] of noi.split('\n').entries()) {
        if (CUOI_KHOA.test(dong)) pham.push(`${file}:${i + 1} — lấy module CUỐI: ${dong.trim()}`)
        else if (TONG_KHOA.test(dong) && !VO_HAI.test(dong)) {
          pham.push(`${file}:${i + 1} — lấy SỐ LƯỢNG module làm tổng: ${dong.trim()}`)
        }
      }
    }
    expect(
      pham,
      'Chỗ này nói về CẢ KHÓA HỌC trong khi nội dung có thể mới về một khúc.\n' +
        'Hỏi noiDungDayDu() trước, hoặc lấy tổng từ tongSoModule(), hoặc khai miễn trừ kèm lý do:\n' +
        pham.join('\n'),
    ).toEqual([])
  })

  it('mọi file được miễn trừ đều còn tồn tại và đều có lý do viết ra', () => {
    for (const [file, lyDo] of Object.entries(MIEN_TRU)) {
      expect(files, `miễn trừ ${file} nhưng file đó không còn`).toContain(file)
      expect(lyDo.length, `miễn trừ ${file} mà không nói lý do`).toBeGreaterThan(20)
    }
  })
})
