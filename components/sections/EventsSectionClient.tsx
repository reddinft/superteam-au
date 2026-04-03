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
      <div className="flex gap-6 mb-8 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        {(['upcoming', 'past'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="pb-3 text-sm font-semibold capitalize transition-all duration-150 cursor-pointer bg-transparent border-0 border-b-2 -mb-px"
            style={
              tab === t
                ? {
                    color: 'var(--text-primary)',
                    borderBottomColor: 'var(--color-brand-purple)',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '2px',
                  }
                : {
                    color: 'var(--text-secondary)',
                    borderBottomColor: 'transparent',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '2px',
                  }
            }
          >
            {t === 'upcoming' ? `Upcoming (${upcomingEvents.length})` : `Past (${pastEvents.length})`}
          </button>
        ))}
      </div>

      {/* Events list */}
      {events.length === 0 ? (
        <p className="text-center py-12" style={{ color: 'var(--text-tertiary)' }}>
          {tab === 'upcoming' ? 'No upcoming events right now — check back soon!' : 'No past events to show.'}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
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
