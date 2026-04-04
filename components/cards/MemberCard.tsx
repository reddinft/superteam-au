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
  dev: '#5522E0',
  design: '#F4A60B',
  writers: '#C1692A',
  ops: '#14F195',
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
      className="rounded-md flex flex-col border"
      style={{
        padding: '1.25rem',
        gap: '0.75rem',
        backgroundColor: 'var(--surface-1)',
        borderColor: 'var(--border-default)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(124, 58, 237, 0.3), 0 4px 16px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {/* Avatar */}
      <div className="flex items-center" style={{ gap: '0.75rem' }}>
        {avatar ? (
          <div className="relative rounded-full overflow-hidden flex-shrink-0" style={{ width: '3rem', height: '3rem' }}>
            <Image src={avatar} alt={name} fill className="object-cover" />
          </div>
        ) : (
          <div
            className="rounded-full flex-shrink-0 flex items-center justify-center"
            style={{
              width: '3rem',
              height: '3rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: guildColor + '33',
              color: guildColor,
            }}
          >
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <h3 style={{ fontWeight: 600, fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
            {name}
          </h3>
          <p style={{ fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
            {role}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center flex-wrap" style={{ gap: '0.5rem' }}>
        <span
          style={{
            fontSize: '0.75rem',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            paddingTop: '0.125rem',
            paddingBottom: '0.125rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--surface-2)',
            color: 'var(--text-secondary)',
          }}
        >
          {cityLabel(city)}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            paddingTop: '0.125rem',
            paddingBottom: '0.125rem',
            borderRadius: '9999px',
            backgroundColor: `${guildColor}20`,
            color: guildColor,
            border: `1px solid ${guildColor}40`,
          }}
        >
          {guildLabel}
        </span>
      </div>

      {/* Social links */}
      {(twitterUrl || githubUrl || linkedinUrl || websiteUrl) && (
        <div className="flex" style={{ gap: '0.75rem', marginTop: 'auto', paddingTop: '0.25rem' }}>
          {twitterUrl && (
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} on X / Twitter`} className="transition-colors duration-150" style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
            >
              <AtSign size={16} aria-hidden="true" />
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} on GitHub`} className="transition-colors duration-150" style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
            >
              <Code2 size={16} aria-hidden="true" />
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`} className="transition-colors duration-150" style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
            >
              <Link size={16} aria-hidden="true" />
            </a>
          )}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s website`} className="transition-colors duration-150" style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
            >
              <Globe size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}
