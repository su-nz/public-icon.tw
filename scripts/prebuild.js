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

function getIconVariants(fullPath, folderName) {
  const files = fs.readdirSync(fullPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)

  const allowed = new Set(['.ai', '.eps', '.jpg'])
  const byBase = new Map()

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    if (!allowed.has(ext)) continue
    const base = path.basename(file, path.extname(file))
    if (!byBase.has(base)) {
      byBase.set(base, { aiFile: null, epsFile: null, jpgFile: null })
    }
    const entry = byBase.get(base)
    if (ext === '.ai') entry.aiFile = file
    else if (ext === '.eps') entry.epsFile = file
    else if (ext === '.jpg') entry.jpgFile = file
  }

  const normalizeForMatch = (text) => normalizeWhitespace(text).replace(/[-_]/g, '')
  const normalizedFolder = normalizeForMatch(folderName)
  const variants = []
  const strays = []

  const baseEntries = Array.from(byBase.entries())

  if (baseEntries.length === 1) {
    const [base, entry] = baseEntries[0]
    variants.push({ base, variantNum: 0, ...entry })
  } else {
    for (const [base, entry] of baseEntries) {
      const normalizedBase = normalizeForMatch(base)
      let variantNum = null

      if (normalizedBase === normalizedFolder) {
        variantNum = 0
      } else {
        const match = normalizeWhitespace(base).match(/^(.+)_(\d+)$/)
        if (match && normalizeForMatch(match[1]) === normalizedFolder) {
          variantNum = parseInt(match[2], 10)
        }
      }

      if (variantNum === null) {
        strays.push(base)
        continue
      }

      variants.push({ base, variantNum, ...entry })
    }
  }

  variants.sort((a, b) => a.variantNum - b.variantNum)

  if (variants.length === 2) {
    variants[0].variant = 'outline'
    variants[1].variant = 'solid'
  } else {
    for (const v of variants) {
      v.variant = null
    }
  }

  return { variants, strays }
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
      const codeCompare = a.code.localeCompare(b.code, 'zh-Hant')
      if (codeCompare !== 0) {
        return codeCompare
      }
      return a.id.localeCompare(b.id, 'en')
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
      const { variants, strays } = getIconVariants(fullPath, entry.name)

      if (variants.length === 0) {
        walkDir(fullPath, [...parentSegments, entry.name])
        continue
      }

      if (strays.length > 0) {
        for (const stray of strays) {
          console.warn(`  ⚠ Skipping stray file in ${entry.name}: ${stray}`)
        }
      }

      const parsed = parseIconFolder(entry.name)
      const categoryId = inferCategoryId(parsed.prefix, parentSegments)
      const categoryMeta = CATEGORY_MAP[categoryId]
      const code = parsed.prefix && parsed.code ? `${parsed.prefix} ${parsed.code}` : ''
      const sourcePath = toPosix(path.relative(DATA_DIR, fullPath))

      const baseIconId = buildIconId(parsed, entry.name, icons.length)

      variants.forEach((variant, variantIndex) => {
        let iconId = variantIndex === 0 ? baseIconId : `${baseIconId}-${variantIndex + 1}`

        if (idUsage.has(iconId)) {
          const nextCount = idUsage.get(iconId) + 1
          idUsage.set(iconId, nextCount)
          iconId = `${iconId}-dup${nextCount}`
        } else {
          idUsage.set(iconId, 1)
        }

        const { aiFile, epsFile, jpgFile } = variant

        if (jpgFile) {
          fs.copyFileSync(path.join(fullPath, jpgFile), path.join(PUBLIC_ICONS_DIR, `${iconId}.jpg`))
        }
        if (aiFile) {
          fs.copyFileSync(path.join(fullPath, aiFile), path.join(PUBLIC_DOWNLOADS_DIR, `${iconId}.ai`))
        }
        if (epsFile) {
          fs.copyFileSync(path.join(fullPath, epsFile), path.join(PUBLIC_DOWNLOADS_DIR, `${iconId}.eps`))
        }

        icons.push({
          id: iconId,
          name: parsed.name || normalizeWhitespace(entry.name),
          code,
          category: categoryMeta ? categoryMeta.id : 'unknown',
          categoryName: categoryMeta ? categoryMeta.name : '未分類',
          standard: categoryMeta ? categoryMeta.standard : '',
          variant: variant.variant,
          thumbnail: jpgFile ? `/icons/${iconId}.jpg` : null,
          files: {
            ai: Boolean(aiFile),
            eps: Boolean(epsFile),
            jpg: Boolean(jpgFile),
          },
          filePaths: {
            ai: aiFile ? `/downloads/${iconId}.ai` : null,
            eps: epsFile ? `/downloads/${iconId}.eps` : null,
            jpg: jpgFile ? `/icons/${iconId}.jpg` : null,
          },
          sourcePath,
        })

        const categoryCounterId = categoryMeta ? categoryMeta.id : 'unknown'
        categoryCounts.set(categoryCounterId, (categoryCounts.get(categoryCounterId) || 0) + 1)
      })
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
