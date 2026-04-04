'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatCardProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  delay?: number
}

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(target)

  useEffect(() => {
    if (!started) return
    // Animate a short flourish from 90% → 100%
    const startVal = Math.round(target * 0.9)
    setCount(startVal)
    const startTime = performance.now()
    const range = target - startVal

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(startVal + eased * range))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [started, target, duration])

  return count
}

export default function StatCard({ value, label, prefix = '', suffix = '', delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView && !started) {
      const timer = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, started, delay])

  const count = useCountUp(value, 1500, started)

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center rounded-xl"
      style={{
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--border-default)',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(2.5rem, 4vw, 3.75rem)',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: 'var(--color-brand-yellow)',
        }}
      >
        <span style={{ color: 'var(--color-brand-yellow)' }}>{prefix}</span>
        {count}
        <span style={{ color: 'var(--color-brand-yellow)' }}>{suffix}</span>
      </div>
      <p
        style={{
          fontSize: '0.875rem',
          fontWeight: 500,
          textAlign: 'center',
          color: 'var(--text-secondary)',
        }}
      >
        {label}
      </p>
    </div>
  )
}
