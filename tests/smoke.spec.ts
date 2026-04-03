import { test, expect } from '@playwright/test'

test.describe('Superteam AU — Smoke Tests', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Superteam Australia/i)
  })

  test('navbar is visible', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('hero section renders', async ({ page }) => {
    await page.goto('/')
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    // Check for SUPERTEAM text in the page
    const body = await page.textContent('body')
    expect(body).toContain('SUPERTEAM')
  })

  test('events section is reachable', async ({ page }) => {
    await page.goto('/')
    const eventsSection = page.locator('#events')
    await expect(eventsSection).toBeAttached()
  })

  test('members section is reachable', async ({ page }) => {
    await page.goto('/')
    const membersSection = page.locator('#members')
    await expect(membersSection).toBeAttached()
  })

  test('projects section is reachable', async ({ page }) => {
    await page.goto('/')
    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeAttached()
  })

  test('earn section is reachable', async ({ page }) => {
    await page.goto('/')
    const earnSection = page.locator('#earn')
    await expect(earnSection).toBeAttached()
  })

  test('footer is visible', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('southern cross terminal trigger exists', async ({ page }) => {
    await page.goto('/')
    const trigger = page.locator('#southern-cross-trigger')
    await expect(trigger).toBeAttached()
  })

  test('robots.txt is served', async ({ page }) => {
    const response = await page.goto('/robots.txt')
    expect(response?.status()).toBe(200)
    const body = await response?.text()
    expect(body).toContain('User-agent: *')
  })

  test('og-image is served', async ({ page }) => {
    const response = await page.goto('/og-image.png')
    expect(response?.status()).toBe(200)
  })

  test('nav Join Now button is visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    const joinBtn = page.getByRole('link', { name: /join now/i })
    await expect(joinBtn).toBeVisible()
  })

  test('keyboard "a" then "u" opens terminal overlay', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Press 'a' then 'u' quickly
    await page.keyboard.press('a')
    await page.keyboard.press('u')
    // Terminal should appear
    await expect(page.locator('.fixed.inset-0').first()).toBeVisible({ timeout: 2000 })
  })

  test('section CTAs render', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('link', { name: /see all events/i })).toBeAttached()
    await expect(page.getByRole('link', { name: /add your profile/i })).toBeAttached()
  })
})
