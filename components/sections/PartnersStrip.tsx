import { reader } from '@/lib/keystatic.reader'
import Button from '@/components/ui/Button'
import PartnersStripClient from './PartnersStripClient'

export default async function PartnersStrip() {
  const partners = await reader.collections.partners.all()

  const sorted = [...partners]
    .sort((a, b) => (a.entry.order ?? 99) - (b.entry.order ?? 99))
    .map((p) => ({
      slug: p.slug,
      name: p.entry.name,
      url: p.entry.url,
    }))

  return (
    <section
      className="overflow-hidden"
      style={{
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        backgroundColor: 'var(--surface-2)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.15em',
        }}
      >
        BACKED BY
      </p>
      <PartnersStripClient partners={sorted} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
        <Button variant="ghost" size="md" href="mailto:au@superteam.fun">
          Become a Partner →
        </Button>
      </div>
    </section>
  )
}
