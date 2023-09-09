'use client'
import { useRouter } from 'next/navigation'
import { IngredientType, newFoodSchema } from '@/schemas/global'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SelectIng } from '../SelectIng'
import { useEffect, useState } from 'react'
import api from '@/api'
export type newFoodType = z.infer<typeof newFoodSchema>

export default function FoodForm() {
  const [ingredients, setIngredients] = useState<IngredientType[]>([])
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<newFoodType>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(newFoodSchema),
    defaultValues: {
      description: '',
      image: undefined,
      ingredientsIDs: [],
      name: '',
    },
  })
  const { back } = useRouter()
  const getData = async () => {
    const r = await api.ingredient.get()
    if (r.success) {
      setIngredients(r.data.data)
    }
  }

  const handleFormSubmit = async (data: any) => {
    delete data.size
    // console.log(JSON.parse(data.image[0]))

    const formData = new FormData()
    formData.append('image', data.image[0])
    delete data.image
    formData.append('data', JSON.stringify(data))
    axios({
      method: 'post',
      url: 'http://localhost:4000/api/food/new',
      data: formData,
    })
      .then(function (response) {
        back()
      })
      .catch(function (response) {
        console.log(response)
      })
  }
  const sizes = watch('size')

  useEffect(() => {
    getData()
  }, [])

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`w-full flex flex-col relative items-center gap-2 `}
    >
      <span className="text-main text-xl ">Cadastrar novo item</span>
      <input
        placeholder="Nome do Produto"
        className="border rounded-full bg-inputBg p-2"
        type="text"
        {...register('name')}
      />
      <input
        id="chooseImage"
        className="hidden "
        type="file"
        {...register('image')}
        accept="image/*"
      />
      <label htmlFor="chooseImage" className={` underline `}>
        Escolher Imagem
      </label>

      <div className="flex gap-3">
        <div>
          <input
            className="border rounded-full bg-inputBg p-2"
            type="checkbox"
            value={'P'}
            id="sizeP"
            {...register('size')}
          />
          <label htmlFor="sizeP">P</label>
        </div>

        <div>
          <input
            className="border rounded-full bg-inputBg p-2"
            type="checkbox"
            value={'M'}
            id="sizeM"
            {...register('size')}
          />
          <label htmlFor="sizeM">M</label>
        </div>
        <div>
          <input
            className="border rounded-full bg-inputBg p-2"
            type="checkbox"
            value={'G'}
            id="sizeG"
            {...register('size')}
          />
          <label htmlFor="sizeG">G</label>
        </div>
      </div>
      {sizes && sizes.includes('P') && (
        <input
          placeholder={`Preço para P`}
          className="border rounded-full bg-inputBg p-2"
          type="number"
          {...register('valueP')}
        />
      )}
      {sizes && sizes?.includes('M') && (
        <input
          placeholder={`Preço para M`}
          className="border rounded-full bg-inputBg p-2"
          {...register('valueM')}
          type="number"
        />
      )}
      {sizes && sizes?.includes('G') && (
        <input
          placeholder={`Preço para G`}
          className="border rounded-full bg-inputBg p-2"
          {...register('valueG')}
          type="number"
        />
      )}
      <textarea
        placeholder="Descrição"
        className="border rounded-md w-full bg-inputBg p-2"
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
        className="p-2 bg-buttonBg border rounded-full font-semibold"
      >
        Cadastrar
      </button>
    </form>
  )
}
