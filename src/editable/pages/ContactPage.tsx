'use client'

import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Building2, title: 'Listing help', body: 'Ask about posting, updating, or organizing classified ads across products, property, jobs and services.' },
  { icon: MapPin, title: 'Category and location support', body: 'Tell us when a city, region, or category needs clearer placement for local visitors.' },
  { icon: Phone, title: 'Seller and buyer questions', body: 'Send marketplace questions about contact details, ad visibility, safety information, or account access.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#333]">
        <section className="bg-[#c9f0ff]">
          <div className="mx-auto max-w-[1160px] px-4 py-3 text-sm">
            <Link href="/" className="text-[#0088ff]">Home</Link> <span className="text-[#a6a6a6]">\</span> Contact
          </div>
        </section>
        <section className="mx-auto grid max-w-[1160px] gap-8 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase text-[#2098d4]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-normal leading-tight">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#666]">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded border border-[#d6dce1] bg-white p-5 shadow-[0_2px_14px_rgba(0,0,0,0.08)]">
                  <lane.icon className="h-7 w-7 text-[#2098d4]" />
                  <h2 className="mt-3 text-xl font-normal">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#666]">{lane.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded bg-[#f5f5f5] p-5 text-sm leading-7">
              <Mail className="mr-2 inline h-5 w-5 text-[#2098d4]" />
              For clear support, include the ad title, category, location and contact email in your message.
            </div>
          </div>

          <div className="rounded border border-[#d6dce1] bg-white p-6 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
            <h2 className="border-b-2 border-[#2da9e8] pb-3 text-2xl font-normal">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
