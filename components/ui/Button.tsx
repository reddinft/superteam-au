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

// Inline padding/font styles — bypasses @layer base reset that zeroes out padding
// when Tailwind utility classes are used (CSS layer specificity conflict in v4)
const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '8px 20px', fontSize: '0.875rem', lineHeight: '1.25rem' },
  md: { padding: '12px 32px', fontSize: '1rem', lineHeight: '1.5rem' },
  lg: { padding: '16px 48px', fontSize: '1.125rem', lineHeight: '1.75rem' },
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: '#e2e8f0',
    border: '1px solid rgba(124, 58, 237, 0.6)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    border: 'none',
  },
}

const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'all 0.15s ease',
  textDecoration: 'none',
  letterSpacing: '0.01em',
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
  const style: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  }

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          if (variant === 'primary') el.style.filter = 'brightness(1.15)'
          if (variant === 'secondary') el.style.borderColor = 'var(--color-brand-purple)'
          if (variant === 'ghost') el.style.color = 'var(--text-primary)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.filter = ''
          if (variant === 'secondary') el.style.borderColor = 'var(--color-brand-yellow)'
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
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        if (variant === 'primary') el.style.filter = 'brightness(1.15)'
        if (variant === 'secondary') el.style.borderColor = 'var(--color-brand-purple)'
        if (variant === 'ghost') el.style.color = 'var(--text-primary)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.filter = ''
        if (variant === 'secondary') el.style.borderColor = 'var(--color-brand-yellow)'
        if (variant === 'ghost') el.style.color = 'var(--text-secondary)'
      }}
    >
      {children}
    </button>
  )
}
