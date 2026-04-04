'use client'

import { useState } from 'react'
import { type LucideIcon } from 'lucide-react'

interface GuildCardProps {
  icon: LucideIcon
  name: string
  description: string
  color: string
  href?: string
}

export default function GuildCard({ icon: Icon, name, description, color, href = 'https://t.me/superteamaustralia' }: GuildCardProps) {
  const [hovered, setHovered] = useState(false)
  const [toast, setToast] = useState(false)

  function handleJoin(e: React.MouseEvent) {
    e.preventDefault()
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        borderRadius: '8px',
        cursor: 'pointer',
        height: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        backgroundColor: hovered ? `${color}0D` : 'var(--surface-1)',
        borderTop: hovered ? `1px solid ${color}` : `1px solid var(--border-default)`,
        borderRight: hovered ? `1px solid ${color}` : `1px solid var(--border-default)`,
        borderBottom: hovered ? `1px solid ${color}` : `1px solid var(--border-default)`,
        borderLeft: `4px solid ${color}`,
        boxShadow: hovered ? `0 0 0 1px ${color}60, 0 4px 24px ${color}40` : 'none',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Coming Soon toast */}
      {toast && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'var(--surface-3)',
          border: `1px solid ${color}`,
          color: 'var(--text-primary)',
          fontSize: '0.8125rem',
          fontWeight: 600,
          padding: '0.4rem 0.85rem',
          borderRadius: '6px',
          boxShadow: `0 4px 16px ${color}40`,
          zIndex: 10,
          pointerEvents: 'none',
          animation: 'fadeIn 0.15s ease',
        }}>
          🚧 Coming soon
        </div>
      )}

      <div
        style={{
          display: 'inline-flex',
          padding: '0.75rem',
          borderRadius: '8px',
          alignSelf: 'flex-start',
          backgroundColor: `${color}18`,
        }}
      >
        <Icon size={24} style={{ color }} />
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          {name}
        </h3>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
          {description}
        </p>
      </div>

      <a
        href={href}
        onClick={handleJoin}
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color,
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.15s ease',
          textDecoration: 'none',
          marginTop: 'auto',
        }}
      >
        Join Guild →
      </a>
    </div>
  )
}
