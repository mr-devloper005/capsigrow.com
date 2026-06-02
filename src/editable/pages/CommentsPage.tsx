'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Search } from 'lucide-react'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

type StoredComment = {
  id: string
  name: string
  email?: string
  comment: string
  createdAt: string
  articleTitle?: string
  articleSlug?: string
}

const COMMENTS_PER_PAGE = 8
const COMMENT_KEY_PREFIX = 'slot4:article-comments:'

const readCommentsFromStorage = (): StoredComment[] => {
  const items: StoredComment[] = []
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (!key?.startsWith(COMMENT_KEY_PREFIX)) continue
    const articleSlug = key.replace(COMMENT_KEY_PREFIX, '')
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) || '[]')
      if (!Array.isArray(parsed)) continue
      for (const item of parsed) {
        if (!item || typeof item !== 'object') continue
        if (typeof item.name !== 'string' || typeof item.comment !== 'string') continue
        items.push({
          id: typeof item.id === 'string' ? item.id : `${articleSlug}-${items.length}`,
          name: item.name,
          email: typeof item.email === 'string' ? item.email : undefined,
          comment: item.comment,
          createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
          articleTitle: typeof item.articleTitle === 'string' ? item.articleTitle : undefined,
          articleSlug: typeof item.articleSlug === 'string' ? item.articleSlug : articleSlug,
        })
      }
    } catch {
      // Ignore corrupted browser comment records.
    }
  }

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export default function CommentsPage() {
  const [comments, setComments] = useState<StoredComment[]>([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setComments(readCommentsFromStorage())
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return comments
    return comments.filter((item) => {
      return [item.name, item.email, item.comment, item.articleTitle, item.articleSlug]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    })
  }, [comments, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / COMMENTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const visibleComments = filtered.slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE)

  function refreshComments() {
    setComments(readCommentsFromStorage())
    setPage(1)
  }

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#333]">
        <section className="bg-[#c9f0ff]">
          <div className="mx-auto max-w-[1160px] px-4 py-3 text-sm">
            <Link href="/" className="text-[#0088ff]">Home</Link> <span className="text-[#a6a6a6]">\</span> Comments
          </div>
        </section>
        <section className="mx-auto max-w-[1160px] px-4 py-10">
          <div className="rounded border border-[#d6dce1] bg-white p-6 shadow-[0_3px_24px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-[#2098d4]">
                  <MessageSquare className="h-4 w-4" /> Marketplace comments
                </p>
                <h1 className="mt-4 text-4xl font-normal">Comments</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#666]">
                  Review comments saved in this browser from capsigrow post pages.
                </p>
              </div>
              <button type="button" className="rounded bg-[#2098d4] px-4 py-2 text-sm font-bold text-white" onClick={refreshComments}>Refresh comments</button>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a858e]" />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Search marketplace comments"
                  className="h-11 w-full rounded border border-[#cfd8df] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#2098d4]"
                />
              </div>
              <p className="text-sm text-[#666]">
                {filtered.length} comment{filtered.length === 1 ? '' : 's'} found
              </p>
            </div>
          </div>

          {visibleComments.length ? (
            <section className="mt-8 grid gap-4">
              {visibleComments.map((item) => (
                <article key={`${item.articleSlug}-${item.id}`} className="rounded border border-[#e5e5e5] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="mt-1 text-xs text-[#666]">Saved marketplace comment</p>
                    </div>
                    {item.articleSlug ? (
                      <Link href={`/article/${item.articleSlug}`} className="text-sm text-[#0088ff] underline-offset-4 hover:underline">
                        Open post
                      </Link>
                    ) : null}
                  </div>
                  {item.articleTitle ? <p className="mt-4 text-sm font-bold">{item.articleTitle}</p> : null}
                  <p className="mt-3 text-sm leading-7 text-[#666]">{item.comment}</p>
                </article>
              ))}
            </section>
          ) : (
            <section className="mt-8 rounded border border-dashed border-[#bfcbd4] bg-[#f8fbfd] p-8 text-center">
              <h2 className="text-xl font-normal">No marketplace comments yet</h2>
              <p className="mt-2 text-sm text-[#666]">Comments added on post pages will appear here.</p>
            </section>
          )}

          {filtered.length > COMMENTS_PER_PAGE ? (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded border border-[#e5e5e5] bg-white p-4 text-sm text-[#666]">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                <button type="button" className="rounded bg-[#b8b8b8] px-4 py-2 font-bold text-white disabled:opacity-40" disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button>
                <button type="button" className="rounded bg-[#b8b8b8] px-4 py-2 font-bold text-white disabled:opacity-40" disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next</button>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}
