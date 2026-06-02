import Link from 'next/link'
import { Award, BriefcaseBusiness, Building2, Camera, Car, ChevronLeft, ChevronRight, Cross, FileText, Filter, Gem, Heart, Home, Image as ImageIcon, MapPin, Megaphone, Plus, Search, Settings2, Tag, Umbrella, UserRound, Users, type LucideIcon } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { classifiedFallbackImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)
const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singles = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singles].slice(0, 8)
}
const getImage = (post: SitePost) => getImages(post)[0] || classifiedFallbackImage
const getCategory = (post: SitePost, fallback = 'Classified') => asText(getContent(post).category) || post.tags?.[0] || fallback
const getSummary = (post: SitePost) => {
  const content = getContent(post)
  return post.summary || asText(content.description) || asText(content.excerpt) || asText(content.body) || 'Open this ad to view price, location, seller and service details.'
}
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const categoryTiles: Array<[string, LucideIcon]> = [
  ['Electronics & Gadgets', Camera],
  ['Real Estate', Building2],
  ['Vehicles & Machinery', Car],
  ['Home & Living', Home],
  ['Jobs & Careers', BriefcaseBusiness],
  ['Education & Learning', Award],
  ['Health & Wellness', Cross],
  ['Travel & Tourism', Umbrella],
  ['Pets & Animal Care', Heart],
  ['Professional & Home Services', Settings2],
  ['Community & Events', Users],
  ['Matrimony & Weddings', Gem],
]

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#333]">
        <section className="relative border-b-2 border-[#2098d4] bg-[#111] text-white">
          <img src={posts[0] ? getImage(posts[0]) : classifiedFallbackImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative mx-auto max-w-[1160px] px-4 py-10 text-center">
            <h1 className="text-3xl font-normal">capsigrow local classifieds</h1>
            <p className="mt-5 text-2xl">Post and browse ads for mobiles, cars, jobs, real estate, home services and local deals.</p>
            <Link href="/contact" className="mx-auto mt-4 flex h-[38px] max-w-[360px] items-center justify-center rounded-full bg-[#a9bdc0] text-sm font-bold text-white">
              <Plus className="mr-1 h-4 w-4" /> Post your Free Ad!
            </Link>
            <p className="mt-6 text-2xl">Find practical local offers by category, price and location.</p>
            <form action="/search" className="mx-auto mt-4 flex max-w-[750px] flex-col items-stretch gap-3 sm:flex-row">
              <input name="q" placeholder="Search mobiles, jobs, property, services or vehicles" className="min-h-[49px] min-w-0 flex-1 bg-black/70 px-5 text-lg text-white outline-none placeholder:text-[#d7e6f3]" />
              <button className="inline-flex min-h-[49px] items-center justify-center bg-[#ff5353] px-7 text-lg font-bold"><Search className="mr-2 h-5 w-5" /> Search</button>
              <Link href={basePath} className="inline-flex min-h-[49px] items-center justify-center rounded-2xl bg-[#a9bdc0] px-9 text-lg font-bold"><Filter className="mr-2 h-5 w-5" /> Refine</Link>
            </form>
          </div>
        </section>

        <section className="bg-white px-4 py-5">
          <h2 className="classified-section-title"><span className="inline-flex items-center gap-2"><Settings2 className="h-4 w-4" /> CATEGORIES</span></h2>
          <div className="mx-auto grid max-w-[1140px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categoryTiles.map(([name, Icon]) => (
              <Link key={name} href={basePath} className="flex min-h-[42px] items-center justify-between bg-white px-4 text-[#333] shadow-[0_7px_20px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5">
                <span className="inline-flex items-center gap-2 text-base"><Icon className="h-4 w-4 text-[#2098d4]" />{name}</span>
                <span className="flex h-[18px] w-[32px] items-center justify-center rounded-full bg-[#2098d4] text-lg font-bold leading-none text-white">+</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-4 pb-10 pt-4">
          <div className="mb-7 grid gap-4 rounded border border-[#d6dce1] bg-[#f8f8f8] p-4 sm:grid-cols-[1fr_220px] sm:items-end">
            <div>
              <p className="text-sm font-bold text-[#2098d4]">{label}</p>
              <p className="mt-1 text-sm text-[#666]">Browse local ads, services, deals, opportunities and useful listings by category. Showing: {categoryLabel}</p>
            </div>
            <form action={basePath} className="flex gap-2">
              <select name="category" defaultValue={category} className="h-10 min-w-0 flex-1 rounded border border-[#ccc] bg-white px-3 text-sm outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="h-10 rounded bg-[#2098d4] px-4 text-sm font-bold text-white">Apply</button>
            </form>
          </div>

          <h2 className="classified-section-title"><span className="inline-flex items-center gap-2"><Megaphone className="h-5 w-5" /> LATEST ITEMS</span></h2>
          {posts.length ? (
            <div className={task === 'image' ? 'columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3' : 'grid gap-7 lg:grid-cols-2'}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded border border-dashed border-[#bfcbd4] bg-[#f8fbfd] p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[#2098d4]" />
              <h2 className="mt-4 text-2xl font-normal">No ads found</h2>
              <p className="mt-2 text-sm text-[#666]">Try a different category or check again after new listings are posted.</p>
            </div>
          )}

          <div className="mt-9 flex items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="inline-flex items-center gap-1 rounded bg-[#b5b5b5] px-4 py-2 text-sm font-bold text-white"><ChevronLeft className="h-4 w-4" /> Prev</Link> : null}
            <span className="rounded bg-[#2098d4] px-4 py-2 text-sm font-bold text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="inline-flex items-center gap-1 rounded bg-[#b5b5b5] px-4 py-2 text-sm font-bold text-white">Next <ChevronRight className="h-4 w-4" /></Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'profile') return <ProfileCard post={post} href={href} />
  if (task === 'pdf' || task === 'sbm') return <TextCard post={post} href={href} task={task} index={index} />
  if (task === 'image') return <ImageCard post={post} href={href} index={index} />
  return <ClassifiedCard post={post} href={href} index={index} task={task} />
}

function ClassifiedCard({ post, href, index, task }: { post: SitePost; href: string; index: number; task: TaskKey }) {
  const image = getImage(post)
  const category = getCategory(post, task === 'listing' ? 'Business' : 'Classified')
  const price = getField(post, ['price', 'amount', 'budget']) || (task === 'classified' ? 'Check with seller' : '')
  const location = getField(post, ['location', 'address', 'city']) || 'Local area'
  const summary = getSummary(post).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const imageFirst = index % 5 === 1
  const listStyle = index % 5 === 4

  if (imageFirst) {
    return (
      <Link href={href} className="group block overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5">
        <div className="relative aspect-[2.4/1] bg-[#eef3f6]">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
          <span className="absolute left-3 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-[#2098d4]">{category}</span>
          <span className="absolute right-3 top-2 rounded bg-[#2098d4] px-2 py-1 text-xs font-bold text-white"><Camera className="mr-1 inline h-3.5 w-3.5" /> 1</span>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-normal leading-snug text-[#0088ff]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#656565]">{summary}</p>
        </div>
        <MetaBar category={category} price={price} location={location} />
      </Link>
    )
  }

  if (listStyle) {
    return (
      <Link href={href} className="group grid overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 sm:grid-cols-[170px_1fr]">
        <img src={image} alt="" className="h-full min-h-[170px] w-full object-cover" />
        <div className="min-w-0 p-4">
          <p className="text-sm text-[#2098d4]">{category}</p>
          <h3 className="mt-1 line-clamp-2 text-lg font-normal leading-snug text-[#0088ff]">{post.title}</h3>
          <p className="mt-2 line-clamp-4 text-sm leading-6 text-[#656565]">{summary}</p>
          <p className="mt-3 text-sm"><MapPin className="mr-1 inline h-4 w-4 text-[#58b957]" />{location}</p>
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
      <MetaBar category={category} price={price} location={location} />
    </Link>
  )
}

function MetaBar({ category, price, location }: { category: string; price: string; location: string }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 bg-[#f7f7f7] px-4 py-3 text-sm text-[#333]">
      <span className="text-[#0088ff]">Category: {category}</span>
      <span><Tag className="inline h-3.5 w-3.5 text-[#ffb000]" /> Price: {price || 'Check with seller'}</span>
      <span><MapPin className="inline h-3.5 w-3.5 text-[#58b957]" /> Location: {location}</span>
    </div>
  )
}

function ImageCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="mb-6 block break-inside-avoid overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)]">
      <img src={getImage(post)} alt="" className="w-full object-cover" />
      <div className="p-4">
        <p className="text-xs font-bold text-[#2098d4]"><ImageIcon className="mr-1 inline h-4 w-4" /> Photo listing</p>
        <h3 className="mt-2 text-lg font-normal text-[#0088ff]">{post.title}</h3>
      </div>
    </Link>
  )
}

function TextCard({ post, href, task, index: _index }: { post: SitePost; href: string; task: TaskKey; index: number }) {
  const Icon = task === 'pdf' ? FileText : Tag
  return (
    <Link href={href} className="block rounded border border-[#e5e5e5] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5">
      <p className="text-sm text-[#2098d4]"><Icon className="mr-1 inline h-4 w-4" /> {task === 'pdf' ? 'Document listing' : 'Marketplace resource'}</p>
      <h3 className="mt-2 text-xl font-normal text-[#0088ff]">{post.title}</h3>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#656565]">{getSummary(post)}</p>
    </Link>
  )
}

function ProfileCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  return (
    <Link href={href} className="block rounded border border-[#e5e5e5] bg-white p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#ddd]">
        {image ? <img src={image} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-white" />}
      </div>
      <h3 className="mt-4 text-lg font-normal text-[#0088ff]">{post.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#656565]">{getSummary(post)}</p>
    </Link>
  )
}
