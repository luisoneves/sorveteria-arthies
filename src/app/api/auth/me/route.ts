import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyUserToken } from '@/lib/auth/jwt';

export const dynamic = 'force-dynamic';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Verificar token JWT
    const userData = verifyUserToken(userCookie.value);
    
    if (!userData) {
      // Token inválido ou expirado
      cookieStore.delete('user');
      return NextResponse.json(
        { error: 'Sessão expirada ou inválida' },
        { status: 401 }
      );
    }

    // Modo mock - retornar dados do token sem consultar banco
    if (USE_MOCK) {
      return NextResponse.json({
        user: {
          id: userData.id,
          email: userData.email,
          nome: userData.nome,
          role: userData.role,
          pontos: userData.pontos || 0,
          telefone: userData.telefone,
        },
      });
    }

    // Modo Supabase - obter dados frescos do banco
    const { data: user, error } = await supabaseAdmin
      .from('usuarios')
      .select('id, email, nome, role, pontos, telefone, created_at')
      .eq('id', userData.id)
      .eq('ativo', true)
      .single();

    if (error || !user) {
      // Limpar cookie inválido
      cookieStore.delete('user');
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
        pontos: user.pontos || 0,
        telefone: user.telefone,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
