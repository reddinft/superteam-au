import HeroSection from '@/components/sections/HeroSection'
import ImpactStats from '@/components/sections/ImpactStats'
import AboutSection from '@/components/sections/AboutSection'
import GuildsSection from '@/components/sections/GuildsSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ImpactStats />
      <GuildsSection />
      {/* Phase B sections will go here */}
    </main>
  )
}
