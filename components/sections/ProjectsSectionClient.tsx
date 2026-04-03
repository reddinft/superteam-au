'use client'

import { useState } from 'react'
import ProjectCard from '@/components/cards/ProjectCard'

interface ProjectItem {
  slug: string
  entry: {
    title: string
    description: string
    category: string
    url?: string | null
    featured?: boolean
  }
  authorNames: string[]
}

interface ProjectsSectionClientProps {
  projects: ProjectItem[]
}

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'defi', label: 'DeFi' },
  { value: 'depin', label: 'DePIN' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'nft', label: 'NFT' },
  { value: 'infra', label: 'Infra' },
  { value: 'dao', label: 'DAO' },
]

export default function ProjectsSectionClient({ projects }: ProjectsSectionClientProps) {
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.entry.category === filter)

  return (
    <div>
      {/* Filter pills */}
      <div
        className="flex gap-2 mb-8 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer"
            style={
              filter === f.value
                ? {
                    backgroundColor: 'var(--color-brand-purple)',
                    color: '#fff',
                    border: '1.5px solid var(--color-brand-purple)',
                  }
                : {
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1.5px solid var(--border-default)',
                  }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <ProjectCard
            key={p.slug}
            title={p.entry.title}
            description={p.entry.description}
            category={p.entry.category}
            url={p.entry.url}
            authorNames={p.authorNames}
            featured={p.entry.featured}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-12" style={{ color: 'var(--text-tertiary)' }}>
          No projects in this category yet.
        </p>
      )}
    </div>
  )
}
