import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProductSectionBlock from '@/components/ui/ProductSectionBlock'
import { INDIVIDUALS_META, INDIVIDUALS_SECTIONS } from '@/lib/pageData'
import ParallaxStars from '@/components/ui/ParallaxStars'

export const metadata: Metadata = {
  title: 'Personal Templates | Effortless Works',
  description: 'Life trackers, personal project templates, and milestone trackers for every area of your life.',
}

export default function IndividualsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={100} />
        <PageWrapper>
          <PageHero {...INDIVIDUALS_META} />
          {INDIVIDUALS_SECTIONS.map((section, i) => (
            <ProductSectionBlock key={section.id} section={section} index={i} />
          ))}
          <div style={{ height: 80 }} />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
