'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ClipboardCopy, Download, ExternalLink, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toRepoTreeUrl } from '@/lib/site'
import type { IconRecord } from '@/lib/types'

type DetailDrawerProps = {
  icon: IconRecord | null
  onClose: () => void
}

async function convertBlobToPng(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const imageUrl = URL.createObjectURL(blob)
    const image = new window.Image()

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = image.naturalWidth || image.width
        canvas.height = image.naturalHeight || image.height
        const context = canvas.getContext('2d')

        if (!context) {
          URL.revokeObjectURL(imageUrl)
          reject(new Error('Canvas context unavailable'))
          return
        }

        context.drawImage(image, 0, 0)
        canvas.toBlob((pngBlob) => {
          URL.revokeObjectURL(imageUrl)
          if (!pngBlob) {
            reject(new Error('PNG conversion failed'))
            return
          }
          resolve(pngBlob)
        }, 'image/png')
      } catch (error) {
        URL.revokeObjectURL(imageUrl)
        reject(error)
      }
    }

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl)
      reject(new Error('Image decode failed'))
    }

    image.src = imageUrl
  })
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
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [copyMessage, setCopyMessage] = useState('')
  const [copyAttributionStatus, setCopyAttributionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [copyAttributionMessage, setCopyAttributionMessage] = useState('')
  const [isMobileJpgAction, setIsMobileJpgAction] = useState(false)
  const attributionText = '圖標來源：台灣設計研究院 (CC BY 4.0) / CNS16282 國家標準'

  useEffect(() => {
    const userAgent = navigator.userAgent || ''
    const platform = navigator.platform || ''
    const maxTouchPoints = navigator.maxTouchPoints || 0
    const isMobile = /Android|iPad|iPhone|iPod|Mobile|Windows Phone|IEMobile/i.test(userAgent)
      || (platform === 'MacIntel' && maxTouchPoints > 1)

    setIsMobileJpgAction(isMobile)
  }, [])

  useEffect(() => {
    setCopyStatus('idle')
    setCopyMessage('')
    setCopyAttributionStatus('idle')
    setCopyAttributionMessage('')
  }, [icon?.id])

  const aiLink = icon ? icon.filePaths.ai : null
  const epsLink = icon ? icon.filePaths.eps : null
  const jpgLink = icon ? icon.filePaths.jpg : null
  const sourceLink = icon ? toRepoTreeUrl(`data/${icon.sourcePath}`) : '#'

  async function handleCopyJpg() {
    if (!jpgLink) {
      setCopyStatus('error')
      setCopyMessage('此圖標沒有 JPG 可複製')
      return
    }

    try {
      if (!window.isSecureContext || !navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
        setCopyStatus('error')
        setCopyMessage('目前環境不支援直接複製圖片，請使用 HTTPS 並改用 Chrome/Edge')
        return
      }

      const response = await fetch(jpgLink)
      if (!response.ok) {
        throw new Error(`Fetch failed with ${response.status}`)
      }

      const blob = await response.blob()

      try {
        const mime = blob.type || 'image/jpeg'
        await navigator.clipboard.write([new ClipboardItem({ [mime]: blob })])
      } catch {
        const pngBlob = await convertBlobToPng(blob)
        await navigator.clipboard.write([new ClipboardItem({ [pngBlob.type || 'image/png']: pngBlob })])
      }

      setCopyStatus('success')
      setCopyMessage('已複製圖片到剪貼簿')
    } catch (error) {
      console.error('Copy JPG failed in detail drawer', error)
      setCopyStatus('error')
      setCopyMessage('複製失敗，請改用下載')
    }
  }

  async function handleCopyAttribution() {
    try {
      if (!window.isSecureContext) {
        throw new Error('Insecure context')
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(attributionText)
      } else {
        throw new Error('Clipboard API unavailable')
      }

      setCopyAttributionStatus('success')
      setCopyAttributionMessage('已複製來源文字到剪貼簿')
    } catch (error) {
      console.error('Copy attribution failed in detail drawer', error)
      setCopyAttributionStatus('error')
      setCopyAttributionMessage('複製失敗，請手動複製文字')
    }
  }

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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-[76%] w-[76%]">
                    <Image
                      src={icon.thumbnail}
                      alt={`${icon.name} 大圖`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DownloadLink href={jpgLink} label="JPG" />
              <DownloadLink href={aiLink} label="AI" />
              <DownloadLink href={epsLink} label="EPS" />
              {!isMobileJpgAction ? (
                <button
                  type="button"
                  onClick={handleCopyJpg}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-primary"
                >
                  <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
                  {copyStatus === 'success' ? '已複製 JPG' : '複製 JPG'}
                </button>
              ) : null}
            </div>

            {copyMessage ? (
              <p className={`mt-3 text-sm ${copyStatus === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                {copyMessage}
              </p>
            ) : null}

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
              <button
                type="button"
                onClick={handleCopyAttribution}
                className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:text-emerald-900"
              >
                <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
                {copyAttributionStatus === 'success' ? '已複製來源文字' : '複製來源文字'}
              </button>
              {copyAttributionMessage ? (
                <p className={`mt-2 text-sm ${copyAttributionStatus === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {copyAttributionMessage}
                </p>
              ) : null}
            </div>

          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
