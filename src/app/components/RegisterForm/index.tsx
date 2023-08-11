'use client'
import Image from 'next/image'
import logo from '@/image/logo.jpg'
import DefaultInput from '../defaultComponents/DefaultInput'
import { useState } from 'react'
import { loginType } from './../../../../local/types/global'
import { ArrowRight } from '@phosphor-icons/react'

export default function RegisterForm() {
  const [formData, setFormData] = useState<loginType>({
    email: '',
    pass: '',
    passCheck: '',
    passIsEqual: false,
    user: '',
  })
  const [page, setPage] = useState<number>(1)
  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-4">
      <Image src={logo} alt="logo" width={80} height={80} />
      <h2 className="text-main font-bold leading-relaxed m-4 text-2xl">
        Registrar-se
      </h2>
      <form className="w-full flex flex-col items-center gap-2">
        <DefaultInput
          id="username"
          name="username"
          placeholder="Usuário"
          type="text"
          required
          value={formData.user}
          onchange={(e) => setFormData({ ...formData, user: e.target.value })}
        />
        <DefaultInput
          id="email"
          name="email"
          type="email"
          placeholder="email@email.com"
          required
          onchange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />

        <DefaultInput
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          required
          onchange={(e) => setFormData({ ...formData, pass: e.target.value })}
          value={formData.pass}
        />

        <DefaultInput
          id="passwordConf"
          name="passwordConf"
          type="password"
          placeholder="Confirme sua senha"
          required
          onchange={(e) =>
            setFormData({ ...formData, passCheck: e.target.value })
          }
          value={formData.passCheck}
        />
        <div className="w-full h-fit flex justify-evenly items-center mt-5">
          <button
            disabled={page === 1}
            className={`font-bold bg-buttonBg p-2 w-16 color-font rounded-2xl`}
          >
            {' '}
            voltar
          </button>
          <button className="font-bold bg-buttonBg p-2 w-16 color-font rounded-2xl flex justify-center cursor-pointer">
            {' '}
            <ArrowRight size={20} />{' '}
          </button>
        </div>
      </form>
    </section>
  )
}
