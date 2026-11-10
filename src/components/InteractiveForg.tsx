import { useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { logo } from '../config/siteConfig'

const messages = [
  'FORG MODE ACTIVATED.',
  'JUST HOPPING.',
  'UNBOTHERED.',
  'ONE MORE HOP.',
  'FORG SEES ALL.',
  'LIFE IS BETTER WITH FORG.',
]

/** Floating FORG. Click to hop and get a random line. */
export default function InteractiveForg() {
  const controls = useAnimationControls()
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null)
  const [sparks, setSparks] = useState<number[]>([])
  const last = useRef(-1)
  const timer = useRef<number>()

  const hop = () => {
    let i = Math.floor(Math.random() * messages.length)
    if (i === last.current) i = (i + 1) % messages.length
    last.current = i
    const id = Date.now()
    setMsg({ id, text: messages[i] })
    setSparks([id])
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => { setMsg(null); setSparks([]) }, 2200)
    controls.start({
      y: [0, -70, 0, -12, 0],
      scaleY: [1, 1.12, 0.82, 1.04, 1],
      scaleX: [1, 0.92, 1.12, 0.98, 1],
      rotate: [0, -8, 6, 0, 0],
      transition: { duration: 0.75, ease: 'easeOut' },
    })
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg.id}
            role="status"
            initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }}
            className="absolute bottom-[110%] left-0 w-max max-w-[70vw] rounded-2xl rounded-bl-sm bg-mustard px-4 py-2 font-display text-sm font-extrabold text-deep shadow-lg ring-2 ring-deep"
          >
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>
      {sparks.map((id) => (
        <span key={id} aria-hidden className="pointer-events-none absolute inset-0">
          {[...Array(6)].map((_, k) => (
            <motion.span
              key={k}
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-frog"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: Math.cos((k / 6) * Math.PI * 2) * 54, y: Math.sin((k / 6) * Math.PI * 2) * 54 - 20, opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
          ))}
        </span>
      ))}
      <motion.button
        type="button" onClick={hop} animate={controls}
        whileHover={{ scale: 1.08 }}
        aria-label="Poke FORG. He hops and says something."
        className="block h-16 w-16 overflow-hidden rounded-full border-4 border-mustard bg-cream shadow-xl sm:h-20 sm:w-20"
      >
        <img src={logo} alt="" width={80} height={80} className="h-full w-full object-cover" draggable={false} />
      </motion.button>
    </div>
  )
}
