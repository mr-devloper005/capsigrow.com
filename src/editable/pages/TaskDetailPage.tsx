import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Eye, Facebook, FileText, Flag, Globe2, Heart, MapPin, MessageCircle, Phone, Printer, Tag, Twitter, UserRound, Users } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { classifiedFallbackImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}
const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singles = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singles].slice(0, 12)
}
const getImage = (post: SitePost) => getImages(post)[0] || classifiedFallbackImage
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const getBody = (post: SitePost) => asText(getContent(post).body) || asText(getContent(post).description) || asText(getContent(post).details) || post.summary || 'This ad includes local classified information such as offer details, seller notes, location and contact options.'
const cleanHtml = (raw: string) => {
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  return raw.split(/\n{2,}/).map((part) => `<p>${part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`).join('')
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  if (task === 'classified' || task === 'listing') return <ClassifiedLikeDetail task={task} post={post} related={related} comments={comments} />
  return <GeneralDetail task={task} post={post} related={related} comments={comments} />
}

function Breadcrumb({ task, post }: { task: TaskKey; post: SitePost }) {
  const taskConfig = getTaskConfig(task)
  return (
    <div className="bg-[#c9f0ff]">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-2 px-4 py-3 text-sm">
        <Link href="/" className="text-[#0088ff]">Home</Link>
        <span className="text-[#a6a6a6]">\</span>
        <Link href={taskConfig?.route || `/${task}`} className="text-[#0088ff]">{categoryOf(post, taskConfig?.label || 'Classified')}</Link>
        <span className="text-[#a6a6a6]">\</span>
        <span className="line-clamp-1">{post.title}</span>
      </div>
    </div>
  )
}

function ClassifiedLikeDetail({ task, post, related, comments }: { task: TaskKey; post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  const image = images[0] || classifiedFallbackImage
  const price = getField(post, ['price', 'amount', 'budget']) || 'Check with seller'
  const location = getField(post, ['location', 'address', 'city']) || 'Local area'
  const phone = getField(post, ['phone', 'telephone', 'mobile']) || ''
  const email = getField(post, ['email']) || ''
  const website = getField(post, ['website', 'url', 'link']) || ''
  const taskConfig = getTaskConfig(task)

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#333]">
        <Breadcrumb task={task} post={post} />
        <section className="mx-auto max-w-[1160px] px-4 py-8">
          <DiscoverMore items={['Local jobs and careers', 'Second-hand product deals', 'Home and property services']} />

          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
            <article className="min-w-0">
              <div className="rounded-t bg-[#2098d4] p-3 text-white shadow-[0_5px_20px_rgba(32,152,212,0.25)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <p className="mt-2 flex flex-wrap gap-2 text-sm">Category: {categoryOf(post, taskConfig?.label || 'Classified')}</p>
                  </div>
                  <div className="rounded bg-[#bf16bd] px-8 py-3 text-center text-xl font-bold shadow"> <Tag className="mr-2 inline h-5 w-5" />Price: {price}</div>
                </div>
              </div>

              <div className="rounded-b bg-white p-4 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
                <div className="mx-auto max-w-[640px] border border-[#ddd] bg-white p-1 shadow-[0_5px_18px_rgba(0,0,0,0.18)]">
                  <img src={image} alt="" className="max-h-[420px] w-full object-cover" />
                </div>
                {images.length > 1 ? (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {images.slice(1, 5).map((item, index) => <img key={`${item}-${index}`} src={item} alt="" className="aspect-[4/3] rounded object-cover" />)}
                  </div>
                ) : null}

                <h2 className="article-content mt-9 border-b-2 border-[#2da9e8] pb-3 text-xl font-normal">Description</h2>
                <div className="article-content mt-4 text-base leading-7" dangerouslySetInnerHTML={{ __html: cleanHtml(getBody(post)) }} />
                <SocialButtons />
              </div>

              <DetailsBox post={post} phone={phone} website={website} />
              <CommentsBox comments={comments} slug={post.slug} />
              <RelatedAds task={task} related={related} />

              <div className="mt-8 flex justify-between">
                <Link href={taskConfig?.route || `/${task}`} className="inline-flex items-center gap-1 rounded bg-[#b8b8b8] px-4 py-2 text-sm font-bold text-white"><ChevronLeft className="h-4 w-4" /> Prev Ad</Link>
                <Link href={taskConfig?.route || `/${task}`} className="inline-flex items-center gap-1 rounded bg-[#b8b8b8] px-4 py-2 text-sm font-bold text-white">Next Ad <ChevronRight className="h-4 w-4" /></Link>
              </div>
            </article>

            <aside className="space-y-5">
              <SellerCard post={post} location={location} phone={phone} email={email} website={website} />
              <UsefulInfo />
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function DiscoverMore({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden rounded border border-[#d6dce1] bg-white">
      <h3 className="bg-[#f6f6f6] px-5 py-4 text-xl font-bold">Discover more</h3>
      {items.map((item) => (
        <Link key={item} href="/classified" className="flex items-center justify-between border-t border-[#edf0f2] px-5 py-4 text-lg hover:bg-[#f8fbfd]">
          <span>{item}</span><ChevronRight className="h-6 w-6 text-[#9aa2aa]" />
        </Link>
      ))}
    </div>
  )
}

function SellerCard({ post, location, phone, email, website }: { post: SitePost; location: string; phone: string; email: string; website: string }) {
  return (
    <div className="rounded bg-white p-5 text-center shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex h-44 w-44 items-center justify-center overflow-hidden rounded-full bg-[#d8d8d8] ring-2 ring-white">
        <UserRound className="h-24 w-24 text-white" />
      </div>
      <h3 className="mt-5 font-bold text-[#58657a]">{getField(post, ['seller', 'author', 'name']) || SITE_CONFIG.name}</h3>
      <p className="mt-2 text-xs font-bold uppercase text-[#0088ff]">Individual</p>
      <div className="mt-7 flex justify-center gap-2">
        {phone ? <a href={`tel:${phone}`} className="rounded bg-[#7fc850] px-4 py-2 text-xs font-bold text-white">CALL</a> : null}
        {email ? <a href={`mailto:${email}`} className="rounded bg-[#ff5353] px-4 py-2 text-xs font-bold text-white">EMAIL</a> : null}
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="rounded bg-[#2098d4] px-4 py-2 text-xs font-bold text-white">SITE</Link> : null}
      </div>
      <p className="mt-5 text-sm leading-6"><MapPin className="mr-1 inline h-4 w-4" /> Location : {location}</p>
      <button className="mt-4 w-full rounded-sm bg-[#91a5a8] py-2 text-sm font-bold text-white"><Heart className="mr-1 inline h-4 w-4 fill-white" /> Add To Favourite</button>
      <button className="mt-2 w-full rounded-sm bg-[#7fc850] py-2 text-sm font-bold text-white">Location Map</button>
      <button className="mt-2 w-full rounded-sm bg-[#ff5353] py-2 text-sm font-bold text-white"><Flag className="mr-1 inline h-4 w-4" /> Report this Ad</button>
    </div>
  )
}

function UsefulInfo() {
  return (
    <div className="rounded bg-white shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
      <h3 className="border-b-2 border-[#2da9e8] px-4 py-4 text-xl font-normal">Useful Info</h3>
      {[
        'Avoid scams by acting locally or paying with PayPal.',
        'Never pay with Western Union, Moneygram or other anonymous payment services.',
        "Don't buy or sell outside of your country. Don't accept cashier cheques from outside your country.",
        'This site is never involved in any transaction, and does not handle payments, shipping, guarantee transactions, provide escrow services, or offer buyer protection.',
      ].map((item) => <p key={item} className="border-b border-[#eee] px-5 py-4 text-sm leading-5">{item}</p>)}
    </div>
  )
}

function DetailsBox({ post, phone, website }: { post: SitePost; phone: string; website: string }) {
  return (
    <section className="mt-8 rounded bg-white p-4 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
      <h2 className="border-b-2 border-[#2da9e8] pb-3 text-xl font-normal">More Details</h2>
      <div className="mt-3 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <DetailRow icon={<Eye className="h-4 w-4" />} label="Listing status:" value="Available on capsigrow" />
        <DetailRow icon={<FileText className="h-4 w-4" />} label="Reference Id:" value={`#${post.id || post.slug}`} />
        {phone ? <DetailRow icon={<Phone className="h-4 w-4" />} label="Phone Number:" value={phone} /> : null}
        {website ? <DetailRow icon={<Globe2 className="h-4 w-4" />} label="Website URL:" value={website} link /> : null}
      </div>
    </section>
  )
}

function DetailRow({ icon, label, value, link = false }: { icon: ReactNode; label: string; value: string; link?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#d6d6d6] py-2 text-sm">
      <strong className="inline-flex items-center gap-1">{icon}{label}</strong>
      {link ? <Link href={value} target="_blank" rel="noreferrer" className="break-all text-[#0088ff]">{value}</Link> : <span className="text-[#9a9a9a]">{value}</span>}
    </div>
  )
}

function CommentsBox({ comments, slug }: { comments: Array<{ id: string; name: string; comment: string; createdAt: string }>; slug: string }) {
  return (
    <section className="mt-5 rounded bg-white p-4 shadow-[0_3px_18px_rgba(0,0,0,0.1)]">
      <h2 className="flex items-center gap-2 text-lg font-normal"><MessageCircle className="h-5 w-5" /> Comments</h2>
      <div className="mt-4 grid gap-3">
        {comments.slice(0, 4).map((comment) => (
          <div key={comment.id} className="rounded border border-[#eee] p-3 text-sm">
            <strong>{comment.name}</strong>
            <p className="mt-1 leading-6">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-[#666]">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}

function RelatedAds({ task, related }: { task: TaskKey; related: SitePost[] }) {
  if (!related.length) return null
  return (
    <section className="mt-5 rounded bg-white p-4 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
      <h2 className="border-b-2 border-[#2da9e8] pb-3 text-xl font-normal">Related Ads</h2>
      <div className="mt-4 grid gap-5">
        {related.map((post) => (
          <Link key={post.id || post.slug} href={buildPostUrl(task, post.slug)} className="grid overflow-hidden rounded border border-[#e5e5e5] bg-white shadow-sm sm:grid-cols-[180px_1fr]">
            <div className="relative min-h-[135px] bg-[#eef3f6]">
              <img src={getImage(post)} alt="" className="h-full w-full object-cover" />
              <span className="absolute left-3 top-2 rounded bg-white/90 px-2 py-1 text-xs font-bold text-[#2098d4]">{categoryOf(post, 'Classified')}</span>
            </div>
            <div className="p-3">
              <h3 className="text-lg font-normal text-[#0088ff]">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#656565]">{summaryText(post)}</p>
              <p className="mt-3 bg-[#f7f7f7] px-3 py-2 text-sm">Category: {categoryOf(post, 'Classified')}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function SocialButtons() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {[Facebook, Twitter, Globe2, Printer, Users].map((Icon, index) => (
        <button key={index} className="flex h-10 w-10 items-center justify-center rounded bg-[#2098d4] text-white">
          <Icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  )
}

function GeneralDetail({ task, post, related, comments }: { task: TaskKey; post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const taskConfig = getTaskConfig(task)
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#333]">
        <Breadcrumb task={task} post={post} />
        <section className="mx-auto grid max-w-[1160px] gap-7 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_330px]">
          <article className="rounded bg-white p-4 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
            <Link href={taskConfig?.route || `/${task}`} className="inline-flex items-center gap-1 rounded bg-[#b8b8b8] px-4 py-2 text-sm font-bold text-white"><ChevronLeft className="h-4 w-4" /> Back</Link>
            <h1 className="mt-5 border-b-2 border-[#2da9e8] pb-3 text-3xl font-normal">{post.title}</h1>
            <img src={getImage(post)} alt="" className="mt-5 max-h-[500px] w-full object-cover" />
            <div className="article-content mt-5 text-base leading-7" dangerouslySetInnerHTML={{ __html: cleanHtml(getBody(post)) }} />
            <SocialButtons />
            <CommentsBox comments={comments} slug={post.slug} />
          </article>
          <aside>
            <div className="rounded bg-white p-4 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
              <h2 className="border-b-2 border-[#2da9e8] pb-3 text-xl font-normal">More like this</h2>
              <div className="mt-4 grid gap-3">
                {related.map((item) => <Link key={item.id || item.slug} href={buildPostUrl(task, item.slug)} className="text-[#0088ff] hover:underline">{item.title}</Link>)}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
