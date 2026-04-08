import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres').regex(/\d/, 'Senha deve conter pelo menos 1 número'),
  telefone: z.string().optional(),
});

export const produtoSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  preco: z.number().positive('Preço deve ser positivo'),
  categoria: z.enum(['cremoso', 'sorbet', 'especial', 'bebida', 'acompanhamento']),
  imagem: z.string().url().optional(),
  estoque: z.number().int().min(0).default(0),
  ativo: z.boolean().default(true),
});

export const pedidoSchema = z.object({
  cliente_id: z.string().uuid('ID do cliente inválido'),
  itens: z.array(z.object({
    produto_id: z.string().uuid(),
    quantidade: z.number().int().positive(),
    preco_unitario: z.number().positive(),
    desconto: z.number().min(0).optional(),
  })).min(1, 'Pedido deve ter pelo menos 1 item'),
  pontos_usados: z.number().int().min(0).default(0),
});

export const promocaoSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  tipo: z.enum(['percentual', 'fixo', 'compre_ganhe']),
  valor: z.number().positive('Valor deve ser positivo'),
  produto_ids: z.array(z.string().uuid()).optional(),
  categoria: z.enum(['cremoso', 'sorbet', 'especial', 'bebida', 'acompanhamento']).optional(),
  data_inicio: z.string().datetime(),
  data_fim: z.string().datetime(),
});

export const usuarioSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  role: z.enum(['admin', 'gerente', 'vendedor', 'cliente']),
  telefone: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProdutoInput = z.infer<typeof produtoSchema>;
export type PedidoInput = z.infer<typeof pedidoSchema>;
export type PromocaoInput = z.infer<typeof promocaoSchema>;
export type UsuarioInput = z.infer<typeof usuarioSchema>;
