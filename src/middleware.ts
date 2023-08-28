import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { jwtType } from './app/page'
import jwtDecode from 'jwt-decode'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (request.url.endsWith('/register')) {
    return NextResponse.next({
      headers: {
        'Set-Cookie': `route=/; Path=/API/user/; HttpOnly; max-age=60;`,
      },
    })
  }
  if (path.includes('/admin')) {
    if (cookies().has('token')) {
      const jwtData: jwtType = jwtDecode(
        atob(cookies().get('token')?.value as string),
      )

      if (jwtData.privileges === 10) {
        return NextResponse.next()
      }
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  // admin
  if (path.endsWith('/food/new')) {
    // pensar em como redirecionar sem ser adm
  }
}
export const config = {
  matcher: ['/API/user/:path*', '/user/:path*', '/admin/:path*'],
}
