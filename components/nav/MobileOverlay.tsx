'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Button from '@/components/ui/Button'

interface MobileOverlayProps {
  isOpen: boolean
  onClose: () => void
  links: { label: string; href: string }[]
}

export default function MobileOverlay({ isOpen, onClose, links }: MobileOverlayProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 0, right: 0.4 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 80) onClose()
          }}
          className="fixed inset-0 flex flex-col z-[100]"
          style={{ backgroundColor: 'var(--bg-base)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="font-bold text-lg">
              <span style={{ color: 'var(--color-brand-yellow)' }}>SUPERTEAM</span>
              <span style={{ color: 'var(--text-primary)' }}> AU</span>
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2 px-6 pt-8 flex-1">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                className="text-2xl font-semibold py-3 border-b transition-colors"
                style={{
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-subtle)',
                }}
                onClick={onClose}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <div className="px-6 pb-10 pt-6">
            <Button variant="primary" size="lg" href="https://discord.gg/superteamau" className="w-full justify-center">
              Join Now
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
