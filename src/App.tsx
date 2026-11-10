import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import VideoSection from './components/VideoSection'
import Community from './components/Community'
import TokenInfo from './components/TokenInfo'
import CTA from './components/CTA'
import Footer from './components/Footer'
import InteractiveForg from './components/InteractiveForg'
import EasterEgg from './components/EasterEgg'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [egg, setEgg] = useState(0)
  const clicks = useRef<number[]>([])

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(t)
  }, [])

  // 5 logo clicks within 2 seconds triggers the easter egg.
  const onLogoClick = useCallback(() => {
    const now = Date.now()
    clicks.current = [...clicks.current.filter((t) => now - t < 2000), now]
    if (clicks.current.length >= 5) { clicks.current = []; setEgg((n) => n + 1) }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>
      <CustomCursor />
      <Navbar onLogoClick={onLogoClick} />
      <main>
        <Hero />
        <About />
        <Gallery />
        <VideoSection />
        <TokenInfo />
        <Community />
        <CTA />
      </main>
      <Footer />
      <InteractiveForg />
      <EasterEgg trigger={egg} />
    </MotionConfig>
  )
}
