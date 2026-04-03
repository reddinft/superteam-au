'use client'

import { ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  category: string
  url?: string | null
  authorNames: string[]
  featured?: boolean
}

const CATEGORY_STYLES: Record<string, { label: string; color: string; hoverBorder: string }> = {
  defi: { label: 'DeFi', color: '#BCB3FF', hoverBorder: '#5522E0' },
  depin: { label: 'DePIN', color: '#14F195', hoverBorder: '#14F195' },
  gaming: { label: 'Gaming', color: '#F4A60B', hoverBorder: '#F4A60B' },
  nft: { label: 'NFT', color: '#E8A876', hoverBorder: '#C1692A' },
  infra: { label: 'Infra', color: '#00C2FF', hoverBorder: '#00C2FF' },
  dao: { label: 'DAO', color: '#A0A0C0', hoverBorder: '#6060A0' },
  other: { label: 'Other', color: '#A0A0C0', hoverBorder: '#6060A0' },
}

const CATEGORY_BG: Record<string, string> = {
  defi: 'rgba(85,34,224,0.15)',
  depin: 'rgba(20,241,149,0.12)',
  gaming: 'rgba(244,166,11,0.15)',
  nft: 'rgba(193,105,42,0.15)',
  infra: 'rgba(0,194,255,0.12)',
  dao: 'rgba(96,96,160,0.15)',
  other: 'rgba(96,96,160,0.15)',
}

export default function ProjectCard({
  title,
  description,
  category,
  url,
  authorNames,
}: ProjectCardProps) {
  const cat = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.other
  const catBg = CATEGORY_BG[category] ?? CATEGORY_BG.other

  return (
    <div
      className="rounded-xl p-6 border flex flex-col transition-all duration-200 group"
      style={{
        backgroundColor: 'var(--surface-1)',
        borderColor: 'var(--border-default)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = cat.hoverBorder
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border-default)'
        el.style.transform = ''
        el.style.boxShadow = ''
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: catBg, color: cat.color }}
        >
          {cat.label}
        </span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-semibold mt-3"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-sm mt-1 flex-1"
        style={{
          color: 'var(--text-secondary)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </p>

      {/* Authors */}
      {authorNames.length > 0 && (
        <p
          className="text-xs mt-3"
          style={{ color: 'var(--text-tertiary)' }}
        >
          by {authorNames.join(', ')}
        </p>
      )}
    </div>
  )
}
