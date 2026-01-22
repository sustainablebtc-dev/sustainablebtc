'use client'
import { usePathname } from 'next/navigation'
import Header from "@/components/HeaderFooter/Header"
import Footer from "@/components/Footer"
import Breadcrum from "@/components/Breadcrum"
import ProgressBar from "@/components/ProgressBar"
import { ReactNode } from 'react'

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isEnergyWeb = pathname?.startsWith('/energyweb')

  return (
     <>
       {!isEnergyWeb && <ProgressBar />}
       {!isEnergyWeb && <Header />}
       {!isEnergyWeb && <Breadcrum />}
       <main>{children}</main>
       {!isEnergyWeb && <Footer />}
     </>
  )
}
