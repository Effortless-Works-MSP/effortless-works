import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProductSectionBlock from '@/components/ui/ProductSectionBlock'
import CourseBanner from '@/components/ui/CourseBanner'
import ParallaxStars from '@/components/ui/ParallaxStars'
import { BACK_OFFICE_PARENT_META, BACK_OFFICE_PARENT_SECTION } from '@/lib/pageData'

export const metadata: Metadata = {
  title: 'Back Office | Effortless Works',
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E', position: 'relative', overflow: 'hidden' }}>
        <ParallaxStars count={100} />
        <PageWrapper>
          <PageHero {...BACK_OFFICE_PARENT_META} />
          <CourseBanner productName="Back Office" />
          <ProductSectionBlock section={BACK_OFFICE_PARENT_SECTION} index={0} />
          <div style={{ height: 80 }} />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
