'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import StatPill from '@/components/ui/StatPill'
import SouthernCrossSVG from '@/components/hero/SouthernCrossSVG'

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  statPills?: Array<{ value: string; label: string }>
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: delay / 1000, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] },
})

export default function HeroSection({ headline, subheadline, statPills }: HeroSectionProps = {}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 50%, rgba(85,34,224,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
          {/* Left — content (60%) */}
          <div className="flex-1 md:w-[60%] flex flex-col gap-6">
            {/* Eyebrow */}
            <motion.p
              {...fadeUp(0)}
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-brand-yellow)' }}
            >
              SUPERTEAM AUSTRALIA
            </motion.p>

            {/* H1 */}
            <motion.h1
              {...fadeUp(100)}
              className="text-5xl md:text-7xl font-extrabold leading-tight"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              {headline ?? <>Building Australia&apos;s<br /><span style={{ color: 'var(--color-brand-purple-tint)' }}>Solana Future</span></>}
            </motion.h1>

            {/* Sub */}
            <motion.p
              {...fadeUp(200)}
              className="text-lg md:text-xl max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {subheadline ?? 'Superteam Australia connects the builders, designers, and creators shaping the Solana ecosystem Down Under.'}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(300)} className="flex flex-wrap gap-4">
              <Button variant="primary" size="md" href="#join">
                Join the Community
              </Button>
              <Button variant="secondary" size="md" href="#projects">
                Explore Projects →
              </Button>
            </motion.div>

            {/* Stat Pills */}
            <motion.div {...fadeUp(400)} className="flex flex-wrap gap-3">
              {(statPills ?? [
                { value: '120+', label: 'Members' },
                { value: '20+', label: 'Events' },
                { value: '$50K+', label: 'Earned' },
              ]).map((pill) => (
                <StatPill key={pill.label} value={pill.value} label={pill.label} />
              ))}
            </motion.div>
          </div>

          {/* Right — SVG (40%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="md:w-[40%] flex justify-center"
          >
            <SouthernCrossSVG className="w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
