'use client'
import { useRouter } from 'next/navigation'
import { newFoodSchema } from '@/schemas/global'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback, useState } from 'react'
export type newFoodType = z.infer<typeof newFoodSchema>

export default function FoodForm() {
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
      ingredients: '',
      name: '',
    },
  })
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
      {sizes?.includes('P') && (
        <input
          placeholder={`Preço para P`}
          className="border rounded-full bg-inputBg p-2"
          type="number"
          {...register('valueP')}
        />
      )}
      {sizes?.includes('M') && (
        <input
          placeholder={`Preço para M`}
          className="border rounded-full bg-inputBg p-2"
          {...register('valueM')}
          type="number"
        />
      )}
      {sizes?.includes('G') && (
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
      <textarea
        placeholder="ingredientes"
        className="border rounded-md h-32 w-full displa bg-inputBg p-2"
        {...register('ingredients')}
      />

      <button
        type="submit"
        className="p-2 bg-buttonBg border rounded-full font-semibold"
      >
        Cadastrar
      </button>
    </form>
  )
}
