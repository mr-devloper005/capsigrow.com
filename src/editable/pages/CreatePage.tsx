'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: FileText,
}

const fieldClass = 'h-12 rounded border border-[#cfd8df] bg-white px-4 text-base text-[#333] outline-none transition placeholder:text-[#8a939b] focus:border-[#2098d4]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="bg-white text-[#333]">
          <section className="bg-[#c9f0ff]">
            <div className="mx-auto max-w-[1160px] px-4 py-3 text-sm">
              <Link href="/" className="text-[#0088ff]">Home</Link> <span className="text-[#a6a6a6]">\</span> Create
            </div>
          </section>
          <section className="mx-auto grid min-h-[calc(100vh-16rem)] max-w-[1160px] items-center gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
            <div>
              <p className="text-sm font-bold uppercase text-[#2098d4]">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-4 max-w-2xl text-4xl font-normal leading-tight">{pagesContent.create.locked.title}</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#666]">{pagesContent.create.locked.description}</p>
            </div>
            <div className="rounded border border-[#d6dce1] bg-white p-6 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
              <div className="flex h-48 items-center justify-center rounded bg-[#f2f5f9]">
                <Lock className="h-16 w-16 text-[#2098d4] opacity-60" />
              </div>
              <h2 className="mt-5 border-b-2 border-[#2da9e8] pb-3 text-2xl font-normal">Sign in required</h2>
              <p className="mt-4 text-sm leading-7 text-[#666]">Login or create an account to start posting classified ads on capsigrow.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link href="/login" className="flex h-11 items-center justify-center rounded bg-[#2098d4] text-sm font-bold text-white">Login</Link>
                <Link href="/signup" className="flex h-11 items-center justify-center rounded border border-[#d6dce1] text-sm font-bold text-[#333]">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#333]">
        <section className="bg-[#c9f0ff]">
          <div className="mx-auto max-w-[1160px] px-4 py-3 text-sm">
            <Link href="/" className="text-[#0088ff]">Home</Link> <span className="text-[#a6a6a6]">\</span> Create post
          </div>
        </section>
        <section className="mx-auto max-w-[1160px] px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase text-[#2098d4]">{pagesContent.create.hero.badge}</p>
              <h1 className="mt-4 text-4xl font-normal leading-tight">{pagesContent.create.hero.title}</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#666]">{pagesContent.create.hero.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded border p-4 text-left transition hover:-translate-y-0.5 ${active ? 'border-[#2098d4] bg-[#2098d4] text-white shadow-[0_8px_18px_rgba(32,152,212,0.3)]' : 'border-[#d6dce1] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]'}`}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-3 block text-sm font-bold">{item.label}</span>
                      <span className={`mt-1 block text-xs ${active ? 'text-white/75' : 'text-[#666]'}`}>{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded border border-[#d6dce1] bg-white p-6 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2da9e8] pb-3">
                <div>
                  <p className="text-xs font-bold uppercase text-[#2098d4]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 text-2xl font-normal">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded bg-[#f5f5f5] px-3 py-2 text-xs font-bold text-[#333]">{session.name}</span>
              </div>

              <form onSubmit={submit} className="mt-5 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24 py-3`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48 py-3`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />

                {created ? (
                  <div className="flex items-start gap-3 rounded bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <div>
                      <p>{pagesContent.create.successTitle}</p>
                      <p className="mt-1 font-normal text-emerald-700">{created.title}</p>
                    </div>
                  </div>
                ) : null}

                <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-[#2098d4] px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#1688c3]">
                  <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
