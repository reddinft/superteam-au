import { reader } from '@/lib/keystatic.reader'
import HeroSection from '@/components/sections/HeroSection'
import ImpactStats from '@/components/sections/ImpactStats'
import AboutSection from '@/components/sections/AboutSection'
import GuildsSection from '@/components/sections/GuildsSection'
import EventsSection from '@/components/sections/EventsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import MembersDirectory from '@/components/sections/MembersDirectory'
import BlogPreview from '@/components/sections/BlogPreview'
import PartnersStrip from '@/components/sections/PartnersStrip'
import EarnSection from '@/components/sections/EarnSection'

export default async function Home() {
  const siteConfig = await reader.singletons.siteConfig.read()

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
      <MembersDirectory />
      <BlogPreview />
      <PartnersStrip />
      <EarnSection earnUrl={siteConfig?.earnUrl ?? 'https://superteam.fun/earn/s/superteamaustralia'} />
    </main>
  )
}
