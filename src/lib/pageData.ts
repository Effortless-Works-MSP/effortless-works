import type { ProductSection, PageMeta } from '@/types'

// ─── BUSINESS PAGE ──────────────────────────────────────────

export const BUSINESS_META: PageMeta = {
  eyebrow: 'For Business',
  title: 'Run your business',
  subtitle: 'effortlessly.',
  description:
    'Templates, trackers, and courses built for the entrepreneur who wants to stay organized without the overwhelm.',
}

export const BUSINESS_SECTIONS: ProductSection[] = [
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Stay on top of every project, goal, and deadline — all in one place.',
    products: [
      {
        id: 'pm-sheets',
        type: 'Google Sheets',
        name: 'Project Management Bundle',
        description: 'Goals dashboard, project dashboard, project folder template, version control, and individual brand set — all in Google Sheets.',
        price: 27,
        href: '/000010/pm-sheets',
        available: true,
        launchMonth: 'March',
        featured: true,
        tags: ['Goals', 'Projects', 'Tracking'],
      },
      {
        id: 'pm-notion',
        type: 'Notion',
        name: 'Project Management Bundle',
        description: 'The same powerful system — project folders, version control, and brand sets — built natively in Notion.',
        price: 27,
        href: '/000010/pm-notion',
        available: false,
        launchMonth: 'April',
        tags: ['Goals', 'Projects', 'Tracking'],
      },
    ],
  },
  {
    id: 'back-office',
    title: 'Back Office',
    description: 'Keep your operations clean — sales, KPIs, clients, payroll, and more.',
    products: [
      {
        id: 'bo-sheets',
        type: 'Google Sheets',
        name: 'Back Office Bundle',
        description: 'Sales tracking, KPI tracking, client tracking, commission tracking, payroll tracking, and recruitment tracking in one Google Sheets system.',
        price: 37,
        href: '/000009/bo-sheets',
        available: false,
        launchMonth: 'May',
        tags: ['Sales', 'KPIs', 'Clients', 'Payroll'],
      },
      {
        id: 'bo-notion',
        type: 'Notion',
        name: 'Back Office Bundle',
        description: 'All six back office trackers rebuilt for Notion — the same clarity, your preferred tool.',
        price: 37,
        href: '/000009/bo-notion',
        available: false,
        launchMonth: 'June',
        tags: ['Sales', 'KPIs', 'Clients', 'Payroll'],
      },
    ],
  },
  {
    id: 'b-howtos',
    title: 'How Tos',
    description: 'Learn how to use every tool — video walkthroughs, self-paced courses, and live instruction.',
    products: [
      {
        id: 'b-productvideos',
        type: 'Course',
        name: 'Product Walkthrough Videos',
        description: 'Short, focused video walkthroughs for every business template. Watch once, use forever.',
        href: '/000011/b-productvideos',
        available: false,
        launchMonth: 'Coming Soon',
        tags: ['Video', 'Free with purchase'],
      },
      {
        id: 'b-selfpaced',
        type: 'Course',
        name: 'Self Paced Courses',
        description: 'Go deep on each system at your own pace. Courses bundle seamlessly with their matching templates.',
        price: 97,
        href: '/000011/b-selfpaced',
        available: false,
        launchMonth: 'Coming Soon',
        tags: ['Self-paced', 'Bundled'],
      },
      {
        id: 'b-instructorled',
        type: 'Course',
        name: 'Instructor Led Courses',
        description: 'Live, guided sessions with direct access to ask questions and get your system set up right.',
        price: 197,
        href: '/000011/b-instructorled',
        available: false,
        launchMonth: 'Coming Soon',
        tags: ['Live', 'Guided'],
      },
    ],
  },
]

// ─── INDIVIDUALS PAGE ───────────────────────────────────────

export const INDIVIDUALS_META: PageMeta = {
  eyebrow: 'For Individuals',
  title: 'Organize your life',
  subtitle: 'all of it.',
  description:
    'Trackers and templates for every part of who you are — faith, family, health, growth, and everything in between.',
}

export const INDIVIDUALS_SECTIONS: ProductSection[] = [
  {
    id: 'personal-trackers',
    title: 'Personal Trackers',
    description: 'Track milestones across every area of your life — faith, family, health, skills, and more.',
    products: [
      {
        id: 'pt-sheets',
        type: 'Google Sheets',
        name: 'Personal Milestone Tracker',
        description: 'Faith, family, self-care, nutrition, exercise, skills, business, and education milestones — all tracked in one Google Sheet.',
        price: 19,
        href: '/000013/pt-sheets',
        available: false,
        launchMonth: 'July',
        featured: true,
        tags: ['Faith', 'Health', 'Habits', 'Growth'],
      },
      {
        id: 'pt-notion',
        type: 'Notion',
        name: 'Personal Milestone Tracker',
        description: 'The same eight life areas rebuilt as a beautiful, connected Notion workspace.',
        price: 19,
        href: '/000013/pt-notion',
        available: false,
        launchMonth: 'August',
        tags: ['Faith', 'Health', 'Habits', 'Growth'],
      },
    ],
  },
  {
    id: 'personal-projects',
    title: 'Personal Projects',
    description: 'Manage personal goals and projects with the same structure as the pros use.',
    products: [
      {
        id: 'pp-sheets',
        type: 'Google Sheets',
        name: 'Personal Project Bundle',
        description: 'Goals dashboard, project dashboard, project folders, version control, and individual branch sets — all in Google Sheets.',
        price: 27,
        href: '/000014/pp-sheets',
        available: false,
        launchMonth: 'September',
        tags: ['Goals', 'Projects', 'Planning'],
      },
      {
        id: 'pp-notion',
        type: 'Notion',
        name: 'Personal Project Bundle',
        description: 'The full personal project system rebuilt natively in Notion.',
        price: 27,
        href: '/000014/pp-notion',
        available: false,
        launchMonth: 'October',
        tags: ['Goals', 'Projects', 'Planning'],
      },
    ],
  },
  {
    id: 'life-tracker',
    title: 'Life Tracker',
    description: 'The complete system — every goal, project, and milestone across your whole life in one place.',
    products: [
      {
        id: 'lt-sheets',
        type: 'Google Sheets',
        name: 'Life OS — Google Sheets',
        description: 'Goals dashboard, project dashboard, project folder set, version control, and individual branch set. Your entire life, organized.',
        price: 47,
        href: '/000012/lt-sheets',
        available: false,
        launchMonth: 'November',
        featured: true,
        tags: ['Complete System', 'All Areas'],
      },
      {
        id: 'lt-notion',
        type: 'Notion',
        name: 'Life OS — Notion',
        description: 'The full Life OS experience rebuilt for Notion. Every system connected, every area covered.',
        price: 47,
        href: '/000012/lt-notion',
        available: false,
        launchMonth: 'December',
        tags: ['Complete System', 'All Areas'],
      },
    ],
  },
  {
    id: 'p-howtos',
    title: 'How Tos',
    description: 'Learn the system from scratch — video walkthroughs, self-paced courses, and live instruction.',
    products: [
      {
        id: 'p-productvideos',
        type: 'Course',
        name: 'Product Walkthrough Videos',
        description: 'Short video walkthroughs for every personal template. Free with every purchase.',
        href: '/000015/p-productvideos',
        available: false,
        launchMonth: 'Coming Soon',
        tags: ['Video', 'Free with purchase'],
      },
      {
        id: 'p-selfpaced',
        type: 'Course',
        name: 'Self Paced Courses',
        description: 'Deep-dive courses that bundle with their matching personal templates.',
        price: 97,
        href: '/000015/p-selfpaced',
        available: false,
        launchMonth: 'Coming Soon',
        tags: ['Self-paced', 'Bundled'],
      },
      {
        id: 'p-instructorled',
        type: 'Course',
        name: 'Instructor Led Courses',
        description: 'Live sessions to get your personal life system set up with guidance.',
        price: 197,
        href: '/000015/p-instructorled',
        available: false,
        launchMonth: 'Coming Soon',
        tags: ['Live', 'Guided'],
      },
    ],
  },
]

// ─── BUILD YOUR OWN ─────────────────────────────────────────

export const BUILD_META: PageMeta = {
  eyebrow: 'Custom Services',
  title: 'Build something',
  subtitle: 'made for you.',
  description:
    "Need something custom? I'll build it for you — websites, apps, onboarding flows, Notion systems, or Google Sheets setups tailored to your exact needs.",
}

export const BUILD_SERVICES = [
  {
    id: 'website',
    icon: '⬡',
    name: 'Website Builder',
    description: "A fully designed, production-ready website built to your brand and requirements. From landing pages to multi-page sites.",
    href: '/000008/website',
    tags: ['Next.js', 'Custom Design', 'SEO Ready'],
    cta: 'Request on Fiverr',
  },
  {
    id: 'app',
    icon: '◈',
    name: 'App Builder',
    description: 'Custom web applications tailored to your business workflow — dashboards, portals, tools.',
    href: '/000008/app',
    tags: ['Web App', 'Dashboard', 'Custom'],
    cta: 'Request on Fiverr',
  },
  {
    id: 'onboarding',
    icon: '◎',
    name: 'Onboarding Builder',
    description: 'A guided onboarding experience for your clients or team — structured, professional, and on-brand.',
    href: '/000008/onboarding',
    tags: ['Client Experience', 'Courses', 'Automation'],
    cta: 'Request on Fiverr',
  },
  {
    id: 'sheets',
    icon: '▦',
    name: 'Custom Google Sheets',
    description: 'A personalized Google Sheets system built around how your business actually works.',
    href: '/000008/sheets',
    tags: ['Google Sheets', 'Automation', 'Tailored'],
    cta: 'Request on Fiverr',
  },
  {
    id: 'notion',
    icon: '❖',
    name: 'Custom Notion Workspace',
    description: 'A complete Notion setup designed specifically for your life, team, or business.',
    href: '/000008/notion',
    tags: ['Notion', 'Workspace', 'Tailored'],
    cta: 'Request on Fiverr',
  },
]

// ─── CONTACT PAGE ───────────────────────────────────────────

export const CONTACT_META: PageMeta = {
  eyebrow: 'Get in Touch',
  title: "Let's talk",
  subtitle: 'we respond.',
  description: "Whether you have a question, a custom request, or just want to say salam — we're here.",
}

// ─── INFO PAGE ──────────────────────────────────────────────

export const INFO_META: PageMeta = {
  eyebrow: 'About',
  title: 'Behind the',
  subtitle: 'works.',
  description: 'Effortless Works is a digital product studio building tools for the person doing all of it — business, personal growth, and faith.',
}
