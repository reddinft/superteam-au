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

      {/* Hero band */}
      <div style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(85,34,224,0.18) 0%, transparent 70%)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: '7rem',
        paddingBottom: '3rem',
      }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          {/* Category eyebrow */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-brand-yellow)',
            marginBottom: '1rem',
          }}>
            {post.category.replace(/-/g, ' ')}
          </p>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              marginBottom: '1.75rem',
            }}>
              {post.excerpt}
            </p>
          )}

          {/* Author + date */}
          <div className="flex items-center gap-4" style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            {author && (
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {author.name}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  {author.role}
                </p>
              </div>
            )}
            {post.publishedAt && (
              <p className="ml-auto" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {formatDate(post.publishedAt)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container pb-24" style={{ maxWidth: '760px', paddingTop: '3.5rem' }}>
        <div className="prose-blog">
          <DocumentRenderer document={body} />
        </div>

        {/* Back link */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
          <a
            href="/blog"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              textDecoration: 'none',
            }}
          >
            ← Back to Blog
          </a>
        </div>
      </div>
    </main>
  )
}
