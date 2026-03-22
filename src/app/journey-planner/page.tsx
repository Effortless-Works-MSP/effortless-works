import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import ComingSoonPage from '@/components/ui/ComingSoonPage'
import ParallaxStars from '@/components/ui/ParallaxStars'

export const metadata: Metadata = { title: 'Journey Planner | Effortless Works' }

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={80} />
        <PageWrapper>
          <ComingSoonPage
            eyebrow="Personal Systems — Being Built"
            name="Journey Planner"
            description="Plan every trip with intention, capture every memory in real time, and build a living record of the experiences that shape your life."
            includes={[
              'Trip Planner — destination, dates, flights, accommodation, and a day-by-day itinerary builder for every trip',
              'Bucket List — destinations ranked by priority with notes, estimated budget, and best time of year to visit',
              'Travel Log — a record of every place you have been, with highlights, honest notes, and what you would do differently',
              'Experience Journal — a daily diary template for each trip to capture exactly how it felt while you are still there',
              'Trip Budget Tracker — planned vs actual spend broken down by flights, accommodation, food, activities, and extras',
            ]}
          />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
