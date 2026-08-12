import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, MapPin, Plus, Search, Settings2, Tag } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { classifiedFallbackImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => {
  let s = value
  for (let i = 0; i < 2; i++) {
    s = s
      .replace(/&#(\d+);/g, (_m: string, code: string) => String.fromCharCode(Number(code)))
      .replace(/&#x([0-9a-f]+);/gi, (_m: string, hex: string) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#39;/g, "'").replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
      .replace(/<[^>]*>/g, ' ')
  }
  return s.replace(/\s+/g, ' ').trim()
}
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost, limit = 145) => {
  const raw = post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''
  const clean = stripHtml(raw)
  if (!clean) return 'Open this ad to view price, location, seller and service details.'
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}
const categoryOf = (post: SitePost) => {
  const content = getContent(post)
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Classified'
}
const fieldOf = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = content[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post) || classifiedFallbackImage
  const summary = summaryOf(post)
  const category = categoryOf(post)
  const price = fieldOf(post, ['price', 'amount', 'budget']) || 'Check with seller'
  const location = fieldOf(post, ['location', 'address', 'city']) || 'Local area'
  const variant = index % 5

  if (variant === 0 && index < 20) {
    return (
      <Link href={href} className="group col-span-full block overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5">
        <div className="grid min-h-[200px] md:grid-cols-[280px_1fr]">
          <div className="relative min-h-[180px] bg-[#eef3f6]">
            <img src={image} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
            <span className="absolute left-3 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-[#2098d4]">{category}</span>
          </div>
          <div className="min-w-0 p-5">
            <h3 className="line-clamp-2 text-xl font-normal leading-snug text-[#0088ff]">{post.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#656565]">{summary}</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#333]">
              <span><Tag className="mr-1 inline h-3.5 w-3.5 text-[#ffb000]" />Price: {price}</span>
              <span><MapPin className="mr-1 inline h-3.5 w-3.5 text-[#58b957]" />Location: {location}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 1) {
    return (
      <Link href={href} className="group block overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5">
        <div className="relative aspect-[2.5/1] bg-[#eef3f6]">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
          <span className="absolute left-3 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-[#2098d4]">{category}</span>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-normal leading-snug text-[#0088ff]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#656565]">{summary}</p>
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 bg-[#f7f7f7] px-4 py-3 text-sm text-[#333]">
          <span className="text-[#0088ff]">Category: {category}</span>
          <span><Tag className="inline h-3.5 w-3.5 text-[#ffb000]" /> Price: {price}</span>
          <span><MapPin className="inline h-3.5 w-3.5 text-[#58b957]" /> Location: {location}</span>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group block overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5">
      <div className="grid min-h-[150px] grid-cols-[130px_1fr]">
        <div className="relative bg-[#eef3f6]">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
          <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-[#2098d4]">{category}</span>
        </div>
        <div className="min-w-0 p-3">
          <h3 className="line-clamp-2 text-lg font-normal leading-snug text-[#0088ff]">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#656565]">{summary}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 bg-[#f7f7f7] px-4 py-3 text-sm text-[#333]">
        <span className="text-[#0088ff]">Category: {category}</span>
        <span><Tag className="inline h-3.5 w-3.5 text-[#ffb000]" /> Price: {price}</span>
        <span><MapPin className="inline h-3.5 w-3.5 text-[#58b957]" /> Location: {location}</span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#f2f5f9] text-[#333]">
        <section className="relative border-b-2 border-[#2098d4] bg-[#111] text-white">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative mx-auto max-w-[1180px] px-4 py-8 text-center sm:py-10">
            <h1 className="text-3xl font-normal">Search capsigrow classifieds</h1>
            <p className="mt-4 text-xl">Find local ads, deals, jobs, property, services and more.</p>
            <form action="/search" className="mx-auto mt-6 flex max-w-[750px] flex-col items-stretch gap-3 sm:flex-row">
              <input type="hidden" name="master" value="1" />
              <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-h-[49px] min-w-0 flex-1 bg-black/55 px-5 text-lg text-white outline-none placeholder:text-[#c9d9e9]" />
              <button type="submit" className="inline-flex min-h-[49px] items-center justify-center bg-[#ff5353] px-7 text-lg font-bold">
                <Search className="mr-2 h-5 w-5" /> Search
              </button>
              <Link href="/classified" className="inline-flex min-h-[49px] items-center justify-center rounded-sm bg-[#91a5a8] px-9 text-lg font-bold">
                <Settings2 className="mr-2 h-5 w-5" /> Refine
              </Link>
            </form>
            <div className="mx-auto mt-4 flex max-w-[750px] flex-col gap-3 sm:flex-row">
              <input name="category" form="search-filters" defaultValue={category} placeholder="Filter by category" className="min-h-[42px] min-w-0 flex-1 bg-black/40 px-5 text-sm text-white outline-none placeholder:text-[#c9d9e9]" />
              <select name="task" form="search-filters" defaultValue={task} className="min-h-[42px] min-w-0 flex-1 bg-black/40 px-5 text-sm text-white outline-none">
                <option value="">All content types</option>
                {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
              </select>
            </div>
            <form id="search-filters" action="/search"><input type="hidden" name="master" value="1" /></form>
          </div>
        </section>

        <div className="mx-auto max-w-[1140px] px-4 py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#20242a]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
              <p className="mt-1 text-sm text-[#656565]">{results.length} results found</p>
            </div>
            <Link href="/contact" className="inline-flex h-[38px] items-center justify-center rounded-sm bg-[#91a5a8] px-5 text-sm font-bold text-white">
              <Plus className="mr-1 h-4 w-4 fill-white" /> Post your Free Ad!
            </Link>
          </div>

          {results.length ? (
            <div className="grid gap-7 lg:grid-cols-2">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="rounded border border-[#d6dce1] bg-white p-10 text-center">
              <p className="text-xl font-bold text-[#20242a]">No matching posts found.</p>
              <p className="mt-3 text-sm text-[#656565]">Try a different keyword, content type, or category.</p>
              <Link href="/classified" className="mt-5 inline-flex rounded-sm bg-[#2098d4] px-5 py-2 text-sm text-white shadow-[0_8px_18px_rgba(32,152,212,0.3)]">Browse all classifieds</Link>
            </div>
          )}

          <div className="mt-10 overflow-hidden rounded border border-[#d6dce1] bg-white">
            <h3 className="bg-[#f6f6f6] px-5 py-4 text-xl font-bold">Discover more</h3>
            {['Second-hand mobile deals', 'Local property listings', 'Jobs and home services'].map((item) => (
              <Link key={item} href="/classified" className="flex items-center justify-between border-t border-[#edf0f2] px-5 py-4 text-lg hover:bg-[#f8fbfd]">
                <span>{item}</span>
                <ChevronRight className="h-6 w-6 text-[#9aa2aa]" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </EditableSiteShell>
  )
}
