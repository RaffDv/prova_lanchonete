import PaymentHeader from '@/components/PaymentHeader'
import UserAddress from '@/components/UserAddress'
import { useCookie } from '@/hooks'
import Link from 'next/link'

export default function Page() {
  const token = useCookie('token')
  return (
    <>
      <PaymentHeader />
      <div className="w-full flex justify-center">
        <span className="text-lg my-4 ">Selecionar local de entrega</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        {token ? <UserAddress /> : null}
      </div>
      <div className="absolute flex w-full bottom-1 justify-center">
        <Link
          href={'/payment/method'}
          className="rounded-full bg-buttonBg px-2"
        >
          Continuar
        </Link>
      </div>
    </>
  )
}
