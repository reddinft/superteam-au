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
      <div className="flex gap-2 mb-8">
        {(['upcoming', 'past'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-150 cursor-pointer"
            style={
              tab === t
                ? {
                    backgroundColor: 'var(--color-brand-yellow)',
                    color: '#0A0A12',
                    border: '1.5px solid var(--color-brand-yellow)',
                  }
                : {
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1.5px solid var(--border-default)',
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
              isUpcoming={tab === 'upcoming'}
              description={e.entry.description}
            />
          ))}
        </div>
      )}
    </div>
  )
}
