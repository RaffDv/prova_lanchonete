'use client'
import Image from 'next/image'
import logo from '@/image/logo.jpg'
import DefaultInput from '../defaultComponents/DefaultInput'
import { useEffect, useState } from 'react'
import { AccountType } from './../../../../local/types/global'
import { ArrowRight } from '@phosphor-icons/react'

export default function RegisterForm() {
  const [AccountData, setAccountData] = useState<AccountType>({
    AddresData: {
      city: '',
      complement: '',
      country: '',
      neighborhood: '',
      state: '',
      street: '',
    },
    UserData: {
      email: '',
      pass: ['', ''],
      passIsEqual: false,
      user: '',
    },
  })
  const [page, setPage] = useState<number>(1)

  const handeVerifyPass = () => {
    if (AccountData.UserData.pass[0] === AccountData.UserData.pass[1]) {
      const ns = { ...AccountData }
      ns.UserData.passIsEqual = true
      console.log('senha igual')
      console.log(ns)
      setAccountData(ns)
    } else {
      const ns = { ...AccountData }
      ns.UserData.passIsEqual = false
      setAccountData(ns)
    }
  }

  useEffect(() => {
    if (AccountData.UserData.pass[0] !== '') {
      handeVerifyPass()
    }
  }, [AccountData.UserData.pass[1]])

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-4 transition-all duration-300">
      <header className="w-full flex flex-col items-center space-y-2">
        <Image src={logo} alt="logo" width={80} height={80} />
        <h2 className="text-main font-bold leading-relaxed mx-4 text-2xl">
          Registre-se
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
        onSubmit={(e) => e.preventDefault()}
      >
        {/* page 1 */}
        {page === 1 && (
          <>
            <DefaultInput
              id="username"
              name="username"
              placeholder="Usuário"
              type="text"
              required
              value={AccountData.UserData.user}
              onchange={(e) => {
                const ns = { ...AccountData }
                ns.UserData.user = e.target.value
                setAccountData(ns)
              }}
            />
            <DefaultInput
              id="email"
              name="email"
              type="email"
              placeholder="email@email.com"
              required
              onchange={(e) => {
                const ns = { ...AccountData }
                ns.UserData.user = e.target.value
                setAccountData(ns)
              }}
              value={AccountData.UserData.email}
            />

            <DefaultInput
              id="password"
              name="password"
              type="text"
              placeholder="Senha"
              required
              onchange={(e) => {
                const ns = { ...AccountData }
                ns.UserData.pass[0] = e.target.value
                setAccountData(ns)
              }}
              value={AccountData.UserData.pass[0]}
            />

            <DefaultInput
              id="passwordConf"
              name="passwordConf"
              type="text"
              placeholder="Confirme sua senha"
              required
              onchange={(e) => {
                console.log(e.target.value)
                const ns = { ...AccountData }
                ns.UserData.pass[1] = e.target.value
                setAccountData(ns)
              }}
              value={AccountData.UserData.pass[1]}
            />
          </>
        )}
        {/* page 2 */}
        {page === 2 && (
          <>
            <DefaultInput
              id="country"
              name="country"
              placeholder="País"
              type="text"
              value={AccountData.AddresData.country}
              required
              onchange={(e) => {
                const ns = { ...AccountData }
                ns.AddresData.country = e.target.value
                setAccountData(ns)
              }}
            />
          </>
        )}
        {!AccountData.UserData.passIsEqual &&
          AccountData.UserData.pass[1] !== '' && (
            <span className="text-red-600 leading-relaxed text-sm underline ">
              As senhas não conferem!
            </span>
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
            disabled={!AccountData.UserData.passIsEqual}
            className={`font-bold bg-buttonBg p-2  color-font rounded-2xl flex justify-center ${
              page === 2 ? 'w-fit' : 'w-16'
            }`}
            onClick={() => setPage(2)}
          >
            {page === 1 ? <ArrowRight size={20} /> : 'Registrar-se'}
          </button>
        </div>
      </form>
    </section>
  )
}
