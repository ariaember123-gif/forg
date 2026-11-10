import { motion } from 'framer-motion'
import { logo } from '../config/siteConfig'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-deep"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      role="status"
      aria-label="Loading FORG"
    >
      <div className="flex flex-col items-center gap-5">
        <motion.img
          src={logo}
          alt=""
          width={120}
          height={120}
          className="h-28 w-28 rounded-full"
          animate={{ y: [0, -26, 0], scaleY: [1, 1.05, 0.92, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <p className="font-display text-sm font-bold tracking-wide text-mustard">hopping in...</p>
      </div>
    </motion.div>
  )
}
