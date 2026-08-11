// Luật rút gọn nhãn thiết bị trên bản vẽ isometric.
//
// Ở riêng file này chứ không nằm trong `ban-ve-tu-lab.mjs` vì script kia
// CHẠY NGAY khi được import (nó dựng lại toàn bộ bản vẽ nháp) — không
// import vào test được. Luật thì đáng có test: bốn bước dưới đây đọc ra
// từ 80 tên thiết bị thật, và mỗi lần nới một bước là một lần có thể
// lặng lẽ đẻ ra hai khối mang cùng một tên.

/** Nhãn dài quá bao nhiêu ký tự thì phải rút — khung vẽ 220x130 không co chữ. */
export const NHAN_DAI = 11

/**
 * Tiền tố nói LOẠI thiết bị — hình khối đã nói rồi nên chữ khỏi nói lại.
 *
 * CHỈ nhận khi đứng trước dấu GẠCH, không nhận khi đứng trước khoảng trắng:
 * "PC-KinhDoanh" thì "PC" đúng là cái thẻ loại, nhưng "Máy chủ trên
 * Internet" thì "Máy" là một nửa của "máy chủ" — bỏ nó đi ra "chủ trên
 * Internet", một câu không còn nghĩa gì (đã thử trên 80 tên thiết bị thật).
 */
const TIEN_TO = /^(PC|MAY|MÁY|SW|SWITCH|R|RT|ROUTER|SRV)-+/i

/**
 * Cụm chữ DÍNH LIỀN kiểu CamelCase -> chữ cái đầu: "KinhDoanh" -> "KD".
 *
 * Phải từ HAI tiếng trở lên mới nhận: "Internet" một tiếng mà rút thành
 * "I" thì nhãn hết nghĩa, còn "KinhDoanh" rút thành "KD" thì người đọc
 * sơ đồ vẫn nhận ra phòng ban — đúng lối viết tắt vẫn dùng trên sơ đồ vẽ
 * tay. Chữ IN HOA HẾT ("MAY-TRUONG") KHÔNG dính vào khuôn này vì không có
 * tiếng thường theo sau, và đó là chủ ý: đoán chỗ tách tiếng trong một
 * cụm toàn hoa là máy đoán mò.
 */
const CUM_DINH = /(?:\p{Lu}\p{Ll}+){2,}/gu

/**
 * Rút gọn nhãn cho vừa khung 220x130, theo bốn khuôn ĐỌC ĐƯỢC TỪ DỮ LIỆU
 * (80 tên thiết bị đang có trong nội dung, 23 cái dài quá 11 ký tự):
 *
 *   1. Bỏ đuôi trong ngoặc — "Máy A (kế toán)" -> "Máy A". Phần trong
 *      ngoặc là chú thích, phần trước mới là cái gọi tên.
 *   2. Bỏ tiền tố loại thiết bị — "PC-KinhDoanh" -> "KinhDoanh". Khối vẽ
 *      đã có hình dáng riêng cho máy trạm / switch / router rồi.
 *   3. Cụm chữ dính liền còn lại -> chữ cái đầu ("PC-KinhDoanh" ->
 *      "PC-KD"). Bước này đứng TRƯỚC bước cắt vì nó giữ được cả HAI đầu
 *      của cái tên, còn cắt thì bỏ hẳn nửa sau. Nó cũng là đường thoát
 *      cho cặp "PC-KinhDoanh"/"SW-KinhDoanh" ở lab M21: bỏ tiền tố thì
 *      hai nhãn trùng nhau nên bước 2 phải lùi, giữ tiền tố mà rút ruột
 *      thì ra "PC-KD" với "SW-KD" — vẫn ngắn, vẫn phân biệt được.
 *   4. Còn dài thì cắt ở dấu phân cách gần nhất — "MAY-TRUONG-PHONG" ->
 *      "MAY-TRUONG". Cắt giữa chữ thì thà để nguyên.
 *
 * Sau mỗi bước kiểm TRÙNG trên cả bản vẽ: hai khối mang cùng một tên là
 * hình nói dối, còn nhãn dài chỉ là hình chật. Bước nào gây trùng (hoặc
 * rút mất sạch chữ) thì lùi lại nguyên bước đó cho cả bản vẽ.
 *
 * Đây là ĐIỂM KHỞI ĐẦU, không phải bản cuối: máy không biết "KyThuat" đọc
 * là "kỹ thuật". Nên script gọi hàm này in ra mọi chỗ nó đổi, và mọi chỗ
 * nó bó tay.
 *
 * @param {readonly string[]} nhanGoc nhãn của MỌI khối trong cùng một bản vẽ
 * @returns {string[]} nhãn đã rút, cùng thứ tự với đầu vào
 */
export function rutGonNhan(nhanGoc) {
  const buoc = [
    (s) => s.replace(/\s*\([^)]*\)\s*$/, '').trim(),
    (s) => s.replace(TIEN_TO, '').trim(),
    (s) => s.replace(CUM_DINH, (cum) => (cum.match(/\p{Lu}\p{Ll}+/gu) ?? []).map((tieng) => tieng[0]).join('')),
    (s) => {
      if (s.length <= NHAN_DAI) return s
      const cat = s.slice(0, NHAN_DAI + 1)
      const i = Math.max(cat.lastIndexOf('-'), cat.lastIndexOf(' '))
      return i >= 3 ? cat.slice(0, i) : s
    },
  ]

  let hienTai = [...nhanGoc]
  for (const ap of buoc) {
    // Xét độ dài HIỆN TẠI, không xét độ dài gốc: "PC-A (tầng 1)" bỏ ngoặc
    // xong đã còn "PC-A" là đủ ngắn rồi, chạy tiếp bước bỏ tiền tố thì ra
    // mỗi chữ "A" — ngắn thật nhưng chẳng còn nói gì.
    const thu = hienTai.map((s) => (s.length > NHAN_DAI ? ap(s) : s))
    const trung = new Set(thu).size !== thu.length || thu.some((s) => s.length === 0)
    if (!trung) hienTai = thu
  }
  return hienTai
}
