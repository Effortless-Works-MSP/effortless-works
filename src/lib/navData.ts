export interface NavSubItem {
  label: string
  href: string
  description?: string
}

export interface NavSection {
  title: string
  items: NavSubItem[]
}

export interface NavDropdown {
  sections: NavSection[]
  imageSrc?: string
  imageAlt?: string
}

export interface NavItem {
  label: string
  href?: string
  dropdown?: NavDropdown
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Business',
    href: '/business',
    dropdown: {
      imageSrc: '/nav-titles/biz-nav.svg',
      imageAlt: 'Effortless Business Management',
      sections: [
        {
          title: 'Services',
          items: [
            { label: 'Website Builder', href: '/000008/website', description: 'Launch your site fast' },
            { label: 'App Builder', href: '/000008/app', description: 'Custom app solutions' },
            { label: 'Onboarding Builder', href: '/000008/onboarding', description: 'Streamline client onboarding' },
          ],
        },
        {
          title: 'Back Office',
          items: [
            { label: 'Google Sheets', href: '/000009/bo-sheets', description: 'Spreadsheet templates' },
            { label: 'Notion', href: '/000009/bo-notion', description: 'Notion workspace templates' },
          ],
        },
        {
          title: 'Project Management',
          items: [
            { label: 'Google Sheets', href: '/000010/pm-sheets', description: 'Track projects in Sheets' },
            { label: 'Notion', href: '/000010/pm-notion', description: 'Manage projects in Notion' },
          ],
        },
        {
          title: 'How Tos',
          items: [
            { label: 'Product Videos', href: '/000011/b-productvideos', description: 'Watch & learn' },
            { label: 'Self Paced Courses', href: '/000011/b-selfpaced', description: 'Learn on your schedule' },
            { label: 'Instructor Led', href: '/000011/b-instructorled', description: 'Live guided learning' },
          ],
        },
      ],
    },
  },
  {
    label: 'Individuals',
    href: '/individuals',
    dropdown: {
      imageSrc: '/nav-titles/indv-nav.svg',
      imageAlt: 'Effortless Personal Life',
      sections: [
        {
          title: 'Life Tracker',
          items: [
            { label: 'Google Sheets', href: '/000012/lt-sheets', description: 'Track your whole life' },
            { label: 'Notion', href: '/000012/lt-notion', description: 'Your life in Notion' },
          ],
        },
        {
          title: 'Personal Trackers',
          items: [
            { label: 'Google Sheets', href: '/000013/pt-sheets', description: 'Habit & goal tracking' },
            { label: 'Notion', href: '/000013/pt-notion', description: 'Notion personal tracker' },
          ],
        },
        {
          title: 'Personal Projects',
          items: [
            { label: 'Google Sheets', href: '/000014/pp-sheets', description: 'Manage your projects' },
            { label: 'Notion', href: '/000014/pp-notion', description: 'Projects in Notion' },
          ],
        },
        {
          title: 'How Tos',
          items: [
            { label: 'Product Videos', href: '/000015/p-productvideos', description: 'Watch & learn' },
            { label: 'Self Paced Courses', href: '/000015/p-selfpaced', description: 'Learn on your schedule' },
            { label: 'Instructor Led', href: '/000015/p-instructorled', description: 'Live guided learning' },
          ],
        },
      ],
    },
  },
  {
    label: 'Build Your Own',
    href: '/build-your-own',
  },
  {
    label: 'Quest',
    dropdown: {
      imageSrc: '/nav-titles/quest-nav.svg',
      imageAlt: 'Effortless Quest',
      sections: [
        {
          title: 'Effortless Quest',
          items: [
            { label: 'About', href: '/000005/about', description: 'What is Effortless Quest?' },
            { label: 'How To Play', href: '/000005/howtoplay', description: 'Get started guide' },
            { label: 'Road Map', href: '/000005/roadmap', description: 'What\'s coming next' },
          ],
        },
      ],
    },
  },
  {
    label: 'Courses',
    href: '/courses',
  },
  {
    label: 'Info',
    href: '/info',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]
