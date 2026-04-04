interface StatPillProps {
  value: string
  label: string
}

export default function StatPill({ value, label }: StatPillProps) {
  return (
    <div
      className="inline-flex items-center"
      style={{
        gap: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '0.375rem',
        paddingBottom: '0.375rem',
        borderRadius: '9999px',
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-brand-yellow)' }}>
        {value}
      </span>
      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </div>
  )
}
