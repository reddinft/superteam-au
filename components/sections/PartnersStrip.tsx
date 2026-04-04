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
      className="py-10 overflow-hidden"
      style={{
        backgroundColor: 'var(--surface-2)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-widest text-center mb-6"
        style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
      >
        BACKED BY
      </p>
      <PartnersStripClient partners={sorted} />
      <div className="flex justify-center mt-6">
        <Button variant="ghost" size="md" href="mailto:au@superteam.fun">
          Become a Partner →
        </Button>
      </div>
    </section>
  )
}
