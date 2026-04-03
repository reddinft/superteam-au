import { ExternalLink, Star } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Events', href: '#events' },
  { label: 'Projects', href: '#projects' },
  { label: 'Members', href: '#members' },
  { label: 'Blog', href: '#blog' },
  { label: 'Earn', href: '#earn' },
]

const COMMUNITY_LINKS = [
  { label: 'Join Discord', href: '#discord' },
  { label: 'Follow on X', href: '#twitter' },
  { label: 'Superteam Earn', href: 'https://earn.superteam.fun' },
]

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: 'var(--surface-0)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container py-12 md:py-16">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <div className="font-bold text-xl tracking-tight">
              <span style={{ color: 'var(--color-brand-yellow)' }}>SUPERTEAM</span>
              <span style={{ color: 'var(--text-primary)' }}> AU</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Building Australia&apos;s Solana Future
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://twitter.com/SuperteamAU"
                aria-label="X / Twitter"
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >
                {/* X / Twitter SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.262 5.638 5.902-5.638Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </a>
              <a
                href="https://discord.gg/superteamau"
                aria-label="Discord"
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
              Explore
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 — Connect */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
              Connect
            </p>
            <nav className="flex flex-col gap-3">
              {COMMUNITY_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
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
          className="flex items-center justify-between mt-10 pt-8"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © 2024 Superteam Australia. Part of the global Superteam network.
          </p>
          {/* Hidden easter egg trigger */}
          <button
            id="southern-cross-trigger"
            title="⭐"
            className="transition-opacity cursor-pointer p-1 rounded bg-transparent border-none"
            style={{
              opacity: 0.2,
              color: 'var(--color-brand-yellow)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.2')}
            aria-hidden="true"
          >
            <Star size={14} fill="currentColor" />
          </button>
        </div>
      </div>
    </footer>
  )
}
