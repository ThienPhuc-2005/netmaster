// Ảnh chụp tiến độ tự động (kho ý tưởng F3) — phần ĐỌC/GHI localStorage.
//
// Luật "khi nào chụp, bỏ bản nào" nằm ở `engine/anhChup.ts`; file này lo
// ba việc bẩn mà engine cố ý không biết: đọc giờ thật, đụng localStorage,
// và xoay xở khi hết chỗ.
//
// LUẬT LỚN NHẤT CỦA FILE NÀY: **ảnh chụp không bao giờ được làm hỏng
// việc lưu chính**. Nó là cái phao, không phải hàng hóa — hết chỗ thì bỏ
// bản cũ, cùng lắm bỏ sạch phao, chứ không ném lỗi lên cho tiến độ thật
// chết theo. Mọi lối vào của file này vì thế đều nuốt lỗi.

import { isoFromDate } from '../engine/dates'
import { nenChupDinhKy, themAnh, type AnhChup, type LyDoChup } from '../engine/anhChup'

/** Key persist của store tiến độ — nguồn chân lý một chỗ, tránh gõ lại. */
export const PROGRESS_KEY = 'netmaster-progress'

/** Ảnh chụp nằm ở key RIÊNG: không chui vào state persist, nên không bump version. */
export const ANH_CHUP_KEY = 'netmaster-anh-chup'

interface KhoAnhChup {
  danhSach: AnhChup[]
}

function laAnhChup(x: unknown): x is AnhChup {
  if (x === null || typeof x !== 'object') return false
  const a = x as Record<string, unknown>
  return (
    typeof a['luc'] === 'string' &&
    typeof a['ngay'] === 'string' &&
    typeof a['version'] === 'number' &&
    typeof a['duLieu'] === 'string' &&
    (a['lyDo'] === 'dinh-ky' ||
      a['lyDo'] === 'truoc-nang-cap' ||
      a['lyDo'] === 'truoc-khoi-phuc' ||
      a['lyDo'] === 'truoc-nhap')
  )
}

/**
 * Đọc kho ảnh chụp. Rác thì trả về rỗng chứ KHÔNG ném: kho ảnh hỏng là
 * chuyện của cái phao, không phải chuyện của người đang học.
 */
export function docAnhChup(): AnhChup[] {
  try {
    const raw = localStorage.getItem(ANH_CHUP_KEY)
    if (raw === null) return []
    const kho = JSON.parse(raw) as KhoAnhChup
    if (!Array.isArray(kho.danhSach)) return []
    return kho.danhSach.filter(laAnhChup)
  } catch {
    return []
  }
}

/**
 * Ghi kho ảnh, tự co lại khi hết chỗ.
 *
 * localStorage chỉ có ~5MB cho cả app, mà mỗi bản chụp là một bản sao
 * đầy đủ của tiến độ — người học lắp 12 bài lab dở thì ba bản chụp là
 * một khoản thật. Hết chỗ thì bỏ bản CŨ NHẤT rồi thử lại, tới khi vừa
 * hoặc không còn bản nào.
 */
function ghiAnhChup(danhSach: AnhChup[]): void {
  let thu = danhSach
  for (;;) {
    try {
      localStorage.setItem(ANH_CHUP_KEY, JSON.stringify({ danhSach: thu } satisfies KhoAnhChup))
      return
    } catch {
      if (thu.length <= 1) {
        // Một bản cũng không vừa: dọn sạch key này để trả chỗ lại cho
        // tiến độ thật. Không có phao còn hơn chìm cả thuyền.
        try {
          localStorage.removeItem(ANH_CHUP_KEY)
        } catch {
          /* hết cách thì thôi, im lặng */
        }
        return
      }
      thu = thu.slice(0, thu.length - 1)
    }
  }
}

/** Đọc version trong chuỗi persist; không đọc được thì `null`. */
function docVersion(raw: string): number | null {
  try {
    const parsed = JSON.parse(raw) as { version?: unknown; state?: unknown }
    if (typeof parsed.state !== 'object' || parsed.state === null) return null
    return typeof parsed.version === 'number' ? parsed.version : null
  } catch {
    return null
  }
}

function chup(duLieu: string, version: number, lyDo: LyDoChup, bayGio: Date): void {
  const danhSach = docAnhChup()
  // Đã có bản chứa ĐÚNG dữ liệu này rồi thì thôi: hai bản giống hệt nhau
  // chiếm hai chỗ trong ba mà chỉ lùi về được một điểm. Bắt được lúc thử
  // thật: lùi về bản trước-nâng-cấp xong, migrate chạy lại và định chụp
  // thêm một bản y hệt bản vừa lùi về.
  //
  // Ngoại lệ cho `truoc-nang-cap`: nó mang thêm QUYỀN không bị cắt khỏi
  // trần, nên trùng dữ liệu với một bản ĐỊNH KỲ vẫn đáng chụp — chỉ trùng
  // với một bản cùng loại mới là thừa thật.
  const trungDuLieu = danhSach.some((a) => a.duLieu === duLieu)
  const trungCaLyDo = danhSach.some((a) => a.duLieu === duLieu && a.lyDo === lyDo)
  if (lyDo === 'truoc-nang-cap' ? trungCaLyDo : trungDuLieu) return
  ghiAnhChup(
    themAnh(danhSach, {
      luc: bayGio.toISOString(),
      ngay: isoFromDate(bayGio),
      version,
      lyDo,
      duLieu,
    }),
  )
}

/**
 * Bản định kỳ — chụp lúc MỞ APP, mỗi ngày học một bản.
 *
 * Chụp lúc mở app chứ không phải lúc đóng: đây là bản "trước khi buổi
 * học hôm nay chạm vào dữ liệu", nên hỏng gì trong buổi này cũng lùi
 * được về trước buổi.
 */
export function chupDinhKy(bayGio: Date): void {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (raw === null) return // chưa học gì thì chưa có gì để chụp
    const version = docVersion(raw)
    if (version === null) return // chuỗi hỏng: chụp lại cái hỏng chỉ tốn chỗ
    if (!nenChupDinhKy(docAnhChup(), isoFromDate(bayGio))) return
    chup(raw, version, 'dinh-ky', bayGio)
  } catch {
    /* xem ghi chú đầu file */
  }
}

/**
 * Bản chụp trước khi cửa migrate viết đè — lý do tồn tại của cả tính năng.
 *
 * Gọi từ TRONG `migrate` (store progress), tức là đã cầm sẵn state cũ
 * vừa đọc lên. Không kiểm luật "mỗi ngày một bản": khoảnh khắc này mỗi
 * lần nâng cấp chỉ có MỘT, bỏ lỡ là không chụp lại được.
 */
export function chupTruocNangCap(duLieu: string, version: number, bayGio: Date): void {
  try {
    chup(duLieu, version, 'truoc-nang-cap', bayGio)
  } catch {
    /* xem ghi chú đầu file */
  }
}

/**
 * Cất bản ĐANG CÓ lại trước khi một thao tác nào đó ghi đè lên nó.
 *
 * Tách ra thành cửa riêng vì có HAI thao tác ghi đè trọn tiến độ, không
 * phải một: lùi về ảnh chụp (`khoiPhuc` bên dưới) và nhập file sao lưu ở
 * trang Hồ sơ. Cái thứ hai trước đây không gọi ai cả — chọn nhầm file là
 * mất sạch, không đường lùi (phát hiện L2).
 *
 * Nuốt lỗi theo luật đầu file: không chụp được thì vẫn phải cho thao tác
 * kia chạy tiếp — đó mới là việc người học đang đòi.
 */
export function chupTruocGhiDe(lyDo: LyDoChup, bayGio: Date): void {
  try {
    const hienTai = localStorage.getItem(PROGRESS_KEY)
    if (hienTai === null) return // chưa có gì để mất
    const version = docVersion(hienTai)
    if (version === null) return // chuỗi hỏng: chụp lại cái hỏng chỉ tốn chỗ
    chup(hienTai, version, lyDo, bayGio)
  } catch {
    /* xem ghi chú đầu file */
  }
}

/**
 * Lùi tiến độ về một bản chụp.
 *
 * Tự chụp bản HIỆN TẠI trước khi ghi đè — chính thao tác cứu dữ liệu
 * cũng là một thao tác ghi đè, bấm nhầm dòng thì phải còn đường quay
 * lại chỗ vừa đứng. Hàm này
 * KHÔNG tải lại trang — việc đó của tầng UI, và phải làm ngay sau đó vì
 * state trong RAM lúc này đã là bản cũ của tiến độ vừa bị ghi đè.
 */
export function khoiPhuc(anh: AnhChup, bayGio: Date): void {
  const hienTai = localStorage.getItem(PROGRESS_KEY)
  const version = hienTai === null ? null : docVersion(hienTai)
  if (hienTai !== null && version !== null && hienTai !== anh.duLieu) {
    try {
      chup(hienTai, version, 'truoc-khoi-phuc', bayGio)
    } catch {
      /* không chụp được thì vẫn cho khôi phục — đó là việc người học đang đòi */
    }
  }
  localStorage.setItem(PROGRESS_KEY, anh.duLieu)
}
