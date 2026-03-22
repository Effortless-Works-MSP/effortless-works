import type { Product, LifeArea, NavLink } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Business Models', href: '#products' },
  { label: 'About', href: '#about' },
]

export const MARQUEE_ITEMS: string[] = [
  'Business in a Box',
  'Luma Powered',
  'Crocheting Business',
  'Content Creation',
  'Automated Sales',
  '3D Printing',
  'Fully Automated',
  'Pick & Launch',
]

export const PRODUCTS: Product[] = [
  {
    id: 'life-os',
    type: 'Google Sheets',
    name: 'Life OS Tracker',
    description:
      'Track goals, habits, finances, and progress across every area of your life — in one connected spreadsheet.',
    price: 27,
    href: '/individuals',
    available: false,
    launchMonth: 'November',
    featured: true,
  },
  {
    id: 'business-hub',
    type: 'Notion',
    name: 'Business Hub',
    description:
      'A complete Notion workspace for your business — client management, projects, content, and finances in one place.',
    price: 19,
    href: '/business',
    available: false,
    launchMonth: 'June',
  },
  {
    id: 'clarity-method',
    type: 'Course',
    name: 'The Clarity Method',
    description:
      'A guided course to build your personal system from scratch — values, goals, weekly reviews, and daily rhythms.',
    price: 97,
    href: '/courses',
    available: false,
    launchMonth: 'Coming Soon',
  },
]

export const LIFE_AREAS: LifeArea[] = [
  {
    number: '01',
    name: 'Crocheting Business',
    description: 'Sentro knitting machines + Luma. Orders, Etsy listings, inventory, and marketing all run automatically.',
    tags: ['Available', 'Physical Product', 'Luma Powered'],
  },
  {
    number: '02',
    name: 'Content Creation',
    description: 'Books, podcasts, YouTube — one automated pipeline. Luma schedules, promotes, and grows your audience.',
    tags: ['Available', 'Digital', 'Luma Powered'],
  },
  {
    number: '03',
    name: 'Automated Sales',
    description: 'Companies need sales — you run it for them. Luma handles lead gen, outreach, follow-ups, and reporting.',
    tags: ['Coming Soon', 'B2B Service', 'Luma Powered'],
  },
  {
    number: '04',
    name: '3D Printing Business',
    description: 'Print custom products on demand. Luma manages your store, orders, and reprint queue automatically.',
    tags: ['Coming Soon', 'Physical Product', 'Luma Powered'],
  },
]

export const PILLARS: string[] = [
  'Business',
  'Personal Growth',
  'Faith',
  'Finance',
  'Health',
  'Relationships',
]
