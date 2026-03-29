'use client'

import { IconCard } from '@/components/IconCard'
import type { IconRecord } from '@/lib/types'

type IconGridProps = {
  icons: IconRecord[]
  copiedIconId: string | null
  isMobileJpgAction: boolean
  onCopyJpg: (icon: IconRecord) => void
  onOpenDetail: (icon: IconRecord) => void
}

export function IconGrid({ icons, copiedIconId, isMobileJpgAction, onCopyJpg, onOpenDetail }: IconGridProps) {
  if (icons.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-soft">
        <p className="text-lg font-bold text-slate-900">找不到符合的圖標</p>
        <p className="mt-2 text-sm text-slate-600">請調整搜尋關鍵字或切換分類。</p>
      </div>
    )
  }

  return (
    <div className="icon-grid-auto">
      {icons.map((icon) => {
        return (
          <IconCard
            key={icon.id}
            icon={icon}
            isCopied={copiedIconId === icon.id}
            isMobileJpgAction={isMobileJpgAction}
            onCopyJpg={onCopyJpg}
            onOpenDetail={onOpenDetail}
          />
        )
      })}
    </div>
  )
}
