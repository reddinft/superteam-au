import { reader } from '@/lib/keystatic.reader'
import SectionHeader from '@/components/ui/SectionHeader'
import EventsSectionClient from './EventsSectionClient'

export default async function EventsSection() {
  const events = await reader.collections.events.all()
  const today = new Date().toISOString().split('T')[0]

  const upcoming = events
    .filter((e) => e.entry.date && e.entry.date >= today)
    .sort((a, b) => (a.entry.date ?? '').localeCompare(b.entry.date ?? ''))

  const past = events
    .filter((e) => e.entry.date && e.entry.date < today)
    .sort((a, b) => (b.entry.date ?? '').localeCompare(a.entry.date ?? ''))

  return (
    <section id="events" className="section-padding" style={{ backgroundColor: 'var(--surface-0)' }}>
      <div className="container">
        <div className="mb-12">
          <SectionHeader eyebrow="EVENTS" title="What&apos;s On" align="left" />
        </div>
        <EventsSectionClient upcomingEvents={upcoming} pastEvents={past} />
      </div>
    </section>
  )
}
