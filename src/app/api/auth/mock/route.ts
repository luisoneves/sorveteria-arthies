import { NextRequest, NextResponse } from 'next/server';
import { mockUsers, validateMockPassword, getMockUserByEmail } from '@/lib/mock-users';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function POST(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Rota de login
  if (url === '/api/auth/login') {
    const { email, senha } = await request.json();

    if (USE_MOCK) {
      const user = validateMockPassword(email, senha);
      if (user) {
        return NextResponse.json({
          user: {
            id: user.id,
            email: user.email,
            nome: user.nome,
            role: user.role,
            pontos: user.pontos,
          },
        });
      }
      return NextResponse.json({ error: 'Email ou senha inválidos' }, { status: 401 });
    }

    // Se não está em modo mock, retorna erro indicando necessidade de Supabase
    return NextResponse.json({ 
      error: 'Sistema em modo de desenvolvimento. Configure NEXT_PUBLIC_USE_MOCK=true para testar.' 
    }, { status: 503 });
  }

  // Rota de registro
  if (url === '/api/auth/register') {
    const { email, nome, senha, role } = await request.json();

    if (USE_MOCK) {
      const existing = getMockUserByEmail(email);
      if (existing) {
        return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
      }

      const newUser = {
        id: String(mockUsers.length + 1),
        email,
        nome,
        role: role || 'cliente',
        pontos: 0,
        telefone: '',
      };

      return NextResponse.json({ user: newUser });
    }

    return NextResponse.json({ 
      error: 'Sistema em modo de desenvolvimento. Configure NEXT_PUBLIC_USE_MOCK=true para testar.' 
    }, { status: 503 });
  }

  return NextResponse.json({ error: 'Rota não encontrada' }, { status: 404 });
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Rota para verificar sessão
  if (url === '/api/auth/me') {
    const userCookie = request.cookies.get('user');

    if (!userCookie) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    try {
      const user = JSON.parse(userCookie.value);
      return NextResponse.json({ user });
    } catch {
      return NextResponse.json({ error: 'Sessão inválida' }, { status: 401 });
    }
  }

  return NextResponse.json({ error: 'Rota não encontrada' }, { status: 404 });
}
