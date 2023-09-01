'use client'
import { Plus } from '@phosphor-icons/react'
import Link from 'next/link'

export default function NewItemButton() {
  return (
    <Link
      href="/admin/food/new"
      className="absolute right-2 bottom-2 z-10 border h-8 w-8 rounded-full bg-buttonBg flex items-center justify-center"
    >
      <Plus size={24} />
    </Link>
  )
}
