'use client'
import api from '@/api'
import { UpdateFoodSchema, UpdateFoodType, foodType } from '@/schemas/global'
import { ArrowLeft, TrashSimple } from '@phosphor-icons/react'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SelectIng } from '../SelectIng'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Triangle } from 'react-loader-spinner'
import axios from 'axios'

export default function PageEdit({ id }: { id: string }) {
  const [data, setData] = useState<foodType>({} as foodType)

  const { push, back } = useRouter()
  const getData = async () => {
    const r = await api.food.unique(Number(id))
    if (r.success) {
      setData(r.data.data)
    }
  }

  const submit = (data: UpdateFoodType) => {
    console.log(data.image)

    const formData = new FormData()
    formData.append('image', data.image[0])
    delete data.image
    formData.append('data', JSON.stringify(data))

    // axios({
    //   method: 'post',
    //   url: 'http://localhost:4000/api/food/new',
    //   data: formData,
    // })
    //   .then(function (response) {
    //     back()
    //   })
    //   .catch(function (response) {
    //     console.log(response)
    //   })
  }

  useEffect(() => {
    getData()
  }, [])
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<UpdateFoodType>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(UpdateFoodSchema),
    defaultValues: {
      image: '',
      ingredientsIDs: [],
    },
  })
  console.log(errors)
  const hasNewImage = watch('image').length > 0
  const image = watch('image')[0]
  console.log(hasNewImage)

  return (
    <>
      {data.id ? (
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col h-screen w-screen box-border m-0 p-0"
        >
          <div
            className={`relative flex w-full h-44 justify-start items-start aspect-video`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="foodImageIdEdit"
              {...register('image')}
            />
            <label
              htmlFor="foodImageIdEdit"
              className="w-full h-full z-10 "
            ></label>
            {hasNewImage ? (
              <Image
                alt="new image preview"
                src={URL.createObjectURL(image)}
                fill
                className="-z-10"
              />
            ) : (
              <Image alt="image" src={data.image} fill className="-z-10" />
            )}

            <span
              onClick={() => back()}
              className="w-6 z-20 h-6 absolute top-1 left-1 bg-slate-300 rounded-md flex items-center justify-center m-2 font-bold "
            >
              <ArrowLeft size={20} weight="bold" />{' '}
            </span>
          </div>
          <div className="flex flex-col gap-y-3 m-3 mt-6 relative">
            <input
              defaultValue={data.name}
              type="text"
              {...register('name')}
              className="text-black font-bold text-2xl leading-4 border-b border border-transparent border-b-black rounded-none focus:border focus:border-black transition-all focus:rounded outline-none w-3/4"
            />
            <span
              onClick={() => back()}
              className="w-fit z-20 h-fit absolute top-1 right-1 rounded-md m-0  flex items-center justify-center "
            >
              <TrashSimple size={24} color="#d60000" weight="bold" />
            </span>
            <div>
              <span className="text-xs text-font font-light leading-relaxed">
                Clique nos ingredientes que você deseja retirar deste prato
              </span>
              <div className="flex justify-evenly flex-wrap gap-y-1.5 border border-gray-300 p-1.5 rounded-md max-h-32 overflow-y-auto">
                {/* ingredients */}
                <SelectIng inpValue="1" req {...register('ingredientsIDs')}>
                  ingredient
                </SelectIng>
              </div>
            </div>
          </div>
          <div className="flex m-3 flex-col justify-center mt-2 w-full text-xs font-bold text-font  gap-2 mb-12">
            <p>Tamanho:</p>

            <div className="flex text-xs">
              <input type="radio" name="tamanho" id="tamP" />
              <label htmlFor="tamP" className="ml-1 flex gap-2">
                P - R${' '}
                <input
                  {...register('valueP')}
                  defaultValue={data.valueP}
                  type="text"
                  className="border-b border-b-black outline-none"
                  onClick={(e) => {
                    e.currentTarget.value = ''
                  }}
                />
              </label>
            </div>

            <div className="flex text-xs ">
              <input type="radio" name="tamanho" id="tamM" />
              <label htmlFor="tamM" className="ml-1 flex gap-2">
                M - R${' '}
                <input
                  {...register('valueM')}
                  type="text"
                  className="border-b border-b-black outline-none"
                  defaultValue={data.valueM}
                  onClick={(e) => {
                    e.currentTarget.value = ''
                  }}
                />
              </label>
            </div>

            <div className="flex text-xs ">
              <input type="radio" name="tamanho" id="tamG" />
              <label htmlFor="tamG" className="ml-1 flex gap-2">
                G - R${' '}
                <input
                  {...register('valueG')}
                  defaultValue={data.valueG}
                  type="text"
                  className="border-b border-b-black outline-none"
                  onClick={(e) => {
                    e.currentTarget.value = ''
                  }}
                />
              </label>
            </div>

            {/* <div className="flex text-xs">
              <input type="radio" name="tamanho" id="drinkV" />
              <label htmlFor="drinkV" className="ml-1">
                R$ value
              </label>
            </div> */}

            {/* Fim tamanho */}
            {/* Inicio botões */}
            <div className="absolute flex justify-evenly w-full my-4 bottom-2">
              <button
                onClick={() => {
                  back()
                }}
                type="reset"
                className="bg-red-300 border border-red-600  relative w-32 h-6 flex justify-center items-center text-xs font-bold rounded-lg"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-buttonBg/70 border-blue-600 border  relative w-32 h-6 flex justify-center items-center text-xs font-bold rounded-lg"
              >
                Salvar
              </button>
            </div>
            {/* Fim botões */}
          </div>
        </form>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Triangle visible height={100} width={100} color="#0089D7" />
        </div>
      )}
    </>
  )
}
