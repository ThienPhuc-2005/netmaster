// Kỹ thuật cho gói tin BAY THEO ĐƯỜNG DÂY, dùng chung giữa màn onboarding
// và phòng lab — một kỹ thuật, một chỗ sửa.
//
// Cách làm: lấy mẫu N điểm dọc path SVG với easing đã "nướng sẵn" vào
// khoảng cách giữa các mẫu, rồi để thư viện animation phát lại TUYẾN
// TÍNH. Nhờ vậy gói tin bám đúng đường cong của sợi dây (thứ mà keyframe
// x/y thuần không làm được) mà vẫn giữ đúng nhịp ease-out của spec 4.2.

/** Ease-out xấp xỉ cubic-bezier(0, 0, .2, 1). */
export function easeOut(t: number): number {
  return 1 - (1 - t) ** 2.2
}

export interface HopFrames {
  xs: number[]
  ys: number[]
}

/**
 * Lấy mẫu các điểm dọc một path SVG.
 *
 * Trả `null` khi KHÔNG ĐO ĐƯỢC — jsdom không cài `getTotalLength`, tab ẩn
 * và phần tử chưa layout cho chiều dài 0. Nơi gọi phải coi `null` là tín
 * hiệu "bỏ chuyến bay, đưa gói tin thẳng tới đích": bài học nằm ở nhật ký
 * chặng, animation chỉ là lớp đắp thêm.
 */
export function samplePath(path: SVGPathElement | null, steps = 28): HopFrames | null {
  if (path === null || typeof path.getTotalLength !== 'function') return null
  const total = path.getTotalLength()
  if (!(total > 0)) return null
  const xs: number[] = []
  const ys: number[] = []
  for (let i = 0; i <= steps; i++) {
    const point = path.getPointAtLength(total * easeOut(i / steps))
    xs.push(point.x)
    ys.push(point.y)
  }
  return { xs, ys }
}
