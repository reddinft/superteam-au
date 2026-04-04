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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        borderRadius: '8px',
        cursor: 'pointer',
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
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color,
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.15s ease',
          textDecoration: 'none',
        }}
      >
        Join Guild →
      </a>
    </div>
  )
}
