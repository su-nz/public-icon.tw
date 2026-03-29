'use client'

import type { CategoryRecord } from '@/lib/types'

type CategorySidebarProps = {
  categories: CategoryRecord[]
  activeCategory: string
  onChangeCategory: (categoryId: string) => void
}

export function CategorySidebar({
  categories,
  activeCategory,
  onChangeCategory,
}: CategorySidebarProps) {
  return (
    <aside className="sticky top-28 hidden h-fit rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-soft xl:block">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">分類導覽</h2>
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onChangeCategory('all')}
          className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-button'
              : 'text-slate-700 hover:bg-blue-50 hover:text-primary'
          }`}
        >
          全部分類
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => onChangeCategory(category.id)}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-button'
                : 'text-slate-700 hover:bg-blue-50 hover:text-primary'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span>{category.name}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeCategory === category.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {category.count}
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}
