import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { UserRole } from '@/types';

const PUBLIC_ROUTES = ['/', '/shop', '/login', '/register', '/forgot-password', '/sobre', '/promocoes', '/api/auth', '/api/public'];
const ROLE_ROUTES: Record<string, UserRole[]> = {
  '/admin': ['admin'],
  '/gerente': ['admin', 'gerente'],
  '/vendedor': ['admin', 'gerente', 'vendedor'],
  '/cliente': ['cliente'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Rotas de API públicas
  if (pathname.startsWith('/api/public')) {
    return NextResponse.next();
  }

  // Verificar autenticação (via cookie ou header)
  const userCookie = request.cookies.get('user');
  const authHeader = request.headers.get('authorization');

  if (!userCookie && !authHeader) {
    // Não está logado, redirecionar para login
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verificar role para rotas protegidas
  for (const [route, allowedRoles] of Object.entries(ROLE_ROUTES)) {
    if (pathname.startsWith(route)) {
      const userRole = getUserRole(request);
      
      if (!userRole || !allowedRoles.includes(userRole)) {
        if (pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Sem permissão para acessar este recurso' },
            { status: 403 }
          );
        }
        // Redirecionar para página inicial do role
        const redirectUrl = getRedirectUrl(userRole);
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
    }
  }

  return NextResponse.next();
}

function getUserRole(request: NextRequest): UserRole | null {
  const userCookie = request.cookies.get('user');
  
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie.value);
      return user.role as UserRole;
    } catch {
      return null;
    }
  }
  
  return null;
}

function getRedirectUrl(role: UserRole | null): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'gerente':
      return '/gerente/dashboard';
    case 'vendedor':
      return '/vendedor/pdv';
    case 'cliente':
      return '/cliente/shop';
    default:
      return '/login';
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
