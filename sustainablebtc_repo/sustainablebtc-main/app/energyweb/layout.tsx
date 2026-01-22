import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SBP Acquisition Proposal | Energy Web Foundation',
  description: 'Strategic acquisition proposal for Sustainable Bitcoin Protocol by Energy Web Foundation - Board Review Materials',
  robots: 'noindex, nofollow', // Private deal room
}

export default function EnergyWebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.variable}>
      {children}
    </div>
  )
}
