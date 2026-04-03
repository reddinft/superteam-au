'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

interface TerminalContextValue {
  isOpen: boolean
  openTerminal: () => void
  closeTerminal: () => void
}

const TerminalContext = createContext<TerminalContextValue>({
  isOpen: false,
  openTerminal: () => {},
  closeTerminal: () => {},
})

export function useTerminal() {
  return useContext(TerminalContext)
}

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const lastARef = useRef<number>(0)

  const openTerminal = useCallback(() => setIsOpen(true), [])
  const closeTerminal = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't fire when focused in an input / textarea / contenteditable
      const target = e.target as HTMLElement
      const tag = target.tagName.toLowerCase()
      if (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        target.isContentEditable
      ) {
        return
      }

      const now = Date.now()
      if (e.key === 'a' || e.key === 'A') {
        lastARef.current = now
      } else if ((e.key === 'u' || e.key === 'U') && now - lastARef.current < 1000) {
        lastARef.current = 0
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <TerminalContext.Provider value={{ isOpen, openTerminal, closeTerminal }}>
      {children}
    </TerminalContext.Provider>
  )
}
