# Sustainable Bitcoin Protocol — Copilot Orchestration System

## Project Context

This is the **Sustainable Bitcoin Protocol (SBP)** marketing and investor platform. It is a regulated, institutional-grade website targeting sovereign wealth funds, asset managers, and regulated capital allocators. The product communicates the SBP Token, Sustainable Bitcoin Certificate (SBC), mining transparency, and clean energy Bitcoin investment thesis.

The current website uses a **dark navy theme** (deep blue-black backgrounds with gradient blue-cyan accents). The active design initiative is a **skin migration** to a new institutional design language: light/white backgrounds, `#1b1b1b` brand, structured typographic hierarchy — keeping the same content architecture and component shapes while updating the visual layer.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, latest) |
| Language | TypeScript — strict mode |
| Styling | SCSS (page-level modules + global utilities) + Tailwind via `@apply` only |
| Design system | `.github/instructions/design-system/` — tokens, components, patterns |
| CMS | Sanity (GROQ queries via `sanity/sanity-utils.ts`, image CDN via `sanity/sanity-urlFor.ts`) |
| Rich text | `@portabletext/react` — PortableText renderer |
| Font (current) | Helvetica Now Display — loaded via `@font-face` in global CSS |
| Font (target) | Geist — the new design system target; migrate during skin update |
| Icons | Bootstrap Icons via `bi bi-*` class pattern |
| Slider | Swiper.js — imported via `swiper/react` |

---

## Agent Pipeline

Every feature or fix flows through this sequence. No step may be skipped silently.

```
planner → frontend → backend → content
```

---

## Orchestrator Enforcement

> These rules govern the main Copilot session acting as coordinator.

1. **The orchestrator never writes product code.** Its only job is to read context, dispatch agents via `runSubagent`, and relay results to the user.
2. **Every Figma link, feature request, or bug fix MUST start by dispatching the `planner` agent.** No exceptions.
3. **Git safety check runs before the planner is dispatched** — not inside it. The orchestrator checks branch and working tree state first and stops if conditions are not met.
4. **No agent step may be skipped.** Even for "small" changes, the sequence is: `planner` → specialist(s). Skipping any step is a pipeline violation.
5. **Figma designs are not self-implementing.** A Figma URL in a request means: dispatch `planner` with the node context, then let `frontend` implement.
6. **The orchestrator may not partially implement then hand off.** Either it delegates entirely or it does nothing.
7. **All inter-agent communication goes through the orchestrator.** Agents never call, invoke, or read from other agents directly. The orchestrator is the sole channel for task handoffs, outputs, and sequencing decisions.

| Agent | Owns | Does Not Own |
|---|---|---|
| [`planner`](agents/planner.agent.md) | task graph, sequencing, acceptance mapping | product code, copy, approvals |
| [`frontend`](agents/frontend.agent.md) | UI, pages, layouts, components, metadata wiring | server logic, API contracts, copy |
| [`backend`](agents/backend.agent.md) | route handlers, server actions, APIs, forms, Sanity queries, validation | UI rendering, copy, approvals |
| [`content`](agents/content.agent.md) | page copy, metadata text, SEO/GEO content, Sanity schema inputs | implementation, design decisions |

---

## Non-Negotiable Rules

1. Start from the issue or brief — not assumptions.
2. Change the smallest correct surface area.
3. Default to server components. Use `use client` only when state, effects, refs, or browser APIs are required.
4. **SCSS only for styling.** Use Tailwind exclusively via `@apply` inside `.scss` files. No inline Tailwind classes in JSX.
5. Use design system tokens exclusively. No arbitrary hex values, hardcoded sizes, or magic numbers in styles.
6. **Sanity CMS is the data source.** All dynamic content (nav, footer, hero, sections, team, news) is fetched from Sanity via GROQ. Never hardcode content that belongs in the CMS.
7. Keep business logic out of presentation layers.
8. Write deterministic outputs. Avoid vague advice.
9. No agent may silently expand scope.
10. If blocked, name the exact missing dependency, decision, or API contract.
11. Every task names its owner, dependencies, deliverables, and validation method.
12. **Responsiveness is non-negotiable.** Every UI surface must be mobile-first and pass the responsiveness checklist in [`skills/responsiveness/SKILL.md`](skills/responsiveness/SKILL.md) before delivery. A desktop-only implementation is an incomplete implementation.
13. **Accessibility is non-negotiable.** Every UI surface must pass the accessibility checklist in [`skills/accessibility/SKILL.md`](skills/accessibility/SKILL.md). Keyboard navigation, semantic HTML, and focus states are required, not optional.

---

## Project Scaffolding

### Directory Structure

```
app/                          ← Next.js App Router routes
  layout.tsx                  ← Root layout — Header + Footer wired here
  page.tsx                    ← Home route → renders HomeNew/HomePage.tsx
  [route]/page.tsx            ← Route-level entry, imports Page component
  api/                        ← Next.js route handlers (API endpoints)

components/                   ← All React components
  HomeNew/                    ← Current homepage components (active)
  Home/                       ← Legacy homepage (keep, do not delete)
  HeaderFooter/               ← Header.tsx + Footer.tsx (server wrappers)
                                 HeaderContent.tsx + FooterContent.tsx (client)
  AboutUs/ ContactUs/ Miner/ SBC/ Investors/ ...  ← Page-section components
  Modals/                     ← Modal components (age restriction, whitepaper, etc.)
  Misc/                       ← Shared one-off components

styles/                       ← ALL styles live here
  global.scss                 ← Global reset + Tailwind base
  imports.scss                ← Barrel import for base + utils
  base/
    _variables.scss           ← SCSS variables (colors, fonts, radius)
    _typography.scss          ← Global typography utility classes
    _cta.scss                 ← Global button utility classes (.btn, .btn-primary, etc.)
    _form.scss                ← Global form utility classes
    _modal.scss               ← Global modal utility classes
    _resets.scss              ← CSS reset
  utils/
    _mixins.scss              ← Reusable SCSS mixins
    _helpers.scss             ← Helper utilities
    _swiper.scss              ← Swiper.js overrides
  pages/                      ← Page-level SCSS modules (one per page/section group)
    Home.module.scss
    HomeNew.module.scss
    About.module.scss
    Contact.module.scss
    Miners.module.scss
    SBC.module.scss
    ...
  components/                 ← Component-level SCSS modules (shared components)
    Header.module.scss
    Footer.module.scss
    Modal.module.scss
    ...

sanity/                       ← Sanity CMS integration
  sanity-utils.ts             ← All GROQ queries (getNavbarData, getHomeData, etc.)
  sanity-urlFor.ts            ← Image URL builder (urlFor)
  schemas/                    ← Sanity schema definitions
  components/                 ← Sanity Studio custom components

public/                       ← Static assets (SVG, PNG, Lottie JSON, fonts)
  home/ about/ miner/ sbc/    ← Route-specific static images
  fonts/                      ← Helvetica Now Display font files

types/                        ← TypeScript interfaces for Sanity response shapes
  footer-type.ts
  navbar.ts
  projects.ts

utils/                        ← Utility functions
  livecoinwatch.ts            ← BTC price API integration
  sbp.ts                      ← SBP Token data integration
```

### Component Architecture Pattern

Components follow a **page-component → section-component** hierarchy:

```
app/[route]/page.tsx
  └── components/[Section]/[Section]Page.tsx    ← orchestrates all sections
        ├── [Section]Hero.tsx
        ├── [Section]Content.tsx
        └── ...
```

Page-level components are server components that fetch Sanity data and pass it as props to section components.

### SCSS Architecture Pattern

**This project does NOT use colocated component SCSS modules.** Styles are organized at the page level:

```
styles/pages/HomeNew.module.scss   ← Contains ALL styles for HomeNew/* components
styles/pages/About.module.scss     ← Contains ALL styles for AboutUs/* components
styles/components/Header.module.scss  ← Exception: shared layout components
```

A component imports its **page-level** module:
```tsx
// components/HomeNew/HomeHero.tsx
import styles from '@/styles/pages/HomeNew.module.scss'
```

Components use a **dual class pattern** — module-scoped selectors mixed with global utility classes:
```tsx
<section className={`${styles.hero} hero`}>
  <div className={`${styles.container} container`}>
    <h1 className="heading heading-1">Title</h1>
    <p className="para">Body text</p>
    <a className="btn btn-primary">CTA</a>
  </div>
</section>
```

Global utility classes (`.heading`, `.para`, `.btn`, `.container`) are defined in `styles/base/` and `styles/global.scss`. Module-scoped classes (`styles.hero`, `styles.container`) are defined in the page module.

---

## Data Flow — Sanity CMS

Content is fetched from **Sanity CMS** using GROQ. The data flow is:

```
Sanity Studio (CMS editors)
  → Sanity CDN (projectId: 6e7plt23, dataset: production)
    → sanity/sanity-utils.ts (GROQ fetch functions)
      → Server component (page.tsx or PageComponent.tsx)
        → Section components (props passed down)
          → PortableText (rich text rendering)
          → urlFor(image) (image URL generation)
```

### Fetching Content

All GROQ queries live in `sanity/sanity-utils.ts`. Each function uses `createClient().fetch(groq`...`)`:

```ts
// sanity/sanity-utils.ts
export async function getHomePageData() {
  return client.fetch(groq`*[_type=="homePage"][0]{
    hero,
    sections,
    // ...
  }`)
}
```

Consume in a server component:
```tsx
// components/HomeNew/HomePage.tsx  (server component, no 'use client')
import { getHomePageData } from '@/sanity/sanity-utils'

export default async function HomePage() {
  const data = await getHomePageData()
  return <HomeHero heroData={data.hero} />
}
```

### Sanity Images

Images from Sanity are rendered via `urlFor()` from `sanity/sanity-urlFor.ts`:

```tsx
import { urlFor } from '@/sanity/sanity-urlFor'
import Image from 'next/image'

// Inside a component:
<Image
  src={urlFor(sanityImageField).url()}
  alt="description"
  width={800}
  height={600}
/>
```

Static local images (SVGs, icons) are imported directly:
```tsx
import logo from '@/public/logo.svg'
import Image from 'next/image'
<Image src={logo} alt="SBP Logo" priority />
```

### Rich Text — PortableText

All CMS rich text is rendered with `PortableText` from `@portabletext/react`:

```tsx
import { PortableText } from '@portabletext/react'

<div className={`${styles.heroHeading} portableText`}>
  <PortableText value={data.heroHeading} />
</div>
```

The global `.portableText` class in `styles/base/_typography.scss` handles all rich text formatting.

---

## Skin Migration — Design Direction

The current site uses a **dark navy theme**:
- Backgrounds: `#121426`, `#1e203f`, `#0b0d18`
- Text: `#fafafa` (light on dark)
- Accent: gradient `linear-gradient(40deg, #339dff, #0ec1d3)`
- Buttons: gradient border, rounded-full
- Font: Helvetica Now Display

The **target design language** (defined in `.github/instructions/design-system/`) is:
- Backgrounds: `#ffffff`, `#f5f5f5` (light)
- Text: `#1b1b1b` (dark on light)
- Accent: `#339dff` — structural only (dividers, borders)
- Buttons: `#1b1b1b` fill, square corners (`border-radius: 0`), uppercase, `13px`, `letter-spacing: 0.75px`
- Font: Geist (replace Helvetica Now Display progressively)

**Migration rule:** When updating a page's skin, update `styles/base/_variables.scss` tokens AND the relevant page module. Do not mix old and new design language on the same page surface. Update one page/section at a time.

---

## Design Token System (Active)

The site has migrated from legacy SCSS color maps to CSS custom properties. **CSS custom properties are the source of truth for all new and migrated code.**

### Background Hierarchy

Three tiers create visual separation between layers without contrast:

| Tier | Token | Value | Applied to |
|---|---|---|---|
| 1 — Page | `--color-bg-white` | `#ffffff` | `body`, default page background |
| 2 — Navbar | `--color-bg-muted` | `#f5f5f5` | Navbar, mobile nav panel |
| 3 — Accent strips | `--color-bg-subtle` | `#f8f8f8` | Countdown, announcement banners |

### Full `:root` Token Block

Defined in `styles/global.scss`:

```scss
:root {
  /* Brand */
  --color-brand:            #1b1b1b;
  --color-accent:           #339dff;

  /* Semantic */
  --color-success:          #289e4b;
  --color-success-bg:       rgba(40, 158, 75, 0.10);

  /* Text */
  --color-text-primary:     #1b1b1b;
  --color-text-dark:        #000000;
  --color-text-body:        #3a3a3a;
  --color-text-secondary:   #555555;
  --color-text-muted:       #a3a3a3;

  /* Backgrounds */
  --color-bg-white:         #ffffff;  /* page */
  --color-bg-muted:         #f5f5f5;  /* navbar */
  --color-bg-subtle:        #f8f8f8;  /* accent strips */
  --color-bg-warm:          #fff6f0;
  --color-bg-dark:          #1b1b1b;

  /* Borders */
  --color-border-default:   #e5e5e5;
  --color-border-brand:     #1b1b1b;
  --color-border-accent:    #339dff;
  --color-border-separator: #a3a3a3;
}
```

### Legacy SCSS Variables (Unmigrated sections only)

The legacy `color()` function and SCSS maps still exist in `styles/base/_variables.scss` and are used in unmigrated page sections. Do **not** use them in new or migrated code.

```scss
// Legacy — do not use for new code
$color-dark:    (500: #121426, default: #1e203f, ...)
$color-primary: (default: #fafafa)
$color-green:   (default: #34ea7e)
$gradient-primary: linear-gradient(40deg, #339dff 0%, #0ec1d3 100%)
```

**Migration rule:** When touching a section, replace all `color($color-*)` calls and `$gradient-primary` with the CSS custom property equivalents. Never mix both systems on the same page surface.

---

## SCSS Mixins Reference

Defined in `styles/utils/_mixins.scss`:

```scss
// Flex helpers
@mixin flex-center      // display:flex; justify-content:center; align-items:center
@mixin flex-between     // display:flex; justify-content:space-between; align-items:center
@mixin flex-column      // display:flex; flex-direction:column
@mixin flex-row         // display:flex; flex-direction:row

// Grid
@mixin grid-center      // display:grid; place-content:center

// Responsive (mobile-first breakpoints)
$breakpoints: (sm: 480px, md: 768px, lg: 976px, xl: 1440px)
@mixin responsive($device) { @media (min-width: ...) { @content } }

// Example usage
.hero {
  @include flex-column;
  @include responsive(md) {
    @include flex-row;
  }
}
```

---

## Global Utility Classes Reference

These are globally available — import `styles/imports.scss` to access in any module:

**Buttons** (`styles/base/_cta.scss`):
- `.btn` — base button: square corners (`border-radius: 0`), `13px`, `font-weight: 500`, uppercase, `letter-spacing: 0.75px`, `padding: 10px 24px`
- `.btn-primary` — `var(--color-bg-dark)` fill (#1b1b1b), white text, dark border; `opacity: 0.8` on hover
- `.btn-secondary` — transparent bg, `var(--color-border-brand)` border, dark text; fills to dark on hover
- `.btn-dark` — same as primary (alias)
- `.btn-sm` — compact height (`2.5rem`), smaller padding and font
- `.btn-rounded` — square aspect-ratio icon button, `border-radius: 0`

**Typography** (`styles/base/_typography.scss`):
- `.heading .heading-1` through `.heading-6` — heading scale (font-black, leading-[110%])
- `.heading-gradient` — applies gradient to heading text
- `.para` — body paragraph (leading-[150%], ~1.1rem)
- `.para-small` — small body text
- `.portableText` — wrapper for PortableText rendered content

**Layout** (global):
- `.container` — page-width container with horizontal padding

---

## Styling Rules (Hard Enforcement)

```scss
// ✅ Correct — Tailwind via @apply inside SCSS
.hero {
  @apply relative overflow-hidden;
  padding: color($color-dark, 500);
}

// ✅ Correct — module class + global class combined in JSX
<section className={`${styles.hero} hero`}>

// ❌ Wrong — inline Tailwind in JSX
<div className="flex flex-col items-center p-24">

// ❌ Wrong — hardcoded hex in SCSS
.hero { background: #121426; }

// ✅ Correct
.hero { background: color($color-dark, 500); }
```

- All styles live in `styles/`. No colocated `Component.module.scss` files.
- Page-scoped modules go in `styles/pages/`. Shared component modules in `styles/components/`.
- Always `@import '../imports'` or `@import 'variables'` at the top of a module file to access mixins and variables.
- Tailwind utility classes are allowed **only** inside `@apply` rules.
- See [`rules/styling.md`](rules/styling.md) for the full rule set.

---

## Design System (Hard Enforcement)

- Design tokens live in [`instructions/design-system/tokens/`](instructions/design-system/tokens/).
- Component patterns are documented in [`instructions/design-system/components/`](instructions/design-system/components/).
- All new UI in the skin migration must use the new design system tokens — not the legacy SCSS variables.
- Do not mix legacy variables (`$color-dark`) with new tokens (`--color-brand`) on the same page surface.
- See [`rules/design-system.md`](rules/design-system.md) for enforcement rules.

---

## Delegation Protocol

1. [`planner`](agents/planner.agent.md) reads the brief and produces a bounded task graph.
2. [`frontend`](agents/frontend.agent.md) implements UI tasks once planner output exists.
3. [`backend`](agents/backend.agent.md) implements Sanity queries, server actions, API routes, and form logic — can run in parallel with `frontend` after planning.
4. [`content`](agents/content.agent.md) supplies production copy after information architecture is clear.

No specialist agent may re-plan the issue unless the issue is malformed or dependencies are impossible.

---

## Handoff Format

Every task handoff must include:

- **Context**: brief summary and constraints
- **Scope**: what is in and out
- **Inputs**: files, routes, APIs, designs, content sources
- **Deliverables**: exact files or outputs expected
- **Validation**: checks to run
- **Risks**: open assumptions or missing dependencies

---

## Output Contracts

### Planner

```md
## Plan Summary
- Objective:
- User impact:
- Non-goals:
- Risks:

## Task List
| Task ID | Summary | Agent | Depends On | Deliverables | Validation |
| --- | --- | --- | --- | --- | --- |

## Execution Order
1. ...

## Open Questions
- ...
```

### Specialist (frontend / backend / content)

```md
## Delivery
- Scope completed:
- Files changed or created:
- Constraints respected:

## Validation
- Checks run:
- Remaining risks:
```

---

## File and Naming Conventions

- Route segments: `lowercase-kebab-case`
- React components: `PascalCase.tsx`
- Page SCSS modules: `styles/pages/PageName.module.scss`
- Component SCSS modules: `styles/components/ComponentName.module.scss`
- Sanity query functions: `get[Resource]Data()` in `sanity/sanity-utils.ts`
- Utility modules: `lowercase-kebab-case.ts`
- Server-only modules stay off the client bundle
- Metadata is route-local — no global duplication

---

## GitHub Workflow

### Branch Strategy

| Branch | Role |
|---|---|
| `main` | Production — protected |
| `harvestt` | Staging — integration target |
| `feature/<slug>` | All work — branched from `harvestt` |

**Never work directly on `main` or `harvestt`.** All development happens on a `feature/` branch created from an up-to-date `harvestt`.

### Branch Naming

- `feat/<issue-number>-<slug>`
- `fix/<issue-number>-<slug>`
- `chore/<issue-number>-<slug>`

Slug: lowercase kebab-case, under 40 characters, describes user-visible outcome.

### Pre-Development Safety Check

Before starting any work, confirm:

1. Current branch is a `feature/` branch — not `main` or `harvestt`
2. Working tree is clean (`git status`)

If uncommitted changes exist — **stop and ask the user**: commit, stash, or discard. Do not proceed without confirmation.

### Commit Prefixes

`feat:` `fix:` `refactor:` `docs:` `chore:`

### Git Action Restrictions

**Never auto-commit. Never auto-push. Never auto-merge.**

Every git action requires explicit user request and confirmation — including within the same session. No implicit permission carries forward.

### PR Requirements

- Issue link
- Scope summary
- Affected routes or APIs
- Screenshots when UI changed
- Risk notes
- **Target branch: `harvestt`** — never open a PR directly to `main`

See [`rules/repo-hygiene.md`](rules/repo-hygiene.md) for the full Git workflow including branch preparation flow and failure handling.

---

## Definition of Done

All must be true:

1. Acceptance criteria map to implemented outputs.
2. Files are in the correct route, component, or server boundary.
3. Styling uses SCSS + design system tokens — no inline Tailwind, no arbitrary values.
4. Accessibility, performance, and SEO constraints are addressed.
5. No placeholder copy, empty TODOs, or stub integrations remain unlabeled.
6. All changed pages are responsive and tested at mobile, tablet, and desktop breakpoints.

---

## Escalation

Escalate instead of guessing when:

- Sanity schema field is missing or the query returns unexpected shape
- API contract is missing
- Issue requirements conflict
- Credentials or secrets are required
- Design token is missing or ambiguous
- Schema or migration impact exists beyond issue scope