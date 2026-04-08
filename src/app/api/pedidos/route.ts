import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { pedidoSchema } from '@/lib/schemas';
import type { UserRole } from '@/types';
import { FIDELIDADE } from '@/lib/constants';

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

async function getUserRole(): Promise<UserRole | null> {
  const user = await getUser();
  return user?.role || null;
}

export async function GET(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const cliente_id = searchParams.get('cliente_id');

    let query = supabaseAdmin
      .from('pedidos')
      .select(`
        *,
        itens:itens_pedido(
          *,
          produto:produtos(nome)
        )
      `)
      .order('created_at', { ascending: false });

    // Clientes só veem seus próprios pedidos
    if (user.role === 'cliente') {
      query = query.eq('cliente_id', user.id);
    } else if (cliente_id) {
      query = query.eq('cliente_id', cliente_id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: pedidos, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar pedidos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ pedidos });
  } catch (error) {
    console.error('Pedidos GET error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validar input
    const result = pedidoSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { itens, pontos_usados } = result.data;

    // Calcular total
    const total = itens.reduce((sum, item) => {
      const desconto = item.desconto || 0;
      return sum + (item.preco_unitario - desconto) * item.quantidade;
    }, 0);

    // Calcular pontos ganhos
    const pontos_ganhos = Math.floor(total * FIDELIDADE.PONTOS_POR_REAL);

    // Criar pedido
    const { data: pedido, error: pedidoError } = await supabaseAdmin
      .from('pedidos')
      .insert({
        cliente_id: user.role === 'cliente' ? user.id : body.cliente_id,
        vendedor_id: user.role === 'vendedor' ? user.id : null,
        status: 'pendente',
        status_pagamento: 'pago', // Cash/PIX por enquanto
        total,
        pontos_usados,
        pontos_ganhos,
      })
      .select()
      .single();

    if (pedidoError) {
      console.error('Pedido error:', pedidoError);
      return NextResponse.json(
        { error: 'Erro ao criar pedido' },
        { status: 500 }
      );
    }

    // Criar itens do pedido
    const { error: itensError } = await supabaseAdmin
      .from('itens_pedido')
      .insert(
        itens.map((item) => ({
          pedido_id: pedido.id,
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
          desconto: item.desconto || 0,
        }))
      );

    if (itensError) {
      // Rollback do pedido
      await supabaseAdmin.from('pedidos').delete().eq('id', pedido.id);
      return NextResponse.json(
        { error: 'Erro ao criar itens do pedido' },
        { status: 500 }
      );
    }

    // Atualizar pontos do cliente (adicionar ganhos)
    if (user.role === 'cliente') {
      await supabaseAdmin.rpc('adicionar_pontos', {
        p_usuario_id: user.id,
        p_pontos: pontos_ganhos,
        p_descricao: `Ganho pelo pedido #${pedido.id}`,
        p_pedido_id: pedido.id,
      });

      // Se usou pontos, subtrair
      if (pontos_usados && pontos_usados > 0) {
        await supabaseAdmin.rpc('usar_pontos', {
          p_usuario_id: user.id,
          p_pontos: pontos_usados,
          p_descricao: `Uso no pedido #${pedido.id}`,
          p_pedido_id: pedido.id,
        });
      }
    }

    return NextResponse.json({ pedido, pontos_ganhos }, { status: 201 });
  } catch (error) {
    console.error('Pedidos POST error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
