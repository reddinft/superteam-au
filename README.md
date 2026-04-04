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

## Content Pipeline — AI-Assisted with Keystatic

The site uses [Keystatic](https://keystatic.com/) in GitHub mode for content management. This enables a PR-based content approval workflow:

1. **Content is drafted** — by community members, an AI assistant, or the site admin via `/keystatic`
2. **A branch + PR is created automatically** — Keystatic commits the new `.mdoc` file to a feature branch and opens a GitHub PR
3. **Review and edit** — the PR can be reviewed, edited, and discussed in GitHub before merging
4. **Merge = deploy** — once merged to `main`, Vercel auto-deploys within ~60 seconds

This means anyone in the community can contribute a blog post, event, or project listing — and it goes through the same code review process as any other change. No CMS vendor lock-in, no monthly fees, full Git history on every content change.

> **Demo:** The blog posts by [@metasal](https://x.com/metasal) on this site were AI-expanded from his public tweets and added via this exact workflow — demonstrating how the pipeline works end-to-end.

## Architecture notes

- Server components handle all Keystatic Reader API calls
- Client components handle interactivity (filters, search, terminal, animations)
- No `any` types — fully typed throughout
- ISR (revalidate: 3600) on blog routes

## Easter egg

Type `au` anywhere on the page (not in a search/input field) to open the Southern Cross Terminal.

## Submission

Built for the [Superteam AU Website Design & Build Challenge](https://superteam.fun/earn/listing/superteam-australia-website-design-and-build-challenge) by Redditech (Nissan Dookeran).
