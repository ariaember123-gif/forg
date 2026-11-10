import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { img, logo, siteConfig } from '../config/siteConfig'
import { TelegramIcon, XIcon } from './Icons'
import Reveal from './Reveal'

export default function Community() {
  return (
    <section id="community" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-5xl font-display text-5xl font-extrabold leading-[0.92] text-forest sm:text-7xl lg:text-8xl">THE INTERNET HAS A NEW FAVORITE FROG.</h2>
          <p className="mt-6 max-w-xl text-xl text-forest/80">Good vibes, questionable decisions, and a community that knows how to hop.</p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <Reveal x={-30} y={0}>
            <motion.a
              href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -8, rotate: -0.8 }}
              className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[2.5rem] border-4 border-forest bg-frog p-8 shadow-[10px_12px_0_#173D28]"
            >
              <img src={img('forg-bliss-hill-chair-thumb')} alt="" aria-hidden width={400} height={400} loading="lazy" className="blob drift pointer-events-none absolute -right-10 -top-10 h-52 w-52 object-cover opacity-90" />
              <div className="relative">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-forest text-frog"><TelegramIcon className="h-9 w-9" /></span>
                <h3 className="mt-6 font-display text-4xl font-extrabold text-deep">FORG Telegram</h3>
                <p className="mt-3 max-w-sm text-lg font-medium text-deep/85">The main hangout. Say hi, share memes, and catch the latest from the pond.</p>
              </div>
              <span className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-deep px-6 py-4 font-display font-bold text-cream transition group-hover:bg-black">
                JOIN TELEGRAM <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </motion.a>
          </Reveal>

          <Reveal x={30} y={0} delay={0.1}>
            <motion.a
              href={siteConfig.xCommunityUrl} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -8, rotate: 0.8 }}
              className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[2.5rem] border-4 border-forest bg-mustard p-8 shadow-[10px_12px_0_#173D28]"
            >
              <img src={logo} alt="" aria-hidden width={200} height={200} loading="lazy" className="drift pointer-events-none absolute -right-6 top-6 h-44 w-44 rounded-full border-4 border-forest object-cover" style={{ ['--r' as string]: '8deg' }} />
              <div className="relative">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-charcoal text-cream"><XIcon className="h-8 w-8" /></span>
                <h3 className="mt-6 font-display text-4xl font-extrabold text-deep">FORG on X</h3>
                <p className="mt-3 max-w-sm text-lg font-medium text-deep/85">Join the X Community for posts, art, and every new FORG moment as it lands.</p>
              </div>
              <span className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-charcoal px-6 py-4 font-display font-bold text-cream transition group-hover:bg-black">
                JOIN THE COMMUNITY <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </motion.a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
