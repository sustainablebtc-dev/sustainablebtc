import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Energy Web × Sustainable Bitcoin Protocol | The Global Standard for Clean Bitcoin',
  description: 'The merger of Energy Web and Sustainable Bitcoin Protocol creates the institutional-grade standard for clean, audited Bitcoin mining.',
  keywords: ['Bitcoin', 'Clean Energy', 'Blockchain', 'Sustainable Mining', 'Energy Web', 'SBP'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}

