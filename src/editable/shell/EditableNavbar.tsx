'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, PlusCircle, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import logo from '@/editable/assets/capsigrow-logo.png'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 bg-[#2098d4] text-white shadow-sm">
      <nav className="mx-auto flex min-h-[55px] w-full max-w-[1160px] items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-[28px] font-bold leading-none tracking-[-0.04em]">
          <img src={typeof logo === 'string' ? logo : logo.src} alt="capsigrow logo" className="h-10 w-10 rounded-full bg-white/15 object-cover ring-1 ring-white/30" />
          <span>capsigrow</span>
        </Link>

        <div className="ml-6 hidden items-center gap-1 lg:flex">
          <Link href="/classified" className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold hover:bg-white/10">
            Classified<ChevronDown className="h-3.5 w-3.5" />
          </Link>
          {navItems.filter((item) => item.href !== '/classified').slice(0, 2).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`px-3 py-2 text-sm font-semibold ${active ? 'bg-white/15' : 'hover:bg-white/10'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          <Link href="/login" className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            Login <ChevronDown className="h-3.5 w-3.5" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-semibold hover:underline">
            <PlusCircle className="h-4 w-4" /> Contact
          </Link>
          <Link href="/about" className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            about <ChevronDown className="h-3.5 w-3.5" />
          </Link>
          <Link href="/search" aria-label="Search" className="rounded p-1.5 hover:bg-white/10">
            <Search className="h-5 w-5" />
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto rounded border border-white/30 p-2 md:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/20 bg-[#2098d4] px-4 py-3 md:hidden">
          <div className="mx-auto grid max-w-[1160px] gap-2">
            {[{ label: 'Home', href: '/' }, { label: 'Categories', href: '/classified' }, { label: 'Post Free Ad', href: '/contact' }, { label: 'Pages', href: '/about' }, { label: 'Search', href: '/search' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded bg-white/10 px-3 py-2 text-sm font-semibold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
