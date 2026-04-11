import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { loginSchema } from '@/lib/schemas';
import { validateMockPassword } from '@/lib/mock-users';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function POST(request: Request) {
  // Modo mock - verificar credenciais locais
  if (USE_MOCK) {
    const body = await request.json();
    const { email, senha } = body;

    const user = validateMockPassword(email, senha);
    if (user) {
      const cookieStore = await cookies();
      cookieStore.set('user', JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return NextResponse.json({ user });
    }
    return NextResponse.json({ error: 'Email ou senha inválidos' }, { status: 401 });
  }

  // Modo produção - usar Supabase
  try {
    const body = await request.json();
    
    // Validar input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    // Verificar senha (em produção, usar bcrypt.compare)
    // Por agora, comparamos diretamente (MUDAR PARA bcrypt EM PRODUÇÃO!)
    const { data: authData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (signInError) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
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

    // Criar cookie de sessão
    const cookieStore = await cookies();
    cookieStore.set('user', JSON.stringify(userResponse), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    return NextResponse.json({
      user: userResponse,
      session: {
        access_token: authData.session?.access_token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
