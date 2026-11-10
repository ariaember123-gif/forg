import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, AlertTriangle } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { useCopy } from '../hooks/useScrollAnimation'

interface Props {
  className?: string
  label?: string
  /** compact hides the icon text spacing for tight spots */
  size?: 'sm' | 'lg'
}

/** Copies the exact official contract address, always from siteConfig. */
export default function CopyButton({ className = '', label = 'COPY CA', size = 'sm' }: Props) {
  const { state, copy } = useCopy(siteConfig.contractAddress)
  const text = state === 'copied' ? 'COPIED!' : state === 'error' ? 'PRESS CTRL+C' : label
  const Icon = state === 'copied' ? Check : state === 'error' ? AlertTriangle : Copy
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={state === 'copied' ? 'Contract address copied' : 'Copy contract address'}
      className={`relative inline-flex items-center justify-center gap-2 font-display font-bold transition-transform active:scale-95 ${size === 'lg' ? 'px-6 py-4 text-base' : 'px-4 py-2 text-sm'} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          initial={{ y: 10, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-2"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" role="status" aria-live="polite">{state === 'copied' ? 'Copied to clipboard' : ''}</span>
    </button>
  )
}
