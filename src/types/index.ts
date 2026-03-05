export interface Product {
  id: string
  type: 'Google Sheets' | 'Notion' | 'Course' | 'Service'
  name: string
  description: string
  price?: number
  href: string
  available: boolean
  launchMonth?: string
  featured?: boolean
  tags?: string[]
}

export interface ProductSection {
  id: string
  title: string
  description: string
  products: Product[]
}

export interface PageMeta {
  title: string
  subtitle: string
  description: string
  eyebrow: string
}

export interface LifeArea {
  number: string
  name: string
  description: string
  tags: string[]
}

export interface NavLink {
  label: string
  href: string
}
