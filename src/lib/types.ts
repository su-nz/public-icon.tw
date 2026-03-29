export type IconFileFlags = {
  ai: boolean
  eps: boolean
  jpg: boolean
}

export type IconFilePaths = {
  ai: string | null
  eps: string | null
  jpg: string | null
}

export type IconRecord = {
  id: string
  name: string
  code: string
  category: string
  categoryName: string
  standard: string
  thumbnail: string | null
  files: IconFileFlags
  filePaths: IconFilePaths
  sourcePath: string
}

export type CategoryRecord = {
  id: string
  name: string
  standard: string
  count: number
}

export type Inventory = {
  icons: IconRecord[]
  categories: CategoryRecord[]
  totalCount: number
  generatedAt: string
}
