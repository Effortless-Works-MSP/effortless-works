import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import ComingSoonPage from '@/components/ui/ComingSoonPage'
import ParallaxStars from '@/components/ui/ParallaxStars'

export const metadata: Metadata = { title: 'Career Compass | Effortless Works' }

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={80} />
        <PageWrapper>
          <ComingSoonPage
            eyebrow="Business Systems — Being Built"
            name="Career Compass"
            description="Your career deserves as much structure as your business does. Map where you are going, track every skill you are building, and document every win — so you always know how far you have come and exactly what to do next."
            includes={[
              'Career Goal Roadmap — 1-year, 3-year, and 5-year goals broken down into quarterly milestones with status tracking',
              'Skills Inventory — your current skills rated honestly, the skills you are building, and the courses or resources attached to each',
              'Achievement Log — every project completed, promotion earned, and impact made, dated and ready for your next review or CV',
              'Wins & Feedback Journal — compliments received, lessons learned, moments of growth, and the hard feedback worth keeping',
              'Quarterly Review Template — a structured self-assessment comparing goals vs actuals and setting clear priorities for the next quarter',
            ]}
          />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
