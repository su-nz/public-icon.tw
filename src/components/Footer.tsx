import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#061937] text-slate-300">
      <div className="mx-auto grid w-full max-w-8xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-lg font-extrabold tracking-tight text-white">public-icon.tw</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            台灣公共圖標導覽與下載平台，整合 CNS16282 圖標並提供快速檢視與格式下載。
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-slate-200">Navigation</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/" className="transition-colors hover:text-white">圖標庫</Link>
            <Link href="/quick" className="transition-colors hover:text-white">純圖標速覽</Link>
            <Link href="/license" className="transition-colors hover:text-white">授權條款</Link>
            <Link href="/manual" className="transition-colors hover:text-white">說明書</Link>
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
      <div className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} public-icon.tw
      </div>
    </footer>
  )
}
