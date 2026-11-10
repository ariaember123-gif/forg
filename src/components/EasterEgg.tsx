import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { logo } from '../config/siteConfig'

const CODE = 'forg'
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

/**
 * Hidden surprise: type "forg" anywhere, enter the Konami code,
 * or click the nav logo 5 times. Rains FORGs for a few seconds.
 */
export default function EasterEgg({ trigger }: { trigger: number }) {
  const [on, setOn] = useState(false)
  const drops = useMemo(() => [...Array(22)].map((_, i) => ({ left: (i * 4.7 + Math.random() * 3) % 96, delay: Math.random() * 1.2, size: 36 + Math.random() * 40, dur: 2.4 + Math.random() * 1.6 })), [on]) // eslint-disable-line react-hooks/exhaustive-deps

  const fire = () => { setOn(true); window.setTimeout(() => setOn(false), 5200) }

  useEffect(() => { if (trigger > 0) fire() }, [trigger])

  useEffect(() => {
    let typed = ''
    let k: string[] = []
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t && /input|textarea/i.test(t.tagName)) return
      typed = (typed + e.key.toLowerCase()).slice(-CODE.length)
      k = [...k, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length)
      if (typed === CODE || k.join() === KONAMI.join()) { fire(); typed = ''; k = [] }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {on && (
        <motion.div aria-hidden={false} className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <p role="status" className="absolute inset-x-0 top-1/3 text-center font-display text-5xl font-extrabold text-mustard [text-shadow:0_4px_0_#10291C] sm:text-8xl">
            FORG WAS HERE.
          </p>
          {drops.map((d, i) => (
            <motion.img
              key={i} src={logo} alt="" width={80} height={80}
              className="absolute rounded-full border-2 border-mustard"
              style={{ left: `${d.left}%`, width: d.size, height: d.size, top: -90 }}
              initial={{ y: 0, rotate: 0 }}
              animate={{ y: '115vh', rotate: 360 }}
              transition={{ duration: d.dur, delay: d.delay, ease: 'easeIn' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
