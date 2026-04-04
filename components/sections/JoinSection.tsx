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
    title: 'Twitter / X',
    description: 'Follow for ecosystem updates, builder wins and opportunities.',
    cta: 'Follow @SuperteamAU →',
    href: 'https://x.com/SuperteamAU',
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
          className="text-center"
          style={{ marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <span
            className="inline-block"
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              borderRadius: '9999px',
              marginBottom: '1rem',
              backgroundColor: 'rgba(85,34,224,0.25)',
              color: '#9945FF',
              fontFamily: 'var(--font-mono)',
            }}
          >
            JOIN THE COMMUNITY
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.25rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#FFFFFF',
            }}
          >
            Find Your People
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              maxWidth: '36rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              color: 'rgba(240,240,255,0.75)',
            }}
          >
            Open to all. Builders, founders, creatives, investors — if you&apos;re serious about
            Solana in Australia, this is where you belong.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '1.25rem' }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl"
              style={{
                gap: '1.25rem',
                padding: '1.75rem',
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
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: '3rem',
                  height: '3rem',
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
              <div className="flex flex-col flex-1" style={{ gap: '0.5rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#FFFFFF' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(240,240,255,0.7)' }}>
                  {card.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl transition-all duration-150 whitespace-nowrap"
                style={{
                  paddingLeft: '1.25rem',
                  paddingRight: '1.25rem',
                  paddingTop: '0.625rem',
                  paddingBottom: '0.625rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  ...(card.variant === 'primary'
                    ? { backgroundColor: '#9945FF', color: '#FFFFFF' }
                    : {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }),
                }}
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
