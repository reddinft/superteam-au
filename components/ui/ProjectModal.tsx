'use client'

import { useEffect, useRef } from 'react'

interface Author {
  name: string
  twitterUrl?: string | null
  telegramUsername?: string | null
  xUrl?: string | null
}

interface ProjectModalProps {
  project: {
    title: string
    description: string
    category: string
    url?: string | null
    authors: Author[]
  } | null
  onClose: () => void
}

const CATEGORY_STYLES: Record<string, { label: string; color: string }> = {
  defi:   { label: 'DeFi',    color: '#BCB3FF' },
  depin:  { label: 'DePIN',   color: '#14F195' },
  gaming: { label: 'Gaming',  color: '#F4A60B' },
  nft:    { label: 'NFT',     color: '#E8A876' },
  infra:  { label: 'Infra',   color: '#00C2FF' },
  dao:    { label: 'DAO',     color: '#A0A0C0' },
  other:  { label: 'Other',   color: '#A0A0C0' },
}

const CATEGORY_BG: Record<string, string> = {
  defi:   'rgba(85,34,224,0.15)',
  depin:  'rgba(20,241,149,0.12)',
  gaming: 'rgba(244,166,11,0.15)',
  nft:    'rgba(193,105,42,0.15)',
  infra:  'rgba(0,194,255,0.12)',
  dao:    'rgba(96,96,160,0.15)',
  other:  'rgba(96,96,160,0.15)',
}

// Minimal X (Twitter) icon
function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.631ZM17.1 19.77h1.833L7.084 4.126H5.117Z" />
    </svg>
  )
}

// Minimal Telegram icon
function TelegramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!project) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  const cat = CATEGORY_STYLES[project.category] ?? CATEGORY_STYLES.other
  const catBg = CATEGORY_BG[project.category] ?? CATEGORY_BG.other

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.15s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          background: 'var(--surface-2)',
          borderRadius: '1rem',
          padding: '2rem',
          border: '1px solid var(--border-default)',
          animation: 'scaleIn 0.2s ease',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '1.5rem',
            lineHeight: 1,
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
        >
          ×
        </button>

        {/* Category badge */}
        <span
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            paddingLeft: '0.625rem',
            paddingRight: '0.625rem',
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem',
            borderRadius: '9999px',
            backgroundColor: catBg,
            color: cat.color,
            display: 'inline-block',
            marginBottom: '0.75rem',
          }}
        >
          {cat.label}
        </span>

        {/* Title */}
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            paddingRight: '2rem',
          }}
        >
          {project.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}
        >
          {project.description}
        </p>

        {/* Visit Project link */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginBottom: '1.5rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              backgroundColor: 'var(--color-brand-purple, #5522E0)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Visit Project →
          </a>
        )}

        {/* Authors */}
        {project.authors.length > 0 && (
          <div>
            <p
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-secondary)',
                marginBottom: '0.75rem',
              }}
            >
              Built by
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {project.authors.map((author, i) => {
                const xLink = author.xUrl || author.twitterUrl
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{author.name}</span>
                    {xLink && (
                      <a
                        href={xLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          color: 'var(--text-secondary)',
                          fontSize: '0.8125rem',
                          textDecoration: 'none',
                          transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
                      >
                        <XIcon />
                        X
                      </a>
                    )}
                    {author.telegramUsername && (
                      <a
                        href={`https://t.me/${author.telegramUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          color: 'var(--text-secondary)',
                          fontSize: '0.8125rem',
                          textDecoration: 'none',
                          transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
                      >
                        <TelegramIcon />
                        @{author.telegramUsername}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
