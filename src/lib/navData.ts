export interface NavSubItem {
  label: string
  href: string
  description?: string
  tags?: string[]
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
          title: 'Back Office',
          items: [
            { label: 'Google Sheets', href: '/000009/bo-sheets', description: 'Full back office tracking suite', tags: ['Sales', 'KPIs', 'Clients', 'Commissions', 'Payroll', 'Recruitment'] },
            { label: 'Notion', href: '/000009/bo-notion', description: 'Notion workspace templates', tags: ['Sales', 'KPIs', 'Clients', 'Commissions', 'Payroll', 'Recruitment'] },
          ],
        },
        {
          title: 'Project Management',
          items: [
            { label: 'Google Sheets', href: '/000010/pm-sheets', description: 'Track projects in Sheets', tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Brand Set'] },
            { label: 'Notion', href: '/000010/pm-notion', description: 'Manage projects in Notion', tags: ['Project Folder', 'Version Control', 'Brand Set'] },
          ],
        },
        {
          title: 'How Tos',
          items: [
            { label: 'Product Videos', href: '/000011/b-productvideos', description: 'Watch & learn', tags: ['Video', 'Walkthrough', 'Tools'] },
            { label: 'Self Paced Courses', href: '/000011/b-selfpaced', description: 'Learn on your schedule', tags: ['Self Paced', 'Bundled Tools', 'Flexible'] },
            { label: 'Instructor Led', href: '/000011/b-instructorled', description: 'Live guided learning', tags: ['Live', 'Guided', 'Bundled Tools'] },
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
            { label: 'Google Sheets', href: '/000012/lt-sheets', description: 'Track your whole life', tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'] },
            { label: 'Notion', href: '/000012/lt-notion', description: 'Your life in Notion', tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'] },
          ],
        },
        {
          title: 'Personal Trackers',
          items: [
            { label: 'Google Sheets', href: '/000013/pt-sheets', description: 'Habit & goal tracking', tags: ['Faith', 'Family', 'Self Care', 'Nutrition', 'Exercise', 'Skills', 'Business', 'Education'] },
            { label: 'Notion', href: '/000013/pt-notion', description: 'Notion personal tracker', tags: ['Faith', 'Family', 'Self Care', 'Nutrition', 'Exercise', 'Skills', 'Business', 'Education'] },
          ],
        },
        {
          title: 'Personal Projects',
          items: [
            { label: 'Google Sheets', href: '/000014/pp-sheets', description: 'Manage your projects', tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'] },
            { label: 'Notion', href: '/000014/pp-notion', description: 'Projects in Notion', tags: ['Goals Dashboard', 'Project Dashboard', 'Project Folder', 'Version Control', 'Branch Set'] },
          ],
        },
        {
          title: 'How Tos',
          items: [
            { label: 'Product Videos', href: '/000015/p-productvideos', description: 'Watch & learn', tags: ['Video', 'Walkthrough', 'Tools'] },
            { label: 'Self Paced Courses', href: '/000015/p-selfpaced', description: 'Learn on your schedule', tags: ['Self Paced', 'Bundled Tools', 'Flexible'] },
            { label: 'Instructor Led', href: '/000015/p-instructorled', description: 'Live guided learning', tags: ['Live', 'Guided', 'Bundled Tools'] },
          ],
        },
      ],
    },
  },
  {
    label: 'Build Your Own',
    href: '/build-your-own',
    dropdown: {
      sections: [
        {
          title: 'Build Your Own',
          items: [
            { label: 'Website Builder', href: '/build-your-own', description: 'Custom website build', tags: ['Design', 'Development', 'Launch'] },
            { label: 'App Builder', href: '/build-your-own', description: 'Custom app build', tags: ['Mobile', 'Web App', 'Custom'] },
            { label: 'Custom Google Sheets', href: '/build-your-own', description: 'Custom tracking system solutions', tags: ['Tracking', 'Automation', 'Templates'] },
            { label: 'Custom Notion Templates', href: '/build-your-own', description: 'Custom Notion workspaces', tags: ['Workspace', 'Templates', 'Systems'] },
          ],
        },
      ],
    },
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
            { label: 'About', href: '/000005/about', description: 'What is Effortless Quest?', tags: ['Community', 'Gamified', 'Personal Dev'] },
            { label: 'How To Play', href: '/000005/howtoplay', description: 'Get started guide', tags: ['Guide', 'Rewards', 'Leaderboard'] },
            { label: 'Road Map', href: '/000005/roadmap', description: 'What\'s coming next', tags: ['Business Center', 'Charity', 'Education'] },
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
