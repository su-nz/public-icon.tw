import Link from 'next/link'
import { REPO_NAME } from '@/lib/site'

const GITHUB_URL = `https://github.com/${REPO_NAME}`

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#061937] text-slate-300">
      <div className="mx-auto grid w-full max-w-8xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-lg font-extrabold tracking-tight text-white">public-icon.tw</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            台灣公共圖標導覽與下載平台，整合 CNS16282 圖標並提供快速檢視與格式下載。
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-300/40 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-200 transition-colors hover:bg-sky-400/20 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.833 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.305-5.467-1.335-5.467-5.932 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.042.137 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.48 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            前往 GitHub
          </a>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-slate-200">Navigation</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/" className="transition-colors hover:text-white">圖標庫</Link>
            <Link href="/quick" className="transition-colors hover:text-white">純圖標速覽</Link>
            <Link href="/license" className="transition-colors hover:text-white">授權條款</Link>
            <Link href="/manual" className="transition-colors hover:text-white">說明書</Link>
            <Link href="/author" className="transition-colors hover:text-white">網站作者</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-slate-200">Reference</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href="https://www.tdri.org.tw/zh-TW/design-resource/CNS16282" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">TDRI 官方頁</a>
            <a href="https://www.youtube.com/watch?v=nwHCwaP_AqQ" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">官方影片</a>
            <a href="https://www.cnsonline.com.tw/?node=detail&generalno=16282&locale=zh_TW" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">CNS 線上檢索</a>
          </div>
        </div>

      </div>
      <div className="border-t border-slate-800/80 px-4 py-4 text-xs text-slate-500 sm:px-6">
        <div className="mx-auto flex w-full max-w-8xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} public-icon.tw</p>
          <div className="flex flex-col gap-1 sm:items-end">
            <a href="https://github.com/su-nz" target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-300">
              作者：github.com/su-nz
            </a>
            <a href="mailto:icon@sunz.tw" className="transition-colors hover:text-slate-300">
              問題回報：icon@sunz.tw
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
