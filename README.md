# FORG ($FORG) Official Website

Single-page site for the FORG community. React + Vite + TypeScript + Tailwind CSS + Framer Motion.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Configure

Everything shared lives in `src/config/siteConfig.ts`: contract address, Solscan, Telegram, X Community, and an optional `buyUrl`.
The BUY $FORG button only appears when `buyUrl` is set to a real, official URL.

Before launch, replace `https://forg.example.com` with your production domain in `index.html` (Open Graph and Twitter tags), `public/robots.txt` and `public/sitemap.xml`.

## Deploy to GitHub + Vercel

1. `git init && git add . && git commit -m "FORG website"`
2. Create an empty GitHub repo, then `git remote add origin <url> && git push -u origin main`
3. On vercel.com choose **Add New Project**, import the repo. Vercel detects Vite; `vercel.json` already sets build command `npm run build` and output `dist`.
4. Click **Deploy**. Add your custom domain under Project Settings, Domains.

## Structure

```
src/components   Navbar, Hero, About, Gallery, VideoSection, TokenInfo, Community, CTA, Footer,
                 InteractiveForg, EasterEgg, CustomCursor, LoadingScreen, CopyButton, Reveal, Icons
src/config       siteConfig.ts (single source of truth)
src/data         gallery.ts, videos.ts
src/hooks        useScrollAnimation.ts (in-view, active section, clipboard, reduced motion)
public/assets    optimized images (webp) and videos (mp4 + poster frames)
```

## Easter egg

Type `forg` anywhere, enter the Konami code, or click the nav logo five times quickly.

## Notes

- Videos use `preload="none"` with poster frames, play one at a time, and pause when scrolled out of view.
- `prefers-reduced-motion` is respected (Framer Motion `reducedMotion="user"` plus CSS fallbacks).
- No token price, supply, market cap or holder data is shown, by design.
