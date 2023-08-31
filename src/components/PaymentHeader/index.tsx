'use client'
import { ArrowLeft } from '@phosphor-icons/react'
import Image from 'next/image'
import logo from '@/image/logo.jpg'
import { useRouter } from 'next/navigation'

export default function PaymentHeader() {
  const { back } = useRouter()

  return (
    <>
      <header className="relative w-full flex justify-center">
        <span
          onClick={back}
          className="left-1 top-1 absolute rounded-full bg-buttonBg w-fit h-fit p-1  "
        >
          <ArrowLeft size={20} weight="bold" />
        </span>
        <Image alt="logo" src={logo} height={80} width={80} />
      </header>
    </>
  )
}
