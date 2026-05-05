---
description: Apply when writing or editing any TSX component or SCSS file. Enforces SCSS-only styling, Tailwind via @apply only, and design token usage.
applyTo: "**/*.tsx,**/*.scss"
---

# Styling Instructions

## The Rule

All styles live in SCSS. Tailwind utilities are allowed only inside `@apply` in `.scss` files. No Tailwind classes in JSX `className` props.

---

## SBP SCSS Architecture — Page-Level Modules

**This project does NOT use colocated component SCSS modules.** All styles are organized at the page level — not next to component files.

```
styles/
  imports.scss                ← barrel: base + utils
  base/
    _variables.scss           ← SCSS color maps, fonts, radius
    _typography.scss          ← global .heading, .para, .portableText
    _cta.scss                 ← global .btn, .btn-primary, .btn-secondary, .btn-dark
    _form.scss                ← global form utility classes
    _modal.scss               ← global modal utility classes
  utils/
    _mixins.scss              ← @mixin responsive(), flex-center, flex-between, etc.
  pages/                      ← page-level SCSS modules (one per page group)
    HomeNew.module.scss       ← all styles for components/HomeNew/*
    About.module.scss         ← all styles for components/AboutUs/*
    Miners.module.scss        ← all styles for components/Miner/*
    SBC.module.scss           ← all styles for components/SBC/*
    ...
  components/                 ← shared layout component modules only
    Header.module.scss
    Footer.module.scss
    Modal.module.scss
```

### Where to put new styles

| Component location | SCSS location |
|---|---|
| `components/HomeNew/HomeHero.tsx` | `styles/pages/HomeNew.module.scss` |
| `components/AboutUs/AboutHero.tsx` | `styles/pages/About.module.scss` |
| `components/HeaderFooter/Header.tsx` | `styles/components/Header.module.scss` |
| `components/Misc/SomeSharedWidget.tsx` | `styles/components/` (new file) |

**Rule:** Never create a `Component.module.scss` file next to a component. All styles go into the page-level module for that section.

---

## Imports — Every Module Must Start Here

Every page-level SCSS module imports the barrel file to access variables, mixins, and global utilities:

```scss
// styles/pages/HomeNew.module.scss
@import '../imports';

// Now available:
// - $color-dark, $color-primary, $color-light, $gradient-primary
// - color() function
// - @mixin responsive(), flex-center, flex-between, flex-column, etc.
```

---

## Color Variable Usage

Colors are SCSS maps — use the `color()` function, never hardcode:

```scss
// ✅ Correct
.hero {
  background: color($color-dark, 500);   // → #121426
  color: color($color-primary);           // → #fafafa
  border-color: color($color-dark, 300);  // → #1e203f
}

// ❌ Wrong — hardcoded hex
.hero {
  background: #121426;
  color: #fafafa;
}
```

Available maps and weights:

| Map | Weights | Default |
|---|---|---|
| `$color-dark` | 50, 75, 100, 200, 300, 400, 500, 600 | `#1e203f` |
| `$color-primary` | — | `#fafafa` |
| `$color-light` | — | `#fafafa` |
| `$color-white` | — | `#ffffff` |
| `$color-green` | 400, 500, 600 | `#34ea7e` |
| `$color-red` | 300, 400 | `#f83939` |
| `$gradient-primary` | (not a map — use directly) | `linear-gradient(40deg, #339dff, #0ec1d3)` |

---

## Mixin Usage

```scss
// Flex
.section {
  @include flex-column;
  @include responsive(md) {
    @include flex-row;
  }
}

// Responsive breakpoints: sm (480px) | md (768px) | lg (976px) | xl (1440px)
```

---

## Tailwind via @apply

Tailwind utilities are allowed **only** inside `@apply` in `.scss` files:

```scss
// ✅ Correct
.hero {
  @apply relative overflow-hidden;
  background: color($color-dark, 500);
}

// ❌ Wrong — Tailwind in JSX
<section className="relative overflow-hidden bg-[#121426]">
```

---

## Dual Class Pattern in JSX

Components combine module-scoped selectors with global utility classes:

```tsx
// ✅ Correct — module class + global utility class
<section className={`${styles.hero} hero`}>
  <div className={`${styles.container} container`}>
    <h1 className="heading heading-1">Title</h1>
    <p className="para">Body text</p>
    <a className="btn btn-primary">CTA</a>
  </div>
</section>

// ❌ Wrong — inline Tailwind
<section className="flex flex-col pt-16 bg-[#121426]">
```

Global utility classes (defined in `styles/base/`):
- **Buttons:** `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-dark`, `.btn-sm`, `.btn-rounded`
- **Typography:** `.heading`, `.heading-1` through `.heading-6`, `.heading-gradient`, `.para`, `.para-small`, `.portableText`
- **Layout:** `.container`

---

## Skin Migration — New Design Token Usage

When migrating a page to the new institutional design language, the new tokens are CSS custom properties defined in `:root` (to be added to `styles/global.scss`):

```scss
// ✅ New skin — CSS custom properties
.hero {
  background: var(--color-bg-white);          // #ffffff
  color: var(--color-text-primary);           // #1b1b1b
  border-bottom: 1px solid var(--color-border-default); // #e5e5e5
}
```

**Migration rule:** Do not mix `color($color-dark)` variables with `var(--color-brand)` tokens on the same page module. A page module is either fully migrated or still on the old system.

---

## Forbidden Patterns

- Tailwind classes in JSX `className`
- Hardcoded hex colors in SCSS
- Hardcoded pixel values that have a token equivalent
- `style={{}}` props for values that have design tokens
- Colocated `Component.module.scss` files next to component files
- New SCSS files in `components/` directory (unless it is a genuinely shared layout component)