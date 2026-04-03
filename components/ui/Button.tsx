'use client'

import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-brand-purple)',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-default)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    border: 'none',
  },
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseClass = `inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-150 cursor-pointer ${sizeClasses[size]} ${className}`

  const style = variantStyles[variant]

  if (href) {
    return (
      <a
        href={href}
        className={baseClass}
        style={style}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          if (variant === 'primary') el.style.filter = 'brightness(1.1)'
          if (variant === 'secondary') el.style.borderColor = 'var(--color-brand-purple)'
          if (variant === 'ghost') el.style.color = 'var(--text-primary)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.filter = ''
          if (variant === 'secondary') el.style.borderColor = 'var(--border-default)'
          if (variant === 'ghost') el.style.color = 'var(--text-secondary)'
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={baseClass}
      style={style}
      onClick={onClick}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        if (variant === 'primary') el.style.filter = 'brightness(1.1)'
        if (variant === 'secondary') el.style.borderColor = 'var(--color-brand-purple)'
        if (variant === 'ghost') el.style.color = 'var(--text-primary)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.filter = ''
        if (variant === 'secondary') el.style.borderColor = 'var(--border-default)'
        if (variant === 'ghost') el.style.color = 'var(--text-secondary)'
      }}
    >
      {children}
    </button>
  )
}
