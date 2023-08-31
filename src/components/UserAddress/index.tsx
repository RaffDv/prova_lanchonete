'use client'

import api from '@/api'
import { addressType } from '@/schemas/global'
import { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner'

export default function UserAddress() {
  const [address, setAddress] = useState<addressType | null>(null)
  const getAddress = async () => {
    const r = await api.user.address()
    if (r.success) {
      setAddress(r.data.data)
    }
  }

  useEffect(() => {
    getAddress()
  }, [])
  return (
    <>
      {address ? (
        <div className="  flex flex-col items-start justify-center h-20 relative border-b-2  border-b-gray-500 bg-gray-200/80">
          <input type="checkbox" checked className="m-1" />
          <span className="text-lg font-medium absolute top-0 left-5">
            {address?.street},N {address?.num}
          </span>
          <span>
            {address?.country},{address?.state},{address?.city},
            {address?.district}{' '}
          </span>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Triangle visible width={80} height={80} color="#0089D7" />
        </div>
      )}
    </>
  )
}
