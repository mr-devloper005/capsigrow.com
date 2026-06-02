import { CheckCircle2, MapPin, Search, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#333]">
        <section className="bg-[#c9f0ff]">
          <div className="mx-auto max-w-[1160px] px-4 py-3 text-sm">
            <span className="text-[#0088ff]">Home</span> <span className="text-[#a6a6a6]">\</span> About
          </div>
        </section>
        <section className="mx-auto grid max-w-[1160px] gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded border border-[#d6dce1] bg-white shadow-[0_3px_24px_rgba(0,0,0,0.1)]">
            <div className="border-b-2 border-[#2da9e8] p-5">
              <p className="text-sm font-bold uppercase text-[#2098d4]">{pagesContent.about.badge}</p>
              <h1 className="mt-3 text-4xl font-normal">About {SITE_CONFIG.name}</h1>
            </div>
            <div className="p-5">
              <p className="max-w-3xl text-base leading-8">{pagesContent.about.description}</p>
              <div className="mt-6 space-y-4 text-sm leading-8 text-[#555]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </article>
          <aside className="space-y-4">
            {[Search, MapPin, ShieldCheck].map((Icon, index) => {
              const value = pagesContent.about.values[index]
              return (
                <div key={value.title} className="rounded border border-[#d6dce1] bg-white p-5 shadow-[0_3px_18px_rgba(0,0,0,0.08)]">
                  <Icon className="h-8 w-8 text-[#2098d4]" />
                  <h2 className="mt-3 text-xl font-normal">{value.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#666]">{value.description}</p>
                </div>
              )
            })}
            <div className="rounded bg-[#f5f5f5] p-5 text-sm leading-7">
              <CheckCircle2 className="mr-2 inline h-5 w-5 text-[#58b957]" />
              Browse locally, compare carefully, and contact sellers directly from the details provided in each ad.
            </div>
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
