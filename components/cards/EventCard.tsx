'use client'

import { MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'

interface EventCardProps {
  title: string
  date: string
  location: string
  type: string
  rsvpUrl?: string | null
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
  isUpcoming,
  description,
}: EventCardProps) {
  const { day, month } = parseDate(date)
  const typeStyle = TYPE_STYLES[type] ?? TYPE_STYLES.other

  return (
    <div
      className={`flex gap-4 rounded-xl p-4 border transition-all duration-200 ${isUpcoming ? '' : 'opacity-70'}`}
      style={{
        backgroundColor: 'var(--surface-1)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Date block */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg p-3 min-w-[56px]"
        style={{ backgroundColor: 'var(--surface-2)' }}
      >
        <span
          className="text-3xl font-bold leading-none"
          style={{ color: 'var(--color-brand-yellow)' }}
        >
          {day}
        </span>
        <span
          className="text-xs uppercase tracking-wider mt-1"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {month}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
          >
            {typeStyle.label}
          </span>
        </div>
        <h3
          className="text-lg font-semibold mt-1 truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        {description && (
          <p
            className="text-sm mt-1 line-clamp-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {description}
          </p>
        )}
        <div className="flex items-center gap-1 mt-2">
          <MapPin size={14} style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {location}
          </span>
        </div>

        <div className="mt-3">
          {isUpcoming ? (
            rsvpUrl ? (
              <Button variant="primary" size="sm" href={rsvpUrl}>
                RSVP →
              </Button>
            ) : (
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text-secondary)' }}
              >
                Free Event
              </span>
            )
          ) : (
            <Button variant="ghost" size="sm" href="#">
              View Recap
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
