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
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: delay / 1000, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] },
})

export default function HeroSection({ headline, subheadline, statPills }: HeroSectionProps = {}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Multi-layer background for depth and atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary purple glow — top right */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 70% 30%, rgba(85,34,224,0.25) 0%, transparent 55%)',
        }} />
        {/* Warm yellow — bottom left */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 15% 85%, rgba(244,166,11,0.10) 0%, transparent 45%)',
        }} />
        {/* Solana purple echo — top centre */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 40% 0%, rgba(153,69,255,0.12) 0%, transparent 40%)',
        }} />
        {/* Grid overlay — technical feel */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(240,240,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,240,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }} />
      </div>
      {/* Ogma-style gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at top left, rgba(88, 28, 235, 0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(20, 184, 166, 0.10) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Ambient pulse overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(85,34,224,0.12) 0%, transparent 50%)' }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container relative z-10" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div
          className="flex flex-col-reverse md:flex-row items-center"
          style={{ gap: '3rem' }}
        >
          {/* Left — content (60%) */}
          <div
            className="flex-1 md:w-[60%] flex flex-col"
            style={{ gap: '1.5rem' }}
          >
            {/* Eyebrow */}
            <motion.p
              {...fadeUp(0)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--color-brand-yellow)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.15em',
              }}
            >
              SUPERTEAM AUSTRALIA
            </motion.p>

            {/* H1 */}
            <motion.h1
              {...fadeUp(100)}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to right, #a78bfa, #c4b5fd, #5eead4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {headline ?? <>
                  Australia&apos;s Home for Solana Builders{' '}
                  <span style={{
                    WebkitTextFillColor: 'unset',
                    WebkitBackgroundClip: 'unset',
                    backgroundClip: 'unset',
                    background: 'none',
                    display: 'inline-block',
                  }}>🇦🇺</span>
                </>}
            </motion.h1>

            {/* Sub */}
            <motion.p
              {...fadeUp(200)}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                maxWidth: '36rem',
                color: 'var(--text-secondary)',
              }}
            >
              {subheadline ?? '120 members across Sydney, Melbourne, Brisbane, Perth and beyond — building DeFi, DePIN, and the next generation of internet finance on Solana.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(300)}
              className="flex flex-wrap items-center"
              style={{ gap: '0.75rem' }}
            >
              <Button variant="primary" size="md" href="https://discord.gg/superteamau">
                Get Involved
              </Button>
              <Button variant="secondary" size="md" href="#projects">
                Explore Opportunities →
              </Button>
            </motion.div>

            {/* Stat Pills */}
            <motion.div
              {...fadeUp(400)}
              className="flex flex-wrap"
              style={{ gap: '0.75rem' }}
            >
              {(statPills ?? [
                { value: '120+', label: 'Members' },
                { value: '30+', label: 'Events' },
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
