'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useTerminal } from './TerminalProvider'

const TerminalOverlay = dynamic(() => import('./TerminalOverlay'), { ssr: false })
const TerminalMobile = dynamic(() => import('./TerminalMobile'), { ssr: false })

interface TerminalWrapperProps {
  telegramUrl?: string
  stats?: {
    membersCount?: number | null
    eventsCount?: number | null
    projectsCount?: number | null
    totalEarned?: string | null
  }
  members?: Array<{ name: string; role: string; guild: string }>
  events?: Array<{ title: string; date: string; location: string }>
}

export default function TerminalWrapper({ telegramUrl, stats, members, events }: TerminalWrapperProps) {
  const { isOpen, closeTerminal } = useTerminal()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!isOpen) return null

  if (isMobile) {
    return (
      <TerminalMobile
        isOpen={isOpen}
        onClose={closeTerminal}
        stats={stats}
      />
    )
  }

  return (
    <TerminalOverlay
      isOpen={isOpen}
      onClose={closeTerminal}
      telegramUrl={telegramUrl}
      stats={stats}
      members={members}
      events={events}
    />
  )
}
