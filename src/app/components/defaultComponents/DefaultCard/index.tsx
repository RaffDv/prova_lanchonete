import { ReactNode } from 'react'

export default function DefaultCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-fit w-fit bg-slate-200 shadow border rounded-md">
      {children}
    </div>
  )
}
