// Hình GÓI TIN dùng chung toàn app.
//
// Spec 4.2: "Gói tin luôn cùng một hình dạng ở mọi module" (picture
// superiority). Đó phải là một component thật chứ không phải lời hứa —
// onboarding và phòng lab cùng vẽ từ đây, nên chúng không thể trôi khỏi
// nhau. Vẽ quanh gốc toạ độ (0,0) để nơi dùng chỉ việc tịnh tiến.

export function PacketShape({ scale = 1 }: { scale?: number }) {
  return (
    <g className="text-accent" transform={scale === 1 ? undefined : `scale(${scale})`}>
      <rect
        x="-11"
        y="-8"
        width="22"
        height="16"
        rx="3"
        fill="var(--panel)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M-11 -5 0 4 11 -5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </g>
  )
}
