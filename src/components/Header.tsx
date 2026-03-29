import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { REPO_NAME } from '@/lib/site'

const GITHUB_URL = `https://github.com/${REPO_NAME}`

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-button transition-transform duration-200 group-hover:-translate-y-0.5">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">public-icon.tw</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-semibold text-slate-600 sm:gap-2">
          <Link href="/" className="rounded-full px-3 py-2 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            圖標庫
          </Link>
          <Link href="/quick" className="rounded-full px-3 py-2 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            速覽
          </Link>
          <Link href="/license" className="hidden rounded-full px-3 py-2 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:inline-flex">
            授權
          </Link>
          <Link href="/manual" className="hidden rounded-full px-3 py-2 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:inline-flex">
            說明書
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-blue-50 px-3 py-2 text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
