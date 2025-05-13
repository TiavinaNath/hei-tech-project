'use client'

import { usePathname } from 'next/navigation'
import Navbar from '../../../components/ui/Navbar'

export default function StaticNavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <>
      {isHome && <Navbar />}
      {children}
    </>
  )
}
