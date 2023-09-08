import jwtDecode from 'jwt-decode'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtType } from './app/page'

export function middleware(request: NextRequest) {
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
