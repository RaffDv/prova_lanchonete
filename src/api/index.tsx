/**
 * owner: raff.dv                  |  github.com/raffdv
 *
 * 2023.08.11 - Brasil, RS, Feliz - 10:50 PM
 * ♪ Focus -> Dados | raff and mai playlist
 *
 * Meu sincero respeito e admiração ao William Pilger ( github.com/williampilger )
 * Que me forneceu a base deste arquivo
 *
 * OBS: This file is modified and refactored by RaffDv
 */

import { newFoodType } from '@/components/NewFoodForm'
import {
  AuthUserType,
  IngredientType,
  addressType,
  drinkType,
  foodType,
  newIngredientType,
  newUserType,
  userType,
} from '@/schemas/global'
import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: `http://localhost:4000/api`,
})

/**
 * Requisição simples, sem tratamento.
 * @param endpoint
 * @param params
 * @returns Fetch
 */
const simpleBasicFetch = async (
  endpoint: string,
  params: string,
  headers: object,
) => {
  let str = `/${endpoint}`
  if (params !== '') {
    str = `${str}?${params}`
  }

  return await api.get(str, {
    headers,
  })
}

type resultType<T> = {
  conex: boolean
  reqStat: number
  success: boolean
  data: T
  msg: string
  auth: string
}

const basicFetch = async (
  method: string,
  endpoint: string,
  params: object,
  headers: object,
  alertConex?: boolean,
  alertError?: boolean,
): Promise<resultType<any>> => {
  const result = {
    conex: true, // só fica em false quando cai no catch ou não responde nada
    reqStat: 0,
    success: false, // Setado em true quando tudo dá certo e status de retorno é 10
    data: false, // Conteúdo JSON recebido do servidor
    msg: '', // Inserido no Front -> Codigo de status que diz o que será carregado pra lá.
    auth: '',
  }
  try {
    let r: any = false
    try {
      r =
        method === 'POST'
          ? await api.post(`/${endpoint}`, buildParamString(params), {
              validateStatus: function (status) {
                return true
              },
              headers,
            })
          : method === 'GET'
          ? await simpleBasicFetch(endpoint, buildParamString(params), headers)
          : false
    } catch (e: any) {
      r = e.response
    }
    console.log('API_R: ', r)
    if (r) {
      result.reqStat = r.status
      result.success = r.status === 200 || r.status === 201

      result.auth = r.headers
        ? r.headers.authorization
        : r.headers.authorization
      if (r.data) result.data = r.data
      const msg = typeof r.data.msg === 'undefined' ? '' : r.data.msg // `stat_${r.status}`;
      if (msg) result.msg = msg
      else result.msg = 'error'
    } else {
      result.conex = false
      result.msg = 'not connection'
    }
  } catch (e) {
    console.log('AXIOS ERR: ', e)
    result.conex = false
    result.msg = 'axios error'
  }
  if (alertError && result.conex && !result.success) alert(result.msg)

  // console.log('API_RESPONSE: ', result);
  return result
}

/**
 * Montar string de parâmetros para URL.
 * @param params JSON com parâmetros para enviar.
 * @returns Parametros no formato para URL.
 */
const buildParamString = (params: any) => {
  let str = ''
  // eslint-disable-next-line array-callback-return
  Object.keys(params).map((key) => {
    let value = params[key]
    if (Array.isArray(value)) {
      value = JSON.stringify(value)
    } else if (value && typeof value === 'object') {
      // value = value.toString();
      if (Object.keys(value).length > 0) {
        let micstr = '['
        // eslint-disable-next-line array-callback-return
        Object.keys(value).map((item) => {
          micstr = `${micstr}"${item}"="${value[item]}",`
        })
        micstr = micstr.slice(0, -1) // remove o último ',';
        value = micstr + ']'
      }
    }

    str = `${str}${key}=${value}&`
  })
  str = str.slice(0, -1) // remove o último '&'
  return str
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  general: {},
  food: {
    get: async (): Promise<resultType<{ data: foodType[]; msg?: string }>> => {
      return await basicFetch('GET', 'food/', {}, {})
    },
    unique: async (id: number): Promise<resultType<{ data: foodType }>> => {
      return await basicFetch('GET', `food/${id}`, {}, {})
    },
  },
  drink: {
    get: async (): Promise<resultType<{ data: drinkType[]; msg?: string }>> => {
      return await basicFetch('GET', 'drink/', {}, {})
    },
    unique: async (id: number): Promise<resultType<{ data: drinkType }>> => {
      return await basicFetch('GET', `drink/${id}`, {}, {})
    },
  },
  ingredient: {
    get: async (): Promise<
      resultType<{ data: IngredientType[]; msg?: string }>
    > => {
      return await basicFetch('GET', 'ingredient/', {}, {})
    },
    new: async (
      ingredient: newIngredientType,
    ): Promise<resultType<{ succes: boolean }>> => {
      return await basicFetch(
        'POST',
        'ingredient/new',
        { data: JSON.stringify(ingredient) },
        {},
      )
    },
  },
  user: {
    login: async ({
      email,
      pass,
    }: {
      email: string
      pass: string
    }): Promise<resultType<{ token: string }>> => {
      return await basicFetch(
        'POST',
        'user/login',
        {
          data: JSON.stringify({ email, pass }),
        },
        {},
      )
    },
    new: async ({
      account,
      address,
    }: newUserType): Promise<resultType<{ success: boolean }>> => {
      console.log(account)

      return await basicFetch(
        'POST',
        'user/new',
        {
          account: JSON.stringify(account),
          address: JSON.stringify(address),
        },
        {},
      )
    },
    address: async (): Promise<
      resultType<{ data: addressType; msg?: string }>
    > => {
      return await basicFetch('GET', 'user/address', {}, {})
    },
    unique: async ({
      email,
    }: {
      email: string
    }): Promise<resultType<{ data: userType; msg?: string }>> => {
      return await basicFetch('GET', `user/`, { email }, {})
    },
  },
}
