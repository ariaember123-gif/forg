import { ExternalLink, ShoppingCart } from 'lucide-react'
import { logo, siteConfig } from '../config/siteConfig'
import CopyButton from './CopyButton'
import Reveal from './Reveal'

export default function TokenInfo() {
  return (
    <section id="token" className="relative overflow-hidden bg-deep py-24 sm:py-32">
      <div aria-hidden className="blob absolute -right-40 -top-20 h-[520px] w-[520px] bg-forest" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center font-display text-5xl font-extrabold leading-[0.92] text-cream sm:text-7xl">THE <span className="text-mustard">OFFICIAL</span> DETAILS.</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="border-spin rounded-[2rem] p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-5">
              <img src={logo} alt="FORG logo" width={96} height={96} loading="lazy" className="h-20 w-20 rounded-full ring-4 ring-mustard sm:h-24 sm:w-24" />
              <div>
                <p className="font-display text-4xl font-extrabold text-cream sm:text-5xl">{siteConfig.name}</p>
                <p className="font-display text-2xl font-bold text-mustard">{siteConfig.ticker}</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-frog px-4 py-2 font-display text-sm font-bold text-deep">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-deep" /> {siteConfig.blockchain.toUpperCase()}
              </span>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {[['Token name', siteConfig.name], ['Ticker', siteConfig.ticker], ['Network', siteConfig.blockchain]].map(([k, val]) => (
                <div key={k} className="rounded-2xl bg-forest/70 px-5 py-4">
                  <dt className="text-sm text-cream/60">{k}</dt>
                  <dd className="font-display text-xl font-bold text-cream">{val}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 rounded-2xl bg-forest/70 px-5 py-5">
              <p className="text-sm text-cream/60">Contract address</p>
              <p className="mt-1 select-all break-all font-mono text-lg font-medium leading-snug text-mustard sm:text-2xl" data-cursor>{siteConfig.contractAddress}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <CopyButton size="lg" className="rounded-full bg-mustard text-deep hover:bg-[#f2c95a]" />
              <a href={siteConfig.solscanUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-cream/40 px-6 py-4 font-display font-bold text-cream transition hover:border-mustard hover:text-mustard">
                VIEW ON SOLSCAN <ExternalLink className="h-4 w-4" />
              </a>
              {siteConfig.buyUrl && (
                <a href={siteConfig.buyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-frog px-6 py-4 font-display font-bold text-deep hover:bg-[#8bd035]">
                  <ShoppingCart className="h-4 w-4" /> BUY {siteConfig.ticker}
                </a>
              )}
            </div>
            <p className="mt-6 text-sm text-cream/60">Always check that the contract address matches this one before interacting with any token.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
