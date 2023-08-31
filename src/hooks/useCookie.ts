import { cookies } from 'next/headers'

export function useCookie(cookieName: string) {
  const cookie = cookies()
  if (cookie.has(cookieName)) {
    return cookie.get(cookieName)?.value
  }
  return false
}
