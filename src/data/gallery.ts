import { img } from '../config/siteConfig'

export interface GalleryItem {
  src: string
  thumb: string
  alt: string
  caption: string
  /** Tailwind grid placement classes (desktop) */
  span: string
}

const g = (file: string) => ({ src: img(file), thumb: img(`${file}-thumb`) })

export const galleryItems: GalleryItem[] = [
  { ...g('forg-bliss-hill-chair'), alt: 'FORG sitting in a plastic chair on the rolling green hills of a classic desktop wallpaper', caption: 'Default wallpaper, default FORG.', span: 'md:col-span-4 md:row-span-2' },
  { ...g('forg-trader-brick-phone'), alt: 'FORG in sunglasses holding a brick phone in front of a rising green chart', caption: 'Taking the call.', span: 'md:col-span-2 md:row-span-1' },
  { ...g('forg-moon-stars'), alt: 'FORG resting on a crescent moon among the stars beside a crying moon figure', caption: 'Moon duty.', span: 'md:col-span-2 md:row-span-1' },
  { ...g('forg-sunset-pier-friend'), alt: 'FORG and a sunglasses-wearing frog friend watching the sunset from a railing', caption: 'Sunset with a friend.', span: 'md:col-span-2 md:row-span-1' },
  { ...g('forg-money-phone'), alt: 'FORG on a rotary phone beside towering stacks of green cash', caption: 'Hold, please.', span: 'md:col-span-2 md:row-span-1' },
  { ...g('forg-backyard-bbq'), alt: 'FORG holding a grill fork and a red can next to a smoking barbecue', caption: 'Weekend mode.', span: 'md:col-span-2 md:row-span-1' },
]
