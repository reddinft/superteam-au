'use client'

import { AtSign, Code2, Link, Globe } from 'lucide-react'
import Image from 'next/image'

interface MemberCardProps {
  name: string
  role: string
  guild: string
  city: string
  bio: string
  avatar?: string | null
  twitterUrl?: string | null
  githubUrl?: string | null
  linkedinUrl?: string | null
  websiteUrl?: string | null
}

const GUILD_COLORS: Record<string, string> = {
  dev: '#14F195',
  design: '#F4A60B',
  writers: '#BCB3FF',
  ops: '#E8A876',
}

const GUILD_LABELS: Record<string, string> = {
  dev: 'Dev',
  design: 'Design',
  writers: 'Writers',
  ops: 'Ops',
}

function getInitials(name: string) {
  const parts = name.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function cityLabel(city: string) {
  const map: Record<string, string> = {
    sydney: 'Sydney',
    melbourne: 'Melbourne',
    brisbane: 'Brisbane',
    perth: 'Perth',
    adelaide: 'Adelaide',
    remote: 'Remote',
    other: 'Other',
  }
  return map[city] ?? city
}

export default function MemberCard({
  name,
  role,
  guild,
  city,
  avatar,
  twitterUrl,
  githubUrl,
  linkedinUrl,
  websiteUrl,
}: MemberCardProps) {
  const guildColor = GUILD_COLORS[guild] ?? '#A0A0C0'
  const guildLabel = GUILD_LABELS[guild] ?? guild
  const initials = getInitials(name)

  return (
    <div
      className="rounded-xl p-5 border flex flex-col gap-3 transition-all duration-200"
      style={{
        backgroundColor: 'var(--surface-1)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Avatar */}
      <div className="flex items-center gap-3">
        {avatar ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image src={avatar} alt={name} fill className="object-cover" />
          </div>
        ) : (
          <div
            className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: guildColor + '33', color: guildColor }}
          >
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-semibold text-base truncate" style={{ color: 'var(--text-primary)' }}>
            {name}
          </h3>
          <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
            {role}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text-secondary)' }}
        >
          {cityLabel(city)}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: guildColor }}
          />
          {guildLabel}
        </span>
      </div>

      {/* Social links */}
      {(twitterUrl || githubUrl || linkedinUrl || websiteUrl) && (
        <div className="flex gap-3 mt-auto pt-1">
          {twitterUrl && (
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="transition-colors duration-150" style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
            >
              <AtSign size={16} />
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="transition-colors duration-150" style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
            >
              <Code2 size={16} />
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="transition-colors duration-150" style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
            >
              <Link size={16} />
            </a>
          )}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="transition-colors duration-150" style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
            >
              <Globe size={16} />
            </a>
          )}
        </div>
      )}
    </div>
  )
}
