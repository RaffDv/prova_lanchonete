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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  })

  const { back } = useRouter()

  console.log(errors)

  const handleForm = (data: DataProps) => {
    console.log({ data })
  }
  return (
    <section className="flex flex-col items-center justify-center">
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
          className="flex flex-col justify-start items-center"
          onSubmit={handleSubmit(handleForm)}
        >
          <Input
            {...register('name')}
            type="text"
            placeholder="Digite seu nome"
            label="Nome do Ingrediente"
            helperText={errors.name?.message}
            required
          />
          <Input
            {...register('amount', {
              setValueAs: (value: string) => parseInt(value, 10),
            })}
            type="number"
            placeholder="Digite seu sobrenome"
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
      </div>
    </section>
  )
}
