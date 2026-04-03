import { reader } from '@/lib/keystatic.reader'
import { notFound } from 'next/navigation'
import { DocumentRenderer } from '@keystatic/core/renderer'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await reader.collections.posts.all()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await reader.collections.posts.read(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Superteam Australia`,
    description: post.excerpt ?? undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await reader.collections.posts.read(slug)
  if (!post) notFound()

  const body = await post.body()

  // Look up author
  const author = post.authorSlug
    ? await reader.collections.members.read(post.authorSlug)
    : null

  function formatDate(dateStr: string) {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--surface-0)' }}>
      <div className="container max-w-3xl pt-28 pb-16">
        {/* Category */}
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: 'var(--color-brand-yellow)' }}
        >
          {post.category.replace(/-/g, ' ')}
        </p>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-8 pb-8" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          {author && (
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {author.name}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {author.role}
              </p>
            </div>
          )}
          {post.publishedAt && (
            <p className="text-sm ml-auto" style={{ color: 'var(--text-tertiary)' }}>
              {formatDate(post.publishedAt)}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="prose prose-invert max-w-none" style={{ color: 'var(--text-secondary)' }}>
          <DocumentRenderer document={body} />
        </div>
      </div>
    </main>
  )
}
