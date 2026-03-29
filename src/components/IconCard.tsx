'use client'

import Image from 'next/image'
import { ClipboardCopy, Download, Info } from 'lucide-react'
import type { IconRecord } from '@/lib/types'

type IconCardProps = {
  icon: IconRecord
  isCopied: boolean
  isMobileJpgAction: boolean
  onCopyJpg: (icon: IconRecord) => void
  onOpenDetail: (icon: IconRecord) => void
}

export function IconCard({ icon, isCopied, isMobileJpgAction, onCopyJpg, onOpenDetail }: IconCardProps) {
  return (
    <article className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-hover sm:p-4">
      <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-blue-50">
        {icon.thumbnail ? (
          <div className="relative h-[74%] w-[74%] sm:h-[76%] sm:w-[76%]">
            <Image
              src={icon.thumbnail}
              alt={`${icon.name} 圖標縮圖`}
              fill
              sizes="(max-width: 359px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 33vw, 20vw"
              className="object-contain transition-transform duration-500 md:group-hover:scale-105"
            />
          </div>
        ) : (
          <span className="text-xs font-semibold text-slate-400">無縮圖</span>
        )}
      </div>

      <p className="line-clamp-1 text-sm font-bold text-slate-900">{icon.name}</p>
      <p className="mt-1 text-xs text-slate-500">{icon.code || icon.id}</p>

      <div className="mt-4 grid grid-cols-1 gap-2 opacity-100 transition-opacity duration-200 sm:grid-cols-2 md:grid-cols-1 md:opacity-0 md:group-hover:opacity-100 lg:grid-cols-2">
        {icon.filePaths.jpg ? (
          <button
            type="button"
            onClick={() => onCopyJpg(icon)}
            className="inline-flex min-w-0 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isMobileJpgAction ? (
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ClipboardCopy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {isMobileJpgAction ? '下載 JPG' : isCopied ? '已複製' : '複製 JPG'}
          </button>
        ) : (
          <span className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-2 py-2 text-xs font-semibold text-slate-400">
            無 JPG
          </span>
        )}

        <button
          type="button"
          onClick={() => onOpenDetail(icon)}
          className="inline-flex min-w-0 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-primary to-secondary px-2 py-2 text-xs font-semibold text-white shadow-button transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
          詳情
        </button>
      </div>

      <div className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        <Download className="h-3 w-3" aria-hidden="true" />
        {icon.category}
      </div>
    </article>
  )
}
