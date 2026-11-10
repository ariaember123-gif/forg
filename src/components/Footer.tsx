import { logo, navLinks, siteConfig } from '../config/siteConfig'
import CopyButton from './CopyButton'
import { TelegramIcon, XIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="bg-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 rounded-full ring-2 ring-mustard" />
            <span className="font-display text-4xl font-extrabold">FORG</span>
          </div>
          <div className="mt-5 flex gap-3">
            <a href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" aria-label="FORG Telegram" className="grid h-11 w-11 place-items-center rounded-full bg-frog text-deep transition hover:-translate-y-1"><TelegramIcon /></a>
            <a href={siteConfig.xCommunityUrl} target="_blank" rel="noopener noreferrer" aria-label="FORG X Community" className="grid h-11 w-11 place-items-center rounded-full bg-cream text-deep transition hover:-translate-y-1"><XIcon /></a>
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-2 font-bold">
            {navLinks.map((l) => (<li key={l.id}><a href={`#${l.id}`} className="text-cream/80 hover:text-mustard">{l.label}</a></li>))}
          </ul>
        </nav>
        <div>
          <p className="text-sm text-cream/60">Contract address ({siteConfig.blockchain})</p>
          <p className="mt-1 select-all break-all font-mono text-sm text-mustard">{siteConfig.contractAddress}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <CopyButton className="rounded-full bg-mustard text-deep" />
            <a href={siteConfig.solscanUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-cream underline decoration-mustard underline-offset-4 hover:text-mustard">View on Solscan</a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-cream/65 sm:px-6">
          <p>{siteConfig.ticker} is a community-driven meme project. Nothing on this website constitutes financial advice. Always do your own research.</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} FORG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
