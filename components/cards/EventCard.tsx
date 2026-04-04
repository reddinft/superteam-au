'use client'

import { MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'

interface EventCardProps {
  title: string
  date: string
  location: string
  type: string
  rsvpUrl?: string | null
  recapUrl?: string | null
  isUpcoming: boolean
  description?: string | null
}

const TYPE_STYLES: Record<string, { label: string; bg: string; color: string }> = {
  hackathon: { label: 'Hackathon', bg: 'rgba(85,34,224,0.2)', color: '#BCB3FF' },
  networking: { label: 'Networking', bg: 'rgba(20,241,149,0.15)', color: '#14F195' },
  'builder-session': { label: 'Builder Session', bg: 'rgba(193,105,42,0.2)', color: '#E8A876' },
  summit: { label: 'Summit', bg: 'rgba(244,166,11,0.2)', color: '#F4A60B' },
  other: { label: 'Other', bg: 'rgba(96,96,160,0.2)', color: '#A0A0C0' },
}

function parseDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  const day = d.getDate().toString()
  const month = d.toLocaleString('en-AU', { month: 'short' }).toUpperCase()
  return { day, month }
}

export default function EventCard({
  title,
  date,
  location,
  type,
  rsvpUrl,
  recapUrl,
  isUpcoming,
  description,
}: EventCardProps) {
  const { day, month } = parseDate(date)
  const typeStyle = TYPE_STYLES[type] ?? TYPE_STYLES.other

  return (
    <div
      className={`flex flex-col sm:flex-row rounded-md border transition-all duration-200 ${isUpcoming ? '' : 'opacity-70'}`}
      style={{
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--surface-1)',
        borderColor: 'var(--border-default)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(124, 58, 237, 0.3), 0 4px 16px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {/* Date block */}
      <div
        className="flex-shrink-0 flex sm:flex-col items-center justify-center rounded-lg"
        style={{
          padding: '0.75rem',
          minWidth: '56px',
          gap: '0.5rem',
          backgroundColor: 'var(--surface-2)',
        }}
      >
        <span
          style={{ fontSize: '1.875rem', fontWeight: 700, lineHeight: 1, color: 'var(--color-brand-yellow)' }}
        >
          {day}
        </span>
        <span
          style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem', color: 'var(--text-tertiary)' }}
        >
          {month}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap" style={{ gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '9999px',
              backgroundColor: typeStyle.bg,
              color: typeStyle.color,
            }}
          >
            {typeStyle.label}
          </span>
        </div>
        <h3
          style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontSize: '0.875rem',
              marginTop: '0.25rem',
              color: 'var(--text-secondary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
        )}
        <div className="flex items-center" style={{ gap: '0.25rem', marginTop: '0.5rem' }}>
          <MapPin size={14} style={{ color: 'var(--text-tertiary)' }} />
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {location}
          </span>
        </div>

        <div style={{ marginTop: '0.75rem' }}>
          {isUpcoming ? (
            rsvpUrl ? (
              <Button variant="primary" size="sm" href={rsvpUrl}>
                RSVP →
              </Button>
            ) : (
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'var(--surface-2)',
                  color: 'var(--text-secondary)',
                }}
              >
                Free Event
              </span>
            )
          ) : recapUrl ? (
            <Button variant="ghost" size="sm" href={recapUrl}>
              View Recap →
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
