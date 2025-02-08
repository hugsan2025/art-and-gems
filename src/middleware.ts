import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar se é uma rota admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Não aplicar middleware na página de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Verificar se está autenticado
    const isAuthenticated = request.cookies.get('admin_token')
    
    if (!isAuthenticated) {
      // Redirecionar para login se não estiver autenticado
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 