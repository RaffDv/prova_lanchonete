'use client'
import Image from 'next/image'
import logo from '@/image/logo.jpg'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginUserSchema } from '@/schemas/global'
import { z } from 'zod'
import Error from '../defaultComponents/Error'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/user/auth'
import Link from 'next/link'

type LoginUserType = z.infer<typeof loginUserSchema>

export default function LoginForm() {
  const { login } = useContext(AuthContext)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginUserType>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      pass: '',
    },
  })

  const handleFormSubmit = async (data: LoginUserType) => {
    console.log(JSON.stringify(data, null, 4))

    login({ email: data.email, pass: data.pass })
  }

  return (
    <section className="flex flex-col w-full h-full items-center justify-center p-4 relative">
      <header className="m-3 mb-11 flex flex-col gap-2 items-center">
        <Image src={logo} alt="logo" width={80} height={80} />
        <span className="text-main font-semibold leading-relaxed text-3xl">
          Entrar
        </span>
      </header>

      <form
        className=" flex flex-col  items-center gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col relative ">
          <input
            type="text"
            className="border rounded-full bg-inputBg p-2"
            placeholder="Email"
            {...register('email')}
          />
          <Error msg={errors.email?.message} />
        </div>
        <div className="flex flex-col relative ">
          <input
            type="text"
            className="border rounded-full bg-inputBg p-2"
            placeholder="Senha"
            {...register('pass')}
          />
          <Error msg={errors.pass?.message} className="w-fit max-w-none" />
        </div>

        <button
          type="submit"
          className="font-semibold bg-buttonBg p-2  w-full mt-8 color-font rounded-2xl flex justify-center"
        >
          Login
        </button>
      </form>
      <span className="text-main text-sm mt-4">
        Não tem uma conta?{' '}
        <Link href={'/user/register'} className="underline">
          Cadastre-se
        </Link>{' '}
      </span>
    </section>
  )
}