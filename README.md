# Superteam Australia — Community Website

The official website for Superteam Australia, the talent layer of the Solana ecosystem in the southern hemisphere.

**Live site:** https://superteam-au-redditech.vercel.app

---

## What this is

A content-managed community hub for Australian Solana builders. Showcases members, events, projects, bounties, and community identity. Built for the Superteam AU Website Design & Build Challenge.

## Design direction

"Southern Cross Terminal" — a dark-mode, app-like UI that speaks the language of the Solana ecosystem. Deep space backgrounds, the Southern Cross constellation as identity anchor, and a hidden terminal easter egg for developers (type `au` anywhere on the page).

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16.2.1 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + CSS design tokens |
| Animation | Framer Motion |
| CMS | Keystatic (git-based, zero SaaS fees) |
| Deployment | Vercel |
| Testing | Playwright (smoke tests) |

## Getting started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build
```

## Content management

Content lives in the `content/` directory as JSON and `.mdoc` files:

- `content/events/` — upcoming and past events
- `content/members/` — community member profiles
- `content/projects/` — community projects
- `content/posts/` — blog articles
- `content/partners/` — ecosystem partners
- `content/site-config.json` — global site settings (headline, stats, social links)

To edit content via a UI, run `pnpm dev` and visit `/keystatic`.

On Vercel (production), content is managed by committing directly to the `content/` directory.

## Architecture notes

- Server components handle all Keystatic Reader API calls
- Client components handle interactivity (filters, search, terminal, animations)
- No `any` types — fully typed throughout
- ISR (revalidate: 3600) on blog routes

## Easter egg

Type `au` anywhere on the page (not in a search/input field) to open the Southern Cross Terminal.

## Submission

Built for the [Superteam AU Website Design & Build Challenge](https://superteam.fun/earn/listing/superteam-australia-website-design-and-build-challenge) by Redditech (Nissan Dookeran).
