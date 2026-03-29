'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DetailDrawer } from '@/components/DetailDrawer'
import type { IconRecord } from '@/lib/types'

type QuickViewClientProps = {
  icons: IconRecord[]
}

export function QuickViewClient({ icons }: QuickViewClientProps) {
  const [activeIcon, setActiveIcon] = useState<IconRecord | null>(null)

  return (
    <section className="min-h-screen bg-[#eef4fb] p-1 sm:p-2">
      <div className="grid grid-cols-4 gap-1 sm:grid-cols-6 sm:gap-1.5 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-14">
        {icons.map((icon) => (
          <button
            key={icon.id}
            type="button"
            aria-label={icon.name}
            onClick={() => setActiveIcon(icon)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:z-10 hover:scale-105 hover:shadow-lg"
          >
            {icon.thumbnail ? (
              <Image
                src={icon.thumbnail}
                alt={icon.name}
                fill
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 8vw"
                className="object-contain p-1"
              />
            ) : null}
          </button>
        ))}
      </div>

      <DetailDrawer icon={activeIcon} onClose={() => setActiveIcon(null)} />
    </section>
  )
}
