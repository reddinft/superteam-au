# Superteam Australia — Design System
**Theme:** Southern Cross Terminal
**Last updated:** 2026-04-04

> This document contains all raw design tokens, typography, components, and layout specs extracted directly from the codebase. Screenshots were captured at 1440px desktop width from the live dev build. Use this to reconstruct the design in Figma or any other tool.

---

## 0. Full Page Preview

### Desktop (1440px)
![Full page desktop](public/design-system-screenshots/00-full-page.png)

### Mobile (390px)
![Full page mobile](public/design-system-screenshots/mobile-full-page.png)

---

## 1. Design Direction

**Concept:** "Southern Cross Terminal" — a dark-mode, app-like interface that speaks the language of the Solana ecosystem. Inspired by developer tooling, deep space, and the Southern Cross constellation as Australia's identity anchor.

**Mood:** Precise. Technical. Ambitious. Distinctly Australian.

---

## 2. Colour Palette

### Brand Colours

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-purple` | `#5522E0` | Primary brand, CTAs, borders, focus states |
| `--color-brand-purple-tint` | `#BCB3FF` | Text accents, category labels |
| `--color-brand-yellow` | `#F4A60B` | Active nav, highlights, accent CTAs |
| `--color-brand-yellow-tint` | `#FFD9A1` | Soft yellow backgrounds |
| `--color-au-ochre` | `#C1692A` | Writers guild, AU identity accent |
| `--color-au-ochre-tint` | `#E8A876` | Ochre text accents |
| `--color-solana-green` | `#14F195` | DePIN category, Ops guild |
| `--color-solana-purple` | `#9945FF` | Solana ecosystem references |
| `--color-accent-cyan` | `#00C2FF` | Infrastructure category |

### Guild Accent Colours

| Guild | Hex |
|---|---|
| Dev | `#5522E0` (brand purple) |
| Design | `#F4A60B` (brand yellow) |
| Writers | `#C1692A` (AU ochre) |
| Ops | `#14F195` (Solana green) |

### Category Accent Colours

| Category | Label Colour | Background |
|---|---|---|
| DeFi | `#BCB3FF` | `rgba(85,34,224,0.15)` |
| DePIN | `#14F195` | `rgba(20,241,149,0.12)` |
| Gaming | `#F4A60B` | `rgba(244,166,11,0.15)` |
| NFT | `#E8A876` | `rgba(193,105,42,0.15)` |
| Infrastructure | `#00C2FF` | `rgba(0,194,255,0.12)` |
| DAO | `#A0A0C0` | `rgba(96,96,160,0.15)` |
| Other | `#A0A0C0` | `rgba(96,96,160,0.15)` |

### Surface / Background

| Token | Hex | Usage |
|---|---|---|
| `--surface-0` / `--bg-base` | `#0D0D1A` | Page background |
| `--surface-1` / `--bg-elevated` | `#111122` | Cards, nav background |
| `--surface-2` / `--bg-overlay` | `#171728` | Modals, elevated cards |
| `--surface-3` / `--bg-subtle` | `#1E1E35` | Toasts, hover states |

### Text

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#F0F0FF` | Headings, primary content |
| `--text-secondary` | `#C8C8E8` | Body text, descriptions |
| `--text-tertiary` | `#8080B0` | Captions, metadata, muted labels |
| `--text-accent-purple` | `#BCB3FF` | Purple text accents |
| `--text-accent-yellow` | `#F4A60B` | Yellow text accents |
| `--text-accent-ochre` | `#E8A876` | Ochre text accents |

### Borders

| Token | Hex | Usage |
|---|---|---|
| `--border-subtle` | `#1E1E38` | Section dividers |
| `--border-default` | `#2A2A4A` | Card borders, default strokes |
| `--border-strong` | `#5522E0` | Focus rings, active borders |
| `--border-accent` | `#F4A60B` | Highlighted borders |

---

## 3. Typography

### Typefaces

| Role | Font | Fallback |
|---|---|---|
| **Display / Body / UI** | JetBrains Mono | Courier New → monospace |
| **Emoji** | System emoji stack | Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji |

> The entire site uses JetBrains Mono — a developer-focused monospace font that reinforces the "terminal" aesthetic. Larger sizes are used to compensate for monospace's tighter readability.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap
```

### Type Scale

| Step | Token | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| Display | `type-display` | 72px (clamp: 40px → 72px) | 800 | 1.05 | −0.02em | Hero headline |
| H1 | `type-h1` | 56px (clamp: 36px → 56px) | 800 | 1.1 | −0.02em | Page titles |
| H2 | `type-h2` | 40px (clamp: 28px → 40px) | 700 | 1.15 | −0.01em | Section headings |
| H3 | `type-h3` | 28px (clamp: 22px → 28px) | 600 | 1.2 | — | Card titles |
| H4 | `type-h4` | 20px | 600 | 1.3 | — | Subsection headings |
| Body LG | `type-body-lg` | 18px | 400 | 1.6 | — | Lead paragraphs |
| Body | `type-body` | 16px | 400 | 1.6 | — | Default body |
| Body SM | `type-body-sm` | 14px | 400 | 1.5 | — | Card descriptions |
| Label | `type-label` | 12px | 600 | 1.4 | 0.06em | Eyebrows, badges, tags |

### Heading Gradient (Hero H1)

```css
background: linear-gradient(to right, #a78bfa, #c4b5fd, #5eead4);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

> ⚠️ Images/icons placed inside an element with this gradient become invisible. Always render them as siblings, not children.

---

## 4. Spacing

8px base grid.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Micro gaps |
| `--space-2` | 8px | Icon padding, tight gaps |
| `--space-3` | 12px | Small component padding |
| `--space-4` | 16px | Default element gap |
| `--space-5` | 24px | Card internal padding (tight) |
| `--space-6` | 32px | Card internal padding (standard) |
| `--space-7` | 40px | Between sections (mobile) |
| `--space-8` | 48px | Standard card padding |
| `--space-9` | 64px | Between sections (desktop) |
| `--space-10` | 80px | Section vertical padding (tablet) |
| `--space-11` | 96px | Section vertical padding (desktop) |
| `--space-12` | 128px | Hero padding |

---

## 5. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Small badges, inputs |
| `--radius-md` | 8px | Cards, buttons |
| `--radius-lg` | 12px | Larger cards |
| `--radius-xl` | 16px | Featured cards, modals |
| `--radius-2xl` | 24px | Section containers |
| `--radius-full` | 9999px | Pills, tags, avatars |

---

## 6. Shadows & Glows

| Token | Value | Usage |
|---|---|---|
| `--shadow-1` | `0 1px 3px rgba(0,0,0,0.4)` | Subtle lift |
| `--shadow-2` | `0 4px 16px rgba(0,0,0,0.5)` | Card elevation |
| `--shadow-3` | `0 8px 32px rgba(0,0,0,0.6)` | Modal elevation |
| `--shadow-glow-purple` | `0 0 20px rgba(85,34,224,0.5), 0 0 40px rgba(85,34,224,0.2)` | Purple glow accents |
| `--shadow-glow-yellow` | `0 0 20px rgba(244,166,11,0.4), 0 0 40px rgba(244,166,11,0.1)` | Yellow glow accents |
| `--shadow-card-hover` | `0 0 0 1px rgba(85,34,224,0.5), 0 4px 24px rgba(85,34,224,0.15)` | Card hover state |

---

## 7. Animation

### Durations
| Token | Value | Usage |
|---|---|---|
| `--duration-instant` | 80ms | Micro-interactions |
| `--duration-fast` | 150ms | Hover states, colour transitions |
| `--duration-normal` | 250ms | Standard transitions |
| `--duration-slow` | 400ms | Page-level animations |
| `--duration-stagger` | 60ms | Per-item stagger offset |

### Easing
| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` | Exits, dismissals |
| `--ease-in-out` | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | Standard transitions |
| `--ease-sharp` | `cubic-bezier(0.4, 0.0, 0.6, 1.0)` | Snappy UI |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1.0)` | Bouncy entrances |

### Scroll Animations (Framer Motion pattern)
Cards and sections fade up on scroll entry:
```js
initial: { opacity: 0, y: 30 }
whileInView: { opacity: 1, y: 0 }
viewport: { once: true, margin: '-60px' }
transition: { duration: 0.5, delay: index * 0.1 }
```

---

## 8. Layout

### Container
- Max width: **1280px**
- Horizontal padding: `24px` (mobile) → `48px` (tablet) → `80px` (desktop)
- Centred with `margin: auto`

### Breakpoints
| Name | Value |
|---|---|
| sm | 480px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

### Section Padding
- Mobile: `48px` top + bottom
- Desktop (1024px+): `96px` top + bottom

---

## 9. Components

### Button

Three variants × three sizes.

**Sizes:**
| Size | Padding | Font Size |
|---|---|---|
| sm | 8px 20px | 14px |
| md | 12px 32px | 16px |
| lg | 16px 48px | 18px |

**Variants:**
| Variant | Background | Text | Border |
|---|---|---|---|
| primary | `linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)` | `#fff` | none |
| secondary | transparent | `#e2e8f0` | `1px solid rgba(124,58,237,0.6)` |
| ghost | transparent | `--text-secondary` | none |

- Border radius: 6px
- Font weight: 600
- Hover: `brightness(1.15)` on primary; border → `--color-brand-purple` on secondary; text → `--text-primary` on ghost

---

### Nav Bar

![Nav Bar](public/design-system-screenshots/01-navbar.png)

- Position: `fixed`, `top: 0`, full width, `z-index: 50`
- At top: `background: rgba(10,10,18,0.7)`, `backdrop-filter: blur(16px)`
- Scrolled (>60px): `background: rgba(10,10,18,0.96)`, `backdrop-filter: blur(16px)`
- Border bottom: `1px solid --border-subtle` (always visible)
- Logo: `SUPERTEAM` in `--color-brand-yellow` + ` AU` in `--text-primary`, font weight 700, 18px
- Nav links: 15px, weight 600
  - Inactive: `--text-secondary` (`#C8C8E8`)
  - Active: `--color-brand-yellow` (`#F4A60B`) + `2px solid --color-brand-yellow` underline
  - Hover: `--color-brand-yellow`
- CTA button: primary variant, sm size

---

### Hero Section

![Hero Section](public/design-system-screenshots/hero.png)

- Full viewport height (`min-h-screen`)
- Background: `radial-gradient(ellipse at 50% -20%, rgba(85,34,224,0.4) 0%, rgba(13,13,26,0) 60%), #0D0D1A`
- H1 gradient: `linear-gradient(to right, #a78bfa, #c4b5fd, #5eead4)` — clamp 2rem → 3.5rem
- Australian flag SVG displayed as flex sibling to H1 (56×28px, `border-radius: 3px`)
- Stat pills: `background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.1)`

---

### About / Pillars Section

![About Section](public/design-system-screenshots/about.png)

- 3-column grid on desktop, stacked on mobile
- Each pillar card: `border-left: 4px solid {pillar colour}`, `background: --surface-1`
- Card title: 16px, weight 700; bullet text: 14px, `--text-secondary`
- Icon badge: `background: {colour}18`, rounded-lg

---

### Guilds Section

![Guilds Section](public/design-system-screenshots/guilds.png)

- 4-column grid (`grid-cols-4` on lg+)
- Equal height cards via CSS grid `items-stretch` + `height: 100%`
- Left accent border: `4px solid {guild colour}`
- "Join Guild →" pinned to bottom with `margin-top: auto`
- Hover: full border glow in guild colour + subtle background tint
- Click: 🚧 Coming soon toast (top-right, 2.5s)

---

### Projects Section

![Projects Section](public/design-system-screenshots/projects.png)

- Filterable grid with category pills
- Description clamped to 2 lines
- Click any card → full project modal with untruncated info + author socials + live URL

---

### Events Section

![Events Section](public/design-system-screenshots/events.png)

- Cards show date, location, type badge, RSVP/recap links
- Past events show "Recap →" instead of RSVP

---

### Members Directory

![Members Directory](public/design-system-screenshots/members.png)

- Filterable by guild and city
- Avatar with fallback initials
- Ecosystem tag pills

---

### Join / CTA Section

![Join Section](public/design-system-screenshots/join.png)

- Deep purple radial gradient background
- 3-column card grid: Telegram (primary/purple), Twitter/X, Earn
- Unknown URLs → "🚧 Coming Soon" button state

---

### Footer

![Footer](public/design-system-screenshots/footer.png)

- Background: `#0A0A10`
- `border-top: 1px solid --border-subtle`
- Logo + nav links + social icons + copyright

---

## 10. Section Background Treatments

| Section | Background |
|---|---|
| Hero | `radial-gradient(ellipse at 50% -20%, rgba(85,34,224,0.4) 0%, rgba(13,13,26,0) 60%), #0D0D1A` |
| About / Pillars | `--surface-1` with subtle grid overlay |
| Guilds | `--bg-base` |
| Projects | `--surface-1` |
| Join/CTA | `radial-gradient(ellipse at 50% 0%, rgba(85,34,224,0.55) 0%, rgba(10,10,18,0.98) 65%), #0A0A12` |
| Footer | `#0A0A10` with `border-top: 1px solid --border-subtle` |

**Grid overlay pattern (used on several sections):**
```css
background-image:
  linear-gradient(var(--border-subtle) 1px, transparent 1px),
  linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
background-size: 48px 48px;
opacity: 0.1;
```

---

## 11. Z-Index Layers

| Layer | Value | Usage |
|---|---|---|
| base | 0 | Normal flow |
| raised | 10 | Floating elements |
| dropdown | 100 | Dropdowns |
| sticky | 200 | Sticky headers |
| overlay | 300 | Backdrops |
| modal | 400 | Modals |
| toast | 500 | Notifications |
| terminal | 600 | Easter egg terminal |

---

## 12. Easter Egg — Southern Cross Terminal

- Trigger: type `au` anywhere on the page (not inside an input/textarea)
- Opens a full-screen terminal overlay at `z-index: 600`
- Dark background `#050508`, monospace font, green (`#14F195`) prompt
- Commands: `help`, `stats`, `members`, `events`, `ls`, `clear`, `exit`
- Dismiss: `exit`, Escape, or click ×
- Background: `rgba(5,5,8,0.97)` with scanline texture

---

## 13. Australian Flag (Hero)

- Asset: `/images/au-flag.svg` (vector, scales to any resolution)
- Displayed as a sibling element alongside the H1 (never inside it — gradient clip makes children invisible)
- Size: 56×28px
- Style: `border-radius: 3px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.5)`

---

## 14. Figma Setup Checklist

When recreating in Figma:

1. **Colour styles** — add all tokens from Section 2 as local colour styles
2. **Text styles** — add all steps from Section 3 as text styles (JetBrains Mono)
3. **Effect styles** — add shadows and glows from Section 6
4. **Components** — Button (3 variants × 3 sizes), Card (Guild, Project, Member, Event), Nav, Footer, Modal, Toast, Section Header
5. **Pages** — Desktop (1280px), Tablet (768px), Mobile (390px)
6. **Grid** — 12 column, 80px gutters (desktop), 24px (mobile)
7. **Auto layout** — use throughout for spacing consistency
8. **Import screenshots** — use `public/design-system-screenshots/` as reference frames, one per section
