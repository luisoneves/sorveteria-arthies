import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { loginSchema } from '@/lib/schemas';
import { validateMockPassword } from '@/lib/mock-users';
import { createUserToken, SESSION_COOKIE_OPTIONS } from '@/lib/auth/jwt';
import { authRateLimiter, getClientIp, setRateLimitHeaders } from '@/lib/rate-limit';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, remaining, resetAt } = authRateLimiter.check(ip);

  let response: NextResponse;

  if (!allowed) {
    response = NextResponse.json(
      { error: 'Muitas tentativas. Aguarde 15 minutos.' },
      { status: 429 }
    );
    return setRateLimitHeaders(response, remaining, resetAt);
  }

  // Modo mock - verificar credenciais locais
  if (USE_MOCK) {
    const body = await request.json();
    const { email, senha } = body;

    const user = validateMockPassword(email, senha);
    if (user) {
      const token = createUserToken({
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        pontos: user.pontos,
        telefone: user.telefone,
      });
      
      const cookieStore = await cookies();
      cookieStore.set('user', token, SESSION_COOKIE_OPTIONS);
      
      const userResponse = {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        pontos: user.pontos,
      };
      return NextResponse.json({ user: userResponse });
    }
      const errorResponse = NextResponse.json({ error: 'Email ou senha inválidos' }, { status: 401 });
    return setRateLimitHeaders(errorResponse, remaining, resetAt);
  }

  // Modo produção - usar Supabase
  try {
    const body = await request.json();
    
    // Validar input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      const errorResponse = NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
      return setRateLimitHeaders(errorResponse, remaining, resetAt);
    }

    const { email, senha } = result.data;

    // Buscar usuário pelo email
    const { data: users, error: userError } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('ativo', true)
      .single();

    if (userError || !users) {
      const errorResponse = NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
      return setRateLimitHeaders(errorResponse, remaining, resetAt);
    }

    // Verificar senha (em produção, usar bcrypt.compare)
    // Por agora, comparamos diretamente (MUDAR PARA bcrypt EM PRODUÇÃO!)
    const { data: authData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (signInError) {
      const errorResponse = NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
      return setRateLimitHeaders(errorResponse, remaining, resetAt);
    }

    // Preparar resposta do usuário (sem a senha)
    const userResponse = {
      id: users.id,
      email: users.email,
      nome: users.nome,
      role: users.role,
      pontos: users.pontos || 0,
      telefone: users.telefone,
      created_at: users.created_at,
    };

    // Criar token JWT assinado
    const token = createUserToken({
      id: users.id,
      email: users.email,
      nome: users.nome,
      role: users.role,
      pontos: users.pontos,
      telefone: users.telefone,
    });

    // Criar cookie de sessão com JWT
    const cookieStore = await cookies();
    cookieStore.set('user', token, SESSION_COOKIE_OPTIONS);

    const successResponse = NextResponse.json({ user: userResponse });
    return setRateLimitHeaders(successResponse, remaining, resetAt);
  } catch (error) {
    console.error('Login error:', error);
    const errorResponse = NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
    return setRateLimitHeaders(errorResponse, remaining, resetAt);
  }
}
