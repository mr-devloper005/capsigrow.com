import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Create classified account', description: 'Create an account to manage capsigrow classified ads and local marketplace activity.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#333]">
        <section className="bg-[#c9f0ff]">
          <div className="mx-auto max-w-[1160px] px-4 py-3 text-sm">
            <Link href="/" className="text-[#0088ff]">Home</Link> <span className="text-[#a6a6a6]">\</span> Create account
          </div>
        </section>
        <section className="mx-auto grid min-h-[calc(100vh-16rem)] max-w-[1160px] items-center gap-8 px-4 py-10 lg:grid-cols-[420px_1fr]">
          <div className="rounded border border-[#d6dce1] bg-white p-6 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
            <h1 className="border-b-2 border-[#2da9e8] pb-3 text-2xl font-normal">Create account</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-[#666]">Already have an account? <Link href="/login" className="font-bold text-[#0088ff] underline-offset-4 hover:underline">Login</Link></p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-[#2098d4]">Post and manage ads</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-normal leading-tight">Create a capsigrow account for local classifieds, saved offers and seller enquiries.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#666]">Accounts help visitors keep marketplace activity organized while browsing products, property, services, jobs and local offers.</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
