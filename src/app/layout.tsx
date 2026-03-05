import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Effortless Works',
  description:
    'Templates, spreadsheets, and courses for the person who is building something — in business, in life, and in faith.',
  openGraph: {
    title: 'Effortless Works',
    description: 'A home for every version of you.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}