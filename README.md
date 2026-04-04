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

## Content Reference

All content lives in the `content/` directory as JSON and `.mdoc` files:

- `content/events/` — upcoming and past events
- `content/members/` — community member profiles
- `content/projects/` — community projects
- `content/posts/` — blog articles (`.mdoc`)
- `content/partners/` — ecosystem partners
- `content/site-config.json` — global site settings (headline, stats, social links)

To edit content via a UI, run `pnpm dev` and visit `/keystatic`.

On Vercel (production), content is managed by committing directly to the `content/` directory.

To validate all content against the schemas below:

```bash
node scripts/validate-content.mjs
# or via package.json:
pnpm validate

# Validate a single file:
node scripts/validate-content-single.mjs content/members/new-member.json
pnpm validate:file content/members/new-member.json
```

---

### member JSON (`content/members/<slug>.json`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✅ | Full name. Also used as the slug (kebab-cased) |
| `role` | string | optional | Role or tagline e.g. "Builder, NectarFi" |
| `organization` | string | optional | Organisation or project name |
| `guild` | string | optional | `dev` \| `design` \| `writers` \| `ops` |
| `city` | string | optional | `sydney` \| `melbourne` \| `brisbane` \| `perth` \| `adelaide` \| `remote` \| `other` |
| `bio` | string | optional | Short bio |
| `telegramUsername` | string | optional | Without the @ |
| `twitterUrl` | url | optional | Full URL e.g. https://x.com/handle |
| `githubUrl` | url | optional | Full URL |
| `linkedinUrl` | url | optional | Full URL |
| `websiteUrl` | url | optional | Full URL |
| `ecosystemTags` | string[] | optional | e.g. `["Solana", "DeFi"]` |
| `featured` | boolean | optional | Default false |

### event JSON (`content/events/<slug>.json`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | Also used as slug |
| `date` | string | ✅ | ISO date `YYYY-MM-DD` |
| `endDate` | string | optional | ISO date |
| `location` | string | optional | Venue name |
| `locationUrl` | url | optional | Google Maps or venue link |
| `type` | string | optional | `hackathon` \| `builder-session` \| `networking` \| `summit` \| `other` |
| `description` | string | optional | Event description |
| `rsvpUrl` | url | optional | |
| `recapUrl` | url | optional | For past events |
| `tags` | string[] | optional | |

### project JSON (`content/projects/<slug>.json`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | Also used as slug |
| `description` | string | optional | |
| `category` | string | optional | `defi` \| `depin` \| `gaming` \| `nft` \| `infra` \| `security` \| `community` \| `dao` \| `hackathon` \| `other` |
| `status` | string | optional | `active` \| `in_development` \| `demo_day_winner` \| `hackathon` \| `honourable_mention` \| `historical` \| `archived` \| `unknown` |
| `region` | string[] | optional | `AU` \| `NZ` \| `Global` \| `APAC` |
| `url` | url | optional | Live project URL |
| `githubUrl` | url | optional | |
| `authorSlugs` | string[] | optional | Must match slugs in `content/members/` |
| `featured` | boolean | optional | Default false |

### partner JSON (`content/partners/<slug>.json`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✅ | Also used as slug |
| `logo` | string | optional | Path under `public/images/partners/` |
| `url` | url | optional | Partner website |
| `tier` | string | optional | `platinum` \| `gold` \| `silver` \| `community` |

### blog post (`.mdoc`) (`content/posts/<slug>.mdoc`)

Frontmatter fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | Also used as slug |
| `publishedAt` | string | ✅ | ISO date `YYYY-MM-DD` |
| `authorSlug` | string | optional | Must match a member slug |
| `category` | string | optional | `ecosystem-update` \| `member-story` \| `event-recap` \| `tutorial` \| `announcement` |
| `excerpt` | string | optional | Short summary for cards |
| `tags` | string[] | optional | |
| `featured` | boolean | optional | Default false |

Body is Markdoc (markdown). File must be a flat `.mdoc` file — NOT a subdirectory.

### `content/site-config.json`

| Field | Type | Notes |
|---|---|---|
| `heroHeadline` | string | Main hero heading (no emoji — flag is added automatically) |
| `heroSubheadline` | string | Hero subtitle |
| `membersCount` | number | Displayed in stat pills |
| `eventsCount` | number | |
| `projectsCount` | number | |
| `totalEarned` | string | e.g. `$50K+` |
| `telegramUrl` | url | Community Telegram join link |
| `twitterUrl` | url | Twitter/X profile URL |
| `earnUrl` | url | Superteam Earn link |
| `contactEmail` | string | Contact email address |

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
