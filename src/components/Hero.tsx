import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { img, logo, siteConfig } from '../config/siteConfig'
import CopyButton from './CopyButton'
import { TelegramIcon, XIcon } from './Icons'

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }),
}

const marquee = ['JUST HOPPING', 'UNBOTHERED', 'ONE MORE HOP', 'FORG MODE', 'LIFE IS BETTER WITH FORG']

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const parY = useTransform(scrollY, [0, 700], [0, 90])
  const parBlob = useTransform(scrollY, [0, 700], [0, -50])
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 120, damping: 15 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 120, damping: 15 })

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !stage.current) return
    const r = stage.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <section id="home" className="relative overflow-hidden bg-cream pb-0 pt-24 grain">
      {/* sweater-coloured organic shapes */}
      <motion.div style={{ y: parBlob }} aria-hidden className="blob absolute -right-32 top-10 h-[620px] w-[620px] bg-mustard sm:-right-20 lg:right-[2%] lg:top-8 lg:h-[780px] lg:w-[780px]" />
      <div aria-hidden className="blob-b drift absolute -left-24 bottom-24 h-64 w-64 bg-frog/30" style={{ ['--r' as string]: '0deg' }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:pb-20">
        <div className="relative z-10 order-2 lg:order-1">
          <h1 className="font-display font-extrabold leading-[0.88] text-forest" style={{ fontSize: 'clamp(2.6rem, 5.7vw, 5.8rem)' }}>
            <span className="block overflow-hidden pb-[0.06em] whitespace-nowrap"><motion.span className="block" variants={line} custom={0} initial="hidden" animate="show">NOT JUST</motion.span></span>
            <span className="block overflow-hidden pb-[0.06em] whitespace-nowrap"><motion.span className="block" variants={line} custom={1} initial="hidden" animate="show">ANOTHER FROG.</motion.span></span>
            <span className="block overflow-hidden pb-[0.1em]"><motion.span className="block text-frog [text-shadow:3px_3px_0_#173D28]" variants={line} custom={2} initial="hidden" animate="show">IT&rsquo;S FORG.</motion.span></span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-6 max-w-md text-lg font-medium text-forest/80 sm:text-xl"
          >
            One frog. One community. Unlimited internet energy. Sweater not optional.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-forest px-6 py-4 font-display font-bold text-cream shadow-[0_6px_0_#10291C] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none">
              <TelegramIcon /> JOIN THE COMMUNITY
            </a>
            <a href={siteConfig.xCommunityUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-forest bg-cream px-6 py-4 font-display font-bold text-forest transition hover:-translate-y-0.5 hover:bg-white">
              <XIcon /> FOLLOW ON X
            </a>
            <CopyButton size="lg" label="COPY CONTRACT ADDRESS" className="rounded-full bg-mustard text-deep shadow-[0_6px_0_#735237] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none" />
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <motion.div
            ref={stage}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={{ y: parY, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-[min(78vw,460px)] lg:w-full lg:max-w-[520px]"
          >
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <img
                src={img('forg-sunset-portrait')}
                alt="FORG, a green frog in a mustard knitted sweater with hands in brown trouser pockets, watching a purple and orange sunset"
                width={1000} height={1000} fetchPriority="high"
                className="blob-b aspect-square w-full border-4 border-forest object-cover shadow-[10px_12px_0_#173D28]"
              />
            </motion.div>
            <span className="drift absolute -left-2 top-6 -rotate-6 rounded-full bg-forest px-4 py-2 font-display text-sm font-bold text-mustard shadow-lg sm:-left-6" style={{ ['--r' as string]: '-6deg' }}>certified unbothered</span>
            <span className="drift absolute -right-1 bottom-24 rotate-6 rounded-full bg-cream px-4 py-2 font-display text-sm font-bold text-forest shadow-lg ring-2 ring-forest sm:-right-6" style={{ ['--r' as string]: '6deg', animationDelay: '-2s' }}>{siteConfig.ticker}</span>
            <img src={logo} alt="" width={84} height={84} className="drift absolute -bottom-4 left-4 h-16 w-16 rounded-full ring-4 ring-cream sm:h-20 sm:w-20" style={{ animationDelay: '-4s' }} />
          </motion.div>
        </div>
      </div>

      {/* sweater-yellow ticker */}
      <div className="relative -rotate-1 overflow-hidden border-y-4 border-forest bg-mustard py-3" aria-hidden="true">
        <div className="marquee-track flex items-center gap-8 font-display text-2xl font-extrabold text-forest">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              {t}
              <img src={logo} alt="" width={32} height={32} className="h-8 w-8 rounded-full" loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
