# SBP Acquisition Proposal | Energy Web Foundation

**Confidential Board Materials**

A sophisticated M&A deal proposal microsite for the strategic acquisition of Sustainable Bitcoin Protocol (SBP) by Energy Web Foundation (EWF).

## 🎯 Purpose

This is NOT a public-facing website. This is a **Deal Room** presentation for:
- EWF Board Members
- Key Stakeholders
- Strategic Advisors

To review the strategic rationale, financial terms, and due diligence for acquiring SBP.

## 🎨 Design Philosophy

**"Investment Bank meets Web3"**

- High trust, data-heavy presentation
- Glassmorphism for premium feel
- Dark mode for data sections
- Light mode for executive summaries
- Professional transitions (not flashy)

### Color System
- **EWF Purple (Trust)**: `#5D2E8C`
- **SBP Cyan (Energy)**: `#00C2FF`
- **SBP Green (Growth)**: `#2EFF92`
- **Deal Gold (Milestones)**: `#FFD700` (Used sparingly)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom glassmorphism
- **Charts**: Recharts (for growth data visualization)
- **Animations**: Framer Motion (smooth, professional)
- **Icons**: Lucide React
- **Font**: Inter (Professional, legible)

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

The deal room will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
sbp-ewf-acquisition/
├── app/
│   ├── layout.tsx          # Root layout (private, noindex)
│   ├── page.tsx            # Main deal proposal page
│   └── globals.css         # Glassmorphism & deal styles
├── tailwind.config.ts      # Custom colors & animations
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

## 📋 Page Sections

### 1. **Hero Section (The Proposal)**
- Deal status badge: "Term Sheet Review / December 2025"
- Visual representation: SBP → Energy Web
- Network connection background
- Professional, high-trust headline

### 2. **Executive Summary (The Why)**
- 3-column grid with glassmorphism cards:
  - **Strategic Fit**: Commercial lead + NGO governance
  - **The Goal**: Launch institutional products
  - **The Outcome**: Sustained EWT buybacks

### 3. **SBP Traction (The Proof)**
- **Recharts Line Chart**: Global hashrate growth (2% → 25%)
- **Trust Indicators**:
  - Regulatory characterization (SEC/CFTC alumni)
  - **Coinbase Project Diamond** (Featured - one of first 6 in ADGM RegLab)

### 4. **Green Flywheel (The Engine)**
- Visual loop diagram with 4 steps:
  1. Institutional Trust/ETF Launch
  2. Fees Flow to SBP
  3. Revenue → EWT Buybacks (pulse animation)
  4. Fund Renewable Mining
- Self-reinforcing growth model

### 5. **Deal Structure & Team (The Terms)**
- **Financial Terms Card**:
  - Currency: 100% Stock (EWT)
  - Monthly burn: ~$50k/mo
  - Coverage: EWF Operating Budget
- **Org Chart**: SBP co-founders → Ed Hesse
- Tagline: "Autonomy with Strategic Alignment"

### 6. **Milestones & Earn-Out (The Roadmap)**
- Timeline with 5 clear valuation gates:
  - Launch Clean BTC Trust (US) ✓ In Progress
  - Launch Clean Wrapped BTC (Base/Canton)
  - Launch ETF (US) or ETP (EU)
  - Hit 35% Network Hashrate
  - Generate $2.5M Revenue
- Each milestone increases valuation floor

### 7. **Due Diligence & Open Questions (The Data Room)**
- Priority checklist dashboard:
  - **Financial Health**: Clarify membership dues vs. revenue
  - **Token Strategy**: Define acquisition vehicle & market maker
  - **Corporate Structure**: Confirm entity status
  - **IP & Assets**: Full inventory
  - **Regulatory Compliance**: ADGM RegLab obligations
- Next steps: Board discussion & data requests

## ✨ Key Features

### Glassmorphism Design
- Premium frosted glass effect on cards
- Subtle gradients with backdrop blur
- Professional, modern aesthetic

### Data Visualization
- Interactive Recharts line chart
- Clean, readable typography
- Color-coded growth indicators

### Animations
- Scroll-triggered fade-ins (Framer Motion)
- Pulse animation on EWT buyback step
- Smooth transitions throughout
- Professional timing (not distracting)

### Information Architecture
- High information density
- Clear visual hierarchy
- Scannable sections
- Action-oriented CTAs

## 🎯 Design Tokens

### Typography
- **H1**: 5xl-7xl (48-72px) - Hero headlines
- **H2**: 4xl-5xl (36-48px) - Section titles
- **H3**: 2xl (24px) - Card titles
- **Body**: Base-lg (16-18px) - High legibility

### Spacing
- Section padding: 80px vertical
- Card padding: 32px
- Component gaps: 16-24px

### Glassmorphism
- Background: `rgba(255, 255, 255, 0.1)` to `0.05`
- Backdrop blur: 20px
- Border: `rgba(255, 255, 255, 0.2)`
- Box shadow: Soft, elevated

## 🔒 Security & Privacy

- **Meta Tags**: `noindex, nofollow` (not indexed by search engines)
- **Access**: Intended for private deal room only
- **Footer**: "Confidential Board Materials" disclaimer

## 📊 Data Highlights

The microsite emphasizes:
- **25% Global Hashrate** - Market leadership
- **Coinbase Project Diamond** - Institutional validation
- **100% Stock Deal (EWT)** - Alignment of interests
- **$50k/mo Burn** - Manageable integration cost
- **5 Clear Milestones** - Transparent roadmap

## 🤝 Next Steps for Board

1. **Review all sections** thoroughly
2. **Discuss open questions** in Due Diligence section
3. **Schedule board discussion** to vote on term sheet
4. **Request additional data** if needed

## 📞 Contact

For board inquiries:
- Email: board@energyweb.org
- Access: Deal Room Only

---

**Built for institutional trust. Designed for strategic clarity.**

© 2025 Energy Web Foundation • All Rights Reserved

