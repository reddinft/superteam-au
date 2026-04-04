'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

interface EarnSectionProps {
  earnUrl?: string
}

export default function EarnSection({ earnUrl = 'https://superteam.fun/earn' }: EarnSectionProps) {
  return (
    <section id="earn" className="section-padding relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #5522E0 0%, #9945FF 50%, #5522E0 100%)',
            'linear-gradient(135deg, #9945FF 0%, #5522E0 50%, #9945FF 100%)',
            'linear-gradient(135deg, #5522E0 0%, #9945FF 50%, #5522E0 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Pulse overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(20,241,149,0.15) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(20,241,149,0.15)', color: '#14F195' }}
          >
            OPPORTUNITIES
          </span>

          <h2
            className="type-h1 font-extrabold"
            style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          >
            Earn with Superteam AU
          </h2>

          <p className="type-body-lg" style={{ color: 'rgba(240,240,255,0.85)' }}>
            Find bounties, grants, and paid opportunities from top Solana protocols.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={earnUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', padding:'12px 32px', borderRadius:'12px', fontWeight:600, fontSize:'1rem', transition:'all 0.15s ease', whiteSpace:'nowrap', backgroundColor:'#14F195', color:'#0A0A12' }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = '')}
            >
              Browse Bounties →
            </a>
            <a
              href={earnUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', padding:'12px 32px', borderRadius:'12px', fontWeight:600, fontSize:'1rem', transition:'all 0.15s ease', whiteSpace:'nowrap', backgroundColor:'rgba(255,255,255,0.15)', color:'#FFFFFF', border:'1.5px solid rgba(255,255,255,0.3)', backdropFilter:'blur(8px)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)')}
            >
              Post a Bounty →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
