import Link from 'next/link'
import { Camera, MapPin, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export const classifiedFallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23e8f7ff'/%3E%3Crect x='90' y='110' width='1020' height='580' rx='24' fill='%23ffffff' stroke='%232098d4' stroke-width='8'/%3E%3Ccircle cx='250' cy='300' r='86' fill='%232098d4' opacity='.18'/%3E%3Cpath d='M210 330h360M210 390h560M210 450h470' stroke='%232098d4' stroke-width='34' stroke-linecap='round' opacity='.75'/%3E%3Crect x='760' y='250' width='210' height='210' rx='18' fill='%232098d4' opacity='.2'/%3E%3Cpath d='M805 405l58-72 45 54 30-38 58 70' fill='none' stroke='%232098d4' stroke-width='18' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ctext x='600' y='610' font-family='Arial,Helvetica,sans-serif' font-size='46' font-weight='700' text-anchor='middle' fill='%232098d4'%3Ecapsigrow local classifieds%3C/text%3E%3C/svg%3E"

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || classifiedFallbackImage
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const fallback = 'Open this ad to view price, location, seller and service details.'
  const text = clean || fallback
  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Classified'
}

function getField(post: SitePost, keys: string[]) {
  const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  for (const key of keys) {
    const value = content[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

function MetaBar({ post }: { post: SitePost }) {
  const price = getField(post, ['price', 'amount', 'budget']) || 'Check with seller'
  const location = getField(post, ['location', 'address', 'city']) || 'Local area'
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 bg-[#f7f7f7] px-4 py-3 text-sm text-[#333]">
      <span className="text-[#0088ff]">Category: {getEditableCategory(post)}</span>
      <span><Tag className="inline h-3.5 w-3.5 text-[#ffb000]" /> Price: {price}</span>
      <span><MapPin className="inline h-3.5 w-3.5 text-[#58b957]" /> Location: {location}</span>
    </div>
  )
}

export function EditorialFeatureCard({ post, href, label = 'Featured ad' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5">
      <div className="relative min-h-[360px] bg-[#111]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-300 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-6 text-white">
          <span className="w-fit rounded bg-[#2098d4] px-3 py-1 text-xs font-bold uppercase">{label}</span>
          <h3 className="mt-4 max-w-2xl text-3xl font-bold leading-tight">{post.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">{getEditableExcerpt(post, 160)}</p>
        </div>
      </div>
      <MetaBar post={post} />
    </Link>
  )
}

export function RailPostCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[260px] shrink-0 overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] bg-[#eef3f6]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-[#2098d4]">{getEditableCategory(post)}</span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-normal leading-snug text-[#0088ff]">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#656565]">{getEditableExcerpt(post, 120)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex gap-3 rounded border border-[#e5e5e5] bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#2098d4] text-sm font-bold text-white">{index + 1}</span>
      <div className="min-w-0">
        <p className="text-xs text-[#2098d4]">{getEditableCategory(post)}</p>
        <h3 className="line-clamp-2 text-base font-normal text-[#0088ff]">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#666]">{getEditableExcerpt(post, 90)}</p>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 sm:grid-cols-[170px_1fr]">
      <div className="relative min-h-[150px] bg-[#eef3f6]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        <span className="absolute right-2 top-2 rounded bg-[#2098d4] px-2 py-1 text-xs font-bold text-white"><Camera className="mr-1 inline h-3.5 w-3.5" /> {index + 1}</span>
      </div>
      <div className="min-w-0 p-4">
        <h2 className="line-clamp-2 text-lg font-normal leading-snug text-[#0088ff]">{post.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#656565]">{getEditableExcerpt(post, 145)}</p>
      </div>
    </Link>
  )
}
