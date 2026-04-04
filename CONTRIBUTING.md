# Contributing to Superteam Australia

Want to add yourself, your project, or fix something that's wrong? Great — this is a community site and we welcome contributions.

## How it works

All content lives as plain JSON files in the `content/` directory. You don't need to touch any code to update a member profile or add a project — just edit the JSON and open a PR.

---

## Adding or updating your member profile

1. **Fork** this repo and create a branch: `git checkout -b add/your-name`
2. Find your file in `content/members/` — or create a new one if you're not listed yet
3. File name should be your slug, e.g. `content/members/your-name.json`
4. Use this format:

```json
{
  "name": "Your Name",
  "role": "What you do / your tagline",
  "organization": "Your company or project",
  "guild": "dev",
  "city": "sydney",
  "bio": "One or two sentences about you.",
  "telegramUsername": "yourtelegram",
  "twitterUrl": "https://twitter.com/yourhandle",
  "githubUrl": "https://github.com/yourhandle",
  "linkedinUrl": "https://linkedin.com/in/yourprofile",
  "websiteUrl": "https://yoursite.com",
  "ecosystemTags": ["Solana", "DeFi"],
  "featured": false
}
```

**Fields:**
| Field | Required | Values |
|---|---|---|
| `name` | ✅ | Your full name or handle |
| `role` | ✅ | Your title or one-liner |
| `organization` | No | Company or project name |
| `guild` | ✅ | `dev` · `design` · `writers` · `ops` |
| `city` | ✅ | `sydney` · `melbourne` · `brisbane` · `perth` · `adelaide` · `remote` · `other` |
| `bio` | No | Short bio (1–2 sentences) |
| `telegramUsername` | No | Without the `@` |
| `twitterUrl` | No | Full URL |
| `githubUrl` | No | Full URL |
| `linkedinUrl` | No | Full URL |
| `websiteUrl` | No | Full URL |
| `ecosystemTags` | No | Array of tags e.g. `["Solana", "DeFi"]` |
| `featured` | No | `true` or `false` (default: `false`) |

5. **Open a PR** with title: `member: Add [Your Name]` or `member: Update [Your Name]`

---

## Adding or updating a project

1. Fork and branch: `git checkout -b add/project-name`
2. Create or edit a file in `content/projects/`, e.g. `content/projects/your-project.json`
3. Use this format:

```json
{
  "title": "Your Project",
  "description": "One or two sentences about what it does.",
  "category": "defi",
  "status": "active",
  "region": ["AU"],
  "url": "https://yourproject.xyz",
  "xUrl": "https://x.com/yourproject",
  "githubUrl": "https://github.com/yourproject",
  "telegramUrl": "yourproject",
  "authorSlugs": ["your-name-slug"],
  "featured": false
}
```

**Category options:** `defi` · `depin` · `gaming` · `nft` · `infra` · `security` · `community` · `dao` · `hackathon` · `other`

**Status options:** `active` · `in_development` · `demo_day_winner` · `hackathon` · `honourable_mention` · `historical` · `archived`

**`authorSlugs`** — list the slugs of your member profile(s). The slug is the filename without `.json`, e.g. `nissan-dookeran`. If you're not in the members list yet, add yourself first or leave `authorSlugs` as `[]`.

4. **Open a PR** with title: `project: Add [Project Name]` or `project: Update [Project Name]`

---

## Fixing incorrect data

If something about your profile or project is wrong, open a PR with title: `fix: [what you're correcting]` and a brief note in the PR description explaining what was wrong.

---

## What gets merged

- **Member additions/updates from real AU Solana ecosystem members** — merged within a few days
- **Project additions for AU/NZ Solana projects** — merged within a few days
- **Corrections to existing data** — merged quickly
- **Spam or unrelated content** — closed

---

## Questions?

Find us on [Discord](https://discord.gg/superteamau) or [@SuperteamAU](https://twitter.com/SuperteamAU) on X.
