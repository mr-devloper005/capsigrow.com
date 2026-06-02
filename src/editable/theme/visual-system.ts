import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'classified-board'
  | 'city-directory'
  | 'deal-market'
  | 'service-index'
  | 'local-notice'

export const visualPresets = {
  'classified-board': {
    label: 'Classified Board',
    mood: 'fast, local, practical',
    fontDirection: 'clean sans with clear listing metadata',
    colors: {
      background: '#ffffff',
      foreground: '#333333',
      muted: '#66717c',
      primary: '#2098d4',
      accent: '#ff5353',
      surface: '#ffffff',
    },
    shape: 'blue header, compact cards, squared modules and clear dividers',
  },
  'city-directory': {
    label: 'City Directory',
    mood: 'organized, trustworthy, location-first',
    fontDirection: 'readable sans with compact labels',
    colors: {
      background: '#f7fbfe',
      foreground: '#24313c',
      muted: '#657586',
      primary: '#1f8fc8',
      accent: '#7fc850',
      surface: '#ffffff',
    },
    shape: 'directory rows, location badges and practical side panels',
  },
  'deal-market': {
    label: 'Deal Market',
    mood: 'bright, active, price-aware',
    fontDirection: 'straightforward sans with bold price cues',
    colors: {
      background: '#ffffff',
      foreground: '#2b2b2b',
      muted: '#6f747b',
      primary: '#2098d4',
      accent: '#bf16bd',
      surface: '#ffffff',
    },
    shape: 'offer cards, image-led rows and strong price blocks',
  },
  'service-index': {
    label: 'Service Index',
    mood: 'useful, calm, support-focused',
    fontDirection: 'neutral sans with clear hierarchy',
    colors: {
      background: '#f5f5f5',
      foreground: '#303030',
      muted: '#666666',
      primary: '#2098d4',
      accent: '#91a5a8',
      surface: '#ffffff',
    },
    shape: 'service panels, category lists and helpful footer blocks',
  },
  'local-notice': {
    label: 'Local Notice',
    mood: 'simple, public, easy to scan',
    fontDirection: 'system sans with direct labels',
    colors: {
      background: '#ffffff',
      foreground: '#333333',
      muted: '#777777',
      primary: '#2098d4',
      accent: '#ffb000',
      surface: '#ffffff',
    },
    shape: 'notice rows, bordered content blocks and compact action buttons',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'classified-board',
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in duration-300',
    cardHover: 'transition duration-200 hover:-translate-y-0.5 hover:shadow-lg',
    softHover: 'transition duration-200 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-sm font-bold uppercase tracking-wide',
    heroTitle: 'text-3xl font-normal leading-tight sm:text-4xl',
    sectionTitle: 'text-xl font-bold',
    body: 'text-base leading-7',
    caption: 'text-xs font-bold uppercase tracking-wide',
  },
  surfaces: {
    glass: 'border border-white/20 bg-white/10 backdrop-blur',
    paper: 'border border-[#d6dce1] bg-white shadow-[0_3px_24px_rgba(0,0,0,0.1)]',
    quiet: 'border border-[#e5e5e5] bg-[#f7f7f7]',
    dark: 'border border-white/10 bg-black/45 shadow-[0_10px_28px_rgba(0,0,0,0.22)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-[1160px] px-4',
    sectionY: 'py-10',
    cardGrid: 'grid gap-7 lg:grid-cols-2',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
