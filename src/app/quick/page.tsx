import inventory from '@/lib/inventory.json'
import { QuickViewClient } from '@/components/QuickViewClient'
import type { Inventory } from '@/lib/types'

const typedInventory = inventory as Inventory

export default function QuickPage() {
  return <QuickViewClient icons={typedInventory.icons} />
}
