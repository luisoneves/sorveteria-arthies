import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { mockAdapters } from '@/lib/api/adapters/mock.adapter';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

interface PedidoItem {
  produto_id?: string;
  id: string;
  quantidade: number;
  preco: number;
}

interface MockPedido {
  cliente_id: string;
  vendedor_id: string | null;
  status: string;
  status_pagamento: string;
  total: number;
  pontos_usados: number;
  pontos_ganhos: number;
  created_at: string;
  itens: PedidoItem[];
}

const mockPedidos: MockPedido[] = [];
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

async function calcularTotal(items: PedidoItem[], useMock: boolean): Promise<number> {
  let totalCalculado = 0;
  
  for (const item of items) {
    let preco: number;
    
    if (useMock) {
      const produto = await mockAdapters.produto.getById(item.produto_id || item.id);
      if (!produto) {
        throw new Error(`Produto não encontrado: ${item.produto_id || item.id}`);
      }
      preco = produto.preco;
    } else {
      const { data: produto } = await supabaseAdmin
        .from('produtos')
        .select('preco')
        .eq('id', item.produto_id || item.id)
        .single();
        
      if (!produto) {
        throw new Error(`Produto não encontrado: ${item.produto_id || item.id}`);
      }
      preco = Number(produto.preco);
    }
    
    totalCalculado += preco * item.quantidade;
  }
  
  return totalCalculado;
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
  const items = body.items || [];
  const totalEnviado = body.total;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Itens obrigatórios' }, { status: 400 });
  }

  // LEI 19: Preço calculado server-side
  const totalCalculado = await calcularTotal(items, USE_MOCK);

  // LEI 19: Validar que o total enviado bate com o calculado
  // Se o cliente enviou um total, deve ser exatamente igual
  // Diferença > 0.01 indica manipulação
  if (totalEnviado && Math.abs(Number(totalEnviado) - totalCalculado) > 0.01) {
    return NextResponse.json({ 
      error: 'Preço manipulado. Recalcule no servidor.',
      code: 'PRICE_MANIPULATION_DETECTED'
    }, { status: 400 });
  }

  if (USE_MOCK) {
    const novoPedido = {
      id: String(pedidoIdCounter++),
      cliente_id: user.id,
      vendedor_id: null,
      status: 'pendente',
      status_pagamento: 'pendente',
      total: totalCalculado,
      pontos_usados: 0,
      pontos_ganhos: Math.floor(totalCalculado / 10),
      created_at: new Date().toISOString(),
      itens: items.map((item: PedidoItem, idx: number) => ({
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
