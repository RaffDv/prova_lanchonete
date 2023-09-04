import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
  if (path.endsWith('/food/new')) {
    // pensar em como redirecionar sem ser adm
  }
}
export const config = {
  matcher: ['/API/user/:path*', '/user/:path*', '/admin/:path*'],
}
