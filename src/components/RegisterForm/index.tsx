/* eslint-disable no-useless-return */
'use client'
import Image from 'next/image'
import logo from '@/image/logo.jpg'
import { useContext, useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { AccountSchema } from '@/schemas/global'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Error from '../defaultComponents/Error'
import api from '@/api'
import { AuthContext } from '@/contexts/user/auth'
import Link from 'next/link'
export type formProps = z.infer<typeof AccountSchema>
export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    watch,
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

  const { login } = useContext(AuthContext)

  const [page, setPage] = useState<number>(1)

  const handleFormSubmit = async (data: formProps) => {
    if (page === 1) return
    delete data.account.passConf

    const r = await api.user.new({
      account: data.account,
      address: data.address,
    })
    if (r.data.success) {
      const email = watch('account.email')
      const pass = watch('account.pass')

      login({ email, pass })
    }
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
            <Error msg={errors.account?.user?.message} size="normal" />

            <input
              {...register('account.email')}
              type="text"
              className="border rounded-full bg-inputBg p-2"
              placeholder="Email"
            />
            <Error msg={errors.account?.email?.message} size="normal" />

            <input
              {...register('account.pass')}
              type="password"
              className="border rounded-full bg-inputBg p-2"
              placeholder="Senha"
            />
            <Error msg={errors.account?.pass?.message} size="normal" />

            <input
              {...register('account.passConf')}
              type="password"
              className="border rounded-full bg-inputBg p-2"
              placeholder="Confirme  a senha"
            />
            <Error msg={errors.account?.passConf?.message} size="normal" />

            <Error
              size={errors.account?.root?.message ? 'normal' : 'default'}
              msg={errors.account?.root?.message}
            />
          </>
        )}

        {page === 2 && (
          <>
            <input
              type="text"
              placeholder="País"
              {...register('address.country')}
              className="border rounded-full bg-inputBg p-2"
            />
            <Error msg={errors.address?.country?.message} />
            <input
              placeholder="Estado"
              type="text"
              {...register('address.state')}
              className="border rounded-full bg-inputBg p-2"
            />
            <Error msg={errors.address?.state?.message} />

            <input
              placeholder="Cidade"
              type="text"
              {...register('address.city')}
              className="border rounded-full bg-inputBg p-2"
            />
            <Error msg={errors.address?.city?.message} />

            <input
              placeholder="Bairro"
              type="text"
              {...register('address.district')}
              className="border rounded-full bg-inputBg p-2"
            />
            <Error msg={errors.address?.district?.message} />

            <div className=" flex max-w-[270px] relative">
              <div>
                <input
                  placeholder="Rua"
                  type="text"
                  {...register('address.street')}
                  className="border rounded-full bg-inputBg p-2 float-left rounded-r-none w-[200px]"
                />
                <Error msg={errors.address?.street?.message} />
              </div>

              <div>
                <input
                  placeholder="Num"
                  type="number"
                  {...register('address.num')}
                  className="border rounded-full bg-inputBg p-2 rounded-l-none w-[70px]"
                />
                <Error msg={errors.address?.num?.message} />
              </div>
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
            disabled={!!errors.account}
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
        <Link
          href="/user/login"
          className="text-main leading-relaxed text-sm underline"
        >
          Já tem uma conta?
        </Link>
      </form>
    </section>
  )
}
