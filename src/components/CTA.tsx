import { motion } from 'framer-motion'
import { img, siteConfig } from '../config/siteConfig'
import CopyButton from './CopyButton'
import { TelegramIcon, XIcon } from './Icons'
import Reveal from './Reveal'

export default function CTA() {
  return (
    <section id="join" className="relative overflow-hidden bg-mustard py-24 sm:py-32">
      <div aria-hidden className="blob absolute -left-40 -top-40 h-[520px] w-[520px] bg-[#f2c95a]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, rotate: 8, scale: 0.85 }} whileInView={{ opacity: 1, rotate: -3, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-[min(80vw,440px)]"
        >
          <img
            src={img('forg-sky-kick')} alt="FORG in a mustard sweater mid-hop through a sunlit sky, green shoes pointed at the clouds"
            width={1000} height={1000} loading="lazy"
            className="aspect-square w-full rounded-[2.5rem] border-4 border-forest object-cover shadow-[12px_14px_0_#173D28]"
          />
          <span className="absolute -right-3 -top-4 rotate-6 rounded-full bg-forest px-4 py-2 font-display text-sm font-bold text-mustard shadow-lg">one more hop</span>
        </motion.div>

        <div>
          <Reveal>
            <h2 className="font-display text-6xl font-extrabold leading-[0.88] text-forest sm:text-8xl">READY TO HOP IN?</h2>
            <p className="mt-5 max-w-md text-xl font-medium text-forest/85">Your seat in the FORG universe is waiting.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-4 font-display font-bold text-cream shadow-[0_6px_0_#10291C] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"><TelegramIcon /> JOIN TELEGRAM</a>
              <a href={siteConfig.xCommunityUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-4 font-display font-bold text-cream shadow-[0_6px_0_#000] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"><XIcon /> FOLLOW FORG ON X</a>
              <CopyButton size="lg" className="rounded-full border-2 border-forest bg-cream text-forest transition hover:-translate-y-0.5 hover:bg-white" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
