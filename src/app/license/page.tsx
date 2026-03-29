import Link from 'next/link'

export default function LicensePage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <header>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">授權與來源聲明</h1>
        <p className="mt-3 text-slate-600">
          public-icon.tw 彙整公開圖標資料，主要參考台灣設計研究院公共圖標計畫與 CNS16282
          「圖形符號－一般公共及基本安全圖標」。
        </p>
      </header>

      <div className="mt-8 space-y-6">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-slate-900">1. 圖標授權（CC BY 4.0）</h2>
          <p className="mt-2 text-slate-700">
            CNS16282 所提及圖標可依 CC BY 4.0 使用，包含商業使用與改作；惟必須保留來源標示，且修改後的圖標仍應符合相關法規與場域規範。
          </p>
          <a
            href="https://creativecommons.org/licenses/by/4.0/deed.zh_Hant"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-semibold text-blue-600 hover:text-blue-700"
          >
            查看 CC BY 4.0 條款
          </a>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-slate-900">2. 官方來源與背景</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            <li>公共圖標計畫由台灣設計研究院（TDRI）發起，並與多機關共創。</li>
            <li>CNS16282 由經濟部標準檢驗局於 2026 年 3 月制定公布。</li>
            <li>CNS16282 收錄 8 大類、253 個圖標；本網站另含非 CNS 類別的補充圖標。</li>
            <li>本專案僅做導覽與索引，不主張原始圖標著作權。</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              href="https://www.tdri.org.tw/zh-TW"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              TDRI 官網（zh-TW）
            </a>
            <a
              href="https://www.tdri.org.tw/zh-TW/design-resource/CNS16282"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              TDRI 官方頁面
            </a>
            <a
              href="https://www.youtube.com/watch?v=nwHCwaP_AqQ"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              官方說明影片
            </a>
            <a
              href="https://www.cnsonline.com.tw"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              CNS 線上檢索系統
            </a>
          </div>
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-xl font-bold text-emerald-900">3. 適用範圍與限制提醒</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-emerald-900/90">
            <li>本標準適用於一般公共場域，不適用道路標誌標線號誌與特定交通號誌體系。</li>
            <li>基本安全類圖標不包含專業工作場所使用之安全標誌。</li>
            <li>基本安全類涉及 CNS 9328 色彩規範，使用時請依規定呈現。</li>
            <li>若有授權或法規疑慮，請以官方公告與主管機關規範為準。</li>
          </ul>
        </article>
      </div>

      <div className="mt-8 text-sm text-slate-600">
        <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700">
          返回圖標庫
        </Link>
      </div>
    </section>
  )
}
