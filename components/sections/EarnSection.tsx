import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

interface EarnSectionProps {
  earnUrl: string
}

export default function EarnSection({ earnUrl }: EarnSectionProps) {
  return (
    <section
      id="earn"
      className="section-padding"
      style={{
        background: 'linear-gradient(135deg, rgba(85,34,224,0.15) 0%, rgba(244,166,11,0.08) 100%)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
          <SectionHeader
            eyebrow="OPPORTUNITIES"
            title="Earn While You Build"
            align="center"
          />
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Find bounties, grants, and hackathons through Superteam Earn — the best way to get paid building on Solana.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="md" href={earnUrl}>
              Browse Opportunities →
            </Button>
            <Button variant="secondary" size="md" href="https://superteam.fun/grants">
              Learn About Grants
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
