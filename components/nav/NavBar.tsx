'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import Button from '@/components/ui/Button'
import MobileOverlay from './MobileOverlay'

const NAV_LINKS = [
  { label: 'Events', href: '#events', id: 'events' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Members', href: '#members', id: 'members' },
  { label: 'Join', href: '#join', id: 'join' },
  { label: 'Guilds', href: '#guilds', id: 'guilds' },
  { label: 'About', href: '#about', id: 'about' },
]

interface NavBarProps {
  joinUrl?: string
}

export default function NavBar({ joinUrl }: NavBarProps = {}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver for active nav link
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id)
    const observers: IntersectionObserver[] = []

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    observers.push(observer)

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,18,0.96)' : 'rgba(10,10,18,0.7)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: '4rem' }}>
          {/* Logo */}
          <a
            href="/"
            className="flex items-center font-bold tracking-tight"
            style={{ gap: '0.25rem', fontSize: '1.125rem' }}
          >
            <span style={{ color: 'var(--color-brand-yellow)' }}>SUPERTEAM</span>
            <span style={{ color: 'var(--text-primary)' }}> AU</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center" style={{ gap: '2rem' }}>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-all duration-150 relative"
                  style={{
                    fontSize: '0.9375rem',
                    paddingBottom: '0.25rem',
                    color: isActive ? 'var(--color-brand-yellow)' : 'var(--text-secondary)',
                    borderBottom: isActive ? '2px solid var(--color-brand-yellow)' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-brand-yellow)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-secondary)'
                    }
                  }}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center" style={{ gap: '0.75rem' }}>
            <div className="hidden md:block">
              <Button variant="primary" size="sm" href={joinUrl ?? 'https://t.me/superteamaustralia'}>
                Join Now
              </Button>
            </div>
            <button
              className="md:hidden rounded-lg transition-colors"
              style={{ color: 'var(--text-primary)', padding: '0.5rem' }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <MobileOverlay
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
        joinUrl={joinUrl}
      />
    </>
  )
}
