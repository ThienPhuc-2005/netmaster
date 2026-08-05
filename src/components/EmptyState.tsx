import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Empty state có hướng dẫn — spec 4.5: "không màn hình trống". Mọi tab
 * chưa có dữ liệu đều nói rõ chuyện gì sẽ xảy ra ở đây và vì sao.
 */
export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
      <div className="rounded-full border border-edge bg-panel p-4 text-ink-muted">
        <Icon size={28} aria-hidden />
      </div>
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <p className="text-sm leading-relaxed text-ink-muted">{body}</p>
      {action}
    </div>
  )
}
