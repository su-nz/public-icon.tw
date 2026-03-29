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
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
        <BackToTopButton />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  )
}
