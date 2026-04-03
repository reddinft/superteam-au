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

export default function GuildCard({ icon: Icon, name, description, color, href = '#join' }: GuildCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex flex-col gap-4 p-8 rounded-xl transition-all duration-200 cursor-pointer"
      style={{
        backgroundColor: 'var(--surface-1)',
        borderTop: `1px solid var(--border-subtle)`,
        borderRight: `1px solid var(--border-subtle)`,
        borderBottom: `1px solid var(--border-subtle)`,
        borderLeft: hovered ? `4px solid ${color}` : `4px solid ${color}`,
        boxShadow: hovered ? `inset 0 0 0 1px ${color}30, 0 4px 24px ${color}18` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div
        className="inline-flex p-3 rounded-xl self-start"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon size={24} style={{ color }} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>

      {/* CTA */}
      <a
        href={href}
        className="text-sm font-semibold transition-opacity"
        style={{ color, opacity: hovered ? 1 : 0.7 }}
      >
        Join Guild →
      </a>
    </div>
  )
}
