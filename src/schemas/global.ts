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

export type newUserType = z.infer<typeof newUserSchema>
export type AuthUserType = {
  email: string
  pass: string
}
