'use client'

import type { CategoryRecord } from '@/lib/types'

type CategoryTabsProps = {
  categories: CategoryRecord[]
  activeCategory: string
  onChangeCategory: (categoryId: string) => void
}

export function CategoryTabs({ categories, activeCategory, onChangeCategory }: CategoryTabsProps) {
  return (
    <div className="w-full min-w-0 xl:hidden">
      <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-2 pr-1">
        <button
          type="button"
          onClick={() => onChangeCategory('all')}
          className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-button'
              : 'bg-white text-slate-700 shadow-soft hover:bg-blue-50 hover:text-primary'
          }`}
        >
          全部
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => onChangeCategory(category.id)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-button'
                : 'bg-white text-slate-700 shadow-soft hover:bg-blue-50 hover:text-primary'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
