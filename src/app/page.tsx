import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import HowItWorks from '@/components/sections/HowItWorks'
import About from '@/components/sections/About'
import HomeGuide from '@/components/sections/HomeGuide'
import Areas from '@/components/sections/Areas'
import Quote from '@/components/sections/Quote'
import CTA from '@/components/sections/CTA'
import ParallaxStars from '@/components/ui/ParallaxStars'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — no stars */}
        <Hero />

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ParallaxStars count={80} />
          <Marquee />
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ParallaxStars count={80} />
          <HowItWorks />
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ParallaxStars count={110} />
          <About />
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ParallaxStars count={110} />
          <HomeGuide />
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ParallaxStars count={110} />
          <Areas />
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ParallaxStars count={90} />
          <Quote />
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ParallaxStars count={90} />
          <CTA />
        </div>
      </main>
      <Footer />
    </>
  )
}
