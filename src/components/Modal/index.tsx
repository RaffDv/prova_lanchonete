'use client'
import { useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react'

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss],
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="fixed z-20 left-0 right-0 top-0 bottom-0 mx-auto bg-white w-fit h-fit min-w-[80%] min-h-[80%] text-black rounded-md shadow-md"
    >
      <button onClick={router.back}>
        {' '}
        <ArrowLeft size={24} weight="bold" />{' '}
      </button>

      <div
        ref={wrapper}
        className="relative flex flex-col items-center justify-center w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6  "
      >
        {children}
      </div>
    </div>
  )
}
