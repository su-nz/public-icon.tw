import type { Metadata } from 'next'
import { ExternalLink, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: '網站作者',
  description: 'public-icon.tw 作者資訊與聯絡方式。',
  alternates: {
    canonical: '/author',
  },
}

export default function AuthorPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">網站作者</h1>
        <p className="mt-3 text-slate-600">本網站由 su-nz 維護，若有問題或合作需求，歡迎透過下方方式聯絡。</p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="https://github.com/su-nz"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-blue-300"
        >
          <span>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">GitHub</p>
            <p className="mt-1 text-base font-bold text-slate-900">https://github.com/su-nz</p>
          </span>
          <ExternalLink className="h-5 w-5 text-blue-600" aria-hidden="true" />
        </a>

        <a
          href="mailto:icon@sunz.tw"
          className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-blue-300"
        >
          <span>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-1 text-base font-bold text-slate-900">icon@sunz.tw</p>
          </span>
          <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
