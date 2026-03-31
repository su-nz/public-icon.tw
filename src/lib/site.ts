const DEFAULT_REPO = 'su-nz/public-icon.tw'

export const SITE_NAME = '台灣公共圖標素材庫'
export const SITE_BRAND = 'public-icon.tw'
export const SITE_DESCRIPTION = '台灣公共圖標導航站，支援搜尋、下載與授權資訊查詢。'
export const SITE_URL = 'https://public-icon.tw'
export const REPO_NAME = DEFAULT_REPO

function encodePath(pathValue: string) {
  return pathValue
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export function toRepoTreeUrl(pathValue: string) {
  return `https://github.com/${REPO_NAME}/tree/main/${encodePath(pathValue)}`
}

export function toSiteUrl(pathValue = '/') {
  const normalizedPath = pathValue.startsWith('/') ? pathValue : `/${pathValue}`
  return `${SITE_URL}${normalizedPath}`
}
