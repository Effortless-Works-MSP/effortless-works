import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import ComingSoonPage from '@/components/ui/ComingSoonPage'
import ParallaxStars from '@/components/ui/ParallaxStars'

export const metadata: Metadata = { title: 'Creative Studio | Effortless Works' }

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={80} />
        <PageWrapper>
          <ComingSoonPage
            eyebrow="Personal Systems — Being Built"
            name="Creative Studio"
            description="A dedicated workspace for your creative practice — ideas, projects, drafts, and the habit of showing up. Creativity is a practice, not a talent."
            includes={[
              'Idea Vault — raw ideas captured by category with a status, the spark that started it, and space to develop it further',
              'Project Tracker — every active creative project with its next action, deadline, progress percentage, and current status',
              'Daily Practice Log — your creative habit tracker with streaks, session notes, and a record of how consistently you show up',
              'Inspiration Library — artists, references, quotes, colour palettes, and anything that moves you, organised and searchable',
              'Works in Progress — drafts at every stage of development with revision notes, feedback received, and what still needs doing',
            ]}
          />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
