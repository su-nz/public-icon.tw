# 台灣公共圖標導覽與下載平台 public-icon.tw 

本專案將 CNS16282 相關圖標進行整理與前端化呈現，提供更好用的搜尋、分類瀏覽與格式下載；同時保留「授權資訊」與「說明書」的合規發布策略。

## 亮點功能

- 圖標庫瀏覽 + 即時搜尋
- 分類導覽（桌面/平板/手機 RWD）
- JPG 預覽（並支援複製到剪貼簿）
- AI / EPS 靜態下載
- 純圖標速覽頁（/quick）：不顯示文字、最大化密度
- 靜態輸出部署（Cloudflare Pages，輸出目錄 out）

## 線上連結
- Website: https://public-icon.tw/
- GitHub: https://github.com/su-nz/public-icon.tw

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


## 授權與營利用途注意事項

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


## License

- 圖標資料：CC BY 4.0
- 說明書：以官方公告與手冊版權頁條款為準
