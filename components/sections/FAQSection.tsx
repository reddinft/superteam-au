'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const FAQS = [
  {
    question: 'What is Superteam Australia?',
    answer:
      "Superteam Australia is the home for Solana builders, founders, creatives and institutions in Australia. We're part of the global Superteam network — the talent layer of the Solana ecosystem. We connect Australian builders with opportunities, capital, events and each other.",
  },
  {
    question: 'How do I get involved?',
    answer:
      "Join our Telegram community to connect with builders, attend events and stay across opportunities. If you're a founder or builder actively shipping on Solana, you can apply for curated membership to access deeper support, introductions and resources.",
  },
  {
    question: 'What opportunities are available?',
    answer:
      'Superteam Australia members access bounties and grants through Superteam Earn, hackathons like HACKAROO, ecosystem events across Sydney, Melbourne, Brisbane, Gold Coast, Perth and Adelaide, plus introductions to AU and global Solana VCs and accelerator programs.',
  },
  {
    question: 'How can institutions engage?',
    answer:
      "We actively bridge builders with institutions exploring blockchain and internet capital markets. Whether you're a corporate, financial institution, government body or investor, we can connect you with technical talent, live projects and the broader Solana ecosystem. Reach out via Telegram or email.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ backgroundColor: 'var(--surface-1)' }}
    >
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <SectionHeader eyebrow="FAQ" title="Common Questions" align="center" />
        </motion.div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-150"
                style={{ color: 'var(--text-primary)' }}
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-base">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                  style={{ color: 'var(--color-brand-yellow)' }}
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="px-6 pb-5 text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
