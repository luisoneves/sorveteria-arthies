// ========================================
// CONSTANTES DO SISTEMA
// ========================================

export const ROLES = {
  ADMIN: 'admin',
  GERENTE: 'gerente',
  VENDEDOR: 'vendedor',
  CLIENTE: 'cliente',
} as const;

export const ROLE_LABELS = {
  admin: 'Administrador',
  gerente: 'Gerente',
  vendedor: 'Vendedor',
  cliente: 'Cliente',
} as const;

export const CATEGORIAS_PRODUTO = {
  CREMOSO: 'cremoso',
  SORBET: 'sorbet',
  ESPECIAL: 'especial',
  BEBIDA: 'bebida',
  ACOMPANHAMENTO: 'acompanhamento',
} as const;

export const CATEGORIA_LABELS = {
  cremoso: 'Gelato Cremoso',
  sorbet: 'Sorbet (Fruta)',
  especial: 'Especial da Casa',
  bebida: 'Bebidas',
  acompanhamento: 'Acompanhamentos',
} as const;

export const STATUS_PEDIDO = {
  PENDENTE: 'pendente',
  EM_ANDAMENTO: 'em_andamento',
  CONCLUIDO: 'concluido',
  CANCELADO: 'cancelado',
} as const;

export const STATUS_PEDIDO_LABELS = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
} as const;

// ========================================
// REGRAS DE FIDELIDADE
// ========================================

export const FIDELIDADE = {
  PONTOS_POR_REAL: 1, // 1 ponto por R$1 gasto
  PONTOS_PARA_BONUS: 20, // 20 pontos = R$10 de bônus
  VALOR_BONUS: 10, // R$10 de desconto
} as const;

// ========================================
// CONFIGURAÇÕES DA APLICAÇÃO
// ========================================

export const APP_CONFIG = {
  NOME: 'Sorveteria Arthies',
  DESCRICAO: 'Gelatos Artesanais',
  EMAIL_CONTATO: 'contato@arthies.com',
  TELEFONE: '(00) 00000-0000',
  ENDERECO: 'Rua Exemplo, 123 - Centro',
} as const;

// ========================================
// ROTAS POR PAPEL
// ========================================

export const ROUTES_BY_ROLE = {
  admin: '/admin/dashboard',
  gerente: '/gerente/dashboard',
  vendedor: '/vendedor/pdv',
  cliente: '/cliente/shop',
} as const;

export const ROUTE_PERMISSIONS = {
  // Admin
  '/admin': ['admin'],
  '/gerente/dashboard': ['admin', 'gerente'],
  '/gerente/produtos': ['admin', 'gerente'],
  '/gerente/promocoes': ['admin', 'gerente'],
  '/gerente/reposicoes': ['admin', 'gerente'],
  // Vendedor
  '/vendedor/pdv': ['admin', 'gerente', 'vendedor'],
  '/vendedor/vendas': ['admin', 'gerente', 'vendedor'],
  '/vendedor/fidelidade': ['admin', 'gerente', 'vendedor'],
  // Cliente
  '/cliente': ['cliente'],
  '/cliente/shop': ['cliente'],
  '/cliente/carrinho': ['cliente'],
  '/cliente/pedidos': ['cliente'],
  '/cliente/pontos': ['cliente'],
} as const;
