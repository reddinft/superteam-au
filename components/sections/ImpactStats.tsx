'use client'

import StatCard from '@/components/cards/StatCard'

interface ImpactStatsProps {
  membersCount?: number
  eventsCount?: number
  projectsCount?: number
  totalEarned?: string
}

export default function ImpactStats({
  membersCount = 120,
  eventsCount = 20,
  projectsCount = 50,
  totalEarned = '$50K+',
}: ImpactStatsProps = {}) {
  const STATS = [
    { value: membersCount, label: 'Community Members', suffix: '+', delay: 0 },
    { value: eventsCount, label: 'Events Held', suffix: '+', delay: 200 },
    { value: projectsCount, label: 'Projects Built', suffix: '+', delay: 400 },
    { value: parseInt(totalEarned.replace(/[^0-9]/g, '')) || 50, label: 'Community GDP', prefix: '$', suffix: 'K+', delay: 600 },
  ]
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
