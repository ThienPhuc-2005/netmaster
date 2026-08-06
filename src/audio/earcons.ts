// 4 âm hiệu (earcon) của app — spec 4.3, tổng hợp bằng Web Audio API,
// không file âm thanh, tất cả tắt được qua settings:
// - correct: "ting" ngắn, sáng.
// - incorrect: 2 nốt trầm nhẹ — KHÔNG chói tai, không trừng phạt.
// - lessonComplete: hợp âm rải đi lên ~1 giây (peak-end: kết bài phải đã).
// - stageUp: fanfare ngắn đặc trưng riêng khi mở chặng mới.
// Phần đọc-suy nghĩ im lặng hoàn toàn — không có âm nền nào khác.

import { useSettings } from '../store/settings'

export type EarconKind = 'correct' | 'incorrect' | 'lessonComplete' | 'stageUp'

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
    osc.frequency.value = t.freq
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
}

/**
 * Phát một âm hiệu. Không làm gì khi: người dùng đã tắt âm trong
 * Settings, hoặc môi trường không có Web Audio (test/node). Không bao
 * giờ ném lỗi — âm thanh là gia vị, không phải chức năng.
 */
export function playEarcon(kind: EarconKind): void {
  if (!useSettings.getState().soundOn) return
  const audio = ensureContext()
  if (audio === null) return
  try {
    playTones(audio, EARCONS[kind])
  } catch {
    // Audio failures must never break the learning flow.
  }
}
