'use client'
import Image from 'next/image'
import logo from '@/image/logo.jpg'
import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { AccountSchema } from '@/schemas/global'
import Balancer from 'react-wrap-balancer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
type formProps = z.infer<typeof AccountSchema>
export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      account: {
        email: '',
        pass: '',
        passConf: '',
        user: '',
      },
    },
  })

  const [page, setPage] = useState<number>(1)

  const handleFormSubmit = (data: formProps) => {
    console.log(data)
  }
  console.log(errors)

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-4 ">
      <header className="w-full flex flex-col items-center space-y-2">
        <Image src={logo} alt="logo" width={80} height={80} />
        <h2 className="text-main font-bold leading-relaxed mx-4 text-2xl">
          {page === 1 ? 'Registre-se' : 'Endereço'}
        </h2>
        {/* dots */}
        <div className="flex items-center space-x-2 ">
          <div
            className={`h-1 w-1 mb-3 rounded-full ${
              page === 1 ? 'bg-dot' : 'bg-off'
            }`}
          ></div>
          <div
            className={`h-1 w-1 mb-3 rounded-full ${
              page === 2 ? 'bg-dot' : 'bg-off'
            }`}
          ></div>
        </div>
      </header>
      <form
        className={`w-full flex flex-col relative items-center gap-2 `}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {/* page 1 */}

        {page === 1 && (
          <>
            <input
              {...register('account.user')}
              type="text"
              className="border rounded-full bg-inputBg p-2"
              placeholder="Nome completo"
            />
            {errors.account?.user?.message && (
              <Balancer className="max-w-[80%] text-xs text-red-600/90 w-fit ">
                {errors.account.user.message}
              </Balancer>
            )}
            <input
              {...register('account.email')}
              type="text"
              className="border rounded-full bg-inputBg p-2"
              placeholder="Email"
            />
            {errors.account?.email?.message && (
              <Balancer className="max-w-[80%] text-xs text-red-600/90 w-fit ">
                {errors.account.email.message}
              </Balancer>
            )}
            <input
              {...register('account.pass')}
              type="text"
              className="border rounded-full bg-inputBg p-2"
              placeholder="Senha"
            />
            {errors.account?.pass?.message && (
              <Balancer className="max-w-[80%] text-xs text-red-600/90 w-fit ">
                {errors.account.pass.message}
              </Balancer>
            )}
            <input
              {...register('account.passConf')}
              type="text"
              className="border rounded-full bg-inputBg p-2"
              placeholder="Confirme  a senha"
            />
            {errors.account?.passConf?.message && (
              <Balancer className="max-w-[80%] text-xs text-red-600/90 w-fit ">
                {errors.account.passConf.message}
              </Balancer>
            )}

            <Balancer className="max-w-[80%] text-xs text-red-600/90 w-fit transition-all duration-300  ">
              {errors.account?.root?.message}
            </Balancer>
          </>
        )}

        {page === 2 && (
          <>
            <input
              type="text"
              {...register('address.country')}
              className="border rounded-full bg-inputBg p-2"
            />
            <input
              type="text"
              {...register('address.state')}
              className="border rounded-full bg-inputBg p-2"
            />
            <input
              type="text"
              {...register('address.city')}
              className="border rounded-full bg-inputBg p-2"
            />
            <input
              type="text"
              {...register('address.district')}
              className="border rounded-full bg-inputBg p-2"
            />

            <div className=" flex max-w-[270px] relative">
              <input
                type="text"
                {...register('address.street')}
                className="border rounded-full bg-inputBg p-2 float-left rounded-r-none w-[200px]"
              />
              <input
                type="number"
                {...register('address.num')}
                className="border rounded-full bg-inputBg p-2 rounded-l-none w-[70px]"
              />
            </div>
          </>
        )}

        {/* buttons */}
        <div className="w-full h-fit flex justify-evenly items-center mt-5">
          <button
            disabled={page === 1}
            className={`font-semibold bg-buttonBg p-2 w-16 color-font rounded-2xl`}
            onClick={() => setPage(1)}
          >
            {' '}
            voltar
          </button>
          <button
            className={`font-semibold bg-buttonBg p-2  color-font rounded-2xl flex justify-center ${
              page === 2 ? 'w-fit' : 'w-16'
            }`}
            onClick={() => {
              if (page === 1) {
                setPage(2)
              }
            }}
          >
            {page === 1 ? <ArrowRight size={20} /> : 'Enviar'}
          </button>
        </div>
      </form>
    </section>
  )
}
