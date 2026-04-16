import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps {
  href?: string
  variant?: 'primary' | 'ghost'
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function Button({
  href,
  variant = 'primary',
  children,
  type = 'button',
  onClick,
  disabled,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-cinzel text-[0.65rem] tracking-[0.22em] uppercase px-5 sm:px-8 py-3.5 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'

  const primaryStyle = {
    backgroundColor: 'var(--accent)',
    color: 'var(--white)',
    border: '1px solid var(--accent)',
  } as React.CSSProperties

  const ghostStyle = {
    backgroundColor: 'transparent',
    color: 'var(--chalk)',
    border: '1px solid var(--border-hover)',
  } as React.CSSProperties

  const style = variant === 'primary' ? primaryStyle : ghostStyle
  const classes = `${base} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={style}
    >
      {children}
    </button>
  )
}
