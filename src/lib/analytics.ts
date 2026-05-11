import type { IconRecord } from '@/lib/types'

type IconInteractionAction = 'download' | 'copy'
type IconFileFormat = 'ai' | 'eps' | 'jpg' | 'png'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackIconInteraction(
  action: IconInteractionAction,
  icon: IconRecord,
  format: IconFileFormat,
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  const eventName = action === 'download' ? 'icon_download' : 'icon_copy'

  window.gtag('event', eventName, {
    icon_id: icon.id,
    icon_name: icon.name,
    icon_code: icon.code,
    category: icon.category,
    category_name: icon.categoryName,
    file_format: format,
    standard: icon.standard,
  })
}
