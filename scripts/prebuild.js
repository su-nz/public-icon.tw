const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.join(__dirname, '..')
const DATA_DIR = path.join(ROOT_DIR, 'data')
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'lib', 'inventory.json')
const PUBLIC_ICONS_DIR = path.join(ROOT_DIR, 'public', 'icons')
const PUBLIC_DOWNLOADS_DIR = path.join(ROOT_DIR, 'public', 'downloads')

const CATEGORY_MAP = {
  A: { id: 'A', name: '公共設施類', standard: 'CNS16282' },
  B: { id: 'B', name: '交通設施類', standard: 'CNS16282' },
  C: { id: 'C', name: '旅遊與觀光類', standard: 'CNS16282' },
  D: { id: 'D', name: '體育活動與設施類', standard: 'CNS16282' },
  E: { id: 'E', name: '商業設施類', standard: 'CNS16282' },
  F: { id: 'F', name: '公共行為與指示類', standard: 'CNS16282' },
  G: { id: 'G', name: '無障礙類', standard: 'CNS16282' },
  H1: { id: 'H1', name: '基本安全－緊急類', standard: 'CNS16282' },
  H2: { id: 'H2', name: '基本安全－注意類', standard: 'CNS16282' },
  H3: { id: 'H3', name: '基本安全－禁止類', standard: 'CNS16282' },
  'other-app': { id: 'other-app', name: '其他應用類', standard: '其他' },
  'other-recycle': { id: 'other-recycle', name: '資源回收類', standard: '其他' },
}

const CATEGORY_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H1', 'H2', 'H3', 'other-app', 'other-recycle']

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function toPosix(relativePath) {
  return relativePath.replace(/\\/g, '/')
}

function parseIconFolder(folderName) {
  const cleaned = normalizeWhitespace(folderName)

  let match = cleaned.match(/^([A-H](?:\d)?)\s*(\d{1,3})\s+(.+)$/i)
  if (match) {
    return {
      prefix: match[1].toUpperCase(),
      code: match[2].padStart(3, '0'),
      name: match[3].trim(),
    }
  }

  match = cleaned.match(/^(其他)\s*(\d{1,3})\s+(.+)$/)
  if (match) {
    return {
      prefix: match[1],
      code: match[2].padStart(3, '0'),
      name: match[3].trim(),
    }
  }

  match = cleaned.match(/^(回收|資源回收)\s*(\d{1,3})\s+(.+)$/)
  if (match) {
    return {
      prefix: '回收',
      code: match[2].padStart(3, '0'),
      name: match[3].trim(),
    }
  }

  return {
    prefix: '',
    code: '',
    name: cleaned,
  }
}

function inferCategoryId(parsedPrefix, parentSegments) {
  if (CATEGORY_MAP[parsedPrefix]) {
    return parsedPrefix
  }
  if (parsedPrefix === '其他') {
    return 'other-app'
  }
  if (parsedPrefix === '回收' || parsedPrefix === '資源回收') {
    return 'other-recycle'
  }

  const parentText = parentSegments.join(' ')

  if (parentText.includes('其他應用類')) {
    return 'other-app'
  }
  if (parentText.includes('資源回收類')) {
    return 'other-recycle'
  }
  if (parentText.includes('H1 緊急類')) {
    return 'H1'
  }
  if (parentText.includes('H2 注意類')) {
    return 'H2'
  }
  if (parentText.includes('H3 禁止類')) {
    return 'H3'
  }

  for (const id of ['A', 'B', 'C', 'D', 'E', 'F', 'G']) {
    if (parentText.includes(`${id} `)) {
      return id
    }
  }

  return 'unknown'
}

function buildIconId(parsed, fallbackName, iconIndex) {
  if (parsed.prefix && parsed.code) {
    if (parsed.prefix === '其他') {
      return `other-${parsed.code}`
    }
    if (parsed.prefix === '回收' || parsed.prefix === '資源回收') {
      return `recycle-${parsed.code}`
    }
    return `${parsed.prefix}-${parsed.code}`
  }

  const slug = normalizeWhitespace(fallbackName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (slug) {
    return `icon-${slug}`
  }

  return `icon-${String(iconIndex + 1).padStart(3, '0')}`
}

function getIconFiles(fullPath) {
  const files = fs.readdirSync(fullPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)

  const aiFile = files.find((file) => file.toLowerCase().endsWith('.ai')) || null
  const epsFile = files.find((file) => file.toLowerCase().endsWith('.eps')) || null
  const jpgFile = files.find((file) => file.toLowerCase().endsWith('.jpg')) || null

  return { aiFile, epsFile, jpgFile }
}

function sortIcons(icons) {
  const categoryIndex = new Map(CATEGORY_ORDER.map((id, index) => [id, index]))

  icons.sort((a, b) => {
    const categoryA = categoryIndex.has(a.category) ? categoryIndex.get(a.category) : 999
    const categoryB = categoryIndex.has(b.category) ? categoryIndex.get(b.category) : 999

    if (categoryA !== categoryB) {
      return categoryA - categoryB
    }

    if (a.code && b.code) {
      return a.code.localeCompare(b.code, 'zh-Hant')
    }

    return a.name.localeCompare(b.name, 'zh-Hant')
  })
}

function scanDataDir() {
  const icons = []
  const categoryCounts = new Map()
  const idUsage = new Map()

  if (fs.existsSync(PUBLIC_ICONS_DIR)) {
    fs.rmSync(PUBLIC_ICONS_DIR, { recursive: true, force: true })
  }
  if (fs.existsSync(PUBLIC_DOWNLOADS_DIR)) {
    fs.rmSync(PUBLIC_DOWNLOADS_DIR, { recursive: true, force: true })
  }
  ensureDir(PUBLIC_ICONS_DIR)
  ensureDir(PUBLIC_DOWNLOADS_DIR)

  function walkDir(dir, parentSegments = []) {
    if (!fs.existsSync(dir)) {
      return
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue
      }

      const fullPath = path.join(dir, entry.name)
      const { aiFile, epsFile, jpgFile } = getIconFiles(fullPath)
      const hasIconPayload = Boolean(aiFile || epsFile || jpgFile)

      if (!hasIconPayload) {
        walkDir(fullPath, [...parentSegments, entry.name])
        continue
      }

      const parsed = parseIconFolder(entry.name)
      const categoryId = inferCategoryId(parsed.prefix, parentSegments)
      const categoryMeta = CATEGORY_MAP[categoryId]
      const code = parsed.prefix && parsed.code ? `${parsed.prefix} ${parsed.code}` : ''

      let iconId = buildIconId(parsed, entry.name, icons.length)
      if (idUsage.has(iconId)) {
        const nextCount = idUsage.get(iconId) + 1
        idUsage.set(iconId, nextCount)
        iconId = `${iconId}-${nextCount}`
      } else {
        idUsage.set(iconId, 1)
      }

      const sourcePath = toPosix(path.relative(DATA_DIR, fullPath))

      if (jpgFile) {
        const srcJpg = path.join(fullPath, jpgFile)
        const destJpg = path.join(PUBLIC_ICONS_DIR, `${iconId}.jpg`)
        fs.copyFileSync(srcJpg, destJpg)
      }

      if (aiFile) {
        const srcAi = path.join(fullPath, aiFile)
        const destAi = path.join(PUBLIC_DOWNLOADS_DIR, `${iconId}.ai`)
        fs.copyFileSync(srcAi, destAi)
      }

      if (epsFile) {
        const srcEps = path.join(fullPath, epsFile)
        const destEps = path.join(PUBLIC_DOWNLOADS_DIR, `${iconId}.eps`)
        fs.copyFileSync(srcEps, destEps)
      }

      const files = {
        ai: Boolean(aiFile),
        eps: Boolean(epsFile),
        jpg: Boolean(jpgFile),
      }

      const filePaths = {
        ai: aiFile ? `/downloads/${iconId}.ai` : null,
        eps: epsFile ? `/downloads/${iconId}.eps` : null,
        jpg: jpgFile ? `/icons/${iconId}.jpg` : null,
      }

      icons.push({
        id: iconId,
        name: parsed.name || normalizeWhitespace(entry.name),
        code,
        category: categoryMeta ? categoryMeta.id : 'unknown',
        categoryName: categoryMeta ? categoryMeta.name : '未分類',
        standard: categoryMeta ? categoryMeta.standard : '',
        thumbnail: jpgFile ? `/icons/${iconId}.jpg` : null,
        files,
        filePaths,
        sourcePath,
      })

      const categoryCounterId = categoryMeta ? categoryMeta.id : 'unknown'
      categoryCounts.set(categoryCounterId, (categoryCounts.get(categoryCounterId) || 0) + 1)
    }
  }

  walkDir(DATA_DIR)
  sortIcons(icons)

  const categories = CATEGORY_ORDER
    .filter((id) => categoryCounts.has(id))
    .map((id) => ({
      ...CATEGORY_MAP[id],
      count: categoryCounts.get(id),
    }))

  if (categoryCounts.has('unknown')) {
    categories.push({
      id: 'unknown',
      name: '未分類',
      standard: '其他',
      count: categoryCounts.get('unknown'),
    })
  }

  return {
    icons,
    categories,
    totalCount: icons.length,
    generatedAt: new Date().toISOString(),
  }
}

console.log('Scanning /data directory...')
const inventory = scanDataDir()
console.log(`Found ${inventory.totalCount} icons in ${inventory.categories.length} categories`)

ensureDir(path.dirname(OUTPUT_FILE))
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(inventory, null, 2), 'utf-8')
console.log(`Written to ${OUTPUT_FILE}`)
console.log('Copied thumbnails to /public/icons/ and source files to /public/downloads/')
