'use client'
import { useRouter } from 'next/navigation'
import { IngredientType, newDrinkSchema } from '@/schemas/global'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SelectIng } from '../SelectIng'
import api from '@/api'
import { useState, useEffect } from 'react'
export type newDrinkType = z.infer<typeof newDrinkSchema>

export default function DrinkForm() {
  const [ingredients, setIngredients] = useState<IngredientType[]>([])
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
  const getData = async () => {
    const r = await api.ingredient.get()
    if (r.success) {
      setIngredients(r.data.data)
    }
  }
  const { back } = useRouter()

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

  useEffect(() => {
    getData()
  }, [])

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
      <div>
        <span className="text-xs text-font font-light leading-relaxed">
          Clique nos ingredientes que você deseja adicionar/retirar deste prato
        </span>
        <div className="flex justify-around flex-wrap gap-y-1.5 gap-x-1 border border-gray-300 p-1.5 rounded-md max-h-32 overflow-y-auto">
          {/* ingredients */}
          {ingredients.map((ing) => {
            return (
              <SelectIng
                {...register('ingredientsIDs')}
                key={crypto.randomUUID()}
                inpValue={ing.id}
              >
                {ing.name}
              </SelectIng>
            )
          })}
        </div>
      </div>

      <button
        type="submit"
        className="w-fit h-fit p-1 px-2 bg-buttonBg rounded-full mt-6"
      >
        Cadastrar
      </button>
    </form>
  )
}
