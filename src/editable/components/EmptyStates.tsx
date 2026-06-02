import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'No ads found',
  description = 'Try another category or check again after fresh listings are posted.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded border border-dashed border-[#bfcbd4] bg-[#f8fbfd] p-10 text-center text-[#333]', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2098d4] text-white">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-2xl font-normal">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#666]">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex rounded-sm bg-[#2098d4] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1688c3]">
        {actionLabel}
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'ads', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically once available.`}
      actionLabel="Explore listings"
      actionHref="/classified"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
