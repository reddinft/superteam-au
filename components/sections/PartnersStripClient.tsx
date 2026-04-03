'use client'

import Image from 'next/image'

interface PartnerItem {
  slug: string
  name: string
  url?: string | null
  logo?: string | null
}

// Seed partner logos (SVG placeholders)
const SEED_LOGOS: Record<string, string> = {
  'solana-foundation': '/images/partners/solana-foundation.svg',
  'superteam': '/images/partners/superteam.svg',
  'jupiter': '/images/partners/jupiter.svg',
  'drift': '/images/partners/drift.svg',
  'marinade': '/images/partners/marinade.svg',
}

export default function PartnersStripClient({ partners }: { partners: PartnerItem[] }) {
  const doubled = [...partners, ...partners]

  return (
    <div
      className="relative"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
    >
      <div
        className="flex items-center gap-10 w-max"
        style={{ animation: 'marquee 30s linear infinite' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
      >
        {doubled.map((p, i) => {
          const logoSrc = p.logo ?? SEED_LOGOS[p.slug] ?? null

          return (
            <a
              key={`${p.slug}-${i}`}
              href={p.url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center justify-center transition-opacity duration-200"
              style={{ opacity: 0.6 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
              aria-label={p.name}
            >
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={p.name}
                  width={120}
                  height={40}
                  className="object-contain"
                  style={{ maxHeight: '40px', width: 'auto' }}
                  unoptimized={logoSrc.endsWith('.svg')}
                />
              ) : (
                <span
                  className="font-mono text-sm px-4 py-2 rounded border"
                  style={{
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {p.name}
                </span>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}
