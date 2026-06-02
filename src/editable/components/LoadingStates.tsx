import { cn } from '@/lib/utils'

type LoadingStateProps = {
  label?: string
  className?: string
}

function PulseBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-sm bg-[#dcecf5]', className)} />
}

export function PageLoadingState({ label = 'Loading page', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1160px] px-4 py-10', className)} aria-live="polite" aria-busy="true">
      <p className="classified-section-title"><span>{label}</span></p>
      <PulseBlock className="mx-auto h-10 w-3/4 max-w-2xl" />
      <PulseBlock className="mx-auto mt-3 h-5 w-2/3 max-w-xl" />
      <div className="mt-8 grid gap-7 lg:grid-cols-2">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="rounded border border-[#e5e5e5] bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-[130px_1fr] gap-3">
              <PulseBlock className="h-32" />
              <div>
                <PulseBlock className="h-5 w-4/5" />
                <PulseBlock className="mt-3 h-4 w-full" />
                <PulseBlock className="mt-2 h-4 w-3/4" />
              </div>
            </div>
            <PulseBlock className="mt-3 h-9 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CardGridLoadingState({ count = 6, className }: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('grid gap-7 lg:grid-cols-2', className)} aria-live="polite" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded border border-[#e5e5e5] bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
          <PulseBlock className="h-36 w-full" />
          <PulseBlock className="mt-4 h-5 w-5/6" />
          <PulseBlock className="mt-3 h-4 w-2/3" />
        </div>
      ))}
    </div>
  )
}

export function DetailLoadingState({ label = 'Loading detail', className }: LoadingStateProps) {
  return (
    <div className={cn('mx-auto grid w-full max-w-[1160px] gap-7 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_360px]', className)} aria-live="polite" aria-busy="true">
      <div className="rounded bg-white p-4 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
        <PulseBlock className="h-12 w-full bg-[#2098d4]/25" />
        <PulseBlock className="mx-auto mt-5 h-80 w-4/5" />
        <PulseBlock className="mt-8 h-7 w-44" />
        <PulseBlock className="mt-4 h-4 w-full" />
        <PulseBlock className="mt-3 h-4 w-5/6" />
      </div>
      <div className="rounded bg-white p-5 shadow-[0_3px_24px_rgba(0,0,0,0.12)]">
        <PulseBlock className="mx-auto h-44 w-44 rounded-full" />
        <PulseBlock className="mx-auto mt-6 h-5 w-36" />
        <PulseBlock className="mt-8 h-10 w-full" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  )
}
