'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(3, 'Por favor, informe um nome válido'),
  lastName: z.string().min(3, 'Por favor, informe um sobrenome válido'),
})

type DataProps = z.infer<typeof schema>

export default function Home() {
  const { register, handleSubmit } = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  return (
    <>
      <h2>Input</h2>

      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input
          {...register('name')}
          type="text"
          placeholder="digite seu nome"
        />
        <input
          {...register('lastName')}
          type="text"
          placeholder="digite seu sobrenome"
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}
