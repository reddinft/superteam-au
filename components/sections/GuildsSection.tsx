'use client'

import { motion } from 'framer-motion'
import { Code2, Palette, PenTool, Settings } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GuildCard from '@/components/cards/GuildCard'

const GUILDS = [
  {
    icon: Code2,
    name: 'Dev',
    description: "Write smart contracts, build dApps, ship open-source tools. If it runs on Solana, you're building it.",
    color: '#5522E0',
  },
  {
    icon: Palette,
    name: 'Design',
    description: 'Every protocol needs an identity. Shape how Australian Solana projects look, feel, and get remembered.',
    color: '#F4A60B',
  },
  {
    icon: PenTool,
    name: 'Writers',
    description: "Tell the stories nobody else is telling. Research, threads, docs, long-form — AU's voice in web3.",
    color: '#C1692A',
  },
  {
    icon: Settings,
    name: 'Ops',
    description: 'Run events, grow the community, land partnerships. The connective tissue that makes everything else work.',
    color: '#14F195',
  },
]

export default function GuildsSection() {
  return (
    <section className="section-padding" id="guilds">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <SectionHeader
            eyebrow="GUILDS"
            title="Find Your Home"
            subtitle="Join a guild that matches your skills and build with Australia's best Solana contributors."
            align="center"
          />
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '1.5rem' }}
        >
          {GUILDS.map((guild, i) => (
            <motion.div
              key={guild.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GuildCard {...guild} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
