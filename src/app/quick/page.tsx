import type { Metadata } from 'next'
import inventory from '@/lib/inventory.json'
import { QuickViewClient } from '@/components/QuickViewClient'
import type { Inventory } from '@/lib/types'

const typedInventory = inventory as Inventory

export const metadata: Metadata = {
  title: 'Quick View 速覽',
  description: '以高密度格線快速瀏覽 public-icon.tw 圖標。',
  alternates: {
    canonical: '/quick',
  },
}

export default function QuickPage() {
  return <QuickViewClient icons={typedInventory.icons} />
}
