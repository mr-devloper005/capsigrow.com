import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#333333',
  '--slot4-panel-bg': '#f5f5f5',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#606975',
  '--slot4-soft-muted-text': '#77808b',
  '--slot4-accent': '#2098d4',
  '--slot4-accent-fill': '#2098d4',
  '--slot4-accent-soft': '#cfeeff',
  '--slot4-dark-bg': '#161616',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#eef3f6',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f7f7f7',
  '--slot4-lavender': '#e8f7ff',
  '--slot4-gray': '#f2f2f2',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #ffffff 56%, #f3f3f3 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/10',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_3px_14px_rgba(0,0,0,0.12)]',
  shadowStrong: 'shadow-[0_10px_32px_rgba(0,0,0,0.18)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-10 sm:py-12',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2',
    featureGrid: 'grid gap-8 lg:grid-cols-[1fr_360px]',
    rail: 'flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[260px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-xs font-bold uppercase tracking-wide',
    heroTitle: 'text-3xl font-normal leading-tight sm:text-4xl',
    sectionTitle: 'text-xl font-bold',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-sm bg-[#2098d4] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1688c3]`,
    secondary: `inline-flex items-center justify-center rounded-sm border border-black/10 bg-white px-5 py-2.5 text-sm font-bold text-[#333] transition hover:bg-[#f5f5f5]`,
    accent: `inline-flex items-center justify-center rounded-sm bg-[#ff5353] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#ee4040]`,
  },
  media: {
    frame: `relative overflow-hidden rounded ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.16)]',
    fade: 'transition duration-200 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Keep the classified blue header, centered search hero, category grid, listing cards, and detail sidebar consistent across editable components.',
  'Use postHref() and existing post props for all dynamic links.',
  'Render missing image, summary, category, price, and location values with small fallbacks.',
] as const
