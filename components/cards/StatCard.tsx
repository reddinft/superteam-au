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
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
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
      className="flex flex-col items-center justify-center p-8 rounded-xl"
      style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="text-5xl md:text-6xl font-extrabold mb-2" style={{ color: 'var(--color-brand-yellow)' }}>
        <span style={{ color: 'var(--color-brand-yellow)' }}>{prefix}</span>
        {count}
        <span style={{ color: 'var(--color-brand-yellow)' }}>{suffix}</span>
      </div>
      <p className="text-sm font-medium text-center" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
    </div>
  )
}
