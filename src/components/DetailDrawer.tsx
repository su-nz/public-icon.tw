'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, ExternalLink, X } from 'lucide-react'
import { toRepoTreeUrl } from '@/lib/site'
import type { IconRecord } from '@/lib/types'

type DetailDrawerProps = {
  icon: IconRecord | null
  onClose: () => void
}

function DownloadLink({ href, label }: { href: string | null; label: string }) {
  if (!href) {
    return (
      <span className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-400">
        {label} 不可用
      </span>
    )
  }

  return (
    <a
      href={href}
      download
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white shadow-button transition hover:-translate-y-0.5"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      下載 {label}
    </a>
  )
}

export function DetailDrawer({ icon, onClose }: DetailDrawerProps) {
  const aiLink = icon ? icon.filePaths.ai : null
  const epsLink = icon ? icon.filePaths.eps : null
  const jpgLink = icon ? icon.filePaths.jpg : null
  const sourceLink = icon ? toRepoTreeUrl(`data/${icon.sourcePath}`) : '#'

  return (
    <AnimatePresence>
      {icon ? (
        <>
          <motion.button
            type="button"
            aria-label="關閉詳情"
            className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`${icon.name} 詳情`}
            className="fixed right-0 top-0 z-[60] h-dvh w-full max-w-md overflow-y-auto border-l border-blue-100 bg-white p-5 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{icon.code || icon.id}</p>
                <h2 className="mt-1 text-xl font-extrabold text-slate-900">{icon.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{icon.categoryName}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative mb-5 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50">
              {icon.thumbnail ? (
                <Image
                  src={icon.thumbnail}
                  alt={`${icon.name} 大圖`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-8"
                />
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <DownloadLink href={jpgLink} label="JPG" />
              <DownloadLink href={aiLink} label="AI" />
              <DownloadLink href={epsLink} label="EPS" />
            </div>

            <a
              href={sourceLink}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              檢視 GitHub 原始資料夾
            </a>

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-bold text-emerald-900">授權：CC BY 4.0</p>
              <p className="mt-1 text-sm text-emerald-800">使用時請標註來源與授權資訊，可用於商業與非商業用途。</p>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              下載連結由本站 prebuild 輸出，支援本地開發與正式站點直接下載。
            </p>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
