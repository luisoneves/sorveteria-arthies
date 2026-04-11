import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// Armazenamento em memória para pedidos mock (apenas para desenvolvimento)
const mockPedidos: any[] = [];
let pedidoIdCounter = 1;

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

export async function GET(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  if (USE_MOCK) {
    // Retornar pedidos mock
    let pedidos = mockPedidos;
    if (user.role === 'cliente') {
      pedidos = pedidos.filter(p => p.cliente_id === user.id);
    }
    return NextResponse.json({ pedidos });
  }

  // Supabase real...
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let query = supabaseAdmin
    .from('pedidos')
    .select(`*, itens:itens_pedido(*, produto:produtos(nome))`)
    .order('created_at', { ascending: false });

  if (user.role === 'cliente') {
    query = query.eq('cliente_id', user.id);
  }

  if (status) {
    query = query.eq('status', status);
  }

  const { data: pedidos, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ pedidos });
}

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await request.json();
  const { items, total } = body;

  if (USE_MOCK) {
    // Criar pedido mock
    const novoPedido = {
      id: String(pedidoIdCounter++),
      cliente_id: user.id,
      vendedor_id: null,
      status: 'pendente',
      status_pagamento: 'pendente',
      total: total || items.reduce((sum: number, item: any) => sum + (item.preco * item.quantidade), 0),
      pontos_usados: 0,
      pontos_ganhos: Math.floor((total || 0) / 10),
      created_at: new Date().toISOString(),
      itens: items.map((item: any, idx: number) => ({
        id: String(idx + 1),
        pedido_id: String(pedidoIdCounter - 1),
        produto_id: item.id,
        quantidade: item.quantidade,
        preco_unitario: item.preco,
        desconto: 0,
      })),
    };

    mockPedidos.unshift(novoPedido);

    return NextResponse.json({
      pedido: novoPedido,
      message: 'Pedido criado com sucesso (modo mock)'
    });
  }

  // Modo produção (Supabase) - implementar depois com banco real
  return NextResponse.json({
    error: 'Modo produção requer Supabase configurado'
  }, { status: 501 });
}
