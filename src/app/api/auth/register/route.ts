import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { registerSchema } from '@/lib/schemas';
import { mockUsers, getMockUserByEmail } from '@/lib/mock-users';
import { createUserToken, SESSION_COOKIE_OPTIONS } from '@/lib/auth/jwt';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function POST(request: Request) {
  // Modo mock
  if (USE_MOCK) {
    const body = await request.json();
    const { nome, email, senha, telefone } = body;

    const existing = getMockUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 409 });
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      nome,
      role: 'cliente',
      pontos: 0,
      telefone: telefone || '',
    };

    const token = createUserToken({
      id: newUser.id,
      email: newUser.email,
      nome: newUser.nome,
      role: newUser.role,
      pontos: newUser.pontos,
      telefone: newUser.telefone,
    });

    const cookieStore = await cookies();
    cookieStore.set('user', token, SESSION_COOKIE_OPTIONS);

    return NextResponse.json({ user: newUser });
  }

  // Modo produção (Supabase)
  try {
    const body = await request.json();
    
    // Validar input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { nome, email, senha, telefone } = result.data;

    // Verificar se email já existe
    const { data: existingUser } = await supabaseAdmin
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 409 }
      );
    }

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email,
      password: senha,
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    // Criar usuário na tabela usuarios
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('usuarios')
      .insert({
        id: authData.user!.id,
        email,
        nome,
        telefone: telefone || null,
        role: 'cliente',
        pontos: 0,
        ativo: true,
      })
      .select()
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      return NextResponse.json(
        { error: 'Erro ao criar usuário' },
        { status: 500 }
      );
    }

    // Preparar resposta
    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      nome: newUser.nome,
      role: newUser.role,
      pontos: newUser.pontos || 0,
      telefone: newUser.telefone,
      created_at: newUser.created_at,
    };

    // Criar token JWT assinado
    const token = createUserToken({
      id: newUser.id,
      email: newUser.email,
      nome: newUser.nome,
      role: newUser.role,
      pontos: newUser.pontos,
      telefone: newUser.telefone,
    });

    // Criar cookie de sessão com JWT
    const cookieStore = await cookies();
    cookieStore.set('user', token, SESSION_COOKIE_OPTIONS);

    return NextResponse.json({
      user: userResponse,
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
