'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EditableContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data?.message || 'Unable to send your marketplace request.')
      setStatus('success')
      setMessage(data?.message || 'Thanks. Your capsigrow request has been received.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your marketplace request.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label="Full name" placeholder="Your capsigrow contact name" required />
        <Field name="email" type="email" label="Email address" placeholder="your.email@capsigrow.com" required />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field name="phone" label="Phone number" placeholder="Phone for this listing request" />
        <Field name="subject" label="Subject" placeholder="Ad posting, account, category, or location" />
      </div>
      <label className="mt-4 grid gap-2 text-sm font-bold text-[#444]">
        Message
        <textarea name="message" required rows={6} placeholder="Share the ad title, category, location, and the help you need." className="rounded border border-[#cfd8df] bg-white px-4 py-3 text-base outline-none transition focus:border-[#2098d4]" />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {message ? (
        <div className={`mt-5 flex items-start gap-3 rounded px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
          {status === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
          <span>{message}</span>
        </div>
      ) : null}
      <button type="submit" disabled={status === 'submitting'} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-[#2098d4] px-6 text-sm font-bold uppercase tracking-wide text-white shadow transition hover:bg-[#1688c3] disabled:cursor-not-allowed disabled:opacity-70">
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send request
      </button>
    </form>
  )
}

function Field({ name, label, type = 'text', placeholder, required = false }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[#444]">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} className="h-12 rounded border border-[#cfd8df] bg-white px-4 text-base outline-none transition focus:border-[#2098d4]" />
    </label>
  )
}
