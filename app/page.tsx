import { reader } from '@/lib/keystatic.reader'
import HeroSection from '@/components/sections/HeroSection'

export const dynamic = 'force-dynamic' // always read latest content from disk
import ImpactStats from '@/components/sections/ImpactStats'
import AboutSection from '@/components/sections/AboutSection'
import GuildsSection from '@/components/sections/GuildsSection'
import EventsSection from '@/components/sections/EventsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import MembersDirectory from '@/components/sections/MembersDirectory'
import BlogPreview from '@/components/sections/BlogPreview'
import PartnersStrip from '@/components/sections/PartnersStrip'
import EarnSection from '@/components/sections/EarnSection'
import FAQSection from '@/components/sections/FAQSection'
import JoinSection from '@/components/sections/JoinSection'
import TerminalWrapper from '@/components/terminal/TerminalWrapper'

export default async function Home() {
  const siteConfig = await reader.singletons.siteConfig.read()
  const allMembers = await reader.collections.members.all()
  const allEvents = await reader.collections.events.all()
  
  const terminalMembers = allMembers.map((m) => ({
    name: m.entry.name,
    role: m.entry.role,
    guild: m.entry.guild,
  }))
  
  const today = new Date().toISOString().split('T')[0]
  const terminalEvents = allEvents
    .filter((e) => e.entry.date >= today)
    .sort((a, b) => a.entry.date.localeCompare(b.entry.date))
    .map((e) => ({
      title: e.entry.title,
      date: e.entry.date,
      location: e.entry.location ?? 'TBA',
    }))
  
  const terminalStats = {
    membersCount: siteConfig?.membersCount,
    eventsCount: siteConfig?.eventsCount,
    projectsCount: siteConfig?.projectsCount,
    totalEarned: siteConfig?.totalEarned,
  }

  return (
    <main>
      <HeroSection
        headline={siteConfig?.heroHeadline}
        subheadline={siteConfig?.heroSubheadline}
        statPills={siteConfig ? [
          { value: `${siteConfig.membersCount}+`, label: 'Members' },
          { value: `${siteConfig.eventsCount}+`, label: 'Events' },
          { value: siteConfig.totalEarned ?? '$50K+', label: 'Earned' },
        ] : undefined}
      />
      <AboutSection />
      <ImpactStats
        membersCount={siteConfig?.membersCount ?? undefined}
        eventsCount={siteConfig?.eventsCount ?? undefined}
        projectsCount={siteConfig?.projectsCount ?? undefined}
        totalEarned={siteConfig?.totalEarned ?? undefined}
      />
      <GuildsSection />
      <EventsSection />
      <ProjectsSection />
      <FAQSection />
      <MembersDirectory />
      <JoinSection />
      <BlogPreview />
      <EarnSection earnUrl={siteConfig?.earnUrl ?? 'https://superteam.fun/earn'} />
      <PartnersStrip />
      <TerminalWrapper
        stats={terminalStats}
        members={terminalMembers}
        events={terminalEvents}
      />
    </main>
  )
}
