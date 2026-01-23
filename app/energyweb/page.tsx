'use client'

import { motion } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import {
   Building2,
   TrendingUp,
   Shield,
   Coins,
   CheckCircle2,
   AlertCircle,
   Zap,
   Target,
   Leaf,
   ArrowRight,
   FileText,
   Menu,
   X,
   Activity,
   GitPullRequest,
   Landmark,
   ShieldCheck,
   RefreshCw,
   Lock,
   Eye,
   Database,
   Sparkles,
   XCircle,
   Calculator,
   Flame,
   Wind,
   Factory,
   FileCheck,
   Scale,
   BadgeCheck,
   Info,
   ExternalLink
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

export default function EnergyWebPage() {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')

   // Calculator state
   const [timePeriod, setTimePeriod] = useState(12) // months
   const [hashratePercent, setHashratePercent] = useState(15)
   const [sbpPrice, setSbpPrice] = useState(4000)

   // Synthetic Minting Model state
   const [tokensToMint, setTokensToMint] = useState(100)
   const [mwhPerToken, setMwhPerToken] = useState(1193)
   const [activeModal, setActiveModal] = useState<string | null>(null)

   // Client-side mounting check for hydration
   const [mounted, setMounted] = useState(false)
   useEffect(() => {
      setMounted(true)
   }, [])

   // Calculator computations
   const calculatorResults = useMemo(() => {
      const maxDailySBPAt100 = 450
      const protocolFeePercent = 5.0
      const currentSBPIssuance = 5300
      const currentTreasury = 265

      const dailySBPIssuance = Math.round((hashratePercent / 100) * maxDailySBPAt100)
      const totalDays = timePeriod * 30
      const projectedTotalIssued = dailySBPIssuance * totalDays
      const protocolFeeSBP = Math.round(projectedTotalIssued * (protocolFeePercent / 100))
      const protocolFeeUSD = protocolFeeSBP * sbpPrice

      const totalSBPIssuance = currentSBPIssuance + projectedTotalIssued
      const futureTreasury = currentTreasury + protocolFeeSBP
      const treasuryValueUSD = futureTreasury * sbpPrice

      return {
         dailySBPIssuance,
         totalDays,
         projectedTotalIssued,
         protocolFeeSBP,
         protocolFeeUSD,
         totalSBPIssuance,
         futureTreasury,
         treasuryValueUSD,
         currentSBPIssuance,
         currentTreasury,
         currentTreasuryValue: currentTreasury * sbpPrice,
         maxDailySBPAt100,
         protocolFeePercent
      }
   }, [timePeriod, hashratePercent, sbpPrice])

   // Synthetic Minting calculations
   const syntheticResults = useMemo(() => {
      const REC_PRICE = 3.00
      const REC_PRICE_LOW = 1.50
      const REC_PRICE_HIGH = 5.00
      const MIN_MARGIN = 0.15

      const recsRequired = tokensToMint * mwhPerToken
      const totalCost = recsRequired * REC_PRICE
      const minSalePrice = totalCost * (1 + MIN_MARGIN)
      const marginTotal = minSalePrice - totalCost
      const marginPerToken = marginTotal / tokensToMint
      const costPerToken = totalCost / tokensToMint
      const costPerTokenLow = mwhPerToken * REC_PRICE_LOW
      const costPerTokenHigh = mwhPerToken * REC_PRICE_HIGH

      return {
         recsRequired,
         totalCost,
         minSalePrice,
         marginTotal,
         marginPerToken,
         costPerToken,
         costPerTokenLow,
         costPerTokenHigh,
         REC_PRICE,
         MIN_MARGIN
      }
   }, [tokensToMint, mwhPerToken])

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault()
      if (password === 'flywheel') {
         setIsAuthenticated(true)
         setError('')
      } else {
         setError('Incorrect password')
      }
   }

   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

   const sections = [
      { id: 'executive-summary', name: 'Summary' },
      { id: 'clean-energy-verification', name: 'Verification' },
      { id: 'sbp-traction', name: 'SBP Traction' },
      { id: 'green-flywheel', name: 'Flywheel' },
      { id: 'token-calculator', name: 'Calculator' },
      { id: 'objectives', name: '2026 KPIs' },
   ]

   const scrollToSection = (id: string) => {
      const element = document.getElementById(id)
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' })
         setIsDropdownOpen(false)
         setIsMobileMenuOpen(false)
      }
   }

   if (!isAuthenticated) {
      return (
         <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl w-full max-w-md"
            >
               <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">Restricted Access</h1>
                  <p className="text-gray-400">Please enter the password to view the proposal.</p>
               </div>

               <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                     <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                        autoFocus
                     />
                  </div>

                  {error && (
                     <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                     >
                        {error}
                     </motion.div>
                  )}

                  <button
                     type="submit"
                     className="w-full py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                     Access Proposal
                  </button>
               </form>

               <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-center gap-6 opacity-50">
                  <img src="/energy-web-logo.png" alt="Energy Web" className="h-6 w-auto grayscale" />
                  <img src="/sbp-logo.png" alt="SBP" className="h-6 w-auto grayscale" />
               </div>
            </motion.div>
         </div>
      )
   }

   return (
      <>
         {/* Navigation Bar */}
         <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-white/10">
            <div className="container-deal">
               <div className="flex items-center justify-between h-16">
                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center gap-6 ml-auto">
                     <div className="relative">
                        <button
                           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                           className="flex items-center gap-3 px-4 py-2 text-white hover:text-deal-gold transition-colors text-xl font-bold"
                        >
                           Proposal Index
                           <Menu className="w-6 h-6" />
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
            {/* Hero Section */}
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
                     <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-black text-white mb-16 leading-tight"
                     >
                        Accelerating<br />
                        <span className="gradient-text-deal">Institutional Clean Bitcoin</span>
                     </motion.h1>

                     <motion.div
                        variants={fadeInUp}
                        className="w-32 h-px bg-gradient-to-r from-transparent via-deal-gold to-transparent mx-auto mb-16"
                     />

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

            {/* Executive Summary */}
            <section id="executive-summary" className="py-20 bg-white">
               <div className="container-deal">
                  <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, margin: "-100px" }}
                     variants={staggerContainer}
                  >
                     <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Executive Summary</h2>
                        <p className="text-xl text-gray-600">Why this Deal Makes Strategic Sense for Both SBP and EWF</p>
                     </motion.div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-slate-200">
                        <motion.div variants={fadeInUp} className="md:col-span-2 border-b border-slate-200 p-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
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
                                    <li className="text-sm leading-relaxed flex mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-3 -ml-1">
                                       <span className="mr-3 text-emerald-500 font-bold">+</span>
                                       <span className="text-emerald-700 font-semibold">EWF Clean BTC Transaction Protocol</span>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="border-b md:border-b-0 md:border-r border-slate-200 p-8">
                           <h3 className="flex items-center gap-2 font-serif text-lg text-slate-900 mb-4 tracking-wide">
                              <Target className="w-5 h-5 text-slate-400" />
                              Deal Objective
                           </h3>
                           <p className="text-sm text-slate-600 leading-relaxed">
                              Merge SBP and EWF Clean BTC Transaction Protocol to replace GP4BTC with a revenue-generating clean energy bitcoin protocol. The combined entity becomes the <strong className="text-slate-900">{"\"Sustainable Bitcoin Standard\""}</strong> for regulated, ESG-compliant Bitcoin products.
                           </p>
                        </motion.div>

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

            {/* Clean Energy Verification */}
            <section id="clean-energy-verification" className="pt-8 pb-20 bg-gradient-to-br from-slate-50 to-white">
               <div className="container-deal">
                  <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, margin: "-100px" }}
                     variants={staggerContainer}
                  >
                     <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Clean Energy Verification</h2>
                        <p className="text-xl text-gray-600">How SBP Creates Market-Driven Clean Energy Accountability</p>
                     </motion.div>

                     {/* Market-Driven Climate Impact */}
                     <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Market-Driven Climate Impact</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">
                           {"SBP creates a self-reinforcing cycle of clean energy financing tied directly to Bitcoin's energy consumption. As the network grows, more capital flows to renewable energy markets—transforming Bitcoin from an environmental challenge into a powerful tool for the clean energy transition."}
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                           <div className="bg-slate-50 rounded-xl p-6">
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                 <RefreshCw className="w-5 h-5 text-sbp-green" />
                                 Climate Financing Flywheel
                              </h4>
                              <p className="text-sm text-slate-600">
                                 {"Each SBP token requires purchasing EACs equal to the network's per-Bitcoin energy consumption"}
                              </p>
                           </div>
                           <div className="bg-slate-50 rounded-xl p-6">
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                 <BadgeCheck className="w-5 h-5 text-sbp-cyan" />
                                 GHG Protocol Scope 2 Aligned
                              </h4>
                              <p className="text-sm text-slate-600">
                                 Verification follows the global standard for corporate clean energy procurement
                              </p>
                           </div>
                           <div className="bg-slate-50 rounded-xl p-6">
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                 <Building2 className="w-5 h-5 text-ewf-purple" />
                                 Facility-Level Verification
                              </h4>
                              <p className="text-sm text-slate-600">
                                 All claims verified down to individual facilities with immutable records
                              </p>
                           </div>
                        </div>
                     </motion.div>

                     {/* Four Principles for Credibility */}
                     <motion.div variants={fadeInUp} className="mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Four Principles for Credibility</h3>
                        <div className="grid md:grid-cols-4 gap-6">
                           {[
                              { num: '01', title: "Don't Trust, Verify", desc: 'All claims independently verified.', icon: Eye },
                              { num: '02', title: 'Unique & Exclusive', desc: 'No double-counting of attributes.', icon: FileCheck },
                              { num: '03', title: 'Data & Transparency', desc: 'Public, immutable ledger records.', icon: Database },
                              { num: '04', title: 'Additionality', desc: 'Driving 24/7 carbon-free energy.', icon: Sparkles },
                           ].map((principle) => (
                              <div key={principle.num} className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 text-center">
                                 <div className="text-3xl font-black text-slate-200 mb-4">{principle.num}</div>
                                 <principle.icon className="w-8 h-8 text-sbp-cyan mx-auto mb-4" />
                                 <h4 className="font-bold text-slate-900 mb-2">{principle.title}</h4>
                                 <p className="text-sm text-slate-600">{principle.desc}</p>
                              </div>
                           ))}
                        </div>
                     </motion.div>

                     {/* Pathways to SBP Issuance */}
                     <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Pathways to SBP Issuance</h3>
                        <p className="text-slate-600 mb-8">GHG Protocol Scope 2 Guidelines—the global standard for corporate clean energy procurement.</p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                           {[
                              { letter: 'A', title: 'Energy Attribute Certificates', desc: 'Purchase and retire certificates representing environmental attributes for each MWh consumed.', tags: ['RECs', 'GOs', 'I-RECs'] },
                              { letter: 'B', title: 'Green Tariffs', desc: 'Utility programs where providers retire EACs on your behalf with exclusive attribution.', tags: [] },
                              { letter: 'C', title: 'Power Purchase Agreements', desc: 'Direct contracts with clean energy producers—physical or virtual—with bundled EACs.', tags: ['Physical', 'Virtual'] },
                              { letter: 'D', title: 'Self-Generation', desc: 'On-site clean energy with full ownership of associated energy claims and attributes.', tags: [] },
                              { letter: 'E', title: 'No Contractual Instrument', desc: 'Special cases with no EAC market and documented absence of double-claims.', tags: ['RE100 5.2'] },
                              { letter: 'F', title: 'Other Novel Cases', desc: 'Unique situations meeting all four SBP principles, evaluated case-by-case.', tags: [] },
                           ].map((pathway) => (
                              <div key={pathway.letter} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                 <div className="flex items-center gap-3 mb-3">
                                    <span className="w-8 h-8 rounded-full bg-sbp-cyan/20 text-sbp-cyan font-bold flex items-center justify-center text-sm">
                                       {pathway.letter}
                                    </span>
                                    <h4 className="font-bold text-slate-900 text-sm">{pathway.title}</h4>
                                 </div>
                                 <p className="text-xs text-slate-600 mb-3">{pathway.desc}</p>
                                 {pathway.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                       {pathway.tags.map((tag) => (
                                          <span key={tag} className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                                             {tag}
                                          </span>
                                       ))}
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                     </motion.div>

                     {/* What Does Not Qualify */}
                     <motion.div variants={fadeInUp} className="bg-slate-100 rounded-2xl p-8 border border-slate-200 mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <XCircle className="w-7 h-7 text-red-500" />
                           What Does Not Qualify
                        </h3>
                        <p className="text-slate-600 mb-6">
                           Location-based claims alone do not meet SBP requirements. Co-location or operating in a high-renewable grid is insufficient without market-based attribution.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                           {[
                              'Mining at hydropower without owning RECs',
                              'Operating in "green" grids where EACs sold to others',
                              'Co-location without contractual energy claims',
                              'Grid-average claims without market instruments',
                           ].map((item, index) => (
                              <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 border border-slate-200">
                                 <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                 <span className="text-sm text-slate-700">{item}</span>
                              </div>
                           ))}
                        </div>
                     </motion.div>

                     {/* Waste Methane Utilization */}
                     <motion.div variants={fadeInUp} className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 shadow-lg border border-emerald-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <Flame className="w-7 h-7 text-orange-500" />
                           Waste Methane Utilization
                        </h3>
                        <p className="text-slate-600 mb-6">
                           Miners using waste methane can qualify for SBP tokens. This converts a potent greenhouse gas into productive energy.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                           <div className="bg-white rounded-xl p-5 border border-slate-200">
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                 <Sparkles className="w-5 h-5 text-emerald-500" />
                                 Additionality
                              </h4>
                              <p className="text-sm text-slate-600">
                                 {"Gas must be \"wasted\"—vented or flared with no pipeline access."}
                              </p>
                           </div>
                           <div className="bg-white rounded-xl p-5 border border-slate-200">
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                 <Scale className="w-5 h-5 text-emerald-500" />
                                 No Moral Hazard
                              </h4>
                              <p className="text-sm text-slate-600">
                                 Must not incentivize additional methane production.
                              </p>
                              <p className="text-xs text-emerald-600 font-semibold mt-2">&lt; 5% gas value</p>
                           </div>
                           <div className="bg-white rounded-xl p-5 border border-slate-200">
                              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                 <Activity className="w-5 h-5 text-emerald-500" />
                                 Efficiency & MRV
                              </h4>
                              <p className="text-sm text-slate-600">
                                 Emissions reduction verified through MRV.
                              </p>
                              <p className="text-xs text-emerald-600 font-semibold mt-2">≥99% efficiency</p>
                           </div>
                        </div>

                        {/* Pilot Status - Made Prominent */}
                        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 flex items-start gap-4">
                           <AlertCircle className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
                           <div>
                              <h4 className="font-bold text-amber-800 text-lg mb-1">Pilot Status</h4>
                              <p className="text-amber-700">
                                 No SBP tokens issued yet for waste methane due to MRV challenges.
                              </p>
                           </div>
                        </div>
                     </motion.div>
                  </motion.div>
               </div>
            </section>

            {/* SBP Traction */}
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

                     {/* Mining Partners */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
                        <motion.div variants={fadeInUp} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                           <div className="flex items-center gap-3 mb-6">
                              <Activity className="w-6 h-6 text-sbp-green" />
                              <h3 className="text-xl font-bold text-white">Live Network Partners</h3>
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {['CleanSpark', 'Bitfarms', 'Bitdeer', 'PowRe', 'SATO', 'Penguin Digital', 'Big Block Mining', 'Hearst Mining', 'Delta Mining', 'Digital Power Optimization', 'Exos Financial', 'GreenMiningDAO', 'Prosperity Digital', 'Gridless'].map((partner) => (
                                 <div key={partner} className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                                    <div className="font-mono text-sm text-slate-300">{partner}</div>
                                 </div>
                              ))}
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
                              {['Tether', 'Phoenix Group', 'Canaan', 'Bitmain', 'HIVE', 'TerraWulf'].map((partner) => (
                                 <div key={partner} className="p-3 bg-slate-900/40 border border-slate-700/50 rounded-md">
                                    <div className="font-mono text-sm text-slate-300">{partner}</div>
                                 </div>
                              ))}
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

                     {/* Strategic Backing */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <motion.div variants={fadeInUp} className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                           <div className="flex items-center gap-3 mb-4">
                              <Landmark className="w-6 h-6 text-deal-gold" />
                              <h3 className="text-xl font-bold text-white">Backed by Global Capital</h3>
                           </div>
                           <div className="border-b border-slate-700/50 mb-4"></div>
                           <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                              {['Mubadala', 'Hub71', 'Bitdeer Technologies (Nasdaq: BTDR)', 'Wincent', 'Blackpine Private Equity', 'Cerulean Ventures', 'Token Bay Capital', 'New Layer Capital', 'Hawksburn Capital', 'Bitcoin Frontier Fund'].map((investor, index) => (
                                 <div key={investor} className={`text-sm font-medium ${index === 0 ? 'text-white' : 'text-slate-300'}`}>
                                    {investor}
                                 </div>
                              ))}
                           </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                           <div className="flex items-center gap-3 mb-4">
                              <Building2 className="w-6 h-6 text-sbp-cyan" />
                              <h3 className="text-xl font-bold text-white">Institutional Ecosystem</h3>
                           </div>
                           <div className="border-b border-slate-700/50 mb-4"></div>
                           <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                              {['Coinbase Asset Management', 'Zodia Custody (Standard Chartered)', 'Tungsten', 'BitGo', 'Copper', 'DRW Cumberland', 'DRW Artemeter', 'Bitstamp', 'ADGM', 'Hub71 / Mubadala'].map((partner, index) => (
                                 <div key={partner} className={`text-sm font-medium ${index === 0 ? 'text-white' : 'text-slate-300'}`}>
                                    {partner}
                                 </div>
                              ))}
                           </div>
                        </motion.div>
                     </div>
                  </motion.div>
               </div>
            </section>

            {/* Revenue Flywheel */}
            <section id="green-flywheel" className="pt-10 pb-20 bg-gray-50 overflow-hidden">
               <div className="container-deal">
                  <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, margin: "-100px" }}
                     variants={staggerContainer}
                  >
                     <motion.div variants={fadeInUp} className="text-center mb-6 flex flex-col items-center">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                           <span className="bg-gradient-to-r from-[#5D2E8C] to-[#00C2FF] bg-clip-text text-transparent">Combined Entity:</span>
                           <span className="text-black"> Revenue Flywheel</span>
                        </h2>
                        <p className="text-xl text-gray-600">A self-reinforcing value loop powered by institutional adoption.</p>
                     </motion.div>

                     <div className="relative max-w-6xl mx-auto pt-6 pb-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative z-10">
                           <motion.div variants={fadeInUp} className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col items-center text-center h-full">
                              <div className="w-16 h-16 rounded-full bg-ewf-purple/10 flex items-center justify-center mb-6">
                                 <ShieldCheck className="w-8 h-8 text-ewf-purple" />
                              </div>
                              <h4 className="text-xl font-bold text-slate-900 mb-3">Enhanced Institutional Trust</h4>
                              <p className="text-slate-600 leading-relaxed text-sm">
                                 Launch new clean energy Bitcoin products: Trust, ETF, ETP, and Wrapped BTC (cBTC).
                              </p>
                              <div className="md:hidden mt-6 text-slate-300">
                                 <ArrowRight className="w-6 h-6 rotate-90" />
                              </div>
                              <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center text-slate-300 z-20">
                                 <ArrowRight className="w-6 h-6" />
                              </div>
                           </motion.div>

                           <motion.div variants={fadeInUp} className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col items-center text-center h-full">
                              <div className="w-16 h-16 rounded-full bg-sbp-cyan/10 flex items-center justify-center mb-6">
                                 <TrendingUp className="w-8 h-8 text-sbp-cyan" />
                              </div>
                              <h4 className="text-xl font-bold text-slate-900 mb-3">Accelerate Protocol Revenues</h4>
                              <p className="text-slate-600 leading-relaxed text-sm">
                                 Institutional scale drives token adoption, in turn accelerating more miner adoption, and in turn driving exponential protocol revenue.
                              </p>
                              <div className="md:hidden mt-6 text-slate-300">
                                 <ArrowRight className="w-6 h-6 rotate-90" />
                              </div>
                              <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center text-slate-300 z-20">
                                 <ArrowRight className="w-6 h-6" />
                              </div>
                           </motion.div>

                           <motion.div variants={fadeInUp} className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col items-center text-center h-full">
                              <div className="w-16 h-16 rounded-full bg-sbp-green/10 flex items-center justify-center mb-6">
                                 <RefreshCw className="w-8 h-8 text-sbp-green" />
                              </div>
                              <h4 className="text-xl font-bold text-slate-900 mb-3">Revenues Flow to EWT</h4>
                              <p className="text-slate-600 leading-relaxed text-sm">
                                 All net revenue accrues to Energy Web for <strong className="text-slate-900">EWT buybacks</strong> and token holder dividends.
                              </p>
                              <div className="md:hidden mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                 Cycle Repeats
                              </div>
                           </motion.div>
                        </div>

                        <div className="hidden md:block absolute left-0 right-0 top-full h-20 -mt-6 z-0 pointer-events-none">
                           <svg className="w-full h-full overflow-visible">
                              <path
                                 d="M 83.33% 0 L 83.33% 40 Q 83.33% 60 80% 60 L 20% 60 Q 16.66% 60 16.66% 40 L 16.66% 12"
                                 fill="none"
                                 stroke="#CBD5E1"
                                 strokeWidth="2"
                                 strokeDasharray="4 4"
                              />
                              <polygon points="16.66% 0, 15% 12, 18.33% 12" fill="#CBD5E1" />
                           </svg>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </section>

            {/* Token Issuance Calculator */}
            <section id="token-calculator" className="py-20 bg-white">
               <div className="container-deal">
                  <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, margin: "-100px" }}
                     variants={staggerContainer}
                  >
                     <motion.div variants={fadeInUp} className="text-center mb-6">
                        <p className="text-sbp-cyan font-semibold mb-2">Interactive Model</p>
                        <h2 className="text-4xl md:text-5xl font-black text-black mb-4">SBP Token Issuance Model</h2>
                        <p className="text-xl text-gray-600">Explore projected token issuance and protocol economics based on network adoption scenarios.</p>
                     </motion.div>

                     <motion.div variants={fadeInUp} className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                           {/* Inputs */}
                           <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                 <Calculator className="w-6 h-6 text-sbp-cyan" />
                                 Scenario Inputs
                              </h3>

                              <div className="space-y-6">
                                 {/* Time Period */}
                                 <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-3">Time Period</label>
                                    <div className="flex flex-wrap gap-2">
                                       {[1, 3, 6, 12, 18, 24].map((months) => (
                                          <button
                                             key={months}
                                             onClick={() => setTimePeriod(months)}
                                             className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timePeriod === months
                                                   ? 'bg-sbp-cyan text-white'
                                                   : 'bg-white text-slate-600 border border-slate-200 hover:border-sbp-cyan'
                                                }`}
                                          >
                                             {months} {months === 1 ? 'Month' : 'Months'}
                                          </button>
                                       ))}
                                    </div>
                                 </div>

                                 {/* Hashrate */}
                                 <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                       Hashrate Using Protocol: <span className="text-sbp-cyan">{hashratePercent}%</span>
                                    </label>
                                    <input
                                       type="range"
                                       min="5"
                                       max="100"
                                       value={hashratePercent}
                                       onChange={(e) => setHashratePercent(Number(e.target.value))}
                                       className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sbp-cyan"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                                       <span>5%</span>
                                       <span>100%</span>
                                    </div>
                                 </div>

                                 {/* SBP Price */}
                                 <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                       SBP Price (USD): <span className="text-sbp-cyan">${sbpPrice.toLocaleString()}</span>
                                    </label>
                                    <input
                                       type="range"
                                       min="1000"
                                       max="10000"
                                       step="100"
                                       value={sbpPrice}
                                       onChange={(e) => setSbpPrice(Number(e.target.value))}
                                       className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sbp-cyan"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                                       <span>$1,000</span>
                                       <span>$10,000</span>
                                    </div>
                                 </div>
                              </div>

                              {/* Model Assumptions */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                 <h4 className="text-sm font-semibold text-slate-500 mb-3">Model Assumptions</h4>
                                 <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex justify-between">
                                       <span className="text-slate-500">Max Daily SBP at 100%</span>
                                       <span className="font-mono text-slate-900">{calculatorResults.maxDailySBPAt100}</span>
                                    </div>
                                    <div className="flex justify-between">
                                       <span className="text-slate-500">Protocol Fee</span>
                                       <span className="font-mono text-slate-900">{calculatorResults.protocolFeePercent}%</span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Outputs */}
                           <div className="space-y-6">
                              {/* Current State */}
                              <div className="bg-slate-100 rounded-xl p-6">
                                 <h4 className="text-sm font-semibold text-slate-500 mb-4">Current State</h4>
                                 <div className="grid grid-cols-3 gap-4">
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Current SBP Issuance</p>
                                       <p className="text-2xl font-bold text-slate-900">{calculatorResults.currentSBPIssuance.toLocaleString()}</p>
                                    </div>
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Current Treasury</p>
                                       <p className="text-2xl font-bold text-slate-900">{calculatorResults.currentTreasury} SBP</p>
                                    </div>
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Treasury Value</p>
                                       <p className="text-2xl font-bold text-slate-900">${calculatorResults.currentTreasuryValue.toLocaleString()}</p>
                                    </div>
                                 </div>
                              </div>

                              {/* Projected Outputs */}
                              <div className="bg-sbp-cyan/10 rounded-xl p-6 border border-sbp-cyan/20">
                                 <h4 className="text-sm font-semibold text-sbp-cyan mb-4">Projected Outputs</h4>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Daily SBP Issuance</p>
                                       <p className="text-2xl font-bold text-slate-900">{calculatorResults.dailySBPIssuance.toLocaleString()}</p>
                                    </div>
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Total Days</p>
                                       <p className="text-2xl font-bold text-slate-900">{calculatorResults.totalDays.toLocaleString()}</p>
                                    </div>
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Projected Total Issued</p>
                                       <p className="text-2xl font-bold text-slate-900">{calculatorResults.projectedTotalIssued.toLocaleString()}</p>
                                    </div>
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Protocol Fee (SBP)</p>
                                       <p className="text-2xl font-bold text-slate-900">{calculatorResults.protocolFeeSBP.toLocaleString()}</p>
                                    </div>
                                    <div className="col-span-2">
                                       <p className="text-xs text-slate-500 mb-1">Protocol Fee (USD)</p>
                                       <p className="text-3xl font-bold text-sbp-cyan">${calculatorResults.protocolFeeUSD.toLocaleString()}</p>
                                    </div>
                                 </div>
                              </div>

                              {/* Future State */}
                              <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 border border-emerald-200">
                                 <h4 className="text-sm font-semibold text-emerald-600 mb-4">Future State</h4>
                                 <div className="grid grid-cols-3 gap-4">
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Total SBP Issuance</p>
                                       <p className="text-2xl font-bold text-slate-900">{calculatorResults.totalSBPIssuance.toLocaleString()}</p>
                                    </div>
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Future Treasury</p>
                                       <p className="text-2xl font-bold text-slate-900">{calculatorResults.futureTreasury.toLocaleString()}<span className="text-sm font-normal text-slate-500">SBP</span></p>
                                    </div>
                                    <div>
                                       <p className="text-xs text-slate-500 mb-1">Treasury Value (USD)</p>
                                       <p className="text-2xl font-bold text-emerald-600">${calculatorResults.treasuryValueUSD.toLocaleString()}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  </motion.div>
               </div>
            </section>

            {/* Synthetic SBP Token Issuance Model */}
            <section className="pt-0 pb-20 bg-slate-50">
               <div className="container-deal">
                  <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, margin: "-100px" }}
                     variants={staggerContainer}
                  >
                     {/* Header */}
                     <motion.div variants={fadeInUp} className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Synthetic SBP Token Issuance</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                           REC-backed minting to ensure market liquidity when organic supply cannot meet institutional demand.
                        </p>
                     </motion.div>

                     {/* Impact Banner */}
                     <motion.div variants={fadeInUp} className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 max-w-5xl mx-auto">
                        <div className="flex items-center justify-start flex-wrap gap-4">
                           <div className="flex items-center gap-3">
                              <div className="bg-emerald-500 rounded-full p-2">
                                 <Leaf size={16} className="text-white" />
                              </div>
                              <div>
                                 <p className="font-semibold text-emerald-800">Every synthetic token minted deploys capital directly to renewable energy</p>
                                 <p className="text-emerald-600 text-sm">REC purchases fund clean energy generation on high-carbon grids</p>
                              </div>
                           </div>
                           {/* <div className="text-right">
                    <p className="text-2xl font-black text-emerald-600">${(mwhPerToken * syntheticResults.REC_PRICE).toLocaleString()}</p>
                    <p className="text-emerald-600 text-xs">per token to clean energy</p>
                  </div> */}
                        </div>
                     </motion.div>

                     {/* Supply Constraint Banner */}
                     <motion.div variants={fadeInUp} className="bg-slate-100 rounded-2xl p-4 mb-6 max-w-5xl mx-auto">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                           <div className="flex items-center gap-3">
                              <div className="bg-sbp-cyan rounded-full p-2">
                                 <Info size={16} className="text-white" />
                              </div>
                              <div>
                                 <p className="text-slate-500 text-xs">Why Synthetic Minting is Necessary</p>
                                 <p className="font-semibold text-slate-700">~20M BTC already mined • Only ~1M remaining • Organic supply cannot meet institutional demand</p>
                              </div>
                           </div>
                           <button
                              onClick={() => setActiveModal('supplyConstraint')}
                              className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-slate-700"
                           >
                              Learn More
                           </button>
                        </div>
                     </motion.div>

                     <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                           {/* How It Works Card */}
                           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                              <div className="flex items-center gap-2 mb-4">
                                 <Zap className="text-sbp-cyan" size={20} />
                                 <h3 className="font-bold text-lg text-slate-900">How It Works</h3>
                              </div>
                              <p className="text-slate-600 text-sm mb-4">
                                 Each synthetic SBP token is backed by retiring Green-e® certified RECs equal to the energy consumed to mine one BTC on the issuance date. The MWh requirement is calculated daily using data from the Cambridge Centre for Alternative Finance Bitcoin Electricity Consumption Index.
                              </p>
                              <div className="flex flex-wrap gap-2">
                                 <button onClick={() => setActiveModal('methodology')} className="text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors text-slate-700">
                                    Calculation Method
                                 </button>
                                 <button onClick={() => setActiveModal('recStandards')} className="text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors text-slate-700">
                                    REC Standards
                                 </button>
                                 <button onClick={() => setActiveModal('energyweb')} className="text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors text-slate-700">
                                    EnergyWeb Role
                                 </button>
                              </div>
                           </div>

                           {/* Environmental Impact */}
                           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                              <div className="flex items-center gap-2 mb-4">
                                 <Leaf className="text-emerald-500" size={20} />
                                 <h3 className="font-bold text-lg text-slate-900">Environmental Impact</h3>
                              </div>

                              <div className="bg-emerald-50 rounded-xl p-4 mb-4">
                                 <p className="text-emerald-800 text-sm">
                                    <strong>High-Carbon Grid Targeting:</strong> RECs are sourced from grids with the highest carbon intensity (kg CO₂/MWh), maximizing displacement impact per MWh retired.
                                 </p>
                              </div>

                              <div className="bg-emerald-50 rounded-xl p-4 mb-4">
                                 <p className="text-emerald-800 text-sm">
                                    <strong>Direct Capital Flow:</strong> Every dollar spent on RECs flows directly into clean energy markets, creating demand signals that incentivize new renewable generation capacity.
                                 </p>
                              </div>

                              <div className="text-sm text-slate-600">
                                 <p className="mb-2">Data sources for grid carbon intensity:</p>
                                 <div className="flex flex-wrap gap-2">
                                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">EPA eGRID</span>
                                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">IEA Regional Data</span>
                                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">WattTime</span>
                                 </div>
                              </div>
                           </div>

                           {/* Revenue Model Card */}
                           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                              <div className="flex items-center gap-2 mb-6">
                                 <TrendingUp className="text-sbp-cyan" size={20} />
                                 <h3 className="font-bold text-lg text-slate-900">Revenue Model</h3>
                              </div>

                              {/* MWh per Token Slider */}
                              <div className="mb-6">
                                 <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                       <span className="text-slate-600 text-sm">MWh per SBP Token</span>
                                       <button onClick={() => setActiveModal('methodology')} className="p-1 hover:bg-sbp-cyan/10 rounded-full text-sbp-cyan transition-colors">
                                          <Info size={16} />
                                       </button>
                                    </div>
                                    <span className="text-sbp-cyan font-semibold">{mwhPerToken.toLocaleString()} MWh</span>
                                 </div>
                                 <input
                                    type="range"
                                    min="800"
                                    max="2500"
                                    value={mwhPerToken}
                                    onChange={(e) => setMwhPerToken(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sbp-cyan"
                                 />
                                 <div className="flex justify-between text-xs text-slate-400 mt-1">
                                    <span>800</span>
                                    <span className="text-sbp-cyan">1,193 (current)</span>
                                    <span>2,500</span>
                                 </div>
                                 <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                    <span>Data source:</span>
                                    <a href="https://ccaf.io/cbeci/index" target="_blank" rel="noopener noreferrer" className="text-sbp-cyan hover:underline inline-flex items-center gap-1">
                                       Cambridge Centre for Alternative Finance <ExternalLink size={10} />
                                    </a>
                                 </p>
                              </div>

                              {/* Tokens to Mint Slider */}
                              <div className="mb-6">
                                 <div className="flex justify-between mb-2">
                                    <span className="text-slate-600 text-sm">Tokens to Mint</span>
                                    <span className="text-sbp-cyan font-semibold">{tokensToMint.toLocaleString()}</span>
                                 </div>
                                 <input
                                    type="range"
                                    min="1"
                                    max="1000"
                                    value={tokensToMint}
                                    onChange={(e) => setTokensToMint(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sbp-cyan"
                                 />
                                 <div className="flex justify-between text-xs text-slate-400 mt-1">
                                    <span>1</span>
                                    <span>1,000</span>
                                 </div>
                              </div>

                              {/* Fixed Parameters */}
                              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                                 <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                       <span className="text-slate-600 text-sm">Green-e REC Price</span>
                                       <button onClick={() => setActiveModal('recPricing')} className="p-1 hover:bg-sbp-cyan/10 rounded-full text-sbp-cyan transition-colors">
                                          <Info size={16} />
                                       </button>
                                    </div>
                                    <div className="text-right">
                                       <span className="font-semibold">${syntheticResults.REC_PRICE.toFixed(2)}/MWh</span>
                                       <span className="text-xs text-slate-400 block">range: $1.50 – $5.00</span>
                                    </div>
                                 </div>
                                 <div className="flex justify-between">
                                    <span className="text-slate-600 text-sm">Minimum Margin</span>
                                    <span className="font-semibold">15%</span>
                                 </div>
                              </div>
                           </div>

                           {/* Projected Economics */}
                           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                              <p className="text-sbp-cyan font-semibold text-sm mb-4">Projected Economics</p>

                              <div className="grid grid-cols-2 gap-4 mb-6">
                                 <div>
                                    <p className="text-slate-500 text-sm">Total RECs Required</p>
                                    <p className="text-3xl font-black text-slate-900">{syntheticResults.recsRequired.toLocaleString()}</p>
                                    <p className="text-slate-400 text-sm">MWh</p>
                                 </div>
                                 <div>
                                    <p className="text-slate-500 text-sm">Capital to Clean Energy Markets</p>
                                    <p className="text-3xl font-black text-emerald-600">${syntheticResults.totalCost.toLocaleString()}</p>
                                    <p className="text-emerald-600 text-xs">Direct investment in renewables</p>
                                 </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-6">
                                 <div>
                                    <p className="text-slate-500 text-sm">Minimum Revenue</p>
                                    <p className="text-3xl font-black text-slate-900">${Math.round(syntheticResults.minSalePrice).toLocaleString()}</p>
                                 </div>
                                 <div>
                                    <p className="text-slate-500 text-sm">Protocol Margin</p>
                                    <p className="text-3xl font-black text-sbp-cyan">${Math.round(syntheticResults.marginTotal).toLocaleString()}</p>
                                 </div>
                              </div>

                              <div className="bg-gradient-to-r from-emerald-50 to-sbp-cyan/10 rounded-xl p-4">
                                 <div className="grid grid-cols-2 gap-4">
                                    <div>
                                       <p className="text-slate-500 text-sm">Cost per Token</p>
                                       <p className="text-xl font-bold">${Math.round(syntheticResults.costPerToken).toLocaleString()}</p>
                                       <p className="text-xs text-slate-400">range: ${Math.round(syntheticResults.costPerTokenLow).toLocaleString()} – ${Math.round(syntheticResults.costPerTokenHigh).toLocaleString()}</p>
                                    </div>
                                    <div>
                                       <p className="text-slate-500 text-sm">Margin per Token</p>
                                       <p className="text-xl font-bold text-sbp-cyan">${Math.round(syntheticResults.marginPerToken).toLocaleString()}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Price Floor Note */}
                           <div className="bg-slate-900 rounded-2xl p-5 text-white">
                              <p className="font-semibold mb-2">Built-in Price Floor</p>
                              <p className="text-slate-300 text-sm">
                                 The 15% minimum margin creates natural price discipline. If secondary market prices fall below minting costs, supply contracts until prices recover—protecting existing token holders.
                              </p>
                           </div>

                           {/* Post-Halving Note */}
                           <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                              <p className="font-semibold text-amber-800 mb-2">Post-Halving Impact</p>
                              <p className="text-amber-700 text-sm">
                                 After the next Bitcoin halving (~April 2028), daily issuance drops from 450 to 225 BTC. With the same network energy, MWh per BTC will approximately double—use the slider above to model this scenario.
                              </p>
                           </div>
                        </div>
                     </motion.div>

                     {/* Footer */}
                     <motion.div variants={fadeInUp} className="mt-8 text-center text-sm text-slate-400">
                        <p className="mb-1">Every token minted = direct capital to clean energy markets</p>
                        <p>Energy data: <a href="https://ccaf.io/cbeci/index" target="_blank" rel="noopener noreferrer" className="text-sbp-cyan hover:underline">Cambridge CBECI</a> • REC certification: Green-e® • Verification: EnergyWeb</p>
                     </motion.div>
                  </motion.div>
               </div>
            </section>

            {/* Modal for Synthetic Minting Info */}
            {mounted && activeModal && (
               <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setActiveModal(null)}>
                  <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                     <div className="flex justify-between items-center p-5 border-b">
                        <h3 className="font-bold text-lg text-slate-900">
                           {activeModal === 'supplyConstraint' && 'Supply Constraints'}
                           {activeModal === 'methodology' && 'Energy Calculation Methodology'}
                           {activeModal === 'recStandards' && 'REC Verification Standards'}
                           {activeModal === 'energyweb' && 'EnergyWeb Integration'}
                           {activeModal === 'recPricing' && 'REC Pricing'}
                        </h3>
                        <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                           <X size={20} />
                        </button>
                     </div>
                     <div className="p-5 text-slate-700">
                        {activeModal === 'supplyConstraint' && (
                           <div className="space-y-4">
                              <p className="text-slate-600">{"Bitcoin's fixed supply creates a hard ceiling on organic SBP token issuance:"}</p>
                              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                                 <div className="flex justify-between"><span>Already mined (before SBP)</span><span className="font-semibold">~20 million BTC</span></div>
                                 <div className="flex justify-between"><span>Remaining to ever be mined</span><span className="font-semibold">~1 million BTC</span></div>
                                 <div className="flex justify-between"><span>Current daily issuance</span><span className="font-semibold">450 BTC/day</span></div>
                                 <div className="flex justify-between"><span>Post-halving (April 2028)</span><span className="font-semibold">225 BTC/day</span></div>
                                 <div className="flex justify-between border-t pt-3 mt-3"><span className="font-semibold">Maximum organic SBP supply</span><span className="font-bold text-sbp-cyan">~1 million tokens</span></div>
                              </div>
                              <p className="text-slate-600 text-sm">Even with 100% miner adoption, organic SBP issuance is capped at ~1 million tokens <em>ever</em>. Synthetic minting is the only mechanism that allows SBP to scale with institutional demand.</p>
                           </div>
                        )}
                        {activeModal === 'methodology' && (
                           <div className="space-y-4">
                              <p className="text-slate-600">Using Cambridge Centre for Alternative Finance (CBECI) data:</p>
                              <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                                 <div className="flex justify-between"><span>1. Network energy (annualized)</span><span>196 TWh</span></div>
                                 <div className="flex justify-between"><span>2. Convert to MWh</span><span>196,000,000 MWh</span></div>
                                 <div className="flex justify-between"><span>3. Daily consumption</span><span>536,986 MWh</span></div>
                                 <div className="flex justify-between"><span>4. Daily BTC issuance</span><span>450 BTC</span></div>
                                 <div className="flex justify-between border-t pt-2 mt-2 font-semibold"><span>5. MWh per BTC</span><span className="text-sbp-cyan">1,193 MWh</span></div>
                              </div>
                              <p className="text-slate-600 text-sm">This value is recalculated daily based on network conditions. After halving events, the MWh/BTC increases as daily issuance drops.</p>
                              <a href="https://ccaf.io/cbeci/index" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sbp-cyan text-sm hover:underline">
                                 View CBECI Data <ExternalLink size={14} />
                              </a>
                           </div>
                        )}
                        {activeModal === 'recStandards' && (
                           <div className="space-y-4">
                              <p className="text-slate-600">All RECs must meet these requirements:</p>
                              <ul className="space-y-2 text-sm text-slate-600">
                                 <li className="flex items-start gap-2"><span className="text-sbp-cyan mt-1">•</span>Green-e® certified (or international equivalent)</li>
                                 <li className="flex items-start gap-2"><span className="text-sbp-cyan mt-1">•</span>Generated within 24 months of retirement</li>
                                 <li className="flex items-start gap-2"><span className="text-sbp-cyan mt-1">•</span>Never previously claimed for any environmental attribute</li>
                                 <li className="flex items-start gap-2"><span className="text-sbp-cyan mt-1">•</span>Publicly disclosed with registry serial numbers</li>
                              </ul>
                              <div className="bg-amber-50 rounded-lg p-3 mt-4">
                                 <p className="text-sm text-amber-800"><strong>High-Carbon Grid Priority:</strong> RECs are sourced from the dirtiest grids (measured by kg CO₂/MWh) to maximize carbon displacement per MWh retired.</p>
                              </div>
                           </div>
                        )}
                        {activeModal === 'energyweb' && (
                           <div className="space-y-4">
                              <p className="text-slate-600">EnergyWeb infrastructure enables trustworthy verification:</p>
                              <div className="space-y-3">
                                 <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="font-semibold text-sm">REC Registry Connectivity</p>
                                    <p className="text-sm text-slate-600">Direct integration with Green-e and international registries ensures retirement claims are verifiable on-chain.</p>
                                 </div>
                                 <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="font-semibold text-sm">Grid Carbon Data</p>
                                    <p className="text-sm text-slate-600">Real-time emissions data enables transparent prioritization of high-impact retirements.</p>
                                 </div>
                                 <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="font-semibold text-sm">Issuance Audit Trail</p>
                                    <p className="text-sm text-slate-600">Every synthetic token links to specific REC serial numbers, generation facilities, and retirement timestamps.</p>
                                 </div>
                              </div>
                           </div>
                        )}
                        {activeModal === 'recPricing' && (
                           <div className="space-y-4">
                              <p className="text-slate-600">Green-e certified REC prices vary based on market conditions and grid source:</p>
                              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                                 <div className="flex justify-between"><span>Low estimate</span><span className="font-semibold">$1.50/MWh</span></div>
                                 <div className="flex justify-between text-sbp-cyan"><span>Model default</span><span className="font-semibold">$3.00/MWh</span></div>
                                 <div className="flex justify-between"><span>High estimate</span><span className="font-semibold">$5.00/MWh</span></div>
                              </div>
                              <p className="text-slate-600 text-sm">High-carbon grid RECs may command premium pricing due to greater environmental impact per MWh. The 15% minimum margin ensures protocol sustainability across price fluctuations.</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )}

            {/* 2026 Objectives and KPIs */}
            <section id="objectives" className="py-20 bg-gradient-to-br from-gray-900 to-deep-navy">
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

                     <motion.div variants={fadeInUp} className="glass-card-dark rounded-2xl p-8 max-w-4xl mx-auto">
                        <div className="space-y-4">
                           {[
                              { title: 'List SBP token on centralized exchanges: Kraken, SwissQuote, etc.', status: 'active' },
                              { title: 'Launch Clean BTC Trust (US)', status: 'active' },
                              { title: 'Launch Clean Wrapped BTC (Base/Canton)', status: 'pending' },
                              { title: 'Launch ETF (US) or ETP (EU)', status: 'pending' },
                              { title: 'Hit 35% Network Hashrate', status: 'pending' },
                              { title: 'Generate $2.5M Revenue', status: 'pending' },
                           ].map((objective, index) => (
                              <div
                                 key={index}
                                 className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${objective.status === 'active'
                                       ? 'bg-deal-gold/10 border-deal-gold/30'
                                       : 'bg-white/5 border-white/10'
                                    }`}
                              >
                                 <div className={`w-3 h-3 rounded-full ${objective.status === 'active' ? 'bg-deal-gold' : 'bg-slate-500'
                                    }`} />
                                 <span className={`font-semibold flex-1 ${objective.status === 'active' ? 'text-white' : 'text-gray-400'
                                    }`}>
                                    {objective.title}
                                 </span>
                                 {objective.status === 'active' && (
                                    <span className="text-xs bg-deal-gold/20 text-deal-gold px-3 py-1 rounded-full">
                                       In Progress
                                    </span>
                                 )}
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
                        © 2026 - Energy Web Foundation • Sustainable Bitcoin Protocol: Confidential Merger Materials
                     </div>
                     <div>
                        Deal Room Only : Non-Binding
                     </div>
                  </div>
               </div>
            </footer>
         </main>
      </>
   )
}
