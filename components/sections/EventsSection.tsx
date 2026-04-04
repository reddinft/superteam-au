import { reader } from '@/lib/keystatic.reader'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import EventsSectionClient from './EventsSectionClient'

export default async function EventsSection() {
  const events = await reader.collections.events.all()
  const today = new Date().toISOString().split('T')[0]

  const mapEvent = (e: typeof events[0]) => ({
    slug: e.slug,
    entry: {
      title: e.entry.title,
      date: e.entry.date ?? '',
      location: e.entry.location ?? '',
      type: e.entry.type,
      rsvpUrl: e.entry.rsvpUrl ?? null,
      recapUrl: (e.entry as Record<string, unknown>).recapUrl as string | null ?? null,
      description: e.entry.description ?? null,
    },
  })

  const upcoming = events
    .filter((e) => e.entry.date && e.entry.date >= today)
    .sort((a, b) => (a.entry.date ?? '').localeCompare(b.entry.date ?? ''))
    .map(mapEvent)

  const past = events
    .filter((e) => e.entry.date && e.entry.date < today)
    .sort((a, b) => (b.entry.date ?? '').localeCompare(a.entry.date ?? ''))
    .map(mapEvent)

  return (
    <section id="events" className="section-padding" style={{ backgroundColor: 'var(--surface-0)' }}>
      <div className="container">
        <div className="mb-12">
          <SectionHeader eyebrow="EVENTS" title="What&apos;s On" align="left" />
        </div>
        <EventsSectionClient upcomingEvents={upcoming} pastEvents={past} />
        <div className="mt-8 flex justify-center">
          <Button variant="ghost" size="md" href="https://lu.ma/solanaanz">
            See All Events →
          </Button>
        </div>
      </div>
    </section>
  )
}
