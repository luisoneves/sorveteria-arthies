// ========================================
// TIPOS DE USUÁRIO E AUTENTICAÇÃO
// ========================================

export type UserRole = 'admin' | 'gerente' | 'vendedor' | 'cliente';

export interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
  pontos?: number;
  telefone?: string;
  created_at: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  email: string;
  senha: string;
  nome: string;
  telefone?: string;
}

// ========================================
// TIPOS DE PRODUTO
// ========================================

export type CategoriaProduto = 'cremoso' | 'sorbet' | 'especial' | 'bebida' | 'acompanhamento';

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  preco_original?: number;
  categoria: CategoriaProduto;
  imagem?: string;
  ativo: boolean;
  estoque: number;
  created_at: string;
}

export interface ProdutoCarrinho extends Produto {
  quantidade: number;
  desconto?: number;
}

// ========================================
// TIPOS DE PEDIDO E VENDA
// ========================================

export type StatusPedido = 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';
export type StatusPagamento = 'pendente' | 'pago' | 'falhou';

export interface Pedido {
  id: string;
  cliente_id: string;
  vendedor_id?: string;
  status: StatusPedido;
  status_pagamento: StatusPagamento;
  total: number;
  pontos_usados?: number;
  pontos_ganhos?: number;
  created_at: string;
  updated_at?: string;
}

export interface ItemPedido {
  id: string;
  pedido_id: string;
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
  desconto?: number;
}

// ========================================
// TIPOS DE PROMOÇÃO
// ========================================

export interface Promocao {
  id: string;
  nome: string;
  descricao?: string;
  tipo: 'percentual' | 'fixo' | 'compre_ganhe';
  valor: number;
  produto_ids?: string[];
  categoria?: CategoriaProduto;
  data_inicio: string;
  data_fim: string;
  ativo: boolean;
  created_by: string;
}

// ========================================
// TIPOS DE FORNECEDOR
// ========================================

export interface Fornecedor {
  id: string;
  nome: string;
  contato: string;
  telefone: string;
  email?: string;
  endereco?: string;
  produtos_fornecidos?: string[];
  ativo: boolean;
  created_at: string;
}

// ========================================
// TIPOS DE COMPRA (ESTOQUE)
// ========================================

export interface Compra {
  id: string;
  fornecedor_id: string;
  itens: ItemCompra[];
  total: number;
  status: 'pendente' | 'recebido' | 'cancelado';
  data_prevista: string;
  data_recebimento?: string;
  created_by: string;
  created_at: string;
}

export interface ItemCompra {
  produto_nome: string;
  quantidade: number;
  preco_unitario: number;
}

// ========================================
// TIPOS DE REPOSIÇÃO
// ========================================

export type StatusReposicao = 'solicitada' | 'aprovada' | 'rejeitada' | 'comprada';

export interface Reposicao {
  id: string;
  vendedor_id: string;
  gerente_id?: string;
  itens: { nome: string; quantidade: number }[];
  status: StatusReposicao;
  observacao?: string;
  created_at: string;
  updated_at?: string;
}

// ========================================
// TIPOS DE FIDELIDADE
// ========================================

export interface TransacaoPontos {
  id: string;
  cliente_id: string;
  tipo: 'ganho' | 'uso';
  pontos: number;
  descricao: string;
  pedido_id?: string;
  created_at: string;
}

// ========================================
// TIPOS DE RELATÓRIOS
// ========================================

export interface RelatorioFaturamento {
  periodo: { inicio: string; fim: string };
  total_vendas: number;
  total_pedidos: number;
  ticket_medio: number;
  vendas_por_dia: { data: string; valor: number }[];
}

export interface RelatorioProdutos {
  mais_vendidos: { produto_id: string; nome: string; quantidade: number }[];
  estoque_baixo: { produto_id: string; nome: string; estoque: number }[];
}
