'use client'
import { useRouter } from 'next/navigation'
import logo from '@/image/logo.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import api from '@/api'
import { userType } from '@/schemas/global'
import User from '@/components/UserEdit/User/User'
import Address from '@/components/UserEdit/Address/Address'

export default function Page({ params }: { params: { email: string } }) {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<userType>({} as userType)
  const { back } = useRouter()

  const getdata = async () => {
    const r = await api.user.unique({ email: params.email })
    if (r.success) {
      setData(r.data.data)
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <section className="w-full h-full flex flex-col">
      {/* Inicio do header */}
      <div className="flex m-4 items-center w-1/2 justify-between">
        <button
          onClick={back}
          className="w-8 h-8 bg-buttonBg border rounded-full text-white text-base flex justify-center items-center"
        >
          {'<-'}
        </button>
        <Image src={logo} width={35} height={35} alt="Logo lanchonete" />
      </div>
      <h2 className="flex w-full justify-center font-bold opacity-80 text-lg"></h2>
      <div className="flex font-bold w-full justify-center mt-4 text-gray-1">
        <button
          onClick={() => setPage(1)}
          className={`flex w-36 justify-center ${
            page === 1 && 'border-b-black border-b-4'
          }`}
        >
          Perfil
        </button>
        <button
          onClick={() => setPage(2)}
          className={`flex w-36 justify-center ${
            page === 2 && 'hover:transition-opacity border-b-black border-b-4'
          }`}
        >
          Endereço
        </button>
      </div>
      {/* Fim do header */}
      <div className="flex flex-col justify-center items-center">
        {page === 1 && <User params={params} />}
        {page === 2 && <Address params={params} />}
      </div>
    </section>
  )
}
