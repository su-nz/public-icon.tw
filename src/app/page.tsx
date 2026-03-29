import type { Metadata } from 'next'
import inventory from '@/lib/inventory.json'
import { HomeClient } from '@/components/HomeClient'
import { SITE_DESCRIPTION, SITE_NAME, toSiteUrl } from '@/lib/site'
import type { Inventory } from '@/lib/types'

const typedInventory = inventory as Inventory

export const metadata: Metadata = {
  title: '台灣公共圖標素材庫',
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: `${SITE_NAME} | 台灣公共圖標素材庫`,
    description: SITE_DESCRIPTION,
  },
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: toSiteUrl('/'),
    inLanguage: 'zh-Hant',
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: toSiteUrl('/'),
    },
    mainEntity: {
      '@type': 'CollectionPage',
      name: '台灣公共圖標素材庫',
      url: toSiteUrl('/'),
      about: 'CNS16282 圖形符號與公共圖標下載、授權與來源索引',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <HomeClient inventory={typedInventory} />
    </>
  )
}
