'use client'

import StatCard from '@/components/cards/StatCard'

const STATS = [
  { value: 120, label: 'Community Members', suffix: '+', delay: 0 },
  { value: 20, label: 'Events Held', suffix: '+', delay: 200 },
  { value: 50, label: 'Projects Built', suffix: '+', delay: 400 },
  { value: 50, label: 'Community GDP', prefix: '$', suffix: 'K+', delay: 600 },
]

export default function ImpactStats() {
  return (
    <section
      className="section-padding"
      id="impact"
      style={{ backgroundColor: 'var(--surface-1)' }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              prefix={stat.prefix}
              suffix={stat.suffix}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
