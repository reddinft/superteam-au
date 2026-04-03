interface StatPillProps {
  value: string
  label: string
}

export default function StatPill({ value, label }: StatPillProps) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
      style={{
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <span className="font-bold text-sm" style={{ color: 'var(--color-brand-yellow)' }}>
        {value}
      </span>
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </div>
  )
}
