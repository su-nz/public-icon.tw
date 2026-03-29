# public-icon.tw

台灣公共圖標導覽站（Next.js 14 + TypeScript + Tailwind CSS）。

本專案提供：

- 圖標瀏覽與即時搜尋
- 分類導覽（桌面、平板、手機）
- AI / EPS 下載連結
- 授權資訊頁與說明書頁（可控公開）
- Cloudflare Pages 靜態部署
- 一般頁面可直接複製 JPG 到剪貼簿
- 純圖標速覽頁（無文字，最大化圖標密度）

## 授權與營利用途注意事項（重要）

以下內容是工程與合規建議，不是法律意見。

1. 官方公告指出 CNS16282 圖標可依 CC BY 4.0 使用，可分享、修改並可商業使用，但需標示來源。
2. CNS16282 適用於一般公共場域，不適用道路標誌標線號誌等特定體系；基本安全類另涉及 CNS 9328 色彩規範。
3. 公共圖標應用手冊與課程屬官方補充資源；是否可重製公開或用於營利情境，請以官方頁面與手冊版權頁條款為準。
4. 目前預設策略：手冊頁預設不公開 PDF 鏡像。只有在你取得明確授權後，才開啟公開。

建議你在上線前完成：

- 取得原權利方書面授權（允許公開與營利場景）
- 或改為僅連到官方來源，不自行託管 PDF

官方參考連結：

- TDRI 頁面：https://www.tdri.org.tw/zh-TW/design-resource/CNS16282
- 官方影片：https://www.youtube.com/watch?v=nwHCwaP_AqQ
- CNS 檢索系統：https://www.cnsonline.com.tw

## 專案結構

- data/：原始圖標資料（ai / eps / jpg）
- scripts/prebuild.js：建置前掃描資料並產生清冊
- src/lib/inventory.json：prebuild 自動生成
- public/icons/：prebuild 生成的縮圖輸出目錄
- public/downloads/：prebuild 生成的 AI / EPS 輸出目錄
- src/app/manual/page.tsx：手冊頁（授權開關邏輯）

## 環境變數

可在本機 .env.local 或 Cloudflare / GitHub Secrets 設定。

- NEXT_PUBLIC_GITHUB_REPO
   - 預設：su-nz/public-icon.tw
   - 用途：組合「檢視 GitHub 原始資料夾」外部連結
   - 範例：NEXT_PUBLIC_GITHUB_REPO=su-nz/public-icon.tw

- NEXT_PUBLIC_MANUAL_PUBLIC_ALLOWED
  - 預設：false
  - 用途：是否允許在本站公開嵌入手冊 PDF
  - 只有在已取得授權時才設定為 true

- NEXT_PUBLIC_MANUAL_OFFICIAL_URL
  - 預設：空字串
  - 用途：當手冊未公開鏡像時，提供官方來源連結

## 本機開發流程

1. 安裝依賴

   npm install

2. 啟動開發模式

   npm run dev

3. 建置（會自動執行 prebuild）

   npm run build

4. 本機預覽正式版

   npm run start

   或直接執行：

   npx --yes serve@latest out -l 3000

## 快速瀏覽頁

- 路由：/quick
- 頁面特性：不顯示文字、滿版密集圖標牆、點圖標才開啟詳情抽屜

## 說明書公開流程（僅在授權確認後）

1. 將 PDF 放入 public/manual/CNS16282-manual.pdf
2. 設定 NEXT_PUBLIC_MANUAL_PUBLIC_ALLOWED=true
3. 重新建置與部署

若尚未授權，請保持 NEXT_PUBLIC_MANUAL_PUBLIC_ALLOWED=false，並設定 NEXT_PUBLIC_MANUAL_OFFICIAL_URL 指向官方頁。

## 部署流程 A：Cloudflare Pages（推薦）

### A-1. Cloudflare 專案建立

1. 進入 Cloudflare Dashboard > Workers & Pages > Create application > Pages > Connect to Git
2. 選擇本 GitHub 倉庫
3. Build settings 請填：
   - Framework preset: Next.js
   - Build command: npm run build
   - Build output directory: out
4. Environment variables 加入：
   - NEXT_PUBLIC_GITHUB_REPO
   - NEXT_PUBLIC_MANUAL_PUBLIC_ALLOWED
   - NEXT_PUBLIC_MANUAL_OFFICIAL_URL
5. 儲存並部署

### A-2. 快取與安全標頭

本專案已提供 public/_headers：

- icons 一年快取
- manual 較短快取
- 基本安全標頭

部署後 Cloudflare 會套用這些規則。

### A-3. 網域設定

1. 在 Pages 專案中開啟 Custom domains
2. 綁定你的網域（例如 public-icon.tw）
3. 依指示完成 DNS 記錄

## 部署流程 B：GitHub Actions + Cloudflare API

專案已提供工作流：.github/workflows/cloudflare-pages.yml

### B-1. GitHub Secrets

在 GitHub Repo > Settings > Secrets and variables > Actions 新增：

- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID
- CLOUDFLARE_PROJECT_NAME

如需覆蓋前端環境變數，也可在工作流中追加：

- NEXT_PUBLIC_GITHUB_REPO
- NEXT_PUBLIC_MANUAL_PUBLIC_ALLOWED
- NEXT_PUBLIC_MANUAL_OFFICIAL_URL

### B-2. 觸發部署

1. 推送到 main 分支
2. workflow 會執行：
   - npm ci
   - npm run build
   - 上傳 out
   - 部署至 Cloudflare Pages

## 上線前檢查清單

1. / 頁面搜尋、分類、Drawer、下載連結正常
2. /license 內容與來源標示正確
3. /manual 是否符合授權策略（預設不公開 PDF）
4. NEXT_PUBLIC_GITHUB_REPO 指向正確倉庫
5. Cloudflare Pages build output 為 out

## License

- 圖標資料：CC BY 4.0
- 說明書：以官方公告與手冊版權頁條款為準（本站預設不鏡像託管）

詳見 LICENSE 與站內 /license 頁面。
