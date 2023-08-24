'use client'

import api from '@/api'
import { useEffect } from 'react'

export default function Home() {
  const ttest = async () => {
    const r = await api.user.login({
      email: 'raff@gmail.com',
      pass: 'senha123',
    })
    console.log(r)
  }
  useEffect(() => {
    ttest()
  }, [])
  return (
    <main className="flex w-full h-full flex-col items-center justify-between ">
      <div className="flex w-full  flex-col">
        <span>ola</span>
        <div className="flex items-start">{/* <Base /> */}</div>
      </div>
    </main>
  )
}
