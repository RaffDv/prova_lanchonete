'use client'
import { useRouter } from 'next/navigation'
import { newDrinkSchema } from '@/schemas/global'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export type newDrinkType = z.infer<typeof newDrinkSchema>

export default function DrinkForm() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<newDrinkType>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(newDrinkSchema),
    defaultValues: {
      description: '',
      image: undefined,
      name: '',
    },
  })
  const { back } = useRouter()
  console.log(errors)

  const handleFormSubmit = async (data: any) => {
    delete data.size
    // console.log(JSON.parse(data.image[0]))

    const formData = new FormData()
    formData.append('image', data.image[0])
    delete data.image
    formData.append('data', JSON.stringify(data))
    axios({
      method: 'post',
      url: 'http://localhost:4000/api/drink/new',
      data: formData,
    })
      .then(function (response) {
        back()
      })
      .catch(function (response) {
        console.log(response)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`w-full flex flex-col relative items-center gap-2 `}
    >
      <span>Cadastrar bebida</span>

      <input
        type="text"
        {...register('name')}
        placeholder="Nome da bebida"
        className="bg-inputBg border rounded-full p-2"
      />
      <input
        type="file"
        id="drinkFile"
        {...register('image')}
        className="hidden"
        accept="image/*"
      />
      <label htmlFor="drinkFile" className="underline leading-relaxed">
        Adicionar imagem
      </label>
      <input
        placeholder="valor"
        className="bg-inputBg border rounded-full p-2"
        {...register('value')}
      />

      <textarea
        placeholder="descrição"
        className="bg-inputBg rounded-md p-1 w-full h-[128px]"
        {...register('description')}
      />

      <button
        type="submit"
        className="w-fit h-fit p-1 px-2 bg-buttonBg rounded-full mt-6"
      >
        Cadastrar
      </button>
    </form>
  )
}
