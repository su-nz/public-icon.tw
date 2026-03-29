import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { AppChrome } from '@/components/AppChrome'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'
import './globals.css'

const GA_MEASUREMENT_ID = 'G-JVPSZR55C1'

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <div className="relative min-h-screen overflow-x-hidden">
          <AppChrome>{children}</AppChrome>
        </div>
      </body>
    </html>
  )
}
