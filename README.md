# public-icon.tw

台灣公共圖標導覽與下載平台（Next.js 14 + TypeScript + Tailwind CSS）。

本專案將 CNS16282 相關圖標進行整理與前端化呈現，提供更好用的搜尋、分類瀏覽與格式下載；同時保留「授權資訊」與「說明書」的合規發布策略。

## 亮點功能

- 圖標庫瀏覽 + 即時搜尋
- 分類導覽（桌面/平板/手機 RWD）
- JPG 預覽（並支援複製到剪貼簿）
- AI / EPS 靜態下載
- 純圖標速覽頁（/quick）：不顯示文字、最大化密度
- 靜態輸出部署（Cloudflare Pages，輸出目錄 out）

## 線上連結

> TODO: 填入你的正式網址

- Website: <YOUR_SITE_URL>
- GitHub: https://github.com/<YOUR_GITHUB_REPO>

## 專案截圖（請自行替換圖片）

> 建議你把圖片放在 `docs/screenshots/`，然後把下方的圖片連結取消註解（或改成你的實際路徑）。

### 首頁

<!-- TODO: 插入首頁截圖 -->
<!-- ![首頁預覽](docs/screenshots/home.png) -->

### 詳情抽屜（下載 / 原始資料夾連結）

<!-- TODO: 插入詳情抽屜截圖 -->
<!-- ![詳情抽屜](docs/screenshots/detail-drawer.png) -->

### 純圖標速覽（/quick）

<!-- TODO: 插入 /quick 頁面截圖 -->
<!-- ![純圖標速覽](docs/screenshots/quick.png) -->

### 行動版（RWD）

<!-- TODO: 插入行動版截圖 -->
<!-- ![行動版](docs/screenshots/mobile.png) -->

> TODO: 你也可以改成表格排版（多圖並排）或 GIF。

## 快速開始（本機）

### 需求

- Node.js 18+（建議 20+）
- npm

### 安裝與啟動

```bash
npm install
npm run dev
```

### 建置與預覽（靜態輸出）

> `npm run build` 會先執行 prebuild：掃描 `data/` 並產生清冊與靜態資產。

```bash
npm run build
npm run start
```

## 資料與產出流程（重要）

本專案的圖檔分為「來源資料」與「可重建的發佈產物」：

- `data/`：原始來源資料（你手動放入；保留官方/分類結構與檔案）
- `public/icons/`：由 prebuild 產生的網站展示用 JPG
- `public/downloads/`：由 prebuild 產生的 AI / EPS 下載檔
- `src/lib/inventory.json`：由 prebuild 產生的索引清冊

也就是說：

- 使用者瀏覽網站不會改寫你的原始圖檔。
- 只有在你執行 `npm run build`（或 prebuild）時，才會重新生成 `public/icons/`、`public/downloads/` 與 `inventory.json`。

## 環境變數

可設定於本機 `.env.local` 或 Cloudflare / GitHub Secrets。

| 變數 | 預設 | 用途 |
| --- | --- | --- |
| `NEXT_PUBLIC_GITHUB_REPO` | `su-nz/public-icon.tw` | 組合「檢視 GitHub 原始資料夾」連結 |
| `NEXT_PUBLIC_MANUAL_PUBLIC_ALLOWED` | `false` | 是否允許在本站公開嵌入手冊 PDF（取得授權後才開啟） |
| `NEXT_PUBLIC_MANUAL_OFFICIAL_URL` | 空字串 | 未公開鏡像時，提供官方來源連結 |

範例：

```bash
NEXT_PUBLIC_GITHUB_REPO=su-nz/public-icon.tw
NEXT_PUBLIC_MANUAL_PUBLIC_ALLOWED=false
NEXT_PUBLIC_MANUAL_OFFICIAL_URL=
```

## 部署（Cloudflare Pages）

本專案為 Next.js 靜態輸出（`output: 'export'`），部署建議使用 Cloudflare Pages。

### Pages 設定

- Framework preset: Next.js
- Build command: `npm run build`
- Build output directory: `out`

### 快取與安全標頭

已提供 `public/_headers`：

- icons 靜態資源長快取
- manual 較短快取
- 基本安全標頭

> TODO: 如果你有自己的 CSP/安全策略，請在此段補充。

## 授權與營利用途注意事項（重要）

以下內容為工程與合規建議，不是法律意見。

1. 官方公告指出 CNS16282 圖標可依 CC BY 4.0 使用，可分享、修改並可商業使用，但需標示來源。
2. CNS16282 適用於一般公共場域，不適用道路標誌標線號誌等特定體系；基本安全類另涉及 CNS 9328 色彩規範。
3. 公共圖標應用手冊與課程屬官方補充資源；是否可重製公開或用於營利情境，請以官方頁面與手冊版權頁條款為準。
4. 目前預設策略：手冊頁預設不公開 PDF 鏡像。只有在你取得明確授權後，才開啟公開。

建議上線前完成：

- 取得原權利方書面授權（允許公開與營利場景），或
- 改為僅連到官方來源，不自行託管 PDF

官方參考連結：

- TDRI：https://www.tdri.org.tw/zh-TW/design-resource/CNS16282
- 官方影片：https://www.youtube.com/watch?v=nwHCwaP_AqQ
- CNS 檢索系統：https://www.cnsonline.com.tw

## 專案結構

```text
data/                   # 原始來源資料（ai / eps / jpg）
public/icons/            # prebuild 生成：展示用 JPG
public/downloads/         # prebuild 生成：AI / EPS 下載
scripts/prebuild.js       # 建置前掃描資料並產生清冊與輸出
src/lib/inventory.json    # prebuild 自動生成
src/app/                 # Next.js App Router 頁面
```

## Contributing

> TODO: 如果你接受外部貢獻，請補上 PR / Issue 規則；若不接受可刪除此段。

- Issue：描述問題、提供截圖與重現步驟
- PR：請保持變更範圍聚焦，避免混合重構與功能

## License

- 圖標資料：CC BY 4.0（請依官方公告與標示規範使用）
- 說明書：以官方公告與手冊版權頁條款為準（本站預設不鏡像託管）

詳見 `LICENSE` 與站內 `/license` 頁面。
