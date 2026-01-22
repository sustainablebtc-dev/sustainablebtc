'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Coins, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  Target,
  Leaf,
  ArrowRight,
  FileText,
  DollarSign,
  ChevronDown,
  Menu,
  X,
  Activity,
  GitPullRequest,
  Landmark,
  ShieldCheck,
  RefreshCw
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

// Growth data for chart
const hashRateData = [
  { year: '2022', hashrate: 2, actual: 2, projected: null, label: '2%' },
  { year: '2023', hashrate: 8, actual: 8, projected: null, label: '8%' },
  { year: '2024', hashrate: 15, actual: 15, projected: null, label: '15%' },
  { year: '2025', hashrate: 25, actual: 25, projected: 25, label: '25%' },
  { year: '2026', hashrate: 35, actual: null, projected: 35, label: '35%' },
]

export default function DealProposal() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // SBP Token Model State
  const [timePeriod, setTimePeriod] = useState(12)
  const [hashratePercent, setHashratePercent] = useState(15)
  const [sbpPrice, setSbpPrice] = useState(4000)

  // SBP Token Model Constants & Calculations
  const MAX_DAILY_SBP = 450
  const PROTOCOL_FEE_PCT = 0.05
  const CURRENT_ISSUANCE = 5300
  const CURRENT_TREASURY = 265

  const modelCalculations = useMemo(() => {
    const totalDays = timePeriod * 30
    const dailyIssuance = MAX_DAILY_SBP * (hashratePercent / 100)
    const projectedTotalIssued = dailyIssuance * totalDays
    const protocolFeeSBP = projectedTotalIssued * PROTOCOL_FEE_PCT
    const protocolFeeUSD = protocolFeeSBP * sbpPrice
    const futureIssuance = CURRENT_ISSUANCE + projectedTotalIssued
    const futureTreasury = CURRENT_TREASURY + protocolFeeSBP
    const futureTreasuryValue = futureTreasury * sbpPrice
    const currentTreasuryValue = CURRENT_TREASURY * sbpPrice

    return {
      totalDays,
      dailyIssuance,
      projectedTotalIssued,
      protocolFeeSBP,
      protocolFeeUSD,
      futureIssuance,
      futureTreasury,
      futureTreasuryValue,
      currentTreasuryValue
    }
  }, [timePeriod, hashratePercent, sbpPrice])

  const formatNumber = (num: number) => num.toLocaleString('en-US', { maximumFractionDigits: 0 })
  const formatCurrency = (num: number) => '$' + num.toLocaleString('en-US', { maximumFractionDigits: 0 })

  const sections = [
    { id: 'executive-summary', name: 'Summary' },
    { id: 'verification-requirements', name: 'Verification' },
    { id: 'sbp-traction', name: 'SBP Traction' },
    { id: 'green-flywheel', name: 'Flywheel' },
    // { id: 'deal-structure', name: 'Deal Terms' }, // Temporarily hidden
    { id: 'milestones', name: '2026 KPIs' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsDropdownOpen(false)
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Status Badge */}
      <div className="status-badge inline-flex">
        <FileText className="w-4 h-4" />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-white/10">
        <div className="container-deal">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              {/* Proposal Index Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:text-deal-gold transition-colors"
                >
                  Proposal Index
                  <Menu className="w-4 h-4" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl overflow-hidden">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-left px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {section.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors rounded-lg"
                  >
                    {section.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16"></div>

      <main className="min-h-screen bg-gray-50">
      {/* Hero Section - The Proposal */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-deep-navy to-gray-900 overflow-hidden network-bg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-ewf-purple rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sbp-cyan rounded-full blur-3xl" />
        </div>

        <div className="container-deal relative z-10 py-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Main Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black text-white mb-16 leading-tight"
            >
              Accelerating<br />
              <span className="gradient-text-deal">Institutional Clean Bitcoin</span>
            </motion.h1>

            {/* Divider Line */}
            <motion.div 
              variants={fadeInUp}
              className="w-32 h-px bg-gradient-to-r from-transparent via-deal-gold to-transparent mx-auto mb-16"
            />

            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
            >
              Strategic Merger Proposal
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-center gap-8 text-2xl md:text-3xl font-bold text-white"
            >
              <div className="flex items-center gap-4">
                <img 
                  src="/energy-web-logo.png" 
                  alt="Energy Web" 
                  className="h-10 w-auto"
                />
              </div>
              <img 
                src="/sbp-logo.png" 
                alt="Sustainable Bitcoin Protocol" 
                className="h-10 w-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Executive Summary - The Why */}
      <section id="executive-summary" className="py-20 bg-white">
        <div className="container-deal">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Executive Summary</h2>
              <p className="text-xl text-gray-600">Why this Deal Makes Strategic Sense for Both SBP and EWF</p>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-slate-200">
              {/* Top Section: Strategic Fit (Full Width) */}
              <motion.div variants={fadeInUp} className="md:col-span-2 border-b border-slate-200 p-8">
                {/* Two Column Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Left Column: SBP */}
                  <div className="md:border-r border-slate-200 md:pr-8 pb-6 md:pb-0">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
                      <Coins className="w-5 h-5 text-slate-400" />
                      SBP (Institutional Token)
                    </h4>
                    <ul className="space-y-3">
                      <li className="text-sm text-slate-600 leading-relaxed flex">
                        <span className="mr-3 text-slate-400">—</span>
                        <span>Current Leader in Clean Energy Bitcoin (~23% hashrate).</span>
                      </li>
                      <li className="text-sm text-slate-600 leading-relaxed flex">
                        <span className="mr-3 text-slate-400">—</span>
                        <span>Clear scale-up trajectory for growth.</span>
                      </li>
                      <li className="text-sm text-slate-600 leading-relaxed flex">
                        <span className="mr-3 text-slate-400">—</span>
                        <span>Team with deep institutional asset management focus.</span>
                      </li>
                      <li className="text-sm text-slate-600 leading-relaxed flex">
                        <span className="mr-3 text-slate-400">—</span>
                        <span>Token traction provides the commercial engine.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Right Column: EWF */}
                  <div className="md:pl-8 pt-6 md:pt-0">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
                      <Shield className="w-5 h-5 text-slate-400" />
                      Energy Web (Governance Layer)
                    </h4>
                    <ul className="space-y-3">
                      <li className="text-sm text-slate-600 leading-relaxed flex">
                        <span className="mr-3 text-slate-400">—</span>
                        <span>Backed by world-renowned environmental NGOs.</span>
                      </li>
                      <li className="text-sm text-slate-600 leading-relaxed flex">
                        <span className="mr-3 text-slate-400">—</span>
                        <span>Established governance token model for revenue accrual.</span>
                      </li>
                      <li className="text-sm text-slate-600 leading-relaxed flex">
                        <span className="mr-3 text-slate-400">—</span>
                        <span>Distinct institutional stakeholders (Energy & Finance).</span>
                      </li>
                      <li className="text-sm text-slate-600 leading-relaxed flex">
                        <span className="mr-3 text-slate-400">—</span>
                        <span>Membership dues sustain long-term building.</span>
                      </li>
                      <li className="text-sm leading-relaxed flex items-center">
                        <span className="mr-3 text-emerald-500">—</span>
                        <span className="text-emerald-600 font-semibold">EWF Clean Bitcoin Transactions Protocol</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Left: Objective */}
              <motion.div variants={fadeInUp} className="border-b md:border-b-0 md:border-r border-slate-200 p-8">
                <h3 className="flex items-center gap-2 font-serif text-lg text-slate-900 mb-4 tracking-wide">
                  <Target className="w-5 h-5 text-slate-400" />
                  Deal Objective
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  SBP to combine with EWF Clean Transaction protocol to replace GP4BTC with a revenue-generating clean energy bitcoin protocol. The combined entity becomes the <strong className="text-slate-900">"Sustainable Bitcoin Standard"</strong> for regulated, ESG-compliant Bitcoin products.
                </p>
              </motion.div>

              {/* Bottom Right: Outcome */}
              <motion.div variants={fadeInUp} className="p-8">
                <h3 className="flex items-center gap-2 font-serif text-lg text-slate-900 mb-4 tracking-wide">
                  <TrendingUp className="w-5 h-5 text-slate-400" />
                  Financial Outcome
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Solidify position as the definitive clean energy Bitcoin product. SBP revenue hits an exponential trajectory, accruing back to Energy Web for <strong className="text-slate-900">EWT buybacks</strong> and yield payments.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clean Energy Verification Requirements */}
      <section id="verification-requirements" className="py-20 bg-white">
        <div className="container-deal">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Hero Header */}
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Clean Energy Verification
              </h2>
              <p className="text-xl text-gray-600">How SBP Creates Market-Driven Clean Energy Accountability</p>
            </motion.div>

            {/* Bento Grid Layout - Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-slate-200 mb-12">
              {/* Left: Market-Driven Climate Impact */}
              <motion.div variants={fadeInUp} className="border-b md:border-b-0 md:border-r border-slate-200 p-8">
                <h3 className="flex items-center gap-2 font-serif text-lg text-slate-900 mb-4 tracking-wide">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  Market-Driven Climate Impact
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  SBP creates a self-reinforcing cycle of clean energy financing tied directly to Bitcoin's energy consumption. As the network grows, more capital flows to renewable energy markets—transforming Bitcoin from an environmental challenge into a powerful tool for the clean energy transition.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-0.5">Climate Financing Flywheel</h4>
                      <p className="text-xs text-slate-500">Each SBP token requires purchasing EACs equal to the network's per-Bitcoin energy consumption</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-0.5">GHG Protocol Scope 2 Aligned</h4>
                      <p className="text-xs text-slate-500">Verification follows the global standard for corporate clean energy procurement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-0.5">Facility-Level Verification</h4>
                      <p className="text-xs text-slate-500">All claims verified down to individual facilities with immutable records</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Four Principles */}
              <motion.div variants={fadeInUp} className="p-8">
                <h3 className="flex items-center gap-2 font-serif text-lg text-slate-900 mb-4 tracking-wide">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Four Principles for Credibility
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { num: '01', title: "Don't Trust, Verify", desc: "All claims independently verified." },
                    { num: '02', title: "Unique & Exclusive", desc: "No double-counting of attributes." },
                    { num: '03', title: "Data & Transparency", desc: "Public, immutable ledger records." },
                    { num: '04', title: "Additionality", desc: "Driving 24/7 carbon-free energy." },
                  ].map((principle, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-serif text-emerald-600/30 mb-1">{principle.num}</div>
                      <h4 className="font-semibold text-sm text-slate-900 mb-1">{principle.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{principle.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Verification Methods - Matching SBP Traction style */}
            <motion.div variants={fadeInUp} className="mb-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black mb-2">Pathways to SBP Issuance</h3>
                  <p className="text-gray-600">GHG Protocol Scope 2 Guidelines—the global standard for corporate clean energy procurement.</p>
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg text-emerald-700 text-xs font-semibold whitespace-nowrap">
                  <Shield className="w-4 h-4" />
                  GHG Protocol Scope 2
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { letter: 'A', title: 'Energy Attribute Certificates', desc: 'Purchase and retire certificates representing environmental attributes for each MWh consumed.', tags: ['RECs', 'GOs', 'I-RECs'] },
                  { letter: 'B', title: 'Green Tariffs', desc: 'Utility programs where providers retire EACs on your behalf with exclusive attribution.', tags: [] },
                  { letter: 'C', title: 'Power Purchase Agreements', desc: 'Direct contracts with clean energy producers—physical or virtual—with bundled EACs.', tags: ['Physical', 'Virtual'] },
                  { letter: 'D', title: 'Self-Generation', desc: 'On-site clean energy with full ownership of associated energy claims and attributes.', tags: [] },
                  { letter: 'E', title: 'No Contractual Instrument', desc: 'Special cases with no EAC market and documented absence of double-claims.', tags: ['RE100 5.2'] },
                  { letter: 'F', title: 'Other Novel Cases', desc: 'Unique situations meeting all four SBP principles, evaluated case-by-case.', tags: [] },
                ].map((method, index) => (
                  <div key={index} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all">
                    <div className="w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center font-serif flex-shrink-0 text-sm">
                      {method.letter}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{method.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{method.desc}</p>
                      {method.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {method.tags.map((tag, i) => (
                            <span key={i} className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What Does Not Qualify - Prominent Warning Section */}
            <motion.div variants={fadeInUp} className="mb-12">
              <div className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-white">
                {/* Header Bar */}
                <div className="bg-slate-900 px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30">
                      <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tight">What Does Not Qualify</h3>
                      <p className="text-slate-400 text-sm mt-1">Location-based claims alone do not meet SBP verification requirements</p>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <p className="text-slate-700 mb-8 text-lg leading-relaxed max-w-3xl">
                    Co-location with clean energy or operating in a high-renewable grid is <strong className="text-slate-900 font-semibold">insufficient</strong> without proper market-based attribution. The following scenarios do not qualify for SBP issuance:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: 'Mining at hydropower without owning RECs', desc: 'Physical proximity to clean energy does not transfer environmental attributes' },
                      { title: 'Operating in "green" grids where EACs sold to others', desc: 'Grid composition is irrelevant if certificates are claimed elsewhere' },
                      { title: 'Co-location without contractual energy claims', desc: 'Must have legal ownership of energy attributes through proper instruments' },
                      { title: 'Grid-average claims without market instruments', desc: 'Residual mix claims do not constitute verified clean energy use' },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50/30 transition-all">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <X className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-slate-100 rounded-xl border border-slate-200">
                    <p className="text-slate-600 text-sm flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-800">Important:</strong> SBP follows GHG Protocol Scope 2 market-based methodology. All clean energy claims must be backed by exclusive, verified contractual instruments that transfer environmental attributes.</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Waste Methane Section */}
            <motion.div variants={fadeInUp} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
              <div className="bg-emerald-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Waste Methane Utilization</h3>
                    <p className="text-emerald-100 text-xs">Special category for emissions reduction</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-5 leading-relaxed max-w-3xl">
                  Miners using waste methane can qualify for SBP tokens. This converts a potent greenhouse gas—typically vented or flared—into productive energy, delivering significant emissions reductions.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  {[
                    { title: 'Additionality', desc: 'Gas must be "wasted"—vented or flared with no pipeline access.', metric: null },
                    { title: 'No Moral Hazard', desc: 'Must not incentivize additional methane production.', metric: '< 5% gas value' },
                    { title: 'Efficiency & MRV', desc: 'Emissions reduction verified through MRV.', metric: '≥ 99% efficiency' },
                  ].map((req, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-semibold text-sm text-slate-900">{req.title}</h4>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{req.desc}</p>
                      {req.metric && (
                        <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded">{req.metric}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 text-slate-500 text-xs p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                  <span><strong className="text-amber-700">Pilot Status:</strong> No SBP tokens issued yet for waste methane due to ongoing MRV (Measurement, Reporting, and Verification) challenges.</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SBP Traction - The Proof */}
      <section id="sbp-traction" className="py-20 bg-gradient-to-br from-deep-navy to-gray-900">
        <div className="container-deal">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-left mb-8">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                SBP Traction and Partners
              </h2>
              <p className="text-xl text-gray-400">hashrate and global miner adoption</p>
            </motion.div>

            {/* Growth Chart */}
            <motion.div variants={fadeInUp} className="glass-card-dark rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">
                Bitcoin Hashrate Adoption (%)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hashRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="year" 
                      stroke="rgba(255,255,255,0.5)"
                      style={{ fontSize: '14px', fontWeight: 600 }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)"
                      style={{ fontSize: '14px', fontWeight: 600 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                        border: '1px solid rgba(0, 194, 255, 0.3)',
                        borderRadius: '12px',
                        color: 'white'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#00C2FF" 
                      strokeWidth={4}
                      dot={{ fill: '#00C2FF', r: 6 }}
                      activeDot={{ r: 8 }}
                      connectNulls={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="projected" 
                      stroke="#94a3b8" 
                      strokeWidth={4}
                      strokeDasharray="5 5"
                      dot={{ fill: '#94a3b8', r: 6 }}
                      activeDot={{ r: 8 }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Mining Partners Network */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
              {/* Card 1: Current Mining Partners */}
              <motion.div variants={fadeInUp} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-6 h-6 text-sbp-green" />
                  <h3 className="text-xl font-bold text-white">Live Network Partners</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">CleanSpark</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Bitfarms</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Bitdeer</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">PowRe</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">SATO</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Penguin Digital</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Big Block Mining</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Hearst Mining</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Delta Mining</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Digital Power Optimization</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Exos Financial</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">GreenMiningDAO</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Prosperity Digital</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Gridless</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-yellow-500/50 rounded-md">
                    <div className="font-mono text-sm text-white flex items-center gap-2">
                      <span>👑</span> Zero Two
                    </div>
                    <div className="text-xs text-slate-500 mt-1">UAE sovereign miner</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-yellow-500/50 rounded-md">
                    <div className="font-mono text-sm text-white flex items-center gap-2">
                      <span>👑</span> Green Digital
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Bhutan sovereign miner</div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Strategic Pipeline */}
              <motion.div variants={fadeInUp} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <GitPullRequest className="w-6 h-6 text-sbp-cyan" />
                  <h3 className="text-xl font-bold text-white">Next Cohort: Institutional-Scale</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Marathon Digital</div>
                    <div className="text-xs text-slate-500 mt-1">Already holds SBP via ZeroTwo JV</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Tether</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Phoenix Group</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Canaan</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">Bitmain</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">HIVE</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                    <div className="font-mono text-sm text-slate-300">TerraWulf</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp} className="glass-card-dark rounded-2xl p-8">
                <div className="flex items-center gap-4">
                  <Shield className="w-12 h-12 text-deal-gold flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Legal & Regulatory Status</h4>
                    <ul className="space-y-2 text-gray-300 leading-relaxed list-disc list-inside">
                      <li>CFTC exempt legal characterization memo from Jones Day, written by former CFTC and SEC alumni.</li>
                      <li>Regulatory approval from Abu Dhabi Global Market FSRA (Financial Services Regulatory Authority).</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass-card-dark rounded-2xl p-8 border-2 border-sbp-cyan/30">
                <div className="flex items-center gap-4">
                  <img 
                    src="/Coinbase_Wordmark_White.png" 
                    alt="Coinbase" 
                    className="h-8 w-auto flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">
                      Project Diamond
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      Selected as one of the first six projects selected to trade on Diamond within the ADGM RegLab sandbox.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Strategic Backing & Infrastructure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Card 1: Strategic Investors */}
              <motion.div variants={fadeInUp} className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Landmark className="w-6 h-6 text-deal-gold" />
                  <h3 className="text-xl font-bold text-white">Backed by Global Capital</h3>
                </div>
                <div className="border-b border-slate-700/50 mb-4"></div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div className="text-sm font-medium text-white">Mubadala</div>
                  <div className="text-sm font-medium text-slate-300">Hub71</div>
                  <div className="text-sm font-medium text-slate-300">Bitdeer Technologies (Nasdaq: BTDR)</div>
                  <div className="text-sm font-medium text-slate-300">Wincent</div>
                  <div className="text-sm font-medium text-slate-300">Blackpine Private Equity</div>
                  <div className="text-sm font-medium text-slate-300">Cerulean Ventures</div>
                  <div className="text-sm font-medium text-slate-300">Token Bay Capital</div>
                  <div className="text-sm font-medium text-slate-300">New Layer Capital</div>
                  <div className="text-sm font-medium text-slate-300">Hawksburn Capital</div>
                  <div className="text-sm font-medium text-slate-300">Bitcoin Frontier Fund</div>
                </div>
              </motion.div>

              {/* Card 2: Market Infrastructure */}
              <motion.div variants={fadeInUp} className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-sbp-cyan" />
                  <h3 className="text-xl font-bold text-white">Institutional Ecosystem</h3>
                </div>
                <div className="border-b border-slate-700/50 mb-4"></div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div className="text-sm font-medium text-white">Coinbase Asset Management</div>
                  <div className="text-sm font-medium text-slate-300">Zodia Custody (Standard Chartered)</div>
                  <div className="text-sm font-medium text-slate-300">Tungsten</div>
                  <div className="text-sm font-medium text-slate-300">BitGo</div>
                  <div className="text-sm font-medium text-slate-300">Copper</div>
                  <div className="text-sm font-medium text-slate-300">DRW Cumberland</div>
                  <div className="text-sm font-medium text-slate-300">DRW Artemeter</div>
                  <div className="text-sm font-medium text-slate-300">Bitstamp</div>
                  <div className="text-sm font-medium text-slate-300">ADGM</div>
                  <div className="text-sm font-medium text-slate-300">Hub71 / Mubadala</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Revenue Flywheel - The Engine */}
      <section id="green-flywheel" className="pt-10 pb-20 bg-gray-50 overflow-hidden">
        <div className="container-deal">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-6">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Combined Entity: <span className="bg-gradient-to-r from-[#5D2E8C] to-[#00C2FF] bg-clip-text text-transparent">Revenue Flywheel</span>
              </h2>
              <p className="text-xl text-gray-600">A self-reinforcing value loop powered by institutional adoption.</p>
            </motion.div>

            {/* Linear Loop Layout */}
            <div className="relative max-w-6xl mx-auto pt-6 pb-16">
              
              {/* Desktop Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative z-10">
                
                {/* Card 1: Trust */}
                <motion.div variants={fadeInUp} className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col items-center text-center h-full">
                   <div className="w-16 h-16 rounded-full bg-ewf-purple/10 flex items-center justify-center mb-6">
                     <ShieldCheck className="w-8 h-8 text-ewf-purple" />
                   </div>
                   <h4 className="text-xl font-bold text-slate-900 mb-3">Enhanced Institutional Trust</h4>
                   <p className="text-slate-600 leading-relaxed text-sm">
                     Launch new clean energy Bitcoin products: Trust, ETF, ETP, and Wrapped BTC (cBTC).
                   </p>

                   {/* Mobile Arrow (Down) */}
                   <div className="md:hidden mt-6 text-slate-300">
                     <ArrowRight className="w-6 h-6 rotate-90" />
                   </div>

                   {/* Desktop Arrow (Right) - Positioned in the gap */}
                   <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center text-slate-300 z-20">
                      <ArrowRight className="w-6 h-6" />
                   </div>
                </motion.div>

                {/* Card 2: Revenue */}
                <motion.div variants={fadeInUp} className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col items-center text-center h-full">
                   <div className="w-16 h-16 rounded-full bg-sbp-cyan/10 flex items-center justify-center mb-6">
                     <TrendingUp className="w-8 h-8 text-sbp-cyan" />
                   </div>
                   <h4 className="text-xl font-bold text-slate-900 mb-3">Accelerate Protocol Revenues</h4>
                   <p className="text-slate-600 leading-relaxed text-sm">
                     Institutional scale drives token adoption, in turn accelerating more miner adoption, and in turn driving exponential protocol revenue.
                   </p>

                   {/* Mobile Arrow (Down) */}
                   <div className="md:hidden mt-6 text-slate-300">
                     <ArrowRight className="w-6 h-6 rotate-90" />
                   </div>

                   {/* Desktop Arrow (Right) - Positioned in the gap */}
                   <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center text-slate-300 z-20">
                      <ArrowRight className="w-6 h-6" />
                   </div>
                </motion.div>

                {/* Card 3: Buybacks */}
                <motion.div variants={fadeInUp} className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col items-center text-center h-full">
                   <div className="w-16 h-16 rounded-full bg-sbp-green/10 flex items-center justify-center mb-6">
                     <RefreshCw className="w-8 h-8 text-sbp-green" />
                   </div>
                   <h4 className="text-xl font-bold text-slate-900 mb-3">Revenues Flow to EWT</h4>
                   <p className="text-slate-600 leading-relaxed text-sm">
                     All net revenue accrues to Energy Web for <strong className="text-slate-900">EWT buybacks</strong> and token holder dividends.
                   </p>
                   
                   {/* Mobile Label */}
                   <div className="md:hidden mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                     Cycle Repeats
                   </div>
                </motion.div>

              </div>

              {/* Desktop Return Loop SVG (Below Grid) */}
              <div className="hidden md:block absolute left-0 right-0 top-full h-20 -mt-6 z-0 pointer-events-none">
                <svg className="w-full h-full overflow-visible">
                  {/* Path from Card 3 (Right) to Card 1 (Left) */}
                  <path 
                    d="M 83.33% 0 L 83.33% 40 Q 83.33% 60 80% 60 L 20% 60 Q 16.66% 60 16.66% 40 L 16.66% 12" 
                    fill="none" 
                    stroke="#CBD5E1" 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                  />
                  {/* Arrowhead pointing UP at Card 1 */}
                  <polygon points="16.66% 0, 15% 12, 18.33% 12" fill="#CBD5E1" />
                </svg>
              </div>

            </div>

            {/* Interactive SBP Token Model */}
            <motion.div variants={fadeInUp} className="mt-20 max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 text-sbp-cyan text-xs font-semibold tracking-wider uppercase mb-3">
                  <TrendingUp className="w-4 h-4" />
                  Interactive Model
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">SBP Token Issuance Model</h3>
                <p className="text-gray-600">Explore projected token issuance and protocol economics based on network adoption scenarios.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
                {/* Inputs Panel */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-900 mb-5">Scenario Inputs</h4>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-2">Time Period</label>
                      <select 
                        value={timePeriod} 
                        onChange={(e) => setTimePeriod(Number(e.target.value))}
                        className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:border-sbp-cyan focus:outline-none cursor-pointer"
                      >
                        <option value={1}>1 Month</option>
                        <option value={3}>3 Months</option>
                        <option value={6}>6 Months</option>
                        <option value={12}>12 Months</option>
                        <option value={18}>18 Months</option>
                        <option value={24}>24 Months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-2">
                        Hashrate Using Protocol: <span className="text-sbp-cyan font-semibold">{hashratePercent}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="5" 
                        max="100" 
                        step="5" 
                        value={hashratePercent} 
                        onChange={(e) => setHashratePercent(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-sbp-cyan"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>5%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-2">
                        SBP Price (USD): <span className="text-sbp-cyan font-semibold">{formatCurrency(sbpPrice)}</span>
                      </label>
                      <input 
                        type="range" 
                        min="1000" 
                        max="10000" 
                        step="500" 
                        value={sbpPrice} 
                        onChange={(e) => setSbpPrice(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-sbp-cyan"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>$1,000</span>
                        <span>$10,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-slate-100">
                    <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Model Assumptions</h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Max Daily SBP at 100%</span>
                        <span className="font-semibold text-slate-700">450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Protocol Fee</span>
                        <span className="font-semibold text-slate-700">5.0%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outputs Panel */}
                <div className="space-y-4">
                  {/* Current State */}
                  <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5">
                    <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-4">Current State</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-[11px] text-slate-500 mb-1">Current SBP Issuance</div>
                        <div className="text-lg font-bold text-slate-900">5,300</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500 mb-1">Current Treasury</div>
                        <div className="text-lg font-bold text-slate-900">265 SBP</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500 mb-1">Treasury Value</div>
                        <div className="text-lg font-bold text-slate-900">{formatCurrency(modelCalculations.currentTreasuryValue)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Projected Outputs */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-4">Projected Outputs</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-[11px] text-slate-500 mb-1">Daily SBP Issuance</div>
                        <div className="text-lg font-bold text-sbp-cyan">{formatNumber(modelCalculations.dailyIssuance)}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500 mb-1">Total Days</div>
                        <div className="text-lg font-bold text-slate-900">{formatNumber(modelCalculations.totalDays)}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500 mb-1">Projected Total Issued</div>
                        <div className="text-lg font-bold text-sbp-cyan">{formatNumber(modelCalculations.projectedTotalIssued)}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                      <div>
                        <div className="text-[11px] text-slate-500 mb-1">Protocol Fee (SBP)</div>
                        <div className="text-lg font-bold text-slate-900">{formatNumber(modelCalculations.protocolFeeSBP)}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500 mb-1">Protocol Fee (USD)</div>
                        <div className="text-xl font-bold text-slate-900">{formatCurrency(modelCalculations.protocolFeeUSD)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Future State */}
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white">
                    <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-4">Future State</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-[11px] text-slate-400 mb-1">Total SBP Issuance</div>
                        <div className="text-lg font-bold text-sbp-cyan">{formatNumber(modelCalculations.futureIssuance)}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400 mb-1">Future Treasury</div>
                        <div className="text-lg font-bold text-white">{formatNumber(modelCalculations.futureTreasury)} SBP</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400 mb-1">Treasury Value (USD)</div>
                        <div className="text-xl font-bold text-sbp-cyan">{formatCurrency(modelCalculations.futureTreasuryValue)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Deal Structure & Team - TEMPORARILY HIDDEN */}
      {/* 
      <section id="deal-structure" className="py-20 bg-white">
        <div className="container-deal">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Deal Structure & Team</h2>
              <p className="text-xl text-gray-600">The Terms</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div variants={fadeInUp} className="glass-deal rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-deal-gold" />
                  Financial Terms
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Currency</span>
                    <span className="font-bold text-lg">100% Stock (EWT)</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Burn</span>
                    <span className="font-bold text-lg">~$50k/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Coverage</span>
                    <span className="font-bold text-lg text-sbp-green">EWF Operating Budget</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass-deal rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-ewf-purple" />
                  Team Structure
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-ewf-purple/10 rounded-xl">
                    <div className="font-bold text-lg">Ed Hesse</div>
                    <div className="text-sm text-gray-600">Strategic Oversight</div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <div className="w-px h-8 bg-gray-300"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-sbp-cyan/10 rounded-lg">
                      <div className="font-semibold text-sm">Brad</div>
                      <div className="text-xs text-gray-600">Co-founder</div>
                    </div>
                    <div className="text-center p-3 bg-sbp-cyan/10 rounded-lg">
                      <div className="font-semibold text-sm">Matthew</div>
                      <div className="text-xs text-gray-600">Co-founder</div>
                    </div>
                    <div className="text-center p-3 bg-sbp-cyan/10 rounded-lg">
                      <div className="font-semibold text-sm">Elliot</div>
                      <div className="text-xs text-gray-600">Co-founder</div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 italic pt-2">
                    "Autonomy with Strategic Alignment"
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      */}

      {/* 2026 Objectives and KPIs */}
      <section id="milestones" className="py-20 bg-gradient-to-br from-gray-900 to-deep-navy">
        <div className="container-deal">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                2026 Objectives and KPIs
              </h2>
              <p className="text-xl text-gray-400">The Roadmap to Value Creation</p>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={fadeInUp} className="glass-card-dark rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  { title: 'Launch Clean BTC Trust (US)', icon: Building2, status: 'active' },
                  { title: 'Launch Clean Wrapped BTC (Base/Canton)', icon: Zap, status: 'pending' },
                  { title: 'Launch ETF (US) or ETP (EU)', icon: TrendingUp, status: 'pending' },
                  { title: 'Hit 35% Network Hashrate', icon: Target, status: 'pending' },
                  { title: 'Generate $2.5M Revenue', icon: DollarSign, status: 'pending' },
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`timeline-dot ${milestone.status === 'active' ? 'timeline-dot-active' : 'timeline-dot-pending'}`} />
                    <div className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <milestone.icon className={`w-6 h-6 ${milestone.status === 'active' ? 'text-deal-gold' : 'text-gray-500'}`} />
                      <span className={`font-semibold ${milestone.status === 'active' ? 'text-white' : 'text-gray-400'}`}>
                        {milestone.title}
                      </span>
                      {milestone.status === 'active' && (
                        <span className="ml-auto text-xs bg-deal-gold/20 text-deal-gold px-3 py-1 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-navy py-12 border-t border-white/10">
        <div className="container-deal">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <div>
              © 2025 Energy Web Foundation • Confidential Board Materials
            </div>
            <div className="flex gap-6">
              <span>Deal Room Access Only</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </>
  )
}

