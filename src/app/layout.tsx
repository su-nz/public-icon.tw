import type { Metadata } from 'next'
import { Noto_Sans_TC, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { AppChrome } from '@/components/AppChrome'
import { SITE_BRAND, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const GA_MEASUREMENT_ID = 'G-JVPSZR55C1'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

const notoSansTc = Noto_Sans_TC({
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  variable: '--font-noto-sans-tc',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_BRAND}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: SITE_URL,
    title: `${SITE_NAME} | ${SITE_BRAND}`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: '/icons/A-001.jpg',
        width: 512,
        height: 512,
        alt: '台灣公共圖標素材庫（public-icon.tw）',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | ${SITE_BRAND}`,
    description: SITE_DESCRIPTION,
    images: ['/icons/A-001.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
      <body className={`${plusJakartaSans.variable} ${notoSansTc.variable} font-sans`}>
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
