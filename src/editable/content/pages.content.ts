import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Free classified ads, local deals, jobs, property and services',
      description: 'Browse capsigrow classifieds for affordable deals, second-hand goods, real estate, jobs, local services, vehicles, electronics, travel and community listings.',
      openGraphTitle: 'capsigrow classified ads and local listings',
      openGraphDescription: 'Find useful local ads, deals, jobs, property listings, services and everyday marketplace posts on capsigrow.',
      keywords: ['classified ads', 'local listings', 'second hand deals', 'property listings', 'jobs', 'local services'],
    },
    hero: {
      badge: 'Free local classifieds',
      title: ['Free classified ads', 'for everyday local needs.'],
      description: 'Search city listings, affordable deals, property posts, jobs, services, vehicles, electronics and community updates in one place.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'Post free ad', href: '/contact' },
      searchPlaceholder: 'Search mobiles, jobs, cars, property, services and more',
      focusLabel: 'Local search',
      featureCardBadge: 'latest local offers',
      featureCardTitle: 'Fresh ads from people, shops and service providers.',
      featureCardDescription: 'Recent listings stay easy to scan with clear categories, locations, price cues and direct detail pages.',
    },
    intro: {
      badge: 'About the marketplace',
      title: 'A practical classified board for finding and posting local opportunities.',
      paragraphs: [
        'capsigrow helps visitors browse useful ads across city and regional categories without unnecessary clutter.',
        'The marketplace is organized around common local needs such as used products, property, vehicles, jobs, travel, education, health, events and home services.',
        'Each listing keeps important details visible so buyers, sellers and service seekers can compare options quickly.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Category-first browsing for local goods, property, jobs and services.',
        'Listing cards with price, location, image and summary cues.',
        'Detail pages with seller information, useful safety guidance and related ads.',
        'Responsive layouts designed for quick searching on mobile and desktop.',
      ],
      primaryLink: { label: 'Browse classifieds', href: '/classified' },
      secondaryLink: { label: 'Contact support', href: '/contact' },
    },
    cta: {
      badge: 'Start browsing',
      title: 'Find local ads and everyday services faster.',
      description: 'Move through categories, compare listings and open detailed ad pages with the same simple classified experience across the site.',
      primaryCta: { label: 'Browse Classifieds', href: '/classified' },
      secondaryCta: { label: 'Post Free Ad', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About capsigrow',
    title: 'Local classifieds made easier to scan.',
    description: `${slot4BrandConfig.siteName} is a public classified marketplace for people looking for local deals, second-hand products, property listings, jobs, services and community posts.`,
    paragraphs: [
      'The site is designed around practical discovery. Visitors can move from broad categories into focused listings and then into detailed ad pages with price, location and seller information.',
      'capsigrow keeps the experience simple: clear navigation, quick search, readable ad cards and safety-minded detail pages for everyday marketplace browsing.',
    ],
    values: [
      {
        title: 'Local discovery',
        description: 'Listings are grouped around the categories people commonly search for in their city or region.',
      },
      {
        title: 'Fast comparison',
        description: 'Cards surface the essentials: image, title, category, price cue and location.',
      },
      {
        title: 'Safer browsing',
        description: 'Detail pages include practical reminders for meeting locally, checking information and avoiding unsafe payments.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Need help with a listing, category, or local ad request?',
    description: 'Send a clear note about the ad, category, location, account access, or marketplace question you need help with.',
    formTitle: 'Send your classified request',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related posts',
      fallbackTitle: 'Post details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related gallery ads',
      fallbackTitle: 'Image listing details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile information will appear here once available.',
      visitButton: 'Visit Website',
    },
  },
} as const
