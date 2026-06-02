import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Free classified ads and local listings',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Free classified ads and local listings',
    primaryLinks: [
      { label: 'Classifieds', href: '/classified' },
      { label: 'Businesses', href: '/listing' },
      { label: 'Images', href: '/image' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse ads', href: '/classified' },
      secondary: { label: 'Post free ad', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Local deals, jobs, property, vehicles and services',
    description: 'Browse free classified ads, city listings, second-hand goods, business services, property posts, travel offers and local opportunities.',
    columns: [
      {
        title: 'Browse',
        links: [
          { label: 'Classifieds', href: '/classified' },
          { label: 'Business Listings', href: '/listing' },
          { label: 'Image Ads', href: '/image' },
          { label: 'Documents', href: '/pdf' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for local classified discovery.',
  },
  commonLabels: {
    readMore: 'View details',
    viewAll: 'View all ads',
    explore: 'Explore ads',
    latest: 'Latest ads',
    related: 'Related ads',
    published: 'Listed',
  },
} as const
