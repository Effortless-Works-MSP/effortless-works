import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#0C0D0E',
        surface:  '#131416',
        surface2: '#1A1C1E',
        sage:     '#7BBFA0',
        'sage-dim': 'rgba(123,191,160,0.15)',
        text:     '#E8E4DC',
        'text-dim':   'rgba(232,228,220,0.5)',
        'text-faint': 'rgba(232,228,220,0.25)',
        border:   'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
