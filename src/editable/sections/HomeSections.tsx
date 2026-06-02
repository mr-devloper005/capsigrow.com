import Link from 'next/link'
import { Award, BriefcaseBusiness, Building2, Camera, Car, ChevronRight, Cross, Gem, Heart, Home, MapPin, Megaphone, Plus, Search, Settings2, ShieldCheck, Tag, Umbrella, Users, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { classifiedFallbackImage, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
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

function SectionTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return <h2 className="classified-section-title"><span className="inline-flex items-center gap-2">{icon}{children}</span></h2>
}

function DiscoverMore({ items }: { items: string[] }) {
  return (
    <div className="mx-auto max-w-[1190px] overflow-hidden rounded border border-[#d6dce1] bg-white">
      <h3 className="bg-[#f6f6f6] px-5 py-4 text-xl font-bold">Discover more</h3>
      {items.map((item) => (
        <Link key={item} href="/classified" className="flex items-center justify-between border-t border-[#edf0f2] px-5 py-4 text-lg hover:bg-[#f8fbfd]">
          <span>{item}</span>
          <ChevronRight className="h-6 w-6 text-[#9aa2aa]" />
        </Link>
      ))}
    </div>
  )
}

function ListingCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getEditablePostImage(post)
  const category = getEditableCategory(post)
  const excerpt = getEditableExcerpt(post, 145) || 'Helpful listing details are available inside this classified post.'
  const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const price = typeof content.price === 'string' && content.price ? content.price : index % 3 === 0 ? 'Check with seller' : ''
  const location = typeof content.location === 'string' && content.location ? content.location : typeof content.city === 'string' ? content.city : 'Local area'
  const variant = index % 5

  if (variant === 1) {
    return (
      <Link href={href} className="group block overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5">
        <div className="relative aspect-[2.5/1] bg-[#eef3f6]">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
          <span className="absolute left-3 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-[#2098d4]">{category}</span>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-normal leading-snug text-[#0088ff]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#656565]">{excerpt}</p>
        </div>
        <MetaBar category={category} price={price} location={location} />
      </Link>
    )
  }

  if (variant === 3) {
    return (
      <Link href={href} className="group grid overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 sm:grid-cols-[150px_1fr]">
        <div className="relative min-h-[145px] bg-[#eef3f6]">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
          <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-[#2098d4]">{category}</span>
        </div>
        <div className="min-w-0 p-4">
          <h3 className="line-clamp-2 text-lg font-normal leading-snug text-[#0088ff]">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#656565]">{excerpt}</p>
          <div className="mt-3 text-xs text-[#656565]"><MapPin className="mr-1 inline h-3.5 w-3.5 text-[#58b957]" />{location}</div>
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
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#656565]">{excerpt}</p>
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
      <span className="text-[#333]"><Tag className="inline h-3.5 w-3.5 text-[#ffb000]" /> Price: {price || 'Check with seller'}</span>
      <span><MapPin className="inline h-3.5 w-3.5 text-[#58b957]" /> Location: {location}</span>
    </div>
  )
}

export function EditableHomeHero({ primaryRoute, posts }: HomeSectionProps) {
  const heroImage = posts[0] ? getEditablePostImage(posts[0]) : classifiedFallbackImage
  return (
    <section className="relative border-b-2 border-[#2098d4] bg-[#111] text-white">
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 blur-[1px]" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto max-w-[1180px] px-4 py-8 text-center sm:py-10">
        <h1 className="text-3xl font-normal">capsigrow local classifieds</h1>
        <p className="mt-5 text-2xl">Post and browse ads for mobiles, cars, jobs, real estate, home services and local deals.</p>
        <Link href="/contact" className="mx-auto mt-3 flex h-[38px] max-w-[360px] items-center justify-center rounded-sm bg-[#91a5a8] text-sm font-bold text-white">
          <Plus className="mr-1 h-4 w-4 fill-white" /> Post your Free Ad!
        </Link>
        <p className="mt-5 text-2xl">Find practical local offers by category, price and location.</p>
        <form action="/search" className="mx-auto mt-4 flex max-w-[750px] flex-col items-stretch gap-3 sm:flex-row">
          <input name="q" placeholder="Search mobiles, jobs, property, services or vehicles" className="min-h-[49px] min-w-0 flex-1 bg-black/55 px-5 text-lg text-white outline-none placeholder:text-[#c9d9e9]" />
          <button className="inline-flex min-h-[49px] items-center justify-center bg-[#ff5353] px-7 text-lg font-bold"><Search className="mr-2 h-5 w-5" /> Search</button>
          <Link href={primaryRoute} className="inline-flex min-h-[49px] items-center justify-center rounded-sm bg-[#91a5a8] px-9 text-lg font-bold"><Settings2 className="mr-2 h-5 w-5" /> Refine</Link>
        </form>
      </div>
    </section>
  )
}

export function EditableStoryRail(_props: HomeSectionProps) {
  return (
    <section className="bg-white px-4 py-1">
      <SectionTitle icon={<Settings2 className="h-4 w-4" />}>CATEGORIES</SectionTitle>
      <div className="mx-auto grid max-w-[1140px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categoryTiles.map(([label, Icon]) => (
          <Link key={label} href="/classified" className="flex h-[42px] items-center justify-between bg-white px-4 text-[#333] shadow-[0_7px_20px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5">
            <span className="inline-flex items-center gap-2 text-base"><Icon className="h-4 w-4 text-[#2098d4]" />{label}</span>
            <span className="flex h-[18px] w-[32px] items-center justify-center rounded-full bg-[#2098d4] text-lg font-bold leading-none text-white">+</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const visible = posts.slice(0, 8)
  if (!visible.length) return null
  return (
    <section className="bg-white px-4 py-9">
      <SectionTitle icon={<Megaphone className="h-5 w-5" />}>LATEST ITEMS</SectionTitle>
      <div className="mx-auto grid max-w-[1140px] gap-7 lg:grid-cols-2">
        {visible.map((post, index) => <ListingCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
      </div>
      <div className="mt-6 text-center">
        <Link href={primaryRoute} className="inline-flex rounded-sm bg-[#2098d4] px-5 py-2 text-white shadow-[0_8px_18px_rgba(32,152,212,0.3)]">See all local offers</Link>
      </div>
    </section>
  )
}

export function EditableTimeCollections(_props: HomeSectionProps) {
  return (
    <section className="bg-white px-4 py-8">
      <DiscoverMore items={['Second-hand mobile deals', 'Local property listings', 'Jobs and home services']} />
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[#f5f5f5] px-4 py-12">
      <div className="mx-auto grid max-w-[1120px] gap-10 text-center md:grid-cols-3">
        {([
          ['Absolutely Free', 'We do not charge our users for ad posting. All services are absolutely free.', ShieldCheck],
          ['Support 24x7', 'We are open 24x7 to resolve your queries. Just contact us and get response quickly.', Umbrella],
          ['User Dashboard', 'Manage ads, favourite listings and profile activity from one simple dashboard.', Settings2],
        ] as Array<[string, string, LucideIcon]>).map(([title, text, Icon]) => (
          <div key={title}>
            <Icon className="mx-auto h-11 w-11 text-[#2098d4] drop-shadow" />
            <h3 className="mt-4 text-xl font-normal">{title}</h3>
            <p className="mx-auto mt-3 max-w-[310px] text-sm leading-6">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
