import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Member login', description: 'Login to manage local classified activity on capsigrow.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#333]">
        <section className="bg-[#c9f0ff]">
          <div className="mx-auto max-w-[1160px] px-4 py-3 text-sm">
            <Link href="/" className="text-[#0088ff]">Home</Link> <span className="text-[#a6a6a6]">\</span> Login
          </div>
        </section>
        <section className="mx-auto grid min-h-[calc(100vh-16rem)] max-w-[1160px] items-center gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-bold uppercase text-[#2098d4]">Member access</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-normal leading-tight">Sign in to manage your saved ads, listing enquiries and local marketplace activity.</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#666]">Use your capsigrow account to keep track of classifieds, seller messages and posted ad details from one place.</p>
          </div>
          <div className="rounded border border-[#d6dce1] bg-white p-6 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
            <h2 className="border-b-2 border-[#2da9e8] pb-3 text-2xl font-normal">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[#666]">New here? <Link href="/signup" className="font-bold text-[#0088ff] underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
