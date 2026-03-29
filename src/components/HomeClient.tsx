'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { CategorySidebar } from '@/components/CategorySidebar'
import { CategoryTabs } from '@/components/CategoryTabs'
import { DetailDrawer } from '@/components/DetailDrawer'
import { FloatingIconCarousel } from '@/components/FloatingIconCarousel'
import { IconGrid } from '@/components/IconGrid'
import type { IconRecord, Inventory } from '@/lib/types'

type HomeClientProps = {
  inventory: Inventory
}

export function HomeClient({ inventory }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeIcon, setActiveIcon] = useState<IconRecord | null>(null)
  const [copiedIconId, setCopiedIconId] = useState<string | null>(null)

  const filteredIcons = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return inventory.icons.filter((icon) => {
      const passCategory = activeCategory === 'all' || icon.category === activeCategory
      if (!passCategory) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchable = [icon.name, icon.code, icon.categoryName, icon.id].join(' ').toLowerCase()
      return searchable.includes(normalizedQuery)
    })
  }, [activeCategory, inventory.icons, searchQuery])

  async function handleCopyJpg(icon: IconRecord) {
    if (!icon.filePaths.jpg) {
      return
    }

    try {
      const response = await fetch(icon.filePaths.jpg)
      const blob = await response.blob()

      if (typeof ClipboardItem !== 'undefined' && 'write' in navigator.clipboard) {
        const item = new ClipboardItem({ [blob.type || 'image/jpeg']: blob })
        await navigator.clipboard.write([item])
      } else {
        await navigator.clipboard.writeText(icon.filePaths.jpg)
      }

      setCopiedIconId(icon.id)
      window.setTimeout(() => {
        setCopiedIconId((current) => (current === icon.id ? null : current))
      }, 1300)
    } catch (error) {
      console.error('Copy JPG failed', error)
    }
  }

  return (
    <section className="relative pb-10">
      <div className="pointer-events-none absolute left-[-120px] top-[-80px] -z-10 h-[360px] w-[360px] rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-100px] top-[20px] -z-10 h-[320px] w-[320px] rounded-full bg-cyan-300/30 blur-3xl" />

      <div className="mx-auto w-full max-w-8xl px-4 pt-10 sm:px-6">
        <header className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/90 px-6 py-8 shadow-soft backdrop-blur sm:px-8 lg:px-10 lg:py-10">
          <div>
            <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
              CNS16282 Public Icons
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              台灣公共圖標素材庫
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                直接搜尋，立即下載
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              收錄 {inventory.totalCount} 個圖標，支援複製 JPG、AI / EPS / JPG 下載與官方來源索引。
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <a
                href="https://www.tdri.org.tw/zh-TW/design-resource/CNS16282"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                官方資源
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=nwHCwaP_AqQ"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                說明影片
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <FloatingIconCarousel icons={inventory.icons} onSelectIcon={setActiveIcon} />
          </div>
        </header>

        <div className="mt-8 grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <CategorySidebar
            categories={inventory.categories}
            activeCategory={activeCategory}
            onChangeCategory={setActiveCategory}
          />

          <div>
            <div className="sticky top-16 z-30 mb-4 rounded-2xl border border-blue-100 bg-white/90 p-3 shadow-soft backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="relative block w-full sm:max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="搜尋圖標名稱、代碼、分類"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  />
                </label>

                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                  <span>結果</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-blue-800">{filteredIcons.length}</span>
                </div>
              </div>

              <div className="mt-3">
                <CategoryTabs
                  categories={inventory.categories}
                  activeCategory={activeCategory}
                  onChangeCategory={setActiveCategory}
                />
              </div>
            </div>

            <IconGrid
              icons={filteredIcons}
              copiedIconId={copiedIconId}
              onCopyJpg={handleCopyJpg}
              onOpenDetail={setActiveIcon}
            />
          </div>
        </div>
      </div>

      <DetailDrawer icon={activeIcon} onClose={() => setActiveIcon(null)} />
    </section>
  )
}
