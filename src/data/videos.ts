export interface VideoItem {
  id: string
  title: string
  blurb: string
  src: string
  poster: string
  /** CSS aspect ratio of the source clip */
  ratio: string
}

const v = (name: string) => ({
  src: `/assets/videos/${name}.mp4`,
  poster: `/assets/videos/${name}-poster.jpg`,
})

export const videos: VideoItem[] = [
  { id: 'intro', title: "I'm FORG.", blurb: 'The introduction. Four seconds, no further questions.', ...v('forg-intro-im-forg'), ratio: '1842 / 614' },
  { id: 'cosmic', title: 'Cosmic journey', blurb: 'Meditation, a moon, and one very green Uno card.', ...v('forg-cosmic-journey'), ratio: '16 / 9' },
  { id: 'cottage', title: 'Cottage and tulip', blurb: 'A quiet village, a glowing tulip, and a frog who noticed.', ...v('forg-cottage-tulip'), ratio: '16 / 9' },
  { id: 'rain', title: 'Rainy city', blurb: 'Neon, rain, and a frog walking home anyway.', ...v('forg-rainy-city'), ratio: '862 / 360' },
]
