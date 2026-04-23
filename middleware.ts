import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const user = process.env.PREVIEW_USER
  const pass = process.env.PREVIEW_PASS

  if (!user || !pass) return NextResponse.next()

  const auth = req.headers.get('authorization')
  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString()
      const colon = decoded.indexOf(':')
      const u = decoded.slice(0, colon)
      const p = decoded.slice(colon + 1)
      if (u === user && p === pass) return NextResponse.next()
    }
  }

  return new NextResponse('Unauthorised', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Idle Hands Preview"' },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
