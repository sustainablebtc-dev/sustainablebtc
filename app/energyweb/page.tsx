'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
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
  RefreshCw,
  Lock,
  Code
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

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
    { id: 'sbp-traction', name: 'SBP Traction' },
    { id: 'green-flywheel', name: 'Flywheel' },
    { id: 'org-structure', name: 'Org Structure' },
    { id: 'deal-terms', name: 'Deal Structure' },
    { id: 'milestones', name: 'Roadmap' },
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
            <p className="text-gray-400">Please enter the password to view the deal proposal.</p>
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
              {/* Proposal Index Dropdown */}
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
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Executive Summary</h2>
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
                  Acquire SBP to replace GP4BTC with a revenue-generating clean energy bitcoin protocol. The combined entity becomes the standard for regulated, ESG-compliant Bitcoin products.
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
            <motion.div variants={fadeInUp} className="text-center mb-6 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-[#5D2E8C] to-[#00C2FF] bg-clip-text text-transparent">Revenue Flywheel</span>
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
          </motion.div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section id="org-structure" className="py-20 bg-white">
        <div className="container-deal">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Organizational Structure</h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-deal rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center w-full">
                  {/* Level 1: Ed Hesse */}
                  <div className="text-center p-6 bg-ewf-purple/10 rounded-xl w-64 border border-ewf-purple/20 z-10 relative">
                    <div className="font-bold text-xl text-black">Ed Hesse</div>
                    <div className="text-sm text-gray-600">CEO, EnergyWeb</div>
                  </div>
                  
                  {/* Connector 1 */}
                  <div className="w-px h-8 bg-gray-300"></div>

                  {/* Level 2: Brad van Voorhees */}
                  <div className="text-center p-6 bg-sbp-cyan/10 rounded-xl w-64 border border-sbp-cyan/20 z-10 relative">
                    <div className="font-bold text-xl text-black">Brad van Voorhees</div>
                    <div className="text-sm text-gray-600">CEO, SBP</div>
                  </div>

                  {/* Connector 2 & Branching */}
                  <div className="flex flex-col items-center w-full">
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="relative w-full max-w-2xl h-8 hidden md:block">
                        {/* Horizontal Line connecting centers of children */}
                        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gray-300"></div>
                        
                        {/* Vertical Lines down to children */}
                        <div className="absolute top-0 left-1/4 w-px h-full bg-gray-300"></div>
                        <div className="absolute top-0 right-1/4 w-px h-full bg-gray-300"></div>
                    </div>
                  </div>

                  {/* Level 3: Matt & Elliot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                    <div className="flex justify-center">
                        <div className="text-center p-6 bg-sbp-cyan/10 rounded-xl w-full max-w-xs border border-sbp-cyan/20 h-full flex flex-col justify-center">
                            <div className="font-bold text-lg text-black">Matt Twomey</div>
                            <div className="text-sm text-gray-600">Head of Institutional, SBP</div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="text-center p-6 bg-sbp-cyan/10 rounded-xl w-full max-w-xs border border-sbp-cyan/20 h-full flex flex-col justify-center">
                            <div className="font-bold text-lg text-black">Elliot David</div>
                            <div className="text-sm text-gray-600">Head of Miner Engagement and Climate Strategy, SBP</div>
                        </div>
                    </div>
                  </div>

                  <p className="text-center text-sm text-gray-600 italic pt-20">
                    &ldquo;SBP leadership executes aligned strategy while reporting to Ed Hesse&rdquo;
                  </p>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Deal Terms / Financials */}
      <section id="deal-terms" className="pt-0 pb-20 bg-gray-50">
        <div className="container-deal">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
             <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Deal Structure</h2>
            </motion.div>

            {/* Directional Summary */}
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-12 text-center">
              <h3 className="text-2xl font-bold text-black mb-4">Directional Summary</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                The objective of the merger is to provide a layer of downside risk to both parties, while maximizing revenue accrual for EWF and performance based upside for SBP
              </p>
            </motion.div>

             <motion.div variants={fadeInUp} className="glass-deal rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-black justify-center">
                  Financial Terms
                </h3>
                
                <div className="space-y-10 text-left">
                  {/* Group 1: OpEx Coverage */}
                  <div>
                    <h4 className="text-xl font-bold text-black mb-4 border-b border-gray-200 pb-2">OpEx Coverage (12-Month Runway)</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monthly Value</span>
                        <span className="font-bold text-xl text-black">$50k / month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Details</span>
                        <span className="text-right text-black font-medium">Covers core salaries, office, travel</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Duration</span>
                        <span className="text-right text-black font-medium">12 months post-close</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 italic mt-3">
                      (This anchors continuity and execution capacity.)
                    </p>
                  </div>

                  {/* Group 2: Transaction Consideration */}
                  <div>
                    <h4 className="text-xl font-bold text-black mb-4 border-b border-gray-200 pb-2">Transaction Consideration (KPI-Linked)</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start px-4">
                        <span className="text-gray-600 pt-1">Total Consideration</span>
                        <div className="text-right">
                          <div className="font-bold text-xl text-black">$25m</div>
                        </div>
                      </div>
                      <div className="bg-white/40 rounded-xl p-4 space-y-2 border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Energy Web Tokens</span>
                          <span className="font-bold text-black">$7.5m</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Acquirer Equity</span>
                          <span className="font-bold text-black">$17.5m</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 italic mt-3">
                      (This anchors valuation and alignment.)
                    </p>
                  </div>
                </div>
              </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Milestones & Earn-Out */}
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
                Milestones & Earn-Out
              </h2>
              <p className="text-xl text-gray-400">12-month KPIs</p>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={fadeInUp} className="glass-card-dark rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  { 
                    title: 'Launch Clean BTC Trust (US)', 
                    icon: Building2, 
                    status: 'active',
                    details: 'Clean Energy BTC Trust with $50m plus AUM listed by reputable issuer'
                  },
                  { 
                    title: 'Launch Clean Wrapped BTC (Base/Canton)', 
                    icon: Zap, 
                    status: 'active',
                    details: 'Clean Wrapped BTC issued on Canton Network, Hedera, or Base with network support'
                  },
                  { 
                    title: 'Launch ETF (US) or ETP (EU)', 
                    icon: TrendingUp, 
                    status: 'pending',
                    details: 'Before EOY have signed agreement for ETF or ETP issuance from leading issuer'
                  },
                  { 
                    title: 'Hit 35% Network Hashrate', 
                    icon: Target, 
                    status: 'pending',
                    details: '35% of Bitcoin network hashrate has created an account or actively using SBP'
                  },
                  { 
                    title: 'Generate $2.5M Revenue', 
                    icon: DollarSign, 
                    status: 'pending',
                    details: 'Generate $2.5m in revenue, the aggregate of SBP tokens at market value, BTC, and dollars.'
                  },
                  {
                    title: 'Implement EWT clean Bitcoin transactions protocol to SBP platform',
                    icon: Code,
                    status: 'pending',
                    details: 'Implement EWT clean transaction protocols to the SBP website so miners can seamlessly onboard to EWT protocol.'
                  }
                ].map((milestone, index) => (
                  <div key={index} className="group relative flex items-center gap-4">
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[28rem] p-5 bg-gray-900 text-white text-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-white/10 shadow-xl leading-relaxed">
                      {milestone.details}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                    </div>

                    <div className={`timeline-dot ${milestone.status === 'active' ? 'timeline-dot-active' : 'timeline-dot-pending'}`} />
                    <div className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10 cursor-help">
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
              <div className="mt-8 p-4 bg-deal-gold/10 border border-deal-gold/30 rounded-xl text-center">
                <p className="text-deal-gold font-semibold">
                  Achieving all milestones will result in increased deal consideration terms
                </p>
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
              © 2025 - Energy Web Foundation • Sustainable Bitcoin Protocol: Confidential Merger Materials
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
