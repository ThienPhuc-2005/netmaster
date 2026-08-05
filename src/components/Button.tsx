import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const BASE =
  'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ' +
  'transition-colors duration-(--dur) ease-(--ease) disabled:opacity-50 disabled:pointer-events-none'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-contrast hover:brightness-110',
  ghost: 'border border-edge text-ink hover:bg-panel-hover',
}

export function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  return <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest} />
}
