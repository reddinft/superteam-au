'use client'

import { useState } from 'react'
import EventCard from '@/components/cards/EventCard'

interface EventEntry {
  slug: string
  entry: {
    title: string
    date: string
    location: string
    type: string
    rsvpUrl?: string | null
    recapUrl?: string | null
    description?: string | null
  }
}

interface EventsSectionClientProps {
  upcomingEvents: EventEntry[]
  pastEvents: EventEntry[]
}

export default function EventsSectionClient({ upcomingEvents, pastEvents }: EventsSectionClientProps) {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  const events = tab === 'upcoming' ? upcomingEvents : pastEvents

  return (
    <div>
      {/* Tab toggle */}
      <div
        className="flex border-b"
        style={{ gap: '1.5rem', borderColor: 'var(--border-subtle)', marginBottom: '2rem' }}
      >
        {(['upcoming', 'past'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="capitalize transition-all duration-150 cursor-pointer bg-transparent border-0 -mb-px"
            style={{
              paddingBottom: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              borderBottom: '2px solid',
              ...(tab === t
                ? {
                    color: 'var(--text-primary)',
                    borderBottomColor: 'var(--color-brand-purple)',
                    borderBottomStyle: 'solid',
                  }
                : {
                    color: 'var(--text-secondary)',
                    borderBottomColor: 'transparent',
                    borderBottomStyle: 'solid',
                  }),
            }}
          >
            {t === 'upcoming' ? `Upcoming (${upcomingEvents.length})` : `Past (${pastEvents.length})`}
          </button>
        ))}
      </div>

      {/* Events list */}
      {events.length === 0 ? (
        <p
          className="text-center"
          style={{ paddingTop: '3rem', paddingBottom: '3rem', color: 'var(--text-tertiary)' }}
        >
          {tab === 'upcoming' ? 'No upcoming events right now — check back soon!' : 'No past events to show.'}
        </p>
      ) : (
        <div className="flex flex-col" style={{ gap: '1rem' }}>
          {events.map((e) => (
            <EventCard
              key={e.slug}
              title={e.entry.title}
              date={e.entry.date}
              location={e.entry.location ?? ''}
              type={e.entry.type}
              rsvpUrl={e.entry.rsvpUrl}
              recapUrl={e.entry.recapUrl}
              isUpcoming={tab === 'upcoming'}
              description={e.entry.description}
            />
          ))}
        </div>
      )}
    </div>
  )
}
