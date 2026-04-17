// ========================================
// MOCK ADAPTER - Dados Fake para Desenvolvimento
// ========================================
// Este adapter implementa a "Chave C" (Modo Mock)
// NUNCA deve ser usado em produção real sem configuração explícita

import type { 
  AuthAdapter, 
  PedidoAdapter, 
  ProdutoAdapter,
  PedidoItem,
  User,
  Produto,
  Pedido,
  LoginCredentials,
  RegisterData,
} from './base.adapter';

// Dados mock - nunca usar em produção real
const mockUsers: User[] = [
  { id: '1', email: 'admin@arthies.com', nome: 'Admin Arthies', role: 'admin', pontos: 0, telefone: '11999999999' },
  { id: '2', email: 'gerente@arthies.com', nome: 'Gerente Silva', role: 'gerente', pontos: 0, telefone: '11988888888' },
  { id: '3', email: 'vendedor@arthies.com', nome: 'Vendedor João', role: 'vendedor', pontos: 0, telefone: '11977777777' },
  { id: '4', email: 'cliente@arthies.com', nome: 'Cliente Maria', role: 'cliente', pontos: 100, telefone: '11966666666' },
];

const mockProdutos: Produto[] = [
  { id: '1', nome: 'Chocolate Belga', descricao: 'Gelato cremoso de chocolate belga 70% cacau', preco: 18.90, categoria: 'cremoso', ativo: true },
  { id: '2', nome: 'Morango Champagne', descricao: 'Morango fresco com toque de champagne', preco: 22.50, categoria: 'cremoso', ativo: true },
  { id: '3', nome: 'Pistache', descricao: 'Pistache italiano importado', preco: 24.90, categoria: 'cremoso', ativo: true },
  { id: '4', nome: 'Ninho com Nutella', descricao: 'Leite em pó com Nutella genuína', preco: 26.90, categoria: 'especial', ativo: true },
  { id: '5', nome: 'Oreo', descricao: 'Biscoito Oreo triturado no gelato de baunilha', preco: 23.90, categoria: 'especial', ativo: true },
  { id: '6', nome: 'Limão Siciliano', descricao: 'Sorbet refrescante de limão siciliano', preco: 16.90, categoria: 'sorbet', ativo: true },
];

// Armazenamento em memória para pedidos (não persiste)
const mockPedidos: Pedido[] = [];
let pedidoIdCounter = 1;

// Auth Adapter Mock
export class MockAuthAdapter implements AuthAdapter {
  async login(credentials: LoginCredentials): Promise<{ user: User }> {
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Email ou senha inválidos');
    }
    
    // Em modo mock, aceita qualquer senha
    // Em produção real, usaria bcrypt.compare
    return { user };
  }

  async register(data: RegisterData): Promise<{ user: User }> {
    const existing = mockUsers.find(u => u.email === data.email);
    
    if (existing) {
      throw new Error('Email já cadastrado');
    }
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: data.email,
      nome: data.nome,
      role: (data.role === 'admin' || data.role === 'gerente' || data.role === 'vendedor' || data.role === 'cliente') ? data.role : 'cliente',
      pontos: 0,
      telefone: data.telefone || '',
    };
    
    mockUsers.push(newUser);
    return { user: newUser };
  }

  async getUser(userId: string): Promise<User | null> {
    return mockUsers.find(u => u.id === userId) || null;
  }
}

// Pedido Adapter Mock
export class MockPedidoAdapter implements PedidoAdapter {
  async list(userId: string, role: string): Promise<{ pedidos: Pedido[] }> {
    if (role === 'cliente') {
      return { pedidos: mockPedidos.filter(p => p.cliente_id === userId) };
    }
    return { pedidos: mockPedidos };
  }

  async create(userId: string, items: PedidoItem[], totalCalculado: number): Promise<{ pedido: Pedido }> {
    const novoPedido: Pedido = {
      id: String(pedidoIdCounter++),
      cliente_id: userId,
      status: 'pendente',
      status_pagamento: 'pendente',
      total: totalCalculado,
      pontos_usados: 0,
      pontos_ganhos: Math.floor(totalCalculado / 10),
      created_at: new Date().toISOString(),
      itens: items.map((item, idx) => ({
        id: String(idx + 1),
        pedido_id: String(pedidoIdCounter - 1),
        produto_id: item.id,
        quantidade: item.quantidade,
        preco_unitario: item.preco ?? 0,
        desconto: 0,
      })),
    };
    
    mockPedidos.unshift(novoPedido);
    return { pedido: novoPedido };
  }
}

// Produto Adapter Mock
export class MockProdutoAdapter implements ProdutoAdapter {
  async list(): Promise<{ produtos: Produto[] }> {
    return { produtos: mockProdutos.filter(p => p.ativo) };
  }

  async getById(id: string): Promise<Produto | null> {
    return mockProdutos.find(p => p.id === id) || null;
  }
}

// Exportar instâncias
export const mockAdapters = {
  auth: new MockAuthAdapter(),
  pedido: new MockPedidoAdapter(),
  produto: new MockProdutoAdapter(),
};
