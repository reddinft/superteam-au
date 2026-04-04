'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface TerminalProps {
  isOpen: boolean
  onClose: () => void
  stats?: {
    membersCount?: number | null
    eventsCount?: number | null
    projectsCount?: number | null
    totalEarned?: string | null
  }
  members?: Array<{ name: string; role: string; guild: string }>
  events?: Array<{ title: string; date: string; location: string }>
}

const BANNER = `
  ███████╗██╗   ██╗██████╗ ███████╗██████╗ ████████╗███████╗ █████╗ ███╗   ███╗
  ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
  ███████╗██║   ██║██████╔╝█████╗  ██████╔╝   ██║   █████╗  ███████║██╔████╔██║
  ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗   ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║
  ███████║╚██████╔╝██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║██║ ╚═╝ ██║
  ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
                                        AUSTRALIA — v1.0.0
`.trim()

const HELP_TEXT = `Available commands:
  help          Show this help message
  about         About Superteam Australia
  members       List first 10 community members
  events        List upcoming events
  earn          Superteam Earn opportunities
  stats         Community statistics
  join          How to join Superteam AU
  southerncross The constellation that guides us
  clear         Clear the terminal
  exit          Close terminal`

function getCommandOutput(
  cmd: string,
  stats?: TerminalProps['stats'],
  members?: TerminalProps['members'],
  events?: TerminalProps['events']
): string {
  const trimmed = cmd.trim().toLowerCase()
  switch (trimmed) {
    case 'help':
      return HELP_TEXT
    case 'about':
      return `Superteam Australia is the premier community for Solana builders Down Under.
We connect developers, designers, writers, and operators to build the future
of decentralised technology in the Asia-Pacific region.
\nFounded in 2023. Based everywhere. Building forever.`
    case 'members': {
      if (!members || members.length === 0) {
        return 'No member data available. Connect to CMS for live data.'
      }
      const list = members
        .slice(0, 10)
        .map((m, i) => `  ${String(i + 1).padStart(2, ' ')}. ${m.name.padEnd(24)} [${m.guild.toUpperCase()}] ${m.role}`)
        .join('\n')
      return `Superteam AU Members (showing 10 of ${members.length}):\n${list}`
    }
    case 'events': {
      if (!events || events.length === 0) {
        return 'No upcoming events scheduled. Check back soon!'
      }
      const list = events
        .slice(0, 8)
        .map((e) => `  • ${e.date}  ${e.title.padEnd(32)} @ ${e.location}`)
        .join('\n')
      return `Upcoming Events:\n${list}`
    }
    case 'earn':
      return `Superteam Earn — Get paid to build on Solana.
\n  Bounties, grants, and paid opportunities from top Solana protocols.
  → https://superteam.fun/earn
\n  Run "join" to become a verified member and unlock exclusive listings.`
    case 'stats': {
      const m = stats?.membersCount ?? '?'
      const e = stats?.eventsCount ?? '?'
      const p = stats?.projectsCount ?? '?'
      const earned = stats?.totalEarned ?? '?'
      return `Superteam Australia — Community Stats
  ┌─────────────────────────────┐
  │ Members       : ${String(m).padEnd(10)} │
  │ Events hosted : ${String(e).padEnd(10)} │
  │ Projects built: ${String(p).padEnd(10)} │
  │ Total earned  : ${String(earned).padEnd(10)} │
  └─────────────────────────────┘`
    }
    case 'join':
      return `How to join Superteam Australia:
\n  1. Visit https://superteam.fun
  2. Create your profile and apply
  3. Join our Telegram: https://t.me/superteamaustralia
  4. Attend an event — IRL or online
  5. Build something. Ship it. Repeat.
\n  "The best time to join was yesterday. The second best is now."`
    case 'southerncross':
      return `✦ ✦   ✦
  ✦      The Southern Cross — Crux — our guiding constellation.
     ✦   
  Four bright stars visible only from the Southern Hemisphere.
  We navigate by them. We build under them.
\n  Alpha Crucis  — Acrux     (our devs)
  Beta Crucis   — Mimosa    (our designers)
  Gamma Crucis  — Gacrux    (our writers)
  Delta Crucis  — Imai      (our operators)
\n  Together: a cross in the sky. A team on the ground.`
    case 'clear':
      return '__CLEAR__'
    case 'exit':
      return '__EXIT__'
    case '':
      return ''
    default:
      return `Command not found: ${trimmed}\nType "help" for available commands.`
  }
}

interface HistoryLine {
  type: 'input' | 'output' | 'banner'
  text: string
}

export default function TerminalOverlay({ isOpen, onClose, stats, members, events }: TerminalProps) {
  const [history, setHistory] = useState<HistoryLine[]>([])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdIndex, setCmdIndex] = useState(-1)
  const [typewriterActive, setTypewriterActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Initialize banner on open
  useEffect(() => {
    if (isOpen) {
      setHistory([
        { type: 'banner', text: BANNER },
        { type: 'output', text: 'Type "help" for available commands. Press ESC or type "exit" to close.' },
      ])
      setInput('')
      setCmdHistory([])
      setCmdIndex(-1)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const typewriterAppend = useCallback((text: string, onDone?: () => void) => {
    if (!text) { onDone?.(); return }
    setTypewriterActive(true)
    let i = 0
    const chars = text.split('')
    const interval = setInterval(() => {
      if (i >= chars.length) {
        clearInterval(interval)
        setTypewriterActive(false)
        onDone?.()
        return
      }
      setHistory((prev) => {
        const last = prev[prev.length - 1]
        if (last?.type === 'output' && last.text.startsWith('__TW__')) {
          return [
            ...prev.slice(0, -1),
            { type: 'output' as const, text: '__TW__' + last.text.slice(6) + chars[i] },
          ]
        }
        return [...prev, { type: 'output' as const, text: '__TW__' + chars[i] }]
      })
      i++
    }, 20)
  }, [])

  const handleSubmit = useCallback(() => {
    if (typewriterActive) return
    const cmd = input.trim()
    setInput('')
    setCmdIndex(-1)

    // Add command to history
    setHistory((prev) => [...prev, { type: 'input', text: cmd }])
    if (cmd) setCmdHistory((prev) => [cmd, ...prev])

    const output = getCommandOutput(cmd, stats, members, events)

    if (output === '__CLEAR__') {
      setHistory([])
      return
    }
    if (output === '__EXIT__') {
      onClose()
      return
    }
    if (!output) return

    // Typewriter for output
    setHistory((prev) => [...prev, { type: 'output', text: '__TW__' }])
    typewriterAppend(output)
  }, [input, typewriterActive, stats, members, events, onClose, typewriterAppend])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIdx = Math.min(cmdIndex + 1, cmdHistory.length - 1)
      setCmdIndex(nextIdx)
      setInput(cmdHistory[nextIdx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIdx = Math.max(cmdIndex - 1, -1)
      setCmdIndex(nextIdx)
      setInput(nextIdx === -1 ? '' : cmdHistory[nextIdx] ?? '')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex flex-col font-mono text-sm"
      style={{
        backgroundColor: '#0A0A12',
        zIndex: 'var(--z-terminal)',
        color: '#F0F0FF',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(85,34,224,0.3)', backgroundColor: '#0D0D1A' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28CA41' }} />
        </div>
        <span className="text-xs" style={{ color: 'rgba(96,96,160,0.8)' }}>
          superteam-au — terminal
        </span>
        <button
          onClick={onClose}
          className="text-xs px-2 py-1 rounded transition-colors"
          style={{ color: 'rgba(96,96,160,0.8)' }}
          aria-label="Close terminal"
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F0FF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(96,96,160,0.8)')}
        >
          ✕ ESC
        </button>
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {history.map((line, i) => {
          if (line.type === 'banner') {
            return (
              <pre key={i} className="text-xs leading-tight mb-4 overflow-x-auto" style={{ color: '#14F195' }}>
                {line.text}
              </pre>
            )
          }
          if (line.type === 'input') {
            return (
              <div key={i} className="flex gap-2">
                <span style={{ color: '#14F195' }}>superteam@au:~$</span>
                <span style={{ color: '#F0F0FF' }}>{line.text}</span>
              </div>
            )
          }
          // output
          const text = line.text.startsWith('__TW__') ? line.text.slice(6) : line.text
          return (
            <pre key={i} className="whitespace-pre-wrap break-words leading-relaxed" style={{ color: '#F4A60B' }}>
              {text}
            </pre>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(85,34,224,0.3)', backgroundColor: '#0D0D1A' }}
      >
        <span style={{ color: '#14F195' }}>superteam@au:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none"
          style={{ color: '#F0F0FF', caretColor: '#14F195' }}
          placeholder={typewriterActive ? '' : 'type a command...'}
          disabled={typewriterActive}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {typewriterActive && (
          <span className="animate-pulse" style={{ color: '#14F195' }}>▋</span>
        )}
      </div>
    </div>
  )
}
