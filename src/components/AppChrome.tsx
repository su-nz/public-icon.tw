'use client'

import { usePathname } from 'next/navigation'
import { BackToTopButton } from '@/components/BackToTopButton'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

type AppChromeProps = {
  children: React.ReactNode
}

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname()
  const isQuickViewPage = pathname === '/quick'

  if (isQuickViewPage) {
    return (
      <>
        <main>{children}</main>
        <BackToTopButton />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTopButton />
    </>
  )
}
