# Energy Web × Sustainable Bitcoin Protocol

**The Global Standard for Clean Bitcoin**

A Next.js 14 landing page showcasing the merger of Energy Web Foundation and Sustainable Bitcoin Protocol, creating an institutional-grade standard for verified clean Bitcoin mining.

## 🎨 Design Philosophy

**"Institutional Electric"** - Trusted enough for BlackRock, innovative enough for Web3.

### Color System
- **Primary Purple (EWF)**: `#5D2E8C`
- **Secondary Cyan (SBP)**: `#00C2FF`
- **Accent Green (SBP)**: `#2EFF92`
- **Deep Navy (Dark Sections)**: `#0F172A`
- **Background**: Clean white (`#FFFFFF`)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
sbp-energy-web/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles & animations
├── tailwind.config.ts      # Custom Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

## 🎯 Key Sections

### 1. Hero Section
- Gradient mesh animation blending purple and cyan
- Bold typography with "Clean Bitcoin" gradient text
- Dual CTAs for Institutions and Miners
- Trust indicators for major partners

### 2. Green Flywheel
- 3-step circular process diagram
- Animated icons for each step
- Visual flow connectors showing the cycle

### 3. Live Metrics Strip
- Dark mode section with neon green glow effects
- Real-time indicators with pulse animations
- Three key metrics displayed prominently

### 4. Strategic Partners
- Grayscale-to-color hover effects
- Grid layout for major financial institutions
- "Become a Partner" CTA

### 5. Footer
- Corporate style with multiple link sections
- Brand information and resources
- Legal links and copyright

## ✨ Custom Features

### Animations
- Scroll-triggered fade-in animations
- Gradient mesh background movement
- Neon glow pulse effects
- Smooth hover transitions
- Staggered content reveals

### Typography Hierarchy
- H1: 6xl-8xl (72-96px) - Hero headlines
- H2: 5xl-6xl (48-60px) - Section titles
- H3: 2xl (24px) - Subsection titles
- Body: xl-2xl (20-24px) - High contrast, legible

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Flexible grid layouts
- Touch-friendly button sizes

## 🎨 Design Tokens

### Spacing
- Container max-width: 1280px
- Section padding: 96px vertical
- Component gaps: 8px, 12px, 16px, 24px

### Border Radius
- Buttons/Cards: 8px (rounded-lg)
- Pills/Badges: 9999px (rounded-full)
- Icons: 16px (rounded-2xl)

### Shadows
- Hover cards: `shadow-lg`
- Elevated elements: `shadow-xl`
- Neon glow: Custom text-shadow

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to modify the color system:

```typescript
colors: {
  'ewf-purple': '#5D2E8C',
  'sbp-cyan': '#00C2FF',
  'sbp-green': '#2EFF92',
  'deep-navy': '#0F172A',
}
```

### Animations
Modify `app/globals.css` to adjust animation speeds and effects:

```css
@keyframes gradient-shift {
  0%, 100% { backgroundPosition: '0% 50%' }
  50% { backgroundPosition: '100% 50%' }
}
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+

## 🤝 Contributing

This is a custom landing page project. For improvements or bug fixes, please ensure:

1. Maintain the "Institutional Electric" design language
2. Test animations across browsers
3. Verify mobile responsiveness
4. Keep accessibility in mind (WCAG 2.1 AA)

## 📄 License

All rights reserved © 2025 Energy Web × Sustainable Bitcoin Protocol

---

**Built with precision for institutional trust.**

