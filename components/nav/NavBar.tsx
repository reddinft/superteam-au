'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import Button from '@/components/ui/Button'
import MobileOverlay from './MobileOverlay'

const NAV_LINKS = [
  { label: 'Events', href: '#events' },
  { label: 'Projects', href: '#projects' },
  { label: 'Members', href: '#members' },
  { label: 'Blog', href: '#blog' },
  { label: 'Earn', href: '#earn' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,18,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
        }}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1 font-bold text-lg tracking-tight">
            <span style={{ color: 'var(--color-brand-yellow)' }}>SUPERTEAM</span>
            <span style={{ color: 'var(--text-primary)' }}> AU</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors duration-150"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--text-primary)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--text-secondary)')
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button variant="primary" size="sm" href="#join">
                Join Now
              </Button>
            </div>
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-primary)' }}
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
      />
    </>
  )
}
