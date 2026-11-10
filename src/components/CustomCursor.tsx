import { useEffect, useRef } from 'react'

/** Desktop-only dot + ring cursor. Never mounts on touch / coarse pointers. */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    document.documentElement.classList.add('has-cursor')
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`
      const hot = (e.target as HTMLElement | null)?.closest('a,button,[data-cursor]')
      ring.current?.setAttribute('data-hot', hot ? '1' : '0')
    }
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={dot} className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-mustard mix-blend-difference" />
      <div
        ref={ring}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border-2 border-frog transition-[width,height,margin,background-color] duration-200 data-[hot='1']:-left-7 data-[hot='1']:-top-7 data-[hot='1']:h-14 data-[hot='1']:w-14 data-[hot='1']:bg-frog/20"
      />
    </div>
  )
}
