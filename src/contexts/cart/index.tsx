'use client'

import { createContext, useState } from 'react'

export type CartType = {
  order: {
    food: {
      name: string
      value: number
      amount: number
      image: string
    }
    drink: {
      name: string
      value: number
      image: string
      amount: number
    }
  }
}

type foodType = {
  name: string
  value: number
  amount: number
  image: string
}

type drinkType = {
  name: string
  value: number
  amount: number
  image: string
}

type CartContext = {
  foodUpdate: (food: foodType) => void
  drinkUpdate: (drink: drinkType) => void
  ClearStates: () => void
  food: foodType[]
  drink: drinkType[]
}

const CartContext = createContext<CartContext>({} as CartContext)

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [food, setFood] = useState<foodType[]>([])
  const [drink, setDrink] = useState<drinkType[]>([])

  const foodUpdate = (food: foodType) => {
    setFood((prev) => {
      const ns = [...prev, food]
      return ns
    })
    console.log(food)
  }
  const drinkUpdate = (drink: drinkType) => {
    setDrink((prev) => {
      const ns = [...prev, drink]
      return ns
    })
    console.log(food)
  }

  const ClearStates = () => {
    setDrink([])
    setFood([])
  }
  return (
    <CartContext.Provider
      value={{
        foodUpdate,
        drinkUpdate,
        food,
        drink,
        ClearStates,
      }}
    >
      <>{children}</>
    </CartContext.Provider>
  )
}

export { CartProvider, CartContext }
