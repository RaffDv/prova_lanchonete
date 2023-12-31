import { z } from 'zod'

export const AccountSchema = z.object({
  account: z
    .object({
      user: z.string().min(3, 'Informe um nome com pelo menos 3 caracteres '),
      email: z.string().email('Informe um email válido'),
      pass: z.string().min(8, 'Informe uma senha de pelo menos 8 caracteres'),
      passConf: z
        .string()
        .min(8, 'Informe uma senha de pelo menos 8 caracteres')
        .optional(),
    })

    .refine(({ pass, passConf }) => pass === passConf, {
      message: 'As senhas não coincidem',
      path: ['passConf'],
    }),
  address: z.object({
    country: z.string().min(1, 'Informe um país válido'),
    state: z.string().min(1, 'Informe um estado válido'),
    city: z.string().min(1, 'Informe uma cidade válida'),
    district: z.string().min(1, 'Informe um bairro válido'),
    street: z.string().min(1, 'Informe uma rua válida '),
    num: z.string().min(1, 'Num inválido'),
  }),
})

const newUserSchema = z.object({
  account: z.object({
    user: z.string().min(3, 'Informe um nome com pelo menos 3 caracteres '),
    email: z.string().email('Informe um email válido'),
    pass: z.string().min(8, 'Informe uma senha de pelo menos 8 caracteres'),
  }),
  address: z.object({
    country: z.string().min(1, 'Informe um país válido'),
    state: z.string().min(1, 'Informe um estado válido'),
    city: z.string().min(1, 'Informe uma cidade válida'),
    district: z.string().min(1, 'Informe um bairro válido'),
    street: z.string().min(1, 'Informe uma rua válida '),
    num: z.string().min(1, 'Num inválido'),
  }),
})

export const loginUserSchema = z.object({
  email: z.string().email('Informe um email válido'),
  pass: z.string().min(8, 'Informe uma senha de pelo menos 8 caracteres'),
})

export const JwtSchema = z.object({
  exp: z.number(),
  user: z.string(),
  email: z.string(),
  privileges: z.number(),
})

export const foodSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Este campo é obrigatório'),
  description: z.string().min(1, 'Este campo é obrigatório'),
  image: z.string(),
  valueP: z.string().optional(),
  valueM: z.string().optional(),
  valueG: z.string().optional(),
  ingredients: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .array()
    .optional(),
})
export type foodType = z.infer<typeof foodSchema>

export const newDrinkSchema = z.object({
  name: z.string().min(2, 'Nome da bebida precisa ter mais que duas letras'),
  description: z.string(),
  image: z.any(),
  value: z.string(),
  ingredientsIDs: z.string().array(),
})

export const UpdateDrinkSchema = z.object({
  name: z.string().min(1, 'Este campo é obrigatório'),
  description: z.string().min(1, 'Este campo é obrigatório'),
  image: z.any(),
  value: z.string(),
  ingredientsIDs: z.string().array(),
})
export type UpdateDrinkType = z.infer<typeof UpdateDrinkSchema>

export const drinkSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Este campo é obrigatório'),
  description: z.string().min(1, 'Este campo é obrigatório'),
  image: z.string(),
  value: z.string(),
  ingredients: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .array()
    .optional(),
})

export type drinkType = z.infer<typeof drinkSchema>

export type newUserType = z.infer<typeof newUserSchema>
export const userSchema = z.object({
  id: z.number(),
  user: z.string(),
  email: z.string(),
  pass: z.string(),
  privileges: z.number(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  district: z.string(),
  street: z.string(),
  num: z.number(),
})
export type userType = z.infer<typeof userSchema>

export const addressSchema = z.object({
  country: z.string(),
  state: z.string(),
  city: z.string(),
  district: z.string(),
  street: z.string(),
  num: z.string(),
})
export type addressType = z.infer<typeof addressSchema>

export const UpdateFoodSchema = z.object({
  name: z.string().min(1, 'Insira um nome válido'),
  image: z.any(),
  description: z.string(),
  ingredientsIDs: z.string().array().optional(),
  valueP: z.string().optional(),
  valueM: z.string().optional(),
  valueG: z.string().optional(),
})

export type UpdateFoodType = z.infer<typeof UpdateFoodSchema>

export const IngredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.string(),
})
export type IngredientType = z.infer<typeof IngredientSchema>

const newIngredientSchema = z.object({
  name: z.string(),
  amount: z.number(),
})

export type newIngredientType = z.infer<typeof newIngredientSchema>

export const OrderSchema = z.object({
  foods: z.array(
    z.object({
      orderID: z.number(),
      value: z.number(),
      food: z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        valueP: z.string().optional(),
        valueM: z.string().optional(),
        valueG: z.string().optional(),
      }),
    }),
  ),
  drinks: z.array(
    z.object({
      orderID: z.number(),
      value: z.number(),
      drink: z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        value: z.string(),
      }),
    }),
  ),
})
export const newFoodSchema = z.object({
  name: z.string().min(1, 'Este campo é obrigatório'),
  description: z.string().min(1, 'Este campo é obrigatório'),
  ingredientsIDs: z.string().array(),
  image: z.any(),
  size: z.string().array().optional(),
  valueP: z.string().optional(),
  valueM: z.string().optional(),
  valueG: z.string().optional(),
})

export type OrderType = z.infer<typeof OrderSchema>

export const NewOrderSchema = z.object({
  user_email: z.string().email(),
  id_food: z.number().optional(),
  id_drink: z.number().optional(),
  value: z.number(),
})

export type NewOrderType = z.infer<typeof NewOrderSchema>
//  ZUSTEND USER STORE TYPES
export type AuthUserType = {
  email: string
  pass: string
  privileges: number
  token: string
}

export type ActionsProps = {
  login: (user: AuthUserType) => void
  logout: () => void
  reset: () => void
  isAdmin: () => boolean
  getToken: () => string
}

export type StoreProps = {
  state: {
    user: AuthUserType | null
  }
  actions: ActionsProps
}
