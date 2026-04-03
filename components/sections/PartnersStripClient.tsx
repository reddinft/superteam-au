'use client'

interface PartnerItem {
  slug: string
  name: string
  url?: string | null
}

export default function PartnersStripClient({ partners }: { partners: PartnerItem[] }) {
  const doubled = [...partners, ...partners]

  return (
    <div
      className="relative"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
    >
      <div
        className="flex gap-8 w-max"
        style={{ animation: 'marquee 30s linear infinite' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
      >
        {doubled.map((p, i) => (
          <a
            key={`${p.slug}-${i}`}
            href={p.url ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 font-mono text-sm px-4 py-2 rounded border transition-colors duration-150"
            style={{
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'
            }}
          >
            {p.name}
          </a>
        ))}
      </div>
    </div>
  )
}
