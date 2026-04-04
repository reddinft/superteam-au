'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import MemberCard from '@/components/cards/MemberCard'

interface MemberItem {
  slug: string
  entry: {
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
}

interface MembersDirectoryClientProps {
  members: MemberItem[]
}

const GUILDS = [
  { value: 'all', label: 'All' },
  { value: 'dev', label: 'Dev' },
  { value: 'design', label: 'Design' },
  { value: 'writers', label: 'Writers' },
  { value: 'ops', label: 'Ops' },
]

const CITIES = ['all', 'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'remote', 'other']
const CITY_LABELS: Record<string, string> = {
  all: 'All Cities', sydney: 'Sydney', melbourne: 'Melbourne', brisbane: 'Brisbane',
  perth: 'Perth', adelaide: 'Adelaide', remote: 'Remote', other: 'Other',
}

export default function MembersDirectoryClient({ members }: MembersDirectoryClientProps) {
  const [selectedGuild, setSelectedGuild] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // True debounce: store timer ref and clear before setting new one
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedQuery(value), 300)
  }, [])

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (selectedGuild !== 'all' && m.entry.guild !== selectedGuild) return false
      if (selectedCity !== 'all' && m.entry.city !== selectedCity) return false
      if (debouncedQuery) {
        const q = debouncedQuery.toLowerCase()
        if (
          !m.entry.name.toLowerCase().includes(q) &&
          !m.entry.role.toLowerCase().includes(q) &&
          !m.entry.bio.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  }, [members, selectedGuild, selectedCity, debouncedQuery])

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search builders..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-lg px-4 py-2.5 mb-6 text-sm outline-none"
        style={{
          backgroundColor: 'var(--surface-2)',
          border: '1.5px solid var(--border-subtle)',
          color: 'var(--text-primary)',
        }}
        onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--color-brand-purple)')}
        onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)')}
      />

      {/* Guild filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {GUILDS.map((g) => (
          <button
            key={g.value}
            onClick={() => setSelectedGuild(g.value)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              ...(selectedGuild === g.value
                ? { backgroundColor: 'var(--color-brand-purple)', color: '#fff', border: '1.5px solid var(--color-brand-purple)' }
                : { backgroundColor: 'transparent', color: 'var(--text-secondary)', border: '1.5px solid var(--border-default)' }
              )
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* City filter */}
      <div className="flex items-center gap-4 mb-8">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="rounded-lg px-3 py-2 text-sm cursor-pointer outline-none"
          style={{
            backgroundColor: 'var(--surface-2)',
            border: '1.5px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          {CITIES.map((c) => (
            <option key={c} value={c} style={{ backgroundColor: 'var(--surface-2)' }}>
              {CITY_LABELS[c] ?? c}
            </option>
          ))}
        </select>

        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
          Showing <span style={{ color: 'var(--text-primary)' }}>{filtered.length}</span> of {members.length} builders
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((m) => (
          <MemberCard key={m.slug} {...m.entry} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-12" style={{ color: 'var(--text-tertiary)' }}>
          No builders match your search.
        </p>
      )}
    </div>
  )
}
