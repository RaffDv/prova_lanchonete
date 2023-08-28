'use client'

import Link from 'next/link'

export default function Page() {
  return (
    <section className="w-full h-full flex flex-col">
      <Link href={`user/90/edit/form`}>Modal</Link>
    </section>
  )
}
