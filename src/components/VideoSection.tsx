import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, Pause, Play, X } from 'lucide-react'
import { videos, type VideoItem } from '../data/videos'
import Reveal from './Reveal'

function VideoCard({ v, playing, onToggle, onExpand, index }: { v: VideoItem; playing: boolean; onToggle: () => void; onExpand: () => void; index: number }) {
  const ref = useRef<HTMLVideoElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Pause when scrolled out of view.
  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (playing && visible) el.play().catch(() => {})
    else el.pause()
  }, [playing, visible])

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
      className={index === 0 ? 'lg:col-span-2' : ''}
    >
      <div ref={box} className="group relative overflow-hidden rounded-[2rem] border-4 border-mustard bg-deep shadow-[8px_10px_0_#10291C]" style={{ aspectRatio: v.ratio }}>
        <video
          ref={ref} src={v.src} poster={v.poster} preload="none" muted loop playsInline
          aria-label={v.title}
          className="h-full w-full object-cover"
        />
        <button
          type="button" onClick={onToggle}
          aria-label={playing ? `Pause ${v.title}` : `Play ${v.title}`}
          className="absolute inset-0 grid place-items-center bg-deep/0 transition-colors hover:bg-deep/25 focus-visible:bg-deep/25"
        >
          <span className={`grid h-20 w-20 place-items-center rounded-full bg-mustard text-deep shadow-xl transition-all duration-300 group-hover:scale-110 ${playing ? 'scale-75 opacity-0 group-hover:opacity-100' : ''}`}>
            {playing ? <Pause className="h-8 w-8" /> : <Play className="ml-1 h-8 w-8" />}
          </span>
        </button>
        <button type="button" onClick={onExpand} aria-label={`Open ${v.title} full screen`} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-deep transition hover:bg-mustard">
          <Maximize2 className="h-5 w-5" />
        </button>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold text-cream">{v.title}</h3>
      <p className="max-w-md text-cream/75">{v.blurb}</p>
    </motion.article>
  )
}

export default function VideoSection() {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [modal, setModal] = useState<VideoItem | null>(null)

  useEffect(() => {
    if (!modal) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setModal(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [modal])

  return (
    <section id="videos" className="relative overflow-hidden bg-forest py-24 sm:py-32">
      <div aria-hidden className="blob absolute -left-32 bottom-10 h-[420px] w-[420px] bg-deep" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-5xl font-extrabold leading-[0.92] text-cream sm:text-7xl lg:text-8xl">FORG IN <span className="text-mustard">MOTION.</span></h2>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-2">
          {videos.map((v, i) => (
            <VideoCard
              key={v.id} v={v} index={i}
              playing={playingId === v.id}
              onToggle={() => setPlayingId((p) => (p === v.id ? null : v.id))}
              onExpand={() => { setPlayingId(null); setModal(v) }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={modal.title}
            className="fixed inset-0 z-[80] grid place-items-center bg-deep/95 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <button type="button" aria-label="Close video" onClick={() => setModal(null)} className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-mustard text-deep"><X /></button>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl">
              <video src={modal.src} poster={modal.poster} controls autoPlay playsInline className="max-h-[80vh] w-full rounded-3xl border-4 border-mustard bg-black" />
              <p className="mt-3 text-center font-display text-xl font-bold text-mustard">{modal.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
