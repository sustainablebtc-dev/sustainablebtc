---
description: Apply when touching any TypeScript or TSX file, or any file inside the sanity/ directory. Enforces the Sanity CMS data flow and correct patterns for GROQ queries, image rendering, and rich text.
applyTo: "**/*.tsx,**/*.ts,sanity/**"
---

# Data Layer Instructions

## Rule

All dynamic content is fetched from **Sanity CMS** via GROQ. Components never hardcode content that belongs in the CMS — they consume it from server component props.

---

## Data Flow

```
Sanity Studio (CMS editors)
  → Sanity CDN (projectId: 6e7plt23, dataset: production)
    → sanity/sanity-utils.ts  (GROQ query functions)
      → Server component (page.tsx or [Section]Page.tsx)
        → Section components (props passed down)
          → PortableText (rich text rendering)
          → urlFor(image) (image URL generation)
```

---

## GROQ Query Functions — `sanity/sanity-utils.ts`

All data fetching lives in `sanity/sanity-utils.ts`. No GROQ queries go inside component files.

```ts
// sanity/sanity-utils.ts
import { createClient, groq } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    || "",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "",
  useCdn: true,
})

export async function getHomePageData() {
  return client.fetch(groq`*[_type == "homePage"][0]{
    hero,
    sections
  }`)
}
```

**Naming convention:** `get[Resource]Data()` — one function per document type or logical page data shape.

---

## Consuming Sanity Data in Server Components

Fetch in a server component, pass as props to section components:

```tsx
// components/HomeNew/HomePage.tsx  (server component)
import { getHomePageData } from '@/sanity/sanity-utils'
import HomeHero from './HomeHero'

export default async function HomePage() {
  const data = await getHomePageData()
  return (
    <>
      <HomeHero heroData={data.hero} />
    </>
  )
}
```

- **Never fetch in section components.** They receive data as props only.
- **Never import `sanity-utils` in client components** (`'use client'` files).

---

## Sanity Images — `sanity/sanity-urlFor.ts`

Resolve Sanity image assets via the URL builder:

```tsx
import { urlFor } from '@/sanity/sanity-urlFor'
import Image from 'next/image'

<Image
  src={urlFor(data.image).url()}
  alt="description"
  width={800}
  height={600}
/>
```

- Always call `.url()` at the end of the `urlFor()` chain.
- Always use `next/image` — never `<img>`.
- Set `priority` on above-the-fold / hero images.

---

## Static Assets — `/public/`

Static images (SVGs, icons, Lottie files) that are not managed in Sanity are imported directly:

```tsx
import logo from '@/public/logo.svg'
import Image from 'next/image'

<Image src={logo} alt="SBP Logo" priority />
```

Organized by route in `public/`: `public/home/`, `public/about/`, `public/miner/`, etc.

---

## Rich Text — PortableText

Rich text fields from Sanity are block arrays. Render with `PortableText`:

```tsx
import { PortableText } from '@portabletext/react'

<div className={`${styles.heroHeading} portableText`}>
  <PortableText value={data.heroHeading} />
</div>
```

- Always wrap in a `div` with the global `.portableText` class.
- The `.portableText` class (in `styles/base/_typography.scss`) handles paragraph gaps, list styles, and inline formatting.
- `<strong>` text in PortableText triggers the gradient text effect via `_typography.scss`.

---

## TypeScript Interfaces for Sanity Responses

New Sanity document shapes get a corresponding TypeScript interface in `types/`:

```ts
// types/miners.ts
export interface MinersPageData {
  hero: {
    heroHeading: any[]  // PortableText block array
    heroDesc: any[]
    heroCTA1: {
      heroBtn1Visible: boolean
      heroBtn1Slug: string
      heroBtn1Text: string
      heroBtn1Type: string
      heroBtn1Icon: string
    }
  }
}
```

---

## What NOT to Do

- Do not hardcode navigation links, footer links, or CTA text in component files.
- Do not write GROQ queries inside page or section components.
- Do not import `sanity-utils` inside client components.
- Do not use `<img>` for Sanity images — always `next/image` + `urlFor`.
- Do not store structured content in `/data` JSON files — Sanity CMS is the source of truth for all dynamic content.

### New JSON file checklist

- [ ] Interface defined in `data/types.ts`
- [ ] File placed in the correct `data/` subdirectory
- [ ] Imported with type assertion at the call site
- [ ] No equivalent hardcoded content remains in a component

### New Markdown file checklist

- [ ] H2 headings for each top-level item (maps to schema entry)
- [ ] Answers are self-contained — no cross-references required to understand them
- [ ] Parsed server-side only — never passed as raw markdown to a client component

## Component Consumption Pattern

```tsx
// ✅ Correct — data from /data, mapped in the component
import navbarData from '@/data/nav/navbar.json'
import type { NavbarData } from '@/data/types'

const { links, login, cta } = navbarData as NavbarData

export default function Navbar() {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ❌ Wrong — hardcoded content inside a component
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  )
}
```

## FAQ Markdown Format

Each question is an H2. Answers are plain paragraphs. This maps directly to JSON-LD FAQ schema with no transformation overhead.

```md
## What is Harvestt?

Harvestt is an institutional market infrastructure platform...

## Who does Harvestt serve?

Harvestt serves institutional partners...
```

## Future Extensions

- **CMS integration**: Replace JSON file imports with a CMS API call behind the same typed interface. Components do not change.
- **Localization**: Add a `locale` field to each JSON structure. Create a `lib/i18n.ts` loader that selects the correct locale at runtime. Data files become `navbar.en.json`, `navbar.fr.json`, etc.
- **Dynamic content**: When data becomes dynamic (database-driven), move the fetch into a server component or server action that returns the same typed shape. Components do not change.

## Violations

The reviewer agent will flag as `high` severity:

- Any navigation link hardcoded inside a component instead of sourced from `data/nav/navbar.json`
- Any footer link or social link hardcoded inside a component
- Any JSON data file without a corresponding interface in `data/types.ts`
- Any markdown file imported or parsed inside a client component