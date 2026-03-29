import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { AppChrome } from '@/components/AppChrome'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/icons/A-001.jpg',
    shortcut: '/icons/A-001.jpg',
    apple: '/icons/A-001.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${plusJakartaSans.variable} font-sans`}>
        <div className="relative min-h-screen overflow-x-hidden">
          <AppChrome>{children}</AppChrome>
        </div>
      </body>
    </html>
  )
}
