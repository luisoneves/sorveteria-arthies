// ========================================
// SUPABASE ADAPTER - Produção Real
// ========================================
// Este adapter implementa a "Chave B" (Modo Produção)
// Usa Supabase real para todas as operações

import { supabaseAdmin } from '@/lib/supabase';
import type { 
  AuthAdapter, 
  PedidoAdapter, 
  ProdutoAdapter,
  User, 
  Pedido, 
  Produto,
  LoginCredentials,
  RegisterData
} from './base.adapter';

// Auth Adapter Real (Supabase)
export class SupabaseAuthAdapter implements AuthAdapter {
  async login(credentials: LoginCredentials): Promise<{ user: User }> {
    // Buscar usuário no banco
    const { data: userData, error: userError } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('email', credentials.email)
      .eq('ativo', true)
      .single();

    if (userError || !userData) {
      throw new Error('Email ou senha inválidos');
    }

    // Verificar senha com Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.senha,
    });

    if (authError) {
      throw new Error('Email ou senha inválidos');
    }

    return {
      user: {
        id: userData.id,
        email: userData.email,
        nome: userData.nome,
        role: userData.role,
        pontos: userData.pontos || 0,
        telefone: userData.telefone,
      }
    };
  }

  async register(data: RegisterData): Promise<{ user: User }> {
    // Verificar se email já existe
    const { data: existing } = await supabaseAdmin
      .from('usuarios')
      .select('id')
      .eq('email', data.email)
      .single();

    if (existing) {
      throw new Error('Email já cadastrado');
    }

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email: data.email,
      password: data.senha,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // Criar registro na tabela usuarios
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('usuarios')
      .insert({
        id: authData.user!.id,
        email: data.email,
        nome: data.nome,
        telefone: data.telefone || null,
        role: data.role || 'cliente',
        pontos: 0,
        ativo: true,
      })
      .select()
      .single();

    if (userError) {
      throw new Error('Erro ao criar usuário');
    }

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        nome: newUser.nome,
        role: newUser.role,
        pontos: newUser.pontos || 0,
        telefone: newUser.telefone,
      }
    };
  }

  async getUser(userId: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      email: data.email,
      nome: data.nome,
      role: data.role,
      pontos: data.pontos || 0,
      telefone: data.telefone,
    };
  }
}

// Pedido Adapter Real (Supabase)
export class SupabasePedidoAdapter implements PedidoAdapter {
  async list(userId: string, role: string): Promise<{ pedidos: Pedido[] }> {
    let query = supabaseAdmin
      .from('pedidos')
      .select('*, itens:itens_pedido(*, produto:produtos(nome))')
      .order('created_at', { ascending: false });

    if (role === 'cliente') {
      query = query.eq('cliente_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return { pedidos: data || [] };
  }

  async create(userId: string, items: any[], total: number): Promise<{ pedido: Pedido }> {
    // Criar pedido
    const { data: pedido, error: pedidoError } = await supabaseAdmin
      .from('pedidos')
      .insert({
        cliente_id: userId,
        status: 'pendente',
        status_pagamento: 'pendente',
        total: total,
        pontos_ganhos: Math.floor(total / 10),
      })
      .select()
      .single();

    if (pedidoError) {
      throw new Error(pedidoError.message);
    }

    // Criar itens do pedido
    const itensParaInserir = items.map(item => ({
      pedido_id: pedido.id,
      produto_id: item.id,
      quantidade: item.quantidade,
      preco_unitario: item.preco,
      desconto: 0,
    }));

    const { error: itensError } = await supabaseAdmin
      .from('itens_pedido')
      .insert(itensParaInserir);

    if (itensError) {
      throw new Error(itensError.message);
    }

    return { pedido };
  }
}

// Produto Adapter Real (Supabase)
export class SupabaseProdutoAdapter implements ProdutoAdapter {
  async list(): Promise<{ produtos: Produto[] }> {
    const { data, error } = await supabaseAdmin
      .from('produtos')
      .select('*')
      .eq('ativo', true)
      .order('nome');

    if (error) {
      throw new Error(error.message);
    }

    return { produtos: data || [] };
  }

  async getById(id: string): Promise<Produto | null> {
    const { data, error } = await supabaseAdmin
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return data;
  }
}

// Exportar instâncias
export const supabaseAdapters = {
  auth: new SupabaseAuthAdapter(),
  pedido: new SupabasePedidoAdapter(),
  produto: new SupabaseProdutoAdapter(),
};
