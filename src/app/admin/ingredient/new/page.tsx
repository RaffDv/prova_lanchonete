'use client'
import { Input } from '@/components/Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '@/image/logo.svg'
import logoIngredientes from '@/image/ing.svg'
import api from '@/api'
import { useState } from 'react'
import { motion } from 'framer-motion'

const schema = z.object({
  name: z.string().min(3, 'Informe um nome válido'),
  amount: z
    .number({
      errorMap: () => {
        return {
          message: 'Informe um número válido',
        }
      },
    })
    .positive('Digite um número maior que 0'),
})

type DataProps = z.infer<typeof schema>

export default function Home() {
  const [success, setSuccess] = useState<boolean | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  })

  const { push, back } = useRouter()

  console.log(errors)

  const handleForm = async (data: DataProps) => {
    const r = await api.ingredient.new(data)
    if (r.success) {
      setSuccess(true)
      setInterval(() => {
        setSuccess(null)
        push('/')
      }, 500)
    } else {
      setSuccess(false)
      setTimeout(() => {
        setSuccess(null)
      }, 500)
    }
  }
  return (
    <section className="flex flex-col items-center justify-start h-full">
      <div className="flex w-full justify-start items-start">
        <button
          onClick={() => back()}
          className="absolute w-8 h-8 bg-buttonBg flex items-center justify-center m-2 font-bold z-10 rounded-full"
        >
          <ArrowLeft size={20} weight="bold" />{' '}
        </button>
        <div className="relative flex flex-col w-full items-center mt-3">
          <Image src={logo} alt="Logo Avellaneda" width={35} />
          <Image
            className="mt-2"
            src={logoIngredientes}
            alt="Logo Ingredientes"
            width={115}
          />
        </div>
      </div>
      <div>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit(handleForm)}
        >
          <Input
            {...register('name')}
            type="text"
            placeholder="Tomate,pão..."
            label="Nome do Ingrediente"
            helperText={errors.name?.message}
            required
          />
          <Input
            {...register('amount', {
              setValueAs: (value: string) => parseInt(value, 10),
            })}
            type="number"
            placeholder="Quantidade"
            helperText={errors.amount?.message}
            label="Quantidade"
            required
          />
          <button
            className="w-24 h-8 bg-buttonBg flex justify-center items-center text-base rounded-2xl mt-6"
            type="submit"
          >
            Enviar
          </button>
        </form>
        <div className="w-full p-2 absolute bottom-16 flex items-center justify-center text-center ">
          {success === false && (
            <>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-fit h-fit p-2 relative rounded-xl bg-red-500 shadow-md shadow-red-400"
              >
                <span className="text-white font-medium leading-relaxed ">
                  Ocorreu um erro, tente novamente!
                </span>
              </motion.span>
            </>
          )}
          {success && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className=" h-fit p-2 relative rounded-xl bg-emerald-600 shadow-md shadow-emerald-400"
              >
                <span className="text-white font-medium leading-relaxed ">
                  Dados salvos!
                </span>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
