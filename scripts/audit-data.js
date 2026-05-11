const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'data')

function normalizeWhitespace(text) { return text.replace(/\s+/g, ' ').trim() }
function normalizeForMatch(text) { return normalizeWhitespace(text).replace(/[-_]/g, '') }
function toPosix(p) { return p.replace(/\\/g, '/') }

const issues = {
  hyphenMismatch: [],
  stray: [],
  missingAi: [],
  missingEps: [],
  missingJpg: [],
  nonStandard: [],
  emptyFolders: [],
  incompleteVariantSets: [],
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const fullPath = path.join(dir, entry.name)
    const files = fs.readdirSync(fullPath, { withFileTypes: true })
      .filter((e) => e.isFile())
      .map((e) => e.name)

    const allowed = new Set(['.ai', '.eps', '.jpg'])
    const byBase = new Map()
    const nonStandardFiles = []

    for (const f of files) {
      const ext = path.extname(f).toLowerCase()
      if (!allowed.has(ext)) {
        nonStandardFiles.push(f)
        continue
      }
      const base = path.basename(f, path.extname(f))
      if (!byBase.has(base)) byBase.set(base, {})
      byBase.get(base)[ext.slice(1)] = f
    }

    if (byBase.size === 0) {
      const subdirs = fs.readdirSync(fullPath, { withFileTypes: true }).filter((e) => e.isDirectory())
      if (subdirs.length === 0 && files.length === 0) {
        issues.emptyFolders.push(toPosix(path.relative(DATA_DIR, fullPath)))
      } else {
        walk(fullPath)
      }
      continue
    }

    const rel = toPosix(path.relative(DATA_DIR, fullPath))
    const normalizedFolder = normalizeForMatch(entry.name)
    const bases = Array.from(byBase.keys())

    if (nonStandardFiles.length > 0) {
      for (const f of nonStandardFiles) {
        issues.nonStandard.push(`${rel} :: ${f}`)
      }
    }

    if (bases.length === 1) {
      const base = bases[0]
      if (normalizeWhitespace(base) !== normalizeWhitespace(entry.name)) {
        if (normalizeForMatch(base) === normalizedFolder) {
          issues.hyphenMismatch.push(`${rel}\n      folder: ${entry.name}\n      file:   ${base}`)
        } else {
          issues.stray.push(`${rel}\n      folder: ${entry.name}\n      file:   ${base}`)
        }
      }
    } else {
      for (const base of bases) {
        const normBase = normalizeForMatch(base)
        const m = normalizeWhitespace(base).match(/^(.+)_(\d+)$/)
        const isVariant = m && normalizeForMatch(m[1]) === normalizedFolder
        if (normBase !== normalizedFolder && !isVariant) {
          issues.stray.push(`${rel} :: ${base} (resides in folder: ${entry.name})`)
        }
      }
    }

    const matchingBases = []
    for (const [base, entryFiles] of byBase) {
      const normBase = normalizeForMatch(base)
      const m = normalizeWhitespace(base).match(/^(.+)_(\d+)$/)
      const isVariant = m && normalizeForMatch(m[1]) === normalizedFolder
      const isMatch = normBase === normalizedFolder || isVariant || bases.length === 1
      if (!isMatch) continue
      matchingBases.push({ base, entryFiles, variantNum: isVariant ? parseInt(m[2], 10) : 0 })

      if (!entryFiles.ai) issues.missingAi.push(`${rel} :: ${base}`)
      if (!entryFiles.eps) issues.missingEps.push(`${rel} :: ${base}`)
      if (!entryFiles.jpg) issues.missingJpg.push(`${rel} :: ${base}`)
    }

    if (matchingBases.length === 2) {
      const v1 = matchingBases.find((m) => m.variantNum === 1)
      const v2 = matchingBases.find((m) => m.variantNum === 2)
      if (v1 && v2) {
        const f1 = v1.entryFiles
        const f2 = v2.entryFiles
        if (!!f1.ai !== !!f2.ai || !!f1.eps !== !!f2.eps || !!f1.jpg !== !!f2.jpg) {
          issues.incompleteVariantSets.push(`${rel}\n      _1: ai=${!!f1.ai} eps=${!!f1.eps} jpg=${!!f1.jpg}\n      _2: ai=${!!f2.ai} eps=${!!f2.eps} jpg=${!!f2.jpg}`)
        }
      }
    }
  }
}

walk(DATA_DIR)

function section(title, items) {
  console.log(`\n${'─'.repeat(70)}`)
  console.log(`【${title}】 (${items.length} 項)`)
  console.log('─'.repeat(70))
  if (items.length === 0) {
    console.log('  ✓ 無')
  } else {
    items.forEach((x) => console.log('  • ' + x))
  }
}

section('1. 檔名與資料夾名「連字號-/底線_」不一致', issues.hyphenMismatch)
section('2. 誤放/錯置檔案（檔名完全對不上資料夾）', issues.stray)
section('3. 缺少 .ai 檔', issues.missingAi)
section('4. 缺少 .eps 檔', issues.missingEps)
section('5. 缺少 .jpg 檔', issues.missingJpg)
section('6. 非 ai/eps/jpg 的雜檔', issues.nonStandard)
section('7. 空資料夾', issues.emptyFolders)
section('8. 雙版本不完整（_1 _2 兩版檔案數量不一致）', issues.incompleteVariantSets)
