'use client'
import api from '@/api'
import { UpdateFoodSchema, UpdateFoodType, foodType } from '@/schemas/global'
import { ArrowLeft } from '@phosphor-icons/react'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SelectIng from '../SelectIng'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function PageEdit({ id }: { id: string }) {
  const [data, setData] = useState<foodType>({} as foodType)

  const { push, back } = useRouter()
  const getData = async () => {
    const r = await api.food.unique(Number(id))
    if (r.success) {
      setData(r.data.data)
    }
  }

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
      name: data.name,
      valueG: '',
      valueM: '',
      valueP: '',
    },
  })

  const submit = (data: UpdateFoodType) => {
    console.log('submit')

    console.log(data)
  }
  console.log(errors)

  useEffect(() => {
    getData()
  }, [])

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col h-screen w-screen box-border m-0 p-0"
    >
      <div className={`relative flex w-full h-44 justify-start items-start  `}>
        <div
          className=" bg-no-repeat bg-cover bg-center w-full h-44 bg-gray-600"
          style={{ backgroundImage: `url(${data.image})` }}
        ></div>
        <button
          onClick={() => back()}
          className="w-6 z-20 h-6 absolute top-1 left-1 bg-slate-300 flex items-center justify-center m-2 font-bold "
        >
          {' '}
          <ArrowLeft size={20} weight="bold" />{' '}
        </button>
      </div>
      <div className="flex flex-col space-y-6 m-3 mt-6">
        <input
          type="text"
          {...register('name')}
          className="text-black font-bold text-2xl leading-4"
        />
        <span className="text-xs text-font font-light leading-relaxed">
          Clique nos ingredientes que você deseja retirar deste prato
        </span>
        <div className="flex justify-evenly flex-wrap gap-y-1.5 border border-gray-300 p-1.5 rounded-md gap-x-0 max-h-32 overflow-y-auto">
          {' '}
          {/* ingredients */}
          <SelectIng
            ident={crypto.randomUUID()}
            inpValue="1"
            req
            name="ingredientsIDs"
            register={register}
          >
            ingredient
          </SelectIng>
        </div>
      </div>
      <div className="flex m-3 flex-col justify-center mt-2 w-full text-xs font-bold text-font  gap-2 mb-12">
        <p>Tamanho:</p>
        {data.valueP && (
          <div className="flex text-xs">
            <input type="radio" name="tamanho" id="tamP" />
            <label htmlFor="tamP" className="ml-1">
              P - R$ {data.valueP},00
            </label>
          </div>
        )}
        {data.valueM && (
          <div className="flex text-xs">
            <input type="radio" name="tamanho" id="tamM" />
            <label htmlFor="tamM" className="ml-1">
              M - R$ {data.valueM},00
            </label>
          </div>
        )}
        {data.valueG && (
          <div className="flex text-xs">
            <input type="radio" name="tamanho" id="tamG" />
            <label htmlFor="tamG" className="ml-1">
              G - R$ {data.valueG},00
            </label>
          </div>
        )}

        <div className="flex text-xs">
          <input type="radio" name="tamanho" id="drinkV" />
          <label htmlFor="drinkV" className="ml-1">
            R$ value
          </label>
        </div>

        {/* Fim tamanho */}
        {/* Inicio botões */}
        <div className="absolute flex justify-evenly w-full my-4 bottom-2">
          <button
            type="reset"
            className="bg-red-300 border border-red-600  relative w-32 h-6 flex justify-center items-center text-xs font-bold rounded-lg"
          >
            Excluir
          </button>

          <button
            type="submit"
            className="bg-buttonBg  relative w-32 h-6 flex justify-center items-center text-xs font-bold rounded-lg"
          >
            Salvar
          </button>
        </div>
        {/* Fim botões */}
      </div>
    </form>
  )
}
