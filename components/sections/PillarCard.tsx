import { type LucideIcon } from 'lucide-react'

interface PillarCardProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor: string
}

export default function PillarCard({ icon: Icon, title, description, iconColor }: PillarCardProps) {
  return (
    <div
      className="flex items-start gap-4 p-6 rounded-xl"
      style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="flex-shrink-0 p-2 rounded-lg"
        style={{ backgroundColor: `${iconColor}18` }}
      >
        <Icon size={22} style={{ color: iconColor }} />
      </div>
      <div>
        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>
    </div>
  )
}
