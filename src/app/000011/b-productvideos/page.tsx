import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/ui/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProductSectionBlock from '@/components/ui/ProductSectionBlock'
import { B_VIDEOS_META, B_VIDEOS_SECTION } from '@/lib/pageData'

export const metadata: Metadata = {
  title: 'Product Videos · Business | Effortless Works',
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#0C0D0E' }}>
        <PageWrapper>
          <PageHero {...B_VIDEOS_META} />
          <ProductSectionBlock section={B_VIDEOS_SECTION} index={0} />
          <div style={{ height: 80 }} />
        </PageWrapper>
      </main>
      <Footer />
    </>
  )
}
