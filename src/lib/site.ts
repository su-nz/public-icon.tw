const DEFAULT_REPO = 'suenl/public-icon.tw'

export const SITE_NAME = 'public-icon.tw'
export const SITE_DESCRIPTION = '台灣公共圖標導航站，支援搜尋、下載與授權資訊查詢。'
export const REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO || DEFAULT_REPO

function encodePath(pathValue: string) {
  return pathValue
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export function toRepoTreeUrl(pathValue: string) {
  return `https://github.com/${REPO_NAME}/tree/main/${encodePath(pathValue)}`
}
