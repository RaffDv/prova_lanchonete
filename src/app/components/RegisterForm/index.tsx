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
  }, [AccountData.UserData.pass[1], AccountData.UserData.pass[0]])

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-4 transition-all duration-300">
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
        className={`w-full flex flex-col relative items-center gap-2 transition-all duration-300`}
        onSubmit={(e) => e.preventDefault()}
      >
        {/* page 1 */}

        <div
          className={`w-full flex flex-col relative items-center transition-all duration-300 gap-2 ${
            page !== 1 && 'opacity-0 hidden'
          }`}
        >
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
              ns.UserData.email = e.target.value
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
        </div>

        {/* page 2 */}

        <div
          className={`w-full flex flex-col relative items-center transition-all duration-300 gap-2 max-w-[270px] ${
            page !== 2 && 'opacity-0 hidden'
          }`}
        >
          <DefaultInput
            id="country"
            name="country"
            placeholder="País"
            type="text"
            value={AccountData.AddresData.country}
            onchange={(e) => {
              const ns = { ...AccountData }
              ns.AddresData.country = e.target.value
              setAccountData(ns)
            }}
          />

          <DefaultInput
            id="state"
            name="state"
            placeholder="Estado"
            type="text"
            value={AccountData.AddresData.state}
            onchange={(e) => {
              const ns = { ...AccountData }
              ns.AddresData.state = e.target.value
              setAccountData(ns)
            }}
          />
          <DefaultInput
            id="city"
            name="city"
            placeholder="Cidade"
            type="text"
            value={AccountData.AddresData.city}
            onchange={(e) => {
              const ns = { ...AccountData }
              ns.AddresData.city = e.target.value
              setAccountData(ns)
            }}
          />

          <DefaultInput
            id="neighborhood"
            name="neighborhood"
            placeholder="Bairro"
            type="text"
            value={AccountData.AddresData.neighborhood}
            onchange={(e) => {
              const ns = { ...AccountData }
              ns.AddresData.neighborhood = e.target.value
              setAccountData(ns)
            }}
          />

          <div className="flex float-left w-full">
            <DefaultInput
              className="border-none rounded-l-full rounded-none w-[200px]"
              id="street"
              name="street"
              placeholder="Rua"
              type="text"
              value={AccountData.AddresData.street}
              onchange={(e) => {
                const ns = { ...AccountData }
                ns.AddresData.street = e.target.value
                setAccountData(ns)
              }}
            />
            <DefaultInput
              className="border-none rounded-r-full rounded-none w-[70px]"
              id="state"
              name="state"
              placeholder="Num"
              type="text"
              onchange={(e) => {
                const ns = { ...AccountData }
                ns.AddresData.state += `,${e.target.value}`
                setAccountData(ns)
              }}
            />
          </div>
        </div>

        <span
          className={`text-red-600 leading-relaxed text-sm underline transition-all duration-300 opacity-0 ${
            !AccountData.UserData.passIsEqual &&
            AccountData.UserData.pass[1] !== '' &&
            'visible opacity-100 inline-flex '
          }
          ${page !== 1 && 'hidden'}
          `}
        >
          As senhas não conferem!
        </span>

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
            disabled={
              !AccountData.UserData.passIsEqual ||
              AccountData.UserData.user === '' ||
              AccountData.UserData.email === ''
            }
            className={`font-semibold bg-buttonBg p-2  color-font rounded-2xl flex justify-center ${
              page === 2 ? 'w-fit' : 'w-16'
            }`}
            onClick={() => setPage(2)}
          >
            {page === 1 ? <ArrowRight size={20} /> : 'Enviar'}
          </button>
        </div>
      </form>
    </section>
  )
}
