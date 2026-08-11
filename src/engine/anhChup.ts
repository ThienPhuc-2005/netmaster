// Ảnh chụp tiến độ tự động (kho ý tưởng F3) — phần LUẬT, thuần TS.
//
// Vì sao cần: toàn bộ công sức người học nằm trong MỘT key localStorage,
// và mỗi lần bump version persist là một lần cửa migrate viết đè lên nó.
// Nút "Xuất ra file" đã có (E4) nhưng nó đòi người học nhớ bấm; ảnh chụp
// tự động là đường lùi cho lúc không ai kịp nhớ — migrate lỡ hỏng, nhập
// nhầm một file sao lưu cũ, hay chỉ đơn giản là bấm nhầm nút xóa.
//
// File này KHÔNG đụng localStorage và KHÔNG tự lấy giờ (luật vùng
// `src/engine/`); nó chỉ trả lời hai câu: đã đến lúc chụp chưa, và chụp
// xong thì bỏ bản nào. Phần đọc/ghi thật nằm ở `src/store/anhChup.ts`.

import type { ISODate } from './types'

/**
 * Giữ mấy bản. Ba là chỗ cân giữa hai cái giá:
 * - mỗi bản là một BẢN SAO ĐẦY ĐỦ của tiến độ, mà localStorage chỉ có ~5MB;
 * - một bản thì hỏng rồi mới chụp là chụp đúng bản hỏng.
 * Ba bản = ba ngày học gần nhất, đủ để nhận ra "hôm nay dữ liệu lạ" rồi
 * lùi về hôm kia.
 */
export const SO_BAN_GIU = 3

/**
 * Vì sao có bản chụp này.
 *
 * `truoc-nang-cap` quý hơn `dinh-ky` một bậc: nó là bản DUY NHẤT chụp
 * đúng khoảnh khắc dữ liệu còn nguyên hình cũ, trước khi migrate chạm
 * vào. Mọi bản định kỳ sau đó đều đã là dữ liệu ĐÃ qua migrate — nếu
 * chính migrate là thứ làm hỏng thì chúng chép lại cái hỏng.
 *
 * `truoc-khoi-phuc` là bản chụp ngay trước lúc người học tự bấm lùi về
 * một bản cũ: chính thao tác cứu dữ liệu cũng ghi đè dữ liệu, nên bấm
 * nhầm dòng phải còn đường quay lại chỗ vừa đứng.
 */
export type LyDoChup = 'dinh-ky' | 'truoc-nang-cap' | 'truoc-khoi-phuc'

export interface AnhChup {
  /** Thời điểm chụp (ISO datetime) — dùng để hiện cho người đọc. */
  luc: string
  /** Ngày chụp — luật "mỗi ngày một bản" đọc trường này. */
  ngay: ISODate
  /** Version persist của dữ liệu bên trong (bản chụp cũ có thể thấp hơn). */
  version: number
  lyDo: LyDoChup
  /** Nguyên văn chuỗi nằm trong localStorage lúc chụp. */
  duLieu: string
}

/**
 * Đến lúc chụp bản định kỳ chưa?
 *
 * "Định kỳ" ở đây là MỖI NGÀY HỌC một bản, không phải mỗi giờ: ba bản
 * cách nhau ba tiếng thì cả ba cùng chứa một lỗi vừa xảy ra sáng nay.
 * Ngày nghỉ không học thì không có bản nào — đúng, vì không có gì mới
 * để chụp.
 *
 * Bản `truoc-nang-cap` cũng tính là "đã chụp hôm nay": nó vừa chụp xong
 * cùng một tiến độ, chụp thêm một bản nữa chỉ tốn chỗ.
 */
export function nenChupDinhKy(danhSach: readonly AnhChup[], homNay: ISODate): boolean {
  return danhSach.length === 0 || danhSach[0]!.ngay !== homNay
}

/**
 * Thêm một bản mới rồi cắt về trần, danh sách MỚI NHẤT ĐỨNG ĐẦU.
 *
 * Luật cắt có một ngoại lệ: **bản `truoc-nang-cap` mới nhất luôn được
 * giữ**, kể cả khi nó đã bị ba bản định kỳ đẩy ra ngoài trần. Ba ngày
 * học liên tiếp sau một lần nâng cấp là chuyện thường, mà đúng cái bản
 * ấy mới là đường lùi thật — cắt nó đi thì tính năng này chỉ còn tác
 * dụng trong 48 giờ đầu. Nó chiếm chỗ của bản định kỳ CŨ NHẤT trong số
 * được giữ, nên trần vẫn là trần.
 */
export function themAnh(
  danhSach: readonly AnhChup[],
  moi: AnhChup,
  tran: number = SO_BAN_GIU,
): AnhChup[] {
  const day = [moi, ...danhSach]
  if (day.length <= tran) return day

  const giu = day.slice(0, tran)
  const nangCapMoiNhat = day.find((a) => a.lyDo === 'truoc-nang-cap')
  if (nangCapMoiNhat === undefined || giu.includes(nangCapMoiNhat)) return giu
  // Đẩy bản định kỳ cũ nhất ra để nhường chỗ. Thứ tự mới-nhất-đứng-đầu
  // vẫn đúng: bản được cứu bao giờ cũng cũ hơn mọi bản còn lại.
  return [...giu.slice(0, tran - 1), nangCapMoiNhat]
}
