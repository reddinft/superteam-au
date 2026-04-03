'use client'

import Link from 'next/link'

interface BlogCardProps {
  slug: string
  title: string
  publishedAt: string
  category: string
  excerpt?: string | null
  coverImage?: string | null
}

const CATEGORY_STYLES: Record<string, { label: string; bg: string; color: string }> = {
  'ecosystem-update': { label: 'Ecosystem', bg: 'rgba(20,241,149,0.12)', color: '#14F195' },
  'member-story': { label: 'Member Story', bg: 'rgba(244,166,11,0.15)', color: '#F4A60B' },
  'event-recap': { label: 'Event Recap', bg: 'rgba(193,105,42,0.15)', color: '#E8A876' },
  tutorial: { label: 'Tutorial', bg: 'rgba(85,34,224,0.2)', color: '#BCB3FF' },
  announcement: { label: 'Announcement', bg: 'rgba(0,194,255,0.12)', color: '#00C2FF' },
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogCard({ slug, title, publishedAt, category, excerpt, coverImage }: BlogCardProps) {
  const cat = CATEGORY_STYLES[category] ?? { label: category, bg: 'rgba(96,96,160,0.15)', color: '#A0A0C0' }

  return (
    <Link href={`/blog/${slug}`} className="group block" style={{ textDecoration: 'none' }}>
      <article
        className="rounded-xl overflow-hidden border h-full flex flex-col transition-all duration-200"
        style={{
          backgroundColor: 'var(--surface-1)',
          borderColor: 'var(--border-default)',
        }}
      >
        {/* Cover */}
        <div
          className="aspect-video overflow-hidden relative"
          style={{ backgroundColor: 'var(--surface-2)' }}
        >
          {coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(85,34,224,0.1) 0%, rgba(244,166,11,0.08) 100%)',
              }}
            >
              <span className="text-4xl opacity-20">✦</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full self-start"
            style={{ backgroundColor: cat.bg, color: cat.color }}
          >
            {cat.label}
          </span>

          <h3
            className="font-semibold text-base leading-snug"
            style={{
              color: 'var(--text-primary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </h3>

          {excerpt && (
            <p
              className="text-sm"
              style={{
                color: 'var(--text-secondary)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {excerpt}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {formatDate(publishedAt)}
            </span>
            <span
              className="text-xs font-medium transition-colors duration-150"
              style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-brand-yellow)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
            >
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
