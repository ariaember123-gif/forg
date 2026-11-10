import { motion } from 'framer-motion'
import { img, logo } from '../config/siteConfig'
import Reveal from './Reveal'

const tags = ['PROFESSIONAL HOPER', 'CERTIFIED UNBOTHERED', 'FULL-TIME FORG', 'INTERNET NATIVE']
const tagStyle = [
  'bg-mustard text-deep -rotate-2',
  'bg-frog text-deep rotate-1',
  'bg-cream text-deep -rotate-1',
  'bg-earth text-cream rotate-2',
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-forest py-24 text-cream sm:py-32">
      <div aria-hidden className="blob absolute -left-40 top-20 h-[520px] w-[520px] bg-deep" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        {/* layered imagery */}
        <Reveal x={-40} y={0} className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[540px]">
          <motion.img
            src={img('forg-pine-forest')}
            alt="FORG in a mustard turtleneck looking up through tall pine trees at a blue sky"
            width={1000} height={1000} loading="lazy"
            whileHover={{ rotate: -1, scale: 1.02 }}
            className="blob absolute left-0 top-0 h-[78%] w-[78%] border-4 border-cream object-cover shadow-[8px_10px_0_#10291C]"
          />
          <div className="absolute bottom-0 right-0 grid h-[52%] w-[52%] place-items-center rounded-[40%_60%_55%_45%] border-4 border-forest bg-cream p-2 shadow-[8px_10px_0_#10291C]">
            <img src={logo} alt="Illustration of FORG standing with hands in pockets" width={400} height={400} loading="lazy" className="h-full w-full rounded-[40%_60%_55%_45%] object-cover" />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="font-display text-6xl font-extrabold leading-[0.9] sm:text-8xl">MEET <span className="text-mustard">FORG.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-cream/90">
              <p>Some frogs chase flies. Some chase dreams. FORG just does FORG things.</p>
              <p>Living life one hop at a time, staying unbothered, and bringing the community along for the ride.</p>
              <p className="font-display text-2xl font-bold text-mustard">No complicated personality. No unnecessary drama. Just FORG.</p>
            </div>
          </Reveal>
          <ul className="mt-10 flex flex-wrap gap-3">
            {tags.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 260, damping: 18 }}
                whileHover={{ rotate: 0, scale: 1.06 }}
                className={`rounded-full px-5 py-2.5 font-display text-sm font-bold ${tagStyle[i]}`}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
