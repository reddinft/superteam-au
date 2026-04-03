import { reader } from '@/lib/keystatic.reader'
import SectionHeader from '@/components/ui/SectionHeader'
import MembersDirectoryClient from './MembersDirectoryClient'

export default async function MembersDirectory() {
  const members = await reader.collections.members.all()

  const memberData = members.map((m) => ({
    slug: m.slug,
    entry: {
      name: m.entry.name,
      role: m.entry.role,
      guild: m.entry.guild,
      city: m.entry.city,
      bio: m.entry.bio,
      avatar: m.entry.avatar,
      twitterUrl: m.entry.twitterUrl,
      githubUrl: m.entry.githubUrl,
      linkedinUrl: m.entry.linkedinUrl,
      websiteUrl: m.entry.websiteUrl,
    },
  }))

  return (
    <section id="members" className="section-padding" style={{ backgroundColor: 'var(--surface-0)' }}>
      <div className="container">
        <div className="mb-12">
          <SectionHeader eyebrow="THE COMMUNITY" title="Australian Builders" align="left" />
        </div>
        <MembersDirectoryClient members={memberData} />
      </div>
    </section>
  )
}
