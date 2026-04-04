'use client'

import { motion } from 'framer-motion'
import { Rocket, TrendingUp, BarChart2, Users, Globe, Building2 } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const PILLARS = [
  {
    icon: Rocket,
    title: 'Builder & Founder Support',
    bullets: [
      'Product and technical guidance to help teams ship',
      'Support across hackathons, bounties and ecosystem programs',
    ],
    iconColor: 'var(--color-brand-purple)',
  },
  {
    icon: TrendingUp,
    title: 'Capital & Fundraising',
    bullets: [
      'Connecting capital with investable, scalable projects',
      'Supporting founders with positioning and investor readiness',
    ],
    iconColor: 'var(--color-brand-yellow)',
  },
  {
    icon: BarChart2,
    title: 'Growth & Distribution',
    bullets: [
      'Go-to-market and growth support',
      'Access to ecosystem distribution and community',
    ],
    iconColor: 'var(--color-brand-purple)',
  },
  {
    icon: Users,
    title: 'Talent & Hiring',
    bullets: [
      'Connecting teams with developers, designers and operators',
      'Supporting team formation and scaling',
    ],
    iconColor: 'var(--color-brand-yellow)',
  },
  {
    icon: Globe,
    title: 'Ecosystem & Community',
    bullets: [
      'Events, education and ecosystem coordination',
      'Showcasing Australian builders globally',
    ],
    iconColor: 'var(--color-brand-purple)',
  },
  {
    icon: Building2,
    title: 'Institutional Engagement',
    bullets: [
      'Bridging builders with institutions',
      'Engaging policymakers and supporting real-world deployments',
    ],
    iconColor: 'var(--color-brand-yellow)',
  },
]

export default function AboutSection() {
  return (
    <section className="section-padding" id="about">
      <div className="container">
        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ maxWidth: '48rem', marginBottom: '3rem' }}
        >
          <SectionHeader
            eyebrow="OUR MISSION"
            title="What We Do"
            align="left"
          />
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: 1.7,
              marginTop: '1rem',
              color: 'var(--text-secondary)',
            }}
          >
            Superteam Australia exists to accelerate founders, builders, creatives and institutions in Australia,
            and Australians building globally, driving the development of internet capital markets on Solana.
          </p>
        </motion.div>

        {/* 6-pillar grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3"
          style={{ gap: '1rem' }}
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
                className="flex flex-col rounded-xl"
                style={{
                  gap: '0.75rem',
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    background: 'rgba(255,255,255,0.06)',
                  }}
                >
                  <Icon size={18} style={{ color: pillar.iconColor }} />
                </div>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                  }}
                >
                  {pillar.title}
                </h3>
                <ul className="flex flex-col" style={{ gap: '0.375rem' }}>
                  {pillar.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start"
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.7,
                        gap: '0.5rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span style={{ color: pillar.iconColor, marginTop: '2px', flexShrink: 0 }}>•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
