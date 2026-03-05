import type { Product, LifeArea, NavLink } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Templates', href: '#products' },
  { label: 'Spreadsheets', href: '#products' },
  { label: 'Courses', href: '#products' },
  { label: 'About', href: '#about' },
]

export const MARQUEE_ITEMS: string[] = [
  'Notion Templates',
  'Spreadsheets',
  'Business Trackers',
  'Faith & Growth',
  'Life Planning',
  'Goal Setting',
  'Courses',
  'Financial Clarity',
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
    name: 'Business',
    description: 'Revenue, clients, projects, and growth — all tracked and organized.',
    tags: ['Finance', 'Clients', 'Goals'],
  },
  {
    number: '02',
    name: 'Personal Growth',
    description: 'Books, habits, reflections, and the version of yourself you\'re becoming.',
    tags: ['Habits', 'Reading', 'Mindset'],
  },
  {
    number: '03',
    name: 'Faith',
    description: 'Devotionals, prayer logs, and spiritual rhythms that ground everything else.',
    tags: ['Prayer', 'Scripture', 'Journal'],
  },
  {
    number: '04',
    name: 'Life Admin',
    description: 'Health, home, relationships — the everyday things that deserve their own space.',
    tags: ['Health', 'Home', 'Family'],
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
