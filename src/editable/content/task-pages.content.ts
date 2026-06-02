import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Local guides',
    headline: 'Helpful posts for buyers, sellers and local service seekers.',
    description: 'Browse practical updates, guides and information connected to local marketplace activity.',
    filterLabel: 'Choose topic',
    secondaryNote: 'Useful posts should help visitors make better local decisions.',
    chips: ['Guides', 'Local tips', 'Marketplace updates'],
  },
  classified: {
    eyebrow: 'Classified board',
    headline: 'Free classified ads, deals and local opportunities.',
    description: 'Scan fresh ads across everyday categories including products, property, vehicles, jobs and services.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Prioritize price, location and direct browsing.',
    chips: ['Free ads', 'Local offers', 'Quick search'],
  },
  sbm: {
    eyebrow: 'Saved resources',
    headline: 'Useful links and resources for classified browsing.',
    description: 'Find saved references, service resources and marketplace-related links in one place.',
    filterLabel: 'Filter resource category',
    secondaryNote: 'Keep resources grouped and easy to open.',
    chips: ['Resources', 'Saved links', 'References'],
  },
  profile: {
    eyebrow: 'Members and sellers',
    headline: 'Profiles connected to local ads and services.',
    description: 'Browse seller, service provider and member profiles with simple identity cues.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Make contact context and credibility easy to spot.',
    chips: ['Sellers', 'Services', 'Profiles'],
  },
  pdf: {
    eyebrow: 'Document ads',
    headline: 'Downloadable files, brochures and service documents.',
    description: 'Browse PDF resources connected to listings, local services, offers and business information.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document pages should make file context clear.',
    chips: ['Brochures', 'Forms', 'Documents'],
  },
  listing: {
    eyebrow: 'Business directory',
    headline: 'Business listings for local services and shops.',
    description: 'Compare local businesses, service providers, contact details and coverage areas.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Prioritize location, contact and service details.',
    chips: ['Directory', 'Services', 'Local business'],
  },
  image: {
    eyebrow: 'Image ads',
    headline: 'Photo-led listings for products, places and services.',
    description: 'Browse image-forward ads where photos help visitors understand the offer faster.',
    filterLabel: 'Filter image category',
    secondaryNote: 'Let clear listing images support quick discovery.',
    chips: ['Photo ads', 'Gallery', 'Visual listings'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
