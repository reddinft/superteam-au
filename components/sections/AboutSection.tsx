'use client'

import { motion } from 'framer-motion'
import { Rocket, TrendingUp, Users } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import PillarCard from './PillarCard'

const PILLARS = [
  {
    icon: Rocket,
    title: 'Empower Founders',
    description: 'Connect AU builders with Solana grants, VCs, and global opportunities',
    iconColor: 'var(--color-brand-purple)',
  },
  {
    icon: TrendingUp,
    title: 'Grow AU GDP',
    description: "Grow Australia's collective earnings from the Solana ecosystem",
    iconColor: 'var(--color-brand-yellow)',
  },
  {
    icon: Users,
    title: 'Foster Connections',
    description: 'Monthly events, hackathons, and a tight-knit community of builders',
    iconColor: 'var(--color-au-ochre)',
  },
]

export default function AboutSection() {
  return (
    <section className="section-padding" id="about">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <SectionHeader
              eyebrow="OUR STORY"
              title="Who We Are"
              align="left"
            />

            <div
              className="flex flex-col gap-4 pl-5"
              style={{ borderLeft: '3px solid var(--color-brand-purple)' }}
            >
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                In 2024, a handful of Australian builders decided the Solana ecosystem needed a home in the southern hemisphere. Superteam AU is what happened next.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                From Sydney to Melbourne and beyond, we&apos;re building the most active Solana community in the Southern Hemisphere.
              </p>
            </div>
          </motion.div>

          {/* Right column — pillar cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.title} {...pillar} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
