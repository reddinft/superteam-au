interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const textAlign = align === 'center' ? 'center' : 'left'
  const alignItems = align === 'center' ? 'center' : 'flex-start'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign, alignItems }}>
      {eyebrow && (
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-brand-yellow)',
            fontFamily: 'var(--font-mono, "JetBrains Mono", "Courier New", monospace)',
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          color: 'var(--text-primary)',
          margin: 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            margin: 0,
            maxWidth: '48rem',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
