'use client'

import { useEffect, useState } from 'react'

interface TerminalMobileProps {
  isOpen: boolean
  onClose: () => void
  stats?: {
    membersCount?: number | null
    eventsCount?: number | null
    projectsCount?: number | null
    totalEarned?: string | null
  }
}

interface Line {
  text: string
  color: string
  delay: number
}

export default function TerminalMobile({ isOpen, onClose, stats }: TerminalMobileProps) {
  const [visibleLines, setVisibleLines] = useState(0)

  const lines: Line[] = [
    { text: '> initialising superteam-au terminal...', color: '#14F195', delay: 0 },
    { text: '> loading community stats...', color: '#14F195', delay: 300 },
    { text: '', color: '', delay: 400 },
    { text: '  SUPERTEAM AUSTRALIA', color: '#F0F0FF', delay: 500 },
    { text: '  ───────────────────', color: 'rgba(96,96,160,0.5)', delay: 600 },
    {
      text: `  Members       : ${stats?.membersCount ?? '?'}`,
      color: '#F4A60B',
      delay: 700,
    },
    {
      text: `  Events hosted : ${stats?.eventsCount ?? '?'}`,
      color: '#F4A60B',
      delay: 850,
    },
    {
      text: `  Projects built: ${stats?.projectsCount ?? '?'}`,
      color: '#F4A60B',
      delay: 1000,
    },
    {
      text: `  Total earned  : ${stats?.totalEarned ?? '?'}`,
      color: '#F4A60B',
      delay: 1150,
    },
    { text: '', color: '', delay: 1250 },
    { text: '  ✦ Southern Cross — Crux ✦', color: '#14F195', delay: 1400 },
    { text: '  Building Australia\'s Solana future.', color: 'rgba(160,160,192,0.8)', delay: 1600 },
  ]

  useEffect(() => {
    if (!isOpen) {
      setVisibleLines(0)
      return
    }
    setVisibleLines(0)
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex flex-col font-mono text-sm"
      style={{
        backgroundColor: '#0A0A12',
        zIndex: 'var(--z-terminal)',
      }}
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(85,34,224,0.3)', backgroundColor: '#0D0D1A' }}
      >
        <span className="text-xs" style={{ color: '#14F195' }}>superteam@au:~</span>
        <button
          onClick={onClose}
          className="text-xs px-3 py-1 rounded border"
          style={{ color: 'rgba(96,96,160,0.8)', borderColor: 'rgba(85,34,224,0.3)' }}
          aria-label="Close terminal"
        >
          close ✕
        </button>
      </div>

      {/* Lines */}
      <div className="flex-1 overflow-y-auto p-6 space-y-1.5">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="text-xs leading-relaxed"
            style={{ color: line.color || 'transparent', fontFamily: 'monospace' }}
          >
            {line.text || '\u00A0'}
          </div>
        ))}

        {visibleLines >= lines.length && (
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: 'rgba(96,96,160,0.6)' }}>
              tap anywhere to close
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
