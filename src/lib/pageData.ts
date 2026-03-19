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
    "Need something custom? I'll build it for you — websites, apps, Notion systems, or Google Sheets setups tailored to your exact needs.",
}

export const BUILD_SERVICES = [
  {
    id: 'website',
    icon: '⬡',
    name: 'Website Builder',
    description: "A fully designed, production-ready website built to your brand and requirements. From landing pages to multi-page sites.",
    href: 'https://www.fiverr.com/s/zWw3REe',
    tags: ['Next.js', 'Custom Design', 'SEO Ready'],
    cta: 'Request on Fiverr',
  },
  {
    id: 'app',
    icon: '◈',
    name: 'App Builder',
    description: 'Custom web applications tailored to your business workflow — dashboards, portals, tools.',
    href: 'https://www.fiverr.com/s/jjzVZzw',
    tags: ['Web App', 'Dashboard', 'Custom'],
    cta: 'Request on Fiverr',
  },
  {
    id: 'sheets',
    icon: '▦',
    name: 'Custom Google Sheets',
    description: 'A personalized Google Sheets system built around how your business actually works.',
    href: 'https://www.fiverr.com/s/1qlNwDK',
    tags: ['Google Sheets', 'Automation', 'Tailored'],
    cta: 'Request on Fiverr',
  },
  {
    id: 'notion',
    icon: '❖',
    name: 'Custom Notion Workspace',
    description: 'A complete Notion setup designed specifically for your life, team, or business.',
    href: 'https://www.fiverr.com/s/VYl34AV',
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
// ADD THIS TO THE BOTTOM OF src/lib/pageData.ts


// ─── BACK OFFICE — SHEETS (/000009/bo-sheets) ───────────────────────────────

export const BACK_OFFICE_SHEETS_META: PageMeta = {
  eyebrow: 'Business · Google Sheets',
  title: 'Back Office',
  subtitle: 'Google Sheets.',
  description:
    'Sales, KPIs, clients, commissions, payroll, and recruitment — all tracked in one clean Google Sheets system. Launching May.',
}

export const BACK_OFFICE_SHEETS_SECTION: ProductSection = {
  id: 'bo-sheets',
  title: 'Back Office Bundle — Google Sheets',
  description: 'Six trackers, one system. Everything your back office needs to stay clean and organized.',
  products: [
    { id: 'bo-s-sales', type: 'Google Sheets', name: 'Sales Tracking', description: 'Track every deal from lead to close. Monitor revenue targets and pipeline health in real time.', href: '#', available: false, launchMonth: 'May', tags: ['Revenue', 'Deals', 'Pipeline', 'Forecasting'] },
    { id: 'bo-s-kpi', type: 'Google Sheets', name: 'KPI Tracking', description: 'Define and monitor your key performance indicators across every area of the business.', href: '#', available: false, launchMonth: 'May', tags: ['Metrics', 'Goals', 'Performance', 'Reporting'] },
    { id: 'bo-s-client', type: 'Google Sheets', name: 'Client Tracking', description: 'Keep your client relationships organized with full contact history and follow-up reminders.', href: '#', available: false, launchMonth: 'May', tags: ['CRM', 'Contacts', 'Follow-ups', 'History'] },
    { id: 'bo-s-commission', type: 'Google Sheets', name: 'Commission Tracking', description: 'Automatically calculate commissions per rep based on your payout structure.', href: '#', available: false, launchMonth: 'May', tags: ['Payouts', 'Reps', 'Calculations', 'Splits'] },
    { id: 'bo-s-payroll', type: 'Google Sheets', name: 'Payroll Tracking', description: 'Track hours, pay periods, and employee wages in a clean, organized sheet.', href: '#', available: false, launchMonth: 'May', tags: ['Hours', 'Pay Periods', 'Employees', 'Wages'] },
    { id: 'bo-s-recruit', type: 'Google Sheets', name: 'Recruitment Tracking', description: 'Manage your full hiring funnel from application to offer letter.', href: '#', available: false, launchMonth: 'May', tags: ['Applicants', 'Pipeline', 'Hiring', 'Interviews'] },
  ],
}

// ─── BACK OFFICE — NOTION (/000009/bo-notion) ───────────────────────────────

export const BACK_OFFICE_NOTION_META: PageMeta = {
  eyebrow: 'Business · Notion',
  title: 'Back Office',
  subtitle: 'Notion.',
  description:
    'The full back office system rebuilt as a connected Notion workspace. Sales, KPIs, clients, commissions, payroll, and recruitment — all in one hub. Launching June.',
}

export const BACK_OFFICE_NOTION_SECTION: ProductSection = {
  id: 'bo-notion',
  title: 'Back Office Bundle — Notion',
  description: 'All six back office trackers rebuilt for Notion — the same clarity, your preferred tool.',
  products: [
    { id: 'bo-n-sales', type: 'Notion', name: 'Sales Tracking', description: 'A Notion database to track every deal from lead to close with linked views and filters.', href: '#', available: false, launchMonth: 'June', tags: ['Revenue', 'Deals', 'Pipeline', 'Forecasting'] },
    { id: 'bo-n-kpi', type: 'Notion', name: 'KPI Tracking', description: 'Set KPIs and link them directly to your projects and team members inside Notion.', href: '#', available: false, launchMonth: 'June', tags: ['Metrics', 'Goals', 'Performance', 'Reporting'] },
    { id: 'bo-n-client', type: 'Notion', name: 'Client Tracking', description: 'A full CRM inside Notion with linked notes, tasks, and communication history.', href: '#', available: false, launchMonth: 'June', tags: ['CRM', 'Contacts', 'Follow-ups', 'History'] },
    { id: 'bo-n-commission', type: 'Notion', name: 'Commission Tracking', description: 'Track and calculate commissions per rep inside a connected Notion workspace.', href: '#', available: false, launchMonth: 'June', tags: ['Payouts', 'Reps', 'Calculations', 'Splits'] },
    { id: 'bo-n-payroll', type: 'Notion', name: 'Payroll Tracking', description: 'Log hours and manage pay periods with Notion formulas doing the heavy lifting.', href: '#', available: false, launchMonth: 'June', tags: ['Hours', 'Pay Periods', 'Employees', 'Wages'] },
    { id: 'bo-n-recruit', type: 'Notion', name: 'Recruitment Tracking', description: 'A Notion hiring board with kanban and table views across your full funnel.', href: '#', available: false, launchMonth: 'June', tags: ['Applicants', 'Pipeline', 'Hiring', 'Interviews'] },
  ],
}

// ─── PROJECT MANAGEMENT — SHEETS (/000010/pm-sheets) ────────────────────────

export const PM_SHEETS_META: PageMeta = {
  eyebrow: 'Business · Google Sheets',
  title: 'Project Management',
  subtitle: 'Google Sheets.',
  description:
    'Goals dashboards, project tracking, version control, and brand sets — a complete project system in Google Sheets. Launching March.',
}

export const PM_SHEETS_SECTION: ProductSection = {
  id: 'pm-sheets',
  title: 'Project Management Bundle — Google Sheets',
  description: 'Five templates that work together as one complete project management system.',
  products: [
    { id: 'pm-s-goals', type: 'Google Sheets', name: 'Goals Dashboard', description: 'Set business goals and track progress toward each milestone across any time frame.', href: '#', available: false, launchMonth: 'March', tags: ['OKRs', 'Milestones', 'Priorities', 'Quarterly'] },
    { id: 'pm-s-project', type: 'Google Sheets', name: 'Project Dashboard', description: 'A master view of all your active projects — status, owners, deadlines, and blockers.', href: '#', available: false, launchMonth: 'March', tags: ['Status', 'Timeline', 'Tasks', 'Progress'] },
    { id: 'pm-s-folder', type: 'Google Sheets', name: 'Project Folder Template', description: 'A standardized folder and file structure template so every project starts organized.', href: '#', available: false, launchMonth: 'March', tags: ['Organization', 'File Structure', 'Folders', 'Naming'] },
    { id: 'pm-s-version', type: 'Google Sheets', name: 'Version Control Template', description: 'Track every version of your deliverables with a clean revision log built into Sheets.', href: '#', available: false, launchMonth: 'March', tags: ['Versions', 'History', 'Revisions', 'Changelog'] },
    { id: 'pm-s-brand', type: 'Google Sheets', name: 'Individual Brand Set', description: 'A single-brand asset tracker to keep all your brand elements documented and organized.', href: '#', available: false, launchMonth: 'March', tags: ['Assets', 'Identity', 'Brand', 'Colors', 'Fonts'] },
  ],
}

// ─── PROJECT MANAGEMENT — NOTION (/000010/pm-notion) ────────────────────────

export const PM_NOTION_META: PageMeta = {
  eyebrow: 'Business · Notion',
  title: 'Project Management',
  subtitle: 'Notion.',
  description:
    'The full project management system rebuilt as a connected Notion workspace — folders, version tracking, and brand sets all linked. Launching April.',
}

export const PM_NOTION_SECTION: ProductSection = {
  id: 'pm-notion',
  title: 'Project Management Bundle — Notion',
  description: 'Three Notion templates pre-linked in one workspace. Your project system, ready from day one.',
  products: [
    { id: 'pm-n-folder', type: 'Notion', name: 'Project Folder Template', description: 'A Notion-native folder structure template to start every project clean and organized.', href: '#', available: false, launchMonth: 'April', tags: ['Organization', 'File Structure', 'Folders', 'Naming'] },
    { id: 'pm-n-version', type: 'Notion', name: 'Version Control Template', description: 'Log and track every version of your work with linked revision history in Notion.', href: '#', available: false, launchMonth: 'April', tags: ['Versions', 'History', 'Revisions', 'Changelog'] },
    { id: 'pm-n-brand', type: 'Notion', name: 'Individual Brand Set', description: 'Keep every brand asset documented and accessible inside your Notion workspace.', href: '#', available: false, launchMonth: 'April', tags: ['Assets', 'Identity', 'Brand', 'Colors', 'Fonts'] },
  ],
}

// ─── BUSINESS HOW TOS — PRODUCT VIDEOS (/000011/b-productvideos) ────────────

export const B_VIDEOS_META: PageMeta = {
  eyebrow: 'Business · How Tos',
  title: 'Product',
  subtitle: 'Videos.',
  description:
    'Free step-by-step video walkthroughs for every Business tool. Watch how each sheet and Notion template works before you buy.',
}

export const B_VIDEOS_SECTION: ProductSection = {
  id: 'b-productvideos',
  title: 'Product Walkthrough Videos',
  description: 'Videos release alongside each product. Free with every purchase.',
  products: [
    { id: 'b-v-bosheets', type: 'Course', name: 'Back Office Walkthrough — Sheets', description: 'A full tour of the Back Office Google Sheets suite — every tab and formula explained.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Google Sheets', 'Back Office', 'Sales', 'KPIs'] },
    { id: 'b-v-bonotion', type: 'Course', name: 'Back Office Walkthrough — Notion', description: 'How to set up and use the Back Office Notion workspace from scratch.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Notion', 'Back Office', 'CRM', 'Templates'] },
    { id: 'b-v-pmsheets', type: 'Course', name: 'Project Management Walkthrough — Sheets', description: 'Walk through the full project management sheet system end to end.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Google Sheets', 'Projects', 'Goals', 'Dashboard'] },
    { id: 'b-v-pmnotion', type: 'Course', name: 'Project Management Walkthrough — Notion', description: 'How to use the Notion project folder, version control, and brand set templates together.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Notion', 'Projects', 'Version Control', 'Brand'] },
  ],
}

// ─── BUSINESS HOW TOS — SELF PACED (/000011/b-selfpaced) ────────────────────

export const B_SELFPACED_META: PageMeta = {
  eyebrow: 'Business · How Tos',
  title: 'Self Paced',
  subtitle: 'Courses.',
  description:
    'Go at your own speed. Courses that teach every Business tool, bundled with the templates so you get the system and training together.',
}

export const B_SELFPACED_SECTION: ProductSection = {
  id: 'b-selfpaced',
  title: 'Self Paced Courses — Business',
  description: 'Every course comes bundled with the template it covers. One purchase, everything included.',
  products: [
    { id: 'b-sp-bosheets', type: 'Course', name: 'Back Office Mastery — Sheets', description: 'Learn the complete Back Office Sheets system at your own pace. Template included.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Google Sheets', 'Back Office'] },
    { id: 'b-sp-bonotion', type: 'Course', name: 'Back Office Mastery — Notion', description: 'Master the Back Office Notion workspace with this bundled self-paced course.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Notion', 'Back Office'] },
    { id: 'b-sp-pmsheets', type: 'Course', name: 'Project Management Mastery — Sheets', description: 'Full training on the Project Management sheet system. Template included.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Google Sheets', 'Projects'] },
    { id: 'b-sp-pmnotion', type: 'Course', name: 'Project Management Mastery — Notion', description: 'Learn the Notion project workspace with this bundled self-paced course.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Notion', 'Projects'] },
  ],
}

// ─── BUSINESS HOW TOS — INSTRUCTOR LED (/000011/b-instructorled) ─────────────

export const B_INSTRUCTOR_META: PageMeta = {
  eyebrow: 'Business · How Tos',
  title: 'Instructor Led',
  subtitle: 'Courses.',
  description:
    'Live guided sessions to get your system set up right. Ask questions in real time and leave with a fully working back office or project management setup.',
}

export const B_INSTRUCTOR_SECTION: ProductSection = {
  id: 'b-instructorled',
  title: 'Instructor Led Courses — Business',
  description: 'All live sessions come bundled with the templates covered. You leave with both the tools and the knowledge.',
  products: [
    { id: 'b-il-bosheets', type: 'Course', name: 'Back Office Live Session — Sheets', description: 'A live walkthrough of the Back Office Sheets system with Q&A and personal setup help.', price: 197, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Live', 'Guided', 'Bundled Tools', 'Google Sheets'] },
    { id: 'b-il-bonotion', type: 'Course', name: 'Back Office Live Session — Notion', description: 'Get your Notion back office workspace set up live with instructor guidance.', price: 197, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Live', 'Guided', 'Bundled Tools', 'Notion'] },
    { id: 'b-il-pmsheets', type: 'Course', name: 'Project Management Live Session', description: 'A live deep-dive into the project management system tailored to your business needs.', price: 197, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Live', 'Guided', 'Bundled Tools', 'Projects'] },
  ],
}

// ─── LIFE TRACKER — SHEETS (/000012/lt-sheets) ──────────────────────────────

export const LT_SHEETS_META: PageMeta = {
  eyebrow: 'Individuals · Google Sheets',
  title: 'Life Tracker',
  subtitle: 'Google Sheets.',
  description:
    'A complete personal operating system in Google Sheets. Goals, projects, folders, version control, and branches — your whole life, organized. Launching November.',
}

export const LT_SHEETS_SECTION: ProductSection = {
  id: 'lt-sheets',
  title: 'Life Tracker Bundle — Google Sheets',
  description: 'Five templates designed to work together as one personal life management system.',
  products: [
    { id: 'lt-s-goals', type: 'Google Sheets', name: 'Goals Dashboard', description: 'Track your personal goals across every area of life from one clean dashboard.', href: '#', available: false, launchMonth: 'November', tags: ['OKRs', 'Milestones', 'Life Goals', 'Priorities'] },
    { id: 'lt-s-project', type: 'Google Sheets', name: 'Project Dashboard', description: 'A personal project tracker to keep every side project, goal, and initiative visible.', href: '#', available: false, launchMonth: 'November', tags: ['Status', 'Progress', 'Personal Projects', 'Timeline'] },
    { id: 'lt-s-folder', type: 'Google Sheets', name: 'Project Folder Set', description: 'A personal folder structure template to keep your digital life organized.', href: '#', available: false, launchMonth: 'November', tags: ['Organization', 'File Structure', 'Personal Files'] },
    { id: 'lt-s-version', type: 'Google Sheets', name: 'Version Control Folder Set', description: 'Track changes and revisions across your personal work with version control built in.', href: '#', available: false, launchMonth: 'November', tags: ['Versions', 'History', 'Personal Projects', 'Revisions'] },
    { id: 'lt-s-branch', type: 'Google Sheets', name: 'Individual Branch Set', description: 'Organize the different branches of your life — faith, business, family, and more.', href: '#', available: false, launchMonth: 'November', tags: ['Identity', 'Focus Areas', 'Branches', 'Personal'] },
  ],
}

// ─── LIFE TRACKER — NOTION (/000012/lt-notion) ──────────────────────────────

export const LT_NOTION_META: PageMeta = {
  eyebrow: 'Individuals · Notion',
  title: 'Life Tracker',
  subtitle: 'Notion.',
  description:
    'Your entire life organized inside one connected Notion workspace. Goals, projects, folders, version history, and branches — all linked. Launching December.',
}

export const LT_NOTION_SECTION: ProductSection = {
  id: 'lt-notion',
  title: 'Life Tracker Bundle — Notion',
  description: 'All five templates pre-linked in one master Notion workspace. Ready from day one.',
  products: [
    { id: 'lt-n-goals', type: 'Notion', name: 'Goals Dashboard', description: 'A Notion goals dashboard with linked databases for every area of your life.', href: '#', available: false, launchMonth: 'December', tags: ['OKRs', 'Milestones', 'Life Goals', 'Priorities'] },
    { id: 'lt-n-project', type: 'Notion', name: 'Project Dashboard', description: 'Track every personal project in a connected Notion workspace with multiple views.', href: '#', available: false, launchMonth: 'December', tags: ['Status', 'Progress', 'Personal Projects', 'Timeline'] },
    { id: 'lt-n-folder', type: 'Notion', name: 'Project Folder Set', description: 'A Notion-native folder system to keep your personal files and notes organized.', href: '#', available: false, launchMonth: 'December', tags: ['Organization', 'File Structure', 'Personal Files'] },
    { id: 'lt-n-version', type: 'Notion', name: 'Version Control Folder Set', description: 'Log revisions and track the evolution of your personal projects inside Notion.', href: '#', available: false, launchMonth: 'December', tags: ['Versions', 'History', 'Personal Projects', 'Revisions'] },
    { id: 'lt-n-branch', type: 'Notion', name: 'Individual Branch Set', description: 'Separate the branches of your life — faith, business, family, growth — in a clean Notion structure.', href: '#', available: false, launchMonth: 'December', tags: ['Identity', 'Focus Areas', 'Branches', 'Personal'] },
  ],
}

// ─── PERSONAL TRACKERS — SHEETS (/000013/pt-sheets) ─────────────────────────

export const PT_SHEETS_META: PageMeta = {
  eyebrow: 'Individuals · Google Sheets',
  title: 'Personal Trackers',
  subtitle: 'Google Sheets.',
  description:
    'Milestone trackers for every area of your life — faith, family, self-care, nutrition, exercise, skills, business, and education. Launching July.',
}

export const PT_SHEETS_SECTION: ProductSection = {
  id: 'pt-sheets',
  title: 'Personal Milestone Trackers — Google Sheets',
  description: 'Eight standalone trackers designed to slot together into one personal growth dashboard.',
  products: [
    { id: 'pt-s-faith', type: 'Google Sheets', name: 'Faith Milestones', description: 'Track your Islamic practice milestones — prayer consistency, Quran progress, and spiritual habits.', href: '#', available: false, launchMonth: 'July', tags: ['Islam', 'Quran', 'Prayer', 'Spiritual Growth'] },
    { id: 'pt-s-family', type: 'Google Sheets', name: 'Family Milestones', description: 'Log family moments, goals, and milestones to stay intentional about the people who matter most.', href: '#', available: false, launchMonth: 'July', tags: ['Relationships', 'Family Goals', 'Connection'] },
    { id: 'pt-s-selfcare', type: 'Google Sheets', name: 'Self Care Milestones', description: 'Track self-care habits and wellness milestones to protect your energy and mental health.', href: '#', available: false, launchMonth: 'July', tags: ['Wellness', 'Mental Health', 'Rest', 'Boundaries'] },
    { id: 'pt-s-nutrition', type: 'Google Sheets', name: 'Nutrition Milestones', description: 'Monitor your nutrition habits, hydration, and healthy eating milestones over time.', href: '#', available: false, launchMonth: 'July', tags: ['Food', 'Hydration', 'Halal', 'Meal Planning'] },
    { id: 'pt-s-exercise', type: 'Google Sheets', name: 'Exercise Milestones', description: 'Track workouts, fitness milestones, and progress toward your movement and strength goals.', href: '#', available: false, launchMonth: 'July', tags: ['Fitness', 'Strength', 'Cardio', 'Movement'] },
    { id: 'pt-s-skills', type: 'Google Sheets', name: 'Skills Milestones', description: 'Log every new skill you learn and track your progress toward mastery.', href: '#', available: false, launchMonth: 'July', tags: ['Learning', 'Certifications', 'Crafts', 'Growth'] },
    { id: 'pt-s-business', type: 'Google Sheets', name: 'Business Milestones', description: 'Celebrate and track every business milestone — from first sale to major launches.', href: '#', available: false, launchMonth: 'July', tags: ['Revenue', 'Launches', 'Goals', 'Entrepreneurship'] },
    { id: 'pt-s-education', type: 'Google Sheets', name: 'Education Milestones', description: 'Track your educational journey — books read, courses completed, and knowledge gained.', href: '#', available: false, launchMonth: 'July', tags: ['Courses', 'Books', 'Certifications', 'Study'] },
  ],
}

// ─── PERSONAL TRACKERS — NOTION (/000013/pt-notion) ─────────────────────────

export const PT_NOTION_META: PageMeta = {
  eyebrow: 'Individuals · Notion',
  title: 'Personal Trackers',
  subtitle: 'Notion.',
  description:
    'All eight milestone trackers rebuilt as a connected Notion workspace. Faith, family, wellness, and every area in between. Launching August.',
}

export const PT_NOTION_SECTION: ProductSection = {
  id: 'pt-notion',
  title: 'Personal Milestone Trackers — Notion',
  description: 'All eight trackers linked inside one master personal growth workspace in Notion.',
  products: [
    { id: 'pt-n-faith', type: 'Notion', name: 'Faith Milestones', description: 'A Notion tracker for Islamic practice milestones — prayer, Quran, and spiritual development.', href: '#', available: false, launchMonth: 'August', tags: ['Islam', 'Quran', 'Prayer', 'Spiritual Growth'] },
    { id: 'pt-n-family', type: 'Notion', name: 'Family Milestones', description: 'Stay intentional about family with a linked Notion milestone tracker.', href: '#', available: false, launchMonth: 'August', tags: ['Relationships', 'Family Goals', 'Connection'] },
    { id: 'pt-n-selfcare', type: 'Notion', name: 'Self Care Milestones', description: 'Track self-care habits and protect your energy with a Notion wellness tracker.', href: '#', available: false, launchMonth: 'August', tags: ['Wellness', 'Mental Health', 'Rest', 'Boundaries'] },
    { id: 'pt-n-nutrition', type: 'Notion', name: 'Nutrition Milestones', description: 'Log nutrition habits and hydration milestones in a clean Notion database.', href: '#', available: false, launchMonth: 'August', tags: ['Food', 'Hydration', 'Halal', 'Meal Planning'] },
    { id: 'pt-n-exercise', type: 'Notion', name: 'Exercise Milestones', description: 'Track your workouts and fitness milestones inside a connected Notion workout log.', href: '#', available: false, launchMonth: 'August', tags: ['Fitness', 'Strength', 'Cardio', 'Movement'] },
    { id: 'pt-n-skills', type: 'Notion', name: 'Skills Milestones', description: 'A Notion skills tracker to log every skill learned and measure your progress to mastery.', href: '#', available: false, launchMonth: 'August', tags: ['Learning', 'Certifications', 'Crafts', 'Growth'] },
    { id: 'pt-n-business', type: 'Notion', name: 'Business Milestones', description: 'Record every business win and milestone in a Notion database linked to your goals.', href: '#', available: false, launchMonth: 'August', tags: ['Revenue', 'Launches', 'Goals', 'Entrepreneurship'] },
    { id: 'pt-n-education', type: 'Notion', name: 'Education Milestones', description: 'Track books, courses, and certifications in your Notion educational journey log.', href: '#', available: false, launchMonth: 'August', tags: ['Courses', 'Books', 'Certifications', 'Study'] },
  ],
}

// ─── PERSONAL PROJECTS — SHEETS (/000014/pp-sheets) ─────────────────────────

export const PP_SHEETS_META: PageMeta = {
  eyebrow: 'Individuals · Google Sheets',
  title: 'Personal Projects',
  subtitle: 'Google Sheets.',
  description:
    'Manage passion projects, side hustles, and creative work with the same structure the pros use — in Google Sheets. Launching September.',
}

export const PP_SHEETS_SECTION: ProductSection = {
  id: 'pp-sheets',
  title: 'Personal Project Bundle — Google Sheets',
  description: 'Five templates mirroring the Business system, tailored for personal use.',
  products: [
    { id: 'pp-s-goals', type: 'Google Sheets', name: 'Goals Dashboard', description: 'A personal goals dashboard to keep your most important projects front and center.', href: '#', available: false, launchMonth: 'September', tags: ['Personal Goals', 'Vision', 'Milestones', 'Priorities'] },
    { id: 'pp-s-project', type: 'Google Sheets', name: 'Project Dashboard', description: 'Track every personal project — passion projects and side hustles — in one dashboard.', href: '#', available: false, launchMonth: 'September', tags: ['Status', 'Progress', 'Side Projects', 'Timeline'] },
    { id: 'pp-s-folder', type: 'Google Sheets', name: 'Project Folder Set', description: 'A personal folder structure template for your creative and personal project files.', href: '#', available: false, launchMonth: 'September', tags: ['Organization', 'Structure', 'Files', 'Personal'] },
    { id: 'pp-s-version', type: 'Google Sheets', name: 'Version Control Set', description: 'Track drafts, revisions, and versions of your personal creative work.', href: '#', available: false, launchMonth: 'September', tags: ['Versions', 'History', 'Drafts', 'Revisions'] },
    { id: 'pp-s-branch', type: 'Google Sheets', name: 'Individual Branch Set', description: 'Organize your personal projects by branch — faith, creative work, business ideas, and more.', href: '#', available: false, launchMonth: 'September', tags: ['Focus Areas', 'Interests', 'Identity', 'Branches'] },
  ],
}

// ─── PERSONAL PROJECTS — NOTION (/000014/pp-notion) ─────────────────────────

export const PP_NOTION_META: PageMeta = {
  eyebrow: 'Individuals · Notion',
  title: 'Personal Projects',
  subtitle: 'Notion.',
  description:
    'Manage your personal projects inside a fully connected Notion workspace. Goals, dashboards, folders, version history, and branches — all linked. Launching October.',
}

export const PP_NOTION_SECTION: ProductSection = {
  id: 'pp-notion',
  title: 'Personal Project Bundle — Notion',
  description: 'All templates pre-linked inside a single Notion workspace. Your personal project system, ready from day one.',
  products: [
    { id: 'pp-n-goals', type: 'Notion', name: 'Goals Dashboard', description: 'A Notion goals dashboard linked to your projects, branches, and personal milestones.', href: '#', available: false, launchMonth: 'October', tags: ['Personal Goals', 'Vision', 'Milestones', 'Priorities'] },
    { id: 'pp-n-project', type: 'Notion', name: 'Project Dashboard', description: 'A Notion project tracker with kanban, table, and gallery views for your personal work.', href: '#', available: false, launchMonth: 'October', tags: ['Status', 'Progress', 'Side Projects', 'Timeline'] },
    { id: 'pp-n-folder', type: 'Notion', name: 'Project Folder Set', description: 'A personal Notion folder system to keep creative files, notes, and projects organized.', href: '#', available: false, launchMonth: 'October', tags: ['Organization', 'Structure', 'Files', 'Personal'] },
    { id: 'pp-n-version', type: 'Notion', name: 'Version Control Set', description: 'A Notion revision tracker for your personal creative and project work.', href: '#', available: false, launchMonth: 'October', tags: ['Versions', 'History', 'Drafts', 'Revisions'] },
    { id: 'pp-n-branch', type: 'Notion', name: 'Individual Branch Set', description: 'Divide your personal life into branches inside Notion — faith, creative, business, and growth.', href: '#', available: false, launchMonth: 'October', tags: ['Focus Areas', 'Interests', 'Identity', 'Branches'] },
  ],
}

// ─── INDIVIDUALS HOW TOS — PRODUCT VIDEOS (/000015/p-productvideos) ──────────

export const P_VIDEOS_META: PageMeta = {
  eyebrow: 'Individuals · How Tos',
  title: 'Product',
  subtitle: 'Videos.',
  description:
    'Free video walkthroughs of every Individuals tool. Watch how each personal tracker and life system works before you commit.',
}

export const P_VIDEOS_SECTION: ProductSection = {
  id: 'p-productvideos',
  title: 'Product Walkthrough Videos — Individuals',
  description: 'Videos release alongside each product. Free with every purchase.',
  products: [
    { id: 'p-v-ltsheets', type: 'Course', name: 'Life Tracker Walkthrough — Sheets', description: 'A full tour of the Life Tracker Google Sheets system — every tab explained.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Google Sheets', 'Life Tracker', 'Goals', 'Projects'] },
    { id: 'p-v-ltnotion', type: 'Course', name: 'Life Tracker Walkthrough — Notion', description: 'How to set up and use the Life Tracker Notion workspace.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Notion', 'Life Tracker', 'Goals', 'Workspace'] },
    { id: 'p-v-ptsheets', type: 'Course', name: 'Personal Trackers Walkthrough — Sheets', description: 'Walk through all eight Personal Tracker sheets — faith, family, wellness, and more.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Google Sheets', 'Faith', 'Fitness', 'Milestones'] },
    { id: 'p-v-ptnotion', type: 'Course', name: 'Personal Trackers Walkthrough — Notion', description: 'How to use the Personal Tracker Notion workspace.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Notion', 'Milestones', 'Personal Growth'] },
    { id: 'p-v-ppsheets', type: 'Course', name: 'Personal Projects Walkthrough — Sheets', description: 'A full walkthrough of the Personal Projects Sheets system.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Google Sheets', 'Projects', 'Side Hustle'] },
    { id: 'p-v-ppnotion', type: 'Course', name: 'Personal Projects Walkthrough — Notion', description: 'How to use the Personal Projects Notion workspace.', href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Notion', 'Projects', 'Creative Work'] },
  ],
}

// ─── INDIVIDUALS HOW TOS — SELF PACED (/000015/p-selfpaced) ─────────────────

export const P_SELFPACED_META: PageMeta = {
  eyebrow: 'Individuals · How Tos',
  title: 'Self Paced',
  subtitle: 'Courses.',
  description:
    'Learn every personal tool on your own schedule. Self-paced courses bundled with the templates so you get the system and training in one purchase.',
}

export const P_SELFPACED_SECTION: ProductSection = {
  id: 'p-selfpaced',
  title: 'Self Paced Courses — Individuals',
  description: 'Every course comes bundled with the Google Sheets or Notion template it covers.',
  products: [
    { id: 'p-sp-ltsheets', type: 'Course', name: 'Life Tracker Mastery — Sheets', description: 'Learn the full Life Tracker Sheets system at your own pace. Template included.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Google Sheets'] },
    { id: 'p-sp-ltnotion', type: 'Course', name: 'Life Tracker Mastery — Notion', description: 'Master the Life Tracker Notion workspace with this bundled course.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Notion'] },
    { id: 'p-sp-ptsheets', type: 'Course', name: 'Personal Trackers Mastery — Sheets', description: 'Learn all eight personal milestone trackers at your own pace.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Milestones'] },
    { id: 'p-sp-ptnotion', type: 'Course', name: 'Personal Trackers Mastery — Notion', description: 'Go through all eight Notion personal trackers at your own speed.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Milestones'] },
    { id: 'p-sp-ppsheets', type: 'Course', name: 'Personal Projects Mastery — Sheets', description: 'Learn the Personal Projects Sheets system with a bundled self-paced course.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Projects'] },
    { id: 'p-sp-ppnotion', type: 'Course', name: 'Personal Projects Mastery — Notion', description: 'Master the Personal Projects Notion workspace with this bundled course.', price: 97, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Self Paced', 'Bundled Tools', 'Projects'] },
  ],
}

// ─── INDIVIDUALS HOW TOS — INSTRUCTOR LED (/000015/p-instructorled) ──────────

export const P_INSTRUCTOR_META: PageMeta = {
  eyebrow: 'Individuals · How Tos',
  title: 'Instructor Led',
  subtitle: 'Courses.',
  description:
    'Live sessions to get your personal life system fully set up. Ask questions in real time and leave with a working personal operating system.',
}

export const P_INSTRUCTOR_SECTION: ProductSection = {
  id: 'p-instructorled',
  title: 'Instructor Led Courses — Individuals',
  description: 'All live sessions are bundled with the templates covered. You leave with both the tools and the knowledge.',
  products: [
    { id: 'p-il-lt', type: 'Course', name: 'Life Tracker Live Session', description: 'A live guided setup of your full Life Tracker system — Sheets or Notion your choice.', price: 197, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Live', 'Guided', 'Bundled Tools', 'Life Tracker'] },
    { id: 'p-il-pt', type: 'Course', name: 'Personal Trackers Live Session', description: 'A live walkthrough and setup of your personal milestone tracker suite.', price: 197, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Live', 'Guided', 'Bundled Tools', 'Milestones'] },
    { id: 'p-il-pp', type: 'Course', name: 'Personal Projects Live Session', description: 'Get your personal project management system set up live with instructor support.', price: 197, href: '#', available: false, launchMonth: 'Coming Soon', tags: ['Live', 'Guided', 'Bundled Tools', 'Projects'] },
  ],
}
