'use client'

import { createContext, useContext, useState } from 'react'

export type CartType = {
  order: {
    food: {
      name: string
      value: number
      amount: number
    }
    drink: {
      name: string
      value: number
      amount: number
    }
  }
}

type foodType = {
  name: string
  value: number
  amount: number
}

type drinkType = {
  name: string
  value: number
  amount: number
}

type CartContext = {
  foodUpdate: (food: foodType) => void
  drinkUpdate: (drink: drinkType) => void
}

const cartContext = createContext<CartContext>({} as CartContext)

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [food, setFood] = useState<foodType | null>({
    name: '',
    value: 0,
    amount: 0,
  })
  const [drink, setDrink] = useState<drinkType | null>({
    name: '',
    value: 0,
    amount: 0,
  })

  const foodUpdate = (food: foodType) => {
    setFood(food)
    console.log(food)
  }
  const drinkUpdate = (drink: drinkType) => {
    setDrink(drink)
    console.log(drink)
  }
  return (
    <cartContext.Provider
      value={{
        foodUpdate,
        drinkUpdate,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(cartContext)
  return context
}

export { CartProvider, useAuth }
