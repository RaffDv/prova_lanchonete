'use client'
import Modal from '@/components/Modal'
import { newFoodSchema } from '@/schemas/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type newFoodType = z.infer<typeof newFoodSchema>

export default function Form() {
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

  console.log(errors)

  const handleFormSubmit = (data: newFoodType) => {
    console.log(data)
  }
  const sizes = watch('size')

  return (
    <Modal>
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
        />
        <label htmlFor="chooseImage" className={`text-font text-lg underline `}>
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
            key={crypto.randomUUID()}
            placeholder={`Preço para P`}
            className="border rounded-full bg-inputBg p-2"
            type="number"
            {...register('valueP')}
          />
        )}
        {sizes?.includes('M') && (
          <input
            key={crypto.randomUUID()}
            placeholder={`Preço para M`}
            className="border rounded-full bg-inputBg p-2"
            {...register('valueM')}
            type="number"
          />
        )}
        {sizes?.includes('G') && (
          <input
            key={crypto.randomUUID()}
            placeholder={`Preço para G`}
            className="border rounded-full bg-inputBg p-2"
            {...register('valueG')}
            type="number"
          />
        )}
        <input
          className="border rounded-full bg-inputBg p-2"
          type="text"
          {...register('description')}
        />
        <input
          className="border rounded-full bg-inputBg p-2"
          type="text"
          {...register('ingredients')}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </Modal>
  )
}
