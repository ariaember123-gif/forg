import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { logo, navLinks, siteConfig } from '../config/siteConfig'
import { useActiveSection } from '../hooks/useScrollAnimation'
import CopyButton from './CopyButton'
import { TelegramIcon, XIcon } from './Icons'

const ids = navLinks.map((l) => l.id)

export default function Navbar({ onLogoClick }: { onLogoClick: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // wait a tick so body scroll lock is released before scrolling
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 30)
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-deep/95 shadow-lg shadow-black/20 backdrop-blur' : 'bg-transparent'}`}>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={onLogoClick} aria-label="FORG logo" className="rounded-full">
            <img src={logo} alt="" width={40} height={40} className="h-10 w-10 rounded-full ring-2 ring-mustard" />
          </button>
          <a href="#home" onClick={go('home')} className={`font-display text-2xl font-extrabold ${scrolled || open ? 'text-cream' : 'text-forest'}`}>FORG</a>
        </div>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-bold transition-colors ${scrolled ? 'text-cream/80 hover:text-mustard' : 'text-forest/80 hover:text-forest'}`}
              >
                {active === l.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-mustard" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className={active === l.id ? 'text-deep' : ''}>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <CopyButton className="rounded-full bg-mustard text-deep hover:bg-[#f2c95a]" />
          <a href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" aria-label="Join FORG on Telegram" className="inline-flex items-center gap-2 rounded-full bg-frog px-4 py-2 font-display text-sm font-bold text-deep hover:bg-[#8bd035]">
            <TelegramIcon className="h-4 w-4" /> Telegram
          </a>
          <a href={siteConfig.xCommunityUrl} target="_blank" rel="noopener noreferrer" aria-label="Open FORG X Community" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 font-display text-sm font-bold text-cream hover:bg-black">
            <XIcon className="h-4 w-4" /> Community
          </a>
        </div>

        <button
          type="button"
          className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${open || scrolled ? 'bg-mustard text-deep' : 'bg-forest text-cream'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 36px) 32px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 36px) 32px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 36px) 32px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-0 -z-10 flex flex-col justify-center gap-2 bg-deep px-6 pb-8 pt-20 lg:hidden"
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.12 + i * 0.05 } }}
                className={`font-display text-4xl font-extrabold ${active === l.id ? 'text-mustard' : 'text-cream'}`}
              >
                {l.label}
              </motion.a>
            ))}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <CopyButton size="lg" className="rounded-full bg-mustard text-deep" />
              <a href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-frog px-6 py-4 font-display font-bold text-deep"><TelegramIcon /> Join Telegram</a>
              <a href={siteConfig.xCommunityUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-4 font-display font-bold text-deep"><XIcon /> X Community</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
