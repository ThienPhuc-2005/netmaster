// Cảnh báo "accept quá hẹp" trên bản đọc duyệt nội dung (khối 21.14).
//
// Bản duyệt là nơi người soạn bài nhìn thấy nội dung bằng mắt trước khi
// nó tới tay người học — bắt lớp lỗi accept-hẹp ở đây rẻ hơn nhiều so
// với đợi một người học bực đủ để đi báo (đúng lớp lỗi của khối 21.10).
//
// Test này quan trọng vì bộ nội dung hiện tại đã dọn sạch: bản duyệt in
// ra KHÔNG còn cảnh báo nào, nên nếu luật hỏng cũng chẳng ai thấy. Ở đây
// dựng câu giả để chuông vẫn phải kêu.

import { describe, expect, it } from 'vitest'
import { renderQuestion } from '../scripts/render-content-review.mjs'

const lt = (vi: string) => ({ vi })

function typedQuestion(accept: string[]) {
  return { id: 'q-thu', kind: 'typed', prompt: lt('Câu thử?'), accept }
}

describe('cảnh báo soạn bài trên bản đọc duyệt', () => {
  it('kêu khi câu tiếng Việt chỉ nhận dưới 3 cách nói', () => {
    const out = (renderQuestion(typedQuestion(['bộ định tuyến', 'router']) as never) as string[]).join('\n')
    expect(out).toContain('CẢNH BÁO SOẠN BÀI')
    expect(out).toContain('chỉ 2 cách nói')
  })

  it('im khi đã đủ ba cách nói', () => {
    const out = (
      renderQuestion(typedQuestion(['bộ định tuyến', 'router', 'thiết bị định tuyến']) as never) as string[]
    ).join('\n')
    expect(out).not.toContain('CẢNH BÁO SOẠN BÀI')
  })

  it('KHÔNG đếm bản viết không dấu là một cách nói khác', () => {
    // Bộ chấm vốn đã nhân nhượng dấu, nên cặp có-dấu/không-dấu chỉ là một
    // cách nói viết hai kiểu — đếm thành hai là tự ru ngủ.
    const out = (
      renderQuestion(typedQuestion(['cổng access', 'cong access', 'switch']) as never) as string[]
    ).join('\n')
    expect(out).toContain('chỉ 2 cách nói')
  })

  it('im với đáp án là KÝ HIỆU — 192.168.1.64 không có cách nói thứ hai', () => {
    const out = (renderQuestion(typedQuestion(['192.168.1.64', '192.168.1.64/26']) as never) as string[]).join('\n')
    expect(out).not.toContain('CẢNH BÁO SOẠN BÀI')
  })

  it('im với đáp án chỉ có MỘT CÁI TÊN (tên lệnh, viết tắt kèm tên đầy đủ)', () => {
    const commands = (renderQuestion(typedQuestion(['ipconfig']) as never) as string[]).join('\n')
    const acronym = (
      renderQuestion(typedQuestion(['arp', 'address resolution protocol']) as never) as string[]
    ).join('\n')
    expect(commands).not.toContain('CẢNH BÁO SOẠN BÀI')
    expect(acronym).not.toContain('CẢNH BÁO SOẠN BÀI')
  })

  it('câu KHÔNG phải dạng gõ tay thì không dính luật này', () => {
    const mcq = {
      id: 'q-mcq',
      kind: 'mcq',
      prompt: lt('Chọn đi?'),
      choices: [lt('a'), lt('b')],
      answerIndex: 0,
    }
    const out = (renderQuestion(mcq as never) as string[]).join('\n')
    expect(out).not.toContain('CẢNH BÁO SOẠN BÀI')
  })
})
