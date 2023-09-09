'use server'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { jwtType } from './app/page'

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('nextjs')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

  request.cookies.has('nextjs') // => true
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') // => false

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  })
  cookie = response.cookies.get('vercel')
  console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header
  const path = request.nextUrl.pathname

  if (request.url.endsWith('/register')) {
    return NextResponse.next({
      headers: {
        'Set-Cookie': `route=/; Path=/API/user/; HttpOnly; max-age=60;`,
      },
    })
  }

  // admin
  if (path.includes('admin')) {
    console.log('admin midd')

    const token = request.cookies.get('token')?.value

    if (token) {
      const decoded = jwtDecode<jwtType>(atob(token))

      if (decoded.privileges === 10) {
        return NextResponse.next()
      }
    }
    return NextResponse.redirect(new URL('/', request.url))
  }
}
export const config = {
  matcher: ['/API/user/:path*', '/user/:path*', '/admin/:path*'],
}
