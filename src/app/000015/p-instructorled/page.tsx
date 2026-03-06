import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProductSectionBlock from '@/components/ui/ProductSectionBlock'
import { P_INSTRUCTOR_META, P_INSTRUCTOR_SECTION } from '@/lib/pageData'
import ParallaxStars from '@/components/ui/ParallaxStars'

export const metadata: Metadata = {
  title: 'Instructor Led · Individuals | Effortless Works',
}


export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={100} />
        <PageWrapper>
           <PageHero {...P_INSTRUCTOR_META} />
          <ProductSectionBlock section={P_INSTRUCTOR_SECTION} index={0} />
          <div style={{ height: 80 }} />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}