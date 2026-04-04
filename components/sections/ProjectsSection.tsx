import { reader } from '@/lib/keystatic.reader'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import ProjectsSectionClient from './ProjectsSectionClient'

export default async function ProjectsSection() {
  const [projects, members] = await Promise.all([
    reader.collections.projects.all(),
    reader.collections.members.all(),
  ])

  // Build slug -> member map with socials
  const memberMap: Record<string, { name: string; twitterUrl?: string | null; telegramUsername?: string | null; xUrl?: string | null }> = {}
  for (const m of members) {
    memberMap[m.slug] = {
      name: m.entry.name,
      twitterUrl: (m.entry as any).twitterUrl ?? null,
      telegramUsername: (m.entry as any).telegramUsername ?? null,
      xUrl: (m.entry as any).xUrl ?? null,
    }
  }

  const projectsWithAuthors = projects.map((p) => ({
    slug: p.slug,
    entry: {
      title: p.entry.title,
      description: p.entry.description,
      category: p.entry.category,
      url: p.entry.url,
      featured: p.entry.featured,
    },
    authors: (p.entry.authorSlugs ?? []).map((s) => memberMap[s] ?? { name: s }),
    authorNames: (p.entry.authorSlugs ?? []).map((s) => memberMap[s]?.name ?? s),
    url: p.entry.url ?? null,
  }))

  return (
    <section id="projects" className="section-padding" style={{ backgroundColor: 'var(--surface-1)' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <SectionHeader eyebrow="PROJECTS" title="What We're Building" align="left" />
        </div>
        <ProjectsSectionClient projects={projectsWithAuthors} />
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <Button variant="ghost" size="md" href="https://superteam.fun/earn">
            Submit Your Project →
          </Button>
        </div>
      </div>
    </section>
  )
}
