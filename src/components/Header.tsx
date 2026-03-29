import Image from 'next/image'
import Link from 'next/link'
import { REPO_NAME } from '@/lib/site'

const GITHUB_URL = `https://github.com/${REPO_NAME}`

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-8xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="group inline-flex w-fit items-center gap-2">
          <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-blue-200 bg-white shadow-button transition-transform duration-200 group-hover:-translate-y-0.5">
            <Image
              src="/icons/A-001.jpg"
              alt="A001 詢問處"
              fill
              sizes="36px"
              className="object-contain"
            />
          </span>
          <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">public-icon.tw</span>
        </Link>

        <nav className="flex w-full items-center gap-1 overflow-x-auto pb-1 text-[clamp(12px,3vw,14px)] font-semibold text-slate-600 sm:w-auto sm:gap-2 sm:pb-0">
          <Link href="/" className="shrink-0 rounded-full px-2.5 py-1.5 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-3 sm:py-2">
            圖標庫
          </Link>
          <Link href="/quick" className="shrink-0 rounded-full px-2.5 py-1.5 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-3 sm:py-2">
            速覽
          </Link>
          <Link href="/license" className="shrink-0 rounded-full px-2.5 py-1.5 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-3 sm:py-2">
            授權
          </Link>
          <Link href="/manual" className="shrink-0 rounded-full px-2.5 py-1.5 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-3 sm:py-2">
            說明書
          </Link>
          <Link href="/author" className="shrink-0 rounded-full px-2.5 py-1.5 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-3 sm:py-2">
            作者
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/20 bg-blue-50 px-3 py-1.5 text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:ml-0 sm:py-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.833 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.305-5.467-1.335-5.467-5.932 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.042.137 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.48 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
