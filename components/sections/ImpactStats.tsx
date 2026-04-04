'use client'

import { motion } from 'framer-motion'
import StatCard from '@/components/cards/StatCard'
import SectionHeader from '@/components/ui/SectionHeader'

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
      className="section-padding relative"
      id="impact"
      style={{ backgroundColor: 'var(--surface-1)' }}
    >
      {/* Purple gradient line at top */}
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #5522E0 50%, transparent 100%)',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
        }}
      />
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <SectionHeader
            eyebrow="IMPACT"
            title="Building the Ecosystem"
            align="center"
          />
        </motion.div>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: '1rem' }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <StatCard
                value={stat.value}
                label={stat.label}
                prefix={stat.prefix}
                suffix={stat.suffix}
                delay={stat.delay}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
