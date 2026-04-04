/**
 * screenshot-sections.mjs
 * Takes full-page and per-section screenshots using Playwright.
 * Output: public/design-system-screenshots/
 */

import { chromium } from '@playwright/test'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'design-system-screenshots')
const BASE_URL = process.argv[2] ?? 'http://localhost:3001'

const SECTIONS = [
  { id: 'hero',     label: 'Hero',              selector: 'section#hero, [id="hero"], .hero-section, header' },
  { id: 'about',    label: 'About',             selector: '#about, [id="about"]' },
  { id: 'guilds',   label: 'Guilds',            selector: '#guilds, [id="guilds"]' },
  { id: 'projects', label: 'Projects',          selector: '#projects, [id="projects"]' },
  { id: 'events',   label: 'Events',            selector: '#events, [id="events"]' },
  { id: 'members',  label: 'Members Directory', selector: '#members, [id="members"]' },
  { id: 'join',     label: 'Join / CTA',        selector: '#join, [id="join"]' },
  { id: 'footer',   label: 'Footer',            selector: 'footer' },
]

async function run() {
  await mkdir(OUT_DIR, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage()

  // Desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 })

  // Wait for animations to settle
  await page.waitForTimeout(2000)

  console.log('📸 Full page screenshot...')
  await page.screenshot({
    path: path.join(OUT_DIR, '00-full-page.png'),
    fullPage: true,
  })
  console.log('  ✅ 00-full-page.png')

  // Nav screenshot
  console.log('📸 Nav bar...')
  const nav = await page.$('nav, [role="navigation"]')
  if (nav) {
    await nav.screenshot({ path: path.join(OUT_DIR, '01-navbar.png') })
    console.log('  ✅ 01-navbar.png')
  }

  // Per-section screenshots
  for (const section of SECTIONS) {
    console.log(`📸 ${section.label}...`)
    try {
      const el = await page.$(section.selector)
      if (el) {
        await el.scrollIntoViewIfNeeded()
        await page.waitForTimeout(600) // let scroll animations fire
        await el.screenshot({ path: path.join(OUT_DIR, `${section.id}.png`) })
        console.log(`  ✅ ${section.id}.png`)
      } else {
        console.log(`  ⚠️  No element found for selector: ${section.selector}`)
      }
    } catch (e) {
      console.log(`  ❌ ${section.id}: ${e.message}`)
    }
  }

  // Mobile viewport
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(1500)

  console.log('📸 Mobile full page...')
  await page.screenshot({
    path: path.join(OUT_DIR, 'mobile-full-page.png'),
    fullPage: true,
  })
  console.log('  ✅ mobile-full-page.png')

  await browser.close()
  console.log(`\n✅ All screenshots saved to ${OUT_DIR}`)
}

run().catch((e) => { console.error(e); process.exit(1) })
