import { reader } from '@/lib/keystatic.reader'
import SectionHeader from '@/components/ui/SectionHeader'
import BlogCard from '@/components/cards/BlogCard'
import Button from '@/components/ui/Button'

export default async function BlogPreview() {
  const posts = await reader.collections.posts.all()

  const sorted = posts
    .filter((p) => p.entry.publishedAt)
    .sort((a, b) => (b.entry.publishedAt ?? '').localeCompare(a.entry.publishedAt ?? ''))
    .slice(0, 3)

  return (
    <section id="blog" className="section-padding" style={{ backgroundColor: 'var(--surface-1)' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <SectionHeader eyebrow="BLOG" title="From the Community" align="left" />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '1.5rem' }}
        >
          {sorted.map((p) => (
            <BlogCard
              key={p.slug}
              slug={p.slug}
              title={p.entry.title}
              publishedAt={p.entry.publishedAt ?? ''}
              category={p.entry.category}
              excerpt={p.entry.excerpt}
              coverImage={p.entry.coverImage}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Button variant="secondary" size="md" href="/blog">
            View All Posts →
          </Button>
        </div>
      </div>
    </section>
  )
}
