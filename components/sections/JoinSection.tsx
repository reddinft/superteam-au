'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Hash, AtSign } from 'lucide-react'

interface JoinCard {
  icon: React.ReactNode
  title: string
  description: string
  cta: string
  href: string
  variant: 'primary' | 'secondary'
}

const CARDS: JoinCard[] = [
  {
    icon: <MessageCircle size={28} />,
    title: 'Telegram',
    description: 'Our main community hub. Daily conversations, opportunities and builder updates.',
    cta: 'Join Telegram →',
    href: 'https://t.me/superteamaustralia',
    variant: 'primary',
  },
  {
    icon: <Hash size={28} />,
    title: 'Discord',
    description: 'Deep dives, working groups and ecosystem channels.',
    cta: 'Join Discord →',
    href: 'https://discord.gg/superteamau',
    variant: 'secondary',
  },
  {
    icon: <AtSign size={28} />,
    title: 'Twitter / X',
    description: 'Follow for events, announcements and ecosystem news.',
    cta: 'Follow @SuperteamAU →',
    href: 'https://twitter.com/SuperteamAU',
    variant: 'secondary',
  },
]

export default function JoinSection() {
  return (
    <section id="join" className="section-padding relative overflow-hidden">
      {/* Dark purple radial gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(85,34,224,0.55) 0%, rgba(10,10,18,0.98) 65%), #0A0A12',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4"
            style={{ backgroundColor: 'rgba(85,34,224,0.25)', color: '#9945FF' }}
          >
            JOIN THE COMMUNITY
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#FFFFFF' }}
          >
            Find Your People
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(240,240,255,0.75)' }}
          >
            Open to all. Builders, founders, creatives, investors — if you&apos;re serious about
            Solana in Australia, this is where you belong.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex flex-col gap-5 rounded-2xl p-7"
              style={{
                backgroundColor:
                  card.variant === 'primary'
                    ? 'rgba(85,34,224,0.25)'
                    : 'rgba(255,255,255,0.05)',
                border:
                  card.variant === 'primary'
                    ? '1.5px solid rgba(153,69,255,0.5)'
                    : '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor:
                    card.variant === 'primary'
                      ? 'rgba(153,69,255,0.3)'
                      : 'rgba(255,255,255,0.08)',
                  color: card.variant === 'primary' ? '#9945FF' : 'rgba(240,240,255,0.7)',
                }}
              >
                {card.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-lg" style={{ color: '#FFFFFF' }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,255,0.7)' }}>
                  {card.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 whitespace-nowrap"
                style={
                  card.variant === 'primary'
                    ? { backgroundColor: '#9945FF', color: '#FFFFFF' }
                    : {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.filter = 'brightness(1.15)')
                }
                onMouseLeave={(e) => (e.currentTarget.style.filter = '')}
              >
                {card.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
