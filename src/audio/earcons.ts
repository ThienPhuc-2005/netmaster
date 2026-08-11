// 8 âm hiệu (earcon) của app — spec 4.3, tổng hợp bằng Web Audio API,
// không file âm thanh, tắt được qua settings (BA nấc: đầy đủ / chỉ mốc /
// tắt — xem `duocVang` cuối file):
// - correct: "ting" ngắn, sáng.
// - incorrect: 2 nốt trầm nhẹ — KHÔNG chói tai, không trừng phạt.
// - lessonComplete: hợp âm rải đi lên ~1 giây (peak-end: kết bài phải đã).
// - stageUp: fanfare ngắn đặc trưng riêng khi mở chặng mới.
// - moduleComplete: hợp âm KẾT khi đậu cả module (kho ý tưởng C1).
// - graduation: cadence bung rộng khi đậu cả khóa — mốc lớn nhất.
// - wireClick: "tách" khi cắm xong một sợi dây trong lab (kho ý tưởng C2).
// - packetFly: "vụt" khi gói tin rời máy đi.
// Phần đọc-suy nghĩ im lặng hoàn toàn — không có âm nền nào khác.
//
// BỐN MỐC, BỐN TIẾNG KHÁC NHAU. Trước khối 21.34, đậu cả một module và
// xong một chặng nhỏ phát ra ĐÚNG MỘT tiếng (`stageUp`) — mốc lớn nhất
// của app nghe y hệt một cột mốc giữa đường, nên tai không học được thang
// bậc nào. Giờ mốc lớn có tiếng riêng: một cadence thật (át → chủ), dài
// hơn và trầm hơn mọi earcon khác, để nó nghe ra là một chỗ ĐÓNG LẠI chứ
// không phải một chỗ đi tiếp.

import { useSettings, type MucAm } from '../store/settings'

export type EarconKind =
  | 'correct'
  | 'incorrect'
  | 'lessonComplete'
  | 'stageUp'
  | 'moduleComplete'
  | 'graduation'
  | 'wireClick'
  | 'packetFly'

// Lazily created on first user gesture; browsers block audio before that.
let ctx: AudioContext | null = null

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined' || typeof AudioContext === 'undefined') return null
  ctx ??= new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

interface Tone {
  freq: number
  /**
   * Lướt cao độ tới đây trong suốt `dur` (kho ý tưởng C2). Thiếu = giữ
   * nguyên cao độ như mọi earcon cũ.
   *
   * Cần cho tiếng "vụt" của gói tin: một cú lướt liền mạch mới nghe ra
   * chuyển động, còn ba nốt rời chỉ nghe ra ba nốt rời.
   */
  glideTo?: number
  /** Seconds after "now" the tone starts. */
  at: number
  /** Envelope length in seconds. */
  dur: number
  type: OscillatorType
  /** Peak gain — kept low; earcons are cues, not alarms. */
  gain: number
}

/**
 * Hệ số âm lượng chung — nhân lên MỌI earcon, giữ nguyên cân bằng giữa
 * các nốt. 1.3 = tăng 30% theo yêu cầu người dùng (06-08: bản gốc nghe
 * hơi nhỏ). Muốn chỉnh tổng thể lần sau chỉ sửa một chỗ này.
 */
const MASTER_GAIN = 1.3

function playTones(audio: AudioContext, tones: Tone[]): void {
  const now = audio.currentTime
  for (const t of tones) {
    const osc = audio.createOscillator()
    const amp = audio.createGain()
    osc.type = t.type
    osc.frequency.setValueAtTime(t.freq, now + t.at)
    if (t.glideTo !== undefined) {
      osc.frequency.linearRampToValueAtTime(t.glideTo, now + t.at + t.dur)
    }
    // Sharp attack, exponential decay — reads as a soft "blip", no click.
    amp.gain.setValueAtTime(0.0001, now + t.at)
    amp.gain.exponentialRampToValueAtTime(Math.min(t.gain * MASTER_GAIN, 1), now + t.at + 0.012)
    amp.gain.exponentialRampToValueAtTime(0.0001, now + t.at + t.dur)
    osc.connect(amp).connect(audio.destination)
    osc.start(now + t.at)
    osc.stop(now + t.at + t.dur + 0.05)
  }
}

const EARCONS: Record<EarconKind, Tone[]> = {
  // E6 + sparkle quãng 4 phía trên — một chấm sáng, dứt ngay.
  correct: [
    { freq: 1318.5, at: 0, dur: 0.14, type: 'triangle', gain: 0.14 },
    { freq: 1760, at: 0.05, dur: 0.1, type: 'triangle', gain: 0.08 },
  ],
  // Bb3 → G3, sine tròn, lượng nhỏ — "chưa phải" chứ không phải "SAI".
  incorrect: [
    { freq: 233.08, at: 0, dur: 0.15, type: 'sine', gain: 0.11 },
    { freq: 196, at: 0.14, dur: 0.18, type: 'sine', gain: 0.11 },
  ],
  // C5-E5-G5-C6 rải chồng lên nhau ~1s — hợp âm trưởng đi lên.
  lessonComplete: [
    { freq: 523.25, at: 0, dur: 0.55, type: 'triangle', gain: 0.1 },
    { freq: 659.25, at: 0.15, dur: 0.55, type: 'triangle', gain: 0.1 },
    { freq: 783.99, at: 0.3, dur: 0.55, type: 'triangle', gain: 0.1 },
    { freq: 1046.5, at: 0.45, dur: 0.6, type: 'triangle', gain: 0.11 },
  ],
  // G4→C5→E5 dồn rồi bung hợp âm — chữ ký riêng của "mở chặng mới".
  stageUp: [
    { freq: 392, at: 0, dur: 0.12, type: 'square', gain: 0.05 },
    { freq: 523.25, at: 0.11, dur: 0.12, type: 'square', gain: 0.05 },
    { freq: 659.25, at: 0.22, dur: 0.12, type: 'square', gain: 0.05 },
    { freq: 523.25, at: 0.36, dur: 0.5, type: 'triangle', gain: 0.09 },
    { freq: 659.25, at: 0.36, dur: 0.5, type: 'triangle', gain: 0.09 },
    { freq: 783.99, at: 0.36, dur: 0.5, type: 'triangle', gain: 0.09 },
  ],
  // Cadence át → chủ (G-B-D rồi C-E-G-C), kèm một nốt C3 trầm làm chân
  // đế. Đây là chỗ DUY NHẤT trong app có nốt dưới 190Hz: cái trầm ấy mới
  // làm tai nghe ra "đóng lại" thay vì "đi tiếp". Gain từng nốt để thấp
  // (0,06-0,07) vì bốn nốt chồng cùng lúc — tổng mới là thứ tai nghe.
  moduleComplete: [
    { freq: 196, at: 0, dur: 0.26, type: 'triangle', gain: 0.07 },
    { freq: 246.94, at: 0, dur: 0.26, type: 'triangle', gain: 0.06 },
    { freq: 293.66, at: 0, dur: 0.26, type: 'triangle', gain: 0.06 },
    { freq: 130.81, at: 0.28, dur: 1.1, type: 'sine', gain: 0.09 },
    { freq: 261.63, at: 0.28, dur: 1.0, type: 'triangle', gain: 0.07 },
    { freq: 329.63, at: 0.28, dur: 1.0, type: 'triangle', gain: 0.06 },
    { freq: 392, at: 0.28, dur: 1.0, type: 'triangle', gain: 0.06 },
    { freq: 523.25, at: 0.34, dur: 0.95, type: 'triangle', gain: 0.07 },
  ],
  // Đậu CẢ KHÓA — mốc duy nhất lớn hơn đậu module. Cùng cadence át → chủ
  // như `moduleComplete` nhưng bung rộng thêm một quãng tám và ngân dài
  // gần gấp đôi: tai nhận ra "vẫn nhà đó, nhưng to hơn". Chỉ vang một lần
  // trong cả khóa nên được phép dài.
  graduation: [
    { freq: 196, at: 0, dur: 0.3, type: 'triangle', gain: 0.06 },
    { freq: 293.66, at: 0, dur: 0.3, type: 'triangle', gain: 0.06 },
    { freq: 391.99, at: 0, dur: 0.3, type: 'triangle', gain: 0.05 },
    { freq: 130.81, at: 0.32, dur: 1.9, type: 'sine', gain: 0.09 },
    { freq: 261.63, at: 0.32, dur: 1.8, type: 'triangle', gain: 0.06 },
    { freq: 329.63, at: 0.4, dur: 1.7, type: 'triangle', gain: 0.06 },
    { freq: 392, at: 0.48, dur: 1.6, type: 'triangle', gain: 0.06 },
    { freq: 523.25, at: 0.56, dur: 1.5, type: 'triangle', gain: 0.06 },
    { freq: 1046.5, at: 0.64, dur: 1.4, type: 'triangle', gain: 0.05 },
  ],
  // "Tách" — cắm xong một sợi dây (kho ý tưởng C2). Hai lớp rất ngắn:
  // một cú gõ trầm cho phần thân, một tích cao cho phần chốt. Cả hai
  // dưới 60ms và rất khẽ, vì tiếng này vang MỖI LẦN cắm dây — earcon
  // lặp nhiều mà to là thứ khiến người ta tắt cả bộ âm.
  wireClick: [
    { freq: 180, at: 0, dur: 0.045, type: 'square', gain: 0.05 },
    { freq: 2200, at: 0.008, dur: 0.03, type: 'triangle', gain: 0.03 },
  ],
  // "Vụt" — gói tin rời máy đi. Một cú lướt lên liền mạch: chuyển động
  // nghe ra được là nhờ cái lướt, không phải nhờ nốt.
  packetFly: [{ freq: 420, glideTo: 1250, at: 0, dur: 0.16, type: 'sine', gain: 0.05 }],
}

/**
 * Tiếng MỐC — cả buổi học mới vang một lần, và là thứ đáng giữ lại nhất
 * khi người học muốn bớt ồn. Mọi earcon còn lại là tiếng THAO TÁC: vang
 * mấy chục lần một buổi.
 */
const TIENG_MOC: ReadonlySet<EarconKind> = new Set<EarconKind>([
  'lessonComplete',
  'stageUp',
  'moduleComplete',
  'graduation',
])

/** Nấc âm hiện tại có cho phép tiếng này vang không. */
export function duocVang(kind: EarconKind, muc: MucAm): boolean {
  if (muc === 'tat') return false
  if (muc === 'chi-moc') return TIENG_MOC.has(kind)
  return true
}

/**
 * Phát một âm hiệu. Không làm gì khi: nấc âm hiện tại không cho phép
 * tiếng này, hoặc môi trường không có Web Audio (test/node). Không bao
 * giờ ném lỗi — âm thanh là gia vị, không phải chức năng.
 */
export function playEarcon(kind: EarconKind): void {
  if (!duocVang(kind, useSettings.getState().mucAm)) return
  const audio = ensureContext()
  if (audio === null) return
  try {
    playTones(audio, EARCONS[kind])
  } catch {
    // Audio failures must never break the learning flow.
  }
}

/**
 * Bộ nốt của từng earcon — MỞ RA CHỈ ĐỂ TEST ĐỌC.
 *
 * Không có nó thì test chỉ khẳng định được "gọi không ném lỗi", tức là
 * hai earcon giống hệt nhau vẫn xanh. Mà thứ dễ hỏng nhất ở đây đúng là
 * chuyện hai mốc lặng lẽ dùng chung một tiếng.
 */
export const TONES_FOR_TEST: Readonly<Record<EarconKind, readonly Tone[]>> = EARCONS
