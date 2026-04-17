// ========================================
// BASE ADAPTER - Interface Comum
// ========================================
// Este arquivo define a interface que todos os adapters devem seguir
// Permite trocar mock <-> supabase sem alterar o código das rotas

export interface User {
  id: string;
  email: string;
  nome: string;
  role: 'admin' | 'gerente' | 'vendedor' | 'cliente';
  pontos: number;
  telefone?: string;
}

export interface PedidoItem {
  id: string;
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
  preco?: number;
  desconto: number;
}

export interface Pedido {
  id: string;
  cliente_id: string;
  vendedor_id?: string;
  status: 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';
  status_pagamento: 'pendente' | 'pago' | 'falhou';
  total: number;
  pontos_usados: number;
  pontos_ganhos: number;
  created_at: string;
  itens?: PedidoItem[];
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  preco_original?: number;
  categoria: string;
  ativo: boolean;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  role?: string;
}

// Interface que todos os adapters devem implementar
export interface AuthAdapter {
  login(credentials: LoginCredentials): Promise<{ user: User }>;
  register(data: RegisterData): Promise<{ user: User }>;
  getUser(userId: string): Promise<User | null>;
}

export interface PedidoAdapter {
  list(userId: string, role: string): Promise<{ pedidos: Pedido[] }>;
  create(userId: string, items: PedidoItem[], total: number): Promise<{ pedido: Pedido }>;
}

export interface ProdutoAdapter {
  list(): Promise<{ produtos: Produto[] }>;
  getById(id: string): Promise<Produto | null>;
}
