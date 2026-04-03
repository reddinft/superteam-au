import { reader } from '@/lib/keystatic.reader'
import SectionHeader from '@/components/ui/SectionHeader'
import BlogCard from '@/components/cards/BlogCard'

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await reader.collections.posts.all()

  const sorted = posts
    .filter((p) => p.entry.publishedAt)
    .sort((a, b) => (b.entry.publishedAt ?? '').localeCompare(a.entry.publishedAt ?? ''))

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--surface-0)' }}>
      <div className="container pt-28 pb-16">
        <div className="mb-12">
          <SectionHeader eyebrow="BLOG" title="From the Community" align="left" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </main>
  )
}
