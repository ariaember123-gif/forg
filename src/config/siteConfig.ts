/**
 * Central FORG configuration. Every component reads from here so the
 * contract address and links can never drift out of sync.
 */
export const siteConfig = {
  name: 'FORG',
  ticker: '$FORG',
  blockchain: 'Solana',
  contractAddress: '2HhH7LwfNHrxqMrSoXZ6Ri7GdmRYSJ4e8qSra9Krpump',
  solscanUrl: 'https://solscan.io/token/2HhH7LwfNHrxqMrSoXZ6Ri7GdmRYSJ4e8qSra9Krpump',
  xCommunityUrl: 'https://x.com/i/communities/2032254769692078189',
  telegramUrl: 'https://t.me/forgsolcoin',
  /**
   * Optional. Paste an official purchase URL here to show the BUY $FORG button.
   * Leave empty and the button is hidden. Never guess this value.
   */
  buyUrl: '',
} as const

export const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Videos', id: 'videos' },
  { label: 'Token', id: 'token' },
  { label: 'Community', id: 'community' },
] as const

export const img = (name: string) => `/assets/images/${name}.webp`
export const logo = '/assets/images/forg-logo.webp'
