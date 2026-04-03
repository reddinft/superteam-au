import { reader } from '@/lib/keystatic.reader'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import ProjectsSectionClient from './ProjectsSectionClient'

export default async function ProjectsSection() {
  const [projects, members] = await Promise.all([
    reader.collections.projects.all(),
    reader.collections.members.all(),
  ])

  // Build slug -> name map
  const memberMap: Record<string, string> = {}
  for (const m of members) {
    memberMap[m.slug] = m.entry.name
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
    authorNames: (p.entry.authorSlugs ?? []).map((s) => memberMap[s] ?? s),
  }))

  return (
    <section id="projects" className="section-padding" style={{ backgroundColor: 'var(--surface-1)' }}>
      <div className="container">
        <div className="mb-12">
          <SectionHeader eyebrow="PROJECTS" title="What We're Building" align="left" />
        </div>
        <ProjectsSectionClient projects={projectsWithAuthors} />
        <div className="mt-8 flex justify-center">
          <Button variant="ghost" size="md" href="https://superteam.fun/earn">
            Submit Your Project →
          </Button>
        </div>
      </div>
    </section>
  )
}
