import api from '@/api'
import { Input } from '@/components/Input/Input'
import { userType } from '@/schemas/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    user: z.string().min(3, 'Minímo de 3 caracteres'),
    email: z.string().email('Por favor digite um email válido'),
    pass: z.string().min(8, 'Minímo de 8 caracteres'),
    confirmPass: z.string(),
  })
  .refine((fields) => fields.pass === fields.confirmPass, {
    path: ['confirmPass'],
    message: 'As senhas precisam ser iguais',
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
          {...register('user')}
          type="text"
          label="Usuário"
          defaultValue={data.user}
          helperText={errors.user?.message}
        />

        <Input
          type="text"
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
          className="flex mt-6 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
