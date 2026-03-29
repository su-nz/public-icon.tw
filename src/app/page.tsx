import inventory from '@/lib/inventory.json'
import { HomeClient } from '@/components/HomeClient'
import type { Inventory } from '@/lib/types'

const typedInventory = inventory as Inventory

export default function HomePage() {
  return <HomeClient inventory={typedInventory} />
}
