'use client'
import { useRouter } from 'next/navigation'
import logo from '@/image/logo.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import api from '@/api'
import { userType } from '@/schemas/global'
import { Input } from '@/components/Input/Input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z
  .object({
    user: z.string().min(3, 'Minímo de 3 caracteres'),
    email: z.string().email('Por favor digite um email válido'),
    pass: z.string().min(8, 'Minímo de 8 caracteres'),
    confirmPass: z.string(),
    country: z.string().min(3, 'Minímo de 3 caracteres'),
    state: z.string().min(2, 'Somente 2 caracteres').max(2),
    city: z.string().min(3, 'Minímo de 3 caracteres'),
    district: z.string().min(3, 'Minímo de 3 caracteres'),
    street: z.string().min(3, 'Minímo de 3 caracteres'),
    num: z
      .number({
        errorMap: () => {
          return {
            message: 'Informe um número válido!',
          }
        },
      })
      .positive('Digite um número maior que 0'),
  })
  .refine((fields) => fields.pass === fields.confirmPass, {
    path: ['confirmPass'],
    message: 'As senhas precisam ser iguais!',
  })

type FormProps = z.infer<typeof schema>

export default function Page({ params }: { params: { email: string } }) {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<userType>({} as userType)
  const { back } = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  })

  const getdata = async () => {
    const r = await api.user.unique({ email: params.email })
    if (r.success) {
      setData(r.data.data)
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  const handleForm = (data: FormProps) => {
    console.log({ data })
  }

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
        {page === 1 && (
          <div className="flex flex-col justify-center items-center">
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit(handleForm)}
            >
              <Input
                {...register('user')}
                label="Usuário"
                defaultValue={data.user}
                helperText={errors.user?.message}
              />

              <Input
                {...register('email')}
                label="Email"
                defaultValue={data.email}
                helperText={errors.email?.message}
              />

              <Input
                {...register('pass')}
                label="Senha"
                type="password"
                defaultValue={data.pass}
                helperText={errors.pass?.message}
              />

              <Input
                {...register('confirmPass')}
                label="Confirmação de senha"
                type="password"
                helperText={errors.confirmPass?.message}
                required
              />
              <button
                type="submit"
                className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
              >
                Salvar
              </button>
            </form>
          </div>
        )}
        {page === 2 && (
          <div className="flex flex-col justify-center items-center">
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit(handleForm)}
            >
              <Input
                {...register('country')}
                label="País"
                defaultValue={data.country}
                helperText={errors.country?.message}
              />

              <Input
                {...register('state')}
                label="Estado"
                defaultValue={data.state}
                helperText={errors.state?.message}
              />

              <Input
                {...register('city')}
                label="Cidade"
                defaultValue={data.city}
                helperText={errors.city?.message}
              />

              <Input
                {...register('district')}
                label="Bairro"
                defaultValue={data.district}
                helperText={errors.district?.message}
              />

              <Input
                {...register('street')}
                label="Rua"
                defaultValue={data.street}
                helperText={errors.street?.message}
              />

              <Input
                {...register('num', {
                  setValueAs: (value: string) => parseInt(value, 10),
                })}
                label="Número"
                type="number"
                defaultValue={data.num}
                helperText={errors.num?.message}
              />
              <button
                type="submit"
                className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
              >
                Salvar
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
