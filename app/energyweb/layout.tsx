import type { Metadata } from 'next'

// Energy Web Strategic Proposal - December 2025 - v1.0
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
  return <>{children}</>
}
