import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { galleryItems } from '../data/gallery'
import Reveal from './Reveal'

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const n = galleryItems.length
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n])

  useEffect(() => {
    if (open === null) return
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = '' }
  }, [open, step])

  return (
    <section id="gallery" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div aria-hidden className="blob-b absolute -right-32 top-40 h-96 w-96 bg-frog/25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.92] text-forest sm:text-7xl lg:text-8xl">THE MANY MOODS OF FORG.</h2>
        </Reveal>

        <div className="mt-14 grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[230px] md:grid-cols-6 md:gap-5">
          {galleryItems.map((it, i) => (
            <motion.button
              key={it.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open image: ${it.caption}`}
              initial={{ opacity: 0, y: 40, clipPath: 'inset(12% 8% 12% 8% round 32px)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-[2rem] border-4 border-forest bg-forest text-left shadow-[6px_8px_0_#173D28] transition-transform hover:-translate-y-1 hover:-rotate-[0.6deg] ${it.span} ${i === 0 ? 'sm:col-span-2' : ''}`}
            >
              <img
                src={i === 0 ? it.src : it.thumb}
                srcSet={i === 0 ? undefined : `${it.thumb} 400w, ${it.src} 1000w`}
                sizes="(min-width:768px) 33vw, 100vw"
                alt={it.alt}
                width={i === 0 ? 1000 : 400} height={i === 0 ? 1000 : 400}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-deep/95 to-deep/0 px-5 pb-4 pt-12 font-display text-xl font-bold text-mustard transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 max-md:translate-y-0">
                {it.caption}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Image viewer"
            className="fixed inset-0 z-[80] grid place-items-center bg-deep/95 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-mustard text-deep"><X /></button>
            <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); step(-1) }} className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream text-deep sm:left-6"><ChevronLeft /></button>
            <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); step(1) }} className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream text-deep sm:right-6"><ChevronRight /></button>
            <AnimatePresence mode="wait">
              <motion.figure
                key={open}
                initial={{ opacity: 0, scale: 0.92, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
                onDragEnd={(_, info) => { if (info.offset.x < -70) step(1); else if (info.offset.x > 70) step(-1) }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[88vh] w-full max-w-[min(88vh,92vw)]"
              >
                <img src={galleryItems[open].src} alt={galleryItems[open].alt} className="max-h-[80vh] w-full rounded-3xl border-4 border-mustard object-contain" draggable={false} />
                <figcaption className="mt-3 text-center font-display text-xl font-bold text-mustard">{galleryItems[open].caption}</figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
