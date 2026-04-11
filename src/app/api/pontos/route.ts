import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { FIDELIDADE } from '@/lib/constants';

export const dynamic = 'force-dynamic';

async function getUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  if (!userCookie) return null;
  try {
    return JSON.parse(userCookie.value);
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Buscar pontos do usuário
    const { data: usuario, error: userError } = await supabaseAdmin
      .from('usuarios')
      .select('pontos')
      .eq('id', user.id)
      .single();

    if (userError || !usuario) {
      return NextResponse.json(
        { error: 'Erro ao buscar pontos' },
        { status: 500 }
      );
    }

    // Buscar histórico de transações
    const { data: transacoes, error: transError } = await supabaseAdmin
      .from('transacoes_pontos')
      .select('*')
      .eq('cliente_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (transError) {
      console.error('Transações error:', transError);
    }

    const pontos = usuario.pontos || 0;
    const bonusDisponiveis = Math.floor(pontos / FIDELIDADE.PONTOS_PARA_BONUS);

    return NextResponse.json({
      pontos,
      bonusDisponiveis,
      valorBonus: bonusDisponiveis * FIDELIDADE.VALOR_BONUS,
      faltaParaBonus: FIDELIDADE.PONTOS_PARA_BONUS - (pontos % FIDELIDADE.PONTOS_PARA_BONUS),
      transacoes: transacoes || [],
      regras: {
        pontosPorReal: FIDELIDADE.PONTOS_POR_REAL,
        pontosParaBonus: FIDELIDADE.PONTOS_PARA_BONUS,
        valorBonus: FIDELIDADE.VALOR_BONUS,
      },
    });
  } catch (error) {
    console.error('Pontos GET error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
