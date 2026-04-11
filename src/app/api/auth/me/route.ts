import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

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

    // Obter dados frescos do banco
    const userData = JSON.parse(userCookie.value);
    
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
