import api from '@/api'
import { Input } from '@/components/Input/Input'
import { userType } from '@/schemas/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  country: z.string().min(3, 'Minímo de 3 caracteres'),
  state: z.string().min(2, 'Somente 2 caracteres').max(2),
  city: z.string().min(3, 'Minímo de 3 caracteres'),
  district: z.string().min(3, 'Minímo de 3 caracteres'),
  street: z.string().min(3, 'Minímo de 3 caracteres'),
  num: z.number({
    errorMap: () => {
      return {
        message: 'Informe um número válido!',
      }
    },
  }),
})

type FormProps = z.infer<typeof schema>

export default function User({ params }: { params: { email: string } }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  })

  const [data, setData] = useState<userType>({} as userType)
  const getdata = async () => {
    const r = await api.user.unique({ email: params.email })
    if (r.success) {
      setData(r.data.data)
    }
  }

  const handleForm = (data: FormProps) => {
    console.log(data)
  }

  useEffect(() => {
    getdata()
  }, [])
  return (
    <div className="flex flex-col justify-center items-center">
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(handleForm)}
      >
        <Input
          type="text"
          {...register('country')}
          label="País"
          defaultValue={data.country}
          helperText={errors.country?.message}
        />

        <Input
          type="text"
          {...register('state')}
          label="Estado"
          defaultValue={data.state}
          helperText={errors.state?.message}
        />

        <Input
          type="text"
          {...register('city')}
          label="Cidade"
          defaultValue={data.city}
          helperText={errors.city?.message}
        />

        <Input
          type="text"
          {...register('district')}
          label="Bairro"
          defaultValue={data.district}
          helperText={errors.district?.message}
        />

        <Input
          type="text"
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
          className="flex mt-6 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
