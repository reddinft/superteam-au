'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/cards/ProjectCard'
import ProjectModal from '@/components/ui/ProjectModal'

interface Author {
  name: string
  twitterUrl?: string | null
  telegramUsername?: string | null
  xUrl?: string | null
}

interface ProjectItem {
  slug: string
  entry: {
    title: string
    description: string
    category: string
    url?: string | null
    featured?: boolean
  }
  authors: Author[]
  authorNames: string[]
  url?: string | null
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
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.entry.category === filter)

  return (
    <div>
      {/* Filter pills */}
      <div
        className="flex overflow-x-auto"
        style={{ gap: '0.5rem', marginBottom: '2rem', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            style={{
              flexShrink: 0,
              padding: '8px 18px',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              ...(filter === f.value
                ? { backgroundColor: 'var(--color-brand-purple)', color: '#fff', border: '1.5px solid var(--color-brand-purple)' }
                : { backgroundColor: 'transparent', color: 'var(--text-secondary)', border: '1.5px solid var(--border-default)' }
              )
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: '1.25rem' }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ProjectCard
                title={p.entry.title}
                description={p.entry.description}
                category={p.entry.category}
                url={p.entry.url}
                authorNames={p.authorNames}
                featured={p.entry.featured}
                onClick={() => setSelectedProject(p)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedProject && (
        <ProjectModal
          project={{
            title: selectedProject.entry.title,
            description: selectedProject.entry.description,
            category: selectedProject.entry.category,
            url: selectedProject.url ?? selectedProject.entry.url,
            authors: selectedProject.authors ?? [],
          }}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {filtered.length === 0 && (
        <p className="text-center" style={{ paddingTop: '3rem', paddingBottom: '3rem', color: 'var(--text-tertiary)' }}>
          No projects in this category yet.
        </p>
      )}
    </div>
  )
}
