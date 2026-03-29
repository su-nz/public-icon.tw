import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '圖標說明書',
  description: 'CNS16282 公共圖標應用手冊與說明書檢視頁。',
  alternates: {
    canonical: '/manual',
  },
}

export default function ManualPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">圖標說明書</h1>
      </header>

      <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-900">
        <p className="text-sm font-bold">手冊授權請以官方公告為準</p>
        <p className="mt-2 text-sm">
          公共圖標應用手冊與課程由官方提供實務參考。是否可公開重製、是否可用於營利場景，請先確認官方頁面與手冊版權頁條款。
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <object
          data="/manual/CNS16282-manual.pdf"
          type="application/pdf"
          className="h-[75vh] w-full"
          aria-label="說明書 PDF 預覽"
        >
        </object>
      </div>

      <div className="mt-6 text-sm text-slate-600">
        <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700">
          返回圖標庫
        </Link>
      </div>
    </section>
  )
}
