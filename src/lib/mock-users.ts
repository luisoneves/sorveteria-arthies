// ========================================
// Mock Users — Para desenvolvimento local
// ========================================
// MODO DE USO:
// Defina NEXT_PUBLIC_USE_MOCK=true no .env.local
// ========================================

export interface MockUser {
  id: string;
  email: string;
  nome: string;
  role: 'admin' | 'gerente' | 'vendedor' | 'cliente';
  pontos: number;
  telefone: string;
  senha: string; // Apenas para mock, nunca usar em produção!
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'admin@arthies.com',
    nome: 'Admin Arthies',
    role: 'admin',
    pontos: 0,
    telefone: '11999999999',
    senha: '123456',
  },
  {
    id: '2',
    email: 'gerente@arthies.com',
    nome: 'Gerente Silva',
    role: 'gerente',
    pontos: 0,
    telefone: '11988888888',
    senha: '123456',
  },
  {
    id: '3',
    email: 'vendedor@arthies.com',
    nome: 'Vendedor João',
    role: 'vendedor',
    pontos: 0,
    telefone: '11977777777',
    senha: '123456',
  },
  {
    id: '4',
    email: 'cliente@arthies.com',
    nome: 'Cliente Maria',
    role: 'cliente',
    pontos: 100,
    telefone: '11966666666',
    senha: '123456',
  },
];

// Função para buscar usuário por email
export function getMockUserByEmail(email: string): MockUser | undefined {
  return mockUsers.find((u) => u.email === email);
}

// Função para validar senha
export function validateMockPassword(email: string, senha: string): Omit<MockUser, 'senha'> | null {
  const user = getMockUserByEmail(email);
  if (user && user.senha === senha) {
    const { senha: _, ...cleanUser } = user;
    return cleanUser;
  }
  return null;
}

// Nota: Este arquivo contém senhas em texto plano APENAS para desenvolvimento.
// NUNCA usar em produção!
