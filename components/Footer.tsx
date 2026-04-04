'use client'

import { ExternalLink, Star } from 'lucide-react'
import { useTerminal } from '@/components/terminal/TerminalProvider'

const NAV_LINKS = [
  { label: 'Events', href: '#events' },
  { label: 'Projects', href: '#projects' },
  { label: 'Members', href: '#members' },
  { label: 'Blog', href: '#blog' },
  { label: 'Earn', href: '#earn' },
]

interface FooterProps {
  telegramUrl?: string
  twitterUrl?: string
}

export default function Footer({ telegramUrl, twitterUrl }: FooterProps = {}) {
  const COMMUNITY_LINKS = [
    { label: 'Join Telegram', href: telegramUrl ?? 'https://t.me/superteamaustralia' },
    { label: 'Follow on X', href: twitterUrl ?? 'https://twitter.com/SuperteamAU' },
    { label: 'Superteam Earn', href: 'https://earn.superteam.fun' },
  ]
  const { openTerminal } = useTerminal()
  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: 'var(--surface-0)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        {/* 3-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '2.5rem' }}
        >
          {/* Column 1 — Brand */}
          <div className="flex flex-col" style={{ gap: '1rem' }}>
            <div style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              <span style={{ color: 'var(--color-brand-yellow)' }}>SUPERTEAM</span>
              <span style={{ color: 'var(--text-primary)' }}> AU</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Building Australia&apos;s Solana Future
            </p>
            <div className="flex items-center" style={{ gap: '0.75rem', marginTop: '0.5rem' }}>
              <a
                href={twitterUrl ?? 'https://twitter.com/SuperteamAU'}
                aria-label="X / Twitter"
                className="rounded-lg transition-colors"
                style={{ color: 'var(--text-tertiary)', padding: '0.5rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >
                {/* X / Twitter SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.262 5.638 5.902-5.638Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </a>
              <a
                href={telegramUrl ?? 'https://t.me/superteamaustralia'}
                aria-label="Discord"
                className="rounded-lg transition-colors"
                style={{ color: 'var(--text-tertiary)', padding: '0.5rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="flex flex-col" style={{ gap: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)' }}>
              Explore
            </p>
            <nav className="flex flex-col" style={{ gap: '0.75rem' }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors"
                  style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 — Connect */}
          <div className="flex flex-col" style={{ gap: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)' }}>
              Connect
            </p>
            <nav className="flex flex-col" style={{ gap: '0.75rem' }}>
              {COMMUNITY_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors"
                  style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between"
          style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '2.5rem', paddingTop: '2rem' }}
        >
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} Superteam Australia. Part of the global Superteam network.
          </p>
          {/* Hidden easter egg trigger */}
          <button
            id="southern-cross-trigger"
            title="Southern Cross — AU terminal"
            className="transition-opacity cursor-pointer rounded bg-transparent border-none"
            style={{
              opacity: 0.2,
              color: 'var(--color-brand-yellow)',
              padding: '0.25rem',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.2')}
            onClick={openTerminal}
            aria-label="Open Superteam AU terminal (Easter egg)"
          >
            <Star size={14} fill="currentColor" />
          </button>
        </div>
      </div>
    </footer>
  )
}
