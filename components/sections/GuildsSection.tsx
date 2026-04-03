'use client'

import { motion } from 'framer-motion'
import { Code2, Palette, PenTool, Settings } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GuildCard from '@/components/cards/GuildCard'

const GUILDS = [
  {
    icon: Code2,
    name: 'Dev',
    description: 'Build on Solana. Smart contracts, dApps, tools, and infrastructure.',
    color: '#5522E0',
  },
  {
    icon: Palette,
    name: 'Design',
    description: 'Shape the Solana experience. UI/UX, brand, and visual storytelling.',
    color: '#F4A60B',
  },
  {
    icon: PenTool,
    name: 'Writers',
    description: 'Tell the Solana story. Content, research, and ecosystem narratives.',
    color: '#C1692A',
  },
  {
    icon: Settings,
    name: 'Ops',
    description: 'Run the machine. Events, partnerships, and community operations.',
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
          className="mb-12"
        >
          <SectionHeader
            eyebrow="GUILDS"
            title="Find Your Home"
            subtitle="Join a guild that matches your skills and build with Australia's best Solana contributors."
            align="center"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
