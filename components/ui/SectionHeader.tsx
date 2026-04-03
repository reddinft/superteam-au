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
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-brand-yellow)' }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl font-bold leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
