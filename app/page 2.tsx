'use client'

import { motion } from 'framer-motion'
import { Building2, Coins, Leaf, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 gradient-mesh-overlay">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] gradient-mesh opacity-20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sbp-cyan opacity-10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Announcement Badge */}
            <motion.div variants={fadeInUp} className="mb-8 inline-block">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ewf-purple/10 border border-ewf-purple/20 rounded-full text-sm font-medium text-ewf-purple">
                <CheckCircle2 className="w-4 h-4" />
                Merger Complete: Energy Web × Sustainable Bitcoin Protocol
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-balance"
            >
              The Global Standard for{' '}
              <span className="gradient-text">Clean Bitcoin</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Institutional-grade verification for sustainable Bitcoin mining. 
              Trusted by the world's largest asset managers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary group">
                For Institutions
                <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="btn-secondary">
                For Miners
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16 pt-16 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider font-semibold">
                Backed By Leading Institutions
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
                <div className="text-2xl font-bold text-gray-400">BlackRock</div>
                <div className="text-2xl font-bold text-gray-400">Coinbase</div>
                <div className="text-2xl font-bold text-gray-400">21Shares</div>
                <div className="text-2xl font-bold text-gray-400">Bitwise</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Green Flywheel Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-black mb-6">
              The <span className="text-sbp-green">Green Flywheel</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              A self-reinforcing cycle that accelerates the adoption of clean Bitcoin mining
            </motion.p>
          </motion.div>

          {/* Three Step Process */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative"
          >
            {/* Step 1 */}
            <motion.div variants={scaleIn} className="process-step group">
              <div className="mb-6 relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-ewf-purple to-ewf-purple/70 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  <Building2 className="w-16 h-16 text-white" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-ewf-purple font-bold text-ewf-purple text-xl">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Institutional Adoption</h3>
              <p className="text-gray-600 leading-relaxed">
                Major asset managers demand verified, clean Bitcoin exposure for ESG compliance
              </p>
            </motion.div>

            {/* Arrow Connector - Desktop */}
            <div className="hidden md:block absolute top-16 left-1/3 w-1/3 h-1 bg-gradient-to-r from-ewf-purple via-sbp-cyan to-sbp-green" style={{ transform: 'translateX(-50%)' }} />
            <div className="hidden md:block absolute top-16 right-1/3 w-1/3 h-1 bg-gradient-to-r from-sbp-cyan via-sbp-green to-ewf-purple" style={{ transform: 'translateX(50%)' }} />

            {/* Step 2 */}
            <motion.div variants={scaleIn} className="process-step group">
              <div className="mb-6 relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-sbp-cyan to-sbp-cyan/70 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  <Coins className="w-16 h-16 text-white" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-sbp-cyan font-bold text-sbp-cyan text-xl">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Protocol Revenue</h3>
              <p className="text-gray-600 leading-relaxed">
                Certification fees and institutional partnerships generate sustainable revenue streams
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={scaleIn} className="process-step group">
              <div className="mb-6 relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-sbp-green to-sbp-green/70 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  <Leaf className="w-16 h-16 text-white" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-sbp-green font-bold text-sbp-green text-xl">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Token Buybacks & Renewable Funding</h3>
              <p className="text-gray-600 leading-relaxed">
                Revenue funds token buybacks and direct investment in renewable mining infrastructure
              </p>
            </motion.div>
          </motion.div>

          {/* Circular Flow Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className="w-5 h-5 text-sbp-green" />
              </motion.div>
              <span className="text-sm font-semibold text-gray-700">Self-Reinforcing Growth</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Metrics Strip */}
      <section className="py-20 bg-deep-navy relative overflow-hidden">
        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sbp-green opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sbp-cyan opacity-10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12 text-center"
          >
            {/* Metric 1 */}
            <motion.div variants={fadeInUp}>
              <div className="neon-glow neon-glow-pulse text-6xl md:text-7xl font-black mb-4">
                25%
              </div>
              <div className="text-gray-400 text-lg font-medium">Global Hashrate</div>
              <div className="text-gray-500 text-sm mt-2">Verified Clean Energy</div>
            </motion.div>

            {/* Metric 2 */}
            <motion.div variants={fadeInUp}>
              <div className="neon-glow neon-glow-pulse text-6xl md:text-7xl font-black mb-4">
                AAA
              </div>
              <div className="text-gray-400 text-lg font-medium">Institutional Grade</div>
              <div className="text-gray-500 text-sm mt-2">Audit & Compliance</div>
            </motion.div>

            {/* Metric 3 */}
            <motion.div variants={fadeInUp}>
              <div className="neon-glow neon-glow-pulse text-6xl md:text-7xl font-black mb-4">
                100%
              </div>
              <div className="text-gray-400 text-lg font-medium">Audit Verified</div>
              <div className="text-gray-500 text-sm mt-2">Third-Party Certified</div>
            </motion.div>
          </motion.div>

          {/* Real-time Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-sbp-green rounded-full"
            />
            <span className="text-gray-400 text-sm font-medium">Live Network Data</span>
          </motion.div>
        </div>
      </section>

      {/* Strategic Partners Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-black mb-6">
              Strategic Partners
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Collaborating with the world's leading financial institutions and crypto platforms
            </motion.p>
          </motion.div>

          {/* Partner Logos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {[
              { name: 'BlackRock', color: 'from-gray-700 to-gray-900' },
              { name: 'Coinbase', color: 'from-blue-600 to-blue-800' },
              { name: '21Shares', color: 'from-orange-500 to-red-600' },
              { name: 'Bitwise', color: 'from-purple-600 to-pink-600' },
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                variants={scaleIn}
                className="partner-logo flex items-center justify-center h-32 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-xl cursor-pointer group"
              >
                <div className={`text-2xl font-bold bg-gradient-to-br ${partner.color} bg-clip-text text-transparent`}>
                  {partner.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Become a Partner CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-ewf-purple hover:text-ewf-purple transition-all duration-300 hover:shadow-lg">
              Become a Partner
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-navy text-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-ewf-purple to-sbp-cyan rounded-lg" />
                <div className="font-black text-xl">EW × SBP</div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Setting the global standard for clean, institutional-grade Bitcoin through 
                verified renewable energy certification.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-sbp-green transition-colors">
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sbp-green transition-colors">
                    Governance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sbp-green transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sbp-green transition-colors">
                    Audit Reports
                  </a>
                </li>
              </ul>
            </div>

            {/* Get Started */}
            <div>
              <h4 className="font-bold text-lg mb-4">Get Started</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-sbp-green transition-colors">
                    Get Certified
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sbp-green transition-colors">
                    For Institutions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sbp-green transition-colors">
                    For Miners
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sbp-green transition-colors">
                    Contact Sales
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2025 Energy Web × Sustainable Bitcoin Protocol. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

