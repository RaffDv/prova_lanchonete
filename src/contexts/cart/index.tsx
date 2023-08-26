'use client'
import { createContext, useState } from 'react'

type cartContextType = {
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

const CartContex = createContext<cartContextType>({} as cartContextType)

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, setCartState] = useState<cartContextType>({
    order: {
      drink: {
        amount: 0,
        name: '',
        value: 0,
      },
      food: {
        amount: 0,
        name: '',
        value: 0,
      },
    },
  })

  const updateFood = (food: foodType) => {
    const ns = { ...cartState }
    const nsF = ns.order.food
    // nsF = ns
  }

  return (
    <CartContex.Provider>
      <>{children}</>
    </CartContex.Provider>
  )
}

export { CartContex, CartProvider }
